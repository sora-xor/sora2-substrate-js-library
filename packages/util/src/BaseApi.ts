import last from 'lodash/fp/last'
import first from 'lodash/fp/first'
import { ApiPromise } from '@polkadot/api'
import { KeyringPair } from '@polkadot/keyring/types'
import { Signer } from '@polkadot/types/types'
import { SubmittableExtrinsic } from '@polkadot/api/promise/types'
import { decodeAddress } from '@polkadot/util-crypto'

import { Storage } from './storage'
import { KnownAssets, KnownSymbols } from './assets'
import { FPNumber } from './fp'
import { encrypt } from './crypto'
import { connection } from './connection'

const isBridgeOperation = (operation: Operation) => [
  Operation.EthBridgeIncoming,
  Operation.EthBridgeOutgoing,
  Operation.EthBridgeOutgoingMarkDone
].includes(operation)

export const KeyringType = 'sr25519'

export class BaseApi {
  protected signer?: Signer
  protected storage?: Storage
  protected history: Array<History> = []

  constructor () {
    const history = this.storage?.get('history')
    if (history) {
      this.history = JSON.parse(history)
    }
  }

  public get api (): ApiPromise {
    return connection.api
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
    const isNotFaucetOperation = !historyData || historyData.type !== Operation.Faucet
    if (isNotFaucetOperation && signer) {
      history.from = signer.address
    }
    history.startTime = Date.now()
    history.id = encrypt(`${history.startTime}`)
    const nonce = await this.api.rpc.system.accountNextIndex(signer.address)
    const extrinsicFn = (callbackFn: (result: any) => void) => unsigned
      ? extrinsic.send(callbackFn)
      : extrinsic.signAndSend(signer.isLocked ? signer.address : signer, { signer: this.signer, nonce }, callbackFn)
    const unsub = await extrinsicFn((result: any) => {
      history.status = first(Object.keys(result.status.toJSON()))
      this.saveHistory(history)
      if (result.status.isInBlock) {
        history.blockId = result.status.asInBlock.toString()
        this.saveHistory(history)
      } else if (result.status.isFinalized) {
        history.endTime = Date.now()
        this.saveHistory(history)
        result.events.forEach(({ event: { data, method, section } }: any) => {
          if (method === 'RequestRegistered' && isBridgeOperation(history.type)) {
            history.hash = first(data.toJSON())
          }
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
    let extrinsicParams = params
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
      case Operation.CreatePair:
        extrinsic = this.api.tx.utility.batch
        extrinsicParams = [[
          (this.api.tx.tradingPair as any).register(...params[0].pairCreationArgs),
          this.api.tx.poolXyk.initializePool(...params[0].pairCreationArgs),
          this.api.tx.poolXyk.depositLiquidity(...params[0].addLiquidityArgs)
        ]]
        break
      case Operation.EthBridgeOutgoing:
        extrinsic = this.api.tx.ethBridge.transferToSidechain
        break
      case Operation.EthBridgeIncoming:
        extrinsic = this.api.tx.ethBridge.requestFromSidechain
        break
      default:
        throw new Error('Unknown function')
    }
    const res = await (extrinsic(...extrinsicParams) as SubmittableExtrinsic).paymentInfo(
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
  CreatePair = 'CreatePair',
  Faucet = 'Faucet',
  EthBridgeOutgoing = 'EthBridgeOutgoing',
  EthBridgeIncoming = 'EthBridgeIncoming',
  EthBridgeOutgoingMarkDone = 'EthBridgeOutgoingMarkDone' // Maybe we don't need it
}

export interface History {
  type: Operation;
  amount?: string;
  symbol?: string;
  id?: string;
  blockId?: string;
  to?: string;
  amount2?: string;
  symbol2?: string;
  startTime?: number;
  endTime?: number;
  from?: string;
  status?: string;
  errorMessage?: string;
  hash?: string; // For bridge hashes
}
