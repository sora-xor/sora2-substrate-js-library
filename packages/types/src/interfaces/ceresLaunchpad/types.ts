// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Struct, bool, u32 } from '@polkadot/types';
import type { VestingInfo } from '@polkadot/types/interfaces/vesting';
import type { AccountId, Balance, BlockNumber } from '@sora-substrate/types/interfaces/runtime';

/** @name ContributionInfo */
export interface ContributionInfo extends Struct {
  readonly funds_contributed: Balance;
  readonly tokens_bought: Balance;
  readonly tokens_claimed: Balance;
  readonly claiming_finished: bool;
  readonly number_of_claims: u32;
}

/** @name ILOInfo */
export interface ILOInfo extends Struct {
  readonly ilo_organizer: AccountId;
  readonly tokens_for_ilo: Balance;
  readonly tokens_for_liquidity: Balance;
  readonly ilo_price: Balance;
  readonly soft_cap: Balance;
  readonly hard_cap: Balance;
  readonly min_contribution: Balance;
  readonly max_contribution: Balance;
  readonly refund_type: bool;
  readonly liquidity_percent: Balance;
  readonly listing_price: Balance;
  readonly lockup_days: u32;
  readonly start_block: BlockNumber;
  readonly end_block: BlockNumber;
  readonly token_vesting: VestingInfo;
  readonly sold_tokens: Balance;
  readonly funds_raised: Balance;
  readonly succeeded: bool;
  readonly failed: bool;
  readonly lp_tokens: Balance;
  readonly claimed_lp_tokens: bool;
  readonly finish_block: BlockNumber;
}

export type PHANTOM_CERESLAUNCHPAD = 'ceresLaunchpad';
