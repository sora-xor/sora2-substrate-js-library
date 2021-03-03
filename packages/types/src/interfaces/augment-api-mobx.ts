// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

import type { BTreeSet, Bytes, Option, Text, U8aFixed, Vec, bool, u32, u64, u8 } from '@polkadot/types';
import type { AnyNumber, ITuple } from '@polkadot/types/types';
import type { UncleEntryItem } from '@polkadot/types/interfaces/authorship';
import type { BabeAuthorityWeight, MaybeRandomness, NextConfigDescriptor, Randomness } from '@polkadot/types/interfaces/babe';
import type { AccountData, BalanceLock } from '@polkadot/types/interfaces/balances';
import type { AuthorityId } from '@polkadot/types/interfaces/consensus';
import type { SetId, StoredPendingChange, StoredState } from '@polkadot/types/interfaces/grandpa';
import type { NetworkId } from '@polkadot/types/interfaces/parachains';
import type { Keys, SessionIndex } from '@polkadot/types/interfaces/session';
import type { ActiveEraInfo, ElectionResult, ElectionScore, ElectionStatus, EraIndex, EraRewardPoints, Exposure, Forcing, Nominations, RewardDestination, SlashingSpans, SpanIndex, SpanRecord, StakingLedger, UnappliedSlash, ValidatorPrefs } from '@polkadot/types/interfaces/staking';
import type { AccountInfo, DigestOf, EventIndex, EventRecord, LastRuntimeUpgradeInfo, Phase } from '@polkadot/types/interfaces/system';
import type { Multiplier } from '@polkadot/types/interfaces/txpayment';
import type { Multisig, Timepoint } from '@polkadot/types/interfaces/utility';
import type { AssetKind, IncomingRequest, OffchainRequest, RequestStatus, SignatureParams } from '@sora-substrate/types/interfaces/ethBridge';
import type { AccountId, Address, AssetId, AssetId32, AssetSymbol, Balance, BalanceOf, BalancePrecision, BlockNumber, CurrencyId, DEXId, DEXInfo, DistributionAccounts, Duration, ExtrinsicsWeight, Farm, FarmId, Farmer, Fixed, H256, Hash, HolderId, KeyTypeId, LiquiditySourceType, Mode, Moment, MultiCurrencyBalanceOf, MultisigAccount, OpaqueCall, OwnerId, PendingMultisigAccount, Perbill, PermissionId, Releases, Scope, SmoothPriceState, TechAccountId, TradingPair, ValidatorId } from '@sora-substrate/types/interfaces/runtime';
import type { BaseStorageType, StorageDoubleMap, StorageMap } from '@open-web3/api-mobx';

export interface StorageType extends BaseStorageType {
  assets: {    /**
     * Asset Id -> (Symbol, Precision, Is Mintable)
     **/
    assetInfos: StorageMap<AssetId | AnyNumber, ITuple<[AssetSymbol, BalancePrecision, bool]>>;
    /**
     * Asset Id -> Owner Account Id
     **/
    assetOwners: StorageMap<AssetId | AnyNumber, AccountId>;
  };
  authorship: {    /**
     * Author of current block.
     **/
    author: Option<AccountId> | null;
    /**
     * Whether uncles were already set in this block.
     **/
    didSetUncles: bool | null;
    /**
     * Uncles
     **/
    uncles: Vec<UncleEntryItem> | null;
  };
  babe: {    /**
     * Current epoch authorities.
     **/
    authorities: Vec<ITuple<[AuthorityId, BabeAuthorityWeight]>> | null;
    /**
     * Current slot number.
     **/
    currentSlot: u64 | null;
    /**
     * Current epoch index.
     **/
    epochIndex: u64 | null;
    /**
     * The slot at which the first epoch actually started. This is 0
     * until the first block of the chain.
     **/
    genesisSlot: u64 | null;
    /**
     * Temporary value (cleared at block finalization) which is `Some`
     * if per-block initialization has already been called for current block.
     **/
    initialized: Option<MaybeRandomness> | null;
    /**
     * How late the current block is compared to its parent.
     * 
     * This entry is populated as part of block execution and is cleaned up
     * on block finalization. Querying this storage entry outside of block
     * execution context should always yield zero.
     **/
    lateness: BlockNumber | null;
    /**
     * Next epoch configuration, if changed.
     **/
    nextEpochConfig: Option<NextConfigDescriptor> | null;
    /**
     * Next epoch randomness.
     **/
    nextRandomness: Randomness | null;
    /**
     * The epoch randomness for the *current* epoch.
     * 
     * # Security
     * 
     * This MUST NOT be used for gambling, as it can be influenced by a
     * malicious validator in the short term. It MAY be used in many
     * cryptographic protocols, however, so long as one remembers that this
     * (like everything else on-chain) it is public. For example, it can be
     * used where a number is needed that cannot have been chosen by an
     * adversary, for purposes such as public-coin zero-knowledge proofs.
     **/
    randomness: Randomness | null;
    /**
     * Randomness under construction.
     * 
     * We make a tradeoff between storage accesses and list length.
     * We store the under-construction randomness in segments of up to
     * `UNDER_CONSTRUCTION_SEGMENT_LENGTH`.
     * 
     * Once a segment reaches this length, we begin the next one.
     * We reset all segments and return to `0` at the beginning of every
     * epoch.
     **/
    segmentIndex: u32 | null;
    /**
     * TWOX-NOTE: `SegmentIndex` is an increasing integer, so this is okay.
     **/
    underConstruction: StorageMap<u32 | AnyNumber, Vec<Randomness>>;
  };
  balances: {    /**
     * The balance of an account.
     * 
     * NOTE: This is only used in the case that this module is used to store balances.
     **/
    account: StorageMap<AccountId | string, AccountData>;
    /**
     * Any liquidity locks on some account balances.
     * NOTE: Should only be accessed when setting, changing and freeing a lock.
     **/
    locks: StorageMap<AccountId | string, Vec<BalanceLock>>;
    /**
     * Storage version of the pallet.
     * 
     * This is set to v2.0.0 for new networks.
     **/
    storageVersion: Releases | null;
    /**
     * The total units issued in the system.
     **/
    totalIssuance: Balance | null;
  };
  bondingCurvePool: {    distributionAccountsEntry: DistributionAccounts | null;
    fee: Fixed | null;
    initialPrice: Fixed | null;
    priceChangeRate: Fixed | null;
    priceChangeStep: Fixed | null;
    reservesAcc: TechAccountId | null;
    sellPriceCoefficient: Fixed | null;
  };
  bridgeMultisig: {    /**
     * Multisignature accounts.
     **/
    accounts: StorageMap<AccountId | string, Option<MultisigAccount>>;
    calls: StorageMap<U8aFixed | string, Option<ITuple<[OpaqueCall, AccountId, BalanceOf]>>>;
    dispatchedCalls: StorageDoubleMap<U8aFixed | string, Timepoint | { height?: any; index?: any } | string, ITuple<[]>>;
    /**
     * The set of open multisig operations.
     **/
    multisigs: StorageDoubleMap<AccountId | string, U8aFixed | string, Option<Multisig>>;
  };
  dexapi: {    enabledSourceTypes: Vec<LiquiditySourceType> | null;
  };
  dexManager: {    dexInfos: StorageMap<DEXId | AnyNumber, Option<DEXInfo>>;
  };
  ethBridge: {    accountRequests: StorageMap<AccountId | string, Vec<ITuple<[NetworkId, H256]>>>;
    authorityAccount: AccountId | null;
    /**
     * Multi-signature bridge peers' account. `None` if there is no network with the given ID.
     **/
    bridgeAccount: StorageMap<NetworkId | { Any: any } | { Named: any } | { Polkadot: any } | { Kusama: any } | string, Option<AccountId>>;
    bridgeContractAddress: StorageMap<NetworkId | { Any: any } | { Named: any } | { Polkadot: any } | { Kusama: any } | string, Address>;
    incomingRequests: StorageDoubleMap<NetworkId | { Any: any } | { Named: any } | { Polkadot: any } | { Kusama: any } | string, H256 | string, Option<IncomingRequest>>;
    lastNetworkId: NetworkId | null;
    peerAccountId: StorageDoubleMap<NetworkId | { Any: any } | { Named: any } | { Polkadot: any } | { Kusama: any } | string, Address | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string, AccountId>;
    peerAddress: StorageDoubleMap<NetworkId | { Any: any } | { Named: any } | { Polkadot: any } | { Kusama: any } | string, AccountId | string, Address>;
    peers: StorageMap<NetworkId | { Any: any } | { Named: any } | { Polkadot: any } | { Kusama: any } | string, BTreeSet<AccountId>>;
    pendingIncomingRequests: StorageMap<NetworkId | { Any: any } | { Named: any } | { Polkadot: any } | { Kusama: any } | string, BTreeSet<H256>>;
    pendingPeer: StorageMap<NetworkId | { Any: any } | { Named: any } | { Polkadot: any } | { Kusama: any } | string, Option<AccountId>>;
    pswapOwners: StorageMap<Address | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string, Option<Balance>>;
    registeredAsset: StorageDoubleMap<NetworkId | { Any: any } | { Named: any } | { Polkadot: any } | { Kusama: any } | string, AssetId | AnyNumber, Option<AssetKind>>;
    registeredSidechainAsset: StorageDoubleMap<NetworkId | { Any: any } | { Named: any } | { Polkadot: any } | { Kusama: any } | string, Address | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string, Option<AssetId>>;
    registeredSidechainToken: StorageDoubleMap<NetworkId | { Any: any } | { Named: any } | { Polkadot: any } | { Kusama: any } | string, AssetId | AnyNumber, Option<Address>>;
    request: StorageDoubleMap<NetworkId | { Any: any } | { Named: any } | { Polkadot: any } | { Kusama: any } | string, H256 | string, Option<OffchainRequest>>;
    requestApprovals: StorageDoubleMap<NetworkId | { Any: any } | { Named: any } | { Polkadot: any } | { Kusama: any } | string, H256 | string, BTreeSet<SignatureParams>>;
    requestsQueue: StorageMap<NetworkId | { Any: any } | { Named: any } | { Polkadot: any } | { Kusama: any } | string, Vec<OffchainRequest>>;
    requestStatuses: StorageDoubleMap<NetworkId | { Any: any } | { Named: any } | { Polkadot: any } | { Kusama: any } | string, H256 | string, Option<RequestStatus>>;
    requestSubmissionHeight: StorageDoubleMap<NetworkId | { Any: any } | { Named: any } | { Polkadot: any } | { Kusama: any } | string, H256 | string, BlockNumber>;
  };
  farming: {    farmers: StorageDoubleMap<FarmId | AnyNumber, AccountId | string, Option<Farmer>>;
    farms: StorageMap<FarmId | AnyNumber, Option<Farm>>;
    /**
     * Collection of all registered marker tokens for farmer.
     **/
    markerTokensIndex: StorageMap<ITuple<[FarmId, AccountId]> | [FarmId | AnyNumber, AccountId | string], BTreeSet<AssetId>>;
    nextFarmId: FarmId | null;
    pricesStates: StorageDoubleMap<AssetId32 | string, AssetId32 | string, Option<SmoothPriceState>>;
  };
  grandpa: {    /**
     * The number of changes (both in terms of keys and underlying economic responsibilities)
     * in the "set" of Grandpa validators from genesis.
     **/
    currentSetId: SetId | null;
    /**
     * next block number where we can force a change.
     **/
    nextForced: Option<BlockNumber> | null;
    /**
     * Pending change: (signaled at, scheduled change).
     **/
    pendingChange: Option<StoredPendingChange> | null;
    /**
     * A mapping from grandpa set ID to the index of the *most recent* session for which its
     * members were responsible.
     * 
     * TWOX-NOTE: `SetId` is not under user control.
     **/
    setIdSession: StorageMap<SetId | AnyNumber, Option<SessionIndex>>;
    /**
     * `true` if we are currently stalled.
     **/
    stalled: Option<ITuple<[BlockNumber, BlockNumber]>> | null;
    /**
     * State of the current authority set.
     **/
    state: StoredState | null;
  };
  irohaMigration: {    account: AccountId | null;
    balances: StorageMap<Text | string, Option<Balance>>;
    migratedAccounts: StorageMap<Text | string, Option<AccountId>>;
    pendingMultiSigAccounts: StorageMap<Text | string, PendingMultisigAccount>;
    pendingReferrals: StorageMap<Text | string, Vec<AccountId>>;
    publicKeys: StorageMap<Text | string, Vec<ITuple<[bool, Text]>>>;
    quorums: StorageMap<Text | string, u8>;
    referrers: StorageMap<Text | string, Option<Text>>;
  };
  mockLiquiditySource: {    reserves: StorageDoubleMap<DEXId | AnyNumber, AssetId | AnyNumber, ITuple<[Fixed, Fixed]>>;
    reservesAcc: TechAccountId | null;
  };
  mockLiquiditySource2: {    reserves: StorageDoubleMap<DEXId | AnyNumber, AssetId | AnyNumber, ITuple<[Fixed, Fixed]>>;
    reservesAcc: TechAccountId | null;
  };
  mockLiquiditySource3: {    reserves: StorageDoubleMap<DEXId | AnyNumber, AssetId | AnyNumber, ITuple<[Fixed, Fixed]>>;
    reservesAcc: TechAccountId | null;
  };
  mockLiquiditySource4: {    reserves: StorageDoubleMap<DEXId | AnyNumber, AssetId | AnyNumber, ITuple<[Fixed, Fixed]>>;
    reservesAcc: TechAccountId | null;
  };
  multicollateralBondingCurvePool: {    distributionAccountsEntry: DistributionAccounts | null;
    enabledPairs: BTreeSet<TradingPair> | null;
    fee: Fixed | null;
    initialPrice: Fixed | null;
    priceChangeRate: Fixed | null;
    priceChangeStep: Fixed | null;
    referenceAssetId: AssetId | null;
    reservesAcc: TechAccountId | null;
    sellPriceCoefficient: Fixed | null;
  };
  multisig: {    calls: StorageMap<U8aFixed | string, Option<ITuple<[OpaqueCall, AccountId, BalanceOf]>>>;
    /**
     * The set of open multisig operations.
     **/
    multisigs: StorageDoubleMap<AccountId | string, U8aFixed | string, Option<Multisig>>;
  };
  permissions: {    modes: StorageMap<PermissionId | AnyNumber, Mode>;
    owners: StorageDoubleMap<PermissionId | AnyNumber, Scope | { Limited: any } | { Unlimited: any } | string, Vec<OwnerId>>;
    permissions: StorageDoubleMap<HolderId | string, Scope | { Limited: any } | { Unlimited: any } | string, Vec<PermissionId>>;
  };
  poolXyk: {    /**
     * Collection of all registered marker tokens.
     **/
    markerTokensIndex: BTreeSet<AssetId> | null;
    /**
     * Properties of particular pool. [Reserves Account Id, Fees Account Id, Marker Asset Id]
     **/
    properties: StorageDoubleMap<AssetId | AnyNumber, AssetId | AnyNumber, Option<ITuple<[AccountId, AccountId, AssetId]>>>;
    /**
     * Updated after last liquidity change operation.
     * [Base Asset Id (XOR) -> Target Asset Id => (Base Balance, Target Balance)].
     * This storage records is not used as source of information, but used as quick cache for
     * information that comes from balances for assets from technical accounts.
     * For example, communication with technical accounts and their storage is not needed, and this
     * pair to balance cache can be used quickly.
     **/
    reserves: StorageDoubleMap<AssetId | AnyNumber, AssetId | AnyNumber, ITuple<[Balance, Balance]>>;
  };
  pswapDistribution: {    /**
     * This is needed for farm id 0, now it is hardcoded, in future it will be resolved and
     * used in a more convenient way.
     **/
    burnedPswapDedicatedForOtherPallets: Fixed | null;
    /**
     * Amount of incentive tokens to be burned on each distribution.
     **/
    burnRate: Fixed | null;
    /**
     * Burn Rate update frequency in blocks. MUST be non-zero.
     **/
    burnUpdateFrequency: BlockNumber | null;
    /**
     * (Burn Rate Increase Delta, Burn Rate Max)
     **/
    burnUpdateInfo: ITuple<[Fixed, Fixed]> | null;
    /**
     * Sum of all shares of incentive token owners.
     **/
    claimableShares: Fixed | null;
    /**
     * Information about owned portion of stored incentive tokens. Shareholder -> Owned Fraction
     **/
    shareholderAccounts: StorageMap<AccountId | string, Fixed>;
    /**
     * Store for information about accounts containing fees, that participate in incentive distribution mechanism.
     * Fees Account Id -> (DEX Id, Pool Marker Asset Id, Distribution Frequency, Block Offset) Frequency MUST be non-zero.
     **/
    subscribedAccounts: StorageMap<AccountId | string, Option<ITuple<[DEXId, AssetId, BlockNumber, BlockNumber]>>>;
  };
  randomnessCollectiveFlip: {    /**
     * Series of block headers from the last 81 blocks that acts as random seed material. This
     * is arranged as a ring buffer with `block_number % 81` being the index into the `Vec` of
     * the oldest hash.
     **/
    randomMaterial: Vec<Hash> | null;
  };
  referralSystem: {    referrers: StorageMap<AccountId | string, Option<AccountId>>;
  };
  session: {    /**
     * Current index of the session.
     **/
    currentIndex: SessionIndex | null;
    /**
     * Indices of disabled validators.
     * 
     * The set is cleared when `on_session_ending` returns a new set of identities.
     **/
    disabledValidators: Vec<u32> | null;
    /**
     * The owner of a key. The key is the `KeyTypeId` + the encoded key.
     **/
    keyOwner: StorageMap<ITuple<[KeyTypeId, Bytes]> | [KeyTypeId | AnyNumber, Bytes | string], Option<ValidatorId>>;
    /**
     * The next session keys for a validator.
     **/
    nextKeys: StorageMap<ValidatorId | string, Option<Keys>>;
    /**
     * True if the underlying economic identities or weighting behind the validators
     * has changed in the queued validator set.
     **/
    queuedChanged: bool | null;
    /**
     * The queued keys for the next session. When the next session begins, these keys
     * will be used to determine the validator's session keys.
     **/
    queuedKeys: Vec<ITuple<[ValidatorId, Keys]>> | null;
    /**
     * The current set of validators.
     **/
    validators: Vec<ValidatorId> | null;
  };
  staking: {    /**
     * The active era information, it holds index and start.
     * 
     * The active era is the era currently rewarded.
     * Validator set of this era must be equal to `SessionInterface::validators`.
     **/
    activeEra: Option<ActiveEraInfo> | null;
    /**
     * Map from all locked "stash" accounts to the controller account.
     **/
    bonded: StorageMap<AccountId | string, Option<AccountId>>;
    /**
     * A mapping from still-bonded eras to the first session index of that era.
     * 
     * Must contains information for eras for the range:
     * `[active_era - bounding_duration; active_era]`
     **/
    bondedEras: Vec<ITuple<[EraIndex, SessionIndex]>> | null;
    /**
     * The amount of currency given to reporters of a slash event which was
     * canceled by extraordinary circumstances (e.g. governance).
     **/
    canceledSlashPayout: BalanceOf | null;
    /**
     * The current era index.
     * 
     * This is the latest planned era, depending on how the Session pallet queues the validator
     * set, it might be active or not.
     **/
    currentEra: Option<EraIndex> | null;
    /**
     * The earliest era for which we have a pending, unapplied slash.
     **/
    earliestUnappliedSlash: Option<EraIndex> | null;
    /**
     * Flag to control the execution of the offchain election. When `Open(_)`, we accept
     * solutions to be submitted.
     **/
    eraElectionStatus: ElectionStatus | null;
    /**
     * Rewards for the last `HISTORY_DEPTH` eras.
     * If reward hasn't been set or has been removed then 0 reward is returned.
     **/
    erasRewardPoints: StorageMap<EraIndex | AnyNumber, EraRewardPoints>;
    /**
     * Exposure of validator at era.
     * 
     * This is keyed first by the era index to allow bulk deletion and then the stash account.
     * 
     * Is it removed after `HISTORY_DEPTH` eras.
     * If stakers hasn't been set or has been removed then empty exposure is returned.
     **/
    erasStakers: StorageDoubleMap<EraIndex | AnyNumber, AccountId | string, Exposure>;
    /**
     * Clipped Exposure of validator at era.
     * 
     * This is similar to [`ErasStakers`] but number of nominators exposed is reduced to the
     * `T::MaxNominatorRewardedPerValidator` biggest stakers.
     * (Note: the field `total` and `own` of the exposure remains unchanged).
     * This is used to limit the i/o cost for the nominator payout.
     * 
     * This is keyed fist by the era index to allow bulk deletion and then the stash account.
     * 
     * Is it removed after `HISTORY_DEPTH` eras.
     * If stakers hasn't been set or has been removed then empty exposure is returned.
     **/
    erasStakersClipped: StorageDoubleMap<EraIndex | AnyNumber, AccountId | string, Exposure>;
    /**
     * The session index at which the era start for the last `HISTORY_DEPTH` eras.
     **/
    erasStartSessionIndex: StorageMap<EraIndex | AnyNumber, Option<SessionIndex>>;
    /**
     * The total amount staked for the last `HISTORY_DEPTH` eras.
     * If total hasn't been set or has been removed then 0 stake is returned.
     **/
    erasTotalStake: StorageMap<EraIndex | AnyNumber, BalanceOf>;
    /**
     * Similar to `ErasStakers`, this holds the preferences of validators.
     * 
     * This is keyed first by the era index to allow bulk deletion and then the stash account.
     * 
     * Is it removed after `HISTORY_DEPTH` eras.
     **/
    erasValidatorPrefs: StorageDoubleMap<EraIndex | AnyNumber, AccountId | string, ValidatorPrefs>;
    /**
     * The total validator era payout for the last `HISTORY_DEPTH` eras.
     * 
     * Eras that haven't finished yet or has been removed doesn't have reward.
     **/
    erasValidatorReward: StorageMap<EraIndex | AnyNumber, Option<MultiCurrencyBalanceOf>>;
    /**
     * The amount of VAL burned during this era.
     **/
    eraValBurned: MultiCurrencyBalanceOf | null;
    /**
     * Mode of era forcing.
     **/
    forceEra: Forcing | null;
    /**
     * Number of eras to keep in history.
     * 
     * Information is kept for eras in `[current_era - history_depth; current_era]`.
     * 
     * Must be more than the number of eras delayed by session otherwise. I.e. active era must
     * always be in history. I.e. `active_era > current_era - history_depth` must be
     * guaranteed.
     **/
    historyDepth: u32 | null;
    /**
     * Any validators that may never be slashed or forcibly kicked. It's a Vec since they're
     * easy to initialize and the performance hit is minimal (we expect no more than four
     * invulnerables) and restricted to testnets.
     **/
    invulnerables: Vec<AccountId> | null;
    /**
     * True if the current **planned** session is final. Note that this does not take era
     * forcing into account.
     **/
    isCurrentSessionFinal: bool | null;
    /**
     * Map from all (unlocked) "controller" accounts to the info regarding the staking.
     **/
    ledger: StorageMap<AccountId | string, Option<StakingLedger>>;
    /**
     * Minimum number of staking participants before emergency conditions are imposed.
     **/
    minimumValidatorCount: u32 | null;
    /**
     * The map from nominator stash key to the set of stash keys of all validators to nominate.
     **/
    nominators: StorageMap<AccountId | string, Option<Nominations>>;
    /**
     * All slashing events on nominators, mapped by era to the highest slash value of the era.
     **/
    nominatorSlashInEra: StorageDoubleMap<EraIndex | AnyNumber, AccountId | string, Option<BalanceOf>>;
    /**
     * Where the reward payment should be made. Keyed by stash.
     **/
    payee: StorageMap<AccountId | string, RewardDestination>;
    /**
     * The next validator set. At the end of an era, if this is available (potentially from the
     * result of an offchain worker), it is immediately used. Otherwise, the on-chain election
     * is executed.
     **/
    queuedElected: Option<ElectionResult> | null;
    /**
     * The score of the current [`QueuedElected`].
     **/
    queuedScore: Option<ElectionScore> | null;
    /**
     * Slashing spans for stash accounts.
     **/
    slashingSpans: StorageMap<AccountId | string, Option<SlashingSpans>>;
    /**
     * The percentage of the slash that is distributed to reporters.
     * 
     * The rest of the slashed value is handled by the `Slash`.
     **/
    slashRewardFraction: Perbill | null;
    /**
     * Snapshot of nominators at the beginning of the current election window. This should only
     * have a value when [`EraElectionStatus`] == `ElectionStatus::Open(_)`.
     **/
    snapshotNominators: Option<Vec<AccountId>> | null;
    /**
     * Snapshot of validators at the beginning of the current election window. This should only
     * have a value when [`EraElectionStatus`] == `ElectionStatus::Open(_)`.
     **/
    snapshotValidators: Option<Vec<AccountId>> | null;
    /**
     * Records information about the maximum slash of a stash within a slashing span,
     * as well as how much reward has been paid out.
     **/
    spanSlash: StorageMap<ITuple<[AccountId, SpanIndex]> | [AccountId | string, SpanIndex | AnyNumber], SpanRecord>;
    /**
     * True if network has been upgraded to this version.
     * Storage version of the pallet.
     * 
     * This is set to v3.0.0 for new networks.
     **/
    storageVersion: Releases | null;
    /**
     * The time span since genesis, incremented at the end of each era.
     **/
    timeSinceGenesis: Duration | null;
    /**
     * All unapplied slashes that are queued for later.
     **/
    unappliedSlashes: StorageMap<EraIndex | AnyNumber, Vec<UnappliedSlash>>;
    /**
     * The ideal number of staking participants.
     **/
    validatorCount: u32 | null;
    /**
     * The map from (wannabe) validator stash key to the preferences of that validator.
     **/
    validators: StorageMap<AccountId | string, ValidatorPrefs>;
    /**
     * All slashing events on validators, mapped by era to the highest slash proportion
     * and slash value of the era.
     **/
    validatorSlashInEra: StorageDoubleMap<EraIndex | AnyNumber, AccountId | string, Option<ITuple<[Perbill, BalanceOf]>>>;
  };
  sudo: {    /**
     * The `AccountId` of the sudo key.
     **/
    key: AccountId | null;
  };
  system: {    /**
     * The full account information for a particular account ID.
     **/
    account: StorageMap<AccountId | string, AccountInfo>;
    /**
     * Total length (in bytes) for all extrinsics put together, for the current block.
     **/
    allExtrinsicsLen: Option<u32> | null;
    /**
     * Map of block numbers to block hashes.
     **/
    blockHash: StorageMap<BlockNumber | AnyNumber, Hash>;
    /**
     * The current weight for the block.
     **/
    blockWeight: ExtrinsicsWeight | null;
    /**
     * Digest of the current block, also part of the block header.
     **/
    digest: DigestOf | null;
    /**
     * The number of events in the `Events<T>` list.
     **/
    eventCount: EventIndex | null;
    /**
     * Events deposited for the current block.
     **/
    events: Vec<EventRecord> | null;
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
    eventTopics: StorageMap<Hash | string, Vec<ITuple<[BlockNumber, EventIndex]>>>;
    /**
     * The execution phase of the block.
     **/
    executionPhase: Option<Phase> | null;
    /**
     * Total extrinsics count for the current block.
     **/
    extrinsicCount: Option<u32> | null;
    /**
     * Extrinsics data for the current block (maps an extrinsic's index to its data).
     **/
    extrinsicData: StorageMap<u32 | AnyNumber, Bytes>;
    /**
     * Extrinsics root of the current block, also part of the block header.
     **/
    extrinsicsRoot: Hash | null;
    /**
     * Stores the `spec_version` and `spec_name` of when the last runtime upgrade happened.
     **/
    lastRuntimeUpgrade: Option<LastRuntimeUpgradeInfo> | null;
    /**
     * The current block number being processed. Set by `execute_block`.
     **/
    number: BlockNumber | null;
    /**
     * Hash of the previous block.
     **/
    parentHash: Hash | null;
    /**
     * True if we have upgraded so that `type RefCount` is `u32`. False (default) if not.
     **/
    upgradedToU32RefCount: bool | null;
  };
  timestamp: {    /**
     * Did the timestamp get updated in this block?
     **/
    didUpdate: bool | null;
    /**
     * Current time for the current block.
     **/
    now: Moment | null;
  };
  tokens: {    /**
     * The balance of a token type under an account.
     * 
     * NOTE: If the total is ever zero, decrease account ref account.
     * 
     * NOTE: This is only used in the case that this module is used to store balances.
     **/
    accounts: StorageDoubleMap<AccountId | string, CurrencyId | AnyNumber, AccountData>;
    /**
     * Any liquidity locks of a token type under an account.
     * NOTE: Should only be accessed when setting, changing and freeing a lock.
     **/
    locks: StorageDoubleMap<AccountId | string, CurrencyId | AnyNumber, Vec<BalanceLock>>;
    /**
     * The total issuance of a token type.
     **/
    totalIssuance: StorageMap<CurrencyId | AnyNumber, Balance>;
  };
  transactionPayment: {    nextFeeMultiplier: Multiplier | null;
    storageVersion: Releases | null;
  };
  xorFee: {  };
}
