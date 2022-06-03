import { map } from '@polkadot/x-rxjs/operators';
import { combineLatest } from '@polkadot/x-rxjs';
import { assert } from '@polkadot/util';
import type { Observable } from '@polkadot/types/types';
import type { NumberLike } from '@sora-substrate/math';

import { FPNumber } from '@sora-substrate/math';

import { Messages } from '../logger';
import { Operation } from '../BaseApi';
import { XOR } from '../assets/consts';

import type { Api } from '../api';
import type { AccountAsset, Asset } from '../assets/types';
import type { DemeterPool, DemeterRewardToken, DemeterAccountPool } from './types';

export class DemeterFarmingModule {
  constructor(private readonly root: Api) {}

  /**
   * Get a list of pools for farming & staking, by provided pool & reward asset adresses
   * @param poolAsset address of pool asset (paired with XOR)
   * @param rewardAsset address of reward asset
   * @returns Observable list of pools
   */
  public getPoolsByAssetsObservable(poolAsset: string, rewardAsset: string): Observable<DemeterPool[]> {
    return this.root.apiRx.query.demeterFarmingPlatform.pools(poolAsset, rewardAsset).pipe(
      map((poolDataVec) => {
        return poolDataVec.map((poolData) => ({
          poolAsset,
          rewardAsset,
          multiplier: Number(poolData.multiplier),
          isCore: poolData.is_core.isTrue,
          isFarm: poolData.is_farm.isTrue,
          isRemoved: poolData.is_removed.isTrue,
          depositFee: new FPNumber(poolData.deposit_fee).toNumber(),
          totalTokensInPool: new FPNumber(poolData.total_tokens_in_pool),
          rewards: new FPNumber(poolData.rewards),
          rewardsToBeDistributed: new FPNumber(poolData.rewards_to_be_distributed),
        }));
      })
    );
  }

  /**
   * Get a list of all pools for farming and staking
   * @returns Observable list of pools
   */
  public async getPoolsObservable(): Promise<Observable<DemeterPool[]>> {
    const storageKeys = await this.root.api.query.demeterFarmingPlatform.pools.keys();

    const keys = storageKeys.map((item) => {
      const [poolAssetId, rewardAssetId] = item.args;

      return {
        poolAsset: poolAssetId.toString(),
        rewardAsset: rewardAssetId.toString(),
      };
    });

    const observables = keys.map(({ poolAsset, rewardAsset }) =>
      this.getPoolsByAssetsObservable(poolAsset, rewardAsset)
    );

    return combineLatest(observables).pipe(map((data) => data.flat()));
  }

  /**
   * Get an info about reward token
   * @param assetId asset address
   * @returns Observable token info
   */
  public getTokenInfoObservable(assetId: string): Observable<DemeterRewardToken> {
    return this.root.apiRx.query.demeterFarmingPlatform.tokenInfos(assetId).pipe(
      map((tokenInfo) => {
        const data = tokenInfo.unwrap();

        return {
          assetId,
          tokenPerBlock: new FPNumber(data.token_per_block),
          farmsTotalMultiplier: Number(data.farms_total_multiplier),
          stakingTotalMultiplier: Number(data.staking_total_multiplier),
          farmsAllocation: new FPNumber(data.farms_allocation),
          stakingAllocation: new FPNumber(data.staking_allocation),
          teamAllocation: new FPNumber(data.team_allocation),
        };
      })
    );
  }

  /**
   * Get a list of all reward tokens
   * @returns Observable list of token infos
   */
  public async getTokenInfosObservable(): Promise<Observable<DemeterRewardToken[]>> {
    const storageKeys = await this.root.api.query.demeterFarmingPlatform.tokenInfos.keys();

    const keys = storageKeys.map((item) => item.args[0].toString());

    const observables = keys.map((assetId) => this.getTokenInfoObservable(assetId));

    return combineLatest(observables);
  }

  /**
   * Get a list of active account pools for farming & staking
   * @returns Observable list of account pools (farming & staking)
   */
  public getAccountPoolsObservable(): Observable<DemeterAccountPool[]> {
    assert(this.root.account, Messages.connectWallet);

    return this.root.apiRx.query.demeterFarmingPlatform.userInfos(this.root.account.pair.address).pipe(
      map((userInfoVec) => {
        return userInfoVec.map((data) => ({
          isFarm: data.is_farm.isTrue,
          poolAsset: data.pool_asset.toString(),
          pooledTokens: new FPNumber(data.pooled_tokens),
          rewardAsset: data.reward_asset.toString(),
          rewards: new FPNumber(data.rewards),
        }));
      })
    );
  }

  /**
   * Deposit LP tokens for farming pool
   * @param poolAsset address of pool asset (paired with XOR)
   * @param rewardAsset address of reward asset
   * @param amount amount of LP tokens to be provided for farming
   */
  public async depositLiquidity(
    poolAsset: Asset | AccountAsset,
    rewardAsset: Asset | AccountAsset,
    amount: NumberLike
  ): Promise<void> {
    assert(this.root.account, Messages.connectWallet);

    const isFarm = true;
    const value = new FPNumber(amount).toCodecString();

    await this.root.submitExtrinsic(
      this.root.api.tx.demeterFarmingPlatform.deposit(poolAsset.address, rewardAsset.address, isFarm, value),
      this.root.account.pair,
      {
        type: Operation.DemeterFarmingDepositLiquidity,
        symbol: XOR.symbol,
        assetAddress: XOR.address,
        symbol2: poolAsset.symbol,
        asset2Address: poolAsset.address,
        amount: `${amount}`,
      }
    );
  }

  /**
   * Withdraw LP tokens from farming pool
   * @param poolAsset address of pool asset (paired with XOR)
   * @param rewardAsset address of reward asset
   * @param amount amount of LP tokens to be withdrawed from farming
   */
  public async withdrawLiquidity(
    poolAsset: Asset | AccountAsset,
    rewardAsset: Asset | AccountAsset,
    amount: NumberLike
  ): Promise<void> {
    assert(this.root.account, Messages.connectWallet);

    const isFarm = true;
    const value = new FPNumber(amount).toCodecString();

    await this.root.submitExtrinsic(
      this.root.api.tx.demeterFarmingPlatform.withdraw(poolAsset.address, rewardAsset.address, value, isFarm),
      this.root.account.pair,
      {
        type: Operation.DemeterFarmingWithdrawLiquidity,
        symbol: XOR.symbol,
        assetAddress: XOR.address,
        symbol2: poolAsset.symbol,
        asset2Address: poolAsset.address,
        amount: `${amount}`,
      }
    );
  }

  /**
   * Stake token
   * @param asset address of asset to be staked
   * @param rewardAsset address of reward asset
   * @param amount amount of tokens to be staked
   */
  public async stake(
    asset: Asset | AccountAsset,
    rewardAsset: Asset | AccountAsset,
    amount: NumberLike
  ): Promise<void> {
    assert(this.root.account, Messages.connectWallet);

    const isFarm = false;
    const value = new FPNumber(amount, asset.decimals).toCodecString();

    await this.root.submitExtrinsic(
      this.root.api.tx.demeterFarmingPlatform.deposit(asset.address, rewardAsset.address, isFarm, value),
      this.root.account.pair,
      {
        type: Operation.DemeterFarmingStakeToken,
        symbol: asset.symbol,
        assetAddress: asset.address,
        amount: `${amount}`,
      }
    );
  }

  /**
   * Unstake token
   * @param asset address of asset to be unstaked
   * @param rewardAsset address of reward asset
   * @param amount amount of tokens to be unstaked
   */
  public async unstake(
    asset: Asset | AccountAsset,
    rewardAsset: Asset | AccountAsset,
    amount: NumberLike
  ): Promise<void> {
    assert(this.root.account, Messages.connectWallet);

    const isFarm = false;
    const value = new FPNumber(amount, asset.decimals).toCodecString();

    await this.root.submitExtrinsic(
      this.root.api.tx.demeterFarmingPlatform.withdraw(asset.address, rewardAsset.address, value, isFarm),
      this.root.account.pair,
      {
        type: Operation.DemeterFarmingUnstakeToken,
        symbol: asset.symbol,
        assetAddress: asset.address,
        amount: `${amount}`,
      }
    );
  }

  /**
   * Get rewards from farming or staking pool
   * @param asset asset (staking) or pool asset (farming) address
   * @param rewardAsset reward asset address
   * @param isFarm flag indicated is getting rewards from farming or staking pool
   * @param amount amount (for history only)
   */
  public async getRewards(
    asset: Asset | AccountAsset,
    rewardAsset: Asset | AccountAsset,
    isFarm: boolean,
    amount?: NumberLike
  ) {
    assert(this.root.account, Messages.connectWallet);

    await this.root.submitExtrinsic(
      this.root.api.tx.demeterFarmingPlatform.getRewards(asset.address, rewardAsset.address, isFarm),
      this.root.account.pair,
      {
        type: Operation.DemeterFarmingGetRewards,
        symbol: rewardAsset.symbol,
        assetAddress: rewardAsset.address,
        amount: amount ? `${amount}` : undefined,
      }
    );
  }
}
