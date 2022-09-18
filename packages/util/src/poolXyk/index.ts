import { assert } from '@polkadot/util';
import { Subject, combineLatest } from '@polkadot/x-rxjs';
import { FPNumber, NumberLike, CodecString } from '@sora-substrate/math';
import type { Codec } from '@polkadot/types/types';
import type { Subscription } from '@polkadot/x-rxjs';

import { poolAccountIdFromAssetPair } from './account';
import { XOR, XSTUSD } from '../assets/consts';
import { Messages } from '../logger';
import { Operation } from '../BaseApi';
import type { Api } from '../api';
import type { AccountLiquidity } from './types';
import type { Asset, AccountAsset } from '../assets/types';

export class PoolXykModule {
  constructor(private readonly root: Api) {}

  private subscriptions: Map<string, Subscription> = new Map();
  private subject = new Subject<void>();
  public updated = this.subject.asObservable();
  public accountLiquidity: Array<AccountLiquidity> = [];
  public accountLiquidityLoaded!: Subject<void>;

  private addToLiquidityList(asset: AccountLiquidity): void {
    const liquidityCopy = [...this.accountLiquidity];
    const index = liquidityCopy.findIndex((item) => item.address === asset.address);

    ~index ? (liquidityCopy[index] = asset) : liquidityCopy.push(asset);

    this.accountLiquidity = liquidityCopy;
  }

  /**
   * Get liquidity
   * @param firstAssetAddress
   * @param secondAssetAddress
   */
  public getInfoByPoolAccount(poolTokenAccount: string): Asset {
    return {
      address: poolTokenAccount,
      decimals: 18,
      name: 'Pool XYK Token',
      symbol: 'POOLXYK',
    };
  }

  /**
   * Get liquidity
   * @param firstAssetAddress
   * @param secondAssetAddress
   */
  public getInfo(firstAssetAddress: string, secondAssetAddress: string): Asset {
    const poolTokenAccount = poolAccountIdFromAssetPair(
      this.root.api,
      firstAssetAddress,
      secondAssetAddress
    ).toString();
    if (!poolTokenAccount) {
      return null;
    }
    return this.getInfoByPoolAccount(poolTokenAccount);
  }

  /**
   * Check liquidity create/add operation
   * @param firstAssetAddress
   * @param secondAssetAddress
   */
  public async check(firstAssetAddress: string, secondAssetAddress: string): Promise<boolean> {
    const props = (
      await this.root.api.query.poolXyk.properties(firstAssetAddress, secondAssetAddress)
    ).toJSON() as Array<string>;
    if (!props || !props.length) {
      return false;
    }
    return true;
  }

  /**
   * Get liquidity reserves.
   * If the output will be `['0', '0']` then the client is the first liquidity provider
   * @param firstAssetAddress
   * @param secondAssetAddress
   * @param firstAssetDecimals
   * @param secondAssetDecimals
   */
  public async getReserves(
    firstAssetAddress: string,
    secondAssetAddress: string,
    firstAssetDecimals?: number,
    secondAssetDecimals?: number
  ): Promise<Array<CodecString>> {
    const result = (await this.root.api.query.poolXyk.reserves(firstAssetAddress, secondAssetAddress)) as any; // Array<Balance>
    if (!result || result.length !== 2) {
      return ['0', '0'];
    }
    const firstValue = new FPNumber(result[0], firstAssetDecimals);
    const secondValue = new FPNumber(result[1], secondAssetDecimals);
    return [firstValue.toCodecString(), secondValue.toCodecString()];
  }

  public async getAllReserves() {
    // TODO: Add this method
  }

  /**
   * Estimate tokens retrieved.
   * Also it returns the total supply as `result[2]`
   * @param firstAssetAddress
   * @param secondAssetAddress
   * @param amount
   * @param firstTotal Reserve A from `getReserves()[0]`
   * @param secondTotal Reserve B from `getReserves()[1]`
   * @param poolTokenAddress If it isn't set then it will be found by the get request
   * @param firstAssetDecimals If it's not set then request about asset info will be performed
   * @param secondAssetDecimals If it's not set then request about asset info will be performed
   */
  public async estimateTokensRetrieved(
    firstAssetAddress: string,
    secondAssetAddress: string,
    amount: CodecString,
    firstTotal: CodecString,
    secondTotal: CodecString,
    poolTokenAddress?: string,
    firstAssetDecimals?: number,
    secondAssetDecimals?: number
  ): Promise<Array<CodecString>> {
    // actually, we don't need to use decimals here, so, we don't need to send these requests
    // firstAssetDecimals = firstAssetDecimals ?? (await this.getAssetInfo(firstAssetAddress)).decimals
    // secondAssetDecimals = secondAssetDecimals ?? (await this.getAssetInfo(secondAssetAddress)).decimals
    const a = FPNumber.fromCodecValue(firstTotal, firstAssetDecimals);
    const b = FPNumber.fromCodecValue(secondTotal, secondAssetDecimals);
    if (a.isZero() && b.isZero()) {
      return ['0', '0'];
    }
    const pIn = FPNumber.fromCodecValue(amount);
    const totalSupply = await this.root.api.query.poolXyk.totalIssuances(poolTokenAddress); // BalanceInfo
    const pts = new FPNumber(totalSupply);
    const ptsFirstAsset = new FPNumber(totalSupply, firstAssetDecimals);
    const ptsSecondAsset = new FPNumber(totalSupply, secondAssetDecimals);
    const aOut = pIn.mul(a).div(ptsFirstAsset);
    const bOut = pIn.mul(b).div(ptsSecondAsset);
    return [aOut.toCodecString(), bOut.toCodecString(), pts.toCodecString()];
  }

  /**
   * Estimate pool tokens minted.
   * @param firstAsset First asset
   * @param secondAsset Second asset
   * @param firstAmount First asset amount
   * @param secondAmount Second asset amount
   * @param firstTotal getReserves()[0]
   * @param secondTotal getReserves()[1]
   */
  public async estimatePoolTokensMinted(
    firstAsset: Asset,
    secondAsset: Asset,
    firstAmount: NumberLike,
    secondAmount: NumberLike,
    firstTotal: CodecString,
    secondTotal: CodecString
  ): Promise<Array<CodecString>> {
    const decimals = Math.max(firstAsset.decimals, secondAsset.decimals);
    const aIn = new FPNumber(firstAmount, decimals);
    const bIn = new FPNumber(secondAmount, decimals);
    const a = FPNumber.fromCodecValue(firstTotal, decimals);
    const b = FPNumber.fromCodecValue(secondTotal, decimals);
    if (a.isZero() && b.isZero()) {
      const inaccuracy = new FPNumber('0.000000000000001');
      return [aIn.mul(bIn).sqrt().sub(inaccuracy).toCodecString()];
    }
    const poolToken = this.getInfo(firstAsset.address, secondAsset.address);
    const totalSupply = await this.root.api.query.poolXyk.totalIssuances(poolToken.address); // BalanceInfo
    const pts = new FPNumber(totalSupply, poolToken.decimals);
    const result = FPNumber.min(aIn.mul(pts).div(a), bIn.mul(pts).div(b));
    return [result.toCodecString(), pts.toCodecString()];
  }

  private async subscribeOnAccountLiquidity(liquidity: Partial<AccountLiquidity>): Promise<void> {
    if (this.subscriptions.has(liquidity.secondAddress)) return;

    const poolAccount = poolAccountIdFromAssetPair(this.root.api, XOR.address, liquidity.secondAddress).toString();
    const accountPoolBalanceObservable = this.root.apiRx.query.poolXyk.poolProviders(
      poolAccount,
      this.root.account.pair.address
    );
    const poolReservesObservable = this.root.apiRx.query.poolXyk.reserves(XOR.address, liquidity.secondAddress);

    let subscription: Subscription;
    let isFirstTick = true;

    await new Promise<void>((resolve) => {
      subscription = combineLatest([poolReservesObservable, accountPoolBalanceObservable]).subscribe(
        async ([reserves, balance]) => {
          const updatedLiquidity = await this.getAccountLiquidityItem(
            poolAccount,
            XOR.address,
            liquidity.secondAddress,
            reserves,
            balance
          );
          // add or update liquidity only if subscription exists, or this is first subscription result
          if (updatedLiquidity && (this.subscriptions.has(liquidity.secondAddress) || isFirstTick)) {
            this.addToLiquidityList(updatedLiquidity);
          } else {
            this.removeAccountLiquidity(liquidity); // Remove it from list if something was wrong
          }

          isFirstTick = false;
          this.subject.next();
          resolve();
        }
      );
    });

    this.subscriptions.set(liquidity.secondAddress, subscription);
  }

  private arrangeAssetsForParams(
    firstAsset: Asset | AccountAsset,
    secondAsset: Asset | AccountAsset,
    firstAmount: NumberLike,
    secondAmount: NumberLike
  ) {
    let baseAsset, targetAsset, baseAssetAmount, targetAssetAmount, DEXId;

    if (firstAsset.address === XSTUSD.address && secondAsset.address === XOR.address) {
      DEXId = this.root.defaultDEXId;
      baseAsset = secondAsset;
      targetAsset = firstAsset;
      baseAssetAmount = secondAmount;
      targetAssetAmount = firstAmount;
    } else if ([XOR.address, XSTUSD.address].includes(firstAsset.address)) {
      DEXId = firstAsset.address === XOR.address ? this.root.defaultDEXId : this.root.xstDEXId;
      baseAsset = firstAsset;
      targetAsset = secondAsset;
      baseAssetAmount = firstAmount;
      targetAssetAmount = secondAmount;
    } else if ([XOR.address, XSTUSD.address].includes(secondAsset.address)) {
      DEXId = secondAsset.address === XOR.address ? this.root.defaultDEXId : this.root.xstDEXId;
      baseAsset = secondAsset;
      targetAsset = firstAsset;
      baseAssetAmount = secondAmount;
      targetAssetAmount = firstAmount;
    } else {
      assert(false, Messages.xorOrXstIsRequired);
    }

    return [baseAsset, targetAsset, baseAssetAmount, targetAssetAmount, DEXId];
  }

  private async getAccountLiquidityItem(
    poolAccount: string,
    firstAddress: string,
    secondAddress: string,
    reserves: Codec,
    balanceCodec: Codec
  ): Promise<AccountLiquidity | null> {
    if (!reserves || !(reserves[0] || reserves[1]) || !balanceCodec) return null;

    const { decimals, symbol, name } = this.getInfoByPoolAccount(poolAccount);
    const balanceFPNumber = new FPNumber(balanceCodec, decimals);

    if (balanceFPNumber.isZero()) {
      return null;
    }
    const balance = balanceFPNumber.toCodecString();
    if (!Number(balance)) {
      return null;
    }
    const firstAsset = await this.root.assets.getAssetInfo(firstAddress);
    const secondAsset = await this.root.assets.getAssetInfo(secondAddress);
    const reserveA = new FPNumber(reserves[0]).toCodecString();
    const reserveB = new FPNumber(reserves[1]).toCodecString();
    const [balanceA, balanceB, totalSupply] = await this.estimateTokensRetrieved(
      firstAddress,
      secondAddress,
      balance,
      reserveA,
      reserveB,
      poolAccount,
      firstAsset.decimals,
      secondAsset.decimals
    );
    const fpBalanceA = FPNumber.fromCodecValue(balanceA, firstAsset.decimals);
    const fpBalanceB = FPNumber.fromCodecValue(balanceB, secondAsset.decimals);
    const pts = FPNumber.fromCodecValue(totalSupply, decimals);
    const minted = FPNumber.max(
      fpBalanceA.mul(pts).div(FPNumber.fromCodecValue(reserveA, firstAsset.decimals)),
      fpBalanceB.mul(pts).div(FPNumber.fromCodecValue(reserveB, secondAsset.decimals))
    );
    return {
      address: poolAccount,
      firstAddress,
      secondAddress,
      firstBalance: balanceA,
      secondBalance: balanceB,
      symbol,
      decimals: firstAsset.decimals,
      decimals2: secondAsset.decimals,
      balance,
      name,
      poolShare: minted.div(pts).mul(FPNumber.HUNDRED).format() || '0',
    } as AccountLiquidity;
  }

  public unsubscribeFromAccountLiquidity(liquidity: Partial<AccountLiquidity>): void {
    this.subscriptions.get(liquidity.secondAddress)?.unsubscribe();
    this.subscriptions.delete(liquidity.secondAddress);
  }

  public unsubscribeFromAllUpdates(): void {
    for (const secondAddress of this.subscriptions.keys()) {
      this.unsubscribeFromAccountLiquidity({ secondAddress });
    }
  }

  private removeAccountLiquidity(liquidity: Partial<AccountLiquidity>): void {
    this.unsubscribeFromAccountLiquidity(liquidity);
    this.accountLiquidity = this.accountLiquidity.filter((item) => item.secondAddress !== liquidity.secondAddress);
  }

  public clearAccountLiquidity(): void {
    this.unsubscribeFromAllUpdates();
    this.accountLiquidity = [];
  }

  /**
   * Set subscriptions for balance updates of the account asset list
   * @param targetAssetIds
   */
  private async updateAccountLiquiditySubscriptions(targetAssetIds: Array<string>): Promise<void> {
    assert(this.root.account, Messages.connectWallet);

    // liquidities to be subscribed
    const includedLiquidityList = targetAssetIds.map((id) => ({ secondAddress: id }));
    // liquidities to be unsubscribed and removed
    const excludedLiquidityList = this.accountLiquidity.reduce<AccountLiquidity[]>(
      (result, liquidity) => (targetAssetIds.includes(liquidity.secondAddress) ? result : [...result, liquidity]),
      []
    );

    for (const liquidity of excludedLiquidityList) {
      this.removeAccountLiquidity(liquidity);
    }

    for (const liquidity of includedLiquidityList) {
      await this.subscribeOnAccountLiquidity(liquidity);
    }

    this.subject.next();
  }

  /**
   * Subscription which should be used when user is on the pool page.
   * Also, it can be used in a background - it depends on the performance.
   *
   * Do not forget to call `unsubscribe`
   */
  public getUserPoolsSubscription(): Subscription {
    assert(this.root.account, Messages.connectWallet);

    this.accountLiquidityLoaded = new Subject<void>();

    return this.root.apiRx.query.poolXyk.accountPools(this.root.accountPair.address).subscribe(async (result) => {
      const targetIds = result.toJSON() as Array<string>;
      await this.updateAccountLiquiditySubscriptions(targetIds);

      this.accountLiquidityLoaded.complete();
    });
  }

  private async calcAddTxParams(
    firstAsset: Asset | AccountAsset,
    secondAsset: Asset | AccountAsset,
    firstAmount: NumberLike,
    secondAmount: NumberLike,
    slippageTolerance: NumberLike = this.root.defaultSlippageTolerancePercent,
    DEXId = this.root.defaultDEXId
  ) {
    assert(this.root.account, Messages.connectWallet);
    const firstAmountNum = new FPNumber(firstAmount, firstAsset.decimals);
    const secondAmountNum = new FPNumber(secondAmount, secondAsset.decimals);
    const slippage = new FPNumber(Number(slippageTolerance) / 100);
    return {
      args: [
        DEXId,
        firstAsset.address,
        secondAsset.address,
        firstAmountNum.toCodecString(),
        secondAmountNum.toCodecString(),
        firstAmountNum.sub(firstAmountNum.mul(slippage)).toCodecString(),
        secondAmountNum.sub(secondAmountNum.mul(slippage)).toCodecString(),
      ],
    };
  }

  /**
   * Add liquidity
   * @param firstAsset
   * @param secondAsset
   * @param firstAmount
   * @param secondAmount // TODO: add a case when 'B' should be calculated automatically
   * @param slippageTolerance Slippage tolerance coefficient (in %)
   */
  public async add(
    firstAsset: Asset | AccountAsset,
    secondAsset: Asset | AccountAsset,
    firstAmount: NumberLike,
    secondAmount: NumberLike,
    slippageTolerance: NumberLike = this.root.defaultSlippageTolerancePercent
  ): Promise<void> {
    const [baseAsset, targetAsset, baseAssetAmount, targetAssetAmount, DEXId] = this.arrangeAssetsForParams(
      firstAsset,
      secondAsset,
      firstAmount,
      secondAmount
    );

    const params = await this.calcAddTxParams(
      baseAsset,
      targetAsset,
      baseAssetAmount,
      targetAssetAmount,
      slippageTolerance,
      DEXId
    );
    if (!this.root.assets.getAsset(secondAsset.address)) {
      this.root.assets.addAccountAsset(secondAsset.address);
    }
    await this.root.submitExtrinsic(this.root.api.tx.poolXyk.depositLiquidity(...params.args), this.root.account.pair, {
      type: Operation.AddLiquidity,
      symbol: firstAsset.symbol,
      assetAddress: firstAsset.address,
      symbol2: secondAsset.symbol,
      asset2Address: secondAsset.address,
      amount: `${firstAmount}`,
      amount2: `${secondAmount}`,
      decimals: firstAsset.decimals,
      decimals2: secondAsset.decimals,
    });
  }

  private async calcCreateTxParams(
    firstAsset: Asset | AccountAsset,
    secondAsset: Asset | AccountAsset,
    firstAmount: NumberLike,
    secondAmount: NumberLike,
    slippageTolerance: NumberLike = this.root.defaultSlippageTolerancePercent
  ) {
    const [baseAsset, targetAsset, baseAssetAmount, targetAssetAmount, DEXId] = this.arrangeAssetsForParams(
      firstAsset,
      secondAsset,
      firstAmount,
      secondAmount
    );

    const exists = await this.check(baseAsset.address, targetAsset.address);
    assert(!exists, Messages.pairAlreadyCreated);

    const params = await this.calcAddTxParams(
      baseAsset,
      targetAsset,
      baseAssetAmount,
      targetAssetAmount,
      slippageTolerance,
      DEXId
    );
    return {
      pairCreationArgs: [DEXId, baseAsset.address, targetAsset.address],
      addLiquidityArgs: params.args,
      baseAssetAmount,
      targetAssetAmount,
    };
  }

  /**
   * Create token pair if user is the first liquidity provider and pair is not created.
   * Before it you should check liquidity
   * (`checkLiquidity()` -> `false`).
   *
   * Condition: Account **must** have CAN_MANAGE_DEX( DEXId ) permission,
   * XOR asset **should** be required for any pair
   * @param firstAsset
   * @param secondAsset
   * @param firstAmount
   * @param secondAmount
   * @param slippageTolerance Slippage tolerance coefficient (in %)
   */
  public async create(
    firstAsset: Asset | AccountAsset,
    secondAsset: Asset | AccountAsset,
    firstAmount: NumberLike,
    secondAmount: NumberLike,
    slippageTolerance: NumberLike = this.root.defaultSlippageTolerancePercent
  ): Promise<void> {
    const params = await this.calcCreateTxParams(firstAsset, secondAsset, firstAmount, secondAmount, slippageTolerance);
    const isPairAlreadyCreated = (
      await (this.root.api.rpc as any).tradingPair.isPairEnabled(
        this.root.defaultDEXId,
        firstAsset.address,
        secondAsset.address
      )
    ).isTrue as boolean;
    const transactions = [];
    if (!isPairAlreadyCreated) {
      transactions.push((this.root.api.tx.tradingPair as any).register(...params.pairCreationArgs));
    }
    transactions.push(
      ...[
        this.root.api.tx.poolXyk.initializePool(...params.pairCreationArgs),
        this.root.api.tx.poolXyk.depositLiquidity(...params.addLiquidityArgs),
      ]
    );
    if (!this.root.assets.getAsset(secondAsset.address)) {
      this.root.assets.addAccountAsset(secondAsset.address);
    }
    await this.root.submitExtrinsic(this.root.api.tx.utility.batchAll(transactions), this.root.account.pair, {
      type: Operation.CreatePair,
      symbol: firstAsset.symbol,
      assetAddress: firstAsset.address,
      symbol2: secondAsset.symbol,
      asset2Address: secondAsset.address,
      amount: `${params.baseAssetAmount}`,
      amount2: `${params.targetAssetAmount}`,
    });
  }

  private async calcRemoveTxParams(
    firstAsset: Asset | AccountAsset,
    secondAsset: Asset | AccountAsset,
    desiredMarker: string,
    firstTotal: CodecString,
    secondTotal: CodecString,
    totalSupply: CodecString,
    slippageTolerance: NumberLike = this.root.defaultSlippageTolerancePercent
  ) {
    assert(this.root.account, Messages.connectWallet);
    const poolToken = this.getInfo(firstAsset.address, secondAsset.address);
    const desired = new FPNumber(desiredMarker, poolToken.decimals);
    const reserveA = FPNumber.fromCodecValue(firstTotal, firstAsset.decimals);
    const reserveB = FPNumber.fromCodecValue(secondTotal, secondAsset.decimals);
    const pts = FPNumber.fromCodecValue(totalSupply, poolToken.decimals);
    const desiredA = desired.mul(reserveA).div(pts);
    const desiredB = desired.mul(reserveB).div(pts);
    const slippage = new FPNumber(Number(slippageTolerance) / 100);
    return {
      args: [
        this.root.defaultDEXId,
        firstAsset.address,
        secondAsset.address,
        desired.toCodecString(),
        desiredA.sub(desiredA.mul(slippage)).toCodecString(),
        desiredB.sub(desiredB.mul(slippage)).toCodecString(),
      ],
      // amountA, amountB - without slippage (for initial history)
      amountA: desiredA.toString(),
      amountB: desiredB.toString(),
    };
  }

  /**
   * Remove liquidity
   * @param firstAsset
   * @param secondAsset
   * @param desiredMarker
   * @param firstTotal getReserves()[0]
   * @param secondTotal getReserves()[1]
   * @param totalSupply Total supply coefficient, estimateTokensRetrieved()[2]
   * @param slippageTolerance Slippage tolerance coefficient (in %)
   */
  public async remove(
    firstAsset: Asset | AccountAsset,
    secondAsset: Asset | AccountAsset,
    desiredMarker: string,
    firstTotal: CodecString,
    secondTotal: CodecString,
    totalSupply: CodecString,
    slippageTolerance: NumberLike = this.root.defaultSlippageTolerancePercent
  ): Promise<void> {
    const params = await this.calcRemoveTxParams(
      firstAsset,
      secondAsset,
      desiredMarker,
      firstTotal,
      secondTotal,
      totalSupply,
      slippageTolerance
    );
    await this.root.submitExtrinsic(
      this.root.api.tx.poolXyk.withdrawLiquidity(...params.args),
      this.root.account.pair,
      {
        type: Operation.RemoveLiquidity,
        symbol: firstAsset.symbol,
        assetAddress: firstAsset.address,
        symbol2: secondAsset.symbol,
        asset2Address: secondAsset.address,
        amount: params.amountA,
        amount2: params.amountB,
      }
    );
  }
}
