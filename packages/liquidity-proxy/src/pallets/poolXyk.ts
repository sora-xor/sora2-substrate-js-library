import { FPNumber } from '@sora-substrate/math';

import { LiquiditySourceTypes, Consts, Errors } from '../consts';
import { safeDivide, toFp, isAssetAddress, safeQuoteResult, isLessThanOrEqualToZero } from '../utils';
import { SwapChunk } from '../common/primitives';

import type { QuotePayload, QuoteSingleResult } from '../types';

// can_exchange
export const xykCanExchange = (
  baseAssetId: string,
  _syntheticBaseAssetId: string,
  inputAssetId: string,
  outputAssetId: string,
  payload: QuotePayload
): boolean => {
  if (![inputAssetId, outputAssetId].includes(baseAssetId)) return false;

  const isBaseAssetInput = isAssetAddress(inputAssetId, baseAssetId);
  const nonBaseAsset = isBaseAssetInput ? outputAssetId : inputAssetId;
  const reserves = [...payload.reserves.xyk[nonBaseAsset]];

  return reserves.every((tokenReserve) => !!Number(tokenReserve));
};

// step_quote
export const xykStepQuote = (
  baseAssetId: string,
  _syntheticBaseAssetId: string,
  inputAsset: string,
  outputAsset: string,
  amount: FPNumber,
  isDesiredInput: boolean,
  payload: QuotePayload,
  deduceFee: boolean,
  recommendedSamplesCount: number
): Array<SwapChunk> => {
  const chunks = [];

  if (amount.isZero) {
    return chunks;
  }
  // Get actual pool reserves.
  const [reserveInput, reserveOutput] = getXykReserves(inputAsset, outputAsset, payload, baseAssetId);

  // Check reserves validity.
  if (isLessThanOrEqualToZero(reserveInput) || isLessThanOrEqualToZero(reserveOutput)) {
    throw new Error(Errors.PoolIsEmpty);
  }

  let step = safeDivide(amount, new FPNumber(recommendedSamplesCount));
  let subSum = FPNumber.ZERO;
  let subFee = FPNumber.ZERO;

  if (isDesiredInput) {
    for (let i = 1; i <= recommendedSamplesCount; i++) {
      let volume = step.mul(new FPNumber(i));

      const { amount: calculated, fee } = calcOutputForExactInput(
        baseAssetId,
        inputAsset,
        outputAsset,
        reserveInput,
        reserveOutput,
        volume,
        deduceFee
      );

      let output = calculated.sub(subSum);
      let feeChunk = fee.sub(subFee);
      subSum = calculated;
      subFee = fee;
      chunks.push(new SwapChunk(step, output, feeChunk));
    }
  } else {
    for (let i = 1; i <= recommendedSamplesCount; i++) {
      let volume = step.mul(new FPNumber(i));

      const { amount: calculated, fee } = calcInputForExactOutput(
        baseAssetId,
        inputAsset,
        outputAsset,
        reserveInput,
        reserveOutput,
        volume,
        deduceFee
      );

      let input = calculated.sub(subSum);
      let feeChunk = fee.sub(subFee);
      subSum = calculated;
      subFee = fee;
      chunks.push(new SwapChunk(input, step, feeChunk));
    }
  }

  return chunks;
};

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
const xykQuoteA = (
  input: string,
  output: string,
  x: FPNumber,
  y: FPNumber,
  xIn: FPNumber,
  deduceFee: boolean
): QuoteSingleResult => {
  const feeRatio = deduceFee ? Consts.XYK_FEE : FPNumber.ZERO;
  const fee = xIn.mul(feeRatio);
  const x1 = xIn.sub(fee);
  const yOut = safeDivide(x1.mul(y), x.add(x1));

  return {
    amount: yOut,
    fee,
    distribution: [
      {
        source: LiquiditySourceTypes.XYKPool,
        input,
        output,
        income: xIn,
        outcome: yOut,
        fee,
      },
    ],
  };
};

/**
 * Output token is dex base asset, user indicates desired input amount
 * @param x - other token reserve
 * @param y - base asset reserve
 * @param xIn - desired input amount (other token)
 * @returns QuoteSingleResult
 */
const xykQuoteB = (
  input: string,
  output: string,
  x: FPNumber,
  y: FPNumber,
  xIn: FPNumber,
  deduceFee: boolean
): QuoteSingleResult => {
  const feeRatio = deduceFee ? Consts.XYK_FEE : FPNumber.ZERO;
  const y1 = safeDivide(xIn.mul(y), x.add(xIn));
  const yOut = y1.mul(FPNumber.ONE.sub(feeRatio));
  const fee = y1.sub(yOut);

  return {
    amount: yOut,
    fee,
    distribution: [
      {
        source: LiquiditySourceTypes.XYKPool,
        input,
        output,
        income: xIn,
        outcome: yOut,
        fee,
      },
    ],
  };
};

/**
 * Input token is dex base asset, user indicates desired output amount
 * @param x - base asset reserve
 * @param y - other token reserve
 * @param yOut - desired output amount (other token)
 * @returns QuoteSingleResult
 */
const xykQuoteC = (
  input: string,
  output: string,
  x: FPNumber,
  y: FPNumber,
  yOut: FPNumber,
  deduceFee: boolean
): QuoteSingleResult => {
  if (FPNumber.isGreaterThanOrEqualTo(yOut, y)) {
    throw new Error(
      `[liquidityProxy] xykQuote: output amount ${yOut.toString()} is larger than reserves ${y.toString()}. `
    );
  }

  const feeRatio = deduceFee ? Consts.XYK_FEE : FPNumber.ZERO;
  const x1 = safeDivide(x.mul(yOut), y.sub(yOut));
  const xIn = safeDivide(x1, FPNumber.ONE.sub(feeRatio));
  const fee = xIn.sub(x1);

  return {
    amount: xIn,
    fee,
    distribution: [
      {
        source: LiquiditySourceTypes.XYKPool,
        input,
        output,
        income: xIn,
        outcome: yOut,
        fee,
      },
    ],
  };
};

/**
 * Output token is dex base asset, user indicates desired output amount
 * @param x - other token reserve
 * @param y - base asset reserve
 * @param yOut - desired output amount (base asset)
 * @returns QuoteSingleResult
 */
const xykQuoteD = (
  input: string,
  output: string,
  x: FPNumber,
  y: FPNumber,
  yOut: FPNumber,
  deduceFee: boolean
): QuoteSingleResult => {
  const feeRatio = deduceFee ? Consts.XYK_FEE : FPNumber.ZERO;
  const y1 = safeDivide(yOut, FPNumber.ONE.sub(feeRatio));

  if (FPNumber.isGreaterThanOrEqualTo(y1, y)) {
    throw new Error(
      `[liquidityProxy] xykQuote: output amount ${y1.toString()} is larger than reserves ${y.toString()}.`
    );
  }

  const xIn = safeDivide(x.mul(y1), y.sub(y1));
  const fee = y1.sub(yOut);

  return {
    amount: xIn,
    fee,
    distribution: [
      {
        source: LiquiditySourceTypes.XYKPool,
        input,
        output,
        income: xIn,
        outcome: yOut,
        fee,
      },
    ],
  };
};

const calcOutputForExactInput = (
  baseAssetId: string,
  inputAsset: string,
  outputAsset: string,
  inputReserves: FPNumber,
  outputReserves: FPNumber,
  amount: FPNumber,
  deduceFee: boolean
) => {
  return isAssetAddress(inputAsset, baseAssetId)
    ? xykQuoteA(inputAsset, outputAsset, inputReserves, outputReserves, amount, deduceFee)
    : xykQuoteB(inputAsset, outputAsset, inputReserves, outputReserves, amount, deduceFee);
};

const calcInputForExactOutput = (
  baseAssetId: string,
  inputAsset: string,
  outputAsset: string,
  inputReserves: FPNumber,
  outputReserves: FPNumber,
  amount: FPNumber,
  deduceFee: boolean
) => {
  return isAssetAddress(inputAsset, baseAssetId)
    ? xykQuoteC(inputAsset, outputAsset, inputReserves, outputReserves, amount, deduceFee)
    : xykQuoteD(inputAsset, outputAsset, inputReserves, outputReserves, amount, deduceFee);
};

export const xykQuote = (
  baseAssetId: string,
  _syntheticBaseAssetId: string,
  inputAsset: string,
  outputAsset: string,
  amount: FPNumber,
  isDesiredInput: boolean,
  payload: QuotePayload,
  deduceFee: boolean
): QuoteSingleResult => {
  try {
    const [inputReserves, outputReserves] = getXykReserves(inputAsset, outputAsset, payload, baseAssetId);
    return isDesiredInput
      ? calcOutputForExactInput(baseAssetId, inputAsset, outputAsset, inputReserves, outputReserves, amount, deduceFee)
      : calcInputForExactOutput(baseAssetId, inputAsset, outputAsset, inputReserves, outputReserves, amount, deduceFee);
  } catch (error) {
    return safeQuoteResult(inputAsset, outputAsset, amount, LiquiditySourceTypes.XYKPool);
  }
};

export const xykQuoteWithoutImpact = (
  baseAssetId: string,
  _syntheticBaseAssetId: string,
  inputAsset: string,
  outputAsset: string,
  amount: FPNumber,
  isDesiredInput: boolean,
  payload: QuotePayload,
  deduceFee: boolean
): FPNumber => {
  try {
    const [inputReserves, outputReserves] = getXykReserves(inputAsset, outputAsset, payload, baseAssetId);
    const isBaseAssetInput = isAssetAddress(inputAsset, baseAssetId);
    const feeRatio = deduceFee ? Consts.XYK_FEE : FPNumber.ZERO;

    if (isDesiredInput) {
      if (isBaseAssetInput) {
        const amountWithoutFee = amount.mul(FPNumber.ONE.sub(feeRatio));

        return safeDivide(amountWithoutFee.mul(outputReserves), inputReserves);
      } else {
        const amountWithFee = safeDivide(amount.mul(outputReserves), inputReserves);

        return amountWithFee.mul(FPNumber.ONE.sub(feeRatio));
      }
    } else {
      if (isBaseAssetInput) {
        const amountWithoutFee = safeDivide(amount.mul(inputReserves), outputReserves);

        return safeDivide(amountWithoutFee, FPNumber.ONE.sub(feeRatio));
      } else {
        const amountWithFee = safeDivide(amount, FPNumber.ONE.sub(feeRatio));

        return safeDivide(amountWithFee.mul(inputReserves), outputReserves);
      }
    }
  } catch (error) {
    return FPNumber.ZERO;
  }
};

// check_rewards
export const xykCheckRewards = (
  _baseAssetId: string,
  _syntheticBaseAssetId: string,
  _inputAsset: string,
  _outputAsset: string,
  _inputAmount: FPNumber,
  _outputAmount: FPNumber,
  _payload: QuotePayload
) => {
  // XYK Pool has no rewards currently
  return [];
};
