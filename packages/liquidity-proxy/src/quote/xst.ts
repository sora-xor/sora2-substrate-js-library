import { FPNumber } from '@sora-substrate/math';

import { LiquiditySourceTypes, Consts, PriceVariant } from '../consts';
import { safeDivide, isAssetAddress, safeQuoteResult } from '../utils';

import type { QuotePayload, QuoteResult } from '../types';

const xstReferencePrice = (assetAddress: string, payload: QuotePayload, priceVariant: PriceVariant): FPNumber => {
  if ([Consts.DAI, Consts.XSTUSD].includes(assetAddress)) {
    return FPNumber.ONE;
  } else {
    const avgPrice = FPNumber.fromCodecValue(payload.prices[assetAddress][priceVariant]);

    if (isAssetAddress(assetAddress, Consts.XST)) {
      const floorPrice = FPNumber.fromCodecValue(payload.consts.xst.floorPrice);

      return FPNumber.max(avgPrice, floorPrice) as FPNumber;
    }

    return avgPrice;
  }
};

/**
 * Buys the main asset (e.g., XST).
 * Calculates and returns the current buy price, assuming that input is the synthetic asset and output is the main asset.
 */
const xstBuyPrice = (amount: FPNumber, isDesiredInput: boolean, payload: QuotePayload): FPNumber => {
  const mainAssetPricePerReferenceUnit = xstReferencePrice(Consts.XST, payload, PriceVariant.Buy);

  if (isDesiredInput) {
    // Input target amount of XST(USD) to get some XST
    return safeDivide(amount, mainAssetPricePerReferenceUnit);
  } else {
    // Input some XST(USD) to get a target amount of XST
    return amount.mul(mainAssetPricePerReferenceUnit);
  }
};

const xstSellPrice = (amount: FPNumber, isDesiredInput: boolean, payload: QuotePayload): FPNumber => {
  const mainAssetPricePerReferenceUnit = xstReferencePrice(Consts.XST, payload, PriceVariant.Sell);

  if (isDesiredInput) {
    // Sell desired amount of XST for some XST(USD)
    return amount.mul(mainAssetPricePerReferenceUnit);
  } else {
    // Sell some amount of XST for desired amount of XST(USD)
    return safeDivide(amount, mainAssetPricePerReferenceUnit);
  }
};

const xstBuyPriceWithFee = (amount: FPNumber, isDesiredInput: boolean, payload: QuotePayload): QuoteResult => {
  if (isDesiredInput) {
    const outputAmount = xstBuyPrice(amount, isDesiredInput, payload);
    const feeAmount = Consts.XST_FEE.mul(outputAmount);
    const output = outputAmount.sub(feeAmount);

    return {
      amount: output,
      fee: feeAmount,
      rewards: [],
      distribution: [
        {
          market: LiquiditySourceTypes.XSTPool,
          amount,
        },
      ],
    };
  } else {
    const fpFee = FPNumber.ONE.sub(Consts.XST_FEE);
    const amountWithFee = safeDivide(amount, fpFee);
    const input = xstBuyPrice(amountWithFee, isDesiredInput, payload);

    return {
      amount: input,
      fee: amountWithFee.sub(amount),
      rewards: [],
      distribution: [
        {
          market: LiquiditySourceTypes.XSTPool,
          amount,
        },
      ],
    };
  }
};

const xstSellPriceWithFee = (amount: FPNumber, isDesiredInput: boolean, payload: QuotePayload): QuoteResult => {
  if (isDesiredInput) {
    const feeAmount = amount.mul(Consts.XST_FEE);
    const output = xstSellPrice(amount.sub(feeAmount), isDesiredInput, payload);

    return {
      amount: output,
      fee: feeAmount,
      rewards: [],
      distribution: [
        {
          market: LiquiditySourceTypes.XSTPool,
          amount,
        },
      ],
    };
  } else {
    const inputAmount = xstSellPrice(amount, isDesiredInput, payload);
    const inputAmountWithFee = safeDivide(inputAmount, FPNumber.ONE.sub(Consts.XST_FEE));

    return {
      amount: inputAmountWithFee,
      fee: inputAmountWithFee.sub(inputAmount),
      rewards: [],
      distribution: [
        {
          market: LiquiditySourceTypes.XSTPool,
          amount,
        },
      ],
    };
  }
};

export const xstBuyPriceNoVolume = (syntheticAsset: string, payload: QuotePayload): FPNumber => {
  const basePriceWrtRef = xstReferencePrice(Consts.XST, payload, PriceVariant.Buy);
  const syntheticPricePerReferenceUnit = xstReferencePrice(syntheticAsset, payload, PriceVariant.Sell);

  return safeDivide(basePriceWrtRef, syntheticPricePerReferenceUnit);
};

export const xstSellPriceNoVolume = (syntheticAsset: string, payload: QuotePayload): FPNumber => {
  const basePriceWrtRef = xstReferencePrice(Consts.XST, payload, PriceVariant.Sell);
  const syntheticPricePerReferenceUnit = xstReferencePrice(syntheticAsset, payload, PriceVariant.Buy);

  return safeDivide(basePriceWrtRef, syntheticPricePerReferenceUnit);
};

export const xstQuoteWithoutImpact = (
  inputAsset: string,
  amount: FPNumber,
  isDesiredInput: boolean,
  payload: QuotePayload
): FPNumber => {
  try {
    // no impact already
    const quoteResult = xstQuote(inputAsset, amount, isDesiredInput, payload);

    return quoteResult.amount;
  } catch (error) {
    return FPNumber.ZERO;
  }
};

export const xstQuote = (
  inputAsset: string,
  amount: FPNumber,
  isDesiredInput: boolean,
  payload: QuotePayload
): QuoteResult => {
  try {
    if (isAssetAddress(inputAsset, Consts.XST)) {
      return xstSellPriceWithFee(amount, isDesiredInput, payload);
    } else {
      return xstBuyPriceWithFee(amount, isDesiredInput, payload);
    }
  } catch (error) {
    return safeQuoteResult(amount, LiquiditySourceTypes.XSTPool);
  }
};
