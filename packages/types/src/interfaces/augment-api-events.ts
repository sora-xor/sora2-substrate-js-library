// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

// import type lookup before we augment - in some environments
// this is required to allow for ambient/previous definitions
import '@polkadot/api-base/types/events';

import type { ApiTypes, AugmentedEvent } from '@polkadot/api-base/types';
import type { Bytes, Null, Option, Result, Text, U256, U8aFixed, Vec, bool, u128, u32, u64 } from '@polkadot/types-codec';
import type { ITuple } from '@polkadot/types-codec/types';
import type { AccountId32, H160, H256, Perbill } from '@polkadot/types/interfaces/runtime';
import type { BridgeTypesGenericNetworkId, BridgeTypesHeaderHeaderId, BridgeTypesMessageId, BridgeTypesMessageStatus, BridgeTypesSubNetworkId, CommonBalanceUnit, CommonPrimitivesAssetId32, CommonPrimitivesLiquiditySourceId, CommonPrimitivesLiquiditySourceType, CommonPrimitivesOracle, CommonPrimitivesPriceVariant, CommonPrimitivesRewardReason, CommonPrimitivesTechAccountId, CommonPrimitivesTechAssetId, CommonPrimitivesTradingPairAssetId32, FixnumFixedPoint, FrameSupportDispatchDispatchInfo, FrameSupportTokensMiscBalanceStatus, OrderBookCancelReason, OrderBookOrderAmount, OrderBookOrderBookId, OrderBookOrderBookStatus, PalletDemocracyVoteAccountVote, PalletDemocracyVoteThreshold, PalletElectionProviderMultiPhaseElectionCompute, PalletElectionProviderMultiPhasePhase, PalletImOnlineSr25519AppSr25519Public, PalletMultisigBridgeTimepoint, PalletMultisigTimepoint, PalletStakingExposure, PalletStakingForcing, PalletStakingValidatorPrefs, SpCoreEcdsaPublic, SpCoreEcdsaSignature, SpFinalityGrandpaAppPublic, SpNposElectionsElectionScore, SpRuntimeDispatchError, XcmVersionedMultiLocation } from '@polkadot/types/lookup';

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
       * Asset info has been updated
       **/
      AssetUpdated: AugmentedEvent<ApiType, [CommonPrimitivesAssetId32, Option<Bytes>, Option<Bytes>]>;
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
      SymbolsRelayed: AugmentedEvent<ApiType, [Vec<ITuple<[Bytes, u128]>>]>;
    };
    beefyLightClient: {
      NewMMRRoot: AugmentedEvent<ApiType, [BridgeTypesSubNetworkId, H256, u64]>;
      ValidatorRegistryUpdated: AugmentedEvent<ApiType, [BridgeTypesSubNetworkId, H256, u32, u64]>;
      VerificationSuccessful: AugmentedEvent<ApiType, [BridgeTypesSubNetworkId, AccountId32, u32]>;
    };
    bridgeDataSigner: {
      AddedPeer: AugmentedEvent<ApiType, [networkId: BridgeTypesGenericNetworkId, peer: SpCoreEcdsaPublic], { networkId: BridgeTypesGenericNetworkId, peer: SpCoreEcdsaPublic }>;
      ApprovalAccepted: AugmentedEvent<ApiType, [networkId: BridgeTypesGenericNetworkId, data: H256, signature: SpCoreEcdsaSignature], { networkId: BridgeTypesGenericNetworkId, data: H256, signature: SpCoreEcdsaSignature }>;
      Approved: AugmentedEvent<ApiType, [networkId: BridgeTypesGenericNetworkId, data: H256, signatures: Vec<SpCoreEcdsaSignature>], { networkId: BridgeTypesGenericNetworkId, data: H256, signatures: Vec<SpCoreEcdsaSignature> }>;
      Initialized: AugmentedEvent<ApiType, [networkId: BridgeTypesGenericNetworkId, peers: Vec<SpCoreEcdsaPublic>], { networkId: BridgeTypesGenericNetworkId, peers: Vec<SpCoreEcdsaPublic> }>;
      RemovedPeer: AugmentedEvent<ApiType, [networkId: BridgeTypesGenericNetworkId, peer: SpCoreEcdsaPublic], { networkId: BridgeTypesGenericNetworkId, peer: SpCoreEcdsaPublic }>;
    };
    bridgeInboundChannel: {
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
    bridgeOutboundChannel: {
      MessageAccepted: AugmentedEvent<ApiType, [U256, u64, u64]>;
    };
    bridgeProxy: {
      RefundFailed: AugmentedEvent<ApiType, [H256]>;
      RequestStatusUpdate: AugmentedEvent<ApiType, [H256, BridgeTypesMessageStatus]>;
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
      Tabled: AugmentedEvent<ApiType, [proposalIndex: u32, deposit: u128], { proposalIndex: u32, deposit: u128 }>;
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
    dispatch: {
      /**
       * We have failed to decode a Call from the message.
       **/
      MessageDecodeFailed: AugmentedEvent<ApiType, [BridgeTypesMessageId]>;
      /**
       * Message has been dispatched with given result.
       **/
      MessageDispatched: AugmentedEvent<ApiType, [BridgeTypesMessageId, Result<Null, SpRuntimeDispatchError>]>;
      /**
       * Message has been rejected
       **/
      MessageRejected: AugmentedEvent<ApiType, [BridgeTypesMessageId]>;
    };
    electionProviderMultiPhase: {
      /**
       * An election failed.
       * 
       * Not much can be said about which computes failed in the process.
       **/
      ElectionFailed: AugmentedEvent<ApiType, []>;
      /**
       * The election has been finalized, with the given computation and score.
       **/
      ElectionFinalized: AugmentedEvent<ApiType, [compute: PalletElectionProviderMultiPhaseElectionCompute, score: SpNposElectionsElectionScore], { compute: PalletElectionProviderMultiPhaseElectionCompute, score: SpNposElectionsElectionScore }>;
      /**
       * There was a phase transition in a given round.
       **/
      PhaseTransitioned: AugmentedEvent<ApiType, [from: PalletElectionProviderMultiPhasePhase, to: PalletElectionProviderMultiPhasePhase, round: u32], { from: PalletElectionProviderMultiPhasePhase, to: PalletElectionProviderMultiPhasePhase, round: u32 }>;
      /**
       * An account has been rewarded for their signed submission being finalized.
       **/
      Rewarded: AugmentedEvent<ApiType, [account: AccountId32, value: u128], { account: AccountId32, value: u128 }>;
      /**
       * An account has been slashed for submitting an invalid signed submission.
       **/
      Slashed: AugmentedEvent<ApiType, [account: AccountId32, value: u128], { account: AccountId32, value: u128 }>;
      /**
       * A solution was stored with the given compute.
       * 
       * The `origin` indicates the origin of the solution. If `origin` is `Some(AccountId)`,
       * the stored solution was submited in the signed phase by a miner with the `AccountId`.
       * Otherwise, the solution was stored either during the unsigned phase or by
       * `T::ForceOrigin`. The `bool` is `true` when a previous solution was ejected to make
       * room for this one.
       **/
      SolutionStored: AugmentedEvent<ApiType, [compute: PalletElectionProviderMultiPhaseElectionCompute, origin: Option<AccountId32>, prevEjected: bool], { compute: PalletElectionProviderMultiPhaseElectionCompute, origin: Option<AccountId32>, prevEjected: bool }>;
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
    erc20App: {
      /**
       * [network_id, asset_id, sender, recepient, amount]
       **/
      Burned: AugmentedEvent<ApiType, [U256, CommonPrimitivesAssetId32, AccountId32, H160, u128]>;
      /**
       * [network_id, asset_id, sender, recepient, amount]
       **/
      Minted: AugmentedEvent<ApiType, [U256, CommonPrimitivesAssetId32, H160, AccountId32, u128]>;
      /**
       * [network_id, sender, asset_id, amount]
       **/
      Refunded: AugmentedEvent<ApiType, [U256, AccountId32, CommonPrimitivesAssetId32, u128]>;
    };
    ethApp: {
      Burned: AugmentedEvent<ApiType, [U256, AccountId32, H160, u128]>;
      Minted: AugmentedEvent<ApiType, [U256, H160, AccountId32, u128]>;
      Refunded: AugmentedEvent<ApiType, [U256, AccountId32, u128]>;
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
       * The request registration has been failed. [Request Hash, Error]
       **/
      RegisterRequestFailed: AugmentedEvent<ApiType, [H256, SpRuntimeDispatchError]>;
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
    ethereumLightClient: {
      Finalized: AugmentedEvent<ApiType, [U256, BridgeTypesHeaderHeaderId]>;
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
    hermesGovernancePlatform: {
      /**
       * Create poll [who, title, start_timestamp, end_timestamp]
       **/
      Created: AugmentedEvent<ApiType, [AccountId32, Bytes, u64, u64]>;
      /**
       * Creator Funds Withdrawn [who, balance]
       **/
      CreatorFundsWithdrawn: AugmentedEvent<ApiType, [AccountId32, u128]>;
      /**
       * Change minimum Hermes for creating poll [balance]
       **/
      MinimumHermesForCreatingPollChanged: AugmentedEvent<ApiType, [u128]>;
      /**
       * Change minimum Hermes for voting [balance]
       **/
      MinimumHermesForVotingChanged: AugmentedEvent<ApiType, [u128]>;
      /**
       * Voting [who, poll, option]
       **/
      Voted: AugmentedEvent<ApiType, [AccountId32, H256, Bytes]>;
      /**
       * Voter Funds Withdrawn [who, balance]
       **/
      VoterFundsWithdrawn: AugmentedEvent<ApiType, [AccountId32, u128]>;
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
    leafProvider: {
    };
    liquidityProxy: {
      /**
       * Batch of swap transfers has been performed
       * [ADAR Fee, Input amount]
       **/
      BatchSwapExecuted: AugmentedEvent<ApiType, [u128, u128]>;
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
      /**
       * XORless transfer has been performed
       * [Asset Id, Caller Account, Receiver Account, Amount, Additional Data]
       **/
      XorlessTransfer: AugmentedEvent<ApiType, [CommonPrimitivesAssetId32, AccountId32, AccountId32, u128, Option<Bytes>]>;
    };
    migrationApp: {
      Erc20Migrated: AugmentedEvent<ApiType, [U256, H160]>;
      EthMigrated: AugmentedEvent<ApiType, [U256, H160]>;
      SidechainMigrated: AugmentedEvent<ApiType, [U256, H160]>;
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
    multisigVerifier: {
      NetworkInitialized: AugmentedEvent<ApiType, [BridgeTypesGenericNetworkId]>;
      PeerAdded: AugmentedEvent<ApiType, [SpCoreEcdsaPublic]>;
      PeerRemoved: AugmentedEvent<ApiType, [SpCoreEcdsaPublic]>;
      VerificationSuccessful: AugmentedEvent<ApiType, [BridgeTypesGenericNetworkId]>;
    };
    offences: {
      /**
       * There is an offence reported of the given `kind` happened at the `session_index` and
       * (kind-specific) time slot. This event is not deposited for duplicate slashes.
       * \[kind, timeslot\].
       **/
      Offence: AugmentedEvent<ApiType, [kind: U8aFixed, timeslot: Bytes], { kind: U8aFixed, timeslot: Bytes }>;
    };
    oracleProxy: {
      /**
       * Oracle was successfully disabled. [oracle]
       **/
      OracleDisabled: AugmentedEvent<ApiType, [CommonPrimitivesOracle]>;
      /**
       * Oracle was successfully enabled. [oracle]
       **/
      OracleEnabled: AugmentedEvent<ApiType, [CommonPrimitivesOracle]>;
    };
    orderBook: {
      /**
       * Failed to cancel expired order
       **/
      ExpirationFailure: AugmentedEvent<ApiType, [orderBookId: OrderBookOrderBookId, orderId: u128, error: SpRuntimeDispatchError], { orderBookId: OrderBookOrderBookId, orderId: u128, error: SpRuntimeDispatchError }>;
      /**
       * User canceled their limit order or the limit order has reached the end of its lifespan
       **/
      LimitOrderCanceled: AugmentedEvent<ApiType, [orderBookId: OrderBookOrderBookId, orderId: u128, ownerId: AccountId32, reason: OrderBookCancelReason], { orderBookId: OrderBookOrderBookId, orderId: u128, ownerId: AccountId32, reason: OrderBookCancelReason }>;
      /**
       * User tried to place the limit order out of the spread. The limit order is converted into a market order.
       **/
      LimitOrderConvertedToMarketOrder: AugmentedEvent<ApiType, [orderBookId: OrderBookOrderBookId, ownerId: AccountId32, direction: CommonPrimitivesPriceVariant, amount: OrderBookOrderAmount], { orderBookId: OrderBookOrderBookId, ownerId: AccountId32, direction: CommonPrimitivesPriceVariant, amount: OrderBookOrderAmount }>;
      /**
       * Some amount of the limit order is executed
       **/
      LimitOrderExecuted: AugmentedEvent<ApiType, [orderBookId: OrderBookOrderBookId, orderId: u128, ownerId: AccountId32, side: CommonPrimitivesPriceVariant, price: CommonBalanceUnit, amount: OrderBookOrderAmount], { orderBookId: OrderBookOrderBookId, orderId: u128, ownerId: AccountId32, side: CommonPrimitivesPriceVariant, price: CommonBalanceUnit, amount: OrderBookOrderAmount }>;
      /**
       * All amount of the limit order is executed
       **/
      LimitOrderFilled: AugmentedEvent<ApiType, [orderBookId: OrderBookOrderBookId, orderId: u128, ownerId: AccountId32], { orderBookId: OrderBookOrderBookId, orderId: u128, ownerId: AccountId32 }>;
      /**
       * User tried to place the limit order out of the spread.
       * One part of the liquidity of the limit order is converted into a market order, and the other part is placed as a limit order.
       **/
      LimitOrderIsSplitIntoMarketOrderAndLimitOrder: AugmentedEvent<ApiType, [orderBookId: OrderBookOrderBookId, ownerId: AccountId32, marketOrderDirection: CommonPrimitivesPriceVariant, marketOrderAmount: OrderBookOrderAmount, marketOrderAveragePrice: CommonBalanceUnit, limitOrderId: u128], { orderBookId: OrderBookOrderBookId, ownerId: AccountId32, marketOrderDirection: CommonPrimitivesPriceVariant, marketOrderAmount: OrderBookOrderAmount, marketOrderAveragePrice: CommonBalanceUnit, limitOrderId: u128 }>;
      /**
       * User placed new limit order
       **/
      LimitOrderPlaced: AugmentedEvent<ApiType, [orderBookId: OrderBookOrderBookId, orderId: u128, ownerId: AccountId32, side: CommonPrimitivesPriceVariant, price: CommonBalanceUnit, amount: CommonBalanceUnit, lifetime: u64], { orderBookId: OrderBookOrderBookId, orderId: u128, ownerId: AccountId32, side: CommonPrimitivesPriceVariant, price: CommonBalanceUnit, amount: CommonBalanceUnit, lifetime: u64 }>;
      /**
       * The limit order is updated
       **/
      LimitOrderUpdated: AugmentedEvent<ApiType, [orderBookId: OrderBookOrderBookId, orderId: u128, ownerId: AccountId32, newAmount: CommonBalanceUnit], { orderBookId: OrderBookOrderBookId, orderId: u128, ownerId: AccountId32, newAmount: CommonBalanceUnit }>;
      /**
       * User executes a deal by the market order
       **/
      MarketOrderExecuted: AugmentedEvent<ApiType, [orderBookId: OrderBookOrderBookId, ownerId: AccountId32, direction: CommonPrimitivesPriceVariant, amount: OrderBookOrderAmount, averagePrice: CommonBalanceUnit, to: Option<AccountId32>], { orderBookId: OrderBookOrderBookId, ownerId: AccountId32, direction: CommonPrimitivesPriceVariant, amount: OrderBookOrderAmount, averagePrice: CommonBalanceUnit, to: Option<AccountId32> }>;
      /**
       * New order book is created by user
       **/
      OrderBookCreated: AugmentedEvent<ApiType, [orderBookId: OrderBookOrderBookId, creator: AccountId32], { orderBookId: OrderBookOrderBookId, creator: AccountId32 }>;
      /**
       * Order book is deleted
       **/
      OrderBookDeleted: AugmentedEvent<ApiType, [orderBookId: OrderBookOrderBookId], { orderBookId: OrderBookOrderBookId }>;
      /**
       * Order book status is changed
       **/
      OrderBookStatusChanged: AugmentedEvent<ApiType, [orderBookId: OrderBookOrderBookId, newStatus: OrderBookOrderBookStatus], { orderBookId: OrderBookOrderBookId, newStatus: OrderBookOrderBookStatus }>;
      /**
       * Order book attributes are updated
       **/
      OrderBookUpdated: AugmentedEvent<ApiType, [orderBookId: OrderBookOrderBookId], { orderBookId: OrderBookOrderBookId }>;
    };
    parachainBridgeApp: {
      /**
       * [network_id, asset_id, sender, recepient, amount]
       **/
      Burned: AugmentedEvent<ApiType, [BridgeTypesSubNetworkId, CommonPrimitivesAssetId32, AccountId32, XcmVersionedMultiLocation, u128]>;
      /**
       * [network_id, asset_id, sender, recepient, amount]
       **/
      Minted: AugmentedEvent<ApiType, [BridgeTypesSubNetworkId, CommonPrimitivesAssetId32, Option<XcmVersionedMultiLocation>, AccountId32, u128]>;
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
    preimage: {
      /**
       * A preimage has ben cleared.
       **/
      Cleared: AugmentedEvent<ApiType, [hash_: H256], { hash_: H256 }>;
      /**
       * A preimage has been noted.
       **/
      Noted: AugmentedEvent<ApiType, [hash_: H256], { hash_: H256 }>;
      /**
       * A preimage has been requested.
       **/
      Requested: AugmentedEvent<ApiType, [hash_: H256], { hash_: H256 }>;
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
       * [DEX Id, Fees Account Id, Fees Asset Id, Available Fees Amount, Incentive Asset Id, Exchange error]
       **/
      FeesExchangeFailed: AugmentedEvent<ApiType, [u32, AccountId32, CommonPrimitivesAssetId32, u128, CommonPrimitivesAssetId32, SpRuntimeDispatchError]>;
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
      CallUnavailable: AugmentedEvent<ApiType, [task: ITuple<[u32, u32]>, id: Option<U8aFixed>], { task: ITuple<[u32, u32]>, id: Option<U8aFixed> }>;
      /**
       * Canceled some task.
       **/
      Canceled: AugmentedEvent<ApiType, [when: u32, index: u32], { when: u32, index: u32 }>;
      /**
       * Dispatched some task.
       **/
      Dispatched: AugmentedEvent<ApiType, [task: ITuple<[u32, u32]>, id: Option<U8aFixed>, result: Result<Null, SpRuntimeDispatchError>], { task: ITuple<[u32, u32]>, id: Option<U8aFixed>, result: Result<Null, SpRuntimeDispatchError> }>;
      /**
       * The given task was unable to be renewed since the agenda is full at that block.
       **/
      PeriodicFailed: AugmentedEvent<ApiType, [task: ITuple<[u32, u32]>, id: Option<U8aFixed>], { task: ITuple<[u32, u32]>, id: Option<U8aFixed> }>;
      /**
       * The given task can never be executed since it is overweight.
       **/
      PermanentlyOverweight: AugmentedEvent<ApiType, [task: ITuple<[u32, u32]>, id: Option<U8aFixed>], { task: ITuple<[u32, u32]>, id: Option<U8aFixed> }>;
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
      Bonded: AugmentedEvent<ApiType, [stash: AccountId32, amount: u128], { stash: AccountId32, amount: u128 }>;
      /**
       * An account has stopped participating as either a validator or nominator.
       **/
      Chilled: AugmentedEvent<ApiType, [stash: AccountId32], { stash: AccountId32 }>;
      /**
       * The era payout has been set; the first balance is the validator-payout; the second is
       * the remainder from the maximum amount of reward.
       **/
      EraPaid: AugmentedEvent<ApiType, [eraIndex: u32, validatorPayout: u128], { eraIndex: u32, validatorPayout: u128 }>;
      /**
       * A new force era mode was set.
       **/
      ForceEra: AugmentedEvent<ApiType, [mode: PalletStakingForcing], { mode: PalletStakingForcing }>;
      /**
       * A nominator has been kicked from a validator.
       **/
      Kicked: AugmentedEvent<ApiType, [nominator: AccountId32, stash: AccountId32], { nominator: AccountId32, stash: AccountId32 }>;
      /**
       * An old slashing report from a prior era was discarded because it could
       * not be processed.
       **/
      OldSlashingReportDiscarded: AugmentedEvent<ApiType, [sessionIndex: u32], { sessionIndex: u32 }>;
      /**
       * The stakers' rewards are getting paid.
       **/
      PayoutStarted: AugmentedEvent<ApiType, [eraIndex: u32, validatorStash: AccountId32], { eraIndex: u32, validatorStash: AccountId32 }>;
      /**
       * The nominator has been rewarded by this amount.
       **/
      Rewarded: AugmentedEvent<ApiType, [stash: AccountId32, amount: u128], { stash: AccountId32, amount: u128 }>;
      /**
       * One staker (and potentially its nominators) has been slashed by the given amount.
       **/
      Slashed: AugmentedEvent<ApiType, [staker: AccountId32, amount: u128], { staker: AccountId32, amount: u128 }>;
      /**
       * A slash for the given validator, for the given percentage of their stake, at the given
       * era as been reported.
       **/
      SlashReported: AugmentedEvent<ApiType, [validator: AccountId32, fraction: Perbill, slashEra: u32], { validator: AccountId32, fraction: Perbill, slashEra: u32 }>;
      /**
       * A new set of stakers was elected.
       **/
      StakersElected: AugmentedEvent<ApiType, []>;
      /**
       * The election failed. No new era is planned.
       **/
      StakingElectionFailed: AugmentedEvent<ApiType, []>;
      /**
       * An account has unbonded this amount.
       **/
      Unbonded: AugmentedEvent<ApiType, [stash: AccountId32, amount: u128], { stash: AccountId32, amount: u128 }>;
      /**
       * A validator has set their preferences.
       **/
      ValidatorPrefsSet: AugmentedEvent<ApiType, [stash: AccountId32, prefs: PalletStakingValidatorPrefs], { stash: AccountId32, prefs: PalletStakingValidatorPrefs }>;
      /**
       * An account has called `withdraw_unbonded` and removed unbonding chunks worth `Balance`
       * from the unlocking queue.
       **/
      Withdrawn: AugmentedEvent<ApiType, [stash: AccountId32, amount: u128], { stash: AccountId32, amount: u128 }>;
    };
    substrateBridgeInboundChannel: {
    };
    substrateBridgeOutboundChannel: {
      MessageAccepted: AugmentedEvent<ApiType, [networkId: BridgeTypesSubNetworkId, batchNonce: u64, messageNonce: u64], { networkId: BridgeTypesSubNetworkId, batchNonce: u64, messageNonce: u64 }>;
    };
    substrateDispatch: {
      /**
       * We have failed to decode a Call from the message.
       **/
      MessageDecodeFailed: AugmentedEvent<ApiType, [BridgeTypesMessageId]>;
      /**
       * Message has been dispatched with given result.
       **/
      MessageDispatched: AugmentedEvent<ApiType, [BridgeTypesMessageId, Result<Null, SpRuntimeDispatchError>]>;
      /**
       * Message has been rejected
       **/
      MessageRejected: AugmentedEvent<ApiType, [BridgeTypesMessageId]>;
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
      ExtrinsicFailed: AugmentedEvent<ApiType, [dispatchError: SpRuntimeDispatchError, dispatchInfo: FrameSupportDispatchDispatchInfo], { dispatchError: SpRuntimeDispatchError, dispatchInfo: FrameSupportDispatchDispatchInfo }>;
      /**
       * An extrinsic completed successfully.
       **/
      ExtrinsicSuccess: AugmentedEvent<ApiType, [dispatchInfo: FrameSupportDispatchDispatchInfo], { dispatchInfo: FrameSupportDispatchDispatchInfo }>;
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
       * Some free balance was locked.
       **/
      Locked: AugmentedEvent<ApiType, [currencyId: CommonPrimitivesAssetId32, who: AccountId32, amount: u128], { currencyId: CommonPrimitivesAssetId32, who: AccountId32, amount: u128 }>;
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
       * Some locked balance was freed.
       **/
      Unlocked: AugmentedEvent<ApiType, [currencyId: CommonPrimitivesAssetId32, who: AccountId32, amount: u128], { currencyId: CommonPrimitivesAssetId32, who: AccountId32, amount: u128 }>;
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
    transactionPayment: {
      /**
       * A transaction fee `actual_fee`, of which `tip` was added to the minimum inclusion fee,
       * has been paid by `who`.
       **/
      TransactionFeePaid: AugmentedEvent<ApiType, [who: AccountId32, actualFee: u128, tip: u128], { who: AccountId32, actualFee: u128, tip: u128 }>;
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
       * Claimed crowdloan rewards
       **/
      CrowdloanClaimed: AugmentedEvent<ApiType, [AccountId32, CommonPrimitivesAssetId32, u128]>;
      /**
       * Saving reward for account has failed in a distribution series. [account]
       **/
      FailedToSaveCalculatedReward: AugmentedEvent<ApiType, [AccountId32]>;
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
       * Reference Asset has been changed for pool. [New Reference Asset Id]
       **/
      ReferenceAssetChanged: AugmentedEvent<ApiType, [CommonPrimitivesAssetId32]>;
      /**
       * Synthetic asset has been disabled. [Synthetic Asset Id]
       **/
      SyntheticAssetDisabled: AugmentedEvent<ApiType, [CommonPrimitivesAssetId32]>;
      /**
       * Synthetic asset has been enabled. [Synthetic Asset Id, Reference Symbol]
       **/
      SyntheticAssetEnabled: AugmentedEvent<ApiType, [CommonPrimitivesAssetId32, Bytes]>;
      /**
       * Synthetic asset fee has been changed. [Synthetic Asset Id, New Fee]
       **/
      SyntheticAssetFeeChanged: AugmentedEvent<ApiType, [CommonPrimitivesAssetId32, FixnumFixedPoint]>;
      /**
       * Synthetic asset has been removed. [Synthetic Asset Id, Reference Symbol]
       **/
      SyntheticAssetRemoved: AugmentedEvent<ApiType, [CommonPrimitivesAssetId32, Bytes]>;
      /**
       * Floor price of the synthetic base asset has been changed. [New Floor Price]
       **/
      SyntheticBaseAssetFloorPriceChanged: AugmentedEvent<ApiType, [u128]>;
    };
  } // AugmentedEvents
} // declare module
