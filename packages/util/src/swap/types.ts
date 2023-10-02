import type { DexId } from '../dex/consts';
import type { SwapQuote, LiquiditySourceTypes } from '@sora-substrate/liquidity-proxy';

export interface SwapTransferBatchData {
  outcomeAssetId: string;
  receivers: Array<SwapTransferBatchReceiver>;
  dexId: DexId;
}

export interface SwapTransferBatchReceiver {
  accountId: string;
  targetAmount: string;
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
