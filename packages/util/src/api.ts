import { assert, isHex } from '@polkadot/util'
import { keyExtractSuri, mnemonicValidate, mnemonicGenerate } from '@polkadot/util-crypto'
import { KeypairType } from '@polkadot/util-crypto/types'
import keyring from '@polkadot/ui-keyring'
import { CreateResult } from '@polkadot/ui-keyring/types'
import { KeyringPair, KeyringPair$Json } from '@polkadot/keyring/types'
import { Signer, Observable } from '@polkadot/types/types'
import type { Subscription } from '@polkadot/x-rxjs'
import { Subject } from '@polkadot/x-rxjs'

import {
  KnownAssets,
  getAssetBalance,
  AccountAsset,
  KnownSymbols,
  Asset,
  getAssetInfo,
  getAssets,
  PoolTokens,
  AccountLiquidity,
  AccountBalance,
  getAssetBalanceObservable,
  ZeroBalance,
  getBalance
} from './assets'
import { decrypt, encrypt } from './crypto'
import { BaseApi, Operation, KeyringType, isBridgeOperation, History } from './BaseApi'
import { SwapResult, LiquiditySourceTypes } from './swap'
import { RewardingEvents, RewardInfo, isClaimableReward, hasRewardsForEvents, prepareRewardInfo } from './rewards'
import { CodecString, FPNumber, NumberLike } from './fp'
import { Messages } from './logger'
import { BridgeApi } from './BridgeApi'
import { Storage } from './storage'

/**
 * Contains all necessary data and functions for the wallet
 */
export class Api extends BaseApi {
  private readonly type: KeypairType = KeyringType
  private readonly defaultDEXId = 0
  public readonly defaultSlippageTolerancePercent = 0.5
  public readonly seedLength = 12
  public readonly bridge: BridgeApi = new BridgeApi()

  private _assets: Array<AccountAsset> = []
  private _accountAssetsAddresses: Array<string> = [] 
  private _liquidity: Array<AccountLiquidity> = []
  private balanceSubscriptions: Array<Subscription> = []
  private assetsBalanceSubject = new Subject<void>()
  public assetsBalanceUpdated = this.assetsBalanceSubject.asObservable()

  public get accountPair (): KeyringPair {
    if (!this.account) {
      return null
    }
    return this.account.pair
  }

  public get accountJson (): KeyringPair$Json {
    if (!this.account) {
      return null
    }
    return this.account.json
  }

  public get accountAssets (): Array<AccountAsset> {
    if (this.storage) {
      this._assets = JSON.parse(this.storage.get('assets')) as Array<AccountAsset> || []
    }
    return this._assets
  }

  public set accountAssets (assets: Array<AccountAsset>) {
    this.storage?.set('assets', JSON.stringify(assets))
    this._assets = [...assets]
  }

  private addToAccountAssetsList (asset: AccountAsset): void {
    const assetsCopy = [...this.accountAssets]
    const index = assetsCopy.findIndex(item => item.address === asset.address)

    ~index ? assetsCopy[index] = asset : assetsCopy.push(asset)

    this.accountAssets = assetsCopy
  }

  private removeFromAccountAssetsList (address: string): void {
    this.accountAssets = this.accountAssets.filter(item => item.address !== address)
  }

  // Account assets addresses

  private get accountAssetsAddresses (): Array<string> {
    if (this.accountStorage) {
      this._accountAssetsAddresses = JSON.parse(this.accountStorage.get('assetsAddresses')) as Array<string> || []
    }
    return this._accountAssetsAddresses
  }

  private set accountAssetsAddresses (assetsAddresses: Array<string>) {
    this.accountStorage?.set('assetsAddresses', JSON.stringify(assetsAddresses))
    this._accountAssetsAddresses = [...assetsAddresses]
  }

  private addToAccountAssetsAddressesList (assetAddress: string): void {
    const assetsAddressesCopy = [...this.accountAssetsAddresses]
    const index = assetsAddressesCopy.findIndex(address => address === assetAddress)

    ~index ? assetsAddressesCopy[index] = assetAddress : assetsAddressesCopy.push(assetAddress)

    this.accountAssetsAddresses = assetsAddressesCopy
  }

  private removeFromAccountAssetsAddressesList (address: string): void {
    this.accountAssetsAddresses = this.accountAssetsAddresses.filter(item => item !== address)
  }

  private addAccountAsset (asset: AccountAsset): void {
    this.addToAccountAssetsList(asset)
    this.addToAccountAssetsAddressesList(asset.address)
  }

  private removeAccountAsset (address: string): void {
    this.removeFromAccountAssetsList(address)
    this.removeFromAccountAssetsAddressesList(address)
  }

  public removeAsset (address: string): void {
    this.removeAccountAsset(address)
    this.updateAccountAssets()
  }

  // Account Liquidity methods

  public get accountLiquidity (): Array<AccountLiquidity> {
    if (this.storage) {
      this._liquidity = JSON.parse(this.storage.get('liquidity')) as Array<AccountLiquidity> || []
    }
    return this._liquidity
  }

  public set accountLiquidity (liquidity: Array<AccountLiquidity>) {
    this.storage?.set('liquidity', JSON.stringify(liquidity))
    this._liquidity = [...liquidity]
  }

  private addToLiquidityList (asset: AccountLiquidity): void {
    const liquidityCopy = [...this.accountLiquidity]
    const index = liquidityCopy.findIndex(item => item.address === asset.address)

    ~index ? liquidityCopy[index] = asset : liquidityCopy.push(asset)

    this.accountLiquidity = liquidityCopy
  }

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

  public getAsset (address: string): AccountAsset | null {
    return this.accountAssets.find(asset => asset.address === address) ?? null
  }

  public getAssetBalanceObservable (asset: AccountAsset): Observable<AccountBalance> {
    return getAssetBalanceObservable(this.apiRx, this.account.pair.address, asset.address, asset.decimals)
  }

  private unsubscribeFromAllBalancesUpdates () {
    for (const subscription of this.balanceSubscriptions) {
      subscription.unsubscribe()
    }
    this.balanceSubscriptions = []
  }

  /**
   * Set storage if it should be used as data storage
   * @param storage
   */
  public setStorage (storage: Storage): void {
    super.setStorage(storage)
    this.bridge.setStorage(storage)
  }

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
    const pair = keyring.getPair(address)

    const account = !isExternal
      ? keyring.addPair(pair, decrypt(password))
      : keyring.addExternal(address, name ? { name } : {})

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
      this.storage.set('address', this.account.pair.address)
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
      this.storage.set('name', name)
      this.storage.set('address', this.account.pair.address)
      this.storage.set('isExternal', true)
    }

    this.initAccountStorage()
  }

  private async calcRegisterAssetParams (symbol: string, name: string, totalSupply: NumberLike, extensibleSupply: boolean) {
    assert(this.account, Messages.connectWallet)
    // TODO: add assert for symbol, name and totalSupply params
    const supply = new FPNumber(totalSupply)
    return {
      args: [
        symbol,
        name,
        supply.toCodecString(),
        extensibleSupply
      ]
    }
  }

  private prepareLiquiditySources (liquiditySource: LiquiditySourceTypes): Array<LiquiditySourceTypes> {
    return liquiditySource ? [liquiditySource] : []
  }

  /**
   * Get register asset network fee
   * @param symbol string with asset symbol
   * @param name string with asset name
   * @param totalSupply
   * @param extensibleSupply
   * @returns register asset network fee as a string (value * 10 ^ decimals)
   */
  public async getRegisterAssetNetworkFee (symbol: string, name: string, totalSupply: NumberLike, extensibleSupply = false): Promise<CodecString> {
    const params = await this.calcRegisterAssetParams(symbol, name, totalSupply, extensibleSupply)
    return await this.getNetworkFee(this.accountPair, Operation.RegisterAsset, ...params.args)
  }

  /**
   * Register asset
   * @param symbol string with asset symbol
   * @param name string with asset name
   * @param totalSupply
   * @param extensibleSupply
   */
  public async registerAsset (symbol: string, name: string, totalSupply: NumberLike, extensibleSupply = false): Promise<void> {
    const params = await this.calcRegisterAssetParams(symbol, name, totalSupply, extensibleSupply)
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
   * Get asset information
   * @param address asset address
   */
  public async getAssetInfo (address: string): Promise<Asset> {
    const knownAsset = KnownAssets.get(address)
    if (knownAsset) {
      return knownAsset
    }
    const existingAsset = this.getAsset(address) || this.accountLiquidity.find(asset => asset.address === address)
    if (existingAsset) {
      return {
        address: existingAsset.address,
        decimals: existingAsset.decimals,
        symbol: existingAsset.symbol,
        name: existingAsset.name
      } as Asset
    }
    return await getAssetInfo(this.api, address)
  }

  /**
   * Get account asset information.
   * You can just check balance of any asset
   * @param address asset address
   * @param addToList should asset be added to list or not
   */
  public async getAccountAsset (address: string, addToList = false): Promise<AccountAsset> {
    assert(this.account, Messages.connectWallet)
    const { decimals, symbol, name } = await this.getAssetInfo(address)
    const asset = { address, decimals, symbol, name } as AccountAsset
    const result = await getAssetBalance(this.api, this.account.pair.address, address, decimals)
    asset.balance = result
    if (addToList) {
      this.addAccountAsset(asset)
      this.updateAccountAssets()
    }
    return asset
  }

  /**
   * Get a list of all known assets from `KnownAssets` array & from account storage
   */
  public async getKnownAccountAssets (): Promise<Array<AccountAsset>> {
    assert(this.account, Messages.connectWallet)

    const knownAssets: Array<AccountAsset> = []
    const knownAssetsAddresses = Object.values(KnownAssets).map(knownAsset => knownAsset.address)
    const assetsAddresses = new Set([...knownAssetsAddresses, ...this.accountAssetsAddresses])

    for (const assetAddress of assetsAddresses) {
      const asset = await this.getAccountAsset(assetAddress)
      this.addAccountAsset(asset)
      knownAssets.push(asset)
    }

    return knownAssets
  }

  /**
   * Set subscriptions for balance updates of the account asset list
   */
  public updateAccountAssets (): void {
    this.unsubscribeFromAllBalancesUpdates()
    assert(this.account, Messages.connectWallet)
    for (const asset of this.accountAssets) {
      const subscription = this.getAssetBalanceObservable(asset).subscribe((accountBalance: AccountBalance) => {
        asset.balance = accountBalance
        this.addAccountAsset(asset)
        this.assetsBalanceSubject.next()
      })
      this.balanceSubscriptions.push(subscription)
    }
  }

  /**
   * Get transfer network fee in XOR
   * @param assetAddress Asset address
   * @param toAddress Account address
   * @param amount Amount value
   * @returns fee ** decimals
   */
  public async getTransferNetworkFee (assetAddress: string, toAddress: string, amount: NumberLike): Promise<CodecString> {
    assert(this.account, Messages.connectWallet)
    const asset = await this.getAssetInfo(assetAddress)
    return await this.getNetworkFee(
      this.accountPair,
      Operation.Transfer,
      assetAddress,
      toAddress,
      new FPNumber(amount, asset.decimals).toCodecString()
    )
  }

  /**
   * Transfer amount from account
   * @param assetAddress Asset address
   * @param toAddress Account address
   * @param amount Amount value
   */
  public async transfer (assetAddress: string, toAddress: string, amount: NumberLike): Promise<void> {
    assert(this.account, Messages.connectWallet)
    const asset = await this.getAssetInfo(assetAddress)
    await this.submitExtrinsic(
      this.api.tx.assets.transfer(assetAddress, toAddress, new FPNumber(amount, asset.decimals).toCodecString()),
      this.account.pair,
      { symbol: asset.symbol, to: toAddress, amount: `${amount}`, assetAddress, type: Operation.Transfer }
    )
  }

  /**
   * Transfer all data from array
   * @param data Transfer data
   */
   public async transferAll (data: Array<{ assetAddress: string; toAddress: string; amount: NumberLike; }>): Promise<void> {
    assert(this.account, Messages.connectWallet)
    assert(data.length, Messages.noTransferData)

    const transactions = data.map(item => {
      return this.api.tx.assets.transfer(item.assetAddress, item.toAddress, new FPNumber(item.amount).toCodecString())
    })

    await this.submitExtrinsic(
      this.api.tx.utility.batchAll(transactions),
      this.account.pair,
      { type: Operation.Transfer }
    )
  }

  /**
   * Check swap operation
   * @param firstAssetAddress
   * @param secondAssetAddress
   * @returns availability of swap operation
   */
  async checkSwap (firstAssetAddress: string, secondAssetAddress: string): Promise<boolean> {
    return (await (this.api.rpc as any).liquidityProxy.isPathAvailable(this.defaultDEXId, firstAssetAddress, secondAssetAddress)).isTrue
  }

  async getListEnabledSourcesForPath (firstAssetAddress: string, secondAssetAddress: string): Promise<Array<LiquiditySourceTypes>> {
    const list = (await (this.api.rpc as any).liquidityProxy.listEnabledSourcesForPath(
      this.defaultDEXId,
      firstAssetAddress,
      secondAssetAddress
    )).toJSON()

    return (list as Array<LiquiditySourceTypes>)
  }

  /**
   * Get swap result for the demonstration purposes
   * @param assetAAddress Asset A address
   * @param assetBAddress Asset B address
   * @param amount Amount value (Asset A if Exchange A, else - Asset B)
   * @param isExchangeB Exchange A if `isExchangeB=false` else Exchange B. `false` by default
   */
  public async getSwapResult (
    assetAAddress: string,
    assetBAddress: string,
    amount: NumberLike,
    isExchangeB = false,
    liquiditySource = LiquiditySourceTypes.Default
  ): Promise<SwapResult> {
    const xor = KnownAssets.get(KnownSymbols.XOR)
    const assetA = await this.getAssetInfo(assetAAddress)
    const assetB = await this.getAssetInfo(assetBAddress)
    const liquiditySources = this.prepareLiquiditySources(liquiditySource)
    const result = await (this.api.rpc as any).liquidityProxy.quote(
      this.defaultDEXId,
      assetAAddress,
      assetBAddress,
      new FPNumber(amount, (!isExchangeB ? assetA : assetB).decimals).toCodecString(),
      !isExchangeB ? 'WithDesiredInput' : 'WithDesiredOutput',
      liquiditySources,
      liquiditySource === LiquiditySourceTypes.Default ? 'Disabled' : 'AllowSelected'
    )
    const value = !result.isNone ? result.unwrap() : { amount: 0, fee: 0, rewards: [], amount_without_impact: 0 }
    return {
      amount: new FPNumber(value.amount, (!isExchangeB ? assetB : assetA).decimals).toCodecString(),
      fee: new FPNumber(value.fee, xor.decimals).toCodecString(),
      rewards: 'toJSON' in value.rewards ? value.rewards.toJSON() : value.rewards,
      amountWithoutImpact: new FPNumber(value.amount_without_impact, (!isExchangeB ? assetB : assetA).decimals).toCodecString(),
    } as SwapResult
  }

  /**
   * Get min or max value before Swap
   * @param assetAAddress Asset A address
   * @param assetBAddress Asset B address
   * @param resultAmount Result of the swap operation, `getSwapResult().amount` (but it's just string)
   * @param slippageTolerance Slippage tolerance coefficient (in %)
   * @param isExchangeB If `isExchangeB` then Exchange B and it calculates max sold,
   * else - Exchange A and it calculates min received. `false` by default
   */
  public async getMinMaxValue (
    assetAAddress: string,
    assetBAddress: string,
    resultAmount: string,
    slippageTolerance: NumberLike = this.defaultSlippageTolerancePercent,
    isExchangeB = false
  ): Promise<CodecString> {
    const assetA = await this.getAssetInfo(assetAAddress)
    const assetB = await this.getAssetInfo(assetBAddress)
    const resultDecimals = (!isExchangeB ? assetB : assetA).decimals
    const result = new FPNumber(resultAmount, resultDecimals)
    const resultMulSlippage = result.mul(new FPNumber(Number(slippageTolerance) / 100, resultDecimals))
    return (!isExchangeB ? result.sub(resultMulSlippage) : result.add(resultMulSlippage)).toCodecString()
  }

  private async calcSwapParams (
    assetAAddress: string,
    assetBAddress: string,
    amountA: NumberLike,
    amountB: NumberLike,
    slippageTolerance: NumberLike = this.defaultSlippageTolerancePercent,
    isExchangeB = false,
    liquiditySource = LiquiditySourceTypes.Default
  ) {
    assert(this.account, Messages.connectWallet)
    const assetA = await this.getAssetInfo(assetAAddress)
    const assetB = await this.getAssetInfo(assetBAddress)
    const desiredDecimals = (!isExchangeB ? assetA : assetB).decimals
    const resultDecimals = (!isExchangeB ? assetB : assetA).decimals
    const desiredCodecString = (new FPNumber(!isExchangeB ? amountA : amountB, desiredDecimals)).toCodecString()
    const result = new FPNumber(!isExchangeB ? amountB : amountA, resultDecimals)
    const resultMulSlippage = result.mul(new FPNumber(Number(slippageTolerance) / 100))
    const liquiditySources = this.prepareLiquiditySources(liquiditySource)
    const params = {} as any
    if (!isExchangeB) {
      params.WithDesiredInput = {
        desired_amount_in: desiredCodecString,
        min_amount_out: result.sub(resultMulSlippage).toCodecString()
      }
    } else {
      params.WithDesiredOutput = {
        desired_amount_out: desiredCodecString,
        max_amount_in: result.add(resultMulSlippage).toCodecString()
      }
    }
    return {
      args: [
        this.defaultDEXId,
        assetAAddress,
        assetBAddress,
        params,
        liquiditySources,
        liquiditySource === LiquiditySourceTypes.Default ? 'Disabled' : 'AllowSelected'
      ],
      assetA,
      assetB
    }
  }

  /**
   * Get swap network fee
   * @param assetAAddress Asset A address
   * @param assetBAddress Asset B address
   * @param amountA Amount A value
   * @param amountB Amount B value
   * @param slippageTolerance Slippage tolerance coefficient (in %)
   * @param isExchangeB Exchange A if `isExchangeB=false` else Exchange B. `false` by default
   * @returns fee ** decimals
   */
  public async getSwapNetworkFee (
    assetAAddress: string,
    assetBAddress: string,
    amountA: NumberLike,
    amountB: NumberLike,
    slippageTolerance: NumberLike = this.defaultSlippageTolerancePercent,
    isExchangeB = false,
    liquiditySource = LiquiditySourceTypes.Default
  ): Promise<CodecString> {
    const params = await this.calcSwapParams(assetAAddress, assetBAddress, amountA, amountB, slippageTolerance, isExchangeB, liquiditySource)
    return await this.getNetworkFee(this.accountPair, Operation.Swap, ...params.args)
  }

  /**
   * Swap operation
   * @param assetAAddress Asset A address
   * @param assetBAddress Asset B address
   * @param amountA Amount A value
   * @param amountB Amount B value
   * @param slippageTolerance Slippage tolerance coefficient (in %)
   * @param isExchangeB Exchange A if `isExchangeB=false` else Exchange B. `false` by default
   */
  public async swap (
    assetAAddress: string,
    assetBAddress: string,
    amountA: NumberLike,
    amountB: NumberLike,
    slippageTolerance: NumberLike = this.defaultSlippageTolerancePercent,
    isExchangeB = false,
    liquiditySource = LiquiditySourceTypes.Default
  ): Promise<void> {
    const params = await this.calcSwapParams(assetAAddress, assetBAddress, amountA, amountB, slippageTolerance, isExchangeB, liquiditySource)
    if (!this.getAsset(params.assetB.address)) {
      this.addAccountAsset({ ...params.assetB, balance: ZeroBalance })
      this.updateAccountAssets()
    }
    await this.submitExtrinsic(
      (this.api.tx.liquidityProxy as any).swap(...params.args),
      this.account.pair,
      {
        symbol: params.assetA.symbol,
        assetAddress: params.assetA.address,
        amount: `${amountA}`,
        symbol2: params.assetB.symbol,
        asset2Address: params.assetB.address,
        amount2: `${amountB}`,
        liquiditySource,
        type: Operation.Swap
      }
    )
  }

  /**
   * Get account liquidity with pair where the first symbol is `XOR` and the second is from `accountAssets`
   */
  public async getKnownAccountLiquidity (): Promise<Array<AccountLiquidity>> {
    assert(this.account, Messages.connectWallet)
    const xor = KnownAssets.get(KnownSymbols.XOR)
    const accountLiquidity: Array<AccountLiquidity> = []
    for (const item of this.accountAssets.filter(item => item.address !== xor.address)) {
      const props = (await this.api.query.poolXyk.properties(xor.address, item.address)).toJSON() as Array<string>
      if (!props || !props.length) {
        continue
      }
      const result = await getBalance(this.api, this.account.pair.address, props[2])
      if (new FPNumber(result).isZero()) {
        continue
      }
      const { decimals, symbol, name } = await this.getAssetInfo(props[2])
      const balance = new FPNumber(result, decimals).toCodecString()
      if (!Number(balance)) {
        continue
      }
      const [reserveA, reserveB] = await this.getLiquidityReserves(xor.address, item.address, decimals, decimals)
      const [balanceA, balanceB, totalSupply] = await this.estimateTokensRetrieved(xor.address, item.address, balance, reserveA, reserveB, props[2], decimals, decimals)
      const fpBalanceA = FPNumber.fromCodecValue(balanceA, decimals)
      const fpBalanceB = FPNumber.fromCodecValue(balanceB, decimals)
      const pts = FPNumber.fromCodecValue(totalSupply, decimals)
      const minted = FPNumber.min(
        fpBalanceA.mul(pts).div(FPNumber.fromCodecValue(reserveA, decimals)),
        fpBalanceB.mul(pts).div(FPNumber.fromCodecValue(reserveB, decimals))
      )
      const asset = {
        address: props[2],
        firstAddress: xor.address,
        secondAddress: item.address,
        firstBalance: balanceA,
        secondBalance: balanceB,
        symbol,
        decimals,
        balance,
        name,
        poolShare: minted.div(pts).mul(new FPNumber(100)).format() || '0'
      } as AccountLiquidity
      accountLiquidity.push(asset)
    }
    this.accountLiquidity = accountLiquidity
    return accountLiquidity
  }

  /**
   * Update already added liquidity
   */
  public async updateAccountLiquidity (): Promise<Array<AccountLiquidity>> {
    assert(this.account, Messages.connectWallet)
    for (const asset of this.accountLiquidity) {
      const result = await getBalance(this.api, this.account.pair.address, asset.address)
      const [reserveA, reserveB] = await this.getLiquidityReserves(asset.firstAddress, asset.secondAddress)
      const [balanceA, balanceB] = await this.estimateTokensRetrieved(
        asset.firstAddress,
        asset.secondAddress,
        asset.balance,
        reserveA,
        reserveB,
        asset.address
      )
      asset.balance = new FPNumber(result, asset.decimals).toCodecString()
      asset.firstBalance = balanceA
      asset.secondBalance = balanceB
      this.addToLiquidityList(asset)
    }

    return this.accountLiquidity
  }

  /**
   * Check liquidity create/add operation
   * @param firstAssetAddress
   * @param secondAssetAddress
   */
  public async checkLiquidity (firstAssetAddress: string, secondAssetAddress: string): Promise<boolean> {
    const props = (await this.api.query.poolXyk.properties(firstAssetAddress, secondAssetAddress)).toJSON() as Array<string>
    if (!props || !props.length) {
      return false
    }
    return true
  }

  /**
   * Get liquidity
   * @param firstAssetAddress
   * @param secondAssetAddress
   */
  public async getLiquidityInfo (firstAssetAddress: string, secondAssetAddress: string): Promise<Asset> {
    const props = (await this.api.query.poolXyk.properties(firstAssetAddress, secondAssetAddress)).toJSON() as Array<string>
    if (!props || !props.length) {
      return null
    }
    const poolTokenAddress = props[2]
    return await this.getAssetInfo(poolTokenAddress)
  }

  /**
   * Get account liquidity information
   * @param firstAssetAddress
   * @param secondAssetAddress
   */
  public async getAccountLiquidity (firstAssetAddress: string, secondAssetAddress: string): Promise<AccountLiquidity> {
    assert(this.account, Messages.connectWallet)
    const liquidityInfo = await this.getLiquidityInfo(firstAssetAddress, secondAssetAddress)
    if (!liquidityInfo) {
      return null
    }
    const { symbol, address, decimals, name } = liquidityInfo
    const asset = {
      decimals,
      symbol,
      address,
      name,
      firstAddress: firstAssetAddress,
      secondAddress: secondAssetAddress
    } as AccountLiquidity
    const poolTokenBalance = await getBalance(this.api, this.account.pair.address, address)
    const firstToken = await this.getAssetInfo(firstAssetAddress)
    const secondToken = await this.getAssetInfo(secondAssetAddress)
    const firstTokenBalance = await getBalance(this.api, this.account.pair.address, firstAssetAddress)
    const secondTokenBalance = await getBalance(this.api, this.account.pair.address, secondAssetAddress)
    asset.balance = new FPNumber(poolTokenBalance, asset.decimals).toCodecString()
    asset.firstBalance = new FPNumber(firstTokenBalance, firstToken.decimals).toCodecString()
    asset.secondBalance = new FPNumber(secondTokenBalance, secondToken.decimals).toCodecString()
    return asset
  }

  /**
   * Get liquidity reserves.
   * If the output will be `['0', '0']` then the client is the first liquidity provider
   * @param firstAssetAddress
   * @param secondAssetAddress
   * @param firstAssetDecimals If it's not set then request about asset info will be performed
   * @param secondAssetDecimals If it's not set then request about asset info will be performed
   */
  public async getLiquidityReserves (
    firstAssetAddress: string,
    secondAssetAddress: string,
    firstAssetDecimals?: number,
    secondAssetDecimals?: number
  ): Promise<Array<CodecString>> {
    const result = await this.api.query.poolXyk.reserves(firstAssetAddress, secondAssetAddress) as any // Array<Balance>
    if (!result || result.length !== 2) {
      return ['0', '0']
    }
    firstAssetDecimals = firstAssetDecimals ?? (await this.getAssetInfo(firstAssetAddress)).decimals
    secondAssetDecimals = secondAssetDecimals ?? (await this.getAssetInfo(secondAssetAddress)).decimals
    const firstValue = new FPNumber(result[0], firstAssetDecimals)
    const secondValue = new FPNumber(result[1], secondAssetDecimals)
    return [firstValue.toCodecString(), secondValue.toCodecString()]
  }

  /**
   * Estimate tokens retrieved.
   * Also it returns the total supply as `result[2]`
   * @param firstAssetAddress
   * @param secondAssetAddress
   * @param amount
   * @param firstTotal Reserve A from `getLiquidityReserves()[0]`
   * @param secondTotal Reserve B from `getLiquidityReserves()[1]`
   * @param poolTokenAddress If it isn't set then it will be found by the get request
   * @param firstAssetDecimals If it's not set then request about asset info will be performed
   * @param secondAssetDecimals If it's not set then request about asset info will be performed
   */
  public async estimateTokensRetrieved (
    firstAssetAddress: string,
    secondAssetAddress: string,
    amount: CodecString,
    firstTotal: CodecString,
    secondTotal: CodecString,
    poolTokenAddress?: string,
    firstAssetDecimals?: number,
    secondAssetDecimals?: number
  ): Promise<Array<CodecString>> {
    firstAssetDecimals = firstAssetDecimals ?? (await this.getAssetInfo(firstAssetAddress)).decimals
    secondAssetDecimals = secondAssetDecimals ?? (await this.getAssetInfo(secondAssetAddress)).decimals
    const a = FPNumber.fromCodecValue(firstTotal, firstAssetDecimals)
    const b = FPNumber.fromCodecValue(secondTotal, secondAssetDecimals)
    if (a.isZero() && b.isZero()) {
      return ['0', '0']
    }
    const poolToken = await (
      poolTokenAddress
        ? this.getAssetInfo(poolTokenAddress)
        : this.getLiquidityInfo(firstAssetAddress, secondAssetAddress)
    )
    const pIn = FPNumber.fromCodecValue(amount, poolToken.decimals)
    const totalSupply = await (this.api.rpc as any).assets.totalSupply(poolToken.address) // BalanceInfo
    const pts = new FPNumber(totalSupply, poolToken.decimals)
    const aOut = pIn.mul(a).div(pts)
    const bOut = pIn.mul(b).div(pts)
    return [aOut.toCodecString(), bOut.toCodecString(), pts.toCodecString()]
  }

  /**
   * Estimate pool tokens minted.
   * @param firstAssetAddress First asset address
   * @param secondAssetAddress Second asset address
   * @param firstAmount First asset amount
   * @param secondAmount Second asset amount
   * @param firstTotal checkLiquidityReserves()[0]
   * @param secondTotal checkLiquidityReserves()[1]
   */
  public async estimatePoolTokensMinted (
    firstAssetAddress: string,
    secondAssetAddress: string,
    firstAmount: NumberLike,
    secondAmount: NumberLike,
    firstTotal: CodecString,
    secondTotal: CodecString
  ): Promise<Array<CodecString>> {
    const firstAsset = await this.getAssetInfo(firstAssetAddress)
    const secondAsset = await this.getAssetInfo(secondAssetAddress)
    const aIn = new FPNumber(firstAmount, firstAsset.decimals)
    const bIn = new FPNumber(secondAmount, secondAsset.decimals)
    const a = FPNumber.fromCodecValue(firstTotal, firstAsset.decimals)
    const b = FPNumber.fromCodecValue(secondTotal, secondAsset.decimals)
    if (a.isZero() && b.isZero()) {
      const inaccuracy = new FPNumber('0.000000000000001')
      return [aIn.mul(bIn).sqrt().sub(inaccuracy).toCodecString()]
    }
    const poolToken = await this.getLiquidityInfo(firstAssetAddress, secondAssetAddress)
    const totalSupply = await (this.api.rpc as any).assets.totalSupply(poolToken.address) // BalanceInfo
    const pts = new FPNumber(totalSupply, poolToken.decimals)
    const result = FPNumber.min(aIn.mul(pts).div(a), bIn.mul(pts).div(b))
    return [result.toCodecString(), pts.toCodecString()]
  }

  private async calcAddLiquidityParams (
    firstAssetAddress: string,
    secondAssetAddress: string,
    firstAmount: NumberLike,
    secondAmount: NumberLike,
    slippageTolerance: NumberLike = this.defaultSlippageTolerancePercent
  ) {
    assert(this.account, Messages.connectWallet)
    const firstAsset = await this.getAssetInfo(firstAssetAddress)
    const secondAsset = await this.getAssetInfo(secondAssetAddress)
    const firstAmountNum = new FPNumber(firstAmount, firstAsset.decimals)
    const secondAmountNum = new FPNumber(secondAmount, secondAsset.decimals)
    const slippage = new FPNumber(Number(slippageTolerance) / 100)
    return {
      args: [
        this.defaultDEXId,
        firstAssetAddress,
        secondAssetAddress,
        firstAmountNum.toCodecString(),
        secondAmountNum.toCodecString(),
        firstAmountNum.sub(firstAmountNum.mul(slippage)).toCodecString(),
        secondAmountNum.sub(secondAmountNum.mul(slippage)).toCodecString()
      ],
      firstAsset,
      secondAsset
    }
  }

  /**
   * Get network fee for add liquidity operation
   * @param firstAssetAddress
   * @param secondAssetAddress
   * @param firstAmount
   * @param secondAmount
   * @param slippageTolerance Slippage tolerance coefficient (in %)
   */
  public async getAddLiquidityNetworkFee (
    firstAssetAddress: string,
    secondAssetAddress: string,
    firstAmount: NumberLike,
    secondAmount: NumberLike,
    slippageTolerance: NumberLike = this.defaultSlippageTolerancePercent
  ): Promise<CodecString> {
    const params = await this.calcAddLiquidityParams(firstAssetAddress, secondAssetAddress, firstAmount, secondAmount, slippageTolerance)
    return await this.getNetworkFee(this.accountPair, Operation.AddLiquidity, ...params.args)
  }

  /**
   * Add liquidity
   * @param firstAssetAddress
   * @param secondAssetAddress
   * @param firstAmount
   * @param secondAmount // TODO: add a case when 'B' should be calculated automatically
   * @param slippageTolerance Slippage tolerance coefficient (in %)
   */
  public async addLiquidity (
    firstAssetAddress: string,
    secondAssetAddress: string,
    firstAmount: NumberLike,
    secondAmount: NumberLike,
    slippageTolerance: NumberLike = this.defaultSlippageTolerancePercent
  ): Promise<void> {
    const params = await this.calcAddLiquidityParams(firstAssetAddress, secondAssetAddress, firstAmount, secondAmount, slippageTolerance)
    if (!this.getAsset(params.secondAsset.address)) {
      this.addAccountAsset({ ...params.secondAsset, balance: ZeroBalance })
      this.updateAccountAssets()
    }
    await this.submitExtrinsic(
      this.api.tx.poolXyk.depositLiquidity(...params.args),
      this.account.pair,
      {
        type: Operation.AddLiquidity,
        symbol: params.firstAsset.symbol,
        assetAddress: params.firstAsset.address,
        symbol2: params.secondAsset.symbol,
        asset2Address: params.secondAsset.address,
        amount: `${firstAmount}`,
        amount2: `${secondAmount}`
      }
    )
  }

  private async calcCreatePairParams (
    firstAssetAddress: string,
    secondAssetAddress: string,
    firstAmount: NumberLike,
    secondAmount: NumberLike,
    slippageTolerance: NumberLike = this.defaultSlippageTolerancePercent
  ) {
    const xor = KnownAssets.get(KnownSymbols.XOR)
    assert([firstAssetAddress, secondAssetAddress].includes(xor.address), Messages.xorIsRequired)
    const baseAssetId = firstAssetAddress === xor.address ? firstAssetAddress : secondAssetAddress
    const targetAssetId = firstAssetAddress !== xor.address ? firstAssetAddress : secondAssetAddress
    const exists = await this.checkLiquidity(baseAssetId, targetAssetId)
    assert(!exists, Messages.pairAlreadyCreated)
    const baseAssetAmount = baseAssetId === firstAssetAddress ? firstAmount : secondAmount
    const targetAssetAmount = targetAssetId === secondAssetAddress ? secondAmount : firstAmount
    const params = await this.calcAddLiquidityParams(baseAssetId, targetAssetId, baseAssetAmount, targetAssetAmount, slippageTolerance)
    return {
      pairCreationArgs: [
        this.defaultDEXId,
        baseAssetId,
        targetAssetId
      ],
      addLiquidityArgs: params.args,
      firstAsset: params.firstAsset,
      secondAsset: params.secondAsset,
      baseAssetAmount,
      targetAssetAmount
    }
  }

  /**
   * Get network fee for pair creation operation
   * @param firstAssetAddress
   * @param secondAssetAddress
   * @param firstAmount
   * @param secondAmount
   * @param slippageTolerance Slippage tolerance coefficient (in %)
   */
  public async getCreatePairNetworkFee (
    firstAssetAddress: string,
    secondAssetAddress: string,
    firstAmount: NumberLike,
    secondAmount: NumberLike,
    slippageTolerance: NumberLike = this.defaultSlippageTolerancePercent
  ): Promise<CodecString> {
    const params = await this.calcCreatePairParams(firstAssetAddress, secondAssetAddress, firstAmount, secondAmount, slippageTolerance)
    return await this.getNetworkFee(this.accountPair, Operation.CreatePair, params)
  }

  /**
   * Create token pair if user is the first liquidity provider and pair is not created.
   * Before it you should check liquidity
   * (`checkLiquidity()` -> `false`).
   *
   * Condition: Account **must** have CAN_MANAGE_DEX( DEXId ) permission,
   * XOR asset **should** be required for any pair
   * @param firstAssetAddress
   * @param secondAssetAddress
   * @param firstAmount
   * @param secondAmount
   * @param slippageTolerance Slippage tolerance coefficient (in %)
   */
  public async createPair (
    firstAssetAddress: string,
    secondAssetAddress: string,
    firstAmount: NumberLike,
    secondAmount: NumberLike,
    slippageTolerance: NumberLike = this.defaultSlippageTolerancePercent
  ): Promise<void> {
    const params = await this.calcCreatePairParams(firstAssetAddress, secondAssetAddress, firstAmount, secondAmount, slippageTolerance)
    const isPairAlreadyCreated = (await (this.api.rpc as any).tradingPair.isPairEnabled(this.defaultDEXId, firstAssetAddress, secondAssetAddress)).isTrue as boolean
    const transactions = []
    if (!isPairAlreadyCreated) {
      transactions.push((this.api.tx.tradingPair as any).register(...params.pairCreationArgs))
    }
    transactions.push(...[
      this.api.tx.poolXyk.initializePool(...params.pairCreationArgs),
      this.api.tx.poolXyk.depositLiquidity(...params.addLiquidityArgs)
    ])
    if (!this.getAsset(params.secondAsset.address)) {
      this.addAccountAsset({ ...params.secondAsset, balance: ZeroBalance })
      this.updateAccountAssets()
    }
    await this.submitExtrinsic(
      this.api.tx.utility.batchAll(transactions),
      this.account.pair,
      {
        type: Operation.CreatePair,
        symbol: params.firstAsset.symbol,
        assetAddress: params.firstAsset.address,
        symbol2: params.secondAsset.symbol,
        asset2Address: params.secondAsset.address,
        amount: `${params.baseAssetAmount}`,
        amount2: `${params.targetAssetAmount}`
      }
    )
  }

  public async getEnabledLiquiditySourcesForPair (
    firstAssetAddress: string,
    secondAssetAddress: string
  ): Promise<Array<LiquiditySourceTypes>> {
    const xor = KnownAssets.get(KnownSymbols.XOR)
    const baseAssetId = secondAssetAddress === xor.address ? secondAssetAddress : firstAssetAddress
    const targetAssetId = baseAssetId === secondAssetAddress ? firstAssetAddress : secondAssetAddress
    const list = (await (this.api.rpc as any).tradingPair.listEnabledSourcesForPair(
      this.defaultDEXId,
      baseAssetId,
      targetAssetId
    )).toJSON()

    return (list as Array<LiquiditySourceTypes>)
  }

  public async checkLiquiditySourceIsEnabledForPair (
    firstAssetAddress: string,
    secondAssetAddress: string,
    liquiditySource: LiquiditySourceTypes
  ): Promise<boolean> {
    const isEnabled = (await (this.api.rpc as any).tradingPair.isSourceEnabledForPair(
      this.defaultDEXId,
      firstAssetAddress,
      secondAssetAddress,
      liquiditySource
    )).toJSON()

    return isEnabled
  }

  private async calcRemoveLiquidityParams (
    firstAssetAddress: string,
    secondAssetAddress: string,
    desiredMarker: string,
    firstTotal: CodecString,
    secondTotal: CodecString,
    totalSupply: CodecString,
    slippageTolerance: NumberLike = this.defaultSlippageTolerancePercent
  ) {
    assert(this.account, Messages.connectWallet)
    const firstAsset = await this.getAssetInfo(firstAssetAddress)
    const secondAsset = await this.getAssetInfo(secondAssetAddress)
    const poolToken = await this.getLiquidityInfo(firstAssetAddress, secondAssetAddress)
    const desired = new FPNumber(desiredMarker, poolToken.decimals)
    const reserveA = FPNumber.fromCodecValue(firstTotal, firstAsset.decimals)
    const reserveB = FPNumber.fromCodecValue(secondTotal, secondAsset.decimals)
    const pts = FPNumber.fromCodecValue(totalSupply, poolToken.decimals)
    const desiredA = desired.mul(reserveA).div(pts)
    const desiredB = desired.mul(reserveB).div(pts)
    const slippage = new FPNumber(Number(slippageTolerance) / 100)
    return {
      args: [
        this.defaultDEXId,
        firstAssetAddress,
        secondAssetAddress,
        desired.toCodecString(),
        desiredA.sub(desiredA.mul(slippage)).toCodecString(),
        desiredB.sub(desiredB.mul(slippage)).toCodecString()
      ],
      firstAsset,
      secondAsset
    }
  }

  /**
   * Get network fee for remove liquidity operation
   * @param firstAssetAddress
   * @param secondAssetAddress
   * @param desiredMarker
   * @param firstTotal checkLiquidityReserves()[0]
   * @param secondTotal checkLiquidityReserves()[1]
   * @param totalSupply Total supply coefficient, estimateTokensRetrieved()[2]
   * @param slippageTolerance Slippage tolerance coefficient (in %)
   */
  public async getRemoveLiquidityNetworkFee (
    firstAssetAddress: string,
    secondAssetAddress: string,
    desiredMarker: string,
    firstTotal: CodecString,
    secondTotal: CodecString,
    totalSupply: CodecString,
    slippageTolerance: NumberLike = this.defaultSlippageTolerancePercent
  ): Promise<CodecString> {
    const params = await this.calcRemoveLiquidityParams(
      firstAssetAddress,
      secondAssetAddress,
      desiredMarker,
      firstTotal,
      secondTotal,
      totalSupply,
      slippageTolerance
    )
    return await this.getNetworkFee(this.accountPair, Operation.RemoveLiquidity, ...params.args)
  }

  /**
   * Remove liquidity
   * @param firstAssetAddress
   * @param secondAssetAddress
   * @param desiredMarker
   * @param firstTotal checkLiquidityReserves()[0]
   * @param secondTotal checkLiquidityReserves()[1]
   * @param totalSupply Total supply coefficient, estimateTokensRetrieved()[2]
   * @param slippageTolerance Slippage tolerance coefficient (in %)
   */
  public async removeLiquidity (
    firstAssetAddress: string,
    secondAssetAddress: string,
    desiredMarker: string,
    firstTotal: CodecString,
    secondTotal: CodecString,
    totalSupply: CodecString,
    slippageTolerance: NumberLike = this.defaultSlippageTolerancePercent
  ): Promise<void> {
    const params = await this.calcRemoveLiquidityParams(
      firstAssetAddress,
      secondAssetAddress,
      desiredMarker,
      firstTotal,
      secondTotal,
      totalSupply,
      slippageTolerance
    )
    await this.submitExtrinsic(
      this.api.tx.poolXyk.withdrawLiquidity(...params.args),
      this.account.pair,
      {
        type: Operation.RemoveLiquidity,
        symbol: params.firstAsset.symbol,
        assetAddress: params.firstAsset.address,
        symbol2: params.secondAsset.symbol,
        asset2Address: params.secondAsset.address,
        amount: `${desiredMarker}`
      }
    )
  }

  /**
   * Check rewards for external account
   * @param externalAddress address of external account (ethereum account address)
   * @returns rewards array with not zero amount
   */
  public async checkExternalAccountRewards (externalAddress: string): Promise<Array<RewardInfo>> {
    const [xorErc20Amount, soraFarmHarvestAmount, nftAirdropAmount] = await (this.api.rpc as any).rewards.claimables(externalAddress)

    const rewards = [
      prepareRewardInfo(RewardingEvents.SoraFarmHarvest, soraFarmHarvestAmount),
      prepareRewardInfo(RewardingEvents.NtfAirdrop, nftAirdropAmount),
      prepareRewardInfo(RewardingEvents.XorErc20, xorErc20Amount)
    ].filter(item => isClaimableReward(item))

    return rewards
  }

  /**
   * Check rewards for internal account
   * @returns rewards array with not zero amount
   */
  public async checkInternalAccountRewards (): Promise<Array<RewardInfo>> {
    assert(this.account, Messages.connectWallet)

    const { address } = this.account.pair

    const [liquidityProvisionAmount, buyingFromTBCPoolTuple] = await Promise.all([
      (this.api.rpc as any).pswapDistribution.claimableAmount(address), // Balance
      (this.api.query as any).multicollateralBondingCurvePool.rewards(address) // [claim_limit: Balance, available_reward: Balance]
    ])

    const buyingFromTBCPoolAmount = buyingFromTBCPoolTuple[0] // claim_limit
    const buyingFromTBCPoolTotal = buyingFromTBCPoolTuple[1] // available_reward

    const rewards = [
      prepareRewardInfo(RewardingEvents.LiquidityProvision, liquidityProvisionAmount),
      prepareRewardInfo(RewardingEvents.BuyOnBondingCurve, buyingFromTBCPoolAmount, buyingFromTBCPoolTotal)
    ].filter(item => isClaimableReward(item))

    return rewards
  }

  /**
   * Get network fee for claim rewards operation
   */
  public async getClaimRewardsNetworkFee (rewards: Array<RewardInfo>, signature = ''): Promise<CodecString>  {
    const params = this.calcClaimRewardsParams(rewards, signature)

    return await this.getNetworkFee(this.accountPair, Operation.ClaimRewards, params)
  }

  /**
   * Returns a params object { extrinsic, args }
   * @param rewards claiming rewards
   * @param signature message signed in external wallet (if want to claim external rewards), otherwise empty string
   */
  private calcClaimRewardsParams (rewards: Array<RewardInfo>, signature = ''): any {
    const transactions = []

    if (hasRewardsForEvents(rewards, [RewardingEvents.LiquidityProvision])) {
      transactions.push({
        extrinsic: this.api.tx.pswapDistribution.claimIncentive,
        args: []
      })
    }
    if (hasRewardsForEvents(rewards, [RewardingEvents.BuyOnBondingCurve])) {
      transactions.push({
        extrinsic: this.api.tx.multicollateralBondingCurvePool.claimIncentives,
        args: []
      })
    }
    if (hasRewardsForEvents(rewards, [RewardingEvents.SoraFarmHarvest, RewardingEvents.XorErc20, RewardingEvents.NtfAirdrop])) {
      transactions.push({
        extrinsic: this.api.tx.rewards.claim,
        args: [signature]
      })
    }

    if (transactions.length > 1) return {
      extrinsic: this.api.tx.utility.batchAll,
      args: [transactions.map(({ extrinsic, args }) => extrinsic(...args))]
    }

    if (transactions.length === 1) return transactions[0]

    // for current compability
    return {
      extrinsic: this.api.tx.rewards.claim,
      args: [signature]
    }
  }

  /**
   * Claim rewards
   * @param signature message signed in external wallet (if want to claim external rewards)
   */
  public async claimRewards (
    rewards: Array<RewardInfo>,
    signature?: string,
    fee?: CodecString,
    externalAddress?: string,
  ): Promise<void> {
    const { extrinsic, args } = this.calcClaimRewardsParams(rewards, signature)

    await this.submitExtrinsic(
      extrinsic(...args),
      this.account.pair,
      {
        type: Operation.ClaimRewards,
        externalAddress,
        soraNetworkFee: fee,
        rewards
      }
    )
  }

  /**
   * Get all tokens list registered in the blockchain network
   * @param withPoolTokens `false` by default
   */
  public async getAssets (withPoolTokens = false): Promise<Array<Asset>> {
    const assets = await getAssets(this.api)
    return withPoolTokens ? assets : assets.filter(asset => asset.symbol !== PoolTokens.XYKPOOL)
  }

  /**
   * Remove all wallet data
   */
  public logout (): void {
    const address = this.account.pair.address
    keyring.forgetAccount(address)
    keyring.forgetAddress(address)

    this.accountAssets = []
    this.accountLiquidity = []

    this.unsubscribeFromAllBalancesUpdates()

    super.logout()
    this.bridge.logout()
  }

  //_________________________FORMATTER_METHODS_____________________________
  public hasEnoughXor (asset: AccountAsset, amount: string | number, fee: FPNumber | CodecString): boolean {
    const xor = KnownAssets.get(KnownSymbols.XOR)
    const xorDecimals = xor.decimals
    const fpFee = fee instanceof FPNumber ? fee : FPNumber.fromCodecValue(fee, xorDecimals)
    if (asset.address === xor.address) {
      const fpBalance = FPNumber.fromCodecValue(asset.balance.transferable, xorDecimals)
      const fpAmount = new FPNumber(amount, xorDecimals)
      return FPNumber.lte(fpFee, fpBalance.sub(fpAmount))
    }
    // Here we should be sure that xor value of account was tracked & updated
    const xorAccountAsset = this.getAsset(xor.address)
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
    const one = new FPNumber(1)
    const firstAsset = await this.getAssetInfo(firstAssetAddress)
    const secondAsset = await this.getAssetInfo(secondAssetAddress)
    const firstAmountNum = new FPNumber(firstAmount, firstAsset.decimals)
    const secondAmountNum = new FPNumber(secondAmount, secondAsset.decimals)
    const result = !reversed
      ? firstAmountNum.div(!secondAmountNum.isZero() ? secondAmountNum : one)
      : secondAmountNum.div(!firstAmountNum.isZero() ? firstAmountNum : one)
    return result.format()
  }
}

/** Api object */
export const api = new Api()
