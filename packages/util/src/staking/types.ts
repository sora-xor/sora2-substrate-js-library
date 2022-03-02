export interface ValidatorInfo {
  address: string;
  commission: string;
  blocked: boolean;
}

export interface StashNominatorsInfo {
  submittedIn: number; // era in which account submitted the decision to nominate
  suppressed: boolean; // not used currently by substrate and designed for future
  targets: string[]; // list of accountIds of validators nominated by the account
}

export interface ActiveEra {
  index: number; // index of era
  start: number; // timestamp when era was started
}

export interface AccountStakingLedger {
  stash: string; // address of stash account
  total: string; // total staked balance (XOR)
  active: string; // active staked balance (XOR)
  unlocking: {
    value: string;
    era: number;
  }[];
}
