// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Struct, bool, u32 } from '@polkadot/types-codec';
import type { AccountId, AssetId, Balance } from '@sora-substrate/types/interfaces/runtime';

/** @name PoolData */
export interface PoolData extends Struct {
  readonly multiplier: u32;
  readonly deposit_fee: Balance;
  readonly is_core: bool;
  readonly is_farm: bool;
  readonly total_tokens_in_pool: Balance;
  readonly rewards: Balance;
  readonly rewards_to_be_distributed: Balance;
  readonly is_removed: bool;
}

/** @name TokenInfo */
export interface TokenInfo extends Struct {
  readonly farms_total_multiplier: u32;
  readonly staking_total_multiplier: u32;
  readonly token_per_block: Balance;
  readonly farms_allocation: Balance;
  readonly staking_allocation: Balance;
  readonly team_allocation: Balance;
  readonly team_account: AccountId;
}

/** @name UserInfo */
export interface UserInfo extends Struct {
  readonly pool_asset: AssetId;
  readonly reward_asset: AssetId;
  readonly is_farm: bool;
  readonly pooled_tokens: Balance;
  readonly rewards: Balance;
}

export type PHANTOM_DEMETERFARMINGPLATFORM = 'demeterFarmingPlatform';
