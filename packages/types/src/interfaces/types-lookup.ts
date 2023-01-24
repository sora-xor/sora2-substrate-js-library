// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

// import type lookup before we augment - in some environments
// this is required to allow for ambient/previous definitions
import '@polkadot/types/lookup';

import type { Data } from '@polkadot/types';
import type { BTreeMap, Bytes, Compact, Enum, Null, Option, Result, Set, Struct, Text, U8aFixed, Vec, bool, i128, i32, u128, u16, u32, u64, u8 } from '@polkadot/types-codec';
import type { ITuple } from '@polkadot/types-codec/types';
import type { Vote } from '@polkadot/types/interfaces/elections';
import type { OpaqueMultiaddr, OpaquePeerId } from '@polkadot/types/interfaces/imOnline';
import type { AccountId32, Call, H160, H256, H512, PerU16, Perbill, Percent } from '@polkadot/types/interfaces/runtime';
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

  /** @name FrameSupportWeightsPerDispatchClassU64 (7) */
  interface FrameSupportWeightsPerDispatchClassU64 extends Struct {
    readonly normal: u64;
    readonly operational: u64;
    readonly mandatory: u64;
  }

  /** @name SpRuntimeDigest (11) */
  interface SpRuntimeDigest extends Struct {
    readonly logs: Vec<SpRuntimeDigestDigestItem>;
  }

  /** @name SpRuntimeDigestDigestItem (13) */
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

  /** @name FrameSystemEventRecord (16) */
  interface FrameSystemEventRecord extends Struct {
    readonly phase: FrameSystemPhase;
    readonly event: Event;
    readonly topics: Vec<H256>;
  }

  /** @name FrameSystemEvent (18) */
  interface FrameSystemEvent extends Enum {
    readonly isExtrinsicSuccess: boolean;
    readonly asExtrinsicSuccess: {
      readonly dispatchInfo: FrameSupportWeightsDispatchInfo;
    } & Struct;
    readonly isExtrinsicFailed: boolean;
    readonly asExtrinsicFailed: {
      readonly dispatchError: SpRuntimeDispatchError;
      readonly dispatchInfo: FrameSupportWeightsDispatchInfo;
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

  /** @name FrameSupportWeightsDispatchInfo (19) */
  interface FrameSupportWeightsDispatchInfo extends Struct {
    readonly weight: u64;
    readonly class: FrameSupportWeightsDispatchClass;
    readonly paysFee: FrameSupportWeightsPays;
  }

  /** @name FrameSupportWeightsDispatchClass (20) */
  interface FrameSupportWeightsDispatchClass extends Enum {
    readonly isNormal: boolean;
    readonly isOperational: boolean;
    readonly isMandatory: boolean;
    readonly type: 'Normal' | 'Operational' | 'Mandatory';
  }

  /** @name FrameSupportWeightsPays (21) */
  interface FrameSupportWeightsPays extends Enum {
    readonly isYes: boolean;
    readonly isNo: boolean;
    readonly type: 'Yes' | 'No';
  }

  /** @name SpRuntimeDispatchError (22) */
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
    readonly asArithmetic: SpRuntimeArithmeticError;
    readonly isTransactional: boolean;
    readonly asTransactional: SpRuntimeTransactionalError;
    readonly type: 'Other' | 'CannotLookup' | 'BadOrigin' | 'Module' | 'ConsumerRemaining' | 'NoProviders' | 'TooManyConsumers' | 'Token' | 'Arithmetic' | 'Transactional';
  }

  /** @name SpRuntimeModuleError (23) */
  interface SpRuntimeModuleError extends Struct {
    readonly index: u8;
    readonly error: U8aFixed;
  }

  /** @name SpRuntimeTokenError (24) */
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

  /** @name SpRuntimeArithmeticError (25) */
  interface SpRuntimeArithmeticError extends Enum {
    readonly isUnderflow: boolean;
    readonly isOverflow: boolean;
    readonly isDivisionByZero: boolean;
    readonly type: 'Underflow' | 'Overflow' | 'DivisionByZero';
  }

  /** @name SpRuntimeTransactionalError (26) */
  interface SpRuntimeTransactionalError extends Enum {
    readonly isLimitReached: boolean;
    readonly isNoLayer: boolean;
    readonly type: 'LimitReached' | 'NoLayer';
  }

  /** @name PalletBalancesEvent (27) */
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

  /** @name FrameSupportTokensMiscBalanceStatus (28) */
  interface FrameSupportTokensMiscBalanceStatus extends Enum {
    readonly isFree: boolean;
    readonly isReserved: boolean;
    readonly type: 'Free' | 'Reserved';
  }

  /** @name PalletSudoEvent (29) */
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

  /** @name PermissionsEvent (33) */
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

  /** @name RewardsEvent (34) */
  interface RewardsEvent extends Enum {
    readonly isClaimed: boolean;
    readonly asClaimed: AccountId32;
    readonly isMigrationCompleted: boolean;
    readonly type: 'Claimed' | 'MigrationCompleted';
  }

  /** @name XorFeeEvent (35) */
  interface XorFeeEvent extends Enum {
    readonly isFeeWithdrawn: boolean;
    readonly asFeeWithdrawn: ITuple<[AccountId32, u128]>;
    readonly isReferrerRewarded: boolean;
    readonly asReferrerRewarded: ITuple<[AccountId32, AccountId32, u128]>;
    readonly isWeightToFeeMultiplierUpdated: boolean;
    readonly asWeightToFeeMultiplierUpdated: u128;
    readonly type: 'FeeWithdrawn' | 'ReferrerRewarded' | 'WeightToFeeMultiplierUpdated';
  }

  /** @name PalletMultisigEvent (37) */
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

  /** @name PalletMultisigBridgeTimepoint (38) */
  interface PalletMultisigBridgeTimepoint extends Struct {
    readonly height: PalletMultisigMultiChainHeight;
    readonly index: u32;
  }

  /** @name PalletMultisigMultiChainHeight (39) */
  interface PalletMultisigMultiChainHeight extends Enum {
    readonly isThischain: boolean;
    readonly asThischain: u32;
    readonly isSidechain: boolean;
    readonly asSidechain: u64;
    readonly type: 'Thischain' | 'Sidechain';
  }

  /** @name PalletUtilityEvent (41) */
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

  /** @name PalletStakingPalletEvent (42) */
  interface PalletStakingPalletEvent extends Enum {
    readonly isEraPaid: boolean;
    readonly asEraPaid: ITuple<[u32, u128]>;
    readonly isRewarded: boolean;
    readonly asRewarded: ITuple<[AccountId32, u128]>;
    readonly isSlashed: boolean;
    readonly asSlashed: ITuple<[AccountId32, u128]>;
    readonly isOldSlashingReportDiscarded: boolean;
    readonly asOldSlashingReportDiscarded: u32;
    readonly isStakersElected: boolean;
    readonly isBonded: boolean;
    readonly asBonded: ITuple<[AccountId32, u128]>;
    readonly isUnbonded: boolean;
    readonly asUnbonded: ITuple<[AccountId32, u128]>;
    readonly isWithdrawn: boolean;
    readonly asWithdrawn: ITuple<[AccountId32, u128]>;
    readonly isKicked: boolean;
    readonly asKicked: ITuple<[AccountId32, AccountId32]>;
    readonly isStakingElectionFailed: boolean;
    readonly isChilled: boolean;
    readonly asChilled: AccountId32;
    readonly isPayoutStarted: boolean;
    readonly asPayoutStarted: ITuple<[u32, AccountId32]>;
    readonly isValidatorPrefsSet: boolean;
    readonly asValidatorPrefsSet: ITuple<[AccountId32, PalletStakingValidatorPrefs]>;
    readonly type: 'EraPaid' | 'Rewarded' | 'Slashed' | 'OldSlashingReportDiscarded' | 'StakersElected' | 'Bonded' | 'Unbonded' | 'Withdrawn' | 'Kicked' | 'StakingElectionFailed' | 'Chilled' | 'PayoutStarted' | 'ValidatorPrefsSet';
  }

  /** @name PalletStakingValidatorPrefs (43) */
  interface PalletStakingValidatorPrefs extends Struct {
    readonly commission: Compact<Perbill>;
    readonly blocked: bool;
  }

  /** @name PalletOffencesEvent (47) */
  interface PalletOffencesEvent extends Enum {
    readonly isOffence: boolean;
    readonly asOffence: {
      readonly kind: U8aFixed;
      readonly timeslot: Bytes;
    } & Struct;
    readonly type: 'Offence';
  }

  /** @name PalletSessionEvent (49) */
  interface PalletSessionEvent extends Enum {
    readonly isNewSession: boolean;
    readonly asNewSession: {
      readonly sessionIndex: u32;
    } & Struct;
    readonly type: 'NewSession';
  }

  /** @name PalletGrandpaEvent (50) */
  interface PalletGrandpaEvent extends Enum {
    readonly isNewAuthorities: boolean;
    readonly asNewAuthorities: {
      readonly authoritySet: Vec<ITuple<[SpFinalityGrandpaAppPublic, u64]>>;
    } & Struct;
    readonly isPaused: boolean;
    readonly isResumed: boolean;
    readonly type: 'NewAuthorities' | 'Paused' | 'Resumed';
  }

  /** @name SpFinalityGrandpaAppPublic (53) */
  interface SpFinalityGrandpaAppPublic extends SpCoreEd25519Public {}

  /** @name SpCoreEd25519Public (54) */
  interface SpCoreEd25519Public extends U8aFixed {}

  /** @name PalletImOnlineEvent (55) */
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

  /** @name PalletImOnlineSr25519AppSr25519Public (56) */
  interface PalletImOnlineSr25519AppSr25519Public extends SpCoreSr25519Public {}

  /** @name SpCoreSr25519Public (57) */
  interface SpCoreSr25519Public extends U8aFixed {}

  /** @name PalletStakingExposure (60) */
  interface PalletStakingExposure extends Struct {
    readonly total: Compact<u128>;
    readonly own: Compact<u128>;
    readonly others: Vec<PalletStakingIndividualExposure>;
  }

  /** @name PalletStakingIndividualExposure (63) */
  interface PalletStakingIndividualExposure extends Struct {
    readonly who: AccountId32;
    readonly value: Compact<u128>;
  }

  /** @name OrmlTokensModuleEvent (64) */
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
    readonly type: 'Endowed' | 'DustLost' | 'Transfer' | 'Reserved' | 'Unreserved' | 'ReserveRepatriated' | 'BalanceSet' | 'TotalIssuanceSet' | 'Withdrawn' | 'Slashed' | 'Deposited' | 'LockSet' | 'LockRemoved';
  }

  /** @name CommonPrimitivesAssetId32 (65) */
  interface CommonPrimitivesAssetId32 extends Struct {
    readonly code: U8aFixed;
  }

  /** @name CommonPrimitivesPredefinedAssetId (66) */
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
    readonly type: 'Xor' | 'Dot' | 'Ksm' | 'Usdt' | 'Val' | 'Pswap' | 'Dai' | 'Eth' | 'Xstusd' | 'Xst';
  }

  /** @name TradingPairEvent (68) */
  interface TradingPairEvent extends Enum {
    readonly isTradingPairStored: boolean;
    readonly asTradingPairStored: ITuple<[u32, CommonPrimitivesTradingPairAssetId32]>;
    readonly type: 'TradingPairStored';
  }

  /** @name CommonPrimitivesTradingPairAssetId32 (69) */
  interface CommonPrimitivesTradingPairAssetId32 extends Struct {
    readonly baseAssetId: CommonPrimitivesAssetId32;
    readonly targetAssetId: CommonPrimitivesAssetId32;
  }

  /** @name AssetsEvent (70) */
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
    readonly type: 'AssetRegistered' | 'Transfer' | 'Mint' | 'Burn' | 'AssetSetNonMintable';
  }

  /** @name MulticollateralBondingCurvePoolEvent (71) */
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

  /** @name FixnumFixedPoint (73) */
  interface FixnumFixedPoint extends Struct {
    readonly inner: i128;
  }

  /** @name TechnicalEvent (75) */
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

  /** @name CommonPrimitivesTechAssetId (76) */
  interface CommonPrimitivesTechAssetId extends Enum {
    readonly isWrapped: boolean;
    readonly asWrapped: CommonPrimitivesPredefinedAssetId;
    readonly isEscaped: boolean;
    readonly asEscaped: U8aFixed;
    readonly type: 'Wrapped' | 'Escaped';
  }

  /** @name CommonPrimitivesTechAccountId (77) */
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

  /** @name CommonPrimitivesTechPurpose (78) */
  interface CommonPrimitivesTechPurpose extends Enum {
    readonly isFeeCollector: boolean;
    readonly isFeeCollectorForPair: boolean;
    readonly asFeeCollectorForPair: CommonPrimitivesTradingPairTechAssetId;
    readonly isLiquidityKeeper: boolean;
    readonly asLiquidityKeeper: CommonPrimitivesTradingPairTechAssetId;
    readonly isIdentifier: boolean;
    readonly asIdentifier: Bytes;
    readonly type: 'FeeCollector' | 'FeeCollectorForPair' | 'LiquidityKeeper' | 'Identifier';
  }

  /** @name CommonPrimitivesTradingPairTechAssetId (79) */
  interface CommonPrimitivesTradingPairTechAssetId extends Struct {
    readonly baseAssetId: CommonPrimitivesTechAssetId;
    readonly targetAssetId: CommonPrimitivesTechAssetId;
  }

  /** @name PoolXykEvent (80) */
  interface PoolXykEvent extends Enum {
    readonly isPoolIsInitialized: boolean;
    readonly asPoolIsInitialized: AccountId32;
    readonly type: 'PoolIsInitialized';
  }

  /** @name LiquidityProxyEvent (81) */
  interface LiquidityProxyEvent extends Enum {
    readonly isExchange: boolean;
    readonly asExchange: ITuple<[AccountId32, u32, CommonPrimitivesAssetId32, CommonPrimitivesAssetId32, u128, u128, u128, Vec<CommonPrimitivesLiquiditySourceId>]>;
    readonly isLiquiditySourceEnabled: boolean;
    readonly asLiquiditySourceEnabled: CommonPrimitivesLiquiditySourceType;
    readonly isLiquiditySourceDisabled: boolean;
    readonly asLiquiditySourceDisabled: CommonPrimitivesLiquiditySourceType;
    readonly type: 'Exchange' | 'LiquiditySourceEnabled' | 'LiquiditySourceDisabled';
  }

  /** @name CommonPrimitivesLiquiditySourceId (83) */
  interface CommonPrimitivesLiquiditySourceId extends Struct {
    readonly dexId: u32;
    readonly liquiditySourceIndex: CommonPrimitivesLiquiditySourceType;
  }

  /** @name CommonPrimitivesLiquiditySourceType (84) */
  interface CommonPrimitivesLiquiditySourceType extends Enum {
    readonly isXykPool: boolean;
    readonly isBondingCurvePool: boolean;
    readonly isMulticollateralBondingCurvePool: boolean;
    readonly isMockPool: boolean;
    readonly isMockPool2: boolean;
    readonly isMockPool3: boolean;
    readonly isMockPool4: boolean;
    readonly isXstPool: boolean;
    readonly type: 'XykPool' | 'BondingCurvePool' | 'MulticollateralBondingCurvePool' | 'MockPool' | 'MockPool2' | 'MockPool3' | 'MockPool4' | 'XstPool';
  }

  /** @name PalletCollectiveEvent (85) */
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

  /** @name PalletDemocracyEvent (87) */
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
      readonly depositors: Vec<AccountId32>;
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
    readonly isExecuted: boolean;
    readonly asExecuted: {
      readonly refIndex: u32;
      readonly result: Result<Null, SpRuntimeDispatchError>;
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
    readonly isPreimageNoted: boolean;
    readonly asPreimageNoted: {
      readonly proposalHash: H256;
      readonly who: AccountId32;
      readonly deposit: u128;
    } & Struct;
    readonly isPreimageUsed: boolean;
    readonly asPreimageUsed: {
      readonly proposalHash: H256;
      readonly provider: AccountId32;
      readonly deposit: u128;
    } & Struct;
    readonly isPreimageInvalid: boolean;
    readonly asPreimageInvalid: {
      readonly proposalHash: H256;
      readonly refIndex: u32;
    } & Struct;
    readonly isPreimageMissing: boolean;
    readonly asPreimageMissing: {
      readonly proposalHash: H256;
      readonly refIndex: u32;
    } & Struct;
    readonly isPreimageReaped: boolean;
    readonly asPreimageReaped: {
      readonly proposalHash: H256;
      readonly provider: AccountId32;
      readonly deposit: u128;
      readonly reaper: AccountId32;
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
    readonly type: 'Proposed' | 'Tabled' | 'ExternalTabled' | 'Started' | 'Passed' | 'NotPassed' | 'Cancelled' | 'Executed' | 'Delegated' | 'Undelegated' | 'Vetoed' | 'PreimageNoted' | 'PreimageUsed' | 'PreimageInvalid' | 'PreimageMissing' | 'PreimageReaped' | 'Blacklisted' | 'Voted' | 'Seconded' | 'ProposalCanceled';
  }

  /** @name PalletDemocracyVoteThreshold (89) */
  interface PalletDemocracyVoteThreshold extends Enum {
    readonly isSuperMajorityApprove: boolean;
    readonly isSuperMajorityAgainst: boolean;
    readonly isSimpleMajority: boolean;
    readonly type: 'SuperMajorityApprove' | 'SuperMajorityAgainst' | 'SimpleMajority';
  }

  /** @name PalletDemocracyVoteAccountVote (90) */
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

  /** @name EthBridgeEvent (92) */
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
    readonly type: 'RequestRegistered' | 'ApprovalsCollected' | 'RequestFinalizationFailed' | 'IncomingRequestFinalizationFailed' | 'IncomingRequestFinalized' | 'RequestAborted' | 'CancellationFailed';
  }

  /** @name PswapDistributionEvent (93) */
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

  /** @name PalletMultisigTimepoint (95) */
  interface PalletMultisigTimepoint extends Struct {
    readonly height: u32;
    readonly index: u32;
  }

  /** @name PalletSchedulerEvent (96) */
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
      readonly id: Option<Bytes>;
      readonly result: Result<Null, SpRuntimeDispatchError>;
    } & Struct;
    readonly isCallLookupFailed: boolean;
    readonly asCallLookupFailed: {
      readonly task: ITuple<[u32, u32]>;
      readonly id: Option<Bytes>;
      readonly error: FrameSupportScheduleLookupError;
    } & Struct;
    readonly type: 'Scheduled' | 'Canceled' | 'Dispatched' | 'CallLookupFailed';
  }

  /** @name FrameSupportScheduleLookupError (99) */
  interface FrameSupportScheduleLookupError extends Enum {
    readonly isUnknown: boolean;
    readonly isBadFormat: boolean;
    readonly type: 'Unknown' | 'BadFormat';
  }

  /** @name IrohaMigrationEvent (100) */
  interface IrohaMigrationEvent extends Enum {
    readonly isMigrated: boolean;
    readonly asMigrated: ITuple<[Text, AccountId32]>;
    readonly type: 'Migrated';
  }

  /** @name PalletMembershipEvent (102) */
  interface PalletMembershipEvent extends Enum {
    readonly isMemberAdded: boolean;
    readonly isMemberRemoved: boolean;
    readonly isMembersSwapped: boolean;
    readonly isMembersReset: boolean;
    readonly isKeyChanged: boolean;
    readonly isDummy: boolean;
    readonly type: 'MemberAdded' | 'MemberRemoved' | 'MembersSwapped' | 'MembersReset' | 'KeyChanged' | 'Dummy';
  }

  /** @name PalletElectionsPhragmenEvent (103) */
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

  /** @name VestedRewardsEvent (106) */
  interface VestedRewardsEvent extends Enum {
    readonly isRewardsVested: boolean;
    readonly asRewardsVested: u128;
    readonly isActualDoesntMatchAvailable: boolean;
    readonly asActualDoesntMatchAvailable: CommonPrimitivesRewardReason;
    readonly isFailedToSaveCalculatedReward: boolean;
    readonly asFailedToSaveCalculatedReward: AccountId32;
    readonly type: 'RewardsVested' | 'ActualDoesntMatchAvailable' | 'FailedToSaveCalculatedReward';
  }

  /** @name CommonPrimitivesRewardReason (107) */
  interface CommonPrimitivesRewardReason extends Enum {
    readonly isUnspecified: boolean;
    readonly isBuyOnBondingCurve: boolean;
    readonly isLiquidityProvisionFarming: boolean;
    readonly isDeprecatedMarketMakerVolume: boolean;
    readonly isCrowdloan: boolean;
    readonly type: 'Unspecified' | 'BuyOnBondingCurve' | 'LiquidityProvisionFarming' | 'DeprecatedMarketMakerVolume' | 'Crowdloan';
  }

  /** @name PalletIdentityEvent (108) */
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

  /** @name XstEvent (109) */
  interface XstEvent extends Enum {
    readonly isPoolInitialized: boolean;
    readonly asPoolInitialized: ITuple<[u32, CommonPrimitivesAssetId32]>;
    readonly isReferenceAssetChanged: boolean;
    readonly asReferenceAssetChanged: CommonPrimitivesAssetId32;
    readonly isSyntheticAssetEnabled: boolean;
    readonly asSyntheticAssetEnabled: CommonPrimitivesAssetId32;
    readonly isSyntheticBaseAssetFloorPriceChanged: boolean;
    readonly asSyntheticBaseAssetFloorPriceChanged: u128;
    readonly type: 'PoolInitialized' | 'ReferenceAssetChanged' | 'SyntheticAssetEnabled' | 'SyntheticBaseAssetFloorPriceChanged';
  }

  /** @name PriceToolsEvent (110) */
  type PriceToolsEvent = Null;

  /** @name CeresStakingEvent (111) */
  interface CeresStakingEvent extends Enum {
    readonly isDeposited: boolean;
    readonly asDeposited: ITuple<[AccountId32, u128]>;
    readonly isWithdrawn: boolean;
    readonly asWithdrawn: ITuple<[AccountId32, u128, u128]>;
    readonly isRewardsChanged: boolean;
    readonly asRewardsChanged: u128;
    readonly type: 'Deposited' | 'Withdrawn' | 'RewardsChanged';
  }

  /** @name CeresLiquidityLockerEvent (112) */
  interface CeresLiquidityLockerEvent extends Enum {
    readonly isLocked: boolean;
    readonly asLocked: ITuple<[AccountId32, u128, u64]>;
    readonly type: 'Locked';
  }

  /** @name CeresTokenLockerEvent (113) */
  interface CeresTokenLockerEvent extends Enum {
    readonly isLocked: boolean;
    readonly asLocked: ITuple<[AccountId32, u128, CommonPrimitivesAssetId32]>;
    readonly isWithdrawn: boolean;
    readonly asWithdrawn: ITuple<[AccountId32, u128, CommonPrimitivesAssetId32]>;
    readonly isFeeChanged: boolean;
    readonly asFeeChanged: ITuple<[AccountId32, u128]>;
    readonly type: 'Locked' | 'Withdrawn' | 'FeeChanged';
  }

  /** @name CeresGovernancePlatformEvent (114) */
  interface CeresGovernancePlatformEvent extends Enum {
    readonly isVoted: boolean;
    readonly asVoted: ITuple<[AccountId32, Bytes, u32, u128]>;
    readonly isCreated: boolean;
    readonly asCreated: ITuple<[AccountId32, u32, u64, u64]>;
    readonly isWithdrawn: boolean;
    readonly asWithdrawn: ITuple<[AccountId32, u128]>;
    readonly type: 'Voted' | 'Created' | 'Withdrawn';
  }

  /** @name CeresLaunchpadEvent (115) */
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

  /** @name DemeterFarmingPlatformEvent (116) */
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

  /** @name PalletBagsListEvent (117) */
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

  /** @name PalletElectionProviderMultiPhaseEvent (118) */
  interface PalletElectionProviderMultiPhaseEvent extends Enum {
    readonly isSolutionStored: boolean;
    readonly asSolutionStored: {
      readonly electionCompute: PalletElectionProviderMultiPhaseElectionCompute;
      readonly prevEjected: bool;
    } & Struct;
    readonly isElectionFinalized: boolean;
    readonly asElectionFinalized: {
      readonly electionCompute: Option<PalletElectionProviderMultiPhaseElectionCompute>;
    } & Struct;
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
    readonly isSignedPhaseStarted: boolean;
    readonly asSignedPhaseStarted: {
      readonly round: u32;
    } & Struct;
    readonly isUnsignedPhaseStarted: boolean;
    readonly asUnsignedPhaseStarted: {
      readonly round: u32;
    } & Struct;
    readonly type: 'SolutionStored' | 'ElectionFinalized' | 'Rewarded' | 'Slashed' | 'SignedPhaseStarted' | 'UnsignedPhaseStarted';
  }

  /** @name PalletElectionProviderMultiPhaseElectionCompute (119) */
  interface PalletElectionProviderMultiPhaseElectionCompute extends Enum {
    readonly isOnChain: boolean;
    readonly isSigned: boolean;
    readonly isUnsigned: boolean;
    readonly isFallback: boolean;
    readonly isEmergency: boolean;
    readonly type: 'OnChain' | 'Signed' | 'Unsigned' | 'Fallback' | 'Emergency';
  }

  /** @name BandEvent (121) */
  interface BandEvent extends Enum {
    readonly isSymbolsRelayed: boolean;
    readonly asSymbolsRelayed: Vec<Bytes>;
    readonly isRelayersAdded: boolean;
    readonly asRelayersAdded: Vec<AccountId32>;
    readonly isRelayersRemoved: boolean;
    readonly asRelayersRemoved: Vec<AccountId32>;
    readonly type: 'SymbolsRelayed' | 'RelayersAdded' | 'RelayersRemoved';
  }

  /** @name OracleProxyEvent (124) */
  interface OracleProxyEvent extends Enum {
    readonly isOracleEnabled: boolean;
    readonly asOracleEnabled: CommonPrimitivesOracle;
    readonly isOracleDisabled: boolean;
    readonly asOracleDisabled: CommonPrimitivesOracle;
    readonly type: 'OracleEnabled' | 'OracleDisabled';
  }

  /** @name CommonPrimitivesOracle (125) */
  interface CommonPrimitivesOracle extends Enum {
    readonly isBandChainFeed: boolean;
    readonly type: 'BandChainFeed';
  }

  /** @name HermesGovernancePlatformEvent (126) */
  interface HermesGovernancePlatformEvent extends Enum {
    readonly isVoted: boolean;
    readonly asVoted: ITuple<[AccountId32, H256, HermesGovernancePlatformVotingOption]>;
    readonly isCreated: boolean;
    readonly asCreated: ITuple<[AccountId32, Text, u64, u64]>;
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

  /** @name HermesGovernancePlatformVotingOption (127) */
  interface HermesGovernancePlatformVotingOption extends Enum {
    readonly isYes: boolean;
    readonly isNo: boolean;
    readonly type: 'Yes' | 'No';
  }

  /** @name FaucetEvent (128) */
  interface FaucetEvent extends Enum {
    readonly isTransferred: boolean;
    readonly asTransferred: ITuple<[AccountId32, u128]>;
    readonly isLimitUpdated: boolean;
    readonly asLimitUpdated: u128;
    readonly type: 'Transferred' | 'LimitUpdated';
  }

  /** @name FrameSystemPhase (129) */
  interface FrameSystemPhase extends Enum {
    readonly isApplyExtrinsic: boolean;
    readonly asApplyExtrinsic: u32;
    readonly isFinalization: boolean;
    readonly isInitialization: boolean;
    readonly type: 'ApplyExtrinsic' | 'Finalization' | 'Initialization';
  }

  /** @name FrameSystemLastRuntimeUpgradeInfo (132) */
  interface FrameSystemLastRuntimeUpgradeInfo extends Struct {
    readonly specVersion: Compact<u32>;
    readonly specName: Text;
  }

  /** @name FrameSystemCall (134) */
  interface FrameSystemCall extends Enum {
    readonly isFillBlock: boolean;
    readonly asFillBlock: {
      readonly ratio: Perbill;
    } & Struct;
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
    readonly type: 'FillBlock' | 'Remark' | 'SetHeapPages' | 'SetCode' | 'SetCodeWithoutChecks' | 'SetStorage' | 'KillStorage' | 'KillPrefix' | 'RemarkWithEvent';
  }

  /** @name FrameSystemLimitsBlockWeights (138) */
  interface FrameSystemLimitsBlockWeights extends Struct {
    readonly baseBlock: u64;
    readonly maxBlock: u64;
    readonly perClass: FrameSupportWeightsPerDispatchClassWeightsPerClass;
  }

  /** @name FrameSupportWeightsPerDispatchClassWeightsPerClass (139) */
  interface FrameSupportWeightsPerDispatchClassWeightsPerClass extends Struct {
    readonly normal: FrameSystemLimitsWeightsPerClass;
    readonly operational: FrameSystemLimitsWeightsPerClass;
    readonly mandatory: FrameSystemLimitsWeightsPerClass;
  }

  /** @name FrameSystemLimitsWeightsPerClass (140) */
  interface FrameSystemLimitsWeightsPerClass extends Struct {
    readonly baseExtrinsic: u64;
    readonly maxExtrinsic: Option<u64>;
    readonly maxTotal: Option<u64>;
    readonly reserved: Option<u64>;
  }

  /** @name FrameSystemLimitsBlockLength (142) */
  interface FrameSystemLimitsBlockLength extends Struct {
    readonly max: FrameSupportWeightsPerDispatchClassU32;
  }

  /** @name FrameSupportWeightsPerDispatchClassU32 (143) */
  interface FrameSupportWeightsPerDispatchClassU32 extends Struct {
    readonly normal: u32;
    readonly operational: u32;
    readonly mandatory: u32;
  }

  /** @name FrameSupportWeightsRuntimeDbWeight (144) */
  interface FrameSupportWeightsRuntimeDbWeight extends Struct {
    readonly read: u64;
    readonly write: u64;
  }

  /** @name SpVersionRuntimeVersion (145) */
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

  /** @name FrameSystemError (150) */
  interface FrameSystemError extends Enum {
    readonly isInvalidSpecName: boolean;
    readonly isSpecVersionNeedsToIncrease: boolean;
    readonly isFailedToExtractRuntimeVersion: boolean;
    readonly isNonDefaultComposite: boolean;
    readonly isNonZeroRefCount: boolean;
    readonly isCallFiltered: boolean;
    readonly type: 'InvalidSpecName' | 'SpecVersionNeedsToIncrease' | 'FailedToExtractRuntimeVersion' | 'NonDefaultComposite' | 'NonZeroRefCount' | 'CallFiltered';
  }

  /** @name SpConsensusBabeAppPublic (153) */
  interface SpConsensusBabeAppPublic extends SpCoreSr25519Public {}

  /** @name SpConsensusBabeDigestsNextConfigDescriptor (156) */
  interface SpConsensusBabeDigestsNextConfigDescriptor extends Enum {
    readonly isV1: boolean;
    readonly asV1: {
      readonly c: ITuple<[u64, u64]>;
      readonly allowedSlots: SpConsensusBabeAllowedSlots;
    } & Struct;
    readonly type: 'V1';
  }

  /** @name SpConsensusBabeAllowedSlots (158) */
  interface SpConsensusBabeAllowedSlots extends Enum {
    readonly isPrimarySlots: boolean;
    readonly isPrimaryAndSecondaryPlainSlots: boolean;
    readonly isPrimaryAndSecondaryVRFSlots: boolean;
    readonly type: 'PrimarySlots' | 'PrimaryAndSecondaryPlainSlots' | 'PrimaryAndSecondaryVRFSlots';
  }

  /** @name SpConsensusBabeDigestsPreDigest (162) */
  interface SpConsensusBabeDigestsPreDigest extends Enum {
    readonly isPrimary: boolean;
    readonly asPrimary: SpConsensusBabeDigestsPrimaryPreDigest;
    readonly isSecondaryPlain: boolean;
    readonly asSecondaryPlain: SpConsensusBabeDigestsSecondaryPlainPreDigest;
    readonly isSecondaryVRF: boolean;
    readonly asSecondaryVRF: SpConsensusBabeDigestsSecondaryVRFPreDigest;
    readonly type: 'Primary' | 'SecondaryPlain' | 'SecondaryVRF';
  }

  /** @name SpConsensusBabeDigestsPrimaryPreDigest (163) */
  interface SpConsensusBabeDigestsPrimaryPreDigest extends Struct {
    readonly authorityIndex: u32;
    readonly slot: u64;
    readonly vrfOutput: U8aFixed;
    readonly vrfProof: U8aFixed;
  }

  /** @name SpConsensusBabeDigestsSecondaryPlainPreDigest (165) */
  interface SpConsensusBabeDigestsSecondaryPlainPreDigest extends Struct {
    readonly authorityIndex: u32;
    readonly slot: u64;
  }

  /** @name SpConsensusBabeDigestsSecondaryVRFPreDigest (166) */
  interface SpConsensusBabeDigestsSecondaryVRFPreDigest extends Struct {
    readonly authorityIndex: u32;
    readonly slot: u64;
    readonly vrfOutput: U8aFixed;
    readonly vrfProof: U8aFixed;
  }

  /** @name SpConsensusBabeBabeEpochConfiguration (168) */
  interface SpConsensusBabeBabeEpochConfiguration extends Struct {
    readonly c: ITuple<[u64, u64]>;
    readonly allowedSlots: SpConsensusBabeAllowedSlots;
  }

  /** @name PalletBabeCall (169) */
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

  /** @name SpConsensusSlotsEquivocationProof (170) */
  interface SpConsensusSlotsEquivocationProof extends Struct {
    readonly offender: SpConsensusBabeAppPublic;
    readonly slot: u64;
    readonly firstHeader: SpRuntimeHeader;
    readonly secondHeader: SpRuntimeHeader;
  }

  /** @name SpRuntimeHeader (171) */
  interface SpRuntimeHeader extends Struct {
    readonly parentHash: H256;
    readonly number: Compact<u32>;
    readonly stateRoot: H256;
    readonly extrinsicsRoot: H256;
    readonly digest: SpRuntimeDigest;
  }

  /** @name SpRuntimeBlakeTwo256 (172) */
  type SpRuntimeBlakeTwo256 = Null;

  /** @name SpSessionMembershipProof (173) */
  interface SpSessionMembershipProof extends Struct {
    readonly session: u32;
    readonly trieNodes: Vec<Bytes>;
    readonly validatorCount: u32;
  }

  /** @name PalletBabeError (174) */
  interface PalletBabeError extends Enum {
    readonly isInvalidEquivocationProof: boolean;
    readonly isInvalidKeyOwnershipProof: boolean;
    readonly isDuplicateOffenceReport: boolean;
    readonly isInvalidConfiguration: boolean;
    readonly type: 'InvalidEquivocationProof' | 'InvalidKeyOwnershipProof' | 'DuplicateOffenceReport' | 'InvalidConfiguration';
  }

  /** @name PalletTimestampCall (175) */
  interface PalletTimestampCall extends Enum {
    readonly isSet: boolean;
    readonly asSet: {
      readonly now: Compact<u64>;
    } & Struct;
    readonly type: 'Set';
  }

  /** @name PalletBalancesBalanceLock (178) */
  interface PalletBalancesBalanceLock extends Struct {
    readonly id: U8aFixed;
    readonly amount: u128;
    readonly reasons: PalletBalancesReasons;
  }

  /** @name PalletBalancesReasons (179) */
  interface PalletBalancesReasons extends Enum {
    readonly isFee: boolean;
    readonly isMisc: boolean;
    readonly isAll: boolean;
    readonly type: 'Fee' | 'Misc' | 'All';
  }

  /** @name PalletBalancesReserveData (182) */
  interface PalletBalancesReserveData extends Struct {
    readonly id: Null;
    readonly amount: u128;
  }

  /** @name PalletBalancesReleases (184) */
  interface PalletBalancesReleases extends Enum {
    readonly isV100: boolean;
    readonly isV200: boolean;
    readonly type: 'V100' | 'V200';
  }

  /** @name PalletBalancesCall (185) */
  interface PalletBalancesCall extends Enum {
    readonly isTransfer: boolean;
    readonly asTransfer: {
      readonly dest: AccountId32;
      readonly value: Compact<u128>;
    } & Struct;
    readonly isSetBalance: boolean;
    readonly asSetBalance: {
      readonly who: AccountId32;
      readonly newFree: Compact<u128>;
      readonly newReserved: Compact<u128>;
    } & Struct;
    readonly isForceTransfer: boolean;
    readonly asForceTransfer: {
      readonly source: AccountId32;
      readonly dest: AccountId32;
      readonly value: Compact<u128>;
    } & Struct;
    readonly isTransferKeepAlive: boolean;
    readonly asTransferKeepAlive: {
      readonly dest: AccountId32;
      readonly value: Compact<u128>;
    } & Struct;
    readonly isTransferAll: boolean;
    readonly asTransferAll: {
      readonly dest: AccountId32;
      readonly keepAlive: bool;
    } & Struct;
    readonly isForceUnreserve: boolean;
    readonly asForceUnreserve: {
      readonly who: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly type: 'Transfer' | 'SetBalance' | 'ForceTransfer' | 'TransferKeepAlive' | 'TransferAll' | 'ForceUnreserve';
  }

  /** @name PalletBalancesError (186) */
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

  /** @name PalletSudoCall (187) */
  interface PalletSudoCall extends Enum {
    readonly isSudo: boolean;
    readonly asSudo: {
      readonly call: Call;
    } & Struct;
    readonly isSudoUncheckedWeight: boolean;
    readonly asSudoUncheckedWeight: {
      readonly call: Call;
      readonly weight: u64;
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

  /** @name PermissionsCall (189) */
  type PermissionsCall = Null;

  /** @name ReferralsCall (190) */
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

  /** @name RewardsCall (191) */
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

  /** @name XorFeeCall (195) */
  interface XorFeeCall extends Enum {
    readonly isUpdateMultiplier: boolean;
    readonly asUpdateMultiplier: {
      readonly newMultiplier: u128;
    } & Struct;
    readonly type: 'UpdateMultiplier';
  }

  /** @name PalletMultisigCall (196) */
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
      readonly maxWeight: u64;
    } & Struct;
    readonly isApproveAsMulti: boolean;
    readonly asApproveAsMulti: {
      readonly id: AccountId32;
      readonly maybeTimepoint: Option<PalletMultisigBridgeTimepoint>;
      readonly callHash: U8aFixed;
      readonly maxWeight: u64;
    } & Struct;
    readonly isCancelAsMulti: boolean;
    readonly asCancelAsMulti: {
      readonly id: AccountId32;
      readonly timepoint: PalletMultisigBridgeTimepoint;
      readonly callHash: U8aFixed;
    } & Struct;
    readonly type: 'RegisterMultisig' | 'RemoveSignatory' | 'AddSignatory' | 'AsMultiThreshold1' | 'AsMulti' | 'ApproveAsMulti' | 'CancelAsMulti';
  }

  /** @name PalletUtilityCall (198) */
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
    readonly type: 'Batch' | 'AsDerivative' | 'BatchAll' | 'DispatchAs' | 'ForceBatch';
  }

  /** @name FramenodeRuntimeOriginCaller (200) */
  interface FramenodeRuntimeOriginCaller extends Enum {
    readonly isSystem: boolean;
    readonly asSystem: FrameSupportDispatchRawOrigin;
    readonly isVoid: boolean;
    readonly isCouncil: boolean;
    readonly asCouncil: PalletCollectiveRawOrigin;
    readonly isTechnicalCommittee: boolean;
    readonly asTechnicalCommittee: PalletCollectiveRawOrigin;
    readonly type: 'System' | 'Void' | 'Council' | 'TechnicalCommittee';
  }

  /** @name FrameSupportDispatchRawOrigin (201) */
  interface FrameSupportDispatchRawOrigin extends Enum {
    readonly isRoot: boolean;
    readonly isSigned: boolean;
    readonly asSigned: AccountId32;
    readonly isNone: boolean;
    readonly type: 'Root' | 'Signed' | 'None';
  }

  /** @name PalletCollectiveRawOrigin (202) */
  interface PalletCollectiveRawOrigin extends Enum {
    readonly isMembers: boolean;
    readonly asMembers: ITuple<[u32, u32]>;
    readonly isMember: boolean;
    readonly asMember: AccountId32;
    readonly isPhantom: boolean;
    readonly type: 'Members' | 'Member' | 'Phantom';
  }

  /** @name SpCoreVoid (204) */
  type SpCoreVoid = Null;

  /** @name PalletAuthorshipCall (205) */
  interface PalletAuthorshipCall extends Enum {
    readonly isSetUncles: boolean;
    readonly asSetUncles: {
      readonly newUncles: Vec<SpRuntimeHeader>;
    } & Struct;
    readonly type: 'SetUncles';
  }

  /** @name PalletStakingPalletCall (207) */
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
    readonly isSetHistoryDepth: boolean;
    readonly asSetHistoryDepth: {
      readonly newHistoryDepth: Compact<u32>;
      readonly eraItemsDeleted: Compact<u32>;
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
    readonly type: 'Bond' | 'BondExtra' | 'Unbond' | 'WithdrawUnbonded' | 'Validate' | 'Nominate' | 'Chill' | 'SetPayee' | 'SetController' | 'SetValidatorCount' | 'IncreaseValidatorCount' | 'ScaleValidatorCount' | 'ForceNoEras' | 'ForceNewEra' | 'SetInvulnerables' | 'ForceUnstake' | 'ForceNewEraAlways' | 'CancelDeferredSlash' | 'PayoutStakers' | 'Rebond' | 'SetHistoryDepth' | 'ReapStash' | 'Kick' | 'SetStakingConfigs' | 'ChillOther' | 'ForceApplyMinCommission';
  }

  /** @name PalletStakingRewardDestination (208) */
  interface PalletStakingRewardDestination extends Enum {
    readonly isStaked: boolean;
    readonly isStash: boolean;
    readonly isController: boolean;
    readonly isAccount: boolean;
    readonly asAccount: AccountId32;
    readonly isNone: boolean;
    readonly type: 'Staked' | 'Stash' | 'Controller' | 'Account' | 'None';
  }

  /** @name PalletStakingPalletConfigOpU128 (211) */
  interface PalletStakingPalletConfigOpU128 extends Enum {
    readonly isNoop: boolean;
    readonly isSet: boolean;
    readonly asSet: u128;
    readonly isRemove: boolean;
    readonly type: 'Noop' | 'Set' | 'Remove';
  }

  /** @name PalletStakingPalletConfigOpU32 (212) */
  interface PalletStakingPalletConfigOpU32 extends Enum {
    readonly isNoop: boolean;
    readonly isSet: boolean;
    readonly asSet: u32;
    readonly isRemove: boolean;
    readonly type: 'Noop' | 'Set' | 'Remove';
  }

  /** @name PalletStakingPalletConfigOpPercent (213) */
  interface PalletStakingPalletConfigOpPercent extends Enum {
    readonly isNoop: boolean;
    readonly isSet: boolean;
    readonly asSet: Percent;
    readonly isRemove: boolean;
    readonly type: 'Noop' | 'Set' | 'Remove';
  }

  /** @name PalletStakingPalletConfigOpPerbill (214) */
  interface PalletStakingPalletConfigOpPerbill extends Enum {
    readonly isNoop: boolean;
    readonly isSet: boolean;
    readonly asSet: Perbill;
    readonly isRemove: boolean;
    readonly type: 'Noop' | 'Set' | 'Remove';
  }

  /** @name PalletSessionCall (215) */
  interface PalletSessionCall extends Enum {
    readonly isSetKeys: boolean;
    readonly asSetKeys: {
      readonly keys_: FramenodeRuntimeOpaqueSessionKeys;
      readonly proof: Bytes;
    } & Struct;
    readonly isPurgeKeys: boolean;
    readonly type: 'SetKeys' | 'PurgeKeys';
  }

  /** @name FramenodeRuntimeOpaqueSessionKeys (216) */
  interface FramenodeRuntimeOpaqueSessionKeys extends Struct {
    readonly babe: SpConsensusBabeAppPublic;
    readonly grandpa: SpFinalityGrandpaAppPublic;
    readonly imOnline: PalletImOnlineSr25519AppSr25519Public;
    readonly beefy: BeefyPrimitivesCryptoPublic;
  }

  /** @name BeefyPrimitivesCryptoPublic (217) */
  interface BeefyPrimitivesCryptoPublic extends SpCoreEcdsaPublic {}

  /** @name SpCoreEcdsaPublic (218) */
  interface SpCoreEcdsaPublic extends U8aFixed {}

  /** @name PalletGrandpaCall (220) */
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

  /** @name SpFinalityGrandpaEquivocationProof (221) */
  interface SpFinalityGrandpaEquivocationProof extends Struct {
    readonly setId: u64;
    readonly equivocation: SpFinalityGrandpaEquivocation;
  }

  /** @name SpFinalityGrandpaEquivocation (222) */
  interface SpFinalityGrandpaEquivocation extends Enum {
    readonly isPrevote: boolean;
    readonly asPrevote: FinalityGrandpaEquivocationPrevote;
    readonly isPrecommit: boolean;
    readonly asPrecommit: FinalityGrandpaEquivocationPrecommit;
    readonly type: 'Prevote' | 'Precommit';
  }

  /** @name FinalityGrandpaEquivocationPrevote (223) */
  interface FinalityGrandpaEquivocationPrevote extends Struct {
    readonly roundNumber: u64;
    readonly identity: SpFinalityGrandpaAppPublic;
    readonly first: ITuple<[FinalityGrandpaPrevote, SpFinalityGrandpaAppSignature]>;
    readonly second: ITuple<[FinalityGrandpaPrevote, SpFinalityGrandpaAppSignature]>;
  }

  /** @name FinalityGrandpaPrevote (224) */
  interface FinalityGrandpaPrevote extends Struct {
    readonly targetHash: H256;
    readonly targetNumber: u32;
  }

  /** @name SpFinalityGrandpaAppSignature (225) */
  interface SpFinalityGrandpaAppSignature extends SpCoreEd25519Signature {}

  /** @name SpCoreEd25519Signature (226) */
  interface SpCoreEd25519Signature extends U8aFixed {}

  /** @name FinalityGrandpaEquivocationPrecommit (228) */
  interface FinalityGrandpaEquivocationPrecommit extends Struct {
    readonly roundNumber: u64;
    readonly identity: SpFinalityGrandpaAppPublic;
    readonly first: ITuple<[FinalityGrandpaPrecommit, SpFinalityGrandpaAppSignature]>;
    readonly second: ITuple<[FinalityGrandpaPrecommit, SpFinalityGrandpaAppSignature]>;
  }

  /** @name FinalityGrandpaPrecommit (229) */
  interface FinalityGrandpaPrecommit extends Struct {
    readonly targetHash: H256;
    readonly targetNumber: u32;
  }

  /** @name PalletImOnlineCall (231) */
  interface PalletImOnlineCall extends Enum {
    readonly isHeartbeat: boolean;
    readonly asHeartbeat: {
      readonly heartbeat: PalletImOnlineHeartbeat;
      readonly signature: PalletImOnlineSr25519AppSr25519Signature;
    } & Struct;
    readonly type: 'Heartbeat';
  }

  /** @name PalletImOnlineHeartbeat (232) */
  interface PalletImOnlineHeartbeat extends Struct {
    readonly blockNumber: u32;
    readonly networkState: SpCoreOffchainOpaqueNetworkState;
    readonly sessionIndex: u32;
    readonly authorityIndex: u32;
    readonly validatorsLen: u32;
  }

  /** @name SpCoreOffchainOpaqueNetworkState (233) */
  interface SpCoreOffchainOpaqueNetworkState extends Struct {
    readonly peerId: OpaquePeerId;
    readonly externalAddresses: Vec<OpaqueMultiaddr>;
  }

  /** @name PalletImOnlineSr25519AppSr25519Signature (237) */
  interface PalletImOnlineSr25519AppSr25519Signature extends SpCoreSr25519Signature {}

  /** @name SpCoreSr25519Signature (238) */
  interface SpCoreSr25519Signature extends U8aFixed {}

  /** @name OrmlCurrenciesModuleCall (239) */
  interface OrmlCurrenciesModuleCall extends Enum {
    readonly isTransfer: boolean;
    readonly asTransfer: {
      readonly dest: AccountId32;
      readonly currencyId: CommonPrimitivesAssetId32;
      readonly amount: Compact<u128>;
    } & Struct;
    readonly isTransferNativeCurrency: boolean;
    readonly asTransferNativeCurrency: {
      readonly dest: AccountId32;
      readonly amount: Compact<u128>;
    } & Struct;
    readonly isUpdateBalance: boolean;
    readonly asUpdateBalance: {
      readonly who: AccountId32;
      readonly currencyId: CommonPrimitivesAssetId32;
      readonly amount: i128;
    } & Struct;
    readonly type: 'Transfer' | 'TransferNativeCurrency' | 'UpdateBalance';
  }

  /** @name TradingPairCall (240) */
  interface TradingPairCall extends Enum {
    readonly isRegister: boolean;
    readonly asRegister: {
      readonly dexId: u32;
      readonly baseAssetId: CommonPrimitivesAssetId32;
      readonly targetAssetId: CommonPrimitivesAssetId32;
    } & Struct;
    readonly type: 'Register';
  }

  /** @name AssetsCall (241) */
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
    readonly isSetNonMintable: boolean;
    readonly asSetNonMintable: {
      readonly assetId: CommonPrimitivesAssetId32;
    } & Struct;
    readonly type: 'Register' | 'Transfer' | 'Mint' | 'ForceMint' | 'Burn' | 'SetNonMintable';
  }

  /** @name MulticollateralBondingCurvePoolCall (248) */
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

  /** @name TechnicalCall (249) */
  type TechnicalCall = Null;

  /** @name PoolXykCall (250) */
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

  /** @name LiquidityProxyCall (251) */
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
      readonly receivers: Vec<LiquidityProxyBatchReceiverInfo>;
      readonly dexId: u32;
      readonly inputAssetId: CommonPrimitivesAssetId32;
      readonly outputAssetId: CommonPrimitivesAssetId32;
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
    readonly type: 'Swap' | 'SwapTransfer' | 'SwapTransferBatch' | 'EnableLiquiditySource' | 'DisableLiquiditySource';
  }

  /** @name CommonSwapAmount (252) */
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

  /** @name CommonPrimitivesFilterMode (254) */
  interface CommonPrimitivesFilterMode extends Enum {
    readonly isDisabled: boolean;
    readonly isForbidSelected: boolean;
    readonly isAllowSelected: boolean;
    readonly type: 'Disabled' | 'ForbidSelected' | 'AllowSelected';
  }

  /** @name LiquidityProxyBatchReceiverInfo (256) */
  interface LiquidityProxyBatchReceiverInfo extends Struct {
    readonly accountId: AccountId32;
    readonly targetAmount: u128;
  }

  /** @name PalletCollectiveCall (257) */
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
    readonly isClose: boolean;
    readonly asClose: {
      readonly proposalHash: H256;
      readonly index: Compact<u32>;
      readonly proposalWeightBound: Compact<u64>;
      readonly lengthBound: Compact<u32>;
    } & Struct;
    readonly isDisapproveProposal: boolean;
    readonly asDisapproveProposal: {
      readonly proposalHash: H256;
    } & Struct;
    readonly type: 'SetMembers' | 'Execute' | 'Propose' | 'Vote' | 'Close' | 'DisapproveProposal';
  }

  /** @name PalletDemocracyCall (259) */
  interface PalletDemocracyCall extends Enum {
    readonly isPropose: boolean;
    readonly asPropose: {
      readonly proposalHash: H256;
      readonly value: Compact<u128>;
    } & Struct;
    readonly isSecond: boolean;
    readonly asSecond: {
      readonly proposal: Compact<u32>;
      readonly secondsUpperBound: Compact<u32>;
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
      readonly proposalHash: H256;
    } & Struct;
    readonly isExternalProposeMajority: boolean;
    readonly asExternalProposeMajority: {
      readonly proposalHash: H256;
    } & Struct;
    readonly isExternalProposeDefault: boolean;
    readonly asExternalProposeDefault: {
      readonly proposalHash: H256;
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
    readonly isCancelQueued: boolean;
    readonly asCancelQueued: {
      readonly which: u32;
    } & Struct;
    readonly isDelegate: boolean;
    readonly asDelegate: {
      readonly to: AccountId32;
      readonly conviction: PalletDemocracyConviction;
      readonly balance: u128;
    } & Struct;
    readonly isUndelegate: boolean;
    readonly isClearPublicProposals: boolean;
    readonly isNotePreimage: boolean;
    readonly asNotePreimage: {
      readonly encodedProposal: Bytes;
    } & Struct;
    readonly isNotePreimageOperational: boolean;
    readonly asNotePreimageOperational: {
      readonly encodedProposal: Bytes;
    } & Struct;
    readonly isNoteImminentPreimage: boolean;
    readonly asNoteImminentPreimage: {
      readonly encodedProposal: Bytes;
    } & Struct;
    readonly isNoteImminentPreimageOperational: boolean;
    readonly asNoteImminentPreimageOperational: {
      readonly encodedProposal: Bytes;
    } & Struct;
    readonly isReapPreimage: boolean;
    readonly asReapPreimage: {
      readonly proposalHash: H256;
      readonly proposalLenUpperBound: Compact<u32>;
    } & Struct;
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
    readonly isEnactProposal: boolean;
    readonly asEnactProposal: {
      readonly proposalHash: H256;
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
    readonly type: 'Propose' | 'Second' | 'Vote' | 'EmergencyCancel' | 'ExternalPropose' | 'ExternalProposeMajority' | 'ExternalProposeDefault' | 'FastTrack' | 'VetoExternal' | 'CancelReferendum' | 'CancelQueued' | 'Delegate' | 'Undelegate' | 'ClearPublicProposals' | 'NotePreimage' | 'NotePreimageOperational' | 'NoteImminentPreimage' | 'NoteImminentPreimageOperational' | 'ReapPreimage' | 'Unlock' | 'RemoveVote' | 'RemoveOtherVote' | 'EnactProposal' | 'Blacklist' | 'CancelProposal';
  }

  /** @name PalletDemocracyConviction (260) */
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

  /** @name DexApiCall (262) */
  type DexApiCall = Null;

  /** @name EthBridgeCall (263) */
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

  /** @name EthBridgeBridgeSignatureVersion (264) */
  interface EthBridgeBridgeSignatureVersion extends Enum {
    readonly isV1: boolean;
    readonly isV2: boolean;
    readonly isV3: boolean;
    readonly type: 'V1' | 'V2' | 'V3';
  }

  /** @name EthBridgeRequestsIncomingRequestKind (265) */
  interface EthBridgeRequestsIncomingRequestKind extends Enum {
    readonly isTransaction: boolean;
    readonly asTransaction: EthBridgeRequestsIncomingTransactionRequestKind;
    readonly isMeta: boolean;
    readonly asMeta: EthBridgeRequestsIncomingMetaRequestKind;
    readonly type: 'Transaction' | 'Meta';
  }

  /** @name EthBridgeRequestsIncomingTransactionRequestKind (266) */
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

  /** @name EthBridgeRequestsIncomingMetaRequestKind (267) */
  interface EthBridgeRequestsIncomingMetaRequestKind extends Enum {
    readonly isCancelOutgoingRequest: boolean;
    readonly isMarkAsDone: boolean;
    readonly type: 'CancelOutgoingRequest' | 'MarkAsDone';
  }

  /** @name EthBridgeRequestsIncomingRequest (269) */
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

  /** @name EthBridgeRequestsIncomingIncomingTransfer (270) */
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

  /** @name EthBridgeRequestsAssetKind (271) */
  interface EthBridgeRequestsAssetKind extends Enum {
    readonly isThischain: boolean;
    readonly isSidechain: boolean;
    readonly isSidechainOwned: boolean;
    readonly type: 'Thischain' | 'Sidechain' | 'SidechainOwned';
  }

  /** @name EthBridgeRequestsIncomingIncomingAddToken (272) */
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

  /** @name EthBridgeRequestsIncomingIncomingChangePeers (273) */
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

  /** @name EthBridgeRequestsIncomingIncomingCancelOutgoingRequest (274) */
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

  /** @name EthBridgeRequestsOutgoingRequest (275) */
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

  /** @name EthBridgeRequestsOutgoingOutgoingTransfer (276) */
  interface EthBridgeRequestsOutgoingOutgoingTransfer extends Struct {
    readonly from: AccountId32;
    readonly to: H160;
    readonly assetId: CommonPrimitivesAssetId32;
    readonly amount: u128;
    readonly nonce: u32;
    readonly networkId: u32;
    readonly timepoint: PalletMultisigBridgeTimepoint;
  }

  /** @name EthBridgeRequestsOutgoingOutgoingAddAsset (277) */
  interface EthBridgeRequestsOutgoingOutgoingAddAsset extends Struct {
    readonly author: AccountId32;
    readonly assetId: CommonPrimitivesAssetId32;
    readonly nonce: u32;
    readonly networkId: u32;
    readonly timepoint: PalletMultisigBridgeTimepoint;
  }

  /** @name EthBridgeRequestsOutgoingOutgoingAddToken (278) */
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

  /** @name EthBridgeRequestsOutgoingOutgoingAddPeer (279) */
  interface EthBridgeRequestsOutgoingOutgoingAddPeer extends Struct {
    readonly author: AccountId32;
    readonly peerAddress: H160;
    readonly peerAccountId: AccountId32;
    readonly nonce: u32;
    readonly networkId: u32;
    readonly timepoint: PalletMultisigBridgeTimepoint;
  }

  /** @name EthBridgeRequestsOutgoingOutgoingRemovePeer (280) */
  interface EthBridgeRequestsOutgoingOutgoingRemovePeer extends Struct {
    readonly author: AccountId32;
    readonly peerAccountId: AccountId32;
    readonly peerAddress: H160;
    readonly nonce: u32;
    readonly networkId: u32;
    readonly timepoint: PalletMultisigBridgeTimepoint;
    readonly compatHash: Option<H256>;
  }

  /** @name EthBridgeRequestsOutgoingOutgoingPrepareForMigration (282) */
  interface EthBridgeRequestsOutgoingOutgoingPrepareForMigration extends Struct {
    readonly author: AccountId32;
    readonly nonce: u32;
    readonly networkId: u32;
    readonly timepoint: PalletMultisigBridgeTimepoint;
  }

  /** @name EthBridgeRequestsOutgoingOutgoingMigrate (283) */
  interface EthBridgeRequestsOutgoingOutgoingMigrate extends Struct {
    readonly author: AccountId32;
    readonly newContractAddress: H160;
    readonly erc20NativeTokens: Vec<H160>;
    readonly nonce: u32;
    readonly networkId: u32;
    readonly timepoint: PalletMultisigBridgeTimepoint;
    readonly newSignatureVersion: EthBridgeBridgeSignatureVersion;
  }

  /** @name EthBridgeRequestsOutgoingOutgoingAddPeerCompat (284) */
  interface EthBridgeRequestsOutgoingOutgoingAddPeerCompat extends Struct {
    readonly author: AccountId32;
    readonly peerAddress: H160;
    readonly peerAccountId: AccountId32;
    readonly nonce: u32;
    readonly networkId: u32;
    readonly timepoint: PalletMultisigBridgeTimepoint;
  }

  /** @name EthBridgeRequestsOutgoingOutgoingRemovePeerCompat (285) */
  interface EthBridgeRequestsOutgoingOutgoingRemovePeerCompat extends Struct {
    readonly author: AccountId32;
    readonly peerAccountId: AccountId32;
    readonly peerAddress: H160;
    readonly nonce: u32;
    readonly networkId: u32;
    readonly timepoint: PalletMultisigBridgeTimepoint;
  }

  /** @name EthBridgeRequestsIncomingIncomingMarkAsDoneRequest (286) */
  interface EthBridgeRequestsIncomingIncomingMarkAsDoneRequest extends Struct {
    readonly outgoingRequestHash: H256;
    readonly initialRequestHash: H256;
    readonly author: AccountId32;
    readonly atHeight: u64;
    readonly timepoint: PalletMultisigBridgeTimepoint;
    readonly networkId: u32;
  }

  /** @name EthBridgeRequestsIncomingIncomingPrepareForMigration (287) */
  interface EthBridgeRequestsIncomingIncomingPrepareForMigration extends Struct {
    readonly author: AccountId32;
    readonly txHash: H256;
    readonly atHeight: u64;
    readonly timepoint: PalletMultisigBridgeTimepoint;
    readonly networkId: u32;
  }

  /** @name EthBridgeRequestsIncomingIncomingMigrate (288) */
  interface EthBridgeRequestsIncomingIncomingMigrate extends Struct {
    readonly newContractAddress: H160;
    readonly author: AccountId32;
    readonly txHash: H256;
    readonly atHeight: u64;
    readonly timepoint: PalletMultisigBridgeTimepoint;
    readonly networkId: u32;
  }

  /** @name EthBridgeRequestsIncomingIncomingChangePeersCompat (289) */
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

  /** @name EthBridgeRequestsIncomingChangePeersContract (290) */
  interface EthBridgeRequestsIncomingChangePeersContract extends Enum {
    readonly isXor: boolean;
    readonly isVal: boolean;
    readonly type: 'Xor' | 'Val';
  }

  /** @name EthBridgeRequestsLoadIncomingRequest (291) */
  interface EthBridgeRequestsLoadIncomingRequest extends Enum {
    readonly isTransaction: boolean;
    readonly asTransaction: EthBridgeRequestsLoadIncomingTransactionRequest;
    readonly isMeta: boolean;
    readonly asMeta: ITuple<[EthBridgeRequestsLoadIncomingMetaRequest, H256]>;
    readonly type: 'Transaction' | 'Meta';
  }

  /** @name EthBridgeRequestsLoadIncomingTransactionRequest (292) */
  interface EthBridgeRequestsLoadIncomingTransactionRequest extends Struct {
    readonly author: AccountId32;
    readonly hash_: H256;
    readonly timepoint: PalletMultisigBridgeTimepoint;
    readonly kind: EthBridgeRequestsIncomingTransactionRequestKind;
    readonly networkId: u32;
  }

  /** @name EthBridgeRequestsLoadIncomingMetaRequest (293) */
  interface EthBridgeRequestsLoadIncomingMetaRequest extends Struct {
    readonly author: AccountId32;
    readonly hash_: H256;
    readonly timepoint: PalletMultisigBridgeTimepoint;
    readonly kind: EthBridgeRequestsIncomingMetaRequestKind;
    readonly networkId: u32;
  }

  /** @name EthBridgeOffchainSignatureParams (295) */
  interface EthBridgeOffchainSignatureParams extends Struct {
    readonly r: U8aFixed;
    readonly s: U8aFixed;
    readonly v: u8;
  }

  /** @name PswapDistributionCall (296) */
  interface PswapDistributionCall extends Enum {
    readonly isClaimIncentive: boolean;
    readonly type: 'ClaimIncentive';
  }

  /** @name PalletSchedulerCall (300) */
  interface PalletSchedulerCall extends Enum {
    readonly isSchedule: boolean;
    readonly asSchedule: {
      readonly when: u32;
      readonly maybePeriodic: Option<ITuple<[u32, u32]>>;
      readonly priority: u8;
      readonly call: FrameSupportScheduleMaybeHashed;
    } & Struct;
    readonly isCancel: boolean;
    readonly asCancel: {
      readonly when: u32;
      readonly index: u32;
    } & Struct;
    readonly isScheduleNamed: boolean;
    readonly asScheduleNamed: {
      readonly id: Bytes;
      readonly when: u32;
      readonly maybePeriodic: Option<ITuple<[u32, u32]>>;
      readonly priority: u8;
      readonly call: FrameSupportScheduleMaybeHashed;
    } & Struct;
    readonly isCancelNamed: boolean;
    readonly asCancelNamed: {
      readonly id: Bytes;
    } & Struct;
    readonly isScheduleAfter: boolean;
    readonly asScheduleAfter: {
      readonly after: u32;
      readonly maybePeriodic: Option<ITuple<[u32, u32]>>;
      readonly priority: u8;
      readonly call: FrameSupportScheduleMaybeHashed;
    } & Struct;
    readonly isScheduleNamedAfter: boolean;
    readonly asScheduleNamedAfter: {
      readonly id: Bytes;
      readonly after: u32;
      readonly maybePeriodic: Option<ITuple<[u32, u32]>>;
      readonly priority: u8;
      readonly call: FrameSupportScheduleMaybeHashed;
    } & Struct;
    readonly type: 'Schedule' | 'Cancel' | 'ScheduleNamed' | 'CancelNamed' | 'ScheduleAfter' | 'ScheduleNamedAfter';
  }

  /** @name FrameSupportScheduleMaybeHashed (302) */
  interface FrameSupportScheduleMaybeHashed extends Enum {
    readonly isValue: boolean;
    readonly asValue: Call;
    readonly isHash: boolean;
    readonly asHash: H256;
    readonly type: 'Value' | 'Hash';
  }

  /** @name IrohaMigrationCall (303) */
  interface IrohaMigrationCall extends Enum {
    readonly isMigrate: boolean;
    readonly asMigrate: {
      readonly irohaAddress: Text;
      readonly irohaPublicKey: Text;
      readonly irohaSignature: Text;
    } & Struct;
    readonly type: 'Migrate';
  }

  /** @name PalletMembershipCall (304) */
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

  /** @name PalletElectionsPhragmenCall (305) */
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
      readonly hasReplacement: bool;
    } & Struct;
    readonly isCleanDefunctVoters: boolean;
    readonly asCleanDefunctVoters: {
      readonly numVoters: u32;
      readonly numDefunct: u32;
    } & Struct;
    readonly type: 'Vote' | 'RemoveVoter' | 'SubmitCandidacy' | 'RenounceCandidacy' | 'RemoveMember' | 'CleanDefunctVoters';
  }

  /** @name PalletElectionsPhragmenRenouncing (306) */
  interface PalletElectionsPhragmenRenouncing extends Enum {
    readonly isMember: boolean;
    readonly isRunnerUp: boolean;
    readonly isCandidate: boolean;
    readonly asCandidate: Compact<u32>;
    readonly type: 'Member' | 'RunnerUp' | 'Candidate';
  }

  /** @name VestedRewardsCall (307) */
  interface VestedRewardsCall extends Enum {
    readonly isClaimRewards: boolean;
    readonly isClaimCrowdloanRewards: boolean;
    readonly asClaimCrowdloanRewards: {
      readonly assetId: CommonPrimitivesAssetId32;
    } & Struct;
    readonly type: 'ClaimRewards' | 'ClaimCrowdloanRewards';
  }

  /** @name PalletIdentityCall (308) */
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

  /** @name PalletIdentityIdentityInfo (309) */
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

  /** @name PalletIdentityBitFlags (345) */
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

  /** @name PalletIdentityIdentityField (346) */
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

  /** @name PalletIdentityJudgement (347) */
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

  /** @name XstCall (348) */
  interface XstCall extends Enum {
    readonly isInitializePool: boolean;
    readonly asInitializePool: {
      readonly syntheticAssetId: CommonPrimitivesAssetId32;
    } & Struct;
    readonly isSetReferenceAsset: boolean;
    readonly asSetReferenceAsset: {
      readonly referenceAssetId: CommonPrimitivesAssetId32;
    } & Struct;
    readonly isEnableSyntheticAsset: boolean;
    readonly asEnableSyntheticAsset: {
      readonly syntheticAsset: CommonPrimitivesAssetId32;
    } & Struct;
    readonly isSetSyntheticBaseAssetFloorPrice: boolean;
    readonly asSetSyntheticBaseAssetFloorPrice: {
      readonly floorPrice: u128;
    } & Struct;
    readonly type: 'InitializePool' | 'SetReferenceAsset' | 'EnableSyntheticAsset' | 'SetSyntheticBaseAssetFloorPrice';
  }

  /** @name CeresStakingCall (349) */
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

  /** @name CeresLiquidityLockerCall (350) */
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

  /** @name CeresTokenLockerCall (351) */
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

  /** @name CeresGovernancePlatformCall (352) */
  interface CeresGovernancePlatformCall extends Enum {
    readonly isVote: boolean;
    readonly asVote: {
      readonly pollId: Bytes;
      readonly votingOption: u32;
      readonly numberOfVotes: u128;
    } & Struct;
    readonly isCreatePoll: boolean;
    readonly asCreatePoll: {
      readonly pollId: Bytes;
      readonly numberOfOptions: u32;
      readonly pollStartTimestamp: u64;
      readonly pollEndTimestamp: u64;
    } & Struct;
    readonly isWithdraw: boolean;
    readonly asWithdraw: {
      readonly pollId: Bytes;
    } & Struct;
    readonly type: 'Vote' | 'CreatePoll' | 'Withdraw';
  }

  /** @name CeresLaunchpadCall (353) */
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

  /** @name DemeterFarmingPlatformCall (354) */
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

  /** @name PalletBagsListCall (355) */
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

  /** @name PalletElectionProviderMultiPhaseCall (356) */
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

  /** @name PalletElectionProviderMultiPhaseRawSolution (357) */
  interface PalletElectionProviderMultiPhaseRawSolution extends Struct {
    readonly solution: FramenodeRuntimeNposCompactSolution24;
    readonly score: SpNposElectionsElectionScore;
    readonly round: u32;
  }

  /** @name FramenodeRuntimeNposCompactSolution24 (358) */
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

  /** @name SpNposElectionsElectionScore (433) */
  interface SpNposElectionsElectionScore extends Struct {
    readonly minimalStake: u128;
    readonly sumStake: u128;
    readonly sumStakeSquared: u128;
  }

  /** @name PalletElectionProviderMultiPhaseSolutionOrSnapshotSize (434) */
  interface PalletElectionProviderMultiPhaseSolutionOrSnapshotSize extends Struct {
    readonly voters: Compact<u32>;
    readonly targets: Compact<u32>;
  }

  /** @name SpNposElectionsSupport (438) */
  interface SpNposElectionsSupport extends Struct {
    readonly total: u128;
    readonly voters: Vec<ITuple<[AccountId32, u128]>>;
  }

  /** @name BandCall (439) */
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
    readonly type: 'Relay' | 'ForceRelay' | 'AddRelayers' | 'RemoveRelayers';
  }

  /** @name OracleProxyCall (442) */
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

  /** @name HermesGovernancePlatformCall (443) */
  interface HermesGovernancePlatformCall extends Enum {
    readonly isVote: boolean;
    readonly asVote: {
      readonly pollId: H256;
      readonly votingOption: HermesGovernancePlatformVotingOption;
    } & Struct;
    readonly isCreatePoll: boolean;
    readonly asCreatePoll: {
      readonly pollStartTimestamp: u64;
      readonly pollEndTimestamp: u64;
      readonly title: Text;
      readonly description: Text;
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

  /** @name FaucetCall (444) */
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

  /** @name PalletSudoError (445) */
  interface PalletSudoError extends Enum {
    readonly isRequireSudo: boolean;
    readonly type: 'RequireSudo';
  }

  /** @name PalletTransactionPaymentReleases (447) */
  interface PalletTransactionPaymentReleases extends Enum {
    readonly isV1Ancient: boolean;
    readonly isV2: boolean;
    readonly type: 'V1Ancient' | 'V2';
  }

  /** @name PermissionsScope (449) */
  interface PermissionsScope extends Enum {
    readonly isLimited: boolean;
    readonly asLimited: H512;
    readonly isUnlimited: boolean;
    readonly type: 'Limited' | 'Unlimited';
  }

  /** @name PermissionsError (452) */
  interface PermissionsError extends Enum {
    readonly isPermissionNotFound: boolean;
    readonly isPermissionNotOwned: boolean;
    readonly isPermissionAlreadyExists: boolean;
    readonly isForbidden: boolean;
    readonly isIncRefError: boolean;
    readonly type: 'PermissionNotFound' | 'PermissionNotOwned' | 'PermissionAlreadyExists' | 'Forbidden' | 'IncRefError';
  }

  /** @name ReferralsError (453) */
  interface ReferralsError extends Enum {
    readonly isAlreadyHasReferrer: boolean;
    readonly isIncRefError: boolean;
    readonly isReferrerInsufficientBalance: boolean;
    readonly type: 'AlreadyHasReferrer' | 'IncRefError' | 'ReferrerInsufficientBalance';
  }

  /** @name RewardsRewardInfo (454) */
  interface RewardsRewardInfo extends Struct {
    readonly claimable: u128;
    readonly total: u128;
  }

  /** @name RewardsError (457) */
  interface RewardsError extends Enum {
    readonly isNothingToClaim: boolean;
    readonly isAddressNotEligible: boolean;
    readonly isSignatureInvalid: boolean;
    readonly isSignatureVerificationFailed: boolean;
    readonly isIllegalCall: boolean;
    readonly type: 'NothingToClaim' | 'AddressNotEligible' | 'SignatureInvalid' | 'SignatureVerificationFailed' | 'IllegalCall';
  }

  /** @name PalletMultisigMultisigAccount (458) */
  interface PalletMultisigMultisigAccount extends Struct {
    readonly signatories: Vec<AccountId32>;
    readonly threshold: Percent;
  }

  /** @name PalletMultisigMultisig (460) */
  interface PalletMultisigMultisig extends Struct {
    readonly when: PalletMultisigBridgeTimepoint;
    readonly deposit: u128;
    readonly depositor: AccountId32;
    readonly approvals: Vec<AccountId32>;
  }

  /** @name PalletMultisigError (463) */
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

  /** @name PalletUtilityError (464) */
  interface PalletUtilityError extends Enum {
    readonly isTooManyCalls: boolean;
    readonly type: 'TooManyCalls';
  }

  /** @name PalletAuthorshipUncleEntryItem (466) */
  interface PalletAuthorshipUncleEntryItem extends Enum {
    readonly isInclusionHeight: boolean;
    readonly asInclusionHeight: u32;
    readonly isUncle: boolean;
    readonly asUncle: ITuple<[H256, Option<AccountId32>]>;
    readonly type: 'InclusionHeight' | 'Uncle';
  }

  /** @name PalletAuthorshipError (467) */
  interface PalletAuthorshipError extends Enum {
    readonly isInvalidUncleParent: boolean;
    readonly isUnclesAlreadySet: boolean;
    readonly isTooManyUncles: boolean;
    readonly isGenesisUncle: boolean;
    readonly isTooHighUncle: boolean;
    readonly isUncleAlreadyIncluded: boolean;
    readonly isOldUncle: boolean;
    readonly type: 'InvalidUncleParent' | 'UnclesAlreadySet' | 'TooManyUncles' | 'GenesisUncle' | 'TooHighUncle' | 'UncleAlreadyIncluded' | 'OldUncle';
  }

  /** @name PalletStakingSoraDurationWrapper (468) */
  interface PalletStakingSoraDurationWrapper extends Struct {
    readonly secs: u64;
    readonly nanos: u32;
  }

  /** @name PalletStakingStakingLedger (469) */
  interface PalletStakingStakingLedger extends Struct {
    readonly stash: AccountId32;
    readonly total: Compact<u128>;
    readonly active: Compact<u128>;
    readonly unlocking: Vec<PalletStakingUnlockChunk>;
    readonly claimedRewards: Vec<u32>;
  }

  /** @name PalletStakingUnlockChunk (471) */
  interface PalletStakingUnlockChunk extends Struct {
    readonly value: Compact<u128>;
    readonly era: Compact<u32>;
  }

  /** @name PalletStakingNominations (473) */
  interface PalletStakingNominations extends Struct {
    readonly targets: Vec<AccountId32>;
    readonly submittedIn: u32;
    readonly suppressed: bool;
  }

  /** @name PalletStakingActiveEraInfo (475) */
  interface PalletStakingActiveEraInfo extends Struct {
    readonly index: u32;
    readonly start: Option<u64>;
  }

  /** @name PalletStakingEraRewardPoints (477) */
  interface PalletStakingEraRewardPoints extends Struct {
    readonly total: u32;
    readonly individual: BTreeMap<AccountId32, u32>;
  }

  /** @name PalletStakingForcing (481) */
  interface PalletStakingForcing extends Enum {
    readonly isNotForcing: boolean;
    readonly isForceNew: boolean;
    readonly isForceNone: boolean;
    readonly isForceAlways: boolean;
    readonly type: 'NotForcing' | 'ForceNew' | 'ForceNone' | 'ForceAlways';
  }

  /** @name PalletStakingUnappliedSlash (483) */
  interface PalletStakingUnappliedSlash extends Struct {
    readonly validator: AccountId32;
    readonly own: u128;
    readonly others: Vec<ITuple<[AccountId32, u128]>>;
    readonly reporters: Vec<AccountId32>;
    readonly payout: u128;
  }

  /** @name PalletStakingSlashingSlashingSpans (485) */
  interface PalletStakingSlashingSlashingSpans extends Struct {
    readonly spanIndex: u32;
    readonly lastStart: u32;
    readonly lastNonzeroSlash: u32;
    readonly prior: Vec<u32>;
  }

  /** @name PalletStakingSlashingSpanRecord (486) */
  interface PalletStakingSlashingSpanRecord extends Struct {
    readonly slashed: u128;
    readonly paidOut: u128;
  }

  /** @name PalletStakingReleases (489) */
  interface PalletStakingReleases extends Enum {
    readonly isV100Ancient: boolean;
    readonly isV200: boolean;
    readonly isV300: boolean;
    readonly isV400: boolean;
    readonly isV500: boolean;
    readonly isV600: boolean;
    readonly isV700: boolean;
    readonly isV800: boolean;
    readonly isV900: boolean;
    readonly type: 'V100Ancient' | 'V200' | 'V300' | 'V400' | 'V500' | 'V600' | 'V700' | 'V800' | 'V900';
  }

  /** @name PalletStakingPalletError (490) */
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
    readonly type: 'NotController' | 'NotStash' | 'AlreadyBonded' | 'AlreadyPaired' | 'EmptyTargets' | 'DuplicateIndex' | 'InvalidSlashIndex' | 'InsufficientBond' | 'NoMoreChunks' | 'NoUnlockChunk' | 'FundedTarget' | 'InvalidEraToReward' | 'InvalidNumberOfNominations' | 'NotSortedAndUnique' | 'AlreadyClaimed' | 'IncorrectHistoryDepth' | 'IncorrectSlashingSpans' | 'BadState' | 'TooManyTargets' | 'BadTarget' | 'CannotChillOther' | 'TooManyNominators' | 'TooManyValidators' | 'CommissionTooLow';
  }

  /** @name SpStakingOffenceOffenceDetails (491) */
  interface SpStakingOffenceOffenceDetails extends Struct {
    readonly offender: ITuple<[AccountId32, PalletStakingExposure]>;
    readonly reporters: Vec<AccountId32>;
  }

  /** @name SpCoreCryptoKeyTypeId (496) */
  interface SpCoreCryptoKeyTypeId extends U8aFixed {}

  /** @name PalletSessionError (497) */
  interface PalletSessionError extends Enum {
    readonly isInvalidProof: boolean;
    readonly isNoAssociatedValidatorId: boolean;
    readonly isDuplicatedKey: boolean;
    readonly isNoKeys: boolean;
    readonly isNoAccount: boolean;
    readonly type: 'InvalidProof' | 'NoAssociatedValidatorId' | 'DuplicatedKey' | 'NoKeys' | 'NoAccount';
  }

  /** @name PalletGrandpaStoredState (498) */
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

  /** @name PalletGrandpaStoredPendingChange (499) */
  interface PalletGrandpaStoredPendingChange extends Struct {
    readonly scheduledAt: u32;
    readonly delay: u32;
    readonly nextAuthorities: Vec<ITuple<[SpFinalityGrandpaAppPublic, u64]>>;
    readonly forced: Option<u32>;
  }

  /** @name PalletGrandpaError (501) */
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

  /** @name PalletImOnlineBoundedOpaqueNetworkState (505) */
  interface PalletImOnlineBoundedOpaqueNetworkState extends Struct {
    readonly peerId: Bytes;
    readonly externalAddresses: Vec<Bytes>;
  }

  /** @name PalletImOnlineError (509) */
  interface PalletImOnlineError extends Enum {
    readonly isInvalidKey: boolean;
    readonly isDuplicatedHeartbeat: boolean;
    readonly type: 'InvalidKey' | 'DuplicatedHeartbeat';
  }

  /** @name OrmlTokensBalanceLock (512) */
  interface OrmlTokensBalanceLock extends Struct {
    readonly id: U8aFixed;
    readonly amount: u128;
  }

  /** @name OrmlTokensAccountData (514) */
  interface OrmlTokensAccountData extends Struct {
    readonly free: u128;
    readonly reserved: u128;
    readonly frozen: u128;
  }

  /** @name OrmlTokensReserveData (516) */
  interface OrmlTokensReserveData extends Struct {
    readonly id: Null;
    readonly amount: u128;
  }

  /** @name OrmlTokensModuleError (518) */
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

  /** @name OrmlCurrenciesModuleError (519) */
  interface OrmlCurrenciesModuleError extends Enum {
    readonly isAmountIntoBalanceFailed: boolean;
    readonly isBalanceTooLow: boolean;
    readonly isDepositFailed: boolean;
    readonly type: 'AmountIntoBalanceFailed' | 'BalanceTooLow' | 'DepositFailed';
  }

  /** @name TradingPairError (522) */
  interface TradingPairError extends Enum {
    readonly isTradingPairExists: boolean;
    readonly isForbiddenBaseAssetId: boolean;
    readonly isIdenticalAssetIds: boolean;
    readonly isTradingPairDoesntExist: boolean;
    readonly type: 'TradingPairExists' | 'ForbiddenBaseAssetId' | 'IdenticalAssetIds' | 'TradingPairDoesntExist';
  }

  /** @name AssetsAssetRecord (524) */
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

  /** @name AssetsAssetRecordArg (525) */
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

  /** @name CommonPrimitivesAssetIdExtraAssetRecordArg (527) */
  interface CommonPrimitivesAssetIdExtraAssetRecordArg extends Enum {
    readonly isDexId: boolean;
    readonly asDexId: u32;
    readonly isLstId: boolean;
    readonly asLstId: CommonPrimitivesLiquiditySourceType;
    readonly isAccountId: boolean;
    readonly asAccountId: U8aFixed;
    readonly type: 'DexId' | 'LstId' | 'AccountId';
  }

  /** @name AssetsError (528) */
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

  /** @name CommonPrimitivesDexInfo (529) */
  interface CommonPrimitivesDexInfo extends Struct {
    readonly baseAssetId: CommonPrimitivesAssetId32;
    readonly syntheticBaseAssetId: CommonPrimitivesAssetId32;
    readonly isPublic: bool;
  }

  /** @name DexManagerError (530) */
  interface DexManagerError extends Enum {
    readonly isDexIdAlreadyExists: boolean;
    readonly isDexDoesNotExist: boolean;
    readonly isInvalidFeeValue: boolean;
    readonly isInvalidAccountId: boolean;
    readonly type: 'DexIdAlreadyExists' | 'DexDoesNotExist' | 'InvalidFeeValue' | 'InvalidAccountId';
  }

  /** @name MulticollateralBondingCurvePoolDistributionAccounts (533) */
  interface MulticollateralBondingCurvePoolDistributionAccounts extends Struct {
    readonly xorAllocation: MulticollateralBondingCurvePoolDistributionAccountData;
    readonly valHolders: MulticollateralBondingCurvePoolDistributionAccountData;
    readonly soraCitizens: MulticollateralBondingCurvePoolDistributionAccountData;
    readonly storesAndShops: MulticollateralBondingCurvePoolDistributionAccountData;
    readonly parliamentAndDevelopment: MulticollateralBondingCurvePoolDistributionAccountData;
    readonly projects: MulticollateralBondingCurvePoolDistributionAccountData;
  }

  /** @name MulticollateralBondingCurvePoolDistributionAccountData (534) */
  interface MulticollateralBondingCurvePoolDistributionAccountData extends Struct {
    readonly account: MulticollateralBondingCurvePoolDistributionAccount;
    readonly coefficient: FixnumFixedPoint;
  }

  /** @name MulticollateralBondingCurvePoolDistributionAccount (535) */
  interface MulticollateralBondingCurvePoolDistributionAccount extends Enum {
    readonly isAccount: boolean;
    readonly asAccount: AccountId32;
    readonly isTechAccount: boolean;
    readonly asTechAccount: CommonPrimitivesTechAccountId;
    readonly type: 'Account' | 'TechAccount';
  }

  /** @name MulticollateralBondingCurvePoolError (538) */
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

  /** @name TechnicalError (539) */
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

  /** @name PoolXykError (542) */
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
    readonly type: 'UnableToCalculateFee' | 'FailedToCalculatePriceWithoutImpact' | 'UnableToGetBalance' | 'ImpossibleToDecideAssetPairAmounts' | 'PoolPairRatioAndPairSwapRatioIsDifferent' | 'PairSwapActionFeeIsSmallerThanRecommended' | 'SourceBalanceIsNotLargeEnough' | 'TargetBalanceIsNotLargeEnough' | 'UnableToDeriveFeeAccount' | 'FeeAccountIsInvalid' | 'SourceAndClientAccountDoNotMatchAsEqual' | 'AssetsMustNotBeSame' | 'ImpossibleToDecideDepositLiquidityAmounts' | 'InvalidDepositLiquidityBasicAssetAmount' | 'InvalidDepositLiquidityTargetAssetAmount' | 'PairSwapActionMinimumLiquidityIsSmallerThanRecommended' | 'DestinationAmountOfLiquidityIsNotLargeEnough' | 'SourceBaseAmountIsNotLargeEnough' | 'TargetBaseAmountIsNotLargeEnough' | 'PoolIsInvalid' | 'PoolIsEmpty' | 'ZeroValueInAmountParameter' | 'AccountBalanceIsInvalid' | 'InvalidDepositLiquidityDestinationAmount' | 'InitialLiqudityDepositRatioMustBeDefined' | 'TechAssetIsNotRepresentable' | 'UnableToDecideMarkerAsset' | 'UnableToGetAssetRepr' | 'ImpossibleToDecideWithdrawLiquidityAmounts' | 'InvalidWithdrawLiquidityBasicAssetAmount' | 'InvalidWithdrawLiquidityTargetAssetAmount' | 'SourceBaseAmountIsTooLarge' | 'SourceBalanceOfLiquidityTokensIsNotLargeEnough' | 'DestinationBaseBalanceIsNotLargeEnough' | 'DestinationTargetBalanceIsNotLargeEnough' | 'InvalidAssetForLiquidityMarking' | 'AssetDecodingError' | 'CalculatedValueIsOutOfDesiredBounds' | 'BaseAssetIsNotMatchedWithAnyAssetArguments' | 'DestinationAmountMustBeSame' | 'SourceAmountMustBeSame' | 'PoolInitializationIsInvalid' | 'PoolIsAlreadyInitialized' | 'InvalidMinimumBoundValueOfBalance' | 'ImpossibleToDecideValidPairValuesFromRangeForThisPool' | 'RangeValuesIsInvalid' | 'CalculatedValueIsNotMeetsRequiredBoundaries' | 'GettingFeeFromDestinationIsImpossible' | 'FixedWrapperCalculationFailed' | 'ThisCaseIsNotSupported' | 'PoolBecameInvalidAfterOperation' | 'UnableToConvertAssetToTechAssetId' | 'UnableToGetXORPartFromMarkerAsset' | 'PoolTokenSupplyOverflow' | 'IncRefError' | 'UnableToDepositXorLessThanMinimum' | 'UnsupportedQuotePath' | 'NotEnoughUnlockedLiquidity' | 'UnableToCreatePoolWithIndivisibleAssets' | 'UnableToOperateWithIndivisibleAssets' | 'NotEnoughLiquidityOutOfFarming';
  }

  /** @name LiquidityProxyError (543) */
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
    readonly type: 'UnavailableExchangePath' | 'MaxFeeExceeded' | 'InvalidFeeValue' | 'InsufficientLiquidity' | 'AggregationError' | 'CalculationError' | 'SlippageNotTolerated' | 'ForbiddenFilter' | 'FailedToCalculatePriceWithoutImpact' | 'UnableToSwapIndivisibleAssets' | 'UnableToEnableLiquiditySource' | 'LiquiditySourceAlreadyEnabled' | 'UnableToDisableLiquiditySource' | 'LiquiditySourceAlreadyDisabled';
  }

  /** @name PalletCollectiveVotes (545) */
  interface PalletCollectiveVotes extends Struct {
    readonly index: u32;
    readonly threshold: u32;
    readonly ayes: Vec<AccountId32>;
    readonly nays: Vec<AccountId32>;
    readonly end: u32;
  }

  /** @name PalletCollectiveError (546) */
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

  /** @name PalletDemocracyPreimageStatus (552) */
  interface PalletDemocracyPreimageStatus extends Enum {
    readonly isMissing: boolean;
    readonly asMissing: u32;
    readonly isAvailable: boolean;
    readonly asAvailable: {
      readonly data: Bytes;
      readonly provider: AccountId32;
      readonly deposit: u128;
      readonly since: u32;
      readonly expiry: Option<u32>;
    } & Struct;
    readonly type: 'Missing' | 'Available';
  }

  /** @name PalletDemocracyReferendumInfo (553) */
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

  /** @name PalletDemocracyReferendumStatus (554) */
  interface PalletDemocracyReferendumStatus extends Struct {
    readonly end: u32;
    readonly proposalHash: H256;
    readonly threshold: PalletDemocracyVoteThreshold;
    readonly delay: u32;
    readonly tally: PalletDemocracyTally;
  }

  /** @name PalletDemocracyTally (555) */
  interface PalletDemocracyTally extends Struct {
    readonly ayes: u128;
    readonly nays: u128;
    readonly turnout: u128;
  }

  /** @name PalletDemocracyVoteVoting (556) */
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

  /** @name PalletDemocracyDelegations (559) */
  interface PalletDemocracyDelegations extends Struct {
    readonly votes: u128;
    readonly capital: u128;
  }

  /** @name PalletDemocracyVotePriorLock (560) */
  interface PalletDemocracyVotePriorLock extends ITuple<[u32, u128]> {}

  /** @name PalletDemocracyReleases (563) */
  interface PalletDemocracyReleases extends Enum {
    readonly isV1: boolean;
    readonly type: 'V1';
  }

  /** @name PalletDemocracyError (564) */
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
    readonly isDuplicatePreimage: boolean;
    readonly isNotImminent: boolean;
    readonly isTooEarly: boolean;
    readonly isImminent: boolean;
    readonly isPreimageMissing: boolean;
    readonly isReferendumInvalid: boolean;
    readonly isPreimageInvalid: boolean;
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
    readonly isTooManyProposals: boolean;
    readonly type: 'ValueLow' | 'ProposalMissing' | 'AlreadyCanceled' | 'DuplicateProposal' | 'ProposalBlacklisted' | 'NotSimpleMajority' | 'InvalidHash' | 'NoProposal' | 'AlreadyVetoed' | 'DuplicatePreimage' | 'NotImminent' | 'TooEarly' | 'Imminent' | 'PreimageMissing' | 'ReferendumInvalid' | 'PreimageInvalid' | 'NoneWaiting' | 'NotVoter' | 'NoPermission' | 'AlreadyDelegating' | 'InsufficientFunds' | 'NotDelegating' | 'VotesExist' | 'InstantNotAllowed' | 'Nonsense' | 'WrongUpperBound' | 'MaxVotesReached' | 'TooManyProposals';
  }

  /** @name EthBridgeRequestsOffchainRequest (566) */
  interface EthBridgeRequestsOffchainRequest extends Enum {
    readonly isOutgoing: boolean;
    readonly asOutgoing: ITuple<[EthBridgeRequestsOutgoingRequest, H256]>;
    readonly isLoadIncoming: boolean;
    readonly asLoadIncoming: EthBridgeRequestsLoadIncomingRequest;
    readonly isIncoming: boolean;
    readonly asIncoming: ITuple<[EthBridgeRequestsIncomingRequest, H256]>;
    readonly type: 'Outgoing' | 'LoadIncoming' | 'Incoming';
  }

  /** @name EthBridgeRequestsRequestStatus (567) */
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

  /** @name EthBridgeRequestsOutgoingEthPeersSync (574) */
  interface EthBridgeRequestsOutgoingEthPeersSync extends Struct {
    readonly isBridgeReady: bool;
    readonly isXorReady: bool;
    readonly isValReady: bool;
  }

  /** @name EthBridgeBridgeStatus (575) */
  interface EthBridgeBridgeStatus extends Enum {
    readonly isInitialized: boolean;
    readonly isMigrating: boolean;
    readonly type: 'Initialized' | 'Migrating';
  }

  /** @name EthBridgeError (579) */
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

  /** @name PswapDistributionError (582) */
  interface PswapDistributionError extends Enum {
    readonly isCalculationError: boolean;
    readonly isSubscriptionActive: boolean;
    readonly isUnknownSubscription: boolean;
    readonly isInvalidFrequency: boolean;
    readonly isZeroClaimableIncentives: boolean;
    readonly isIncRefError: boolean;
    readonly type: 'CalculationError' | 'SubscriptionActive' | 'UnknownSubscription' | 'InvalidFrequency' | 'ZeroClaimableIncentives' | 'IncRefError';
  }

  /** @name PalletSchedulerScheduledV3 (588) */
  interface PalletSchedulerScheduledV3 extends Struct {
    readonly maybeId: Option<Bytes>;
    readonly priority: u8;
    readonly call: FrameSupportScheduleMaybeHashed;
    readonly maybePeriodic: Option<ITuple<[u32, u32]>>;
    readonly origin: FramenodeRuntimeOriginCaller;
  }

  /** @name PalletSchedulerError (589) */
  interface PalletSchedulerError extends Enum {
    readonly isFailedToSchedule: boolean;
    readonly isNotFound: boolean;
    readonly isTargetBlockNumberInPast: boolean;
    readonly isRescheduleNoChange: boolean;
    readonly type: 'FailedToSchedule' | 'NotFound' | 'TargetBlockNumberInPast' | 'RescheduleNoChange';
  }

  /** @name IrohaMigrationPendingMultisigAccount (592) */
  interface IrohaMigrationPendingMultisigAccount extends Struct {
    readonly approvingAccounts: Vec<AccountId32>;
    readonly migrateAt: Option<u32>;
  }

  /** @name IrohaMigrationError (593) */
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

  /** @name PalletMembershipError (595) */
  interface PalletMembershipError extends Enum {
    readonly isAlreadyMember: boolean;
    readonly isNotMember: boolean;
    readonly isTooManyMembers: boolean;
    readonly type: 'AlreadyMember' | 'NotMember' | 'TooManyMembers';
  }

  /** @name PalletElectionsPhragmenSeatHolder (597) */
  interface PalletElectionsPhragmenSeatHolder extends Struct {
    readonly who: AccountId32;
    readonly stake: u128;
    readonly deposit: u128;
  }

  /** @name PalletElectionsPhragmenVoter (598) */
  interface PalletElectionsPhragmenVoter extends Struct {
    readonly votes: Vec<AccountId32>;
    readonly stake: u128;
    readonly deposit: u128;
  }

  /** @name PalletElectionsPhragmenError (599) */
  interface PalletElectionsPhragmenError extends Enum {
    readonly isUnableToVote: boolean;
    readonly isNoVotes: boolean;
    readonly isTooManyVotes: boolean;
    readonly isMaximumVotesExceeded: boolean;
    readonly isLowBalance: boolean;
    readonly isUnableToPayBond: boolean;
    readonly isMustBeVoter: boolean;
    readonly isReportSelf: boolean;
    readonly isDuplicatedCandidate: boolean;
    readonly isMemberSubmit: boolean;
    readonly isRunnerUpSubmit: boolean;
    readonly isInsufficientCandidateFunds: boolean;
    readonly isNotMember: boolean;
    readonly isInvalidWitnessData: boolean;
    readonly isInvalidVoteCount: boolean;
    readonly isInvalidRenouncing: boolean;
    readonly isInvalidReplacement: boolean;
    readonly type: 'UnableToVote' | 'NoVotes' | 'TooManyVotes' | 'MaximumVotesExceeded' | 'LowBalance' | 'UnableToPayBond' | 'MustBeVoter' | 'ReportSelf' | 'DuplicatedCandidate' | 'MemberSubmit' | 'RunnerUpSubmit' | 'InsufficientCandidateFunds' | 'NotMember' | 'InvalidWitnessData' | 'InvalidVoteCount' | 'InvalidRenouncing' | 'InvalidReplacement';
  }

  /** @name VestedRewardsRewardInfo (600) */
  interface VestedRewardsRewardInfo extends Struct {
    readonly limit: u128;
    readonly totalAvailable: u128;
    readonly rewards: BTreeMap<CommonPrimitivesRewardReason, u128>;
  }

  /** @name VestedRewardsCrowdloanReward (604) */
  interface VestedRewardsCrowdloanReward extends Struct {
    readonly id: Bytes;
    readonly address: Bytes;
    readonly contribution: FixnumFixedPoint;
    readonly xorReward: FixnumFixedPoint;
    readonly valReward: FixnumFixedPoint;
    readonly pswapReward: FixnumFixedPoint;
    readonly xstusdReward: FixnumFixedPoint;
    readonly percent: FixnumFixedPoint;
  }

  /** @name VestedRewardsError (605) */
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
    readonly type: 'NothingToClaim' | 'ClaimLimitExceeded' | 'UnhandledRewardType' | 'RewardsSupplyShortage' | 'IncRefError' | 'CantSubtractSnapshot' | 'CantCalculateReward' | 'NoRewardsForAsset' | 'ArithmeticError' | 'NumberConversionError' | 'UnableToGetBaseAssetPrice';
  }

  /** @name PalletIdentityRegistration (606) */
  interface PalletIdentityRegistration extends Struct {
    readonly judgements: Vec<ITuple<[u32, PalletIdentityJudgement]>>;
    readonly deposit: u128;
    readonly info: PalletIdentityIdentityInfo;
  }

  /** @name PalletIdentityRegistrarInfo (614) */
  interface PalletIdentityRegistrarInfo extends Struct {
    readonly account: AccountId32;
    readonly fee: u128;
    readonly fields: PalletIdentityBitFlags;
  }

  /** @name PalletIdentityError (616) */
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
    readonly type: 'TooManySubAccounts' | 'NotFound' | 'NotNamed' | 'EmptyIndex' | 'FeeChanged' | 'NoIdentity' | 'StickyJudgement' | 'JudgementGiven' | 'InvalidJudgement' | 'InvalidIndex' | 'InvalidTarget' | 'TooManyFields' | 'TooManyRegistrars' | 'AlreadyClaimed' | 'NotSub' | 'NotOwned';
  }

  /** @name FarmingPoolFarmer (618) */
  interface FarmingPoolFarmer extends Struct {
    readonly account: AccountId32;
    readonly block: u32;
    readonly weight: u128;
  }

  /** @name FarmingError (619) */
  interface FarmingError extends Enum {
    readonly isIncRefError: boolean;
    readonly type: 'IncRefError';
  }

  /** @name XstError (620) */
  interface XstError extends Enum {
    readonly isPriceCalculationFailed: boolean;
    readonly isFailedToCalculatePriceWithoutImpact: boolean;
    readonly isCannotExchangeWithSelf: boolean;
    readonly isPoolAlreadyInitializedForPair: boolean;
    readonly isPoolNotInitialized: boolean;
    readonly isSlippageLimitExceeded: boolean;
    readonly isUnsupportedCollateralAssetId: boolean;
    readonly isFeeCalculationFailed: boolean;
    readonly isCantExchange: boolean;
    readonly isIncRefError: boolean;
    readonly type: 'PriceCalculationFailed' | 'FailedToCalculatePriceWithoutImpact' | 'CannotExchangeWithSelf' | 'PoolAlreadyInitializedForPair' | 'PoolNotInitialized' | 'SlippageLimitExceeded' | 'UnsupportedCollateralAssetId' | 'FeeCalculationFailed' | 'CantExchange' | 'IncRefError';
  }

  /** @name PriceToolsAggregatedPriceInfo (621) */
  interface PriceToolsAggregatedPriceInfo extends Struct {
    readonly buy: PriceToolsPriceInfo;
    readonly sell: PriceToolsPriceInfo;
  }

  /** @name PriceToolsPriceInfo (622) */
  interface PriceToolsPriceInfo extends Struct {
    readonly priceFailures: u32;
    readonly spotPrices: Vec<u128>;
    readonly averagePrice: u128;
    readonly needsUpdate: bool;
    readonly lastSpotPrice: u128;
  }

  /** @name PriceToolsError (623) */
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

  /** @name CeresStakingStakingInfo (624) */
  interface CeresStakingStakingInfo extends Struct {
    readonly deposited: u128;
    readonly rewards: u128;
  }

  /** @name CeresStakingError (625) */
  interface CeresStakingError extends Enum {
    readonly isStakingPoolIsFull: boolean;
    readonly isUnauthorized: boolean;
    readonly type: 'StakingPoolIsFull' | 'Unauthorized';
  }

  /** @name CeresLiquidityLockerStorageVersion (626) */
  interface CeresLiquidityLockerStorageVersion extends Enum {
    readonly isV1: boolean;
    readonly isV2: boolean;
    readonly type: 'V1' | 'V2';
  }

  /** @name CeresLiquidityLockerLockInfo (628) */
  interface CeresLiquidityLockerLockInfo extends Struct {
    readonly poolTokens: u128;
    readonly unlockingTimestamp: u64;
    readonly assetA: CommonPrimitivesAssetId32;
    readonly assetB: CommonPrimitivesAssetId32;
  }

  /** @name CeresLiquidityLockerError (629) */
  interface CeresLiquidityLockerError extends Enum {
    readonly isPoolDoesNotExist: boolean;
    readonly isInsufficientLiquidityToLock: boolean;
    readonly isInvalidPercentage: boolean;
    readonly isUnauthorized: boolean;
    readonly isInvalidUnlockingTimestamp: boolean;
    readonly type: 'PoolDoesNotExist' | 'InsufficientLiquidityToLock' | 'InvalidPercentage' | 'Unauthorized' | 'InvalidUnlockingTimestamp';
  }

  /** @name CeresTokenLockerStorageVersion (630) */
  interface CeresTokenLockerStorageVersion extends Enum {
    readonly isV1: boolean;
    readonly isV2: boolean;
    readonly type: 'V1' | 'V2';
  }

  /** @name CeresTokenLockerTokenLockInfo (632) */
  interface CeresTokenLockerTokenLockInfo extends Struct {
    readonly tokens: u128;
    readonly unlockingTimestamp: u64;
    readonly assetId: CommonPrimitivesAssetId32;
  }

  /** @name CeresTokenLockerError (633) */
  interface CeresTokenLockerError extends Enum {
    readonly isInvalidNumberOfTokens: boolean;
    readonly isUnauthorized: boolean;
    readonly isInvalidUnlockingTimestamp: boolean;
    readonly isNotEnoughFunds: boolean;
    readonly isNotUnlockedYet: boolean;
    readonly isLockInfoDoesNotExist: boolean;
    readonly type: 'InvalidNumberOfTokens' | 'Unauthorized' | 'InvalidUnlockingTimestamp' | 'NotEnoughFunds' | 'NotUnlockedYet' | 'LockInfoDoesNotExist';
  }

  /** @name CeresGovernancePlatformVotingInfo (635) */
  interface CeresGovernancePlatformVotingInfo extends Struct {
    readonly votingOption: u32;
    readonly numberOfVotes: u128;
    readonly ceresWithdrawn: bool;
  }

  /** @name CeresGovernancePlatformPollInfo (636) */
  interface CeresGovernancePlatformPollInfo extends Struct {
    readonly numberOfOptions: u32;
    readonly pollStartTimestamp: u64;
    readonly pollEndTimestamp: u64;
  }

  /** @name CeresGovernancePlatformStorageVersion (637) */
  interface CeresGovernancePlatformStorageVersion extends Enum {
    readonly isV1: boolean;
    readonly isV2: boolean;
    readonly type: 'V1' | 'V2';
  }

  /** @name CeresGovernancePlatformError (638) */
  interface CeresGovernancePlatformError extends Enum {
    readonly isInvalidVotes: boolean;
    readonly isPollIsFinished: boolean;
    readonly isPollIsNotStarted: boolean;
    readonly isNotEnoughFunds: boolean;
    readonly isInvalidNumberOfOption: boolean;
    readonly isVoteDenied: boolean;
    readonly isInvalidStartTimestamp: boolean;
    readonly isInvalidEndTimestamp: boolean;
    readonly isPollIsNotFinished: boolean;
    readonly isInvalidNumberOfVotes: boolean;
    readonly isFundsAlreadyWithdrawn: boolean;
    readonly isPollIdAlreadyExists: boolean;
    readonly type: 'InvalidVotes' | 'PollIsFinished' | 'PollIsNotStarted' | 'NotEnoughFunds' | 'InvalidNumberOfOption' | 'VoteDenied' | 'InvalidStartTimestamp' | 'InvalidEndTimestamp' | 'PollIsNotFinished' | 'InvalidNumberOfVotes' | 'FundsAlreadyWithdrawn' | 'PollIdAlreadyExists';
  }

  /** @name CeresLaunchpadIloInfo (639) */
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

  /** @name CeresLaunchpadContributorsVesting (640) */
  interface CeresLaunchpadContributorsVesting extends Struct {
    readonly firstReleasePercent: u128;
    readonly vestingPeriod: u64;
    readonly vestingPercent: u128;
  }

  /** @name CeresLaunchpadTeamVesting (641) */
  interface CeresLaunchpadTeamVesting extends Struct {
    readonly teamVestingTotalTokens: u128;
    readonly teamVestingFirstReleasePercent: u128;
    readonly teamVestingPeriod: u64;
    readonly teamVestingPercent: u128;
  }

  /** @name CeresLaunchpadContributionInfo (643) */
  interface CeresLaunchpadContributionInfo extends Struct {
    readonly fundsContributed: u128;
    readonly tokensBought: u128;
    readonly tokensClaimed: u128;
    readonly claimingFinished: bool;
    readonly numberOfClaims: u32;
  }

  /** @name CeresLaunchpadError (644) */
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

  /** @name DemeterFarmingPlatformTokenInfo (645) */
  interface DemeterFarmingPlatformTokenInfo extends Struct {
    readonly farmsTotalMultiplier: u32;
    readonly stakingTotalMultiplier: u32;
    readonly tokenPerBlock: u128;
    readonly farmsAllocation: u128;
    readonly stakingAllocation: u128;
    readonly teamAllocation: u128;
    readonly teamAccount: AccountId32;
  }

  /** @name DemeterFarmingPlatformUserInfo (647) */
  interface DemeterFarmingPlatformUserInfo extends Struct {
    readonly baseAsset: CommonPrimitivesAssetId32;
    readonly poolAsset: CommonPrimitivesAssetId32;
    readonly rewardAsset: CommonPrimitivesAssetId32;
    readonly isFarm: bool;
    readonly pooledTokens: u128;
    readonly rewards: u128;
  }

  /** @name DemeterFarmingPlatformPoolData (649) */
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

  /** @name DemeterFarmingPlatformStorageVersion (650) */
  interface DemeterFarmingPlatformStorageVersion extends Enum {
    readonly isV1: boolean;
    readonly isV2: boolean;
    readonly type: 'V1' | 'V2';
  }

  /** @name DemeterFarmingPlatformError (651) */
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

  /** @name PalletBagsListListNode (652) */
  interface PalletBagsListListNode extends Struct {
    readonly id: AccountId32;
    readonly prev: Option<AccountId32>;
    readonly next: Option<AccountId32>;
    readonly bagUpper: u64;
    readonly score: u64;
  }

  /** @name PalletBagsListListBag (653) */
  interface PalletBagsListListBag extends Struct {
    readonly head: Option<AccountId32>;
    readonly tail: Option<AccountId32>;
  }

  /** @name PalletBagsListError (655) */
  interface PalletBagsListError extends Enum {
    readonly isList: boolean;
    readonly asList: PalletBagsListListListError;
    readonly type: 'List';
  }

  /** @name PalletBagsListListListError (656) */
  interface PalletBagsListListListError extends Enum {
    readonly isDuplicate: boolean;
    readonly isNotHeavier: boolean;
    readonly isNotInSameBag: boolean;
    readonly isNodeNotFound: boolean;
    readonly type: 'Duplicate' | 'NotHeavier' | 'NotInSameBag' | 'NodeNotFound';
  }

  /** @name PalletElectionProviderMultiPhasePhase (657) */
  interface PalletElectionProviderMultiPhasePhase extends Enum {
    readonly isOff: boolean;
    readonly isSigned: boolean;
    readonly isUnsigned: boolean;
    readonly asUnsigned: ITuple<[bool, u32]>;
    readonly isEmergency: boolean;
    readonly type: 'Off' | 'Signed' | 'Unsigned' | 'Emergency';
  }

  /** @name PalletElectionProviderMultiPhaseReadySolution (659) */
  interface PalletElectionProviderMultiPhaseReadySolution extends Struct {
    readonly supports: Vec<ITuple<[AccountId32, SpNposElectionsSupport]>>;
    readonly score: SpNposElectionsElectionScore;
    readonly compute: PalletElectionProviderMultiPhaseElectionCompute;
  }

  /** @name PalletElectionProviderMultiPhaseRoundSnapshot (660) */
  interface PalletElectionProviderMultiPhaseRoundSnapshot extends Struct {
    readonly voters: Vec<ITuple<[AccountId32, u64, Vec<AccountId32>]>>;
    readonly targets: Vec<AccountId32>;
  }

  /** @name PalletElectionProviderMultiPhaseSignedSignedSubmission (667) */
  interface PalletElectionProviderMultiPhaseSignedSignedSubmission extends Struct {
    readonly who: AccountId32;
    readonly deposit: u128;
    readonly rawSolution: PalletElectionProviderMultiPhaseRawSolution;
    readonly callFee: u128;
  }

  /** @name PalletElectionProviderMultiPhaseError (668) */
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
    readonly type: 'PreDispatchEarlySubmission' | 'PreDispatchWrongWinnerCount' | 'PreDispatchWeakSubmission' | 'SignedQueueFull' | 'SignedCannotPayDeposit' | 'SignedInvalidWitness' | 'SignedTooMuchWeight' | 'OcwCallWrongEra' | 'MissingSnapshotMetadata' | 'InvalidSubmissionIndex' | 'CallNotAllowed' | 'FallbackFailed';
  }

  /** @name BandBandRate (670) */
  interface BandBandRate extends Struct {
    readonly value: u128;
    readonly lastUpdated: u64;
    readonly requestId: u64;
  }

  /** @name BandError (671) */
  interface BandError extends Enum {
    readonly isUnauthorizedRelayer: boolean;
    readonly isAlreadyATrustedRelayer: boolean;
    readonly isNoSuchRelayer: boolean;
    readonly isRateConversionOverflow: boolean;
    readonly type: 'UnauthorizedRelayer' | 'AlreadyATrustedRelayer' | 'NoSuchRelayer' | 'RateConversionOverflow';
  }

  /** @name OracleProxyError (674) */
  interface OracleProxyError extends Enum {
    readonly isOracleAlreadyEnabled: boolean;
    readonly isOracleAlreadyDisabled: boolean;
    readonly type: 'OracleAlreadyEnabled' | 'OracleAlreadyDisabled';
  }

  /** @name HermesGovernancePlatformHermesVotingInfo (676) */
  interface HermesGovernancePlatformHermesVotingInfo extends Struct {
    readonly votingOption: HermesGovernancePlatformVotingOption;
    readonly numberOfHermes: u128;
    readonly hermesWithdrawn: bool;
  }

  /** @name HermesGovernancePlatformHermesPollInfo (677) */
  interface HermesGovernancePlatformHermesPollInfo extends Struct {
    readonly creator: AccountId32;
    readonly hermesLocked: u128;
    readonly pollStartTimestamp: u64;
    readonly pollEndTimestamp: u64;
    readonly title: Text;
    readonly description: Text;
    readonly creatorHermesWithdrawn: bool;
  }

  /** @name HermesGovernancePlatformError (678) */
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
    readonly type: 'PollIsNotStarted' | 'PollIsFinished' | 'InvalidStartTimestamp' | 'InvalidEndTimestamp' | 'NotEnoughHermesForCreatingPoll' | 'FundsAlreadyWithdrawn' | 'PollIsNotFinished' | 'YouAreNotCreator' | 'Unauthorized' | 'PollDoesNotExist' | 'NotEnoughHermesForVoting' | 'AlreadyVoted' | 'InvalidMinimumDurationOfPoll' | 'InvalidMaximumDurationOfPoll' | 'NotVoted';
  }

  /** @name FaucetError (679) */
  interface FaucetError extends Enum {
    readonly isAssetNotSupported: boolean;
    readonly isAmountAboveLimit: boolean;
    readonly isNotEnoughReserves: boolean;
    readonly type: 'AssetNotSupported' | 'AmountAboveLimit' | 'NotEnoughReserves';
  }

  /** @name SpRuntimeMultiSignature (683) */
  interface SpRuntimeMultiSignature extends Enum {
    readonly isEd25519: boolean;
    readonly asEd25519: SpCoreEd25519Signature;
    readonly isSr25519: boolean;
    readonly asSr25519: SpCoreSr25519Signature;
    readonly isEcdsa: boolean;
    readonly asEcdsa: SpCoreEcdsaSignature;
    readonly type: 'Ed25519' | 'Sr25519' | 'Ecdsa';
  }

  /** @name SpCoreEcdsaSignature (684) */
  interface SpCoreEcdsaSignature extends U8aFixed {}

  /** @name FrameSystemExtensionsCheckSpecVersion (687) */
  type FrameSystemExtensionsCheckSpecVersion = Null;

  /** @name FrameSystemExtensionsCheckTxVersion (688) */
  type FrameSystemExtensionsCheckTxVersion = Null;

  /** @name FrameSystemExtensionsCheckGenesis (689) */
  type FrameSystemExtensionsCheckGenesis = Null;

  /** @name FrameSystemExtensionsCheckNonce (692) */
  interface FrameSystemExtensionsCheckNonce extends Compact<u32> {}

  /** @name FrameSystemExtensionsCheckWeight (693) */
  type FrameSystemExtensionsCheckWeight = Null;

  /** @name FramenodeRuntimeExtensionsChargeTransactionPayment (694) */
  interface FramenodeRuntimeExtensionsChargeTransactionPayment extends PalletTransactionPaymentChargeTransactionPayment {}

  /** @name PalletTransactionPaymentChargeTransactionPayment (695) */
  interface PalletTransactionPaymentChargeTransactionPayment extends Compact<u128> {}

  /** @name FramenodeRuntimeRuntime (696) */
  type FramenodeRuntimeRuntime = Null;

} // declare module
