import type { CodecString } from '@sora-substrate/math';

import type { Operation, History } from '../BaseApi';
import type { BridgeDirection, EvmNetworkId, EvmTxStatus, EvmAppKinds, BridgeTypeNetwork, SubNetwork } from './consts';

export type EvmLegacyNetworkParam = {
  [BridgeTypeNetwork.EvmLegacy]: number;
};

export type EvmNetworkParam = {
  [BridgeTypeNetwork.Evm]: EvmNetwork;
};

export type SubNetworkParam = {
  [BridgeTypeNetwork.Sub]: SubNetwork;
};

export type BridgeNetworkParam = EvmLegacyNetworkParam | EvmNetworkParam | SubNetworkParam;

/** Made like BridgeRequest */
export interface BridgeTransactionData {
  externalNetwork: BridgeNetworkParam;
  /** Outgoing = 0, Incoming = 1 */
  direction: BridgeDirection;
  /** SORA Account ID */
  soraAccount: string;
  /** EVM Account ID */
  externalAccount: string;
  soraAssetAddress: string;
  status: EvmTxStatus;
  soraHash: string;
  amount: CodecString;
  startBlock: number;
  endBlock: number;
}

export type EvmNetwork = EvmNetworkId | number;

export interface EvmHistory extends History {
  type: Operation.EvmIncoming | Operation.EvmOutgoing;
  hash?: string;
  transactionState?: EvmTxStatus;
  externalHash?: string;
  externalNetworkFee?: CodecString;
  externalNetwork?: EvmNetwork;
}

export type EvmAsset = {
  address: string;
  appKind: EvmAppKinds;
  decimals: number;
};

type EvmSupportedApp = Record<EvmAppKinds, string>;

export type SupportedApps = {
  [BridgeTypeNetwork.EvmLegacy]: Record<number, Partial<EvmSupportedApp>>;
  [BridgeTypeNetwork.Evm]: Record<number, Partial<EvmSupportedApp>>;
  [BridgeTypeNetwork.Sub]: SubNetwork[];
};
