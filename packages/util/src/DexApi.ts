import { assert, isHex } from '@polkadot/util'
import { keyExtractSuri, mnemonicValidate, mnemonicGenerate } from '@polkadot/util-crypto'
import { KeypairType } from '@polkadot/util-crypto/types'
import keyring from '@polkadot/ui-keyring'
import { CreateResult } from '@polkadot/ui-keyring/types'
import { KeyringPair, KeyringPair$Json } from '@polkadot/keyring/types'

import {
  KnownAssets,
  getAccountAssetInfo,
  AccountAsset,
  KnownSymbols,
  Asset,
  getAssetInfo,
  getAssets,
  PoolTokens,
  AccountLiquidity
} from './assets'
import { decrypt, encrypt } from './crypto'
import { BaseApi, Operation, KeyringType, History } from './api'
import { SwapResult } from './swap'
import { FPNumber, NumberLike } from './fp'
import { Messages } from './logger'

/**
 * Contains all necessary data and functions for the wallet
 */
export class DexApi extends BaseApi {
  private readonly type: KeypairType = KeyringType
  private readonly defaultDEXId = 0
  public readonly defaultSlippageTolerancePercent = 0.5
  public readonly seedLength = 12

  private account?: CreateResult
  private assets: Array<AccountAsset> = []
  private liquidity: Array<AccountLiquidity> = []

  constructor (endpoint?: string) {
    super(endpoint)
  }

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
    return this.assets
  }

  public get accountLiquidity (): Array<AccountLiquidity> {
    return this.liquidity
  }

  public get accountHistory (): Array<History> {
    return this.history
  }

  /**
   * The first method you should run. Includes initialization process and the connection check
   * @param endpoint Blockchain address, you should set it here or before this step
   */
  public async initialize (endpoint?: string): Promise<void> {
    await this.connect(endpoint)
    const address = this.storage?.get('address')
    const password = this.storage?.get('password')
    const name = this.storage?.get('name')
    const isExternal = Boolean(this.storage?.get('isExternal'))
    keyring.loadAll({ type: KeyringType })
    if (!address) {
      return
    }
    const pair = keyring.getPair(address)
    this.account = !isExternal
      ? keyring.addPair(pair, decrypt(password))
      : keyring.addExternal(address, name ? { name } : {})
    const assets = this.storage?.get('assets')
    if (assets) {
      this.assets = JSON.parse(assets)
    }
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
      assert(`${phrase}`.split(' ').length === this.seedLength, `Mnemonic should contain ${this.seedLength} words`)
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
    this.account = keyring.addUri(suri, password, { name }, this.type)
    if (this.storage) {
      this.storage.set('name', name)
      this.storage.set('password', encrypt(password))
      this.storage.set('address', this.account.pair.address)
    }
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
    this.account = keyring.addExternal(address, { name: name || '' })
    if (this.storage) {
      this.storage.set('name', name)
      this.storage.set('address', this.account.pair.address)
      this.storage.set('isExternal', true)
    }
  }

  private addToAssetList (asset: AccountAsset): void {
    const index = this.assets.findIndex(item => item.address === asset.address)
    ~index ? this.assets[index] = asset : this.assets.push(asset)
  }

  private addToLiquidityList (asset: AccountLiquidity): void {
    const index = this.liquidity.findIndex(item => item.address === asset.address)
    ~index ? this.liquidity[index] = asset : this.liquidity.push(asset)
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
    const existingAsset = this.assets.find(asset => asset.address === address) ||
      this.liquidity.find(asset => asset.address === address)
    if (existingAsset) {
      return {
        address: existingAsset.address,
        decimals: existingAsset.decimals,
        symbol: existingAsset.symbol
      } as Asset
    }
    return await getAssetInfo(this.api, address)
  }

  /**
   * Get account asset information
   * @param address asset address
   */
  public async getAccountAsset (address: string): Promise<AccountAsset> {
    assert(this.account, Messages.connectWallet)
    const asset = { address } as AccountAsset
    const knownAsset = KnownAssets.get(address)
    if (knownAsset) {
      asset.symbol = knownAsset.symbol
      asset.decimals = knownAsset.decimals
    } else {
      const { decimals, symbol } = await this.getAssetInfo(address)
      asset.decimals = decimals
      asset.symbol = symbol
    }
    const result = await getAccountAssetInfo(this.api, this.account.pair.address, address)
    asset.balance = new FPNumber(result, asset.decimals).toString()
    this.addToAssetList(asset)
    if (this.storage) {
      this.storage.set('assets', JSON.stringify(this.assets))
    }
    return asset
  }

  /**
   * Get a list of all known assets from `KnownAssets` array
   */
  public async getKnownAccountAssets (): Promise<Array<AccountAsset>> {
    assert(this.account, Messages.connectWallet)
    const knownAssets: Array<AccountAsset> = []
    for (const item of KnownAssets) {
      const asset = { ...item } as AccountAsset
      const result = await getAccountAssetInfo(this.api, this.account.pair.address, item.address)
      const balance = new FPNumber(result, asset.decimals)
      if (balance.isZero()) {
        continue
      }
      asset.balance = balance.toString()
      if (!Number(asset.balance)) {
        continue
      }
      knownAssets.push(asset)
      this.addToAssetList(asset)
    }
    if (this.storage) {
      this.storage.set('assets', JSON.stringify(this.assets))
    }
    return knownAssets
  }

  public async updateAccountAssets (): Promise<Array<AccountAsset>> {
    assert(this.account, Messages.connectWallet)
    for (const asset of this.assets) {
      const result = await getAccountAssetInfo(this.api, this.account.pair.address, asset.address)
      asset.balance = new FPNumber(result, asset.decimals).toString()
      this.addToAssetList(asset)
    }
    if (this.storage) {
      this.storage.set('assets', JSON.stringify(this.assets))
    }
    return this.assets
  }

  /**
   * Get transfer network fee in XOR
   * @param assetAddress Asset address
   * @param toAddress Account address
   * @param amount Amount value
   */
  public async getTransferNetworkFee (assetAddress: string, toAddress: string, amount: NumberLike): Promise<string> {
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
      { symbol: asset.symbol, to: toAddress, amount: `${amount}`, type: Operation.Transfer }
    )
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
    isExchangeB = false
  ): Promise<SwapResult> {
    const xor = KnownAssets.get(KnownSymbols.XOR)
    const assetA = await this.getAssetInfo(assetAAddress)
    const assetB = await this.getAssetInfo(assetBAddress)
    const result = await (this.api.rpc as any).liquidityProxy.quote(
      this.defaultDEXId,
      assetAAddress,
      assetBAddress,
      new FPNumber(amount, (!isExchangeB ? assetA : assetB).decimals).toCodecString(),
      !isExchangeB ? 'WithDesiredInput' : 'WithDesiredOutput',
      [],
      'Disabled'
    )
    const value = !result.isNone ? result.unwrap() : { amount: 0, fee: 0 }
    return {
      amount: new FPNumber(value.amount, (!isExchangeB ? assetB : assetA).decimals).toString(),
      fee: new FPNumber(value.fee, xor.decimals).toString()
    } as SwapResult
  }

  /**
   * Get min or max value before Swap
   * @param assetAAddress Asset A address
   * @param assetBAddress Asset B address
   * @param resultAmount Result of the swap operation, `getSwapResult().amount`
   * @param slippageTolerance Slippage tolerance coefficient (in %)
   * @param isExchangeB If `isExchangeB` then Exchange B and it calculates max sold,
   * else - Exchange A and it calculates min received. `false` by default
   */
  public async getMinMaxValue (
    assetAAddress: string,
    assetBAddress: string,
    resultAmount: NumberLike,
    slippageTolerance: NumberLike = this.defaultSlippageTolerancePercent,
    isExchangeB = false
  ): Promise<string> {
    const assetA = await this.getAssetInfo(assetAAddress)
    const assetB = await this.getAssetInfo(assetBAddress)
    const resultDecimals = (!isExchangeB ? assetB : assetA).decimals
    const result = new FPNumber(resultAmount, resultDecimals)
    const resultMulSlippage = result.mul(new FPNumber(Number(slippageTolerance) / 100, resultDecimals))
    return (!isExchangeB ? result.sub(resultMulSlippage) : result.add(resultMulSlippage)).toString()
  }

  private async calcSwapParams (
    assetAAddress: string,
    assetBAddress: string,
    amountA: NumberLike,
    amountB: NumberLike,
    slippageTolerance: NumberLike = this.defaultSlippageTolerancePercent,
    isExchangeB = false
  ) {
    assert(this.account, Messages.connectWallet)
    const assetA = await this.getAssetInfo(assetAAddress)
    const assetB = await this.getAssetInfo(assetBAddress)
    const desiredDecimals = (!isExchangeB ? assetA : assetB).decimals
    const resultDecimals = (!isExchangeB ? assetB : assetA).decimals
    const desiredCodecString = (new FPNumber(!isExchangeB ? amountA : amountB, desiredDecimals)).toCodecString()
    const result = new FPNumber(!isExchangeB ? amountB : amountA, resultDecimals)
    const resultMulSlippage = result.mul(new FPNumber(Number(slippageTolerance) / 100))
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
        [],
        'Disabled'
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
   */
  public async getSwapNetworkFee (
    assetAAddress: string,
    assetBAddress: string,
    amountA: NumberLike,
    amountB: NumberLike,
    slippageTolerance: NumberLike = this.defaultSlippageTolerancePercent,
    isExchangeB = false
  ): Promise<string> {
    const params = await this.calcSwapParams(assetAAddress, assetBAddress, amountA, amountB, slippageTolerance, isExchangeB)
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
    isExchangeB = false
  ): Promise<void> {
    const params = await this.calcSwapParams(assetAAddress, assetBAddress, amountA, amountB, slippageTolerance, isExchangeB)
    if (!this.accountAssets.find(asset => asset.address === params.assetB.address)) {
      this.addToAssetList({ ...params.assetB, balance: '0' }) // Balance will be updated
    }
    await this.submitExtrinsic(
      (this.api.tx.liquidityProxy as any).swap(...params.args),
      this.account.pair,
      {
        symbol: params.assetA.symbol,
        amount: `${amountA}`,
        symbol2: params.assetB.symbol,
        amount2: `${amountB}`,
        type: Operation.Swap
      }
    )
  }

  /**
   * Get account liquidity with pair where the first symbol is `XOR` and the second is from `KnownAssets`
   */
  public async getKnownAccountLiquidity (): Promise<Array<AccountLiquidity>> {
    assert(this.account, Messages.connectWallet)
    const xor = KnownAssets.get(KnownSymbols.XOR)
    const knownLiquidity: Array<AccountLiquidity> = []
    for (const item of KnownAssets.filter(item => item.symbol !== xor.symbol)) {
      const props = (await this.api.query.poolXyk.properties(xor.address, item.address)).toJSON() as Array<string>
      if (!props || !props.length) {
        continue
      }
      const result = await getAccountAssetInfo(this.api, this.account.pair.address, props[2])
      const { decimals, symbol } = await this.getAssetInfo(props[2])
      const balanceFP = new FPNumber(result, decimals)
      if (balanceFP.isZero()) {
        continue
      }
      const balance = balanceFP.toString()
      if (!Number(balance)) {
        continue
      }
      const [reserveA, reserveB] = await this.getLiquidityReserves(xor.address, item.address)
      const [balanceA, balanceB] = await this.estimateTokensRetrieved(xor.address, item.address, balance, reserveA, reserveB, props[2])
      const asset = {
        address: props[2],
        firstAddress: xor.address,
        secondAddress: item.address,
        firstBalance: balanceA,
        secondBalance: balanceB,
        symbol,
        decimals,
        balance
      } as AccountLiquidity
      knownLiquidity.push(asset)
      this.addToLiquidityList(asset)
    }
    if (this.storage) {
      this.storage.set('liquidity', JSON.stringify(this.liquidity))
    }
    return knownLiquidity
  }

  /**
   * Update already added liquidity
   */
  public async updateAccountLiquidity (): Promise<Array<AccountLiquidity>> {
    assert(this.account, Messages.connectWallet)
    for (const asset of this.liquidity) {
      const result = await getAccountAssetInfo(this.api, this.account.pair.address, asset.address)
      const [reserveA, reserveB] = await this.getLiquidityReserves(asset.firstAddress, asset.secondAddress)
      const [balanceA, balanceB] = await this.estimateTokensRetrieved(
        asset.firstAddress,
        asset.secondAddress,
        asset.balance,
        reserveA,
        reserveB,
        asset.address
      )
      asset.balance = new FPNumber(result, asset.decimals).toString()
      asset.firstBalance = balanceA
      asset.secondBalance = balanceB
      this.addToLiquidityList(asset)
    }
    if (this.storage) {
      this.storage.set('liquidity', JSON.stringify(this.liquidity))
    }
    return this.liquidity
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
    const { symbol, address, decimals } = liquidityInfo
    const asset = {
      decimals,
      symbol,
      address,
      firstAddress: firstAssetAddress,
      secondAddress: secondAssetAddress
    } as AccountLiquidity
    const result = await getAccountAssetInfo(this.api, this.account.pair.address, address)
    asset.balance = new FPNumber(result, asset.decimals).toString()
    this.addToLiquidityList(asset)
    if (this.storage) {
      this.storage.set('liquidity', JSON.stringify(this.liquidity))
    }
    return asset
  }

  /**
   * Get liquidity reserves.
   * If the output will be `['0', '0']` then the client is the first liquidity provider
   * @param firstAssetAddress
   * @param secondAssetAddress
   */
  public async getLiquidityReserves (firstAssetAddress: string, secondAssetAddress: string): Promise<Array<string>> {
    const result = await this.api.query.poolXyk.reserves(firstAssetAddress, secondAssetAddress) as any // Array<Balance>
    if (!result || result.length !== 2) {
      return ['0', '0']
    }
    const firstAsset = await this.getAssetInfo(firstAssetAddress)
    const secondAsset = await this.getAssetInfo(secondAssetAddress)
    const firstValue = new FPNumber(result[0], firstAsset.decimals)
    const secondValue = new FPNumber(result[1], secondAsset.decimals)
    return [firstValue.toString(), secondValue.toString()]
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
   */
  public async estimateTokensRetrieved (
    firstAssetAddress: string,
    secondAssetAddress: string,
    amount: NumberLike,
    firstTotal: NumberLike,
    secondTotal: NumberLike,
    poolTokenAddress?: string
  ): Promise<Array<string>> {
    const firstAsset = await this.getAssetInfo(firstAssetAddress)
    const secondAsset = await this.getAssetInfo(secondAssetAddress)
    const a = new FPNumber(firstTotal, firstAsset.decimals)
    const b = new FPNumber(secondTotal, secondAsset.decimals)
    if (a.isZero() && b.isZero()) {
      return ['0', '0']
    }
    const poolToken = await (
      poolTokenAddress
        ? this.getAssetInfo(poolTokenAddress)
        : this.getLiquidityInfo(firstAssetAddress, secondAssetAddress)
    )
    const pIn = new FPNumber(amount, poolToken.decimals)
    const totalSupply = await (this.api.rpc as any).assets.totalSupply(poolToken.address) // BalanceInfo
    const pts = new FPNumber(totalSupply, poolToken.decimals)
    const aOut = pIn.mul(a).div(pts)
    const bOut = pIn.mul(b).div(pts)
    return [aOut.toString(), bOut.toString(), pts.toString()]
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
    firstTotal: NumberLike,
    secondTotal: NumberLike
  ): Promise<Array<string>> {
    const firstAsset = await this.getAssetInfo(firstAssetAddress)
    const secondAsset = await this.getAssetInfo(secondAssetAddress)
    const aIn = new FPNumber(firstAmount, firstAsset.decimals)
    const bIn = new FPNumber(secondAmount, secondAsset.decimals)
    const a = new FPNumber(firstTotal, firstAsset.decimals)
    const b = new FPNumber(secondTotal, secondAsset.decimals)
    if (a.isZero() && b.isZero()) {
      const inaccuracy = new FPNumber('0.000000000000001')
      return [aIn.mul(bIn).sqrt().sub(inaccuracy).toString()]
    }
    const poolToken = await this.getLiquidityInfo(firstAssetAddress, secondAssetAddress)
    const totalSupply = await (this.api.rpc as any).assets.totalSupply(poolToken.address) // BalanceInfo
    const pts = new FPNumber(totalSupply, poolToken.decimals)
    const result = FPNumber.min(aIn.mul(pts).div(a), bIn.mul(pts).div(b))
    return [result.toString(), pts.toString()]
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
   * Create token pair if user is the first liquidity provider.
   * Before it you should check will user be the first liquidity provider or not
   * (`getLiquidityReserves()` -> `['0', '0']`).
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
    const xor = KnownAssets.get(KnownSymbols.XOR)
    assert([firstAssetAddress, secondAssetAddress].includes(xor.address), Messages.xorIsRequired)
    const baseAssetId = firstAssetAddress === xor.address ? firstAssetAddress : secondAssetAddress
    const targetAssetId = firstAssetAddress !== xor.address ? firstAssetAddress : secondAssetAddress
    const baseAssetAmount = baseAssetId === firstAssetAddress ? firstAmount : secondAmount
    const targetAssetAmount = targetAssetId === secondAssetAddress ? secondAmount : firstAmount
    const params = await this.calcAddLiquidityParams(baseAssetId, targetAssetId, baseAssetAmount, targetAssetAmount, slippageTolerance)
    const transactions = [
      this.api.tx.tradingPair.register(this.defaultDEXId, baseAssetId, targetAssetId),
      this.api.tx.poolXyk.initializePool(this.defaultDEXId, baseAssetId, targetAssetId),
      this.api.tx.poolXyk.depositLiquidity(...params.args)
    ]
    await this.submitExtrinsic(
      this.api.tx.utility.batch(transactions),
      this.account.pair,
      {
        type: Operation.CreatePair,
        symbol: params.firstAsset.symbol,
        symbol2: params.secondAsset.symbol,
        amount: `${baseAssetAmount}`,
        amount2: `${targetAssetAmount}`
      }
    )
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
  ): Promise<string> {
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
    await this.submitExtrinsic(
      this.api.tx.poolXyk.depositLiquidity(...params.args),
      this.account.pair,
      {
        type: Operation.AddLiquidity,
        symbol: params.firstAsset.symbol,
        symbol2: params.secondAsset.symbol,
        amount: `${firstAmount}`,
        amount2: `${secondAmount}`
      }
    )
  }

  private async calcRemoveLiquidityParams (
    firstAssetAddress: string,
    secondAssetAddress: string,
    desiredMarker: NumberLike,
    firstTotal: NumberLike,
    secondTotal: NumberLike,
    totalSupply: NumberLike,
    slippageTolerance: NumberLike = this.defaultSlippageTolerancePercent
  ) {
    assert(this.account, Messages.connectWallet)
    const firstAsset = await this.getAssetInfo(firstAssetAddress)
    const secondAsset = await this.getAssetInfo(secondAssetAddress)
    const poolToken = await this.getLiquidityInfo(firstAssetAddress, secondAssetAddress)
    const desired = new FPNumber(desiredMarker, poolToken.decimals)
    const reserveA = new FPNumber(firstTotal, firstAsset.decimals)
    const reserveB = new FPNumber(secondTotal, secondAsset.decimals)
    const pts = new FPNumber(totalSupply, poolToken.decimals)
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
    desiredMarker: NumberLike,
    firstTotal: NumberLike,
    secondTotal: NumberLike,
    totalSupply: NumberLike,
    slippageTolerance: NumberLike = this.defaultSlippageTolerancePercent
  ): Promise<string> {
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
    desiredMarker: NumberLike,
    firstTotal: NumberLike,
    secondTotal: NumberLike,
    totalSupply: NumberLike,
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
        symbol2: params.secondAsset.symbol,
        amount: `${desiredMarker}`
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
    this.account = null
    this.signer = null
    this.assets = []
    this.liquidity = []
    this.history = []
    if (this.storage) {
      this.storage.clear()
    }
  }

  //_________________________FORMATTER_METHODS_____________________________
  /**
   * Divide the first asset by the second
   * @param firstAssetAddress
   * @param secondAssetAddress
   * @param firstAmount
   * @param secondAmount
   * @param reversed If `true`: the second by the first (`false` by default)
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
    return result.toString()
  }
}
