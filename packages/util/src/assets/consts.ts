import { FPNumber } from '@sora-substrate/math';

import type { AccountBalance, Asset } from './types';

export const MaxRustNumber = '170141183460469231731.687303715884105727';
export const MaxTotalSupply = '100000000000000000000'; // It's better to round it for UX

export enum KnownSymbols {
  XOR = 'XOR',
  VAL = 'VAL',
  PSWAP = 'PSWAP',
  DAI = 'DAI',
  ETH = 'ETH',
  XSTUSD = 'XSTUSD',
  XST = 'XST',
}

const ZERO_STR = '0';
export const ZeroBalance = {
  frozen: ZERO_STR,
  locked: ZERO_STR,
  total: ZERO_STR,
  transferable: ZERO_STR,
  bonded: ZERO_STR,
} as AccountBalance;

export enum BalanceType {
  Transferable = 'transferable',
  Frozen = 'frozen',
  Locked = 'locked',
  Reserved = 'reserved',
  Total = 'total',
  Bonded = 'bonded',
}

class ArrayLike<T> extends Array<T> {
  constructor(items?: Array<T>) {
    super();
    items && this.addItems(items);
  }
  private addItems(items: Array<T>): void {
    if (!(items instanceof Array)) {
      return;
    }
    this.push(...items);
  }
  public contains(info: string): boolean {
    return !!this.find((asset: any) => [asset.address, asset.symbol].includes(info));
  }
  /**
   * **ONLY** for known assets
   */
  public get(info: string): T {
    return this.find((asset: any) => [asset.address, asset.symbol].includes(info)) as T;
  }
}

export const NativeAssets = new ArrayLike<Asset>([
  {
    address: '0x0200000000000000000000000000000000000000000000000000000000000000',
    symbol: KnownSymbols.XOR,
    name: 'SORA',
    decimals: FPNumber.DEFAULT_PRECISION,
  },
  {
    address: '0x0200040000000000000000000000000000000000000000000000000000000000',
    symbol: KnownSymbols.VAL,
    name: 'SORA Validator Token',
    decimals: FPNumber.DEFAULT_PRECISION,
  },
  {
    address: '0x0200050000000000000000000000000000000000000000000000000000000000',
    symbol: KnownSymbols.PSWAP,
    name: 'Polkaswap',
    decimals: FPNumber.DEFAULT_PRECISION,
  },
  {
    address: '0x0200080000000000000000000000000000000000000000000000000000000000',
    symbol: KnownSymbols.XSTUSD,
    name: 'SORA Synthetic USD',
    decimals: FPNumber.DEFAULT_PRECISION,
  },
  {
    address: '0x0200090000000000000000000000000000000000000000000000000000000000',
    symbol: KnownSymbols.XST,
    name: 'SORA Synthetics',
    decimals: FPNumber.DEFAULT_PRECISION,
  },
]);

export const KnownAssets = new ArrayLike<Asset>([
  ...NativeAssets,
  {
    address: '0x0200060000000000000000000000000000000000000000000000000000000000',
    symbol: KnownSymbols.DAI,
    name: 'Dai Stablecoin',
    decimals: FPNumber.DEFAULT_PRECISION,
  },
  {
    address: '0x0200070000000000000000000000000000000000000000000000000000000000',
    symbol: KnownSymbols.ETH,
    name: 'Ether',
    decimals: FPNumber.DEFAULT_PRECISION,
  },
]);

export const XOR = NativeAssets.get(KnownSymbols.XOR);
export const VAL = NativeAssets.get(KnownSymbols.VAL);
export const PSWAP = NativeAssets.get(KnownSymbols.PSWAP);
export const XSTUSD = NativeAssets.get(KnownSymbols.XSTUSD);
export const DAI = KnownAssets.get(KnownSymbols.DAI);
export const ETH = KnownAssets.get(KnownSymbols.ETH);
