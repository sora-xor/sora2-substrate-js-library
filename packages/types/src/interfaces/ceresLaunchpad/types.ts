// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Struct, bool, u32 } from '@polkadot/types';
import type { AccountId, Balance, Moment } from '@sora-substrate/types/interfaces/runtime';

/** @name ContributionInfo */
export interface ContributionInfo extends Struct {
  readonly funds_contributed: Balance;
  readonly tokens_bought: Balance;
  readonly tokens_claimed: Balance;
  readonly claiming_finished: bool;
  readonly number_of_claims: u32;
}

/** @name ContributorsVesting */
export interface ContributorsVesting extends Struct {
  readonly first_release_percent: Balance;
  readonly vesting_period: Moment;
  readonly vesting_percent: Balance;
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
  readonly start_timestamp: Moment;
  readonly end_timestamp: Moment;
  readonly contributors_vesting: ContributorsVesting;
  readonly team_vesting: TeamVesting;
  readonly sold_tokens: Balance;
  readonly funds_raised: Balance;
  readonly succeeded: bool;
  readonly failed: bool;
  readonly lp_tokens: Balance;
  readonly claimed_lp_tokens: bool;
  readonly finish_timestamp: Moment;
}

/** @name TeamVesting */
export interface TeamVesting extends Struct {
  readonly team_vesting_total_tokens: Balance;
  readonly team_vesting_first_release_percent: Balance;
  readonly team_vesting_period: Moment;
  readonly team_vesting_percent: Balance;
}

export type PHANTOM_CERESLAUNCHPAD = 'ceresLaunchpad';
