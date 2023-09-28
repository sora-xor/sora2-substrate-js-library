import type { CodecString } from '@sora-substrate/math';

import type { BridgeTxDirection, BridgeTxStatus, BridgeNetworkType } from './consts';

import type { EvmNetwork, EvmNetworkParam, EvmSupportedApp } from './evm/types';
import type { EthNetworkParam } from './eth/types';
import type { SubNetworkParam } from './sub/types';
import type { SubNetwork } from './sub/consts';

export type BridgeNetworkParam = EthNetworkParam | EvmNetworkParam | SubNetworkParam;

export type BridgeNetworkId = EvmNetwork | SubNetwork;

/** Made like BridgeRequest */
export interface BridgeTransactionData {
  externalNetwork: BridgeNetworkId;
  externalNetworkType: BridgeNetworkType;
  /** Outgoing = 0, Incoming = 1 */
  direction: BridgeTxDirection;
  /** SORA Account ID */
  soraAccount: string;
  /** EVM Account ID */
  externalAccount: string;
  soraAssetAddress: string;
  status: BridgeTxStatus;
  soraHash: string;
  amount: CodecString;
  startBlock: number;
  endBlock: number;
}

export type SupportedApps = {
  [BridgeNetworkType.Eth]: Record<number, Partial<EvmSupportedApp>>;
  [BridgeNetworkType.Evm]: Record<number, Partial<EvmSupportedApp>>;
  [BridgeNetworkType.Sub]: SubNetwork[];
};
