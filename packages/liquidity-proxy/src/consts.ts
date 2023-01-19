import { FPNumber } from '@sora-substrate/math';

export class Consts {
  /** XOR token */
  static readonly XOR = '0x0200000000000000000000000000000000000000000000000000000000000000';
  /** VAL token */
  static readonly VAL = '0x0200040000000000000000000000000000000000000000000000000000000000';
  /** PSWAP token */
  static readonly PSWAP = '0x0200050000000000000000000000000000000000000000000000000000000000';
  /** DAI token */
  static readonly DAI = '0x0200060000000000000000000000000000000000000000000000000000000000';
  /** ETH token */
  static readonly ETH = '0x0200070000000000000000000000000000000000000000000000000000000000';
  /** XST-USD token */
  static readonly XSTUSD = '0x0200080000000000000000000000000000000000000000000000000000000000';

  /** XYK, TBC, XST fees the same */
  static readonly XYK_FEE = new FPNumber(0.003);
  static readonly XST_FEE = new FPNumber(0.00666);
  static readonly TBC_FEE = Consts.XYK_FEE;
  /** Max `Rust` number value */
  static readonly MAX = new FPNumber('170141183460469231731.687303715884105727');

  /** 4 registered - pswap and val which are not incentivized */
  static readonly incentivizedCurrenciesNum = new FPNumber(2);
  /** 2.5 billion pswap reserved for tbc rewards */
  static readonly initialPswapTbcRewardsAmount = new FPNumber(2500000000);

  static readonly ASSETS_HAS_XYK_POOL = [Consts.PSWAP, Consts.VAL, Consts.DAI, Consts.ETH];
  static readonly XOR_MIN_PRICE = new FPNumber(4);
}

export enum LiquiditySourceTypes {
  Default = '',
  XYKPool = 'XYKPool',
  XSTPool = 'XSTPool',
  MulticollateralBondingCurvePool = 'MulticollateralBondingCurvePool',
}

export enum RewardReason {
  Unspecified = 'Unspecified',
  BuyOnBondingCurve = 'BuyOnBondingCurve',
}
