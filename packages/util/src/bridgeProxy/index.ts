import { map } from 'rxjs';
import { FPNumber } from '@sora-substrate/math';
import type { Observable } from '@polkadot/types/types';
import type { BridgeProxyBridgeRequest } from '@polkadot/types/lookup';
import type { Option } from '@polkadot/types-codec';
import type { ApiPromise, ApiRx } from '@polkadot/api';

import { BaseApi, isEvmOperation, Operation } from '../BaseApi';
import { Asset } from '../assets/types';
import { BridgeDirection, EvmTxStatus, SubNetwork, BridgeTypeNetwork, BridgeTypeAccount } from './consts';
import type { Api } from '../api';
import type {
  EvmAsset,
  EvmNetwork,
  EvmHistory,
  BridgeTransactionData,
  SupportedApps,
  BridgeNetworkParam,
} from './types';

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
    ? EvmTxStatus.Failed
    : unwrapped.status.isDone || unwrapped.status.isCommitted
    ? EvmTxStatus.Done
    : EvmTxStatus.Pending;
  formatted.startBlock = unwrapped.startTimepoint.toNumber();
  formatted.endBlock = unwrapped.endTimepoint.toNumber();

  if (unwrapped.direction.isInbound) {
    // incoming: network -> SORA
    formatted.externalAccount = unwrapped.source.toString();
    formatted.soraAccount = unwrapped.dest.toString();
    formatted.direction = BridgeDirection.Incoming;
  } else {
    // outgoing: SORA -> network
    formatted.soraAccount = unwrapped.source.toString();
    formatted.externalAccount = unwrapped.dest.toString();
    formatted.direction = BridgeDirection.Outgoing;
  }

  return formatted;
}

/**
 * Get all user transactions from external network
 */
async function getUserTransactions(
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
async function getTransactionDetails(
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
function subscribeOnTransactionDetails(
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

class EvmBridgeApi<T> extends BaseApi<T> {
  constructor() {
    super('evmHistory');
  }

  public generateHistoryItem(params: EvmHistory): EvmHistory | null {
    if (!params.type) {
      return null;
    }
    const historyItem = (params || {}) as EvmHistory;
    historyItem.startTime = historyItem.startTime || Date.now();
    historyItem.id = this.encrypt(`${historyItem.startTime}`);
    historyItem.transactionState = historyItem.transactionState || EvmTxStatus.Pending;
    this.saveHistory(historyItem);
    return historyItem;
  }

  public saveHistory(history: EvmHistory): void {
    if (!isEvmOperation(history.type)) return;
    super.saveHistory(history);
  }

  public async getRegisteredAssets(evmNetwork: EvmNetwork): Promise<Record<string, EvmAsset>> {
    const assets = {};

    try {
      const data = await this.api.rpc.bridgeProxy.listAssets({ [BridgeTypeNetwork.Evm]: evmNetwork });

      data.forEach((assetData) => {
        const assetInfo = assetData.asEvm;
        const soraAddress = assetInfo.assetId.toString();
        const evmAddress = assetInfo.evmAddress.toString();
        const appKind = assetInfo.appKind.toString();
        const decimals = assetInfo.precision.toNumber();

        assets[soraAddress] = {
          address: evmAddress,
          appKind,
          decimals,
        };
      });

      return assets;
    } catch {
      return assets;
    }
  }

  public async getUserTransactions(accountAddress: string, evmNetwork: EvmNetwork) {
    return await getUserTransactions(this.api, accountAddress, { [BridgeTypeNetwork.Evm]: evmNetwork });
  }

  public async getTransactionDetails(accountAddress: string, evmNetwork: EvmNetwork, hash: string) {
    return await getTransactionDetails(this.api, accountAddress, { [BridgeTypeNetwork.Evm]: evmNetwork }, hash);
  }

  public subscribeOnTransactionDetails(accountAddress: string, evmNetwork: EvmNetwork, hash: string) {
    return subscribeOnTransactionDetails(this.apiRx, accountAddress, { [BridgeTypeNetwork.Evm]: evmNetwork }, hash);
  }

  public async transfer(
    asset: Asset,
    recipient: string,
    amount: string | number,
    externalNetwork: EvmNetwork,
    historyId?: string
  ): Promise<void> {
    // asset should be checked as registered on bridge or not
    const value = new FPNumber(amount, asset.decimals).toCodecString();
    const historyItem = this.getHistory(historyId) || {
      type: Operation.EvmOutgoing,
      symbol: asset.symbol,
      assetAddress: asset.address,
      amount: `${amount}`,
    };

    await this.submitExtrinsic(
      this.api.tx.bridgeProxy.burn(
        { [BridgeTypeNetwork.Evm]: externalNetwork },
        asset.address,
        { [BridgeTypeAccount.Evm]: recipient },
        value
      ),
      this.account.pair,
      historyItem
    );
  }
}

export class BridgeProxyModule<T> {
  constructor(private readonly root: Api<T>) {}

  public readonly evm = new EvmBridgeApi<T>();

  public async getListApps(): Promise<SupportedApps> {
    const apps: SupportedApps = {
      [BridgeTypeNetwork.EvmLegacy]: {},
      [BridgeTypeNetwork.Evm]: {},
      [BridgeTypeNetwork.Sub]: [],
    };

    try {
      const data = await this.root.api.rpc.bridgeProxy.listApps();

      data.forEach((appInfo) => {
        if (appInfo.isEvm) {
          const [genericNetworkId, evmAppInfo] = appInfo.asEvm;
          const id = genericNetworkId.asEvm.toNumber();
          const type = genericNetworkId.isEvmLegacy ? BridgeTypeNetwork.EvmLegacy : BridgeTypeNetwork.Evm;
          const kind = evmAppInfo.appKind.toString();
          const address = evmAppInfo.evmAddress.toString();

          if (!apps[type][id]) apps[type][id] = {};

          apps[type][id][kind] = address;
        } else {
          const genericNetworkId = appInfo.asSub;
          const type = BridgeTypeNetwork.Sub;
          const subNetwork = genericNetworkId.asSub;
          const name = subNetwork.toString();

          // adding networks we work through parachains
          if (subNetwork.isRococo) {
            apps[type].push(SubNetwork.Karura);
          }

          apps[type].push(name as SubNetwork);
        }
      });

      return apps;
    } catch {
      return apps;
    }
  }
}
