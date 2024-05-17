import { FPNumber } from '@sora-substrate/math';

import { LiquiditySourceTypes, Consts, Errors } from '../consts';
import { safeDivide, toFp, isAssetAddress, safeQuoteResult } from '../utils';
import { SwapChunk, DiscreteQuotation } from '../common/primitives';

import type { QuotePayload, QuoteResult } from '../types';

// can_exchange
export const canExchange = (
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
export const stepQuote = (
  baseAssetId: string,
  _syntheticBaseAssetId: string,
  inputAsset: string,
  outputAsset: string,
  amount: FPNumber,
  isDesiredInput: boolean,
  payload: QuotePayload,
  deduceFee: boolean,
  recommendedSamplesCount: number
): DiscreteQuotation => {
  const quotation = new DiscreteQuotation();

  if (amount.isZero()) {
    return quotation;
  }

  const samplesCount = recommendedSamplesCount < 1 ? 1 : recommendedSamplesCount;

  // Get actual pool reserves.
  const [reserveInput, reserveOutput] = getXykReserves(inputAsset, outputAsset, payload, baseAssetId);

  // Check reserves validity.
  if (
    FPNumber.isLessThanOrEqualTo(reserveInput, FPNumber.ZERO) ||
    FPNumber.isLessThanOrEqualTo(reserveOutput, FPNumber.ZERO)
  ) {
    throw new Error(Errors.PoolIsEmpty);
  }

  const commonStep = safeDivide(amount, new FPNumber(samplesCount));
  // volume & step
  const volumes: [FPNumber, FPNumber][] = [];

  let remaining = amount;

  for (let i = 1; i < samplesCount; i++) {
    const volume = commonStep.mul(new FPNumber(i));

    volumes.push([volume, commonStep]);

    remaining = remaining.sub(commonStep);
  }
  volumes.push([amount, remaining]);

  let subSum = FPNumber.ZERO;
  let subFee = FPNumber.ZERO;

  if (isDesiredInput) {
    for (const [volume, step] of volumes) {
      const { amount: calculated, fee } = calcOutputForExactInput(
        baseAssetId,
        inputAsset,
        outputAsset,
        reserveInput,
        reserveOutput,
        volume,
        deduceFee
      );

      const output = calculated.sub(subSum);
      const feeChunk = fee.sub(subFee);
      subSum = calculated;
      subFee = fee;
      quotation.chunks.push(new SwapChunk(step, output, feeChunk));
    }
  } else {
    for (const [volume, step] of volumes) {
      const { amount: calculated, fee } = calcInputForExactOutput(
        baseAssetId,
        inputAsset,
        outputAsset,
        reserveInput,
        reserveOutput,
        volume,
        deduceFee
      );

      const input = calculated.sub(subSum);
      const feeChunk = fee.sub(subFee);
      subSum = calculated;
      subFee = fee;
      quotation.chunks.push(new SwapChunk(input, step, feeChunk));
    }
  }

  return quotation;
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
  // "reverse" method is fine here cuz we don't use reserves below so that mutation won't affect anything
  const [input, output] = isBaseAssetInput ? reserves : reserves.reverse(); // NOSONAR

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
): QuoteResult => {
  const feeRatio = deduceFee ? Consts.XYK_FEE : FPNumber.ZERO;
  const fee = xIn.mul(feeRatio);
  const x1 = xIn.sub(fee);
  const yOut = safeDivide(x1.mul(y), x.add(x1));

  return {
    amount: yOut,
    fee,
    rewards: [],
    distribution: [
      {
        input,
        output,
        market: LiquiditySourceTypes.XYKPool,
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
 * @returns QuoteResult
 */
const xykQuoteB = (
  input: string,
  output: string,
  x: FPNumber,
  y: FPNumber,
  xIn: FPNumber,
  deduceFee: boolean
): QuoteResult => {
  const feeRatio = deduceFee ? Consts.XYK_FEE : FPNumber.ZERO;
  const y1 = safeDivide(xIn.mul(y), x.add(xIn));
  const yOut = y1.mul(FPNumber.ONE.sub(feeRatio));
  const fee = y1.sub(yOut);

  return {
    amount: yOut,
    fee,
    rewards: [],
    distribution: [
      {
        input,
        output,
        market: LiquiditySourceTypes.XYKPool,
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
 * @returns QuoteResult
 */
const xykQuoteC = (
  input: string,
  output: string,
  x: FPNumber,
  y: FPNumber,
  yOut: FPNumber,
  deduceFee: boolean
): QuoteResult => {
  if (FPNumber.isGreaterThanOrEqualTo(yOut, y)) {
    throw new Error(
      `[liquidityProxy] xykQuote: output amount ${yOut.toString()} is larger than reserves ${y.toString()}. `
    );
  }

  const feeRatio = deduceFee ? Consts.XYK_FEE : FPNumber.ZERO;
  const fxwYout = yOut.add(FPNumber.fromCodecValue(1)); // by 1 correction to overestimate required input
  const nominator = x.mul(fxwYout);
  const denominator = y.sub(fxwYout);
  const xInWithoutFee = safeDivide(nominator, denominator);
  const xIn = safeDivide(xInWithoutFee, FPNumber.ONE.sub(feeRatio));
  const fee = xIn.sub(xInWithoutFee);

  return {
    amount: xIn,
    fee,
    rewards: [],
    distribution: [
      {
        input,
        output,
        market: LiquiditySourceTypes.XYKPool,
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
 * @returns QuoteResult
 */
const xykQuoteD = (
  input: string,
  output: string,
  x: FPNumber,
  y: FPNumber,
  yOut: FPNumber,
  deduceFee: boolean
): QuoteResult => {
  const feeRatio = deduceFee ? Consts.XYK_FEE : FPNumber.ZERO;
  const fxwYout = yOut.add(FPNumber.fromCodecValue(1)); // by 1 correction to overestimate required input
  const y1 = safeDivide(fxwYout, FPNumber.ONE.sub(feeRatio));

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
    rewards: [],
    distribution: [
      {
        input,
        output,
        market: LiquiditySourceTypes.XYKPool,
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

export const quote = (
  baseAssetId: string,
  _syntheticBaseAssetId: string,
  inputAsset: string,
  outputAsset: string,
  amount: FPNumber,
  isDesiredInput: boolean,
  payload: QuotePayload,
  deduceFee: boolean
): QuoteResult => {
  try {
    if (!canExchange(baseAssetId, _syntheticBaseAssetId, inputAsset, outputAsset, payload)) {
      throw new Error(Errors.CantExchange);
    }

    const [inputReserves, outputReserves] = getXykReserves(inputAsset, outputAsset, payload, baseAssetId);

    return isDesiredInput
      ? calcOutputForExactInput(baseAssetId, inputAsset, outputAsset, inputReserves, outputReserves, amount, deduceFee)
      : calcInputForExactOutput(baseAssetId, inputAsset, outputAsset, inputReserves, outputReserves, amount, deduceFee);
  } catch (error) {
    return safeQuoteResult(inputAsset, outputAsset, amount, LiquiditySourceTypes.XYKPool);
  }
};

export const quoteWithoutImpact = (
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
      // prettier-ignore
      if (isBaseAssetInput) { // NOSONAR
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
export const checkRewards = (
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
