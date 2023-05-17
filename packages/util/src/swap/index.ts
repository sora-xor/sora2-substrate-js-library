import { assert } from '@polkadot/util';
import { combineLatest, map, distinctUntilChanged } from 'rxjs';
import { NumberLike, FPNumber, CodecString } from '@sora-substrate/math';
import { quote, LiquiditySourceTypes, PriceVariant, newTrivial } from '@sora-substrate/liquidity-proxy';
import type {
  PrimaryMarketsEnabledAssets,
  QuotePaths,
  QuotePayload,
  SwapResult,
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
import type { SwapTransferBatchData, SwapTransferBatchReceiver } from './types';

const comparator = <T>(prev: T, curr: T): boolean => JSON.stringify(prev) === JSON.stringify(curr);

const toAssetId = (o: Observable<CommonPrimitivesAssetId32>): Observable<string> =>
  o.pipe(
    map((asset) => asset.code.toString()),
    distinctUntilChanged(comparator)
  );

const toAssetIds = (data: BTreeSet<CommonPrimitivesAssetId32>): string[] =>
  [...data.values()].map((asset) => asset.code.toString());

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

const getAssetAveragePrice = <T>(root: Api<T>, assetAddress: string): Observable<{ buy: string; sell: string }> => {
  return toAveragePrice(root.apiRx.query.priceTools.priceInfos(assetAddress));
};

const toBandRate = (o: Observable<Option<BandBandRate>>) =>
  o.pipe(
    map((codec) => {
      const data = codec.unwrap();
      const value = new FPNumber(data.value).toCodecString();
      const lastUpdated = data.lastUpdated.toNumber();

      return { value, lastUpdated };
    })
  );

const combineValuesWithKeys = <T>(values: Array<T>, keys: Array<string>): { [key: string]: T } =>
  values.reduce(
    (result, value, index) => ({
      ...result,
      [keys[index]]: value,
    }),
    {}
  );

export class SwapModule<T> {
  constructor(private readonly root: Api<T>) {}

  private prepareSourcesForSwapParams(liquiditySource: LiquiditySourceTypes): Array<LiquiditySourceTypes> {
    return liquiditySource ? [liquiditySource] : [];
  }

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
   * @param inputAsset Asset A
   * @param outputAsset Asset B
   * @param value value (Asset A if Exchange A, else - Asset B)
   * @param isExchangeB Exchange A if `isExchangeB=false` else Exchange B
   * @param selectedSources Selected liquidity sources
   * @param paths Available paths
   * @param payload Quote payload
   */
  public getResult(
    inputAsset: Asset | AccountAsset,
    outputAsset: Asset | AccountAsset,
    value: string,
    isExchangeB: boolean,
    selectedSources: Array<LiquiditySourceTypes>,
    enabledAssets: PrimaryMarketsEnabledAssets,
    paths: QuotePaths,
    payload: QuotePayload,
    dexId = DexId.XOR
  ): SwapResult {
    const valueDecimals = !isExchangeB ? inputAsset.decimals : outputAsset.decimals;
    const amount = FPNumber.fromCodecValue(new FPNumber(value, valueDecimals).toCodecString());
    const baseAssetId = this.root.dex.getBaseAssetId(dexId);

    return quote(
      inputAsset.address,
      outputAsset.address,
      amount,
      !isExchangeB,
      selectedSources,
      enabledAssets,
      paths,
      payload,
      baseAssetId
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
   * Get observable reserves throught all dexes for swapped tokens
   * @param firstAssetAddress Asset A address
   * @param secondAssetAddress Asset B address
   * @param enabledAssets Available tbc & syntetics assets
   * @param selectedLiquiditySource Selected liquidity source
   * @returns Observable reserves for all dexes
   */
  public subscribeOnAllDexesReserves(
    firstAssetAddress: string,
    secondAssetAddress: string,
    enabledAssets: PrimaryMarketsEnabledAssets,
    selectedLiquiditySource = LiquiditySourceTypes.Default
  ): Observable<Array<{ dexId: number; payload: QuotePayload }>> {
    const observableDexesReserves = this.root.dex.dexList.map(({ dexId }) => {
      return this.subscribeOnReserves(
        firstAssetAddress,
        secondAssetAddress,
        enabledAssets,
        selectedLiquiditySource,
        dexId
      ).pipe(
        map((payload) => ({
          dexId,
          payload,
        }))
      );
    });

    return combineLatest(observableDexesReserves);
  }

  /**
   * Get observable reserves for swapped tokens
   * @param firstAssetAddress Asset A address
   * @param secondAssetAddress Asset B address
   * @param enabledAssets Available tbc & syntetics assets
   * @param selectedLiquiditySource Selected liquidity source
   * @param dexId Selected dex id for swap
   */
  public subscribeOnReserves(
    firstAssetAddress: string,
    secondAssetAddress: string,
    enabledAssets: PrimaryMarketsEnabledAssets,
    selectedLiquiditySource = LiquiditySourceTypes.Default,
    dexId = DexId.XOR
  ): Observable<QuotePayload> {
    const xor = XOR.address;
    const dai = DAI.address;
    const xstusd = XSTUSD.address;
    const baseAssetId = this.root.dex.getBaseAssetId(dexId);
    const syntheticBaseAssetId = this.root.dex.getSyntheticBaseAssetId(dexId);
    const tbcAssets = enabledAssets?.tbc ?? [];
    const xstAssets = enabledAssets?.xst ?? {};
    const lockedSources = enabledAssets?.lockedSources ?? [];

    // is TBC or XST sources used (only for XOR Dex)
    const isPrimaryMarketSourceUsed = (source: LiquiditySourceTypes): boolean =>
      dexId === DexId.XOR &&
      (selectedLiquiditySource === source || selectedLiquiditySource === LiquiditySourceTypes.Default);

    const tbcUsed = isPrimaryMarketSourceUsed(LiquiditySourceTypes.MulticollateralBondingCurvePool);
    const xstUsed = isPrimaryMarketSourceUsed(LiquiditySourceTypes.XSTPool);

    // possible paths for swap
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

        const payload: QuotePayload = {
          rates: combineValuesWithKeys(rates, tickersWithOracleRates),
          reserves: {
            xyk: combineValuesWithKeys(xyk, assetsWithXykReserves),
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
            },
          },
          lockedSources,
        };

        return payload;
      })
    );
  }

  private calcTxParams(
    assetA: Asset | AccountAsset,
    assetB: Asset | AccountAsset,
    amountA: NumberLike,
    amountB: NumberLike,
    slippageTolerance: NumberLike = this.root.defaultSlippageTolerancePercent,
    isExchangeB = false,
    liquiditySource = LiquiditySourceTypes.Default,
    dexId = DexId.XOR
  ) {
    assert(this.root.account, Messages.connectWallet);
    const desiredDecimals = (!isExchangeB ? assetA : assetB).decimals;
    const resultDecimals = (!isExchangeB ? assetB : assetA).decimals;
    const desiredCodecString = new FPNumber(!isExchangeB ? amountA : amountB, desiredDecimals).toCodecString();
    const result = new FPNumber(!isExchangeB ? amountB : amountA, resultDecimals);
    const resultMulSlippage = result.mul(new FPNumber(Number(slippageTolerance) / 100));
    const liquiditySources = this.prepareSourcesForSwapParams(liquiditySource);
    const params = {} as any;
    if (!isExchangeB) {
      params.WithDesiredInput = {
        desiredAmountIn: desiredCodecString,
        minAmountOut: result.sub(resultMulSlippage).toCodecString(),
      };
    } else {
      params.WithDesiredOutput = {
        desiredAmountOut: desiredCodecString,
        maxAmountIn: result.add(resultMulSlippage).toCodecString(),
      };
    }
    return {
      args: [
        dexId,
        assetA.address,
        assetB.address,
        params,
        liquiditySources,
        liquiditySource === LiquiditySourceTypes.Default ? 'Disabled' : 'AllowSelected',
      ],
    };
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
    liquiditySource = LiquiditySourceTypes.Default,
    dexId = DexId.XOR
  ): Promise<T> {
    const params = this.calcTxParams(
      assetA,
      assetB,
      amountA,
      amountB,
      slippageTolerance,
      isExchangeB,
      liquiditySource,
      dexId
    );
    if (!this.root.assets.getAsset(assetB.address)) {
      this.root.assets.addAccountAsset(assetB.address);
    }
    return this.root.submitExtrinsic(
      (this.root.api.tx.liquidityProxy as any).swap(...params.args),
      this.root.account.pair,
      {
        symbol: assetA.symbol,
        assetAddress: assetA.address,
        amount: `${amountA}`,
        symbol2: assetB.symbol,
        asset2Address: assetB.address,
        amount2: `${amountB}`,
        liquiditySource,
        type: Operation.Swap,
      }
    );
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
    liquiditySource = LiquiditySourceTypes.Default,
    dexId = DexId.XOR
  ): Promise<T> {
    const params = this.calcTxParams(
      assetA,
      assetB,
      amountA,
      amountB,
      slippageTolerance,
      isExchangeB,
      liquiditySource,
      dexId
    );
    if (!this.root.assets.getAsset(assetB.address)) {
      this.root.assets.addAccountAsset(assetB.address);
    }

    const formattedToAddress = receiver.slice(0, 2) === 'cn' ? receiver : this.root.formatAddress(receiver);

    return this.root.submitExtrinsic(
      (this.root.api.tx.liquidityProxy as any).swapTransfer(receiver, ...params.args),
      this.root.account.pair,
      {
        symbol: assetA.symbol,
        assetAddress: assetA.address,
        amount: `${amountA}`,
        symbol2: assetB.symbol,
        asset2Address: assetB.address,
        amount2: `${amountB}`,
        liquiditySource,
        to: formattedToAddress,
        type: Operation.SwapAndSend,
      }
    );
  }

  private calcTxParamsSwapTransferBatch(
    asset: Asset | AccountAsset,
    maxAmount: NumberLike,
    liquiditySource = LiquiditySourceTypes.Default
  ) {
    assert(this.root.account, Messages.connectWallet);
    const amount = FPNumber.fromCodecValue(maxAmount, asset.decimals).toCodecString();
    const liquiditySources = liquiditySource ? [liquiditySource] : [];
    return {
      args: [
        asset.address,
        amount,
        liquiditySources,
        liquiditySource === LiquiditySourceTypes.Default ? 'Disabled' : 'AllowSelected',
      ],
    };
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
    liquiditySource = LiquiditySourceTypes.Default
  ): Promise<T> {
    const params = this.calcTxParamsSwapTransferBatch(inputAsset, maxInputAmount, liquiditySource);

    return this.root.submitExtrinsic(
      (this.root.api.tx.liquidityProxy as any).swapTransferBatch(receivers, ...params.args),
      this.root.account.pair,
      {
        symbol: inputAsset.symbol,
        assetAddress: inputAsset.address,
        to: this.root.account.pair.address,
        type: Operation.SwapTransferBatch,
      }
    );
  }

  /**
   * **RPC**
   *
   * Get swap result using `liquidityProxy.quote` rpc call.
   *
   * It's better to use `getResult` function because of the blockchain performance
   *
   * @param assetAAddress Asset A address
   * @param assetBAddress Asset B address
   * @param amount Amount value (Asset A if Exchange A, else - Asset B)
   * @param isExchangeB Exchange A if `isExchangeB=false` else Exchange B. `false` by default
   * @param liquiditySource Selected liquidity source
   */
  public async getResultFromBackend(
    assetAAddress: string,
    assetBAddress: string,
    amount: NumberLike,
    isExchangeB = false,
    liquiditySource = LiquiditySourceTypes.Default,
    dexId = DexId.XOR
  ): Promise<SwapResult> {
    const assetA = await this.root.assets.getAssetInfo(assetAAddress);
    const assetB = await this.root.assets.getAssetInfo(assetBAddress);
    const toCodecString = (value) => new FPNumber(value, (!isExchangeB ? assetB : assetA).decimals).toCodecString();

    const liquiditySources = this.prepareSourcesForSwapParams(liquiditySource);
    const result = await this.root.api.rpc.liquidityProxy.quote(
      dexId,
      assetAAddress,
      assetBAddress,
      toCodecString(amount),
      !isExchangeB ? 'WithDesiredInput' : 'WithDesiredOutput',
      liquiditySources as any,
      liquiditySource === LiquiditySourceTypes.Default ? 'Disabled' : 'AllowSelected'
    );
    const value = !result.isNone
      ? result.unwrap()
      : { amount: 0, fee: 0, rewards: [], amountWithoutImpact: 0, route: [] };
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
        liquiditySource as any
      )
    ).isTrue;

    return isEnabled;
  }
}
