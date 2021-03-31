import { CodecString } from './fp'

export enum LiquiditySourceTypes {
  Default = '',
  XYKPool = 'XYKPool',
  MulticollateralBondingCurvePool = 'MulticollateralBondingCurvePool'
}

export interface SwapResult {
  amount: CodecString;
  fee: CodecString;
}
