import first from 'lodash/fp/first';
import { assert } from '@polkadot/util';
import { map, combineLatest } from 'rxjs';
import { CodecString, FPNumber } from '@sora-substrate/math';
import type { Observable } from '@polkadot/types/types';
import type { Vec, Result } from '@polkadot/types';
import type { OffchainRequest, OutgoingRequestEncoded, RequestStatus, SignatureParams } from '@sora-substrate/types';
import type { EthBridgeRequestsOffchainRequest, CommonPrimitivesAssetId32 } from '@polkadot/types/lookup';

import { BaseApi, Operation, isBridgeOperation } from './BaseApi';
import { Messages } from './logger';
import { getAssets, isNativeAsset } from './assets';
import type { AccountAsset, Asset } from './assets/types';
import type { History } from './BaseApi';

function assertRequest(result: Result<any, any>, message: string): void {
  if (!result.isOk) {
    // Throws error
    const err = result.asErr.toString();
    console.error(`[${message}]:`, err);
    throw err;
  }
}

export interface RegisteredAccountAsset extends AccountAsset {
  externalAddress: string;
  externalBalance: CodecString;
}

export interface RegisteredAsset extends Asset {
  externalAddress: string;
  externalDecimals: string | number;
}

export interface BridgeHistory extends History {
  type: Operation.EthBridgeIncoming | Operation.EthBridgeOutgoing;
  transactionStep?: 1 | 2;
  hash?: string;
  ethereumHash?: string;
  transactionState?: string;
  soraNetworkFee?: CodecString;
  ethereumNetworkFee?: CodecString;
  signed?: boolean;
  externalNetwork?: BridgeNetworks;
}

export enum BridgeNetworks {
  ETH_NETWORK_ID = 0,
  ENERGY_NETWORK_ID = 1,
}

/**
 * Direction of transfer through the bridge.
 * Outgoing: SORA -> Eth,
 * Incoming: Eth -> SORA
 */
export enum BridgeDirection {
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

enum IncomingRequestKind {
  Transaction = 'Transaction',
  Meta = 'Meta',
}

export interface BridgeRequest {
  direction: BridgeDirection;
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
export class BridgeApi extends BaseApi {
  private _externalNetwork: BridgeNetworks = BridgeNetworks.ETH_NETWORK_ID;

  constructor() {
    super('bridgeHistory');
  }

  public get externalNetwork(): BridgeNetworks {
    return this._externalNetwork;
  }

  public set externalNetwork(networkId: BridgeNetworks) {
    const key = 'externalNetwork';
    this.storage?.set(key, networkId);
    this._externalNetwork = networkId;
  }

  public generateHistoryItem(params: BridgeHistory): BridgeHistory | null {
    if (!params.type) {
      return null;
    }
    const historyItem = (params || {}) as BridgeHistory;
    historyItem.startTime = historyItem.startTime || Date.now();
    historyItem.id = this.encrypt(`${historyItem.startTime}`);
    historyItem.transactionStep = historyItem.transactionStep || 1;
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
   * @param asset RegisteredAsset
   * @param to Ethereum account address
   * @param amount
   * @param historyId not required
   */
  public async transferToEth(
    asset: RegisteredAsset,
    to: string,
    amount: string | number,
    historyId?: string
  ): Promise<void> {
    assert(this.account, Messages.connectWallet);
    // Trim useless decimals
    const balance = new FPNumber(new FPNumber(amount, +asset.externalDecimals).toString(), asset.decimals);

    const historyItem = this.getHistory(historyId);

    await this.submitExtrinsic(
      this.api.tx.ethBridge.transferToSidechain(asset.address, to, balance.toCodecString(), this.externalNetwork),
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
   * Request from Ethereum
   * @param hash Eth hash of transaction
   * @param type Type of operation, "Transfer" is set by default
   */
  public async requestFromEth(hash: string, type: RequestType = RequestType.Transfer): Promise<void> {
    assert(this.account, Messages.connectWallet);
    const historyItem = this.historyList.find((item: BridgeHistory) => item.hash === hash);
    const kind = { [IncomingRequestKind.Transaction]: type };
    await this.submitExtrinsic(
      this.api.tx.ethBridge.requestFromSidechain(hash, kind, this.externalNetwork),
      this.account.pair,
      historyItem ?? {
        type: Operation.EthBridgeIncoming,
        hash,
      }
    );
  }

  /**
   * Get registered assets for bridge
   * @returns Array with all registered assets
   */
  public async getRegisteredAssets(): Promise<Array<RegisteredAsset>> {
    const data = await this.api.rpc.ethBridge.getRegisteredAssets(this.externalNetwork);
    const assets = await getAssets(this.api);
    if (!data.isOk) {
      // Returns an empty list and logs issue
      console.warn('[api.bridge.getRegisteredAssets]:', data.asErr.toString());
      return [];
    }
    return data.asOk
      .map(([_, soraAsset, externalAsset]) => {
        const soraAssetId = soraAsset[0].toString();
        const asset = assets.find((a) => a.address === soraAssetId) as Asset; // cannot be undefined
        const [externalAssetId, externalAssetDecimals] = externalAsset.unwrap();
        return {
          address: soraAssetId,
          externalAddress: externalAssetId.toString(),
          decimals: asset.decimals,
          symbol: asset.symbol,
          name: asset.name,
          externalDecimals: externalAssetDecimals.toNumber(),
        } as RegisteredAsset;
      })
      .sort((a: RegisteredAsset, b: RegisteredAsset) => {
        const isNativeA = isNativeAsset(a);
        const isNativeB = isNativeAsset(b);
        if (isNativeA && !isNativeB) {
          return -1;
        }
        if (!isNativeA && isNativeB) {
          return 1;
        }
        if (a.symbol < b.symbol) {
          return -1;
        }
        if (a.symbol > b.symbol) {
          return 1;
        }
        return 0;
      });
  }

  private formatRequest(
    request: OffchainRequest | EthBridgeRequestsOffchainRequest,
    status: RequestStatus | BridgeTxStatus
  ): BridgeRequest {
    const formattedItem = {} as BridgeRequest;
    formattedItem.status = status.toString() as BridgeTxStatus;
    formattedItem.direction = BridgeDirection.Incoming;

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
      formattedItem.direction = BridgeDirection.Outgoing;
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

  /**
   * Get request. This method is just for UI (history of transaction)
   * @param hash Bridge hash
   * @returns History of request
   */
  public async getRequest(hash: string): Promise<BridgeRequest> {
    const data = await this.api.rpc.ethBridge.getRequests([hash], this.externalNetwork, true);
    assertRequest(data, 'api.bridge.getRequest');
    return first(data.asOk.map(([request, status]) => this.formatRequest(request, status)));
  }

  /**
   * Get requests. This method is just for UI (history collection)
   * @param hashes Array with bridge hashes
   * @returns Array with history of requests
   */
  public async getRequests(hashes: Array<string>): Promise<Array<BridgeRequest>> {
    const data = await this.api.rpc.ethBridge.getRequests(hashes, this.externalNetwork, true);
    assertRequest(data, 'api.bridge.getRequests');
    return data.asOk.map(([request, status]) => this.formatRequest(request, status));
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
   * Get approved requests
   * @param hashes Array with account hashes for bridge
   * @returns Array with approved requests with proofs
   */
  public async getApprovedRequests(hashes: Array<string>): Promise<Array<BridgeApprovedRequest>> {
    const data = await this.api.rpc.ethBridge.getApprovedRequests(hashes, this.externalNetwork);
    assertRequest(data, 'api.bridge.getApprovedRequests');
    return data.asOk.map(([request, proofs]) => this.formatApprovedRequest(request, proofs));
  }

  /**
   * Get account requests
   * @returns Array with hashes
   */
  public async getAccountRequests(status = BridgeTxStatus.Ready): Promise<Array<string>> {
    assert(this.account, Messages.connectWallet);
    const data = await this.api.rpc.ethBridge.getAccountRequests(this.account.pair.address, status);
    assertRequest(data, 'api.bridge.getAccountRequests');
    return data.asOk
      .filter(([networkId, _]) => networkId.toNumber() === this.externalNetwork)
      .map(([_, hash]) => hash.toString()) as Array<string>;
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
}
