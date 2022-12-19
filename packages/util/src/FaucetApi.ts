import { assert } from '@polkadot/util';
import keyring from '@polkadot/ui-keyring';
import { NumberLike, FPNumber } from '@sora-substrate/math';
import type { CreateResult } from '@polkadot/ui-keyring/types';

import { BaseApi, Operation, KeyringType } from './BaseApi';
import { getBalance } from './assets';
import { KnownAssets } from './assets/consts';
import { Messages } from './logger';

/**
 * Contains all necessary data and functions for the faucet
 */
export class FaucetApi<T = void> extends BaseApi<T> {
  private readonly fausetSignerSeed = 'fuel start grant tackle void tree unusual teach grocery jar pulp weird';
  private readonly faucetSignerName = 'Faucet Signer';
  private readonly faucetSignerPassword = 'qwaszx';

  private faucetSigner?: CreateResult;

  constructor(withKeyringLoading = true) {
    super();
    // Fake account initialization
    if (withKeyringLoading) {
      keyring.loadAll({ type: KeyringType });
    }
    this.faucetSigner = keyring.addUri(
      this.fausetSignerSeed,
      this.faucetSignerPassword,
      { name: this.faucetSignerName },
      KeyringType
    );
    this.setAccount(this.faucetSigner);
  }

  /**
   * **NOT USED** will be removed soon, seems that we don't need it
   * @param assetAddress
   * @param accountAddress
   * @returns balance = value * 10 ^ decimals
   */
  public async getBalance(assetAddress: string, accountAddress: string): Promise<string> {
    const asset = KnownAssets.get(assetAddress);
    const result = await getBalance(this.api, accountAddress, assetAddress);
    return new FPNumber(result, asset.decimals).toCodecString();
  }

  public send(assetAddress: string, accountAddress: string, amount: NumberLike): Promise<T> {
    assert(!!this.faucetSigner, Messages.connectWallet);
    const asset = KnownAssets.get(assetAddress);
    // For now it will be signed transaction with the fake account
    return this.submitExtrinsic(
      this.api.tx.faucet.transfer(assetAddress, accountAddress, new FPNumber(amount, asset.decimals).toCodecString()),
      this.faucetSigner.pair,
      { type: Operation.Faucet, amount: `${amount}`, symbol: asset.symbol, from: accountAddress }
    );
  }
}
