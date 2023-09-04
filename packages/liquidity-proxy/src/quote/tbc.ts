import { FPNumber } from '@sora-substrate/math';

import { LiquiditySourceTypes, Consts, PriceVariant, RewardReason } from '../consts';
import { safeDivide, isXorAsset, getMaxPositive, safeQuoteResult } from '../utils';
import { getAveragePrice } from './price';

import type { QuotePayload, QuoteResult, LPRewardsInfo } from '../types';

/**
 * This function is used to determine particular asset price in terms of a reference asset, which is set for
 * bonding curve (there could be only single token chosen as reference for all comparisons). Basically, the
 * reference token is expected to be a USD-bound stablecoin, e.g. DAI.
 *
 * Example use: understand actual value of two tokens in terms of USD.
 */
const tbcReferencePrice = (assetAddress: string, priceVariant: PriceVariant, payload: QuotePayload): FPNumber => {
  const referenceAssetId = payload.consts.tbc.referenceAsset;
  // always treat TBCD as being worth $1
  if ([referenceAssetId, Consts.TBCD].includes(assetAddress)) {
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
  const price = tbcReferencePrice(collateralAsset, priceVariant, payload);

  return reserve.mul(price);
};

/**
 * Calculate USD price for all XOR in network, this is done by applying ideal sell function to XOR total supply.
 * `delta` is a XOR supply offset from current total supply.
 *
 * `((initial_price + current_state) / 2) * (xor_issuance + delta)`
 */
const idealReservesReferencePrice = (
  collateralAssetId: string,
  priceVariant: PriceVariant,
  delta: FPNumber,
  payload: QuotePayload
): FPNumber => {
  const xorIssuance = FPNumber.fromCodecValue(payload.issuances[Consts.XOR]);
  const initialPrice = FPNumber.fromCodecValue(payload.consts.tbc.initialPrice);
  const currentState = tbcBuyFunction(collateralAssetId, priceVariant, delta, payload);

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
  const idealReservesPrice = idealReservesReferencePrice(collateralAsset, PriceVariant.Sell, FPNumber.ZERO, payload);
  const collateralReservesPrice = actualReservesReferencePrice(collateralAsset, payload, PriceVariant.Sell);

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
  if ([Consts.PSWAP, Consts.VAL, Consts.XST, Consts.TBCD].includes(collateralAsset)) {
    return [];
  }

  const idealBefore = idealReservesReferencePrice(collateralAsset, PriceVariant.Buy, FPNumber.ZERO, payload);
  const idealAfter = idealReservesReferencePrice(collateralAsset, PriceVariant.Buy, xorAmount, payload);

  const actualBefore = actualReservesReferencePrice(collateralAsset, payload, PriceVariant.Buy);
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
 * input collateral required from the User to receive the requested XOR amount, i.e., the price the User buys XOR at
 * XOR is also referred as main asset.
 * Value of `delta` is assumed to be either positive or negative.
 * For every `price_change_step` tokens the price goes up by `price_change_rate`.
 *
 * `buy_price_usd = (xor_total_supply + xor_supply_delta) / (price_change_step * price_change_rate) + initial_price_usd`
 */
const tbcBuyFunction = (
  collateralAssetId: string,
  priceVariant: PriceVariant,
  delta: FPNumber,
  payload: QuotePayload
): FPNumber => {
  if (collateralAssetId === Consts.TBCD) {
    // Handle TBCD
    const xp = tbcReferencePrice(Consts.XOR, priceVariant, payload);
    // get the XOR price in USD (DAI) and add $1 to it
    const xorPrice = xp.add(FPNumber.ONE);

    return xorPrice;
  } else {
    // Everything other than TBCD
    const xorIssuance = FPNumber.fromCodecValue(payload.issuances[Consts.XOR]);
    const initialPrice = FPNumber.fromCodecValue(payload.consts.tbc.initialPrice);
    const priceChangeStep = FPNumber.fromCodecValue(payload.consts.tbc.priceChangeStep);
    const priceChangeRate = FPNumber.fromCodecValue(payload.consts.tbc.priceChangeRate);

    return safeDivide(xorIssuance.add(delta), priceChangeStep.mul(priceChangeRate)).add(initialPrice);
  }
};

/**
 * Sell function with regards to asset total supply and its change delta. It represents the amount of
 * output collateral tokens received by User by indicating exact sold XOR amount. I.e. the price User sells at.
 * Value of `delta` is assumed to be either positive or negative.
 * Sell function is `sell_price_coefficient`% of buy function (see `tbcBuyFunction`).
 *
 * `sell_price = sell_price_coefficient * buy_price`
 */
const tbcSellFunction = (collateralAssetId: string, delta: FPNumber, payload: QuotePayload): FPNumber => {
  const buyFunctionResult = tbcBuyFunction(collateralAssetId, PriceVariant.Sell, delta, payload);
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
  const mainPricePerReferenceUnit = tbcSellFunction(collateralAsset, FPNumber.ZERO, payload);
  const collateralPricePerReferenceUnit = tbcReferencePrice(collateralAsset, PriceVariant.Sell, payload);
  const mainSupply = safeDivide(collateralSupply.mul(collateralPricePerReferenceUnit), mainPricePerReferenceUnit);

  if (isDesiredInput) {
    const outputCollateral = safeDivide(amount.mul(collateralSupply), mainSupply.add(amount));

    if (FPNumber.isGreaterThan(outputCollateral, collateralSupply)) {
      throw new Error(`[liquidityProxy] TBC: Not enough collateral reserves ${collateralAsset}`);
    }

    return outputCollateral;
  } else {
    if (FPNumber.isGreaterThan(amount, collateralSupply)) {
      throw new Error(`[liquidityProxy] TBC: Not enough collateral reserves ${collateralAsset}`);
    }

    const outputXor = safeDivide(mainSupply.mul(amount), collateralSupply.sub(amount));

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

Assume `P` = price_change_coefficient = 1337

M * AD² + 2 * AB * AD - 2 * S = 0
equation with two solutions, taking only positive one:
AD = (√((AB * 2 / M)² + 8 * S / M) - 2 * AB / M) / 2 (old formula)
AD = √(P * (AB² * P + 2 * S)) - AB * P (new formula)

or
(old)
xor_supply_delta = (√((buy_function(xor_total_supply) * 2 / price_change_coeff)²
  + 8 * buy_price_usd / price_change_coeff) - 2 * buy_function(xor_total_supply)
 / price_change_coeff) / 2
(new)
xor_supply_delta = √price_change_coefficient * √(buy_function(xor_total_supply)² * price_change_coefficient + 2 * buy_price_usd)
  - buy_function(xor_total_supply) * price_change_coefficient
 */
const tbcBuyPrice = (
  collateralAsset: string,
  amount: FPNumber,
  isDesiredInput: boolean,
  payload: QuotePayload
): FPNumber => {
  const priceChangeStep = FPNumber.fromCodecValue(payload.consts.tbc.priceChangeStep);
  const priceChangeRate = FPNumber.fromCodecValue(payload.consts.tbc.priceChangeRate);
  const priceChangeCoeff = priceChangeStep.mul(priceChangeRate);

  const currentState = tbcBuyFunction(collateralAsset, PriceVariant.Buy, FPNumber.ZERO, payload);
  const collateralPricePerReferenceUnit = tbcReferencePrice(collateralAsset, PriceVariant.Buy, payload);

  if (isDesiredInput) {
    const collateralReferenceIn = collateralPricePerReferenceUnit.mul(amount);

    let mainOut: FPNumber;

    if (collateralAsset === Consts.TBCD) {
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
    const newState = tbcBuyFunction(collateralAsset, PriceVariant.Buy, amount, payload);
    const collateralReferenceIn = safeDivide(currentState.add(newState).mul(amount), new FPNumber(2));
    const collateralQuantity = safeDivide(collateralReferenceIn, collateralPricePerReferenceUnit);
    return getMaxPositive(collateralQuantity);
  }
};

// decide_sell_amounts
const tbcSellPriceWithFee = (
  collateralAsset: string,
  amount: FPNumber,
  isDesiredInput: boolean,
  payload: QuotePayload,
  deduceFee = true
): QuoteResult => {
  const newFee = deduceFee ? Consts.TBC_FEE.add(sellPenalty(collateralAsset, payload)) : FPNumber.ZERO;

  if (isDesiredInput) {
    const fee = amount.mul(newFee);
    const outputAmount = tbcSellPrice(collateralAsset, amount.sub(fee), isDesiredInput, payload);

    return {
      amount: outputAmount,
      fee,
      rewards: [],
      distribution: [
        {
          input: Consts.XOR,
          output: collateralAsset,
          market: LiquiditySourceTypes.MulticollateralBondingCurvePool,
          income: amount,
          outcome: outputAmount,
          fee,
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
  payload: QuotePayload,
  deduceFee = true
): QuoteResult => {
  const feeRatio = deduceFee ? Consts.TBC_FEE : FPNumber.ZERO;

  if (isDesiredInput) {
    const outputAmount = tbcBuyPrice(collateralAsset, amount, isDesiredInput, payload);
    const fee = feeRatio.mul(outputAmount);
    const output = outputAmount.sub(fee);
    const rewards = checkRewards(collateralAsset, output, payload);

    return {
      amount: output,
      fee,
      rewards,
      distribution: [
        {
          input: collateralAsset,
          output: Consts.XOR,
          market: LiquiditySourceTypes.MulticollateralBondingCurvePool,
          income: amount,
          outcome: output,
          fee,
        },
      ],
    };
  } else {
    const amountWithFee = safeDivide(amount, FPNumber.ONE.sub(feeRatio));
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
  const basePriceWrtRef = tbcBuyFunction(collateralAsset, PriceVariant.Buy, FPNumber.ZERO, payload);
  const collateralPricePerReferenceUnit = tbcReferencePrice(collateralAsset, PriceVariant.Sell, payload);

  return safeDivide(basePriceWrtRef, collateralPricePerReferenceUnit);
};

export const tbcSellPriceNoVolume = (collateralAsset: string, payload: QuotePayload): FPNumber => {
  const basePriceWrtRef = tbcSellFunction(collateralAsset, FPNumber.ZERO, payload);
  const collateralPricePerReferenceUnit = tbcReferencePrice(collateralAsset, PriceVariant.Buy, payload);

  return safeDivide(basePriceWrtRef, collateralPricePerReferenceUnit);
};

export const tbcQuoteWithoutImpact = (
  inputAsset: string,
  outputAsset: string,
  amount: FPNumber,
  isDesiredinput: boolean,
  payload: QuotePayload,
  deduceFee = true
): FPNumber => {
  try {
    if (isXorAsset(inputAsset)) {
      const xorPrice = tbcSellPriceNoVolume(outputAsset, payload);
      const newFee = deduceFee ? Consts.TBC_FEE.add(sellPenalty(outputAsset, payload)) : FPNumber.ZERO;

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
  inputAsset: string,
  outputAsset: string,
  amount: FPNumber,
  isDesiredInput: boolean,
  payload: QuotePayload,
  deduceFee = true
): QuoteResult => {
  try {
    if (isXorAsset(inputAsset)) {
      return tbcSellPriceWithFee(outputAsset, amount, isDesiredInput, payload, deduceFee);
    } else {
      return tbcBuyPriceWithFee(inputAsset, amount, isDesiredInput, payload, deduceFee);
    }
  } catch (error) {
    return safeQuoteResult(inputAsset, outputAsset, amount, LiquiditySourceTypes.MulticollateralBondingCurvePool);
  }
};
