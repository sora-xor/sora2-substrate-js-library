// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Bytes, Compact, DoNotConstruct, Enum, GenericAccountId, GenericAccountIndex, GenericBlock, GenericCall, GenericConsensusEngineId, GenericLookupSource, GenericMultiAddress, Int, Null, Option, Result, StorageKey, Struct, U8aFixed, UInt, Vec, i128, u16, u32, u64, u8 } from '@polkadot/types';
import type { ITuple } from '@polkadot/types/types';
import type { AuthorityId } from '@polkadot/types/interfaces/consensus';
import type { Signature } from '@polkadot/types/interfaces/extrinsics';
import type { DispatchError, SystemOrigin } from '@polkadot/types/interfaces/system';

/** @name AccountId */
export interface AccountId extends GenericAccountId {}

/** @name AccountIdOf */
export interface AccountIdOf extends AccountId {}

/** @name AccountIndex */
export interface AccountIndex extends GenericAccountIndex {}

/** @name Address */
export interface Address extends MultiAddress {}

/** @name Amount */
export interface Amount extends i128 {}

/** @name AmountOf */
export interface AmountOf extends Amount {}

/** @name AssetId */
export interface AssetId extends u32 {}

/** @name AssetId32 */
export interface AssetId32 extends U8aFixed {}

/** @name AssetIdOf */
export interface AssetIdOf extends AssetId {}

/** @name AssetName */
export interface AssetName extends Bytes {}

/** @name AssetSymbol */
export interface AssetSymbol extends Bytes {}

/** @name Balance */
export interface Balance extends UInt {}

/** @name BalanceOf */
export interface BalanceOf extends Balance {}

/** @name BalancePrecision */
export interface BalancePrecision extends u8 {}

/** @name BasisPoints */
export interface BasisPoints extends u16 {}

/** @name Block */
export interface Block extends GenericBlock {}

/** @name BlockNumber */
export interface BlockNumber extends u32 {}

/** @name Call */
export interface Call extends GenericCall {}

/** @name CallHash */
export interface CallHash extends Hash {}

/** @name CallHashOf */
export interface CallHashOf extends CallHash {}

/** @name ChangesTrieConfiguration */
export interface ChangesTrieConfiguration extends Struct {
  readonly digestInterval: u32;
  readonly digestLevels: u32;
}

/** @name ChangesTrieSignal */
export interface ChangesTrieSignal extends Enum {
  readonly isNewConfiguration: boolean;
  readonly asNewConfiguration: Option<ChangesTrieConfiguration>;
}

/** @name ChargeFeeInfo */
export interface ChargeFeeInfo extends Struct {
  readonly tip: Compact<Balance>;
  readonly target_asset_id: AssetId;
}

/** @name CodecHash */
export interface CodecHash extends Hash {}

/** @name Consensus */
export interface Consensus extends ITuple<[ConsensusEngineId, Bytes]> {}

/** @name ConsensusEngineId */
export interface ConsensusEngineId extends GenericConsensusEngineId {}

/** @name CurrencyId */
export interface CurrencyId extends AssetId {}

/** @name CurrencyIdOf */
export interface CurrencyIdOf extends AssetId {}

/** @name DEXId */
export interface DEXId extends u32 {}

/** @name DEXIdOf */
export interface DEXIdOf extends DEXId {}

/** @name DEXInfo */
export interface DEXInfo extends Struct {
  readonly base_asset_id: AssetId;
  readonly default_fee: BasisPoints;
  readonly default_protocol_fee: BasisPoints;
}

/** @name Digest */
export interface Digest extends Struct {
  readonly logs: Vec<DigestItem>;
}

/** @name DigestItem */
export interface DigestItem extends Enum {
  readonly isOther: boolean;
  readonly asOther: Bytes;
  readonly isAuthoritiesChange: boolean;
  readonly asAuthoritiesChange: Vec<AuthorityId>;
  readonly isChangesTrieRoot: boolean;
  readonly asChangesTrieRoot: Hash;
  readonly isSealV0: boolean;
  readonly asSealV0: SealV0;
  readonly isConsensus: boolean;
  readonly asConsensus: Consensus;
  readonly isSeal: boolean;
  readonly asSeal: Seal;
  readonly isPreRuntime: boolean;
  readonly asPreRuntime: PreRuntime;
  readonly isChangesTrieSignal: boolean;
  readonly asChangesTrieSignal: ChangesTrieSignal;
}

/** @name DispatchErrorWithPostInfoTPostDispatchInfo */
export interface DispatchErrorWithPostInfoTPostDispatchInfo extends Struct {
  readonly post_info: PostDispatchInfo;
  readonly error: DispatchError;
}

/** @name DispatchResultWithPostInfo */
export interface DispatchResultWithPostInfo extends Result<PostDispatchInfo, DispatchErrorWithPostInfoTPostDispatchInfo> {
  readonly isErr: boolean;
  readonly asErr: DispatchErrorWithPostInfoTPostDispatchInfo;
  /** @deprecated Use isErr */
  readonly isError: boolean;
  /** @deprecated Use asErr */
  readonly asError: DispatchErrorWithPostInfoTPostDispatchInfo;
  readonly isOk: boolean;
  readonly asOk: PostDispatchInfo;
}

/** @name DistributionAccounts */
export interface DistributionAccounts extends Null {}

/** @name Duration */
export interface Duration extends Null {}

/** @name EncodedJustification */
export interface EncodedJustification extends Bytes {}

/** @name ExtrinsicsWeight */
export interface ExtrinsicsWeight extends Struct {
  readonly normal: Weight;
  readonly operational: Weight;
}

/** @name Farm */
export interface Farm extends Null {}

/** @name Farmer */
export interface Farmer extends Null {}

/** @name FarmId */
export interface FarmId extends u64 {}

/** @name FilterMode */
export interface FilterMode extends Enum {
  readonly isDisabled: boolean;
  readonly isForbidSelected: boolean;
  readonly isAllowSelected: boolean;
}

/** @name Fixed */
export interface Fixed extends FixedU128 {}

/** @name Fixed128 */
export interface Fixed128 extends Int {}

/** @name Fixed64 */
export interface Fixed64 extends Int {}

/** @name FixedI128 */
export interface FixedI128 extends Int {}

/** @name FixedI64 */
export interface FixedI64 extends Int {}

/** @name FixedU128 */
export interface FixedU128 extends UInt {}

/** @name FixedU64 */
export interface FixedU64 extends UInt {}

/** @name H1024 */
export interface H1024 extends U8aFixed {}

/** @name H128 */
export interface H128 extends U8aFixed {}

/** @name H160 */
export interface H160 extends U8aFixed {}

/** @name H2048 */
export interface H2048 extends U8aFixed {}

/** @name H256 */
export interface H256 extends U8aFixed {}

/** @name H32 */
export interface H32 extends U8aFixed {}

/** @name H512 */
export interface H512 extends U8aFixed {}

/** @name H64 */
export interface H64 extends U8aFixed {}

/** @name Hash */
export interface Hash extends H256 {}

/** @name Header */
export interface Header extends Struct {
  readonly parentHash: Hash;
  readonly number: Compact<BlockNumber>;
  readonly stateRoot: Hash;
  readonly extrinsicsRoot: Hash;
  readonly digest: Digest;
}

/** @name HeaderPartial */
export interface HeaderPartial extends Struct {
  readonly parentHash: Hash;
  readonly number: BlockNumber;
}

/** @name HolderId */
export interface HolderId extends AccountId {}

/** @name I32F32 */
export interface I32F32 extends Int {}

/** @name Index */
export interface Index extends u32 {}

/** @name IndicesLookupSource */
export interface IndicesLookupSource extends GenericLookupSource {}

/** @name Justification */
export interface Justification extends ITuple<[ConsensusEngineId, EncodedJustification]> {}

/** @name Justifications */
export interface Justifications extends Vec<Justification> {}

/** @name KeyTypeId */
export interface KeyTypeId extends u32 {}

/** @name KeyValue */
export interface KeyValue extends ITuple<[StorageKey, StorageData]> {}

/** @name LiquiditySourceType */
export interface LiquiditySourceType extends Enum {
  readonly isXykPool: boolean;
  readonly isBondingCurvePool: boolean;
  readonly isMulticollateralBondingCurvePool: boolean;
  readonly isMockPool: boolean;
  readonly isMockPool2: boolean;
  readonly isMockPool3: boolean;
  readonly isMockPool4: boolean;
}

/** @name LockIdentifier */
export interface LockIdentifier extends U8aFixed {}

/** @name LookupSource */
export interface LookupSource extends MultiAddress {}

/** @name LookupTarget */
export interface LookupTarget extends AccountId {}

/** @name Mode */
export interface Mode extends Enum {
  readonly isPermit: boolean;
  readonly isForbid: boolean;
}

/** @name ModuleId */
export interface ModuleId extends LockIdentifier {}

/** @name Moment */
export interface Moment extends UInt {}

/** @name MultiAddress */
export interface MultiAddress extends GenericMultiAddress {}

/** @name MultiCurrencyBalanceOf */
export interface MultiCurrencyBalanceOf extends Null {}

/** @name MultisigAccount */
export interface MultisigAccount extends Null {}

/** @name MultiSigner */
export interface MultiSigner extends Enum {
  readonly isEd25519: boolean;
  readonly asEd25519: U8aFixed;
  readonly isSr25519: boolean;
  readonly asSr25519: U8aFixed;
  readonly isEcdsa: boolean;
  readonly asEcdsa: U8aFixed;
}

/** @name OpaqueCall */
export interface OpaqueCall extends Bytes {}

/** @name OracleKey */
export interface OracleKey extends AssetId {}

/** @name Origin */
export interface Origin extends DoNotConstruct {}

/** @name OriginCaller */
export interface OriginCaller extends Enum {
  readonly isSystem: boolean;
  readonly asSystem: SystemOrigin;
}

/** @name OwnerId */
export interface OwnerId extends AccountId {}

/** @name PalletId */
export interface PalletId extends LockIdentifier {}

/** @name PalletsOrigin */
export interface PalletsOrigin extends OriginCaller {}

/** @name PalletVersion */
export interface PalletVersion extends Struct {
  readonly major: u16;
  readonly minor: u8;
  readonly patch: u8;
}

/** @name Pays */
export interface Pays extends Enum {
  readonly isYes: boolean;
  readonly isNo: boolean;
}

/** @name PendingMultisigAccount */
export interface PendingMultisigAccount extends Null {}

/** @name Perbill */
export interface Perbill extends UInt {}

/** @name Percent */
export interface Percent extends UInt {}

/** @name Permill */
export interface Permill extends UInt {}

/** @name Permission */
export interface Permission extends Null {}

/** @name PermissionId */
export interface PermissionId extends u32 {}

/** @name Perquintill */
export interface Perquintill extends UInt {}

/** @name PerU16 */
export interface PerU16 extends UInt {}

/** @name Phantom */
export interface Phantom extends Null {}

/** @name PhantomData */
export interface PhantomData extends Null {}

/** @name PostDispatchInfo */
export interface PostDispatchInfo extends Struct {
  readonly actual_weight: Option<Weight>;
  readonly pays_fee: Pays;
}

/** @name PreRuntime */
export interface PreRuntime extends ITuple<[ConsensusEngineId, Bytes]> {}

/** @name Public */
export interface Public extends U8aFixed {}

/** @name QuoteAmount */
export interface QuoteAmount extends Enum {
  readonly isWithDesiredInput: boolean;
  readonly asWithDesiredInput: QuoteWithDesiredInput;
  readonly isWithDesiredOutput: boolean;
  readonly asWithDesiredOutput: QuoteWithDesiredOutput;
}

/** @name QuoteWithDesiredInput */
export interface QuoteWithDesiredInput extends Struct {
  readonly desired_amount_in: Balance;
}

/** @name QuoteWithDesiredOutput */
export interface QuoteWithDesiredOutput extends Struct {
  readonly desired_amount_out: Balance;
}

/** @name Releases */
export interface Releases extends Enum {
  readonly isV1: boolean;
  readonly isV2: boolean;
  readonly isV3: boolean;
  readonly isV4: boolean;
  readonly isV5: boolean;
  readonly isV6: boolean;
  readonly isV7: boolean;
  readonly isV8: boolean;
  readonly isV9: boolean;
  readonly isV10: boolean;
}

/** @name RewardReason */
export interface RewardReason extends Enum {
  readonly isUnspecified: boolean;
  readonly isBuyOnBondingCurve: boolean;
}

/** @name RuntimeDbWeight */
export interface RuntimeDbWeight extends Struct {
  readonly read: Weight;
  readonly write: Weight;
}

/** @name Scope */
export interface Scope extends Enum {
  readonly isLimited: boolean;
  readonly asLimited: H512;
  readonly isUnlimited: boolean;
}

/** @name Seal */
export interface Seal extends ITuple<[ConsensusEngineId, Bytes]> {}

/** @name SealV0 */
export interface SealV0 extends ITuple<[u64, Signature]> {}

/** @name SignedBlock */
export interface SignedBlock extends SignedBlockWithJustifications {}

/** @name SignedBlockWithJustification */
export interface SignedBlockWithJustification extends Struct {
  readonly block: Block;
  readonly justification: Option<EncodedJustification>;
}

/** @name SignedBlockWithJustifications */
export interface SignedBlockWithJustifications extends Struct {
  readonly block: Block;
  readonly justifications: Option<Justifications>;
}

/** @name Slot */
export interface Slot extends u64 {}

/** @name SmoothPriceState */
export interface SmoothPriceState extends Null {}

/** @name StorageData */
export interface StorageData extends Bytes {}

/** @name StorageProof */
export interface StorageProof extends Struct {
  readonly trieNodes: Vec<Bytes>;
}

/** @name SwapAction */
export interface SwapAction extends Null {}

/** @name SwapAmount */
export interface SwapAmount extends Enum {
  readonly isWithDesiredInput: boolean;
  readonly asWithDesiredInput: SwapWithDesiredInput;
  readonly isWithDesiredOutput: boolean;
  readonly asWithDesiredOutput: SwapWithDesiredOutput;
}

/** @name SwapOutcome */
export interface SwapOutcome extends Struct {
  readonly amount: Balance;
  readonly fee: Balance;
}

/** @name SwapOutcomeInfo */
export interface SwapOutcomeInfo extends Struct {
  readonly amount: Balance;
  readonly fee: Balance;
}

/** @name SwapVariant */
export interface SwapVariant extends Enum {
  readonly isWithDesiredInput: boolean;
  readonly isWithDesiredOutput: boolean;
}

/** @name SwapWithDesiredInput */
export interface SwapWithDesiredInput extends Struct {
  readonly desired_amount_in: Balance;
  readonly min_amount_out: Balance;
}

/** @name SwapWithDesiredOutput */
export interface SwapWithDesiredOutput extends Struct {
  readonly desired_amount_out: Balance;
  readonly max_amount_in: Balance;
}

/** @name TechAccountId */
export interface TechAccountId extends Enum {
  readonly isPure: boolean;
  readonly asPure: ITuple<[DEXId, TechPurpose]>;
  readonly isGeneric: boolean;
  readonly asGeneric: ITuple<[Bytes, Bytes]>;
  readonly isWrapped: boolean;
  readonly asWrapped: AccountId;
  readonly isWrappedRepr: boolean;
  readonly asWrappedRepr: AccountId;
}

/** @name TechAccountIdPrimitive */
export interface TechAccountIdPrimitive extends Null {}

/** @name TechAmount */
export interface TechAmount extends Amount {}

/** @name TechAssetId */
export interface TechAssetId extends Null {}

/** @name TechBalance */
export interface TechBalance extends Balance {}

/** @name TechPurpose */
export interface TechPurpose extends Enum {
  readonly isFeeCollector: boolean;
  readonly isLiquidityKeeper: boolean;
  readonly asLiquidityKeeper: TradingPair;
  readonly isIdentifier: boolean;
  readonly asIdentifier: Bytes;
}

/** @name TradingPair */
export interface TradingPair extends Struct {
  readonly base_asset_id: AssetId;
  readonly target_asset_id: AssetId;
}

/** @name TransactionPriority */
export interface TransactionPriority extends u64 {}

/** @name U32F32 */
export interface U32F32 extends UInt {}

/** @name ValidationFunction */
export interface ValidationFunction extends Null {}

/** @name ValidatorId */
export interface ValidatorId extends AccountId {}

/** @name ValidatorIdOf */
export interface ValidatorIdOf extends ValidatorId {}

/** @name Weight */
export interface Weight extends u64 {}

/** @name WeightMultiplier */
export interface WeightMultiplier extends Fixed64 {}

export type PHANTOM_RUNTIME = 'runtime';
