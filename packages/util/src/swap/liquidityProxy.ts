import { XOR } from '../assets';
import { LiquiditySourceTypes } from '../swap';
import { RewardReason } from '../rewards';
import { FPNumber } from '../fp';
import { SwapConsts as Consts } from './consts';

import type { CodecString } from '../fp';
import type { LPRewardsInfo } from '../rewards';
import type { SwapResult } from '../swap';
import type { Asset } from '../assets';
import type { QuotePayload, QuoteResult, QuotePrimaryMarketResult, QuotePaths, Distribution } from './types';

// UTILS
const toFp = (item: CodecString): FPNumber => FPNumber.fromCodecValue(item);
const getMaxPositive = (value: FPNumber) => FPNumber.max(value, FPNumber.ZERO);
const isGreaterThanZero = (value: FPNumber) => FPNumber.isGreaterThan(value, FPNumber.ZERO);
const isLessThanOrEqualToZero = (value: FPNumber) => FPNumber.isLessThanOrEqualTo(value, FPNumber.ZERO);
const isAsset = (a: Asset, b: Asset) => a.address === b.address;
const isXorAsset = (asset: Asset) => isAsset(asset, XOR);

// returs reserves by order: inputAssetId, outputAssetId
export const getXykReserves = (inputAsset: Asset, outputAsset: Asset, payload: QuotePayload): [FPNumber, FPNumber] => {
  const isXorInput = isXorAsset(inputAsset);
  const nonXor = isXorInput ? outputAsset.address : inputAsset.address;
  const reserves = [...payload.reserves.xyk[nonXor]];
  const [input, output] = isXorInput ? reserves : reserves.reverse();

  return [toFp(input), toFp(output)];
};

const safeDivide = (value: FPNumber, divider: FPNumber): FPNumber => {
  if (divider.isZero() || divider.isNaN()) {
    throw new Error(`[liquidityProxy] Division error: ${value.toString()} / ${divider.toString()}`)
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
const tbcReferencePrice = (asset: Asset, payload: QuotePayload): FPNumber => {
  if (isAsset(asset, Consts.DAI)) {
    return Consts.ONE;
  } else {
    const xorPrice = FPNumber.fromCodecValue(payload.prices[XOR.address]);
    const assetPrice = FPNumber.fromCodecValue(payload.prices[asset.address]);

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
  const xstusdIssuance = FPNumber.fromCodecValue(payload.issuances[Consts.XSTUSD.address]);
  const xorIssuance = FPNumber.fromCodecValue(payload.issuances[XOR.address]);
  const xorPrice = FPNumber.fromCodecValue(payload.prices[XOR.address]);
  const xstXorLiability = safeDivide(xstusdIssuance, xorPrice);
  return safeDivide(xorIssuance.add(xstXorLiability).add(delta), Consts.PRICE_CHANGE_COEFF).add(Consts.INITIAL_PRICE);
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

  return buyFunctionResult.mul(Consts.SELL_PRICE_COEFF);
};

/**
 * Calculate USD price for all XOR in network, this is done by applying ideal sell function to XOR total supply.
 * `delta` is a XOR supply offset from current total supply.
 * 
 * `((initial_price + current_state) / 2) * (xor_issuance + delta)`
 */
const idealReservesReferencePrice = (delta: FPNumber, payload: QuotePayload): FPNumber => {
  const xorIssuance = FPNumber.fromCodecValue(payload.issuances[XOR.address]);
  const currentState = tbcBuyFunction(delta, payload);

  return safeDivide(Consts.INITIAL_PRICE.add(currentState), new FPNumber(2)).mul(xorIssuance.add(delta));
};

/**
 * Calculate USD price for single collateral asset that is stored in reserves account. In other words, find out how much
 * reserves worth, considering only one asset type.
 */
const actualReservesReferencePrice = (collateralAsset: Asset, payload: QuotePayload): FPNumber => {
  const reserve = FPNumber.fromCodecValue(payload.reserves.tbc[collateralAsset.address]);
  const price = tbcReferencePrice(collateralAsset, payload);

  return reserve.mul(price);
};

/**
 * Mapping that defines ratio of fee penalty applied for selling XOR with
 * low collateralized reserves.
 */
const mapCollateralizedFractionToPenalty = (fraction: FPNumber): FPNumber => {
  if (FPNumber.isLessThan(fraction, new FPNumber(0.05))) {
    return new FPNumber(0.09);
  } else if (FPNumber.isGreaterThanOrEqualTo(fraction, new FPNumber(0.05)) && FPNumber.isLessThan(fraction, new FPNumber(0.1))) {
    return new FPNumber(0.06);
  } else if (FPNumber.isGreaterThanOrEqualTo(fraction, new FPNumber(0.1)) && FPNumber.isLessThan(fraction, new FPNumber(0.2))) {
    return new FPNumber(0.03);
  } else if (FPNumber.isGreaterThanOrEqualTo(fraction, new FPNumber(0.2)) && FPNumber.isLessThan(fraction, new FPNumber(0.3))) {
    return new FPNumber(0.01);
  } else {
    return FPNumber.ZERO;
  }
};

/**
 * Calculate ratio of fee penalty that is applied to trades when XOR is sold while
 * reserves are low for target collateral asset.
 */
const sellPenalty = (collateralAsset: Asset, payload: QuotePayload): FPNumber => {
  const idealReservesPrice = idealReservesReferencePrice(FPNumber.ZERO, payload);
  const collateralReservesPrice = actualReservesReferencePrice(collateralAsset, payload);

  if (collateralReservesPrice.isZero()) {
    throw new Error(`[liquidityProxy] TBC: Not enough collateral reserves ${collateralAsset.address}`);
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
  collateralAsset: Asset,
  amount: FPNumber,
  isDesiredInput: boolean,
  payload: QuotePayload
): FPNumber => {
  const collateralSupply = FPNumber.fromCodecValue(payload.reserves.tbc[collateralAsset.address]);
  const xorPrice = tbcSellFunction(FPNumber.ZERO, payload);
  const collateralPrice = tbcReferencePrice(collateralAsset, payload);
  const xorSupply = safeDivide(collateralSupply.mul(collateralPrice), xorPrice);

  if (isDesiredInput) {
    const outputCollateral = safeDivide(amount.mul(collateralSupply), xorSupply.add(amount));

    if (FPNumber.isGreaterThan(outputCollateral, collateralSupply)) {
      throw new Error(`[liquidityProxy] TBC: Not enough collateral reserves ${collateralAsset.address}`);
    }

    return outputCollateral;
  } else {
    if (FPNumber.isGreaterThan(amount, collateralSupply)) {
      throw new Error(`[liquidityProxy] TBC: Not enough collateral reserves ${collateralAsset.address}`);
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
  collateralAsset: Asset,
  amount: FPNumber,
  isDesiredInput: boolean,
  payload: QuotePayload
): FPNumber => {
  const currentState = tbcBuyFunction(FPNumber.ZERO, payload);
  const collateralPrice = tbcReferencePrice(collateralAsset, payload);

  if (isDesiredInput) {
    const collateralReferenceIn = collateralPrice.mul(amount);
    const underPow = currentState.mul(Consts.PRICE_CHANGE_COEFF).mul(new FPNumber(2));
    const underSqrt = underPow.mul(underPow).add(new FPNumber(8).mul(Consts.PRICE_CHANGE_COEFF).mul(collateralReferenceIn));
    const xorOut = safeDivide(underSqrt.sqrt(), new FPNumber(2)).sub(Consts.PRICE_CHANGE_COEFF.mul(currentState));
    return getMaxPositive(xorOut);
  } else {
    const newState = tbcBuyFunction(amount, payload);
    const collateralReferenceIn = safeDivide(currentState.add(newState).mul(amount), new FPNumber(2));
    const collateralQuantity = safeDivide(collateralReferenceIn, collateralPrice);
    return getMaxPositive(collateralQuantity);
  }
};

const tbcSellPriceWithFee = (
  collateralAsset: Asset,
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
    const inputAmountWithFee = safeDivide(inputAmount, Consts.ONE.sub(newFee));

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
  collateralAsset: Asset,
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
    const amountWithFee = safeDivide(amount, Consts.ONE.sub(Consts.TBC_FEE));
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

const tbcQuote = (
  inputAsset: Asset,
  outputAsset: Asset,
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
const xstReferencePrice = (asset: Asset, payload: QuotePayload): FPNumber => {
  if ([Consts.DAI.address, Consts.XSTUSD.address].includes(asset.address)) {
    return Consts.ONE;
  } else {
    const avgPrice = FPNumber.fromCodecValue(payload.prices[asset.address]);

    if (isXorAsset(asset)) {
      return FPNumber.max(avgPrice, FPNumber.HUNDRED);
    }

    return avgPrice;
  }
};

const xstBuyPriceNoVolume = (syntheticAsset: Asset, payload: QuotePayload): FPNumber => {
  const xorPrice = xstReferencePrice(XOR, payload);
  const syntheticPrice = xstReferencePrice(syntheticAsset, payload);

  return safeDivide(xorPrice, syntheticPrice);
};

const xstSellPriceNoVolume = (syntheticAsset: Asset, payload: QuotePayload): FPNumber => {
  const xorPrice = xstReferencePrice(XOR, payload);
  const syntheticPrice = xstReferencePrice(syntheticAsset, payload);

  return safeDivide(xorPrice, syntheticPrice);
};

const xstBuyPrice = (amount: FPNumber, isDesiredInput: boolean, payload: QuotePayload): FPNumber => {
  const xorPrice = xstReferencePrice(XOR, payload);

  if (isDesiredInput) {
    return safeDivide(amount, xorPrice);
  } else {
    return amount.mul(xorPrice);
  }
};

const xstSellPrice = (amount: FPNumber, isDesiredInput: boolean, payload: QuotePayload): FPNumber => {
  const xorPrice = xstReferencePrice(XOR, payload);

  if (isDesiredInput) {
    return amount.mul(xorPrice);
  } else {
    return safeDivide(amount, xorPrice);
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
    const fpFee = Consts.ONE.sub(Consts.XST_FEE);
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
    const inputAmountWithFee = safeDivide(inputAmount, Consts.ONE.sub(Consts.XST_FEE));

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

const xstQuote = (
  inputAsset: Asset,
  amount: FPNumber,
  isDesiredInput: boolean,
  payload: QuotePayload
): QuoteResult => {
  try {
    if (isXorAsset(inputAsset)) {
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
 * Input token is xor, user indicates desired input amount
 * @param x - xor reserve
 * @param y - other token reserve
 * @param xIn x_in - desired input amount (xor)
 * @returns QuoteResult
 */
const xykQuoteA = (x: FPNumber, y: FPNumber, xIn: FPNumber): QuoteResult => {
  const x1 = xIn.mul(Consts.ONE.sub(Consts.XYK_FEE));
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
 * Output token is xor, user indicates desired input amount
 * @param x - other token reserve
 * @param y - xor reserve
 * @param xIn - desired input amount (other token)
 * @returns QuoteResult
 */
const xykQuoteB = (x: FPNumber, y: FPNumber, xIn: FPNumber): QuoteResult => {
  const y1 = safeDivide(xIn.mul(y), x.add(xIn));
  const yOut = y1.mul(Consts.ONE.sub(Consts.XYK_FEE));

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
 * Input token is xor, user indicates desired output amount
 * @param x - xor reserve
 * @param y - other token reserve
 * @param yOut - desired output amount (other token)
 * @returns QuoteResult
 */
const xykQuoteC = (x: FPNumber, y: FPNumber, yOut: FPNumber): QuoteResult => {
  if (FPNumber.isGreaterThanOrEqualTo(yOut, y)) {
    throw new Error(`[liquidityProxy] xykQuote: output amount ${yOut.toString()} is larger than reserves ${y.toString()}. `);
  }

  const x1 = safeDivide(x.mul(yOut), y.sub(yOut));
  const xIn = safeDivide(x1, Consts.ONE.sub(Consts.XYK_FEE));

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
 * Output token is xor, user indicates desired output amount
 * @param x - other token reserve
 * @param y - xor reserve
 * @param yOut - desired output amount (xor)
 * @returns QuoteResult
 */
const xykQuoteD = (x: FPNumber, y: FPNumber, yOut: FPNumber): QuoteResult => {
  const y1 = safeDivide(yOut, Consts.ONE.sub(Consts.XYK_FEE));

  if (FPNumber.isGreaterThanOrEqualTo(y1, y)) {
    throw new Error(`[liquidityProxy] xykQuote: output amount ${y1.toString()} is larger than reserves ${y.toString()}.`);
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

const xykQuote = (
  inputReserves: FPNumber,
  outputReserves: FPNumber,
  amount: FPNumber,
  isDesiredInput: boolean,
  isXorInput: boolean
): QuoteResult => {
  try {
    if (isDesiredInput) {
      if (isXorInput) {
        return xykQuoteA(inputReserves, outputReserves, amount);
      } else {
        return xykQuoteB(inputReserves, outputReserves, amount);
      }
    } else {
      if (isXorInput) {
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
  inputAsset: Asset,
  outputAsset: Asset,
  amount: FPNumber,
  isDesiredInput: boolean,
  payload: QuotePayload
): QuotePrimaryMarketResult => {
  if ([inputAsset.address, outputAsset.address].includes(Consts.XSTUSD.address)) {
    return {
      result: xstQuote(inputAsset, amount, isDesiredInput, payload),
      market: LiquiditySourceTypes.XSTPool,
    };
  } else {
    return {
      result: tbcQuote(inputAsset, outputAsset, amount, isDesiredInput, payload),
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
  collateralAsset: Asset,
  amount: FPNumber,
  isDesiredInput: boolean,
  xorReserve: FPNumber,
  otherReserve: FPNumber,
  payload: QuotePayload
): FPNumber => {
  try {
    const secondaryPrice = isGreaterThanZero(xorReserve)
      ? safeDivide(otherReserve, xorReserve)
      : Consts.MAX;

    const primaryBuyPrice = isAsset(collateralAsset, Consts.XSTUSD)
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
  collateralAsset: Asset,
  amount: FPNumber,
  isDesiredInput: boolean,
  xorReserve: FPNumber,
  otherReserve: FPNumber,
  payload: QuotePayload
): FPNumber => {
  try {
    const secondaryPrice = isGreaterThanZero(xorReserve)
      ? safeDivide(otherReserve, xorReserve)
      : FPNumber.ZERO;

    const primarySellPrice = isAsset(collateralAsset, Consts.XSTUSD)
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
    return (
      isGreaterThanZero(amountA) && (amountB.isZero() || FPNumber.isLessThan(amountA, amountB))
    );
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
  inputAsset: Asset,
  outputAsset: Asset,
  amount: FPNumber,
  isDesiredInput: boolean,
  payload: QuotePayload
): QuoteResult => {
  let bestOutcome: FPNumber = extremum(isDesiredInput);
  let bestFee: FPNumber = FPNumber.ZERO;
  let bestDistribution: Array<any> = [];
  let bestRewards: Array<LPRewardsInfo> = [];

  const isXorInput = isXorAsset(inputAsset);
  const [inputReserves, outputReserves] = getXykReserves(inputAsset, outputAsset, payload);
  const [xorReserve, otherReserve] = isXorInput ? [inputReserves, outputReserves] : [outputReserves, inputReserves];

  const primaryAmount = isXorInput
    ? primaryMarketAmountSellingXor(outputAsset, amount, isDesiredInput, xorReserve, otherReserve, payload)
    : primaryMarketAmountBuyingXor(inputAsset, amount, isDesiredInput, xorReserve, otherReserve, payload);

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
        isXorInput
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
  const outcomeSecondary = xykQuote(inputReserves, outputReserves, amount, isDesiredInput, isXorInput);

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
  inputAsset: Asset,
  outputAsset: Asset,
  amount: FPNumber,
  isDesiredInput: boolean,
  selectedSources: Array<LiquiditySourceTypes>,
  paths: QuotePaths,
  payload: QuotePayload
): QuoteResult => {
  const sources = listLiquiditySources(inputAsset, outputAsset, selectedSources, paths);

  if (!sources.length) {
    throw new Error(`[liquidityProxy] Path doesn't exist: [${inputAsset.address}, ${outputAsset.address}]`);
  }

  if (sources.length === 1) {
    switch (sources[0]) {
      case LiquiditySourceTypes.XYKPool: {
        const [inputReserves, outputReserves] = getXykReserves(inputAsset, outputAsset, payload);
        const isXorInput = isXorAsset(inputAsset);
        return xykQuote(inputReserves, outputReserves, amount, isDesiredInput, isXorInput);
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
  } else if (sources.length === 2) {
    if (
      sources.includes(LiquiditySourceTypes.XYKPool) &&
      (sources.includes(LiquiditySourceTypes.MulticollateralBondingCurvePool) ||
        sources.includes(LiquiditySourceTypes.XSTPool))
    ) {
      return smartSplit(inputAsset, outputAsset, amount, isDesiredInput, payload);
    } else {
      throw new Error('[liquidityProxy] Unsupported operation');
    }
  } else {
    throw new Error('[liquidityProxy] Unsupported operation');
  }
};

// ROUTER
export const isDirectExchange = (inputAssetId: string, outputAssetId: string): boolean => {
  return [inputAssetId, outputAssetId].includes(XOR.address);
};

const getNotXor = (inputAsset: Asset, outputAsset: Asset): Asset => {
  return isXorAsset(inputAsset) ? outputAsset : inputAsset;
};

const getAssetPaths = (asset: Asset, paths: QuotePaths): Array<LiquiditySourceTypes> => {
  return paths[asset.address] ?? [];
};

// Backend excluded "XYKPool" as liquidity sources for pairs with ASSETS_HAS_XYK_POOL
// So we assume, that "XYKPool" is exists for this pairs
// Whether it is possible to make an exchange, it will be clear from the XYK reserves
const listLiquiditySources = (
  inputAsset: Asset,
  outputAsset: Asset,
  selectedSources: Array<LiquiditySourceTypes>,
  paths: QuotePaths
): Array<LiquiditySourceTypes> => {
  if (selectedSources.length) return selectedSources;
  const notXorAsset = getNotXor(inputAsset, outputAsset);
  const assetPaths = getAssetPaths(notXorAsset, paths);

  const uniqueAddresses = new Set([...Consts.ASSETS_HAS_XYK_POOL, notXorAsset.address]);
  const shouldHaveXYK =
    uniqueAddresses.size === Consts.ASSETS_HAS_XYK_POOL.length && !assetPaths.includes(LiquiditySourceTypes.XYKPool);
  const sources = shouldHaveXYK ? [...assetPaths, LiquiditySourceTypes.XYKPool] : assetPaths;

  return sources;
};

export const quote = (
  inputAsset: Asset,
  outputAsset: Asset,
  value: string,
  isDesiredInput: boolean,
  selectedSources: Array<LiquiditySourceTypes>,
  paths: QuotePaths,
  payload: QuotePayload
): SwapResult => {
  try {
    const valueDecimals = isDesiredInput ? inputAsset.decimals : outputAsset.decimals;
    const amount = FPNumber.fromCodecValue(new FPNumber(value, valueDecimals).toCodecString());

    if (isDirectExchange(inputAsset.address, outputAsset.address)) {
      const result = quoteSingle(inputAsset, outputAsset, amount, isDesiredInput, selectedSources, paths, payload);
      const amountWithoutImpact = quoteWithoutImpactSingle(
        inputAsset,
        outputAsset,
        isDesiredInput,
        result.distribution,
        payload
      );

      return {
        amount: result.amount.toCodecString(),
        fee: result.fee.toCodecString(),
        rewards: result.rewards,
        amountWithoutImpact: amountWithoutImpact.toCodecString(),
      };
    } else {
      if (isDesiredInput) {
        const firstQuote = quoteSingle(inputAsset, XOR, amount, isDesiredInput, selectedSources, paths, payload);
        const secondQuote = quoteSingle(
          XOR,
          outputAsset,
          firstQuote.amount,
          isDesiredInput,
          selectedSources,
          paths,
          payload
        );

        const firstQuoteWithoutImpact = quoteWithoutImpactSingle(
          inputAsset,
          XOR,
          isDesiredInput,
          firstQuote.distribution,
          payload
        );

        const ratioToActual = safeDivide(firstQuoteWithoutImpact, firstQuote.amount);

        // multiply all amounts in second distribution to adjust to first quote without impact:
        const secondQuoteDistribution = secondQuote.distribution.map(({ market, amount }) => ({
          market,
          amount: amount.mul(ratioToActual),
        }));

        const secondQuoteWithoutImpact = quoteWithoutImpactSingle(
          XOR,
          outputAsset,
          isDesiredInput,
          secondQuoteDistribution,
          payload
        );

        return {
          amount: secondQuote.amount.toCodecString(),
          fee: firstQuote.fee.add(secondQuote.fee).toCodecString(),
          rewards: [...firstQuote.rewards, ...secondQuote.rewards],
          amountWithoutImpact: secondQuoteWithoutImpact.toCodecString(),
        };
      } else {
        const secondQuote = quoteSingle(XOR, outputAsset, amount, isDesiredInput, selectedSources, paths, payload);
        const firstQuote = quoteSingle(
          inputAsset,
          XOR,
          secondQuote.amount,
          isDesiredInput,
          selectedSources,
          paths,
          payload
        );

        const secondQuoteWithoutImpact = quoteWithoutImpactSingle(
          XOR,
          outputAsset,
          isDesiredInput,
          secondQuote.distribution,
          payload
        );

        const ratioToActual = safeDivide(secondQuoteWithoutImpact, secondQuote.amount);

        // multiply all amounts in first distribution to adjust to second quote without impact:
        const firstQuoteDistribution = firstQuote.distribution.map(({ market, amount }) => ({
          market,
          amount: amount.mul(ratioToActual),
        }));

        const firstQuoteWithoutImpact = quoteWithoutImpactSingle(
          inputAsset,
          XOR,
          isDesiredInput,
          firstQuoteDistribution,
          payload
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
    console.info(error);

    return {
      amount: FPNumber.ZERO.toCodecString(),
      fee: FPNumber.ZERO.toCodecString(),
      rewards: [],
      amountWithoutImpact: FPNumber.ZERO.toCodecString()
    }
  }
};

// PRICE IMPACT
const xykQuoteWithoutImpact = (
  inputReserves: FPNumber,
  outputReserves: FPNumber,
  amount: FPNumber,
  isDesiredInput: boolean,
  isXorInput: boolean
): FPNumber => {
  try {
    if (isDesiredInput) {
      if (isXorInput) {
        const amountWithoutFee = amount.mul(Consts.ONE.sub(Consts.XYK_FEE));

        return safeDivide(amountWithoutFee.mul(outputReserves), inputReserves);
      } else {
        const amountWithFee = safeDivide(amount.mul(outputReserves), inputReserves);

        return amountWithFee.mul(Consts.ONE.sub(Consts.XYK_FEE));
      }
    } else {
      if (isXorInput) {
        const amountWithoutFee = safeDivide(amount.mul(inputReserves), outputReserves);

        return safeDivide(amountWithoutFee, Consts.ONE.sub(Consts.XYK_FEE));
      } else {
        const amountWithFee = safeDivide(amount, Consts.ONE.sub(Consts.XYK_FEE));

        return safeDivide(amountWithFee.mul(inputReserves), outputReserves);
      }
    }
  } catch (error) {
    return FPNumber.ZERO;
  }
};

const tbcBuyPriceNoVolume = (collateralAsset: Asset, payload: QuotePayload): FPNumber => {
  const xorPrice = tbcBuyFunction(FPNumber.ZERO, payload);
  const collateralPrice = tbcReferencePrice(collateralAsset, payload);

  return safeDivide(xorPrice, collateralPrice);
};

const tbcSellPriceNoVolume = (collateralAsset: Asset, payload: QuotePayload): FPNumber => {
  const xorPrice = tbcSellFunction(FPNumber.ZERO, payload);
  const collateralPrice = tbcReferencePrice(collateralAsset, payload);

  return safeDivide(xorPrice, collateralPrice);
};

const tbcQuoteWithoutImpact = (
  inputAsset: Asset,
  outputAsset: Asset,
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
        const inputAmountWithFee = safeDivide(xorIn, Consts.ONE.sub(newFee));

        return inputAmountWithFee;
      }
    } else {
      const xorPrice = tbcBuyPriceNoVolume(inputAsset, payload);

      if (isDesiredinput) {
        const xorOut = safeDivide(amount, xorPrice);
        const feeAmount = xorOut.mul(Consts.TBC_FEE);

        return xorOut.sub(feeAmount);
      } else {
        const outputAmountWithFee = safeDivide(amount, Consts.ONE.sub(Consts.TBC_FEE));
        const collateralIn = outputAmountWithFee.mul(xorPrice);

        return collateralIn;
      }
    }
  } catch (error) {
    return FPNumber.ZERO;
  }
};

const xstQuoteWithoutImpact = (
  inputAsset: Asset,
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
  inputAsset: Asset,
  outputAsset: Asset,
  isDesiredInput: boolean,
  distribution: Array<Distribution>,
  payload: QuotePayload
): FPNumber => {
  return distribution.reduce((result, item) => {
    const { market, amount } = item;

    if (market === LiquiditySourceTypes.XYKPool) {
      const [inputReserves, outputReserves] = getXykReserves(inputAsset, outputAsset, payload);
      const value = xykQuoteWithoutImpact(inputReserves, outputReserves, amount, isDesiredInput, isXorAsset(inputAsset));

      return result.add(value);
    }
    if (market === LiquiditySourceTypes.MulticollateralBondingCurvePool) {
      const value = tbcQuoteWithoutImpact(inputAsset, outputAsset, amount, isDesiredInput, payload);

      return result.add(value);
    }
    if (market === LiquiditySourceTypes.XSTPool) {
      const value = xstQuoteWithoutImpact(inputAsset, amount, isDesiredInput, payload);
      return result.add(value);
    }

    return result;
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
const checkRewards = (collateralAsset: Asset, xorAmount: FPNumber, payload: QuotePayload): Array<LPRewardsInfo> => {
  if ([Consts.PSWAP.address, Consts.VAL.address].includes(collateralAsset.address)) {
    return [];
  }

  const idealBefore = idealReservesReferencePrice(FPNumber.ZERO, payload);
  const idealAfter = idealReservesReferencePrice(xorAmount, payload);

  const actualBefore = actualReservesReferencePrice(collateralAsset, payload);
  const unfundedLiabilities = idealBefore.sub(actualBefore);

  const a = safeDivide(unfundedLiabilities, idealBefore);
  const b = safeDivide(unfundedLiabilities, idealAfter);

  const mean = safeDivide(a.add(b), new FPNumber(2));
  const amount = safeDivide(a.sub(b).mul(Consts.initialPswapTbcRewardsAmount).mul(mean), Consts.incentivizedCurrenciesNum);

  if (amount.isZero()) {
    return [];
  }

  return [
    {
      amount: amount.toCodecString(),
      currency: Consts.PSWAP.address,
      reason: RewardReason.BuyOnBondingCurve,
    },
  ];
};
