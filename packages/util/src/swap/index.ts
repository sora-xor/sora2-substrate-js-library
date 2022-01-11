import intersection from 'lodash/fp/intersection';
import { assert } from '@polkadot/util';
import { combineLatest, of } from '@polkadot/x-rxjs';
import { map } from '@polkadot/x-rxjs/operators';
import type { Observable } from '@polkadot/types/types';

import { LiquiditySourceTypes, SwapConsts } from './consts';
import { AccountAsset, Asset, KnownAssets, XOR, ZeroBalance } from '../assets';
import { isDirectExchange, quote } from './liquidityProxy';
import { NumberLike, FPNumber, CodecString } from '../fp';
import { Messages } from '../logger';
import { Operation } from '../BaseApi';
import type { Api } from '../api';
import type { PathsAndPairLiquiditySources, PrimaryMarketsEnabledAssets, QuotePaths, QuotePayload, SwapResult } from './types';

export class SwapModule {
  constructor (private root: Api) {}

  /**
   * Get available list of sources for the selected asset
   * @param address Asset ID
   * @param payload Quote payload
   * @param enabledAssets List of enabled assets
   */
  private getSources (
    address: string,
    payload: QuotePayload,
    enabledAssets: PrimaryMarketsEnabledAssets
  ): Array<LiquiditySourceTypes> {
    const rules = {
      [LiquiditySourceTypes.MulticollateralBondingCurvePool]: () => enabledAssets.tbc.includes(address),
      [LiquiditySourceTypes.XYKPool]: () => payload.reserves.xyk[address].every((tokenReserve) => !!Number(tokenReserve)),
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

  private prepareSourcesForSwapParams (liquiditySource: LiquiditySourceTypes): Array<LiquiditySourceTypes> {
    return liquiditySource ? [liquiditySource] : []
  }

  /**
   * Get available path & liquidity sources for the token pair
   * @param inputAssetId
   * @param outputAssetId
   * @param payload Quote payload
   * @param enabledAssets List of enabled assets
   */
  public getPathsAndPairLiquiditySources (
    inputAssetId: string,
    outputAssetId: string,
    payload: QuotePayload,
    enabledAssets: PrimaryMarketsEnabledAssets
  ): PathsAndPairLiquiditySources {
    const paths: QuotePaths = {};
    const liquiditySources: Array<LiquiditySourceTypes> = [];

    if (!(inputAssetId && outputAssetId)) {
      return { paths, liquiditySources }
    }
    const xor = XOR.address;

    try {
      if (isDirectExchange(inputAssetId, outputAssetId)) {
        const nonXor = inputAssetId === xor ? outputAssetId : inputAssetId;
        const path = this.getSources(nonXor, payload, enabledAssets);

        paths[nonXor] = path;
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
      return { paths, liquiditySources }
    } catch (error) {
      console.error(error);
      return { paths: {}, liquiditySources: [] }
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
  public getMinMaxValue (
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
  public getPriceImpact (
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
    const result = SwapConsts.ONE.sub(impact).mul(FPNumber.HUNDRED);

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
  public getResult (
    inputAsset: Asset,
    outputAsset: Asset,
    value: string,
    isExchangeB: boolean,
    selectedSources: Array<LiquiditySourceTypes>,
    paths: QuotePaths,
    payload: QuotePayload
  ): SwapResult {
    return quote(inputAsset, outputAsset, value, !isExchangeB, selectedSources, paths, payload);
  }

  /**
   * Get primary markets enabled assets observable
   */
  public subscribeOnPrimaryMarketsEnabledAssets(): Observable<PrimaryMarketsEnabledAssets> {
    const toJSON = (o: Observable<any>) => o.pipe(map(data => data.toJSON()));

    const tbc = toJSON(this.root.apiRx.query.multicollateralBondingCurvePool.enabledTargets());
    const xst = toJSON(this.root.apiRx.query.xstPool.enabledSynthetics());

    return combineLatest([tbc, xst]).pipe(map(data => ({
      tbc: data[0],
      xst: data[1]
    })));
  }

  /**
   * Subscribe on Swapped tokens reserves
   * @param firstAssetAddress Asset A address
   * @param secondAssetAddress Asset B address
   * @param selectedLiquiditySource Selected liquidity source
   */
  public subscribeOnReserves (
    firstAssetAddress: string,
    secondAssetAddress: string,
    selectedLiquiditySource = LiquiditySourceTypes.Default
  ): Observable<QuotePayload> {

    const xor = XOR.address;
    const dai = SwapConsts.DAI.address;
    const xstusd = SwapConsts.XSTUSD.address;

    const toCodec = (o: Observable<any>) => o.pipe(map(codec => {
      return Array.isArray(codec) ? codec.map(item => item.toString()) : codec.toString()
    }));

    const toAveragePrice = (o: Observable<any>) => o.pipe(map(codec => codec.value.average_price.toString()));

    const getAssetAveragePrice = (assetAddress: string): Observable<any> => {
      if (assetAddress === dai || assetAddress === xstusd) {
        return of(new FPNumber(1).toCodecString());
      }
      if (assetAddress === xor) {
        return toAveragePrice(this.root.apiRx.query.priceTools.priceInfos(dai));
      }

      return toAveragePrice(this.root.apiRx.query.priceTools.priceInfos(assetAddress));
    };

    // is TBC or XST sources used
    const isSourceUsed = (source: LiquiditySourceTypes): boolean =>
      selectedLiquiditySource === source ||
      selectedLiquiditySource === LiquiditySourceTypes.Default;

    const combineValuesWithKeys = <T>(values: Array<T>, keys: Array<string>): { [key: string]: T } =>
      values.reduce((result, value, index) => ({
        ...result,
        [keys[index]]: value
      }), {});

    // Assets that have XYK reserves (XOR - asset) or TBC collateral reserves (not XOR)
    const assetsWithReserves = [firstAssetAddress, secondAssetAddress].filter(address => address !== xor);
    // Assets that have average price data (storage has prices only for KnownAssets)
    const assetsWithPrices = [...assetsWithReserves, xor].filter(address => KnownAssets.contains(address));
    // Assets for which we need to know the total supply
    const assetsWithIssuances = [xor, xstusd];

    const tbcUsed = isSourceUsed(LiquiditySourceTypes.MulticollateralBondingCurvePool);
    const xstUsed = isSourceUsed(LiquiditySourceTypes.XSTPool);

    const xykReserves = assetsWithReserves.map(address => toCodec(this.root.apiRx.query.poolXyk.reserves(xor, address)));

    // fill array if TBC source available
    const tbcReserves = tbcUsed
      ? assetsWithReserves.map(address => toCodec(this.root.apiRx.query.multicollateralBondingCurvePool.collateralReserves(address)))
      : [];

    // fill array if TBC or XST source available
    const assetsPrices = (tbcUsed || xstUsed)
      ? assetsWithPrices.map(address => getAssetAveragePrice(address))
      : [];

    // if TBC source available
    const assetsIssuances = tbcUsed
      ? [
        toCodec(this.root.apiRx.query.balances.totalIssuance()),
        toCodec(this.root.apiRx.query.tokens.totalIssuance(xstusd))
      ]
      : [];

    return combineLatest([...assetsIssuances, ...assetsPrices, ...tbcReserves, ...xykReserves]).pipe(map(data => {
      let position = assetsIssuances.length;

      const issuances: Array<string> = data.slice(0, position);
      const prices: Array<string> = data.slice(position, position += assetsPrices.length);
      const tbc: Array<string> = data.slice(position, position += tbcReserves.length);
      const xyk: Array<[string, string]> = data.slice(position, position += xykReserves.length);

      const payload: QuotePayload = {
        reserves: {
          xyk: combineValuesWithKeys(xyk, assetsWithReserves),
          tbc: combineValuesWithKeys(tbc, assetsWithReserves),
        },
        prices: combineValuesWithKeys(prices, assetsWithPrices),
        issuances: combineValuesWithKeys(issuances, assetsWithIssuances),
      }

      return payload;
    }));
  }

  private async calcTxParams (
    assetA: Asset | AccountAsset,
    assetB: Asset | AccountAsset,
    amountA: NumberLike,
    amountB: NumberLike,
    slippageTolerance: NumberLike = this.root.defaultSlippageTolerancePercent,
    isExchangeB = false,
    liquiditySource = LiquiditySourceTypes.Default
  ) {
    assert(this.root.account, Messages.connectWallet)
    const desiredDecimals = (!isExchangeB ? assetA : assetB).decimals
    const resultDecimals = (!isExchangeB ? assetB : assetA).decimals
    const desiredCodecString = (new FPNumber(!isExchangeB ? amountA : amountB, desiredDecimals)).toCodecString()
    const result = new FPNumber(!isExchangeB ? amountB : amountA, resultDecimals)
    const resultMulSlippage = result.mul(new FPNumber(Number(slippageTolerance) / 100))
    const liquiditySources = this.prepareSourcesForSwapParams(liquiditySource)
    const params = {} as any
    if (!isExchangeB) {
      params.WithDesiredInput = {
        desired_amount_in: desiredCodecString,
        min_amount_out: result.sub(resultMulSlippage).toCodecString()
      }
    } else {
      params.WithDesiredOutput = {
        desired_amount_out: desiredCodecString,
        max_amount_in: result.add(resultMulSlippage).toCodecString()
      }
    }
    return {
      args: [
        this.root.defaultDEXId,
        assetA.address,
        assetB.address,
        params,
        liquiditySources,
        liquiditySource === LiquiditySourceTypes.Default ? 'Disabled' : 'AllowSelected'
      ]
    }
  }

  /**
   * Run swap operation
   * @param assetA Asset A
   * @param assetB Asset B
   * @param amountA Amount A value
   * @param amountB Amount B value
   * @param slippageTolerance Slippage tolerance coefficient (in %)
   * @param isExchangeB Exchange A if `isExchangeB=false` else Exchange B. `false` by default
   */
  public async execute (
    assetA: Asset | AccountAsset,
    assetB: Asset | AccountAsset,
    amountA: NumberLike,
    amountB: NumberLike,
    slippageTolerance: NumberLike = this.root.defaultSlippageTolerancePercent,
    isExchangeB = false,
    liquiditySource = LiquiditySourceTypes.Default
  ): Promise<void> {
    const params = await this.calcTxParams(assetA, assetB, amountA, amountB, slippageTolerance, isExchangeB, liquiditySource)
    if (!this.root.getAsset(assetB.address)) {
      this.root.addAccountAsset({ ...assetB, balance: ZeroBalance })
      this.root.updateAccountAssets()
    }
    await this.root.submitExtrinsic(
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
        type: Operation.Swap
      }
    )
  }

  /**
   * Run swap & send batch operation
   * @param assetAAddress Asset A address
   * @param assetBAddress Asset B address
   * @param amountA Amount A value
   * @param amountB Amount B value
   * @param swapResultValue getMinMaxValue() -> min received if exchange A, otherwise - user's input when Exchange B
   * @param accountId Account Id address
   * @param slippageTolerance Slippage tolerance coefficient (in %)
   * @param isExchangeB Exchange A if `isExchangeB=false` else Exchange B. `false` by default
   */
   public async executeSwapAndSend (
    assetA: Asset | AccountAsset,
    assetB: Asset | AccountAsset,
    amountA: NumberLike,
    amountB: NumberLike,
    swapResultValue: string,
    accountId: string,
    slippageTolerance: NumberLike = this.root.defaultSlippageTolerancePercent,
    isExchangeB = false,
    liquiditySource = LiquiditySourceTypes.Default
  ): Promise<void> {
    const params = await this.calcTxParams(assetA, assetB, amountA, amountB, slippageTolerance, isExchangeB, liquiditySource)
    if (!this.root.getAsset(assetB.address)) {
      this.root.addAccountAsset({ ...assetB, balance: ZeroBalance })
      this.root.updateAccountAssets()
    }

    const swap = (this.root.api.tx.liquidityProxy as any).swap(...params.args)
    const transfer = this.root.api.tx.assets.transfer(assetB.address, accountId, new FPNumber(swapResultValue, assetB.decimals).toCodecString())

    const formattedToAddress = accountId.slice(0, 2) === 'cn' ? accountId : this.root.formatAddress(accountId)

    await this.root.submitExtrinsic(
      this.root.api.tx.utility.batchAll([swap, transfer]),
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
        type: Operation.SwapAndSend
      }
    )
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
  public async getResultFromBackned (
    assetAAddress: string,
    assetBAddress: string,
    amount: NumberLike,
    isExchangeB = false,
    liquiditySource = LiquiditySourceTypes.Default
  ): Promise<SwapResult> {
    const assetA = await this.root.getAssetInfo(assetAAddress)
    const assetB = await this.root.getAssetInfo(assetBAddress)
    const liquiditySources = this.prepareSourcesForSwapParams(liquiditySource)
    const result = await (this.root.api.rpc as any).liquidityProxy.quote(
      this.root.defaultDEXId,
      assetAAddress,
      assetBAddress,
      new FPNumber(amount, (!isExchangeB ? assetA : assetB).decimals).toCodecString(),
      !isExchangeB ? 'WithDesiredInput' : 'WithDesiredOutput',
      liquiditySources,
      liquiditySource === LiquiditySourceTypes.Default ? 'Disabled' : 'AllowSelected'
    )
    const value = !result.isNone ? result.unwrap() : { amount: 0, fee: 0, rewards: [], amount_without_impact: 0 }
    return {
      amount: new FPNumber(value.amount, (!isExchangeB ? assetB : assetA).decimals).toCodecString(),
      fee: new FPNumber(value.fee, XOR.decimals).toCodecString(),
      rewards: 'toJSON' in value.rewards ? value.rewards.toJSON() : value.rewards,
      amountWithoutImpact: new FPNumber(value.amount_without_impact, (!isExchangeB ? assetB : assetA).decimals).toCodecString(),
    } as SwapResult
  }

  /**
   * **DEPRECATED**
   *
   * Check swap operation using `liquidityProxy.isPathAvailable` rpc call
   * @param firstAssetAddress
   * @param secondAssetAddress
   * @returns availability of swap operation
   */
   public async checkSwap (firstAssetAddress: string, secondAssetAddress: string): Promise<boolean> {
    return (await (this.root.api.rpc as any).liquidityProxy.isPathAvailable(this.root.defaultDEXId, firstAssetAddress, secondAssetAddress)).isTrue
  }

  /**
   * **DEPRECATED**
   *
   * Get liquidity sources for selected pair using `tradingPair.listEnabledSourcesForPair` rpc call
   * @param firstAssetAddress
   * @param secondAssetAddress
   */
  public async getEnabledLiquiditySourcesForPair (
    firstAssetAddress: string,
    secondAssetAddress: string
  ): Promise<Array<LiquiditySourceTypes>> {
    const baseAssetId = secondAssetAddress === XOR.address ? secondAssetAddress : firstAssetAddress
    const targetAssetId = baseAssetId === secondAssetAddress ? firstAssetAddress : secondAssetAddress
    const list = (await (this.root.api.rpc as any).tradingPair.listEnabledSourcesForPair(
      this.root.defaultDEXId,
      baseAssetId,
      targetAssetId
    )).toJSON()

    return (list as Array<LiquiditySourceTypes>)
  }

  /**
   * **DEPRECATED**
   *
   * Check liquidity Source availability for the selected pair using `tradingPair.isSourceEnabledForPair` rpc call
   * @param firstAssetAddress
   * @param secondAssetAddress
   * @param liquiditySource
   */
  public async checkLiquiditySourceIsEnabledForPair (
    firstAssetAddress: string,
    secondAssetAddress: string,
    liquiditySource: LiquiditySourceTypes
  ): Promise<boolean> {
    const isEnabled = (await (this.root.api.rpc as any).tradingPair.isSourceEnabledForPair(
      this.root.defaultDEXId,
      firstAssetAddress,
      secondAssetAddress,
      liquiditySource
    )).toJSON()

    return isEnabled
  }
}
