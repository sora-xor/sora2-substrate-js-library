import { assert, isHex } from '@polkadot/util'
import { keyExtractSuri, mnemonicValidate } from '@polkadot/util-crypto'
import { KeypairType } from '@polkadot/util-crypto/types'
import keyring from '@polkadot/ui-keyring'
import { CreateResult } from '@polkadot/ui-keyring/types'
import { KeyringPair, KeyringPair$Json } from '@polkadot/keyring/types'

import { KnownAssets, getAccountAssetInfo, AccountAsset, KnownSymbols, Asset, getAssetInfo } from './assets'
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
  public readonly defaultLiquidityMinPercent = 1
  public readonly seedLength = 12

  private storage?: Storage
  private account?: CreateResult
  private assets: Array<AccountAsset> = []

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

  private addAsset (asset: AccountAsset): void {
    const index = this.assets.findIndex(item => item.address === asset.address)
    ~index ? this.assets[index] = asset : this.assets.push(asset)
  }

  /**
   * Get asset information
   * @param address asset address
   */
  public async getAssetInfo (address: string): Promise<Asset> {
    const knownAsset = KnownAssets.find(asset => asset.address === address)
    if (knownAsset) {
      return knownAsset
    }
    const existingAsset = this.assets.find(asset => asset.address === address)
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
    const knownAsset = KnownAssets.find(asset => asset.address === address)
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
    this.addAsset(asset)
    if (this.storage) {
      this.storage.set('assets', JSON.stringify(this.assets))
    }
    return asset
  }

  private async convertToUsd (from: AccountAsset): Promise<string> {
    if (from.symbol === KnownSymbols.USD) {
      return from.balance
    }
    const usd = KnownAssets.find(({ symbol }) => symbol === KnownSymbols.USD)
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
      asset.balance = new FPNumber(result.free || result.data.free, asset.decimals).toString()
      if (!!Number(asset.balance)) {
        asset.usdBalance = await this.convertToUsd(asset)
        knownAssets.push(asset)
        this.addAsset(asset)
      }
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
      this.addAsset(asset)
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
    const fromAddress = this.account.pair.address
    await this.submitExtrinsic(
      this.api.tx.assets.transfer(assetAddress, toAddress, new FPNumber(amount, asset.decimals).toCodecString()),
      fromAddress
    )
  }

  /**
   * Get swap result for the demonstration purposes
   * @param firstAssetAddress First asset address
   * @param secondAssetAddress Second asset address
   * @param amount Amount value
   */
  public async getSwapResult (firstAssetAddress: string, secondAssetAddress: string, amount: string): Promise<SwapResult> {
    const xor = KnownAssets.find(asset => asset.symbol === KnownSymbols.XOR)
    const firstAsset = await this.getAssetInfo(firstAssetAddress)
    const secondAsset = await this.getAssetInfo(secondAssetAddress)
    const result = await (this.api.rpc as any).liquidityProxy.quote(
      this.defaultDEXId,
      firstAssetAddress,
      secondAssetAddress,
      new FPNumber(amount, firstAsset.decimals).toCodecString(),
      'WithDesiredInput',
      [],
      'Disabled'
    ).unwrap()
    return {
      amount: new FPNumber(result.amount, secondAsset.decimals).toString(),
      fee: new FPNumber(result.fee, xor.decimals).toString()
    } as SwapResult
  }

  /**
   * Swap operation
   * @param inputAssetAddress Input asset address
   * @param outputAssetAdress Output asset address
   * @param amount Amount value
   * @param resultAmount Result of the swap operation, `getSwapResult().amount`
   * @param slippageTolerance Slippage tolerance coefficient (in %)
   */
  public async swap (
    inputAssetAddress: string,
    outputAssetAdress: string,
    amount: string,
    resultAmount: string,
    slippageTolerance = this.defaultSlippageTolerancePercent
  ) {
    assert(this.account, Messages.connectWallet)
    const fromAddress = this.account.pair.address
    const inputAsset = await this.getAssetInfo(inputAssetAddress)
    const outputAsset = await this.getAssetInfo(outputAssetAdress)
    const desiredAmountIn = new FPNumber(amount, inputAsset.decimals)
    const resultAmountOut = new FPNumber(resultAmount, outputAsset.decimals)
    const slippage = new FPNumber(slippageTolerance / 100, outputAsset.decimals)
    await this.submitExtrinsic(
      this.api.tx.liquidityProxy.swap(
        this.defaultDEXId,
        inputAssetAddress,
        outputAssetAdress,
        {
          WithDesiredInput: {
            desired_amount_in: desiredAmountIn.toCodecString(),
            min_amount_out: resultAmountOut.sub(resultAmountOut.mul(slippage)).toCodecString()
          }
        },
        [],
        'Disabled'
      ),
      fromAddress,
      'Swap'
    )
  }

  public async addLiquidity (
    firstAssetAddress: string,
    secondAssetAddress: string,
    firstAmount: string,
    secondAmount: string,
    firstMinCoef = this.defaultLiquidityMinPercent,
    secondMinCoef = this.defaultLiquidityMinPercent
  ) {
    assert(this.account, Messages.connectWallet)
    const fromAddress = this.account.pair.address
    const firstAsset = await this.getAssetInfo(firstAssetAddress)
    const secondAsset = await this.getAssetInfo(secondAssetAddress)
    const firstAmountNum = new FPNumber(firstAmount, firstAsset.decimals)
    const secondAmountNum = new FPNumber(secondAmount, secondAsset.decimals)
    const firstMinCoefNum = new FPNumber(firstMinCoef / 100, firstAsset.decimals)
    const secondMinCoefNum = new FPNumber(secondMinCoef / 100, secondAsset.decimals)
    await this.submitExtrinsic(
      this.api.tx.poolXyk.depositLiquidity(
        this.defaultDEXId,
        firstAssetAddress,
        secondAssetAddress,
        firstAmountNum.toCodecString(),
        secondAmountNum.toCodecString(),
        // TODO: check formulas
        firstAmountNum.sub(firstAmountNum.mul(firstMinCoefNum)).toCodecString(),
        secondAmountNum.sub(secondAmountNum.mul(secondMinCoefNum)).toCodecString()
      ),
      fromAddress,
      'Add Liquidity'
    )
  }

  public async removeLiquidity (
    firstAssetAddress: string,
    secondAssetAddress: string,
    inputAmount: string, // TODO: Why it's only one value, decimals can be different
    firstMinCoef = this.defaultLiquidityMinPercent,
    secondMinCoef = this.defaultLiquidityMinPercent
  ) {
    assert(this.account, Messages.connectWallet)
    const fromAddress = this.account.pair.address
    const firstAsset = await this.getAssetInfo(firstAssetAddress)
    const secondAsset = await this.getAssetInfo(secondAssetAddress)
    const firstAmountNum = new FPNumber(inputAmount, firstAsset.decimals)
    const secondAmountNum = new FPNumber(inputAmount, secondAsset.decimals)
    const firstMinCoefNum = new FPNumber(firstMinCoef / 100, firstAsset.decimals)
    const secondMinCoefNum = new FPNumber(secondMinCoef / 100, secondAsset.decimals)
    await this.submitExtrinsic(
      this.api.tx.poolXyk.withdrawLiquidity(
        this.defaultDEXId,
        firstAssetAddress,
        secondAssetAddress,
        firstAmountNum.toCodecString(),
        // TODO: check formulas
        firstAmountNum.sub(firstAmountNum.mul(firstMinCoefNum)).toCodecString(),
        secondAmountNum.sub(secondAmountNum.mul(secondMinCoefNum)).toCodecString()
      ),
      fromAddress,
      'Remove Liquidity'
    )
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
    if (this.storage) {
      this.storage.clear()
    }
  }
}
