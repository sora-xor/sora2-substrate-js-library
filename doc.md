# API Calls

**Table of Contents (Pallets)**

- [substrate](#substrate-pallet)
- [system](#system-pallet)
- [timestamp](#timestamp-pallet)
- [balances](#balances-pallet)
- [randomnessCollectiveFlip](#randomnesscollectiveflip-pallet)
- [transactionPayment](#transactionpayment-pallet)
- [permissions](#permissions-pallet)
- [referrals](#referrals-pallet)
- [rewards](#rewards-pallet)
- [xorFee](#xorfee-pallet)
- [bridgeMultisig](#bridgemultisig-pallet)
- [session](#session-pallet)
- [babe](#babe-pallet)
- [grandpa](#grandpa-pallet)
- [authorship](#authorship-pallet)
- [staking](#staking-pallet)
- [tokens](#tokens-pallet)
- [tradingPair](#tradingpair-pallet)
- [assets](#assets-pallet)
- [dexManager](#dexmanager-pallet)
- [multicollateralBondingCurvePool](#multicollateralbondingcurvepool-pallet)
- [poolXyk](#poolxyk-pallet)
- [council](#council-pallet)
- [technicalCommittee](#technicalcommittee-pallet)
- [democracy](#democracy-pallet)
- [dexapi](#dexapi-pallet)
- [ethBridge](#ethbridge-pallet)
- [pswapDistribution](#pswapdistribution-pallet)
- [multisig](#multisig-pallet)
- [scheduler](#scheduler-pallet)
- [irohaMigration](#irohamigration-pallet)
- [imOnline](#imonline-pallet)
- [offences](#offences-pallet)
- [technicalMembership](#technicalmembership-pallet)
- [electionsPhragmen](#electionsphragmen-pallet)
- [vestedRewards](#vestedrewards-pallet)
- [identity](#identity-pallet)
- [farming](#farming-pallet)
- [xstPool](#xstpool-pallet)
- [priceTools](#pricetools-pallet)
- [ceresStaking](#ceresstaking-pallet)
- [ceresLiquidityLocker](#ceresliquiditylocker-pallet)
- [ceresTokenLocker](#cerestokenlocker-pallet)
- [ceresGovernancePlatform](#ceresgovernanceplatform-pallet)
- [ceresLaunchpad](#cereslaunchpad-pallet)
- [utility](#utility-pallet)
- [currencies](#currencies-pallet)
- [liquidityProxy](#liquidityproxy-pallet)
- [rpc](#rpc-pallet)
- [author](#author-pallet)
- [chain](#chain-pallet)
- [childstate](#childstate-pallet)
- [offchain](#offchain-pallet)
- [payment](#payment-pallet)
- [state](#state-pallet)
- [dexApi](#dexapi-pallet)

## Substrate pallet

### _State Queries_

#### **api.query.substrate.changesTrieConfig**

> Changes trie configuration is stored under this key.

arguments: -

returns: `u32`

<hr>

#### **api.query.substrate.childStorageKeyPrefix**

> Prefix of child storage keys.

arguments: -

returns: `u32`

<hr>

#### **api.query.substrate.code**

> Wasm code of the runtime.

arguments: -

returns: `Bytes`

<hr>

#### **api.query.substrate.extrinsicIndex**

> Current extrinsic index (u32) is stored under this key.

arguments: -

returns: `u32`

<hr>

#### **api.query.substrate.heapPages**

> Number of wasm linear memory pages required for execution of the runtime.

arguments: -

returns: `u64`

<hr>

## System pallet

### _State Queries_

#### **api.query.system.account**

> The full account information for a particular account ID.

arguments:

- key: `AccountId`

returns: `AccountInfo`

<hr>

#### **api.query.system.extrinsicCount**

> Total extrinsics count for the current block.

arguments: -

returns: `u32`

<hr>

#### **api.query.system.blockWeight**

> The current weight for the block.

arguments: -

returns: `ConsumedWeight`

<hr>

#### **api.query.system.allExtrinsicsLen**

> Total length (in bytes) for all extrinsics put together, for the current block.

arguments: -

returns: `u32`

<hr>

#### **api.query.system.blockHash**

> Map of block numbers to block hashes.

arguments:

- key: `BlockNumber`

returns: `Hash`

<hr>

#### **api.query.system.extrinsicData**

> Extrinsics data for the current block (maps an extrinsic's index to its data).

arguments:

- key: `u32`

returns: `Bytes`

<hr>

#### **api.query.system.number**

> The current block number being processed. Set by `execute_block`.

arguments: -

returns: `BlockNumber`

<hr>

#### **api.query.system.parentHash**

> Hash of the previous block.

arguments: -

returns: `Hash`

<hr>

#### **api.query.system.digest**

> Digest of the current block, also part of the block header.

arguments: -

returns: `DigestOf`

<hr>

#### **api.query.system.events**

> Events deposited for the current block.

arguments: -

returns: `Vec<EventRecord>`

<hr>

#### **api.query.system.eventCount**

> The number of events in the `Events<T>` list.

arguments: -

returns: `EventIndex`

<hr>

#### **api.query.system.eventTopics**

> Mapping between a topic (represented by T::Hash) and a vector of indexes
> of events in the `<Events<T>>` list.
>
> All topic vectors have deterministic storage locations depending on the topic. This
> allows light-clients to leverage the changes trie storage tracking mechanism and
> in case of changes fetch the list of events of interest.
>
> The value has the type `(T::BlockNumber, EventIndex)` because if we used only just
> the `EventIndex` then in case if the topic has the same contents on the next block
> no notification will be triggered thus the event might be lost.

arguments:

- key: `Hash`

returns: `Vec<(BlockNumber,EventIndex)>`

<hr>

#### **api.query.system.lastRuntimeUpgrade**

> Stores the `spec_version` and `spec_name` of when the last runtime upgrade happened.

arguments: -

returns: `LastRuntimeUpgradeInfo`

<hr>

#### **api.query.system.upgradedToU32RefCount**

> True if we have upgraded so that `type RefCount` is `u32`. False (default) if not.

arguments: -

returns: `bool`

<hr>

#### **api.query.system.upgradedToDualRefCount**

> True if we have upgraded so that AccountInfo contains two types of `RefCount`. False
> (default) if not.

arguments: -

returns: `bool`

<hr>

#### **api.query.system.executionPhase**

> The execution phase of the block.

arguments: -

returns: `Phase`

<hr>

### _Extrinsics_

#### **api.tx.system.fillBlock**

> A dispatch that will fill the block weight up to the given ratio.

arguments:

- \_ratio: `Perbill`
<hr>

#### **api.tx.system.remark**

> Make some on-chain remark.
>
> # <weight>
>
> - `O(1)`
> - Base Weight: 0.665 µs, independent of remark length.
> - No DB operations.
>
> # </weight>

arguments:

- \_remark: `Bytes`
<hr>

#### **api.tx.system.setHeapPages**

> Set the number of pages in the WebAssembly environment's heap.
>
> # <weight>
>
> - `O(1)`
> - 1 storage write.
> - Base Weight: 1.405 µs
> - 1 write to HEAP_PAGES
>
> # </weight>

arguments:

- pages: `u64`
<hr>

#### **api.tx.system.setCode**

> Set the new runtime code.
>
> # <weight>
>
> - `O(C + S)` where `C` length of `code` and `S` complexity of `can_set_code`
> - 1 storage write (codec `O(C)`).
> - 1 call to `can_set_code`: `O(S)` (calls `sp_io::misc::runtime_version` which is expensive).
> - 1 event.
>   The weight of this function is dependent on the runtime, but generally this is very expensive.
>   We will treat this as a full block.
>
> # </weight>

arguments:

- code: `Bytes`
<hr>

#### **api.tx.system.setCodeWithoutChecks**

> Set the new runtime code without doing any checks of the given `code`.
>
> # <weight>
>
> - `O(C)` where `C` length of `code`
> - 1 storage write (codec `O(C)`).
> - 1 event.
>   The weight of this function is dependent on the runtime. We will treat this as a full block.
>
> # </weight>

arguments:

- code: `Bytes`
<hr>

#### **api.tx.system.setChangesTrieConfig**

> Set the new changes trie configuration.
>
> # <weight>
>
> - `O(1)`
> - 1 storage write or delete (codec `O(1)`).
> - 1 call to `deposit_log`: Uses `append` API, so O(1)
> - Base Weight: 7.218 µs
> - DB Weight:
>   - Writes: Changes Trie, System Digest
>
> # </weight>

arguments:

- changes_trie_config: `Option<ChangesTrieConfiguration>`
<hr>

#### **api.tx.system.setStorage**

> Set some items of storage.
>
> # <weight>
>
> - `O(I)` where `I` length of `items`
> - `I` storage writes (`O(1)`).
> - Base Weight: 0.568 \* i µs
> - Writes: Number of items
>
> # </weight>

arguments:

- items: `Vec<KeyValue>`
<hr>

#### **api.tx.system.killStorage**

> Kill some items from storage.
>
> # <weight>
>
> - `O(IK)` where `I` length of `keys` and `K` length of one key
> - `I` storage deletions.
> - Base Weight: .378 \* i µs
> - Writes: Number of items
>
> # </weight>

arguments:

- keys: `Vec<Key>`
<hr>

#### **api.tx.system.killPrefix**

> Kill all storage items with a key that starts with the given prefix.
>
> **NOTE:** We rely on the Root origin to provide us the number of subkeys under
> the prefix we are removing to accurately calculate the weight of this function.
>
> # <weight>
>
> - `O(P)` where `P` amount of keys with prefix `prefix`
> - `P` storage deletions.
> - Base Weight: 0.834 \* P µs
> - Writes: Number of subkeys + 1
>
> # </weight>

arguments:

- prefix: `Key`
- \_subkeys: `u32`
<hr>

### _Custom RPCs_

#### **api.rpc.system.accountNextIndex**

> Retrieves the next accountIndex as available on the node

arguments:

- accountId: `AccountId`

returns: `Index`

<hr>

#### **api.rpc.system.dryRun**

> Dry run an extrinsic at a given block

arguments:

- extrinsic: `Bytes`
- at: `BlockHash`

returns: `ApplyExtrinsicResult`

<hr>

#### **api.rpc.system.name**

> Retrieves the node name

arguments: -

returns: `Text`

<hr>

#### **api.rpc.system.version**

> Retrieves the version of the node

arguments: -

returns: `Text`

<hr>

#### **api.rpc.system.chain**

> Retrieves the chain

arguments: -

returns: `Text`

<hr>

#### **api.rpc.system.chainType**

> Retrieves the chain type

arguments: -

returns: `ChainType`

<hr>

#### **api.rpc.system.properties**

> Get a custom set of properties as a JSON object, defined in the chain spec

arguments: -

returns: `ChainProperties`

<hr>

#### **api.rpc.system.health**

> Return health status of the node

arguments: -

returns: `Health`

<hr>

#### **api.rpc.system.localPeerId**

> Returns the base58-encoded PeerId of the node

arguments: -

returns: `Text`

<hr>

#### **api.rpc.system.localListenAddresses**

> The addresses include a trailing /p2p/ with the local PeerId, and are thus suitable to be passed to addReservedPeer or as a bootnode address for example

arguments: -

returns: `Vec<Text>`

<hr>

#### **api.rpc.system.peers**

> Returns the currently connected peers

arguments: -

returns: `Vec<PeerInfo>`

<hr>

#### **api.rpc.system.addReservedPeer**

> Adds a reserved peer

arguments:

- peer: `Text`

returns: `Text`

<hr>

#### **api.rpc.system.removeReservedPeer**

> Remove a reserved peer

arguments:

- peerId: `Text`

returns: `Text`

<hr>

#### **api.rpc.system.nodeRoles**

> Returns the roles the node is running as

arguments: -

returns: `Vec<NodeRole>`

<hr>

#### **api.rpc.system.syncState**

> Returns the state of the syncing of the node

arguments: -

returns: `SyncState`

<hr>

#### **api.rpc.system.addLogFilter**

> Adds the supplied directives to the current log filter

arguments:

- directives: `Text`

returns: `Null`

<hr>

#### **api.rpc.system.resetLogFilter**

> Resets the log filter to Substrate defaults

arguments: -

returns: `Null`

<hr>

## Timestamp pallet

### _State Queries_

#### **api.query.timestamp.now**

> Current time for the current block.

arguments: -

returns: `Moment`

<hr>

#### **api.query.timestamp.didUpdate**

> Did the timestamp get updated in this block?

arguments: -

returns: `bool`

<hr>

### _Extrinsics_

#### **api.tx.timestamp.set**

> Set the current time.
>
> This call should be invoked exactly once per block. It will panic at the finalization
> phase, if this call hasn't been invoked by that time.
>
> The timestamp should be greater than the previous one by the amount specified by
> `MinimumPeriod`.
>
> The dispatch origin for this call must be `Inherent`.
>
> # <weight>
>
> - `O(1)` (Note that implementations of `OnTimestampSet` must also be `O(1)`)
> - 1 storage read and 1 storage mutation (codec `O(1)`). (because of `DidUpdate::take` in `on_finalize`)
> - 1 event handler `on_timestamp_set`. Must be `O(1)`.
>
> # </weight>

arguments:

- now: `Compact<Moment>`
<hr>

## Balances pallet

### _State Queries_

#### **api.query.balances.totalIssuance**

> The total units issued in the system.

arguments: -

returns: `Balance`

<hr>

#### **api.query.balances.account**

> The balance of an account.
>
> NOTE: This is only used in the case that this pallet is used to store balances.

arguments:

- key: `AccountId`

returns: `AccountData`

<hr>

#### **api.query.balances.locks**

> Any liquidity locks on some account balances.
> NOTE: Should only be accessed when setting, changing and freeing a lock.

arguments:

- key: `AccountId`

returns: `Vec<BalanceLock>`

<hr>

#### **api.query.balances.storageVersion**

> Storage version of the pallet.
>
> This is set to v2.0.0 for new networks.

arguments: -

returns: `Releases`

<hr>

### _Extrinsics_

#### **api.tx.balances.transfer**

> Transfer some liquid free balance to another account.
>
> `transfer` will set the `FreeBalance` of the sender and receiver.
> It will decrease the total issuance of the system by the `TransferFee`.
> If the sender's account is below the existential deposit as a result
> of the transfer, the account will be reaped.
>
> The dispatch origin for this call must be `Signed` by the transactor.
>
> # <weight>
>
> - Dependent on arguments but not critical, given proper implementations for
>   input config types. See related functions below.
> - It contains a limited number of reads and writes internally and no complex computation.
>
> Related functions:
>
> - `ensure_can_withdraw` is always called internally but has a bounded complexity.
> - Transferring balances to accounts that did not exist before will cause
>   `T::OnNewAccount::on_new_account` to be called.
> - Removing enough funds from an account will trigger `T::DustRemoval::on_unbalanced`.
> - `transfer_keep_alive` works the same way as `transfer`, but has an additional
>   check that the transfer will not kill the origin account.
>
> ---
>
> - Base Weight: 73.64 µs, worst case scenario (account created, account removed)
> - DB Weight: 1 Read and 1 Write to destination account
> - Origin account is already in memory, so no DB operations for them.
>
> # </weight>

arguments:

- dest: `LookupSource`
- value: `Compact<Balance>`
<hr>

#### **api.tx.balances.setBalance**

> Set the balances of a given account.
>
> This will alter `FreeBalance` and `ReservedBalance` in storage. it will
> also decrease the total issuance of the system (`TotalIssuance`).
> If the new free or reserved balance is below the existential deposit,
> it will reset the account nonce (`frame_system::AccountNonce`).
>
> The dispatch origin for this call is `root`.
>
> # <weight>
>
> - Independent of the arguments.
> - Contains a limited number of reads and writes.
>
> ---
>
> - Base Weight:
>   - Creating: 27.56 µs
>   - Killing: 35.11 µs
> - DB Weight: 1 Read, 1 Write to `who`
>
> # </weight>

arguments:

- who: `LookupSource`
- new_free: `Compact<Balance>`
- new_reserved: `Compact<Balance>`
<hr>

#### **api.tx.balances.forceTransfer**

> Exactly as `transfer`, except the origin must be root and the source account may be
> specified.
>
> # <weight>
>
> - Same as transfer, but additional read and write because the source account is
>   not assumed to be in the overlay.
>
> # </weight>

arguments:

- source: `LookupSource`
- dest: `LookupSource`
- value: `Compact<Balance>`
<hr>

#### **api.tx.balances.transferKeepAlive**

> Same as the [`transfer`] call, but with a check that the transfer will not kill the
> origin account.
>
> 99% of the time you want [`transfer`] instead.
>
> [`transfer`]: struct.Pallet.html#method.transfer
>
> # <weight>
>
> - Cheaper than transfer because account cannot be killed.
> - Base Weight: 51.4 µs
> - DB Weight: 1 Read and 1 Write to dest (sender is in overlay already) #</weight>

arguments:

- dest: `LookupSource`
- value: `Compact<Balance>`
<hr>

## RandomnessCollectiveFlip pallet

### _State Queries_

#### **api.query.randomnessCollectiveFlip.randomMaterial**

> Series of block headers from the last 81 blocks that acts as random seed material. This
> is arranged as a ring buffer with `block_number % 81` being the index into the `Vec` of
> the oldest hash.

arguments: -

returns: `Vec<Hash>`

<hr>

## TransactionPayment pallet

### _State Queries_

#### **api.query.transactionPayment.nextFeeMultiplier**

arguments: -

returns: `Multiplier`

<hr>

#### **api.query.transactionPayment.storageVersion**

arguments: -

returns: `Releases`

<hr>

## Permissions pallet

### _State Queries_

#### **api.query.permissions.owners**

arguments:

- key1: `PermissionId`
- key2: `Scope`

returns: `Vec<OwnerId>`

<hr>

#### **api.query.permissions.permissions**

arguments:

- key1: `HolderId`
- key2: `Scope`

returns: `Vec<PermissionId>`

<hr>

## Referrals pallet

### _State Queries_

#### **api.query.referrals.referrers**

arguments:

- key: `AccountId`

returns: `AccountId`

<hr>

#### **api.query.referrals.referrerBalances**

arguments:

- key: `AccountId`

returns: `Balance`

<hr>

#### **api.query.referrals.referrals**

arguments:

- key: `AccountId`

returns: `Vec<AccountId>`

<hr>

### _Extrinsics_

#### **api.tx.referrals.reserve**

> Reserves the balance from the account for a special balance that can be used to pay referrals' fees

arguments:

- balance: `Balance`
<hr>

#### **api.tx.referrals.unreserve**

> Unreserves the balance and transfers it back to the account

arguments:

- balance: `Balance`
<hr>

#### **api.tx.referrals.setReferrer**

> Sets the referrer for the account

arguments:

- referrer: `AccountId`
<hr>

## Rewards pallet

### _State Queries_

#### **api.query.rewards.reservesAcc**

arguments: -

returns: `TechAccountId`

<hr>

#### **api.query.rewards.valOwners**

> A map EthAddresses -> RewardInfo, that is claimable and remaining vested amounts per address

arguments:

- key: `EthereumAddress`

returns: `RewardInfo`

<hr>

#### **api.query.rewards.pswapFarmOwners**

arguments:

- key: `EthereumAddress`

returns: `Balance`

<hr>

#### **api.query.rewards.pswapWaifuOwners**

arguments:

- key: `EthereumAddress`

returns: `Balance`

<hr>

#### **api.query.rewards.valBurnedSinceLastVesting**

> Amount of VAL burned since last vesting

arguments: -

returns: `Balance`

<hr>

#### **api.query.rewards.currentClaimableVal**

> Amount of VAL currently being vested (aggregated over the previous period of 14,400 blocks)

arguments: -

returns: `Balance`

<hr>

#### **api.query.rewards.ethAddresses**

> All addresses are split in batches, `AddressBatches` maps batch number to a set of addresses

arguments:

- key: `u32`

returns: `Vec<EthereumAddress>`

<hr>

#### **api.query.rewards.totalValRewards**

> Total amount of VAL rewards either claimable now or some time in the future

arguments: -

returns: `Balance`

<hr>

#### **api.query.rewards.totalClaimableVal**

> Total amount of VAL that can be claimed by users at current point in time

arguments: -

returns: `Balance`

<hr>

#### **api.query.rewards.migrationPending**

> A flag indicating whether VAL rewards data migration has been finalized

arguments: -

returns: `bool`

<hr>

### _Extrinsics_

#### **api.tx.rewards.claim**

arguments:

- signature: `Bytes`
<hr>

#### **api.tx.rewards.finalizeStorageMigration**

> Finalize the update of unclaimed VAL data in storage

arguments:

- amounts: `Vec<(EthereumAddress,Balance)>`
<hr>

### _Custom RPCs_

#### **api.rpc.rewards.claimables**

> Get claimable rewards

arguments:

- eth_address: `EthAddress`
- at: `BlockHash`

returns: `Vec<BalanceInfo>`

<hr>

## XorFee pallet

### _State Queries_

#### **api.query.xorFee.xorToVal**

> The amount of XOR to be reminted and exchanged for VAL at the end of the session

arguments: -

returns: `Balance`

<hr>

## BridgeMultisig pallet

### _State Queries_

#### **api.query.bridgeMultisig.accounts**

> Multisignature accounts.

arguments:

- key: `AccountId`

returns: `MultisigAccount`

<hr>

#### **api.query.bridgeMultisig.multisigs**

> The set of open multisig operations.

arguments:

- key1: `AccountId`
- key2: `[u8;32]`

returns: `Multisig`

<hr>

#### **api.query.bridgeMultisig.calls**

arguments:

- key: `[u8;32]`

returns: `(OpaqueCall,AccountId,BalanceOf)`

<hr>

#### **api.query.bridgeMultisig.dispatchedCalls**

arguments:

- key1: `[u8;32]`
- key2: `BridgeTimepoint`

returns: `()`

<hr>

### _Extrinsics_

#### **api.tx.bridgeMultisig.registerMultisig**

> Create a new multisig account.
> TODO: update weights for `register_multisig`
>
> # <weight>
>
> Key: M - length of members,
>
> - One storage reads - O(1)
> - One search in sorted list - O(logM)
> - Confirmation that the list is sorted - O(M)
> - One storage writes - O(1)
> - One event
>   Total Complexity: O(M + logM)
>
> # <weight>

arguments:

- signatories: `Vec<AccountId>`
<hr>

#### **api.tx.bridgeMultisig.removeSignatory**

> Remove the signatory from the multisig account.
> Can only be called by a multisig account.
>
> TODO: update weights for `remove_signatory`
>
> # <weight>
>
> Key: length of members in multisigConfig: M
>
> - One storage reads - O(1)
> - remove items in list - O(M)
>   Total complexity - O(M)
>
> # <weight>

arguments:

- signatory: `AccountId`
<hr>

#### **api.tx.bridgeMultisig.addSignatory**

> Add a new signatory to the multisig account.
> Can only be called by a multisig account.
>
> TODO: update weights for `add_signatory`
>
> # <weight>
>
> Key: length of members in multisigConfig: M
>
> - One storage read - O(1)
> - search in members - O(M)
> - Storage write - O(M)
>   Total complexity - O(M)
>
> # <weight>

arguments:

- new_member: `AccountId`
<hr>

#### **api.tx.bridgeMultisig.asMultiThreshold1**

> Immediately dispatch a multi-signature call using a single approval from the caller.
>
> The dispatch origin for this call must be _Signed_.
>
> - `other_signatories`: The accounts (other than the sender) who are part of the
>   multi-signature, but do not participate in the approval process.
> - `call`: The call to be executed.
>
> Result is equivalent to the dispatched result.
>
> # <weight>
>
> ## O(Z + C) where Z is the length of the call and C its execution weight.
>
> - Base Weight: 33.72 + 0.002 \* Z µs
> - DB Weight: None
> - Plus Call Weight
>
> # </weight>

arguments:

- id: `AccountId`
- call: `Call`
- timepoint: `BridgeTimepoint`
<hr>

#### **api.tx.bridgeMultisig.asMulti**

> Register approval for a dispatch to be made from a deterministic composite account if
> approved by a total of `threshold - 1` of `other_signatories`.
>
> If there are enough, then dispatch the call.
>
> Payment: `DepositBase` will be reserved if this is the first approval, plus
> `threshold` times `DepositFactor`. It is returned once this dispatch happens or
> is cancelled.
>
> The dispatch origin for this call must be _Signed_.
>
> - `threshold`: The total number of approvals for this dispatch before it is executed.
> - `other_signatories`: The accounts (other than the sender) who can approve this
>   dispatch. May not be empty.
> - `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
>   not the first approval, then it must be `Some`, with the timepoint (block number and
>   transaction index) of the first approval transaction.
> - `call`: The call to be executed.
>
> NOTE: Unless this is the final approval, you will generally want to use
> `approve_as_multi` instead, since it only requires a hash of the call.
>
> Result is equivalent to the dispatched result if `threshold` is exactly `1`. Otherwise
> on success, result is `Ok` and the result from the interior call, if it was executed,
> may be found in the deposited `MultisigExecuted` event.
>
> # <weight>
>
> - `O(S + Z + Call)`.
> - Up to one balance-reserve or unreserve operation.
> - One passthrough operation, one insert, both `O(S)` where `S` is the number of
>   signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
> - One call encode & hash, both of complexity `O(Z)` where `Z` is tx-len.
> - One encode & hash, both of complexity `O(S)`.
> - Up to one binary search and insert (`O(logS + S)`).
> - I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
> - One event.
> - The weight of the `call`.
> - Storage: inserts one item, value size bounded by `MaxSignatories`, with a
>   deposit taken for its lifetime of
>   `DepositBase + threshold * DepositFactor`.
>
> ---
>
> - Base Weight:
>   - Create: 41.89 + 0.118 _ S + .002 _ Z µs
>   - Create w/ Store: 53.57 + 0.119 _ S + .003 _ Z µs
>   - Approve: 31.39 + 0.136 _ S + .002 _ Z µs
>   - Complete: 39.94 + 0.26 _ S + .002 _ Z µs
> - DB Weight:
>   - Reads: Multisig Storage, [Caller Account], Calls (if `store_call`)
>   - Writes: Multisig Storage, [Caller Account], Calls (if `store_call`)
> - Plus Call Weight
>
> # </weight>

arguments:

- id: `AccountId`
- maybe_timepoint: `Option<BridgeTimepoint>`
- call: `OpaqueCall`
- store_call: `bool`
- max_weight: `Weight`
<hr>

#### **api.tx.bridgeMultisig.approveAsMulti**

> Register approval for a dispatch to be made from a deterministic composite account if
> approved by a total of `threshold - 1` of `other_signatories`.
>
> Payment: `DepositBase` will be reserved if this is the first approval, plus
> `threshold` times `DepositFactor`. It is returned once this dispatch happens or
> is cancelled.
>
> The dispatch origin for this call must be _Signed_.
>
> - `threshold`: The total number of approvals for this dispatch before it is executed.
> - `other_signatories`: The accounts (other than the sender) who can approve this
>   dispatch. May not be empty.
> - `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
>   not the first approval, then it must be `Some`, with the timepoint (block number and
>   transaction index) of the first approval transaction.
> - `call_hash`: The hash of the call to be executed.
>
> NOTE: If this is the final approval, you will want to use `as_multi` instead.
>
> # <weight>
>
> - `O(S)`.
> - Up to one balance-reserve or unreserve operation.
> - One passthrough operation, one insert, both `O(S)` where `S` is the number of
>   signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
> - One encode & hash, both of complexity `O(S)`.
> - Up to one binary search and insert (`O(logS + S)`).
> - I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
> - One event.
> - Storage: inserts one item, value size bounded by `MaxSignatories`, with a
>   deposit taken for its lifetime of
>   `DepositBase + threshold * DepositFactor`.
>
> ---
>
> - Base Weight:
>   - Create: 44.71 + 0.088 \* S
>   - Approve: 31.48 + 0.116 \* S
> - DB Weight:
>   - Read: Multisig Storage, [Caller Account]
>   - Write: Multisig Storage, [Caller Account]
>
> # </weight>

arguments:

- id: `AccountId`
- maybe_timepoint: `Option<BridgeTimepoint>`
- call_hash: `[u8;32]`
- max_weight: `Weight`
<hr>

#### **api.tx.bridgeMultisig.cancelAsMulti**

> Cancel a pre-existing, on-going multisig transaction. Any deposit reserved previously
> for this operation will be unreserved on success.
>
> The dispatch origin for this call must be _Signed_.
>
> - `threshold`: The total number of approvals for this dispatch before it is executed.
> - `other_signatories`: The accounts (other than the sender) who can approve this
>   dispatch. May not be empty.
> - `timepoint`: The timepoint (block number and transaction index) of the first approval
>   transaction for this dispatch.
> - `call_hash`: The hash of the call to be executed.
>
> # <weight>
>
> - `O(S)`.
> - Up to one balance-reserve or unreserve operation.
> - One passthrough operation, one insert, both `O(S)` where `S` is the number of
>   signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
> - One encode & hash, both of complexity `O(S)`.
> - One event.
> - I/O: 1 read `O(S)`, one remove.
> - Storage: removes one item.
>
> ---
>
> - Base Weight: 36.07 + 0.124 \* S
> - DB Weight:
>   - Read: Multisig Storage, [Caller Account], Refund Account, Calls
>   - Write: Multisig Storage, [Caller Account], Refund Account, Calls
>
> # </weight>

arguments:

- id: `AccountId`
- timepoint: `BridgeTimepoint`
- call_hash: `[u8;32]`
<hr>

## Session pallet

### _State Queries_

#### **api.query.session.validators**

> The current set of validators.

arguments: -

returns: `Vec<ValidatorId>`

<hr>

#### **api.query.session.currentIndex**

> Current index of the session.

arguments: -

returns: `SessionIndex`

<hr>

#### **api.query.session.queuedChanged**

> True if the underlying economic identities or weighting behind the validators
> has changed in the queued validator set.

arguments: -

returns: `bool`

<hr>

#### **api.query.session.queuedKeys**

> The queued keys for the next session. When the next session begins, these keys
> will be used to determine the validator's session keys.

arguments: -

returns: `Vec<(ValidatorId,Keys)>`

<hr>

#### **api.query.session.disabledValidators**

> Indices of disabled validators.
>
> The set is cleared when `on_session_ending` returns a new set of identities.

arguments: -

returns: `Vec<u32>`

<hr>

#### **api.query.session.nextKeys**

> The next session keys for a validator.

arguments:

- key: `ValidatorId`

returns: `Keys`

<hr>

#### **api.query.session.keyOwner**

> The owner of a key. The key is the `KeyTypeId` + the encoded key.

arguments:

- key: `(KeyTypeId,Bytes)`

returns: `ValidatorId`

<hr>

### _Extrinsics_

#### **api.tx.session.setKeys**

> Sets the session key(s) of the function caller to `keys`.
> Allows an account to set its session key prior to becoming a validator.
> This doesn't take effect until the next session.
>
> The dispatch origin of this function must be signed.
>
> # <weight>
>
> - Complexity: `O(1)`
>   Actual cost depends on the number of length of `T::Keys::key_ids()` which is fixed.
> - DbReads: `origin account`, `T::ValidatorIdOf`, `NextKeys`
> - DbWrites: `origin account`, `NextKeys`
> - DbReads per key id: `KeyOwner`
> - DbWrites per key id: `KeyOwner`
>
> # </weight>

arguments:

- keys: `Keys`
- proof: `Bytes`
<hr>

#### **api.tx.session.purgeKeys**

> Removes any session key(s) of the function caller.
> This doesn't take effect until the next session.
>
> The dispatch origin of this function must be signed.
>
> # <weight>
>
> - Complexity: `O(1)` in number of key types.
>   Actual cost depends on the number of length of `T::Keys::key_ids()` which is fixed.
> - DbReads: `T::ValidatorIdOf`, `NextKeys`, `origin account`
> - DbWrites: `NextKeys`, `origin account`
> - DbWrites per key id: `KeyOwnder`
>
> # </weight>

arguments: -

<hr>

## Babe pallet

### _State Queries_

#### **api.query.babe.epochIndex**

> Current epoch index.

arguments: -

returns: `u64`

<hr>

#### **api.query.babe.authorities**

> Current epoch authorities.

arguments: -

returns: `Vec<(AuthorityId,BabeAuthorityWeight)>`

<hr>

#### **api.query.babe.genesisSlot**

> The slot at which the first epoch actually started. This is 0
> until the first block of the chain.

arguments: -

returns: `Slot`

<hr>

#### **api.query.babe.currentSlot**

> Current slot number.

arguments: -

returns: `Slot`

<hr>

#### **api.query.babe.randomness**

> The epoch randomness for the _current_ epoch.
>
> # Security
>
> This MUST NOT be used for gambling, as it can be influenced by a
> malicious validator in the short term. It MAY be used in many
> cryptographic protocols, however, so long as one remembers that this
> (like everything else on-chain) it is public. For example, it can be
> used where a number is needed that cannot have been chosen by an
> adversary, for purposes such as public-coin zero-knowledge proofs.

arguments: -

returns: `Randomness`

<hr>

#### **api.query.babe.nextEpochConfig**

> Next epoch configuration, if changed.

arguments: -

returns: `NextConfigDescriptor`

<hr>

#### **api.query.babe.nextRandomness**

> Next epoch randomness.

arguments: -

returns: `Randomness`

<hr>

#### **api.query.babe.nextAuthorities**

> Next epoch authorities.

arguments: -

returns: `Vec<(AuthorityId,BabeAuthorityWeight)>`

<hr>

#### **api.query.babe.segmentIndex**

> Randomness under construction.
>
> We make a tradeoff between storage accesses and list length.
> We store the under-construction randomness in segments of up to
> `UNDER_CONSTRUCTION_SEGMENT_LENGTH`.
>
> Once a segment reaches this length, we begin the next one.
> We reset all segments and return to `0` at the beginning of every
> epoch.

arguments: -

returns: `u32`

<hr>

#### **api.query.babe.underConstruction**

> TWOX-NOTE: `SegmentIndex` is an increasing integer, so this is okay.

arguments:

- key: `u32`

returns: `Vec<Randomness>`

<hr>

#### **api.query.babe.initialized**

> Temporary value (cleared at block finalization) which is `Some`
> if per-block initialization has already been called for current block.

arguments: -

returns: `MaybeRandomness`

<hr>

#### **api.query.babe.authorVrfRandomness**

> Temporary value (cleared at block finalization) that includes the VRF output generated
> at this block. This field should always be populated during block processing unless
> secondary plain slots are enabled (which don't contain a VRF output).

arguments: -

returns: `MaybeRandomness`

<hr>

#### **api.query.babe.lateness**

> How late the current block is compared to its parent.
>
> This entry is populated as part of block execution and is cleaned up
> on block finalization. Querying this storage entry outside of block
> execution context should always yield zero.

arguments: -

returns: `BlockNumber`

<hr>

### _Extrinsics_

#### **api.tx.babe.reportEquivocation**

> Report authority equivocation/misbehavior. This method will verify
> the equivocation proof and validate the given key ownership proof
> against the extracted offender. If both are valid, the offence will
> be reported.

arguments:

- equivocation_proof: `BabeEquivocationProof`
- key_owner_proof: `KeyOwnerProof`
<hr>

#### **api.tx.babe.reportEquivocationUnsigned**

> Report authority equivocation/misbehavior. This method will verify
> the equivocation proof and validate the given key ownership proof
> against the extracted offender. If both are valid, the offence will
> be reported.
> This extrinsic must be called unsigned and it is expected that only
> block authors will call it (validated in `ValidateUnsigned`), as such
> if the block author is defined it will be defined as the equivocation
> reporter.

arguments:

- equivocation_proof: `BabeEquivocationProof`
- key_owner_proof: `KeyOwnerProof`
<hr>

## Grandpa pallet

### _State Queries_

#### **api.query.grandpa.state**

> State of the current authority set.

arguments: -

returns: `StoredState`

<hr>

#### **api.query.grandpa.pendingChange**

> Pending change: (signaled at, scheduled change).

arguments: -

returns: `StoredPendingChange`

<hr>

#### **api.query.grandpa.nextForced**

> next block number where we can force a change.

arguments: -

returns: `BlockNumber`

<hr>

#### **api.query.grandpa.stalled**

> `true` if we are currently stalled.

arguments: -

returns: `(BlockNumber,BlockNumber)`

<hr>

#### **api.query.grandpa.currentSetId**

> The number of changes (both in terms of keys and underlying economic responsibilities)
> in the "set" of Grandpa validators from genesis.

arguments: -

returns: `SetId`

<hr>

#### **api.query.grandpa.setIdSession**

> A mapping from grandpa set ID to the index of the _most recent_ session for which its
> members were responsible.
>
> TWOX-NOTE: `SetId` is not under user control.

arguments:

- key: `SetId`

returns: `SessionIndex`

<hr>

### _Extrinsics_

#### **api.tx.grandpa.reportEquivocation**

> Report voter equivocation/misbehavior. This method will verify the
> equivocation proof and validate the given key ownership proof
> against the extracted offender. If both are valid, the offence
> will be reported.

arguments:

- equivocation_proof: `GrandpaEquivocationProof`
- key_owner_proof: `KeyOwnerProof`
<hr>

#### **api.tx.grandpa.reportEquivocationUnsigned**

> Report voter equivocation/misbehavior. This method will verify the
> equivocation proof and validate the given key ownership proof
> against the extracted offender. If both are valid, the offence
> will be reported.
>
> This extrinsic must be called unsigned and it is expected that only
> block authors will call it (validated in `ValidateUnsigned`), as such
> if the block author is defined it will be defined as the equivocation
> reporter.

arguments:

- equivocation_proof: `GrandpaEquivocationProof`
- key_owner_proof: `KeyOwnerProof`
<hr>

#### **api.tx.grandpa.noteStalled**

> Note that the current authority set of the GRANDPA finality gadget has
> stalled. This will trigger a forced authority set change at the beginning
> of the next session, to be enacted `delay` blocks after that. The delay
> should be high enough to safely assume that the block signalling the
> forced change will not be re-orged (e.g. 1000 blocks). The GRANDPA voters
> will start the new authority set using the given finalized block as base.
> Only callable by root.

arguments:

- delay: `BlockNumber`
- best_finalized_block_number: `BlockNumber`
<hr>

## Authorship pallet

### _State Queries_

#### **api.query.authorship.uncles**

> Uncles

arguments: -

returns: `Vec<UncleEntryItem>`

<hr>

#### **api.query.authorship.author**

> Author of current block.

arguments: -

returns: `AccountId`

<hr>

#### **api.query.authorship.didSetUncles**

> Whether uncles were already set in this block.

arguments: -

returns: `bool`

<hr>

### _Extrinsics_

#### **api.tx.authorship.setUncles**

> Provide a set of uncles.

arguments:

- new_uncles: `Vec<Header>`
<hr>

## Staking pallet

### _State Queries_

#### **api.query.staking.historyDepth**

> Number of eras to keep in history.
>
> Information is kept for eras in `[current_era - history_depth; current_era]`.
>
> Must be more than the number of eras delayed by session otherwise. I.e. active era must
> always be in history. I.e. `active_era > current_era - history_depth` must be
> guaranteed.

arguments: -

returns: `u32`

<hr>

#### **api.query.staking.timeSinceGenesis**

> The time span since genesis, incremented at the end of each era.

arguments: -

returns: `Duration`

<hr>

#### **api.query.staking.validatorCount**

> The ideal number of staking participants.

arguments: -

returns: `u32`

<hr>

#### **api.query.staking.minimumValidatorCount**

> Minimum number of staking participants before emergency conditions are imposed.

arguments: -

returns: `u32`

<hr>

#### **api.query.staking.invulnerables**

> Any validators that may never be slashed or forcibly kicked. It's a Vec since they're
> easy to initialize and the performance hit is minimal (we expect no more than four
> invulnerables) and restricted to testnets.

arguments: -

returns: `Vec<AccountId>`

<hr>

#### **api.query.staking.bonded**

> Map from all locked "stash" accounts to the controller account.

arguments:

- key: `AccountId`

returns: `AccountId`

<hr>

#### **api.query.staking.ledger**

> Map from all (unlocked) "controller" accounts to the info regarding the staking.

arguments:

- key: `AccountId`

returns: `StakingLedger`

<hr>

#### **api.query.staking.payee**

> Where the reward payment should be made. Keyed by stash.

arguments:

- key: `AccountId`

returns: `RewardDestination`

<hr>

#### **api.query.staking.validators**

> The map from (wannabe) validator stash key to the preferences of that validator.

arguments:

- key: `AccountId`

returns: `ValidatorPrefs`

<hr>

#### **api.query.staking.nominators**

> The map from nominator stash key to the set of stash keys of all validators to nominate.

arguments:

- key: `AccountId`

returns: `Nominations`

<hr>

#### **api.query.staking.currentEra**

> The current era index.
>
> This is the latest planned era, depending on how the Session pallet queues the validator
> set, it might be active or not.

arguments: -

returns: `EraIndex`

<hr>

#### **api.query.staking.activeEra**

> The active era information, it holds index and start.
>
> The active era is the era being currently rewarded. Validator set of this era must be
> equal to [`SessionInterface::validators`].

arguments: -

returns: `ActiveEraInfo`

<hr>

#### **api.query.staking.erasStartSessionIndex**

> The session index at which the era start for the last `HISTORY_DEPTH` eras.
>
> Note: This tracks the starting session (i.e. session index when era start being active)
> for the eras in `[CurrentEra - HISTORY_DEPTH, CurrentEra]`.

arguments:

- key: `EraIndex`

returns: `SessionIndex`

<hr>

#### **api.query.staking.erasStakers**

> Exposure of validator at era.
>
> This is keyed first by the era index to allow bulk deletion and then the stash account.
>
> Is it removed after `HISTORY_DEPTH` eras.
> If stakers hasn't been set or has been removed then empty exposure is returned.

arguments:

- key1: `EraIndex`
- key2: `AccountId`

returns: `Exposure`

<hr>

#### **api.query.staking.erasStakersClipped**

> Clipped Exposure of validator at era.
>
> This is similar to [`ErasStakers`] but number of nominators exposed is reduced to the
> `T::MaxNominatorRewardedPerValidator` biggest stakers.
> (Note: the field `total` and `own` of the exposure remains unchanged).
> This is used to limit the i/o cost for the nominator payout.
>
> This is keyed fist by the era index to allow bulk deletion and then the stash account.
>
> Is it removed after `HISTORY_DEPTH` eras.
> If stakers hasn't been set or has been removed then empty exposure is returned.

arguments:

- key1: `EraIndex`
- key2: `AccountId`

returns: `Exposure`

<hr>

#### **api.query.staking.erasValidatorPrefs**

> Similar to `ErasStakers`, this holds the preferences of validators.
>
> This is keyed first by the era index to allow bulk deletion and then the stash account.
>
> Is it removed after `HISTORY_DEPTH` eras.

arguments:

- key1: `EraIndex`
- key2: `AccountId`

returns: `ValidatorPrefs`

<hr>

#### **api.query.staking.erasValidatorReward**

> The total validator era payout for the last `HISTORY_DEPTH` eras.
>
> Eras that haven't finished yet or has been removed doesn't have reward.

arguments:

- key: `EraIndex`

returns: `MultiCurrencyBalanceOf`

<hr>

#### **api.query.staking.erasRewardPoints**

> Rewards for the last `HISTORY_DEPTH` eras.
> If reward hasn't been set or has been removed then 0 reward is returned.

arguments:

- key: `EraIndex`

returns: `EraRewardPoints`

<hr>

#### **api.query.staking.eraValBurned**

> The amount of VAL burned during this era.

arguments: -

returns: `MultiCurrencyBalanceOf`

<hr>

#### **api.query.staking.erasTotalStake**

> The total amount staked for the last `HISTORY_DEPTH` eras.
> If total hasn't been set or has been removed then 0 stake is returned.

arguments:

- key: `EraIndex`

returns: `BalanceOf`

<hr>

#### **api.query.staking.forceEra**

> Mode of era forcing.

arguments: -

returns: `Forcing`

<hr>

#### **api.query.staking.slashRewardFraction**

> The percentage of the slash that is distributed to reporters.
>
> The rest of the slashed value is handled by the `Slash`.

arguments: -

returns: `Perbill`

<hr>

#### **api.query.staking.canceledSlashPayout**

> The amount of currency given to reporters of a slash event which was
> canceled by extraordinary circumstances (e.g. governance).

arguments: -

returns: `BalanceOf`

<hr>

#### **api.query.staking.unappliedSlashes**

> All unapplied slashes that are queued for later.

arguments:

- key: `EraIndex`

returns: `Vec<UnappliedSlash>`

<hr>

#### **api.query.staking.bondedEras**

> A mapping from still-bonded eras to the first session index of that era.
>
> Must contains information for eras for the range:
> `[active_era - bounding_duration; active_era]`

arguments: -

returns: `Vec<(EraIndex,SessionIndex)>`

<hr>

#### **api.query.staking.validatorSlashInEra**

> All slashing events on validators, mapped by era to the highest slash proportion
> and slash value of the era.

arguments:

- key1: `EraIndex`
- key2: `AccountId`

returns: `(Perbill,BalanceOf)`

<hr>

#### **api.query.staking.nominatorSlashInEra**

> All slashing events on nominators, mapped by era to the highest slash value of the era.

arguments:

- key1: `EraIndex`
- key2: `AccountId`

returns: `BalanceOf`

<hr>

#### **api.query.staking.slashingSpans**

> Slashing spans for stash accounts.

arguments:

- key: `AccountId`

returns: `SlashingSpans`

<hr>

#### **api.query.staking.spanSlash**

> Records information about the maximum slash of a stash within a slashing span,
> as well as how much reward has been paid out.

arguments:

- key: `(AccountId,SpanIndex)`

returns: `SpanRecord`

<hr>

#### **api.query.staking.earliestUnappliedSlash**

> The earliest era for which we have a pending, unapplied slash.

arguments: -

returns: `EraIndex`

<hr>

#### **api.query.staking.snapshotValidators**

> Snapshot of validators at the beginning of the current election window. This should only
> have a value when [`EraElectionStatus`] == `ElectionStatus::Open(_)`.

arguments: -

returns: `Vec<AccountId>`

<hr>

#### **api.query.staking.snapshotNominators**

> Snapshot of nominators at the beginning of the current election window. This should only
> have a value when [`EraElectionStatus`] == `ElectionStatus::Open(_)`.

arguments: -

returns: `Vec<AccountId>`

<hr>

#### **api.query.staking.queuedElected**

> The next validator set. At the end of an era, if this is available (potentially from the
> result of an offchain worker), it is immediately used. Otherwise, the on-chain election
> is executed.

arguments: -

returns: `ElectionResult`

<hr>

#### **api.query.staking.queuedScore**

> The score of the current [`QueuedElected`].

arguments: -

returns: `ElectionScore`

<hr>

#### **api.query.staking.eraElectionStatus**

> Flag to control the execution of the offchain election. When `Open(_)`, we accept
> solutions to be submitted.

arguments: -

returns: `ElectionStatus`

<hr>

#### **api.query.staking.isCurrentSessionFinal**

> True if the current **planned** session is final. Note that this does not take era
> forcing into account.

arguments: -

returns: `bool`

<hr>

#### **api.query.staking.storageVersion**

> True if network has been upgraded to this version.
> Storage version of the pallet.
>
> This is set to v5.0.0 for new networks.

arguments: -

returns: `Releases`

<hr>

### _Extrinsics_

#### **api.tx.staking.bond**

> Take the origin account as a stash and lock up `value` of its balance. `controller` will
> be the account that controls it.
>
> `value` must be more than the `minimum_balance` specified by `T::Currency`.
>
> The dispatch origin for this call must be _Signed_ by the stash account.
>
> Emits `Bonded`.
>
> # <weight>
>
> - Independent of the arguments. Moderate complexity.
> - O(1).
> - Three extra DB entries.
>
> NOTE: Two of the storage writes (`Self::bonded`, `Self::payee`) are _never_ cleaned
> unless the `origin` falls below _existential deposit_ and gets removed as dust.
>
> ---
>
> Weight: O(1)
> DB Weight:
>
> - Read: Bonded, Ledger, [Origin Account], Current Era, History Depth, Locks
> - Write: Bonded, Payee, [Origin Account], Locks, Ledger
>
> # </weight>

arguments:

- controller: `LookupSource`
- value: `Compact<BalanceOf>`
- payee: `RewardDestination`
<hr>

#### **api.tx.staking.bondExtra**

> Add some extra amount that have appeared in the stash `free_balance` into the balance up
> for staking.
>
> Use this if there are additional funds in your stash account that you wish to bond.
> Unlike [`bond`] or [`unbond`] this function does not impose any limitation on the amount
> that can be added.
>
> The dispatch origin for this call must be _Signed_ by the stash, not the controller and
> it can be only called when [`EraElectionStatus`] is `Closed`.
>
> Emits `Bonded`.
>
> # <weight>
>
> - Independent of the arguments. Insignificant complexity.
> - O(1).
> - One DB entry.
>
> ---
>
> DB Weight:
>
> - Read: Era Election Status, Bonded, Ledger, [Origin Account], Locks
> - Write: [Origin Account], Locks, Ledger
>
> # </weight>

arguments:

- max_additional: `Compact<BalanceOf>`
<hr>

#### **api.tx.staking.unbond**

> Schedule a portion of the stash to be unlocked ready for transfer out after the bond
> period ends. If this leaves an amount actively bonded less than
> T::Currency::minimum_balance(), then it is increased to the full amount.
>
> Once the unlock period is done, you can call `withdraw_unbonded` to actually move
> the funds out of management ready for transfer.
>
> No more than a limited number of unlocking chunks (see `MAX_UNLOCKING_CHUNKS`)
> can co-exists at the same time. In that case, [`Call::withdraw_unbonded`] need
> to be called first to remove some of the chunks (if possible).
>
> The dispatch origin for this call must be _Signed_ by the controller, not the stash.
> And, it can be only called when [`EraElectionStatus`] is `Closed`.
>
> Emits `Unbonded`.
>
> See also [`Call::withdraw_unbonded`].
>
> # <weight>
>
> - Independent of the arguments. Limited but potentially exploitable complexity.
> - Contains a limited number of reads.
> - Each call (requires the remainder of the bonded balance to be above `minimum_balance`)
>   will cause a new entry to be inserted into a vector (`Ledger.unlocking`) kept in storage.
>   The only way to clean the aforementioned storage item is also user-controlled via
>   `withdraw_unbonded`.
> - One DB entry.
>
> ---
>
> Weight: O(1)
> DB Weight:
>
> - Read: EraElectionStatus, Ledger, CurrentEra, Locks, BalanceOf Stash,
> - Write: Locks, Ledger, BalanceOf Stash,
>   </weight>

arguments:

- value: `Compact<BalanceOf>`
<hr>

#### **api.tx.staking.withdrawUnbonded**

> Remove any unlocked chunks from the `unlocking` queue from our management.
>
> This essentially frees up that balance to be used by the stash account to do
> whatever it wants.
>
> The dispatch origin for this call must be _Signed_ by the controller, not the stash.
> And, it can be only called when [`EraElectionStatus`] is `Closed`.
>
> Emits `Withdrawn`.
>
> See also [`Call::unbond`].
>
> # <weight>
>
> - Could be dependent on the `origin` argument and how much `unlocking` chunks exist.
>   It implies `consolidate_unlocked` which loops over `Ledger.unlocking`, which is
>   indirectly user-controlled. See [`unbond`] for more detail.
> - Contains a limited number of reads, yet the size of which could be large based on `ledger`.
> - Writes are limited to the `origin` account key.
>
> ---
>
> Complexity O(S) where S is the number of slashing spans to remove
> Update:
>
> - Reads: EraElectionStatus, Ledger, Current Era, Locks, [Origin Account]
> - Writes: [Origin Account], Locks, Ledger
>   Kill:
> - Reads: EraElectionStatus, Ledger, Current Era, Bonded, Slashing Spans, [Origin
>   > Account], Locks, BalanceOf stash
> - Writes: Bonded, Slashing Spans (if S > 0), Ledger, Payee, Validators, Nominators,
>   [Origin Account], Locks, BalanceOf stash.
> - Writes Each: SpanSlash \* S
>   NOTE: Weight annotation is the kill scenario, we refund otherwise.
>
> # </weight>

arguments:

- num_slashing_spans: `u32`
<hr>

#### **api.tx.staking.validate**

> Declare the desire to validate for the origin controller.
>
> Effects will be felt at the beginning of the next era.
>
> The dispatch origin for this call must be _Signed_ by the controller, not the stash.
> And, it can be only called when [`EraElectionStatus`] is `Closed`.
>
> # <weight>
>
> - Independent of the arguments. Insignificant complexity.
> - Contains a limited number of reads.
> - Writes are limited to the `origin` account key.
>
> ---
>
> Weight: O(1)
> DB Weight:
>
> - Read: Era Election Status, Ledger
> - Write: Nominators, Validators
>
> # </weight>

arguments:

- prefs: `ValidatorPrefs`
<hr>

#### **api.tx.staking.nominate**

> Declare the desire to nominate `targets` for the origin controller.
>
> Effects will be felt at the beginning of the next era. This can only be called when
> [`EraElectionStatus`] is `Closed`.
>
> The dispatch origin for this call must be _Signed_ by the controller, not the stash.
> And, it can be only called when [`EraElectionStatus`] is `Closed`.
>
> # <weight>
>
> - The transaction's complexity is proportional to the size of `targets` (N)
>   which is capped at CompactAssignments::LIMIT (MAX_NOMINATIONS).
> - Both the reads and writes follow a similar pattern.
>
> ---
>
> Weight: O(N)
> where N is the number of targets
> DB Weight:
>
> - Reads: Era Election Status, Ledger, Current Era
> - Writes: Validators, Nominators
>
> # </weight>

arguments:

- targets: `Vec<LookupSource>`
<hr>

#### **api.tx.staking.chill**

> Declare no desire to either validate or nominate.
>
> Effects will be felt at the beginning of the next era.
>
> The dispatch origin for this call must be _Signed_ by the controller, not the stash.
> And, it can be only called when [`EraElectionStatus`] is `Closed`.
>
> # <weight>
>
> - Independent of the arguments. Insignificant complexity.
> - Contains one read.
> - Writes are limited to the `origin` account key.
>
> ---
>
> Weight: O(1)
> DB Weight:
>
> - Read: EraElectionStatus, Ledger
> - Write: Validators, Nominators
>
> # </weight>

arguments: -

<hr>

#### **api.tx.staking.setPayee**

> (Re-)set the payment target for a controller.
>
> Effects will be felt at the beginning of the next era.
>
> The dispatch origin for this call must be _Signed_ by the controller, not the stash.
>
> # <weight>
>
> - Independent of the arguments. Insignificant complexity.
> - Contains a limited number of reads.
> - Writes are limited to the `origin` account key.
>
> ---
>
> - Weight: O(1)
> - DB Weight:
>   - Read: Ledger
>   - Write: Payee
>
> # </weight>

arguments:

- payee: `RewardDestination`
<hr>

#### **api.tx.staking.setController**

> (Re-)set the controller of a stash.
>
> Effects will be felt at the beginning of the next era.
>
> The dispatch origin for this call must be _Signed_ by the stash, not the controller.
>
> # <weight>
>
> - Independent of the arguments. Insignificant complexity.
> - Contains a limited number of reads.
> - Writes are limited to the `origin` account key.
>
> ---
>
> Weight: O(1)
> DB Weight:
>
> - Read: Bonded, Ledger New Controller, Ledger Old Controller
> - Write: Bonded, Ledger New Controller, Ledger Old Controller
>
> # </weight>

arguments:

- controller: `LookupSource`
<hr>

#### **api.tx.staking.setValidatorCount**

> Sets the ideal number of validators.
>
> The dispatch origin must be Root.
>
> # <weight>
>
> Weight: O(1)
> Write: Validator Count
>
> # </weight>

arguments:

- new: `Compact<u32>`
<hr>

#### **api.tx.staking.increaseValidatorCount**

> Increments the ideal number of validators.
>
> The dispatch origin must be Root.
>
> # <weight>
>
> Same as [`set_validator_count`].
>
> # </weight>

arguments:

- additional: `Compact<u32>`
<hr>

#### **api.tx.staking.scaleValidatorCount**

> Scale up the ideal number of validators by a factor.
>
> The dispatch origin must be Root.
>
> # <weight>
>
> Same as [`set_validator_count`].
>
> # </weight>

arguments:

- factor: `Percent`
<hr>

#### **api.tx.staking.forceNoEras**

> Force there to be no new eras indefinitely.
>
> The dispatch origin must be Root.
>
> # <weight>
>
> - No arguments.
> - Weight: O(1)
> - Write: ForceEra
>
> # </weight>

arguments: -

<hr>

#### **api.tx.staking.forceNewEra**

> Force there to be a new era at the end of the next session. After this, it will be
> reset to normal (non-forced) behaviour.
>
> The dispatch origin must be Root.
>
> # <weight>
>
> - No arguments.
> - Weight: O(1)
> - Write ForceEra
>
> # </weight>

arguments: -

<hr>

#### **api.tx.staking.setInvulnerables**

> Set the validators who cannot be slashed (if any).
>
> The dispatch origin must be Root.
>
> # <weight>
>
> - O(V)
> - Write: Invulnerables
>
> # </weight>

arguments:

- invulnerables: `Vec<AccountId>`
<hr>

#### **api.tx.staking.forceUnstake**

> Force a current staker to become completely unstaked, immediately.
>
> The dispatch origin must be Root.
>
> # <weight>
>
> O(S) where S is the number of slashing spans to be removed
> Reads: Bonded, Slashing Spans, Account, Locks
> Writes: Bonded, Slashing Spans (if S > 0), Ledger, Payee, Validators, Nominators, Account, Locks
> Writes Each: SpanSlash \* S
>
> # </weight>

arguments:

- stash: `AccountId`
- num_slashing_spans: `u32`
<hr>

#### **api.tx.staking.forceNewEraAlways**

> Force there to be a new era at the end of sessions indefinitely.
>
> The dispatch origin must be Root.
>
> # <weight>
>
> - Weight: O(1)
> - Write: ForceEra
>
> # </weight>

arguments: -

<hr>

#### **api.tx.staking.cancelDeferredSlash**

> Cancel enactment of a deferred slash.
>
> Can be called by the `T::SlashCancelOrigin`.
>
> Parameters: era and indices of the slashes for that era to kill.
>
> # <weight>
>
> Complexity: O(U + S)
> with U unapplied slashes weighted with U=1000
> and S is the number of slash indices to be canceled.
>
> - Read: Unapplied Slashes
> - Write: Unapplied Slashes
>
> # </weight>

arguments:

- era: `EraIndex`
- slash_indices: `Vec<u32>`
<hr>

#### **api.tx.staking.payoutStakers**

> Pay out all the stakers behind a single validator for a single era.
>
> - `validator_stash` is the stash account of the validator. Their nominators, up to
>   `T::MaxNominatorRewardedPerValidator`, will also receive their rewards.
> - `era` may be any era between `[current_era - history_depth; current_era]`.
>
> The origin of this call must be _Signed_. Any account can call this function, even if
> it is not one of the stakers.
>
> This can only be called when [`EraElectionStatus`] is `Closed`.
>
> # <weight>
>
> - Time complexity: at most O(MaxNominatorRewardedPerValidator).
> - Contains a limited number of reads and writes.
>
> ---
>
> N is the Number of payouts for the validator (including the validator)
> Weight:
>
> - Reward Destination Staked: O(N)
> - Reward Destination Controller (Creating): O(N)
>   DB Weight:
> - Read: EraElectionStatus, CurrentEra, HistoryDepth, ErasValidatorReward,
>   ErasStakersClipped, ErasRewardPoints, ErasValidatorPrefs (8 items)
> - Read Each: Bonded, Ledger, Payee, Locks, System Account (5 items)
> - Write Each: System Account, Locks, Ledger (3 items)
>
>   NOTE: weights are assuming that payouts are made to alive stash account (Staked).
>   Paying even a dead controller is cheaper weight-wise. We don't do any refunds here.
>
> # </weight>

arguments:

- validator_stash: `AccountId`
- era: `EraIndex`
<hr>

#### **api.tx.staking.rebond**

> Rebond a portion of the stash scheduled to be unlocked.
>
> The dispatch origin must be signed by the controller, and it can be only called when
> [`EraElectionStatus`] is `Closed`.
>
> # <weight>
>
> - Time complexity: O(L), where L is unlocking chunks
> - Bounded by `MAX_UNLOCKING_CHUNKS`.
> - Storage changes: Can't increase storage, only decrease it.
>
> ---
>
> - DB Weight:
>   - Reads: EraElectionStatus, Ledger, Locks, [Origin Account]
>   - Writes: [Origin Account], Locks, Ledger
>
> # </weight>

arguments:

- value: `Compact<BalanceOf>`
<hr>

#### **api.tx.staking.setHistoryDepth**

> Set `HistoryDepth` value. This function will delete any history information
> when `HistoryDepth` is reduced.
>
> Parameters:
>
> - `new_history_depth`: The new history depth you would like to set.
> - `era_items_deleted`: The number of items that will be deleted by this dispatch.
>   This should report all the storage items that will be deleted by clearing old
>   era history. Needed to report an accurate weight for the dispatch. Trusted by
>   `Root` to report an accurate number.
>
> Origin must be root.
>
> # <weight>
>
> - E: Number of history depths removed, i.e. 10 -> 7 = 3
> - Weight: O(E)
> - DB Weight:
>   - Reads: Current Era, History Depth
>   - Writes: History Depth
>   - Clear Prefix Each: Era Stakers, EraStakersClipped, ErasValidatorPrefs
>   - Writes Each: ErasValidatorReward, ErasRewardPoints, ErasTotalStake, ErasStartSessionIndex
>
> # </weight>

arguments:

- new_history_depth: `Compact<EraIndex>`
- \_era_items_deleted: `Compact<u32>`
<hr>

#### **api.tx.staking.reapStash**

> Remove all data structure concerning a staker/stash once its balance is at the minimum.
> This is essentially equivalent to `withdraw_unbonded` except it can be called by anyone
> and the target `stash` must have no funds left beyond the ED.
>
> This can be called from any origin.
>
> - `stash`: The stash account to reap. Its balance must be zero.
>
> # <weight>
>
> Complexity: O(S) where S is the number of slashing spans on the account.
> DB Weight:
>
> - Reads: Stash Account, Bonded, Slashing Spans, Locks
> - Writes: Bonded, Slashing Spans (if S > 0), Ledger, Payee, Validators, Nominators, Stash Account, Locks
> - Writes Each: SpanSlash \* S
>
> # </weight>

arguments:

- stash: `AccountId`
- num_slashing_spans: `u32`
<hr>

#### **api.tx.staking.submitElectionSolution**

> Submit an election result to the chain. If the solution:
>
> 1. is valid.
> 2. has a better score than a potentially existing solution on chain.
>
> then, it will be _put_ on chain.
>
> A solution consists of two pieces of data:
>
> 1. `winners`: a flat vector of all the winners of the round.
> 2. `assignments`: the compact version of an assignment vector that encodes the edge
>    weights.
>
> Both of which may be computed using _phragmen_, or any other algorithm.
>
> Additionally, the submitter must provide:
>
> - The `score` that they claim their solution has.
>
> Both validators and nominators will be represented by indices in the solution. The
> indices should respect the corresponding types ([`ValidatorIndex`] and
> [`NominatorIndex`]). Moreover, they should be valid when used to index into
> [`SnapshotValidators`] and [`SnapshotNominators`]. Any invalid index will cause the
> solution to be rejected. These two storage items are set during the election window and
> may be used to determine the indices.
>
> A solution is valid if:
>
> 0. It is submitted when [`EraElectionStatus`] is `Open`.
> 1. Its claimed score is equal to the score computed on-chain.
> 2. Presents the correct number of winners.
> 3. All indexes must be value according to the snapshot vectors. All edge values must
>    also be correct and should not overflow the granularity of the ratio type (i.e. 256
>    or billion).
> 4. For each edge, all targets are actually nominated by the voter.
> 5. Has correct self-votes.
>
> A solutions score is consisted of 3 parameters:
>
> 1. `min { support.total }` for each support of a winner. This value should be maximized.
> 2. `sum { support.total }` for each support of a winner. This value should be minimized.
> 3. `sum { support.total^2 }` for each support of a winner. This value should be
>    minimized (to ensure less variance)
>
> # <weight>
>
> The transaction is assumed to be the longest path, a better solution.
>
> - Initial solution is almost the same.
> - Worse solution is retraced in pre-dispatch-checks which sets its own weight.
>
> # </weight>

arguments:

- winners: `Vec<ValidatorIndex>`
- compact: `CompactAssignments`
- score: `ElectionScore`
- era: `EraIndex`
- size: `ElectionSize`
<hr>

#### **api.tx.staking.submitElectionSolutionUnsigned**

> Unsigned version of `submit_election_solution`.
>
> Note that this must pass the [`ValidateUnsigned`] check which only allows transactions
> from the local node to be included. In other words, only the block author can include a
> transaction in the block.
>
> # <weight>
>
> See [`submit_election_solution`].
>
> # </weight>

arguments:

- winners: `Vec<ValidatorIndex>`
- compact: `CompactAssignments`
- score: `ElectionScore`
- era: `EraIndex`
- size: `ElectionSize`
<hr>

#### **api.tx.staking.kick**

> Remove the given nominations from the calling validator.
>
> Effects will be felt at the beginning of the next era.
>
> The dispatch origin for this call must be _Signed_ by the controller, not the stash.
> And, it can be only called when [`EraElectionStatus`] is `Closed`. The controller
> account should represent a validator.
>
> - `who`: A list of nominator stash accounts who are nominating this validator which
>   should no longer be nominating this validator.
>
> Note: Making this call only makes sense if you first set the validator preferences to
> block any further nominations.

arguments:

- who: `Vec<LookupSource>`
<hr>

## Tokens pallet

### _State Queries_

#### **api.query.tokens.totalIssuance**

> The total issuance of a token type.

arguments:

- key: `CurrencyId`

returns: `Balance`

<hr>

#### **api.query.tokens.locks**

> Any liquidity locks of a token type under an account.
> NOTE: Should only be accessed when setting, changing and freeing a lock.

arguments:

- key1: `AccountId`
- key2: `CurrencyId`

returns: `Vec<OrmlBalanceLock>`

<hr>

#### **api.query.tokens.accounts**

> The balance of a token type under an account.
>
> NOTE: If the total is ever zero, decrease account ref account.
>
> NOTE: This is only used in the case that this module is used to store
> balances.

arguments:

- key1: `AccountId`
- key2: `CurrencyId`

returns: `OrmlAccountData`

<hr>

## TradingPair pallet

### _State Queries_

#### **api.query.tradingPair.enabledSources**

arguments:

- key1: `DEXId`
- key2: `TradingPair`

returns: `BTreeSet<LiquiditySourceType>`

<hr>

### _Extrinsics_

#### **api.tx.tradingPair.register**

> Register trading pair on the given DEX.
> Can be only called by the DEX owner.
>
> - `dex_id`: ID of the exchange.
> - `base_asset_id`: base asset ID.
> - `target_asset_id`: target asset ID.

arguments:

- dex_id: `DEXId`
- base_asset_id: `AssetId`
- target_asset_id: `AssetId`
<hr>

### _Custom RPCs_

#### **api.rpc.tradingPair.listEnabledPairs**

> List enabled trading pairs for DEX.

arguments:

- dexId: `DEXId`
- at: `BlockHash`

returns: `Vec<TradingPair>`

<hr>

#### **api.rpc.tradingPair.isPairEnabled**

> Query if particular trading pair is enabled for DEX.

arguments:

- dexId: `DEXId`
- inputAssetId: `AssetId`
- outputAssetId: `AssetId`
- at: `BlockHash`

returns: `bool`

<hr>

#### **api.rpc.tradingPair.listEnabledSourcesForPair**

> List enabled liquidity sources for trading pair.

arguments:

- dexId: `DEXId`
- baseAssetId: `AssetId`
- targetAssetId: `AssetId`
- at: `BlockHash`

returns: `Vec<LiquiditySourceType>`

<hr>

#### **api.rpc.tradingPair.isSourceEnabledForPair**

> Query if particular liquidity source is enabled for pair.

arguments:

- dexId: `DEXId`
- baseAssetId: `AssetId`
- targetAssetId: `AssetId`
- liquiditySourceType: `LiquiditySourceType`
- at: `BlockHash`

returns: `bool`

<hr>

## Assets pallet

### _State Queries_

#### **api.query.assets.assetOwners**

> Asset Id -> Owner Account Id

arguments:

- key: `AssetId`

returns: `AccountId`

<hr>

#### **api.query.assets.assetInfos**

> Asset Id -> (Symbol, Name, Precision, Is Mintable, Content Source, Description)

arguments:

- key: `AssetId`

returns: `(AssetSymbol,AssetName,BalancePrecision,bool,Option<ContentSource>,Option<Description>,)`

<hr>

#### **api.query.assets.assetRecordAssetId**

> Asset Id -> AssetRecord<T>

arguments:

- key: `AssetId`

returns: `AssetRecord`

<hr>

### _Extrinsics_

#### **api.tx.assets.register**

> Performs an asset registration.
>
> Registers new `AssetId` for the given `origin`.
> AssetSymbol should represent string with only uppercase latin chars with max length of 7.
> AssetName should represent string with only uppercase or lowercase latin chars or numbers or spaces, with max length of 33.

arguments:

- symbol: `AssetSymbol`
- name: `AssetName`
- initial_supply: `TAssetBalance`
- is_mintable: `bool`
- is_indivisible: `bool`
- opt_content_src: `Option<ContentSource>`
- opt_desc: `Option<Description>`
<hr>

#### **api.tx.assets.transfer**

> Performs a checked Asset transfer.
>
> - `origin`: caller Account, from which Asset amount is withdrawn,
> - `asset_id`: Id of transferred Asset,
> - `to`: Id of Account, to which Asset amount is deposited,
> - `amount`: transferred Asset amount.

arguments:

- asset_id: `AssetId`
- to: `AccountId`
- amount: `TAssetBalance`
<hr>

#### **api.tx.assets.mint**

> Performs a checked Asset mint, can only be done
> by corresponding asset owner account.
>
> - `origin`: caller Account, which issues Asset minting,
> - `asset_id`: Id of minted Asset,
> - `to`: Id of Account, to which Asset amount is minted,
> - `amount`: minted Asset amount.

arguments:

- asset_id: `AssetId`
- to: `AccountId`
- amount: `TAssetBalance`
<hr>

#### **api.tx.assets.burn**

> Performs a checked Asset burn, can only be done
> by corresponding asset owner with own account.
>
> - `origin`: caller Account, from which Asset amount is burned,
> - `asset_id`: Id of burned Asset,
> - `amount`: burned Asset amount.

arguments:

- asset_id: `AssetId`
- amount: `TAssetBalance`
<hr>

#### **api.tx.assets.setNonMintable**

> Set given asset to be non-mintable, i.e. it can no longer be minted, only burned.
> Operation can not be undone.
>
> - `origin`: caller Account, should correspond to Asset owner
> - `asset_id`: Id of burned Asset,

arguments:

- asset_id: `AssetId`
<hr>

### _Custom RPCs_

#### **api.rpc.assets.freeBalance**

> Get free balance of particular asset for account.

arguments:

- accountId: `AccountId`
- assetId: `AssetId`
- at: `BlockHash`

returns: `Option<BalanceInfo>`

<hr>

#### **api.rpc.assets.usableBalance**

> Get usable (free and non-frozen, except for network fees) balance of particular asset for account.

arguments:

- accountId: `AccountId`
- assetId: `AssetId`
- at: `BlockHash`

returns: `Option<BalanceInfo>`

<hr>

#### **api.rpc.assets.totalBalance**

> Get total balance (free + reserved) of particular asset for account.

arguments:

- accountId: `AccountId`
- assetId: `AssetId`
- at: `BlockHash`

returns: `Option<BalanceInfo>`

<hr>

#### **api.rpc.assets.totalSupply**

> Get total supply of particular asset on chain.

arguments:

- assetId: `AssetId`
- at: `BlockHash`

returns: `Option<BalanceInfo>`

<hr>

#### **api.rpc.assets.listAssetIds**

> List Ids of all assets registered on chain.

arguments:

- at: `BlockHash`

returns: `Vec<AssetId>`

<hr>

#### **api.rpc.assets.listAssetInfos**

> List Infos of all assets registered on chain.

arguments:

- at: `BlockHash`

returns: `Vec<AssetInfo>`

<hr>

#### **api.rpc.assets.getAssetInfo**

> Get Info for particular asset on chain.

arguments:

- assetId: `AssetId`
- at: `BlockHash`

returns: `Option<AssetInfo>`

<hr>

## DexManager pallet

### _State Queries_

#### **api.query.dexManager.dEXInfos**

arguments:

- key: `DEXId`

returns: `DEXInfo`

<hr>

### _Custom RPCs_

#### **api.rpc.dexManager.listDEXIds**

> Enumerate available ids of DEXes

arguments:

- at: `BlockHash`

returns: `Vec<DEXId>`

<hr>

## MulticollateralBondingCurvePool pallet

### _State Queries_

#### **api.query.multicollateralBondingCurvePool.reservesAcc**

> Technical account used to store collateral tokens.

arguments: -

returns: `TechAccountId`

<hr>

#### **api.query.multicollateralBondingCurvePool.freeReservesAccountId**

arguments: -

returns: `AccountId`

<hr>

#### **api.query.multicollateralBondingCurvePool.pendingFreeReserves**

arguments: -

returns: `Vec<(AssetId,Balance)>`

<hr>

#### **api.query.multicollateralBondingCurvePool.initialPrice**

> Buy price starting constant. This is the price users pay for new XOR.

arguments: -

returns: `Fixed`

<hr>

#### **api.query.multicollateralBondingCurvePool.priceChangeStep**

> Cofficients in buy price function.

arguments: -

returns: `Fixed`

<hr>

#### **api.query.multicollateralBondingCurvePool.priceChangeRate**

arguments: -

returns: `Fixed`

<hr>

#### **api.query.multicollateralBondingCurvePool.sellPriceCoefficient**

> Sets the sell function as a fraction of the buy function, so there is margin between the two functions.

arguments: -

returns: `Fixed`

<hr>

#### **api.query.multicollateralBondingCurvePool.alwaysDistributeCoefficient**

> Coefficient which determines the fraction of input collateral token to be exchanged to XOR and
> be distributed to predefined accounts. Relevant for the Buy function (when a user buys new XOR).

arguments: -

returns: `Fixed`

<hr>

#### **api.query.multicollateralBondingCurvePool.baseFee**

> Base fee in XOR which is deducted on all trades, currently it's burned: 0.3%.

arguments: -

returns: `Fixed`

<hr>

#### **api.query.multicollateralBondingCurvePool.distributionAccountsEntry**

> Accounts that receive 20% buy/sell margin according predefined proportions.

arguments: -

returns: `DistributionAccounts`

<hr>

#### **api.query.multicollateralBondingCurvePool.enabledTargets**

> Collateral Assets allowed to be sold on bonding curve.

arguments: -

returns: `BTreeSet<AssetId>`

<hr>

#### **api.query.multicollateralBondingCurvePool.referenceAssetId**

> Asset that is used to compare collateral assets by value, e.g., DAI.

arguments: -

returns: `AssetId`

<hr>

#### **api.query.multicollateralBondingCurvePool.rewards**

> Registry to store information about rewards owned by users in PSWAP. (claim_limit, available_rewards)

arguments:

- key: `AccountId`

returns: `(Balance,Balance)`

<hr>

#### **api.query.multicollateralBondingCurvePool.totalRewards**

> Total amount of PSWAP owned by accounts.

arguments: -

returns: `Balance`

<hr>

#### **api.query.multicollateralBondingCurvePool.incentivisedCurrenciesNum**

> Number of reserve currencies selling which user will get rewards, namely all registered collaterals except PSWAP and VAL.

arguments: -

returns: `u32`

<hr>

#### **api.query.multicollateralBondingCurvePool.incentivesAccountId**

> Account which stores actual PSWAP intended for rewards.

arguments: -

returns: `AccountId`

<hr>

#### **api.query.multicollateralBondingCurvePool.assetsWithOptionalRewardMultiplier**

> Reward multipliers for special assets. Asset Id => Reward Multiplier

arguments:

- key: `AssetId`

returns: `Fixed`

<hr>

#### **api.query.multicollateralBondingCurvePool.initialPswapRewardsSupply**

> Amount of PSWAP initially stored in account dedicated for TBC rewards. Actual account balance will deplete over time,
> however this constant is not modified.

arguments: -

returns: `Balance`

<hr>

#### **api.query.multicollateralBondingCurvePool.collateralReserves**

> Current reserves balance for collateral tokens, used for client usability.

arguments:

- key: `AssetId`

returns: `Balance`

<hr>

### _Extrinsics_

#### **api.tx.multicollateralBondingCurvePool.initializePool**

> Enable exchange path on the pool for pair BaseAsset-CollateralAsset.

arguments:

- collateral_asset_id: `AssetId`
<hr>

#### **api.tx.multicollateralBondingCurvePool.setReferenceAsset**

> Change reference asset which is used to determine collateral assets value. Inteded to be e.g. stablecoin DAI.

arguments:

- reference_asset_id: `AssetId`
<hr>

#### **api.tx.multicollateralBondingCurvePool.setOptionalRewardMultiplier**

> Set multiplier which is applied to rewarded amount when depositing particular collateral assets.
> `None` value indicates reward without change, same as Some(1.0).

arguments:

- collateral_asset_id: `AssetId`
- multiplier: `Option<Fixed>`
<hr>

#### **api.tx.multicollateralBondingCurvePool.setPriceBias**

> Changes `initial_price` used as bias in XOR-DAI(reference asset) price calculation

arguments:

- price_bias: `Balance`
<hr>

#### **api.tx.multicollateralBondingCurvePool.setPriceChangeConfig**

> Changes price change rate and step

arguments:

- price_change_rate: `Balance`
- price_change_step: `Balance`
<hr>

## PoolXyk pallet

### _State Queries_

#### **api.query.poolXyk.reserves**

> Updated after last liquidity change operation.
> [Base Asset Id (XOR) -> Target Asset Id => (Base Balance, Target Balance)].
> This storage records is not used as source of information, but used as quick cache for
> information that comes from balances for assets from technical accounts.
> For example, communication with technical accounts and their storage is not needed, and this
> pair to balance cache can be used quickly.

arguments:

- key1: `AssetId`
- key2: `AssetId`

returns: `(Balance,Balance)`

<hr>

#### **api.query.poolXyk.poolProviders**

> Liquidity providers of particular pool.
> Pool account => Liquidity provider account => Pool token balance

arguments:

- key1: `AccountIdOf`
- key2: `AccountIdOf`

returns: `Balance`

<hr>

#### **api.query.poolXyk.accountPools**

> Set of pools in which accounts have some share.
> Liquidity provider account => Target Asset of pair (assuming base asset is XOR)

arguments:

- key: `AccountIdOf`

returns: `BTreeSet<AssetIdOf>`

<hr>

#### **api.query.poolXyk.totalIssuances**

> Total issuance of particular pool.
> Pool account => Total issuance

arguments:

- key: `AccountIdOf`

returns: `Balance`

<hr>

#### **api.query.poolXyk.properties**

> Properties of particular pool. Base Asset => Target Asset => (Reserves Account Id, Fees Account Id)

arguments:

- key1: `AssetId`
- key2: `AssetId`

returns: `(AccountId,AccountId)`

<hr>

### _Extrinsics_

#### **api.tx.poolXyk.depositLiquidity**

arguments:

- dex_id: `DEXIdOf`
- input_asset_a: `AssetIdOf`
- input_asset_b: `AssetIdOf`
- input_a_desired: `Balance`
- input_b_desired: `Balance`
- input_a_min: `Balance`
- input_b_min: `Balance`
<hr>

#### **api.tx.poolXyk.withdrawLiquidity**

arguments:

- dex_id: `DEXIdOf`
- output_asset_a: `AssetIdOf`
- output_asset_b: `AssetIdOf`
- marker_asset_desired: `Balance`
- output_a_min: `Balance`
- output_b_min: `Balance`
<hr>

#### **api.tx.poolXyk.initializePool**

arguments:

- dex_id: `DEXIdOf`
- asset_a: `AssetIdOf`
- asset_b: `AssetIdOf`
<hr>

## Council pallet

### _State Queries_

#### **api.query.council.proposals**

> The hashes of the active proposals.

arguments: -

returns: `Vec<Hash>`

<hr>

#### **api.query.council.proposalOf**

> Actual proposal for a given hash, if it's current.

arguments:

- key: `Hash`

returns: `Proposal`

<hr>

#### **api.query.council.voting**

> Votes on a given proposal, if it is ongoing.

arguments:

- key: `Hash`

returns: `Votes`

<hr>

#### **api.query.council.proposalCount**

> Proposals so far.

arguments: -

returns: `u32`

<hr>

#### **api.query.council.members**

> The current members of the collective. This is stored sorted (just by value).

arguments: -

returns: `Vec<AccountId>`

<hr>

#### **api.query.council.prime**

> The prime member that helps determine the default vote behavior in case of absentations.

arguments: -

returns: `AccountId`

<hr>

### _Extrinsics_

#### **api.tx.council.setMembers**

> Set the collective's membership.
>
> - `new_members`: The new member list. Be nice to the chain and provide it sorted.
> - `prime`: The prime member whose vote sets the default.
> - `old_count`: The upper bound for the previous number of members in storage.
>   Used for weight estimation.
>
> Requires root origin.
>
> NOTE: Does not enforce the expected `MaxMembers` limit on the amount of members, but
> the weight estimations rely on it to estimate dispatchable weight.
>
> # <weight>
>
> ## Weight
>
> - `O(MP + N)` where:
>   - `M` old-members-count (code- and governance-bounded)
>   - `N` new-members-count (code- and governance-bounded)
>   - `P` proposals-count (code-bounded)
> - DB:
>   - 1 storage mutation (codec `O(M)` read, `O(N)` write) for reading and writing the members
>   - 1 storage read (codec `O(P)`) for reading the proposals
>   - `P` storage mutations (codec `O(M)`) for updating the votes for each proposal
>   - 1 storage write (codec `O(1)`) for deleting the old `prime` and setting the new one
>
> # </weight>

arguments:

- new_members: `Vec<AccountId>`
- prime: `Option<AccountId>`
- old_count: `MemberCount`
<hr>

#### **api.tx.council.execute**

> Dispatch a proposal from a member using the `Member` origin.
>
> Origin must be a member of the collective.
>
> # <weight>
>
> ## Weight
>
> - `O(M + P)` where `M` members-count (code-bounded) and `P` complexity of dispatching `proposal`
> - DB: 1 read (codec `O(M)`) + DB access of `proposal`
> - 1 event
>
> # </weight>

arguments:

- proposal: `Proposal`
- length_bound: `Compact<u32>`
<hr>

#### **api.tx.council.propose**

> Add a new proposal to either be voted on or executed directly.
>
> Requires the sender to be member.
>
> `threshold` determines whether `proposal` is executed directly (`threshold < 2`)
> or put up for voting.
>
> # <weight>
>
> ## Weight
>
> - `O(B + M + P1)` or `O(B + M + P2)` where:
>   - `B` is `proposal` size in bytes (length-fee-bounded)
>   - `M` is members-count (code- and governance-bounded)
>   - branching is influenced by `threshold` where:
>     - `P1` is proposal execution complexity (`threshold < 2`)
>     - `P2` is proposals-count (code-bounded) (`threshold >= 2`)
> - DB:
>   - 1 storage read `is_member` (codec `O(M)`)
>   - 1 storage read `ProposalOf::contains_key` (codec `O(1)`)
>   - DB accesses influenced by `threshold`:
>     - EITHER storage accesses done by `proposal` (`threshold < 2`)
>     - OR proposal insertion (`threshold <= 2`)
>       - 1 storage mutation `Proposals` (codec `O(P2)`)
>       - 1 storage mutation `ProposalCount` (codec `O(1)`)
>       - 1 storage write `ProposalOf` (codec `O(B)`)
>       - 1 storage write `Voting` (codec `O(M)`)
>   - 1 event
>
> # </weight>

arguments:

- threshold: `Compact<MemberCount>`
- proposal: `Proposal`
- length_bound: `Compact<u32>`
<hr>

#### **api.tx.council.vote**

> Add an aye or nay vote for the sender to the given proposal.
>
> Requires the sender to be a member.
>
> Transaction fees will be waived if the member is voting on any particular proposal
> for the first time and the call is successful. Subsequent vote changes will charge a fee.
>
> # <weight>
>
> ## Weight
>
> - `O(M)` where `M` is members-count (code- and governance-bounded)
> - DB:
>   - 1 storage read `Members` (codec `O(M)`)
>   - 1 storage mutation `Voting` (codec `O(M)`)
> - 1 event
>
> # </weight>

arguments:

- proposal: `Hash`
- index: `Compact<ProposalIndex>`
- approve: `bool`
<hr>

#### **api.tx.council.close**

> Close a vote that is either approved, disapproved or whose voting period has ended.
>
> May be called by any signed account in order to finish voting and close the proposal.
>
> If called before the end of the voting period it will only close the vote if it is
> has enough votes to be approved or disapproved.
>
> If called after the end of the voting period abstentions are counted as rejections
> unless there is a prime member set and the prime member cast an approval.
>
> If the close operation completes successfully with disapproval, the transaction fee will
> be waived. Otherwise execution of the approved operation will be charged to the caller.
>
> - `proposal_weight_bound`: The maximum amount of weight consumed by executing the closed proposal.
> - `length_bound`: The upper bound for the length of the proposal in storage. Checked via
>   `storage::read` so it is `size_of::<u32>() == 4` larger than the pure length.
>
> # <weight>
>
> ## Weight
>
> - `O(B + M + P1 + P2)` where:
>   - `B` is `proposal` size in bytes (length-fee-bounded)
>   - `M` is members-count (code- and governance-bounded)
>   - `P1` is the complexity of `proposal` preimage.
>   - `P2` is proposal-count (code-bounded)
> - DB:
> - 2 storage reads (`Members`: codec `O(M)`, `Prime`: codec `O(1)`)
> - 3 mutations (`Voting`: codec `O(M)`, `ProposalOf`: codec `O(B)`, `Proposals`: codec `O(P2)`)
> - any mutations done while executing `proposal` (`P1`)
> - up to 3 events
>
> # </weight>

arguments:

- proposal_hash: `Hash`
- index: `Compact<ProposalIndex>`
- proposal_weight_bound: `Compact<Weight>`
- length_bound: `Compact<u32>`
<hr>

#### **api.tx.council.disapproveProposal**

> Disapprove a proposal, close, and remove it from the system, regardless of its current state.
>
> Must be called by the Root origin.
>
> Parameters:
>
> - `proposal_hash`: The hash of the proposal that should be disapproved.
>
> # <weight>
>
> Complexity: O(P) where P is the number of max proposals
> DB Weight:
>
> - Reads: Proposals
> - Writes: Voting, Proposals, ProposalOf
>
> # </weight>

arguments:

- proposal_hash: `Hash`
<hr>

## TechnicalCommittee pallet

### _State Queries_

#### **api.query.technicalCommittee.proposals**

> The hashes of the active proposals.

arguments: -

returns: `Vec<Hash>`

<hr>

#### **api.query.technicalCommittee.proposalOf**

> Actual proposal for a given hash, if it's current.

arguments:

- key: `Hash`

returns: `Proposal`

<hr>

#### **api.query.technicalCommittee.voting**

> Votes on a given proposal, if it is ongoing.

arguments:

- key: `Hash`

returns: `Votes`

<hr>

#### **api.query.technicalCommittee.proposalCount**

> Proposals so far.

arguments: -

returns: `u32`

<hr>

#### **api.query.technicalCommittee.members**

> The current members of the collective. This is stored sorted (just by value).

arguments: -

returns: `Vec<AccountId>`

<hr>

#### **api.query.technicalCommittee.prime**

> The prime member that helps determine the default vote behavior in case of absentations.

arguments: -

returns: `AccountId`

<hr>

### _Extrinsics_

#### **api.tx.technicalCommittee.setMembers**

> Set the collective's membership.
>
> - `new_members`: The new member list. Be nice to the chain and provide it sorted.
> - `prime`: The prime member whose vote sets the default.
> - `old_count`: The upper bound for the previous number of members in storage.
>   Used for weight estimation.
>
> Requires root origin.
>
> NOTE: Does not enforce the expected `MaxMembers` limit on the amount of members, but
> the weight estimations rely on it to estimate dispatchable weight.
>
> # <weight>
>
> ## Weight
>
> - `O(MP + N)` where:
>   - `M` old-members-count (code- and governance-bounded)
>   - `N` new-members-count (code- and governance-bounded)
>   - `P` proposals-count (code-bounded)
> - DB:
>   - 1 storage mutation (codec `O(M)` read, `O(N)` write) for reading and writing the members
>   - 1 storage read (codec `O(P)`) for reading the proposals
>   - `P` storage mutations (codec `O(M)`) for updating the votes for each proposal
>   - 1 storage write (codec `O(1)`) for deleting the old `prime` and setting the new one
>
> # </weight>

arguments:

- new_members: `Vec<AccountId>`
- prime: `Option<AccountId>`
- old_count: `MemberCount`
<hr>

#### **api.tx.technicalCommittee.execute**

> Dispatch a proposal from a member using the `Member` origin.
>
> Origin must be a member of the collective.
>
> # <weight>
>
> ## Weight
>
> - `O(M + P)` where `M` members-count (code-bounded) and `P` complexity of dispatching `proposal`
> - DB: 1 read (codec `O(M)`) + DB access of `proposal`
> - 1 event
>
> # </weight>

arguments:

- proposal: `Proposal`
- length_bound: `Compact<u32>`
<hr>

#### **api.tx.technicalCommittee.propose**

> Add a new proposal to either be voted on or executed directly.
>
> Requires the sender to be member.
>
> `threshold` determines whether `proposal` is executed directly (`threshold < 2`)
> or put up for voting.
>
> # <weight>
>
> ## Weight
>
> - `O(B + M + P1)` or `O(B + M + P2)` where:
>   - `B` is `proposal` size in bytes (length-fee-bounded)
>   - `M` is members-count (code- and governance-bounded)
>   - branching is influenced by `threshold` where:
>     - `P1` is proposal execution complexity (`threshold < 2`)
>     - `P2` is proposals-count (code-bounded) (`threshold >= 2`)
> - DB:
>   - 1 storage read `is_member` (codec `O(M)`)
>   - 1 storage read `ProposalOf::contains_key` (codec `O(1)`)
>   - DB accesses influenced by `threshold`:
>     - EITHER storage accesses done by `proposal` (`threshold < 2`)
>     - OR proposal insertion (`threshold <= 2`)
>       - 1 storage mutation `Proposals` (codec `O(P2)`)
>       - 1 storage mutation `ProposalCount` (codec `O(1)`)
>       - 1 storage write `ProposalOf` (codec `O(B)`)
>       - 1 storage write `Voting` (codec `O(M)`)
>   - 1 event
>
> # </weight>

arguments:

- threshold: `Compact<MemberCount>`
- proposal: `Proposal`
- length_bound: `Compact<u32>`
<hr>

#### **api.tx.technicalCommittee.vote**

> Add an aye or nay vote for the sender to the given proposal.
>
> Requires the sender to be a member.
>
> Transaction fees will be waived if the member is voting on any particular proposal
> for the first time and the call is successful. Subsequent vote changes will charge a fee.
>
> # <weight>
>
> ## Weight
>
> - `O(M)` where `M` is members-count (code- and governance-bounded)
> - DB:
>   - 1 storage read `Members` (codec `O(M)`)
>   - 1 storage mutation `Voting` (codec `O(M)`)
> - 1 event
>
> # </weight>

arguments:

- proposal: `Hash`
- index: `Compact<ProposalIndex>`
- approve: `bool`
<hr>

#### **api.tx.technicalCommittee.close**

> Close a vote that is either approved, disapproved or whose voting period has ended.
>
> May be called by any signed account in order to finish voting and close the proposal.
>
> If called before the end of the voting period it will only close the vote if it is
> has enough votes to be approved or disapproved.
>
> If called after the end of the voting period abstentions are counted as rejections
> unless there is a prime member set and the prime member cast an approval.
>
> If the close operation completes successfully with disapproval, the transaction fee will
> be waived. Otherwise execution of the approved operation will be charged to the caller.
>
> - `proposal_weight_bound`: The maximum amount of weight consumed by executing the closed proposal.
> - `length_bound`: The upper bound for the length of the proposal in storage. Checked via
>   `storage::read` so it is `size_of::<u32>() == 4` larger than the pure length.
>
> # <weight>
>
> ## Weight
>
> - `O(B + M + P1 + P2)` where:
>   - `B` is `proposal` size in bytes (length-fee-bounded)
>   - `M` is members-count (code- and governance-bounded)
>   - `P1` is the complexity of `proposal` preimage.
>   - `P2` is proposal-count (code-bounded)
> - DB:
> - 2 storage reads (`Members`: codec `O(M)`, `Prime`: codec `O(1)`)
> - 3 mutations (`Voting`: codec `O(M)`, `ProposalOf`: codec `O(B)`, `Proposals`: codec `O(P2)`)
> - any mutations done while executing `proposal` (`P1`)
> - up to 3 events
>
> # </weight>

arguments:

- proposal_hash: `Hash`
- index: `Compact<ProposalIndex>`
- proposal_weight_bound: `Compact<Weight>`
- length_bound: `Compact<u32>`
<hr>

#### **api.tx.technicalCommittee.disapproveProposal**

> Disapprove a proposal, close, and remove it from the system, regardless of its current state.
>
> Must be called by the Root origin.
>
> Parameters:
>
> - `proposal_hash`: The hash of the proposal that should be disapproved.
>
> # <weight>
>
> Complexity: O(P) where P is the number of max proposals
> DB Weight:
>
> - Reads: Proposals
> - Writes: Voting, Proposals, ProposalOf
>
> # </weight>

arguments:

- proposal_hash: `Hash`
<hr>

## Democracy pallet

### _State Queries_

#### **api.query.democracy.publicPropCount**

> The number of (public) proposals that have been made so far.

arguments: -

returns: `PropIndex`

<hr>

#### **api.query.democracy.publicProps**

> The public proposals. Unsorted. The second item is the proposal's hash.

arguments: -

returns: `Vec<(PropIndex,Hash,AccountId)>`

<hr>

#### **api.query.democracy.depositOf**

> Those who have locked a deposit.
>
> TWOX-NOTE: Safe, as increasing integer keys are safe.

arguments:

- key: `PropIndex`

returns: `(Vec<AccountId>,BalanceOf)`

<hr>

#### **api.query.democracy.preimages**

> Map of hashes to the proposal preimage, along with who registered it and their deposit.
> The block number is the block at which it was deposited.

arguments:

- key: `Hash`

returns: `PreimageStatus`

<hr>

#### **api.query.democracy.referendumCount**

> The next free referendum index, aka the number of referenda started so far.

arguments: -

returns: `ReferendumIndex`

<hr>

#### **api.query.democracy.lowestUnbaked**

> The lowest referendum index representing an unbaked referendum. Equal to
> `ReferendumCount` if there isn't a unbaked referendum.

arguments: -

returns: `ReferendumIndex`

<hr>

#### **api.query.democracy.referendumInfoOf**

> Information concerning any given referendum.
>
> TWOX-NOTE: SAFE as indexes are not under an attacker’s control.

arguments:

- key: `ReferendumIndex`

returns: `ReferendumInfo`

<hr>

#### **api.query.democracy.votingOf**

> All votes for a particular voter. We store the balance for the number of votes that we
> have recorded. The second item is the total amount of delegations, that will be added.
>
> TWOX-NOTE: SAFE as `AccountId`s are crypto hashes anyway.

arguments:

- key: `AccountId`

returns: `Voting`

<hr>

#### **api.query.democracy.locks**

> Accounts for which there are locks in action which may be removed at some point in the
> future. The value is the block number at which the lock expires and may be removed.
>
> TWOX-NOTE: OK ― `AccountId` is a secure hash.

arguments:

- key: `AccountId`

returns: `BlockNumber`

<hr>

#### **api.query.democracy.lastTabledWasExternal**

> True if the last referendum tabled was submitted externally. False if it was a public
> proposal.

arguments: -

returns: `bool`

<hr>

#### **api.query.democracy.nextExternal**

> The referendum to be tabled whenever it would be valid to table an external proposal.
> This happens when a referendum needs to be tabled and one of two conditions are met:
>
> - `LastTabledWasExternal` is `false`; or
> - `PublicProps` is empty.

arguments: -

returns: `(Hash,VoteThreshold)`

<hr>

#### **api.query.democracy.blacklist**

> A record of who vetoed what. Maps proposal hash to a possible existent block number
> (until when it may not be resubmitted) and who vetoed it.

arguments:

- key: `Hash`

returns: `(BlockNumber,Vec<AccountId>)`

<hr>

#### **api.query.democracy.cancellations**

> Record of all proposals that have been subject to emergency cancellation.

arguments:

- key: `Hash`

returns: `bool`

<hr>

#### **api.query.democracy.storageVersion**

> Storage version of the pallet.
>
> New networks start with last version.

arguments: -

returns: `Releases`

<hr>

### _Extrinsics_

#### **api.tx.democracy.propose**

> Propose a sensitive action to be taken.
>
> The dispatch origin of this call must be _Signed_ and the sender must
> have funds to cover the deposit.
>
> - `proposal_hash`: The hash of the proposal preimage.
> - `value`: The amount of deposit (must be at least `MinimumDeposit`).
>
> Emits `Proposed`.
>
> Weight: `O(p)`

arguments:

- proposal_hash: `Hash`
- value: `Compact<BalanceOf>`
<hr>

#### **api.tx.democracy.second**

> Signals agreement with a particular proposal.
>
> The dispatch origin of this call must be _Signed_ and the sender
> must have funds to cover the deposit, equal to the original deposit.
>
> - `proposal`: The index of the proposal to second.
> - `seconds_upper_bound`: an upper bound on the current number of seconds on this
>   proposal. Extrinsic is weighted according to this value with no refund.
>
> Weight: `O(S)` where S is the number of seconds a proposal already has.

arguments:

- proposal: `Compact<PropIndex>`
- seconds_upper_bound: `Compact<u32>`
<hr>

#### **api.tx.democracy.vote**

> Vote in a referendum. If `vote.is_aye()`, the vote is to enact the proposal;
> otherwise it is a vote to keep the status quo.
>
> The dispatch origin of this call must be _Signed_.
>
> - `ref_index`: The index of the referendum to vote for.
> - `vote`: The vote configuration.
>
> Weight: `O(R)` where R is the number of referendums the voter has voted on.

arguments:

- ref_index: `Compact<ReferendumIndex>`
- vote: `AccountVote`
<hr>

#### **api.tx.democracy.emergencyCancel**

> Schedule an emergency cancellation of a referendum. Cannot happen twice to the same
> referendum.
>
> The dispatch origin of this call must be `CancellationOrigin`.
>
> -`ref_index`: The index of the referendum to cancel.
>
> Weight: `O(1)`.

arguments:

- ref_index: `ReferendumIndex`
<hr>

#### **api.tx.democracy.externalPropose**

> Schedule a referendum to be tabled once it is legal to schedule an external
> referendum.
>
> The dispatch origin of this call must be `ExternalOrigin`.
>
> - `proposal_hash`: The preimage hash of the proposal.
>
> Weight: `O(V)` with V number of vetoers in the blacklist of proposal.
> Decoding vec of length V. Charged as maximum

arguments:

- proposal_hash: `Hash`
<hr>

#### **api.tx.democracy.externalProposeMajority**

> Schedule a majority-carries referendum to be tabled next once it is legal to schedule
> an external referendum.
>
> The dispatch of this call must be `ExternalMajorityOrigin`.
>
> - `proposal_hash`: The preimage hash of the proposal.
>
> Unlike `external_propose`, blacklisting has no effect on this and it may replace a
> pre-scheduled `external_propose` call.
>
> Weight: `O(1)`

arguments:

- proposal_hash: `Hash`
<hr>

#### **api.tx.democracy.externalProposeDefault**

> Schedule a negative-turnout-bias referendum to be tabled next once it is legal to
> schedule an external referendum.
>
> The dispatch of this call must be `ExternalDefaultOrigin`.
>
> - `proposal_hash`: The preimage hash of the proposal.
>
> Unlike `external_propose`, blacklisting has no effect on this and it may replace a
> pre-scheduled `external_propose` call.
>
> Weight: `O(1)`

arguments:

- proposal_hash: `Hash`
<hr>

#### **api.tx.democracy.fastTrack**

> Schedule the currently externally-proposed majority-carries referendum to be tabled
> immediately. If there is no externally-proposed referendum currently, or if there is one
> but it is not a majority-carries referendum then it fails.
>
> The dispatch of this call must be `FastTrackOrigin`.
>
> - `proposal_hash`: The hash of the current external proposal.
> - `voting_period`: The period that is allowed for voting on this proposal. Increased to
>   `FastTrackVotingPeriod` if too low.
> - `delay`: The number of block after voting has ended in approval and this should be
>   enacted. This doesn't have a minimum amount.
>
> Emits `Started`.
>
> Weight: `O(1)`

arguments:

- proposal_hash: `Hash`
- voting_period: `BlockNumber`
- delay: `BlockNumber`
<hr>

#### **api.tx.democracy.vetoExternal**

> Veto and blacklist the external proposal hash.
>
> The dispatch origin of this call must be `VetoOrigin`.
>
> - `proposal_hash`: The preimage hash of the proposal to veto and blacklist.
>
> Emits `Vetoed`.
>
> Weight: `O(V + log(V))` where V is number of `existing vetoers`

arguments:

- proposal_hash: `Hash`
<hr>

#### **api.tx.democracy.cancelReferendum**

> Remove a referendum.
>
> The dispatch origin of this call must be _Root_.
>
> - `ref_index`: The index of the referendum to cancel.
>
> # Weight: `O(1)`.

arguments:

- ref_index: `Compact<ReferendumIndex>`
<hr>

#### **api.tx.democracy.cancelQueued**

> Cancel a proposal queued for enactment.
>
> The dispatch origin of this call must be _Root_.
>
> - `which`: The index of the referendum to cancel.
>
> Weight: `O(D)` where `D` is the items in the dispatch queue. Weighted as `D = 10`.

arguments:

- which: `ReferendumIndex`
<hr>

#### **api.tx.democracy.delegate**

> Delegate the voting power (with some given conviction) of the sending account.
>
> The balance delegated is locked for as long as it's delegated, and thereafter for the
> time appropriate for the conviction's lock period.
>
> The dispatch origin of this call must be _Signed_, and the signing account must either:
>
> - be delegating already; or
> - have no voting activity (if there is, then it will need to be removed/consolidated
>   through `reap_vote` or `unvote`).
>
> - `to`: The account whose voting the `target` account's voting power will follow.
> - `conviction`: The conviction that will be attached to the delegated votes. When the
>   account is undelegated, the funds will be locked for the corresponding period.
> - `balance`: The amount of the account's balance to be used in delegating. This must
>   not be more than the account's current balance.
>
> Emits `Delegated`.
>
> Weight: `O(R)` where R is the number of referendums the voter delegating to has
> voted on. Weight is charged as if maximum votes.

arguments:

- to: `AccountId`
- conviction: `Conviction`
- balance: `BalanceOf`
<hr>

#### **api.tx.democracy.undelegate**

> Undelegate the voting power of the sending account.
>
> Tokens may be unlocked following once an amount of time consistent with the lock period
> of the conviction with which the delegation was issued.
>
> The dispatch origin of this call must be _Signed_ and the signing account must be
> currently delegating.
>
> Emits `Undelegated`.
>
> Weight: `O(R)` where R is the number of referendums the voter delegating to has
> voted on. Weight is charged as if maximum votes.

arguments: -

<hr>

#### **api.tx.democracy.clearPublicProposals**

> Clears all public proposals.
>
> The dispatch origin of this call must be _Root_.
>
> Weight: `O(1)`.

arguments: -

<hr>

#### **api.tx.democracy.notePreimage**

> Register the preimage for an upcoming proposal. This doesn't require the proposal to be
> in the dispatch queue but does require a deposit, returned once enacted.
>
> The dispatch origin of this call must be _Signed_.
>
> - `encoded_proposal`: The preimage of a proposal.
>
> Emits `PreimageNoted`.
>
> Weight: `O(E)` with E size of `encoded_proposal` (protected by a required deposit).

arguments:

- encoded_proposal: `Bytes`
<hr>

#### **api.tx.democracy.notePreimageOperational**

> Same as `note_preimage` but origin is `OperationalPreimageOrigin`.

arguments:

- encoded_proposal: `Bytes`
<hr>

#### **api.tx.democracy.noteImminentPreimage**

> Register the preimage for an upcoming proposal. This requires the proposal to be
> in the dispatch queue. No deposit is needed. When this call is successful, i.e.
> the preimage has not been uploaded before and matches some imminent proposal,
> no fee is paid.
>
> The dispatch origin of this call must be _Signed_.
>
> - `encoded_proposal`: The preimage of a proposal.
>
> Emits `PreimageNoted`.
>
> Weight: `O(E)` with E size of `encoded_proposal` (protected by a required deposit).

arguments:

- encoded_proposal: `Bytes`
<hr>

#### **api.tx.democracy.noteImminentPreimageOperational**

> Same as `note_imminent_preimage` but origin is `OperationalPreimageOrigin`.

arguments:

- encoded_proposal: `Bytes`
<hr>

#### **api.tx.democracy.reapPreimage**

> Remove an expired proposal preimage and collect the deposit.
>
> The dispatch origin of this call must be _Signed_.
>
> - `proposal_hash`: The preimage hash of a proposal.
> - `proposal_length_upper_bound`: an upper bound on length of the proposal.
>   Extrinsic is weighted according to this value with no refund.
>
> This will only work after `VotingPeriod` blocks from the time that the preimage was
> noted, if it's the same account doing it. If it's a different account, then it'll only
> work an additional `EnactmentPeriod` later.
>
> Emits `PreimageReaped`.
>
> Weight: `O(D)` where D is length of proposal.

arguments:

- proposal_hash: `Hash`
- proposal_len_upper_bound: `Compact<u32>`
<hr>

#### **api.tx.democracy.unlock**

> Unlock tokens that have an expired lock.
>
> The dispatch origin of this call must be _Signed_.
>
> - `target`: The account to remove the lock on.
>
> Weight: `O(R)` with R number of vote of target.

arguments:

- target: `AccountId`
<hr>

#### **api.tx.democracy.removeVote**

> Remove a vote for a referendum.
>
> If:
>
> - the referendum was cancelled, or
> - the referendum is ongoing, or
> - the referendum has ended such that
>   - the vote of the account was in opposition to the result; or
>   - there was no conviction to the account's vote; or
>   - the account made a split vote
>     ...then the vote is removed cleanly and a following call to `unlock` may result in more
>     funds being available.
>
> If, however, the referendum has ended and:
>
> - it finished corresponding to the vote of the account, and
> - the account made a standard vote with conviction, and
> - the lock period of the conviction is not over
>   ...then the lock will be aggregated into the overall account's lock, which may involve
>   _overlocking_ (where the two locks are combined into a single lock that is the maximum
>   of both the amount locked and the time is it locked for).
>
> The dispatch origin of this call must be _Signed_, and the signer must have a vote
> registered for referendum `index`.
>
> - `index`: The index of referendum of the vote to be removed.
>
> Weight: `O(R + log R)` where R is the number of referenda that `target` has voted on.
> Weight is calculated for the maximum number of vote.

arguments:

- index: `ReferendumIndex`
<hr>

#### **api.tx.democracy.removeOtherVote**

> Remove a vote for a referendum.
>
> If the `target` is equal to the signer, then this function is exactly equivalent to
> `remove_vote`. If not equal to the signer, then the vote must have expired,
> either because the referendum was cancelled, because the voter lost the referendum or
> because the conviction period is over.
>
> The dispatch origin of this call must be _Signed_.
>
> - `target`: The account of the vote to be removed; this account must have voted for
>   referendum `index`.
> - `index`: The index of referendum of the vote to be removed.
>
> Weight: `O(R + log R)` where R is the number of referenda that `target` has voted on.
> Weight is calculated for the maximum number of vote.

arguments:

- target: `AccountId`
- index: `ReferendumIndex`
<hr>

#### **api.tx.democracy.enactProposal**

> Enact a proposal from a referendum. For now we just make the weight be the maximum.

arguments:

- proposal_hash: `Hash`
- index: `ReferendumIndex`
<hr>

#### **api.tx.democracy.blacklist**

> Permanently place a proposal into the blacklist. This prevents it from ever being
> proposed again.
>
> If called on a queued public or external proposal, then this will result in it being
> removed. If the `ref_index` supplied is an active referendum with the proposal hash,
> then it will be cancelled.
>
> The dispatch origin of this call must be `BlacklistOrigin`.
>
> - `proposal_hash`: The proposal hash to blacklist permanently.
> - `ref_index`: An ongoing referendum whose hash is `proposal_hash`, which will be
>   cancelled.
>
> Weight: `O(p)` (though as this is an high-privilege dispatch, we assume it has a
> reasonable value).

arguments:

- proposal_hash: `Hash`
- maybe_ref_index: `Option<ReferendumIndex>`
<hr>

#### **api.tx.democracy.cancelProposal**

> Remove a proposal.
>
> The dispatch origin of this call must be `CancelProposalOrigin`.
>
> - `prop_index`: The index of the proposal to cancel.
>
> Weight: `O(p)` where `p = PublicProps::<T>::decode_len()`

arguments:

- prop_index: `Compact<PropIndex>`
<hr>

## Dexapi pallet

### _State Queries_

#### **api.query.dexapi.enabledSourceTypes**

arguments: -

returns: `Vec<LiquiditySourceType>`

<hr>

### _Extrinsics_

#### **api.tx.dexapi.swap**

> Perform swap with specified parameters. Gateway for invoking liquidity source exchanges.
>
> - `dex_id`: ID of the exchange.
> - `liquidity_source_type`: Type of liquidity source to perform swap on.
> - `input_asset_id`: ID of Asset to be deposited from sender account into pool reserves.
> - `output_asset_id`: ID of Asset t0 be withdrawn from pool reserves into receiver account.
> - `amount`: Either amount of desired input or output tokens, determined by `swap_variant` parameter.
> - `limit`: Either maximum input amount or minimum output amount tolerated for successful swap,
>   determined by `swap_variant` parameter.
> - `swap_variant`: Either 'WithDesiredInput' or 'WithDesiredOutput', indicates amounts purpose.
> - `receiver`: Optional value, indicates AccountId for swap receiver. If not set, default is `sender`.

arguments:

- dex_id: `DEXId`
- liquidity_source_type: `LiquiditySourceType`
- input_asset_id: `AssetId`
- output_asset_id: `AssetId`
- amount: `Balance`
- limit: `Balance`
- swap_variant: `SwapVariant`
- receiver: `Option<AccountId>`
<hr>

## EthBridge pallet

### _State Queries_

#### **api.query.ethBridge.requestsQueue**

> Registered requests queue handled by off-chain workers.

arguments:

- key: `BridgeNetworkId`

returns: `Vec<H256>`

<hr>

#### **api.query.ethBridge.requests**

> Registered requests.

arguments:

- key1: `BridgeNetworkId`
- key2: `H256`

returns: `OffchainRequest`

<hr>

#### **api.query.ethBridge.loadToIncomingRequestHash**

> Used to identify an incoming request by the corresponding load request.

arguments:

- key1: `BridgeNetworkId`
- key2: `H256`

returns: `H256`

<hr>

#### **api.query.ethBridge.requestStatuses**

> Requests statuses.

arguments:

- key1: `BridgeNetworkId`
- key2: `H256`

returns: `RequestStatus`

<hr>

#### **api.query.ethBridge.requestSubmissionHeight**

> Requests submission height map (on substrate).

arguments:

- key1: `BridgeNetworkId`
- key2: `H256`

returns: `BlockNumber`

<hr>

#### **api.query.ethBridge.requestApprovals**

> Outgoing requests approvals.

arguments:

- key1: `BridgeNetworkId`
- key2: `H256`

returns: `BTreeSet<SignatureParams>`

<hr>

#### **api.query.ethBridge.accountRequests**

> Requests made by an account.

arguments:

- key: `AccountId`

returns: `Vec<(BridgeNetworkId,H256)>`

<hr>

#### **api.query.ethBridge.registeredAsset**

> Registered asset kind.

arguments:

- key1: `BridgeNetworkId`
- key2: `AssetId`

returns: `AssetKind`

<hr>

#### **api.query.ethBridge.sidechainAssetPrecision**

> Precision (decimals) of a registered sidechain asset. Should be the same as in the ERC-20
> contract.

arguments:

- key1: `BridgeNetworkId`
- key2: `AssetId`

returns: `BalancePrecision`

<hr>

#### **api.query.ethBridge.registeredSidechainAsset**

> Registered token `AssetId` on Thischain.

arguments:

- key1: `BridgeNetworkId`
- key2: `Address`

returns: `AssetId`

<hr>

#### **api.query.ethBridge.registeredSidechainToken**

> Registered asset address on Sidechain.

arguments:

- key1: `BridgeNetworkId`
- key2: `AssetId`

returns: `Address`

<hr>

#### **api.query.ethBridge.peers**

> Network peers set.

arguments:

- key: `BridgeNetworkId`

returns: `BTreeSet<AccountId>`

<hr>

#### **api.query.ethBridge.pendingPeer**

> Network pending (being added/removed) peer.

arguments:

- key: `BridgeNetworkId`

returns: `AccountId`

<hr>

#### **api.query.ethBridge.pendingEthPeersSync**

> Used for compatibility with XOR and VAL contracts.

arguments: -

returns: `EthPeersSync`

<hr>

#### **api.query.ethBridge.peerAccountId**

> Peer account ID on Thischain.

arguments:

- key1: `BridgeNetworkId`
- key2: `Address`

returns: `AccountId`

<hr>

#### **api.query.ethBridge.peerAddress**

> Peer address on Sidechain.

arguments:

- key1: `BridgeNetworkId`
- key2: `AccountId`

returns: `Address`

<hr>

#### **api.query.ethBridge.bridgeAccount**

> Multi-signature bridge peers' account. `None` if there is no account and network with the given ID.

arguments:

- key: `BridgeNetworkId`

returns: `AccountId`

<hr>

#### **api.query.ethBridge.authorityAccount**

> Thischain authority account.

arguments: -

returns: `AccountId`

<hr>

#### **api.query.ethBridge.bridgeStatuses**

> Bridge status.

arguments:

- key: `BridgeNetworkId`

returns: `BridgeStatus`

<hr>

#### **api.query.ethBridge.bridgeContractAddress**

> Smart-contract address on Sidechain.

arguments:

- key: `BridgeNetworkId`

returns: `Address`

<hr>

#### **api.query.ethBridge.xorMasterContractAddress**

> Sora XOR master contract address.

arguments: -

returns: `Address`

<hr>

#### **api.query.ethBridge.valMasterContractAddress**

> Sora VAL master contract address.

arguments: -

returns: `Address`

<hr>

#### **api.query.ethBridge.nextNetworkId**

> Next Network ID counter.

arguments: -

returns: `BridgeNetworkId`

<hr>

#### **api.query.ethBridge.migratingRequests**

> Requests migrating from version '0.1.0' to '0.2.0'. These requests should be removed from
> `RequestsQueue` before migration procedure started.

arguments: -

returns: `Vec<H256>`

<hr>

### _Extrinsics_

#### **api.tx.ethBridge.registerBridge**

> Register a new bridge.
>
> Parameters:
>
> - `bridge_contract_address` - address of smart-contract deployed on a corresponding
>   network.
> - `initial_peers` - a set of initial network peers.

arguments:

- bridge_contract_address: `EthereumAddress`
- initial_peers: `Vec<AccountId>`
<hr>

#### **api.tx.ethBridge.addAsset**

> Add a Thischain asset to the bridge whitelist.
>
> Can only be called by root.
>
> Parameters:
>
> - `asset_id` - Thischain asset identifier.
> - `network_id` - network identifier to which the asset should be added.

arguments:

- asset_id: `AssetIdOf`
- network_id: `BridgeNetworkId`
<hr>

#### **api.tx.ethBridge.addSidechainToken**

> Add a Sidechain token to the bridge whitelist.
>
> Parameters:
>
> - `token_address` - token contract address.
> - `symbol` - token symbol (ticker).
> - `name` - token name.
> - `decimals` - token precision.
> - `network_id` - network identifier.

arguments:

- token_address: `EthereumAddress`
- symbol: `Text`
- name: `Text`
- decimals: `u8`
- network_id: `BridgeNetworkId`
<hr>

#### **api.tx.ethBridge.transferToSidechain**

> Transfer some amount of the given asset to Sidechain address.
>
> Note: if the asset kind is `Sidechain`, the amount should fit in the asset's precision
> on sidechain (`SidechainAssetPrecision`) without extra digits. For example, assume
> some ERC-20 (`T`) token has `decimals=6`, and the corresponding asset on substrate has
> `7`. Alice's balance on thischain is `0.1000009`. If Alice would want to transfer all
> the amount, she will get an error `NonZeroDust`, because of the `9` at the end, so, the
> correct amount would be `0.100000` (only 6 digits after the decimal point).
>
> Parameters:
>
> - `asset_id` - thischain asset id.
> - `to` - sidechain account id.
> - `amount` - amount of the asset.
> - `network_id` - network identifier.

arguments:

- asset_id: `AssetIdOf`
- to: `EthereumAddress`
- amount: `Balance`
- network_id: `BridgeNetworkId`
<hr>

#### **api.tx.ethBridge.requestFromSidechain**

> Load incoming request from Sidechain by the given transaction hash.
>
> Parameters:
>
> - `eth_tx_hash` - transaction hash on Sidechain.
> - `kind` - incoming request type.
> - `network_id` - network identifier.

arguments:

- eth_tx_hash: `H256`
- kind: `IncomingRequestKind`
- network_id: `BridgeNetworkId`
<hr>

#### **api.tx.ethBridge.finalizeIncomingRequest**

> Finalize incoming request (see `Pallet::finalize_incoming_request_inner`).
>
> Can be only called from a bridge account.
>
> Parameters:
>
> - `request` - an incoming request.
> - `network_id` - network identifier.

arguments:

- hash: `H256`
- network_id: `BridgeNetworkId`
<hr>

#### **api.tx.ethBridge.addPeer**

> Add a new peer to the bridge peers set.
>
> Parameters:
>
> - `account_id` - account id on thischain.
> - `address` - account id on sidechain.
> - `network_id` - network identifier.

arguments:

- account_id: `AccountId`
- address: `EthereumAddress`
- network_id: `BridgeNetworkId`
<hr>

#### **api.tx.ethBridge.removePeer**

> Remove peer from the the bridge peers set.
>
> Parameters:
>
> - `account_id` - account id on thischain.
> - `network_id` - network identifier.

arguments:

- account_id: `AccountId`
- network_id: `BridgeNetworkId`
<hr>

#### **api.tx.ethBridge.prepareForMigration**

> Prepare the given bridge for migration.
>
> Can only be called by an authority.
>
> Parameters:
>
> - `network_id` - bridge network identifier.

arguments:

- network_id: `BridgeNetworkId`
<hr>

#### **api.tx.ethBridge.migrate**

> Migrate the given bridge to a new smart-contract.
>
> Can only be called by an authority.
>
> Parameters:
>
> - `new_contract_address` - new sidechain ocntract address.
> - `erc20_native_tokens` - migrated assets ids.
> - `network_id` - bridge network identifier.

arguments:

- new_contract_address: `EthereumAddress`
- erc20_native_tokens: `Vec<EthereumAddress>`
- network_id: `BridgeNetworkId`
<hr>

#### **api.tx.ethBridge.registerIncomingRequest**

> Register the given incoming request and add it to the queue.
>
> Calls `validate` and `prepare` on the request, adds it to the queue and maps it with the
> corresponding load-incoming-request and removes the load-request from the queue.
>
> Can only be called by a bridge account.

arguments:

- incoming_request: `IncomingRequest`
<hr>

#### **api.tx.ethBridge.importIncomingRequest**

> Import the given incoming request.
>
> Register's the load request, then registers and finalizes the incoming request if it
> succeeded, otherwise aborts the load request.
>
> Can only be called by a bridge account.

arguments:

- load_incoming_request: `LoadIncomingRequest`
- incoming_request_result: `Result<IncomingRequest,DispatchError>`
<hr>

#### **api.tx.ethBridge.approveRequest**

> Approve the given outgoing request. The function is used by bridge peers.
>
> Verifies the peer signature of the given request and adds it to `RequestApprovals`.
> Once quorum is collected, the request gets finalized and removed from request queue.

arguments:

- ocw_public: `Public`
- hash: `H256`
- signature_params: `SignatureParams`
- network_id: `BridgeNetworkId`
<hr>

#### **api.tx.ethBridge.abortRequest**

> Cancels a registered request.
>
> Loads request by the given `hash`, cancels it, changes its status to `Failed` and
> removes it from the request queues.
>
> Can only be called from a bridge account.

arguments:

- hash: `H256`
- error: `DispatchError`
- network_id: `BridgeNetworkId`
<hr>

#### **api.tx.ethBridge.forceAddPeer**

> Add the given peer to the peers set without additional checks.
>
> Can only be called by a root account.

arguments:

- who: `AccountId`
- address: `EthereumAddress`
- network_id: `BridgeNetworkId`
<hr>

#### **api.tx.ethBridge.migrateTo020**

arguments: -

<hr>

### _Custom RPCs_

#### **api.rpc.ethBridge.getRequests**

> Get registered requests and their statuses.

arguments:

- requestHashes: `Vec<H256>`
- networkId: `Option<BridgeNetworkId>`
- redirectFinishedLoadRequests: `Option<bool>`
- at: `BlockHash`

returns: `Result<Vec<(OffchainRequest, RequestStatus)>, DispatchError>`

<hr>

#### **api.rpc.ethBridge.getApprovedRequests**

> Get approved encoded requests and their approvals.

arguments:

- requestHashes: `Vec<H256>`
- networkId: `Option<BridgeNetworkId>`
- at: `BlockHash`

returns: `Result<Vec<(OutgoingRequestEncoded, Vec<SignatureParams>)>, DispatchError>`

<hr>

#### **api.rpc.ethBridge.getApprovals**

> Get approvals of the given requests.

arguments:

- requestHashes: `Vec<H256>`
- networkId: `Option<BridgeNetworkId>`
- at: `BlockHash`

returns: `Result<Vec<Vec<SignatureParams>>, DispatchError>`

<hr>

#### **api.rpc.ethBridge.getAccountRequests**

> Get account requests hashes.

arguments:

- accountId: `AccountId`
- statusFilter: `Option<RequestStatus>`
- at: `BlockHash`

returns: `Result<Vec<(BridgeNetworkId, H256)>, DispatchError>`

<hr>

#### **api.rpc.ethBridge.getRegisteredAssets**

> Get registered assets and tokens.

arguments:

- networkId: `Option<BridgeNetworkId>`
- at: `BlockHash`

returns: `Result<Vec<(AssetKind, (AssetId, BalancePrecision), Option<(H160, BalancePrecision)>)>, DispatchError>`

<hr>

## PswapDistribution pallet

### _State Queries_

#### **api.query.pswapDistribution.subscribedAccounts**

> Store for information about accounts containing fees, that participate in incentive distribution mechanism.
> Fees Account Id -> (DEX Id, Pool Marker Asset Id, Distribution Frequency, Block Offset) Frequency MUST be non-zero.

arguments:

- key: `AccountId`

returns: `(DEXId,AccountIdOf,BlockNumber,BlockNumber)`

<hr>

#### **api.query.pswapDistribution.burnRate**

> Amount of incentive tokens to be burned on each distribution.

arguments: -

returns: `Fixed`

<hr>

#### **api.query.pswapDistribution.burnUpdateInfo**

> (Burn Rate Increase Delta, Burn Rate Max)

arguments: -

returns: `(Fixed,Fixed)`

<hr>

#### **api.query.pswapDistribution.shareholderAccounts**

> Information about owned portion of stored incentive tokens. Shareholder -> Owned Fraction

arguments:

- key: `AccountId`

returns: `Fixed`

<hr>

#### **api.query.pswapDistribution.claimableShares**

> Sum of all shares of incentive token owners.

arguments: -

returns: `Fixed`

<hr>

#### **api.query.pswapDistribution.parliamentPswapFraction**

> Fraction of PSWAP that could be reminted for parliament.

arguments: -

returns: `Fixed`

<hr>

### _Extrinsics_

#### **api.tx.pswapDistribution.claimIncentive**

arguments: -

<hr>

### _Custom RPCs_

#### **api.rpc.pswapDistribution.claimableAmount**

> Get amount of PSWAP claimable by user (liquidity provision reward).

arguments:

- accountId: `AccountId`
- at: `BlockHash`

returns: `BalanceInfo`

<hr>

## Multisig pallet

### _State Queries_

#### **api.query.multisig.multisigs**

> The set of open multisig operations.

arguments:

- key1: `AccountId`
- key2: `[u8;32]`

returns: `Multisig`

<hr>

#### **api.query.multisig.calls**

arguments:

- key: `[u8;32]`

returns: `(OpaqueCall,AccountId,BalanceOf)`

<hr>

### _Extrinsics_

#### **api.tx.multisig.asMultiThreshold1**

> Immediately dispatch a multi-signature call using a single approval from the caller.
>
> The dispatch origin for this call must be _Signed_.
>
> - `other_signatories`: The accounts (other than the sender) who are part of the
>   multi-signature, but do not participate in the approval process.
> - `call`: The call to be executed.
>
> Result is equivalent to the dispatched result.
>
> # <weight>
>
> ## O(Z + C) where Z is the length of the call and C its execution weight.
>
> - DB Weight: None
> - Plus Call Weight
>
> # </weight>

arguments:

- other_signatories: `Vec<AccountId>`
- call: `Call`
<hr>

#### **api.tx.multisig.asMulti**

> Register approval for a dispatch to be made from a deterministic composite account if
> approved by a total of `threshold - 1` of `other_signatories`.
>
> If there are enough, then dispatch the call.
>
> Payment: `DepositBase` will be reserved if this is the first approval, plus
> `threshold` times `DepositFactor`. It is returned once this dispatch happens or
> is cancelled.
>
> The dispatch origin for this call must be _Signed_.
>
> - `threshold`: The total number of approvals for this dispatch before it is executed.
> - `other_signatories`: The accounts (other than the sender) who can approve this
>   dispatch. May not be empty.
> - `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
>   not the first approval, then it must be `Some`, with the timepoint (block number and
>   transaction index) of the first approval transaction.
> - `call`: The call to be executed.
>
> NOTE: Unless this is the final approval, you will generally want to use
> `approve_as_multi` instead, since it only requires a hash of the call.
>
> Result is equivalent to the dispatched result if `threshold` is exactly `1`. Otherwise
> on success, result is `Ok` and the result from the interior call, if it was executed,
> may be found in the deposited `MultisigExecuted` event.
>
> # <weight>
>
> - `O(S + Z + Call)`.
> - Up to one balance-reserve or unreserve operation.
> - One passthrough operation, one insert, both `O(S)` where `S` is the number of
>   signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
> - One call encode & hash, both of complexity `O(Z)` where `Z` is tx-len.
> - One encode & hash, both of complexity `O(S)`.
> - Up to one binary search and insert (`O(logS + S)`).
> - I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
> - One event.
> - The weight of the `call`.
> - Storage: inserts one item, value size bounded by `MaxSignatories`, with a
>   deposit taken for its lifetime of
>   `DepositBase + threshold * DepositFactor`.
>
> ---
>
> - DB Weight:
>   - Reads: Multisig Storage, [Caller Account], Calls (if `store_call`)
>   - Writes: Multisig Storage, [Caller Account], Calls (if `store_call`)
> - Plus Call Weight
>
> # </weight>

arguments:

- threshold: `u16`
- other_signatories: `Vec<AccountId>`
- maybe_timepoint: `Option<Timepoint>`
- call: `OpaqueCall`
- store_call: `bool`
- max_weight: `Weight`
<hr>

#### **api.tx.multisig.approveAsMulti**

> Register approval for a dispatch to be made from a deterministic composite account if
> approved by a total of `threshold - 1` of `other_signatories`.
>
> Payment: `DepositBase` will be reserved if this is the first approval, plus
> `threshold` times `DepositFactor`. It is returned once this dispatch happens or
> is cancelled.
>
> The dispatch origin for this call must be _Signed_.
>
> - `threshold`: The total number of approvals for this dispatch before it is executed.
> - `other_signatories`: The accounts (other than the sender) who can approve this
>   dispatch. May not be empty.
> - `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
>   not the first approval, then it must be `Some`, with the timepoint (block number and
>   transaction index) of the first approval transaction.
> - `call_hash`: The hash of the call to be executed.
>
> NOTE: If this is the final approval, you will want to use `as_multi` instead.
>
> # <weight>
>
> - `O(S)`.
> - Up to one balance-reserve or unreserve operation.
> - One passthrough operation, one insert, both `O(S)` where `S` is the number of
>   signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
> - One encode & hash, both of complexity `O(S)`.
> - Up to one binary search and insert (`O(logS + S)`).
> - I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
> - One event.
> - Storage: inserts one item, value size bounded by `MaxSignatories`, with a
>   deposit taken for its lifetime of
>   `DepositBase + threshold * DepositFactor`.
>
> ---
>
> - DB Weight:
>   - Read: Multisig Storage, [Caller Account]
>   - Write: Multisig Storage, [Caller Account]
>
> # </weight>

arguments:

- threshold: `u16`
- other_signatories: `Vec<AccountId>`
- maybe_timepoint: `Option<Timepoint>`
- call_hash: `[u8;32]`
- max_weight: `Weight`
<hr>

#### **api.tx.multisig.cancelAsMulti**

> Cancel a pre-existing, on-going multisig transaction. Any deposit reserved previously
> for this operation will be unreserved on success.
>
> The dispatch origin for this call must be _Signed_.
>
> - `threshold`: The total number of approvals for this dispatch before it is executed.
> - `other_signatories`: The accounts (other than the sender) who can approve this
>   dispatch. May not be empty.
> - `timepoint`: The timepoint (block number and transaction index) of the first approval
>   transaction for this dispatch.
> - `call_hash`: The hash of the call to be executed.
>
> # <weight>
>
> - `O(S)`.
> - Up to one balance-reserve or unreserve operation.
> - One passthrough operation, one insert, both `O(S)` where `S` is the number of
>   signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
> - One encode & hash, both of complexity `O(S)`.
> - One event.
> - I/O: 1 read `O(S)`, one remove.
> - Storage: removes one item.
>
> ---
>
> - DB Weight:
>   - Read: Multisig Storage, [Caller Account], Refund Account, Calls
>   - Write: Multisig Storage, [Caller Account], Refund Account, Calls
>
> # </weight>

arguments:

- threshold: `u16`
- other_signatories: `Vec<AccountId>`
- timepoint: `Timepoint`
- call_hash: `[u8;32]`
<hr>

## Scheduler pallet

### _State Queries_

#### **api.query.scheduler.agenda**

> Items to be executed, indexed by the block number that they should be executed on.

arguments:

- key: `BlockNumber`

returns: `Vec<Option<Scheduled>>`

<hr>

#### **api.query.scheduler.lookup**

> Lookup from identity to the block number and index of the task.

arguments:

- key: `Bytes`

returns: `TaskAddress`

<hr>

#### **api.query.scheduler.storageVersion**

> Storage version of the pallet.
>
> New networks start with last version.

arguments: -

returns: `Releases`

<hr>

### _Extrinsics_

#### **api.tx.scheduler.schedule**

> Anonymously schedule a task.
>
> # <weight>
>
> - S = Number of already scheduled calls
> - Base Weight: 22.29 + .126 \* S µs
> - DB Weight:
>   - Read: Agenda
>   - Write: Agenda
> - Will use base weight of 25 which should be good for up to 30 scheduled calls
>
> # </weight>

arguments:

- when: `BlockNumber`
- maybe_periodic: `Option<Period>`
- priority: `Priority`
- call: `Call`
<hr>

#### **api.tx.scheduler.cancel**

> Cancel an anonymously scheduled task.
>
> # <weight>
>
> - S = Number of already scheduled calls
> - Base Weight: 22.15 + 2.869 \* S µs
> - DB Weight:
>   - Read: Agenda
>   - Write: Agenda, Lookup
> - Will use base weight of 100 which should be good for up to 30 scheduled calls
>
> # </weight>

arguments:

- when: `BlockNumber`
- index: `u32`
<hr>

#### **api.tx.scheduler.scheduleNamed**

> Schedule a named task.
>
> # <weight>
>
> - S = Number of already scheduled calls
> - Base Weight: 29.6 + .159 \* S µs
> - DB Weight:
>   - Read: Agenda, Lookup
>   - Write: Agenda, Lookup
> - Will use base weight of 35 which should be good for more than 30 scheduled calls
>
> # </weight>

arguments:

- id: `Bytes`
- when: `BlockNumber`
- maybe_periodic: `Option<Period>`
- priority: `Priority`
- call: `Call`
<hr>

#### **api.tx.scheduler.cancelNamed**

> Cancel a named scheduled task.
>
> # <weight>
>
> - S = Number of already scheduled calls
> - Base Weight: 24.91 + 2.907 \* S µs
> - DB Weight:
>   - Read: Agenda, Lookup
>   - Write: Agenda, Lookup
> - Will use base weight of 100 which should be good for up to 30 scheduled calls
>
> # </weight>

arguments:

- id: `Bytes`
<hr>

#### **api.tx.scheduler.scheduleAfter**

> Anonymously schedule a task after a delay.
>
> # <weight>
>
> Same as [`schedule`].
>
> # </weight>

arguments:

- after: `BlockNumber`
- maybe_periodic: `Option<Period>`
- priority: `Priority`
- call: `Call`
<hr>

#### **api.tx.scheduler.scheduleNamedAfter**

> Schedule a named task after a delay.
>
> # <weight>
>
> Same as [`schedule_named`].
>
> # </weight>

arguments:

- id: `Bytes`
- after: `BlockNumber`
- maybe_periodic: `Option<Period>`
- priority: `Priority`
- call: `Call`
<hr>

## IrohaMigration pallet

### _State Queries_

#### **api.query.irohaMigration.balances**

arguments:

- key: `Text`

returns: `Balance`

<hr>

#### **api.query.irohaMigration.referrers**

arguments:

- key: `Text`

returns: `Text`

<hr>

#### **api.query.irohaMigration.publicKeys**

arguments:

- key: `Text`

returns: `Vec<(bool,Text)>`

<hr>

#### **api.query.irohaMigration.quorums**

arguments:

- key: `Text`

returns: `u8`

<hr>

#### **api.query.irohaMigration.account**

arguments: -

returns: `AccountId`

<hr>

#### **api.query.irohaMigration.migratedAccounts**

arguments:

- key: `Text`

returns: `AccountId`

<hr>

#### **api.query.irohaMigration.pendingMultiSigAccounts**

arguments:

- key: `Text`

returns: `PendingMultisigAccount`

<hr>

#### **api.query.irohaMigration.pendingReferrals**

arguments:

- key: `Text`

returns: `Vec<AccountId>`

<hr>

### _Extrinsics_

#### **api.tx.irohaMigration.migrate**

arguments:

- iroha_address: `Text`
- iroha_public_key: `Text`
- iroha_signature: `Text`
<hr>

### _Custom RPCs_

#### **api.rpc.irohaMigration.needsMigration**

> Check if the account needs migration

arguments:

- iroha_address: `String`
- at: `BlockHash`

returns: `bool`

<hr>

## ImOnline pallet

### _State Queries_

#### **api.query.imOnline.heartbeatAfter**

> The block number after which it's ok to send heartbeats in current session.
>
> At the beginning of each session we set this to a value that should
> fall roughly in the middle of the session duration.
> The idea is to first wait for the validators to produce a block
> in the current session, so that the heartbeat later on will not be necessary.

arguments: -

returns: `BlockNumber`

<hr>

#### **api.query.imOnline.keys**

> The current set of keys that may issue a heartbeat.

arguments: -

returns: `Vec<AuthorityId>`

<hr>

#### **api.query.imOnline.receivedHeartbeats**

> For each session index, we keep a mapping of `AuthIndex` to
> `offchain::OpaqueNetworkState`.

arguments:

- key1: `SessionIndex`
- key2: `AuthIndex`

returns: `Bytes`

<hr>

#### **api.query.imOnline.authoredBlocks**

> For each session index, we keep a mapping of `ValidatorId<T>` to the
> number of blocks authored by the given authority.

arguments:

- key1: `SessionIndex`
- key2: `ValidatorId`

returns: `u32`

<hr>

### _Extrinsics_

#### **api.tx.imOnline.heartbeat**

> # <weight>
>
> - Complexity: `O(K + E)` where K is length of `Keys` (heartbeat.validators_len)
>   and E is length of `heartbeat.network_state.external_address`
>   - `O(K)`: decoding of length `K`
>   - `O(E)`: decoding/encoding of length `E`
> - DbReads: pallet_session `Validators`, pallet_session `CurrentIndex`, `Keys`,
>   `ReceivedHeartbeats`
> - DbWrites: `ReceivedHeartbeats`
>
> # </weight>

arguments:

- heartbeat: `Heartbeat`
- \_signature: `Signature`
<hr>

## Offences pallet

### _State Queries_

#### **api.query.offences.reports**

> The primary structure that holds all offence records keyed by report identifiers.

arguments:

- key: `ReportIdOf`

returns: `OffenceDetails`

<hr>

#### **api.query.offences.deferredOffences**

> Deferred reports that have been rejected by the offence handler and need to be submitted
> at a later time.

arguments: -

returns: `Vec<DeferredOffenceOf>`

<hr>

#### **api.query.offences.concurrentReportsIndex**

> A vector of reports of the same kind that happened at the same time slot.

arguments:

- key1: `Kind`
- key2: `OpaqueTimeSlot`

returns: `Vec<ReportIdOf>`

<hr>

#### **api.query.offences.reportsByKindIndex**

> Enumerates all reports of a kind along with the time they happened.
>
> All reports are sorted by the time of offence.
>
> Note that the actual type of this mapping is `Vec<u8>`, this is because values of
> different types are not supported at the moment so we are doing the manual serialization.

arguments:

- key: `Kind`

returns: `Bytes`

<hr>

## TechnicalMembership pallet

### _State Queries_

#### **api.query.technicalMembership.members**

> The current membership, stored as an ordered Vec.

arguments: -

returns: `Vec<AccountId>`

<hr>

#### **api.query.technicalMembership.prime**

> The current prime member, if one exists.

arguments: -

returns: `AccountId`

<hr>

### _Extrinsics_

#### **api.tx.technicalMembership.addMember**

> Add a member `who` to the set.
>
> May only be called from `T::AddOrigin`.

arguments:

- who: `AccountId`
<hr>

#### **api.tx.technicalMembership.removeMember**

> Remove a member `who` from the set.
>
> May only be called from `T::RemoveOrigin`.

arguments:

- who: `AccountId`
<hr>

#### **api.tx.technicalMembership.swapMember**

> Swap out one member `remove` for another `add`.
>
> May only be called from `T::SwapOrigin`.
>
> Prime membership is _not_ passed from `remove` to `add`, if extant.

arguments:

- remove: `AccountId`
- add: `AccountId`
<hr>

#### **api.tx.technicalMembership.resetMembers**

> Change the membership to a new set, disregarding the existing membership. Be nice and
> pass `members` pre-sorted.
>
> May only be called from `T::ResetOrigin`.

arguments:

- members: `Vec<AccountId>`
<hr>

#### **api.tx.technicalMembership.changeKey**

> Swap out the sending member for some other key `new`.
>
> May only be called from `Signed` origin of a current member.
>
> Prime membership is passed from the origin account to `new`, if extant.

arguments:

- new: `AccountId`
<hr>

#### **api.tx.technicalMembership.setPrime**

> Set the prime member. Must be a current member.
>
> May only be called from `T::PrimeOrigin`.

arguments:

- who: `AccountId`
<hr>

#### **api.tx.technicalMembership.clearPrime**

> Remove the prime member if it exists.
>
> May only be called from `T::PrimeOrigin`.

arguments: -

<hr>

## ElectionsPhragmen pallet

### _State Queries_

#### **api.query.electionsPhragmen.members**

> The current elected members.
>
> Invariant: Always sorted based on account id.

arguments: -

returns: `Vec<SeatHolder>`

<hr>

#### **api.query.electionsPhragmen.runnersUp**

> The current reserved runners-up.
>
> Invariant: Always sorted based on rank (worse to best). Upon removal of a member, the
> last (i.e. _best_) runner-up will be replaced.

arguments: -

returns: `Vec<SeatHolder>`

<hr>

#### **api.query.electionsPhragmen.candidates**

> The present candidate list. A current member or runner-up can never enter this vector
> and is always implicitly assumed to be a candidate.
>
> Second element is the deposit.
>
> Invariant: Always sorted based on account id.

arguments: -

returns: `Vec<(AccountId,BalanceOf)>`

<hr>

#### **api.query.electionsPhragmen.electionRounds**

> The total number of vote rounds that have happened, excluding the upcoming one.

arguments: -

returns: `u32`

<hr>

#### **api.query.electionsPhragmen.voting**

> Votes and locked stake of a particular voter.
>
> TWOX-NOTE: SAFE as `AccountId` is a crypto hash.

arguments:

- key: `AccountId`

returns: `Voter`

<hr>

### _Extrinsics_

#### **api.tx.electionsPhragmen.vote**

> Vote for a set of candidates for the upcoming round of election. This can be called to
> set the initial votes, or update already existing votes.
>
> Upon initial voting, `value` units of `who`'s balance is locked and a deposit amount is
> reserved. The deposit is based on the number of votes and can be updated over time.
>
> The `votes` should:
>
> - not be empty.
> - be less than the number of possible candidates. Note that all current members and
>   runners-up are also automatically candidates for the next round.
>
> If `value` is more than `who`'s total balance, then the maximum of the two is used.
>
> The dispatch origin of this call must be signed.
>
> ### Warning
>
> It is the responsibility of the caller to **NOT** place all of their balance into the
> lock and keep some for further operations.
>
> # <weight>
>
> We assume the maximum weight among all 3 cases: vote_equal, vote_more and vote_less.
>
> # </weight>

arguments:

- votes: `Vec<AccountId>`
- value: `Compact<BalanceOf>`
<hr>

#### **api.tx.electionsPhragmen.removeVoter**

> Remove `origin` as a voter.
>
> This removes the lock and returns the deposit.
>
> The dispatch origin of this call must be signed and be a voter.

arguments: -

<hr>

#### **api.tx.electionsPhragmen.submitCandidacy**

> Submit oneself for candidacy. A fixed amount of deposit is recorded.
>
> All candidates are wiped at the end of the term. They either become a member/runner-up,
> or leave the system while their deposit is slashed.
>
> The dispatch origin of this call must be signed.
>
> ### Warning
>
> Even if a candidate ends up being a member, they must call [`Call::renounce_candidacy`]
> to get their deposit back. Losing the spot in an election will always lead to a slash.
>
> # <weight>
>
> The number of current candidates must be provided as witness data.
>
> # </weight>

arguments:

- candidate_count: `Compact<u32>`
<hr>

#### **api.tx.electionsPhragmen.renounceCandidacy**

> Renounce one's intention to be a candidate for the next election round. 3 potential
> outcomes exist:
>
> - `origin` is a candidate and not elected in any set. In this case, the deposit is
>   unreserved, returned and origin is removed as a candidate.
> - `origin` is a current runner-up. In this case, the deposit is unreserved, returned and
>   origin is removed as a runner-up.
> - `origin` is a current member. In this case, the deposit is unreserved and origin is
>   removed as a member, consequently not being a candidate for the next round anymore.
>   Similar to [`remove_members`], if replacement runners exists, they are immediately used.
>   If the prime is renouncing, then no prime will exist until the next round.
>
> The dispatch origin of this call must be signed, and have one of the above roles.
>
> # <weight>
>
> The type of renouncing must be provided as witness data.
>
> # </weight>

arguments:

- renouncing: `Renouncing`
<hr>

#### **api.tx.electionsPhragmen.removeMember**

> Remove a particular member from the set. This is effective immediately and the bond of
> the outgoing member is slashed.
>
> If a runner-up is available, then the best runner-up will be removed and replaces the
> outgoing member. Otherwise, a new phragmen election is started.
>
> The dispatch origin of this call must be root.
>
> Note that this does not affect the designated block number of the next election.
>
> # <weight>
>
> If we have a replacement, we use a small weight. Else, since this is a root call and
> will go into phragmen, we assume full block for now.
>
> # </weight>

arguments:

- who: `LookupSource`
- has_replacement: `bool`
<hr>

#### **api.tx.electionsPhragmen.cleanDefunctVoters**

> Clean all voters who are defunct (i.e. they do not serve any purpose at all). The
> deposit of the removed voters are returned.
>
> This is an root function to be used only for cleaning the state.
>
> The dispatch origin of this call must be root.
>
> # <weight>
>
> The total number of voters and those that are defunct must be provided as witness data.
>
> # </weight>

arguments:

- \_num_voters: `u32`
- \_num_defunct: `u32`
<hr>

## VestedRewards pallet

### _State Queries_

#### **api.query.vestedRewards.rewards**

> Reserved for future use
> Mapping between users and their owned rewards of different kinds, which are vested.

arguments:

- key: `AccountId`

returns: `RewardInfo`

<hr>

#### **api.query.vestedRewards.totalRewards**

> Reserved for future use
> Total amount of PSWAP pending rewards.

arguments: -

returns: `Balance`

<hr>

#### **api.query.vestedRewards.marketMakersRegistry**

> Registry of market makers with large transaction volumes (>1 XOR per transaction).

arguments:

- key: `AccountId`

returns: `MarketMakerInfo`

<hr>

#### **api.query.vestedRewards.marketMakingPairs**

> Market making pairs storage.

arguments:

- key1: `AssetId`
- key2: `AssetId`

returns: `()`

<hr>

### _Extrinsics_

#### **api.tx.vestedRewards.claimRewards**

> Claim all available PSWAP rewards by account signing this transaction.

arguments: -

<hr>

#### **api.tx.vestedRewards.injectMarketMakers**

> Inject market makers snapshot into storage.

arguments:

- snapshot: `Vec<(AccountId,u32,Balance)>`
<hr>

#### **api.tx.vestedRewards.setAssetPair**

> Allow/disallow a market making pair.

arguments:

- from_asset_id: `AssetId`
- to_asset_id: `AssetId`
- market_making_rewards_allowed: `bool`
<hr>

## Identity pallet

### _State Queries_

#### **api.query.identity.identityOf**

> Information that is pertinent to identify the entity behind an account.
>
> TWOX-NOTE: OK ― `AccountId` is a secure hash.

arguments:

- key: `AccountId`

returns: `Registration`

<hr>

#### **api.query.identity.superOf**

> The super-identity of an alternative "sub" identity together with its name, within that
> context. If the account is not some other account's sub-identity, then just `None`.

arguments:

- key: `AccountId`

returns: `(AccountId,Data)`

<hr>

#### **api.query.identity.subsOf**

> Alternative "sub" identities of this account.
>
> The first item is the deposit, the second is a vector of the accounts.
>
> TWOX-NOTE: OK ― `AccountId` is a secure hash.

arguments:

- key: `AccountId`

returns: `(BalanceOf,Vec<AccountId>)`

<hr>

#### **api.query.identity.registrars**

> The set of registrars. Not expected to get very big as can only be added through a
> special origin (likely a council motion).
>
> The index into this can be cast to `RegistrarIndex` to get a valid value.

arguments: -

returns: `Vec<Option<RegistrarInfo>>`

<hr>

### _Extrinsics_

#### **api.tx.identity.addRegistrar**

> Add a registrar to the system.
>
> The dispatch origin for this call must be `T::RegistrarOrigin`.
>
> - `account`: the account of the registrar.
>
> Emits `RegistrarAdded` if successful.
>
> # <weight>
>
> - `O(R)` where `R` registrar-count (governance-bounded and code-bounded).
> - One storage mutation (codec `O(R)`).
> - One event.
>
> # </weight>

arguments:

- account: `AccountId`
<hr>

#### **api.tx.identity.setIdentity**

> Set an account's identity information and reserve the appropriate deposit.
>
> If the account already has identity information, the deposit is taken as part payment
> for the new deposit.
>
> The dispatch origin for this call must be _Signed_.
>
> - `info`: The identity information.
>
> Emits `IdentitySet` if successful.
>
> # <weight>
>
> - `O(X + X' + R)`
>   - where `X` additional-field-count (deposit-bounded and code-bounded)
>   - where `R` judgements-count (registrar-count-bounded)
> - One balance reserve operation.
> - One storage mutation (codec-read `O(X' + R)`, codec-write `O(X + R)`).
> - One event.
>
> # </weight>

arguments:

- info: `IdentityInfo`
<hr>

#### **api.tx.identity.setSubs**

> Set the sub-accounts of the sender.
>
> Payment: Any aggregate balance reserved by previous `set_subs` calls will be returned
> and an amount `SubAccountDeposit` will be reserved for each item in `subs`.
>
> The dispatch origin for this call must be _Signed_ and the sender must have a registered
> identity.
>
> - `subs`: The identity's (new) sub-accounts.
>
> # <weight>
>
> - `O(P + S)`
>   - where `P` old-subs-count (hard- and deposit-bounded).
>   - where `S` subs-count (hard- and deposit-bounded).
> - At most one balance operations.
> - DB:
>   - `P + S` storage mutations (codec complexity `O(1)`)
>   - One storage read (codec complexity `O(P)`).
>   - One storage write (codec complexity `O(S)`).
>   - One storage-exists (`IdentityOf::contains_key`).
>
> # </weight>

arguments:

- subs: `Vec<(AccountId,Data)>`
<hr>

#### **api.tx.identity.clearIdentity**

> Clear an account's identity info and all sub-accounts and return all deposits.
>
> Payment: All reserved balances on the account are returned.
>
> The dispatch origin for this call must be _Signed_ and the sender must have a registered
> identity.
>
> Emits `IdentityCleared` if successful.
>
> # <weight>
>
> - `O(R + S + X)`
>   - where `R` registrar-count (governance-bounded).
>   - where `S` subs-count (hard- and deposit-bounded).
>   - where `X` additional-field-count (deposit-bounded and code-bounded).
> - One balance-unreserve operation.
> - `2` storage reads and `S + 2` storage deletions.
> - One event.
>
> # </weight>

arguments: -

<hr>

#### **api.tx.identity.requestJudgement**

> Request a judgement from a registrar.
>
> Payment: At most `max_fee` will be reserved for payment to the registrar if judgement
> given.
>
> The dispatch origin for this call must be _Signed_ and the sender must have a
> registered identity.
>
> - `reg_index`: The index of the registrar whose judgement is requested.
> - `max_fee`: The maximum fee that may be paid. This should just be auto-populated as:
>
> ```nocompile
> Self::registrars().get(reg_index).unwrap().fee
> ```
>
> Emits `JudgementRequested` if successful.
>
> # <weight>
>
> - `O(R + X)`.
> - One balance-reserve operation.
> - Storage: 1 read `O(R)`, 1 mutate `O(X + R)`.
> - One event.
>
> # </weight>

arguments:

- reg_index: `Compact<RegistrarIndex>`
- max_fee: `Compact<BalanceOf>`
<hr>

#### **api.tx.identity.cancelRequest**

> Cancel a previous request.
>
> Payment: A previously reserved deposit is returned on success.
>
> The dispatch origin for this call must be _Signed_ and the sender must have a
> registered identity.
>
> - `reg_index`: The index of the registrar whose judgement is no longer requested.
>
> Emits `JudgementUnrequested` if successful.
>
> # <weight>
>
> - `O(R + X)`.
> - One balance-reserve operation.
> - One storage mutation `O(R + X)`.
> - One event
>
> # </weight>

arguments:

- reg_index: `RegistrarIndex`
<hr>

#### **api.tx.identity.setFee**

> Set the fee required for a judgement to be requested from a registrar.
>
> The dispatch origin for this call must be _Signed_ and the sender must be the account
> of the registrar whose index is `index`.
>
> - `index`: the index of the registrar whose fee is to be set.
> - `fee`: the new fee.
>
> # <weight>
>
> - `O(R)`.
> - One storage mutation `O(R)`.
> - Benchmark: 7.315 + R \* 0.329 µs (min squares analysis)
>
> # </weight>

arguments:

- index: `Compact<RegistrarIndex>`
- fee: `Compact<BalanceOf>`
<hr>

#### **api.tx.identity.setAccountId**

> Change the account associated with a registrar.
>
> The dispatch origin for this call must be _Signed_ and the sender must be the account
> of the registrar whose index is `index`.
>
> - `index`: the index of the registrar whose fee is to be set.
> - `new`: the new account ID.
>
> # <weight>
>
> - `O(R)`.
> - One storage mutation `O(R)`.
> - Benchmark: 8.823 + R \* 0.32 µs (min squares analysis)
>
> # </weight>

arguments:

- index: `Compact<RegistrarIndex>`
- new: `AccountId`
<hr>

#### **api.tx.identity.setFields**

> Set the field information for a registrar.
>
> The dispatch origin for this call must be _Signed_ and the sender must be the account
> of the registrar whose index is `index`.
>
> - `index`: the index of the registrar whose fee is to be set.
> - `fields`: the fields that the registrar concerns themselves with.
>
> # <weight>
>
> - `O(R)`.
> - One storage mutation `O(R)`.
> - Benchmark: 7.464 + R \* 0.325 µs (min squares analysis)
>
> # </weight>

arguments:

- index: `Compact<RegistrarIndex>`
- fields: `IdentityFields`
<hr>

#### **api.tx.identity.provideJudgement**

> Provide a judgement for an account's identity.
>
> The dispatch origin for this call must be _Signed_ and the sender must be the account
> of the registrar whose index is `reg_index`.
>
> - `reg_index`: the index of the registrar whose judgement is being made.
> - `target`: the account whose identity the judgement is upon. This must be an account
>   with a registered identity.
> - `judgement`: the judgement of the registrar of index `reg_index` about `target`.
>
> Emits `JudgementGiven` if successful.
>
> # <weight>
>
> - `O(R + X)`.
> - One balance-transfer operation.
> - Up to one account-lookup operation.
> - Storage: 1 read `O(R)`, 1 mutate `O(R + X)`.
> - One event.
>
> # </weight>

arguments:

- reg_index: `Compact<RegistrarIndex>`
- target: `LookupSource`
- judgement: `IdentityJudgement`
<hr>

#### **api.tx.identity.killIdentity**

> Remove an account's identity and sub-account information and slash the deposits.
>
> Payment: Reserved balances from `set_subs` and `set_identity` are slashed and handled by
> `Slash`. Verification request deposits are not returned; they should be cancelled
> manually using `cancel_request`.
>
> The dispatch origin for this call must match `T::ForceOrigin`.
>
> - `target`: the account whose identity the judgement is upon. This must be an account
>   with a registered identity.
>
> Emits `IdentityKilled` if successful.
>
> # <weight>
>
> - `O(R + S + X)`.
> - One balance-reserve operation.
> - `S + 2` storage mutations.
> - One event.
>
> # </weight>

arguments:

- target: `LookupSource`
<hr>

#### **api.tx.identity.addSub**

> Add the given account to the sender's subs.
>
> Payment: Balance reserved by a previous `set_subs` call for one sub will be repatriated
> to the sender.
>
> The dispatch origin for this call must be _Signed_ and the sender must have a registered
> sub identity of `sub`.

arguments:

- sub: `LookupSource`
- data: `Data`
<hr>

#### **api.tx.identity.renameSub**

> Alter the associated name of the given sub-account.
>
> The dispatch origin for this call must be _Signed_ and the sender must have a registered
> sub identity of `sub`.

arguments:

- sub: `LookupSource`
- data: `Data`
<hr>

#### **api.tx.identity.removeSub**

> Remove the given account from the sender's subs.
>
> Payment: Balance reserved by a previous `set_subs` call for one sub will be repatriated
> to the sender.
>
> The dispatch origin for this call must be _Signed_ and the sender must have a registered
> sub identity of `sub`.

arguments:

- sub: `LookupSource`
<hr>

#### **api.tx.identity.quitSub**

> Remove the sender as a sub-account.
>
> Payment: Balance reserved by a previous `set_subs` call for one sub will be repatriated
> to the sender (_not_ the original depositor).
>
> The dispatch origin for this call must be _Signed_ and the sender must have a registered
> super-identity.
>
> NOTE: This should not normally be used, but is provided in the case that the non-
> controller of an account is maliciously registered as a sub-account.

arguments: -

<hr>

## Farming pallet

### _State Queries_

#### **api.query.farming.pools**

> Pools whose farmers are refreshed at the specific block. Block => Pools

arguments:

- key: `BlockNumber`

returns: `Vec<AccountId>`

<hr>

#### **api.query.farming.poolFarmers**

> Farmers of the pool. Pool => Farmers

arguments:

- key: `AccountId`

returns: `Vec<PoolFarmer>`

<hr>

### _Extrinsics_

#### **api.tx.farming.migrateTo11**

arguments: -

<hr>

## XstPool pallet

### _State Queries_

#### **api.query.xstPool.permissionedTechAccount**

> Technical account used to store collateral tokens.

arguments: -

returns: `TechAccountId`

<hr>

#### **api.query.xstPool.baseFee**

> Base fee in XOR which is deducted on all trades, currently it's burned: 0.3%.

arguments: -

returns: `Fixed`

<hr>

#### **api.query.xstPool.enabledSynthetics**

> XST Assets allowed to be traded using XST.

arguments: -

returns: `BTreeSet<AssetId>`

<hr>

#### **api.query.xstPool.referenceAssetId**

> Asset that is used to compare collateral assets by value, e.g., DAI.

arguments: -

returns: `AssetId`

<hr>

#### **api.query.xstPool.collateralReserves**

> Current reserves balance for collateral tokens, used for client usability.

arguments:

- key: `AssetId`

returns: `Balance`

<hr>

### _Extrinsics_

#### **api.tx.xstPool.initializePool**

> Enable exchange path on the pool for pair BaseAsset-SyntheticAsset.

arguments:

- synthetic_asset_id: `AssetId`
<hr>

#### **api.tx.xstPool.setReferenceAsset**

> Change reference asset which is used to determine collateral assets value. Intended to be e.g., stablecoin DAI.

arguments:

- reference_asset_id: `AssetId`
<hr>

#### **api.tx.xstPool.enableSyntheticAsset**

arguments:

- synthetic_asset: `AssetId`
<hr>

## PriceTools pallet

### _State Queries_

#### **api.query.priceTools.priceInfos**

arguments:

- key: `AssetId`

returns: `PriceInfo`

<hr>

## CeresStaking pallet

### _State Queries_

#### **api.query.ceresStaking.authorityAccount**

> Account which has permissions for changing remaining rewards

arguments: -

returns: `AccountIdOf`

<hr>

#### **api.query.ceresStaking.stakers**

> AccountId -> StakingInfo

arguments:

- key: `AccountIdOf`

returns: `StakingInfo`

<hr>

#### **api.query.ceresStaking.totalDeposited**

arguments: -

returns: `Balance`

<hr>

#### **api.query.ceresStaking.rewardsRemaining**

arguments: -

returns: `Balance`

<hr>

### _Extrinsics_

#### **api.tx.ceresStaking.deposit**

arguments:

- amount: `Balance`
<hr>

#### **api.tx.ceresStaking.withdraw**

arguments: -

<hr>

#### **api.tx.ceresStaking.changeRewardsRemaining**

> Change RewardsRemaining

arguments:

- rewards_remaining: `Balance`
<hr>

## CeresLiquidityLocker pallet

### _State Queries_

#### **api.query.ceresLiquidityLocker.feesOptionOneAccount**

> Account for collecting fees from Option 1

arguments: -

returns: `AccountIdOf`

<hr>

#### **api.query.ceresLiquidityLocker.feesOptionTwoAccount**

> Account for collecting fees from Option 2

arguments: -

returns: `AccountIdOf`

<hr>

#### **api.query.ceresLiquidityLocker.feesOptionTwoCeresAmount**

> Amount of CERES for locker fees option two

arguments: -

returns: `Balance`

<hr>

#### **api.query.ceresLiquidityLocker.authorityAccount**

> Account which has permissions for changing CERES amount fee

arguments: -

returns: `AccountIdOf`

<hr>

#### **api.query.ceresLiquidityLocker.lockerData**

arguments:

- key: `AccountIdOf`

returns: `Vec<LockInfo>`

<hr>

### _Extrinsics_

#### **api.tx.ceresLiquidityLocker.lockLiquidity**

> Lock liquidity

arguments:

- asset_a: `AssetIdOf`
- asset_b: `AssetIdOf`
- unlocking_block: `BlockNumber`
- percentage_of_pool_tokens: `Balance`
- option: `bool`
<hr>

#### **api.tx.ceresLiquidityLocker.changeCeresFee**

> Change CERES fee

arguments:

- ceres_fee: `Balance`
<hr>

## CeresTokenLocker pallet

### _State Queries_

#### **api.query.ceresTokenLocker.feesAccount**

> Account for collecting fees

arguments: -

returns: `AccountIdOf`

<hr>

#### **api.query.ceresTokenLocker.authorityAccount**

> Account which has permissions for changing fee

arguments: -

returns: `AccountIdOf`

<hr>

#### **api.query.ceresTokenLocker.feeAmount**

> Amount of CERES for locker fees option two

arguments: -

returns: `Balance`

<hr>

#### **api.query.ceresTokenLocker.tokenLockerData**

arguments:

- key: `AccountIdOf`

returns: `Vec<TokenLockInfo>`

<hr>

### _Extrinsics_

#### **api.tx.ceresTokenLocker.lockTokens**

> Lock tokens

arguments:

- asset_id: `AssetIdOf`
- unlocking_block: `BlockNumber`
- number_of_tokens: `Balance`
<hr>

#### **api.tx.ceresTokenLocker.withdrawTokens**

> Withdraw tokens

arguments:

- asset_id: `AssetIdOf`
- unlocking_block: `BlockNumber`
- number_of_tokens: `Balance`
<hr>

#### **api.tx.ceresTokenLocker.changeFee**

> Change fee

arguments:

- new_fee: `Balance`
<hr>

## CeresGovernancePlatform pallet

### _State Queries_

#### **api.query.ceresGovernancePlatform.voting**

> A vote of a particular user for a particular poll

arguments:

- key1: `Bytes`
- key2: `AccountIdOf`

returns: `VotingInfo`

<hr>

#### **api.query.ceresGovernancePlatform.pollData**

arguments:

- key: `Bytes`

returns: `PollInfo`

<hr>

### _Extrinsics_

#### **api.tx.ceresGovernancePlatform.vote**

> Voting for option

arguments:

- poll_id: `Bytes`
- voting_option: `u32`
- number_of_votes: `Balance`
<hr>

#### **api.tx.ceresGovernancePlatform.createPoll**

> Create poll

arguments:

- poll_id: `Bytes`
- number_of_options: `u32`
- poll_start_block: `BlockNumber`
- poll_end_block: `BlockNumber`
<hr>

#### **api.tx.ceresGovernancePlatform.withdraw**

> Withdraw voting funds

arguments:

- poll_id: `Bytes`
<hr>

## CeresLaunchpad pallet

### _State Queries_

#### **api.query.ceresLaunchpad.penaltiesAccount**

> Account for collecting penalties

arguments: -

returns: `AccountIdOf`

<hr>

#### **api.query.ceresLaunchpad.ceresBurnFeeAmount**

> Amount of CERES for burn fee

arguments: -

returns: `Balance`

<hr>

#### **api.query.ceresLaunchpad.ceresForContributionInILO**

> Amount of CERES for contribution in ILO

arguments: -

returns: `Balance`

<hr>

#### **api.query.ceresLaunchpad.authorityAccount**

> Account which has permissions for changing CERES burn amount fee

arguments: -

returns: `AccountIdOf`

<hr>

#### **api.query.ceresLaunchpad.iLOs**

arguments:

- key: `AssetIdOf`

returns: `ILOInfo`

<hr>

#### **api.query.ceresLaunchpad.contributions**

arguments:

- key1: `AssetIdOf`
- key2: `AccountIdOf`

returns: `ContributionInfo`

<hr>

### _Extrinsics_

#### **api.tx.ceresLaunchpad.createIlo**

> Create ILO

arguments:

- asset_id: `AssetIdOf`
- tokens_for_ilo: `Balance`
- tokens_for_liquidity: `Balance`
- ilo_price: `Balance`
- soft_cap: `Balance`
- hard_cap: `Balance`
- min_contribution: `Balance`
- max_contribution: `Balance`
- refund_type: `bool`
- liquidity_percent: `Balance`
- listing_price: `Balance`
- lockup_days: `u32`
- start_block: `BlockNumber`
- end_block: `BlockNumber`
- first_release_percent: `Balance`
- vesting_period: `BlockNumber`
- vesting_percent: `Balance`
<hr>

#### **api.tx.ceresLaunchpad.contribute**

> Contribute

arguments:

- asset_id: `AssetIdOf`
- funds_to_contribute: `Balance`
<hr>

#### **api.tx.ceresLaunchpad.emergencyWithdraw**

> Emergency withdraw

arguments:

- asset_id: `AssetIdOf`
<hr>

#### **api.tx.ceresLaunchpad.finishIlo**

> Finish ILO

arguments:

- asset_id: `AssetIdOf`
<hr>

#### **api.tx.ceresLaunchpad.claimLpTokens**

> Claim LP tokens

arguments:

- asset_id: `AssetIdOf`
<hr>

#### **api.tx.ceresLaunchpad.claim**

> Claim tokens

arguments:

- asset_id: `AssetIdOf`
<hr>

#### **api.tx.ceresLaunchpad.changeCeresBurnFee**

> Change CERES burn fee

arguments:

- ceres_fee: `Balance`
<hr>

#### **api.tx.ceresLaunchpad.changeCeresContributionFee**

> Change CERES contribution fee

arguments:

- ceres_fee: `Balance`
<hr>

#### **api.tx.ceresLaunchpad.claimPswapRewards**

> Claim PSWAP rewards

arguments: -

<hr>

## Utility pallet

### _Extrinsics_

#### **api.tx.utility.batch**

> Send a batch of dispatch calls.
>
> May be called from any origin.
>
> - `calls`: The calls to be dispatched from the same origin.
>
> If origin is root then call are dispatch without checking origin filter. (This includes
> bypassing `frame_system::Config::BaseCallFilter`).
>
> # <weight>
>
> - Complexity: O(C) where C is the number of calls to be batched.
>
> # </weight>
>
> This will return `Ok` in all circumstances. To determine the success of the batch, an
> event is deposited. If a call failed and the batch was interrupted, then the
> `BatchInterrupted` event is deposited, along with the number of successful calls made
> and the error of the failed call. If all were successful, then the `BatchCompleted`
> event is deposited.

arguments:

- calls: `Vec<Call>`
<hr>

#### **api.tx.utility.asDerivative**

> Send a call through an indexed pseudonym of the sender.
>
> Filter from origin are passed along. The call will be dispatched with an origin which
> use the same filter as the origin of this call.
>
> NOTE: If you need to ensure that any account-based filtering is not honored (i.e.
> because you expect `proxy` to have been used prior in the call stack and you do not want
> the call restrictions to apply to any sub-accounts), then use `as_multi_threshold_1`
> in the Multisig pallet instead.
>
> NOTE: Prior to version \*12, this was called `as_limited_sub`.
>
> The dispatch origin for this call must be _Signed_.

arguments:

- index: `u16`
- call: `Call`
<hr>

#### **api.tx.utility.batchAll**

> Send a batch of dispatch calls and atomically execute them.
> The whole transaction will rollback and fail if any of the calls failed.
>
> May be called from any origin.
>
> - `calls`: The calls to be dispatched from the same origin.
>
> If origin is root then call are dispatch without checking origin filter. (This includes
> bypassing `frame_system::Config::BaseCallFilter`).
>
> # <weight>
>
> - Complexity: O(C) where C is the number of calls to be batched.
>
> # </weight>

arguments:

- calls: `Vec<Call>`
<hr>

## Currencies pallet

### _Extrinsics_

#### **api.tx.currencies.transfer**

> Transfer some balance to another account under `currency_id`.
>
> The dispatch origin for this call must be `Signed` by the
> transactor.

arguments:

- dest: `LookupSource`
- currency_id: `CurrencyIdOf`
- amount: `Compact<BalanceOf>`
<hr>

#### **api.tx.currencies.transferNativeCurrency**

> Transfer some native currency to another account.
>
> The dispatch origin for this call must be `Signed` by the
> transactor.

arguments:

- dest: `LookupSource`
- amount: `Compact<BalanceOf>`
<hr>

#### **api.tx.currencies.updateBalance**

> update amount of account `who` under `currency_id`.
>
> The dispatch origin of this call must be _Root_.

arguments:

- who: `LookupSource`
- currency_id: `CurrencyIdOf`
- amount: `AmountOf`
<hr>

## LiquidityProxy pallet

### _Extrinsics_

#### **api.tx.liquidityProxy.swap**

> Perform swap of tokens (input/output defined via SwapAmount direction).
>
> - `origin`: the account on whose behalf the transaction is being executed,
> - `dex_id`: DEX ID for which liquidity sources aggregation is being done,
> - `input_asset_id`: ID of the asset being sold,
> - `output_asset_id`: ID of the asset being bought,
> - `swap_amount`: the exact amount to be sold (either in input_asset_id or output_asset_id units with corresponding slippage tolerance absolute bound),
> - `selected_source_types`: list of selected LiquiditySource types, selection effect is determined by filter_mode,
> - `filter_mode`: indicate either to allow or forbid selected types only, or disable filtering.

arguments:

- dex_id: `DEXId`
- input_asset_id: `AssetId`
- output_asset_id: `AssetId`
- swap_amount: `SwapAmount`
- selected_source_types: `Vec<LiquiditySourceType>`
- filter_mode: `FilterMode`
<hr>

### _Custom RPCs_

#### **api.rpc.liquidityProxy.quote**

> Get price with indicated Asset amount and direction, filtered by selected_types

arguments:

- dexId: `DEXId`
- inputAssetId: `AssetId`
- outputAssetId: `AssetId`
- amount: `String`
- swapVariant: `SwapVariant`
- selectedSourceTypes: `Vec<LiquiditySourceType>`
- filterMode: `FilterMode`
- at: `BlockHash`

returns: `Option<LPSwapOutcomeInfo>`

<hr>

#### **api.rpc.liquidityProxy.isPathAvailable**

> Check if given two arbitrary tokens can be exchanged via any liquidity sources

arguments:

- dexId: `DEXId`
- inputAssetId: `AssetId`
- outputAssetId: `AssetId`
- at: `BlockHash`

returns: `bool`

<hr>

#### **api.rpc.liquidityProxy.listEnabledSourcesForPath**

> Given two arbitrary tokens, list liquidity sources that can be used along the path.

arguments:

- dexId: `DEXId`
- inputAssetId: `AssetId`
- outputAssetId: `AssetId`
- at: `BlockHash`

returns: `Vec<LiquiditySourceType>`

<hr>

## Rpc pallet

### _Custom RPCs_

#### **api.rpc.rpc.methods**

> Retrieves the list of RPC methods that are exposed by the node

arguments: -

returns: `RpcMethods`

<hr>

## Author pallet

### _Custom RPCs_

#### **api.rpc.author.hasKey**

> Returns true if the keystore has private keys for the given public key and key type.

arguments:

- publicKey: `Bytes`
- keyType: `Text`

returns: `bool`

<hr>

#### **api.rpc.author.hasSessionKeys**

> Returns true if the keystore has private keys for the given session public keys.

arguments:

- sessionKeys: `Bytes`

returns: `bool`

<hr>

#### **api.rpc.author.removeExtrinsic**

> Remove given extrinsic from the pool and temporarily ban it to prevent reimporting

arguments:

- bytesOrHash: `Vec<ExtrinsicOrHash>`

returns: `Vec<Hash>`

<hr>

#### **api.rpc.author.insertKey**

> Insert a key into the keystore.

arguments:

- keyType: `Text`
- suri: `Text`
- publicKey: `Bytes`

returns: `Bytes`

<hr>

#### **api.rpc.author.rotateKeys**

> Generate new session keys and returns the corresponding public keys

arguments: -

returns: `Bytes`

<hr>

#### **api.rpc.author.pendingExtrinsics**

> Returns all pending extrinsics, potentially grouped by sender

arguments: -

returns: `Vec<Extrinsic>`

<hr>

#### **api.rpc.author.submitExtrinsic**

> Submit a fully formatted extrinsic for block inclusion

arguments:

- extrinsic: `Extrinsic`

returns: `Hash`

<hr>

#### **api.rpc.author.submitAndWatchExtrinsic**

> Submit and subscribe to watch an extrinsic until unsubscribed

arguments:

- extrinsic: `Extrinsic`

returns: `ExtrinsicStatus`

<hr>

## Chain pallet

### _Custom RPCs_

#### **api.rpc.chain.getHeader**

> Retrieves the header for a specific block

arguments:

- hash: `BlockHash`

returns: `Header`

<hr>

#### **api.rpc.chain.getBlock**

> Get header and body of a relay chain block

arguments:

- hash: `BlockHash`

returns: `SignedBlock`

<hr>

#### **api.rpc.chain.getBlockHash**

> Get the block hash for a specific block

arguments:

- blockNumber: `BlockNumber`

returns: `BlockHash`

<hr>

#### **api.rpc.chain.getFinalizedHead**

> Get hash of the last finalized block in the canon chain

arguments: -

returns: `BlockHash`

<hr>

#### **api.rpc.chain.subscribeNewHeads**

> Retrieves the best header via subscription

arguments: -

returns: `Header`

<hr>

#### **api.rpc.chain.subscribeFinalizedHeads**

> Retrieves the best finalized header via subscription

arguments: -

returns: `Header`

<hr>

#### **api.rpc.chain.subscribeAllHeads**

> Retrieves the newest header via subscription

arguments: -

returns: `Header`

<hr>

## Childstate pallet

### _Custom RPCs_

#### **api.rpc.childstate.getKeys**

> Returns the keys with prefix from a child storage, leave empty to get all the keys

arguments:

- childKey: `PrefixedStorageKey`
- prefix: `StorageKey`
- at: `Hash`

returns: `Vec<StorageKey>`

<hr>

#### **api.rpc.childstate.getStorage**

> Returns a child storage entry at a specific block state

arguments:

- childKey: `PrefixedStorageKey`
- key: `StorageKey`
- at: `Hash`

returns: `Option<StorageData>`

<hr>

#### **api.rpc.childstate.getStorageHash**

> Returns the hash of a child storage entry at a block state

arguments:

- childKey: `PrefixedStorageKey`
- key: `StorageKey`
- at: `Hash`

returns: `Option<Hash>`

<hr>

#### **api.rpc.childstate.getStorageSize**

> Returns the size of a child storage entry at a block state

arguments:

- childKey: `PrefixedStorageKey`
- key: `StorageKey`
- at: `Hash`

returns: `Option<u64>`

<hr>

## Offchain pallet

### _Custom RPCs_

#### **api.rpc.offchain.localStorageSet**

> Set offchain local storage under given key and prefix

arguments:

- kind: `StorageKind`
- key: `Bytes`
- value: `Bytes`

returns: `Null`

<hr>

#### **api.rpc.offchain.localStorageGet**

> Get offchain local storage under given key and prefix

arguments:

- kind: `StorageKind`
- key: `Bytes`

returns: `Option<Bytes>`

<hr>

## Payment pallet

### _Custom RPCs_

#### **api.rpc.payment.queryInfo**

> Retrieves the fee information for an encoded extrinsic

arguments:

- extrinsic: `Bytes`
- at: `BlockHash`

returns: `RuntimeDispatchInfo`

<hr>

#### **api.rpc.payment.queryFeeDetails**

> Query the detailed fee of a given encoded extrinsic

arguments:

- extrinsic: `Bytes`
- at: `BlockHash`

returns: `FeeDetails`

<hr>

## State pallet

### _Custom RPCs_

#### **api.rpc.state.call**

> Perform a call to a builtin on the chain

arguments:

- method: `Text`
- data: `Bytes`
- at: `BlockHash`

returns: `Bytes`

<hr>

#### **api.rpc.state.getKeys**

> Retrieves the keys with a certain prefix

arguments:

- key: `StorageKey`
- at: `BlockHash`

returns: `Vec<StorageKey>`

<hr>

#### **api.rpc.state.getPairs**

> Returns the keys with prefix, leave empty to get all the keys (deprecated: Use getKeysPaged)

arguments:

- prefix: `StorageKey`
- at: `BlockHash`

returns: `Vec<KeyValue>`

<hr>

#### **api.rpc.state.getKeysPaged**

> Returns the keys with prefix with pagination support.

arguments:

- key: `StorageKey`
- count: `u32`
- startKey: `StorageKey`
- at: `BlockHash`

returns: `Vec<StorageKey>`

<hr>

#### **api.rpc.state.getStorage**

> Retrieves the storage for a key

arguments:

- key: `StorageKey`
- at: `BlockHash`

returns: `StorageData`

<hr>

#### **api.rpc.state.getStorageHash**

> Retrieves the storage hash

arguments:

- key: `StorageKey`
- at: `BlockHash`

returns: `Hash`

<hr>

#### **api.rpc.state.getStorageSize**

> Retrieves the storage size

arguments:

- key: `StorageKey`
- at: `BlockHash`

returns: `u64`

<hr>

#### **api.rpc.state.getMetadata**

> Returns the runtime metadata

arguments:

- at: `BlockHash`

returns: `Metadata`

<hr>

#### **api.rpc.state.getRuntimeVersion**

> Get the runtime version

arguments:

- at: `BlockHash`

returns: `RuntimeVersion`

<hr>

#### **api.rpc.state.queryStorage**

> Query historical storage entries (by key) starting from a start block

arguments:

- keys: `Vec<StorageKey>`
- fromBlock: `Hash`
- toBlock: `BlockHash`

returns: `Vec<StorageChangeSet>`

<hr>

#### **api.rpc.state.queryStorageAt**

> Query storage entries (by key) starting at block hash given as the second parameter

arguments:

- keys: `Vec<StorageKey>`
- at: `BlockHash`

returns: `Vec<StorageChangeSet>`

<hr>

#### **api.rpc.state.getReadProof**

> Returns proof of storage entries at a specific block state

arguments:

- keys: `Vec<StorageKey>`
- at: `BlockHash`

returns: `ReadProof`

<hr>

#### **api.rpc.state.subscribeRuntimeVersion**

> Retrieves the runtime version via subscription

arguments: -

returns: `RuntimeVersion`

<hr>

#### **api.rpc.state.subscribeStorage**

> Subscribes to storage changes for the provided keys

arguments:

- keys: `Vec<StorageKey>`

returns: `StorageChangeSet`

<hr>

## DexApi pallet

### _Custom RPCs_

#### **api.rpc.dexApi.canExchange**

> Query capability to exchange particular tokens on DEX.

arguments:

- dexId: `DEXId`
- liquiditySourceType: `LiquiditySourceType`
- inputAssetId: `AssetId`
- outputAssetId: `AssetId`
- at: `BlockHash`

returns: `bool`

<hr>

#### **api.rpc.dexApi.listSupportedSources**

> List liquidity source types enabled on chain.

arguments:

- at: `BlockHash`

returns: `Vec<LiquiditySourceType>`

<hr>

#### **api.rpc.dexApi.quote**

> Get price for a given input or output token amount.

arguments:

- dexId: `DEXId`
- liquiditySourceType: `LiquiditySourceType`
- inputAssetId: `AssetId`
- outputAssetId: `AssetId`
- amount: `String`
- swapVariant: `SwapVariant`
- at: `BlockHash`

returns: `Option<SwapOutcomeInfo>`

<hr>

# Types

### AccountInfo

```
"AccountInfoWithDualRefCount"
```

### Address

```
"AccountId"
```

### Amount

```
"i128"
```

### AmountOf

```
"Amount"
```

### AssetId

```
"AssetId32"
```

### AssetId32

```
"[u8; 32]"
```

### AssetIdOf

```
"AssetId"
```

### AssetInfo

```
{
    asset_id: "AssetId",
    symbol: "AssetSymbolStr",
    name: "AssetNameStr",
    precision: "u8",
    is_mintable: "bool"
}
```

### AssetKind

```
{
    _enum: [
        "Thischain",
        "Sidechain",
        "SidechainOwned"
    ]
}
```

### AssetName

```
"Vec<u8>"
```

### AssetNameStr

```
"String"
```

### AssetRecord

```
"Null"
```

### AssetSymbol

```
"Vec<u8>"
```

### AssetSymbolStr

```
"String"
```

### Balance

```
"u128"
```

### BalanceInfo

```
{
    balance: "Balance"
}
```

### BalancePrecision

```
"u8"
```

### BasisPoints

```
"u16"
```

### BridgeNetworkId

```
"u32"
```

### BridgeStatus

```
{
    _enum: [
        "Initialized",
        "Migrating"
    ]
}
```

### BridgeTimepoint

```
{
    height: "MultiChainHeight",
    index: "u32"
}
```

### ChangePeersContract

```
{
    _enum: [
        "XOR",
        "VAL"
    ]
}
```

### ChargeFeeInfo

```
{
    tip: "Compact<Balance>",
    target_asset_id: "AssetId"
}
```

### ContentSource

```
"Text"
```

### ContributionInfo

```
{
    funds_contributed: "Balance",
    tokens_bought: "Balance",
    tokens_claimed: "Balance",
    claiming_finished: "bool",
    number_of_claims: "u32"
}
```

### ContributorsVesting

```
{
    first_release_percent: "Balance",
    vesting_period: "BlockNumber",
    vesting_percent: "Balance"
}
```

### CrowdloanReward

```
{
    id: "Vec<u8>",
    address: "Vec<u8>",
    contribution: "Fixed",
    xor_reward: "Fixed",
    val_reward: "Fixed",
    pswap_reward: "Fixed",
    xstusd_reward: "Fixed",
    percent: "Fixed"
}
```

### CurrencyId

```
"AssetId"
```

### CurrencyIdEncoded

```
{
    _enum: {
        AssetId: "H256",
        TokenAddress: "H160"
    }
}
```

### CurrencyIdOf

```
"AssetId"
```

### CustomInfo

```
{
    amount: "Balance"
}
```

### DEXId

```
"u32"
```

### DEXIdOf

```
"DEXId"
```

### DEXInfo

```
{
    base_asset_id: "AssetId",
    default_fee: "BasisPoints",
    default_protocol_fee: "BasisPoints"
}
```

### Description

```
"Text"
```

### DispatchErrorWithPostInfoTPostDispatchInfo

```
{
    post_info: "PostDispatchInfo",
    error: "DispatchError"
}
```

### DispatchResultWithPostInfo

```
"Result<PostDispatchInfo, DispatchErrorWithPostInfoTPostDispatchInfo>"
```

### DistributionAccounts

```
"Null"
```

### Duration

```
"Null"
```

### EthAddress

```
"H160"
```

### EthBridgeStorageVersion

```
{
    _enum: [
        "V1",
        "V2RemovePendingTransfers"
    ]
}
```

### EthPeersSync

```
{
    is_bridge_ready: "bool",
    is_xor_ready: "bool",
    is_val_ready: "bool"
}
```

### Farm

```
"Null"
```

### FarmId

```
"u64"
```

### Farmer

```
"Null"
```

### FilterMode

```
{
    _enum: [
        "Disabled",
        "ForbidSelected",
        "AllowSelected"
    ]
}
```

### Fixed

```
"FixedU128"
```

### FixedBytes

```
"Vec<u8>"
```

### HolderId

```
"AccountId"
```

### ILOInfo

```
{
    ilo_organizer: "AccountId",
    tokens_for_ilo: "Balance",
    tokens_for_liquidity: "Balance",
    ilo_price: "Balance",
    soft_cap: "Balance",
    hard_cap: "Balance",
    min_contribution: "Balance",
    max_contribution: "Balance",
    refund_type: "bool",
    liquidity_percent: "Balance",
    listing_price: "Balance",
    lockup_days: "u32",
    start_block: "BlockNumber",
    end_block: "BlockNumber",
    contributors_vesting: "ContributorsVesting",
    team_vesting: "TeamVesting",
    sold_tokens: "Balance",
    funds_raised: "Balance",
    succeeded: "bool",
    failed: "bool",
    lp_tokens: "Balance",
    claimed_lp_tokens: "bool",
    finish_block: "BlockNumber"
}
```

### IncomingAddToken

```
{
    token_address: "EthAddress",
    asset_id: "AssetId",
    precision: "BalancePrecision",
    symbol: "AssetSymbol",
    name: "AssetName",
    author: "AccountId",
    tx_hash: "H256",
    at_height: "u64",
    timepoint: "BridgeTimepoint",
    network_id: "BridgeNetworkId"
}
```

### IncomingCancelOutgoingRequest

```
{
    outgoing_request: "OutgoingRequest",
    outgoing_request_hash: "H256",
    initial_request_hash: "H256",
    tx_input: "Vec<u8>",
    author: "AccountId",
    tx_hash: "H256",
    at_height: "u64",
    timepoint: "BridgeTimepoint",
    network_id: "BridgeNetworkId"
}
```

### IncomingChangePeers

```
{
    peer_account_id: "AccountId",
    peer_address: "EthAddress",
    added: "bool",
    author: "AccountId",
    tx_hash: "H256",
    at_height: "u64",
    timepoint: "BridgeTimepoint",
    network_id: "BridgeNetworkId"
}
```

### IncomingChangePeersCompat

```
{
    peer_account_id: "AccountId",
    peer_address: "EthAddress",
    added: "bool",
    contract: "ChangePeersContract",
    author: "AccountId",
    tx_hash: "H256",
    at_height: "u64",
    timepoint: "BridgeTimepoint",
    network_id: "BridgeNetworkId"
}
```

### IncomingMarkAsDoneRequest

```
{
    outgoing_request_hash: "H256",
    initial_request_hash: "H256",
    author: "AccountId",
    at_height: "u64",
    timepoint: "BridgeTimepoint",
    network_id: "BridgeNetworkId"
}
```

### IncomingMetaRequestKind

```
{
    _enum: [
        "CancelOutgoingRequest",
        "MarkAsDone"
    ]
}
```

### IncomingMigrate

```
{
    new_contract_address: "EthAddress",
    author: "AccountId",
    tx_hash: "H256",
    at_height: "u64",
    timepoint: "BridgeTimepoint",
    network_id: "BridgeNetworkId"
}
```

### IncomingPrepareForMigration

```
{
    author: "AccountId",
    tx_hash: "H256",
    at_height: "u64",
    timepoint: "BridgeTimepoint",
    network_id: "BridgeNetworkId"
}
```

### IncomingRequest

```
{
    _enum: {
        Transfer: "IncomingTransfer",
        AddToken: "IncomingAddToken",
        ChangePeers: "IncomingChangePeers",
        CancelOutgoingRequest: "IncomingCancelOutgoingRequest",
        MarkAsDone: "IncomingMarkAsDoneRequest",
        PrepareForMigration: "IncomingPrepareForMigration",
        Migrate: "IncomingMigrate"
    }
}
```

### IncomingRequestKind

```
{
    _enum: {
        Transaction: "IncomingTransactionRequestKind",
        Meta: "IncomingMetaRequestKind"
    }
}
```

### IncomingTransactionRequestKind

```
{
    _enum: [
        "Transfer",
        "AddAsset",
        "AddPeer",
        "RemovePeer",
        "PrepareForMigration",
        "Migrate",
        "AddPeerCompat",
        "RemovePeerCompat",
        "TransferXOR"
    ]
}
```

### IncomingTransfer

```
{
    from: "EthAddress",
    to: "AccountId",
    asset_id: "AssetId",
    asset_kind: "AssetKind",
    amount: "Balance",
    author: "AccountId",
    tx_hash: "H256",
    at_height: "u64",
    timepoint: "BridgeTimepoint",
    network_id: "BridgeNetworkId"
}
```

### Keys

```
"SessionKeys3"
```

### LPRewardsInfo

```
{
    amount: "Balance",
    currency: "AssetId",
    reason: "RewardReason"
}
```

### LPSwapOutcomeInfo

```
{
    amount: "Balance",
    fee: "Balance",
    rewards: "Vec<LPRewardsInfo>",
    amount_without_impact: "Balance"
}
```

### LiquiditySourceType

```
{
    _enum: [
        "XYKPool",
        "BondingCurvePool",
        "MulticollateralBondingCurvePool",
        "MockPool",
        "MockPool2",
        "MockPool3",
        "MockPool4",
        "XSTPool"
    ]
}
```

### LoadIncomingMetaRequest

```
{
    author: "AccountId",
    hash: "H256",
    timepoint: "BridgeTimepoint",
    kind: "IncomingMetaRequestKind",
    network_id: "BridgeNetworkId"
}
```

### LoadIncomingRequest

```
{
    _enum: {
        Transaction: "LoadIncomingTransactionRequest",
        Meta: "(LoadIncomingMetaRequest, H256)"
    }
}
```

### LoadIncomingTransactionRequest

```
{
    author: "AccountId",
    hash: "H256",
    timepoint: "BridgeTimepoint",
    kind: "IncomingTransactionRequestKind",
    network_id: "BridgeNetworkId"
}
```

### LockInfo

```
{
    pool_tokens: "Balance",
    unlocking_block: "BlockNumber",
    asset_a: "AssetId",
    asset_b: "AssetId"
}
```

### LookupSource

```
"AccountId"
```

### MarketMakerInfo

```
{
    count: "u32",
    volume: "Balance"
}
```

### Mode

```
{
    _enum: [
        "Permit",
        "Forbid"
    ]
}
```

### MultiChainHeight

```
{
    _enum: {
        Thischain: "BlockNumber",
        Sidechain: "u64"
    }
}
```

### MultiCurrencyBalance

```
"Balance"
```

### MultiCurrencyBalanceOf

```
"MultiCurrencyBalance"
```

### MultisigAccount

```
{
    signatories: "Vec<AccountId>",
    threshold: "u8"
}
```

### OffchainRequest

```
{
    _enum: {
        Outgoing: "(OutgoingRequest, H256)",
        LoadIncoming: "LoadIncomingRequest",
        Incoming: "(IncomingRequest, H256)"
    }
}
```

### OracleKey

```
"AssetId"
```

### OutgoingAddAsset

```
{
    author: "AccountId",
    asset_id: "AssetId",
    supply: "Balance",
    nonce: "Index",
    network_id: "BridgeNetworkId",
    timepoint: "BridgeTimepoint"
}
```

### OutgoingAddAssetEncoded

```
{
    name: "String",
    symbol: "String",
    decimal: "u8",
    supply: "U256",
    sidechain_asset_id: "FixedBytes",
    hash: "H256",
    network_id: "H256",
    raw: "Vec<u8>"
}
```

### OutgoingAddPeer

```
{
    author: "AccountId",
    peer_address: "EthAddress",
    peer_account_id: "AccountId",
    nonce: "Index",
    network_id: "BridgeNetworkId",
    timepoint: "BridgeTimepoint"
}
```

### OutgoingAddPeerCompat

```
{
    author: "AccountId",
    peer_address: "EthAddress",
    peer_account_id: "AccountId",
    nonce: "Index",
    network_id: "BridgeNetworkId",
    timepoint: "BridgeTimepoint"
}
```

### OutgoingAddPeerEncoded

```
{
    peer_address: "EthAddress",
    tx_hash: "H256",
    network_id: "H256",
    raw: "Vec<u8>"
}
```

### OutgoingAddToken

```
{
    author: "AccountId",
    token_address: "EthAddress",
    ticker: "String",
    name: "String",
    decimals: "u8",
    nonce: "Index",
    network_id: "BridgeNetworkId",
    timepoint: "BridgeTimepoint"
}
```

### OutgoingAddTokenEncoded

```
{
    token_address: "EthAddress",
    ticker: "String",
    name: "String",
    decimals: "u8",
    hash: "H256",
    network_id: "H256",
    raw: "Vec<u8>"
}
```

### OutgoingMigrate

```
{
    author: "AccountId",
    new_contract_address: "EthAddress",
    erc20_native_tokens: "Vec<EthAddress>",
    nonce: "Index",
    network_id: "BridgeNetworkId",
    timepoint: "BridgeTimepoint"
}
```

### OutgoingMigrateEncoded

```
{
    this_contract_address: "EthAddress",
    tx_hash: "H256",
    new_contract_address: "EthAddress",
    erc20_native_tokens: "Vec<EthAddress>",
    network_id: "H256",
    raw: "Vec<u8>"
}
```

### OutgoingPrepareForMigration

```
{
    author: "AccountId",
    nonce: "Index",
    network_id: "BridgeNetworkId",
    timepoint: "BridgeTimepoint"
}
```

### OutgoingPrepareForMigrationEncoded

```
{
    this_contract_address: "EthAddress",
    tx_hash: "H256",
    network_id: "H256",
    raw: "Vec<u8>"
}
```

### OutgoingRemovePeer

```
{
    author: "AccountId",
    peer_account_id: "AccountId",
    peer_address: "EthAddress",
    nonce: "Index",
    network_id: "BridgeNetworkId",
    timepoint: "BridgeTimepoint"
}
```

### OutgoingRemovePeerCompat

```
{
    author: "AccountId",
    peer_account_id: "AccountId",
    peer_address: "EthAddress",
    nonce: "Index",
    network_id: "BridgeNetworkId",
    timepoint: "BridgeTimepoint"
}
```

### OutgoingRemovePeerEncoded

```
{
    peer_address: "EthAddress",
    tx_hash: "H256",
    network_id: "H256",
    raw: "Vec<u8>"
}
```

### OutgoingRequest

```
{
    _enum: {
        Transfer: "OutgoingTransfer",
        AddAsset: "OutgoingAddAsset",
        AddToken: "OutgoingAddToken",
        AddPeer: "OutgoingAddPeer",
        RemovePeer: "OutgoingRemovePeer",
        PrepareForMigration: "OutgoingPrepareForMigration",
        Migrate: "OutgoingMigrate"
    }
}
```

### OutgoingRequestEncoded

```
{
    _enum: {
        Transfer: "OutgoingTransferEncoded",
        AddAsset: "OutgoingAddAssetEncoded",
        AddToken: "OutgoingAddTokenEncoded",
        AddPeer: "OutgoingAddPeerEncoded",
        RemovePeer: "OutgoingRemovePeerEncoded",
        PrepareForMigration: "OutgoingPrepareForMigrationEncoded",
        Migrate: "OutgoingMigrateEncoded"
    }
}
```

### OutgoingTransfer

```
{
    from: "AccountId",
    to: "EthAddress",
    asset_id: "AssetId",
    amount: "Balance",
    nonce: "Index",
    network_id: "BridgeNetworkId",
    timepoint: "BridgeTimepoint"
}
```

### OutgoingTransferEncoded

```
{
    currency_id: "CurrencyIdEncoded",
    amount: "U256",
    to: "EthAddress",
    from: "EthAddress",
    tx_hash: "H256",
    network_id: "H256",
    raw: "Vec<u8>"
}
```

### OwnerId

```
"AccountId"
```

### PendingMultisigAccount

```
{
    approving_accounts: "Vec<AccountId>",
    migrate_at: "Option<BlockNumber>"
}
```

### Permission

```
"Null"
```

### PermissionId

```
"u32"
```

### PollInfo

```
{
    number_of_options: "u32",
    poll_start_block: "BlockNumber",
    poll_end_block: "BlockNumber"
}
```

### PoolData

```
{
    multiplier: "u32",
    deposit_fee: "Balance",
    is_core: "bool",
    is_farm: "bool",
    total_tokens_in_pool: "Balance",
    rewards: "Balance",
    rewards_to_be_distributed: "Balance",
    is_removed: "bool"
}
```

### PoolFarmer

```
{
    account: "AccountId",
    block: "BlockNumber",
    weight: "Balance"
}
```

### PostDispatchInfo

```
{
    actual_weight: "Option<Weight>",
    pays_fee: "Pays"
}
```

### PredefinedAssetId

```
{
    _enum: [
        "XOR",
        "DOT",
        "KSM",
        "USDT",
        "VAL",
        "PSWAP",
        "DAI",
        "ETH",
        "XSTUSD"
    ]
}
```

### PriceInfo

```
{
    price_failures: "u32",
    spot_prices: "Vec<Balance>",
    average_price: "Balance",
    needs_update: "bool",
    last_spot_price: "Balance"
}
```

### Public

```
"[u8; 33]"
```

### QuoteAmount

```
{
    _enum: {
        WithDesiredInput: "QuoteWithDesiredInput",
        WithDesiredOutput: "QuoteWithDesiredOutput"
    }
}
```

### QuoteWithDesiredInput

```
{
    desired_amount_in: "Balance"
}
```

### QuoteWithDesiredOutput

```
{
    desired_amount_out: "Balance"
}
```

### RefCount

```
"u32"
```

### RequestStatus

```
{
    _enum: [
        "Pending",
        "Frozen",
        "ApprovalsReady",
        "Failed",
        "Done"
    ]
}
```

### RewardInfo

```
{
    limit: "Balance",
    total_available: "Balance",
    rewards: "BTreeMap<RewardReason, Balance>"
}
```

### RewardReason

```
{
    _enum: [
        "Unspecified",
        "BuyOnBondingCurve",
        "LiquidityProvisionFarming",
        "MarketMakerVolume"
    ]
}
```

### Scope

```
{
    _enum: {
        Limited: "H512",
        Unlimited: "Null"
    }
}
```

### SignatureParams

```
{
    r: "[u8; 32]",
    s: "[u8; 32]",
    v: "u8"
}
```

### SmoothPriceState

```
"Null"
```

### StakingInfo

```
{
    deposited: "Balance",
    rewards: "Balance"
}
```

### StorageVersion

```
"Null"
```

### SwapAction

```
"Null"
```

### SwapAmount

```
{
    _enum: {
        WithDesiredInput: "SwapWithDesiredInput",
        WithDesiredOutput: "SwapWithDesiredOutput"
    }
}
```

### SwapOutcome

```
{
    amount: "Balance",
    fee: "Balance"
}
```

### SwapOutcomeInfo

```
{
    amount: "Balance",
    fee: "Balance"
}
```

### SwapVariant

```
{
    _enum: [
        "WithDesiredInput",
        "WithDesiredOutput"
    ]
}
```

### SwapWithDesiredInput

```
{
    desired_amount_in: "Balance",
    min_amount_out: "Balance"
}
```

### SwapWithDesiredOutput

```
{
    desired_amount_out: "Balance",
    max_amount_in: "Balance"
}
```

### TAssetBalance

```
"Balance"
```

### TP

```
"TradingPair"
```

### TeamVesting

```
{
    team_vesting_total_tokens: "Balance",
    team_vesting_first_release_percent: "Balance",
    team_vesting_period: "BlockNumber",
    team_vesting_percent: "Balance"
}
```

### TechAccountId

```
{
    _enum: {
        Pure: "(DEXId, TechPurpose)",
        Generic: "(Vec<u8>, Vec<u8>)",
        Wrapped: "AccountId",
        WrappedRepr: "AccountId"
    }
}
```

### TechAmount

```
"Amount"
```

### TechAssetId

```
{
    _enum: {
        Wrapped: "PredefinedAssetId",
        Escaped: "AssetId"
    }
}
```

### TechBalance

```
"Balance"
```

### TechPurpose

```
{
    _enum: {
        FeeCollector: "Null",
        FeeCollectorForPair: "TechTradingPair",
        LiquidityKeeper: "TechTradingPair",
        Identifier: "Vec<u8>"
    }
}
```

### TechTradingPair

```
{
    base_asset_id: "TechAssetId",
    target_asset_id: "TechAssetId"
}
```

### TokenInfo

```
{
    farms_total_multiplier: "u32",
    staking_total_multiplier: "u32",
    token_per_block: "Balance",
    farms_allocation: "Balance",
    staking_allocation: "Balance",
    team_allocation: "Balance",
    team_account: "AccountId"
}
```

### TokenLockInfo

```
{
    tokens: "Balance",
    unlocking_block: "BlockNumber",
    asset_id: "AssetId"
}
```

### TradingPair

```
{
    base_asset_id: "AssetId",
    target_asset_id: "AssetId"
}
```

### UserInfo

```
{
    pool_asset: "AssetId",
    reward_asset: "AssetId",
    is_farm: "bool",
    pooled_tokens: "Balance",
    rewards: "Balance"
}
```

### ValidationFunction

```
"Null"
```

### VotingInfo

```
{
    voting_option: "u32",
    number_of_votes: "Balance",
    ceres_withdrawn: "bool"
}
```
