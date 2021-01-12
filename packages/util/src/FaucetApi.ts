import keyring from '@polkadot/ui-keyring'
import { CreateResult } from '@polkadot/ui-keyring/types'

import { BaseApi, History, Operation, KeyringType } from './api'
import { getAccountAssetInfo, KnownAssets } from './assets'
import { FPNumber, NumberLike } from './fp'

/**
 * Contains all necessary data and functions for the faucet
 */
export class FaucetApi extends BaseApi {
  private faucetSigner?: CreateResult

  public async initialize (endpoint?: string): Promise<void> {
    await this.connect(endpoint)
    // Fake account initialization
    keyring.loadAll({ type: KeyringType })
    this.faucetSigner = keyring.addUri(
      'fuel start grant tackle void tree unusual teach grocery jar pulp weird',
      'qwaszx',
      { name: 'Faucet Signer' },
      KeyringType
    )
  }

  public get historyList (): Array<History> {
    return this.history
  }

  public async getBalance (assetAddress: string, accountAddress: string): Promise<string> {
    const asset = KnownAssets.get(assetAddress)
    const result = await getAccountAssetInfo(this.api, accountAddress, assetAddress)
    return new FPNumber(result, asset.decimals).toString()
  }

  public async send (assetAddress: string, accountAddress: string, amount: NumberLike): Promise<void> {
    const asset = KnownAssets.get(assetAddress)
    // For now it will be signed transaction with the fake account
    await this.submitExtrinsic(
      this.api.tx.faucet.transfer(assetAddress, accountAddress, new FPNumber(amount, asset.decimals).toCodecString()),
      this.faucetSigner.pair,
      { type: Operation.Faucet, amount: `${amount}`, symbol: asset.symbol, from: accountAddress }
    )
  }
}
