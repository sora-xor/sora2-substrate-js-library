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

import { BridgeTxStatus, BridgeTxDirection, BridgeNetworkType } from './consts';

import type { BridgeNetworkParam, BridgeTransactionData } from './types';

function accountFromJunction(junction: XcmV2Junction | XcmV3Junction): string {
  if (junction.isAccountId32) {
    return junction.asAccountId32.id.toString();
  } else {
    return '';
  }
}

function getAccount(data: BridgeTypesGenericAccount): string {
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

function getBlock(data: BridgeTypesGenericTimepoint): number {
  if (data.isEvm) {
    return data.asEvm.toNumber();
  }
  if (data.isSora) {
    return data.asSora.toNumber();
  }

  return 0;
}

function formatBridgeTx(
  hash: string,
  data: Option<BridgeProxyBridgeRequest>,
  networkParam: BridgeNetworkParam,
  networkType: BridgeNetworkType
): BridgeTransactionData | null {
  if (!data.isSome) {
    return null;
  }

  const unwrapped = data.unwrap();
  const formatted: BridgeTransactionData = {} as any;

  formatted.externalNetwork = networkParam[networkType];
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
  network: BridgeNetworkParam,
  networkType: BridgeNetworkType
): Promise<BridgeTransactionData[]> {
  try {
    const buffer: BridgeTransactionData[] = [];
    const data = await api.query.bridgeProxy.transactions.entries([network, accountAddress]);

    for (const [key, value] of data) {
      const hash = key.args[1];
      const tx = formatBridgeTx(hash.toString(), value, network, networkType);

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
  network: BridgeNetworkParam,
  networkType: BridgeNetworkType
): Promise<BridgeTransactionData | null> {
  try {
    const data = await api.query.bridgeProxy.transactions([network, accountAddress], hash);

    return formatBridgeTx(hash, data, network, networkType);
  } catch {
    return null;
  }
}

/** Subscribe on transaction details */
export function subscribeOnTransactionDetails(
  apiRx: ApiRx,
  accountAddress: string,
  hash: string,
  network: BridgeNetworkParam,
  networkType: BridgeNetworkType
): Observable<BridgeTransactionData | null> | null {
  try {
    return apiRx.query.bridgeProxy
      .transactions([network, accountAddress], hash)
      .pipe(map((value) => formatBridgeTx(hash, value, network, networkType)));
  } catch {
    return null;
  }
}
