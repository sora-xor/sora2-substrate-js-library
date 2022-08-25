import { map, Subject } from 'rxjs';
import { assert } from '@polkadot/util';
import type { Subscription } from 'rxjs';
import type { EventRecord } from '@polkadot/types/interfaces/system';
import type { Observable } from '@polkadot/types/types';
import type { GenericExtrinsic } from '@polkadot/types';
import type { u32, Vec } from '@polkadot/types-codec';
import type { AnyTuple } from '@polkadot/types-codec/types';
import type { EvmBridgeProxyBridgeRequest, FrameSystemEventRecord } from '@polkadot/types/lookup';
import type { Option } from '@polkadot/types-codec';

import type { Api } from '../api';
import { BaseApi, isBridgeOperation, Operation } from '../BaseApi';
import { Asset } from '../assets/types';
import { CodecString, FPNumber } from '@sora-substrate/math';
import { XOR } from '../assets/consts';
import { Messages } from '../logger';
import { BridgeDirection } from '../BridgeApi';
import type { History } from '../BaseApi';

export enum EvmNetwork {
  Mordor = 63,
}

export enum EvmDirection {
  Outgoing = 'Outgoing',
  Incoming = 'Incoming',
}

export enum EvmTxStatus {
  Done = 'Done',
  Failed = 'Failed',
  Pending = 'Pending',
}

/** Made like BridgeRequest */
export interface EvmTransaction {
  /** Outgoing = 0, Incoming = 1 */
  direction: EvmDirection;
  /** SORA Account ID */
  from: string;
  /** EVM Account ID */
  to: string;
  soraAssetAddress: string;
  status: EvmTxStatus;
  hash: string;
  amount: CodecString;
}

export interface EvmHistory extends History {
  type: Operation.EvmIncoming | Operation.EvmOutgoing;
  hash?: string;
  transactionState?: EvmTxStatus;
  externalNetwork?: EvmNetwork;
}

function formatEvmTx(hash: string, data: Option<EvmBridgeProxyBridgeRequest>): EvmTransaction | null {
  if (!data.isSome) {
    return null;
  }
  const unwrapped = data.unwrap();

  const formatted: EvmTransaction = {} as any;
  formatted.hash = hash;
  if (unwrapped.isIncomingTransfer) {
    const incoming = unwrapped.asIncomingTransfer;
    formatted.from = incoming.source.toString();
    formatted.to = incoming.dest.toString();
    formatted.amount = incoming.amount.toString();
    formatted.soraAssetAddress = incoming.assetId.code.toString();
    formatted.status = incoming.status.isFailed
      ? EvmTxStatus.Failed
      : incoming.status.isDone || incoming.status.isCommitted
      ? EvmTxStatus.Done
      : EvmTxStatus.Pending;
    formatted.direction = EvmDirection.Incoming;
  } else {
    // outgoing
    const outgoing = unwrapped.asOutgoingTransfer;
    formatted.from = outgoing.source.toString();
    formatted.to = outgoing.dest.toString();
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
    if (!(history && history.id && isBridgeOperation(history.type))) {
      return;
    }
    super.saveHistory(history);
  }

  public async getNetworkAssets(): Promise<Record<string, string>> {
    const assetsMap: Record<string, string> = {};
    const native = await this.api.query.ethApp.addresses(this.externalNetwork);
    if (native.isSome) {
      const asset = native.unwrap();
      assetsMap[asset[1].code.toString()] = asset[0].toString();
    }
    const erc20 = await this.api.query.erc20App.assetsByAddresses.entries(this.externalNetwork);
    erc20.forEach(([evm, assetId]) => {
      if (assetId.isSome) {
        assetsMap[assetId.unwrap().code.toString()] = evm.args[1].toString();
      }
    });
    return assetsMap;
  }

  /** TODO: Move it to BaseApi */
  public async getNetworkFee(): Promise<CodecString> {
    const mockAccountAddress = 'cnRuw2R6EVgQW3e4h8XeiFym2iU17fNsms15zRGcg9YEJndAs';
    const res = await this.api.tx.evmBridgeProxy.burn(0, '', '', 0).paymentInfo(mockAccountAddress);
    return new FPNumber(res.partialFee, XOR.decimals).toCodecString();
  }

  public async burn(asset: Asset, recipient: string, amount: string): Promise<void> {
    // asset should be checked as registered on bridge or not
    await this.submitExtrinsic(
      this.api.tx.evmBridgeProxy.burn(this.externalNetwork, asset.address, recipient, amount),
      this.account.pair,
      {
        type: Operation.EthBridgeOutgoing,
        symbol: asset.symbol,
        assetAddress: asset.address,
        amount: `${amount}`,
      }
    );
  }

  public async getUserTxHashes(): Promise<Array<string>> {
    assert(this.account, Messages.connectWallet);

    const data = await this.api.query.evmBridgeProxy.userTransactions(this.externalNetwork, this.account.pair.address);

    return data as unknown as Array<string>;
  }

  public subscribeOnUserTxHashes(): Observable<Array<string>> {
    assert(this.account, Messages.connectWallet);

    return this.apiRx.query.evmBridgeProxy.userTransactions(
      this.externalNetwork,
      this.account.pair.address
    ) as unknown as Observable<string[]>;
  }

  public async getTxDetails(hash: string): Promise<EvmTransaction | null> {
    const data = await this.api.query.evmBridgeProxy.transactions(this.externalNetwork, hash);

    return formatEvmTx(hash, data);
  }

  public subscribeOnTxDetails(hash: string): Observable<EvmTransaction | null> {
    return this.apiRx.query.evmBridgeProxy
      .transactions(this.externalNetwork, hash)
      .pipe(map((value) => formatEvmTx(hash, value)));
  }
}
