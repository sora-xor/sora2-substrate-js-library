import { assert, isHex } from '@polkadot/util'
import { keyExtractSuri, mnemonicValidate, mnemonicGenerate } from '@polkadot/util-crypto'
import keyring from '@polkadot/ui-keyring'
import { Subject } from '@polkadot/x-rxjs'
import { map } from '@polkadot/x-rxjs/operators'
import type { KeypairType } from '@polkadot/util-crypto/types'
import type { CreateResult } from '@polkadot/ui-keyring/types'
import type { KeyringPair$Json } from '@polkadot/keyring/types'
import type { Signer, Observable, Codec } from '@polkadot/types/types'
import type { Subscription } from '@polkadot/x-rxjs'

import {
  NativeAssets,
  KnownAssets,
  getAssetBalance,
  AccountAsset,
  Asset,
  getAssetInfo,
  getAssets,
  PoolTokens,
  AccountLiquidity,
  AccountBalance,
  getAssetBalanceObservable,
  ZeroBalance,
  Whitelist,
  getLiquidityBalance,
  XOR
} from './assets'
import { decrypt, encrypt } from './crypto'
import { BaseApi, Operation, KeyringType, isBridgeOperation, History } from './BaseApi'
import {
  RewardingEvents,
  RewardsInfo,
  RewardInfo,
  AccountMarketMakerInfo,
  isClaimableReward,
  containsRewardsForEvents,
  prepareRewardInfo,
  prepareRewardsInfo,
  getAccountMarketMakerInfoObservable
} from './rewards'
import { CodecString, FPNumber, NumberLike } from './fp'
import { Messages } from './logger'
import { BridgeApi } from './BridgeApi'
import { Storage } from './storage'
import { poolAccountIdFromAssetPair } from './pools/account'
import { SwapModule } from './swap'

/**
 * Contains all necessary data and functions for the wallet & polkaswap client
 */
export class Api extends BaseApi {
  private readonly type: KeypairType = KeyringType
  public readonly defaultSlippageTolerancePercent = 0.5
  public readonly seedLength = 12
  public readonly bridge: BridgeApi = new BridgeApi()
  public readonly swap: SwapModule = new SwapModule(this)

  // Default assets addresses of account - list of NativeAssets addresses
  public accountDefaultAssetsAddresses: Array<string> = NativeAssets.map(asset => asset.address)

  private _assets: Array<AccountAsset> = []
  private _accountAssetsAddresses: Array<string> = []
  private _liquidity: Array<AccountLiquidity> = []

  private balanceSubscriptions: Array<Subscription> = []
  private assetsBalanceSubject = new Subject<void>()
  public assetsBalanceUpdated = this.assetsBalanceSubject.asObservable()

  private liquiditySubscriptions: Array<Subscription> = []
  private liquiditySubject = new Subject<void>()
  public liquidityUpdated = this.liquiditySubject.asObservable()

  // # Account assets methods

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

  public addAccountAsset (asset: AccountAsset): void {
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

  public getAsset (address: string): AccountAsset | null {
    return this.accountAssets.find(asset => asset.address === address) ?? null
  }

  public getAssetBalanceObservable (asset: AccountAsset): Observable<AccountBalance> {
    return getAssetBalanceObservable(this.apiRx, this.account.pair.address, asset.address, asset.decimals)
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
   * Get a list of all assets from default account assets array & from account storage
   */
  public async getKnownAccountAssets (): Promise<Array<AccountAsset>> {
    assert(this.account, Messages.connectWallet)

    const knownAssets: Array<AccountAsset> = []
    const assetsAddresses = new Set([...this.accountDefaultAssetsAddresses, ...this.accountAssetsAddresses])

    for (const assetAddress of assetsAddresses) {
      const asset = await this.getAccountAsset(assetAddress)
      this.addAccountAsset(asset)
      knownAssets.push(asset)
    }

    return knownAssets
  }

  private unsubscribeFromAllBalancesUpdates (): void {
    for (const subscription of this.balanceSubscriptions) {
      subscription.unsubscribe()
    }
    this.balanceSubscriptions = []
  }

  // # Account assets addresses

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

  // # Account Liquidity methods

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

  /**
   * Get liquidity
   * @param firstAssetAddress
   * @param secondAssetAddress
   */
  public getLiquidityInfo (firstAssetAddress: string, secondAssetAddress: string): Asset {
    const poolTokenAccount = poolAccountIdFromAssetPair(this.api, firstAssetAddress, secondAssetAddress).toString()
    if (!poolTokenAccount) {
      return null
    }
    return this.getLiquidityInfoByPoolAccount(poolTokenAccount)
  }

  /**
   * Get liquidity
   * @param firstAssetAddress
   * @param secondAssetAddress
   */
  public getLiquidityInfoByPoolAccount (poolTokenAccount: string): Asset {
    return {
      address: poolTokenAccount,
      decimals: 18,
      name: 'Pool XYK Token',
      symbol: 'POOLXYK'
    }
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
   * Get liquidity reserves.
   * If the output will be `['0', '0']` then the client is the first liquidity provider
   * @param firstAssetAddress
   * @param secondAssetAddress
   * @param firstAssetDecimals
   * @param secondAssetDecimals
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
    // actually, we don't need to use decimals here, so, we don't need to send these requests
    // firstAssetDecimals = firstAssetDecimals ?? (await this.getAssetInfo(firstAssetAddress)).decimals
    // secondAssetDecimals = secondAssetDecimals ?? (await this.getAssetInfo(secondAssetAddress)).decimals
    const a = FPNumber.fromCodecValue(firstTotal, firstAssetDecimals)
    const b = FPNumber.fromCodecValue(secondTotal, secondAssetDecimals)
    if (a.isZero() && b.isZero()) {
      return ['0', '0']
    }
    const pIn = FPNumber.fromCodecValue(amount)
    const totalSupply = await this.api.query.poolXyk.totalIssuances(poolTokenAddress) // BalanceInfo
    const pts = new FPNumber(totalSupply)
    const ptsFirstAsset = new FPNumber(totalSupply, firstAssetDecimals);
    const ptsSecondAsset = new FPNumber(totalSupply, secondAssetDecimals);
    const aOut = pIn.mul(a).div(ptsFirstAsset)
    const bOut = pIn.mul(b).div(ptsSecondAsset)
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
    const decimals = Math.max(firstAsset.decimals, secondAsset.decimals)
    const aIn = new FPNumber(firstAmount, decimals)
    const bIn = new FPNumber(secondAmount, decimals)
    const a = FPNumber.fromCodecValue(firstTotal, decimals)
    const b = FPNumber.fromCodecValue(secondTotal, decimals)
    if (a.isZero() && b.isZero()) {
      const inaccuracy = new FPNumber('0.000000000000001')
      return [aIn.mul(bIn).sqrt().sub(inaccuracy).toCodecString()]
    }
    const poolToken = this.getLiquidityInfo(firstAssetAddress, secondAssetAddress)
    const totalSupply = await this.api.query.poolXyk.totalIssuances(poolToken.address) // BalanceInfo
    const pts = new FPNumber(totalSupply, poolToken.decimals)
    const result = FPNumber.min(aIn.mul(pts).div(a), bIn.mul(pts).div(b))
    return [result.toCodecString(), pts.toCodecString()]
  }

  private async getAccountLiquidityItem (firstAddress: string, secondAddress: string, reserveA: CodecString, reserveB: CodecString): Promise<AccountLiquidity | null> {
    const poolAccount = poolAccountIdFromAssetPair(this.api, firstAddress, secondAddress).toString()
    const { decimals, symbol, name } = this.getLiquidityInfoByPoolAccount(poolAccount)
    const balanceCodec = await getLiquidityBalance(this.api, this.accountPair.address, poolAccount)
    const firstAsset = await this.getAssetInfo(firstAddress)
    const secondAsset = await this.getAssetInfo(secondAddress)
    if (!balanceCodec) {
      return null
    }
    const balanceFPNumber = new FPNumber(balanceCodec, decimals)
    if (balanceFPNumber.isZero()) {
      return null
    }
    const balance = balanceFPNumber.toCodecString()
    if (!Number(balance)) {
      return null
    }
    const [balanceA, balanceB, totalSupply] = await this.estimateTokensRetrieved(firstAddress, secondAddress, balance, reserveA, reserveB, poolAccount, firstAsset.decimals, secondAsset.decimals)
    const fpBalanceA = FPNumber.fromCodecValue(balanceA, firstAsset.decimals)
    const fpBalanceB = FPNumber.fromCodecValue(balanceB, secondAsset.decimals)
    const pts = FPNumber.fromCodecValue(totalSupply, decimals)
    const minted = FPNumber.max(
      fpBalanceA.mul(pts).div(FPNumber.fromCodecValue(reserveA, firstAsset.decimals)),
      fpBalanceB.mul(pts).div(FPNumber.fromCodecValue(reserveB, secondAsset.decimals))
    )
    return {
      address: poolAccount,
      firstAddress,
      secondAddress,
      firstBalance: balanceA,
      secondBalance: balanceB,
      symbol,
      decimals: firstAsset.decimals,
      decimals2: secondAsset.decimals,
      balance,
      name,
      poolShare: minted.div(pts).mul(FPNumber.HUNDRED).format() || '0'
    } as AccountLiquidity
  }

  /**
   * Set subscriptions for balance updates of the account asset list
   * @param targetAssetIds
   */
  public updateAccountLiquidity (targetAssetIds: Array<string>): void {
    const getReserve = (reserve: Codec) => new FPNumber(reserve).toCodecString()
    const removeLiquidityItem = (liquidity: Partial<AccountLiquidity>) => this.accountLiquidity = this.accountLiquidity.filter(item => item.secondAddress !== liquidity.secondAddress)
    this.unsubscribeFromAllLiquidityUpdates()
    assert(this.account, Messages.connectWallet)
    // Update list of current account liquidity and execute next()
    const liquidityList = targetAssetIds.map(id => ({ secondAddress: id }))
    this.accountLiquidity = this.accountLiquidity.filter(item => targetAssetIds.includes(item.secondAddress))
    this.liquiditySubject.next()
    // Refresh all required subscriptions
    for (const liquidity of liquidityList) {
      const subscription = this.apiRx.query.poolXyk.reserves(XOR.address, liquidity.secondAddress).subscribe(async reserves => {
        if (!reserves || !(reserves[0] || reserves[1])) {
          removeLiquidityItem(liquidity) // Remove it from list if something was wrong
        } else {
          const reserveA = getReserve(reserves[0])
          const reserveB = getReserve(reserves[1])
          const updatedLiquidity = await this.getAccountLiquidityItem(XOR.address, liquidity.secondAddress, reserveA, reserveB)
          if (updatedLiquidity) {
            this.addToLiquidityList(updatedLiquidity)
          } else {
            removeLiquidityItem(liquidity) // Remove it from list if something was wrong
          }
        }
        this.liquiditySubject.next()
      })
      this.liquiditySubscriptions.push(subscription)
    }
  }

  public unsubscribeFromAllLiquidityUpdates (): void {
    for (const subscription of this.liquiditySubscriptions) {
      subscription.unsubscribe()
    }
    this.liquiditySubscriptions = []
  }

  /**
   * Subscription which should be used when user is on the pool page.
   * Also, it can be used in a background - it depends on the performance.
   *
   * Do not forget to call `unsubscribe`
   */
  public getUserPoolsSubscription (): Subscription {
    assert(this.account, Messages.connectWallet)
    return this.apiRx.query.poolXyk.accountPools(this.accountPair.address).subscribe((result) => {
      const targetIds = result.toJSON() as Array<string>
      this.updateAccountLiquidity(targetIds)
    })
  }

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
   * @param assetAddress Asset address
   * @param toAddress Account address
   * @param amount Amount value
   */
  public async transfer (assetAddress: string, toAddress: string, amount: NumberLike): Promise<void> {
    assert(this.account, Messages.connectWallet)
    const asset = await this.getAssetInfo(assetAddress)
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

  public subscribeOnAccountMarketMakerInfo (): Observable<AccountMarketMakerInfo> {
    assert(this.account, Messages.connectWallet)

    return getAccountMarketMakerInfoObservable(this.apiRx, this.account.pair.address)
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
      secondAsset,
      firstAssetDecimals: firstAsset.decimals,
      secondAssetDecimals: secondAsset.decimals
    }
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
        amount2: `${secondAmount}`,
        decimals: params.firstAssetDecimals,
        decimals2: params.secondAssetDecimals
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
    assert([firstAssetAddress, secondAssetAddress].includes(XOR.address), Messages.xorIsRequired)
    const baseAssetId = firstAssetAddress === XOR.address ? firstAssetAddress : secondAssetAddress
    const targetAssetId = firstAssetAddress !== XOR.address ? firstAssetAddress : secondAssetAddress
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
    const poolToken = this.getLiquidityInfo(firstAssetAddress, secondAssetAddress)
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
      secondAsset,
      // amountA, amountB - without slippage (for initial history)
      amountA: desiredA.toString(),
      amountB: desiredB.toString()
    }
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
        amount: params.amountA,
        amount2: params.amountB
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
      prepareRewardInfo(RewardingEvents.NftAirdrop, nftAirdropAmount),
      prepareRewardInfo(RewardingEvents.XorErc20, xorErc20Amount)
    ].filter(item => isClaimableReward(item))

    return rewards
  }

  /**
   * Check rewards for providing liquidity
   * @returns rewards array with not zero amount
   */
  public async checkLiquidityProvisionRewards (): Promise<Array<RewardInfo>> {
    assert(this.account, Messages.connectWallet)

    const { address } = this.account.pair

    const liquidityProvisionAmount = await (this.api.rpc as any).pswapDistribution.claimableAmount(address) // Balance

    const rewards = [
      prepareRewardInfo(RewardingEvents.LiquidityProvision, liquidityProvisionAmount),
    ].filter(item => isClaimableReward(item))

    return rewards
  }

  public async checkVestedRewards (): Promise<RewardsInfo | null> {
    assert(this.account, Messages.connectWallet)

    const { address } = this.account.pair

    const {
      limit, // "Balance"
      total_available: total, // "Balance"
      rewards // "BTreeMap<RewardReason, Balance>"
    } = await (this.api.query as any).vestedRewards.rewards(address)

    const rewardsInfo = prepareRewardsInfo(limit, total, rewards)

    return rewardsInfo
  }

  /**
   * Get network fee for claim rewards operation
   */
  public async getClaimRewardsNetworkFee (rewards: Array<RewardInfo>, signature = ''): Promise<CodecString>  {
    const params = this.calcClaimRewardsParams(rewards, signature)

    switch (params.extrinsic) {
      case this.api.tx.pswapDistribution.claimIncentive:
        return this.NetworkFee[Operation.ClaimLiquidityProvisionRewards]
      case this.api.tx.vestedRewards.claimRewards:
        return this.NetworkFee[Operation.ClaimVestedRewards]
      case this.api.tx.rewards.claim:
        return this.NetworkFee[Operation.ClaimExternalRewards]
      default:
        return await this.getNetworkFee(Operation.ClaimRewards, params)
    }
  }

  /**
   * Returns a params object { extrinsic, args }
   * @param rewards claiming rewards
   * @param signature message signed in external wallet (if want to claim external rewards), otherwise empty string
   */
  private calcClaimRewardsParams (rewards: Array<RewardInfo | RewardsInfo>, signature = ''): any {
    const transactions = []

    if (containsRewardsForEvents(rewards, [RewardingEvents.LiquidityProvision])) {
      transactions.push({
        extrinsic: this.api.tx.pswapDistribution.claimIncentive,
        args: []
      })
    }
    if (containsRewardsForEvents(rewards, [RewardingEvents.BuyOnBondingCurve, RewardingEvents.LiquidityProvisionFarming, RewardingEvents.MarketMakerVolume])) {
      transactions.push({
        extrinsic: this.api.tx.vestedRewards.claimRewards,
        args: []
      })
    }
    if (containsRewardsForEvents(rewards, [RewardingEvents.SoraFarmHarvest, RewardingEvents.XorErc20, RewardingEvents.NftAirdrop])) {
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
    rewards: Array<RewardInfo | RewardsInfo>,
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
   * @param whitelist set of whitelist tokens
   * @param withPoolTokens `false` by default
   */
  public async getAssets (whitelist?: Whitelist, withPoolTokens = false): Promise<Array<Asset>> {
    const assets = await getAssets(this.api, whitelist)
    return withPoolTokens ? assets : assets.filter(asset => asset.symbol !== PoolTokens.XYKPOOL)
  }

  public getSystemBlockNumberObservable (): Observable<string> {
    return this.apiRx.query.system.number().pipe(map(codec => codec.toString()))
  }

  public getRuntimeVersionObservable (): Observable<number> {
    return this.apiRx.query.system.lastRuntimeUpgrade().pipe(map(value => (value.toJSON() as any).specVersion))
  }

  // # Logout & reset methods

  public unsubscribeAll (): void {
    this.unsubscribeFromAllBalancesUpdates()
    this.unsubscribeFromAllLiquidityUpdates()
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

  /**
   * Returns the referral of the invited user by Id
   * @param invitedUserId address of invited account
   * @returns referral
   */
  public async getReferral (invitedUserId: string): Promise<string> {
    const referral = await this.api.query.referrals.referrers(invitedUserId) as any
    return !referral ? '' : referral.toString()
  }

  /**
   * Returns invited users of the referral
   * @param referralId address of referral account
   * @returns array of invited users
   */
  public async getInvitedUsers (referralId: string): Promise<Array<string>> {
    return await this.api.query.referrals.referrals(referralId) as any
  }

  /**
   * Transfer XOR balance from the referral account to the special account
   * This balance can be used by referrals to pay the fee
   * @param amount balance to reserve
   */
  public async reserveXor (amount: NumberLike): Promise<void> {
    assert(this.account, Messages.connectWallet)
    await this.submitExtrinsic(
      this.api.tx.referrals.reserve(new FPNumber(amount, XOR.decimals).toCodecString()),
      this.account.pair,
      { symbol: XOR.symbol, amount: `${amount}`, assetAddress: XOR.address, type: Operation.ReferralReserveXor }
    )
  }

  /**
   * Unreserve XOR balance
   * @param amount balance to unreserve
   */
  public async unreserveXor (amount: NumberLike): Promise<void> {
    assert(this.account, Messages.connectWallet)
    await this.submitExtrinsic(
      this.api.tx.referrals.unreserve(new FPNumber(amount, XOR.decimals).toCodecString()),
      this.account.pair,
      { symbol: XOR.symbol, amount: `${amount}`, assetAddress: XOR.address, type: Operation.ReferralUnreserveXor }
    )
  }

  /**
   * Sets invited user to their referral if the account doesn’t have a referral yet.
   * This extrinsic is paid by the special balance of the referral if the invited user doesn’t have a referral,
   * otherwise the extrinsic fails and the fee is paid by the invited user
   * @param referralId address of referral account
   */
  public async setInvitedUser (referralId: string): Promise<void> {
    assert(this.account, Messages.connectWallet)
    const formattedToAddress = referralId.slice(0, 2) === 'cn' ? referralId : this.formatAddress(referralId)
    await this.submitExtrinsic(
      this.api.tx.referrals.setReferrer(referralId),
      this.account.pair,
      { to: formattedToAddress, type: Operation.ReferralSetInvitedUser }
    )
  }
}

/** Api object */
export const api = new Api()
