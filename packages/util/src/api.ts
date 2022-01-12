import { assert, isHex } from '@polkadot/util'
import { keyExtractSuri, mnemonicValidate, mnemonicGenerate } from '@polkadot/util-crypto'
import keyring from '@polkadot/ui-keyring'
import { map } from '@polkadot/x-rxjs/operators'
import type { KeypairType } from '@polkadot/util-crypto/types'
import type { CreateResult } from '@polkadot/ui-keyring/types'
import type { KeyringPair$Json } from '@polkadot/keyring/types'
import type { Signer, Observable } from '@polkadot/types/types'

import { decrypt, encrypt } from './crypto'
import { BaseApi, Operation, KeyringType, isBridgeOperation, History } from './BaseApi'
import { CodecString, FPNumber, NumberLike } from './fp'
import { Messages } from './logger'
import { BridgeApi } from './BridgeApi'
import { Storage } from './storage'
import { SwapModule } from './swap'
import { RewardsModule } from './rewards'
import { PoolXykModule } from './poolXyk'
import { ReferralSystemModule } from './referralSystem'
import { AssetsModule } from './assets'
import { AccountAsset, Asset } from './assets/types'
import { XOR } from './assets/consts'

/**
 * Contains all necessary data and functions for the wallet & polkaswap client
 */
export class Api extends BaseApi {
  private readonly type: KeypairType = KeyringType
  public readonly defaultSlippageTolerancePercent = 0.5
  public readonly seedLength = 12

  public readonly bridge: BridgeApi = new BridgeApi()

  public readonly swap: SwapModule = new SwapModule(this)
  public readonly rewards: RewardsModule = new RewardsModule(this)
  public readonly poolXyk: PoolXykModule = new PoolXykModule(this)
  public readonly referralSystem: ReferralSystemModule = new ReferralSystemModule(this)
  public readonly assets: AssetsModule = new AssetsModule(this)

  // # History methods

  public get accountHistory (): Array<History> {
    return this.history.filter(({ type }) => !isBridgeOperation(type))
  }

  public initAccountStorage () {
    super.initAccountStorage()
    this.bridge.initAccountStorage()

    // transfer old history to accountStorage
    if (this.storage) {
      const oldHistory = JSON.parse(this.storage.get('history')) || []

      if (oldHistory.length) {
        this.history = oldHistory
      }

      this.storage.remove('history')
    }
  }

  /**
   * Remove all history except bridge history
   * @param assetAddress If it's empty then all history will be removed, else - only history of the specific asset
   */
  public clearHistory (assetAddress?: string) {
    this.history = this.history.filter((item) =>
      isBridgeOperation(item.type) || (!!assetAddress && ![item.assetAddress, item.asset2Address].includes(assetAddress))
    )
  }

  /**
   * Set storage if it should be used as data storage
   * @param storage
   */
  public setStorage (storage: Storage): void {
    super.setStorage(storage)
    this.bridge.setStorage(storage)
  }

  // # Account management methods

  /**
   * Set signer if the pair is locked (For polkadot js extension usage)
   * @param signer
   */
  public setSigner (signer: Signer): void {
    super.setSigner(signer)
    this.bridge.setSigner(signer)
  }

  /**
   * Set account data
   * @param account
   */
  public setAccount (account: CreateResult): void {
    super.setAccount(account)
    this.bridge.setAccount(account)
  }

  /**
   * The first method you should run. Includes initialization process
   */
  public initialize (): void {
    const address = this.storage?.get('address')
    const password = this.storage?.get('password')
    const name = this.storage?.get('name')
    const isExternal = Boolean(this.storage?.get('isExternal'))
    keyring.loadAll({ type: KeyringType })
    if (!address) {
      return
    }
    const defaultAddress = this.formatAddress(address, false)
    const soraAddress = this.formatAddress(address)
    this.storage?.set('address', soraAddress)
    const pair = keyring.getPair(defaultAddress)

    const account = !isExternal
      ? keyring.addPair(pair, decrypt(password))
      : keyring.addExternal(defaultAddress, name ? { name } : {})

    this.setAccount(account)
    this.initAccountStorage()
  }

  /**
   * Before use the seed for wallet connection you may want to check its correctness
   * @param suri Seed which is set by the user
   */
  public checkSeed (suri: string): { address: string; suri: string } {
    const { phrase } = keyExtractSuri(suri)
    if (isHex(phrase)) {
      assert(isHex(phrase, 256), 'Hex seed is not 256-bits')
    } else {
      assert(String(phrase).split(' ').length === this.seedLength, `Mnemonic should contain ${this.seedLength} words`)
      assert(mnemonicValidate(phrase), 'There is no valid mnemonic seed')
    }
    return {
      address: keyring.createFromUri(suri, {}, this.type).address,
      suri
    }
  }

  /**
   * Import wallet operation
   * @param suri Seed of the wallet
   * @param name Name of the wallet account
   * @param password Password which will be set for the wallet
   */
  public importAccount (
    suri: string,
    name: string,
    password: string
  ): void {
    const account = keyring.addUri(suri, password, { name }, this.type)

    this.setAccount(account)

    if (this.storage) {
      this.storage.set('name', name)
      this.storage.set('password', encrypt(password))
      const soraAddress = this.formatAddress(account.pair.address)
      this.storage.set('address', soraAddress)
    }

    this.initAccountStorage()
  }

  /**
   * Change the account password.
   * It generates an error if `oldPassword` is invalid
   * @param oldPassword
   * @param newPassword
   */
  public changePassword (oldPassword: string, newPassword: string): void {
    const pair = this.accountPair
    try {
      if (!pair.isLocked) {
        pair.lock()
      }
      pair.decodePkcs8(oldPassword)
    } catch (error) {
      throw new Error('Old password is invalid')
    }
    keyring.encryptAccount(pair, newPassword)
    if (this.storage) {
      this.storage.set('password', encrypt(newPassword))
    }
  }

  /**
   * Change the account name
   * TODO: check it, polkadot-js extension doesn't change account name
   * @param name New name
   */
  public changeName (name: string): void {
    const pair = this.accountPair
    keyring.saveAccountMeta(pair, { ...pair.meta, name })
    if (this.storage) {
      this.storage.set('name', name)
    }
  }

  /**
   * Restore from JSON object.
   * It generates an error if JSON or/and password are not valid
   * @param json
   * @param password
   */
  public restoreFromJson (json: KeyringPair$Json, password: string): { address: string, name: string } {
    try {
      const pair = keyring.restoreAccount(json, password)
      return { address: pair.address, name: ((pair.meta || {}).name || '') as string }
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  /**
   * Export a JSON with the account data
   * @param password
   * @param encrypted If `true` then it will be decrypted. `false` by default
   */
  public exportAccount (password: string, encrypted = false): string {
    let pass = password
    if (encrypted) {
      pass = decrypt(password)
    }
    const pair = this.accountPair
    return JSON.stringify(keyring.backupAccount(pair, pass))
  }

  /**
   * Create seed phrase. It returns `{ address, seed }` object.
   */
  public createSeed (): { address: string, seed: string } {
    const seed = mnemonicGenerate(this.seedLength)
    return {
      address: keyring.createFromUri(seed, {}, this.type).address,
      seed
    }
  }

  /**
   * Import account by PolkadotJs extension
   * @param address
   * @param name
   */
  public importByPolkadotJs (address: string, name: string): void {
    const account = keyring.addExternal(address, { name: name || '' })

    this.setAccount(account)

    if (this.storage) {
      const soraAddress = this.formatAddress(account.pair.address)
      this.storage.set('name', name)
      this.storage.set('address', soraAddress)
      this.storage.set('isExternal', true)
    }

    this.initAccountStorage()
  }

  // # API methods

  private async calcRegisterAssetParams (
    symbol: string,
    name: string,
    totalSupply: NumberLike,
    extensibleSupply: boolean,
    nft = {
      isNft: false,
      content: null,
      description: null
    }) {
    assert(this.account, Messages.connectWallet)
    // TODO: add assert for symbol, name and totalSupply params
    const supply = nft.isNft ? new FPNumber(totalSupply, 0) : new FPNumber(totalSupply)
    return {
      args: [
        symbol,
        name,
        supply.toCodecString(),
        extensibleSupply,
        nft.isNft,
        nft.content,
        nft.description
      ]
    }
  }

  public async getNftContent(address): Promise<string>{
    const content = await this.api.query.assets.assetContentSource(address)
    return `${content.toHuman()}`
  }

  public async getNftDescription(address): Promise<string> {
    const desc = await this.api.query.assets.assetDescription(address)
    return `${desc.toHuman()}`
  }

  /**
   * Register asset
   * @param symbol string with asset symbol
   * @param name string with asset name
   * @param totalSupply
   * @param extensibleSupply
   */
  public async registerAsset (
    symbol: string,
    name: string,
    totalSupply: NumberLike,
    extensibleSupply = false,
    nft = {
      isNft: false,
      content: null,
      description: null
    }
  ): Promise<void> {
    const params = await this.calcRegisterAssetParams(symbol, name, totalSupply, extensibleSupply, nft)
    await this.submitExtrinsic(
      (this.api.tx.assets.register as any)(...params.args),
      this.account.pair,
      {
        symbol,
        type: Operation.RegisterAsset
      }
    )
  }

  /**
   * Transfer amount from account
   * @param asset Asset object
   * @param toAddress Account address
   * @param amount Amount value
   */
  public async transfer (asset: Asset | AccountAsset, toAddress: string, amount: NumberLike): Promise<void> {
    assert(this.account, Messages.connectWallet)
    const assetAddress = asset.address
    const formattedToAddress = toAddress.slice(0, 2) === 'cn' ? toAddress : this.formatAddress(toAddress)
    await this.submitExtrinsic(
      this.api.tx.assets.transfer(assetAddress, toAddress, new FPNumber(amount, asset.decimals).toCodecString()),
      this.account.pair,
      { symbol: asset.symbol, to: formattedToAddress, amount: `${amount}`, assetAddress, type: Operation.Transfer }
    )
  }

  private async prepareTransferAllTxs (data: Array<{ assetAddress: string; toAddress: string; amount: NumberLike; }>) {
    assert(this.account, Messages.connectWallet)
    assert(data.length, Messages.noTransferData)

    return data.map(item => {
      return this.api.tx.assets.transfer(item.assetAddress, item.toAddress, new FPNumber(item.amount).toCodecString())
    })
  }

  public async getTransferAllNetworkFee (data: Array<{ assetAddress: string; toAddress: string; amount: NumberLike; }>): Promise<CodecString> {
    const transactions = await this.prepareTransferAllTxs(data)
    return await this.getNetworkFee(Operation.TransferAll, transactions)
  }

  /**
   * Transfer all data from array
   * @param data Transfer data
   */
   public async transferAll (data: Array<{ assetAddress: string; toAddress: string; amount: NumberLike; }>): Promise<void> {
    const transactions = await this.prepareTransferAllTxs(data)

    await this.submitExtrinsic(
      this.api.tx.utility.batchAll(transactions),
      this.account.pair,
      { type: Operation.TransferAll }
    )
  }

  public getSystemBlockNumberObservable (): Observable<string> {
    return this.apiRx.query.system.number().pipe(map(codec => codec.toString()))
  }

  public getRuntimeVersionObservable (): Observable<number> {
    return this.apiRx.query.system.lastRuntimeUpgrade().pipe(map(value => (value.toJSON() as any).specVersion))
  }

  // # Logout & reset methods

  public unsubscribeAll (): void {
    this.assets.unsubscribeFromAllBalancesUpdates()
    this.poolXyk.unsubscribeFromAllUpdates()
  }

  /**
   * Remove all wallet data
   */
  public logout (): void {
    const address = this.account.pair.address
    keyring.forgetAccount(address)
    keyring.forgetAddress(address)

    this.assets.accountAssets = []
    this.poolXyk.accountLiquidity = []

    this.unsubscribeAll()

    super.logout()
    this.bridge.logout()
  }

  // # Formatter methods
  public hasEnoughXor (asset: AccountAsset, amount: string | number, fee: FPNumber | CodecString): boolean {
    const xorDecimals = XOR.decimals
    const fpFee = fee instanceof FPNumber ? fee : FPNumber.fromCodecValue(fee, xorDecimals)
    if (asset.address === XOR.address) {
      const fpBalance = FPNumber.fromCodecValue(asset.balance.transferable, xorDecimals)
      const fpAmount = new FPNumber(amount, xorDecimals)
      return FPNumber.lte(fpFee, fpBalance.sub(fpAmount))
    }
    // Here we should be sure that xor value of account was tracked & updated
    const xorAccountAsset = this.getAsset(XOR.address)
    if (!xorAccountAsset) {
      return false
    }
    const xorBalance = FPNumber.fromCodecValue(xorAccountAsset.balance.transferable, xorDecimals)
    return FPNumber.lte(fpFee, xorBalance)
  }
  /**
   * Divide the first asset by the second
   * @param firstAssetAddress
   * @param secondAssetAddress
   * @param firstAmount
   * @param secondAmount
   * @param reversed If `true`: the second by the first (`false` by default)
   * @returns Formatted string
   */
  public async divideAssets (
    firstAssetAddress: string,
    secondAssetAddress: string,
    firstAmount: NumberLike,
    secondAmount: NumberLike,
    reversed = false
  ): Promise<string> {
    const firstAsset = await this.getAssetInfo(firstAssetAddress)
    const secondAsset = await this.getAssetInfo(secondAssetAddress)
    const decimals = Math.max(firstAsset.decimals, secondAsset.decimals)
    const one = new FPNumber(1, decimals)
    const firstAmountNum = new FPNumber(firstAmount, decimals)
    const secondAmountNum = new FPNumber(secondAmount, decimals)
    const result = !reversed
      ? firstAmountNum.div(!secondAmountNum.isZero() ? secondAmountNum : one)
      : secondAmountNum.div(!firstAmountNum.isZero() ? firstAmountNum : one)
    return result.format()
  }
}

/** Api object */
export const api = new Api()
