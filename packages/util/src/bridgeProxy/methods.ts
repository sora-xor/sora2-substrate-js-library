import { map } from 'rxjs';

import type { Observable } from '@polkadot/types/types';
import type { BridgeProxyBridgeRequest } from '@polkadot/types/lookup';
import type { Option } from '@polkadot/types-codec';
import type { ApiPromise, ApiRx } from '@polkadot/api';

import { BridgeTxStatus, BridgeTxDirection } from './consts';

import type { BridgeNetworkParam, BridgeTransactionData } from './types';

function formatBridgeTx(
  hash: string,
  network: BridgeNetworkParam,
  data: Option<BridgeProxyBridgeRequest>
): BridgeTransactionData | null {
  if (!data.isSome) {
    return null;
  }

  const unwrapped = data.unwrap();
  const formatted: BridgeTransactionData = {} as any;

  formatted.externalNetwork = network;
  formatted.soraHash = hash;
  formatted.amount = unwrapped.amount.toString();
  formatted.soraAssetAddress = unwrapped.assetId.code.toString();
  formatted.status = unwrapped.status.isFailed
    ? BridgeTxStatus.Failed
    : unwrapped.status.isDone || unwrapped.status.isCommitted
    ? BridgeTxStatus.Done
    : BridgeTxStatus.Pending;
  formatted.startBlock = unwrapped.startTimepoint.toNumber();
  formatted.endBlock = unwrapped.endTimepoint.toNumber();

  if (unwrapped.direction.isInbound) {
    // incoming: network -> SORA
    formatted.externalAccount = unwrapped.source.toString();
    formatted.soraAccount = unwrapped.dest.toString();
    formatted.direction = BridgeTxDirection.Incoming;
  } else {
    // outgoing: SORA -> network
    formatted.soraAccount = unwrapped.source.toString();
    formatted.externalAccount = unwrapped.dest.toString();
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
  network: BridgeNetworkParam
): Promise<BridgeTransactionData[]> {
  try {
    const buffer: BridgeTransactionData[] = [];
    const data = await api.query.bridgeProxy.transactions.entries([network, accountAddress]);

    for (const [key, value] of data) {
      const hash = key.args[1];
      const tx = formatBridgeTx(hash.toString(), network, value);

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
  network: BridgeNetworkParam,
  hash: string
): Promise<BridgeTransactionData | null> {
  try {
    const data = await api.query.bridgeProxy.transactions([network, accountAddress], hash);

    return formatBridgeTx(hash, network, data);
  } catch {
    return null;
  }
}

/** Subscribe on transaction details */
export function subscribeOnTransactionDetails(
  apiRx: ApiRx,
  accountAddress: string,
  network: BridgeNetworkParam,
  hash: string
): Observable<BridgeTransactionData | null> | null {
  try {
    return apiRx.query.bridgeProxy
      .transactions([network, accountAddress], hash)
      .pipe(map((value) => formatBridgeTx(hash, network, value)));
  } catch {
    return null;
  }
}
