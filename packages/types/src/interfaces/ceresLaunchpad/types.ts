// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Struct, bool, u32 } from '@polkadot/types-codec';
import type { AccountId, Balance, BlockNumber } from '@sora-substrate/types/interfaces/runtime';

/** @name ContributionInfo */
export interface ContributionInfo extends Struct {
  readonly fundsContributed: Balance;
  readonly tokensBought: Balance;
  readonly tokensClaimed: Balance;
  readonly claimingFinished: bool;
  readonly numberOfClaims: u32;
}

/** @name ContributorsVesting */
export interface ContributorsVesting extends Struct {
  readonly firstReleasePercent: Balance;
  readonly vestingPeriod: BlockNumber;
  readonly vestingPercent: Balance;
}

/** @name ILOInfo */
export interface ILOInfo extends Struct {
  readonly iloOrganizer: AccountId;
  readonly tokensForIlo: Balance;
  readonly tokensForLiquidity: Balance;
  readonly iloPrice: Balance;
  readonly softCap: Balance;
  readonly hardCap: Balance;
  readonly minContribution: Balance;
  readonly maxContribution: Balance;
  readonly refundType: bool;
  readonly liquidityPercent: Balance;
  readonly listingPrice: Balance;
  readonly lockupDays: u32;
  readonly startBlock: BlockNumber;
  readonly endBlock: BlockNumber;
  readonly contributorsVesting: ContributorsVesting;
  readonly teamVesting: TeamVesting;
  readonly soldTokens: Balance;
  readonly fundsRaised: Balance;
  readonly succeeded: bool;
  readonly failed: bool;
  readonly lpTokens: Balance;
  readonly claimedLpTokens: bool;
  readonly finishBlock: BlockNumber;
}

/** @name TeamVesting */
export interface TeamVesting extends Struct {
  readonly teamVestingTotalTokens: Balance;
  readonly teamVestingFirstReleasePercent: Balance;
  readonly teamVestingPeriod: BlockNumber;
  readonly teamVestingPercent: Balance;
}

export type PHANTOM_CERESLAUNCHPAD = 'ceresLaunchpad';
