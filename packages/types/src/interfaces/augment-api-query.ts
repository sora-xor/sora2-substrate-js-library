// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

import type { BTreeSet, Option, Vec, bool } from '@polkadot/types';
import type { AnyNumber, Observable } from '@polkadot/types/types';
import type { AccountData, BalanceLock } from '@polkadot/types/interfaces/balances';
import type { Multiplier } from '@polkadot/types/interfaces/txpayment';
import type { AccountId, Balance, CurrencyId, DEXId, DEXInfo, Hash, HolderId, LiquiditySourceType, Mode, Moment, OwnerId, PermissionId, Releases, Scope, TradingPair } from '@sora-substrate/types/interfaces/runtime';
import type { ApiTypes } from '@polkadot/api/types';

declare module '@polkadot/api/types/storage' {
  export interface AugmentedQueries<ApiType> {
    balances: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * The balance of an account.
       * 
       * NOTE: This is only used in the case that this pallet is used to store balances.
       **/
      account: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<AccountData>, [AccountId]> & QueryableStorageEntry<ApiType, [AccountId]>;
      /**
       * Any liquidity locks on some account balances.
       * NOTE: Should only be accessed when setting, changing and freeing a lock.
       **/
      locks: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<Vec<BalanceLock>>, [AccountId]> & QueryableStorageEntry<ApiType, [AccountId]>;
      /**
       * Storage version of the pallet.
       * 
       * This is set to v2.0.0 for new networks.
       **/
      storageVersion: AugmentedQuery<ApiType, () => Observable<Releases>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * The total units issued in the system.
       **/
      totalIssuance: AugmentedQuery<ApiType, () => Observable<Balance>, []> & QueryableStorageEntry<ApiType, []>;
    };
    dexapi: {
      [key: string]: QueryableStorageEntry<ApiType>;
      enabledSourceTypes: AugmentedQuery<ApiType, () => Observable<Vec<LiquiditySourceType>>, []> & QueryableStorageEntry<ApiType, []>;
    };
    dexManager: {
      [key: string]: QueryableStorageEntry<ApiType>;
      dexInfos: AugmentedQuery<ApiType, (arg: DEXId | AnyNumber | Uint8Array) => Observable<Option<DEXInfo>>, [DEXId]> & QueryableStorageEntry<ApiType, [DEXId]>;
    };
    permissions: {
      [key: string]: QueryableStorageEntry<ApiType>;
      modes: AugmentedQuery<ApiType, (arg: PermissionId | AnyNumber | Uint8Array) => Observable<Mode>, [PermissionId]> & QueryableStorageEntry<ApiType, [PermissionId]>;
      owners: AugmentedQueryDoubleMap<ApiType, (key1: PermissionId | AnyNumber | Uint8Array, key2: Scope | { Limited: any } | { Unlimited: any } | string | Uint8Array) => Observable<Vec<OwnerId>>, [PermissionId, Scope]> & QueryableStorageEntry<ApiType, [PermissionId, Scope]>;
      permissions: AugmentedQueryDoubleMap<ApiType, (key1: HolderId | string | Uint8Array, key2: Scope | { Limited: any } | { Unlimited: any } | string | Uint8Array) => Observable<Vec<PermissionId>>, [HolderId, Scope]> & QueryableStorageEntry<ApiType, [HolderId, Scope]>;
    };
    randomnessCollectiveFlip: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * Series of block headers from the last 81 blocks that acts as random seed material. This
       * is arranged as a ring buffer with `block_number % 81` being the index into the `Vec` of
       * the oldest hash.
       **/
      randomMaterial: AugmentedQuery<ApiType, () => Observable<Vec<Hash>>, []> & QueryableStorageEntry<ApiType, []>;
    };
    referralSystem: {
      [key: string]: QueryableStorageEntry<ApiType>;
      referrers: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<Option<AccountId>>, [AccountId]> & QueryableStorageEntry<ApiType, [AccountId]>;
    };
    timestamp: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * Did the timestamp get updated in this block?
       **/
      didUpdate: AugmentedQuery<ApiType, () => Observable<bool>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Current time for the current block.
       **/
      now: AugmentedQuery<ApiType, () => Observable<Moment>, []> & QueryableStorageEntry<ApiType, []>;
    };
    tokens: {
      [key: string]: QueryableStorageEntry<ApiType>;
      /**
       * The balance of a token type under an account.
       * 
       * NOTE: If the total is ever zero, decrease account ref account.
       * 
       * NOTE: This is only used in the case that this module is used to store
       * balances.
       **/
      accounts: AugmentedQueryDoubleMap<ApiType, (key1: AccountId | string | Uint8Array, key2: CurrencyId | AnyNumber | Uint8Array) => Observable<AccountData>, [AccountId, CurrencyId]> & QueryableStorageEntry<ApiType, [AccountId, CurrencyId]>;
      /**
       * Any liquidity locks of a token type under an account.
       * NOTE: Should only be accessed when setting, changing and freeing a lock.
       **/
      locks: AugmentedQueryDoubleMap<ApiType, (key1: AccountId | string | Uint8Array, key2: CurrencyId | AnyNumber | Uint8Array) => Observable<Vec<BalanceLock>>, [AccountId, CurrencyId]> & QueryableStorageEntry<ApiType, [AccountId, CurrencyId]>;
      /**
       * The total issuance of a token type.
       **/
      totalIssuance: AugmentedQuery<ApiType, (arg: CurrencyId | AnyNumber | Uint8Array) => Observable<Balance>, [CurrencyId]> & QueryableStorageEntry<ApiType, [CurrencyId]>;
    };
    tradingPair: {
      [key: string]: QueryableStorageEntry<ApiType>;
      enabledSources: AugmentedQueryDoubleMap<ApiType, (key1: DEXId | AnyNumber | Uint8Array, key2: TradingPair | { base_asset_id?: any; target_asset_id?: any } | string | Uint8Array) => Observable<Option<BTreeSet<LiquiditySourceType>>>, [DEXId, TradingPair]> & QueryableStorageEntry<ApiType, [DEXId, TradingPair]>;
    };
    transactionPayment: {
      [key: string]: QueryableStorageEntry<ApiType>;
      nextFeeMultiplier: AugmentedQuery<ApiType, () => Observable<Multiplier>, []> & QueryableStorageEntry<ApiType, []>;
      storageVersion: AugmentedQuery<ApiType, () => Observable<Releases>, []> & QueryableStorageEntry<ApiType, []>;
    };
    xorFee: {
      [key: string]: QueryableStorageEntry<ApiType>;
    };
  }

  export interface QueryableStorage<ApiType extends ApiTypes> extends AugmentedQueries<ApiType> {
    [key: string]: QueryableModuleStorage<ApiType>;
  }
}
