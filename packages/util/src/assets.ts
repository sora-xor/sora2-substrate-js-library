import { ApiPromise } from '@polkadot/api'
import { Codec } from '@polkadot/types/types'

export interface Asset {
  address: string;
  symbol: string;
  decimals: number;
}

export enum Symbols {
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
    symbol: Symbols.XOR,
    decimals: 18
  },
  {
    address: '0x0200010000000000000000000000000000000000000000000000000000000000',
    symbol: Symbols.DOT,
    decimals: 10
  },
  {
    address: '0x0200020000000000000000000000000000000000000000000000000000000000',
    symbol: Symbols.KSM,
    decimals: 12
  },
  {
    address: '0x0200030000000000000000000000000000000000000000000000000000000000',
    symbol: Symbols.USD,
    decimals: 18
  },
  {
    address: '0x0200040000000000000000000000000000000000000000000000000000000000',
    symbol: Symbols.VAL,
    decimals: 18
  },
  {
    address: '0x0200050000000000000000000000000000000000000000000000000000000000',
    symbol: Symbols.PSWAP,
    decimals: 18
  }
]

export async function getAssetInfo (api: ApiPromise, accountAddress: string, assetAddress: string): Promise<Codec> {
  const xor = KnownAssets.find(asset => asset.symbol === Symbols.XOR)
  const isNative = assetAddress === xor.address
  const asset = await (
    isNative ? api.query.system.account(accountAddress, assetAddress) : api.query.tokens.accounts(accountAddress, assetAddress)
  )
  return asset
}
