import { AssetType } from '@sora-substrate/types';

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
