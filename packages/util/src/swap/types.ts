import type { CodecString, FPNumber } from '../fp';
import type { LPRewardsInfo } from '../rewards';
import type { LiquiditySourceTypes } from './consts';

export type PrimaryMarketsEnabledAssets = {
  [key: string]: Array<string>
};

export interface SwapResult {
  amount: CodecString;
  fee: CodecString;
  rewards: Array<LPRewardsInfo>;
  amountWithoutImpact: CodecString;
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
}

export type PathsAndPairLiquiditySources = {
  paths: QuotePaths;
  liquiditySources: Array<LiquiditySourceTypes>;
}
