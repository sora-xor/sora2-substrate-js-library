import { assert } from '@polkadot/util';
import { map } from '@polkadot/x-rxjs/operators';
import { FPNumber, CodecString } from '@sora-substrate/math';
import type { Observable, Codec } from '@polkadot/types/types';

import { RewardingEvents } from './consts';
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

  private prepareRewardInfo(
    type: RewardingEvents,
    amount: Codec | CodecString | number,
    total?: CodecString
  ): RewardInfo {
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

  private prepareVestedRewardsInfo(
    limit: CodecString | number,
    total: CodecString | number,
    rewards: any
  ): RewardsInfo {
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
  public getLiquidityProvisionSubscription(): Observable<RewardInfo> {
    assert(this.root.account, Messages.connectWallet);

    return this.root.apiRx.query.pswapDistribution.shareholderAccounts(this.root.account.pair.address).pipe(
      map((balance) => {
        return this.prepareRewardInfo(RewardingEvents.LiquidityProvision, balance);
      })
    );
  }

  public getVestedRewardsSubscription(): Observable<RewardsInfo> {
    assert(this.root.account, Messages.connectWallet);

    return this.root.apiRx.query.vestedRewards.rewards(this.root.account.pair.address).pipe(
      map((data) => {
        const {
          limit, // "Balance"
          total_available: total, // "Balance"
          rewards, // "BTreeMap<RewardReason, Balance>"
        } = data as any;

        return this.prepareVestedRewardsInfo(limit, total, rewards);
      })
    );
  }

  public async getAssetCrowdloanClaimHistory(accountAddress: string, assetAddress: string): Promise<number> {
    return (
      await this.root.api.query.vestedRewards.crowdloanClaimHistory(accountAddress, assetAddress)
    ).toJSON() as number;
  }

  private getCrowdloanAssetTotalLimit(vested: FPNumber, lastClaimBlock: number, currentBlock: number) {
    const blocksPerDay = 14_400;
    // TODO: wait for storage
    const leaseStartBlock = 0;
    const leaseTotalDays = 319;

    const daily = vested.div(new FPNumber(leaseTotalDays));
    const claimablePeriod = new FPNumber(Math.floor(currentBlock - (lastClaimBlock || leaseStartBlock) / blocksPerDay));
    const claimedPeriod = new FPNumber(
      Math.floor(((lastClaimBlock || leaseStartBlock) - leaseStartBlock) / blocksPerDay)
    );

    const limit = daily.mul(claimablePeriod).toCodecString();
    const total = vested.sub(daily.mul(claimedPeriod)).toCodecString();

    return { limit, total };
  }

  /**
   * Check crowdloan rewards
   */
  public async checkCrowdloan(): Promise<Array<RewardInfo>> {
    assert(this.root.account, Messages.connectWallet);

    const { address } = this.root.account.pair;

    const currentBlock = Number(await this.root.api.query.system.number());
    const totalVested = (await this.root.api.query.vestedRewards.crowdloanRewards(address)) as any;

    const xor = new FPNumber(totalVested.xor_reward, XOR.decimals);
    const val = new FPNumber(totalVested.val_reward, VAL.decimals);
    const pswap = new FPNumber(totalVested.pswap_reward, PSWAP.decimals);
    const xstusd = new FPNumber(totalVested.xstusd_reward, XSTUSD.decimals);

    const [xorLastClaim, valLastClaim, pswapLastClaim, xstusdLastClaim] = await Promise.all(
      [XOR.address, VAL.address, PSWAP.address, XSTUSD.address].map((assetAddress) =>
        this.getAssetCrowdloanClaimHistory(address, assetAddress)
      )
    );

    const xorAmounts = this.getCrowdloanAssetTotalLimit(xor, xorLastClaim, currentBlock);
    const valAmounts = this.getCrowdloanAssetTotalLimit(val, valLastClaim, currentBlock);
    const pswapAmounts = this.getCrowdloanAssetTotalLimit(pswap, pswapLastClaim, currentBlock);
    const xstusdAmounts = this.getCrowdloanAssetTotalLimit(xstusd, xstusdLastClaim, currentBlock);

    const rewards = [
      { ...this.prepareRewardInfo(RewardingEvents.CrowdloanXOR, xorAmounts.limit), total: xorAmounts.total },
      { ...this.prepareRewardInfo(RewardingEvents.CrowdloanVAL, valAmounts.limit), total: valAmounts.total },
      {
        ...this.prepareRewardInfo(RewardingEvents.CrowdloanPSWAP, pswapAmounts.limit),
        total: pswapAmounts.total,
      },
      {
        ...this.prepareRewardInfo(RewardingEvents.CrowdloanXSTUSD, xstusdAmounts.limit),
        total: xstusdAmounts.total,
      },
    ];

    return rewards;
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
        count: +(data as any).count, // u32;
        volume: new FPNumber((data as any).volume).toCodecString(), // Balance
      }))
    );
  }
}
