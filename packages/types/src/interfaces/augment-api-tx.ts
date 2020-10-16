// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

import { AnyNumber } from '@polkadot/types/types';
import { Compact, Option, Vec } from '@polkadot/types/codec';
import { Bytes, u16, u32, u64 } from '@polkadot/types/primitive';
import { Extrinsic } from '@polkadot/types/interfaces/extrinsics';
import { DownwardMessage, ValidationFunctionParams } from '@polkadot/types/interfaces/parachains';
import { Key } from '@polkadot/types/interfaces/system';
import { AccountId, AmountOf, AssetId, Balance, BalanceOf, BasisPoints, Call, ChangesTrieConfiguration, CurrencyIdOf, DEXId, Fixed, KeyValue, LookupSource, Moment, Perbill, Weight } from '@sora-neo-substrate/types/interfaces/runtime';
import { ApiTypes, SubmittableExtrinsic } from '@polkadot/api/types';

declare module '@polkadot/api/types/submittable' {
  export interface AugmentedSubmittables<ApiType> {
    assets: {
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
      /**
       * Performs an asset registration.
       * 
       * Basically, this function checks the if given `asset_id` has an owner
       * and if not, inserts it.
       **/
      register: AugmentedSubmittable<(assetId: AssetId | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
    };
    balances: {
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
      /**
       * Exactly as `transfer`, except the origin must be root and the source account may be
       * specified.
       * # <weight>
       * - Same as transfer, but additional read and write because the source account is
       * not assumed to be in the overlay.
       * # </weight>
       **/
      forceTransfer: AugmentedSubmittable<(source: LookupSource | string | Uint8Array, dest: LookupSource | string | Uint8Array, value: Compact<Balance> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Set the balances of a given account.
       * 
       * This will alter `FreeBalance` and `ReservedBalance` in storage. it will
       * also decrease the total issuance of the system (`TotalIssuance`).
       * If the new free or reserved balance is below the existential deposit,
       * it will reset the account nonce (`frame_system::AccountNonce`).
       * 
       * The dispatch origin for this call is `root`.
       * 
       * # <weight>
       * - Independent of the arguments.
       * - Contains a limited number of reads and writes.
       * ---------------------
       * - Base Weight:
       * - Creating: 27.56 µs
       * - Killing: 35.11 µs
       * - DB Weight: 1 Read, 1 Write to `who`
       * # </weight>
       **/
      setBalance: AugmentedSubmittable<(who: LookupSource | string | Uint8Array, newFree: Compact<Balance> | AnyNumber | Uint8Array, newReserved: Compact<Balance> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Transfer some liquid free balance to another account.
       * 
       * `transfer` will set the `FreeBalance` of the sender and receiver.
       * It will decrease the total issuance of the system by the `TransferFee`.
       * If the sender's account is below the existential deposit as a result
       * of the transfer, the account will be reaped.
       * 
       * The dispatch origin for this call must be `Signed` by the transactor.
       * 
       * # <weight>
       * - Dependent on arguments but not critical, given proper implementations for
       * input config types. See related functions below.
       * - It contains a limited number of reads and writes internally and no complex computation.
       * 
       * Related functions:
       * 
       * - `ensure_can_withdraw` is always called internally but has a bounded complexity.
       * - Transferring balances to accounts that did not exist before will cause
       * `T::OnNewAccount::on_new_account` to be called.
       * - Removing enough funds from an account will trigger `T::DustRemoval::on_unbalanced`.
       * - `transfer_keep_alive` works the same way as `transfer`, but has an additional
       * check that the transfer will not kill the origin account.
       * ---------------------------------
       * - Base Weight: 73.64 µs, worst case scenario (account created, account removed)
       * - DB Weight: 1 Read and 1 Write to destination account
       * - Origin account is already in memory, so no DB operations for them.
       * # </weight>
       **/
      transfer: AugmentedSubmittable<(dest: LookupSource | string | Uint8Array, value: Compact<Balance> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Same as the [`transfer`] call, but with a check that the transfer will not kill the
       * origin account.
       * 
       * 99% of the time you want [`transfer`] instead.
       * 
       * [`transfer`]: struct.Module.html#method.transfer
       * # <weight>
       * - Cheaper than transfer because account cannot be killed.
       * - Base Weight: 51.4 µs
       * - DB Weight: 1 Read and 1 Write to dest (sender is in overlay already)
       * #</weight>
       **/
      transferKeepAlive: AugmentedSubmittable<(dest: LookupSource | string | Uint8Array, value: Compact<Balance> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
    };
    currencies: {
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
      /**
       * Transfer some balance to another account under `currency_id`.
       * 
       * The dispatch origin for this call must be `Signed` by the transactor.
       * 
       * # <weight>
       * - Preconditions:
       * - T::MultiCurrency is orml_tokens
       * - T::NativeCurrency is pallet_balances
       * - Complexity: `O(1)`
       * - Db reads: 5
       * - Db writes: 2
       * -------------------
       * Base Weight:
       * - non-native currency: 90.23 µs
       * - native currency in worst case: 70 µs
       * # </weight>
       **/
      transfer: AugmentedSubmittable<(dest: LookupSource | string | Uint8Array, currencyId: CurrencyIdOf | AnyNumber | Uint8Array, amount: Compact<BalanceOf> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Transfer some native currency to another account.
       * 
       * The dispatch origin for this call must be `Signed` by the transactor.
       * 
       * # <weight>
       * - Preconditions:
       * - T::MultiCurrency is orml_tokens
       * - T::NativeCurrency is pallet_balances
       * - Complexity: `O(1)`
       * - Db reads: 2 * `Accounts`
       * - Db writes: 2 * `Accounts`
       * -------------------
       * Base Weight: 70 µs
       * # </weight>
       **/
      transferNativeCurrency: AugmentedSubmittable<(dest: LookupSource | string | Uint8Array, amount: Compact<BalanceOf> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * update amount of account `who` under `currency_id`.
       * 
       * The dispatch origin of this call must be _Root_.
       * 
       * # <weight>
       * - Preconditions:
       * - T::MultiCurrency is orml_tokens
       * - T::NativeCurrency is pallet_balances
       * - Complexity: `O(1)`
       * - Db reads:
       * - non-native currency: 5
       * - Db writes:
       * - non-native currency: 2
       * -------------------
       * Base Weight:
       * - non-native currency: 66.24 µs
       * - native currency and killing account: 26.33 µs
       * - native currency and create account: 27.39 µs
       * # </weight>
       **/
      updateBalance: AugmentedSubmittable<(who: LookupSource | string | Uint8Array, currencyId: CurrencyIdOf | AnyNumber | Uint8Array, amount: AmountOf | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
    };
    dexManager: {
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
      /**
       * Initialize DEX in network with given Id, Base Asset, if fees are not given then defaults are applied.
       * 
       * - `dex_id`: ID of the exchange.
       * - `fee`: value of fee on swaps in basis points.
       * - `protocol_fee`: value of fee fraction for protocol beneficiary in basis points.
       * 
       * TODO: add information about weight
       **/
      initializeDex: AugmentedSubmittable<(dexId: DEXId | AnyNumber | Uint8Array, baseAssetId: AssetId | AnyNumber | Uint8Array, ownerAccountId: AccountId | string | Uint8Array, fee: Option<u16> | null | object | string | Uint8Array, protocolFee: Option<u16> | null | object | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Set fee deduced from tokens during swaps.
       * 
       * - `dex_id`: ID of the exchange.
       * - `fee`: value of fee on swaps in basis points.
       * 
       * TODO: add information about weight
       **/
      setFee: AugmentedSubmittable<(dexId: DEXId | AnyNumber | Uint8Array, fee: BasisPoints | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Set fee deduced from swaps fee for protocol beneficiary.
       * 
       * - `dex_id`: ID of the exchange.
       * - `protocol_fee`: value of fee fraction for protocol beneficiary in basis points.
       * 
       * TODO: add information about weight
       **/
      setProtocolFee: AugmentedSubmittable<(dexId: DEXId | AnyNumber | Uint8Array, protocolFee: BasisPoints | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
    };
    messageBroker: {
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
      /**
       * Executes the given downward messages by calling the message handlers.
       * 
       * The origin of this call needs to be `None` as this is an inherent.
       **/
      executeDownwardMessages: AugmentedSubmittable<(messages: Vec<DownwardMessage> | (DownwardMessage | { TransferInto: any } | { Opaque: any } | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>>;
    };
    mockLiquiditySource: {
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
      setReserve: AugmentedSubmittable<(dexId: DEXId | AnyNumber | Uint8Array, targetId: AssetId | AnyNumber | Uint8Array, baseReserve: Fixed | AnyNumber | Uint8Array, targetReserve: Fixed | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      testAccess: AugmentedSubmittable<(dexId: DEXId | AnyNumber | Uint8Array, targetId: AssetId | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
    };
    mockLiquiditySource2: {
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
      setReserve: AugmentedSubmittable<(dexId: DEXId | AnyNumber | Uint8Array, targetId: AssetId | AnyNumber | Uint8Array, baseReserve: Fixed | AnyNumber | Uint8Array, targetReserve: Fixed | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      testAccess: AugmentedSubmittable<(dexId: DEXId | AnyNumber | Uint8Array, targetId: AssetId | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
    };
    mockLiquiditySource3: {
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
      setReserve: AugmentedSubmittable<(dexId: DEXId | AnyNumber | Uint8Array, targetId: AssetId | AnyNumber | Uint8Array, baseReserve: Fixed | AnyNumber | Uint8Array, targetReserve: Fixed | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      testAccess: AugmentedSubmittable<(dexId: DEXId | AnyNumber | Uint8Array, targetId: AssetId | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
    };
    mockLiquiditySource4: {
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
      setReserve: AugmentedSubmittable<(dexId: DEXId | AnyNumber | Uint8Array, targetId: AssetId | AnyNumber | Uint8Array, baseReserve: Fixed | AnyNumber | Uint8Array, targetReserve: Fixed | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      testAccess: AugmentedSubmittable<(dexId: DEXId | AnyNumber | Uint8Array, targetId: AssetId | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
    };
    parachainUpgrade: {
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
      scheduleUpgrade: AugmentedSubmittable<(validationFunction: ValidationFunction | null) => SubmittableExtrinsic<ApiType>>;
      /**
       * Set the current validation function parameters
       * 
       * This should be invoked exactly once per block. It will panic at the finalization
       * phease if the call was not invoked.
       * 
       * The dispatch origin for this call must be `Inherent`
       * 
       * As a side effect, this function upgrades the current validation function
       * if the appropriate time has come.
       **/
      setValidationFunctionParameters: AugmentedSubmittable<(vfp: ValidationFunctionParams | { maxCodeSize?: any; relayChainHeight?: any; codeUpgradeAllowed?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
    };
    sudo: {
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
      /**
       * Authenticates the current sudo key and sets the given AccountId (`new`) as the new sudo key.
       * 
       * The dispatch origin for this call must be _Signed_.
       * 
       * # <weight>
       * - O(1).
       * - Limited storage reads.
       * - One DB change.
       * # </weight>
       **/
      setKey: AugmentedSubmittable<(updated: LookupSource | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Authenticates the sudo key and dispatches a function call with `Root` origin.
       * 
       * The dispatch origin for this call must be _Signed_.
       * 
       * # <weight>
       * - O(1).
       * - Limited storage reads.
       * - One DB write (event).
       * - Weight of derivative `call` execution + 10,000.
       * # </weight>
       **/
      sudo: AugmentedSubmittable<(call: Call | { callIndex?: any; args?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Authenticates the sudo key and dispatches a function call with `Signed` origin from
       * a given account.
       * 
       * The dispatch origin for this call must be _Signed_.
       * 
       * # <weight>
       * - O(1).
       * - Limited storage reads.
       * - One DB write (event).
       * - Weight of derivative `call` execution + 10,000.
       * # </weight>
       **/
      sudoAs: AugmentedSubmittable<(who: LookupSource | string | Uint8Array, call: Call | { callIndex?: any; args?: any } | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Authenticates the sudo key and dispatches a function call with `Root` origin.
       * This function does not check the weight of the call, and instead allows the
       * Sudo user to specify the weight of the call.
       * 
       * The dispatch origin for this call must be _Signed_.
       * 
       * # <weight>
       * - O(1).
       * - The weight of this call is defined by the caller.
       * # </weight>
       **/
      sudoUncheckedWeight: AugmentedSubmittable<(call: Call | { callIndex?: any; args?: any } | string | Uint8Array, weight: Weight | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
    };
    system: {
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
      /**
       * A dispatch that will fill the block weight up to the given ratio.
       **/
      fillBlock: AugmentedSubmittable<(ratio: Perbill | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Kill all storage items with a key that starts with the given prefix.
       * 
       * **NOTE:** We rely on the Root origin to provide us the number of subkeys under
       * the prefix we are removing to accurately calculate the weight of this function.
       * 
       * # <weight>
       * - `O(P)` where `P` amount of keys with prefix `prefix`
       * - `P` storage deletions.
       * - Base Weight: 0.834 * P µs
       * - Writes: Number of subkeys + 1
       * # </weight>
       **/
      killPrefix: AugmentedSubmittable<(prefix: Key | string | Uint8Array, subkeys: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Kill some items from storage.
       * 
       * # <weight>
       * - `O(IK)` where `I` length of `keys` and `K` length of one key
       * - `I` storage deletions.
       * - Base Weight: .378 * i µs
       * - Writes: Number of items
       * # </weight>
       **/
      killStorage: AugmentedSubmittable<(keys: Vec<Key> | (Key | string | Uint8Array)[]) => SubmittableExtrinsic<ApiType>>;
      /**
       * Make some on-chain remark.
       * 
       * # <weight>
       * - `O(1)`
       * - Base Weight: 0.665 µs, independent of remark length.
       * - No DB operations.
       * # </weight>
       **/
      remark: AugmentedSubmittable<(remark: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Set the new changes trie configuration.
       * 
       * # <weight>
       * - `O(1)`
       * - 1 storage write or delete (codec `O(1)`).
       * - 1 call to `deposit_log`: Uses `append` API, so O(1)
       * - Base Weight: 7.218 µs
       * - DB Weight:
       * - Writes: Changes Trie, System Digest
       * # </weight>
       **/
      setChangesTrieConfig: AugmentedSubmittable<(changesTrieConfig: Option<ChangesTrieConfiguration> | null | object | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Set the new runtime code.
       * 
       * # <weight>
       * - `O(C + S)` where `C` length of `code` and `S` complexity of `can_set_code`
       * - 1 storage write (codec `O(C)`).
       * - 1 call to `can_set_code`: `O(S)` (calls `sp_io::misc::runtime_version` which is expensive).
       * - 1 event.
       * The weight of this function is dependent on the runtime, but generally this is very expensive.
       * We will treat this as a full block.
       * # </weight>
       **/
      setCode: AugmentedSubmittable<(code: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Set the new runtime code without doing any checks of the given `code`.
       * 
       * # <weight>
       * - `O(C)` where `C` length of `code`
       * - 1 storage write (codec `O(C)`).
       * - 1 event.
       * The weight of this function is dependent on the runtime. We will treat this as a full block.
       * # </weight>
       **/
      setCodeWithoutChecks: AugmentedSubmittable<(code: Bytes | string | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Set the number of pages in the WebAssembly environment's heap.
       * 
       * # <weight>
       * - `O(1)`
       * - 1 storage write.
       * - Base Weight: 1.405 µs
       * - 1 write to HEAP_PAGES
       * # </weight>
       **/
      setHeapPages: AugmentedSubmittable<(pages: u64 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Set some items of storage.
       * 
       * # <weight>
       * - `O(I)` where `I` length of `items`
       * - `I` storage writes (`O(1)`).
       * - Base Weight: 0.568 * i µs
       * - Writes: Number of items
       * # </weight>
       **/
      setStorage: AugmentedSubmittable<(items: Vec<KeyValue> | (KeyValue)[]) => SubmittableExtrinsic<ApiType>>;
      /**
       * Kill the sending account, assuming there are no references outstanding and the composite
       * data is equal to its default value.
       * 
       * # <weight>
       * - `O(1)`
       * - 1 storage read and deletion.
       * --------------------
       * Base Weight: 8.626 µs
       * No DB Read or Write operations because caller is already in overlay
       * # </weight>
       **/
      suicide: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>>;
    };
    technical: {
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
      createSwap: AugmentedSubmittable<(action: SwapAction | null) => SubmittableExtrinsic<ApiType>>;
    };
    templateModule: {
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
      /**
       * An example dispatchable that may throw a custom error.
       **/
      causeError: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>>;
      /**
       * An example dispatchable that takes a singles value as a parameter, writes the value to
       * storage and emits an event. This function must be dispatched by a signed extrinsic.
       **/
      doSomething: AugmentedSubmittable<(something: u32 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
    };
    timestamp: {
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
      /**
       * Set the current time.
       * 
       * This call should be invoked exactly once per block. It will panic at the finalization
       * phase, if this call hasn't been invoked by that time.
       * 
       * The timestamp should be greater than the previous one by the amount specified by
       * `MinimumPeriod`.
       * 
       * The dispatch origin for this call must be `Inherent`.
       * 
       * # <weight>
       * - `O(T)` where `T` complexity of `on_timestamp_set`
       * - 1 storage read and 1 storage mutation (codec `O(1)`). (because of `DidUpdate::take` in `on_finalize`)
       * - 1 event handler `on_timestamp_set` `O(T)`.
       * - Benchmark: 7.678 (min squares analysis)
       * - NOTE: This benchmark was done for a runtime with insignificant `on_timestamp_set` handlers.
       * New benchmarking is needed when adding new handlers.
       * # </weight>
       **/
      set: AugmentedSubmittable<(now: Compact<Moment> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
    };
    tokenDealer: {
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
      /**
       * Transfer `amount` of tokens to another parachain.
       **/
      transferTokensToParachainChain: AugmentedSubmittable<(paraId: u32 | AnyNumber | Uint8Array, dest: AccountId | string | Uint8Array, amount: BalanceOf | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
      /**
       * Transfer `amount` of tokens on the relay chain from the Parachain account to
       * the given `dest` account.
       **/
      transferTokensToRelayChain: AugmentedSubmittable<(dest: AccountId | string | Uint8Array, amount: BalanceOf | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
    };
    tradingPair: {
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
      /**
       * Register trading pair on the given DEX.
       * Can be only called by the DEX owner.
       * 
       * - `dex_id`: ID of the exchange.
       * - `base_asset_id`: base asset ID.
       * - `target_asset_id`: target asset ID.
       * 
       * TODO: add information about weight
       **/
      register: AugmentedSubmittable<(dexId: DEXId | AnyNumber | Uint8Array, baseAssetId: AssetId | AnyNumber | Uint8Array, targetAssetId: AssetId | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>>;
    };
  }

  export interface SubmittableExtrinsics<ApiType extends ApiTypes> extends AugmentedSubmittables<ApiType> {
    (extrinsic: Call | Extrinsic | Uint8Array | string): SubmittableExtrinsic<ApiType>;
    [key: string]: SubmittableModuleExtrinsics<ApiType>;
  }
}
