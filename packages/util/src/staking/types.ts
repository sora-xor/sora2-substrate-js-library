import type { History } from '../BaseApi';
import type { PalletIdentityRegistration } from '@polkadot/types/lookup';
import type { Option } from '@polkadot/types-codec';

export interface StakingHistory extends History {
  validators?: string[];
  payee?: string;
  controller?: string;
}

export enum StakingRewardsDestination {
  /** not used in sora */
  // Staked = 'Staked',
  Stash = 'Stash',
  Controller = 'Controller',
  Account = 'Account',
  None = 'None',
}

export interface ValidatorInfo {
  address: string;
  commission: string;
  blocked?: boolean;
}

export interface ValidatorInfoFull extends ValidatorInfo {
  rewardPoints: number;
  nominators: Others;
  identity: PalletIdentityRegistration;
  apy: string;
  stake: {
    stakeReturn: string;
    total: string;
    own: string;
  };
}

type Others = {
  who: string;
  value: string;
}[];

export interface ValidatorExposure {
  total: string;
  own: string;
  others: Others;
}

export interface ElectedValidator extends ValidatorExposure {
  address: string;
}

export type StashNominatorsInfo = {
  submittedIn: number; // era in which account submitted the decision to nominate
  suppressed: boolean; // not used currently by substrate and designed for future
  targets: string[]; // list of accountIds of validators nominated by the account
};

export type ActiveEra = {
  index: number; // index of era
  start: number; // timestamp when era was started
};

export type EraElectionStatus = { close: null } | { open: number };

export type RewardPointsIndividual = {
  [key: string]: number;
};

export type EraRewardPoints = {
  total: number;
  individual: RewardPointsIndividual;
};

// To calculate redeemable and unbounding tokens, an active era must be fetched that determines whether an account is ready to claim tokens and unlock them for transfers
export type AccountStakingLedgerUnlock = {
  value: string;
  era: number;
};

export type AccountStakingLedger = {
  stash: string; // address of stash account
  total: string; // active + unlocking (XOR)
  active: string; // still bonded (XOR)
  unlocking: AccountStakingLedgerUnlock[]; // redeemable + unbounding
};

export type StakeReturn = {
  apy: string; // per year
  stakeReturn: string; // per era
  stakeReturnReward: string; // per era
};

export type NominatorReward = {
  rewardPerEra: string;
  rewardPerDay: string;
  rewardPerYear: string;
};
