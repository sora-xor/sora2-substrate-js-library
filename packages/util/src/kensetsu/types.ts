import type { FPNumber } from '@sora-substrate/math';

import type { History } from '../types';
import type { VaultTypes } from './consts';

export type VaultType = typeof VaultTypes[keyof typeof VaultTypes];

export type Vault = {
  owner?: string;
  vaultType: VaultType;
  lockedAssetId: string;
  debtAssetId: string;
  lockedAmount: FPNumber;
  debt: FPNumber;
  internalDebt: FPNumber;
  interestCoefficient: FPNumber;
  id: number;
};

type RiskParameters = {
  hardCap: FPNumber;
  liquidationRatioReversed: number;
  liquidationRatio: number;
  maxLiquidationLot: FPNumber;
  stabilityFeeMs: FPNumber;
  stabilityFeeAnnual: FPNumber;
  minDeposit: FPNumber;
};

export type Collateral = {
  riskParams: RiskParameters;
  kusdSupply: FPNumber;
  totalLocked: FPNumber;
  lastFeeUpdateTime: number;
  interestCoefficient: FPNumber;
};

export interface VaultHistory extends History {
  vaultId: number;
}
