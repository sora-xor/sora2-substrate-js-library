import { FPNumber, CodecString } from '@sora-substrate/math';

import { LiquiditySourceTypes, AssetType, Consts } from './consts';

import type { QuoteResult } from './types';

// UTILS
export const toFp = (item: CodecString): FPNumber => FPNumber.fromCodecValue(item);
export const getMaxPositive = (value: FPNumber) => FPNumber.max(value, FPNumber.ZERO);
export const isAssetAddress = (a: string, b: string) => a === b;
export const isXorAsset = (asset: string, dexBaseAsset = Consts.XOR) => isAssetAddress(asset, dexBaseAsset);
export const matchType =
  (iType: AssetType, oType: AssetType) =>
  (a: AssetType, b: AssetType, bidirect = false) => {
    return (iType === a && oType === b) || (bidirect && iType === b && oType === a);
  };
export const isBetter = (isDesiredInput: boolean, amountA: FPNumber, amountB: FPNumber): boolean => {
  if (isDesiredInput) {
    return FPNumber.isGreaterThan(amountA, amountB);
  } else {
    return amountA.isGtZero() && (amountB.isZero() || FPNumber.isLessThan(amountA, amountB));
  }
};
export const extremum = (isDesiredInput: boolean): FPNumber => {
  if (isDesiredInput) {
    return FPNumber.ZERO;
  } else {
    return Consts.MAX;
  }
};
export const intersection = <T>(a: T[], b: T[]): T[] => {
  return a.filter((item) => b.includes(item));
};
export const safeDivide = (value: FPNumber, divider: FPNumber): FPNumber => {
  if (divider.isZero() || divider.isNaN()) {
    throw new Error(`[liquidityProxy] Division error: ${value.toString()} / ${divider.toString()}`);
  } else {
    return value.div(divider);
  }
};
export const safeQuoteResult = (
  inputAsset: string,
  outputAsset: string,
  amount: FPNumber,
  market: LiquiditySourceTypes
): QuoteResult => {
  return {
    amount: FPNumber.ZERO,
    fee: FPNumber.ZERO,
    rewards: [],
    distribution: [
      {
        input: inputAsset,
        output: outputAsset,
        market,
        income: amount,
        outcome: FPNumber.ZERO,
        fee: FPNumber.ZERO,
      },
    ],
  };
};
