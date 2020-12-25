import { BaseApi, History, Operation } from './api'
import { getAccountAssetInfo, KnownAssets } from './assets'
import { FPNumber, NumberLike } from './fp'

/**
 * Contains all necessary data and functions for the faucet
 */
export class FaucetApi extends BaseApi {
  public async initialize (endpoint?: string): Promise<void> {
    await this.connect(endpoint)
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
    await this.submitExtrinsic(
      this.api.tx.faucet.transfer(assetAddress, accountAddress, new FPNumber(amount, asset.decimals).toCodecString()),
      null,
      { type: Operation.Faucet, amount: `${amount}`, symbol: asset.symbol, from: accountAddress },
      true
    )
  }
}
