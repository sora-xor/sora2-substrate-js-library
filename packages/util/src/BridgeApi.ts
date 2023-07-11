import first from 'lodash/fp/first';
import { assert } from '@polkadot/util';
import { map, combineLatest } from 'rxjs';
import { FPNumber } from '@sora-substrate/math';
import type { CodecString } from '@sora-substrate/math';
import type { Observable } from '@polkadot/types/types';
import type { Vec, Result } from '@polkadot/types';
import type { OffchainRequest, OutgoingRequestEncoded, RequestStatus, SignatureParams } from '@sora-substrate/types';
import type { EthBridgeRequestsOffchainRequest, CommonPrimitivesAssetId32 } from '@polkadot/types/lookup';

import { BaseApi, Operation, isBridgeOperation } from './BaseApi';
import { Messages } from './logger';
import type { Asset } from './assets/types';
import type { History } from './BaseApi';
import type { BridgeNetworkType } from './bridgeProxy/consts';

function assertRequest(result: Result<any, any>, message: string): void {
  if (!result.isOk) {
    // Throws error
    const err = result.asErr.toString();
    console.error(`[${message}]:`, err);
    throw err;
  }
}

export type EvmLegacyAsset = {
  address: string;
  decimals: number | undefined;
  assetKind: BridgeRequestAssetKind;
};

export interface BridgeHistory extends History {
  type: Operation.EthBridgeIncoming | Operation.EthBridgeOutgoing;
  hash?: string;
  transactionState?: string;
  externalBlockId?: string;
  externalBlockHeight?: number;
  externalHash?: string;
  externalNetworkFee?: CodecString;
  externalNetwork?: number;
  externalNetworkType?: BridgeNetworkType;
}

export enum BridgeNetworks {
  ETH_NETWORK_ID = 0,
}

/**
 * Direction of transfer through the bridge.
 * Outgoing: SORA -> Eth,
 * Incoming: Eth -> SORA
 */
export enum BridgeTxDirection {
  Outgoing = 'Outgoing',
  Incoming = 'Incoming',
  LoadIncoming = 'LoadIncoming',
}

export enum BridgeTxStatus {
  Ready = 'ApprovalsReady',
  Pending = 'Pending',
  /** CancelOutgoingRequest */
  Frozen = 'Frozen',
  Failed = 'Failed',
  Done = 'Done',
}

/**
 * Type of currency for approval request next steps
 */
export enum BridgeCurrencyType {
  /** For `receiveBySidechainAssetId` */
  AssetId = 'AssetId',
  /** For `receievByEthereumAssetAddress` */
  TokenAddress = 'TokenAddress',
}

export enum BridgeRequestAssetKind {
  Sidechain = 'Sidechain',
  SidechainOwned = 'SidechainOwned',
  Thischain = 'Thischain',
}

/**
 * Type of request which we will wait
 */
export enum RequestType {
  Transfer = 'Transfer',
  TransferXOR = 'TransferXOR',
  AddAsset = 'AddAsset',
  AddPeer = 'AddPeer',
  RemovePeer = 'RemovePeer',
  ClaimPswap = 'ClaimPswap',
  CancelOutgoingRequest = 'CancelOutgoingRequest',
  MarkAsDone = 'MarkAsDone',
}

export interface BridgeRequest {
  direction: BridgeTxDirection;
  from?: string;
  to?: string;
  soraAssetAddress?: string;
  status: BridgeTxStatus;
  hash: string;
  amount?: string;
  kind?: RequestType | any; // For incoming TXs TODO: check type
}

/** Outgoing transfers */
export interface BridgeApprovedRequest {
  currencyType: BridgeCurrencyType;
  /** [DEPRECATED] Amount is not used and will be removed */
  amount: CodecString;
  from: string;
  to: string;
  hash: string;
  r: Array<string>;
  s: Array<string>;
  v: Array<number>;
}

/**
 * Bridge api implementation.
 *
 * **Transfer SORA → Ethereum common part**
 *
 * (*) Let's imagine that we have registered assets.
 * 1. `getRegisteredAssets`
 * 2. `getTransferToEthFee`
 * 3. `transferToEth`. As a result we'll get history object with hash in local storage
 * 4. `getApprovedRequest`
 * 5. Run function from ethereum smart contract and wait for success
 * 6. `markAsDone`. It will be an extrinsic just for history statuses
 */
export class BridgeApi<T> extends BaseApi<T> {
  private externalNetwork: BridgeNetworks = BridgeNetworks.ETH_NETWORK_ID;

  constructor() {
    super('ethBridgeHistory');
  }

  public initAccountStorage(): void {
    super.initAccountStorage();
    // 1.18 migration
    // "bridgeHistory" -> "ethBridgeHistory"
    // "bridgeHistorySyncTimestamp" -> "ethBridgeHistorySyncTimestamp"
    this.accountStorage?.remove('bridgeHistory');
    this.accountStorage?.remove('bridgeHistorySyncTimestamp');
  }

  public generateHistoryItem(params: BridgeHistory): BridgeHistory | null {
    if (!params.type) {
      return null;
    }
    const historyItem = (params || {}) as BridgeHistory;
    historyItem.startTime = historyItem.startTime || Date.now();
    historyItem.id = this.encrypt(`${historyItem.startTime}`);
    historyItem.transactionState = historyItem.transactionState || 'INITIAL';
    this.saveHistory(historyItem);
    return historyItem;
  }

  public saveHistory(history: BridgeHistory): void {
    if (!(history && history.id && isBridgeOperation(history.type))) {
      return;
    }
    super.saveHistory(history);
  }

  /**
   * Transfer through the bridge operation
   * @param asset Asset
   * @param to Ethereum account address
   * @param amount
   * @param historyId not required
   */
  public transferToEth(asset: Asset, to: string, amount: string | number, historyId?: string): Promise<T> {
    assert(this.account, Messages.connectWallet);

    const balance = new FPNumber(amount, asset.decimals).toCodecString();
    const historyItem = this.getHistory(historyId);

    return this.submitExtrinsic(
      this.api.tx.ethBridge.transferToSidechain(asset.address, to, balance, this.externalNetwork),
      this.account.pair,
      historyItem || {
        symbol: asset.symbol,
        assetAddress: asset.address,
        amount: `${amount}`,
        type: Operation.EthBridgeOutgoing,
      }
    );
  }

  /**
   * Get registered assets for bridge
   * @returns Array with all registered assets
   */
  public async getRegisteredAssets(): Promise<Record<string, EvmLegacyAsset>> {
    const data = await this.api.rpc.ethBridge.getRegisteredAssets(this.externalNetwork);

    if (!data.isOk) {
      // Returns an empty list and logs issue
      console.warn('[api.bridge.getRegisteredAssets]:', data.asErr.toString());
      return {};
    }

    return data.asOk.reduce((buffer, [kind, soraAsset, externalAsset]) => {
      const assetKind = kind.toString() as BridgeRequestAssetKind;
      const soraAssetId = soraAsset[0].toString();

      let externalAddress = '';
      let externalDecimals = undefined;

      if (externalAsset.isSome) {
        const [externalAssetId, externalAssetDecimals] = externalAsset.unwrap();
        externalAddress = externalAssetId.toString();
        externalDecimals = externalAssetDecimals.toNumber();
      }

      buffer[soraAssetId] = {
        address: externalAddress,
        decimals: externalDecimals,
        assetKind,
      };

      return buffer;
    }, {});
  }

  private formatRequest(
    request: OffchainRequest | EthBridgeRequestsOffchainRequest,
    status: RequestStatus | BridgeTxStatus
  ): BridgeRequest {
    const formattedItem = {} as BridgeRequest;
    formattedItem.status = status.toString() as BridgeTxStatus;
    formattedItem.direction = BridgeTxDirection.Incoming;

    if (request.isIncoming) {
      const transferRequest = request.asIncoming[0].asTransfer;
      const assetId = transferRequest.assetId;
      formattedItem.soraAssetAddress = ((assetId as CommonPrimitivesAssetId32).code ?? assetId).toString();
      formattedItem.amount = new FPNumber(transferRequest.amount).toString();
      formattedItem.from = transferRequest.author.toString();
      formattedItem.to = this.account.pair.address;
      formattedItem.kind = transferRequest.assetKind.toString();
      formattedItem.hash = transferRequest.txHash.toString();
    } else if (request.isLoadIncoming) {
      const txRequest = request.asLoadIncoming.asTransaction;
      // TODO: formattedItem.soraAssetAddress is missed here
      formattedItem.from = txRequest.author.toString();
      formattedItem.to = this.account.pair.address;
      formattedItem.kind = txRequest.kind.toString();
      formattedItem.hash = txRequest.hash.toString();
    } else if (request.isOutgoing) {
      formattedItem.direction = BridgeTxDirection.Outgoing;
      const outgoingRequest = request.asOutgoing;
      const transferRequest = outgoingRequest[0].asTransfer;
      const assetId = transferRequest.assetId;
      formattedItem.soraAssetAddress = ((assetId as CommonPrimitivesAssetId32).code ?? assetId).toString();
      formattedItem.amount = new FPNumber(transferRequest.amount).toString();
      formattedItem.from = transferRequest.from.toString();
      formattedItem.to = transferRequest.to.toString();
      formattedItem.hash = outgoingRequest[1].toString();
    } else {
      return null;
    }

    return formattedItem;
  }

  private formatApprovedRequest(request: OutgoingRequestEncoded, proofs: Vec<SignatureParams>): BridgeApprovedRequest {
    const formattedItem = {} as BridgeApprovedRequest;
    const transferRequest = request.asTransfer;

    formattedItem.hash = transferRequest.txHash.toString();
    formattedItem.from = transferRequest.from.toString();
    formattedItem.to = transferRequest.to.toString();
    formattedItem.amount = new FPNumber(transferRequest.amount).toCodecString();
    formattedItem.currencyType = transferRequest.currencyId.isAssetId
      ? BridgeCurrencyType.AssetId
      : BridgeCurrencyType.TokenAddress;

    formattedItem.r = [];
    formattedItem.s = [];
    formattedItem.v = [];

    proofs.forEach((proof) => {
      formattedItem.r.push(proof.r.toString());
      formattedItem.s.push(proof.s.toString());
      formattedItem.v.push(proof.v.toNumber() + 27);
    });

    return formattedItem;
  }

  /**
   * Get approved request
   * @param hash Bridge hash
   * @returns Approved request with proofs
   */
  public async getApprovedRequest(hash: string): Promise<BridgeApprovedRequest> {
    const data = await this.api.rpc.ethBridge.getApprovedRequests([hash], this.externalNetwork);
    assertRequest(data, 'api.bridge.getApprovedRequest');
    return first(data.asOk.map(([request, proofs]) => this.formatApprovedRequest(request, proofs)));
  }

  /**
   * Returns bridge request status
   * @param hash sora or evm transaction hash
   * @returns BridgeRequest status
   */
  public async getRequestStatus(hash: string): Promise<BridgeTxStatus | null> {
    return (
      ((await this.api.query.ethBridge.requestStatuses(this.externalNetwork, hash)).toHuman() as BridgeTxStatus) || null
    );
  }

  /**
   * Creates a subscription to bridge request status
   * @param hash sora or evm transaction hash
   * @returns BridgeRequest status
   */
  public subscribeOnRequestStatus(hash: string): Observable<BridgeTxStatus | null> {
    return this.apiRx.query.ethBridge
      .requestStatuses(this.externalNetwork, hash)
      .pipe(map((data) => (data.toHuman() as BridgeTxStatus) || null));
  }

  /**
   * Creates a subscription to bridge request data
   * @param hash sora or evm transaction hash
   * @returns BridgeRequest not formatted body
   */
  private subscribeOnRequestData(hash: string): Observable<EthBridgeRequestsOffchainRequest | null> {
    return this.apiRx.query.ethBridge
      .requests(this.externalNetwork, hash)
      .pipe(map((data) => (data.isSome ? (data.unwrap() as EthBridgeRequestsOffchainRequest) : null)));
  }

  /**
   * Creates a subscription to bridge request
   * @param hash sora or evm transaction hash
   * @returns BridgeRequest if request is registered
   */
  public subscribeOnRequest(hash: string): Observable<BridgeRequest | null> {
    const data = this.subscribeOnRequestData(hash);
    const status = this.subscribeOnRequestStatus(hash);

    return combineLatest([data, status]).pipe(
      map(([data, status]) => {
        return !!data && !!status ? this.formatRequest(data, status) : null;
      })
    );
  }

  public async getSoraHashByEthereumHash(ethereumHash: string): Promise<string> {
    return (await this.api.query.ethBridge.loadToIncomingRequestHash(this.externalNetwork, ethereumHash)).toString();
  }

  public async getSoraBlockHashByRequestHash(requestHash: string): Promise<string> {
    const soraBlockNumber = (
      await this.api.query.ethBridge.requestSubmissionHeight(this.externalNetwork, requestHash)
    ).toNumber();

    const soraBlockHash = (await this.api.rpc.chain.getBlockHash(soraBlockNumber)).toString();

    return soraBlockHash;
  }

  public async getAssetKind(assetAddress: string): Promise<BridgeRequestAssetKind | null> {
    const data = await this.api.query.ethBridge.registeredAsset(this.externalNetwork, assetAddress);

    if (!data.isSome) return null;

    const kind = data.unwrap();

    return kind.toString() as BridgeRequestAssetKind;
  }
}
