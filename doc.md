# API Calls

**Table of Contents (Pallets)**

- [substrate](#substrate-pallet)
- [system](#system-pallet)
- [babe](#babe-pallet)
- [timestamp](#timestamp-pallet)
- [balances](#balances-pallet)
- [sudo](#sudo-pallet)
- [randomnessCollectiveFlip](#randomnesscollectiveflip-pallet)
- [transactionPayment](#transactionpayment-pallet)
- [permissions](#permissions-pallet)
- [referrals](#referrals-pallet)
- [rewards](#rewards-pallet)
- [xorFee](#xorfee-pallet)
- [bridgeMultisig](#bridgemultisig-pallet)
- [authorship](#authorship-pallet)
- [staking](#staking-pallet)
- [offences](#offences-pallet)
- [session](#session-pallet)
- [grandpa](#grandpa-pallet)
- [imOnline](#imonline-pallet)
- [tokens](#tokens-pallet)
- [tradingPair](#tradingpair-pallet)
- [assets](#assets-pallet)
- [dexManager](#dexmanager-pallet)
- [multicollateralBondingCurvePool](#multicollateralbondingcurvepool-pallet)
- [poolXYK](#poolxyk-pallet)
- [council](#council-pallet)
- [technicalCommittee](#technicalcommittee-pallet)
- [democracy](#democracy-pallet)
- [dexapi](#dexapi-pallet)
- [ethBridge](#ethbridge-pallet)
- [pswapDistribution](#pswapdistribution-pallet)
- [multisig](#multisig-pallet)
- [scheduler](#scheduler-pallet)
- [irohaMigration](#irohamigration-pallet)
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
- [demeterFarmingPlatform](#demeterfarmingplatform-pallet)
- [bagsList](#bagslist-pallet)
- [electionProviderMultiPhase](#electionprovidermultiphase-pallet)
- [mmr](#mmr-pallet)
- [beefy](#beefy-pallet)
- [mmrLeaf](#mmrleaf-pallet)
- [ethereumLightClient](#ethereumlightclient-pallet)
- [basicInboundChannel](#basicinboundchannel-pallet)
- [basicOutboundChannel](#basicoutboundchannel-pallet)
- [incentivizedInboundChannel](#incentivizedinboundchannel-pallet)
- [incentivizedOutboundChannel](#incentivizedoutboundchannel-pallet)
- [dispatch](#dispatch-pallet)
- [leafProvider](#leafprovider-pallet)
- [ethApp](#ethapp-pallet)
- [erc20App](#erc20app-pallet)
- [migrationApp](#migrationapp-pallet)
- [utility](#utility-pallet)
- [currencies](#currencies-pallet)
- [liquidityProxy](#liquidityproxy-pallet)
- [faucet](#faucet-pallet)
- [author](#author-pallet)
- [chain](#chain-pallet)
- [childstate](#childstate-pallet)
- [offchain](#offchain-pallet)
- [payment](#payment-pallet)
- [rpc](#rpc-pallet)
- [state](#state-pallet)
- [dexApi](#dexapi-pallet)
- [basicChannel](#basicchannel-pallet)
- [intentivizedChannel](#intentivizedchannel-pallet)

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

#### **api.query.system.palletVersion**

> Returns the current pallet version from storage

arguments: -

returns: `u16`

<hr>

#### **api.query.system.account**

> The full account information for a particular account ID.

arguments:

- key: `AccountId32`

returns: `FrameSystemAccountInfo`

<hr>

#### **api.query.system.extrinsicCount**

> Total extrinsics count for the current block.

arguments: -

returns: `u32`

<hr>

#### **api.query.system.blockWeight**

> The current weight for the block.

arguments: -

returns: `FrameSupportWeightsPerDispatchClassU64`

<hr>

#### **api.query.system.allExtrinsicsLen**

> Total length (in bytes) for all extrinsics put together, for the current block.

arguments: -

returns: `u32`

<hr>

#### **api.query.system.blockHash**

> Map of block numbers to block hashes.

arguments:

- key: `u32`

returns: `H256`

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

returns: `u32`

<hr>

#### **api.query.system.parentHash**

> Hash of the previous block.

arguments: -

returns: `H256`

<hr>

#### **api.query.system.digest**

> Digest of the current block, also part of the block header.

arguments: -

returns: `SpRuntimeDigest`

<hr>

#### **api.query.system.events**

> Events deposited for the current block.
>
> NOTE: The item is unbound and should therefore never be read on chain.
> It could otherwise inflate the PoV size of a block.
>
> Events have a large in-memory size. Box the events to not go out-of-memory
> just in case someone still reads them from within the runtime.

arguments: -

returns: `Vec<FrameSystemEventRecord>`

<hr>

#### **api.query.system.eventCount**

> The number of events in the `Events<T>` list.

arguments: -

returns: `u32`

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

- key: `H256`

returns: `Vec<(u32,u32)>`

<hr>

#### **api.query.system.lastRuntimeUpgrade**

> Stores the `spec_version` and `spec_name` of when the last runtime upgrade happened.

arguments: -

returns: `FrameSystemLastRuntimeUpgradeInfo`

<hr>

#### **api.query.system.upgradedToU32RefCount**

> True if we have upgraded so that `type RefCount` is `u32`. False (default) if not.

arguments: -

returns: `bool`

<hr>

#### **api.query.system.upgradedToTripleRefCount**

> True if we have upgraded so that AccountInfo contains three types of `RefCount`. False
> (default) if not.

arguments: -

returns: `bool`

<hr>

#### **api.query.system.executionPhase**

> The execution phase of the block.

arguments: -

returns: `FrameSystemPhase`

<hr>

### _Extrinsics_

#### **api.tx.system.fillBlock**

> A dispatch that will fill the block weight up to the given ratio.

arguments:

- ratio: `Perbill`
<hr>

#### **api.tx.system.remark**

> Make some on-chain remark.
>
> # <weight>
>
> - `O(1)`
>
> # </weight>

arguments:

- remark: `Bytes`
<hr>

#### **api.tx.system.setHeapPages**

> Set the number of pages in the WebAssembly environment's heap.

arguments:

- pages: `u64`
<hr>

#### **api.tx.system.setCode**

> Set the new runtime code.
>
> # <weight>
>
> - `O(C + S)` where `C` length of `code` and `S` complexity of `can_set_code`
> - 1 call to `can_set_code`: `O(S)` (calls `sp_io::misc::runtime_version` which is
>   expensive).
> - 1 storage write (codec `O(C)`).
> - 1 digest item.
> - 1 event.
>   The weight of this function is dependent on the runtime, but generally this is very
>   expensive. We will treat this as a full block.
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
> - 1 digest item.
> - 1 event.
>   The weight of this function is dependent on the runtime. We will treat this as a full
>   block. # </weight>

arguments:

- code: `Bytes`
<hr>

#### **api.tx.system.setStorage**

> Set some items of storage.

arguments:

- items: `Vec<(Bytes,Bytes)>`
<hr>

#### **api.tx.system.killStorage**

> Kill some items from storage.

arguments:

- keys: `Vec<Bytes>`
<hr>

#### **api.tx.system.killPrefix**

> Kill all storage items with a key that starts with the given prefix.
>
> **NOTE:** We rely on the Root origin to provide us the number of subkeys under
> the prefix we are removing to accurately calculate the weight of this function.

arguments:

- prefix: `Bytes`
- subkeys: `u32`
<hr>

#### **api.tx.system.remarkWithEvent**

> Make some on-chain remark and emit event.

arguments:

- remark: `Bytes`
<hr>

### _Custom RPCs_

#### **api.rpc.system.accountNextIndex**

> Retrieves the next accountIndex as available on the node

arguments:

- accountId: `AccountId`

returns: `Index`

<hr>

#### **api.rpc.system.addLogFilter**

> Adds the supplied directives to the current log filter

arguments:

- directives: `Text`

returns: `Null`

<hr>

#### **api.rpc.system.addReservedPeer**

> Adds a reserved peer

arguments:

- peer: `Text`

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

#### **api.rpc.system.dryRun**

> Dry run an extrinsic at a given block

arguments:

- extrinsic: `Bytes`
- at: `BlockHash`

returns: `ApplyExtrinsicResult`

<hr>

#### **api.rpc.system.health**

> Return health status of the node

arguments: -

returns: `Health`

<hr>

#### **api.rpc.system.localListenAddresses**

> The addresses include a trailing /p2p/ with the local PeerId, and are thus suitable to be passed to addReservedPeer or as a bootnode address for example

arguments: -

returns: `Vec<Text>`

<hr>

#### **api.rpc.system.localPeerId**

> Returns the base58-encoded PeerId of the node

arguments: -

returns: `Text`

<hr>

#### **api.rpc.system.name**

> Retrieves the node name

arguments: -

returns: `Text`

<hr>

#### **api.rpc.system.nodeRoles**

> Returns the roles the node is running as

arguments: -

returns: `Vec<NodeRole>`

<hr>

#### **api.rpc.system.peers**

> Returns the currently connected peers

arguments: -

returns: `Vec<PeerInfo>`

<hr>

#### **api.rpc.system.properties**

> Get a custom set of properties as a JSON object, defined in the chain spec

arguments: -

returns: `ChainProperties`

<hr>

#### **api.rpc.system.removeReservedPeer**

> Remove a reserved peer

arguments:

- peerId: `Text`

returns: `Text`

<hr>

#### **api.rpc.system.reservedPeers**

> Returns the list of reserved peers

arguments: -

returns: `Vec<Text>`

<hr>

#### **api.rpc.system.resetLogFilter**

> Resets the log filter to Substrate defaults

arguments: -

returns: `Null`

<hr>

#### **api.rpc.system.syncState**

> Returns the state of the syncing of the node

arguments: -

returns: `SyncState`

<hr>

#### **api.rpc.system.version**

> Retrieves the version of the node

arguments: -

returns: `Text`

<hr>

## Babe pallet

### _State Queries_

#### **api.query.babe.palletVersion**

> Returns the current pallet version from storage

arguments: -

returns: `u16`

<hr>

#### **api.query.babe.epochIndex**

> Current epoch index.

arguments: -

returns: `u64`

<hr>

#### **api.query.babe.authorities**

> Current epoch authorities.

arguments: -

returns: `Vec<(SpConsensusBabeAppPublic,u64)>`

<hr>

#### **api.query.babe.genesisSlot**

> The slot at which the first epoch actually started. This is 0
> until the first block of the chain.

arguments: -

returns: `u64`

<hr>

#### **api.query.babe.currentSlot**

> Current slot number.

arguments: -

returns: `u64`

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

returns: `[u8;32]`

<hr>

#### **api.query.babe.pendingEpochConfigChange**

> Pending epoch configuration change that will be applied when the next epoch is enacted.

arguments: -

returns: `SpConsensusBabeDigestsNextConfigDescriptor`

<hr>

#### **api.query.babe.nextRandomness**

> Next epoch randomness.

arguments: -

returns: `[u8;32]`

<hr>

#### **api.query.babe.nextAuthorities**

> Next epoch authorities.

arguments: -

returns: `Vec<(SpConsensusBabeAppPublic,u64)>`

<hr>

#### **api.query.babe.segmentIndex**

> Randomness under construction.
>
> We make a trade-off between storage accesses and list length.
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

returns: `Vec<[u8;32]>`

<hr>

#### **api.query.babe.initialized**

> Temporary value (cleared at block finalization) which is `Some`
> if per-block initialization has already been called for current block.

arguments: -

returns: `Option<SpConsensusBabeDigestsPreDigest>`

<hr>

#### **api.query.babe.authorVrfRandomness**

> This field should always be populated during block processing unless
> secondary plain slots are enabled (which don't contain a VRF output).
>
> It is set in `on_finalize`, before it will contain the value from the last block.

arguments: -

returns: `Option<[u8;32]>`

<hr>

#### **api.query.babe.epochStart**

> The block numbers when the last and current epoch have started, respectively `N-1` and
> `N`.
> NOTE: We track this is in order to annotate the block number when a given pool of
> entropy was fixed (i.e. it was known to chain observers). Since epochs are defined in
> slots, which may be skipped, the block numbers may not line up with the slot numbers.

arguments: -

returns: `(u32,u32)`

<hr>

#### **api.query.babe.lateness**

> How late the current block is compared to its parent.
>
> This entry is populated as part of block execution and is cleaned up
> on block finalization. Querying this storage entry outside of block
> execution context should always yield zero.

arguments: -

returns: `u32`

<hr>

#### **api.query.babe.epochConfig**

> The configuration for the current epoch. Should never be `None` as it is initialized in
> genesis.

arguments: -

returns: `SpConsensusBabeBabeEpochConfiguration`

<hr>

#### **api.query.babe.nextEpochConfig**

> The configuration for the next epoch, `None` if the config will not change
> (you can fallback to `EpochConfig` instead in that case).

arguments: -

returns: `SpConsensusBabeBabeEpochConfiguration`

<hr>

### _Extrinsics_

#### **api.tx.babe.reportEquivocation**

> Report authority equivocation/misbehavior. This method will verify
> the equivocation proof and validate the given key ownership proof
> against the extracted offender. If both are valid, the offence will
> be reported.

arguments:

- equivocationProof: `SpConsensusSlotsEquivocationProof`
- keyOwnerProof: `SpSessionMembershipProof`
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

- equivocationProof: `SpConsensusSlotsEquivocationProof`
- keyOwnerProof: `SpSessionMembershipProof`
<hr>

#### **api.tx.babe.planConfigChange**

> Plan an epoch config change. The epoch config change is recorded and will be enacted on
> the next call to `enact_epoch_change`. The config will be activated one epoch after.
> Multiple calls to this method will replace any existing planned config change that had
> not been enacted yet.

arguments:

- config: `SpConsensusBabeDigestsNextConfigDescriptor`
<hr>

## Timestamp pallet

### _State Queries_

#### **api.query.timestamp.palletVersion**

> Returns the current pallet version from storage

arguments: -

returns: `u16`

<hr>

#### **api.query.timestamp.now**

> Current time for the current block.

arguments: -

returns: `u64`

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
> - 1 storage read and 1 storage mutation (codec `O(1)`). (because of `DidUpdate::take` in
>   `on_finalize`)
> - 1 event handler `on_timestamp_set`. Must be `O(1)`.
>
> # </weight>

arguments:

- now: `Compact<u64>`
<hr>

## Balances pallet

### _State Queries_

#### **api.query.balances.palletVersion**

> Returns the current pallet version from storage

arguments: -

returns: `u16`

<hr>

#### **api.query.balances.totalIssuance**

> The total units issued in the system.

arguments: -

returns: `u128`

<hr>

#### **api.query.balances.account**

> The Balances pallet example of storing the balance of an account.
>
> # Example
>
> ```nocompile
>  impl pallet_balances::Config for Runtime {
>    type AccountStore = StorageMapShim<Self::Account<Runtime>, frame_system::Provider<Runtime>, AccountId, Self::AccountData<Balance>>
>  }
> ```
>
> You can also store the balance of an account in the `System` pallet.
>
> # Example
>
> ```nocompile
>  impl pallet_balances::Config for Runtime {
>   type AccountStore = System
>  }
> ```
>
> But this comes with tradeoffs, storing account balances in the system pallet stores
> `frame_system` data alongside the account data contrary to storing account balances in the
> `Balances` pallet, which uses a `StorageMap` to store balances data only.
> NOTE: This is only used in the case that this pallet is used to store balances.

arguments:

- key: `AccountId32`

returns: `PalletBalancesAccountData`

<hr>

#### **api.query.balances.locks**

> Any liquidity locks on some account balances.
> NOTE: Should only be accessed when setting, changing and freeing a lock.

arguments:

- key: `AccountId32`

returns: `Vec<PalletBalancesBalanceLock>`

<hr>

#### **api.query.balances.reserves**

> Named reserves on some account balances.

arguments:

- key: `AccountId32`

returns: `Vec<PalletBalancesReserveData>`

<hr>

#### **api.query.balances.storageVersion**

> Storage version of the pallet.
>
> This is set to v2.0.0 for new networks.

arguments: -

returns: `PalletBalancesReleases`

<hr>

### _Extrinsics_

#### **api.tx.balances.transfer**

> Transfer some liquid free balance to another account.
>
> `transfer` will set the `FreeBalance` of the sender and receiver.
> If the sender's account is below the existential deposit as a result
> of the transfer, the account will be reaped.
>
> The dispatch origin for this call must be `Signed` by the transactor.
>
> # <weight>
>
> - Dependent on arguments but not critical, given proper implementations for input config
>   types. See related functions below.
> - It contains a limited number of reads and writes internally and no complex
>   computation.
>
> Related functions:
>
> - `ensure_can_withdraw` is always called internally but has a bounded complexity.
> - Transferring balances to accounts that did not exist before will cause
>   `T::OnNewAccount::on_new_account` to be called.
> - Removing enough funds from an account will trigger `T::DustRemoval::on_unbalanced`.
> - `transfer_keep_alive` works the same way as `transfer`, but has an additional check
>   that the transfer will not kill the origin account.
>
> ---
>
> - Origin account is already in memory, so no DB operations for them.
>
> # </weight>

arguments:

- dest: `AccountId32`
- value: `Compact<u128>`
<hr>

#### **api.tx.balances.setBalance**

> Set the balances of a given account.
>
> This will alter `FreeBalance` and `ReservedBalance` in storage. it will
> also alter the total issuance of the system (`TotalIssuance`) appropriately.
> If the new free or reserved balance is below the existential deposit,
> it will reset the account nonce (`frame_system::AccountNonce`).
>
> The dispatch origin for this call is `root`.

arguments:

- who: `AccountId32`
- newFree: `Compact<u128>`
- newReserved: `Compact<u128>`
<hr>

#### **api.tx.balances.forceTransfer**

> Exactly as `transfer`, except the origin must be root and the source account may be
> specified.
>
> # <weight>
>
> - Same as transfer, but additional read and write because the source account is not
>   assumed to be in the overlay.
>
> # </weight>

arguments:

- source: `AccountId32`
- dest: `AccountId32`
- value: `Compact<u128>`
<hr>

#### **api.tx.balances.transferKeepAlive**

> Same as the [`transfer`] call, but with a check that the transfer will not kill the
> origin account.
>
> 99% of the time you want [`transfer`] instead.
>
> [`transfer`]: struct.Pallet.html#method.transfer

arguments:

- dest: `AccountId32`
- value: `Compact<u128>`
<hr>

#### **api.tx.balances.transferAll**

> Transfer the entire transferable balance from the caller account.
>
> NOTE: This function only attempts to transfer _transferable_ balances. This means that
> any locked, reserved, or existential deposits (when `keep_alive` is `true`), will not be
> transferred by this function. To ensure that this function results in a killed account,
> you might need to prepare the account by removing any reference counters, storage
> deposits, etc...
>
> The dispatch origin of this call must be Signed.
>
> - `dest`: The recipient of the transfer.
> - `keep_alive`: A boolean to determine if the `transfer_all` operation should send all
>   of the funds the account has, causing the sender account to be killed (false), or
>   transfer everything except at least the existential deposit, which will guarantee to
>   keep the sender account alive (true). # <weight>
> - O(1). Just like transfer, but reading the user's transferable balance first. #</weight>

arguments:

- dest: `AccountId32`
- keepAlive: `bool`
<hr>

#### **api.tx.balances.forceUnreserve**

> Unreserve some balance from a user by force.
>
> Can only be called by ROOT.

arguments:

- who: `AccountId32`
- amount: `u128`
<hr>

## Sudo pallet

### _State Queries_

#### **api.query.sudo.palletVersion**

> Returns the current pallet version from storage

arguments: -

returns: `u16`

<hr>

#### **api.query.sudo.key**

> The `AccountId` of the sudo key.

arguments: -

returns: `AccountId32`

<hr>

### _Extrinsics_

#### **api.tx.sudo.sudo**

> Authenticates the sudo key and dispatches a function call with `Root` origin.
>
> The dispatch origin for this call must be _Signed_.
>
> # <weight>
>
> - O(1).
> - Limited storage reads.
> - One DB write (event).
> - Weight of derivative `call` execution + 10,000.
>
> # </weight>

arguments:

- call: `Call`
<hr>

#### **api.tx.sudo.sudoUncheckedWeight**

> Authenticates the sudo key and dispatches a function call with `Root` origin.
> This function does not check the weight of the call, and instead allows the
> Sudo user to specify the weight of the call.
>
> The dispatch origin for this call must be _Signed_.
>
> # <weight>
>
> - O(1).
> - The weight of this call is defined by the caller.
>
> # </weight>

arguments:

- call: `Call`
- weight: `u64`
<hr>

#### **api.tx.sudo.setKey**

> Authenticates the current sudo key and sets the given AccountId (`new`) as the new sudo
> key.
>
> The dispatch origin for this call must be _Signed_.
>
> # <weight>
>
> - O(1).
> - Limited storage reads.
> - One DB change.
>
> # </weight>

arguments:

- new: `AccountId32`
<hr>

#### **api.tx.sudo.sudoAs**

> Authenticates the sudo key and dispatches a function call with `Signed` origin from
> a given account.
>
> The dispatch origin for this call must be _Signed_.
>
> # <weight>
>
> - O(1).
> - Limited storage reads.
> - One DB write (event).
> - Weight of derivative `call` execution + 10,000.
>
> # </weight>

arguments:

- who: `AccountId32`
- call: `Call`
<hr>

## RandomnessCollectiveFlip pallet

### _State Queries_

#### **api.query.randomnessCollectiveFlip.palletVersion**

> Returns the current pallet version from storage

arguments: -

returns: `u16`

<hr>

#### **api.query.randomnessCollectiveFlip.randomMaterial**

> Series of block headers from the last 81 blocks that acts as random seed material. This
> is arranged as a ring buffer with `block_number % 81` being the index into the `Vec` of
> the oldest hash.

arguments: -

returns: `Vec<H256>`

<hr>

## TransactionPayment pallet

### _State Queries_

#### **api.query.transactionPayment.palletVersion**

> Returns the current pallet version from storage

arguments: -

returns: `u16`

<hr>

#### **api.query.transactionPayment.nextFeeMultiplier**

arguments: -

returns: `u128`

<hr>

#### **api.query.transactionPayment.storageVersion**

arguments: -

returns: `PalletTransactionPaymentReleases`

<hr>

## Permissions pallet

### _State Queries_

#### **api.query.permissions.palletVersion**

> Returns the current pallet version from storage

arguments: -

returns: `u16`

<hr>

#### **api.query.permissions.owners**

arguments:

- key: `(u32,PermissionsScope)`

returns: `Vec<AccountId32>`

<hr>

#### **api.query.permissions.permissions**

arguments:

- key: `(AccountId32,PermissionsScope)`

returns: `Vec<u32>`

<hr>

## Referrals pallet

### _State Queries_

#### **api.query.referrals.palletVersion**

> Returns the current pallet version from storage

arguments: -

returns: `u16`

<hr>

#### **api.query.referrals.referrers**

arguments:

- key: `AccountId32`

returns: `AccountId32`

<hr>

#### **api.query.referrals.referrerBalances**

arguments:

- key: `AccountId32`

returns: `u128`

<hr>

#### **api.query.referrals.referrals**

arguments:

- key: `AccountId32`

returns: `Vec<AccountId32>`

<hr>

### _Extrinsics_

#### **api.tx.referrals.reserve**

> Reserves the balance from the account for a special balance that can be used to pay referrals' fees

arguments:

- balance: `u128`
<hr>

#### **api.tx.referrals.unreserve**

> Unreserves the balance and transfers it back to the account

arguments:

- balance: `u128`
<hr>

#### **api.tx.referrals.setReferrer**

> Sets the referrer for the account

arguments:

- referrer: `AccountId32`
<hr>

## Rewards pallet

### _State Queries_

#### **api.query.rewards.palletVersion**

> Returns the current pallet version from storage

arguments: -

returns: `u16`

<hr>

#### **api.query.rewards.reservesAcc**

arguments: -

returns: `CommonPrimitivesTechAccountId`

<hr>

#### **api.query.rewards.valOwners**

> A map EthAddresses -> RewardInfo, that is claimable and remaining vested amounts per address

arguments:

- key: `H160`

returns: `RewardsRewardInfo`

<hr>

#### **api.query.rewards.pswapFarmOwners**

arguments:

- key: `H160`

returns: `u128`

<hr>

#### **api.query.rewards.pswapWaifuOwners**

arguments:

- key: `H160`

returns: `u128`

<hr>

#### **api.query.rewards.umiNftReceivers**

> UMI NFT receivers storage

arguments:

- key: `H160`

returns: `Vec<u128>`

<hr>

#### **api.query.rewards.valBurnedSinceLastVesting**

> Amount of VAL burned since last vesting

arguments: -

returns: `u128`

<hr>

#### **api.query.rewards.currentClaimableVal**

> Amount of VAL currently being vested (aggregated over the previous period of 14,400 blocks)

arguments: -

returns: `u128`

<hr>

#### **api.query.rewards.ethAddresses**

> All addresses are split in batches, `AddressBatches` maps batch number to a set of addresses

arguments:

- key: `u32`

returns: `Vec<H160>`

<hr>

#### **api.query.rewards.totalValRewards**

> Total amount of VAL rewards either claimable now or some time in the future

arguments: -

returns: `u128`

<hr>

#### **api.query.rewards.totalClaimableVal**

> Total amount of VAL that can be claimed by users at current point in time

arguments: -

returns: `u128`

<hr>

#### **api.query.rewards.migrationPending**

> A flag indicating whether VAL rewards data migration has been finalized

arguments: -

returns: `bool`

<hr>

#### **api.query.rewards.umiNfts**

> The storage of available UMI NFTs.

arguments: -

returns: `Vec<CommonPrimitivesAssetId32>`

<hr>

#### **api.query.rewards.umiNftClaimed**

> Stores whether address already claimed UMI NFT rewards.

arguments:

- key: `H160`

returns: `bool`

<hr>

### _Extrinsics_

#### **api.tx.rewards.claim**

> Claim the reward with signature.

arguments:

- signature: `Bytes`
<hr>

#### **api.tx.rewards.addUmiNftReceivers**

> Finalize the update of unclaimed VAL data in storage
> Add addresses, who will receive UMI NFT rewards.

arguments:

- receivers: `Vec<H160>`
<hr>

### _Custom RPCs_

#### **api.rpc.rewards.claimables**

> Get claimable rewards

arguments:

- ethAddress: `EthAddress`
- at: `BlockHash`

returns: `Vec<BalanceInfo>`

<hr>

## XorFee pallet

### _State Queries_

#### **api.query.xorFee.palletVersion**

> Returns the current pallet version from storage

arguments: -

returns: `u16`

<hr>

#### **api.query.xorFee.xorToVal**

> The amount of XOR to be reminted and exchanged for VAL at the end of the session

arguments: -

returns: `u128`

<hr>

## BridgeMultisig pallet

### _State Queries_

#### **api.query.bridgeMultisig.palletVersion**

> Returns the current pallet version from storage

arguments: -

returns: `u16`

<hr>

#### **api.query.bridgeMultisig.accounts**

> Multisignature accounts.

arguments:

- key: `AccountId32`

returns: `PalletMultisigMultisigAccount`

<hr>

#### **api.query.bridgeMultisig.multisigs**

> The set of open multisig operations.

arguments:

- key: `(AccountId32,[u8;32])`

returns: `PalletMultisigMultisig`

<hr>

#### **api.query.bridgeMultisig.calls**

arguments:

- key: `[u8;32]`

returns: `(Bytes,AccountId32,u128)`

<hr>

#### **api.query.bridgeMultisig.dispatchedCalls**

arguments:

- key: `([u8;32],PalletMultisigBridgeTimepoint)`

returns: `Null`

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

- signatories: `Vec<AccountId32>`
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

- signatory: `AccountId32`
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

- newMember: `AccountId32`
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

- id: `AccountId32`
- call: `Call`
- timepoint: `PalletMultisigBridgeTimepoint`
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

- id: `AccountId32`
- maybeTimepoint: `Option<PalletMultisigBridgeTimepoint>`
- call: `Bytes`
- storeCall: `bool`
- maxWeight: `u64`
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

- id: `AccountId32`
- maybeTimepoint: `Option<PalletMultisigBridgeTimepoint>`
- callHash: `[u8;32]`
- maxWeight: `u64`
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

- id: `AccountId32`
- timepoint: `PalletMultisigBridgeTimepoint`
- callHash: `[u8;32]`
<hr>

## Authorship pallet

### _State Queries_

#### **api.query.authorship.palletVersion**

> Returns the current pallet version from storage

arguments: -

returns: `u16`

<hr>

#### **api.query.authorship.uncles**

> Uncles

arguments: -

returns: `Vec<PalletAuthorshipUncleEntryItem>`

<hr>

#### **api.query.authorship.author**

> Author of current block.

arguments: -

returns: `AccountId32`

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

- newUncles: `Vec<SpRuntimeHeader>`
<hr>

## Staking pallet

### _State Queries_

#### **api.query.staking.palletVersion**

> Returns the current pallet version from storage

arguments: -

returns: `u16`

<hr>

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

returns: `PalletStakingSoraDurationWrapper`

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

returns: `Vec<AccountId32>`

<hr>

#### **api.query.staking.bonded**

> Map from all locked "stash" accounts to the controller account.

arguments:

- key: `AccountId32`

returns: `AccountId32`

<hr>

#### **api.query.staking.minNominatorBond**

> The minimum active bond to become and maintain the role of a nominator.

arguments: -

returns: `u128`

<hr>

#### **api.query.staking.minValidatorBond**

> The minimum active bond to become and maintain the role of a validator.

arguments: -

returns: `u128`

<hr>

#### **api.query.staking.minCommission**

> The minimum amount of commission that validators can set.
>
> If set to `0`, no limit exists.

arguments: -

returns: `Perbill`

<hr>

#### **api.query.staking.ledger**

> Map from all (unlocked) "controller" accounts to the info regarding the staking.

arguments:

- key: `AccountId32`

returns: `PalletStakingStakingLedger`

<hr>

#### **api.query.staking.payee**

> Where the reward payment should be made. Keyed by stash.

arguments:

- key: `AccountId32`

returns: `PalletStakingRewardDestination`

<hr>

#### **api.query.staking.validators**

> The map from (wannabe) validator stash key to the preferences of that validator.

arguments:

- key: `AccountId32`

returns: `PalletStakingValidatorPrefs`

<hr>

#### **api.query.staking.counterForValidators**

> Counter for the related counted storage map

arguments: -

returns: `u32`

<hr>

#### **api.query.staking.maxValidatorsCount**

> The maximum validator count before we stop allowing new validators to join.
>
> When this value is not set, no limits are enforced.

arguments: -

returns: `u32`

<hr>

#### **api.query.staking.nominators**

> The map from nominator stash key to their nomination preferences, namely the validators that
> they wish to support.
>
> Note that the keys of this storage map might become non-decodable in case the
> [`Config::MaxNominations`] configuration is decreased. In this rare case, these nominators
> are still existent in storage, their key is correct and retrievable (i.e. `contains_key`
> indicates that they exist), but their value cannot be decoded. Therefore, the non-decodable
> nominators will effectively not-exist, until they re-submit their preferences such that it
> is within the bounds of the newly set `Config::MaxNominations`.
>
> This implies that `::iter_keys().count()` and `::iter().count()` might return different
> values for this map. Moreover, the main `::count()` is aligned with the former, namely the
> number of keys that exist.
>
> Lastly, if any of the nominators become non-decodable, they can be chilled immediately via
> [`Call::chill_other`] dispatchable by anyone.

arguments:

- key: `AccountId32`

returns: `PalletStakingNominations`

<hr>

#### **api.query.staking.counterForNominators**

> Counter for the related counted storage map

arguments: -

returns: `u32`

<hr>

#### **api.query.staking.maxNominatorsCount**

> The maximum nominator count before we stop allowing new validators to join.
>
> When this value is not set, no limits are enforced.

arguments: -

returns: `u32`

<hr>

#### **api.query.staking.currentEra**

> The current era index.
>
> This is the latest planned era, depending on how the Session pallet queues the validator
> set, it might be active or not.

arguments: -

returns: `u32`

<hr>

#### **api.query.staking.activeEra**

> The active era information, it holds index and start.
>
> The active era is the era being currently rewarded. Validator set of this era must be
> equal to [`SessionInterface::validators`].

arguments: -

returns: `PalletStakingActiveEraInfo`

<hr>

#### **api.query.staking.erasStartSessionIndex**

> The session index at which the era start for the last `HISTORY_DEPTH` eras.
>
> Note: This tracks the starting session (i.e. session index when era start being active)
> for the eras in `[CurrentEra - HISTORY_DEPTH, CurrentEra]`.

arguments:

- key: `u32`

returns: `u32`

<hr>

#### **api.query.staking.erasStakers**

> Exposure of validator at era.
>
> This is keyed first by the era index to allow bulk deletion and then the stash account.
>
> Is it removed after `HISTORY_DEPTH` eras.
> If stakers hasn't been set or has been removed then empty exposure is returned.

arguments:

- key: `(u32,AccountId32)`

returns: `PalletStakingExposure`

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

- key: `(u32,AccountId32)`

returns: `PalletStakingExposure`

<hr>

#### **api.query.staking.erasValidatorPrefs**

> Similar to `ErasStakers`, this holds the preferences of validators.
>
> This is keyed first by the era index to allow bulk deletion and then the stash account.
>
> Is it removed after `HISTORY_DEPTH` eras.

arguments:

- key: `(u32,AccountId32)`

returns: `PalletStakingValidatorPrefs`

<hr>

#### **api.query.staking.erasValidatorReward**

> The total validator era payout for the last `HISTORY_DEPTH` eras.
>
> Eras that haven't finished yet or has been removed doesn't have reward.

arguments:

- key: `u32`

returns: `u128`

<hr>

#### **api.query.staking.erasRewardPoints**

> Rewards for the last `HISTORY_DEPTH` eras.
> If reward hasn't been set or has been removed then 0 reward is returned.

arguments:

- key: `u32`

returns: `PalletStakingEraRewardPoints`

<hr>

#### **api.query.staking.eraValBurned**

> The amount of VAL burned during this era.

arguments: -

returns: `u128`

<hr>

#### **api.query.staking.erasTotalStake**

> The total amount staked for the last `HISTORY_DEPTH` eras.
> If total hasn't been set or has been removed then 0 stake is returned.

arguments:

- key: `u32`

returns: `u128`

<hr>

#### **api.query.staking.forceEra**

> Mode of era forcing.

arguments: -

returns: `PalletStakingForcing`

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

returns: `u128`

<hr>

#### **api.query.staking.unappliedSlashes**

> All unapplied slashes that are queued for later.

arguments:

- key: `u32`

returns: `Vec<PalletStakingUnappliedSlash>`

<hr>

#### **api.query.staking.bondedEras**

> A mapping from still-bonded eras to the first session index of that era.
>
> Must contains information for eras for the range:
> `[active_era - bounding_duration; active_era]`

arguments: -

returns: `Vec<(u32,u32)>`

<hr>

#### **api.query.staking.validatorSlashInEra**

> All slashing events on validators, mapped by era to the highest slash proportion
> and slash value of the era.

arguments:

- key: `(u32,AccountId32)`

returns: `(Perbill,u128)`

<hr>

#### **api.query.staking.nominatorSlashInEra**

> All slashing events on nominators, mapped by era to the highest slash value of the era.

arguments:

- key: `(u32,AccountId32)`

returns: `u128`

<hr>

#### **api.query.staking.slashingSpans**

> Slashing spans for stash accounts.

arguments:

- key: `AccountId32`

returns: `PalletStakingSlashingSlashingSpans`

<hr>

#### **api.query.staking.spanSlash**

> Records information about the maximum slash of a stash within a slashing span,
> as well as how much reward has been paid out.

arguments:

- key: `(AccountId32,u32)`

returns: `PalletStakingSlashingSpanRecord`

<hr>

#### **api.query.staking.earliestUnappliedSlash**

> The earliest era for which we have a pending, unapplied slash.

arguments: -

returns: `u32`

<hr>

#### **api.query.staking.currentPlannedSession**

> The last planned session scheduled by the session pallet.
>
> This is basically in sync with the call to [`pallet_session::SessionManager::new_session`].

arguments: -

returns: `u32`

<hr>

#### **api.query.staking.offendingValidators**

> Indices of validators that have offended in the active era and whether they are currently
> disabled.
>
> This value should be a superset of disabled validators since not all offences lead to the
> validator being disabled (if there was no slash). This is needed to track the percentage of
> validators that have offended in the current era, ensuring a new era is forced if
> `OffendingValidatorsThreshold` is reached. The vec is always kept sorted so that we can find
> whether a given validator has previously offended using binary search. It gets cleared when
> the era ends.

arguments: -

returns: `Vec<(u32,bool)>`

<hr>

#### **api.query.staking.storageVersion**

> True if network has been upgraded to this version.
> Storage version of the pallet.
>
> This is set to v7.0.0 for new networks.

arguments: -

returns: `PalletStakingReleases`

<hr>

#### **api.query.staking.chillThreshold**

> The threshold for when users can start calling `chill_other` for other validators /
> nominators. The threshold is compared to the actual number of validators / nominators
> (`CountFor*`) in the system compared to the configured max (`Max*Count`).

arguments: -

returns: `Percent`

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
> # </weight>

arguments:

- controller: `AccountId32`
- value: `Compact<u128>`
- payee: `PalletStakingRewardDestination`
<hr>

#### **api.tx.staking.bondExtra**

> Add some extra amount that have appeared in the stash `free_balance` into the balance up
> for staking.
>
> The dispatch origin for this call must be _Signed_ by the stash, not the controller.
>
> Use this if there are additional funds in your stash account that you wish to bond.
> Unlike [`bond`](Self::bond) or [`unbond`](Self::unbond) this function does not impose
> any limitation on the amount that can be added.
>
> Emits `Bonded`.
>
> # <weight>
>
> - Independent of the arguments. Insignificant complexity.
> - O(1).
>
> # </weight>

arguments:

- maxAdditional: `Compact<u128>`
<hr>

#### **api.tx.staking.unbond**

> Schedule a portion of the stash to be unlocked ready for transfer out after the bond
> period ends. If this leaves an amount actively bonded less than
> T::Currency::minimum_balance(), then it is increased to the full amount.
>
> The dispatch origin for this call must be _Signed_ by the controller, not the stash.
>
> Once the unlock period is done, you can call `withdraw_unbonded` to actually move
> the funds out of management ready for transfer.
>
> No more than a limited number of unlocking chunks (see `MaxUnlockingChunks`)
> can co-exists at the same time. In that case, [`Call::withdraw_unbonded`] need
> to be called first to remove some of the chunks (if possible).
>
> If a user encounters the `InsufficientBond` error when calling this extrinsic,
> they should call `chill` first in order to free up their bonded funds.
>
> Emits `Unbonded`.
>
> See also [`Call::withdraw_unbonded`].

arguments:

- value: `Compact<u128>`
<hr>

#### **api.tx.staking.withdrawUnbonded**

> Remove any unlocked chunks from the `unlocking` queue from our management.
>
> This essentially frees up that balance to be used by the stash account to do
> whatever it wants.
>
> The dispatch origin for this call must be _Signed_ by the controller.
>
> Emits `Withdrawn`.
>
> See also [`Call::unbond`].
>
> # <weight>
>
> Complexity O(S) where S is the number of slashing spans to remove
> NOTE: Weight annotation is the kill scenario, we refund otherwise.
>
> # </weight>

arguments:

- numSlashingSpans: `u32`
<hr>

#### **api.tx.staking.validate**

> Declare the desire to validate for the origin controller.
>
> Effects will be felt at the beginning of the next era.
>
> The dispatch origin for this call must be _Signed_ by the controller, not the stash.

arguments:

- prefs: `PalletStakingValidatorPrefs`
<hr>

#### **api.tx.staking.nominate**

> Declare the desire to nominate `targets` for the origin controller.
>
> Effects will be felt at the beginning of the next era.
>
> The dispatch origin for this call must be _Signed_ by the controller, not the stash.
>
> # <weight>
>
> - The transaction's complexity is proportional to the size of `targets` (N)
>   which is capped at CompactAssignments::LIMIT (T::MaxNominations).
> - Both the reads and writes follow a similar pattern.
>
> # </weight>

arguments:

- targets: `Vec<AccountId32>`
<hr>

#### **api.tx.staking.chill**

> Declare no desire to either validate or nominate.
>
> Effects will be felt at the beginning of the next era.
>
> The dispatch origin for this call must be _Signed_ by the controller, not the stash.
>
> # <weight>
>
> - Independent of the arguments. Insignificant complexity.
> - Contains one read.
> - Writes are limited to the `origin` account key.
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

- payee: `PalletStakingRewardDestination`
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

- controller: `AccountId32`
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
> Same as [`Self::set_validator_count`].
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
> Same as [`Self::set_validator_count`].
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
> # Warning
>
> The election process starts multiple blocks before the end of the era.
> Thus the election process may be ongoing when this is called. In this case the
> election will continue until the next era is triggered.
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
> # Warning
>
> The election process starts multiple blocks before the end of the era.
> If this is called just before a new era is triggered, the election process may not
> have enough blocks to get a result.
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

arguments:

- invulnerables: `Vec<AccountId32>`
<hr>

#### **api.tx.staking.forceUnstake**

> Force a current staker to become completely unstaked, immediately.
>
> The dispatch origin must be Root.

arguments:

- stash: `AccountId32`
- numSlashingSpans: `u32`
<hr>

#### **api.tx.staking.forceNewEraAlways**

> Force there to be a new era at the end of sessions indefinitely.
>
> The dispatch origin must be Root.
>
> # Warning
>
> The election process starts multiple blocks before the end of the era.
> If this is called just before a new era is triggered, the election process may not
> have enough blocks to get a result.

arguments: -

<hr>

#### **api.tx.staking.cancelDeferredSlash**

> Cancel enactment of a deferred slash.
>
> Can be called by the `T::SlashCancelOrigin`.
>
> Parameters: era and indices of the slashes for that era to kill.

arguments:

- era: `u32`
- slashIndices: `Vec<u32>`
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
>
> NOTE: weights are assuming that payouts are made to alive stash account (Staked).
> Paying even a dead controller is cheaper weight-wise. We don't do any refunds here.
>
> # </weight>

arguments:

- validatorStash: `AccountId32`
- era: `u32`
<hr>

#### **api.tx.staking.rebond**

> Rebond a portion of the stash scheduled to be unlocked.
>
> The dispatch origin must be signed by the controller.
>
> # <weight>
>
> - Time complexity: O(L), where L is unlocking chunks
> - Bounded by `MaxUnlockingChunks`.
> - Storage changes: Can't increase storage, only decrease it.
>
> # </weight>

arguments:

- value: `Compact<u128>`
<hr>

#### **api.tx.staking.setHistoryDepth**

> Set `HistoryDepth` value. This function will delete any history information
> when `HistoryDepth` is reduced.
>
> Parameters:
>
> - `new_history_depth`: The new history depth you would like to set.
> - `era_items_deleted`: The number of items that will be deleted by this dispatch. This
>   should report all the storage items that will be deleted by clearing old era history.
>   Needed to report an accurate weight for the dispatch. Trusted by `Root` to report an
>   accurate number.
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
>   - Writes Each: ErasValidatorReward, ErasRewardPoints, ErasTotalStake,
>     ErasStartSessionIndex
>
> # </weight>

arguments:

- newHistoryDepth: `Compact<u32>`
- eraItemsDeleted: `Compact<u32>`
<hr>

#### **api.tx.staking.reapStash**

> Remove all data structures concerning a staker/stash once it is at a state where it can
> be considered `dust` in the staking system. The requirements are:
>
> 1.  the `total_balance` of the stash is below existential deposit.
> 2.  or, the `ledger.total` of the stash is below existential deposit.
>
> The former can happen in cases like a slash; the latter when a fully unbonded account
> is still receiving staking rewards in `RewardDestination::Staked`.
>
> It can be called by anyone, as long as `stash` meets the above requirements.
>
> Refunds the transaction fees upon successful execution.

arguments:

- stash: `AccountId32`
- numSlashingSpans: `u32`
<hr>

#### **api.tx.staking.kick**

> Remove the given nominations from the calling validator.
>
> Effects will be felt at the beginning of the next era.
>
> The dispatch origin for this call must be _Signed_ by the controller, not the stash.
>
> - `who`: A list of nominator stash accounts who are nominating this validator which
>   should no longer be nominating this validator.
>
> Note: Making this call only makes sense if you first set the validator preferences to
> block any further nominations.

arguments:

- who: `Vec<AccountId32>`
<hr>

#### **api.tx.staking.setStakingConfigs**

> Update the various staking configurations .
>
> - `min_nominator_bond`: The minimum active bond needed to be a nominator.
> - `min_validator_bond`: The minimum active bond needed to be a validator.
> - `max_nominator_count`: The max number of users who can be a nominator at once. When
>   set to `None`, no limit is enforced.
> - `max_validator_count`: The max number of users who can be a validator at once. When
>   set to `None`, no limit is enforced.
> - `chill_threshold`: The ratio of `max_nominator_count` or `max_validator_count` which
>   should be filled in order for the `chill_other` transaction to work.
> - `min_commission`: The minimum amount of commission that each validators must maintain.
>   This is checked only upon calling `validate`. Existing validators are not affected.
>
> Origin must be Root to call this function.
>
> NOTE: Existing nominators and validators will not be affected by this update.
> to kick people under the new limits, `chill_other` should be called.

arguments:

- minNominatorBond: `PalletStakingPalletConfigOpU128`
- minValidatorBond: `PalletStakingPalletConfigOpU128`
- maxNominatorCount: `PalletStakingPalletConfigOpU32`
- maxValidatorCount: `PalletStakingPalletConfigOpU32`
- chillThreshold: `PalletStakingPalletConfigOpPercent`
- minCommission: `PalletStakingPalletConfigOpPerbill`
<hr>

#### **api.tx.staking.chillOther**

> Declare a `controller` to stop participating as either a validator or nominator.
>
> Effects will be felt at the beginning of the next era.
>
> The dispatch origin for this call must be _Signed_, but can be called by anyone.
>
> If the caller is the same as the controller being targeted, then no further checks are
> enforced, and this function behaves just like `chill`.
>
> If the caller is different than the controller being targeted, the following conditions
> must be met:
>
> - `controller` must belong to a nominator who has become non-decodable,
>
> Or:
>
> - A `ChillThreshold` must be set and checked which defines how close to the max
>   nominators or validators we must reach before users can start chilling one-another.
> - A `MaxNominatorCount` and `MaxValidatorCount` must be set which is used to determine
>   how close we are to the threshold.
> - A `MinNominatorBond` and `MinValidatorBond` must be set and checked, which determines
>   if this is a person that should be chilled because they have not met the threshold
>   bond required.
>
> This can be helpful if bond requirements are updated, and we need to remove old users
> who do not satisfy these requirements.

arguments:

- controller: `AccountId32`
<hr>

#### **api.tx.staking.forceApplyMinCommission**

> Force a validator to have at least the minimum commission. This will not affect a
> validator who already has a commission greater than or equal to the minimum. Any account
> can call this.

arguments:

- validatorStash: `AccountId32`
<hr>

## Offences pallet

### _State Queries_

#### **api.query.offences.palletVersion**

> Returns the current pallet version from storage

arguments: -

returns: `u16`

<hr>

#### **api.query.offences.reports**

> The primary structure that holds all offence records keyed by report identifiers.

arguments:

- key: `H256`

returns: `SpStakingOffenceOffenceDetails`

<hr>

#### **api.query.offences.concurrentReportsIndex**

> A vector of reports of the same kind that happened at the same time slot.

arguments:

- key: `([u8;16],Bytes)`

returns: `Vec<H256>`

<hr>

#### **api.query.offences.reportsByKindIndex**

> Enumerates all reports of a kind along with the time they happened.
>
> All reports are sorted by the time of offence.
>
> Note that the actual type of this mapping is `Vec<u8>`, this is because values of
> different types are not supported at the moment so we are doing the manual serialization.

arguments:

- key: `[u8;16]`

returns: `Bytes`

<hr>

## Session pallet

### _State Queries_

#### **api.query.session.palletVersion**

> Returns the current pallet version from storage

arguments: -

returns: `u16`

<hr>

#### **api.query.session.validators**

> The current set of validators.

arguments: -

returns: `Vec<AccountId32>`

<hr>

#### **api.query.session.currentIndex**

> Current index of the session.

arguments: -

returns: `u32`

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

returns: `Vec<(AccountId32,FramenodeRuntimeOpaqueSessionKeys)>`

<hr>

#### **api.query.session.disabledValidators**

> Indices of disabled validators.
>
> The vec is always kept sorted so that we can find whether a given validator is
> disabled using binary search. It gets cleared when `on_session_ending` returns
> a new set of identities.

arguments: -

returns: `Vec<u32>`

<hr>

#### **api.query.session.nextKeys**

> The next session keys for a validator.

arguments:

- key: `AccountId32`

returns: `FramenodeRuntimeOpaqueSessionKeys`

<hr>

#### **api.query.session.keyOwner**

> The owner of a key. The key is the `KeyTypeId` + the encoded key.

arguments:

- key: `(SpCoreCryptoKeyTypeId,Bytes)`

returns: `AccountId32`

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
> - Complexity: `O(1)`. Actual cost depends on the number of length of
>   `T::Keys::key_ids()` which is fixed.
> - DbReads: `origin account`, `T::ValidatorIdOf`, `NextKeys`
> - DbWrites: `origin account`, `NextKeys`
> - DbReads per key id: `KeyOwner`
> - DbWrites per key id: `KeyOwner`
>
> # </weight>

arguments:

- keys: `FramenodeRuntimeOpaqueSessionKeys`
- proof: `Bytes`
<hr>

#### **api.tx.session.purgeKeys**

> Removes any session key(s) of the function caller.
>
> This doesn't take effect until the next session.
>
> The dispatch origin of this function must be Signed and the account must be either be
> convertible to a validator ID using the chain's typical addressing system (this usually
> means being a controller account) or directly convertible into a validator ID (which
> usually means being a stash account).
>
> # <weight>
>
> - Complexity: `O(1)` in number of key types. Actual cost depends on the number of length
>   of `T::Keys::key_ids()` which is fixed.
> - DbReads: `T::ValidatorIdOf`, `NextKeys`, `origin account`
> - DbWrites: `NextKeys`, `origin account`
> - DbWrites per key id: `KeyOwner`
>
> # </weight>

arguments: -

<hr>

## Grandpa pallet

### _State Queries_

#### **api.query.grandpa.palletVersion**

> Returns the current pallet version from storage

arguments: -

returns: `u16`

<hr>

#### **api.query.grandpa.state**

> State of the current authority set.

arguments: -

returns: `PalletGrandpaStoredState`

<hr>

#### **api.query.grandpa.pendingChange**

> Pending change: (signaled at, scheduled change).

arguments: -

returns: `PalletGrandpaStoredPendingChange`

<hr>

#### **api.query.grandpa.nextForced**

> next block number where we can force a change.

arguments: -

returns: `u32`

<hr>

#### **api.query.grandpa.stalled**

> `true` if we are currently stalled.

arguments: -

returns: `(u32,u32)`

<hr>

#### **api.query.grandpa.currentSetId**

> The number of changes (both in terms of keys and underlying economic responsibilities)
> in the "set" of Grandpa validators from genesis.

arguments: -

returns: `u64`

<hr>

#### **api.query.grandpa.setIdSession**

> A mapping from grandpa set ID to the index of the _most recent_ session for which its
> members were responsible.
>
> TWOX-NOTE: `SetId` is not under user control.

arguments:

- key: `u64`

returns: `u32`

<hr>

### _Extrinsics_

#### **api.tx.grandpa.reportEquivocation**

> Report voter equivocation/misbehavior. This method will verify the
> equivocation proof and validate the given key ownership proof
> against the extracted offender. If both are valid, the offence
> will be reported.

arguments:

- equivocationProof: `SpFinalityGrandpaEquivocationProof`
- keyOwnerProof: `SpSessionMembershipProof`
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

- equivocationProof: `SpFinalityGrandpaEquivocationProof`
- keyOwnerProof: `SpSessionMembershipProof`
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

- delay: `u32`
- bestFinalizedBlockNumber: `u32`
<hr>

## ImOnline pallet

### _State Queries_

#### **api.query.imOnline.palletVersion**

> Returns the current pallet version from storage

arguments: -

returns: `u16`

<hr>

#### **api.query.imOnline.heartbeatAfter**

> The block number after which it's ok to send heartbeats in the current
> session.
>
> At the beginning of each session we set this to a value that should fall
> roughly in the middle of the session duration. The idea is to first wait for
> the validators to produce a block in the current session, so that the
> heartbeat later on will not be necessary.
>
> This value will only be used as a fallback if we fail to get a proper session
> progress estimate from `NextSessionRotation`, as those estimates should be
> more accurate then the value we calculate for `HeartbeatAfter`.

arguments: -

returns: `u32`

<hr>

#### **api.query.imOnline.keys**

> The current set of keys that may issue a heartbeat.

arguments: -

returns: `Vec<PalletImOnlineSr25519AppSr25519Public>`

<hr>

#### **api.query.imOnline.receivedHeartbeats**

> For each session index, we keep a mapping of `SessionIndex` and `AuthIndex` to
> `WrapperOpaque<BoundedOpaqueNetworkState>`.

arguments:

- key: `(u32,u32)`

returns: `WrapperOpaque<PalletImOnlineBoundedOpaqueNetworkState>`

<hr>

#### **api.query.imOnline.authoredBlocks**

> For each session index, we keep a mapping of `ValidatorId<T>` to the
> number of blocks authored by the given authority.

arguments:

- key: `(u32,AccountId32)`

returns: `u32`

<hr>

### _Extrinsics_

#### **api.tx.imOnline.heartbeat**

> # <weight>
>
> - Complexity: `O(K + E)` where K is length of `Keys` (heartbeat.validators_len) and E is
>   length of `heartbeat.network_state.external_address`
> - `O(K)`: decoding of length `K`
> - `O(E)`: decoding/encoding of length `E`
> - DbReads: pallet_session `Validators`, pallet_session `CurrentIndex`, `Keys`,
>   `ReceivedHeartbeats`
> - DbWrites: `ReceivedHeartbeats`
>
> # </weight>

arguments:

- heartbeat: `PalletImOnlineHeartbeat`
- signature: `PalletImOnlineSr25519AppSr25519Signature`
<hr>

## Tokens pallet

### _State Queries_

#### **api.query.tokens.palletVersion**

> Returns the current pallet version from storage

arguments: -

returns: `u16`

<hr>

#### **api.query.tokens.totalIssuance**

> The total issuance of a token type.

arguments:

- key: `CommonPrimitivesAssetId32`

returns: `u128`

<hr>

#### **api.query.tokens.locks**

> Any liquidity locks of a token type under an account.
> NOTE: Should only be accessed when setting, changing and freeing a lock.

arguments:

- key: `(AccountId32,CommonPrimitivesAssetId32)`

returns: `Vec<OrmlTokensBalanceLock>`

<hr>

#### **api.query.tokens.accounts**

> The balance of a token type under an account.
>
> NOTE: If the total is ever zero, decrease account ref account.
>
> NOTE: This is only used in the case that this module is used to store
> balances.

arguments:

- key: `(AccountId32,CommonPrimitivesAssetId32)`

returns: `OrmlTokensAccountData`

<hr>

#### **api.query.tokens.reserves**

> Named reserves on some account balances.

arguments:

- key: `(AccountId32,CommonPrimitivesAssetId32)`

returns: `Vec<OrmlTokensReserveData>`

<hr>

## TradingPair pallet

### _State Queries_

#### **api.query.tradingPair.palletVersion**

> Returns the current pallet version from storage

arguments: -

returns: `u16`

<hr>

#### **api.query.tradingPair.enabledSources**

arguments:

- key: `(u32,CommonPrimitivesTradingPairAssetId32)`

returns: `BTreeSet<CommonPrimitivesLiquiditySourceType>`

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

- dexId: `u32`
- baseAssetId: `CommonPrimitivesAssetId32`
- targetAssetId: `CommonPrimitivesAssetId32`
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

#### **api.query.assets.palletVersion**

> Returns the current pallet version from storage

arguments: -

returns: `u16`

<hr>

#### **api.query.assets.assetOwners**

> Asset Id -> Owner Account Id

arguments:

- key: `CommonPrimitivesAssetId32`

returns: `AccountId32`

<hr>

#### **api.query.assets.assetInfos**

> Asset Id -> (Symbol, Name, Precision, Is Mintable, Content Source, Description)

arguments:

- key: `CommonPrimitivesAssetId32`

returns: `(Bytes,Bytes,u8,bool,Option<Bytes>,Option<Bytes>)`

<hr>

#### **api.query.assets.assetRecordAssetId**

> Asset Id -> AssetRecord<T>

arguments:

- key: `CommonPrimitivesAssetId32`

returns: `AssetsAssetRecord`

<hr>

### _Extrinsics_

#### **api.tx.assets.register**

> Performs an asset registration.
>
> Registers new `AssetId` for the given `origin`.
> AssetSymbol should represent string with only uppercase latin chars with max length of 7.
> AssetName should represent string with only uppercase or lowercase latin chars or numbers or spaces, with max length of 33.

arguments:

- symbol: `Bytes`
- name: `Bytes`
- initialSupply: `u128`
- isMintable: `bool`
- isIndivisible: `bool`
- optContentSrc: `Option<Bytes>`
- optDesc: `Option<Bytes>`
<hr>

#### **api.tx.assets.transfer**

> Performs a checked Asset transfer.
>
> - `origin`: caller Account, from which Asset amount is withdrawn,
> - `asset_id`: Id of transferred Asset,
> - `to`: Id of Account, to which Asset amount is deposited,
> - `amount`: transferred Asset amount.

arguments:

- assetId: `CommonPrimitivesAssetId32`
- to: `AccountId32`
- amount: `u128`
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

- assetId: `CommonPrimitivesAssetId32`
- to: `AccountId32`
- amount: `u128`
<hr>

#### **api.tx.assets.burn**

> Performs a checked Asset burn, can only be done
> by corresponding asset owner with own account.
>
> - `origin`: caller Account, from which Asset amount is burned,
> - `asset_id`: Id of burned Asset,
> - `amount`: burned Asset amount.

arguments:

- assetId: `CommonPrimitivesAssetId32`
- amount: `u128`
<hr>

#### **api.tx.assets.setNonMintable**

> Set given asset to be non-mintable, i.e. it can no longer be minted, only burned.
> Operation can not be undone.
>
> - `origin`: caller Account, should correspond to Asset owner
> - `asset_id`: Id of burned Asset,

arguments:

- assetId: `CommonPrimitivesAssetId32`
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

#### **api.query.dexManager.palletVersion**

> Returns the current pallet version from storage

arguments: -

returns: `u16`

<hr>

#### **api.query.dexManager.dexInfos**

arguments:

- key: `u32`

returns: `CommonPrimitivesDexInfo`

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

#### **api.query.multicollateralBondingCurvePool.palletVersion**

> Returns the current pallet version from storage

arguments: -

returns: `u16`

<hr>

#### **api.query.multicollateralBondingCurvePool.reservesAcc**

> Technical account used to store collateral tokens.

arguments: -

returns: `CommonPrimitivesTechAccountId`

<hr>

#### **api.query.multicollateralBondingCurvePool.freeReservesAccountId**

arguments: -

returns: `AccountId32`

<hr>

#### **api.query.multicollateralBondingCurvePool.pendingFreeReserves**

arguments: -

returns: `Vec<(CommonPrimitivesAssetId32,u128)>`

<hr>

#### **api.query.multicollateralBondingCurvePool.initialPrice**

> Buy price starting constant. This is the price users pay for new XOR.

arguments: -

returns: `FixnumFixedPoint`

<hr>

#### **api.query.multicollateralBondingCurvePool.priceChangeStep**

> Cofficients in buy price function.

arguments: -

returns: `FixnumFixedPoint`

<hr>

#### **api.query.multicollateralBondingCurvePool.priceChangeRate**

arguments: -

returns: `FixnumFixedPoint`

<hr>

#### **api.query.multicollateralBondingCurvePool.sellPriceCoefficient**

> Sets the sell function as a fraction of the buy function, so there is margin between the two functions.

arguments: -

returns: `FixnumFixedPoint`

<hr>

#### **api.query.multicollateralBondingCurvePool.alwaysDistributeCoefficient**

> Coefficient which determines the fraction of input collateral token to be exchanged to XOR and
> be distributed to predefined accounts. Relevant for the Buy function (when a user buys new XOR).

arguments: -

returns: `FixnumFixedPoint`

<hr>

#### **api.query.multicollateralBondingCurvePool.baseFee**

> Base fee in XOR which is deducted on all trades, currently it's burned: 0.3%.

arguments: -

returns: `FixnumFixedPoint`

<hr>

#### **api.query.multicollateralBondingCurvePool.distributionAccountsEntry**

> Accounts that receive 20% buy/sell margin according predefined proportions.

arguments: -

returns: `MulticollateralBondingCurvePoolDistributionAccounts`

<hr>

#### **api.query.multicollateralBondingCurvePool.enabledTargets**

> Collateral Assets allowed to be sold on bonding curve.

arguments: -

returns: `BTreeSet<CommonPrimitivesAssetId32>`

<hr>

#### **api.query.multicollateralBondingCurvePool.referenceAssetId**

> Asset that is used to compare collateral assets by value, e.g., DAI.

arguments: -

returns: `CommonPrimitivesAssetId32`

<hr>

#### **api.query.multicollateralBondingCurvePool.rewards**

> Registry to store information about rewards owned by users in PSWAP. (claim_limit, available_rewards)

arguments:

- key: `AccountId32`

returns: `(u128,u128)`

<hr>

#### **api.query.multicollateralBondingCurvePool.totalRewards**

> Total amount of PSWAP owned by accounts.

arguments: -

returns: `u128`

<hr>

#### **api.query.multicollateralBondingCurvePool.incentivisedCurrenciesNum**

> Number of reserve currencies selling which user will get rewards, namely all registered collaterals except PSWAP and VAL.

arguments: -

returns: `u32`

<hr>

#### **api.query.multicollateralBondingCurvePool.incentivesAccountId**

> Account which stores actual PSWAP intended for rewards.

arguments: -

returns: `AccountId32`

<hr>

#### **api.query.multicollateralBondingCurvePool.assetsWithOptionalRewardMultiplier**

> Reward multipliers for special assets. Asset Id => Reward Multiplier

arguments:

- key: `CommonPrimitivesAssetId32`

returns: `FixnumFixedPoint`

<hr>

#### **api.query.multicollateralBondingCurvePool.initialPswapRewardsSupply**

> Amount of PSWAP initially stored in account dedicated for TBC rewards. Actual account balance will deplete over time,
> however this constant is not modified.

arguments: -

returns: `u128`

<hr>

#### **api.query.multicollateralBondingCurvePool.collateralReserves**

> Current reserves balance for collateral tokens, used for client usability.

arguments:

- key: `CommonPrimitivesAssetId32`

returns: `u128`

<hr>

### _Extrinsics_

#### **api.tx.multicollateralBondingCurvePool.initializePool**

> Enable exchange path on the pool for pair BaseAsset-CollateralAsset.

arguments:

- collateralAssetId: `CommonPrimitivesAssetId32`
<hr>

#### **api.tx.multicollateralBondingCurvePool.setReferenceAsset**

> Change reference asset which is used to determine collateral assets value. Inteded to be e.g. stablecoin DAI.

arguments:

- referenceAssetId: `CommonPrimitivesAssetId32`
<hr>

#### **api.tx.multicollateralBondingCurvePool.setOptionalRewardMultiplier**

> Set multiplier which is applied to rewarded amount when depositing particular collateral assets.
> `None` value indicates reward without change, same as Some(1.0).

arguments:

- collateralAssetId: `CommonPrimitivesAssetId32`
- multiplier: `Option<FixnumFixedPoint>`
<hr>

#### **api.tx.multicollateralBondingCurvePool.setPriceBias**

> Changes `initial_price` used as bias in XOR-DAI(reference asset) price calculation

arguments:

- priceBias: `u128`
<hr>

#### **api.tx.multicollateralBondingCurvePool.setPriceChangeConfig**

> Changes price change rate and step

arguments:

- priceChangeRate: `u128`
- priceChangeStep: `u128`
<hr>

## PoolXYK pallet

### _State Queries_

#### **api.query.poolXYK.palletVersion**

> Returns the current pallet version from storage

arguments: -

returns: `u16`

<hr>

#### **api.query.poolXYK.reserves**

> Updated after last liquidity change operation.
> [Base Asset Id (XOR) -> Target Asset Id => (Base Balance, Target Balance)].
> This storage records is not used as source of information, but used as quick cache for
> information that comes from balances for assets from technical accounts.
> For example, communication with technical accounts and their storage is not needed, and this
> pair to balance cache can be used quickly.

arguments:

- key: `(CommonPrimitivesAssetId32,CommonPrimitivesAssetId32)`

returns: `(u128,u128)`

<hr>

#### **api.query.poolXYK.poolProviders**

> Liquidity providers of particular pool.
> Pool account => Liquidity provider account => Pool token balance

arguments:

- key: `(AccountId32,AccountId32)`

returns: `u128`

<hr>

#### **api.query.poolXYK.accountPools**

> Set of pools in which accounts have some share.
> Liquidity provider account => Target Asset of pair (assuming base asset is XOR)

arguments:

- key: `AccountId32`

returns: `BTreeSet<CommonPrimitivesAssetId32>`

<hr>

#### **api.query.poolXYK.totalIssuances**

> Total issuance of particular pool.
> Pool account => Total issuance

arguments:

- key: `AccountId32`

returns: `u128`

<hr>

#### **api.query.poolXYK.properties**

> Properties of particular pool. Base Asset => Target Asset => (Reserves Account Id, Fees Account Id)

arguments:

- key: `(CommonPrimitivesAssetId32,CommonPrimitivesAssetId32)`

returns: `(AccountId32,AccountId32)`

<hr>

### _Extrinsics_

#### **api.tx.poolXYK.depositLiquidity**

arguments:

- dexId: `u32`
- inputAssetA: `CommonPrimitivesAssetId32`
- inputAssetB: `CommonPrimitivesAssetId32`
- inputADesired: `u128`
- inputBDesired: `u128`
- inputAMin: `u128`
- inputBMin: `u128`
<hr>

#### **api.tx.poolXYK.withdrawLiquidity**

arguments:

- dexId: `u32`
- outputAssetA: `CommonPrimitivesAssetId32`
- outputAssetB: `CommonPrimitivesAssetId32`
- markerAssetDesired: `u128`
- outputAMin: `u128`
- outputBMin: `u128`
<hr>

#### **api.tx.poolXYK.initializePool**

arguments:

- dexId: `u32`
- assetA: `CommonPrimitivesAssetId32`
- assetB: `CommonPrimitivesAssetId32`
<hr>

## Council pallet

### _State Queries_

#### **api.query.council.palletVersion**

> Returns the current pallet version from storage

arguments: -

returns: `u16`

<hr>

#### **api.query.council.proposals**

> The hashes of the active proposals.

arguments: -

returns: `Vec<H256>`

<hr>

#### **api.query.council.proposalOf**

> Actual proposal for a given hash, if it's current.

arguments:

- key: `H256`

returns: `Call`

<hr>

#### **api.query.council.voting**

> Votes on a given proposal, if it is ongoing.

arguments:

- key: `H256`

returns: `PalletCollectiveVotes`

<hr>

#### **api.query.council.proposalCount**

> Proposals so far.

arguments: -

returns: `u32`

<hr>

#### **api.query.council.members**

> The current members of the collective. This is stored sorted (just by value).

arguments: -

returns: `Vec<AccountId32>`

<hr>

#### **api.query.council.prime**

> The prime member that helps determine the default vote behavior in case of absentations.

arguments: -

returns: `AccountId32`

<hr>

### _Extrinsics_

#### **api.tx.council.setMembers**

> Set the collective's membership.
>
> - `new_members`: The new member list. Be nice to the chain and provide it sorted.
> - `prime`: The prime member whose vote sets the default.
> - `old_count`: The upper bound for the previous number of members in storage. Used for
>   weight estimation.
>
> Requires root origin.
>
> NOTE: Does not enforce the expected `MaxMembers` limit on the amount of members, but
> the weight estimations rely on it to estimate dispatchable weight.
>
> # WARNING:
>
> The `pallet-collective` can also be managed by logic outside of the pallet through the
> implementation of the trait [`ChangeMembers`].
> Any call to `set_members` must be careful that the member set doesn't get out of sync
> with other logic managing the member set.
>
> # <weight>
>
> ## Weight
>
> - `O(MP + N)` where:
> - `M` old-members-count (code- and governance-bounded)
> - `N` new-members-count (code- and governance-bounded)
> - `P` proposals-count (code-bounded)
> - DB:
> - 1 storage mutation (codec `O(M)` read, `O(N)` write) for reading and writing the
>   members
> - 1 storage read (codec `O(P)`) for reading the proposals
> - `P` storage mutations (codec `O(M)`) for updating the votes for each proposal
> - 1 storage write (codec `O(1)`) for deleting the old `prime` and setting the new one
>
> # </weight>

arguments:

- newMembers: `Vec<AccountId32>`
- prime: `Option<AccountId32>`
- oldCount: `u32`
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
> - `O(M + P)` where `M` members-count (code-bounded) and `P` complexity of dispatching
>   `proposal`
> - DB: 1 read (codec `O(M)`) + DB access of `proposal`
> - 1 event
>
> # </weight>

arguments:

- proposal: `Call`
- lengthBound: `Compact<u32>`
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
> - `B` is `proposal` size in bytes (length-fee-bounded)
> - `M` is members-count (code- and governance-bounded)
> - branching is influenced by `threshold` where:
>   - `P1` is proposal execution complexity (`threshold < 2`)
>   - `P2` is proposals-count (code-bounded) (`threshold >= 2`)
> - DB:
> - 1 storage read `is_member` (codec `O(M)`)
> - 1 storage read `ProposalOf::contains_key` (codec `O(1)`)
> - DB accesses influenced by `threshold`:
>   - EITHER storage accesses done by `proposal` (`threshold < 2`)
>   - OR proposal insertion (`threshold <= 2`)
>     - 1 storage mutation `Proposals` (codec `O(P2)`)
>     - 1 storage mutation `ProposalCount` (codec `O(1)`)
>     - 1 storage write `ProposalOf` (codec `O(B)`)
>     - 1 storage write `Voting` (codec `O(M)`)
> - 1 event
>
> # </weight>

arguments:

- threshold: `Compact<u32>`
- proposal: `Call`
- lengthBound: `Compact<u32>`
<hr>

#### **api.tx.council.vote**

> Add an aye or nay vote for the sender to the given proposal.
>
> Requires the sender to be a member.
>
> Transaction fees will be waived if the member is voting on any particular proposal
> for the first time and the call is successful. Subsequent vote changes will charge a
> fee.
>
> # <weight>
>
> ## Weight
>
> - `O(M)` where `M` is members-count (code- and governance-bounded)
> - DB:
> - 1 storage read `Members` (codec `O(M)`)
> - 1 storage mutation `Voting` (codec `O(M)`)
> - 1 event
>
> # </weight>

arguments:

- proposal: `H256`
- index: `Compact<u32>`
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
> - `proposal_weight_bound`: The maximum amount of weight consumed by executing the closed
>   proposal.
> - `length_bound`: The upper bound for the length of the proposal in storage. Checked via
>   `storage::read` so it is `size_of::<u32>() == 4` larger than the pure length.
>
> # <weight>
>
> ## Weight
>
> - `O(B + M + P1 + P2)` where:
> - `B` is `proposal` size in bytes (length-fee-bounded)
> - `M` is members-count (code- and governance-bounded)
> - `P1` is the complexity of `proposal` preimage.
> - `P2` is proposal-count (code-bounded)
> - DB:
> - 2 storage reads (`Members`: codec `O(M)`, `Prime`: codec `O(1)`)
> - 3 mutations (`Voting`: codec `O(M)`, `ProposalOf`: codec `O(B)`, `Proposals`: codec
>   `O(P2)`)
> - any mutations done while executing `proposal` (`P1`)
> - up to 3 events
>
> # </weight>

arguments:

- proposalHash: `H256`
- index: `Compact<u32>`
- proposalWeightBound: `Compact<u64>`
- lengthBound: `Compact<u32>`
<hr>

#### **api.tx.council.disapproveProposal**

> Disapprove a proposal, close, and remove it from the system, regardless of its current
> state.
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

- proposalHash: `H256`
<hr>

## TechnicalCommittee pallet

### _State Queries_

#### **api.query.technicalCommittee.palletVersion**

> Returns the current pallet version from storage

arguments: -

returns: `u16`

<hr>

#### **api.query.technicalCommittee.proposals**

> The hashes of the active proposals.

arguments: -

returns: `Vec<H256>`

<hr>

#### **api.query.technicalCommittee.proposalOf**

> Actual proposal for a given hash, if it's current.

arguments:

- key: `H256`

returns: `Call`

<hr>

#### **api.query.technicalCommittee.voting**

> Votes on a given proposal, if it is ongoing.

arguments:

- key: `H256`

returns: `PalletCollectiveVotes`

<hr>

#### **api.query.technicalCommittee.proposalCount**

> Proposals so far.

arguments: -

returns: `u32`

<hr>

#### **api.query.technicalCommittee.members**

> The current members of the collective. This is stored sorted (just by value).

arguments: -

returns: `Vec<AccountId32>`

<hr>

#### **api.query.technicalCommittee.prime**

> The prime member that helps determine the default vote behavior in case of absentations.

arguments: -

returns: `AccountId32`

<hr>

### _Extrinsics_

#### **api.tx.technicalCommittee.setMembers**

> Set the collective's membership.
>
> - `new_members`: The new member list. Be nice to the chain and provide it sorted.
> - `prime`: The prime member whose vote sets the default.
> - `old_count`: The upper bound for the previous number of members in storage. Used for
>   weight estimation.
>
> Requires root origin.
>
> NOTE: Does not enforce the expected `MaxMembers` limit on the amount of members, but
> the weight estimations rely on it to estimate dispatchable weight.
>
> # WARNING:
>
> The `pallet-collective` can also be managed by logic outside of the pallet through the
> implementation of the trait [`ChangeMembers`].
> Any call to `set_members` must be careful that the member set doesn't get out of sync
> with other logic managing the member set.
>
> # <weight>
>
> ## Weight
>
> - `O(MP + N)` where:
> - `M` old-members-count (code- and governance-bounded)
> - `N` new-members-count (code- and governance-bounded)
> - `P` proposals-count (code-bounded)
> - DB:
> - 1 storage mutation (codec `O(M)` read, `O(N)` write) for reading and writing the
>   members
> - 1 storage read (codec `O(P)`) for reading the proposals
> - `P` storage mutations (codec `O(M)`) for updating the votes for each proposal
> - 1 storage write (codec `O(1)`) for deleting the old `prime` and setting the new one
>
> # </weight>

arguments:

- newMembers: `Vec<AccountId32>`
- prime: `Option<AccountId32>`
- oldCount: `u32`
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
> - `O(M + P)` where `M` members-count (code-bounded) and `P` complexity of dispatching
>   `proposal`
> - DB: 1 read (codec `O(M)`) + DB access of `proposal`
> - 1 event
>
> # </weight>

arguments:

- proposal: `Call`
- lengthBound: `Compact<u32>`
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
> - `B` is `proposal` size in bytes (length-fee-bounded)
> - `M` is members-count (code- and governance-bounded)
> - branching is influenced by `threshold` where:
>   - `P1` is proposal execution complexity (`threshold < 2`)
>   - `P2` is proposals-count (code-bounded) (`threshold >= 2`)
> - DB:
> - 1 storage read `is_member` (codec `O(M)`)
> - 1 storage read `ProposalOf::contains_key` (codec `O(1)`)
> - DB accesses influenced by `threshold`:
>   - EITHER storage accesses done by `proposal` (`threshold < 2`)
>   - OR proposal insertion (`threshold <= 2`)
>     - 1 storage mutation `Proposals` (codec `O(P2)`)
>     - 1 storage mutation `ProposalCount` (codec `O(1)`)
>     - 1 storage write `ProposalOf` (codec `O(B)`)
>     - 1 storage write `Voting` (codec `O(M)`)
> - 1 event
>
> # </weight>

arguments:

- threshold: `Compact<u32>`
- proposal: `Call`
- lengthBound: `Compact<u32>`
<hr>

#### **api.tx.technicalCommittee.vote**

> Add an aye or nay vote for the sender to the given proposal.
>
> Requires the sender to be a member.
>
> Transaction fees will be waived if the member is voting on any particular proposal
> for the first time and the call is successful. Subsequent vote changes will charge a
> fee.
>
> # <weight>
>
> ## Weight
>
> - `O(M)` where `M` is members-count (code- and governance-bounded)
> - DB:
> - 1 storage read `Members` (codec `O(M)`)
> - 1 storage mutation `Voting` (codec `O(M)`)
> - 1 event
>
> # </weight>

arguments:

- proposal: `H256`
- index: `Compact<u32>`
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
> - `proposal_weight_bound`: The maximum amount of weight consumed by executing the closed
>   proposal.
> - `length_bound`: The upper bound for the length of the proposal in storage. Checked via
>   `storage::read` so it is `size_of::<u32>() == 4` larger than the pure length.
>
> # <weight>
>
> ## Weight
>
> - `O(B + M + P1 + P2)` where:
> - `B` is `proposal` size in bytes (length-fee-bounded)
> - `M` is members-count (code- and governance-bounded)
> - `P1` is the complexity of `proposal` preimage.
> - `P2` is proposal-count (code-bounded)
> - DB:
> - 2 storage reads (`Members`: codec `O(M)`, `Prime`: codec `O(1)`)
> - 3 mutations (`Voting`: codec `O(M)`, `ProposalOf`: codec `O(B)`, `Proposals`: codec
>   `O(P2)`)
> - any mutations done while executing `proposal` (`P1`)
> - up to 3 events
>
> # </weight>

arguments:

- proposalHash: `H256`
- index: `Compact<u32>`
- proposalWeightBound: `Compact<u64>`
- lengthBound: `Compact<u32>`
<hr>

#### **api.tx.technicalCommittee.disapproveProposal**

> Disapprove a proposal, close, and remove it from the system, regardless of its current
> state.
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

- proposalHash: `H256`
<hr>

## Democracy pallet

### _State Queries_

#### **api.query.democracy.palletVersion**

> Returns the current pallet version from storage

arguments: -

returns: `u16`

<hr>

#### **api.query.democracy.publicPropCount**

> The number of (public) proposals that have been made so far.

arguments: -

returns: `u32`

<hr>

#### **api.query.democracy.publicProps**

> The public proposals. Unsorted. The second item is the proposal's hash.

arguments: -

returns: `Vec<(u32,H256,AccountId32)>`

<hr>

#### **api.query.democracy.depositOf**

> Those who have locked a deposit.
>
> TWOX-NOTE: Safe, as increasing integer keys are safe.

arguments:

- key: `u32`

returns: `(Vec<AccountId32>,u128)`

<hr>

#### **api.query.democracy.preimages**

> Map of hashes to the proposal preimage, along with who registered it and their deposit.
> The block number is the block at which it was deposited.

arguments:

- key: `H256`

returns: `PalletDemocracyPreimageStatus`

<hr>

#### **api.query.democracy.referendumCount**

> The next free referendum index, aka the number of referenda started so far.

arguments: -

returns: `u32`

<hr>

#### **api.query.democracy.lowestUnbaked**

> The lowest referendum index representing an unbaked referendum. Equal to
> `ReferendumCount` if there isn't a unbaked referendum.

arguments: -

returns: `u32`

<hr>

#### **api.query.democracy.referendumInfoOf**

> Information concerning any given referendum.
>
> TWOX-NOTE: SAFE as indexes are not under an attacker’s control.

arguments:

- key: `u32`

returns: `PalletDemocracyReferendumInfo`

<hr>

#### **api.query.democracy.votingOf**

> All votes for a particular voter. We store the balance for the number of votes that we
> have recorded. The second item is the total amount of delegations, that will be added.
>
> TWOX-NOTE: SAFE as `AccountId`s are crypto hashes anyway.

arguments:

- key: `AccountId32`

returns: `PalletDemocracyVoteVoting`

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

returns: `(H256,PalletDemocracyVoteThreshold)`

<hr>

#### **api.query.democracy.blacklist**

> A record of who vetoed what. Maps proposal hash to a possible existent block number
> (until when it may not be resubmitted) and who vetoed it.

arguments:

- key: `H256`

returns: `(u32,Vec<AccountId32>)`

<hr>

#### **api.query.democracy.cancellations**

> Record of all proposals that have been subject to emergency cancellation.

arguments:

- key: `H256`

returns: `bool`

<hr>

#### **api.query.democracy.storageVersion**

> Storage version of the pallet.
>
> New networks start with last version.

arguments: -

returns: `PalletDemocracyReleases`

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

- proposalHash: `H256`
- value: `Compact<u128>`
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

- proposal: `Compact<u32>`
- secondsUpperBound: `Compact<u32>`
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

- refIndex: `Compact<u32>`
- vote: `PalletDemocracyVoteAccountVote`
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

- refIndex: `u32`
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

- proposalHash: `H256`
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

- proposalHash: `H256`
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

- proposalHash: `H256`
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

- proposalHash: `H256`
- votingPeriod: `u32`
- delay: `u32`
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

- proposalHash: `H256`
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

- refIndex: `Compact<u32>`
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

- which: `u32`
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
> - `balance`: The amount of the account's balance to be used in delegating. This must not
>   be more than the account's current balance.
>
> Emits `Delegated`.
>
> Weight: `O(R)` where R is the number of referendums the voter delegating to has
> voted on. Weight is charged as if maximum votes.

arguments:

- to: `AccountId32`
- conviction: `PalletDemocracyConviction`
- balance: `u128`
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

- encodedProposal: `Bytes`
<hr>

#### **api.tx.democracy.notePreimageOperational**

> Same as `note_preimage` but origin is `OperationalPreimageOrigin`.

arguments:

- encodedProposal: `Bytes`
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

- encodedProposal: `Bytes`
<hr>

#### **api.tx.democracy.noteImminentPreimageOperational**

> Same as `note_imminent_preimage` but origin is `OperationalPreimageOrigin`.

arguments:

- encodedProposal: `Bytes`
<hr>

#### **api.tx.democracy.reapPreimage**

> Remove an expired proposal preimage and collect the deposit.
>
> The dispatch origin of this call must be _Signed_.
>
> - `proposal_hash`: The preimage hash of a proposal.
> - `proposal_length_upper_bound`: an upper bound on length of the proposal. Extrinsic is
>   weighted according to this value with no refund.
>
> This will only work after `VotingPeriod` blocks from the time that the preimage was
> noted, if it's the same account doing it. If it's a different account, then it'll only
> work an additional `EnactmentPeriod` later.
>
> Emits `PreimageReaped`.
>
> Weight: `O(D)` where D is length of proposal.

arguments:

- proposalHash: `H256`
- proposalLenUpperBound: `Compact<u32>`
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

- target: `AccountId32`
<hr>

#### **api.tx.democracy.removeVote**

> Remove a vote for a referendum.
>
> If:
>
> - the referendum was cancelled, or
> - the referendum is ongoing, or
> - the referendum has ended such that
> - the vote of the account was in opposition to the result; or
> - there was no conviction to the account's vote; or
> - the account made a split vote
>   ...then the vote is removed cleanly and a following call to `unlock` may result in more
>   funds being available.
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

- index: `u32`
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

- target: `AccountId32`
- index: `u32`
<hr>

#### **api.tx.democracy.enactProposal**

> Enact a proposal from a referendum. For now we just make the weight be the maximum.

arguments:

- proposalHash: `H256`
- index: `u32`
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

- proposalHash: `H256`
- maybeRefIndex: `Option<u32>`
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

- propIndex: `Compact<u32>`
<hr>

## Dexapi pallet

### _State Queries_

#### **api.query.dexapi.palletVersion**

> Returns the current pallet version from storage

arguments: -

returns: `u16`

<hr>

#### **api.query.dexapi.enabledSourceTypes**

arguments: -

returns: `Vec<CommonPrimitivesLiquiditySourceType>`

<hr>

## EthBridge pallet

### _State Queries_

#### **api.query.ethBridge.palletVersion**

> Returns the current pallet version from storage

arguments: -

returns: `u16`

<hr>

#### **api.query.ethBridge.requestsQueue**

> Registered requests queue handled by off-chain workers.

arguments:

- key: `u32`

returns: `Vec<H256>`

<hr>

#### **api.query.ethBridge.requests**

> Registered requests.

arguments:

- key: `(u32,H256)`

returns: `EthBridgeRequestsOffchainRequest`

<hr>

#### **api.query.ethBridge.loadToIncomingRequestHash**

> Used to identify an incoming request by the corresponding load request.

arguments:

- key: `(u32,H256)`

returns: `H256`

<hr>

#### **api.query.ethBridge.requestStatuses**

> Requests statuses.

arguments:

- key: `(u32,H256)`

returns: `EthBridgeRequestsRequestStatus`

<hr>

#### **api.query.ethBridge.requestSubmissionHeight**

> Requests submission height map (on substrate).

arguments:

- key: `(u32,H256)`

returns: `u32`

<hr>

#### **api.query.ethBridge.requestApprovals**

> Outgoing requests approvals.

arguments:

- key: `(u32,H256)`

returns: `BTreeSet<EthBridgeOffchainSignatureParams>`

<hr>

#### **api.query.ethBridge.accountRequests**

> Requests made by an account.

arguments:

- key: `AccountId32`

returns: `Vec<(u32,H256)>`

<hr>

#### **api.query.ethBridge.registeredAsset**

> Registered asset kind.

arguments:

- key: `(u32,CommonPrimitivesAssetId32)`

returns: `EthBridgeRequestsAssetKind`

<hr>

#### **api.query.ethBridge.sidechainAssetPrecision**

> Precision (decimals) of a registered sidechain asset. Should be the same as in the ERC-20
> contract.

arguments:

- key: `(u32,CommonPrimitivesAssetId32)`

returns: `u8`

<hr>

#### **api.query.ethBridge.registeredSidechainAsset**

> Registered token `AssetId` on Thischain.

arguments:

- key: `(u32,H160)`

returns: `CommonPrimitivesAssetId32`

<hr>

#### **api.query.ethBridge.registeredSidechainToken**

> Registered asset address on Sidechain.

arguments:

- key: `(u32,CommonPrimitivesAssetId32)`

returns: `H160`

<hr>

#### **api.query.ethBridge.peers**

> Network peers set.

arguments:

- key: `u32`

returns: `BTreeSet<AccountId32>`

<hr>

#### **api.query.ethBridge.pendingPeer**

> Network pending (being added/removed) peer.

arguments:

- key: `u32`

returns: `AccountId32`

<hr>

#### **api.query.ethBridge.pendingEthPeersSync**

> Used for compatibility with XOR and VAL contracts.

arguments: -

returns: `EthBridgeRequestsOutgoingEthPeersSync`

<hr>

#### **api.query.ethBridge.peerAccountId**

> Peer account ID on Thischain.

arguments:

- key: `(u32,H160)`

returns: `AccountId32`

<hr>

#### **api.query.ethBridge.peerAddress**

> Peer address on Sidechain.

arguments:

- key: `(u32,AccountId32)`

returns: `H160`

<hr>

#### **api.query.ethBridge.bridgeAccount**

> Multi-signature bridge peers' account. `None` if there is no account and network with the given ID.

arguments:

- key: `u32`

returns: `AccountId32`

<hr>

#### **api.query.ethBridge.authorityAccount**

> Thischain authority account.

arguments: -

returns: `AccountId32`

<hr>

#### **api.query.ethBridge.bridgeStatuses**

> Bridge status.

arguments:

- key: `u32`

returns: `EthBridgeBridgeStatus`

<hr>

#### **api.query.ethBridge.bridgeContractAddress**

> Smart-contract address on Sidechain.

arguments:

- key: `u32`

returns: `H160`

<hr>

#### **api.query.ethBridge.xorMasterContractAddress**

> Sora XOR master contract address.

arguments: -

returns: `H160`

<hr>

#### **api.query.ethBridge.valMasterContractAddress**

> Sora VAL master contract address.

arguments: -

returns: `H160`

<hr>

#### **api.query.ethBridge.nextNetworkId**

> Next Network ID counter.

arguments: -

returns: `u32`

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

- bridgeContractAddress: `H160`
- initialPeers: `Vec<AccountId32>`
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

- assetId: `CommonPrimitivesAssetId32`
- networkId: `u32`
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

- tokenAddress: `H160`
- symbol: `Text`
- name: `Text`
- decimals: `u8`
- networkId: `u32`
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

- assetId: `CommonPrimitivesAssetId32`
- to: `H160`
- amount: `u128`
- networkId: `u32`
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

- ethTxHash: `H256`
- kind: `EthBridgeRequestsIncomingRequestKind`
- networkId: `u32`
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
- networkId: `u32`
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

- accountId: `AccountId32`
- address: `H160`
- networkId: `u32`
<hr>

#### **api.tx.ethBridge.removePeer**

> Remove peer from the the bridge peers set.
>
> Parameters:
>
> - `account_id` - account id on thischain.
> - `network_id` - network identifier.

arguments:

- accountId: `AccountId32`
- peerAddress: `Option<H160>`
- networkId: `u32`
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

- networkId: `u32`
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

- newContractAddress: `H160`
- erc20NativeTokens: `Vec<H160>`
- networkId: `u32`
<hr>

#### **api.tx.ethBridge.registerIncomingRequest**

> Register the given incoming request and add it to the queue.
>
> Calls `validate` and `prepare` on the request, adds it to the queue and maps it with the
> corresponding load-incoming-request and removes the load-request from the queue.
>
> Can only be called by a bridge account.

arguments:

- incomingRequest: `EthBridgeRequestsIncomingRequest`
<hr>

#### **api.tx.ethBridge.importIncomingRequest**

> Import the given incoming request.
>
> Register's the load request, then registers and finalizes the incoming request if it
> succeeded, otherwise aborts the load request.
>
> Can only be called by a bridge account.

arguments:

- loadIncomingRequest: `EthBridgeRequestsLoadIncomingRequest`
- incomingRequestResult: `Result<EthBridgeRequestsIncomingRequest,SpRuntimeDispatchError>`
<hr>

#### **api.tx.ethBridge.approveRequest**

> Approve the given outgoing request. The function is used by bridge peers.
>
> Verifies the peer signature of the given request and adds it to `RequestApprovals`.
> Once quorum is collected, the request gets finalized and removed from request queue.

arguments:

- ocwPublic: `SpCoreEcdsaPublic`
- hash: `H256`
- signatureParams: `EthBridgeOffchainSignatureParams`
- networkId: `u32`
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
- error: `SpRuntimeDispatchError`
- networkId: `u32`
<hr>

#### **api.tx.ethBridge.forceAddPeer**

> Add the given peer to the peers set without additional checks.
>
> Can only be called by a root account.

arguments:

- who: `AccountId32`
- address: `H160`
- networkId: `u32`
<hr>

#### **api.tx.ethBridge.removeSidechainAsset**

> Remove asset
>
> Can only be called by root.

arguments:

- assetId: `CommonPrimitivesAssetId32`
- networkId: `u32`
<hr>

#### **api.tx.ethBridge.registerExistingSidechainAsset**

> Register existing asset
>
> Can only be called by root.

arguments:

- assetId: `CommonPrimitivesAssetId32`
- tokenAddress: `H160`
- networkId: `u32`
<hr>

### _Custom RPCs_

#### **api.rpc.ethBridge.getRequests**

> Get registered requests and their statuses.

arguments:

- requestHashes: `Vec<H256>`
- networkId: `BridgeNetworkId`
- redirectFinishedLoadRequests: `bool`
- at: `BlockHash`

returns: `Result<Vec<(OffchainRequest, RequestStatus)>, DispatchError>`

<hr>

#### **api.rpc.ethBridge.getApprovedRequests**

> Get approved encoded requests and their approvals.

arguments:

- requestHashes: `Vec<H256>`
- networkId: `BridgeNetworkId`
- at: `BlockHash`

returns: `Result<Vec<(OutgoingRequestEncoded, Vec<SignatureParams>)>, DispatchError>`

<hr>

#### **api.rpc.ethBridge.getApprovals**

> Get approvals of the given requests.

arguments:

- requestHashes: `Vec<H256>`
- networkId: `BridgeNetworkId`
- at: `BlockHash`

returns: `Result<Vec<Vec<SignatureParams>>, DispatchError>`

<hr>

#### **api.rpc.ethBridge.getAccountRequests**

> Get account requests hashes.

arguments:

- accountId: `AccountId`
- statusFilter: `RequestStatus`
- at: `BlockHash`

returns: `Result<Vec<(BridgeNetworkId, H256)>, DispatchError>`

<hr>

#### **api.rpc.ethBridge.getRegisteredAssets**

> Get registered assets and tokens.

arguments:

- networkId: `BridgeNetworkId`
- at: `BlockHash`

returns: `Result<Vec<(AssetKind, (AssetId, BalancePrecision), Option<(H160, BalancePrecision)>)>, DispatchError>`

<hr>

## PswapDistribution pallet

### _State Queries_

#### **api.query.pswapDistribution.palletVersion**

> Returns the current pallet version from storage

arguments: -

returns: `u16`

<hr>

#### **api.query.pswapDistribution.subscribedAccounts**

> Store for information about accounts containing fees, that participate in incentive distribution mechanism.
> Fees Account Id -> (DEX Id, Pool Marker Asset Id, Distribution Frequency, Block Offset) Frequency MUST be non-zero.

arguments:

- key: `AccountId32`

returns: `(u32,AccountId32,u32,u32)`

<hr>

#### **api.query.pswapDistribution.burnRate**

> Amount of incentive tokens to be burned on each distribution.

arguments: -

returns: `FixnumFixedPoint`

<hr>

#### **api.query.pswapDistribution.burnUpdateInfo**

> (Burn Rate Increase Delta, Burn Rate Max)

arguments: -

returns: `(FixnumFixedPoint,FixnumFixedPoint)`

<hr>

#### **api.query.pswapDistribution.shareholderAccounts**

> Information about owned portion of stored incentive tokens. Shareholder -> Owned Fraction

arguments:

- key: `AccountId32`

returns: `FixnumFixedPoint`

<hr>

#### **api.query.pswapDistribution.claimableShares**

> Sum of all shares of incentive token owners.

arguments: -

returns: `FixnumFixedPoint`

<hr>

#### **api.query.pswapDistribution.parliamentPswapFraction**

> Fraction of PSWAP that could be reminted for parliament.

arguments: -

returns: `FixnumFixedPoint`

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

#### **api.query.multisig.palletVersion**

> Returns the current pallet version from storage

arguments: -

returns: `u16`

<hr>

#### **api.query.multisig.multisigs**

> The set of open multisig operations.

arguments:

- key: `(AccountId32,[u8;32])`

returns: `PalletMultisigMultisig`

<hr>

#### **api.query.multisig.calls**

arguments:

- key: `[u8;32]`

returns: `(WrapperKeepOpaque<Call>,AccountId32,u128)`

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

- otherSignatories: `Vec<AccountId32>`
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
> - Storage: inserts one item, value size bounded by `MaxSignatories`, with a deposit
>   taken for its lifetime of `DepositBase + threshold * DepositFactor`.
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
- otherSignatories: `Vec<AccountId32>`
- maybeTimepoint: `Option<PalletMultisigTimepoint>`
- call: `WrapperKeepOpaque<Call>`
- storeCall: `bool`
- maxWeight: `u64`
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
> - Storage: inserts one item, value size bounded by `MaxSignatories`, with a deposit
>   taken for its lifetime of `DepositBase + threshold * DepositFactor`.
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
- otherSignatories: `Vec<AccountId32>`
- maybeTimepoint: `Option<PalletMultisigTimepoint>`
- callHash: `[u8;32]`
- maxWeight: `u64`
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
- otherSignatories: `Vec<AccountId32>`
- timepoint: `PalletMultisigTimepoint`
- callHash: `[u8;32]`
<hr>

## Scheduler pallet

### _State Queries_

#### **api.query.scheduler.palletVersion**

> Returns the current pallet version from storage

arguments: -

returns: `u16`

<hr>

#### **api.query.scheduler.agenda**

> Items to be executed, indexed by the block number that they should be executed on.

arguments:

- key: `u32`

returns: `Vec<Option<PalletSchedulerScheduledV3>>`

<hr>

#### **api.query.scheduler.lookup**

> Lookup from identity to the block number and index of the task.

arguments:

- key: `Bytes`

returns: `(u32,u32)`

<hr>

### _Extrinsics_

#### **api.tx.scheduler.schedule**

> Anonymously schedule a task.

arguments:

- when: `u32`
- maybePeriodic: `Option<(u32,u32)>`
- priority: `u8`
- call: `FrameSupportScheduleMaybeHashed`
<hr>

#### **api.tx.scheduler.cancel**

> Cancel an anonymously scheduled task.

arguments:

- when: `u32`
- index: `u32`
<hr>

#### **api.tx.scheduler.scheduleNamed**

> Schedule a named task.

arguments:

- id: `Bytes`
- when: `u32`
- maybePeriodic: `Option<(u32,u32)>`
- priority: `u8`
- call: `FrameSupportScheduleMaybeHashed`
<hr>

#### **api.tx.scheduler.cancelNamed**

> Cancel a named scheduled task.

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

- after: `u32`
- maybePeriodic: `Option<(u32,u32)>`
- priority: `u8`
- call: `FrameSupportScheduleMaybeHashed`
<hr>

#### **api.tx.scheduler.scheduleNamedAfter**

> Schedule a named task after a delay.
>
> # <weight>
>
> Same as [`schedule_named`](Self::schedule_named).
>
> # </weight>

arguments:

- id: `Bytes`
- after: `u32`
- maybePeriodic: `Option<(u32,u32)>`
- priority: `u8`
- call: `FrameSupportScheduleMaybeHashed`
<hr>

## IrohaMigration pallet

### _State Queries_

#### **api.query.irohaMigration.palletVersion**

> Returns the current pallet version from storage

arguments: -

returns: `u16`

<hr>

#### **api.query.irohaMigration.balances**

arguments:

- key: `Text`

returns: `u128`

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

returns: `AccountId32`

<hr>

#### **api.query.irohaMigration.migratedAccounts**

arguments:

- key: `Text`

returns: `AccountId32`

<hr>

#### **api.query.irohaMigration.pendingMultiSigAccounts**

arguments:

- key: `Text`

returns: `IrohaMigrationPendingMultisigAccount`

<hr>

#### **api.query.irohaMigration.pendingReferrals**

arguments:

- key: `Text`

returns: `Vec<AccountId32>`

<hr>

### _Extrinsics_

#### **api.tx.irohaMigration.migrate**

arguments:

- irohaAddress: `Text`
- irohaPublicKey: `Text`
- irohaSignature: `Text`
<hr>

### _Custom RPCs_

#### **api.rpc.irohaMigration.needsMigration**

> Check if the account needs migration

arguments:

- irohaAddress: `String`
- at: `BlockHash`

returns: `bool`

<hr>

## TechnicalMembership pallet

### _State Queries_

#### **api.query.technicalMembership.palletVersion**

> Returns the current pallet version from storage

arguments: -

returns: `u16`

<hr>

#### **api.query.technicalMembership.members**

> The current membership, stored as an ordered Vec.

arguments: -

returns: `Vec<AccountId32>`

<hr>

#### **api.query.technicalMembership.prime**

> The current prime member, if one exists.

arguments: -

returns: `AccountId32`

<hr>

### _Extrinsics_

#### **api.tx.technicalMembership.addMember**

> Add a member `who` to the set.
>
> May only be called from `T::AddOrigin`.

arguments:

- who: `AccountId32`
<hr>

#### **api.tx.technicalMembership.removeMember**

> Remove a member `who` from the set.
>
> May only be called from `T::RemoveOrigin`.

arguments:

- who: `AccountId32`
<hr>

#### **api.tx.technicalMembership.swapMember**

> Swap out one member `remove` for another `add`.
>
> May only be called from `T::SwapOrigin`.
>
> Prime membership is _not_ passed from `remove` to `add`, if extant.

arguments:

- remove: `AccountId32`
- add: `AccountId32`
<hr>

#### **api.tx.technicalMembership.resetMembers**

> Change the membership to a new set, disregarding the existing membership. Be nice and
> pass `members` pre-sorted.
>
> May only be called from `T::ResetOrigin`.

arguments:

- members: `Vec<AccountId32>`
<hr>

#### **api.tx.technicalMembership.changeKey**

> Swap out the sending member for some other key `new`.
>
> May only be called from `Signed` origin of a current member.
>
> Prime membership is passed from the origin account to `new`, if extant.

arguments:

- new: `AccountId32`
<hr>

#### **api.tx.technicalMembership.setPrime**

> Set the prime member. Must be a current member.
>
> May only be called from `T::PrimeOrigin`.

arguments:

- who: `AccountId32`
<hr>

#### **api.tx.technicalMembership.clearPrime**

> Remove the prime member if it exists.
>
> May only be called from `T::PrimeOrigin`.

arguments: -

<hr>

## ElectionsPhragmen pallet

### _State Queries_

#### **api.query.electionsPhragmen.palletVersion**

> Returns the current pallet version from storage

arguments: -

returns: `u16`

<hr>

#### **api.query.electionsPhragmen.members**

> The current elected members.
>
> Invariant: Always sorted based on account id.

arguments: -

returns: `Vec<PalletElectionsPhragmenSeatHolder>`

<hr>

#### **api.query.electionsPhragmen.runnersUp**

> The current reserved runners-up.
>
> Invariant: Always sorted based on rank (worse to best). Upon removal of a member, the
> last (i.e. _best_) runner-up will be replaced.

arguments: -

returns: `Vec<PalletElectionsPhragmenSeatHolder>`

<hr>

#### **api.query.electionsPhragmen.candidates**

> The present candidate list. A current member or runner-up can never enter this vector
> and is always implicitly assumed to be a candidate.
>
> Second element is the deposit.
>
> Invariant: Always sorted based on account id.

arguments: -

returns: `Vec<(AccountId32,u128)>`

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

- key: `AccountId32`

returns: `PalletElectionsPhragmenVoter`

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
> If `value` is more than `who`'s free balance, then the maximum of the two is used.
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

- votes: `Vec<AccountId32>`
- value: `Compact<u128>`
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

- candidateCount: `Compact<u32>`
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
>   Similar to [`remove_member`](Self::remove_member), if replacement runners exists, they
>   are immediately used. If the prime is renouncing, then no prime will exist until the
>   next round.
>
> The dispatch origin of this call must be signed, and have one of the above roles.
>
> # <weight>
>
> The type of renouncing must be provided as witness data.
>
> # </weight>

arguments:

- renouncing: `PalletElectionsPhragmenRenouncing`
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

- who: `AccountId32`
- hasReplacement: `bool`
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

- numVoters: `u32`
- numDefunct: `u32`
<hr>

## VestedRewards pallet

### _State Queries_

#### **api.query.vestedRewards.palletVersion**

> Returns the current pallet version from storage

arguments: -

returns: `u16`

<hr>

#### **api.query.vestedRewards.rewards**

> Reserved for future use
> Mapping between users and their owned rewards of different kinds, which are vested.

arguments:

- key: `AccountId32`

returns: `VestedRewardsRewardInfo`

<hr>

#### **api.query.vestedRewards.totalRewards**

> Reserved for future use
> Total amount of PSWAP pending rewards.

arguments: -

returns: `u128`

<hr>

#### **api.query.vestedRewards.marketMakersRegistry**

> Registry of market makers with large transaction volumes (>1 XOR per transaction).

arguments:

- key: `AccountId32`

returns: `VestedRewardsMarketMakerInfo`

<hr>

#### **api.query.vestedRewards.marketMakingPairs**

> Market making pairs storage.

arguments:

- key: `(CommonPrimitivesAssetId32,CommonPrimitivesAssetId32)`

returns: `Null`

<hr>

#### **api.query.vestedRewards.crowdloanRewards**

> Crowdloan vested rewards storage.

arguments:

- key: `AccountId32`

returns: `VestedRewardsCrowdloanReward`

<hr>

#### **api.query.vestedRewards.crowdloanClaimHistory**

> This storage keeps the last block number, when the user (the first) claimed a reward for
> asset (the second key). The block is rounded to days.

arguments:

- key: `(AccountId32,CommonPrimitivesAssetId32)`

returns: `u32`

<hr>

### _Extrinsics_

#### **api.tx.vestedRewards.claimRewards**

> Claim all available PSWAP rewards by account signing this transaction.

arguments: -

<hr>

#### **api.tx.vestedRewards.claimCrowdloanRewards**

arguments:

- assetId: `CommonPrimitivesAssetId32`
<hr>

#### **api.tx.vestedRewards.setAssetPair**

> Allow/disallow a market making pair.

arguments:

- fromAssetId: `CommonPrimitivesAssetId32`
- toAssetId: `CommonPrimitivesAssetId32`
- marketMakingRewardsAllowed: `bool`
<hr>

### _Custom RPCs_

#### **api.rpc.vestedRewards.crowdloanClaimable**

> Get available crowdloan reward for a user.

arguments:

- accountId: `AccountId`
- assetId: `AssetId`
- at: `BlockHash`

returns: `Option<BalanceInfo>`

<hr>

#### **api.rpc.vestedRewards.crowdloanLease**

> Get crowdloan rewards lease period info.

arguments:

- at: `BlockHash`

returns: `CrowdloanLease`

<hr>

## Identity pallet

### _State Queries_

#### **api.query.identity.palletVersion**

> Returns the current pallet version from storage

arguments: -

returns: `u16`

<hr>

#### **api.query.identity.identityOf**

> Information that is pertinent to identify the entity behind an account.
>
> TWOX-NOTE: OK ― `AccountId` is a secure hash.

arguments:

- key: `AccountId32`

returns: `PalletIdentityRegistration`

<hr>

#### **api.query.identity.superOf**

> The super-identity of an alternative "sub" identity together with its name, within that
> context. If the account is not some other account's sub-identity, then just `None`.

arguments:

- key: `AccountId32`

returns: `(AccountId32,Data)`

<hr>

#### **api.query.identity.subsOf**

> Alternative "sub" identities of this account.
>
> The first item is the deposit, the second is a vector of the accounts.
>
> TWOX-NOTE: OK ― `AccountId` is a secure hash.

arguments:

- key: `AccountId32`

returns: `(u128,Vec<AccountId32>)`

<hr>

#### **api.query.identity.registrars**

> The set of registrars. Not expected to get very big as can only be added through a
> special origin (likely a council motion).
>
> The index into this can be cast to `RegistrarIndex` to get a valid value.

arguments: -

returns: `Vec<Option<PalletIdentityRegistrarInfo>>`

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

- account: `AccountId32`
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
> - where `X` additional-field-count (deposit-bounded and code-bounded)
> - where `R` judgements-count (registrar-count-bounded)
> - One balance reserve operation.
> - One storage mutation (codec-read `O(X' + R)`, codec-write `O(X + R)`).
> - One event.
>
> # </weight>

arguments:

- info: `PalletIdentityIdentityInfo`
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
> - where `P` old-subs-count (hard- and deposit-bounded).
> - where `S` subs-count (hard- and deposit-bounded).
> - At most one balance operations.
> - DB:
> - `P + S` storage mutations (codec complexity `O(1)`)
> - One storage read (codec complexity `O(P)`).
> - One storage write (codec complexity `O(S)`).
> - One storage-exists (`IdentityOf::contains_key`).
>
> # </weight>

arguments:

- subs: `Vec<(AccountId32,Data)>`
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
> - where `R` registrar-count (governance-bounded).
> - where `S` subs-count (hard- and deposit-bounded).
> - where `X` additional-field-count (deposit-bounded and code-bounded).
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

- regIndex: `Compact<u32>`
- maxFee: `Compact<u128>`
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

- regIndex: `u32`
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

- index: `Compact<u32>`
- fee: `Compact<u128>`
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

- index: `Compact<u32>`
- new: `AccountId32`
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

- index: `Compact<u32>`
- fields: `PalletIdentityBitFlags`
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

- regIndex: `Compact<u32>`
- target: `AccountId32`
- judgement: `PalletIdentityJudgement`
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

- target: `AccountId32`
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

- sub: `AccountId32`
- data: `Data`
<hr>

#### **api.tx.identity.renameSub**

> Alter the associated name of the given sub-account.
>
> The dispatch origin for this call must be _Signed_ and the sender must have a registered
> sub identity of `sub`.

arguments:

- sub: `AccountId32`
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

- sub: `AccountId32`
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

#### **api.query.farming.palletVersion**

> Returns the current pallet version from storage

arguments: -

returns: `u16`

<hr>

#### **api.query.farming.pools**

> Pools whose farmers are refreshed at the specific block. Block => Pools

arguments:

- key: `u32`

returns: `Vec<AccountId32>`

<hr>

#### **api.query.farming.poolFarmers**

> Farmers of the pool. Pool => Farmers

arguments:

- key: `AccountId32`

returns: `Vec<FarmingPoolFarmer>`

<hr>

## XstPool pallet

### _State Queries_

#### **api.query.xstPool.palletVersion**

> Returns the current pallet version from storage

arguments: -

returns: `u16`

<hr>

#### **api.query.xstPool.permissionedTechAccount**

> Technical account used to store collateral tokens.

arguments: -

returns: `CommonPrimitivesTechAccountId`

<hr>

#### **api.query.xstPool.baseFee**

> Base fee in XOR which is deducted on all trades, currently it's burned: 0.3%.

arguments: -

returns: `FixnumFixedPoint`

<hr>

#### **api.query.xstPool.enabledSynthetics**

> XST Assets allowed to be traded using XST.

arguments: -

returns: `BTreeSet<CommonPrimitivesAssetId32>`

<hr>

#### **api.query.xstPool.referenceAssetId**

> Asset that is used to compare collateral assets by value, e.g., DAI.

arguments: -

returns: `CommonPrimitivesAssetId32`

<hr>

#### **api.query.xstPool.collateralReserves**

> Current reserves balance for collateral tokens, used for client usability.

arguments:

- key: `CommonPrimitivesAssetId32`

returns: `u128`

<hr>

### _Extrinsics_

#### **api.tx.xstPool.initializePool**

> Enable exchange path on the pool for pair BaseAsset-SyntheticAsset.

arguments:

- syntheticAssetId: `CommonPrimitivesAssetId32`
<hr>

#### **api.tx.xstPool.setReferenceAsset**

> Change reference asset which is used to determine collateral assets value. Intended to be e.g., stablecoin DAI.

arguments:

- referenceAssetId: `CommonPrimitivesAssetId32`
<hr>

#### **api.tx.xstPool.enableSyntheticAsset**

arguments:

- syntheticAsset: `CommonPrimitivesAssetId32`
<hr>

## PriceTools pallet

### _State Queries_

#### **api.query.priceTools.palletVersion**

> Returns the current pallet version from storage

arguments: -

returns: `u16`

<hr>

#### **api.query.priceTools.priceInfos**

arguments:

- key: `CommonPrimitivesAssetId32`

returns: `PriceToolsPriceInfo`

<hr>

## CeresStaking pallet

### _State Queries_

#### **api.query.ceresStaking.palletVersion**

> Returns the current pallet version from storage

arguments: -

returns: `u16`

<hr>

#### **api.query.ceresStaking.authorityAccount**

> Account which has permissions for changing remaining rewards

arguments: -

returns: `AccountId32`

<hr>

#### **api.query.ceresStaking.stakers**

> AccountId -> StakingInfo

arguments:

- key: `AccountId32`

returns: `CeresStakingStakingInfo`

<hr>

#### **api.query.ceresStaking.totalDeposited**

arguments: -

returns: `u128`

<hr>

#### **api.query.ceresStaking.rewardsRemaining**

arguments: -

returns: `u128`

<hr>

### _Extrinsics_

#### **api.tx.ceresStaking.deposit**

arguments:

- amount: `u128`
<hr>

#### **api.tx.ceresStaking.withdraw**

arguments: -

<hr>

#### **api.tx.ceresStaking.changeRewardsRemaining**

> Change RewardsRemaining

arguments:

- rewardsRemaining: `u128`
<hr>

## CeresLiquidityLocker pallet

### _State Queries_

#### **api.query.ceresLiquidityLocker.palletVersion**

> Returns the current pallet version from storage

arguments: -

returns: `u16`

<hr>

#### **api.query.ceresLiquidityLocker.feesOptionOneAccount**

> Account for collecting fees from Option 1

arguments: -

returns: `AccountId32`

<hr>

#### **api.query.ceresLiquidityLocker.feesOptionTwoAccount**

> Account for collecting fees from Option 2

arguments: -

returns: `AccountId32`

<hr>

#### **api.query.ceresLiquidityLocker.feesOptionTwoCeresAmount**

> Amount of CERES for locker fees option two

arguments: -

returns: `u128`

<hr>

#### **api.query.ceresLiquidityLocker.authorityAccount**

> Account which has permissions for changing CERES amount fee

arguments: -

returns: `AccountId32`

<hr>

#### **api.query.ceresLiquidityLocker.lockerData**

arguments:

- key: `AccountId32`

returns: `Vec<CeresLiquidityLockerLockInfo>`

<hr>

### _Extrinsics_

#### **api.tx.ceresLiquidityLocker.lockLiquidity**

> Lock liquidity

arguments:

- assetA: `CommonPrimitivesAssetId32`
- assetB: `CommonPrimitivesAssetId32`
- unlockingBlock: `u32`
- percentageOfPoolTokens: `u128`
- option: `bool`
<hr>

#### **api.tx.ceresLiquidityLocker.changeCeresFee**

> Change CERES fee

arguments:

- ceresFee: `u128`
<hr>

## CeresTokenLocker pallet

### _State Queries_

#### **api.query.ceresTokenLocker.palletVersion**

> Returns the current pallet version from storage

arguments: -

returns: `u16`

<hr>

#### **api.query.ceresTokenLocker.feesAccount**

> Account for collecting fees

arguments: -

returns: `AccountId32`

<hr>

#### **api.query.ceresTokenLocker.authorityAccount**

> Account which has permissions for changing fee

arguments: -

returns: `AccountId32`

<hr>

#### **api.query.ceresTokenLocker.feeAmount**

> Amount of CERES for locker fees option two

arguments: -

returns: `u128`

<hr>

#### **api.query.ceresTokenLocker.tokenLockerData**

arguments:

- key: `AccountId32`

returns: `Vec<CeresTokenLockerTokenLockInfo>`

<hr>

### _Extrinsics_

#### **api.tx.ceresTokenLocker.lockTokens**

> Lock tokens

arguments:

- assetId: `CommonPrimitivesAssetId32`
- unlockingBlock: `u32`
- numberOfTokens: `u128`
<hr>

#### **api.tx.ceresTokenLocker.withdrawTokens**

> Withdraw tokens

arguments:

- assetId: `CommonPrimitivesAssetId32`
- unlockingBlock: `u32`
- numberOfTokens: `u128`
<hr>

#### **api.tx.ceresTokenLocker.changeFee**

> Change fee

arguments:

- newFee: `u128`
<hr>

## CeresGovernancePlatform pallet

### _State Queries_

#### **api.query.ceresGovernancePlatform.palletVersion**

> Returns the current pallet version from storage

arguments: -

returns: `u16`

<hr>

#### **api.query.ceresGovernancePlatform.voting**

> A vote of a particular user for a particular poll

arguments:

- key: `(Bytes,AccountId32)`

returns: `CeresGovernancePlatformVotingInfo`

<hr>

#### **api.query.ceresGovernancePlatform.pollData**

arguments:

- key: `Bytes`

returns: `CeresGovernancePlatformPollInfo`

<hr>

### _Extrinsics_

#### **api.tx.ceresGovernancePlatform.vote**

> Voting for option

arguments:

- pollId: `Bytes`
- votingOption: `u32`
- numberOfVotes: `u128`
<hr>

#### **api.tx.ceresGovernancePlatform.createPoll**

> Create poll

arguments:

- pollId: `Bytes`
- numberOfOptions: `u32`
- pollStartBlock: `u32`
- pollEndBlock: `u32`
<hr>

#### **api.tx.ceresGovernancePlatform.withdraw**

> Withdraw voting funds

arguments:

- pollId: `Bytes`
<hr>

## CeresLaunchpad pallet

### _State Queries_

#### **api.query.ceresLaunchpad.palletVersion**

> Returns the current pallet version from storage

arguments: -

returns: `u16`

<hr>

#### **api.query.ceresLaunchpad.penaltiesAccount**

> Account for collecting penalties

arguments: -

returns: `AccountId32`

<hr>

#### **api.query.ceresLaunchpad.ceresBurnFeeAmount**

> Amount of CERES for burn fee

arguments: -

returns: `u128`

<hr>

#### **api.query.ceresLaunchpad.ceresForContributionInILO**

> Amount of CERES for contribution in ILO

arguments: -

returns: `u128`

<hr>

#### **api.query.ceresLaunchpad.authorityAccount**

> Account which has permissions for changing CERES burn amount fee

arguments: -

returns: `AccountId32`

<hr>

#### **api.query.ceresLaunchpad.ilOs**

arguments:

- key: `CommonPrimitivesAssetId32`

returns: `CeresLaunchpadIloInfo`

<hr>

#### **api.query.ceresLaunchpad.contributions**

arguments:

- key: `(CommonPrimitivesAssetId32,AccountId32)`

returns: `CeresLaunchpadContributionInfo`

<hr>

#### **api.query.ceresLaunchpad.whitelistedContributors**

arguments: -

returns: `Vec<AccountId32>`

<hr>

#### **api.query.ceresLaunchpad.whitelistedIloOrganizers**

arguments: -

returns: `Vec<AccountId32>`

<hr>

### _Extrinsics_

#### **api.tx.ceresLaunchpad.createIlo**

> Create ILO

arguments:

- assetId: `CommonPrimitivesAssetId32`
- tokensForIlo: `u128`
- tokensForLiquidity: `u128`
- iloPrice: `u128`
- softCap: `u128`
- hardCap: `u128`
- minContribution: `u128`
- maxContribution: `u128`
- refundType: `bool`
- liquidityPercent: `u128`
- listingPrice: `u128`
- lockupDays: `u32`
- startBlock: `u32`
- endBlock: `u32`
- teamVestingTotalTokens: `u128`
- teamVestingFirstReleasePercent: `u128`
- teamVestingPeriod: `u32`
- teamVestingPercent: `u128`
- firstReleasePercent: `u128`
- vestingPeriod: `u32`
- vestingPercent: `u128`
<hr>

#### **api.tx.ceresLaunchpad.contribute**

> Contribute

arguments:

- assetId: `CommonPrimitivesAssetId32`
- fundsToContribute: `u128`
<hr>

#### **api.tx.ceresLaunchpad.emergencyWithdraw**

> Emergency withdraw

arguments:

- assetId: `CommonPrimitivesAssetId32`
<hr>

#### **api.tx.ceresLaunchpad.finishIlo**

> Finish ILO

arguments:

- assetId: `CommonPrimitivesAssetId32`
<hr>

#### **api.tx.ceresLaunchpad.claimLpTokens**

> Claim LP tokens

arguments:

- assetId: `CommonPrimitivesAssetId32`
<hr>

#### **api.tx.ceresLaunchpad.claim**

> Claim tokens

arguments:

- assetId: `CommonPrimitivesAssetId32`
<hr>

#### **api.tx.ceresLaunchpad.changeCeresBurnFee**

> Change CERES burn fee

arguments:

- ceresFee: `u128`
<hr>

#### **api.tx.ceresLaunchpad.changeCeresContributionFee**

> Change CERES contribution fee

arguments:

- ceresFee: `u128`
<hr>

#### **api.tx.ceresLaunchpad.claimPswapRewards**

> Claim PSWAP rewards

arguments: -

<hr>

#### **api.tx.ceresLaunchpad.addWhitelistedContributor**

> Add whitelisted contributor

arguments:

- contributor: `AccountId32`
<hr>

#### **api.tx.ceresLaunchpad.removeWhitelistedContributor**

> Remove whitelisted contributor

arguments:

- contributor: `AccountId32`
<hr>

#### **api.tx.ceresLaunchpad.addWhitelistedIloOrganizer**

> Add whitelisted ILO organizer

arguments:

- iloOrganizer: `AccountId32`
<hr>

#### **api.tx.ceresLaunchpad.removeWhitelistedIloOrganizer**

> Remove whitelisted ILO organizer

arguments:

- iloOrganizer: `AccountId32`
<hr>

## DemeterFarmingPlatform pallet

### _State Queries_

#### **api.query.demeterFarmingPlatform.palletVersion**

> Returns the current pallet version from storage

arguments: -

returns: `u16`

<hr>

#### **api.query.demeterFarmingPlatform.tokenInfos**

arguments:

- key: `CommonPrimitivesAssetId32`

returns: `DemeterFarmingPlatformTokenInfo`

<hr>

#### **api.query.demeterFarmingPlatform.userInfos**

arguments:

- key: `AccountId32`

returns: `Vec<DemeterFarmingPlatformUserInfo>`

<hr>

#### **api.query.demeterFarmingPlatform.pools**

arguments:

- key: `(CommonPrimitivesAssetId32,CommonPrimitivesAssetId32)`

returns: `Vec<DemeterFarmingPlatformPoolData>`

<hr>

#### **api.query.demeterFarmingPlatform.authorityAccount**

arguments: -

returns: `AccountId32`

<hr>

#### **api.query.demeterFarmingPlatform.feeAccount**

> Account for fees

arguments: -

returns: `AccountId32`

<hr>

### _Extrinsics_

#### **api.tx.demeterFarmingPlatform.registerToken**

> Register token for farming

arguments:

- poolAsset: `CommonPrimitivesAssetId32`
- tokenPerBlock: `u128`
- farmsAllocation: `u128`
- stakingAllocation: `u128`
- teamAllocation: `u128`
- teamAccount: `AccountId32`
<hr>

#### **api.tx.demeterFarmingPlatform.addPool**

> Add pool

arguments:

- poolAsset: `CommonPrimitivesAssetId32`
- rewardAsset: `CommonPrimitivesAssetId32`
- isFarm: `bool`
- multiplier: `u32`
- depositFee: `u128`
- isCore: `bool`
<hr>

#### **api.tx.demeterFarmingPlatform.deposit**

> Deposit to pool

arguments:

- poolAsset: `CommonPrimitivesAssetId32`
- rewardAsset: `CommonPrimitivesAssetId32`
- isFarm: `bool`
- pooledTokens: `u128`
<hr>

#### **api.tx.demeterFarmingPlatform.getRewards**

> Get rewards

arguments:

- poolAsset: `CommonPrimitivesAssetId32`
- rewardAsset: `CommonPrimitivesAssetId32`
- isFarm: `bool`
<hr>

#### **api.tx.demeterFarmingPlatform.withdraw**

> Withdraw

arguments:

- poolAsset: `CommonPrimitivesAssetId32`
- rewardAsset: `CommonPrimitivesAssetId32`
- pooledTokens: `u128`
- isFarm: `bool`
<hr>

#### **api.tx.demeterFarmingPlatform.removePool**

> Remove pool

arguments:

- poolAsset: `CommonPrimitivesAssetId32`
- rewardAsset: `CommonPrimitivesAssetId32`
- isFarm: `bool`
<hr>

#### **api.tx.demeterFarmingPlatform.changePoolMultiplier**

> Change pool multiplier

arguments:

- poolAsset: `CommonPrimitivesAssetId32`
- rewardAsset: `CommonPrimitivesAssetId32`
- isFarm: `bool`
- newMultiplier: `u32`
<hr>

#### **api.tx.demeterFarmingPlatform.changeTotalTokens**

> Change total tokens

arguments:

- poolAsset: `CommonPrimitivesAssetId32`
- rewardAsset: `CommonPrimitivesAssetId32`
- isFarm: `bool`
- totalTokens: `u128`
<hr>

#### **api.tx.demeterFarmingPlatform.changeInfo**

> Change info

arguments:

- changedUser: `AccountId32`
- poolAsset: `CommonPrimitivesAssetId32`
- rewardAsset: `CommonPrimitivesAssetId32`
- isFarm: `bool`
- poolTokens: `u128`
<hr>

#### **api.tx.demeterFarmingPlatform.changePoolDepositFee**

> Change pool deposit fee

arguments:

- poolAsset: `CommonPrimitivesAssetId32`
- rewardAsset: `CommonPrimitivesAssetId32`
- isFarm: `bool`
- depositFee: `u128`
<hr>

#### **api.tx.demeterFarmingPlatform.changeTokenInfo**

> Change token info

arguments:

- poolAsset: `CommonPrimitivesAssetId32`
- tokenPerBlock: `u128`
- farmsAllocation: `u128`
- stakingAllocation: `u128`
- teamAllocation: `u128`
- teamAccount: `AccountId32`
<hr>

## BagsList pallet

### _State Queries_

#### **api.query.bagsList.palletVersion**

> Returns the current pallet version from storage

arguments: -

returns: `u16`

<hr>

#### **api.query.bagsList.listNodes**

> A single node, within some bag.
>
> Nodes store links forward and back within their respective bags.

arguments:

- key: `AccountId32`

returns: `PalletBagsListListNode`

<hr>

#### **api.query.bagsList.counterForListNodes**

> Counter for the related counted storage map

arguments: -

returns: `u32`

<hr>

#### **api.query.bagsList.listBags**

> A bag stored in storage.
>
> Stores a `Bag` struct, which stores head and tail pointers to itself.

arguments:

- key: `u64`

returns: `PalletBagsListListBag`

<hr>

### _Extrinsics_

#### **api.tx.bagsList.rebag**

> Declare that some `dislocated` account has, through rewards or penalties, sufficiently
> changed its score that it should properly fall into a different bag than its current
> one.
>
> Anyone can call this function about any potentially dislocated account.
>
> Will never return an error; if `dislocated` does not exist or doesn't need a rebag, then
> it is a noop and fees are still collected from `origin`.

arguments:

- dislocated: `AccountId32`
<hr>

#### **api.tx.bagsList.putInFrontOf**

> Move the caller's Id directly in front of `lighter`.
>
> The dispatch origin for this call must be _Signed_ and can only be called by the Id of
> the account going in front of `lighter`.
>
> Only works if
>
> - both nodes are within the same bag,
> - and `origin` has a greater `Score` than `lighter`.

arguments:

- lighter: `AccountId32`
<hr>

## ElectionProviderMultiPhase pallet

### _State Queries_

#### **api.query.electionProviderMultiPhase.palletVersion**

> Returns the current pallet version from storage

arguments: -

returns: `u16`

<hr>

#### **api.query.electionProviderMultiPhase.round**

> Internal counter for the number of rounds.
>
> This is useful for de-duplication of transactions submitted to the pool, and general
> diagnostics of the pallet.
>
> This is merely incremented once per every time that an upstream `elect` is called.

arguments: -

returns: `u32`

<hr>

#### **api.query.electionProviderMultiPhase.currentPhase**

> Current phase.

arguments: -

returns: `PalletElectionProviderMultiPhasePhase`

<hr>

#### **api.query.electionProviderMultiPhase.queuedSolution**

> Current best solution, signed or unsigned, queued to be returned upon `elect`.

arguments: -

returns: `PalletElectionProviderMultiPhaseReadySolution`

<hr>

#### **api.query.electionProviderMultiPhase.snapshot**

> Snapshot data of the round.
>
> This is created at the beginning of the signed phase and cleared upon calling `elect`.

arguments: -

returns: `PalletElectionProviderMultiPhaseRoundSnapshot`

<hr>

#### **api.query.electionProviderMultiPhase.desiredTargets**

> Desired number of targets to elect for this round.
>
> Only exists when [`Snapshot`] is present.

arguments: -

returns: `u32`

<hr>

#### **api.query.electionProviderMultiPhase.snapshotMetadata**

> The metadata of the [`RoundSnapshot`]
>
> Only exists when [`Snapshot`] is present.

arguments: -

returns: `PalletElectionProviderMultiPhaseSolutionOrSnapshotSize`

<hr>

#### **api.query.electionProviderMultiPhase.signedSubmissionNextIndex**

> The next index to be assigned to an incoming signed submission.
>
> Every accepted submission is assigned a unique index; that index is bound to that particular
> submission for the duration of the election. On election finalization, the next index is
> reset to 0.
>
> We can't just use `SignedSubmissionIndices.len()`, because that's a bounded set; past its
> capacity, it will simply saturate. We can't just iterate over `SignedSubmissionsMap`,
> because iteration is slow. Instead, we store the value here.

arguments: -

returns: `u32`

<hr>

#### **api.query.electionProviderMultiPhase.signedSubmissionIndices**

> A sorted, bounded set of `(score, index)`, where each `index` points to a value in
> `SignedSubmissions`.
>
> We never need to process more than a single signed submission at a time. Signed submissions
> can be quite large, so we're willing to pay the cost of multiple database accesses to access
> them one at a time instead of reading and decoding all of them at once.

arguments: -

returns: `BTreeMap<SpNposElectionsElectionScore, u32>`

<hr>

#### **api.query.electionProviderMultiPhase.signedSubmissionsMap**

> Unchecked, signed solutions.
>
> Together with `SubmissionIndices`, this stores a bounded set of `SignedSubmissions` while
> allowing us to keep only a single one in memory at a time.
>
> Twox note: the key of the map is an auto-incrementing index which users cannot inspect or
> affect; we shouldn't need a cryptographically secure hasher.

arguments:

- key: `u32`

returns: `PalletElectionProviderMultiPhaseSignedSignedSubmission`

<hr>

#### **api.query.electionProviderMultiPhase.minimumUntrustedScore**

> The minimum score that each 'untrusted' solution must attain in order to be considered
> feasible.
>
> Can be set via `set_minimum_untrusted_score`.

arguments: -

returns: `SpNposElectionsElectionScore`

<hr>

### _Extrinsics_

#### **api.tx.electionProviderMultiPhase.submitUnsigned**

> Submit a solution for the unsigned phase.
>
> The dispatch origin fo this call must be **none**.
>
> This submission is checked on the fly. Moreover, this unsigned solution is only
> validated when submitted to the pool from the **local** node. Effectively, this means
> that only active validators can submit this transaction when authoring a block (similar
> to an inherent).
>
> To prevent any incorrect solution (and thus wasted time/weight), this transaction will
> panic if the solution submitted by the validator is invalid in any way, effectively
> putting their authoring reward at risk.
>
> No deposit or reward is associated with this submission.

arguments:

- rawSolution: `PalletElectionProviderMultiPhaseRawSolution`
- witness: `PalletElectionProviderMultiPhaseSolutionOrSnapshotSize`
<hr>

#### **api.tx.electionProviderMultiPhase.setMinimumUntrustedScore**

> Set a new value for `MinimumUntrustedScore`.
>
> Dispatch origin must be aligned with `T::ForceOrigin`.
>
> This check can be turned off by setting the value to `None`.

arguments:

- maybeNextScore: `Option<SpNposElectionsElectionScore>`
<hr>

#### **api.tx.electionProviderMultiPhase.setEmergencyElectionResult**

> Set a solution in the queue, to be handed out to the client of this pallet in the next
> call to `ElectionProvider::elect`.
>
> This can only be set by `T::ForceOrigin`, and only when the phase is `Emergency`.
>
> The solution is not checked for any feasibility and is assumed to be trustworthy, as any
> feasibility check itself can in principle cause the election process to fail (due to
> memory/weight constrains).

arguments:

- supports: `Vec<(AccountId32,SpNposElectionsSupport)>`
<hr>

#### **api.tx.electionProviderMultiPhase.submit**

> Submit a solution for the signed phase.
>
> The dispatch origin fo this call must be **signed**.
>
> The solution is potentially queued, based on the claimed score and processed at the end
> of the signed phase.
>
> A deposit is reserved and recorded for the solution. Based on the outcome, the solution
> might be rewarded, slashed, or get all or a part of the deposit back.

arguments:

- rawSolution: `PalletElectionProviderMultiPhaseRawSolution`
<hr>

#### **api.tx.electionProviderMultiPhase.governanceFallback**

> Trigger the governance fallback.
>
> This can only be called when [`Phase::Emergency`] is enabled, as an alternative to
> calling [`Call::set_emergency_election_result`].

arguments:

- maybeMaxVoters: `Option<u32>`
- maybeMaxTargets: `Option<u32>`
<hr>

## Mmr pallet

### _State Queries_

#### **api.query.mmr.palletVersion**

> Returns the current pallet version from storage

arguments: -

returns: `u16`

<hr>

#### **api.query.mmr.rootHash**

> Latest MMR Root hash.

arguments: -

returns: `H256`

<hr>

#### **api.query.mmr.numberOfLeaves**

> Current size of the MMR (number of leaves).

arguments: -

returns: `u64`

<hr>

#### **api.query.mmr.nodes**

> Hashes of the nodes in the MMR.
>
> Note this collection only contains MMR peaks, the inner nodes (and leaves)
> are pruned and only stored in the Offchain DB.

arguments:

- key: `u64`

returns: `H256`

<hr>

### _Custom RPCs_

#### **api.rpc.mmr.generateBatchProof**

> Generate MMR proof for the given leaf indices.

arguments:

- leafIndices: `Vec<u64>`
- at: `BlockHash`

returns: `MmrLeafProof`

<hr>

#### **api.rpc.mmr.generateProof**

> Generate MMR proof for given leaf index.

arguments:

- leafIndex: `u64`
- at: `BlockHash`

returns: `MmrLeafBatchProof`

<hr>

## Beefy pallet

### _State Queries_

#### **api.query.beefy.palletVersion**

> Returns the current pallet version from storage

arguments: -

returns: `u16`

<hr>

#### **api.query.beefy.authorities**

> The current authorities set

arguments: -

returns: `Vec<BeefyPrimitivesCryptoPublic>`

<hr>

#### **api.query.beefy.validatorSetId**

> The current validator set id

arguments: -

returns: `u64`

<hr>

#### **api.query.beefy.nextAuthorities**

> Authorities set scheduled to be used with the next session

arguments: -

returns: `Vec<BeefyPrimitivesCryptoPublic>`

<hr>

### _Custom RPCs_

#### **api.rpc.beefy.subscribeJustifications**

> Returns the block most recently finalized by BEEFY, alongside side its justification.

arguments: -

returns: `BeefySignedCommitment`

<hr>

#### **api.rpc.beefy.getFinalizedHead**

> Returns hash of the latest BEEFY finalized block as seen by this client.

arguments: -

returns: `H256`

<hr>

## MmrLeaf pallet

### _State Queries_

#### **api.query.mmrLeaf.palletVersion**

> Returns the current pallet version from storage

arguments: -

returns: `u16`

<hr>

#### **api.query.mmrLeaf.beefyNextAuthorities**

> Details of next BEEFY authority set.
>
> This storage entry is used as cache for calls to `update_beefy_next_authority_set`.

arguments: -

returns: `BeefyPrimitivesMmrBeefyNextAuthoritySet`

<hr>

## EthereumLightClient pallet

### _State Queries_

#### **api.query.ethereumLightClient.palletVersion**

> Returns the current pallet version from storage

arguments: -

returns: `u16`

<hr>

#### **api.query.ethereumLightClient.bestBlock**

> Best known block.

arguments:

- key: `U256`

returns: `(BridgeTypesHeaderHeaderId,U256)`

<hr>

#### **api.query.ethereumLightClient.blocksToPrune**

> Range of blocks that we want to prune.

arguments:

- key: `U256`

returns: `EthereumLightClientPruningRange`

<hr>

#### **api.query.ethereumLightClient.finalizedBlock**

> Best finalized block.

arguments:

- key: `U256`

returns: `BridgeTypesHeaderHeaderId`

<hr>

#### **api.query.ethereumLightClient.networkConfig**

> Network config

arguments:

- key: `U256`

returns: `BridgeTypesNetworkParamsNetworkConfig`

<hr>

#### **api.query.ethereumLightClient.headers**

> Map of imported headers by hash.

arguments:

- key: `(U256,H256)`

returns: `EthereumLightClientStoredHeader`

<hr>

#### **api.query.ethereumLightClient.headersByNumber**

> Map of imported header hashes by number.

arguments:

- key: `(U256,u64)`

returns: `Vec<H256>`

<hr>

### _Extrinsics_

#### **api.tx.ethereumLightClient.registerNetwork**

arguments:

- networkConfig: `BridgeTypesNetworkParamsNetworkConfig`
- header: `BridgeTypesHeader`
- initialDifficulty: `U256`
<hr>

#### **api.tx.ethereumLightClient.updateDifficultyConfig**

arguments:

- networkConfig: `BridgeTypesNetworkParamsNetworkConfig`
<hr>

#### **api.tx.ethereumLightClient.importHeader**

> Import a single Ethereum PoW header.
>
> Note that this extrinsic has a very high weight. The weight is affected by the
> value of `DescendantsUntilFinalized`. Regenerate weights if it changes.
>
> The largest contributors to the worst case weight, in decreasing order, are:
>
> - Pruning: max 2 writes per pruned header + 2 writes to finalize pruning state.
>   Up to `HEADERS_TO_PRUNE_IN_SINGLE_IMPORT` can be pruned in one call.
> - Ethash validation: this cost is pure CPU. EthashProver checks a merkle proof
>   for each DAG node selected in the "hashimoto"-loop.
> - Iterating over ancestors: min `DescendantsUntilFinalized` reads to find the
>   newly finalized ancestor of a header.

arguments:

- networkId: `U256`
- header: `BridgeTypesHeader`
- proof: `Vec<BridgeTypesEthashproofDoubleNodeWithMerkleProof>`
<hr>

## BasicInboundChannel pallet

### _State Queries_

#### **api.query.basicInboundChannel.palletVersion**

> Returns the current pallet version from storage

arguments: -

returns: `u16`

<hr>

#### **api.query.basicInboundChannel.channelNonces**

arguments:

- key: `U256`

returns: `u64`

<hr>

#### **api.query.basicInboundChannel.channelAddresses**

arguments:

- key: `U256`

returns: `H160`

<hr>

### _Extrinsics_

#### **api.tx.basicInboundChannel.submit**

arguments:

- networkId: `U256`
- message: `BridgeTypesMessage`
<hr>

#### **api.tx.basicInboundChannel.registerChannel**

arguments:

- networkId: `U256`
- channel: `H160`
<hr>

## BasicOutboundChannel pallet

### _State Queries_

#### **api.query.basicOutboundChannel.palletVersion**

> Returns the current pallet version from storage

arguments: -

returns: `u16`

<hr>

#### **api.query.basicOutboundChannel.interval**

> Interval between commitments

arguments: -

returns: `u32`

<hr>

#### **api.query.basicOutboundChannel.messageQueue**

> Messages waiting to be committed.

arguments:

- key: `U256`

returns: `Vec<BasicChannelOutboundMessage>`

<hr>

#### **api.query.basicOutboundChannel.channelNonces**

arguments:

- key: `U256`

returns: `u64`

<hr>

#### **api.query.basicOutboundChannel.channelOperators**

arguments:

- key: `(U256,AccountId32)`

returns: `bool`

<hr>

## IncentivizedInboundChannel pallet

### _State Queries_

#### **api.query.incentivizedInboundChannel.palletVersion**

> Returns the current pallet version from storage

arguments: -

returns: `u16`

<hr>

#### **api.query.incentivizedInboundChannel.channelAddresses**

> Source channel on the ethereum side

arguments:

- key: `U256`

returns: `H160`

<hr>

#### **api.query.incentivizedInboundChannel.channelNonces**

arguments:

- key: `U256`

returns: `u64`

<hr>

#### **api.query.incentivizedInboundChannel.rewardFraction**

arguments: -

returns: `Perbill`

<hr>

### _Extrinsics_

#### **api.tx.incentivizedInboundChannel.submit**

arguments:

- networkId: `U256`
- message: `BridgeTypesMessage`
<hr>

#### **api.tx.incentivizedInboundChannel.registerChannel**

arguments:

- networkId: `U256`
- channel: `H160`
<hr>

#### **api.tx.incentivizedInboundChannel.setRewardFraction**

arguments:

- fraction: `Perbill`
<hr>

## IncentivizedOutboundChannel pallet

### _State Queries_

#### **api.query.incentivizedOutboundChannel.palletVersion**

> Returns the current pallet version from storage

arguments: -

returns: `u16`

<hr>

#### **api.query.incentivizedOutboundChannel.interval**

> Interval between committing messages.

arguments: -

returns: `u32`

<hr>

#### **api.query.incentivizedOutboundChannel.messageQueues**

> Messages waiting to be committed.

arguments:

- key: `U256`

returns: `Vec<IncentivizedChannelOutboundMessage>`

<hr>

#### **api.query.incentivizedOutboundChannel.channelNonces**

arguments:

- key: `U256`

returns: `u64`

<hr>

#### **api.query.incentivizedOutboundChannel.fee**

arguments: -

returns: `u128`

<hr>

## Dispatch pallet

### _State Queries_

#### **api.query.dispatch.palletVersion**

> Returns the current pallet version from storage

arguments: -

returns: `u16`

<hr>

## LeafProvider pallet

### _State Queries_

#### **api.query.leafProvider.palletVersion**

> Returns the current pallet version from storage

arguments: -

returns: `u16`

<hr>

#### **api.query.leafProvider.latestDigest**

> Latest digest

arguments: -

returns: `BridgeTypesAuxiliaryDigest`

<hr>

### _Custom RPCs_

#### **api.rpc.leafProvider.latestDigest**

> Get leaf provider logs.

arguments:

- at: `BlockHash`

returns: `AuxiliaryDigest`

<hr>

## EthApp pallet

### _State Queries_

#### **api.query.ethApp.palletVersion**

> Returns the current pallet version from storage

arguments: -

returns: `u16`

<hr>

#### **api.query.ethApp.addresses**

arguments:

- key: `U256`

returns: `(H160,CommonPrimitivesAssetId32)`

<hr>

### _Extrinsics_

#### **api.tx.ethApp.burn**

arguments:

- networkId: `U256`
- channelId: `BridgeTypesChannelId`
- recipient: `H160`
- amount: `u128`
<hr>

#### **api.tx.ethApp.mint**

arguments:

- sender: `H160`
- recipient: `AccountId32`
- amount: `U256`
<hr>

#### **api.tx.ethApp.registerNetwork**

arguments:

- networkId: `U256`
- name: `Bytes`
- symbol: `Bytes`
- contract: `H160`
<hr>

#### **api.tx.ethApp.registerNetworkWithExistingAsset**

arguments:

- networkId: `U256`
- assetId: `CommonPrimitivesAssetId32`
- contract: `H160`
<hr>

## Erc20App pallet

### _State Queries_

#### **api.query.erc20App.palletVersion**

> Returns the current pallet version from storage

arguments: -

returns: `u16`

<hr>

#### **api.query.erc20App.appAddresses**

arguments:

- key: `(U256,BridgeTypesAssetKind)`

returns: `H160`

<hr>

#### **api.query.erc20App.assetKinds**

arguments:

- key: `(U256,CommonPrimitivesAssetId32)`

returns: `BridgeTypesAssetKind`

<hr>

#### **api.query.erc20App.tokenAddresses**

arguments:

- key: `(U256,CommonPrimitivesAssetId32)`

returns: `H160`

<hr>

#### **api.query.erc20App.assetsByAddresses**

arguments:

- key: `(U256,H160)`

returns: `CommonPrimitivesAssetId32`

<hr>

### _Extrinsics_

#### **api.tx.erc20App.mint**

arguments:

- token: `H160`
- sender: `H160`
- recipient: `AccountId32`
- amount: `U256`
<hr>

#### **api.tx.erc20App.registerAssetInternal**

arguments:

- assetId: `CommonPrimitivesAssetId32`
- contract: `H160`
<hr>

#### **api.tx.erc20App.burn**

arguments:

- networkId: `U256`
- channelId: `BridgeTypesChannelId`
- assetId: `CommonPrimitivesAssetId32`
- recipient: `H160`
- amount: `u128`
<hr>

#### **api.tx.erc20App.registerErc20Asset**

arguments:

- networkId: `U256`
- address: `H160`
- symbol: `Bytes`
- name: `Bytes`
<hr>

#### **api.tx.erc20App.registerExistingErc20Asset**

arguments:

- networkId: `U256`
- address: `H160`
- assetId: `CommonPrimitivesAssetId32`
<hr>

#### **api.tx.erc20App.registerNativeAsset**

arguments:

- networkId: `U256`
- assetId: `CommonPrimitivesAssetId32`
<hr>

#### **api.tx.erc20App.registerNativeApp**

arguments:

- networkId: `U256`
- contract: `H160`
<hr>

#### **api.tx.erc20App.registerErc20App**

arguments:

- networkId: `U256`
- contract: `H160`
<hr>

## MigrationApp pallet

### _State Queries_

#### **api.query.migrationApp.palletVersion**

> Returns the current pallet version from storage

arguments: -

returns: `u16`

<hr>

#### **api.query.migrationApp.addresses**

arguments:

- key: `U256`

returns: `H160`

<hr>

### _Extrinsics_

#### **api.tx.migrationApp.migrateErc20**

arguments:

- networkId: `U256`
- erc20Assets: `Vec<(CommonPrimitivesAssetId32,H160)>`
<hr>

#### **api.tx.migrationApp.migrateSidechain**

arguments:

- networkId: `U256`
- sidechainAssets: `Vec<(CommonPrimitivesAssetId32,H160)>`
<hr>

#### **api.tx.migrationApp.migrateEth**

arguments:

- networkId: `U256`
<hr>

#### **api.tx.migrationApp.registerNetwork**

arguments:

- networkId: `U256`
- contract: `H160`
<hr>

## Utility pallet

### _Extrinsics_

#### **api.tx.utility.batch**

> Send a batch of dispatch calls.
>
> May be called from any origin.
>
> - `calls`: The calls to be dispatched from the same origin. The number of call must not
>   exceed the constant: `batched_calls_limit` (available in constant metadata).
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
> - `calls`: The calls to be dispatched from the same origin. The number of call must not
>   exceed the constant: `batched_calls_limit` (available in constant metadata).
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

#### **api.tx.utility.dispatchAs**

> Dispatches a function call with a provided origin.
>
> The dispatch origin for this call must be _Root_.
>
> # <weight>
>
> - O(1).
> - Limited storage reads.
> - One DB write (event).
> - Weight of derivative `call` execution + T::WeightInfo::dispatch_as().
>
> # </weight>

arguments:

- asOrigin: `FramenodeRuntimeOriginCaller`
- call: `Call`
<hr>

#### **api.tx.utility.forceBatch**

> Send a batch of dispatch calls.
> Unlike `batch`, it allows errors and won't interrupt.
>
> May be called from any origin.
>
> - `calls`: The calls to be dispatched from the same origin. The number of call must not
>   exceed the constant: `batched_calls_limit` (available in constant metadata).
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

- dest: `AccountId32`
- currencyId: `CommonPrimitivesAssetId32`
- amount: `Compact<u128>`
<hr>

#### **api.tx.currencies.transferNativeCurrency**

> Transfer some native currency to another account.
>
> The dispatch origin for this call must be `Signed` by the
> transactor.

arguments:

- dest: `AccountId32`
- amount: `Compact<u128>`
<hr>

#### **api.tx.currencies.updateBalance**

> update amount of account `who` under `currency_id`.
>
> The dispatch origin of this call must be _Root_.

arguments:

- who: `AccountId32`
- currencyId: `CommonPrimitivesAssetId32`
- amount: `i128`
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

- dexId: `u32`
- inputAssetId: `CommonPrimitivesAssetId32`
- outputAssetId: `CommonPrimitivesAssetId32`
- swapAmount: `CommonSwapAmount`
- selectedSourceTypes: `Vec<CommonPrimitivesLiquiditySourceType>`
- filterMode: `CommonPrimitivesFilterMode`
<hr>

#### **api.tx.liquidityProxy.swapTransfer**

> Perform swap of tokens (input/output defined via SwapAmount direction).
>
> - `origin`: the account on whose behalf the transaction is being executed,
> - `receiver`: the account that receives the output,
> - `dex_id`: DEX ID for which liquidity sources aggregation is being done,
> - `input_asset_id`: ID of the asset being sold,
> - `output_asset_id`: ID of the asset being bought,
> - `swap_amount`: the exact amount to be sold (either in input_asset_id or output_asset_id units with corresponding slippage tolerance absolute bound),
> - `selected_source_types`: list of selected LiquiditySource types, selection effect is determined by filter_mode,
> - `filter_mode`: indicate either to allow or forbid selected types only, or disable filtering.

arguments:

- receiver: `AccountId32`
- dexId: `u32`
- inputAssetId: `CommonPrimitivesAssetId32`
- outputAssetId: `CommonPrimitivesAssetId32`
- swapAmount: `CommonSwapAmount`
- selectedSourceTypes: `Vec<CommonPrimitivesLiquiditySourceType>`
- filterMode: `CommonPrimitivesFilterMode`
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

## Faucet pallet

### _Extrinsics_

#### **api.tx.faucet.transfer**

> Transfers the specified amount of asset to the specified account.
> The supported assets are: XOR, VAL, PSWAP.
>
> # Errors
>
> AssetNotSupported is returned if `asset_id` is something the function doesn't support.
> AmountAboveLimit is returned if `target` has already received their daily limit of `asset_id`.
> NotEnoughReserves is returned if `amount` is greater than the reserves

arguments:

- assetId: `CommonPrimitivesAssetId32`
- target: `AccountId32`
- amount: `u128`
<hr>

#### **api.tx.faucet.resetRewards**

arguments: -

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

#### **api.rpc.childstate.getKeysPaged**

> Returns the keys with prefix from a child storage with pagination support

arguments:

- childKey: `PrefixedStorageKey`
- prefix: `StorageKey`
- count: `u32`
- startKey: `StorageKey`
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

#### **api.rpc.childstate.getStorageEntries**

> Returns child storage entries for multiple keys at a specific block state

arguments:

- childKey: `PrefixedStorageKey`
- keys: `Vec<StorageKey>`
- at: `Hash`

returns: `Vec<Option<StorageData>>`

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

## Rpc pallet

### _Custom RPCs_

#### **api.rpc.rpc.methods**

> Retrieves the list of RPC methods that are exposed by the node

arguments: -

returns: `RpcMethods`

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

#### **api.rpc.state.getChildReadProof**

> Returns proof of storage for child key entries at a specific block state.

arguments:

- childStorageKey: `PrefixedStorageKey`
- keys: `Vec<StorageKey>`
- at: `BlockHash`

returns: `ReadProof`

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

#### **api.rpc.state.traceBlock**

> Provides a way to trace the re-execution of a single block

arguments:

- block: `Hash`
- targets: `Option<Text>`
- storageKeys: `Option<Text>`
- methods: `Option<Text>`

returns: `TraceBlockResponse`

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

## BasicChannel pallet

### _Custom RPCs_

#### **api.rpc.basicChannel.commitment**

> Get basic channel messages.

arguments:

- commitmentHash: `H256`

returns: `Option<Vec<BasicChannelMessage>>`

<hr>

## IntentivizedChannel pallet

### _Custom RPCs_

#### **api.rpc.intentivizedChannel.commitment**

> Get intentivized channel messages.

arguments:

- commitmentHash: `H256`

returns: `Option<Vec<IntentivizedChannelMessage>>`

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
    assetId: "AssetId",
    symbol: "AssetSymbolStr",
    name: "AssetNameStr",
    precision: "u8",
    isMintable: "bool"
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

### AuxiliaryDigest

```
{
    logs: "Vec<AuxiliaryDigestItem>"
}
```

### AuxiliaryDigestItem

```
{
    _enum: {
        Commitment: "(EthNetworkId, ChannelId, H256)"
    }
}
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

### BasicChannelMessage

```
{
    networkId: "EthNetworkId",
    target: "H160",
    nonce: "u64",
    payload: "Vec<u8>"
}
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

### ChannelId

```
{
    _enum: {
        Basic: null,
        Incentivized: null
    }
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
    fundsContributed: "Balance",
    tokensBought: "Balance",
    tokensClaimed: "Balance",
    claimingFinished: "bool",
    numberOfClaims: "u32"
}
```

### ContributorsVesting

```
{
    firstReleasePercent: "Balance",
    vestingPeriod: "Moment",
    vestingPercent: "Balance"
}
```

### CrowdloanLease

```
{
    startBlock: "String",
    totalDays: "String",
    blocksPerDay: "String"
}
```

### CrowdloanReward

```
{
    id: "Vec<u8>",
    address: "Vec<u8>",
    contribution: "Fixed",
    xorReward: "Fixed",
    valReward: "Fixed",
    pswapReward: "Fixed",
    xstusdReward: "Fixed",
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
    baseAssetId: "AssetId",
    defaultFee: "BasisPoints",
    defaultProtocolFee: "BasisPoints"
}
```

### Description

```
"Text"
```

### DispatchErrorWithPostInfoTPostDispatchInfo

```
{
    postInfo: "PostDispatchInfo",
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

### EthNetworkId

```
"U256"
```

### EthPeersSync

```
{
    isBridgeReady: "bool",
    isXorReady: "bool",
    isValReady: "bool"
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
    iloOrganizer: "AccountId",
    tokensForIlo: "Balance",
    tokensForLiquidity: "Balance",
    iloPrice: "Balance",
    softCap: "Balance",
    hardCap: "Balance",
    minContribution: "Balance",
    maxContribution: "Balance",
    refundType: "bool",
    liquidityPercent: "Balance",
    listingPrice: "Balance",
    lockupDays: "u32",
    startTimestamp: "Moment",
    endTimestamp: "Moment",
    contributorsVesting: "ContributorsVesting",
    teamVesting: "TeamVesting",
    soldTokens: "Balance",
    fundsRaised: "Balance",
    succeeded: "bool",
    failed: "bool",
    lpTokens: "Balance",
    claimedLpTokens: "bool",
    finishTimestamp: "Moment"
}
```

### IncomingAddToken

```
{
    tokenAddress: "EthAddress",
    assetId: "AssetId",
    precision: "BalancePrecision",
    symbol: "AssetSymbol",
    name: "AssetName",
    author: "AccountId",
    txHash: "H256",
    atHeight: "u64",
    timepoint: "BridgeTimepoint",
    networkId: "BridgeNetworkId"
}
```

### IncomingCancelOutgoingRequest

```
{
    outgoingRequest: "OutgoingRequest",
    outgoingRequestHash: "H256",
    initialRequestHash: "H256",
    txInput: "Vec<u8>",
    author: "AccountId",
    txHash: "H256",
    atHeight: "u64",
    timepoint: "BridgeTimepoint",
    networkId: "BridgeNetworkId"
}
```

### IncomingChangePeers

```
{
    peerAccountId: "AccountId",
    peerAddress: "EthAddress",
    added: "bool",
    author: "AccountId",
    txHash: "H256",
    atHeight: "u64",
    timepoint: "BridgeTimepoint",
    networkId: "BridgeNetworkId"
}
```

### IncomingChangePeersCompat

```
{
    peerAccountId: "AccountId",
    peerAddress: "EthAddress",
    added: "bool",
    contract: "ChangePeersContract",
    author: "AccountId",
    txHash: "H256",
    atHeight: "u64",
    timepoint: "BridgeTimepoint",
    networkId: "BridgeNetworkId"
}
```

### IncomingMarkAsDoneRequest

```
{
    outgoingRequestHash: "H256",
    initialRequestHash: "H256",
    author: "AccountId",
    atHeight: "u64",
    timepoint: "BridgeTimepoint",
    networkId: "BridgeNetworkId"
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
    newContractAddress: "EthAddress",
    author: "AccountId",
    txHash: "H256",
    atHeight: "u64",
    timepoint: "BridgeTimepoint",
    networkId: "BridgeNetworkId"
}
```

### IncomingPrepareForMigration

```
{
    author: "AccountId",
    txHash: "H256",
    atHeight: "u64",
    timepoint: "BridgeTimepoint",
    networkId: "BridgeNetworkId"
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
    assetId: "AssetId",
    assetKind: "AssetKind",
    amount: "Balance",
    author: "AccountId",
    txHash: "H256",
    atHeight: "u64",
    timepoint: "BridgeTimepoint",
    networkId: "BridgeNetworkId"
}
```

### IntentivizedChannelMessage

```
{
    networkId: "EthNetworkId",
    target: "H160",
    nonce: "u64",
    fee: "U256",
    payload: "Vec<u8>"
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
    amountWithoutImpact: "Balance"
}
```

### LiquiditySourceIdOf

```
{
    dexId: "DEXId",
    liquiditySourceIndex: "LiquiditySourceType"
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
    networkId: "BridgeNetworkId"
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
    networkId: "BridgeNetworkId"
}
```

### LockInfo

```
{
    poolTokens: "Balance",
    unlockingTimestamp: "Moment",
    assetA: "AssetId",
    assetB: "AssetId"
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
    assetId: "AssetId",
    supply: "Balance",
    nonce: "Index",
    networkId: "BridgeNetworkId",
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
    sidechainAssetId: "FixedBytes",
    hash: "H256",
    networkId: "H256",
    raw: "Vec<u8>"
}
```

### OutgoingAddPeer

```
{
    author: "AccountId",
    peerAddress: "EthAddress",
    peerAccountId: "AccountId",
    nonce: "Index",
    networkId: "BridgeNetworkId",
    timepoint: "BridgeTimepoint"
}
```

### OutgoingAddPeerCompat

```
{
    author: "AccountId",
    peerAddress: "EthAddress",
    peerAccountId: "AccountId",
    nonce: "Index",
    networkId: "BridgeNetworkId",
    timepoint: "BridgeTimepoint"
}
```

### OutgoingAddPeerEncoded

```
{
    peerAddress: "EthAddress",
    txHash: "H256",
    networkId: "H256",
    raw: "Vec<u8>"
}
```

### OutgoingAddToken

```
{
    author: "AccountId",
    tokenAddress: "EthAddress",
    ticker: "String",
    name: "String",
    decimals: "u8",
    nonce: "Index",
    networkId: "BridgeNetworkId",
    timepoint: "BridgeTimepoint"
}
```

### OutgoingAddTokenEncoded

```
{
    tokenAddress: "EthAddress",
    ticker: "String",
    name: "String",
    decimals: "u8",
    hash: "H256",
    networkId: "H256",
    raw: "Vec<u8>"
}
```

### OutgoingMigrate

```
{
    author: "AccountId",
    newContractAddress: "EthAddress",
    erc20NativeTokens: "Vec<EthAddress>",
    nonce: "Index",
    networkId: "BridgeNetworkId",
    timepoint: "BridgeTimepoint"
}
```

### OutgoingMigrateEncoded

```
{
    thisContractAddress: "EthAddress",
    txHash: "H256",
    newContractAddress: "EthAddress",
    erc20NativeTokens: "Vec<EthAddress>",
    networkId: "H256",
    raw: "Vec<u8>"
}
```

### OutgoingPrepareForMigration

```
{
    author: "AccountId",
    nonce: "Index",
    networkId: "BridgeNetworkId",
    timepoint: "BridgeTimepoint"
}
```

### OutgoingPrepareForMigrationEncoded

```
{
    thisContractAddress: "EthAddress",
    txHash: "H256",
    networkId: "H256",
    raw: "Vec<u8>"
}
```

### OutgoingRemovePeer

```
{
    author: "AccountId",
    peerAccountId: "AccountId",
    peerAddress: "EthAddress",
    nonce: "Index",
    networkId: "BridgeNetworkId",
    timepoint: "BridgeTimepoint"
}
```

### OutgoingRemovePeerCompat

```
{
    author: "AccountId",
    peerAccountId: "AccountId",
    peerAddress: "EthAddress",
    nonce: "Index",
    networkId: "BridgeNetworkId",
    timepoint: "BridgeTimepoint"
}
```

### OutgoingRemovePeerEncoded

```
{
    peerAddress: "EthAddress",
    txHash: "H256",
    networkId: "H256",
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
    assetId: "AssetId",
    amount: "Balance",
    nonce: "Index",
    networkId: "BridgeNetworkId",
    timepoint: "BridgeTimepoint"
}
```

### OutgoingTransferEncoded

```
{
    currencyId: "CurrencyIdEncoded",
    amount: "U256",
    to: "EthAddress",
    from: "EthAddress",
    txHash: "H256",
    networkId: "H256",
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
    approvingAccounts: "Vec<AccountId>",
    migrateAt: "Option<BlockNumber>"
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
    numberOfOptions: "u32",
    pollStartTimestamp: "Moment",
    pollEndTimestamp: "Moment"
}
```

### PoolData

```
{
    multiplier: "u32",
    depositFee: "Balance",
    isCore: "bool",
    isFarm: "bool",
    totalTokensInPool: "Balance",
    rewards: "Balance",
    rewardsToBeDistributed: "Balance",
    isRemoved: "bool"
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
    actualWeight: "Option<Weight>",
    paysFee: "Pays"
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
    priceFailures: "u32",
    spotPrices: "Vec<Balance>",
    averagePrice: "Balance",
    needsUpdate: "bool",
    lastSpotPrice: "Balance"
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
    desiredAmountIn: "Balance"
}
```

### QuoteWithDesiredOutput

```
{
    desiredAmountOut: "Balance"
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
    totalAvailable: "Balance",
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
    desiredAmountIn: "Balance",
    minAmountOut: "Balance"
}
```

### SwapWithDesiredOutput

```
{
    desiredAmountOut: "Balance",
    maxAmountIn: "Balance"
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
    teamVestingTotalTokens: "Balance",
    teamVestingFirstReleasePercent: "Balance",
    teamVestingPeriod: "Moment",
    teamVestingPercent: "Balance"
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
    baseAssetId: "TechAssetId",
    targetAssetId: "TechAssetId"
}
```

### TokenInfo

```
{
    farmsTotalMultiplier: "u32",
    stakingTotalMultiplier: "u32",
    tokenPerBlock: "Balance",
    farmsAllocation: "Balance",
    stakingAllocation: "Balance",
    teamAllocation: "Balance",
    teamAccount: "AccountId"
}
```

### TokenLockInfo

```
{
    tokens: "Balance",
    unlockingTimestamp: "Moment",
    assetId: "AssetId"
}
```

### TradingPair

```
{
    baseAssetId: "AssetId",
    targetAssetId: "AssetId"
}
```

### UserInfo

```
{
    poolAsset: "AssetId",
    rewardAsset: "AssetId",
    isFarm: "bool",
    pooledTokens: "Balance",
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
    votingOption: "u32",
    numberOfVotes: "Balance",
    ceresWithdrawn: "bool"
}
```
