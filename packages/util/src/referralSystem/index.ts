import { assert } from '@polkadot/util';
import type { Observable } from '@polkadot/types/types';

import { Messages } from '../logger';
import { FPNumber, NumberLike } from '../fp';
import { XOR } from '../assets/consts';
import { Operation } from '../BaseApi';
import type { Api } from '../api';

export class ReferralSystemModule {
  constructor(private readonly root: Api) {}

  /**
   * Returns the referral of the invited user by Id
   * @param invitedUserId address of invited account
   * @returns referral
   */
  public async getReferral(invitedUserId: string): Promise<string> {
    const referral = (await this.root.api.query.referrals.referrers(invitedUserId)) as any;
    return !referral ? '' : referral.toString();
  }

  /**
   * Returns invited users of the referrer
   * @param referrerId address of referrer account
   * @returns array of invited users
   */
  public async getInvitedUsers(referrerId: string): Promise<Array<string>> {
    return (await this.root.api.query.referrals.referrals(referrerId)) as any;
  }

  /**
   * Referrer's invited users subscription
   * @param referrerId address of referrer account
   */
  public subscribeOnInvitedUsers(referrerId: string): Observable<Array<string>> {
    return this.root.apiRx.query.referrals.referrals(referrerId) as unknown as Observable<Array<string>>;
  }

  /**
   * Transfer XOR balance from the referral account to the special account
   * This balance can be used by referrals to pay the fee
   * @param amount balance to reserve
   */
  public async reserveXor(amount: NumberLike): Promise<void> {
    assert(this.root.account, Messages.connectWallet);
    await this.root.submitExtrinsic(
      this.root.api.tx.referrals.reserve(new FPNumber(amount, XOR.decimals).toCodecString()),
      this.root.account.pair,
      { symbol: XOR.symbol, amount: `${amount}`, assetAddress: XOR.address, type: Operation.ReferralReserveXor }
    );
  }

  /**
   * Unreserve XOR balance
   * @param amount balance to unreserve
   */
  public async unreserveXor(amount: NumberLike): Promise<void> {
    assert(this.root.account, Messages.connectWallet);
    await this.root.submitExtrinsic(
      this.root.api.tx.referrals.unreserve(new FPNumber(amount, XOR.decimals).toCodecString()),
      this.root.account.pair,
      { symbol: XOR.symbol, amount: `${amount}`, assetAddress: XOR.address, type: Operation.ReferralUnreserveXor }
    );
  }

  /**
   * Sets invited user to their referral if the account doesn’t have a referral yet.
   * This extrinsic is paid by the bonded balance of the referral if the invited user doesn’t have a referral,
   * otherwise the extrinsic fails and the fee is paid by the invited user. Also, if referral doesn't have enough
   * bonded balance for this call, then this method will fail.
   * @param referralId address of referral account
   */
  public async setInvitedUser(referralId: string): Promise<void> {
    assert(this.root.account, Messages.connectWallet);
    // Check the ability for paying fee
    const bondedData = await this.root.api.query.referrals.referrerBalances(referralId);
    const bonded = new FPNumber(bondedData || 0);
    const requiredFeeValue = FPNumber.fromCodecValue(this.root.NetworkFee.ReferralSetInvitedUser || 0);
    assert(FPNumber.gte(bonded, requiredFeeValue), Messages.inabilityOfReferrerToPayFee);

    const formattedToAddress = referralId.slice(0, 2) === 'cn' ? referralId : this.root.formatAddress(referralId);
    await this.root.submitExtrinsic(this.root.api.tx.referrals.setReferrer(referralId), this.root.account.pair, {
      to: formattedToAddress,
      type: Operation.ReferralSetInvitedUser,
    });
  }
}
