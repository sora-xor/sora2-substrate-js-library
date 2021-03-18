import first from 'lodash/fp/first'
import { assert } from '@polkadot/util'
import { CreateResult } from '@polkadot/ui-keyring/types'
import { Signer } from '@polkadot/types/types'

import { BaseApi, Operation, History, isBridgeOperation } from './BaseApi'
import { Messages } from './logger'
import { getAssets, Asset, AccountAsset } from './assets'
import { CodecString, FPNumber } from './fp'
import { encrypt } from './crypto'

export interface RegisteredAccountAsset extends AccountAsset {
  externalAddress: string;
  externalBalance: CodecString;
}

export interface RegisteredAsset extends Asset {
  externalAddress: string;
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
}

/**
 * Direction of transfer through the bridge.
 * Outgoing: SORA -> Eth,
 * Incoming: Eth -> SORA
 */
export enum BridgeDirection {
  Outgoing = 'Outgoing',
  Incoming = 'Incoming'
}

export enum BridgeTxStatus {
  Ready = 'ApprovalsReady',
  Pending = 'Pending',
  Frozen = 'Frozen', // CancelOutgoingRequest
  Failed = 'Failed',
  Done = 'Done'
}

/**
 * Type of currency for approval request next steps
 */
export enum BridgeCurrencyType {
  AssetId = 'AssetId', // -> receiveBySidechainAssetId
  TokenAddress = 'TokenAddress' // -> receievByEthereumAssetAddress
}

/**
 * Type of request which we will wait
 */
 export enum RequestType {
  Transfer = 'Transfer',
  AddAsset = 'AddAsset',
  AddPeer = 'AddPeer',
  RemovePeer = 'RemovePeer',
  ClaimPswap = 'ClaimPswap',
  CancelOutgoingRequest = 'CancelOutgoingRequest',
  MarkAsDone = 'MarkAsDone'
}

export interface BridgeRequest {
  direction: BridgeDirection;
  from: string;
  externalAssetAddress?: string; // For outgoing TXs
  soraAssetAddress?: string; // For outgoing TXs
  status: BridgeTxStatus;
  hash: string;
  kind?: RequestType; // For incoming TXs
}

/** Outgoing transfers */
export interface BridgeApprovedRequest {
  currencyType: BridgeCurrencyType;
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
  public static ETH_NETWORK_ID = 0

  private account: CreateResult

  constructor () {
    super()
  }

  public get accountHistory (): Array<BridgeHistory> {
    const filterHistory = (items) => items.filter(({ type }) => isBridgeOperation(type))
    if (this.storage) {
      const allHistory = JSON.parse(this.storage.get('history')) as Array<BridgeHistory> || []
      this.history = filterHistory(allHistory)
      return this.history as Array<BridgeHistory>
    }
    return filterHistory(this.history)
  }

  public generateHistoryItem (params: BridgeHistory): BridgeHistory | null {
    if (!params.type) {
      return null
    }
    const history = (params || {}) as BridgeHistory
    history.startTime = history.startTime || Date.now()
    history.id = encrypt(`${history.startTime}`)
    history.transactionStep = history.transactionStep || 1
    history.transactionState = history.transactionState || 'INITIAL'
    this.saveHistory(history)
    return history
  }

  public saveHistory (history: BridgeHistory): void {
    if (!(history && history.id && isBridgeOperation(history.type))) {
      return
    }
    super.saveHistory(history)
  }

  public getHistory (id: string): BridgeHistory | null {
    return this.accountHistory.find(item => item.id === id) ?? null
  }

  public removeHistory (id: string): void {
    const historyItem = this.accountHistory.find(item => item.id === id)
    if (!historyItem) {
      return
    }
    this.history = (
      this.storage
        ? JSON.parse(this.storage.get('history')) as Array<BridgeHistory> || []
        : this.history
    ).filter(item => item.id !== id)
    if (this.storage) {
      this.storage.set('history', JSON.stringify(this.history))
    }
  }

  public clearHistory (): void {
    const bridgeHistoryIds = this.accountHistory.map(item => item.id)
    const allHistory = this.storage
      ? JSON.parse(this.storage.get('history')) as Array<BridgeHistory> || []
      : this.history
    const formattedHistory = allHistory.filter(({ id }) => !bridgeHistoryIds.includes(id))
    this.history = formattedHistory
    if (this.storage) {
      this.storage.set('history', JSON.stringify(this.history))
    }
  }

  public setAccount (account: CreateResult, signer?: Signer): void {
    this.account = account
    if (signer) {
      this.setSigner(signer)
    }
  }

  private async calcTransferToEthParams (asset: RegisteredAsset, to: string, amount: string | number) {
    assert(this.account, Messages.connectWallet)
    const balance = new FPNumber(amount, asset.decimals)
    return {
      args: [
        asset.address,
        to,
        balance.toCodecString(),
        BridgeApi.ETH_NETWORK_ID
      ],
      asset
    }
  }

  /**
   * Get transfer fee through the bridge
   * @param asset Registered asset
   * @param to Ethereum account address
   * @param amount
   * @returns Network fee
   */
  public async getTransferToEthFee (asset: RegisteredAsset, to: string, amount: string | number): Promise<CodecString> {
    const params = await this.calcTransferToEthParams(asset, to, amount)
    return await this.getNetworkFee(this.account.pair, Operation.EthBridgeOutgoing, ...params.args)
  }

  /**
   * Transfer through the bridge operation
   * @param asset RegisteredAsset
   * @param to Ethereum account address
   * @param amount
   * @param historyId not required
   */
  public async transferToEth (asset: RegisteredAsset, to: string, amount: string | number, historyId?: string): Promise<void> {
    const params = await this.calcTransferToEthParams(asset, to, amount)
    const history = this.accountHistory.find(({ id }) => id === historyId)
    await this.submitExtrinsic(
      this.api.tx.ethBridge.transferToSidechain(...params.args),
      this.account.pair,
      history || {
        symbol: params.asset.symbol,
        amount: `${amount}`,
        type: Operation.EthBridgeOutgoing
      }
    )
  }

  /**
   * Get request from Ethereum network fee
   * @param hash Eth hash of transaction
   * @param type Type of operation, "Transfer" is set by default
   * @returns Network fee
   */
  public async getRequestFromEthFee (hash: string, type: RequestType = RequestType.Transfer): Promise<CodecString> {
    assert(this.account, Messages.connectWallet)
    return await this.getNetworkFee(
      this.account.pair,
      Operation.EthBridgeIncoming,
      hash,
      type,
      BridgeApi.ETH_NETWORK_ID
    )
  }

  /**
   * Request from Ethereum
   * @param hash Eth hash of transaction
   * @param type Type of operation, "Transfer" is set by default
   */
  public async requestFromEth (hash: string, type: RequestType = RequestType.Transfer): Promise<void> {
    assert(this.account, Messages.connectWallet)
    const history = this.accountHistory.find(item => item.hash === hash)
    await this.submitExtrinsic(
      this.api.tx.ethBridge.requestFromSidechain(hash, type, BridgeApi.ETH_NETWORK_ID),
      this.account.pair,
      history || {
        type: Operation.EthBridgeIncoming,
        hash
      }
    )
  }

  /**
   * Mark history data as `Done`
   * @param hash Eth hash of transaction
   */
  // public async markAsDone (hash: string): Promise<void> {
  //   assert(this.account, Messages.connectWallet)
  //   await this.submitExtrinsic(
  //     this.api.tx.ethBridge.requestFromSidechain(hash, RequestType.MarkAsDone, BridgeApi.ETH_NETWORK_ID),
  //     this.account.pair,
  //     {
  //       type: Operation.EthBridgeOutgoingMarkDone,
  //       hash
  //     }
  //   )
  // }

  /**
   * Get registered assets for bridge
   * @returns Array with all registered assets
   */
  public async getRegisteredAssets (): Promise<Array<RegisteredAsset>> {
    const data = (await (this.api.rpc as any).ethBridge.getRegisteredAssets(BridgeApi.ETH_NETWORK_ID)).toJSON()
    const assets = await getAssets(this.api)
    return data.Ok.map(([_, address, externalAddress]) => {
      const asset = assets.find(a => a.address === address)
      return {
        address,
        externalAddress,
        decimals: asset.decimals,
        symbol: asset.symbol
      } as RegisteredAsset
    })
  }

  private formatRequest (item: any): BridgeRequest {
    const formattedItem = {} as BridgeRequest
    formattedItem.status = item[1]
    let direction = BridgeDirection.Incoming, operation = RequestType.Transfer
    if (BridgeDirection.Outgoing in item[0]) {
      direction = BridgeDirection.Outgoing
      operation = RequestType.Transfer
    }
    formattedItem.direction = direction
    let request = item[0][direction]
    if (direction === BridgeDirection.Outgoing) {
      request = request[0][operation]
      formattedItem.hash = item[0][direction][1]
      formattedItem.from = request.from
      formattedItem.soraAssetAddress = request.asset_id
      formattedItem.externalAssetAddress = request.to
    } else {
      formattedItem.from = request.author
      formattedItem.kind = request.kind
      formattedItem.hash = request.hash
    }
    return formattedItem
  }

  /**
   * Get request. This method is just for UI (history of transaction)
   * @param hash Bridge hash
   * @returns History of request
   */
  public async getRequest (hash: string): Promise<BridgeRequest> {
    const data = (await (this.api.rpc as any).ethBridge.getRequests([hash], BridgeApi.ETH_NETWORK_ID)).toJSON()
    return first(data.Ok.map(item => this.formatRequest(item)))
  }

  /**
   * Get requests. This method is just for UI (history collection)
   * @param hashes Array with bridge hashes
   * @returns Array with history of requests
   */
  public async getRequests (hashes: Array<string>): Promise<Array<BridgeRequest>> {
    const data = (await (this.api.rpc as any).ethBridge.getRequests(hashes, BridgeApi.ETH_NETWORK_ID)).toJSON()
    return data.Ok.map(item => this.formatRequest(item))
  }

  private formatApprovedRequest (item: any): BridgeApprovedRequest {
    const formattedItem = {} as BridgeApprovedRequest
    const request = item[0][RequestType.Transfer]
    formattedItem.hash = request.tx_hash
    formattedItem.from = request.from
    formattedItem.to = request.to
    formattedItem.amount = request.amount
    formattedItem.currencyType = BridgeCurrencyType.TokenAddress in request.currency_id ? BridgeCurrencyType.TokenAddress : BridgeCurrencyType.AssetId
    formattedItem.r = []
    formattedItem.s = []
    formattedItem.v = []
    item[1].forEach(proof => {
      formattedItem.r.push(proof.r)
      formattedItem.s.push(proof.s)
      formattedItem.v.push(+proof.v + 27) // TODO: remove this hack
    })
    return formattedItem
  }

  /**
   * Get approved request
   * @param hash Bridge hash
   * @returns Approved request with proofs
   */
  public async getApprovedRequest (hash: string): Promise<BridgeApprovedRequest> {
    const data = (await (this.api.rpc as any).ethBridge.getApprovedRequests([hash], BridgeApi.ETH_NETWORK_ID)).toHuman()
    return first(data.Ok.map(item => this.formatApprovedRequest(item)))
  }

  /**
   * Get approved requests
   * @param hashes Array with account hashes for bridge
   * @returns Array with approved requests with proofs
   */
  public async getApprovedRequests (hashes: Array<string>): Promise<Array<BridgeApprovedRequest>> {
    const data = (await (this.api.rpc as any).ethBridge.getApprovedRequests(hashes, BridgeApi.ETH_NETWORK_ID)).toHuman()
    return data.Ok.map(item => this.formatApprovedRequest(item))
  }

  /**
   * Get account requests
   * @returns Array with hashes
   */
  public async getAccountRequests (status = BridgeTxStatus.Ready): Promise<Array<string>> {
    assert(this.account, Messages.connectWallet)
    const data = (await (this.api.rpc as any).ethBridge.getAccountRequests(this.account.pair.address, status)).toJSON()
    return data.Ok
      .filter(([networkId, _]) => networkId === BridgeApi.ETH_NETWORK_ID)
      .map(([_, hash]) => hash) as Array<string>
  }

  /**
   * Not used for now
   * @param hashes
   * @returns
   */
  public async getApproves (hashes: Array<string>) {
    const data = (await (this.api.rpc as any).ethBridge.getApproves(hashes, BridgeApi.ETH_NETWORK_ID)).toJSON()
    return data.Ok
  }
}
