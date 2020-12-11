import { Keyring } from '@polkadot/api'

import { BaseApi, KeyringType } from './api'

/**
 * Contains all necessary data and functions for the faucet
 */
export class FaucetApi extends BaseApi {
  public async initialize (endpoint?: string): Promise<void> {
    await this.connect(endpoint)
  }

  public async send (assetAddress: string, accountAddress: string, amount: string): Promise<void> {
    const keyring = new Keyring({ type: KeyringType })
    const pair = keyring.addFromAddress(accountAddress)
    await this.submitExtrinsic(this.api.tx.faucet.transfer(assetAddress, accountAddress, amount), pair, 'Faucet')
  }
}
