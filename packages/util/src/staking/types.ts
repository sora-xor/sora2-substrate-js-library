import type { History } from '../BaseApi';

export interface StakingHistory extends History {
  validators?: string[];
  payee?: string;
  controller?: string;
}

export enum StakingRewardsDestination {
  Staked = 'Staked',
  Stash = 'Stash',
  Controller = 'Controller',
  Account = 'Account',
  None = 'None',
}

export type ValidatorInfo = {
  address: string;
  commission: string;
  blocked: boolean;
};

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

export type EraRewardPoints = {
  total: number;
  individual: {
    [key: string]: number;
  };
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
