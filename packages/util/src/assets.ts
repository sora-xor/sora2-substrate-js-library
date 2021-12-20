import { map } from '@polkadot/x-rxjs/operators'
import { combineLatest } from '@polkadot/x-rxjs'
import type { ApiPromise, ApiRx } from '@polkadot/api'
import type { Codec, Observable } from '@polkadot/types/types'
import type { AccountData } from '@polkadot/types/interfaces/balances'
import type { OrmlAccountData } from '@open-web3/orml-types/interfaces/tokens'

import { CodecString, FPNumber } from './fp'

export const MaxTotalSupply = '170141183460469231731.687303715884105727'

export type Whitelist = {
  [key: string]: WhitelistItem
}

export interface WhitelistItem {
  symbol: string;
  name: string;
  decimals: number;
  icon: string;
}

export interface WhitelistArrayItem extends WhitelistItem {
  address: string;
}

export interface AccountAsset {
  address: string;
  balance: AccountBalance;
  symbol?: string;
  name?: string;
  decimals?: number;
}

export enum BalanceType {
  Transferable = 'transferable',
  Frozen = 'frozen',
  Locked = 'locked',
  Reserved = 'reserved',
  Total = 'total',
  Bonded = 'bonded'
}

/**
 * Account Balance structure. Each value === value * 10 ^ decimals
 *
 * total = free + reserved + bonded
 *
 * locked = max(miscFrozen, feeFrozen)
 *
 * transferable = free - locked
 *
 * frozen = locked + reserved
 */
export interface AccountBalance {
  reserved: CodecString;
  total: CodecString;
  locked: CodecString;
  transferable: CodecString;
  frozen: CodecString;
  bonded: CodecString;
}

export const ZeroBalance = {
  frozen: '0',
  locked: '0',
  total: '0',
  transferable: '0',
  bonded: '0'
} as AccountBalance

function formatBalance (data: AccountData | OrmlAccountData, assetDecimals?: number, bondedData?: Codec): AccountBalance {
  const free = new FPNumber(data.free || 0, assetDecimals)
  const reserved = new FPNumber(data.reserved || 0, assetDecimals)
  const miscFrozen = new FPNumber((data as AccountData).miscFrozen || 0, assetDecimals)
  const feeFrozen = new FPNumber((data as AccountData).feeFrozen || 0, assetDecimals)
  const frozen = new FPNumber((data as OrmlAccountData).frozen || 0, assetDecimals)
  const locked = FPNumber.max(miscFrozen, feeFrozen)
  const bonded = new FPNumber(bondedData || 0, assetDecimals)
  const freeAndReserved = free.add(reserved)
  const hasBonded = bonded.isFinity()
  return {
    reserved: reserved.toCodecString(),
    locked: locked.toCodecString(),
    total: (hasBonded ? freeAndReserved.add(bonded) : freeAndReserved).toCodecString(),
    transferable: free.sub(locked).toCodecString(),
    frozen: (frozen.isZero() ? locked.add(reserved) : frozen).toCodecString(),
    bonded: hasBonded ? bonded.toCodecString() : '0'
  } as AccountBalance
}

export interface AccountLiquidity {
  address: string;
  balance: CodecString; // value * 10 ^ decimals
  symbol?: string;
  name?: string;
  decimals?: number;
  decimals2?: number;
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
  PSWAP = 'PSWAP',
  DAI = 'DAI',
  ETH = 'ETH',
  XSTUSD = 'XSTUSD',
}

class ArrayLike<T> extends Array<T> {
  constructor(items?: Array<T>) {
    super()
    items && this.addItems(items)
  }
  private addItems (items: Array<T>): void {
    if (!(items instanceof Array)) {
      return
    }
    this.push(...items)
  }
  public contains (info: string): boolean {
    return !!this.find((asset: any) => [asset.address, asset.symbol].includes(info))
  }
  public get (info: string): T {
    return this.find((asset: any) => [asset.address, asset.symbol].includes(info))
  }
}

export const NativeAssets = new ArrayLike<Asset>([
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
  },
  {
    address: '0x0200080000000000000000000000000000000000000000000000000000000000',
    symbol: KnownSymbols.XSTUSD,
    name: 'SORA Synthetic USD',
    decimals: FPNumber.DEFAULT_PRECISION,
    totalSupply: MaxTotalSupply,
  },
])

export const XOR = NativeAssets.get(KnownSymbols.XOR)

export const KnownAssets = new ArrayLike<Asset>([
  ...NativeAssets,
  {
    address: '0x0200060000000000000000000000000000000000000000000000000000000000',
    symbol: KnownSymbols.DAI,
    name: 'Dai Stablecoin',
    decimals: FPNumber.DEFAULT_PRECISION,
    totalSupply: MaxTotalSupply,
  },
  {
    address: '0x0200070000000000000000000000000000000000000000000000000000000000',
    symbol: KnownSymbols.ETH,
    name: 'Ether',
    decimals: FPNumber.DEFAULT_PRECISION,
    totalSupply: MaxTotalSupply,
  },
])

export async function getAssetInfo (api: ApiPromise, address: string): Promise<Asset> {
  const [symbol, name, decimals, _] = (await api.query.assets.assetInfos(address)).toHuman() as any
  return { address, symbol, name, decimals: +decimals } as Asset
}

export async function getLiquidityBalance (api: ApiPromise, accountAddress: string, poolAddress: string): Promise<Codec> {
  return await api.query.poolXyk.poolProviders(poolAddress, accountAddress) // BalanceInfo
}

/**
 * Used *ONLY* for faucet
 */
export async function getBalance (api: ApiPromise, accountAddress: string, assetAddress: string): Promise<Codec> {
  return await (api.rpc as any).assets.usableBalance(accountAddress, assetAddress) // BalanceInfo
}

export async function getAssetBalance (api: ApiPromise, accountAddress: string, assetAddress: string, assetDecimals: number): Promise<AccountBalance> {
  if (assetAddress === XOR.address) {
    const accountInfo = await api.query.system.account(accountAddress)
    const bondedBalance = await api.query.referrals.referrerBalances(accountAddress)
    return formatBalance(accountInfo.data, assetDecimals, bondedBalance)
  }
  const accountData = await api.query.tokens.accounts(accountAddress, assetAddress)
  return formatBalance(accountData, assetDecimals)
}

export function getAssetBalanceObservable (apiRx: ApiRx, accountAddress: string, assetAddress: string, assetDecimals: number): Observable<AccountBalance> {
  if (assetAddress === XOR.address) {
    const accountInfo = apiRx.query.system.account(accountAddress)
    const bondedBalance = apiRx.query.referrals.referrerBalances(accountAddress)

    return combineLatest([accountInfo, bondedBalance]).pipe(
      map((result) => formatBalance(result[0].data, assetDecimals, result[1]))
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

function isRegisteredAsset (asset: any, whitelist: Whitelist): boolean {
  if (!asset.address) {
    return false
  }
  return !!whitelist[asset.address]
}

export async function getAssets (api: ApiPromise, whitelist?: Whitelist): Promise<Array<Asset>> {
  const assets = (await api.query.assets.assetInfos.entries()).map(([key, codec]) => {
    const [address] = key.toHuman() as any
    const [symbol, name, decimals, _] = codec.toHuman() as any
    return { address, symbol, name, decimals: +decimals }
  }) as Array<Asset>
  return !whitelist ? assets : assets.sort((a, b) => {
    const isNativeA = isNativeAsset(a)
    const isNativeB = isNativeAsset(b)
    const isRegisteredA = isRegisteredAsset(a, whitelist)
    const isRegisteredB = isRegisteredAsset(b, whitelist)
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

export const getWhitelistAssets = (whitelist: Array<WhitelistArrayItem>) => whitelist.reduce<Whitelist>((acc, asset) => {
  acc[asset.address] = {
    name: asset.name,
    symbol: asset.symbol,
    decimals: asset.decimals,
    icon: asset.icon
  }
  return acc
}, {})

export const isWhitelistAsset = isRegisteredAsset

export const getWhitelistIdsBySymbol = (whitelist: Array<WhitelistArrayItem>) => whitelist.reduce<any>((acc, asset) => {
  acc[asset.symbol.toUpperCase()] = asset.address
  return acc
}, {})

export function isBlacklistAsset (asset: any, whitelistIdsBySymbol: any): boolean {
  if (!asset.address || !asset.symbol) {
    return false
  }
  const address = whitelistIdsBySymbol[asset.symbol]
  if (!address) {
    return false
  }
  return address !== asset.address
}
