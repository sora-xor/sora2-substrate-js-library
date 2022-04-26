// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Struct, Text } from '@polkadot/types';
import type { Balance } from '@sora-substrate/types/interfaces/runtime';

/** @name BalanceInfo */
export interface BalanceInfo extends Struct {
  readonly balance: Balance;
}

/** @name CrowdloanLease */
export interface CrowdloanLease extends Struct {
  readonly start_block: Text;
  readonly total_days: Text;
  readonly blocks_per_day: Text;
}

export type PHANTOM_VESTEDREWARDS = 'vestedRewards';
