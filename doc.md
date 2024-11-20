# API Calls

**Table of Contents (Pallets)**

- [substrate](#substrate-pallet)
- [system](#system-pallet)
- [babe](#babe-pallet)
- [timestamp](#timestamp-pallet)
- [balances](#balances-pallet)
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
- [technical](#technical-pallet)
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
- [band](#band-pallet)
- [oracleProxy](#oracleproxy-pallet)
- [hermesGovernancePlatform](#hermesgovernanceplatform-pallet)
- [preimage](#preimage-pallet)
- [orderBook](#orderbook-pallet)
- [kensetsu](#kensetsu-pallet)
- [leafProvider](#leafprovider-pallet)
- [bridgeProxy](#bridgeproxy-pallet)
- [bridgeInboundChannel](#bridgeinboundchannel-pallet)
- [bridgeOutboundChannel](#bridgeoutboundchannel-pallet)
- [dispatch](#dispatch-pallet)
- [evmFungibleApp](#evmfungibleapp-pallet)
- [jettonApp](#jettonapp-pallet)
- [beefyLightClient](#beefylightclient-pallet)
- [substrateBridgeInboundChannel](#substratebridgeinboundchannel-pallet)
- [substrateBridgeOutboundChannel](#substratebridgeoutboundchannel-pallet)
- [substrateDispatch](#substratedispatch-pallet)
- [parachainBridgeApp](#parachainbridgeapp-pallet)
- [bridgeDataSigner](#bridgedatasigner-pallet)
- [multisigVerifier](#multisigverifier-pallet)
- [substrateBridgeApp](#substratebridgeapp-pallet)
- [mmr](#mmr-pallet)
- [beefy](#beefy-pallet)
- [mmrLeaf](#mmrleaf-pallet)
- [sudo](#sudo-pallet)
- [apolloPlatform](#apolloplatform-pallet)
- [extendedAssets](#extendedassets-pallet)
- [soratopia](#soratopia-pallet)
- [utility](#utility-pallet)
- [liquidityProxy](#liquidityproxy-pallet)
- [faucet](#faucet-pallet)
- [qaTools](#qatools-pallet)
- [author](#author-pallet)
- [chain](#chain-pallet)
- [childstate](#childstate-pallet)
- [offchain](#offchain-pallet)
- [payment](#payment-pallet)
- [rpc](#rpc-pallet)
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

returns: `FrameSupportDispatchPerDispatchClassWeight`

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

#### **api.query.balances.inactiveIssuance**

> The total units of outstanding deactivated balance in the system.

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

#### **api.query.xorFee.smallReferenceAmount**

> Small fee value should be `SmallReferenceAmount` in reference asset id

arguments: -

returns: `u128`

<hr>

#### **api.query.xorFee.updatePeriod**

> Next block number to update multiplier
> If it is necessary to stop updating the multiplier,
> set 0 value

arguments: -

returns: `u32`

<hr>

#### **api.query.xorFee.xorToVal**

> The amount of XOR to be reminted and exchanged for VAL at the end of the session

arguments: -

returns: `u128`

<hr>

#### **api.query.xorFee.xorToBuyBack**

> The amount of XOR to be reminted and exchanged for KUSD at the end of the session

arguments: -

returns: `u128`

<hr>

#### **api.query.xorFee.multiplier**

arguments: -

returns: `u128`

<hr>

### _Extrinsics_

#### **api.tx.xorFee.updateMultiplier**

> Update the multiplier for weight -> fee conversion.

arguments:

- newMultiplier: `u128`
<hr>

#### **api.tx.xorFee.setFeeUpdatePeriod**

> Set new update period for `xor_fee::Multiplier` updating
> Set 0 to stop updating

arguments:

- newPeriod: `u32`
<hr>

#### **api.tx.xorFee.setSmallReferenceAmount**

> Set new small reference amount `xor_fee::SmallReferenceAmount`
> Small fee should tend to the amount value

arguments:

- newReferenceAmount: `u128`
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
- maxWeight: `SpWeightsWeightV2Weight`
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
- maxWeight: `SpWeightsWeightV2Weight`
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

#### **api.query.authorship.author**

> Author of current block.

arguments: -

returns: `AccountId32`

<hr>

## Staking pallet

### _State Queries_

#### **api.query.staking.palletVersion**

> Returns the current pallet version from storage

arguments: -

returns: `u16`

<hr>

#### **api.query.staking.timeSinceGenesis**

> The time span since genesis, incremented at the end of each era.

arguments: -

returns: `PalletStakingSoraDurationWrapper`

<hr>

#### **api.query.staking.validatorCount**

> The ideal number of active validators.

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
>
> TWOX-NOTE: SAFE since `AccountId` is a secure hash.

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

#### **api.query.staking.minimumActiveStake**

> The minimum active nominator stake of the last successful election.

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
>
> TWOX-NOTE: SAFE since `AccountId` is a secure hash.

arguments:

- key: `AccountId32`

returns: `PalletStakingRewardDestination`

<hr>

#### **api.query.staking.validators**

> The map from (wannabe) validator stash key to the preferences of that validator.
>
> TWOX-NOTE: SAFE since `AccountId` is a secure hash.

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
>
> TWOX-NOTE: SAFE since `AccountId` is a secure hash.

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
> can co-exists at the same time. If there are no unlocking chunks slots available
> [`Call::withdraw_unbonded`] is called to remove some of the chunks (if possible).
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
> Effects will be felt instantly (as soon as this function is completed successfully).
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
> Effects will be felt instantly (as soon as this function is completed successfully).
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

> Increments the ideal number of validators upto maximum of
> `ElectionProviderBase::MaxWinners`.
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

> Scale up the ideal number of validators by a factor upto maximum of
> `ElectionProviderBase::MaxWinners`.
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
> Can be called by the `T::AdminOrigin`.
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
> RuntimeOrigin must be Root to call this function.
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

#### **api.tx.staking.setMinCommission**

> Sets the minimum amount of commission that each validators must maintain.
>
> This call has lower privilege requirements than `set_staking_config` and can be called
> by the `T::AdminOrigin`. Root can always call this.

arguments:

- new: `Perbill`
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
> This is only used for validating equivocation proofs. An equivocation proof must
> contains a key-ownership proof for a given session, therefore we need a way to tie
> together sessions and GRANDPA set ids, i.e. we need to validate that a validator
> was the owner of a given key on a given session, and what the active set ID was
> during that session.
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

> Note that the current authority set of the GRANDPA finality gadget has stalled.
>
> This will trigger a forced authority set change at the beginning of the next session, to
> be enacted `delay` blocks after that. The `delay` should be high enough to safely assume
> that the block signalling the forced change will not be re-orged e.g. 1000 blocks.
> The block production rate (which may be slowed down because of finality lagging) should
> be taken into account when choosing the `delay`. The GRANDPA voters based on the new
> authority will start voting on top of `best_finalized_block_number` for new finalized
> blocks. `best_finalized_block_number` should be the highest of the latest finalized
> block of all validators of the new authority set.
>
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

#### **api.query.tradingPair.lockedLiquiditySources**

arguments: -

returns: `Vec<CommonPrimitivesLiquiditySourceType>`

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

#### **api.query.assets.assetInfosV2**

> Asset Id -> AssetInfo

arguments:

- key: `CommonPrimitivesAssetId32`

returns: `CommonPrimitivesAssetInfo`

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

#### **api.tx.assets.forceMint**

> Performs an unchecked Asset mint, can only be done
> by root account.
>
> Should be used as extrinsic call only.
> `Currencies::updated_balance()` should be deprecated. Using `force_mint` allows us to
> perform extra actions for minting, such as buy-back, extra-minting and etc.
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

#### **api.tx.assets.updateBalance**

> Add or remove abs(`by_amount`) from the balance of `who` under
> `currency_id`. If positive `by_amount`, do add, else do remove.
>
> Basically a wrapper of `MultiCurrencyExtended::update_balance`
> for testing purposes.
>
> TODO: move into tests extrinsic collection pallet

arguments:

- who: `AccountId32`
- currencyId: `CommonPrimitivesAssetId32`
- amount: `i128`
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

#### **api.tx.assets.updateInfo**

> Change information about asset. Can only be done by root
>
> - `origin`: caller Account, should be root
> - `asset_id`: Id of asset to change,
> - `new_symbol`: New asset symbol. If None asset symbol will not change
> - `new_name`: New asset name. If None asset name will not change

arguments:

- assetId: `CommonPrimitivesAssetId32`
- newSymbol: `Option<Bytes>`
- newName: `Option<Bytes>`
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

arguments:

- key: `u32`

returns: `BTreeMap<CommonPrimitivesAssetId32, u128>`

<hr>

#### **api.query.multicollateralBondingCurvePool.initialPrice**

> Buy price starting constant. This is the price users pay for new XOR.

arguments: -

returns: `FixnumFixedPoint`

<hr>

#### **api.query.multicollateralBondingCurvePool.priceChangeStep**

> Coefficients in buy price function.

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

> Base fee in XOR which is deducted on all trades, currently it's burned: 0.3%

arguments: -

returns: `FixnumFixedPoint`

<hr>

#### **api.query.multicollateralBondingCurvePool.distributionAccountsEntry**

> Accounts that receive 20% buy/sell margin according to predefined proportions

arguments: -

returns: `MulticollateralBondingCurvePoolDistributionAccounts`

<hr>

#### **api.query.multicollateralBondingCurvePool.enabledTargets**

> Collateral Assets allowed to be sold by the token bonding curve

arguments: -

returns: `BTreeSet<CommonPrimitivesAssetId32>`

<hr>

#### **api.query.multicollateralBondingCurvePool.referenceAssetId**

> Asset that is used to compare collateral assets by value, e.g., DAI

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

> Total amount of PSWAP owned by accounts

arguments: -

returns: `u128`

<hr>

#### **api.query.multicollateralBondingCurvePool.incentivisedCurrenciesNum**

> Number of reserve currencies selling which user will get rewards, namely all registered collaterals except PSWAP and VAL

arguments: -

returns: `u32`

<hr>

#### **api.query.multicollateralBondingCurvePool.incentivesAccountId**

> Account which stores actual PSWAP intended for rewards

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
> however this constant is not modified

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

## Technical pallet

### _State Queries_

#### **api.query.technical.palletVersion**

> Returns the current pallet version from storage

arguments: -

returns: `u16`

<hr>

#### **api.query.technical.techAccounts**

> Registered technical account identifiers. Map from repr `AccountId` into pure `TechAccountId`.

arguments:

- key: `AccountId32`

returns: `CommonPrimitivesTechAccountId`

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

- key: `(AccountId32,CommonPrimitivesAssetId32)`

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

#### **api.tx.council.closeOldWeight**

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
- proposalWeightBound: `SpWeightsWeightV2Weight`
- lengthBound: `Compact<u32>`
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

#### **api.tx.technicalCommittee.closeOldWeight**

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
- proposalWeightBound: `SpWeightsWeightV2Weight`
- lengthBound: `Compact<u32>`
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

> The public proposals. Unsorted. The second item is the proposal.

arguments: -

returns: `Vec<(u32,FrameSupportPreimagesBounded,AccountId32)>`

<hr>

#### **api.query.democracy.depositOf**

> Those who have locked a deposit.
>
> TWOX-NOTE: Safe, as increasing integer keys are safe.

arguments:

- key: `u32`

returns: `(Vec<AccountId32>,u128)`

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

returns: `(FrameSupportPreimagesBounded,PalletDemocracyVoteThreshold)`

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

arguments:

- proposal: `FrameSupportPreimagesBounded`
- value: `Compact<u128>`
<hr>

#### **api.tx.democracy.second**

> Signals agreement with a particular proposal.
>
> The dispatch origin of this call must be _Signed_ and the sender
> must have funds to cover the deposit, equal to the original deposit.
>
> - `proposal`: The index of the proposal to second.

arguments:

- proposal: `Compact<u32>`
<hr>

#### **api.tx.democracy.vote**

> Vote in a referendum. If `vote.is_aye()`, the vote is to enact the proposal;
> otherwise it is a vote to keep the status quo.
>
> The dispatch origin of this call must be _Signed_.
>
> - `ref_index`: The index of the referendum to vote for.
> - `vote`: The vote configuration.

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

arguments:

- proposal: `FrameSupportPreimagesBounded`
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

- proposal: `FrameSupportPreimagesBounded`
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

- proposal: `FrameSupportPreimagesBounded`
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
>   Must be always greater than zero.
>   For `FastTrackOrigin` must be equal or greater than `FastTrackVotingPeriod`.
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

### _Extrinsics_

#### **api.tx.dexapi.enableLiquiditySource**

arguments:

- source: `CommonPrimitivesLiquiditySourceType`
<hr>

#### **api.tx.dexapi.disableLiquiditySource**

arguments:

- source: `CommonPrimitivesLiquiditySourceType`
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

#### **api.query.ethBridge.bridgeSignatureVersions**

arguments:

- key: `u32`

returns: `EthBridgeBridgeSignatureVersion`

<hr>

#### **api.query.ethBridge.pendingBridgeSignatureVersions**

arguments:

- key: `u32`

returns: `EthBridgeBridgeSignatureVersion`

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
- signatureVersion: `EthBridgeBridgeSignatureVersion`
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
- newSignatureVersion: `EthBridgeBridgeSignatureVersion`
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
>   - Reads: Multisig Storage, [Caller Account]
>   - Writes: Multisig Storage, [Caller Account]
> - Plus Call Weight
>
> # </weight>

arguments:

- threshold: `u16`
- otherSignatories: `Vec<AccountId32>`
- maybeTimepoint: `Option<PalletMultisigTimepoint>`
- call: `Call`
- maxWeight: `SpWeightsWeightV2Weight`
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
- maxWeight: `SpWeightsWeightV2Weight`
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
>   - Read: Multisig Storage, [Caller Account], Refund Account
>   - Write: Multisig Storage, [Caller Account], Refund Account
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

#### **api.query.scheduler.incompleteSince**

arguments: -

returns: `u32`

<hr>

#### **api.query.scheduler.agenda**

> Items to be executed, indexed by the block number that they should be executed on.

arguments:

- key: `u32`

returns: `Vec<Option<PalletSchedulerScheduled>>`

<hr>

#### **api.query.scheduler.lookup**

> Lookup from a name to the block number and index of the task.
>
> For v3 -> v4 the previously unbounded identities are Blake2-256 hashed to form the v4
> identities.

arguments:

- key: `[u8;32]`

returns: `(u32,u32)`

<hr>

### _Extrinsics_

#### **api.tx.scheduler.schedule**

> Anonymously schedule a task.

arguments:

- when: `u32`
- maybePeriodic: `Option<(u32,u32)>`
- priority: `u8`
- call: `Call`
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

- id: `[u8;32]`
- when: `u32`
- maybePeriodic: `Option<(u32,u32)>`
- priority: `u8`
- call: `Call`
<hr>

#### **api.tx.scheduler.cancelNamed**

> Cancel a named scheduled task.

arguments:

- id: `[u8;32]`
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
- call: `Call`
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

- id: `[u8;32]`
- after: `u32`
- maybePeriodic: `Option<(u32,u32)>`
- priority: `u8`
- call: `Call`
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
> outgoing member. Otherwise, if `rerun_election` is `true`, a new phragmen election is
> started, else, nothing happens.
>
> If `slash_bond` is set to true, the bond of the member being removed is slashed. Else,
> it is returned.
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
- slashBond: `bool`
- rerunElection: `bool`
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

#### **api.query.vestedRewards.pendingClaims**

> Claims was not processed.

arguments: -

returns: `Vec<VestedRewardsClaim>`

<hr>

#### **api.query.vestedRewards.claimSchedules**

> Vesting claims of a block.
>
> VestingSchedules: map AccountId => Vec<VestingSchedule>

arguments:

- key: `u32`

returns: `Vec<VestedRewardsClaim>`

<hr>

#### **api.query.vestedRewards.vestingSchedules**

> Vesting schedules of an account.
>
> VestingSchedules: map AccountId => Vec<VestingSchedule>

arguments:

- key: `AccountId32`

returns: `Vec<VestedRewardsVestingCurrenciesVestingScheduleVariant>`

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

#### **api.query.vestedRewards.crowdloanInfos**

> Information about crowdloan

arguments:

- key: `Bytes`

returns: `VestedRewardsCrowdloanInfo`

<hr>

#### **api.query.vestedRewards.crowdloanUserInfos**

> Information about crowdloan rewards claimed by user

arguments:

- key: `(AccountId32,Bytes)`

returns: `VestedRewardsCrowdloanUserInfo`

<hr>

### _Extrinsics_

#### **api.tx.vestedRewards.claimRewards**

> Claim all available PSWAP rewards by account signing this transaction.

arguments: -

<hr>

#### **api.tx.vestedRewards.claimCrowdloanRewards**

arguments:

- crowdloan: `Bytes`
<hr>

#### **api.tx.vestedRewards.updateRewards**

arguments:

- rewards: `BTreeMap<AccountId32,BTreeMap<CommonPrimitivesRewardReason,u128>>`
<hr>

#### **api.tx.vestedRewards.registerCrowdloan**

arguments:

- tag: `Bytes`
- startBlock: `u32`
- length: `u32`
- rewards: `Vec<(CommonPrimitivesAssetId32,u128)>`
- contributions: `Vec<(AccountId32,u128)>`
<hr>

#### **api.tx.vestedRewards.claimUnlocked**

arguments:

- assetId: `CommonPrimitivesAssetId32`
<hr>

#### **api.tx.vestedRewards.vestedTransfer**

arguments:

- dest: `AccountId32`
- schedule: `VestedRewardsVestingCurrenciesVestingScheduleVariant`
<hr>

#### **api.tx.vestedRewards.updateVestingSchedules**

arguments:

- who: `AccountId32`
- vestingSchedules: `Vec<VestedRewardsVestingCurrenciesVestingScheduleVariant>`
<hr>

#### **api.tx.vestedRewards.claimFor**

arguments:

- assetId: `CommonPrimitivesAssetId32`
- dest: `AccountId32`
<hr>

#### **api.tx.vestedRewards.unlockPendingScheduleByManager**

arguments:

- dest: `AccountId32`
- filterSchedule: `VestedRewardsVestingCurrenciesVestingScheduleVariant`
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
> - `identity`: The hash of the [`IdentityInfo`] for that the judgement is provided.
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
- identity: `H256`
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

#### **api.query.farming.lpMinXorForBonusReward**

arguments: -

returns: `u128`

<hr>

### _Extrinsics_

#### **api.tx.farming.setLpMinXorForBonusReward**

arguments:

- newLpMinXorForBonusReward: `u128`
<hr>

### _Custom RPCs_

#### **api.rpc.farming.rewardDoublingAssets**

> Get list of double rewarding assets

arguments: -

returns: `Vec<AssetId>`

<hr>

## XstPool pallet

### _State Queries_

#### **api.query.xstPool.palletVersion**

> Returns the current pallet version from storage

arguments: -

returns: `u16`

<hr>

#### **api.query.xstPool.enabledSynthetics**

> Synthetic assets and their reference symbols.
>
> It's a programmer responsibility to keep this collection consistent with [`EnabledSymbols`].

arguments:

- key: `CommonPrimitivesAssetId32`

returns: `XstSyntheticInfo`

<hr>

#### **api.query.xstPool.enabledSymbols**

> Reference symbols and their synthetic assets.
>
> It's a programmer responsibility to keep this collection consistent with [`EnabledSynthetics`].

arguments:

- key: `Bytes`

returns: `CommonPrimitivesAssetId32`

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

#### **api.query.xstPool.syntheticBaseAssetFloorPrice**

> Floor price for the synthetic base asset.

arguments: -

returns: `u128`

<hr>

### _Extrinsics_

#### **api.tx.xstPool.setReferenceAsset**

> Change reference asset which is used to determine collateral assets value.
> Intended to be e.g., stablecoin DAI.
>
> - `origin`: the sudo account on whose behalf the transaction is being executed,
> - `reference_asset_id`: asset id of the new reference asset.

arguments:

- referenceAssetId: `CommonPrimitivesAssetId32`
<hr>

#### **api.tx.xstPool.enableSyntheticAsset**

arguments:

- assetId: `CommonPrimitivesAssetId32`
- referenceSymbol: `Bytes`
- feeRatio: `FixnumFixedPoint`
<hr>

#### **api.tx.xstPool.registerSyntheticAsset**

> Register and enable new synthetic asset with `reference_symbol` price binding

arguments:

- assetSymbol: `Bytes`
- assetName: `Bytes`
- referenceSymbol: `Bytes`
- feeRatio: `FixnumFixedPoint`
<hr>

#### **api.tx.xstPool.disableSyntheticAsset**

> Disable synthetic asset.
>
> Removes synthetic from exchanging
> and removes XSTPool liquidity source for corresponding trading pair.
>
> - `origin`: the sudo account on whose behalf the transaction is being executed,
> - `synthetic_asset`: synthetic asset id to disable.

arguments:

- syntheticAsset: `CommonPrimitivesAssetId32`
<hr>

#### **api.tx.xstPool.removeSyntheticAsset**

> Entirely remove synthetic asset (including linked symbol info)

arguments:

- syntheticAsset: `CommonPrimitivesAssetId32`
<hr>

#### **api.tx.xstPool.setSyntheticAssetFee**

> Set synthetic asset fee.
>
> This fee will be used to determine the amount of synthetic base asset (e.g. XST) to be
> burned when user buys synthetic asset.
>
> - `origin`: the sudo account on whose behalf the transaction is being executed,
> - `synthetic_asset`: synthetic asset id to set fee for,
> - `fee_ratio`: fee ratio with precision = 18, so 1000000000000000000 = 1 = 100% fee.

arguments:

- syntheticAsset: `CommonPrimitivesAssetId32`
- feeRatio: `FixnumFixedPoint`
<hr>

#### **api.tx.xstPool.setSyntheticBaseAssetFloorPrice**

> Set floor price for the synthetic base asset
>
> - `origin`: root account
> - `floor_price`: floor price for the synthetic base asset

arguments:

- floorPrice: `u128`
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

returns: `PriceToolsAggregatedPriceInfo`

<hr>

#### **api.query.priceTools.fastPriceInfos**

arguments:

- key: `CommonPrimitivesAssetId32`

returns: `PriceToolsAggregatedPriceInfo`

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

#### **api.query.ceresLiquidityLocker.palletStorageVersion**

> Pallet storage version

arguments: -

returns: `CeresLiquidityLockerStorageVersion`

<hr>

#### **api.query.ceresLiquidityLocker.lockerData**

> Contains data about lockups for each account

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
- unlockingTimestamp: `u64`
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

#### **api.query.ceresTokenLocker.palletStorageVersion**

> Pallet storage version

arguments: -

returns: `CeresTokenLockerStorageVersion`

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
- unlockingTimestamp: `u64`
- numberOfTokens: `u128`
<hr>

#### **api.tx.ceresTokenLocker.withdrawTokens**

> Withdraw tokens

arguments:

- assetId: `CommonPrimitivesAssetId32`
- unlockingTimestamp: `u64`
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

- key: `(H256,AccountId32)`

returns: `CeresGovernancePlatformVotingInfo`

<hr>

#### **api.query.ceresGovernancePlatform.pollData**

arguments:

- key: `H256`

returns: `CeresGovernancePlatformPollInfo`

<hr>

#### **api.query.ceresGovernancePlatform.palletStorageVersion**

> Pallet storage version

arguments: -

returns: `CeresGovernancePlatformStorageVersion`

<hr>

#### **api.query.ceresGovernancePlatform.authorityAccount**

> Account which has permissions for creating a poll

arguments: -

returns: `AccountId32`

<hr>

### _Extrinsics_

#### **api.tx.ceresGovernancePlatform.vote**

> Voting for option

arguments:

- pollId: `H256`
- votingOption: `u32`
- numberOfVotes: `u128`
<hr>

#### **api.tx.ceresGovernancePlatform.createPoll**

> Create poll

arguments:

- pollAsset: `CommonPrimitivesAssetId32`
- pollStartTimestamp: `u64`
- pollEndTimestamp: `u64`
- title: `Bytes`
- description: `Bytes`
- options: `Vec<Bytes>`
<hr>

#### **api.tx.ceresGovernancePlatform.withdraw**

> Withdraw voting funds

arguments:

- pollId: `H256`
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

#### **api.query.ceresLaunchpad.feePercentOnRaisedFunds**

> Fee percent on raised funds in successful ILO

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

- baseAsset: `CommonPrimitivesAssetId32`
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
- startTimestamp: `u64`
- endTimestamp: `u64`
- teamVestingTotalTokens: `u128`
- teamVestingFirstReleasePercent: `u128`
- teamVestingPeriod: `u64`
- teamVestingPercent: `u128`
- firstReleasePercent: `u128`
- vestingPeriod: `u64`
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

#### **api.tx.ceresLaunchpad.changeFeePercentForRaisedFunds**

> Change fee percent on raised funds in successful ILO

arguments:

- feePercent: `u128`
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

#### **api.query.demeterFarmingPlatform.palletStorageVersion**

> Pallet storage version

arguments: -

returns: `DemeterFarmingPlatformStorageVersion`

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

- baseAsset: `CommonPrimitivesAssetId32`
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

- baseAsset: `CommonPrimitivesAssetId32`
- poolAsset: `CommonPrimitivesAssetId32`
- rewardAsset: `CommonPrimitivesAssetId32`
- isFarm: `bool`
- pooledTokens: `u128`
<hr>

#### **api.tx.demeterFarmingPlatform.getRewards**

> Get rewards

arguments:

- baseAsset: `CommonPrimitivesAssetId32`
- poolAsset: `CommonPrimitivesAssetId32`
- rewardAsset: `CommonPrimitivesAssetId32`
- isFarm: `bool`
<hr>

#### **api.tx.demeterFarmingPlatform.withdraw**

> Withdraw

arguments:

- baseAsset: `CommonPrimitivesAssetId32`
- poolAsset: `CommonPrimitivesAssetId32`
- rewardAsset: `CommonPrimitivesAssetId32`
- pooledTokens: `u128`
- isFarm: `bool`
<hr>

#### **api.tx.demeterFarmingPlatform.removePool**

> Remove pool

arguments:

- baseAsset: `CommonPrimitivesAssetId32`
- poolAsset: `CommonPrimitivesAssetId32`
- rewardAsset: `CommonPrimitivesAssetId32`
- isFarm: `bool`
<hr>

#### **api.tx.demeterFarmingPlatform.changePoolMultiplier**

> Change pool multiplier

arguments:

- baseAsset: `CommonPrimitivesAssetId32`
- poolAsset: `CommonPrimitivesAssetId32`
- rewardAsset: `CommonPrimitivesAssetId32`
- isFarm: `bool`
- newMultiplier: `u32`
<hr>

#### **api.tx.demeterFarmingPlatform.changeTotalTokens**

> Change total tokens

arguments:

- baseAsset: `CommonPrimitivesAssetId32`
- poolAsset: `CommonPrimitivesAssetId32`
- rewardAsset: `CommonPrimitivesAssetId32`
- isFarm: `bool`
- totalTokens: `u128`
<hr>

#### **api.tx.demeterFarmingPlatform.changeInfo**

> Change info

arguments:

- changedUser: `AccountId32`
- baseAsset: `CommonPrimitivesAssetId32`
- poolAsset: `CommonPrimitivesAssetId32`
- rewardAsset: `CommonPrimitivesAssetId32`
- isFarm: `bool`
- poolTokens: `u128`
<hr>

#### **api.tx.demeterFarmingPlatform.changePoolDepositFee**

> Change pool deposit fee

arguments:

- baseAsset: `CommonPrimitivesAssetId32`
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
> Will always update the stored score of `dislocated` to the correct score, based on
> `ScoreProvider`.
>
> If `dislocated` does not exists, it returns an error.

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

> A sorted, bounded vector of `(score, block_number, index)`, where each `index` points to a
> value in `SignedSubmissions`.
>
> We never need to process more than a single signed submission at a time. Signed submissions
> can be quite large, so we're willing to pay the cost of multiple database accesses to access
> them one at a time instead of reading and decoding all of them at once.

arguments: -

returns: `Vec<(SpNposElectionsElectionScore,u32,u32)>`

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

## Band pallet

### _State Queries_

#### **api.query.band.palletVersion**

> Returns the current pallet version from storage

arguments: -

returns: `u16`

<hr>

#### **api.query.band.trustedRelayers**

arguments: -

returns: `BTreeSet<AccountId32>`

<hr>

#### **api.query.band.symbolRates**

arguments:

- key: `Bytes`

returns: `Option<BandBandRate>`

<hr>

#### **api.query.band.symbolCheckBlock**

arguments:

- key: `(u32,Bytes)`

returns: `bool`

<hr>

#### **api.query.band.dynamicFeeParameters**

arguments: -

returns: `BandFeeCalculationParameters`

<hr>

### _Extrinsics_

#### **api.tx.band.relay**

> Relay a list of symbols and their associated rates along with the resolve time and request id on `BandChain`.
>
> Checks if:
>
> - The caller is a relayer;
> - The `resolve_time` for a particular symbol is not lower than previous saved value, ignores this rate if so;
>
> If `rates` contains duplicated symbols, then the last rate will be stored.
>
> - `origin`: the relayer account on whose behalf the transaction is being executed,
> - `rates`: symbols with rates in USD represented as fixed point with precision = 9,
> - `resolve_time`: symbols which rates are provided,
> - `request_id`: id of the request sent to the _BandChain_ to retrieve this data.

arguments:

- rates: `Vec<(Bytes,u64)>`
- resolveTime: `u64`
- requestId: `u64`
<hr>

#### **api.tx.band.forceRelay**

> Similar to [`relay()`] but without the resolve time guard.
>
> Should be used in emergency situations i.e. then previous value was
> relayed by a faulty/malicious actor.
>
> - `origin`: the relayer account on whose behalf the transaction is being executed,
> - `rates`: symbols with rates in USD represented as fixed point with precision = 9,
> - `resolve_time`: symbols which rates are provided,
> - `request_id`: id of the request sent to the _BandChain_ to retrieve this data.

arguments:

- rates: `Vec<(Bytes,u64)>`
- resolveTime: `u64`
- requestId: `u64`
<hr>

#### **api.tx.band.addRelayers**

> Add `account_ids` to the list of trusted relayers.
>
> Ignores repeated accounts in `account_ids`.
> If one of account is already a trusted relayer an [`Error::AlreadyATrustedRelayer`] will
> be returned.
>
> - `origin`: the sudo account on whose behalf the transaction is being executed,
> - `account_ids`: list of new trusted relayers to add.

arguments:

- accountIds: `Vec<AccountId32>`
<hr>

#### **api.tx.band.removeRelayers**

> Remove `account_ids` from the list of trusted relayers.
>
> Ignores repeated accounts in `account_ids`.
> If one of account is not a trusted relayer an [`Error::AlreadyATrustedRelayer`] will
> be returned.
>
> - `origin`: the sudo account on whose behalf the transaction is being executed,
> - `account_ids`: list of relayers to remove.

arguments:

- accountIds: `Vec<AccountId32>`
<hr>

#### **api.tx.band.setDynamicFeeParameters**

arguments:

- feeParameters: `BandFeeCalculationParameters`
<hr>

## OracleProxy pallet

### _State Queries_

#### **api.query.oracleProxy.palletVersion**

> Returns the current pallet version from storage

arguments: -

returns: `u16`

<hr>

#### **api.query.oracleProxy.enabledOracles**

arguments: -

returns: `BTreeSet<CommonPrimitivesOracle>`

<hr>

#### **api.query.oracleProxy.symbolProviders**

arguments:

- key: `Bytes`

returns: `CommonPrimitivesOracle`

<hr>

### _Extrinsics_

#### **api.tx.oracleProxy.enableOracle**

> Enables a specified oracle
>
> Checks if the caller is root
>
> - `origin`: the sudo account
> - `oracle`: oracle variant which should be enabled

arguments:

- oracle: `CommonPrimitivesOracle`
<hr>

#### **api.tx.oracleProxy.disableOracle**

> Disables a specified oracle
>
> Checks if the caller is root
>
> - `origin`: the sudo account
> - `oracle`: oracle variant which should be disabled

arguments:

- oracle: `CommonPrimitivesOracle`
<hr>

## HermesGovernancePlatform pallet

### _State Queries_

#### **api.query.hermesGovernancePlatform.palletVersion**

> Returns the current pallet version from storage

arguments: -

returns: `u16`

<hr>

#### **api.query.hermesGovernancePlatform.hermesVotings**

> A vote of a particular user for a particular poll

arguments:

- key: `(H256,AccountId32)`

returns: `HermesGovernancePlatformHermesVotingInfo`

<hr>

#### **api.query.hermesGovernancePlatform.hermesPollData**

arguments:

- key: `H256`

returns: `HermesGovernancePlatformHermesPollInfo`

<hr>

#### **api.query.hermesGovernancePlatform.minimumHermesVotingAmount**

arguments: -

returns: `u128`

<hr>

#### **api.query.hermesGovernancePlatform.minimumHermesAmountForCreatingPoll**

arguments: -

returns: `u128`

<hr>

#### **api.query.hermesGovernancePlatform.authorityAccount**

> Account which has permissions for changing Hermes minimum amount for voting and creating a poll

arguments: -

returns: `AccountId32`

<hr>

#### **api.query.hermesGovernancePlatform.palletStorageVersion**

> Pallet storage version

arguments: -

returns: `HermesGovernancePlatformStorageVersion`

<hr>

### _Extrinsics_

#### **api.tx.hermesGovernancePlatform.vote**

> Vote for some option

arguments:

- pollId: `H256`
- votingOption: `Bytes`
<hr>

#### **api.tx.hermesGovernancePlatform.createPoll**

> Create poll

arguments:

- pollStartTimestamp: `u64`
- pollEndTimestamp: `u64`
- title: `Bytes`
- description: `Bytes`
- options: `Vec<Bytes>`
<hr>

#### **api.tx.hermesGovernancePlatform.withdrawFundsVoter**

> Withdraw funds voter

arguments:

- pollId: `H256`
<hr>

#### **api.tx.hermesGovernancePlatform.withdrawFundsCreator**

> Withdraw funds creator

arguments:

- pollId: `H256`
<hr>

#### **api.tx.hermesGovernancePlatform.changeMinHermesForVoting**

> Change minimum Hermes for voting

arguments:

- hermesAmount: `u128`
<hr>

#### **api.tx.hermesGovernancePlatform.changeMinHermesForCreatingPoll**

> Change minimum Hermes for creating a poll

arguments:

- hermesAmount: `u128`
<hr>

## Preimage pallet

### _State Queries_

#### **api.query.preimage.palletVersion**

> Returns the current pallet version from storage

arguments: -

returns: `u16`

<hr>

#### **api.query.preimage.statusFor**

> The request status of a given hash.

arguments:

- key: `H256`

returns: `PalletPreimageRequestStatus`

<hr>

#### **api.query.preimage.preimageFor**

arguments:

- key: `(H256,u32)`

returns: `Bytes`

<hr>

### _Extrinsics_

#### **api.tx.preimage.notePreimage**

> Register a preimage on-chain.
>
> If the preimage was previously requested, no fees or deposits are taken for providing
> the preimage. Otherwise, a deposit is taken proportional to the size of the preimage.

arguments:

- bytes: `Bytes`
<hr>

#### **api.tx.preimage.unnotePreimage**

> Clear an unrequested preimage from the runtime storage.
>
> If `len` is provided, then it will be a much cheaper operation.
>
> - `hash`: The hash of the preimage to be removed from the store.
> - `len`: The length of the preimage of `hash`.

arguments:

- hash: `H256`
<hr>

#### **api.tx.preimage.requestPreimage**

> Request a preimage be uploaded to the chain without paying any fees or deposits.
>
> If the preimage requests has already been provided on-chain, we unreserve any deposit
> a user may have paid, and take the control of the preimage out of their hands.

arguments:

- hash: `H256`
<hr>

#### **api.tx.preimage.unrequestPreimage**

> Clear a previously made request for a preimage.
>
> NOTE: THIS MUST NOT BE CALLED ON `hash` MORE TIMES THAN `request_preimage`.

arguments:

- hash: `H256`
<hr>

## OrderBook pallet

### _State Queries_

#### **api.query.orderBook.palletVersion**

> Returns the current pallet version from storage

arguments: -

returns: `u16`

<hr>

#### **api.query.orderBook.orderBooks**

> The storage contains the information about order book, it's parameters and statuses.

arguments:

- key: `OrderBookOrderBookId`

returns: `OrderBook`

<hr>

#### **api.query.orderBook.limitOrders**

> The storage contains the information about all limit orders in all order books.

arguments:

- key: `(OrderBookOrderBookId,u128)`

returns: `OrderBookLimitOrder`

<hr>

#### **api.query.orderBook.bids**

> The index contains the list with the bid order `id` for each price.

arguments:

- key: `(OrderBookOrderBookId,CommonBalanceUnit)`

returns: `Vec<u128>`

<hr>

#### **api.query.orderBook.asks**

> The index contains the list with the ask order `id` for each price.

arguments:

- key: `(OrderBookOrderBookId,CommonBalanceUnit)`

returns: `Vec<u128>`

<hr>

#### **api.query.orderBook.aggregatedBids**

> The index contains the aggregated information about bids with total volume of orders for each price.

arguments:

- key: `OrderBookOrderBookId`

returns: `BTreeMap<CommonBalanceUnit, CommonBalanceUnit>`

<hr>

#### **api.query.orderBook.aggregatedAsks**

> The index contains the aggregated information about asks with total volume of orders for each price.

arguments:

- key: `OrderBookOrderBookId`

returns: `BTreeMap<CommonBalanceUnit, CommonBalanceUnit>`

<hr>

#### **api.query.orderBook.userLimitOrders**

> The index contains the list with the order `id` for the user in different order books.

arguments:

- key: `(AccountId32,OrderBookOrderBookId)`

returns: `Vec<u128>`

<hr>

#### **api.query.orderBook.expirationsAgenda**

> The tech storage that is used in the order expiration mechanism.

arguments:

- key: `u32`

returns: `Vec<(OrderBookOrderBookId,u128)>`

<hr>

#### **api.query.orderBook.alignmentCursor**

> The tech storage that is used during the process of updating the order book.

arguments:

- key: `OrderBookOrderBookId`

returns: `u128`

<hr>

#### **api.query.orderBook.incompleteExpirationsSince**

> Earliest block with incomplete expirations;
> Weight limit might not allow to finish all expirations for a block
> so they might be operated later.

arguments: -

returns: `u32`

<hr>

### _Extrinsics_

#### **api.tx.orderBook.createOrderbook**

> Creates a new order book for the pair of assets.
>
> # Parameters:
>
> - `origin`: caller account who must have permissions to create the order book
> - `order_book_id`: [order book identifier](OrderBookId) that contains: `DexId`, `base asset` & `quote asset`
> - `tick_size`: price step
> - `step_lot_size`: amount step
> - `min_lot_size`: minimal order amount
> - `max_lot_size`: maximal order amount
>
> # Rules:
>
> - root & tech committee can create any order book
> - a regular user can create an order book only for indivisible base assets (most likely NFT) and only if they have this asset on their balance
> - trading pair for the assets must be registered before the creating an order book
>
> # Attribute rules (for `tick_size`, `step_lot_size`, `min_lot_size` & `max_lot_size`):
>
> - all attributes must be non-zero
> - `min_lot_size` <= `max_lot_size`
> - `step_lot_size` <= `min_lot_size`
> - `min_lot_size` & `max_lot_size` must be a multiple of `step_lot_size`
> - `max_lot_size` <= `min_lot_size` \* `SOFT_MIN_MAX_RATIO`, now `SOFT_MIN_MAX_RATIO` = 1 000
> - `max_lot_size` <= total supply of `base` asset
> - precision of `tick_size` \* `step_lot_size` must not overflow **18 digits**

arguments:

- orderBookId: `OrderBookOrderBookId`
- tickSize: `u128`
- stepLotSize: `u128`
- minLotSize: `u128`
- maxLotSize: `u128`
<hr>

#### **api.tx.orderBook.deleteOrderbook**

> Deletes the order book
>
> # Parameters:
>
> - `origin`: caller account who must have permissions to delete the order book
> - `order_book_id`: [order book identifier](OrderBookId) that contains: `DexId`, `base asset` & `quote asset`
>
> # Rules:
>
> - only root & tech committee can delete the order book
> - status of the order book must be [`OnlyCancel`](OrderBookStatus::OnlyCancel) or [`Stop`](OrderBookStatus::Stop)
> - the order book must be empty - doesn't contain any orders
>
> # Real life delete process:
>
> 1.  Announce that the order book will be deleted.
> 2.  Stop the order book by changing the status to [`OnlyCancel`](OrderBookStatus::OnlyCancel) or [`Stop`](OrderBookStatus::Stop)
> 3.  Wait until users cancel their orders or their lifetime just expires (maximum 1 month).
> 4.  Delete the empty order book.

arguments:

- orderBookId: `OrderBookOrderBookId`
<hr>

#### **api.tx.orderBook.updateOrderbook**

> Updates the attributes of the order book
>
> # Parameters:
>
> - `origin`: caller account who must have permissions to update the order book
> - `order_book_id`: [order book identifier](OrderBookId) that contains: `DexId`, `base asset` & `quote asset`
> - `tick_size`: price step
> - `step_lot_size`: amount step
> - `min_lot_size`: minimal order amount
> - `max_lot_size`: maximal order amount
>
> # Rules:
>
> - only root & tech committee can update the order book
> - status of the order book must be [`OnlyCancel`](OrderBookStatus::OnlyCancel) or [`Stop`](OrderBookStatus::Stop)
> - inernal tech status of the order book must be [`Ready`](OrderBookTechStatus::Ready), that means the previos update is completed
>
> # Attribute rules (for `tick_size`, `step_lot_size`, `min_lot_size` & `max_lot_size`):
>
> - all attributes must be non-zero
> - `min_lot_size` <= `max_lot_size`
> - `step_lot_size` <= `min_lot_size`
> - `min_lot_size` & `max_lot_size` must be a multiple of `step_lot_size`
> - `max_lot_size` <= total supply of `base` asset
> - precision of `tick_size` \* `step_lot_size` must not overflow 18 digits
> - `max_lot_size` <= `min_lot_size` \* `SOFT_MIN_MAX_RATIO`, now `SOFT_MIN_MAX_RATIO` = 1 000
> - `max_lot_size` <= **old** `min_lot_size` \* `HARD_MIN_MAX_RATIO`, now `HARD_MIN_MAX_RATIO` = 4 000
>
> # Real life update process:
>
> 1.  Announce that the order book will be updated.
> 2.  Stop the order book by changing the status to [`OnlyCancel`](OrderBookStatus::OnlyCancel) or [`Stop`](OrderBookStatus::Stop)
> 3.  Update the order book attributes according to the rules[^note].
> 4.  Wait the orders alignment if it is necessary - the order book tech status must become [`Ready`](OrderBookTechStatus::Ready).
> 5.  Change the order book status back to [`Trade`](OrderBookStatus::Trade) or other necessary status.
> 6.  Announce that the order book update is completed.
>
> [^note]:
>     according to tech reasons it is forbidden to update `max_lot_size` with too large a value (see last 2 rules).
>     For example, if the current values `min_lot_size` = 1 & `max_lot_size` = 1 000,
>     we cannot change it to `min_lot_size` = 1 000 & `max_lot_size` = 1 000 000.
>     In this case it is necessary to do several update rounds:
>
> 1.  `min_lot_size`: 1 --> 1 000, `max_lot_size`: 1 000 --> 4 000
> 2.  `max_lot_size`: 4 000 --> 1 000 000
>
> It is also not recommended to batch these updates, because the tech status of the order book can be changed after the 1st update and the 2nd update will be declined in this case.

arguments:

- orderBookId: `OrderBookOrderBookId`
- tickSize: `u128`
- stepLotSize: `u128`
- minLotSize: `u128`
- maxLotSize: `u128`
<hr>

#### **api.tx.orderBook.changeOrderbookStatus**

> Sets the order book status
>
> # Parameters:
>
> - `origin`: caller account who must have permissions to change the order book status
> - `order_book_id`: [order book identifier](OrderBookId) that contains: `DexId`, `base asset` & `quote asset`
> - `status`: one of the statuses from [OrderBookStatus]
>
> # Rules:
>
> - only root & tech committee can set the order book status
> - if the order book is locked by updating (tech status is [`Updating`](OrderBookTechStatus::Updating)), the allowed statues to set:
>   - [`OnlyCancel`](OrderBookStatus::OnlyCancel)
>   - [`Stop`](OrderBookStatus::Stop)

arguments:

- orderBookId: `OrderBookOrderBookId`
- status: `OrderBookOrderBookStatus`
<hr>

#### **api.tx.orderBook.placeLimitOrder**

> Places the limit order into the order book
>
> # Parameters:
>
> - `origin`: caller account, the limit order owner
> - `order_book_id`: [order book identifier](OrderBookId) that contains: `DexId`, `base asset` & `quote asset`
> - `price`: price in the `quote asset`
> - `amount`: volume of the limit order in the `base asset`
> - `side`: [side](PriceVariant) where to place the limit order
> - `lifespan`: life duration of the limit order in millisecs, if not defined the default value 30 days is set
>
> # Rules:
>
> - `price` must be a multiple of [`OrderBook::tick_size`]
> - `amount` >= [`OrderBook::min_lot_size`]
> - `amount` <= [`OrderBook::max_lot_size`]
> - `amount` must be a multiple of [`OrderBook::step_lot_size`]
> - if the `price` crosses the spread (the opposite `side`):
>   - if [`OrderBook::status`] allows to trade - the limit order is converted into market order and the exchange occurs
>   - if [`OrderBook::status`] doesn't allow to trade - transaction fails

arguments:

- orderBookId: `OrderBookOrderBookId`
- price: `u128`
- amount: `u128`
- side: `CommonPrimitivesPriceVariant`
- lifespan: `Option<u64>`
<hr>

#### **api.tx.orderBook.cancelLimitOrder**

> Cancels the limit order
>
> # Parameters:
>
> - `origin`: caller account who owns the limit order
> - `order_book_id`: [order book identifier](OrderBookId) that contains: `DexId`, `base asset` & `quote asset`
> - `order_id`: `id` of the limit order
>
> # Rules:
>
> - only the order owner can cancel the limit order
>
> # Note:
>
> Network fee isn't charged if the order is successfully cancelled by the owner

arguments:

- orderBookId: `OrderBookOrderBookId`
- orderId: `u128`
<hr>

#### **api.tx.orderBook.cancelLimitOrdersBatch**

> Cancels the list of limit orders
>
> # Parameters:
>
> - `origin`: caller account who owns the limit orders
> - `limit_orders_to_cancel`: the list with [`order_book_id`](OrderBookId) & `order_id` pairs to cancel
>
> # Rules:
>
> - only the owner of **all** orders can cancel all limit orders from the list
>
> # Note:
>
> Network fee isn't charged if orders are successfully cancelled by the owner

arguments:

- limitOrdersToCancel: `Vec<(OrderBookOrderBookId,Vec<u128>)>`
<hr>

#### **api.tx.orderBook.executeMarketOrder**

> Executes the market order
>
> # Parameters:
>
> - `origin`: caller account
> - `order_book_id`: [order book identifier](OrderBookId) that contains: `DexId`, `base asset` & `quote asset`
> - `direction`: [direction](PriceVariant) of the market order
> - `amount`: volume of the `base asset` to trade
>
> # Rules:
>
> - works only for order books with indivisible `base asset`, because there is no other ability to trade such assets. All other divisible assets must be traded by `liquidity_proxy::swap`
> - `amount` >= [`OrderBook::min_lot_size`]
> - `amount` <= [`OrderBook::max_lot_size`]
> - `amount` must be a multiple of [`OrderBook::step_lot_size`]

arguments:

- orderBookId: `OrderBookOrderBookId`
- direction: `CommonPrimitivesPriceVariant`
- amount: `u128`
<hr>

## Kensetsu pallet

### _State Queries_

#### **api.query.kensetsu.palletVersion**

> Returns the current pallet version from storage

arguments: -

returns: `u16`

<hr>

#### **api.query.kensetsu.liquidatedThisBlock**

> Flag indicates that liquidation took place in this block. Only one liquidation per block is
> allowed, the flag is dropped every block.

arguments: -

returns: `bool`

<hr>

#### **api.query.kensetsu.stablecoinInfos**

> Stablecoin parameters

arguments:

- key: `CommonPrimitivesAssetId32`

returns: `KensetsuStablecoinInfo`

<hr>

#### **api.query.kensetsu.collateralInfos**

> Parameters for collaterals, include risk parameters and interest recalculation coefficients.
> Map (Collateral asset id, Stablecoin asset id => CollateralInfo)

arguments:

- key: `KensetsuStablecoinCollateralIdentifier`

returns: `KensetsuCollateralInfo`

<hr>

#### **api.query.kensetsu.borrowTax**

> Borrows tax applied on borrow amount in any stablecoin and used to buy back and incentivize
> KEN. It is a risk parameter.

arguments: -

returns: `Percent`

<hr>

#### **api.query.kensetsu.karmaBorrowTax**

> Borrow tax applied on borrow amount in KXOR and used to buy back and incentivize KARMA.

arguments: -

returns: `Percent`

<hr>

#### **api.query.kensetsu.tbcdBorrowTax**

> Borrow tax applied on borrow amount in KXOR and used to buy back and burn TBCD.

arguments: -

returns: `Percent`

<hr>

#### **api.query.kensetsu.liquidationPenalty**

> Liquidation penalty

arguments: -

returns: `Percent`

<hr>

#### **api.query.kensetsu.nextCDPId**

> CDP counter used for CDP id

arguments: -

returns: `u128`

<hr>

#### **api.query.kensetsu.cdpDepository**

> Storage of all CDPs, where key is a unique CDP identifier

arguments:

- key: `u128`

returns: `KensetsuCollateralizedDebtPosition`

<hr>

#### **api.query.kensetsu.cdpOwnerIndex**

> Index links owner to CDP ids, not needed by protocol, but used by front-end

arguments:

- key: `AccountId32`

returns: `Vec<u128>`

<hr>

### _Extrinsics_

#### **api.tx.kensetsu.createCdp**

> Creates a Collateralized Debt Position (CDP).
> The extrinsic combines depositing collateral and borrowing.
> Borrow amount will be as max as possible in the range
> `[borrow_amount_min, borrow_amount_max]` in order to confrom the slippage tolerance.
>
> ## Parameters
>
> - `origin`: The origin of the transaction.
> - `collateral_asset_id`: The identifier of the asset used as collateral.
> - `collateral_amount`: The amount of collateral to be deposited.
> - `borrow_amount_min`: The minimum amount the user wants to borrow.
> - `borrow_amount_max`: The maximum amount the user wants to borrow.

arguments:

- collateralAssetId: `CommonPrimitivesAssetId32`
- collateralAmount: `u128`
- stablecoinAssetId: `CommonPrimitivesAssetId32`
- borrowAmountMin: `u128`
- borrowAmountMax: `u128`
- cdpType: `KensetsuCdpType`
<hr>

#### **api.tx.kensetsu.closeCdp**

> Closes a Collateralized Debt Position (CDP).
>
> If a CDP has outstanding debt, this amount is covered with owner balance. Collateral
> then is returned to the owner and CDP is deleted.
>
> ## Parameters
>
> - `origin`: The origin of the transaction, only CDP owner is allowed.
> - `cdp_id`: The ID of the CDP to be closed.
>   will be transferred.

arguments:

- cdpId: `u128`
<hr>

#### **api.tx.kensetsu.depositCollateral**

> Deposits collateral into a Collateralized Debt Position (CDP).
>
> ## Parameters
>
> - `origin`: The origin of the transaction.
> - `cdp_id`: The ID of the CDP to deposit collateral into.
> - `collateral_amount`: The amount of collateral to deposit.

arguments:

- cdpId: `u128`
- collateralAmount: `u128`
<hr>

#### **api.tx.kensetsu.borrow**

> Borrows funds against a Collateralized Debt Position (CDP).
> Borrow amount will be as max as possible in the range
> `[borrow_amount_min, borrow_amount_max]` in order to confrom the slippage tolerance.
>
> ## Parameters
>
> - `origin`: The origin of the transaction.
> - `cdp_id`: The ID of the CDP to borrow against.
> - `borrow_amount_min`: The minimum amount the user wants to borrow.
> - `borrow_amount_max`: The maximum amount the user wants to borrow.

arguments:

- cdpId: `u128`
- borrowAmountMin: `u128`
- borrowAmountMax: `u128`
<hr>

#### **api.tx.kensetsu.repayDebt**

> Repays debt against a Collateralized Debt Position (CDP).
>
> ## Parameters
>
> - `origin`: The origin of the transaction.
> - `cdp_id`: The ID of the CDP to repay debt for.
> - `amount`: The amount to repay against the CDP's debt.

arguments:

- cdpId: `u128`
- amount: `u128`
<hr>

#### **api.tx.kensetsu.liquidate**

> Liquidates a Collateralized Debt Position (CDP) if it becomes unsafe.
>
> ## Parameters
>
> - `_origin`: The origin of the transaction (unused).
> - `cdp_id`: The ID of the CDP to be liquidated.

arguments:

- cdpId: `u128`
<hr>

#### **api.tx.kensetsu.accrue**

> Accrues interest on a Collateralized Debt Position (CDP).
>
> ## Parameters
>
> - `_origin`: The origin of the transaction (unused).
> - `cdp_id`: The ID of the CDP to accrue interest on.

arguments:

- cdpId: `u128`
<hr>

#### **api.tx.kensetsu.updateCollateralRiskParameters**

> Updates the risk parameters for a specific collateral asset.
>
> ## Parameters
>
> - `origin`: The origin of the transaction.
> - `collateral_asset_id`: The identifier of the collateral asset. If collateral asset id
>   is not tracked by PriceTools, registers the asset id in PriceTools.
> - `new_risk_parameters`: The new risk parameters to be set for the collateral asset.

arguments:

- collateralAssetId: `CommonPrimitivesAssetId32`
- stablecoinAssetId: `CommonPrimitivesAssetId32`
- newRiskParameters: `KensetsuCollateralRiskParameters`
<hr>

#### **api.tx.kensetsu.updateBorrowTax**

> Updates the borrow tax applied during borrow.
>
> ## Parameters
>
> - `origin`: The origin of the transaction.
> - `new_borrow_tax`: The new borrow tax percentage to be set.

arguments:

- newBorrowTaxes: `KensetsuBorrowTaxes`
<hr>

#### **api.tx.kensetsu.updateLiquidationPenalty**

> Updates the liquidation penalty applied during CDP liquidation.
>
> ## Parameters
>
> - `origin`: The origin of the transaction.
> - `new_liquidation_penalty`: The new liquidation penalty percentage to be set.

arguments:

- newLiquidationPenalty: `Percent`
<hr>

#### **api.tx.kensetsu.withdrawProfit**

> Withdraws protocol profit in the form of stablecoin.
>
> ## Parameters
>
> - `origin`: The origin of the transaction.
> - `beneficiary` : The destination account where assets will be withdrawn.
> - `stablecoin_asset_id` - The asset id of stablecoin.
> - `amount`: The amount of stablecoin to withdraw as protocol profit.

arguments:

- beneficiary: `AccountId32`
- stablecoinAssetId: `CommonPrimitivesAssetId32`
- amount: `u128`
<hr>

#### **api.tx.kensetsu.donate**

> Donates stablecoin to cover protocol bad debt.
>
> ## Parameters
>
> - `origin`: The origin of the transaction.
> - `stablecoin_asset_id` - The asset id of stablecoin.
> - `amount`: The amount of stablecoin to donate to cover bad debt.

arguments:

- stablecoinAssetId: `CommonPrimitivesAssetId32`
- amount: `u128`
<hr>

#### **api.tx.kensetsu.registerStablecoin**

> Adds new stablecoin mutating StablecoinInfo.
>
> ##Parameters
>
> - stablecoin_asset_id - asset id of new stablecoin, must be mintable and total supply
>   must be 0.
> - new_stablecoin_parameters - parameters for peg.

arguments:

- newStablecoinParameters: `KensetsuStablecoinParameters`
<hr>

#### **api.tx.kensetsu.updateHardCap**

> Updates risk parameter `hard_cap`.
>
> ##Parameters
>
> - `collateral_asset_id` and `stablecoin_asset_id` - composite key for collateral_info;
> - `hard_cap` - new value.

arguments:

- collateralAssetId: `CommonPrimitivesAssetId32`
- stablecoinAssetId: `CommonPrimitivesAssetId32`
- hardCap: `u128`
<hr>

#### **api.tx.kensetsu.updateLiquidationRatio**

> Updates risk parameter `liquidation_ratio`.
>
> ##Parameters
>
> - `collateral_asset_id` and `stablecoin_asset_id` - composite key for collateral_info;
> - `liquidation_ratio` - new value.

arguments:

- collateralAssetId: `CommonPrimitivesAssetId32`
- stablecoinAssetId: `CommonPrimitivesAssetId32`
- liquidationRatio: `Perbill`
<hr>

#### **api.tx.kensetsu.updateMaxLiquidationLot**

> Updates risk parameter `max_liquidation_lot`.
>
> ##Parameters
>
> - `collateral_asset_id` and `stablecoin_asset_id` - composite key for collateral_info;
> - `max_liquidation_lot` - new value.

arguments:

- collateralAssetId: `CommonPrimitivesAssetId32`
- stablecoinAssetId: `CommonPrimitivesAssetId32`
- maxLiquidationLot: `u128`
<hr>

#### **api.tx.kensetsu.updateStabilityFeeRate**

> Updates risk parameter `stability_fee_rate`.
>
> ##Parameters
>
> - `collateral_asset_id` and `stablecoin_asset_id` - composite key for collateral_info;
> - `stability_fee_rate` - new value.

arguments:

- collateralAssetId: `CommonPrimitivesAssetId32`
- stablecoinAssetId: `CommonPrimitivesAssetId32`
- stabilityFeeRate: `u128`
<hr>

#### **api.tx.kensetsu.updateMinimalCollateralDeposit**

> Updates risk parameter `minimal_collateral_deposit`.
>
> ##Parameters
>
> - `collateral_asset_id` and `stablecoin_asset_id` - composite key for collateral_info;
> - `minimal_collateral_deposit` - new value.

arguments:

- collateralAssetId: `CommonPrimitivesAssetId32`
- stablecoinAssetId: `CommonPrimitivesAssetId32`
- minimalCollateralDeposit: `u128`
<hr>

#### **api.tx.kensetsu.updateMinimalStabilityFeeAccrue**

arguments:

- stablecoinAssetId: `CommonPrimitivesAssetId32`
- newMinimalStabilityFeeAccrue: `u128`
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

returns: `Vec<BridgeTypesAuxiliaryDigestItem>`

<hr>

### _Custom RPCs_

#### **api.rpc.leafProvider.latestDigest**

> Get leaf provider logs.

arguments:

- at: `BlockHash`

returns: `AuxiliaryDigest`

<hr>

## BridgeProxy pallet

### _State Queries_

#### **api.query.bridgeProxy.palletVersion**

> Returns the current pallet version from storage

arguments: -

returns: `u16`

<hr>

#### **api.query.bridgeProxy.transactions**

arguments:

- key: `((BridgeTypesGenericNetworkId,AccountId32),H256)`

returns: `BridgeProxyBridgeRequest`

<hr>

#### **api.query.bridgeProxy.senders**

arguments:

- key: `(BridgeTypesGenericNetworkId,H256)`

returns: `AccountId32`

<hr>

#### **api.query.bridgeProxy.lockedAssets**

> Amount of assets locked by bridge for specific network. Map ((Network ID, Asset ID) => Locked amount).

arguments:

- key: `(BridgeTypesGenericNetworkId,CommonPrimitivesAssetId32)`

returns: `u128`

<hr>

#### **api.query.bridgeProxy.transferLimit**

> Maximum amount of assets that can be withdrawn during period of time.

arguments: -

returns: `BridgeProxyTransferLimitSettings`

<hr>

#### **api.query.bridgeProxy.consumedTransferLimit**

> Consumed transfer limit.

arguments: -

returns: `u128`

<hr>

#### **api.query.bridgeProxy.transferLimitUnlockSchedule**

> Schedule for consumed transfer limit reduce.

arguments:

- key: `u32`

returns: `u128`

<hr>

#### **api.query.bridgeProxy.limitedAssets**

> Assets with transfer limitation.

arguments:

- key: `CommonPrimitivesAssetId32`

returns: `bool`

<hr>

### _Extrinsics_

#### **api.tx.bridgeProxy.burn**

arguments:

- networkId: `BridgeTypesGenericNetworkId`
- assetId: `CommonPrimitivesAssetId32`
- recipient: `BridgeTypesGenericAccount`
- amount: `u128`
<hr>

#### **api.tx.bridgeProxy.addLimitedAsset**

arguments:

- assetId: `CommonPrimitivesAssetId32`
<hr>

#### **api.tx.bridgeProxy.removeLimitedAsset**

arguments:

- assetId: `CommonPrimitivesAssetId32`
<hr>

#### **api.tx.bridgeProxy.updateTransferLimit**

arguments:

- settings: `BridgeProxyTransferLimitSettings`
<hr>

### _Custom RPCs_

#### **api.rpc.bridgeProxy.listApps**

>

arguments:

- at: `BlockHash`

returns: `Vec<BridgeAppInfo>`

<hr>

#### **api.rpc.bridgeProxy.listAssets**

>

arguments:

- networkId: `GenericNetworkId`
- at: `BlockHash`

returns: `Vec<BridgeAssetInfo>`

<hr>

## BridgeInboundChannel pallet

### _State Queries_

#### **api.query.bridgeInboundChannel.palletVersion**

> Returns the current pallet version from storage

arguments: -

returns: `u16`

<hr>

#### **api.query.bridgeInboundChannel.channelNonces**

arguments:

- key: `BridgeTypesGenericNetworkId`

returns: `u64`

<hr>

#### **api.query.bridgeInboundChannel.reportedChannelNonces**

arguments:

- key: `BridgeTypesGenericNetworkId`

returns: `u64`

<hr>

#### **api.query.bridgeInboundChannel.evmChannelAddresses**

arguments:

- key: `H256`

returns: `H160`

<hr>

#### **api.query.bridgeInboundChannel.tonChannelAddresses**

arguments:

- key: `BridgeTypesTonTonNetworkId`

returns: `BridgeTypesTonTonAddress`

<hr>

### _Extrinsics_

#### **api.tx.bridgeInboundChannel.submit**

arguments:

- networkId: `BridgeTypesGenericNetworkId`
- commitment: `BridgeTypesGenericCommitment`
- proof: `FramenodeRuntimeMultiProof`
<hr>

#### **api.tx.bridgeInboundChannel.registerEvmChannel**

arguments:

- networkId: `H256`
- channelAddress: `H160`
<hr>

#### **api.tx.bridgeInboundChannel.registerTonChannel**

arguments:

- networkId: `BridgeTypesTonTonNetworkId`
- channelAddress: `BridgeTypesTonTonAddress`
<hr>

## BridgeOutboundChannel pallet

### _State Queries_

#### **api.query.bridgeOutboundChannel.palletVersion**

> Returns the current pallet version from storage

arguments: -

returns: `u16`

<hr>

#### **api.query.bridgeOutboundChannel.interval**

> Interval between committing messages.

arguments: -

returns: `u32`

<hr>

#### **api.query.bridgeOutboundChannel.messageQueues**

> Messages waiting to be committed. To update the queue, use `append_message_queue` and `take_message_queue` methods
> (to keep correct value in [QueuesTotalGas]).

arguments:

- key: `BridgeTypesGenericNetworkId`

returns: `Vec<BridgeTypesGenericBridgeMessage>`

<hr>

#### **api.query.bridgeOutboundChannel.queueTotalGas**

arguments:

- key: `BridgeTypesGenericNetworkId`

returns: `U256`

<hr>

#### **api.query.bridgeOutboundChannel.channelNonces**

arguments:

- key: `BridgeTypesGenericNetworkId`

returns: `u64`

<hr>

#### **api.query.bridgeOutboundChannel.latestCommitment**

arguments:

- key: `BridgeTypesGenericNetworkId`

returns: `BridgeTypesGenericCommitmentWithBlock`

<hr>

#### **api.query.bridgeOutboundChannel.evmSubmitGas**

arguments:

- key: `H256`

returns: `U256`

<hr>

## Dispatch pallet

### _State Queries_

#### **api.query.dispatch.palletVersion**

> Returns the current pallet version from storage

arguments: -

returns: `u16`

<hr>

## EvmFungibleApp pallet

### _State Queries_

#### **api.query.evmFungibleApp.palletVersion**

> Returns the current pallet version from storage

arguments: -

returns: `u16`

<hr>

#### **api.query.evmFungibleApp.appAddresses**

arguments:

- key: `H256`

returns: `H160`

<hr>

#### **api.query.evmFungibleApp.assetKinds**

arguments:

- key: `(H256,CommonPrimitivesAssetId32)`

returns: `BridgeTypesAssetKind`

<hr>

#### **api.query.evmFungibleApp.tokenAddresses**

arguments:

- key: `(H256,CommonPrimitivesAssetId32)`

returns: `H160`

<hr>

#### **api.query.evmFungibleApp.assetsByAddresses**

arguments:

- key: `(H256,H160)`

returns: `CommonPrimitivesAssetId32`

<hr>

#### **api.query.evmFungibleApp.sidechainPrecision**

arguments:

- key: `(H256,CommonPrimitivesAssetId32)`

returns: `u8`

<hr>

#### **api.query.evmFungibleApp.collectedFees**

> Collected fees

arguments:

- key: `H256`

returns: `U256`

<hr>

#### **api.query.evmFungibleApp.baseFees**

> Base fees

arguments:

- key: `H256`

returns: `EvmFungibleAppBaseFeeInfo`

<hr>

#### **api.query.evmFungibleApp.spentFees**

> Fees spend by relayer

arguments:

- key: `(H256,H160)`

returns: `U256`

<hr>

### _Extrinsics_

#### **api.tx.evmFungibleApp.mint**

arguments:

- token: `H160`
- sender: `H160`
- recipient: `AccountId32`
- amount: `U256`
<hr>

#### **api.tx.evmFungibleApp.registerAssetInternal**

arguments:

- assetId: `CommonPrimitivesAssetId32`
- contract: `H160`
<hr>

#### **api.tx.evmFungibleApp.burn**

arguments:

- networkId: `H256`
- assetId: `CommonPrimitivesAssetId32`
- recipient: `H160`
- amount: `u128`
<hr>

#### **api.tx.evmFungibleApp.registerSidechainAsset**

arguments:

- networkId: `H256`
- address: `H160`
- symbol: `Bytes`
- name: `Bytes`
- decimals: `u8`
<hr>

#### **api.tx.evmFungibleApp.registerExistingSidechainAsset**

arguments:

- networkId: `H256`
- address: `H160`
- assetId: `CommonPrimitivesAssetId32`
- decimals: `u8`
<hr>

#### **api.tx.evmFungibleApp.registerThischainAsset**

arguments:

- networkId: `H256`
- assetId: `CommonPrimitivesAssetId32`
<hr>

#### **api.tx.evmFungibleApp.registerNetwork**

arguments:

- networkId: `H256`
- contract: `H160`
- symbol: `Bytes`
- name: `Bytes`
- sidechainPrecision: `u8`
<hr>

#### **api.tx.evmFungibleApp.registerNetworkWithExistingAsset**

arguments:

- networkId: `H256`
- contract: `H160`
- assetId: `CommonPrimitivesAssetId32`
- sidechainPrecision: `u8`
<hr>

#### **api.tx.evmFungibleApp.claimRelayerFees**

arguments:

- networkId: `H256`
- relayer: `H160`
- signature: `SpCoreEcdsaSignature`
<hr>

## JettonApp pallet

### _State Queries_

#### **api.query.jettonApp.palletVersion**

> Returns the current pallet version from storage

arguments: -

returns: `u16`

<hr>

#### **api.query.jettonApp.appInfo**

arguments: -

returns: `(BridgeTypesTonTonNetworkId,BridgeTypesTonTonAddress)`

<hr>

#### **api.query.jettonApp.assetKinds**

arguments:

- key: `CommonPrimitivesAssetId32`

returns: `BridgeTypesAssetKind`

<hr>

#### **api.query.jettonApp.tokenAddresses**

arguments:

- key: `CommonPrimitivesAssetId32`

returns: `BridgeTypesTonTonAddress`

<hr>

#### **api.query.jettonApp.assetsByAddresses**

arguments:

- key: `BridgeTypesTonTonAddress`

returns: `CommonPrimitivesAssetId32`

<hr>

#### **api.query.jettonApp.sidechainPrecision**

arguments:

- key: `CommonPrimitivesAssetId32`

returns: `u8`

<hr>

### _Extrinsics_

#### **api.tx.jettonApp.mint**

> Mint bridged tokens to user account
>
> Arguments:
>
> - `origin`: Bridge origin with information about network, source contract and etc.
> - `token`: Jetton master contract address, or 0:00..00 with prefix 0 for native TON asset
> - `sender`: Sender address on TON side
> - `recipient`: User account to mint tokens
> - `amount`: Amount of tokens to mint with TON network encoding and precision, so real amount could be different
>
> Fails if:
>
> - Origin network is not registered
> - Source contract (Jetton app) is not registered
> - Token is not registered
> - Sender or token address is wrong (for now we support only standart internal TON addresses)
> - Amount precision could not be adjusted to thischain
> - Failed to mint tokens for some reason

arguments:

- token: `BridgeTypesTonTonAddressWithPrefix`
- sender: `BridgeTypesTonTonAddressWithPrefix`
- recipient: `AccountId32`
- amount: `H128`
<hr>

#### **api.tx.jettonApp.registerNetwork**

> Register network with the new asset for native TON
>
> Arguments:
>
> - `origin`: Only root can call this extrinsic
> - `network_id`: TON network id
> - `contract`: Jetton App contract address
> - `symbol`: Asset symbol
> - `name`: Asset name
> - `decimals`: Sidechain precision of native TON
>
> Fails if:
>
> - Origin is not root
> - Network already registered
> - Can't register asset

arguments:

- networkId: `BridgeTypesTonTonNetworkId`
- contract: `BridgeTypesTonTonAddress`
- symbol: `Bytes`
- name: `Bytes`
- decimals: `u8`
<hr>

#### **api.tx.jettonApp.registerNetworkWithExistingAsset**

> Register network with the new asset for native TON
>
> Arguments:
>
> - `origin`: Only root can call this extrinsic
> - `network_id`: TON network id
> - `contract`: Jetton App contract address
> - `asset_id`: Existing TON asset id
> - `decimals`: Sidechain precision of native TON
>
> Fails if:
>
> - Origin is not root
> - Network already registered

arguments:

- networkId: `BridgeTypesTonTonNetworkId`
- contract: `BridgeTypesTonTonAddress`
- assetId: `CommonPrimitivesAssetId32`
- decimals: `u8`
<hr>

## BeefyLightClient pallet

### _State Queries_

#### **api.query.beefyLightClient.palletVersion**

> Returns the current pallet version from storage

arguments: -

returns: `u16`

<hr>

#### **api.query.beefyLightClient.latestMMRRoots**

arguments:

- key: `BridgeTypesSubNetworkId`

returns: `Vec<H256>`

<hr>

#### **api.query.beefyLightClient.latestBeefyBlock**

arguments:

- key: `BridgeTypesSubNetworkId`

returns: `u64`

<hr>

#### **api.query.beefyLightClient.latestRandomSeed**

arguments:

- key: `BridgeTypesSubNetworkId`

returns: `(H256,u32)`

<hr>

#### **api.query.beefyLightClient.currentValidatorSet**

arguments:

- key: `BridgeTypesSubNetworkId`

returns: `SpBeefyMmrBeefyAuthoritySet`

<hr>

#### **api.query.beefyLightClient.nextValidatorSet**

arguments:

- key: `BridgeTypesSubNetworkId`

returns: `SpBeefyMmrBeefyAuthoritySet`

<hr>

#### **api.query.beefyLightClient.thisNetworkId**

arguments: -

returns: `BridgeTypesSubNetworkId`

<hr>

### _Extrinsics_

#### **api.tx.beefyLightClient.initialize**

arguments:

- networkId: `BridgeTypesSubNetworkId`
- latestBeefyBlock: `u64`
- validatorSet: `SpBeefyMmrBeefyAuthoritySet`
- nextValidatorSet: `SpBeefyMmrBeefyAuthoritySet`
<hr>

#### **api.tx.beefyLightClient.submitSignatureCommitment**

arguments:

- networkId: `BridgeTypesSubNetworkId`
- commitment: `SpBeefyCommitment`
- validatorProof: `BridgeCommonBeefyTypesValidatorProof`
- latestMmrLeaf: `SpBeefyMmrMmrLeaf`
- proof: `BridgeCommonSimplifiedProofProof`
<hr>

## SubstrateBridgeInboundChannel pallet

### _State Queries_

#### **api.query.substrateBridgeInboundChannel.palletVersion**

> Returns the current pallet version from storage

arguments: -

returns: `u16`

<hr>

#### **api.query.substrateBridgeInboundChannel.channelNonces**

arguments:

- key: `BridgeTypesSubNetworkId`

returns: `u64`

<hr>

### _Extrinsics_

#### **api.tx.substrateBridgeInboundChannel.submit**

arguments:

- networkId: `BridgeTypesSubNetworkId`
- commitment: `BridgeTypesGenericCommitment`
- proof: `FramenodeRuntimeMultiProof`
<hr>

## SubstrateBridgeOutboundChannel pallet

### _State Queries_

#### **api.query.substrateBridgeOutboundChannel.palletVersion**

> Returns the current pallet version from storage

arguments: -

returns: `u16`

<hr>

#### **api.query.substrateBridgeOutboundChannel.interval**

> Interval between committing messages.

arguments: -

returns: `u32`

<hr>

#### **api.query.substrateBridgeOutboundChannel.messageQueues**

> Messages waiting to be committed. To update the queue, use `append_message_queue` and `take_message_queue` methods
> (to keep correct value in [QueuesTotalGas]).

arguments:

- key: `BridgeTypesSubNetworkId`

returns: `Vec<BridgeTypesSubstrateBridgeMessage>`

<hr>

#### **api.query.substrateBridgeOutboundChannel.channelNonces**

arguments:

- key: `BridgeTypesSubNetworkId`

returns: `u64`

<hr>

#### **api.query.substrateBridgeOutboundChannel.latestCommitment**

arguments:

- key: `BridgeTypesSubNetworkId`

returns: `BridgeTypesGenericCommitmentWithBlock`

<hr>

### _Extrinsics_

#### **api.tx.substrateBridgeOutboundChannel.updateInterval**

arguments:

- newInterval: `u32`
<hr>

## SubstrateDispatch pallet

### _State Queries_

#### **api.query.substrateDispatch.palletVersion**

> Returns the current pallet version from storage

arguments: -

returns: `u16`

<hr>

## ParachainBridgeApp pallet

### _State Queries_

#### **api.query.parachainBridgeApp.palletVersion**

> Returns the current pallet version from storage

arguments: -

returns: `u16`

<hr>

#### **api.query.parachainBridgeApp.assetKinds**

arguments:

- key: `(BridgeTypesSubNetworkId,CommonPrimitivesAssetId32)`

returns: `BridgeTypesAssetKind`

<hr>

#### **api.query.parachainBridgeApp.sidechainPrecision**

arguments:

- key: `(BridgeTypesSubNetworkId,CommonPrimitivesAssetId32)`

returns: `u8`

<hr>

#### **api.query.parachainBridgeApp.allowedParachainAssets**

arguments:

- key: `(BridgeTypesSubNetworkId,u32)`

returns: `Vec<CommonPrimitivesAssetId32>`

<hr>

#### **api.query.parachainBridgeApp.relaychainAsset**

arguments:

- key: `BridgeTypesSubNetworkId`

returns: `CommonPrimitivesAssetId32`

<hr>

### _Extrinsics_

#### **api.tx.parachainBridgeApp.mint**

arguments:

- assetId: `CommonPrimitivesAssetId32`
- sender: `Option<XcmVersionedMultiLocation>`
- recipient: `AccountId32`
- amount: `u128`
<hr>

#### **api.tx.parachainBridgeApp.finalizeAssetRegistration**

arguments:

- assetId: `CommonPrimitivesAssetId32`
- assetKind: `BridgeTypesAssetKind`
<hr>

#### **api.tx.parachainBridgeApp.burn**

arguments:

- networkId: `BridgeTypesSubNetworkId`
- assetId: `CommonPrimitivesAssetId32`
- recipient: `XcmVersionedMultiLocation`
- amount: `u128`
<hr>

#### **api.tx.parachainBridgeApp.registerThischainAsset**

arguments:

- networkId: `BridgeTypesSubNetworkId`
- assetId: `CommonPrimitivesAssetId32`
- sidechainAsset: `XcmV3MultiassetAssetId`
- allowedParachains: `Vec<u32>`
- minimalXcmAmount: `u128`
<hr>

#### **api.tx.parachainBridgeApp.registerSidechainAsset**

arguments:

- networkId: `BridgeTypesSubNetworkId`
- sidechainAsset: `XcmV3MultiassetAssetId`
- symbol: `Bytes`
- name: `Bytes`
- decimals: `u8`
- allowedParachains: `Vec<u32>`
- minimalXcmAmount: `u128`
<hr>

#### **api.tx.parachainBridgeApp.addAssetidParaid**

arguments:

- networkId: `BridgeTypesSubNetworkId`
- paraId: `u32`
- assetId: `CommonPrimitivesAssetId32`
<hr>

#### **api.tx.parachainBridgeApp.removeAssetidParaid**

arguments:

- networkId: `BridgeTypesSubNetworkId`
- paraId: `u32`
- assetId: `CommonPrimitivesAssetId32`
<hr>

#### **api.tx.parachainBridgeApp.updateTransactionStatus**

arguments:

- messageId: `H256`
- transferStatus: `BridgeTypesSubstrateXcmAppTransferStatus`
<hr>

#### **api.tx.parachainBridgeApp.setMinimumXcmIncomingAssetCount**

arguments:

- networkId: `BridgeTypesSubNetworkId`
- assetId: `CommonPrimitivesAssetId32`
- minimalXcmAmount: `u128`
<hr>

#### **api.tx.parachainBridgeApp.bindSidechainAsset**

arguments:

- networkId: `BridgeTypesSubNetworkId`
- assetId: `CommonPrimitivesAssetId32`
- sidechainAsset: `XcmV3MultiassetAssetId`
- sidechainPrecision: `u8`
- allowedParachains: `Vec<u32>`
- minimalXcmAmount: `u128`
<hr>

## BridgeDataSigner pallet

### _State Queries_

#### **api.query.bridgeDataSigner.palletVersion**

> Returns the current pallet version from storage

arguments: -

returns: `u16`

<hr>

#### **api.query.bridgeDataSigner.peers**

> Peers

arguments:

- key: `BridgeTypesGenericNetworkId`

returns: `BTreeSet<SpCoreEcdsaPublic>`

<hr>

#### **api.query.bridgeDataSigner.pendingPeerUpdate**

> Pending peers

arguments:

- key: `BridgeTypesGenericNetworkId`

returns: `bool`

<hr>

#### **api.query.bridgeDataSigner.approvals**

> Approvals

arguments:

- key: `(BridgeTypesGenericNetworkId,H256)`

returns: `BTreeMap<SpCoreEcdsaPublic, SpCoreEcdsaSignature>`

<hr>

### _Extrinsics_

#### **api.tx.bridgeDataSigner.registerNetwork**

arguments:

- networkId: `BridgeTypesGenericNetworkId`
- peers: `Vec<SpCoreEcdsaPublic>`
<hr>

#### **api.tx.bridgeDataSigner.approve**

arguments:

- networkId: `BridgeTypesGenericNetworkId`
- data: `H256`
- signature: `SpCoreEcdsaSignature`
<hr>

#### **api.tx.bridgeDataSigner.addPeer**

arguments:

- networkId: `BridgeTypesGenericNetworkId`
- peer: `SpCoreEcdsaPublic`
<hr>

#### **api.tx.bridgeDataSigner.removePeer**

arguments:

- networkId: `BridgeTypesGenericNetworkId`
- peer: `SpCoreEcdsaPublic`
<hr>

#### **api.tx.bridgeDataSigner.finishRemovePeer**

arguments:

- peer: `SpCoreEcdsaPublic`
<hr>

#### **api.tx.bridgeDataSigner.finishAddPeer**

arguments:

- peer: `SpCoreEcdsaPublic`
<hr>

## MultisigVerifier pallet

### _State Queries_

#### **api.query.multisigVerifier.palletVersion**

> Returns the current pallet version from storage

arguments: -

returns: `u16`

<hr>

#### **api.query.multisigVerifier.peerKeys**

arguments:

- key: `BridgeTypesGenericNetworkId`

returns: `BTreeSet<SpCoreEcdsaPublic>`

<hr>

### _Extrinsics_

#### **api.tx.multisigVerifier.initialize**

arguments:

- networkId: `BridgeTypesGenericNetworkId`
- peers: `Vec<SpCoreEcdsaPublic>`
<hr>

#### **api.tx.multisigVerifier.addPeer**

arguments:

- peer: `SpCoreEcdsaPublic`
<hr>

#### **api.tx.multisigVerifier.removePeer**

arguments:

- peer: `SpCoreEcdsaPublic`
<hr>

## SubstrateBridgeApp pallet

### _State Queries_

#### **api.query.substrateBridgeApp.palletVersion**

> Returns the current pallet version from storage

arguments: -

returns: `u16`

<hr>

#### **api.query.substrateBridgeApp.assetKinds**

arguments:

- key: `(BridgeTypesSubNetworkId,CommonPrimitivesAssetId32)`

returns: `BridgeTypesAssetKind`

<hr>

#### **api.query.substrateBridgeApp.sidechainPrecision**

arguments:

- key: `(BridgeTypesSubNetworkId,CommonPrimitivesAssetId32)`

returns: `u8`

<hr>

#### **api.query.substrateBridgeApp.sidechainAssetId**

arguments:

- key: `(BridgeTypesSubNetworkId,CommonPrimitivesAssetId32)`

returns: `BridgeTypesGenericAssetId`

<hr>

#### **api.query.substrateBridgeApp.thischainAssetId**

arguments:

- key: `(BridgeTypesSubNetworkId,BridgeTypesGenericAssetId)`

returns: `CommonPrimitivesAssetId32`

<hr>

### _Extrinsics_

#### **api.tx.substrateBridgeApp.mint**

> Function used to mint or unlock tokens
> The Origin for this call is the Bridge Origin
> Only the relayer can call this function

arguments:

- assetId: `CommonPrimitivesAssetId32`
- sender: `BridgeTypesGenericAccount`
- recipient: `AccountId32`
- amount: `BridgeTypesGenericBalance`
<hr>

#### **api.tx.substrateBridgeApp.finalizeAssetRegistration**

> Function used to finalize asset registration if everything went well on the sidechain
> The Origin for this call is the Bridge Origin
> Only the relayer can call this function

arguments:

- assetId: `CommonPrimitivesAssetId32`
- sidechainAssetId: `BridgeTypesGenericAssetId`
- assetKind: `BridgeTypesAssetKind`
- sidechainPrecision: `u8`
<hr>

#### **api.tx.substrateBridgeApp.incomingThischainAssetRegistration**

> Function used to register this chain asset
> The Origin for this call is the Bridge Origin
> Only the relayer can call this function
> Sends the message to sidechain to finalize asset registration

arguments:

- assetId: `CommonPrimitivesAssetId32`
- sidechainAssetId: `BridgeTypesGenericAssetId`
<hr>

#### **api.tx.substrateBridgeApp.burn**

> Function used by users to send tokens to the sidechain

arguments:

- networkId: `BridgeTypesSubNetworkId`
- assetId: `CommonPrimitivesAssetId32`
- recipient: `BridgeTypesGenericAccount`
- amount: `u128`
<hr>

#### **api.tx.substrateBridgeApp.registerSidechainAsset**

> Function used to register sidechain asset
> The Origin for this call is the Root Origin
> Only the root can call this function
> Sends the message to sidechain to register asset

arguments:

- networkId: `BridgeTypesSubNetworkId`
- sidechainAsset: `BridgeTypesGenericAssetId`
- symbol: `Bytes`
- name: `Bytes`
<hr>

#### **api.tx.substrateBridgeApp.updateTransactionStatus**

> Function used to update transaction status
> The Origin for this call is the Bridge Origin
> Only the relayer can call this function

arguments:

- messageId: `H256`
- messageStatus: `BridgeTypesMessageStatus`
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

returns: `Vec<SpBeefyCryptoPublic>`

<hr>

#### **api.query.beefy.validatorSetId**

> The current validator set id

arguments: -

returns: `u64`

<hr>

#### **api.query.beefy.nextAuthorities**

> Authorities set scheduled to be used with the next session

arguments: -

returns: `Vec<SpBeefyCryptoPublic>`

<hr>

### _Custom RPCs_

#### **api.rpc.beefy.getFinalizedHead**

> Returns hash of the latest BEEFY finalized block as seen by this client.

arguments: -

returns: `H256`

<hr>

#### **api.rpc.beefy.subscribeJustifications**

> Returns the block most recently finalized by BEEFY, alongside side its justification.

arguments: -

returns: `BeefySignedCommitment`

<hr>

## MmrLeaf pallet

### _State Queries_

#### **api.query.mmrLeaf.palletVersion**

> Returns the current pallet version from storage

arguments: -

returns: `u16`

<hr>

#### **api.query.mmrLeaf.beefyAuthorities**

> Details of current BEEFY authority set.

arguments: -

returns: `SpBeefyMmrBeefyAuthoritySet`

<hr>

#### **api.query.mmrLeaf.beefyNextAuthorities**

> Details of next BEEFY authority set.
>
> This storage entry is used as cache for calls to `update_beefy_next_authority_set`.

arguments: -

returns: `SpBeefyMmrBeefyAuthoritySet`

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
- weight: `SpWeightsWeightV2Weight`
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

## ApolloPlatform pallet

### _State Queries_

#### **api.query.apolloPlatform.palletVersion**

> Returns the current pallet version from storage

arguments: -

returns: `u16`

<hr>

#### **api.query.apolloPlatform.userLendingInfo**

> Lent asset -> AccountId -> LendingPosition

arguments:

- key: `(CommonPrimitivesAssetId32,AccountId32)`

returns: `ApolloPlatformLendingPosition`

<hr>

#### **api.query.apolloPlatform.userBorrowingInfo**

> Borrowed asset -> AccountId -> (Collateral asset, BorrowingPosition)

arguments:

- key: `(CommonPrimitivesAssetId32,AccountId32)`

returns: `BTreeMap<CommonPrimitivesAssetId32, ApolloPlatformBorrowingPosition>`

<hr>

#### **api.query.apolloPlatform.poolData**

arguments:

- key: `CommonPrimitivesAssetId32`

returns: `ApolloPlatformPoolInfo`

<hr>

#### **api.query.apolloPlatform.poolsByBlock**

> BlockNumber -> AssetId (for updating pools interests by block)

arguments:

- key: `u32`

returns: `CommonPrimitivesAssetId32`

<hr>

#### **api.query.apolloPlatform.authorityAccount**

arguments: -

returns: `AccountId32`

<hr>

#### **api.query.apolloPlatform.treasuryAccount**

arguments: -

returns: `AccountId32`

<hr>

#### **api.query.apolloPlatform.lendingRewards**

> Default lending rewards

arguments: -

returns: `u128`

<hr>

#### **api.query.apolloPlatform.borrowingRewards**

> Default borrowing rewards

arguments: -

returns: `u128`

<hr>

#### **api.query.apolloPlatform.lendingRewardsPerBlock**

> Default lending rewards per block

arguments: -

returns: `u128`

<hr>

#### **api.query.apolloPlatform.borrowingRewardsPerBlock**

> Default borrowing rewards

arguments: -

returns: `u128`

<hr>

### _Extrinsics_

#### **api.tx.apolloPlatform.addPool**

> Add pool

arguments:

- assetId: `CommonPrimitivesAssetId32`
- loanToValue: `u128`
- liquidationThreshold: `u128`
- optimalUtilizationRate: `u128`
- baseRate: `u128`
- slopeRate1: `u128`
- slopeRate2: `u128`
- reserveFactor: `u128`
<hr>

#### **api.tx.apolloPlatform.lend**

> Lend token

arguments:

- lendingAsset: `CommonPrimitivesAssetId32`
- lendingAmount: `u128`
<hr>

#### **api.tx.apolloPlatform.borrow**

> Borrow token

arguments:

- collateralAsset: `CommonPrimitivesAssetId32`
- borrowingAsset: `CommonPrimitivesAssetId32`
- borrowingAmount: `u128`
- loanToValue: `u128`
<hr>

#### **api.tx.apolloPlatform.getRewards**

> Get rewards

arguments:

- assetId: `CommonPrimitivesAssetId32`
- isLending: `bool`
<hr>

#### **api.tx.apolloPlatform.withdraw**

> Withdraw

arguments:

- withdrawnAsset: `CommonPrimitivesAssetId32`
- withdrawnAmount: `u128`
<hr>

#### **api.tx.apolloPlatform.repay**

> Repay

arguments:

- collateralAsset: `CommonPrimitivesAssetId32`
- borrowingAsset: `CommonPrimitivesAssetId32`
- amountToRepay: `u128`
<hr>

#### **api.tx.apolloPlatform.changeRewardsAmount**

> Change rewards amount

arguments:

- isLending: `bool`
- amount: `u128`
<hr>

#### **api.tx.apolloPlatform.changeRewardsPerBlock**

> Change rewards per block

arguments:

- isLending: `bool`
- amount: `u128`
<hr>

#### **api.tx.apolloPlatform.liquidate**

> Liquidate

arguments:

- user: `AccountId32`
- assetId: `CommonPrimitivesAssetId32`
<hr>

#### **api.tx.apolloPlatform.removePool**

> Remove pool

arguments:

- assetIdToRemove: `CommonPrimitivesAssetId32`
<hr>

#### **api.tx.apolloPlatform.editPoolInfo**

> Edit pool info

arguments:

- assetId: `CommonPrimitivesAssetId32`
- newLoanToValue: `u128`
- newLiquidationThreshold: `u128`
- newOptimalUtilizationRate: `u128`
- newBaseRate: `u128`
- newSlopeRate1: `u128`
- newSlopeRate2: `u128`
- newReserveFactor: `u128`
- newTl: `u128`
- newTb: `u128`
- newTc: `u128`
<hr>

#### **api.tx.apolloPlatform.addCollateral**

> Add more collateral to borrowing position

arguments:

- collateralAsset: `CommonPrimitivesAssetId32`
- collateralAmount: `u128`
- borrowingAsset: `CommonPrimitivesAssetId32`
<hr>

## ExtendedAssets pallet

### _State Queries_

#### **api.query.extendedAssets.palletVersion**

> Returns the current pallet version from storage

arguments: -

returns: `u16`

<hr>

#### **api.query.extendedAssets.soulboundAsset**

> Mapping from SBT (asset_id) to its metadata

arguments:

- key: `CommonPrimitivesAssetId32`

returns: `ExtendedAssetsSoulboundTokenMetadata`

<hr>

#### **api.query.extendedAssets.regulatedAssetToSoulboundAsset**

> Mapping from Regulated asset id to SBT asset id

arguments:

- key: `CommonPrimitivesAssetId32`

returns: `CommonPrimitivesAssetId32`

<hr>

#### **api.query.extendedAssets.sbtExpiration**

> Mapping from SBT asset id to its expiration per account

arguments:

- key: `(AccountId32,CommonPrimitivesAssetId32)`

returns: `u64`

<hr>

### _Extrinsics_

#### **api.tx.extendedAssets.registerRegulatedAsset**

> Registers a new regulated asset, representing that the asset will only operate between KYC-verified wallets.
>
> ## Parameters
>
> - `origin`: The origin of the transaction.
> - `symbol`: AssetSymbol should represent string with only uppercase latin chars with max length of 7.
> - `name`: AssetName should represent string with only uppercase or lowercase latin chars or numbers or spaces, with max length of 33.
> - `initial_supply`: Balance type representing the total amount of the asset to be issued initially.
> - `is_indivisible`: A boolean flag indicating whether the asset can be divided into smaller units or not.
> - `opt_content_src`: An optional parameter of type `ContentSource`, which can include a URI or a reference to a content source that provides more details about the asset.
> - `opt_desc`: An optional parameter of type `Description`, which is a string providing a short description or commentary about the asset.
>
> ## Events
>
> Emits `RegulatedAssetRegistered` event when the asset is successfully registered.

arguments:

- symbol: `Bytes`
- name: `Bytes`
- initialSupply: `u128`
- isMintable: `bool`
- isIndivisible: `bool`
- optContentSrc: `Option<Bytes>`
- optDesc: `Option<Bytes>`
<hr>

#### **api.tx.extendedAssets.issueSbt**

> Issues a new Soulbound Token (SBT).
>
> ## Parameters
>
> - `origin`: The origin of the transaction.
> - `symbol`: The symbol of the SBT which should represent a string with only uppercase Latin characters with a maximum length of 7.
> - `name`: The name of the SBT which should represent a string with only uppercase or lowercase Latin characters, numbers, or spaces, with a maximum length of 33.
> - `description`: The description of the SBT. (Optional)
> - `image`: The URL or identifier for the image associated with the SBT. (Optional)
> - `external_url`: The URL pointing to an external resource related to the SBT. (Optional)

arguments:

- symbol: `Bytes`
- name: `Bytes`
- description: `Option<Bytes>`
- image: `Option<Bytes>`
- externalUrl: `Option<Bytes>`
<hr>

#### **api.tx.extendedAssets.setSbtExpiration**

> Sets the expiration date of a Soulbound Token (SBT) for the given account.
>
> ## Parameters
>
> - `origin`: The origin of the transaction.
> - `asset_id`: The ID of the SBT to update.
> - `account_id`: The ID of the account to set the expiration for.
> - `new_expires_at`: The new expiration timestamp for the SBT.

arguments:

- accountId: `AccountId32`
- sbtAssetId: `CommonPrimitivesAssetId32`
- newExpiresAt: `Option<u64>`
<hr>

#### **api.tx.extendedAssets.bindRegulatedAssetToSbt**

> Binds a regulated asset to a Soulbound Token (SBT).
>
> This function binds a regulated asset to a specified SBT, ensuring the asset and
> the SBT meet the required criteria.
>
> ## Parameters
>
> - `origin`: The origin of the transaction.
> - `sbt_asset_id`: The ID of the SBT to bind the regulated asset to.
> - `regulated_asset_id`: The ID of the regulated asset to bind.

arguments:

- sbtAssetId: `CommonPrimitivesAssetId32`
- regulatedAssetId: `CommonPrimitivesAssetId32`
<hr>

#### **api.tx.extendedAssets.regulateAsset**

> Marks an asset as regulated, representing that the asset will only operate between KYC-verified wallets.
>
> ## Parameters
>
> - `origin`: The origin of the transaction.
> - `asset_id`: The identifier of the asset.

arguments:

- assetId: `CommonPrimitivesAssetId32`
<hr>

## Soratopia pallet

### _State Queries_

#### **api.query.soratopia.palletVersion**

> Returns the current pallet version from storage

arguments: -

returns: `u16`

<hr>

### _Extrinsics_

#### **api.tx.soratopia.checkIn**

> Soratopia on-chain check in.
> Transfers XOR from caller to admin account.

arguments: -

<hr>

## Utility pallet

### _Extrinsics_

#### **api.tx.utility.batch**

> Send a batch of dispatch calls.
>
> May be called from any origin except `None`.
>
> - `calls`: The calls to be dispatched from the same origin. The number of call must not
>   exceed the constant: `batched_calls_limit` (available in constant metadata).
>
> If origin is root then the calls are dispatched without checking origin filter. (This
> includes bypassing `frame_system::Config::BaseCallFilter`).
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
> May be called from any origin except `None`.
>
> - `calls`: The calls to be dispatched from the same origin. The number of call must not
>   exceed the constant: `batched_calls_limit` (available in constant metadata).
>
> If origin is root then the calls are dispatched without checking origin filter. (This
> includes bypassing `frame_system::Config::BaseCallFilter`).
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
> May be called from any origin except `None`.
>
> - `calls`: The calls to be dispatched from the same origin. The number of call must not
>   exceed the constant: `batched_calls_limit` (available in constant metadata).
>
> If origin is root then the calls are dispatch without checking origin filter. (This
> includes bypassing `frame_system::Config::BaseCallFilter`).
>
> # <weight>
>
> - Complexity: O(C) where C is the number of calls to be batched.
>
> # </weight>

arguments:

- calls: `Vec<Call>`
<hr>

#### **api.tx.utility.withWeight**

> Dispatch a function call with a specified weight.
>
> This function does not check the weight of the call, and instead allows the
> Root origin to specify the weight of the call.
>
> The dispatch origin for this call must be _Root_.

arguments:

- call: `Call`
- weight: `SpWeightsWeightV2Weight`
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

#### **api.tx.liquidityProxy.swapTransferBatch**

> Dispatches multiple swap & transfer operations. `swap_batches` contains vector of
> SwapBatchInfo structs, where each batch specifies which asset ID and DEX ID should
> be used for swapping, receiver accounts and their desired outcome amount in asset,
> specified for the current batch.
>
> - `origin`: the account on whose behalf the transaction is being executed,
> - `swap_batches`: the vector containing the SwapBatchInfo structs,
> - `input_asset_id`: ID of the asset being sold,
> - `max_input_amount`: the maximum amount to be sold in input_asset_id,
> - `selected_source_types`: list of selected LiquiditySource types, selection effect is
>   determined by filter_mode,
> - `filter_mode`: indicate either to allow or forbid selected types only, or disable filtering.
> - `additional_data`: data to include in swap success event.

arguments:

- swapBatches: `Vec<LiquidityProxySwapBatchInfo>`
- inputAssetId: `CommonPrimitivesAssetId32`
- maxInputAmount: `u128`
- selectedSourceTypes: `Vec<CommonPrimitivesLiquiditySourceType>`
- filterMode: `CommonPrimitivesFilterMode`
- additionalData: `Option<Bytes>`
<hr>

#### **api.tx.liquidityProxy.enableLiquiditySource**

> Enables XST or TBC liquidity source.
>
> - `liquidity_source`: the liquidity source to be enabled.

arguments:

- liquiditySource: `CommonPrimitivesLiquiditySourceType`
<hr>

#### **api.tx.liquidityProxy.disableLiquiditySource**

> Disables XST or TBC liquidity source. The liquidity source becomes unavailable for swap.
>
> - `liquidity_source`: the liquidity source to be disabled.

arguments:

- liquiditySource: `CommonPrimitivesLiquiditySourceType`
<hr>

#### **api.tx.liquidityProxy.setAdarCommissionRatio**

arguments:

- commissionRatio: `u128`
<hr>

#### **api.tx.liquidityProxy.xorlessTransfer**

> Extrinsic which is enable XORless transfers.
> Internally it's swaps `asset_id` to `desired_xor_amount` of `XOR` and transfers remaining amount of `asset_id` to `receiver`.
> Client apps should specify the XOR amount which should be paid as a fee in `desired_xor_amount` parameter.
> If sender will not have enough XOR to pay fees after execution, transaction will be rejected.
> This extrinsic is done as temporary solution for XORless transfers, in future it would be removed
> and logic for XORless extrinsics should be moved to xor-fee pallet.

arguments:

- dexId: `u32`
- assetId: `CommonPrimitivesAssetId32`
- receiver: `AccountId32`
- amount: `u128`
- desiredXorAmount: `u128`
- maxAmountIn: `u128`
- selectedSourceTypes: `Vec<CommonPrimitivesLiquiditySourceType>`
- filterMode: `CommonPrimitivesFilterMode`
- additionalData: `Option<Bytes>`
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

#### **api.tx.faucet.updateLimit**

arguments:

- newLimit: `u128`
<hr>

## QaTools pallet

### _Extrinsics_

#### **api.tx.qaTools.orderBookCreateAndFillBatch**

> Create multiple many order books with parameters and fill them according to given parameters.
>
> Balance for placing the orders is minted automatically, trading pairs are
> created if needed.
>
> In order to create empty order books, one can leave settings empty.
>
> Parameters:
>
> - `origin`: root
> - `bids_owner`: Creator of the buy orders placed on the order books,
> - `asks_owner`: Creator of the sell orders placed on the order books,
> - `settings`: Parameters for creation of the order book and placing the orders in each order book.

arguments:

- bidsOwner: `AccountId32`
- asksOwner: `AccountId32`
- settings: `Vec<(OrderBookOrderBookId,QaToolsPalletToolsOrderBookOrderBookAttributes,QaToolsPalletToolsOrderBookFillInput)>`
<hr>

#### **api.tx.qaTools.orderBookFillBatch**

> Fill the order books according to given parameters.
>
> Balance for placing the orders is minted automatically.
>
> Parameters:
>
> - `origin`: root
> - `bids_owner`: Creator of the buy orders placed on the order books,
> - `asks_owner`: Creator of the sell orders placed on the order books,
> - `settings`: Parameters for placing the orders in each order book.

arguments:

- bidsOwner: `AccountId32`
- asksOwner: `AccountId32`
- settings: `Vec<(OrderBookOrderBookId,QaToolsPalletToolsOrderBookFillInput)>`
<hr>

#### **api.tx.qaTools.xykInitialize**

> Initialize xyk pool liquidity source.
>
> Parameters:
>
> - `origin`: Root
> - `account`: Some account to use during the initialization
> - `pairs`: Asset pairs to initialize.

arguments:

- account: `AccountId32`
- pairs: `Vec<QaToolsPalletToolsPoolXykAssetPairInput>`
<hr>

#### **api.tx.qaTools.xstInitialize**

> Initialize xst liquidity source. In xst's `quote`, one of the assets is the synthetic base
> (XST) and the other one is a synthetic asset.
>
> Parameters:
>
> - `origin`: Root
> - `base_prices`: Synthetic base asset price update. Usually buy price > sell.
> - `synthetics_prices`: Synthetic initialization;
>   registration of an asset + setting up prices for target quotes.
> - `relayer`: Account which will be the author of prices fed to `band` pallet;
>
> Emits events with actual quotes achieved after initialization;
> more details in [`liquidity_sources::initialize_xst`]

arguments:

- basePrices: `Option<QaToolsPalletToolsXstBaseInput>`
- syntheticsPrices: `Vec<QaToolsPalletToolsXstSyntheticInput>`
- relayer: `AccountId32`
<hr>

#### **api.tx.qaTools.mcbcInitialize**

> Initialize mcbc liquidity source.
>
> Parameters:
>
> - `origin`: Root
> - `base_supply`: Control supply of XOR,
> - `other_collaterals`: Variables related to arbitrary collateral-specific pricing,
> - `tbcd_collateral`: TBCD-specific pricing variables.

arguments:

- baseSupply: `Option<QaToolsPalletToolsMcbcBaseSupply>`
- otherCollaterals: `Vec<QaToolsPalletToolsMcbcOtherCollateralInput>`
- tbcdCollateral: `Option<QaToolsPalletToolsMcbcTbcdCollateralInput>`
<hr>

#### **api.tx.qaTools.priceToolsSetAssetPrice**

> Set prices of an asset in `price_tools` pallet.
> Ignores pallet restrictions on price speed change.
>
> Parameters:
>
> - `origin`: Root
> - `asset_per_xor`: Prices (1 XOR in terms of the corresponding asset).
> - `asset_id`: Asset identifier; can be some common constant for easier input.

arguments:

- assetPerXor: `QaToolsPalletToolsPriceToolsAssetPrices`
- assetId: `QaToolsInputAssetId`
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

#### **api.rpc.author.insertKey**

> Insert a key into the keystore.

arguments:

- keyType: `Text`
- suri: `Text`
- publicKey: `Bytes`

returns: `Bytes`

<hr>

#### **api.rpc.author.pendingExtrinsics**

> Returns all pending extrinsics, potentially grouped by sender

arguments: -

returns: `Vec<Extrinsic>`

<hr>

#### **api.rpc.author.removeExtrinsic**

> Remove given extrinsic from the pool and temporarily ban it to prevent reimporting

arguments:

- bytesOrHash: `Vec<ExtrinsicOrHash>`

returns: `Vec<Hash>`

<hr>

#### **api.rpc.author.rotateKeys**

> Generate new session keys and returns the corresponding public keys

arguments: -

returns: `Bytes`

<hr>

#### **api.rpc.author.submitAndWatchExtrinsic**

> Submit and subscribe to watch an extrinsic until unsubscribed

arguments:

- extrinsic: `Extrinsic`

returns: `ExtrinsicStatus`

<hr>

#### **api.rpc.author.submitExtrinsic**

> Submit a fully formatted extrinsic for block inclusion

arguments:

- extrinsic: `Extrinsic`

returns: `Hash`

<hr>

## Chain pallet

### _Custom RPCs_

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

#### **api.rpc.chain.getHeader**

> Retrieves the header for a specific block

arguments:

- hash: `BlockHash`

returns: `Header`

<hr>

#### **api.rpc.chain.subscribeAllHeads**

> Retrieves the newest header via subscription

arguments: -

returns: `Header`

<hr>

#### **api.rpc.chain.subscribeFinalizedHeads**

> Retrieves the best finalized header via subscription

arguments: -

returns: `Header`

<hr>

#### **api.rpc.chain.subscribeNewHeads**

> Retrieves the best header via subscription

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

#### **api.rpc.offchain.localStorageGet**

> Get offchain local storage under given key and prefix

arguments:

- kind: `StorageKind`
- key: `Bytes`

returns: `Option<Bytes>`

<hr>

#### **api.rpc.offchain.localStorageSet**

> Set offchain local storage under given key and prefix

arguments:

- kind: `StorageKind`
- key: `Bytes`
- value: `Bytes`

returns: `Null`

<hr>

## Payment pallet

### _Custom RPCs_

#### **api.rpc.payment.queryFeeDetails**

> Query the detailed fee of a given encoded extrinsic

arguments:

- extrinsic: `Bytes`
- at: `BlockHash`

returns: `FeeDetails`

<hr>

#### **api.rpc.payment.queryInfo**

> Retrieves the fee information for an encoded extrinsic

arguments:

- extrinsic: `Bytes`
- at: `BlockHash`

returns: `RuntimeDispatchInfoV1`

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

#### **api.rpc.state.getChildReadProof**

> Returns proof of storage for child key entries at a specific block state.

arguments:

- childStorageKey: `PrefixedStorageKey`
- keys: `Vec<StorageKey>`
- at: `BlockHash`

returns: `ReadProof`

<hr>

#### **api.rpc.state.getKeys**

> Retrieves the keys with a certain prefix

arguments:

- key: `StorageKey`
- at: `BlockHash`

returns: `Vec<StorageKey>`

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

#### **api.rpc.state.getMetadata**

> Returns the runtime metadata

arguments:

- at: `BlockHash`

returns: `Metadata`

<hr>

#### **api.rpc.state.getPairs**

> Returns the keys with prefix, leave empty to get all the keys (deprecated: Use getKeysPaged)

arguments:

- prefix: `StorageKey`
- at: `BlockHash`

returns: `Vec<KeyValue>`

<hr>

#### **api.rpc.state.getReadProof**

> Returns proof of storage entries at a specific block state

arguments:

- keys: `Vec<StorageKey>`
- at: `BlockHash`

returns: `ReadProof`

<hr>

#### **api.rpc.state.getRuntimeVersion**

> Get the runtime version

arguments:

- at: `BlockHash`

returns: `RuntimeVersion`

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
"Text"
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
"Text"
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

### BridgeAppInfo

```
{
    _enum: {
        EVM: "(GenericNetworkId, EVMAppInfo)",
        Sub: "(GenericNetworkId)"
    }
}
```

### BridgeAssetInfo

```
{
    _enum: {
        EVMLegacy: "EVMLegacyAssetInfo",
        EVM: "EVMAssetInfo",
        Sub: "SubAssetInfo"
    }
}
```

### BridgeNetworkId

```
"u32"
```

### BridgeSignatureVersion

```
{
    _enum: [
        "V1",
        "V2",
        "V3"
    ]
}
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

### EVMAppInfo

```
{
    evmAddress: "H160",
    appKind: "EVMAppKind"
}
```

### EVMAppKind

```
{
    _enum: [
        "EthApp",
        "FaApp",
        "HashiBridge",
        "XorMaster",
        "ValMaster"
    ]
}
```

### EVMAssetInfo

```
{
    assetId: "MainnetAssetId",
    evmAddress: "H160",
    appKind: "EVMAppKind",
    precision: "u8"
}
```

### EVMChainId

```
"H256"
```

### EVMLegacyAssetInfo

```
{
    assetId: "MainnetAssetId",
    evmAddress: "H160",
    appKind: "EVMAppKind",
    precision: "Option<u8>"
}
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

### GenericNetworkId

```
{
    _enum: {
        EVMLegacy: "u32",
        EVM: "EVMChainId",
        Sub: "SubNetworkId"
    }
}
```

### HermesPollInfo

```
{
    creator: "AccountId",
    hermesLocked: "Balance",
    pollStartTimestamp: "Moment",
    pollEndTimestamp: "Moment",
    title: "String",
    description: "String",
    creatorHermesWithdrawn: "bool"
}
```

### HermesVotingInfo

```
{
    votingOption: "VotingOption",
    numberOfHermes: "Balance",
    hermesWithdrawn: "bool"
}
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
    finishTimestamp: "Moment",
    baseAsset: "AssetId"
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
    amountWithoutImpact: "Balance",
    fee: "OutcomeFee",
    rewards: "Vec<LPRewardsInfo>",
    route: "Vec<AssetId>"
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
        "XSTPool",
        "OrderBook"
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

### MainnetAssetId

```
"H256"
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

### OutcomeFee

```
"BTreeMap<AssetId, Balance>"
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
    isRemoved: "bool",
    baseAsset: "AssetId"
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
        "XSTUSD",
        "XST",
        "TBCD",
        "KEN",
        "KUSD",
        "KGOLD",
        "KXOR",
        "KARMA"
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

### SubAssetInfo

```
{
    assetId: "MainnetAssetId",
    assetKind: "SubAssetKind",
    precision: "u8"
}
```

### SubAssetKind

```
{
    _enum: [
        "Thischain",
        "Sidechain"
    ]
}
```

### SubNetworkId

```
{
    _enum: {
        Mainnet: null,
        Kusama: null,
        Polkadot: null,
        Rococo: null,
        Liberland: null,
        Alphanet: null,
        Custom: "u32"
    }
}
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
    rewards: "Balance",
    baseAsset: "AssetId"
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

### VotingOption

```
{
    _enum: [
        "Yes",
        "No"
    ]
}
```
