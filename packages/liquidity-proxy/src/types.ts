import type { FPNumber, CodecString } from '@sora-substrate/math';
import type { LiquiditySourceTypes, RewardReason, PriceVariant } from './consts';

export type PrimaryMarketsEnabledAssets = {
  [key: string]: Array<string>;
};

export interface SwapResult {
  amount: FPNumber;
  fee: FPNumber;
  rewards: Array<LPRewardsInfo>;
  amountWithoutImpact?: FPNumber;
  path: string[];
}

export type QuotePaths = {
  [key: string]: Array<LiquiditySourceTypes>;
};

export type QuotePayload = {
  exchangePaths: string[][];
  reserves: {
    xyk: {
      [key: string]: [CodecString, CodecString];
    };
    tbc: {
      [key: string]: CodecString;
    };
  };
  prices: {
    [key: string]: {
      [PriceVariant.Buy]: CodecString;
      [PriceVariant.Sell]: CodecString;
    };
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
    xst: {
      floorPrice: CodecString;
    };
  };
};

export type Distribution = {
  market: LiquiditySourceTypes;
  amount: FPNumber;
};

export interface LPRewardsInfo {
  amount: CodecString;
  currency: string;
  reason: RewardReason;
}

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
