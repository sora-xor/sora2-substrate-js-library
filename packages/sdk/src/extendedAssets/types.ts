import { AssetTypes } from '../assets/types';

export type AssetType = keyof typeof AssetTypes;

export type SoulBoundToken = {
  address: string;
  symbol?: string;
  name?: string;
  assetType?: AssetType;
  contentSource?: string;
  description?: string;
  externalUrl?: string;
  issuedAt?: string;
  regulatedAssets: string[] | { code: string }[];
};
