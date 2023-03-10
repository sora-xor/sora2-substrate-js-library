import { FPNumber } from '@sora-substrate/math';
import { LiquiditySourceTypes, Consts, AssetType } from './consts';
import { xykQuote, xykQuoteWithoutImpact, getXykReserves } from './quote/xyk';
import { tbcQuote, tbcQuoteWithoutImpact, tbcSellPriceNoVolume, tbcBuyPriceNoVolume } from './quote/tbc';
import { xstQuote, xstQuoteWithoutImpact, xstSellPriceNoVolume, xstBuyPriceNoVolume } from './quote/xst';
import {
  isGreaterThanZero,
  isLessThanOrEqualToZero,
  isAssetAddress,
  isBetter,
  extremum,
  intersection,
  matchType,
  safeDivide,
} from './utils';

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
} from './types';

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
  payload: QuotePayload,
  enabledAssets: PrimaryMarketsEnabledAssets,
  baseAssetId: string,
  syntheticBaseAssetId: string
): Array<LiquiditySourceTypes> => {
  const rules = {
    [LiquiditySourceTypes.MulticollateralBondingCurvePool]: () =>
      baseAssetId === Consts.XOR && [...enabledAssets.tbc, Consts.XOR].includes(address),
    [LiquiditySourceTypes.XYKPool]: () =>
      baseAssetId === address || payload.reserves.xyk[address].every((tokenReserve) => !!Number(tokenReserve)),
    [LiquiditySourceTypes.XSTPool]: () =>
      baseAssetId === Consts.XOR && (address === syntheticBaseAssetId || enabledAssets.xst.includes(address)),
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
 * @param paths liquidity sources for assets
 * @param baseAssetId Dex base asset id
 */
const listLiquiditySources = (
  inputAssetId: string,
  outputAssetId: string,
  paths: QuotePaths,
  baseAssetId: string
): Array<LiquiditySourceTypes> => {
  const getSource = (asset: string) => paths[asset] ?? [];
  const commonSources = intersection(getSource(inputAssetId), getSource(outputAssetId));
  const directSources = commonSources.filter((source) => {
    return (
      source === LiquiditySourceTypes.XSTPool || [inputAssetId, outputAssetId].includes(baseAssetId) // TBC, XYK uses baseAsset
    );
  });
  return directSources;
};

/**
 * Get available liquidity sources for the tokens & exchange pair\
 * @param inputAssetId Input asset address
 * @param outputAssetId Output asset address
 * @param payload Quote payload
 * @param enabledAssets List of enabled assets
 * @param baseAssetId Dex base asset id
 * @param syntheticBaseAssetId Dex synthetic base asset id
 */
export const getPathsAndPairLiquiditySources = (
  inputAssetId: string,
  outputAssetId: string,
  payload: QuotePayload,
  enabledAssets: PrimaryMarketsEnabledAssets,
  baseAssetId: string,
  syntheticBaseAssetId: string
): PathsAndPairLiquiditySources => {
  const assetPaths: QuotePaths = {};
  let liquiditySources: Array<LiquiditySourceTypes> = [];

  const exchangePaths = newTrivial(baseAssetId, syntheticBaseAssetId, enabledAssets.xst, inputAssetId, outputAssetId);

  for (const exchangePath of exchangePaths) {
    let exchangePathSources: Array<LiquiditySourceTypes> = [];

    exchangePath.forEach((asset, index) => {
      const assetSources = (assetPaths[asset] =
        assetPaths[asset] ||
        getAssetLiquiditySources(asset, payload, enabledAssets, baseAssetId, syntheticBaseAssetId));

      exchangePathSources = index === 0 ? assetSources : intersection(exchangePathSources, assetSources);
    });

    liquiditySources = [...new Set([...liquiditySources, ...exchangePathSources])];
  }

  return { paths: assetPaths, liquiditySources };
};

// AGGREGATOR
const quotePrimaryMarket = (
  inputAssetAddress: string,
  outputAssetAddress: string,
  amount: FPNumber,
  isDesiredInput: boolean,
  payload: QuotePayload
): QuoteResult => {
  if ([inputAssetAddress, outputAssetAddress].includes(Consts.XSTUSD)) {
    return xstQuote(inputAssetAddress, outputAssetAddress, amount, isDesiredInput, payload);
  } else {
    return tbcQuote(inputAssetAddress, outputAssetAddress, amount, isDesiredInput, payload);
  }
};

/**
 * Determines the share of a swap that should be exchanged in the primary market
 * (i.e., the multi-collateral bonding curve pool) based on the current reserves of
 * the base asset and the collateral asset in the secondary market (e.g., an XYK pool)
 * provided the base asset is being bought.
 */
const primaryMarketAmountBuyingBaseAsset = (
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
      ? xstBuyPriceNoVolume(collateralAsset, payload)
      : tbcBuyPriceNoVolume(collateralAsset, payload);

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

/**
 * Determines the share of a swap that should be exchanged in the primary market
 * (i.e. the multi-collateral bonding curve pool) based on the current reserves of
 * the base asset and the collateral asset in the secondary market (e.g. an XYK pool)
 * provided the base asset is being sold.
 */
const primaryMarketAmountSellingBaseAsset = (
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

/**
 * Implements the "smart" split algorithm.
 */
const smartSplit = (
  inputAsset: string,
  outputAsset: string,
  amount: FPNumber,
  isDesiredInput: boolean,
  payload: QuotePayload,
  baseAssetId = Consts.XOR
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
    ? primaryMarketAmountSellingBaseAsset(outputAsset, amount, isDesiredInput, baseReserve, otherReserve, payload)
    : primaryMarketAmountBuyingBaseAsset(inputAsset, amount, isDesiredInput, baseReserve, otherReserve, payload);

  if (isGreaterThanZero(primaryAmount)) {
    const outcomePrimary = quotePrimaryMarket(inputAsset, outputAsset, primaryAmount, isDesiredInput, payload);
    // check that outcomePrimary is not zero
    if (FPNumber.isLessThan(primaryAmount, amount) && !outcomePrimary.amount.isZero()) {
      const incomeSecondary = amount.sub(primaryAmount);
      const outcomeSecondary = xykQuote(inputAsset, outputAsset, incomeSecondary, isDesiredInput, payload, baseAssetId);

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
  const outcomeSecondary = xykQuote(inputAsset, outputAsset, amount, isDesiredInput, payload, baseAssetId);

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
  inputAsset: string,
  outputAsset: string,
  amount: FPNumber,
  isDesiredInput: boolean,
  selectedSources: Array<LiquiditySourceTypes>,
  paths: QuotePaths,
  payload: QuotePayload,
  baseAssetId = Consts.XOR
): QuoteResult => {
  const allSources = selectedSources.length
    ? selectedSources
    : listLiquiditySources(inputAsset, outputAsset, paths, baseAssetId);
  const sources = allSources.filter((source) => !payload.lockedSources.includes(source));

  if (!sources.length) {
    throw new Error(`[liquidityProxy] Path doesn't exist: [${inputAsset}, ${outputAsset}]`);
  }

  if (sources.length === 1) {
    switch (sources[0]) {
      case LiquiditySourceTypes.XYKPool: {
        return xykQuote(inputAsset, outputAsset, amount, isDesiredInput, payload, baseAssetId);
      }
      case LiquiditySourceTypes.MulticollateralBondingCurvePool: {
        return tbcQuote(inputAsset, outputAsset, amount, isDesiredInput, payload);
      }
      case LiquiditySourceTypes.XSTPool: {
        return xstQuote(inputAsset, outputAsset, amount, isDesiredInput, payload);
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
      return smartSplit(inputAsset, outputAsset, amount, isDesiredInput, payload, baseAssetId);
    }
  }

  throw new Error('[liquidityProxy] Unsupported operation');
};

export const quote = (
  firstAssetAddress: string,
  secondAssetAddress: string,
  amount: FPNumber,
  isDesiredInput: boolean,
  selectedSources: Array<LiquiditySourceTypes>,
  enabledAssets: PrimaryMarketsEnabledAssets,
  paths: QuotePaths,
  payload: QuotePayload,
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

  const exchangePaths = newTrivial(
    baseAssetId,
    syntheticBaseAssetId,
    enabledAssets.xst,
    firstAssetAddress,
    secondAssetAddress
  );

  const results = exchangePaths.map((exchangePath) => {
    try {
      const result = exchangePath.reduce<QuoteIntermediate>(
        (buffer, currentAsset) => {
          if (buffer.amount.isZero()) {
            throw new Error('[liquidityProxy]: zero amount received while processing exchange path');
          }

          const { route } = buffer;

          if (route.length) {
            const prevAsset = route[route.length - 1];
            const [assetA, assetB] = isDesiredInput ? [prevAsset, currentAsset] : [currentAsset, prevAsset];

            const result = quoteSingle(
              assetA,
              assetB,
              buffer.amount,
              isDesiredInput,
              selectedSources,
              paths,
              payload,
              baseAssetId
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
              assetA,
              assetB,
              isDesiredInput,
              distributionAmounts,
              payload,
              baseAssetId
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
        path: exchangePath,
      };
    } catch (error) {
      return {
        ...bestQuote,
        path: exchangePath,
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
  inputAsset: string,
  outputAsset: string,
  isDesiredInput: boolean,
  distribution: Array<{ market: LiquiditySourceTypes; amount: FPNumber }>,
  payload: QuotePayload,
  baseAssetId = Consts.XOR
): FPNumber => {
  return distribution.reduce((result, { market, amount }) => {
    let value = FPNumber.ZERO;

    if (market === LiquiditySourceTypes.XYKPool) {
      value = xykQuoteWithoutImpact(inputAsset, outputAsset, amount, isDesiredInput, payload, baseAssetId);
    } else if (market === LiquiditySourceTypes.MulticollateralBondingCurvePool) {
      value = tbcQuoteWithoutImpact(inputAsset, outputAsset, amount, isDesiredInput, payload);
    } else if (market === LiquiditySourceTypes.XSTPool) {
      value = xstQuoteWithoutImpact(inputAsset, outputAsset, amount, isDesiredInput, payload);
    }

    return result.add(value);
  }, FPNumber.ZERO);
};
