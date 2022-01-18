import { FPNumber } from '../fp';
import { KnownAssets, KnownSymbols, MaxTotalSupply } from '../assets/consts';

export class Consts {
  /** Zero string */
  static readonly ZERO_STR = '0';
  /** PSWAP token */
  static readonly PSWAP = KnownAssets.get(KnownSymbols.PSWAP);
  /** VAL token */
  static readonly VAL = KnownAssets.get(KnownSymbols.VAL);
  /** DAI token */
  static readonly DAI = KnownAssets.get(KnownSymbols.DAI);
  /** ETH token */
  static readonly ETH = KnownAssets.get(KnownSymbols.ETH);
  /** XST-USD token */
  static readonly XSTUSD = KnownAssets.get(KnownSymbols.XSTUSD);

  static readonly XYK_FEE = new FPNumber(0.003);
  static readonly XST_FEE = new FPNumber(0.007);
  static readonly TBC_FEE = Consts.XYK_FEE;
  /** Max `Rust` number value */
  static readonly MAX = new FPNumber(MaxTotalSupply);

  // TBC
  static readonly INITIAL_PRICE = new FPNumber(634);
  static readonly PRICE_CHANGE_COEFF = new FPNumber(1337);
  static readonly SELL_PRICE_COEFF = new FPNumber(0.8);

  /** 4 registered - pswap and val which are not incentivized */
  static readonly incentivizedCurrenciesNum = new FPNumber(2);
  /** 2.5 billion pswap reserved for tbc rewards */
  static readonly initialPswapTbcRewardsAmount = new FPNumber(2500000000);

  static readonly ASSETS_HAS_XYK_POOL = [
    Consts.PSWAP,
    Consts.VAL,
    Consts.DAI,
    Consts.ETH
  ].map(asset => asset.address);
  /** Just `1` as `FPNumber` object */
  static readonly ONE = new FPNumber(1);
}

export enum LiquiditySourceTypes {
  Default = '',
  XYKPool = 'XYKPool',
  XSTPool = 'XSTPool',
  MulticollateralBondingCurvePool = 'MulticollateralBondingCurvePool'
}
