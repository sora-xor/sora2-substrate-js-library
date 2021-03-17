// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Null, Struct, Text, bool, u8 } from '@polkadot/types';
import type { AssetId, Balance } from '@sora-substrate/types/interfaces/runtime';

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

/** @name TupleB */
export interface TupleB extends Null {}

export type PHANTOM_ASSETS = 'assets';
