import { map } from 'rxjs';
import { FPNumber } from '@sora-substrate/math';
import type { Observable } from '@polkadot/types/types';
import type { EvmBridgeProxyBridgeRequest } from '@polkadot/types/lookup';
import type { Option } from '@polkadot/types-codec';

import { BaseApi, isEvmOperation, Operation } from '../BaseApi';
import { Asset } from '../assets/types';
import { EvmDirection, EvmTxStatus } from './consts';
import type { EvmAsset, EvmNetwork, EvmHistory, EvmTransaction } from './types';

function formatEvmTx(hash: string, data: Option<EvmBridgeProxyBridgeRequest>): EvmTransaction | null {
  if (!data.isSome) {
    return null;
  }

  const unwrapped = data.unwrap();
  const formatted: EvmTransaction = {} as any;

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

  /**
   * Get registered assets object for selected evm network.
   * Should be called after switching evm network `api.evm.externalNetwork = EvmNetwork.Mordor`
   *
   * Format:
   *
   * `{ [key: SoraAssetId]: { contract: string; evmAddress: string; } }`
   */
  public async getNetworkAssets(externalNetwork: EvmNetwork): Promise<Record<string, EvmAsset>> {
    const assetsMap: Record<string, EvmAsset> = {};
    // TODO: NetworkId will be fixed on backend. We should update type and remove this line below
    const networkId = externalNetwork.toString(16);

    const result = await (this.api.rpc as any).evmBridgeProxy.listAppsWithSupportedAssets(networkId);

    result.forEach((app) => {
      app.supportedAssets.forEach((assetId) => {
        assetsMap[assetId.toString()] = {
          contract: app.address.toString(),
          evmAddress: '', // Here will be evm address after backend updates
        };
      });
    });

    return assetsMap;
  }

  public async burn(
    externalNetwork: EvmNetwork,
    asset: Asset,
    recipient: string,
    amount: string | number,
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
      this.api.tx.evmBridgeProxy.burn(String(externalNetwork), asset.address, recipient, value),
      this.account.pair,
      historyItem
    );
  }

  /**
   * Get all user transactions hashes, WHERE
   *
   * **first** array item represents the **last** transaction
   */
  // public async getUserTxHashes(externalNetwork: EvmNetwork, accountAddress: string): Promise<Array<string>> {
  //   assert(this.account, Messages.connectWallet);

  //   const data = await this.api.query.evmBridgeProxy.transactions(accountAddress, [String(externalNetwork)]);

  //   return data.map((value) => value.toString()).reverse();
  // }

  /**
   * Subscribe on user transactions hashes.
   *
   * **First** array item represents the **last** transaction
   */
  // public subscribeOnUserTxHashes(externalNetwork: EvmNetwork, accountAddress: string): Observable<Array<string>> {
  //   return (this.apiRx.query as any).evmBridgeProxy
  //     .userTransactions(externalNetwork, accountAddress)
  //     .pipe(map((items) => (items as any).map((value) => value.toString()).reverse()));
  // }

  /** Get transaction details */
  public async getTxDetails(
    accountAddress: string,
    externalNetwork: EvmNetwork,
    hash: string
  ): Promise<EvmTransaction | null> {
    const data = await this.api.query.evmBridgeProxy.transactions(accountAddress, [String(externalNetwork), hash]);

    return formatEvmTx(hash, data);
  }

  /** Subscribe on transaction details */
  public subscribeOnTxDetails(
    accountAddress: string,
    externalNetwork: EvmNetwork,
    hash: string
  ): Observable<EvmTransaction | null> {
    return this.apiRx.query.evmBridgeProxy
      .transactions(accountAddress, [String(externalNetwork), hash])
      .pipe(map((value) => formatEvmTx(hash, value as any)));
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
    const params = hashes.map((hash) => [accountAddress, [String(externalNetwork), hash]]);
    const data = await this.api.query.evmBridgeProxy.transactions.multi(params);

    return data.map((item, index) => formatEvmTx(hashes[index], item)).filter((item) => !!item);
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
  ): Observable<Array<EvmTransaction>> {
    const params = hashes.map((hash) => [accountAddress, [String(externalNetwork), hash]]);
    return this.apiRx.query.evmBridgeProxy.transactions
      .multi(params)
      .pipe(map((value) => value.map((item, index) => formatEvmTx(hashes[index], item)).filter((item) => !!item)));
  }
}
