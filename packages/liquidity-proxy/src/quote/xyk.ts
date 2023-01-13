import { FPNumber } from '@sora-substrate/math';

import { LiquiditySourceTypes, Consts } from '../consts';
import { safeDivide, toFp, isAssetAddress, safeQuoteResult } from '../utils';

import type { QuotePayload, QuoteResult } from '../types';

// returs reserves by order: inputAssetId, outputAssetId
export const getXykReserves = (
  inputAsset: string,
  outputAsset: string,
  payload: QuotePayload,
  baseAssetId = Consts.XOR
): [FPNumber, FPNumber] => {
  const isBaseAssetInput = isAssetAddress(inputAsset, baseAssetId);
  const nonBaseAsset = isBaseAssetInput ? outputAsset : inputAsset;
  const reserves = [...payload.reserves.xyk[nonBaseAsset]];
  const [input, output] = isBaseAssetInput ? reserves : reserves.reverse();

  return [toFp(input), toFp(output)];
};

/**
 * Input token is dex base asset (xor), user indicates desired input amount
 * @param x - base asset reserve
 * @param y - other token reserve
 * @param xIn x_in - desired input amount (base asset)
 * @returns QuoteResult
 */
const xykQuoteA = (x: FPNumber, y: FPNumber, xIn: FPNumber): QuoteResult => {
  const x1 = xIn.mul(FPNumber.ONE.sub(Consts.XYK_FEE));
  const yOut = safeDivide(x1.mul(y), x.add(x1));

  return {
    amount: yOut,
    fee: xIn.mul(Consts.XYK_FEE),
    rewards: [],
    distribution: [
      {
        market: LiquiditySourceTypes.XYKPool,
        amount: xIn,
      },
    ],
  };
};

/**
 * Output token is dex base asset, user indicates desired input amount
 * @param x - other token reserve
 * @param y - base asset reserve
 * @param xIn - desired input amount (other token)
 * @returns QuoteResult
 */
const xykQuoteB = (x: FPNumber, y: FPNumber, xIn: FPNumber): QuoteResult => {
  const y1 = safeDivide(xIn.mul(y), x.add(xIn));
  const yOut = y1.mul(FPNumber.ONE.sub(Consts.XYK_FEE));

  return {
    amount: yOut,
    fee: y1.sub(yOut),
    rewards: [],
    distribution: [
      {
        market: LiquiditySourceTypes.XYKPool,
        amount: xIn,
      },
    ],
  };
};

/**
 * Input token is dex base asset, user indicates desired output amount
 * @param x - base asset reserve
 * @param y - other token reserve
 * @param yOut - desired output amount (other token)
 * @returns QuoteResult
 */
const xykQuoteC = (x: FPNumber, y: FPNumber, yOut: FPNumber): QuoteResult => {
  if (FPNumber.isGreaterThanOrEqualTo(yOut, y)) {
    throw new Error(
      `[liquidityProxy] xykQuote: output amount ${yOut.toString()} is larger than reserves ${y.toString()}. `
    );
  }

  const x1 = safeDivide(x.mul(yOut), y.sub(yOut));
  const xIn = safeDivide(x1, FPNumber.ONE.sub(Consts.XYK_FEE));

  return {
    amount: xIn,
    fee: xIn.sub(x1),
    rewards: [],
    distribution: [
      {
        market: LiquiditySourceTypes.XYKPool,
        amount: yOut,
      },
    ],
  };
};

/**
 * Output token is dex base asset, user indicates desired output amount
 * @param x - other token reserve
 * @param y - base asset reserve
 * @param yOut - desired output amount (base asset)
 * @returns QuoteResult
 */
const xykQuoteD = (x: FPNumber, y: FPNumber, yOut: FPNumber): QuoteResult => {
  const y1 = safeDivide(yOut, FPNumber.ONE.sub(Consts.XYK_FEE));

  if (FPNumber.isGreaterThanOrEqualTo(y1, y)) {
    throw new Error(
      `[liquidityProxy] xykQuote: output amount ${y1.toString()} is larger than reserves ${y.toString()}.`
    );
  }

  const xIn = safeDivide(x.mul(y1), y.sub(y1));

  return {
    amount: xIn,
    fee: y1.sub(yOut),
    rewards: [],
    distribution: [
      {
        market: LiquiditySourceTypes.XYKPool,
        amount: yOut,
      },
    ],
  };
};

export const xykQuote = (
  inputReserves: FPNumber,
  outputReserves: FPNumber,
  amount: FPNumber,
  isDesiredInput: boolean,
  isBaseAssetInput: boolean
): QuoteResult => {
  try {
    if (isDesiredInput) {
      if (isBaseAssetInput) {
        return xykQuoteA(inputReserves, outputReserves, amount);
      } else {
        return xykQuoteB(inputReserves, outputReserves, amount);
      }
    } else {
      if (isBaseAssetInput) {
        return xykQuoteC(inputReserves, outputReserves, amount);
      } else {
        return xykQuoteD(inputReserves, outputReserves, amount);
      }
    }
  } catch (error) {
    return safeQuoteResult(amount, LiquiditySourceTypes.XYKPool);
  }
};

export const xykQuoteWithoutImpact = (
  inputReserves: FPNumber,
  outputReserves: FPNumber,
  amount: FPNumber,
  isDesiredInput: boolean,
  isBaseAssetInput: boolean
): FPNumber => {
  try {
    if (isDesiredInput) {
      if (isBaseAssetInput) {
        const amountWithoutFee = amount.mul(FPNumber.ONE.sub(Consts.XYK_FEE));

        return safeDivide(amountWithoutFee.mul(outputReserves), inputReserves);
      } else {
        const amountWithFee = safeDivide(amount.mul(outputReserves), inputReserves);

        return amountWithFee.mul(FPNumber.ONE.sub(Consts.XYK_FEE));
      }
    } else {
      if (isBaseAssetInput) {
        const amountWithoutFee = safeDivide(amount.mul(inputReserves), outputReserves);

        return safeDivide(amountWithoutFee, FPNumber.ONE.sub(Consts.XYK_FEE));
      } else {
        const amountWithFee = safeDivide(amount, FPNumber.ONE.sub(Consts.XYK_FEE));

        return safeDivide(amountWithFee.mul(inputReserves), outputReserves);
      }
    }
  } catch (error) {
    return FPNumber.ZERO;
  }
};
