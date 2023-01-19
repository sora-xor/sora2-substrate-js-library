import { FPNumber } from '@sora-substrate/math';

import { LiquiditySourceTypes, Consts, PriceVariant, RewardReason } from '../consts';
import { safeDivide, isXorAsset, getMaxPositive, isAssetAddress, safeQuoteResult } from '../utils';
import { getAveragePrice } from './price';

import type { QuotePayload, QuoteResult, LPRewardsInfo } from '../types';

/**
 * This function is used to determine particular asset price in terms of a reference asset, which is set for
 * bonding curve (there could be only single token chosen as reference for all comparisons). Basically, the
 * reference token is expected to be a USD-bound stablecoin, e.g. DAI.
 *
 * Example use: understand actual value of two tokens in terms of USD.
 */
const tbcReferencePrice = (assetAddress: string, payload: QuotePayload, priceVariant: PriceVariant): FPNumber => {
  // [TODO] pass reference asset
  const referenceAssetId = Consts.DAI;

  if (isAssetAddress(assetAddress, referenceAssetId)) {
    return FPNumber.ONE;
  } else {
    return getAveragePrice(assetAddress, referenceAssetId, priceVariant, payload);
  }
};

/**
 * Calculate USD price for single collateral asset that is stored in reserves account. In other words, find out how much
 * reserves worth, considering only one asset type.
 */
const actualReservesReferencePrice = (
  collateralAsset: string,
  payload: QuotePayload,
  priceVariant: PriceVariant
): FPNumber => {
  const reserve = FPNumber.fromCodecValue(payload.reserves.tbc[collateralAsset]);
  const price = tbcReferencePrice(collateralAsset, payload, priceVariant);

  return reserve.mul(price);
};

/**
 * Calculate USD price for all XOR in network, this is done by applying ideal sell function to XOR total supply.
 * `delta` is a XOR supply offset from current total supply.
 *
 * `((initial_price + current_state) / 2) * (xor_issuance + delta)`
 */
const idealReservesReferencePrice = (delta: FPNumber, payload: QuotePayload): FPNumber => {
  const xorIssuance = FPNumber.fromCodecValue(payload.issuances[Consts.XOR]);
  const initialPrice = FPNumber.fromCodecValue(payload.consts.tbc.initialPrice);
  const currentState = tbcBuyFunction(delta, payload);

  return safeDivide(initialPrice.add(currentState), new FPNumber(2)).mul(xorIssuance.add(delta));
};

/**
 * Mapping that defines ratio of fee penalty applied for selling XOR with
 * low collateralized reserves.
 */
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

/**
 * Calculate ratio of fee penalty that is applied to trades when XOR is sold while
 * reserves are low for target collateral asset.
 */
const sellPenalty = (collateralAsset: string, payload: QuotePayload): FPNumber => {
  const idealReservesPrice = idealReservesReferencePrice(FPNumber.ZERO, payload);
  const collateralReservesPrice = actualReservesReferencePrice(collateralAsset, payload, PriceVariant.Buy);

  if (collateralReservesPrice.isZero()) {
    throw new Error(`[liquidityProxy] TBC: Not enough collateral reserves ${collateralAsset}`);
  }

  const collateralizedFraction = safeDivide(collateralReservesPrice, idealReservesPrice);
  const penalty = mapCollateralizedFractionToPenalty(collateralizedFraction);

  return penalty;
};

/**
 * Calculate amount of PSWAP rewarded for collateralizing XOR in TBC.
 *
 * `ideal_reserves_before = sell_function(0 to xor_total_supply_before_trade)`
 *
 * `ideal_reserves_after = sell_function(0 to xor_total_supply_after_trade)`
 *
 * `actual_reserves_before = collateral_asset_reserves * collateral_asset_usd_price`
 *
 * `actual_reserves_after = actual_reserves_before + collateral_asset_input_amount * collateral_asset_usd_price`
 *
 * `unfunded_liabilities = (ideal_reserves_before - actual_reserves_before)`
 *
 * `a = unfunded_liabilities / ideal_reserves_before`
 *
 * `b = unfunded_liabilities / ideal_reserves_after`
 *
 * `P = initial_pswap_rewards`
 *
 * `N = enabled reserve currencies except PSWAP and VAL`
 *
 * `reward_pswap = ((a - b) * mean(a, b) * P) / N`
 */
const checkRewards = (collateralAsset: string, xorAmount: FPNumber, payload: QuotePayload): Array<LPRewardsInfo> => {
  if ([Consts.PSWAP, Consts.VAL].includes(collateralAsset)) {
    return [];
  }

  const idealBefore = idealReservesReferencePrice(FPNumber.ZERO, payload);
  const idealAfter = idealReservesReferencePrice(xorAmount, payload);

  const actualBefore = actualReservesReferencePrice(collateralAsset, payload, PriceVariant.Sell);
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

/**
 * Buy function with regards to asset total supply and its change delta. It represents the amount of
 * input collateral required from User in order to receive requested XOR amount. I.e. the price User buys at.
 * XOR is also referred as main asset.
 * Value of `delta` is assumed to be either positive or negative.
 * For every `price_change_step` tokens the price goes up by `price_change_rate`.
 *
 * `buy_price_usd = (xor_total_supply + xor_supply_delta) / (price_change_step * price_change_rate) + initial_price_usd`
 */
const tbcBuyFunction = (delta: FPNumber, payload: QuotePayload): FPNumber => {
  const xstusdIssuance = FPNumber.fromCodecValue(payload.issuances[Consts.XSTUSD]);
  const xorIssuance = FPNumber.fromCodecValue(payload.issuances[Consts.XOR]);
  const xorPrice = FPNumber.fromCodecValue(payload.prices[Consts.XOR][PriceVariant.Buy]);
  const xstXorLiability = safeDivide(xstusdIssuance, xorPrice);
  const initialPrice = FPNumber.fromCodecValue(payload.consts.tbc.initialPrice);
  const priceChangeStep = FPNumber.fromCodecValue(payload.consts.tbc.priceChangeStep);
  return safeDivide(xorIssuance.add(xstXorLiability).add(delta), priceChangeStep).add(initialPrice);
};

/**
 * Sell function with regards to asset total supply and its change delta. It represents the amount of
 * output collateral tokens received by User by indicating exact sold XOR amount. I.e. the price User sells at.
 * Value of `delta` is assumed to be either positive or negative.
 * Sell function is `sell_price_coefficient`% of buy function (see `tbcBuyFunction`).
 *
 * `sell_price = sell_price_coefficient * buy_price`
 */
const tbcSellFunction = (delta: FPNumber, payload: QuotePayload): FPNumber => {
  const buyFunctionResult = tbcBuyFunction(delta, payload);
  const sellPriceCoefficient = FPNumber.fromCodecValue(payload.consts.tbc.sellPriceCoefficient);

  return buyFunctionResult.mul(sellPriceCoefficient);
};

/**
 * Calculates and returns the current sell price, assuming that input is the main asset and output is the collateral asset.
 * To calculate sell price for a specific amount of assets:
 * 1. Current reserves of collateral token are taken
 * 2. Same amount by value is assumed for main asset
 *
 *    2.1. Values are compared via getting prices for both main and collateral tokens with regard to another token called reference token which is set for particular pair. This should be e.g. stablecoin DAI.
 *
 *    2.2. Reference price for base token is taken as 80% of current bonding curve buy price.
 *
 *    2.3. Reference price for collateral token is taken as current market price, i.e. price for 1 token on liquidity proxy.
 *
 * 3. Given known reserves for main and collateral, output collateral amount is calculated by applying x*y=k model resulting in curve-like dependency.
 */
const tbcSellPrice = (
  collateralAsset: string,
  amount: FPNumber,
  isDesiredInput: boolean,
  payload: QuotePayload
): FPNumber => {
  const collateralSupply = FPNumber.fromCodecValue(payload.reserves.tbc[collateralAsset]);
  const xorPrice = tbcSellFunction(FPNumber.ZERO, payload);
  const collateralPrice = tbcReferencePrice(collateralAsset, payload, PriceVariant.Buy);
  const xorSupply = safeDivide(collateralSupply.mul(collateralPrice), xorPrice);

  if (isDesiredInput) {
    const outputCollateral = safeDivide(amount.mul(collateralSupply), xorSupply.add(amount));

    if (FPNumber.isGreaterThan(outputCollateral, collateralSupply)) {
      throw new Error(`[liquidityProxy] TBC: Not enough collateral reserves ${collateralAsset}`);
    }

    return outputCollateral;
  } else {
    if (FPNumber.isGreaterThan(amount, collateralSupply)) {
      throw new Error(`[liquidityProxy] TBC: Not enough collateral reserves ${collateralAsset}`);
    }

    const outputXor = safeDivide(xorSupply.mul(amount), collateralSupply.sub(amount));

    return outputXor;
  }
};

/**
Calculates and returns the current buy price, assuming that input is the collateral asset and output is the main asset.

To calculate price for a specific amount of assets (with desired main asset output),
one needs to calculate the area of a right trapezoid.

`AB` : buy_function(xor_total_supply)
`CD` : buy_function(xor_total_supply + xor_supply_delta)

```nocompile
         ..  C
       ..  │
  B  ..    │
    │   S  │
    │      │
  A └──────┘ D
```

1) Amount of collateral tokens needed in USD to get `xor_supply_delta`(AD) XOR tokens
S = ((AB + CD) / 2) * AD

or

buy_price_usd = ((buy_function(xor_total_supply) + buy_function(xor_total_supply + xor_supply_delta)) / 2) * xor_supply_delta

2) Amount of XOR tokens received by depositing `S` collateral tokens in USD:

Solving right trapezoid area formula with respect to `xor_supply_delta` (AD),
actual square `S` is known and represents collateral amount.
We have a quadratic equation:

buy_function(x) = price_change_coefficient * x + initial_price

Assume `M` = 1 / price_change_coefficient = 1 / 1337

M * AD² + 2 * AB * AD - 2 * S = 0
equation with two solutions, taking only positive one:
AD = (√((AB * 2 / M)² + 8 * S / M) - 2 * AB / M) / 2

or

xor_supply_delta = (√((buy_function(xor_total_supply) * 2 / price_change_coeff)²
                   + 8 * buy_price_usd / price_change_coeff) - 2 * buy_function(xor_total_supply)
                   / price_change_coeff) / 2
 */
const tbcBuyPrice = (
  collateralAsset: string,
  amount: FPNumber,
  isDesiredInput: boolean,
  payload: QuotePayload
): FPNumber => {
  const currentState = tbcBuyFunction(FPNumber.ZERO, payload);
  const collateralPrice = tbcReferencePrice(collateralAsset, payload, PriceVariant.Sell);
  const priceChangeStep = FPNumber.fromCodecValue(payload.consts.tbc.priceChangeStep);

  if (isDesiredInput) {
    const collateralReferenceIn = collateralPrice.mul(amount);
    const underPow = currentState.mul(priceChangeStep).mul(new FPNumber(2));
    const underSqrt = underPow.mul(underPow).add(new FPNumber(8).mul(priceChangeStep).mul(collateralReferenceIn));
    const xorOut = safeDivide(underSqrt.sqrt(), new FPNumber(2)).sub(priceChangeStep.mul(currentState));
    return getMaxPositive(xorOut);
  } else {
    const newState = tbcBuyFunction(amount, payload);
    const collateralReferenceIn = safeDivide(currentState.add(newState).mul(amount), new FPNumber(2));
    const collateralQuantity = safeDivide(collateralReferenceIn, collateralPrice);
    return getMaxPositive(collateralQuantity);
  }
};

const tbcSellPriceWithFee = (
  collateralAsset: string,
  amount: FPNumber,
  isDesiredInput: boolean,
  payload: QuotePayload
): QuoteResult => {
  const newFee = Consts.TBC_FEE.add(sellPenalty(collateralAsset, payload));

  if (isDesiredInput) {
    const feeAmount = amount.mul(newFee);
    const outputAmount = tbcSellPrice(collateralAsset, amount.sub(feeAmount), isDesiredInput, payload);

    return {
      amount: outputAmount,
      fee: feeAmount,
      rewards: [],
      distribution: [
        {
          input: Consts.XOR,
          output: collateralAsset,
          market: LiquiditySourceTypes.MulticollateralBondingCurvePool,
          income: amount,
          outcome: outputAmount,
          fee: feeAmount,
        },
      ],
    };
  } else {
    const inputAmount = tbcSellPrice(collateralAsset, amount, isDesiredInput, payload);
    const inputAmountWithFee = safeDivide(inputAmount, FPNumber.ONE.sub(newFee));
    const fee = inputAmountWithFee.sub(inputAmount);

    return {
      amount: inputAmountWithFee,
      fee,
      rewards: [],
      distribution: [
        {
          input: Consts.XOR,
          output: collateralAsset,
          market: LiquiditySourceTypes.MulticollateralBondingCurvePool,
          income: inputAmountWithFee,
          outcome: amount,
          fee,
        },
      ],
    };
  }
};

const tbcBuyPriceWithFee = (
  collateralAsset: string,
  amount: FPNumber,
  isDesiredInput: boolean,
  payload: QuotePayload
): QuoteResult => {
  if (isDesiredInput) {
    const outputAmount = tbcBuyPrice(collateralAsset, amount, isDesiredInput, payload);
    const feeAmount = Consts.TBC_FEE.mul(outputAmount);
    const output = outputAmount.sub(feeAmount);
    const rewards = checkRewards(collateralAsset, output, payload);

    return {
      amount: output,
      fee: feeAmount,
      rewards,
      distribution: [
        {
          input: collateralAsset,
          output: Consts.XOR,
          market: LiquiditySourceTypes.MulticollateralBondingCurvePool,
          income: amount,
          outcome: output,
          fee: feeAmount,
        },
      ],
    };
  } else {
    const amountWithFee = safeDivide(amount, FPNumber.ONE.sub(Consts.TBC_FEE));
    const inputAmount = tbcBuyPrice(collateralAsset, amountWithFee, isDesiredInput, payload);
    const fee = amountWithFee.sub(amount);
    const rewards = checkRewards(collateralAsset, amount, payload);

    return {
      amount: inputAmount,
      fee,
      rewards,
      distribution: [
        {
          input: collateralAsset,
          output: Consts.XOR,
          market: LiquiditySourceTypes.MulticollateralBondingCurvePool,
          income: inputAmount,
          outcome: amount,
          fee,
        },
      ],
    };
  }
};

export const tbcBuyPriceNoVolume = (collateralAsset: string, payload: QuotePayload): FPNumber => {
  const xorPrice = tbcBuyFunction(FPNumber.ZERO, payload);
  const collateralPrice = tbcReferencePrice(collateralAsset, payload, PriceVariant.Sell);

  return safeDivide(xorPrice, collateralPrice);
};

export const tbcSellPriceNoVolume = (collateralAsset: string, payload: QuotePayload): FPNumber => {
  const xorPrice = tbcSellFunction(FPNumber.ZERO, payload);
  const collateralPrice = tbcReferencePrice(collateralAsset, payload, PriceVariant.Buy);

  return safeDivide(xorPrice, collateralPrice);
};

export const tbcQuoteWithoutImpact = (
  inputAsset: string,
  outputAsset: string,
  amount: FPNumber,
  isDesiredinput: boolean,
  payload: QuotePayload
): FPNumber => {
  try {
    if (isXorAsset(inputAsset)) {
      const xorPrice = tbcSellPriceNoVolume(outputAsset, payload);
      const penalty = sellPenalty(outputAsset, payload);
      const newFee = Consts.TBC_FEE.add(penalty);

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
      const xorPrice = tbcBuyPriceNoVolume(inputAsset, payload);

      if (isDesiredinput) {
        const xorOut = safeDivide(amount, xorPrice);
        const feeAmount = xorOut.mul(Consts.TBC_FEE);

        return xorOut.sub(feeAmount);
      } else {
        const outputAmountWithFee = safeDivide(amount, FPNumber.ONE.sub(Consts.TBC_FEE));
        const collateralIn = outputAmountWithFee.mul(xorPrice);

        return collateralIn;
      }
    }
  } catch (error) {
    return FPNumber.ZERO;
  }
};

export const tbcQuote = (
  inputAsset: string,
  outputAsset: string,
  amount: FPNumber,
  isDesiredInput: boolean,
  payload: QuotePayload
): QuoteResult => {
  try {
    if (isXorAsset(inputAsset)) {
      return tbcSellPriceWithFee(outputAsset, amount, isDesiredInput, payload);
    } else {
      return tbcBuyPriceWithFee(inputAsset, amount, isDesiredInput, payload);
    }
  } catch (error) {
    return safeQuoteResult(inputAsset, outputAsset, amount, LiquiditySourceTypes.MulticollateralBondingCurvePool);
  }
};
