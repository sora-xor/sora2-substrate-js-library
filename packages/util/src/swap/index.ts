import intersection from 'lodash/fp/intersection';
import { assert } from '@polkadot/util';
import { combineLatest, of, map, distinctUntilChanged } from 'rxjs';
import { NumberLike, FPNumber, CodecString } from '@sora-substrate/math';
import { isDirectExchange, quote, LiquiditySourceTypes } from '@sora-substrate/liquidity-proxy';
import type {
  PathsAndPairLiquiditySources,
  PrimaryMarketsEnabledAssets,
  QuotePaths,
  QuotePayload,
  SwapResult,
} from '@sora-substrate/liquidity-proxy';
import type { Observable } from '@polkadot/types/types';
import type { CommonPrimitivesAssetId32, FixnumFixedPoint, PriceToolsPriceInfo } from '@polkadot/types/lookup';
import type { Option, BTreeSet } from '@polkadot/types-codec';

import { Consts as SwapConsts } from './consts';
import { XOR, DAI, XSTUSD } from '../assets/consts';
import { DexId } from '../dex/consts';
import { Messages } from '../logger';
import { Operation } from '../BaseApi';
import { Api } from '../api';
import type { AccountAsset, Asset } from '../assets/types';

export class SwapModule<T> {
  constructor(private readonly root: Api<T>) {}

  /**
   * Get available list of sources for the selected asset
   * @param address Asset ID
   * @param payload Quote payload
   * @param enabledAssets List of enabled assets
   */
  private getSources(
    address: string,
    payload: QuotePayload,
    enabledAssets: PrimaryMarketsEnabledAssets
  ): Array<LiquiditySourceTypes> {
    const rules = {
      [LiquiditySourceTypes.MulticollateralBondingCurvePool]: () => enabledAssets.tbc.includes(address),
      [LiquiditySourceTypes.XYKPool]: () =>
        payload.reserves.xyk[address].every((tokenReserve) => !!Number(tokenReserve)),
      [LiquiditySourceTypes.XSTPool]: () => enabledAssets.xst.includes(address),
    };

    return Object.entries(rules).reduce((acc: LiquiditySourceTypes[], entry) => {
      const [source, rule] = entry;
      if (rule()) {
        acc.push(source as LiquiditySourceTypes);
      }
      return acc;
    }, []);
  }

  private prepareSourcesForSwapParams(liquiditySource: LiquiditySourceTypes): Array<LiquiditySourceTypes> {
    return liquiditySource ? [liquiditySource] : [];
  }

  /**
   * Get available path & liquidity sources for the token pair
   * @param inputAssetId
   * @param outputAssetId
   * @param payload Quote payload
   * @param enabledAssets List of enabled assets
   */
  public getPathsAndPairLiquiditySources(
    inputAssetId: string,
    outputAssetId: string,
    payload: QuotePayload,
    enabledAssets: PrimaryMarketsEnabledAssets,
    dexId = DexId.XOR
  ): PathsAndPairLiquiditySources {
    const paths: QuotePaths = {};
    const liquiditySources: Array<LiquiditySourceTypes> = [];

    if (!(inputAssetId && outputAssetId)) {
      return { paths, liquiditySources };
    }

    const baseAssetId = this.root.dex.getBaseAssetId(dexId);

    try {
      if (isDirectExchange(inputAssetId, outputAssetId, baseAssetId)) {
        const nonBaseAsset = inputAssetId === baseAssetId ? outputAssetId : inputAssetId;
        const path = this.getSources(nonBaseAsset, payload, enabledAssets);

        paths[nonBaseAsset] = path;
        liquiditySources.push(...path);
      } else {
        const [inputPaths, outputPaths] = [
          this.getSources(inputAssetId, payload, enabledAssets),
          this.getSources(outputAssetId, payload, enabledAssets),
        ];

        paths[inputAssetId] = inputPaths;
        paths[outputAssetId] = outputPaths;
        liquiditySources.push(...intersection(inputPaths, outputPaths));
      }
      return { paths, liquiditySources };
    } catch (error) {
      console.error(error);
      return { paths: {}, liquiditySources: [] };
    }
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
      paths,
      payload,
      baseAssetId
    );
  }

  /**
   * Get primary markets enabled assets observable
   */
  public subscribeOnPrimaryMarketsEnabledAssets(): Observable<PrimaryMarketsEnabledAssets> {
    const toJSON = (o: Observable<BTreeSet<CommonPrimitivesAssetId32>>) =>
      o.pipe(
        distinctUntilChanged(),
        map((data) => data.toJSON())
      );
    const assetId32ToString = (o: any) => o.map((item) => item.code);

    const tbc = toJSON(this.root.apiRx.query.multicollateralBondingCurvePool.enabledTargets());
    const xst = toJSON(this.root.apiRx.query.xstPool.enabledSynthetics());

    return combineLatest([tbc, xst]).pipe(
      map((data) => ({
        tbc: assetId32ToString(data[0]),
        xst: assetId32ToString(data[1]),
      }))
    );
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
    const tbcAssets = enabledAssets?.tbc ?? [];

    const toCodec = (o: Observable<any>) =>
      o.pipe(
        distinctUntilChanged(),
        map((codec) => {
          return Array.isArray(codec) ? codec.map((item) => item.toString()) : codec.toString();
        })
      );

    const fromFixnumToCodec = (o: Observable<FixnumFixedPoint>) =>
      o.pipe(
        distinctUntilChanged(),
        map((codec) => codec.inner.toString())
      );

    const toAveragePrice = (o: Observable<Option<PriceToolsPriceInfo>>) =>
      o.pipe(
        map((codec) => codec.value.averagePrice.toString()),
        distinctUntilChanged<string>()
      );

    const getAssetAveragePrice = (assetAddress: string): Observable<string> => {
      if (assetAddress === dai || assetAddress === xstusd) {
        return of(FPNumber.ONE.toCodecString());
      }
      if (assetAddress === xor) {
        return toAveragePrice(this.root.apiRx.query.priceTools.priceInfos(dai));
      }

      return toAveragePrice(this.root.apiRx.query.priceTools.priceInfos(assetAddress));
    };

    // is TBC or XST sources used (only for XOR Dex)
    const isPrimaryMarketSourceUsed = (source: LiquiditySourceTypes): boolean =>
      dexId === DexId.XOR &&
      (selectedLiquiditySource === source || selectedLiquiditySource === LiquiditySourceTypes.Default);

    const combineValuesWithKeys = <T>(values: Array<T>, keys: Array<string>): { [key: string]: T } =>
      values.reduce(
        (result, value, index) => ({
          ...result,
          [keys[index]]: value,
        }),
        {}
      );

    const tbcUsed = isPrimaryMarketSourceUsed(LiquiditySourceTypes.MulticollateralBondingCurvePool);
    const xstUsed = isPrimaryMarketSourceUsed(LiquiditySourceTypes.XSTPool);

    // Assets that have XYK reserves (with baseAssetId)
    const assetsWithXykReserves = [firstAssetAddress, secondAssetAddress].filter((address) => address !== baseAssetId);
    // Assets that have TBC collateral reserves (not XOR)
    const assetsWithTbcReserves = [firstAssetAddress, secondAssetAddress].filter((address) =>
      tbcAssets.includes(address)
    );
    // Assets that have average price data (storage has prices only for collateral TBC assets & XOR)
    const assetsWithAveragePrices = [...assetsWithTbcReserves, xor];
    // Assets for which we need to know the total supply
    const assetsWithIssuances = [xor, xstusd];

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
      tbcUsed || xstUsed ? assetsWithAveragePrices.map((address) => getAssetAveragePrice(address)) : [];

    // if TBC source available
    const assetsIssuances = tbcUsed
      ? [
          toCodec(this.root.apiRx.query.balances.totalIssuance()),
          toCodec(this.root.apiRx.query.tokens.totalIssuance(xstusd)),
        ]
      : [];

    const tbcConsts = tbcUsed
      ? [
          fromFixnumToCodec(this.root.apiRx.query.multicollateralBondingCurvePool.initialPrice()),
          fromFixnumToCodec(this.root.apiRx.query.multicollateralBondingCurvePool.priceChangeStep()),
          fromFixnumToCodec(this.root.apiRx.query.multicollateralBondingCurvePool.sellPriceCoefficient()),
        ]
      : [];

    return combineLatest([...assetsIssuances, ...assetsPrices, ...tbcReserves, ...xykReserves, ...tbcConsts]).pipe(
      map((data) => {
        let position = assetsIssuances.length;

        const issuances: Array<string> = data.slice(0, position);
        const prices: Array<string> = data.slice(position, (position += assetsPrices.length));
        const tbc: Array<string> = data.slice(position, (position += tbcReserves.length));
        const xyk: Array<[string, string]> = data.slice(position, (position += xykReserves.length));
        const [initialPrice, priceChangeStep, sellPriceCoefficient] = data.slice(
          position,
          (position += tbcConsts.length)
        );

        const payload: QuotePayload = {
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
              sellPriceCoefficient,
            },
          },
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

  /**
   * **DEPRECATED**
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
  public async getResultFromBackned(
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
    const value = !result.isNone ? result.unwrap() : { amount: 0, fee: 0, rewards: [], amountWithoutImpact: 0 };
    return {
      amount: toCodecString(value.amount),
      fee: new FPNumber(value.fee, XOR.decimals).toCodecString(),
      rewards: 'toJSON' in value.rewards ? value.rewards.toJSON() : value.rewards,
    } as SwapResult;
  }

  /**
   * **DEPRECATED**
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
   * **DEPRECATED**
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
   * **DEPRECATED**
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
