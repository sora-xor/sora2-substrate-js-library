import { ApiPromise, ApiRx } from '@polkadot/api'
import { Codec, Observable } from '@polkadot/types/types'
import type { AccountData } from '@polkadot/types/interfaces/balances'
import { map } from '@polkadot/x-rxjs/operators'

import { CodecString, FPNumber } from './fp'
import { isRegisteredAsset } from './registeredAssets'

export const MaxTotalSupply = '170141183460469231731.687303715884105727'

export interface AccountAsset {
  address: string;
  balance: AccountBalance;
  symbol?: string;
  name?: string;
  decimals?: number;
}

// Each value === value * 10 ^ decimals
export interface AccountBalance {
  reserved: CodecString;
  total: CodecString; //  = free + reserved.
  locked: CodecString; // = max(miscFrozen, feeFrozen).
  transferable: CodecString; // = free - Locked.
  frozen: CodecString; // = Locked + reserved.
}

export const ZeroBalance = {
  frozen: '0',
  locked: '0',
  total: '0',
  transferable: '0'
} as AccountBalance

function formatBalance (data: AccountData, assetDecimals?: number): AccountBalance {
  const free = new FPNumber(data.free || 0, assetDecimals)
  const reserved = new FPNumber(data.reserved || 0, assetDecimals)
  const miscFrozen = new FPNumber(data.miscFrozen || 0, assetDecimals)
  const feeFrozen = new FPNumber(data.feeFrozen || 0, assetDecimals)
  const locked = FPNumber.max(miscFrozen, feeFrozen)
  return {
    reserved: reserved.toCodecString(),
    locked: locked.toCodecString(),
    total: free.add(reserved).toCodecString(),
    transferable: free.sub(locked).toCodecString(),
    frozen: locked.add(reserved).toCodecString()
  } as AccountBalance
}

export interface AccountLiquidity {
  address: string;
  balance: CodecString; // value * 10 ^ decimals
  symbol?: string;
  name?: string;
  decimals?: number;
  firstAddress: string;
  secondAddress: string;
  firstBalance: CodecString; // value * 10 ^ decimals
  secondBalance: CodecString; // value * 10 ^ decimals
  poolShare: string; // Formatted value
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
    totalSupply: '10000000000'
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

export async function getLiquidityBalance (api: ApiPromise, accountAddress: string, poolAddress: string): Promise<Codec> {
  return await api.query.poolXyk.poolProviders(poolAddress, accountAddress) // BalanceInfo
}

export async function getBalance (api: ApiPromise, accountAddress: string, assetAddress: string): Promise<Codec> {
  return await (api.rpc as any).assets.usableBalance(accountAddress, assetAddress) // BalanceInfo
}

export async function getAssetBalance (api: ApiPromise, accountAddress: string, assetAddress: string, assetDecimals: number): Promise<AccountBalance> {
  const xorAddress = KnownAssets.get(KnownSymbols.XOR).address
  if (assetAddress === xorAddress) {
    const accountInfo = await api.query.system.account(accountAddress)
    return formatBalance(accountInfo.data, assetDecimals)
  }
  const accountData = await api.query.tokens.accounts(accountAddress, assetAddress)
  return formatBalance(accountData, assetDecimals)
}

export function getAssetBalanceObservable (apiRx: ApiRx, accountAddress: string, assetAddress: string, assetDecimals: number): Observable<AccountBalance> {
  const xorAddress = KnownAssets.get(KnownSymbols.XOR).address
  if (assetAddress === xorAddress) {
    return apiRx.query.system.account(accountAddress).pipe(
      map(({ data }) => formatBalance(data, assetDecimals))
    )
  }
  return apiRx.query.tokens.accounts(accountAddress, assetAddress).pipe(
    map(accountData => formatBalance(accountData, assetDecimals))
  )
}

export function isNativeAsset (asset: any): boolean {
  if (!asset.address) {
    return false
  }
  return !!KnownAssets.get(asset.address)
}

export async function getAssets (api: ApiPromise, sorted = true): Promise<Array<Asset>> {
  const assetInfos = (await (api.rpc as any).assets.listAssetInfos()).toJSON()
  const assets = assetInfos.map(({ asset_id, symbol, name, precision }) => {
    return { symbol, name, address: asset_id, decimals: precision } as Asset
  }) as Array<Asset>
  return !sorted ? assets : assets.sort((a, b) => {
    const isNativeA = isNativeAsset(a)
    const isNativeB = isNativeAsset(b)
    const isRegisteredA = isRegisteredAsset(a)
    const isRegisteredB = isRegisteredAsset(b)
    if ((isNativeA && !isNativeB) || (isRegisteredA && !isRegisteredB)) {
      return -1
    }
    if ((!isNativeA && isNativeB) || (!isRegisteredA && isRegisteredB)) {
      return 1
    }
    if (a.symbol < b.symbol) {
      return -1
    }
    if (a.symbol > b.symbol) {
      return 1
    }
    return 0
  })
}
