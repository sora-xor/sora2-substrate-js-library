import { map } from 'rxjs';
import { FPNumber } from '@sora-substrate/math';
import type { Observable } from '@polkadot/types/types';
import type { EvmBridgeProxyBridgeRequest } from '@polkadot/types/lookup';
import type { Option } from '@polkadot/types-codec';

import { BaseApi, isEvmOperation, Operation } from '../BaseApi';
import { Asset } from '../assets/types';
import { EvmDirection, EvmTxStatus, SubNetworkId, BridgeTypeNetwork, BridgeTypeAccount } from './consts';
import type { EvmAsset, EvmNetwork, EvmHistory, EvmTransaction } from './types';

function formatEvmTx(
  hash: string,
  externalNetwork: EvmNetwork,
  data: Option<EvmBridgeProxyBridgeRequest>
): EvmTransaction | null {
  if (!data.isSome) {
    return null;
  }

  const unwrapped = data.unwrap();
  const formatted: EvmTransaction = {} as any;

  formatted.externalNetwork = externalNetwork;
  formatted.soraHash = hash;
  formatted.amount = unwrapped.amount.toString();
  formatted.soraAssetAddress = unwrapped.assetId.code.toString();
  formatted.status = unwrapped.status.isFailed
    ? EvmTxStatus.Failed
    : unwrapped.status.isDone || unwrapped.status.isCommitted
    ? EvmTxStatus.Done
    : EvmTxStatus.Pending;

  if (unwrapped.direction.isInbound) {
    // incoming: EVM -> SORA
    formatted.evmAccount = unwrapped.source.toString();
    formatted.soraAccount = unwrapped.dest.toString();
    formatted.direction = EvmDirection.Incoming;
  } else {
    // outgoing: SORA -> EVM
    formatted.soraAccount = unwrapped.source.toString();
    formatted.evmAccount = unwrapped.dest.toString();
    formatted.direction = EvmDirection.Outgoing;
  }

  return formatted;
}

export class EvmApi<T> extends BaseApi<T> {
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
    if (!(history && history.id && isEvmOperation(history.type))) {
      return;
    }
    super.saveHistory(history);
  }

  public async getAvailableNetworks(): Promise<number[]> {
    try {
      const keys = await this.api.query.ethereumLightClient.networkConfig.keys();

      return keys.map((key) => {
        const id = key.args[0];

        return new FPNumber(id).toNumber();
      });
    } catch {
      return [];
    }
  }

  /**
   * Get registered assets object for selected evm network.
   * Should be called after switching evm network
   *
   * Format:
   *
   * `{ [key: SoraAssetId]: { contract: string; evmAddress: string; } }`
   */
  public async getNetworkAssets(externalNetwork: EvmNetwork): Promise<Record<string, EvmAsset>> {
    try {
      const appsMap: Record<string, string> = {};
      const assetsMap: Record<string, EvmAsset> = {};

      const list = await this.api.rpc.evmBridgeProxy.listAppsWithSupportedAssets(externalNetwork);

      list.apps.forEach((app) => {
        appsMap[app.appKind.toString()] = app.evmAddress.toString();
      });

      list.assets.forEach((asset) => {
        assetsMap[asset.assetId.toString()] = {
          contract: appsMap[asset.appKind.toString()],
          evmAddress: asset.evmAddress.toString(),
        };
      });

      return assetsMap;
    } catch {
      return {};
    }
  }

  public async transferToEvm(
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
      this.api.tx.evmBridgeProxy.burn(
        { [BridgeTypeNetwork.Evm]: externalNetwork },
        asset.address,
        { [BridgeTypeAccount.Evm]: recipient },
        value
      ),
      this.account.pair,
      historyItem
    );
  }

  public async transferToSubstrate(
    asset: Asset,
    recipient: string,
    amount: string | number,
    externalNetwork: SubNetworkId,
    historyId?: string
  ): Promise<void> {
    // asset should be checked as registered on bridge or not
    const value = new FPNumber(amount, asset.decimals).toCodecString();
    const historyItem = this.getHistory(historyId) || {
      type: Operation.SubstrateOutgoing,
      symbol: asset.symbol,
      assetAddress: asset.address,
      amount: `${amount}`,
    };

    await this.submitExtrinsic(
      this.api.tx.evmBridgeProxy.burn(
        { [BridgeTypeNetwork.Sub]: externalNetwork },
        asset.address,
        { [BridgeTypeAccount.Parachain]: recipient },
        value
      ),
      this.account.pair,
      historyItem
    );
  }

  /**
   * Get all user transactions from external network
   */
  public async getUserTxs(accountAddress: string, externalNetwork: EvmNetwork): Promise<EvmTransaction[]> {
    try {
      const buffer: EvmTransaction[] = [];
      const data = await this.api.query.evmBridgeProxy.transactions.entries(accountAddress);

      for (const [key, value] of data) {
        const [network, hash] = key.args[1];

        if (!network.isEvm) continue;

        const evmNetwork = network.asEvm.toNumber();

        if (evmNetwork === externalNetwork) {
          const tx = formatEvmTx(hash.toString(), evmNetwork, value);

          if (tx) {
            buffer.push(tx);
          }
        }
      }

      return buffer;
    } catch {
      return [];
    }
  }

  /** Get transaction details */
  public async getTxDetails(
    accountAddress: string,
    externalNetwork: EvmNetwork,
    hash: string
  ): Promise<EvmTransaction | null> {
    try {
      const data = await this.api.query.evmBridgeProxy.transactions(accountAddress, [{ EVM: externalNetwork }, hash]);

      return formatEvmTx(hash, externalNetwork, data);
    } catch {
      return null;
    }
  }

  /** Subscribe on transaction details */
  public subscribeOnTxDetails(
    accountAddress: string,
    externalNetwork: EvmNetwork,
    hash: string
  ): Observable<EvmTransaction | null> | null {
    try {
      return this.apiRx.query.evmBridgeProxy
        .transactions(accountAddress, [{ EVM: externalNetwork }, hash])
        .pipe(map((value) => formatEvmTx(hash, externalNetwork, value as any)));
    } catch {
      return null;
    }
  }

  /**
   * Get transactions details.
   *
   * This method might be used for pageable items
   */
  public async getTxsDetails(
    accountAddress: string,
    externalNetwork: EvmNetwork,
    hashes: Array<string>
  ): Promise<Array<EvmTransaction>> {
    try {
      const params = hashes.map((hash) => [accountAddress, [{ EVM: externalNetwork }, hash]]);
      const data = await this.api.query.evmBridgeProxy.transactions.multi(params);

      return data.map((item, index) => formatEvmTx(hashes[index], externalNetwork, item)).filter((item) => !!item);
    } catch {
      return [];
    }
  }

  /**
   * Subscribe on transactions details.
   *
   * This method might be used for pageable items
   */
  public subscribeOnTxsDetails(
    accountAddress: string,
    externalNetwork: EvmNetwork,
    hashes: Array<string>
  ): Observable<EvmTransaction[]> | null {
    try {
      const params = hashes.map((hash) => [accountAddress, [{ EVM: externalNetwork }, hash]]);
      return this.apiRx.query.evmBridgeProxy.transactions
        .multi(params)
        .pipe(
          map((value) =>
            value.map((item, index) => formatEvmTx(hashes[index], externalNetwork, item)).filter((item) => !!item)
          )
        );
    } catch {
      return null;
    }
  }
}
