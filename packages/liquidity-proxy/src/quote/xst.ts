import { FPNumber } from '@sora-substrate/math';

import { LiquiditySourceTypes, Consts, Errors, PriceVariant } from '../consts';
import { safeDivide, isAssetAddress, safeQuoteResult, isGreaterThanZero, toFp } from '../utils';
import { getAveragePrice } from './price';
import { oracleProxyQuoteUnchecked } from './oracleProxy';
import { SwapChunk } from '../common/primitives';

import type { QuotePayload, QuoteResult } from '../types';

const canExchange = (
  baseAssetId: string,
  syntheticBaseAssetId: string,
  inputAssetId: string,
  outputAssetId: string,
  payload: QuotePayload
): boolean => {
  if (!isAssetAddress(baseAssetId, Consts.XOR)) return false;

  if (isAssetAddress(inputAssetId, syntheticBaseAssetId)) {
    return outputAssetId in payload.enabledAssets.xst;
  } else if (isAssetAddress(outputAssetId, syntheticBaseAssetId)) {
    return inputAssetId in payload.enabledAssets.xst;
  } else {
    return false;
  }
};

export const xstStepQuote = (
  baseAssetId: string,
  syntheticBaseAssetId: string,
  inputAsset: string,
  outputAsset: string,
  amount: FPNumber,
  isDesiredInput: boolean,
  payload: QuotePayload,
  deduceFee: boolean,
  recommendedSamplesCount: number
): Array<SwapChunk> => {
  if (!canExchange(baseAssetId, syntheticBaseAssetId, inputAsset, outputAsset, payload)) {
    throw new Error(Errors.CantExchange);
  }

  if (amount.isZero) {
    return [];
  }

  const limit = toFp(payload.consts.xst.syntheticBaseBuySellLimit);

  // Get the price without checking the limit, because even if it exceeds the limit it will be rounded below.
  // It is necessary to use as much liquidity from the source as we can.
  const { amount: resultAmount, fee } = isAssetAddress(inputAsset, syntheticBaseAssetId)
    ? xstDecideSellAmounts(syntheticBaseAssetId, outputAsset, amount, isDesiredInput, payload, deduceFee)
    : xstDecideBuyAmounts(syntheticBaseAssetId, inputAsset, amount, isDesiredInput, payload, deduceFee);

  const [inputAmount, outputAmount] = isDesiredInput ? [amount, resultAmount] : [resultAmount, amount];
  const feeAmount = deduceFee ? convertFee(baseAssetId, syntheticBaseAssetId, fee, payload) : fee;

  let monolith = new SwapChunk(inputAmount, outputAmount, feeAmount);

  // If amount exceeds the limit, it is necessary to round the amount to the limit.
  if (isAssetAddress(inputAsset, syntheticBaseAssetId)) {
    if (FPNumber.isGreaterThan(inputAmount, limit)) {
      monolith = monolith.rescaleByInput(limit);
    }
  } else {
    if (FPNumber.isGreaterThan(outputAmount, limit)) {
      monolith = monolith.rescaleByOutput(limit);
    }
  }

  const ratio = safeDivide(FPNumber.ONE, new FPNumber(recommendedSamplesCount));
  const chunk = monolith.rescaleByRatio(ratio);

  return new Array(recommendedSamplesCount).fill(chunk);
};

const ensureBaseAssetAmountWithinLimit = (amount: FPNumber, payload: QuotePayload, checkLimits = true) => {
  if (!checkLimits) return;

  const limit = toFp(payload.consts.xst.syntheticBaseBuySellLimit);

  if (FPNumber.isGreaterThan(amount, limit)) {
    throw new Error(Errors.SyntheticBaseBuySellLimitExceeded);
  }
};

const getAggregatedFee = (syntheticAssetId: string, payload: QuotePayload): FPNumber => {
  const asset = payload.enabledAssets.xst[syntheticAssetId];

  if (!asset) throw new Error(Errors.SyntheticDoesNotExist);

  const { feeRatio, referenceSymbol } = asset;
  const rate = oracleProxyQuoteUnchecked(referenceSymbol, payload);
  const dynamicFeeRatio = toFp(rate?.dynamicFee ?? '0');
  const resultingFeeRatio = feeRatio.add(dynamicFeeRatio);

  if (!FPNumber.isLessThan(resultingFeeRatio, FPNumber.ONE)) throw new Error(Errors.InvalidFeeRatio);

  return resultingFeeRatio;
};

// Used for converting XST fee to XOR
const convertFee = (
  baseAssetId: string,
  syntheticBaseAssetId: string,
  feeAmount: FPNumber,
  payload: QuotePayload
): FPNumber => {
  const outputToBase = getAveragePrice(
    syntheticBaseAssetId,
    baseAssetId,
    // Since `Buy` is more expensive in case if we are buying XOR
    // (x XST -> y XOR; y XOR -> x' XST, x' < x),
    // it seems logical to show this amount in order
    // to not accidentally lie about the price.
    PriceVariant.Buy,
    payload
  );
  const fee = feeAmount.mul(outputToBase);

  return fee;
};

const xstReferencePrice = (
  syntheticBaseAssetId: string,
  assetAddress: string,
  priceVariant: PriceVariant,
  payload: QuotePayload
): FPNumber => {
  const referenceAssetId = payload.consts.xst.referenceAsset;

  // XSTUSD is a special case because it is equal to the reference asset, DAI
  if ([referenceAssetId, Consts.XSTUSD].includes(assetAddress)) {
    return FPNumber.ONE;
  } else if (isAssetAddress(assetAddress, syntheticBaseAssetId)) {
    const averagePrice = getAveragePrice(assetAddress, referenceAssetId, priceVariant, payload);
    const floorPrice = toFp(payload.consts.xst.floorPrice);

    return FPNumber.max(averagePrice, floorPrice) as FPNumber;
  } else {
    const symbol = payload.enabledAssets.xst[assetAddress].referenceSymbol;
    const rate = oracleProxyQuoteUnchecked(symbol, payload);
    const price = toFp(rate.value);

    return price;
  }
};

/**
 * Buys the main asset (e.g., XST).
 * Calculates and returns the current buy price, assuming that input is the synthetic asset and output is the main asset.
 */
const xstBuyPrice = (
  syntheticBaseAssetId: string,
  syntheticAsset: string,
  amount: FPNumber,
  isDesiredInput: boolean,
  payload: QuotePayload
): FPNumber => {
  const mainAssetPrice = xstReferencePrice(syntheticBaseAssetId, syntheticBaseAssetId, PriceVariant.Buy, payload);
  const syntheticAssetPrice = xstReferencePrice(syntheticBaseAssetId, syntheticAsset, PriceVariant.Sell, payload);

  if (isDesiredInput) {
    // Input target amount of synthetic asset (e.g. XSTUSD) to get some synthetic base asset (e.g. XST)
    return safeDivide(amount.mul(syntheticAssetPrice), mainAssetPrice);
  } else {
    // Input some synthetic asset (e.g. XSTUSD) to get a target amount of synthetic base asset (e.g. XST)
    return safeDivide(amount.mul(mainAssetPrice), syntheticAssetPrice);
  }
};

const xstSellPrice = (
  syntheticBaseAssetId: string,
  syntheticAsset: string,
  amount: FPNumber,
  isDesiredInput: boolean,
  payload: QuotePayload
): FPNumber => {
  const mainAssetPrice = xstReferencePrice(syntheticBaseAssetId, syntheticBaseAssetId, PriceVariant.Sell, payload);
  const syntheticAssetPrice = xstReferencePrice(syntheticBaseAssetId, syntheticAsset, PriceVariant.Buy, payload);

  if (isDesiredInput) {
    // Sell desired amount of synthetic base asset (e.g. XST) for some synthetic asset (e.g. XSTUSD)
    return safeDivide(amount.mul(mainAssetPrice), syntheticAssetPrice);
  } else {
    // Sell some amount of synthetic base asset (e.g. XST) for desired amount of synthetic asset (e.g. XSTUSD)
    return safeDivide(amount.mul(syntheticAssetPrice), mainAssetPrice);
  }
};

const xstDecideBuyAmounts = (
  syntheticBaseAssetId: string,
  syntheticAsset: string,
  amount: FPNumber,
  isDesiredInput: boolean,
  payload: QuotePayload,
  deduceFee: boolean,
  checkLimits = true // check on XST buy-sell limit (no need for price impact)
): QuoteResult => {
  if (!isGreaterThanZero(amount)) throw new Error(Errors.PriceCalculationFailed);

  const feeRatio = deduceFee ? getAggregatedFee(syntheticAsset, payload) : FPNumber.ZERO;

  if (isDesiredInput) {
    const outputAmount = xstBuyPrice(syntheticBaseAssetId, syntheticAsset, amount, isDesiredInput, payload);
    const fee = feeRatio.mul(outputAmount);
    const output = outputAmount.sub(fee);
    ensureBaseAssetAmountWithinLimit(output, payload, checkLimits);

    return {
      amount: output,
      fee,
      rewards: [],
      distribution: [
        {
          input: syntheticAsset,
          output: syntheticBaseAssetId,
          market: LiquiditySourceTypes.XSTPool,
          income: amount,
          outcome: output,
          fee,
        },
      ],
    };
  } else {
    ensureBaseAssetAmountWithinLimit(amount, payload, checkLimits);
    const amountWithFee = safeDivide(amount, FPNumber.ONE.sub(feeRatio));
    const fee = amountWithFee.sub(amount);
    const input = xstBuyPrice(syntheticBaseAssetId, syntheticAsset, amountWithFee, isDesiredInput, payload);

    return {
      amount: input,
      fee,
      rewards: [],
      distribution: [
        {
          input: syntheticAsset,
          output: syntheticBaseAssetId,
          market: LiquiditySourceTypes.XSTPool,
          income: input,
          outcome: amount,
          fee,
        },
      ],
    };
  }
};

const xstDecideSellAmounts = (
  syntheticBaseAssetId: string,
  syntheticAsset: string,
  amount: FPNumber,
  isDesiredInput: boolean,
  payload: QuotePayload,
  deduceFee: boolean,
  checkLimits = true // check on XST buy-sell limit (no need for price impact)
): QuoteResult => {
  if (!isGreaterThanZero(amount)) throw new Error(Errors.PriceCalculationFailed);

  const feeRatio = deduceFee ? getAggregatedFee(syntheticAsset, payload) : FPNumber.ZERO;

  if (isDesiredInput) {
    ensureBaseAssetAmountWithinLimit(amount, payload, checkLimits);
    const fee = amount.mul(feeRatio);
    const output = xstSellPrice(syntheticBaseAssetId, syntheticAsset, amount.sub(fee), isDesiredInput, payload);

    return {
      amount: output,
      fee,
      rewards: [],
      distribution: [
        {
          input: syntheticBaseAssetId,
          output: syntheticAsset,
          market: LiquiditySourceTypes.XSTPool,
          income: amount,
          outcome: output,
          fee,
        },
      ],
    };
  } else {
    const inputAmount = xstSellPrice(syntheticBaseAssetId, syntheticAsset, amount, isDesiredInput, payload);
    const inputAmountWithFee = safeDivide(inputAmount, FPNumber.ONE.sub(feeRatio));
    const fee = inputAmountWithFee.sub(inputAmount);
    ensureBaseAssetAmountWithinLimit(inputAmountWithFee, payload, checkLimits);

    return {
      amount: inputAmountWithFee,
      fee,
      rewards: [],
      distribution: [
        {
          input: syntheticBaseAssetId,
          output: syntheticAsset,
          market: LiquiditySourceTypes.XSTPool,
          income: inputAmountWithFee,
          outcome: amount,
          fee,
        },
      ],
    };
  }
};

export const xstBuyPriceNoVolume = (
  syntheticBaseAssetId: string,
  syntheticAsset: string,
  payload: QuotePayload
): FPNumber => {
  const basePriceWrtRef = xstReferencePrice(syntheticBaseAssetId, syntheticBaseAssetId, PriceVariant.Buy, payload);
  const syntheticPricePerReferenceUnit = xstReferencePrice(
    syntheticBaseAssetId,
    syntheticAsset,
    PriceVariant.Sell,
    payload
  );

  return safeDivide(basePriceWrtRef, syntheticPricePerReferenceUnit);
};

export const xstSellPriceNoVolume = (
  syntheticBaseAssetId: string,
  syntheticAsset: string,
  payload: QuotePayload
): FPNumber => {
  const basePriceWrtRef = xstReferencePrice(syntheticBaseAssetId, syntheticBaseAssetId, PriceVariant.Sell, payload);
  const syntheticPricePerReferenceUnit = xstReferencePrice(
    syntheticBaseAssetId,
    syntheticAsset,
    PriceVariant.Buy,
    payload
  );

  return safeDivide(basePriceWrtRef, syntheticPricePerReferenceUnit);
};

export const xstQuoteWithoutImpact = (
  baseAssetId: string,
  syntheticBaseAssetId: string,
  inputAsset: string,
  outputAsset: string,
  amount: FPNumber,
  isDesiredInput: boolean,
  payload: QuotePayload,
  deduceFee: boolean
): FPNumber => {
  try {
    // no impact already
    const quoteResult = xstQuote(
      baseAssetId,
      syntheticBaseAssetId,
      inputAsset,
      outputAsset,
      amount,
      isDesiredInput,
      payload,
      deduceFee,
      false
    );

    return quoteResult.amount;
  } catch (error) {
    return FPNumber.ZERO;
  }
};

export const xstQuote = (
  baseAssetId: string,
  syntheticBaseAssetId: string,
  inputAsset: string,
  outputAsset: string,
  amount: FPNumber,
  isDesiredInput: boolean,
  payload: QuotePayload,
  deduceFee: boolean,
  checkLimits = true // check on XST buy-sell limit (no need for price impact)
): QuoteResult => {
  try {
    if (!canExchange(baseAssetId, syntheticBaseAssetId, inputAsset, outputAsset, payload)) {
      throw new Error(Errors.CantExchange);
    }

    const {
      amount: resultAmount,
      fee: feeAmount,
      rewards,
      distribution,
    } = isAssetAddress(inputAsset, syntheticBaseAssetId)
      ? xstDecideSellAmounts(syntheticBaseAssetId, outputAsset, amount, isDesiredInput, payload, deduceFee, checkLimits)
      : xstDecideBuyAmounts(syntheticBaseAssetId, inputAsset, amount, isDesiredInput, payload, deduceFee, checkLimits);
    const fee = convertFee(baseAssetId, syntheticBaseAssetId, feeAmount, payload);

    return { amount: resultAmount, fee, rewards, distribution };
  } catch (error) {
    return safeQuoteResult(inputAsset, outputAsset, amount, LiquiditySourceTypes.XSTPool);
  }
};
