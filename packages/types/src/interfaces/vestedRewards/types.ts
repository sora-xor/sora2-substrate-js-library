// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Struct, Text } from '@polkadot/types-codec';

/** @name CrowdloanLease */
export interface CrowdloanLease extends Struct {
  readonly start_block: Text;
  readonly total_days: Text;
  readonly blocks_per_day: Text;
}

export type PHANTOM_VESTEDREWARDS = 'vestedRewards';
