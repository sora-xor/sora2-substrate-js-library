import type { FPNumber, CodecString } from '@sora-substrate/math';
import type { LiquiditySourceTypes, RewardReason } from './consts';

export type PrimaryMarketsEnabledAssets = {
  [key: string]: Array<string>;
};

export interface SwapResult {
  amount: CodecString;
  fee: CodecString;
  rewards: Array<LPRewardsInfo>;
  amountWithoutImpact?: CodecString;
}

export type QuotePaths = {
  [key: string]: Array<LiquiditySourceTypes>;
};

export type QuotePayload = {
  reserves: {
    xyk: {
      [key: string]: [CodecString, CodecString];
    };
    tbc: {
      [key: string]: CodecString;
    };
  };
  prices: {
    [key: string]: CodecString;
  };
  issuances: {
    [key: string]: CodecString;
  };
  consts: {
    tbc: {
      initialPrice: CodecString;
      priceChangeStep: CodecString;
      sellPriceCoefficient: CodecString;
    };
  };
};

export type Distribution = {
  market: LiquiditySourceTypes;
  amount: FPNumber;
};

export type QuoteResult = {
  amount: FPNumber;
  fee: FPNumber;
  distribution: Array<Distribution>;
  rewards: Array<LPRewardsInfo>;
};

export type QuotePrimaryMarketResult = {
  market: LiquiditySourceTypes;
  result: QuoteResult;
};

export type PathsAndPairLiquiditySources = {
  paths: QuotePaths;
  liquiditySources: Array<LiquiditySourceTypes>;
};

export interface LPRewardsInfo {
  amount: CodecString;
  currency: string;
  reason: RewardReason;
}
