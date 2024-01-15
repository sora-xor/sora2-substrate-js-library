import { assert } from '@polkadot/util';
import { FPNumber, NumberLike, CodecString } from '@sora-substrate/math';
import type { SubmittableExtrinsic } from '@polkadot/api/promise/types';

import { Messages } from '../logger';
import { Operation } from '../BaseApi';
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
}
