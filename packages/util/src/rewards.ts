import { CodecString, FPNumber } from './fp'
import { Asset, KnownAssets, KnownSymbols } from './assets'
import { History } from './BaseApi'

export enum RewardingEvents {
  XorErc20 = 'XorErc20',
  SoraFarmHarvest = 'SoraFarmHarvest',
  NtfAirdrop = 'NtfAirdrop',
  LiquidityProvision = 'LiquidityProvision',
  BuyOnBondingCurve = 'BuyOnBondingCurve'
}

export enum RewardReason {
  Unspecified = 'Unspecified',
  BuyOnBondingCurve = 'BuyOnBondingCurve'
}

export interface RewardInfo {
  type: RewardingEvents;
  asset: Asset;
  amount: CodecString;
  total?: CodecString;
}

export interface LPRewardsInfo {
  amount: CodecString;
  currency: string;
  reason: RewardReason;
}

export interface RewardClaimHistory extends History {
  soraNetworkFee?: CodecString;
  externalAddress?: string;
  rewards?: Array<RewardInfo>;
}

export function isClaimableReward (reward: RewardInfo): boolean {
  const fpAmount = FPNumber.fromCodecValue(reward.amount, reward.asset.decimals)

  if (!reward.total) return !fpAmount.isZero()
  
  const fpTotal = FPNumber.fromCodecValue(reward.total, reward.asset.decimals)

  return FPNumber.lte(fpAmount, fpTotal)
}

export function hasRewardsForEvents (rewards: Array<RewardInfo>, events: Array<RewardingEvents>): boolean {
  return rewards.some(item => isClaimableReward(item) && events.includes(item.type))
}

export function prepareRewardInfo (type: RewardingEvents, amount: CodecString | number, total?: CodecString | number): RewardInfo {
  const [val, pswap] = [KnownAssets.get(KnownSymbols.VAL), KnownAssets.get(KnownSymbols.PSWAP)]
  const asset = ({
    [RewardingEvents.XorErc20]: val
  })[type] ?? pswap

  const rewardInfo = {
    type,
    asset,
    amount: new FPNumber(amount, asset.decimals).toCodecString()
  } as RewardInfo

  if (total) {
    rewardInfo.total = new FPNumber(total, asset.decimals).toCodecString()
  }

  return rewardInfo
}
