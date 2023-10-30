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
   * Lookup7: frame_support::dispatch::PerDispatchClass<sp_weights::weight_v2::Weight>
   **/
  FrameSupportDispatchPerDispatchClassWeight: {
    normal: 'SpWeightsWeightV2Weight',
    operational: 'SpWeightsWeightV2Weight',
    mandatory: 'SpWeightsWeightV2Weight'
  },
  /**
   * Lookup8: sp_weights::weight_v2::Weight
   **/
  SpWeightsWeightV2Weight: {
    refTime: 'Compact<u64>',
    proofSize: 'Compact<u64>'
  },
  /**
   * Lookup13: sp_runtime::generic::digest::Digest
   **/
  SpRuntimeDigest: {
    logs: 'Vec<SpRuntimeDigestDigestItem>'
  },
  /**
   * Lookup15: sp_runtime::generic::digest::DigestItem
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
   * Lookup18: frame_system::EventRecord<framenode_runtime::RuntimeEvent, primitive_types::H256>
   **/
  FrameSystemEventRecord: {
    phase: 'FrameSystemPhase',
    event: 'Event',
    topics: 'Vec<H256>'
  },
  /**
   * Lookup20: frame_system::pallet::Event<T>
   **/
  FrameSystemEvent: {
    _enum: {
      ExtrinsicSuccess: {
        dispatchInfo: 'FrameSupportDispatchDispatchInfo',
      },
      ExtrinsicFailed: {
        dispatchError: 'SpRuntimeDispatchError',
        dispatchInfo: 'FrameSupportDispatchDispatchInfo',
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
   * Lookup21: frame_support::dispatch::DispatchInfo
   **/
  FrameSupportDispatchDispatchInfo: {
    weight: 'SpWeightsWeightV2Weight',
    class: 'FrameSupportDispatchDispatchClass',
    paysFee: 'FrameSupportDispatchPays'
  },
  /**
   * Lookup22: frame_support::dispatch::DispatchClass
   **/
  FrameSupportDispatchDispatchClass: {
    _enum: ['Normal', 'Operational', 'Mandatory']
  },
  /**
   * Lookup23: frame_support::dispatch::Pays
   **/
  FrameSupportDispatchPays: {
    _enum: ['Yes', 'No']
  },
  /**
   * Lookup24: sp_runtime::DispatchError
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
      Arithmetic: 'SpArithmeticArithmeticError',
      Transactional: 'SpRuntimeTransactionalError',
      Exhausted: 'Null',
      Corruption: 'Null',
      Unavailable: 'Null'
    }
  },
  /**
   * Lookup25: sp_runtime::ModuleError
   **/
  SpRuntimeModuleError: {
    index: 'u8',
    error: '[u8;4]'
  },
  /**
   * Lookup26: sp_runtime::TokenError
   **/
  SpRuntimeTokenError: {
    _enum: ['NoFunds', 'WouldDie', 'BelowMinimum', 'CannotCreate', 'UnknownAsset', 'Frozen', 'Unsupported']
  },
  /**
   * Lookup27: sp_arithmetic::ArithmeticError
   **/
  SpArithmeticArithmeticError: {
    _enum: ['Underflow', 'Overflow', 'DivisionByZero']
  },
  /**
   * Lookup28: sp_runtime::TransactionalError
   **/
  SpRuntimeTransactionalError: {
    _enum: ['LimitReached', 'NoLayer']
  },
  /**
   * Lookup29: pallet_balances::pallet::Event<T, I>
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
   * Lookup30: frame_support::traits::tokens::misc::BalanceStatus
   **/
  FrameSupportTokensMiscBalanceStatus: {
    _enum: ['Free', 'Reserved']
  },
  /**
   * Lookup31: pallet_transaction_payment::pallet::Event<T>
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
   * Lookup32: permissions::pallet::Event<T>
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
   * Lookup33: rewards::pallet::Event<T>
   **/
  RewardsEvent: {
    _enum: {
      Claimed: 'AccountId32',
      MigrationCompleted: 'Null'
    }
  },
  /**
   * Lookup34: xor_fee::pallet::Event<T>
   **/
  XorFeeEvent: {
    _enum: {
      FeeWithdrawn: '(AccountId32,u128)',
      ReferrerRewarded: '(AccountId32,AccountId32,u128)',
      WeightToFeeMultiplierUpdated: 'u128'
    }
  },
  /**
   * Lookup36: pallet_multisig::pallet::Event<T>
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
   * Lookup37: pallet_multisig::BridgeTimepoint<BlockNumber>
   **/
  PalletMultisigBridgeTimepoint: {
    height: 'PalletMultisigMultiChainHeight',
    index: 'u32'
  },
  /**
   * Lookup38: pallet_multisig::MultiChainHeight<BlockNumber>
   **/
  PalletMultisigMultiChainHeight: {
    _enum: {
      Thischain: 'u32',
      Sidechain: 'u64'
    }
  },
  /**
   * Lookup40: pallet_utility::pallet::Event
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
      EraPaid: {
        eraIndex: 'u32',
        validatorPayout: 'u128',
      },
      Rewarded: {
        stash: 'AccountId32',
        amount: 'u128',
      },
      Slashed: {
        staker: 'AccountId32',
        amount: 'u128',
      },
      SlashReported: {
        validator: 'AccountId32',
        fraction: 'Perbill',
        slashEra: 'u32',
      },
      OldSlashingReportDiscarded: {
        sessionIndex: 'u32',
      },
      StakersElected: 'Null',
      Bonded: {
        stash: 'AccountId32',
        amount: 'u128',
      },
      Unbonded: {
        stash: 'AccountId32',
        amount: 'u128',
      },
      Withdrawn: {
        stash: 'AccountId32',
        amount: 'u128',
      },
      Kicked: {
        nominator: 'AccountId32',
        stash: 'AccountId32',
      },
      StakingElectionFailed: 'Null',
      Chilled: {
        stash: 'AccountId32',
      },
      PayoutStarted: {
        eraIndex: 'u32',
        validatorStash: 'AccountId32',
      },
      ValidatorPrefsSet: {
        stash: 'AccountId32',
        prefs: 'PalletStakingValidatorPrefs',
      },
      ForceEra: {
        mode: 'PalletStakingForcing'
      }
    }
  },
  /**
   * Lookup45: pallet_staking::ValidatorPrefs
   **/
  PalletStakingValidatorPrefs: {
    commission: 'Compact<Perbill>',
    blocked: 'bool'
  },
  /**
   * Lookup48: pallet_staking::Forcing
   **/
  PalletStakingForcing: {
    _enum: ['NotForcing', 'ForceNew', 'ForceNone', 'ForceAlways']
  },
  /**
   * Lookup49: pallet_offences::pallet::Event
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
   * Lookup51: pallet_session::pallet::Event
   **/
  PalletSessionEvent: {
    _enum: {
      NewSession: {
        sessionIndex: 'u32'
      }
    }
  },
  /**
   * Lookup52: pallet_grandpa::pallet::Event
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
   * Lookup55: sp_finality_grandpa::app::Public
   **/
  SpFinalityGrandpaAppPublic: 'SpCoreEd25519Public',
  /**
   * Lookup56: sp_core::ed25519::Public
   **/
  SpCoreEd25519Public: '[u8;32]',
  /**
   * Lookup57: pallet_im_online::pallet::Event<T>
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
   * Lookup58: pallet_im_online::sr25519::app_sr25519::Public
   **/
  PalletImOnlineSr25519AppSr25519Public: 'SpCoreSr25519Public',
  /**
   * Lookup59: sp_core::sr25519::Public
   **/
  SpCoreSr25519Public: '[u8;32]',
  /**
   * Lookup62: pallet_staking::Exposure<sp_core::crypto::AccountId32, Balance>
   **/
  PalletStakingExposure: {
    total: 'Compact<u128>',
    own: 'Compact<u128>',
    others: 'Vec<PalletStakingIndividualExposure>'
  },
  /**
   * Lookup65: pallet_staking::IndividualExposure<sp_core::crypto::AccountId32, Balance>
   **/
  PalletStakingIndividualExposure: {
    who: 'AccountId32',
    value: 'Compact<u128>'
  },
  /**
   * Lookup66: orml_tokens::module::Event<T>
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
        who: 'AccountId32',
      },
      Locked: {
        currencyId: 'CommonPrimitivesAssetId32',
        who: 'AccountId32',
        amount: 'u128',
      },
      Unlocked: {
        currencyId: 'CommonPrimitivesAssetId32',
        who: 'AccountId32',
        amount: 'u128'
      }
    }
  },
  /**
   * Lookup67: common::primitives::AssetId32<common::primitives::PredefinedAssetId>
   **/
  CommonPrimitivesAssetId32: {
    code: '[u8;32]'
  },
  /**
   * Lookup68: common::primitives::PredefinedAssetId
   **/
  CommonPrimitivesPredefinedAssetId: {
    _enum: ['XOR', 'DOT', 'KSM', 'USDT', 'VAL', 'PSWAP', 'DAI', 'ETH', 'XSTUSD', 'XST', 'TBCD']
  },
  /**
   * Lookup70: trading_pair::pallet::Event<T>
   **/
  TradingPairEvent: {
    _enum: {
      TradingPairStored: '(u32,CommonPrimitivesTradingPairAssetId32)'
    }
  },
  /**
   * Lookup71: common::primitives::TradingPair<common::primitives::AssetId32<common::primitives::PredefinedAssetId>>
   **/
  CommonPrimitivesTradingPairAssetId32: {
    baseAssetId: 'CommonPrimitivesAssetId32',
    targetAssetId: 'CommonPrimitivesAssetId32'
  },
  /**
   * Lookup72: assets::pallet::Event<T>
   **/
  AssetsEvent: {
    _enum: {
      AssetRegistered: '(CommonPrimitivesAssetId32,AccountId32)',
      Transfer: '(AccountId32,AccountId32,CommonPrimitivesAssetId32,u128)',
      Mint: '(AccountId32,AccountId32,CommonPrimitivesAssetId32,u128)',
      Burn: '(AccountId32,CommonPrimitivesAssetId32,u128)',
      AssetSetNonMintable: 'CommonPrimitivesAssetId32',
      AssetUpdated: '(CommonPrimitivesAssetId32,Option<Bytes>,Option<Bytes>)'
    }
  },
  /**
   * Lookup77: multicollateral_bonding_curve_pool::pallet::Event<T>
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
   * Lookup79: fixnum::FixedPoint<I, P>
   **/
  FixnumFixedPoint: {
    inner: 'i128'
  },
  /**
   * Lookup81: technical::pallet::Event<T>
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
   * Lookup82: common::primitives::TechAssetId<common::primitives::PredefinedAssetId>
   **/
  CommonPrimitivesTechAssetId: {
    _enum: {
      Wrapped: 'CommonPrimitivesPredefinedAssetId',
      Escaped: '[u8;32]'
    }
  },
  /**
   * Lookup83: common::primitives::TechAccountId<sp_core::crypto::AccountId32, common::primitives::TechAssetId<common::primitives::PredefinedAssetId>, DEXId>
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
   * Lookup84: common::primitives::TechPurpose<common::primitives::TechAssetId<common::primitives::PredefinedAssetId>>
   **/
  CommonPrimitivesTechPurpose: {
    _enum: {
      FeeCollector: 'Null',
      FeeCollectorForPair: 'CommonPrimitivesTradingPairTechAssetId',
      XykLiquidityKeeper: 'CommonPrimitivesTradingPairTechAssetId',
      Identifier: 'Bytes',
      OrderBookLiquidityKeeper: 'CommonPrimitivesTradingPairTechAssetId'
    }
  },
  /**
   * Lookup85: common::primitives::TradingPair<common::primitives::TechAssetId<common::primitives::PredefinedAssetId>>
   **/
  CommonPrimitivesTradingPairTechAssetId: {
    baseAssetId: 'CommonPrimitivesTechAssetId',
    targetAssetId: 'CommonPrimitivesTechAssetId'
  },
  /**
   * Lookup86: pool_xyk::pallet::Event<T>
   **/
  PoolXykEvent: {
    _enum: {
      PoolIsInitialized: 'AccountId32'
    }
  },
  /**
   * Lookup87: liquidity_proxy::pallet::Event<T>
   **/
  LiquidityProxyEvent: {
    _enum: {
      Exchange: '(AccountId32,u32,CommonPrimitivesAssetId32,CommonPrimitivesAssetId32,u128,u128,u128,Vec<CommonPrimitivesLiquiditySourceId>)',
      LiquiditySourceEnabled: 'CommonPrimitivesLiquiditySourceType',
      LiquiditySourceDisabled: 'CommonPrimitivesLiquiditySourceType',
      BatchSwapExecuted: '(u128,u128)',
      XorlessTransfer: '(CommonPrimitivesAssetId32,AccountId32,AccountId32,u128,Option<Bytes>)'
    }
  },
  /**
   * Lookup89: common::primitives::LiquiditySourceId<DEXId, common::primitives::LiquiditySourceType>
   **/
  CommonPrimitivesLiquiditySourceId: {
    dexId: 'u32',
    liquiditySourceIndex: 'CommonPrimitivesLiquiditySourceType'
  },
  /**
   * Lookup90: common::primitives::LiquiditySourceType
   **/
  CommonPrimitivesLiquiditySourceType: {
    _enum: ['XYKPool', 'BondingCurvePool', 'MulticollateralBondingCurvePool', 'MockPool', 'MockPool2', 'MockPool3', 'MockPool4', 'XSTPool', 'OrderBook']
  },
  /**
   * Lookup93: pallet_collective::pallet::Event<T, I>
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
   * Lookup95: pallet_democracy::pallet::Event<T>
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
   * Lookup96: pallet_democracy::vote_threshold::VoteThreshold
   **/
  PalletDemocracyVoteThreshold: {
    _enum: ['SuperMajorityApprove', 'SuperMajorityAgainst', 'SimpleMajority']
  },
  /**
   * Lookup97: pallet_democracy::vote::AccountVote<Balance>
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
   * Lookup99: eth_bridge::pallet::Event<T>
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
   * Lookup100: pswap_distribution::pallet::Event<T>
   **/
  PswapDistributionEvent: {
    _enum: {
      FeesExchanged: '(u32,AccountId32,CommonPrimitivesAssetId32,u128,CommonPrimitivesAssetId32,u128)',
      FeesExchangeFailed: '(u32,AccountId32,CommonPrimitivesAssetId32,u128,CommonPrimitivesAssetId32,SpRuntimeDispatchError)',
      IncentiveDistributed: '(u32,AccountId32,CommonPrimitivesAssetId32,u128,u128)',
      IncentiveDistributionFailed: '(u32,AccountId32)',
      BurnRateChanged: 'FixnumFixedPoint',
      NothingToExchange: '(u32,AccountId32)',
      NothingToDistribute: '(u32,AccountId32)',
      IncentivesBurnedAfterExchange: '(u32,CommonPrimitivesAssetId32,u128,u128)'
    }
  },
  /**
   * Lookup102: pallet_multisig::Timepoint<BlockNumber>
   **/
  PalletMultisigTimepoint: {
    height: 'u32',
    index: 'u32'
  },
  /**
   * Lookup103: pallet_scheduler::pallet::Event<T>
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
        id: 'Option<[u8;32]>',
        result: 'Result<Null, SpRuntimeDispatchError>',
      },
      CallUnavailable: {
        task: '(u32,u32)',
        id: 'Option<[u8;32]>',
      },
      PeriodicFailed: {
        task: '(u32,u32)',
        id: 'Option<[u8;32]>',
      },
      PermanentlyOverweight: {
        task: '(u32,u32)',
        id: 'Option<[u8;32]>'
      }
    }
  },
  /**
   * Lookup106: iroha_migration::pallet::Event<T>
   **/
  IrohaMigrationEvent: {
    _enum: {
      Migrated: '(Text,AccountId32)'
    }
  },
  /**
   * Lookup108: pallet_membership::pallet::Event<T, I>
   **/
  PalletMembershipEvent: {
    _enum: ['MemberAdded', 'MemberRemoved', 'MembersSwapped', 'MembersReset', 'KeyChanged', 'Dummy']
  },
  /**
   * Lookup109: pallet_elections_phragmen::pallet::Event<T>
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
   * Lookup112: vested_rewards::pallet::Event<T>
   **/
  VestedRewardsEvent: {
    _enum: {
      RewardsVested: 'u128',
      ActualDoesntMatchAvailable: 'CommonPrimitivesRewardReason',
      FailedToSaveCalculatedReward: 'AccountId32',
      CrowdloanClaimed: '(AccountId32,CommonPrimitivesAssetId32,u128)'
    }
  },
  /**
   * Lookup113: common::primitives::RewardReason
   **/
  CommonPrimitivesRewardReason: {
    _enum: ['Unspecified', 'BuyOnBondingCurve', 'LiquidityProvisionFarming', 'DeprecatedMarketMakerVolume', 'Crowdloan']
  },
  /**
   * Lookup114: pallet_identity::pallet::Event<T>
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
   * Lookup115: xst::pallet::Event<T>
   **/
  XstEvent: {
    _enum: {
      ReferenceAssetChanged: 'CommonPrimitivesAssetId32',
      SyntheticAssetEnabled: '(CommonPrimitivesAssetId32,Bytes)',
      SyntheticAssetDisabled: 'CommonPrimitivesAssetId32',
      SyntheticAssetFeeChanged: '(CommonPrimitivesAssetId32,FixnumFixedPoint)',
      SyntheticBaseAssetFloorPriceChanged: 'u128',
      SyntheticAssetRemoved: '(CommonPrimitivesAssetId32,Bytes)'
    }
  },
  /**
   * Lookup117: price_tools::pallet::Event<T>
   **/
  PriceToolsEvent: 'Null',
  /**
   * Lookup118: ceres_staking::pallet::Event<T>
   **/
  CeresStakingEvent: {
    _enum: {
      Deposited: '(AccountId32,u128)',
      Withdrawn: '(AccountId32,u128,u128)',
      RewardsChanged: 'u128'
    }
  },
  /**
   * Lookup119: ceres_liquidity_locker::pallet::Event<T>
   **/
  CeresLiquidityLockerEvent: {
    _enum: {
      Locked: '(AccountId32,u128,u64)'
    }
  },
  /**
   * Lookup120: ceres_token_locker::pallet::Event<T>
   **/
  CeresTokenLockerEvent: {
    _enum: {
      Locked: '(AccountId32,u128,CommonPrimitivesAssetId32)',
      Withdrawn: '(AccountId32,u128,CommonPrimitivesAssetId32)',
      FeeChanged: '(AccountId32,u128)'
    }
  },
  /**
   * Lookup121: ceres_governance_platform::pallet::Event<T>
   **/
  CeresGovernancePlatformEvent: {
    _enum: {
      Voted: '(AccountId32,Bytes,u32,u128)',
      Created: '(AccountId32,u32,u64,u64)',
      Withdrawn: '(AccountId32,u128)'
    }
  },
  /**
   * Lookup122: ceres_launchpad::pallet::Event<T>
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
   * Lookup123: demeter_farming_platform::pallet::Event<T>
   **/
  DemeterFarmingPlatformEvent: {
    _enum: {
      TokenRegistered: '(AccountId32,CommonPrimitivesAssetId32)',
      PoolAdded: '(AccountId32,CommonPrimitivesAssetId32,CommonPrimitivesAssetId32,CommonPrimitivesAssetId32,bool)',
      RewardWithdrawn: '(AccountId32,u128,CommonPrimitivesAssetId32,CommonPrimitivesAssetId32,CommonPrimitivesAssetId32,bool)',
      Withdrawn: '(AccountId32,u128,CommonPrimitivesAssetId32,CommonPrimitivesAssetId32,CommonPrimitivesAssetId32,bool)',
      PoolRemoved: '(AccountId32,CommonPrimitivesAssetId32,CommonPrimitivesAssetId32,CommonPrimitivesAssetId32,bool)',
      Deposited: '(AccountId32,CommonPrimitivesAssetId32,CommonPrimitivesAssetId32,CommonPrimitivesAssetId32,bool,u128)',
      MultiplierChanged: '(AccountId32,CommonPrimitivesAssetId32,CommonPrimitivesAssetId32,CommonPrimitivesAssetId32,bool,u32)',
      DepositFeeChanged: '(AccountId32,CommonPrimitivesAssetId32,CommonPrimitivesAssetId32,CommonPrimitivesAssetId32,bool,u128)',
      TokenInfoChanged: '(AccountId32,CommonPrimitivesAssetId32)',
      TotalTokensChanged: '(AccountId32,CommonPrimitivesAssetId32,CommonPrimitivesAssetId32,CommonPrimitivesAssetId32,bool,u128)',
      InfoChanged: '(AccountId32,CommonPrimitivesAssetId32,CommonPrimitivesAssetId32,CommonPrimitivesAssetId32,bool,u128)'
    }
  },
  /**
   * Lookup124: pallet_bags_list::pallet::Event<T, I>
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
   * Lookup125: pallet_election_provider_multi_phase::pallet::Event<T>
   **/
  PalletElectionProviderMultiPhaseEvent: {
    _enum: {
      SolutionStored: {
        compute: 'PalletElectionProviderMultiPhaseElectionCompute',
        origin: 'Option<AccountId32>',
        prevEjected: 'bool',
      },
      ElectionFinalized: {
        compute: 'PalletElectionProviderMultiPhaseElectionCompute',
        score: 'SpNposElectionsElectionScore',
      },
      ElectionFailed: 'Null',
      Rewarded: {
        account: 'AccountId32',
        value: 'u128',
      },
      Slashed: {
        account: 'AccountId32',
        value: 'u128',
      },
      PhaseTransitioned: {
        from: 'PalletElectionProviderMultiPhasePhase',
        to: 'PalletElectionProviderMultiPhasePhase',
        round: 'u32'
      }
    }
  },
  /**
   * Lookup126: pallet_election_provider_multi_phase::ElectionCompute
   **/
  PalletElectionProviderMultiPhaseElectionCompute: {
    _enum: ['OnChain', 'Signed', 'Unsigned', 'Fallback', 'Emergency']
  },
  /**
   * Lookup128: sp_npos_elections::ElectionScore
   **/
  SpNposElectionsElectionScore: {
    minimalStake: 'u128',
    sumStake: 'u128',
    sumStakeSquared: 'u128'
  },
  /**
   * Lookup129: pallet_election_provider_multi_phase::Phase<Bn>
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
   * Lookup131: band::pallet::Event<T, I>
   **/
  BandEvent: {
    _enum: {
      SymbolsRelayed: 'Vec<(Bytes,u128)>',
      RelayersAdded: 'Vec<AccountId32>',
      RelayersRemoved: 'Vec<AccountId32>'
    }
  },
  /**
   * Lookup135: oracle_proxy::pallet::Event<T>
   **/
  OracleProxyEvent: {
    _enum: {
      OracleEnabled: 'CommonPrimitivesOracle',
      OracleDisabled: 'CommonPrimitivesOracle'
    }
  },
  /**
   * Lookup136: common::primitives::Oracle
   **/
  CommonPrimitivesOracle: {
    _enum: ['BandChainFeed']
  },
  /**
   * Lookup137: hermes_governance_platform::pallet::Event<T>
   **/
  HermesGovernancePlatformEvent: {
    _enum: {
      Voted: '(AccountId32,H256,Bytes)',
      Created: '(AccountId32,Bytes,u64,u64)',
      VoterFundsWithdrawn: '(AccountId32,u128)',
      CreatorFundsWithdrawn: '(AccountId32,u128)',
      MinimumHermesForVotingChanged: 'u128',
      MinimumHermesForCreatingPollChanged: 'u128'
    }
  },
  /**
   * Lookup142: pallet_preimage::pallet::Event<T>
   **/
  PalletPreimageEvent: {
    _enum: {
      Noted: {
        _alias: {
          hash_: 'hash',
        },
        hash_: 'H256',
      },
      Requested: {
        _alias: {
          hash_: 'hash',
        },
        hash_: 'H256',
      },
      Cleared: {
        _alias: {
          hash_: 'hash',
        },
        hash_: 'H256'
      }
    }
  },
  /**
   * Lookup143: order_book::pallet::Event<T>
   **/
  OrderBookEvent: {
    _enum: {
      OrderBookCreated: {
        orderBookId: 'OrderBookOrderBookId',
        creator: 'AccountId32',
      },
      OrderBookDeleted: {
        orderBookId: 'OrderBookOrderBookId',
      },
      OrderBookStatusChanged: {
        orderBookId: 'OrderBookOrderBookId',
        newStatus: 'OrderBookOrderBookStatus',
      },
      OrderBookUpdated: {
        orderBookId: 'OrderBookOrderBookId',
      },
      LimitOrderPlaced: {
        orderBookId: 'OrderBookOrderBookId',
        orderId: 'u128',
        ownerId: 'AccountId32',
        side: 'CommonPrimitivesPriceVariant',
        price: 'CommonBalanceUnit',
        amount: 'CommonBalanceUnit',
        lifetime: 'u64',
      },
      LimitOrderConvertedToMarketOrder: {
        orderBookId: 'OrderBookOrderBookId',
        ownerId: 'AccountId32',
        direction: 'CommonPrimitivesPriceVariant',
        amount: 'OrderBookOrderAmount',
      },
      LimitOrderIsSplitIntoMarketOrderAndLimitOrder: {
        orderBookId: 'OrderBookOrderBookId',
        ownerId: 'AccountId32',
        marketOrderDirection: 'CommonPrimitivesPriceVariant',
        marketOrderAmount: 'OrderBookOrderAmount',
        marketOrderAveragePrice: 'CommonBalanceUnit',
        limitOrderId: 'u128',
      },
      LimitOrderCanceled: {
        orderBookId: 'OrderBookOrderBookId',
        orderId: 'u128',
        ownerId: 'AccountId32',
        reason: 'OrderBookCancelReason',
      },
      ExpirationFailure: {
        orderBookId: 'OrderBookOrderBookId',
        orderId: 'u128',
        error: 'SpRuntimeDispatchError',
      },
      LimitOrderExecuted: {
        orderBookId: 'OrderBookOrderBookId',
        orderId: 'u128',
        ownerId: 'AccountId32',
        side: 'CommonPrimitivesPriceVariant',
        price: 'CommonBalanceUnit',
        amount: 'OrderBookOrderAmount',
      },
      LimitOrderFilled: {
        orderBookId: 'OrderBookOrderBookId',
        orderId: 'u128',
        ownerId: 'AccountId32',
      },
      LimitOrderUpdated: {
        orderBookId: 'OrderBookOrderBookId',
        orderId: 'u128',
        ownerId: 'AccountId32',
        newAmount: 'CommonBalanceUnit',
      },
      MarketOrderExecuted: {
        orderBookId: 'OrderBookOrderBookId',
        ownerId: 'AccountId32',
        direction: 'CommonPrimitivesPriceVariant',
        amount: 'OrderBookOrderAmount',
        averagePrice: 'CommonBalanceUnit',
        to: 'Option<AccountId32>'
      }
    }
  },
  /**
   * Lookup144: order_book::types::OrderBookId<common::primitives::AssetId32<common::primitives::PredefinedAssetId>, DEXId>
   **/
  OrderBookOrderBookId: {
    dexId: 'u32',
    base: 'CommonPrimitivesAssetId32',
    quote: 'CommonPrimitivesAssetId32'
  },
  /**
   * Lookup145: order_book::types::OrderBookStatus
   **/
  OrderBookOrderBookStatus: {
    _enum: ['Trade', 'PlaceAndCancel', 'OnlyCancel', 'Stop']
  },
  /**
   * Lookup146: common::primitives::PriceVariant
   **/
  CommonPrimitivesPriceVariant: {
    _enum: ['Buy', 'Sell']
  },
  /**
   * Lookup147: common::balance_unit::BalanceUnit
   **/
  CommonBalanceUnit: {
    inner: 'u128',
    isDivisible: 'bool'
  },
  /**
   * Lookup148: order_book::types::OrderAmount
   **/
  OrderBookOrderAmount: {
    _enum: {
      Base: 'CommonBalanceUnit',
      Quote: 'CommonBalanceUnit'
    }
  },
  /**
   * Lookup149: order_book::types::CancelReason
   **/
  OrderBookCancelReason: {
    _enum: ['Manual', 'Expired']
  },
  /**
   * Lookup150: leaf_provider::pallet::Event<T>
   **/
  LeafProviderEvent: 'Null',
  /**
   * Lookup151: bridge_proxy::pallet::Event
   **/
  BridgeProxyEvent: {
    _enum: {
      RequestStatusUpdate: '(H256,BridgeTypesMessageStatus)',
      RefundFailed: 'H256'
    }
  },
  /**
   * Lookup152: bridge_types::types::MessageStatus
   **/
  BridgeTypesMessageStatus: {
    _enum: ['InQueue', 'Committed', 'Done', 'Failed', 'Refunded', 'Approved']
  },
  /**
   * Lookup153: ethereum_light_client::pallet::Event<T>
   **/
  EthereumLightClientEvent: {
    _enum: {
      Finalized: '(U256,BridgeTypesHeaderHeaderId)'
    }
  },
  /**
   * Lookup156: bridge_types::header::HeaderId
   **/
  BridgeTypesHeaderHeaderId: {
    _alias: {
      hash_: 'hash'
    },
    number: 'u64',
    hash_: 'H256'
  },
  /**
   * Lookup157: bridge_inbound_channel::pallet::Event<T>
   **/
  BridgeInboundChannelEvent: 'Null',
  /**
   * Lookup158: bridge_outbound_channel::pallet::Event<T>
   **/
  BridgeOutboundChannelEvent: {
    _enum: {
      MessageAccepted: '(U256,u64,u64)'
    }
  },
  /**
   * Lookup159: dispatch::pallet::Event<T, I>
   **/
  DispatchEvent: {
    _enum: {
      MessageDispatched: '(BridgeTypesMessageId,Result<Null, SpRuntimeDispatchError>)',
      MessageRejected: 'BridgeTypesMessageId',
      MessageDecodeFailed: 'BridgeTypesMessageId'
    }
  },
  /**
   * Lookup160: bridge_types::types::MessageId
   **/
  BridgeTypesMessageId: {
    sender: 'BridgeTypesGenericNetworkId',
    receiver: 'BridgeTypesGenericNetworkId',
    batchNonce: 'Option<u64>',
    messageNonce: 'u64'
  },
  /**
   * Lookup161: bridge_types::GenericNetworkId
   **/
  BridgeTypesGenericNetworkId: {
    _enum: {
      EVM: 'U256',
      Sub: 'BridgeTypesSubNetworkId',
      EVMLegacy: 'u32'
    }
  },
  /**
   * Lookup162: bridge_types::SubNetworkId
   **/
  BridgeTypesSubNetworkId: {
    _enum: {
      Mainnet: 'Null',
      Kusama: 'Null',
      Polkadot: 'Null',
      Rococo: 'Null',
      Custom: 'u32'
    }
  },
  /**
   * Lookup164: eth_app::pallet::Event<T>
   **/
  EthAppEvent: {
    _enum: {
      Burned: '(U256,AccountId32,H160,u128)',
      Minted: '(U256,H160,AccountId32,u128)',
      Refunded: '(U256,AccountId32,u128)'
    }
  },
  /**
   * Lookup167: erc20_app::pallet::Event<T>
   **/
  Erc20AppEvent: {
    _enum: {
      Burned: '(U256,CommonPrimitivesAssetId32,AccountId32,H160,u128)',
      Minted: '(U256,CommonPrimitivesAssetId32,H160,AccountId32,u128)',
      Refunded: '(U256,AccountId32,CommonPrimitivesAssetId32,u128)'
    }
  },
  /**
   * Lookup168: migration_app::pallet::Event<T>
   **/
  MigrationAppEvent: {
    _enum: {
      Erc20Migrated: '(U256,H160)',
      SidechainMigrated: '(U256,H160)',
      EthMigrated: '(U256,H160)'
    }
  },
  /**
   * Lookup169: beefy_light_client::pallet::Event<T>
   **/
  BeefyLightClientEvent: {
    _enum: {
      VerificationSuccessful: '(BridgeTypesSubNetworkId,AccountId32,u32)',
      NewMMRRoot: '(BridgeTypesSubNetworkId,H256,u64)',
      ValidatorRegistryUpdated: '(BridgeTypesSubNetworkId,H256,u32,u64)'
    }
  },
  /**
   * Lookup170: substrate_bridge_channel::inbound::pallet::Event<T>
   **/
  SubstrateBridgeChannelInboundPalletEvent: 'Null',
  /**
   * Lookup171: substrate_bridge_channel::outbound::pallet::Event<T>
   **/
  SubstrateBridgeChannelOutboundPalletEvent: {
    _enum: {
      MessageAccepted: {
        networkId: 'BridgeTypesSubNetworkId',
        batchNonce: 'u64',
        messageNonce: 'u64'
      }
    }
  },
  /**
   * Lookup173: parachain_bridge_app::pallet::Event<T>
   **/
  ParachainBridgeAppEvent: {
    _enum: {
      Burned: '(BridgeTypesSubNetworkId,CommonPrimitivesAssetId32,AccountId32,XcmVersionedMultiLocation,u128)',
      Minted: '(BridgeTypesSubNetworkId,CommonPrimitivesAssetId32,Option<XcmVersionedMultiLocation>,AccountId32,u128)'
    }
  },
  /**
   * Lookup174: xcm::VersionedMultiLocation
   **/
  XcmVersionedMultiLocation: {
    _enum: {
      __Unused0: 'Null',
      V2: 'XcmV2MultiLocation',
      __Unused2: 'Null',
      V3: 'XcmV3MultiLocation'
    }
  },
  /**
   * Lookup175: xcm::v2::multilocation::MultiLocation
   **/
  XcmV2MultiLocation: {
    parents: 'u8',
    interior: 'XcmV2MultilocationJunctions'
  },
  /**
   * Lookup176: xcm::v2::multilocation::Junctions
   **/
  XcmV2MultilocationJunctions: {
    _enum: {
      Here: 'Null',
      X1: 'XcmV2Junction',
      X2: '(XcmV2Junction,XcmV2Junction)',
      X3: '(XcmV2Junction,XcmV2Junction,XcmV2Junction)',
      X4: '(XcmV2Junction,XcmV2Junction,XcmV2Junction,XcmV2Junction)',
      X5: '(XcmV2Junction,XcmV2Junction,XcmV2Junction,XcmV2Junction,XcmV2Junction)',
      X6: '(XcmV2Junction,XcmV2Junction,XcmV2Junction,XcmV2Junction,XcmV2Junction,XcmV2Junction)',
      X7: '(XcmV2Junction,XcmV2Junction,XcmV2Junction,XcmV2Junction,XcmV2Junction,XcmV2Junction,XcmV2Junction)',
      X8: '(XcmV2Junction,XcmV2Junction,XcmV2Junction,XcmV2Junction,XcmV2Junction,XcmV2Junction,XcmV2Junction,XcmV2Junction)'
    }
  },
  /**
   * Lookup177: xcm::v2::junction::Junction
   **/
  XcmV2Junction: {
    _enum: {
      Parachain: 'Compact<u32>',
      AccountId32: {
        network: 'XcmV2NetworkId',
        id: '[u8;32]',
      },
      AccountIndex64: {
        network: 'XcmV2NetworkId',
        index: 'Compact<u64>',
      },
      AccountKey20: {
        network: 'XcmV2NetworkId',
        key: '[u8;20]',
      },
      PalletInstance: 'u8',
      GeneralIndex: 'Compact<u128>',
      GeneralKey: 'Bytes',
      OnlyChild: 'Null',
      Plurality: {
        id: 'XcmV2BodyId',
        part: 'XcmV2BodyPart'
      }
    }
  },
  /**
   * Lookup179: xcm::v2::NetworkId
   **/
  XcmV2NetworkId: {
    _enum: {
      Any: 'Null',
      Named: 'Bytes',
      Polkadot: 'Null',
      Kusama: 'Null'
    }
  },
  /**
   * Lookup181: xcm::v2::BodyId
   **/
  XcmV2BodyId: {
    _enum: {
      Unit: 'Null',
      Named: 'Bytes',
      Index: 'Compact<u32>',
      Executive: 'Null',
      Technical: 'Null',
      Legislative: 'Null',
      Judicial: 'Null',
      Defense: 'Null',
      Administration: 'Null',
      Treasury: 'Null'
    }
  },
  /**
   * Lookup182: xcm::v2::BodyPart
   **/
  XcmV2BodyPart: {
    _enum: {
      Voice: 'Null',
      Members: {
        count: 'Compact<u32>',
      },
      Fraction: {
        nom: 'Compact<u32>',
        denom: 'Compact<u32>',
      },
      AtLeastProportion: {
        nom: 'Compact<u32>',
        denom: 'Compact<u32>',
      },
      MoreThanProportion: {
        nom: 'Compact<u32>',
        denom: 'Compact<u32>'
      }
    }
  },
  /**
   * Lookup183: xcm::v3::multilocation::MultiLocation
   **/
  XcmV3MultiLocation: {
    parents: 'u8',
    interior: 'XcmV3Junctions'
  },
  /**
   * Lookup184: xcm::v3::junctions::Junctions
   **/
  XcmV3Junctions: {
    _enum: {
      Here: 'Null',
      X1: 'XcmV3Junction',
      X2: '(XcmV3Junction,XcmV3Junction)',
      X3: '(XcmV3Junction,XcmV3Junction,XcmV3Junction)',
      X4: '(XcmV3Junction,XcmV3Junction,XcmV3Junction,XcmV3Junction)',
      X5: '(XcmV3Junction,XcmV3Junction,XcmV3Junction,XcmV3Junction,XcmV3Junction)',
      X6: '(XcmV3Junction,XcmV3Junction,XcmV3Junction,XcmV3Junction,XcmV3Junction,XcmV3Junction)',
      X7: '(XcmV3Junction,XcmV3Junction,XcmV3Junction,XcmV3Junction,XcmV3Junction,XcmV3Junction,XcmV3Junction)',
      X8: '(XcmV3Junction,XcmV3Junction,XcmV3Junction,XcmV3Junction,XcmV3Junction,XcmV3Junction,XcmV3Junction,XcmV3Junction)'
    }
  },
  /**
   * Lookup185: xcm::v3::junction::Junction
   **/
  XcmV3Junction: {
    _enum: {
      Parachain: 'Compact<u32>',
      AccountId32: {
        network: 'Option<XcmV3JunctionNetworkId>',
        id: '[u8;32]',
      },
      AccountIndex64: {
        network: 'Option<XcmV3JunctionNetworkId>',
        index: 'Compact<u64>',
      },
      AccountKey20: {
        network: 'Option<XcmV3JunctionNetworkId>',
        key: '[u8;20]',
      },
      PalletInstance: 'u8',
      GeneralIndex: 'Compact<u128>',
      GeneralKey: {
        length: 'u8',
        data: '[u8;32]',
      },
      OnlyChild: 'Null',
      Plurality: {
        id: 'XcmV3JunctionBodyId',
        part: 'XcmV3JunctionBodyPart',
      },
      GlobalConsensus: 'XcmV3JunctionNetworkId'
    }
  },
  /**
   * Lookup187: xcm::v3::junction::NetworkId
   **/
  XcmV3JunctionNetworkId: {
    _enum: {
      ByGenesis: '[u8;32]',
      ByFork: {
        blockNumber: 'u64',
        blockHash: '[u8;32]',
      },
      Polkadot: 'Null',
      Kusama: 'Null',
      Westend: 'Null',
      Rococo: 'Null',
      Wococo: 'Null',
      Ethereum: {
        chainId: 'Compact<u64>',
      },
      BitcoinCore: 'Null',
      BitcoinCash: 'Null'
    }
  },
  /**
   * Lookup188: xcm::v3::junction::BodyId
   **/
  XcmV3JunctionBodyId: {
    _enum: {
      Unit: 'Null',
      Moniker: '[u8;4]',
      Index: 'Compact<u32>',
      Executive: 'Null',
      Technical: 'Null',
      Legislative: 'Null',
      Judicial: 'Null',
      Defense: 'Null',
      Administration: 'Null',
      Treasury: 'Null'
    }
  },
  /**
   * Lookup189: xcm::v3::junction::BodyPart
   **/
  XcmV3JunctionBodyPart: {
    _enum: {
      Voice: 'Null',
      Members: {
        count: 'Compact<u32>',
      },
      Fraction: {
        nom: 'Compact<u32>',
        denom: 'Compact<u32>',
      },
      AtLeastProportion: {
        nom: 'Compact<u32>',
        denom: 'Compact<u32>',
      },
      MoreThanProportion: {
        nom: 'Compact<u32>',
        denom: 'Compact<u32>'
      }
    }
  },
  /**
   * Lookup191: bridge_data_signer::pallet::Event<T>
   **/
  BridgeDataSignerEvent: {
    _enum: {
      Initialized: {
        networkId: 'BridgeTypesGenericNetworkId',
        peers: 'Vec<SpCoreEcdsaPublic>',
      },
      AddedPeer: {
        networkId: 'BridgeTypesGenericNetworkId',
        peer: 'SpCoreEcdsaPublic',
      },
      RemovedPeer: {
        networkId: 'BridgeTypesGenericNetworkId',
        peer: 'SpCoreEcdsaPublic',
      },
      ApprovalAccepted: {
        networkId: 'BridgeTypesGenericNetworkId',
        data: 'H256',
        signature: 'SpCoreEcdsaSignature',
      },
      Approved: {
        networkId: 'BridgeTypesGenericNetworkId',
        data: 'H256',
        signatures: 'Vec<SpCoreEcdsaSignature>'
      }
    }
  },
  /**
   * Lookup193: sp_core::ecdsa::Public
   **/
  SpCoreEcdsaPublic: '[u8;33]',
  /**
   * Lookup196: sp_core::ecdsa::Signature
   **/
  SpCoreEcdsaSignature: '[u8;65]',
  /**
   * Lookup200: multisig_verifier::pallet::Event<T>
   **/
  MultisigVerifierEvent: {
    _enum: {
      NetworkInitialized: 'BridgeTypesGenericNetworkId',
      VerificationSuccessful: 'BridgeTypesGenericNetworkId',
      PeerAdded: 'SpCoreEcdsaPublic',
      PeerRemoved: 'SpCoreEcdsaPublic'
    }
  },
  /**
   * Lookup201: pallet_sudo::pallet::Event<T>
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
   * Lookup202: faucet::pallet::Event<T>
   **/
  FaucetEvent: {
    _enum: {
      Transferred: '(AccountId32,u128)',
      LimitUpdated: 'u128'
    }
  },
  /**
   * Lookup203: frame_system::Phase
   **/
  FrameSystemPhase: {
    _enum: {
      ApplyExtrinsic: 'u32',
      Finalization: 'Null',
      Initialization: 'Null'
    }
  },
  /**
   * Lookup206: frame_system::LastRuntimeUpgradeInfo
   **/
  FrameSystemLastRuntimeUpgradeInfo: {
    specVersion: 'Compact<u32>',
    specName: 'Text'
  },
  /**
   * Lookup207: frame_system::pallet::Call<T>
   **/
  FrameSystemCall: {
    _enum: {
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
   * Lookup211: frame_system::limits::BlockWeights
   **/
  FrameSystemLimitsBlockWeights: {
    baseBlock: 'SpWeightsWeightV2Weight',
    maxBlock: 'SpWeightsWeightV2Weight',
    perClass: 'FrameSupportDispatchPerDispatchClassWeightsPerClass'
  },
  /**
   * Lookup212: frame_support::dispatch::PerDispatchClass<frame_system::limits::WeightsPerClass>
   **/
  FrameSupportDispatchPerDispatchClassWeightsPerClass: {
    normal: 'FrameSystemLimitsWeightsPerClass',
    operational: 'FrameSystemLimitsWeightsPerClass',
    mandatory: 'FrameSystemLimitsWeightsPerClass'
  },
  /**
   * Lookup213: frame_system::limits::WeightsPerClass
   **/
  FrameSystemLimitsWeightsPerClass: {
    baseExtrinsic: 'SpWeightsWeightV2Weight',
    maxExtrinsic: 'Option<SpWeightsWeightV2Weight>',
    maxTotal: 'Option<SpWeightsWeightV2Weight>',
    reserved: 'Option<SpWeightsWeightV2Weight>'
  },
  /**
   * Lookup215: frame_system::limits::BlockLength
   **/
  FrameSystemLimitsBlockLength: {
    max: 'FrameSupportDispatchPerDispatchClassU32'
  },
  /**
   * Lookup216: frame_support::dispatch::PerDispatchClass<T>
   **/
  FrameSupportDispatchPerDispatchClassU32: {
    normal: 'u32',
    operational: 'u32',
    mandatory: 'u32'
  },
  /**
   * Lookup217: sp_weights::RuntimeDbWeight
   **/
  SpWeightsRuntimeDbWeight: {
    read: 'u64',
    write: 'u64'
  },
  /**
   * Lookup218: sp_version::RuntimeVersion
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
   * Lookup223: frame_system::pallet::Error<T>
   **/
  FrameSystemError: {
    _enum: ['InvalidSpecName', 'SpecVersionNeedsToIncrease', 'FailedToExtractRuntimeVersion', 'NonDefaultComposite', 'NonZeroRefCount', 'CallFiltered']
  },
  /**
   * Lookup226: sp_consensus_babe::app::Public
   **/
  SpConsensusBabeAppPublic: 'SpCoreSr25519Public',
  /**
   * Lookup229: sp_consensus_babe::digests::NextConfigDescriptor
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
   * Lookup231: sp_consensus_babe::AllowedSlots
   **/
  SpConsensusBabeAllowedSlots: {
    _enum: ['PrimarySlots', 'PrimaryAndSecondaryPlainSlots', 'PrimaryAndSecondaryVRFSlots']
  },
  /**
   * Lookup235: sp_consensus_babe::digests::PreDigest
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
   * Lookup236: sp_consensus_babe::digests::PrimaryPreDigest
   **/
  SpConsensusBabeDigestsPrimaryPreDigest: {
    authorityIndex: 'u32',
    slot: 'u64',
    vrfOutput: '[u8;32]',
    vrfProof: '[u8;64]'
  },
  /**
   * Lookup238: sp_consensus_babe::digests::SecondaryPlainPreDigest
   **/
  SpConsensusBabeDigestsSecondaryPlainPreDigest: {
    authorityIndex: 'u32',
    slot: 'u64'
  },
  /**
   * Lookup239: sp_consensus_babe::digests::SecondaryVRFPreDigest
   **/
  SpConsensusBabeDigestsSecondaryVRFPreDigest: {
    authorityIndex: 'u32',
    slot: 'u64',
    vrfOutput: '[u8;32]',
    vrfProof: '[u8;64]'
  },
  /**
   * Lookup240: sp_consensus_babe::BabeEpochConfiguration
   **/
  SpConsensusBabeBabeEpochConfiguration: {
    c: '(u64,u64)',
    allowedSlots: 'SpConsensusBabeAllowedSlots'
  },
  /**
   * Lookup241: pallet_babe::pallet::Call<T>
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
   * Lookup242: sp_consensus_slots::EquivocationProof<sp_runtime::generic::header::Header<Number, sp_runtime::traits::BlakeTwo256>, sp_consensus_babe::app::Public>
   **/
  SpConsensusSlotsEquivocationProof: {
    offender: 'SpConsensusBabeAppPublic',
    slot: 'u64',
    firstHeader: 'SpRuntimeHeader',
    secondHeader: 'SpRuntimeHeader'
  },
  /**
   * Lookup243: sp_runtime::generic::header::Header<Number, sp_runtime::traits::BlakeTwo256>
   **/
  SpRuntimeHeader: {
    parentHash: 'H256',
    number: 'Compact<u32>',
    stateRoot: 'H256',
    extrinsicsRoot: 'H256',
    digest: 'SpRuntimeDigest'
  },
  /**
   * Lookup244: sp_runtime::traits::BlakeTwo256
   **/
  SpRuntimeBlakeTwo256: 'Null',
  /**
   * Lookup245: sp_session::MembershipProof
   **/
  SpSessionMembershipProof: {
    session: 'u32',
    trieNodes: 'Vec<Bytes>',
    validatorCount: 'u32'
  },
  /**
   * Lookup246: pallet_babe::pallet::Error<T>
   **/
  PalletBabeError: {
    _enum: ['InvalidEquivocationProof', 'InvalidKeyOwnershipProof', 'DuplicateOffenceReport', 'InvalidConfiguration']
  },
  /**
   * Lookup247: pallet_timestamp::pallet::Call<T>
   **/
  PalletTimestampCall: {
    _enum: {
      set: {
        now: 'Compact<u64>'
      }
    }
  },
  /**
   * Lookup249: pallet_balances::BalanceLock<Balance>
   **/
  PalletBalancesBalanceLock: {
    id: '[u8;8]',
    amount: 'u128',
    reasons: 'PalletBalancesReasons'
  },
  /**
   * Lookup250: pallet_balances::Reasons
   **/
  PalletBalancesReasons: {
    _enum: ['Fee', 'Misc', 'All']
  },
  /**
   * Lookup253: pallet_balances::ReserveData<ReserveIdentifier, Balance>
   **/
  PalletBalancesReserveData: {
    id: 'Null',
    amount: 'u128'
  },
  /**
   * Lookup255: pallet_balances::pallet::Error<T, I>
   **/
  PalletBalancesError: {
    _enum: ['VestingBalance', 'LiquidityRestrictions', 'InsufficientBalance', 'ExistentialDeposit', 'KeepAlive', 'ExistingVestingSchedule', 'DeadAccount', 'TooManyReserves']
  },
  /**
   * Lookup257: pallet_transaction_payment::Releases
   **/
  PalletTransactionPaymentReleases: {
    _enum: ['V1Ancient', 'V2']
  },
  /**
   * Lookup259: permissions::Scope
   **/
  PermissionsScope: {
    _enum: {
      Limited: 'H512',
      Unlimited: 'Null'
    }
  },
  /**
   * Lookup263: permissions::pallet::Call<T>
   **/
  PermissionsCall: 'Null',
  /**
   * Lookup264: permissions::pallet::Error<T>
   **/
  PermissionsError: {
    _enum: ['PermissionNotFound', 'PermissionNotOwned', 'PermissionAlreadyExists', 'Forbidden', 'IncRefError']
  },
  /**
   * Lookup265: referrals::pallet::Call<T>
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
   * Lookup266: referrals::pallet::Error<T>
   **/
  ReferralsError: {
    _enum: ['AlreadyHasReferrer', 'IncRefError', 'ReferrerInsufficientBalance']
  },
  /**
   * Lookup267: rewards::RewardInfo
   **/
  RewardsRewardInfo: {
    claimable: 'u128',
    total: 'u128'
  },
  /**
   * Lookup271: rewards::pallet::Call<T>
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
   * Lookup272: rewards::pallet::Error<T>
   **/
  RewardsError: {
    _enum: ['NothingToClaim', 'AddressNotEligible', 'SignatureInvalid', 'SignatureVerificationFailed', 'IllegalCall']
  },
  /**
   * Lookup273: xor_fee::pallet::Call<T>
   **/
  XorFeeCall: {
    _enum: {
      update_multiplier: {
        newMultiplier: 'u128'
      }
    }
  },
  /**
   * Lookup274: pallet_multisig::MultisigAccount<sp_core::crypto::AccountId32>
   **/
  PalletMultisigMultisigAccount: {
    signatories: 'Vec<AccountId32>',
    threshold: 'Percent'
  },
  /**
   * Lookup277: pallet_multisig::Multisig<BlockNumber, Balance, sp_core::crypto::AccountId32>
   **/
  PalletMultisigMultisig: {
    when: 'PalletMultisigBridgeTimepoint',
    deposit: 'u128',
    depositor: 'AccountId32',
    approvals: 'Vec<AccountId32>'
  },
  /**
   * Lookup280: pallet_multisig::pallet::Call<T>
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
        maxWeight: 'SpWeightsWeightV2Weight',
      },
      approve_as_multi: {
        id: 'AccountId32',
        maybeTimepoint: 'Option<PalletMultisigBridgeTimepoint>',
        callHash: '[u8;32]',
        maxWeight: 'SpWeightsWeightV2Weight',
      },
      cancel_as_multi: {
        id: 'AccountId32',
        timepoint: 'PalletMultisigBridgeTimepoint',
        callHash: '[u8;32]'
      }
    }
  },
  /**
   * Lookup282: pallet_utility::pallet::Call<T>
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
        calls: 'Vec<Call>',
      },
      with_weight: {
        call: 'Call',
        weight: 'SpWeightsWeightV2Weight'
      }
    }
  },
  /**
   * Lookup284: framenode_runtime::OriginCaller
   **/
  FramenodeRuntimeOriginCaller: {
    _enum: {
      system: 'FrameSupportDispatchRawOrigin',
      __Unused1: 'Null',
      __Unused2: 'Null',
      __Unused3: 'Null',
      __Unused4: 'Null',
      Void: 'SpCoreVoid',
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
      Dispatch: {
        origin: 'BridgeTypesCallOriginOutputU256',
      },
      __Unused99: 'Null',
      __Unused100: 'Null',
      __Unused101: 'Null',
      __Unused102: 'Null',
      __Unused103: 'Null',
      __Unused104: 'Null',
      __Unused105: 'Null',
      __Unused106: 'Null',
      __Unused107: 'Null',
      SubstrateDispatch: 'DispatchRawOrigin'
    }
  },
  /**
   * Lookup285: frame_support::dispatch::RawOrigin<sp_core::crypto::AccountId32>
   **/
  FrameSupportDispatchRawOrigin: {
    _enum: {
      Root: 'Null',
      Signed: 'AccountId32',
      None: 'Null'
    }
  },
  /**
   * Lookup286: pallet_collective::RawOrigin<sp_core::crypto::AccountId32, I>
   **/
  PalletCollectiveRawOrigin: {
    _enum: {
      Members: '(u32,u32)',
      Member: 'AccountId32',
      _Phantom: 'Null'
    }
  },
  /**
   * Lookup289: bridge_types::types::CallOriginOutput<primitive_types::U256, primitive_types::H256, bridge_types::evm::AdditionalEVMInboundData>
   **/
  BridgeTypesCallOriginOutputU256: {
    networkId: 'U256',
    messageId: 'H256',
    timepoint: 'BridgeTypesGenericTimepoint',
    additional: 'BridgeTypesEvmAdditionalEVMInboundData'
  },
  /**
   * Lookup290: bridge_types::evm::AdditionalEVMInboundData
   **/
  BridgeTypesEvmAdditionalEVMInboundData: {
    source: 'H160'
  },
  /**
   * Lookup291: bridge_types::GenericTimepoint
   **/
  BridgeTypesGenericTimepoint: {
    _enum: {
      EVM: 'u64',
      Sora: 'u32',
      Parachain: 'u32',
      Pending: 'Null',
      Unknown: 'Null'
    }
  },
  /**
   * Lookup292: dispatch::RawOrigin<bridge_types::types::CallOriginOutput<bridge_types::SubNetworkId, primitive_types::H256, Additional>>
   **/
  DispatchRawOrigin: {
    origin: 'BridgeTypesCallOriginOutputSubNetworkId'
  },
  /**
   * Lookup293: bridge_types::types::CallOriginOutput<bridge_types::SubNetworkId, primitive_types::H256, Additional>
   **/
  BridgeTypesCallOriginOutputSubNetworkId: {
    networkId: 'BridgeTypesSubNetworkId',
    messageId: 'H256',
    timepoint: 'BridgeTypesGenericTimepoint',
    additional: 'Null'
  },
  /**
   * Lookup294: sp_core::Void
   **/
  SpCoreVoid: 'Null',
  /**
   * Lookup295: pallet_staking::pallet::pallet::Call<T>
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
        validatorStash: 'AccountId32',
      },
      set_min_commission: {
        _alias: {
          new_: 'new',
        },
        new_: 'Perbill'
      }
    }
  },
  /**
   * Lookup296: pallet_staking::RewardDestination<sp_core::crypto::AccountId32>
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
   * Lookup297: pallet_staking::pallet::pallet::ConfigOp<T>
   **/
  PalletStakingPalletConfigOpU128: {
    _enum: {
      Noop: 'Null',
      Set: 'u128',
      Remove: 'Null'
    }
  },
  /**
   * Lookup298: pallet_staking::pallet::pallet::ConfigOp<T>
   **/
  PalletStakingPalletConfigOpU32: {
    _enum: {
      Noop: 'Null',
      Set: 'u32',
      Remove: 'Null'
    }
  },
  /**
   * Lookup299: pallet_staking::pallet::pallet::ConfigOp<sp_arithmetic::per_things::Percent>
   **/
  PalletStakingPalletConfigOpPercent: {
    _enum: {
      Noop: 'Null',
      Set: 'Percent',
      Remove: 'Null'
    }
  },
  /**
   * Lookup300: pallet_staking::pallet::pallet::ConfigOp<sp_arithmetic::per_things::Perbill>
   **/
  PalletStakingPalletConfigOpPerbill: {
    _enum: {
      Noop: 'Null',
      Set: 'Perbill',
      Remove: 'Null'
    }
  },
  /**
   * Lookup301: pallet_session::pallet::Call<T>
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
   * Lookup302: framenode_runtime::opaque::SessionKeys
   **/
  FramenodeRuntimeOpaqueSessionKeys: {
    babe: 'SpConsensusBabeAppPublic',
    grandpa: 'SpFinalityGrandpaAppPublic',
    imOnline: 'PalletImOnlineSr25519AppSr25519Public',
    beefy: 'SpBeefyCryptoPublic'
  },
  /**
   * Lookup303: sp_beefy::crypto::Public
   **/
  SpBeefyCryptoPublic: 'SpCoreEcdsaPublic',
  /**
   * Lookup304: pallet_grandpa::pallet::Call<T>
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
   * Lookup305: sp_finality_grandpa::EquivocationProof<primitive_types::H256, N>
   **/
  SpFinalityGrandpaEquivocationProof: {
    setId: 'u64',
    equivocation: 'SpFinalityGrandpaEquivocation'
  },
  /**
   * Lookup306: sp_finality_grandpa::Equivocation<primitive_types::H256, N>
   **/
  SpFinalityGrandpaEquivocation: {
    _enum: {
      Prevote: 'FinalityGrandpaEquivocationPrevote',
      Precommit: 'FinalityGrandpaEquivocationPrecommit'
    }
  },
  /**
   * Lookup307: finality_grandpa::Equivocation<sp_finality_grandpa::app::Public, finality_grandpa::Prevote<primitive_types::H256, N>, sp_finality_grandpa::app::Signature>
   **/
  FinalityGrandpaEquivocationPrevote: {
    roundNumber: 'u64',
    identity: 'SpFinalityGrandpaAppPublic',
    first: '(FinalityGrandpaPrevote,SpFinalityGrandpaAppSignature)',
    second: '(FinalityGrandpaPrevote,SpFinalityGrandpaAppSignature)'
  },
  /**
   * Lookup308: finality_grandpa::Prevote<primitive_types::H256, N>
   **/
  FinalityGrandpaPrevote: {
    targetHash: 'H256',
    targetNumber: 'u32'
  },
  /**
   * Lookup309: sp_finality_grandpa::app::Signature
   **/
  SpFinalityGrandpaAppSignature: 'SpCoreEd25519Signature',
  /**
   * Lookup310: sp_core::ed25519::Signature
   **/
  SpCoreEd25519Signature: '[u8;64]',
  /**
   * Lookup312: finality_grandpa::Equivocation<sp_finality_grandpa::app::Public, finality_grandpa::Precommit<primitive_types::H256, N>, sp_finality_grandpa::app::Signature>
   **/
  FinalityGrandpaEquivocationPrecommit: {
    roundNumber: 'u64',
    identity: 'SpFinalityGrandpaAppPublic',
    first: '(FinalityGrandpaPrecommit,SpFinalityGrandpaAppSignature)',
    second: '(FinalityGrandpaPrecommit,SpFinalityGrandpaAppSignature)'
  },
  /**
   * Lookup313: finality_grandpa::Precommit<primitive_types::H256, N>
   **/
  FinalityGrandpaPrecommit: {
    targetHash: 'H256',
    targetNumber: 'u32'
  },
  /**
   * Lookup315: pallet_im_online::pallet::Call<T>
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
   * Lookup316: pallet_im_online::Heartbeat<BlockNumber>
   **/
  PalletImOnlineHeartbeat: {
    blockNumber: 'u32',
    networkState: 'SpCoreOffchainOpaqueNetworkState',
    sessionIndex: 'u32',
    authorityIndex: 'u32',
    validatorsLen: 'u32'
  },
  /**
   * Lookup317: sp_core::offchain::OpaqueNetworkState
   **/
  SpCoreOffchainOpaqueNetworkState: {
    peerId: 'OpaquePeerId',
    externalAddresses: 'Vec<OpaqueMultiaddr>'
  },
  /**
   * Lookup321: pallet_im_online::sr25519::app_sr25519::Signature
   **/
  PalletImOnlineSr25519AppSr25519Signature: 'SpCoreSr25519Signature',
  /**
   * Lookup322: sp_core::sr25519::Signature
   **/
  SpCoreSr25519Signature: '[u8;64]',
  /**
   * Lookup323: trading_pair::pallet::Call<T>
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
   * Lookup324: assets::pallet::Call<T>
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
      force_mint: {
        assetId: 'CommonPrimitivesAssetId32',
        to: 'AccountId32',
        amount: 'u128',
      },
      burn: {
        assetId: 'CommonPrimitivesAssetId32',
        amount: 'u128',
      },
      update_balance: {
        who: 'AccountId32',
        currencyId: 'CommonPrimitivesAssetId32',
        amount: 'i128',
      },
      set_non_mintable: {
        assetId: 'CommonPrimitivesAssetId32',
      },
      update_info: {
        assetId: 'CommonPrimitivesAssetId32',
        newSymbol: 'Option<Bytes>',
        newName: 'Option<Bytes>'
      }
    }
  },
  /**
   * Lookup329: multicollateral_bonding_curve_pool::pallet::Call<T>
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
   * Lookup330: technical::pallet::Call<T>
   **/
  TechnicalCall: 'Null',
  /**
   * Lookup331: pool_xyk::pallet::Call<T>
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
   * Lookup332: liquidity_proxy::pallet::Call<T>
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
        filterMode: 'CommonPrimitivesFilterMode',
      },
      swap_transfer_batch: {
        swapBatches: 'Vec<LiquidityProxySwapBatchInfo>',
        inputAssetId: 'CommonPrimitivesAssetId32',
        maxInputAmount: 'u128',
        selectedSourceTypes: 'Vec<CommonPrimitivesLiquiditySourceType>',
        filterMode: 'CommonPrimitivesFilterMode',
      },
      enable_liquidity_source: {
        liquiditySource: 'CommonPrimitivesLiquiditySourceType',
      },
      disable_liquidity_source: {
        liquiditySource: 'CommonPrimitivesLiquiditySourceType',
      },
      set_adar_commission_ratio: {
        commissionRatio: 'u128',
      },
      xorless_transfer: {
        dexId: 'u32',
        assetId: 'CommonPrimitivesAssetId32',
        receiver: 'AccountId32',
        amount: 'u128',
        desiredXorAmount: 'u128',
        maxAmountIn: 'u128',
        selectedSourceTypes: 'Vec<CommonPrimitivesLiquiditySourceType>',
        filterMode: 'CommonPrimitivesFilterMode',
        additionalData: 'Option<Bytes>'
      }
    }
  },
  /**
   * Lookup333: common::swap_amount::SwapAmount<AmountType>
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
   * Lookup335: common::primitives::FilterMode
   **/
  CommonPrimitivesFilterMode: {
    _enum: ['Disabled', 'ForbidSelected', 'AllowSelected']
  },
  /**
   * Lookup337: liquidity_proxy::SwapBatchInfo<common::primitives::AssetId32<common::primitives::PredefinedAssetId>, DEXId, sp_core::crypto::AccountId32>
   **/
  LiquidityProxySwapBatchInfo: {
    outcomeAssetId: 'CommonPrimitivesAssetId32',
    outcomeAssetReuse: 'u128',
    dexId: 'u32',
    receivers: 'Vec<LiquidityProxyBatchReceiverInfo>'
  },
  /**
   * Lookup339: liquidity_proxy::BatchReceiverInfo<sp_core::crypto::AccountId32>
   **/
  LiquidityProxyBatchReceiverInfo: {
    accountId: 'AccountId32',
    targetAmount: 'u128'
  },
  /**
   * Lookup340: pallet_collective::pallet::Call<T, I>
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
      close_old_weight: {
        proposalHash: 'H256',
        index: 'Compact<u32>',
        proposalWeightBound: 'Compact<u64>',
        lengthBound: 'Compact<u32>',
      },
      disapprove_proposal: {
        proposalHash: 'H256',
      },
      close: {
        proposalHash: 'H256',
        index: 'Compact<u32>',
        proposalWeightBound: 'SpWeightsWeightV2Weight',
        lengthBound: 'Compact<u32>'
      }
    }
  },
  /**
   * Lookup344: pallet_democracy::pallet::Call<T>
   **/
  PalletDemocracyCall: {
    _enum: {
      propose: {
        proposal: 'FrameSupportPreimagesBounded',
        value: 'Compact<u128>',
      },
      second: {
        proposal: 'Compact<u32>',
      },
      vote: {
        refIndex: 'Compact<u32>',
        vote: 'PalletDemocracyVoteAccountVote',
      },
      emergency_cancel: {
        refIndex: 'u32',
      },
      external_propose: {
        proposal: 'FrameSupportPreimagesBounded',
      },
      external_propose_majority: {
        proposal: 'FrameSupportPreimagesBounded',
      },
      external_propose_default: {
        proposal: 'FrameSupportPreimagesBounded',
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
      delegate: {
        to: 'AccountId32',
        conviction: 'PalletDemocracyConviction',
        balance: 'u128',
      },
      undelegate: 'Null',
      clear_public_proposals: 'Null',
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
   * Lookup345: frame_support::traits::preimages::Bounded<framenode_runtime::RuntimeCall>
   **/
  FrameSupportPreimagesBounded: {
    _enum: {
      Legacy: {
        _alias: {
          hash_: 'hash',
        },
        hash_: 'H256',
      },
      Inline: 'Bytes',
      Lookup: {
        _alias: {
          hash_: 'hash',
        },
        hash_: 'H256',
        len: 'u32'
      }
    }
  },
  /**
   * Lookup347: pallet_democracy::conviction::Conviction
   **/
  PalletDemocracyConviction: {
    _enum: ['None', 'Locked1x', 'Locked2x', 'Locked3x', 'Locked4x', 'Locked5x', 'Locked6x']
  },
  /**
   * Lookup349: dex_api::pallet::Call<T>
   **/
  DexApiCall: 'Null',
  /**
   * Lookup350: eth_bridge::pallet::Call<T>
   **/
  EthBridgeCall: {
    _enum: {
      register_bridge: {
        bridgeContractAddress: 'H160',
        initialPeers: 'Vec<AccountId32>',
        signatureVersion: 'EthBridgeBridgeSignatureVersion',
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
        newSignatureVersion: 'EthBridgeBridgeSignatureVersion',
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
   * Lookup351: eth_bridge::BridgeSignatureVersion
   **/
  EthBridgeBridgeSignatureVersion: {
    _enum: ['V1', 'V2', 'V3']
  },
  /**
   * Lookup352: eth_bridge::requests::IncomingRequestKind
   **/
  EthBridgeRequestsIncomingRequestKind: {
    _enum: {
      Transaction: 'EthBridgeRequestsIncomingTransactionRequestKind',
      Meta: 'EthBridgeRequestsIncomingMetaRequestKind'
    }
  },
  /**
   * Lookup353: eth_bridge::requests::IncomingTransactionRequestKind
   **/
  EthBridgeRequestsIncomingTransactionRequestKind: {
    _enum: ['Transfer', 'AddAsset', 'AddPeer', 'RemovePeer', 'PrepareForMigration', 'Migrate', 'AddPeerCompat', 'RemovePeerCompat', 'TransferXOR']
  },
  /**
   * Lookup354: eth_bridge::requests::IncomingMetaRequestKind
   **/
  EthBridgeRequestsIncomingMetaRequestKind: {
    _enum: ['CancelOutgoingRequest', 'MarkAsDone']
  },
  /**
   * Lookup356: eth_bridge::requests::IncomingRequest<T>
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
   * Lookup357: eth_bridge::requests::incoming::IncomingTransfer<T>
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
   * Lookup358: eth_bridge::requests::AssetKind
   **/
  EthBridgeRequestsAssetKind: {
    _enum: ['Thischain', 'Sidechain', 'SidechainOwned']
  },
  /**
   * Lookup359: eth_bridge::requests::incoming::IncomingAddToken<T>
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
   * Lookup360: eth_bridge::requests::incoming::IncomingChangePeers<T>
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
   * Lookup361: eth_bridge::requests::incoming::IncomingCancelOutgoingRequest<T>
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
   * Lookup362: eth_bridge::requests::OutgoingRequest<T>
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
   * Lookup363: eth_bridge::requests::outgoing::OutgoingTransfer<T>
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
   * Lookup364: eth_bridge::requests::outgoing::OutgoingAddAsset<T>
   **/
  EthBridgeRequestsOutgoingOutgoingAddAsset: {
    author: 'AccountId32',
    assetId: 'CommonPrimitivesAssetId32',
    nonce: 'u32',
    networkId: 'u32',
    timepoint: 'PalletMultisigBridgeTimepoint'
  },
  /**
   * Lookup365: eth_bridge::requests::outgoing::OutgoingAddToken<T>
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
   * Lookup366: eth_bridge::requests::outgoing::OutgoingAddPeer<T>
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
   * Lookup367: eth_bridge::requests::outgoing::OutgoingRemovePeer<T>
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
   * Lookup369: eth_bridge::requests::outgoing::OutgoingPrepareForMigration<T>
   **/
  EthBridgeRequestsOutgoingOutgoingPrepareForMigration: {
    author: 'AccountId32',
    nonce: 'u32',
    networkId: 'u32',
    timepoint: 'PalletMultisigBridgeTimepoint'
  },
  /**
   * Lookup370: eth_bridge::requests::outgoing::OutgoingMigrate<T>
   **/
  EthBridgeRequestsOutgoingOutgoingMigrate: {
    author: 'AccountId32',
    newContractAddress: 'H160',
    erc20NativeTokens: 'Vec<H160>',
    nonce: 'u32',
    networkId: 'u32',
    timepoint: 'PalletMultisigBridgeTimepoint',
    newSignatureVersion: 'EthBridgeBridgeSignatureVersion'
  },
  /**
   * Lookup371: eth_bridge::requests::outgoing::OutgoingAddPeerCompat<T>
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
   * Lookup372: eth_bridge::requests::outgoing::OutgoingRemovePeerCompat<T>
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
   * Lookup373: eth_bridge::requests::incoming::IncomingMarkAsDoneRequest<T>
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
   * Lookup374: eth_bridge::requests::incoming::IncomingPrepareForMigration<T>
   **/
  EthBridgeRequestsIncomingIncomingPrepareForMigration: {
    author: 'AccountId32',
    txHash: 'H256',
    atHeight: 'u64',
    timepoint: 'PalletMultisigBridgeTimepoint',
    networkId: 'u32'
  },
  /**
   * Lookup375: eth_bridge::requests::incoming::IncomingMigrate<T>
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
   * Lookup376: eth_bridge::requests::incoming::IncomingChangePeersCompat<T>
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
   * Lookup377: eth_bridge::requests::incoming::ChangePeersContract
   **/
  EthBridgeRequestsIncomingChangePeersContract: {
    _enum: ['XOR', 'VAL']
  },
  /**
   * Lookup378: eth_bridge::requests::LoadIncomingRequest<T>
   **/
  EthBridgeRequestsLoadIncomingRequest: {
    _enum: {
      Transaction: 'EthBridgeRequestsLoadIncomingTransactionRequest',
      Meta: '(EthBridgeRequestsLoadIncomingMetaRequest,H256)'
    }
  },
  /**
   * Lookup379: eth_bridge::requests::LoadIncomingTransactionRequest<T>
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
   * Lookup380: eth_bridge::requests::LoadIncomingMetaRequest<T>
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
   * Lookup382: eth_bridge::offchain::SignatureParams
   **/
  EthBridgeOffchainSignatureParams: {
    r: '[u8;32]',
    s: '[u8;32]',
    v: 'u8'
  },
  /**
   * Lookup383: pswap_distribution::pallet::Call<T>
   **/
  PswapDistributionCall: {
    _enum: ['claim_incentive']
  },
  /**
   * Lookup386: pallet_scheduler::pallet::Call<T>
   **/
  PalletSchedulerCall: {
    _enum: {
      schedule: {
        when: 'u32',
        maybePeriodic: 'Option<(u32,u32)>',
        priority: 'u8',
        call: 'Call',
      },
      cancel: {
        when: 'u32',
        index: 'u32',
      },
      schedule_named: {
        id: '[u8;32]',
        when: 'u32',
        maybePeriodic: 'Option<(u32,u32)>',
        priority: 'u8',
        call: 'Call',
      },
      cancel_named: {
        id: '[u8;32]',
      },
      schedule_after: {
        after: 'u32',
        maybePeriodic: 'Option<(u32,u32)>',
        priority: 'u8',
        call: 'Call',
      },
      schedule_named_after: {
        id: '[u8;32]',
        after: 'u32',
        maybePeriodic: 'Option<(u32,u32)>',
        priority: 'u8',
        call: 'Call'
      }
    }
  },
  /**
   * Lookup388: iroha_migration::pallet::Call<T>
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
   * Lookup389: pallet_membership::pallet::Call<T, I>
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
   * Lookup390: pallet_elections_phragmen::pallet::Call<T>
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
   * Lookup391: pallet_elections_phragmen::Renouncing
   **/
  PalletElectionsPhragmenRenouncing: {
    _enum: {
      Member: 'Null',
      RunnerUp: 'Null',
      Candidate: 'Compact<u32>'
    }
  },
  /**
   * Lookup392: vested_rewards::pallet::Call<T>
   **/
  VestedRewardsCall: {
    _enum: {
      claim_rewards: 'Null',
      claim_crowdloan_rewards: {
        crowdloan: 'Bytes',
      },
      update_rewards: {
        rewards: 'BTreeMap<AccountId32, BTreeMap<CommonPrimitivesRewardReason, u128>>',
      },
      register_crowdloan: {
        tag: 'Bytes',
        startBlock: 'u32',
        length: 'u32',
        rewards: 'Vec<(CommonPrimitivesAssetId32,u128)>',
        contributions: 'Vec<(AccountId32,u128)>'
      }
    }
  },
  /**
   * Lookup402: pallet_identity::pallet::Call<T>
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
        identity: 'H256',
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
   * Lookup403: pallet_identity::types::IdentityInfo<FieldLimit>
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
   * Lookup439: pallet_identity::types::BitFlags<pallet_identity::types::IdentityField>
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
   * Lookup440: pallet_identity::types::IdentityField
   **/
  PalletIdentityIdentityField: {
    _enum: ['__Unused0', 'Display', 'Legal', '__Unused3', 'Web', '__Unused5', '__Unused6', '__Unused7', 'Riot', '__Unused9', '__Unused10', '__Unused11', '__Unused12', '__Unused13', '__Unused14', '__Unused15', 'Email', '__Unused17', '__Unused18', '__Unused19', '__Unused20', '__Unused21', '__Unused22', '__Unused23', '__Unused24', '__Unused25', '__Unused26', '__Unused27', '__Unused28', '__Unused29', '__Unused30', '__Unused31', 'PgpFingerprint', '__Unused33', '__Unused34', '__Unused35', '__Unused36', '__Unused37', '__Unused38', '__Unused39', '__Unused40', '__Unused41', '__Unused42', '__Unused43', '__Unused44', '__Unused45', '__Unused46', '__Unused47', '__Unused48', '__Unused49', '__Unused50', '__Unused51', '__Unused52', '__Unused53', '__Unused54', '__Unused55', '__Unused56', '__Unused57', '__Unused58', '__Unused59', '__Unused60', '__Unused61', '__Unused62', '__Unused63', 'Image', '__Unused65', '__Unused66', '__Unused67', '__Unused68', '__Unused69', '__Unused70', '__Unused71', '__Unused72', '__Unused73', '__Unused74', '__Unused75', '__Unused76', '__Unused77', '__Unused78', '__Unused79', '__Unused80', '__Unused81', '__Unused82', '__Unused83', '__Unused84', '__Unused85', '__Unused86', '__Unused87', '__Unused88', '__Unused89', '__Unused90', '__Unused91', '__Unused92', '__Unused93', '__Unused94', '__Unused95', '__Unused96', '__Unused97', '__Unused98', '__Unused99', '__Unused100', '__Unused101', '__Unused102', '__Unused103', '__Unused104', '__Unused105', '__Unused106', '__Unused107', '__Unused108', '__Unused109', '__Unused110', '__Unused111', '__Unused112', '__Unused113', '__Unused114', '__Unused115', '__Unused116', '__Unused117', '__Unused118', '__Unused119', '__Unused120', '__Unused121', '__Unused122', '__Unused123', '__Unused124', '__Unused125', '__Unused126', '__Unused127', 'Twitter']
  },
  /**
   * Lookup441: pallet_identity::types::Judgement<Balance>
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
   * Lookup442: xst::pallet::Call<T>
   **/
  XstCall: {
    _enum: {
      set_reference_asset: {
        referenceAssetId: 'CommonPrimitivesAssetId32',
      },
      enable_synthetic_asset: {
        assetId: 'CommonPrimitivesAssetId32',
        referenceSymbol: 'Bytes',
        feeRatio: 'FixnumFixedPoint',
      },
      register_synthetic_asset: {
        assetSymbol: 'Bytes',
        assetName: 'Bytes',
        referenceSymbol: 'Bytes',
        feeRatio: 'FixnumFixedPoint',
      },
      disable_synthetic_asset: {
        syntheticAsset: 'CommonPrimitivesAssetId32',
      },
      remove_synthetic_asset: {
        syntheticAsset: 'CommonPrimitivesAssetId32',
      },
      set_synthetic_asset_fee: {
        syntheticAsset: 'CommonPrimitivesAssetId32',
        feeRatio: 'FixnumFixedPoint',
      },
      set_synthetic_base_asset_floor_price: {
        floorPrice: 'u128'
      }
    }
  },
  /**
   * Lookup443: ceres_staking::pallet::Call<T>
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
   * Lookup444: ceres_liquidity_locker::pallet::Call<T>
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
   * Lookup445: ceres_token_locker::pallet::Call<T>
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
   * Lookup446: ceres_governance_platform::pallet::Call<T>
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
   * Lookup447: ceres_launchpad::pallet::Call<T>
   **/
  CeresLaunchpadCall: {
    _enum: {
      create_ilo: {
        baseAsset: 'CommonPrimitivesAssetId32',
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
      change_fee_percent_for_raised_funds: {
        feePercent: 'u128',
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
   * Lookup448: demeter_farming_platform::pallet::Call<T>
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
        baseAsset: 'CommonPrimitivesAssetId32',
        poolAsset: 'CommonPrimitivesAssetId32',
        rewardAsset: 'CommonPrimitivesAssetId32',
        isFarm: 'bool',
        multiplier: 'u32',
        depositFee: 'u128',
        isCore: 'bool',
      },
      deposit: {
        baseAsset: 'CommonPrimitivesAssetId32',
        poolAsset: 'CommonPrimitivesAssetId32',
        rewardAsset: 'CommonPrimitivesAssetId32',
        isFarm: 'bool',
        pooledTokens: 'u128',
      },
      get_rewards: {
        baseAsset: 'CommonPrimitivesAssetId32',
        poolAsset: 'CommonPrimitivesAssetId32',
        rewardAsset: 'CommonPrimitivesAssetId32',
        isFarm: 'bool',
      },
      withdraw: {
        baseAsset: 'CommonPrimitivesAssetId32',
        poolAsset: 'CommonPrimitivesAssetId32',
        rewardAsset: 'CommonPrimitivesAssetId32',
        pooledTokens: 'u128',
        isFarm: 'bool',
      },
      remove_pool: {
        baseAsset: 'CommonPrimitivesAssetId32',
        poolAsset: 'CommonPrimitivesAssetId32',
        rewardAsset: 'CommonPrimitivesAssetId32',
        isFarm: 'bool',
      },
      change_pool_multiplier: {
        baseAsset: 'CommonPrimitivesAssetId32',
        poolAsset: 'CommonPrimitivesAssetId32',
        rewardAsset: 'CommonPrimitivesAssetId32',
        isFarm: 'bool',
        newMultiplier: 'u32',
      },
      change_total_tokens: {
        baseAsset: 'CommonPrimitivesAssetId32',
        poolAsset: 'CommonPrimitivesAssetId32',
        rewardAsset: 'CommonPrimitivesAssetId32',
        isFarm: 'bool',
        totalTokens: 'u128',
      },
      change_info: {
        changedUser: 'AccountId32',
        baseAsset: 'CommonPrimitivesAssetId32',
        poolAsset: 'CommonPrimitivesAssetId32',
        rewardAsset: 'CommonPrimitivesAssetId32',
        isFarm: 'bool',
        poolTokens: 'u128',
      },
      change_pool_deposit_fee: {
        baseAsset: 'CommonPrimitivesAssetId32',
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
   * Lookup449: pallet_bags_list::pallet::Call<T, I>
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
   * Lookup450: pallet_election_provider_multi_phase::pallet::Call<T>
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
   * Lookup451: pallet_election_provider_multi_phase::RawSolution<framenode_runtime::NposCompactSolution24>
   **/
  PalletElectionProviderMultiPhaseRawSolution: {
    solution: 'FramenodeRuntimeNposCompactSolution24',
    score: 'SpNposElectionsElectionScore',
    round: 'u32'
  },
  /**
   * Lookup452: framenode_runtime::NposCompactSolution24
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
   * Lookup527: pallet_election_provider_multi_phase::SolutionOrSnapshotSize
   **/
  PalletElectionProviderMultiPhaseSolutionOrSnapshotSize: {
    voters: 'Compact<u32>',
    targets: 'Compact<u32>'
  },
  /**
   * Lookup531: sp_npos_elections::Support<sp_core::crypto::AccountId32>
   **/
  SpNposElectionsSupport: {
    total: 'u128',
    voters: 'Vec<(AccountId32,u128)>'
  },
  /**
   * Lookup532: band::pallet::Call<T, I>
   **/
  BandCall: {
    _enum: {
      relay: {
        rates: 'Vec<(Bytes,u64)>',
        resolveTime: 'u64',
        requestId: 'u64',
      },
      force_relay: {
        rates: 'Vec<(Bytes,u64)>',
        resolveTime: 'u64',
        requestId: 'u64',
      },
      add_relayers: {
        accountIds: 'Vec<AccountId32>',
      },
      remove_relayers: {
        accountIds: 'Vec<AccountId32>',
      },
      set_dynamic_fee_parameters: {
        feeParameters: 'BandFeeCalculationParameters'
      }
    }
  },
  /**
   * Lookup536: band::FeeCalculationParameters
   **/
  BandFeeCalculationParameters: {
    decay: 'FixnumFixedPoint',
    minFee: 'FixnumFixedPoint',
    deviation: 'FixnumFixedPoint'
  },
  /**
   * Lookup537: oracle_proxy::pallet::Call<T>
   **/
  OracleProxyCall: {
    _enum: {
      enable_oracle: {
        oracle: 'CommonPrimitivesOracle',
      },
      disable_oracle: {
        oracle: 'CommonPrimitivesOracle'
      }
    }
  },
  /**
   * Lookup538: hermes_governance_platform::pallet::Call<T>
   **/
  HermesGovernancePlatformCall: {
    _enum: {
      vote: {
        pollId: 'H256',
        votingOption: 'Bytes',
      },
      create_poll: {
        pollStartTimestamp: 'u64',
        pollEndTimestamp: 'u64',
        title: 'Bytes',
        description: 'Bytes',
        options: 'Vec<Bytes>',
      },
      withdraw_funds_voter: {
        pollId: 'H256',
      },
      withdraw_funds_creator: {
        pollId: 'H256',
      },
      change_min_hermes_for_voting: {
        hermesAmount: 'u128',
      },
      change_min_hermes_for_creating_poll: {
        hermesAmount: 'u128'
      }
    }
  },
  /**
   * Lookup543: pallet_preimage::pallet::Call<T>
   **/
  PalletPreimageCall: {
    _enum: {
      note_preimage: {
        bytes: 'Bytes',
      },
      unnote_preimage: {
        _alias: {
          hash_: 'hash',
        },
        hash_: 'H256',
      },
      request_preimage: {
        _alias: {
          hash_: 'hash',
        },
        hash_: 'H256',
      },
      unrequest_preimage: {
        _alias: {
          hash_: 'hash',
        },
        hash_: 'H256'
      }
    }
  },
  /**
   * Lookup544: order_book::pallet::Call<T>
   **/
  OrderBookCall: {
    _enum: {
      create_orderbook: {
        orderBookId: 'OrderBookOrderBookId',
      },
      delete_orderbook: {
        orderBookId: 'OrderBookOrderBookId',
      },
      update_orderbook: {
        orderBookId: 'OrderBookOrderBookId',
        tickSize: 'u128',
        stepLotSize: 'u128',
        minLotSize: 'u128',
        maxLotSize: 'u128',
      },
      change_orderbook_status: {
        orderBookId: 'OrderBookOrderBookId',
        status: 'OrderBookOrderBookStatus',
      },
      place_limit_order: {
        orderBookId: 'OrderBookOrderBookId',
        price: 'u128',
        amount: 'u128',
        side: 'CommonPrimitivesPriceVariant',
        lifespan: 'Option<u64>',
      },
      cancel_limit_order: {
        orderBookId: 'OrderBookOrderBookId',
        orderId: 'u128',
      },
      cancel_limit_orders_batch: {
        limitOrdersToCancel: 'Vec<(OrderBookOrderBookId,Vec<u128>)>',
      },
      execute_market_order: {
        orderBookId: 'OrderBookOrderBookId',
        direction: 'CommonPrimitivesPriceVariant',
        amount: 'u128'
      }
    }
  },
  /**
   * Lookup547: bridge_proxy::pallet::Call<T>
   **/
  BridgeProxyCall: {
    _enum: {
      burn: {
        networkId: 'BridgeTypesGenericNetworkId',
        assetId: 'CommonPrimitivesAssetId32',
        recipient: 'BridgeTypesGenericAccount',
        amount: 'u128',
      },
      add_limited_asset: {
        assetId: 'CommonPrimitivesAssetId32',
      },
      remove_limited_asset: {
        assetId: 'CommonPrimitivesAssetId32',
      },
      update_transfer_limit: {
        settings: 'BridgeProxyTransferLimitSettings'
      }
    }
  },
  /**
   * Lookup548: bridge_types::GenericAccount<sp_core::crypto::AccountId32>
   **/
  BridgeTypesGenericAccount: {
    _enum: {
      EVM: 'H160',
      Sora: 'AccountId32',
      Parachain: 'XcmVersionedMultiLocation',
      Unknown: 'Null',
      Root: 'Null'
    }
  },
  /**
   * Lookup549: bridge_proxy::TransferLimitSettings<BlockNumber>
   **/
  BridgeProxyTransferLimitSettings: {
    maxAmount: 'u128',
    periodBlocks: 'u32'
  },
  /**
   * Lookup550: ethereum_light_client::pallet::Call<T>
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
        submitter: 'AccountId32',
        signature: 'SpRuntimeMultiSignature'
      }
    }
  },
  /**
   * Lookup551: bridge_types::network_config::NetworkConfig
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
   * Lookup552: bridge_types::network_config::Consensus
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
   * Lookup553: bridge_types::difficulty::ForkConfig
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
   * Lookup554: bridge_types::difficulty::ClassicForkConfig
   **/
  BridgeTypesDifficultyClassicForkConfig: {
    ecip1041Block: 'u64',
    ecip1099Block: 'u64'
  },
  /**
   * Lookup555: bridge_types::header::Header
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
   * Lookup556: ethbloom::Bloom
   **/
  EthbloomBloom: '[u8;256]',
  /**
   * Lookup560: bridge_types::ethashproof::DoubleNodeWithMerkleProof
   **/
  BridgeTypesEthashproofDoubleNodeWithMerkleProof: {
    dagNodes: '[H512;2]',
    proof: 'Vec<H128>'
  },
  /**
   * Lookup564: bridge_types::ethashproof::MixNonce
   **/
  BridgeTypesEthashproofMixNonce: '[u8;32]',
  /**
   * Lookup565: sp_runtime::MultiSignature
   **/
  SpRuntimeMultiSignature: {
    _enum: {
      Ed25519: 'SpCoreEd25519Signature',
      Sr25519: 'SpCoreSr25519Signature',
      Ecdsa: 'SpCoreEcdsaSignature'
    }
  },
  /**
   * Lookup566: bridge_inbound_channel::pallet::Call<T>
   **/
  BridgeInboundChannelCall: {
    _enum: {
      submit: {
        networkId: 'U256',
        log: 'BridgeTypesLog',
        proof: 'BridgeTypesEvmProof',
      },
      batch_dispatched: {
        networkId: 'U256',
        log: 'BridgeTypesLog',
        proof: 'BridgeTypesEvmProof',
      },
      register_channel: {
        networkId: 'U256',
        inboundChannel: 'H160',
        outboundChannel: 'H160',
      },
      set_reward_fraction: {
        fraction: 'Perbill'
      }
    }
  },
  /**
   * Lookup567: bridge_types::log::Log
   **/
  BridgeTypesLog: {
    address: 'H160',
    topics: 'Vec<H256>',
    data: 'Bytes'
  },
  /**
   * Lookup568: bridge_types::evm::Proof
   **/
  BridgeTypesEvmProof: {
    blockHash: 'H256',
    txIndex: 'u32',
    data: 'Vec<Bytes>'
  },
  /**
   * Lookup569: eth_app::pallet::Call<T>
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
        sidechainPrecision: 'u8',
        contract: 'H160',
      },
      register_network_with_existing_asset: {
        networkId: 'U256',
        assetId: 'CommonPrimitivesAssetId32',
        contract: 'H160',
        sidechainPrecision: 'u8'
      }
    }
  },
  /**
   * Lookup570: erc20_app::pallet::Call<T>
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
        decimals: 'u8',
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
   * Lookup571: migration_app::pallet::Call<T>
   **/
  MigrationAppCall: {
    _enum: {
      migrate_erc20: {
        networkId: 'U256',
        erc20Assets: 'Vec<(CommonPrimitivesAssetId32,H160,u8)>',
      },
      migrate_sidechain: {
        networkId: 'U256',
        sidechainAssets: 'Vec<(CommonPrimitivesAssetId32,H160,u8)>',
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
   * Lookup574: beefy_light_client::pallet::Call<T>
   **/
  BeefyLightClientCall: {
    _enum: {
      initialize: {
        networkId: 'BridgeTypesSubNetworkId',
        latestBeefyBlock: 'u64',
        validatorSet: 'SpBeefyMmrBeefyAuthoritySet',
        nextValidatorSet: 'SpBeefyMmrBeefyAuthoritySet',
      },
      submit_signature_commitment: {
        networkId: 'BridgeTypesSubNetworkId',
        commitment: 'SpBeefyCommitment',
        validatorProof: 'BridgeCommonBeefyTypesValidatorProof',
        latestMmrLeaf: 'SpBeefyMmrMmrLeaf',
        proof: 'BridgeCommonSimplifiedProofProof'
      }
    }
  },
  /**
   * Lookup575: sp_beefy::mmr::BeefyAuthoritySet<primitive_types::H256>
   **/
  SpBeefyMmrBeefyAuthoritySet: {
    id: 'u64',
    len: 'u32',
    root: 'H256'
  },
  /**
   * Lookup576: sp_beefy::commitment::Commitment<TBlockNumber>
   **/
  SpBeefyCommitment: {
    payload: 'SpBeefyPayload',
    blockNumber: 'u32',
    validatorSetId: 'u64'
  },
  /**
   * Lookup577: sp_beefy::payload::Payload
   **/
  SpBeefyPayload: 'Vec<([u8;2],Bytes)>',
  /**
   * Lookup580: bridge_common::beefy_types::ValidatorProof
   **/
  BridgeCommonBeefyTypesValidatorProof: {
    validatorClaimsBitfield: 'BitVec',
    signatures: 'Vec<Bytes>',
    positions: 'Vec<u128>',
    publicKeys: 'Vec<H160>',
    publicKeyMerkleProofs: 'Vec<Vec<H256>>'
  },
  /**
   * Lookup583: bitvec::order::Msb0
   **/
  BitvecOrderMsb0: 'Null',
  /**
   * Lookup585: sp_beefy::mmr::MmrLeaf<BlockNumber, primitive_types::H256, primitive_types::H256, bridge_types::types::LeafExtraData<primitive_types::H256, primitive_types::H256>>
   **/
  SpBeefyMmrMmrLeaf: {
    version: 'u8',
    parentNumberAndHash: '(u32,H256)',
    beefyNextAuthoritySet: 'SpBeefyMmrBeefyAuthoritySet',
    leafExtra: 'BridgeTypesLeafExtraData'
  },
  /**
   * Lookup586: bridge_types::types::LeafExtraData<primitive_types::H256, primitive_types::H256>
   **/
  BridgeTypesLeafExtraData: {
    randomSeed: 'H256',
    digestHash: 'H256'
  },
  /**
   * Lookup589: bridge_common::simplified_proof::Proof<primitive_types::H256>
   **/
  BridgeCommonSimplifiedProofProof: {
    order: 'u64',
    items: 'Vec<H256>'
  },
  /**
   * Lookup590: substrate_bridge_channel::inbound::pallet::Call<T>
   **/
  SubstrateBridgeChannelInboundPalletCall: {
    _enum: {
      submit: {
        networkId: 'BridgeTypesSubNetworkId',
        commitment: 'BridgeTypesGenericCommitment',
        proof: 'FramenodeRuntimeMultiProof'
      }
    }
  },
  /**
   * Lookup591: bridge_types::GenericCommitment<MaxMessages, MaxPayload>
   **/
  BridgeTypesGenericCommitment: {
    _enum: {
      Sub: 'BridgeTypesSubstrateCommitment',
      EVM: 'BridgeTypesEvmCommitment'
    }
  },
  /**
   * Lookup592: bridge_types::substrate::Commitment<MaxMessages, MaxPayload>
   **/
  BridgeTypesSubstrateCommitment: {
    messages: 'Vec<BridgeTypesSubstrateBridgeMessage>',
    nonce: 'u64'
  },
  /**
   * Lookup594: bridge_types::substrate::BridgeMessage<MaxPayload>
   **/
  BridgeTypesSubstrateBridgeMessage: {
    payload: 'Bytes',
    timepoint: 'BridgeTypesGenericTimepoint'
  },
  /**
   * Lookup597: bridge_types::evm::Commitment<MaxMessages, MaxPayload>
   **/
  BridgeTypesEvmCommitment: {
    nonce: 'u64',
    totalMaxGas: 'U256',
    messages: 'Vec<BridgeTypesEvmMessage>'
  },
  /**
   * Lookup599: bridge_types::evm::Message<MaxPayload>
   **/
  BridgeTypesEvmMessage: {
    target: 'H160',
    maxGas: 'U256',
    payload: 'Bytes'
  },
  /**
   * Lookup601: framenode_runtime::MultiProof
   **/
  FramenodeRuntimeMultiProof: {
    _enum: {
      Beefy: 'BeefyLightClientSubstrateBridgeMessageProof',
      Multisig: 'MultisigVerifierProof'
    }
  },
  /**
   * Lookup602: beefy_light_client::SubstrateBridgeMessageProof
   **/
  BeefyLightClientSubstrateBridgeMessageProof: {
    proof: 'BridgeCommonSimplifiedProofProof',
    leaf: 'SpBeefyMmrMmrLeaf',
    digest: 'BridgeTypesAuxiliaryDigest'
  },
  /**
   * Lookup603: bridge_types::types::AuxiliaryDigest
   **/
  BridgeTypesAuxiliaryDigest: {
    logs: 'Vec<BridgeTypesAuxiliaryDigestItem>'
  },
  /**
   * Lookup605: bridge_types::types::AuxiliaryDigestItem
   **/
  BridgeTypesAuxiliaryDigestItem: {
    _enum: {
      Commitment: '(BridgeTypesGenericNetworkId,H256)'
    }
  },
  /**
   * Lookup606: multisig_verifier::Proof
   **/
  MultisigVerifierProof: {
    digest: 'BridgeTypesAuxiliaryDigest',
    proof: 'Vec<SpCoreEcdsaSignature>'
  },
  /**
   * Lookup607: parachain_bridge_app::pallet::Call<T>
   **/
  ParachainBridgeAppCall: {
    _enum: {
      mint: {
        assetId: 'CommonPrimitivesAssetId32',
        sender: 'Option<XcmVersionedMultiLocation>',
        recipient: 'AccountId32',
        amount: 'u128',
      },
      finalize_asset_registration: {
        assetId: 'CommonPrimitivesAssetId32',
        assetKind: 'BridgeTypesAssetKind',
      },
      burn: {
        networkId: 'BridgeTypesSubNetworkId',
        assetId: 'CommonPrimitivesAssetId32',
        recipient: 'XcmVersionedMultiLocation',
        amount: 'u128',
      },
      register_thischain_asset: {
        networkId: 'BridgeTypesSubNetworkId',
        assetId: 'CommonPrimitivesAssetId32',
        sidechainAsset: 'XcmV3MultiassetAssetId',
        allowedParachains: 'Vec<u32>',
        minimalXcmAmount: 'u128',
      },
      register_sidechain_asset: {
        networkId: 'BridgeTypesSubNetworkId',
        sidechainAsset: 'XcmV3MultiassetAssetId',
        symbol: 'Bytes',
        name: 'Bytes',
        decimals: 'u8',
        allowedParachains: 'Vec<u32>',
        minimalXcmAmount: 'u128',
      },
      add_assetid_paraid: {
        networkId: 'BridgeTypesSubNetworkId',
        paraId: 'u32',
        assetId: 'CommonPrimitivesAssetId32',
      },
      remove_assetid_paraid: {
        networkId: 'BridgeTypesSubNetworkId',
        paraId: 'u32',
        assetId: 'CommonPrimitivesAssetId32',
      },
      update_transaction_status: {
        messageId: 'H256',
        transferStatus: 'BridgeTypesSubstrateXcmAppTransferStatus',
      },
      set_minimum_xcm_incoming_asset_count: {
        networkId: 'BridgeTypesSubNetworkId',
        assetId: 'CommonPrimitivesAssetId32',
        minimalXcmAmount: 'u128'
      }
    }
  },
  /**
   * Lookup608: bridge_types::types::AssetKind
   **/
  BridgeTypesAssetKind: {
    _enum: ['Thischain', 'Sidechain']
  },
  /**
   * Lookup609: xcm::v3::multiasset::AssetId
   **/
  XcmV3MultiassetAssetId: {
    _enum: {
      Concrete: 'XcmV3MultiLocation',
      Abstract: '[u8;32]'
    }
  },
  /**
   * Lookup610: bridge_types::substrate::XCMAppTransferStatus
   **/
  BridgeTypesSubstrateXcmAppTransferStatus: {
    _enum: ['Success', 'XCMTransferError']
  },
  /**
   * Lookup611: bridge_data_signer::pallet::Call<T>
   **/
  BridgeDataSignerCall: {
    _enum: {
      register_network: {
        networkId: 'BridgeTypesGenericNetworkId',
        peers: 'Vec<SpCoreEcdsaPublic>',
      },
      approve: {
        networkId: 'BridgeTypesGenericNetworkId',
        data: 'H256',
        signature: 'SpCoreEcdsaSignature',
      },
      add_peer: {
        networkId: 'BridgeTypesGenericNetworkId',
        peer: 'SpCoreEcdsaPublic',
      },
      remove_peer: {
        networkId: 'BridgeTypesGenericNetworkId',
        peer: 'SpCoreEcdsaPublic',
      },
      finish_remove_peer: {
        peer: 'SpCoreEcdsaPublic',
      },
      finish_add_peer: {
        peer: 'SpCoreEcdsaPublic'
      }
    }
  },
  /**
   * Lookup612: multisig_verifier::pallet::Call<T>
   **/
  MultisigVerifierCall: {
    _enum: {
      initialize: {
        networkId: 'BridgeTypesGenericNetworkId',
        peers: 'Vec<SpCoreEcdsaPublic>',
      },
      add_peer: {
        peer: 'SpCoreEcdsaPublic',
      },
      remove_peer: {
        peer: 'SpCoreEcdsaPublic'
      }
    }
  },
  /**
   * Lookup613: pallet_sudo::pallet::Call<T>
   **/
  PalletSudoCall: {
    _enum: {
      sudo: {
        call: 'Call',
      },
      sudo_unchecked_weight: {
        call: 'Call',
        weight: 'SpWeightsWeightV2Weight',
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
   * Lookup614: faucet::pallet::Call<T>
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
   * Lookup615: qa_tools::pallet::Call<T>
   **/
  QaToolsCall: {
    _enum: {
      add_to_whitelist: {
        account: 'AccountId32',
      },
      remove_from_whitelist: {
        account: 'AccountId32',
      },
      order_book_create_empty_batch: {
        orderBookIds: 'Vec<OrderBookOrderBookId>',
      },
      order_book_create_and_fill_batch: {
        bidsOwner: 'AccountId32',
        asksOwner: 'AccountId32',
        fillSettings: 'Vec<(OrderBookOrderBookId,QaToolsPalletsOrderBookToolsOrderBookFillSettings)>'
      }
    }
  },
  /**
   * Lookup619: qa_tools::pallets::order_book_tools::OrderBookFillSettings<Moment>
   **/
  QaToolsPalletsOrderBookToolsOrderBookFillSettings: {
    bestBidPrice: 'CommonBalanceUnit',
    bestAskPrice: 'CommonBalanceUnit',
    lifespan: 'Option<u64>'
  },
  /**
   * Lookup621: pallet_multisig::pallet::Error<T>
   **/
  PalletMultisigError: {
    _enum: ['MinimumThreshold', 'AlreadyApproved', 'NoApprovalsNeeded', 'TooFewSignatories', 'TooManySignatories', 'SignatoriesOutOfOrder', 'SenderNotInSignatories', 'NotInSignatories', 'AlreadyInSignatories', 'NotFound', 'NotOwner', 'NoTimepoint', 'WrongTimepoint', 'UnexpectedTimepoint', 'AlreadyStored', 'WeightTooLow', 'ZeroThreshold', 'MultisigAlreadyExists', 'UnknownMultisigAccount', 'SignatoriesAreNotUniqueOrUnordered', 'AlreadyDispatched']
  },
  /**
   * Lookup622: pallet_utility::pallet::Error<T>
   **/
  PalletUtilityError: {
    _enum: ['TooManyCalls']
  },
  /**
   * Lookup623: pallet_staking::sora::DurationWrapper
   **/
  PalletStakingSoraDurationWrapper: {
    secs: 'u64',
    nanos: 'u32'
  },
  /**
   * Lookup624: pallet_staking::StakingLedger<T>
   **/
  PalletStakingStakingLedger: {
    stash: 'AccountId32',
    total: 'Compact<u128>',
    active: 'Compact<u128>',
    unlocking: 'Vec<PalletStakingUnlockChunk>',
    claimedRewards: 'Vec<u32>'
  },
  /**
   * Lookup626: pallet_staking::UnlockChunk<Balance>
   **/
  PalletStakingUnlockChunk: {
    value: 'Compact<u128>',
    era: 'Compact<u32>'
  },
  /**
   * Lookup629: pallet_staking::Nominations<T>
   **/
  PalletStakingNominations: {
    targets: 'Vec<AccountId32>',
    submittedIn: 'u32',
    suppressed: 'bool'
  },
  /**
   * Lookup631: pallet_staking::ActiveEraInfo
   **/
  PalletStakingActiveEraInfo: {
    index: 'u32',
    start: 'Option<u64>'
  },
  /**
   * Lookup633: pallet_staking::EraRewardPoints<sp_core::crypto::AccountId32>
   **/
  PalletStakingEraRewardPoints: {
    total: 'u32',
    individual: 'BTreeMap<AccountId32, u32>'
  },
  /**
   * Lookup638: pallet_staking::UnappliedSlash<sp_core::crypto::AccountId32, Balance>
   **/
  PalletStakingUnappliedSlash: {
    validator: 'AccountId32',
    own: 'u128',
    others: 'Vec<(AccountId32,u128)>',
    reporters: 'Vec<AccountId32>',
    payout: 'u128'
  },
  /**
   * Lookup640: pallet_staking::slashing::SlashingSpans
   **/
  PalletStakingSlashingSlashingSpans: {
    spanIndex: 'u32',
    lastStart: 'u32',
    lastNonzeroSlash: 'u32',
    prior: 'Vec<u32>'
  },
  /**
   * Lookup641: pallet_staking::slashing::SpanRecord<Balance>
   **/
  PalletStakingSlashingSpanRecord: {
    slashed: 'u128',
    paidOut: 'u128'
  },
  /**
   * Lookup644: pallet_staking::pallet::pallet::Error<T>
   **/
  PalletStakingPalletError: {
    _enum: ['NotController', 'NotStash', 'AlreadyBonded', 'AlreadyPaired', 'EmptyTargets', 'DuplicateIndex', 'InvalidSlashIndex', 'InsufficientBond', 'NoMoreChunks', 'NoUnlockChunk', 'FundedTarget', 'InvalidEraToReward', 'InvalidNumberOfNominations', 'NotSortedAndUnique', 'AlreadyClaimed', 'IncorrectHistoryDepth', 'IncorrectSlashingSpans', 'BadState', 'TooManyTargets', 'BadTarget', 'CannotChillOther', 'TooManyNominators', 'TooManyValidators', 'CommissionTooLow', 'BoundNotMet']
  },
  /**
   * Lookup645: sp_staking::offence::OffenceDetails<sp_core::crypto::AccountId32, Offender>
   **/
  SpStakingOffenceOffenceDetails: {
    offender: '(AccountId32,PalletStakingExposure)',
    reporters: 'Vec<AccountId32>'
  },
  /**
   * Lookup650: sp_core::crypto::KeyTypeId
   **/
  SpCoreCryptoKeyTypeId: '[u8;4]',
  /**
   * Lookup651: pallet_session::pallet::Error<T>
   **/
  PalletSessionError: {
    _enum: ['InvalidProof', 'NoAssociatedValidatorId', 'DuplicatedKey', 'NoKeys', 'NoAccount']
  },
  /**
   * Lookup652: pallet_grandpa::StoredState<N>
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
   * Lookup653: pallet_grandpa::StoredPendingChange<N, Limit>
   **/
  PalletGrandpaStoredPendingChange: {
    scheduledAt: 'u32',
    delay: 'u32',
    nextAuthorities: 'Vec<(SpFinalityGrandpaAppPublic,u64)>',
    forced: 'Option<u32>'
  },
  /**
   * Lookup655: pallet_grandpa::pallet::Error<T>
   **/
  PalletGrandpaError: {
    _enum: ['PauseFailed', 'ResumeFailed', 'ChangePending', 'TooSoon', 'InvalidKeyOwnershipProof', 'InvalidEquivocationProof', 'DuplicateOffenceReport']
  },
  /**
   * Lookup659: pallet_im_online::BoundedOpaqueNetworkState<PeerIdEncodingLimit, MultiAddrEncodingLimit, AddressesLimit>
   **/
  PalletImOnlineBoundedOpaqueNetworkState: {
    peerId: 'Bytes',
    externalAddresses: 'Vec<Bytes>'
  },
  /**
   * Lookup663: pallet_im_online::pallet::Error<T>
   **/
  PalletImOnlineError: {
    _enum: ['InvalidKey', 'DuplicatedHeartbeat']
  },
  /**
   * Lookup666: orml_tokens::BalanceLock<Balance>
   **/
  OrmlTokensBalanceLock: {
    id: '[u8;8]',
    amount: 'u128'
  },
  /**
   * Lookup668: orml_tokens::AccountData<Balance>
   **/
  OrmlTokensAccountData: {
    free: 'u128',
    reserved: 'u128',
    frozen: 'u128'
  },
  /**
   * Lookup670: orml_tokens::ReserveData<ReserveIdentifier, Balance>
   **/
  OrmlTokensReserveData: {
    id: 'Null',
    amount: 'u128'
  },
  /**
   * Lookup672: orml_tokens::module::Error<T>
   **/
  OrmlTokensModuleError: {
    _enum: ['BalanceTooLow', 'AmountIntoBalanceFailed', 'LiquidityRestrictions', 'MaxLocksExceeded', 'KeepAlive', 'ExistentialDeposit', 'DeadAccount', 'TooManyReserves']
  },
  /**
   * Lookup673: orml_currencies::module::Error<T>
   **/
  OrmlCurrenciesModuleError: {
    _enum: ['AmountIntoBalanceFailed', 'BalanceTooLow', 'DepositFailed']
  },
  /**
   * Lookup676: trading_pair::pallet::Error<T>
   **/
  TradingPairError: {
    _enum: ['TradingPairExists', 'ForbiddenBaseAssetId', 'IdenticalAssetIds', 'TradingPairDoesntExist']
  },
  /**
   * Lookup678: assets::AssetRecord<T>
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
   * Lookup679: assets::AssetRecordArg<T>
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
   * Lookup681: common::primitives::AssetIdExtraAssetRecordArg<DEXId, common::primitives::LiquiditySourceType, AccountId>
   **/
  CommonPrimitivesAssetIdExtraAssetRecordArg: {
    _enum: {
      DEXId: 'u32',
      LstId: 'CommonPrimitivesLiquiditySourceType',
      AccountId: '[u8;32]'
    }
  },
  /**
   * Lookup682: assets::pallet::Error<T>
   **/
  AssetsError: {
    _enum: ['AssetIdAlreadyExists', 'AssetIdNotExists', 'InsufficientBalance', 'InvalidAssetSymbol', 'InvalidAssetName', 'InvalidPrecision', 'AssetSupplyIsNotMintable', 'InvalidAssetOwner', 'IncRefError', 'InvalidContentSource', 'InvalidDescription', 'DeadAsset', 'Overflow']
  },
  /**
   * Lookup683: common::primitives::DEXInfo<common::primitives::AssetId32<common::primitives::PredefinedAssetId>>
   **/
  CommonPrimitivesDexInfo: {
    baseAssetId: 'CommonPrimitivesAssetId32',
    syntheticBaseAssetId: 'CommonPrimitivesAssetId32',
    isPublic: 'bool'
  },
  /**
   * Lookup684: dex_manager::pallet::Error<T>
   **/
  DexManagerError: {
    _enum: ['DEXIdAlreadyExists', 'DEXDoesNotExist', 'InvalidFeeValue', 'InvalidAccountId']
  },
  /**
   * Lookup685: multicollateral_bonding_curve_pool::DistributionAccounts<multicollateral_bonding_curve_pool::DistributionAccountData<multicollateral_bonding_curve_pool::DistributionAccount<sp_core::crypto::AccountId32, common::primitives::TechAccountId<sp_core::crypto::AccountId32, common::primitives::TechAssetId<common::primitives::PredefinedAssetId>, DEXId>>>>
   **/
  MulticollateralBondingCurvePoolDistributionAccounts: {
    xorAllocation: 'MulticollateralBondingCurvePoolDistributionAccountData',
    valHolders: 'MulticollateralBondingCurvePoolDistributionAccountData',
    soraCitizens: 'MulticollateralBondingCurvePoolDistributionAccountData',
    storesAndShops: 'MulticollateralBondingCurvePoolDistributionAccountData',
    projects: 'MulticollateralBondingCurvePoolDistributionAccountData'
  },
  /**
   * Lookup686: multicollateral_bonding_curve_pool::DistributionAccountData<multicollateral_bonding_curve_pool::DistributionAccount<sp_core::crypto::AccountId32, common::primitives::TechAccountId<sp_core::crypto::AccountId32, common::primitives::TechAssetId<common::primitives::PredefinedAssetId>, DEXId>>>
   **/
  MulticollateralBondingCurvePoolDistributionAccountData: {
    account: 'MulticollateralBondingCurvePoolDistributionAccount',
    coefficient: 'FixnumFixedPoint'
  },
  /**
   * Lookup687: multicollateral_bonding_curve_pool::DistributionAccount<sp_core::crypto::AccountId32, common::primitives::TechAccountId<sp_core::crypto::AccountId32, common::primitives::TechAssetId<common::primitives::PredefinedAssetId>, DEXId>>
   **/
  MulticollateralBondingCurvePoolDistributionAccount: {
    _enum: {
      Account: 'AccountId32',
      TechAccount: 'CommonPrimitivesTechAccountId'
    }
  },
  /**
   * Lookup690: multicollateral_bonding_curve_pool::pallet::Error<T>
   **/
  MulticollateralBondingCurvePoolError: {
    _enum: ['PriceCalculationFailed', 'FailedToCalculatePriceWithoutImpact', 'CannotExchangeWithSelf', 'NotEnoughReserves', 'PoolAlreadyInitializedForPair', 'PoolNotInitialized', 'SlippageLimitExceeded', 'NothingToClaim', 'RewardsSupplyShortage', 'UnsupportedCollateralAssetId', 'FeeCalculationFailed', 'CantExchange', 'IncRefError', 'ArithmeticError', 'FreeReservesAccountNotSet']
  },
  /**
   * Lookup691: technical::pallet::Error<T>
   **/
  TechnicalError: {
    _enum: ['StorageOverflow', 'InsufficientBalance', 'AlreadyExist', 'InvalidProof', 'SourceMismatch', 'AlreadyClaimed', 'ClaimActionMismatch', 'DurationNotPassed', 'OnlyRegularAsset', 'OnlyRegularAccount', 'OnlyRegularBalance', 'OnlyPureTechnicalAccount', 'Overflow', 'TechAccountIdMustBePure', 'UnableToGetReprFromTechAccountId', 'RepresentativeMustBeSupported', 'TechAccountIdIsNotRegistered', 'NotImplemented', 'DecodeAccountIdFailed', 'AssociatedAccountIdNotFound', 'OperationWithAbstractCheckingIsImposible']
  },
  /**
   * Lookup694: pool_xyk::pallet::Error<T>
   **/
  PoolXykError: {
    _enum: ['UnableToCalculateFee', 'FailedToCalculatePriceWithoutImpact', 'UnableToGetBalance', 'ImpossibleToDecideAssetPairAmounts', 'PoolPairRatioAndPairSwapRatioIsDifferent', 'PairSwapActionFeeIsSmallerThanRecommended', 'SourceBalanceIsNotLargeEnough', 'TargetBalanceIsNotLargeEnough', 'UnableToDeriveFeeAccount', 'FeeAccountIsInvalid', 'SourceAndClientAccountDoNotMatchAsEqual', 'AssetsMustNotBeSame', 'ImpossibleToDecideDepositLiquidityAmounts', 'InvalidDepositLiquidityBasicAssetAmount', 'InvalidDepositLiquidityTargetAssetAmount', 'PairSwapActionMinimumLiquidityIsSmallerThanRecommended', 'DestinationAmountOfLiquidityIsNotLargeEnough', 'SourceBaseAmountIsNotLargeEnough', 'TargetBaseAmountIsNotLargeEnough', 'PoolIsInvalid', 'PoolIsEmpty', 'ZeroValueInAmountParameter', 'AccountBalanceIsInvalid', 'InvalidDepositLiquidityDestinationAmount', 'InitialLiqudityDepositRatioMustBeDefined', 'TechAssetIsNotRepresentable', 'UnableToDecideMarkerAsset', 'UnableToGetAssetRepr', 'ImpossibleToDecideWithdrawLiquidityAmounts', 'InvalidWithdrawLiquidityBasicAssetAmount', 'InvalidWithdrawLiquidityTargetAssetAmount', 'SourceBaseAmountIsTooLarge', 'SourceBalanceOfLiquidityTokensIsNotLargeEnough', 'DestinationBaseBalanceIsNotLargeEnough', 'DestinationTargetBalanceIsNotLargeEnough', 'InvalidAssetForLiquidityMarking', 'AssetDecodingError', 'CalculatedValueIsOutOfDesiredBounds', 'BaseAssetIsNotMatchedWithAnyAssetArguments', 'DestinationAmountMustBeSame', 'SourceAmountMustBeSame', 'PoolInitializationIsInvalid', 'PoolIsAlreadyInitialized', 'InvalidMinimumBoundValueOfBalance', 'ImpossibleToDecideValidPairValuesFromRangeForThisPool', 'RangeValuesIsInvalid', 'CalculatedValueIsNotMeetsRequiredBoundaries', 'GettingFeeFromDestinationIsImpossible', 'FixedWrapperCalculationFailed', 'ThisCaseIsNotSupported', 'PoolBecameInvalidAfterOperation', 'UnableToConvertAssetToTechAssetId', 'UnableToGetXORPartFromMarkerAsset', 'PoolTokenSupplyOverflow', 'IncRefError', 'UnableToDepositXorLessThanMinimum', 'UnsupportedQuotePath', 'NotEnoughUnlockedLiquidity', 'UnableToCreatePoolWithIndivisibleAssets', 'UnableToOperateWithIndivisibleAssets', 'NotEnoughLiquidityOutOfFarming', 'TargetAssetIsRestricted']
  },
  /**
   * Lookup695: liquidity_proxy::pallet::Error<T>
   **/
  LiquidityProxyError: {
    _enum: ['UnavailableExchangePath', 'MaxFeeExceeded', 'InvalidFeeValue', 'InsufficientLiquidity', 'AggregationError', 'CalculationError', 'SlippageNotTolerated', 'ForbiddenFilter', 'FailedToCalculatePriceWithoutImpact', 'UnableToSwapIndivisibleAssets', 'UnableToEnableLiquiditySource', 'LiquiditySourceAlreadyEnabled', 'UnableToDisableLiquiditySource', 'LiquiditySourceAlreadyDisabled', 'InvalidReceiversInfo', 'FailedToTransferAdarCommission', 'InvalidADARCommissionRatio', 'InsufficientBalance', 'TheSameSenderAndReceiver']
  },
  /**
   * Lookup697: pallet_collective::Votes<sp_core::crypto::AccountId32, BlockNumber>
   **/
  PalletCollectiveVotes: {
    index: 'u32',
    threshold: 'u32',
    ayes: 'Vec<AccountId32>',
    nays: 'Vec<AccountId32>',
    end: 'u32'
  },
  /**
   * Lookup698: pallet_collective::pallet::Error<T, I>
   **/
  PalletCollectiveError: {
    _enum: ['NotMember', 'DuplicateProposal', 'ProposalMissing', 'WrongIndex', 'DuplicateVote', 'AlreadyInitialized', 'TooEarly', 'TooManyProposals', 'WrongProposalWeight', 'WrongProposalLength']
  },
  /**
   * Lookup706: pallet_democracy::types::ReferendumInfo<BlockNumber, frame_support::traits::preimages::Bounded<framenode_runtime::RuntimeCall>, Balance>
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
   * Lookup707: pallet_democracy::types::ReferendumStatus<BlockNumber, frame_support::traits::preimages::Bounded<framenode_runtime::RuntimeCall>, Balance>
   **/
  PalletDemocracyReferendumStatus: {
    end: 'u32',
    proposal: 'FrameSupportPreimagesBounded',
    threshold: 'PalletDemocracyVoteThreshold',
    delay: 'u32',
    tally: 'PalletDemocracyTally'
  },
  /**
   * Lookup708: pallet_democracy::types::Tally<Balance>
   **/
  PalletDemocracyTally: {
    ayes: 'u128',
    nays: 'u128',
    turnout: 'u128'
  },
  /**
   * Lookup709: pallet_democracy::vote::Voting<Balance, sp_core::crypto::AccountId32, BlockNumber, MaxVotes>
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
   * Lookup713: pallet_democracy::types::Delegations<Balance>
   **/
  PalletDemocracyDelegations: {
    votes: 'u128',
    capital: 'u128'
  },
  /**
   * Lookup714: pallet_democracy::vote::PriorLock<BlockNumber, Balance>
   **/
  PalletDemocracyVotePriorLock: '(u32,u128)',
  /**
   * Lookup718: pallet_democracy::pallet::Error<T>
   **/
  PalletDemocracyError: {
    _enum: ['ValueLow', 'ProposalMissing', 'AlreadyCanceled', 'DuplicateProposal', 'ProposalBlacklisted', 'NotSimpleMajority', 'InvalidHash', 'NoProposal', 'AlreadyVetoed', 'ReferendumInvalid', 'NoneWaiting', 'NotVoter', 'NoPermission', 'AlreadyDelegating', 'InsufficientFunds', 'NotDelegating', 'VotesExist', 'InstantNotAllowed', 'Nonsense', 'WrongUpperBound', 'MaxVotesReached', 'TooMany', 'VotingPeriodLow']
  },
  /**
   * Lookup719: eth_bridge::requests::OffchainRequest<T>
   **/
  EthBridgeRequestsOffchainRequest: {
    _enum: {
      Outgoing: '(EthBridgeRequestsOutgoingRequest,H256)',
      LoadIncoming: 'EthBridgeRequestsLoadIncomingRequest',
      Incoming: '(EthBridgeRequestsIncomingRequest,H256)'
    }
  },
  /**
   * Lookup720: eth_bridge::requests::RequestStatus
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
   * Lookup727: eth_bridge::requests::outgoing::EthPeersSync
   **/
  EthBridgeRequestsOutgoingEthPeersSync: {
    isBridgeReady: 'bool',
    isXorReady: 'bool',
    isValReady: 'bool'
  },
  /**
   * Lookup728: eth_bridge::BridgeStatus
   **/
  EthBridgeBridgeStatus: {
    _enum: ['Initialized', 'Migrating']
  },
  /**
   * Lookup729: eth_bridge::pallet::Error<T>
   **/
  EthBridgeError: {
    _enum: ['HttpFetchingError', 'AccountNotFound', 'Forbidden', 'RequestIsAlreadyRegistered', 'FailedToLoadTransaction', 'FailedToLoadPrecision', 'UnknownMethodId', 'InvalidFunctionInput', 'InvalidSignature', 'InvalidUint', 'InvalidAmount', 'InvalidBalance', 'InvalidString', 'InvalidByte', 'InvalidAddress', 'InvalidAssetId', 'InvalidAccountId', 'InvalidBool', 'InvalidH256', 'InvalidArray', 'UnknownEvent', 'UnknownTokenAddress', 'NoLocalAccountForSigning', 'UnsupportedAssetId', 'FailedToSignMessage', 'FailedToSendSignedTransaction', 'TokenIsNotOwnedByTheAuthor', 'TokenIsAlreadyAdded', 'DuplicatedRequest', 'UnsupportedToken', 'UnknownPeerAddress', 'EthAbiEncodingError', 'EthAbiDecodingError', 'EthTransactionIsFailed', 'EthTransactionIsSucceeded', 'EthTransactionIsPending', 'EthLogWasRemoved', 'NoPendingPeer', 'WrongPendingPeer', 'TooManyPendingPeers', 'FailedToGetAssetById', 'CantAddMorePeers', 'CantRemoveMorePeers', 'PeerIsAlreadyAdded', 'UnknownPeerId', 'CantReserveFunds', 'AlreadyClaimed', 'FailedToLoadBlockHeader', 'FailedToLoadFinalizedHead', 'UnknownContractAddress', 'InvalidContractInput', 'RequestIsNotOwnedByTheAuthor', 'FailedToParseTxHashInCall', 'RequestIsNotReady', 'UnknownRequest', 'RequestNotFinalizedOnSidechain', 'UnknownNetwork', 'ContractIsInMigrationStage', 'ContractIsNotInMigrationStage', 'ContractIsAlreadyInMigrationStage', 'Unavailable', 'FailedToUnreserve', 'SidechainAssetIsAlreadyRegistered', 'ExpectedOutgoingRequest', 'ExpectedIncomingRequest', 'UnknownAssetId', 'JsonSerializationError', 'JsonDeserializationError', 'FailedToLoadSidechainNodeParams', 'FailedToLoadCurrentSidechainHeight', 'FailedToLoadIsUsed', 'TransactionMightHaveFailedDueToGasLimit', 'ExpectedXORTransfer', 'UnableToPayFees', 'Cancelled', 'UnsupportedAssetPrecision', 'NonZeroDust', 'IncRefError', 'Other', 'ExpectedPendingRequest', 'ExpectedEthNetwork', 'RemovedAndRefunded', 'AuthorityAccountNotSet', 'NotEnoughPeers', 'ReadStorageError', 'UnsafeMigration']
  },
  /**
   * Lookup732: pswap_distribution::pallet::Error<T>
   **/
  PswapDistributionError: {
    _enum: ['CalculationError', 'SubscriptionActive', 'UnknownSubscription', 'InvalidFrequency', 'ZeroClaimableIncentives', 'IncRefError']
  },
  /**
   * Lookup738: pallet_scheduler::Scheduled<Name, frame_support::traits::preimages::Bounded<framenode_runtime::RuntimeCall>, BlockNumber, framenode_runtime::OriginCaller, sp_core::crypto::AccountId32>
   **/
  PalletSchedulerScheduled: {
    maybeId: 'Option<[u8;32]>',
    priority: 'u8',
    call: 'FrameSupportPreimagesBounded',
    maybePeriodic: 'Option<(u32,u32)>',
    origin: 'FramenodeRuntimeOriginCaller'
  },
  /**
   * Lookup740: pallet_scheduler::pallet::Error<T>
   **/
  PalletSchedulerError: {
    _enum: ['FailedToSchedule', 'NotFound', 'TargetBlockNumberInPast', 'RescheduleNoChange', 'Named']
  },
  /**
   * Lookup743: iroha_migration::PendingMultisigAccount<T>
   **/
  IrohaMigrationPendingMultisigAccount: {
    approvingAccounts: 'Vec<AccountId32>',
    migrateAt: 'Option<u32>'
  },
  /**
   * Lookup744: iroha_migration::pallet::Error<T>
   **/
  IrohaMigrationError: {
    _enum: ['PublicKeyParsingFailed', 'SignatureParsingFailed', 'SignatureVerificationFailed', 'AccountNotFound', 'PublicKeyNotFound', 'PublicKeyAlreadyUsed', 'AccountAlreadyMigrated', 'ReferralMigrationFailed', 'MultiSigCreationFailed', 'SignatoryAdditionFailed']
  },
  /**
   * Lookup746: pallet_membership::pallet::Error<T, I>
   **/
  PalletMembershipError: {
    _enum: ['AlreadyMember', 'NotMember', 'TooManyMembers']
  },
  /**
   * Lookup748: pallet_elections_phragmen::SeatHolder<sp_core::crypto::AccountId32, Balance>
   **/
  PalletElectionsPhragmenSeatHolder: {
    who: 'AccountId32',
    stake: 'u128',
    deposit: 'u128'
  },
  /**
   * Lookup749: pallet_elections_phragmen::Voter<sp_core::crypto::AccountId32, Balance>
   **/
  PalletElectionsPhragmenVoter: {
    votes: 'Vec<AccountId32>',
    stake: 'u128',
    deposit: 'u128'
  },
  /**
   * Lookup750: pallet_elections_phragmen::pallet::Error<T>
   **/
  PalletElectionsPhragmenError: {
    _enum: ['UnableToVote', 'NoVotes', 'TooManyVotes', 'MaximumVotesExceeded', 'LowBalance', 'UnableToPayBond', 'MustBeVoter', 'DuplicatedCandidate', 'TooManyCandidates', 'MemberSubmit', 'RunnerUpSubmit', 'InsufficientCandidateFunds', 'NotMember', 'InvalidWitnessData', 'InvalidVoteCount', 'InvalidRenouncing', 'InvalidReplacement']
  },
  /**
   * Lookup751: vested_rewards::RewardInfo
   **/
  VestedRewardsRewardInfo: {
    limit: 'u128',
    totalAvailable: 'u128',
    rewards: 'BTreeMap<CommonPrimitivesRewardReason, u128>'
  },
  /**
   * Lookup752: vested_rewards::CrowdloanInfo<common::primitives::AssetId32<common::primitives::PredefinedAssetId>, BlockNumber, sp_core::crypto::AccountId32>
   **/
  VestedRewardsCrowdloanInfo: {
    totalContribution: 'u128',
    rewards: 'Vec<(CommonPrimitivesAssetId32,u128)>',
    startBlock: 'u32',
    length: 'u32',
    account: 'AccountId32'
  },
  /**
   * Lookup754: vested_rewards::CrowdloanUserInfo<common::primitives::AssetId32<common::primitives::PredefinedAssetId>>
   **/
  VestedRewardsCrowdloanUserInfo: {
    contribution: 'u128',
    rewarded: 'Vec<(CommonPrimitivesAssetId32,u128)>'
  },
  /**
   * Lookup755: vested_rewards::pallet::Error<T>
   **/
  VestedRewardsError: {
    _enum: ['NothingToClaim', 'ClaimLimitExceeded', 'UnhandledRewardType', 'RewardsSupplyShortage', 'IncRefError', 'CantSubtractSnapshot', 'CantCalculateReward', 'NoRewardsForAsset', 'ArithmeticError', 'NumberConversionError', 'UnableToGetBaseAssetPrice', 'CrowdloanAlreadyExists', 'WrongCrowdloanInfo', 'CrowdloanRewardsDistributionNotStarted', 'CrowdloanDoesNotExists', 'NotCrowdloanParticipant']
  },
  /**
   * Lookup756: pallet_identity::types::Registration<Balance, MaxJudgements, MaxAdditionalFields>
   **/
  PalletIdentityRegistration: {
    judgements: 'Vec<(u32,PalletIdentityJudgement)>',
    deposit: 'u128',
    info: 'PalletIdentityIdentityInfo'
  },
  /**
   * Lookup764: pallet_identity::types::RegistrarInfo<Balance, sp_core::crypto::AccountId32>
   **/
  PalletIdentityRegistrarInfo: {
    account: 'AccountId32',
    fee: 'u128',
    fields: 'PalletIdentityBitFlags'
  },
  /**
   * Lookup766: pallet_identity::pallet::Error<T>
   **/
  PalletIdentityError: {
    _enum: ['TooManySubAccounts', 'NotFound', 'NotNamed', 'EmptyIndex', 'FeeChanged', 'NoIdentity', 'StickyJudgement', 'JudgementGiven', 'InvalidJudgement', 'InvalidIndex', 'InvalidTarget', 'TooManyFields', 'TooManyRegistrars', 'AlreadyClaimed', 'NotSub', 'NotOwned', 'JudgementForDifferentIdentity', 'JudgementPaymentFailed']
  },
  /**
   * Lookup768: farming::PoolFarmer<T>
   **/
  FarmingPoolFarmer: {
    account: 'AccountId32',
    block: 'u32',
    weight: 'u128'
  },
  /**
   * Lookup769: farming::pallet::Error<T>
   **/
  FarmingError: {
    _enum: ['IncRefError']
  },
  /**
   * Lookup770: xst::SyntheticInfo<common::primitives::SymbolName>
   **/
  XstSyntheticInfo: {
    referenceSymbol: 'Bytes',
    feeRatio: 'FixnumFixedPoint'
  },
  /**
   * Lookup771: xst::pallet::Error<T>
   **/
  XstError: {
    _enum: ['PriceCalculationFailed', 'SlippageLimitExceeded', 'CantExchange', 'SyntheticDoesNotExist', 'SymbolDoesNotExist', 'SymbolAlreadyReferencedToSynthetic', 'SyntheticIsNotEnabled', 'OracleQuoteError', 'InvalidFeeRatio', 'IndivisibleReferenceAsset', 'CantEnableIndivisibleAsset', 'SyntheticBaseBuySellLimitExceeded']
  },
  /**
   * Lookup772: price_tools::AggregatedPriceInfo
   **/
  PriceToolsAggregatedPriceInfo: {
    buy: 'PriceToolsPriceInfo',
    sell: 'PriceToolsPriceInfo'
  },
  /**
   * Lookup773: price_tools::PriceInfo
   **/
  PriceToolsPriceInfo: {
    priceFailures: 'u32',
    spotPrices: 'Vec<u128>',
    averagePrice: 'u128',
    needsUpdate: 'bool',
    lastSpotPrice: 'u128'
  },
  /**
   * Lookup774: price_tools::pallet::Error<T>
   **/
  PriceToolsError: {
    _enum: ['AveragePriceCalculationFailed', 'UpdateAverageWithSpotPriceFailed', 'InsufficientSpotPriceData', 'UnsupportedQuotePath', 'FailedToQuoteAveragePrice', 'AssetAlreadyRegistered', 'CantDuplicateLastPrice']
  },
  /**
   * Lookup775: ceres_staking::StakingInfo
   **/
  CeresStakingStakingInfo: {
    deposited: 'u128',
    rewards: 'u128'
  },
  /**
   * Lookup776: ceres_staking::pallet::Error<T>
   **/
  CeresStakingError: {
    _enum: ['StakingPoolIsFull', 'Unauthorized']
  },
  /**
   * Lookup777: ceres_liquidity_locker::StorageVersion
   **/
  CeresLiquidityLockerStorageVersion: {
    _enum: ['V1', 'V2']
  },
  /**
   * Lookup779: ceres_liquidity_locker::LockInfo<Balance, Moment, common::primitives::AssetId32<common::primitives::PredefinedAssetId>>
   **/
  CeresLiquidityLockerLockInfo: {
    poolTokens: 'u128',
    unlockingTimestamp: 'u64',
    assetA: 'CommonPrimitivesAssetId32',
    assetB: 'CommonPrimitivesAssetId32'
  },
  /**
   * Lookup780: ceres_liquidity_locker::pallet::Error<T>
   **/
  CeresLiquidityLockerError: {
    _enum: ['PoolDoesNotExist', 'InsufficientLiquidityToLock', 'InvalidPercentage', 'Unauthorized', 'InvalidUnlockingTimestamp']
  },
  /**
   * Lookup781: ceres_token_locker::StorageVersion
   **/
  CeresTokenLockerStorageVersion: {
    _enum: ['V1', 'V2']
  },
  /**
   * Lookup783: ceres_token_locker::TokenLockInfo<Balance, Moment, common::primitives::AssetId32<common::primitives::PredefinedAssetId>>
   **/
  CeresTokenLockerTokenLockInfo: {
    tokens: 'u128',
    unlockingTimestamp: 'u64',
    assetId: 'CommonPrimitivesAssetId32'
  },
  /**
   * Lookup784: ceres_token_locker::pallet::Error<T>
   **/
  CeresTokenLockerError: {
    _enum: ['InvalidNumberOfTokens', 'Unauthorized', 'InvalidUnlockingTimestamp', 'NotEnoughFunds', 'NotUnlockedYet', 'LockInfoDoesNotExist']
  },
  /**
   * Lookup786: ceres_governance_platform::VotingInfo
   **/
  CeresGovernancePlatformVotingInfo: {
    votingOption: 'u32',
    numberOfVotes: 'u128',
    ceresWithdrawn: 'bool'
  },
  /**
   * Lookup787: ceres_governance_platform::PollInfo<Moment>
   **/
  CeresGovernancePlatformPollInfo: {
    numberOfOptions: 'u32',
    pollStartTimestamp: 'u64',
    pollEndTimestamp: 'u64'
  },
  /**
   * Lookup788: ceres_governance_platform::StorageVersion
   **/
  CeresGovernancePlatformStorageVersion: {
    _enum: ['V1', 'V2']
  },
  /**
   * Lookup789: ceres_governance_platform::pallet::Error<T>
   **/
  CeresGovernancePlatformError: {
    _enum: ['InvalidVotes', 'PollIsFinished', 'PollIsNotStarted', 'NotEnoughFunds', 'InvalidNumberOfOption', 'VoteDenied', 'InvalidStartTimestamp', 'InvalidEndTimestamp', 'PollIsNotFinished', 'InvalidNumberOfVotes', 'FundsAlreadyWithdrawn', 'PollIdAlreadyExists']
  },
  /**
   * Lookup790: ceres_launchpad::ILOInfo<Balance, sp_core::crypto::AccountId32, Moment, common::primitives::AssetId32<common::primitives::PredefinedAssetId>>
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
    finishTimestamp: 'u64',
    baseAsset: 'CommonPrimitivesAssetId32'
  },
  /**
   * Lookup791: ceres_launchpad::ContributorsVesting<Balance, Moment>
   **/
  CeresLaunchpadContributorsVesting: {
    firstReleasePercent: 'u128',
    vestingPeriod: 'u64',
    vestingPercent: 'u128'
  },
  /**
   * Lookup792: ceres_launchpad::TeamVesting<Balance, Moment>
   **/
  CeresLaunchpadTeamVesting: {
    teamVestingTotalTokens: 'u128',
    teamVestingFirstReleasePercent: 'u128',
    teamVestingPeriod: 'u64',
    teamVestingPercent: 'u128'
  },
  /**
   * Lookup794: ceres_launchpad::ContributionInfo<Balance>
   **/
  CeresLaunchpadContributionInfo: {
    fundsContributed: 'u128',
    tokensBought: 'u128',
    tokensClaimed: 'u128',
    claimingFinished: 'bool',
    numberOfClaims: 'u32'
  },
  /**
   * Lookup795: ceres_launchpad::pallet::Error<T>
   **/
  CeresLaunchpadError: {
    _enum: ['ILOAlreadyExists', 'ParameterCantBeZero', 'InvalidSoftCap', 'InvalidMinimumContribution', 'InvalidMaximumContribution', 'InvalidLiquidityPercent', 'InvalidLockupDays', 'InvalidStartTimestamp', 'InvalidEndTimestamp', 'InvalidPrice', 'InvalidNumberOfTokensForLiquidity', 'InvalidNumberOfTokensForILO', 'InvalidFirstReleasePercent', 'InvalidVestingPercent', 'InvalidVestingPeriod', 'NotEnoughCeres', 'NotEnoughTokens', 'ILONotStarted', 'ILOIsFinished', 'CantContributeInILO', 'HardCapIsHit', 'NotEnoughTokensToBuy', 'ContributionIsLowerThenMin', 'ContributionIsBiggerThenMax', 'NotEnoughFunds', 'ILODoesNotExist', 'ILOIsNotFinished', 'PoolDoesNotExist', 'Unauthorized', 'CantClaimLPTokens', 'FundsAlreadyClaimed', 'NothingToClaim', 'ILOIsFailed', 'ILOIsSucceeded', 'CantCreateILOForListedToken', 'AccountIsNotWhitelisted', 'InvalidTeamFirstReleasePercent', 'InvalidTeamVestingPercent', 'InvalidTeamVestingPeriod', 'NotEnoughTeamTokensToLock', 'InvalidFeePercent', 'BaseAssetNotSupported']
  },
  /**
   * Lookup796: demeter_farming_platform::TokenInfo<sp_core::crypto::AccountId32>
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
   * Lookup798: demeter_farming_platform::UserInfo<common::primitives::AssetId32<common::primitives::PredefinedAssetId>>
   **/
  DemeterFarmingPlatformUserInfo: {
    baseAsset: 'CommonPrimitivesAssetId32',
    poolAsset: 'CommonPrimitivesAssetId32',
    rewardAsset: 'CommonPrimitivesAssetId32',
    isFarm: 'bool',
    pooledTokens: 'u128',
    rewards: 'u128'
  },
  /**
   * Lookup800: demeter_farming_platform::PoolData<common::primitives::AssetId32<common::primitives::PredefinedAssetId>>
   **/
  DemeterFarmingPlatformPoolData: {
    multiplier: 'u32',
    depositFee: 'u128',
    isCore: 'bool',
    isFarm: 'bool',
    totalTokensInPool: 'u128',
    rewards: 'u128',
    rewardsToBeDistributed: 'u128',
    isRemoved: 'bool',
    baseAsset: 'CommonPrimitivesAssetId32'
  },
  /**
   * Lookup801: demeter_farming_platform::StorageVersion
   **/
  DemeterFarmingPlatformStorageVersion: {
    _enum: ['V1', 'V2']
  },
  /**
   * Lookup802: demeter_farming_platform::pallet::Error<T>
   **/
  DemeterFarmingPlatformError: {
    _enum: ['TokenAlreadyRegistered', 'TokenPerBlockCantBeZero', 'InvalidAllocationParameters', 'InvalidMultiplier', 'InvalidDepositFee', 'RewardTokenIsNotRegistered', 'PoolAlreadyExists', 'InsufficientFunds', 'ZeroRewards', 'PoolDoesNotExist', 'InsufficientLPTokens', 'PoolDoesNotHaveRewards', 'Unauthorized']
  },
  /**
   * Lookup803: pallet_bags_list::list::Node<T, I>
   **/
  PalletBagsListListNode: {
    id: 'AccountId32',
    prev: 'Option<AccountId32>',
    next: 'Option<AccountId32>',
    bagUpper: 'u64',
    score: 'u64'
  },
  /**
   * Lookup804: pallet_bags_list::list::Bag<T, I>
   **/
  PalletBagsListListBag: {
    head: 'Option<AccountId32>',
    tail: 'Option<AccountId32>'
  },
  /**
   * Lookup806: pallet_bags_list::pallet::Error<T, I>
   **/
  PalletBagsListError: {
    _enum: {
      List: 'PalletBagsListListListError'
    }
  },
  /**
   * Lookup807: pallet_bags_list::list::ListError
   **/
  PalletBagsListListListError: {
    _enum: ['Duplicate', 'NotHeavier', 'NotInSameBag', 'NodeNotFound']
  },
  /**
   * Lookup808: pallet_election_provider_multi_phase::ReadySolution<T>
   **/
  PalletElectionProviderMultiPhaseReadySolution: {
    supports: 'Vec<(AccountId32,SpNposElectionsSupport)>',
    score: 'SpNposElectionsElectionScore',
    compute: 'PalletElectionProviderMultiPhaseElectionCompute'
  },
  /**
   * Lookup810: pallet_election_provider_multi_phase::RoundSnapshot<T>
   **/
  PalletElectionProviderMultiPhaseRoundSnapshot: {
    voters: 'Vec<(AccountId32,u64,Vec<AccountId32>)>',
    targets: 'Vec<AccountId32>'
  },
  /**
   * Lookup816: pallet_election_provider_multi_phase::signed::SignedSubmission<sp_core::crypto::AccountId32, Balance, framenode_runtime::NposCompactSolution24>
   **/
  PalletElectionProviderMultiPhaseSignedSignedSubmission: {
    who: 'AccountId32',
    deposit: 'u128',
    rawSolution: 'PalletElectionProviderMultiPhaseRawSolution',
    callFee: 'u128'
  },
  /**
   * Lookup817: pallet_election_provider_multi_phase::pallet::Error<T>
   **/
  PalletElectionProviderMultiPhaseError: {
    _enum: ['PreDispatchEarlySubmission', 'PreDispatchWrongWinnerCount', 'PreDispatchWeakSubmission', 'SignedQueueFull', 'SignedCannotPayDeposit', 'SignedInvalidWitness', 'SignedTooMuchWeight', 'OcwCallWrongEra', 'MissingSnapshotMetadata', 'InvalidSubmissionIndex', 'CallNotAllowed', 'FallbackFailed', 'BoundNotMet', 'TooManyWinners']
  },
  /**
   * Lookup819: band::BandRate<BlockNumber>
   **/
  BandBandRate: {
    value: 'u128',
    lastUpdated: 'u64',
    lastUpdatedBlock: 'u32',
    requestId: 'u64',
    dynamicFee: 'FixnumFixedPoint'
  },
  /**
   * Lookup821: band::pallet::Error<T, I>
   **/
  BandError: {
    _enum: ['UnauthorizedRelayer', 'AlreadyATrustedRelayer', 'NoSuchRelayer', 'RateConversionOverflow', 'RateHasInvalidTimestamp', 'RateExpired', 'DynamicFeeCalculationError', 'InvalidDynamicFeeParameters']
  },
  /**
   * Lookup824: oracle_proxy::pallet::Error<T>
   **/
  OracleProxyError: {
    _enum: ['OracleAlreadyEnabled', 'OracleAlreadyDisabled']
  },
  /**
   * Lookup826: hermes_governance_platform::HermesVotingInfo<StringLimit>
   **/
  HermesGovernancePlatformHermesVotingInfo: {
    votingOption: 'Bytes',
    numberOfHermes: 'u128',
    hermesWithdrawn: 'bool'
  },
  /**
   * Lookup827: hermes_governance_platform::HermesPollInfo<sp_core::crypto::AccountId32, Moment, StringLimit, OptionsLimit, TitleLimit, DescriptionLimit>
   **/
  HermesGovernancePlatformHermesPollInfo: {
    creator: 'AccountId32',
    hermesLocked: 'u128',
    pollStartTimestamp: 'u64',
    pollEndTimestamp: 'u64',
    title: 'Bytes',
    description: 'Bytes',
    creatorHermesWithdrawn: 'bool',
    options: 'Vec<Bytes>'
  },
  /**
   * Lookup828: hermes_governance_platform::StorageVersion
   **/
  HermesGovernancePlatformStorageVersion: {
    _enum: ['V1', 'V2']
  },
  /**
   * Lookup829: hermes_governance_platform::pallet::Error<T>
   **/
  HermesGovernancePlatformError: {
    _enum: ['PollIsNotStarted', 'PollIsFinished', 'InvalidStartTimestamp', 'InvalidEndTimestamp', 'NotEnoughHermesForCreatingPoll', 'FundsAlreadyWithdrawn', 'PollIsNotFinished', 'YouAreNotCreator', 'Unauthorized', 'PollDoesNotExist', 'NotEnoughHermesForVoting', 'AlreadyVoted', 'InvalidMinimumDurationOfPoll', 'InvalidMaximumDurationOfPoll', 'NotVoted', 'InvalidVotingOptions', 'TooManyVotingOptions', 'InvalidOption', 'DuplicateOptions']
  },
  /**
   * Lookup830: pallet_preimage::RequestStatus<sp_core::crypto::AccountId32, Balance>
   **/
  PalletPreimageRequestStatus: {
    _enum: {
      Unrequested: {
        deposit: '(AccountId32,u128)',
        len: 'u32',
      },
      Requested: {
        deposit: 'Option<(AccountId32,u128)>',
        count: 'u32',
        len: 'Option<u32>'
      }
    }
  },
  /**
   * Lookup834: pallet_preimage::pallet::Error<T>
   **/
  PalletPreimageError: {
    _enum: ['TooBig', 'AlreadyNoted', 'NotAuthorized', 'NotNoted', 'Requested', 'NotRequested']
  },
  /**
   * Lookup835: order_book::order_book::OrderBook<T>
   **/
  OrderBook: {
    orderBookId: 'OrderBookOrderBookId',
    status: 'OrderBookOrderBookStatus',
    lastOrderId: 'u128',
    tickSize: 'CommonBalanceUnit',
    stepLotSize: 'CommonBalanceUnit',
    minLotSize: 'CommonBalanceUnit',
    maxLotSize: 'CommonBalanceUnit'
  },
  /**
   * Lookup837: order_book::limit_order::LimitOrder<T>
   **/
  OrderBookLimitOrder: {
    id: 'u128',
    owner: 'AccountId32',
    side: 'CommonPrimitivesPriceVariant',
    price: 'CommonBalanceUnit',
    originalAmount: 'CommonBalanceUnit',
    amount: 'CommonBalanceUnit',
    time: 'u64',
    lifespan: 'u64',
    expiresAt: 'u32'
  },
  /**
   * Lookup847: order_book::pallet::Error<T>
   **/
  OrderBookError: {
    _enum: ['UnknownOrderBook', 'InvalidOrderBookId', 'OrderBookAlreadyExists', 'UnknownLimitOrder', 'LimitOrderAlreadyExists', 'LimitOrderStorageOverflow', 'UpdateLimitOrderError', 'DeleteLimitOrderError', 'BlockScheduleFull', 'ExpirationNotFound', 'NoDataForPrice', 'NoAggregatedData', 'NotEnoughLiquidityInOrderBook', 'ForbiddenToCreateOrderBookWithSameAssets', 'NotAllowedQuoteAsset', 'NotAllowedDEXId', 'SyntheticAssetIsForbidden', 'UserHasNoNft', 'InvalidLifespan', 'InvalidOrderAmount', 'InvalidLimitOrderPrice', 'LimitOrderPriceIsTooFarFromSpread', 'TradingIsForbidden', 'PlacementOfLimitOrdersIsForbidden', 'CancellationOfLimitOrdersIsForbidden', 'UserHasMaxCountOfOpenedOrders', 'PriceReachedMaxCountOfLimitOrders', 'OrderBookReachedMaxCountOfPricesForSide', 'AmountCalculationFailed', 'PriceCalculationFailed', 'Unauthorized', 'InvalidAsset', 'InvalidTickSize', 'InvalidStepLotSize', 'InvalidMinLotSize', 'InvalidMaxLotSize', 'TickSizeAndStepLotSizeAreTooBig', 'TickSizeAndStepLotSizeLosePrecision', 'MaxLotSizeIsMoreThanTotalSupply', 'SlippageLimitExceeded', 'MarketOrdersAllowedOnlyForIndivisibleAssets', 'ForbiddenStatusToDeleteOrderBook', 'OrderBookIsNotEmpty', 'ForbiddenStatusToUpdateOrderBook']
  },
  /**
   * Lookup850: bridge_proxy::BridgeRequest<sp_core::crypto::AccountId32, common::primitives::AssetId32<common::primitives::PredefinedAssetId>>
   **/
  BridgeProxyBridgeRequest: {
    source: 'BridgeTypesGenericAccount',
    dest: 'BridgeTypesGenericAccount',
    assetId: 'CommonPrimitivesAssetId32',
    amount: 'u128',
    status: 'BridgeTypesMessageStatus',
    startTimepoint: 'BridgeTypesGenericTimepoint',
    endTimepoint: 'BridgeTypesGenericTimepoint',
    direction: 'BridgeTypesMessageDirection'
  },
  /**
   * Lookup851: bridge_types::types::MessageDirection
   **/
  BridgeTypesMessageDirection: {
    _enum: ['Inbound', 'Outbound']
  },
  /**
   * Lookup855: bridge_proxy::pallet::Error<T>
   **/
  BridgeProxyError: {
    _enum: ['PathIsNotAvailable', 'WrongAccountKind', 'NotEnoughLockedLiquidity', 'Overflow', 'TransferLimitReached', 'AssetAlreadyLimited', 'AssetNotLimited', 'WrongLimitSettings']
  },
  /**
   * Lookup857: ethereum_light_client::PruningRange
   **/
  EthereumLightClientPruningRange: {
    oldestUnprunedBlock: 'u64',
    oldestBlockToKeep: 'u64'
  },
  /**
   * Lookup859: ethereum_light_client::StoredHeader<sp_core::crypto::AccountId32>
   **/
  EthereumLightClientStoredHeader: {
    submitter: 'Option<AccountId32>',
    header: 'BridgeTypesHeader',
    totalDifficulty: 'U256',
    finalized: 'bool'
  },
  /**
   * Lookup861: ethereum_light_client::pallet::Error<T>
   **/
  EthereumLightClientError: {
    _enum: ['AncientHeader', 'MissingHeader', 'MissingParentHeader', 'DuplicateHeader', 'HeaderNotFinalized', 'HeaderOnStaleFork', 'InvalidHeader', 'InvalidProof', 'DecodeFailed', 'NetworkNotFound', 'NetworkAlreadyExists', 'DifficultyTooLow', 'NetworkStateInvalid', 'Unknown', 'ConsensusNotSupported', 'InvalidSignature', 'HeaderNotFound']
  },
  /**
   * Lookup862: bridge_inbound_channel::pallet::Error<T>
   **/
  BridgeInboundChannelError: {
    _enum: ['InvalidNetwork', 'InvalidSourceChannel', 'InvalidEnvelope', 'InvalidBatchDispatchedEvent', 'InvalidNonce', 'InvalidRewardFraction', 'ContractExists', 'CallEncodeFailed']
  },
  /**
   * Lookup863: bridge_types::types::GenericCommitmentWithBlock<BlockNumber, MaxMessages, MaxPayload>
   **/
  BridgeTypesGenericCommitmentWithBlock: {
    blockNumber: 'u32',
    commitment: 'BridgeTypesGenericCommitment'
  },
  /**
   * Lookup864: bridge_outbound_channel::pallet::Error<T>
   **/
  BridgeOutboundChannelError: {
    _enum: ['PayloadTooLarge', 'QueueSizeLimitReached', 'MaxGasTooBig', 'Overflow', 'ChannelExists']
  },
  /**
   * Lookup866: eth_app::pallet::Error<T>
   **/
  EthAppError: {
    _enum: ['InvalidPayload', 'AppIsNotRegistered', 'InvalidAppAddress', 'AppAlreadyExists', 'DestAccountIsNotSet', 'CallEncodeFailed', 'WrongAmount', 'WrongRequest', 'WrongRequestStatus']
  },
  /**
   * Lookup870: erc20_app::pallet::Error<T>
   **/
  Erc20AppError: {
    _enum: ['TokenIsNotRegistered', 'AppIsNotRegistered', 'NotEnoughFunds', 'InvalidNetwork', 'TokenAlreadyRegistered', 'AppAlreadyRegistered', 'CallEncodeFailed', 'WrongAmount', 'WrongRequest', 'WrongRequestStatus']
  },
  /**
   * Lookup871: migration_app::pallet::Error<T>
   **/
  MigrationAppError: {
    _enum: ['InvalidPayload', 'AppIsNotRegistered', 'InvalidAppAddress', 'AppAlreadyExists', 'TokenRegisteredWithAnotherAddress', 'CallEncodeFailed']
  },
  /**
   * Lookup872: beefy_light_client::pallet::Error<T>
   **/
  BeefyLightClientError: {
    _enum: ['InvalidValidatorSetId', 'InvalidMMRProof', 'PayloadBlocknumberTooOld', 'PayloadBlocknumberTooNew', 'CannotSwitchOldValidatorSet', 'NotEnoughValidatorSignatures', 'InvalidNumberOfSignatures', 'InvalidNumberOfPositions', 'InvalidNumberOfPublicKeys', 'ValidatorNotOnceInbitfield', 'ValidatorSetIncorrectPosition', 'InvalidSignature', 'MerklePositionTooHigh', 'MerkleProofTooShort', 'MerkleProofTooHigh', 'PalletNotInitialized', 'InvalidDigestHash', 'CommitmentNotFoundInDigest', 'MMRPayloadNotFound', 'InvalidNetworkId']
  },
  /**
   * Lookup873: substrate_bridge_channel::inbound::pallet::Error<T>
   **/
  SubstrateBridgeChannelInboundPalletError: {
    _enum: ['InvalidNetwork', 'InvalidSourceChannel', 'InvalidCommitment', 'InvalidNonce', 'InvalidRewardFraction', 'ContractExists', 'CallEncodeFailed']
  },
  /**
   * Lookup874: substrate_bridge_channel::outbound::pallet::Error<T>
   **/
  SubstrateBridgeChannelOutboundPalletError: {
    _enum: ['PayloadTooLarge', 'QueueSizeLimitReached', 'MaxGasTooBig', 'NoFunds', 'Overflow', 'ChannelExists']
  },
  /**
   * Lookup877: parachain_bridge_app::pallet::Error<T>
   **/
  ParachainBridgeAppError: {
    _enum: ['TokenIsNotRegistered', 'AppIsNotRegistered', 'NotEnoughFunds', 'InvalidNetwork', 'TokenAlreadyRegistered', 'AppAlreadyRegistered', 'CallEncodeFailed', 'WrongAmount', 'TransferLimitReached', 'UnknownPrecision', 'MessageIdNotFound', 'InvalidDestinationParachain', 'InvalidDestinationParams', 'RelaychainAssetNotRegistered', 'NotRelayTransferableAsset', 'RelaychainAssetRegistered']
  },
  /**
   * Lookup884: bridge_data_signer::pallet::Error<T>
   **/
  BridgeDataSignerError: {
    _enum: ['PalletInitialized', 'PalletNotInitialized', 'PeerExists', 'PeerNotExists', 'TooMuchPeers', 'FailedToVerifySignature', 'PeerNotFound', 'TooMuchApprovals', 'ApprovalsNotFound', 'SignaturesNotFound', 'HasPendingPeerUpdate', 'DontHavePendingPeerUpdates', 'NetworkNotSupported', 'SignatureAlreadyExists']
  },
  /**
   * Lookup885: multisig_verifier::pallet::Error<T>
   **/
  MultisigVerifierError: {
    _enum: ['InvalidInitParams', 'TooMuchPeers', 'NetworkNotInitialized', 'InvalidNumberOfSignatures', 'InvalidSignature', 'NotTrustedPeerSignature', 'PeerExists', 'NoSuchPeer', 'InvalidNetworkId', 'CommitmentNotFoundInDigest', 'DuplicatedPeer']
  },
  /**
   * Lookup888: pallet_sudo::pallet::Error<T>
   **/
  PalletSudoError: {
    _enum: ['RequireSudo']
  },
  /**
   * Lookup889: faucet::pallet::Error<T>
   **/
  FaucetError: {
    _enum: ['AssetNotSupported', 'AmountAboveLimit', 'NotEnoughReserves']
  },
  /**
   * Lookup890: qa_tools::pallet::Error<T>
   **/
  QaToolsError: {
    _enum: ['WhitelistFull', 'AlreadyInWhitelist', 'NotInWhitelist', 'CannotFillUnknownOrderBook']
  },
  /**
   * Lookup893: frame_system::extensions::check_spec_version::CheckSpecVersion<T>
   **/
  FrameSystemExtensionsCheckSpecVersion: 'Null',
  /**
   * Lookup894: frame_system::extensions::check_tx_version::CheckTxVersion<T>
   **/
  FrameSystemExtensionsCheckTxVersion: 'Null',
  /**
   * Lookup895: frame_system::extensions::check_genesis::CheckGenesis<T>
   **/
  FrameSystemExtensionsCheckGenesis: 'Null',
  /**
   * Lookup898: frame_system::extensions::check_nonce::CheckNonce<T>
   **/
  FrameSystemExtensionsCheckNonce: 'Compact<u32>',
  /**
   * Lookup899: frame_system::extensions::check_weight::CheckWeight<T>
   **/
  FrameSystemExtensionsCheckWeight: 'Null',
  /**
   * Lookup900: xor_fee::extension::ChargeTransactionPayment<T>
   **/
  XorFeeExtensionChargeTransactionPayment: {
    tip: 'Compact<u128>'
  },
  /**
   * Lookup901: framenode_runtime::Runtime
   **/
  FramenodeRuntimeRuntime: 'Null'
};
