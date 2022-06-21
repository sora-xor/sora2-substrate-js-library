// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Struct } from '@polkadot/types-codec';
import type { AssetId, Balance, BlockNumber } from '@sora-substrate/types/interfaces/runtime';

/** @name LockInfo */
export interface LockInfo extends Struct {
  readonly pool_tokens: Balance;
  readonly unlocking_block: BlockNumber;
  readonly asset_a: AssetId;
  readonly asset_b: AssetId;
}

export type PHANTOM_CERESLIQUIDITYLOCKER = 'ceresLiquidityLocker';
