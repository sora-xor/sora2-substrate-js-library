import { CodecString } from './fp'
import { LPRewardsInfo } from './rewards'

export enum LiquiditySourceTypes {
  Default = '',
  XYKPool = 'XYKPool',
  MulticollateralBondingCurvePool = 'MulticollateralBondingCurvePool'
}

export interface SwapResult {
  amount: CodecString;
  fee: CodecString;
  rewards: Array<LPRewardsInfo>;
  amountWithoutImpact: CodecString;
}
