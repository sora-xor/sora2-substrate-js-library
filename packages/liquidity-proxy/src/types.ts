import type { FPNumber, CodecString } from '@sora-substrate/math';
import type { LiquiditySourceTypes, RewardReason, PriceVariant } from './consts';

export type PrimaryMarketsEnabledAssets = {
  [key: string]: Array<string>;
  lockedSources: Array<LiquiditySourceTypes>;
};

export interface LPRewardsInfo {
  amount: CodecString;
  currency: string;
  reason: RewardReason;
}

export type Distribution = {
  input: string;
  output: string;
  market: LiquiditySourceTypes;
  income: FPNumber;
  outcome: FPNumber;
  fee: FPNumber;
};

export type QuoteIntermediate = {
  amount: FPNumber;
  amountWithoutImpact: FPNumber;
  fee: FPNumber;
  rewards: LPRewardsInfo[];
  path: string[];
  distribution: Distribution[][];
};

export interface SwapResult {
  amount: CodecString;
  fee: CodecString;
  rewards: Array<LPRewardsInfo>;
  amountWithoutImpact?: CodecString;
  path?: string[];
  distribution?: Distribution[][];
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
      priceChangeRate: CodecString;
      sellPriceCoefficient: CodecString;
      referenceAsset: string;
    };
    xst: {
      floorPrice: CodecString;
      referenceAsset: string;
    };
  };
  lockedSources: Array<LiquiditySourceTypes>;
};

export type QuoteResult = {
  amount: FPNumber;
  fee: FPNumber;
  distribution: Array<Distribution>;
  rewards: Array<LPRewardsInfo>;
};

export type PathsAndPairLiquiditySources = {
  paths: QuotePaths;
  liquiditySources: Array<LiquiditySourceTypes>;
};
