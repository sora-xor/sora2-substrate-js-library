import { assert } from '@polkadot/util';
import isEmpty from 'lodash/fp/isEmpty';
import { combineLatest, map, distinctUntilChanged } from 'rxjs';
import { NumberLike, FPNumber, CodecString } from '@sora-substrate/math';
import {
  quote,
  LiquiditySourceTypes,
  PriceVariant,
  newTrivial,
  getAssetsLiquiditySources,
} from '@sora-substrate/liquidity-proxy';
import type {
  PrimaryMarketsEnabledAssets,
  QuotePayload,
  SwapResult,
  SwapQuote,
  OracleRate,
} from '@sora-substrate/liquidity-proxy';
import type { Observable } from '@polkadot/types/types';
import type {
  CommonPrimitivesAssetId32,
  FixnumFixedPoint,
  PriceToolsAggregatedPriceInfo,
  BandBandRate,
} from '@polkadot/types/lookup';
import type { Option, BTreeSet } from '@polkadot/types-codec';

import { Consts as SwapConsts } from './consts';
import { XOR, DAI, XSTUSD } from '../assets/consts';
import { DexId } from '../dex/consts';
import { Messages } from '../logger';
import { Operation } from '../BaseApi';
import { Api } from '../api';
import type { AccountAsset, Asset } from '../assets/types';
import type { ReceiverHistoryItem, SwapTransferBatchData, SwapQuoteData } from './types';

interface SwapResultWithDexId extends SwapResult {
  dexId: DexId;
}

enum SwapVariant {
  WithDesiredInput = 'WithDesiredInput',
  WithDesiredOutput = 'WithDesiredOutput',
}

type SwapAmount =
  | {
      [SwapVariant.WithDesiredInput]: {
        desiredAmountIn: CodecString;
        minAmountOut: CodecString;
      };
    }
  | {
      [SwapVariant.WithDesiredOutput]: {
        desiredAmountOut: CodecString;
        maxAmountIn: CodecString;
      };
    };

enum FilterMode {
  Disabled = 'Disabled',
  AllowSelected = 'AllowSelected',
  ForbidSelected = 'ForbidSelected',
}

const getFilterMode = (liquiditySources: LiquiditySourceTypes[], allowSelected = true) => {
  const sourcesPassed = !!liquiditySources.length;

  if (!sourcesPassed) return FilterMode.Disabled;

  return allowSelected ? FilterMode.AllowSelected : FilterMode.ForbidSelected;
};

const comparator = <T>(prev: T, curr: T): boolean => JSON.stringify(prev) === JSON.stringify(curr);

const toAssetId = (o: Observable<CommonPrimitivesAssetId32>): Observable<string> =>
  o.pipe(
    map((asset) => asset.code.toString()),
    distinctUntilChanged(comparator)
  );

const toCodec = (o: Observable<any>) =>
  o.pipe(
    map((codec) => {
      return Array.isArray(codec) ? codec.map((item) => item.toString()) : codec.toString();
    }),
    distinctUntilChanged(comparator)
  );

const fromFixnumToCodec = (o: Observable<FixnumFixedPoint>) =>
  o.pipe(
    map((codec) => codec.inner.toString()),
    distinctUntilChanged(comparator)
  );

const toAveragePrice = (o: Observable<Option<PriceToolsAggregatedPriceInfo>>) =>
  o.pipe(
    map((codec) => ({
      [PriceVariant.Buy]: codec.value.buy.averagePrice.toString(),
      [PriceVariant.Sell]: codec.value.sell.averagePrice.toString(),
    })),
    distinctUntilChanged(comparator)
  );

const toBandRate = (o: Observable<Option<BandBandRate>>): Observable<OracleRate> =>
  o.pipe(
    map((codec) => {
      const data = codec.unwrap();
      const value = data.value.toString();
      const lastUpdated = data.lastUpdated.toNumber();
      const dynamicFee = data.dynamicFee.inner.toString();

      return { value, lastUpdated, dynamicFee };
    }),
    distinctUntilChanged(comparator)
  );

const toAssetIds = (data: BTreeSet<CommonPrimitivesAssetId32>): string[] =>
  [...data.values()].map((asset) => asset.code.toString());

const getAssetAveragePrice = <T>(root: Api<T>, assetAddress: string): Observable<{ buy: string; sell: string }> => {
  return toAveragePrice(root.apiRx.query.priceTools.priceInfos(assetAddress));
};

const combineValuesWithKeys = <T>(values: Array<T>, keys: Array<string>): { [key: string]: T } =>
  values.reduce(
    (result, value, index) => ({
      ...result,
      [keys[index]]: value,
    }),
    {}
  );

const emptySwapResult = { amount: 0, fee: 0, rewards: [], amountWithoutImpact: 0, route: [] };

export class SwapModule<T> {
  constructor(private readonly root: Api<T>) {}

  /**
   * Get min or max value before Swap
   * @param tokenFrom Asset A address
   * @param tokenTo Asset B address
   * @param fromValue Asset A value
   * @param toValue Asset B value
   * @param isExchangeB If `isExchangeB` then Exchange B and it calculates max sold,
   * else - Exchange A and it calculates min received
   * @param slippageTolerance
   */
  public getMinMaxValue(
    tokenFrom: Asset | AccountAsset,
    tokenTo: Asset | AccountAsset,
    fromValue: string,
    toValue: string,
    isExchangeB: boolean,
    slippageTolerance: NumberLike
  ): CodecString {
    const value = isExchangeB ? fromValue : toValue;
    const token = isExchangeB ? tokenFrom : tokenTo;

    if (!token || !value) return SwapConsts.ZERO_STR;

    const resultDecimals = token.decimals;
    const result = new FPNumber(value, resultDecimals);
    const resultMulSlippage = result.mul(new FPNumber(Number(slippageTolerance) / 100, resultDecimals));

    return (!isExchangeB ? result.sub(resultMulSlippage) : result.add(resultMulSlippage)).toCodecString();
  }

  /**
   * Get price impact
   * @param tokenFrom Asset A address
   * @param tokenTo Asset B address
   * @param fromValue Asset A value
   * @param toValue Asset B value
   * @param amountWithoutImpact Amount without impact
   * @param isExchangeB
   */
  public getPriceImpact(
    tokenFrom: Asset | AccountAsset,
    tokenTo: Asset | AccountAsset,
    fromValue: string,
    toValue: string,
    amountWithoutImpact: CodecString,
    isExchangeB: boolean
  ): string {
    const token = isExchangeB ? tokenFrom : tokenTo;
    const value = isExchangeB ? fromValue : toValue;

    if (!token || !value || !amountWithoutImpact) return SwapConsts.ZERO_STR;

    const withoutImpact = FPNumber.fromCodecValue(amountWithoutImpact, token.decimals);

    if (withoutImpact.isZero()) return SwapConsts.ZERO_STR;

    const amount = new FPNumber(value, token.decimals);
    const impact = isExchangeB ? withoutImpact.div(amount) : amount.div(withoutImpact);
    const result = FPNumber.ONE.sub(impact).mul(FPNumber.HUNDRED);

    return FPNumber.lte(result, FPNumber.ZERO) ? SwapConsts.ZERO_STR : FPNumber.ZERO.sub(result).toFixed(2);
  }

  /**
   * Get swap result
   * @param assetAAddress Asset A address
   * @param assetBAddress Asset B address
   * @param value value (Asset A if Exchange A, else - Asset B)
   * @param isExchangeB Exchange A if `isExchangeB=false` else Exchange B
   * @param selectedSources Selected liquidity sources
   * @param payload Quote payload
   */
  public getResult(
    assetAAddress: string,
    assetBAddress: string,
    value: NumberLike,
    isExchangeB: boolean,
    payload: QuotePayload,
    selectedSources: Array<LiquiditySourceTypes> = [],
    dexId = DexId.XOR,
    deduceFee = true
  ): SwapResult {
    const amount = new FPNumber(value);
    const baseAssetId = this.root.dex.getBaseAssetId(dexId);
    const syntheticBaseAssetId = this.root.dex.getSyntheticBaseAssetId(dexId);

    return quote(
      assetAAddress,
      assetBAddress,
      amount,
      !isExchangeB,
      selectedSources,
      payload,
      deduceFee,
      baseAssetId,
      syntheticBaseAssetId
    );
  }

  public async getTbcAssets(): Promise<string[]> {
    const assets = await this.root.api.query.multicollateralBondingCurvePool.enabledTargets();
    return toAssetIds(assets);
  }

  public async getXstAssets(): Promise<Record<string, { referenceSymbol: string; feeRatio: FPNumber }>> {
    const entries = await this.root.api.query.xstPool.enabledSynthetics.entries();

    return entries.reduce((buffer, [key, value]) => {
      const id = key.args[0].code.toString();
      const data = value.unwrap();
      const referenceSymbol = new TextDecoder().decode(data.referenceSymbol);
      const feeRatio = FPNumber.fromCodecValue(data.feeRatio.inner.toString());

      buffer[id] = {
        referenceSymbol,
        feeRatio,
      };

      return buffer;
    }, {});
  }

  public async getLockedSources(): Promise<LiquiditySourceTypes[]> {
    const sources = await this.root.api.query.tradingPair.lockedLiquiditySources();
    return sources.map((source) => source.toString() as LiquiditySourceTypes);
  }

  /**
   * Get primary markets enabled assets observable
   */
  public async getPrimaryMarketsEnabledAssets(): Promise<PrimaryMarketsEnabledAssets> {
    const [tbc, xst, lockedSources] = await Promise.all([
      this.getTbcAssets(),
      this.getXstAssets(),
      this.getLockedSources(),
    ]);

    return {
      tbc,
      xst,
      lockedSources,
    };
  }

  /**
   * Get observable reserves for swapped tokens
   * @param firstAssetAddress Asset A address
   * @param secondAssetAddress Asset B address
   * @param selectedSources Selected liquidity sources
   * @param dexId Selected dex id for swap
   */
  public async subscribeOnReserves(
    firstAssetAddress: string,
    secondAssetAddress: string,
    selectedSources: LiquiditySourceTypes[] = [],
    dexId = DexId.XOR
  ): Promise<Observable<QuotePayload>> {
    const isXorDex = dexId === DexId.XOR;
    const xor = XOR.address;
    const dai = DAI.address;
    const xstusd = XSTUSD.address;
    const baseAssetId = this.root.dex.getBaseAssetId(dexId);
    const syntheticBaseAssetId = this.root.dex.getSyntheticBaseAssetId(dexId);

    const enabledAssets = isXorDex
      ? await this.getPrimaryMarketsEnabledAssets()
      : { tbc: [], xst: {}, lockedSources: [] };

    const tbcAssets = enabledAssets?.tbc ?? [];
    const xstAssets = enabledAssets?.xst ?? {};

    // is TBC or XST sources used (only for XOR Dex)
    const isPrimaryMarketSourceUsed = (source: LiquiditySourceTypes): boolean =>
      isXorDex && (!selectedSources.length || selectedSources.includes(source));

    const tbcUsed = isPrimaryMarketSourceUsed(LiquiditySourceTypes.MulticollateralBondingCurvePool);
    const xstUsed = isPrimaryMarketSourceUsed(LiquiditySourceTypes.XSTPool);

    // possible paths for swap (we need to find all possible assets)
    const exchangePaths = newTrivial(
      baseAssetId,
      syntheticBaseAssetId,
      Object.keys(xstAssets),
      firstAssetAddress,
      secondAssetAddress
    );
    // list of all assets what could be used in swap
    const assetsInPaths = [...new Set(exchangePaths.flat(1))];
    // Assets that have XYK reserves (with baseAssetId)
    const assetsWithXykReserves = assetsInPaths.filter((address) => address !== baseAssetId);
    // Assets that have TBC collateral reserves (not XOR)
    const assetsWithTbcReserves = assetsInPaths.filter((address) => tbcAssets.includes(address));
    // Assets that have average price data (storage has prices only for collateral TBC assets), DAI required
    const assetsWithAveragePrices = [...new Set([...assetsWithTbcReserves, dai])];
    // Assets for which we need to know the total supply
    const assetsWithIssuances = [xor];
    // Tickers with rates in oracle (except USD ticker, because it is the same as DAI)
    const tickersWithOracleRates = assetsInPaths.reduce((buffer, address) => {
      if (address !== xstusd && !!xstAssets[address]) {
        buffer.push(xstAssets[address].referenceSymbol);
      }
      return buffer;
    }, []);

    const xykReserves = assetsWithXykReserves.map((address) =>
      toCodec(this.root.apiRx.query.poolXYK.reserves(baseAssetId, address))
    );

    // fill array if TBC source available
    const tbcReserves = tbcUsed
      ? assetsWithTbcReserves.map((address) =>
          toCodec(this.root.apiRx.query.multicollateralBondingCurvePool.collateralReserves(address))
        )
      : [];

    // fill array if TBC or XST source available
    const assetsPrices =
      tbcUsed || xstUsed ? assetsWithAveragePrices.map((address) => getAssetAveragePrice(this.root, address)) : [];

    // if TBC source available
    const assetsIssuances = tbcUsed ? [toCodec(this.root.apiRx.query.balances.totalIssuance())] : [];

    const tickersRates = xstUsed
      ? tickersWithOracleRates.map((symbol) => toBandRate(this.root.apiRx.query.band.symbolRates(symbol)))
      : [];

    const tbcConsts = tbcUsed
      ? [
          fromFixnumToCodec(this.root.apiRx.query.multicollateralBondingCurvePool.initialPrice()),
          fromFixnumToCodec(this.root.apiRx.query.multicollateralBondingCurvePool.priceChangeStep()),
          fromFixnumToCodec(this.root.apiRx.query.multicollateralBondingCurvePool.priceChangeRate()),
          fromFixnumToCodec(this.root.apiRx.query.multicollateralBondingCurvePool.sellPriceCoefficient()),
          toAssetId(this.root.apiRx.query.multicollateralBondingCurvePool.referenceAssetId()),
        ]
      : [];

    const xstConsts = xstUsed
      ? [
          toCodec(this.root.apiRx.query.xstPool.syntheticBaseAssetFloorPrice()),
          toAssetId(this.root.apiRx.query.xstPool.referenceAssetId()),
        ]
      : [];

    // storage consts
    const bandRateStalePeriod = this.root.api.consts.band.getBandRateStalePeriod.toNumber();
    const syntheticBaseBuySellLimit = this.root.api.consts.xstPool.getSyntheticBaseBuySellLimit.toString();

    return combineLatest([
      ...tickersRates,
      ...assetsIssuances,
      ...assetsPrices,
      ...tbcReserves,
      ...xykReserves,
      ...tbcConsts,
      ...xstConsts,
    ]).pipe(
      map((data) => {
        let position = tickersRates.length;

        const rates = data.slice(0, position);
        const issuances: Array<string> = data.slice(position, (position += assetsIssuances.length));
        const prices: Array<{ buy: CodecString; sell: CodecString }> = data.slice(
          position,
          (position += assetsPrices.length)
        );
        const tbc: Array<string> = data.slice(position, (position += tbcReserves.length));
        const xyk: Array<[string, string]> = data.slice(position, (position += xykReserves.length));
        const [initialPrice, priceChangeStep, priceChangeRate, sellPriceCoefficient, tbcReferenceAsset] = data.slice(
          position,
          (position += tbcConsts.length)
        );
        const [floorPrice, xstReferenceAsset] = data.slice(position, (position += xstConsts.length));

        const xykData = combineValuesWithKeys(xyk, assetsWithXykReserves);
        const sources = getAssetsLiquiditySources(
          exchangePaths,
          enabledAssets,
          xykData,
          baseAssetId,
          syntheticBaseAssetId
        );

        const payload: QuotePayload = {
          enabledAssets,
          sources,
          rates: combineValuesWithKeys(rates, tickersWithOracleRates),
          reserves: {
            xyk: xykData,
            tbc: combineValuesWithKeys(tbc, assetsWithTbcReserves),
          },
          prices: combineValuesWithKeys(prices, assetsWithAveragePrices),
          issuances: combineValuesWithKeys(issuances, assetsWithIssuances),
          consts: {
            tbc: {
              initialPrice,
              priceChangeStep,
              priceChangeRate,
              sellPriceCoefficient,
              referenceAsset: tbcReferenceAsset,
            },
            xst: {
              floorPrice,
              referenceAsset: xstReferenceAsset,
              syntheticBaseBuySellLimit,
            },
            band: {
              rateStalePeriod: bandRateStalePeriod,
            },
          },
        };

        return payload;
      })
    );
  }

  /**
   * Get observable liquidity proxy quote function for two assets
   * @param firstAssetAddress First swap token address
   * @param secondAssetAddress Second swap token address
   * @param sources Liquidity sources available for swap (all sources by default)
   * @param dexId Selected Dex Id
   */
  public async getSwapQuoteObservable(
    firstAssetAddress: string,
    secondAssetAddress: string,
    sources: LiquiditySourceTypes[] = [],
    dexId = DexId.XOR
  ): Promise<Observable<SwapQuoteData>> {
    const dexReservesObservable = await this.subscribeOnReserves(firstAssetAddress, secondAssetAddress, sources, dexId);

    const swapQuoteObservable = dexReservesObservable.pipe(
      map((payload) => {
        const { assetPaths, liquiditySources } = payload.sources;
        const isAvailable = !isEmpty(assetPaths) && Object.values(assetPaths).every((paths) => !isEmpty(paths));

        const quote: SwapQuote = (
          inputAssetAddress: string,
          outputAssetAddress: string,
          value: NumberLike,
          isExchangeB: boolean,
          selectedSources: LiquiditySourceTypes[] = [],
          deduceFee = true
        ) => {
          const result = this.getResult(
            inputAssetAddress,
            outputAssetAddress,
            value,
            isExchangeB,
            payload,
            selectedSources,
            dexId,
            deduceFee
          );

          return { result, dexId };
        };

        return {
          quote,
          isAvailable,
          liquiditySources,
        };
      })
    );

    return swapQuoteObservable;
  }

  /**
   * Get observable liquidity proxy quote function for two assets across all Dexes
   * @param firstAssetAddress First swap token address
   * @param secondAssetAddress Second swap token address
   * @param sources Liquidity sources for swap (all sources by default)
   */
  public async getDexesSwapQuoteObservable(
    firstAssetAddress: string,
    secondAssetAddress: string,
    sources: LiquiditySourceTypes[] = []
  ): Promise<Observable<SwapQuoteData>> {
    const observables: Observable<SwapQuoteData>[] = [];

    for (const { dexId } of this.root.dex.dexList) {
      const swapQuoteDataObservable = await this.getSwapQuoteObservable(
        firstAssetAddress,
        secondAssetAddress,
        sources,
        dexId
      );

      observables.push(swapQuoteDataObservable);
    }

    const aggregated = combineLatest(observables).pipe(
      map((swapQuoteData) => {
        const isAvailable = swapQuoteData.some(({ isAvailable }) => !!isAvailable);
        const liquiditySources = [...new Set(swapQuoteData.map(({ liquiditySources }) => liquiditySources).flat(1))];
        const quote: SwapQuote = (
          inputAssetAddress: string,
          outputAssetAddress: string,
          value: NumberLike,
          isExchangeB: boolean,
          selectedSources: LiquiditySourceTypes[] = [],
          deduceFee = true
        ) => {
          let bestDexId: number = DexId.XOR;

          const results = swapQuoteData.reduce<{ [dexId: number]: SwapResult }>((buffer, { quote }) => {
            const { dexId, result } = quote(
              inputAssetAddress,
              outputAssetAddress,
              value,
              isExchangeB,
              selectedSources,
              deduceFee
            );

            return { ...buffer, [dexId]: result };
          }, {});

          for (const currentDexId in results) {
            const currAmount = FPNumber.fromCodecValue(results[currentDexId].amount);
            const bestAmount = FPNumber.fromCodecValue(results[bestDexId].amount);

            if (currAmount.isZero()) continue;

            if (
              (FPNumber.isLessThan(currAmount, bestAmount) && isExchangeB) ||
              (FPNumber.isLessThan(bestAmount, currAmount) && !isExchangeB)
            ) {
              bestDexId = +currentDexId;
            }
          }

          return {
            dexId: bestDexId,
            result: results[bestDexId],
          };
        };

        return {
          quote,
          isAvailable,
          liquiditySources,
        };
      })
    );

    return aggregated;
  }

  private calcTxParams(
    assetA: Asset | AccountAsset,
    assetB: Asset | AccountAsset,
    amountA: NumberLike,
    amountB: NumberLike,
    slippageTolerance: NumberLike = this.root.defaultSlippageTolerancePercent,
    isExchangeB = false,
    liquiditySources: LiquiditySourceTypes[] = [],
    allowSelected = true,
    dexId = DexId.XOR
  ): [DexId, string, string, SwapAmount, LiquiditySourceTypes[], FilterMode] {
    assert(this.root.account, Messages.connectWallet);
    const desiredDecimals = (!isExchangeB ? assetA : assetB).decimals;
    const resultDecimals = (!isExchangeB ? assetB : assetA).decimals;
    const desiredCodecString = new FPNumber(!isExchangeB ? amountA : amountB, desiredDecimals).toCodecString();
    const result = new FPNumber(!isExchangeB ? amountB : amountA, resultDecimals);
    const resultMulSlippage = result.mul(new FPNumber(Number(slippageTolerance) / 100));
    const filterMode = getFilterMode(liquiditySources, allowSelected);
    const params: SwapAmount = !isExchangeB
      ? {
          [SwapVariant.WithDesiredInput]: {
            desiredAmountIn: desiredCodecString,
            minAmountOut: result.sub(resultMulSlippage).toCodecString(),
          },
        }
      : {
          [SwapVariant.WithDesiredOutput]: {
            desiredAmountOut: desiredCodecString,
            maxAmountIn: result.add(resultMulSlippage).toCodecString(),
          },
        };

    return [dexId, assetA.address, assetB.address, params, liquiditySources, filterMode];
  }

  /**
   * Run swap operation
   * @param assetA Asset A
   * @param assetB Asset B
   * @param amountA Amount A value
   * @param amountB Amount B value
   * @param slippageTolerance Slippage tolerance coefficient (in %)
   * @param isExchangeB Exchange A if `isExchangeB=false` else Exchange B. `false` by default
   * @param dexId dex id to detect base asset (XOR or XSTUSD)
   */
  public execute(
    assetA: Asset | AccountAsset,
    assetB: Asset | AccountAsset,
    amountA: NumberLike,
    amountB: NumberLike,
    slippageTolerance: NumberLike = this.root.defaultSlippageTolerancePercent,
    isExchangeB = false,
    liquiditySources: LiquiditySourceTypes[] = [],
    allowSelected = true,
    dexId = DexId.XOR
  ): Promise<T> {
    const params = this.calcTxParams(
      assetA,
      assetB,
      amountA,
      amountB,
      slippageTolerance,
      isExchangeB,
      liquiditySources,
      allowSelected,
      dexId
    );

    if (!this.root.assets.getAsset(assetB.address)) {
      this.root.assets.addAccountAsset(assetB.address);
    }

    return this.root.submitExtrinsic(this.root.api.tx.liquidityProxy.swap(...params), this.root.account.pair, {
      symbol: assetA.symbol,
      assetAddress: assetA.address,
      amount: `${amountA}`,
      symbol2: assetB.symbol,
      asset2Address: assetB.address,
      amount2: `${amountB}`,
      liquiditySource: liquiditySources[0],
      type: Operation.Swap,
    });
  }

  /**
   * Run swap & send batch operation
   * @param receiver Receiver account address
   * @param assetA Asset A
   * @param assetB Asset B
   * @param amountA Amount A value
   * @param amountB Amount B value
   * @param slippageTolerance Slippage tolerance coefficient (in %)
   * @param isExchangeB Exchange A if `isExchangeB=false` else Exchange B. `false` by default
   * @param dexId dex id to detect base asset (XOR or XSTUSD)
   */
  public executeSwapAndSend(
    receiver: string,
    assetA: Asset | AccountAsset,
    assetB: Asset | AccountAsset,
    amountA: NumberLike,
    amountB: NumberLike,
    slippageTolerance: NumberLike = this.root.defaultSlippageTolerancePercent,
    isExchangeB = false,
    liquiditySources: LiquiditySourceTypes[] = [],
    allowSelected = true,
    dexId = DexId.XOR
  ): Promise<T> {
    const params = this.calcTxParams(
      assetA,
      assetB,
      amountA,
      amountB,
      slippageTolerance,
      isExchangeB,
      liquiditySources,
      allowSelected,
      dexId
    );
    if (!this.root.assets.getAsset(assetB.address)) {
      this.root.assets.addAccountAsset(assetB.address);
    }

    const formattedToAddress = receiver.slice(0, 2) === 'cn' ? receiver : this.root.formatAddress(receiver);

    return this.root.submitExtrinsic(
      this.root.api.tx.liquidityProxy.swapTransfer(receiver, ...params),
      this.root.account.pair,
      {
        symbol: assetA.symbol,
        assetAddress: assetA.address,
        amount: `${amountA}`,
        symbol2: assetB.symbol,
        asset2Address: assetB.address,
        amount2: `${amountB}`,
        liquiditySource: liquiditySources[0],
        to: formattedToAddress,
        type: Operation.SwapAndSend,
      }
    );
  }

  private calcTxParamsSwapTransferBatch(
    asset: Asset | AccountAsset,
    maxAmount: NumberLike,
    liquiditySources: LiquiditySourceTypes[] = [],
    allowSelected = true
  ): [string, CodecString, LiquiditySourceTypes[], FilterMode] {
    assert(this.root.account, Messages.connectWallet);
    const amount = FPNumber.fromCodecValue(maxAmount, asset.decimals).toCodecString();
    const filterMode = getFilterMode(liquiditySources, allowSelected);
    return [asset.address, amount, liquiditySources, filterMode];
  }

  /**
   * Run swap transfers batch operation
   * @param receivers the ordered map, which maps the asset id and dexId being bought to the vector of batch receivers
   * @param inputAsset asset being sold
   * @param maxInputAmount max amount being sold
   */
  public executeSwapTransferBatch(
    receivers: Array<SwapTransferBatchData>,
    inputAsset: Asset | AccountAsset,
    maxInputAmount: NumberLike,
    liquiditySources: LiquiditySourceTypes[] = [],
    allowSelected = true
  ): Promise<T> {
    const params = this.calcTxParamsSwapTransferBatch(inputAsset, maxInputAmount, liquiditySources, allowSelected);

    const recipients = receivers.reduce((acc, curr) => {
      const arr = curr.receivers.map((item) => {
        return {
          accountId: item.accountId,
          amount: item.targetAmount,
          assetId: curr.outcomeAssetId,
        };
      });
      acc.push(...arr);
      return acc;
    }, [] as Array<ReceiverHistoryItem>);

    return this.root.submitExtrinsic(
      this.root.api.tx.liquidityProxy.swapTransferBatch(receivers, ...params),
      this.root.account.pair,
      {
        symbol: inputAsset.symbol,
        assetAddress: inputAsset.address,
        receivers: recipients,
        type: Operation.SwapTransferBatch,
      }
    );
  }

  /**
   * **RPC**
   *
   * Get swap result using `liquidityProxy.quote` rpc call using predefined DEX ID.
   *
   * It's better to use `getResult` function because of the blockchain performance
   *
   * @param assetAAddress Asset A address
   * @param assetBAddress Asset B address
   * @param amount Amount value (Asset A if Exchange A, else - Asset B)
   * @param isExchangeB Exchange A if `isExchangeB=false` else Exchange B. `false` by default
   * @param liquiditySource Selected liquidity source; `''` by default
   * @param allowSelectedSorce Filter mode for source (`AllowSelected` or `ForbidSelected`); `true` by default
   * @param dexId DEX ID: might be `0` - XOR based or `1` - XSTUSD based; `0` by default
   */
  public async getResultFromDexRpc(
    assetAAddress: string,
    assetBAddress: string,
    amount: NumberLike,
    isExchangeB = false,
    liquiditySources: LiquiditySourceTypes[] = [],
    allowSelected = true,
    dexId = DexId.XOR
  ): Promise<SwapResult> {
    const [assetA, assetB] = await Promise.all([
      this.root.assets.getAssetInfo(assetAAddress),
      this.root.assets.getAssetInfo(assetBAddress),
    ]);
    const toCodecString = (value) => new FPNumber(value, (!isExchangeB ? assetB : assetA).decimals).toCodecString();

    const filterMode = getFilterMode(liquiditySources, allowSelected);

    const result = await this.root.api.rpc.liquidityProxy.quote(
      dexId,
      assetAAddress,
      assetBAddress,
      toCodecString(amount),
      !isExchangeB ? SwapVariant.WithDesiredInput : SwapVariant.WithDesiredOutput,
      liquiditySources,
      filterMode
    );
    const value = result.unwrapOr(emptySwapResult);
    return {
      amount: toCodecString(value.amount),
      fee: new FPNumber(value.fee, XOR.decimals).toCodecString(),
      rewards: 'toJSON' in value.rewards ? value.rewards.toJSON() : value.rewards,
      route: 'toJSON' in value.route ? value.route.toJSON() : value.route,
    } as SwapResult;
  }

  /**
   * **RPC**
   *
   * Get swap result using `liquidityProxy.quote` rpc call for all DEX IDs (XOR & XSTUSD based).
   *
   * It's better to use `getResult` function because of the blockchain performance
   *
   * @param assetAAddress Asset A address
   * @param assetBAddress Asset B address
   * @param amount Amount value (Asset A if Exchange A, else - Asset B)
   * @param isExchangeB Exchange A if `isExchangeB=false` else Exchange B. `false` by default
   * @param liquiditySource Selected liquidity source; `''` by default
   * @param allowSelectedSorce Filter mode for source (`AllowSelected` or `ForbidSelected`); `true` by default
   */
  public async getResultRpc(
    assetAAddress: string,
    assetBAddress: string,
    amount: NumberLike,
    isExchangeB = false,
    liquiditySources: LiquiditySourceTypes[] = [],
    allowSelectedSource = true
  ): Promise<SwapResultWithDexId> {
    const [assetA, assetB] = await Promise.all([
      this.root.assets.getAssetInfo(assetAAddress),
      this.root.assets.getAssetInfo(assetBAddress),
    ]);
    const resultDecimals = (!isExchangeB ? assetB : assetA).decimals;
    const toCodecString = (value) => new FPNumber(value, resultDecimals).toCodecString();
    const toFP = (value) => new FPNumber(value, resultDecimals);

    const filterMode = getFilterMode(liquiditySources, allowSelectedSource);
    const codecAmount = toCodecString(amount);
    const swapVariant = !isExchangeB ? SwapVariant.WithDesiredInput : SwapVariant.WithDesiredOutput;
    const quote = this.root.api.rpc.liquidityProxy.quote;

    const [resDex0, resDex1] = await Promise.all([
      quote(DexId.XOR, assetAAddress, assetBAddress, codecAmount, swapVariant, liquiditySources, filterMode),
      quote(DexId.XSTUSD, assetAAddress, assetBAddress, codecAmount, swapVariant, liquiditySources, filterMode),
    ]);
    const valueDex0 = resDex0.unwrapOr(emptySwapResult);
    const valueDex1 = resDex1.unwrapOr(emptySwapResult);
    const isDex0Better = FPNumber.gte(toFP(valueDex0.amount), toFP(valueDex1.amount));
    const value = isDex0Better ? valueDex0 : valueDex1;
    return {
      amount: toCodecString(value.amount),
      fee: new FPNumber(value.fee, XOR.decimals).toCodecString(),
      rewards: 'toJSON' in value.rewards ? value.rewards.toJSON() : value.rewards,
      route: 'toJSON' in value.route ? value.route.toJSON() : value.route,
      dexId: isDex0Better ? DexId.XOR : DexId.XSTUSD,
    } as SwapResultWithDexId;
  }

  /**
   * **RPC**
   *
   * Subscribe on swap result using `liquidityProxy.quote` rpc call for all DEX IDs (XOR & XSTUSD based).
   *
   * @param assetAAddress Asset A address
   * @param assetBAddress Asset B address
   * @param amount Amount value (Asset A if Exchange A, else - Asset B)
   * @param isExchangeB Exchange A if `isExchangeB=false` else Exchange B. `false` by default
   * @param liquiditySource Selected liquidity source; `''` by default
   * @param allowSelectedSorce Filter mode for source (`AllowSelected` or `ForbidSelected`); `true` by default
   */
  public subscribeOnResultRpc(
    assetAAddress: string,
    assetBAddress: string,
    amount: NumberLike,
    isExchangeB = false,
    liquiditySources: LiquiditySourceTypes[] = [],
    allowSelectedSorce = true
  ): Observable<Promise<SwapResultWithDexId>> {
    return this.root.system
      .getBlockNumberObservable()
      .pipe(
        map(() =>
          this.getResultRpc(assetAAddress, assetBAddress, amount, isExchangeB, liquiditySources, allowSelectedSorce)
        )
      );
  }

  /**
   * **RPC**
   *
   * Check swap operation using `liquidityProxy.isPathAvailable` rpc call
   * @param firstAssetAddress
   * @param secondAssetAddress
   * @param dexId
   * @returns availability of swap operation
   */
  public async checkSwap(firstAssetAddress: string, secondAssetAddress: string, dexId = DexId.XOR): Promise<boolean> {
    return (await this.root.api.rpc.liquidityProxy.isPathAvailable(dexId, firstAssetAddress, secondAssetAddress))
      .isTrue;
  }

  /**
   * **RPC**
   *
   * Get liquidity sources for selected pair using `tradingPair.listEnabledSourcesForPair` rpc call
   * @param firstAssetAddress
   * @param secondAssetAddress
   * @param dexId
   */
  public async getEnabledLiquiditySourcesForPair(
    firstAssetAddress: string,
    secondAssetAddress: string,
    dexId = DexId.XOR
  ): Promise<Array<LiquiditySourceTypes>> {
    const baseAssetId = secondAssetAddress === XOR.address ? secondAssetAddress : firstAssetAddress;
    const targetAssetId = baseAssetId === secondAssetAddress ? firstAssetAddress : secondAssetAddress;
    const list = (
      await this.root.api.rpc.tradingPair.listEnabledSourcesForPair(dexId, baseAssetId, targetAssetId)
    ).toJSON();

    return list as Array<LiquiditySourceTypes>;
  }

  /**
   * **RPC**
   *
   * Check liquidity Source availability for the selected pair using `tradingPair.isSourceEnabledForPair` rpc call
   * @param firstAssetAddress
   * @param secondAssetAddress
   * @param liquiditySource
   * @param dexId
   */
  public async checkLiquiditySourceIsEnabledForPair(
    firstAssetAddress: string,
    secondAssetAddress: string,
    liquiditySource: LiquiditySourceTypes,
    dexId = DexId.XOR
  ): Promise<boolean> {
    const isEnabled = (
      await this.root.api.rpc.tradingPair.isSourceEnabledForPair(
        dexId,
        firstAssetAddress,
        secondAssetAddress,
        liquiditySource
      )
    ).isTrue;

    return isEnabled;
  }
}
