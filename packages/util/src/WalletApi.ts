import { assert, isHex } from '@polkadot/util'
import { keyExtractSuri, mnemonicValidate } from '@polkadot/util-crypto'
import { KeypairType } from '@polkadot/util-crypto/types'
import keyring from '@polkadot/ui-keyring'
import { CreateResult } from '@polkadot/ui-keyring/types'
import { KeyringPair, KeyringPair$Json } from '@polkadot/keyring/types'

import { KnownAssets, getAssetInfo, AccountAsset } from './assets'
import { Storage } from './storage'
import { formatBalance } from './formatter'
import { decrypt, encrypt } from './crypto'
import { BaseApi } from './api'

/**
 * Contains all necessary data and functions for the wallet
 */
export class WalletApi extends BaseApi {
  private readonly type: KeypairType = 'sr25519'
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
    keyring.loadAll({ type: 'sr25519' })
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
   * Get asset information by its address
   * @param address asset address
   */
  public async getAssetInfo (address: string): Promise<AccountAsset> {
    const asset = { address } as AccountAsset
    const knownAsset = KnownAssets.find(asset => asset.address === address)
    if (knownAsset) {
      asset.symbol = knownAsset.symbol
      asset.decimals = knownAsset.decimals
    }
    assert(this.account, 'You have to add wallet')
    const result = await getAssetInfo(this.api, this.account.pair.address, address) as any
    // TODO: add formatter for balance
    asset.balance = (result.free || result.data.free).toString()
    this.addAsset(asset)
    if (this.storage) {
      this.storage.set('assets', JSON.stringify(this.assets))
    }
    return asset
  }

  /**
   * Get a list of all known assets from `KnownAssets` array
   */
  public async getKnownAssets (): Promise<Array<AccountAsset>> {
    const knownAssets: Array<AccountAsset> = []
    for (const item of KnownAssets) {
      const asset = { ...item } as AccountAsset
      const result = await getAssetInfo(this.api, this.account.pair.address, item.address) as any
      asset.balance = formatBalance((result.free || result.data.free).toString(), asset.decimals)
      if (!!Number(asset.balance)) {
        knownAssets.push(asset)
        this.addAsset(asset)
      }
    }
    if (this.storage) {
      this.storage.set('assets', JSON.stringify(this.assets))
    }
    return knownAssets
  }

  public async updateAssets (): Promise<Array<AccountAsset>> {
    for (const asset of this.assets) {
      const result = await getAssetInfo(this.api, this.account.pair.address, asset.address) as any
      asset.balance = formatBalance((result.free || result.data.free).toString(), asset.decimals)
      this.addAsset(asset)
    }
    if (this.storage) {
      this.storage.set('assets', JSON.stringify(this.assets))
    }
    return this.assets
  }

  /**
   * Remove all wallet data
   */
  public logout (): void {
    keyring.forgetAccount(this.account.pair.address)
    keyring.forgetAddress(this.account.pair.address)
    this.account = null
    this.assets = []
    if (this.storage) {
      this.storage.clear()
    }
  }
}
