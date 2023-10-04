import { FPNumber } from '@sora-substrate/math';

import { LiquiditySourceTypes, Consts, Errors, PriceVariant, RewardReason } from '../consts';
import { safeDivide, getMaxPositive, safeQuoteResult, isAssetAddress, toFp } from '../utils';
import { getAveragePrice } from './price';
import { SwapChunk } from '../common/primitives';

import type { QuotePayload, QuoteResult, LPRewardsInfo } from '../types';

// can_exchange
const canExchange = (
  baseAssetId: string,
  inputAssetId: string,
  outputAssetId: string,
  payload: QuotePayload
): boolean => {
  if (baseAssetId !== Consts.XOR) return false;

  if (isAssetAddress(inputAssetId, baseAssetId)) {
    return payload.enabledAssets.tbc.includes(outputAssetId);
  } else if (isAssetAddress(outputAssetId, baseAssetId)) {
    return payload.enabledAssets.tbc.includes(inputAssetId);
  } else {
    return false;
  }
};

// step_quote
export const tbcStepQuote = (
  baseAssetId: string,
  inputAsset: string,
  outputAsset: string,
  amount: FPNumber,
  isDesiredInput: boolean,
  payload: QuotePayload,
  deduceFee: boolean,
  recommendedSamplesCount: number
): Array<SwapChunk> => {
  if (!canExchange(baseAssetId, inputAsset, outputAsset, payload)) {
    throw new Error(Errors.CantExchange);
  }

  const chunks = [];

  if (amount.isZero()) {
    return chunks;
  }

  let step = safeDivide(amount, new FPNumber(recommendedSamplesCount));
  let subIn = FPNumber.ZERO;
  let subOut = FPNumber.ZERO;
  let subFee = FPNumber.ZERO;

  for (let i = 1; i <= recommendedSamplesCount; i++) {
    let volume = step.mul(new FPNumber(i));

    const { amount, fee } = isAssetAddress(inputAsset, baseAssetId)
      ? tbcDecideSellAmounts(inputAsset, outputAsset, volume, isDesiredInput, payload, deduceFee)
      : tbcDecideBuyAmounts(outputAsset, inputAsset, volume, isDesiredInput, payload, deduceFee);

    const [inputAmount, outputAmount] = isDesiredInput ? [volume, amount] : [amount, volume];
    const feeAmount = fee;

    const inputChunk = inputAmount.sub(subIn);
    const outputChunk = outputAmount.sub(subOut);
    const feeChunk = feeAmount.sub(subFee);

    subIn = inputAmount;
    subOut = outputAmount;
    subFee = feeAmount;

    chunks.push(new SwapChunk(inputChunk, outputChunk, feeChunk));
  }

  return chunks;
};

// reference_price
const tbcReferencePrice = (assetAddress: string, priceVariant: PriceVariant, payload: QuotePayload): FPNumber => {
  const referenceAssetId = payload.consts.tbc.referenceAsset;
  // always treat TBCD as being worth $1
  if ([referenceAssetId, Consts.TBCD].includes(assetAddress)) {
    return FPNumber.ONE;
  } else {
    return getAveragePrice(assetAddress, referenceAssetId, priceVariant, payload);
  }
};

// actual_reserves_reference_price
const actualReservesReferencePrice = (
  collateralAsset: string,
  payload: QuotePayload,
  priceVariant: PriceVariant
): FPNumber => {
  const reserve = toFp(payload.reserves.tbc[collateralAsset]);
  const price = tbcReferencePrice(collateralAsset, priceVariant, payload);

  return reserve.mul(price);
};

// ideal_reserves_reference_price
const idealReservesReferencePrice = (
  mainAssetId: string,
  collateralAssetId: string,
  priceVariant: PriceVariant,
  delta: FPNumber,
  payload: QuotePayload
): FPNumber => {
  const baseTotalSupply = toFp(payload.issuances[mainAssetId]);
  const initialPrice = toFp(payload.consts.tbc.initialPrice);
  const currentState = tbcBuyFunction(mainAssetId, collateralAssetId, priceVariant, delta, payload);

  return safeDivide(initialPrice.add(currentState), new FPNumber(2)).mul(baseTotalSupply.add(delta));
};

// map_collateralized_fraction_to_penalty
const mapCollateralizedFractionToPenalty = (fraction: FPNumber): FPNumber => {
  if (FPNumber.isLessThan(fraction, new FPNumber(0.05))) {
    return new FPNumber(0.09);
  } else if (
    FPNumber.isGreaterThanOrEqualTo(fraction, new FPNumber(0.05)) &&
    FPNumber.isLessThan(fraction, new FPNumber(0.1))
  ) {
    return new FPNumber(0.06);
  } else if (
    FPNumber.isGreaterThanOrEqualTo(fraction, new FPNumber(0.1)) &&
    FPNumber.isLessThan(fraction, new FPNumber(0.2))
  ) {
    return new FPNumber(0.03);
  } else if (
    FPNumber.isGreaterThanOrEqualTo(fraction, new FPNumber(0.2)) &&
    FPNumber.isLessThan(fraction, new FPNumber(0.3))
  ) {
    return new FPNumber(0.01);
  } else {
    return FPNumber.ZERO;
  }
};

// sell_penalty
const sellPenalty = (mainAssetId: string, collateralAssetId: string, payload: QuotePayload): FPNumber => {
  const idealReservesPrice = idealReservesReferencePrice(
    mainAssetId,
    collateralAssetId,
    PriceVariant.Sell,
    FPNumber.ZERO,
    payload
  );
  const collateralReservesPrice = actualReservesReferencePrice(collateralAssetId, payload, PriceVariant.Sell);

  if (collateralReservesPrice.isZero()) {
    throw new Error(Errors.NotEnoughReserves);
  }

  const collateralizedFraction = safeDivide(collateralReservesPrice, idealReservesPrice);
  const penalty = mapCollateralizedFractionToPenalty(collateralizedFraction);

  return penalty;
};

// check_rewards
const checkRewards = (
  mainAssetId: string,
  collateralAssetId: string,
  xorAmount: FPNumber,
  payload: QuotePayload
): Array<LPRewardsInfo> => {
  if ([Consts.PSWAP, Consts.VAL, Consts.XST, Consts.TBCD].includes(collateralAssetId)) {
    return [];
  }

  const idealBefore = idealReservesReferencePrice(
    mainAssetId,
    collateralAssetId,
    PriceVariant.Buy,
    FPNumber.ZERO,
    payload
  );
  const idealAfter = idealReservesReferencePrice(mainAssetId, collateralAssetId, PriceVariant.Buy, xorAmount, payload);

  const actualBefore = actualReservesReferencePrice(collateralAssetId, payload, PriceVariant.Buy);
  const unfundedLiabilities = idealBefore.sub(actualBefore);

  const a = safeDivide(unfundedLiabilities, idealBefore);
  const b = safeDivide(unfundedLiabilities, idealAfter);

  const mean = safeDivide(a.add(b), new FPNumber(2));
  const amount = safeDivide(
    a.sub(b).mul(Consts.initialPswapTbcRewardsAmount).mul(mean),
    Consts.incentivizedCurrenciesNum
  );

  if (amount.isZero()) {
    return [];
  }

  return [
    {
      amount: amount.toCodecString(),
      currency: Consts.PSWAP,
      reason: RewardReason.BuyOnBondingCurve,
    },
  ];
};

// buy_function
const tbcBuyFunction = (
  mainAssetId: string,
  collateralAssetId: string,
  priceVariant: PriceVariant,
  delta: FPNumber,
  payload: QuotePayload
): FPNumber => {
  if (isAssetAddress(collateralAssetId, Consts.TBCD)) {
    // Handle TBCD
    const xp = tbcReferencePrice(mainAssetId, priceVariant, payload);
    // get the XOR price in USD (DAI) and add $1 to it
    const xorPrice = xp.add(FPNumber.ONE);

    return xorPrice;
  } else {
    // Everything other than TBCD
    const totalSupply = toFp(payload.issuances[mainAssetId]);
    const initialPrice = toFp(payload.consts.tbc.initialPrice);
    const priceChangeStep = toFp(payload.consts.tbc.priceChangeStep);
    const priceChangeRate = toFp(payload.consts.tbc.priceChangeRate);

    return safeDivide(totalSupply.add(delta), priceChangeStep.mul(priceChangeRate)).add(initialPrice);
  }
};

// sell_function
const tbcSellFunction = (
  mainAssetId: string,
  collateralAssetId: string,
  delta: FPNumber,
  payload: QuotePayload
): FPNumber => {
  const buyFunctionResult = tbcBuyFunction(mainAssetId, collateralAssetId, PriceVariant.Sell, delta, payload);
  const sellPriceCoefficient = toFp(payload.consts.tbc.sellPriceCoefficient);

  return buyFunctionResult.mul(sellPriceCoefficient);
};

// sell_price
const tbcSellPrice = (
  mainAssetId: string,
  collateralAssetId: string,
  amount: FPNumber,
  isDesiredInput: boolean,
  payload: QuotePayload
): FPNumber => {
  const collateralSupply = toFp(payload.reserves.tbc[collateralAssetId]);
  const mainPricePerReferenceUnit = tbcSellFunction(mainAssetId, collateralAssetId, FPNumber.ZERO, payload);
  const collateralPricePerReferenceUnit = tbcReferencePrice(collateralAssetId, PriceVariant.Sell, payload);
  const mainSupply = safeDivide(collateralSupply.mul(collateralPricePerReferenceUnit), mainPricePerReferenceUnit);

  if (isDesiredInput) {
    const outputCollateral = safeDivide(amount.mul(collateralSupply), mainSupply.add(amount));

    if (FPNumber.isGreaterThan(outputCollateral, collateralSupply)) {
      throw new Error(Errors.NotEnoughReserves);
    }

    return outputCollateral;
  } else {
    if (FPNumber.isGreaterThan(amount, collateralSupply)) {
      throw new Error(Errors.NotEnoughReserves);
    }

    const outputXor = safeDivide(mainSupply.mul(amount), collateralSupply.sub(amount));

    return outputXor;
  }
};

// buy_price
const tbcBuyPrice = (
  mainAssetId: string,
  collateralAssetId: string,
  amount: FPNumber,
  isDesiredInput: boolean,
  payload: QuotePayload
): FPNumber => {
  const priceChangeStep = toFp(payload.consts.tbc.priceChangeStep);
  const priceChangeRate = toFp(payload.consts.tbc.priceChangeRate);
  const priceChangeCoeff = priceChangeStep.mul(priceChangeRate);

  const currentState = tbcBuyFunction(mainAssetId, collateralAssetId, PriceVariant.Buy, FPNumber.ZERO, payload);
  const collateralPricePerReferenceUnit = tbcReferencePrice(collateralAssetId, PriceVariant.Buy, payload);

  if (isDesiredInput) {
    const collateralReferenceIn = collateralPricePerReferenceUnit.mul(amount);

    let mainOut: FPNumber;

    if (isAssetAddress(collateralAssetId, Consts.TBCD)) {
      mainOut = safeDivide(collateralReferenceIn, currentState);
    } else {
      const sqrt = currentState
        .mul(currentState)
        .mul(priceChangeCoeff)
        .add(new FPNumber(2).mul(collateralReferenceIn))
        .mul(priceChangeCoeff)
        .sqrt();
      mainOut = sqrt.sub(currentState.mul(priceChangeCoeff));
    }
    return getMaxPositive(mainOut);
  } else {
    const newState = tbcBuyFunction(mainAssetId, collateralAssetId, PriceVariant.Buy, amount, payload);
    const collateralReferenceIn = safeDivide(currentState.add(newState).mul(amount), new FPNumber(2));
    const collateralQuantity = safeDivide(collateralReferenceIn, collateralPricePerReferenceUnit);
    return getMaxPositive(collateralQuantity);
  }
};

// decide_sell_amounts
const tbcDecideSellAmounts = (
  mainAssetId: string,
  collateralAssetId: string,
  amount: FPNumber,
  isDesiredInput: boolean,
  payload: QuotePayload,
  deduceFee = true
): QuoteResult => {
  const newFee = deduceFee ? Consts.TBC_FEE.add(sellPenalty(mainAssetId, collateralAssetId, payload)) : FPNumber.ZERO;

  if (isDesiredInput) {
    const fee = amount.mul(newFee);
    const outputAmount = tbcSellPrice(mainAssetId, collateralAssetId, amount.sub(fee), isDesiredInput, payload);

    return {
      amount: outputAmount,
      fee,
      rewards: [],
      distribution: [
        {
          input: mainAssetId,
          output: collateralAssetId,
          market: LiquiditySourceTypes.MulticollateralBondingCurvePool,
          income: amount,
          outcome: outputAmount,
          fee,
        },
      ],
    };
  } else {
    const inputAmount = tbcSellPrice(mainAssetId, collateralAssetId, amount, isDesiredInput, payload);
    const inputAmountWithFee = safeDivide(inputAmount, FPNumber.ONE.sub(newFee));
    const fee = inputAmountWithFee.sub(inputAmount);

    return {
      amount: inputAmountWithFee,
      fee,
      rewards: [],
      distribution: [
        {
          input: mainAssetId,
          output: collateralAssetId,
          market: LiquiditySourceTypes.MulticollateralBondingCurvePool,
          income: inputAmountWithFee,
          outcome: amount,
          fee,
        },
      ],
    };
  }
};

// decide_buy_amounts
const tbcDecideBuyAmounts = (
  mainAssetId: string, // XOR
  collateralAsset: string,
  amount: FPNumber,
  isDesiredInput: boolean,
  payload: QuotePayload,
  deduceFee = true
): QuoteResult => {
  const feeRatio = deduceFee ? Consts.TBC_FEE : FPNumber.ZERO;

  if (isDesiredInput) {
    const outputAmount = tbcBuyPrice(mainAssetId, collateralAsset, amount, isDesiredInput, payload);
    const fee = feeRatio.mul(outputAmount);
    const output = outputAmount.sub(fee);
    const rewards = checkRewards(mainAssetId, collateralAsset, output, payload);

    return {
      amount: output,
      fee,
      rewards,
      distribution: [
        {
          input: collateralAsset,
          output: mainAssetId,
          market: LiquiditySourceTypes.MulticollateralBondingCurvePool,
          income: amount,
          outcome: output,
          fee,
        },
      ],
    };
  } else {
    const amountWithFee = safeDivide(amount, FPNumber.ONE.sub(feeRatio));
    const inputAmount = tbcBuyPrice(mainAssetId, collateralAsset, amountWithFee, isDesiredInput, payload);
    const fee = amountWithFee.sub(amount);
    const rewards = checkRewards(mainAssetId, collateralAsset, amount, payload);

    return {
      amount: inputAmount,
      fee,
      rewards,
      distribution: [
        {
          input: collateralAsset,
          output: mainAssetId,
          market: LiquiditySourceTypes.MulticollateralBondingCurvePool,
          income: inputAmount,
          outcome: amount,
          fee,
        },
      ],
    };
  }
};

export const tbcBuyPriceNoVolume = (mainAssetId: string, collateralAsset: string, payload: QuotePayload): FPNumber => {
  const basePriceWrtRef = tbcBuyFunction(mainAssetId, collateralAsset, PriceVariant.Buy, FPNumber.ZERO, payload);
  const collateralPricePerReferenceUnit = tbcReferencePrice(collateralAsset, PriceVariant.Sell, payload);

  return safeDivide(basePriceWrtRef, collateralPricePerReferenceUnit);
};

export const tbcSellPriceNoVolume = (mainAssetId: string, collateralAsset: string, payload: QuotePayload): FPNumber => {
  const basePriceWrtRef = tbcSellFunction(mainAssetId, collateralAsset, FPNumber.ZERO, payload);
  const collateralPricePerReferenceUnit = tbcReferencePrice(collateralAsset, PriceVariant.Buy, payload);

  return safeDivide(basePriceWrtRef, collateralPricePerReferenceUnit);
};

export const tbcQuoteWithoutImpact = (
  baseAssetId: string,
  inputAsset: string,
  outputAsset: string,
  amount: FPNumber,
  isDesiredinput: boolean,
  payload: QuotePayload,
  deduceFee: boolean
): FPNumber => {
  try {
    if (!canExchange(baseAssetId, inputAsset, outputAsset, payload)) {
      throw new Error(Errors.CantExchange);
    }

    if (isAssetAddress(inputAsset, baseAssetId)) {
      const xorPrice = tbcSellPriceNoVolume(inputAsset, outputAsset, payload);
      const newFee = deduceFee ? Consts.TBC_FEE.add(sellPenalty(inputAsset, outputAsset, payload)) : FPNumber.ZERO;

      if (isDesiredinput) {
        const feeAmount = newFee.mul(amount);
        const collateralOut = amount.sub(feeAmount).mul(xorPrice);

        return collateralOut;
      } else {
        const xorIn = safeDivide(amount, xorPrice);
        const inputAmountWithFee = safeDivide(xorIn, FPNumber.ONE.sub(newFee));

        return inputAmountWithFee;
      }
    } else {
      const xorPrice = tbcBuyPriceNoVolume(outputAsset, inputAsset, payload);
      const feeRatio = deduceFee ? Consts.TBC_FEE : FPNumber.ZERO;

      if (isDesiredinput) {
        const xorOut = safeDivide(amount, xorPrice);
        const feeAmount = xorOut.mul(feeRatio);

        return xorOut.sub(feeAmount);
      } else {
        const outputAmountWithFee = safeDivide(amount, FPNumber.ONE.sub(feeRatio));
        const collateralIn = outputAmountWithFee.mul(xorPrice);

        return collateralIn;
      }
    }
  } catch (error) {
    return FPNumber.ZERO;
  }
};

export const tbcQuote = (
  baseAssetId: string,
  inputAsset: string,
  outputAsset: string,
  amount: FPNumber,
  isDesiredInput: boolean,
  payload: QuotePayload,
  deduceFee: boolean
): QuoteResult => {
  try {
    if (!canExchange(baseAssetId, inputAsset, outputAsset, payload)) {
      throw new Error(Errors.CantExchange);
    }

    if (isAssetAddress(inputAsset, baseAssetId)) {
      return tbcDecideSellAmounts(inputAsset, outputAsset, amount, isDesiredInput, payload, deduceFee);
    } else {
      return tbcDecideBuyAmounts(outputAsset, inputAsset, amount, isDesiredInput, payload, deduceFee);
    }
  } catch (error) {
    return safeQuoteResult(inputAsset, outputAsset, amount, LiquiditySourceTypes.MulticollateralBondingCurvePool);
  }
};
