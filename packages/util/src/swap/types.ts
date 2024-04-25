import type { SwapQuote, LiquiditySourceTypes } from '@sora-substrate/liquidity-proxy';
import type { DexId } from '../dex/consts';
import { FPNumber, NumberLike } from '@sora-substrate/math';

export interface SwapTransferBatchData {
  outcomeAssetId: string;
  outcomeAssetReuse: FPNumber | NumberLike;
  receivers: Array<SwapTransferBatchReceiver>;
  dexId: DexId;
}

export interface SwapTransferBatchReceiver {
  accountId: string;
  targetAmount: FPNumber | NumberLike;
}

export interface ReceiverHistoryItem {
  accountId: string;
  amount: string;
  assetId: string;
}

export type SwapQuoteData = {
  quote: SwapQuote;
  isAvailable: boolean;
  liquiditySources: LiquiditySourceTypes[];
};

export type FilterMode = 'Disabled' | 'AllowSelected' | 'ForbidSelected';
