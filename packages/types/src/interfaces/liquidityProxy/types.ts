// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Struct, Vec } from '@polkadot/types-codec';
import type { AssetId, Balance, DEXId, LiquiditySourceType, RewardReason } from '@sora-substrate/types/interfaces/runtime';

/** @name LiquiditySourceIdOf */
export interface LiquiditySourceIdOf extends Struct {
  readonly dex_id: DEXId;
  readonly liquidity_source_index: LiquiditySourceType;
}

/** @name LPRewardsInfo */
export interface LPRewardsInfo extends Struct {
  readonly amount: Balance;
  readonly currency: AssetId;
  readonly reason: RewardReason;
}

/** @name LPSwapOutcomeInfo */
export interface LPSwapOutcomeInfo extends Struct {
  readonly amount: Balance;
  readonly fee: Balance;
  readonly rewards: Vec<LPRewardsInfo>;
  readonly amount_without_impact: Balance;
}

export type PHANTOM_LIQUIDITYPROXY = 'liquidityProxy';
