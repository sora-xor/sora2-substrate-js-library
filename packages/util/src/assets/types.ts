import type { CodecString } from '../fp';

export type Whitelist = {
  [key: string]: WhitelistItem;
};

export interface WhitelistItem {
  symbol: string;
  name: string;
  decimals: number;
  icon: string;
}

export interface WhitelistArrayItem extends WhitelistItem {
  address: string;
}

export interface AccountAsset {
  address: string;
  balance: AccountBalance;
  symbol?: string;
  name?: string;
  decimals?: number;
}

/**
 * Account Balance structure. Each value === value * 10 ^ decimals
 *
 * total = free + reserved + bonded
 *
 * locked = max(miscFrozen, feeFrozen)
 *
 * transferable = free - locked
 *
 * frozen = locked + reserved
 */
export interface AccountBalance {
  reserved: CodecString;
  total: CodecString;
  locked: CodecString;
  transferable: CodecString;
  frozen: CodecString;
  bonded: CodecString;
}

export interface Asset {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  totalSupply?: string;
}
