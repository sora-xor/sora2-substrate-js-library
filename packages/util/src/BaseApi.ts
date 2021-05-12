import last from 'lodash/fp/last'
import first from 'lodash/fp/first'
import { ApiPromise, ApiRx } from '@polkadot/api'
import { CreateResult } from '@polkadot/ui-keyring/types'
import { KeyringPair } from '@polkadot/keyring/types'
import { Signer } from '@polkadot/types/types'
import { SubmittableExtrinsic } from '@polkadot/api/promise/types'
import { decodeAddress } from '@polkadot/util-crypto'

import { AccountStorage, Storage } from './storage'
import { KnownAssets, KnownSymbols } from './assets'
import { CodecString, FPNumber } from './fp'
import { encrypt, toHmacSHA256 } from './crypto'
import { connection } from './connection'
import { BridgeHistory } from './BridgeApi'
import { RewardClaimHistory } from './rewards'

export const isBridgeOperation = (operation: Operation) => [
  Operation.EthBridgeIncoming,
  Operation.EthBridgeOutgoing
].includes(operation)

export const KeyringType = 'sr25519'

export class BaseApi {
  protected signer?: Signer
  protected storage?: Storage // common data storage
  protected accountStorage?: AccountStorage // account data storage
  protected account: CreateResult
  private _history: Array<History> = []
  private _restored: Boolean = false

  constructor () {
  }

  public get api (): ApiPromise {
    return connection.api
  }

  public get apiRx (): ApiRx {
    return connection.apiRx
  }

  public logout (): void {
    this.account = null
    this.accountStorage = null
    this.signer = null
    this.history = []
    if (this.storage) {
      this.storage.clear()
    }
  }

  public initAccountStorage () {
    if (!this.account?.pair?.address) return

    this.accountStorage = new AccountStorage(toHmacSHA256(this.account.pair.address))
  }

  // methods for working with history
  public get history (): Array<History> {
    if (this.accountStorage) {
      this._history = JSON.parse(this.accountStorage.get('history')) as Array<History> || []
    }
    return this._history
  }

  public set history (value: Array<History>) {
    this.accountStorage?.set('history', JSON.stringify(value))
    this._history = [...value]
  }

  public get restored (): Boolean {
    if (this.accountStorage) {
      this._restored = JSON.parse(this.accountStorage.get('restored')) || false
    }
    return this._restored
  }

  public set restored (value: Boolean) {
    this.accountStorage?.set('restored', JSON.stringify(value))
    this._restored = value
  }

  public getHistory (id: string): History | null {
    if (!id) return null

    return this.history.find(item => item.id === id) ?? null
  }

  public saveHistory (historyItem: History): void {
    if (!historyItem || !historyItem.id) return

    const historyCopy = [...this.history]
    const index = historyCopy.findIndex(item => item.id === historyItem.id)

    ~index ? historyCopy[index] = historyItem : historyCopy.push(historyItem)

    this.history = historyCopy
  }

  public removeHistory (id: string): void {
    if (!id) return

    this.history = this.history.filter(item => item.id !== id)
  }

  /**
   * Set account data
   * @param account
   */
  public setAccount (account: CreateResult): void {
    this.account = account
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

  protected async submitExtrinsic (
    extrinsic: SubmittableExtrinsic,
    signer: KeyringPair,
    historyData?: History | BridgeHistory | RewardClaimHistory,
    unsigned = false
  ): Promise<void> {
    const history = (historyData || {}) as History & BridgeHistory & RewardClaimHistory
    const isNotFaucetOperation = !historyData || historyData.type !== Operation.Faucet
    if (isNotFaucetOperation && signer) {
      history.from = signer.address
    }
    if (!history.id) {
      history.startTime = Date.now()
      history.id = encrypt(`${history.startTime}`)
    }
    const nonce = await this.api.rpc.system.accountNextIndex(signer.address)
    const extrinsicFn = (callbackFn: (result: any) => void) => unsigned
      ? extrinsic.send(callbackFn)
      : extrinsic.signAndSend(signer.isLocked ? signer.address : signer, { signer: this.signer, nonce }, callbackFn)
    const unsub = await extrinsicFn((result: any) => {
      if (isBridgeOperation(history.type)) {
        history.signed = true
      }
      history.status = first(Object.keys(result.status.toJSON())).toLowerCase()
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
            this.saveHistory(history)
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

  /**
   * @param signer
   * @param type
   * @param params
   * @returns value * 10 ^ decimals
   */
  protected async getNetworkFee (signer: KeyringPair, type: Operation, ...params: Array<any>): Promise<CodecString> {
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
      case Operation.RegisterAsset:
        extrinsic = this.api.tx.assets.register
        break
      case Operation.ClaimRewards:
        extrinsic = this.api.tx.utility.batch
        break
      default:
        throw new Error('Unknown function')
    }
    const res = await (extrinsic(...extrinsicParams) as SubmittableExtrinsic).paymentInfo(
      signer.isLocked ? signer.address : signer,
      { signer: this.signer }
    )
    return new FPNumber(res.partialFee, xor.decimals).toCodecString()
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
  Ready = 'ready',
  Broadcast = 'broadcast',
  InBlock = 'inblock',
  Finalized = 'finalized',
  Error = 'error'
}

export enum Operation {
  Swap = 'Swap',
  Transfer = 'Transfer',
  AddLiquidity = 'AddLiquidity',
  RemoveLiquidity = 'RemoveLiquidity',
  CreatePair = 'CreatePair',
  Faucet = 'Faucet',
  RegisterAsset = 'RegisterAsset',
  EthBridgeOutgoing = 'EthBridgeOutgoing',
  EthBridgeIncoming = 'EthBridgeIncoming',
  ClaimRewards = 'ClaimRewards'
}

export interface History {
  type: Operation;
  amount?: string;
  symbol?: string;
  assetAddress?: string;
  id?: string;
  blockId?: string;
  to?: string;
  amount2?: string;
  symbol2?: string;
  asset2Address?: string;
  startTime?: number;
  endTime?: number;
  from?: string;
  status?: string;
  errorMessage?: string;
  liquiditySource?: string;
}
