// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Struct, bool, u32 } from '@polkadot/types';
import type { Balance, Moment } from '@sora-substrate/types/interfaces/runtime';

/** @name PollInfo */
export interface PollInfo extends Struct {
  readonly number_of_options: u32;
  readonly poll_start_timestamp: Moment;
  readonly poll_end_timestamp: Moment;
}

/** @name VotingInfo */
export interface VotingInfo extends Struct {
  readonly voting_option: u32;
  readonly number_of_votes: Balance;
  readonly ceres_withdrawn: bool;
}

export type PHANTOM_CERESGOVERNANCEPLATFORM = 'ceresGovernancePlatform';
