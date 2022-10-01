import { xxhashAsU8a } from '@polkadot/util-crypto/xxhash';
import type { ApiPromise } from '@polkadot/api';

import { types } from '@sora-substrate/type-definitions';
import type { AssetId, AccountId, TechAssetId, TechAccountId } from '@sora-substrate/types';

import { XOR } from '../assets/consts';
import { DexId } from './consts';

const predefinedAssets = types['PredefinedAssetId']['_enum'];

function bytesToUint(bytes: Uint8Array): number {
  let value = 0;
  for (var i = 0; i < bytes.length; i++) {
    value = value * 256 + bytes[i];
  }
  return value;
}

export function assetIdToTechAssetId(api: ApiPromise, assetId: AssetId | string): TechAssetId {
  const bytes = api.createType('AssetId', assetId).toU8a();
  const end = bytes[0] + 1;
  if (end < 5 && end > 1) {
    const frag = bytes.subarray(1, end);
    const index = bytesToUint(frag);
    if (index < predefinedAssets.length) {
      return api.createType('TechAssetId', { Wrapped: predefinedAssets[index] });
    }
  }
  return api.createType('TechAssetId', { Escaped: assetId });
}

export function poolTechAccountIdFromAssetPair(
  api: ApiPromise,
  baseAssetId: AssetId | string,
  targetAssetId: AssetId | string
): TechAccountId {
  const techBaseAsset = assetIdToTechAssetId(api, baseAssetId);
  const techTargetAsset = assetIdToTechAssetId(api, targetAssetId);
  const tradingPair = api.createType('TechTradingPair', {
    baseAssetId: techBaseAsset,
    targetAssetId: techTargetAsset,
  });
  const techPurpose = api.createType('TechPurpose', { LiquidityKeeper: tradingPair });
  const dexId = baseAssetId === XOR.address ? DexId.XOR : DexId.XSTUSD;
  return api.createType('TechAccountId', { Pure: [dexId, techPurpose] });
}

export function techAccountIdToAccountId(api: ApiPromise, techAccountId: TechAccountId): AccountId {
  const magicPrefix = new Uint8Array([84, 115, 79, 144, 249, 113, 160, 44, 96, 155, 45, 104, 78, 97, 181, 87]);
  const u8a = new Uint8Array(32);
  u8a.set(magicPrefix, 0);
  u8a.set(xxhashAsU8a(techAccountId.toU8a(), 128), 16);
  return api.createType('AccountId', u8a);
}

export function poolAccountIdFromAssetPair(
  api: ApiPromise,
  baseAssetId: AssetId | string,
  targetAssetId: AssetId | string
): AccountId {
  return techAccountIdToAccountId(api, poolTechAccountIdFromAssetPair(api, baseAssetId, targetAssetId));
}
