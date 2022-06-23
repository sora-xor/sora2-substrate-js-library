// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Struct, bool, u32 } from '@polkadot/types-codec';
import type { Balance, BlockNumber } from '@sora-substrate/types/interfaces/runtime';

/** @name PollInfo */
export interface PollInfo extends Struct {
  readonly numberOfOptions: u32;
  readonly pollStartBlock: BlockNumber;
  readonly pollEndBlock: BlockNumber;
}

/** @name VotingInfo */
export interface VotingInfo extends Struct {
  readonly votingOption: u32;
  readonly numberOfVotes: Balance;
  readonly ceresWithdrawn: bool;
}

export type PHANTOM_CERESGOVERNANCEPLATFORM = 'ceresGovernancePlatform';
