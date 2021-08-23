import xxhash64AsBn from '@polkadot/util-crypto/xxhash/xxhash64/asBn'
import type { ApiPromise } from '@polkadot/api'

// import { types } from '@sora-substrate/type-definitions'

// TODO: fix import issues
// const predefinedAssets = types['PredefinedAssetId']['_enum']

const predefinedAssets = [
  // Order must match rust definition
  'XOR',
  'DOT',
  'KSM',
  'USDT',
  'VAL',
  'PSWAP',
  'DAI',
  'ETH'
]

function bytesToUint (bytes: Uint8Array): number {
  let value = 0
  for (var i = 0; i < bytes.length; i++) {
    value = (value * 256) + bytes[i]
  }
  return value
}

export function assetIdToTechAssetId (api: ApiPromise, assetId: any | string): any {
  const bytes = api.createType('AssetId', assetId).toU8a()
  const end = bytes[0] + 1
  if (end < 5 && end > 1) {
    const frag = bytes.subarray(1, end)
    const index = bytesToUint(frag)
    if (index < predefinedAssets.length) {
      return api.createType('TechAssetId', { Wrapped: predefinedAssets[index] })
    }
  }
  return api.createType('TechAssetId', { Escaped: assetId })
}

export function poolTechAccountIdFromAssetPair (api: ApiPromise, baseAssetId: any | string, targetAssetId: any | string): any {
  const techBaseAsset = assetIdToTechAssetId(api, baseAssetId)
  const techTargetAsset = assetIdToTechAssetId(api, targetAssetId)
  const tradingPair = api.createType('TechTradingPair', { base_asset_id: techBaseAsset, target_asset_id: techTargetAsset })
  const techPurpose = api.createType('TechPurpose', { LiquidityKeeper: tradingPair })
  return api.createType('TechAccountId', { Pure: [0, techPurpose] })
}

export function techAccountIdToAccountId (api: ApiPromise, techAccountId: any): any {
  const magicPrefix = new Uint8Array([84, 115, 79, 144, 249, 113, 160, 44, 96, 155, 45, 104, 78, 97, 181, 87])
  const u8a = new Uint8Array(32)
  u8a.set(magicPrefix, 0)
  u8a.set(xxhash64AsBn(techAccountId.toU8a(), 0).toArray('le', 8), 16)
  u8a.set(xxhash64AsBn(techAccountId.toU8a(), 1).toArray('le', 8), 24)
  return api.createType('AccountId', u8a)
}

export function poolAccountIdFromAssetPair (api: ApiPromise, baseAssetId: any | string, targetAssetId: any | string): any {
  return techAccountIdToAccountId(api, poolTechAccountIdFromAssetPair(api, baseAssetId, targetAssetId))
}
