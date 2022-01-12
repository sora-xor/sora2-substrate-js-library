import { assert } from '@polkadot/util';
import { map } from '@polkadot/x-rxjs/operators';
import type { Observable } from '@polkadot/types/types';

import { RewardingEvents } from './consts';
import { CodecString, FPNumber } from '../fp';
import { KnownAssets, KnownSymbols } from '../assets';
import { Messages } from '../logger';
import { Operation } from '../BaseApi';
import type { Api } from '../api';
import type { AccountMarketMakerInfo, RewardInfo, RewardsInfo } from './types';

export class RewardsModule {
  constructor (private root: Api) {}

  private isClaimableReward (reward: RewardInfo): boolean {
    const fpAmount = FPNumber.fromCodecValue(reward.amount, reward.asset.decimals);

    return !fpAmount.isZero();
  }

  private hasRewardsForEvents (rewards: Array<RewardInfo>, events: Array<RewardingEvents>): boolean {
    return rewards.some(item => this.isClaimableReward(item) && events.includes(item.type))
  }

  private containsRewardsForEvents (items: Array<RewardInfo | RewardsInfo>, events: Array<RewardingEvents>): boolean {
    return items.some(item => {
      const key = 'rewards' in item ? item.rewards : [item]
  
      return this.hasRewardsForEvents(key, events)
    })
  }

  private prepareRewardInfo (type: RewardingEvents, amount: CodecString | number): RewardInfo {
    const [val, pswap] = [KnownAssets.get(KnownSymbols.VAL), KnownAssets.get(KnownSymbols.PSWAP)]
    const asset = ({
      [RewardingEvents.XorErc20]: val
    })[type] ?? pswap
  
    const rewardInfo = {
      type,
      asset,
      amount: new FPNumber(amount, asset.decimals).toCodecString()
    } as RewardInfo
  
    return rewardInfo
  }

  private prepareRewardsInfo (limit: CodecString | number, total: CodecString | number, rewards: any): RewardsInfo | null {
    const asset = KnownAssets.get(KnownSymbols.PSWAP)
    const buffer = []
  
    for (const [event, balance] of rewards.entries()) {
      buffer.push(this.prepareRewardInfo(event.toString(), balance))
    }
  
    const claimableRewards = buffer.filter(item => this.isClaimableReward(item))
  
    if (claimableRewards.length === 0) return null
  
    const fpLimit = new FPNumber(limit, asset.decimals)
    const fpTotal = new FPNumber(total, asset.decimals)
  
    return {
      limit: fpLimit.toCodecString(),
      total: fpTotal.toCodecString(),
      rewards: claimableRewards
    }
  }

  /**
   * Check rewards for external account
   * @param externalAddress address of external account (ethereum account address)
   * @returns rewards array with not zero amount
   */
   public async checkForExternalAccount (externalAddress: string): Promise<Array<RewardInfo>> {
    const [xorErc20Amount, soraFarmHarvestAmount, nftAirdropAmount] = await (this.root.api.rpc as any).rewards.claimables(externalAddress)

    const rewards = [
      this.prepareRewardInfo(RewardingEvents.SoraFarmHarvest, soraFarmHarvestAmount),
      this.prepareRewardInfo(RewardingEvents.NftAirdrop, nftAirdropAmount),
      this.prepareRewardInfo(RewardingEvents.XorErc20, xorErc20Amount)
    ].filter(item => this.isClaimableReward(item))

    return rewards
  }

  /**
   * Check rewards for providing liquidity
   * @returns rewards array with not zero amount
   */
   public async checkLiquidityProvision (): Promise<Array<RewardInfo>> {
    assert(this.root.account, Messages.connectWallet)

    const { address } = this.root.account.pair

    const liquidityProvisionAmount = await (this.root.api.rpc as any).pswapDistribution.claimableAmount(address) // Balance

    const rewards = [
      this.prepareRewardInfo(RewardingEvents.LiquidityProvision, liquidityProvisionAmount),
    ].filter(item => this.isClaimableReward(item))

    return rewards
  }

  /**
   * Check vested rewards
   */
  public async checkVested (): Promise<RewardsInfo | null> {
    assert(this.root.account, Messages.connectWallet)

    const { address } = this.root.account.pair

    const {
      limit, // "Balance"
      total_available: total, // "Balance"
      rewards // "BTreeMap<RewardReason, Balance>"
    } = await (this.root.api.query as any).vestedRewards.rewards(address)

    const rewardsInfo = this.prepareRewardsInfo(limit, total, rewards)

    return rewardsInfo
  }

  /**
   * Returns a params object { extrinsic, args }
   * @param rewards claiming rewards
   * @param signature message signed in external wallet (if want to claim external rewards), otherwise empty string
   */
   private calcTxParams (rewards: Array<RewardInfo | RewardsInfo>, signature = ''): any {
    const transactions = []

    if (this.containsRewardsForEvents(rewards, [RewardingEvents.LiquidityProvision])) {
      transactions.push({
        extrinsic: this.root.api.tx.pswapDistribution.claimIncentive,
        args: []
      })
    }
    if (this.containsRewardsForEvents(rewards, [RewardingEvents.BuyOnBondingCurve, RewardingEvents.LiquidityProvisionFarming, RewardingEvents.MarketMakerVolume])) {
      transactions.push({
        extrinsic: this.root.api.tx.vestedRewards.claimRewards,
        args: []
      })
    }
    if (this.containsRewardsForEvents(rewards, [RewardingEvents.SoraFarmHarvest, RewardingEvents.XorErc20, RewardingEvents.NftAirdrop])) {
      transactions.push({
        extrinsic: this.root.api.tx.rewards.claim,
        args: [signature]
      })
    }

    if (transactions.length > 1) return {
      extrinsic: this.root.api.tx.utility.batchAll,
      args: [transactions.map(({ extrinsic, args }) => extrinsic(...args))]
    }

    if (transactions.length === 1) return transactions[0]

    // for current compability
    return {
      extrinsic: this.root.api.tx.rewards.claim,
      args: [signature]
    }
  }

  /**
   * Get network fee for claim rewards operation
   */
   public async getNetworkFee (rewards: Array<RewardInfo>, signature = ''): Promise<CodecString>  {
    const params = this.calcTxParams(rewards, signature)

    switch (params.extrinsic) {
      case this.root.api.tx.pswapDistribution.claimIncentive:
        return this.root.NetworkFee[Operation.ClaimLiquidityProvisionRewards]
      case this.root.api.tx.vestedRewards.claimRewards:
        return this.root.NetworkFee[Operation.ClaimVestedRewards]
      case this.root.api.tx.rewards.claim:
        return this.root.NetworkFee[Operation.ClaimExternalRewards]
      default:
        return await this.root.getNetworkFee(Operation.ClaimRewards, params)
    }
  }

  /**
   * Claim rewards
   * @param signature message signed in external wallet (if want to claim external rewards)
   */
   public async claim (
    rewards: Array<RewardInfo | RewardsInfo>,
    signature?: string,
    fee?: CodecString,
    externalAddress?: string,
  ): Promise<void> {
    const { extrinsic, args } = this.calcTxParams(rewards, signature)

    await this.root.submitExtrinsic(
      extrinsic(...args),
      this.root.account.pair,
      {
        type: Operation.ClaimRewards,
        externalAddress,
        soraNetworkFee: fee,
        rewards
      }
    )
  }

  /**
   * Subscribe on account market maker info
   */
  public subscribeOnAccountMarketMakerInfo (): Observable<AccountMarketMakerInfo> {
    assert(this.root.account, Messages.connectWallet)

    return this.root.apiRx.query.vestedRewards.marketMakersRegistry(this.root.account.pair.address).pipe(
      map((data) => ({
        count: +(data as any).count, // u32;
        volume: new FPNumber((data as any).volume).toCodecString() // Balance
      }))
    )
  }
}
