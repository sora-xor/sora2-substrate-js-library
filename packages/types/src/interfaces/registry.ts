// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

// import type lookup before we augment - in some environments
// this is required to allow for ambient/previous definitions
import '@polkadot/types/types/registry';

import type { AssetsAssetRecord, AssetsAssetRecordArg, AssetsCall, AssetsError, AssetsEvent, BandBandRate, BandCall, BandError, BandEvent, BeefyLightClientCall, BeefyLightClientError, BeefyLightClientEvent, BeefyLightClientProvedSubstrateBridgeMessage, BitvecOrderMsb0, BridgeCommonBeefyTypesValidatorProof, BridgeCommonSimplifiedProofProof, BridgeInboundChannelCall, BridgeInboundChannelError, BridgeInboundChannelEvent, BridgeOutboundChannelError, BridgeOutboundChannelEvent, BridgeOutboundChannelMessage, BridgeTypesAdditionalEVMInboundData, BridgeTypesAssetKind, BridgeTypesAuxiliaryDigest, BridgeTypesAuxiliaryDigestItem, BridgeTypesCallOriginOutputSubNetworkId, BridgeTypesCallOriginOutputU256, BridgeTypesDifficultyClassicForkConfig, BridgeTypesDifficultyForkConfig, BridgeTypesEthashproofDoubleNodeWithMerkleProof, BridgeTypesEthashproofMixNonce, BridgeTypesGenericAccount, BridgeTypesGenericNetworkId, BridgeTypesHeader, BridgeTypesHeaderHeaderId, BridgeTypesLeafExtraData, BridgeTypesMessage, BridgeTypesMessageDirection, BridgeTypesMessageId, BridgeTypesMessageStatus, BridgeTypesNetworkConfig, BridgeTypesNetworkConfigConsensus, BridgeTypesParachainMessage, BridgeTypesProof, BridgeTypesSubNetworkId, CeresGovernancePlatformCall, CeresGovernancePlatformError, CeresGovernancePlatformEvent, CeresGovernancePlatformPollInfo, CeresGovernancePlatformStorageVersion, CeresGovernancePlatformVotingInfo, CeresLaunchpadCall, CeresLaunchpadContributionInfo, CeresLaunchpadContributorsVesting, CeresLaunchpadError, CeresLaunchpadEvent, CeresLaunchpadIloInfo, CeresLaunchpadTeamVesting, CeresLiquidityLockerCall, CeresLiquidityLockerError, CeresLiquidityLockerEvent, CeresLiquidityLockerLockInfo, CeresLiquidityLockerStorageVersion, CeresStakingCall, CeresStakingError, CeresStakingEvent, CeresStakingStakingInfo, CeresTokenLockerCall, CeresTokenLockerError, CeresTokenLockerEvent, CeresTokenLockerStorageVersion, CeresTokenLockerTokenLockInfo, CommonPrimitivesAssetId32, CommonPrimitivesAssetIdExtraAssetRecordArg, CommonPrimitivesDexInfo, CommonPrimitivesFilterMode, CommonPrimitivesLiquiditySourceId, CommonPrimitivesLiquiditySourceType, CommonPrimitivesOracle, CommonPrimitivesPredefinedAssetId, CommonPrimitivesPriceVariant, CommonPrimitivesRewardReason, CommonPrimitivesTechAccountId, CommonPrimitivesTechAssetId, CommonPrimitivesTechPurpose, CommonPrimitivesTradingPairAssetId32, CommonPrimitivesTradingPairTechAssetId, CommonSwapAmount, DemeterFarmingPlatformCall, DemeterFarmingPlatformError, DemeterFarmingPlatformEvent, DemeterFarmingPlatformPoolData, DemeterFarmingPlatformStorageVersion, DemeterFarmingPlatformTokenInfo, DemeterFarmingPlatformUserInfo, DexApiCall, DexManagerError, DispatchEvent, DispatchRawOriginSubNetworkId, DispatchRawOriginU256, Erc20AppCall, Erc20AppError, Erc20AppEvent, EthAppCall, EthAppError, EthAppEvent, EthBridgeBridgeSignatureVersion, EthBridgeBridgeStatus, EthBridgeCall, EthBridgeError, EthBridgeEvent, EthBridgeOffchainSignatureParams, EthBridgeRequestsAssetKind, EthBridgeRequestsIncomingChangePeersContract, EthBridgeRequestsIncomingIncomingAddToken, EthBridgeRequestsIncomingIncomingCancelOutgoingRequest, EthBridgeRequestsIncomingIncomingChangePeers, EthBridgeRequestsIncomingIncomingChangePeersCompat, EthBridgeRequestsIncomingIncomingMarkAsDoneRequest, EthBridgeRequestsIncomingIncomingMigrate, EthBridgeRequestsIncomingIncomingPrepareForMigration, EthBridgeRequestsIncomingIncomingTransfer, EthBridgeRequestsIncomingMetaRequestKind, EthBridgeRequestsIncomingRequest, EthBridgeRequestsIncomingRequestKind, EthBridgeRequestsIncomingTransactionRequestKind, EthBridgeRequestsLoadIncomingMetaRequest, EthBridgeRequestsLoadIncomingRequest, EthBridgeRequestsLoadIncomingTransactionRequest, EthBridgeRequestsOffchainRequest, EthBridgeRequestsOutgoingEthPeersSync, EthBridgeRequestsOutgoingOutgoingAddAsset, EthBridgeRequestsOutgoingOutgoingAddPeer, EthBridgeRequestsOutgoingOutgoingAddPeerCompat, EthBridgeRequestsOutgoingOutgoingAddToken, EthBridgeRequestsOutgoingOutgoingMigrate, EthBridgeRequestsOutgoingOutgoingPrepareForMigration, EthBridgeRequestsOutgoingOutgoingRemovePeer, EthBridgeRequestsOutgoingOutgoingRemovePeerCompat, EthBridgeRequestsOutgoingOutgoingTransfer, EthBridgeRequestsOutgoingRequest, EthBridgeRequestsRequestStatus, EthbloomBloom, EthereumLightClientCall, EthereumLightClientError, EthereumLightClientEvent, EthereumLightClientPruningRange, EthereumLightClientStoredHeader, EvmBridgeProxyBridgeRequest, EvmBridgeProxyCall, EvmBridgeProxyError, EvmBridgeProxyEvent, FarmingError, FarmingPoolFarmer, FaucetCall, FaucetError, FaucetEvent, FinalityGrandpaEquivocationPrecommit, FinalityGrandpaEquivocationPrevote, FinalityGrandpaPrecommit, FinalityGrandpaPrevote, FixnumFixedPoint, FrameSupportDispatchDispatchClass, FrameSupportDispatchDispatchInfo, FrameSupportDispatchPays, FrameSupportDispatchPerDispatchClassU32, FrameSupportDispatchPerDispatchClassWeight, FrameSupportDispatchPerDispatchClassWeightsPerClass, FrameSupportDispatchRawOrigin, FrameSupportPreimagesBounded, FrameSupportTokensMiscBalanceStatus, FrameSystemAccountInfo, FrameSystemCall, FrameSystemError, FrameSystemEvent, FrameSystemEventRecord, FrameSystemExtensionsCheckGenesis, FrameSystemExtensionsCheckNonce, FrameSystemExtensionsCheckSpecVersion, FrameSystemExtensionsCheckTxVersion, FrameSystemExtensionsCheckWeight, FrameSystemLastRuntimeUpgradeInfo, FrameSystemLimitsBlockLength, FrameSystemLimitsBlockWeights, FrameSystemLimitsWeightsPerClass, FrameSystemPhase, FramenodeRuntimeExtensionsChargeTransactionPayment, FramenodeRuntimeNposCompactSolution24, FramenodeRuntimeOpaqueSessionKeys, FramenodeRuntimeOriginCaller, FramenodeRuntimeRuntime, HermesGovernancePlatformCall, HermesGovernancePlatformError, HermesGovernancePlatformEvent, HermesGovernancePlatformHermesPollInfo, HermesGovernancePlatformHermesVotingInfo, HermesGovernancePlatformVotingOption, IrohaMigrationCall, IrohaMigrationError, IrohaMigrationEvent, IrohaMigrationPendingMultisigAccount, LeafProviderEvent, LiquidityProxyBatchReceiverInfo, LiquidityProxyCall, LiquidityProxyError, LiquidityProxyEvent, LiquidityProxySwapBatchInfo, MigrationAppCall, MigrationAppError, MigrationAppEvent, MulticollateralBondingCurvePoolCall, MulticollateralBondingCurvePoolDistributionAccount, MulticollateralBondingCurvePoolDistributionAccountData, MulticollateralBondingCurvePoolDistributionAccounts, MulticollateralBondingCurvePoolError, MulticollateralBondingCurvePoolEvent, OracleProxyCall, OracleProxyError, OracleProxyEvent, OrderBook, OrderBookCall, OrderBookError, OrderBookEvent, OrderBookLimitOrder, OrderBookOrderBookStatus, OrmlCurrenciesModuleError, OrmlTokensAccountData, OrmlTokensBalanceLock, OrmlTokensModuleError, OrmlTokensModuleEvent, OrmlTokensReserveData, PalletBabeCall, PalletBabeError, PalletBagsListCall, PalletBagsListError, PalletBagsListEvent, PalletBagsListListBag, PalletBagsListListListError, PalletBagsListListNode, PalletBalancesAccountData, PalletBalancesBalanceLock, PalletBalancesError, PalletBalancesEvent, PalletBalancesReasons, PalletBalancesReserveData, PalletCollectiveCall, PalletCollectiveError, PalletCollectiveEvent, PalletCollectiveRawOrigin, PalletCollectiveVotes, PalletDemocracyCall, PalletDemocracyConviction, PalletDemocracyDelegations, PalletDemocracyError, PalletDemocracyEvent, PalletDemocracyReferendumInfo, PalletDemocracyReferendumStatus, PalletDemocracyTally, PalletDemocracyVoteAccountVote, PalletDemocracyVotePriorLock, PalletDemocracyVoteThreshold, PalletDemocracyVoteVoting, PalletElectionProviderMultiPhaseCall, PalletElectionProviderMultiPhaseElectionCompute, PalletElectionProviderMultiPhaseError, PalletElectionProviderMultiPhaseEvent, PalletElectionProviderMultiPhasePhase, PalletElectionProviderMultiPhaseRawSolution, PalletElectionProviderMultiPhaseReadySolution, PalletElectionProviderMultiPhaseRoundSnapshot, PalletElectionProviderMultiPhaseSignedSignedSubmission, PalletElectionProviderMultiPhaseSolutionOrSnapshotSize, PalletElectionsPhragmenCall, PalletElectionsPhragmenError, PalletElectionsPhragmenEvent, PalletElectionsPhragmenRenouncing, PalletElectionsPhragmenSeatHolder, PalletElectionsPhragmenVoter, PalletGrandpaCall, PalletGrandpaError, PalletGrandpaEvent, PalletGrandpaStoredPendingChange, PalletGrandpaStoredState, PalletIdentityBitFlags, PalletIdentityCall, PalletIdentityError, PalletIdentityEvent, PalletIdentityIdentityField, PalletIdentityIdentityInfo, PalletIdentityJudgement, PalletIdentityRegistrarInfo, PalletIdentityRegistration, PalletImOnlineBoundedOpaqueNetworkState, PalletImOnlineCall, PalletImOnlineError, PalletImOnlineEvent, PalletImOnlineHeartbeat, PalletImOnlineSr25519AppSr25519Public, PalletImOnlineSr25519AppSr25519Signature, PalletMembershipCall, PalletMembershipError, PalletMembershipEvent, PalletMultisigBridgeTimepoint, PalletMultisigCall, PalletMultisigError, PalletMultisigEvent, PalletMultisigMultiChainHeight, PalletMultisigMultisig, PalletMultisigMultisigAccount, PalletMultisigTimepoint, PalletOffencesEvent, PalletPreimageCall, PalletPreimageError, PalletPreimageEvent, PalletPreimageRequestStatus, PalletSchedulerCall, PalletSchedulerError, PalletSchedulerEvent, PalletSchedulerScheduled, PalletSessionCall, PalletSessionError, PalletSessionEvent, PalletStakingActiveEraInfo, PalletStakingEraRewardPoints, PalletStakingExposure, PalletStakingForcing, PalletStakingIndividualExposure, PalletStakingNominations, PalletStakingPalletCall, PalletStakingPalletConfigOpPerbill, PalletStakingPalletConfigOpPercent, PalletStakingPalletConfigOpU128, PalletStakingPalletConfigOpU32, PalletStakingPalletError, PalletStakingPalletEvent, PalletStakingRewardDestination, PalletStakingSlashingSlashingSpans, PalletStakingSlashingSpanRecord, PalletStakingSoraDurationWrapper, PalletStakingStakingLedger, PalletStakingUnappliedSlash, PalletStakingUnlockChunk, PalletStakingValidatorPrefs, PalletSudoCall, PalletSudoError, PalletSudoEvent, PalletTimestampCall, PalletTransactionPaymentChargeTransactionPayment, PalletTransactionPaymentEvent, PalletTransactionPaymentReleases, PalletUtilityCall, PalletUtilityError, PalletUtilityEvent, PermissionsCall, PermissionsError, PermissionsEvent, PermissionsScope, PoolXykCall, PoolXykError, PoolXykEvent, PriceToolsAggregatedPriceInfo, PriceToolsError, PriceToolsEvent, PriceToolsPriceInfo, PswapDistributionCall, PswapDistributionError, PswapDistributionEvent, ReferralsCall, ReferralsError, RewardsCall, RewardsError, RewardsEvent, RewardsRewardInfo, SpArithmeticArithmeticError, SpBeefyCommitment, SpBeefyCryptoPublic, SpBeefyMmrBeefyAuthoritySet, SpBeefyMmrMmrLeaf, SpBeefyPayload, SpConsensusBabeAllowedSlots, SpConsensusBabeAppPublic, SpConsensusBabeBabeEpochConfiguration, SpConsensusBabeDigestsNextConfigDescriptor, SpConsensusBabeDigestsPreDigest, SpConsensusBabeDigestsPrimaryPreDigest, SpConsensusBabeDigestsSecondaryPlainPreDigest, SpConsensusBabeDigestsSecondaryVRFPreDigest, SpConsensusSlotsEquivocationProof, SpCoreCryptoKeyTypeId, SpCoreEcdsaPublic, SpCoreEcdsaSignature, SpCoreEd25519Public, SpCoreEd25519Signature, SpCoreOffchainOpaqueNetworkState, SpCoreSr25519Public, SpCoreSr25519Signature, SpCoreVoid, SpFinalityGrandpaAppPublic, SpFinalityGrandpaAppSignature, SpFinalityGrandpaEquivocation, SpFinalityGrandpaEquivocationProof, SpNposElectionsElectionScore, SpNposElectionsSupport, SpRuntimeBlakeTwo256, SpRuntimeDigest, SpRuntimeDigestDigestItem, SpRuntimeDispatchError, SpRuntimeHeader, SpRuntimeModuleError, SpRuntimeMultiSignature, SpRuntimeTokenError, SpRuntimeTransactionalError, SpSessionMembershipProof, SpStakingOffenceOffenceDetails, SpVersionRuntimeVersion, SpWeightsRuntimeDbWeight, SpWeightsWeightV2Weight, SubstrateBridgeAppCall, SubstrateBridgeAppError, SubstrateBridgeAppEvent, SubstrateBridgeChannelInboundPalletCall, SubstrateBridgeChannelInboundPalletError, SubstrateBridgeChannelInboundPalletEvent, SubstrateBridgeChannelOutboundPalletError, SubstrateBridgeChannelOutboundPalletEvent, TechnicalCall, TechnicalError, TechnicalEvent, TradingPairCall, TradingPairError, TradingPairEvent, VestedRewardsCall, VestedRewardsCrowdloanInfo, VestedRewardsCrowdloanUserInfo, VestedRewardsError, VestedRewardsEvent, VestedRewardsRewardInfo, XcmV2BodyId, XcmV2BodyPart, XcmV2Junction, XcmV2MultiLocation, XcmV2MultilocationJunctions, XcmV2NetworkId, XcmV3Junction, XcmV3JunctionBodyId, XcmV3JunctionBodyPart, XcmV3JunctionNetworkId, XcmV3Junctions, XcmV3MultiLocation, XcmV3MultiassetAssetId, XcmVersionedMultiLocation, XorFeeCall, XorFeeEvent, XstCall, XstError, XstEvent, XstSyntheticInfo } from '@polkadot/types/lookup';

declare module '@polkadot/types/types/registry' {
  interface InterfaceTypes {
    AssetsAssetRecord: AssetsAssetRecord;
    AssetsAssetRecordArg: AssetsAssetRecordArg;
    AssetsCall: AssetsCall;
    AssetsError: AssetsError;
    AssetsEvent: AssetsEvent;
    BandBandRate: BandBandRate;
    BandCall: BandCall;
    BandError: BandError;
    BandEvent: BandEvent;
    BeefyLightClientCall: BeefyLightClientCall;
    BeefyLightClientError: BeefyLightClientError;
    BeefyLightClientEvent: BeefyLightClientEvent;
    BeefyLightClientProvedSubstrateBridgeMessage: BeefyLightClientProvedSubstrateBridgeMessage;
    BitvecOrderMsb0: BitvecOrderMsb0;
    BridgeCommonBeefyTypesValidatorProof: BridgeCommonBeefyTypesValidatorProof;
    BridgeCommonSimplifiedProofProof: BridgeCommonSimplifiedProofProof;
    BridgeInboundChannelCall: BridgeInboundChannelCall;
    BridgeInboundChannelError: BridgeInboundChannelError;
    BridgeInboundChannelEvent: BridgeInboundChannelEvent;
    BridgeOutboundChannelError: BridgeOutboundChannelError;
    BridgeOutboundChannelEvent: BridgeOutboundChannelEvent;
    BridgeOutboundChannelMessage: BridgeOutboundChannelMessage;
    BridgeTypesAdditionalEVMInboundData: BridgeTypesAdditionalEVMInboundData;
    BridgeTypesAssetKind: BridgeTypesAssetKind;
    BridgeTypesAuxiliaryDigest: BridgeTypesAuxiliaryDigest;
    BridgeTypesAuxiliaryDigestItem: BridgeTypesAuxiliaryDigestItem;
    BridgeTypesCallOriginOutputSubNetworkId: BridgeTypesCallOriginOutputSubNetworkId;
    BridgeTypesCallOriginOutputU256: BridgeTypesCallOriginOutputU256;
    BridgeTypesDifficultyClassicForkConfig: BridgeTypesDifficultyClassicForkConfig;
    BridgeTypesDifficultyForkConfig: BridgeTypesDifficultyForkConfig;
    BridgeTypesEthashproofDoubleNodeWithMerkleProof: BridgeTypesEthashproofDoubleNodeWithMerkleProof;
    BridgeTypesEthashproofMixNonce: BridgeTypesEthashproofMixNonce;
    BridgeTypesGenericAccount: BridgeTypesGenericAccount;
    BridgeTypesGenericNetworkId: BridgeTypesGenericNetworkId;
    BridgeTypesHeader: BridgeTypesHeader;
    BridgeTypesHeaderHeaderId: BridgeTypesHeaderHeaderId;
    BridgeTypesLeafExtraData: BridgeTypesLeafExtraData;
    BridgeTypesMessage: BridgeTypesMessage;
    BridgeTypesMessageDirection: BridgeTypesMessageDirection;
    BridgeTypesMessageId: BridgeTypesMessageId;
    BridgeTypesMessageStatus: BridgeTypesMessageStatus;
    BridgeTypesNetworkConfig: BridgeTypesNetworkConfig;
    BridgeTypesNetworkConfigConsensus: BridgeTypesNetworkConfigConsensus;
    BridgeTypesParachainMessage: BridgeTypesParachainMessage;
    BridgeTypesProof: BridgeTypesProof;
    BridgeTypesSubNetworkId: BridgeTypesSubNetworkId;
    CeresGovernancePlatformCall: CeresGovernancePlatformCall;
    CeresGovernancePlatformError: CeresGovernancePlatformError;
    CeresGovernancePlatformEvent: CeresGovernancePlatformEvent;
    CeresGovernancePlatformPollInfo: CeresGovernancePlatformPollInfo;
    CeresGovernancePlatformStorageVersion: CeresGovernancePlatformStorageVersion;
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
    CeresLiquidityLockerStorageVersion: CeresLiquidityLockerStorageVersion;
    CeresStakingCall: CeresStakingCall;
    CeresStakingError: CeresStakingError;
    CeresStakingEvent: CeresStakingEvent;
    CeresStakingStakingInfo: CeresStakingStakingInfo;
    CeresTokenLockerCall: CeresTokenLockerCall;
    CeresTokenLockerError: CeresTokenLockerError;
    CeresTokenLockerEvent: CeresTokenLockerEvent;
    CeresTokenLockerStorageVersion: CeresTokenLockerStorageVersion;
    CeresTokenLockerTokenLockInfo: CeresTokenLockerTokenLockInfo;
    CommonPrimitivesAssetId32: CommonPrimitivesAssetId32;
    CommonPrimitivesAssetIdExtraAssetRecordArg: CommonPrimitivesAssetIdExtraAssetRecordArg;
    CommonPrimitivesDexInfo: CommonPrimitivesDexInfo;
    CommonPrimitivesFilterMode: CommonPrimitivesFilterMode;
    CommonPrimitivesLiquiditySourceId: CommonPrimitivesLiquiditySourceId;
    CommonPrimitivesLiquiditySourceType: CommonPrimitivesLiquiditySourceType;
    CommonPrimitivesOracle: CommonPrimitivesOracle;
    CommonPrimitivesPredefinedAssetId: CommonPrimitivesPredefinedAssetId;
    CommonPrimitivesPriceVariant: CommonPrimitivesPriceVariant;
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
    DemeterFarmingPlatformStorageVersion: DemeterFarmingPlatformStorageVersion;
    DemeterFarmingPlatformTokenInfo: DemeterFarmingPlatformTokenInfo;
    DemeterFarmingPlatformUserInfo: DemeterFarmingPlatformUserInfo;
    DexApiCall: DexApiCall;
    DexManagerError: DexManagerError;
    DispatchEvent: DispatchEvent;
    DispatchRawOriginSubNetworkId: DispatchRawOriginSubNetworkId;
    DispatchRawOriginU256: DispatchRawOriginU256;
    Erc20AppCall: Erc20AppCall;
    Erc20AppError: Erc20AppError;
    Erc20AppEvent: Erc20AppEvent;
    EthAppCall: EthAppCall;
    EthAppError: EthAppError;
    EthAppEvent: EthAppEvent;
    EthBridgeBridgeSignatureVersion: EthBridgeBridgeSignatureVersion;
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
    EvmBridgeProxyBridgeRequest: EvmBridgeProxyBridgeRequest;
    EvmBridgeProxyCall: EvmBridgeProxyCall;
    EvmBridgeProxyError: EvmBridgeProxyError;
    EvmBridgeProxyEvent: EvmBridgeProxyEvent;
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
    FrameSupportDispatchDispatchClass: FrameSupportDispatchDispatchClass;
    FrameSupportDispatchDispatchInfo: FrameSupportDispatchDispatchInfo;
    FrameSupportDispatchPays: FrameSupportDispatchPays;
    FrameSupportDispatchPerDispatchClassU32: FrameSupportDispatchPerDispatchClassU32;
    FrameSupportDispatchPerDispatchClassWeight: FrameSupportDispatchPerDispatchClassWeight;
    FrameSupportDispatchPerDispatchClassWeightsPerClass: FrameSupportDispatchPerDispatchClassWeightsPerClass;
    FrameSupportDispatchRawOrigin: FrameSupportDispatchRawOrigin;
    FrameSupportPreimagesBounded: FrameSupportPreimagesBounded;
    FrameSupportTokensMiscBalanceStatus: FrameSupportTokensMiscBalanceStatus;
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
    HermesGovernancePlatformCall: HermesGovernancePlatformCall;
    HermesGovernancePlatformError: HermesGovernancePlatformError;
    HermesGovernancePlatformEvent: HermesGovernancePlatformEvent;
    HermesGovernancePlatformHermesPollInfo: HermesGovernancePlatformHermesPollInfo;
    HermesGovernancePlatformHermesVotingInfo: HermesGovernancePlatformHermesVotingInfo;
    HermesGovernancePlatformVotingOption: HermesGovernancePlatformVotingOption;
    IrohaMigrationCall: IrohaMigrationCall;
    IrohaMigrationError: IrohaMigrationError;
    IrohaMigrationEvent: IrohaMigrationEvent;
    IrohaMigrationPendingMultisigAccount: IrohaMigrationPendingMultisigAccount;
    LeafProviderEvent: LeafProviderEvent;
    LiquidityProxyBatchReceiverInfo: LiquidityProxyBatchReceiverInfo;
    LiquidityProxyCall: LiquidityProxyCall;
    LiquidityProxyError: LiquidityProxyError;
    LiquidityProxyEvent: LiquidityProxyEvent;
    LiquidityProxySwapBatchInfo: LiquidityProxySwapBatchInfo;
    MigrationAppCall: MigrationAppCall;
    MigrationAppError: MigrationAppError;
    MigrationAppEvent: MigrationAppEvent;
    MulticollateralBondingCurvePoolCall: MulticollateralBondingCurvePoolCall;
    MulticollateralBondingCurvePoolDistributionAccount: MulticollateralBondingCurvePoolDistributionAccount;
    MulticollateralBondingCurvePoolDistributionAccountData: MulticollateralBondingCurvePoolDistributionAccountData;
    MulticollateralBondingCurvePoolDistributionAccounts: MulticollateralBondingCurvePoolDistributionAccounts;
    MulticollateralBondingCurvePoolError: MulticollateralBondingCurvePoolError;
    MulticollateralBondingCurvePoolEvent: MulticollateralBondingCurvePoolEvent;
    OracleProxyCall: OracleProxyCall;
    OracleProxyError: OracleProxyError;
    OracleProxyEvent: OracleProxyEvent;
    OrderBook: OrderBook;
    OrderBookCall: OrderBookCall;
    OrderBookError: OrderBookError;
    OrderBookEvent: OrderBookEvent;
    OrderBookLimitOrder: OrderBookLimitOrder;
    OrderBookOrderBookStatus: OrderBookOrderBookStatus;
    OrmlCurrenciesModuleError: OrmlCurrenciesModuleError;
    OrmlTokensAccountData: OrmlTokensAccountData;
    OrmlTokensBalanceLock: OrmlTokensBalanceLock;
    OrmlTokensModuleError: OrmlTokensModuleError;
    OrmlTokensModuleEvent: OrmlTokensModuleEvent;
    OrmlTokensReserveData: OrmlTokensReserveData;
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
    PalletBalancesError: PalletBalancesError;
    PalletBalancesEvent: PalletBalancesEvent;
    PalletBalancesReasons: PalletBalancesReasons;
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
    PalletDemocracyReferendumInfo: PalletDemocracyReferendumInfo;
    PalletDemocracyReferendumStatus: PalletDemocracyReferendumStatus;
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
    PalletPreimageCall: PalletPreimageCall;
    PalletPreimageError: PalletPreimageError;
    PalletPreimageEvent: PalletPreimageEvent;
    PalletPreimageRequestStatus: PalletPreimageRequestStatus;
    PalletSchedulerCall: PalletSchedulerCall;
    PalletSchedulerError: PalletSchedulerError;
    PalletSchedulerEvent: PalletSchedulerEvent;
    PalletSchedulerScheduled: PalletSchedulerScheduled;
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
    PalletTransactionPaymentEvent: PalletTransactionPaymentEvent;
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
    PriceToolsAggregatedPriceInfo: PriceToolsAggregatedPriceInfo;
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
    SpArithmeticArithmeticError: SpArithmeticArithmeticError;
    SpBeefyCommitment: SpBeefyCommitment;
    SpBeefyCryptoPublic: SpBeefyCryptoPublic;
    SpBeefyMmrBeefyAuthoritySet: SpBeefyMmrBeefyAuthoritySet;
    SpBeefyMmrMmrLeaf: SpBeefyMmrMmrLeaf;
    SpBeefyPayload: SpBeefyPayload;
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
    SpWeightsRuntimeDbWeight: SpWeightsRuntimeDbWeight;
    SpWeightsWeightV2Weight: SpWeightsWeightV2Weight;
    SubstrateBridgeAppCall: SubstrateBridgeAppCall;
    SubstrateBridgeAppError: SubstrateBridgeAppError;
    SubstrateBridgeAppEvent: SubstrateBridgeAppEvent;
    SubstrateBridgeChannelInboundPalletCall: SubstrateBridgeChannelInboundPalletCall;
    SubstrateBridgeChannelInboundPalletError: SubstrateBridgeChannelInboundPalletError;
    SubstrateBridgeChannelInboundPalletEvent: SubstrateBridgeChannelInboundPalletEvent;
    SubstrateBridgeChannelOutboundPalletError: SubstrateBridgeChannelOutboundPalletError;
    SubstrateBridgeChannelOutboundPalletEvent: SubstrateBridgeChannelOutboundPalletEvent;
    TechnicalCall: TechnicalCall;
    TechnicalError: TechnicalError;
    TechnicalEvent: TechnicalEvent;
    TradingPairCall: TradingPairCall;
    TradingPairError: TradingPairError;
    TradingPairEvent: TradingPairEvent;
    VestedRewardsCall: VestedRewardsCall;
    VestedRewardsCrowdloanInfo: VestedRewardsCrowdloanInfo;
    VestedRewardsCrowdloanUserInfo: VestedRewardsCrowdloanUserInfo;
    VestedRewardsError: VestedRewardsError;
    VestedRewardsEvent: VestedRewardsEvent;
    VestedRewardsRewardInfo: VestedRewardsRewardInfo;
    XcmV2BodyId: XcmV2BodyId;
    XcmV2BodyPart: XcmV2BodyPart;
    XcmV2Junction: XcmV2Junction;
    XcmV2MultiLocation: XcmV2MultiLocation;
    XcmV2MultilocationJunctions: XcmV2MultilocationJunctions;
    XcmV2NetworkId: XcmV2NetworkId;
    XcmV3Junction: XcmV3Junction;
    XcmV3JunctionBodyId: XcmV3JunctionBodyId;
    XcmV3JunctionBodyPart: XcmV3JunctionBodyPart;
    XcmV3JunctionNetworkId: XcmV3JunctionNetworkId;
    XcmV3Junctions: XcmV3Junctions;
    XcmV3MultiLocation: XcmV3MultiLocation;
    XcmV3MultiassetAssetId: XcmV3MultiassetAssetId;
    XcmVersionedMultiLocation: XcmVersionedMultiLocation;
    XorFeeCall: XorFeeCall;
    XorFeeEvent: XorFeeEvent;
    XstCall: XstCall;
    XstError: XstError;
    XstEvent: XstEvent;
    XstSyntheticInfo: XstSyntheticInfo;
  } // InterfaceTypes
} // declare module
