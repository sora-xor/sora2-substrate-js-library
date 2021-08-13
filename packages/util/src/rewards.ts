import { CodecString, FPNumber } from './fp'
import { Asset, KnownAssets, KnownSymbols } from './assets'
import { History } from './BaseApi'

export enum RewardingEvents {
  XorErc20 = 'XorErc20',
  SoraFarmHarvest = 'SoraFarmHarvest',
  NftAirdrop = 'NftAirdrop',
  LiquidityProvision = 'LiquidityProvision',
  BuyOnBondingCurve = 'BuyOnBondingCurve',
  LiquidityProvisionFarming = 'LiquidityProvisionFarming', // not used yet
  MarketMakerVolume = 'MarketMakerVolume', // not used yet
  Unspecified = 'Unspecified'
}

export enum RewardReason {
  Unspecified = 'Unspecified',
  BuyOnBondingCurve = 'BuyOnBondingCurve'
}

export interface RewardsInfo {
  limit: CodecString;
  total: CodecString;
  rewards: Array<RewardInfo>;
}

export interface RewardInfo {
  type: RewardingEvents;
  asset: Asset;
  amount: CodecString;
}

export interface LPRewardsInfo {
  amount: CodecString;
  currency: string;
  reason: RewardReason;
}

export interface RewardClaimHistory extends History {
  soraNetworkFee?: CodecString;
  externalAddress?: string;
  rewards?: Array<RewardInfo | RewardsInfo>;
}

export function isClaimableReward (reward: RewardInfo): boolean {
  const fpAmount = FPNumber.fromCodecValue(reward.amount, reward.asset.decimals)

  return !fpAmount.isZero()
}

export function containsRewardsForEvents (items: Array<RewardInfo | RewardsInfo>, events: Array<RewardingEvents>): boolean {
  return items.some(item => {
    const key = 'rewards' in item ? item.rewards : [item]

    return hasRewardsForEvents(key, events)
  })
}

export function hasRewardsForEvents (rewards: Array<RewardInfo>, events: Array<RewardingEvents>): boolean {
  return rewards.some(item => isClaimableReward(item) && events.includes(item.type))
}

export function prepareRewardInfo (type: RewardingEvents, amount: CodecString | number): RewardInfo {
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

export function prepareRewardsInfo (limit: CodecString | number, total: CodecString | number, rewards: any): RewardsInfo | null {
  const asset = KnownAssets.get(KnownSymbols.PSWAP)
  const buffer = []

  for (const [event, balance] of rewards.entries()) {
    buffer.push(prepareRewardInfo(event.toString(), balance))
  }

  const claimableRewards = buffer.filter(item => isClaimableReward(item))

  if (claimableRewards.length === 0) return null

  const fpLimit = new FPNumber(limit, asset.decimals)
  const fpTotal = new FPNumber(total, asset.decimals)

  return {
    limit: fpLimit.toCodecString(),
    total: fpTotal.toCodecString(),
    rewards: claimableRewards
  }
}
