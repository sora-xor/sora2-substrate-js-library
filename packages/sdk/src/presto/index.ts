import { assert } from '@polkadot/util';
import { Messages } from '../logger';
import type { Api } from '../api';
import { Country } from './types';
import { NumberLike } from '@sora-substrate/math';

export class PrestoModule<T> {
  constructor(private readonly root: Api<T>) {}

  /**
   * Get requests (all or filtered by account address)
   *
   */
  public async getRequests(address?: string): Promise<Array<any>> {
    let requests: any = [];
    const data = await this.root.api.query.presto.requests.entries();

    data.forEach(([idx, chunk]) => {
      const type = Object.keys(chunk.toHuman() as Object)[0];
      const meta = Object.values(chunk.toHuman() as Object)[0];

      const record = {
        requestId: (idx.toHuman() as Array<string>)[0],
        type,
        ...meta,
      };
      requests.push(record);
    });

    if (address) {
      return requests.filter((request: any) => request.owner === address);
    }

    return requests;
  }

  /**
   * Get crop receipts (all or filtered by account address)
   *
   */
  public async getCropReceipts(address?: string): Promise<Array<any>> {
    let cropReceipts: any = [];
    const data = await this.root.api.query.presto.cropReceipts.entries();

    data.forEach(([idx, chunk]) => {
      const record = {
        crId: (idx.toHuman() as Array<string>)[0],
        ...(chunk.toHuman() as Object),
      };
      cropReceipts.push(record);
    });

    if (address) {
      return cropReceipts.filter((cropReceipt: any) => cropReceipt.owner === address);
    }

    return cropReceipts;
  }

  /**
   * Create deposit request.
   * @param amount string with amount
   * @param paymentReference reference to the payment to link with fiat
   * @param details info on deposit
   *
   */
  public async createDepositRequest(amount: NumberLike, paymentReference: string, details?: string): Promise<T> {
    assert(this.root.account, Messages.connectWallet);

    return this.root.submitExtrinsic(
      this.root.api.tx.presto.createDepositRequest(amount, paymentReference, details || null),
      this.root.account.pair
    );
  }

  /**
   * Create withdraw request.
   * @param amount string with amount
   * @param details info on withdraw
   *
   */
  public async createWithdrawRequest(amount: NumberLike, details: string): Promise<T> {
    assert(this.root.account, Messages.connectWallet);

    return this.root.submitExtrinsic(
      this.root.api.tx.presto.createWithdrawRequest(amount, details),
      this.root.account.pair
    );
  }

  /**
   * Cancel request.
   * @param requestId id
   *
   */
  public async cancelRequest(requestId: number): Promise<T> {
    assert(this.root.account, Messages.connectWallet);

    return this.root.submitExtrinsic(this.root.api.tx.presto.cancelRequest(requestId), this.root.account.pair);
  }

  /**
   * Create crop receipt.
   * @param amount string with amount
   * @param closeInitialPeriod timestamp
   * @param dateOfIssue dateOfIssue
   * @param placeOfIssue string
   * @param debtor string
   * @param creditor string
   * @param performanceTime timestamp
   * @param data terms and agreements
   *
   */
  public async createCropReceipt(
    amount: string,
    profit: number,
    country: Country,
    closeInitialPeriod: number,
    dateOfIssue: number,
    placeOfIssue: string,
    debtor: string,
    creditor: string,
    performanceTime: number,
    data: string
  ): Promise<T> {
    assert(this.root.account, Messages.connectWallet);

    return this.root.submitExtrinsic(
      this.root.api.tx.presto.createCropReceipt(
        amount,
        profit,
        country,
        closeInitialPeriod,
        dateOfIssue,
        placeOfIssue,
        debtor,
        creditor,
        performanceTime,
        data
      ),
      this.root.account.pair
    );
  }

  /**
   * Publish crop receipt.
   * @param crId Crop receipt id
   * @param supply supply that is used in deal
   */
  public async publishCropReceipt(crId: number, supply: NumberLike): Promise<T> {
    assert(this.root.account, Messages.connectWallet);

    return this.root.submitExtrinsic(this.root.api.tx.presto.publishCropReceipt(crId, supply), this.root.account.pair);
  }

  /**
   * Decline crop receipt.
   * @param crId Crop receipt id
   *
   */
  public async declineCropReceipt(crId: number): Promise<T> {
    assert(this.root.account, Messages.connectWallet);

    return this.root.submitExtrinsic(this.root.api.tx.presto.declineCropReceipt(crId), this.root.account.pair);
  }
}
