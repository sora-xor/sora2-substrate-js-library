import { FPNumber } from '@sora-substrate/math';
import { LiquiditySourceTypes, Consts, AssetType } from '../../consts';
import { xykQuote, xykQuoteWithoutImpact, getXykReserves } from '../poolXyk';
import {
  tbcQuote,
  tbcQuoteWithoutImpact,
  tbcSellPriceNoVolume,
  tbcBuyPriceNoVolume,
} from '../multicollateralBoundingCurvePool';
import { xstQuote, xstQuoteWithoutImpact, xstSellPriceNoVolume, xstBuyPriceNoVolume } from '../xst';
import {
  isGreaterThanZero,
  isLessThanOrEqualToZero,
  isAssetAddress,
  isBetter,
  extremum,
  intersection,
  matchType,
  safeDivide,
} from '../../utils';

import type {
  QuotePayload,
  QuoteResult,
  QuotePaths,
  QuoteIntermediate,
  Distribution,
  SwapResult,
  LPRewardsInfo,
  PrimaryMarketsEnabledAssets,
  PathsAndPairLiquiditySources,
} from '../../types';

/**
 * Get asset type in terms of exchange nature
 * @param baseAssetId Dex base asset id
 * @param syntheticBaseAssetId Dex synthetic base asset id
 * @param syntheticAssets collateral synthetic assets
 * @param assetId asset to determine
 */
const determine = (
  baseAssetId: string,
  syntheticBaseAssetId: string,
  syntheticAssets: string[],
  assetId: string
): AssetType => {
  if (assetId === baseAssetId) {
    return AssetType.Base;
  } else if (assetId === syntheticBaseAssetId) {
    return AssetType.SyntheticBase;
  } else if (syntheticAssets.includes(assetId)) {
    return AssetType.Synthetic;
  } else {
    return AssetType.Basic;
  }
};

/**
 * Get possible exchange routes between two assets
 * @param baseAssetId Dex base asset id
 * @param syntheticBaseAssetId Dex synthetic base asset id
 * @param syntheticAssets collateral synthetic assets
 * @param inputAssetId input asset id
 * @param outputAssetId output asset id
 */
export const newTrivial = (
  baseAssetId: string,
  syntheticBaseAssetId: string,
  syntheticAssets: string[],
  inputAssetId: string,
  outputAssetId: string
) => {
  const iType = determine(baseAssetId, syntheticBaseAssetId, syntheticAssets, inputAssetId);
  const oType = determine(baseAssetId, syntheticBaseAssetId, syntheticAssets, outputAssetId);

  if (
    matchType(iType, oType)(AssetType.Base, AssetType.Basic, true) ||
    matchType(iType, oType)(AssetType.Base, AssetType.SyntheticBase, true)
  ) {
    return [
      // F.E: XOR-VAL; VAL-XOR; XOR-XST; XST-XOR;
      [inputAssetId, outputAssetId],
    ];
  } else if (matchType(iType, oType)(AssetType.SyntheticBase, AssetType.Synthetic, true)) {
    return [
      // F.E: XST-XSTUSD; XSTUSD-XST;
      [inputAssetId, outputAssetId],
      // F.E: XST-XOR-XSTUSD; XSTUSD-XOR-XST;
      [inputAssetId, baseAssetId, outputAssetId],
    ];
  } else if (
    matchType(iType, oType)(AssetType.Basic, AssetType.Basic) ||
    matchType(iType, oType)(AssetType.Basic, AssetType.SyntheticBase, true)
  ) {
    return [
      // F.E: VAL-XOR-PSWAP; VAL-XOR-XST; XST-XOR-VAL;
      [inputAssetId, baseAssetId, outputAssetId],
    ];
  } else if (matchType(iType, oType)(AssetType.Synthetic, AssetType.Synthetic)) {
    return [
      // F.E: XSTUSD-XST-XSTGPB;
      [inputAssetId, syntheticBaseAssetId, outputAssetId],
      // F.E: XSTUSD-XOR-XSTGPB;
      [inputAssetId, baseAssetId, outputAssetId],
    ];
  } else if (matchType(iType, oType)(AssetType.Base, AssetType.Synthetic, true)) {
    return [
      // F.E: XOR-XSTUSD; XSTUSD-XOR;
      [inputAssetId, outputAssetId],
      // F.E: XOR-XST-XSTUSD; XSTUSD-XST-XOR;
      [inputAssetId, syntheticBaseAssetId, outputAssetId],
    ];
  } else if (matchType(iType, oType)(AssetType.Basic, AssetType.Synthetic)) {
    return [
      // F.E: VAL-XOR-XST-XSTUSD;
      [inputAssetId, baseAssetId, syntheticBaseAssetId, outputAssetId],
      // F.E: VAL-XOR-XSTUSD;
      [inputAssetId, baseAssetId, outputAssetId],
    ];
  } else if (matchType(iType, oType)(AssetType.Synthetic, AssetType.Basic)) {
    return [
      // F.E: XSTUSD-XST-XOR-VAL;
      [inputAssetId, syntheticBaseAssetId, baseAssetId, outputAssetId],
      // F.E: XSTUSD-XOR-VAL;
      [inputAssetId, baseAssetId, outputAssetId],
    ];
  }

  return [];
};

/**
 * Get available list of liquidity sources for the selected asset
 * @param address Asset ID
 * @param payload Quote payload
 * @param enabledAssets Primary markets enabled assets
 * @param baseAssetId Dex base asset id
 * @param syntheticBaseAssetId Dex synthetic base asset id
 */
const getAssetLiquiditySources = (
  address: string,
  xykReserves: QuotePayload['reserves']['xyk'],
  enabledAssets: PrimaryMarketsEnabledAssets,
  baseAssetId: string,
  syntheticBaseAssetId: string
): Array<LiquiditySourceTypes> => {
  const rules = {
    [LiquiditySourceTypes.MulticollateralBondingCurvePool]: () =>
      baseAssetId === Consts.XOR && [...enabledAssets.tbc, Consts.XOR].includes(address),
    [LiquiditySourceTypes.XYKPool]: () =>
      baseAssetId === address || xykReserves[address].every((tokenReserve) => !!Number(tokenReserve)),
    [LiquiditySourceTypes.XSTPool]: () =>
      baseAssetId === Consts.XOR && (address === syntheticBaseAssetId || !!enabledAssets.xst[address]),
  };

  return Object.entries(rules).reduce((acc: LiquiditySourceTypes[], [source, rule]) => {
    if (!enabledAssets.lockedSources.includes(source as LiquiditySourceTypes) && rule()) {
      acc.push(source as LiquiditySourceTypes);
    }
    return acc;
  }, []);
};

/**
 * Liquidity sources for direct exchange between two asssets
 * @param inputAssetId input asset id
 * @param outputAssetId output asset id
 * @param assetPaths liquidity sources for assets
 * @param baseAssetId Dex base asset id
 */
const listLiquiditySources = (
  inputAssetId: string,
  outputAssetId: string,
  assetPaths: QuotePaths,
  baseAssetId: string,
  selectedSources: LiquiditySourceTypes[] = []
): Array<LiquiditySourceTypes> => {
  const getSource = (asset: string) => assetPaths[asset] ?? [];
  const commonSources = intersection(getSource(inputAssetId), getSource(outputAssetId));
  const directSources = commonSources.filter((source) => {
    return (
      source === LiquiditySourceTypes.XSTPool || [inputAssetId, outputAssetId].includes(baseAssetId) // TBC, XYK uses baseAsset
    );
  });

  if (!selectedSources.length) return directSources;

  return directSources.filter((source) => selectedSources.includes(source));
};

/**
 * Get available liquidity sources for the tokens & exchange pair
 */
export const getAssetsLiquiditySources = (
  exchangePaths: string[][],
  enabledAssets: PrimaryMarketsEnabledAssets,
  xykReserves: QuotePayload['reserves']['xyk'],
  baseAssetId: string,
  syntheticBaseAssetId: string
): PathsAndPairLiquiditySources => {
  const assetPaths: QuotePaths = {};
  let liquiditySources: Array<LiquiditySourceTypes> = [];

  for (const exchangePath of exchangePaths) {
    let exchangePathSources: Array<LiquiditySourceTypes> = [];

    exchangePath.forEach((asset, index) => {
      const assetSources = (assetPaths[asset] =
        assetPaths[asset] ||
        getAssetLiquiditySources(asset, xykReserves, enabledAssets, baseAssetId, syntheticBaseAssetId));

      exchangePathSources = index === 0 ? assetSources : intersection(exchangePathSources, assetSources);
    });

    liquiditySources = [...new Set([...liquiditySources, ...exchangePathSources])];
  }

  return { assetPaths, liquiditySources };
};

// AGGREGATOR
const quotePrimaryMarket = (
  baseAssetId: string,
  syntheticBaseAssetId: string,
  inputAssetAddress: string,
  outputAssetAddress: string,
  amount: FPNumber,
  isDesiredInput: boolean,
  payload: QuotePayload,
  deduceFee: boolean
): QuoteResult => {
  if ([inputAssetAddress, outputAssetAddress].includes(Consts.XSTUSD)) {
    return xstQuote(
      baseAssetId,
      syntheticBaseAssetId,
      inputAssetAddress,
      outputAssetAddress,
      amount,
      isDesiredInput,
      payload,
      deduceFee
    );
  } else {
    return tbcQuote(baseAssetId, inputAssetAddress, outputAssetAddress, amount, isDesiredInput, payload, deduceFee);
  }
};

// decide_primary_market_amount_buying_base_asset
const decidePrimaryMarketAmountBuyingBaseAsset = (
  baseAssetId: string,
  syntheticBaseAssetId: string,
  collateralAsset: string,
  amount: FPNumber,
  isDesiredInput: boolean,
  baseReserve: FPNumber,
  otherReserve: FPNumber,
  payload: QuotePayload
): FPNumber => {
  try {
    const secondaryPrice = isGreaterThanZero(baseReserve) ? safeDivide(otherReserve, baseReserve) : Consts.MAX;

    const primaryBuyPrice = isAssetAddress(collateralAsset, Consts.XSTUSD)
      ? xstBuyPriceNoVolume(syntheticBaseAssetId, collateralAsset, payload)
      : tbcBuyPriceNoVolume(baseAssetId, collateralAsset, payload);

    const k = baseReserve.mul(otherReserve);

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
        const amountSecondary = baseReserve.sub(safeDivide(k, primaryBuyPrice).sqrt());

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

// decide_primary_market_amount_selling_base_asset
const decidePrimaryMarketAmountSellingBaseAsset = (
  baseAssetId: string,
  syntheticBaseAssetId: string,
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
      ? xstSellPriceNoVolume(syntheticBaseAssetId, collateralAsset, payload)
      : tbcSellPriceNoVolume(baseAssetId, collateralAsset, payload);

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

// smart_split
const smartSplit = (
  baseAssetId: string,
  syntheticBaseAssetId: string,
  inputAsset: string,
  outputAsset: string,
  amount: FPNumber,
  isDesiredInput: boolean,
  payload: QuotePayload,
  deduceFee: boolean
): QuoteResult => {
  let bestOutcome: FPNumber = extremum(isDesiredInput);
  let bestFee: FPNumber = FPNumber.ZERO;
  let bestDistribution: Array<Distribution> = [];
  let bestRewards: Array<LPRewardsInfo> = [];

  const isBaseAssetInput = isAssetAddress(inputAsset, baseAssetId);
  const [inputReserves, outputReserves] = getXykReserves(inputAsset, outputAsset, payload, baseAssetId);
  const [baseReserve, otherReserve] = isBaseAssetInput
    ? [inputReserves, outputReserves]
    : [outputReserves, inputReserves];

  const primaryAmount = isBaseAssetInput
    ? decidePrimaryMarketAmountSellingBaseAsset(
        baseAssetId,
        syntheticBaseAssetId,
        outputAsset,
        amount,
        isDesiredInput,
        baseReserve,
        otherReserve,
        payload
      )
    : decidePrimaryMarketAmountBuyingBaseAsset(
        baseAssetId,
        syntheticBaseAssetId,
        inputAsset,
        amount,
        isDesiredInput,
        baseReserve,
        otherReserve,
        payload
      );

  if (isGreaterThanZero(primaryAmount)) {
    const outcomePrimary = quotePrimaryMarket(
      baseAssetId,
      syntheticBaseAssetId,
      inputAsset,
      outputAsset,
      primaryAmount,
      isDesiredInput,
      payload,
      deduceFee
    );
    // check that outcomePrimary is not zero
    if (FPNumber.isLessThan(primaryAmount, amount) && !outcomePrimary.amount.isZero()) {
      const incomeSecondary = amount.sub(primaryAmount);
      const outcomeSecondary = xykQuote(
        baseAssetId,
        inputAsset,
        outputAsset,
        incomeSecondary,
        isDesiredInput,
        payload,
        deduceFee
      );

      bestOutcome = outcomePrimary.amount.add(outcomeSecondary.amount);
      bestFee = outcomePrimary.fee.add(outcomeSecondary.fee);
      bestRewards = [...outcomePrimary.rewards, ...outcomeSecondary.rewards];
      bestDistribution = [...outcomeSecondary.distribution, ...outcomePrimary.distribution];
    } else {
      bestOutcome = outcomePrimary.amount;
      bestFee = outcomePrimary.fee;
      bestRewards = outcomePrimary.rewards;
      bestDistribution = outcomePrimary.distribution;
    }
  }

  // check xyk only result regardless of split, because it might be better
  const outcomeSecondary = xykQuote(baseAssetId, inputAsset, outputAsset, amount, isDesiredInput, payload, deduceFee);

  if (isBetter(isDesiredInput, outcomeSecondary.amount, bestOutcome)) {
    bestOutcome = outcomeSecondary.amount;
    bestFee = outcomeSecondary.fee;
    bestRewards = outcomeSecondary.rewards;
    bestDistribution = outcomeSecondary.distribution;
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
  baseAssetId: string,
  syntheticBaseAssetId: string,
  inputAsset: string,
  outputAsset: string,
  amount: FPNumber,
  isDesiredInput: boolean,
  selectedSources: Array<LiquiditySourceTypes>,
  payload: QuotePayload,
  deduceFee: boolean
): QuoteResult => {
  const allSources = listLiquiditySources(
    inputAsset,
    outputAsset,
    payload.sources.assetPaths,
    baseAssetId,
    selectedSources
  );
  const sources = allSources.filter((source) => !payload.enabledAssets.lockedSources.includes(source));

  if (!sources.length) {
    throw new Error(`[liquidityProxy] Path doesn't exist: [${inputAsset}, ${outputAsset}]`);
  }

  if (sources.length === 1) {
    switch (sources[0]) {
      case LiquiditySourceTypes.XYKPool: {
        return xykQuote(baseAssetId, inputAsset, outputAsset, amount, isDesiredInput, payload, deduceFee);
      }
      case LiquiditySourceTypes.MulticollateralBondingCurvePool: {
        return tbcQuote(baseAssetId, inputAsset, outputAsset, amount, isDesiredInput, payload, deduceFee);
      }
      case LiquiditySourceTypes.XSTPool: {
        return xstQuote(
          baseAssetId,
          syntheticBaseAssetId,
          inputAsset,
          outputAsset,
          amount,
          isDesiredInput,
          payload,
          deduceFee
        );
      }
      default: {
        throw new Error(`[liquidityProxy] Unexpected liquidity source: ${sources[0]}`);
      }
    }
  }

  if (sources.length === 2) {
    if (
      sources.includes(LiquiditySourceTypes.XYKPool) &&
      // We can't use XST as primary market for smart split, because it use XST asset as base
      sources.includes(LiquiditySourceTypes.MulticollateralBondingCurvePool)
    ) {
      return smartSplit(
        baseAssetId,
        syntheticBaseAssetId,
        inputAsset,
        outputAsset,
        amount,
        isDesiredInput,
        payload,
        deduceFee
      );
    }
  }

  throw new Error('[liquidityProxy] Unsupported operation');
};

export const quote = (
  inputAsset: string,
  outputAsset: string,
  amount: FPNumber,
  isDesiredInput: boolean,
  selectedSources: Array<LiquiditySourceTypes>,
  payload: QuotePayload,
  deduceFee: boolean,
  baseAssetId = Consts.XOR,
  syntheticBaseAssetId = Consts.XST
): SwapResult => {
  let bestQuote: QuoteIntermediate = {
    amount: FPNumber.ZERO,
    amountWithoutImpact: FPNumber.ZERO,
    fee: FPNumber.ZERO,
    rewards: [],
    route: [],
    distribution: [],
  };

  // directed exchange paths
  const exchangePaths = newTrivial(
    baseAssetId,
    syntheticBaseAssetId,
    Object.keys(payload.enabledAssets.xst),
    inputAsset,
    outputAsset
  );

  const results = exchangePaths.map((exchangePath) => {
    // if isDesiredInput = false, we compute the swaps from output asset to input asset
    const directedPath = isDesiredInput ? exchangePath : exchangePath.slice().reverse();

    try {
      const result = directedPath.reduce<QuoteIntermediate>(
        (buffer, currentAsset) => {
          if (buffer.amount.isZero()) {
            throw new Error('[liquidityProxy]: zero amount received while processing exchange path');
          }

          const { route } = buffer;

          if (route.length) {
            const prevAsset = route[route.length - 1];
            const [assetA, assetB] = isDesiredInput ? [prevAsset, currentAsset] : [currentAsset, prevAsset];

            const result = quoteSingle(
              baseAssetId,
              syntheticBaseAssetId,
              assetA,
              assetB,
              buffer.amount,
              isDesiredInput,
              selectedSources,
              payload,
              deduceFee
            );

            const ratioToActual =
              buffer.amount.isZero() || buffer.amountWithoutImpact.isZero()
                ? FPNumber.ONE
                : safeDivide(buffer.amountWithoutImpact, buffer.amount);

            // multiply all amounts in distribution to adjust prev quote without impact:
            const distributionAmounts = result.distribution.map(({ market, income, outcome }) => ({
              market,
              amount: (isDesiredInput ? income : outcome).mul(ratioToActual),
            }));

            const amountWithoutImpact = quoteWithoutImpactSingle(
              baseAssetId,
              syntheticBaseAssetId,
              assetA,
              assetB,
              isDesiredInput,
              distributionAmounts,
              payload,
              deduceFee
            );

            buffer.amount = result.amount;
            buffer.amountWithoutImpact = amountWithoutImpact;
            buffer.fee = buffer.fee.add(result.fee);
            buffer.rewards.push(...result.rewards);

            if (isDesiredInput) {
              buffer.distribution.push(result.distribution);
            } else {
              buffer.distribution.unshift(result.distribution);
            }
          }

          buffer.route.push(currentAsset);

          return buffer;
        },
        {
          amount,
          amountWithoutImpact: FPNumber.ZERO,
          fee: FPNumber.ZERO,
          rewards: [],
          route: [],
          distribution: [],
        }
      );

      return {
        ...result,
        // return real exchange route
        route: exchangePath,
      };
    } catch (error) {
      return {
        ...bestQuote,
        // return real exchange route
        route: exchangePath,
      };
    }
  });

  for (const result of results) {
    const currentAmount = result.amount;
    const bestAmount = bestQuote.amount;

    if (currentAmount.isZero()) continue;

    if (
      (FPNumber.isLessThan(bestAmount, currentAmount) && isDesiredInput) ||
      (FPNumber.isLessThan(currentAmount, bestAmount) && !isDesiredInput) ||
      bestAmount.isZero()
    ) {
      bestQuote = result;
    }
  }

  return {
    amount: bestQuote.amount.toCodecString(),
    amountWithoutImpact: bestQuote.amountWithoutImpact.toCodecString(),
    fee: bestQuote.fee.toCodecString(),
    rewards: bestQuote.rewards,
    route: bestQuote.route,
    distribution: bestQuote.distribution,
  };
};

const quoteWithoutImpactSingle = (
  baseAssetId: string,
  syntheticBaseAssetId: string,
  inputAsset: string,
  outputAsset: string,
  isDesiredInput: boolean,
  distribution: Array<{ market: LiquiditySourceTypes; amount: FPNumber }>,
  payload: QuotePayload,
  deduceFee: boolean
): FPNumber => {
  return distribution.reduce((result, { market, amount }) => {
    let value = FPNumber.ZERO;

    if (market === LiquiditySourceTypes.XYKPool) {
      value = xykQuoteWithoutImpact(baseAssetId, inputAsset, outputAsset, amount, isDesiredInput, payload, deduceFee);
    } else if (market === LiquiditySourceTypes.MulticollateralBondingCurvePool) {
      value = tbcQuoteWithoutImpact(baseAssetId, inputAsset, outputAsset, amount, isDesiredInput, payload, deduceFee);
    } else if (market === LiquiditySourceTypes.XSTPool) {
      value = xstQuoteWithoutImpact(
        baseAssetId,
        syntheticBaseAssetId,
        inputAsset,
        outputAsset,
        amount,
        isDesiredInput,
        payload,
        deduceFee
      );
    }

    return result.add(value);
  }, FPNumber.ZERO);
};
