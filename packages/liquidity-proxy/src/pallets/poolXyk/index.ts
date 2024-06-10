import { FPNumber } from '@sora-substrate/math';

import { LiquiditySourceTypes, Consts, Errors, SwapVariant } from '../../consts';
import { safeDivide, toFp, isAssetAddress, safeQuoteResult, saturatingSub } from '../../utils';
import { SwapChunk, DiscreteQuotation, SideAmount } from '../../common/primitives';

import { getPairInfo, getTradingPair } from './utils';

import type { QuotePayload, QuoteResult } from '../../types';

// get_actual_reserves
// returs reserves by order: [inputAssetId, outputAssetId]
export const getActualReserves = (
  baseAssetId: string,
  inputAssetId: string,
  outputAssetId: string,
  payload: QuotePayload
) => {
  const [tpair, _baseChameleonAssetId, _isChameleonPool] = getPairInfo(baseAssetId, inputAssetId, outputAssetId);

  const [reserveBase, reserveTarget] = [...payload.reserves.xyk[tpair.targetAssetId]];

  // This code is not needed for lib, because "poolXyk.reserves" call returns reserves sum for "chameleon" pool

  // let reserve_base = if let Some(base_chameleon_asset_id) = base_chameleon_asset_id {
  //   if is_chameleon_pool {
  //       let reserve_chameleon = <T as Config>::AssetInfoProvider::free_balance(
  //           &base_chameleon_asset_id,
  //           &pool_acc_id,
  //       )?;
  //       reserve_base
  //           .checked_add(reserve_chameleon)
  //           .ok_or(Error::<T>::PoolTokenSupplyOverflow)?
  //   } else {
  //       reserve_base
  //   }
  // } else {
  //     reserve_base
  // };

  if (tpair.targetAssetId === inputAssetId) {
    return [toFp(reserveTarget), toFp(reserveBase)];
  } else {
    return [toFp(reserveBase), toFp(reserveTarget)];
  }
};

// can_exchange
export const canExchange = (
  baseAssetId: string,
  _syntheticBaseAssetId: string,
  inputAssetId: string,
  outputAssetId: string,
  payload: QuotePayload
): boolean => {
  try {
    const tPair = getTradingPair(baseAssetId, inputAssetId, outputAssetId);

    const reserves = [...payload.reserves.xyk[tPair.targetAssetId]];

    return reserves.every((tokenReserve) => !!Number(tokenReserve));
  } catch {
    return false;
  }
};

// decide_is_fee_from_destination
const decideIsFeeFromDestination = (baseAssetId: string, assetA: string, assetB: string) => {
  const tPair = getTradingPair(baseAssetId, assetA, assetB);

  if (tPair.targetAssetId === assetA) {
    return true;
  } else if (tPair.targetAssetId === assetB) {
    return false;
  } else {
    throw new Error(Errors.UnavailableExchangePath);
  }
};

// calc_max_output
const calcMaxOutput = (getFeeFromDestination: boolean, reserveOutput: FPNumber, deduceFee: boolean) => {
  if (reserveOutput.isZero()) return FPNumber.ZERO;

  const maxOutput =
    getFeeFromDestination && deduceFee ? reserveOutput.mul(FPNumber.ONE.sub(Consts.XYK_FEE)) : reserveOutput;

  // // reduce by `IrreducibleReserve` percent, because (reserve - output) must be > 0
  return saturatingSub(maxOutput, Consts.IrreducibleReserve.mul(maxOutput));
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
  const [reserveInput, reserveOutput] = getActualReserves(baseAssetId, inputAsset, outputAsset, payload);

  // Check reserves validity.
  if (
    FPNumber.isLessThanOrEqualTo(reserveInput, FPNumber.ZERO) ||
    FPNumber.isLessThanOrEqualTo(reserveOutput, FPNumber.ZERO)
  ) {
    return quotation;
  }

  const getFeeFromDestination = decideIsFeeFromDestination(baseAssetId, inputAsset, outputAsset);

  amount = (() => {
    if (isDesiredInput) {
      return amount;
    } else {
      const maxOutput = calcMaxOutput(getFeeFromDestination, reserveOutput, deduceFee);

      quotation.limits.maxAmount = new SideAmount(maxOutput, SwapVariant.WithDesiredOutput);

      return maxOutput.min(amount);
    }
  })();

  const commonStep = safeDivide(amount, new FPNumber(samplesCount));
  // volume & step
  const volumes: [FPNumber, FPNumber][] = [];

  let remaining = amount;

  for (let i = 1; i < samplesCount; i++) {
    const volume = commonStep.mul(new FPNumber(i));

    volumes.push([volume, commonStep]);

    remaining = saturatingSub(remaining, commonStep);
  }
  volumes.push([amount, remaining]);

  let subSum = FPNumber.ZERO;
  let subFee = FPNumber.ZERO;

  if (isDesiredInput) {
    for (const [volume, step] of volumes) {
      const { amount: calculated, fee } = calcOutputForExactInput(
        getFeeFromDestination,
        inputAsset,
        outputAsset,
        reserveInput,
        reserveOutput,
        volume,
        deduceFee
      );

      const output = saturatingSub(calculated, subSum);
      const feeChunk = saturatingSub(fee, subFee);
      subSum = calculated;
      subFee = fee;
      quotation.chunks.push(new SwapChunk(step, output, feeChunk));
    }
  } else {
    for (const [volume, step] of volumes) {
      const { amount: calculated, fee } = calcInputForExactOutput(
        getFeeFromDestination,
        inputAsset,
        outputAsset,
        reserveInput,
        reserveOutput,
        volume,
        deduceFee
      );

      const input = saturatingSub(calculated, subSum);
      const feeChunk = saturatingSub(fee, subFee);
      subSum = calculated;
      subFee = fee;
      quotation.chunks.push(new SwapChunk(input, step, feeChunk));
    }
  }

  return quotation;
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
  const xInWithoutFee = deduceFee ? xIn.mul(FPNumber.ONE.sub(Consts.XYK_FEE)) : xIn;
  const nominator = xInWithoutFee.mul(y);
  const denominator = x.add(xInWithoutFee);
  const yOut = safeDivide(nominator, denominator);
  const fee = xIn.sub(xInWithoutFee);

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
  const nominator = xIn.mul(y);
  const denominator = x.add(xIn);
  const yOutWithFee = safeDivide(nominator, denominator);
  const yOut = deduceFee ? yOutWithFee.mul(FPNumber.ONE.sub(Consts.XYK_FEE)) : yOutWithFee;
  const fee = yOutWithFee.sub(yOut);

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

  const fxwYout = yOut.add(Consts.MIN); // by 1 correction to overestimate required input
  const nominator = x.mul(fxwYout);
  const denominator = y.sub(fxwYout);
  const xInWithoutFee = safeDivide(nominator, denominator);
  const xIn = deduceFee ? safeDivide(xInWithoutFee, FPNumber.ONE.sub(Consts.XYK_FEE)) : xInWithoutFee;
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
  const fxwYout = yOut.add(Consts.MIN); // by 1 correction to overestimate required input
  const yOutWithFee = deduceFee ? safeDivide(fxwYout, FPNumber.ONE.sub(Consts.XYK_FEE)) : fxwYout;

  if (FPNumber.isGreaterThanOrEqualTo(yOutWithFee, y)) {
    throw new Error(
      `[liquidityProxy] xykQuote: output amount ${yOutWithFee.toString()} is larger than reserves ${y.toString()}.`
    );
  }

  const nominator = x.mul(yOutWithFee);
  const denominator = y.sub(yOutWithFee);
  const xIn = safeDivide(nominator, denominator);
  const fee = yOutWithFee.sub(fxwYout);

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

// calc_output_for_exact_input
const calcOutputForExactInput = (
  getFeeFromDestination: boolean,
  inputAsset: string,
  outputAsset: string,
  inputReserves: FPNumber,
  outputReserves: FPNumber,
  amount: FPNumber,
  deduceFee: boolean
) => {
  if (getFeeFromDestination) {
    return xykQuoteB(inputAsset, outputAsset, inputReserves, outputReserves, amount, deduceFee);
  } else {
    return xykQuoteA(inputAsset, outputAsset, inputReserves, outputReserves, amount, deduceFee);
  }
};

// calc_input_for_exact_output
const calcInputForExactOutput = (
  getFeeFromDestination: boolean,
  inputAsset: string,
  outputAsset: string,
  inputReserves: FPNumber,
  outputReserves: FPNumber,
  amount: FPNumber,
  deduceFee: boolean
) => {
  if (getFeeFromDestination) {
    return xykQuoteD(inputAsset, outputAsset, inputReserves, outputReserves, amount, deduceFee);
  } else {
    return xykQuoteC(inputAsset, outputAsset, inputReserves, outputReserves, amount, deduceFee);
  }
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

    const [inputReserves, outputReserves] = getActualReserves(baseAssetId, inputAsset, outputAsset, payload);
    const getFeeFromDestination = decideIsFeeFromDestination(baseAssetId, inputAsset, outputAsset);

    return isDesiredInput
      ? calcOutputForExactInput(
          getFeeFromDestination,
          inputAsset,
          outputAsset,
          inputReserves,
          outputReserves,
          amount,
          deduceFee
        )
      : calcInputForExactOutput(
          getFeeFromDestination,
          inputAsset,
          outputAsset,
          inputReserves,
          outputReserves,
          amount,
          deduceFee
        );
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
    const [inputReserves, outputReserves] = getActualReserves(baseAssetId, inputAsset, outputAsset, payload);
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
