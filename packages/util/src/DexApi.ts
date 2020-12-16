import { assert, isHex } from '@polkadot/util'
import { keyExtractSuri, mnemonicValidate } from '@polkadot/util-crypto'
import { KeypairType } from '@polkadot/util-crypto/types'
import keyring from '@polkadot/ui-keyring'
import { CreateResult } from '@polkadot/ui-keyring/types'
import { KeyringPair, KeyringPair$Json } from '@polkadot/keyring/types'

import { KnownAssets, getAccountAssetInfo, AccountAsset, KnownSymbols, Asset, getAssetInfo, getAssets, PoolTokens, AccountLiquidity } from './assets'
import { Storage } from './storage'
import { decrypt, encrypt } from './crypto'
import { BaseApi, KeyringType } from './api'
import { SwapResult } from './swap'
import { FPNumber } from './fp'
import { Messages } from './logger'

/**
 * Contains all necessary data and functions for the wallet
 */
export class DexApi extends BaseApi {
  private readonly type: KeypairType = KeyringType
  private readonly defaultDEXId = 0
  public readonly defaultSlippageTolerancePercent = 0.5
  public readonly seedLength = 12

  private storage?: Storage
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

  /**
   * Set storage if it should be used as data storage
   * @param storage
   */
  public setStorage (storage: Storage): void {
    this.storage = storage
  }

  /**
   * The first method you should run. Includes initialization process and the connection check
   * @param endpoint Blockchain address, you should set it here or before this step
   */
  public async initialize (endpoint?: string): Promise<void> {
    await this.connect(endpoint)
    keyring.loadAll({ type: KeyringType })
    const address = this.storage?.get('address')
    const password = this.storage?.get('password')
    if (!(address || password)) {
      return
    }
    const pair = keyring.getPair(address)
    this.account = keyring.addPair(pair, decrypt(password))
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
    const result = await getAccountAssetInfo(this.api, this.account.pair.address, address) as any
    asset.balance = new FPNumber(result.free || result.data.free, asset.decimals).toString()
    asset.usdBalance = await this.convertToUsd(asset)
    this.addToAssetList(asset)
    if (this.storage) {
      this.storage.set('assets', JSON.stringify(this.assets))
    }
    return asset
  }

  private async convertToUsd (from: AccountAsset): Promise<string> {
    if (from.symbol === KnownSymbols.USD) {
      return from.balance
    }
    const usd = KnownAssets.get(KnownSymbols.USD)
    const result = (await this.getSwapResult(from.address, usd.address, from.balance)).amount
    return new FPNumber(result, usd.decimals).toString()
  }

  /**
   * Get a list of all known assets from `KnownAssets` array
   */
  public async getKnownAccountAssets (): Promise<Array<AccountAsset>> {
    assert(this.account, Messages.connectWallet)
    const knownAssets: Array<AccountAsset> = []
    for (const item of KnownAssets) {
      const asset = { ...item } as AccountAsset
      const result = await getAccountAssetInfo(this.api, this.account.pair.address, item.address) as any
      const balanceBN = result.free || result.data.free
      if (balanceBN.isZero()) {
        continue
      }
      asset.balance = new FPNumber(balanceBN, asset.decimals).toString()
      if (!Number(asset.balance)) {
        continue
      }
      asset.usdBalance = await this.convertToUsd(asset)
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
      const result = await getAccountAssetInfo(this.api, this.account.pair.address, asset.address) as any
      asset.balance = new FPNumber(result.free || result.data.free, asset.decimals).toString()
      asset.usdBalance = await this.convertToUsd(asset)
      this.addToAssetList(asset)
    }
    if (this.storage) {
      this.storage.set('assets', JSON.stringify(this.assets))
    }
    return this.assets
  }

  /**
   * Transfer amount from account
   * @param assetAddress Asset address
   * @param toAddress Account address
   * @param amount Amount value
   */
  public async transfer (assetAddress: string, toAddress: string, amount: string): Promise<void> {
    assert(this.account, Messages.connectWallet)
    const asset = await this.getAssetInfo(assetAddress)
    await this.submitExtrinsic(
      this.api.tx.assets.transfer(assetAddress, toAddress, new FPNumber(amount, asset.decimals).toCodecString()),
      this.account.pair,
      'Transfer'
    )
  }

  /**
   * Get swap result for the demonstration purposes
   * @param inputAssetAddress Input asset address
   * @param outputAssetAdress Output asset address
   * @param amount Amount value
   * @param reversed Exchange A if `reserved=false` else Exchange B. `false` by default
   */
  public async getSwapResult (
    inputAssetAddress: string,
    outputAssetAdress: string,
    amount: string,
    reversed = false
  ): Promise<SwapResult> {
    const xor = KnownAssets.get(KnownSymbols.XOR)
    const inputAsset = await this.getAssetInfo(inputAssetAddress)
    const outputAsset = await this.getAssetInfo(outputAssetAdress)
    const result = await (this.api.rpc as any).liquidityProxy.quote(
      this.defaultDEXId,
      inputAssetAddress,
      outputAssetAdress,
      new FPNumber(amount, (!reversed ? inputAsset : outputAsset).decimals).toCodecString(),
      !reversed ? 'WithDesiredInput' : 'WithDesiredOutput',
      [],
      'Disabled'
    )
    const value = !result.isNone ? result.unwrap() : { amount: 0, fee: 0 }
    return {
      amount: new FPNumber(value.amount, (!reversed ? outputAsset : inputAsset).decimals).toString(),
      fee: new FPNumber(value.fee, xor.decimals).toString()
    } as SwapResult
  }

  /**
   * Get min or max received value
   * @param inputAssetAddress Input asset address
   * @param outputAssetAdress Output asset address
   * @param resultAmount Result of the swap operation, `getSwapResult().amount`
   * @param slippageTolerance Slippage tolerance coefficient (in %)
   * @param reversed If `reversed` then Exchange B and it calculates max received,
   * else - Exchange A and it calculates min received. `false` by default
   */
  public async getMinMaxReceived (
    inputAssetAddress: string,
    outputAssetAdress: string,
    resultAmount: string,
    slippageTolerance = this.defaultSlippageTolerancePercent,
    reversed = false
  ): Promise<string> {
    const inputAsset = await this.getAssetInfo(inputAssetAddress)
    const outputAsset = await this.getAssetInfo(outputAssetAdress)
    const resultDecimals = (!reversed ? outputAsset : inputAsset).decimals
    const result = new FPNumber(resultAmount, resultDecimals)
    const resultMulSlippage = result.mul(new FPNumber(slippageTolerance / 100, resultDecimals))
    return (!reversed ? result.sub(resultMulSlippage) : result.add(resultMulSlippage)).toString()
  }

  /**
   * Swap operation
   * @param inputAssetAddress Input asset address
   * @param outputAssetAdress Output asset address
   * @param amount Amount value
   * @param resultAmount Result of the swap operation, `getSwapResult().amount`
   * @param slippageTolerance Slippage tolerance coefficient (in %)
   * @param reversed Exchange A if `reserved=false` else Exchange B. `false` by default
   */
  public async swap (
    inputAssetAddress: string,
    outputAssetAdress: string,
    amount: string,
    resultAmount: string,
    slippageTolerance = this.defaultSlippageTolerancePercent,
    reversed = false
  ): Promise<void> {
    assert(this.account, Messages.connectWallet)
    const inputAsset = await this.getAssetInfo(inputAssetAddress)
    const outputAsset = await this.getAssetInfo(outputAssetAdress)
    const desiredDecimals = (!reversed ? inputAsset : outputAsset).decimals
    const resultDecimals = (!reversed ? outputAsset : inputAsset).decimals
    const desiredCodecString = (new FPNumber(amount, desiredDecimals)).toCodecString()
    const result = new FPNumber(resultAmount, resultDecimals)
    const resultMulSlippage = result.mul(new FPNumber(slippageTolerance / 100, resultDecimals))
    const params = {} as any
    if (!reversed) {
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
    await this.submitExtrinsic(
      this.api.tx.liquidityProxy.swap(
        this.defaultDEXId,
        inputAssetAddress,
        outputAssetAdress,
        params,
        [],
        'Disabled'
      ),
      this.account.pair,
      'Swap'
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
      const result = await getAccountAssetInfo(this.api, this.account.pair.address, props[2]) as any
      const balanceBN = result.free || result.data.free
      if (balanceBN.isZero()) {
        continue
      }
      const { decimals, symbol } = await this.getAssetInfo(props[2])
      const balance = new FPNumber(balanceBN, decimals).toString()
      if (!Number(balance)) {
        continue
      }
      const asset = { address: props[2], firstAddress: xor.address, secondAddress: item.address, symbol, decimals, balance } as AccountLiquidity
      asset.usdBalance = await this.convertToUsd(asset)
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
      const result = await getAccountAssetInfo(this.api, this.account.pair.address, asset.address) as any
      asset.balance = new FPNumber(result.free || result.data.free, asset.decimals).toString()
      asset.usdBalance = await this.convertToUsd(asset)
      this.addToAssetList(asset)
    }
    if (this.storage) {
      this.storage.set('liquidity', JSON.stringify(this.liquidity))
    }
    return this.liquidity
  }

  /**
   * Get account liquidity information
   * @param firstAssetAddress
   * @param secondAssetAddress
   */
  public async getAccountLiquidity (firstAssetAddress: string, secondAssetAddress: string): Promise<AccountLiquidity> {
    assert(this.account, Messages.connectWallet)
    const props = (await this.api.query.poolXyk.properties(firstAssetAddress, secondAssetAddress)).toJSON() as Array<string>
    if (!props && !props.length) {
      return null
    }
    const { decimals, symbol } = await this.getAssetInfo(props[2])
    const asset = { decimals, symbol, address: props[2], firstAddress: firstAssetAddress, secondAddress: secondAssetAddress } as AccountLiquidity
    const result = await getAccountAssetInfo(this.api, this.account.pair.address, props[2]) as any
    asset.balance = new FPNumber(result.free || result.data.free, asset.decimals).toString()
    asset.usdBalance = await this.convertToUsd(asset)
    this.addToLiquidityList(asset)
    if (this.storage) {
      this.storage.set('liquidity', JSON.stringify(this.liquidity))
    }
    return asset
  }

  /**
   * Check liquidity reserves.
   * If the output will be `['0', '0']` then the client is the first liquidity provider
   * @param firstAssetAddress
   * @param secondAssetAddress
   */
  public async checkLiquidityReserves (firstAssetAddress: string, secondAssetAddress: string): Promise<Array<string>> {
    const result = (await this.api.query.poolXyk.reserves(firstAssetAddress, secondAssetAddress)).toHuman() as any
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
   * Calculate total supply.
   * We **should** call `getAccountLiquidity` before this method
   * @param firstAssetAddress First asset address
   * @param secondAssetAddress Second asset address
   * @param firstAmount First asset amount
   * @param secondAmount Second asset amount
   * @param firstTotal checkLiquidityReserves()[0]
   * @param secondTotal checkLiquidityReserves()[1]
   */
  public async calculateTotalSupply (
    firstAssetAddress: string,
    secondAssetAddress: string,
    firstAmount: string,
    secondAmount: string,
    firstTotal: string,
    secondTotal: string
  ): Promise<string> {
    const firstAsset = await this.getAssetInfo(firstAssetAddress)
    const secondAsset = await this.getAssetInfo(secondAssetAddress)
    const one = new FPNumber(1)
    const aIn = new FPNumber(firstAmount, firstAsset.decimals)
    const bIn = new FPNumber(secondAmount, secondAsset.decimals)
    const a = new FPNumber(firstTotal, firstAsset.decimals)
    const b = new FPNumber(secondTotal, secondAsset.decimals)
    // We don't need null check here because we should call `getAccountLiquidity` first
    const poolToken = this.liquidity.find(({ firstAddress, secondAddress }) => firstAddress === firstAssetAddress && secondAddress === secondAssetAddress)
    // TODO: check this function
    const totalSupply = (await (this.api.rpc as any).assets.totalSupply(poolToken.address)).toString()
    const pts = new FPNumber(totalSupply, poolToken.decimals)
    const result = FPNumber.min(aIn.mul(pts).div(!a.isZero() ? a : one), bIn.mul(pts).div(!b.isZero() ? b : one))
    return result.toString()
  }

  public async addLiquidity (
    firstAssetAddress: string,
    secondAssetAddress: string,
    firstAmount: string,
    secondAmount: string,
    slippageTolerance = this.defaultSlippageTolerancePercent
  ) {
    assert(this.account, Messages.connectWallet)
    const firstAsset = await this.getAssetInfo(firstAssetAddress)
    const secondAsset = await this.getAssetInfo(secondAssetAddress)
    const firstAmountNum = new FPNumber(firstAmount, firstAsset.decimals)
    const secondAmountNum = new FPNumber(secondAmount, secondAsset.decimals)
    const firstMinCoefNum = new FPNumber(slippageTolerance / 100, firstAsset.decimals)
    const secondMinCoefNum = new FPNumber(slippageTolerance / 100, secondAsset.decimals)
    await this.submitExtrinsic(
      this.api.tx.poolXyk.depositLiquidity(
        this.defaultDEXId,
        firstAssetAddress,
        secondAssetAddress,
        firstAmountNum.toCodecString(),
        secondAmountNum.toCodecString(),
        firstAmountNum.sub(firstAmountNum.mul(firstMinCoefNum)).toCodecString(),
        secondAmountNum.sub(secondAmountNum.mul(secondMinCoefNum)).toCodecString()
      ),
      this.account.pair,
      'Add Liquidity'
    )
  }

  // TODO: finish it in the next PR
  public async removeLiquidity (
    firstAssetAddress: string,
    secondAssetAddress: string,
    desiredMarker: string,
    slippageTolerance = this.defaultSlippageTolerancePercent
  ) {
    assert(this.account, Messages.connectWallet)
    const firstAsset = await this.getAssetInfo(firstAssetAddress)
    const secondAsset = await this.getAssetInfo(secondAssetAddress)
    // const firstAmountNum = new FPNumber(inputAmount, firstAsset.decimals)
    // const secondAmountNum = new FPNumber(inputAmount, secondAsset.decimals)
    // const firstMinCoefNum = new FPNumber(firstMinCoef / 100, firstAsset.decimals)
    // const secondMinCoefNum = new FPNumber(secondMinCoef / 100, secondAsset.decimals)
    // await this.submitExtrinsic(
    //   this.api.tx.poolXyk.withdrawLiquidity(
    //     this.defaultDEXId,
    //     firstAssetAddress,
    //     secondAssetAddress,
    //     firstAmountNum.toCodecString(),
    //     // TODO: check formulas
    //     firstAmountNum.sub(firstAmountNum.mul(firstMinCoefNum)).toCodecString(),
    //     secondAmountNum.sub(secondAmountNum.mul(secondMinCoefNum)).toCodecString()
    //   ),
    //   this.account.pair,
    //   'Remove Liquidity'
    // )
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
    this.assets = []
    this.liquidity = []
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
    firstAmount: string,
    secondAmount: string,
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
