import { map } from 'rxjs';
import { assert } from '@polkadot/util';
import { CodecString, FPNumber } from '@sora-substrate/math';
import type { Observable } from '@polkadot/types/types';
import type { EvmBridgeProxyBridgeRequest } from '@polkadot/types/lookup';
import type { Option } from '@polkadot/types-codec';

import { BaseApi, isEvmOperation, Operation } from '../BaseApi';
import { Asset } from '../assets/types';
import { XOR } from '../assets/consts';
import { Messages } from '../logger';
import { EvmDirection, EvmNetwork, EvmTxStatus } from './consts';
import type { EvmAsset, EvmHistory, EvmTransaction } from './types';

function formatEvmTx(hash: string, data: Option<EvmBridgeProxyBridgeRequest>): EvmTransaction | null {
  if (!data.isSome) {
    return null;
  }
  const unwrapped = data.unwrap();

  const formatted: EvmTransaction = {} as any;
  formatted.soraHash = hash;
  if (unwrapped.isIncomingTransfer) {
    // incoming: EVM -> SORA
    const incoming = unwrapped.asIncomingTransfer;
    formatted.evmAccount = incoming.source.toString();
    formatted.soraAccount = incoming.dest.toString();
    formatted.amount = incoming.amount.toString();
    formatted.soraAssetAddress = incoming.assetId.code.toString();
    formatted.status = incoming.status.isFailed
      ? EvmTxStatus.Failed
      : incoming.status.isDone || incoming.status.isCommitted
      ? EvmTxStatus.Done
      : EvmTxStatus.Pending;
    formatted.direction = EvmDirection.Incoming;
  } else {
    // outgoing: SORA -> EVM
    const outgoing = unwrapped.asOutgoingTransfer;
    formatted.soraAccount = outgoing.source.toString();
    formatted.evmAccount = outgoing.dest.toString();
    formatted.amount = outgoing.amount.toString();
    formatted.soraAssetAddress = outgoing.assetId.code.toString();
    formatted.status = outgoing.status.isFailed
      ? EvmTxStatus.Failed
      : outgoing.status.isDone || outgoing.status.isCommitted
      ? EvmTxStatus.Done
      : EvmTxStatus.Pending;
    formatted.direction = EvmDirection.Outgoing;
  }

  return formatted;
}

export class EvmApi extends BaseApi {
  private _externalNetwork: EvmNetwork = EvmNetwork.Mordor;

  constructor() {
    super('evmHistory');
  }

  public get externalNetwork(): EvmNetwork {
    return this._externalNetwork;
  }

  public set externalNetwork(value: EvmNetwork | number) {
    this._externalNetwork = value;
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
  public async getNetworkAssets(): Promise<Record<string, EvmAsset>> {
    const assetsMap: Record<string, EvmAsset> = {};
    // TODO: NetworkId will be fixed on backend. We should update type and remove this line below
    const networkId = this.externalNetwork.toString(16);

    const result = await this.api.rpc.evmBridgeProxy.listAppsWithSupportedAssets(networkId);

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

  /** TODO: Move it to BaseApi */
  public async getNetworkFee(): Promise<CodecString> {
    const mockAccountAddress = 'cnRuw2R6EVgQW3e4h8XeiFym2iU17fNsms15zRGcg9YEJndAs';
    const res = await this.api.tx.evmBridgeProxy.burn(0, '', '', 0).paymentInfo(mockAccountAddress);
    return new FPNumber(res.partialFee, XOR.decimals).toCodecString();
  }

  public async burn(asset: Asset, recipient: string, amount: string | number): Promise<void> {
    // asset should be checked as registered on bridge or not
    const fpAmount = new FPNumber(amount, asset.decimals);
    await this.submitExtrinsic(
      this.api.tx.evmBridgeProxy.burn(this.externalNetwork, asset.address, recipient, fpAmount.toCodecString()),
      this.account.pair,
      {
        type: Operation.EvmOutgoing,
        symbol: asset.symbol,
        assetAddress: asset.address,
        amount: `${amount}`,
      }
    );
  }

  /**
   * Get all user transactions hashes, WHERE
   *
   * **first** array item represents the **last** transaction
   */
  public async getUserTxHashes(): Promise<Array<string>> {
    assert(this.account, Messages.connectWallet);

    const data = await this.api.query.evmBridgeProxy.userTransactions(this.externalNetwork, this.account.pair.address);

    return data.map((value) => value.toString()).reverse();
  }

  /**
   * Subscribe on user transactions hashes.
   *
   * **First** array item represents the **last** transaction
   */
  public subscribeOnUserTxHashes(): Observable<Array<string>> {
    assert(this.account, Messages.connectWallet);

    return this.apiRx.query.evmBridgeProxy
      .userTransactions(this.externalNetwork, this.account.pair.address)
      .pipe(map((items) => items.map((value) => value.toString()).reverse()));
  }

  /** Get transaction details */
  public async getTxDetails(hash: string): Promise<EvmTransaction | null> {
    const data = await this.api.query.evmBridgeProxy.transactions(this.externalNetwork, hash);

    return formatEvmTx(hash, data);
  }

  /** Subscribe on transaction details */
  public subscribeOnTxDetails(hash: string): Observable<EvmTransaction | null> {
    return this.apiRx.query.evmBridgeProxy
      .transactions(this.externalNetwork, hash)
      .pipe(map((value) => formatEvmTx(hash, value)));
  }

  /**
   * Get transactions details.
   *
   * This method might be used for pageable items
   */
  public async getTxsDetails(hashes: Array<string>): Promise<Array<EvmTransaction>> {
    const params = hashes.map((hash) => [this.externalNetwork, hash]);
    const data = await this.api.query.evmBridgeProxy.transactions.multi(params);

    return data.map((item, index) => formatEvmTx(hashes[index], item)).filter((item) => !!item);
  }

  /**
   * Subscribe on transactions details.
   *
   * This method might be used for pageable items
   */
  public subscribeOnTxsDetails(hashes: Array<string>): Observable<Array<EvmTransaction>> {
    const params = hashes.map((hash) => [this.externalNetwork, hash]);
    return this.apiRx.query.evmBridgeProxy.transactions
      .multi(params)
      .pipe(map((value) => value.map((item, index) => formatEvmTx(hashes[index], item)).filter((item) => !!item)));
  }
}
