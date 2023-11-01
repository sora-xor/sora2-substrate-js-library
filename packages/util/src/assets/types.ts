import type { CodecString } from '@sora-substrate/math';

export interface WhitelistItem {
  symbol: string;
  name: string;
  decimals: number;
  icon: string;
}

export interface WhitelistArrayItem extends WhitelistItem {
  address: string;
}

export type Whitelist = {
  [key: string]: WhitelistItem;
};

export type WhitelistIdsBySymbol = { [key: string]: string };

export type Blacklist = Array<string>;

/**
 * Account Balance structure. Each value === value * 10 ^ decimals
 */
export interface AccountBalance {
  /** [Substrate] "free" balance */
  free: CodecString;
  /** [Substrate] "reserved" balance */
  reserved: CodecString;
  /** [Substrate] "frozen" balance */
  frozen: CodecString;
  /** [SORA] "bonded" balance in referral system */
  bonded: CodecString;
  /** [SORA] "locked" balance ("reserved" + "frozen" + "bonded") */
  locked: CodecString;
  /** [SORA] total balance ("free" + "locked") */
  total: CodecString;
  /** [SORA] usable balance ("free" - "frozen") */
  transferable: CodecString;
}

export type Asset = {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  content?: string;
  description?: string;
};

export type AccountAsset = Asset & {
  balance: AccountBalance;
};

export type RegisteredAsset = Asset & {
  externalAddress: string;
  externalDecimals: number;
};

export type RegisteredAccountAsset = RegisteredAsset &
  AccountAsset & {
    externalBalance: CodecString;
  };
