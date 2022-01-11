import type { CodecString, FPNumber } from '../fp';
import type { LiquiditySourceTypes } from '../swap';
import type { LPRewardsInfo } from '../rewards';

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
