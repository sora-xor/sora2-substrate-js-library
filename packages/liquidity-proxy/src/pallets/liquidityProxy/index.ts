import { FPNumber } from '@sora-substrate/math';
import { LiquiditySourceTypes, Consts, Errors, AssetType } from '../../consts';
import { LiquidityRegistry } from './liquidityRegistry';
import { smartSplit, newSmartSplit } from './smartSplit';
import { listLiquiditySources } from '../dexApi';

import { intersection, matchType, safeDivide } from '../../utils';

import type {
  QuotePayload,
  QuoteResult,
  QuotePaths,
  QuoteIntermediate,
  SwapResult,
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
 * @param baseAssetId Dex base asset id
 * @param syntheticBaseAssetId Dex synthetic base asset id
 * @param address Asset ID
 * @param enabledAssets Primary markets enabled assets
 * @param xykReserves Xyk reserves of assets in exchange paths
 * @param orderBookReserves Order Book reserves of assets in exchange paths
 *
 */
const getAssetLiquiditySources = (
  baseAssetId: string,
  syntheticBaseAssetId: string,
  address: string,
  enabledAssets: PrimaryMarketsEnabledAssets,
  xykReserves: QuotePayload['reserves']['xyk'],
  orderBookReserves: QuotePayload['reserves']['orderBook']
): Array<LiquiditySourceTypes> => {
  const rules = {
    [LiquiditySourceTypes.MulticollateralBondingCurvePool]: () =>
      baseAssetId === Consts.XOR && [...enabledAssets.tbc, Consts.XOR].includes(address),
    [LiquiditySourceTypes.XYKPool]: () =>
      baseAssetId === address ||
      (Array.isArray(xykReserves[address]) && xykReserves[address].every((tokenReserve) => !!Number(tokenReserve))),
    [LiquiditySourceTypes.XSTPool]: () =>
      baseAssetId === Consts.XOR && (address === syntheticBaseAssetId || !!enabledAssets.xst[address]),
    [LiquiditySourceTypes.OrderBook]: () =>
      baseAssetId === Consts.XOR && (address === baseAssetId || !!orderBookReserves[address]),
  };

  return Object.entries(rules).reduce((acc: LiquiditySourceTypes[], [source, rule]) => {
    if (rule()) {
      acc.push(source as LiquiditySourceTypes);
    }
    return acc;
  }, []);
};

/**
 * Get available liquidity sources for the assets exchange paths
 * @param baseAssetId Dex base asset id
 * @param syntheticBaseAssetId Dex synthetic base asset id
 * @param exchangePaths Assets exchange paths
 * @param enabledAssets Primary markets enabled assets
 * @param xykReserves Xyk reserves of assets in exchange paths
 * @param orderBookReserves Order Book reserves of assets in exchange paths
 */
export const getAssetsLiquiditySources = (
  baseAssetId: string,
  syntheticBaseAssetId: string,
  exchangePaths: string[][],
  enabledAssets: PrimaryMarketsEnabledAssets,
  xykReserves: QuotePayload['reserves']['xyk'],
  orderBookReserves: QuotePayload['reserves']['orderBook']
): PathsAndPairLiquiditySources => {
  const assetPaths: QuotePaths = {};
  let liquiditySources: Array<LiquiditySourceTypes> = [];

  for (const exchangePath of exchangePaths) {
    let exchangePathSources: Array<LiquiditySourceTypes> = [];

    exchangePath.forEach((asset, index) => {
      const assetSources = (assetPaths[asset] =
        assetPaths[asset] ||
        getAssetLiquiditySources(
          baseAssetId,
          syntheticBaseAssetId,
          asset,
          enabledAssets,
          xykReserves,
          orderBookReserves
        ));

      exchangePathSources = index === 0 ? assetSources : intersection(exchangePathSources, assetSources);
    });

    liquiditySources = [...new Set([...liquiditySources, ...exchangePathSources])];
  }

  return { assetPaths, liquiditySources };
};

/**
 * Computes the optimal distribution across available liquidity sources to exectute the requested trade
 * given the input and output assets, the trade amount and a liquidity sources filter.
 */
// prettier-ignore
const quoteSingle = (
  baseAssetId: string,
  syntheticBaseAssetId: string,
  inputAsset: string,
  outputAsset: string,
  amount: FPNumber,
  isDesiredInput: boolean,
  selectedSources: Array<LiquiditySourceTypes>,
  payload: QuotePayload,
  deduceFee: boolean,
  isALT = false,
): QuoteResult => { // NOSONAR
  let sources = listLiquiditySources(
    baseAssetId,
    syntheticBaseAssetId,
    inputAsset,
    outputAsset,
    selectedSources,
    payload
  );

  if (!sources.length) {
    throw new Error(Errors.UnavailableExchangePath);
  }

  // The temp solution is to exclude OrderBook source if there are multiple sources.
  // Will be removed in ALT implementation
  if (!isALT && sources.length > 1) {
    sources = sources.filter((source) => source !== LiquiditySourceTypes.OrderBook);
  }

  if (sources.length === 1) {
    const {
      amount: resultAmount,
      fee,
      distribution,
    } = LiquidityRegistry.quote(sources[0])(
      baseAssetId,
      syntheticBaseAssetId,
      inputAsset,
      outputAsset,
      amount,
      isDesiredInput,
      payload,
      deduceFee
    );
    const [inputAmount, outputAmount] = isDesiredInput ? [amount, resultAmount] : [resultAmount, amount];
    const rewards = LiquidityRegistry.checkRewards(sources[0])(
      baseAssetId,
      syntheticBaseAssetId,
      inputAsset,
      outputAsset,
      inputAmount,
      outputAmount,
      payload
    );

    return {
      amount: resultAmount,
      fee,
      distribution,
      rewards,
    };
  }

  if (!isALT) {
    if (sources.length === 2) {
      if (
        sources.includes(LiquiditySourceTypes.XYKPool) &&
        // We can't use XST as primary market for smart split, because it use XST asset as base
        sources.includes(LiquiditySourceTypes.MulticollateralBondingCurvePool)
      ) {
        return smartSplit(baseAssetId, syntheticBaseAssetId, inputAsset, outputAsset, amount, isDesiredInput, payload, deduceFee);
      }
    }
  
    throw new Error('[liquidityProxy] Unsupported operation');
  } else {
    return newSmartSplit(
      baseAssetId,
      syntheticBaseAssetId,
      sources,
      inputAsset,
      outputAsset,
      amount,
      isDesiredInput,
      payload,
      deduceFee
    );
  }
};

// prettier-ignore
export const quote = (
  firstAssetAddress: string,
  secondAssetAddress: string,
  amount: FPNumber,
  isDesiredInput: boolean,
  selectedSources: Array<LiquiditySourceTypes>,
  payload: QuotePayload,
  deduceFee: boolean,
  baseAssetId = Consts.XOR,
  syntheticBaseAssetId = Consts.XST,
  isALT = false,
): SwapResult => { // NOSONAR
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
    firstAssetAddress,
    secondAssetAddress
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
              deduceFee,
              isALT,
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
              deduceFee,
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
    const value = LiquidityRegistry.quoteWithoutImpact(market)(
      baseAssetId,
      syntheticBaseAssetId,
      inputAsset,
      outputAsset,
      amount,
      isDesiredInput,
      payload,
      deduceFee
    );

    return result.add(value);
  }, FPNumber.ZERO);
};
