import { ApiPromise } from '@polkadot/api'
import { WsProvider } from '@polkadot/rpc-provider'
import { assert, isHex } from '@polkadot/util'
import { keyExtractSuri, mnemonicValidate } from '@polkadot/util-crypto'
import { KeypairType } from '@polkadot/util-crypto/types'
import keyring from '@polkadot/ui-keyring'
import { CreateResult } from '@polkadot/ui-keyring/types'
import { KeyringPair, KeyringPair$Json } from '@polkadot/keyring/types'
import { options } from '@sora-substrate/api'

import { KnownAssets, getAssetInfo, AccountAsset } from './assets'

export class WalletApi {
  private readonly type: KeypairType = 'sr25519'
  public readonly seedLength = 12

  private api: ApiPromise
  private account?: CreateResult
  private assets: Array<AccountAsset> = []

  public endpoint: string

  constructor (endpoint?: string) {
    if (endpoint) {
      this.endpoint = endpoint
    }
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

  /**
   * The first method you should run. Includes initialization process and the connection check
   * @param endpoint Blockchain address, you should set it here or before this step
   */
  public async initialize (endpoint?: string): Promise<void> {
    if (endpoint) {
      this.endpoint = endpoint
    }
    const provider = new WsProvider(this.endpoint)
    this.api = new ApiPromise(options({ provider }))
    await this.api.isReady
    keyring.loadAll({ type: 'sr25519' })
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
    asset.balance = (result.free || result.data.free).toString()
    this.addAsset(asset)
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
      asset.balance = (result.free || result.data.free).toString()
      knownAssets.push(asset)
      this.addAsset(asset)
    }
    return knownAssets
  }

  /**
   * Remove all wallet data
   */
  public logout (): void {
    this.account = null
    this.assets = []
  }
}

/**
 * An instance of the wallet api which contains all necessary functions
 */
export const walletApi = new WalletApi()
