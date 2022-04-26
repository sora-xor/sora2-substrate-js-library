import type { CodecString } from '@sora-substrate/math';

import type { Asset } from '../assets/types';
import type { RewardingEvents, RewardReason } from './consts';
import type { History } from '../BaseApi';

export interface RewardsInfo {
  limit: CodecString;
  total: CodecString;
  rewards: Array<RewardInfo>;
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
  externalAddress?: string;
  rewards?: Array<RewardInfo | RewardsInfo>;
}

export interface AccountMarketMakerInfo {
  count: number;
  volume: CodecString;
}
