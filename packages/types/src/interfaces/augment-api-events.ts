// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

// import type lookup before we augment - in some environments
// this is required to allow for ambient/previous definitions
import '@polkadot/api-base/types/events';

import type { ApiTypes, AugmentedEvent } from '@polkadot/api-base/types';
import type { Bytes, Null, Option, Result, Text, U8aFixed, Vec, bool, u128, u32, u64 } from '@polkadot/types-codec';
import type { ITuple } from '@polkadot/types-codec/types';
import type { AccountId32, H256 } from '@polkadot/types/interfaces/runtime';
import type { CommonPrimitivesAssetId32, CommonPrimitivesLiquiditySourceId, CommonPrimitivesLiquiditySourceType, CommonPrimitivesRewardReason, CommonPrimitivesTechAccountId, CommonPrimitivesTechAssetId, CommonPrimitivesTradingPairAssetId32, FixnumFixedPoint, FrameSupportScheduleLookupError, FrameSupportTokensMiscBalanceStatus, FrameSupportWeightsDispatchInfo, PalletDemocracyVoteAccountVote, PalletDemocracyVoteThreshold, PalletElectionProviderMultiPhaseElectionCompute, PalletImOnlineSr25519AppSr25519Public, PalletMultisigBridgeTimepoint, PalletMultisigTimepoint, PalletStakingExposure, PalletStakingValidatorPrefs, SpFinalityGrandpaAppPublic, SpRuntimeDispatchError } from '@polkadot/types/lookup';

export type __AugmentedEvent<ApiType extends ApiTypes> = AugmentedEvent<ApiType>;

declare module '@polkadot/api-base/types/events' {
  interface AugmentedEvents<ApiType extends ApiTypes> {
    assets: {
      /**
       * New asset has been registered. [Asset Id, Asset Owner Account]
       **/
      AssetRegistered: AugmentedEvent<ApiType, [CommonPrimitivesAssetId32, AccountId32]>;
      /**
       * Asset is set as non-mintable. [Target Asset Id]
       **/
      AssetSetNonMintable: AugmentedEvent<ApiType, [CommonPrimitivesAssetId32]>;
      /**
       * Asset amount has been burned. [Issuer Account, Burned Asset Id, Amount Burned]
       **/
      Burn: AugmentedEvent<ApiType, [AccountId32, CommonPrimitivesAssetId32, u128]>;
      /**
       * Asset amount has been minted. [Issuer Account, Target Account, Minted Asset Id, Amount Minted]
       **/
      Mint: AugmentedEvent<ApiType, [AccountId32, AccountId32, CommonPrimitivesAssetId32, u128]>;
      /**
       * Asset amount has been transfered. [From Account, To Account, Tranferred Asset Id, Amount Transferred]
       **/
      Transfer: AugmentedEvent<ApiType, [AccountId32, AccountId32, CommonPrimitivesAssetId32, u128]>;
    };
    bagsList: {
      /**
       * Moved an account from one bag to another.
       **/
      Rebagged: AugmentedEvent<ApiType, [who: AccountId32, from: u64, to: u64], { who: AccountId32, from: u64, to: u64 }>;
      /**
       * Updated the score of some account to the given amount.
       **/
      ScoreUpdated: AugmentedEvent<ApiType, [who: AccountId32, newScore: u64], { who: AccountId32, newScore: u64 }>;
    };
    balances: {
      /**
       * A balance was set by root.
       **/
      BalanceSet: AugmentedEvent<ApiType, [who: AccountId32, free: u128, reserved: u128], { who: AccountId32, free: u128, reserved: u128 }>;
      /**
       * Some amount was deposited (e.g. for transaction fees).
       **/
      Deposit: AugmentedEvent<ApiType, [who: AccountId32, amount: u128], { who: AccountId32, amount: u128 }>;
      /**
       * An account was removed whose balance was non-zero but below ExistentialDeposit,
       * resulting in an outright loss.
       **/
      DustLost: AugmentedEvent<ApiType, [account: AccountId32, amount: u128], { account: AccountId32, amount: u128 }>;
      /**
       * An account was created with some free balance.
       **/
      Endowed: AugmentedEvent<ApiType, [account: AccountId32, freeBalance: u128], { account: AccountId32, freeBalance: u128 }>;
      /**
       * Some balance was reserved (moved from free to reserved).
       **/
      Reserved: AugmentedEvent<ApiType, [who: AccountId32, amount: u128], { who: AccountId32, amount: u128 }>;
      /**
       * Some balance was moved from the reserve of the first account to the second account.
       * Final argument indicates the destination balance type.
       **/
      ReserveRepatriated: AugmentedEvent<ApiType, [from: AccountId32, to: AccountId32, amount: u128, destinationStatus: FrameSupportTokensMiscBalanceStatus], { from: AccountId32, to: AccountId32, amount: u128, destinationStatus: FrameSupportTokensMiscBalanceStatus }>;
      /**
       * Some amount was removed from the account (e.g. for misbehavior).
       **/
      Slashed: AugmentedEvent<ApiType, [who: AccountId32, amount: u128], { who: AccountId32, amount: u128 }>;
      /**
       * Transfer succeeded.
       **/
      Transfer: AugmentedEvent<ApiType, [from: AccountId32, to: AccountId32, amount: u128], { from: AccountId32, to: AccountId32, amount: u128 }>;
      /**
       * Some balance was unreserved (moved from reserved to free).
       **/
      Unreserved: AugmentedEvent<ApiType, [who: AccountId32, amount: u128], { who: AccountId32, amount: u128 }>;
      /**
       * Some amount was withdrawn from the account (e.g. for transaction fees).
       **/
      Withdraw: AugmentedEvent<ApiType, [who: AccountId32, amount: u128], { who: AccountId32, amount: u128 }>;
    };
    band: {
      /**
       * Added new trusted relayer accounts. [relayers]
       **/
      RelayersAdded: AugmentedEvent<ApiType, [Vec<AccountId32>]>;
      /**
       * Relayer accounts were removed from trusted list. [relayers]
       **/
      RelayersRemoved: AugmentedEvent<ApiType, [Vec<AccountId32>]>;
      /**
       * New symbol rates were successfully relayed. [symbols]
       **/
      SymbolsRelayed: AugmentedEvent<ApiType, [Vec<Text>]>;
    };
    bridgeMultisig: {
      /**
       * A new multisig created. [multisig]
       **/
      MultisigAccountCreated: AugmentedEvent<ApiType, [AccountId32]>;
      /**
       * A multisig operation has been approved by someone. [approving, timepoint, multisig, call_hash]
       **/
      MultisigApproval: AugmentedEvent<ApiType, [AccountId32, PalletMultisigBridgeTimepoint, AccountId32, U8aFixed]>;
      /**
       * A multisig operation has been cancelled. [cancelling, timepoint, multisig, call_hash]
       **/
      MultisigCancelled: AugmentedEvent<ApiType, [AccountId32, PalletMultisigBridgeTimepoint, AccountId32, U8aFixed]>;
      /**
       * A multisig operation has been executed. [approving, timepoint, multisig, call_hash]
       **/
      MultisigExecuted: AugmentedEvent<ApiType, [AccountId32, PalletMultisigBridgeTimepoint, AccountId32, U8aFixed, Option<SpRuntimeDispatchError>]>;
      /**
       * A new multisig operation has begun. [approving, multisig, call_hash]
       **/
      NewMultisig: AugmentedEvent<ApiType, [AccountId32, AccountId32, U8aFixed]>;
    };
    ceresGovernancePlatform: {
      /**
       * Create poll [who, option, start_timestamp, end_timestamp]
       **/
      Created: AugmentedEvent<ApiType, [AccountId32, u32, u64, u64]>;
      /**
       * Voting [who, poll, option, balance]
       **/
      Voted: AugmentedEvent<ApiType, [AccountId32, Bytes, u32, u128]>;
      /**
       * Withdrawn [who, balance]
       **/
      Withdrawn: AugmentedEvent<ApiType, [AccountId32, u128]>;
    };
    ceresLaunchpad: {
      /**
       * Claim tokens [who, what]
       **/
      Claimed: AugmentedEvent<ApiType, [AccountId32, CommonPrimitivesAssetId32]>;
      /**
       * Claim LP Tokens [who, what]
       **/
      ClaimedLP: AugmentedEvent<ApiType, [AccountId32, CommonPrimitivesAssetId32]>;
      /**
       * PSWAP claimed
       **/
      ClaimedPSWAP: AugmentedEvent<ApiType, []>;
      /**
       * Contribute [who, what, balance]
       **/
      Contributed: AugmentedEvent<ApiType, [AccountId32, CommonPrimitivesAssetId32, u128]>;
      /**
       * Emergency withdraw [who, what, balance]
       **/
      EmergencyWithdrawn: AugmentedEvent<ApiType, [AccountId32, CommonPrimitivesAssetId32, u128]>;
      /**
       * Fee changed [balance]
       **/
      FeeChanged: AugmentedEvent<ApiType, [u128]>;
      /**
       * ILO created [who, what]
       **/
      ILOCreated: AugmentedEvent<ApiType, [AccountId32, CommonPrimitivesAssetId32]>;
      /**
       * ILO finished [who, what]
       **/
      ILOFinished: AugmentedEvent<ApiType, [AccountId32, CommonPrimitivesAssetId32]>;
      /**
       * Contributor removed [who]
       **/
      RemovedWhitelistedContributor: AugmentedEvent<ApiType, [AccountId32]>;
      /**
       * ILO organizer removed [who]
       **/
      RemovedWhitelistedIloOrganizer: AugmentedEvent<ApiType, [AccountId32]>;
      /**
       * Contributor whitelisted [who]
       **/
      WhitelistedContributor: AugmentedEvent<ApiType, [AccountId32]>;
      /**
       * ILO organizer whitelisted [who]
       **/
      WhitelistedIloOrganizer: AugmentedEvent<ApiType, [AccountId32]>;
    };
    ceresLiquidityLocker: {
      /**
       * Funds Locked [who, amount, timestamp]
       **/
      Locked: AugmentedEvent<ApiType, [AccountId32, u128, u64]>;
    };
    ceresStaking: {
      /**
       * Ceres deposited. [who, amount]
       **/
      Deposited: AugmentedEvent<ApiType, [AccountId32, u128]>;
      /**
       * Rewards changed [balance]
       **/
      RewardsChanged: AugmentedEvent<ApiType, [u128]>;
      /**
       * Staked Ceres and rewards withdrawn. [who, staked, rewards]
       **/
      Withdrawn: AugmentedEvent<ApiType, [AccountId32, u128, u128]>;
    };
    ceresTokenLocker: {
      /**
       * Fee Changed [who, amount]
       **/
      FeeChanged: AugmentedEvent<ApiType, [AccountId32, u128]>;
      /**
       * Funds Locked [who, amount, asset]
       **/
      Locked: AugmentedEvent<ApiType, [AccountId32, u128, CommonPrimitivesAssetId32]>;
      /**
       * Funds Withdrawn [who, amount, asset]
       **/
      Withdrawn: AugmentedEvent<ApiType, [AccountId32, u128, CommonPrimitivesAssetId32]>;
    };
    council: {
      /**
       * A motion was approved by the required threshold.
       **/
      Approved: AugmentedEvent<ApiType, [proposalHash: H256], { proposalHash: H256 }>;
      /**
       * A proposal was closed because its threshold was reached or after its duration was up.
       **/
      Closed: AugmentedEvent<ApiType, [proposalHash: H256, yes: u32, no: u32], { proposalHash: H256, yes: u32, no: u32 }>;
      /**
       * A motion was not approved by the required threshold.
       **/
      Disapproved: AugmentedEvent<ApiType, [proposalHash: H256], { proposalHash: H256 }>;
      /**
       * A motion was executed; result will be `Ok` if it returned without error.
       **/
      Executed: AugmentedEvent<ApiType, [proposalHash: H256, result: Result<Null, SpRuntimeDispatchError>], { proposalHash: H256, result: Result<Null, SpRuntimeDispatchError> }>;
      /**
       * A single member did some action; result will be `Ok` if it returned without error.
       **/
      MemberExecuted: AugmentedEvent<ApiType, [proposalHash: H256, result: Result<Null, SpRuntimeDispatchError>], { proposalHash: H256, result: Result<Null, SpRuntimeDispatchError> }>;
      /**
       * A motion (given hash) has been proposed (by given account) with a threshold (given
       * `MemberCount`).
       **/
      Proposed: AugmentedEvent<ApiType, [account: AccountId32, proposalIndex: u32, proposalHash: H256, threshold: u32], { account: AccountId32, proposalIndex: u32, proposalHash: H256, threshold: u32 }>;
      /**
       * A motion (given hash) has been voted on by given account, leaving
       * a tally (yes votes and no votes given respectively as `MemberCount`).
       **/
      Voted: AugmentedEvent<ApiType, [account: AccountId32, proposalHash: H256, voted: bool, yes: u32, no: u32], { account: AccountId32, proposalHash: H256, voted: bool, yes: u32, no: u32 }>;
    };
    demeterFarmingPlatform: {
      /**
       * Deposited [who, base_asset, pool_asset, reward_asset, is_farm, amount]
       **/
      Deposited: AugmentedEvent<ApiType, [AccountId32, CommonPrimitivesAssetId32, CommonPrimitivesAssetId32, CommonPrimitivesAssetId32, bool, u128]>;
      /**
       * DepositFeeChanged [who, base_asset, pool_asset, reward_asset, is_farm, amount]
       **/
      DepositFeeChanged: AugmentedEvent<ApiType, [AccountId32, CommonPrimitivesAssetId32, CommonPrimitivesAssetId32, CommonPrimitivesAssetId32, bool, u128]>;
      /**
       * Info changed [who, base_asset, pool_asset, reward_asset, is_farm, amount]
       **/
      InfoChanged: AugmentedEvent<ApiType, [AccountId32, CommonPrimitivesAssetId32, CommonPrimitivesAssetId32, CommonPrimitivesAssetId32, bool, u128]>;
      /**
       * Multiplier Changed [who, base_asset, pool_asset, reward_asset, is_farm, amount]
       **/
      MultiplierChanged: AugmentedEvent<ApiType, [AccountId32, CommonPrimitivesAssetId32, CommonPrimitivesAssetId32, CommonPrimitivesAssetId32, bool, u32]>;
      /**
       * Pool added [who, base_asset, pool_asset, reward_asset, is_farm]
       **/
      PoolAdded: AugmentedEvent<ApiType, [AccountId32, CommonPrimitivesAssetId32, CommonPrimitivesAssetId32, CommonPrimitivesAssetId32, bool]>;
      /**
       * Pool removed [who, base_asset, pool_asset, reward_asset, is_farm]
       **/
      PoolRemoved: AugmentedEvent<ApiType, [AccountId32, CommonPrimitivesAssetId32, CommonPrimitivesAssetId32, CommonPrimitivesAssetId32, bool]>;
      /**
       * Reward Withdrawn [who, amount, base_asset, pool_asset, reward_asset, is_farm]
       **/
      RewardWithdrawn: AugmentedEvent<ApiType, [AccountId32, u128, CommonPrimitivesAssetId32, CommonPrimitivesAssetId32, CommonPrimitivesAssetId32, bool]>;
      /**
       * Token info changed [who, what]
       **/
      TokenInfoChanged: AugmentedEvent<ApiType, [AccountId32, CommonPrimitivesAssetId32]>;
      /**
       * Token registered [who, what]
       **/
      TokenRegistered: AugmentedEvent<ApiType, [AccountId32, CommonPrimitivesAssetId32]>;
      /**
       * Total tokens changed [who, base_asset, pool_asset, reward_asset, is_farm, amount]
       **/
      TotalTokensChanged: AugmentedEvent<ApiType, [AccountId32, CommonPrimitivesAssetId32, CommonPrimitivesAssetId32, CommonPrimitivesAssetId32, bool, u128]>;
      /**
       * Withdrawn [who, amount, base_asset, pool_asset, reward_asset, is_farm]
       **/
      Withdrawn: AugmentedEvent<ApiType, [AccountId32, u128, CommonPrimitivesAssetId32, CommonPrimitivesAssetId32, CommonPrimitivesAssetId32, bool]>;
    };
    democracy: {
      /**
       * A proposal_hash has been blacklisted permanently.
       **/
      Blacklisted: AugmentedEvent<ApiType, [proposalHash: H256], { proposalHash: H256 }>;
      /**
       * A referendum has been cancelled.
       **/
      Cancelled: AugmentedEvent<ApiType, [refIndex: u32], { refIndex: u32 }>;
      /**
       * An account has delegated their vote to another account.
       **/
      Delegated: AugmentedEvent<ApiType, [who: AccountId32, target: AccountId32], { who: AccountId32, target: AccountId32 }>;
      /**
       * A proposal has been enacted.
       **/
      Executed: AugmentedEvent<ApiType, [refIndex: u32, result: Result<Null, SpRuntimeDispatchError>], { refIndex: u32, result: Result<Null, SpRuntimeDispatchError> }>;
      /**
       * An external proposal has been tabled.
       **/
      ExternalTabled: AugmentedEvent<ApiType, []>;
      /**
       * A proposal has been rejected by referendum.
       **/
      NotPassed: AugmentedEvent<ApiType, [refIndex: u32], { refIndex: u32 }>;
      /**
       * A proposal has been approved by referendum.
       **/
      Passed: AugmentedEvent<ApiType, [refIndex: u32], { refIndex: u32 }>;
      /**
       * A proposal could not be executed because its preimage was invalid.
       **/
      PreimageInvalid: AugmentedEvent<ApiType, [proposalHash: H256, refIndex: u32], { proposalHash: H256, refIndex: u32 }>;
      /**
       * A proposal could not be executed because its preimage was missing.
       **/
      PreimageMissing: AugmentedEvent<ApiType, [proposalHash: H256, refIndex: u32], { proposalHash: H256, refIndex: u32 }>;
      /**
       * A proposal's preimage was noted, and the deposit taken.
       **/
      PreimageNoted: AugmentedEvent<ApiType, [proposalHash: H256, who: AccountId32, deposit: u128], { proposalHash: H256, who: AccountId32, deposit: u128 }>;
      /**
       * A registered preimage was removed and the deposit collected by the reaper.
       **/
      PreimageReaped: AugmentedEvent<ApiType, [proposalHash: H256, provider: AccountId32, deposit: u128, reaper: AccountId32], { proposalHash: H256, provider: AccountId32, deposit: u128, reaper: AccountId32 }>;
      /**
       * A proposal preimage was removed and used (the deposit was returned).
       **/
      PreimageUsed: AugmentedEvent<ApiType, [proposalHash: H256, provider: AccountId32, deposit: u128], { proposalHash: H256, provider: AccountId32, deposit: u128 }>;
      /**
       * A proposal got canceled.
       **/
      ProposalCanceled: AugmentedEvent<ApiType, [propIndex: u32], { propIndex: u32 }>;
      /**
       * A motion has been proposed by a public account.
       **/
      Proposed: AugmentedEvent<ApiType, [proposalIndex: u32, deposit: u128], { proposalIndex: u32, deposit: u128 }>;
      /**
       * An account has secconded a proposal
       **/
      Seconded: AugmentedEvent<ApiType, [seconder: AccountId32, propIndex: u32], { seconder: AccountId32, propIndex: u32 }>;
      /**
       * A referendum has begun.
       **/
      Started: AugmentedEvent<ApiType, [refIndex: u32, threshold: PalletDemocracyVoteThreshold], { refIndex: u32, threshold: PalletDemocracyVoteThreshold }>;
      /**
       * A public proposal has been tabled for referendum vote.
       **/
      Tabled: AugmentedEvent<ApiType, [proposalIndex: u32, deposit: u128, depositors: Vec<AccountId32>], { proposalIndex: u32, deposit: u128, depositors: Vec<AccountId32> }>;
      /**
       * An account has cancelled a previous delegation operation.
       **/
      Undelegated: AugmentedEvent<ApiType, [account: AccountId32], { account: AccountId32 }>;
      /**
       * An external proposal has been vetoed.
       **/
      Vetoed: AugmentedEvent<ApiType, [who: AccountId32, proposalHash: H256, until: u32], { who: AccountId32, proposalHash: H256, until: u32 }>;
      /**
       * An account has voted in a referendum
       **/
      Voted: AugmentedEvent<ApiType, [voter: AccountId32, refIndex: u32, vote: PalletDemocracyVoteAccountVote], { voter: AccountId32, refIndex: u32, vote: PalletDemocracyVoteAccountVote }>;
    };
    electionProviderMultiPhase: {
      /**
       * The election has been finalized, with `Some` of the given computation, or else if the
       * election failed, `None`.
       **/
      ElectionFinalized: AugmentedEvent<ApiType, [electionCompute: Option<PalletElectionProviderMultiPhaseElectionCompute>], { electionCompute: Option<PalletElectionProviderMultiPhaseElectionCompute> }>;
      /**
       * An account has been rewarded for their signed submission being finalized.
       **/
      Rewarded: AugmentedEvent<ApiType, [account: AccountId32, value: u128], { account: AccountId32, value: u128 }>;
      /**
       * The signed phase of the given round has started.
       **/
      SignedPhaseStarted: AugmentedEvent<ApiType, [round: u32], { round: u32 }>;
      /**
       * An account has been slashed for submitting an invalid signed submission.
       **/
      Slashed: AugmentedEvent<ApiType, [account: AccountId32, value: u128], { account: AccountId32, value: u128 }>;
      /**
       * A solution was stored with the given compute.
       * 
       * If the solution is signed, this means that it hasn't yet been processed. If the
       * solution is unsigned, this means that it has also been processed.
       * 
       * The `bool` is `true` when a previous solution was ejected to make room for this one.
       **/
      SolutionStored: AugmentedEvent<ApiType, [electionCompute: PalletElectionProviderMultiPhaseElectionCompute, prevEjected: bool], { electionCompute: PalletElectionProviderMultiPhaseElectionCompute, prevEjected: bool }>;
      /**
       * The unsigned phase of the given round has started.
       **/
      UnsignedPhaseStarted: AugmentedEvent<ApiType, [round: u32], { round: u32 }>;
    };
    electionsPhragmen: {
      /**
       * A candidate was slashed by amount due to failing to obtain a seat as member or
       * runner-up.
       * 
       * Note that old members and runners-up are also candidates.
       **/
      CandidateSlashed: AugmentedEvent<ApiType, [candidate: AccountId32, amount: u128], { candidate: AccountId32, amount: u128 }>;
      /**
       * Internal error happened while trying to perform election.
       **/
      ElectionError: AugmentedEvent<ApiType, []>;
      /**
       * No (or not enough) candidates existed for this round. This is different from
       * `NewTerm(\[\])`. See the description of `NewTerm`.
       **/
      EmptyTerm: AugmentedEvent<ApiType, []>;
      /**
       * A member has been removed. This should always be followed by either `NewTerm` or
       * `EmptyTerm`.
       **/
      MemberKicked: AugmentedEvent<ApiType, [member: AccountId32], { member: AccountId32 }>;
      /**
       * A new term with new_members. This indicates that enough candidates existed to run
       * the election, not that enough have has been elected. The inner value must be examined
       * for this purpose. A `NewTerm(\[\])` indicates that some candidates got their bond
       * slashed and none were elected, whilst `EmptyTerm` means that no candidates existed to
       * begin with.
       **/
      NewTerm: AugmentedEvent<ApiType, [newMembers: Vec<ITuple<[AccountId32, u128]>>], { newMembers: Vec<ITuple<[AccountId32, u128]>> }>;
      /**
       * Someone has renounced their candidacy.
       **/
      Renounced: AugmentedEvent<ApiType, [candidate: AccountId32], { candidate: AccountId32 }>;
      /**
       * A seat holder was slashed by amount by being forcefully removed from the set.
       **/
      SeatHolderSlashed: AugmentedEvent<ApiType, [seatHolder: AccountId32, amount: u128], { seatHolder: AccountId32, amount: u128 }>;
    };
    ethBridge: {
      /**
       * The request's approvals have been collected. [Encoded Outgoing Request, Signatures]
       **/
      ApprovalsCollected: AugmentedEvent<ApiType, [H256]>;
      /**
       * The request wasn't finalized nor cancelled. [Request Hash]
       **/
      CancellationFailed: AugmentedEvent<ApiType, [H256]>;
      /**
       * The incoming request finalization has been failed. [Request Hash]
       **/
      IncomingRequestFinalizationFailed: AugmentedEvent<ApiType, [H256]>;
      /**
       * The incoming request has been finalized. [Request Hash]
       **/
      IncomingRequestFinalized: AugmentedEvent<ApiType, [H256]>;
      /**
       * The request was aborted and cancelled. [Request Hash]
       **/
      RequestAborted: AugmentedEvent<ApiType, [H256]>;
      /**
       * The request finalization has been failed. [Request Hash]
       **/
      RequestFinalizationFailed: AugmentedEvent<ApiType, [H256]>;
      /**
       * New request has been registered. [Request Hash]
       **/
      RequestRegistered: AugmentedEvent<ApiType, [H256]>;
    };
    faucet: {
      LimitUpdated: AugmentedEvent<ApiType, [u128]>;
      Transferred: AugmentedEvent<ApiType, [AccountId32, u128]>;
    };
    grandpa: {
      /**
       * New authority set has been applied.
       **/
      NewAuthorities: AugmentedEvent<ApiType, [authoritySet: Vec<ITuple<[SpFinalityGrandpaAppPublic, u64]>>], { authoritySet: Vec<ITuple<[SpFinalityGrandpaAppPublic, u64]>> }>;
      /**
       * Current authority set has been paused.
       **/
      Paused: AugmentedEvent<ApiType, []>;
      /**
       * Current authority set has been resumed.
       **/
      Resumed: AugmentedEvent<ApiType, []>;
    };
    identity: {
      /**
       * A name was cleared, and the given balance returned.
       **/
      IdentityCleared: AugmentedEvent<ApiType, [who: AccountId32, deposit: u128], { who: AccountId32, deposit: u128 }>;
      /**
       * A name was removed and the given balance slashed.
       **/
      IdentityKilled: AugmentedEvent<ApiType, [who: AccountId32, deposit: u128], { who: AccountId32, deposit: u128 }>;
      /**
       * A name was set or reset (which will remove all judgements).
       **/
      IdentitySet: AugmentedEvent<ApiType, [who: AccountId32], { who: AccountId32 }>;
      /**
       * A judgement was given by a registrar.
       **/
      JudgementGiven: AugmentedEvent<ApiType, [target: AccountId32, registrarIndex: u32], { target: AccountId32, registrarIndex: u32 }>;
      /**
       * A judgement was asked from a registrar.
       **/
      JudgementRequested: AugmentedEvent<ApiType, [who: AccountId32, registrarIndex: u32], { who: AccountId32, registrarIndex: u32 }>;
      /**
       * A judgement request was retracted.
       **/
      JudgementUnrequested: AugmentedEvent<ApiType, [who: AccountId32, registrarIndex: u32], { who: AccountId32, registrarIndex: u32 }>;
      /**
       * A registrar was added.
       **/
      RegistrarAdded: AugmentedEvent<ApiType, [registrarIndex: u32], { registrarIndex: u32 }>;
      /**
       * A sub-identity was added to an identity and the deposit paid.
       **/
      SubIdentityAdded: AugmentedEvent<ApiType, [sub: AccountId32, main: AccountId32, deposit: u128], { sub: AccountId32, main: AccountId32, deposit: u128 }>;
      /**
       * A sub-identity was removed from an identity and the deposit freed.
       **/
      SubIdentityRemoved: AugmentedEvent<ApiType, [sub: AccountId32, main: AccountId32, deposit: u128], { sub: AccountId32, main: AccountId32, deposit: u128 }>;
      /**
       * A sub-identity was cleared, and the given deposit repatriated from the
       * main identity account to the sub-identity account.
       **/
      SubIdentityRevoked: AugmentedEvent<ApiType, [sub: AccountId32, main: AccountId32, deposit: u128], { sub: AccountId32, main: AccountId32, deposit: u128 }>;
    };
    imOnline: {
      /**
       * At the end of the session, no offence was committed.
       **/
      AllGood: AugmentedEvent<ApiType, []>;
      /**
       * A new heartbeat was received from `AuthorityId`.
       **/
      HeartbeatReceived: AugmentedEvent<ApiType, [authorityId: PalletImOnlineSr25519AppSr25519Public], { authorityId: PalletImOnlineSr25519AppSr25519Public }>;
      /**
       * At the end of the session, at least one validator was found to be offline.
       **/
      SomeOffline: AugmentedEvent<ApiType, [offline: Vec<ITuple<[AccountId32, PalletStakingExposure]>>], { offline: Vec<ITuple<[AccountId32, PalletStakingExposure]>> }>;
    };
    irohaMigration: {
      /**
       * Migrated. [source, target]
       **/
      Migrated: AugmentedEvent<ApiType, [Text, AccountId32]>;
    };
    liquidityProxy: {
      /**
       * Exchange of tokens has been performed
       * [Caller Account, DEX Id, Input Asset Id, Output Asset Id, Input Amount, Output Amount, Fee Amount]
       **/
      Exchange: AugmentedEvent<ApiType, [AccountId32, u32, CommonPrimitivesAssetId32, CommonPrimitivesAssetId32, u128, u128, u128, Vec<CommonPrimitivesLiquiditySourceId>]>;
      /**
       * Liquidity source was disabled
       **/
      LiquiditySourceDisabled: AugmentedEvent<ApiType, [CommonPrimitivesLiquiditySourceType]>;
      /**
       * Liquidity source was enabled
       **/
      LiquiditySourceEnabled: AugmentedEvent<ApiType, [CommonPrimitivesLiquiditySourceType]>;
    };
    multicollateralBondingCurvePool: {
      /**
       * Multiplier for reward has been updated on particular asset. [Asset Id, New Multiplier]
       **/
      OptionalRewardMultiplierUpdated: AugmentedEvent<ApiType, [CommonPrimitivesAssetId32, Option<FixnumFixedPoint>]>;
      /**
       * Pool is initialized for pair. [DEX Id, Collateral Asset Id]
       **/
      PoolInitialized: AugmentedEvent<ApiType, [u32, CommonPrimitivesAssetId32]>;
      /**
       * Price bias was changed. [New Price Bias]
       **/
      PriceBiasChanged: AugmentedEvent<ApiType, [u128]>;
      /**
       * Price change config was changed. [New Price Change Rate, New Price Change Step]
       **/
      PriceChangeConfigChanged: AugmentedEvent<ApiType, [u128, u128]>;
      /**
       * Reference Asset has been changed for pool. [New Reference Asset Id]
       **/
      ReferenceAssetChanged: AugmentedEvent<ApiType, [CommonPrimitivesAssetId32]>;
    };
    multisig: {
      /**
       * A multisig operation has been approved by someone.
       **/
      MultisigApproval: AugmentedEvent<ApiType, [approving: AccountId32, timepoint: PalletMultisigTimepoint, multisig: AccountId32, callHash: U8aFixed], { approving: AccountId32, timepoint: PalletMultisigTimepoint, multisig: AccountId32, callHash: U8aFixed }>;
      /**
       * A multisig operation has been cancelled.
       **/
      MultisigCancelled: AugmentedEvent<ApiType, [cancelling: AccountId32, timepoint: PalletMultisigTimepoint, multisig: AccountId32, callHash: U8aFixed], { cancelling: AccountId32, timepoint: PalletMultisigTimepoint, multisig: AccountId32, callHash: U8aFixed }>;
      /**
       * A multisig operation has been executed.
       **/
      MultisigExecuted: AugmentedEvent<ApiType, [approving: AccountId32, timepoint: PalletMultisigTimepoint, multisig: AccountId32, callHash: U8aFixed, result: Result<Null, SpRuntimeDispatchError>], { approving: AccountId32, timepoint: PalletMultisigTimepoint, multisig: AccountId32, callHash: U8aFixed, result: Result<Null, SpRuntimeDispatchError> }>;
      /**
       * A new multisig operation has begun.
       **/
      NewMultisig: AugmentedEvent<ApiType, [approving: AccountId32, multisig: AccountId32, callHash: U8aFixed], { approving: AccountId32, multisig: AccountId32, callHash: U8aFixed }>;
    };
    offences: {
      /**
       * There is an offence reported of the given `kind` happened at the `session_index` and
       * (kind-specific) time slot. This event is not deposited for duplicate slashes.
       * \[kind, timeslot\].
       **/
      Offence: AugmentedEvent<ApiType, [kind: U8aFixed, timeslot: Bytes], { kind: U8aFixed, timeslot: Bytes }>;
    };
    permissions: {
      /**
       * Permission was assigned to the account in the scope. [permission, who]
       **/
      PermissionAssigned: AugmentedEvent<ApiType, [u32, AccountId32]>;
      /**
       * Permission was created with an owner. [permission, who]
       **/
      PermissionCreated: AugmentedEvent<ApiType, [u32, AccountId32]>;
      /**
       * Permission was granted to a holder. [permission, who]
       **/
      PermissionGranted: AugmentedEvent<ApiType, [u32, AccountId32]>;
      /**
       * Permission was transfered to a new owner. [permission, who]
       **/
      PermissionTransfered: AugmentedEvent<ApiType, [u32, AccountId32]>;
    };
    poolXYK: {
      PoolIsInitialized: AugmentedEvent<ApiType, [AccountId32]>;
    };
    priceTools: {
    };
    pswapDistribution: {
      /**
       * Burn rate updated.
       * [Current Burn Rate]
       **/
      BurnRateChanged: AugmentedEvent<ApiType, [FixnumFixedPoint]>;
      /**
       * Fees successfully exchanged for appropriate amount of pool tokens.
       * [DEX Id, Fees Account Id, Fees Asset Id, Fees Spent Amount, Incentive Asset Id, Incentive Received Amount]
       **/
      FeesExchanged: AugmentedEvent<ApiType, [u32, AccountId32, CommonPrimitivesAssetId32, u128, CommonPrimitivesAssetId32, u128]>;
      /**
       * Problem occurred that resulted in fees exchange not done.
       * [DEX Id, Fees Account Id, Fees Asset Id, Available Fees Amount, Incentive Asset Id]
       **/
      FeesExchangeFailed: AugmentedEvent<ApiType, [u32, AccountId32, CommonPrimitivesAssetId32, u128, CommonPrimitivesAssetId32]>;
      /**
       * Incentives successfully sent out to shareholders.
       * [DEX Id, Fees Account Id, Incentive Asset Id, Incentive Total Distributed Amount, Number of shareholders]
       **/
      IncentiveDistributed: AugmentedEvent<ApiType, [u32, AccountId32, CommonPrimitivesAssetId32, u128, u128]>;
      /**
       * Problem occurred that resulted in incentive distribution not done.
       * [DEX Id, Fees Account Id]
       **/
      IncentiveDistributionFailed: AugmentedEvent<ApiType, [u32, AccountId32]>;
      /**
       * This is needed for other pallet that will use this variables, for example this is
       * farming pallet.
       * [DEX Id, Incentive Asset Id, Total exchanged incentives (Incentives burned after exchange),
       * Incentives burned (Incentives that is not revived (to burn)]).
       **/
      IncentivesBurnedAfterExchange: AugmentedEvent<ApiType, [u32, CommonPrimitivesAssetId32, u128, u128]>;
      /**
       * Fees Account contains zero incentive tokens, thus distribution is dismissed.
       * [DEX Id, Fees Account Id]
       **/
      NothingToDistribute: AugmentedEvent<ApiType, [u32, AccountId32]>;
      /**
       * Fees Account contains zero base tokens, thus exchange is dismissed.
       * [DEX Id, Fees Account Id]
       **/
      NothingToExchange: AugmentedEvent<ApiType, [u32, AccountId32]>;
    };
    rewards: {
      /**
       * The account has claimed their rewards. [account]
       **/
      Claimed: AugmentedEvent<ApiType, [AccountId32]>;
      /**
       * Storage migration to version 1.2.0 completed
       **/
      MigrationCompleted: AugmentedEvent<ApiType, []>;
    };
    scheduler: {
      /**
       * The call for the provided hash was not found so the task has been aborted.
       **/
      CallLookupFailed: AugmentedEvent<ApiType, [task: ITuple<[u32, u32]>, id: Option<Bytes>, error: FrameSupportScheduleLookupError], { task: ITuple<[u32, u32]>, id: Option<Bytes>, error: FrameSupportScheduleLookupError }>;
      /**
       * Canceled some task.
       **/
      Canceled: AugmentedEvent<ApiType, [when: u32, index: u32], { when: u32, index: u32 }>;
      /**
       * Dispatched some task.
       **/
      Dispatched: AugmentedEvent<ApiType, [task: ITuple<[u32, u32]>, id: Option<Bytes>, result: Result<Null, SpRuntimeDispatchError>], { task: ITuple<[u32, u32]>, id: Option<Bytes>, result: Result<Null, SpRuntimeDispatchError> }>;
      /**
       * Scheduled some task.
       **/
      Scheduled: AugmentedEvent<ApiType, [when: u32, index: u32], { when: u32, index: u32 }>;
    };
    session: {
      /**
       * New session has happened. Note that the argument is the session index, not the
       * block number as the type might suggest.
       **/
      NewSession: AugmentedEvent<ApiType, [sessionIndex: u32], { sessionIndex: u32 }>;
    };
    staking: {
      /**
       * An account has bonded this amount. \[stash, amount\]
       * 
       * NOTE: This event is only emitted when funds are bonded via a dispatchable. Notably,
       * it will not be emitted for staking rewards when they are added to stake.
       **/
      Bonded: AugmentedEvent<ApiType, [AccountId32, u128]>;
      /**
       * An account has stopped participating as either a validator or nominator.
       * \[stash\]
       **/
      Chilled: AugmentedEvent<ApiType, [AccountId32]>;
      /**
       * The era payout has been set; the first balance is the validator-payout; the second is
       * the remainder from the maximum amount of reward.
       * \[era_index, validator_payout, remainder\]
       **/
      EraPaid: AugmentedEvent<ApiType, [u32, u128]>;
      /**
       * A nominator has been kicked from a validator. \[nominator, stash\]
       **/
      Kicked: AugmentedEvent<ApiType, [AccountId32, AccountId32]>;
      /**
       * An old slashing report from a prior era was discarded because it could
       * not be processed. \[session_index\]
       **/
      OldSlashingReportDiscarded: AugmentedEvent<ApiType, [u32]>;
      /**
       * The stakers' rewards are getting paid. \[era_index, validator_stash\]
       **/
      PayoutStarted: AugmentedEvent<ApiType, [u32, AccountId32]>;
      /**
       * The nominator has been rewarded by this amount. \[stash, amount\]
       **/
      Rewarded: AugmentedEvent<ApiType, [AccountId32, u128]>;
      /**
       * One validator (and its nominators) has been slashed by the given amount.
       * \[validator, amount\]
       **/
      Slashed: AugmentedEvent<ApiType, [AccountId32, u128]>;
      /**
       * A new set of stakers was elected.
       **/
      StakersElected: AugmentedEvent<ApiType, []>;
      /**
       * The election failed. No new era is planned.
       **/
      StakingElectionFailed: AugmentedEvent<ApiType, []>;
      /**
       * An account has unbonded this amount. \[stash, amount\]
       **/
      Unbonded: AugmentedEvent<ApiType, [AccountId32, u128]>;
      /**
       * A validator has set their preferences.
       **/
      ValidatorPrefsSet: AugmentedEvent<ApiType, [AccountId32, PalletStakingValidatorPrefs]>;
      /**
       * An account has called `withdraw_unbonded` and removed unbonding chunks worth `Balance`
       * from the unlocking queue. \[stash, amount\]
       **/
      Withdrawn: AugmentedEvent<ApiType, [AccountId32, u128]>;
    };
    sudo: {
      /**
       * The \[sudoer\] just switched identity; the old key is supplied if one existed.
       **/
      KeyChanged: AugmentedEvent<ApiType, [oldSudoer: Option<AccountId32>], { oldSudoer: Option<AccountId32> }>;
      /**
       * A sudo just took place. \[result\]
       **/
      Sudid: AugmentedEvent<ApiType, [sudoResult: Result<Null, SpRuntimeDispatchError>], { sudoResult: Result<Null, SpRuntimeDispatchError> }>;
      /**
       * A sudo just took place. \[result\]
       **/
      SudoAsDone: AugmentedEvent<ApiType, [sudoResult: Result<Null, SpRuntimeDispatchError>], { sudoResult: Result<Null, SpRuntimeDispatchError> }>;
    };
    system: {
      /**
       * `:code` was updated.
       **/
      CodeUpdated: AugmentedEvent<ApiType, []>;
      /**
       * An extrinsic failed.
       **/
      ExtrinsicFailed: AugmentedEvent<ApiType, [dispatchError: SpRuntimeDispatchError, dispatchInfo: FrameSupportWeightsDispatchInfo], { dispatchError: SpRuntimeDispatchError, dispatchInfo: FrameSupportWeightsDispatchInfo }>;
      /**
       * An extrinsic completed successfully.
       **/
      ExtrinsicSuccess: AugmentedEvent<ApiType, [dispatchInfo: FrameSupportWeightsDispatchInfo], { dispatchInfo: FrameSupportWeightsDispatchInfo }>;
      /**
       * An account was reaped.
       **/
      KilledAccount: AugmentedEvent<ApiType, [account: AccountId32], { account: AccountId32 }>;
      /**
       * A new account was created.
       **/
      NewAccount: AugmentedEvent<ApiType, [account: AccountId32], { account: AccountId32 }>;
      /**
       * On on-chain remark happened.
       **/
      Remarked: AugmentedEvent<ApiType, [sender: AccountId32, hash_: H256], { sender: AccountId32, hash_: H256 }>;
    };
    technical: {
      /**
       * Some pure technical assets were burned. [asset, owner, burned_amount, total_exist].
       * For full kind of accounts like in Minted.
       **/
      Burned: AugmentedEvent<ApiType, [CommonPrimitivesTechAssetId, CommonPrimitivesTechAccountId, u128, u128]>;
      /**
       * Some assets were transferred in. [asset, from, to, amount].
       * TechAccountId is only pure TechAccountId.
       **/
      InputTransferred: AugmentedEvent<ApiType, [CommonPrimitivesTechAssetId, AccountId32, CommonPrimitivesTechAccountId, u128]>;
      /**
       * Some pure technical assets were minted. [asset, owner, minted_amount, total_exist].
       * This is not only for pure TechAccountId.
       * TechAccountId can be just wrapped AccountId.
       **/
      Minted: AugmentedEvent<ApiType, [CommonPrimitivesTechAssetId, CommonPrimitivesTechAccountId, u128, u128]>;
      /**
       * Some assets were transferred out. [asset, from, to, amount].
       * TechAccountId is only pure TechAccountId.
       **/
      OutputTransferred: AugmentedEvent<ApiType, [CommonPrimitivesTechAssetId, CommonPrimitivesTechAccountId, AccountId32, u128]>;
      /**
       * Swap operaction is finalised [initiator, finaliser].
       * TechAccountId is only pure TechAccountId.
       **/
      SwapSuccess: AugmentedEvent<ApiType, [AccountId32]>;
    };
    technicalCommittee: {
      /**
       * A motion was approved by the required threshold.
       **/
      Approved: AugmentedEvent<ApiType, [proposalHash: H256], { proposalHash: H256 }>;
      /**
       * A proposal was closed because its threshold was reached or after its duration was up.
       **/
      Closed: AugmentedEvent<ApiType, [proposalHash: H256, yes: u32, no: u32], { proposalHash: H256, yes: u32, no: u32 }>;
      /**
       * A motion was not approved by the required threshold.
       **/
      Disapproved: AugmentedEvent<ApiType, [proposalHash: H256], { proposalHash: H256 }>;
      /**
       * A motion was executed; result will be `Ok` if it returned without error.
       **/
      Executed: AugmentedEvent<ApiType, [proposalHash: H256, result: Result<Null, SpRuntimeDispatchError>], { proposalHash: H256, result: Result<Null, SpRuntimeDispatchError> }>;
      /**
       * A single member did some action; result will be `Ok` if it returned without error.
       **/
      MemberExecuted: AugmentedEvent<ApiType, [proposalHash: H256, result: Result<Null, SpRuntimeDispatchError>], { proposalHash: H256, result: Result<Null, SpRuntimeDispatchError> }>;
      /**
       * A motion (given hash) has been proposed (by given account) with a threshold (given
       * `MemberCount`).
       **/
      Proposed: AugmentedEvent<ApiType, [account: AccountId32, proposalIndex: u32, proposalHash: H256, threshold: u32], { account: AccountId32, proposalIndex: u32, proposalHash: H256, threshold: u32 }>;
      /**
       * A motion (given hash) has been voted on by given account, leaving
       * a tally (yes votes and no votes given respectively as `MemberCount`).
       **/
      Voted: AugmentedEvent<ApiType, [account: AccountId32, proposalHash: H256, voted: bool, yes: u32, no: u32], { account: AccountId32, proposalHash: H256, voted: bool, yes: u32, no: u32 }>;
    };
    technicalMembership: {
      /**
       * Phantom member, never used.
       **/
      Dummy: AugmentedEvent<ApiType, []>;
      /**
       * One of the members' keys changed.
       **/
      KeyChanged: AugmentedEvent<ApiType, []>;
      /**
       * The given member was added; see the transaction for who.
       **/
      MemberAdded: AugmentedEvent<ApiType, []>;
      /**
       * The given member was removed; see the transaction for who.
       **/
      MemberRemoved: AugmentedEvent<ApiType, []>;
      /**
       * The membership was reset; see the transaction for who the new set is.
       **/
      MembersReset: AugmentedEvent<ApiType, []>;
      /**
       * Two members were swapped; see the transaction for who.
       **/
      MembersSwapped: AugmentedEvent<ApiType, []>;
    };
    tokens: {
      /**
       * A balance was set by root.
       **/
      BalanceSet: AugmentedEvent<ApiType, [currencyId: CommonPrimitivesAssetId32, who: AccountId32, free: u128, reserved: u128], { currencyId: CommonPrimitivesAssetId32, who: AccountId32, free: u128, reserved: u128 }>;
      /**
       * Deposited some balance into an account
       **/
      Deposited: AugmentedEvent<ApiType, [currencyId: CommonPrimitivesAssetId32, who: AccountId32, amount: u128], { currencyId: CommonPrimitivesAssetId32, who: AccountId32, amount: u128 }>;
      /**
       * An account was removed whose balance was non-zero but below
       * ExistentialDeposit, resulting in an outright loss.
       **/
      DustLost: AugmentedEvent<ApiType, [currencyId: CommonPrimitivesAssetId32, who: AccountId32, amount: u128], { currencyId: CommonPrimitivesAssetId32, who: AccountId32, amount: u128 }>;
      /**
       * An account was created with some free balance.
       **/
      Endowed: AugmentedEvent<ApiType, [currencyId: CommonPrimitivesAssetId32, who: AccountId32, amount: u128], { currencyId: CommonPrimitivesAssetId32, who: AccountId32, amount: u128 }>;
      /**
       * Some locked funds were unlocked
       **/
      LockRemoved: AugmentedEvent<ApiType, [lockId: U8aFixed, currencyId: CommonPrimitivesAssetId32, who: AccountId32], { lockId: U8aFixed, currencyId: CommonPrimitivesAssetId32, who: AccountId32 }>;
      /**
       * Some funds are locked
       **/
      LockSet: AugmentedEvent<ApiType, [lockId: U8aFixed, currencyId: CommonPrimitivesAssetId32, who: AccountId32, amount: u128], { lockId: U8aFixed, currencyId: CommonPrimitivesAssetId32, who: AccountId32, amount: u128 }>;
      /**
       * Some balance was reserved (moved from free to reserved).
       **/
      Reserved: AugmentedEvent<ApiType, [currencyId: CommonPrimitivesAssetId32, who: AccountId32, amount: u128], { currencyId: CommonPrimitivesAssetId32, who: AccountId32, amount: u128 }>;
      /**
       * Some reserved balance was repatriated (moved from reserved to
       * another account).
       **/
      ReserveRepatriated: AugmentedEvent<ApiType, [currencyId: CommonPrimitivesAssetId32, from: AccountId32, to: AccountId32, amount: u128, status: FrameSupportTokensMiscBalanceStatus], { currencyId: CommonPrimitivesAssetId32, from: AccountId32, to: AccountId32, amount: u128, status: FrameSupportTokensMiscBalanceStatus }>;
      /**
       * Some balances were slashed (e.g. due to mis-behavior)
       **/
      Slashed: AugmentedEvent<ApiType, [currencyId: CommonPrimitivesAssetId32, who: AccountId32, freeAmount: u128, reservedAmount: u128], { currencyId: CommonPrimitivesAssetId32, who: AccountId32, freeAmount: u128, reservedAmount: u128 }>;
      /**
       * The total issuance of an currency has been set
       **/
      TotalIssuanceSet: AugmentedEvent<ApiType, [currencyId: CommonPrimitivesAssetId32, amount: u128], { currencyId: CommonPrimitivesAssetId32, amount: u128 }>;
      /**
       * Transfer succeeded.
       **/
      Transfer: AugmentedEvent<ApiType, [currencyId: CommonPrimitivesAssetId32, from: AccountId32, to: AccountId32, amount: u128], { currencyId: CommonPrimitivesAssetId32, from: AccountId32, to: AccountId32, amount: u128 }>;
      /**
       * Some balance was unreserved (moved from reserved to free).
       **/
      Unreserved: AugmentedEvent<ApiType, [currencyId: CommonPrimitivesAssetId32, who: AccountId32, amount: u128], { currencyId: CommonPrimitivesAssetId32, who: AccountId32, amount: u128 }>;
      /**
       * Some balances were withdrawn (e.g. pay for transaction fee)
       **/
      Withdrawn: AugmentedEvent<ApiType, [currencyId: CommonPrimitivesAssetId32, who: AccountId32, amount: u128], { currencyId: CommonPrimitivesAssetId32, who: AccountId32, amount: u128 }>;
    };
    tradingPair: {
      /**
       * Trading pair has been redistered on a DEX. [DEX Id, Trading Pair]
       **/
      TradingPairStored: AugmentedEvent<ApiType, [u32, CommonPrimitivesTradingPairAssetId32]>;
    };
    utility: {
      /**
       * Batch of dispatches completed fully with no error.
       **/
      BatchCompleted: AugmentedEvent<ApiType, []>;
      /**
       * Batch of dispatches completed but has errors.
       **/
      BatchCompletedWithErrors: AugmentedEvent<ApiType, []>;
      /**
       * Batch of dispatches did not complete fully. Index of first failing dispatch given, as
       * well as the error.
       **/
      BatchInterrupted: AugmentedEvent<ApiType, [index: u32, error: SpRuntimeDispatchError], { index: u32, error: SpRuntimeDispatchError }>;
      /**
       * A call was dispatched.
       **/
      DispatchedAs: AugmentedEvent<ApiType, [result: Result<Null, SpRuntimeDispatchError>], { result: Result<Null, SpRuntimeDispatchError> }>;
      /**
       * A single item within a Batch of dispatches has completed with no error.
       **/
      ItemCompleted: AugmentedEvent<ApiType, []>;
      /**
       * A single item within a Batch of dispatches has completed with error.
       **/
      ItemFailed: AugmentedEvent<ApiType, [error: SpRuntimeDispatchError], { error: SpRuntimeDispatchError }>;
    };
    vestedRewards: {
      /**
       * Attempted to claim reward, but actual claimed amount is less than expected. [reason for reward]
       **/
      ActualDoesntMatchAvailable: AugmentedEvent<ApiType, [CommonPrimitivesRewardReason]>;
      /**
       * Account was chosen as eligible for market maker rewards, however calculated reward turned into 0. [account]
       **/
      AddingZeroMarketMakerReward: AugmentedEvent<ApiType, [AccountId32]>;
      /**
       * Saving reward for account has failed in a distribution series. [account]
       **/
      FailedToSaveCalculatedReward: AugmentedEvent<ApiType, [AccountId32]>;
      /**
       * Couldn't find any account with enough transactions to count market maker rewards.
       **/
      NoEligibleMarketMakers: AugmentedEvent<ApiType, []>;
      /**
       * Rewards vested, limits were raised. [vested amount]
       **/
      RewardsVested: AugmentedEvent<ApiType, [u128]>;
    };
    xorFee: {
      /**
       * Fee has been withdrawn from user. [Account Id to withdraw from, Fee Amount]
       **/
      FeeWithdrawn: AugmentedEvent<ApiType, [AccountId32, u128]>;
      /**
       * The portion of fee is sent to the referrer. [Referral, Referrer, Amount]
       **/
      ReferrerRewarded: AugmentedEvent<ApiType, [AccountId32, AccountId32, u128]>;
      /**
       * New multiplier for weight to fee conversion is set
       * (*1_000_000_000_000_000_000). [New value]
       **/
      WeightToFeeMultiplierUpdated: AugmentedEvent<ApiType, [u128]>;
    };
    xstPool: {
      /**
       * Pool is initialized for pair. [DEX Id, Synthetic Asset Id]
       **/
      PoolInitialized: AugmentedEvent<ApiType, [u32, CommonPrimitivesAssetId32]>;
      /**
       * Reference Asset has been changed for pool. [New Reference Asset Id]
       **/
      ReferenceAssetChanged: AugmentedEvent<ApiType, [CommonPrimitivesAssetId32]>;
    };
  } // AugmentedEvents
} // declare module
