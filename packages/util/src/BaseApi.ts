import last from 'lodash/fp/last'
import first from 'lodash/fp/first'
import { decodeAddress, encodeAddress } from '@polkadot/util-crypto'
import type { ApiPromise, ApiRx } from '@polkadot/api'
import type { CreateResult } from '@polkadot/ui-keyring/types'
import type { KeyringPair, KeyringPair$Json } from '@polkadot/keyring/types'
import type { Signer, ISubmittableResult } from '@polkadot/types/types'
import type { SubmittableExtrinsic } from '@polkadot/api/promise/types'
import type { AddressOrPair, SignerOptions } from '@polkadot/api/submittable/types'

import { AccountStorage, Storage } from './storage'
import { KnownAssets, KnownSymbols } from './assets'
import { CodecString, FPNumber } from './fp'
import { encrypt, toHmacSHA256 } from './crypto'
import { connection } from './connection'
import { BridgeHistory } from './BridgeApi'
import { RewardClaimHistory } from './rewards'

type AccountWithOptions = {
  account: AddressOrPair;
  options: Partial<SignerOptions>;
}

export const isBridgeOperation = (operation: Operation) => [
  Operation.EthBridgeIncoming,
  Operation.EthBridgeOutgoing
].includes(operation)

export const KeyringType = 'sr25519'

export class BaseApi {
  /**
   * Network fee values which can be used right after `calcStaticNetworkFees` method.
   *
   * Each value is represented as `CodecString`
   */
  public NetworkFee = {
    [Operation.AddLiquidity]: '0',
    [Operation.CreatePair]: '0',
    [Operation.EthBridgeIncoming]: '0',
    [Operation.EthBridgeOutgoing]: '0',
    [Operation.RegisterAsset]: '0',
    [Operation.RemoveLiquidity]: '0',
    [Operation.Swap]: '0',
    [Operation.SwapAndSend]: '0',
    [Operation.Transfer]: '0',
    [Operation.ClaimVestedRewards]: '0',
    [Operation.ClaimLiquidityProvisionRewards]: '0',
    [Operation.ClaimExternalRewards]: '0'
  }

  protected readonly prefix = 69
  protected readonly defaultDEXId = 0

  private _history: Array<History> = []
  private _restored: boolean = false

  protected signer?: Signer
  protected storage?: Storage // common data storage
  protected accountStorage?: AccountStorage // account data storage
  protected account: CreateResult

  constructor () {}

  public get api (): ApiPromise {
    return connection.api
  }

  public get apiRx (): ApiRx {
    return connection.api.rx as ApiRx
  }

  public get accountPair (): KeyringPair {
    if (!this.account) {
      return null
    }
    return this.account.pair
  }

  public get address (): string {
    if (!this.account) {
      return ''
    }
    return this.formatAddress(this.account.pair.address)
  }

  public get accountJson (): KeyringPair$Json {
    if (!this.account) {
      return null
    }
    return this.account.json
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
    // TODO: dependency injection ?
    if (this.storage) {
      this.accountStorage = new AccountStorage(toHmacSHA256(this.account.pair.address))
    }
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

  public get restored (): boolean {
    if (this.accountStorage) {
      this._restored = JSON.parse(this.accountStorage.get('restored')) || false
    }
    return this._restored
  }

  public set restored (value: boolean) {
    this.accountStorage?.set('restored', JSON.stringify(value))
    this._restored = value
  }

  public getHistory (id: string): History | null {
    if (!id) return null

    return this.history.find(item => item.id === id) ?? null
  }

  public saveHistory (historyItem: History, wasNotGenerated = false): void {
    if (!historyItem || !historyItem.id) return

    let historyCopy: Array<History>
    let addressStorage: Storage

    const hasAccessToStorage = !!this.storage
    const historyItemHasSigner = !!historyItem.from
    const historyItemFromAddress = historyItemHasSigner ? this.formatAddress(historyItem.from, false) : ''
    const needToUpdateAddressStorage = historyItemFromAddress && (historyItemFromAddress !== this.address) && hasAccessToStorage

    if (needToUpdateAddressStorage) {
      addressStorage = new AccountStorage(toHmacSHA256(historyItemFromAddress))
      historyCopy = JSON.parse(addressStorage.get('history')) || [];
    } else {
      historyCopy = [...this.history]
    }

    const index = historyCopy.findIndex(item => item.id === historyItem.id)

    const item = ~index ? { ...historyCopy[index], ...historyItem } : historyItem

    if (wasNotGenerated) {
      // Tx was failed on the static validation and wasn't generated in the network
      delete item.txId
    }

    ~index ? historyCopy[index] = item : historyCopy.push(item)

    if (needToUpdateAddressStorage && addressStorage) {
      addressStorage.set('history', JSON.stringify(historyCopy))
    } else {
      this.history = historyCopy
    }
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

  private getAccountWithOptions (): AccountWithOptions {
    return {
      account: this.accountPair.isLocked ? this.accountPair.address : this.accountPair,
      options: { signer: this.signer }
    }
  }

  public async submitExtrinsic (
    extrinsic: SubmittableExtrinsic,
    signer: KeyringPair,
    historyData?: History | BridgeHistory | RewardClaimHistory,
    unsigned = false
  ): Promise<void> {
    const history = (historyData || {}) as History & BridgeHistory & RewardClaimHistory
    const isNotFaucetOperation = !historyData || historyData.type !== Operation.Faucet
    if (isNotFaucetOperation && signer) {
      history.from = this.address
    }
    if (!history.id) {
      history.startTime = Date.now()
      history.id = encrypt(`${history.startTime}`)
    }
    const nonce = await this.api.rpc.system.accountNextIndex(signer.address)
    const { account, options } = this.getAccountWithOptions()
    const signedTx = unsigned ? extrinsic : await extrinsic.signAsync(account, { ...options, nonce })
    history.txId = signedTx.hash.toString()
    const extrinsicFn = (callbackFn: (result: ISubmittableResult) => void) => extrinsic.send(callbackFn)
    const unsub = await extrinsicFn((result: ISubmittableResult) => {
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
      this.saveHistory(history, true)
      throw new Error(errorInfo)
    })
  }

  /**
   * TODO: make it possible to remove this method
   * @param type
   * @param params
   * @returns value * 10 ^ decimals
   */
  protected async getNetworkFee (type: Operation, ...params: Array<any>): Promise<CodecString> {
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
        extrinsic = this.api.tx.utility.batchAll
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
        extrinsic = params[0].extrinsic
        extrinsicParams = params[0].args
        break
      case Operation.TransferAll:
        extrinsic = this.api.tx.utility.batchAll
        extrinsicParams = params
        break
      case Operation.SwapAndSend:
        extrinsic = this.api.tx.utility.batchAll
        extrinsicParams = [[
          (this.api.tx.liquidityProxy as any).swap(...params[0].args),
          (this.api.tx.assets as any).transfer(...params[0].transferArgs)
        ]]
        break
      default:
        throw new Error('Unknown function')
    }
    const { account, options } = this.getAccountWithOptions()
    const res = await (extrinsic(...extrinsicParams) as SubmittableExtrinsic).paymentInfo(account, options)
    return new FPNumber(res.partialFee, xor.decimals).toCodecString()
  }

  /**
   * Returns an extrinsic with the default or empty params.
   *
   * Actually, network fee value doesn't depend on extrinsic params, so, we can use empty/default values
   * @param operation
   */
  private getEmptyExtrinsic (operation: Operation): SubmittableExtrinsic | null {
    switch (operation) {
      case Operation.AddLiquidity:
        return this.api.tx.poolXyk.depositLiquidity(this.defaultDEXId, '', '', '0', '0', '0', '0')
      case Operation.CreatePair:
        return this.api.tx.utility.batchAll([
          this.api.tx.tradingPair.register(this.defaultDEXId, '', ''),
          this.api.tx.poolXyk.initializePool(this.defaultDEXId, '', ''),
          this.api.tx.poolXyk.depositLiquidity(this.defaultDEXId, '', '', '0', '0', '0', '0')
        ])
      case Operation.EthBridgeIncoming:
        return this.api.tx.ethBridge.requestFromSidechain('', { Transaction: 'Transfer' }, 0)
      case Operation.EthBridgeOutgoing:
        return this.api.tx.ethBridge.transferToSidechain('', '', '0', 0)
      case Operation.RegisterAsset:
        return this.api.tx.assets.register('', '', '0', false)
      case Operation.RemoveLiquidity:
        return this.api.tx.poolXyk.withdrawLiquidity(this.defaultDEXId, '', '', '0', '0', '0')
      case Operation.Swap:
        return this.api.tx.liquidityProxy.swap(this.defaultDEXId, '', '', { WithDesiredInput: { desired_amount_in: '0', min_amount_out: '0' } }, [], 'Disabled')
      case Operation.SwapAndSend:
        return this.api.tx.utility.batchAll([
          this.api.tx.liquidityProxy.swap(this.defaultDEXId, '', '', { WithDesiredInput: { desired_amount_in: '0', min_amount_out: '0' } }, [], 'Disabled'),
          this.api.tx.assets.transfer('', '', '0')
        ])
      case Operation.Transfer:
        return this.api.tx.assets.transfer('', '', '0')
      case Operation.ClaimVestedRewards:
        return this.api.tx.vestedRewards.claimRewards()
      case Operation.ClaimLiquidityProvisionRewards:
        return this.api.tx.pswapDistribution.claimIncentive()
      case Operation.ClaimExternalRewards:
        return this.api.tx.rewards.claim('0xa8811ca9a2f65a4e21bd82a1e121f2a7f0f94006d0d4bcacf50016aef0b67765692bb7a06367365f13a521ec129c260451a682e658048729ff514e77e4cdffab1b') // signature mock
      default:
        return null
    }
  }

  protected async calcStaticNetworkFees (): Promise<void> {
    const xor = KnownAssets.get(KnownSymbols.XOR)
    const operations = [
      Operation.AddLiquidity,
      Operation.CreatePair,
      Operation.EthBridgeIncoming,
      Operation.EthBridgeOutgoing,
      Operation.RegisterAsset,
      Operation.RemoveLiquidity,
      Operation.Swap,
      Operation.SwapAndSend,
      Operation.Transfer,
      Operation.ClaimVestedRewards,
      Operation.ClaimLiquidityProvisionRewards,
      Operation.ClaimExternalRewards
    ]
    // We don't need to know real account address for checking network fees
    const mockAccountAddress = 'cnRuw2R6EVgQW3e4h8XeiFym2iU17fNsms15zRGcg9YEJndAs'
    for (const operation of operations) {
      const extrinsic = this.getEmptyExtrinsic(operation)
      if (extrinsic) {
        const res = await extrinsic.paymentInfo(mockAccountAddress)
        this.NetworkFee[operation] = new FPNumber(res.partialFee, xor.decimals).toCodecString()
      }
    }
  }

  public formatAddress (address: string, withSoraPrefix = true): string {
    if (withSoraPrefix) {
      const publicKey = decodeAddress(address, false)
      return encodeAddress(publicKey, this.prefix)
    }
    const publicKey = decodeAddress(address, false, -1)
    return encodeAddress(publicKey)
  }

  /**
   * Validate address
   * @param address
   */
  public validateAddress (address: string): boolean {
    try {
      decodeAddress(address, false)
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
  Error = 'error',
  Usurped = 'usurped', // When TX is outdated
  Invalid = 'invalid' // When something happened before sending to network
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
  ClaimRewards = 'ClaimRewards',
  ClaimVestedRewards = 'ClaimVestedRewards', // Used for calc network fee
  ClaimLiquidityProvisionRewards = 'LiquidityProvisionRewards', // Used for calc network fee
  ClaimExternalRewards = 'ClaimExternalRewards', // Used for calc network fee
  TransferAll = 'TransferAll', // Batch with transfers
  SwapAndSend = 'SwapAndSend'
}

export interface History {
  txId?: string;
  type: Operation;
  amount?: string;
  symbol?: string;
  assetAddress?: string;
  id?: string;
  blockId?: string;
  blockHeight?: string;
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
  liquidityProviderFee?: CodecString;
  soraNetworkFee?: CodecString;
}
