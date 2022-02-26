// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Struct } from '@polkadot/types';
import type { AssetId, Balance, BlockNumber } from '@sora-substrate/types/interfaces/runtime';

/** @name TokenLockInfo */
export interface TokenLockInfo extends Struct {
  readonly tokens: Balance;
  readonly unlocking_block: BlockNumber;
  readonly asset_id: AssetId;
}

export type PHANTOM_CERESTOKENLOCKER = 'ceresTokenLocker';
