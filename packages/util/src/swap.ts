import type { CodecString } from './fp'
import type { LPRewardsInfo } from './rewards'

export enum LiquiditySourceTypes {
  Default = '',
  XYKPool = 'XYKPool',
  XSTPool = 'XSTPool',
  MulticollateralBondingCurvePool = 'MulticollateralBondingCurvePool'
}

export type PrimaryMarketsEnabledAssets = {
  [key: string]: Array<string>
};

export interface SwapResult {
  amount: CodecString;
  fee: CodecString;
  rewards: Array<LPRewardsInfo>;
  amountWithoutImpact: CodecString;
}
