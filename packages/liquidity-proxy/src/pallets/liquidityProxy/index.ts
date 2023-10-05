import { FPNumber } from '@sora-substrate/math';
import { LiquiditySourceTypes, Consts, AssetType, Errors, SwapVariant } from '../../consts';
import { LiquidityAggregator } from './liquidityAggregator';
import { LiquidityRegistry } from './liquidityRegistry';
import { listLiquiditySources } from '../dexApi';
import { isAssetAddress, intersection, matchType, safeDivide } from '../../utils';

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

// smart_split
const smartSplit = (
  baseAssetId: string,
  syntheticBaseAssetId: string,
  sources: LiquiditySourceTypes[],
  inputAsset: string,
  outputAsset: string,
  amount: FPNumber,
  isDesiredInput: boolean,
  payload: QuotePayload,
  deduceFee: boolean
): QuoteResult => {
  if (isAssetAddress(inputAsset, outputAsset)) {
    throw new Error(Errors.UnavailableExchangePath);
  }
  if (!isAssetAddress(inputAsset, baseAssetId) && !isAssetAddress(outputAsset, baseAssetId)) {
    throw new Error(Errors.UnavailableExchangePath);
  }

  let aggregator = new LiquidityAggregator(
    isDesiredInput ? SwapVariant.WithDesiredInput : SwapVariant.WithDesiredOutput
  );

  for (const source of sources) {
    try {
      const chunks = LiquidityRegistry.stepQuote(source)(
        baseAssetId,
        syntheticBaseAssetId,
        inputAsset,
        outputAsset,
        amount,
        isDesiredInput,
        payload,
        deduceFee,
        Consts.GetNumSamples
      );

      aggregator.addSource(source, chunks);
    } catch {
      continue;
    }
  }

  let result = aggregator.aggregateSwapOutcome(amount);

  if (!result) {
    throw new Error(Errors.UnavailableExchangePath);
  }

  const rewards = [];

  for (const { source, income, outcome } of result.distribution) {
    const sourceRewards = LiquidityRegistry.checkRewards(source)(
      baseAssetId,
      syntheticBaseAssetId,
      inputAsset,
      outputAsset,
      income,
      outcome,
      payload
    );
    rewards.push(...sourceRewards);
  }

  return {
    amount: result.amount,
    fee: result.fee,
    distribution: result.distribution.map((item) => ({ ...item, input: inputAsset, output: outputAsset })),
    rewards,
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
  const sources = listLiquiditySources(
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

  // [TODO] Could be removed?
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

  return smartSplit(
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
            const distributionAmounts = result.distribution.map(({ source, income, outcome }) => ({
              source,
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
  distribution: Array<{ source: LiquiditySourceTypes; amount: FPNumber }>,
  payload: QuotePayload,
  deduceFee: boolean
): FPNumber => {
  return distribution.reduce((result, { source, amount }) => {
    const value = LiquidityRegistry.quoteWithoutImpact(source)(
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
