import last from 'lodash/fp/last'
import first from 'lodash/fp/first'
import { ApiPromise } from '@polkadot/api'
import { WsProvider } from '@polkadot/rpc-provider'
import { KeyringPair } from '@polkadot/keyring/types'
import { Signer } from '@polkadot/types/types'
import { options } from '@sora-substrate/api'
import { SubmittableExtrinsic } from '@polkadot/api/promise/types'
import { decodeAddress } from '@polkadot/util-crypto'

import { Storage } from './storage'
import { KnownAssets, KnownSymbols } from './assets'
import { FPNumber } from './fp'

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

  /**
   * Set storage if it should be used as data storage
   * @param storage
   */
  public setStorage (storage: Storage): void {
    this.storage = storage
  }

  public async connect (endpoint?: string): Promise<void> {
    if (endpoint) {
      this.endpoint = endpoint
    }
    const provider = new WsProvider(this.endpoint)
    this.api = new ApiPromise(options({ provider }))
    await this.api.isReady
    const history = this.storage?.get('history')
    if (history) {
      this.history = JSON.parse(history)
    }
  }

  protected saveHistory (history: History): void {
    if (!history || !history.id) {
      return
    }
    const index = this.history.findIndex(item => item.id === history.id)
    ~index ? this.history[index] = history : this.history.push(history)
    if (this.storage) {
      this.storage.set('history', JSON.stringify(this.history))
    }
  }

  protected async submitExtrinsic (
    extrinsic: SubmittableExtrinsic,
    signer: KeyringPair,
    historyData?: History,
    unsigned = false
  ): Promise<void> {
    const history = (historyData || {}) as History
    if (signer) {
      history.from = signer.address
    }
    history.startTime = Date.now()
    const extrinsicFn = (callbackFn: (result: any) => void) => unsigned
      ? extrinsic.send(callbackFn)
      : extrinsic.signAndSend(signer.isLocked ? signer.address : signer, { signer: this.signer }, callbackFn)
    const unsub = await extrinsicFn((result: any) => {
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
              history.errorMessage = documentation.join(' ').trim()
            } else {
              // Other, CannotLookup, BadOrigin, no extra info
              history.errorMessage = error.toString()
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
      history.errorMessage = errorInfo
      this.saveHistory(history)
      throw new Error(errorInfo)
    })
  }

  protected async getNetworkFee (signer: KeyringPair, type: Operation, ...params: Array<any>): Promise<string> {
    const xor = KnownAssets.get(KnownSymbols.XOR)
    let extrinsic = null
    switch (type) {
      case Operation.Transfer:
        extrinsic = this.api.tx.assets.transfer
        break
      case Operation.Swap:
        extrinsic = this.api.tx.liquidityProxy.swap
        break
      case Operation.AddLiquidity:
        extrinsic = this.api.tx.poolXyk.depositLiquidity
        break
      case Operation.RemoveLiquidity:
        extrinsic = this.api.tx.poolXyk.withdrawLiquidity
        break
      default:
        throw new Error('Unknown function')
    }
    const res = await (extrinsic(...params) as SubmittableExtrinsic).paymentInfo(
      signer.isLocked ? signer.address : signer,
      { signer: this.signer }
    )
    return new FPNumber(res.partialFee, xor.decimals).toString()
  }

  /**
   * Check address
   * @param address
   */
  public checkAddress (address: string): boolean {
    try {
      decodeAddress(address)
      return true
    } catch (error) {
      return false
    }
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

export enum Operation {
  Swap = 'Swap',
  Transfer = 'Transfer',
  AddLiquidity = 'AddLiquidity',
  RemoveLiquidity = 'RemoveLiquidity',
  Faucet = 'Faucet'
}

export interface History {
  type: Operation;
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
  errorMessage?: string;
}
