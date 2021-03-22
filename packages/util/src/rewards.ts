import { CodecString } from './fp'
import { Asset } from './assets'

export enum RewardingEvents {
  XOR_ERC_20 = 'XOR_ERC_20',
  SORA_FARM_HARVEST = 'SORA_FARM_HARVEST',
  NFT_AIRDROP = 'NFT_AIRDROP'
}

export interface RewardInfo {
  type?: RewardingEvents;
  asset: Asset;
  amount: CodecString;
}
