// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

declare module '@polkadot/types/lookup' {
  import type { Data } from '@polkadot/types';
  import type { BTreeMap, Bytes, Compact, Enum, Null, Option, Result, Set, Struct, Text, U256, U8aFixed, Vec, bool, i128, i32, u128, u16, u32, u64, u8 } from '@polkadot/types-codec';
  import type { ITuple } from '@polkadot/types-codec/types';
  import type { Vote } from '@polkadot/types/interfaces/elections';
  import type { AccountId32, Call, H128, H160, H256, H512, PerU16, Perbill, Percent } from '@polkadot/types/interfaces/runtime';
  import type { Event } from '@polkadot/types/interfaces/system';

  /** @name FrameSystemAccountInfo (3) */
  export interface FrameSystemAccountInfo extends Struct {
    readonly nonce: u32;
    readonly consumers: u32;
    readonly providers: u32;
    readonly sufficients: u32;
    readonly data: PalletBalancesAccountData;
  }

  /** @name PalletBalancesAccountData (5) */
  export interface PalletBalancesAccountData extends Struct {
    readonly free: u128;
    readonly reserved: u128;
    readonly miscFrozen: u128;
    readonly feeFrozen: u128;
  }

  /** @name FrameSupportWeightsPerDispatchClassU64 (7) */
  export interface FrameSupportWeightsPerDispatchClassU64 extends Struct {
    readonly normal: u64;
    readonly operational: u64;
    readonly mandatory: u64;
  }

  /** @name SpRuntimeDigest (11) */
  export interface SpRuntimeDigest extends Struct {
    readonly logs: Vec<SpRuntimeDigestDigestItem>;
  }

  /** @name SpRuntimeDigestDigestItem (13) */
  export interface SpRuntimeDigestDigestItem extends Enum {
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
  export interface FrameSystemEventRecord extends Struct {
    readonly phase: FrameSystemPhase;
    readonly event: Event;
    readonly topics: Vec<H256>;
  }

  /** @name FrameSystemEvent (18) */
  export interface FrameSystemEvent extends Enum {
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
  export interface FrameSupportWeightsDispatchInfo extends Struct {
    readonly weight: u64;
    readonly class: FrameSupportWeightsDispatchClass;
    readonly paysFee: FrameSupportWeightsPays;
  }

  /** @name FrameSupportWeightsDispatchClass (20) */
  export interface FrameSupportWeightsDispatchClass extends Enum {
    readonly isNormal: boolean;
    readonly isOperational: boolean;
    readonly isMandatory: boolean;
    readonly type: 'Normal' | 'Operational' | 'Mandatory';
  }

  /** @name FrameSupportWeightsPays (21) */
  export interface FrameSupportWeightsPays extends Enum {
    readonly isYes: boolean;
    readonly isNo: boolean;
    readonly type: 'Yes' | 'No';
  }

  /** @name SpRuntimeDispatchError (22) */
  export interface SpRuntimeDispatchError extends Enum {
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
  export interface SpRuntimeModuleError extends Struct {
    readonly index: u8;
    readonly error: U8aFixed;
  }

  /** @name SpRuntimeTokenError (24) */
  export interface SpRuntimeTokenError extends Enum {
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
  export interface SpRuntimeArithmeticError extends Enum {
    readonly isUnderflow: boolean;
    readonly isOverflow: boolean;
    readonly isDivisionByZero: boolean;
    readonly type: 'Underflow' | 'Overflow' | 'DivisionByZero';
  }

  /** @name SpRuntimeTransactionalError (26) */
  export interface SpRuntimeTransactionalError extends Enum {
    readonly isLimitReached: boolean;
    readonly isNoLayer: boolean;
    readonly type: 'LimitReached' | 'NoLayer';
  }

  /** @name PalletBalancesEvent (27) */
  export interface PalletBalancesEvent extends Enum {
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
  export interface FrameSupportTokensMiscBalanceStatus extends Enum {
    readonly isFree: boolean;
    readonly isReserved: boolean;
    readonly type: 'Free' | 'Reserved';
  }

  /** @name PalletSudoEvent (29) */
  export interface PalletSudoEvent extends Enum {
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
  export interface PermissionsEvent extends Enum {
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
  export interface RewardsEvent extends Enum {
    readonly isClaimed: boolean;
    readonly asClaimed: AccountId32;
    readonly isMigrationCompleted: boolean;
    readonly type: 'Claimed' | 'MigrationCompleted';
  }

  /** @name XorFeeEvent (35) */
  export interface XorFeeEvent extends Enum {
    readonly isFeeWithdrawn: boolean;
    readonly asFeeWithdrawn: ITuple<[AccountId32, u128]>;
    readonly isReferrerRewarded: boolean;
    readonly asReferrerRewarded: ITuple<[AccountId32, AccountId32, u128]>;
    readonly type: 'FeeWithdrawn' | 'ReferrerRewarded';
  }

  /** @name PalletMultisigEvent (36) */
  export interface PalletMultisigEvent extends Enum {
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
  export interface PalletMultisigBridgeTimepoint extends Struct {
    readonly height: PalletMultisigMultiChainHeight;
    readonly index: u32;
  }

  /** @name PalletMultisigMultiChainHeight (38) */
  export interface PalletMultisigMultiChainHeight extends Enum {
    readonly isThischain: boolean;
    readonly asThischain: u32;
    readonly isSidechain: boolean;
    readonly asSidechain: u64;
    readonly type: 'Thischain' | 'Sidechain';
  }

  /** @name PalletUtilityEvent (40) */
  export interface PalletUtilityEvent extends Enum {
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

  /** @name PalletStakingPalletEvent (41) */
  export interface PalletStakingPalletEvent extends Enum {
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
    readonly type: 'EraPaid' | 'Rewarded' | 'Slashed' | 'OldSlashingReportDiscarded' | 'StakersElected' | 'Bonded' | 'Unbonded' | 'Withdrawn' | 'Kicked' | 'StakingElectionFailed' | 'Chilled' | 'PayoutStarted';
  }

  /** @name PalletOffencesEvent (42) */
  export interface PalletOffencesEvent extends Enum {
    readonly isOffence: boolean;
    readonly asOffence: {
      readonly kind: U8aFixed;
      readonly timeslot: Bytes;
    } & Struct;
    readonly type: 'Offence';
  }

  /** @name PalletSessionEvent (44) */
  export interface PalletSessionEvent extends Enum {
    readonly isNewSession: boolean;
    readonly asNewSession: {
      readonly sessionIndex: u32;
    } & Struct;
    readonly type: 'NewSession';
  }

  /** @name PalletGrandpaEvent (45) */
  export interface PalletGrandpaEvent extends Enum {
    readonly isNewAuthorities: boolean;
    readonly asNewAuthorities: {
      readonly authoritySet: Vec<ITuple<[SpFinalityGrandpaAppPublic, u64]>>;
    } & Struct;
    readonly isPaused: boolean;
    readonly isResumed: boolean;
    readonly type: 'NewAuthorities' | 'Paused' | 'Resumed';
  }

  /** @name SpFinalityGrandpaAppPublic (48) */
  export interface SpFinalityGrandpaAppPublic extends SpCoreEd25519Public {}

  /** @name SpCoreEd25519Public (49) */
  export interface SpCoreEd25519Public extends U8aFixed {}

  /** @name PalletImOnlineEvent (50) */
  export interface PalletImOnlineEvent extends Enum {
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

  /** @name PalletImOnlineSr25519AppSr25519Public (51) */
  export interface PalletImOnlineSr25519AppSr25519Public extends SpCoreSr25519Public {}

  /** @name SpCoreSr25519Public (52) */
  export interface SpCoreSr25519Public extends U8aFixed {}

  /** @name PalletStakingExposure (55) */
  export interface PalletStakingExposure extends Struct {
    readonly total: Compact<u128>;
    readonly own: Compact<u128>;
    readonly others: Vec<PalletStakingIndividualExposure>;
  }

  /** @name PalletStakingIndividualExposure (58) */
  export interface PalletStakingIndividualExposure extends Struct {
    readonly who: AccountId32;
    readonly value: Compact<u128>;
  }

  /** @name OrmlTokensModuleEvent (59) */
  export interface OrmlTokensModuleEvent extends Enum {
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

  /** @name CommonPrimitivesAssetId32 (60) */
  export interface CommonPrimitivesAssetId32 extends Struct {
    readonly code: U8aFixed;
  }

  /** @name CommonPrimitivesPredefinedAssetId (61) */
  export interface CommonPrimitivesPredefinedAssetId extends Enum {
    readonly isXor: boolean;
    readonly isDot: boolean;
    readonly isKsm: boolean;
    readonly isUsdt: boolean;
    readonly isVal: boolean;
    readonly isPswap: boolean;
    readonly isDai: boolean;
    readonly isEth: boolean;
    readonly isXstusd: boolean;
    readonly type: 'Xor' | 'Dot' | 'Ksm' | 'Usdt' | 'Val' | 'Pswap' | 'Dai' | 'Eth' | 'Xstusd';
  }

  /** @name TradingPairEvent (63) */
  export interface TradingPairEvent extends Enum {
    readonly isTradingPairStored: boolean;
    readonly asTradingPairStored: ITuple<[u32, CommonPrimitivesTradingPairAssetId32]>;
    readonly type: 'TradingPairStored';
  }

  /** @name CommonPrimitivesTradingPairAssetId32 (64) */
  export interface CommonPrimitivesTradingPairAssetId32 extends Struct {
    readonly baseAssetId: CommonPrimitivesAssetId32;
    readonly targetAssetId: CommonPrimitivesAssetId32;
  }

  /** @name AssetsEvent (65) */
  export interface AssetsEvent extends Enum {
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

  /** @name MulticollateralBondingCurvePoolEvent (66) */
  export interface MulticollateralBondingCurvePoolEvent extends Enum {
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

  /** @name FixnumFixedPoint (68) */
  export interface FixnumFixedPoint extends Struct {
    readonly inner: i128;
  }

  /** @name TechnicalEvent (70) */
  export interface TechnicalEvent extends Enum {
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

  /** @name CommonPrimitivesTechAssetId (71) */
  export interface CommonPrimitivesTechAssetId extends Enum {
    readonly isWrapped: boolean;
    readonly asWrapped: CommonPrimitivesPredefinedAssetId;
    readonly isEscaped: boolean;
    readonly asEscaped: U8aFixed;
    readonly type: 'Wrapped' | 'Escaped';
  }

  /** @name CommonPrimitivesTechAccountId (72) */
  export interface CommonPrimitivesTechAccountId extends Enum {
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

  /** @name CommonPrimitivesTechPurpose (73) */
  export interface CommonPrimitivesTechPurpose extends Enum {
    readonly isFeeCollector: boolean;
    readonly isFeeCollectorForPair: boolean;
    readonly asFeeCollectorForPair: CommonPrimitivesTradingPairTechAssetId;
    readonly isLiquidityKeeper: boolean;
    readonly asLiquidityKeeper: CommonPrimitivesTradingPairTechAssetId;
    readonly isIdentifier: boolean;
    readonly asIdentifier: Bytes;
    readonly type: 'FeeCollector' | 'FeeCollectorForPair' | 'LiquidityKeeper' | 'Identifier';
  }

  /** @name CommonPrimitivesTradingPairTechAssetId (74) */
  export interface CommonPrimitivesTradingPairTechAssetId extends Struct {
    readonly baseAssetId: CommonPrimitivesTechAssetId;
    readonly targetAssetId: CommonPrimitivesTechAssetId;
  }

  /** @name PoolXykEvent (75) */
  export interface PoolXykEvent extends Enum {
    readonly isPoolIsInitialized: boolean;
    readonly asPoolIsInitialized: AccountId32;
    readonly type: 'PoolIsInitialized';
  }

  /** @name LiquidityProxyEvent (76) */
  export interface LiquidityProxyEvent extends Enum {
    readonly isExchange: boolean;
    readonly asExchange: ITuple<[AccountId32, u32, CommonPrimitivesAssetId32, CommonPrimitivesAssetId32, u128, u128, u128, Vec<CommonPrimitivesLiquiditySourceId>]>;
    readonly type: 'Exchange';
  }

  /** @name CommonPrimitivesLiquiditySourceId (78) */
  export interface CommonPrimitivesLiquiditySourceId extends Struct {
    readonly dexId: u32;
    readonly liquiditySourceIndex: CommonPrimitivesLiquiditySourceType;
  }

  /** @name CommonPrimitivesLiquiditySourceType (79) */
  export interface CommonPrimitivesLiquiditySourceType extends Enum {
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

  /** @name PalletCollectiveEvent (80) */
  export interface PalletCollectiveEvent extends Enum {
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

  /** @name PalletDemocracyEvent (83) */
  export interface PalletDemocracyEvent extends Enum {
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
    readonly type: 'Proposed' | 'Tabled' | 'ExternalTabled' | 'Started' | 'Passed' | 'NotPassed' | 'Cancelled' | 'Executed' | 'Delegated' | 'Undelegated' | 'Vetoed' | 'PreimageNoted' | 'PreimageUsed' | 'PreimageInvalid' | 'PreimageMissing' | 'PreimageReaped' | 'Blacklisted' | 'Voted' | 'Seconded';
  }

  /** @name PalletDemocracyVoteThreshold (85) */
  export interface PalletDemocracyVoteThreshold extends Enum {
    readonly isSuperMajorityApprove: boolean;
    readonly isSuperMajorityAgainst: boolean;
    readonly isSimpleMajority: boolean;
    readonly type: 'SuperMajorityApprove' | 'SuperMajorityAgainst' | 'SimpleMajority';
  }

  /** @name PalletDemocracyVoteAccountVote (86) */
  export interface PalletDemocracyVoteAccountVote extends Enum {
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

  /** @name EthBridgeEvent (88) */
  export interface EthBridgeEvent extends Enum {
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

  /** @name PswapDistributionEvent (89) */
  export interface PswapDistributionEvent extends Enum {
    readonly isFeesExchanged: boolean;
    readonly asFeesExchanged: ITuple<[u32, AccountId32, CommonPrimitivesAssetId32, u128, CommonPrimitivesAssetId32, u128]>;
    readonly isFeesExchangeFailed: boolean;
    readonly asFeesExchangeFailed: ITuple<[u32, AccountId32, CommonPrimitivesAssetId32, u128, CommonPrimitivesAssetId32]>;
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

  /** @name PalletMultisigTimepoint (91) */
  export interface PalletMultisigTimepoint extends Struct {
    readonly height: u32;
    readonly index: u32;
  }

  /** @name PalletSchedulerEvent (92) */
  export interface PalletSchedulerEvent extends Enum {
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

  /** @name FrameSupportScheduleLookupError (95) */
  export interface FrameSupportScheduleLookupError extends Enum {
    readonly isUnknown: boolean;
    readonly isBadFormat: boolean;
    readonly type: 'Unknown' | 'BadFormat';
  }

  /** @name IrohaMigrationEvent (96) */
  export interface IrohaMigrationEvent extends Enum {
    readonly isMigrated: boolean;
    readonly asMigrated: ITuple<[Text, AccountId32]>;
    readonly type: 'Migrated';
  }

  /** @name PalletMembershipEvent (98) */
  export interface PalletMembershipEvent extends Enum {
    readonly isMemberAdded: boolean;
    readonly isMemberRemoved: boolean;
    readonly isMembersSwapped: boolean;
    readonly isMembersReset: boolean;
    readonly isKeyChanged: boolean;
    readonly isDummy: boolean;
    readonly type: 'MemberAdded' | 'MemberRemoved' | 'MembersSwapped' | 'MembersReset' | 'KeyChanged' | 'Dummy';
  }

  /** @name PalletElectionsPhragmenEvent (99) */
  export interface PalletElectionsPhragmenEvent extends Enum {
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

  /** @name VestedRewardsEvent (102) */
  export interface VestedRewardsEvent extends Enum {
    readonly isRewardsVested: boolean;
    readonly asRewardsVested: u128;
    readonly isActualDoesntMatchAvailable: boolean;
    readonly asActualDoesntMatchAvailable: CommonPrimitivesRewardReason;
    readonly isFailedToSaveCalculatedReward: boolean;
    readonly asFailedToSaveCalculatedReward: AccountId32;
    readonly isAddingZeroMarketMakerReward: boolean;
    readonly asAddingZeroMarketMakerReward: AccountId32;
    readonly isNoEligibleMarketMakers: boolean;
    readonly type: 'RewardsVested' | 'ActualDoesntMatchAvailable' | 'FailedToSaveCalculatedReward' | 'AddingZeroMarketMakerReward' | 'NoEligibleMarketMakers';
  }

  /** @name CommonPrimitivesRewardReason (103) */
  export interface CommonPrimitivesRewardReason extends Enum {
    readonly isUnspecified: boolean;
    readonly isBuyOnBondingCurve: boolean;
    readonly isLiquidityProvisionFarming: boolean;
    readonly isMarketMakerVolume: boolean;
    readonly isCrowdloan: boolean;
    readonly type: 'Unspecified' | 'BuyOnBondingCurve' | 'LiquidityProvisionFarming' | 'MarketMakerVolume' | 'Crowdloan';
  }

  /** @name PalletIdentityEvent (104) */
  export interface PalletIdentityEvent extends Enum {
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

  /** @name XstEvent (105) */
  export interface XstEvent extends Enum {
    readonly isPoolInitialized: boolean;
    readonly asPoolInitialized: ITuple<[u32, CommonPrimitivesAssetId32]>;
    readonly isReferenceAssetChanged: boolean;
    readonly asReferenceAssetChanged: CommonPrimitivesAssetId32;
    readonly type: 'PoolInitialized' | 'ReferenceAssetChanged';
  }

  /** @name PriceToolsEvent (106) */
  export type PriceToolsEvent = Null;

  /** @name CeresStakingEvent (107) */
  export interface CeresStakingEvent extends Enum {
    readonly isDeposited: boolean;
    readonly asDeposited: ITuple<[AccountId32, u128]>;
    readonly isWithdrawn: boolean;
    readonly asWithdrawn: ITuple<[AccountId32, u128, u128]>;
    readonly isRewardsChanged: boolean;
    readonly asRewardsChanged: u128;
    readonly type: 'Deposited' | 'Withdrawn' | 'RewardsChanged';
  }

  /** @name CeresLiquidityLockerEvent (108) */
  export interface CeresLiquidityLockerEvent extends Enum {
    readonly isLocked: boolean;
    readonly asLocked: ITuple<[AccountId32, u128, u32]>;
    readonly type: 'Locked';
  }

  /** @name CeresTokenLockerEvent (109) */
  export interface CeresTokenLockerEvent extends Enum {
    readonly isLocked: boolean;
    readonly asLocked: ITuple<[AccountId32, u128, CommonPrimitivesAssetId32]>;
    readonly isWithdrawn: boolean;
    readonly asWithdrawn: ITuple<[AccountId32, u128, CommonPrimitivesAssetId32]>;
    readonly isFeeChanged: boolean;
    readonly asFeeChanged: ITuple<[AccountId32, u128]>;
    readonly type: 'Locked' | 'Withdrawn' | 'FeeChanged';
  }

  /** @name CeresGovernancePlatformEvent (110) */
  export interface CeresGovernancePlatformEvent extends Enum {
    readonly isVoted: boolean;
    readonly asVoted: ITuple<[AccountId32, Bytes, u32, u128]>;
    readonly isCreated: boolean;
    readonly asCreated: ITuple<[AccountId32, u32, u32, u32]>;
    readonly isWithdrawn: boolean;
    readonly asWithdrawn: ITuple<[AccountId32, u128]>;
    readonly type: 'Voted' | 'Created' | 'Withdrawn';
  }

  /** @name CeresLaunchpadEvent (111) */
  export interface CeresLaunchpadEvent extends Enum {
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

  /** @name DemeterFarmingPlatformEvent (112) */
  export interface DemeterFarmingPlatformEvent extends Enum {
    readonly isTokenRegistered: boolean;
    readonly asTokenRegistered: ITuple<[AccountId32, CommonPrimitivesAssetId32]>;
    readonly isPoolAdded: boolean;
    readonly asPoolAdded: ITuple<[AccountId32, CommonPrimitivesAssetId32, CommonPrimitivesAssetId32, bool]>;
    readonly isRewardWithdrawn: boolean;
    readonly asRewardWithdrawn: ITuple<[AccountId32, u128, CommonPrimitivesAssetId32, CommonPrimitivesAssetId32, bool]>;
    readonly isWithdrawn: boolean;
    readonly asWithdrawn: ITuple<[AccountId32, u128, CommonPrimitivesAssetId32, CommonPrimitivesAssetId32, bool]>;
    readonly isPoolRemoved: boolean;
    readonly asPoolRemoved: ITuple<[AccountId32, CommonPrimitivesAssetId32, CommonPrimitivesAssetId32, bool]>;
    readonly isDeposited: boolean;
    readonly asDeposited: ITuple<[AccountId32, CommonPrimitivesAssetId32, CommonPrimitivesAssetId32, bool, u128]>;
    readonly isMultiplierChanged: boolean;
    readonly asMultiplierChanged: ITuple<[AccountId32, CommonPrimitivesAssetId32, CommonPrimitivesAssetId32, bool, u32]>;
    readonly isDepositFeeChanged: boolean;
    readonly asDepositFeeChanged: ITuple<[AccountId32, CommonPrimitivesAssetId32, CommonPrimitivesAssetId32, bool, u128]>;
    readonly isTokenInfoChanged: boolean;
    readonly asTokenInfoChanged: ITuple<[AccountId32, CommonPrimitivesAssetId32]>;
    readonly isTotalTokensChanged: boolean;
    readonly asTotalTokensChanged: ITuple<[AccountId32, CommonPrimitivesAssetId32, CommonPrimitivesAssetId32, bool, u128]>;
    readonly isInfoChanged: boolean;
    readonly asInfoChanged: ITuple<[AccountId32, CommonPrimitivesAssetId32, CommonPrimitivesAssetId32, bool, u128]>;
    readonly type: 'TokenRegistered' | 'PoolAdded' | 'RewardWithdrawn' | 'Withdrawn' | 'PoolRemoved' | 'Deposited' | 'MultiplierChanged' | 'DepositFeeChanged' | 'TokenInfoChanged' | 'TotalTokensChanged' | 'InfoChanged';
  }

  /** @name PalletBagsListEvent (113) */
  export interface PalletBagsListEvent extends Enum {
    readonly isRebagged: boolean;
    readonly asRebagged: {
      readonly who: AccountId32;
      readonly from: u64;
      readonly to: u64;
    } & Struct;
    readonly type: 'Rebagged';
  }

  /** @name PalletElectionProviderMultiPhaseEvent (114) */
  export interface PalletElectionProviderMultiPhaseEvent extends Enum {
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

  /** @name PalletElectionProviderMultiPhaseElectionCompute (115) */
  export interface PalletElectionProviderMultiPhaseElectionCompute extends Enum {
    readonly isOnChain: boolean;
    readonly isSigned: boolean;
    readonly isUnsigned: boolean;
    readonly isFallback: boolean;
    readonly isEmergency: boolean;
    readonly type: 'OnChain' | 'Signed' | 'Unsigned' | 'Fallback' | 'Emergency';
  }

  /** @name FaucetEvent (117) */
  export interface FaucetEvent extends Enum {
    readonly isTransferred: boolean;
    readonly asTransferred: ITuple<[AccountId32, u128]>;
    readonly type: 'Transferred';
  }

  /** @name EthereumLightClientEvent (118) */
  export interface EthereumLightClientEvent extends Enum {
    readonly isFinalized: boolean;
    readonly asFinalized: ITuple<[U256, BridgeTypesHeaderHeaderId]>;
    readonly type: 'Finalized';
  }

  /** @name BridgeTypesHeaderHeaderId (121) */
  export interface BridgeTypesHeaderHeaderId extends Struct {
    readonly number: u64;
    readonly hash_: H256;
  }

  /** @name BasicChannelInboundPalletEvent (122) */
  export type BasicChannelInboundPalletEvent = Null;

  /** @name BasicChannelOutboundPalletEvent (123) */
  export interface BasicChannelOutboundPalletEvent extends Enum {
    readonly isMessageAccepted: boolean;
    readonly asMessageAccepted: u64;
    readonly type: 'MessageAccepted';
  }

  /** @name IncentivizedChannelInboundPalletEvent (124) */
  export type IncentivizedChannelInboundPalletEvent = Null;

  /** @name IncentivizedChannelOutboundPalletEvent (125) */
  export interface IncentivizedChannelOutboundPalletEvent extends Enum {
    readonly isMessageAccepted: boolean;
    readonly asMessageAccepted: ITuple<[U256, u64]>;
    readonly type: 'MessageAccepted';
  }

  /** @name DispatchEvent (126) */
  export interface DispatchEvent extends Enum {
    readonly isMessageDispatched: boolean;
    readonly asMessageDispatched: ITuple<[BridgeTypesMessageId, Result<Null, SpRuntimeDispatchError>]>;
    readonly isMessageRejected: boolean;
    readonly asMessageRejected: BridgeTypesMessageId;
    readonly isMessageDecodeFailed: boolean;
    readonly asMessageDecodeFailed: BridgeTypesMessageId;
    readonly type: 'MessageDispatched' | 'MessageRejected' | 'MessageDecodeFailed';
  }

  /** @name BridgeTypesMessageId (127) */
  export interface BridgeTypesMessageId extends Struct {
    readonly channelId: BridgeTypesChannelId;
    readonly nonce: u64;
  }

  /** @name BridgeTypesChannelId (128) */
  export interface BridgeTypesChannelId extends Enum {
    readonly isBasic: boolean;
    readonly isIncentivized: boolean;
    readonly type: 'Basic' | 'Incentivized';
  }

  /** @name LeafProviderEvent (129) */
  export type LeafProviderEvent = Null;

  /** @name EthAppEvent (130) */
  export interface EthAppEvent extends Enum {
    readonly isBurned: boolean;
    readonly asBurned: ITuple<[U256, AccountId32, H160, u128]>;
    readonly isMinted: boolean;
    readonly asMinted: ITuple<[U256, H160, AccountId32, u128]>;
    readonly type: 'Burned' | 'Minted';
  }

  /** @name Erc20AppEvent (133) */
  export interface Erc20AppEvent extends Enum {
    readonly isBurned: boolean;
    readonly asBurned: ITuple<[U256, CommonPrimitivesAssetId32, AccountId32, H160, u128]>;
    readonly isMinted: boolean;
    readonly asMinted: ITuple<[U256, CommonPrimitivesAssetId32, H160, AccountId32, u128]>;
    readonly type: 'Burned' | 'Minted';
  }

  /** @name MigrationAppEvent (134) */
  export interface MigrationAppEvent extends Enum {
    readonly isErc20Migrated: boolean;
    readonly asErc20Migrated: ITuple<[U256, H160]>;
    readonly isSidechainMigrated: boolean;
    readonly asSidechainMigrated: ITuple<[U256, H160]>;
    readonly isEthMigrated: boolean;
    readonly asEthMigrated: ITuple<[U256, H160]>;
    readonly type: 'Erc20Migrated' | 'SidechainMigrated' | 'EthMigrated';
  }

  /** @name FrameSystemPhase (135) */
  export interface FrameSystemPhase extends Enum {
    readonly isApplyExtrinsic: boolean;
    readonly asApplyExtrinsic: u32;
    readonly isFinalization: boolean;
    readonly isInitialization: boolean;
    readonly type: 'ApplyExtrinsic' | 'Finalization' | 'Initialization';
  }

  /** @name FrameSystemLastRuntimeUpgradeInfo (138) */
  export interface FrameSystemLastRuntimeUpgradeInfo extends Struct {
    readonly specVersion: Compact<u32>;
    readonly specName: Text;
  }

  /** @name FrameSystemCall (140) */
  export interface FrameSystemCall extends Enum {
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

  /** @name FrameSystemLimitsBlockWeights (145) */
  export interface FrameSystemLimitsBlockWeights extends Struct {
    readonly baseBlock: u64;
    readonly maxBlock: u64;
    readonly perClass: FrameSupportWeightsPerDispatchClassWeightsPerClass;
  }

  /** @name FrameSupportWeightsPerDispatchClassWeightsPerClass (146) */
  export interface FrameSupportWeightsPerDispatchClassWeightsPerClass extends Struct {
    readonly normal: FrameSystemLimitsWeightsPerClass;
    readonly operational: FrameSystemLimitsWeightsPerClass;
    readonly mandatory: FrameSystemLimitsWeightsPerClass;
  }

  /** @name FrameSystemLimitsWeightsPerClass (147) */
  export interface FrameSystemLimitsWeightsPerClass extends Struct {
    readonly baseExtrinsic: u64;
    readonly maxExtrinsic: Option<u64>;
    readonly maxTotal: Option<u64>;
    readonly reserved: Option<u64>;
  }

  /** @name FrameSystemLimitsBlockLength (149) */
  export interface FrameSystemLimitsBlockLength extends Struct {
    readonly max: FrameSupportWeightsPerDispatchClassU32;
  }

  /** @name FrameSupportWeightsPerDispatchClassU32 (150) */
  export interface FrameSupportWeightsPerDispatchClassU32 extends Struct {
    readonly normal: u32;
    readonly operational: u32;
    readonly mandatory: u32;
  }

  /** @name FrameSupportWeightsRuntimeDbWeight (151) */
  export interface FrameSupportWeightsRuntimeDbWeight extends Struct {
    readonly read: u64;
    readonly write: u64;
  }

  /** @name SpVersionRuntimeVersion (152) */
  export interface SpVersionRuntimeVersion extends Struct {
    readonly specName: Text;
    readonly implName: Text;
    readonly authoringVersion: u32;
    readonly specVersion: u32;
    readonly implVersion: u32;
    readonly apis: Vec<ITuple<[U8aFixed, u32]>>;
    readonly transactionVersion: u32;
    readonly stateVersion: u8;
  }

  /** @name FrameSystemError (157) */
  export interface FrameSystemError extends Enum {
    readonly isInvalidSpecName: boolean;
    readonly isSpecVersionNeedsToIncrease: boolean;
    readonly isFailedToExtractRuntimeVersion: boolean;
    readonly isNonDefaultComposite: boolean;
    readonly isNonZeroRefCount: boolean;
    readonly isCallFiltered: boolean;
    readonly type: 'InvalidSpecName' | 'SpecVersionNeedsToIncrease' | 'FailedToExtractRuntimeVersion' | 'NonDefaultComposite' | 'NonZeroRefCount' | 'CallFiltered';
  }

  /** @name SpConsensusBabeAppPublic (160) */
  export interface SpConsensusBabeAppPublic extends SpCoreSr25519Public {}

  /** @name SpConsensusBabeDigestsNextConfigDescriptor (163) */
  export interface SpConsensusBabeDigestsNextConfigDescriptor extends Enum {
    readonly isV1: boolean;
    readonly asV1: {
      readonly c: ITuple<[u64, u64]>;
      readonly allowedSlots: SpConsensusBabeAllowedSlots;
    } & Struct;
    readonly type: 'V1';
  }

  /** @name SpConsensusBabeAllowedSlots (165) */
  export interface SpConsensusBabeAllowedSlots extends Enum {
    readonly isPrimarySlots: boolean;
    readonly isPrimaryAndSecondaryPlainSlots: boolean;
    readonly isPrimaryAndSecondaryVRFSlots: boolean;
    readonly type: 'PrimarySlots' | 'PrimaryAndSecondaryPlainSlots' | 'PrimaryAndSecondaryVRFSlots';
  }

  /** @name SpConsensusBabeDigestsPreDigest (169) */
  export interface SpConsensusBabeDigestsPreDigest extends Enum {
    readonly isPrimary: boolean;
    readonly asPrimary: SpConsensusBabeDigestsPrimaryPreDigest;
    readonly isSecondaryPlain: boolean;
    readonly asSecondaryPlain: SpConsensusBabeDigestsSecondaryPlainPreDigest;
    readonly isSecondaryVRF: boolean;
    readonly asSecondaryVRF: SpConsensusBabeDigestsSecondaryVRFPreDigest;
    readonly type: 'Primary' | 'SecondaryPlain' | 'SecondaryVRF';
  }

  /** @name SpConsensusBabeDigestsPrimaryPreDigest (170) */
  export interface SpConsensusBabeDigestsPrimaryPreDigest extends Struct {
    readonly authorityIndex: u32;
    readonly slot: u64;
    readonly vrfOutput: U8aFixed;
    readonly vrfProof: U8aFixed;
  }

  /** @name SpConsensusBabeDigestsSecondaryPlainPreDigest (172) */
  export interface SpConsensusBabeDigestsSecondaryPlainPreDigest extends Struct {
    readonly authorityIndex: u32;
    readonly slot: u64;
  }

  /** @name SpConsensusBabeDigestsSecondaryVRFPreDigest (173) */
  export interface SpConsensusBabeDigestsSecondaryVRFPreDigest extends Struct {
    readonly authorityIndex: u32;
    readonly slot: u64;
    readonly vrfOutput: U8aFixed;
    readonly vrfProof: U8aFixed;
  }

  /** @name SpConsensusBabeBabeEpochConfiguration (175) */
  export interface SpConsensusBabeBabeEpochConfiguration extends Struct {
    readonly c: ITuple<[u64, u64]>;
    readonly allowedSlots: SpConsensusBabeAllowedSlots;
  }

  /** @name PalletBabeCall (176) */
  export interface PalletBabeCall extends Enum {
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

  /** @name SpConsensusSlotsEquivocationProof (177) */
  export interface SpConsensusSlotsEquivocationProof extends Struct {
    readonly offender: SpConsensusBabeAppPublic;
    readonly slot: u64;
    readonly firstHeader: SpRuntimeHeader;
    readonly secondHeader: SpRuntimeHeader;
  }

  /** @name SpRuntimeHeader (178) */
  export interface SpRuntimeHeader extends Struct {
    readonly parentHash: H256;
    readonly number: Compact<u32>;
    readonly stateRoot: H256;
    readonly extrinsicsRoot: H256;
    readonly digest: SpRuntimeDigest;
  }

  /** @name SpRuntimeBlakeTwo256 (179) */
  export type SpRuntimeBlakeTwo256 = Null;

  /** @name SpSessionMembershipProof (180) */
  export interface SpSessionMembershipProof extends Struct {
    readonly session: u32;
    readonly trieNodes: Vec<Bytes>;
    readonly validatorCount: u32;
  }

  /** @name PalletBabeError (181) */
  export interface PalletBabeError extends Enum {
    readonly isInvalidEquivocationProof: boolean;
    readonly isInvalidKeyOwnershipProof: boolean;
    readonly isDuplicateOffenceReport: boolean;
    readonly isInvalidConfiguration: boolean;
    readonly type: 'InvalidEquivocationProof' | 'InvalidKeyOwnershipProof' | 'DuplicateOffenceReport' | 'InvalidConfiguration';
  }

  /** @name PalletTimestampCall (182) */
  export interface PalletTimestampCall extends Enum {
    readonly isSet: boolean;
    readonly asSet: {
      readonly now: Compact<u64>;
    } & Struct;
    readonly type: 'Set';
  }

  /** @name PalletBalancesBalanceLock (185) */
  export interface PalletBalancesBalanceLock extends Struct {
    readonly id: U8aFixed;
    readonly amount: u128;
    readonly reasons: PalletBalancesReasons;
  }

  /** @name PalletBalancesReasons (186) */
  export interface PalletBalancesReasons extends Enum {
    readonly isFee: boolean;
    readonly isMisc: boolean;
    readonly isAll: boolean;
    readonly type: 'Fee' | 'Misc' | 'All';
  }

  /** @name PalletBalancesReserveData (189) */
  export interface PalletBalancesReserveData extends Struct {
    readonly id: Null;
    readonly amount: u128;
  }

  /** @name PalletBalancesReleases (191) */
  export interface PalletBalancesReleases extends Enum {
    readonly isV100: boolean;
    readonly isV200: boolean;
    readonly type: 'V100' | 'V200';
  }

  /** @name PalletBalancesCall (192) */
  export interface PalletBalancesCall extends Enum {
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

  /** @name PalletBalancesError (193) */
  export interface PalletBalancesError extends Enum {
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

  /** @name PalletSudoCall (194) */
  export interface PalletSudoCall extends Enum {
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

  /** @name PermissionsCall (196) */
  export type PermissionsCall = Null;

  /** @name ReferralsCall (197) */
  export interface ReferralsCall extends Enum {
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

  /** @name RewardsCall (198) */
  export interface RewardsCall extends Enum {
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

  /** @name XorFeeCall (200) */
  export type XorFeeCall = Null;

  /** @name PalletMultisigCall (201) */
  export interface PalletMultisigCall extends Enum {
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

  /** @name PalletUtilityCall (203) */
  export interface PalletUtilityCall extends Enum {
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

  /** @name FramenodeRuntimeOriginCaller (205) */
  export interface FramenodeRuntimeOriginCaller extends Enum {
    readonly isSystem: boolean;
    readonly asSystem: FrameSupportDispatchRawOrigin;
    readonly isVoid: boolean;
    readonly isCouncil: boolean;
    readonly asCouncil: PalletCollectiveRawOrigin;
    readonly isTechnicalCommittee: boolean;
    readonly asTechnicalCommittee: PalletCollectiveRawOrigin;
    readonly isDispatch: boolean;
    readonly asDispatch: DispatchRawOrigin;
    readonly type: 'System' | 'Void' | 'Council' | 'TechnicalCommittee' | 'Dispatch';
  }

  /** @name FrameSupportDispatchRawOrigin (206) */
  export interface FrameSupportDispatchRawOrigin extends Enum {
    readonly isRoot: boolean;
    readonly isSigned: boolean;
    readonly asSigned: AccountId32;
    readonly isNone: boolean;
    readonly type: 'Root' | 'Signed' | 'None';
  }

  /** @name PalletCollectiveRawOrigin (207) */
  export interface PalletCollectiveRawOrigin extends Enum {
    readonly isMembers: boolean;
    readonly asMembers: ITuple<[u32, u32]>;
    readonly isMember: boolean;
    readonly asMember: AccountId32;
    readonly isPhantom: boolean;
    readonly type: 'Members' | 'Member' | 'Phantom';
  }

  /** @name DispatchRawOrigin (209) */
  export interface DispatchRawOrigin extends ITuple<[U256, H160]> {}

  /** @name SpCoreVoid (210) */
  export type SpCoreVoid = Null;

  /** @name PalletAuthorshipCall (211) */
  export interface PalletAuthorshipCall extends Enum {
    readonly isSetUncles: boolean;
    readonly asSetUncles: {
      readonly newUncles: Vec<SpRuntimeHeader>;
    } & Struct;
    readonly type: 'SetUncles';
  }

  /** @name PalletStakingPalletCall (213) */
  export interface PalletStakingPalletCall extends Enum {
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

  /** @name PalletStakingRewardDestination (214) */
  export interface PalletStakingRewardDestination extends Enum {
    readonly isStaked: boolean;
    readonly isStash: boolean;
    readonly isController: boolean;
    readonly isAccount: boolean;
    readonly asAccount: AccountId32;
    readonly isNone: boolean;
    readonly type: 'Staked' | 'Stash' | 'Controller' | 'Account' | 'None';
  }

  /** @name PalletStakingValidatorPrefs (215) */
  export interface PalletStakingValidatorPrefs extends Struct {
    readonly commission: Compact<Perbill>;
    readonly blocked: bool;
  }

  /** @name PalletStakingPalletConfigOpU128 (219) */
  export interface PalletStakingPalletConfigOpU128 extends Enum {
    readonly isNoop: boolean;
    readonly isSet: boolean;
    readonly asSet: u128;
    readonly isRemove: boolean;
    readonly type: 'Noop' | 'Set' | 'Remove';
  }

  /** @name PalletStakingPalletConfigOpU32 (220) */
  export interface PalletStakingPalletConfigOpU32 extends Enum {
    readonly isNoop: boolean;
    readonly isSet: boolean;
    readonly asSet: u32;
    readonly isRemove: boolean;
    readonly type: 'Noop' | 'Set' | 'Remove';
  }

  /** @name PalletStakingPalletConfigOpPercent (221) */
  export interface PalletStakingPalletConfigOpPercent extends Enum {
    readonly isNoop: boolean;
    readonly isSet: boolean;
    readonly asSet: Percent;
    readonly isRemove: boolean;
    readonly type: 'Noop' | 'Set' | 'Remove';
  }

  /** @name PalletStakingPalletConfigOpPerbill (222) */
  export interface PalletStakingPalletConfigOpPerbill extends Enum {
    readonly isNoop: boolean;
    readonly isSet: boolean;
    readonly asSet: Perbill;
    readonly isRemove: boolean;
    readonly type: 'Noop' | 'Set' | 'Remove';
  }

  /** @name PalletSessionCall (223) */
  export interface PalletSessionCall extends Enum {
    readonly isSetKeys: boolean;
    readonly asSetKeys: {
      readonly keys_: FramenodeRuntimeOpaqueSessionKeys;
      readonly proof: Bytes;
    } & Struct;
    readonly isPurgeKeys: boolean;
    readonly type: 'SetKeys' | 'PurgeKeys';
  }

  /** @name FramenodeRuntimeOpaqueSessionKeys (224) */
  export interface FramenodeRuntimeOpaqueSessionKeys extends Struct {
    readonly babe: SpConsensusBabeAppPublic;
    readonly grandpa: SpFinalityGrandpaAppPublic;
    readonly imOnline: PalletImOnlineSr25519AppSr25519Public;
    readonly beefy: BeefyPrimitivesCryptoPublic;
  }

  /** @name BeefyPrimitivesCryptoPublic (225) */
  export interface BeefyPrimitivesCryptoPublic extends SpCoreEcdsaPublic {}

  /** @name SpCoreEcdsaPublic (226) */
  export interface SpCoreEcdsaPublic extends U8aFixed {}

  /** @name PalletGrandpaCall (228) */
  export interface PalletGrandpaCall extends Enum {
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

  /** @name SpFinalityGrandpaEquivocationProof (229) */
  export interface SpFinalityGrandpaEquivocationProof extends Struct {
    readonly setId: u64;
    readonly equivocation: SpFinalityGrandpaEquivocation;
  }

  /** @name SpFinalityGrandpaEquivocation (230) */
  export interface SpFinalityGrandpaEquivocation extends Enum {
    readonly isPrevote: boolean;
    readonly asPrevote: FinalityGrandpaEquivocationPrevote;
    readonly isPrecommit: boolean;
    readonly asPrecommit: FinalityGrandpaEquivocationPrecommit;
    readonly type: 'Prevote' | 'Precommit';
  }

  /** @name FinalityGrandpaEquivocationPrevote (231) */
  export interface FinalityGrandpaEquivocationPrevote extends Struct {
    readonly roundNumber: u64;
    readonly identity: SpFinalityGrandpaAppPublic;
    readonly first: ITuple<[FinalityGrandpaPrevote, SpFinalityGrandpaAppSignature]>;
    readonly second: ITuple<[FinalityGrandpaPrevote, SpFinalityGrandpaAppSignature]>;
  }

  /** @name FinalityGrandpaPrevote (232) */
  export interface FinalityGrandpaPrevote extends Struct {
    readonly targetHash: H256;
    readonly targetNumber: u32;
  }

  /** @name SpFinalityGrandpaAppSignature (233) */
  export interface SpFinalityGrandpaAppSignature extends SpCoreEd25519Signature {}

  /** @name SpCoreEd25519Signature (234) */
  export interface SpCoreEd25519Signature extends U8aFixed {}

  /** @name FinalityGrandpaEquivocationPrecommit (236) */
  export interface FinalityGrandpaEquivocationPrecommit extends Struct {
    readonly roundNumber: u64;
    readonly identity: SpFinalityGrandpaAppPublic;
    readonly first: ITuple<[FinalityGrandpaPrecommit, SpFinalityGrandpaAppSignature]>;
    readonly second: ITuple<[FinalityGrandpaPrecommit, SpFinalityGrandpaAppSignature]>;
  }

  /** @name FinalityGrandpaPrecommit (237) */
  export interface FinalityGrandpaPrecommit extends Struct {
    readonly targetHash: H256;
    readonly targetNumber: u32;
  }

  /** @name PalletImOnlineCall (239) */
  export interface PalletImOnlineCall extends Enum {
    readonly isHeartbeat: boolean;
    readonly asHeartbeat: {
      readonly heartbeat: PalletImOnlineHeartbeat;
      readonly signature: PalletImOnlineSr25519AppSr25519Signature;
    } & Struct;
    readonly type: 'Heartbeat';
  }

  /** @name PalletImOnlineHeartbeat (240) */
  export interface PalletImOnlineHeartbeat extends Struct {
    readonly blockNumber: u32;
    readonly networkState: SpCoreOffchainOpaqueNetworkState;
    readonly sessionIndex: u32;
    readonly authorityIndex: u32;
    readonly validatorsLen: u32;
  }

  /** @name SpCoreOffchainOpaqueNetworkState (241) */
  export interface SpCoreOffchainOpaqueNetworkState extends Struct {
    readonly peerId: Bytes;
    readonly externalAddresses: Vec<Bytes>;
  }

  /** @name PalletImOnlineSr25519AppSr25519Signature (245) */
  export interface PalletImOnlineSr25519AppSr25519Signature extends SpCoreSr25519Signature {}

  /** @name SpCoreSr25519Signature (246) */
  export interface SpCoreSr25519Signature extends U8aFixed {}

  /** @name OrmlCurrenciesModuleCall (247) */
  export interface OrmlCurrenciesModuleCall extends Enum {
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

  /** @name TradingPairCall (248) */
  export interface TradingPairCall extends Enum {
    readonly isRegister: boolean;
    readonly asRegister: {
      readonly dexId: u32;
      readonly baseAssetId: CommonPrimitivesAssetId32;
      readonly targetAssetId: CommonPrimitivesAssetId32;
    } & Struct;
    readonly type: 'Register';
  }

  /** @name AssetsCall (249) */
  export interface AssetsCall extends Enum {
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
    readonly isBurn: boolean;
    readonly asBurn: {
      readonly assetId: CommonPrimitivesAssetId32;
      readonly amount: u128;
    } & Struct;
    readonly isSetNonMintable: boolean;
    readonly asSetNonMintable: {
      readonly assetId: CommonPrimitivesAssetId32;
    } & Struct;
    readonly type: 'Register' | 'Transfer' | 'Mint' | 'Burn' | 'SetNonMintable';
  }

  /** @name MulticollateralBondingCurvePoolCall (256) */
  export interface MulticollateralBondingCurvePoolCall extends Enum {
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

  /** @name TechnicalCall (257) */
  export type TechnicalCall = Null;

  /** @name PoolXykCall (258) */
  export interface PoolXykCall extends Enum {
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

  /** @name LiquidityProxyCall (259) */
  export interface LiquidityProxyCall extends Enum {
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
    readonly type: 'Swap' | 'SwapTransfer';
  }

  /** @name CommonSwapAmount (260) */
  export interface CommonSwapAmount extends Enum {
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

  /** @name CommonPrimitivesFilterMode (262) */
  export interface CommonPrimitivesFilterMode extends Enum {
    readonly isDisabled: boolean;
    readonly isForbidSelected: boolean;
    readonly isAllowSelected: boolean;
    readonly type: 'Disabled' | 'ForbidSelected' | 'AllowSelected';
  }

  /** @name PalletCollectiveCall (263) */
  export interface PalletCollectiveCall extends Enum {
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

  /** @name PalletDemocracyCall (265) */
  export interface PalletDemocracyCall extends Enum {
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

  /** @name PalletDemocracyConviction (266) */
  export interface PalletDemocracyConviction extends Enum {
    readonly isNone: boolean;
    readonly isLocked1x: boolean;
    readonly isLocked2x: boolean;
    readonly isLocked3x: boolean;
    readonly isLocked4x: boolean;
    readonly isLocked5x: boolean;
    readonly isLocked6x: boolean;
    readonly type: 'None' | 'Locked1x' | 'Locked2x' | 'Locked3x' | 'Locked4x' | 'Locked5x' | 'Locked6x';
  }

  /** @name DexApiCall (268) */
  export type DexApiCall = Null;

  /** @name EthBridgeCall (269) */
  export interface EthBridgeCall extends Enum {
    readonly isRegisterBridge: boolean;
    readonly asRegisterBridge: {
      readonly bridgeContractAddress: H160;
      readonly initialPeers: Vec<AccountId32>;
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

  /** @name EthBridgeRequestsIncomingRequestKind (270) */
  export interface EthBridgeRequestsIncomingRequestKind extends Enum {
    readonly isTransaction: boolean;
    readonly asTransaction: EthBridgeRequestsIncomingTransactionRequestKind;
    readonly isMeta: boolean;
    readonly asMeta: EthBridgeRequestsIncomingMetaRequestKind;
    readonly type: 'Transaction' | 'Meta';
  }

  /** @name EthBridgeRequestsIncomingTransactionRequestKind (271) */
  export interface EthBridgeRequestsIncomingTransactionRequestKind extends Enum {
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

  /** @name EthBridgeRequestsIncomingMetaRequestKind (272) */
  export interface EthBridgeRequestsIncomingMetaRequestKind extends Enum {
    readonly isCancelOutgoingRequest: boolean;
    readonly isMarkAsDone: boolean;
    readonly type: 'CancelOutgoingRequest' | 'MarkAsDone';
  }

  /** @name EthBridgeRequestsIncomingRequest (274) */
  export interface EthBridgeRequestsIncomingRequest extends Enum {
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

  /** @name EthBridgeRequestsIncomingIncomingTransfer (275) */
  export interface EthBridgeRequestsIncomingIncomingTransfer extends Struct {
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

  /** @name EthBridgeRequestsAssetKind (276) */
  export interface EthBridgeRequestsAssetKind extends Enum {
    readonly isThischain: boolean;
    readonly isSidechain: boolean;
    readonly isSidechainOwned: boolean;
    readonly type: 'Thischain' | 'Sidechain' | 'SidechainOwned';
  }

  /** @name EthBridgeRequestsIncomingIncomingAddToken (277) */
  export interface EthBridgeRequestsIncomingIncomingAddToken extends Struct {
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

  /** @name EthBridgeRequestsIncomingIncomingChangePeers (278) */
  export interface EthBridgeRequestsIncomingIncomingChangePeers extends Struct {
    readonly peerAccountId: Option<AccountId32>;
    readonly peerAddress: H160;
    readonly removed: bool;
    readonly author: AccountId32;
    readonly txHash: H256;
    readonly atHeight: u64;
    readonly timepoint: PalletMultisigBridgeTimepoint;
    readonly networkId: u32;
  }

  /** @name EthBridgeRequestsIncomingIncomingCancelOutgoingRequest (279) */
  export interface EthBridgeRequestsIncomingIncomingCancelOutgoingRequest extends Struct {
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

  /** @name EthBridgeRequestsOutgoingRequest (280) */
  export interface EthBridgeRequestsOutgoingRequest extends Enum {
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

  /** @name EthBridgeRequestsOutgoingOutgoingTransfer (281) */
  export interface EthBridgeRequestsOutgoingOutgoingTransfer extends Struct {
    readonly from: AccountId32;
    readonly to: H160;
    readonly assetId: CommonPrimitivesAssetId32;
    readonly amount: u128;
    readonly nonce: u32;
    readonly networkId: u32;
    readonly timepoint: PalletMultisigBridgeTimepoint;
  }

  /** @name EthBridgeRequestsOutgoingOutgoingAddAsset (282) */
  export interface EthBridgeRequestsOutgoingOutgoingAddAsset extends Struct {
    readonly author: AccountId32;
    readonly assetId: CommonPrimitivesAssetId32;
    readonly nonce: u32;
    readonly networkId: u32;
    readonly timepoint: PalletMultisigBridgeTimepoint;
  }

  /** @name EthBridgeRequestsOutgoingOutgoingAddToken (283) */
  export interface EthBridgeRequestsOutgoingOutgoingAddToken extends Struct {
    readonly author: AccountId32;
    readonly tokenAddress: H160;
    readonly symbol: Text;
    readonly name: Text;
    readonly decimals: u8;
    readonly nonce: u32;
    readonly networkId: u32;
    readonly timepoint: PalletMultisigBridgeTimepoint;
  }

  /** @name EthBridgeRequestsOutgoingOutgoingAddPeer (284) */
  export interface EthBridgeRequestsOutgoingOutgoingAddPeer extends Struct {
    readonly author: AccountId32;
    readonly peerAddress: H160;
    readonly peerAccountId: AccountId32;
    readonly nonce: u32;
    readonly networkId: u32;
    readonly timepoint: PalletMultisigBridgeTimepoint;
  }

  /** @name EthBridgeRequestsOutgoingOutgoingRemovePeer (285) */
  export interface EthBridgeRequestsOutgoingOutgoingRemovePeer extends Struct {
    readonly author: AccountId32;
    readonly peerAccountId: AccountId32;
    readonly peerAddress: H160;
    readonly nonce: u32;
    readonly networkId: u32;
    readonly timepoint: PalletMultisigBridgeTimepoint;
    readonly compatHash: Option<H256>;
  }

  /** @name EthBridgeRequestsOutgoingOutgoingPrepareForMigration (287) */
  export interface EthBridgeRequestsOutgoingOutgoingPrepareForMigration extends Struct {
    readonly author: AccountId32;
    readonly nonce: u32;
    readonly networkId: u32;
    readonly timepoint: PalletMultisigBridgeTimepoint;
  }

  /** @name EthBridgeRequestsOutgoingOutgoingMigrate (288) */
  export interface EthBridgeRequestsOutgoingOutgoingMigrate extends Struct {
    readonly author: AccountId32;
    readonly newContractAddress: H160;
    readonly erc20NativeTokens: Vec<H160>;
    readonly nonce: u32;
    readonly networkId: u32;
    readonly timepoint: PalletMultisigBridgeTimepoint;
  }

  /** @name EthBridgeRequestsOutgoingOutgoingAddPeerCompat (289) */
  export interface EthBridgeRequestsOutgoingOutgoingAddPeerCompat extends Struct {
    readonly author: AccountId32;
    readonly peerAddress: H160;
    readonly peerAccountId: AccountId32;
    readonly nonce: u32;
    readonly networkId: u32;
    readonly timepoint: PalletMultisigBridgeTimepoint;
  }

  /** @name EthBridgeRequestsOutgoingOutgoingRemovePeerCompat (290) */
  export interface EthBridgeRequestsOutgoingOutgoingRemovePeerCompat extends Struct {
    readonly author: AccountId32;
    readonly peerAccountId: AccountId32;
    readonly peerAddress: H160;
    readonly nonce: u32;
    readonly networkId: u32;
    readonly timepoint: PalletMultisigBridgeTimepoint;
  }

  /** @name EthBridgeRequestsIncomingIncomingMarkAsDoneRequest (291) */
  export interface EthBridgeRequestsIncomingIncomingMarkAsDoneRequest extends Struct {
    readonly outgoingRequestHash: H256;
    readonly initialRequestHash: H256;
    readonly author: AccountId32;
    readonly atHeight: u64;
    readonly timepoint: PalletMultisigBridgeTimepoint;
    readonly networkId: u32;
  }

  /** @name EthBridgeRequestsIncomingIncomingPrepareForMigration (292) */
  export interface EthBridgeRequestsIncomingIncomingPrepareForMigration extends Struct {
    readonly author: AccountId32;
    readonly txHash: H256;
    readonly atHeight: u64;
    readonly timepoint: PalletMultisigBridgeTimepoint;
    readonly networkId: u32;
  }

  /** @name EthBridgeRequestsIncomingIncomingMigrate (293) */
  export interface EthBridgeRequestsIncomingIncomingMigrate extends Struct {
    readonly newContractAddress: H160;
    readonly author: AccountId32;
    readonly txHash: H256;
    readonly atHeight: u64;
    readonly timepoint: PalletMultisigBridgeTimepoint;
    readonly networkId: u32;
  }

  /** @name EthBridgeRequestsIncomingIncomingChangePeersCompat (294) */
  export interface EthBridgeRequestsIncomingIncomingChangePeersCompat extends Struct {
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

  /** @name EthBridgeRequestsIncomingChangePeersContract (295) */
  export interface EthBridgeRequestsIncomingChangePeersContract extends Enum {
    readonly isXor: boolean;
    readonly isVal: boolean;
    readonly type: 'Xor' | 'Val';
  }

  /** @name EthBridgeRequestsLoadIncomingRequest (296) */
  export interface EthBridgeRequestsLoadIncomingRequest extends Enum {
    readonly isTransaction: boolean;
    readonly asTransaction: EthBridgeRequestsLoadIncomingTransactionRequest;
    readonly isMeta: boolean;
    readonly asMeta: ITuple<[EthBridgeRequestsLoadIncomingMetaRequest, H256]>;
    readonly type: 'Transaction' | 'Meta';
  }

  /** @name EthBridgeRequestsLoadIncomingTransactionRequest (297) */
  export interface EthBridgeRequestsLoadIncomingTransactionRequest extends Struct {
    readonly author: AccountId32;
    readonly hash_: H256;
    readonly timepoint: PalletMultisigBridgeTimepoint;
    readonly kind: EthBridgeRequestsIncomingTransactionRequestKind;
    readonly networkId: u32;
  }

  /** @name EthBridgeRequestsLoadIncomingMetaRequest (298) */
  export interface EthBridgeRequestsLoadIncomingMetaRequest extends Struct {
    readonly author: AccountId32;
    readonly hash_: H256;
    readonly timepoint: PalletMultisigBridgeTimepoint;
    readonly kind: EthBridgeRequestsIncomingMetaRequestKind;
    readonly networkId: u32;
  }

  /** @name EthBridgeOffchainSignatureParams (300) */
  export interface EthBridgeOffchainSignatureParams extends Struct {
    readonly r: U8aFixed;
    readonly s: U8aFixed;
    readonly v: u8;
  }

  /** @name PswapDistributionCall (301) */
  export interface PswapDistributionCall extends Enum {
    readonly isClaimIncentive: boolean;
    readonly type: 'ClaimIncentive';
  }

  /** @name PalletSchedulerCall (305) */
  export interface PalletSchedulerCall extends Enum {
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

  /** @name FrameSupportScheduleMaybeHashed (307) */
  export interface FrameSupportScheduleMaybeHashed extends Enum {
    readonly isValue: boolean;
    readonly asValue: Call;
    readonly isHash: boolean;
    readonly asHash: H256;
    readonly type: 'Value' | 'Hash';
  }

  /** @name IrohaMigrationCall (308) */
  export interface IrohaMigrationCall extends Enum {
    readonly isMigrate: boolean;
    readonly asMigrate: {
      readonly irohaAddress: Text;
      readonly irohaPublicKey: Text;
      readonly irohaSignature: Text;
    } & Struct;
    readonly type: 'Migrate';
  }

  /** @name PalletMembershipCall (309) */
  export interface PalletMembershipCall extends Enum {
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

  /** @name PalletElectionsPhragmenCall (310) */
  export interface PalletElectionsPhragmenCall extends Enum {
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

  /** @name PalletElectionsPhragmenRenouncing (311) */
  export interface PalletElectionsPhragmenRenouncing extends Enum {
    readonly isMember: boolean;
    readonly isRunnerUp: boolean;
    readonly isCandidate: boolean;
    readonly asCandidate: Compact<u32>;
    readonly type: 'Member' | 'RunnerUp' | 'Candidate';
  }

  /** @name VestedRewardsCall (312) */
  export interface VestedRewardsCall extends Enum {
    readonly isClaimRewards: boolean;
    readonly isClaimCrowdloanRewards: boolean;
    readonly asClaimCrowdloanRewards: {
      readonly assetId: CommonPrimitivesAssetId32;
    } & Struct;
    readonly isSetAssetPair: boolean;
    readonly asSetAssetPair: {
      readonly fromAssetId: CommonPrimitivesAssetId32;
      readonly toAssetId: CommonPrimitivesAssetId32;
      readonly marketMakingRewardsAllowed: bool;
    } & Struct;
    readonly type: 'ClaimRewards' | 'ClaimCrowdloanRewards' | 'SetAssetPair';
  }

  /** @name PalletIdentityCall (313) */
  export interface PalletIdentityCall extends Enum {
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

  /** @name PalletIdentityIdentityInfo (314) */
  export interface PalletIdentityIdentityInfo extends Struct {
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

  /** @name PalletIdentityBitFlags (350) */
  export interface PalletIdentityBitFlags extends Set {
    readonly isDisplay: boolean;
    readonly isLegal: boolean;
    readonly isWeb: boolean;
    readonly isRiot: boolean;
    readonly isEmail: boolean;
    readonly isPgpFingerprint: boolean;
    readonly isImage: boolean;
    readonly isTwitter: boolean;
  }

  /** @name PalletIdentityIdentityField (351) */
  export interface PalletIdentityIdentityField extends Enum {
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

  /** @name PalletIdentityJudgement (352) */
  export interface PalletIdentityJudgement extends Enum {
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

  /** @name XstCall (353) */
  export interface XstCall extends Enum {
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
    readonly type: 'InitializePool' | 'SetReferenceAsset' | 'EnableSyntheticAsset';
  }

  /** @name CeresStakingCall (354) */
  export interface CeresStakingCall extends Enum {
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

  /** @name CeresLiquidityLockerCall (355) */
  export interface CeresLiquidityLockerCall extends Enum {
    readonly isLockLiquidity: boolean;
    readonly asLockLiquidity: {
      readonly assetA: CommonPrimitivesAssetId32;
      readonly assetB: CommonPrimitivesAssetId32;
      readonly unlockingBlock: u32;
      readonly percentageOfPoolTokens: u128;
      readonly option: bool;
    } & Struct;
    readonly isChangeCeresFee: boolean;
    readonly asChangeCeresFee: {
      readonly ceresFee: u128;
    } & Struct;
    readonly type: 'LockLiquidity' | 'ChangeCeresFee';
  }

  /** @name CeresTokenLockerCall (356) */
  export interface CeresTokenLockerCall extends Enum {
    readonly isLockTokens: boolean;
    readonly asLockTokens: {
      readonly assetId: CommonPrimitivesAssetId32;
      readonly unlockingBlock: u32;
      readonly numberOfTokens: u128;
    } & Struct;
    readonly isWithdrawTokens: boolean;
    readonly asWithdrawTokens: {
      readonly assetId: CommonPrimitivesAssetId32;
      readonly unlockingBlock: u32;
      readonly numberOfTokens: u128;
    } & Struct;
    readonly isChangeFee: boolean;
    readonly asChangeFee: {
      readonly newFee: u128;
    } & Struct;
    readonly type: 'LockTokens' | 'WithdrawTokens' | 'ChangeFee';
  }

  /** @name CeresGovernancePlatformCall (357) */
  export interface CeresGovernancePlatformCall extends Enum {
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
      readonly pollStartBlock: u32;
      readonly pollEndBlock: u32;
    } & Struct;
    readonly isWithdraw: boolean;
    readonly asWithdraw: {
      readonly pollId: Bytes;
    } & Struct;
    readonly type: 'Vote' | 'CreatePoll' | 'Withdraw';
  }

  /** @name CeresLaunchpadCall (358) */
  export interface CeresLaunchpadCall extends Enum {
    readonly isCreateIlo: boolean;
    readonly asCreateIlo: {
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
      readonly startBlock: u32;
      readonly endBlock: u32;
      readonly teamVestingTotalTokens: u128;
      readonly teamVestingFirstReleasePercent: u128;
      readonly teamVestingPeriod: u32;
      readonly teamVestingPercent: u128;
      readonly firstReleasePercent: u128;
      readonly vestingPeriod: u32;
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
    readonly type: 'CreateIlo' | 'Contribute' | 'EmergencyWithdraw' | 'FinishIlo' | 'ClaimLpTokens' | 'Claim' | 'ChangeCeresBurnFee' | 'ChangeCeresContributionFee' | 'ClaimPswapRewards' | 'AddWhitelistedContributor' | 'RemoveWhitelistedContributor' | 'AddWhitelistedIloOrganizer' | 'RemoveWhitelistedIloOrganizer';
  }

  /** @name DemeterFarmingPlatformCall (359) */
  export interface DemeterFarmingPlatformCall extends Enum {
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
      readonly poolAsset: CommonPrimitivesAssetId32;
      readonly rewardAsset: CommonPrimitivesAssetId32;
      readonly isFarm: bool;
      readonly multiplier: u32;
      readonly depositFee: u128;
      readonly isCore: bool;
    } & Struct;
    readonly isDeposit: boolean;
    readonly asDeposit: {
      readonly poolAsset: CommonPrimitivesAssetId32;
      readonly rewardAsset: CommonPrimitivesAssetId32;
      readonly isFarm: bool;
      readonly pooledTokens: u128;
    } & Struct;
    readonly isGetRewards: boolean;
    readonly asGetRewards: {
      readonly poolAsset: CommonPrimitivesAssetId32;
      readonly rewardAsset: CommonPrimitivesAssetId32;
      readonly isFarm: bool;
    } & Struct;
    readonly isWithdraw: boolean;
    readonly asWithdraw: {
      readonly poolAsset: CommonPrimitivesAssetId32;
      readonly rewardAsset: CommonPrimitivesAssetId32;
      readonly pooledTokens: u128;
      readonly isFarm: bool;
    } & Struct;
    readonly isRemovePool: boolean;
    readonly asRemovePool: {
      readonly poolAsset: CommonPrimitivesAssetId32;
      readonly rewardAsset: CommonPrimitivesAssetId32;
      readonly isFarm: bool;
    } & Struct;
    readonly isChangePoolMultiplier: boolean;
    readonly asChangePoolMultiplier: {
      readonly poolAsset: CommonPrimitivesAssetId32;
      readonly rewardAsset: CommonPrimitivesAssetId32;
      readonly isFarm: bool;
      readonly newMultiplier: u32;
    } & Struct;
    readonly isChangeTotalTokens: boolean;
    readonly asChangeTotalTokens: {
      readonly poolAsset: CommonPrimitivesAssetId32;
      readonly rewardAsset: CommonPrimitivesAssetId32;
      readonly isFarm: bool;
      readonly totalTokens: u128;
    } & Struct;
    readonly isChangeInfo: boolean;
    readonly asChangeInfo: {
      readonly changedUser: AccountId32;
      readonly poolAsset: CommonPrimitivesAssetId32;
      readonly rewardAsset: CommonPrimitivesAssetId32;
      readonly isFarm: bool;
      readonly poolTokens: u128;
    } & Struct;
    readonly isChangePoolDepositFee: boolean;
    readonly asChangePoolDepositFee: {
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

  /** @name PalletBagsListCall (360) */
  export interface PalletBagsListCall extends Enum {
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

  /** @name PalletElectionProviderMultiPhaseCall (361) */
  export interface PalletElectionProviderMultiPhaseCall extends Enum {
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

  /** @name PalletElectionProviderMultiPhaseRawSolution (362) */
  export interface PalletElectionProviderMultiPhaseRawSolution extends Struct {
    readonly solution: FramenodeRuntimeNposCompactSolution24;
    readonly score: SpNposElectionsElectionScore;
    readonly round: u32;
  }

  /** @name FramenodeRuntimeNposCompactSolution24 (363) */
  export interface FramenodeRuntimeNposCompactSolution24 extends Struct {
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

  /** @name SpNposElectionsElectionScore (438) */
  export interface SpNposElectionsElectionScore extends Struct {
    readonly minimalStake: u128;
    readonly sumStake: u128;
    readonly sumStakeSquared: u128;
  }

  /** @name PalletElectionProviderMultiPhaseSolutionOrSnapshotSize (439) */
  export interface PalletElectionProviderMultiPhaseSolutionOrSnapshotSize extends Struct {
    readonly voters: Compact<u32>;
    readonly targets: Compact<u32>;
  }

  /** @name SpNposElectionsSupport (443) */
  export interface SpNposElectionsSupport extends Struct {
    readonly total: u128;
    readonly voters: Vec<ITuple<[AccountId32, u128]>>;
  }

  /** @name FaucetCall (444) */
  export interface FaucetCall extends Enum {
    readonly isTransfer: boolean;
    readonly asTransfer: {
      readonly assetId: CommonPrimitivesAssetId32;
      readonly target: AccountId32;
      readonly amount: u128;
    } & Struct;
    readonly isResetRewards: boolean;
    readonly type: 'Transfer' | 'ResetRewards';
  }

  /** @name EthereumLightClientCall (445) */
  export interface EthereumLightClientCall extends Enum {
    readonly isRegisterNetwork: boolean;
    readonly asRegisterNetwork: {
      readonly networkConfig: BridgeTypesNetworkParamsNetworkConfig;
      readonly header: BridgeTypesHeader;
      readonly initialDifficulty: U256;
    } & Struct;
    readonly isUpdateDifficultyConfig: boolean;
    readonly asUpdateDifficultyConfig: {
      readonly networkConfig: BridgeTypesNetworkParamsNetworkConfig;
    } & Struct;
    readonly isImportHeader: boolean;
    readonly asImportHeader: {
      readonly networkId: U256;
      readonly header: BridgeTypesHeader;
      readonly proof: Vec<BridgeTypesEthashproofDoubleNodeWithMerkleProof>;
    } & Struct;
    readonly type: 'RegisterNetwork' | 'UpdateDifficultyConfig' | 'ImportHeader';
  }

  /** @name BridgeTypesNetworkParamsNetworkConfig (446) */
  export interface BridgeTypesNetworkParamsNetworkConfig extends Enum {
    readonly isMainnet: boolean;
    readonly isRopsten: boolean;
    readonly isSepolia: boolean;
    readonly isRinkeby: boolean;
    readonly isGoerli: boolean;
    readonly isCustom: boolean;
    readonly asCustom: {
      readonly chainId: U256;
      readonly consensus: BridgeTypesNetworkParamsConsensus;
    } & Struct;
    readonly type: 'Mainnet' | 'Ropsten' | 'Sepolia' | 'Rinkeby' | 'Goerli' | 'Custom';
  }

  /** @name BridgeTypesNetworkParamsConsensus (447) */
  export interface BridgeTypesNetworkParamsConsensus extends Enum {
    readonly isEthash: boolean;
    readonly asEthash: {
      readonly difficultyConfig: BridgeTypesDifficultyDifficultyConfig;
    } & Struct;
    readonly isClique: boolean;
    readonly asClique: {
      readonly period: u64;
      readonly epoch: u64;
    } & Struct;
    readonly type: 'Ethash' | 'Clique';
  }

  /** @name BridgeTypesDifficultyDifficultyConfig (448) */
  export interface BridgeTypesDifficultyDifficultyConfig extends Struct {
    readonly byzantiumForkBlock: u64;
    readonly constantinopleForkBlock: u64;
    readonly muirGlacierForkBlock: u64;
    readonly londonForkBlock: u64;
    readonly arrowGlacierForkBlock: u64;
  }

  /** @name BridgeTypesHeader (449) */
  export interface BridgeTypesHeader extends Struct {
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

  /** @name EthbloomBloom (450) */
  export interface EthbloomBloom extends U8aFixed {}

  /** @name BridgeTypesEthashproofDoubleNodeWithMerkleProof (454) */
  export interface BridgeTypesEthashproofDoubleNodeWithMerkleProof extends Struct {
    readonly dagNodes: Vec<H512>;
    readonly proof: Vec<H128>;
  }

  /** @name BasicChannelInboundPalletCall (459) */
  export interface BasicChannelInboundPalletCall extends Enum {
    readonly isSubmit: boolean;
    readonly asSubmit: {
      readonly networkId: U256;
      readonly message: BridgeTypesMessage;
    } & Struct;
    readonly isRegisterChannel: boolean;
    readonly asRegisterChannel: {
      readonly networkId: U256;
      readonly channel: H160;
    } & Struct;
    readonly type: 'Submit' | 'RegisterChannel';
  }

  /** @name BridgeTypesMessage (460) */
  export interface BridgeTypesMessage extends Struct {
    readonly data: Bytes;
    readonly proof: BridgeTypesProof;
  }

  /** @name BridgeTypesProof (461) */
  export interface BridgeTypesProof extends Struct {
    readonly blockHash: H256;
    readonly txIndex: u32;
    readonly data: Vec<Bytes>;
  }

  /** @name IncentivizedChannelInboundPalletCall (462) */
  export interface IncentivizedChannelInboundPalletCall extends Enum {
    readonly isSubmit: boolean;
    readonly asSubmit: {
      readonly networkId: U256;
      readonly message: BridgeTypesMessage;
    } & Struct;
    readonly isRegisterChannel: boolean;
    readonly asRegisterChannel: {
      readonly networkId: U256;
      readonly channel: H160;
    } & Struct;
    readonly isSetRewardFraction: boolean;
    readonly asSetRewardFraction: {
      readonly fraction: Perbill;
    } & Struct;
    readonly type: 'Submit' | 'RegisterChannel' | 'SetRewardFraction';
  }

  /** @name EthAppCall (463) */
  export interface EthAppCall extends Enum {
    readonly isBurn: boolean;
    readonly asBurn: {
      readonly networkId: U256;
      readonly channelId: BridgeTypesChannelId;
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
      readonly contract: H160;
    } & Struct;
    readonly isRegisterNetworkWithExistingAsset: boolean;
    readonly asRegisterNetworkWithExistingAsset: {
      readonly networkId: U256;
      readonly assetId: CommonPrimitivesAssetId32;
      readonly contract: H160;
    } & Struct;
    readonly type: 'Burn' | 'Mint' | 'RegisterNetwork' | 'RegisterNetworkWithExistingAsset';
  }

  /** @name Erc20AppCall (464) */
  export interface Erc20AppCall extends Enum {
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
      readonly channelId: BridgeTypesChannelId;
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
    } & Struct;
    readonly isRegisterExistingErc20Asset: boolean;
    readonly asRegisterExistingErc20Asset: {
      readonly networkId: U256;
      readonly address: H160;
      readonly assetId: CommonPrimitivesAssetId32;
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

  /** @name MigrationAppCall (465) */
  export interface MigrationAppCall extends Enum {
    readonly isMigrateErc20: boolean;
    readonly asMigrateErc20: {
      readonly networkId: U256;
      readonly erc20Assets: Vec<ITuple<[CommonPrimitivesAssetId32, H160]>>;
    } & Struct;
    readonly isMigrateSidechain: boolean;
    readonly asMigrateSidechain: {
      readonly networkId: U256;
      readonly sidechainAssets: Vec<ITuple<[CommonPrimitivesAssetId32, H160]>>;
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

  /** @name PalletSudoError (468) */
  export interface PalletSudoError extends Enum {
    readonly isRequireSudo: boolean;
    readonly type: 'RequireSudo';
  }

  /** @name PalletTransactionPaymentReleases (471) */
  export interface PalletTransactionPaymentReleases extends Enum {
    readonly isV1Ancient: boolean;
    readonly isV2: boolean;
    readonly type: 'V1Ancient' | 'V2';
  }

  /** @name FrameSupportWeightsWeightToFeeCoefficient (473) */
  export interface FrameSupportWeightsWeightToFeeCoefficient extends Struct {
    readonly coeffInteger: u128;
    readonly coeffFrac: Perbill;
    readonly negative: bool;
    readonly degree: u8;
  }

  /** @name PermissionsScope (475) */
  export interface PermissionsScope extends Enum {
    readonly isLimited: boolean;
    readonly asLimited: H512;
    readonly isUnlimited: boolean;
    readonly type: 'Limited' | 'Unlimited';
  }

  /** @name PermissionsError (477) */
  export interface PermissionsError extends Enum {
    readonly isPermissionNotFound: boolean;
    readonly isPermissionNotOwned: boolean;
    readonly isPermissionAlreadyExists: boolean;
    readonly isForbidden: boolean;
    readonly isIncRefError: boolean;
    readonly type: 'PermissionNotFound' | 'PermissionNotOwned' | 'PermissionAlreadyExists' | 'Forbidden' | 'IncRefError';
  }

  /** @name ReferralsError (478) */
  export interface ReferralsError extends Enum {
    readonly isAlreadyHasReferrer: boolean;
    readonly isIncRefError: boolean;
    readonly isReferrerInsufficientBalance: boolean;
    readonly type: 'AlreadyHasReferrer' | 'IncRefError' | 'ReferrerInsufficientBalance';
  }

  /** @name RewardsRewardInfo (479) */
  export interface RewardsRewardInfo extends Struct {
    readonly claimable: u128;
    readonly total: u128;
  }

  /** @name RewardsError (482) */
  export interface RewardsError extends Enum {
    readonly isNothingToClaim: boolean;
    readonly isAddressNotEligible: boolean;
    readonly isSignatureInvalid: boolean;
    readonly isSignatureVerificationFailed: boolean;
    readonly isIllegalCall: boolean;
    readonly type: 'NothingToClaim' | 'AddressNotEligible' | 'SignatureInvalid' | 'SignatureVerificationFailed' | 'IllegalCall';
  }

  /** @name PalletMultisigMultisigAccount (483) */
  export interface PalletMultisigMultisigAccount extends Struct {
    readonly signatories: Vec<AccountId32>;
    readonly threshold: Percent;
  }

  /** @name PalletMultisigMultisig (485) */
  export interface PalletMultisigMultisig extends Struct {
    readonly when: PalletMultisigBridgeTimepoint;
    readonly deposit: u128;
    readonly depositor: AccountId32;
    readonly approvals: Vec<AccountId32>;
  }

  /** @name PalletMultisigError (488) */
  export interface PalletMultisigError extends Enum {
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

  /** @name PalletUtilityError (489) */
  export interface PalletUtilityError extends Enum {
    readonly isTooManyCalls: boolean;
    readonly type: 'TooManyCalls';
  }

  /** @name PalletAuthorshipUncleEntryItem (491) */
  export interface PalletAuthorshipUncleEntryItem extends Enum {
    readonly isInclusionHeight: boolean;
    readonly asInclusionHeight: u32;
    readonly isUncle: boolean;
    readonly asUncle: ITuple<[H256, Option<AccountId32>]>;
    readonly type: 'InclusionHeight' | 'Uncle';
  }

  /** @name PalletAuthorshipError (492) */
  export interface PalletAuthorshipError extends Enum {
    readonly isInvalidUncleParent: boolean;
    readonly isUnclesAlreadySet: boolean;
    readonly isTooManyUncles: boolean;
    readonly isGenesisUncle: boolean;
    readonly isTooHighUncle: boolean;
    readonly isUncleAlreadyIncluded: boolean;
    readonly isOldUncle: boolean;
    readonly type: 'InvalidUncleParent' | 'UnclesAlreadySet' | 'TooManyUncles' | 'GenesisUncle' | 'TooHighUncle' | 'UncleAlreadyIncluded' | 'OldUncle';
  }

  /** @name PalletStakingSoraDurationWrapper (493) */
  export interface PalletStakingSoraDurationWrapper extends Struct {
    readonly secs: u64;
    readonly nanos: u32;
  }

  /** @name PalletStakingStakingLedger (494) */
  export interface PalletStakingStakingLedger extends Struct {
    readonly stash: AccountId32;
    readonly total: Compact<u128>;
    readonly active: Compact<u128>;
    readonly unlocking: Vec<PalletStakingUnlockChunk>;
    readonly claimedRewards: Vec<u32>;
  }

  /** @name PalletStakingUnlockChunk (496) */
  export interface PalletStakingUnlockChunk extends Struct {
    readonly value: Compact<u128>;
    readonly era: Compact<u32>;
  }

  /** @name PalletStakingNominations (498) */
  export interface PalletStakingNominations extends Struct {
    readonly targets: Vec<AccountId32>;
    readonly submittedIn: u32;
    readonly suppressed: bool;
  }

  /** @name PalletStakingActiveEraInfo (500) */
  export interface PalletStakingActiveEraInfo extends Struct {
    readonly index: u32;
    readonly start: Option<u64>;
  }

  /** @name PalletStakingEraRewardPoints (502) */
  export interface PalletStakingEraRewardPoints extends Struct {
    readonly total: u32;
    readonly individual: BTreeMap<AccountId32, u32>;
  }

  /** @name PalletStakingForcing (506) */
  export interface PalletStakingForcing extends Enum {
    readonly isNotForcing: boolean;
    readonly isForceNew: boolean;
    readonly isForceNone: boolean;
    readonly isForceAlways: boolean;
    readonly type: 'NotForcing' | 'ForceNew' | 'ForceNone' | 'ForceAlways';
  }

  /** @name PalletStakingUnappliedSlash (508) */
  export interface PalletStakingUnappliedSlash extends Struct {
    readonly validator: AccountId32;
    readonly own: u128;
    readonly others: Vec<ITuple<[AccountId32, u128]>>;
    readonly reporters: Vec<AccountId32>;
    readonly payout: u128;
  }

  /** @name PalletStakingSlashingSlashingSpans (510) */
  export interface PalletStakingSlashingSlashingSpans extends Struct {
    readonly spanIndex: u32;
    readonly lastStart: u32;
    readonly lastNonzeroSlash: u32;
    readonly prior: Vec<u32>;
  }

  /** @name PalletStakingSlashingSpanRecord (511) */
  export interface PalletStakingSlashingSpanRecord extends Struct {
    readonly slashed: u128;
    readonly paidOut: u128;
  }

  /** @name PalletStakingReleases (514) */
  export interface PalletStakingReleases extends Enum {
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

  /** @name PalletStakingPalletError (515) */
  export interface PalletStakingPalletError extends Enum {
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

  /** @name SpStakingOffenceOffenceDetails (516) */
  export interface SpStakingOffenceOffenceDetails extends Struct {
    readonly offender: ITuple<[AccountId32, PalletStakingExposure]>;
    readonly reporters: Vec<AccountId32>;
  }

  /** @name SpCoreCryptoKeyTypeId (521) */
  export interface SpCoreCryptoKeyTypeId extends U8aFixed {}

  /** @name PalletSessionError (522) */
  export interface PalletSessionError extends Enum {
    readonly isInvalidProof: boolean;
    readonly isNoAssociatedValidatorId: boolean;
    readonly isDuplicatedKey: boolean;
    readonly isNoKeys: boolean;
    readonly isNoAccount: boolean;
    readonly type: 'InvalidProof' | 'NoAssociatedValidatorId' | 'DuplicatedKey' | 'NoKeys' | 'NoAccount';
  }

  /** @name PalletGrandpaStoredState (523) */
  export interface PalletGrandpaStoredState extends Enum {
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

  /** @name PalletGrandpaStoredPendingChange (524) */
  export interface PalletGrandpaStoredPendingChange extends Struct {
    readonly scheduledAt: u32;
    readonly delay: u32;
    readonly nextAuthorities: Vec<ITuple<[SpFinalityGrandpaAppPublic, u64]>>;
    readonly forced: Option<u32>;
  }

  /** @name PalletGrandpaError (526) */
  export interface PalletGrandpaError extends Enum {
    readonly isPauseFailed: boolean;
    readonly isResumeFailed: boolean;
    readonly isChangePending: boolean;
    readonly isTooSoon: boolean;
    readonly isInvalidKeyOwnershipProof: boolean;
    readonly isInvalidEquivocationProof: boolean;
    readonly isDuplicateOffenceReport: boolean;
    readonly type: 'PauseFailed' | 'ResumeFailed' | 'ChangePending' | 'TooSoon' | 'InvalidKeyOwnershipProof' | 'InvalidEquivocationProof' | 'DuplicateOffenceReport';
  }

  /** @name PalletImOnlineBoundedOpaqueNetworkState (530) */
  export interface PalletImOnlineBoundedOpaqueNetworkState extends Struct {
    readonly peerId: Bytes;
    readonly externalAddresses: Vec<Bytes>;
  }

  /** @name PalletImOnlineError (534) */
  export interface PalletImOnlineError extends Enum {
    readonly isInvalidKey: boolean;
    readonly isDuplicatedHeartbeat: boolean;
    readonly type: 'InvalidKey' | 'DuplicatedHeartbeat';
  }

  /** @name OrmlTokensBalanceLock (537) */
  export interface OrmlTokensBalanceLock extends Struct {
    readonly id: U8aFixed;
    readonly amount: u128;
  }

  /** @name OrmlTokensAccountData (539) */
  export interface OrmlTokensAccountData extends Struct {
    readonly free: u128;
    readonly reserved: u128;
    readonly frozen: u128;
  }

  /** @name OrmlTokensReserveData (541) */
  export interface OrmlTokensReserveData extends Struct {
    readonly id: Null;
    readonly amount: u128;
  }

  /** @name OrmlTokensModuleError (543) */
  export interface OrmlTokensModuleError extends Enum {
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

  /** @name OrmlCurrenciesModuleError (544) */
  export interface OrmlCurrenciesModuleError extends Enum {
    readonly isAmountIntoBalanceFailed: boolean;
    readonly isBalanceTooLow: boolean;
    readonly isDepositFailed: boolean;
    readonly type: 'AmountIntoBalanceFailed' | 'BalanceTooLow' | 'DepositFailed';
  }

  /** @name TradingPairError (547) */
  export interface TradingPairError extends Enum {
    readonly isTradingPairExists: boolean;
    readonly isForbiddenBaseAssetId: boolean;
    readonly isIdenticalAssetIds: boolean;
    readonly isTradingPairDoesntExist: boolean;
    readonly type: 'TradingPairExists' | 'ForbiddenBaseAssetId' | 'IdenticalAssetIds' | 'TradingPairDoesntExist';
  }

  /** @name AssetsAssetRecord (549) */
  export interface AssetsAssetRecord extends Enum {
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

  /** @name AssetsAssetRecordArg (550) */
  export interface AssetsAssetRecordArg extends Enum {
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

  /** @name CommonPrimitivesAssetIdExtraAssetRecordArg (552) */
  export interface CommonPrimitivesAssetIdExtraAssetRecordArg extends Enum {
    readonly isDexId: boolean;
    readonly asDexId: u32;
    readonly isLstId: boolean;
    readonly asLstId: CommonPrimitivesLiquiditySourceType;
    readonly isAccountId: boolean;
    readonly asAccountId: U8aFixed;
    readonly type: 'DexId' | 'LstId' | 'AccountId';
  }

  /** @name AssetsError (553) */
  export interface AssetsError extends Enum {
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
    readonly type: 'AssetIdAlreadyExists' | 'AssetIdNotExists' | 'InsufficientBalance' | 'InvalidAssetSymbol' | 'InvalidAssetName' | 'InvalidPrecision' | 'AssetSupplyIsNotMintable' | 'InvalidAssetOwner' | 'IncRefError' | 'InvalidContentSource' | 'InvalidDescription' | 'DeadAsset';
  }

  /** @name CommonPrimitivesDexInfo (554) */
  export interface CommonPrimitivesDexInfo extends Struct {
    readonly baseAssetId: CommonPrimitivesAssetId32;
    readonly isPublic: bool;
  }

  /** @name DexManagerError (555) */
  export interface DexManagerError extends Enum {
    readonly isDexIdAlreadyExists: boolean;
    readonly isDexDoesNotExist: boolean;
    readonly isInvalidFeeValue: boolean;
    readonly isInvalidAccountId: boolean;
    readonly type: 'DexIdAlreadyExists' | 'DexDoesNotExist' | 'InvalidFeeValue' | 'InvalidAccountId';
  }

  /** @name MulticollateralBondingCurvePoolDistributionAccounts (558) */
  export interface MulticollateralBondingCurvePoolDistributionAccounts extends Struct {
    readonly xorAllocation: MulticollateralBondingCurvePoolDistributionAccountData;
    readonly valHolders: MulticollateralBondingCurvePoolDistributionAccountData;
    readonly soraCitizens: MulticollateralBondingCurvePoolDistributionAccountData;
    readonly storesAndShops: MulticollateralBondingCurvePoolDistributionAccountData;
    readonly parliamentAndDevelopment: MulticollateralBondingCurvePoolDistributionAccountData;
    readonly projects: MulticollateralBondingCurvePoolDistributionAccountData;
  }

  /** @name MulticollateralBondingCurvePoolDistributionAccountData (559) */
  export interface MulticollateralBondingCurvePoolDistributionAccountData extends Struct {
    readonly account: MulticollateralBondingCurvePoolDistributionAccount;
    readonly coefficient: FixnumFixedPoint;
  }

  /** @name MulticollateralBondingCurvePoolDistributionAccount (560) */
  export interface MulticollateralBondingCurvePoolDistributionAccount extends Enum {
    readonly isAccount: boolean;
    readonly asAccount: AccountId32;
    readonly isTechAccount: boolean;
    readonly asTechAccount: CommonPrimitivesTechAccountId;
    readonly type: 'Account' | 'TechAccount';
  }

  /** @name MulticollateralBondingCurvePoolError (563) */
  export interface MulticollateralBondingCurvePoolError extends Enum {
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

  /** @name TechnicalError (564) */
  export interface TechnicalError extends Enum {
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

  /** @name PoolXykError (567) */
  export interface PoolXykError extends Enum {
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
    readonly isNotEnoughLiquidityOutOfFarming: boolean;
    readonly type: 'UnableToCalculateFee' | 'FailedToCalculatePriceWithoutImpact' | 'UnableToGetBalance' | 'ImpossibleToDecideAssetPairAmounts' | 'PoolPairRatioAndPairSwapRatioIsDifferent' | 'PairSwapActionFeeIsSmallerThanRecommended' | 'SourceBalanceIsNotLargeEnough' | 'TargetBalanceIsNotLargeEnough' | 'UnableToDeriveFeeAccount' | 'FeeAccountIsInvalid' | 'SourceAndClientAccountDoNotMatchAsEqual' | 'AssetsMustNotBeSame' | 'ImpossibleToDecideDepositLiquidityAmounts' | 'InvalidDepositLiquidityBasicAssetAmount' | 'InvalidDepositLiquidityTargetAssetAmount' | 'PairSwapActionMinimumLiquidityIsSmallerThanRecommended' | 'DestinationAmountOfLiquidityIsNotLargeEnough' | 'SourceBaseAmountIsNotLargeEnough' | 'TargetBaseAmountIsNotLargeEnough' | 'PoolIsInvalid' | 'PoolIsEmpty' | 'ZeroValueInAmountParameter' | 'AccountBalanceIsInvalid' | 'InvalidDepositLiquidityDestinationAmount' | 'InitialLiqudityDepositRatioMustBeDefined' | 'TechAssetIsNotRepresentable' | 'UnableToDecideMarkerAsset' | 'UnableToGetAssetRepr' | 'ImpossibleToDecideWithdrawLiquidityAmounts' | 'InvalidWithdrawLiquidityBasicAssetAmount' | 'InvalidWithdrawLiquidityTargetAssetAmount' | 'SourceBaseAmountIsTooLarge' | 'SourceBalanceOfLiquidityTokensIsNotLargeEnough' | 'DestinationBaseBalanceIsNotLargeEnough' | 'DestinationTargetBalanceIsNotLargeEnough' | 'InvalidAssetForLiquidityMarking' | 'AssetDecodingError' | 'CalculatedValueIsOutOfDesiredBounds' | 'BaseAssetIsNotMatchedWithAnyAssetArguments' | 'DestinationAmountMustBeSame' | 'SourceAmountMustBeSame' | 'PoolInitializationIsInvalid' | 'PoolIsAlreadyInitialized' | 'InvalidMinimumBoundValueOfBalance' | 'ImpossibleToDecideValidPairValuesFromRangeForThisPool' | 'RangeValuesIsInvalid' | 'CalculatedValueIsNotMeetsRequiredBoundaries' | 'GettingFeeFromDestinationIsImpossible' | 'FixedWrapperCalculationFailed' | 'ThisCaseIsNotSupported' | 'PoolBecameInvalidAfterOperation' | 'UnableToConvertAssetToTechAssetId' | 'UnableToGetXORPartFromMarkerAsset' | 'PoolTokenSupplyOverflow' | 'IncRefError' | 'UnableToDepositXorLessThanMinimum' | 'UnsupportedQuotePath' | 'NotEnoughUnlockedLiquidity' | 'UnableToCreatePoolWithIndivisibleAssets' | 'NotEnoughLiquidityOutOfFarming';
  }

  /** @name LiquidityProxyError (568) */
  export interface LiquidityProxyError extends Enum {
    readonly isUnavailableExchangePath: boolean;
    readonly isMaxFeeExceeded: boolean;
    readonly isInvalidFeeValue: boolean;
    readonly isInsufficientLiquidity: boolean;
    readonly isAggregationError: boolean;
    readonly isCalculationError: boolean;
    readonly isSlippageNotTolerated: boolean;
    readonly isForbiddenFilter: boolean;
    readonly isFailedToCalculatePriceWithoutImpact: boolean;
    readonly type: 'UnavailableExchangePath' | 'MaxFeeExceeded' | 'InvalidFeeValue' | 'InsufficientLiquidity' | 'AggregationError' | 'CalculationError' | 'SlippageNotTolerated' | 'ForbiddenFilter' | 'FailedToCalculatePriceWithoutImpact';
  }

  /** @name PalletCollectiveVotes (570) */
  export interface PalletCollectiveVotes extends Struct {
    readonly index: u32;
    readonly threshold: u32;
    readonly ayes: Vec<AccountId32>;
    readonly nays: Vec<AccountId32>;
    readonly end: u32;
  }

  /** @name PalletCollectiveError (571) */
  export interface PalletCollectiveError extends Enum {
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

  /** @name PalletDemocracyPreimageStatus (577) */
  export interface PalletDemocracyPreimageStatus extends Enum {
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

  /** @name PalletDemocracyReferendumInfo (578) */
  export interface PalletDemocracyReferendumInfo extends Enum {
    readonly isOngoing: boolean;
    readonly asOngoing: PalletDemocracyReferendumStatus;
    readonly isFinished: boolean;
    readonly asFinished: {
      readonly approved: bool;
      readonly end: u32;
    } & Struct;
    readonly type: 'Ongoing' | 'Finished';
  }

  /** @name PalletDemocracyReferendumStatus (579) */
  export interface PalletDemocracyReferendumStatus extends Struct {
    readonly end: u32;
    readonly proposalHash: H256;
    readonly threshold: PalletDemocracyVoteThreshold;
    readonly delay: u32;
    readonly tally: PalletDemocracyTally;
  }

  /** @name PalletDemocracyTally (580) */
  export interface PalletDemocracyTally extends Struct {
    readonly ayes: u128;
    readonly nays: u128;
    readonly turnout: u128;
  }

  /** @name PalletDemocracyVoteVoting (581) */
  export interface PalletDemocracyVoteVoting extends Enum {
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

  /** @name PalletDemocracyDelegations (584) */
  export interface PalletDemocracyDelegations extends Struct {
    readonly votes: u128;
    readonly capital: u128;
  }

  /** @name PalletDemocracyVotePriorLock (585) */
  export interface PalletDemocracyVotePriorLock extends ITuple<[u32, u128]> {}

  /** @name PalletDemocracyReleases (588) */
  export interface PalletDemocracyReleases extends Enum {
    readonly isV1: boolean;
    readonly type: 'V1';
  }

  /** @name PalletDemocracyError (589) */
  export interface PalletDemocracyError extends Enum {
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

  /** @name EthBridgeRequestsOffchainRequest (591) */
  export interface EthBridgeRequestsOffchainRequest extends Enum {
    readonly isOutgoing: boolean;
    readonly asOutgoing: ITuple<[EthBridgeRequestsOutgoingRequest, H256]>;
    readonly isLoadIncoming: boolean;
    readonly asLoadIncoming: EthBridgeRequestsLoadIncomingRequest;
    readonly isIncoming: boolean;
    readonly asIncoming: ITuple<[EthBridgeRequestsIncomingRequest, H256]>;
    readonly type: 'Outgoing' | 'LoadIncoming' | 'Incoming';
  }

  /** @name EthBridgeRequestsRequestStatus (592) */
  export interface EthBridgeRequestsRequestStatus extends Enum {
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

  /** @name EthBridgeRequestsOutgoingEthPeersSync (599) */
  export interface EthBridgeRequestsOutgoingEthPeersSync extends Struct {
    readonly isBridgeReady: bool;
    readonly isXorReady: bool;
    readonly isValReady: bool;
  }

  /** @name EthBridgeBridgeStatus (600) */
  export interface EthBridgeBridgeStatus extends Enum {
    readonly isInitialized: boolean;
    readonly isMigrating: boolean;
    readonly type: 'Initialized' | 'Migrating';
  }

  /** @name EthBridgeError (604) */
  export interface EthBridgeError extends Enum {
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
    readonly type: 'HttpFetchingError' | 'AccountNotFound' | 'Forbidden' | 'RequestIsAlreadyRegistered' | 'FailedToLoadTransaction' | 'FailedToLoadPrecision' | 'UnknownMethodId' | 'InvalidFunctionInput' | 'InvalidSignature' | 'InvalidUint' | 'InvalidAmount' | 'InvalidBalance' | 'InvalidString' | 'InvalidByte' | 'InvalidAddress' | 'InvalidAssetId' | 'InvalidAccountId' | 'InvalidBool' | 'InvalidH256' | 'InvalidArray' | 'UnknownEvent' | 'UnknownTokenAddress' | 'NoLocalAccountForSigning' | 'UnsupportedAssetId' | 'FailedToSignMessage' | 'FailedToSendSignedTransaction' | 'TokenIsNotOwnedByTheAuthor' | 'TokenIsAlreadyAdded' | 'DuplicatedRequest' | 'UnsupportedToken' | 'UnknownPeerAddress' | 'EthAbiEncodingError' | 'EthAbiDecodingError' | 'EthTransactionIsFailed' | 'EthTransactionIsSucceeded' | 'EthTransactionIsPending' | 'EthLogWasRemoved' | 'NoPendingPeer' | 'WrongPendingPeer' | 'TooManyPendingPeers' | 'FailedToGetAssetById' | 'CantAddMorePeers' | 'CantRemoveMorePeers' | 'PeerIsAlreadyAdded' | 'UnknownPeerId' | 'CantReserveFunds' | 'AlreadyClaimed' | 'FailedToLoadBlockHeader' | 'FailedToLoadFinalizedHead' | 'UnknownContractAddress' | 'InvalidContractInput' | 'RequestIsNotOwnedByTheAuthor' | 'FailedToParseTxHashInCall' | 'RequestIsNotReady' | 'UnknownRequest' | 'RequestNotFinalizedOnSidechain' | 'UnknownNetwork' | 'ContractIsInMigrationStage' | 'ContractIsNotInMigrationStage' | 'ContractIsAlreadyInMigrationStage' | 'Unavailable' | 'FailedToUnreserve' | 'SidechainAssetIsAlreadyRegistered' | 'ExpectedOutgoingRequest' | 'ExpectedIncomingRequest' | 'UnknownAssetId' | 'JsonSerializationError' | 'JsonDeserializationError' | 'FailedToLoadSidechainNodeParams' | 'FailedToLoadCurrentSidechainHeight' | 'FailedToLoadIsUsed' | 'TransactionMightHaveFailedDueToGasLimit' | 'ExpectedXORTransfer' | 'UnableToPayFees' | 'Cancelled' | 'UnsupportedAssetPrecision' | 'NonZeroDust' | 'IncRefError' | 'Other' | 'ExpectedPendingRequest' | 'ExpectedEthNetwork' | 'RemovedAndRefunded' | 'AuthorityAccountNotSet' | 'NotEnoughPeers' | 'ReadStorageError';
  }

  /** @name PswapDistributionError (607) */
  export interface PswapDistributionError extends Enum {
    readonly isCalculationError: boolean;
    readonly isSubscriptionActive: boolean;
    readonly isUnknownSubscription: boolean;
    readonly isInvalidFrequency: boolean;
    readonly isZeroClaimableIncentives: boolean;
    readonly isIncRefError: boolean;
    readonly type: 'CalculationError' | 'SubscriptionActive' | 'UnknownSubscription' | 'InvalidFrequency' | 'ZeroClaimableIncentives' | 'IncRefError';
  }

  /** @name PalletSchedulerScheduledV3 (613) */
  export interface PalletSchedulerScheduledV3 extends Struct {
    readonly maybeId: Option<Bytes>;
    readonly priority: u8;
    readonly call: FrameSupportScheduleMaybeHashed;
    readonly maybePeriodic: Option<ITuple<[u32, u32]>>;
    readonly origin: FramenodeRuntimeOriginCaller;
  }

  /** @name PalletSchedulerError (614) */
  export interface PalletSchedulerError extends Enum {
    readonly isFailedToSchedule: boolean;
    readonly isNotFound: boolean;
    readonly isTargetBlockNumberInPast: boolean;
    readonly isRescheduleNoChange: boolean;
    readonly type: 'FailedToSchedule' | 'NotFound' | 'TargetBlockNumberInPast' | 'RescheduleNoChange';
  }

  /** @name IrohaMigrationPendingMultisigAccount (617) */
  export interface IrohaMigrationPendingMultisigAccount extends Struct {
    readonly approvingAccounts: Vec<AccountId32>;
    readonly migrateAt: Option<u32>;
  }

  /** @name IrohaMigrationError (618) */
  export interface IrohaMigrationError extends Enum {
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

  /** @name PalletMembershipError (619) */
  export interface PalletMembershipError extends Enum {
    readonly isAlreadyMember: boolean;
    readonly isNotMember: boolean;
    readonly type: 'AlreadyMember' | 'NotMember';
  }

  /** @name PalletElectionsPhragmenSeatHolder (621) */
  export interface PalletElectionsPhragmenSeatHolder extends Struct {
    readonly who: AccountId32;
    readonly stake: u128;
    readonly deposit: u128;
  }

  /** @name PalletElectionsPhragmenVoter (622) */
  export interface PalletElectionsPhragmenVoter extends Struct {
    readonly votes: Vec<AccountId32>;
    readonly stake: u128;
    readonly deposit: u128;
  }

  /** @name PalletElectionsPhragmenError (623) */
  export interface PalletElectionsPhragmenError extends Enum {
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

  /** @name VestedRewardsRewardInfo (624) */
  export interface VestedRewardsRewardInfo extends Struct {
    readonly limit: u128;
    readonly totalAvailable: u128;
    readonly rewards: BTreeMap<CommonPrimitivesRewardReason, u128>;
  }

  /** @name VestedRewardsMarketMakerInfo (628) */
  export interface VestedRewardsMarketMakerInfo extends Struct {
    readonly count: u32;
    readonly volume: u128;
  }

  /** @name VestedRewardsCrowdloanReward (629) */
  export interface VestedRewardsCrowdloanReward extends Struct {
    readonly id: Bytes;
    readonly address: Bytes;
    readonly contribution: FixnumFixedPoint;
    readonly xorReward: FixnumFixedPoint;
    readonly valReward: FixnumFixedPoint;
    readonly pswapReward: FixnumFixedPoint;
    readonly xstusdReward: FixnumFixedPoint;
    readonly percent: FixnumFixedPoint;
  }

  /** @name VestedRewardsError (630) */
  export interface VestedRewardsError extends Enum {
    readonly isNothingToClaim: boolean;
    readonly isClaimLimitExceeded: boolean;
    readonly isUnhandledRewardType: boolean;
    readonly isRewardsSupplyShortage: boolean;
    readonly isIncRefError: boolean;
    readonly isCantSubtractSnapshot: boolean;
    readonly isCantCalculateReward: boolean;
    readonly isMarketMakingPairAlreadyAllowed: boolean;
    readonly isMarketMakingPairAlreadyDisallowed: boolean;
    readonly isNoRewardsForAsset: boolean;
    readonly type: 'NothingToClaim' | 'ClaimLimitExceeded' | 'UnhandledRewardType' | 'RewardsSupplyShortage' | 'IncRefError' | 'CantSubtractSnapshot' | 'CantCalculateReward' | 'MarketMakingPairAlreadyAllowed' | 'MarketMakingPairAlreadyDisallowed' | 'NoRewardsForAsset';
  }

  /** @name PalletIdentityRegistration (631) */
  export interface PalletIdentityRegistration extends Struct {
    readonly judgements: Vec<ITuple<[u32, PalletIdentityJudgement]>>;
    readonly deposit: u128;
    readonly info: PalletIdentityIdentityInfo;
  }

  /** @name PalletIdentityRegistrarInfo (639) */
  export interface PalletIdentityRegistrarInfo extends Struct {
    readonly account: AccountId32;
    readonly fee: u128;
    readonly fields: PalletIdentityBitFlags;
  }

  /** @name PalletIdentityError (641) */
  export interface PalletIdentityError extends Enum {
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

  /** @name FarmingPoolFarmer (643) */
  export interface FarmingPoolFarmer extends Struct {
    readonly account: AccountId32;
    readonly block: u32;
    readonly weight: u128;
  }

  /** @name FarmingError (644) */
  export interface FarmingError extends Enum {
    readonly isIncRefError: boolean;
    readonly type: 'IncRefError';
  }

  /** @name XstError (645) */
  export interface XstError extends Enum {
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

  /** @name PriceToolsPriceInfo (646) */
  export interface PriceToolsPriceInfo extends Struct {
    readonly priceFailures: u32;
    readonly spotPrices: Vec<u128>;
    readonly averagePrice: u128;
    readonly needsUpdate: bool;
    readonly lastSpotPrice: u128;
  }

  /** @name PriceToolsError (647) */
  export interface PriceToolsError extends Enum {
    readonly isAveragePriceCalculationFailed: boolean;
    readonly isUpdateAverageWithSpotPriceFailed: boolean;
    readonly isInsufficientSpotPriceData: boolean;
    readonly isUnsupportedQuotePath: boolean;
    readonly isFailedToQuoteAveragePrice: boolean;
    readonly isAssetAlreadyRegistered: boolean;
    readonly isCantDuplicateLastPrice: boolean;
    readonly type: 'AveragePriceCalculationFailed' | 'UpdateAverageWithSpotPriceFailed' | 'InsufficientSpotPriceData' | 'UnsupportedQuotePath' | 'FailedToQuoteAveragePrice' | 'AssetAlreadyRegistered' | 'CantDuplicateLastPrice';
  }

  /** @name CeresStakingStakingInfo (648) */
  export interface CeresStakingStakingInfo extends Struct {
    readonly deposited: u128;
    readonly rewards: u128;
  }

  /** @name CeresStakingError (649) */
  export interface CeresStakingError extends Enum {
    readonly isStakingPoolIsFull: boolean;
    readonly isUnauthorized: boolean;
    readonly type: 'StakingPoolIsFull' | 'Unauthorized';
  }

  /** @name CeresLiquidityLockerLockInfo (651) */
  export interface CeresLiquidityLockerLockInfo extends Struct {
    readonly poolTokens: u128;
    readonly unlockingBlock: u32;
    readonly assetA: CommonPrimitivesAssetId32;
    readonly assetB: CommonPrimitivesAssetId32;
  }

  /** @name CeresLiquidityLockerError (652) */
  export interface CeresLiquidityLockerError extends Enum {
    readonly isPoolDoesNotExist: boolean;
    readonly isInsufficientLiquidityToLock: boolean;
    readonly isInvalidPercentage: boolean;
    readonly isUnauthorized: boolean;
    readonly isInvalidUnlockingBlock: boolean;
    readonly type: 'PoolDoesNotExist' | 'InsufficientLiquidityToLock' | 'InvalidPercentage' | 'Unauthorized' | 'InvalidUnlockingBlock';
  }

  /** @name CeresTokenLockerTokenLockInfo (654) */
  export interface CeresTokenLockerTokenLockInfo extends Struct {
    readonly tokens: u128;
    readonly unlockingBlock: u32;
    readonly assetId: CommonPrimitivesAssetId32;
  }

  /** @name CeresTokenLockerError (655) */
  export interface CeresTokenLockerError extends Enum {
    readonly isInvalidNumberOfTokens: boolean;
    readonly isUnauthorized: boolean;
    readonly isInvalidUnlockingBlock: boolean;
    readonly isNotEnoughFunds: boolean;
    readonly isNotUnlockedYet: boolean;
    readonly isLockInfoDoesNotExist: boolean;
    readonly type: 'InvalidNumberOfTokens' | 'Unauthorized' | 'InvalidUnlockingBlock' | 'NotEnoughFunds' | 'NotUnlockedYet' | 'LockInfoDoesNotExist';
  }

  /** @name CeresGovernancePlatformVotingInfo (657) */
  export interface CeresGovernancePlatformVotingInfo extends Struct {
    readonly votingOption: u32;
    readonly numberOfVotes: u128;
    readonly ceresWithdrawn: bool;
  }

  /** @name CeresGovernancePlatformPollInfo (658) */
  export interface CeresGovernancePlatformPollInfo extends Struct {
    readonly numberOfOptions: u32;
    readonly pollStartBlock: u32;
    readonly pollEndBlock: u32;
  }

  /** @name CeresGovernancePlatformError (659) */
  export interface CeresGovernancePlatformError extends Enum {
    readonly isInvalidVotes: boolean;
    readonly isPollIsFinished: boolean;
    readonly isPollIsNotStarted: boolean;
    readonly isNotEnoughFunds: boolean;
    readonly isInvalidNumberOfOption: boolean;
    readonly isVoteDenied: boolean;
    readonly isInvalidStartBlock: boolean;
    readonly isInvalidEndBlock: boolean;
    readonly isPollIsNotFinished: boolean;
    readonly isInvalidNumberOfVotes: boolean;
    readonly isFundsAlreadyWithdrawn: boolean;
    readonly isPollIdAlreadyExists: boolean;
    readonly type: 'InvalidVotes' | 'PollIsFinished' | 'PollIsNotStarted' | 'NotEnoughFunds' | 'InvalidNumberOfOption' | 'VoteDenied' | 'InvalidStartBlock' | 'InvalidEndBlock' | 'PollIsNotFinished' | 'InvalidNumberOfVotes' | 'FundsAlreadyWithdrawn' | 'PollIdAlreadyExists';
  }

  /** @name CeresLaunchpadIloInfo (660) */
  export interface CeresLaunchpadIloInfo extends Struct {
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
    readonly startBlock: u32;
    readonly endBlock: u32;
    readonly contributorsVesting: CeresLaunchpadContributorsVesting;
    readonly teamVesting: CeresLaunchpadTeamVesting;
    readonly soldTokens: u128;
    readonly fundsRaised: u128;
    readonly succeeded: bool;
    readonly failed: bool;
    readonly lpTokens: u128;
    readonly claimedLpTokens: bool;
    readonly finishBlock: u32;
  }

  /** @name CeresLaunchpadContributorsVesting (661) */
  export interface CeresLaunchpadContributorsVesting extends Struct {
    readonly firstReleasePercent: u128;
    readonly vestingPeriod: u32;
    readonly vestingPercent: u128;
  }

  /** @name CeresLaunchpadTeamVesting (662) */
  export interface CeresLaunchpadTeamVesting extends Struct {
    readonly teamVestingTotalTokens: u128;
    readonly teamVestingFirstReleasePercent: u128;
    readonly teamVestingPeriod: u32;
    readonly teamVestingPercent: u128;
  }

  /** @name CeresLaunchpadContributionInfo (664) */
  export interface CeresLaunchpadContributionInfo extends Struct {
    readonly fundsContributed: u128;
    readonly tokensBought: u128;
    readonly tokensClaimed: u128;
    readonly claimingFinished: bool;
    readonly numberOfClaims: u32;
  }

  /** @name CeresLaunchpadError (665) */
  export interface CeresLaunchpadError extends Enum {
    readonly isIloAlreadyExists: boolean;
    readonly isParameterCantBeZero: boolean;
    readonly isInvalidSoftCap: boolean;
    readonly isInvalidMinimumContribution: boolean;
    readonly isInvalidMaximumContribution: boolean;
    readonly isInvalidLiquidityPercent: boolean;
    readonly isInvalidLockupDays: boolean;
    readonly isInvalidStartBlock: boolean;
    readonly isInvalidEndBlock: boolean;
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
    readonly type: 'IloAlreadyExists' | 'ParameterCantBeZero' | 'InvalidSoftCap' | 'InvalidMinimumContribution' | 'InvalidMaximumContribution' | 'InvalidLiquidityPercent' | 'InvalidLockupDays' | 'InvalidStartBlock' | 'InvalidEndBlock' | 'InvalidPrice' | 'InvalidNumberOfTokensForLiquidity' | 'InvalidNumberOfTokensForILO' | 'InvalidFirstReleasePercent' | 'InvalidVestingPercent' | 'InvalidVestingPeriod' | 'NotEnoughCeres' | 'NotEnoughTokens' | 'IloNotStarted' | 'IloIsFinished' | 'CantContributeInILO' | 'HardCapIsHit' | 'NotEnoughTokensToBuy' | 'ContributionIsLowerThenMin' | 'ContributionIsBiggerThenMax' | 'NotEnoughFunds' | 'IloDoesNotExist' | 'IloIsNotFinished' | 'PoolDoesNotExist' | 'Unauthorized' | 'CantClaimLPTokens' | 'FundsAlreadyClaimed' | 'NothingToClaim' | 'IloIsFailed' | 'IloIsSucceeded' | 'CantCreateILOForListedToken' | 'AccountIsNotWhitelisted' | 'InvalidTeamFirstReleasePercent' | 'InvalidTeamVestingPercent' | 'InvalidTeamVestingPeriod' | 'NotEnoughTeamTokensToLock';
  }

  /** @name DemeterFarmingPlatformTokenInfo (666) */
  export interface DemeterFarmingPlatformTokenInfo extends Struct {
    readonly farmsTotalMultiplier: u32;
    readonly stakingTotalMultiplier: u32;
    readonly tokenPerBlock: u128;
    readonly farmsAllocation: u128;
    readonly stakingAllocation: u128;
    readonly teamAllocation: u128;
    readonly teamAccount: AccountId32;
  }

  /** @name DemeterFarmingPlatformUserInfo (668) */
  export interface DemeterFarmingPlatformUserInfo extends Struct {
    readonly poolAsset: CommonPrimitivesAssetId32;
    readonly rewardAsset: CommonPrimitivesAssetId32;
    readonly isFarm: bool;
    readonly pooledTokens: u128;
    readonly rewards: u128;
  }

  /** @name DemeterFarmingPlatformPoolData (670) */
  export interface DemeterFarmingPlatformPoolData extends Struct {
    readonly multiplier: u32;
    readonly depositFee: u128;
    readonly isCore: bool;
    readonly isFarm: bool;
    readonly totalTokensInPool: u128;
    readonly rewards: u128;
    readonly rewardsToBeDistributed: u128;
    readonly isRemoved: bool;
  }

  /** @name DemeterFarmingPlatformError (671) */
  export interface DemeterFarmingPlatformError extends Enum {
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

  /** @name PalletBagsListListNode (672) */
  export interface PalletBagsListListNode extends Struct {
    readonly id: AccountId32;
    readonly prev: Option<AccountId32>;
    readonly next: Option<AccountId32>;
    readonly bagUpper: u64;
  }

  /** @name PalletBagsListListBag (673) */
  export interface PalletBagsListListBag extends Struct {
    readonly head: Option<AccountId32>;
    readonly tail: Option<AccountId32>;
  }

  /** @name PalletBagsListError (675) */
  export interface PalletBagsListError extends Enum {
    readonly isList: boolean;
    readonly asList: PalletBagsListListListError;
    readonly type: 'List';
  }

  /** @name PalletBagsListListListError (676) */
  export interface PalletBagsListListListError extends Enum {
    readonly isDuplicate: boolean;
    readonly isNotHeavier: boolean;
    readonly isNotInSameBag: boolean;
    readonly isNodeNotFound: boolean;
    readonly type: 'Duplicate' | 'NotHeavier' | 'NotInSameBag' | 'NodeNotFound';
  }

  /** @name PalletElectionProviderMultiPhasePhase (677) */
  export interface PalletElectionProviderMultiPhasePhase extends Enum {
    readonly isOff: boolean;
    readonly isSigned: boolean;
    readonly isUnsigned: boolean;
    readonly asUnsigned: ITuple<[bool, u32]>;
    readonly isEmergency: boolean;
    readonly type: 'Off' | 'Signed' | 'Unsigned' | 'Emergency';
  }

  /** @name PalletElectionProviderMultiPhaseReadySolution (679) */
  export interface PalletElectionProviderMultiPhaseReadySolution extends Struct {
    readonly supports: Vec<ITuple<[AccountId32, SpNposElectionsSupport]>>;
    readonly score: SpNposElectionsElectionScore;
    readonly compute: PalletElectionProviderMultiPhaseElectionCompute;
  }

  /** @name PalletElectionProviderMultiPhaseRoundSnapshot (680) */
  export interface PalletElectionProviderMultiPhaseRoundSnapshot extends Struct {
    readonly voters: Vec<ITuple<[AccountId32, u64, Vec<AccountId32>]>>;
    readonly targets: Vec<AccountId32>;
  }

  /** @name PalletElectionProviderMultiPhaseSignedSignedSubmission (687) */
  export interface PalletElectionProviderMultiPhaseSignedSignedSubmission extends Struct {
    readonly who: AccountId32;
    readonly deposit: u128;
    readonly rawSolution: PalletElectionProviderMultiPhaseRawSolution;
    readonly callFee: u128;
  }

  /** @name PalletElectionProviderMultiPhaseError (688) */
  export interface PalletElectionProviderMultiPhaseError extends Enum {
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

  /** @name FaucetError (689) */
  export interface FaucetError extends Enum {
    readonly isAssetNotSupported: boolean;
    readonly isAmountAboveLimit: boolean;
    readonly isNotEnoughReserves: boolean;
    readonly type: 'AssetNotSupported' | 'AmountAboveLimit' | 'NotEnoughReserves';
  }

  /** @name BeefyPrimitivesMmrBeefyNextAuthoritySet (691) */
  export interface BeefyPrimitivesMmrBeefyNextAuthoritySet extends Struct {
    readonly id: u64;
    readonly len: u32;
    readonly root: H256;
  }

  /** @name EthereumLightClientPruningRange (693) */
  export interface EthereumLightClientPruningRange extends Struct {
    readonly oldestUnprunedBlock: u64;
    readonly oldestBlockToKeep: u64;
  }

  /** @name EthereumLightClientStoredHeader (695) */
  export interface EthereumLightClientStoredHeader extends Struct {
    readonly submitter: Option<AccountId32>;
    readonly header: BridgeTypesHeader;
    readonly totalDifficulty: U256;
    readonly finalized: bool;
  }

  /** @name EthereumLightClientError (697) */
  export interface EthereumLightClientError extends Enum {
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
    readonly isUnknown: boolean;
    readonly isConsensusNotSupported: boolean;
    readonly type: 'AncientHeader' | 'MissingHeader' | 'MissingParentHeader' | 'DuplicateHeader' | 'HeaderNotFinalized' | 'HeaderOnStaleFork' | 'InvalidHeader' | 'InvalidProof' | 'DecodeFailed' | 'NetworkNotFound' | 'NetworkAlreadyExists' | 'Unknown' | 'ConsensusNotSupported';
  }

  /** @name BasicChannelInboundPalletError (698) */
  export interface BasicChannelInboundPalletError extends Enum {
    readonly isInvalidNetwork: boolean;
    readonly isInvalidSourceChannel: boolean;
    readonly isInvalidEnvelope: boolean;
    readonly isInvalidNonce: boolean;
    readonly isChannelExists: boolean;
    readonly isCallEncodeFailed: boolean;
    readonly type: 'InvalidNetwork' | 'InvalidSourceChannel' | 'InvalidEnvelope' | 'InvalidNonce' | 'ChannelExists' | 'CallEncodeFailed';
  }

  /** @name BasicChannelOutboundMessage (700) */
  export interface BasicChannelOutboundMessage extends Struct {
    readonly networkId: U256;
    readonly target: H160;
    readonly nonce: u64;
    readonly payload: Bytes;
  }

  /** @name BasicChannelOutboundPalletError (702) */
  export interface BasicChannelOutboundPalletError extends Enum {
    readonly isPayloadTooLarge: boolean;
    readonly isQueueSizeLimitReached: boolean;
    readonly isOverflow: boolean;
    readonly isNotAuthorized: boolean;
    readonly isInvalidNetwork: boolean;
    readonly isChannelExists: boolean;
    readonly type: 'PayloadTooLarge' | 'QueueSizeLimitReached' | 'Overflow' | 'NotAuthorized' | 'InvalidNetwork' | 'ChannelExists';
  }

  /** @name IncentivizedChannelInboundPalletError (703) */
  export interface IncentivizedChannelInboundPalletError extends Enum {
    readonly isInvalidNetwork: boolean;
    readonly isInvalidSourceChannel: boolean;
    readonly isInvalidEnvelope: boolean;
    readonly isInvalidNonce: boolean;
    readonly isInvalidRewardFraction: boolean;
    readonly isContractExists: boolean;
    readonly isCallEncodeFailed: boolean;
    readonly type: 'InvalidNetwork' | 'InvalidSourceChannel' | 'InvalidEnvelope' | 'InvalidNonce' | 'InvalidRewardFraction' | 'ContractExists' | 'CallEncodeFailed';
  }

  /** @name IncentivizedChannelOutboundMessage (705) */
  export interface IncentivizedChannelOutboundMessage extends Struct {
    readonly networkId: U256;
    readonly target: H160;
    readonly nonce: u64;
    readonly fee: U256;
    readonly payload: Bytes;
  }

  /** @name IncentivizedChannelOutboundPalletError (706) */
  export interface IncentivizedChannelOutboundPalletError extends Enum {
    readonly isPayloadTooLarge: boolean;
    readonly isQueueSizeLimitReached: boolean;
    readonly isNoFunds: boolean;
    readonly isOverflow: boolean;
    readonly isChannelExists: boolean;
    readonly type: 'PayloadTooLarge' | 'QueueSizeLimitReached' | 'NoFunds' | 'Overflow' | 'ChannelExists';
  }

  /** @name BridgeTypesAuxiliaryDigest (707) */
  export interface BridgeTypesAuxiliaryDigest extends Struct {
    readonly logs: Vec<BridgeTypesAuxiliaryDigestItem>;
  }

  /** @name BridgeTypesAuxiliaryDigestItem (709) */
  export interface BridgeTypesAuxiliaryDigestItem extends Enum {
    readonly isCommitment: boolean;
    readonly asCommitment: ITuple<[U256, BridgeTypesChannelId, H256]>;
    readonly type: 'Commitment';
  }

  /** @name EthAppError (711) */
  export interface EthAppError extends Enum {
    readonly isInvalidPayload: boolean;
    readonly isAppIsNotRegistered: boolean;
    readonly isInvalidAppAddress: boolean;
    readonly isAppAlreadyExists: boolean;
    readonly isDestAccountIsNotSet: boolean;
    readonly isCallEncodeFailed: boolean;
    readonly type: 'InvalidPayload' | 'AppIsNotRegistered' | 'InvalidAppAddress' | 'AppAlreadyExists' | 'DestAccountIsNotSet' | 'CallEncodeFailed';
  }

  /** @name BridgeTypesAssetKind (713) */
  export interface BridgeTypesAssetKind extends Enum {
    readonly isThischain: boolean;
    readonly isSidechain: boolean;
    readonly type: 'Thischain' | 'Sidechain';
  }

  /** @name Erc20AppError (716) */
  export interface Erc20AppError extends Enum {
    readonly isTokenIsNotRegistered: boolean;
    readonly isAppIsNotRegistered: boolean;
    readonly isNotEnoughFunds: boolean;
    readonly isInvalidNetwork: boolean;
    readonly isTokenAlreadyRegistered: boolean;
    readonly isAppAlreadyRegistered: boolean;
    readonly isCallEncodeFailed: boolean;
    readonly type: 'TokenIsNotRegistered' | 'AppIsNotRegistered' | 'NotEnoughFunds' | 'InvalidNetwork' | 'TokenAlreadyRegistered' | 'AppAlreadyRegistered' | 'CallEncodeFailed';
  }

  /** @name MigrationAppError (717) */
  export interface MigrationAppError extends Enum {
    readonly isInvalidPayload: boolean;
    readonly isAppIsNotRegistered: boolean;
    readonly isInvalidAppAddress: boolean;
    readonly isAppAlreadyExists: boolean;
    readonly isTokenRegisteredWithAnotherAddress: boolean;
    readonly isCallEncodeFailed: boolean;
    readonly type: 'InvalidPayload' | 'AppIsNotRegistered' | 'InvalidAppAddress' | 'AppAlreadyExists' | 'TokenRegisteredWithAnotherAddress' | 'CallEncodeFailed';
  }

  /** @name SpRuntimeMultiSignature (719) */
  export interface SpRuntimeMultiSignature extends Enum {
    readonly isEd25519: boolean;
    readonly asEd25519: SpCoreEd25519Signature;
    readonly isSr25519: boolean;
    readonly asSr25519: SpCoreSr25519Signature;
    readonly isEcdsa: boolean;
    readonly asEcdsa: SpCoreEcdsaSignature;
    readonly type: 'Ed25519' | 'Sr25519' | 'Ecdsa';
  }

  /** @name SpCoreEcdsaSignature (720) */
  export interface SpCoreEcdsaSignature extends U8aFixed {}

  /** @name FrameSystemExtensionsCheckSpecVersion (723) */
  export type FrameSystemExtensionsCheckSpecVersion = Null;

  /** @name FrameSystemExtensionsCheckTxVersion (724) */
  export type FrameSystemExtensionsCheckTxVersion = Null;

  /** @name FrameSystemExtensionsCheckGenesis (725) */
  export type FrameSystemExtensionsCheckGenesis = Null;

  /** @name FrameSystemExtensionsCheckNonce (728) */
  export interface FrameSystemExtensionsCheckNonce extends Compact<u32> {}

  /** @name FrameSystemExtensionsCheckWeight (729) */
  export type FrameSystemExtensionsCheckWeight = Null;

  /** @name FramenodeRuntimeExtensionsChargeTransactionPayment (730) */
  export interface FramenodeRuntimeExtensionsChargeTransactionPayment extends PalletTransactionPaymentChargeTransactionPayment {}

  /** @name PalletTransactionPaymentChargeTransactionPayment (731) */
  export interface PalletTransactionPaymentChargeTransactionPayment extends Compact<u128> {}

  /** @name FramenodeRuntimeRuntime (732) */
  export type FramenodeRuntimeRuntime = Null;

} // declare module