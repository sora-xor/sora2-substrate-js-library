import type { CodecString } from '../fp';

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
