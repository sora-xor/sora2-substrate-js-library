import last from 'lodash/fp/last'
import first from 'lodash/fp/first'
import { ApiPromise } from '@polkadot/api'
import { WsProvider } from '@polkadot/rpc-provider'
import { KeyringPair } from '@polkadot/keyring/types'
import { Signer } from '@polkadot/types/types'
import { options } from '@sora-substrate/api'

import { Storage } from './storage'

export const KeyringType = 'sr25519'

export class BaseApi {
  public api: ApiPromise
  public endpoint: string

  protected signer?: Signer
  protected storage?: Storage
  protected history: Array<History> = []

  constructor (endpoint?: string) {
    if (endpoint) {
      this.endpoint = endpoint
    }
  }

  /**
   * Set signer if the pair is locked (For polkadot js extension usage)
   * @param signer
   */
  public setSigner (signer: Signer): void {
    this.api.setSigner(signer)
    this.signer = signer
  }

  public async connect (endpoint?: string): Promise<void> {
    if (endpoint) {
      this.endpoint = endpoint
    }
    const provider = new WsProvider(this.endpoint)
    this.api = new ApiPromise(options({ provider }))
    await this.api.isReady
  }

  public saveHistory (history: History) {
    if (!history || !history.id) {
      return
    }
    console.log(history)
    // TODO: add save history
  }

  protected async submitExtrinsic (
    extrinsic: any,
    signer: KeyringPair,
    historyData?: History,
    unsigned = false
  ): Promise<void> {
    const history = (historyData || {}) as History
    history.from = signer.address
    history.startTime = Date.now()
    const fn = (callbackFn: (result: any) => void) => unsigned
      ? extrinsic.send(signer, callbackFn)
      : extrinsic.signAndSend(signer.isLocked ? signer.address : signer, { signer: this.signer }, callbackFn)
    const unsub = await fn((result: any) => {
      history.status = first(Object.keys(result.status.toJSON()))
      this.saveHistory(history)
      if (result.status.isInBlock) {
        history.id = result.status.asInBlock.toString()
        this.saveHistory(history)
      } else if (result.status.isFinalized) {
        history.endTime = Date.now()
        this.saveHistory(history)
        result.events.forEach(({ event: { data, method, section } }: any) => {
          if (section === 'system' && method === 'ExtrinsicFailed') {
            history.status = TransactionStatus.Error
            history.endTime = Date.now()
            const [error] = data
            if (error.isModule) {
              const decoded = this.api.registry.findMetaError(error.asModule)
              const { documentation } = decoded
              history.errorMwssage = documentation.join(' ').trim()
            } else {
              // Other, CannotLookup, BadOrigin, no extra info
              history.errorMwssage = error.toString()
            }
            this.saveHistory(history)
          }
        })
        unsub()
      }
    }).catch((e: Error) => {
      history.status = TransactionStatus.Error
      history.endTime = Date.now()
      const errorParts = e.message.split(':')
      const errorInfo = last(errorParts).trim()
      history.errorMwssage = errorInfo
      this.saveHistory(history)
      throw new Error(errorInfo)
    })
  }

  public async disconnect (): Promise<void> {
    await this.api.disconnect()
  }
}

export enum TransactionStatus {
  Ready = 'Ready',
  Broadcast = 'Broadcast',
  InBlock = 'InBlock',
  Finalized = 'Finalized',
  Error = 'Error'
}

export enum HistoryType {
  Swap = 'Swap',
  Transfer = 'Transfer',
  AddLiquidity = 'AddLiquidity',
  RemoveLiquidity = 'RemoveLiquidity'
}

export interface History {
  type: HistoryType;
  amount: string;
  symbol: string;
  id?: string;
  to?: string;
  amount2?: string;
  symbol2?: string;
  startTime?: number;
  endTime?: number;
  from?: string;
  status?: string;
  errorMwssage?: string;
}
