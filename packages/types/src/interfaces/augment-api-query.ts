// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

import type { BTreeSet, Option, Text, Vec, bool, u8 } from '@polkadot/types';
import type { AnyNumber, ITuple, Observable } from '@polkadot/types/types';
import type { AccountData, BalanceLock } from '@polkadot/types/interfaces/balances';
import type { Multiplier } from '@polkadot/types/interfaces/txpayment';
import type { PoolFarmer } from '@sora-substrate/types/interfaces/farming';
import type { PendingMultisigAccount } from '@sora-substrate/types/interfaces/irohaMigration';
import type { AccountId, Balance, BlockNumber, CurrencyId, DEXId, DEXInfo, Hash, HolderId, LiquiditySourceType, Moment, OwnerId, PermissionId, Releases, Scope, TradingPair } from '@sora-substrate/types/interfaces/runtime';
import type { ApiTypes } from '@polkadot/api/types';

declare module '@polkadot/api/types/storage' {
  export interface AugmentedQueries<ApiType> {
    balances: {
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
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    dexapi: {
      enabledSourceTypes: AugmentedQuery<ApiType, () => Observable<Vec<LiquiditySourceType>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    dexManager: {
      dexInfos: AugmentedQuery<ApiType, (arg: DEXId | AnyNumber | Uint8Array) => Observable<Option<DEXInfo>>, [DEXId]> & QueryableStorageEntry<ApiType, [DEXId]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    farming: {
      /**
       * Farmers of the pool. Pool => Farmers
       **/
      poolFarmers: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<Vec<PoolFarmer>>, [AccountId]> & QueryableStorageEntry<ApiType, [AccountId]>;
      /**
       * Pools whose farmers are refreshed at the specific block. Block => Pools
       **/
      pools: AugmentedQuery<ApiType, (arg: BlockNumber | AnyNumber | Uint8Array) => Observable<Vec<AccountId>>, [BlockNumber]> & QueryableStorageEntry<ApiType, [BlockNumber]>;
      savedValues: AugmentedQuery<ApiType, (arg: BlockNumber | AnyNumber | Uint8Array) => Observable<Vec<ITuple<[AccountId, Vec<PoolFarmer>]>>>, [BlockNumber]> & QueryableStorageEntry<ApiType, [BlockNumber]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    irohaMigration: {
      account: AugmentedQuery<ApiType, () => Observable<AccountId>, []> & QueryableStorageEntry<ApiType, []>;
      balances: AugmentedQuery<ApiType, (arg: Text | string) => Observable<Option<Balance>>, [Text]> & QueryableStorageEntry<ApiType, [Text]>;
      migratedAccounts: AugmentedQuery<ApiType, (arg: Text | string) => Observable<Option<AccountId>>, [Text]> & QueryableStorageEntry<ApiType, [Text]>;
      pendingMultiSigAccounts: AugmentedQuery<ApiType, (arg: Text | string) => Observable<PendingMultisigAccount>, [Text]> & QueryableStorageEntry<ApiType, [Text]>;
      pendingReferrals: AugmentedQuery<ApiType, (arg: Text | string) => Observable<Vec<AccountId>>, [Text]> & QueryableStorageEntry<ApiType, [Text]>;
      publicKeys: AugmentedQuery<ApiType, (arg: Text | string) => Observable<Vec<ITuple<[bool, Text]>>>, [Text]> & QueryableStorageEntry<ApiType, [Text]>;
      quorums: AugmentedQuery<ApiType, (arg: Text | string) => Observable<u8>, [Text]> & QueryableStorageEntry<ApiType, [Text]>;
      referrers: AugmentedQuery<ApiType, (arg: Text | string) => Observable<Option<Text>>, [Text]> & QueryableStorageEntry<ApiType, [Text]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    permissions: {
      owners: AugmentedQuery<ApiType, (arg1: PermissionId | AnyNumber | Uint8Array, arg2: Scope | { Limited: any } | { Unlimited: any } | string | Uint8Array) => Observable<Vec<OwnerId>>, [PermissionId, Scope]> & QueryableStorageEntry<ApiType, [PermissionId, Scope]>;
      permissions: AugmentedQuery<ApiType, (arg1: HolderId | string | Uint8Array, arg2: Scope | { Limited: any } | { Unlimited: any } | string | Uint8Array) => Observable<Vec<PermissionId>>, [HolderId, Scope]> & QueryableStorageEntry<ApiType, [HolderId, Scope]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    randomnessCollectiveFlip: {
      /**
       * Series of block headers from the last 81 blocks that acts as random seed material. This
       * is arranged as a ring buffer with `block_number % 81` being the index into the `Vec` of
       * the oldest hash.
       **/
      randomMaterial: AugmentedQuery<ApiType, () => Observable<Vec<Hash>>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    referrals: {
      referrerBalances: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<Option<Balance>>, [AccountId]> & QueryableStorageEntry<ApiType, [AccountId]>;
      referrers: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<Option<AccountId>>, [AccountId]> & QueryableStorageEntry<ApiType, [AccountId]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    timestamp: {
      /**
       * Did the timestamp get updated in this block?
       **/
      didUpdate: AugmentedQuery<ApiType, () => Observable<bool>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Current time for the current block.
       **/
      now: AugmentedQuery<ApiType, () => Observable<Moment>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    tokens: {
      /**
       * The balance of a token type under an account.
       * 
       * NOTE: If the total is ever zero, decrease account ref account.
       * 
       * NOTE: This is only used in the case that this module is used to store
       * balances.
       **/
      accounts: AugmentedQuery<ApiType, (arg1: AccountId | string | Uint8Array, arg2: CurrencyId | AnyNumber | Uint8Array) => Observable<AccountData>, [AccountId, CurrencyId]> & QueryableStorageEntry<ApiType, [AccountId, CurrencyId]>;
      /**
       * Any liquidity locks of a token type under an account.
       * NOTE: Should only be accessed when setting, changing and freeing a lock.
       **/
      locks: AugmentedQuery<ApiType, (arg1: AccountId | string | Uint8Array, arg2: CurrencyId | AnyNumber | Uint8Array) => Observable<Vec<BalanceLock>>, [AccountId, CurrencyId]> & QueryableStorageEntry<ApiType, [AccountId, CurrencyId]>;
      /**
       * The total issuance of a token type.
       **/
      totalIssuance: AugmentedQuery<ApiType, (arg: CurrencyId | AnyNumber | Uint8Array) => Observable<Balance>, [CurrencyId]> & QueryableStorageEntry<ApiType, [CurrencyId]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    tradingPair: {
      enabledSources: AugmentedQuery<ApiType, (arg1: DEXId | AnyNumber | Uint8Array, arg2: TradingPair | { base_asset_id?: any; target_asset_id?: any } | string | Uint8Array) => Observable<Option<BTreeSet<LiquiditySourceType>>>, [DEXId, TradingPair]> & QueryableStorageEntry<ApiType, [DEXId, TradingPair]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    transactionPayment: {
      nextFeeMultiplier: AugmentedQuery<ApiType, () => Observable<Multiplier>, []> & QueryableStorageEntry<ApiType, []>;
      storageVersion: AugmentedQuery<ApiType, () => Observable<Releases>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
    xorFee: {
      /**
       * The amount of XOR to be reminted and exchanged for VAL at the end of the session
       **/
      xorToVal: AugmentedQuery<ApiType, () => Observable<Balance>, []> & QueryableStorageEntry<ApiType, []>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
  }

  export interface QueryableStorage<ApiType extends ApiTypes> extends AugmentedQueries<ApiType> {
    [key: string]: QueryableModuleStorage<ApiType>;
  }
}
