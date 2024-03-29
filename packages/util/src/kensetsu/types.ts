import type { FPNumber } from '@sora-substrate/math';

import type { History } from '../BaseApi';

export type Vault = {
  owner?: string;
  lockedAssetId: string;
  lockedAmount: FPNumber;
  debt: FPNumber;
  interestCoefficient: FPNumber;
  id: number;
};

type RiskParameters = {
  hardCap: FPNumber;
  liquidationRatioReversed: number;
  liquidationRatio: number;
  maxLiquidationLot: FPNumber;
  rateSecondlyCoeff: FPNumber;
  rateAnnual: FPNumber;
  minDeposit: FPNumber;
};

export type Collateral = {
  riskParams: RiskParameters;
  kusdSupply: FPNumber;
  lastFeeUpdateTime: number;
  interestCoefficient: FPNumber;
};

export interface VaultHistory extends History {
  vaultId: number;
}
