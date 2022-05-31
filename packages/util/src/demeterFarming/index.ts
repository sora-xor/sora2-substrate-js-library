import { map } from '@polkadot/x-rxjs/operators';
import { combineLatest } from '@polkadot/x-rxjs';
import { assert } from '@polkadot/util';
import type { Observable } from '@polkadot/types/types';

import { FPNumber } from '@sora-substrate/math';

import { Messages } from '../logger';

import type { Api } from '../api';
import type { DemeterPool, DemeterRewardToken, DemeterAccountPool } from './types';

export class DemeterFarmingModule {
  constructor(private readonly root: Api) {}

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

  public async getTokenInfosObservable(): Promise<Observable<DemeterRewardToken[]>> {
    const storageKeys = await this.root.api.query.demeterFarmingPlatform.tokenInfos.keys();

    const keys = storageKeys.map((item) => item.args[0].toString());

    const observables = keys.map((assetId) => this.getTokenInfoObservable(assetId));

    return combineLatest(observables);
  }

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
}
