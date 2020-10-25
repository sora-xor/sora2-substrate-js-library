// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

import { AnyNumber, ITuple, Observable } from '@polkadot/types/types';
import { Option, Vec } from '@polkadot/types/codec';
import { bool, u32 } from '@polkadot/types/primitive';
import { AccountData, BalanceLock } from '@polkadot/types/interfaces/balances';
import { ParaId, RelayChainBlockNumber } from '@polkadot/types/interfaces/parachains';
import { Multiplier } from '@polkadot/types/interfaces/txpayment';
import { AccountId, AssetId, Balance, CurrencyId, DEXId, DEXInfo, Fixed, Hash, Moment, Permission, Releases, TechAccountId, ValidationFunction } from '@sora-neo-substrate/types/interfaces/runtime';
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
      reservesAcc: AugmentedQuery<ApiType, () => Observable<TechAccountId>> & QueryableStorageEntry<ApiType>;
    };
    mockLiquiditySource2: {
      [key: string]: QueryableStorageEntry<ApiType>;
      reserves: AugmentedQueryDoubleMap<ApiType, (key1: DEXId | AnyNumber | Uint8Array, key2: AssetId | AnyNumber | Uint8Array) => Observable<ITuple<[Fixed, Fixed]>>> & QueryableStorageEntry<ApiType>;
      reservesAcc: AugmentedQuery<ApiType, () => Observable<TechAccountId>> & QueryableStorageEntry<ApiType>;
    };
    mockLiquiditySource3: {
      [key: string]: QueryableStorageEntry<ApiType>;
      reserves: AugmentedQueryDoubleMap<ApiType, (key1: DEXId | AnyNumber | Uint8Array, key2: AssetId | AnyNumber | Uint8Array) => Observable<ITuple<[Fixed, Fixed]>>> & QueryableStorageEntry<ApiType>;
      reservesAcc: AugmentedQuery<ApiType, () => Observable<TechAccountId>> & QueryableStorageEntry<ApiType>;
    };
    mockLiquiditySource4: {
      [key: string]: QueryableStorageEntry<ApiType>;
      reserves: AugmentedQueryDoubleMap<ApiType, (key1: DEXId | AnyNumber | Uint8Array, key2: AssetId | AnyNumber | Uint8Array) => Observable<ITuple<[Fixed, Fixed]>>> & QueryableStorageEntry<ApiType>;
      reservesAcc: AugmentedQuery<ApiType, () => Observable<TechAccountId>> & QueryableStorageEntry<ApiType>;
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
