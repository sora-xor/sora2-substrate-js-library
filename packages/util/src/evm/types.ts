import type { CodecString } from '@sora-substrate/math';

import type { Operation, History } from '../BaseApi';
import type { EvmDirection, EvmNetwork, EvmTxStatus } from './consts';

/** Made like BridgeRequest */
export interface EvmTransaction {
  /** Outgoing = 0, Incoming = 1 */
  direction: EvmDirection;
  /** SORA Account ID */
  soraAccount: string;
  /** EVM Account ID */
  evmAccount: string;
  soraAssetAddress: string;
  status: EvmTxStatus;
  soraHash: string;
  amount: CodecString;
  // TODO: these fields below will be added later
  evmHash: string;
  startTimestamp: number;
  endTimestamp: number;
}

export interface EvmHistory extends History {
  type: Operation.EvmIncoming | Operation.EvmOutgoing;
  hash?: string;
  transactionState?: EvmTxStatus;
  externalNetwork?: EvmNetwork;
}

export type EvmAsset = {
  evmAddress: string;
  contract: string;
};
