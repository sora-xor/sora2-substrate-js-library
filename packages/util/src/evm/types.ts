import type { CodecString } from '@sora-substrate/math';

import type { Operation, History } from '../BaseApi';
import type { EvmDirection, EvmNetwork, EvmTxStatus } from './consts';

/** Made like BridgeRequest */
export interface EvmTransaction {
  /** Outgoing = 0, Incoming = 1 */
  direction: EvmDirection;
  /** SORA Account ID */
  from: string;
  /** EVM Account ID */
  to: string;
  soraAssetAddress: string;
  status: EvmTxStatus;
  hash: string;
  amount: CodecString;
}

export interface EvmHistory extends History {
  type: Operation.EvmIncoming | Operation.EvmOutgoing;
  hash?: string;
  transactionState?: EvmTxStatus;
  externalNetwork?: EvmNetwork;
}
