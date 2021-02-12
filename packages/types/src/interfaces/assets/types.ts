// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import { Struct } from '@polkadot/types/codec';
import { Text, bool, u8 } from '@polkadot/types/primitive';
import { AssetId, Balance } from '@sora-substrate/types/interfaces/runtime';

/** @name AssetInfo */
export interface AssetInfo extends Struct {
  readonly asset_id: AssetId;
  readonly symbol: AssetSymbolStr;
  readonly precision: u8;
  readonly is_mintable: bool;
}

/** @name AssetSymbolStr */
export interface AssetSymbolStr extends Text {}

/** @name BalanceInfo */
export interface BalanceInfo extends Struct {
  readonly balance: Balance;
}

export type PHANTOM_ASSETS = 'assets';
