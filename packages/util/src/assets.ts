import { ApiPromise } from '@polkadot/api'
import { Codec } from '@polkadot/types/types'

export interface Asset {
  address: string;
  symbol: string;
  decimals: number;
}

export const Assets: Array<Asset> = [
  {
    address: '0x0200000000000000000000000000000000000000000000000000000000000000',
    symbol: 'XOR',
    decimals: 18
  },
  {
    address: '0x0200000000000000000000000000000000000000000000000000000000000001',
    symbol: 'DOT',
    decimals: 10
  },
  {
    address: '0x0200000000000000000000000000000000000000000000000000000000000002',
    symbol: 'KSM',
    decimals: 12
  },
  {
    address: '0x0200000000000000000000000000000000000000000000000000000000000003',
    symbol: 'USD',
    decimals: 18
  },
  {
    address: '0x0200000000000000000000000000000000000000000000000000000000000004',
    symbol: 'VAL',
    decimals: 18
  },
  {
    address: '0x0200000000000000000000000000000000000000000000000000000000000005',
    symbol: 'PSWAP',
    decimals: 18
  }
]

export async function getAssetInfo (api: ApiPromise, accountAddress: string, assetAddress: string): Promise<Codec> {
  const nativeAsset = Assets.find(asset => asset.address === assetAddress)
  const asset = await (
    nativeAsset ? api.query.system.account(accountAddress, assetAddress) : api.query.tokens.accounts(accountAddress, assetAddress)
  )
  return asset
}
