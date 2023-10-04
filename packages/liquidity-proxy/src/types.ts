import type { FPNumber, CodecString, NumberLike } from '@sora-substrate/math';
import type { LiquiditySourceTypes, RewardReason, PriceVariant } from './consts';

export type PrimaryMarketsEnabledAssets = {
  tbc: string[];
  xst: Record<
    string,
    {
      referenceSymbol: string;
      feeRatio: FPNumber;
    }
  >;
  lockedSources: Array<LiquiditySourceTypes>;
};

export interface LPRewardsInfo {
  amount: CodecString;
  currency: string;
  reason: RewardReason;
}

export type DistributionChunk = {
  source: LiquiditySourceTypes;
  income: FPNumber;
  outcome: FPNumber;
  fee: FPNumber;
};

export type Distribution = DistributionChunk & {
  input: string;
  output: string;
};

export type QuoteIntermediate = {
  amount: FPNumber;
  fee: FPNumber;
  rewards: LPRewardsInfo[];
  route: string[];
  amountWithoutImpact: FPNumber;
  distribution: Distribution[][];
};

export interface SwapResult {
  amount: CodecString;
  fee: CodecString;
  rewards: LPRewardsInfo[];
  route?: string[];
  amountWithoutImpact?: CodecString;
  distribution?: Distribution[][];
}

export type SwapQuote = (
  inputAssetAddress: string,
  outputAssetAddress: string,
  value: NumberLike,
  isExchangeB: boolean,
  selectedSources?: LiquiditySourceTypes[],
  deduceFee?: boolean
) => {
  result: SwapResult;
  dexId: number;
};

export type QuotePaths = {
  [key: string]: Array<LiquiditySourceTypes>;
};

export type OracleRate = {
  value: CodecString;
  lastUpdated: number;
  dynamicFee: CodecString;
};

export type QuotePayload = {
  enabledAssets: PrimaryMarketsEnabledAssets;
  sources: PathsAndPairLiquiditySources;
  rates: Record<string, OracleRate>;
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
      syntheticBaseBuySellLimit: CodecString;
    };
    band: {
      rateStalePeriod: number;
    };
  };
};

export type QuoteResult = {
  amount: FPNumber;
  fee: FPNumber;
  distribution: Array<Distribution>;
  rewards: Array<LPRewardsInfo>;
};

export type PathsAndPairLiquiditySources = {
  assetPaths: QuotePaths;
  liquiditySources: Array<LiquiditySourceTypes>;
};
