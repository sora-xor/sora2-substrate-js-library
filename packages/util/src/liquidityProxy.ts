import { KnownAssets, KnownSymbols, MaxTotalSupply, XOR as XOR_ASSET } from './assets';
import { LiquiditySourceTypes } from './swap';
import { RewardReason } from './rewards';
import { FPNumber } from './fp';

import type { CodecString } from './fp';
import type { LPRewardsInfo } from './rewards';
import type { SwapResult } from './swap';

const XOR = XOR_ASSET.address;
const PSWAP = KnownAssets.get(KnownSymbols.PSWAP).address;
const VAL = KnownAssets.get(KnownSymbols.VAL).address;
const DAI = KnownAssets.get(KnownSymbols.DAI).address;
const ETH = KnownAssets.get(KnownSymbols.ETH).address;
const XSTUSD = KnownAssets.get(KnownSymbols.XSTUSD).address;

const XYK_FEE = new FPNumber(0.003);
const XST_FEE = new FPNumber(0.007);
const TBC_FEE = new FPNumber(0.003);

const MAX = new FPNumber(MaxTotalSupply);

// TBC
const INITIAL_PRICE = new FPNumber(634);
const PRICE_CHANGE_COEFF = new FPNumber(1337);
const SELL_PRICE_COEFF = new FPNumber(0.8);

// 4 registered - pswap and val which are not incentivized
const incentivizedCurrenciesNum = new FPNumber(2);
// 2.5 billion pswap reserved for tbc rewards
const initialPswapTbcRewardsAmount = new FPNumber(2500000000);

const ASSETS_HAS_XYK_POOL = [PSWAP, VAL, DAI, ETH];
const ONE = new FPNumber(1);

export type QuotePaths = {
  [key: string]: Array<LiquiditySourceTypes>;
};

export type QuotePayload = {
  reserves: {
    xyk: Array<[CodecString, CodecString]>;
    tbc: {
      [key: string]: CodecString;
    };
  };
  prices: {
    [key: string]: CodecString;
  };
  issuances: {
    [key: string]: CodecString;
  };
};

export type Distribution = {
  market: LiquiditySourceTypes;
  amount: FPNumber;
};

export type QuoteResult = {
  amount: FPNumber;
  fee: FPNumber;
  distribution: Array<Distribution>;
  rewards: Array<LPRewardsInfo>;
};

export type QuotePrimaryMarketResult = {
  market: LiquiditySourceTypes;
  result: QuoteResult;
}

// UTILS
const toFp = (item: CodecString): FPNumber => FPNumber.fromCodecValue(item);

const getMaxPositive = (value: FPNumber) => FPNumber.max(value, FPNumber.ZERO);
const isGreaterThanZero = (value: FPNumber) => FPNumber.isGreaterThan(value, FPNumber.ZERO);
const isLessThanOrEqualToZero = (value: FPNumber) => FPNumber.isLessThanOrEqualTo(value, FPNumber.ZERO);

const getXykReservesPositioned = (
  isXorInput: boolean,
  reserves: QuotePayload['reserves']['xyk']
): [CodecString, CodecString] => {
  if (!isXorInput) {
    return [reserves[0][1], reserves[0][0]];
  } else if (reserves.length === 2) {
    return [reserves[1][0], reserves[1][1]];
  } else {
    return [reserves[0][0], reserves[0][1]];
  }
};

const getXykReserves = (inputAssetId: string, payload: QuotePayload): [FPNumber, FPNumber] => {
  const [input, output] = getXykReservesPositioned(inputAssetId === XOR, payload.reserves.xyk);

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
const tbcReferencePrice = (assetId: string, payload: QuotePayload): FPNumber => {
  if (assetId === DAI) {
    return ONE;
  } else {
    const xorPrice = FPNumber.fromCodecValue(payload.prices[XOR]);
    const assetPrice = FPNumber.fromCodecValue(payload.prices[assetId]);

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
  const xstusdIssuance = FPNumber.fromCodecValue(payload.issuances[XSTUSD]);
  const xorIssuance = FPNumber.fromCodecValue(payload.issuances[XOR]);
  const xorPrice = FPNumber.fromCodecValue(payload.prices[XOR]);
  const xstXorLiability = safeDivide(xstusdIssuance, xorPrice);
  return safeDivide(xorIssuance.add(xstXorLiability).add(delta), PRICE_CHANGE_COEFF).add(INITIAL_PRICE);
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

  return buyFunctionResult.mul(SELL_PRICE_COEFF);
};

/**
 * Calculate USD price for all XOR in network, this is done by applying ideal sell function to XOR total supply.
 * `delta` is a XOR supply offset from current total supply.
 * 
 * `((initial_price + current_state) / 2) * (xor_issuance + delta)`
 */
const idealReservesReferencePrice = (delta: FPNumber, payload: QuotePayload): FPNumber => {
  const xorIssuance = FPNumber.fromCodecValue(payload.issuances[XOR]);
  const currentState = tbcBuyFunction(delta, payload);

  return safeDivide(INITIAL_PRICE.add(currentState), new FPNumber(2)).mul(xorIssuance.add(delta));
};

/**
 * Calculate USD price for single collateral asset that is stored in reserves account. In other words, find out how much
 * reserves worth, considering only one asset type.
 */
const actualReservesReferencePrice = (collateralAssetId: string, payload: QuotePayload): FPNumber => {
  const reserve = FPNumber.fromCodecValue(payload.reserves.tbc[collateralAssetId]);
  const price = tbcReferencePrice(collateralAssetId, payload);

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
const sellPenalty = (collateralAssetId: string, payload: QuotePayload): FPNumber => {
  const idealReservesPrice = idealReservesReferencePrice(FPNumber.ZERO, payload);
  const collateralReservesPrice = actualReservesReferencePrice(collateralAssetId, payload);

  if (collateralReservesPrice.isZero()) {
    throw new Error(`[liquidityProxy] TBC: Not enough collateral reserves ${collateralAssetId}`);
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
  collateralAssetId: string,
  amount: FPNumber,
  isDesiredInput: boolean,
  payload: QuotePayload
): FPNumber => {
  const collateralSupply = FPNumber.fromCodecValue(payload.reserves.tbc[collateralAssetId]);
  const xorPrice = tbcSellFunction(FPNumber.ZERO, payload);
  const collateralPrice = tbcReferencePrice(collateralAssetId, payload);
  const xorSupply = safeDivide(collateralSupply.mul(collateralPrice), xorPrice);

  if (isDesiredInput) {
    const outputCollateral = safeDivide(amount.mul(collateralSupply), xorSupply.add(amount));

    if (FPNumber.isGreaterThan(outputCollateral, collateralSupply)) {
      throw new Error(`[liquidityProxy] TBC: Not enough collateral reserves ${collateralAssetId}`);
    }

    return outputCollateral;
  } else {
    if (FPNumber.isGreaterThan(amount, collateralSupply)) {
      throw new Error(`[liquidityProxy] TBC: Not enough collateral reserves ${collateralAssetId}`);
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
  collateralAssetId: string,
  amount: FPNumber,
  isDesiredInput: boolean,
  payload: QuotePayload
): FPNumber => {
  const currentState = tbcBuyFunction(FPNumber.ZERO, payload);
  const collateralPrice = tbcReferencePrice(collateralAssetId, payload);

  if (isDesiredInput) {
    const collateralReferenceIn = collateralPrice.mul(amount);
    const underPow = currentState.mul(PRICE_CHANGE_COEFF).mul(new FPNumber(2));
    const underSqrt = underPow.mul(underPow).add(new FPNumber(8).mul(PRICE_CHANGE_COEFF).mul(collateralReferenceIn));
    const xorOut = safeDivide(underSqrt.sqrt(), new FPNumber(2)).sub(PRICE_CHANGE_COEFF.mul(currentState));
    return getMaxPositive(xorOut);
  } else {
    const newState = tbcBuyFunction(amount, payload);
    const collateralReferenceIn = safeDivide(currentState.add(newState).mul(amount), new FPNumber(2));
    const collateralQuantity = safeDivide(collateralReferenceIn, collateralPrice);
    return getMaxPositive(collateralQuantity);
  }
};

const tbcSellPriceWithFee = (
  collateralAssetId: string,
  amount: FPNumber,
  isDesiredInput: boolean,
  payload: QuotePayload
): QuoteResult => {
  const newFee = TBC_FEE.add(sellPenalty(collateralAssetId, payload));

  if (isDesiredInput) {
    const feeAmount = amount.mul(newFee);
    const outputAmount = tbcSellPrice(collateralAssetId, amount.sub(feeAmount), isDesiredInput, payload);

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
    const inputAmount = tbcSellPrice(collateralAssetId, amount, isDesiredInput, payload);
    const inputAmountWithFee = safeDivide(inputAmount, ONE.sub(newFee));

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
  collateralAssetId: string,
  amount: FPNumber,
  isDesiredInput: boolean,
  payload: QuotePayload
): QuoteResult => {
  if (isDesiredInput) {
    const outputAmount = tbcBuyPrice(collateralAssetId, amount, isDesiredInput, payload);
    const feeAmount = TBC_FEE.mul(outputAmount);
    const output = outputAmount.sub(feeAmount);
    const rewards = checkRewards(collateralAssetId, output, payload);

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
    const amountWithFee = safeDivide(amount, ONE.sub(TBC_FEE));
    const inputAmount = tbcBuyPrice(collateralAssetId, amountWithFee, isDesiredInput, payload);
    const rewards = checkRewards(collateralAssetId, amount, payload);

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
  inputAssetId: string,
  outputAssetId: string,
  amount: FPNumber,
  isDesiredInput: boolean,
  payload: QuotePayload
): QuoteResult => {
  try {
    if (inputAssetId === XOR) {
      return tbcSellPriceWithFee(outputAssetId, amount, isDesiredInput, payload);
    } else {
      return tbcBuyPriceWithFee(inputAssetId, amount, isDesiredInput, payload);
    }
  } catch (error) {
    return safeQuoteResult(amount, LiquiditySourceTypes.MulticollateralBondingCurvePool);
  }
};

// XST quote
const xstReferencePrice = (assetId: string, payload: QuotePayload): FPNumber => {
  if ([DAI, XSTUSD].includes(assetId)) {
    return ONE;
  } else {
    const avgPrice = FPNumber.fromCodecValue(payload.prices[assetId]);

    if (assetId === XOR) {
      return FPNumber.max(avgPrice, FPNumber.HUNDRED);
    }

    return avgPrice;
  }
};

const xstBuyPriceNoVolume = (syntheticAssetId: string, payload: QuotePayload): FPNumber => {
  const xorPrice = xstReferencePrice(XOR, payload);
  const syntheticPrice = xstReferencePrice(syntheticAssetId, payload);

  return safeDivide(xorPrice, syntheticPrice);
};

const xstSellPriceNoVolume = (syntheticAssetId: string, payload: QuotePayload): FPNumber => {
  const xorPrice = xstReferencePrice(XOR, payload);
  const syntheticPrice = xstReferencePrice(syntheticAssetId, payload);

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
    const feeAmount = XST_FEE.mul(outputAmount);
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
    const fpFee = ONE.sub(XST_FEE);
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
    const feeAmount = amount.mul(XST_FEE);
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
    const inputAmountWithFee = safeDivide(inputAmount, ONE.sub(XST_FEE));

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
  inputAssetId: string,
  amount: FPNumber,
  isDesiredInput: boolean,
  payload: QuotePayload
): QuoteResult => {
  try {
    if (inputAssetId === XOR) {
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
  const x1 = xIn.mul(ONE.sub(XYK_FEE));
  const yOut = safeDivide(x1.mul(y), x.add(x1));

  return {
    amount: yOut,
    fee: xIn.mul(XYK_FEE),
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
  const yOut = y1.mul(ONE.sub(XYK_FEE));

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
  const xIn = safeDivide(x1, ONE.sub(XYK_FEE));

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
  const y1 = safeDivide(yOut, ONE.sub(XYK_FEE));

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
  inputAssetId: string,
  outputAssetId: string,
  amount: FPNumber,
  isDesiredInput: boolean,
  payload: QuotePayload
): QuotePrimaryMarketResult => {
  if ([inputAssetId, outputAssetId].includes(XSTUSD)) {
    return {
      result: xstQuote(inputAssetId, amount, isDesiredInput, payload),
      market: LiquiditySourceTypes.XSTPool,
    };
  } else {
    return {
      result: tbcQuote(inputAssetId, outputAssetId, amount, isDesiredInput, payload),
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
  collateralAssetId: string,
  amount: FPNumber,
  isDesiredInput: boolean,
  xorReserve: FPNumber,
  otherReserve: FPNumber,
  payload: QuotePayload
): FPNumber => {
  try {
    const secondaryPrice = isGreaterThanZero(xorReserve)
      ? safeDivide(otherReserve, xorReserve)
      : MAX;

    const primaryBuyPrice =
      collateralAssetId === XSTUSD
        ? xstBuyPriceNoVolume(collateralAssetId, payload)
        : tbcBuyPriceNoVolume(collateralAssetId, payload);

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
  collateralAssetId: string,
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

    const primarySellPrice =
      collateralAssetId === XSTUSD
        ? xstSellPriceNoVolume(collateralAssetId, payload)
        : tbcSellPriceNoVolume(collateralAssetId, payload);

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
    return MAX;
  }
};

/**
 * Implements the "smart" split algorithm.
 */
const smartSplit = (
  inputAssetId: string,
  outputAssetId: string,
  amount: FPNumber,
  isDesiredInput: boolean,
  payload: QuotePayload
): QuoteResult => {
  let bestOutcome: FPNumber = extremum(isDesiredInput);
  let bestFee: FPNumber = FPNumber.ZERO;
  let bestDistribution: Array<any> = [];
  let bestRewards: Array<LPRewardsInfo> = [];

  const isXorInput = inputAssetId === XOR;
  const [inputReserves, outputReserves] = getXykReserves(inputAssetId, payload);

  const [xorReserve, otherReserve] = isXorInput ? [inputReserves, outputReserves] : [outputReserves, inputReserves];

  const primaryAmount = isXorInput
    ? primaryMarketAmountSellingXor(outputAssetId, amount, isDesiredInput, xorReserve, otherReserve, payload)
    : primaryMarketAmountBuyingXor(inputAssetId, amount, isDesiredInput, xorReserve, otherReserve, payload);

  if (isGreaterThanZero(primaryAmount)) {
    const { result: outcomePrimary, market: primaryMarket } = quotePrimaryMarket(
      inputAssetId,
      outputAssetId,
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

  if (FPNumber.isEqualTo(bestOutcome, MAX)) {
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
  inputAssetId: string,
  outputAssetId: string,
  amount: FPNumber,
  isDesiredInput: boolean,
  selectedSources: Array<LiquiditySourceTypes>,
  paths: QuotePaths,
  payload: QuotePayload
): QuoteResult => {
  const sources = listLiquiditySources(inputAssetId, outputAssetId, selectedSources, paths);

  if (!sources.length) {
    throw new Error(`[liquidityProxy] Path doesn't exist: [${inputAssetId}, ${outputAssetId}]`);
  }

  if (sources.length === 1) {
    switch (sources[0]) {
      case LiquiditySourceTypes.XYKPool: {
        const [inputReserves, outputReserves] = getXykReserves(inputAssetId, payload);

        return xykQuote(inputReserves, outputReserves, amount, isDesiredInput, inputAssetId === XOR);
      }
      case LiquiditySourceTypes.MulticollateralBondingCurvePool: {
        return tbcQuote(inputAssetId, outputAssetId, amount, isDesiredInput, payload);
      }
      case LiquiditySourceTypes.XSTPool: {
        return xstQuote(inputAssetId, amount, isDesiredInput, payload);
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
      return smartSplit(inputAssetId, outputAssetId, amount, isDesiredInput, payload);
    } else {
      throw new Error('[liquidityProxy] Unsupported operation');
    }
  } else {
    throw new Error('[liquidityProxy] Unsupported operation');
  }
};

// ROUTER
export const isDirectExchange = (inputAssetId: string, outputAssetId: string): boolean => {
  return [inputAssetId, outputAssetId].includes(XOR);
};

const getNotXor = (inputAssetId: string, outputAssetId: string): string => {
  return inputAssetId === XOR ? outputAssetId : inputAssetId;
};

const getAssetPaths = (assetId: string, paths: QuotePaths): Array<LiquiditySourceTypes> => {
  return paths[assetId] ?? [];
};

// Backend excluded "XYKPool" as liquidity sources for pairs with ASSETS_HAS_XYK_POOL
// So we assume, that "XYKPool" is exists for this pairs
// Whether it is possible to make an exchange, it will be clear from the XYK reserves
const listLiquiditySources = (
  inputAssetId: string,
  outputAssetId: string,
  selectedSources: Array<LiquiditySourceTypes>,
  paths: QuotePaths
): Array<LiquiditySourceTypes> => {
  if (selectedSources.length) return selectedSources;
  const notXorAsset = getNotXor(inputAssetId, outputAssetId);
  const assetPaths = getAssetPaths(notXorAsset, paths);

  const uniqueAddresses = new Set([...ASSETS_HAS_XYK_POOL, notXorAsset]);
  const shouldHaveXYK =
    uniqueAddresses.size === ASSETS_HAS_XYK_POOL.length && !assetPaths.includes(LiquiditySourceTypes.XYKPool);
  const sources = shouldHaveXYK ? [...assetPaths, LiquiditySourceTypes.XYKPool] : assetPaths;

  return sources;
};

export const quote = (
  inputAssetId: string,
  outputAssetId: string,
  value: string,
  isDesiredInput: boolean,
  selectedSources: Array<LiquiditySourceTypes>,
  paths: QuotePaths,
  payload: QuotePayload
): SwapResult => {
  try {
    const amount = new FPNumber(value);

    if (isDirectExchange(inputAssetId, outputAssetId)) {
      const result = quoteSingle(inputAssetId, outputAssetId, amount, isDesiredInput, selectedSources, paths, payload);
      const amountWithoutImpact = quoteWithoutImpactSingle(
        inputAssetId,
        outputAssetId,
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
        const firstQuote = quoteSingle(inputAssetId, XOR, amount, isDesiredInput, selectedSources, paths, payload);
        const secondQuote = quoteSingle(
          XOR,
          outputAssetId,
          firstQuote.amount,
          isDesiredInput,
          selectedSources,
          paths,
          payload
        );

        const firstQuoteWithoutImpact = quoteWithoutImpactSingle(
          inputAssetId,
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
          outputAssetId,
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
        const secondQuote = quoteSingle(XOR, outputAssetId, amount, isDesiredInput, selectedSources, paths, payload);
        const firstQuote = quoteSingle(
          inputAssetId,
          XOR,
          secondQuote.amount,
          isDesiredInput,
          selectedSources,
          paths,
          payload
        );

        const secondQuoteWithoutImpact = quoteWithoutImpactSingle(
          XOR,
          outputAssetId,
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
          inputAssetId,
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
    const price = safeDivide(outputReserves, inputReserves);

    if (isDesiredInput) {
      if (isXorInput) {
        const amountWithoutFee = amount.mul(ONE.sub(XYK_FEE));

        return amountWithoutFee.mul(price);
      } else {
        const amountWithFee = amount.mul(price);

        return amountWithFee.mul(ONE.sub(XYK_FEE));
      }
    } else {
      if (isXorInput) {
        const amountWithoutFee = safeDivide(amount, price);

        return safeDivide(amountWithoutFee, ONE.sub(XYK_FEE));
      } else {
        const amountWithFee = safeDivide(amount, ONE.sub(XYK_FEE));

        return safeDivide(amountWithFee, price);
      }
    }
  } catch (error) {
    return FPNumber.ZERO;
  }
};

const tbcBuyPriceNoVolume = (collateralAssetId: string, payload: QuotePayload): FPNumber => {
  const xorPrice = tbcBuyFunction(FPNumber.ZERO, payload);
  const collateralPrice = tbcReferencePrice(collateralAssetId, payload);

  return safeDivide(xorPrice, collateralPrice);
};

const tbcSellPriceNoVolume = (collateralAssetId: string, payload: QuotePayload): FPNumber => {
  const xorPrice = tbcSellFunction(FPNumber.ZERO, payload);
  const collateralPrice = tbcReferencePrice(collateralAssetId, payload);

  return safeDivide(xorPrice, collateralPrice);
};

const tbcQuoteWithoutImpact = (
  inputAssetId: string,
  outputAssetId: string,
  amount: FPNumber,
  isDesiredinput: boolean,
  payload: QuotePayload
): FPNumber => {
  try {
    if (inputAssetId === XOR) {
      const xorPrice = tbcSellPriceNoVolume(outputAssetId, payload);
      const penalty = sellPenalty(outputAssetId, payload);
      const newFee = TBC_FEE.add(penalty);

      if (isDesiredinput) {
        const feeAmount = newFee.mul(amount);
        const collateralOut = amount.sub(feeAmount).mul(xorPrice);

        return collateralOut;
      } else {
        const xorIn = safeDivide(amount, xorPrice);
        const inputAmountWithFee = safeDivide(xorIn, ONE.sub(newFee));

        return inputAmountWithFee;
      }
    } else {
      const xorPrice = tbcBuyPriceNoVolume(inputAssetId, payload);

      if (isDesiredinput) {
        const xorOut = safeDivide(amount, xorPrice);
        const feeAmount = xorOut.mul(TBC_FEE);

        return xorOut.sub(feeAmount);
      } else {
        const outputAmountWithFee = safeDivide(amount, ONE.sub(TBC_FEE));
        const collateralIn = outputAmountWithFee.mul(xorPrice);

        return collateralIn;
      }
    }
  } catch (error) {
    return FPNumber.ZERO;
  }
};

const xstQuoteWithoutImpact = (
  inputAssetId: string,
  amount: FPNumber,
  isDesiredInput: boolean,
  payload: QuotePayload
): FPNumber => {
  try {
    // no impact already
    const quoteResult = xstQuote(inputAssetId, amount, isDesiredInput, payload);

    return quoteResult.amount;
  } catch (error) {
    return FPNumber.ZERO;
  }
};

const quoteWithoutImpactSingle = (
  inputAssetId: string,
  outputAssetId: string,
  isDesiredInput: boolean,
  distribution: Array<Distribution>,
  payload: QuotePayload
): FPNumber => {
  return distribution.reduce((result, item) => {
    const { market, amount } = item;

    if (market === LiquiditySourceTypes.XYKPool) {
      const [inputReserves, outputReserves] = getXykReserves(inputAssetId, payload);
      const value = xykQuoteWithoutImpact(inputReserves, outputReserves, amount, isDesiredInput, inputAssetId === XOR);

      return result.add(value);
    }
    if (market === LiquiditySourceTypes.MulticollateralBondingCurvePool) {
      const value = tbcQuoteWithoutImpact(inputAssetId, outputAssetId, amount, isDesiredInput, payload);

      return result.add(value);
    }
    if (market === LiquiditySourceTypes.XSTPool) {
      const value = xstQuoteWithoutImpact(inputAssetId, amount, isDesiredInput, payload);
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
const checkRewards = (collateralAssetId: string, xorAmount: FPNumber, payload: QuotePayload): Array<LPRewardsInfo> => {
  if ([PSWAP, VAL].includes(collateralAssetId)) {
    return [];
  }

  const idealBefore = idealReservesReferencePrice(FPNumber.ZERO, payload);
  const idealAfter = idealReservesReferencePrice(xorAmount, payload);

  const actualBefore = actualReservesReferencePrice(collateralAssetId, payload);
  const unfundedLiabilities = idealBefore.sub(actualBefore);

  const a = safeDivide(unfundedLiabilities, idealBefore);
  const b = safeDivide(unfundedLiabilities, idealAfter);

  const mean = safeDivide(a.add(b), new FPNumber(2));
  const amount = safeDivide(a.sub(b).mul(initialPswapTbcRewardsAmount).mul(mean), incentivizedCurrenciesNum);

  if (amount.isZero()) {
    return [];
  }

  return [
    {
      amount: amount.toCodecString(),
      currency: PSWAP,
      reason: RewardReason.BuyOnBondingCurve,
    },
  ];
};
