// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

/* eslint-disable sort-keys */

export default {
  /**
   * Lookup3: frame_system::AccountInfo<Index, pallet_balances::AccountData<Balance>>
   **/
  FrameSystemAccountInfo: {
    nonce: 'u32',
    consumers: 'u32',
    providers: 'u32',
    sufficients: 'u32',
    data: 'PalletBalancesAccountData'
  },
  /**
   * Lookup5: pallet_balances::AccountData<Balance>
   **/
  PalletBalancesAccountData: {
    free: 'u128',
    reserved: 'u128',
    miscFrozen: 'u128',
    feeFrozen: 'u128'
  },
  /**
   * Lookup7: frame_support::weights::PerDispatchClass<T>
   **/
  FrameSupportWeightsPerDispatchClassU64: {
    normal: 'u64',
    operational: 'u64',
    mandatory: 'u64'
  },
  /**
   * Lookup11: sp_runtime::generic::digest::Digest
   **/
  SpRuntimeDigest: {
    logs: 'Vec<SpRuntimeDigestDigestItem>'
  },
  /**
   * Lookup13: sp_runtime::generic::digest::DigestItem
   **/
  SpRuntimeDigestDigestItem: {
    _enum: {
      Other: 'Bytes',
      __Unused1: 'Null',
      __Unused2: 'Null',
      __Unused3: 'Null',
      Consensus: '([u8;4],Bytes)',
      Seal: '([u8;4],Bytes)',
      PreRuntime: '([u8;4],Bytes)',
      __Unused7: 'Null',
      RuntimeEnvironmentUpdated: 'Null'
    }
  },
  /**
   * Lookup16: frame_system::EventRecord<framenode_runtime::Event, primitive_types::H256>
   **/
  FrameSystemEventRecord: {
    phase: 'FrameSystemPhase',
    event: 'Event',
    topics: 'Vec<H256>'
  },
  /**
   * Lookup18: frame_system::pallet::Event<T>
   **/
  FrameSystemEvent: {
    _enum: {
      ExtrinsicSuccess: {
        dispatchInfo: 'FrameSupportWeightsDispatchInfo',
      },
      ExtrinsicFailed: {
        dispatchError: 'SpRuntimeDispatchError',
        dispatchInfo: 'FrameSupportWeightsDispatchInfo',
      },
      CodeUpdated: 'Null',
      NewAccount: {
        account: 'AccountId32',
      },
      KilledAccount: {
        account: 'AccountId32',
      },
      Remarked: {
        _alias: {
          hash_: 'hash',
        },
        sender: 'AccountId32',
        hash_: 'H256'
      }
    }
  },
  /**
   * Lookup19: frame_support::weights::DispatchInfo
   **/
  FrameSupportWeightsDispatchInfo: {
    weight: 'u64',
    class: 'FrameSupportWeightsDispatchClass',
    paysFee: 'FrameSupportWeightsPays'
  },
  /**
   * Lookup20: frame_support::weights::DispatchClass
   **/
  FrameSupportWeightsDispatchClass: {
    _enum: ['Normal', 'Operational', 'Mandatory']
  },
  /**
   * Lookup21: frame_support::weights::Pays
   **/
  FrameSupportWeightsPays: {
    _enum: ['Yes', 'No']
  },
  /**
   * Lookup22: sp_runtime::DispatchError
   **/
  SpRuntimeDispatchError: {
    _enum: {
      Other: 'Null',
      CannotLookup: 'Null',
      BadOrigin: 'Null',
      Module: 'SpRuntimeModuleError',
      ConsumerRemaining: 'Null',
      NoProviders: 'Null',
      TooManyConsumers: 'Null',
      Token: 'SpRuntimeTokenError',
      Arithmetic: 'SpRuntimeArithmeticError',
      Transactional: 'SpRuntimeTransactionalError'
    }
  },
  /**
   * Lookup23: sp_runtime::ModuleError
   **/
  SpRuntimeModuleError: {
    index: 'u8',
    error: '[u8;4]'
  },
  /**
   * Lookup24: sp_runtime::TokenError
   **/
  SpRuntimeTokenError: {
    _enum: ['NoFunds', 'WouldDie', 'BelowMinimum', 'CannotCreate', 'UnknownAsset', 'Frozen', 'Unsupported']
  },
  /**
   * Lookup25: sp_runtime::ArithmeticError
   **/
  SpRuntimeArithmeticError: {
    _enum: ['Underflow', 'Overflow', 'DivisionByZero']
  },
  /**
   * Lookup26: sp_runtime::TransactionalError
   **/
  SpRuntimeTransactionalError: {
    _enum: ['LimitReached', 'NoLayer']
  },
  /**
   * Lookup27: pallet_balances::pallet::Event<T, I>
   **/
  PalletBalancesEvent: {
    _enum: {
      Endowed: {
        account: 'AccountId32',
        freeBalance: 'u128',
      },
      DustLost: {
        account: 'AccountId32',
        amount: 'u128',
      },
      Transfer: {
        from: 'AccountId32',
        to: 'AccountId32',
        amount: 'u128',
      },
      BalanceSet: {
        who: 'AccountId32',
        free: 'u128',
        reserved: 'u128',
      },
      Reserved: {
        who: 'AccountId32',
        amount: 'u128',
      },
      Unreserved: {
        who: 'AccountId32',
        amount: 'u128',
      },
      ReserveRepatriated: {
        from: 'AccountId32',
        to: 'AccountId32',
        amount: 'u128',
        destinationStatus: 'FrameSupportTokensMiscBalanceStatus',
      },
      Deposit: {
        who: 'AccountId32',
        amount: 'u128',
      },
      Withdraw: {
        who: 'AccountId32',
        amount: 'u128',
      },
      Slashed: {
        who: 'AccountId32',
        amount: 'u128'
      }
    }
  },
  /**
   * Lookup28: frame_support::traits::tokens::misc::BalanceStatus
   **/
  FrameSupportTokensMiscBalanceStatus: {
    _enum: ['Free', 'Reserved']
  },
  /**
   * Lookup29: pallet_sudo::pallet::Event<T>
   **/
  PalletSudoEvent: {
    _enum: {
      Sudid: {
        sudoResult: 'Result<Null, SpRuntimeDispatchError>',
      },
      KeyChanged: {
        oldSudoer: 'Option<AccountId32>',
      },
      SudoAsDone: {
        sudoResult: 'Result<Null, SpRuntimeDispatchError>'
      }
    }
  },
  /**
   * Lookup33: pallet_transaction_payment::pallet::Event<T>
   **/
  PalletTransactionPaymentEvent: {
    _enum: {
      TransactionFeePaid: {
        who: 'AccountId32',
        actualFee: 'u128',
        tip: 'u128'
      }
    }
  },
  /**
   * Lookup34: permissions::pallet::Event<T>
   **/
  PermissionsEvent: {
    _enum: {
      PermissionGranted: '(u32,AccountId32)',
      PermissionTransfered: '(u32,AccountId32)',
      PermissionCreated: '(u32,AccountId32)',
      PermissionAssigned: '(u32,AccountId32)'
    }
  },
  /**
   * Lookup35: rewards::pallet::Event<T>
   **/
  RewardsEvent: {
    _enum: {
      Claimed: 'AccountId32',
      MigrationCompleted: 'Null'
    }
  },
  /**
   * Lookup36: xor_fee::pallet::Event<T>
   **/
  XorFeeEvent: {
    _enum: {
      FeeWithdrawn: '(AccountId32,u128)',
      ReferrerRewarded: '(AccountId32,AccountId32,u128)',
      WeightToFeeMultiplierUpdated: 'u128'
    }
  },
  /**
   * Lookup38: pallet_multisig::pallet::Event<T>
   **/
  PalletMultisigEvent: {
    _enum: {
      MultisigAccountCreated: 'AccountId32',
      NewMultisig: '(AccountId32,AccountId32,[u8;32])',
      MultisigApproval: '(AccountId32,PalletMultisigBridgeTimepoint,AccountId32,[u8;32])',
      MultisigExecuted: '(AccountId32,PalletMultisigBridgeTimepoint,AccountId32,[u8;32],Option<SpRuntimeDispatchError>)',
      MultisigCancelled: '(AccountId32,PalletMultisigBridgeTimepoint,AccountId32,[u8;32])'
    }
  },
  /**
   * Lookup39: pallet_multisig::BridgeTimepoint<BlockNumber>
   **/
  PalletMultisigBridgeTimepoint: {
    height: 'PalletMultisigMultiChainHeight',
    index: 'u32'
  },
  /**
   * Lookup40: pallet_multisig::MultiChainHeight<BlockNumber>
   **/
  PalletMultisigMultiChainHeight: {
    _enum: {
      Thischain: 'u32',
      Sidechain: 'u64'
    }
  },
  /**
   * Lookup42: pallet_utility::pallet::Event
   **/
  PalletUtilityEvent: {
    _enum: {
      BatchInterrupted: {
        index: 'u32',
        error: 'SpRuntimeDispatchError',
      },
      BatchCompleted: 'Null',
      BatchCompletedWithErrors: 'Null',
      ItemCompleted: 'Null',
      ItemFailed: {
        error: 'SpRuntimeDispatchError',
      },
      DispatchedAs: {
        result: 'Result<Null, SpRuntimeDispatchError>'
      }
    }
  },
  /**
   * Lookup43: pallet_staking::pallet::pallet::Event<T>
   **/
  PalletStakingPalletEvent: {
    _enum: {
      EraPaid: '(u32,u128)',
      Rewarded: '(AccountId32,u128)',
      Slashed: '(AccountId32,u128)',
      OldSlashingReportDiscarded: 'u32',
      StakersElected: 'Null',
      Bonded: '(AccountId32,u128)',
      Unbonded: '(AccountId32,u128)',
      Withdrawn: '(AccountId32,u128)',
      Kicked: '(AccountId32,AccountId32)',
      StakingElectionFailed: 'Null',
      Chilled: 'AccountId32',
      PayoutStarted: '(u32,AccountId32)',
      ValidatorPrefsSet: '(AccountId32,PalletStakingValidatorPrefs)'
    }
  },
  /**
   * Lookup44: pallet_staking::ValidatorPrefs
   **/
  PalletStakingValidatorPrefs: {
    commission: 'Compact<Perbill>',
    blocked: 'bool'
  },
  /**
   * Lookup48: pallet_offences::pallet::Event
   **/
  PalletOffencesEvent: {
    _enum: {
      Offence: {
        kind: '[u8;16]',
        timeslot: 'Bytes'
      }
    }
  },
  /**
   * Lookup50: pallet_session::pallet::Event
   **/
  PalletSessionEvent: {
    _enum: {
      NewSession: {
        sessionIndex: 'u32'
      }
    }
  },
  /**
   * Lookup51: pallet_grandpa::pallet::Event
   **/
  PalletGrandpaEvent: {
    _enum: {
      NewAuthorities: {
        authoritySet: 'Vec<(SpFinalityGrandpaAppPublic,u64)>',
      },
      Paused: 'Null',
      Resumed: 'Null'
    }
  },
  /**
   * Lookup54: sp_finality_grandpa::app::Public
   **/
  SpFinalityGrandpaAppPublic: 'SpCoreEd25519Public',
  /**
   * Lookup55: sp_core::ed25519::Public
   **/
  SpCoreEd25519Public: '[u8;32]',
  /**
   * Lookup56: pallet_im_online::pallet::Event<T>
   **/
  PalletImOnlineEvent: {
    _enum: {
      HeartbeatReceived: {
        authorityId: 'PalletImOnlineSr25519AppSr25519Public',
      },
      AllGood: 'Null',
      SomeOffline: {
        offline: 'Vec<(AccountId32,PalletStakingExposure)>'
      }
    }
  },
  /**
   * Lookup57: pallet_im_online::sr25519::app_sr25519::Public
   **/
  PalletImOnlineSr25519AppSr25519Public: 'SpCoreSr25519Public',
  /**
   * Lookup58: sp_core::sr25519::Public
   **/
  SpCoreSr25519Public: '[u8;32]',
  /**
   * Lookup61: pallet_staking::Exposure<sp_core::crypto::AccountId32, Balance>
   **/
  PalletStakingExposure: {
    total: 'Compact<u128>',
    own: 'Compact<u128>',
    others: 'Vec<PalletStakingIndividualExposure>'
  },
  /**
   * Lookup64: pallet_staking::IndividualExposure<sp_core::crypto::AccountId32, Balance>
   **/
  PalletStakingIndividualExposure: {
    who: 'AccountId32',
    value: 'Compact<u128>'
  },
  /**
   * Lookup65: orml_tokens::module::Event<T>
   **/
  OrmlTokensModuleEvent: {
    _enum: {
      Endowed: {
        currencyId: 'CommonPrimitivesAssetId32',
        who: 'AccountId32',
        amount: 'u128',
      },
      DustLost: {
        currencyId: 'CommonPrimitivesAssetId32',
        who: 'AccountId32',
        amount: 'u128',
      },
      Transfer: {
        currencyId: 'CommonPrimitivesAssetId32',
        from: 'AccountId32',
        to: 'AccountId32',
        amount: 'u128',
      },
      Reserved: {
        currencyId: 'CommonPrimitivesAssetId32',
        who: 'AccountId32',
        amount: 'u128',
      },
      Unreserved: {
        currencyId: 'CommonPrimitivesAssetId32',
        who: 'AccountId32',
        amount: 'u128',
      },
      ReserveRepatriated: {
        currencyId: 'CommonPrimitivesAssetId32',
        from: 'AccountId32',
        to: 'AccountId32',
        amount: 'u128',
        status: 'FrameSupportTokensMiscBalanceStatus',
      },
      BalanceSet: {
        currencyId: 'CommonPrimitivesAssetId32',
        who: 'AccountId32',
        free: 'u128',
        reserved: 'u128',
      },
      TotalIssuanceSet: {
        currencyId: 'CommonPrimitivesAssetId32',
        amount: 'u128',
      },
      Withdrawn: {
        currencyId: 'CommonPrimitivesAssetId32',
        who: 'AccountId32',
        amount: 'u128',
      },
      Slashed: {
        currencyId: 'CommonPrimitivesAssetId32',
        who: 'AccountId32',
        freeAmount: 'u128',
        reservedAmount: 'u128',
      },
      Deposited: {
        currencyId: 'CommonPrimitivesAssetId32',
        who: 'AccountId32',
        amount: 'u128',
      },
      LockSet: {
        lockId: '[u8;8]',
        currencyId: 'CommonPrimitivesAssetId32',
        who: 'AccountId32',
        amount: 'u128',
      },
      LockRemoved: {
        lockId: '[u8;8]',
        currencyId: 'CommonPrimitivesAssetId32',
        who: 'AccountId32'
      }
    }
  },
  /**
   * Lookup66: common::primitives::AssetId32<common::primitives::PredefinedAssetId>
   **/
  CommonPrimitivesAssetId32: {
    code: '[u8;32]'
  },
  /**
   * Lookup67: common::primitives::PredefinedAssetId
   **/
  CommonPrimitivesPredefinedAssetId: {
    _enum: ['XOR', 'DOT', 'KSM', 'USDT', 'VAL', 'PSWAP', 'DAI', 'ETH', 'XSTUSD']
  },
  /**
   * Lookup69: trading_pair::pallet::Event<T>
   **/
  TradingPairEvent: {
    _enum: {
      TradingPairStored: '(u32,CommonPrimitivesTradingPairAssetId32)'
    }
  },
  /**
   * Lookup70: common::primitives::TradingPair<common::primitives::AssetId32<common::primitives::PredefinedAssetId>>
   **/
  CommonPrimitivesTradingPairAssetId32: {
    baseAssetId: 'CommonPrimitivesAssetId32',
    targetAssetId: 'CommonPrimitivesAssetId32'
  },
  /**
   * Lookup71: assets::pallet::Event<T>
   **/
  AssetsEvent: {
    _enum: {
      AssetRegistered: '(CommonPrimitivesAssetId32,AccountId32)',
      Transfer: '(AccountId32,AccountId32,CommonPrimitivesAssetId32,u128)',
      Mint: '(AccountId32,AccountId32,CommonPrimitivesAssetId32,u128)',
      Burn: '(AccountId32,CommonPrimitivesAssetId32,u128)',
      AssetSetNonMintable: 'CommonPrimitivesAssetId32'
    }
  },
  /**
   * Lookup72: multicollateral_bonding_curve_pool::pallet::Event<T>
   **/
  MulticollateralBondingCurvePoolEvent: {
    _enum: {
      PoolInitialized: '(u32,CommonPrimitivesAssetId32)',
      ReferenceAssetChanged: 'CommonPrimitivesAssetId32',
      OptionalRewardMultiplierUpdated: '(CommonPrimitivesAssetId32,Option<FixnumFixedPoint>)',
      PriceBiasChanged: 'u128',
      PriceChangeConfigChanged: '(u128,u128)'
    }
  },
  /**
   * Lookup74: fixnum::FixedPoint<I, P>
   **/
  FixnumFixedPoint: {
    inner: 'i128'
  },
  /**
   * Lookup76: technical::pallet::Event<T>
   **/
  TechnicalEvent: {
    _enum: {
      Minted: '(CommonPrimitivesTechAssetId,CommonPrimitivesTechAccountId,u128,u128)',
      Burned: '(CommonPrimitivesTechAssetId,CommonPrimitivesTechAccountId,u128,u128)',
      OutputTransferred: '(CommonPrimitivesTechAssetId,CommonPrimitivesTechAccountId,AccountId32,u128)',
      InputTransferred: '(CommonPrimitivesTechAssetId,AccountId32,CommonPrimitivesTechAccountId,u128)',
      SwapSuccess: 'AccountId32'
    }
  },
  /**
   * Lookup77: common::primitives::TechAssetId<common::primitives::PredefinedAssetId>
   **/
  CommonPrimitivesTechAssetId: {
    _enum: {
      Wrapped: 'CommonPrimitivesPredefinedAssetId',
      Escaped: '[u8;32]'
    }
  },
  /**
   * Lookup78: common::primitives::TechAccountId<sp_core::crypto::AccountId32, common::primitives::TechAssetId<common::primitives::PredefinedAssetId>, DEXId>
   **/
  CommonPrimitivesTechAccountId: {
    _enum: {
      Pure: '(u32,CommonPrimitivesTechPurpose)',
      Generic: '(Bytes,Bytes)',
      Wrapped: 'AccountId32',
      WrappedRepr: 'AccountId32',
      None: 'Null'
    }
  },
  /**
   * Lookup79: common::primitives::TechPurpose<common::primitives::TechAssetId<common::primitives::PredefinedAssetId>>
   **/
  CommonPrimitivesTechPurpose: {
    _enum: {
      FeeCollector: 'Null',
      FeeCollectorForPair: 'CommonPrimitivesTradingPairTechAssetId',
      LiquidityKeeper: 'CommonPrimitivesTradingPairTechAssetId',
      Identifier: 'Bytes'
    }
  },
  /**
   * Lookup80: common::primitives::TradingPair<common::primitives::TechAssetId<common::primitives::PredefinedAssetId>>
   **/
  CommonPrimitivesTradingPairTechAssetId: {
    baseAssetId: 'CommonPrimitivesTechAssetId',
    targetAssetId: 'CommonPrimitivesTechAssetId'
  },
  /**
   * Lookup81: pool_xyk::pallet::Event<T>
   **/
  PoolXykEvent: {
    _enum: {
      PoolIsInitialized: 'AccountId32'
    }
  },
  /**
   * Lookup82: liquidity_proxy::pallet::Event<T>
   **/
  LiquidityProxyEvent: {
    _enum: {
      Exchange: '(AccountId32,u32,CommonPrimitivesAssetId32,CommonPrimitivesAssetId32,u128,u128,u128,Vec<CommonPrimitivesLiquiditySourceId>)'
    }
  },
  /**
   * Lookup84: common::primitives::LiquiditySourceId<DEXId, common::primitives::LiquiditySourceType>
   **/
  CommonPrimitivesLiquiditySourceId: {
    dexId: 'u32',
    liquiditySourceIndex: 'CommonPrimitivesLiquiditySourceType'
  },
  /**
   * Lookup85: common::primitives::LiquiditySourceType
   **/
  CommonPrimitivesLiquiditySourceType: {
    _enum: ['XYKPool', 'BondingCurvePool', 'MulticollateralBondingCurvePool', 'MockPool', 'MockPool2', 'MockPool3', 'MockPool4', 'XSTPool']
  },
  /**
   * Lookup86: pallet_collective::pallet::Event<T, I>
   **/
  PalletCollectiveEvent: {
    _enum: {
      Proposed: {
        account: 'AccountId32',
        proposalIndex: 'u32',
        proposalHash: 'H256',
        threshold: 'u32',
      },
      Voted: {
        account: 'AccountId32',
        proposalHash: 'H256',
        voted: 'bool',
        yes: 'u32',
        no: 'u32',
      },
      Approved: {
        proposalHash: 'H256',
      },
      Disapproved: {
        proposalHash: 'H256',
      },
      Executed: {
        proposalHash: 'H256',
        result: 'Result<Null, SpRuntimeDispatchError>',
      },
      MemberExecuted: {
        proposalHash: 'H256',
        result: 'Result<Null, SpRuntimeDispatchError>',
      },
      Closed: {
        proposalHash: 'H256',
        yes: 'u32',
        no: 'u32'
      }
    }
  },
  /**
   * Lookup88: pallet_democracy::pallet::Event<T>
   **/
  PalletDemocracyEvent: {
    _enum: {
      Proposed: {
        proposalIndex: 'u32',
        deposit: 'u128',
      },
      Tabled: {
        proposalIndex: 'u32',
        deposit: 'u128',
        depositors: 'Vec<AccountId32>',
      },
      ExternalTabled: 'Null',
      Started: {
        refIndex: 'u32',
        threshold: 'PalletDemocracyVoteThreshold',
      },
      Passed: {
        refIndex: 'u32',
      },
      NotPassed: {
        refIndex: 'u32',
      },
      Cancelled: {
        refIndex: 'u32',
      },
      Executed: {
        refIndex: 'u32',
        result: 'Result<Null, SpRuntimeDispatchError>',
      },
      Delegated: {
        who: 'AccountId32',
        target: 'AccountId32',
      },
      Undelegated: {
        account: 'AccountId32',
      },
      Vetoed: {
        who: 'AccountId32',
        proposalHash: 'H256',
        until: 'u32',
      },
      PreimageNoted: {
        proposalHash: 'H256',
        who: 'AccountId32',
        deposit: 'u128',
      },
      PreimageUsed: {
        proposalHash: 'H256',
        provider: 'AccountId32',
        deposit: 'u128',
      },
      PreimageInvalid: {
        proposalHash: 'H256',
        refIndex: 'u32',
      },
      PreimageMissing: {
        proposalHash: 'H256',
        refIndex: 'u32',
      },
      PreimageReaped: {
        proposalHash: 'H256',
        provider: 'AccountId32',
        deposit: 'u128',
        reaper: 'AccountId32',
      },
      Blacklisted: {
        proposalHash: 'H256',
      },
      Voted: {
        voter: 'AccountId32',
        refIndex: 'u32',
        vote: 'PalletDemocracyVoteAccountVote',
      },
      Seconded: {
        seconder: 'AccountId32',
        propIndex: 'u32',
      },
      ProposalCanceled: {
        propIndex: 'u32'
      }
    }
  },
  /**
   * Lookup90: pallet_democracy::vote_threshold::VoteThreshold
   **/
  PalletDemocracyVoteThreshold: {
    _enum: ['SuperMajorityApprove', 'SuperMajorityAgainst', 'SimpleMajority']
  },
  /**
   * Lookup91: pallet_democracy::vote::AccountVote<Balance>
   **/
  PalletDemocracyVoteAccountVote: {
    _enum: {
      Standard: {
        vote: 'Vote',
        balance: 'u128',
      },
      Split: {
        aye: 'u128',
        nay: 'u128'
      }
    }
  },
  /**
   * Lookup93: eth_bridge::pallet::Event<T>
   **/
  EthBridgeEvent: {
    _enum: {
      RequestRegistered: 'H256',
      ApprovalsCollected: 'H256',
      RequestFinalizationFailed: 'H256',
      IncomingRequestFinalizationFailed: 'H256',
      IncomingRequestFinalized: 'H256',
      RequestAborted: 'H256',
      CancellationFailed: 'H256',
      RegisterRequestFailed: '(H256,SpRuntimeDispatchError)'
    }
  },
  /**
   * Lookup94: pswap_distribution::pallet::Event<T>
   **/
  PswapDistributionEvent: {
    _enum: {
      FeesExchanged: '(u32,AccountId32,CommonPrimitivesAssetId32,u128,CommonPrimitivesAssetId32,u128)',
      FeesExchangeFailed: '(u32,AccountId32,CommonPrimitivesAssetId32,u128,CommonPrimitivesAssetId32)',
      IncentiveDistributed: '(u32,AccountId32,CommonPrimitivesAssetId32,u128,u128)',
      IncentiveDistributionFailed: '(u32,AccountId32)',
      BurnRateChanged: 'FixnumFixedPoint',
      NothingToExchange: '(u32,AccountId32)',
      NothingToDistribute: '(u32,AccountId32)',
      IncentivesBurnedAfterExchange: '(u32,CommonPrimitivesAssetId32,u128,u128)'
    }
  },
  /**
   * Lookup96: pallet_multisig::Timepoint<BlockNumber>
   **/
  PalletMultisigTimepoint: {
    height: 'u32',
    index: 'u32'
  },
  /**
   * Lookup97: pallet_scheduler::pallet::Event<T>
   **/
  PalletSchedulerEvent: {
    _enum: {
      Scheduled: {
        when: 'u32',
        index: 'u32',
      },
      Canceled: {
        when: 'u32',
        index: 'u32',
      },
      Dispatched: {
        task: '(u32,u32)',
        id: 'Option<Bytes>',
        result: 'Result<Null, SpRuntimeDispatchError>',
      },
      CallLookupFailed: {
        task: '(u32,u32)',
        id: 'Option<Bytes>',
        error: 'FrameSupportScheduleLookupError'
      }
    }
  },
  /**
   * Lookup100: frame_support::traits::schedule::LookupError
   **/
  FrameSupportScheduleLookupError: {
    _enum: ['Unknown', 'BadFormat']
  },
  /**
   * Lookup101: iroha_migration::pallet::Event<T>
   **/
  IrohaMigrationEvent: {
    _enum: {
      Migrated: '(Text,AccountId32)'
    }
  },
  /**
   * Lookup103: pallet_membership::pallet::Event<T, I>
   **/
  PalletMembershipEvent: {
    _enum: ['MemberAdded', 'MemberRemoved', 'MembersSwapped', 'MembersReset', 'KeyChanged', 'Dummy']
  },
  /**
   * Lookup104: pallet_elections_phragmen::pallet::Event<T>
   **/
  PalletElectionsPhragmenEvent: {
    _enum: {
      NewTerm: {
        newMembers: 'Vec<(AccountId32,u128)>',
      },
      EmptyTerm: 'Null',
      ElectionError: 'Null',
      MemberKicked: {
        member: 'AccountId32',
      },
      Renounced: {
        candidate: 'AccountId32',
      },
      CandidateSlashed: {
        candidate: 'AccountId32',
        amount: 'u128',
      },
      SeatHolderSlashed: {
        seatHolder: 'AccountId32',
        amount: 'u128'
      }
    }
  },
  /**
   * Lookup107: vested_rewards::pallet::Event<T>
   **/
  VestedRewardsEvent: {
    _enum: {
      RewardsVested: 'u128',
      ActualDoesntMatchAvailable: 'CommonPrimitivesRewardReason',
      FailedToSaveCalculatedReward: 'AccountId32',
      AddingZeroMarketMakerReward: 'AccountId32',
      NoEligibleMarketMakers: 'Null'
    }
  },
  /**
   * Lookup108: common::primitives::RewardReason
   **/
  CommonPrimitivesRewardReason: {
    _enum: ['Unspecified', 'BuyOnBondingCurve', 'LiquidityProvisionFarming', 'MarketMakerVolume', 'Crowdloan']
  },
  /**
   * Lookup109: pallet_identity::pallet::Event<T>
   **/
  PalletIdentityEvent: {
    _enum: {
      IdentitySet: {
        who: 'AccountId32',
      },
      IdentityCleared: {
        who: 'AccountId32',
        deposit: 'u128',
      },
      IdentityKilled: {
        who: 'AccountId32',
        deposit: 'u128',
      },
      JudgementRequested: {
        who: 'AccountId32',
        registrarIndex: 'u32',
      },
      JudgementUnrequested: {
        who: 'AccountId32',
        registrarIndex: 'u32',
      },
      JudgementGiven: {
        target: 'AccountId32',
        registrarIndex: 'u32',
      },
      RegistrarAdded: {
        registrarIndex: 'u32',
      },
      SubIdentityAdded: {
        sub: 'AccountId32',
        main: 'AccountId32',
        deposit: 'u128',
      },
      SubIdentityRemoved: {
        sub: 'AccountId32',
        main: 'AccountId32',
        deposit: 'u128',
      },
      SubIdentityRevoked: {
        sub: 'AccountId32',
        main: 'AccountId32',
        deposit: 'u128'
      }
    }
  },
  /**
   * Lookup110: xst::pallet::Event<T>
   **/
  XstEvent: {
    _enum: {
      PoolInitialized: '(u32,CommonPrimitivesAssetId32)',
      ReferenceAssetChanged: 'CommonPrimitivesAssetId32'
    }
  },
  /**
   * Lookup111: price_tools::pallet::Event<T>
   **/
  PriceToolsEvent: 'Null',
  /**
   * Lookup112: ceres_staking::pallet::Event<T>
   **/
  CeresStakingEvent: {
    _enum: {
      Deposited: '(AccountId32,u128)',
      Withdrawn: '(AccountId32,u128,u128)',
      RewardsChanged: 'u128'
    }
  },
  /**
   * Lookup113: ceres_liquidity_locker::pallet::Event<T>
   **/
  CeresLiquidityLockerEvent: {
    _enum: {
      Locked: '(AccountId32,u128,u64)'
    }
  },
  /**
   * Lookup114: ceres_token_locker::pallet::Event<T>
   **/
  CeresTokenLockerEvent: {
    _enum: {
      Locked: '(AccountId32,u128,CommonPrimitivesAssetId32)',
      Withdrawn: '(AccountId32,u128,CommonPrimitivesAssetId32)',
      FeeChanged: '(AccountId32,u128)'
    }
  },
  /**
   * Lookup115: ceres_governance_platform::pallet::Event<T>
   **/
  CeresGovernancePlatformEvent: {
    _enum: {
      Voted: '(AccountId32,Bytes,u32,u128)',
      Created: '(AccountId32,u32,u64,u64)',
      Withdrawn: '(AccountId32,u128)'
    }
  },
  /**
   * Lookup116: ceres_launchpad::pallet::Event<T>
   **/
  CeresLaunchpadEvent: {
    _enum: {
      ILOCreated: '(AccountId32,CommonPrimitivesAssetId32)',
      Contributed: '(AccountId32,CommonPrimitivesAssetId32,u128)',
      EmergencyWithdrawn: '(AccountId32,CommonPrimitivesAssetId32,u128)',
      ILOFinished: '(AccountId32,CommonPrimitivesAssetId32)',
      ClaimedLP: '(AccountId32,CommonPrimitivesAssetId32)',
      Claimed: '(AccountId32,CommonPrimitivesAssetId32)',
      FeeChanged: 'u128',
      ClaimedPSWAP: 'Null',
      WhitelistedContributor: 'AccountId32',
      WhitelistedIloOrganizer: 'AccountId32',
      RemovedWhitelistedContributor: 'AccountId32',
      RemovedWhitelistedIloOrganizer: 'AccountId32'
    }
  },
  /**
   * Lookup117: demeter_farming_platform::pallet::Event<T>
   **/
  DemeterFarmingPlatformEvent: {
    _enum: {
      TokenRegistered: '(AccountId32,CommonPrimitivesAssetId32)',
      PoolAdded: '(AccountId32,CommonPrimitivesAssetId32,CommonPrimitivesAssetId32,bool)',
      RewardWithdrawn: '(AccountId32,u128,CommonPrimitivesAssetId32,CommonPrimitivesAssetId32,bool)',
      Withdrawn: '(AccountId32,u128,CommonPrimitivesAssetId32,CommonPrimitivesAssetId32,bool)',
      PoolRemoved: '(AccountId32,CommonPrimitivesAssetId32,CommonPrimitivesAssetId32,bool)',
      Deposited: '(AccountId32,CommonPrimitivesAssetId32,CommonPrimitivesAssetId32,bool,u128)',
      MultiplierChanged: '(AccountId32,CommonPrimitivesAssetId32,CommonPrimitivesAssetId32,bool,u32)',
      DepositFeeChanged: '(AccountId32,CommonPrimitivesAssetId32,CommonPrimitivesAssetId32,bool,u128)',
      TokenInfoChanged: '(AccountId32,CommonPrimitivesAssetId32)',
      TotalTokensChanged: '(AccountId32,CommonPrimitivesAssetId32,CommonPrimitivesAssetId32,bool,u128)',
      InfoChanged: '(AccountId32,CommonPrimitivesAssetId32,CommonPrimitivesAssetId32,bool,u128)'
    }
  },
  /**
   * Lookup118: pallet_bags_list::pallet::Event<T, I>
   **/
  PalletBagsListEvent: {
    _enum: {
      Rebagged: {
        who: 'AccountId32',
        from: 'u64',
        to: 'u64',
      },
      ScoreUpdated: {
        who: 'AccountId32',
        newScore: 'u64'
      }
    }
  },
  /**
   * Lookup119: pallet_election_provider_multi_phase::pallet::Event<T>
   **/
  PalletElectionProviderMultiPhaseEvent: {
    _enum: {
      SolutionStored: {
        electionCompute: 'PalletElectionProviderMultiPhaseElectionCompute',
        prevEjected: 'bool',
      },
      ElectionFinalized: {
        electionCompute: 'Option<PalletElectionProviderMultiPhaseElectionCompute>',
      },
      Rewarded: {
        account: 'AccountId32',
        value: 'u128',
      },
      Slashed: {
        account: 'AccountId32',
        value: 'u128',
      },
      SignedPhaseStarted: {
        round: 'u32',
      },
      UnsignedPhaseStarted: {
        round: 'u32'
      }
    }
  },
  /**
   * Lookup120: pallet_election_provider_multi_phase::ElectionCompute
   **/
  PalletElectionProviderMultiPhaseElectionCompute: {
    _enum: ['OnChain', 'Signed', 'Unsigned', 'Fallback', 'Emergency']
  },
  /**
   * Lookup122: faucet::pallet::Event<T>
   **/
  FaucetEvent: {
    _enum: {
      Transferred: '(AccountId32,u128)',
      LimitUpdated: 'u128'
    }
  },
  /**
   * Lookup123: ethereum_light_client::pallet::Event<T>
   **/
  EthereumLightClientEvent: {
    _enum: {
      Finalized: '(U256,BridgeTypesHeaderHeaderId)'
    }
  },
  /**
   * Lookup126: bridge_types::header::HeaderId
   **/
  BridgeTypesHeaderHeaderId: {
    _alias: {
      hash_: 'hash'
    },
    number: 'u64',
    hash_: 'H256'
  },
  /**
   * Lookup127: bridge_channel::inbound::pallet::Event<T>
   **/
  BridgeChannelInboundPalletEvent: 'Null',
  /**
   * Lookup128: bridge_channel::outbound::pallet::Event<T>
   **/
  BridgeChannelOutboundPalletEvent: {
    _enum: {
      MessageAccepted: '(U256,u64)'
    }
  },
  /**
   * Lookup129: dispatch::pallet::Event<T, I>
   **/
  DispatchEvent: {
    _enum: {
      MessageDispatched: '(BridgeTypesMessageId,Result<Null, SpRuntimeDispatchError>)',
      MessageRejected: 'BridgeTypesMessageId',
      MessageDecodeFailed: 'BridgeTypesMessageId'
    }
  },
  /**
   * Lookup130: bridge_types::types::MessageId
   **/
  BridgeTypesMessageId: {
    direction: 'BridgeTypesMessageDirection',
    nonce: 'u64'
  },
  /**
   * Lookup131: bridge_types::types::MessageDirection
   **/
  BridgeTypesMessageDirection: {
    _enum: ['Inbound', 'Outbound']
  },
  /**
   * Lookup132: leaf_provider::pallet::Event<T>
   **/
  LeafProviderEvent: 'Null',
  /**
   * Lookup133: eth_app::pallet::Event<T>
   **/
  EthAppEvent: {
    _enum: {
      Burned: '(U256,AccountId32,H160,u128)',
      Minted: '(U256,H160,AccountId32,u128)'
    }
  },
  /**
   * Lookup136: erc20_app::pallet::Event<T>
   **/
  Erc20AppEvent: {
    _enum: {
      Burned: '(U256,CommonPrimitivesAssetId32,AccountId32,H160,u128)',
      Minted: '(U256,CommonPrimitivesAssetId32,H160,AccountId32,u128)'
    }
  },
  /**
   * Lookup137: migration_app::pallet::Event<T>
   **/
  MigrationAppEvent: {
    _enum: {
      Erc20Migrated: '(U256,H160)',
      SidechainMigrated: '(U256,H160)',
      EthMigrated: '(U256,H160)'
    }
  },
  /**
   * Lookup138: evm_bridge_proxy::pallet::Event
   **/
  EvmBridgeProxyEvent: {
    _enum: {
      RequestStatusUpdate: '(H256,BridgeTypesMessageStatus)'
    }
  },
  /**
   * Lookup139: bridge_types::types::MessageStatus
   **/
  BridgeTypesMessageStatus: {
    _enum: ['InQueue', 'Committed', 'Done', 'Failed']
  },
  /**
   * Lookup140: frame_system::Phase
   **/
  FrameSystemPhase: {
    _enum: {
      ApplyExtrinsic: 'u32',
      Finalization: 'Null',
      Initialization: 'Null'
    }
  },
  /**
   * Lookup143: frame_system::LastRuntimeUpgradeInfo
   **/
  FrameSystemLastRuntimeUpgradeInfo: {
    specVersion: 'Compact<u32>',
    specName: 'Text'
  },
  /**
   * Lookup145: frame_system::pallet::Call<T>
   **/
  FrameSystemCall: {
    _enum: {
      fill_block: {
        ratio: 'Perbill',
      },
      remark: {
        remark: 'Bytes',
      },
      set_heap_pages: {
        pages: 'u64',
      },
      set_code: {
        code: 'Bytes',
      },
      set_code_without_checks: {
        code: 'Bytes',
      },
      set_storage: {
        items: 'Vec<(Bytes,Bytes)>',
      },
      kill_storage: {
        _alias: {
          keys_: 'keys',
        },
        keys_: 'Vec<Bytes>',
      },
      kill_prefix: {
        prefix: 'Bytes',
        subkeys: 'u32',
      },
      remark_with_event: {
        remark: 'Bytes'
      }
    }
  },
  /**
   * Lookup149: frame_system::limits::BlockWeights
   **/
  FrameSystemLimitsBlockWeights: {
    baseBlock: 'u64',
    maxBlock: 'u64',
    perClass: 'FrameSupportWeightsPerDispatchClassWeightsPerClass'
  },
  /**
   * Lookup150: frame_support::weights::PerDispatchClass<frame_system::limits::WeightsPerClass>
   **/
  FrameSupportWeightsPerDispatchClassWeightsPerClass: {
    normal: 'FrameSystemLimitsWeightsPerClass',
    operational: 'FrameSystemLimitsWeightsPerClass',
    mandatory: 'FrameSystemLimitsWeightsPerClass'
  },
  /**
   * Lookup151: frame_system::limits::WeightsPerClass
   **/
  FrameSystemLimitsWeightsPerClass: {
    baseExtrinsic: 'u64',
    maxExtrinsic: 'Option<u64>',
    maxTotal: 'Option<u64>',
    reserved: 'Option<u64>'
  },
  /**
   * Lookup153: frame_system::limits::BlockLength
   **/
  FrameSystemLimitsBlockLength: {
    max: 'FrameSupportWeightsPerDispatchClassU32'
  },
  /**
   * Lookup154: frame_support::weights::PerDispatchClass<T>
   **/
  FrameSupportWeightsPerDispatchClassU32: {
    normal: 'u32',
    operational: 'u32',
    mandatory: 'u32'
  },
  /**
   * Lookup155: frame_support::weights::RuntimeDbWeight
   **/
  FrameSupportWeightsRuntimeDbWeight: {
    read: 'u64',
    write: 'u64'
  },
  /**
   * Lookup156: sp_version::RuntimeVersion
   **/
  SpVersionRuntimeVersion: {
    specName: 'Text',
    implName: 'Text',
    authoringVersion: 'u32',
    specVersion: 'u32',
    implVersion: 'u32',
    apis: 'Vec<([u8;8],u32)>',
    transactionVersion: 'u32',
    stateVersion: 'u8'
  },
  /**
   * Lookup161: frame_system::pallet::Error<T>
   **/
  FrameSystemError: {
    _enum: ['InvalidSpecName', 'SpecVersionNeedsToIncrease', 'FailedToExtractRuntimeVersion', 'NonDefaultComposite', 'NonZeroRefCount', 'CallFiltered']
  },
  /**
   * Lookup164: sp_consensus_babe::app::Public
   **/
  SpConsensusBabeAppPublic: 'SpCoreSr25519Public',
  /**
   * Lookup167: sp_consensus_babe::digests::NextConfigDescriptor
   **/
  SpConsensusBabeDigestsNextConfigDescriptor: {
    _enum: {
      __Unused0: 'Null',
      V1: {
        c: '(u64,u64)',
        allowedSlots: 'SpConsensusBabeAllowedSlots'
      }
    }
  },
  /**
   * Lookup169: sp_consensus_babe::AllowedSlots
   **/
  SpConsensusBabeAllowedSlots: {
    _enum: ['PrimarySlots', 'PrimaryAndSecondaryPlainSlots', 'PrimaryAndSecondaryVRFSlots']
  },
  /**
   * Lookup173: sp_consensus_babe::digests::PreDigest
   **/
  SpConsensusBabeDigestsPreDigest: {
    _enum: {
      __Unused0: 'Null',
      Primary: 'SpConsensusBabeDigestsPrimaryPreDigest',
      SecondaryPlain: 'SpConsensusBabeDigestsSecondaryPlainPreDigest',
      SecondaryVRF: 'SpConsensusBabeDigestsSecondaryVRFPreDigest'
    }
  },
  /**
   * Lookup174: sp_consensus_babe::digests::PrimaryPreDigest
   **/
  SpConsensusBabeDigestsPrimaryPreDigest: {
    authorityIndex: 'u32',
    slot: 'u64',
    vrfOutput: '[u8;32]',
    vrfProof: '[u8;64]'
  },
  /**
   * Lookup176: sp_consensus_babe::digests::SecondaryPlainPreDigest
   **/
  SpConsensusBabeDigestsSecondaryPlainPreDigest: {
    authorityIndex: 'u32',
    slot: 'u64'
  },
  /**
   * Lookup177: sp_consensus_babe::digests::SecondaryVRFPreDigest
   **/
  SpConsensusBabeDigestsSecondaryVRFPreDigest: {
    authorityIndex: 'u32',
    slot: 'u64',
    vrfOutput: '[u8;32]',
    vrfProof: '[u8;64]'
  },
  /**
   * Lookup179: sp_consensus_babe::BabeEpochConfiguration
   **/
  SpConsensusBabeBabeEpochConfiguration: {
    c: '(u64,u64)',
    allowedSlots: 'SpConsensusBabeAllowedSlots'
  },
  /**
   * Lookup180: pallet_babe::pallet::Call<T>
   **/
  PalletBabeCall: {
    _enum: {
      report_equivocation: {
        equivocationProof: 'SpConsensusSlotsEquivocationProof',
        keyOwnerProof: 'SpSessionMembershipProof',
      },
      report_equivocation_unsigned: {
        equivocationProof: 'SpConsensusSlotsEquivocationProof',
        keyOwnerProof: 'SpSessionMembershipProof',
      },
      plan_config_change: {
        config: 'SpConsensusBabeDigestsNextConfigDescriptor'
      }
    }
  },
  /**
   * Lookup181: sp_consensus_slots::EquivocationProof<sp_runtime::generic::header::Header<Number, sp_runtime::traits::BlakeTwo256>, sp_consensus_babe::app::Public>
   **/
  SpConsensusSlotsEquivocationProof: {
    offender: 'SpConsensusBabeAppPublic',
    slot: 'u64',
    firstHeader: 'SpRuntimeHeader',
    secondHeader: 'SpRuntimeHeader'
  },
  /**
   * Lookup182: sp_runtime::generic::header::Header<Number, sp_runtime::traits::BlakeTwo256>
   **/
  SpRuntimeHeader: {
    parentHash: 'H256',
    number: 'Compact<u32>',
    stateRoot: 'H256',
    extrinsicsRoot: 'H256',
    digest: 'SpRuntimeDigest'
  },
  /**
   * Lookup183: sp_runtime::traits::BlakeTwo256
   **/
  SpRuntimeBlakeTwo256: 'Null',
  /**
   * Lookup184: sp_session::MembershipProof
   **/
  SpSessionMembershipProof: {
    session: 'u32',
    trieNodes: 'Vec<Bytes>',
    validatorCount: 'u32'
  },
  /**
   * Lookup185: pallet_babe::pallet::Error<T>
   **/
  PalletBabeError: {
    _enum: ['InvalidEquivocationProof', 'InvalidKeyOwnershipProof', 'DuplicateOffenceReport', 'InvalidConfiguration']
  },
  /**
   * Lookup186: pallet_timestamp::pallet::Call<T>
   **/
  PalletTimestampCall: {
    _enum: {
      set: {
        now: 'Compact<u64>'
      }
    }
  },
  /**
   * Lookup189: pallet_balances::BalanceLock<Balance>
   **/
  PalletBalancesBalanceLock: {
    id: '[u8;8]',
    amount: 'u128',
    reasons: 'PalletBalancesReasons'
  },
  /**
   * Lookup190: pallet_balances::Reasons
   **/
  PalletBalancesReasons: {
    _enum: ['Fee', 'Misc', 'All']
  },
  /**
   * Lookup193: pallet_balances::ReserveData<ReserveIdentifier, Balance>
   **/
  PalletBalancesReserveData: {
    id: 'Null',
    amount: 'u128'
  },
  /**
   * Lookup195: pallet_balances::Releases
   **/
  PalletBalancesReleases: {
    _enum: ['V1_0_0', 'V2_0_0']
  },
  /**
   * Lookup196: pallet_balances::pallet::Call<T, I>
   **/
  PalletBalancesCall: {
    _enum: {
      transfer: {
        dest: 'AccountId32',
        value: 'Compact<u128>',
      },
      set_balance: {
        who: 'AccountId32',
        newFree: 'Compact<u128>',
        newReserved: 'Compact<u128>',
      },
      force_transfer: {
        source: 'AccountId32',
        dest: 'AccountId32',
        value: 'Compact<u128>',
      },
      transfer_keep_alive: {
        dest: 'AccountId32',
        value: 'Compact<u128>',
      },
      transfer_all: {
        dest: 'AccountId32',
        keepAlive: 'bool',
      },
      force_unreserve: {
        who: 'AccountId32',
        amount: 'u128'
      }
    }
  },
  /**
   * Lookup197: pallet_balances::pallet::Error<T, I>
   **/
  PalletBalancesError: {
    _enum: ['VestingBalance', 'LiquidityRestrictions', 'InsufficientBalance', 'ExistentialDeposit', 'KeepAlive', 'ExistingVestingSchedule', 'DeadAccount', 'TooManyReserves']
  },
  /**
   * Lookup198: pallet_sudo::pallet::Call<T>
   **/
  PalletSudoCall: {
    _enum: {
      sudo: {
        call: 'Call',
      },
      sudo_unchecked_weight: {
        call: 'Call',
        weight: 'u64',
      },
      set_key: {
        _alias: {
          new_: 'new',
        },
        new_: 'AccountId32',
      },
      sudo_as: {
        who: 'AccountId32',
        call: 'Call'
      }
    }
  },
  /**
   * Lookup200: permissions::pallet::Call<T>
   **/
  PermissionsCall: 'Null',
  /**
   * Lookup201: referrals::pallet::Call<T>
   **/
  ReferralsCall: {
    _enum: {
      reserve: {
        balance: 'u128',
      },
      unreserve: {
        balance: 'u128',
      },
      set_referrer: {
        referrer: 'AccountId32'
      }
    }
  },
  /**
   * Lookup202: rewards::pallet::Call<T>
   **/
  RewardsCall: {
    _enum: {
      claim: {
        signature: 'Bytes',
      },
      add_umi_nft_receivers: {
        receivers: 'Vec<H160>'
      }
    }
  },
  /**
   * Lookup204: xor_fee::pallet::Call<T>
   **/
  XorFeeCall: {
    _enum: {
      update_multiplier: {
        newMultiplier: 'u128'
      }
    }
  },
  /**
   * Lookup205: pallet_multisig::pallet::Call<T>
   **/
  PalletMultisigCall: {
    _enum: {
      register_multisig: {
        signatories: 'Vec<AccountId32>',
      },
      remove_signatory: {
        signatory: 'AccountId32',
      },
      add_signatory: {
        newMember: 'AccountId32',
      },
      as_multi_threshold_1: {
        id: 'AccountId32',
        call: 'Call',
        timepoint: 'PalletMultisigBridgeTimepoint',
      },
      as_multi: {
        id: 'AccountId32',
        maybeTimepoint: 'Option<PalletMultisigBridgeTimepoint>',
        call: 'Bytes',
        storeCall: 'bool',
        maxWeight: 'u64',
      },
      approve_as_multi: {
        id: 'AccountId32',
        maybeTimepoint: 'Option<PalletMultisigBridgeTimepoint>',
        callHash: '[u8;32]',
        maxWeight: 'u64',
      },
      cancel_as_multi: {
        id: 'AccountId32',
        timepoint: 'PalletMultisigBridgeTimepoint',
        callHash: '[u8;32]'
      }
    }
  },
  /**
   * Lookup207: pallet_utility::pallet::Call<T>
   **/
  PalletUtilityCall: {
    _enum: {
      batch: {
        calls: 'Vec<Call>',
      },
      as_derivative: {
        index: 'u16',
        call: 'Call',
      },
      batch_all: {
        calls: 'Vec<Call>',
      },
      dispatch_as: {
        asOrigin: 'FramenodeRuntimeOriginCaller',
        call: 'Call',
      },
      force_batch: {
        calls: 'Vec<Call>'
      }
    }
  },
  /**
   * Lookup209: framenode_runtime::OriginCaller
   **/
  FramenodeRuntimeOriginCaller: {
    _enum: {
      system: 'FrameSupportDispatchRawOrigin',
      __Unused1: 'Null',
      __Unused2: 'Null',
      __Unused3: 'Null',
      Void: 'SpCoreVoid',
      __Unused5: 'Null',
      __Unused6: 'Null',
      __Unused7: 'Null',
      __Unused8: 'Null',
      __Unused9: 'Null',
      __Unused10: 'Null',
      __Unused11: 'Null',
      __Unused12: 'Null',
      __Unused13: 'Null',
      __Unused14: 'Null',
      __Unused15: 'Null',
      __Unused16: 'Null',
      __Unused17: 'Null',
      __Unused18: 'Null',
      __Unused19: 'Null',
      __Unused20: 'Null',
      __Unused21: 'Null',
      __Unused22: 'Null',
      __Unused23: 'Null',
      __Unused24: 'Null',
      __Unused25: 'Null',
      __Unused26: 'Null',
      Council: 'PalletCollectiveRawOrigin',
      TechnicalCommittee: 'PalletCollectiveRawOrigin',
      __Unused29: 'Null',
      __Unused30: 'Null',
      __Unused31: 'Null',
      __Unused32: 'Null',
      __Unused33: 'Null',
      __Unused34: 'Null',
      __Unused35: 'Null',
      __Unused36: 'Null',
      __Unused37: 'Null',
      __Unused38: 'Null',
      __Unused39: 'Null',
      __Unused40: 'Null',
      __Unused41: 'Null',
      __Unused42: 'Null',
      __Unused43: 'Null',
      __Unused44: 'Null',
      __Unused45: 'Null',
      __Unused46: 'Null',
      __Unused47: 'Null',
      __Unused48: 'Null',
      __Unused49: 'Null',
      __Unused50: 'Null',
      __Unused51: 'Null',
      __Unused52: 'Null',
      __Unused53: 'Null',
      __Unused54: 'Null',
      __Unused55: 'Null',
      __Unused56: 'Null',
      __Unused57: 'Null',
      __Unused58: 'Null',
      __Unused59: 'Null',
      __Unused60: 'Null',
      __Unused61: 'Null',
      __Unused62: 'Null',
      __Unused63: 'Null',
      __Unused64: 'Null',
      __Unused65: 'Null',
      __Unused66: 'Null',
      __Unused67: 'Null',
      __Unused68: 'Null',
      __Unused69: 'Null',
      __Unused70: 'Null',
      __Unused71: 'Null',
      __Unused72: 'Null',
      __Unused73: 'Null',
      __Unused74: 'Null',
      __Unused75: 'Null',
      __Unused76: 'Null',
      __Unused77: 'Null',
      __Unused78: 'Null',
      __Unused79: 'Null',
      __Unused80: 'Null',
      __Unused81: 'Null',
      __Unused82: 'Null',
      __Unused83: 'Null',
      __Unused84: 'Null',
      __Unused85: 'Null',
      __Unused86: 'Null',
      __Unused87: 'Null',
      __Unused88: 'Null',
      __Unused89: 'Null',
      __Unused90: 'Null',
      __Unused91: 'Null',
      __Unused92: 'Null',
      __Unused93: 'Null',
      __Unused94: 'Null',
      __Unused95: 'Null',
      __Unused96: 'Null',
      __Unused97: 'Null',
      Dispatch: 'DispatchRawOrigin'
    }
  },
  /**
   * Lookup210: frame_support::dispatch::RawOrigin<sp_core::crypto::AccountId32>
   **/
  FrameSupportDispatchRawOrigin: {
    _enum: {
      Root: 'Null',
      Signed: 'AccountId32',
      None: 'Null'
    }
  },
  /**
   * Lookup211: pallet_collective::RawOrigin<sp_core::crypto::AccountId32, I>
   **/
  PalletCollectiveRawOrigin: {
    _enum: {
      Members: '(u32,u32)',
      Member: 'AccountId32',
      _Phantom: 'Null'
    }
  },
  /**
   * Lookup213: dispatch::RawOrigin<primitive_types::U256, primitive_types::H160, bridge_types::types::CallOriginOutput<primitive_types::U256, primitive_types::H160, primitive_types::H256>>
   **/
  DispatchRawOrigin: {
    origin: 'BridgeTypesCallOriginOutput'
  },
  /**
   * Lookup214: bridge_types::types::CallOriginOutput<primitive_types::U256, primitive_types::H160, primitive_types::H256>
   **/
  BridgeTypesCallOriginOutput: {
    networkId: 'U256',
    messageId: 'H256',
    contract: 'H160',
    timestamp: 'u64'
  },
  /**
   * Lookup215: sp_core::Void
   **/
  SpCoreVoid: 'Null',
  /**
   * Lookup216: pallet_authorship::pallet::Call<T>
   **/
  PalletAuthorshipCall: {
    _enum: {
      set_uncles: {
        newUncles: 'Vec<SpRuntimeHeader>'
      }
    }
  },
  /**
   * Lookup218: pallet_staking::pallet::pallet::Call<T>
   **/
  PalletStakingPalletCall: {
    _enum: {
      bond: {
        controller: 'AccountId32',
        value: 'Compact<u128>',
        payee: 'PalletStakingRewardDestination',
      },
      bond_extra: {
        maxAdditional: 'Compact<u128>',
      },
      unbond: {
        value: 'Compact<u128>',
      },
      withdraw_unbonded: {
        numSlashingSpans: 'u32',
      },
      validate: {
        prefs: 'PalletStakingValidatorPrefs',
      },
      nominate: {
        targets: 'Vec<AccountId32>',
      },
      chill: 'Null',
      set_payee: {
        payee: 'PalletStakingRewardDestination',
      },
      set_controller: {
        controller: 'AccountId32',
      },
      set_validator_count: {
        _alias: {
          new_: 'new',
        },
        new_: 'Compact<u32>',
      },
      increase_validator_count: {
        additional: 'Compact<u32>',
      },
      scale_validator_count: {
        factor: 'Percent',
      },
      force_no_eras: 'Null',
      force_new_era: 'Null',
      set_invulnerables: {
        invulnerables: 'Vec<AccountId32>',
      },
      force_unstake: {
        stash: 'AccountId32',
        numSlashingSpans: 'u32',
      },
      force_new_era_always: 'Null',
      cancel_deferred_slash: {
        era: 'u32',
        slashIndices: 'Vec<u32>',
      },
      payout_stakers: {
        validatorStash: 'AccountId32',
        era: 'u32',
      },
      rebond: {
        value: 'Compact<u128>',
      },
      set_history_depth: {
        newHistoryDepth: 'Compact<u32>',
        eraItemsDeleted: 'Compact<u32>',
      },
      reap_stash: {
        stash: 'AccountId32',
        numSlashingSpans: 'u32',
      },
      kick: {
        who: 'Vec<AccountId32>',
      },
      set_staking_configs: {
        minNominatorBond: 'PalletStakingPalletConfigOpU128',
        minValidatorBond: 'PalletStakingPalletConfigOpU128',
        maxNominatorCount: 'PalletStakingPalletConfigOpU32',
        maxValidatorCount: 'PalletStakingPalletConfigOpU32',
        chillThreshold: 'PalletStakingPalletConfigOpPercent',
        minCommission: 'PalletStakingPalletConfigOpPerbill',
      },
      chill_other: {
        controller: 'AccountId32',
      },
      force_apply_min_commission: {
        validatorStash: 'AccountId32'
      }
    }
  },
  /**
   * Lookup219: pallet_staking::RewardDestination<sp_core::crypto::AccountId32>
   **/
  PalletStakingRewardDestination: {
    _enum: {
      Staked: 'Null',
      Stash: 'Null',
      Controller: 'Null',
      Account: 'AccountId32',
      None: 'Null'
    }
  },
  /**
   * Lookup222: pallet_staking::pallet::pallet::ConfigOp<T>
   **/
  PalletStakingPalletConfigOpU128: {
    _enum: {
      Noop: 'Null',
      Set: 'u128',
      Remove: 'Null'
    }
  },
  /**
   * Lookup223: pallet_staking::pallet::pallet::ConfigOp<T>
   **/
  PalletStakingPalletConfigOpU32: {
    _enum: {
      Noop: 'Null',
      Set: 'u32',
      Remove: 'Null'
    }
  },
  /**
   * Lookup224: pallet_staking::pallet::pallet::ConfigOp<sp_arithmetic::per_things::Percent>
   **/
  PalletStakingPalletConfigOpPercent: {
    _enum: {
      Noop: 'Null',
      Set: 'Percent',
      Remove: 'Null'
    }
  },
  /**
   * Lookup225: pallet_staking::pallet::pallet::ConfigOp<sp_arithmetic::per_things::Perbill>
   **/
  PalletStakingPalletConfigOpPerbill: {
    _enum: {
      Noop: 'Null',
      Set: 'Perbill',
      Remove: 'Null'
    }
  },
  /**
   * Lookup226: pallet_session::pallet::Call<T>
   **/
  PalletSessionCall: {
    _enum: {
      set_keys: {
        _alias: {
          keys_: 'keys',
        },
        keys_: 'FramenodeRuntimeOpaqueSessionKeys',
        proof: 'Bytes',
      },
      purge_keys: 'Null'
    }
  },
  /**
   * Lookup227: framenode_runtime::opaque::SessionKeys
   **/
  FramenodeRuntimeOpaqueSessionKeys: {
    babe: 'SpConsensusBabeAppPublic',
    grandpa: 'SpFinalityGrandpaAppPublic',
    imOnline: 'PalletImOnlineSr25519AppSr25519Public',
    beefy: 'BeefyPrimitivesCryptoPublic'
  },
  /**
   * Lookup228: beefy_primitives::crypto::Public
   **/
  BeefyPrimitivesCryptoPublic: 'SpCoreEcdsaPublic',
  /**
   * Lookup229: sp_core::ecdsa::Public
   **/
  SpCoreEcdsaPublic: '[u8;33]',
  /**
   * Lookup231: pallet_grandpa::pallet::Call<T>
   **/
  PalletGrandpaCall: {
    _enum: {
      report_equivocation: {
        equivocationProof: 'SpFinalityGrandpaEquivocationProof',
        keyOwnerProof: 'SpSessionMembershipProof',
      },
      report_equivocation_unsigned: {
        equivocationProof: 'SpFinalityGrandpaEquivocationProof',
        keyOwnerProof: 'SpSessionMembershipProof',
      },
      note_stalled: {
        delay: 'u32',
        bestFinalizedBlockNumber: 'u32'
      }
    }
  },
  /**
   * Lookup232: sp_finality_grandpa::EquivocationProof<primitive_types::H256, N>
   **/
  SpFinalityGrandpaEquivocationProof: {
    setId: 'u64',
    equivocation: 'SpFinalityGrandpaEquivocation'
  },
  /**
   * Lookup233: sp_finality_grandpa::Equivocation<primitive_types::H256, N>
   **/
  SpFinalityGrandpaEquivocation: {
    _enum: {
      Prevote: 'FinalityGrandpaEquivocationPrevote',
      Precommit: 'FinalityGrandpaEquivocationPrecommit'
    }
  },
  /**
   * Lookup234: finality_grandpa::Equivocation<sp_finality_grandpa::app::Public, finality_grandpa::Prevote<primitive_types::H256, N>, sp_finality_grandpa::app::Signature>
   **/
  FinalityGrandpaEquivocationPrevote: {
    roundNumber: 'u64',
    identity: 'SpFinalityGrandpaAppPublic',
    first: '(FinalityGrandpaPrevote,SpFinalityGrandpaAppSignature)',
    second: '(FinalityGrandpaPrevote,SpFinalityGrandpaAppSignature)'
  },
  /**
   * Lookup235: finality_grandpa::Prevote<primitive_types::H256, N>
   **/
  FinalityGrandpaPrevote: {
    targetHash: 'H256',
    targetNumber: 'u32'
  },
  /**
   * Lookup236: sp_finality_grandpa::app::Signature
   **/
  SpFinalityGrandpaAppSignature: 'SpCoreEd25519Signature',
  /**
   * Lookup237: sp_core::ed25519::Signature
   **/
  SpCoreEd25519Signature: '[u8;64]',
  /**
   * Lookup239: finality_grandpa::Equivocation<sp_finality_grandpa::app::Public, finality_grandpa::Precommit<primitive_types::H256, N>, sp_finality_grandpa::app::Signature>
   **/
  FinalityGrandpaEquivocationPrecommit: {
    roundNumber: 'u64',
    identity: 'SpFinalityGrandpaAppPublic',
    first: '(FinalityGrandpaPrecommit,SpFinalityGrandpaAppSignature)',
    second: '(FinalityGrandpaPrecommit,SpFinalityGrandpaAppSignature)'
  },
  /**
   * Lookup240: finality_grandpa::Precommit<primitive_types::H256, N>
   **/
  FinalityGrandpaPrecommit: {
    targetHash: 'H256',
    targetNumber: 'u32'
  },
  /**
   * Lookup242: pallet_im_online::pallet::Call<T>
   **/
  PalletImOnlineCall: {
    _enum: {
      heartbeat: {
        heartbeat: 'PalletImOnlineHeartbeat',
        signature: 'PalletImOnlineSr25519AppSr25519Signature'
      }
    }
  },
  /**
   * Lookup243: pallet_im_online::Heartbeat<BlockNumber>
   **/
  PalletImOnlineHeartbeat: {
    blockNumber: 'u32',
    networkState: 'SpCoreOffchainOpaqueNetworkState',
    sessionIndex: 'u32',
    authorityIndex: 'u32',
    validatorsLen: 'u32'
  },
  /**
   * Lookup244: sp_core::offchain::OpaqueNetworkState
   **/
  SpCoreOffchainOpaqueNetworkState: {
    peerId: 'Bytes',
    externalAddresses: 'Vec<Bytes>'
  },
  /**
   * Lookup248: pallet_im_online::sr25519::app_sr25519::Signature
   **/
  PalletImOnlineSr25519AppSr25519Signature: 'SpCoreSr25519Signature',
  /**
   * Lookup249: sp_core::sr25519::Signature
   **/
  SpCoreSr25519Signature: '[u8;64]',
  /**
   * Lookup250: orml_currencies::module::Call<T>
   **/
  OrmlCurrenciesModuleCall: {
    _enum: {
      transfer: {
        dest: 'AccountId32',
        currencyId: 'CommonPrimitivesAssetId32',
        amount: 'Compact<u128>',
      },
      transfer_native_currency: {
        dest: 'AccountId32',
        amount: 'Compact<u128>',
      },
      update_balance: {
        who: 'AccountId32',
        currencyId: 'CommonPrimitivesAssetId32',
        amount: 'i128'
      }
    }
  },
  /**
   * Lookup251: trading_pair::pallet::Call<T>
   **/
  TradingPairCall: {
    _enum: {
      register: {
        dexId: 'u32',
        baseAssetId: 'CommonPrimitivesAssetId32',
        targetAssetId: 'CommonPrimitivesAssetId32'
      }
    }
  },
  /**
   * Lookup252: assets::pallet::Call<T>
   **/
  AssetsCall: {
    _enum: {
      register: {
        symbol: 'Bytes',
        name: 'Bytes',
        initialSupply: 'u128',
        isMintable: 'bool',
        isIndivisible: 'bool',
        optContentSrc: 'Option<Bytes>',
        optDesc: 'Option<Bytes>',
      },
      transfer: {
        assetId: 'CommonPrimitivesAssetId32',
        to: 'AccountId32',
        amount: 'u128',
      },
      mint: {
        assetId: 'CommonPrimitivesAssetId32',
        to: 'AccountId32',
        amount: 'u128',
      },
      burn: {
        assetId: 'CommonPrimitivesAssetId32',
        amount: 'u128',
      },
      set_non_mintable: {
        assetId: 'CommonPrimitivesAssetId32'
      }
    }
  },
  /**
   * Lookup259: multicollateral_bonding_curve_pool::pallet::Call<T>
   **/
  MulticollateralBondingCurvePoolCall: {
    _enum: {
      initialize_pool: {
        collateralAssetId: 'CommonPrimitivesAssetId32',
      },
      set_reference_asset: {
        referenceAssetId: 'CommonPrimitivesAssetId32',
      },
      set_optional_reward_multiplier: {
        collateralAssetId: 'CommonPrimitivesAssetId32',
        multiplier: 'Option<FixnumFixedPoint>',
      },
      set_price_bias: {
        priceBias: 'u128',
      },
      set_price_change_config: {
        priceChangeRate: 'u128',
        priceChangeStep: 'u128'
      }
    }
  },
  /**
   * Lookup260: technical::pallet::Call<T>
   **/
  TechnicalCall: 'Null',
  /**
   * Lookup261: pool_xyk::pallet::Call<T>
   **/
  PoolXykCall: {
    _enum: {
      deposit_liquidity: {
        dexId: 'u32',
        inputAssetA: 'CommonPrimitivesAssetId32',
        inputAssetB: 'CommonPrimitivesAssetId32',
        inputADesired: 'u128',
        inputBDesired: 'u128',
        inputAMin: 'u128',
        inputBMin: 'u128',
      },
      withdraw_liquidity: {
        dexId: 'u32',
        outputAssetA: 'CommonPrimitivesAssetId32',
        outputAssetB: 'CommonPrimitivesAssetId32',
        markerAssetDesired: 'u128',
        outputAMin: 'u128',
        outputBMin: 'u128',
      },
      initialize_pool: {
        dexId: 'u32',
        assetA: 'CommonPrimitivesAssetId32',
        assetB: 'CommonPrimitivesAssetId32'
      }
    }
  },
  /**
   * Lookup262: liquidity_proxy::pallet::Call<T>
   **/
  LiquidityProxyCall: {
    _enum: {
      swap: {
        dexId: 'u32',
        inputAssetId: 'CommonPrimitivesAssetId32',
        outputAssetId: 'CommonPrimitivesAssetId32',
        swapAmount: 'CommonSwapAmount',
        selectedSourceTypes: 'Vec<CommonPrimitivesLiquiditySourceType>',
        filterMode: 'CommonPrimitivesFilterMode',
      },
      swap_transfer: {
        receiver: 'AccountId32',
        dexId: 'u32',
        inputAssetId: 'CommonPrimitivesAssetId32',
        outputAssetId: 'CommonPrimitivesAssetId32',
        swapAmount: 'CommonSwapAmount',
        selectedSourceTypes: 'Vec<CommonPrimitivesLiquiditySourceType>',
        filterMode: 'CommonPrimitivesFilterMode'
      }
    }
  },
  /**
   * Lookup263: common::swap_amount::SwapAmount<AmountType>
   **/
  CommonSwapAmount: {
    _enum: {
      WithDesiredInput: {
        desiredAmountIn: 'u128',
        minAmountOut: 'u128',
      },
      WithDesiredOutput: {
        desiredAmountOut: 'u128',
        maxAmountIn: 'u128'
      }
    }
  },
  /**
   * Lookup265: common::primitives::FilterMode
   **/
  CommonPrimitivesFilterMode: {
    _enum: ['Disabled', 'ForbidSelected', 'AllowSelected']
  },
  /**
   * Lookup266: pallet_collective::pallet::Call<T, I>
   **/
  PalletCollectiveCall: {
    _enum: {
      set_members: {
        newMembers: 'Vec<AccountId32>',
        prime: 'Option<AccountId32>',
        oldCount: 'u32',
      },
      execute: {
        proposal: 'Call',
        lengthBound: 'Compact<u32>',
      },
      propose: {
        threshold: 'Compact<u32>',
        proposal: 'Call',
        lengthBound: 'Compact<u32>',
      },
      vote: {
        proposal: 'H256',
        index: 'Compact<u32>',
        approve: 'bool',
      },
      close: {
        proposalHash: 'H256',
        index: 'Compact<u32>',
        proposalWeightBound: 'Compact<u64>',
        lengthBound: 'Compact<u32>',
      },
      disapprove_proposal: {
        proposalHash: 'H256'
      }
    }
  },
  /**
   * Lookup268: pallet_democracy::pallet::Call<T>
   **/
  PalletDemocracyCall: {
    _enum: {
      propose: {
        proposalHash: 'H256',
        value: 'Compact<u128>',
      },
      second: {
        proposal: 'Compact<u32>',
        secondsUpperBound: 'Compact<u32>',
      },
      vote: {
        refIndex: 'Compact<u32>',
        vote: 'PalletDemocracyVoteAccountVote',
      },
      emergency_cancel: {
        refIndex: 'u32',
      },
      external_propose: {
        proposalHash: 'H256',
      },
      external_propose_majority: {
        proposalHash: 'H256',
      },
      external_propose_default: {
        proposalHash: 'H256',
      },
      fast_track: {
        proposalHash: 'H256',
        votingPeriod: 'u32',
        delay: 'u32',
      },
      veto_external: {
        proposalHash: 'H256',
      },
      cancel_referendum: {
        refIndex: 'Compact<u32>',
      },
      cancel_queued: {
        which: 'u32',
      },
      delegate: {
        to: 'AccountId32',
        conviction: 'PalletDemocracyConviction',
        balance: 'u128',
      },
      undelegate: 'Null',
      clear_public_proposals: 'Null',
      note_preimage: {
        encodedProposal: 'Bytes',
      },
      note_preimage_operational: {
        encodedProposal: 'Bytes',
      },
      note_imminent_preimage: {
        encodedProposal: 'Bytes',
      },
      note_imminent_preimage_operational: {
        encodedProposal: 'Bytes',
      },
      reap_preimage: {
        proposalHash: 'H256',
        proposalLenUpperBound: 'Compact<u32>',
      },
      unlock: {
        target: 'AccountId32',
      },
      remove_vote: {
        index: 'u32',
      },
      remove_other_vote: {
        target: 'AccountId32',
        index: 'u32',
      },
      enact_proposal: {
        proposalHash: 'H256',
        index: 'u32',
      },
      blacklist: {
        proposalHash: 'H256',
        maybeRefIndex: 'Option<u32>',
      },
      cancel_proposal: {
        propIndex: 'Compact<u32>'
      }
    }
  },
  /**
   * Lookup269: pallet_democracy::conviction::Conviction
   **/
  PalletDemocracyConviction: {
    _enum: ['None', 'Locked1x', 'Locked2x', 'Locked3x', 'Locked4x', 'Locked5x', 'Locked6x']
  },
  /**
   * Lookup271: dex_api::pallet::Call<T>
   **/
  DexApiCall: 'Null',
  /**
   * Lookup272: eth_bridge::pallet::Call<T>
   **/
  EthBridgeCall: {
    _enum: {
      register_bridge: {
        bridgeContractAddress: 'H160',
        initialPeers: 'Vec<AccountId32>',
      },
      add_asset: {
        assetId: 'CommonPrimitivesAssetId32',
        networkId: 'u32',
      },
      add_sidechain_token: {
        tokenAddress: 'H160',
        symbol: 'Text',
        name: 'Text',
        decimals: 'u8',
        networkId: 'u32',
      },
      transfer_to_sidechain: {
        assetId: 'CommonPrimitivesAssetId32',
        to: 'H160',
        amount: 'u128',
        networkId: 'u32',
      },
      request_from_sidechain: {
        ethTxHash: 'H256',
        kind: 'EthBridgeRequestsIncomingRequestKind',
        networkId: 'u32',
      },
      finalize_incoming_request: {
        _alias: {
          hash_: 'hash',
        },
        hash_: 'H256',
        networkId: 'u32',
      },
      add_peer: {
        accountId: 'AccountId32',
        address: 'H160',
        networkId: 'u32',
      },
      remove_peer: {
        accountId: 'AccountId32',
        peerAddress: 'Option<H160>',
        networkId: 'u32',
      },
      prepare_for_migration: {
        networkId: 'u32',
      },
      migrate: {
        newContractAddress: 'H160',
        erc20NativeTokens: 'Vec<H160>',
        networkId: 'u32',
      },
      register_incoming_request: {
        incomingRequest: 'EthBridgeRequestsIncomingRequest',
      },
      import_incoming_request: {
        loadIncomingRequest: 'EthBridgeRequestsLoadIncomingRequest',
        incomingRequestResult: 'Result<EthBridgeRequestsIncomingRequest, SpRuntimeDispatchError>',
      },
      approve_request: {
        _alias: {
          hash_: 'hash',
        },
        ocwPublic: 'SpCoreEcdsaPublic',
        hash_: 'H256',
        signatureParams: 'EthBridgeOffchainSignatureParams',
        networkId: 'u32',
      },
      abort_request: {
        _alias: {
          hash_: 'hash',
        },
        hash_: 'H256',
        error: 'SpRuntimeDispatchError',
        networkId: 'u32',
      },
      force_add_peer: {
        who: 'AccountId32',
        address: 'H160',
        networkId: 'u32',
      },
      remove_sidechain_asset: {
        assetId: 'CommonPrimitivesAssetId32',
        networkId: 'u32',
      },
      register_existing_sidechain_asset: {
        assetId: 'CommonPrimitivesAssetId32',
        tokenAddress: 'H160',
        networkId: 'u32'
      }
    }
  },
  /**
   * Lookup273: eth_bridge::requests::IncomingRequestKind
   **/
  EthBridgeRequestsIncomingRequestKind: {
    _enum: {
      Transaction: 'EthBridgeRequestsIncomingTransactionRequestKind',
      Meta: 'EthBridgeRequestsIncomingMetaRequestKind'
    }
  },
  /**
   * Lookup274: eth_bridge::requests::IncomingTransactionRequestKind
   **/
  EthBridgeRequestsIncomingTransactionRequestKind: {
    _enum: ['Transfer', 'AddAsset', 'AddPeer', 'RemovePeer', 'PrepareForMigration', 'Migrate', 'AddPeerCompat', 'RemovePeerCompat', 'TransferXOR']
  },
  /**
   * Lookup275: eth_bridge::requests::IncomingMetaRequestKind
   **/
  EthBridgeRequestsIncomingMetaRequestKind: {
    _enum: ['CancelOutgoingRequest', 'MarkAsDone']
  },
  /**
   * Lookup277: eth_bridge::requests::IncomingRequest<T>
   **/
  EthBridgeRequestsIncomingRequest: {
    _enum: {
      Transfer: 'EthBridgeRequestsIncomingIncomingTransfer',
      AddToken: 'EthBridgeRequestsIncomingIncomingAddToken',
      ChangePeers: 'EthBridgeRequestsIncomingIncomingChangePeers',
      CancelOutgoingRequest: 'EthBridgeRequestsIncomingIncomingCancelOutgoingRequest',
      MarkAsDone: 'EthBridgeRequestsIncomingIncomingMarkAsDoneRequest',
      PrepareForMigration: 'EthBridgeRequestsIncomingIncomingPrepareForMigration',
      Migrate: 'EthBridgeRequestsIncomingIncomingMigrate',
      ChangePeersCompat: 'EthBridgeRequestsIncomingIncomingChangePeersCompat'
    }
  },
  /**
   * Lookup278: eth_bridge::requests::incoming::IncomingTransfer<T>
   **/
  EthBridgeRequestsIncomingIncomingTransfer: {
    from: 'H160',
    to: 'AccountId32',
    assetId: 'CommonPrimitivesAssetId32',
    assetKind: 'EthBridgeRequestsAssetKind',
    amount: 'u128',
    author: 'AccountId32',
    txHash: 'H256',
    atHeight: 'u64',
    timepoint: 'PalletMultisigBridgeTimepoint',
    networkId: 'u32',
    shouldTakeFee: 'bool'
  },
  /**
   * Lookup279: eth_bridge::requests::AssetKind
   **/
  EthBridgeRequestsAssetKind: {
    _enum: ['Thischain', 'Sidechain', 'SidechainOwned']
  },
  /**
   * Lookup280: eth_bridge::requests::incoming::IncomingAddToken<T>
   **/
  EthBridgeRequestsIncomingIncomingAddToken: {
    tokenAddress: 'H160',
    assetId: 'CommonPrimitivesAssetId32',
    precision: 'u8',
    symbol: 'Bytes',
    name: 'Bytes',
    author: 'AccountId32',
    txHash: 'H256',
    atHeight: 'u64',
    timepoint: 'PalletMultisigBridgeTimepoint',
    networkId: 'u32'
  },
  /**
   * Lookup281: eth_bridge::requests::incoming::IncomingChangePeers<T>
   **/
  EthBridgeRequestsIncomingIncomingChangePeers: {
    peerAccountId: 'Option<AccountId32>',
    peerAddress: 'H160',
    removed: 'bool',
    author: 'AccountId32',
    txHash: 'H256',
    atHeight: 'u64',
    timepoint: 'PalletMultisigBridgeTimepoint',
    networkId: 'u32'
  },
  /**
   * Lookup282: eth_bridge::requests::incoming::IncomingCancelOutgoingRequest<T>
   **/
  EthBridgeRequestsIncomingIncomingCancelOutgoingRequest: {
    outgoingRequest: 'EthBridgeRequestsOutgoingRequest',
    outgoingRequestHash: 'H256',
    initialRequestHash: 'H256',
    txInput: 'Bytes',
    author: 'AccountId32',
    txHash: 'H256',
    atHeight: 'u64',
    timepoint: 'PalletMultisigBridgeTimepoint',
    networkId: 'u32'
  },
  /**
   * Lookup283: eth_bridge::requests::OutgoingRequest<T>
   **/
  EthBridgeRequestsOutgoingRequest: {
    _enum: {
      Transfer: 'EthBridgeRequestsOutgoingOutgoingTransfer',
      AddAsset: 'EthBridgeRequestsOutgoingOutgoingAddAsset',
      AddToken: 'EthBridgeRequestsOutgoingOutgoingAddToken',
      AddPeer: 'EthBridgeRequestsOutgoingOutgoingAddPeer',
      RemovePeer: 'EthBridgeRequestsOutgoingOutgoingRemovePeer',
      PrepareForMigration: 'EthBridgeRequestsOutgoingOutgoingPrepareForMigration',
      Migrate: 'EthBridgeRequestsOutgoingOutgoingMigrate',
      AddPeerCompat: 'EthBridgeRequestsOutgoingOutgoingAddPeerCompat',
      RemovePeerCompat: 'EthBridgeRequestsOutgoingOutgoingRemovePeerCompat'
    }
  },
  /**
   * Lookup284: eth_bridge::requests::outgoing::OutgoingTransfer<T>
   **/
  EthBridgeRequestsOutgoingOutgoingTransfer: {
    from: 'AccountId32',
    to: 'H160',
    assetId: 'CommonPrimitivesAssetId32',
    amount: 'u128',
    nonce: 'u32',
    networkId: 'u32',
    timepoint: 'PalletMultisigBridgeTimepoint'
  },
  /**
   * Lookup285: eth_bridge::requests::outgoing::OutgoingAddAsset<T>
   **/
  EthBridgeRequestsOutgoingOutgoingAddAsset: {
    author: 'AccountId32',
    assetId: 'CommonPrimitivesAssetId32',
    nonce: 'u32',
    networkId: 'u32',
    timepoint: 'PalletMultisigBridgeTimepoint'
  },
  /**
   * Lookup286: eth_bridge::requests::outgoing::OutgoingAddToken<T>
   **/
  EthBridgeRequestsOutgoingOutgoingAddToken: {
    author: 'AccountId32',
    tokenAddress: 'H160',
    symbol: 'Text',
    name: 'Text',
    decimals: 'u8',
    nonce: 'u32',
    networkId: 'u32',
    timepoint: 'PalletMultisigBridgeTimepoint'
  },
  /**
   * Lookup287: eth_bridge::requests::outgoing::OutgoingAddPeer<T>
   **/
  EthBridgeRequestsOutgoingOutgoingAddPeer: {
    author: 'AccountId32',
    peerAddress: 'H160',
    peerAccountId: 'AccountId32',
    nonce: 'u32',
    networkId: 'u32',
    timepoint: 'PalletMultisigBridgeTimepoint'
  },
  /**
   * Lookup288: eth_bridge::requests::outgoing::OutgoingRemovePeer<T>
   **/
  EthBridgeRequestsOutgoingOutgoingRemovePeer: {
    author: 'AccountId32',
    peerAccountId: 'AccountId32',
    peerAddress: 'H160',
    nonce: 'u32',
    networkId: 'u32',
    timepoint: 'PalletMultisigBridgeTimepoint',
    compatHash: 'Option<H256>'
  },
  /**
   * Lookup290: eth_bridge::requests::outgoing::OutgoingPrepareForMigration<T>
   **/
  EthBridgeRequestsOutgoingOutgoingPrepareForMigration: {
    author: 'AccountId32',
    nonce: 'u32',
    networkId: 'u32',
    timepoint: 'PalletMultisigBridgeTimepoint'
  },
  /**
   * Lookup291: eth_bridge::requests::outgoing::OutgoingMigrate<T>
   **/
  EthBridgeRequestsOutgoingOutgoingMigrate: {
    author: 'AccountId32',
    newContractAddress: 'H160',
    erc20NativeTokens: 'Vec<H160>',
    nonce: 'u32',
    networkId: 'u32',
    timepoint: 'PalletMultisigBridgeTimepoint'
  },
  /**
   * Lookup292: eth_bridge::requests::outgoing::OutgoingAddPeerCompat<T>
   **/
  EthBridgeRequestsOutgoingOutgoingAddPeerCompat: {
    author: 'AccountId32',
    peerAddress: 'H160',
    peerAccountId: 'AccountId32',
    nonce: 'u32',
    networkId: 'u32',
    timepoint: 'PalletMultisigBridgeTimepoint'
  },
  /**
   * Lookup293: eth_bridge::requests::outgoing::OutgoingRemovePeerCompat<T>
   **/
  EthBridgeRequestsOutgoingOutgoingRemovePeerCompat: {
    author: 'AccountId32',
    peerAccountId: 'AccountId32',
    peerAddress: 'H160',
    nonce: 'u32',
    networkId: 'u32',
    timepoint: 'PalletMultisigBridgeTimepoint'
  },
  /**
   * Lookup294: eth_bridge::requests::incoming::IncomingMarkAsDoneRequest<T>
   **/
  EthBridgeRequestsIncomingIncomingMarkAsDoneRequest: {
    outgoingRequestHash: 'H256',
    initialRequestHash: 'H256',
    author: 'AccountId32',
    atHeight: 'u64',
    timepoint: 'PalletMultisigBridgeTimepoint',
    networkId: 'u32'
  },
  /**
   * Lookup295: eth_bridge::requests::incoming::IncomingPrepareForMigration<T>
   **/
  EthBridgeRequestsIncomingIncomingPrepareForMigration: {
    author: 'AccountId32',
    txHash: 'H256',
    atHeight: 'u64',
    timepoint: 'PalletMultisigBridgeTimepoint',
    networkId: 'u32'
  },
  /**
   * Lookup296: eth_bridge::requests::incoming::IncomingMigrate<T>
   **/
  EthBridgeRequestsIncomingIncomingMigrate: {
    newContractAddress: 'H160',
    author: 'AccountId32',
    txHash: 'H256',
    atHeight: 'u64',
    timepoint: 'PalletMultisigBridgeTimepoint',
    networkId: 'u32'
  },
  /**
   * Lookup297: eth_bridge::requests::incoming::IncomingChangePeersCompat<T>
   **/
  EthBridgeRequestsIncomingIncomingChangePeersCompat: {
    peerAccountId: 'AccountId32',
    peerAddress: 'H160',
    added: 'bool',
    contract: 'EthBridgeRequestsIncomingChangePeersContract',
    author: 'AccountId32',
    txHash: 'H256',
    atHeight: 'u64',
    timepoint: 'PalletMultisigBridgeTimepoint',
    networkId: 'u32'
  },
  /**
   * Lookup298: eth_bridge::requests::incoming::ChangePeersContract
   **/
  EthBridgeRequestsIncomingChangePeersContract: {
    _enum: ['XOR', 'VAL']
  },
  /**
   * Lookup299: eth_bridge::requests::LoadIncomingRequest<T>
   **/
  EthBridgeRequestsLoadIncomingRequest: {
    _enum: {
      Transaction: 'EthBridgeRequestsLoadIncomingTransactionRequest',
      Meta: '(EthBridgeRequestsLoadIncomingMetaRequest,H256)'
    }
  },
  /**
   * Lookup300: eth_bridge::requests::LoadIncomingTransactionRequest<T>
   **/
  EthBridgeRequestsLoadIncomingTransactionRequest: {
    _alias: {
      hash_: 'hash'
    },
    author: 'AccountId32',
    hash_: 'H256',
    timepoint: 'PalletMultisigBridgeTimepoint',
    kind: 'EthBridgeRequestsIncomingTransactionRequestKind',
    networkId: 'u32'
  },
  /**
   * Lookup301: eth_bridge::requests::LoadIncomingMetaRequest<T>
   **/
  EthBridgeRequestsLoadIncomingMetaRequest: {
    _alias: {
      hash_: 'hash'
    },
    author: 'AccountId32',
    hash_: 'H256',
    timepoint: 'PalletMultisigBridgeTimepoint',
    kind: 'EthBridgeRequestsIncomingMetaRequestKind',
    networkId: 'u32'
  },
  /**
   * Lookup303: eth_bridge::offchain::SignatureParams
   **/
  EthBridgeOffchainSignatureParams: {
    r: '[u8;32]',
    s: '[u8;32]',
    v: 'u8'
  },
  /**
   * Lookup304: pswap_distribution::pallet::Call<T>
   **/
  PswapDistributionCall: {
    _enum: ['claim_incentive']
  },
  /**
   * Lookup308: pallet_scheduler::pallet::Call<T>
   **/
  PalletSchedulerCall: {
    _enum: {
      schedule: {
        when: 'u32',
        maybePeriodic: 'Option<(u32,u32)>',
        priority: 'u8',
        call: 'FrameSupportScheduleMaybeHashed',
      },
      cancel: {
        when: 'u32',
        index: 'u32',
      },
      schedule_named: {
        id: 'Bytes',
        when: 'u32',
        maybePeriodic: 'Option<(u32,u32)>',
        priority: 'u8',
        call: 'FrameSupportScheduleMaybeHashed',
      },
      cancel_named: {
        id: 'Bytes',
      },
      schedule_after: {
        after: 'u32',
        maybePeriodic: 'Option<(u32,u32)>',
        priority: 'u8',
        call: 'FrameSupportScheduleMaybeHashed',
      },
      schedule_named_after: {
        id: 'Bytes',
        after: 'u32',
        maybePeriodic: 'Option<(u32,u32)>',
        priority: 'u8',
        call: 'FrameSupportScheduleMaybeHashed'
      }
    }
  },
  /**
   * Lookup310: frame_support::traits::schedule::MaybeHashed<framenode_runtime::Call, primitive_types::H256>
   **/
  FrameSupportScheduleMaybeHashed: {
    _enum: {
      Value: 'Call',
      Hash: 'H256'
    }
  },
  /**
   * Lookup311: iroha_migration::pallet::Call<T>
   **/
  IrohaMigrationCall: {
    _enum: {
      migrate: {
        irohaAddress: 'Text',
        irohaPublicKey: 'Text',
        irohaSignature: 'Text'
      }
    }
  },
  /**
   * Lookup312: pallet_membership::pallet::Call<T, I>
   **/
  PalletMembershipCall: {
    _enum: {
      add_member: {
        who: 'AccountId32',
      },
      remove_member: {
        who: 'AccountId32',
      },
      swap_member: {
        remove: 'AccountId32',
        add: 'AccountId32',
      },
      reset_members: {
        members: 'Vec<AccountId32>',
      },
      change_key: {
        _alias: {
          new_: 'new',
        },
        new_: 'AccountId32',
      },
      set_prime: {
        who: 'AccountId32',
      },
      clear_prime: 'Null'
    }
  },
  /**
   * Lookup313: pallet_elections_phragmen::pallet::Call<T>
   **/
  PalletElectionsPhragmenCall: {
    _enum: {
      vote: {
        votes: 'Vec<AccountId32>',
        value: 'Compact<u128>',
      },
      remove_voter: 'Null',
      submit_candidacy: {
        candidateCount: 'Compact<u32>',
      },
      renounce_candidacy: {
        renouncing: 'PalletElectionsPhragmenRenouncing',
      },
      remove_member: {
        who: 'AccountId32',
        slashBond: 'bool',
        rerunElection: 'bool',
      },
      clean_defunct_voters: {
        numVoters: 'u32',
        numDefunct: 'u32'
      }
    }
  },
  /**
   * Lookup314: pallet_elections_phragmen::Renouncing
   **/
  PalletElectionsPhragmenRenouncing: {
    _enum: {
      Member: 'Null',
      RunnerUp: 'Null',
      Candidate: 'Compact<u32>'
    }
  },
  /**
   * Lookup315: vested_rewards::pallet::Call<T>
   **/
  VestedRewardsCall: {
    _enum: {
      claim_rewards: 'Null',
      claim_crowdloan_rewards: {
        assetId: 'CommonPrimitivesAssetId32',
      },
      set_asset_pair: {
        fromAssetId: 'CommonPrimitivesAssetId32',
        toAssetId: 'CommonPrimitivesAssetId32',
        marketMakingRewardsAllowed: 'bool'
      }
    }
  },
  /**
   * Lookup316: pallet_identity::pallet::Call<T>
   **/
  PalletIdentityCall: {
    _enum: {
      add_registrar: {
        account: 'AccountId32',
      },
      set_identity: {
        info: 'PalletIdentityIdentityInfo',
      },
      set_subs: {
        subs: 'Vec<(AccountId32,Data)>',
      },
      clear_identity: 'Null',
      request_judgement: {
        regIndex: 'Compact<u32>',
        maxFee: 'Compact<u128>',
      },
      cancel_request: {
        regIndex: 'u32',
      },
      set_fee: {
        index: 'Compact<u32>',
        fee: 'Compact<u128>',
      },
      set_account_id: {
        _alias: {
          new_: 'new',
        },
        index: 'Compact<u32>',
        new_: 'AccountId32',
      },
      set_fields: {
        index: 'Compact<u32>',
        fields: 'PalletIdentityBitFlags',
      },
      provide_judgement: {
        regIndex: 'Compact<u32>',
        target: 'AccountId32',
        judgement: 'PalletIdentityJudgement',
      },
      kill_identity: {
        target: 'AccountId32',
      },
      add_sub: {
        sub: 'AccountId32',
        data: 'Data',
      },
      rename_sub: {
        sub: 'AccountId32',
        data: 'Data',
      },
      remove_sub: {
        sub: 'AccountId32',
      },
      quit_sub: 'Null'
    }
  },
  /**
   * Lookup317: pallet_identity::types::IdentityInfo<FieldLimit>
   **/
  PalletIdentityIdentityInfo: {
    additional: 'Vec<(Data,Data)>',
    display: 'Data',
    legal: 'Data',
    web: 'Data',
    riot: 'Data',
    email: 'Data',
    pgpFingerprint: 'Option<[u8;20]>',
    image: 'Data',
    twitter: 'Data'
  },
  /**
   * Lookup353: pallet_identity::types::BitFlags<pallet_identity::types::IdentityField>
   **/
  PalletIdentityBitFlags: {
    _bitLength: 64,
    Display: 1,
    Legal: 2,
    Web: 4,
    Riot: 8,
    Email: 16,
    PgpFingerprint: 32,
    Image: 64,
    Twitter: 128
  },
  /**
   * Lookup354: pallet_identity::types::IdentityField
   **/
  PalletIdentityIdentityField: {
    _enum: ['__Unused0', 'Display', 'Legal', '__Unused3', 'Web', '__Unused5', '__Unused6', '__Unused7', 'Riot', '__Unused9', '__Unused10', '__Unused11', '__Unused12', '__Unused13', '__Unused14', '__Unused15', 'Email', '__Unused17', '__Unused18', '__Unused19', '__Unused20', '__Unused21', '__Unused22', '__Unused23', '__Unused24', '__Unused25', '__Unused26', '__Unused27', '__Unused28', '__Unused29', '__Unused30', '__Unused31', 'PgpFingerprint', '__Unused33', '__Unused34', '__Unused35', '__Unused36', '__Unused37', '__Unused38', '__Unused39', '__Unused40', '__Unused41', '__Unused42', '__Unused43', '__Unused44', '__Unused45', '__Unused46', '__Unused47', '__Unused48', '__Unused49', '__Unused50', '__Unused51', '__Unused52', '__Unused53', '__Unused54', '__Unused55', '__Unused56', '__Unused57', '__Unused58', '__Unused59', '__Unused60', '__Unused61', '__Unused62', '__Unused63', 'Image', '__Unused65', '__Unused66', '__Unused67', '__Unused68', '__Unused69', '__Unused70', '__Unused71', '__Unused72', '__Unused73', '__Unused74', '__Unused75', '__Unused76', '__Unused77', '__Unused78', '__Unused79', '__Unused80', '__Unused81', '__Unused82', '__Unused83', '__Unused84', '__Unused85', '__Unused86', '__Unused87', '__Unused88', '__Unused89', '__Unused90', '__Unused91', '__Unused92', '__Unused93', '__Unused94', '__Unused95', '__Unused96', '__Unused97', '__Unused98', '__Unused99', '__Unused100', '__Unused101', '__Unused102', '__Unused103', '__Unused104', '__Unused105', '__Unused106', '__Unused107', '__Unused108', '__Unused109', '__Unused110', '__Unused111', '__Unused112', '__Unused113', '__Unused114', '__Unused115', '__Unused116', '__Unused117', '__Unused118', '__Unused119', '__Unused120', '__Unused121', '__Unused122', '__Unused123', '__Unused124', '__Unused125', '__Unused126', '__Unused127', 'Twitter']
  },
  /**
   * Lookup355: pallet_identity::types::Judgement<Balance>
   **/
  PalletIdentityJudgement: {
    _enum: {
      Unknown: 'Null',
      FeePaid: 'u128',
      Reasonable: 'Null',
      KnownGood: 'Null',
      OutOfDate: 'Null',
      LowQuality: 'Null',
      Erroneous: 'Null'
    }
  },
  /**
   * Lookup356: xst::pallet::Call<T>
   **/
  XstCall: {
    _enum: {
      initialize_pool: {
        syntheticAssetId: 'CommonPrimitivesAssetId32',
      },
      set_reference_asset: {
        referenceAssetId: 'CommonPrimitivesAssetId32',
      },
      enable_synthetic_asset: {
        syntheticAsset: 'CommonPrimitivesAssetId32'
      }
    }
  },
  /**
   * Lookup357: ceres_staking::pallet::Call<T>
   **/
  CeresStakingCall: {
    _enum: {
      deposit: {
        amount: 'u128',
      },
      withdraw: 'Null',
      change_rewards_remaining: {
        rewardsRemaining: 'u128'
      }
    }
  },
  /**
   * Lookup358: ceres_liquidity_locker::pallet::Call<T>
   **/
  CeresLiquidityLockerCall: {
    _enum: {
      lock_liquidity: {
        assetA: 'CommonPrimitivesAssetId32',
        assetB: 'CommonPrimitivesAssetId32',
        unlockingTimestamp: 'u64',
        percentageOfPoolTokens: 'u128',
        option: 'bool',
      },
      change_ceres_fee: {
        ceresFee: 'u128'
      }
    }
  },
  /**
   * Lookup359: ceres_token_locker::pallet::Call<T>
   **/
  CeresTokenLockerCall: {
    _enum: {
      lock_tokens: {
        assetId: 'CommonPrimitivesAssetId32',
        unlockingTimestamp: 'u64',
        numberOfTokens: 'u128',
      },
      withdraw_tokens: {
        assetId: 'CommonPrimitivesAssetId32',
        unlockingTimestamp: 'u64',
        numberOfTokens: 'u128',
      },
      change_fee: {
        newFee: 'u128'
      }
    }
  },
  /**
   * Lookup360: ceres_governance_platform::pallet::Call<T>
   **/
  CeresGovernancePlatformCall: {
    _enum: {
      vote: {
        pollId: 'Bytes',
        votingOption: 'u32',
        numberOfVotes: 'u128',
      },
      create_poll: {
        pollId: 'Bytes',
        numberOfOptions: 'u32',
        pollStartTimestamp: 'u64',
        pollEndTimestamp: 'u64',
      },
      withdraw: {
        pollId: 'Bytes'
      }
    }
  },
  /**
   * Lookup361: ceres_launchpad::pallet::Call<T>
   **/
  CeresLaunchpadCall: {
    _enum: {
      create_ilo: {
        assetId: 'CommonPrimitivesAssetId32',
        tokensForIlo: 'u128',
        tokensForLiquidity: 'u128',
        iloPrice: 'u128',
        softCap: 'u128',
        hardCap: 'u128',
        minContribution: 'u128',
        maxContribution: 'u128',
        refundType: 'bool',
        liquidityPercent: 'u128',
        listingPrice: 'u128',
        lockupDays: 'u32',
        startTimestamp: 'u64',
        endTimestamp: 'u64',
        teamVestingTotalTokens: 'u128',
        teamVestingFirstReleasePercent: 'u128',
        teamVestingPeriod: 'u64',
        teamVestingPercent: 'u128',
        firstReleasePercent: 'u128',
        vestingPeriod: 'u64',
        vestingPercent: 'u128',
      },
      contribute: {
        assetId: 'CommonPrimitivesAssetId32',
        fundsToContribute: 'u128',
      },
      emergency_withdraw: {
        assetId: 'CommonPrimitivesAssetId32',
      },
      finish_ilo: {
        assetId: 'CommonPrimitivesAssetId32',
      },
      claim_lp_tokens: {
        assetId: 'CommonPrimitivesAssetId32',
      },
      claim: {
        assetId: 'CommonPrimitivesAssetId32',
      },
      change_ceres_burn_fee: {
        ceresFee: 'u128',
      },
      change_ceres_contribution_fee: {
        ceresFee: 'u128',
      },
      claim_pswap_rewards: 'Null',
      add_whitelisted_contributor: {
        contributor: 'AccountId32',
      },
      remove_whitelisted_contributor: {
        contributor: 'AccountId32',
      },
      add_whitelisted_ilo_organizer: {
        iloOrganizer: 'AccountId32',
      },
      remove_whitelisted_ilo_organizer: {
        iloOrganizer: 'AccountId32'
      }
    }
  },
  /**
   * Lookup362: demeter_farming_platform::pallet::Call<T>
   **/
  DemeterFarmingPlatformCall: {
    _enum: {
      register_token: {
        poolAsset: 'CommonPrimitivesAssetId32',
        tokenPerBlock: 'u128',
        farmsAllocation: 'u128',
        stakingAllocation: 'u128',
        teamAllocation: 'u128',
        teamAccount: 'AccountId32',
      },
      add_pool: {
        poolAsset: 'CommonPrimitivesAssetId32',
        rewardAsset: 'CommonPrimitivesAssetId32',
        isFarm: 'bool',
        multiplier: 'u32',
        depositFee: 'u128',
        isCore: 'bool',
      },
      deposit: {
        poolAsset: 'CommonPrimitivesAssetId32',
        rewardAsset: 'CommonPrimitivesAssetId32',
        isFarm: 'bool',
        pooledTokens: 'u128',
      },
      get_rewards: {
        poolAsset: 'CommonPrimitivesAssetId32',
        rewardAsset: 'CommonPrimitivesAssetId32',
        isFarm: 'bool',
      },
      withdraw: {
        poolAsset: 'CommonPrimitivesAssetId32',
        rewardAsset: 'CommonPrimitivesAssetId32',
        pooledTokens: 'u128',
        isFarm: 'bool',
      },
      remove_pool: {
        poolAsset: 'CommonPrimitivesAssetId32',
        rewardAsset: 'CommonPrimitivesAssetId32',
        isFarm: 'bool',
      },
      change_pool_multiplier: {
        poolAsset: 'CommonPrimitivesAssetId32',
        rewardAsset: 'CommonPrimitivesAssetId32',
        isFarm: 'bool',
        newMultiplier: 'u32',
      },
      change_total_tokens: {
        poolAsset: 'CommonPrimitivesAssetId32',
        rewardAsset: 'CommonPrimitivesAssetId32',
        isFarm: 'bool',
        totalTokens: 'u128',
      },
      change_info: {
        changedUser: 'AccountId32',
        poolAsset: 'CommonPrimitivesAssetId32',
        rewardAsset: 'CommonPrimitivesAssetId32',
        isFarm: 'bool',
        poolTokens: 'u128',
      },
      change_pool_deposit_fee: {
        poolAsset: 'CommonPrimitivesAssetId32',
        rewardAsset: 'CommonPrimitivesAssetId32',
        isFarm: 'bool',
        depositFee: 'u128',
      },
      change_token_info: {
        poolAsset: 'CommonPrimitivesAssetId32',
        tokenPerBlock: 'u128',
        farmsAllocation: 'u128',
        stakingAllocation: 'u128',
        teamAllocation: 'u128',
        teamAccount: 'AccountId32'
      }
    }
  },
  /**
   * Lookup363: pallet_bags_list::pallet::Call<T, I>
   **/
  PalletBagsListCall: {
    _enum: {
      rebag: {
        dislocated: 'AccountId32',
      },
      put_in_front_of: {
        lighter: 'AccountId32'
      }
    }
  },
  /**
   * Lookup364: pallet_election_provider_multi_phase::pallet::Call<T>
   **/
  PalletElectionProviderMultiPhaseCall: {
    _enum: {
      submit_unsigned: {
        rawSolution: 'PalletElectionProviderMultiPhaseRawSolution',
        witness: 'PalletElectionProviderMultiPhaseSolutionOrSnapshotSize',
      },
      set_minimum_untrusted_score: {
        maybeNextScore: 'Option<SpNposElectionsElectionScore>',
      },
      set_emergency_election_result: {
        supports: 'Vec<(AccountId32,SpNposElectionsSupport)>',
      },
      submit: {
        rawSolution: 'PalletElectionProviderMultiPhaseRawSolution',
      },
      governance_fallback: {
        maybeMaxVoters: 'Option<u32>',
        maybeMaxTargets: 'Option<u32>'
      }
    }
  },
  /**
   * Lookup365: pallet_election_provider_multi_phase::RawSolution<framenode_runtime::NposCompactSolution24>
   **/
  PalletElectionProviderMultiPhaseRawSolution: {
    solution: 'FramenodeRuntimeNposCompactSolution24',
    score: 'SpNposElectionsElectionScore',
    round: 'u32'
  },
  /**
   * Lookup366: framenode_runtime::NposCompactSolution24
   **/
  FramenodeRuntimeNposCompactSolution24: {
    votes1: 'Vec<(Compact<u32>,Compact<u16>)>',
    votes2: 'Vec<(Compact<u32>,(Compact<u16>,Compact<PerU16>),Compact<u16>)>',
    votes3: 'Vec<(Compact<u32>,[(Compact<u16>,Compact<PerU16>);2],Compact<u16>)>',
    votes4: 'Vec<(Compact<u32>,[(Compact<u16>,Compact<PerU16>);3],Compact<u16>)>',
    votes5: 'Vec<(Compact<u32>,[(Compact<u16>,Compact<PerU16>);4],Compact<u16>)>',
    votes6: 'Vec<(Compact<u32>,[(Compact<u16>,Compact<PerU16>);5],Compact<u16>)>',
    votes7: 'Vec<(Compact<u32>,[(Compact<u16>,Compact<PerU16>);6],Compact<u16>)>',
    votes8: 'Vec<(Compact<u32>,[(Compact<u16>,Compact<PerU16>);7],Compact<u16>)>',
    votes9: 'Vec<(Compact<u32>,[(Compact<u16>,Compact<PerU16>);8],Compact<u16>)>',
    votes10: 'Vec<(Compact<u32>,[(Compact<u16>,Compact<PerU16>);9],Compact<u16>)>',
    votes11: 'Vec<(Compact<u32>,[(Compact<u16>,Compact<PerU16>);10],Compact<u16>)>',
    votes12: 'Vec<(Compact<u32>,[(Compact<u16>,Compact<PerU16>);11],Compact<u16>)>',
    votes13: 'Vec<(Compact<u32>,[(Compact<u16>,Compact<PerU16>);12],Compact<u16>)>',
    votes14: 'Vec<(Compact<u32>,[(Compact<u16>,Compact<PerU16>);13],Compact<u16>)>',
    votes15: 'Vec<(Compact<u32>,[(Compact<u16>,Compact<PerU16>);14],Compact<u16>)>',
    votes16: 'Vec<(Compact<u32>,[(Compact<u16>,Compact<PerU16>);15],Compact<u16>)>',
    votes17: 'Vec<(Compact<u32>,[(Compact<u16>,Compact<PerU16>);16],Compact<u16>)>',
    votes18: 'Vec<(Compact<u32>,[(Compact<u16>,Compact<PerU16>);17],Compact<u16>)>',
    votes19: 'Vec<(Compact<u32>,[(Compact<u16>,Compact<PerU16>);18],Compact<u16>)>',
    votes20: 'Vec<(Compact<u32>,[(Compact<u16>,Compact<PerU16>);19],Compact<u16>)>',
    votes21: 'Vec<(Compact<u32>,[(Compact<u16>,Compact<PerU16>);20],Compact<u16>)>',
    votes22: 'Vec<(Compact<u32>,[(Compact<u16>,Compact<PerU16>);21],Compact<u16>)>',
    votes23: 'Vec<(Compact<u32>,[(Compact<u16>,Compact<PerU16>);22],Compact<u16>)>',
    votes24: 'Vec<(Compact<u32>,[(Compact<u16>,Compact<PerU16>);23],Compact<u16>)>'
  },
  /**
   * Lookup441: sp_npos_elections::ElectionScore
   **/
  SpNposElectionsElectionScore: {
    minimalStake: 'u128',
    sumStake: 'u128',
    sumStakeSquared: 'u128'
  },
  /**
   * Lookup442: pallet_election_provider_multi_phase::SolutionOrSnapshotSize
   **/
  PalletElectionProviderMultiPhaseSolutionOrSnapshotSize: {
    voters: 'Compact<u32>',
    targets: 'Compact<u32>'
  },
  /**
   * Lookup446: sp_npos_elections::Support<sp_core::crypto::AccountId32>
   **/
  SpNposElectionsSupport: {
    total: 'u128',
    voters: 'Vec<(AccountId32,u128)>'
  },
  /**
   * Lookup447: faucet::pallet::Call<T>
   **/
  FaucetCall: {
    _enum: {
      transfer: {
        assetId: 'CommonPrimitivesAssetId32',
        target: 'AccountId32',
        amount: 'u128',
      },
      reset_rewards: 'Null',
      update_limit: {
        newLimit: 'u128'
      }
    }
  },
  /**
   * Lookup448: ethereum_light_client::pallet::Call<T>
   **/
  EthereumLightClientCall: {
    _enum: {
      register_network: {
        networkConfig: 'BridgeTypesNetworkConfig',
        header: 'BridgeTypesHeader',
        initialDifficulty: 'U256',
      },
      update_difficulty_config: {
        networkConfig: 'BridgeTypesNetworkConfig',
      },
      import_header: {
        networkId: 'U256',
        header: 'BridgeTypesHeader',
        proof: 'Vec<BridgeTypesEthashproofDoubleNodeWithMerkleProof>',
        mixNonce: 'BridgeTypesEthashproofMixNonce',
        submitter: 'SpRuntimeMultiSigner',
        signature: 'SpRuntimeMultiSignature'
      }
    }
  },
  /**
   * Lookup449: bridge_types::network_config::NetworkConfig
   **/
  BridgeTypesNetworkConfig: {
    _enum: {
      Mainnet: 'Null',
      Ropsten: 'Null',
      Sepolia: 'Null',
      Rinkeby: 'Null',
      Goerli: 'Null',
      Classic: 'Null',
      Mordor: 'Null',
      Custom: {
        chainId: 'U256',
        consensus: 'BridgeTypesNetworkConfigConsensus'
      }
    }
  },
  /**
   * Lookup450: bridge_types::network_config::Consensus
   **/
  BridgeTypesNetworkConfigConsensus: {
    _enum: {
      Ethash: {
        forkConfig: 'BridgeTypesDifficultyForkConfig',
      },
      Etchash: {
        forkConfig: 'BridgeTypesDifficultyClassicForkConfig',
      },
      Clique: {
        period: 'u64',
        epoch: 'u64'
      }
    }
  },
  /**
   * Lookup451: bridge_types::difficulty::ForkConfig
   **/
  BridgeTypesDifficultyForkConfig: {
    byzantiumForkBlock: 'u64',
    constantinopleForkBlock: 'u64',
    muirGlacierForkBlock: 'u64',
    londonForkBlock: 'u64',
    arrowGlacierForkBlock: 'u64',
    grayGlacierForkBlock: 'u64'
  },
  /**
   * Lookup452: bridge_types::difficulty::ClassicForkConfig
   **/
  BridgeTypesDifficultyClassicForkConfig: {
    ecip1041Block: 'u64',
    ecip1099Block: 'u64'
  },
  /**
   * Lookup453: bridge_types::header::Header
   **/
  BridgeTypesHeader: {
    parentHash: 'H256',
    timestamp: 'u64',
    number: 'u64',
    author: 'H160',
    transactionsRoot: 'H256',
    ommersHash: 'H256',
    extraData: 'Bytes',
    stateRoot: 'H256',
    receiptsRoot: 'H256',
    logsBloom: 'EthbloomBloom',
    gasUsed: 'U256',
    gasLimit: 'U256',
    difficulty: 'U256',
    seal: 'Vec<Bytes>',
    baseFee: 'Option<U256>'
  },
  /**
   * Lookup454: ethbloom::Bloom
   **/
  EthbloomBloom: '[u8;256]',
  /**
   * Lookup458: bridge_types::ethashproof::DoubleNodeWithMerkleProof
   **/
  BridgeTypesEthashproofDoubleNodeWithMerkleProof: {
    dagNodes: '[H512;2]',
    proof: 'Vec<H128>'
  },
  /**
   * Lookup463: bridge_types::ethashproof::MixNonce
   **/
  BridgeTypesEthashproofMixNonce: '[u8;32]',
  /**
   * Lookup464: sp_runtime::MultiSigner
   **/
  SpRuntimeMultiSigner: {
    _enum: {
      Ed25519: 'SpCoreEd25519Public',
      Sr25519: 'SpCoreSr25519Public',
      Ecdsa: 'SpCoreEcdsaPublic'
    }
  },
  /**
   * Lookup465: sp_runtime::MultiSignature
   **/
  SpRuntimeMultiSignature: {
    _enum: {
      Ed25519: 'SpCoreEd25519Signature',
      Sr25519: 'SpCoreSr25519Signature',
      Ecdsa: 'SpCoreEcdsaSignature'
    }
  },
  /**
   * Lookup466: sp_core::ecdsa::Signature
   **/
  SpCoreEcdsaSignature: '[u8;65]',
  /**
   * Lookup468: bridge_channel::inbound::pallet::Call<T>
   **/
  BridgeChannelInboundPalletCall: {
    _enum: {
      submit: {
        networkId: 'U256',
        message: 'BridgeTypesMessage',
      },
      register_channel: {
        networkId: 'U256',
        channel: 'H160',
      },
      set_reward_fraction: {
        fraction: 'Perbill'
      }
    }
  },
  /**
   * Lookup469: bridge_types::types::Message
   **/
  BridgeTypesMessage: {
    data: 'Bytes',
    proof: 'BridgeTypesProof'
  },
  /**
   * Lookup470: bridge_types::types::Proof
   **/
  BridgeTypesProof: {
    blockHash: 'H256',
    txIndex: 'u32',
    data: 'Vec<Bytes>'
  },
  /**
   * Lookup471: eth_app::pallet::Call<T>
   **/
  EthAppCall: {
    _enum: {
      burn: {
        networkId: 'U256',
        recipient: 'H160',
        amount: 'u128',
      },
      mint: {
        sender: 'H160',
        recipient: 'AccountId32',
        amount: 'U256',
      },
      register_network: {
        networkId: 'U256',
        name: 'Bytes',
        symbol: 'Bytes',
        decimals: 'u8',
        contract: 'H160',
      },
      register_network_with_existing_asset: {
        networkId: 'U256',
        assetId: 'CommonPrimitivesAssetId32',
        contract: 'H160'
      }
    }
  },
  /**
   * Lookup472: erc20_app::pallet::Call<T>
   **/
  Erc20AppCall: {
    _enum: {
      mint: {
        token: 'H160',
        sender: 'H160',
        recipient: 'AccountId32',
        amount: 'U256',
      },
      register_asset_internal: {
        assetId: 'CommonPrimitivesAssetId32',
        contract: 'H160',
      },
      burn: {
        networkId: 'U256',
        assetId: 'CommonPrimitivesAssetId32',
        recipient: 'H160',
        amount: 'u128',
      },
      register_erc20_asset: {
        networkId: 'U256',
        address: 'H160',
        symbol: 'Bytes',
        name: 'Bytes',
        decimals: 'u8',
      },
      register_existing_erc20_asset: {
        networkId: 'U256',
        address: 'H160',
        assetId: 'CommonPrimitivesAssetId32',
      },
      register_native_asset: {
        networkId: 'U256',
        assetId: 'CommonPrimitivesAssetId32',
      },
      register_native_app: {
        networkId: 'U256',
        contract: 'H160',
      },
      register_erc20_app: {
        networkId: 'U256',
        contract: 'H160'
      }
    }
  },
  /**
   * Lookup473: migration_app::pallet::Call<T>
   **/
  MigrationAppCall: {
    _enum: {
      migrate_erc20: {
        networkId: 'U256',
        erc20Assets: 'Vec<(CommonPrimitivesAssetId32,H160)>',
      },
      migrate_sidechain: {
        networkId: 'U256',
        sidechainAssets: 'Vec<(CommonPrimitivesAssetId32,H160)>',
      },
      migrate_eth: {
        networkId: 'U256',
      },
      register_network: {
        networkId: 'U256',
        contract: 'H160'
      }
    }
  },
  /**
   * Lookup476: evm_bridge_proxy::pallet::Call<T>
   **/
  EvmBridgeProxyCall: {
    _enum: {
      burn: {
        networkId: 'U256',
        assetId: 'CommonPrimitivesAssetId32',
        recipient: 'H160',
        amount: 'u128'
      }
    }
  },
  /**
   * Lookup477: pallet_sudo::pallet::Error<T>
   **/
  PalletSudoError: {
    _enum: ['RequireSudo']
  },
  /**
   * Lookup479: pallet_transaction_payment::Releases
   **/
  PalletTransactionPaymentReleases: {
    _enum: ['V1Ancient', 'V2']
  },
  /**
   * Lookup481: permissions::Scope
   **/
  PermissionsScope: {
    _enum: {
      Limited: 'H512',
      Unlimited: 'Null'
    }
  },
  /**
   * Lookup483: permissions::pallet::Error<T>
   **/
  PermissionsError: {
    _enum: ['PermissionNotFound', 'PermissionNotOwned', 'PermissionAlreadyExists', 'Forbidden', 'IncRefError']
  },
  /**
   * Lookup484: referrals::pallet::Error<T>
   **/
  ReferralsError: {
    _enum: ['AlreadyHasReferrer', 'IncRefError', 'ReferrerInsufficientBalance']
  },
  /**
   * Lookup485: rewards::RewardInfo
   **/
  RewardsRewardInfo: {
    claimable: 'u128',
    total: 'u128'
  },
  /**
   * Lookup488: rewards::pallet::Error<T>
   **/
  RewardsError: {
    _enum: ['NothingToClaim', 'AddressNotEligible', 'SignatureInvalid', 'SignatureVerificationFailed', 'IllegalCall']
  },
  /**
   * Lookup489: pallet_multisig::MultisigAccount<sp_core::crypto::AccountId32>
   **/
  PalletMultisigMultisigAccount: {
    signatories: 'Vec<AccountId32>',
    threshold: 'Percent'
  },
  /**
   * Lookup491: pallet_multisig::Multisig<BlockNumber, Balance, sp_core::crypto::AccountId32>
   **/
  PalletMultisigMultisig: {
    when: 'PalletMultisigBridgeTimepoint',
    deposit: 'u128',
    depositor: 'AccountId32',
    approvals: 'Vec<AccountId32>'
  },
  /**
   * Lookup494: pallet_multisig::pallet::Error<T>
   **/
  PalletMultisigError: {
    _enum: ['MinimumThreshold', 'AlreadyApproved', 'NoApprovalsNeeded', 'TooFewSignatories', 'TooManySignatories', 'SignatoriesOutOfOrder', 'SenderNotInSignatories', 'NotInSignatories', 'AlreadyInSignatories', 'NotFound', 'NotOwner', 'NoTimepoint', 'WrongTimepoint', 'UnexpectedTimepoint', 'AlreadyStored', 'WeightTooLow', 'ZeroThreshold', 'MultisigAlreadyExists', 'UnknownMultisigAccount', 'SignatoriesAreNotUniqueOrUnordered', 'AlreadyDispatched']
  },
  /**
   * Lookup495: pallet_utility::pallet::Error<T>
   **/
  PalletUtilityError: {
    _enum: ['TooManyCalls']
  },
  /**
   * Lookup497: pallet_authorship::UncleEntryItem<BlockNumber, primitive_types::H256, sp_core::crypto::AccountId32>
   **/
  PalletAuthorshipUncleEntryItem: {
    _enum: {
      InclusionHeight: 'u32',
      Uncle: '(H256,Option<AccountId32>)'
    }
  },
  /**
   * Lookup499: pallet_authorship::pallet::Error<T>
   **/
  PalletAuthorshipError: {
    _enum: ['InvalidUncleParent', 'UnclesAlreadySet', 'TooManyUncles', 'GenesisUncle', 'TooHighUncle', 'UncleAlreadyIncluded', 'OldUncle']
  },
  /**
   * Lookup500: pallet_staking::sora::DurationWrapper
   **/
  PalletStakingSoraDurationWrapper: {
    secs: 'u64',
    nanos: 'u32'
  },
  /**
   * Lookup501: pallet_staking::StakingLedger<T>
   **/
  PalletStakingStakingLedger: {
    stash: 'AccountId32',
    total: 'Compact<u128>',
    active: 'Compact<u128>',
    unlocking: 'Vec<PalletStakingUnlockChunk>',
    claimedRewards: 'Vec<u32>'
  },
  /**
   * Lookup503: pallet_staking::UnlockChunk<Balance>
   **/
  PalletStakingUnlockChunk: {
    value: 'Compact<u128>',
    era: 'Compact<u32>'
  },
  /**
   * Lookup505: pallet_staking::Nominations<T>
   **/
  PalletStakingNominations: {
    targets: 'Vec<AccountId32>',
    submittedIn: 'u32',
    suppressed: 'bool'
  },
  /**
   * Lookup507: pallet_staking::ActiveEraInfo
   **/
  PalletStakingActiveEraInfo: {
    index: 'u32',
    start: 'Option<u64>'
  },
  /**
   * Lookup509: pallet_staking::EraRewardPoints<sp_core::crypto::AccountId32>
   **/
  PalletStakingEraRewardPoints: {
    total: 'u32',
    individual: 'BTreeMap<AccountId32, u32>'
  },
  /**
   * Lookup513: pallet_staking::Forcing
   **/
  PalletStakingForcing: {
    _enum: ['NotForcing', 'ForceNew', 'ForceNone', 'ForceAlways']
  },
  /**
   * Lookup515: pallet_staking::UnappliedSlash<sp_core::crypto::AccountId32, Balance>
   **/
  PalletStakingUnappliedSlash: {
    validator: 'AccountId32',
    own: 'u128',
    others: 'Vec<(AccountId32,u128)>',
    reporters: 'Vec<AccountId32>',
    payout: 'u128'
  },
  /**
   * Lookup517: pallet_staking::slashing::SlashingSpans
   **/
  PalletStakingSlashingSlashingSpans: {
    spanIndex: 'u32',
    lastStart: 'u32',
    lastNonzeroSlash: 'u32',
    prior: 'Vec<u32>'
  },
  /**
   * Lookup518: pallet_staking::slashing::SpanRecord<Balance>
   **/
  PalletStakingSlashingSpanRecord: {
    slashed: 'u128',
    paidOut: 'u128'
  },
  /**
   * Lookup521: pallet_staking::Releases
   **/
  PalletStakingReleases: {
    _enum: ['V1_0_0Ancient', 'V2_0_0', 'V3_0_0', 'V4_0_0', 'V5_0_0', 'V6_0_0', 'V7_0_0', 'V8_0_0', 'V9_0_0']
  },
  /**
   * Lookup522: pallet_staking::pallet::pallet::Error<T>
   **/
  PalletStakingPalletError: {
    _enum: ['NotController', 'NotStash', 'AlreadyBonded', 'AlreadyPaired', 'EmptyTargets', 'DuplicateIndex', 'InvalidSlashIndex', 'InsufficientBond', 'NoMoreChunks', 'NoUnlockChunk', 'FundedTarget', 'InvalidEraToReward', 'InvalidNumberOfNominations', 'NotSortedAndUnique', 'AlreadyClaimed', 'IncorrectHistoryDepth', 'IncorrectSlashingSpans', 'BadState', 'TooManyTargets', 'BadTarget', 'CannotChillOther', 'TooManyNominators', 'TooManyValidators', 'CommissionTooLow']
  },
  /**
   * Lookup523: sp_staking::offence::OffenceDetails<sp_core::crypto::AccountId32, Offender>
   **/
  SpStakingOffenceOffenceDetails: {
    offender: '(AccountId32,PalletStakingExposure)',
    reporters: 'Vec<AccountId32>'
  },
  /**
   * Lookup528: sp_core::crypto::KeyTypeId
   **/
  SpCoreCryptoKeyTypeId: '[u8;4]',
  /**
   * Lookup529: pallet_session::pallet::Error<T>
   **/
  PalletSessionError: {
    _enum: ['InvalidProof', 'NoAssociatedValidatorId', 'DuplicatedKey', 'NoKeys', 'NoAccount']
  },
  /**
   * Lookup530: pallet_grandpa::StoredState<N>
   **/
  PalletGrandpaStoredState: {
    _enum: {
      Live: 'Null',
      PendingPause: {
        scheduledAt: 'u32',
        delay: 'u32',
      },
      Paused: 'Null',
      PendingResume: {
        scheduledAt: 'u32',
        delay: 'u32'
      }
    }
  },
  /**
   * Lookup531: pallet_grandpa::StoredPendingChange<N, Limit>
   **/
  PalletGrandpaStoredPendingChange: {
    scheduledAt: 'u32',
    delay: 'u32',
    nextAuthorities: 'Vec<(SpFinalityGrandpaAppPublic,u64)>',
    forced: 'Option<u32>'
  },
  /**
   * Lookup533: pallet_grandpa::pallet::Error<T>
   **/
  PalletGrandpaError: {
    _enum: ['PauseFailed', 'ResumeFailed', 'ChangePending', 'TooSoon', 'InvalidKeyOwnershipProof', 'InvalidEquivocationProof', 'DuplicateOffenceReport']
  },
  /**
   * Lookup537: pallet_im_online::BoundedOpaqueNetworkState<PeerIdEncodingLimit, MultiAddrEncodingLimit, AddressesLimit>
   **/
  PalletImOnlineBoundedOpaqueNetworkState: {
    peerId: 'Bytes',
    externalAddresses: 'Vec<Bytes>'
  },
  /**
   * Lookup541: pallet_im_online::pallet::Error<T>
   **/
  PalletImOnlineError: {
    _enum: ['InvalidKey', 'DuplicatedHeartbeat']
  },
  /**
   * Lookup544: orml_tokens::BalanceLock<Balance>
   **/
  OrmlTokensBalanceLock: {
    id: '[u8;8]',
    amount: 'u128'
  },
  /**
   * Lookup546: orml_tokens::AccountData<Balance>
   **/
  OrmlTokensAccountData: {
    free: 'u128',
    reserved: 'u128',
    frozen: 'u128'
  },
  /**
   * Lookup548: orml_tokens::ReserveData<ReserveIdentifier, Balance>
   **/
  OrmlTokensReserveData: {
    id: 'Null',
    amount: 'u128'
  },
  /**
   * Lookup550: orml_tokens::module::Error<T>
   **/
  OrmlTokensModuleError: {
    _enum: ['BalanceTooLow', 'AmountIntoBalanceFailed', 'LiquidityRestrictions', 'MaxLocksExceeded', 'KeepAlive', 'ExistentialDeposit', 'DeadAccount', 'TooManyReserves']
  },
  /**
   * Lookup551: orml_currencies::module::Error<T>
   **/
  OrmlCurrenciesModuleError: {
    _enum: ['AmountIntoBalanceFailed', 'BalanceTooLow', 'DepositFailed']
  },
  /**
   * Lookup554: trading_pair::pallet::Error<T>
   **/
  TradingPairError: {
    _enum: ['TradingPairExists', 'ForbiddenBaseAssetId', 'IdenticalAssetIds', 'TradingPairDoesntExist']
  },
  /**
   * Lookup556: assets::AssetRecord<T>
   **/
  AssetsAssetRecord: {
    _enum: {
      Arity0: 'Null',
      Arity1: 'AssetsAssetRecordArg',
      Arity2: '(AssetsAssetRecordArg,AssetsAssetRecordArg)',
      Arity3: '(AssetsAssetRecordArg,AssetsAssetRecordArg,AssetsAssetRecordArg)',
      Arity4: '(AssetsAssetRecordArg,AssetsAssetRecordArg,AssetsAssetRecordArg,AssetsAssetRecordArg)',
      Arity5: '(AssetsAssetRecordArg,AssetsAssetRecordArg,AssetsAssetRecordArg,AssetsAssetRecordArg,AssetsAssetRecordArg)',
      Arity6: '(AssetsAssetRecordArg,AssetsAssetRecordArg,AssetsAssetRecordArg,AssetsAssetRecordArg,AssetsAssetRecordArg,AssetsAssetRecordArg)',
      Arity7: '(AssetsAssetRecordArg,AssetsAssetRecordArg,AssetsAssetRecordArg,AssetsAssetRecordArg,AssetsAssetRecordArg,AssetsAssetRecordArg,AssetsAssetRecordArg)',
      Arity8: '(AssetsAssetRecordArg,AssetsAssetRecordArg,AssetsAssetRecordArg,AssetsAssetRecordArg,AssetsAssetRecordArg,AssetsAssetRecordArg,AssetsAssetRecordArg,AssetsAssetRecordArg)',
      Arity9: '(AssetsAssetRecordArg,AssetsAssetRecordArg,AssetsAssetRecordArg,AssetsAssetRecordArg,AssetsAssetRecordArg,AssetsAssetRecordArg,AssetsAssetRecordArg,AssetsAssetRecordArg,AssetsAssetRecordArg)'
    }
  },
  /**
   * Lookup557: assets::AssetRecordArg<T>
   **/
  AssetsAssetRecordArg: {
    _enum: {
      GenericI32: 'i32',
      GenericU64: 'u64',
      GenericU128: 'u128',
      GenericU8x32: '[u8;32]',
      GenericH256: 'H256',
      GenericH512: 'H512',
      LeafAssetId: 'CommonPrimitivesAssetId32',
      AssetRecordAssetId: 'CommonPrimitivesAssetId32',
      Extra: 'CommonPrimitivesAssetIdExtraAssetRecordArg'
    }
  },
  /**
   * Lookup559: common::primitives::AssetIdExtraAssetRecordArg<DEXId, common::primitives::LiquiditySourceType, AccountId>
   **/
  CommonPrimitivesAssetIdExtraAssetRecordArg: {
    _enum: {
      DEXId: 'u32',
      LstId: 'CommonPrimitivesLiquiditySourceType',
      AccountId: '[u8;32]'
    }
  },
  /**
   * Lookup560: assets::pallet::Error<T>
   **/
  AssetsError: {
    _enum: ['AssetIdAlreadyExists', 'AssetIdNotExists', 'InsufficientBalance', 'InvalidAssetSymbol', 'InvalidAssetName', 'InvalidPrecision', 'AssetSupplyIsNotMintable', 'InvalidAssetOwner', 'IncRefError', 'InvalidContentSource', 'InvalidDescription', 'DeadAsset']
  },
  /**
   * Lookup561: common::primitives::DEXInfo<common::primitives::AssetId32<common::primitives::PredefinedAssetId>>
   **/
  CommonPrimitivesDexInfo: {
    baseAssetId: 'CommonPrimitivesAssetId32',
    isPublic: 'bool'
  },
  /**
   * Lookup562: dex_manager::pallet::Error<T>
   **/
  DexManagerError: {
    _enum: ['DEXIdAlreadyExists', 'DEXDoesNotExist', 'InvalidFeeValue', 'InvalidAccountId']
  },
  /**
   * Lookup565: multicollateral_bonding_curve_pool::DistributionAccounts<multicollateral_bonding_curve_pool::DistributionAccountData<multicollateral_bonding_curve_pool::DistributionAccount<sp_core::crypto::AccountId32, common::primitives::TechAccountId<sp_core::crypto::AccountId32, common::primitives::TechAssetId<common::primitives::PredefinedAssetId>, DEXId>>>>
   **/
  MulticollateralBondingCurvePoolDistributionAccounts: {
    xorAllocation: 'MulticollateralBondingCurvePoolDistributionAccountData',
    valHolders: 'MulticollateralBondingCurvePoolDistributionAccountData',
    soraCitizens: 'MulticollateralBondingCurvePoolDistributionAccountData',
    storesAndShops: 'MulticollateralBondingCurvePoolDistributionAccountData',
    parliamentAndDevelopment: 'MulticollateralBondingCurvePoolDistributionAccountData',
    projects: 'MulticollateralBondingCurvePoolDistributionAccountData'
  },
  /**
   * Lookup566: multicollateral_bonding_curve_pool::DistributionAccountData<multicollateral_bonding_curve_pool::DistributionAccount<sp_core::crypto::AccountId32, common::primitives::TechAccountId<sp_core::crypto::AccountId32, common::primitives::TechAssetId<common::primitives::PredefinedAssetId>, DEXId>>>
   **/
  MulticollateralBondingCurvePoolDistributionAccountData: {
    account: 'MulticollateralBondingCurvePoolDistributionAccount',
    coefficient: 'FixnumFixedPoint'
  },
  /**
   * Lookup567: multicollateral_bonding_curve_pool::DistributionAccount<sp_core::crypto::AccountId32, common::primitives::TechAccountId<sp_core::crypto::AccountId32, common::primitives::TechAssetId<common::primitives::PredefinedAssetId>, DEXId>>
   **/
  MulticollateralBondingCurvePoolDistributionAccount: {
    _enum: {
      Account: 'AccountId32',
      TechAccount: 'CommonPrimitivesTechAccountId'
    }
  },
  /**
   * Lookup570: multicollateral_bonding_curve_pool::pallet::Error<T>
   **/
  MulticollateralBondingCurvePoolError: {
    _enum: ['PriceCalculationFailed', 'FailedToCalculatePriceWithoutImpact', 'CannotExchangeWithSelf', 'NotEnoughReserves', 'PoolAlreadyInitializedForPair', 'PoolNotInitialized', 'SlippageLimitExceeded', 'NothingToClaim', 'RewardsSupplyShortage', 'UnsupportedCollateralAssetId', 'FeeCalculationFailed', 'CantExchange', 'IncRefError', 'ArithmeticError', 'FreeReservesAccountNotSet']
  },
  /**
   * Lookup571: technical::pallet::Error<T>
   **/
  TechnicalError: {
    _enum: ['StorageOverflow', 'InsufficientBalance', 'AlreadyExist', 'InvalidProof', 'SourceMismatch', 'AlreadyClaimed', 'ClaimActionMismatch', 'DurationNotPassed', 'OnlyRegularAsset', 'OnlyRegularAccount', 'OnlyRegularBalance', 'OnlyPureTechnicalAccount', 'Overflow', 'TechAccountIdMustBePure', 'UnableToGetReprFromTechAccountId', 'RepresentativeMustBeSupported', 'TechAccountIdIsNotRegistered', 'NotImplemented', 'DecodeAccountIdFailed', 'AssociatedAccountIdNotFound', 'OperationWithAbstractCheckingIsImposible']
  },
  /**
   * Lookup574: pool_xyk::pallet::Error<T>
   **/
  PoolXykError: {
    _enum: ['UnableToCalculateFee', 'FailedToCalculatePriceWithoutImpact', 'UnableToGetBalance', 'ImpossibleToDecideAssetPairAmounts', 'PoolPairRatioAndPairSwapRatioIsDifferent', 'PairSwapActionFeeIsSmallerThanRecommended', 'SourceBalanceIsNotLargeEnough', 'TargetBalanceIsNotLargeEnough', 'UnableToDeriveFeeAccount', 'FeeAccountIsInvalid', 'SourceAndClientAccountDoNotMatchAsEqual', 'AssetsMustNotBeSame', 'ImpossibleToDecideDepositLiquidityAmounts', 'InvalidDepositLiquidityBasicAssetAmount', 'InvalidDepositLiquidityTargetAssetAmount', 'PairSwapActionMinimumLiquidityIsSmallerThanRecommended', 'DestinationAmountOfLiquidityIsNotLargeEnough', 'SourceBaseAmountIsNotLargeEnough', 'TargetBaseAmountIsNotLargeEnough', 'PoolIsInvalid', 'PoolIsEmpty', 'ZeroValueInAmountParameter', 'AccountBalanceIsInvalid', 'InvalidDepositLiquidityDestinationAmount', 'InitialLiqudityDepositRatioMustBeDefined', 'TechAssetIsNotRepresentable', 'UnableToDecideMarkerAsset', 'UnableToGetAssetRepr', 'ImpossibleToDecideWithdrawLiquidityAmounts', 'InvalidWithdrawLiquidityBasicAssetAmount', 'InvalidWithdrawLiquidityTargetAssetAmount', 'SourceBaseAmountIsTooLarge', 'SourceBalanceOfLiquidityTokensIsNotLargeEnough', 'DestinationBaseBalanceIsNotLargeEnough', 'DestinationTargetBalanceIsNotLargeEnough', 'InvalidAssetForLiquidityMarking', 'AssetDecodingError', 'CalculatedValueIsOutOfDesiredBounds', 'BaseAssetIsNotMatchedWithAnyAssetArguments', 'DestinationAmountMustBeSame', 'SourceAmountMustBeSame', 'PoolInitializationIsInvalid', 'PoolIsAlreadyInitialized', 'InvalidMinimumBoundValueOfBalance', 'ImpossibleToDecideValidPairValuesFromRangeForThisPool', 'RangeValuesIsInvalid', 'CalculatedValueIsNotMeetsRequiredBoundaries', 'GettingFeeFromDestinationIsImpossible', 'FixedWrapperCalculationFailed', 'ThisCaseIsNotSupported', 'PoolBecameInvalidAfterOperation', 'UnableToConvertAssetToTechAssetId', 'UnableToGetXORPartFromMarkerAsset', 'PoolTokenSupplyOverflow', 'IncRefError', 'UnableToDepositXorLessThanMinimum', 'UnsupportedQuotePath', 'NotEnoughUnlockedLiquidity', 'UnableToCreatePoolWithIndivisibleAssets', 'UnableToOperateWithIndivisibleAssets', 'NotEnoughLiquidityOutOfFarming']
  },
  /**
   * Lookup575: liquidity_proxy::pallet::Error<T>
   **/
  LiquidityProxyError: {
    _enum: ['UnavailableExchangePath', 'MaxFeeExceeded', 'InvalidFeeValue', 'InsufficientLiquidity', 'AggregationError', 'CalculationError', 'SlippageNotTolerated', 'ForbiddenFilter', 'FailedToCalculatePriceWithoutImpact', 'UnableToSwapIndivisibleAssets']
  },
  /**
   * Lookup577: pallet_collective::Votes<sp_core::crypto::AccountId32, BlockNumber>
   **/
  PalletCollectiveVotes: {
    index: 'u32',
    threshold: 'u32',
    ayes: 'Vec<AccountId32>',
    nays: 'Vec<AccountId32>',
    end: 'u32'
  },
  /**
   * Lookup578: pallet_collective::pallet::Error<T, I>
   **/
  PalletCollectiveError: {
    _enum: ['NotMember', 'DuplicateProposal', 'ProposalMissing', 'WrongIndex', 'DuplicateVote', 'AlreadyInitialized', 'TooEarly', 'TooManyProposals', 'WrongProposalWeight', 'WrongProposalLength']
  },
  /**
   * Lookup584: pallet_democracy::PreimageStatus<sp_core::crypto::AccountId32, Balance, BlockNumber>
   **/
  PalletDemocracyPreimageStatus: {
    _enum: {
      Missing: 'u32',
      Available: {
        data: 'Bytes',
        provider: 'AccountId32',
        deposit: 'u128',
        since: 'u32',
        expiry: 'Option<u32>'
      }
    }
  },
  /**
   * Lookup585: pallet_democracy::types::ReferendumInfo<BlockNumber, primitive_types::H256, Balance>
   **/
  PalletDemocracyReferendumInfo: {
    _enum: {
      Ongoing: 'PalletDemocracyReferendumStatus',
      Finished: {
        approved: 'bool',
        end: 'u32'
      }
    }
  },
  /**
   * Lookup586: pallet_democracy::types::ReferendumStatus<BlockNumber, primitive_types::H256, Balance>
   **/
  PalletDemocracyReferendumStatus: {
    end: 'u32',
    proposalHash: 'H256',
    threshold: 'PalletDemocracyVoteThreshold',
    delay: 'u32',
    tally: 'PalletDemocracyTally'
  },
  /**
   * Lookup587: pallet_democracy::types::Tally<Balance>
   **/
  PalletDemocracyTally: {
    ayes: 'u128',
    nays: 'u128',
    turnout: 'u128'
  },
  /**
   * Lookup588: pallet_democracy::vote::Voting<Balance, sp_core::crypto::AccountId32, BlockNumber>
   **/
  PalletDemocracyVoteVoting: {
    _enum: {
      Direct: {
        votes: 'Vec<(u32,PalletDemocracyVoteAccountVote)>',
        delegations: 'PalletDemocracyDelegations',
        prior: 'PalletDemocracyVotePriorLock',
      },
      Delegating: {
        balance: 'u128',
        target: 'AccountId32',
        conviction: 'PalletDemocracyConviction',
        delegations: 'PalletDemocracyDelegations',
        prior: 'PalletDemocracyVotePriorLock'
      }
    }
  },
  /**
   * Lookup591: pallet_democracy::types::Delegations<Balance>
   **/
  PalletDemocracyDelegations: {
    votes: 'u128',
    capital: 'u128'
  },
  /**
   * Lookup592: pallet_democracy::vote::PriorLock<BlockNumber, Balance>
   **/
  PalletDemocracyVotePriorLock: '(u32,u128)',
  /**
   * Lookup595: pallet_democracy::Releases
   **/
  PalletDemocracyReleases: {
    _enum: ['V1']
  },
  /**
   * Lookup596: pallet_democracy::pallet::Error<T>
   **/
  PalletDemocracyError: {
    _enum: ['ValueLow', 'ProposalMissing', 'AlreadyCanceled', 'DuplicateProposal', 'ProposalBlacklisted', 'NotSimpleMajority', 'InvalidHash', 'NoProposal', 'AlreadyVetoed', 'DuplicatePreimage', 'NotImminent', 'TooEarly', 'Imminent', 'PreimageMissing', 'ReferendumInvalid', 'PreimageInvalid', 'NoneWaiting', 'NotVoter', 'NoPermission', 'AlreadyDelegating', 'InsufficientFunds', 'NotDelegating', 'VotesExist', 'InstantNotAllowed', 'Nonsense', 'WrongUpperBound', 'MaxVotesReached', 'TooManyProposals', 'VotingPeriodLow']
  },
  /**
   * Lookup598: eth_bridge::requests::OffchainRequest<T>
   **/
  EthBridgeRequestsOffchainRequest: {
    _enum: {
      Outgoing: '(EthBridgeRequestsOutgoingRequest,H256)',
      LoadIncoming: 'EthBridgeRequestsLoadIncomingRequest',
      Incoming: '(EthBridgeRequestsIncomingRequest,H256)'
    }
  },
  /**
   * Lookup599: eth_bridge::requests::RequestStatus
   **/
  EthBridgeRequestsRequestStatus: {
    _enum: {
      Pending: 'Null',
      Frozen: 'Null',
      ApprovalsReady: 'Null',
      Failed: 'SpRuntimeDispatchError',
      Done: 'Null',
      Broken: '(SpRuntimeDispatchError,SpRuntimeDispatchError)'
    }
  },
  /**
   * Lookup606: eth_bridge::requests::outgoing::EthPeersSync
   **/
  EthBridgeRequestsOutgoingEthPeersSync: {
    isBridgeReady: 'bool',
    isXorReady: 'bool',
    isValReady: 'bool'
  },
  /**
   * Lookup607: eth_bridge::BridgeStatus
   **/
  EthBridgeBridgeStatus: {
    _enum: ['Initialized', 'Migrating']
  },
  /**
   * Lookup611: eth_bridge::pallet::Error<T>
   **/
  EthBridgeError: {
    _enum: ['HttpFetchingError', 'AccountNotFound', 'Forbidden', 'RequestIsAlreadyRegistered', 'FailedToLoadTransaction', 'FailedToLoadPrecision', 'UnknownMethodId', 'InvalidFunctionInput', 'InvalidSignature', 'InvalidUint', 'InvalidAmount', 'InvalidBalance', 'InvalidString', 'InvalidByte', 'InvalidAddress', 'InvalidAssetId', 'InvalidAccountId', 'InvalidBool', 'InvalidH256', 'InvalidArray', 'UnknownEvent', 'UnknownTokenAddress', 'NoLocalAccountForSigning', 'UnsupportedAssetId', 'FailedToSignMessage', 'FailedToSendSignedTransaction', 'TokenIsNotOwnedByTheAuthor', 'TokenIsAlreadyAdded', 'DuplicatedRequest', 'UnsupportedToken', 'UnknownPeerAddress', 'EthAbiEncodingError', 'EthAbiDecodingError', 'EthTransactionIsFailed', 'EthTransactionIsSucceeded', 'EthTransactionIsPending', 'EthLogWasRemoved', 'NoPendingPeer', 'WrongPendingPeer', 'TooManyPendingPeers', 'FailedToGetAssetById', 'CantAddMorePeers', 'CantRemoveMorePeers', 'PeerIsAlreadyAdded', 'UnknownPeerId', 'CantReserveFunds', 'AlreadyClaimed', 'FailedToLoadBlockHeader', 'FailedToLoadFinalizedHead', 'UnknownContractAddress', 'InvalidContractInput', 'RequestIsNotOwnedByTheAuthor', 'FailedToParseTxHashInCall', 'RequestIsNotReady', 'UnknownRequest', 'RequestNotFinalizedOnSidechain', 'UnknownNetwork', 'ContractIsInMigrationStage', 'ContractIsNotInMigrationStage', 'ContractIsAlreadyInMigrationStage', 'Unavailable', 'FailedToUnreserve', 'SidechainAssetIsAlreadyRegistered', 'ExpectedOutgoingRequest', 'ExpectedIncomingRequest', 'UnknownAssetId', 'JsonSerializationError', 'JsonDeserializationError', 'FailedToLoadSidechainNodeParams', 'FailedToLoadCurrentSidechainHeight', 'FailedToLoadIsUsed', 'TransactionMightHaveFailedDueToGasLimit', 'ExpectedXORTransfer', 'UnableToPayFees', 'Cancelled', 'UnsupportedAssetPrecision', 'NonZeroDust', 'IncRefError', 'Other', 'ExpectedPendingRequest', 'ExpectedEthNetwork', 'RemovedAndRefunded', 'AuthorityAccountNotSet', 'NotEnoughPeers', 'ReadStorageError']
  },
  /**
   * Lookup614: pswap_distribution::pallet::Error<T>
   **/
  PswapDistributionError: {
    _enum: ['CalculationError', 'SubscriptionActive', 'UnknownSubscription', 'InvalidFrequency', 'ZeroClaimableIncentives', 'IncRefError']
  },
  /**
   * Lookup620: pallet_scheduler::ScheduledV3<frame_support::traits::schedule::MaybeHashed<framenode_runtime::Call, primitive_types::H256>, BlockNumber, framenode_runtime::OriginCaller, sp_core::crypto::AccountId32>
   **/
  PalletSchedulerScheduledV3: {
    maybeId: 'Option<Bytes>',
    priority: 'u8',
    call: 'FrameSupportScheduleMaybeHashed',
    maybePeriodic: 'Option<(u32,u32)>',
    origin: 'FramenodeRuntimeOriginCaller'
  },
  /**
   * Lookup621: pallet_scheduler::pallet::Error<T>
   **/
  PalletSchedulerError: {
    _enum: ['FailedToSchedule', 'NotFound', 'TargetBlockNumberInPast', 'RescheduleNoChange']
  },
  /**
   * Lookup624: iroha_migration::PendingMultisigAccount<T>
   **/
  IrohaMigrationPendingMultisigAccount: {
    approvingAccounts: 'Vec<AccountId32>',
    migrateAt: 'Option<u32>'
  },
  /**
   * Lookup625: iroha_migration::pallet::Error<T>
   **/
  IrohaMigrationError: {
    _enum: ['PublicKeyParsingFailed', 'SignatureParsingFailed', 'SignatureVerificationFailed', 'AccountNotFound', 'PublicKeyNotFound', 'PublicKeyAlreadyUsed', 'AccountAlreadyMigrated', 'ReferralMigrationFailed', 'MultiSigCreationFailed', 'SignatoryAdditionFailed']
  },
  /**
   * Lookup627: pallet_membership::pallet::Error<T, I>
   **/
  PalletMembershipError: {
    _enum: ['AlreadyMember', 'NotMember', 'TooManyMembers']
  },
  /**
   * Lookup629: pallet_elections_phragmen::SeatHolder<sp_core::crypto::AccountId32, Balance>
   **/
  PalletElectionsPhragmenSeatHolder: {
    who: 'AccountId32',
    stake: 'u128',
    deposit: 'u128'
  },
  /**
   * Lookup630: pallet_elections_phragmen::Voter<sp_core::crypto::AccountId32, Balance>
   **/
  PalletElectionsPhragmenVoter: {
    votes: 'Vec<AccountId32>',
    stake: 'u128',
    deposit: 'u128'
  },
  /**
   * Lookup631: pallet_elections_phragmen::pallet::Error<T>
   **/
  PalletElectionsPhragmenError: {
    _enum: ['UnableToVote', 'NoVotes', 'TooManyVotes', 'MaximumVotesExceeded', 'LowBalance', 'UnableToPayBond', 'MustBeVoter', 'DuplicatedCandidate', 'TooManyCandidates', 'MemberSubmit', 'RunnerUpSubmit', 'InsufficientCandidateFunds', 'NotMember', 'InvalidWitnessData', 'InvalidVoteCount', 'InvalidRenouncing', 'InvalidReplacement']
  },
  /**
   * Lookup632: vested_rewards::RewardInfo
   **/
  VestedRewardsRewardInfo: {
    limit: 'u128',
    totalAvailable: 'u128',
    rewards: 'BTreeMap<CommonPrimitivesRewardReason, u128>'
  },
  /**
   * Lookup636: vested_rewards::MarketMakerInfo
   **/
  VestedRewardsMarketMakerInfo: {
    count: 'u32',
    volume: 'u128'
  },
  /**
   * Lookup637: vested_rewards::CrowdloanReward
   **/
  VestedRewardsCrowdloanReward: {
    id: 'Bytes',
    address: 'Bytes',
    contribution: 'FixnumFixedPoint',
    xorReward: 'FixnumFixedPoint',
    valReward: 'FixnumFixedPoint',
    pswapReward: 'FixnumFixedPoint',
    xstusdReward: 'FixnumFixedPoint',
    percent: 'FixnumFixedPoint'
  },
  /**
   * Lookup638: vested_rewards::pallet::Error<T>
   **/
  VestedRewardsError: {
    _enum: ['NothingToClaim', 'ClaimLimitExceeded', 'UnhandledRewardType', 'RewardsSupplyShortage', 'IncRefError', 'CantSubtractSnapshot', 'CantCalculateReward', 'MarketMakingPairAlreadyAllowed', 'MarketMakingPairAlreadyDisallowed', 'NoRewardsForAsset', 'ArithmeticError', 'NumberConversionError']
  },
  /**
   * Lookup639: pallet_identity::types::Registration<Balance, MaxJudgements, MaxAdditionalFields>
   **/
  PalletIdentityRegistration: {
    judgements: 'Vec<(u32,PalletIdentityJudgement)>',
    deposit: 'u128',
    info: 'PalletIdentityIdentityInfo'
  },
  /**
   * Lookup647: pallet_identity::types::RegistrarInfo<Balance, sp_core::crypto::AccountId32>
   **/
  PalletIdentityRegistrarInfo: {
    account: 'AccountId32',
    fee: 'u128',
    fields: 'PalletIdentityBitFlags'
  },
  /**
   * Lookup649: pallet_identity::pallet::Error<T>
   **/
  PalletIdentityError: {
    _enum: ['TooManySubAccounts', 'NotFound', 'NotNamed', 'EmptyIndex', 'FeeChanged', 'NoIdentity', 'StickyJudgement', 'JudgementGiven', 'InvalidJudgement', 'InvalidIndex', 'InvalidTarget', 'TooManyFields', 'TooManyRegistrars', 'AlreadyClaimed', 'NotSub', 'NotOwned']
  },
  /**
   * Lookup651: farming::PoolFarmer<T>
   **/
  FarmingPoolFarmer: {
    account: 'AccountId32',
    block: 'u32',
    weight: 'u128'
  },
  /**
   * Lookup652: farming::pallet::Error<T>
   **/
  FarmingError: {
    _enum: ['IncRefError']
  },
  /**
   * Lookup653: xst::pallet::Error<T>
   **/
  XstError: {
    _enum: ['PriceCalculationFailed', 'FailedToCalculatePriceWithoutImpact', 'CannotExchangeWithSelf', 'PoolAlreadyInitializedForPair', 'PoolNotInitialized', 'SlippageLimitExceeded', 'UnsupportedCollateralAssetId', 'FeeCalculationFailed', 'CantExchange', 'IncRefError']
  },
  /**
   * Lookup654: price_tools::PriceInfo
   **/
  PriceToolsPriceInfo: {
    priceFailures: 'u32',
    spotPrices: 'Vec<u128>',
    averagePrice: 'u128',
    needsUpdate: 'bool',
    lastSpotPrice: 'u128'
  },
  /**
   * Lookup655: price_tools::pallet::Error<T>
   **/
  PriceToolsError: {
    _enum: ['AveragePriceCalculationFailed', 'UpdateAverageWithSpotPriceFailed', 'InsufficientSpotPriceData', 'UnsupportedQuotePath', 'FailedToQuoteAveragePrice', 'AssetAlreadyRegistered', 'CantDuplicateLastPrice']
  },
  /**
   * Lookup656: ceres_staking::StakingInfo
   **/
  CeresStakingStakingInfo: {
    deposited: 'u128',
    rewards: 'u128'
  },
  /**
   * Lookup657: ceres_staking::pallet::Error<T>
   **/
  CeresStakingError: {
    _enum: ['StakingPoolIsFull', 'Unauthorized']
  },
  /**
   * Lookup658: ceres_liquidity_locker::StorageVersion
   **/
  CeresLiquidityLockerStorageVersion: {
    _enum: ['V1', 'V2']
  },
  /**
   * Lookup660: ceres_liquidity_locker::LockInfo<Balance, Moment, common::primitives::AssetId32<common::primitives::PredefinedAssetId>>
   **/
  CeresLiquidityLockerLockInfo: {
    poolTokens: 'u128',
    unlockingTimestamp: 'u64',
    assetA: 'CommonPrimitivesAssetId32',
    assetB: 'CommonPrimitivesAssetId32'
  },
  /**
   * Lookup661: ceres_liquidity_locker::pallet::Error<T>
   **/
  CeresLiquidityLockerError: {
    _enum: ['PoolDoesNotExist', 'InsufficientLiquidityToLock', 'InvalidPercentage', 'Unauthorized', 'InvalidUnlockingTimestamp']
  },
  /**
   * Lookup662: ceres_token_locker::StorageVersion
   **/
  CeresTokenLockerStorageVersion: {
    _enum: ['V1', 'V2']
  },
  /**
   * Lookup664: ceres_token_locker::TokenLockInfo<Balance, Moment, common::primitives::AssetId32<common::primitives::PredefinedAssetId>>
   **/
  CeresTokenLockerTokenLockInfo: {
    tokens: 'u128',
    unlockingTimestamp: 'u64',
    assetId: 'CommonPrimitivesAssetId32'
  },
  /**
   * Lookup665: ceres_token_locker::pallet::Error<T>
   **/
  CeresTokenLockerError: {
    _enum: ['InvalidNumberOfTokens', 'Unauthorized', 'InvalidUnlockingTimestamp', 'NotEnoughFunds', 'NotUnlockedYet', 'LockInfoDoesNotExist']
  },
  /**
   * Lookup667: ceres_governance_platform::VotingInfo
   **/
  CeresGovernancePlatformVotingInfo: {
    votingOption: 'u32',
    numberOfVotes: 'u128',
    ceresWithdrawn: 'bool'
  },
  /**
   * Lookup668: ceres_governance_platform::PollInfo<Moment>
   **/
  CeresGovernancePlatformPollInfo: {
    numberOfOptions: 'u32',
    pollStartTimestamp: 'u64',
    pollEndTimestamp: 'u64'
  },
  /**
   * Lookup669: ceres_governance_platform::StorageVersion
   **/
  CeresGovernancePlatformStorageVersion: {
    _enum: ['V1', 'V2']
  },
  /**
   * Lookup670: ceres_governance_platform::pallet::Error<T>
   **/
  CeresGovernancePlatformError: {
    _enum: ['InvalidVotes', 'PollIsFinished', 'PollIsNotStarted', 'NotEnoughFunds', 'InvalidNumberOfOption', 'VoteDenied', 'InvalidStartTimestamp', 'InvalidEndTimestamp', 'PollIsNotFinished', 'InvalidNumberOfVotes', 'FundsAlreadyWithdrawn', 'PollIdAlreadyExists']
  },
  /**
   * Lookup671: ceres_launchpad::ILOInfo<Balance, sp_core::crypto::AccountId32, Moment>
   **/
  CeresLaunchpadIloInfo: {
    iloOrganizer: 'AccountId32',
    tokensForIlo: 'u128',
    tokensForLiquidity: 'u128',
    iloPrice: 'u128',
    softCap: 'u128',
    hardCap: 'u128',
    minContribution: 'u128',
    maxContribution: 'u128',
    refundType: 'bool',
    liquidityPercent: 'u128',
    listingPrice: 'u128',
    lockupDays: 'u32',
    startTimestamp: 'u64',
    endTimestamp: 'u64',
    contributorsVesting: 'CeresLaunchpadContributorsVesting',
    teamVesting: 'CeresLaunchpadTeamVesting',
    soldTokens: 'u128',
    fundsRaised: 'u128',
    succeeded: 'bool',
    failed: 'bool',
    lpTokens: 'u128',
    claimedLpTokens: 'bool',
    finishTimestamp: 'u64'
  },
  /**
   * Lookup672: ceres_launchpad::ContributorsVesting<Balance, Moment>
   **/
  CeresLaunchpadContributorsVesting: {
    firstReleasePercent: 'u128',
    vestingPeriod: 'u64',
    vestingPercent: 'u128'
  },
  /**
   * Lookup673: ceres_launchpad::TeamVesting<Balance, Moment>
   **/
  CeresLaunchpadTeamVesting: {
    teamVestingTotalTokens: 'u128',
    teamVestingFirstReleasePercent: 'u128',
    teamVestingPeriod: 'u64',
    teamVestingPercent: 'u128'
  },
  /**
   * Lookup675: ceres_launchpad::ContributionInfo<Balance>
   **/
  CeresLaunchpadContributionInfo: {
    fundsContributed: 'u128',
    tokensBought: 'u128',
    tokensClaimed: 'u128',
    claimingFinished: 'bool',
    numberOfClaims: 'u32'
  },
  /**
   * Lookup676: ceres_launchpad::pallet::Error<T>
   **/
  CeresLaunchpadError: {
    _enum: ['ILOAlreadyExists', 'ParameterCantBeZero', 'InvalidSoftCap', 'InvalidMinimumContribution', 'InvalidMaximumContribution', 'InvalidLiquidityPercent', 'InvalidLockupDays', 'InvalidStartTimestamp', 'InvalidEndTimestamp', 'InvalidPrice', 'InvalidNumberOfTokensForLiquidity', 'InvalidNumberOfTokensForILO', 'InvalidFirstReleasePercent', 'InvalidVestingPercent', 'InvalidVestingPeriod', 'NotEnoughCeres', 'NotEnoughTokens', 'ILONotStarted', 'ILOIsFinished', 'CantContributeInILO', 'HardCapIsHit', 'NotEnoughTokensToBuy', 'ContributionIsLowerThenMin', 'ContributionIsBiggerThenMax', 'NotEnoughFunds', 'ILODoesNotExist', 'ILOIsNotFinished', 'PoolDoesNotExist', 'Unauthorized', 'CantClaimLPTokens', 'FundsAlreadyClaimed', 'NothingToClaim', 'ILOIsFailed', 'ILOIsSucceeded', 'CantCreateILOForListedToken', 'AccountIsNotWhitelisted', 'InvalidTeamFirstReleasePercent', 'InvalidTeamVestingPercent', 'InvalidTeamVestingPeriod', 'NotEnoughTeamTokensToLock']
  },
  /**
   * Lookup677: demeter_farming_platform::TokenInfo<sp_core::crypto::AccountId32>
   **/
  DemeterFarmingPlatformTokenInfo: {
    farmsTotalMultiplier: 'u32',
    stakingTotalMultiplier: 'u32',
    tokenPerBlock: 'u128',
    farmsAllocation: 'u128',
    stakingAllocation: 'u128',
    teamAllocation: 'u128',
    teamAccount: 'AccountId32'
  },
  /**
   * Lookup679: demeter_farming_platform::UserInfo<common::primitives::AssetId32<common::primitives::PredefinedAssetId>>
   **/
  DemeterFarmingPlatformUserInfo: {
    poolAsset: 'CommonPrimitivesAssetId32',
    rewardAsset: 'CommonPrimitivesAssetId32',
    isFarm: 'bool',
    pooledTokens: 'u128',
    rewards: 'u128'
  },
  /**
   * Lookup681: demeter_farming_platform::PoolData
   **/
  DemeterFarmingPlatformPoolData: {
    multiplier: 'u32',
    depositFee: 'u128',
    isCore: 'bool',
    isFarm: 'bool',
    totalTokensInPool: 'u128',
    rewards: 'u128',
    rewardsToBeDistributed: 'u128',
    isRemoved: 'bool'
  },
  /**
   * Lookup682: demeter_farming_platform::pallet::Error<T>
   **/
  DemeterFarmingPlatformError: {
    _enum: ['TokenAlreadyRegistered', 'TokenPerBlockCantBeZero', 'InvalidAllocationParameters', 'InvalidMultiplier', 'InvalidDepositFee', 'RewardTokenIsNotRegistered', 'PoolAlreadyExists', 'InsufficientFunds', 'ZeroRewards', 'PoolDoesNotExist', 'InsufficientLPTokens', 'PoolDoesNotHaveRewards', 'Unauthorized']
  },
  /**
   * Lookup683: pallet_bags_list::list::Node<T, I>
   **/
  PalletBagsListListNode: {
    id: 'AccountId32',
    prev: 'Option<AccountId32>',
    next: 'Option<AccountId32>',
    bagUpper: 'u64',
    score: 'u64'
  },
  /**
   * Lookup684: pallet_bags_list::list::Bag<T, I>
   **/
  PalletBagsListListBag: {
    head: 'Option<AccountId32>',
    tail: 'Option<AccountId32>'
  },
  /**
   * Lookup686: pallet_bags_list::pallet::Error<T, I>
   **/
  PalletBagsListError: {
    _enum: {
      List: 'PalletBagsListListListError'
    }
  },
  /**
   * Lookup687: pallet_bags_list::list::ListError
   **/
  PalletBagsListListListError: {
    _enum: ['Duplicate', 'NotHeavier', 'NotInSameBag', 'NodeNotFound']
  },
  /**
   * Lookup688: pallet_election_provider_multi_phase::Phase<Bn>
   **/
  PalletElectionProviderMultiPhasePhase: {
    _enum: {
      Off: 'Null',
      Signed: 'Null',
      Unsigned: '(bool,u32)',
      Emergency: 'Null'
    }
  },
  /**
   * Lookup690: pallet_election_provider_multi_phase::ReadySolution<sp_core::crypto::AccountId32>
   **/
  PalletElectionProviderMultiPhaseReadySolution: {
    supports: 'Vec<(AccountId32,SpNposElectionsSupport)>',
    score: 'SpNposElectionsElectionScore',
    compute: 'PalletElectionProviderMultiPhaseElectionCompute'
  },
  /**
   * Lookup691: pallet_election_provider_multi_phase::RoundSnapshot<T>
   **/
  PalletElectionProviderMultiPhaseRoundSnapshot: {
    voters: 'Vec<(AccountId32,u64,Vec<AccountId32>)>',
    targets: 'Vec<AccountId32>'
  },
  /**
   * Lookup698: pallet_election_provider_multi_phase::signed::SignedSubmission<sp_core::crypto::AccountId32, Balance, framenode_runtime::NposCompactSolution24>
   **/
  PalletElectionProviderMultiPhaseSignedSignedSubmission: {
    who: 'AccountId32',
    deposit: 'u128',
    rawSolution: 'PalletElectionProviderMultiPhaseRawSolution',
    callFee: 'u128'
  },
  /**
   * Lookup699: pallet_election_provider_multi_phase::pallet::Error<T>
   **/
  PalletElectionProviderMultiPhaseError: {
    _enum: ['PreDispatchEarlySubmission', 'PreDispatchWrongWinnerCount', 'PreDispatchWeakSubmission', 'SignedQueueFull', 'SignedCannotPayDeposit', 'SignedInvalidWitness', 'SignedTooMuchWeight', 'OcwCallWrongEra', 'MissingSnapshotMetadata', 'InvalidSubmissionIndex', 'CallNotAllowed', 'FallbackFailed']
  },
  /**
   * Lookup700: faucet::pallet::Error<T>
   **/
  FaucetError: {
    _enum: ['AssetNotSupported', 'AmountAboveLimit', 'NotEnoughReserves']
  },
  /**
   * Lookup703: beefy_primitives::mmr::BeefyAuthoritySet<primitive_types::H256>
   **/
  BeefyPrimitivesMmrBeefyAuthoritySet: {
    id: 'u64',
    len: 'u32',
    root: 'H256'
  },
  /**
   * Lookup705: ethereum_light_client::PruningRange
   **/
  EthereumLightClientPruningRange: {
    oldestUnprunedBlock: 'u64',
    oldestBlockToKeep: 'u64'
  },
  /**
   * Lookup707: ethereum_light_client::StoredHeader<sp_core::crypto::AccountId32>
   **/
  EthereumLightClientStoredHeader: {
    submitter: 'Option<AccountId32>',
    header: 'BridgeTypesHeader',
    totalDifficulty: 'U256',
    finalized: 'bool'
  },
  /**
   * Lookup709: ethereum_light_client::pallet::Error<T>
   **/
  EthereumLightClientError: {
    _enum: ['AncientHeader', 'MissingHeader', 'MissingParentHeader', 'DuplicateHeader', 'HeaderNotFinalized', 'HeaderOnStaleFork', 'InvalidHeader', 'InvalidProof', 'DecodeFailed', 'NetworkNotFound', 'NetworkAlreadyExists', 'DifficultyTooLow', 'NetworkStateInvalid', 'Unknown', 'ConsensusNotSupported', 'InvalidSignature']
  },
  /**
   * Lookup710: bridge_channel::inbound::pallet::Error<T>
   **/
  BridgeChannelInboundPalletError: {
    _enum: ['InvalidNetwork', 'InvalidSourceChannel', 'InvalidEnvelope', 'InvalidNonce', 'InvalidRewardFraction', 'ContractExists', 'CallEncodeFailed']
  },
  /**
   * Lookup712: bridge_channel::outbound::Message
   **/
  BridgeChannelOutboundMessage: {
    networkId: 'U256',
    target: 'H160',
    nonce: 'u64',
    fee: 'U256',
    maxGas: 'U256',
    payload: 'Bytes'
  },
  /**
   * Lookup713: bridge_channel::outbound::pallet::Error<T>
   **/
  BridgeChannelOutboundPalletError: {
    _enum: ['PayloadTooLarge', 'QueueSizeLimitReached', 'MaxGasTooBig', 'NoFunds', 'Overflow', 'ChannelExists']
  },
  /**
   * Lookup714: bridge_types::types::AuxiliaryDigest
   **/
  BridgeTypesAuxiliaryDigest: {
    logs: 'Vec<BridgeTypesAuxiliaryDigestItem>'
  },
  /**
   * Lookup716: bridge_types::types::AuxiliaryDigestItem
   **/
  BridgeTypesAuxiliaryDigestItem: {
    _enum: {
      Commitment: '(U256,H256)'
    }
  },
  /**
   * Lookup718: eth_app::pallet::Error<T>
   **/
  EthAppError: {
    _enum: ['InvalidPayload', 'AppIsNotRegistered', 'InvalidAppAddress', 'AppAlreadyExists', 'DestAccountIsNotSet', 'CallEncodeFailed', 'WrongAmount']
  },
  /**
   * Lookup720: bridge_types::types::AssetKind
   **/
  BridgeTypesAssetKind: {
    _enum: ['Thischain', 'Sidechain']
  },
  /**
   * Lookup723: erc20_app::pallet::Error<T>
   **/
  Erc20AppError: {
    _enum: ['TokenIsNotRegistered', 'AppIsNotRegistered', 'NotEnoughFunds', 'InvalidNetwork', 'TokenAlreadyRegistered', 'AppAlreadyRegistered', 'CallEncodeFailed', 'WrongAmount']
  },
  /**
   * Lookup724: migration_app::pallet::Error<T>
   **/
  MigrationAppError: {
    _enum: ['InvalidPayload', 'AppIsNotRegistered', 'InvalidAppAddress', 'AppAlreadyExists', 'TokenRegisteredWithAnotherAddress', 'CallEncodeFailed']
  },
  /**
   * Lookup726: evm_bridge_proxy::BridgeRequest<T>
   **/
  EvmBridgeProxyBridgeRequest: {
    _enum: {
      IncomingTransfer: {
        source: 'H160',
        dest: 'AccountId32',
        assetId: 'CommonPrimitivesAssetId32',
        amount: 'u128',
        status: 'BridgeTypesMessageStatus',
        startTimestamp: 'u64',
        endTimestamp: 'u64',
      },
      OutgoingTransfer: {
        source: 'AccountId32',
        dest: 'H160',
        assetId: 'CommonPrimitivesAssetId32',
        amount: 'u128',
        status: 'BridgeTypesMessageStatus',
        startTimestamp: 'u64',
        endTimestamp: 'Option<u64>'
      }
    }
  },
  /**
   * Lookup727: evm_bridge_proxy::pallet::Error<T>
   **/
  EvmBridgeProxyError: 'Null',
  /**
   * Lookup730: frame_system::extensions::check_spec_version::CheckSpecVersion<T>
   **/
  FrameSystemExtensionsCheckSpecVersion: 'Null',
  /**
   * Lookup731: frame_system::extensions::check_tx_version::CheckTxVersion<T>
   **/
  FrameSystemExtensionsCheckTxVersion: 'Null',
  /**
   * Lookup732: frame_system::extensions::check_genesis::CheckGenesis<T>
   **/
  FrameSystemExtensionsCheckGenesis: 'Null',
  /**
   * Lookup735: frame_system::extensions::check_nonce::CheckNonce<T>
   **/
  FrameSystemExtensionsCheckNonce: 'Compact<u32>',
  /**
   * Lookup736: frame_system::extensions::check_weight::CheckWeight<T>
   **/
  FrameSystemExtensionsCheckWeight: 'Null',
  /**
   * Lookup737: framenode_runtime::extensions::ChargeTransactionPayment<T>
   **/
  FramenodeRuntimeExtensionsChargeTransactionPayment: 'PalletTransactionPaymentChargeTransactionPayment',
  /**
   * Lookup738: pallet_transaction_payment::ChargeTransactionPayment<T>
   **/
  PalletTransactionPaymentChargeTransactionPayment: 'Compact<u128>',
  /**
   * Lookup739: framenode_runtime::Runtime
   **/
  FramenodeRuntimeRuntime: 'Null'
};
