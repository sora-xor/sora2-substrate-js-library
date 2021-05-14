import first from 'lodash/fp/first'
import last from 'lodash/fp/last'
import BigNumber from 'bignumber.js'
import { assert } from '@polkadot/util'

import { BaseApi, Operation, History, isBridgeOperation } from './BaseApi'
import { Messages } from './logger'
import { getAssets, Asset, AccountAsset, isNativeAsset } from './assets'
import { CodecString, FPNumber } from './fp'
import { encrypt } from './crypto'

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
  ENERGY_NETWORK_ID = 1
}

/**
 * Direction of transfer through the bridge.
 * Outgoing: SORA -> Eth,
 * Incoming: Eth -> SORA
 */
export enum BridgeDirection {
  Outgoing = 'Outgoing',
  Incoming = 'Incoming',
  LoadIncoming = 'LoadIncoming'
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
  TransferXOR = 'TransferXOR',
  AddAsset = 'AddAsset',
  AddPeer = 'AddPeer',
  RemovePeer = 'RemovePeer',
  ClaimPswap = 'ClaimPswap',
  CancelOutgoingRequest = 'CancelOutgoingRequest',
  MarkAsDone = 'MarkAsDone'
}

const toCamelCase = (str: string) => str[0].toLowerCase() + str.slice(1)

const stringToCaseInsensitiveArray = (str: string) => [str, toCamelCase(str)]

const arrayToCaseInsensitiveArray = (arr: Array<string>) => arr.flatMap(str => stringToCaseInsensitiveArray(str))

const caseInsensitiveValue = (obj: any, key: string) => obj[key] || obj[toCamelCase(key)]

enum IncomingRequestKind {
  Transaction = 'Transaction',
  Meta = 'Meta'
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
  private _externalNetwork: BridgeNetworks = BridgeNetworks.ETH_NETWORK_ID

  /**
   * This method will handle error cases.
   * For now, there is just for camelCase issues with substrate 3
   * @param data
   */
  private getData (data: any): any {
    return data.ok || data.Ok
  }

  public get externalNetwork (): BridgeNetworks {
    return this._externalNetwork
  }

  public set externalNetwork (networkId: BridgeNetworks) {
    const key = 'externalNetwork'
    this.storage.set(key, networkId)
    this._externalNetwork = networkId
  }

  public get accountHistory (): Array<BridgeHistory> {
    return (this.history as Array<BridgeHistory>).filter(({ type }) => isBridgeOperation(type))
  }

  public generateHistoryItem (params: BridgeHistory): BridgeHistory | null {
    if (!params.type) {
      return null
    }
    const historyItem = (params || {}) as BridgeHistory
    historyItem.startTime = historyItem.startTime || Date.now()
    historyItem.id = encrypt(`${historyItem.startTime}`)
    historyItem.transactionStep = historyItem.transactionStep || 1
    historyItem.transactionState = historyItem.transactionState || 'INITIAL'
    this.saveHistory(historyItem)
    return historyItem
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

  public clearHistory (): void {
    this.history = this.history.filter(({ type }) => !isBridgeOperation(type))
  }

  private async calcTransferToEthParams (asset: RegisteredAsset, to: string, amount: string | number) {
    assert(this.account, Messages.connectWallet)
    // Trim useless decimals
    const balance = new FPNumber(new FPNumber(amount, +asset.externalDecimals).toString(), asset.decimals)
    return {
      args: [
        asset.address,
        to,
        balance.toCodecString(),
        this.externalNetwork
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
    const historyItem = this.getHistory(historyId)

    await this.submitExtrinsic(
      this.api.tx.ethBridge.transferToSidechain(...params.args),
      this.account.pair,
      historyItem || {
        symbol: params.asset.symbol,
        assetAddress: params.asset.address,
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
    const kind = { [IncomingRequestKind.Transaction]: type }
    return await this.getNetworkFee(
      this.account.pair,
      Operation.EthBridgeIncoming,
      hash,
      kind,
      this.externalNetwork
    )
  }

  /**
   * Request from Ethereum
   * @param hash Eth hash of transaction
   * @param type Type of operation, "Transfer" is set by default
   */
  public async requestFromEth (hash: string, type: RequestType = RequestType.Transfer): Promise<void> {
    assert(this.account, Messages.connectWallet)
    const historyItem = this.accountHistory.find(item => item.hash === hash)
    const kind = { [IncomingRequestKind.Transaction]: type }
    await this.submitExtrinsic(
      this.api.tx.ethBridge.requestFromSidechain(hash, kind, this.externalNetwork),
      this.account.pair,
      historyItem || {
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
  //     this.api.tx.ethBridge.requestFromSidechain(hash, RequestType.MarkAsDone, this.externalNetwork),
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
    const data = (await (this.api.rpc as any).ethBridge.getRegisteredAssets(this.externalNetwork)).toJSON()
    const assets = await getAssets(this.api, false)
    return this.getData(data).map(([_, soraAsset, externalAsset]) => {
      const soraAssetId = first(soraAsset)
      const asset = assets.find(a => a.address === soraAssetId)
      return {
        address: soraAssetId,
        externalAddress: first(externalAsset),
        decimals: asset.decimals,
        symbol: asset.symbol,
        name: asset.name,
        externalDecimals: last(externalAsset)
      } as RegisteredAsset
    }).sort((a: RegisteredAsset, b: RegisteredAsset) => {
      const isNativeA = isNativeAsset(a)
      const isNativeB = isNativeAsset(b)
      if (isNativeA && !isNativeB) {
        return -1
      }
      if (!isNativeA && isNativeB) {
        return 1
      }
      if (a.symbol < b.symbol) {
        return -1
      }
      if (a.symbol > b.symbol) {
        return 1
      }
      return 0
    })
  }

  private formatRequest (item: any): BridgeRequest {
    const formattedItem = {} as BridgeRequest
    formattedItem.status = last(item)
    const body = first(item) as any
    const checkDirection = (value: string) => ~stringToCaseInsensitiveArray(value).findIndex(prop => prop in body)
    let direction: BridgeDirection, operations = [RequestType.Transfer, RequestType.TransferXOR]
    if (checkDirection(BridgeDirection.Outgoing)) {
      direction = BridgeDirection.Outgoing
    } else if (checkDirection(BridgeDirection.Incoming)) {
      direction = BridgeDirection.Incoming
    } else if (checkDirection(BridgeDirection.LoadIncoming)) {
      direction = BridgeDirection.LoadIncoming
      operations = ['Transaction'] as any // TODO: check it
    } else {
      return null
    }
    formattedItem.direction = direction === BridgeDirection.LoadIncoming ? BridgeDirection.Incoming : direction
    let request = caseInsensitiveValue(body, direction)
    const tx = request.length ? first(request) : request
    request = caseInsensitiveValue(tx, first(operations)) || caseInsensitiveValue(tx, last(operations))
    formattedItem.soraAssetAddress = request.asset_id
    if (request.amount) {
      formattedItem.amount = new FPNumber(new BigNumber(request.amount)).toString()
    }
    if (direction === BridgeDirection.Outgoing) {
      formattedItem.hash = last(caseInsensitiveValue(body, direction))
      formattedItem.from = request.from
      formattedItem.to = request.to
    } else {
      formattedItem.from = request.author // TODO: check it
      formattedItem.to = this.account.pair.address
      formattedItem.kind = request.asset_kind || request.kind
      formattedItem.hash = request.tx_hash || request.hash
    }
    return formattedItem
  }

  /**
   * Get request. This method is just for UI (history of transaction)
   * @param hash Bridge hash
   * @returns History of request
   */
  public async getRequest (hash: string): Promise<BridgeRequest> {
    const data = (await (this.api.rpc as any).ethBridge.getRequests([hash], this.externalNetwork, true)).toJSON()
    return first(this.getData(data).map((item: any) => this.formatRequest(item)))
  }

  /**
   * Get requests. This method is just for UI (history collection)
   * @param hashes Array with bridge hashes
   * @returns Array with history of requests
   */
  public async getRequests (hashes: Array<string>): Promise<Array<BridgeRequest>> {
    const data = (await (this.api.rpc as any).ethBridge.getRequests(hashes, this.externalNetwork, true)).toJSON()
    return this.getData(data).map((item: any) => this.formatRequest(item))
  }

  private formatApprovedRequest (item: any): BridgeApprovedRequest {
    const formattedItem = {} as BridgeApprovedRequest
    const operations = [RequestType.Transfer, RequestType.TransferXOR]
    const body = first(item)
    const proofs = last(item) as any
    const request = caseInsensitiveValue(body, first(operations)) || caseInsensitiveValue(body, last(operations))
    formattedItem.hash = request.tx_hash
    formattedItem.from = request.from
    formattedItem.to = request.to
    formattedItem.amount = `${request.amount}`.split(',').join('')
    formattedItem.currencyType = stringToCaseInsensitiveArray(BridgeCurrencyType.TokenAddress).includes(first(Object.keys(request.currency_id)))
      ? BridgeCurrencyType.TokenAddress
      : BridgeCurrencyType.AssetId
    formattedItem.r = []
    formattedItem.s = []
    formattedItem.v = []
    proofs.forEach(proof => {
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
    const data = (await (this.api.rpc as any).ethBridge.getApprovedRequests([hash], this.externalNetwork)).toHuman()
    return first(this.getData(data).map(item => this.formatApprovedRequest(item)))
  }

  /**
   * Get approved requests
   * @param hashes Array with account hashes for bridge
   * @returns Array with approved requests with proofs
   */
  public async getApprovedRequests (hashes: Array<string>): Promise<Array<BridgeApprovedRequest>> {
    const data = (await (this.api.rpc as any).ethBridge.getApprovedRequests(hashes, this.externalNetwork)).toHuman()
    return this.getData(data).map(item => this.formatApprovedRequest(item))
  }

  /**
   * Get account requests
   * @returns Array with hashes
   */
  public async getAccountRequests (status = BridgeTxStatus.Ready): Promise<Array<string>> {
    assert(this.account, Messages.connectWallet)
    const data = (await (this.api.rpc as any).ethBridge.getAccountRequests(this.account.pair.address, status)).toJSON()
    return this.getData(data)
      .filter(([networkId, _]) => networkId === this.externalNetwork)
      .map(([_, hash]) => hash) as Array<string>
  }

  /**
   * Not used for now
   * @param hashes
   * @returns
   */
  public async getApprovals (hashes: Array<string>) {
    const data = (await (this.api.rpc as any).ethBridge.getApprovals(hashes, this.externalNetwork)).toJSON()
    return this.getData(data)
  }
}
