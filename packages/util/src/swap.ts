import { CodecString } from './fp'

export enum LiquiditySourceTypes {
  XYK = 'XYKPool',
  TBC = 'MulticollateralBondingCurvePool'
}

export interface SwapResult {
  amount: CodecString;
  fee: CodecString;
}
