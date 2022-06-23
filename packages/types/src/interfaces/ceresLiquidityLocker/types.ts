// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Struct } from '@polkadot/types-codec';
import type { AssetId, Balance, BlockNumber } from '@sora-substrate/types/interfaces/runtime';

/** @name LockInfo */
export interface LockInfo extends Struct {
  readonly poolTokens: Balance;
  readonly unlockingBlock: BlockNumber;
  readonly assetA: AssetId;
  readonly assetB: AssetId;
}

export type PHANTOM_CERESLIQUIDITYLOCKER = 'ceresLiquidityLocker';
