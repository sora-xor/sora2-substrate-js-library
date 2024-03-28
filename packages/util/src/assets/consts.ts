import { FPNumber } from '@sora-substrate/math';

import type { AccountBalance, Asset, KnownSymbol, NativeSymbol } from './types';

export const MaxRustNumber = '170141183460469231731.687303715884105727';
export const MaxTotalSupply = '100000000000000000000'; // It's better to round it for UX
/** VAL supply difference between circulating and total supply */
export const VAL_CIRCULATING_DIFF = new FPNumber('33449609.3779');
/** PSWAP supply difference between circulating and total supply */
export const PSWAP_CIRCULATING_DIFF = new FPNumber('6345014420.6195');

export enum KnownSymbols {
  XOR = 'XOR',
  VAL = 'VAL',
  PSWAP = 'PSWAP',
  DAI = 'DAI',
  ETH = 'ETH',
  XSTUSD = 'XSTUSD',
  XST = 'XST',
  TBCD = 'TBCD',
  KEN = 'KEN',
  KUSD = 'KUSD',
}

const ZERO_STR = '0';

export const ZeroBalance: AccountBalance = {
  free: ZERO_STR,
  reserved: ZERO_STR,
  frozen: ZERO_STR,
  bonded: ZERO_STR,
  locked: ZERO_STR,
  total: ZERO_STR,
  transferable: ZERO_STR,
};

export enum BalanceType {
  Free = 'free',
  Reserved = 'reserved',
  Frozen = 'frozen',
  Bonded = 'bonded',
  Locked = 'locked',
  Total = 'total',
  Transferable = 'transferable',
}

class ArrayLike<T, U> extends Array<T> {
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
  public get(info: U): T;
  public get(info: string): T | undefined;
  public get(info: U | string): T | undefined {
    return this.find((asset: any) => [asset.address, asset.symbol].includes(info));
  }
}

export const NativeAssets = new ArrayLike<Asset, NativeSymbol>([
  {
    address: '0x0200000000000000000000000000000000000000000000000000000000000000',
    symbol: KnownSymbols.XOR,
    name: 'SORA',
    decimals: FPNumber.DEFAULT_PRECISION,
    isMintable: true,
  },
  {
    address: '0x0200040000000000000000000000000000000000000000000000000000000000',
    symbol: KnownSymbols.VAL,
    name: 'SORA Validator Token',
    decimals: FPNumber.DEFAULT_PRECISION,
    isMintable: true,
  },
  {
    address: '0x0200050000000000000000000000000000000000000000000000000000000000',
    symbol: KnownSymbols.PSWAP,
    name: 'Polkaswap',
    decimals: FPNumber.DEFAULT_PRECISION,
    isMintable: true,
  },
  {
    address: '0x0200080000000000000000000000000000000000000000000000000000000000',
    symbol: KnownSymbols.XSTUSD,
    name: 'SORA Synthetic USD',
    decimals: FPNumber.DEFAULT_PRECISION,
    isMintable: true,
  },
  {
    address: '0x0200090000000000000000000000000000000000000000000000000000000000',
    symbol: KnownSymbols.XST,
    name: 'SORA Synthetics',
    decimals: FPNumber.DEFAULT_PRECISION,
    isMintable: true,
  },
  {
    address: '0x02000a0000000000000000000000000000000000000000000000000000000000',
    symbol: KnownSymbols.TBCD,
    name: 'SORA TBC Dollar',
    decimals: FPNumber.DEFAULT_PRECISION,
    isMintable: true,
  },
  {
    address: '0x02000b0000000000000000000000000000000000000000000000000000000000',
    symbol: KnownSymbols.KEN,
    name: 'Kensetsu incentive token',
    decimals: FPNumber.DEFAULT_PRECISION,
    isMintable: true,
  },
  {
    address: '0x02000c0000000000000000000000000000000000000000000000000000000000',
    symbol: KnownSymbols.KUSD,
    name: 'Kensetsu Stable Dollar',
    decimals: FPNumber.DEFAULT_PRECISION,
    isMintable: true,
  },
]);

export const KnownAssets = new ArrayLike<Asset, KnownSymbol>([
  ...NativeAssets,
  {
    address: '0x0200060000000000000000000000000000000000000000000000000000000000',
    symbol: KnownSymbols.DAI,
    name: 'Dai Stablecoin',
    decimals: FPNumber.DEFAULT_PRECISION,
    isMintable: true,
  },
  {
    address: '0x0200070000000000000000000000000000000000000000000000000000000000',
    symbol: KnownSymbols.ETH,
    name: 'Ether',
    decimals: FPNumber.DEFAULT_PRECISION,
    isMintable: true,
  },
]);

export const XOR = NativeAssets.get(KnownSymbols.XOR);
export const VAL = NativeAssets.get(KnownSymbols.VAL);
export const PSWAP = NativeAssets.get(KnownSymbols.PSWAP);
export const XSTUSD = NativeAssets.get(KnownSymbols.XSTUSD);
export const DAI = KnownAssets.get(KnownSymbols.DAI);
export const ETH = KnownAssets.get(KnownSymbols.ETH);
export const XST = KnownAssets.get(KnownSymbols.XST);
export const TBCD = KnownAssets.get(KnownSymbols.TBCD);
export const KEN = KnownAssets.get(KnownSymbols.KEN);
export const KUSD = KnownAssets.get(KnownSymbols.KUSD);
