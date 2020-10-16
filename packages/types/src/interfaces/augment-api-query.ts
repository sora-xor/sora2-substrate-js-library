// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

import { AnyNumber, ITuple, Observable } from '@polkadot/types/types';
import { Option, Vec } from '@polkadot/types/codec';
import { Bytes, bool, u32 } from '@polkadot/types/primitive';
import { AccountData, BalanceLock } from '@polkadot/types/interfaces/balances';
import { ParaId, RelayChainBlockNumber } from '@polkadot/types/interfaces/parachains';
import { AccountInfo, DigestOf, EventIndex, EventRecord, LastRuntimeUpgradeInfo, Phase } from '@polkadot/types/interfaces/system';
import { Multiplier } from '@polkadot/types/interfaces/txpayment';
import { AccountId, AssetId, Balance, BlockNumber, CurrencyId, DEXId, ExtrinsicsWeight, Fixed, Hash, Moment, Releases } from '@sora-neo-substrate/types/interfaces/runtime';
import { ApiTypes } from '@polkadot/api/types';

declare module '@polkadot/api/types/storage' {
  export interface AugmentedQueries<ApiType> {
    balances: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * The balance of an account.
       * 
       * NOTE: This is only used in the case that this module is used to store balances.
       **/
      account: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<AccountData>> & QueryableStorageEntry<ApiType>;
      /**
       * Any liquidity locks on some account balances.
       * NOTE: Should only be accessed when setting, changing and freeing a lock.
       **/
      locks: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<Vec<BalanceLock>>> & QueryableStorageEntry<ApiType>;
      /**
       * Storage version of the pallet.
       * 
       * This is set to v2.0.0 for new networks.
       **/
      storageVersion: AugmentedQuery<ApiType, () => Observable<Releases>> & QueryableStorageEntry<ApiType>;
      /**
       * The total units issued in the system.
       **/
      totalIssuance: AugmentedQuery<ApiType, () => Observable<Balance>> & QueryableStorageEntry<ApiType>;
    };
    dexManager: {
      [key: string]: QueryableStorageEntry<ApiType>;
      dexInfos: AugmentedQuery<ApiType, (arg: DEXId | AnyNumber | Uint8Array) => Observable<DEXInfo>> & QueryableStorageEntry<ApiType>;
    };
    mockLiquiditySource: {
      [key: string]: QueryableStorageEntry<ApiType>;
      reserves: AugmentedQueryDoubleMap<ApiType, (key1: DEXId | AnyNumber | Uint8Array, key2: AssetId | AnyNumber | Uint8Array) => Observable<ITuple<[Fixed, Fixed]>>> & QueryableStorageEntry<ApiType>;
      reservesAcc: AugmentedQuery<ApiType, () => Observable<TechAccountIdPrimitive>> & QueryableStorageEntry<ApiType>;
    };
    mockLiquiditySource2: {
      [key: string]: QueryableStorageEntry<ApiType>;
      reserves: AugmentedQueryDoubleMap<ApiType, (key1: DEXId | AnyNumber | Uint8Array, key2: AssetId | AnyNumber | Uint8Array) => Observable<ITuple<[Fixed, Fixed]>>> & QueryableStorageEntry<ApiType>;
      reservesAcc: AugmentedQuery<ApiType, () => Observable<TechAccountIdPrimitive>> & QueryableStorageEntry<ApiType>;
    };
    mockLiquiditySource3: {
      [key: string]: QueryableStorageEntry<ApiType>;
      reserves: AugmentedQueryDoubleMap<ApiType, (key1: DEXId | AnyNumber | Uint8Array, key2: AssetId | AnyNumber | Uint8Array) => Observable<ITuple<[Fixed, Fixed]>>> & QueryableStorageEntry<ApiType>;
      reservesAcc: AugmentedQuery<ApiType, () => Observable<TechAccountIdPrimitive>> & QueryableStorageEntry<ApiType>;
    };
    mockLiquiditySource4: {
      [key: string]: QueryableStorageEntry<ApiType>;
      reserves: AugmentedQueryDoubleMap<ApiType, (key1: DEXId | AnyNumber | Uint8Array, key2: AssetId | AnyNumber | Uint8Array) => Observable<ITuple<[Fixed, Fixed]>>> & QueryableStorageEntry<ApiType>;
      reservesAcc: AugmentedQuery<ApiType, () => Observable<TechAccountIdPrimitive>> & QueryableStorageEntry<ApiType>;
    };
    parachainInfo: {
      [key: string]: QueryableStorageEntry<ApiType>;
      parachainId: AugmentedQuery<ApiType, () => Observable<ParaId>> & QueryableStorageEntry<ApiType>;
    };
    parachainUpgrade: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * Were the VFPs updated this block?
       **/
      didUpdateVfPs: AugmentedQuery<ApiType, () => Observable<bool>> & QueryableStorageEntry<ApiType>;
      pendingValidationFunction: AugmentedQuery<ApiType, () => Observable<Option<ITuple<[RelayChainBlockNumber, ValidationFunction]>>>> & QueryableStorageEntry<ApiType>;
    };
    permissions: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * Storage with double keys (permission_id, holder_id).
       **/
      permissions: AugmentedQueryDoubleMap<ApiType, (key1: u32 | AnyNumber | Uint8Array, key2: AccountId | string | Uint8Array) => Observable<Option<Permission>>> & QueryableStorageEntry<ApiType>;
    };
    randomnessCollectiveFlip: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * Series of block headers from the last 81 blocks that acts as random seed material. This
       * is arranged as a ring buffer with `block_number % 81` being the index into the `Vec` of
       * the oldest hash.
       **/
      randomMaterial: AugmentedQuery<ApiType, () => Observable<Vec<Hash>>> & QueryableStorageEntry<ApiType>;
    };
    referralSystem: {
      [key: string]: QueryableStorageEntry<ApiType>;
      referrerAccount: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<AccountId>> & QueryableStorageEntry<ApiType>;
    };
    sudo: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * The `AccountId` of the sudo key.
       **/
      key: AugmentedQuery<ApiType, () => Observable<AccountId>> & QueryableStorageEntry<ApiType>;
    };
    system: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * The full account information for a particular account ID.
       **/
      account: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<AccountInfo>> & QueryableStorageEntry<ApiType>;
      /**
       * Total length (in bytes) for all extrinsics put together, for the current block.
       **/
      allExtrinsicsLen: AugmentedQuery<ApiType, () => Observable<Option<u32>>> & QueryableStorageEntry<ApiType>;
      /**
       * Map of block numbers to block hashes.
       **/
      blockHash: AugmentedQuery<ApiType, (arg: BlockNumber | AnyNumber | Uint8Array) => Observable<Hash>> & QueryableStorageEntry<ApiType>;
      /**
       * The current weight for the block.
       **/
      blockWeight: AugmentedQuery<ApiType, () => Observable<ExtrinsicsWeight>> & QueryableStorageEntry<ApiType>;
      /**
       * Digest of the current block, also part of the block header.
       **/
      digest: AugmentedQuery<ApiType, () => Observable<DigestOf>> & QueryableStorageEntry<ApiType>;
      /**
       * The number of events in the `Events<T>` list.
       **/
      eventCount: AugmentedQuery<ApiType, () => Observable<EventIndex>> & QueryableStorageEntry<ApiType>;
      /**
       * Events deposited for the current block.
       **/
      events: AugmentedQuery<ApiType, () => Observable<Vec<EventRecord>>> & QueryableStorageEntry<ApiType>;
      /**
       * Mapping between a topic (represented by T::Hash) and a vector of indexes
       * of events in the `<Events<T>>` list.
       * 
       * All topic vectors have deterministic storage locations depending on the topic. This
       * allows light-clients to leverage the changes trie storage tracking mechanism and
       * in case of changes fetch the list of events of interest.
       * 
       * The value has the type `(T::BlockNumber, EventIndex)` because if we used only just
       * the `EventIndex` then in case if the topic has the same contents on the next block
       * no notification will be triggered thus the event might be lost.
       **/
      eventTopics: AugmentedQuery<ApiType, (arg: Hash | string | Uint8Array) => Observable<Vec<ITuple<[BlockNumber, EventIndex]>>>> & QueryableStorageEntry<ApiType>;
      /**
       * The execution phase of the block.
       **/
      executionPhase: AugmentedQuery<ApiType, () => Observable<Option<Phase>>> & QueryableStorageEntry<ApiType>;
      /**
       * Total extrinsics count for the current block.
       **/
      extrinsicCount: AugmentedQuery<ApiType, () => Observable<Option<u32>>> & QueryableStorageEntry<ApiType>;
      /**
       * Extrinsics data for the current block (maps an extrinsic's index to its data).
       **/
      extrinsicData: AugmentedQuery<ApiType, (arg: u32 | AnyNumber | Uint8Array) => Observable<Bytes>> & QueryableStorageEntry<ApiType>;
      /**
       * Extrinsics root of the current block, also part of the block header.
       **/
      extrinsicsRoot: AugmentedQuery<ApiType, () => Observable<Hash>> & QueryableStorageEntry<ApiType>;
      /**
       * Stores the `spec_version` and `spec_name` of when the last runtime upgrade happened.
       **/
      lastRuntimeUpgrade: AugmentedQuery<ApiType, () => Observable<Option<LastRuntimeUpgradeInfo>>> & QueryableStorageEntry<ApiType>;
      /**
       * The current block number being processed. Set by `execute_block`.
       **/
      number: AugmentedQuery<ApiType, () => Observable<BlockNumber>> & QueryableStorageEntry<ApiType>;
      /**
       * Hash of the previous block.
       **/
      parentHash: AugmentedQuery<ApiType, () => Observable<Hash>> & QueryableStorageEntry<ApiType>;
    };
    templateModule: {
      [key: string]: QueryableStorageEntry<ApiType>;
      something: AugmentedQuery<ApiType, () => Observable<Option<u32>>> & QueryableStorageEntry<ApiType>;
    };
    timestamp: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * Did the timestamp get updated in this block?
       **/
      didUpdate: AugmentedQuery<ApiType, () => Observable<bool>> & QueryableStorageEntry<ApiType>;
      /**
       * Current time for the current block.
       **/
      now: AugmentedQuery<ApiType, () => Observable<Moment>> & QueryableStorageEntry<ApiType>;
    };
    tokens: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * The balance of a token type under an account.
       * 
       * NOTE: If the total is ever zero, decrease account ref account.
       * 
       * NOTE: This is only used in the case that this module is used to store balances.
       **/
      accounts: AugmentedQueryDoubleMap<ApiType, (key1: AccountId | string | Uint8Array, key2: CurrencyId | AnyNumber | Uint8Array) => Observable<AccountData>> & QueryableStorageEntry<ApiType>;
      /**
       * Any liquidity locks of a token type under an account.
       * NOTE: Should only be accessed when setting, changing and freeing a lock.
       **/
      locks: AugmentedQueryDoubleMap<ApiType, (key1: AccountId | string | Uint8Array, key2: CurrencyId | AnyNumber | Uint8Array) => Observable<Vec<BalanceLock>>> & QueryableStorageEntry<ApiType>;
      /**
       * The total issuance of a token type.
       **/
      totalIssuance: AugmentedQuery<ApiType, (arg: CurrencyId | AnyNumber | Uint8Array) => Observable<Balance>> & QueryableStorageEntry<ApiType>;
    };
    transactionPayment: {
      [key: string]: QueryableStorageEntry<ApiType>;
      nextFeeMultiplier: AugmentedQuery<ApiType, () => Observable<Multiplier>> & QueryableStorageEntry<ApiType>;
      storageVersion: AugmentedQuery<ApiType, () => Observable<Releases>> & QueryableStorageEntry<ApiType>;
    };
    xorFee: {
      [key: string]: QueryableStorageEntry<ApiType>;
    };
  }

  export interface QueryableStorage<ApiType extends ApiTypes> extends AugmentedQueries<ApiType> {
    [key: string]: QueryableModuleStorage<ApiType>;
  }
}
