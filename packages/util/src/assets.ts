import { ApiPromise, ApiRx } from '@polkadot/api'
import { Codec, Observable } from '@polkadot/types/types'
import { map } from '@polkadot/x-rxjs/operators'

import { CodecString, FPNumber } from './fp'

export const MaxTotalSupply = '170141183460469231731.687303715884105727'

export interface AccountAsset {
  address: string;
  balance: CodecString; // value * 10 ^ decimals
  symbol?: string;
  name?: string;
  decimals?: number;
}

export interface AccountLiquidity extends AccountAsset {
  firstAddress: string;
  secondAddress: string;
  firstBalance: CodecString; // value * 10 ^ decimals
  secondBalance: CodecString; // value * 10 ^ decimals
}

export interface Asset {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  totalSupply?: string;
}

export enum PoolTokens {
  XYKPOOL = 'XYKPOOL'
}

export enum KnownSymbols {
  XOR = 'XOR',
  VAL = 'VAL',
  PSWAP = 'PSWAP'
}

class ArrayLike<T> extends Array<T> {
  constructor(items?: Array<T>) {
    super()
    items && this.addItems(items)
  }
  private addItems (items: Array<T>): void {
    items.forEach(item => this.push(item))
  }
  public contains (info: string): boolean {
    return !!this.find((asset: any) => [asset.address, asset.symbol].includes(info))
  }
  public get (info: string): T {
    return this.find((asset: any) => [asset.address, asset.symbol].includes(info))
  }
}

export const KnownAssets = new ArrayLike<Asset>([
  {
    address: '0x0200000000000000000000000000000000000000000000000000000000000000',
    symbol: KnownSymbols.XOR,
    name: 'SORA',
    decimals: FPNumber.DEFAULT_PRECISION,
    totalSupply: '700000'
  },
  {
    address: '0x0200040000000000000000000000000000000000000000000000000000000000',
    symbol: KnownSymbols.VAL,
    name: 'SORA Validator Token',
    decimals: FPNumber.DEFAULT_PRECISION,
    totalSupply: '100000000'
  },
  {
    address: '0x0200050000000000000000000000000000000000000000000000000000000000',
    symbol: KnownSymbols.PSWAP,
    name: 'Polkaswap',
    decimals: FPNumber.DEFAULT_PRECISION,
    totalSupply: '100000000'
  }
])

export async function getAssetInfo (api: ApiPromise, address: string): Promise<Asset> {
  const asset = { address } as Asset
  const assetInfo = (await (api.rpc as any).assets.getAssetInfo(address)).toJSON()
  asset.decimals = assetInfo.precision
  asset.symbol = assetInfo.symbol
  asset.name = assetInfo.name
  return asset
}

export async function getAssetBalance (api: ApiPromise, accountAddress: string, assetAddress: string): Promise<Codec> {
  return await (api.rpc as any).assets.freeBalance(accountAddress, assetAddress) // BalanceInfo
}

export function getAssetBalanceObservable (apiRx: ApiRx, accountAddress: string, assetAddress: string): Observable<Codec> {
  const xorAddress = KnownAssets.get(KnownSymbols.XOR).address
  if (assetAddress === xorAddress) {
    return apiRx.query.system.account(accountAddress).pipe(
      map(accountInfo => accountInfo.data.free)
    )
  }
  return apiRx.query.tokens.accounts(accountAddress, assetAddress).pipe(
    map(accountData => accountData.free)
  )
  // return (apiRx.rpc as any).assets.freeBalance(accountAddress, assetAddress) // BalanceInfo
}

export async function getAssets (api: ApiPromise): Promise<Array<Asset>> {
  const assetInfos = (await (api.rpc as any).assets.listAssetInfos()).toJSON()
  return assetInfos.map(({ asset_id, symbol, name, precision }) => {
    return { symbol, name, address: asset_id, decimals: precision } as Asset
  })
}
