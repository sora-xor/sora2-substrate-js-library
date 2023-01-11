import { FPNumber, CodecString } from '@sora-substrate/math';
import { LiquiditySourceTypes, RewardReason, Consts, PriceVariant, AssetType } from './consts';

import type {
  QuotePayload,
  QuoteResult,
  QuotePrimaryMarketResult,
  QuotePaths,
  Distribution,
  SwapResult,
  LPRewardsInfo,
} from './types';

// UTILS
const toFp = (item: CodecString): FPNumber => FPNumber.fromCodecValue(item);
const getMaxPositive = (value: FPNumber) => FPNumber.max(value, FPNumber.ZERO) as FPNumber;
const isGreaterThanZero = (value: FPNumber) => FPNumber.isGreaterThan(value, FPNumber.ZERO);
const isLessThanOrEqualToZero = (value: FPNumber) => FPNumber.isLessThanOrEqualTo(value, FPNumber.ZERO);
const isAssetAddress = (a: string, b: string) => a === b;
const isXorAsset = (asset: string, dexBaseAsset = Consts.XOR) => isAssetAddress(asset, dexBaseAsset);
const ZeroString = '0';

// returs reserves by order: inputAssetId, outputAssetId
export const getXykReserves = (
  inputAsset: string,
  outputAsset: string,
  payload: QuotePayload,
  dexBaseAsset = Consts.XOR
): [FPNumber, FPNumber] => {
  const isBaseAssetInput = isAssetAddress(inputAsset, dexBaseAsset);
  const nonBaseAsset = isBaseAssetInput ? outputAsset : inputAsset;
  const reserves = [...payload.reserves.xyk[nonBaseAsset]];
  const [input, output] = isBaseAssetInput ? reserves : reserves.reverse();

  return [toFp(input), toFp(output)];
};

const safeDivide = (value: FPNumber, divider: FPNumber): FPNumber => {
  if (divider.isZero() || divider.isNaN()) {
    throw new Error(`[liquidityProxy] Division error: ${value.toString()} / ${divider.toString()}`);
  } else {
    return value.div(divider);
  }
};

const safeQuoteResult = (amount: FPNumber, market: LiquiditySourceTypes): QuoteResult => {
  return {
    amount: FPNumber.ZERO,
    fee: FPNumber.ZERO,
    rewards: [],
    distribution: [
      {
        market,
        amount,
      },
    ],
  };
};

// TBC quote

/**
 * This function is used to determine particular asset price in terms of a reference asset, which is set for
 * bonding curve (there could be only single token chosen as reference for all comparisons). Basically, the
 * reference token is expected to be a USD-bound stablecoin, e.g. DAI.
 *
 * Example use: understand actual value of two tokens in terms of USD.
 */
const tbcReferencePrice = (assetAddress: string, payload: QuotePayload, priceVariant: PriceVariant): FPNumber => {
  if (isAssetAddress(assetAddress, Consts.DAI)) {
    return FPNumber.ONE;
  } else {
    const xorPrice = FPNumber.fromCodecValue(payload.prices[Consts.XOR][priceVariant]);
    const assetPrice = FPNumber.fromCodecValue(payload.prices[assetAddress][priceVariant]);

    return safeDivide(xorPrice, assetPrice);
  }
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
          market: LiquiditySourceTypes.MulticollateralBondingCurvePool,
          amount,
        },
      ],
    };
  } else {
    const inputAmount = tbcSellPrice(collateralAsset, amount, isDesiredInput, payload);
    const inputAmountWithFee = safeDivide(inputAmount, FPNumber.ONE.sub(newFee));

    return {
      amount: inputAmountWithFee,
      fee: inputAmountWithFee.sub(inputAmount),
      rewards: [],
      distribution: [
        {
          market: LiquiditySourceTypes.MulticollateralBondingCurvePool,
          amount,
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
          market: LiquiditySourceTypes.MulticollateralBondingCurvePool,
          amount,
        },
      ],
    };
  } else {
    const amountWithFee = safeDivide(amount, FPNumber.ONE.sub(Consts.TBC_FEE));
    const inputAmount = tbcBuyPrice(collateralAsset, amountWithFee, isDesiredInput, payload);
    const rewards = checkRewards(collateralAsset, amount, payload);

    return {
      amount: inputAmount,
      fee: amountWithFee.sub(amount),
      rewards,
      distribution: [
        {
          market: LiquiditySourceTypes.MulticollateralBondingCurvePool,
          amount,
        },
      ],
    };
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
    return safeQuoteResult(amount, LiquiditySourceTypes.MulticollateralBondingCurvePool);
  }
};

// XST quote
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

const xstBuyPriceNoVolume = (syntheticAsset: string, payload: QuotePayload): FPNumber => {
  const basePriceWrtRef = xstReferencePrice(Consts.XST, payload, PriceVariant.Buy);
  const syntheticPricePerReferenceUnit = xstReferencePrice(syntheticAsset, payload, PriceVariant.Sell);

  return safeDivide(basePriceWrtRef, syntheticPricePerReferenceUnit);
};

const xstSellPriceNoVolume = (syntheticAsset: string, payload: QuotePayload): FPNumber => {
  const basePriceWrtRef = xstReferencePrice(Consts.XST, payload, PriceVariant.Sell);
  const syntheticPricePerReferenceUnit = xstReferencePrice(syntheticAsset, payload, PriceVariant.Buy);

  return safeDivide(basePriceWrtRef, syntheticPricePerReferenceUnit);
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

// XYK quote

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

// AGGREGATOR
const quotePrimaryMarket = (
  inputAssetAddress: string,
  outputAssetAddress: string,
  amount: FPNumber,
  isDesiredInput: boolean,
  payload: QuotePayload
): QuotePrimaryMarketResult => {
  if ([inputAssetAddress, outputAssetAddress].includes(Consts.XSTUSD)) {
    return {
      result: xstQuote(inputAssetAddress, amount, isDesiredInput, payload),
      market: LiquiditySourceTypes.XSTPool,
    };
  } else {
    return {
      result: tbcQuote(inputAssetAddress, outputAssetAddress, amount, isDesiredInput, payload),
      market: LiquiditySourceTypes.MulticollateralBondingCurvePool,
    };
  }
};

/**
 * Determines the share of a swap that should be exchanged in the primary market
 * (i.e., the multi-collateral bonding curve pool) based on the current reserves of
 * the base asset and the collateral asset in the secondary market (e.g., an XYK pool)
 * provided the base asset is being bought.
 */
const primaryMarketAmountBuyingXor = (
  collateralAsset: string,
  amount: FPNumber,
  isDesiredInput: boolean,
  xorReserve: FPNumber,
  otherReserve: FPNumber,
  payload: QuotePayload
): FPNumber => {
  try {
    const secondaryPrice = isGreaterThanZero(xorReserve) ? safeDivide(otherReserve, xorReserve) : Consts.MAX;

    const primaryBuyPrice = isAssetAddress(collateralAsset, Consts.XSTUSD)
      ? xstBuyPriceNoVolume(collateralAsset, payload)
      : tbcBuyPriceNoVolume(collateralAsset, payload);

    const k = xorReserve.mul(otherReserve);

    if (isDesiredInput) {
      if (FPNumber.isLessThan(secondaryPrice, primaryBuyPrice)) {
        const amountSecondary = k.mul(primaryBuyPrice).sqrt().sub(otherReserve);

        if (FPNumber.isGreaterThanOrEqualTo(amountSecondary, amount)) {
          return FPNumber.ZERO;
        } else if (isLessThanOrEqualToZero(amountSecondary)) {
          return amount;
        } else {
          return amount.sub(amountSecondary);
        }
      } else {
        return amount;
      }
    } else {
      if (FPNumber.isLessThan(secondaryPrice, primaryBuyPrice)) {
        const amountSecondary = xorReserve.sub(safeDivide(k, primaryBuyPrice).sqrt());

        if (FPNumber.isGreaterThanOrEqualTo(amountSecondary, amount)) {
          return FPNumber.ZERO;
        } else if (isLessThanOrEqualToZero(amountSecondary)) {
          return amount;
        } else {
          return amount.sub(amountSecondary);
        }
      } else {
        return amount;
      }
    }
  } catch (error) {
    return FPNumber.ZERO;
  }
};

/**
 * Determines the share of a swap that should be exchanged in the primary market
 * (i.e. the multi-collateral bonding curve pool) based on the current reserves of
 * the base asset and the collateral asset in the secondary market (e.g. an XYK pool)
 * provided the base asset is being sold.
 */
const primaryMarketAmountSellingXor = (
  collateralAsset: string,
  amount: FPNumber,
  isDesiredInput: boolean,
  xorReserve: FPNumber,
  otherReserve: FPNumber,
  payload: QuotePayload
): FPNumber => {
  try {
    const secondaryPrice = isGreaterThanZero(xorReserve) ? safeDivide(otherReserve, xorReserve) : FPNumber.ZERO;

    const primarySellPrice = isAssetAddress(collateralAsset, Consts.XSTUSD)
      ? xstSellPriceNoVolume(collateralAsset, payload)
      : tbcSellPriceNoVolume(collateralAsset, payload);

    const k = xorReserve.mul(otherReserve);

    if (isDesiredInput) {
      if (FPNumber.isGreaterThan(secondaryPrice, primarySellPrice)) {
        const amountSecondary = safeDivide(k, primarySellPrice).sqrt().sub(xorReserve);

        if (FPNumber.isGreaterThan(amountSecondary, amount)) {
          return FPNumber.ZERO;
        } else if (isLessThanOrEqualToZero(amountSecondary)) {
          return amount;
        } else {
          return amount.sub(amountSecondary);
        }
      } else {
        return amount;
      }
    } else {
      if (FPNumber.isGreaterThan(secondaryPrice, primarySellPrice)) {
        const amountSecondary = otherReserve.sub(k.mul(primarySellPrice).sqrt());

        if (FPNumber.isGreaterThanOrEqualTo(amountSecondary, amount)) {
          return FPNumber.ZERO;
        } else if (isLessThanOrEqualToZero(amountSecondary)) {
          return amount;
        } else {
          return amount.sub(amountSecondary);
        }
      } else {
        return amount;
      }
    }
  } catch (error) {
    return FPNumber.ZERO;
  }
};

const isBetter = (isDesiredInput: boolean, amountA: FPNumber, amountB: FPNumber): boolean => {
  if (isDesiredInput) {
    return FPNumber.isGreaterThan(amountA, amountB);
  } else {
    return isGreaterThanZero(amountA) && (amountB.isZero() || FPNumber.isLessThan(amountA, amountB));
  }
};

const extremum = (isDesiredInput: boolean): FPNumber => {
  if (isDesiredInput) {
    return FPNumber.ZERO;
  } else {
    return Consts.MAX;
  }
};

/**
 * Implements the "smart" split algorithm.
 */
const smartSplit = (
  inputAsset: string,
  outputAsset: string,
  amount: FPNumber,
  isDesiredInput: boolean,
  payload: QuotePayload,
  dexBaseAsset = Consts.XOR
): QuoteResult => {
  let bestOutcome: FPNumber = extremum(isDesiredInput);
  let bestFee: FPNumber = FPNumber.ZERO;
  let bestDistribution: Array<any> = [];
  let bestRewards: Array<LPRewardsInfo> = [];

  const isBaseAssetInput = isAssetAddress(inputAsset, dexBaseAsset);
  const [inputReserves, outputReserves] = getXykReserves(inputAsset, outputAsset, payload, dexBaseAsset);
  const [baseReserve, otherReserve] = isBaseAssetInput
    ? [inputReserves, outputReserves]
    : [outputReserves, inputReserves];

  const primaryAmount = isBaseAssetInput
    ? primaryMarketAmountSellingXor(outputAsset, amount, isDesiredInput, baseReserve, otherReserve, payload)
    : primaryMarketAmountBuyingXor(inputAsset, amount, isDesiredInput, baseReserve, otherReserve, payload);

  if (isGreaterThanZero(primaryAmount)) {
    const { result: outcomePrimary, market: primaryMarket } = quotePrimaryMarket(
      inputAsset,
      outputAsset,
      primaryAmount,
      isDesiredInput,
      payload
    );

    if (FPNumber.isLessThan(primaryAmount, amount)) {
      const outcomeSecondary = xykQuote(
        inputReserves,
        outputReserves,
        amount.sub(primaryAmount),
        isDesiredInput,
        isBaseAssetInput
      );

      bestOutcome = outcomePrimary.amount.add(outcomeSecondary.amount);
      bestFee = outcomePrimary.fee.add(outcomeSecondary.fee);
      bestRewards = [...outcomePrimary.rewards, ...outcomeSecondary.rewards];
      bestDistribution = [
        {
          market: LiquiditySourceTypes.XYKPool,
          amount: amount.sub(primaryAmount),
        },
        {
          market: primaryMarket,
          amount: primaryAmount,
        },
      ];
    } else {
      bestOutcome = outcomePrimary.amount;
      bestFee = outcomePrimary.fee;
      bestRewards = outcomePrimary.rewards;
      bestDistribution = [
        {
          market: primaryMarket,
          amount,
        },
      ];
    }
  }

  // check xyk only result regardless of split, because it might be better
  const outcomeSecondary = xykQuote(inputReserves, outputReserves, amount, isDesiredInput, isBaseAssetInput);

  if (isBetter(isDesiredInput, outcomeSecondary.amount, bestOutcome)) {
    bestOutcome = outcomeSecondary.amount;
    bestFee = outcomeSecondary.fee;
    bestRewards = outcomeSecondary.rewards;
    bestDistribution = [
      {
        market: LiquiditySourceTypes.XYKPool,
        amount,
      },
    ];
  }

  if (FPNumber.isEqualTo(bestOutcome, Consts.MAX)) {
    bestOutcome = FPNumber.ZERO;
    bestFee = FPNumber.ZERO;
    bestRewards = [];
  }

  return {
    amount: bestOutcome,
    fee: bestFee,
    rewards: bestRewards,
    distribution: bestDistribution,
  };
};

/**
 * Computes the optimal distribution across available liquidity sources to exectute the requested trade
 * given the input and output assets, the trade amount and a liquidity sources filter.
 */
const quoteSingle = (
  inputAsset: string,
  outputAsset: string,
  amount: FPNumber,
  isDesiredInput: boolean,
  selectedSources: Array<LiquiditySourceTypes>,
  paths: QuotePaths,
  payload: QuotePayload,
  dexBaseAsset = Consts.XOR
): QuoteResult => {
  const sources = listLiquiditySources(inputAsset, outputAsset, selectedSources, paths, dexBaseAsset);

  if (!sources.length) {
    throw new Error(`[liquidityProxy] Path doesn't exist: [${inputAsset}, ${outputAsset}]`);
  }

  if (sources.length === 1) {
    switch (sources[0]) {
      case LiquiditySourceTypes.XYKPool: {
        const [inputReserves, outputReserves] = getXykReserves(inputAsset, outputAsset, payload, dexBaseAsset);
        const isBaseAssetInput = isAssetAddress(inputAsset, dexBaseAsset);
        return xykQuote(inputReserves, outputReserves, amount, isDesiredInput, isBaseAssetInput);
      }
      case LiquiditySourceTypes.MulticollateralBondingCurvePool: {
        return tbcQuote(inputAsset, outputAsset, amount, isDesiredInput, payload);
      }
      case LiquiditySourceTypes.XSTPool: {
        return xstQuote(inputAsset, amount, isDesiredInput, payload);
      }
      default: {
        throw new Error(`[liquidityProxy] Unexpected liquidity source: ${sources[0]}`);
      }
    }
  }

  if (sources.length === 2) {
    if (
      sources.includes(LiquiditySourceTypes.XYKPool) &&
      (sources.includes(LiquiditySourceTypes.MulticollateralBondingCurvePool) ||
        sources.includes(LiquiditySourceTypes.XSTPool))
    ) {
      return smartSplit(inputAsset, outputAsset, amount, isDesiredInput, payload, dexBaseAsset);
    }
  }

  throw new Error('[liquidityProxy] Unsupported operation');
};

// ROUTER
const determine = (
  baseAssetId: string,
  syntheticBaseAssetId: string,
  syntheticAssets: string[],
  assetId: string
): AssetType => {
  if (assetId === baseAssetId) {
    return AssetType.Base;
  } else if (assetId == syntheticBaseAssetId) {
    return AssetType.SyntheticBase;
  } else if (syntheticAssets.includes(assetId)) {
    return AssetType.Synthetic;
  } else {
    return AssetType.Basic;
  }
};

const newTrivial = (
  baseAssetId: string,
  syntheticBaseAssetId: string,
  syntheticAssets: string[],
  inputAssetId: string,
  outputAssetId: string
) => {
  const iType = determine(baseAssetId, syntheticBaseAssetId, syntheticAssets, inputAssetId);
  const oType = determine(baseAssetId, syntheticBaseAssetId, syntheticAssets, outputAssetId);

  if (
    (iType === AssetType.Base && oType === AssetType.Basic) ||
    (iType === AssetType.Basic && oType === AssetType.Base) ||
    (iType === AssetType.Base && oType === AssetType.SyntheticBase) ||
    (iType === AssetType.SyntheticBase && oType === AssetType.Base) ||
    (iType === AssetType.SyntheticBase && oType === AssetType.Synthetic) ||
    (iType === AssetType.Synthetic && oType === AssetType.SyntheticBase)
  ) {
    return [[inputAssetId, outputAssetId]];
  } else if (
    (iType === AssetType.Basic && oType === AssetType.Basic) ||
    (iType === AssetType.SyntheticBase && oType === AssetType.Basic) ||
    (iType === AssetType.Basic && oType === AssetType.SyntheticBase)
  ) {
    return [[inputAssetId, baseAssetId, outputAssetId]];
  } else if (iType === AssetType.Synthetic && oType === AssetType.Synthetic) {
    return [
      [inputAssetId, syntheticBaseAssetId, outputAssetId],
      [inputAssetId, baseAssetId, outputAssetId],
    ];
  } else if (
    (iType === AssetType.Base && oType === AssetType.Synthetic) ||
    (iType === AssetType.Synthetic && oType === AssetType.Base)
  ) {
    return [
      [inputAssetId, outputAssetId],
      [inputAssetId, syntheticBaseAssetId, outputAssetId],
    ];
  } else if (iType === AssetType.Basic && oType === AssetType.Synthetic) {
    return [
      [inputAssetId, baseAssetId, syntheticBaseAssetId, outputAssetId],
      [inputAssetId, baseAssetId, outputAssetId],
    ];
  } else if (iType === AssetType.Synthetic && oType === AssetType.Basic) {
    return [
      [inputAssetId, syntheticBaseAssetId, baseAssetId, outputAssetId],
      [inputAssetId, baseAssetId, outputAssetId],
    ];
  }

  return [];
};

export const isDirectExchange = (inputAssetId: string, outputAssetId: string, dexBaseAsset = Consts.XOR): boolean => {
  return [inputAssetId, outputAssetId].includes(dexBaseAsset);
};

const getNotBaseAsset = (inputAsset: string, outputAsset: string, dexBaseAsset = Consts.XOR): string => {
  return isAssetAddress(inputAsset, dexBaseAsset) ? outputAsset : inputAsset;
};

const getAssetPaths = (assetAddress: string, paths: QuotePaths): Array<LiquiditySourceTypes> => {
  return paths[assetAddress] ?? [];
};

// Backend excluded "XYKPool" as liquidity sources for pairs with ASSETS_HAS_XYK_POOL
// So we assume, that "XYKPool" is exists for this pairs
// Whether it is possible to make an exchange, it will be clear from the XYK reserves
const listLiquiditySources = (
  inputAsset: string,
  outputAsset: string,
  selectedSources: Array<LiquiditySourceTypes>,
  paths: QuotePaths,
  dexBaseAsset = Consts.XOR
): Array<LiquiditySourceTypes> => {
  if (selectedSources.length) return selectedSources;
  const notBaseAsset = getNotBaseAsset(inputAsset, outputAsset, dexBaseAsset);
  const assetPaths = getAssetPaths(notBaseAsset, paths);

  const uniqueAddresses = new Set([...Consts.ASSETS_HAS_XYK_POOL, notBaseAsset]);
  const shouldHaveXYK =
    uniqueAddresses.size === Consts.ASSETS_HAS_XYK_POOL.length && !assetPaths.includes(LiquiditySourceTypes.XYKPool);
  const sources = shouldHaveXYK ? [...assetPaths, LiquiditySourceTypes.XYKPool] : assetPaths;

  return sources;
};

export const quote = (
  inputAsset: string,
  outputAsset: string,
  amount: FPNumber,
  isDesiredInput: boolean,
  selectedSources: Array<LiquiditySourceTypes>,
  paths: QuotePaths,
  payload: QuotePayload,
  dexBaseAsset = Consts.XOR,
  dexSyntheticBaseAsset = Consts.XST
): SwapResult => {
  try {
    if (isDirectExchange(inputAsset, outputAsset, dexBaseAsset)) {
      const result = quoteSingle(
        inputAsset,
        outputAsset,
        amount,
        isDesiredInput,
        selectedSources,
        paths,
        payload,
        dexBaseAsset
      );
      const amountWithoutImpact = quoteWithoutImpactSingle(
        inputAsset,
        outputAsset,
        isDesiredInput,
        result.distribution,
        payload,
        dexBaseAsset
      );

      return {
        amount: result.amount.toCodecString(),
        fee: result.fee.toCodecString(),
        rewards: result.rewards,
        amountWithoutImpact: amountWithoutImpact.toCodecString(),
      };
    } else {
      if (isDesiredInput) {
        const firstQuote = quoteSingle(
          inputAsset,
          dexBaseAsset,
          amount,
          isDesiredInput,
          selectedSources,
          paths,
          payload,
          dexBaseAsset
        );
        const secondQuote = quoteSingle(
          dexBaseAsset,
          outputAsset,
          firstQuote.amount,
          isDesiredInput,
          selectedSources,
          paths,
          payload,
          dexBaseAsset
        );

        const firstQuoteWithoutImpact = quoteWithoutImpactSingle(
          inputAsset,
          dexBaseAsset,
          isDesiredInput,
          firstQuote.distribution,
          payload,
          dexBaseAsset
        );

        const ratioToActual = safeDivide(firstQuoteWithoutImpact, firstQuote.amount);

        // multiply all amounts in second distribution to adjust to first quote without impact:
        const secondQuoteDistribution = secondQuote.distribution.map(({ market, amount }) => ({
          market,
          amount: amount.mul(ratioToActual),
        }));

        const secondQuoteWithoutImpact = quoteWithoutImpactSingle(
          dexBaseAsset,
          outputAsset,
          isDesiredInput,
          secondQuoteDistribution,
          payload,
          dexBaseAsset
        );

        return {
          amount: secondQuote.amount.toCodecString(),
          fee: firstQuote.fee.add(secondQuote.fee).toCodecString(),
          rewards: [...firstQuote.rewards, ...secondQuote.rewards],
          amountWithoutImpact: secondQuoteWithoutImpact.toCodecString(),
        };
      } else {
        const secondQuote = quoteSingle(
          dexBaseAsset,
          outputAsset,
          amount,
          isDesiredInput,
          selectedSources,
          paths,
          payload,
          dexBaseAsset
        );
        const firstQuote = quoteSingle(
          inputAsset,
          dexBaseAsset,
          secondQuote.amount,
          isDesiredInput,
          selectedSources,
          paths,
          payload,
          dexBaseAsset
        );

        const secondQuoteWithoutImpact = quoteWithoutImpactSingle(
          dexBaseAsset,
          outputAsset,
          isDesiredInput,
          secondQuote.distribution,
          payload,
          dexBaseAsset
        );

        const ratioToActual = safeDivide(secondQuoteWithoutImpact, secondQuote.amount);

        // multiply all amounts in first distribution to adjust to second quote without impact:
        const firstQuoteDistribution = firstQuote.distribution.map(({ market, amount }) => ({
          market,
          amount: amount.mul(ratioToActual),
        }));

        const firstQuoteWithoutImpact = quoteWithoutImpactSingle(
          inputAsset,
          dexBaseAsset,
          isDesiredInput,
          firstQuoteDistribution,
          payload,
          dexBaseAsset
        );

        return {
          amount: firstQuote.amount.toCodecString(),
          fee: firstQuote.fee.add(secondQuote.fee).toCodecString(),
          rewards: [...firstQuote.rewards, ...secondQuote.rewards],
          amountWithoutImpact: firstQuoteWithoutImpact.toCodecString(),
        };
      }
    }
  } catch (error) {
    return {
      amount: ZeroString,
      fee: ZeroString,
      rewards: [],
      amountWithoutImpact: ZeroString,
    };
  }
};

// PRICE IMPACT
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

const tbcBuyPriceNoVolume = (collateralAsset: string, payload: QuotePayload): FPNumber => {
  const xorPrice = tbcBuyFunction(FPNumber.ZERO, payload);
  const collateralPrice = tbcReferencePrice(collateralAsset, payload, PriceVariant.Sell);

  return safeDivide(xorPrice, collateralPrice);
};

const tbcSellPriceNoVolume = (collateralAsset: string, payload: QuotePayload): FPNumber => {
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

const quoteWithoutImpactSingle = (
  inputAsset: string,
  outputAsset: string,
  isDesiredInput: boolean,
  distribution: Array<Distribution>,
  payload: QuotePayload,
  dexBaseAsset = Consts.XOR
): FPNumber => {
  return distribution.reduce((result, item) => {
    let value = FPNumber.ZERO;
    const { market, amount } = item;

    if (market === LiquiditySourceTypes.XYKPool) {
      const [inputReserves, outputReserves] = getXykReserves(inputAsset, outputAsset, payload, dexBaseAsset);
      value = xykQuoteWithoutImpact(
        inputReserves,
        outputReserves,
        amount,
        isDesiredInput,
        isAssetAddress(inputAsset, dexBaseAsset)
      );
    } else if (market === LiquiditySourceTypes.MulticollateralBondingCurvePool) {
      value = tbcQuoteWithoutImpact(inputAsset, outputAsset, amount, isDesiredInput, payload);
    } else if (market === LiquiditySourceTypes.XSTPool) {
      value = xstQuoteWithoutImpact(inputAsset, amount, isDesiredInput, payload);
    }

    return result.add(value);
  }, FPNumber.ZERO);
};

// REWARDS

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
