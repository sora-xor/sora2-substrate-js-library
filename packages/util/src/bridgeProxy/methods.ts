import { map } from 'rxjs';

import type { Observable } from '@polkadot/types/types';
import type {
  BridgeProxyBridgeRequest,
  BridgeTypesGenericAccount,
  BridgeTypesGenericTimepoint,
  XcmV2Junction,
  XcmV3Junction,
} from '@polkadot/types/lookup';
import type { Option } from '@polkadot/types-codec';
import type { ApiPromise, ApiRx } from '@polkadot/api';
import type { CodecString } from '@sora-substrate/math';

import { BridgeTxStatus, BridgeTxDirection, BridgeNetworkType } from './consts';
import { SubNetwork } from './sub/consts';

import type { BridgeNetworkParam, BridgeNetworkId, BridgeTransactionData } from './types';
import type { ParachainIds } from './sub/types';

function accountFromJunction(junction: XcmV2Junction | XcmV3Junction): string {
  if (junction.isAccountId32) {
    return junction.asAccountId32.id.toString();
  } else {
    return '';
  }
}

function getAccount(data: BridgeTypesGenericAccount): string {
  if (data.isUnknown) {
    return '';
  }
  if (data.isEvm) {
    return data.asEvm.toString();
  }
  if (data.isSora) {
    return data.asSora.toString();
  }

  const { interior } = data.asParachain.isV3 ? data.asParachain.asV3 : data.asParachain.asV2;

  if (interior.isX1) {
    return accountFromJunction(interior.asX1);
  } else if (interior.isX2) {
    return accountFromJunction(interior.asX2[1]);
  } else {
    return '';
  }
}

function getSubNetworkId(
  data: BridgeTypesGenericAccount,
  parachainIds: ParachainIds,
  usedNetwork: BridgeNetworkId
): BridgeNetworkId {
  // we don't know from where are this tx. For now this will be a used network
  if (data.isUnknown) return usedNetwork;

  const { interior } = data.asParachain.isV3 ? data.asParachain.asV3 : data.asParachain.asV2;

  if (interior.isX2) {
    const networkParam = interior.asX2[0];

    if (networkParam.isParachain) {
      const paraId = networkParam.asParachain.toNumber();

      for (const parachainKey in parachainIds) {
        if (parachainIds[parachainKey] === paraId) {
          return SubNetwork[parachainKey];
        }
      }
    }
  }

  return usedNetwork;
}

function getBlock(data: BridgeTypesGenericTimepoint): number {
  if (data.isEvm) {
    return data.asEvm.toNumber();
  }
  if (data.isSora) {
    return data.asSora.toNumber();
  }
  if (data.isParachain) {
    return data.asParachain.toNumber();
  }

  return 0;
}

function formatBridgeTx(
  hash: string,
  data: Option<BridgeProxyBridgeRequest>,
  networkId: BridgeNetworkId,
  networkType: BridgeNetworkType,
  parachainIds?: ParachainIds
): BridgeTransactionData | null {
  if (!data.isSome) {
    return null;
  }

  const unwrapped = data.unwrap();
  const formatted: BridgeTransactionData = {} as any;
  const isSub = networkType === BridgeNetworkType.Sub;
  const externalNetworkSrc = unwrapped.direction.isInbound ? unwrapped.source : unwrapped.dest;
  const externalNetwork = isSub ? getSubNetworkId(externalNetworkSrc, parachainIds, networkId) : networkId;

  if (externalNetwork !== networkId) return null;

  formatted.externalNetwork = externalNetwork;
  formatted.externalNetworkType = networkType;
  formatted.soraHash = hash;
  formatted.amount = unwrapped.amount.toString();
  formatted.soraAssetAddress = unwrapped.assetId.code.toString();
  formatted.status = unwrapped.status.isFailed
    ? BridgeTxStatus.Failed
    : unwrapped.status.isDone || unwrapped.status.isCommitted
    ? BridgeTxStatus.Done
    : BridgeTxStatus.Pending;
  formatted.startBlock = getBlock(unwrapped.startTimepoint);
  formatted.endBlock = getBlock(unwrapped.endTimepoint);

  if (unwrapped.direction.isInbound) {
    // incoming: network -> SORA
    formatted.externalAccount = getAccount(unwrapped.source);
    formatted.soraAccount = getAccount(unwrapped.dest);
    formatted.direction = BridgeTxDirection.Incoming;
  } else {
    // outgoing: SORA -> network
    formatted.soraAccount = getAccount(unwrapped.source);
    formatted.externalAccount = getAccount(unwrapped.dest);
    formatted.direction = BridgeTxDirection.Outgoing;
  }

  return formatted;
}

/**
 * Get all user transactions from external network
 */
export async function getUserTransactions(
  api: ApiPromise,
  accountAddress: string,
  networkParam: BridgeNetworkParam,
  networkId: BridgeNetworkId,
  networkType: BridgeNetworkType,
  parachainIds?: ParachainIds
): Promise<BridgeTransactionData[]> {
  try {
    const buffer: BridgeTransactionData[] = [];
    const data = await api.query.bridgeProxy.transactions.entries([networkParam, accountAddress]);

    for (const [key, value] of data) {
      const hash = key.args[1];
      const tx = formatBridgeTx(hash.toString(), value, networkId, networkType, parachainIds);

      if (tx) {
        buffer.push(tx);
      }
    }

    return buffer;
  } catch {
    return [];
  }
}

/** Get transaction details */
export async function getTransactionDetails(
  api: ApiPromise,
  accountAddress: string,
  hash: string,
  networkParam: BridgeNetworkParam,
  networkId: BridgeNetworkId,
  networkType: BridgeNetworkType,
  parachainIds?: ParachainIds
): Promise<BridgeTransactionData | null> {
  try {
    const data = await api.query.bridgeProxy.transactions([networkParam, accountAddress], hash);

    return formatBridgeTx(hash, data, networkId, networkType, parachainIds);
  } catch {
    return null;
  }
}

/** Subscribe on transaction details */
export function subscribeOnTransactionDetails(
  apiRx: ApiRx,
  accountAddress: string,
  hash: string,
  networkParam: BridgeNetworkParam,
  networkId: BridgeNetworkId,
  networkType: BridgeNetworkType,
  parachainIds?: ParachainIds
): Observable<BridgeTransactionData | null> | null {
  try {
    return apiRx.query.bridgeProxy
      .transactions([networkParam, accountAddress], hash)
      .pipe(map((value) => formatBridgeTx(hash, value, networkId, networkType, parachainIds)));
  } catch {
    return null;
  }
}

/** Get the amount of the asset locked on the bridge on the SORA side */
export async function getLockedAssets(
  api: ApiPromise,
  networkParam: BridgeNetworkParam,
  assetAddress: string
): Promise<CodecString | null> {
  try {
    const data = await api.query.bridgeProxy.lockedAssets(networkParam, assetAddress);

    return data.toString();
  } catch {
    return null;
  }
}
