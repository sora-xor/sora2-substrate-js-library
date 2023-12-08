// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

// import type lookup before we augment - in some environments
// this is required to allow for ambient/previous definitions
import '@polkadot/types/lookup';

import type { Data } from '@polkadot/types';
import type { BTreeMap, BitVec, Bytes, Compact, Enum, Null, Option, Result, Set, Struct, Text, U256, U8aFixed, Vec, bool, i128, i32, u128, u16, u32, u64, u8 } from '@polkadot/types-codec';
import type { ITuple } from '@polkadot/types-codec/types';
import type { Vote } from '@polkadot/types/interfaces/elections';
import type { OpaqueMultiaddr, OpaquePeerId } from '@polkadot/types/interfaces/imOnline';
import type { AccountId32, Call, H128, H160, H256, H512, PerU16, Perbill, Percent } from '@polkadot/types/interfaces/runtime';
import type { Event } from '@polkadot/types/interfaces/system';

declare module '@polkadot/types/lookup' {
  /** @name FrameSystemAccountInfo (3) */
  interface FrameSystemAccountInfo extends Struct {
    readonly nonce: u32;
    readonly consumers: u32;
    readonly providers: u32;
    readonly sufficients: u32;
    readonly data: PalletBalancesAccountData;
  }

  /** @name PalletBalancesAccountData (5) */
  interface PalletBalancesAccountData extends Struct {
    readonly free: u128;
    readonly reserved: u128;
    readonly miscFrozen: u128;
    readonly feeFrozen: u128;
  }

  /** @name FrameSupportDispatchPerDispatchClassWeight (7) */
  interface FrameSupportDispatchPerDispatchClassWeight extends Struct {
    readonly normal: SpWeightsWeightV2Weight;
    readonly operational: SpWeightsWeightV2Weight;
    readonly mandatory: SpWeightsWeightV2Weight;
  }

  /** @name SpWeightsWeightV2Weight (8) */
  interface SpWeightsWeightV2Weight extends Struct {
    readonly refTime: Compact<u64>;
    readonly proofSize: Compact<u64>;
  }

  /** @name SpRuntimeDigest (13) */
  interface SpRuntimeDigest extends Struct {
    readonly logs: Vec<SpRuntimeDigestDigestItem>;
  }

  /** @name SpRuntimeDigestDigestItem (15) */
  interface SpRuntimeDigestDigestItem extends Enum {
    readonly isOther: boolean;
    readonly asOther: Bytes;
    readonly isConsensus: boolean;
    readonly asConsensus: ITuple<[U8aFixed, Bytes]>;
    readonly isSeal: boolean;
    readonly asSeal: ITuple<[U8aFixed, Bytes]>;
    readonly isPreRuntime: boolean;
    readonly asPreRuntime: ITuple<[U8aFixed, Bytes]>;
    readonly isRuntimeEnvironmentUpdated: boolean;
    readonly type: 'Other' | 'Consensus' | 'Seal' | 'PreRuntime' | 'RuntimeEnvironmentUpdated';
  }

  /** @name FrameSystemEventRecord (18) */
  interface FrameSystemEventRecord extends Struct {
    readonly phase: FrameSystemPhase;
    readonly event: Event;
    readonly topics: Vec<H256>;
  }

  /** @name FrameSystemEvent (20) */
  interface FrameSystemEvent extends Enum {
    readonly isExtrinsicSuccess: boolean;
    readonly asExtrinsicSuccess: {
      readonly dispatchInfo: FrameSupportDispatchDispatchInfo;
    } & Struct;
    readonly isExtrinsicFailed: boolean;
    readonly asExtrinsicFailed: {
      readonly dispatchError: SpRuntimeDispatchError;
      readonly dispatchInfo: FrameSupportDispatchDispatchInfo;
    } & Struct;
    readonly isCodeUpdated: boolean;
    readonly isNewAccount: boolean;
    readonly asNewAccount: {
      readonly account: AccountId32;
    } & Struct;
    readonly isKilledAccount: boolean;
    readonly asKilledAccount: {
      readonly account: AccountId32;
    } & Struct;
    readonly isRemarked: boolean;
    readonly asRemarked: {
      readonly sender: AccountId32;
      readonly hash_: H256;
    } & Struct;
    readonly type: 'ExtrinsicSuccess' | 'ExtrinsicFailed' | 'CodeUpdated' | 'NewAccount' | 'KilledAccount' | 'Remarked';
  }

  /** @name FrameSupportDispatchDispatchInfo (21) */
  interface FrameSupportDispatchDispatchInfo extends Struct {
    readonly weight: SpWeightsWeightV2Weight;
    readonly class: FrameSupportDispatchDispatchClass;
    readonly paysFee: FrameSupportDispatchPays;
  }

  /** @name FrameSupportDispatchDispatchClass (22) */
  interface FrameSupportDispatchDispatchClass extends Enum {
    readonly isNormal: boolean;
    readonly isOperational: boolean;
    readonly isMandatory: boolean;
    readonly type: 'Normal' | 'Operational' | 'Mandatory';
  }

  /** @name FrameSupportDispatchPays (23) */
  interface FrameSupportDispatchPays extends Enum {
    readonly isYes: boolean;
    readonly isNo: boolean;
    readonly type: 'Yes' | 'No';
  }

  /** @name SpRuntimeDispatchError (24) */
  interface SpRuntimeDispatchError extends Enum {
    readonly isOther: boolean;
    readonly isCannotLookup: boolean;
    readonly isBadOrigin: boolean;
    readonly isModule: boolean;
    readonly asModule: SpRuntimeModuleError;
    readonly isConsumerRemaining: boolean;
    readonly isNoProviders: boolean;
    readonly isTooManyConsumers: boolean;
    readonly isToken: boolean;
    readonly asToken: SpRuntimeTokenError;
    readonly isArithmetic: boolean;
    readonly asArithmetic: SpArithmeticArithmeticError;
    readonly isTransactional: boolean;
    readonly asTransactional: SpRuntimeTransactionalError;
    readonly isExhausted: boolean;
    readonly isCorruption: boolean;
    readonly isUnavailable: boolean;
    readonly type: 'Other' | 'CannotLookup' | 'BadOrigin' | 'Module' | 'ConsumerRemaining' | 'NoProviders' | 'TooManyConsumers' | 'Token' | 'Arithmetic' | 'Transactional' | 'Exhausted' | 'Corruption' | 'Unavailable';
  }

  /** @name SpRuntimeModuleError (25) */
  interface SpRuntimeModuleError extends Struct {
    readonly index: u8;
    readonly error: U8aFixed;
  }

  /** @name SpRuntimeTokenError (26) */
  interface SpRuntimeTokenError extends Enum {
    readonly isNoFunds: boolean;
    readonly isWouldDie: boolean;
    readonly isBelowMinimum: boolean;
    readonly isCannotCreate: boolean;
    readonly isUnknownAsset: boolean;
    readonly isFrozen: boolean;
    readonly isUnsupported: boolean;
    readonly type: 'NoFunds' | 'WouldDie' | 'BelowMinimum' | 'CannotCreate' | 'UnknownAsset' | 'Frozen' | 'Unsupported';
  }

  /** @name SpArithmeticArithmeticError (27) */
  interface SpArithmeticArithmeticError extends Enum {
    readonly isUnderflow: boolean;
    readonly isOverflow: boolean;
    readonly isDivisionByZero: boolean;
    readonly type: 'Underflow' | 'Overflow' | 'DivisionByZero';
  }

  /** @name SpRuntimeTransactionalError (28) */
  interface SpRuntimeTransactionalError extends Enum {
    readonly isLimitReached: boolean;
    readonly isNoLayer: boolean;
    readonly type: 'LimitReached' | 'NoLayer';
  }

  /** @name PalletBalancesEvent (29) */
  interface PalletBalancesEvent extends Enum {
    readonly isEndowed: boolean;
    readonly asEndowed: {
      readonly account: AccountId32;
      readonly freeBalance: u128;
    } & Struct;
    readonly isDustLost: boolean;
    readonly asDustLost: {
      readonly account: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isTransfer: boolean;
    readonly asTransfer: {
      readonly from: AccountId32;
      readonly to: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isBalanceSet: boolean;
    readonly asBalanceSet: {
      readonly who: AccountId32;
      readonly free: u128;
      readonly reserved: u128;
    } & Struct;
    readonly isReserved: boolean;
    readonly asReserved: {
      readonly who: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isUnreserved: boolean;
    readonly asUnreserved: {
      readonly who: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isReserveRepatriated: boolean;
    readonly asReserveRepatriated: {
      readonly from: AccountId32;
      readonly to: AccountId32;
      readonly amount: u128;
      readonly destinationStatus: FrameSupportTokensMiscBalanceStatus;
    } & Struct;
    readonly isDeposit: boolean;
    readonly asDeposit: {
      readonly who: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isWithdraw: boolean;
    readonly asWithdraw: {
      readonly who: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isSlashed: boolean;
    readonly asSlashed: {
      readonly who: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly type: 'Endowed' | 'DustLost' | 'Transfer' | 'BalanceSet' | 'Reserved' | 'Unreserved' | 'ReserveRepatriated' | 'Deposit' | 'Withdraw' | 'Slashed';
  }

  /** @name FrameSupportTokensMiscBalanceStatus (30) */
  interface FrameSupportTokensMiscBalanceStatus extends Enum {
    readonly isFree: boolean;
    readonly isReserved: boolean;
    readonly type: 'Free' | 'Reserved';
  }

  /** @name PalletTransactionPaymentEvent (31) */
  interface PalletTransactionPaymentEvent extends Enum {
    readonly isTransactionFeePaid: boolean;
    readonly asTransactionFeePaid: {
      readonly who: AccountId32;
      readonly actualFee: u128;
      readonly tip: u128;
    } & Struct;
    readonly type: 'TransactionFeePaid';
  }

  /** @name PermissionsEvent (32) */
  interface PermissionsEvent extends Enum {
    readonly isPermissionGranted: boolean;
    readonly asPermissionGranted: ITuple<[u32, AccountId32]>;
    readonly isPermissionTransfered: boolean;
    readonly asPermissionTransfered: ITuple<[u32, AccountId32]>;
    readonly isPermissionCreated: boolean;
    readonly asPermissionCreated: ITuple<[u32, AccountId32]>;
    readonly isPermissionAssigned: boolean;
    readonly asPermissionAssigned: ITuple<[u32, AccountId32]>;
    readonly type: 'PermissionGranted' | 'PermissionTransfered' | 'PermissionCreated' | 'PermissionAssigned';
  }

  /** @name RewardsEvent (33) */
  interface RewardsEvent extends Enum {
    readonly isClaimed: boolean;
    readonly asClaimed: AccountId32;
    readonly isMigrationCompleted: boolean;
    readonly type: 'Claimed' | 'MigrationCompleted';
  }

  /** @name XorFeeEvent (34) */
  interface XorFeeEvent extends Enum {
    readonly isFeeWithdrawn: boolean;
    readonly asFeeWithdrawn: ITuple<[AccountId32, u128]>;
    readonly isReferrerRewarded: boolean;
    readonly asReferrerRewarded: ITuple<[AccountId32, AccountId32, u128]>;
    readonly isWeightToFeeMultiplierUpdated: boolean;
    readonly asWeightToFeeMultiplierUpdated: u128;
    readonly type: 'FeeWithdrawn' | 'ReferrerRewarded' | 'WeightToFeeMultiplierUpdated';
  }

  /** @name PalletMultisigEvent (36) */
  interface PalletMultisigEvent extends Enum {
    readonly isMultisigAccountCreated: boolean;
    readonly asMultisigAccountCreated: AccountId32;
    readonly isNewMultisig: boolean;
    readonly asNewMultisig: ITuple<[AccountId32, AccountId32, U8aFixed]>;
    readonly isMultisigApproval: boolean;
    readonly asMultisigApproval: ITuple<[AccountId32, PalletMultisigBridgeTimepoint, AccountId32, U8aFixed]>;
    readonly isMultisigExecuted: boolean;
    readonly asMultisigExecuted: ITuple<[AccountId32, PalletMultisigBridgeTimepoint, AccountId32, U8aFixed, Option<SpRuntimeDispatchError>]>;
    readonly isMultisigCancelled: boolean;
    readonly asMultisigCancelled: ITuple<[AccountId32, PalletMultisigBridgeTimepoint, AccountId32, U8aFixed]>;
    readonly type: 'MultisigAccountCreated' | 'NewMultisig' | 'MultisigApproval' | 'MultisigExecuted' | 'MultisigCancelled';
  }

  /** @name PalletMultisigBridgeTimepoint (37) */
  interface PalletMultisigBridgeTimepoint extends Struct {
    readonly height: PalletMultisigMultiChainHeight;
    readonly index: u32;
  }

  /** @name PalletMultisigMultiChainHeight (38) */
  interface PalletMultisigMultiChainHeight extends Enum {
    readonly isThischain: boolean;
    readonly asThischain: u32;
    readonly isSidechain: boolean;
    readonly asSidechain: u64;
    readonly type: 'Thischain' | 'Sidechain';
  }

  /** @name PalletUtilityEvent (40) */
  interface PalletUtilityEvent extends Enum {
    readonly isBatchInterrupted: boolean;
    readonly asBatchInterrupted: {
      readonly index: u32;
      readonly error: SpRuntimeDispatchError;
    } & Struct;
    readonly isBatchCompleted: boolean;
    readonly isBatchCompletedWithErrors: boolean;
    readonly isItemCompleted: boolean;
    readonly isItemFailed: boolean;
    readonly asItemFailed: {
      readonly error: SpRuntimeDispatchError;
    } & Struct;
    readonly isDispatchedAs: boolean;
    readonly asDispatchedAs: {
      readonly result: Result<Null, SpRuntimeDispatchError>;
    } & Struct;
    readonly type: 'BatchInterrupted' | 'BatchCompleted' | 'BatchCompletedWithErrors' | 'ItemCompleted' | 'ItemFailed' | 'DispatchedAs';
  }

  /** @name PalletStakingPalletEvent (43) */
  interface PalletStakingPalletEvent extends Enum {
    readonly isEraPaid: boolean;
    readonly asEraPaid: {
      readonly eraIndex: u32;
      readonly validatorPayout: u128;
    } & Struct;
    readonly isRewarded: boolean;
    readonly asRewarded: {
      readonly stash: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isSlashed: boolean;
    readonly asSlashed: {
      readonly staker: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isSlashReported: boolean;
    readonly asSlashReported: {
      readonly validator: AccountId32;
      readonly fraction: Perbill;
      readonly slashEra: u32;
    } & Struct;
    readonly isOldSlashingReportDiscarded: boolean;
    readonly asOldSlashingReportDiscarded: {
      readonly sessionIndex: u32;
    } & Struct;
    readonly isStakersElected: boolean;
    readonly isBonded: boolean;
    readonly asBonded: {
      readonly stash: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isUnbonded: boolean;
    readonly asUnbonded: {
      readonly stash: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isWithdrawn: boolean;
    readonly asWithdrawn: {
      readonly stash: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isKicked: boolean;
    readonly asKicked: {
      readonly nominator: AccountId32;
      readonly stash: AccountId32;
    } & Struct;
    readonly isStakingElectionFailed: boolean;
    readonly isChilled: boolean;
    readonly asChilled: {
      readonly stash: AccountId32;
    } & Struct;
    readonly isPayoutStarted: boolean;
    readonly asPayoutStarted: {
      readonly eraIndex: u32;
      readonly validatorStash: AccountId32;
    } & Struct;
    readonly isValidatorPrefsSet: boolean;
    readonly asValidatorPrefsSet: {
      readonly stash: AccountId32;
      readonly prefs: PalletStakingValidatorPrefs;
    } & Struct;
    readonly isForceEra: boolean;
    readonly asForceEra: {
      readonly mode: PalletStakingForcing;
    } & Struct;
    readonly type: 'EraPaid' | 'Rewarded' | 'Slashed' | 'SlashReported' | 'OldSlashingReportDiscarded' | 'StakersElected' | 'Bonded' | 'Unbonded' | 'Withdrawn' | 'Kicked' | 'StakingElectionFailed' | 'Chilled' | 'PayoutStarted' | 'ValidatorPrefsSet' | 'ForceEra';
  }

  /** @name PalletStakingValidatorPrefs (45) */
  interface PalletStakingValidatorPrefs extends Struct {
    readonly commission: Compact<Perbill>;
    readonly blocked: bool;
  }

  /** @name PalletStakingForcing (48) */
  interface PalletStakingForcing extends Enum {
    readonly isNotForcing: boolean;
    readonly isForceNew: boolean;
    readonly isForceNone: boolean;
    readonly isForceAlways: boolean;
    readonly type: 'NotForcing' | 'ForceNew' | 'ForceNone' | 'ForceAlways';
  }

  /** @name PalletOffencesEvent (49) */
  interface PalletOffencesEvent extends Enum {
    readonly isOffence: boolean;
    readonly asOffence: {
      readonly kind: U8aFixed;
      readonly timeslot: Bytes;
    } & Struct;
    readonly type: 'Offence';
  }

  /** @name PalletSessionEvent (51) */
  interface PalletSessionEvent extends Enum {
    readonly isNewSession: boolean;
    readonly asNewSession: {
      readonly sessionIndex: u32;
    } & Struct;
    readonly type: 'NewSession';
  }

  /** @name PalletGrandpaEvent (52) */
  interface PalletGrandpaEvent extends Enum {
    readonly isNewAuthorities: boolean;
    readonly asNewAuthorities: {
      readonly authoritySet: Vec<ITuple<[SpFinalityGrandpaAppPublic, u64]>>;
    } & Struct;
    readonly isPaused: boolean;
    readonly isResumed: boolean;
    readonly type: 'NewAuthorities' | 'Paused' | 'Resumed';
  }

  /** @name SpFinalityGrandpaAppPublic (55) */
  interface SpFinalityGrandpaAppPublic extends SpCoreEd25519Public {}

  /** @name SpCoreEd25519Public (56) */
  interface SpCoreEd25519Public extends U8aFixed {}

  /** @name PalletImOnlineEvent (57) */
  interface PalletImOnlineEvent extends Enum {
    readonly isHeartbeatReceived: boolean;
    readonly asHeartbeatReceived: {
      readonly authorityId: PalletImOnlineSr25519AppSr25519Public;
    } & Struct;
    readonly isAllGood: boolean;
    readonly isSomeOffline: boolean;
    readonly asSomeOffline: {
      readonly offline: Vec<ITuple<[AccountId32, PalletStakingExposure]>>;
    } & Struct;
    readonly type: 'HeartbeatReceived' | 'AllGood' | 'SomeOffline';
  }

  /** @name PalletImOnlineSr25519AppSr25519Public (58) */
  interface PalletImOnlineSr25519AppSr25519Public extends SpCoreSr25519Public {}

  /** @name SpCoreSr25519Public (59) */
  interface SpCoreSr25519Public extends U8aFixed {}

  /** @name PalletStakingExposure (62) */
  interface PalletStakingExposure extends Struct {
    readonly total: Compact<u128>;
    readonly own: Compact<u128>;
    readonly others: Vec<PalletStakingIndividualExposure>;
  }

  /** @name PalletStakingIndividualExposure (65) */
  interface PalletStakingIndividualExposure extends Struct {
    readonly who: AccountId32;
    readonly value: Compact<u128>;
  }

  /** @name OrmlTokensModuleEvent (66) */
  interface OrmlTokensModuleEvent extends Enum {
    readonly isEndowed: boolean;
    readonly asEndowed: {
      readonly currencyId: CommonPrimitivesAssetId32;
      readonly who: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isDustLost: boolean;
    readonly asDustLost: {
      readonly currencyId: CommonPrimitivesAssetId32;
      readonly who: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isTransfer: boolean;
    readonly asTransfer: {
      readonly currencyId: CommonPrimitivesAssetId32;
      readonly from: AccountId32;
      readonly to: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isReserved: boolean;
    readonly asReserved: {
      readonly currencyId: CommonPrimitivesAssetId32;
      readonly who: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isUnreserved: boolean;
    readonly asUnreserved: {
      readonly currencyId: CommonPrimitivesAssetId32;
      readonly who: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isReserveRepatriated: boolean;
    readonly asReserveRepatriated: {
      readonly currencyId: CommonPrimitivesAssetId32;
      readonly from: AccountId32;
      readonly to: AccountId32;
      readonly amount: u128;
      readonly status: FrameSupportTokensMiscBalanceStatus;
    } & Struct;
    readonly isBalanceSet: boolean;
    readonly asBalanceSet: {
      readonly currencyId: CommonPrimitivesAssetId32;
      readonly who: AccountId32;
      readonly free: u128;
      readonly reserved: u128;
    } & Struct;
    readonly isTotalIssuanceSet: boolean;
    readonly asTotalIssuanceSet: {
      readonly currencyId: CommonPrimitivesAssetId32;
      readonly amount: u128;
    } & Struct;
    readonly isWithdrawn: boolean;
    readonly asWithdrawn: {
      readonly currencyId: CommonPrimitivesAssetId32;
      readonly who: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isSlashed: boolean;
    readonly asSlashed: {
      readonly currencyId: CommonPrimitivesAssetId32;
      readonly who: AccountId32;
      readonly freeAmount: u128;
      readonly reservedAmount: u128;
    } & Struct;
    readonly isDeposited: boolean;
    readonly asDeposited: {
      readonly currencyId: CommonPrimitivesAssetId32;
      readonly who: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isLockSet: boolean;
    readonly asLockSet: {
      readonly lockId: U8aFixed;
      readonly currencyId: CommonPrimitivesAssetId32;
      readonly who: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isLockRemoved: boolean;
    readonly asLockRemoved: {
      readonly lockId: U8aFixed;
      readonly currencyId: CommonPrimitivesAssetId32;
      readonly who: AccountId32;
    } & Struct;
    readonly isLocked: boolean;
    readonly asLocked: {
      readonly currencyId: CommonPrimitivesAssetId32;
      readonly who: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isUnlocked: boolean;
    readonly asUnlocked: {
      readonly currencyId: CommonPrimitivesAssetId32;
      readonly who: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly type: 'Endowed' | 'DustLost' | 'Transfer' | 'Reserved' | 'Unreserved' | 'ReserveRepatriated' | 'BalanceSet' | 'TotalIssuanceSet' | 'Withdrawn' | 'Slashed' | 'Deposited' | 'LockSet' | 'LockRemoved' | 'Locked' | 'Unlocked';
  }

  /** @name CommonPrimitivesAssetId32 (67) */
  interface CommonPrimitivesAssetId32 extends Struct {
    readonly code: U8aFixed;
  }

  /** @name CommonPrimitivesPredefinedAssetId (68) */
  interface CommonPrimitivesPredefinedAssetId extends Enum {
    readonly isXor: boolean;
    readonly isDot: boolean;
    readonly isKsm: boolean;
    readonly isUsdt: boolean;
    readonly isVal: boolean;
    readonly isPswap: boolean;
    readonly isDai: boolean;
    readonly isEth: boolean;
    readonly isXstusd: boolean;
    readonly isXst: boolean;
    readonly isTbcd: boolean;
    readonly type: 'Xor' | 'Dot' | 'Ksm' | 'Usdt' | 'Val' | 'Pswap' | 'Dai' | 'Eth' | 'Xstusd' | 'Xst' | 'Tbcd';
  }

  /** @name TradingPairEvent (70) */
  interface TradingPairEvent extends Enum {
    readonly isTradingPairStored: boolean;
    readonly asTradingPairStored: ITuple<[u32, CommonPrimitivesTradingPairAssetId32]>;
    readonly type: 'TradingPairStored';
  }

  /** @name CommonPrimitivesTradingPairAssetId32 (71) */
  interface CommonPrimitivesTradingPairAssetId32 extends Struct {
    readonly baseAssetId: CommonPrimitivesAssetId32;
    readonly targetAssetId: CommonPrimitivesAssetId32;
  }

  /** @name AssetsEvent (72) */
  interface AssetsEvent extends Enum {
    readonly isAssetRegistered: boolean;
    readonly asAssetRegistered: ITuple<[CommonPrimitivesAssetId32, AccountId32]>;
    readonly isTransfer: boolean;
    readonly asTransfer: ITuple<[AccountId32, AccountId32, CommonPrimitivesAssetId32, u128]>;
    readonly isMint: boolean;
    readonly asMint: ITuple<[AccountId32, AccountId32, CommonPrimitivesAssetId32, u128]>;
    readonly isBurn: boolean;
    readonly asBurn: ITuple<[AccountId32, CommonPrimitivesAssetId32, u128]>;
    readonly isAssetSetNonMintable: boolean;
    readonly asAssetSetNonMintable: CommonPrimitivesAssetId32;
    readonly isAssetUpdated: boolean;
    readonly asAssetUpdated: ITuple<[CommonPrimitivesAssetId32, Option<Bytes>, Option<Bytes>]>;
    readonly type: 'AssetRegistered' | 'Transfer' | 'Mint' | 'Burn' | 'AssetSetNonMintable' | 'AssetUpdated';
  }

  /** @name MulticollateralBondingCurvePoolEvent (77) */
  interface MulticollateralBondingCurvePoolEvent extends Enum {
    readonly isPoolInitialized: boolean;
    readonly asPoolInitialized: ITuple<[u32, CommonPrimitivesAssetId32]>;
    readonly isReferenceAssetChanged: boolean;
    readonly asReferenceAssetChanged: CommonPrimitivesAssetId32;
    readonly isOptionalRewardMultiplierUpdated: boolean;
    readonly asOptionalRewardMultiplierUpdated: ITuple<[CommonPrimitivesAssetId32, Option<FixnumFixedPoint>]>;
    readonly isPriceBiasChanged: boolean;
    readonly asPriceBiasChanged: u128;
    readonly isPriceChangeConfigChanged: boolean;
    readonly asPriceChangeConfigChanged: ITuple<[u128, u128]>;
    readonly type: 'PoolInitialized' | 'ReferenceAssetChanged' | 'OptionalRewardMultiplierUpdated' | 'PriceBiasChanged' | 'PriceChangeConfigChanged';
  }

  /** @name FixnumFixedPoint (79) */
  interface FixnumFixedPoint extends Struct {
    readonly inner: i128;
  }

  /** @name TechnicalEvent (81) */
  interface TechnicalEvent extends Enum {
    readonly isMinted: boolean;
    readonly asMinted: ITuple<[CommonPrimitivesTechAssetId, CommonPrimitivesTechAccountId, u128, u128]>;
    readonly isBurned: boolean;
    readonly asBurned: ITuple<[CommonPrimitivesTechAssetId, CommonPrimitivesTechAccountId, u128, u128]>;
    readonly isOutputTransferred: boolean;
    readonly asOutputTransferred: ITuple<[CommonPrimitivesTechAssetId, CommonPrimitivesTechAccountId, AccountId32, u128]>;
    readonly isInputTransferred: boolean;
    readonly asInputTransferred: ITuple<[CommonPrimitivesTechAssetId, AccountId32, CommonPrimitivesTechAccountId, u128]>;
    readonly isSwapSuccess: boolean;
    readonly asSwapSuccess: AccountId32;
    readonly type: 'Minted' | 'Burned' | 'OutputTransferred' | 'InputTransferred' | 'SwapSuccess';
  }

  /** @name CommonPrimitivesTechAssetId (82) */
  interface CommonPrimitivesTechAssetId extends Enum {
    readonly isWrapped: boolean;
    readonly asWrapped: CommonPrimitivesPredefinedAssetId;
    readonly isEscaped: boolean;
    readonly asEscaped: U8aFixed;
    readonly type: 'Wrapped' | 'Escaped';
  }

  /** @name CommonPrimitivesTechAccountId (83) */
  interface CommonPrimitivesTechAccountId extends Enum {
    readonly isPure: boolean;
    readonly asPure: ITuple<[u32, CommonPrimitivesTechPurpose]>;
    readonly isGeneric: boolean;
    readonly asGeneric: ITuple<[Bytes, Bytes]>;
    readonly isWrapped: boolean;
    readonly asWrapped: AccountId32;
    readonly isWrappedRepr: boolean;
    readonly asWrappedRepr: AccountId32;
    readonly isNone: boolean;
    readonly type: 'Pure' | 'Generic' | 'Wrapped' | 'WrappedRepr' | 'None';
  }

  /** @name CommonPrimitivesTechPurpose (84) */
  interface CommonPrimitivesTechPurpose extends Enum {
    readonly isFeeCollector: boolean;
    readonly isFeeCollectorForPair: boolean;
    readonly asFeeCollectorForPair: CommonPrimitivesTradingPairTechAssetId;
    readonly isXykLiquidityKeeper: boolean;
    readonly asXykLiquidityKeeper: CommonPrimitivesTradingPairTechAssetId;
    readonly isIdentifier: boolean;
    readonly asIdentifier: Bytes;
    readonly isOrderBookLiquidityKeeper: boolean;
    readonly asOrderBookLiquidityKeeper: CommonPrimitivesTradingPairTechAssetId;
    readonly type: 'FeeCollector' | 'FeeCollectorForPair' | 'XykLiquidityKeeper' | 'Identifier' | 'OrderBookLiquidityKeeper';
  }

  /** @name CommonPrimitivesTradingPairTechAssetId (85) */
  interface CommonPrimitivesTradingPairTechAssetId extends Struct {
    readonly baseAssetId: CommonPrimitivesTechAssetId;
    readonly targetAssetId: CommonPrimitivesTechAssetId;
  }

  /** @name PoolXykEvent (86) */
  interface PoolXykEvent extends Enum {
    readonly isPoolIsInitialized: boolean;
    readonly asPoolIsInitialized: AccountId32;
    readonly type: 'PoolIsInitialized';
  }

  /** @name LiquidityProxyEvent (87) */
  interface LiquidityProxyEvent extends Enum {
    readonly isExchange: boolean;
    readonly asExchange: ITuple<[AccountId32, u32, CommonPrimitivesAssetId32, CommonPrimitivesAssetId32, u128, u128, u128, Vec<CommonPrimitivesLiquiditySourceId>]>;
    readonly isLiquiditySourceEnabled: boolean;
    readonly asLiquiditySourceEnabled: CommonPrimitivesLiquiditySourceType;
    readonly isLiquiditySourceDisabled: boolean;
    readonly asLiquiditySourceDisabled: CommonPrimitivesLiquiditySourceType;
    readonly isBatchSwapExecuted: boolean;
    readonly asBatchSwapExecuted: ITuple<[u128, u128]>;
    readonly isXorlessTransfer: boolean;
    readonly asXorlessTransfer: ITuple<[CommonPrimitivesAssetId32, AccountId32, AccountId32, u128, Option<Bytes>]>;
    readonly isAdarFeeWithdrawn: boolean;
    readonly asAdarFeeWithdrawn: ITuple<[CommonPrimitivesAssetId32, u128]>;
    readonly type: 'Exchange' | 'LiquiditySourceEnabled' | 'LiquiditySourceDisabled' | 'BatchSwapExecuted' | 'XorlessTransfer' | 'AdarFeeWithdrawn';
  }

  /** @name CommonPrimitivesLiquiditySourceId (89) */
  interface CommonPrimitivesLiquiditySourceId extends Struct {
    readonly dexId: u32;
    readonly liquiditySourceIndex: CommonPrimitivesLiquiditySourceType;
  }

  /** @name CommonPrimitivesLiquiditySourceType (90) */
  interface CommonPrimitivesLiquiditySourceType extends Enum {
    readonly isXykPool: boolean;
    readonly isBondingCurvePool: boolean;
    readonly isMulticollateralBondingCurvePool: boolean;
    readonly isMockPool: boolean;
    readonly isMockPool2: boolean;
    readonly isMockPool3: boolean;
    readonly isMockPool4: boolean;
    readonly isXstPool: boolean;
    readonly isOrderBook: boolean;
    readonly type: 'XykPool' | 'BondingCurvePool' | 'MulticollateralBondingCurvePool' | 'MockPool' | 'MockPool2' | 'MockPool3' | 'MockPool4' | 'XstPool' | 'OrderBook';
  }

  /** @name PalletCollectiveEvent (93) */
  interface PalletCollectiveEvent extends Enum {
    readonly isProposed: boolean;
    readonly asProposed: {
      readonly account: AccountId32;
      readonly proposalIndex: u32;
      readonly proposalHash: H256;
      readonly threshold: u32;
    } & Struct;
    readonly isVoted: boolean;
    readonly asVoted: {
      readonly account: AccountId32;
      readonly proposalHash: H256;
      readonly voted: bool;
      readonly yes: u32;
      readonly no: u32;
    } & Struct;
    readonly isApproved: boolean;
    readonly asApproved: {
      readonly proposalHash: H256;
    } & Struct;
    readonly isDisapproved: boolean;
    readonly asDisapproved: {
      readonly proposalHash: H256;
    } & Struct;
    readonly isExecuted: boolean;
    readonly asExecuted: {
      readonly proposalHash: H256;
      readonly result: Result<Null, SpRuntimeDispatchError>;
    } & Struct;
    readonly isMemberExecuted: boolean;
    readonly asMemberExecuted: {
      readonly proposalHash: H256;
      readonly result: Result<Null, SpRuntimeDispatchError>;
    } & Struct;
    readonly isClosed: boolean;
    readonly asClosed: {
      readonly proposalHash: H256;
      readonly yes: u32;
      readonly no: u32;
    } & Struct;
    readonly type: 'Proposed' | 'Voted' | 'Approved' | 'Disapproved' | 'Executed' | 'MemberExecuted' | 'Closed';
  }

  /** @name PalletDemocracyEvent (95) */
  interface PalletDemocracyEvent extends Enum {
    readonly isProposed: boolean;
    readonly asProposed: {
      readonly proposalIndex: u32;
      readonly deposit: u128;
    } & Struct;
    readonly isTabled: boolean;
    readonly asTabled: {
      readonly proposalIndex: u32;
      readonly deposit: u128;
    } & Struct;
    readonly isExternalTabled: boolean;
    readonly isStarted: boolean;
    readonly asStarted: {
      readonly refIndex: u32;
      readonly threshold: PalletDemocracyVoteThreshold;
    } & Struct;
    readonly isPassed: boolean;
    readonly asPassed: {
      readonly refIndex: u32;
    } & Struct;
    readonly isNotPassed: boolean;
    readonly asNotPassed: {
      readonly refIndex: u32;
    } & Struct;
    readonly isCancelled: boolean;
    readonly asCancelled: {
      readonly refIndex: u32;
    } & Struct;
    readonly isDelegated: boolean;
    readonly asDelegated: {
      readonly who: AccountId32;
      readonly target: AccountId32;
    } & Struct;
    readonly isUndelegated: boolean;
    readonly asUndelegated: {
      readonly account: AccountId32;
    } & Struct;
    readonly isVetoed: boolean;
    readonly asVetoed: {
      readonly who: AccountId32;
      readonly proposalHash: H256;
      readonly until: u32;
    } & Struct;
    readonly isBlacklisted: boolean;
    readonly asBlacklisted: {
      readonly proposalHash: H256;
    } & Struct;
    readonly isVoted: boolean;
    readonly asVoted: {
      readonly voter: AccountId32;
      readonly refIndex: u32;
      readonly vote: PalletDemocracyVoteAccountVote;
    } & Struct;
    readonly isSeconded: boolean;
    readonly asSeconded: {
      readonly seconder: AccountId32;
      readonly propIndex: u32;
    } & Struct;
    readonly isProposalCanceled: boolean;
    readonly asProposalCanceled: {
      readonly propIndex: u32;
    } & Struct;
    readonly type: 'Proposed' | 'Tabled' | 'ExternalTabled' | 'Started' | 'Passed' | 'NotPassed' | 'Cancelled' | 'Delegated' | 'Undelegated' | 'Vetoed' | 'Blacklisted' | 'Voted' | 'Seconded' | 'ProposalCanceled';
  }

  /** @name PalletDemocracyVoteThreshold (96) */
  interface PalletDemocracyVoteThreshold extends Enum {
    readonly isSuperMajorityApprove: boolean;
    readonly isSuperMajorityAgainst: boolean;
    readonly isSimpleMajority: boolean;
    readonly type: 'SuperMajorityApprove' | 'SuperMajorityAgainst' | 'SimpleMajority';
  }

  /** @name PalletDemocracyVoteAccountVote (97) */
  interface PalletDemocracyVoteAccountVote extends Enum {
    readonly isStandard: boolean;
    readonly asStandard: {
      readonly vote: Vote;
      readonly balance: u128;
    } & Struct;
    readonly isSplit: boolean;
    readonly asSplit: {
      readonly aye: u128;
      readonly nay: u128;
    } & Struct;
    readonly type: 'Standard' | 'Split';
  }

  /** @name DexApiEvent (99) */
  interface DexApiEvent extends Enum {
    readonly isLiquiditySourceEnabled: boolean;
    readonly asLiquiditySourceEnabled: CommonPrimitivesLiquiditySourceType;
    readonly isLiquiditySourceDisabled: boolean;
    readonly asLiquiditySourceDisabled: CommonPrimitivesLiquiditySourceType;
    readonly type: 'LiquiditySourceEnabled' | 'LiquiditySourceDisabled';
  }

  /** @name EthBridgeEvent (100) */
  interface EthBridgeEvent extends Enum {
    readonly isRequestRegistered: boolean;
    readonly asRequestRegistered: H256;
    readonly isApprovalsCollected: boolean;
    readonly asApprovalsCollected: H256;
    readonly isRequestFinalizationFailed: boolean;
    readonly asRequestFinalizationFailed: H256;
    readonly isIncomingRequestFinalizationFailed: boolean;
    readonly asIncomingRequestFinalizationFailed: H256;
    readonly isIncomingRequestFinalized: boolean;
    readonly asIncomingRequestFinalized: H256;
    readonly isRequestAborted: boolean;
    readonly asRequestAborted: H256;
    readonly isCancellationFailed: boolean;
    readonly asCancellationFailed: H256;
    readonly isRegisterRequestFailed: boolean;
    readonly asRegisterRequestFailed: ITuple<[H256, SpRuntimeDispatchError]>;
    readonly type: 'RequestRegistered' | 'ApprovalsCollected' | 'RequestFinalizationFailed' | 'IncomingRequestFinalizationFailed' | 'IncomingRequestFinalized' | 'RequestAborted' | 'CancellationFailed' | 'RegisterRequestFailed';
  }

  /** @name PswapDistributionEvent (101) */
  interface PswapDistributionEvent extends Enum {
    readonly isFeesExchanged: boolean;
    readonly asFeesExchanged: ITuple<[u32, AccountId32, CommonPrimitivesAssetId32, u128, CommonPrimitivesAssetId32, u128]>;
    readonly isFeesExchangeFailed: boolean;
    readonly asFeesExchangeFailed: ITuple<[u32, AccountId32, CommonPrimitivesAssetId32, u128, CommonPrimitivesAssetId32, SpRuntimeDispatchError]>;
    readonly isIncentiveDistributed: boolean;
    readonly asIncentiveDistributed: ITuple<[u32, AccountId32, CommonPrimitivesAssetId32, u128, u128]>;
    readonly isIncentiveDistributionFailed: boolean;
    readonly asIncentiveDistributionFailed: ITuple<[u32, AccountId32]>;
    readonly isBurnRateChanged: boolean;
    readonly asBurnRateChanged: FixnumFixedPoint;
    readonly isNothingToExchange: boolean;
    readonly asNothingToExchange: ITuple<[u32, AccountId32]>;
    readonly isNothingToDistribute: boolean;
    readonly asNothingToDistribute: ITuple<[u32, AccountId32]>;
    readonly isIncentivesBurnedAfterExchange: boolean;
    readonly asIncentivesBurnedAfterExchange: ITuple<[u32, CommonPrimitivesAssetId32, u128, u128]>;
    readonly type: 'FeesExchanged' | 'FeesExchangeFailed' | 'IncentiveDistributed' | 'IncentiveDistributionFailed' | 'BurnRateChanged' | 'NothingToExchange' | 'NothingToDistribute' | 'IncentivesBurnedAfterExchange';
  }

  /** @name PalletMultisigTimepoint (103) */
  interface PalletMultisigTimepoint extends Struct {
    readonly height: u32;
    readonly index: u32;
  }

  /** @name PalletSchedulerEvent (104) */
  interface PalletSchedulerEvent extends Enum {
    readonly isScheduled: boolean;
    readonly asScheduled: {
      readonly when: u32;
      readonly index: u32;
    } & Struct;
    readonly isCanceled: boolean;
    readonly asCanceled: {
      readonly when: u32;
      readonly index: u32;
    } & Struct;
    readonly isDispatched: boolean;
    readonly asDispatched: {
      readonly task: ITuple<[u32, u32]>;
      readonly id: Option<U8aFixed>;
      readonly result: Result<Null, SpRuntimeDispatchError>;
    } & Struct;
    readonly isCallUnavailable: boolean;
    readonly asCallUnavailable: {
      readonly task: ITuple<[u32, u32]>;
      readonly id: Option<U8aFixed>;
    } & Struct;
    readonly isPeriodicFailed: boolean;
    readonly asPeriodicFailed: {
      readonly task: ITuple<[u32, u32]>;
      readonly id: Option<U8aFixed>;
    } & Struct;
    readonly isPermanentlyOverweight: boolean;
    readonly asPermanentlyOverweight: {
      readonly task: ITuple<[u32, u32]>;
      readonly id: Option<U8aFixed>;
    } & Struct;
    readonly type: 'Scheduled' | 'Canceled' | 'Dispatched' | 'CallUnavailable' | 'PeriodicFailed' | 'PermanentlyOverweight';
  }

  /** @name IrohaMigrationEvent (107) */
  interface IrohaMigrationEvent extends Enum {
    readonly isMigrated: boolean;
    readonly asMigrated: ITuple<[Text, AccountId32]>;
    readonly type: 'Migrated';
  }

  /** @name PalletMembershipEvent (109) */
  interface PalletMembershipEvent extends Enum {
    readonly isMemberAdded: boolean;
    readonly isMemberRemoved: boolean;
    readonly isMembersSwapped: boolean;
    readonly isMembersReset: boolean;
    readonly isKeyChanged: boolean;
    readonly isDummy: boolean;
    readonly type: 'MemberAdded' | 'MemberRemoved' | 'MembersSwapped' | 'MembersReset' | 'KeyChanged' | 'Dummy';
  }

  /** @name PalletElectionsPhragmenEvent (110) */
  interface PalletElectionsPhragmenEvent extends Enum {
    readonly isNewTerm: boolean;
    readonly asNewTerm: {
      readonly newMembers: Vec<ITuple<[AccountId32, u128]>>;
    } & Struct;
    readonly isEmptyTerm: boolean;
    readonly isElectionError: boolean;
    readonly isMemberKicked: boolean;
    readonly asMemberKicked: {
      readonly member: AccountId32;
    } & Struct;
    readonly isRenounced: boolean;
    readonly asRenounced: {
      readonly candidate: AccountId32;
    } & Struct;
    readonly isCandidateSlashed: boolean;
    readonly asCandidateSlashed: {
      readonly candidate: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isSeatHolderSlashed: boolean;
    readonly asSeatHolderSlashed: {
      readonly seatHolder: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly type: 'NewTerm' | 'EmptyTerm' | 'ElectionError' | 'MemberKicked' | 'Renounced' | 'CandidateSlashed' | 'SeatHolderSlashed';
  }

  /** @name VestedRewardsEvent (113) */
  interface VestedRewardsEvent extends Enum {
    readonly isRewardsVested: boolean;
    readonly asRewardsVested: u128;
    readonly isActualDoesntMatchAvailable: boolean;
    readonly asActualDoesntMatchAvailable: CommonPrimitivesRewardReason;
    readonly isFailedToSaveCalculatedReward: boolean;
    readonly asFailedToSaveCalculatedReward: AccountId32;
    readonly isCrowdloanClaimed: boolean;
    readonly asCrowdloanClaimed: ITuple<[AccountId32, CommonPrimitivesAssetId32, u128]>;
    readonly type: 'RewardsVested' | 'ActualDoesntMatchAvailable' | 'FailedToSaveCalculatedReward' | 'CrowdloanClaimed';
  }

  /** @name CommonPrimitivesRewardReason (114) */
  interface CommonPrimitivesRewardReason extends Enum {
    readonly isUnspecified: boolean;
    readonly isBuyOnBondingCurve: boolean;
    readonly isLiquidityProvisionFarming: boolean;
    readonly isDeprecatedMarketMakerVolume: boolean;
    readonly isCrowdloan: boolean;
    readonly type: 'Unspecified' | 'BuyOnBondingCurve' | 'LiquidityProvisionFarming' | 'DeprecatedMarketMakerVolume' | 'Crowdloan';
  }

  /** @name PalletIdentityEvent (115) */
  interface PalletIdentityEvent extends Enum {
    readonly isIdentitySet: boolean;
    readonly asIdentitySet: {
      readonly who: AccountId32;
    } & Struct;
    readonly isIdentityCleared: boolean;
    readonly asIdentityCleared: {
      readonly who: AccountId32;
      readonly deposit: u128;
    } & Struct;
    readonly isIdentityKilled: boolean;
    readonly asIdentityKilled: {
      readonly who: AccountId32;
      readonly deposit: u128;
    } & Struct;
    readonly isJudgementRequested: boolean;
    readonly asJudgementRequested: {
      readonly who: AccountId32;
      readonly registrarIndex: u32;
    } & Struct;
    readonly isJudgementUnrequested: boolean;
    readonly asJudgementUnrequested: {
      readonly who: AccountId32;
      readonly registrarIndex: u32;
    } & Struct;
    readonly isJudgementGiven: boolean;
    readonly asJudgementGiven: {
      readonly target: AccountId32;
      readonly registrarIndex: u32;
    } & Struct;
    readonly isRegistrarAdded: boolean;
    readonly asRegistrarAdded: {
      readonly registrarIndex: u32;
    } & Struct;
    readonly isSubIdentityAdded: boolean;
    readonly asSubIdentityAdded: {
      readonly sub: AccountId32;
      readonly main: AccountId32;
      readonly deposit: u128;
    } & Struct;
    readonly isSubIdentityRemoved: boolean;
    readonly asSubIdentityRemoved: {
      readonly sub: AccountId32;
      readonly main: AccountId32;
      readonly deposit: u128;
    } & Struct;
    readonly isSubIdentityRevoked: boolean;
    readonly asSubIdentityRevoked: {
      readonly sub: AccountId32;
      readonly main: AccountId32;
      readonly deposit: u128;
    } & Struct;
    readonly type: 'IdentitySet' | 'IdentityCleared' | 'IdentityKilled' | 'JudgementRequested' | 'JudgementUnrequested' | 'JudgementGiven' | 'RegistrarAdded' | 'SubIdentityAdded' | 'SubIdentityRemoved' | 'SubIdentityRevoked';
  }

  /** @name XstEvent (116) */
  interface XstEvent extends Enum {
    readonly isReferenceAssetChanged: boolean;
    readonly asReferenceAssetChanged: CommonPrimitivesAssetId32;
    readonly isSyntheticAssetEnabled: boolean;
    readonly asSyntheticAssetEnabled: ITuple<[CommonPrimitivesAssetId32, Bytes]>;
    readonly isSyntheticAssetDisabled: boolean;
    readonly asSyntheticAssetDisabled: CommonPrimitivesAssetId32;
    readonly isSyntheticAssetFeeChanged: boolean;
    readonly asSyntheticAssetFeeChanged: ITuple<[CommonPrimitivesAssetId32, FixnumFixedPoint]>;
    readonly isSyntheticBaseAssetFloorPriceChanged: boolean;
    readonly asSyntheticBaseAssetFloorPriceChanged: u128;
    readonly isSyntheticAssetRemoved: boolean;
    readonly asSyntheticAssetRemoved: ITuple<[CommonPrimitivesAssetId32, Bytes]>;
    readonly type: 'ReferenceAssetChanged' | 'SyntheticAssetEnabled' | 'SyntheticAssetDisabled' | 'SyntheticAssetFeeChanged' | 'SyntheticBaseAssetFloorPriceChanged' | 'SyntheticAssetRemoved';
  }

  /** @name PriceToolsEvent (118) */
  type PriceToolsEvent = Null;

  /** @name CeresStakingEvent (119) */
  interface CeresStakingEvent extends Enum {
    readonly isDeposited: boolean;
    readonly asDeposited: ITuple<[AccountId32, u128]>;
    readonly isWithdrawn: boolean;
    readonly asWithdrawn: ITuple<[AccountId32, u128, u128]>;
    readonly isRewardsChanged: boolean;
    readonly asRewardsChanged: u128;
    readonly type: 'Deposited' | 'Withdrawn' | 'RewardsChanged';
  }

  /** @name CeresLiquidityLockerEvent (120) */
  interface CeresLiquidityLockerEvent extends Enum {
    readonly isLocked: boolean;
    readonly asLocked: ITuple<[AccountId32, u128, u64]>;
    readonly type: 'Locked';
  }

  /** @name CeresTokenLockerEvent (121) */
  interface CeresTokenLockerEvent extends Enum {
    readonly isLocked: boolean;
    readonly asLocked: ITuple<[AccountId32, u128, CommonPrimitivesAssetId32]>;
    readonly isWithdrawn: boolean;
    readonly asWithdrawn: ITuple<[AccountId32, u128, CommonPrimitivesAssetId32]>;
    readonly isFeeChanged: boolean;
    readonly asFeeChanged: ITuple<[AccountId32, u128]>;
    readonly type: 'Locked' | 'Withdrawn' | 'FeeChanged';
  }

  /** @name CeresGovernancePlatformEvent (122) */
  interface CeresGovernancePlatformEvent extends Enum {
    readonly isVoted: boolean;
    readonly asVoted: ITuple<[AccountId32, H256, u32, CommonPrimitivesAssetId32, u128]>;
    readonly isCreated: boolean;
    readonly asCreated: ITuple<[AccountId32, Bytes, CommonPrimitivesAssetId32, u64, u64]>;
    readonly isWithdrawn: boolean;
    readonly asWithdrawn: ITuple<[AccountId32, H256, CommonPrimitivesAssetId32, u128]>;
    readonly type: 'Voted' | 'Created' | 'Withdrawn';
  }

  /** @name CeresLaunchpadEvent (125) */
  interface CeresLaunchpadEvent extends Enum {
    readonly isIloCreated: boolean;
    readonly asIloCreated: ITuple<[AccountId32, CommonPrimitivesAssetId32]>;
    readonly isContributed: boolean;
    readonly asContributed: ITuple<[AccountId32, CommonPrimitivesAssetId32, u128]>;
    readonly isEmergencyWithdrawn: boolean;
    readonly asEmergencyWithdrawn: ITuple<[AccountId32, CommonPrimitivesAssetId32, u128]>;
    readonly isIloFinished: boolean;
    readonly asIloFinished: ITuple<[AccountId32, CommonPrimitivesAssetId32]>;
    readonly isClaimedLP: boolean;
    readonly asClaimedLP: ITuple<[AccountId32, CommonPrimitivesAssetId32]>;
    readonly isClaimed: boolean;
    readonly asClaimed: ITuple<[AccountId32, CommonPrimitivesAssetId32]>;
    readonly isFeeChanged: boolean;
    readonly asFeeChanged: u128;
    readonly isClaimedPSWAP: boolean;
    readonly isWhitelistedContributor: boolean;
    readonly asWhitelistedContributor: AccountId32;
    readonly isWhitelistedIloOrganizer: boolean;
    readonly asWhitelistedIloOrganizer: AccountId32;
    readonly isRemovedWhitelistedContributor: boolean;
    readonly asRemovedWhitelistedContributor: AccountId32;
    readonly isRemovedWhitelistedIloOrganizer: boolean;
    readonly asRemovedWhitelistedIloOrganizer: AccountId32;
    readonly type: 'IloCreated' | 'Contributed' | 'EmergencyWithdrawn' | 'IloFinished' | 'ClaimedLP' | 'Claimed' | 'FeeChanged' | 'ClaimedPSWAP' | 'WhitelistedContributor' | 'WhitelistedIloOrganizer' | 'RemovedWhitelistedContributor' | 'RemovedWhitelistedIloOrganizer';
  }

  /** @name DemeterFarmingPlatformEvent (126) */
  interface DemeterFarmingPlatformEvent extends Enum {
    readonly isTokenRegistered: boolean;
    readonly asTokenRegistered: ITuple<[AccountId32, CommonPrimitivesAssetId32]>;
    readonly isPoolAdded: boolean;
    readonly asPoolAdded: ITuple<[AccountId32, CommonPrimitivesAssetId32, CommonPrimitivesAssetId32, CommonPrimitivesAssetId32, bool]>;
    readonly isRewardWithdrawn: boolean;
    readonly asRewardWithdrawn: ITuple<[AccountId32, u128, CommonPrimitivesAssetId32, CommonPrimitivesAssetId32, CommonPrimitivesAssetId32, bool]>;
    readonly isWithdrawn: boolean;
    readonly asWithdrawn: ITuple<[AccountId32, u128, CommonPrimitivesAssetId32, CommonPrimitivesAssetId32, CommonPrimitivesAssetId32, bool]>;
    readonly isPoolRemoved: boolean;
    readonly asPoolRemoved: ITuple<[AccountId32, CommonPrimitivesAssetId32, CommonPrimitivesAssetId32, CommonPrimitivesAssetId32, bool]>;
    readonly isDeposited: boolean;
    readonly asDeposited: ITuple<[AccountId32, CommonPrimitivesAssetId32, CommonPrimitivesAssetId32, CommonPrimitivesAssetId32, bool, u128]>;
    readonly isMultiplierChanged: boolean;
    readonly asMultiplierChanged: ITuple<[AccountId32, CommonPrimitivesAssetId32, CommonPrimitivesAssetId32, CommonPrimitivesAssetId32, bool, u32]>;
    readonly isDepositFeeChanged: boolean;
    readonly asDepositFeeChanged: ITuple<[AccountId32, CommonPrimitivesAssetId32, CommonPrimitivesAssetId32, CommonPrimitivesAssetId32, bool, u128]>;
    readonly isTokenInfoChanged: boolean;
    readonly asTokenInfoChanged: ITuple<[AccountId32, CommonPrimitivesAssetId32]>;
    readonly isTotalTokensChanged: boolean;
    readonly asTotalTokensChanged: ITuple<[AccountId32, CommonPrimitivesAssetId32, CommonPrimitivesAssetId32, CommonPrimitivesAssetId32, bool, u128]>;
    readonly isInfoChanged: boolean;
    readonly asInfoChanged: ITuple<[AccountId32, CommonPrimitivesAssetId32, CommonPrimitivesAssetId32, CommonPrimitivesAssetId32, bool, u128]>;
    readonly type: 'TokenRegistered' | 'PoolAdded' | 'RewardWithdrawn' | 'Withdrawn' | 'PoolRemoved' | 'Deposited' | 'MultiplierChanged' | 'DepositFeeChanged' | 'TokenInfoChanged' | 'TotalTokensChanged' | 'InfoChanged';
  }

  /** @name PalletBagsListEvent (127) */
  interface PalletBagsListEvent extends Enum {
    readonly isRebagged: boolean;
    readonly asRebagged: {
      readonly who: AccountId32;
      readonly from: u64;
      readonly to: u64;
    } & Struct;
    readonly isScoreUpdated: boolean;
    readonly asScoreUpdated: {
      readonly who: AccountId32;
      readonly newScore: u64;
    } & Struct;
    readonly type: 'Rebagged' | 'ScoreUpdated';
  }

  /** @name PalletElectionProviderMultiPhaseEvent (128) */
  interface PalletElectionProviderMultiPhaseEvent extends Enum {
    readonly isSolutionStored: boolean;
    readonly asSolutionStored: {
      readonly compute: PalletElectionProviderMultiPhaseElectionCompute;
      readonly origin: Option<AccountId32>;
      readonly prevEjected: bool;
    } & Struct;
    readonly isElectionFinalized: boolean;
    readonly asElectionFinalized: {
      readonly compute: PalletElectionProviderMultiPhaseElectionCompute;
      readonly score: SpNposElectionsElectionScore;
    } & Struct;
    readonly isElectionFailed: boolean;
    readonly isRewarded: boolean;
    readonly asRewarded: {
      readonly account: AccountId32;
      readonly value: u128;
    } & Struct;
    readonly isSlashed: boolean;
    readonly asSlashed: {
      readonly account: AccountId32;
      readonly value: u128;
    } & Struct;
    readonly isPhaseTransitioned: boolean;
    readonly asPhaseTransitioned: {
      readonly from: PalletElectionProviderMultiPhasePhase;
      readonly to: PalletElectionProviderMultiPhasePhase;
      readonly round: u32;
    } & Struct;
    readonly type: 'SolutionStored' | 'ElectionFinalized' | 'ElectionFailed' | 'Rewarded' | 'Slashed' | 'PhaseTransitioned';
  }

  /** @name PalletElectionProviderMultiPhaseElectionCompute (129) */
  interface PalletElectionProviderMultiPhaseElectionCompute extends Enum {
    readonly isOnChain: boolean;
    readonly isSigned: boolean;
    readonly isUnsigned: boolean;
    readonly isFallback: boolean;
    readonly isEmergency: boolean;
    readonly type: 'OnChain' | 'Signed' | 'Unsigned' | 'Fallback' | 'Emergency';
  }

  /** @name SpNposElectionsElectionScore (131) */
  interface SpNposElectionsElectionScore extends Struct {
    readonly minimalStake: u128;
    readonly sumStake: u128;
    readonly sumStakeSquared: u128;
  }

  /** @name PalletElectionProviderMultiPhasePhase (132) */
  interface PalletElectionProviderMultiPhasePhase extends Enum {
    readonly isOff: boolean;
    readonly isSigned: boolean;
    readonly isUnsigned: boolean;
    readonly asUnsigned: ITuple<[bool, u32]>;
    readonly isEmergency: boolean;
    readonly type: 'Off' | 'Signed' | 'Unsigned' | 'Emergency';
  }

  /** @name BandEvent (134) */
  interface BandEvent extends Enum {
    readonly isSymbolsRelayed: boolean;
    readonly asSymbolsRelayed: Vec<ITuple<[Bytes, u128]>>;
    readonly isRelayersAdded: boolean;
    readonly asRelayersAdded: Vec<AccountId32>;
    readonly isRelayersRemoved: boolean;
    readonly asRelayersRemoved: Vec<AccountId32>;
    readonly type: 'SymbolsRelayed' | 'RelayersAdded' | 'RelayersRemoved';
  }

  /** @name OracleProxyEvent (138) */
  interface OracleProxyEvent extends Enum {
    readonly isOracleEnabled: boolean;
    readonly asOracleEnabled: CommonPrimitivesOracle;
    readonly isOracleDisabled: boolean;
    readonly asOracleDisabled: CommonPrimitivesOracle;
    readonly type: 'OracleEnabled' | 'OracleDisabled';
  }

  /** @name CommonPrimitivesOracle (139) */
  interface CommonPrimitivesOracle extends Enum {
    readonly isBandChainFeed: boolean;
    readonly type: 'BandChainFeed';
  }

  /** @name HermesGovernancePlatformEvent (140) */
  interface HermesGovernancePlatformEvent extends Enum {
    readonly isVoted: boolean;
    readonly asVoted: ITuple<[AccountId32, H256, Bytes]>;
    readonly isCreated: boolean;
    readonly asCreated: ITuple<[AccountId32, Bytes, u64, u64]>;
    readonly isVoterFundsWithdrawn: boolean;
    readonly asVoterFundsWithdrawn: ITuple<[AccountId32, u128]>;
    readonly isCreatorFundsWithdrawn: boolean;
    readonly asCreatorFundsWithdrawn: ITuple<[AccountId32, u128]>;
    readonly isMinimumHermesForVotingChanged: boolean;
    readonly asMinimumHermesForVotingChanged: u128;
    readonly isMinimumHermesForCreatingPollChanged: boolean;
    readonly asMinimumHermesForCreatingPollChanged: u128;
    readonly type: 'Voted' | 'Created' | 'VoterFundsWithdrawn' | 'CreatorFundsWithdrawn' | 'MinimumHermesForVotingChanged' | 'MinimumHermesForCreatingPollChanged';
  }

  /** @name PalletPreimageEvent (143) */
  interface PalletPreimageEvent extends Enum {
    readonly isNoted: boolean;
    readonly asNoted: {
      readonly hash_: H256;
    } & Struct;
    readonly isRequested: boolean;
    readonly asRequested: {
      readonly hash_: H256;
    } & Struct;
    readonly isCleared: boolean;
    readonly asCleared: {
      readonly hash_: H256;
    } & Struct;
    readonly type: 'Noted' | 'Requested' | 'Cleared';
  }

  /** @name OrderBookEvent (144) */
  interface OrderBookEvent extends Enum {
    readonly isOrderBookCreated: boolean;
    readonly asOrderBookCreated: {
      readonly orderBookId: OrderBookOrderBookId;
      readonly creator: Option<AccountId32>;
    } & Struct;
    readonly isOrderBookDeleted: boolean;
    readonly asOrderBookDeleted: {
      readonly orderBookId: OrderBookOrderBookId;
    } & Struct;
    readonly isOrderBookStatusChanged: boolean;
    readonly asOrderBookStatusChanged: {
      readonly orderBookId: OrderBookOrderBookId;
      readonly newStatus: OrderBookOrderBookStatus;
    } & Struct;
    readonly isOrderBookUpdated: boolean;
    readonly asOrderBookUpdated: {
      readonly orderBookId: OrderBookOrderBookId;
    } & Struct;
    readonly isLimitOrderPlaced: boolean;
    readonly asLimitOrderPlaced: {
      readonly orderBookId: OrderBookOrderBookId;
      readonly orderId: u128;
      readonly ownerId: AccountId32;
      readonly side: CommonPrimitivesPriceVariant;
      readonly price: CommonBalanceUnit;
      readonly amount: CommonBalanceUnit;
      readonly lifetime: u64;
    } & Struct;
    readonly isLimitOrderConvertedToMarketOrder: boolean;
    readonly asLimitOrderConvertedToMarketOrder: {
      readonly orderBookId: OrderBookOrderBookId;
      readonly ownerId: AccountId32;
      readonly direction: CommonPrimitivesPriceVariant;
      readonly amount: OrderBookOrderAmount;
      readonly averagePrice: CommonBalanceUnit;
    } & Struct;
    readonly isLimitOrderIsSplitIntoMarketOrderAndLimitOrder: boolean;
    readonly asLimitOrderIsSplitIntoMarketOrderAndLimitOrder: {
      readonly orderBookId: OrderBookOrderBookId;
      readonly ownerId: AccountId32;
      readonly marketOrderDirection: CommonPrimitivesPriceVariant;
      readonly marketOrderAmount: OrderBookOrderAmount;
      readonly marketOrderAveragePrice: CommonBalanceUnit;
      readonly limitOrderId: u128;
    } & Struct;
    readonly isLimitOrderCanceled: boolean;
    readonly asLimitOrderCanceled: {
      readonly orderBookId: OrderBookOrderBookId;
      readonly orderId: u128;
      readonly ownerId: AccountId32;
      readonly reason: OrderBookCancelReason;
    } & Struct;
    readonly isLimitOrderExecuted: boolean;
    readonly asLimitOrderExecuted: {
      readonly orderBookId: OrderBookOrderBookId;
      readonly orderId: u128;
      readonly ownerId: AccountId32;
      readonly side: CommonPrimitivesPriceVariant;
      readonly price: CommonBalanceUnit;
      readonly amount: OrderBookOrderAmount;
    } & Struct;
    readonly isLimitOrderFilled: boolean;
    readonly asLimitOrderFilled: {
      readonly orderBookId: OrderBookOrderBookId;
      readonly orderId: u128;
      readonly ownerId: AccountId32;
    } & Struct;
    readonly isLimitOrderUpdated: boolean;
    readonly asLimitOrderUpdated: {
      readonly orderBookId: OrderBookOrderBookId;
      readonly orderId: u128;
      readonly ownerId: AccountId32;
      readonly newAmount: CommonBalanceUnit;
    } & Struct;
    readonly isMarketOrderExecuted: boolean;
    readonly asMarketOrderExecuted: {
      readonly orderBookId: OrderBookOrderBookId;
      readonly ownerId: AccountId32;
      readonly direction: CommonPrimitivesPriceVariant;
      readonly amount: OrderBookOrderAmount;
      readonly averagePrice: CommonBalanceUnit;
      readonly to: Option<AccountId32>;
    } & Struct;
    readonly isExpirationFailure: boolean;
    readonly asExpirationFailure: {
      readonly orderBookId: OrderBookOrderBookId;
      readonly orderId: u128;
      readonly error: SpRuntimeDispatchError;
    } & Struct;
    readonly isAlignmentFailure: boolean;
    readonly asAlignmentFailure: {
      readonly orderBookId: OrderBookOrderBookId;
      readonly error: SpRuntimeDispatchError;
    } & Struct;
    readonly type: 'OrderBookCreated' | 'OrderBookDeleted' | 'OrderBookStatusChanged' | 'OrderBookUpdated' | 'LimitOrderPlaced' | 'LimitOrderConvertedToMarketOrder' | 'LimitOrderIsSplitIntoMarketOrderAndLimitOrder' | 'LimitOrderCanceled' | 'LimitOrderExecuted' | 'LimitOrderFilled' | 'LimitOrderUpdated' | 'MarketOrderExecuted' | 'ExpirationFailure' | 'AlignmentFailure';
  }

  /** @name OrderBookOrderBookId (145) */
  interface OrderBookOrderBookId extends Struct {
    readonly dexId: u32;
    readonly base: CommonPrimitivesAssetId32;
    readonly quote: CommonPrimitivesAssetId32;
  }

  /** @name OrderBookOrderBookStatus (146) */
  interface OrderBookOrderBookStatus extends Enum {
    readonly isTrade: boolean;
    readonly isPlaceAndCancel: boolean;
    readonly isOnlyCancel: boolean;
    readonly isStop: boolean;
    readonly type: 'Trade' | 'PlaceAndCancel' | 'OnlyCancel' | 'Stop';
  }

  /** @name CommonPrimitivesPriceVariant (147) */
  interface CommonPrimitivesPriceVariant extends Enum {
    readonly isBuy: boolean;
    readonly isSell: boolean;
    readonly type: 'Buy' | 'Sell';
  }

  /** @name CommonBalanceUnit (148) */
  interface CommonBalanceUnit extends Struct {
    readonly inner: u128;
    readonly isDivisible: bool;
  }

  /** @name OrderBookOrderAmount (149) */
  interface OrderBookOrderAmount extends Enum {
    readonly isBase: boolean;
    readonly asBase: CommonBalanceUnit;
    readonly isQuote: boolean;
    readonly asQuote: CommonBalanceUnit;
    readonly type: 'Base' | 'Quote';
  }

  /** @name OrderBookCancelReason (150) */
  interface OrderBookCancelReason extends Enum {
    readonly isManual: boolean;
    readonly isExpired: boolean;
    readonly isAligned: boolean;
    readonly type: 'Manual' | 'Expired' | 'Aligned';
  }

  /** @name LeafProviderEvent (151) */
  type LeafProviderEvent = Null;

  /** @name BridgeProxyEvent (152) */
  interface BridgeProxyEvent extends Enum {
    readonly isRequestStatusUpdate: boolean;
    readonly asRequestStatusUpdate: ITuple<[H256, BridgeTypesMessageStatus]>;
    readonly isRefundFailed: boolean;
    readonly asRefundFailed: H256;
    readonly type: 'RequestStatusUpdate' | 'RefundFailed';
  }

  /** @name BridgeTypesMessageStatus (153) */
  interface BridgeTypesMessageStatus extends Enum {
    readonly isInQueue: boolean;
    readonly isCommitted: boolean;
    readonly isDone: boolean;
    readonly isFailed: boolean;
    readonly isRefunded: boolean;
    readonly isApproved: boolean;
    readonly type: 'InQueue' | 'Committed' | 'Done' | 'Failed' | 'Refunded' | 'Approved';
  }

  /** @name EthereumLightClientEvent (154) */
  interface EthereumLightClientEvent extends Enum {
    readonly isFinalized: boolean;
    readonly asFinalized: ITuple<[U256, BridgeTypesHeaderHeaderId]>;
    readonly type: 'Finalized';
  }

  /** @name BridgeTypesHeaderHeaderId (157) */
  interface BridgeTypesHeaderHeaderId extends Struct {
    readonly number: u64;
    readonly hash_: H256;
  }

  /** @name BridgeInboundChannelEvent (158) */
  type BridgeInboundChannelEvent = Null;

  /** @name BridgeOutboundChannelEvent (159) */
  interface BridgeOutboundChannelEvent extends Enum {
    readonly isMessageAccepted: boolean;
    readonly asMessageAccepted: ITuple<[U256, u64, u64]>;
    readonly type: 'MessageAccepted';
  }

  /** @name DispatchEvent (160) */
  interface DispatchEvent extends Enum {
    readonly isMessageDispatched: boolean;
    readonly asMessageDispatched: ITuple<[BridgeTypesMessageId, Result<Null, SpRuntimeDispatchError>]>;
    readonly isMessageRejected: boolean;
    readonly asMessageRejected: BridgeTypesMessageId;
    readonly isMessageDecodeFailed: boolean;
    readonly asMessageDecodeFailed: BridgeTypesMessageId;
    readonly type: 'MessageDispatched' | 'MessageRejected' | 'MessageDecodeFailed';
  }

  /** @name BridgeTypesMessageId (161) */
  interface BridgeTypesMessageId extends Struct {
    readonly sender: BridgeTypesGenericNetworkId;
    readonly receiver: BridgeTypesGenericNetworkId;
    readonly batchNonce: Option<u64>;
    readonly messageNonce: u64;
  }

  /** @name BridgeTypesGenericNetworkId (162) */
  interface BridgeTypesGenericNetworkId extends Enum {
    readonly isEvm: boolean;
    readonly asEvm: U256;
    readonly isSub: boolean;
    readonly asSub: BridgeTypesSubNetworkId;
    readonly isEvmLegacy: boolean;
    readonly asEvmLegacy: u32;
    readonly type: 'Evm' | 'Sub' | 'EvmLegacy';
  }

  /** @name BridgeTypesSubNetworkId (163) */
  interface BridgeTypesSubNetworkId extends Enum {
    readonly isMainnet: boolean;
    readonly isKusama: boolean;
    readonly isPolkadot: boolean;
    readonly isRococo: boolean;
    readonly isAlphanet: boolean;
    readonly isLiberland: boolean;
    readonly type: 'Mainnet' | 'Kusama' | 'Polkadot' | 'Rococo' | 'Alphanet' | 'Liberland';
  }

  /** @name EthAppEvent (165) */
  interface EthAppEvent extends Enum {
    readonly isBurned: boolean;
    readonly asBurned: ITuple<[U256, AccountId32, H160, u128]>;
    readonly isMinted: boolean;
    readonly asMinted: ITuple<[U256, H160, AccountId32, u128]>;
    readonly isRefunded: boolean;
    readonly asRefunded: ITuple<[U256, AccountId32, u128]>;
    readonly type: 'Burned' | 'Minted' | 'Refunded';
  }

  /** @name Erc20AppEvent (168) */
  interface Erc20AppEvent extends Enum {
    readonly isBurned: boolean;
    readonly asBurned: ITuple<[U256, CommonPrimitivesAssetId32, AccountId32, H160, u128]>;
    readonly isMinted: boolean;
    readonly asMinted: ITuple<[U256, CommonPrimitivesAssetId32, H160, AccountId32, u128]>;
    readonly isRefunded: boolean;
    readonly asRefunded: ITuple<[U256, AccountId32, CommonPrimitivesAssetId32, u128]>;
    readonly type: 'Burned' | 'Minted' | 'Refunded';
  }

  /** @name MigrationAppEvent (169) */
  interface MigrationAppEvent extends Enum {
    readonly isErc20Migrated: boolean;
    readonly asErc20Migrated: ITuple<[U256, H160]>;
    readonly isSidechainMigrated: boolean;
    readonly asSidechainMigrated: ITuple<[U256, H160]>;
    readonly isEthMigrated: boolean;
    readonly asEthMigrated: ITuple<[U256, H160]>;
    readonly type: 'Erc20Migrated' | 'SidechainMigrated' | 'EthMigrated';
  }

  /** @name BeefyLightClientEvent (170) */
  interface BeefyLightClientEvent extends Enum {
    readonly isVerificationSuccessful: boolean;
    readonly asVerificationSuccessful: ITuple<[BridgeTypesSubNetworkId, AccountId32, u32]>;
    readonly isNewMMRRoot: boolean;
    readonly asNewMMRRoot: ITuple<[BridgeTypesSubNetworkId, H256, u64]>;
    readonly isValidatorRegistryUpdated: boolean;
    readonly asValidatorRegistryUpdated: ITuple<[BridgeTypesSubNetworkId, H256, u32, u64]>;
    readonly type: 'VerificationSuccessful' | 'NewMMRRoot' | 'ValidatorRegistryUpdated';
  }

  /** @name SubstrateBridgeChannelInboundPalletEvent (171) */
  type SubstrateBridgeChannelInboundPalletEvent = Null;

  /** @name SubstrateBridgeChannelOutboundPalletEvent (172) */
  interface SubstrateBridgeChannelOutboundPalletEvent extends Enum {
    readonly isMessageAccepted: boolean;
    readonly asMessageAccepted: {
      readonly networkId: BridgeTypesSubNetworkId;
      readonly batchNonce: u64;
      readonly messageNonce: u64;
    } & Struct;
    readonly type: 'MessageAccepted';
  }

  /** @name ParachainBridgeAppEvent (174) */
  interface ParachainBridgeAppEvent extends Enum {
    readonly isBurned: boolean;
    readonly asBurned: ITuple<[BridgeTypesSubNetworkId, CommonPrimitivesAssetId32, AccountId32, XcmVersionedMultiLocation, u128]>;
    readonly isMinted: boolean;
    readonly asMinted: ITuple<[BridgeTypesSubNetworkId, CommonPrimitivesAssetId32, Option<XcmVersionedMultiLocation>, AccountId32, u128]>;
    readonly type: 'Burned' | 'Minted';
  }

  /** @name XcmVersionedMultiLocation (175) */
  interface XcmVersionedMultiLocation extends Enum {
    readonly isV2: boolean;
    readonly asV2: XcmV2MultiLocation;
    readonly isV3: boolean;
    readonly asV3: XcmV3MultiLocation;
    readonly type: 'V2' | 'V3';
  }

  /** @name XcmV2MultiLocation (176) */
  interface XcmV2MultiLocation extends Struct {
    readonly parents: u8;
    readonly interior: XcmV2MultilocationJunctions;
  }

  /** @name XcmV2MultilocationJunctions (177) */
  interface XcmV2MultilocationJunctions extends Enum {
    readonly isHere: boolean;
    readonly isX1: boolean;
    readonly asX1: XcmV2Junction;
    readonly isX2: boolean;
    readonly asX2: ITuple<[XcmV2Junction, XcmV2Junction]>;
    readonly isX3: boolean;
    readonly asX3: ITuple<[XcmV2Junction, XcmV2Junction, XcmV2Junction]>;
    readonly isX4: boolean;
    readonly asX4: ITuple<[XcmV2Junction, XcmV2Junction, XcmV2Junction, XcmV2Junction]>;
    readonly isX5: boolean;
    readonly asX5: ITuple<[XcmV2Junction, XcmV2Junction, XcmV2Junction, XcmV2Junction, XcmV2Junction]>;
    readonly isX6: boolean;
    readonly asX6: ITuple<[XcmV2Junction, XcmV2Junction, XcmV2Junction, XcmV2Junction, XcmV2Junction, XcmV2Junction]>;
    readonly isX7: boolean;
    readonly asX7: ITuple<[XcmV2Junction, XcmV2Junction, XcmV2Junction, XcmV2Junction, XcmV2Junction, XcmV2Junction, XcmV2Junction]>;
    readonly isX8: boolean;
    readonly asX8: ITuple<[XcmV2Junction, XcmV2Junction, XcmV2Junction, XcmV2Junction, XcmV2Junction, XcmV2Junction, XcmV2Junction, XcmV2Junction]>;
    readonly type: 'Here' | 'X1' | 'X2' | 'X3' | 'X4' | 'X5' | 'X6' | 'X7' | 'X8';
  }

  /** @name XcmV2Junction (178) */
  interface XcmV2Junction extends Enum {
    readonly isParachain: boolean;
    readonly asParachain: Compact<u32>;
    readonly isAccountId32: boolean;
    readonly asAccountId32: {
      readonly network: XcmV2NetworkId;
      readonly id: U8aFixed;
    } & Struct;
    readonly isAccountIndex64: boolean;
    readonly asAccountIndex64: {
      readonly network: XcmV2NetworkId;
      readonly index: Compact<u64>;
    } & Struct;
    readonly isAccountKey20: boolean;
    readonly asAccountKey20: {
      readonly network: XcmV2NetworkId;
      readonly key: U8aFixed;
    } & Struct;
    readonly isPalletInstance: boolean;
    readonly asPalletInstance: u8;
    readonly isGeneralIndex: boolean;
    readonly asGeneralIndex: Compact<u128>;
    readonly isGeneralKey: boolean;
    readonly asGeneralKey: Bytes;
    readonly isOnlyChild: boolean;
    readonly isPlurality: boolean;
    readonly asPlurality: {
      readonly id: XcmV2BodyId;
      readonly part: XcmV2BodyPart;
    } & Struct;
    readonly type: 'Parachain' | 'AccountId32' | 'AccountIndex64' | 'AccountKey20' | 'PalletInstance' | 'GeneralIndex' | 'GeneralKey' | 'OnlyChild' | 'Plurality';
  }

  /** @name XcmV2NetworkId (180) */
  interface XcmV2NetworkId extends Enum {
    readonly isAny: boolean;
    readonly isNamed: boolean;
    readonly asNamed: Bytes;
    readonly isPolkadot: boolean;
    readonly isKusama: boolean;
    readonly type: 'Any' | 'Named' | 'Polkadot' | 'Kusama';
  }

  /** @name XcmV2BodyId (182) */
  interface XcmV2BodyId extends Enum {
    readonly isUnit: boolean;
    readonly isNamed: boolean;
    readonly asNamed: Bytes;
    readonly isIndex: boolean;
    readonly asIndex: Compact<u32>;
    readonly isExecutive: boolean;
    readonly isTechnical: boolean;
    readonly isLegislative: boolean;
    readonly isJudicial: boolean;
    readonly isDefense: boolean;
    readonly isAdministration: boolean;
    readonly isTreasury: boolean;
    readonly type: 'Unit' | 'Named' | 'Index' | 'Executive' | 'Technical' | 'Legislative' | 'Judicial' | 'Defense' | 'Administration' | 'Treasury';
  }

  /** @name XcmV2BodyPart (183) */
  interface XcmV2BodyPart extends Enum {
    readonly isVoice: boolean;
    readonly isMembers: boolean;
    readonly asMembers: {
      readonly count: Compact<u32>;
    } & Struct;
    readonly isFraction: boolean;
    readonly asFraction: {
      readonly nom: Compact<u32>;
      readonly denom: Compact<u32>;
    } & Struct;
    readonly isAtLeastProportion: boolean;
    readonly asAtLeastProportion: {
      readonly nom: Compact<u32>;
      readonly denom: Compact<u32>;
    } & Struct;
    readonly isMoreThanProportion: boolean;
    readonly asMoreThanProportion: {
      readonly nom: Compact<u32>;
      readonly denom: Compact<u32>;
    } & Struct;
    readonly type: 'Voice' | 'Members' | 'Fraction' | 'AtLeastProportion' | 'MoreThanProportion';
  }

  /** @name XcmV3MultiLocation (184) */
  interface XcmV3MultiLocation extends Struct {
    readonly parents: u8;
    readonly interior: XcmV3Junctions;
  }

  /** @name XcmV3Junctions (185) */
  interface XcmV3Junctions extends Enum {
    readonly isHere: boolean;
    readonly isX1: boolean;
    readonly asX1: XcmV3Junction;
    readonly isX2: boolean;
    readonly asX2: ITuple<[XcmV3Junction, XcmV3Junction]>;
    readonly isX3: boolean;
    readonly asX3: ITuple<[XcmV3Junction, XcmV3Junction, XcmV3Junction]>;
    readonly isX4: boolean;
    readonly asX4: ITuple<[XcmV3Junction, XcmV3Junction, XcmV3Junction, XcmV3Junction]>;
    readonly isX5: boolean;
    readonly asX5: ITuple<[XcmV3Junction, XcmV3Junction, XcmV3Junction, XcmV3Junction, XcmV3Junction]>;
    readonly isX6: boolean;
    readonly asX6: ITuple<[XcmV3Junction, XcmV3Junction, XcmV3Junction, XcmV3Junction, XcmV3Junction, XcmV3Junction]>;
    readonly isX7: boolean;
    readonly asX7: ITuple<[XcmV3Junction, XcmV3Junction, XcmV3Junction, XcmV3Junction, XcmV3Junction, XcmV3Junction, XcmV3Junction]>;
    readonly isX8: boolean;
    readonly asX8: ITuple<[XcmV3Junction, XcmV3Junction, XcmV3Junction, XcmV3Junction, XcmV3Junction, XcmV3Junction, XcmV3Junction, XcmV3Junction]>;
    readonly type: 'Here' | 'X1' | 'X2' | 'X3' | 'X4' | 'X5' | 'X6' | 'X7' | 'X8';
  }

  /** @name XcmV3Junction (186) */
  interface XcmV3Junction extends Enum {
    readonly isParachain: boolean;
    readonly asParachain: Compact<u32>;
    readonly isAccountId32: boolean;
    readonly asAccountId32: {
      readonly network: Option<XcmV3JunctionNetworkId>;
      readonly id: U8aFixed;
    } & Struct;
    readonly isAccountIndex64: boolean;
    readonly asAccountIndex64: {
      readonly network: Option<XcmV3JunctionNetworkId>;
      readonly index: Compact<u64>;
    } & Struct;
    readonly isAccountKey20: boolean;
    readonly asAccountKey20: {
      readonly network: Option<XcmV3JunctionNetworkId>;
      readonly key: U8aFixed;
    } & Struct;
    readonly isPalletInstance: boolean;
    readonly asPalletInstance: u8;
    readonly isGeneralIndex: boolean;
    readonly asGeneralIndex: Compact<u128>;
    readonly isGeneralKey: boolean;
    readonly asGeneralKey: {
      readonly length: u8;
      readonly data: U8aFixed;
    } & Struct;
    readonly isOnlyChild: boolean;
    readonly isPlurality: boolean;
    readonly asPlurality: {
      readonly id: XcmV3JunctionBodyId;
      readonly part: XcmV3JunctionBodyPart;
    } & Struct;
    readonly isGlobalConsensus: boolean;
    readonly asGlobalConsensus: XcmV3JunctionNetworkId;
    readonly type: 'Parachain' | 'AccountId32' | 'AccountIndex64' | 'AccountKey20' | 'PalletInstance' | 'GeneralIndex' | 'GeneralKey' | 'OnlyChild' | 'Plurality' | 'GlobalConsensus';
  }

  /** @name XcmV3JunctionNetworkId (188) */
  interface XcmV3JunctionNetworkId extends Enum {
    readonly isByGenesis: boolean;
    readonly asByGenesis: U8aFixed;
    readonly isByFork: boolean;
    readonly asByFork: {
      readonly blockNumber: u64;
      readonly blockHash: U8aFixed;
    } & Struct;
    readonly isPolkadot: boolean;
    readonly isKusama: boolean;
    readonly isWestend: boolean;
    readonly isRococo: boolean;
    readonly isWococo: boolean;
    readonly isEthereum: boolean;
    readonly asEthereum: {
      readonly chainId: Compact<u64>;
    } & Struct;
    readonly isBitcoinCore: boolean;
    readonly isBitcoinCash: boolean;
    readonly type: 'ByGenesis' | 'ByFork' | 'Polkadot' | 'Kusama' | 'Westend' | 'Rococo' | 'Wococo' | 'Ethereum' | 'BitcoinCore' | 'BitcoinCash';
  }

  /** @name XcmV3JunctionBodyId (189) */
  interface XcmV3JunctionBodyId extends Enum {
    readonly isUnit: boolean;
    readonly isMoniker: boolean;
    readonly asMoniker: U8aFixed;
    readonly isIndex: boolean;
    readonly asIndex: Compact<u32>;
    readonly isExecutive: boolean;
    readonly isTechnical: boolean;
    readonly isLegislative: boolean;
    readonly isJudicial: boolean;
    readonly isDefense: boolean;
    readonly isAdministration: boolean;
    readonly isTreasury: boolean;
    readonly type: 'Unit' | 'Moniker' | 'Index' | 'Executive' | 'Technical' | 'Legislative' | 'Judicial' | 'Defense' | 'Administration' | 'Treasury';
  }

  /** @name XcmV3JunctionBodyPart (190) */
  interface XcmV3JunctionBodyPart extends Enum {
    readonly isVoice: boolean;
    readonly isMembers: boolean;
    readonly asMembers: {
      readonly count: Compact<u32>;
    } & Struct;
    readonly isFraction: boolean;
    readonly asFraction: {
      readonly nom: Compact<u32>;
      readonly denom: Compact<u32>;
    } & Struct;
    readonly isAtLeastProportion: boolean;
    readonly asAtLeastProportion: {
      readonly nom: Compact<u32>;
      readonly denom: Compact<u32>;
    } & Struct;
    readonly isMoreThanProportion: boolean;
    readonly asMoreThanProportion: {
      readonly nom: Compact<u32>;
      readonly denom: Compact<u32>;
    } & Struct;
    readonly type: 'Voice' | 'Members' | 'Fraction' | 'AtLeastProportion' | 'MoreThanProportion';
  }

  /** @name BridgeDataSignerEvent (192) */
  interface BridgeDataSignerEvent extends Enum {
    readonly isInitialized: boolean;
    readonly asInitialized: {
      readonly networkId: BridgeTypesGenericNetworkId;
      readonly peers: Vec<SpCoreEcdsaPublic>;
    } & Struct;
    readonly isAddedPeer: boolean;
    readonly asAddedPeer: {
      readonly networkId: BridgeTypesGenericNetworkId;
      readonly peer: SpCoreEcdsaPublic;
    } & Struct;
    readonly isRemovedPeer: boolean;
    readonly asRemovedPeer: {
      readonly networkId: BridgeTypesGenericNetworkId;
      readonly peer: SpCoreEcdsaPublic;
    } & Struct;
    readonly isApprovalAccepted: boolean;
    readonly asApprovalAccepted: {
      readonly networkId: BridgeTypesGenericNetworkId;
      readonly data: H256;
      readonly signature: SpCoreEcdsaSignature;
    } & Struct;
    readonly isApproved: boolean;
    readonly asApproved: {
      readonly networkId: BridgeTypesGenericNetworkId;
      readonly data: H256;
      readonly signatures: Vec<SpCoreEcdsaSignature>;
    } & Struct;
    readonly type: 'Initialized' | 'AddedPeer' | 'RemovedPeer' | 'ApprovalAccepted' | 'Approved';
  }

  /** @name SpCoreEcdsaPublic (194) */
  interface SpCoreEcdsaPublic extends U8aFixed {}

  /** @name SpCoreEcdsaSignature (197) */
  interface SpCoreEcdsaSignature extends U8aFixed {}

  /** @name MultisigVerifierEvent (201) */
  interface MultisigVerifierEvent extends Enum {
    readonly isNetworkInitialized: boolean;
    readonly asNetworkInitialized: BridgeTypesGenericNetworkId;
    readonly isVerificationSuccessful: boolean;
    readonly asVerificationSuccessful: BridgeTypesGenericNetworkId;
    readonly isPeerAdded: boolean;
    readonly asPeerAdded: SpCoreEcdsaPublic;
    readonly isPeerRemoved: boolean;
    readonly asPeerRemoved: SpCoreEcdsaPublic;
    readonly type: 'NetworkInitialized' | 'VerificationSuccessful' | 'PeerAdded' | 'PeerRemoved';
  }

  /** @name PalletSudoEvent (202) */
  interface PalletSudoEvent extends Enum {
    readonly isSudid: boolean;
    readonly asSudid: {
      readonly sudoResult: Result<Null, SpRuntimeDispatchError>;
    } & Struct;
    readonly isKeyChanged: boolean;
    readonly asKeyChanged: {
      readonly oldSudoer: Option<AccountId32>;
    } & Struct;
    readonly isSudoAsDone: boolean;
    readonly asSudoAsDone: {
      readonly sudoResult: Result<Null, SpRuntimeDispatchError>;
    } & Struct;
    readonly type: 'Sudid' | 'KeyChanged' | 'SudoAsDone';
  }

  /** @name FaucetEvent (203) */
  interface FaucetEvent extends Enum {
    readonly isTransferred: boolean;
    readonly asTransferred: ITuple<[AccountId32, u128]>;
    readonly isLimitUpdated: boolean;
    readonly asLimitUpdated: u128;
    readonly type: 'Transferred' | 'LimitUpdated';
  }

  /** @name FrameSystemPhase (204) */
  interface FrameSystemPhase extends Enum {
    readonly isApplyExtrinsic: boolean;
    readonly asApplyExtrinsic: u32;
    readonly isFinalization: boolean;
    readonly isInitialization: boolean;
    readonly type: 'ApplyExtrinsic' | 'Finalization' | 'Initialization';
  }

  /** @name FrameSystemLastRuntimeUpgradeInfo (207) */
  interface FrameSystemLastRuntimeUpgradeInfo extends Struct {
    readonly specVersion: Compact<u32>;
    readonly specName: Text;
  }

  /** @name FrameSystemCall (208) */
  interface FrameSystemCall extends Enum {
    readonly isRemark: boolean;
    readonly asRemark: {
      readonly remark: Bytes;
    } & Struct;
    readonly isSetHeapPages: boolean;
    readonly asSetHeapPages: {
      readonly pages: u64;
    } & Struct;
    readonly isSetCode: boolean;
    readonly asSetCode: {
      readonly code: Bytes;
    } & Struct;
    readonly isSetCodeWithoutChecks: boolean;
    readonly asSetCodeWithoutChecks: {
      readonly code: Bytes;
    } & Struct;
    readonly isSetStorage: boolean;
    readonly asSetStorage: {
      readonly items: Vec<ITuple<[Bytes, Bytes]>>;
    } & Struct;
    readonly isKillStorage: boolean;
    readonly asKillStorage: {
      readonly keys_: Vec<Bytes>;
    } & Struct;
    readonly isKillPrefix: boolean;
    readonly asKillPrefix: {
      readonly prefix: Bytes;
      readonly subkeys: u32;
    } & Struct;
    readonly isRemarkWithEvent: boolean;
    readonly asRemarkWithEvent: {
      readonly remark: Bytes;
    } & Struct;
    readonly type: 'Remark' | 'SetHeapPages' | 'SetCode' | 'SetCodeWithoutChecks' | 'SetStorage' | 'KillStorage' | 'KillPrefix' | 'RemarkWithEvent';
  }

  /** @name FrameSystemLimitsBlockWeights (212) */
  interface FrameSystemLimitsBlockWeights extends Struct {
    readonly baseBlock: SpWeightsWeightV2Weight;
    readonly maxBlock: SpWeightsWeightV2Weight;
    readonly perClass: FrameSupportDispatchPerDispatchClassWeightsPerClass;
  }

  /** @name FrameSupportDispatchPerDispatchClassWeightsPerClass (213) */
  interface FrameSupportDispatchPerDispatchClassWeightsPerClass extends Struct {
    readonly normal: FrameSystemLimitsWeightsPerClass;
    readonly operational: FrameSystemLimitsWeightsPerClass;
    readonly mandatory: FrameSystemLimitsWeightsPerClass;
  }

  /** @name FrameSystemLimitsWeightsPerClass (214) */
  interface FrameSystemLimitsWeightsPerClass extends Struct {
    readonly baseExtrinsic: SpWeightsWeightV2Weight;
    readonly maxExtrinsic: Option<SpWeightsWeightV2Weight>;
    readonly maxTotal: Option<SpWeightsWeightV2Weight>;
    readonly reserved: Option<SpWeightsWeightV2Weight>;
  }

  /** @name FrameSystemLimitsBlockLength (216) */
  interface FrameSystemLimitsBlockLength extends Struct {
    readonly max: FrameSupportDispatchPerDispatchClassU32;
  }

  /** @name FrameSupportDispatchPerDispatchClassU32 (217) */
  interface FrameSupportDispatchPerDispatchClassU32 extends Struct {
    readonly normal: u32;
    readonly operational: u32;
    readonly mandatory: u32;
  }

  /** @name SpWeightsRuntimeDbWeight (218) */
  interface SpWeightsRuntimeDbWeight extends Struct {
    readonly read: u64;
    readonly write: u64;
  }

  /** @name SpVersionRuntimeVersion (219) */
  interface SpVersionRuntimeVersion extends Struct {
    readonly specName: Text;
    readonly implName: Text;
    readonly authoringVersion: u32;
    readonly specVersion: u32;
    readonly implVersion: u32;
    readonly apis: Vec<ITuple<[U8aFixed, u32]>>;
    readonly transactionVersion: u32;
    readonly stateVersion: u8;
  }

  /** @name FrameSystemError (224) */
  interface FrameSystemError extends Enum {
    readonly isInvalidSpecName: boolean;
    readonly isSpecVersionNeedsToIncrease: boolean;
    readonly isFailedToExtractRuntimeVersion: boolean;
    readonly isNonDefaultComposite: boolean;
    readonly isNonZeroRefCount: boolean;
    readonly isCallFiltered: boolean;
    readonly type: 'InvalidSpecName' | 'SpecVersionNeedsToIncrease' | 'FailedToExtractRuntimeVersion' | 'NonDefaultComposite' | 'NonZeroRefCount' | 'CallFiltered';
  }

  /** @name SpConsensusBabeAppPublic (227) */
  interface SpConsensusBabeAppPublic extends SpCoreSr25519Public {}

  /** @name SpConsensusBabeDigestsNextConfigDescriptor (230) */
  interface SpConsensusBabeDigestsNextConfigDescriptor extends Enum {
    readonly isV1: boolean;
    readonly asV1: {
      readonly c: ITuple<[u64, u64]>;
      readonly allowedSlots: SpConsensusBabeAllowedSlots;
    } & Struct;
    readonly type: 'V1';
  }

  /** @name SpConsensusBabeAllowedSlots (232) */
  interface SpConsensusBabeAllowedSlots extends Enum {
    readonly isPrimarySlots: boolean;
    readonly isPrimaryAndSecondaryPlainSlots: boolean;
    readonly isPrimaryAndSecondaryVRFSlots: boolean;
    readonly type: 'PrimarySlots' | 'PrimaryAndSecondaryPlainSlots' | 'PrimaryAndSecondaryVRFSlots';
  }

  /** @name SpConsensusBabeDigestsPreDigest (236) */
  interface SpConsensusBabeDigestsPreDigest extends Enum {
    readonly isPrimary: boolean;
    readonly asPrimary: SpConsensusBabeDigestsPrimaryPreDigest;
    readonly isSecondaryPlain: boolean;
    readonly asSecondaryPlain: SpConsensusBabeDigestsSecondaryPlainPreDigest;
    readonly isSecondaryVRF: boolean;
    readonly asSecondaryVRF: SpConsensusBabeDigestsSecondaryVRFPreDigest;
    readonly type: 'Primary' | 'SecondaryPlain' | 'SecondaryVRF';
  }

  /** @name SpConsensusBabeDigestsPrimaryPreDigest (237) */
  interface SpConsensusBabeDigestsPrimaryPreDigest extends Struct {
    readonly authorityIndex: u32;
    readonly slot: u64;
    readonly vrfOutput: U8aFixed;
    readonly vrfProof: U8aFixed;
  }

  /** @name SpConsensusBabeDigestsSecondaryPlainPreDigest (239) */
  interface SpConsensusBabeDigestsSecondaryPlainPreDigest extends Struct {
    readonly authorityIndex: u32;
    readonly slot: u64;
  }

  /** @name SpConsensusBabeDigestsSecondaryVRFPreDigest (240) */
  interface SpConsensusBabeDigestsSecondaryVRFPreDigest extends Struct {
    readonly authorityIndex: u32;
    readonly slot: u64;
    readonly vrfOutput: U8aFixed;
    readonly vrfProof: U8aFixed;
  }

  /** @name SpConsensusBabeBabeEpochConfiguration (241) */
  interface SpConsensusBabeBabeEpochConfiguration extends Struct {
    readonly c: ITuple<[u64, u64]>;
    readonly allowedSlots: SpConsensusBabeAllowedSlots;
  }

  /** @name PalletBabeCall (242) */
  interface PalletBabeCall extends Enum {
    readonly isReportEquivocation: boolean;
    readonly asReportEquivocation: {
      readonly equivocationProof: SpConsensusSlotsEquivocationProof;
      readonly keyOwnerProof: SpSessionMembershipProof;
    } & Struct;
    readonly isReportEquivocationUnsigned: boolean;
    readonly asReportEquivocationUnsigned: {
      readonly equivocationProof: SpConsensusSlotsEquivocationProof;
      readonly keyOwnerProof: SpSessionMembershipProof;
    } & Struct;
    readonly isPlanConfigChange: boolean;
    readonly asPlanConfigChange: {
      readonly config: SpConsensusBabeDigestsNextConfigDescriptor;
    } & Struct;
    readonly type: 'ReportEquivocation' | 'ReportEquivocationUnsigned' | 'PlanConfigChange';
  }

  /** @name SpConsensusSlotsEquivocationProof (243) */
  interface SpConsensusSlotsEquivocationProof extends Struct {
    readonly offender: SpConsensusBabeAppPublic;
    readonly slot: u64;
    readonly firstHeader: SpRuntimeHeader;
    readonly secondHeader: SpRuntimeHeader;
  }

  /** @name SpRuntimeHeader (244) */
  interface SpRuntimeHeader extends Struct {
    readonly parentHash: H256;
    readonly number: Compact<u32>;
    readonly stateRoot: H256;
    readonly extrinsicsRoot: H256;
    readonly digest: SpRuntimeDigest;
  }

  /** @name SpRuntimeBlakeTwo256 (245) */
  type SpRuntimeBlakeTwo256 = Null;

  /** @name SpSessionMembershipProof (246) */
  interface SpSessionMembershipProof extends Struct {
    readonly session: u32;
    readonly trieNodes: Vec<Bytes>;
    readonly validatorCount: u32;
  }

  /** @name PalletBabeError (247) */
  interface PalletBabeError extends Enum {
    readonly isInvalidEquivocationProof: boolean;
    readonly isInvalidKeyOwnershipProof: boolean;
    readonly isDuplicateOffenceReport: boolean;
    readonly isInvalidConfiguration: boolean;
    readonly type: 'InvalidEquivocationProof' | 'InvalidKeyOwnershipProof' | 'DuplicateOffenceReport' | 'InvalidConfiguration';
  }

  /** @name PalletTimestampCall (248) */
  interface PalletTimestampCall extends Enum {
    readonly isSet: boolean;
    readonly asSet: {
      readonly now: Compact<u64>;
    } & Struct;
    readonly type: 'Set';
  }

  /** @name PalletBalancesBalanceLock (250) */
  interface PalletBalancesBalanceLock extends Struct {
    readonly id: U8aFixed;
    readonly amount: u128;
    readonly reasons: PalletBalancesReasons;
  }

  /** @name PalletBalancesReasons (251) */
  interface PalletBalancesReasons extends Enum {
    readonly isFee: boolean;
    readonly isMisc: boolean;
    readonly isAll: boolean;
    readonly type: 'Fee' | 'Misc' | 'All';
  }

  /** @name PalletBalancesReserveData (254) */
  interface PalletBalancesReserveData extends Struct {
    readonly id: Null;
    readonly amount: u128;
  }

  /** @name PalletBalancesError (256) */
  interface PalletBalancesError extends Enum {
    readonly isVestingBalance: boolean;
    readonly isLiquidityRestrictions: boolean;
    readonly isInsufficientBalance: boolean;
    readonly isExistentialDeposit: boolean;
    readonly isKeepAlive: boolean;
    readonly isExistingVestingSchedule: boolean;
    readonly isDeadAccount: boolean;
    readonly isTooManyReserves: boolean;
    readonly type: 'VestingBalance' | 'LiquidityRestrictions' | 'InsufficientBalance' | 'ExistentialDeposit' | 'KeepAlive' | 'ExistingVestingSchedule' | 'DeadAccount' | 'TooManyReserves';
  }

  /** @name PalletTransactionPaymentReleases (258) */
  interface PalletTransactionPaymentReleases extends Enum {
    readonly isV1Ancient: boolean;
    readonly isV2: boolean;
    readonly type: 'V1Ancient' | 'V2';
  }

  /** @name PermissionsScope (260) */
  interface PermissionsScope extends Enum {
    readonly isLimited: boolean;
    readonly asLimited: H512;
    readonly isUnlimited: boolean;
    readonly type: 'Limited' | 'Unlimited';
  }

  /** @name PermissionsCall (264) */
  type PermissionsCall = Null;

  /** @name PermissionsError (265) */
  interface PermissionsError extends Enum {
    readonly isPermissionNotFound: boolean;
    readonly isPermissionNotOwned: boolean;
    readonly isPermissionAlreadyExists: boolean;
    readonly isForbidden: boolean;
    readonly isIncRefError: boolean;
    readonly type: 'PermissionNotFound' | 'PermissionNotOwned' | 'PermissionAlreadyExists' | 'Forbidden' | 'IncRefError';
  }

  /** @name ReferralsCall (266) */
  interface ReferralsCall extends Enum {
    readonly isReserve: boolean;
    readonly asReserve: {
      readonly balance: u128;
    } & Struct;
    readonly isUnreserve: boolean;
    readonly asUnreserve: {
      readonly balance: u128;
    } & Struct;
    readonly isSetReferrer: boolean;
    readonly asSetReferrer: {
      readonly referrer: AccountId32;
    } & Struct;
    readonly type: 'Reserve' | 'Unreserve' | 'SetReferrer';
  }

  /** @name ReferralsError (267) */
  interface ReferralsError extends Enum {
    readonly isAlreadyHasReferrer: boolean;
    readonly isIncRefError: boolean;
    readonly isReferrerInsufficientBalance: boolean;
    readonly type: 'AlreadyHasReferrer' | 'IncRefError' | 'ReferrerInsufficientBalance';
  }

  /** @name RewardsRewardInfo (268) */
  interface RewardsRewardInfo extends Struct {
    readonly claimable: u128;
    readonly total: u128;
  }

  /** @name RewardsCall (272) */
  interface RewardsCall extends Enum {
    readonly isClaim: boolean;
    readonly asClaim: {
      readonly signature: Bytes;
    } & Struct;
    readonly isAddUmiNftReceivers: boolean;
    readonly asAddUmiNftReceivers: {
      readonly receivers: Vec<H160>;
    } & Struct;
    readonly type: 'Claim' | 'AddUmiNftReceivers';
  }

  /** @name RewardsError (273) */
  interface RewardsError extends Enum {
    readonly isNothingToClaim: boolean;
    readonly isAddressNotEligible: boolean;
    readonly isSignatureInvalid: boolean;
    readonly isSignatureVerificationFailed: boolean;
    readonly isIllegalCall: boolean;
    readonly type: 'NothingToClaim' | 'AddressNotEligible' | 'SignatureInvalid' | 'SignatureVerificationFailed' | 'IllegalCall';
  }

  /** @name XorFeeCall (274) */
  interface XorFeeCall extends Enum {
    readonly isUpdateMultiplier: boolean;
    readonly asUpdateMultiplier: {
      readonly newMultiplier: u128;
    } & Struct;
    readonly type: 'UpdateMultiplier';
  }

  /** @name PalletMultisigMultisigAccount (275) */
  interface PalletMultisigMultisigAccount extends Struct {
    readonly signatories: Vec<AccountId32>;
    readonly threshold: Percent;
  }

  /** @name PalletMultisigMultisig (278) */
  interface PalletMultisigMultisig extends Struct {
    readonly when: PalletMultisigBridgeTimepoint;
    readonly deposit: u128;
    readonly depositor: AccountId32;
    readonly approvals: Vec<AccountId32>;
  }

  /** @name PalletMultisigCall (281) */
  interface PalletMultisigCall extends Enum {
    readonly isRegisterMultisig: boolean;
    readonly asRegisterMultisig: {
      readonly signatories: Vec<AccountId32>;
    } & Struct;
    readonly isRemoveSignatory: boolean;
    readonly asRemoveSignatory: {
      readonly signatory: AccountId32;
    } & Struct;
    readonly isAddSignatory: boolean;
    readonly asAddSignatory: {
      readonly newMember: AccountId32;
    } & Struct;
    readonly isAsMultiThreshold1: boolean;
    readonly asAsMultiThreshold1: {
      readonly id: AccountId32;
      readonly call: Call;
      readonly timepoint: PalletMultisigBridgeTimepoint;
    } & Struct;
    readonly isAsMulti: boolean;
    readonly asAsMulti: {
      readonly id: AccountId32;
      readonly maybeTimepoint: Option<PalletMultisigBridgeTimepoint>;
      readonly call: Bytes;
      readonly storeCall: bool;
      readonly maxWeight: SpWeightsWeightV2Weight;
    } & Struct;
    readonly isApproveAsMulti: boolean;
    readonly asApproveAsMulti: {
      readonly id: AccountId32;
      readonly maybeTimepoint: Option<PalletMultisigBridgeTimepoint>;
      readonly callHash: U8aFixed;
      readonly maxWeight: SpWeightsWeightV2Weight;
    } & Struct;
    readonly isCancelAsMulti: boolean;
    readonly asCancelAsMulti: {
      readonly id: AccountId32;
      readonly timepoint: PalletMultisigBridgeTimepoint;
      readonly callHash: U8aFixed;
    } & Struct;
    readonly type: 'RegisterMultisig' | 'RemoveSignatory' | 'AddSignatory' | 'AsMultiThreshold1' | 'AsMulti' | 'ApproveAsMulti' | 'CancelAsMulti';
  }

  /** @name PalletUtilityCall (283) */
  interface PalletUtilityCall extends Enum {
    readonly isBatch: boolean;
    readonly asBatch: {
      readonly calls: Vec<Call>;
    } & Struct;
    readonly isAsDerivative: boolean;
    readonly asAsDerivative: {
      readonly index: u16;
      readonly call: Call;
    } & Struct;
    readonly isBatchAll: boolean;
    readonly asBatchAll: {
      readonly calls: Vec<Call>;
    } & Struct;
    readonly isDispatchAs: boolean;
    readonly asDispatchAs: {
      readonly asOrigin: FramenodeRuntimeOriginCaller;
      readonly call: Call;
    } & Struct;
    readonly isForceBatch: boolean;
    readonly asForceBatch: {
      readonly calls: Vec<Call>;
    } & Struct;
    readonly isWithWeight: boolean;
    readonly asWithWeight: {
      readonly call: Call;
      readonly weight: SpWeightsWeightV2Weight;
    } & Struct;
    readonly type: 'Batch' | 'AsDerivative' | 'BatchAll' | 'DispatchAs' | 'ForceBatch' | 'WithWeight';
  }

  /** @name FramenodeRuntimeOriginCaller (285) */
  interface FramenodeRuntimeOriginCaller extends Enum {
    readonly isSystem: boolean;
    readonly asSystem: FrameSupportDispatchRawOrigin;
    readonly isVoid: boolean;
    readonly isCouncil: boolean;
    readonly asCouncil: PalletCollectiveRawOrigin;
    readonly isTechnicalCommittee: boolean;
    readonly asTechnicalCommittee: PalletCollectiveRawOrigin;
    readonly isDispatch: boolean;
    readonly asDispatch: {
      readonly origin: BridgeTypesCallOriginOutputU256;
    } & Struct;
    readonly isSubstrateDispatch: boolean;
    readonly asSubstrateDispatch: DispatchRawOrigin;
    readonly type: 'System' | 'Void' | 'Council' | 'TechnicalCommittee' | 'Dispatch' | 'SubstrateDispatch';
  }

  /** @name FrameSupportDispatchRawOrigin (286) */
  interface FrameSupportDispatchRawOrigin extends Enum {
    readonly isRoot: boolean;
    readonly isSigned: boolean;
    readonly asSigned: AccountId32;
    readonly isNone: boolean;
    readonly type: 'Root' | 'Signed' | 'None';
  }

  /** @name PalletCollectiveRawOrigin (287) */
  interface PalletCollectiveRawOrigin extends Enum {
    readonly isMembers: boolean;
    readonly asMembers: ITuple<[u32, u32]>;
    readonly isMember: boolean;
    readonly asMember: AccountId32;
    readonly isPhantom: boolean;
    readonly type: 'Members' | 'Member' | 'Phantom';
  }

  /** @name BridgeTypesCallOriginOutputU256 (290) */
  interface BridgeTypesCallOriginOutputU256 extends Struct {
    readonly networkId: U256;
    readonly messageId: H256;
    readonly timepoint: BridgeTypesGenericTimepoint;
    readonly additional: BridgeTypesEvmAdditionalEVMInboundData;
  }

  /** @name BridgeTypesEvmAdditionalEVMInboundData (291) */
  interface BridgeTypesEvmAdditionalEVMInboundData extends Struct {
    readonly source: H160;
  }

  /** @name BridgeTypesGenericTimepoint (292) */
  interface BridgeTypesGenericTimepoint extends Enum {
    readonly isEvm: boolean;
    readonly asEvm: u64;
    readonly isSora: boolean;
    readonly asSora: u32;
    readonly isParachain: boolean;
    readonly asParachain: u32;
    readonly isPending: boolean;
    readonly isUnknown: boolean;
    readonly type: 'Evm' | 'Sora' | 'Parachain' | 'Pending' | 'Unknown';
  }

  /** @name DispatchRawOrigin (293) */
  interface DispatchRawOrigin extends Struct {
    readonly origin: BridgeTypesCallOriginOutputSubNetworkId;
  }

  /** @name BridgeTypesCallOriginOutputSubNetworkId (294) */
  interface BridgeTypesCallOriginOutputSubNetworkId extends Struct {
    readonly networkId: BridgeTypesSubNetworkId;
    readonly messageId: H256;
    readonly timepoint: BridgeTypesGenericTimepoint;
    readonly additional: Null;
  }

  /** @name SpCoreVoid (295) */
  type SpCoreVoid = Null;

  /** @name PalletStakingPalletCall (296) */
  interface PalletStakingPalletCall extends Enum {
    readonly isBond: boolean;
    readonly asBond: {
      readonly controller: AccountId32;
      readonly value: Compact<u128>;
      readonly payee: PalletStakingRewardDestination;
    } & Struct;
    readonly isBondExtra: boolean;
    readonly asBondExtra: {
      readonly maxAdditional: Compact<u128>;
    } & Struct;
    readonly isUnbond: boolean;
    readonly asUnbond: {
      readonly value: Compact<u128>;
    } & Struct;
    readonly isWithdrawUnbonded: boolean;
    readonly asWithdrawUnbonded: {
      readonly numSlashingSpans: u32;
    } & Struct;
    readonly isValidate: boolean;
    readonly asValidate: {
      readonly prefs: PalletStakingValidatorPrefs;
    } & Struct;
    readonly isNominate: boolean;
    readonly asNominate: {
      readonly targets: Vec<AccountId32>;
    } & Struct;
    readonly isChill: boolean;
    readonly isSetPayee: boolean;
    readonly asSetPayee: {
      readonly payee: PalletStakingRewardDestination;
    } & Struct;
    readonly isSetController: boolean;
    readonly asSetController: {
      readonly controller: AccountId32;
    } & Struct;
    readonly isSetValidatorCount: boolean;
    readonly asSetValidatorCount: {
      readonly new_: Compact<u32>;
    } & Struct;
    readonly isIncreaseValidatorCount: boolean;
    readonly asIncreaseValidatorCount: {
      readonly additional: Compact<u32>;
    } & Struct;
    readonly isScaleValidatorCount: boolean;
    readonly asScaleValidatorCount: {
      readonly factor: Percent;
    } & Struct;
    readonly isForceNoEras: boolean;
    readonly isForceNewEra: boolean;
    readonly isSetInvulnerables: boolean;
    readonly asSetInvulnerables: {
      readonly invulnerables: Vec<AccountId32>;
    } & Struct;
    readonly isForceUnstake: boolean;
    readonly asForceUnstake: {
      readonly stash: AccountId32;
      readonly numSlashingSpans: u32;
    } & Struct;
    readonly isForceNewEraAlways: boolean;
    readonly isCancelDeferredSlash: boolean;
    readonly asCancelDeferredSlash: {
      readonly era: u32;
      readonly slashIndices: Vec<u32>;
    } & Struct;
    readonly isPayoutStakers: boolean;
    readonly asPayoutStakers: {
      readonly validatorStash: AccountId32;
      readonly era: u32;
    } & Struct;
    readonly isRebond: boolean;
    readonly asRebond: {
      readonly value: Compact<u128>;
    } & Struct;
    readonly isReapStash: boolean;
    readonly asReapStash: {
      readonly stash: AccountId32;
      readonly numSlashingSpans: u32;
    } & Struct;
    readonly isKick: boolean;
    readonly asKick: {
      readonly who: Vec<AccountId32>;
    } & Struct;
    readonly isSetStakingConfigs: boolean;
    readonly asSetStakingConfigs: {
      readonly minNominatorBond: PalletStakingPalletConfigOpU128;
      readonly minValidatorBond: PalletStakingPalletConfigOpU128;
      readonly maxNominatorCount: PalletStakingPalletConfigOpU32;
      readonly maxValidatorCount: PalletStakingPalletConfigOpU32;
      readonly chillThreshold: PalletStakingPalletConfigOpPercent;
      readonly minCommission: PalletStakingPalletConfigOpPerbill;
    } & Struct;
    readonly isChillOther: boolean;
    readonly asChillOther: {
      readonly controller: AccountId32;
    } & Struct;
    readonly isForceApplyMinCommission: boolean;
    readonly asForceApplyMinCommission: {
      readonly validatorStash: AccountId32;
    } & Struct;
    readonly isSetMinCommission: boolean;
    readonly asSetMinCommission: {
      readonly new_: Perbill;
    } & Struct;
    readonly type: 'Bond' | 'BondExtra' | 'Unbond' | 'WithdrawUnbonded' | 'Validate' | 'Nominate' | 'Chill' | 'SetPayee' | 'SetController' | 'SetValidatorCount' | 'IncreaseValidatorCount' | 'ScaleValidatorCount' | 'ForceNoEras' | 'ForceNewEra' | 'SetInvulnerables' | 'ForceUnstake' | 'ForceNewEraAlways' | 'CancelDeferredSlash' | 'PayoutStakers' | 'Rebond' | 'ReapStash' | 'Kick' | 'SetStakingConfigs' | 'ChillOther' | 'ForceApplyMinCommission' | 'SetMinCommission';
  }

  /** @name PalletStakingRewardDestination (297) */
  interface PalletStakingRewardDestination extends Enum {
    readonly isStaked: boolean;
    readonly isStash: boolean;
    readonly isController: boolean;
    readonly isAccount: boolean;
    readonly asAccount: AccountId32;
    readonly isNone: boolean;
    readonly type: 'Staked' | 'Stash' | 'Controller' | 'Account' | 'None';
  }

  /** @name PalletStakingPalletConfigOpU128 (298) */
  interface PalletStakingPalletConfigOpU128 extends Enum {
    readonly isNoop: boolean;
    readonly isSet: boolean;
    readonly asSet: u128;
    readonly isRemove: boolean;
    readonly type: 'Noop' | 'Set' | 'Remove';
  }

  /** @name PalletStakingPalletConfigOpU32 (299) */
  interface PalletStakingPalletConfigOpU32 extends Enum {
    readonly isNoop: boolean;
    readonly isSet: boolean;
    readonly asSet: u32;
    readonly isRemove: boolean;
    readonly type: 'Noop' | 'Set' | 'Remove';
  }

  /** @name PalletStakingPalletConfigOpPercent (300) */
  interface PalletStakingPalletConfigOpPercent extends Enum {
    readonly isNoop: boolean;
    readonly isSet: boolean;
    readonly asSet: Percent;
    readonly isRemove: boolean;
    readonly type: 'Noop' | 'Set' | 'Remove';
  }

  /** @name PalletStakingPalletConfigOpPerbill (301) */
  interface PalletStakingPalletConfigOpPerbill extends Enum {
    readonly isNoop: boolean;
    readonly isSet: boolean;
    readonly asSet: Perbill;
    readonly isRemove: boolean;
    readonly type: 'Noop' | 'Set' | 'Remove';
  }

  /** @name PalletSessionCall (302) */
  interface PalletSessionCall extends Enum {
    readonly isSetKeys: boolean;
    readonly asSetKeys: {
      readonly keys_: FramenodeRuntimeOpaqueSessionKeys;
      readonly proof: Bytes;
    } & Struct;
    readonly isPurgeKeys: boolean;
    readonly type: 'SetKeys' | 'PurgeKeys';
  }

  /** @name FramenodeRuntimeOpaqueSessionKeys (303) */
  interface FramenodeRuntimeOpaqueSessionKeys extends Struct {
    readonly babe: SpConsensusBabeAppPublic;
    readonly grandpa: SpFinalityGrandpaAppPublic;
    readonly imOnline: PalletImOnlineSr25519AppSr25519Public;
    readonly beefy: SpBeefyCryptoPublic;
  }

  /** @name SpBeefyCryptoPublic (304) */
  interface SpBeefyCryptoPublic extends SpCoreEcdsaPublic {}

  /** @name PalletGrandpaCall (305) */
  interface PalletGrandpaCall extends Enum {
    readonly isReportEquivocation: boolean;
    readonly asReportEquivocation: {
      readonly equivocationProof: SpFinalityGrandpaEquivocationProof;
      readonly keyOwnerProof: SpSessionMembershipProof;
    } & Struct;
    readonly isReportEquivocationUnsigned: boolean;
    readonly asReportEquivocationUnsigned: {
      readonly equivocationProof: SpFinalityGrandpaEquivocationProof;
      readonly keyOwnerProof: SpSessionMembershipProof;
    } & Struct;
    readonly isNoteStalled: boolean;
    readonly asNoteStalled: {
      readonly delay: u32;
      readonly bestFinalizedBlockNumber: u32;
    } & Struct;
    readonly type: 'ReportEquivocation' | 'ReportEquivocationUnsigned' | 'NoteStalled';
  }

  /** @name SpFinalityGrandpaEquivocationProof (306) */
  interface SpFinalityGrandpaEquivocationProof extends Struct {
    readonly setId: u64;
    readonly equivocation: SpFinalityGrandpaEquivocation;
  }

  /** @name SpFinalityGrandpaEquivocation (307) */
  interface SpFinalityGrandpaEquivocation extends Enum {
    readonly isPrevote: boolean;
    readonly asPrevote: FinalityGrandpaEquivocationPrevote;
    readonly isPrecommit: boolean;
    readonly asPrecommit: FinalityGrandpaEquivocationPrecommit;
    readonly type: 'Prevote' | 'Precommit';
  }

  /** @name FinalityGrandpaEquivocationPrevote (308) */
  interface FinalityGrandpaEquivocationPrevote extends Struct {
    readonly roundNumber: u64;
    readonly identity: SpFinalityGrandpaAppPublic;
    readonly first: ITuple<[FinalityGrandpaPrevote, SpFinalityGrandpaAppSignature]>;
    readonly second: ITuple<[FinalityGrandpaPrevote, SpFinalityGrandpaAppSignature]>;
  }

  /** @name FinalityGrandpaPrevote (309) */
  interface FinalityGrandpaPrevote extends Struct {
    readonly targetHash: H256;
    readonly targetNumber: u32;
  }

  /** @name SpFinalityGrandpaAppSignature (310) */
  interface SpFinalityGrandpaAppSignature extends SpCoreEd25519Signature {}

  /** @name SpCoreEd25519Signature (311) */
  interface SpCoreEd25519Signature extends U8aFixed {}

  /** @name FinalityGrandpaEquivocationPrecommit (313) */
  interface FinalityGrandpaEquivocationPrecommit extends Struct {
    readonly roundNumber: u64;
    readonly identity: SpFinalityGrandpaAppPublic;
    readonly first: ITuple<[FinalityGrandpaPrecommit, SpFinalityGrandpaAppSignature]>;
    readonly second: ITuple<[FinalityGrandpaPrecommit, SpFinalityGrandpaAppSignature]>;
  }

  /** @name FinalityGrandpaPrecommit (314) */
  interface FinalityGrandpaPrecommit extends Struct {
    readonly targetHash: H256;
    readonly targetNumber: u32;
  }

  /** @name PalletImOnlineCall (316) */
  interface PalletImOnlineCall extends Enum {
    readonly isHeartbeat: boolean;
    readonly asHeartbeat: {
      readonly heartbeat: PalletImOnlineHeartbeat;
      readonly signature: PalletImOnlineSr25519AppSr25519Signature;
    } & Struct;
    readonly type: 'Heartbeat';
  }

  /** @name PalletImOnlineHeartbeat (317) */
  interface PalletImOnlineHeartbeat extends Struct {
    readonly blockNumber: u32;
    readonly networkState: SpCoreOffchainOpaqueNetworkState;
    readonly sessionIndex: u32;
    readonly authorityIndex: u32;
    readonly validatorsLen: u32;
  }

  /** @name SpCoreOffchainOpaqueNetworkState (318) */
  interface SpCoreOffchainOpaqueNetworkState extends Struct {
    readonly peerId: OpaquePeerId;
    readonly externalAddresses: Vec<OpaqueMultiaddr>;
  }

  /** @name PalletImOnlineSr25519AppSr25519Signature (322) */
  interface PalletImOnlineSr25519AppSr25519Signature extends SpCoreSr25519Signature {}

  /** @name SpCoreSr25519Signature (323) */
  interface SpCoreSr25519Signature extends U8aFixed {}

  /** @name TradingPairCall (324) */
  interface TradingPairCall extends Enum {
    readonly isRegister: boolean;
    readonly asRegister: {
      readonly dexId: u32;
      readonly baseAssetId: CommonPrimitivesAssetId32;
      readonly targetAssetId: CommonPrimitivesAssetId32;
    } & Struct;
    readonly type: 'Register';
  }

  /** @name AssetsCall (325) */
  interface AssetsCall extends Enum {
    readonly isRegister: boolean;
    readonly asRegister: {
      readonly symbol: Bytes;
      readonly name: Bytes;
      readonly initialSupply: u128;
      readonly isMintable: bool;
      readonly isIndivisible: bool;
      readonly optContentSrc: Option<Bytes>;
      readonly optDesc: Option<Bytes>;
    } & Struct;
    readonly isTransfer: boolean;
    readonly asTransfer: {
      readonly assetId: CommonPrimitivesAssetId32;
      readonly to: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isMint: boolean;
    readonly asMint: {
      readonly assetId: CommonPrimitivesAssetId32;
      readonly to: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isForceMint: boolean;
    readonly asForceMint: {
      readonly assetId: CommonPrimitivesAssetId32;
      readonly to: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isBurn: boolean;
    readonly asBurn: {
      readonly assetId: CommonPrimitivesAssetId32;
      readonly amount: u128;
    } & Struct;
    readonly isUpdateBalance: boolean;
    readonly asUpdateBalance: {
      readonly who: AccountId32;
      readonly currencyId: CommonPrimitivesAssetId32;
      readonly amount: i128;
    } & Struct;
    readonly isSetNonMintable: boolean;
    readonly asSetNonMintable: {
      readonly assetId: CommonPrimitivesAssetId32;
    } & Struct;
    readonly isUpdateInfo: boolean;
    readonly asUpdateInfo: {
      readonly assetId: CommonPrimitivesAssetId32;
      readonly newSymbol: Option<Bytes>;
      readonly newName: Option<Bytes>;
    } & Struct;
    readonly type: 'Register' | 'Transfer' | 'Mint' | 'ForceMint' | 'Burn' | 'UpdateBalance' | 'SetNonMintable' | 'UpdateInfo';
  }

  /** @name MulticollateralBondingCurvePoolCall (330) */
  interface MulticollateralBondingCurvePoolCall extends Enum {
    readonly isInitializePool: boolean;
    readonly asInitializePool: {
      readonly collateralAssetId: CommonPrimitivesAssetId32;
    } & Struct;
    readonly isSetReferenceAsset: boolean;
    readonly asSetReferenceAsset: {
      readonly referenceAssetId: CommonPrimitivesAssetId32;
    } & Struct;
    readonly isSetOptionalRewardMultiplier: boolean;
    readonly asSetOptionalRewardMultiplier: {
      readonly collateralAssetId: CommonPrimitivesAssetId32;
      readonly multiplier: Option<FixnumFixedPoint>;
    } & Struct;
    readonly isSetPriceBias: boolean;
    readonly asSetPriceBias: {
      readonly priceBias: u128;
    } & Struct;
    readonly isSetPriceChangeConfig: boolean;
    readonly asSetPriceChangeConfig: {
      readonly priceChangeRate: u128;
      readonly priceChangeStep: u128;
    } & Struct;
    readonly type: 'InitializePool' | 'SetReferenceAsset' | 'SetOptionalRewardMultiplier' | 'SetPriceBias' | 'SetPriceChangeConfig';
  }

  /** @name TechnicalCall (331) */
  type TechnicalCall = Null;

  /** @name PoolXykCall (332) */
  interface PoolXykCall extends Enum {
    readonly isDepositLiquidity: boolean;
    readonly asDepositLiquidity: {
      readonly dexId: u32;
      readonly inputAssetA: CommonPrimitivesAssetId32;
      readonly inputAssetB: CommonPrimitivesAssetId32;
      readonly inputADesired: u128;
      readonly inputBDesired: u128;
      readonly inputAMin: u128;
      readonly inputBMin: u128;
    } & Struct;
    readonly isWithdrawLiquidity: boolean;
    readonly asWithdrawLiquidity: {
      readonly dexId: u32;
      readonly outputAssetA: CommonPrimitivesAssetId32;
      readonly outputAssetB: CommonPrimitivesAssetId32;
      readonly markerAssetDesired: u128;
      readonly outputAMin: u128;
      readonly outputBMin: u128;
    } & Struct;
    readonly isInitializePool: boolean;
    readonly asInitializePool: {
      readonly dexId: u32;
      readonly assetA: CommonPrimitivesAssetId32;
      readonly assetB: CommonPrimitivesAssetId32;
    } & Struct;
    readonly type: 'DepositLiquidity' | 'WithdrawLiquidity' | 'InitializePool';
  }

  /** @name LiquidityProxyCall (333) */
  interface LiquidityProxyCall extends Enum {
    readonly isSwap: boolean;
    readonly asSwap: {
      readonly dexId: u32;
      readonly inputAssetId: CommonPrimitivesAssetId32;
      readonly outputAssetId: CommonPrimitivesAssetId32;
      readonly swapAmount: CommonSwapAmount;
      readonly selectedSourceTypes: Vec<CommonPrimitivesLiquiditySourceType>;
      readonly filterMode: CommonPrimitivesFilterMode;
    } & Struct;
    readonly isSwapTransfer: boolean;
    readonly asSwapTransfer: {
      readonly receiver: AccountId32;
      readonly dexId: u32;
      readonly inputAssetId: CommonPrimitivesAssetId32;
      readonly outputAssetId: CommonPrimitivesAssetId32;
      readonly swapAmount: CommonSwapAmount;
      readonly selectedSourceTypes: Vec<CommonPrimitivesLiquiditySourceType>;
      readonly filterMode: CommonPrimitivesFilterMode;
    } & Struct;
    readonly isSwapTransferBatch: boolean;
    readonly asSwapTransferBatch: {
      readonly swapBatches: Vec<LiquidityProxySwapBatchInfo>;
      readonly inputAssetId: CommonPrimitivesAssetId32;
      readonly maxInputAmount: u128;
      readonly selectedSourceTypes: Vec<CommonPrimitivesLiquiditySourceType>;
      readonly filterMode: CommonPrimitivesFilterMode;
    } & Struct;
    readonly isEnableLiquiditySource: boolean;
    readonly asEnableLiquiditySource: {
      readonly liquiditySource: CommonPrimitivesLiquiditySourceType;
    } & Struct;
    readonly isDisableLiquiditySource: boolean;
    readonly asDisableLiquiditySource: {
      readonly liquiditySource: CommonPrimitivesLiquiditySourceType;
    } & Struct;
    readonly isSetAdarCommissionRatio: boolean;
    readonly asSetAdarCommissionRatio: {
      readonly commissionRatio: u128;
    } & Struct;
    readonly isXorlessTransfer: boolean;
    readonly asXorlessTransfer: {
      readonly dexId: u32;
      readonly assetId: CommonPrimitivesAssetId32;
      readonly receiver: AccountId32;
      readonly amount: u128;
      readonly desiredXorAmount: u128;
      readonly maxAmountIn: u128;
      readonly selectedSourceTypes: Vec<CommonPrimitivesLiquiditySourceType>;
      readonly filterMode: CommonPrimitivesFilterMode;
      readonly additionalData: Option<Bytes>;
    } & Struct;
    readonly type: 'Swap' | 'SwapTransfer' | 'SwapTransferBatch' | 'EnableLiquiditySource' | 'DisableLiquiditySource' | 'SetAdarCommissionRatio' | 'XorlessTransfer';
  }

  /** @name CommonSwapAmount (334) */
  interface CommonSwapAmount extends Enum {
    readonly isWithDesiredInput: boolean;
    readonly asWithDesiredInput: {
      readonly desiredAmountIn: u128;
      readonly minAmountOut: u128;
    } & Struct;
    readonly isWithDesiredOutput: boolean;
    readonly asWithDesiredOutput: {
      readonly desiredAmountOut: u128;
      readonly maxAmountIn: u128;
    } & Struct;
    readonly type: 'WithDesiredInput' | 'WithDesiredOutput';
  }

  /** @name CommonPrimitivesFilterMode (336) */
  interface CommonPrimitivesFilterMode extends Enum {
    readonly isDisabled: boolean;
    readonly isForbidSelected: boolean;
    readonly isAllowSelected: boolean;
    readonly type: 'Disabled' | 'ForbidSelected' | 'AllowSelected';
  }

  /** @name LiquidityProxySwapBatchInfo (338) */
  interface LiquidityProxySwapBatchInfo extends Struct {
    readonly outcomeAssetId: CommonPrimitivesAssetId32;
    readonly outcomeAssetReuse: u128;
    readonly dexId: u32;
    readonly receivers: Vec<LiquidityProxyBatchReceiverInfo>;
  }

  /** @name LiquidityProxyBatchReceiverInfo (340) */
  interface LiquidityProxyBatchReceiverInfo extends Struct {
    readonly accountId: AccountId32;
    readonly targetAmount: u128;
  }

  /** @name PalletCollectiveCall (341) */
  interface PalletCollectiveCall extends Enum {
    readonly isSetMembers: boolean;
    readonly asSetMembers: {
      readonly newMembers: Vec<AccountId32>;
      readonly prime: Option<AccountId32>;
      readonly oldCount: u32;
    } & Struct;
    readonly isExecute: boolean;
    readonly asExecute: {
      readonly proposal: Call;
      readonly lengthBound: Compact<u32>;
    } & Struct;
    readonly isPropose: boolean;
    readonly asPropose: {
      readonly threshold: Compact<u32>;
      readonly proposal: Call;
      readonly lengthBound: Compact<u32>;
    } & Struct;
    readonly isVote: boolean;
    readonly asVote: {
      readonly proposal: H256;
      readonly index: Compact<u32>;
      readonly approve: bool;
    } & Struct;
    readonly isCloseOldWeight: boolean;
    readonly asCloseOldWeight: {
      readonly proposalHash: H256;
      readonly index: Compact<u32>;
      readonly proposalWeightBound: Compact<u64>;
      readonly lengthBound: Compact<u32>;
    } & Struct;
    readonly isDisapproveProposal: boolean;
    readonly asDisapproveProposal: {
      readonly proposalHash: H256;
    } & Struct;
    readonly isClose: boolean;
    readonly asClose: {
      readonly proposalHash: H256;
      readonly index: Compact<u32>;
      readonly proposalWeightBound: SpWeightsWeightV2Weight;
      readonly lengthBound: Compact<u32>;
    } & Struct;
    readonly type: 'SetMembers' | 'Execute' | 'Propose' | 'Vote' | 'CloseOldWeight' | 'DisapproveProposal' | 'Close';
  }

  /** @name PalletDemocracyCall (345) */
  interface PalletDemocracyCall extends Enum {
    readonly isPropose: boolean;
    readonly asPropose: {
      readonly proposal: FrameSupportPreimagesBounded;
      readonly value: Compact<u128>;
    } & Struct;
    readonly isSecond: boolean;
    readonly asSecond: {
      readonly proposal: Compact<u32>;
    } & Struct;
    readonly isVote: boolean;
    readonly asVote: {
      readonly refIndex: Compact<u32>;
      readonly vote: PalletDemocracyVoteAccountVote;
    } & Struct;
    readonly isEmergencyCancel: boolean;
    readonly asEmergencyCancel: {
      readonly refIndex: u32;
    } & Struct;
    readonly isExternalPropose: boolean;
    readonly asExternalPropose: {
      readonly proposal: FrameSupportPreimagesBounded;
    } & Struct;
    readonly isExternalProposeMajority: boolean;
    readonly asExternalProposeMajority: {
      readonly proposal: FrameSupportPreimagesBounded;
    } & Struct;
    readonly isExternalProposeDefault: boolean;
    readonly asExternalProposeDefault: {
      readonly proposal: FrameSupportPreimagesBounded;
    } & Struct;
    readonly isFastTrack: boolean;
    readonly asFastTrack: {
      readonly proposalHash: H256;
      readonly votingPeriod: u32;
      readonly delay: u32;
    } & Struct;
    readonly isVetoExternal: boolean;
    readonly asVetoExternal: {
      readonly proposalHash: H256;
    } & Struct;
    readonly isCancelReferendum: boolean;
    readonly asCancelReferendum: {
      readonly refIndex: Compact<u32>;
    } & Struct;
    readonly isDelegate: boolean;
    readonly asDelegate: {
      readonly to: AccountId32;
      readonly conviction: PalletDemocracyConviction;
      readonly balance: u128;
    } & Struct;
    readonly isUndelegate: boolean;
    readonly isClearPublicProposals: boolean;
    readonly isUnlock: boolean;
    readonly asUnlock: {
      readonly target: AccountId32;
    } & Struct;
    readonly isRemoveVote: boolean;
    readonly asRemoveVote: {
      readonly index: u32;
    } & Struct;
    readonly isRemoveOtherVote: boolean;
    readonly asRemoveOtherVote: {
      readonly target: AccountId32;
      readonly index: u32;
    } & Struct;
    readonly isBlacklist: boolean;
    readonly asBlacklist: {
      readonly proposalHash: H256;
      readonly maybeRefIndex: Option<u32>;
    } & Struct;
    readonly isCancelProposal: boolean;
    readonly asCancelProposal: {
      readonly propIndex: Compact<u32>;
    } & Struct;
    readonly type: 'Propose' | 'Second' | 'Vote' | 'EmergencyCancel' | 'ExternalPropose' | 'ExternalProposeMajority' | 'ExternalProposeDefault' | 'FastTrack' | 'VetoExternal' | 'CancelReferendum' | 'Delegate' | 'Undelegate' | 'ClearPublicProposals' | 'Unlock' | 'RemoveVote' | 'RemoveOtherVote' | 'Blacklist' | 'CancelProposal';
  }

  /** @name FrameSupportPreimagesBounded (346) */
  interface FrameSupportPreimagesBounded extends Enum {
    readonly isLegacy: boolean;
    readonly asLegacy: {
      readonly hash_: H256;
    } & Struct;
    readonly isInline: boolean;
    readonly asInline: Bytes;
    readonly isLookup: boolean;
    readonly asLookup: {
      readonly hash_: H256;
      readonly len: u32;
    } & Struct;
    readonly type: 'Legacy' | 'Inline' | 'Lookup';
  }

  /** @name PalletDemocracyConviction (348) */
  interface PalletDemocracyConviction extends Enum {
    readonly isNone: boolean;
    readonly isLocked1x: boolean;
    readonly isLocked2x: boolean;
    readonly isLocked3x: boolean;
    readonly isLocked4x: boolean;
    readonly isLocked5x: boolean;
    readonly isLocked6x: boolean;
    readonly type: 'None' | 'Locked1x' | 'Locked2x' | 'Locked3x' | 'Locked4x' | 'Locked5x' | 'Locked6x';
  }

  /** @name DexApiCall (350) */
  interface DexApiCall extends Enum {
    readonly isEnableLiquiditySource: boolean;
    readonly asEnableLiquiditySource: {
      readonly source: CommonPrimitivesLiquiditySourceType;
    } & Struct;
    readonly isDisableLiquiditySource: boolean;
    readonly asDisableLiquiditySource: {
      readonly source: CommonPrimitivesLiquiditySourceType;
    } & Struct;
    readonly type: 'EnableLiquiditySource' | 'DisableLiquiditySource';
  }

  /** @name EthBridgeCall (351) */
  interface EthBridgeCall extends Enum {
    readonly isRegisterBridge: boolean;
    readonly asRegisterBridge: {
      readonly bridgeContractAddress: H160;
      readonly initialPeers: Vec<AccountId32>;
      readonly signatureVersion: EthBridgeBridgeSignatureVersion;
    } & Struct;
    readonly isAddAsset: boolean;
    readonly asAddAsset: {
      readonly assetId: CommonPrimitivesAssetId32;
      readonly networkId: u32;
    } & Struct;
    readonly isAddSidechainToken: boolean;
    readonly asAddSidechainToken: {
      readonly tokenAddress: H160;
      readonly symbol: Text;
      readonly name: Text;
      readonly decimals: u8;
      readonly networkId: u32;
    } & Struct;
    readonly isTransferToSidechain: boolean;
    readonly asTransferToSidechain: {
      readonly assetId: CommonPrimitivesAssetId32;
      readonly to: H160;
      readonly amount: u128;
      readonly networkId: u32;
    } & Struct;
    readonly isRequestFromSidechain: boolean;
    readonly asRequestFromSidechain: {
      readonly ethTxHash: H256;
      readonly kind: EthBridgeRequestsIncomingRequestKind;
      readonly networkId: u32;
    } & Struct;
    readonly isFinalizeIncomingRequest: boolean;
    readonly asFinalizeIncomingRequest: {
      readonly hash_: H256;
      readonly networkId: u32;
    } & Struct;
    readonly isAddPeer: boolean;
    readonly asAddPeer: {
      readonly accountId: AccountId32;
      readonly address: H160;
      readonly networkId: u32;
    } & Struct;
    readonly isRemovePeer: boolean;
    readonly asRemovePeer: {
      readonly accountId: AccountId32;
      readonly peerAddress: Option<H160>;
      readonly networkId: u32;
    } & Struct;
    readonly isPrepareForMigration: boolean;
    readonly asPrepareForMigration: {
      readonly networkId: u32;
    } & Struct;
    readonly isMigrate: boolean;
    readonly asMigrate: {
      readonly newContractAddress: H160;
      readonly erc20NativeTokens: Vec<H160>;
      readonly networkId: u32;
      readonly newSignatureVersion: EthBridgeBridgeSignatureVersion;
    } & Struct;
    readonly isRegisterIncomingRequest: boolean;
    readonly asRegisterIncomingRequest: {
      readonly incomingRequest: EthBridgeRequestsIncomingRequest;
    } & Struct;
    readonly isImportIncomingRequest: boolean;
    readonly asImportIncomingRequest: {
      readonly loadIncomingRequest: EthBridgeRequestsLoadIncomingRequest;
      readonly incomingRequestResult: Result<EthBridgeRequestsIncomingRequest, SpRuntimeDispatchError>;
    } & Struct;
    readonly isApproveRequest: boolean;
    readonly asApproveRequest: {
      readonly ocwPublic: SpCoreEcdsaPublic;
      readonly hash_: H256;
      readonly signatureParams: EthBridgeOffchainSignatureParams;
      readonly networkId: u32;
    } & Struct;
    readonly isAbortRequest: boolean;
    readonly asAbortRequest: {
      readonly hash_: H256;
      readonly error: SpRuntimeDispatchError;
      readonly networkId: u32;
    } & Struct;
    readonly isForceAddPeer: boolean;
    readonly asForceAddPeer: {
      readonly who: AccountId32;
      readonly address: H160;
      readonly networkId: u32;
    } & Struct;
    readonly isRemoveSidechainAsset: boolean;
    readonly asRemoveSidechainAsset: {
      readonly assetId: CommonPrimitivesAssetId32;
      readonly networkId: u32;
    } & Struct;
    readonly isRegisterExistingSidechainAsset: boolean;
    readonly asRegisterExistingSidechainAsset: {
      readonly assetId: CommonPrimitivesAssetId32;
      readonly tokenAddress: H160;
      readonly networkId: u32;
    } & Struct;
    readonly type: 'RegisterBridge' | 'AddAsset' | 'AddSidechainToken' | 'TransferToSidechain' | 'RequestFromSidechain' | 'FinalizeIncomingRequest' | 'AddPeer' | 'RemovePeer' | 'PrepareForMigration' | 'Migrate' | 'RegisterIncomingRequest' | 'ImportIncomingRequest' | 'ApproveRequest' | 'AbortRequest' | 'ForceAddPeer' | 'RemoveSidechainAsset' | 'RegisterExistingSidechainAsset';
  }

  /** @name EthBridgeBridgeSignatureVersion (352) */
  interface EthBridgeBridgeSignatureVersion extends Enum {
    readonly isV1: boolean;
    readonly isV2: boolean;
    readonly isV3: boolean;
    readonly type: 'V1' | 'V2' | 'V3';
  }

  /** @name EthBridgeRequestsIncomingRequestKind (353) */
  interface EthBridgeRequestsIncomingRequestKind extends Enum {
    readonly isTransaction: boolean;
    readonly asTransaction: EthBridgeRequestsIncomingTransactionRequestKind;
    readonly isMeta: boolean;
    readonly asMeta: EthBridgeRequestsIncomingMetaRequestKind;
    readonly type: 'Transaction' | 'Meta';
  }

  /** @name EthBridgeRequestsIncomingTransactionRequestKind (354) */
  interface EthBridgeRequestsIncomingTransactionRequestKind extends Enum {
    readonly isTransfer: boolean;
    readonly isAddAsset: boolean;
    readonly isAddPeer: boolean;
    readonly isRemovePeer: boolean;
    readonly isPrepareForMigration: boolean;
    readonly isMigrate: boolean;
    readonly isAddPeerCompat: boolean;
    readonly isRemovePeerCompat: boolean;
    readonly isTransferXOR: boolean;
    readonly type: 'Transfer' | 'AddAsset' | 'AddPeer' | 'RemovePeer' | 'PrepareForMigration' | 'Migrate' | 'AddPeerCompat' | 'RemovePeerCompat' | 'TransferXOR';
  }

  /** @name EthBridgeRequestsIncomingMetaRequestKind (355) */
  interface EthBridgeRequestsIncomingMetaRequestKind extends Enum {
    readonly isCancelOutgoingRequest: boolean;
    readonly isMarkAsDone: boolean;
    readonly type: 'CancelOutgoingRequest' | 'MarkAsDone';
  }

  /** @name EthBridgeRequestsIncomingRequest (357) */
  interface EthBridgeRequestsIncomingRequest extends Enum {
    readonly isTransfer: boolean;
    readonly asTransfer: EthBridgeRequestsIncomingIncomingTransfer;
    readonly isAddToken: boolean;
    readonly asAddToken: EthBridgeRequestsIncomingIncomingAddToken;
    readonly isChangePeers: boolean;
    readonly asChangePeers: EthBridgeRequestsIncomingIncomingChangePeers;
    readonly isCancelOutgoingRequest: boolean;
    readonly asCancelOutgoingRequest: EthBridgeRequestsIncomingIncomingCancelOutgoingRequest;
    readonly isMarkAsDone: boolean;
    readonly asMarkAsDone: EthBridgeRequestsIncomingIncomingMarkAsDoneRequest;
    readonly isPrepareForMigration: boolean;
    readonly asPrepareForMigration: EthBridgeRequestsIncomingIncomingPrepareForMigration;
    readonly isMigrate: boolean;
    readonly asMigrate: EthBridgeRequestsIncomingIncomingMigrate;
    readonly isChangePeersCompat: boolean;
    readonly asChangePeersCompat: EthBridgeRequestsIncomingIncomingChangePeersCompat;
    readonly type: 'Transfer' | 'AddToken' | 'ChangePeers' | 'CancelOutgoingRequest' | 'MarkAsDone' | 'PrepareForMigration' | 'Migrate' | 'ChangePeersCompat';
  }

  /** @name EthBridgeRequestsIncomingIncomingTransfer (358) */
  interface EthBridgeRequestsIncomingIncomingTransfer extends Struct {
    readonly from: H160;
    readonly to: AccountId32;
    readonly assetId: CommonPrimitivesAssetId32;
    readonly assetKind: EthBridgeRequestsAssetKind;
    readonly amount: u128;
    readonly author: AccountId32;
    readonly txHash: H256;
    readonly atHeight: u64;
    readonly timepoint: PalletMultisigBridgeTimepoint;
    readonly networkId: u32;
    readonly shouldTakeFee: bool;
  }

  /** @name EthBridgeRequestsAssetKind (359) */
  interface EthBridgeRequestsAssetKind extends Enum {
    readonly isThischain: boolean;
    readonly isSidechain: boolean;
    readonly isSidechainOwned: boolean;
    readonly type: 'Thischain' | 'Sidechain' | 'SidechainOwned';
  }

  /** @name EthBridgeRequestsIncomingIncomingAddToken (360) */
  interface EthBridgeRequestsIncomingIncomingAddToken extends Struct {
    readonly tokenAddress: H160;
    readonly assetId: CommonPrimitivesAssetId32;
    readonly precision: u8;
    readonly symbol: Bytes;
    readonly name: Bytes;
    readonly author: AccountId32;
    readonly txHash: H256;
    readonly atHeight: u64;
    readonly timepoint: PalletMultisigBridgeTimepoint;
    readonly networkId: u32;
  }

  /** @name EthBridgeRequestsIncomingIncomingChangePeers (361) */
  interface EthBridgeRequestsIncomingIncomingChangePeers extends Struct {
    readonly peerAccountId: Option<AccountId32>;
    readonly peerAddress: H160;
    readonly removed: bool;
    readonly author: AccountId32;
    readonly txHash: H256;
    readonly atHeight: u64;
    readonly timepoint: PalletMultisigBridgeTimepoint;
    readonly networkId: u32;
  }

  /** @name EthBridgeRequestsIncomingIncomingCancelOutgoingRequest (362) */
  interface EthBridgeRequestsIncomingIncomingCancelOutgoingRequest extends Struct {
    readonly outgoingRequest: EthBridgeRequestsOutgoingRequest;
    readonly outgoingRequestHash: H256;
    readonly initialRequestHash: H256;
    readonly txInput: Bytes;
    readonly author: AccountId32;
    readonly txHash: H256;
    readonly atHeight: u64;
    readonly timepoint: PalletMultisigBridgeTimepoint;
    readonly networkId: u32;
  }

  /** @name EthBridgeRequestsOutgoingRequest (363) */
  interface EthBridgeRequestsOutgoingRequest extends Enum {
    readonly isTransfer: boolean;
    readonly asTransfer: EthBridgeRequestsOutgoingOutgoingTransfer;
    readonly isAddAsset: boolean;
    readonly asAddAsset: EthBridgeRequestsOutgoingOutgoingAddAsset;
    readonly isAddToken: boolean;
    readonly asAddToken: EthBridgeRequestsOutgoingOutgoingAddToken;
    readonly isAddPeer: boolean;
    readonly asAddPeer: EthBridgeRequestsOutgoingOutgoingAddPeer;
    readonly isRemovePeer: boolean;
    readonly asRemovePeer: EthBridgeRequestsOutgoingOutgoingRemovePeer;
    readonly isPrepareForMigration: boolean;
    readonly asPrepareForMigration: EthBridgeRequestsOutgoingOutgoingPrepareForMigration;
    readonly isMigrate: boolean;
    readonly asMigrate: EthBridgeRequestsOutgoingOutgoingMigrate;
    readonly isAddPeerCompat: boolean;
    readonly asAddPeerCompat: EthBridgeRequestsOutgoingOutgoingAddPeerCompat;
    readonly isRemovePeerCompat: boolean;
    readonly asRemovePeerCompat: EthBridgeRequestsOutgoingOutgoingRemovePeerCompat;
    readonly type: 'Transfer' | 'AddAsset' | 'AddToken' | 'AddPeer' | 'RemovePeer' | 'PrepareForMigration' | 'Migrate' | 'AddPeerCompat' | 'RemovePeerCompat';
  }

  /** @name EthBridgeRequestsOutgoingOutgoingTransfer (364) */
  interface EthBridgeRequestsOutgoingOutgoingTransfer extends Struct {
    readonly from: AccountId32;
    readonly to: H160;
    readonly assetId: CommonPrimitivesAssetId32;
    readonly amount: u128;
    readonly nonce: u32;
    readonly networkId: u32;
    readonly timepoint: PalletMultisigBridgeTimepoint;
  }

  /** @name EthBridgeRequestsOutgoingOutgoingAddAsset (365) */
  interface EthBridgeRequestsOutgoingOutgoingAddAsset extends Struct {
    readonly author: AccountId32;
    readonly assetId: CommonPrimitivesAssetId32;
    readonly nonce: u32;
    readonly networkId: u32;
    readonly timepoint: PalletMultisigBridgeTimepoint;
  }

  /** @name EthBridgeRequestsOutgoingOutgoingAddToken (366) */
  interface EthBridgeRequestsOutgoingOutgoingAddToken extends Struct {
    readonly author: AccountId32;
    readonly tokenAddress: H160;
    readonly symbol: Text;
    readonly name: Text;
    readonly decimals: u8;
    readonly nonce: u32;
    readonly networkId: u32;
    readonly timepoint: PalletMultisigBridgeTimepoint;
  }

  /** @name EthBridgeRequestsOutgoingOutgoingAddPeer (367) */
  interface EthBridgeRequestsOutgoingOutgoingAddPeer extends Struct {
    readonly author: AccountId32;
    readonly peerAddress: H160;
    readonly peerAccountId: AccountId32;
    readonly nonce: u32;
    readonly networkId: u32;
    readonly timepoint: PalletMultisigBridgeTimepoint;
  }

  /** @name EthBridgeRequestsOutgoingOutgoingRemovePeer (368) */
  interface EthBridgeRequestsOutgoingOutgoingRemovePeer extends Struct {
    readonly author: AccountId32;
    readonly peerAccountId: AccountId32;
    readonly peerAddress: H160;
    readonly nonce: u32;
    readonly networkId: u32;
    readonly timepoint: PalletMultisigBridgeTimepoint;
    readonly compatHash: Option<H256>;
  }

  /** @name EthBridgeRequestsOutgoingOutgoingPrepareForMigration (370) */
  interface EthBridgeRequestsOutgoingOutgoingPrepareForMigration extends Struct {
    readonly author: AccountId32;
    readonly nonce: u32;
    readonly networkId: u32;
    readonly timepoint: PalletMultisigBridgeTimepoint;
  }

  /** @name EthBridgeRequestsOutgoingOutgoingMigrate (371) */
  interface EthBridgeRequestsOutgoingOutgoingMigrate extends Struct {
    readonly author: AccountId32;
    readonly newContractAddress: H160;
    readonly erc20NativeTokens: Vec<H160>;
    readonly nonce: u32;
    readonly networkId: u32;
    readonly timepoint: PalletMultisigBridgeTimepoint;
    readonly newSignatureVersion: EthBridgeBridgeSignatureVersion;
  }

  /** @name EthBridgeRequestsOutgoingOutgoingAddPeerCompat (372) */
  interface EthBridgeRequestsOutgoingOutgoingAddPeerCompat extends Struct {
    readonly author: AccountId32;
    readonly peerAddress: H160;
    readonly peerAccountId: AccountId32;
    readonly nonce: u32;
    readonly networkId: u32;
    readonly timepoint: PalletMultisigBridgeTimepoint;
  }

  /** @name EthBridgeRequestsOutgoingOutgoingRemovePeerCompat (373) */
  interface EthBridgeRequestsOutgoingOutgoingRemovePeerCompat extends Struct {
    readonly author: AccountId32;
    readonly peerAccountId: AccountId32;
    readonly peerAddress: H160;
    readonly nonce: u32;
    readonly networkId: u32;
    readonly timepoint: PalletMultisigBridgeTimepoint;
  }

  /** @name EthBridgeRequestsIncomingIncomingMarkAsDoneRequest (374) */
  interface EthBridgeRequestsIncomingIncomingMarkAsDoneRequest extends Struct {
    readonly outgoingRequestHash: H256;
    readonly initialRequestHash: H256;
    readonly author: AccountId32;
    readonly atHeight: u64;
    readonly timepoint: PalletMultisigBridgeTimepoint;
    readonly networkId: u32;
  }

  /** @name EthBridgeRequestsIncomingIncomingPrepareForMigration (375) */
  interface EthBridgeRequestsIncomingIncomingPrepareForMigration extends Struct {
    readonly author: AccountId32;
    readonly txHash: H256;
    readonly atHeight: u64;
    readonly timepoint: PalletMultisigBridgeTimepoint;
    readonly networkId: u32;
  }

  /** @name EthBridgeRequestsIncomingIncomingMigrate (376) */
  interface EthBridgeRequestsIncomingIncomingMigrate extends Struct {
    readonly newContractAddress: H160;
    readonly author: AccountId32;
    readonly txHash: H256;
    readonly atHeight: u64;
    readonly timepoint: PalletMultisigBridgeTimepoint;
    readonly networkId: u32;
  }

  /** @name EthBridgeRequestsIncomingIncomingChangePeersCompat (377) */
  interface EthBridgeRequestsIncomingIncomingChangePeersCompat extends Struct {
    readonly peerAccountId: AccountId32;
    readonly peerAddress: H160;
    readonly added: bool;
    readonly contract: EthBridgeRequestsIncomingChangePeersContract;
    readonly author: AccountId32;
    readonly txHash: H256;
    readonly atHeight: u64;
    readonly timepoint: PalletMultisigBridgeTimepoint;
    readonly networkId: u32;
  }

  /** @name EthBridgeRequestsIncomingChangePeersContract (378) */
  interface EthBridgeRequestsIncomingChangePeersContract extends Enum {
    readonly isXor: boolean;
    readonly isVal: boolean;
    readonly type: 'Xor' | 'Val';
  }

  /** @name EthBridgeRequestsLoadIncomingRequest (379) */
  interface EthBridgeRequestsLoadIncomingRequest extends Enum {
    readonly isTransaction: boolean;
    readonly asTransaction: EthBridgeRequestsLoadIncomingTransactionRequest;
    readonly isMeta: boolean;
    readonly asMeta: ITuple<[EthBridgeRequestsLoadIncomingMetaRequest, H256]>;
    readonly type: 'Transaction' | 'Meta';
  }

  /** @name EthBridgeRequestsLoadIncomingTransactionRequest (380) */
  interface EthBridgeRequestsLoadIncomingTransactionRequest extends Struct {
    readonly author: AccountId32;
    readonly hash_: H256;
    readonly timepoint: PalletMultisigBridgeTimepoint;
    readonly kind: EthBridgeRequestsIncomingTransactionRequestKind;
    readonly networkId: u32;
  }

  /** @name EthBridgeRequestsLoadIncomingMetaRequest (381) */
  interface EthBridgeRequestsLoadIncomingMetaRequest extends Struct {
    readonly author: AccountId32;
    readonly hash_: H256;
    readonly timepoint: PalletMultisigBridgeTimepoint;
    readonly kind: EthBridgeRequestsIncomingMetaRequestKind;
    readonly networkId: u32;
  }

  /** @name EthBridgeOffchainSignatureParams (383) */
  interface EthBridgeOffchainSignatureParams extends Struct {
    readonly r: U8aFixed;
    readonly s: U8aFixed;
    readonly v: u8;
  }

  /** @name PswapDistributionCall (384) */
  interface PswapDistributionCall extends Enum {
    readonly isClaimIncentive: boolean;
    readonly type: 'ClaimIncentive';
  }

  /** @name PalletSchedulerCall (387) */
  interface PalletSchedulerCall extends Enum {
    readonly isSchedule: boolean;
    readonly asSchedule: {
      readonly when: u32;
      readonly maybePeriodic: Option<ITuple<[u32, u32]>>;
      readonly priority: u8;
      readonly call: Call;
    } & Struct;
    readonly isCancel: boolean;
    readonly asCancel: {
      readonly when: u32;
      readonly index: u32;
    } & Struct;
    readonly isScheduleNamed: boolean;
    readonly asScheduleNamed: {
      readonly id: U8aFixed;
      readonly when: u32;
      readonly maybePeriodic: Option<ITuple<[u32, u32]>>;
      readonly priority: u8;
      readonly call: Call;
    } & Struct;
    readonly isCancelNamed: boolean;
    readonly asCancelNamed: {
      readonly id: U8aFixed;
    } & Struct;
    readonly isScheduleAfter: boolean;
    readonly asScheduleAfter: {
      readonly after: u32;
      readonly maybePeriodic: Option<ITuple<[u32, u32]>>;
      readonly priority: u8;
      readonly call: Call;
    } & Struct;
    readonly isScheduleNamedAfter: boolean;
    readonly asScheduleNamedAfter: {
      readonly id: U8aFixed;
      readonly after: u32;
      readonly maybePeriodic: Option<ITuple<[u32, u32]>>;
      readonly priority: u8;
      readonly call: Call;
    } & Struct;
    readonly type: 'Schedule' | 'Cancel' | 'ScheduleNamed' | 'CancelNamed' | 'ScheduleAfter' | 'ScheduleNamedAfter';
  }

  /** @name IrohaMigrationCall (389) */
  interface IrohaMigrationCall extends Enum {
    readonly isMigrate: boolean;
    readonly asMigrate: {
      readonly irohaAddress: Text;
      readonly irohaPublicKey: Text;
      readonly irohaSignature: Text;
    } & Struct;
    readonly type: 'Migrate';
  }

  /** @name PalletMembershipCall (390) */
  interface PalletMembershipCall extends Enum {
    readonly isAddMember: boolean;
    readonly asAddMember: {
      readonly who: AccountId32;
    } & Struct;
    readonly isRemoveMember: boolean;
    readonly asRemoveMember: {
      readonly who: AccountId32;
    } & Struct;
    readonly isSwapMember: boolean;
    readonly asSwapMember: {
      readonly remove: AccountId32;
      readonly add: AccountId32;
    } & Struct;
    readonly isResetMembers: boolean;
    readonly asResetMembers: {
      readonly members: Vec<AccountId32>;
    } & Struct;
    readonly isChangeKey: boolean;
    readonly asChangeKey: {
      readonly new_: AccountId32;
    } & Struct;
    readonly isSetPrime: boolean;
    readonly asSetPrime: {
      readonly who: AccountId32;
    } & Struct;
    readonly isClearPrime: boolean;
    readonly type: 'AddMember' | 'RemoveMember' | 'SwapMember' | 'ResetMembers' | 'ChangeKey' | 'SetPrime' | 'ClearPrime';
  }

  /** @name PalletElectionsPhragmenCall (391) */
  interface PalletElectionsPhragmenCall extends Enum {
    readonly isVote: boolean;
    readonly asVote: {
      readonly votes: Vec<AccountId32>;
      readonly value: Compact<u128>;
    } & Struct;
    readonly isRemoveVoter: boolean;
    readonly isSubmitCandidacy: boolean;
    readonly asSubmitCandidacy: {
      readonly candidateCount: Compact<u32>;
    } & Struct;
    readonly isRenounceCandidacy: boolean;
    readonly asRenounceCandidacy: {
      readonly renouncing: PalletElectionsPhragmenRenouncing;
    } & Struct;
    readonly isRemoveMember: boolean;
    readonly asRemoveMember: {
      readonly who: AccountId32;
      readonly slashBond: bool;
      readonly rerunElection: bool;
    } & Struct;
    readonly isCleanDefunctVoters: boolean;
    readonly asCleanDefunctVoters: {
      readonly numVoters: u32;
      readonly numDefunct: u32;
    } & Struct;
    readonly type: 'Vote' | 'RemoveVoter' | 'SubmitCandidacy' | 'RenounceCandidacy' | 'RemoveMember' | 'CleanDefunctVoters';
  }

  /** @name PalletElectionsPhragmenRenouncing (392) */
  interface PalletElectionsPhragmenRenouncing extends Enum {
    readonly isMember: boolean;
    readonly isRunnerUp: boolean;
    readonly isCandidate: boolean;
    readonly asCandidate: Compact<u32>;
    readonly type: 'Member' | 'RunnerUp' | 'Candidate';
  }

  /** @name VestedRewardsCall (393) */
  interface VestedRewardsCall extends Enum {
    readonly isClaimRewards: boolean;
    readonly isClaimCrowdloanRewards: boolean;
    readonly asClaimCrowdloanRewards: {
      readonly crowdloan: Bytes;
    } & Struct;
    readonly isUpdateRewards: boolean;
    readonly asUpdateRewards: {
      readonly rewards: BTreeMap<AccountId32, BTreeMap<CommonPrimitivesRewardReason, u128>>;
    } & Struct;
    readonly isRegisterCrowdloan: boolean;
    readonly asRegisterCrowdloan: {
      readonly tag: Bytes;
      readonly startBlock: u32;
      readonly length: u32;
      readonly rewards: Vec<ITuple<[CommonPrimitivesAssetId32, u128]>>;
      readonly contributions: Vec<ITuple<[AccountId32, u128]>>;
    } & Struct;
    readonly type: 'ClaimRewards' | 'ClaimCrowdloanRewards' | 'UpdateRewards' | 'RegisterCrowdloan';
  }

  /** @name PalletIdentityCall (403) */
  interface PalletIdentityCall extends Enum {
    readonly isAddRegistrar: boolean;
    readonly asAddRegistrar: {
      readonly account: AccountId32;
    } & Struct;
    readonly isSetIdentity: boolean;
    readonly asSetIdentity: {
      readonly info: PalletIdentityIdentityInfo;
    } & Struct;
    readonly isSetSubs: boolean;
    readonly asSetSubs: {
      readonly subs: Vec<ITuple<[AccountId32, Data]>>;
    } & Struct;
    readonly isClearIdentity: boolean;
    readonly isRequestJudgement: boolean;
    readonly asRequestJudgement: {
      readonly regIndex: Compact<u32>;
      readonly maxFee: Compact<u128>;
    } & Struct;
    readonly isCancelRequest: boolean;
    readonly asCancelRequest: {
      readonly regIndex: u32;
    } & Struct;
    readonly isSetFee: boolean;
    readonly asSetFee: {
      readonly index: Compact<u32>;
      readonly fee: Compact<u128>;
    } & Struct;
    readonly isSetAccountId: boolean;
    readonly asSetAccountId: {
      readonly index: Compact<u32>;
      readonly new_: AccountId32;
    } & Struct;
    readonly isSetFields: boolean;
    readonly asSetFields: {
      readonly index: Compact<u32>;
      readonly fields: PalletIdentityBitFlags;
    } & Struct;
    readonly isProvideJudgement: boolean;
    readonly asProvideJudgement: {
      readonly regIndex: Compact<u32>;
      readonly target: AccountId32;
      readonly judgement: PalletIdentityJudgement;
      readonly identity: H256;
    } & Struct;
    readonly isKillIdentity: boolean;
    readonly asKillIdentity: {
      readonly target: AccountId32;
    } & Struct;
    readonly isAddSub: boolean;
    readonly asAddSub: {
      readonly sub: AccountId32;
      readonly data: Data;
    } & Struct;
    readonly isRenameSub: boolean;
    readonly asRenameSub: {
      readonly sub: AccountId32;
      readonly data: Data;
    } & Struct;
    readonly isRemoveSub: boolean;
    readonly asRemoveSub: {
      readonly sub: AccountId32;
    } & Struct;
    readonly isQuitSub: boolean;
    readonly type: 'AddRegistrar' | 'SetIdentity' | 'SetSubs' | 'ClearIdentity' | 'RequestJudgement' | 'CancelRequest' | 'SetFee' | 'SetAccountId' | 'SetFields' | 'ProvideJudgement' | 'KillIdentity' | 'AddSub' | 'RenameSub' | 'RemoveSub' | 'QuitSub';
  }

  /** @name PalletIdentityIdentityInfo (404) */
  interface PalletIdentityIdentityInfo extends Struct {
    readonly additional: Vec<ITuple<[Data, Data]>>;
    readonly display: Data;
    readonly legal: Data;
    readonly web: Data;
    readonly riot: Data;
    readonly email: Data;
    readonly pgpFingerprint: Option<U8aFixed>;
    readonly image: Data;
    readonly twitter: Data;
  }

  /** @name PalletIdentityBitFlags (440) */
  interface PalletIdentityBitFlags extends Set {
    readonly isDisplay: boolean;
    readonly isLegal: boolean;
    readonly isWeb: boolean;
    readonly isRiot: boolean;
    readonly isEmail: boolean;
    readonly isPgpFingerprint: boolean;
    readonly isImage: boolean;
    readonly isTwitter: boolean;
  }

  /** @name PalletIdentityIdentityField (441) */
  interface PalletIdentityIdentityField extends Enum {
    readonly isDisplay: boolean;
    readonly isLegal: boolean;
    readonly isWeb: boolean;
    readonly isRiot: boolean;
    readonly isEmail: boolean;
    readonly isPgpFingerprint: boolean;
    readonly isImage: boolean;
    readonly isTwitter: boolean;
    readonly type: 'Display' | 'Legal' | 'Web' | 'Riot' | 'Email' | 'PgpFingerprint' | 'Image' | 'Twitter';
  }

  /** @name PalletIdentityJudgement (442) */
  interface PalletIdentityJudgement extends Enum {
    readonly isUnknown: boolean;
    readonly isFeePaid: boolean;
    readonly asFeePaid: u128;
    readonly isReasonable: boolean;
    readonly isKnownGood: boolean;
    readonly isOutOfDate: boolean;
    readonly isLowQuality: boolean;
    readonly isErroneous: boolean;
    readonly type: 'Unknown' | 'FeePaid' | 'Reasonable' | 'KnownGood' | 'OutOfDate' | 'LowQuality' | 'Erroneous';
  }

  /** @name XstCall (443) */
  interface XstCall extends Enum {
    readonly isSetReferenceAsset: boolean;
    readonly asSetReferenceAsset: {
      readonly referenceAssetId: CommonPrimitivesAssetId32;
    } & Struct;
    readonly isEnableSyntheticAsset: boolean;
    readonly asEnableSyntheticAsset: {
      readonly assetId: CommonPrimitivesAssetId32;
      readonly referenceSymbol: Bytes;
      readonly feeRatio: FixnumFixedPoint;
    } & Struct;
    readonly isRegisterSyntheticAsset: boolean;
    readonly asRegisterSyntheticAsset: {
      readonly assetSymbol: Bytes;
      readonly assetName: Bytes;
      readonly referenceSymbol: Bytes;
      readonly feeRatio: FixnumFixedPoint;
    } & Struct;
    readonly isDisableSyntheticAsset: boolean;
    readonly asDisableSyntheticAsset: {
      readonly syntheticAsset: CommonPrimitivesAssetId32;
    } & Struct;
    readonly isRemoveSyntheticAsset: boolean;
    readonly asRemoveSyntheticAsset: {
      readonly syntheticAsset: CommonPrimitivesAssetId32;
    } & Struct;
    readonly isSetSyntheticAssetFee: boolean;
    readonly asSetSyntheticAssetFee: {
      readonly syntheticAsset: CommonPrimitivesAssetId32;
      readonly feeRatio: FixnumFixedPoint;
    } & Struct;
    readonly isSetSyntheticBaseAssetFloorPrice: boolean;
    readonly asSetSyntheticBaseAssetFloorPrice: {
      readonly floorPrice: u128;
    } & Struct;
    readonly type: 'SetReferenceAsset' | 'EnableSyntheticAsset' | 'RegisterSyntheticAsset' | 'DisableSyntheticAsset' | 'RemoveSyntheticAsset' | 'SetSyntheticAssetFee' | 'SetSyntheticBaseAssetFloorPrice';
  }

  /** @name CeresStakingCall (444) */
  interface CeresStakingCall extends Enum {
    readonly isDeposit: boolean;
    readonly asDeposit: {
      readonly amount: u128;
    } & Struct;
    readonly isWithdraw: boolean;
    readonly isChangeRewardsRemaining: boolean;
    readonly asChangeRewardsRemaining: {
      readonly rewardsRemaining: u128;
    } & Struct;
    readonly type: 'Deposit' | 'Withdraw' | 'ChangeRewardsRemaining';
  }

  /** @name CeresLiquidityLockerCall (445) */
  interface CeresLiquidityLockerCall extends Enum {
    readonly isLockLiquidity: boolean;
    readonly asLockLiquidity: {
      readonly assetA: CommonPrimitivesAssetId32;
      readonly assetB: CommonPrimitivesAssetId32;
      readonly unlockingTimestamp: u64;
      readonly percentageOfPoolTokens: u128;
      readonly option: bool;
    } & Struct;
    readonly isChangeCeresFee: boolean;
    readonly asChangeCeresFee: {
      readonly ceresFee: u128;
    } & Struct;
    readonly type: 'LockLiquidity' | 'ChangeCeresFee';
  }

  /** @name CeresTokenLockerCall (446) */
  interface CeresTokenLockerCall extends Enum {
    readonly isLockTokens: boolean;
    readonly asLockTokens: {
      readonly assetId: CommonPrimitivesAssetId32;
      readonly unlockingTimestamp: u64;
      readonly numberOfTokens: u128;
    } & Struct;
    readonly isWithdrawTokens: boolean;
    readonly asWithdrawTokens: {
      readonly assetId: CommonPrimitivesAssetId32;
      readonly unlockingTimestamp: u64;
      readonly numberOfTokens: u128;
    } & Struct;
    readonly isChangeFee: boolean;
    readonly asChangeFee: {
      readonly newFee: u128;
    } & Struct;
    readonly type: 'LockTokens' | 'WithdrawTokens' | 'ChangeFee';
  }

  /** @name CeresGovernancePlatformCall (447) */
  interface CeresGovernancePlatformCall extends Enum {
    readonly isVote: boolean;
    readonly asVote: {
      readonly pollId: H256;
      readonly votingOption: u32;
      readonly numberOfVotes: u128;
    } & Struct;
    readonly isCreatePoll: boolean;
    readonly asCreatePoll: {
      readonly pollAsset: CommonPrimitivesAssetId32;
      readonly pollStartTimestamp: u64;
      readonly pollEndTimestamp: u64;
      readonly title: Bytes;
      readonly description: Bytes;
      readonly options: Vec<Bytes>;
    } & Struct;
    readonly isWithdraw: boolean;
    readonly asWithdraw: {
      readonly pollId: H256;
    } & Struct;
    readonly type: 'Vote' | 'CreatePoll' | 'Withdraw';
  }

  /** @name CeresLaunchpadCall (452) */
  interface CeresLaunchpadCall extends Enum {
    readonly isCreateIlo: boolean;
    readonly asCreateIlo: {
      readonly baseAsset: CommonPrimitivesAssetId32;
      readonly assetId: CommonPrimitivesAssetId32;
      readonly tokensForIlo: u128;
      readonly tokensForLiquidity: u128;
      readonly iloPrice: u128;
      readonly softCap: u128;
      readonly hardCap: u128;
      readonly minContribution: u128;
      readonly maxContribution: u128;
      readonly refundType: bool;
      readonly liquidityPercent: u128;
      readonly listingPrice: u128;
      readonly lockupDays: u32;
      readonly startTimestamp: u64;
      readonly endTimestamp: u64;
      readonly teamVestingTotalTokens: u128;
      readonly teamVestingFirstReleasePercent: u128;
      readonly teamVestingPeriod: u64;
      readonly teamVestingPercent: u128;
      readonly firstReleasePercent: u128;
      readonly vestingPeriod: u64;
      readonly vestingPercent: u128;
    } & Struct;
    readonly isContribute: boolean;
    readonly asContribute: {
      readonly assetId: CommonPrimitivesAssetId32;
      readonly fundsToContribute: u128;
    } & Struct;
    readonly isEmergencyWithdraw: boolean;
    readonly asEmergencyWithdraw: {
      readonly assetId: CommonPrimitivesAssetId32;
    } & Struct;
    readonly isFinishIlo: boolean;
    readonly asFinishIlo: {
      readonly assetId: CommonPrimitivesAssetId32;
    } & Struct;
    readonly isClaimLpTokens: boolean;
    readonly asClaimLpTokens: {
      readonly assetId: CommonPrimitivesAssetId32;
    } & Struct;
    readonly isClaim: boolean;
    readonly asClaim: {
      readonly assetId: CommonPrimitivesAssetId32;
    } & Struct;
    readonly isChangeFeePercentForRaisedFunds: boolean;
    readonly asChangeFeePercentForRaisedFunds: {
      readonly feePercent: u128;
    } & Struct;
    readonly isChangeCeresBurnFee: boolean;
    readonly asChangeCeresBurnFee: {
      readonly ceresFee: u128;
    } & Struct;
    readonly isChangeCeresContributionFee: boolean;
    readonly asChangeCeresContributionFee: {
      readonly ceresFee: u128;
    } & Struct;
    readonly isClaimPswapRewards: boolean;
    readonly isAddWhitelistedContributor: boolean;
    readonly asAddWhitelistedContributor: {
      readonly contributor: AccountId32;
    } & Struct;
    readonly isRemoveWhitelistedContributor: boolean;
    readonly asRemoveWhitelistedContributor: {
      readonly contributor: AccountId32;
    } & Struct;
    readonly isAddWhitelistedIloOrganizer: boolean;
    readonly asAddWhitelistedIloOrganizer: {
      readonly iloOrganizer: AccountId32;
    } & Struct;
    readonly isRemoveWhitelistedIloOrganizer: boolean;
    readonly asRemoveWhitelistedIloOrganizer: {
      readonly iloOrganizer: AccountId32;
    } & Struct;
    readonly type: 'CreateIlo' | 'Contribute' | 'EmergencyWithdraw' | 'FinishIlo' | 'ClaimLpTokens' | 'Claim' | 'ChangeFeePercentForRaisedFunds' | 'ChangeCeresBurnFee' | 'ChangeCeresContributionFee' | 'ClaimPswapRewards' | 'AddWhitelistedContributor' | 'RemoveWhitelistedContributor' | 'AddWhitelistedIloOrganizer' | 'RemoveWhitelistedIloOrganizer';
  }

  /** @name DemeterFarmingPlatformCall (453) */
  interface DemeterFarmingPlatformCall extends Enum {
    readonly isRegisterToken: boolean;
    readonly asRegisterToken: {
      readonly poolAsset: CommonPrimitivesAssetId32;
      readonly tokenPerBlock: u128;
      readonly farmsAllocation: u128;
      readonly stakingAllocation: u128;
      readonly teamAllocation: u128;
      readonly teamAccount: AccountId32;
    } & Struct;
    readonly isAddPool: boolean;
    readonly asAddPool: {
      readonly baseAsset: CommonPrimitivesAssetId32;
      readonly poolAsset: CommonPrimitivesAssetId32;
      readonly rewardAsset: CommonPrimitivesAssetId32;
      readonly isFarm: bool;
      readonly multiplier: u32;
      readonly depositFee: u128;
      readonly isCore: bool;
    } & Struct;
    readonly isDeposit: boolean;
    readonly asDeposit: {
      readonly baseAsset: CommonPrimitivesAssetId32;
      readonly poolAsset: CommonPrimitivesAssetId32;
      readonly rewardAsset: CommonPrimitivesAssetId32;
      readonly isFarm: bool;
      readonly pooledTokens: u128;
    } & Struct;
    readonly isGetRewards: boolean;
    readonly asGetRewards: {
      readonly baseAsset: CommonPrimitivesAssetId32;
      readonly poolAsset: CommonPrimitivesAssetId32;
      readonly rewardAsset: CommonPrimitivesAssetId32;
      readonly isFarm: bool;
    } & Struct;
    readonly isWithdraw: boolean;
    readonly asWithdraw: {
      readonly baseAsset: CommonPrimitivesAssetId32;
      readonly poolAsset: CommonPrimitivesAssetId32;
      readonly rewardAsset: CommonPrimitivesAssetId32;
      readonly pooledTokens: u128;
      readonly isFarm: bool;
    } & Struct;
    readonly isRemovePool: boolean;
    readonly asRemovePool: {
      readonly baseAsset: CommonPrimitivesAssetId32;
      readonly poolAsset: CommonPrimitivesAssetId32;
      readonly rewardAsset: CommonPrimitivesAssetId32;
      readonly isFarm: bool;
    } & Struct;
    readonly isChangePoolMultiplier: boolean;
    readonly asChangePoolMultiplier: {
      readonly baseAsset: CommonPrimitivesAssetId32;
      readonly poolAsset: CommonPrimitivesAssetId32;
      readonly rewardAsset: CommonPrimitivesAssetId32;
      readonly isFarm: bool;
      readonly newMultiplier: u32;
    } & Struct;
    readonly isChangeTotalTokens: boolean;
    readonly asChangeTotalTokens: {
      readonly baseAsset: CommonPrimitivesAssetId32;
      readonly poolAsset: CommonPrimitivesAssetId32;
      readonly rewardAsset: CommonPrimitivesAssetId32;
      readonly isFarm: bool;
      readonly totalTokens: u128;
    } & Struct;
    readonly isChangeInfo: boolean;
    readonly asChangeInfo: {
      readonly changedUser: AccountId32;
      readonly baseAsset: CommonPrimitivesAssetId32;
      readonly poolAsset: CommonPrimitivesAssetId32;
      readonly rewardAsset: CommonPrimitivesAssetId32;
      readonly isFarm: bool;
      readonly poolTokens: u128;
    } & Struct;
    readonly isChangePoolDepositFee: boolean;
    readonly asChangePoolDepositFee: {
      readonly baseAsset: CommonPrimitivesAssetId32;
      readonly poolAsset: CommonPrimitivesAssetId32;
      readonly rewardAsset: CommonPrimitivesAssetId32;
      readonly isFarm: bool;
      readonly depositFee: u128;
    } & Struct;
    readonly isChangeTokenInfo: boolean;
    readonly asChangeTokenInfo: {
      readonly poolAsset: CommonPrimitivesAssetId32;
      readonly tokenPerBlock: u128;
      readonly farmsAllocation: u128;
      readonly stakingAllocation: u128;
      readonly teamAllocation: u128;
      readonly teamAccount: AccountId32;
    } & Struct;
    readonly type: 'RegisterToken' | 'AddPool' | 'Deposit' | 'GetRewards' | 'Withdraw' | 'RemovePool' | 'ChangePoolMultiplier' | 'ChangeTotalTokens' | 'ChangeInfo' | 'ChangePoolDepositFee' | 'ChangeTokenInfo';
  }

  /** @name PalletBagsListCall (454) */
  interface PalletBagsListCall extends Enum {
    readonly isRebag: boolean;
    readonly asRebag: {
      readonly dislocated: AccountId32;
    } & Struct;
    readonly isPutInFrontOf: boolean;
    readonly asPutInFrontOf: {
      readonly lighter: AccountId32;
    } & Struct;
    readonly type: 'Rebag' | 'PutInFrontOf';
  }

  /** @name PalletElectionProviderMultiPhaseCall (455) */
  interface PalletElectionProviderMultiPhaseCall extends Enum {
    readonly isSubmitUnsigned: boolean;
    readonly asSubmitUnsigned: {
      readonly rawSolution: PalletElectionProviderMultiPhaseRawSolution;
      readonly witness: PalletElectionProviderMultiPhaseSolutionOrSnapshotSize;
    } & Struct;
    readonly isSetMinimumUntrustedScore: boolean;
    readonly asSetMinimumUntrustedScore: {
      readonly maybeNextScore: Option<SpNposElectionsElectionScore>;
    } & Struct;
    readonly isSetEmergencyElectionResult: boolean;
    readonly asSetEmergencyElectionResult: {
      readonly supports: Vec<ITuple<[AccountId32, SpNposElectionsSupport]>>;
    } & Struct;
    readonly isSubmit: boolean;
    readonly asSubmit: {
      readonly rawSolution: PalletElectionProviderMultiPhaseRawSolution;
    } & Struct;
    readonly isGovernanceFallback: boolean;
    readonly asGovernanceFallback: {
      readonly maybeMaxVoters: Option<u32>;
      readonly maybeMaxTargets: Option<u32>;
    } & Struct;
    readonly type: 'SubmitUnsigned' | 'SetMinimumUntrustedScore' | 'SetEmergencyElectionResult' | 'Submit' | 'GovernanceFallback';
  }

  /** @name PalletElectionProviderMultiPhaseRawSolution (456) */
  interface PalletElectionProviderMultiPhaseRawSolution extends Struct {
    readonly solution: FramenodeRuntimeNposCompactSolution24;
    readonly score: SpNposElectionsElectionScore;
    readonly round: u32;
  }

  /** @name FramenodeRuntimeNposCompactSolution24 (457) */
  interface FramenodeRuntimeNposCompactSolution24 extends Struct {
    readonly votes1: Vec<ITuple<[Compact<u32>, Compact<u16>]>>;
    readonly votes2: Vec<ITuple<[Compact<u32>, ITuple<[Compact<u16>, Compact<PerU16>]>, Compact<u16>]>>;
    readonly votes3: Vec<ITuple<[Compact<u32>, Vec<ITuple<[Compact<u16>, Compact<PerU16>]>>, Compact<u16>]>>;
    readonly votes4: Vec<ITuple<[Compact<u32>, Vec<ITuple<[Compact<u16>, Compact<PerU16>]>>, Compact<u16>]>>;
    readonly votes5: Vec<ITuple<[Compact<u32>, Vec<ITuple<[Compact<u16>, Compact<PerU16>]>>, Compact<u16>]>>;
    readonly votes6: Vec<ITuple<[Compact<u32>, Vec<ITuple<[Compact<u16>, Compact<PerU16>]>>, Compact<u16>]>>;
    readonly votes7: Vec<ITuple<[Compact<u32>, Vec<ITuple<[Compact<u16>, Compact<PerU16>]>>, Compact<u16>]>>;
    readonly votes8: Vec<ITuple<[Compact<u32>, Vec<ITuple<[Compact<u16>, Compact<PerU16>]>>, Compact<u16>]>>;
    readonly votes9: Vec<ITuple<[Compact<u32>, Vec<ITuple<[Compact<u16>, Compact<PerU16>]>>, Compact<u16>]>>;
    readonly votes10: Vec<ITuple<[Compact<u32>, Vec<ITuple<[Compact<u16>, Compact<PerU16>]>>, Compact<u16>]>>;
    readonly votes11: Vec<ITuple<[Compact<u32>, Vec<ITuple<[Compact<u16>, Compact<PerU16>]>>, Compact<u16>]>>;
    readonly votes12: Vec<ITuple<[Compact<u32>, Vec<ITuple<[Compact<u16>, Compact<PerU16>]>>, Compact<u16>]>>;
    readonly votes13: Vec<ITuple<[Compact<u32>, Vec<ITuple<[Compact<u16>, Compact<PerU16>]>>, Compact<u16>]>>;
    readonly votes14: Vec<ITuple<[Compact<u32>, Vec<ITuple<[Compact<u16>, Compact<PerU16>]>>, Compact<u16>]>>;
    readonly votes15: Vec<ITuple<[Compact<u32>, Vec<ITuple<[Compact<u16>, Compact<PerU16>]>>, Compact<u16>]>>;
    readonly votes16: Vec<ITuple<[Compact<u32>, Vec<ITuple<[Compact<u16>, Compact<PerU16>]>>, Compact<u16>]>>;
    readonly votes17: Vec<ITuple<[Compact<u32>, Vec<ITuple<[Compact<u16>, Compact<PerU16>]>>, Compact<u16>]>>;
    readonly votes18: Vec<ITuple<[Compact<u32>, Vec<ITuple<[Compact<u16>, Compact<PerU16>]>>, Compact<u16>]>>;
    readonly votes19: Vec<ITuple<[Compact<u32>, Vec<ITuple<[Compact<u16>, Compact<PerU16>]>>, Compact<u16>]>>;
    readonly votes20: Vec<ITuple<[Compact<u32>, Vec<ITuple<[Compact<u16>, Compact<PerU16>]>>, Compact<u16>]>>;
    readonly votes21: Vec<ITuple<[Compact<u32>, Vec<ITuple<[Compact<u16>, Compact<PerU16>]>>, Compact<u16>]>>;
    readonly votes22: Vec<ITuple<[Compact<u32>, Vec<ITuple<[Compact<u16>, Compact<PerU16>]>>, Compact<u16>]>>;
    readonly votes23: Vec<ITuple<[Compact<u32>, Vec<ITuple<[Compact<u16>, Compact<PerU16>]>>, Compact<u16>]>>;
    readonly votes24: Vec<ITuple<[Compact<u32>, Vec<ITuple<[Compact<u16>, Compact<PerU16>]>>, Compact<u16>]>>;
  }

  /** @name PalletElectionProviderMultiPhaseSolutionOrSnapshotSize (532) */
  interface PalletElectionProviderMultiPhaseSolutionOrSnapshotSize extends Struct {
    readonly voters: Compact<u32>;
    readonly targets: Compact<u32>;
  }

  /** @name SpNposElectionsSupport (536) */
  interface SpNposElectionsSupport extends Struct {
    readonly total: u128;
    readonly voters: Vec<ITuple<[AccountId32, u128]>>;
  }

  /** @name BandCall (537) */
  interface BandCall extends Enum {
    readonly isRelay: boolean;
    readonly asRelay: {
      readonly rates: Vec<ITuple<[Bytes, u64]>>;
      readonly resolveTime: u64;
      readonly requestId: u64;
    } & Struct;
    readonly isForceRelay: boolean;
    readonly asForceRelay: {
      readonly rates: Vec<ITuple<[Bytes, u64]>>;
      readonly resolveTime: u64;
      readonly requestId: u64;
    } & Struct;
    readonly isAddRelayers: boolean;
    readonly asAddRelayers: {
      readonly accountIds: Vec<AccountId32>;
    } & Struct;
    readonly isRemoveRelayers: boolean;
    readonly asRemoveRelayers: {
      readonly accountIds: Vec<AccountId32>;
    } & Struct;
    readonly isSetDynamicFeeParameters: boolean;
    readonly asSetDynamicFeeParameters: {
      readonly feeParameters: BandFeeCalculationParameters;
    } & Struct;
    readonly type: 'Relay' | 'ForceRelay' | 'AddRelayers' | 'RemoveRelayers' | 'SetDynamicFeeParameters';
  }

  /** @name BandFeeCalculationParameters (541) */
  interface BandFeeCalculationParameters extends Struct {
    readonly decay: FixnumFixedPoint;
    readonly minFee: FixnumFixedPoint;
    readonly deviation: FixnumFixedPoint;
  }

  /** @name OracleProxyCall (542) */
  interface OracleProxyCall extends Enum {
    readonly isEnableOracle: boolean;
    readonly asEnableOracle: {
      readonly oracle: CommonPrimitivesOracle;
    } & Struct;
    readonly isDisableOracle: boolean;
    readonly asDisableOracle: {
      readonly oracle: CommonPrimitivesOracle;
    } & Struct;
    readonly type: 'EnableOracle' | 'DisableOracle';
  }

  /** @name HermesGovernancePlatformCall (543) */
  interface HermesGovernancePlatformCall extends Enum {
    readonly isVote: boolean;
    readonly asVote: {
      readonly pollId: H256;
      readonly votingOption: Bytes;
    } & Struct;
    readonly isCreatePoll: boolean;
    readonly asCreatePoll: {
      readonly pollStartTimestamp: u64;
      readonly pollEndTimestamp: u64;
      readonly title: Bytes;
      readonly description: Bytes;
      readonly options: Vec<Bytes>;
    } & Struct;
    readonly isWithdrawFundsVoter: boolean;
    readonly asWithdrawFundsVoter: {
      readonly pollId: H256;
    } & Struct;
    readonly isWithdrawFundsCreator: boolean;
    readonly asWithdrawFundsCreator: {
      readonly pollId: H256;
    } & Struct;
    readonly isChangeMinHermesForVoting: boolean;
    readonly asChangeMinHermesForVoting: {
      readonly hermesAmount: u128;
    } & Struct;
    readonly isChangeMinHermesForCreatingPoll: boolean;
    readonly asChangeMinHermesForCreatingPoll: {
      readonly hermesAmount: u128;
    } & Struct;
    readonly type: 'Vote' | 'CreatePoll' | 'WithdrawFundsVoter' | 'WithdrawFundsCreator' | 'ChangeMinHermesForVoting' | 'ChangeMinHermesForCreatingPoll';
  }

  /** @name PalletPreimageCall (544) */
  interface PalletPreimageCall extends Enum {
    readonly isNotePreimage: boolean;
    readonly asNotePreimage: {
      readonly bytes: Bytes;
    } & Struct;
    readonly isUnnotePreimage: boolean;
    readonly asUnnotePreimage: {
      readonly hash_: H256;
    } & Struct;
    readonly isRequestPreimage: boolean;
    readonly asRequestPreimage: {
      readonly hash_: H256;
    } & Struct;
    readonly isUnrequestPreimage: boolean;
    readonly asUnrequestPreimage: {
      readonly hash_: H256;
    } & Struct;
    readonly type: 'NotePreimage' | 'UnnotePreimage' | 'RequestPreimage' | 'UnrequestPreimage';
  }

  /** @name OrderBookCall (545) */
  interface OrderBookCall extends Enum {
    readonly isCreateOrderbook: boolean;
    readonly asCreateOrderbook: {
      readonly orderBookId: OrderBookOrderBookId;
      readonly tickSize: u128;
      readonly stepLotSize: u128;
      readonly minLotSize: u128;
      readonly maxLotSize: u128;
    } & Struct;
    readonly isDeleteOrderbook: boolean;
    readonly asDeleteOrderbook: {
      readonly orderBookId: OrderBookOrderBookId;
    } & Struct;
    readonly isUpdateOrderbook: boolean;
    readonly asUpdateOrderbook: {
      readonly orderBookId: OrderBookOrderBookId;
      readonly tickSize: u128;
      readonly stepLotSize: u128;
      readonly minLotSize: u128;
      readonly maxLotSize: u128;
    } & Struct;
    readonly isChangeOrderbookStatus: boolean;
    readonly asChangeOrderbookStatus: {
      readonly orderBookId: OrderBookOrderBookId;
      readonly status: OrderBookOrderBookStatus;
    } & Struct;
    readonly isPlaceLimitOrder: boolean;
    readonly asPlaceLimitOrder: {
      readonly orderBookId: OrderBookOrderBookId;
      readonly price: u128;
      readonly amount: u128;
      readonly side: CommonPrimitivesPriceVariant;
      readonly lifespan: Option<u64>;
    } & Struct;
    readonly isCancelLimitOrder: boolean;
    readonly asCancelLimitOrder: {
      readonly orderBookId: OrderBookOrderBookId;
      readonly orderId: u128;
    } & Struct;
    readonly isCancelLimitOrdersBatch: boolean;
    readonly asCancelLimitOrdersBatch: {
      readonly limitOrdersToCancel: Vec<ITuple<[OrderBookOrderBookId, Vec<u128>]>>;
    } & Struct;
    readonly isExecuteMarketOrder: boolean;
    readonly asExecuteMarketOrder: {
      readonly orderBookId: OrderBookOrderBookId;
      readonly direction: CommonPrimitivesPriceVariant;
      readonly amount: u128;
    } & Struct;
    readonly type: 'CreateOrderbook' | 'DeleteOrderbook' | 'UpdateOrderbook' | 'ChangeOrderbookStatus' | 'PlaceLimitOrder' | 'CancelLimitOrder' | 'CancelLimitOrdersBatch' | 'ExecuteMarketOrder';
  }

  /** @name BridgeProxyCall (548) */
  interface BridgeProxyCall extends Enum {
    readonly isBurn: boolean;
    readonly asBurn: {
      readonly networkId: BridgeTypesGenericNetworkId;
      readonly assetId: CommonPrimitivesAssetId32;
      readonly recipient: BridgeTypesGenericAccount;
      readonly amount: u128;
    } & Struct;
    readonly isAddLimitedAsset: boolean;
    readonly asAddLimitedAsset: {
      readonly assetId: CommonPrimitivesAssetId32;
    } & Struct;
    readonly isRemoveLimitedAsset: boolean;
    readonly asRemoveLimitedAsset: {
      readonly assetId: CommonPrimitivesAssetId32;
    } & Struct;
    readonly isUpdateTransferLimit: boolean;
    readonly asUpdateTransferLimit: {
      readonly settings: BridgeProxyTransferLimitSettings;
    } & Struct;
    readonly type: 'Burn' | 'AddLimitedAsset' | 'RemoveLimitedAsset' | 'UpdateTransferLimit';
  }

  /** @name BridgeTypesGenericAccount (549) */
  interface BridgeTypesGenericAccount extends Enum {
    readonly isEvm: boolean;
    readonly asEvm: H160;
    readonly isSora: boolean;
    readonly asSora: AccountId32;
    readonly isParachain: boolean;
    readonly asParachain: XcmVersionedMultiLocation;
    readonly isUnknown: boolean;
    readonly isRoot: boolean;
    readonly type: 'Evm' | 'Sora' | 'Parachain' | 'Unknown' | 'Root';
  }

  /** @name BridgeProxyTransferLimitSettings (550) */
  interface BridgeProxyTransferLimitSettings extends Struct {
    readonly maxAmount: u128;
    readonly periodBlocks: u32;
  }

  /** @name EthereumLightClientCall (551) */
  interface EthereumLightClientCall extends Enum {
    readonly isRegisterNetwork: boolean;
    readonly asRegisterNetwork: {
      readonly networkConfig: BridgeTypesNetworkConfig;
      readonly header: BridgeTypesHeader;
      readonly initialDifficulty: U256;
    } & Struct;
    readonly isUpdateDifficultyConfig: boolean;
    readonly asUpdateDifficultyConfig: {
      readonly networkConfig: BridgeTypesNetworkConfig;
    } & Struct;
    readonly isImportHeader: boolean;
    readonly asImportHeader: {
      readonly networkId: U256;
      readonly header: BridgeTypesHeader;
      readonly proof: Vec<BridgeTypesEthashproofDoubleNodeWithMerkleProof>;
      readonly mixNonce: BridgeTypesEthashproofMixNonce;
      readonly submitter: AccountId32;
      readonly signature: SpRuntimeMultiSignature;
    } & Struct;
    readonly type: 'RegisterNetwork' | 'UpdateDifficultyConfig' | 'ImportHeader';
  }

  /** @name BridgeTypesNetworkConfig (552) */
  interface BridgeTypesNetworkConfig extends Enum {
    readonly isMainnet: boolean;
    readonly isRopsten: boolean;
    readonly isSepolia: boolean;
    readonly isRinkeby: boolean;
    readonly isGoerli: boolean;
    readonly isClassic: boolean;
    readonly isMordor: boolean;
    readonly isCustom: boolean;
    readonly asCustom: {
      readonly chainId: U256;
      readonly consensus: BridgeTypesNetworkConfigConsensus;
    } & Struct;
    readonly type: 'Mainnet' | 'Ropsten' | 'Sepolia' | 'Rinkeby' | 'Goerli' | 'Classic' | 'Mordor' | 'Custom';
  }

  /** @name BridgeTypesNetworkConfigConsensus (553) */
  interface BridgeTypesNetworkConfigConsensus extends Enum {
    readonly isEthash: boolean;
    readonly asEthash: {
      readonly forkConfig: BridgeTypesDifficultyForkConfig;
    } & Struct;
    readonly isEtchash: boolean;
    readonly asEtchash: {
      readonly forkConfig: BridgeTypesDifficultyClassicForkConfig;
    } & Struct;
    readonly isClique: boolean;
    readonly asClique: {
      readonly period: u64;
      readonly epoch: u64;
    } & Struct;
    readonly type: 'Ethash' | 'Etchash' | 'Clique';
  }

  /** @name BridgeTypesDifficultyForkConfig (554) */
  interface BridgeTypesDifficultyForkConfig extends Struct {
    readonly byzantiumForkBlock: u64;
    readonly constantinopleForkBlock: u64;
    readonly muirGlacierForkBlock: u64;
    readonly londonForkBlock: u64;
    readonly arrowGlacierForkBlock: u64;
    readonly grayGlacierForkBlock: u64;
  }

  /** @name BridgeTypesDifficultyClassicForkConfig (555) */
  interface BridgeTypesDifficultyClassicForkConfig extends Struct {
    readonly ecip1041Block: u64;
    readonly ecip1099Block: u64;
  }

  /** @name BridgeTypesHeader (556) */
  interface BridgeTypesHeader extends Struct {
    readonly parentHash: H256;
    readonly timestamp: u64;
    readonly number: u64;
    readonly author: H160;
    readonly transactionsRoot: H256;
    readonly ommersHash: H256;
    readonly extraData: Bytes;
    readonly stateRoot: H256;
    readonly receiptsRoot: H256;
    readonly logsBloom: EthbloomBloom;
    readonly gasUsed: U256;
    readonly gasLimit: U256;
    readonly difficulty: U256;
    readonly seal: Vec<Bytes>;
    readonly baseFee: Option<U256>;
  }

  /** @name EthbloomBloom (557) */
  interface EthbloomBloom extends U8aFixed {}

  /** @name BridgeTypesEthashproofDoubleNodeWithMerkleProof (561) */
  interface BridgeTypesEthashproofDoubleNodeWithMerkleProof extends Struct {
    readonly dagNodes: Vec<H512>;
    readonly proof: Vec<H128>;
  }

  /** @name BridgeTypesEthashproofMixNonce (565) */
  interface BridgeTypesEthashproofMixNonce extends U8aFixed {}

  /** @name SpRuntimeMultiSignature (566) */
  interface SpRuntimeMultiSignature extends Enum {
    readonly isEd25519: boolean;
    readonly asEd25519: SpCoreEd25519Signature;
    readonly isSr25519: boolean;
    readonly asSr25519: SpCoreSr25519Signature;
    readonly isEcdsa: boolean;
    readonly asEcdsa: SpCoreEcdsaSignature;
    readonly type: 'Ed25519' | 'Sr25519' | 'Ecdsa';
  }

  /** @name BridgeInboundChannelCall (567) */
  interface BridgeInboundChannelCall extends Enum {
    readonly isSubmit: boolean;
    readonly asSubmit: {
      readonly networkId: U256;
      readonly log: BridgeTypesLog;
      readonly proof: BridgeTypesEvmProof;
    } & Struct;
    readonly isBatchDispatched: boolean;
    readonly asBatchDispatched: {
      readonly networkId: U256;
      readonly log: BridgeTypesLog;
      readonly proof: BridgeTypesEvmProof;
    } & Struct;
    readonly isRegisterChannel: boolean;
    readonly asRegisterChannel: {
      readonly networkId: U256;
      readonly inboundChannel: H160;
      readonly outboundChannel: H160;
    } & Struct;
    readonly isSetRewardFraction: boolean;
    readonly asSetRewardFraction: {
      readonly fraction: Perbill;
    } & Struct;
    readonly type: 'Submit' | 'BatchDispatched' | 'RegisterChannel' | 'SetRewardFraction';
  }

  /** @name BridgeTypesLog (568) */
  interface BridgeTypesLog extends Struct {
    readonly address: H160;
    readonly topics: Vec<H256>;
    readonly data: Bytes;
  }

  /** @name BridgeTypesEvmProof (569) */
  interface BridgeTypesEvmProof extends Struct {
    readonly blockHash: H256;
    readonly txIndex: u32;
    readonly data: Vec<Bytes>;
  }

  /** @name EthAppCall (570) */
  interface EthAppCall extends Enum {
    readonly isBurn: boolean;
    readonly asBurn: {
      readonly networkId: U256;
      readonly recipient: H160;
      readonly amount: u128;
    } & Struct;
    readonly isMint: boolean;
    readonly asMint: {
      readonly sender: H160;
      readonly recipient: AccountId32;
      readonly amount: U256;
    } & Struct;
    readonly isRegisterNetwork: boolean;
    readonly asRegisterNetwork: {
      readonly networkId: U256;
      readonly name: Bytes;
      readonly symbol: Bytes;
      readonly sidechainPrecision: u8;
      readonly contract: H160;
    } & Struct;
    readonly isRegisterNetworkWithExistingAsset: boolean;
    readonly asRegisterNetworkWithExistingAsset: {
      readonly networkId: U256;
      readonly assetId: CommonPrimitivesAssetId32;
      readonly contract: H160;
      readonly sidechainPrecision: u8;
    } & Struct;
    readonly type: 'Burn' | 'Mint' | 'RegisterNetwork' | 'RegisterNetworkWithExistingAsset';
  }

  /** @name Erc20AppCall (571) */
  interface Erc20AppCall extends Enum {
    readonly isMint: boolean;
    readonly asMint: {
      readonly token: H160;
      readonly sender: H160;
      readonly recipient: AccountId32;
      readonly amount: U256;
    } & Struct;
    readonly isRegisterAssetInternal: boolean;
    readonly asRegisterAssetInternal: {
      readonly assetId: CommonPrimitivesAssetId32;
      readonly contract: H160;
    } & Struct;
    readonly isBurn: boolean;
    readonly asBurn: {
      readonly networkId: U256;
      readonly assetId: CommonPrimitivesAssetId32;
      readonly recipient: H160;
      readonly amount: u128;
    } & Struct;
    readonly isRegisterErc20Asset: boolean;
    readonly asRegisterErc20Asset: {
      readonly networkId: U256;
      readonly address: H160;
      readonly symbol: Bytes;
      readonly name: Bytes;
      readonly decimals: u8;
    } & Struct;
    readonly isRegisterExistingErc20Asset: boolean;
    readonly asRegisterExistingErc20Asset: {
      readonly networkId: U256;
      readonly address: H160;
      readonly assetId: CommonPrimitivesAssetId32;
      readonly decimals: u8;
    } & Struct;
    readonly isRegisterNativeAsset: boolean;
    readonly asRegisterNativeAsset: {
      readonly networkId: U256;
      readonly assetId: CommonPrimitivesAssetId32;
    } & Struct;
    readonly isRegisterNativeApp: boolean;
    readonly asRegisterNativeApp: {
      readonly networkId: U256;
      readonly contract: H160;
    } & Struct;
    readonly isRegisterErc20App: boolean;
    readonly asRegisterErc20App: {
      readonly networkId: U256;
      readonly contract: H160;
    } & Struct;
    readonly type: 'Mint' | 'RegisterAssetInternal' | 'Burn' | 'RegisterErc20Asset' | 'RegisterExistingErc20Asset' | 'RegisterNativeAsset' | 'RegisterNativeApp' | 'RegisterErc20App';
  }

  /** @name MigrationAppCall (572) */
  interface MigrationAppCall extends Enum {
    readonly isMigrateErc20: boolean;
    readonly asMigrateErc20: {
      readonly networkId: U256;
      readonly erc20Assets: Vec<ITuple<[CommonPrimitivesAssetId32, H160, u8]>>;
    } & Struct;
    readonly isMigrateSidechain: boolean;
    readonly asMigrateSidechain: {
      readonly networkId: U256;
      readonly sidechainAssets: Vec<ITuple<[CommonPrimitivesAssetId32, H160, u8]>>;
    } & Struct;
    readonly isMigrateEth: boolean;
    readonly asMigrateEth: {
      readonly networkId: U256;
    } & Struct;
    readonly isRegisterNetwork: boolean;
    readonly asRegisterNetwork: {
      readonly networkId: U256;
      readonly contract: H160;
    } & Struct;
    readonly type: 'MigrateErc20' | 'MigrateSidechain' | 'MigrateEth' | 'RegisterNetwork';
  }

  /** @name BeefyLightClientCall (575) */
  interface BeefyLightClientCall extends Enum {
    readonly isInitialize: boolean;
    readonly asInitialize: {
      readonly networkId: BridgeTypesSubNetworkId;
      readonly latestBeefyBlock: u64;
      readonly validatorSet: SpBeefyMmrBeefyAuthoritySet;
      readonly nextValidatorSet: SpBeefyMmrBeefyAuthoritySet;
    } & Struct;
    readonly isSubmitSignatureCommitment: boolean;
    readonly asSubmitSignatureCommitment: {
      readonly networkId: BridgeTypesSubNetworkId;
      readonly commitment: SpBeefyCommitment;
      readonly validatorProof: BridgeCommonBeefyTypesValidatorProof;
      readonly latestMmrLeaf: SpBeefyMmrMmrLeaf;
      readonly proof: BridgeCommonSimplifiedProofProof;
    } & Struct;
    readonly type: 'Initialize' | 'SubmitSignatureCommitment';
  }

  /** @name SpBeefyMmrBeefyAuthoritySet (576) */
  interface SpBeefyMmrBeefyAuthoritySet extends Struct {
    readonly id: u64;
    readonly len: u32;
    readonly root: H256;
  }

  /** @name SpBeefyCommitment (577) */
  interface SpBeefyCommitment extends Struct {
    readonly payload: SpBeefyPayload;
    readonly blockNumber: u32;
    readonly validatorSetId: u64;
  }

  /** @name SpBeefyPayload (578) */
  interface SpBeefyPayload extends Vec<ITuple<[U8aFixed, Bytes]>> {}

  /** @name BridgeCommonBeefyTypesValidatorProof (581) */
  interface BridgeCommonBeefyTypesValidatorProof extends Struct {
    readonly validatorClaimsBitfield: BitVec;
    readonly signatures: Vec<Bytes>;
    readonly positions: Vec<u128>;
    readonly publicKeys: Vec<H160>;
    readonly publicKeyMerkleProofs: Vec<Vec<H256>>;
  }

  /** @name BitvecOrderMsb0 (584) */
  type BitvecOrderMsb0 = Null;

  /** @name SpBeefyMmrMmrLeaf (586) */
  interface SpBeefyMmrMmrLeaf extends Struct {
    readonly version: u8;
    readonly parentNumberAndHash: ITuple<[u32, H256]>;
    readonly beefyNextAuthoritySet: SpBeefyMmrBeefyAuthoritySet;
    readonly leafExtra: BridgeTypesLeafExtraData;
  }

  /** @name BridgeTypesLeafExtraData (587) */
  interface BridgeTypesLeafExtraData extends Struct {
    readonly randomSeed: H256;
    readonly digestHash: H256;
  }

  /** @name BridgeCommonSimplifiedProofProof (590) */
  interface BridgeCommonSimplifiedProofProof extends Struct {
    readonly order: u64;
    readonly items: Vec<H256>;
  }

  /** @name SubstrateBridgeChannelInboundPalletCall (591) */
  interface SubstrateBridgeChannelInboundPalletCall extends Enum {
    readonly isSubmit: boolean;
    readonly asSubmit: {
      readonly networkId: BridgeTypesSubNetworkId;
      readonly commitment: BridgeTypesGenericCommitment;
      readonly proof: FramenodeRuntimeMultiProof;
    } & Struct;
    readonly type: 'Submit';
  }

  /** @name BridgeTypesGenericCommitment (592) */
  interface BridgeTypesGenericCommitment extends Enum {
    readonly isSub: boolean;
    readonly asSub: BridgeTypesSubstrateCommitment;
    readonly isEvm: boolean;
    readonly asEvm: BridgeTypesEvmCommitment;
    readonly type: 'Sub' | 'Evm';
  }

  /** @name BridgeTypesSubstrateCommitment (593) */
  interface BridgeTypesSubstrateCommitment extends Struct {
    readonly messages: Vec<BridgeTypesSubstrateBridgeMessage>;
    readonly nonce: u64;
  }

  /** @name BridgeTypesSubstrateBridgeMessage (595) */
  interface BridgeTypesSubstrateBridgeMessage extends Struct {
    readonly payload: Bytes;
    readonly timepoint: BridgeTypesGenericTimepoint;
  }

  /** @name BridgeTypesEvmCommitment (598) */
  interface BridgeTypesEvmCommitment extends Struct {
    readonly nonce: u64;
    readonly totalMaxGas: U256;
    readonly messages: Vec<BridgeTypesEvmMessage>;
  }

  /** @name BridgeTypesEvmMessage (600) */
  interface BridgeTypesEvmMessage extends Struct {
    readonly target: H160;
    readonly maxGas: U256;
    readonly payload: Bytes;
  }

  /** @name FramenodeRuntimeMultiProof (602) */
  interface FramenodeRuntimeMultiProof extends Enum {
    readonly isBeefy: boolean;
    readonly asBeefy: BeefyLightClientSubstrateBridgeMessageProof;
    readonly isMultisig: boolean;
    readonly asMultisig: MultisigVerifierProof;
    readonly type: 'Beefy' | 'Multisig';
  }

  /** @name BeefyLightClientSubstrateBridgeMessageProof (603) */
  interface BeefyLightClientSubstrateBridgeMessageProof extends Struct {
    readonly proof: BridgeCommonSimplifiedProofProof;
    readonly leaf: SpBeefyMmrMmrLeaf;
    readonly digest: BridgeTypesAuxiliaryDigest;
  }

  /** @name BridgeTypesAuxiliaryDigest (604) */
  interface BridgeTypesAuxiliaryDigest extends Struct {
    readonly logs: Vec<BridgeTypesAuxiliaryDigestItem>;
  }

  /** @name BridgeTypesAuxiliaryDigestItem (606) */
  interface BridgeTypesAuxiliaryDigestItem extends Enum {
    readonly isCommitment: boolean;
    readonly asCommitment: ITuple<[BridgeTypesGenericNetworkId, H256]>;
    readonly type: 'Commitment';
  }

  /** @name MultisigVerifierProof (607) */
  interface MultisigVerifierProof extends Struct {
    readonly digest: BridgeTypesAuxiliaryDigest;
    readonly proof: Vec<SpCoreEcdsaSignature>;
  }

  /** @name ParachainBridgeAppCall (608) */
  interface ParachainBridgeAppCall extends Enum {
    readonly isMint: boolean;
    readonly asMint: {
      readonly assetId: CommonPrimitivesAssetId32;
      readonly sender: Option<XcmVersionedMultiLocation>;
      readonly recipient: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isFinalizeAssetRegistration: boolean;
    readonly asFinalizeAssetRegistration: {
      readonly assetId: CommonPrimitivesAssetId32;
      readonly assetKind: BridgeTypesAssetKind;
    } & Struct;
    readonly isBurn: boolean;
    readonly asBurn: {
      readonly networkId: BridgeTypesSubNetworkId;
      readonly assetId: CommonPrimitivesAssetId32;
      readonly recipient: XcmVersionedMultiLocation;
      readonly amount: u128;
    } & Struct;
    readonly isRegisterThischainAsset: boolean;
    readonly asRegisterThischainAsset: {
      readonly networkId: BridgeTypesSubNetworkId;
      readonly assetId: CommonPrimitivesAssetId32;
      readonly sidechainAsset: XcmV3MultiassetAssetId;
      readonly allowedParachains: Vec<u32>;
      readonly minimalXcmAmount: u128;
    } & Struct;
    readonly isRegisterSidechainAsset: boolean;
    readonly asRegisterSidechainAsset: {
      readonly networkId: BridgeTypesSubNetworkId;
      readonly sidechainAsset: XcmV3MultiassetAssetId;
      readonly symbol: Bytes;
      readonly name: Bytes;
      readonly decimals: u8;
      readonly allowedParachains: Vec<u32>;
      readonly minimalXcmAmount: u128;
    } & Struct;
    readonly isAddAssetidParaid: boolean;
    readonly asAddAssetidParaid: {
      readonly networkId: BridgeTypesSubNetworkId;
      readonly paraId: u32;
      readonly assetId: CommonPrimitivesAssetId32;
    } & Struct;
    readonly isRemoveAssetidParaid: boolean;
    readonly asRemoveAssetidParaid: {
      readonly networkId: BridgeTypesSubNetworkId;
      readonly paraId: u32;
      readonly assetId: CommonPrimitivesAssetId32;
    } & Struct;
    readonly isUpdateTransactionStatus: boolean;
    readonly asUpdateTransactionStatus: {
      readonly messageId: H256;
      readonly transferStatus: BridgeTypesSubstrateXcmAppTransferStatus;
    } & Struct;
    readonly isSetMinimumXcmIncomingAssetCount: boolean;
    readonly asSetMinimumXcmIncomingAssetCount: {
      readonly networkId: BridgeTypesSubNetworkId;
      readonly assetId: CommonPrimitivesAssetId32;
      readonly minimalXcmAmount: u128;
    } & Struct;
    readonly type: 'Mint' | 'FinalizeAssetRegistration' | 'Burn' | 'RegisterThischainAsset' | 'RegisterSidechainAsset' | 'AddAssetidParaid' | 'RemoveAssetidParaid' | 'UpdateTransactionStatus' | 'SetMinimumXcmIncomingAssetCount';
  }

  /** @name BridgeTypesAssetKind (609) */
  interface BridgeTypesAssetKind extends Enum {
    readonly isThischain: boolean;
    readonly isSidechain: boolean;
    readonly type: 'Thischain' | 'Sidechain';
  }

  /** @name XcmV3MultiassetAssetId (610) */
  interface XcmV3MultiassetAssetId extends Enum {
    readonly isConcrete: boolean;
    readonly asConcrete: XcmV3MultiLocation;
    readonly isAbstract: boolean;
    readonly asAbstract: U8aFixed;
    readonly type: 'Concrete' | 'Abstract';
  }

  /** @name BridgeTypesSubstrateXcmAppTransferStatus (611) */
  interface BridgeTypesSubstrateXcmAppTransferStatus extends Enum {
    readonly isSuccess: boolean;
    readonly isXcmTransferError: boolean;
    readonly type: 'Success' | 'XcmTransferError';
  }

  /** @name BridgeDataSignerCall (612) */
  interface BridgeDataSignerCall extends Enum {
    readonly isRegisterNetwork: boolean;
    readonly asRegisterNetwork: {
      readonly networkId: BridgeTypesGenericNetworkId;
      readonly peers: Vec<SpCoreEcdsaPublic>;
    } & Struct;
    readonly isApprove: boolean;
    readonly asApprove: {
      readonly networkId: BridgeTypesGenericNetworkId;
      readonly data: H256;
      readonly signature: SpCoreEcdsaSignature;
    } & Struct;
    readonly isAddPeer: boolean;
    readonly asAddPeer: {
      readonly networkId: BridgeTypesGenericNetworkId;
      readonly peer: SpCoreEcdsaPublic;
    } & Struct;
    readonly isRemovePeer: boolean;
    readonly asRemovePeer: {
      readonly networkId: BridgeTypesGenericNetworkId;
      readonly peer: SpCoreEcdsaPublic;
    } & Struct;
    readonly isFinishRemovePeer: boolean;
    readonly asFinishRemovePeer: {
      readonly peer: SpCoreEcdsaPublic;
    } & Struct;
    readonly isFinishAddPeer: boolean;
    readonly asFinishAddPeer: {
      readonly peer: SpCoreEcdsaPublic;
    } & Struct;
    readonly type: 'RegisterNetwork' | 'Approve' | 'AddPeer' | 'RemovePeer' | 'FinishRemovePeer' | 'FinishAddPeer';
  }

  /** @name MultisigVerifierCall (613) */
  interface MultisigVerifierCall extends Enum {
    readonly isInitialize: boolean;
    readonly asInitialize: {
      readonly networkId: BridgeTypesGenericNetworkId;
      readonly peers: Vec<SpCoreEcdsaPublic>;
    } & Struct;
    readonly isAddPeer: boolean;
    readonly asAddPeer: {
      readonly peer: SpCoreEcdsaPublic;
    } & Struct;
    readonly isRemovePeer: boolean;
    readonly asRemovePeer: {
      readonly peer: SpCoreEcdsaPublic;
    } & Struct;
    readonly type: 'Initialize' | 'AddPeer' | 'RemovePeer';
  }

  /** @name PalletSudoCall (614) */
  interface PalletSudoCall extends Enum {
    readonly isSudo: boolean;
    readonly asSudo: {
      readonly call: Call;
    } & Struct;
    readonly isSudoUncheckedWeight: boolean;
    readonly asSudoUncheckedWeight: {
      readonly call: Call;
      readonly weight: SpWeightsWeightV2Weight;
    } & Struct;
    readonly isSetKey: boolean;
    readonly asSetKey: {
      readonly new_: AccountId32;
    } & Struct;
    readonly isSudoAs: boolean;
    readonly asSudoAs: {
      readonly who: AccountId32;
      readonly call: Call;
    } & Struct;
    readonly type: 'Sudo' | 'SudoUncheckedWeight' | 'SetKey' | 'SudoAs';
  }

  /** @name FaucetCall (615) */
  interface FaucetCall extends Enum {
    readonly isTransfer: boolean;
    readonly asTransfer: {
      readonly assetId: CommonPrimitivesAssetId32;
      readonly target: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isResetRewards: boolean;
    readonly isUpdateLimit: boolean;
    readonly asUpdateLimit: {
      readonly newLimit: u128;
    } & Struct;
    readonly type: 'Transfer' | 'ResetRewards' | 'UpdateLimit';
  }

  /** @name QaToolsCall (616) */
  interface QaToolsCall extends Enum {
    readonly isOrderBookCreateAndFillBatch: boolean;
    readonly asOrderBookCreateAndFillBatch: {
      readonly bidsOwner: AccountId32;
      readonly asksOwner: AccountId32;
      readonly settings: Vec<ITuple<[OrderBookOrderBookId, QaToolsPalletToolsOrderBookSettingsOrderBookAttributes, QaToolsPalletToolsOrderBookSettingsOrderBookFill]>>;
    } & Struct;
    readonly isOrderBookFillBatch: boolean;
    readonly asOrderBookFillBatch: {
      readonly bidsOwner: AccountId32;
      readonly asksOwner: AccountId32;
      readonly settings: Vec<ITuple<[OrderBookOrderBookId, QaToolsPalletToolsOrderBookSettingsOrderBookFill]>>;
    } & Struct;
    readonly type: 'OrderBookCreateAndFillBatch' | 'OrderBookFillBatch';
  }

  /** @name QaToolsPalletToolsOrderBookSettingsOrderBookAttributes (619) */
  interface QaToolsPalletToolsOrderBookSettingsOrderBookAttributes extends Struct {
    readonly tickSize: u128;
    readonly stepLotSize: u128;
    readonly minLotSize: u128;
    readonly maxLotSize: u128;
  }

  /** @name QaToolsPalletToolsOrderBookSettingsOrderBookFill (620) */
  interface QaToolsPalletToolsOrderBookSettingsOrderBookFill extends Struct {
    readonly asks: Option<QaToolsPalletToolsOrderBookSettingsSideFill>;
    readonly bids: Option<QaToolsPalletToolsOrderBookSettingsSideFill>;
    readonly randomSeed: Option<u32>;
  }

  /** @name QaToolsPalletToolsOrderBookSettingsSideFill (622) */
  interface QaToolsPalletToolsOrderBookSettingsSideFill extends Struct {
    readonly highestPrice: u128;
    readonly lowestPrice: u128;
    readonly priceStep: u128;
    readonly ordersPerPrice: u32;
    readonly lifespan: Option<u64>;
    readonly amountRangeInclusive: Option<QaToolsPalletToolsOrderBookSettingsRandomAmount>;
  }

  /** @name QaToolsPalletToolsOrderBookSettingsRandomAmount (624) */
  interface QaToolsPalletToolsOrderBookSettingsRandomAmount extends Struct {
    readonly min: u128;
    readonly max: u128;
  }

  /** @name PalletMultisigError (628) */
  interface PalletMultisigError extends Enum {
    readonly isMinimumThreshold: boolean;
    readonly isAlreadyApproved: boolean;
    readonly isNoApprovalsNeeded: boolean;
    readonly isTooFewSignatories: boolean;
    readonly isTooManySignatories: boolean;
    readonly isSignatoriesOutOfOrder: boolean;
    readonly isSenderNotInSignatories: boolean;
    readonly isNotInSignatories: boolean;
    readonly isAlreadyInSignatories: boolean;
    readonly isNotFound: boolean;
    readonly isNotOwner: boolean;
    readonly isNoTimepoint: boolean;
    readonly isWrongTimepoint: boolean;
    readonly isUnexpectedTimepoint: boolean;
    readonly isAlreadyStored: boolean;
    readonly isWeightTooLow: boolean;
    readonly isZeroThreshold: boolean;
    readonly isMultisigAlreadyExists: boolean;
    readonly isUnknownMultisigAccount: boolean;
    readonly isSignatoriesAreNotUniqueOrUnordered: boolean;
    readonly isAlreadyDispatched: boolean;
    readonly type: 'MinimumThreshold' | 'AlreadyApproved' | 'NoApprovalsNeeded' | 'TooFewSignatories' | 'TooManySignatories' | 'SignatoriesOutOfOrder' | 'SenderNotInSignatories' | 'NotInSignatories' | 'AlreadyInSignatories' | 'NotFound' | 'NotOwner' | 'NoTimepoint' | 'WrongTimepoint' | 'UnexpectedTimepoint' | 'AlreadyStored' | 'WeightTooLow' | 'ZeroThreshold' | 'MultisigAlreadyExists' | 'UnknownMultisigAccount' | 'SignatoriesAreNotUniqueOrUnordered' | 'AlreadyDispatched';
  }

  /** @name PalletUtilityError (629) */
  interface PalletUtilityError extends Enum {
    readonly isTooManyCalls: boolean;
    readonly type: 'TooManyCalls';
  }

  /** @name PalletStakingSoraDurationWrapper (630) */
  interface PalletStakingSoraDurationWrapper extends Struct {
    readonly secs: u64;
    readonly nanos: u32;
  }

  /** @name PalletStakingStakingLedger (631) */
  interface PalletStakingStakingLedger extends Struct {
    readonly stash: AccountId32;
    readonly total: Compact<u128>;
    readonly active: Compact<u128>;
    readonly unlocking: Vec<PalletStakingUnlockChunk>;
    readonly claimedRewards: Vec<u32>;
  }

  /** @name PalletStakingUnlockChunk (633) */
  interface PalletStakingUnlockChunk extends Struct {
    readonly value: Compact<u128>;
    readonly era: Compact<u32>;
  }

  /** @name PalletStakingNominations (636) */
  interface PalletStakingNominations extends Struct {
    readonly targets: Vec<AccountId32>;
    readonly submittedIn: u32;
    readonly suppressed: bool;
  }

  /** @name PalletStakingActiveEraInfo (638) */
  interface PalletStakingActiveEraInfo extends Struct {
    readonly index: u32;
    readonly start: Option<u64>;
  }

  /** @name PalletStakingEraRewardPoints (640) */
  interface PalletStakingEraRewardPoints extends Struct {
    readonly total: u32;
    readonly individual: BTreeMap<AccountId32, u32>;
  }

  /** @name PalletStakingUnappliedSlash (645) */
  interface PalletStakingUnappliedSlash extends Struct {
    readonly validator: AccountId32;
    readonly own: u128;
    readonly others: Vec<ITuple<[AccountId32, u128]>>;
    readonly reporters: Vec<AccountId32>;
    readonly payout: u128;
  }

  /** @name PalletStakingSlashingSlashingSpans (647) */
  interface PalletStakingSlashingSlashingSpans extends Struct {
    readonly spanIndex: u32;
    readonly lastStart: u32;
    readonly lastNonzeroSlash: u32;
    readonly prior: Vec<u32>;
  }

  /** @name PalletStakingSlashingSpanRecord (648) */
  interface PalletStakingSlashingSpanRecord extends Struct {
    readonly slashed: u128;
    readonly paidOut: u128;
  }

  /** @name PalletStakingPalletError (651) */
  interface PalletStakingPalletError extends Enum {
    readonly isNotController: boolean;
    readonly isNotStash: boolean;
    readonly isAlreadyBonded: boolean;
    readonly isAlreadyPaired: boolean;
    readonly isEmptyTargets: boolean;
    readonly isDuplicateIndex: boolean;
    readonly isInvalidSlashIndex: boolean;
    readonly isInsufficientBond: boolean;
    readonly isNoMoreChunks: boolean;
    readonly isNoUnlockChunk: boolean;
    readonly isFundedTarget: boolean;
    readonly isInvalidEraToReward: boolean;
    readonly isInvalidNumberOfNominations: boolean;
    readonly isNotSortedAndUnique: boolean;
    readonly isAlreadyClaimed: boolean;
    readonly isIncorrectHistoryDepth: boolean;
    readonly isIncorrectSlashingSpans: boolean;
    readonly isBadState: boolean;
    readonly isTooManyTargets: boolean;
    readonly isBadTarget: boolean;
    readonly isCannotChillOther: boolean;
    readonly isTooManyNominators: boolean;
    readonly isTooManyValidators: boolean;
    readonly isCommissionTooLow: boolean;
    readonly isBoundNotMet: boolean;
    readonly type: 'NotController' | 'NotStash' | 'AlreadyBonded' | 'AlreadyPaired' | 'EmptyTargets' | 'DuplicateIndex' | 'InvalidSlashIndex' | 'InsufficientBond' | 'NoMoreChunks' | 'NoUnlockChunk' | 'FundedTarget' | 'InvalidEraToReward' | 'InvalidNumberOfNominations' | 'NotSortedAndUnique' | 'AlreadyClaimed' | 'IncorrectHistoryDepth' | 'IncorrectSlashingSpans' | 'BadState' | 'TooManyTargets' | 'BadTarget' | 'CannotChillOther' | 'TooManyNominators' | 'TooManyValidators' | 'CommissionTooLow' | 'BoundNotMet';
  }

  /** @name SpStakingOffenceOffenceDetails (652) */
  interface SpStakingOffenceOffenceDetails extends Struct {
    readonly offender: ITuple<[AccountId32, PalletStakingExposure]>;
    readonly reporters: Vec<AccountId32>;
  }

  /** @name SpCoreCryptoKeyTypeId (657) */
  interface SpCoreCryptoKeyTypeId extends U8aFixed {}

  /** @name PalletSessionError (658) */
  interface PalletSessionError extends Enum {
    readonly isInvalidProof: boolean;
    readonly isNoAssociatedValidatorId: boolean;
    readonly isDuplicatedKey: boolean;
    readonly isNoKeys: boolean;
    readonly isNoAccount: boolean;
    readonly type: 'InvalidProof' | 'NoAssociatedValidatorId' | 'DuplicatedKey' | 'NoKeys' | 'NoAccount';
  }

  /** @name PalletGrandpaStoredState (659) */
  interface PalletGrandpaStoredState extends Enum {
    readonly isLive: boolean;
    readonly isPendingPause: boolean;
    readonly asPendingPause: {
      readonly scheduledAt: u32;
      readonly delay: u32;
    } & Struct;
    readonly isPaused: boolean;
    readonly isPendingResume: boolean;
    readonly asPendingResume: {
      readonly scheduledAt: u32;
      readonly delay: u32;
    } & Struct;
    readonly type: 'Live' | 'PendingPause' | 'Paused' | 'PendingResume';
  }

  /** @name PalletGrandpaStoredPendingChange (660) */
  interface PalletGrandpaStoredPendingChange extends Struct {
    readonly scheduledAt: u32;
    readonly delay: u32;
    readonly nextAuthorities: Vec<ITuple<[SpFinalityGrandpaAppPublic, u64]>>;
    readonly forced: Option<u32>;
  }

  /** @name PalletGrandpaError (662) */
  interface PalletGrandpaError extends Enum {
    readonly isPauseFailed: boolean;
    readonly isResumeFailed: boolean;
    readonly isChangePending: boolean;
    readonly isTooSoon: boolean;
    readonly isInvalidKeyOwnershipProof: boolean;
    readonly isInvalidEquivocationProof: boolean;
    readonly isDuplicateOffenceReport: boolean;
    readonly type: 'PauseFailed' | 'ResumeFailed' | 'ChangePending' | 'TooSoon' | 'InvalidKeyOwnershipProof' | 'InvalidEquivocationProof' | 'DuplicateOffenceReport';
  }

  /** @name PalletImOnlineBoundedOpaqueNetworkState (666) */
  interface PalletImOnlineBoundedOpaqueNetworkState extends Struct {
    readonly peerId: Bytes;
    readonly externalAddresses: Vec<Bytes>;
  }

  /** @name PalletImOnlineError (670) */
  interface PalletImOnlineError extends Enum {
    readonly isInvalidKey: boolean;
    readonly isDuplicatedHeartbeat: boolean;
    readonly type: 'InvalidKey' | 'DuplicatedHeartbeat';
  }

  /** @name OrmlTokensBalanceLock (673) */
  interface OrmlTokensBalanceLock extends Struct {
    readonly id: U8aFixed;
    readonly amount: u128;
  }

  /** @name OrmlTokensAccountData (675) */
  interface OrmlTokensAccountData extends Struct {
    readonly free: u128;
    readonly reserved: u128;
    readonly frozen: u128;
  }

  /** @name OrmlTokensReserveData (677) */
  interface OrmlTokensReserveData extends Struct {
    readonly id: Null;
    readonly amount: u128;
  }

  /** @name OrmlTokensModuleError (679) */
  interface OrmlTokensModuleError extends Enum {
    readonly isBalanceTooLow: boolean;
    readonly isAmountIntoBalanceFailed: boolean;
    readonly isLiquidityRestrictions: boolean;
    readonly isMaxLocksExceeded: boolean;
    readonly isKeepAlive: boolean;
    readonly isExistentialDeposit: boolean;
    readonly isDeadAccount: boolean;
    readonly isTooManyReserves: boolean;
    readonly type: 'BalanceTooLow' | 'AmountIntoBalanceFailed' | 'LiquidityRestrictions' | 'MaxLocksExceeded' | 'KeepAlive' | 'ExistentialDeposit' | 'DeadAccount' | 'TooManyReserves';
  }

  /** @name OrmlCurrenciesModuleError (680) */
  interface OrmlCurrenciesModuleError extends Enum {
    readonly isAmountIntoBalanceFailed: boolean;
    readonly isBalanceTooLow: boolean;
    readonly isDepositFailed: boolean;
    readonly type: 'AmountIntoBalanceFailed' | 'BalanceTooLow' | 'DepositFailed';
  }

  /** @name TradingPairError (683) */
  interface TradingPairError extends Enum {
    readonly isTradingPairExists: boolean;
    readonly isForbiddenBaseAssetId: boolean;
    readonly isIdenticalAssetIds: boolean;
    readonly isTradingPairDoesntExist: boolean;
    readonly type: 'TradingPairExists' | 'ForbiddenBaseAssetId' | 'IdenticalAssetIds' | 'TradingPairDoesntExist';
  }

  /** @name AssetsAssetRecord (685) */
  interface AssetsAssetRecord extends Enum {
    readonly isArity0: boolean;
    readonly isArity1: boolean;
    readonly asArity1: AssetsAssetRecordArg;
    readonly isArity2: boolean;
    readonly asArity2: ITuple<[AssetsAssetRecordArg, AssetsAssetRecordArg]>;
    readonly isArity3: boolean;
    readonly asArity3: ITuple<[AssetsAssetRecordArg, AssetsAssetRecordArg, AssetsAssetRecordArg]>;
    readonly isArity4: boolean;
    readonly asArity4: ITuple<[AssetsAssetRecordArg, AssetsAssetRecordArg, AssetsAssetRecordArg, AssetsAssetRecordArg]>;
    readonly isArity5: boolean;
    readonly asArity5: ITuple<[AssetsAssetRecordArg, AssetsAssetRecordArg, AssetsAssetRecordArg, AssetsAssetRecordArg, AssetsAssetRecordArg]>;
    readonly isArity6: boolean;
    readonly asArity6: ITuple<[AssetsAssetRecordArg, AssetsAssetRecordArg, AssetsAssetRecordArg, AssetsAssetRecordArg, AssetsAssetRecordArg, AssetsAssetRecordArg]>;
    readonly isArity7: boolean;
    readonly asArity7: ITuple<[AssetsAssetRecordArg, AssetsAssetRecordArg, AssetsAssetRecordArg, AssetsAssetRecordArg, AssetsAssetRecordArg, AssetsAssetRecordArg, AssetsAssetRecordArg]>;
    readonly isArity8: boolean;
    readonly asArity8: ITuple<[AssetsAssetRecordArg, AssetsAssetRecordArg, AssetsAssetRecordArg, AssetsAssetRecordArg, AssetsAssetRecordArg, AssetsAssetRecordArg, AssetsAssetRecordArg, AssetsAssetRecordArg]>;
    readonly isArity9: boolean;
    readonly asArity9: ITuple<[AssetsAssetRecordArg, AssetsAssetRecordArg, AssetsAssetRecordArg, AssetsAssetRecordArg, AssetsAssetRecordArg, AssetsAssetRecordArg, AssetsAssetRecordArg, AssetsAssetRecordArg, AssetsAssetRecordArg]>;
    readonly type: 'Arity0' | 'Arity1' | 'Arity2' | 'Arity3' | 'Arity4' | 'Arity5' | 'Arity6' | 'Arity7' | 'Arity8' | 'Arity9';
  }

  /** @name AssetsAssetRecordArg (686) */
  interface AssetsAssetRecordArg extends Enum {
    readonly isGenericI32: boolean;
    readonly asGenericI32: i32;
    readonly isGenericU64: boolean;
    readonly asGenericU64: u64;
    readonly isGenericU128: boolean;
    readonly asGenericU128: u128;
    readonly isGenericU8x32: boolean;
    readonly asGenericU8x32: U8aFixed;
    readonly isGenericH256: boolean;
    readonly asGenericH256: H256;
    readonly isGenericH512: boolean;
    readonly asGenericH512: H512;
    readonly isLeafAssetId: boolean;
    readonly asLeafAssetId: CommonPrimitivesAssetId32;
    readonly isAssetRecordAssetId: boolean;
    readonly asAssetRecordAssetId: CommonPrimitivesAssetId32;
    readonly isExtra: boolean;
    readonly asExtra: CommonPrimitivesAssetIdExtraAssetRecordArg;
    readonly type: 'GenericI32' | 'GenericU64' | 'GenericU128' | 'GenericU8x32' | 'GenericH256' | 'GenericH512' | 'LeafAssetId' | 'AssetRecordAssetId' | 'Extra';
  }

  /** @name CommonPrimitivesAssetIdExtraAssetRecordArg (688) */
  interface CommonPrimitivesAssetIdExtraAssetRecordArg extends Enum {
    readonly isDexId: boolean;
    readonly asDexId: u32;
    readonly isLstId: boolean;
    readonly asLstId: CommonPrimitivesLiquiditySourceType;
    readonly isAccountId: boolean;
    readonly asAccountId: U8aFixed;
    readonly type: 'DexId' | 'LstId' | 'AccountId';
  }

  /** @name AssetsError (689) */
  interface AssetsError extends Enum {
    readonly isAssetIdAlreadyExists: boolean;
    readonly isAssetIdNotExists: boolean;
    readonly isInsufficientBalance: boolean;
    readonly isInvalidAssetSymbol: boolean;
    readonly isInvalidAssetName: boolean;
    readonly isInvalidPrecision: boolean;
    readonly isAssetSupplyIsNotMintable: boolean;
    readonly isInvalidAssetOwner: boolean;
    readonly isIncRefError: boolean;
    readonly isInvalidContentSource: boolean;
    readonly isInvalidDescription: boolean;
    readonly isDeadAsset: boolean;
    readonly isOverflow: boolean;
    readonly type: 'AssetIdAlreadyExists' | 'AssetIdNotExists' | 'InsufficientBalance' | 'InvalidAssetSymbol' | 'InvalidAssetName' | 'InvalidPrecision' | 'AssetSupplyIsNotMintable' | 'InvalidAssetOwner' | 'IncRefError' | 'InvalidContentSource' | 'InvalidDescription' | 'DeadAsset' | 'Overflow';
  }

  /** @name CommonPrimitivesDexInfo (690) */
  interface CommonPrimitivesDexInfo extends Struct {
    readonly baseAssetId: CommonPrimitivesAssetId32;
    readonly syntheticBaseAssetId: CommonPrimitivesAssetId32;
    readonly isPublic: bool;
  }

  /** @name DexManagerError (691) */
  interface DexManagerError extends Enum {
    readonly isDexIdAlreadyExists: boolean;
    readonly isDexDoesNotExist: boolean;
    readonly isInvalidFeeValue: boolean;
    readonly isInvalidAccountId: boolean;
    readonly type: 'DexIdAlreadyExists' | 'DexDoesNotExist' | 'InvalidFeeValue' | 'InvalidAccountId';
  }

  /** @name MulticollateralBondingCurvePoolDistributionAccounts (692) */
  interface MulticollateralBondingCurvePoolDistributionAccounts extends Struct {
    readonly xorAllocation: MulticollateralBondingCurvePoolDistributionAccountData;
    readonly valHolders: MulticollateralBondingCurvePoolDistributionAccountData;
    readonly soraCitizens: MulticollateralBondingCurvePoolDistributionAccountData;
    readonly storesAndShops: MulticollateralBondingCurvePoolDistributionAccountData;
    readonly projects: MulticollateralBondingCurvePoolDistributionAccountData;
  }

  /** @name MulticollateralBondingCurvePoolDistributionAccountData (693) */
  interface MulticollateralBondingCurvePoolDistributionAccountData extends Struct {
    readonly account: MulticollateralBondingCurvePoolDistributionAccount;
    readonly coefficient: FixnumFixedPoint;
  }

  /** @name MulticollateralBondingCurvePoolDistributionAccount (694) */
  interface MulticollateralBondingCurvePoolDistributionAccount extends Enum {
    readonly isAccount: boolean;
    readonly asAccount: AccountId32;
    readonly isTechAccount: boolean;
    readonly asTechAccount: CommonPrimitivesTechAccountId;
    readonly type: 'Account' | 'TechAccount';
  }

  /** @name MulticollateralBondingCurvePoolError (697) */
  interface MulticollateralBondingCurvePoolError extends Enum {
    readonly isPriceCalculationFailed: boolean;
    readonly isFailedToCalculatePriceWithoutImpact: boolean;
    readonly isCannotExchangeWithSelf: boolean;
    readonly isNotEnoughReserves: boolean;
    readonly isPoolAlreadyInitializedForPair: boolean;
    readonly isPoolNotInitialized: boolean;
    readonly isSlippageLimitExceeded: boolean;
    readonly isNothingToClaim: boolean;
    readonly isRewardsSupplyShortage: boolean;
    readonly isUnsupportedCollateralAssetId: boolean;
    readonly isFeeCalculationFailed: boolean;
    readonly isCantExchange: boolean;
    readonly isIncRefError: boolean;
    readonly isArithmeticError: boolean;
    readonly isFreeReservesAccountNotSet: boolean;
    readonly type: 'PriceCalculationFailed' | 'FailedToCalculatePriceWithoutImpact' | 'CannotExchangeWithSelf' | 'NotEnoughReserves' | 'PoolAlreadyInitializedForPair' | 'PoolNotInitialized' | 'SlippageLimitExceeded' | 'NothingToClaim' | 'RewardsSupplyShortage' | 'UnsupportedCollateralAssetId' | 'FeeCalculationFailed' | 'CantExchange' | 'IncRefError' | 'ArithmeticError' | 'FreeReservesAccountNotSet';
  }

  /** @name TechnicalError (698) */
  interface TechnicalError extends Enum {
    readonly isStorageOverflow: boolean;
    readonly isInsufficientBalance: boolean;
    readonly isAlreadyExist: boolean;
    readonly isInvalidProof: boolean;
    readonly isSourceMismatch: boolean;
    readonly isAlreadyClaimed: boolean;
    readonly isClaimActionMismatch: boolean;
    readonly isDurationNotPassed: boolean;
    readonly isOnlyRegularAsset: boolean;
    readonly isOnlyRegularAccount: boolean;
    readonly isOnlyRegularBalance: boolean;
    readonly isOnlyPureTechnicalAccount: boolean;
    readonly isOverflow: boolean;
    readonly isTechAccountIdMustBePure: boolean;
    readonly isUnableToGetReprFromTechAccountId: boolean;
    readonly isRepresentativeMustBeSupported: boolean;
    readonly isTechAccountIdIsNotRegistered: boolean;
    readonly isNotImplemented: boolean;
    readonly isDecodeAccountIdFailed: boolean;
    readonly isAssociatedAccountIdNotFound: boolean;
    readonly isOperationWithAbstractCheckingIsImposible: boolean;
    readonly type: 'StorageOverflow' | 'InsufficientBalance' | 'AlreadyExist' | 'InvalidProof' | 'SourceMismatch' | 'AlreadyClaimed' | 'ClaimActionMismatch' | 'DurationNotPassed' | 'OnlyRegularAsset' | 'OnlyRegularAccount' | 'OnlyRegularBalance' | 'OnlyPureTechnicalAccount' | 'Overflow' | 'TechAccountIdMustBePure' | 'UnableToGetReprFromTechAccountId' | 'RepresentativeMustBeSupported' | 'TechAccountIdIsNotRegistered' | 'NotImplemented' | 'DecodeAccountIdFailed' | 'AssociatedAccountIdNotFound' | 'OperationWithAbstractCheckingIsImposible';
  }

  /** @name PoolXykError (701) */
  interface PoolXykError extends Enum {
    readonly isUnableToCalculateFee: boolean;
    readonly isFailedToCalculatePriceWithoutImpact: boolean;
    readonly isUnableToGetBalance: boolean;
    readonly isImpossibleToDecideAssetPairAmounts: boolean;
    readonly isPoolPairRatioAndPairSwapRatioIsDifferent: boolean;
    readonly isPairSwapActionFeeIsSmallerThanRecommended: boolean;
    readonly isSourceBalanceIsNotLargeEnough: boolean;
    readonly isTargetBalanceIsNotLargeEnough: boolean;
    readonly isUnableToDeriveFeeAccount: boolean;
    readonly isFeeAccountIsInvalid: boolean;
    readonly isSourceAndClientAccountDoNotMatchAsEqual: boolean;
    readonly isAssetsMustNotBeSame: boolean;
    readonly isImpossibleToDecideDepositLiquidityAmounts: boolean;
    readonly isInvalidDepositLiquidityBasicAssetAmount: boolean;
    readonly isInvalidDepositLiquidityTargetAssetAmount: boolean;
    readonly isPairSwapActionMinimumLiquidityIsSmallerThanRecommended: boolean;
    readonly isDestinationAmountOfLiquidityIsNotLargeEnough: boolean;
    readonly isSourceBaseAmountIsNotLargeEnough: boolean;
    readonly isTargetBaseAmountIsNotLargeEnough: boolean;
    readonly isPoolIsInvalid: boolean;
    readonly isPoolIsEmpty: boolean;
    readonly isZeroValueInAmountParameter: boolean;
    readonly isAccountBalanceIsInvalid: boolean;
    readonly isInvalidDepositLiquidityDestinationAmount: boolean;
    readonly isInitialLiqudityDepositRatioMustBeDefined: boolean;
    readonly isTechAssetIsNotRepresentable: boolean;
    readonly isUnableToDecideMarkerAsset: boolean;
    readonly isUnableToGetAssetRepr: boolean;
    readonly isImpossibleToDecideWithdrawLiquidityAmounts: boolean;
    readonly isInvalidWithdrawLiquidityBasicAssetAmount: boolean;
    readonly isInvalidWithdrawLiquidityTargetAssetAmount: boolean;
    readonly isSourceBaseAmountIsTooLarge: boolean;
    readonly isSourceBalanceOfLiquidityTokensIsNotLargeEnough: boolean;
    readonly isDestinationBaseBalanceIsNotLargeEnough: boolean;
    readonly isDestinationTargetBalanceIsNotLargeEnough: boolean;
    readonly isInvalidAssetForLiquidityMarking: boolean;
    readonly isAssetDecodingError: boolean;
    readonly isCalculatedValueIsOutOfDesiredBounds: boolean;
    readonly isBaseAssetIsNotMatchedWithAnyAssetArguments: boolean;
    readonly isDestinationAmountMustBeSame: boolean;
    readonly isSourceAmountMustBeSame: boolean;
    readonly isPoolInitializationIsInvalid: boolean;
    readonly isPoolIsAlreadyInitialized: boolean;
    readonly isInvalidMinimumBoundValueOfBalance: boolean;
    readonly isImpossibleToDecideValidPairValuesFromRangeForThisPool: boolean;
    readonly isRangeValuesIsInvalid: boolean;
    readonly isCalculatedValueIsNotMeetsRequiredBoundaries: boolean;
    readonly isGettingFeeFromDestinationIsImpossible: boolean;
    readonly isFixedWrapperCalculationFailed: boolean;
    readonly isThisCaseIsNotSupported: boolean;
    readonly isPoolBecameInvalidAfterOperation: boolean;
    readonly isUnableToConvertAssetToTechAssetId: boolean;
    readonly isUnableToGetXORPartFromMarkerAsset: boolean;
    readonly isPoolTokenSupplyOverflow: boolean;
    readonly isIncRefError: boolean;
    readonly isUnableToDepositXorLessThanMinimum: boolean;
    readonly isUnsupportedQuotePath: boolean;
    readonly isNotEnoughUnlockedLiquidity: boolean;
    readonly isUnableToCreatePoolWithIndivisibleAssets: boolean;
    readonly isUnableToOperateWithIndivisibleAssets: boolean;
    readonly isNotEnoughLiquidityOutOfFarming: boolean;
    readonly isTargetAssetIsRestricted: boolean;
    readonly type: 'UnableToCalculateFee' | 'FailedToCalculatePriceWithoutImpact' | 'UnableToGetBalance' | 'ImpossibleToDecideAssetPairAmounts' | 'PoolPairRatioAndPairSwapRatioIsDifferent' | 'PairSwapActionFeeIsSmallerThanRecommended' | 'SourceBalanceIsNotLargeEnough' | 'TargetBalanceIsNotLargeEnough' | 'UnableToDeriveFeeAccount' | 'FeeAccountIsInvalid' | 'SourceAndClientAccountDoNotMatchAsEqual' | 'AssetsMustNotBeSame' | 'ImpossibleToDecideDepositLiquidityAmounts' | 'InvalidDepositLiquidityBasicAssetAmount' | 'InvalidDepositLiquidityTargetAssetAmount' | 'PairSwapActionMinimumLiquidityIsSmallerThanRecommended' | 'DestinationAmountOfLiquidityIsNotLargeEnough' | 'SourceBaseAmountIsNotLargeEnough' | 'TargetBaseAmountIsNotLargeEnough' | 'PoolIsInvalid' | 'PoolIsEmpty' | 'ZeroValueInAmountParameter' | 'AccountBalanceIsInvalid' | 'InvalidDepositLiquidityDestinationAmount' | 'InitialLiqudityDepositRatioMustBeDefined' | 'TechAssetIsNotRepresentable' | 'UnableToDecideMarkerAsset' | 'UnableToGetAssetRepr' | 'ImpossibleToDecideWithdrawLiquidityAmounts' | 'InvalidWithdrawLiquidityBasicAssetAmount' | 'InvalidWithdrawLiquidityTargetAssetAmount' | 'SourceBaseAmountIsTooLarge' | 'SourceBalanceOfLiquidityTokensIsNotLargeEnough' | 'DestinationBaseBalanceIsNotLargeEnough' | 'DestinationTargetBalanceIsNotLargeEnough' | 'InvalidAssetForLiquidityMarking' | 'AssetDecodingError' | 'CalculatedValueIsOutOfDesiredBounds' | 'BaseAssetIsNotMatchedWithAnyAssetArguments' | 'DestinationAmountMustBeSame' | 'SourceAmountMustBeSame' | 'PoolInitializationIsInvalid' | 'PoolIsAlreadyInitialized' | 'InvalidMinimumBoundValueOfBalance' | 'ImpossibleToDecideValidPairValuesFromRangeForThisPool' | 'RangeValuesIsInvalid' | 'CalculatedValueIsNotMeetsRequiredBoundaries' | 'GettingFeeFromDestinationIsImpossible' | 'FixedWrapperCalculationFailed' | 'ThisCaseIsNotSupported' | 'PoolBecameInvalidAfterOperation' | 'UnableToConvertAssetToTechAssetId' | 'UnableToGetXORPartFromMarkerAsset' | 'PoolTokenSupplyOverflow' | 'IncRefError' | 'UnableToDepositXorLessThanMinimum' | 'UnsupportedQuotePath' | 'NotEnoughUnlockedLiquidity' | 'UnableToCreatePoolWithIndivisibleAssets' | 'UnableToOperateWithIndivisibleAssets' | 'NotEnoughLiquidityOutOfFarming' | 'TargetAssetIsRestricted';
  }

  /** @name LiquidityProxyError (702) */
  interface LiquidityProxyError extends Enum {
    readonly isUnavailableExchangePath: boolean;
    readonly isMaxFeeExceeded: boolean;
    readonly isInvalidFeeValue: boolean;
    readonly isInsufficientLiquidity: boolean;
    readonly isAggregationError: boolean;
    readonly isCalculationError: boolean;
    readonly isSlippageNotTolerated: boolean;
    readonly isForbiddenFilter: boolean;
    readonly isFailedToCalculatePriceWithoutImpact: boolean;
    readonly isUnableToSwapIndivisibleAssets: boolean;
    readonly isUnableToEnableLiquiditySource: boolean;
    readonly isLiquiditySourceAlreadyEnabled: boolean;
    readonly isUnableToDisableLiquiditySource: boolean;
    readonly isLiquiditySourceAlreadyDisabled: boolean;
    readonly isInvalidReceiversInfo: boolean;
    readonly isFailedToTransferAdarCommission: boolean;
    readonly isInvalidADARCommissionRatio: boolean;
    readonly isInsufficientBalance: boolean;
    readonly isTheSameSenderAndReceiver: boolean;
    readonly type: 'UnavailableExchangePath' | 'MaxFeeExceeded' | 'InvalidFeeValue' | 'InsufficientLiquidity' | 'AggregationError' | 'CalculationError' | 'SlippageNotTolerated' | 'ForbiddenFilter' | 'FailedToCalculatePriceWithoutImpact' | 'UnableToSwapIndivisibleAssets' | 'UnableToEnableLiquiditySource' | 'LiquiditySourceAlreadyEnabled' | 'UnableToDisableLiquiditySource' | 'LiquiditySourceAlreadyDisabled' | 'InvalidReceiversInfo' | 'FailedToTransferAdarCommission' | 'InvalidADARCommissionRatio' | 'InsufficientBalance' | 'TheSameSenderAndReceiver';
  }

  /** @name PalletCollectiveVotes (704) */
  interface PalletCollectiveVotes extends Struct {
    readonly index: u32;
    readonly threshold: u32;
    readonly ayes: Vec<AccountId32>;
    readonly nays: Vec<AccountId32>;
    readonly end: u32;
  }

  /** @name PalletCollectiveError (705) */
  interface PalletCollectiveError extends Enum {
    readonly isNotMember: boolean;
    readonly isDuplicateProposal: boolean;
    readonly isProposalMissing: boolean;
    readonly isWrongIndex: boolean;
    readonly isDuplicateVote: boolean;
    readonly isAlreadyInitialized: boolean;
    readonly isTooEarly: boolean;
    readonly isTooManyProposals: boolean;
    readonly isWrongProposalWeight: boolean;
    readonly isWrongProposalLength: boolean;
    readonly type: 'NotMember' | 'DuplicateProposal' | 'ProposalMissing' | 'WrongIndex' | 'DuplicateVote' | 'AlreadyInitialized' | 'TooEarly' | 'TooManyProposals' | 'WrongProposalWeight' | 'WrongProposalLength';
  }

  /** @name PalletDemocracyReferendumInfo (713) */
  interface PalletDemocracyReferendumInfo extends Enum {
    readonly isOngoing: boolean;
    readonly asOngoing: PalletDemocracyReferendumStatus;
    readonly isFinished: boolean;
    readonly asFinished: {
      readonly approved: bool;
      readonly end: u32;
    } & Struct;
    readonly type: 'Ongoing' | 'Finished';
  }

  /** @name PalletDemocracyReferendumStatus (714) */
  interface PalletDemocracyReferendumStatus extends Struct {
    readonly end: u32;
    readonly proposal: FrameSupportPreimagesBounded;
    readonly threshold: PalletDemocracyVoteThreshold;
    readonly delay: u32;
    readonly tally: PalletDemocracyTally;
  }

  /** @name PalletDemocracyTally (715) */
  interface PalletDemocracyTally extends Struct {
    readonly ayes: u128;
    readonly nays: u128;
    readonly turnout: u128;
  }

  /** @name PalletDemocracyVoteVoting (716) */
  interface PalletDemocracyVoteVoting extends Enum {
    readonly isDirect: boolean;
    readonly asDirect: {
      readonly votes: Vec<ITuple<[u32, PalletDemocracyVoteAccountVote]>>;
      readonly delegations: PalletDemocracyDelegations;
      readonly prior: PalletDemocracyVotePriorLock;
    } & Struct;
    readonly isDelegating: boolean;
    readonly asDelegating: {
      readonly balance: u128;
      readonly target: AccountId32;
      readonly conviction: PalletDemocracyConviction;
      readonly delegations: PalletDemocracyDelegations;
      readonly prior: PalletDemocracyVotePriorLock;
    } & Struct;
    readonly type: 'Direct' | 'Delegating';
  }

  /** @name PalletDemocracyDelegations (720) */
  interface PalletDemocracyDelegations extends Struct {
    readonly votes: u128;
    readonly capital: u128;
  }

  /** @name PalletDemocracyVotePriorLock (721) */
  interface PalletDemocracyVotePriorLock extends ITuple<[u32, u128]> {}

  /** @name PalletDemocracyError (725) */
  interface PalletDemocracyError extends Enum {
    readonly isValueLow: boolean;
    readonly isProposalMissing: boolean;
    readonly isAlreadyCanceled: boolean;
    readonly isDuplicateProposal: boolean;
    readonly isProposalBlacklisted: boolean;
    readonly isNotSimpleMajority: boolean;
    readonly isInvalidHash: boolean;
    readonly isNoProposal: boolean;
    readonly isAlreadyVetoed: boolean;
    readonly isReferendumInvalid: boolean;
    readonly isNoneWaiting: boolean;
    readonly isNotVoter: boolean;
    readonly isNoPermission: boolean;
    readonly isAlreadyDelegating: boolean;
    readonly isInsufficientFunds: boolean;
    readonly isNotDelegating: boolean;
    readonly isVotesExist: boolean;
    readonly isInstantNotAllowed: boolean;
    readonly isNonsense: boolean;
    readonly isWrongUpperBound: boolean;
    readonly isMaxVotesReached: boolean;
    readonly isTooMany: boolean;
    readonly isVotingPeriodLow: boolean;
    readonly type: 'ValueLow' | 'ProposalMissing' | 'AlreadyCanceled' | 'DuplicateProposal' | 'ProposalBlacklisted' | 'NotSimpleMajority' | 'InvalidHash' | 'NoProposal' | 'AlreadyVetoed' | 'ReferendumInvalid' | 'NoneWaiting' | 'NotVoter' | 'NoPermission' | 'AlreadyDelegating' | 'InsufficientFunds' | 'NotDelegating' | 'VotesExist' | 'InstantNotAllowed' | 'Nonsense' | 'WrongUpperBound' | 'MaxVotesReached' | 'TooMany' | 'VotingPeriodLow';
  }

  /** @name DexApiError (726) */
  interface DexApiError extends Enum {
    readonly isLiquiditySourceAlreadyEnabled: boolean;
    readonly isLiquiditySourceAlreadyDisabled: boolean;
    readonly type: 'LiquiditySourceAlreadyEnabled' | 'LiquiditySourceAlreadyDisabled';
  }

  /** @name EthBridgeRequestsOffchainRequest (727) */
  interface EthBridgeRequestsOffchainRequest extends Enum {
    readonly isOutgoing: boolean;
    readonly asOutgoing: ITuple<[EthBridgeRequestsOutgoingRequest, H256]>;
    readonly isLoadIncoming: boolean;
    readonly asLoadIncoming: EthBridgeRequestsLoadIncomingRequest;
    readonly isIncoming: boolean;
    readonly asIncoming: ITuple<[EthBridgeRequestsIncomingRequest, H256]>;
    readonly type: 'Outgoing' | 'LoadIncoming' | 'Incoming';
  }

  /** @name EthBridgeRequestsRequestStatus (728) */
  interface EthBridgeRequestsRequestStatus extends Enum {
    readonly isPending: boolean;
    readonly isFrozen: boolean;
    readonly isApprovalsReady: boolean;
    readonly isFailed: boolean;
    readonly asFailed: SpRuntimeDispatchError;
    readonly isDone: boolean;
    readonly isBroken: boolean;
    readonly asBroken: ITuple<[SpRuntimeDispatchError, SpRuntimeDispatchError]>;
    readonly type: 'Pending' | 'Frozen' | 'ApprovalsReady' | 'Failed' | 'Done' | 'Broken';
  }

  /** @name EthBridgeRequestsOutgoingEthPeersSync (735) */
  interface EthBridgeRequestsOutgoingEthPeersSync extends Struct {
    readonly isBridgeReady: bool;
    readonly isXorReady: bool;
    readonly isValReady: bool;
  }

  /** @name EthBridgeBridgeStatus (736) */
  interface EthBridgeBridgeStatus extends Enum {
    readonly isInitialized: boolean;
    readonly isMigrating: boolean;
    readonly type: 'Initialized' | 'Migrating';
  }

  /** @name EthBridgeError (737) */
  interface EthBridgeError extends Enum {
    readonly isHttpFetchingError: boolean;
    readonly isAccountNotFound: boolean;
    readonly isForbidden: boolean;
    readonly isRequestIsAlreadyRegistered: boolean;
    readonly isFailedToLoadTransaction: boolean;
    readonly isFailedToLoadPrecision: boolean;
    readonly isUnknownMethodId: boolean;
    readonly isInvalidFunctionInput: boolean;
    readonly isInvalidSignature: boolean;
    readonly isInvalidUint: boolean;
    readonly isInvalidAmount: boolean;
    readonly isInvalidBalance: boolean;
    readonly isInvalidString: boolean;
    readonly isInvalidByte: boolean;
    readonly isInvalidAddress: boolean;
    readonly isInvalidAssetId: boolean;
    readonly isInvalidAccountId: boolean;
    readonly isInvalidBool: boolean;
    readonly isInvalidH256: boolean;
    readonly isInvalidArray: boolean;
    readonly isUnknownEvent: boolean;
    readonly isUnknownTokenAddress: boolean;
    readonly isNoLocalAccountForSigning: boolean;
    readonly isUnsupportedAssetId: boolean;
    readonly isFailedToSignMessage: boolean;
    readonly isFailedToSendSignedTransaction: boolean;
    readonly isTokenIsNotOwnedByTheAuthor: boolean;
    readonly isTokenIsAlreadyAdded: boolean;
    readonly isDuplicatedRequest: boolean;
    readonly isUnsupportedToken: boolean;
    readonly isUnknownPeerAddress: boolean;
    readonly isEthAbiEncodingError: boolean;
    readonly isEthAbiDecodingError: boolean;
    readonly isEthTransactionIsFailed: boolean;
    readonly isEthTransactionIsSucceeded: boolean;
    readonly isEthTransactionIsPending: boolean;
    readonly isEthLogWasRemoved: boolean;
    readonly isNoPendingPeer: boolean;
    readonly isWrongPendingPeer: boolean;
    readonly isTooManyPendingPeers: boolean;
    readonly isFailedToGetAssetById: boolean;
    readonly isCantAddMorePeers: boolean;
    readonly isCantRemoveMorePeers: boolean;
    readonly isPeerIsAlreadyAdded: boolean;
    readonly isUnknownPeerId: boolean;
    readonly isCantReserveFunds: boolean;
    readonly isAlreadyClaimed: boolean;
    readonly isFailedToLoadBlockHeader: boolean;
    readonly isFailedToLoadFinalizedHead: boolean;
    readonly isUnknownContractAddress: boolean;
    readonly isInvalidContractInput: boolean;
    readonly isRequestIsNotOwnedByTheAuthor: boolean;
    readonly isFailedToParseTxHashInCall: boolean;
    readonly isRequestIsNotReady: boolean;
    readonly isUnknownRequest: boolean;
    readonly isRequestNotFinalizedOnSidechain: boolean;
    readonly isUnknownNetwork: boolean;
    readonly isContractIsInMigrationStage: boolean;
    readonly isContractIsNotInMigrationStage: boolean;
    readonly isContractIsAlreadyInMigrationStage: boolean;
    readonly isUnavailable: boolean;
    readonly isFailedToUnreserve: boolean;
    readonly isSidechainAssetIsAlreadyRegistered: boolean;
    readonly isExpectedOutgoingRequest: boolean;
    readonly isExpectedIncomingRequest: boolean;
    readonly isUnknownAssetId: boolean;
    readonly isJsonSerializationError: boolean;
    readonly isJsonDeserializationError: boolean;
    readonly isFailedToLoadSidechainNodeParams: boolean;
    readonly isFailedToLoadCurrentSidechainHeight: boolean;
    readonly isFailedToLoadIsUsed: boolean;
    readonly isTransactionMightHaveFailedDueToGasLimit: boolean;
    readonly isExpectedXORTransfer: boolean;
    readonly isUnableToPayFees: boolean;
    readonly isCancelled: boolean;
    readonly isUnsupportedAssetPrecision: boolean;
    readonly isNonZeroDust: boolean;
    readonly isIncRefError: boolean;
    readonly isOther: boolean;
    readonly isExpectedPendingRequest: boolean;
    readonly isExpectedEthNetwork: boolean;
    readonly isRemovedAndRefunded: boolean;
    readonly isAuthorityAccountNotSet: boolean;
    readonly isNotEnoughPeers: boolean;
    readonly isReadStorageError: boolean;
    readonly isUnsafeMigration: boolean;
    readonly type: 'HttpFetchingError' | 'AccountNotFound' | 'Forbidden' | 'RequestIsAlreadyRegistered' | 'FailedToLoadTransaction' | 'FailedToLoadPrecision' | 'UnknownMethodId' | 'InvalidFunctionInput' | 'InvalidSignature' | 'InvalidUint' | 'InvalidAmount' | 'InvalidBalance' | 'InvalidString' | 'InvalidByte' | 'InvalidAddress' | 'InvalidAssetId' | 'InvalidAccountId' | 'InvalidBool' | 'InvalidH256' | 'InvalidArray' | 'UnknownEvent' | 'UnknownTokenAddress' | 'NoLocalAccountForSigning' | 'UnsupportedAssetId' | 'FailedToSignMessage' | 'FailedToSendSignedTransaction' | 'TokenIsNotOwnedByTheAuthor' | 'TokenIsAlreadyAdded' | 'DuplicatedRequest' | 'UnsupportedToken' | 'UnknownPeerAddress' | 'EthAbiEncodingError' | 'EthAbiDecodingError' | 'EthTransactionIsFailed' | 'EthTransactionIsSucceeded' | 'EthTransactionIsPending' | 'EthLogWasRemoved' | 'NoPendingPeer' | 'WrongPendingPeer' | 'TooManyPendingPeers' | 'FailedToGetAssetById' | 'CantAddMorePeers' | 'CantRemoveMorePeers' | 'PeerIsAlreadyAdded' | 'UnknownPeerId' | 'CantReserveFunds' | 'AlreadyClaimed' | 'FailedToLoadBlockHeader' | 'FailedToLoadFinalizedHead' | 'UnknownContractAddress' | 'InvalidContractInput' | 'RequestIsNotOwnedByTheAuthor' | 'FailedToParseTxHashInCall' | 'RequestIsNotReady' | 'UnknownRequest' | 'RequestNotFinalizedOnSidechain' | 'UnknownNetwork' | 'ContractIsInMigrationStage' | 'ContractIsNotInMigrationStage' | 'ContractIsAlreadyInMigrationStage' | 'Unavailable' | 'FailedToUnreserve' | 'SidechainAssetIsAlreadyRegistered' | 'ExpectedOutgoingRequest' | 'ExpectedIncomingRequest' | 'UnknownAssetId' | 'JsonSerializationError' | 'JsonDeserializationError' | 'FailedToLoadSidechainNodeParams' | 'FailedToLoadCurrentSidechainHeight' | 'FailedToLoadIsUsed' | 'TransactionMightHaveFailedDueToGasLimit' | 'ExpectedXORTransfer' | 'UnableToPayFees' | 'Cancelled' | 'UnsupportedAssetPrecision' | 'NonZeroDust' | 'IncRefError' | 'Other' | 'ExpectedPendingRequest' | 'ExpectedEthNetwork' | 'RemovedAndRefunded' | 'AuthorityAccountNotSet' | 'NotEnoughPeers' | 'ReadStorageError' | 'UnsafeMigration';
  }

  /** @name PswapDistributionError (740) */
  interface PswapDistributionError extends Enum {
    readonly isCalculationError: boolean;
    readonly isSubscriptionActive: boolean;
    readonly isUnknownSubscription: boolean;
    readonly isInvalidFrequency: boolean;
    readonly isZeroClaimableIncentives: boolean;
    readonly isIncRefError: boolean;
    readonly type: 'CalculationError' | 'SubscriptionActive' | 'UnknownSubscription' | 'InvalidFrequency' | 'ZeroClaimableIncentives' | 'IncRefError';
  }

  /** @name PalletSchedulerScheduled (746) */
  interface PalletSchedulerScheduled extends Struct {
    readonly maybeId: Option<U8aFixed>;
    readonly priority: u8;
    readonly call: FrameSupportPreimagesBounded;
    readonly maybePeriodic: Option<ITuple<[u32, u32]>>;
    readonly origin: FramenodeRuntimeOriginCaller;
  }

  /** @name PalletSchedulerError (748) */
  interface PalletSchedulerError extends Enum {
    readonly isFailedToSchedule: boolean;
    readonly isNotFound: boolean;
    readonly isTargetBlockNumberInPast: boolean;
    readonly isRescheduleNoChange: boolean;
    readonly isNamed: boolean;
    readonly type: 'FailedToSchedule' | 'NotFound' | 'TargetBlockNumberInPast' | 'RescheduleNoChange' | 'Named';
  }

  /** @name IrohaMigrationPendingMultisigAccount (751) */
  interface IrohaMigrationPendingMultisigAccount extends Struct {
    readonly approvingAccounts: Vec<AccountId32>;
    readonly migrateAt: Option<u32>;
  }

  /** @name IrohaMigrationError (752) */
  interface IrohaMigrationError extends Enum {
    readonly isPublicKeyParsingFailed: boolean;
    readonly isSignatureParsingFailed: boolean;
    readonly isSignatureVerificationFailed: boolean;
    readonly isAccountNotFound: boolean;
    readonly isPublicKeyNotFound: boolean;
    readonly isPublicKeyAlreadyUsed: boolean;
    readonly isAccountAlreadyMigrated: boolean;
    readonly isReferralMigrationFailed: boolean;
    readonly isMultiSigCreationFailed: boolean;
    readonly isSignatoryAdditionFailed: boolean;
    readonly type: 'PublicKeyParsingFailed' | 'SignatureParsingFailed' | 'SignatureVerificationFailed' | 'AccountNotFound' | 'PublicKeyNotFound' | 'PublicKeyAlreadyUsed' | 'AccountAlreadyMigrated' | 'ReferralMigrationFailed' | 'MultiSigCreationFailed' | 'SignatoryAdditionFailed';
  }

  /** @name PalletMembershipError (754) */
  interface PalletMembershipError extends Enum {
    readonly isAlreadyMember: boolean;
    readonly isNotMember: boolean;
    readonly isTooManyMembers: boolean;
    readonly type: 'AlreadyMember' | 'NotMember' | 'TooManyMembers';
  }

  /** @name PalletElectionsPhragmenSeatHolder (756) */
  interface PalletElectionsPhragmenSeatHolder extends Struct {
    readonly who: AccountId32;
    readonly stake: u128;
    readonly deposit: u128;
  }

  /** @name PalletElectionsPhragmenVoter (757) */
  interface PalletElectionsPhragmenVoter extends Struct {
    readonly votes: Vec<AccountId32>;
    readonly stake: u128;
    readonly deposit: u128;
  }

  /** @name PalletElectionsPhragmenError (758) */
  interface PalletElectionsPhragmenError extends Enum {
    readonly isUnableToVote: boolean;
    readonly isNoVotes: boolean;
    readonly isTooManyVotes: boolean;
    readonly isMaximumVotesExceeded: boolean;
    readonly isLowBalance: boolean;
    readonly isUnableToPayBond: boolean;
    readonly isMustBeVoter: boolean;
    readonly isDuplicatedCandidate: boolean;
    readonly isTooManyCandidates: boolean;
    readonly isMemberSubmit: boolean;
    readonly isRunnerUpSubmit: boolean;
    readonly isInsufficientCandidateFunds: boolean;
    readonly isNotMember: boolean;
    readonly isInvalidWitnessData: boolean;
    readonly isInvalidVoteCount: boolean;
    readonly isInvalidRenouncing: boolean;
    readonly isInvalidReplacement: boolean;
    readonly type: 'UnableToVote' | 'NoVotes' | 'TooManyVotes' | 'MaximumVotesExceeded' | 'LowBalance' | 'UnableToPayBond' | 'MustBeVoter' | 'DuplicatedCandidate' | 'TooManyCandidates' | 'MemberSubmit' | 'RunnerUpSubmit' | 'InsufficientCandidateFunds' | 'NotMember' | 'InvalidWitnessData' | 'InvalidVoteCount' | 'InvalidRenouncing' | 'InvalidReplacement';
  }

  /** @name VestedRewardsRewardInfo (759) */
  interface VestedRewardsRewardInfo extends Struct {
    readonly limit: u128;
    readonly totalAvailable: u128;
    readonly rewards: BTreeMap<CommonPrimitivesRewardReason, u128>;
  }

  /** @name VestedRewardsCrowdloanInfo (760) */
  interface VestedRewardsCrowdloanInfo extends Struct {
    readonly totalContribution: u128;
    readonly rewards: Vec<ITuple<[CommonPrimitivesAssetId32, u128]>>;
    readonly startBlock: u32;
    readonly length: u32;
    readonly account: AccountId32;
  }

  /** @name VestedRewardsCrowdloanUserInfo (762) */
  interface VestedRewardsCrowdloanUserInfo extends Struct {
    readonly contribution: u128;
    readonly rewarded: Vec<ITuple<[CommonPrimitivesAssetId32, u128]>>;
  }

  /** @name VestedRewardsError (763) */
  interface VestedRewardsError extends Enum {
    readonly isNothingToClaim: boolean;
    readonly isClaimLimitExceeded: boolean;
    readonly isUnhandledRewardType: boolean;
    readonly isRewardsSupplyShortage: boolean;
    readonly isIncRefError: boolean;
    readonly isCantSubtractSnapshot: boolean;
    readonly isCantCalculateReward: boolean;
    readonly isNoRewardsForAsset: boolean;
    readonly isArithmeticError: boolean;
    readonly isNumberConversionError: boolean;
    readonly isUnableToGetBaseAssetPrice: boolean;
    readonly isCrowdloanAlreadyExists: boolean;
    readonly isWrongCrowdloanInfo: boolean;
    readonly isCrowdloanRewardsDistributionNotStarted: boolean;
    readonly isCrowdloanDoesNotExists: boolean;
    readonly isNotCrowdloanParticipant: boolean;
    readonly type: 'NothingToClaim' | 'ClaimLimitExceeded' | 'UnhandledRewardType' | 'RewardsSupplyShortage' | 'IncRefError' | 'CantSubtractSnapshot' | 'CantCalculateReward' | 'NoRewardsForAsset' | 'ArithmeticError' | 'NumberConversionError' | 'UnableToGetBaseAssetPrice' | 'CrowdloanAlreadyExists' | 'WrongCrowdloanInfo' | 'CrowdloanRewardsDistributionNotStarted' | 'CrowdloanDoesNotExists' | 'NotCrowdloanParticipant';
  }

  /** @name PalletIdentityRegistration (764) */
  interface PalletIdentityRegistration extends Struct {
    readonly judgements: Vec<ITuple<[u32, PalletIdentityJudgement]>>;
    readonly deposit: u128;
    readonly info: PalletIdentityIdentityInfo;
  }

  /** @name PalletIdentityRegistrarInfo (772) */
  interface PalletIdentityRegistrarInfo extends Struct {
    readonly account: AccountId32;
    readonly fee: u128;
    readonly fields: PalletIdentityBitFlags;
  }

  /** @name PalletIdentityError (774) */
  interface PalletIdentityError extends Enum {
    readonly isTooManySubAccounts: boolean;
    readonly isNotFound: boolean;
    readonly isNotNamed: boolean;
    readonly isEmptyIndex: boolean;
    readonly isFeeChanged: boolean;
    readonly isNoIdentity: boolean;
    readonly isStickyJudgement: boolean;
    readonly isJudgementGiven: boolean;
    readonly isInvalidJudgement: boolean;
    readonly isInvalidIndex: boolean;
    readonly isInvalidTarget: boolean;
    readonly isTooManyFields: boolean;
    readonly isTooManyRegistrars: boolean;
    readonly isAlreadyClaimed: boolean;
    readonly isNotSub: boolean;
    readonly isNotOwned: boolean;
    readonly isJudgementForDifferentIdentity: boolean;
    readonly isJudgementPaymentFailed: boolean;
    readonly type: 'TooManySubAccounts' | 'NotFound' | 'NotNamed' | 'EmptyIndex' | 'FeeChanged' | 'NoIdentity' | 'StickyJudgement' | 'JudgementGiven' | 'InvalidJudgement' | 'InvalidIndex' | 'InvalidTarget' | 'TooManyFields' | 'TooManyRegistrars' | 'AlreadyClaimed' | 'NotSub' | 'NotOwned' | 'JudgementForDifferentIdentity' | 'JudgementPaymentFailed';
  }

  /** @name FarmingPoolFarmer (776) */
  interface FarmingPoolFarmer extends Struct {
    readonly account: AccountId32;
    readonly block: u32;
    readonly weight: u128;
  }

  /** @name FarmingError (777) */
  interface FarmingError extends Enum {
    readonly isIncRefError: boolean;
    readonly type: 'IncRefError';
  }

  /** @name XstSyntheticInfo (778) */
  interface XstSyntheticInfo extends Struct {
    readonly referenceSymbol: Bytes;
    readonly feeRatio: FixnumFixedPoint;
  }

  /** @name XstError (779) */
  interface XstError extends Enum {
    readonly isPriceCalculationFailed: boolean;
    readonly isSlippageLimitExceeded: boolean;
    readonly isCantExchange: boolean;
    readonly isSyntheticDoesNotExist: boolean;
    readonly isSymbolDoesNotExist: boolean;
    readonly isSymbolAlreadyReferencedToSynthetic: boolean;
    readonly isSyntheticIsNotEnabled: boolean;
    readonly isOracleQuoteError: boolean;
    readonly isInvalidFeeRatio: boolean;
    readonly isIndivisibleReferenceAsset: boolean;
    readonly isCantEnableIndivisibleAsset: boolean;
    readonly isSyntheticBaseBuySellLimitExceeded: boolean;
    readonly type: 'PriceCalculationFailed' | 'SlippageLimitExceeded' | 'CantExchange' | 'SyntheticDoesNotExist' | 'SymbolDoesNotExist' | 'SymbolAlreadyReferencedToSynthetic' | 'SyntheticIsNotEnabled' | 'OracleQuoteError' | 'InvalidFeeRatio' | 'IndivisibleReferenceAsset' | 'CantEnableIndivisibleAsset' | 'SyntheticBaseBuySellLimitExceeded';
  }

  /** @name PriceToolsAggregatedPriceInfo (780) */
  interface PriceToolsAggregatedPriceInfo extends Struct {
    readonly buy: PriceToolsPriceInfo;
    readonly sell: PriceToolsPriceInfo;
  }

  /** @name PriceToolsPriceInfo (781) */
  interface PriceToolsPriceInfo extends Struct {
    readonly priceFailures: u32;
    readonly spotPrices: Vec<u128>;
    readonly averagePrice: u128;
    readonly needsUpdate: bool;
    readonly lastSpotPrice: u128;
  }

  /** @name PriceToolsError (782) */
  interface PriceToolsError extends Enum {
    readonly isAveragePriceCalculationFailed: boolean;
    readonly isUpdateAverageWithSpotPriceFailed: boolean;
    readonly isInsufficientSpotPriceData: boolean;
    readonly isUnsupportedQuotePath: boolean;
    readonly isFailedToQuoteAveragePrice: boolean;
    readonly isAssetAlreadyRegistered: boolean;
    readonly isCantDuplicateLastPrice: boolean;
    readonly type: 'AveragePriceCalculationFailed' | 'UpdateAverageWithSpotPriceFailed' | 'InsufficientSpotPriceData' | 'UnsupportedQuotePath' | 'FailedToQuoteAveragePrice' | 'AssetAlreadyRegistered' | 'CantDuplicateLastPrice';
  }

  /** @name CeresStakingStakingInfo (783) */
  interface CeresStakingStakingInfo extends Struct {
    readonly deposited: u128;
    readonly rewards: u128;
  }

  /** @name CeresStakingError (784) */
  interface CeresStakingError extends Enum {
    readonly isStakingPoolIsFull: boolean;
    readonly isUnauthorized: boolean;
    readonly type: 'StakingPoolIsFull' | 'Unauthorized';
  }

  /** @name CeresLiquidityLockerStorageVersion (785) */
  interface CeresLiquidityLockerStorageVersion extends Enum {
    readonly isV1: boolean;
    readonly isV2: boolean;
    readonly type: 'V1' | 'V2';
  }

  /** @name CeresLiquidityLockerLockInfo (787) */
  interface CeresLiquidityLockerLockInfo extends Struct {
    readonly poolTokens: u128;
    readonly unlockingTimestamp: u64;
    readonly assetA: CommonPrimitivesAssetId32;
    readonly assetB: CommonPrimitivesAssetId32;
  }

  /** @name CeresLiquidityLockerError (788) */
  interface CeresLiquidityLockerError extends Enum {
    readonly isPoolDoesNotExist: boolean;
    readonly isInsufficientLiquidityToLock: boolean;
    readonly isInvalidPercentage: boolean;
    readonly isUnauthorized: boolean;
    readonly isInvalidUnlockingTimestamp: boolean;
    readonly type: 'PoolDoesNotExist' | 'InsufficientLiquidityToLock' | 'InvalidPercentage' | 'Unauthorized' | 'InvalidUnlockingTimestamp';
  }

  /** @name CeresTokenLockerStorageVersion (789) */
  interface CeresTokenLockerStorageVersion extends Enum {
    readonly isV1: boolean;
    readonly isV2: boolean;
    readonly type: 'V1' | 'V2';
  }

  /** @name CeresTokenLockerTokenLockInfo (791) */
  interface CeresTokenLockerTokenLockInfo extends Struct {
    readonly tokens: u128;
    readonly unlockingTimestamp: u64;
    readonly assetId: CommonPrimitivesAssetId32;
  }

  /** @name CeresTokenLockerError (792) */
  interface CeresTokenLockerError extends Enum {
    readonly isInvalidNumberOfTokens: boolean;
    readonly isUnauthorized: boolean;
    readonly isInvalidUnlockingTimestamp: boolean;
    readonly isNotEnoughFunds: boolean;
    readonly isNotUnlockedYet: boolean;
    readonly isLockInfoDoesNotExist: boolean;
    readonly type: 'InvalidNumberOfTokens' | 'Unauthorized' | 'InvalidUnlockingTimestamp' | 'NotEnoughFunds' | 'NotUnlockedYet' | 'LockInfoDoesNotExist';
  }

  /** @name CeresGovernancePlatformVotingInfo (794) */
  interface CeresGovernancePlatformVotingInfo extends Struct {
    readonly votingOption: u32;
    readonly numberOfVotes: u128;
    readonly assetWithdrawn: bool;
  }

  /** @name CeresGovernancePlatformPollInfo (795) */
  interface CeresGovernancePlatformPollInfo extends Struct {
    readonly pollAsset: CommonPrimitivesAssetId32;
    readonly pollStartTimestamp: u64;
    readonly pollEndTimestamp: u64;
    readonly title: Bytes;
    readonly description: Bytes;
    readonly options: Vec<Bytes>;
  }

  /** @name CeresGovernancePlatformStorageVersion (796) */
  interface CeresGovernancePlatformStorageVersion extends Enum {
    readonly isV1: boolean;
    readonly isV2: boolean;
    readonly isV3: boolean;
    readonly type: 'V1' | 'V2' | 'V3';
  }

  /** @name CeresGovernancePlatformError (797) */
  interface CeresGovernancePlatformError extends Enum {
    readonly isPollIsFinished: boolean;
    readonly isPollIsNotStarted: boolean;
    readonly isNotEnoughFunds: boolean;
    readonly isVoteDenied: boolean;
    readonly isInvalidStartTimestamp: boolean;
    readonly isInvalidEndTimestamp: boolean;
    readonly isPollIsNotFinished: boolean;
    readonly isInvalidNumberOfVotes: boolean;
    readonly isFundsAlreadyWithdrawn: boolean;
    readonly isInvalidVotingOptions: boolean;
    readonly isTooManyVotingOptions: boolean;
    readonly isDuplicateOptions: boolean;
    readonly isPollDoesNotExist: boolean;
    readonly isInvalidOption: boolean;
    readonly isNotVoted: boolean;
    readonly isUnauthorized: boolean;
    readonly type: 'PollIsFinished' | 'PollIsNotStarted' | 'NotEnoughFunds' | 'VoteDenied' | 'InvalidStartTimestamp' | 'InvalidEndTimestamp' | 'PollIsNotFinished' | 'InvalidNumberOfVotes' | 'FundsAlreadyWithdrawn' | 'InvalidVotingOptions' | 'TooManyVotingOptions' | 'DuplicateOptions' | 'PollDoesNotExist' | 'InvalidOption' | 'NotVoted' | 'Unauthorized';
  }

  /** @name CeresLaunchpadIloInfo (798) */
  interface CeresLaunchpadIloInfo extends Struct {
    readonly iloOrganizer: AccountId32;
    readonly tokensForIlo: u128;
    readonly tokensForLiquidity: u128;
    readonly iloPrice: u128;
    readonly softCap: u128;
    readonly hardCap: u128;
    readonly minContribution: u128;
    readonly maxContribution: u128;
    readonly refundType: bool;
    readonly liquidityPercent: u128;
    readonly listingPrice: u128;
    readonly lockupDays: u32;
    readonly startTimestamp: u64;
    readonly endTimestamp: u64;
    readonly contributorsVesting: CeresLaunchpadContributorsVesting;
    readonly teamVesting: CeresLaunchpadTeamVesting;
    readonly soldTokens: u128;
    readonly fundsRaised: u128;
    readonly succeeded: bool;
    readonly failed: bool;
    readonly lpTokens: u128;
    readonly claimedLpTokens: bool;
    readonly finishTimestamp: u64;
    readonly baseAsset: CommonPrimitivesAssetId32;
  }

  /** @name CeresLaunchpadContributorsVesting (799) */
  interface CeresLaunchpadContributorsVesting extends Struct {
    readonly firstReleasePercent: u128;
    readonly vestingPeriod: u64;
    readonly vestingPercent: u128;
  }

  /** @name CeresLaunchpadTeamVesting (800) */
  interface CeresLaunchpadTeamVesting extends Struct {
    readonly teamVestingTotalTokens: u128;
    readonly teamVestingFirstReleasePercent: u128;
    readonly teamVestingPeriod: u64;
    readonly teamVestingPercent: u128;
  }

  /** @name CeresLaunchpadContributionInfo (802) */
  interface CeresLaunchpadContributionInfo extends Struct {
    readonly fundsContributed: u128;
    readonly tokensBought: u128;
    readonly tokensClaimed: u128;
    readonly claimingFinished: bool;
    readonly numberOfClaims: u32;
  }

  /** @name CeresLaunchpadError (803) */
  interface CeresLaunchpadError extends Enum {
    readonly isIloAlreadyExists: boolean;
    readonly isParameterCantBeZero: boolean;
    readonly isInvalidSoftCap: boolean;
    readonly isInvalidMinimumContribution: boolean;
    readonly isInvalidMaximumContribution: boolean;
    readonly isInvalidLiquidityPercent: boolean;
    readonly isInvalidLockupDays: boolean;
    readonly isInvalidStartTimestamp: boolean;
    readonly isInvalidEndTimestamp: boolean;
    readonly isInvalidPrice: boolean;
    readonly isInvalidNumberOfTokensForLiquidity: boolean;
    readonly isInvalidNumberOfTokensForILO: boolean;
    readonly isInvalidFirstReleasePercent: boolean;
    readonly isInvalidVestingPercent: boolean;
    readonly isInvalidVestingPeriod: boolean;
    readonly isNotEnoughCeres: boolean;
    readonly isNotEnoughTokens: boolean;
    readonly isIloNotStarted: boolean;
    readonly isIloIsFinished: boolean;
    readonly isCantContributeInILO: boolean;
    readonly isHardCapIsHit: boolean;
    readonly isNotEnoughTokensToBuy: boolean;
    readonly isContributionIsLowerThenMin: boolean;
    readonly isContributionIsBiggerThenMax: boolean;
    readonly isNotEnoughFunds: boolean;
    readonly isIloDoesNotExist: boolean;
    readonly isIloIsNotFinished: boolean;
    readonly isPoolDoesNotExist: boolean;
    readonly isUnauthorized: boolean;
    readonly isCantClaimLPTokens: boolean;
    readonly isFundsAlreadyClaimed: boolean;
    readonly isNothingToClaim: boolean;
    readonly isIloIsFailed: boolean;
    readonly isIloIsSucceeded: boolean;
    readonly isCantCreateILOForListedToken: boolean;
    readonly isAccountIsNotWhitelisted: boolean;
    readonly isInvalidTeamFirstReleasePercent: boolean;
    readonly isInvalidTeamVestingPercent: boolean;
    readonly isInvalidTeamVestingPeriod: boolean;
    readonly isNotEnoughTeamTokensToLock: boolean;
    readonly isInvalidFeePercent: boolean;
    readonly isBaseAssetNotSupported: boolean;
    readonly type: 'IloAlreadyExists' | 'ParameterCantBeZero' | 'InvalidSoftCap' | 'InvalidMinimumContribution' | 'InvalidMaximumContribution' | 'InvalidLiquidityPercent' | 'InvalidLockupDays' | 'InvalidStartTimestamp' | 'InvalidEndTimestamp' | 'InvalidPrice' | 'InvalidNumberOfTokensForLiquidity' | 'InvalidNumberOfTokensForILO' | 'InvalidFirstReleasePercent' | 'InvalidVestingPercent' | 'InvalidVestingPeriod' | 'NotEnoughCeres' | 'NotEnoughTokens' | 'IloNotStarted' | 'IloIsFinished' | 'CantContributeInILO' | 'HardCapIsHit' | 'NotEnoughTokensToBuy' | 'ContributionIsLowerThenMin' | 'ContributionIsBiggerThenMax' | 'NotEnoughFunds' | 'IloDoesNotExist' | 'IloIsNotFinished' | 'PoolDoesNotExist' | 'Unauthorized' | 'CantClaimLPTokens' | 'FundsAlreadyClaimed' | 'NothingToClaim' | 'IloIsFailed' | 'IloIsSucceeded' | 'CantCreateILOForListedToken' | 'AccountIsNotWhitelisted' | 'InvalidTeamFirstReleasePercent' | 'InvalidTeamVestingPercent' | 'InvalidTeamVestingPeriod' | 'NotEnoughTeamTokensToLock' | 'InvalidFeePercent' | 'BaseAssetNotSupported';
  }

  /** @name DemeterFarmingPlatformTokenInfo (804) */
  interface DemeterFarmingPlatformTokenInfo extends Struct {
    readonly farmsTotalMultiplier: u32;
    readonly stakingTotalMultiplier: u32;
    readonly tokenPerBlock: u128;
    readonly farmsAllocation: u128;
    readonly stakingAllocation: u128;
    readonly teamAllocation: u128;
    readonly teamAccount: AccountId32;
  }

  /** @name DemeterFarmingPlatformUserInfo (806) */
  interface DemeterFarmingPlatformUserInfo extends Struct {
    readonly baseAsset: CommonPrimitivesAssetId32;
    readonly poolAsset: CommonPrimitivesAssetId32;
    readonly rewardAsset: CommonPrimitivesAssetId32;
    readonly isFarm: bool;
    readonly pooledTokens: u128;
    readonly rewards: u128;
  }

  /** @name DemeterFarmingPlatformPoolData (808) */
  interface DemeterFarmingPlatformPoolData extends Struct {
    readonly multiplier: u32;
    readonly depositFee: u128;
    readonly isCore: bool;
    readonly isFarm: bool;
    readonly totalTokensInPool: u128;
    readonly rewards: u128;
    readonly rewardsToBeDistributed: u128;
    readonly isRemoved: bool;
    readonly baseAsset: CommonPrimitivesAssetId32;
  }

  /** @name DemeterFarmingPlatformStorageVersion (809) */
  interface DemeterFarmingPlatformStorageVersion extends Enum {
    readonly isV1: boolean;
    readonly isV2: boolean;
    readonly type: 'V1' | 'V2';
  }

  /** @name DemeterFarmingPlatformError (810) */
  interface DemeterFarmingPlatformError extends Enum {
    readonly isTokenAlreadyRegistered: boolean;
    readonly isTokenPerBlockCantBeZero: boolean;
    readonly isInvalidAllocationParameters: boolean;
    readonly isInvalidMultiplier: boolean;
    readonly isInvalidDepositFee: boolean;
    readonly isRewardTokenIsNotRegistered: boolean;
    readonly isPoolAlreadyExists: boolean;
    readonly isInsufficientFunds: boolean;
    readonly isZeroRewards: boolean;
    readonly isPoolDoesNotExist: boolean;
    readonly isInsufficientLPTokens: boolean;
    readonly isPoolDoesNotHaveRewards: boolean;
    readonly isUnauthorized: boolean;
    readonly type: 'TokenAlreadyRegistered' | 'TokenPerBlockCantBeZero' | 'InvalidAllocationParameters' | 'InvalidMultiplier' | 'InvalidDepositFee' | 'RewardTokenIsNotRegistered' | 'PoolAlreadyExists' | 'InsufficientFunds' | 'ZeroRewards' | 'PoolDoesNotExist' | 'InsufficientLPTokens' | 'PoolDoesNotHaveRewards' | 'Unauthorized';
  }

  /** @name PalletBagsListListNode (811) */
  interface PalletBagsListListNode extends Struct {
    readonly id: AccountId32;
    readonly prev: Option<AccountId32>;
    readonly next: Option<AccountId32>;
    readonly bagUpper: u64;
    readonly score: u64;
  }

  /** @name PalletBagsListListBag (812) */
  interface PalletBagsListListBag extends Struct {
    readonly head: Option<AccountId32>;
    readonly tail: Option<AccountId32>;
  }

  /** @name PalletBagsListError (814) */
  interface PalletBagsListError extends Enum {
    readonly isList: boolean;
    readonly asList: PalletBagsListListListError;
    readonly type: 'List';
  }

  /** @name PalletBagsListListListError (815) */
  interface PalletBagsListListListError extends Enum {
    readonly isDuplicate: boolean;
    readonly isNotHeavier: boolean;
    readonly isNotInSameBag: boolean;
    readonly isNodeNotFound: boolean;
    readonly type: 'Duplicate' | 'NotHeavier' | 'NotInSameBag' | 'NodeNotFound';
  }

  /** @name PalletElectionProviderMultiPhaseReadySolution (816) */
  interface PalletElectionProviderMultiPhaseReadySolution extends Struct {
    readonly supports: Vec<ITuple<[AccountId32, SpNposElectionsSupport]>>;
    readonly score: SpNposElectionsElectionScore;
    readonly compute: PalletElectionProviderMultiPhaseElectionCompute;
  }

  /** @name PalletElectionProviderMultiPhaseRoundSnapshot (818) */
  interface PalletElectionProviderMultiPhaseRoundSnapshot extends Struct {
    readonly voters: Vec<ITuple<[AccountId32, u64, Vec<AccountId32>]>>;
    readonly targets: Vec<AccountId32>;
  }

  /** @name PalletElectionProviderMultiPhaseSignedSignedSubmission (824) */
  interface PalletElectionProviderMultiPhaseSignedSignedSubmission extends Struct {
    readonly who: AccountId32;
    readonly deposit: u128;
    readonly rawSolution: PalletElectionProviderMultiPhaseRawSolution;
    readonly callFee: u128;
  }

  /** @name PalletElectionProviderMultiPhaseError (825) */
  interface PalletElectionProviderMultiPhaseError extends Enum {
    readonly isPreDispatchEarlySubmission: boolean;
    readonly isPreDispatchWrongWinnerCount: boolean;
    readonly isPreDispatchWeakSubmission: boolean;
    readonly isSignedQueueFull: boolean;
    readonly isSignedCannotPayDeposit: boolean;
    readonly isSignedInvalidWitness: boolean;
    readonly isSignedTooMuchWeight: boolean;
    readonly isOcwCallWrongEra: boolean;
    readonly isMissingSnapshotMetadata: boolean;
    readonly isInvalidSubmissionIndex: boolean;
    readonly isCallNotAllowed: boolean;
    readonly isFallbackFailed: boolean;
    readonly isBoundNotMet: boolean;
    readonly isTooManyWinners: boolean;
    readonly type: 'PreDispatchEarlySubmission' | 'PreDispatchWrongWinnerCount' | 'PreDispatchWeakSubmission' | 'SignedQueueFull' | 'SignedCannotPayDeposit' | 'SignedInvalidWitness' | 'SignedTooMuchWeight' | 'OcwCallWrongEra' | 'MissingSnapshotMetadata' | 'InvalidSubmissionIndex' | 'CallNotAllowed' | 'FallbackFailed' | 'BoundNotMet' | 'TooManyWinners';
  }

  /** @name BandBandRate (827) */
  interface BandBandRate extends Struct {
    readonly value: u128;
    readonly lastUpdated: u64;
    readonly lastUpdatedBlock: u32;
    readonly requestId: u64;
    readonly dynamicFee: FixnumFixedPoint;
  }

  /** @name BandError (829) */
  interface BandError extends Enum {
    readonly isUnauthorizedRelayer: boolean;
    readonly isAlreadyATrustedRelayer: boolean;
    readonly isNoSuchRelayer: boolean;
    readonly isRateConversionOverflow: boolean;
    readonly isRateHasInvalidTimestamp: boolean;
    readonly isRateExpired: boolean;
    readonly isDynamicFeeCalculationError: boolean;
    readonly isInvalidDynamicFeeParameters: boolean;
    readonly type: 'UnauthorizedRelayer' | 'AlreadyATrustedRelayer' | 'NoSuchRelayer' | 'RateConversionOverflow' | 'RateHasInvalidTimestamp' | 'RateExpired' | 'DynamicFeeCalculationError' | 'InvalidDynamicFeeParameters';
  }

  /** @name OracleProxyError (832) */
  interface OracleProxyError extends Enum {
    readonly isOracleAlreadyEnabled: boolean;
    readonly isOracleAlreadyDisabled: boolean;
    readonly type: 'OracleAlreadyEnabled' | 'OracleAlreadyDisabled';
  }

  /** @name HermesGovernancePlatformHermesVotingInfo (833) */
  interface HermesGovernancePlatformHermesVotingInfo extends Struct {
    readonly votingOption: Bytes;
    readonly numberOfHermes: u128;
    readonly hermesWithdrawn: bool;
  }

  /** @name HermesGovernancePlatformHermesPollInfo (834) */
  interface HermesGovernancePlatformHermesPollInfo extends Struct {
    readonly creator: AccountId32;
    readonly hermesLocked: u128;
    readonly pollStartTimestamp: u64;
    readonly pollEndTimestamp: u64;
    readonly title: Bytes;
    readonly description: Bytes;
    readonly creatorHermesWithdrawn: bool;
    readonly options: Vec<Bytes>;
  }

  /** @name HermesGovernancePlatformStorageVersion (835) */
  interface HermesGovernancePlatformStorageVersion extends Enum {
    readonly isV1: boolean;
    readonly isV2: boolean;
    readonly type: 'V1' | 'V2';
  }

  /** @name HermesGovernancePlatformError (836) */
  interface HermesGovernancePlatformError extends Enum {
    readonly isPollIsNotStarted: boolean;
    readonly isPollIsFinished: boolean;
    readonly isInvalidStartTimestamp: boolean;
    readonly isInvalidEndTimestamp: boolean;
    readonly isNotEnoughHermesForCreatingPoll: boolean;
    readonly isFundsAlreadyWithdrawn: boolean;
    readonly isPollIsNotFinished: boolean;
    readonly isYouAreNotCreator: boolean;
    readonly isUnauthorized: boolean;
    readonly isPollDoesNotExist: boolean;
    readonly isNotEnoughHermesForVoting: boolean;
    readonly isAlreadyVoted: boolean;
    readonly isInvalidMinimumDurationOfPoll: boolean;
    readonly isInvalidMaximumDurationOfPoll: boolean;
    readonly isNotVoted: boolean;
    readonly isInvalidVotingOptions: boolean;
    readonly isTooManyVotingOptions: boolean;
    readonly isInvalidOption: boolean;
    readonly isDuplicateOptions: boolean;
    readonly type: 'PollIsNotStarted' | 'PollIsFinished' | 'InvalidStartTimestamp' | 'InvalidEndTimestamp' | 'NotEnoughHermesForCreatingPoll' | 'FundsAlreadyWithdrawn' | 'PollIsNotFinished' | 'YouAreNotCreator' | 'Unauthorized' | 'PollDoesNotExist' | 'NotEnoughHermesForVoting' | 'AlreadyVoted' | 'InvalidMinimumDurationOfPoll' | 'InvalidMaximumDurationOfPoll' | 'NotVoted' | 'InvalidVotingOptions' | 'TooManyVotingOptions' | 'InvalidOption' | 'DuplicateOptions';
  }

  /** @name PalletPreimageRequestStatus (837) */
  interface PalletPreimageRequestStatus extends Enum {
    readonly isUnrequested: boolean;
    readonly asUnrequested: {
      readonly deposit: ITuple<[AccountId32, u128]>;
      readonly len: u32;
    } & Struct;
    readonly isRequested: boolean;
    readonly asRequested: {
      readonly deposit: Option<ITuple<[AccountId32, u128]>>;
      readonly count: u32;
      readonly len: Option<u32>;
    } & Struct;
    readonly type: 'Unrequested' | 'Requested';
  }

  /** @name PalletPreimageError (841) */
  interface PalletPreimageError extends Enum {
    readonly isTooBig: boolean;
    readonly isAlreadyNoted: boolean;
    readonly isNotAuthorized: boolean;
    readonly isNotNoted: boolean;
    readonly isRequested: boolean;
    readonly isNotRequested: boolean;
    readonly type: 'TooBig' | 'AlreadyNoted' | 'NotAuthorized' | 'NotNoted' | 'Requested' | 'NotRequested';
  }

  /** @name OrderBook (842) */
  interface OrderBook extends Struct {
    readonly orderBookId: OrderBookOrderBookId;
    readonly status: OrderBookOrderBookStatus;
    readonly lastOrderId: u128;
    readonly tickSize: CommonBalanceUnit;
    readonly stepLotSize: CommonBalanceUnit;
    readonly minLotSize: CommonBalanceUnit;
    readonly maxLotSize: CommonBalanceUnit;
    readonly techStatus: OrderBookOrderBookTechStatus;
  }

  /** @name OrderBookOrderBookTechStatus (843) */
  interface OrderBookOrderBookTechStatus extends Enum {
    readonly isReady: boolean;
    readonly isUpdating: boolean;
    readonly type: 'Ready' | 'Updating';
  }

  /** @name OrderBookLimitOrder (845) */
  interface OrderBookLimitOrder extends Struct {
    readonly id: u128;
    readonly owner: AccountId32;
    readonly side: CommonPrimitivesPriceVariant;
    readonly price: CommonBalanceUnit;
    readonly originalAmount: CommonBalanceUnit;
    readonly amount: CommonBalanceUnit;
    readonly time: u64;
    readonly lifespan: u64;
    readonly expiresAt: u32;
  }

  /** @name OrderBookError (855) */
  interface OrderBookError extends Enum {
    readonly isUnknownOrderBook: boolean;
    readonly isInvalidOrderBookId: boolean;
    readonly isOrderBookAlreadyExists: boolean;
    readonly isUnknownLimitOrder: boolean;
    readonly isLimitOrderAlreadyExists: boolean;
    readonly isLimitOrderStorageOverflow: boolean;
    readonly isUpdateLimitOrderError: boolean;
    readonly isDeleteLimitOrderError: boolean;
    readonly isBlockScheduleFull: boolean;
    readonly isExpirationNotFound: boolean;
    readonly isNoDataForPrice: boolean;
    readonly isNoAggregatedData: boolean;
    readonly isNotEnoughLiquidityInOrderBook: boolean;
    readonly isForbiddenToCreateOrderBookWithSameAssets: boolean;
    readonly isNotAllowedQuoteAsset: boolean;
    readonly isNotAllowedDEXId: boolean;
    readonly isSyntheticAssetIsForbidden: boolean;
    readonly isUserHasNoNft: boolean;
    readonly isInvalidLifespan: boolean;
    readonly isInvalidOrderAmount: boolean;
    readonly isInvalidLimitOrderPrice: boolean;
    readonly isLimitOrderPriceIsTooFarFromSpread: boolean;
    readonly isTradingIsForbidden: boolean;
    readonly isPlacementOfLimitOrdersIsForbidden: boolean;
    readonly isCancellationOfLimitOrdersIsForbidden: boolean;
    readonly isUserHasMaxCountOfOpenedOrders: boolean;
    readonly isPriceReachedMaxCountOfLimitOrders: boolean;
    readonly isOrderBookReachedMaxCountOfPricesForSide: boolean;
    readonly isAmountCalculationFailed: boolean;
    readonly isPriceCalculationFailed: boolean;
    readonly isUnauthorized: boolean;
    readonly isInvalidAsset: boolean;
    readonly isInvalidTickSize: boolean;
    readonly isInvalidStepLotSize: boolean;
    readonly isInvalidMinLotSize: boolean;
    readonly isInvalidMaxLotSize: boolean;
    readonly isTickSizeAndStepLotSizeAreTooBig: boolean;
    readonly isTickSizeAndStepLotSizeLosePrecision: boolean;
    readonly isMaxLotSizeIsMoreThanTotalSupply: boolean;
    readonly isSlippageLimitExceeded: boolean;
    readonly isMarketOrdersAllowedOnlyForIndivisibleAssets: boolean;
    readonly isForbiddenStatusToDeleteOrderBook: boolean;
    readonly isOrderBookIsNotEmpty: boolean;
    readonly isForbiddenStatusToUpdateOrderBook: boolean;
    readonly isOrderBookIsLocked: boolean;
    readonly type: 'UnknownOrderBook' | 'InvalidOrderBookId' | 'OrderBookAlreadyExists' | 'UnknownLimitOrder' | 'LimitOrderAlreadyExists' | 'LimitOrderStorageOverflow' | 'UpdateLimitOrderError' | 'DeleteLimitOrderError' | 'BlockScheduleFull' | 'ExpirationNotFound' | 'NoDataForPrice' | 'NoAggregatedData' | 'NotEnoughLiquidityInOrderBook' | 'ForbiddenToCreateOrderBookWithSameAssets' | 'NotAllowedQuoteAsset' | 'NotAllowedDEXId' | 'SyntheticAssetIsForbidden' | 'UserHasNoNft' | 'InvalidLifespan' | 'InvalidOrderAmount' | 'InvalidLimitOrderPrice' | 'LimitOrderPriceIsTooFarFromSpread' | 'TradingIsForbidden' | 'PlacementOfLimitOrdersIsForbidden' | 'CancellationOfLimitOrdersIsForbidden' | 'UserHasMaxCountOfOpenedOrders' | 'PriceReachedMaxCountOfLimitOrders' | 'OrderBookReachedMaxCountOfPricesForSide' | 'AmountCalculationFailed' | 'PriceCalculationFailed' | 'Unauthorized' | 'InvalidAsset' | 'InvalidTickSize' | 'InvalidStepLotSize' | 'InvalidMinLotSize' | 'InvalidMaxLotSize' | 'TickSizeAndStepLotSizeAreTooBig' | 'TickSizeAndStepLotSizeLosePrecision' | 'MaxLotSizeIsMoreThanTotalSupply' | 'SlippageLimitExceeded' | 'MarketOrdersAllowedOnlyForIndivisibleAssets' | 'ForbiddenStatusToDeleteOrderBook' | 'OrderBookIsNotEmpty' | 'ForbiddenStatusToUpdateOrderBook' | 'OrderBookIsLocked';
  }

  /** @name BridgeProxyBridgeRequest (858) */
  interface BridgeProxyBridgeRequest extends Struct {
    readonly source: BridgeTypesGenericAccount;
    readonly dest: BridgeTypesGenericAccount;
    readonly assetId: CommonPrimitivesAssetId32;
    readonly amount: u128;
    readonly status: BridgeTypesMessageStatus;
    readonly startTimepoint: BridgeTypesGenericTimepoint;
    readonly endTimepoint: BridgeTypesGenericTimepoint;
    readonly direction: BridgeTypesMessageDirection;
  }

  /** @name BridgeTypesMessageDirection (859) */
  interface BridgeTypesMessageDirection extends Enum {
    readonly isInbound: boolean;
    readonly isOutbound: boolean;
    readonly type: 'Inbound' | 'Outbound';
  }

  /** @name BridgeProxyError (863) */
  interface BridgeProxyError extends Enum {
    readonly isPathIsNotAvailable: boolean;
    readonly isWrongAccountKind: boolean;
    readonly isNotEnoughLockedLiquidity: boolean;
    readonly isOverflow: boolean;
    readonly isTransferLimitReached: boolean;
    readonly isAssetAlreadyLimited: boolean;
    readonly isAssetNotLimited: boolean;
    readonly isWrongLimitSettings: boolean;
    readonly type: 'PathIsNotAvailable' | 'WrongAccountKind' | 'NotEnoughLockedLiquidity' | 'Overflow' | 'TransferLimitReached' | 'AssetAlreadyLimited' | 'AssetNotLimited' | 'WrongLimitSettings';
  }

  /** @name EthereumLightClientPruningRange (865) */
  interface EthereumLightClientPruningRange extends Struct {
    readonly oldestUnprunedBlock: u64;
    readonly oldestBlockToKeep: u64;
  }

  /** @name EthereumLightClientStoredHeader (867) */
  interface EthereumLightClientStoredHeader extends Struct {
    readonly submitter: Option<AccountId32>;
    readonly header: BridgeTypesHeader;
    readonly totalDifficulty: U256;
    readonly finalized: bool;
  }

  /** @name EthereumLightClientError (869) */
  interface EthereumLightClientError extends Enum {
    readonly isAncientHeader: boolean;
    readonly isMissingHeader: boolean;
    readonly isMissingParentHeader: boolean;
    readonly isDuplicateHeader: boolean;
    readonly isHeaderNotFinalized: boolean;
    readonly isHeaderOnStaleFork: boolean;
    readonly isInvalidHeader: boolean;
    readonly isInvalidProof: boolean;
    readonly isDecodeFailed: boolean;
    readonly isNetworkNotFound: boolean;
    readonly isNetworkAlreadyExists: boolean;
    readonly isDifficultyTooLow: boolean;
    readonly isNetworkStateInvalid: boolean;
    readonly isUnknown: boolean;
    readonly isConsensusNotSupported: boolean;
    readonly isInvalidSignature: boolean;
    readonly isHeaderNotFound: boolean;
    readonly type: 'AncientHeader' | 'MissingHeader' | 'MissingParentHeader' | 'DuplicateHeader' | 'HeaderNotFinalized' | 'HeaderOnStaleFork' | 'InvalidHeader' | 'InvalidProof' | 'DecodeFailed' | 'NetworkNotFound' | 'NetworkAlreadyExists' | 'DifficultyTooLow' | 'NetworkStateInvalid' | 'Unknown' | 'ConsensusNotSupported' | 'InvalidSignature' | 'HeaderNotFound';
  }

  /** @name BridgeInboundChannelError (870) */
  interface BridgeInboundChannelError extends Enum {
    readonly isInvalidNetwork: boolean;
    readonly isInvalidSourceChannel: boolean;
    readonly isInvalidEnvelope: boolean;
    readonly isInvalidBatchDispatchedEvent: boolean;
    readonly isInvalidNonce: boolean;
    readonly isInvalidRewardFraction: boolean;
    readonly isContractExists: boolean;
    readonly isCallEncodeFailed: boolean;
    readonly type: 'InvalidNetwork' | 'InvalidSourceChannel' | 'InvalidEnvelope' | 'InvalidBatchDispatchedEvent' | 'InvalidNonce' | 'InvalidRewardFraction' | 'ContractExists' | 'CallEncodeFailed';
  }

  /** @name BridgeTypesGenericCommitmentWithBlock (871) */
  interface BridgeTypesGenericCommitmentWithBlock extends Struct {
    readonly blockNumber: u32;
    readonly commitment: BridgeTypesGenericCommitment;
  }

  /** @name BridgeOutboundChannelError (872) */
  interface BridgeOutboundChannelError extends Enum {
    readonly isPayloadTooLarge: boolean;
    readonly isQueueSizeLimitReached: boolean;
    readonly isMaxGasTooBig: boolean;
    readonly isOverflow: boolean;
    readonly isChannelExists: boolean;
    readonly type: 'PayloadTooLarge' | 'QueueSizeLimitReached' | 'MaxGasTooBig' | 'Overflow' | 'ChannelExists';
  }

  /** @name EthAppError (874) */
  interface EthAppError extends Enum {
    readonly isInvalidPayload: boolean;
    readonly isAppIsNotRegistered: boolean;
    readonly isInvalidAppAddress: boolean;
    readonly isAppAlreadyExists: boolean;
    readonly isDestAccountIsNotSet: boolean;
    readonly isCallEncodeFailed: boolean;
    readonly isWrongAmount: boolean;
    readonly isWrongRequest: boolean;
    readonly isWrongRequestStatus: boolean;
    readonly type: 'InvalidPayload' | 'AppIsNotRegistered' | 'InvalidAppAddress' | 'AppAlreadyExists' | 'DestAccountIsNotSet' | 'CallEncodeFailed' | 'WrongAmount' | 'WrongRequest' | 'WrongRequestStatus';
  }

  /** @name Erc20AppError (878) */
  interface Erc20AppError extends Enum {
    readonly isTokenIsNotRegistered: boolean;
    readonly isAppIsNotRegistered: boolean;
    readonly isNotEnoughFunds: boolean;
    readonly isInvalidNetwork: boolean;
    readonly isTokenAlreadyRegistered: boolean;
    readonly isAppAlreadyRegistered: boolean;
    readonly isCallEncodeFailed: boolean;
    readonly isWrongAmount: boolean;
    readonly isWrongRequest: boolean;
    readonly isWrongRequestStatus: boolean;
    readonly type: 'TokenIsNotRegistered' | 'AppIsNotRegistered' | 'NotEnoughFunds' | 'InvalidNetwork' | 'TokenAlreadyRegistered' | 'AppAlreadyRegistered' | 'CallEncodeFailed' | 'WrongAmount' | 'WrongRequest' | 'WrongRequestStatus';
  }

  /** @name MigrationAppError (879) */
  interface MigrationAppError extends Enum {
    readonly isInvalidPayload: boolean;
    readonly isAppIsNotRegistered: boolean;
    readonly isInvalidAppAddress: boolean;
    readonly isAppAlreadyExists: boolean;
    readonly isTokenRegisteredWithAnotherAddress: boolean;
    readonly isCallEncodeFailed: boolean;
    readonly type: 'InvalidPayload' | 'AppIsNotRegistered' | 'InvalidAppAddress' | 'AppAlreadyExists' | 'TokenRegisteredWithAnotherAddress' | 'CallEncodeFailed';
  }

  /** @name BeefyLightClientError (880) */
  interface BeefyLightClientError extends Enum {
    readonly isInvalidValidatorSetId: boolean;
    readonly isInvalidMMRProof: boolean;
    readonly isPayloadBlocknumberTooOld: boolean;
    readonly isPayloadBlocknumberTooNew: boolean;
    readonly isCannotSwitchOldValidatorSet: boolean;
    readonly isNotEnoughValidatorSignatures: boolean;
    readonly isInvalidNumberOfSignatures: boolean;
    readonly isInvalidNumberOfPositions: boolean;
    readonly isInvalidNumberOfPublicKeys: boolean;
    readonly isValidatorNotOnceInbitfield: boolean;
    readonly isValidatorSetIncorrectPosition: boolean;
    readonly isInvalidSignature: boolean;
    readonly isMerklePositionTooHigh: boolean;
    readonly isMerkleProofTooShort: boolean;
    readonly isMerkleProofTooHigh: boolean;
    readonly isPalletNotInitialized: boolean;
    readonly isInvalidDigestHash: boolean;
    readonly isCommitmentNotFoundInDigest: boolean;
    readonly isMmrPayloadNotFound: boolean;
    readonly isInvalidNetworkId: boolean;
    readonly type: 'InvalidValidatorSetId' | 'InvalidMMRProof' | 'PayloadBlocknumberTooOld' | 'PayloadBlocknumberTooNew' | 'CannotSwitchOldValidatorSet' | 'NotEnoughValidatorSignatures' | 'InvalidNumberOfSignatures' | 'InvalidNumberOfPositions' | 'InvalidNumberOfPublicKeys' | 'ValidatorNotOnceInbitfield' | 'ValidatorSetIncorrectPosition' | 'InvalidSignature' | 'MerklePositionTooHigh' | 'MerkleProofTooShort' | 'MerkleProofTooHigh' | 'PalletNotInitialized' | 'InvalidDigestHash' | 'CommitmentNotFoundInDigest' | 'MmrPayloadNotFound' | 'InvalidNetworkId';
  }

  /** @name SubstrateBridgeChannelInboundPalletError (881) */
  interface SubstrateBridgeChannelInboundPalletError extends Enum {
    readonly isInvalidNetwork: boolean;
    readonly isInvalidSourceChannel: boolean;
    readonly isInvalidCommitment: boolean;
    readonly isInvalidNonce: boolean;
    readonly isInvalidRewardFraction: boolean;
    readonly isContractExists: boolean;
    readonly isCallEncodeFailed: boolean;
    readonly type: 'InvalidNetwork' | 'InvalidSourceChannel' | 'InvalidCommitment' | 'InvalidNonce' | 'InvalidRewardFraction' | 'ContractExists' | 'CallEncodeFailed';
  }

  /** @name SubstrateBridgeChannelOutboundPalletError (882) */
  interface SubstrateBridgeChannelOutboundPalletError extends Enum {
    readonly isPayloadTooLarge: boolean;
    readonly isQueueSizeLimitReached: boolean;
    readonly isMaxGasTooBig: boolean;
    readonly isNoFunds: boolean;
    readonly isOverflow: boolean;
    readonly isChannelExists: boolean;
    readonly type: 'PayloadTooLarge' | 'QueueSizeLimitReached' | 'MaxGasTooBig' | 'NoFunds' | 'Overflow' | 'ChannelExists';
  }

  /** @name ParachainBridgeAppError (885) */
  interface ParachainBridgeAppError extends Enum {
    readonly isTokenIsNotRegistered: boolean;
    readonly isAppIsNotRegistered: boolean;
    readonly isNotEnoughFunds: boolean;
    readonly isInvalidNetwork: boolean;
    readonly isTokenAlreadyRegistered: boolean;
    readonly isAppAlreadyRegistered: boolean;
    readonly isCallEncodeFailed: boolean;
    readonly isWrongAmount: boolean;
    readonly isTransferLimitReached: boolean;
    readonly isUnknownPrecision: boolean;
    readonly isMessageIdNotFound: boolean;
    readonly isInvalidDestinationParachain: boolean;
    readonly isInvalidDestinationParams: boolean;
    readonly isRelaychainAssetNotRegistered: boolean;
    readonly isNotRelayTransferableAsset: boolean;
    readonly isRelaychainAssetRegistered: boolean;
    readonly type: 'TokenIsNotRegistered' | 'AppIsNotRegistered' | 'NotEnoughFunds' | 'InvalidNetwork' | 'TokenAlreadyRegistered' | 'AppAlreadyRegistered' | 'CallEncodeFailed' | 'WrongAmount' | 'TransferLimitReached' | 'UnknownPrecision' | 'MessageIdNotFound' | 'InvalidDestinationParachain' | 'InvalidDestinationParams' | 'RelaychainAssetNotRegistered' | 'NotRelayTransferableAsset' | 'RelaychainAssetRegistered';
  }

  /** @name BridgeDataSignerError (892) */
  interface BridgeDataSignerError extends Enum {
    readonly isPalletInitialized: boolean;
    readonly isPalletNotInitialized: boolean;
    readonly isPeerExists: boolean;
    readonly isPeerNotExists: boolean;
    readonly isTooMuchPeers: boolean;
    readonly isFailedToVerifySignature: boolean;
    readonly isPeerNotFound: boolean;
    readonly isTooMuchApprovals: boolean;
    readonly isApprovalsNotFound: boolean;
    readonly isSignaturesNotFound: boolean;
    readonly isHasPendingPeerUpdate: boolean;
    readonly isDontHavePendingPeerUpdates: boolean;
    readonly isNetworkNotSupported: boolean;
    readonly isSignatureAlreadyExists: boolean;
    readonly type: 'PalletInitialized' | 'PalletNotInitialized' | 'PeerExists' | 'PeerNotExists' | 'TooMuchPeers' | 'FailedToVerifySignature' | 'PeerNotFound' | 'TooMuchApprovals' | 'ApprovalsNotFound' | 'SignaturesNotFound' | 'HasPendingPeerUpdate' | 'DontHavePendingPeerUpdates' | 'NetworkNotSupported' | 'SignatureAlreadyExists';
  }

  /** @name MultisigVerifierError (893) */
  interface MultisigVerifierError extends Enum {
    readonly isInvalidInitParams: boolean;
    readonly isTooMuchPeers: boolean;
    readonly isNetworkNotInitialized: boolean;
    readonly isInvalidNumberOfSignatures: boolean;
    readonly isInvalidSignature: boolean;
    readonly isNotTrustedPeerSignature: boolean;
    readonly isPeerExists: boolean;
    readonly isNoSuchPeer: boolean;
    readonly isInvalidNetworkId: boolean;
    readonly isCommitmentNotFoundInDigest: boolean;
    readonly isDuplicatedPeer: boolean;
    readonly type: 'InvalidInitParams' | 'TooMuchPeers' | 'NetworkNotInitialized' | 'InvalidNumberOfSignatures' | 'InvalidSignature' | 'NotTrustedPeerSignature' | 'PeerExists' | 'NoSuchPeer' | 'InvalidNetworkId' | 'CommitmentNotFoundInDigest' | 'DuplicatedPeer';
  }

  /** @name PalletSudoError (896) */
  interface PalletSudoError extends Enum {
    readonly isRequireSudo: boolean;
    readonly type: 'RequireSudo';
  }

  /** @name FaucetError (897) */
  interface FaucetError extends Enum {
    readonly isAssetNotSupported: boolean;
    readonly isAmountAboveLimit: boolean;
    readonly isNotEnoughReserves: boolean;
    readonly type: 'AssetNotSupported' | 'AmountAboveLimit' | 'NotEnoughReserves';
  }

  /** @name QaToolsError (898) */
  interface QaToolsError extends Enum {
    readonly isWhitelistFull: boolean;
    readonly isAlreadyInWhitelist: boolean;
    readonly isNotInWhitelist: boolean;
    readonly isCannotFillUnknownOrderBook: boolean;
    readonly isOrderBookAlreadyExists: boolean;
    readonly isIncorrectPrice: boolean;
    readonly isEmptyRandomRange: boolean;
    readonly isOutOfBoundsRandomRange: boolean;
    readonly isTooManyOrders: boolean;
    readonly isTooManyPrices: boolean;
    readonly type: 'WhitelistFull' | 'AlreadyInWhitelist' | 'NotInWhitelist' | 'CannotFillUnknownOrderBook' | 'OrderBookAlreadyExists' | 'IncorrectPrice' | 'EmptyRandomRange' | 'OutOfBoundsRandomRange' | 'TooManyOrders' | 'TooManyPrices';
  }

  /** @name FrameSystemExtensionsCheckSpecVersion (901) */
  type FrameSystemExtensionsCheckSpecVersion = Null;

  /** @name FrameSystemExtensionsCheckTxVersion (902) */
  type FrameSystemExtensionsCheckTxVersion = Null;

  /** @name FrameSystemExtensionsCheckGenesis (903) */
  type FrameSystemExtensionsCheckGenesis = Null;

  /** @name FrameSystemExtensionsCheckNonce (906) */
  interface FrameSystemExtensionsCheckNonce extends Compact<u32> {}

  /** @name FrameSystemExtensionsCheckWeight (907) */
  type FrameSystemExtensionsCheckWeight = Null;

  /** @name XorFeeExtensionChargeTransactionPayment (908) */
  interface XorFeeExtensionChargeTransactionPayment extends Struct {
    readonly tip: Compact<u128>;
  }

  /** @name FramenodeRuntimeRuntime (909) */
  type FramenodeRuntimeRuntime = Null;

} // declare module
