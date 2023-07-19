import { FPNumber } from '@sora-substrate/math';

import { LiquiditySourceTypes, Consts, PriceVariant } from '../consts';
import { safeDivide, isAssetAddress, safeQuoteResult } from '../utils';
import { getAveragePrice } from './price';
import { oracleProxyQuote, oracleProxyQuoteUnchecked } from './oracleProxy';

import type { QuotePayload, QuoteResult, PrimaryMarketsEnabledAssets } from '../types';

const ensureBaseAssetAmountWithinLimit = (amount: FPNumber, payload: QuotePayload, checkLimits = true) => {
  if (!checkLimits) return;

  const limit = FPNumber.fromCodecValue(payload.consts.xst.syntheticBaseBuySellLimit);

  if (FPNumber.isGreaterThan(amount, limit)) {
    throw new Error('Input/output amount of synthetic base asset exceeds the limit');
  }
};

const getAggregatedFee = (
  syntheticAssetId: string,
  payload: QuotePayload,
  enabledAssets: PrimaryMarketsEnabledAssets
): FPNumber => {
  const asset = enabledAssets.xst[syntheticAssetId];

  if (!asset) throw new Error(`Synthetic asset "${syntheticAssetId}" does not exist`);

  const { feeRatio, referenceSymbol } = asset;
  const rate = oracleProxyQuoteUnchecked(referenceSymbol, payload);
  const dynamicFee = FPNumber.fromCodecValue(rate?.dynamicFee ?? '0');

  return feeRatio.add(dynamicFee);
};

const xstReferencePrice = (
  assetAddress: string,
  priceVariant: PriceVariant,
  payload: QuotePayload,
  enabledAssets: PrimaryMarketsEnabledAssets
): FPNumber => {
  const referenceAssetId = payload.consts.xst.referenceAsset;
  const syntheticBaseAssetId = Consts.XST;

  // XSTUSD is a special case because it is equal to the reference asset, DAI
  if ([referenceAssetId, Consts.XSTUSD].includes(assetAddress)) {
    return FPNumber.ONE;
  } else if (isAssetAddress(assetAddress, syntheticBaseAssetId)) {
    const averagePrice = getAveragePrice(assetAddress, referenceAssetId, priceVariant, payload);
    const floorPrice = FPNumber.fromCodecValue(payload.consts.xst.floorPrice);

    return FPNumber.max(averagePrice, floorPrice) as FPNumber;
  } else {
    const symbol = enabledAssets.xst[assetAddress].referenceSymbol;
    const rate = oracleProxyQuote(symbol, payload);
    const price = FPNumber.fromCodecValue(rate.value);

    return price;
  }
};

/**
 * Buys the main asset (e.g., XST).
 * Calculates and returns the current buy price, assuming that input is the synthetic asset and output is the main asset.
 */
const xstBuyPrice = (
  syntheticAsset: string,
  amount: FPNumber,
  isDesiredInput: boolean,
  payload: QuotePayload,
  enabledAssets: PrimaryMarketsEnabledAssets
): FPNumber => {
  const mainAssetPrice = xstReferencePrice(Consts.XST, PriceVariant.Buy, payload, enabledAssets);
  const syntheticAssetPrice = xstReferencePrice(syntheticAsset, PriceVariant.Sell, payload, enabledAssets);

  if (isDesiredInput) {
    // Input target amount of synthetic asset (e.g. XSTUSD) to get some synthetic base asset (e.g. XST)
    return safeDivide(amount.mul(syntheticAssetPrice), mainAssetPrice);
  } else {
    // Input some synthetic asset (e.g. XSTUSD) to get a target amount of synthetic base asset (e.g. XST)
    return safeDivide(amount.mul(mainAssetPrice), syntheticAssetPrice);
  }
};

const xstSellPrice = (
  syntheticAsset: string,
  amount: FPNumber,
  isDesiredInput: boolean,
  payload: QuotePayload,
  enabledAssets: PrimaryMarketsEnabledAssets
): FPNumber => {
  const mainAssetPrice = xstReferencePrice(Consts.XST, PriceVariant.Sell, payload, enabledAssets);
  const syntheticAssetPrice = xstReferencePrice(syntheticAsset, PriceVariant.Buy, payload, enabledAssets);

  if (isDesiredInput) {
    // Sell desired amount of synthetic base asset (e.g. XST) for some synthetic asset (e.g. XSTUSD)
    return safeDivide(amount.mul(mainAssetPrice), syntheticAssetPrice);
  } else {
    // Sell some amount of synthetic base asset (e.g. XST) for desired amount of synthetic asset (e.g. XSTUSD)
    return safeDivide(amount.mul(syntheticAssetPrice), mainAssetPrice);
  }
};

const xstBuyPriceWithFee = (
  syntheticAsset: string,
  amount: FPNumber,
  isDesiredInput: boolean,
  payload: QuotePayload,
  enabledAssets: PrimaryMarketsEnabledAssets,
  checkLimits = true // check on XST buy-sell limit (no need for price impact)
): QuoteResult => {
  const feeRatio = getAggregatedFee(syntheticAsset, payload, enabledAssets);

  if (isDesiredInput) {
    const outputAmount = xstBuyPrice(syntheticAsset, amount, isDesiredInput, payload, enabledAssets);
    ensureBaseAssetAmountWithinLimit(outputAmount, payload, checkLimits);
    const feeAmount = feeRatio.mul(outputAmount);
    const output = outputAmount.sub(feeAmount);

    return {
      amount: output,
      fee: feeAmount,
      rewards: [],
      distribution: [
        {
          input: syntheticAsset,
          output: Consts.XST,
          market: LiquiditySourceTypes.XSTPool,
          income: amount,
          outcome: output,
          fee: feeAmount,
        },
      ],
    };
  } else {
    ensureBaseAssetAmountWithinLimit(amount, payload, checkLimits);
    const fpFee = FPNumber.ONE.sub(feeRatio);
    const amountWithFee = safeDivide(amount, fpFee);
    const fee = amountWithFee.sub(amount);
    const input = xstBuyPrice(syntheticAsset, amountWithFee, isDesiredInput, payload, enabledAssets);

    return {
      amount: input,
      fee,
      rewards: [],
      distribution: [
        {
          input: syntheticAsset,
          output: Consts.XST,
          market: LiquiditySourceTypes.XSTPool,
          income: input,
          outcome: amount,
          fee,
        },
      ],
    };
  }
};

const xstSellPriceWithFee = (
  syntheticAsset: string,
  amount: FPNumber,
  isDesiredInput: boolean,
  payload: QuotePayload,
  enabledAssets: PrimaryMarketsEnabledAssets,
  checkLimits = true // check on XST buy-sell limit (no need for price impact)
): QuoteResult => {
  const feeRatio = getAggregatedFee(syntheticAsset, payload, enabledAssets);

  if (isDesiredInput) {
    ensureBaseAssetAmountWithinLimit(amount, payload, checkLimits);
    const fee = amount.mul(feeRatio);
    const output = xstSellPrice(syntheticAsset, amount.sub(fee), isDesiredInput, payload, enabledAssets);

    return {
      amount: output,
      fee,
      rewards: [],
      distribution: [
        {
          input: Consts.XST,
          output: syntheticAsset,
          market: LiquiditySourceTypes.XSTPool,
          income: amount,
          outcome: output,
          fee,
        },
      ],
    };
  } else {
    const inputAmount = xstSellPrice(syntheticAsset, amount, isDesiredInput, payload, enabledAssets);
    ensureBaseAssetAmountWithinLimit(inputAmount, payload, checkLimits);
    const inputAmountWithFee = safeDivide(inputAmount, FPNumber.ONE.sub(feeRatio));
    const fee = inputAmountWithFee.sub(inputAmount);

    return {
      amount: inputAmountWithFee,
      fee,
      rewards: [],
      distribution: [
        {
          input: Consts.XST,
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
  syntheticAsset: string,
  payload: QuotePayload,
  enabledAssets: PrimaryMarketsEnabledAssets
): FPNumber => {
  const basePriceWrtRef = xstReferencePrice(Consts.XST, PriceVariant.Buy, payload, enabledAssets);
  const syntheticPricePerReferenceUnit = xstReferencePrice(syntheticAsset, PriceVariant.Sell, payload, enabledAssets);

  return safeDivide(basePriceWrtRef, syntheticPricePerReferenceUnit);
};

export const xstSellPriceNoVolume = (
  syntheticAsset: string,
  payload: QuotePayload,
  enabledAssets: PrimaryMarketsEnabledAssets
): FPNumber => {
  const basePriceWrtRef = xstReferencePrice(Consts.XST, PriceVariant.Sell, payload, enabledAssets);
  const syntheticPricePerReferenceUnit = xstReferencePrice(syntheticAsset, PriceVariant.Buy, payload, enabledAssets);

  return safeDivide(basePriceWrtRef, syntheticPricePerReferenceUnit);
};

export const xstQuoteWithoutImpact = (
  inputAsset: string,
  outputAsset: string,
  amount: FPNumber,
  isDesiredInput: boolean,
  payload: QuotePayload,
  enabledAssets: PrimaryMarketsEnabledAssets
): FPNumber => {
  try {
    // no impact already
    const quoteResult = xstQuote(inputAsset, outputAsset, amount, isDesiredInput, payload, enabledAssets, false);

    return quoteResult.amount;
  } catch (error) {
    return FPNumber.ZERO;
  }
};

export const xstQuote = (
  inputAsset: string,
  outputAsset: string,
  amount: FPNumber,
  isDesiredInput: boolean,
  payload: QuotePayload,
  enabledAssets: PrimaryMarketsEnabledAssets,
  checkLimits = true // check on XST buy-sell limit (no need for price impact)
): QuoteResult => {
  try {
    const {
      amount: resultAmount,
      fee: feeAmount,
      rewards,
      distribution,
    } = isAssetAddress(inputAsset, Consts.XST)
      ? xstSellPriceWithFee(outputAsset, amount, isDesiredInput, payload, enabledAssets, checkLimits)
      : xstBuyPriceWithFee(inputAsset, amount, isDesiredInput, payload, enabledAssets, checkLimits);
    // `fee_amount` is always computed to be in `main_asset_id`, which is
    // `SyntheticBaseAssetId` (e.g. XST), but `SwapOutcome` assumes XOR
    // (`BaseAssetId`), so we convert.
    const outputToBase = getAveragePrice(
      Consts.XST,
      Consts.XOR,
      // Since `Sell` is more expensive in case if we are selling XST
      // (x XST -> y XOR; y XOR -> x' XST, x' < x),
      // it seems logical to show this amount in order
      // to not accidentally lie about the price.
      PriceVariant.Sell,
      payload
    );
    const fee = feeAmount.mul(outputToBase);

    return { amount: resultAmount, fee, rewards, distribution };
  } catch (error) {
    return safeQuoteResult(inputAsset, outputAsset, amount, LiquiditySourceTypes.XSTPool);
  }
};
