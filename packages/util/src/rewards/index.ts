import { assert } from '@polkadot/util';
import { map } from '@polkadot/x-rxjs/operators';
import { combineLatest } from '@polkadot/x-rxjs';
import { FPNumber, CodecString } from '@sora-substrate/math';
import type { Observable, Codec } from '@polkadot/types/types';

import { RewardingEvents, CrowdloanRewardsCollection } from './consts';
import { XOR, VAL, PSWAP, XSTUSD } from '../assets/consts';
import { Messages } from '../logger';
import { Operation } from '../BaseApi';
import type { Api } from '../api';
import type { AccountMarketMakerInfo, RewardInfo, RewardsInfo } from './types';
import type { Asset } from '../assets/types';

export class RewardsModule {
  constructor(private readonly root: Api) {}

  private isClaimableReward(reward: RewardInfo): boolean {
    const fpAmount = FPNumber.fromCodecValue(reward.amount, reward.asset.decimals);

    return !fpAmount.isZero();
  }

  private hasRewardsForEvents(rewards: Array<RewardInfo>, events: Array<RewardingEvents>): boolean {
    return rewards.some((item) => this.isClaimableReward(item) && events.includes(item.type));
  }

  private containsRewardsForEvents(items: Array<RewardInfo | RewardsInfo>, events: Array<RewardingEvents>): boolean {
    return items.some((item) => {
      const key = 'rewards' in item ? item.rewards : [item];

      return this.hasRewardsForEvents(key, events);
    });
  }

  private prepareRewardInfo(type: RewardingEvents, amount: Codec | CodecString | number): RewardInfo {
    const asset =
      {
        [RewardingEvents.XorErc20]: VAL,
        [RewardingEvents.CrowdloanVAL]: VAL,
        [RewardingEvents.CrowdloanXOR]: XOR,
        [RewardingEvents.CrowdloanXSTUSD]: XSTUSD,
      }[type] ?? PSWAP;

    const rewardInfo = {
      type,
      asset,
      amount: new FPNumber(amount, asset.decimals).toCodecString(),
    } as RewardInfo;

    return rewardInfo;
  }

  private prepareVestedRewardsInfo(limit: Codec, total: Codec, rewards: any): RewardsInfo {
    const asset = PSWAP;
    // reward table with zero amount for each event
    const buffer = [
      RewardingEvents.BuyOnBondingCurve,
      RewardingEvents.LiquidityProvisionFarming,
      RewardingEvents.MarketMakerVolume,
    ].reduce((result, key) => {
      return {
        ...result,
        [key]: this.prepareRewardInfo(key, 0),
      };
    }, {});

    // update reward table with real values
    for (const [event, balance] of rewards.entries()) {
      const key = event.toString();
      buffer[key] = this.prepareRewardInfo(key, balance);
    }

    const fpLimit = new FPNumber(limit, asset.decimals);
    const fpTotal = new FPNumber(total, asset.decimals);

    return {
      limit: fpLimit.toCodecString(),
      total: fpTotal.toCodecString(),
      rewards: Object.values(buffer),
    };
  }

  /**
   * Check rewards for external account
   * @param externalAddress address of external account (ethereum account address)
   * @returns rewards array with not zero amount
   */
  public async checkForExternalAccount(externalAddress: string): Promise<Array<RewardInfo>> {
    const [xorErc20Amount, soraFarmHarvestAmount, nftAirdropAmount] = await (
      this.root.api.rpc as any
    ).rewards.claimables(externalAddress);

    const rewards = [
      this.prepareRewardInfo(RewardingEvents.SoraFarmHarvest, soraFarmHarvestAmount),
      this.prepareRewardInfo(RewardingEvents.NftAirdrop, nftAirdropAmount),
      this.prepareRewardInfo(RewardingEvents.XorErc20, xorErc20Amount),
    ].filter((item) => this.isClaimableReward(item));

    return rewards;
  }

  /**
   * Get observable reward for liqudity provision
   * @returns observable liquidity provision RewardInfo
   */
  public getLiquidityProvisionRewardsSubscription(): Observable<RewardInfo> {
    assert(this.root.account, Messages.connectWallet);

    return this.root.apiRx.query.pswapDistribution
      .shareholderAccounts(this.root.account.pair.address)
      .pipe(map((balance) => this.prepareRewardInfo(RewardingEvents.LiquidityProvision, balance)));
  }

  public getVestedRewardsSubscription(): Observable<RewardsInfo> {
    assert(this.root.account, Messages.connectWallet);

    return this.root.apiRx.query.vestedRewards
      .rewards(this.root.account.pair.address)
      .pipe(map((data) => this.prepareVestedRewardsInfo(data.limit, data.total_available, data.rewards)));
  }

  /**
   * Get observable last block number, when the user claimed a reward for asset
   * @param accountAddress account address
   * @param assetAddress asset address
   */
  public getCrowdloanClaimHistoryObservable(assetAddress: string): Observable<number> {
    assert(this.root.account, Messages.connectWallet);

    return this.root.apiRx.query.vestedRewards
      .crowdloanClaimHistory(this.root.account.pair.address, assetAddress)
      .pipe(map((data) => data.toNumber()));
  }

  /**
   * Get observable rewards map vested for crowdloan
   * @param accountAddress account address
   */
  public getCrowdloanRewardsVestedObservable(): Observable<{ [key: string]: FPNumber }> {
    assert(this.root.account, Messages.connectWallet);

    return this.root.apiRx.query.vestedRewards.crowdloanRewards(this.root.account.pair.address).pipe(
      map((data) => ({
        [XOR.address]: new FPNumber(data.xor_reward, XOR.decimals),
        [VAL.address]: new FPNumber(data.val_reward, VAL.decimals),
        [PSWAP.address]: new FPNumber(data.pswap_reward, PSWAP.decimals),
        [XSTUSD.address]: new FPNumber(data.xstusd_reward, XSTUSD.decimals),
      }))
    );
  }

  /**
   * Get observable crowdloan rewards
   */
  public async getCrowdloanRewardsSubscription(): Promise<Observable<RewardInfo[]>> {
    assert(this.root.account, Messages.connectWallet);

    const consts = await (this.root.api.rpc as any).vestedRewards.crowdloanLease();
    const blocksPerDay = Number(consts.blocks_per_day);
    const totalDays = Number(consts.total_days);
    const startBlock = Number(consts.start_block);
    const endBlock = startBlock + totalDays * blocksPerDay;

    const currentBlockObservable = this.root.system.getBlockNumberObservable();
    const vestedObservable = this.getCrowdloanRewardsVestedObservable();
    const lastClaimBlockObservables = CrowdloanRewardsCollection.map(({ asset }) =>
      this.getCrowdloanClaimHistoryObservable(asset.address)
    );

    return combineLatest([currentBlockObservable, vestedObservable, ...lastClaimBlockObservables]).pipe(
      map(([currentBlock, totalVested, ...lastClaims]) => {
        return CrowdloanRewardsCollection.map(({ asset, type }, index) => {
          const vested: FPNumber = totalVested[asset.address];

          const currBlock = Math.min(Math.max(Number(currentBlock), startBlock), endBlock);
          const lastBlock = Math.min(Math.max(Number(lastClaims[index]), startBlock), endBlock);

          // days period for claim
          const claimableDays = new FPNumber(Math.floor((currBlock - lastBlock) / blocksPerDay));
          // days period already claimed
          const claimedDays = new FPNumber(Math.floor((lastBlock - startBlock) / blocksPerDay));

          const daily = vested.div(new FPNumber(totalDays));
          // available to claim
          const amount = daily.mul(claimableDays).toCodecString();
          // remaining to claim
          const total = vested.sub(daily.mul(claimedDays)).toCodecString();

          return { type, asset, amount, total };
        });
      })
    );
  }

  /**
   * Returns a params object { extrinsic, args }
   * @param rewards claiming rewards
   * @param signature message signed in external wallet (if want to claim external rewards), otherwise empty string
   */
  private calcTxParams(rewards: Array<RewardInfo | RewardsInfo>, signature = ''): any {
    const transactions = [];

    // liquidity provision
    if (this.containsRewardsForEvents(rewards, [RewardingEvents.LiquidityProvision])) {
      transactions.push({
        extrinsic: this.root.api.tx.pswapDistribution.claimIncentive,
        args: [],
      });
    }

    // vested
    if (
      this.containsRewardsForEvents(rewards, [
        RewardingEvents.BuyOnBondingCurve,
        RewardingEvents.LiquidityProvisionFarming,
        RewardingEvents.MarketMakerVolume,
      ])
    ) {
      transactions.push({
        extrinsic: this.root.api.tx.vestedRewards.claimRewards,
        args: [],
      });
    }

    // external
    if (
      this.containsRewardsForEvents(rewards, [
        RewardingEvents.SoraFarmHarvest,
        RewardingEvents.XorErc20,
        RewardingEvents.NftAirdrop,
      ])
    ) {
      transactions.push({
        extrinsic: this.root.api.tx.rewards.claim,
        args: [signature],
      });
    }

    // crowdloan
    [
      [RewardingEvents.CrowdloanXOR, XOR],
      [RewardingEvents.CrowdloanVAL, VAL],
      [RewardingEvents.CrowdloanPSWAP, PSWAP],
      [RewardingEvents.CrowdloanXSTUSD, XSTUSD],
    ].forEach((item: [RewardingEvents, Asset]) => {
      if (this.containsRewardsForEvents(rewards, [item[0]])) {
        transactions.push({
          extrinsic: this.root.api.tx.vestedRewards.claimCrowdloanRewards,
          args: [item[1].address],
        });
      }
    });

    if (transactions.length > 1)
      return {
        extrinsic: this.root.api.tx.utility.batchAll,
        args: [transactions.map(({ extrinsic, args }) => extrinsic(...args))],
      };

    if (transactions.length === 1) return transactions[0];

    // for current compability
    return {
      extrinsic: this.root.api.tx.rewards.claim,
      args: [signature],
    };
  }

  /**
   * Get network fee for claim rewards operation
   */
  public async getNetworkFee(rewards: Array<RewardInfo>, signature = ''): Promise<CodecString> {
    const params = this.calcTxParams(rewards, signature);

    switch (params.extrinsic) {
      case this.root.api.tx.pswapDistribution.claimIncentive:
        return this.root.NetworkFee[Operation.ClaimLiquidityProvisionRewards];
      case this.root.api.tx.vestedRewards.claimRewards:
        return this.root.NetworkFee[Operation.ClaimVestedRewards];
      case this.root.api.tx.vestedRewards.claimCrowdloanRewards:
        return this.root.NetworkFee[Operation.ClaimCrowdloanRewards];
      case this.root.api.tx.rewards.claim:
        return this.root.NetworkFee[Operation.ClaimExternalRewards];
      default:
        return await this.root.getNetworkFee(Operation.ClaimRewards, params);
    }
  }

  /**
   * Claim rewards
   * @param signature message signed in external wallet (if want to claim external rewards)
   */
  public async claim(
    rewards: Array<RewardInfo | RewardsInfo>,
    signature?: string,
    fee?: CodecString,
    externalAddress?: string
  ): Promise<void> {
    const { extrinsic, args } = this.calcTxParams(rewards, signature);

    await this.root.submitExtrinsic(extrinsic(...args), this.root.account.pair, {
      type: Operation.ClaimRewards,
      externalAddress,
      soraNetworkFee: fee,
      rewards,
    });
  }

  /**
   * Subscribe on account market maker info
   */
  public subscribeOnAccountMarketMakerInfo(): Observable<AccountMarketMakerInfo> {
    assert(this.root.account, Messages.connectWallet);

    return this.root.apiRx.query.vestedRewards.marketMakersRegistry(this.root.account.pair.address).pipe(
      map((data) => ({
        count: +data.count,
        volume: new FPNumber(data.volume).toCodecString(),
      }))
    );
  }
}
