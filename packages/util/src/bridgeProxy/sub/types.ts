import type { CodecString } from '@sora-substrate/math';

import type { Operation, History } from '../../BaseApi';
import type { BridgeTxStatus, BridgeNetworkType } from '../consts';
import type { SubNetwork, SubAssetKind } from './consts';

export type SubNetworkParam = {
  [BridgeNetworkType.Sub]: SubNetwork;
};

export interface SubHistory extends History {
  type: Operation.SubstrateIncoming | Operation.SubstrateOutgoing;
  /* SORA network bridge transaction hash */
  hash?: string;
  transactionState?: BridgeTxStatus;
  /* External network block hash */
  externalBlockId?: string;
  /* External network block number */
  externalBlockHeight?: number;
  /* External network transaction hash */
  externalHash?: string;
  externalNetwork?: SubNetwork;
  externalNetworkType?: BridgeNetworkType;
  externalNetworkFee?: CodecString;
}

export type SubAsset = {
  assetKind: SubAssetKind;
  decimals: number;
};

export type ParachainIds = Partial<{
  [key in SubNetwork]: number;
}>;
