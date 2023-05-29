import { DexId } from '../dex/consts';

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
