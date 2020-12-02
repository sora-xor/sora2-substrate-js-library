import { ApiPromise } from '@polkadot/api'
import { WsProvider } from '@polkadot/rpc-provider'
import { assert, isHex } from '@polkadot/util'
import { keyExtractSuri, mnemonicValidate } from '@polkadot/util-crypto'
import { KeypairType } from '@polkadot/util-crypto/types'
import keyring from '@polkadot/ui-keyring'
import { CreateResult } from '@polkadot/ui-keyring/types'
import { KeyringPair, KeyringPair$Json } from '@polkadot/keyring/types'
import { Codec } from '@polkadot/types/types'
import { options } from '@sora-substrate/api'

import { Asset, KnownAssets, getAssetInfo } from './assets'

export class WalletApi {
  public readonly seedLength = 12
  private readonly type: KeypairType = 'sr25519'

  private api: ApiPromise
  private account: CreateResult
  private assets: Array<Asset | { address: string; symbol: string }>

  constructor (
    private endpoint: string
  ) {
  }

  public get accountPair (): KeyringPair {
    return this.account.pair
  }

  public get accountJson (): KeyringPair$Json {
    return this.account.json
  }

  public async initialize (): Promise<void> {
    const provider = new WsProvider(this.endpoint);
    this.api = new ApiPromise(options({ provider }));
    await this.api.isReady
  }

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

  public importAccount (
    suri: string,
    name: string,
    password: string
  ): void {
    this.account = keyring.addUri(suri, password, { name }, this.type)
  }

  public addAsset (address: string, symbol: string): void {
    const knownAsset = KnownAssets.find(asset => asset.address === address)
    this.assets.push(knownAsset || { address, symbol })
  }

  public async getAssetInfo (address: string): Promise<Codec> {
    return getAssetInfo(this.api, this.account.pair.address, address)
  }
}
