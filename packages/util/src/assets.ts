import { ApiPromise } from '@polkadot/api'
import { Codec } from '@polkadot/types/types'

export interface Asset {
  address: string;
  symbol: string;
  decimals: number;
}

export const KnownAssets: Array<Asset> = [
  {
    address: '0x0200000000000000000000000000000000000000000000000000000000000000',
    symbol: 'XOR',
    decimals: 18
  },
  {
    address: '0x0200010000000000000000000000000000000000000000000000000000000000',
    symbol: 'DOT',
    decimals: 10
  },
  {
    address: '0x0200020000000000000000000000000000000000000000000000000000000000',
    symbol: 'KSM',
    decimals: 12
  },
  {
    address: '0x0200030000000000000000000000000000000000000000000000000000000000',
    symbol: 'USD',
    decimals: 18
  },
  {
    address: '0x0200040000000000000000000000000000000000000000000000000000000000',
    symbol: 'VAL',
    decimals: 18
  },
  {
    address: '0x0200050000000000000000000000000000000000000000000000000000000000',
    symbol: 'PSWAP',
    decimals: 18
  }
]

export async function getAssetInfo (api: ApiPromise, accountAddress: string, assetAddress: string): Promise<Codec> {
  const nativeAsset = KnownAssets.find(asset => asset.address === assetAddress)
  const asset = await (
    nativeAsset ? api.query.system.account(accountAddress, assetAddress) : api.query.tokens.accounts(accountAddress, assetAddress)
  )
  return asset
}
