// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Struct } from '@polkadot/types-codec';
import type { AssetId, Balance, BlockNumber } from '@sora-substrate/types/interfaces/runtime';

/** @name TokenLockInfo */
export interface TokenLockInfo extends Struct {
  readonly tokens: Balance;
  readonly unlockingBlock: BlockNumber;
  readonly assetId: AssetId;
}

export type PHANTOM_CERESTOKENLOCKER = 'ceresTokenLocker';
