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
 *
 * total = free + reserved + bonded
 *
 * locked = max(miscFrozen, feeFrozen)
 *
 * transferable = free - locked
 *
 * frozen = locked + reserved + bonded
 */
export interface AccountBalance {
  reserved: CodecString;
  total: CodecString;
  locked: CodecString;
  transferable: CodecString;
  frozen: CodecString;
  bonded: CodecString;
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
