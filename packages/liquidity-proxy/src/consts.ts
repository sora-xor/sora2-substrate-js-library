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
  /** XST token */
  static readonly XST = '0x0200090000000000000000000000000000000000000000000000000000000000';
  /** TBCD token */
  static readonly TBCD = '0x02000a0000000000000000000000000000000000000000000000000000000000';

  /** XYK, TBC fees the same */
  static readonly XYK_FEE = new FPNumber(0.003);
  static readonly TBC_FEE = Consts.XYK_FEE;
  /** Max `Rust` number value */
  static readonly MAX = new FPNumber('170141183460469231731.687303715884105727');

  /** 4 registered - pswap and val which are not incentivized */
  static readonly incentivizedCurrenciesNum = new FPNumber(2);
  /** 2.5 billion pswap reserved for tbc rewards */
  static readonly initialPswapTbcRewardsAmount = new FPNumber(2500000000);
}

export enum Errors {
  PriceCalculationFailed = 'An error occurred while calculating the price.',
  CantExchange = "Liquidity source can't exchange assets with the given IDs on the given DEXId.",
  PoolIsEmpty = 'The pool has empty liquidity.',
  InvalidFeeRatio = 'Invalid fee ratio value.',
  NotEnoughReserves = "It's not enough reserves in the pool to perform the operation.",
  SyntheticDoesNotExist = 'Synthetic asset does not exist.',
  SyntheticBaseBuySellLimitExceeded = 'Input/output amount of synthetic base asset exceeds the limit',
}

export enum LiquiditySourceTypes {
  XYKPool = 'XYKPool',
  XSTPool = 'XSTPool',
  MulticollateralBondingCurvePool = 'MulticollateralBondingCurvePool',
}

export enum RewardReason {
  Unspecified = 'Unspecified',
  BuyOnBondingCurve = 'BuyOnBondingCurve',
}

export enum PriceVariant {
  Buy = 'buy',
  Sell = 'sell',
}

export enum AssetType {
  Base = 'Base',
  SyntheticBase = 'SyntheticBase',
  Basic = 'Basic',
  Synthetic = 'Synthetic',
}

export enum SwapVariant {
  WithDesiredInput = 'WithDesiredInput',
  WithDesiredOutput = 'WithDesiredOutput',
}
