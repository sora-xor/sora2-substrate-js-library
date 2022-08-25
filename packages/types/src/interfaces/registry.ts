// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { AssetsAssetRecord, AssetsAssetRecordArg, AssetsCall, AssetsError, AssetsEvent, BasicChannelInboundPalletCall, BasicChannelInboundPalletError, BasicChannelInboundPalletEvent, BasicChannelOutboundMessage, BasicChannelOutboundPalletError, BasicChannelOutboundPalletEvent, BeefyPrimitivesCryptoPublic, BeefyPrimitivesMmrBeefyNextAuthoritySet, BridgeTypesAssetKind, BridgeTypesAuxiliaryDigest, BridgeTypesAuxiliaryDigestItem, BridgeTypesChannelId, BridgeTypesDifficultyDifficultyConfig, BridgeTypesEthashproofDoubleNodeWithMerkleProof, BridgeTypesHeader, BridgeTypesHeaderHeaderId, BridgeTypesMessage, BridgeTypesMessageId, BridgeTypesNetworkParamsConsensus, BridgeTypesNetworkParamsNetworkConfig, BridgeTypesProof, CeresGovernancePlatformCall, CeresGovernancePlatformError, CeresGovernancePlatformEvent, CeresGovernancePlatformPollInfo, CeresGovernancePlatformVotingInfo, CeresLaunchpadCall, CeresLaunchpadContributionInfo, CeresLaunchpadContributorsVesting, CeresLaunchpadError, CeresLaunchpadEvent, CeresLaunchpadIloInfo, CeresLaunchpadTeamVesting, CeresLiquidityLockerCall, CeresLiquidityLockerError, CeresLiquidityLockerEvent, CeresLiquidityLockerLockInfo, CeresStakingCall, CeresStakingError, CeresStakingEvent, CeresStakingStakingInfo, CeresTokenLockerCall, CeresTokenLockerError, CeresTokenLockerEvent, CeresTokenLockerTokenLockInfo, CommonPrimitivesAssetId32, CommonPrimitivesAssetIdExtraAssetRecordArg, CommonPrimitivesDexInfo, CommonPrimitivesFilterMode, CommonPrimitivesLiquiditySourceId, CommonPrimitivesLiquiditySourceType, CommonPrimitivesPredefinedAssetId, CommonPrimitivesRewardReason, CommonPrimitivesTechAccountId, CommonPrimitivesTechAssetId, CommonPrimitivesTechPurpose, CommonPrimitivesTradingPairAssetId32, CommonPrimitivesTradingPairTechAssetId, CommonSwapAmount, DemeterFarmingPlatformCall, DemeterFarmingPlatformError, DemeterFarmingPlatformEvent, DemeterFarmingPlatformPoolData, DemeterFarmingPlatformTokenInfo, DemeterFarmingPlatformUserInfo, DexApiCall, DexManagerError, DispatchEvent, DispatchRawOrigin, Erc20AppCall, Erc20AppError, Erc20AppEvent, EthAppCall, EthAppError, EthAppEvent, EthBridgeBridgeStatus, EthBridgeCall, EthBridgeError, EthBridgeEvent, EthBridgeOffchainSignatureParams, EthBridgeRequestsAssetKind, EthBridgeRequestsIncomingChangePeersContract, EthBridgeRequestsIncomingIncomingAddToken, EthBridgeRequestsIncomingIncomingCancelOutgoingRequest, EthBridgeRequestsIncomingIncomingChangePeers, EthBridgeRequestsIncomingIncomingChangePeersCompat, EthBridgeRequestsIncomingIncomingMarkAsDoneRequest, EthBridgeRequestsIncomingIncomingMigrate, EthBridgeRequestsIncomingIncomingPrepareForMigration, EthBridgeRequestsIncomingIncomingTransfer, EthBridgeRequestsIncomingMetaRequestKind, EthBridgeRequestsIncomingRequest, EthBridgeRequestsIncomingRequestKind, EthBridgeRequestsIncomingTransactionRequestKind, EthBridgeRequestsLoadIncomingMetaRequest, EthBridgeRequestsLoadIncomingRequest, EthBridgeRequestsLoadIncomingTransactionRequest, EthBridgeRequestsOffchainRequest, EthBridgeRequestsOutgoingEthPeersSync, EthBridgeRequestsOutgoingOutgoingAddAsset, EthBridgeRequestsOutgoingOutgoingAddPeer, EthBridgeRequestsOutgoingOutgoingAddPeerCompat, EthBridgeRequestsOutgoingOutgoingAddToken, EthBridgeRequestsOutgoingOutgoingMigrate, EthBridgeRequestsOutgoingOutgoingPrepareForMigration, EthBridgeRequestsOutgoingOutgoingRemovePeer, EthBridgeRequestsOutgoingOutgoingRemovePeerCompat, EthBridgeRequestsOutgoingOutgoingTransfer, EthBridgeRequestsOutgoingRequest, EthBridgeRequestsRequestStatus, EthbloomBloom, EthereumLightClientCall, EthereumLightClientError, EthereumLightClientEvent, EthereumLightClientPruningRange, EthereumLightClientStoredHeader, FarmingError, FarmingPoolFarmer, FaucetCall, FaucetError, FaucetEvent, FinalityGrandpaEquivocationPrecommit, FinalityGrandpaEquivocationPrevote, FinalityGrandpaPrecommit, FinalityGrandpaPrevote, FixnumFixedPoint, FrameSupportDispatchRawOrigin, FrameSupportScheduleLookupError, FrameSupportScheduleMaybeHashed, FrameSupportTokensMiscBalanceStatus, FrameSupportWeightsDispatchClass, FrameSupportWeightsDispatchInfo, FrameSupportWeightsPays, FrameSupportWeightsPerDispatchClassU32, FrameSupportWeightsPerDispatchClassU64, FrameSupportWeightsPerDispatchClassWeightsPerClass, FrameSupportWeightsRuntimeDbWeight, FrameSupportWeightsWeightToFeeCoefficient, FrameSystemAccountInfo, FrameSystemCall, FrameSystemError, FrameSystemEvent, FrameSystemEventRecord, FrameSystemExtensionsCheckGenesis, FrameSystemExtensionsCheckNonce, FrameSystemExtensionsCheckSpecVersion, FrameSystemExtensionsCheckTxVersion, FrameSystemExtensionsCheckWeight, FrameSystemLastRuntimeUpgradeInfo, FrameSystemLimitsBlockLength, FrameSystemLimitsBlockWeights, FrameSystemLimitsWeightsPerClass, FrameSystemPhase, FramenodeRuntimeExtensionsChargeTransactionPayment, FramenodeRuntimeNposCompactSolution24, FramenodeRuntimeOpaqueSessionKeys, FramenodeRuntimeOriginCaller, FramenodeRuntimeRuntime, IncentivizedChannelInboundPalletCall, IncentivizedChannelInboundPalletError, IncentivizedChannelInboundPalletEvent, IncentivizedChannelOutboundMessage, IncentivizedChannelOutboundPalletError, IncentivizedChannelOutboundPalletEvent, IrohaMigrationCall, IrohaMigrationError, IrohaMigrationEvent, IrohaMigrationPendingMultisigAccount, LeafProviderEvent, LiquidityProxyCall, LiquidityProxyError, LiquidityProxyEvent, MigrationAppCall, MigrationAppError, MigrationAppEvent, MulticollateralBondingCurvePoolCall, MulticollateralBondingCurvePoolDistributionAccount, MulticollateralBondingCurvePoolDistributionAccountData, MulticollateralBondingCurvePoolDistributionAccounts, MulticollateralBondingCurvePoolError, MulticollateralBondingCurvePoolEvent, OrmlCurrenciesModuleCall, OrmlCurrenciesModuleError, OrmlTokensAccountData, OrmlTokensBalanceLock, OrmlTokensModuleError, OrmlTokensModuleEvent, OrmlTokensReserveData, PalletAuthorshipCall, PalletAuthorshipError, PalletAuthorshipUncleEntryItem, PalletBabeCall, PalletBabeError, PalletBagsListCall, PalletBagsListError, PalletBagsListEvent, PalletBagsListListBag, PalletBagsListListListError, PalletBagsListListNode, PalletBalancesAccountData, PalletBalancesBalanceLock, PalletBalancesCall, PalletBalancesError, PalletBalancesEvent, PalletBalancesReasons, PalletBalancesReleases, PalletBalancesReserveData, PalletCollectiveCall, PalletCollectiveError, PalletCollectiveEvent, PalletCollectiveRawOrigin, PalletCollectiveVotes, PalletDemocracyCall, PalletDemocracyConviction, PalletDemocracyDelegations, PalletDemocracyError, PalletDemocracyEvent, PalletDemocracyPreimageStatus, PalletDemocracyReferendumInfo, PalletDemocracyReferendumStatus, PalletDemocracyReleases, PalletDemocracyTally, PalletDemocracyVoteAccountVote, PalletDemocracyVotePriorLock, PalletDemocracyVoteThreshold, PalletDemocracyVoteVoting, PalletElectionProviderMultiPhaseCall, PalletElectionProviderMultiPhaseElectionCompute, PalletElectionProviderMultiPhaseError, PalletElectionProviderMultiPhaseEvent, PalletElectionProviderMultiPhasePhase, PalletElectionProviderMultiPhaseRawSolution, PalletElectionProviderMultiPhaseReadySolution, PalletElectionProviderMultiPhaseRoundSnapshot, PalletElectionProviderMultiPhaseSignedSignedSubmission, PalletElectionProviderMultiPhaseSolutionOrSnapshotSize, PalletElectionsPhragmenCall, PalletElectionsPhragmenError, PalletElectionsPhragmenEvent, PalletElectionsPhragmenRenouncing, PalletElectionsPhragmenSeatHolder, PalletElectionsPhragmenVoter, PalletGrandpaCall, PalletGrandpaError, PalletGrandpaEvent, PalletGrandpaStoredPendingChange, PalletGrandpaStoredState, PalletIdentityBitFlags, PalletIdentityCall, PalletIdentityError, PalletIdentityEvent, PalletIdentityIdentityField, PalletIdentityIdentityInfo, PalletIdentityJudgement, PalletIdentityRegistrarInfo, PalletIdentityRegistration, PalletImOnlineBoundedOpaqueNetworkState, PalletImOnlineCall, PalletImOnlineError, PalletImOnlineEvent, PalletImOnlineHeartbeat, PalletImOnlineSr25519AppSr25519Public, PalletImOnlineSr25519AppSr25519Signature, PalletMembershipCall, PalletMembershipError, PalletMembershipEvent, PalletMultisigBridgeTimepoint, PalletMultisigCall, PalletMultisigError, PalletMultisigEvent, PalletMultisigMultiChainHeight, PalletMultisigMultisig, PalletMultisigMultisigAccount, PalletMultisigTimepoint, PalletOffencesEvent, PalletSchedulerCall, PalletSchedulerError, PalletSchedulerEvent, PalletSchedulerScheduledV3, PalletSessionCall, PalletSessionError, PalletSessionEvent, PalletStakingActiveEraInfo, PalletStakingEraRewardPoints, PalletStakingExposure, PalletStakingForcing, PalletStakingIndividualExposure, PalletStakingNominations, PalletStakingPalletCall, PalletStakingPalletConfigOpPerbill, PalletStakingPalletConfigOpPercent, PalletStakingPalletConfigOpU128, PalletStakingPalletConfigOpU32, PalletStakingPalletError, PalletStakingPalletEvent, PalletStakingReleases, PalletStakingRewardDestination, PalletStakingSlashingSlashingSpans, PalletStakingSlashingSpanRecord, PalletStakingSoraDurationWrapper, PalletStakingStakingLedger, PalletStakingUnappliedSlash, PalletStakingUnlockChunk, PalletStakingValidatorPrefs, PalletSudoCall, PalletSudoError, PalletSudoEvent, PalletTimestampCall, PalletTransactionPaymentChargeTransactionPayment, PalletTransactionPaymentReleases, PalletUtilityCall, PalletUtilityError, PalletUtilityEvent, PermissionsCall, PermissionsError, PermissionsEvent, PermissionsScope, PoolXykCall, PoolXykError, PoolXykEvent, PriceToolsError, PriceToolsEvent, PriceToolsPriceInfo, PswapDistributionCall, PswapDistributionError, PswapDistributionEvent, ReferralsCall, ReferralsError, RewardsCall, RewardsError, RewardsEvent, RewardsRewardInfo, SpConsensusBabeAllowedSlots, SpConsensusBabeAppPublic, SpConsensusBabeBabeEpochConfiguration, SpConsensusBabeDigestsNextConfigDescriptor, SpConsensusBabeDigestsPreDigest, SpConsensusBabeDigestsPrimaryPreDigest, SpConsensusBabeDigestsSecondaryPlainPreDigest, SpConsensusBabeDigestsSecondaryVRFPreDigest, SpConsensusSlotsEquivocationProof, SpCoreCryptoKeyTypeId, SpCoreEcdsaPublic, SpCoreEcdsaSignature, SpCoreEd25519Public, SpCoreEd25519Signature, SpCoreOffchainOpaqueNetworkState, SpCoreSr25519Public, SpCoreSr25519Signature, SpCoreVoid, SpFinalityGrandpaAppPublic, SpFinalityGrandpaAppSignature, SpFinalityGrandpaEquivocation, SpFinalityGrandpaEquivocationProof, SpNposElectionsElectionScore, SpNposElectionsSupport, SpRuntimeArithmeticError, SpRuntimeBlakeTwo256, SpRuntimeDigest, SpRuntimeDigestDigestItem, SpRuntimeDispatchError, SpRuntimeHeader, SpRuntimeModuleError, SpRuntimeMultiSignature, SpRuntimeTokenError, SpRuntimeTransactionalError, SpSessionMembershipProof, SpStakingOffenceOffenceDetails, SpVersionRuntimeVersion, TechnicalCall, TechnicalError, TechnicalEvent, TradingPairCall, TradingPairError, TradingPairEvent, VestedRewardsCall, VestedRewardsCrowdloanReward, VestedRewardsError, VestedRewardsEvent, VestedRewardsMarketMakerInfo, VestedRewardsRewardInfo, XorFeeCall, XorFeeEvent, XstCall, XstError, XstEvent } from '@polkadot/types/lookup';

declare module '@polkadot/types/types/registry' {
  export interface InterfaceTypes {
    AssetsAssetRecord: AssetsAssetRecord;
    AssetsAssetRecordArg: AssetsAssetRecordArg;
    AssetsCall: AssetsCall;
    AssetsError: AssetsError;
    AssetsEvent: AssetsEvent;
    BasicChannelInboundPalletCall: BasicChannelInboundPalletCall;
    BasicChannelInboundPalletError: BasicChannelInboundPalletError;
    BasicChannelInboundPalletEvent: BasicChannelInboundPalletEvent;
    BasicChannelOutboundMessage: BasicChannelOutboundMessage;
    BasicChannelOutboundPalletError: BasicChannelOutboundPalletError;
    BasicChannelOutboundPalletEvent: BasicChannelOutboundPalletEvent;
    BeefyPrimitivesCryptoPublic: BeefyPrimitivesCryptoPublic;
    BeefyPrimitivesMmrBeefyNextAuthoritySet: BeefyPrimitivesMmrBeefyNextAuthoritySet;
    BridgeTypesAssetKind: BridgeTypesAssetKind;
    BridgeTypesAuxiliaryDigest: BridgeTypesAuxiliaryDigest;
    BridgeTypesAuxiliaryDigestItem: BridgeTypesAuxiliaryDigestItem;
    BridgeTypesChannelId: BridgeTypesChannelId;
    BridgeTypesDifficultyDifficultyConfig: BridgeTypesDifficultyDifficultyConfig;
    BridgeTypesEthashproofDoubleNodeWithMerkleProof: BridgeTypesEthashproofDoubleNodeWithMerkleProof;
    BridgeTypesHeader: BridgeTypesHeader;
    BridgeTypesHeaderHeaderId: BridgeTypesHeaderHeaderId;
    BridgeTypesMessage: BridgeTypesMessage;
    BridgeTypesMessageId: BridgeTypesMessageId;
    BridgeTypesNetworkParamsConsensus: BridgeTypesNetworkParamsConsensus;
    BridgeTypesNetworkParamsNetworkConfig: BridgeTypesNetworkParamsNetworkConfig;
    BridgeTypesProof: BridgeTypesProof;
    CeresGovernancePlatformCall: CeresGovernancePlatformCall;
    CeresGovernancePlatformError: CeresGovernancePlatformError;
    CeresGovernancePlatformEvent: CeresGovernancePlatformEvent;
    CeresGovernancePlatformPollInfo: CeresGovernancePlatformPollInfo;
    CeresGovernancePlatformVotingInfo: CeresGovernancePlatformVotingInfo;
    CeresLaunchpadCall: CeresLaunchpadCall;
    CeresLaunchpadContributionInfo: CeresLaunchpadContributionInfo;
    CeresLaunchpadContributorsVesting: CeresLaunchpadContributorsVesting;
    CeresLaunchpadError: CeresLaunchpadError;
    CeresLaunchpadEvent: CeresLaunchpadEvent;
    CeresLaunchpadIloInfo: CeresLaunchpadIloInfo;
    CeresLaunchpadTeamVesting: CeresLaunchpadTeamVesting;
    CeresLiquidityLockerCall: CeresLiquidityLockerCall;
    CeresLiquidityLockerError: CeresLiquidityLockerError;
    CeresLiquidityLockerEvent: CeresLiquidityLockerEvent;
    CeresLiquidityLockerLockInfo: CeresLiquidityLockerLockInfo;
    CeresStakingCall: CeresStakingCall;
    CeresStakingError: CeresStakingError;
    CeresStakingEvent: CeresStakingEvent;
    CeresStakingStakingInfo: CeresStakingStakingInfo;
    CeresTokenLockerCall: CeresTokenLockerCall;
    CeresTokenLockerError: CeresTokenLockerError;
    CeresTokenLockerEvent: CeresTokenLockerEvent;
    CeresTokenLockerTokenLockInfo: CeresTokenLockerTokenLockInfo;
    CommonPrimitivesAssetId32: CommonPrimitivesAssetId32;
    CommonPrimitivesAssetIdExtraAssetRecordArg: CommonPrimitivesAssetIdExtraAssetRecordArg;
    CommonPrimitivesDexInfo: CommonPrimitivesDexInfo;
    CommonPrimitivesFilterMode: CommonPrimitivesFilterMode;
    CommonPrimitivesLiquiditySourceId: CommonPrimitivesLiquiditySourceId;
    CommonPrimitivesLiquiditySourceType: CommonPrimitivesLiquiditySourceType;
    CommonPrimitivesPredefinedAssetId: CommonPrimitivesPredefinedAssetId;
    CommonPrimitivesRewardReason: CommonPrimitivesRewardReason;
    CommonPrimitivesTechAccountId: CommonPrimitivesTechAccountId;
    CommonPrimitivesTechAssetId: CommonPrimitivesTechAssetId;
    CommonPrimitivesTechPurpose: CommonPrimitivesTechPurpose;
    CommonPrimitivesTradingPairAssetId32: CommonPrimitivesTradingPairAssetId32;
    CommonPrimitivesTradingPairTechAssetId: CommonPrimitivesTradingPairTechAssetId;
    CommonSwapAmount: CommonSwapAmount;
    DemeterFarmingPlatformCall: DemeterFarmingPlatformCall;
    DemeterFarmingPlatformError: DemeterFarmingPlatformError;
    DemeterFarmingPlatformEvent: DemeterFarmingPlatformEvent;
    DemeterFarmingPlatformPoolData: DemeterFarmingPlatformPoolData;
    DemeterFarmingPlatformTokenInfo: DemeterFarmingPlatformTokenInfo;
    DemeterFarmingPlatformUserInfo: DemeterFarmingPlatformUserInfo;
    DexApiCall: DexApiCall;
    DexManagerError: DexManagerError;
    DispatchEvent: DispatchEvent;
    DispatchRawOrigin: DispatchRawOrigin;
    Erc20AppCall: Erc20AppCall;
    Erc20AppError: Erc20AppError;
    Erc20AppEvent: Erc20AppEvent;
    EthAppCall: EthAppCall;
    EthAppError: EthAppError;
    EthAppEvent: EthAppEvent;
    EthBridgeBridgeStatus: EthBridgeBridgeStatus;
    EthBridgeCall: EthBridgeCall;
    EthBridgeError: EthBridgeError;
    EthBridgeEvent: EthBridgeEvent;
    EthBridgeOffchainSignatureParams: EthBridgeOffchainSignatureParams;
    EthBridgeRequestsAssetKind: EthBridgeRequestsAssetKind;
    EthBridgeRequestsIncomingChangePeersContract: EthBridgeRequestsIncomingChangePeersContract;
    EthBridgeRequestsIncomingIncomingAddToken: EthBridgeRequestsIncomingIncomingAddToken;
    EthBridgeRequestsIncomingIncomingCancelOutgoingRequest: EthBridgeRequestsIncomingIncomingCancelOutgoingRequest;
    EthBridgeRequestsIncomingIncomingChangePeers: EthBridgeRequestsIncomingIncomingChangePeers;
    EthBridgeRequestsIncomingIncomingChangePeersCompat: EthBridgeRequestsIncomingIncomingChangePeersCompat;
    EthBridgeRequestsIncomingIncomingMarkAsDoneRequest: EthBridgeRequestsIncomingIncomingMarkAsDoneRequest;
    EthBridgeRequestsIncomingIncomingMigrate: EthBridgeRequestsIncomingIncomingMigrate;
    EthBridgeRequestsIncomingIncomingPrepareForMigration: EthBridgeRequestsIncomingIncomingPrepareForMigration;
    EthBridgeRequestsIncomingIncomingTransfer: EthBridgeRequestsIncomingIncomingTransfer;
    EthBridgeRequestsIncomingMetaRequestKind: EthBridgeRequestsIncomingMetaRequestKind;
    EthBridgeRequestsIncomingRequest: EthBridgeRequestsIncomingRequest;
    EthBridgeRequestsIncomingRequestKind: EthBridgeRequestsIncomingRequestKind;
    EthBridgeRequestsIncomingTransactionRequestKind: EthBridgeRequestsIncomingTransactionRequestKind;
    EthBridgeRequestsLoadIncomingMetaRequest: EthBridgeRequestsLoadIncomingMetaRequest;
    EthBridgeRequestsLoadIncomingRequest: EthBridgeRequestsLoadIncomingRequest;
    EthBridgeRequestsLoadIncomingTransactionRequest: EthBridgeRequestsLoadIncomingTransactionRequest;
    EthBridgeRequestsOffchainRequest: EthBridgeRequestsOffchainRequest;
    EthBridgeRequestsOutgoingEthPeersSync: EthBridgeRequestsOutgoingEthPeersSync;
    EthBridgeRequestsOutgoingOutgoingAddAsset: EthBridgeRequestsOutgoingOutgoingAddAsset;
    EthBridgeRequestsOutgoingOutgoingAddPeer: EthBridgeRequestsOutgoingOutgoingAddPeer;
    EthBridgeRequestsOutgoingOutgoingAddPeerCompat: EthBridgeRequestsOutgoingOutgoingAddPeerCompat;
    EthBridgeRequestsOutgoingOutgoingAddToken: EthBridgeRequestsOutgoingOutgoingAddToken;
    EthBridgeRequestsOutgoingOutgoingMigrate: EthBridgeRequestsOutgoingOutgoingMigrate;
    EthBridgeRequestsOutgoingOutgoingPrepareForMigration: EthBridgeRequestsOutgoingOutgoingPrepareForMigration;
    EthBridgeRequestsOutgoingOutgoingRemovePeer: EthBridgeRequestsOutgoingOutgoingRemovePeer;
    EthBridgeRequestsOutgoingOutgoingRemovePeerCompat: EthBridgeRequestsOutgoingOutgoingRemovePeerCompat;
    EthBridgeRequestsOutgoingOutgoingTransfer: EthBridgeRequestsOutgoingOutgoingTransfer;
    EthBridgeRequestsOutgoingRequest: EthBridgeRequestsOutgoingRequest;
    EthBridgeRequestsRequestStatus: EthBridgeRequestsRequestStatus;
    EthbloomBloom: EthbloomBloom;
    EthereumLightClientCall: EthereumLightClientCall;
    EthereumLightClientError: EthereumLightClientError;
    EthereumLightClientEvent: EthereumLightClientEvent;
    EthereumLightClientPruningRange: EthereumLightClientPruningRange;
    EthereumLightClientStoredHeader: EthereumLightClientStoredHeader;
    FarmingError: FarmingError;
    FarmingPoolFarmer: FarmingPoolFarmer;
    FaucetCall: FaucetCall;
    FaucetError: FaucetError;
    FaucetEvent: FaucetEvent;
    FinalityGrandpaEquivocationPrecommit: FinalityGrandpaEquivocationPrecommit;
    FinalityGrandpaEquivocationPrevote: FinalityGrandpaEquivocationPrevote;
    FinalityGrandpaPrecommit: FinalityGrandpaPrecommit;
    FinalityGrandpaPrevote: FinalityGrandpaPrevote;
    FixnumFixedPoint: FixnumFixedPoint;
    FrameSupportDispatchRawOrigin: FrameSupportDispatchRawOrigin;
    FrameSupportScheduleLookupError: FrameSupportScheduleLookupError;
    FrameSupportScheduleMaybeHashed: FrameSupportScheduleMaybeHashed;
    FrameSupportTokensMiscBalanceStatus: FrameSupportTokensMiscBalanceStatus;
    FrameSupportWeightsDispatchClass: FrameSupportWeightsDispatchClass;
    FrameSupportWeightsDispatchInfo: FrameSupportWeightsDispatchInfo;
    FrameSupportWeightsPays: FrameSupportWeightsPays;
    FrameSupportWeightsPerDispatchClassU32: FrameSupportWeightsPerDispatchClassU32;
    FrameSupportWeightsPerDispatchClassU64: FrameSupportWeightsPerDispatchClassU64;
    FrameSupportWeightsPerDispatchClassWeightsPerClass: FrameSupportWeightsPerDispatchClassWeightsPerClass;
    FrameSupportWeightsRuntimeDbWeight: FrameSupportWeightsRuntimeDbWeight;
    FrameSupportWeightsWeightToFeeCoefficient: FrameSupportWeightsWeightToFeeCoefficient;
    FrameSystemAccountInfo: FrameSystemAccountInfo;
    FrameSystemCall: FrameSystemCall;
    FrameSystemError: FrameSystemError;
    FrameSystemEvent: FrameSystemEvent;
    FrameSystemEventRecord: FrameSystemEventRecord;
    FrameSystemExtensionsCheckGenesis: FrameSystemExtensionsCheckGenesis;
    FrameSystemExtensionsCheckNonce: FrameSystemExtensionsCheckNonce;
    FrameSystemExtensionsCheckSpecVersion: FrameSystemExtensionsCheckSpecVersion;
    FrameSystemExtensionsCheckTxVersion: FrameSystemExtensionsCheckTxVersion;
    FrameSystemExtensionsCheckWeight: FrameSystemExtensionsCheckWeight;
    FrameSystemLastRuntimeUpgradeInfo: FrameSystemLastRuntimeUpgradeInfo;
    FrameSystemLimitsBlockLength: FrameSystemLimitsBlockLength;
    FrameSystemLimitsBlockWeights: FrameSystemLimitsBlockWeights;
    FrameSystemLimitsWeightsPerClass: FrameSystemLimitsWeightsPerClass;
    FrameSystemPhase: FrameSystemPhase;
    FramenodeRuntimeExtensionsChargeTransactionPayment: FramenodeRuntimeExtensionsChargeTransactionPayment;
    FramenodeRuntimeNposCompactSolution24: FramenodeRuntimeNposCompactSolution24;
    FramenodeRuntimeOpaqueSessionKeys: FramenodeRuntimeOpaqueSessionKeys;
    FramenodeRuntimeOriginCaller: FramenodeRuntimeOriginCaller;
    FramenodeRuntimeRuntime: FramenodeRuntimeRuntime;
    IncentivizedChannelInboundPalletCall: IncentivizedChannelInboundPalletCall;
    IncentivizedChannelInboundPalletError: IncentivizedChannelInboundPalletError;
    IncentivizedChannelInboundPalletEvent: IncentivizedChannelInboundPalletEvent;
    IncentivizedChannelOutboundMessage: IncentivizedChannelOutboundMessage;
    IncentivizedChannelOutboundPalletError: IncentivizedChannelOutboundPalletError;
    IncentivizedChannelOutboundPalletEvent: IncentivizedChannelOutboundPalletEvent;
    IrohaMigrationCall: IrohaMigrationCall;
    IrohaMigrationError: IrohaMigrationError;
    IrohaMigrationEvent: IrohaMigrationEvent;
    IrohaMigrationPendingMultisigAccount: IrohaMigrationPendingMultisigAccount;
    LeafProviderEvent: LeafProviderEvent;
    LiquidityProxyCall: LiquidityProxyCall;
    LiquidityProxyError: LiquidityProxyError;
    LiquidityProxyEvent: LiquidityProxyEvent;
    MigrationAppCall: MigrationAppCall;
    MigrationAppError: MigrationAppError;
    MigrationAppEvent: MigrationAppEvent;
    MulticollateralBondingCurvePoolCall: MulticollateralBondingCurvePoolCall;
    MulticollateralBondingCurvePoolDistributionAccount: MulticollateralBondingCurvePoolDistributionAccount;
    MulticollateralBondingCurvePoolDistributionAccountData: MulticollateralBondingCurvePoolDistributionAccountData;
    MulticollateralBondingCurvePoolDistributionAccounts: MulticollateralBondingCurvePoolDistributionAccounts;
    MulticollateralBondingCurvePoolError: MulticollateralBondingCurvePoolError;
    MulticollateralBondingCurvePoolEvent: MulticollateralBondingCurvePoolEvent;
    OrmlCurrenciesModuleCall: OrmlCurrenciesModuleCall;
    OrmlCurrenciesModuleError: OrmlCurrenciesModuleError;
    OrmlTokensAccountData: OrmlTokensAccountData;
    OrmlTokensBalanceLock: OrmlTokensBalanceLock;
    OrmlTokensModuleError: OrmlTokensModuleError;
    OrmlTokensModuleEvent: OrmlTokensModuleEvent;
    OrmlTokensReserveData: OrmlTokensReserveData;
    PalletAuthorshipCall: PalletAuthorshipCall;
    PalletAuthorshipError: PalletAuthorshipError;
    PalletAuthorshipUncleEntryItem: PalletAuthorshipUncleEntryItem;
    PalletBabeCall: PalletBabeCall;
    PalletBabeError: PalletBabeError;
    PalletBagsListCall: PalletBagsListCall;
    PalletBagsListError: PalletBagsListError;
    PalletBagsListEvent: PalletBagsListEvent;
    PalletBagsListListBag: PalletBagsListListBag;
    PalletBagsListListListError: PalletBagsListListListError;
    PalletBagsListListNode: PalletBagsListListNode;
    PalletBalancesAccountData: PalletBalancesAccountData;
    PalletBalancesBalanceLock: PalletBalancesBalanceLock;
    PalletBalancesCall: PalletBalancesCall;
    PalletBalancesError: PalletBalancesError;
    PalletBalancesEvent: PalletBalancesEvent;
    PalletBalancesReasons: PalletBalancesReasons;
    PalletBalancesReleases: PalletBalancesReleases;
    PalletBalancesReserveData: PalletBalancesReserveData;
    PalletCollectiveCall: PalletCollectiveCall;
    PalletCollectiveError: PalletCollectiveError;
    PalletCollectiveEvent: PalletCollectiveEvent;
    PalletCollectiveRawOrigin: PalletCollectiveRawOrigin;
    PalletCollectiveVotes: PalletCollectiveVotes;
    PalletDemocracyCall: PalletDemocracyCall;
    PalletDemocracyConviction: PalletDemocracyConviction;
    PalletDemocracyDelegations: PalletDemocracyDelegations;
    PalletDemocracyError: PalletDemocracyError;
    PalletDemocracyEvent: PalletDemocracyEvent;
    PalletDemocracyPreimageStatus: PalletDemocracyPreimageStatus;
    PalletDemocracyReferendumInfo: PalletDemocracyReferendumInfo;
    PalletDemocracyReferendumStatus: PalletDemocracyReferendumStatus;
    PalletDemocracyReleases: PalletDemocracyReleases;
    PalletDemocracyTally: PalletDemocracyTally;
    PalletDemocracyVoteAccountVote: PalletDemocracyVoteAccountVote;
    PalletDemocracyVotePriorLock: PalletDemocracyVotePriorLock;
    PalletDemocracyVoteThreshold: PalletDemocracyVoteThreshold;
    PalletDemocracyVoteVoting: PalletDemocracyVoteVoting;
    PalletElectionProviderMultiPhaseCall: PalletElectionProviderMultiPhaseCall;
    PalletElectionProviderMultiPhaseElectionCompute: PalletElectionProviderMultiPhaseElectionCompute;
    PalletElectionProviderMultiPhaseError: PalletElectionProviderMultiPhaseError;
    PalletElectionProviderMultiPhaseEvent: PalletElectionProviderMultiPhaseEvent;
    PalletElectionProviderMultiPhasePhase: PalletElectionProviderMultiPhasePhase;
    PalletElectionProviderMultiPhaseRawSolution: PalletElectionProviderMultiPhaseRawSolution;
    PalletElectionProviderMultiPhaseReadySolution: PalletElectionProviderMultiPhaseReadySolution;
    PalletElectionProviderMultiPhaseRoundSnapshot: PalletElectionProviderMultiPhaseRoundSnapshot;
    PalletElectionProviderMultiPhaseSignedSignedSubmission: PalletElectionProviderMultiPhaseSignedSignedSubmission;
    PalletElectionProviderMultiPhaseSolutionOrSnapshotSize: PalletElectionProviderMultiPhaseSolutionOrSnapshotSize;
    PalletElectionsPhragmenCall: PalletElectionsPhragmenCall;
    PalletElectionsPhragmenError: PalletElectionsPhragmenError;
    PalletElectionsPhragmenEvent: PalletElectionsPhragmenEvent;
    PalletElectionsPhragmenRenouncing: PalletElectionsPhragmenRenouncing;
    PalletElectionsPhragmenSeatHolder: PalletElectionsPhragmenSeatHolder;
    PalletElectionsPhragmenVoter: PalletElectionsPhragmenVoter;
    PalletGrandpaCall: PalletGrandpaCall;
    PalletGrandpaError: PalletGrandpaError;
    PalletGrandpaEvent: PalletGrandpaEvent;
    PalletGrandpaStoredPendingChange: PalletGrandpaStoredPendingChange;
    PalletGrandpaStoredState: PalletGrandpaStoredState;
    PalletIdentityBitFlags: PalletIdentityBitFlags;
    PalletIdentityCall: PalletIdentityCall;
    PalletIdentityError: PalletIdentityError;
    PalletIdentityEvent: PalletIdentityEvent;
    PalletIdentityIdentityField: PalletIdentityIdentityField;
    PalletIdentityIdentityInfo: PalletIdentityIdentityInfo;
    PalletIdentityJudgement: PalletIdentityJudgement;
    PalletIdentityRegistrarInfo: PalletIdentityRegistrarInfo;
    PalletIdentityRegistration: PalletIdentityRegistration;
    PalletImOnlineBoundedOpaqueNetworkState: PalletImOnlineBoundedOpaqueNetworkState;
    PalletImOnlineCall: PalletImOnlineCall;
    PalletImOnlineError: PalletImOnlineError;
    PalletImOnlineEvent: PalletImOnlineEvent;
    PalletImOnlineHeartbeat: PalletImOnlineHeartbeat;
    PalletImOnlineSr25519AppSr25519Public: PalletImOnlineSr25519AppSr25519Public;
    PalletImOnlineSr25519AppSr25519Signature: PalletImOnlineSr25519AppSr25519Signature;
    PalletMembershipCall: PalletMembershipCall;
    PalletMembershipError: PalletMembershipError;
    PalletMembershipEvent: PalletMembershipEvent;
    PalletMultisigBridgeTimepoint: PalletMultisigBridgeTimepoint;
    PalletMultisigCall: PalletMultisigCall;
    PalletMultisigError: PalletMultisigError;
    PalletMultisigEvent: PalletMultisigEvent;
    PalletMultisigMultiChainHeight: PalletMultisigMultiChainHeight;
    PalletMultisigMultisig: PalletMultisigMultisig;
    PalletMultisigMultisigAccount: PalletMultisigMultisigAccount;
    PalletMultisigTimepoint: PalletMultisigTimepoint;
    PalletOffencesEvent: PalletOffencesEvent;
    PalletSchedulerCall: PalletSchedulerCall;
    PalletSchedulerError: PalletSchedulerError;
    PalletSchedulerEvent: PalletSchedulerEvent;
    PalletSchedulerScheduledV3: PalletSchedulerScheduledV3;
    PalletSessionCall: PalletSessionCall;
    PalletSessionError: PalletSessionError;
    PalletSessionEvent: PalletSessionEvent;
    PalletStakingActiveEraInfo: PalletStakingActiveEraInfo;
    PalletStakingEraRewardPoints: PalletStakingEraRewardPoints;
    PalletStakingExposure: PalletStakingExposure;
    PalletStakingForcing: PalletStakingForcing;
    PalletStakingIndividualExposure: PalletStakingIndividualExposure;
    PalletStakingNominations: PalletStakingNominations;
    PalletStakingPalletCall: PalletStakingPalletCall;
    PalletStakingPalletConfigOpPerbill: PalletStakingPalletConfigOpPerbill;
    PalletStakingPalletConfigOpPercent: PalletStakingPalletConfigOpPercent;
    PalletStakingPalletConfigOpU128: PalletStakingPalletConfigOpU128;
    PalletStakingPalletConfigOpU32: PalletStakingPalletConfigOpU32;
    PalletStakingPalletError: PalletStakingPalletError;
    PalletStakingPalletEvent: PalletStakingPalletEvent;
    PalletStakingReleases: PalletStakingReleases;
    PalletStakingRewardDestination: PalletStakingRewardDestination;
    PalletStakingSlashingSlashingSpans: PalletStakingSlashingSlashingSpans;
    PalletStakingSlashingSpanRecord: PalletStakingSlashingSpanRecord;
    PalletStakingSoraDurationWrapper: PalletStakingSoraDurationWrapper;
    PalletStakingStakingLedger: PalletStakingStakingLedger;
    PalletStakingUnappliedSlash: PalletStakingUnappliedSlash;
    PalletStakingUnlockChunk: PalletStakingUnlockChunk;
    PalletStakingValidatorPrefs: PalletStakingValidatorPrefs;
    PalletSudoCall: PalletSudoCall;
    PalletSudoError: PalletSudoError;
    PalletSudoEvent: PalletSudoEvent;
    PalletTimestampCall: PalletTimestampCall;
    PalletTransactionPaymentChargeTransactionPayment: PalletTransactionPaymentChargeTransactionPayment;
    PalletTransactionPaymentReleases: PalletTransactionPaymentReleases;
    PalletUtilityCall: PalletUtilityCall;
    PalletUtilityError: PalletUtilityError;
    PalletUtilityEvent: PalletUtilityEvent;
    PermissionsCall: PermissionsCall;
    PermissionsError: PermissionsError;
    PermissionsEvent: PermissionsEvent;
    PermissionsScope: PermissionsScope;
    PoolXykCall: PoolXykCall;
    PoolXykError: PoolXykError;
    PoolXykEvent: PoolXykEvent;
    PriceToolsError: PriceToolsError;
    PriceToolsEvent: PriceToolsEvent;
    PriceToolsPriceInfo: PriceToolsPriceInfo;
    PswapDistributionCall: PswapDistributionCall;
    PswapDistributionError: PswapDistributionError;
    PswapDistributionEvent: PswapDistributionEvent;
    ReferralsCall: ReferralsCall;
    ReferralsError: ReferralsError;
    RewardsCall: RewardsCall;
    RewardsError: RewardsError;
    RewardsEvent: RewardsEvent;
    RewardsRewardInfo: RewardsRewardInfo;
    SpConsensusBabeAllowedSlots: SpConsensusBabeAllowedSlots;
    SpConsensusBabeAppPublic: SpConsensusBabeAppPublic;
    SpConsensusBabeBabeEpochConfiguration: SpConsensusBabeBabeEpochConfiguration;
    SpConsensusBabeDigestsNextConfigDescriptor: SpConsensusBabeDigestsNextConfigDescriptor;
    SpConsensusBabeDigestsPreDigest: SpConsensusBabeDigestsPreDigest;
    SpConsensusBabeDigestsPrimaryPreDigest: SpConsensusBabeDigestsPrimaryPreDigest;
    SpConsensusBabeDigestsSecondaryPlainPreDigest: SpConsensusBabeDigestsSecondaryPlainPreDigest;
    SpConsensusBabeDigestsSecondaryVRFPreDigest: SpConsensusBabeDigestsSecondaryVRFPreDigest;
    SpConsensusSlotsEquivocationProof: SpConsensusSlotsEquivocationProof;
    SpCoreCryptoKeyTypeId: SpCoreCryptoKeyTypeId;
    SpCoreEcdsaPublic: SpCoreEcdsaPublic;
    SpCoreEcdsaSignature: SpCoreEcdsaSignature;
    SpCoreEd25519Public: SpCoreEd25519Public;
    SpCoreEd25519Signature: SpCoreEd25519Signature;
    SpCoreOffchainOpaqueNetworkState: SpCoreOffchainOpaqueNetworkState;
    SpCoreSr25519Public: SpCoreSr25519Public;
    SpCoreSr25519Signature: SpCoreSr25519Signature;
    SpCoreVoid: SpCoreVoid;
    SpFinalityGrandpaAppPublic: SpFinalityGrandpaAppPublic;
    SpFinalityGrandpaAppSignature: SpFinalityGrandpaAppSignature;
    SpFinalityGrandpaEquivocation: SpFinalityGrandpaEquivocation;
    SpFinalityGrandpaEquivocationProof: SpFinalityGrandpaEquivocationProof;
    SpNposElectionsElectionScore: SpNposElectionsElectionScore;
    SpNposElectionsSupport: SpNposElectionsSupport;
    SpRuntimeArithmeticError: SpRuntimeArithmeticError;
    SpRuntimeBlakeTwo256: SpRuntimeBlakeTwo256;
    SpRuntimeDigest: SpRuntimeDigest;
    SpRuntimeDigestDigestItem: SpRuntimeDigestDigestItem;
    SpRuntimeDispatchError: SpRuntimeDispatchError;
    SpRuntimeHeader: SpRuntimeHeader;
    SpRuntimeModuleError: SpRuntimeModuleError;
    SpRuntimeMultiSignature: SpRuntimeMultiSignature;
    SpRuntimeTokenError: SpRuntimeTokenError;
    SpRuntimeTransactionalError: SpRuntimeTransactionalError;
    SpSessionMembershipProof: SpSessionMembershipProof;
    SpStakingOffenceOffenceDetails: SpStakingOffenceOffenceDetails;
    SpVersionRuntimeVersion: SpVersionRuntimeVersion;
    TechnicalCall: TechnicalCall;
    TechnicalError: TechnicalError;
    TechnicalEvent: TechnicalEvent;
    TradingPairCall: TradingPairCall;
    TradingPairError: TradingPairError;
    TradingPairEvent: TradingPairEvent;
    VestedRewardsCall: VestedRewardsCall;
    VestedRewardsCrowdloanReward: VestedRewardsCrowdloanReward;
    VestedRewardsError: VestedRewardsError;
    VestedRewardsEvent: VestedRewardsEvent;
    VestedRewardsMarketMakerInfo: VestedRewardsMarketMakerInfo;
    VestedRewardsRewardInfo: VestedRewardsRewardInfo;
    XorFeeCall: XorFeeCall;
    XorFeeEvent: XorFeeEvent;
    XstCall: XstCall;
    XstError: XstError;
    XstEvent: XstEvent;
  } // InterfaceTypes
} // declare module