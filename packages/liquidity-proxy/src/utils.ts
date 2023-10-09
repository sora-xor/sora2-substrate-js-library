import { FPNumber, CodecString } from '@sora-substrate/math';

import { LiquiditySourceTypes, AssetType } from './consts';

import type { QuoteSingleResult } from './types';

// UTILS
export const toFp = (item: CodecString): FPNumber => FPNumber.fromCodecValue(item);
export const getMaxPositive = (value: FPNumber) => FPNumber.max(value, FPNumber.ZERO);
export const isGreaterThanZero = (value: FPNumber) => FPNumber.isGreaterThan(value, FPNumber.ZERO);
export const isLessThanOrEqualToZero = (value: FPNumber) => FPNumber.isLessThanOrEqualTo(value, FPNumber.ZERO);
export const isAssetAddress = (a: string, b: string) => a === b;

export const matchType =
  (iType: AssetType, oType: AssetType) =>
  (a: AssetType, b: AssetType, bidirect = false) => {
    return (iType === a && oType === b) || (bidirect && iType === b && oType === a);
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
  source: LiquiditySourceTypes
): QuoteSingleResult => {
  return {
    amount: FPNumber.ZERO,
    fee: FPNumber.ZERO,
    distribution: [
      {
        input: inputAsset,
        output: outputAsset,
        source,
        income: amount,
        outcome: FPNumber.ZERO,
        fee: FPNumber.ZERO,
      },
    ],
  };
};
