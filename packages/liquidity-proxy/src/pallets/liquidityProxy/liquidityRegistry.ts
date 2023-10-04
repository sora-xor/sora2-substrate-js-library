import { LiquiditySourceTypes, Errors } from '../../consts';

import { xykQuote, xykQuoteWithoutImpact, xykStepQuote, xykCheckRewards } from '../poolXyk';
import { tbcQuote, tbcQuoteWithoutImpact, tbcStepQuote, tbcCheckRewards } from '../multicollateralBoundingCurvePool';
import { xstQuote, xstQuoteWithoutImpact, xstStepQuote, xstCheckRewards } from '../xst';

export class LiquidityRegistry {
  public static quote(source: LiquiditySourceTypes) {
    switch (source) {
      case LiquiditySourceTypes.XYKPool:
        return xykQuote;
      case LiquiditySourceTypes.MulticollateralBondingCurvePool:
        return tbcQuote;
      case LiquiditySourceTypes.XSTPool:
        return xstQuote;
      default:
        throw new Error(Errors.UnsupportedLiquiditySource);
    }
  }

  public static quoteWithoutImpact(source: LiquiditySourceTypes) {
    switch (source) {
      case LiquiditySourceTypes.XYKPool:
        return xykQuoteWithoutImpact;
      case LiquiditySourceTypes.MulticollateralBondingCurvePool:
        return tbcQuoteWithoutImpact;
      case LiquiditySourceTypes.XSTPool:
        return xstQuoteWithoutImpact;
      default:
        throw new Error(Errors.UnsupportedLiquiditySource);
    }
  }

  public static stepQuote(source: LiquiditySourceTypes) {
    switch (source) {
      case LiquiditySourceTypes.XYKPool:
        return xykStepQuote;
      case LiquiditySourceTypes.MulticollateralBondingCurvePool:
        return tbcStepQuote;
      case LiquiditySourceTypes.XSTPool:
        return xstStepQuote;
      default:
        throw new Error(Errors.UnsupportedLiquiditySource);
    }
  }

  public static checkRewards(source: LiquiditySourceTypes) {
    switch (source) {
      case LiquiditySourceTypes.MulticollateralBondingCurvePool:
        return tbcCheckRewards;
      case LiquiditySourceTypes.XYKPool:
        return xykCheckRewards;
      case LiquiditySourceTypes.XSTPool:
        return xstCheckRewards;
      default:
        throw new Error(Errors.UnsupportedLiquiditySource);
    }
  }
}
