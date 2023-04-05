import { assert } from '@polkadot/util';
import { map } from 'rxjs';
import { FPNumber, NumberLike, CodecString } from '@sora-substrate/math';
import type { Observable } from '@polkadot/types/types';
import type { ITuple } from '@polkadot/types-codec/types';
import type { CommonPrimitivesAssetId32 } from '@polkadot/types/lookup';
import type { u128 } from '@polkadot/types-codec';

import { poolAccountIdFromAssetPair } from './account';
import { DexId } from '../dex/consts';
import { Messages } from '../logger';
import { Operation } from '../BaseApi';
import type { Api } from '../api';
import type { AccountLiquidity } from './types';
import type { Asset, AccountAsset } from '../assets/types';

export function serializeLPKey(liquidity: Partial<AccountLiquidity>): string {
  if (!(liquidity.firstAddress && liquidity.secondAddress)) {
    return '';
  }
  return `${liquidity.firstAddress},${liquidity.secondAddress}`;
}

export function deserializeLPKey(key: string): Partial<AccountLiquidity> {
  const [firstAddress, secondAddress] = key.split(',');
  if (!(firstAddress && secondAddress)) {
    return null;
  }
  return { firstAddress, secondAddress };
}

function toReserve(value: u128): CodecString {
  return new FPNumber(value).toCodecString();
}

function parseReserves(reserves: ITuple<[u128, u128]>): [CodecString, CodecString] {
  if (!reserves || reserves.length !== 2) {
    return ['0', '0'];
  }
  return [toReserve(reserves[0]), toReserve(reserves[1])];
}

export class PoolXykModule<T> {
  constructor(private readonly root: Api<T>) {}

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
  public getInfo(firstAssetAddress: string, secondAssetAddress: string): Asset | null {
    const poolTokenAccount = poolAccountIdFromAssetPair(this.root, firstAssetAddress, secondAssetAddress).toString();
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
    const props = await this.root.api.query.poolXYK.properties(firstAssetAddress, secondAssetAddress);
    if (!props || !props.isSome) {
      return false;
    }
    return true;
  }

  public getPoolBalanceObservable(
    firstAddress: string,
    secondAddress: string,
    accountAddress: string
  ): Observable<string | null> {
    const poolAccount = poolAccountIdFromAssetPair(this.root, firstAddress, secondAddress).toString();

    return this.root.apiRx.query.poolXYK.poolProviders(poolAccount, accountAddress).pipe(
      map((result) => {
        if (!result || !result.isSome) return null;

        return toReserve(result.value);
      })
    );
  }

  public getTotalSupplyObservable(firstAddress: string, secondAddress: string): Observable<string | null> {
    const poolAccount = poolAccountIdFromAssetPair(this.root, firstAddress, secondAddress).toString();

    return this.root.apiRx.query.poolXYK.totalIssuances(poolAccount).pipe(
      map((result) => {
        if (!result || !result.isSome) return null;

        return toReserve(result.value);
      })
    );
  }

  /**
   * Get pool properties observable
   * @param firstAssetAddress
   * @param secondAssetAddress
   */
  public getPoolPropertiesObservable(
    firstAssetAddress: string,
    secondAssetAddress: string
  ): Observable<string[] | null> {
    return this.root.apiRx.query.poolXYK.properties(firstAssetAddress, secondAssetAddress).pipe(
      map((result) => {
        if (!result || !result.isSome) return null;

        return result.value.map((accountId) => accountId.toString());
      })
    );
  }

  /**
   * Get pool reserves observable
   * @param firstAssetAddress
   * @param secondAssetAddress
   */
  public getReservesObservable(
    firstAssetAddress: string,
    secondAssetAddress: string
  ): Observable<[CodecString, CodecString]> {
    return this.root.apiRx.query.poolXYK
      .reserves(firstAssetAddress, secondAssetAddress)
      .pipe(map((reserves) => parseReserves(reserves)));
  }

  /**
   * Get liquidity reserves.
   * If the output will be `['0', '0']` then the client is the first liquidity provider
   * @param firstAssetAddress
   * @param secondAssetAddress
   */
  public async getReserves(firstAssetAddress: string, secondAssetAddress: string): Promise<Array<CodecString>> {
    const reserves = await this.root.api.query.poolXYK.reserves(firstAssetAddress, secondAssetAddress);

    return parseReserves(reserves);
  }

  public async getAllReserves(): Promise<Record<string, Array<CodecString>>> {
    const toKey = (address: CommonPrimitivesAssetId32) => address.code.toString();

    const reserves = {} as Record<string, Array<CodecString>>;
    const baseAssetIds = this.root.dex.baseAssetsIds;
    const allReserves = (
      await Promise.all(baseAssetIds.map((baseAssetId) => this.root.api.query.poolXYK.reserves.entries(baseAssetId)))
    ).flat(1);

    allReserves.forEach((item) => {
      // Decimals = 18 here
      const [key1, key2] = item[0].args;
      if (item[1]?.length == 2) {
        const [value1, value2] = item[1];
        reserves[toKey(key1) + toKey(key2)] = [toReserve(value1), toReserve(value2)];
      }
    });

    return reserves;
  }

  /**
   * Estimate tokens retrieved.
   * Also it returns the total supply as `result[2]`
   * @param firstAssetAddress
   * @param secondAssetAddress
   * @param amount
   * @param firstTotal Reserve A from `getReserves()[0]`
   * @param secondTotal Reserve B from `getReserves()[1]`
   * @param totalSupply Total issuance of pool
   * @param firstAssetDecimals If it's not set then request about asset info will be performed
   * @param secondAssetDecimals If it's not set then request about asset info will be performed
   */
  public estimateTokensRetrieved(
    firstAssetAddress: string,
    secondAssetAddress: string,
    amount: CodecString,
    firstTotal: CodecString,
    secondTotal: CodecString,
    totalSupply: CodecString,
    firstAssetDecimals?: number,
    secondAssetDecimals?: number
  ): Array<CodecString> {
    // actually, we don't need to use decimals here, so, we don't need to send these requests
    // firstAssetDecimals = firstAssetDecimals ?? (await this.getAssetInfo(firstAssetAddress)).decimals
    // secondAssetDecimals = secondAssetDecimals ?? (await this.getAssetInfo(secondAssetAddress)).decimals
    const a = FPNumber.fromCodecValue(firstTotal, firstAssetDecimals);
    const b = FPNumber.fromCodecValue(secondTotal, secondAssetDecimals);
    if (a.isZero() && b.isZero()) {
      return ['0', '0'];
    }
    const pIn = FPNumber.fromCodecValue(amount);
    const pts = FPNumber.fromCodecValue(totalSupply);
    const ptsFirstAsset = FPNumber.fromCodecValue(totalSupply, firstAssetDecimals);
    const ptsSecondAsset = FPNumber.fromCodecValue(totalSupply, secondAssetDecimals);
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
   * @param totalSupply Pool total issuance
   */
  public estimatePoolTokensMinted(
    firstAsset: Asset,
    secondAsset: Asset,
    firstAmount: NumberLike,
    secondAmount: NumberLike,
    firstTotal: CodecString,
    secondTotal: CodecString,
    totalSupply: CodecString
  ): Array<CodecString> {
    const decimals = Math.max(firstAsset.decimals, secondAsset.decimals);
    const aIn = new FPNumber(firstAmount, decimals);
    const bIn = new FPNumber(secondAmount, decimals);
    const a = FPNumber.fromCodecValue(firstTotal, decimals);
    const b = FPNumber.fromCodecValue(secondTotal, decimals);
    if (a.isZero() && b.isZero()) {
      const inaccuracy = new FPNumber('0.000000000000001');
      return [aIn.mul(bIn).sqrt().sub(inaccuracy).toCodecString()];
    }
    const poolToken = this.getInfo(firstAsset.address, secondAsset.address) as Asset;
    const pts = FPNumber.fromCodecValue(totalSupply, poolToken.decimals);
    const result = FPNumber.min(aIn.mul(pts).div(a), bIn.mul(pts).div(b)) as FPNumber;
    return [result.toCodecString(), pts.toCodecString()];
  }

  private arrangeAssetsForParams(
    firstAsset: Asset | AccountAsset,
    secondAsset: Asset | AccountAsset,
    firstAmount: NumberLike,
    secondAmount: NumberLike
  ): Array<any> {
    const isBaseAssetId = (address: string) => this.root.dex.baseAssetsIds.includes(address);
    const isFirstAssetSuitable = isBaseAssetId(firstAsset.address);
    const isSecondAssetSuitable = isBaseAssetId(secondAsset.address);

    assert(isFirstAssetSuitable || isSecondAssetSuitable, Messages.xorOrXstIsRequired);

    let baseAsset: Asset | AccountAsset,
      targetAsset: Asset | AccountAsset,
      baseAssetAmount: NumberLike,
      targetAssetAmount: NumberLike,
      DEXId: number;

    if (isFirstAssetSuitable) {
      DEXId = this.root.dex.getDexId(firstAsset.address);
      baseAsset = firstAsset;
      targetAsset = secondAsset;
      baseAssetAmount = firstAmount;
      targetAssetAmount = secondAmount;
    } else if (isSecondAssetSuitable) {
      DEXId = this.root.dex.getDexId(secondAsset.address);
      baseAsset = secondAsset;
      targetAsset = firstAsset;
      baseAssetAmount = secondAmount;
      targetAssetAmount = firstAmount;
    }

    return [baseAsset, targetAsset, baseAssetAmount, targetAssetAmount, DEXId];
  }

  public async getAccountLiquidityItem(
    poolAccount: string,
    firstAddress: string,
    secondAddress: string,
    reserves: [CodecString, CodecString],
    balance: CodecString | null,
    totalSupply: CodecString | null
  ): Promise<AccountLiquidity | null> {
    if (!(balance && Number(balance) && totalSupply)) return null;

    const { decimals, symbol, name } = this.getInfoByPoolAccount(poolAccount);
    const firstAsset = await this.root.assets.getAssetInfo(firstAddress);
    const secondAsset = await this.root.assets.getAssetInfo(secondAddress);
    const [reserveA, reserveB] = reserves;
    const [balanceA, balanceB] = this.estimateTokensRetrieved(
      firstAddress,
      secondAddress,
      balance,
      reserveA,
      reserveB,
      totalSupply,
      firstAsset.decimals,
      secondAsset.decimals
    );

    const fpBalance = FPNumber.fromCodecValue(balance, decimals);
    const pts = FPNumber.fromCodecValue(totalSupply, decimals);
    const poolShare = fpBalance.div(pts).mul(FPNumber.HUNDRED).toString() || '0';

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
      poolShare,
      reserveA,
      reserveB,
      totalSupply,
    } as AccountLiquidity;
  }

  private calcAddTxParams(
    firstAsset: Asset | AccountAsset,
    secondAsset: Asset | AccountAsset,
    firstAmount: NumberLike,
    secondAmount: NumberLike,
    slippageTolerance: NumberLike = this.root.defaultSlippageTolerancePercent,
    DEXId = DexId.XOR
  ) {
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
  public add(
    firstAsset: Asset | AccountAsset,
    secondAsset: Asset | AccountAsset,
    firstAmount: NumberLike,
    secondAmount: NumberLike,
    slippageTolerance: NumberLike = this.root.defaultSlippageTolerancePercent
  ): Promise<T> {
    const [baseAsset, targetAsset, baseAssetAmount, targetAssetAmount, DEXId] = this.arrangeAssetsForParams(
      firstAsset,
      secondAsset,
      firstAmount,
      secondAmount
    );

    const params = this.calcAddTxParams(
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
    return this.root.submitExtrinsic(
      (this.root.api.tx.poolXYK as any).depositLiquidity(...params.args),
      this.root.account.pair,
      {
        type: Operation.AddLiquidity,
        symbol: firstAsset.symbol,
        assetAddress: firstAsset.address,
        symbol2: secondAsset.symbol,
        asset2Address: secondAsset.address,
        amount: `${firstAmount}`,
        amount2: `${secondAmount}`,
        decimals: firstAsset.decimals,
        decimals2: secondAsset.decimals,
      }
    );
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

    const baseAssetAllowed = this.root.dex.poolBaseAssetsIds.includes(baseAsset.address);
    assert(baseAssetAllowed, Messages.pairBaseAssetNotAllowed);
    const exists = await this.check(baseAsset.address, targetAsset.address);
    assert(!exists, Messages.pairAlreadyCreated);

    const params = this.calcAddTxParams(
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
  ): Promise<T> {
    const params = await this.calcCreateTxParams(firstAsset, secondAsset, firstAmount, secondAmount, slippageTolerance);
    const [dexId, baseAddress, targetAddress] = params.pairCreationArgs;
    const isPairAlreadyCreated = (await this.root.api.rpc.tradingPair.isPairEnabled(dexId, baseAddress, targetAddress))
      .isTrue as boolean;
    const transactions: Array<any> = [];
    if (!isPairAlreadyCreated) {
      transactions.push((this.root.api.tx.tradingPair as any).register(...params.pairCreationArgs));
    }
    transactions.push(
      ...[
        (this.root.api.tx.poolXYK as any).initializePool(...params.pairCreationArgs),
        (this.root.api.tx.poolXYK as any).depositLiquidity(...params.addLiquidityArgs),
      ]
    );
    if (!this.root.assets.getAsset(secondAsset.address)) {
      this.root.assets.addAccountAsset(secondAsset.address);
    }
    return this.root.submitExtrinsic(this.root.api.tx.utility.batchAll(transactions), this.root.account.pair, {
      type: Operation.CreatePair,
      symbol: firstAsset.symbol,
      assetAddress: firstAsset.address,
      symbol2: secondAsset.symbol,
      asset2Address: secondAsset.address,
      amount: `${params.baseAssetAmount}`,
      amount2: `${params.targetAssetAmount}`,
    });
  }

  private calcRemoveTxParams(
    firstAsset: Asset | AccountAsset,
    secondAsset: Asset | AccountAsset,
    desiredMarker: string,
    firstTotal: CodecString,
    secondTotal: CodecString,
    totalSupply: CodecString,
    slippageTolerance: NumberLike = this.root.defaultSlippageTolerancePercent
  ) {
    const poolToken = this.getInfo(firstAsset.address, secondAsset.address) as Asset;
    const desired = new FPNumber(desiredMarker, poolToken.decimals);
    const reserveA = FPNumber.fromCodecValue(firstTotal, firstAsset.decimals);
    const reserveB = FPNumber.fromCodecValue(secondTotal, secondAsset.decimals);
    const pts = FPNumber.fromCodecValue(totalSupply, poolToken.decimals);
    const desiredA = desired.mul(reserveA).div(pts);
    const desiredB = desired.mul(reserveB).div(pts);
    const slippage = new FPNumber(Number(slippageTolerance) / 100);
    const dexId = this.root.dex.getDexId(firstAsset.address);
    // The order of args is important
    return {
      args: [
        dexId,
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
  public remove(
    firstAsset: Asset | AccountAsset,
    secondAsset: Asset | AccountAsset,
    desiredMarker: string,
    firstTotal: CodecString,
    secondTotal: CodecString,
    totalSupply: CodecString,
    slippageTolerance: NumberLike = this.root.defaultSlippageTolerancePercent
  ): Promise<T> {
    const params = this.calcRemoveTxParams(
      firstAsset,
      secondAsset,
      desiredMarker,
      firstTotal,
      secondTotal,
      totalSupply,
      slippageTolerance
    );
    return this.root.submitExtrinsic(
      (this.root.api.tx.poolXYK as any).withdrawLiquidity(...params.args),
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
