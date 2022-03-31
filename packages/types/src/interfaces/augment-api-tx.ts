// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

import type { Compact, Option, Text, Vec } from '@polkadot/types';
import type { AnyNumber } from '@polkadot/types/types';
import type { Extrinsic } from '@polkadot/types/interfaces/extrinsics';
import type { AccountId, AmountOf, AssetId, Balance, BalanceOf, Call, CurrencyIdOf, DEXId, FilterMode, LiquiditySourceType, LookupSource, Moment, SwapAmount, SwapVariant } from '@sora-substrate/types/interfaces/runtime';
import type { ApiTypes, SubmittableExtrinsic } from '@polkadot/api/types';

declare module '@polkadot/api/types/submittable' {
  export interface AugmentedSubmittables<ApiType> {
    balances: {
      /**
       * Exactly as `transfer`, except the origin must be root and the source account may be
       * specified.
       * # <weight>
       * - Same as transfer, but additional read and write because the source account is
       * not assumed to be in the overlay.
       * # </weight>
       **/
      forceTransfer: AugmentedSubmittable<(source: LookupSource | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, dest: LookupSource | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, value: Compact<Balance> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [LookupSource, LookupSource, Compact<Balance>]>;
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
      setBalance: AugmentedSubmittable<(who: LookupSource | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, newFree: Compact<Balance> | AnyNumber | Uint8Array, newReserved: Compact<Balance> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [LookupSource, Compact<Balance>, Compact<Balance>]>;
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
      transfer: AugmentedSubmittable<(dest: LookupSource | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, value: Compact<Balance> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [LookupSource, Compact<Balance>]>;
      /**
       * Same as the [`transfer`] call, but with a check that the transfer will not kill the
       * origin account.
       * 
       * 99% of the time you want [`transfer`] instead.
       * 
       * [`transfer`]: struct.Pallet.html#method.transfer
       * # <weight>
       * - Cheaper than transfer because account cannot be killed.
       * - Base Weight: 51.4 µs
       * - DB Weight: 1 Read and 1 Write to dest (sender is in overlay already)
       * #</weight>
       **/
      transferKeepAlive: AugmentedSubmittable<(dest: LookupSource | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, value: Compact<Balance> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [LookupSource, Compact<Balance>]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    currencies: {
      /**
       * Transfer some balance to another account under `currency_id`.
       * 
       * The dispatch origin for this call must be `Signed` by the
       * transactor.
       **/
      transfer: AugmentedSubmittable<(dest: LookupSource | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, currencyId: CurrencyIdOf | AnyNumber | Uint8Array, amount: Compact<BalanceOf> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [LookupSource, CurrencyIdOf, Compact<BalanceOf>]>;
      /**
       * Transfer some native currency to another account.
       * 
       * The dispatch origin for this call must be `Signed` by the
       * transactor.
       **/
      transferNativeCurrency: AugmentedSubmittable<(dest: LookupSource | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, amount: Compact<BalanceOf> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [LookupSource, Compact<BalanceOf>]>;
      /**
       * update amount of account `who` under `currency_id`.
       * 
       * The dispatch origin of this call must be _Root_.
       **/
      updateBalance: AugmentedSubmittable<(who: LookupSource | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, currencyId: CurrencyIdOf | AnyNumber | Uint8Array, amount: AmountOf | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [LookupSource, CurrencyIdOf, AmountOf]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    dexapi: {
      /**
       * Perform swap with specified parameters. Gateway for invoking liquidity source exchanges.
       * 
       * - `dex_id`: ID of the exchange.
       * - `liquidity_source_type`: Type of liquidity source to perform swap on.
       * - `input_asset_id`: ID of Asset to be deposited from sender account into pool reserves.
       * - `output_asset_id`: ID of Asset t0 be withdrawn from pool reserves into receiver account.
       * - `amount`: Either amount of desired input or output tokens, determined by `swap_variant` parameter.
       * - `limit`: Either maximum input amount or minimum output amount tolerated for successful swap,
       * determined by `swap_variant` parameter.
       * - `swap_variant`: Either 'WithDesiredInput' or 'WithDesiredOutput', indicates amounts purpose.
       * - `receiver`: Optional value, indicates AccountId for swap receiver. If not set, default is `sender`.
       **/
      swap: AugmentedSubmittable<(dexId: DEXId | AnyNumber | Uint8Array, liquiditySourceType: LiquiditySourceType | 'XYKPool' | 'BondingCurvePool' | 'MulticollateralBondingCurvePool' | 'MockPool' | 'MockPool2' | 'MockPool3' | 'MockPool4' | 'XSTPool' | number | Uint8Array, inputAssetId: AssetId | AnyNumber | Uint8Array, outputAssetId: AssetId | AnyNumber | Uint8Array, amount: Balance | AnyNumber | Uint8Array, limit: Balance | AnyNumber | Uint8Array, swapVariant: SwapVariant | 'WithDesiredInput' | 'WithDesiredOutput' | number | Uint8Array, receiver: Option<AccountId> | null | object | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [DEXId, LiquiditySourceType, AssetId, AssetId, Balance, Balance, SwapVariant, Option<AccountId>]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    farming: {
      migrateTo11: AugmentedSubmittable<() => SubmittableExtrinsic<ApiType>, []>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    irohaMigration: {
      migrate: AugmentedSubmittable<(irohaAddress: Text | string, irohaPublicKey: Text | string, irohaSignature: Text | string) => SubmittableExtrinsic<ApiType>, [Text, Text, Text]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    liquidityProxy: {
      /**
       * Perform swap of tokens (input/output defined via SwapAmount direction).
       * 
       * - `origin`: the account on whose behalf the transaction is being executed,
       * - `dex_id`: DEX ID for which liquidity sources aggregation is being done,
       * - `input_asset_id`: ID of the asset being sold,
       * - `output_asset_id`: ID of the asset being bought,
       * - `swap_amount`: the exact amount to be sold (either in input_asset_id or output_asset_id units with corresponding slippage tolerance absolute bound),
       * - `selected_source_types`: list of selected LiquiditySource types, selection effect is determined by filter_mode,
       * - `filter_mode`: indicate either to allow or forbid selected types only, or disable filtering.
       **/
      swap: AugmentedSubmittable<(dexId: DEXId | AnyNumber | Uint8Array, inputAssetId: AssetId | AnyNumber | Uint8Array, outputAssetId: AssetId | AnyNumber | Uint8Array, swapAmount: SwapAmount | { WithDesiredInput: any } | { WithDesiredOutput: any } | string | Uint8Array, selectedSourceTypes: Vec<LiquiditySourceType> | (LiquiditySourceType | 'XYKPool' | 'BondingCurvePool' | 'MulticollateralBondingCurvePool' | 'MockPool' | 'MockPool2' | 'MockPool3' | 'MockPool4' | 'XSTPool' | number | Uint8Array)[], filterMode: FilterMode | 'Disabled' | 'ForbidSelected' | 'AllowSelected' | number | Uint8Array) => SubmittableExtrinsic<ApiType>, [DEXId, AssetId, AssetId, SwapAmount, Vec<LiquiditySourceType>, FilterMode]>;
      /**
       * Perform swap of tokens (input/output defined via SwapAmount direction).
       * 
       * - `origin`: the account on whose behalf the transaction is being executed,
       * - `receiver`: the account that receives the output,
       * - `dex_id`: DEX ID for which liquidity sources aggregation is being done,
       * - `input_asset_id`: ID of the asset being sold,
       * - `output_asset_id`: ID of the asset being bought,
       * - `swap_amount`: the exact amount to be sold (either in input_asset_id or output_asset_id units with corresponding slippage tolerance absolute bound),
       * - `selected_source_types`: list of selected LiquiditySource types, selection effect is determined by filter_mode,
       * - `filter_mode`: indicate either to allow or forbid selected types only, or disable filtering.
       **/
      swapTransfer: AugmentedSubmittable<(receiver: AccountId | string | Uint8Array, dexId: DEXId | AnyNumber | Uint8Array, inputAssetId: AssetId | AnyNumber | Uint8Array, outputAssetId: AssetId | AnyNumber | Uint8Array, swapAmount: SwapAmount | { WithDesiredInput: any } | { WithDesiredOutput: any } | string | Uint8Array, selectedSourceTypes: Vec<LiquiditySourceType> | (LiquiditySourceType | 'XYKPool' | 'BondingCurvePool' | 'MulticollateralBondingCurvePool' | 'MockPool' | 'MockPool2' | 'MockPool3' | 'MockPool4' | 'XSTPool' | number | Uint8Array)[], filterMode: FilterMode | 'Disabled' | 'ForbidSelected' | 'AllowSelected' | number | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId, DEXId, AssetId, AssetId, SwapAmount, Vec<LiquiditySourceType>, FilterMode]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    referrals: {
      /**
       * Reserves the balance from the account for a special balance that can be used to pay referrals' fees
       **/
      reserve: AugmentedSubmittable<(balance: Balance | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Balance]>;
      /**
       * Sets the referrer for the account
       **/
      setReferrer: AugmentedSubmittable<(referrer: AccountId | string | Uint8Array) => SubmittableExtrinsic<ApiType>, [AccountId]>;
      /**
       * Unreserves the balance and transfers it back to the account
       **/
      unreserve: AugmentedSubmittable<(balance: Balance | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Balance]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    timestamp: {
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
       * - `O(1)` (Note that implementations of `OnTimestampSet` must also be `O(1)`)
       * - 1 storage read and 1 storage mutation (codec `O(1)`). (because of `DidUpdate::take` in `on_finalize`)
       * - 1 event handler `on_timestamp_set`. Must be `O(1)`.
       * # </weight>
       **/
      set: AugmentedSubmittable<(now: Compact<Moment> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [Compact<Moment>]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    tradingPair: {
      /**
       * Register trading pair on the given DEX.
       * Can be only called by the DEX owner.
       * 
       * - `dex_id`: ID of the exchange.
       * - `base_asset_id`: base asset ID.
       * - `target_asset_id`: target asset ID.
       **/
      register: AugmentedSubmittable<(dexId: DEXId | AnyNumber | Uint8Array, baseAssetId: AssetId | AnyNumber | Uint8Array, targetAssetId: AssetId | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [DEXId, AssetId, AssetId]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
  }

  export interface SubmittableExtrinsics<ApiType extends ApiTypes> extends AugmentedSubmittables<ApiType> {
    (extrinsic: Call | Extrinsic | Uint8Array | string): SubmittableExtrinsic<ApiType>;
    [key: string]: SubmittableModuleExtrinsics<ApiType>;
  }
}
