import { XOR, VAL, PSWAP, XSTUSD } from '../assets/consts';

export enum RewardingEvents {
  XorErc20 = 'XorErc20',
  SoraFarmHarvest = 'SoraFarmHarvest',
  NftAirdrop = 'NftAirdrop',
  LiquidityProvision = 'LiquidityProvision',
  BuyOnBondingCurve = 'BuyOnBondingCurve',
  LiquidityProvisionFarming = 'LiquidityProvisionFarming',
  MarketMakerVolume = 'MarketMakerVolume',
  CrowdloanXOR = 'CrowdloanXOR',
  CrowdloanVAL = 'CrowdloanVAL',
  CrowdloanPSWAP = 'CrowdloanPSWAP',
  CrowdloanXSTUSD = 'CrowdloanXSTUSD',
  Unspecified = 'Unspecified',
}

export enum RewardReason {
  Unspecified = 'Unspecified',
  BuyOnBondingCurve = 'BuyOnBondingCurve',
}

export const CrowdloanRewardsCollection = [
  {
    asset: XOR,
    type: RewardingEvents.CrowdloanXOR,
  },
  {
    asset: VAL,
    type: RewardingEvents.CrowdloanVAL,
  },
  {
    asset: PSWAP,
    type: RewardingEvents.CrowdloanPSWAP,
  },
  {
    asset: XSTUSD,
    type: RewardingEvents.CrowdloanXSTUSD,
  },
];
