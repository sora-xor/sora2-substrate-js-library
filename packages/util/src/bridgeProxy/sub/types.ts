import type { CodecString } from '@sora-substrate/math';

import type { Operation, History } from '../../BaseApi';
import type { BridgeTxStatus, BridgeNetworkType } from '../consts';
import type { SubNetwork, SubAssetKind } from './consts';

/**
 * Network definitions:
 * 1) "external" - Any Substrate network as the starting (SubstrateIncoming) or ending (SubstrateOutgoing) point for transfer
 * 2) "parachain" - SORA parachain network as an intermediate point for transfer
 * 3) "relaychain" - Relaychain network as an intermediate point for transfer
 *
 * Examples:
 * 1) AssetHub("external") <-> Kusama ("relaychain") <-> KusamaSora ("parachain") <-> SORA ("internal")
 * 2) Kusama ("external") <-> KusamaSora ("parachain") <-> SORA ("internal")
 * 3) KusamaSora ("external") <-> SORA ("internal")
 */
export interface SubHistory extends History {
  type: Operation.SubstrateIncoming | Operation.SubstrateOutgoing;
  /** SORA network bridge transaction hash */
  hash?: string;
  transactionState?: BridgeTxStatus;
  /** SORA parachain block hash */
  parachainBlockId?: string;
  /** SORA parachain block number */
  parachainBlockHeight?: number;
  /** SORA parachain transaction hash */
  parachainHash?: string;
  /** SORA parachain XCM message fee */
  parachainTransferFee?: CodecString;
  /** Relaychain block hash */
  relaychainBlockId?: string;
  /** Relaychain block number */
  relaychainBlockHeight?: number;
  /** Relaychain transaction hash */
  relaychainHash?: string;
  /** Relaychain XCM message fee */
  relaychainTransferFee?: CodecString;
  /** External network block hash */
  externalBlockId?: string;
  /** External network block number */
  externalBlockHeight?: number;
  /** External network transaction hash */
  externalHash?: string;
  /** External network XCM message fee */
  externalTransferFee?: CodecString;
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
