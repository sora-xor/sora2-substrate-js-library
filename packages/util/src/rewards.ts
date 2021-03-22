import { CodecString } from './fp'
import { Asset } from './assets'

export enum RewardingEvents {
  XorErc20 = 'XorErc20',
  SoraFarmHarvest = 'SoraFarmHarvest',
  NtfAirdrop = 'NtfAirdrop'
}

export interface RewardInfo {
  type: RewardingEvents;
  asset: Asset;
  amount: CodecString;
}
