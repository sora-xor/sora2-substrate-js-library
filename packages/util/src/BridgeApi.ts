import first from 'lodash/fp/first'
import { assert } from '@polkadot/util'
import { CreateResult } from '@polkadot/ui-keyring/types'
import { Signer } from '@polkadot/types/types'

import { BaseApi, Operation } from './BaseApi'
import { Messages } from './logger'
import { getAssetInfo } from './assets'
import { FPNumber } from './fp'

export interface RegisteredAsset {
  soraAddress: string;
  externalAddress: string;
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
  Ready = 'Ready',
  Pending = 'Pending',
  Frozen = 'Frozen', // CancelOutgoingRequest
  Failed = 'Failed'
  // Done = 'Done' Will be added soon
}

/**
 * Type of currency for approval request next steps
 */
export enum BridgeCurrencyType {
  AssetId = 'AssetId', // -> receiveBySidechainAssetId
  TokenAddress = 'TokenAddress' // -> receievByEthereumAssetAddress
}

export interface BridgeRequest {
  direction: BridgeDirection;
  from: string;
  externalAssetAddress: string;
  soraAssetAddress: string;
  status: BridgeTxStatus;
  hash: string;
}

export interface BridgeApprovedRequest {
  currencyType: BridgeCurrencyType;
  direction: BridgeDirection;
  amount: string;
  from: string;
  to: string;
  hash: string;
  r: Array<string>;
  s: Array<string>;
  v: Array<number>;
}

export enum BridgeTxDirection {
  Outgoing = 'OutgoingTransfer',
  Incoming = 'Incoming'
}

/**
 * Type of request which we will wait
 */
export enum IncomingRequestType {
  Transfer = 'Transfer',
  AddAsset = 'AddAsset',
  AddPeer = 'AddPeer',
  RemovePeer = 'RemovePeer',
  ClaimPswap = 'ClaimPswap',
  CancelOutgoingRequest = 'CancelOutgoingRequest'
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
  private account: CreateResult

  constructor () {
    super()
  }

  public setAccount (account: CreateResult, signer?: Signer): void {
    this.account = account
    if (signer) {
      this.setSigner(signer)
    }
  }

  private async calcTransferToEthParams (asset: RegisteredAsset, amount: string | number) {
    assert(this.account, Messages.connectWallet)
    const assetInfo = await getAssetInfo(this.api, asset.soraAddress) // TODO: make it like it was in Api class
    const balance = new FPNumber(amount, assetInfo.decimals)
    return {
      args: [
        asset.soraAddress,
        asset.externalAddress,
        balance.toCodecString()
      ],
      asset: assetInfo
    }
  }

  /**
   * Get transfer fee through the bridge
   * @param asset Registered asset
   * @param amount
   * @returns Network fee
   */
  public async getTransferToEthFee (asset: RegisteredAsset, amount: string | number): Promise<string> {
    const params = await this.calcTransferToEthParams(asset, amount)
    return await this.getNetworkFee(this.account.pair, Operation.EthBridgeOutgoing, ...params.args)
  }

  /**
   * Transfer through the bridge operation
   * @param asset Registered asset
   * @param amount
   */
  public async transferToEth (asset: RegisteredAsset, amount: string | number): Promise<void> {
    const params = await this.calcTransferToEthParams(asset, amount)
    await this.submitExtrinsic(
      this.api.tx.ethBridge.transferToSidechain(...params.args),
      this.account.pair,
      {
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
  public async getRequestFromEthFee (hash: string, type: IncomingRequestType = IncomingRequestType.Transfer) {
    assert(this.account, Messages.connectWallet)
    return await this.getNetworkFee(this.account.pair, Operation.EthBridgeIncoming, hash, type)
  }

  /**
   * Request from Ethereum
   * @param hash Eth hash of transaction
   * @param type Type of operation, "Transfer" is set by default
   */
  public async requestFromEth (hash: string, type: IncomingRequestType = IncomingRequestType.Transfer) {
    assert(this.account, Messages.connectWallet)
    await this.submitExtrinsic(
      this.api.tx.ethBridge.requestFromSidechain(hash, type),
      this.account.pair,
      {
        type: Operation.EthBridgeIncoming,
        hash
      }
    )
  }

  /**
   * Get registered assets for bridge
   * @returns Array with all registered assets
   */
  public async getRegisteredAssets (): Promise<Array<RegisteredAsset>> {
    const data = (await (this.api.rpc as any).ethBridge.getRegisteredAssets()).toJSON()
    return data.Ok.map(item => ({ soraAddress: item[1], externalAddress: item[2] } as RegisteredAsset))
  }

  private formatRequest (item: any): BridgeRequest {
    const formattedItem = {} as BridgeRequest
    formattedItem.status = item[1]
    let direction = BridgeDirection.Incoming, txDirection = BridgeTxDirection.Incoming
    if (BridgeDirection.Outgoing in item[0]) {
      direction = BridgeDirection.Outgoing
      txDirection = BridgeTxDirection.Outgoing
    }
    formattedItem.direction = direction
    formattedItem.hash = item[0][direction][1]
    const request = item[0][direction][0][txDirection]
    formattedItem.from = request.from
    formattedItem.soraAssetAddress = request.asset_id
    formattedItem.externalAssetAddress = request.to
    return formattedItem
  }

  /**
   * Get request. This method is just for UI (history of transaction)
   * @param hash Bridge hash
   * @returns History of request
   */
  public async getRequest (hash: string): Promise<BridgeRequest> {
    const data = (await (this.api.rpc as any).ethBridge.getRequests([hash])).toJSON()
    return first(data.Ok.map(item => this.formatRequest(item)))
  }

  /**
   * Get requests. This method is just for UI (history collection)
   * @param hashes Array with bridge hashes
   * @returns Array with history of requests
   */
  public async getRequests (hashes: Array<string>): Promise<Array<BridgeRequest>> {
    const data = (await (this.api.rpc as any).ethBridge.getRequests(hashes)).toJSON()
    return data.Ok.map(item => this.formatRequest(item))
  }

  private formatApprovedRequest (item: any): BridgeApprovedRequest {
    const formattedItem = {} as BridgeApprovedRequest
    formattedItem.direction = BridgeTxDirection.Incoming in item[0] ? BridgeDirection.Incoming : BridgeDirection.Outgoing
    const request = item[0][formattedItem.direction === BridgeDirection.Incoming ? BridgeTxDirection.Incoming : BridgeTxDirection.Outgoing]
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
    const data = (await (this.api.rpc as any).ethBridge.getApprovedRequests([hash])).toJSON()
    return first(data.Ok.map(item => this.formatApprovedRequest(item)))
  }

  /**
   * Get approved requests
   * @param hashes Array with account hashes for bridge
   * @returns Array with approved requests with proofs
   */
  public async getApprovedRequests (hashes: Array<string>): Promise<Array<BridgeApprovedRequest>> {
    const data = (await (this.api.rpc as any).ethBridge.getApprovedRequests(hashes)).toJSON()
    return data.Ok.map(item => this.formatApprovedRequest(item))
  }

  /**
   * Get account requests
   * @returns Array with hashes
   */
  public async getAccountRequests (): Promise<Array<string>> {
    assert(this.account, Messages.connectWallet)
    const data = (await (this.api.rpc as any).ethBridge.getAccountRequests(this.account.pair.address)).toJSON()
    return data.Ok as Array<string>
  }

  /**
   * Not used for now
   * @param hashes
   * @returns
   */
  public async getApproves (hashes: Array<string>) {
    const data = (await (this.api.rpc as any).ethBridge.getApproves(hashes)).toJSON()
    return data.Ok
  }
}
