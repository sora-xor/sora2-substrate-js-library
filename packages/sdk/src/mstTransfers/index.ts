import { assert } from '@polkadot/util';
import { FPNumber, NumberLike, CodecString } from '@sora-substrate/math';
import type { SubmittableExtrinsic } from '@polkadot/api/promise/types';

import { Messages } from '../logger';
import { HistoryItem, Operation } from '../types';
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

  public getHistoryByCallData(callData: string): HistoryItem | null {
    return null;
  }

  /**
   * Get the last (frist from array of multisigns) pending TX from MST
   * @param mstAccount MST account
   */
  public async subscribeOnPendingTxs(mstAccount: string): Promise<string | null> {
    // Observable
    // Stefan + Rustem + Nikita -> MST (public address)
    // 1. All member should generate the same MST account using parameters (all co-signer addresses + treshold)

    try {
      // 1. TODO: subscribe to block
      const pendingData = await this.root.api.query.multisig.multisigs.entries(mstAccount);
      // 2. [AccountId32, U8aFixed] - 2nd (U8aFixed) is callHash
      // 3. 'someData' below contains block number where this TX was created
      // 4. request extrinsics from this block (system.getExtrinsicsFromBlock)
      // 5. find needed extrinsic (with tx.system.remark event + multisig.approveAsMulti event)
      // 6. get the data from system.remark, decrypt it. it'll be represented as callData
      // 6.1 ensure that hash(callData) is the same as callHash
      // Other methods
      // 7. show it to the user (getHistoryByCallData)
      // 8. user approves or declines:
      // 8.1. if the TX was not the last from threshold - approveAsMulti(callHash)
      // 8.2. if the TX was the last from threshold - asMulti(callData)

      // !!!! Users should have an ability to see callData in UI in case they don't use Fearless Wallet
      // !!!! We should block the flow where user doesn't use Fearless Wallet | Desktop
      return pendingData.map(([item, someData]) => item.args[1].toString())[0];
    } catch {
      return null;
    }
  }
}
