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

export interface BlacklistItem {
  symbol: string;
  address: string;
  name: string;
  decimals: number;
  content?: string;
  description?: string;
}

export type Whitelist = {
  [key: string]: WhitelistItem;
};

export type Blacklist = {
  [key: string]: BlacklistItem;
};

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

interface AssetBase {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  content?: string;
  description?: string;
}

export interface Asset extends AssetBase {
  totalSupply?: string;
}

export interface AccountAsset extends AssetBase {
  balance: AccountBalance;
}
