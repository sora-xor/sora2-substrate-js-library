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

export function hasRewardsForEvents (rewards: Array<RewardInfo>, events: Array<RewardingEvents>): boolean {
  return rewards.some(item => !FPNumber.fromCodecValue(item.amount, item.asset.decimals).isZero() && events.includes(item.type))
}

export function prepareRewardInfo (amount: CodecString | number, type: RewardingEvents): RewardInfo {
  const [val, pswap] = [KnownAssets.get(KnownSymbols.VAL), KnownAssets.get(KnownSymbols.PSWAP)]
  const asset = ({
    [RewardingEvents.XorErc20]: val
  })[type] ?? pswap

  return {
    type,
    asset,
    amount: new FPNumber(amount, asset.decimals).toCodecString()
  }
}
