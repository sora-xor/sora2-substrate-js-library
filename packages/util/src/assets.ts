import { ApiPromise } from '@polkadot/api'
import { Codec } from '@polkadot/types/types'

import { FPNumber } from './fp'

export interface AccountAsset {
  address: string;
  balance: string;
  usdBalance?: string;
  symbol?: string;
  decimals?: number;
}

export interface Asset {
  address: string;
  symbol: string;
  decimals: number;
}

export enum KnownSymbols {
  XOR = 'XOR',
  DOT = 'DOT',
  KSM = 'KSM',
  USD = 'USD',
  VAL = 'VAL',
  PSWAP = 'PSWAP'
}

export const KnownAssets: Array<Asset> = [
  {
    address: '0x0200000000000000000000000000000000000000000000000000000000000000',
    symbol: KnownSymbols.XOR,
    decimals: FPNumber.DEFAULT_PRECISION
  },
  {
    address: '0x0200010000000000000000000000000000000000000000000000000000000000',
    symbol: KnownSymbols.DOT,
    decimals: 10
  },
  {
    address: '0x0200020000000000000000000000000000000000000000000000000000000000',
    symbol: KnownSymbols.KSM,
    decimals: 12
  },
  {
    address: '0x0200030000000000000000000000000000000000000000000000000000000000',
    symbol: KnownSymbols.USD,
    decimals: FPNumber.DEFAULT_PRECISION
  },
  {
    address: '0x0200040000000000000000000000000000000000000000000000000000000000',
    symbol: KnownSymbols.VAL,
    decimals: FPNumber.DEFAULT_PRECISION
  },
  {
    address: '0x0200050000000000000000000000000000000000000000000000000000000000',
    symbol: KnownSymbols.PSWAP,
    decimals: FPNumber.DEFAULT_PRECISION
  }
]

export async function getAssetInfo (api: ApiPromise, address: string): Promise<Asset> {
  const asset = { address } as Asset
  const assetInfo = await (api.rpc as any).assets.getAssetInfo(address)
  asset.decimals = assetInfo.precision
  asset.symbol = assetInfo.symbol
  return asset
}

export async function getAccountAssetInfo (api: ApiPromise, accountAddress: string, assetAddress: string): Promise<Codec> {
  const xor = KnownAssets.find(asset => asset.symbol === KnownSymbols.XOR)
  const isNative = assetAddress === xor.address
  return await (
    isNative ? api.query.system.account(accountAddress) : api.query.tokens.accounts(accountAddress, assetAddress)
  )
}
