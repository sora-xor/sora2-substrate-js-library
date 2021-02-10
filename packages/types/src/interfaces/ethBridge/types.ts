// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import { ITuple } from '@polkadot/types/types';
import { Enum, Struct, U8aFixed } from '@polkadot/types/codec';
import { Bytes, Text, U256, bool, u64, u8 } from '@polkadot/types/primitive';
import { EthereumAddress } from '@polkadot/types/interfaces/claims';
import { Timepoint } from '@polkadot/types/interfaces/utility';
import { AccountId, AssetId, AssetSymbol, Balance, BalancePrecision, H160, H256, Index } from '@sora-substrate/types/interfaces/runtime';

/** @name AddAssetOutgoingRequest */
export interface AddAssetOutgoingRequest extends Struct {
  readonly author: AccountId;
  readonly asset_id: AssetId;
  readonly supply: Balance;
  readonly nonce: Index;
}

/** @name AddAssetRequestEncoded */
export interface AddAssetRequestEncoded extends Struct {
  readonly name: Text;
  readonly symbol: Text;
  readonly decimal: u8;
  readonly supply: U256;
  readonly sidechain_asset_id: FixedBytes;
  readonly hash: H256;
  readonly raw: Bytes;
}

/** @name AddPeerOutgoingRequest */
export interface AddPeerOutgoingRequest extends Struct {
  readonly author: AccountId;
  readonly peer_address: EthereumAddress;
  readonly peer_account_id: AccountId;
  readonly nonce: Index;
}

/** @name AddPeerOutgoingRequestEncoded */
export interface AddPeerOutgoingRequestEncoded extends Struct {
  readonly peer_address: EthereumAddress;
  readonly tx_hash: H256;
  readonly raw: Bytes;
}

/** @name AddTokenOutgoingRequest */
export interface AddTokenOutgoingRequest extends Struct {
  readonly author: AccountId;
  readonly token_address: EthereumAddress;
  readonly ticker: Text;
  readonly name: Text;
  readonly decimals: u8;
  readonly nonce: Index;
}

/** @name AddTokenRequestEncoded */
export interface AddTokenRequestEncoded extends Struct {
  readonly token_address: EthereumAddress;
  readonly ticker: Text;
  readonly name: Text;
  readonly decimals: u8;
  readonly hash: H256;
  readonly raw: Bytes;
}

/** @name AssetKind */
export interface AssetKind extends Enum {
  readonly isThischain: boolean;
  readonly isSidechain: boolean;
  readonly isSidechainOwned: boolean;
}

/** @name CancelOutgoingRequest */
export interface CancelOutgoingRequest extends Struct {
  readonly request: OutgoingRequest;
  readonly tx_input: Bytes;
  readonly tx_hash: H256;
  readonly at_height: u64;
  readonly timepoint: Timepoint;
}

/** @name CurrencyIdEncoded */
export interface CurrencyIdEncoded extends Enum {
  readonly isAssetId: boolean;
  readonly asAssetId: H256;
  readonly isTokenAddress: boolean;
  readonly asTokenAddress: H160;
}

/** @name FixedBytes */
export interface FixedBytes extends Bytes {}

/** @name IncomingAddToken */
export interface IncomingAddToken extends Struct {
  readonly token_address: EthereumAddress;
  readonly asset_id: AssetId;
  readonly precision: BalancePrecision;
  readonly symbol: AssetSymbol;
  readonly tx_hash: H256;
  readonly at_height: u64;
  readonly timepoint: Timepoint;
}

/** @name IncomingChangePeers */
export interface IncomingChangePeers extends Struct {
  readonly peer_account_id: AccountId;
  readonly peer_address: EthereumAddress;
  readonly added: bool;
  readonly tx_hash: H256;
  readonly at_height: u64;
  readonly timepoint: Timepoint;
}

/** @name IncomingClaimPswap */
export interface IncomingClaimPswap extends Struct {
  readonly account_id: AccountId;
  readonly eth_address: EthereumAddress;
  readonly tx_hash: H256;
  readonly at_height: u64;
  readonly timepoint: Timepoint;
}

/** @name IncomingRequest */
export interface IncomingRequest extends Enum {
  readonly isTransfer: boolean;
  readonly asTransfer: IncomingTransfer;
  readonly isAddAsset: boolean;
  readonly asAddAsset: IncomingAddToken;
  readonly isChangePeers: boolean;
  readonly asChangePeers: IncomingChangePeers;
  readonly isClaimPswap: boolean;
  readonly asClaimPswap: IncomingClaimPswap;
  readonly isCancelOutgoingRequest: boolean;
  readonly asCancelOutgoingRequest: CancelOutgoingRequest;
}

/** @name IncomingRequestKind */
export interface IncomingRequestKind extends Enum {
  readonly isTransfer: boolean;
  readonly isAddAsset: boolean;
  readonly isAddPeer: boolean;
  readonly isRemovePeer: boolean;
  readonly isClaimPswap: boolean;
  readonly isCancelOutgoingRequest: boolean;
  readonly isMarkAsDone: boolean;
}

/** @name IncomingTransfer */
export interface IncomingTransfer extends Struct {
  readonly from: EthereumAddress;
  readonly to: AccountId;
  readonly asset_id: AssetId;
  readonly asset_kind: AssetKind;
  readonly amount: Balance;
  readonly tx_hash: H256;
  readonly at_height: u64;
  readonly timepoint: Timepoint;
}

/** @name OffchainRequest */
export interface OffchainRequest extends Enum {
  readonly isOutgoing: boolean;
  readonly asOutgoing: ITuple<[OutgoingRequest, H256]>;
  readonly isIncoming: boolean;
  readonly asIncoming: ITuple<[AccountId, H256, Timepoint, IncomingRequestKind]>;
}

/** @name OutgoingRequest */
export interface OutgoingRequest extends Enum {
  readonly isOutgoingTransfer: boolean;
  readonly asOutgoingTransfer: OutgoingTransfer;
  readonly isAddAsset: boolean;
  readonly asAddAsset: AddAssetOutgoingRequest;
  readonly isAddToken: boolean;
  readonly asAddToken: AddTokenOutgoingRequest;
  readonly isAddPeer: boolean;
  readonly asAddPeer: AddPeerOutgoingRequest;
  readonly isRemovePeer: boolean;
  readonly asRemovePeer: RemovePeerOutgoingRequest;
}

/** @name OutgoingRequestEncoded */
export interface OutgoingRequestEncoded extends Enum {
  readonly isOutgoingTransfer: boolean;
  readonly asOutgoingTransfer: OutgoingTransferEthEncoded;
  readonly isAddAsset: boolean;
  readonly asAddAsset: AddAssetRequestEncoded;
  readonly isAddToken: boolean;
  readonly asAddToken: AddTokenRequestEncoded;
  readonly isAddPeer: boolean;
  readonly asAddPeer: AddPeerOutgoingRequestEncoded;
  readonly isRemovePeer: boolean;
  readonly asRemovePeer: RemovePeerOutgoingRequestEncoded;
}

/** @name OutgoingTransfer */
export interface OutgoingTransfer extends Struct {
  readonly from: AccountId;
  readonly to: EthereumAddress;
  readonly asset_id: AssetId;
  readonly amount: Balance;
  readonly nonce: Index;
}

/** @name OutgoingTransferEthEncoded */
export interface OutgoingTransferEthEncoded extends Struct {
  readonly currency_id: CurrencyIdEncoded;
  readonly amount: U256;
  readonly to: EthereumAddress;
  readonly from: EthereumAddress;
  readonly tx_hash: H256;
  readonly raw: Bytes;
}

/** @name RemovePeerOutgoingRequest */
export interface RemovePeerOutgoingRequest extends Struct {
  readonly author: AccountId;
  readonly peer_account_id: AccountId;
  readonly peer_address: EthereumAddress;
  readonly nonce: Index;
}

/** @name RemovePeerOutgoingRequestEncoded */
export interface RemovePeerOutgoingRequestEncoded extends Struct {
  readonly peer_address: EthereumAddress;
  readonly tx_hash: H256;
  readonly raw: Bytes;
}

/** @name RequestStatus */
export interface RequestStatus extends Enum {
  readonly isPending: boolean;
  readonly isFrozen: boolean;
  readonly isApprovesReady: boolean;
  readonly isFailed: boolean;
  readonly isDone: boolean;
}

/** @name SignatureParams */
export interface SignatureParams extends Struct {
  readonly r: U8aFixed;
  readonly s: U8aFixed;
  readonly v: u8;
}

export type PHANTOM_ETHBRIDGE = 'ethBridge';
