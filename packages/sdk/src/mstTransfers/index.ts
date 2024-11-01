import { assert } from '@polkadot/util';
import { FPNumber, NumberLike, CodecString } from '@sora-substrate/math';
import type { SubmittableExtrinsic } from '@polkadot/api/promise/types';

import { Messages } from '../logger';
import { Operation } from '../types';
import type { KeyringPair$Meta } from '@polkadot/keyring/types';
import type { Api } from '../api';

/**
 * This module is used for internal needs
 */
export class MstTransfersModule<T> {
  constructor(private readonly root: Api<T>) {}

  /**
   * Returns batch tx
   * @param data List with data for Transfer All Tx
   */
  public prepareCall(
    data: Array<{ assetAddress: string; toAddress: string; amount: NumberLike }>
  ): SubmittableExtrinsic {
    assert(data.length, Messages.noTransferData);

    const txs = data.map((item) => {
      return this.root.api.tx.assets.transfer(
        item.assetAddress,
        item.toAddress,
        new FPNumber(item.amount).toCodecString()
      );
    });
    return this.root.api.tx.utility.batchAll(txs);
  }

  /**
   * Returns the final extrinsic for Trnaser All MST transaction
   * @param call `api.prepareTransferAllAsMstCall` result
   * @param threshold Minimum number of signers
   * @param coSigners List of co-signers
   */
  public prepareExtrinsic(
    call: SubmittableExtrinsic,
    threshold: number,
    coSigners: Array<string>
  ): SubmittableExtrinsic {
    assert(this.root.account, Messages.connectWallet);
    const MAX_WEIGHT = 640000000;
    // TODO: [MST] check MAX_WEIGHT arg
    return this.root.api.tx.multisig.approveAsMulti(threshold, coSigners, null, call.method.hash, `${MAX_WEIGHT}`);
  }

  /**
   * Get network fee for Transfer All MST Tx
   * @param extrinsic `api.prepareTransferAllAsMstExtrinsic` result
   */
  public async getNetworkFee(tx: SubmittableExtrinsic): Promise<CodecString> {
    return await this.root.getTransactionFee(tx);
  }

  /**
   * Transfer all data from array as MST
   * @param extrinsic `api.prepareTransferAllAsMstExtrinsic` result
   */
  public submit(extrinsic: SubmittableExtrinsic): Promise<T> {
    assert(this.root.account, Messages.connectWallet);
    return this.root.submitExtrinsic(extrinsic, this.root.account.pair, {
      type: Operation.TransferAll,
    });
  }

  /**
   * Get the last (frist from array of multisigns) pending TX from MST
   * @param mstAccount MST account
   */
  public async getLastPendingTx(mstAccount: string): Promise<string | null> {
    try {
      const pendingData = await this.root.api.query.multisig.multisigs.entries(mstAccount);
      return pendingData.map(([item, _]) => item.args[1].toString())[0];
    } catch {
      return null;
    }
  }

  getMSTName(): string {
    const addressMST = this.root.account?.pair?.address ?? '';
    const multisigAccount = this.root.getMstAccount(addressMST);
    return multisigAccount?.meta.name ?? '';
  }

  public isMstAddressExist(): boolean {
    /* We taking previousAccountAddress because for now we are in MST,
    and we have MST address stored onle in default account
    previousAccountAddress have only MST*/
    const addressMST =
      (this.root.accountStorage?.get('previousAccountAddress') || this.root.accountStorage?.get('MSTAddress')) ?? '';
    return addressMST !== '';
  }

  public isMST(): boolean {
    const addressMST = this.root.accountStorage?.get('previousAccountAddress');
    return addressMST !== '';
  }

  public forgetMSTAccount(): void {
    // We will be always in MST before delete it
    const previousAccountAddress = this.root.accountStorage?.get('previousAccountAddress');
    const previousAccountPair = this.root.getAccountPair(previousAccountAddress ?? '');
    const meta = previousAccountPair.meta as KeyringPair$Meta;
    const mstAddress = this.root.address;

    this.root.accountStorage?.remove('previousAccountAddress');
    this.root.accountStorage?.remove('assetsAddresses');
    // Login to the default account
    this.root.loginAccount(
      previousAccountPair.address,
      meta.name as string,
      meta.source as string,
      meta.isExternal as boolean
    );
    this.root.accountStorage?.remove('MSTAddress');
    this.root.forgetAccount(mstAddress);
  }

  public switchAccount(switchToMST: boolean): void {
    const currentAccountAddress = this.root.account?.pair?.address ?? '';
    let targetAddress: string | undefined;
    let storePreviousAccountAddress = false;

    if (switchToMST) {
      targetAddress = this.root.accountStorage?.get('MSTAddress');
      storePreviousAccountAddress = true;
    } else {
      targetAddress = this.root.accountStorage?.get('previousAccountAddress');
    }

    const accountPair = this.root.getAccountPair(targetAddress ?? '');
    const meta = accountPair.meta as KeyringPair$Meta;
    this.root.loginAccount(accountPair.address, meta.name as string, meta.source as string, meta.isExternal as boolean);

    if (storePreviousAccountAddress) {
      this.root.accountStorage?.set('previousAccountAddress', currentAccountAddress);
    }
  }
}
