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
      WeightToFeeMultiplierUpdated: 'u128',
      PeriodUpdated: 'u32',
      SmallReferenceAmountUpdated: 'u128'
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
   * Lookup67: common::primitives::AssetId32<common::primitives::_allowed_deprecated::PredefinedAssetId>
   **/
  CommonPrimitivesAssetId32: {
    code: '[u8;32]'
  },
  /**
   * Lookup68: common::primitives::_allowed_deprecated::PredefinedAssetId
   **/
  CommonPrimitivesAllowedDeprecatedPredefinedAssetId: {
    _enum: ['XOR', 'DOT', 'KSM', 'USDT', 'VAL', 'PSWAP', 'DAI', 'ETH', 'XSTUSD', 'XST', 'TBCD', 'KEN', 'KUSD', 'KGOLD', 'KXOR', 'KARMA']
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
   * Lookup71: common::primitives::TradingPair<common::primitives::AssetId32<common::primitives::_allowed_deprecated::PredefinedAssetId>>
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
      PriceChangeConfigChanged: '(u128,u128)',
      FailedToDistributeFreeReserves: 'SpRuntimeDispatchError'
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
   * Lookup82: common::primitives::TechAssetId<common::primitives::_allowed_deprecated::PredefinedAssetId>
   **/
  CommonPrimitivesTechAssetId: {
    _enum: {
      Wrapped: 'CommonPrimitivesAllowedDeprecatedPredefinedAssetId',
      Escaped: '[u8;32]'
    }
  },
  /**
   * Lookup83: common::primitives::TechAccountId<sp_core::crypto::AccountId32, common::primitives::TechAssetId<common::primitives::_allowed_deprecated::PredefinedAssetId>, DEXId>
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
   * Lookup84: common::primitives::TechPurpose<common::primitives::TechAssetId<common::primitives::_allowed_deprecated::PredefinedAssetId>>
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
   * Lookup85: common::primitives::TradingPair<common::primitives::TechAssetId<common::primitives::_allowed_deprecated::PredefinedAssetId>>
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
      Exchange: '(AccountId32,u32,CommonPrimitivesAssetId32,CommonPrimitivesAssetId32,u128,u128,CommonOutcomeFee,Vec<CommonPrimitivesLiquiditySourceId>)',
      LiquiditySourceEnabled: 'CommonPrimitivesLiquiditySourceType',
      LiquiditySourceDisabled: 'CommonPrimitivesLiquiditySourceType',
      BatchSwapExecuted: '(u128,u128,Option<Bytes>)',
      XorlessTransfer: '(CommonPrimitivesAssetId32,AccountId32,AccountId32,u128,Option<Bytes>)',
      ADARFeeWithdrawn: '(CommonPrimitivesAssetId32,u128)'
    }
  },
  /**
   * Lookup88: common::outcome_fee::OutcomeFee<common::primitives::AssetId32<common::primitives::_allowed_deprecated::PredefinedAssetId>, AmountType>
   **/
  CommonOutcomeFee: 'BTreeMap<CommonPrimitivesAssetId32, u128>',
  /**
   * Lookup93: common::primitives::LiquiditySourceId<DEXId, common::primitives::LiquiditySourceType>
   **/
  CommonPrimitivesLiquiditySourceId: {
    dexId: 'u32',
    liquiditySourceIndex: 'CommonPrimitivesLiquiditySourceType'
  },
  /**
   * Lookup94: common::primitives::LiquiditySourceType
   **/
  CommonPrimitivesLiquiditySourceType: {
    _enum: ['XYKPool', 'BondingCurvePool', 'MulticollateralBondingCurvePool', 'MockPool', 'MockPool2', 'MockPool3', 'MockPool4', 'XSTPool', 'OrderBook']
  },
  /**
   * Lookup99: pallet_collective::pallet::Event<T, I>
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
   * Lookup101: pallet_democracy::pallet::Event<T>
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
   * Lookup102: pallet_democracy::vote_threshold::VoteThreshold
   **/
  PalletDemocracyVoteThreshold: {
    _enum: ['SuperMajorityApprove', 'SuperMajorityAgainst', 'SimpleMajority']
  },
  /**
   * Lookup103: pallet_democracy::vote::AccountVote<Balance>
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
   * Lookup105: dex_api::pallet::Event<T>
   **/
  DexApiEvent: {
    _enum: {
      LiquiditySourceEnabled: 'CommonPrimitivesLiquiditySourceType',
      LiquiditySourceDisabled: 'CommonPrimitivesLiquiditySourceType'
    }
  },
  /**
   * Lookup106: eth_bridge::pallet::Event<T>
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
   * Lookup107: pswap_distribution::pallet::Event<T>
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
   * Lookup109: pallet_multisig::Timepoint<BlockNumber>
   **/
  PalletMultisigTimepoint: {
    height: 'u32',
    index: 'u32'
  },
  /**
   * Lookup110: pallet_scheduler::pallet::Event<T>
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
   * Lookup113: iroha_migration::pallet::Event<T>
   **/
  IrohaMigrationEvent: {
    _enum: {
      Migrated: '(Text,AccountId32)'
    }
  },
  /**
   * Lookup115: pallet_membership::pallet::Event<T, I>
   **/
  PalletMembershipEvent: {
    _enum: ['MemberAdded', 'MemberRemoved', 'MembersSwapped', 'MembersReset', 'KeyChanged', 'Dummy']
  },
  /**
   * Lookup116: pallet_elections_phragmen::pallet::Event<T>
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
   * Lookup119: vested_rewards::pallet::Event<T>
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
   * Lookup120: common::primitives::RewardReason
   **/
  CommonPrimitivesRewardReason: {
    _enum: ['Unspecified', 'BuyOnBondingCurve', 'LiquidityProvisionFarming', 'DeprecatedMarketMakerVolume', 'Crowdloan']
  },
  /**
   * Lookup121: pallet_identity::pallet::Event<T>
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
   * Lookup122: farming::pallet::Event<T>
   **/
  FarmingEvent: {
    _enum: {
      LpMinXorForBonusRewardUpdated: {
        newLpMinXorForBonusReward: 'u128',
        oldLpMinXorForBonusReward: 'u128'
      }
    }
  },
  /**
   * Lookup123: xst::pallet::Event<T>
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
   * Lookup125: price_tools::pallet::Event<T>
   **/
  PriceToolsEvent: 'Null',
  /**
   * Lookup126: ceres_staking::pallet::Event<T>
   **/
  CeresStakingEvent: {
    _enum: {
      Deposited: '(AccountId32,u128)',
      Withdrawn: '(AccountId32,u128,u128)',
      RewardsChanged: 'u128'
    }
  },
  /**
   * Lookup127: ceres_liquidity_locker::pallet::Event<T>
   **/
  CeresLiquidityLockerEvent: {
    _enum: {
      Locked: '(AccountId32,u128,u64)'
    }
  },
  /**
   * Lookup128: ceres_token_locker::pallet::Event<T>
   **/
  CeresTokenLockerEvent: {
    _enum: {
      Locked: '(AccountId32,u128,CommonPrimitivesAssetId32)',
      Withdrawn: '(AccountId32,u128,CommonPrimitivesAssetId32)',
      FeeChanged: '(AccountId32,u128)'
    }
  },
  /**
   * Lookup129: ceres_governance_platform::pallet::Event<T>
   **/
  CeresGovernancePlatformEvent: {
    _enum: {
      Voted: '(AccountId32,H256,u32,CommonPrimitivesAssetId32,u128)',
      Created: '(AccountId32,Bytes,CommonPrimitivesAssetId32,u64,u64)',
      Withdrawn: '(AccountId32,H256,CommonPrimitivesAssetId32,u128)'
    }
  },
  /**
   * Lookup132: ceres_launchpad::pallet::Event<T>
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
   * Lookup133: demeter_farming_platform::pallet::Event<T>
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
   * Lookup134: pallet_bags_list::pallet::Event<T, I>
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
   * Lookup135: pallet_election_provider_multi_phase::pallet::Event<T>
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
   * Lookup136: pallet_election_provider_multi_phase::ElectionCompute
   **/
  PalletElectionProviderMultiPhaseElectionCompute: {
    _enum: ['OnChain', 'Signed', 'Unsigned', 'Fallback', 'Emergency']
  },
  /**
   * Lookup138: sp_npos_elections::ElectionScore
   **/
  SpNposElectionsElectionScore: {
    minimalStake: 'u128',
    sumStake: 'u128',
    sumStakeSquared: 'u128'
  },
  /**
   * Lookup139: pallet_election_provider_multi_phase::Phase<Bn>
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
   * Lookup141: band::pallet::Event<T, I>
   **/
  BandEvent: {
    _enum: {
      SymbolsRelayed: 'Vec<(Bytes,u128)>',
      RelayersAdded: 'Vec<AccountId32>',
      RelayersRemoved: 'Vec<AccountId32>'
    }
  },
  /**
   * Lookup145: oracle_proxy::pallet::Event<T>
   **/
  OracleProxyEvent: {
    _enum: {
      OracleEnabled: 'CommonPrimitivesOracle',
      OracleDisabled: 'CommonPrimitivesOracle'
    }
  },
  /**
   * Lookup146: common::primitives::Oracle
   **/
  CommonPrimitivesOracle: {
    _enum: ['BandChainFeed']
  },
  /**
   * Lookup147: hermes_governance_platform::pallet::Event<T>
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
   * Lookup150: pallet_preimage::pallet::Event<T>
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
   * Lookup151: order_book::pallet::Event<T>
   **/
  OrderBookEvent: {
    _enum: {
      OrderBookCreated: {
        orderBookId: 'OrderBookOrderBookId',
        creator: 'Option<AccountId32>',
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
        averagePrice: 'CommonBalanceUnit',
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
        to: 'Option<AccountId32>',
      },
      ExpirationFailure: {
        orderBookId: 'OrderBookOrderBookId',
        orderId: 'u128',
        error: 'SpRuntimeDispatchError',
      },
      AlignmentFailure: {
        orderBookId: 'OrderBookOrderBookId',
        error: 'SpRuntimeDispatchError'
      }
    }
  },
  /**
   * Lookup152: order_book::types::OrderBookId<common::primitives::AssetId32<common::primitives::_allowed_deprecated::PredefinedAssetId>, DEXId>
   **/
  OrderBookOrderBookId: {
    dexId: 'u32',
    base: 'CommonPrimitivesAssetId32',
    quote: 'CommonPrimitivesAssetId32'
  },
  /**
   * Lookup153: order_book::types::OrderBookStatus
   **/
  OrderBookOrderBookStatus: {
    _enum: ['Trade', 'PlaceAndCancel', 'OnlyCancel', 'Stop']
  },
  /**
   * Lookup154: common::primitives::PriceVariant
   **/
  CommonPrimitivesPriceVariant: {
    _enum: ['Buy', 'Sell']
  },
  /**
   * Lookup155: common::balance_unit::BalanceUnit
   **/
  CommonBalanceUnit: {
    inner: 'u128',
    isDivisible: 'bool'
  },
  /**
   * Lookup156: order_book::types::OrderAmount
   **/
  OrderBookOrderAmount: {
    _enum: {
      Base: 'CommonBalanceUnit',
      Quote: 'CommonBalanceUnit'
    }
  },
  /**
   * Lookup157: order_book::types::CancelReason
   **/
  OrderBookCancelReason: {
    _enum: ['Manual', 'Expired', 'Aligned']
  },
  /**
   * Lookup158: kensetsu::pallet::Event<T>
   **/
  KensetsuEvent: {
    _enum: {
      CDPCreated: {
        cdpId: 'u128',
        owner: 'AccountId32',
        collateralAssetId: 'CommonPrimitivesAssetId32',
        debtAssetId: 'CommonPrimitivesAssetId32',
        cdpType: 'KensetsuCdpType',
      },
      CDPClosed: {
        cdpId: 'u128',
        owner: 'AccountId32',
        collateralAssetId: 'CommonPrimitivesAssetId32',
        collateralAmount: 'u128',
      },
      CollateralDeposit: {
        cdpId: 'u128',
        owner: 'AccountId32',
        collateralAssetId: 'CommonPrimitivesAssetId32',
        amount: 'u128',
      },
      DebtIncreased: {
        cdpId: 'u128',
        owner: 'AccountId32',
        debtAssetId: 'CommonPrimitivesAssetId32',
        amount: 'u128',
      },
      DebtPayment: {
        cdpId: 'u128',
        owner: 'AccountId32',
        debtAssetId: 'CommonPrimitivesAssetId32',
        amount: 'u128',
      },
      Liquidated: {
        cdpId: 'u128',
        collateralAssetId: 'CommonPrimitivesAssetId32',
        collateralAmount: 'u128',
        debtAssetId: 'CommonPrimitivesAssetId32',
        proceeds: 'u128',
        penalty: 'u128',
      },
      CollateralRiskParametersUpdated: {
        collateralAssetId: 'CommonPrimitivesAssetId32',
        riskParameters: 'KensetsuCollateralRiskParameters',
      },
      BorrowTaxUpdated: {
        oldBorrowTaxes: 'KensetsuBorrowTaxes',
        newBorrowTaxes: 'KensetsuBorrowTaxes',
      },
      LiquidationPenaltyUpdated: {
        newLiquidationPenalty: 'Percent',
        oldLiquidationPenalty: 'Percent',
      },
      ProfitWithdrawn: {
        debtAssetId: 'CommonPrimitivesAssetId32',
        amount: 'u128',
      },
      Donation: {
        debtAssetId: 'CommonPrimitivesAssetId32',
        amount: 'u128',
      },
      StablecoinRegistered: {
        stablecoinAssetId: 'CommonPrimitivesAssetId32',
        newStablecoinParameters: 'KensetsuStablecoinParameters'
      }
    }
  },
  /**
   * Lookup159: kensetsu::CdpType
   **/
  KensetsuCdpType: {
    _enum: ['Type1', 'Type2']
  },
  /**
   * Lookup160: kensetsu::CollateralRiskParameters
   **/
  KensetsuCollateralRiskParameters: {
    hardCap: 'u128',
    liquidationRatio: 'Perbill',
    maxLiquidationLot: 'u128',
    stabilityFeeRate: 'u128',
    minimalCollateralDeposit: 'u128'
  },
  /**
   * Lookup161: kensetsu::BorrowTaxes
   **/
  KensetsuBorrowTaxes: {
    kenBorrowTax: 'Percent',
    karmaBorrowTax: 'Percent',
    tbcdBorrowTax: 'Percent'
  },
  /**
   * Lookup163: kensetsu::StablecoinParameters<common::primitives::AssetId32<common::primitives::_allowed_deprecated::PredefinedAssetId>>
   **/
  KensetsuStablecoinParameters: {
    pegAsset: 'KensetsuPegAsset',
    minimalStabilityFeeAccrue: 'u128'
  },
  /**
   * Lookup164: kensetsu::PegAsset<common::primitives::AssetId32<common::primitives::_allowed_deprecated::PredefinedAssetId>>
   **/
  KensetsuPegAsset: {
    _enum: {
      OracleSymbol: 'Bytes',
      SoraAssetId: 'CommonPrimitivesAssetId32'
    }
  },
  /**
   * Lookup165: leaf_provider::pallet::Event<T>
   **/
  LeafProviderEvent: 'Null',
  /**
   * Lookup166: bridge_proxy::pallet::Event
   **/
  BridgeProxyEvent: {
    _enum: {
      RequestStatusUpdate: '(H256,BridgeTypesMessageStatus)',
      RefundFailed: 'H256'
    }
  },
  /**
   * Lookup167: bridge_types::types::MessageStatus
   **/
  BridgeTypesMessageStatus: {
    _enum: ['InQueue', 'Committed', 'Done', 'Failed', 'Refunded', 'Approved']
  },
  /**
   * Lookup168: bridge_channel::inbound::pallet::Event<T>
   **/
  BridgeChannelInboundPalletEvent: 'Null',
  /**
   * Lookup169: bridge_channel::outbound::pallet::Event<T>
   **/
  BridgeChannelOutboundPalletEvent: {
    _enum: {
      MessageAccepted: {
        networkId: 'BridgeTypesGenericNetworkId',
        batchNonce: 'u64',
        messageNonce: 'u64'
      }
    }
  },
  /**
   * Lookup170: bridge_types::GenericNetworkId
   **/
  BridgeTypesGenericNetworkId: {
    _enum: {
      EVM: 'H256',
      Sub: 'BridgeTypesSubNetworkId',
      EVMLegacy: 'u32'
    }
  },
  /**
   * Lookup171: bridge_types::SubNetworkId
   **/
  BridgeTypesSubNetworkId: {
    _enum: ['Mainnet', 'Kusama', 'Polkadot', 'Rococo', 'Alphanet', 'Liberland']
  },
  /**
   * Lookup172: dispatch::pallet::Event<T, I>
   **/
  DispatchEvent: {
    _enum: {
      MessageDispatched: '(BridgeTypesMessageId,Result<Null, SpRuntimeDispatchError>)',
      MessageRejected: 'BridgeTypesMessageId',
      MessageDecodeFailed: 'BridgeTypesMessageId'
    }
  },
  /**
   * Lookup173: bridge_types::types::MessageId
   **/
  BridgeTypesMessageId: {
    sender: 'BridgeTypesGenericNetworkId',
    receiver: 'BridgeTypesGenericNetworkId',
    batchNonce: 'Option<u64>',
    messageNonce: 'u64'
  },
  /**
   * Lookup175: evm_fungible_app::pallet::Event<T>
   **/
  EvmFungibleAppEvent: {
    _enum: {
      Burned: {
        networkId: 'H256',
        assetId: 'CommonPrimitivesAssetId32',
        sender: 'AccountId32',
        recipient: 'H160',
        amount: 'u128',
      },
      Minted: {
        networkId: 'H256',
        assetId: 'CommonPrimitivesAssetId32',
        sender: 'H160',
        recipient: 'AccountId32',
        amount: 'u128',
      },
      Refunded: {
        networkId: 'H256',
        recipient: 'AccountId32',
        assetId: 'CommonPrimitivesAssetId32',
        amount: 'u128',
      },
      AssetRegistered: {
        networkId: 'H256',
        assetId: 'CommonPrimitivesAssetId32',
      },
      FeesClaimed: {
        recipient: 'AccountId32',
        assetId: 'CommonPrimitivesAssetId32',
        amount: 'u128'
      }
    }
  },
  /**
   * Lookup178: beefy_light_client::pallet::Event<T>
   **/
  BeefyLightClientEvent: {
    _enum: {
      VerificationSuccessful: '(BridgeTypesSubNetworkId,AccountId32,u32)',
      NewMMRRoot: '(BridgeTypesSubNetworkId,H256,u64)',
      ValidatorRegistryUpdated: '(BridgeTypesSubNetworkId,H256,u32,u64)'
    }
  },
  /**
   * Lookup179: substrate_bridge_channel::inbound::pallet::Event<T>
   **/
  SubstrateBridgeChannelInboundPalletEvent: 'Null',
  /**
   * Lookup180: substrate_bridge_channel::outbound::pallet::Event<T>
   **/
  SubstrateBridgeChannelOutboundPalletEvent: {
    _enum: {
      MessageAccepted: {
        networkId: 'BridgeTypesSubNetworkId',
        batchNonce: 'u64',
        messageNonce: 'u64',
      },
      IntervalUpdated: {
        interval: 'u32'
      }
    }
  },
  /**
   * Lookup182: parachain_bridge_app::pallet::Event<T>
   **/
  ParachainBridgeAppEvent: {
    _enum: {
      Burned: '(BridgeTypesSubNetworkId,CommonPrimitivesAssetId32,AccountId32,XcmVersionedMultiLocation,u128)',
      Minted: '(BridgeTypesSubNetworkId,CommonPrimitivesAssetId32,Option<XcmVersionedMultiLocation>,AccountId32,u128)'
    }
  },
  /**
   * Lookup183: xcm::VersionedMultiLocation
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
   * Lookup184: xcm::v2::multilocation::MultiLocation
   **/
  XcmV2MultiLocation: {
    parents: 'u8',
    interior: 'XcmV2MultilocationJunctions'
  },
  /**
   * Lookup185: xcm::v2::multilocation::Junctions
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
   * Lookup186: xcm::v2::junction::Junction
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
   * Lookup188: xcm::v2::NetworkId
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
   * Lookup190: xcm::v2::BodyId
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
   * Lookup191: xcm::v2::BodyPart
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
   * Lookup192: xcm::v3::multilocation::MultiLocation
   **/
  XcmV3MultiLocation: {
    parents: 'u8',
    interior: 'XcmV3Junctions'
  },
  /**
   * Lookup193: xcm::v3::junctions::Junctions
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
   * Lookup194: xcm::v3::junction::Junction
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
   * Lookup196: xcm::v3::junction::NetworkId
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
   * Lookup197: xcm::v3::junction::BodyId
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
   * Lookup198: xcm::v3::junction::BodyPart
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
   * Lookup200: bridge_data_signer::pallet::Event<T>
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
   * Lookup202: sp_core::ecdsa::Public
   **/
  SpCoreEcdsaPublic: '[u8;33]',
  /**
   * Lookup205: sp_core::ecdsa::Signature
   **/
  SpCoreEcdsaSignature: '[u8;65]',
  /**
   * Lookup209: multisig_verifier::pallet::Event<T>
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
   * Lookup210: substrate_bridge_app::pallet::Event<T>
   **/
  SubstrateBridgeAppEvent: {
    _enum: {
      Burned: {
        networkId: 'BridgeTypesSubNetworkId',
        assetId: 'CommonPrimitivesAssetId32',
        sender: 'AccountId32',
        recipient: 'BridgeTypesGenericAccount',
        amount: 'u128',
      },
      Minted: {
        networkId: 'BridgeTypesSubNetworkId',
        assetId: 'CommonPrimitivesAssetId32',
        sender: 'BridgeTypesGenericAccount',
        recipient: 'AccountId32',
        amount: 'u128',
      },
      FailedToMint: '(H256,SpRuntimeDispatchError)',
      AssetRegistrationProceed: 'CommonPrimitivesAssetId32',
      AssetRegistrationFinalized: 'CommonPrimitivesAssetId32'
    }
  },
  /**
   * Lookup211: bridge_types::GenericAccount
   **/
  BridgeTypesGenericAccount: {
    _enum: {
      EVM: 'H160',
      Sora: 'AccountId32',
      Liberland: 'AccountId32',
      Parachain: 'XcmVersionedMultiLocation',
      Unknown: 'Null',
      Root: 'Null'
    }
  },
  /**
   * Lookup212: pallet_sudo::pallet::Event<T>
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
   * Lookup213: faucet::pallet::Event<T>
   **/
  FaucetEvent: {
    _enum: {
      Transferred: '(AccountId32,u128)',
      LimitUpdated: 'u128'
    }
  },
  /**
   * Lookup214: qa_tools::pallet::Event<T>
   **/
  QaToolsEvent: {
    _enum: {
      OrderBooksCreated: 'Null',
      OrderBooksFilled: 'Null',
      XykInitialized: {
        pricesAchieved: 'Vec<QaToolsPalletToolsPoolXykAssetPairInput>',
      },
      XstInitialized: {
        quotesAchieved: 'Vec<QaToolsPalletToolsXstSyntheticOutput>',
      },
      McbcInitialized: {
        collateralRefPrices: 'Vec<(CommonPrimitivesAssetId32,QaToolsPalletToolsPriceToolsAssetPrices)>'
      }
    }
  },
  /**
   * Lookup216: qa_tools::pallet_tools::pool_xyk::AssetPairInput<DEXId, common::primitives::AssetId32<common::primitives::_allowed_deprecated::PredefinedAssetId>>
   **/
  QaToolsPalletToolsPoolXykAssetPairInput: {
    dexId: 'u32',
    assetA: 'CommonPrimitivesAssetId32',
    assetB: 'CommonPrimitivesAssetId32',
    price: 'u128',
    maybeAssetAReserves: 'Option<u128>'
  },
  /**
   * Lookup219: qa_tools::pallet_tools::xst::SyntheticOutput<common::primitives::AssetId32<common::primitives::_allowed_deprecated::PredefinedAssetId>>
   **/
  QaToolsPalletToolsXstSyntheticOutput: {
    assetId: 'CommonPrimitivesAssetId32',
    quoteAchieved: 'QaToolsPalletToolsXstSyntheticQuote'
  },
  /**
   * Lookup220: qa_tools::pallet_tools::xst::SyntheticQuote
   **/
  QaToolsPalletToolsXstSyntheticQuote: {
    direction: 'QaToolsPalletToolsXstSyntheticQuoteDirection',
    amount: 'CommonSwapAmountQuoteAmount',
    result: 'u128'
  },
  /**
   * Lookup221: qa_tools::pallet_tools::xst::SyntheticQuoteDirection
   **/
  QaToolsPalletToolsXstSyntheticQuoteDirection: {
    _enum: ['SyntheticBaseToSynthetic', 'SyntheticToSyntheticBase']
  },
  /**
   * Lookup222: common::swap_amount::QuoteAmount<AmountType>
   **/
  CommonSwapAmountQuoteAmount: {
    _enum: {
      WithDesiredInput: {
        desiredAmountIn: 'u128',
      },
      WithDesiredOutput: {
        desiredAmountOut: 'u128'
      }
    }
  },
  /**
   * Lookup225: qa_tools::pallet_tools::price_tools::AssetPrices
   **/
  QaToolsPalletToolsPriceToolsAssetPrices: {
    buy: 'u128',
    sell: 'u128'
  },
  /**
   * Lookup226: apollo_platform::pallet::Event<T>
   **/
  ApolloPlatformEvent: {
    _enum: {
      PoolAdded: '(AccountId32,CommonPrimitivesAssetId32)',
      Lent: '(AccountId32,CommonPrimitivesAssetId32,u128)',
      Borrowed: '(AccountId32,CommonPrimitivesAssetId32,u128,CommonPrimitivesAssetId32,u128)',
      ClaimedLendingRewards: '(AccountId32,CommonPrimitivesAssetId32,u128)',
      ClaimedBorrowingRewards: '(AccountId32,CommonPrimitivesAssetId32,u128)',
      Withdrawn: '(AccountId32,CommonPrimitivesAssetId32,u128)',
      Repaid: '(AccountId32,CommonPrimitivesAssetId32,u128)',
      ChangedRewardsAmount: '(AccountId32,bool,u128)',
      ChangedRewardsAmountPerBlock: '(AccountId32,bool,u128)',
      Liquidated: '(AccountId32,CommonPrimitivesAssetId32)',
      PoolRemoved: '(AccountId32,CommonPrimitivesAssetId32)',
      PoolInfoEdited: '(AccountId32,CommonPrimitivesAssetId32)',
      CollateralAdded: '(AccountId32,CommonPrimitivesAssetId32,u128,CommonPrimitivesAssetId32)'
    }
  },
  /**
   * Lookup227: extended_assets::pallet::Event<T>
   **/
  ExtendedAssetsEvent: {
    _enum: {
      AssetRegulated: {
        assetId: 'CommonPrimitivesAssetId32',
      },
      SoulboundTokenIssued: {
        assetId: 'CommonPrimitivesAssetId32',
        owner: 'AccountId32',
        image: 'Option<Bytes>',
        externalUrl: 'Option<Bytes>',
        issuedAt: 'u64',
      },
      SBTExpirationUpdated: {
        sbtAssetId: 'CommonPrimitivesAssetId32',
        oldExpiresAt: 'Option<u64>',
        newExpiresAt: 'Option<u64>',
      },
      RegulatedAssetBoundToSBT: {
        regulatedAssetId: 'CommonPrimitivesAssetId32',
        sbtAssetId: 'CommonPrimitivesAssetId32'
      }
    }
  },
  /**
   * Lookup230: frame_system::Phase
   **/
  FrameSystemPhase: {
    _enum: {
      ApplyExtrinsic: 'u32',
      Finalization: 'Null',
      Initialization: 'Null'
    }
  },
  /**
   * Lookup233: frame_system::LastRuntimeUpgradeInfo
   **/
  FrameSystemLastRuntimeUpgradeInfo: {
    specVersion: 'Compact<u32>',
    specName: 'Text'
  },
  /**
   * Lookup234: frame_system::pallet::Call<T>
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
   * Lookup238: frame_system::limits::BlockWeights
   **/
  FrameSystemLimitsBlockWeights: {
    baseBlock: 'SpWeightsWeightV2Weight',
    maxBlock: 'SpWeightsWeightV2Weight',
    perClass: 'FrameSupportDispatchPerDispatchClassWeightsPerClass'
  },
  /**
   * Lookup239: frame_support::dispatch::PerDispatchClass<frame_system::limits::WeightsPerClass>
   **/
  FrameSupportDispatchPerDispatchClassWeightsPerClass: {
    normal: 'FrameSystemLimitsWeightsPerClass',
    operational: 'FrameSystemLimitsWeightsPerClass',
    mandatory: 'FrameSystemLimitsWeightsPerClass'
  },
  /**
   * Lookup240: frame_system::limits::WeightsPerClass
   **/
  FrameSystemLimitsWeightsPerClass: {
    baseExtrinsic: 'SpWeightsWeightV2Weight',
    maxExtrinsic: 'Option<SpWeightsWeightV2Weight>',
    maxTotal: 'Option<SpWeightsWeightV2Weight>',
    reserved: 'Option<SpWeightsWeightV2Weight>'
  },
  /**
   * Lookup242: frame_system::limits::BlockLength
   **/
  FrameSystemLimitsBlockLength: {
    max: 'FrameSupportDispatchPerDispatchClassU32'
  },
  /**
   * Lookup243: frame_support::dispatch::PerDispatchClass<T>
   **/
  FrameSupportDispatchPerDispatchClassU32: {
    normal: 'u32',
    operational: 'u32',
    mandatory: 'u32'
  },
  /**
   * Lookup244: sp_weights::RuntimeDbWeight
   **/
  SpWeightsRuntimeDbWeight: {
    read: 'u64',
    write: 'u64'
  },
  /**
   * Lookup245: sp_version::RuntimeVersion
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
   * Lookup250: frame_system::pallet::Error<T>
   **/
  FrameSystemError: {
    _enum: ['InvalidSpecName', 'SpecVersionNeedsToIncrease', 'FailedToExtractRuntimeVersion', 'NonDefaultComposite', 'NonZeroRefCount', 'CallFiltered']
  },
  /**
   * Lookup253: sp_consensus_babe::app::Public
   **/
  SpConsensusBabeAppPublic: 'SpCoreSr25519Public',
  /**
   * Lookup256: sp_consensus_babe::digests::NextConfigDescriptor
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
   * Lookup258: sp_consensus_babe::AllowedSlots
   **/
  SpConsensusBabeAllowedSlots: {
    _enum: ['PrimarySlots', 'PrimaryAndSecondaryPlainSlots', 'PrimaryAndSecondaryVRFSlots']
  },
  /**
   * Lookup262: sp_consensus_babe::digests::PreDigest
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
   * Lookup263: sp_consensus_babe::digests::PrimaryPreDigest
   **/
  SpConsensusBabeDigestsPrimaryPreDigest: {
    authorityIndex: 'u32',
    slot: 'u64',
    vrfOutput: '[u8;32]',
    vrfProof: '[u8;64]'
  },
  /**
   * Lookup265: sp_consensus_babe::digests::SecondaryPlainPreDigest
   **/
  SpConsensusBabeDigestsSecondaryPlainPreDigest: {
    authorityIndex: 'u32',
    slot: 'u64'
  },
  /**
   * Lookup266: sp_consensus_babe::digests::SecondaryVRFPreDigest
   **/
  SpConsensusBabeDigestsSecondaryVRFPreDigest: {
    authorityIndex: 'u32',
    slot: 'u64',
    vrfOutput: '[u8;32]',
    vrfProof: '[u8;64]'
  },
  /**
   * Lookup267: sp_consensus_babe::BabeEpochConfiguration
   **/
  SpConsensusBabeBabeEpochConfiguration: {
    c: '(u64,u64)',
    allowedSlots: 'SpConsensusBabeAllowedSlots'
  },
  /**
   * Lookup268: pallet_babe::pallet::Call<T>
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
   * Lookup269: sp_consensus_slots::EquivocationProof<sp_runtime::generic::header::Header<Number, sp_runtime::traits::BlakeTwo256>, sp_consensus_babe::app::Public>
   **/
  SpConsensusSlotsEquivocationProof: {
    offender: 'SpConsensusBabeAppPublic',
    slot: 'u64',
    firstHeader: 'SpRuntimeHeader',
    secondHeader: 'SpRuntimeHeader'
  },
  /**
   * Lookup270: sp_runtime::generic::header::Header<Number, sp_runtime::traits::BlakeTwo256>
   **/
  SpRuntimeHeader: {
    parentHash: 'H256',
    number: 'Compact<u32>',
    stateRoot: 'H256',
    extrinsicsRoot: 'H256',
    digest: 'SpRuntimeDigest'
  },
  /**
   * Lookup271: sp_runtime::traits::BlakeTwo256
   **/
  SpRuntimeBlakeTwo256: 'Null',
  /**
   * Lookup272: sp_session::MembershipProof
   **/
  SpSessionMembershipProof: {
    session: 'u32',
    trieNodes: 'Vec<Bytes>',
    validatorCount: 'u32'
  },
  /**
   * Lookup273: pallet_babe::pallet::Error<T>
   **/
  PalletBabeError: {
    _enum: ['InvalidEquivocationProof', 'InvalidKeyOwnershipProof', 'DuplicateOffenceReport', 'InvalidConfiguration']
  },
  /**
   * Lookup274: pallet_timestamp::pallet::Call<T>
   **/
  PalletTimestampCall: {
    _enum: {
      set: {
        now: 'Compact<u64>'
      }
    }
  },
  /**
   * Lookup276: pallet_balances::BalanceLock<Balance>
   **/
  PalletBalancesBalanceLock: {
    id: '[u8;8]',
    amount: 'u128',
    reasons: 'PalletBalancesReasons'
  },
  /**
   * Lookup277: pallet_balances::Reasons
   **/
  PalletBalancesReasons: {
    _enum: ['Fee', 'Misc', 'All']
  },
  /**
   * Lookup280: pallet_balances::ReserveData<ReserveIdentifier, Balance>
   **/
  PalletBalancesReserveData: {
    id: 'Null',
    amount: 'u128'
  },
  /**
   * Lookup282: pallet_balances::pallet::Error<T, I>
   **/
  PalletBalancesError: {
    _enum: ['VestingBalance', 'LiquidityRestrictions', 'InsufficientBalance', 'ExistentialDeposit', 'KeepAlive', 'ExistingVestingSchedule', 'DeadAccount', 'TooManyReserves']
  },
  /**
   * Lookup284: pallet_transaction_payment::Releases
   **/
  PalletTransactionPaymentReleases: {
    _enum: ['V1Ancient', 'V2']
  },
  /**
   * Lookup286: permissions::Scope
   **/
  PermissionsScope: {
    _enum: {
      Limited: 'H512',
      Unlimited: 'Null'
    }
  },
  /**
   * Lookup290: permissions::pallet::Call<T>
   **/
  PermissionsCall: 'Null',
  /**
   * Lookup291: permissions::pallet::Error<T>
   **/
  PermissionsError: {
    _enum: ['PermissionNotFound', 'PermissionNotOwned', 'PermissionAlreadyExists', 'Forbidden', 'IncRefError']
  },
  /**
   * Lookup292: referrals::pallet::Call<T>
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
   * Lookup293: referrals::pallet::Error<T>
   **/
  ReferralsError: {
    _enum: ['AlreadyHasReferrer', 'IncRefError', 'ReferrerInsufficientBalance']
  },
  /**
   * Lookup294: rewards::RewardInfo
   **/
  RewardsRewardInfo: {
    claimable: 'u128',
    total: 'u128'
  },
  /**
   * Lookup298: rewards::pallet::Call<T>
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
   * Lookup299: rewards::pallet::Error<T>
   **/
  RewardsError: {
    _enum: ['NothingToClaim', 'AddressNotEligible', 'SignatureInvalid', 'SignatureVerificationFailed', 'IllegalCall']
  },
  /**
   * Lookup300: xor_fee::pallet::Call<T>
   **/
  XorFeeCall: {
    _enum: {
      update_multiplier: {
        newMultiplier: 'u128',
      },
      set_fee_update_period: {
        newPeriod: 'u32',
      },
      set_small_reference_amount: {
        newReferenceAmount: 'u128'
      }
    }
  },
  /**
   * Lookup301: xor_fee::pallet::Error<T>
   **/
  XorFeeError: {
    _enum: ['MultiplierCalculationFailed', 'InvalidSmallReferenceAmount']
  },
  /**
   * Lookup302: pallet_multisig::MultisigAccount<sp_core::crypto::AccountId32>
   **/
  PalletMultisigMultisigAccount: {
    signatories: 'Vec<AccountId32>',
    threshold: 'Percent'
  },
  /**
   * Lookup304: pallet_multisig::Multisig<BlockNumber, Balance, sp_core::crypto::AccountId32>
   **/
  PalletMultisigMultisig: {
    when: 'PalletMultisigBridgeTimepoint',
    deposit: 'u128',
    depositor: 'AccountId32',
    approvals: 'Vec<AccountId32>'
  },
  /**
   * Lookup307: pallet_multisig::pallet::Call<T>
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
   * Lookup309: pallet_utility::pallet::Call<T>
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
   * Lookup311: framenode_runtime::OriginCaller
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
        origin: 'BridgeTypesCallOriginOutputH256',
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
   * Lookup312: frame_support::dispatch::RawOrigin<sp_core::crypto::AccountId32>
   **/
  FrameSupportDispatchRawOrigin: {
    _enum: {
      Root: 'Null',
      Signed: 'AccountId32',
      None: 'Null'
    }
  },
  /**
   * Lookup313: pallet_collective::RawOrigin<sp_core::crypto::AccountId32, I>
   **/
  PalletCollectiveRawOrigin: {
    _enum: {
      Members: '(u32,u32)',
      Member: 'AccountId32',
      _Phantom: 'Null'
    }
  },
  /**
   * Lookup316: bridge_types::types::CallOriginOutput<primitive_types::H256, primitive_types::H256, bridge_types::evm::AdditionalEVMInboundData>
   **/
  BridgeTypesCallOriginOutputH256: {
    networkId: 'H256',
    messageId: 'H256',
    timepoint: 'BridgeTypesGenericTimepoint',
    additional: 'BridgeTypesEvmAdditionalEVMInboundData'
  },
  /**
   * Lookup317: bridge_types::evm::AdditionalEVMInboundData
   **/
  BridgeTypesEvmAdditionalEVMInboundData: {
    source: 'H160'
  },
  /**
   * Lookup318: bridge_types::GenericTimepoint
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
   * Lookup319: dispatch::RawOrigin<bridge_types::types::CallOriginOutput<bridge_types::SubNetworkId, primitive_types::H256, Additional>>
   **/
  DispatchRawOrigin: {
    origin: 'BridgeTypesCallOriginOutputSubNetworkId'
  },
  /**
   * Lookup320: bridge_types::types::CallOriginOutput<bridge_types::SubNetworkId, primitive_types::H256, Additional>
   **/
  BridgeTypesCallOriginOutputSubNetworkId: {
    networkId: 'BridgeTypesSubNetworkId',
    messageId: 'H256',
    timepoint: 'BridgeTypesGenericTimepoint',
    additional: 'Null'
  },
  /**
   * Lookup321: sp_core::Void
   **/
  SpCoreVoid: 'Null',
  /**
   * Lookup322: pallet_staking::pallet::pallet::Call<T>
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
   * Lookup323: pallet_staking::RewardDestination<sp_core::crypto::AccountId32>
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
   * Lookup324: pallet_staking::pallet::pallet::ConfigOp<T>
   **/
  PalletStakingPalletConfigOpU128: {
    _enum: {
      Noop: 'Null',
      Set: 'u128',
      Remove: 'Null'
    }
  },
  /**
   * Lookup325: pallet_staking::pallet::pallet::ConfigOp<T>
   **/
  PalletStakingPalletConfigOpU32: {
    _enum: {
      Noop: 'Null',
      Set: 'u32',
      Remove: 'Null'
    }
  },
  /**
   * Lookup326: pallet_staking::pallet::pallet::ConfigOp<sp_arithmetic::per_things::Percent>
   **/
  PalletStakingPalletConfigOpPercent: {
    _enum: {
      Noop: 'Null',
      Set: 'Percent',
      Remove: 'Null'
    }
  },
  /**
   * Lookup327: pallet_staking::pallet::pallet::ConfigOp<sp_arithmetic::per_things::Perbill>
   **/
  PalletStakingPalletConfigOpPerbill: {
    _enum: {
      Noop: 'Null',
      Set: 'Perbill',
      Remove: 'Null'
    }
  },
  /**
   * Lookup328: pallet_session::pallet::Call<T>
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
   * Lookup329: framenode_runtime::opaque::SessionKeys
   **/
  FramenodeRuntimeOpaqueSessionKeys: {
    babe: 'SpConsensusBabeAppPublic',
    grandpa: 'SpFinalityGrandpaAppPublic',
    imOnline: 'PalletImOnlineSr25519AppSr25519Public',
    beefy: 'SpBeefyCryptoPublic'
  },
  /**
   * Lookup330: sp_beefy::crypto::Public
   **/
  SpBeefyCryptoPublic: 'SpCoreEcdsaPublic',
  /**
   * Lookup331: pallet_grandpa::pallet::Call<T>
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
   * Lookup332: sp_finality_grandpa::EquivocationProof<primitive_types::H256, N>
   **/
  SpFinalityGrandpaEquivocationProof: {
    setId: 'u64',
    equivocation: 'SpFinalityGrandpaEquivocation'
  },
  /**
   * Lookup333: sp_finality_grandpa::Equivocation<primitive_types::H256, N>
   **/
  SpFinalityGrandpaEquivocation: {
    _enum: {
      Prevote: 'FinalityGrandpaEquivocationPrevote',
      Precommit: 'FinalityGrandpaEquivocationPrecommit'
    }
  },
  /**
   * Lookup334: finality_grandpa::Equivocation<sp_finality_grandpa::app::Public, finality_grandpa::Prevote<primitive_types::H256, N>, sp_finality_grandpa::app::Signature>
   **/
  FinalityGrandpaEquivocationPrevote: {
    roundNumber: 'u64',
    identity: 'SpFinalityGrandpaAppPublic',
    first: '(FinalityGrandpaPrevote,SpFinalityGrandpaAppSignature)',
    second: '(FinalityGrandpaPrevote,SpFinalityGrandpaAppSignature)'
  },
  /**
   * Lookup335: finality_grandpa::Prevote<primitive_types::H256, N>
   **/
  FinalityGrandpaPrevote: {
    targetHash: 'H256',
    targetNumber: 'u32'
  },
  /**
   * Lookup336: sp_finality_grandpa::app::Signature
   **/
  SpFinalityGrandpaAppSignature: 'SpCoreEd25519Signature',
  /**
   * Lookup337: sp_core::ed25519::Signature
   **/
  SpCoreEd25519Signature: '[u8;64]',
  /**
   * Lookup339: finality_grandpa::Equivocation<sp_finality_grandpa::app::Public, finality_grandpa::Precommit<primitive_types::H256, N>, sp_finality_grandpa::app::Signature>
   **/
  FinalityGrandpaEquivocationPrecommit: {
    roundNumber: 'u64',
    identity: 'SpFinalityGrandpaAppPublic',
    first: '(FinalityGrandpaPrecommit,SpFinalityGrandpaAppSignature)',
    second: '(FinalityGrandpaPrecommit,SpFinalityGrandpaAppSignature)'
  },
  /**
   * Lookup340: finality_grandpa::Precommit<primitive_types::H256, N>
   **/
  FinalityGrandpaPrecommit: {
    targetHash: 'H256',
    targetNumber: 'u32'
  },
  /**
   * Lookup342: pallet_im_online::pallet::Call<T>
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
   * Lookup343: pallet_im_online::Heartbeat<BlockNumber>
   **/
  PalletImOnlineHeartbeat: {
    blockNumber: 'u32',
    networkState: 'SpCoreOffchainOpaqueNetworkState',
    sessionIndex: 'u32',
    authorityIndex: 'u32',
    validatorsLen: 'u32'
  },
  /**
   * Lookup344: sp_core::offchain::OpaqueNetworkState
   **/
  SpCoreOffchainOpaqueNetworkState: {
    peerId: 'OpaquePeerId',
    externalAddresses: 'Vec<OpaqueMultiaddr>'
  },
  /**
   * Lookup348: pallet_im_online::sr25519::app_sr25519::Signature
   **/
  PalletImOnlineSr25519AppSr25519Signature: 'SpCoreSr25519Signature',
  /**
   * Lookup349: sp_core::sr25519::Signature
   **/
  SpCoreSr25519Signature: '[u8;64]',
  /**
   * Lookup350: trading_pair::pallet::Call<T>
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
   * Lookup351: assets::pallet::Call<T>
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
   * Lookup354: multicollateral_bonding_curve_pool::pallet::Call<T>
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
   * Lookup355: technical::pallet::Call<T>
   **/
  TechnicalCall: 'Null',
  /**
   * Lookup356: pool_xyk::pallet::Call<T>
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
   * Lookup357: liquidity_proxy::pallet::Call<T>
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
        additionalData: 'Option<Bytes>',
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
   * Lookup358: common::swap_amount::SwapAmount<AmountType>
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
   * Lookup360: common::primitives::FilterMode
   **/
  CommonPrimitivesFilterMode: {
    _enum: ['Disabled', 'ForbidSelected', 'AllowSelected']
  },
  /**
   * Lookup362: liquidity_proxy::SwapBatchInfo<common::primitives::AssetId32<common::primitives::_allowed_deprecated::PredefinedAssetId>, DEXId, sp_core::crypto::AccountId32>
   **/
  LiquidityProxySwapBatchInfo: {
    outcomeAssetId: 'CommonPrimitivesAssetId32',
    outcomeAssetReuse: 'u128',
    dexId: 'u32',
    receivers: 'Vec<LiquidityProxyBatchReceiverInfo>'
  },
  /**
   * Lookup364: liquidity_proxy::BatchReceiverInfo<sp_core::crypto::AccountId32>
   **/
  LiquidityProxyBatchReceiverInfo: {
    accountId: 'AccountId32',
    targetAmount: 'u128'
  },
  /**
   * Lookup365: pallet_collective::pallet::Call<T, I>
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
   * Lookup369: pallet_democracy::pallet::Call<T>
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
   * Lookup370: frame_support::traits::preimages::Bounded<framenode_runtime::RuntimeCall>
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
   * Lookup372: pallet_democracy::conviction::Conviction
   **/
  PalletDemocracyConviction: {
    _enum: ['None', 'Locked1x', 'Locked2x', 'Locked3x', 'Locked4x', 'Locked5x', 'Locked6x']
  },
  /**
   * Lookup374: dex_api::pallet::Call<T>
   **/
  DexApiCall: {
    _enum: {
      enable_liquidity_source: {
        source: 'CommonPrimitivesLiquiditySourceType',
      },
      disable_liquidity_source: {
        source: 'CommonPrimitivesLiquiditySourceType'
      }
    }
  },
  /**
   * Lookup375: eth_bridge::pallet::Call<T>
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
   * Lookup376: eth_bridge::BridgeSignatureVersion
   **/
  EthBridgeBridgeSignatureVersion: {
    _enum: ['V1', 'V2', 'V3']
  },
  /**
   * Lookup377: eth_bridge::requests::IncomingRequestKind
   **/
  EthBridgeRequestsIncomingRequestKind: {
    _enum: {
      Transaction: 'EthBridgeRequestsIncomingTransactionRequestKind',
      Meta: 'EthBridgeRequestsIncomingMetaRequestKind'
    }
  },
  /**
   * Lookup378: eth_bridge::requests::IncomingTransactionRequestKind
   **/
  EthBridgeRequestsIncomingTransactionRequestKind: {
    _enum: ['Transfer', 'AddAsset', 'AddPeer', 'RemovePeer', 'PrepareForMigration', 'Migrate', 'AddPeerCompat', 'RemovePeerCompat', 'TransferXOR']
  },
  /**
   * Lookup379: eth_bridge::requests::IncomingMetaRequestKind
   **/
  EthBridgeRequestsIncomingMetaRequestKind: {
    _enum: ['CancelOutgoingRequest', 'MarkAsDone']
  },
  /**
   * Lookup381: eth_bridge::requests::IncomingRequest<T>
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
   * Lookup382: eth_bridge::requests::incoming::IncomingTransfer<T>
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
   * Lookup383: eth_bridge::requests::AssetKind
   **/
  EthBridgeRequestsAssetKind: {
    _enum: ['Thischain', 'Sidechain', 'SidechainOwned']
  },
  /**
   * Lookup384: eth_bridge::requests::incoming::IncomingAddToken<T>
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
   * Lookup385: eth_bridge::requests::incoming::IncomingChangePeers<T>
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
   * Lookup386: eth_bridge::requests::incoming::IncomingCancelOutgoingRequest<T>
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
   * Lookup387: eth_bridge::requests::OutgoingRequest<T>
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
   * Lookup388: eth_bridge::requests::outgoing::OutgoingTransfer<T>
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
   * Lookup389: eth_bridge::requests::outgoing::OutgoingAddAsset<T>
   **/
  EthBridgeRequestsOutgoingOutgoingAddAsset: {
    author: 'AccountId32',
    assetId: 'CommonPrimitivesAssetId32',
    nonce: 'u32',
    networkId: 'u32',
    timepoint: 'PalletMultisigBridgeTimepoint'
  },
  /**
   * Lookup390: eth_bridge::requests::outgoing::OutgoingAddToken<T>
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
   * Lookup391: eth_bridge::requests::outgoing::OutgoingAddPeer<T>
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
   * Lookup392: eth_bridge::requests::outgoing::OutgoingRemovePeer<T>
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
   * Lookup394: eth_bridge::requests::outgoing::OutgoingPrepareForMigration<T>
   **/
  EthBridgeRequestsOutgoingOutgoingPrepareForMigration: {
    author: 'AccountId32',
    nonce: 'u32',
    networkId: 'u32',
    timepoint: 'PalletMultisigBridgeTimepoint'
  },
  /**
   * Lookup395: eth_bridge::requests::outgoing::OutgoingMigrate<T>
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
   * Lookup396: eth_bridge::requests::outgoing::OutgoingAddPeerCompat<T>
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
   * Lookup397: eth_bridge::requests::outgoing::OutgoingRemovePeerCompat<T>
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
   * Lookup398: eth_bridge::requests::incoming::IncomingMarkAsDoneRequest<T>
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
   * Lookup399: eth_bridge::requests::incoming::IncomingPrepareForMigration<T>
   **/
  EthBridgeRequestsIncomingIncomingPrepareForMigration: {
    author: 'AccountId32',
    txHash: 'H256',
    atHeight: 'u64',
    timepoint: 'PalletMultisigBridgeTimepoint',
    networkId: 'u32'
  },
  /**
   * Lookup400: eth_bridge::requests::incoming::IncomingMigrate<T>
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
   * Lookup401: eth_bridge::requests::incoming::IncomingChangePeersCompat<T>
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
   * Lookup402: eth_bridge::requests::incoming::ChangePeersContract
   **/
  EthBridgeRequestsIncomingChangePeersContract: {
    _enum: ['XOR', 'VAL']
  },
  /**
   * Lookup403: eth_bridge::requests::LoadIncomingRequest<T>
   **/
  EthBridgeRequestsLoadIncomingRequest: {
    _enum: {
      Transaction: 'EthBridgeRequestsLoadIncomingTransactionRequest',
      Meta: '(EthBridgeRequestsLoadIncomingMetaRequest,H256)'
    }
  },
  /**
   * Lookup404: eth_bridge::requests::LoadIncomingTransactionRequest<T>
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
   * Lookup405: eth_bridge::requests::LoadIncomingMetaRequest<T>
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
   * Lookup407: eth_bridge::offchain::SignatureParams
   **/
  EthBridgeOffchainSignatureParams: {
    r: '[u8;32]',
    s: '[u8;32]',
    v: 'u8'
  },
  /**
   * Lookup408: pswap_distribution::pallet::Call<T>
   **/
  PswapDistributionCall: {
    _enum: ['claim_incentive']
  },
  /**
   * Lookup411: pallet_scheduler::pallet::Call<T>
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
   * Lookup413: iroha_migration::pallet::Call<T>
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
   * Lookup414: pallet_membership::pallet::Call<T, I>
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
   * Lookup415: pallet_elections_phragmen::pallet::Call<T>
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
   * Lookup416: pallet_elections_phragmen::Renouncing
   **/
  PalletElectionsPhragmenRenouncing: {
    _enum: {
      Member: 'Null',
      RunnerUp: 'Null',
      Candidate: 'Compact<u32>'
    }
  },
  /**
   * Lookup417: vested_rewards::pallet::Call<T>
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
   * Lookup425: pallet_identity::pallet::Call<T>
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
   * Lookup426: pallet_identity::types::IdentityInfo<FieldLimit>
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
   * Lookup462: pallet_identity::types::BitFlags<pallet_identity::types::IdentityField>
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
   * Lookup463: pallet_identity::types::IdentityField
   **/
  PalletIdentityIdentityField: {
    _enum: ['__Unused0', 'Display', 'Legal', '__Unused3', 'Web', '__Unused5', '__Unused6', '__Unused7', 'Riot', '__Unused9', '__Unused10', '__Unused11', '__Unused12', '__Unused13', '__Unused14', '__Unused15', 'Email', '__Unused17', '__Unused18', '__Unused19', '__Unused20', '__Unused21', '__Unused22', '__Unused23', '__Unused24', '__Unused25', '__Unused26', '__Unused27', '__Unused28', '__Unused29', '__Unused30', '__Unused31', 'PgpFingerprint', '__Unused33', '__Unused34', '__Unused35', '__Unused36', '__Unused37', '__Unused38', '__Unused39', '__Unused40', '__Unused41', '__Unused42', '__Unused43', '__Unused44', '__Unused45', '__Unused46', '__Unused47', '__Unused48', '__Unused49', '__Unused50', '__Unused51', '__Unused52', '__Unused53', '__Unused54', '__Unused55', '__Unused56', '__Unused57', '__Unused58', '__Unused59', '__Unused60', '__Unused61', '__Unused62', '__Unused63', 'Image', '__Unused65', '__Unused66', '__Unused67', '__Unused68', '__Unused69', '__Unused70', '__Unused71', '__Unused72', '__Unused73', '__Unused74', '__Unused75', '__Unused76', '__Unused77', '__Unused78', '__Unused79', '__Unused80', '__Unused81', '__Unused82', '__Unused83', '__Unused84', '__Unused85', '__Unused86', '__Unused87', '__Unused88', '__Unused89', '__Unused90', '__Unused91', '__Unused92', '__Unused93', '__Unused94', '__Unused95', '__Unused96', '__Unused97', '__Unused98', '__Unused99', '__Unused100', '__Unused101', '__Unused102', '__Unused103', '__Unused104', '__Unused105', '__Unused106', '__Unused107', '__Unused108', '__Unused109', '__Unused110', '__Unused111', '__Unused112', '__Unused113', '__Unused114', '__Unused115', '__Unused116', '__Unused117', '__Unused118', '__Unused119', '__Unused120', '__Unused121', '__Unused122', '__Unused123', '__Unused124', '__Unused125', '__Unused126', '__Unused127', 'Twitter']
  },
  /**
   * Lookup464: pallet_identity::types::Judgement<Balance>
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
   * Lookup465: farming::pallet::Call<T>
   **/
  FarmingCall: {
    _enum: {
      set_lp_min_xor_for_bonus_reward: {
        newLpMinXorForBonusReward: 'u128'
      }
    }
  },
  /**
   * Lookup466: xst::pallet::Call<T>
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
   * Lookup467: ceres_staking::pallet::Call<T>
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
   * Lookup468: ceres_liquidity_locker::pallet::Call<T>
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
   * Lookup469: ceres_token_locker::pallet::Call<T>
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
   * Lookup470: ceres_governance_platform::pallet::Call<T>
   **/
  CeresGovernancePlatformCall: {
    _enum: {
      vote: {
        pollId: 'H256',
        votingOption: 'u32',
        numberOfVotes: 'u128',
      },
      create_poll: {
        pollAsset: 'CommonPrimitivesAssetId32',
        pollStartTimestamp: 'u64',
        pollEndTimestamp: 'u64',
        title: 'Bytes',
        description: 'Bytes',
        options: 'Vec<Bytes>',
      },
      withdraw: {
        pollId: 'H256'
      }
    }
  },
  /**
   * Lookup475: ceres_launchpad::pallet::Call<T>
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
   * Lookup476: demeter_farming_platform::pallet::Call<T>
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
   * Lookup477: pallet_bags_list::pallet::Call<T, I>
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
   * Lookup478: pallet_election_provider_multi_phase::pallet::Call<T>
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
   * Lookup479: pallet_election_provider_multi_phase::RawSolution<framenode_runtime::NposCompactSolution24>
   **/
  PalletElectionProviderMultiPhaseRawSolution: {
    solution: 'FramenodeRuntimeNposCompactSolution24',
    score: 'SpNposElectionsElectionScore',
    round: 'u32'
  },
  /**
   * Lookup480: framenode_runtime::NposCompactSolution24
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
   * Lookup555: pallet_election_provider_multi_phase::SolutionOrSnapshotSize
   **/
  PalletElectionProviderMultiPhaseSolutionOrSnapshotSize: {
    voters: 'Compact<u32>',
    targets: 'Compact<u32>'
  },
  /**
   * Lookup559: sp_npos_elections::Support<sp_core::crypto::AccountId32>
   **/
  SpNposElectionsSupport: {
    total: 'u128',
    voters: 'Vec<(AccountId32,u128)>'
  },
  /**
   * Lookup560: band::pallet::Call<T, I>
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
   * Lookup564: band::FeeCalculationParameters
   **/
  BandFeeCalculationParameters: {
    decay: 'FixnumFixedPoint',
    minFee: 'FixnumFixedPoint',
    deviation: 'FixnumFixedPoint'
  },
  /**
   * Lookup565: oracle_proxy::pallet::Call<T>
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
   * Lookup566: hermes_governance_platform::pallet::Call<T>
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
   * Lookup567: pallet_preimage::pallet::Call<T>
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
   * Lookup568: order_book::pallet::Call<T>
   **/
  OrderBookCall: {
    _enum: {
      create_orderbook: {
        orderBookId: 'OrderBookOrderBookId',
        tickSize: 'u128',
        stepLotSize: 'u128',
        minLotSize: 'u128',
        maxLotSize: 'u128',
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
   * Lookup571: kensetsu::pallet::Call<T>
   **/
  KensetsuCall: {
    _enum: {
      create_cdp: {
        collateralAssetId: 'CommonPrimitivesAssetId32',
        collateralAmount: 'u128',
        stablecoinAssetId: 'CommonPrimitivesAssetId32',
        borrowAmountMin: 'u128',
        borrowAmountMax: 'u128',
        cdpType: 'KensetsuCdpType',
      },
      close_cdp: {
        cdpId: 'u128',
      },
      deposit_collateral: {
        cdpId: 'u128',
        collateralAmount: 'u128',
      },
      borrow: {
        cdpId: 'u128',
        borrowAmountMin: 'u128',
        borrowAmountMax: 'u128',
      },
      repay_debt: {
        cdpId: 'u128',
        amount: 'u128',
      },
      liquidate: {
        cdpId: 'u128',
      },
      accrue: {
        cdpId: 'u128',
      },
      update_collateral_risk_parameters: {
        collateralAssetId: 'CommonPrimitivesAssetId32',
        stablecoinAssetId: 'CommonPrimitivesAssetId32',
        newRiskParameters: 'KensetsuCollateralRiskParameters',
      },
      update_borrow_tax: {
        newBorrowTaxes: 'KensetsuBorrowTaxes',
      },
      update_liquidation_penalty: {
        newLiquidationPenalty: 'Percent',
      },
      withdraw_profit: {
        beneficiary: 'AccountId32',
        stablecoinAssetId: 'CommonPrimitivesAssetId32',
        amount: 'u128',
      },
      donate: {
        stablecoinAssetId: 'CommonPrimitivesAssetId32',
        amount: 'u128',
      },
      register_stablecoin: {
        newStablecoinParameters: 'KensetsuStablecoinParameters'
      }
    }
  },
  /**
   * Lookup572: bridge_proxy::pallet::Call<T>
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
   * Lookup573: bridge_proxy::TransferLimitSettings<BlockNumber>
   **/
  BridgeProxyTransferLimitSettings: {
    maxAmount: 'u128',
    periodBlocks: 'u32'
  },
  /**
   * Lookup574: bridge_channel::inbound::pallet::Call<T>
   **/
  BridgeChannelInboundPalletCall: {
    _enum: {
      submit: {
        networkId: 'BridgeTypesGenericNetworkId',
        commitment: 'BridgeTypesGenericCommitment',
        proof: 'FramenodeRuntimeMultiProof',
      },
      register_evm_channel: {
        networkId: 'H256',
        channelAddress: 'H160'
      }
    }
  },
  /**
   * Lookup575: bridge_types::GenericCommitment<MaxMessages, MaxPayload>
   **/
  BridgeTypesGenericCommitment: {
    _enum: {
      Sub: 'BridgeTypesSubstrateCommitment',
      EVM: 'BridgeTypesEvmCommitment'
    }
  },
  /**
   * Lookup576: bridge_types::substrate::Commitment<MaxMessages, MaxPayload>
   **/
  BridgeTypesSubstrateCommitment: {
    messages: 'Vec<BridgeTypesSubstrateBridgeMessage>',
    nonce: 'u64'
  },
  /**
   * Lookup578: bridge_types::substrate::BridgeMessage<MaxPayload>
   **/
  BridgeTypesSubstrateBridgeMessage: {
    payload: 'Bytes',
    timepoint: 'BridgeTypesGenericTimepoint'
  },
  /**
   * Lookup581: bridge_types::evm::Commitment<MaxMessages, MaxPayload>
   **/
  BridgeTypesEvmCommitment: {
    _enum: {
      Outbound: 'BridgeTypesEvmOutboundCommitment',
      Inbound: 'BridgeTypesEvmInboundCommitment',
      StatusReport: 'BridgeTypesEvmStatusReport',
      BaseFeeUpdate: 'BridgeTypesEvmBaseFeeUpdate'
    }
  },
  /**
   * Lookup582: bridge_types::evm::OutboundCommitment<MaxMessages, MaxPayload>
   **/
  BridgeTypesEvmOutboundCommitment: {
    nonce: 'u64',
    totalMaxGas: 'U256',
    messages: 'Vec<BridgeTypesEvmMessage>'
  },
  /**
   * Lookup586: bridge_types::evm::Message<MaxPayload>
   **/
  BridgeTypesEvmMessage: {
    target: 'H160',
    maxGas: 'U256',
    payload: 'Bytes'
  },
  /**
   * Lookup588: bridge_types::evm::InboundCommitment<MaxPayload>
   **/
  BridgeTypesEvmInboundCommitment: {
    channel: 'H160',
    source: 'H160',
    nonce: 'u64',
    blockNumber: 'u64',
    payload: 'Bytes'
  },
  /**
   * Lookup589: bridge_types::evm::StatusReport<MaxMessages>
   **/
  BridgeTypesEvmStatusReport: {
    channel: 'H160',
    blockNumber: 'u64',
    relayer: 'H160',
    nonce: 'u64',
    results: 'Vec<bool>',
    gasSpent: 'U256',
    baseFee: 'U256'
  },
  /**
   * Lookup592: bridge_types::evm::BaseFeeUpdate
   **/
  BridgeTypesEvmBaseFeeUpdate: {
    newBaseFee: 'U256',
    evmBlockNumber: 'u64'
  },
  /**
   * Lookup593: framenode_runtime::MultiProof
   **/
  FramenodeRuntimeMultiProof: {
    _enum: {
      Beefy: 'BeefyLightClientSubstrateBridgeMessageProof',
      Multisig: 'MultisigVerifierProof',
      EVMMultisig: 'MultisigVerifierMultiEVMProof'
    }
  },
  /**
   * Lookup594: beefy_light_client::SubstrateBridgeMessageProof
   **/
  BeefyLightClientSubstrateBridgeMessageProof: {
    proof: 'BridgeCommonSimplifiedProofProof',
    leaf: 'SpBeefyMmrMmrLeaf',
    digest: 'BridgeTypesAuxiliaryDigest'
  },
  /**
   * Lookup595: bridge_common::simplified_proof::Proof<primitive_types::H256>
   **/
  BridgeCommonSimplifiedProofProof: {
    order: 'u64',
    items: 'Vec<H256>'
  },
  /**
   * Lookup596: sp_beefy::mmr::MmrLeaf<BlockNumber, primitive_types::H256, primitive_types::H256, bridge_types::types::LeafExtraData<primitive_types::H256, primitive_types::H256>>
   **/
  SpBeefyMmrMmrLeaf: {
    version: 'u8',
    parentNumberAndHash: '(u32,H256)',
    beefyNextAuthoritySet: 'SpBeefyMmrBeefyAuthoritySet',
    leafExtra: 'BridgeTypesLeafExtraData'
  },
  /**
   * Lookup597: bridge_types::types::LeafExtraData<primitive_types::H256, primitive_types::H256>
   **/
  BridgeTypesLeafExtraData: {
    randomSeed: 'H256',
    digestHash: 'H256'
  },
  /**
   * Lookup600: sp_beefy::mmr::BeefyAuthoritySet<primitive_types::H256>
   **/
  SpBeefyMmrBeefyAuthoritySet: {
    id: 'u64',
    len: 'u32',
    root: 'H256'
  },
  /**
   * Lookup601: bridge_types::types::AuxiliaryDigest
   **/
  BridgeTypesAuxiliaryDigest: {
    logs: 'Vec<BridgeTypesAuxiliaryDigestItem>'
  },
  /**
   * Lookup603: bridge_types::types::AuxiliaryDigestItem
   **/
  BridgeTypesAuxiliaryDigestItem: {
    _enum: {
      Commitment: '(BridgeTypesGenericNetworkId,H256)'
    }
  },
  /**
   * Lookup604: multisig_verifier::Proof
   **/
  MultisigVerifierProof: {
    digest: 'BridgeTypesAuxiliaryDigest',
    proof: 'Vec<SpCoreEcdsaSignature>'
  },
  /**
   * Lookup605: multisig_verifier::MultiEVMProof
   **/
  MultisigVerifierMultiEVMProof: {
    proof: 'Vec<SpCoreEcdsaSignature>'
  },
  /**
   * Lookup606: evm_fungible_app::pallet::Call<T>
   **/
  EvmFungibleAppCall: {
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
        networkId: 'H256',
        assetId: 'CommonPrimitivesAssetId32',
        recipient: 'H160',
        amount: 'u128',
      },
      register_sidechain_asset: {
        networkId: 'H256',
        address: 'H160',
        symbol: 'Bytes',
        name: 'Bytes',
        decimals: 'u8',
      },
      register_existing_sidechain_asset: {
        networkId: 'H256',
        address: 'H160',
        assetId: 'CommonPrimitivesAssetId32',
        decimals: 'u8',
      },
      register_thischain_asset: {
        networkId: 'H256',
        assetId: 'CommonPrimitivesAssetId32',
      },
      register_network: {
        networkId: 'H256',
        contract: 'H160',
        symbol: 'Bytes',
        name: 'Bytes',
        sidechainPrecision: 'u8',
      },
      register_network_with_existing_asset: {
        networkId: 'H256',
        contract: 'H160',
        assetId: 'CommonPrimitivesAssetId32',
        sidechainPrecision: 'u8',
      },
      claim_relayer_fees: {
        networkId: 'H256',
        relayer: 'H160',
        signature: 'SpCoreEcdsaSignature'
      }
    }
  },
  /**
   * Lookup607: beefy_light_client::pallet::Call<T>
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
   * Lookup608: sp_beefy::commitment::Commitment<TBlockNumber>
   **/
  SpBeefyCommitment: {
    payload: 'SpBeefyPayload',
    blockNumber: 'u32',
    validatorSetId: 'u64'
  },
  /**
   * Lookup609: sp_beefy::payload::Payload
   **/
  SpBeefyPayload: 'Vec<([u8;2],Bytes)>',
  /**
   * Lookup612: bridge_common::beefy_types::ValidatorProof
   **/
  BridgeCommonBeefyTypesValidatorProof: {
    validatorClaimsBitfield: 'BitVec',
    signatures: 'Vec<Bytes>',
    positions: 'Vec<u128>',
    publicKeys: 'Vec<H160>',
    publicKeyMerkleProofs: 'Vec<Vec<H256>>'
  },
  /**
   * Lookup615: bitvec::order::Msb0
   **/
  BitvecOrderMsb0: 'Null',
  /**
   * Lookup617: substrate_bridge_channel::inbound::pallet::Call<T>
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
   * Lookup618: substrate_bridge_channel::outbound::pallet::Call<T>
   **/
  SubstrateBridgeChannelOutboundPalletCall: {
    _enum: {
      update_interval: {
        newInterval: 'u32'
      }
    }
  },
  /**
   * Lookup619: parachain_bridge_app::pallet::Call<T>
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
   * Lookup620: bridge_types::types::AssetKind
   **/
  BridgeTypesAssetKind: {
    _enum: ['Thischain', 'Sidechain']
  },
  /**
   * Lookup621: xcm::v3::multiasset::AssetId
   **/
  XcmV3MultiassetAssetId: {
    _enum: {
      Concrete: 'XcmV3MultiLocation',
      Abstract: '[u8;32]'
    }
  },
  /**
   * Lookup622: bridge_types::substrate::XCMAppTransferStatus
   **/
  BridgeTypesSubstrateXcmAppTransferStatus: {
    _enum: ['Success', 'XCMTransferError']
  },
  /**
   * Lookup623: bridge_data_signer::pallet::Call<T>
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
   * Lookup624: multisig_verifier::pallet::Call<T>
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
   * Lookup625: substrate_bridge_app::pallet::Call<T>
   **/
  SubstrateBridgeAppCall: {
    _enum: {
      mint: {
        assetId: 'CommonPrimitivesAssetId32',
        sender: 'BridgeTypesGenericAccount',
        recipient: 'AccountId32',
        amount: 'BridgeTypesGenericBalance',
      },
      finalize_asset_registration: {
        assetId: 'CommonPrimitivesAssetId32',
        sidechainAssetId: 'BridgeTypesGenericAssetId',
        assetKind: 'BridgeTypesAssetKind',
        sidechainPrecision: 'u8',
      },
      incoming_thischain_asset_registration: {
        assetId: 'CommonPrimitivesAssetId32',
        sidechainAssetId: 'BridgeTypesGenericAssetId',
      },
      burn: {
        networkId: 'BridgeTypesSubNetworkId',
        assetId: 'CommonPrimitivesAssetId32',
        recipient: 'BridgeTypesGenericAccount',
        amount: 'u128',
      },
      register_sidechain_asset: {
        networkId: 'BridgeTypesSubNetworkId',
        sidechainAsset: 'BridgeTypesGenericAssetId',
        symbol: 'Bytes',
        name: 'Bytes',
      },
      update_transaction_status: {
        messageId: 'H256',
        messageStatus: 'BridgeTypesMessageStatus'
      }
    }
  },
  /**
   * Lookup626: bridge_types::GenericBalance
   **/
  BridgeTypesGenericBalance: {
    _enum: {
      Substrate: 'u128',
      EVM: 'H256'
    }
  },
  /**
   * Lookup627: bridge_types::GenericAssetId
   **/
  BridgeTypesGenericAssetId: {
    _enum: {
      Sora: 'H256',
      XCM: 'XcmV3MultiassetAssetId',
      EVM: 'H160',
      Liberland: 'BridgeTypesLiberlandAssetId'
    }
  },
  /**
   * Lookup628: bridge_types::LiberlandAssetId
   **/
  BridgeTypesLiberlandAssetId: {
    _enum: {
      LLD: 'Null',
      Asset: 'u32'
    }
  },
  /**
   * Lookup629: pallet_sudo::pallet::Call<T>
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
   * Lookup630: faucet::pallet::Call<T>
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
   * Lookup631: qa_tools::pallet::Call<T>
   **/
  QaToolsCall: {
    _enum: {
      order_book_create_and_fill_batch: {
        bidsOwner: 'AccountId32',
        asksOwner: 'AccountId32',
        settings: 'Vec<(OrderBookOrderBookId,QaToolsPalletToolsOrderBookOrderBookAttributes,QaToolsPalletToolsOrderBookFillInput)>',
      },
      order_book_fill_batch: {
        bidsOwner: 'AccountId32',
        asksOwner: 'AccountId32',
        settings: 'Vec<(OrderBookOrderBookId,QaToolsPalletToolsOrderBookFillInput)>',
      },
      xyk_initialize: {
        account: 'AccountId32',
        pairs: 'Vec<QaToolsPalletToolsPoolXykAssetPairInput>',
      },
      xst_initialize: {
        basePrices: 'Option<QaToolsPalletToolsXstBaseInput>',
        syntheticsPrices: 'Vec<QaToolsPalletToolsXstSyntheticInput>',
        relayer: 'AccountId32',
      },
      mcbc_initialize: {
        baseSupply: 'Option<QaToolsPalletToolsMcbcBaseSupply>',
        otherCollaterals: 'Vec<QaToolsPalletToolsMcbcOtherCollateralInput>',
        tbcdCollateral: 'Option<QaToolsPalletToolsMcbcTbcdCollateralInput>',
      },
      price_tools_set_asset_price: {
        assetPerXor: 'QaToolsPalletToolsPriceToolsAssetPrices',
        assetId: 'QaToolsInputAssetId'
      }
    }
  },
  /**
   * Lookup634: qa_tools::pallet_tools::order_book::OrderBookAttributes
   **/
  QaToolsPalletToolsOrderBookOrderBookAttributes: {
    tickSize: 'u128',
    stepLotSize: 'u128',
    minLotSize: 'u128',
    maxLotSize: 'u128'
  },
  /**
   * Lookup635: qa_tools::pallet_tools::order_book::FillInput<Moment, BlockNumber>
   **/
  QaToolsPalletToolsOrderBookFillInput: {
    asks: 'Option<QaToolsPalletToolsOrderBookSideFillInput>',
    bids: 'Option<QaToolsPalletToolsOrderBookSideFillInput>',
    randomSeed: 'Option<u32>'
  },
  /**
   * Lookup637: qa_tools::pallet_tools::order_book::SideFillInput<Moment>
   **/
  QaToolsPalletToolsOrderBookSideFillInput: {
    highestPrice: 'u128',
    lowestPrice: 'u128',
    priceStep: 'u128',
    ordersPerPrice: 'u32',
    lifespan: 'Option<u64>',
    amountRangeInclusive: 'Option<QaToolsPalletToolsOrderBookRandomAmount>'
  },
  /**
   * Lookup639: qa_tools::pallet_tools::order_book::RandomAmount
   **/
  QaToolsPalletToolsOrderBookRandomAmount: {
    min: 'u128',
    max: 'u128'
  },
  /**
   * Lookup643: qa_tools::pallet_tools::xst::BaseInput
   **/
  QaToolsPalletToolsXstBaseInput: {
    referencePerSyntheticBaseBuy: 'u128',
    referencePerSyntheticBaseSell: 'u128'
  },
  /**
   * Lookup645: qa_tools::pallet_tools::xst::SyntheticInput<common::primitives::AssetId32<common::primitives::_allowed_deprecated::PredefinedAssetId>, common::primitives::SymbolName>
   **/
  QaToolsPalletToolsXstSyntheticInput: {
    assetId: 'CommonPrimitivesAssetId32',
    expectedQuote: 'QaToolsPalletToolsXstSyntheticQuote',
    existence: 'QaToolsPalletToolsXstSyntheticExistence'
  },
  /**
   * Lookup646: qa_tools::pallet_tools::xst::SyntheticExistence<common::primitives::SymbolName>
   **/
  QaToolsPalletToolsXstSyntheticExistence: {
    _enum: {
      AlreadyExists: 'Null',
      RegisterNewAsset: {
        symbol: 'Bytes',
        name: 'Bytes',
        referenceSymbol: 'Bytes',
        feeRatio: 'FixnumFixedPoint'
      }
    }
  },
  /**
   * Lookup648: qa_tools::pallet_tools::mcbc::BaseSupply<sp_core::crypto::AccountId32>
   **/
  QaToolsPalletToolsMcbcBaseSupply: {
    assetCollector: 'AccountId32',
    target: 'u128'
  },
  /**
   * Lookup650: qa_tools::pallet_tools::mcbc::OtherCollateralInput<common::primitives::AssetId32<common::primitives::_allowed_deprecated::PredefinedAssetId>>
   **/
  QaToolsPalletToolsMcbcOtherCollateralInput: {
    asset: 'CommonPrimitivesAssetId32',
    parameters: 'QaToolsPalletToolsMcbcCollateralCommonParameters'
  },
  /**
   * Lookup651: qa_tools::pallet_tools::mcbc::CollateralCommonParameters
   **/
  QaToolsPalletToolsMcbcCollateralCommonParameters: {
    refPrices: 'Option<QaToolsPalletToolsPriceToolsAssetPrices>',
    reserves: 'Option<u128>'
  },
  /**
   * Lookup654: qa_tools::pallet_tools::mcbc::TbcdCollateralInput
   **/
  QaToolsPalletToolsMcbcTbcdCollateralInput: {
    parameters: 'QaToolsPalletToolsMcbcCollateralCommonParameters',
    refXorPrices: 'Option<QaToolsPalletToolsPriceToolsAssetPrices>'
  },
  /**
   * Lookup655: qa_tools::pallet::InputAssetId<common::primitives::AssetId32<common::primitives::_allowed_deprecated::PredefinedAssetId>>
   **/
  QaToolsInputAssetId: {
    _enum: {
      McbcReference: 'Null',
      XstReference: 'Null',
      Other: 'CommonPrimitivesAssetId32'
    }
  },
  /**
   * Lookup656: apollo_platform::pallet::Call<T>
   **/
  ApolloPlatformCall: {
    _enum: {
      add_pool: {
        assetId: 'CommonPrimitivesAssetId32',
        loanToValue: 'u128',
        liquidationThreshold: 'u128',
        optimalUtilizationRate: 'u128',
        baseRate: 'u128',
        slopeRate1: 'u128',
        slopeRate2: 'u128',
        reserveFactor: 'u128',
      },
      lend: {
        lendingAsset: 'CommonPrimitivesAssetId32',
        lendingAmount: 'u128',
      },
      borrow: {
        collateralAsset: 'CommonPrimitivesAssetId32',
        borrowingAsset: 'CommonPrimitivesAssetId32',
        borrowingAmount: 'u128',
        loanToValue: 'u128',
      },
      get_rewards: {
        assetId: 'CommonPrimitivesAssetId32',
        isLending: 'bool',
      },
      withdraw: {
        withdrawnAsset: 'CommonPrimitivesAssetId32',
        withdrawnAmount: 'u128',
      },
      repay: {
        collateralAsset: 'CommonPrimitivesAssetId32',
        borrowingAsset: 'CommonPrimitivesAssetId32',
        amountToRepay: 'u128',
      },
      change_rewards_amount: {
        isLending: 'bool',
        amount: 'u128',
      },
      change_rewards_per_block: {
        isLending: 'bool',
        amount: 'u128',
      },
      liquidate: {
        user: 'AccountId32',
        assetId: 'CommonPrimitivesAssetId32',
      },
      remove_pool: {
        assetIdToRemove: 'CommonPrimitivesAssetId32',
      },
      edit_pool_info: {
        assetId: 'CommonPrimitivesAssetId32',
        newLoanToValue: 'u128',
        newLiquidationThreshold: 'u128',
        newOptimalUtilizationRate: 'u128',
        newBaseRate: 'u128',
        newSlopeRate1: 'u128',
        newSlopeRate2: 'u128',
        newReserveFactor: 'u128',
      },
      add_collateral: {
        collateralAsset: 'CommonPrimitivesAssetId32',
        collateralAmount: 'u128',
        borrowingAsset: 'CommonPrimitivesAssetId32'
      }
    }
  },
  /**
   * Lookup657: extended_assets::pallet::Call<T>
   **/
  ExtendedAssetsCall: {
    _enum: {
      regulate_asset: {
        assetId: 'CommonPrimitivesAssetId32',
      },
      issue_sbt: {
        symbol: 'Bytes',
        name: 'Bytes',
        description: 'Option<Bytes>',
        image: 'Option<Bytes>',
        externalUrl: 'Option<Bytes>',
      },
      set_sbt_expiration: {
        accountId: 'AccountId32',
        sbtAssetId: 'CommonPrimitivesAssetId32',
        newExpiresAt: 'Option<u64>',
      },
      bind_regulated_asset_to_sbt: {
        sbtAssetId: 'CommonPrimitivesAssetId32',
        regulatedAssetId: 'CommonPrimitivesAssetId32'
      }
    }
  },
  /**
   * Lookup659: pallet_multisig::pallet::Error<T>
   **/
  PalletMultisigError: {
    _enum: ['MinimumThreshold', 'AlreadyApproved', 'NoApprovalsNeeded', 'TooFewSignatories', 'TooManySignatories', 'SignatoriesOutOfOrder', 'SenderNotInSignatories', 'NotInSignatories', 'AlreadyInSignatories', 'NotFound', 'NotOwner', 'NoTimepoint', 'WrongTimepoint', 'UnexpectedTimepoint', 'AlreadyStored', 'WeightTooLow', 'ZeroThreshold', 'MultisigAlreadyExists', 'UnknownMultisigAccount', 'SignatoriesAreNotUniqueOrUnordered', 'AlreadyDispatched']
  },
  /**
   * Lookup660: pallet_utility::pallet::Error<T>
   **/
  PalletUtilityError: {
    _enum: ['TooManyCalls']
  },
  /**
   * Lookup661: pallet_staking::sora::DurationWrapper
   **/
  PalletStakingSoraDurationWrapper: {
    secs: 'u64',
    nanos: 'u32'
  },
  /**
   * Lookup662: pallet_staking::StakingLedger<T>
   **/
  PalletStakingStakingLedger: {
    stash: 'AccountId32',
    total: 'Compact<u128>',
    active: 'Compact<u128>',
    unlocking: 'Vec<PalletStakingUnlockChunk>',
    claimedRewards: 'Vec<u32>'
  },
  /**
   * Lookup664: pallet_staking::UnlockChunk<Balance>
   **/
  PalletStakingUnlockChunk: {
    value: 'Compact<u128>',
    era: 'Compact<u32>'
  },
  /**
   * Lookup667: pallet_staking::Nominations<T>
   **/
  PalletStakingNominations: {
    targets: 'Vec<AccountId32>',
    submittedIn: 'u32',
    suppressed: 'bool'
  },
  /**
   * Lookup669: pallet_staking::ActiveEraInfo
   **/
  PalletStakingActiveEraInfo: {
    index: 'u32',
    start: 'Option<u64>'
  },
  /**
   * Lookup671: pallet_staking::EraRewardPoints<sp_core::crypto::AccountId32>
   **/
  PalletStakingEraRewardPoints: {
    total: 'u32',
    individual: 'BTreeMap<AccountId32, u32>'
  },
  /**
   * Lookup676: pallet_staking::UnappliedSlash<sp_core::crypto::AccountId32, Balance>
   **/
  PalletStakingUnappliedSlash: {
    validator: 'AccountId32',
    own: 'u128',
    others: 'Vec<(AccountId32,u128)>',
    reporters: 'Vec<AccountId32>',
    payout: 'u128'
  },
  /**
   * Lookup678: pallet_staking::slashing::SlashingSpans
   **/
  PalletStakingSlashingSlashingSpans: {
    spanIndex: 'u32',
    lastStart: 'u32',
    lastNonzeroSlash: 'u32',
    prior: 'Vec<u32>'
  },
  /**
   * Lookup679: pallet_staking::slashing::SpanRecord<Balance>
   **/
  PalletStakingSlashingSpanRecord: {
    slashed: 'u128',
    paidOut: 'u128'
  },
  /**
   * Lookup682: pallet_staking::pallet::pallet::Error<T>
   **/
  PalletStakingPalletError: {
    _enum: ['NotController', 'NotStash', 'AlreadyBonded', 'AlreadyPaired', 'EmptyTargets', 'DuplicateIndex', 'InvalidSlashIndex', 'InsufficientBond', 'NoMoreChunks', 'NoUnlockChunk', 'FundedTarget', 'InvalidEraToReward', 'InvalidNumberOfNominations', 'NotSortedAndUnique', 'AlreadyClaimed', 'IncorrectHistoryDepth', 'IncorrectSlashingSpans', 'BadState', 'TooManyTargets', 'BadTarget', 'CannotChillOther', 'TooManyNominators', 'TooManyValidators', 'CommissionTooLow', 'BoundNotMet']
  },
  /**
   * Lookup683: sp_staking::offence::OffenceDetails<sp_core::crypto::AccountId32, Offender>
   **/
  SpStakingOffenceOffenceDetails: {
    offender: '(AccountId32,PalletStakingExposure)',
    reporters: 'Vec<AccountId32>'
  },
  /**
   * Lookup688: sp_core::crypto::KeyTypeId
   **/
  SpCoreCryptoKeyTypeId: '[u8;4]',
  /**
   * Lookup689: pallet_session::pallet::Error<T>
   **/
  PalletSessionError: {
    _enum: ['InvalidProof', 'NoAssociatedValidatorId', 'DuplicatedKey', 'NoKeys', 'NoAccount']
  },
  /**
   * Lookup690: pallet_grandpa::StoredState<N>
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
   * Lookup691: pallet_grandpa::StoredPendingChange<N, Limit>
   **/
  PalletGrandpaStoredPendingChange: {
    scheduledAt: 'u32',
    delay: 'u32',
    nextAuthorities: 'Vec<(SpFinalityGrandpaAppPublic,u64)>',
    forced: 'Option<u32>'
  },
  /**
   * Lookup693: pallet_grandpa::pallet::Error<T>
   **/
  PalletGrandpaError: {
    _enum: ['PauseFailed', 'ResumeFailed', 'ChangePending', 'TooSoon', 'InvalidKeyOwnershipProof', 'InvalidEquivocationProof', 'DuplicateOffenceReport']
  },
  /**
   * Lookup697: pallet_im_online::BoundedOpaqueNetworkState<PeerIdEncodingLimit, MultiAddrEncodingLimit, AddressesLimit>
   **/
  PalletImOnlineBoundedOpaqueNetworkState: {
    peerId: 'Bytes',
    externalAddresses: 'Vec<Bytes>'
  },
  /**
   * Lookup701: pallet_im_online::pallet::Error<T>
   **/
  PalletImOnlineError: {
    _enum: ['InvalidKey', 'DuplicatedHeartbeat']
  },
  /**
   * Lookup704: orml_tokens::BalanceLock<Balance>
   **/
  OrmlTokensBalanceLock: {
    id: '[u8;8]',
    amount: 'u128'
  },
  /**
   * Lookup706: orml_tokens::AccountData<Balance>
   **/
  OrmlTokensAccountData: {
    free: 'u128',
    reserved: 'u128',
    frozen: 'u128'
  },
  /**
   * Lookup708: orml_tokens::ReserveData<ReserveIdentifier, Balance>
   **/
  OrmlTokensReserveData: {
    id: 'Null',
    amount: 'u128'
  },
  /**
   * Lookup710: orml_tokens::module::Error<T>
   **/
  OrmlTokensModuleError: {
    _enum: ['BalanceTooLow', 'AmountIntoBalanceFailed', 'LiquidityRestrictions', 'MaxLocksExceeded', 'KeepAlive', 'ExistentialDeposit', 'DeadAccount', 'TooManyReserves']
  },
  /**
   * Lookup711: orml_currencies::module::Error<T>
   **/
  OrmlCurrenciesModuleError: {
    _enum: ['AmountIntoBalanceFailed', 'BalanceTooLow', 'DepositFailed']
  },
  /**
   * Lookup714: trading_pair::pallet::Error<T>
   **/
  TradingPairError: {
    _enum: ['TradingPairExists', 'ForbiddenBaseAssetId', 'IdenticalAssetIds', 'TradingPairDoesntExist']
  },
  /**
   * Lookup715: common::primitives::AssetInfo
   **/
  CommonPrimitivesAssetInfo: {
    symbol: 'Bytes',
    name: 'Bytes',
    precision: 'u8',
    isMintable: 'bool',
    assetType: 'CommonPrimitivesAssetType',
    contentSource: 'Option<Bytes>',
    description: 'Option<Bytes>'
  },
  /**
   * Lookup716: common::primitives::AssetType
   **/
  CommonPrimitivesAssetType: {
    _enum: ['Regular', 'NFT', 'Soulbound', 'Regulated']
  },
  /**
   * Lookup717: assets::AssetRecord<T>
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
   * Lookup718: assets::AssetRecordArg<T>
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
   * Lookup720: common::primitives::AssetIdExtraAssetRecordArg<DEXId, common::primitives::LiquiditySourceType, AccountId>
   **/
  CommonPrimitivesAssetIdExtraAssetRecordArg: {
    _enum: {
      DEXId: 'u32',
      LstId: 'CommonPrimitivesLiquiditySourceType',
      AccountId: '[u8;32]'
    }
  },
  /**
   * Lookup721: assets::pallet::Error<T>
   **/
  AssetsError: {
    _enum: ['AssetIdAlreadyExists', 'AssetIdNotExists', 'InsufficientBalance', 'InvalidAssetSymbol', 'InvalidAssetName', 'InvalidPrecision', 'AssetSupplyIsNotMintable', 'InvalidAssetOwner', 'IncRefError', 'InvalidContentSource', 'InvalidDescription', 'DeadAsset', 'Overflow']
  },
  /**
   * Lookup722: common::primitives::DEXInfo<common::primitives::AssetId32<common::primitives::_allowed_deprecated::PredefinedAssetId>>
   **/
  CommonPrimitivesDexInfo: {
    baseAssetId: 'CommonPrimitivesAssetId32',
    syntheticBaseAssetId: 'CommonPrimitivesAssetId32',
    isPublic: 'bool'
  },
  /**
   * Lookup723: dex_manager::pallet::Error<T>
   **/
  DexManagerError: {
    _enum: ['DEXIdAlreadyExists', 'DEXDoesNotExist', 'InvalidFeeValue', 'InvalidAccountId']
  },
  /**
   * Lookup724: multicollateral_bonding_curve_pool::DistributionAccounts<multicollateral_bonding_curve_pool::DistributionAccountData<multicollateral_bonding_curve_pool::DistributionAccount<sp_core::crypto::AccountId32, common::primitives::TechAccountId<sp_core::crypto::AccountId32, common::primitives::TechAssetId<common::primitives::_allowed_deprecated::PredefinedAssetId>, DEXId>>>>
   **/
  MulticollateralBondingCurvePoolDistributionAccounts: {
    xorAllocation: 'MulticollateralBondingCurvePoolDistributionAccountData',
    valHolders: 'MulticollateralBondingCurvePoolDistributionAccountData',
    soraCitizens: 'MulticollateralBondingCurvePoolDistributionAccountData',
    storesAndShops: 'MulticollateralBondingCurvePoolDistributionAccountData',
    projects: 'MulticollateralBondingCurvePoolDistributionAccountData'
  },
  /**
   * Lookup725: multicollateral_bonding_curve_pool::DistributionAccountData<multicollateral_bonding_curve_pool::DistributionAccount<sp_core::crypto::AccountId32, common::primitives::TechAccountId<sp_core::crypto::AccountId32, common::primitives::TechAssetId<common::primitives::_allowed_deprecated::PredefinedAssetId>, DEXId>>>
   **/
  MulticollateralBondingCurvePoolDistributionAccountData: {
    account: 'MulticollateralBondingCurvePoolDistributionAccount',
    coefficient: 'FixnumFixedPoint'
  },
  /**
   * Lookup726: multicollateral_bonding_curve_pool::DistributionAccount<sp_core::crypto::AccountId32, common::primitives::TechAccountId<sp_core::crypto::AccountId32, common::primitives::TechAssetId<common::primitives::_allowed_deprecated::PredefinedAssetId>, DEXId>>
   **/
  MulticollateralBondingCurvePoolDistributionAccount: {
    _enum: {
      Account: 'AccountId32',
      TechAccount: 'CommonPrimitivesTechAccountId'
    }
  },
  /**
   * Lookup729: multicollateral_bonding_curve_pool::pallet::Error<T>
   **/
  MulticollateralBondingCurvePoolError: {
    _enum: ['PriceCalculationFailed', 'FailedToCalculatePriceWithoutImpact', 'CannotExchangeWithSelf', 'NotEnoughReserves', 'PoolAlreadyInitializedForPair', 'PoolNotInitialized', 'SlippageLimitExceeded', 'NothingToClaim', 'RewardsSupplyShortage', 'UnsupportedCollateralAssetId', 'FeeCalculationFailed', 'CantExchange', 'IncRefError', 'ArithmeticError', 'FreeReservesAccountNotSet']
  },
  /**
   * Lookup730: technical::pallet::Error<T>
   **/
  TechnicalError: {
    _enum: ['StorageOverflow', 'InsufficientBalance', 'AlreadyExist', 'InvalidProof', 'SourceMismatch', 'AlreadyClaimed', 'ClaimActionMismatch', 'DurationNotPassed', 'OnlyRegularAsset', 'OnlyRegularAccount', 'OnlyRegularBalance', 'OnlyPureTechnicalAccount', 'Overflow', 'TechAccountIdMustBePure', 'UnableToGetReprFromTechAccountId', 'RepresentativeMustBeSupported', 'TechAccountIdIsNotRegistered', 'NotImplemented', 'DecodeAccountIdFailed', 'AssociatedAccountIdNotFound', 'OperationWithAbstractCheckingIsImposible']
  },
  /**
   * Lookup733: pool_xyk::pallet::Error<T>
   **/
  PoolXykError: {
    _enum: ['UnableToCalculateFee', 'FailedToCalculatePriceWithoutImpact', 'UnableToGetBalance', 'ImpossibleToDecideAssetPairAmounts', 'PoolPairRatioAndPairSwapRatioIsDifferent', 'PairSwapActionFeeIsSmallerThanRecommended', 'SourceBalanceIsNotLargeEnough', 'TargetBalanceIsNotLargeEnough', 'UnableToDeriveFeeAccount', 'FeeAccountIsInvalid', 'SourceAndClientAccountDoNotMatchAsEqual', 'AssetsMustNotBeSame', 'ImpossibleToDecideDepositLiquidityAmounts', 'InvalidDepositLiquidityBasicAssetAmount', 'InvalidDepositLiquidityTargetAssetAmount', 'PairSwapActionMinimumLiquidityIsSmallerThanRecommended', 'DestinationAmountOfLiquidityIsNotLargeEnough', 'SourceBaseAmountIsNotLargeEnough', 'TargetBaseAmountIsNotLargeEnough', 'PoolIsInvalid', 'PoolIsEmpty', 'ZeroValueInAmountParameter', 'AccountBalanceIsInvalid', 'InvalidDepositLiquidityDestinationAmount', 'InitialLiqudityDepositRatioMustBeDefined', 'TechAssetIsNotRepresentable', 'UnableToDecideMarkerAsset', 'UnableToGetAssetRepr', 'ImpossibleToDecideWithdrawLiquidityAmounts', 'InvalidWithdrawLiquidityBasicAssetAmount', 'InvalidWithdrawLiquidityTargetAssetAmount', 'SourceBaseAmountIsTooLarge', 'SourceBalanceOfLiquidityTokensIsNotLargeEnough', 'DestinationBaseBalanceIsNotLargeEnough', 'DestinationTargetBalanceIsNotLargeEnough', 'InvalidAssetForLiquidityMarking', 'AssetDecodingError', 'CalculatedValueIsOutOfDesiredBounds', 'BaseAssetIsNotMatchedWithAnyAssetArguments', 'DestinationAmountMustBeSame', 'SourceAmountMustBeSame', 'PoolInitializationIsInvalid', 'PoolIsAlreadyInitialized', 'InvalidMinimumBoundValueOfBalance', 'ImpossibleToDecideValidPairValuesFromRangeForThisPool', 'RangeValuesIsInvalid', 'CalculatedValueIsNotMeetsRequiredBoundaries', 'GettingFeeFromDestinationIsImpossible', 'FixedWrapperCalculationFailed', 'ThisCaseIsNotSupported', 'PoolBecameInvalidAfterOperation', 'UnableToConvertAssetToTechAssetId', 'UnableToGetXORPartFromMarkerAsset', 'PoolTokenSupplyOverflow', 'IncRefError', 'UnableToDepositXorLessThanMinimum', 'UnsupportedQuotePath', 'NotEnoughUnlockedLiquidity', 'UnableToCreatePoolWithIndivisibleAssets', 'UnableToOperateWithIndivisibleAssets', 'NotEnoughLiquidityOutOfFarming', 'TargetAssetIsRestricted', 'RestrictedChameleonPool', 'NotEnoughOutputReserves']
  },
  /**
   * Lookup735: liquidity_proxy::pallet::Error<T>
   **/
  LiquidityProxyError: {
    _enum: ['UnavailableExchangePath', 'MaxFeeExceeded', 'InvalidFeeValue', 'InsufficientLiquidity', 'AggregationError', 'CalculationError', 'SlippageNotTolerated', 'ForbiddenFilter', 'FailedToCalculatePriceWithoutImpact', 'UnableToSwapIndivisibleAssets', 'UnableToEnableLiquiditySource', 'LiquiditySourceAlreadyEnabled', 'UnableToDisableLiquiditySource', 'LiquiditySourceAlreadyDisabled', 'InvalidReceiversInfo', 'FailedToTransferAdarCommission', 'InvalidADARCommissionRatio', 'InsufficientBalance', 'TheSameSenderAndReceiver', 'BadLiquidity']
  },
  /**
   * Lookup737: pallet_collective::Votes<sp_core::crypto::AccountId32, BlockNumber>
   **/
  PalletCollectiveVotes: {
    index: 'u32',
    threshold: 'u32',
    ayes: 'Vec<AccountId32>',
    nays: 'Vec<AccountId32>',
    end: 'u32'
  },
  /**
   * Lookup738: pallet_collective::pallet::Error<T, I>
   **/
  PalletCollectiveError: {
    _enum: ['NotMember', 'DuplicateProposal', 'ProposalMissing', 'WrongIndex', 'DuplicateVote', 'AlreadyInitialized', 'TooEarly', 'TooManyProposals', 'WrongProposalWeight', 'WrongProposalLength']
  },
  /**
   * Lookup746: pallet_democracy::types::ReferendumInfo<BlockNumber, frame_support::traits::preimages::Bounded<framenode_runtime::RuntimeCall>, Balance>
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
   * Lookup747: pallet_democracy::types::ReferendumStatus<BlockNumber, frame_support::traits::preimages::Bounded<framenode_runtime::RuntimeCall>, Balance>
   **/
  PalletDemocracyReferendumStatus: {
    end: 'u32',
    proposal: 'FrameSupportPreimagesBounded',
    threshold: 'PalletDemocracyVoteThreshold',
    delay: 'u32',
    tally: 'PalletDemocracyTally'
  },
  /**
   * Lookup748: pallet_democracy::types::Tally<Balance>
   **/
  PalletDemocracyTally: {
    ayes: 'u128',
    nays: 'u128',
    turnout: 'u128'
  },
  /**
   * Lookup749: pallet_democracy::vote::Voting<Balance, sp_core::crypto::AccountId32, BlockNumber, MaxVotes>
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
   * Lookup753: pallet_democracy::types::Delegations<Balance>
   **/
  PalletDemocracyDelegations: {
    votes: 'u128',
    capital: 'u128'
  },
  /**
   * Lookup754: pallet_democracy::vote::PriorLock<BlockNumber, Balance>
   **/
  PalletDemocracyVotePriorLock: '(u32,u128)',
  /**
   * Lookup758: pallet_democracy::pallet::Error<T>
   **/
  PalletDemocracyError: {
    _enum: ['ValueLow', 'ProposalMissing', 'AlreadyCanceled', 'DuplicateProposal', 'ProposalBlacklisted', 'NotSimpleMajority', 'InvalidHash', 'NoProposal', 'AlreadyVetoed', 'ReferendumInvalid', 'NoneWaiting', 'NotVoter', 'NoPermission', 'AlreadyDelegating', 'InsufficientFunds', 'NotDelegating', 'VotesExist', 'InstantNotAllowed', 'Nonsense', 'WrongUpperBound', 'MaxVotesReached', 'TooMany', 'VotingPeriodLow']
  },
  /**
   * Lookup759: dex_api::pallet::Error<T>
   **/
  DexApiError: {
    _enum: ['LiquiditySourceAlreadyEnabled', 'LiquiditySourceAlreadyDisabled']
  },
  /**
   * Lookup760: eth_bridge::requests::OffchainRequest<T>
   **/
  EthBridgeRequestsOffchainRequest: {
    _enum: {
      Outgoing: '(EthBridgeRequestsOutgoingRequest,H256)',
      LoadIncoming: 'EthBridgeRequestsLoadIncomingRequest',
      Incoming: '(EthBridgeRequestsIncomingRequest,H256)'
    }
  },
  /**
   * Lookup761: eth_bridge::requests::RequestStatus
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
   * Lookup768: eth_bridge::requests::outgoing::EthPeersSync
   **/
  EthBridgeRequestsOutgoingEthPeersSync: {
    isBridgeReady: 'bool',
    isXorReady: 'bool',
    isValReady: 'bool'
  },
  /**
   * Lookup769: eth_bridge::BridgeStatus
   **/
  EthBridgeBridgeStatus: {
    _enum: ['Initialized', 'Migrating']
  },
  /**
   * Lookup770: eth_bridge::pallet::Error<T>
   **/
  EthBridgeError: {
    _enum: ['HttpFetchingError', 'AccountNotFound', 'Forbidden', 'RequestIsAlreadyRegistered', 'FailedToLoadTransaction', 'FailedToLoadPrecision', 'UnknownMethodId', 'InvalidFunctionInput', 'InvalidSignature', 'InvalidUint', 'InvalidAmount', 'InvalidBalance', 'InvalidString', 'InvalidByte', 'InvalidAddress', 'InvalidAssetId', 'InvalidAccountId', 'InvalidBool', 'InvalidH256', 'InvalidArray', 'UnknownEvent', 'UnknownTokenAddress', 'NoLocalAccountForSigning', 'UnsupportedAssetId', 'FailedToSignMessage', 'FailedToSendSignedTransaction', 'TokenIsNotOwnedByTheAuthor', 'TokenIsAlreadyAdded', 'DuplicatedRequest', 'UnsupportedToken', 'UnknownPeerAddress', 'EthAbiEncodingError', 'EthAbiDecodingError', 'EthTransactionIsFailed', 'EthTransactionIsSucceeded', 'EthTransactionIsPending', 'EthLogWasRemoved', 'NoPendingPeer', 'WrongPendingPeer', 'TooManyPendingPeers', 'FailedToGetAssetById', 'CantAddMorePeers', 'CantRemoveMorePeers', 'PeerIsAlreadyAdded', 'UnknownPeerId', 'CantReserveFunds', 'AlreadyClaimed', 'FailedToLoadBlockHeader', 'FailedToLoadFinalizedHead', 'UnknownContractAddress', 'InvalidContractInput', 'RequestIsNotOwnedByTheAuthor', 'FailedToParseTxHashInCall', 'RequestIsNotReady', 'UnknownRequest', 'RequestNotFinalizedOnSidechain', 'UnknownNetwork', 'ContractIsInMigrationStage', 'ContractIsNotInMigrationStage', 'ContractIsAlreadyInMigrationStage', 'Unavailable', 'FailedToUnreserve', 'SidechainAssetIsAlreadyRegistered', 'ExpectedOutgoingRequest', 'ExpectedIncomingRequest', 'UnknownAssetId', 'JsonSerializationError', 'JsonDeserializationError', 'FailedToLoadSidechainNodeParams', 'FailedToLoadCurrentSidechainHeight', 'FailedToLoadIsUsed', 'TransactionMightHaveFailedDueToGasLimit', 'ExpectedXORTransfer', 'UnableToPayFees', 'Cancelled', 'UnsupportedAssetPrecision', 'NonZeroDust', 'IncRefError', 'Other', 'ExpectedPendingRequest', 'ExpectedEthNetwork', 'RemovedAndRefunded', 'AuthorityAccountNotSet', 'NotEnoughPeers', 'ReadStorageError', 'UnsafeMigration']
  },
  /**
   * Lookup773: pswap_distribution::pallet::Error<T>
   **/
  PswapDistributionError: {
    _enum: ['CalculationError', 'SubscriptionActive', 'UnknownSubscription', 'InvalidFrequency', 'ZeroClaimableIncentives', 'IncRefError']
  },
  /**
   * Lookup779: pallet_scheduler::Scheduled<Name, frame_support::traits::preimages::Bounded<framenode_runtime::RuntimeCall>, BlockNumber, framenode_runtime::OriginCaller, sp_core::crypto::AccountId32>
   **/
  PalletSchedulerScheduled: {
    maybeId: 'Option<[u8;32]>',
    priority: 'u8',
    call: 'FrameSupportPreimagesBounded',
    maybePeriodic: 'Option<(u32,u32)>',
    origin: 'FramenodeRuntimeOriginCaller'
  },
  /**
   * Lookup781: pallet_scheduler::pallet::Error<T>
   **/
  PalletSchedulerError: {
    _enum: ['FailedToSchedule', 'NotFound', 'TargetBlockNumberInPast', 'RescheduleNoChange', 'Named']
  },
  /**
   * Lookup784: iroha_migration::PendingMultisigAccount<T>
   **/
  IrohaMigrationPendingMultisigAccount: {
    approvingAccounts: 'Vec<AccountId32>',
    migrateAt: 'Option<u32>'
  },
  /**
   * Lookup785: iroha_migration::pallet::Error<T>
   **/
  IrohaMigrationError: {
    _enum: ['PublicKeyParsingFailed', 'SignatureParsingFailed', 'SignatureVerificationFailed', 'AccountNotFound', 'PublicKeyNotFound', 'PublicKeyAlreadyUsed', 'AccountAlreadyMigrated', 'ReferralMigrationFailed', 'MultiSigCreationFailed', 'SignatoryAdditionFailed']
  },
  /**
   * Lookup787: pallet_membership::pallet::Error<T, I>
   **/
  PalletMembershipError: {
    _enum: ['AlreadyMember', 'NotMember', 'TooManyMembers']
  },
  /**
   * Lookup789: pallet_elections_phragmen::SeatHolder<sp_core::crypto::AccountId32, Balance>
   **/
  PalletElectionsPhragmenSeatHolder: {
    who: 'AccountId32',
    stake: 'u128',
    deposit: 'u128'
  },
  /**
   * Lookup790: pallet_elections_phragmen::Voter<sp_core::crypto::AccountId32, Balance>
   **/
  PalletElectionsPhragmenVoter: {
    votes: 'Vec<AccountId32>',
    stake: 'u128',
    deposit: 'u128'
  },
  /**
   * Lookup791: pallet_elections_phragmen::pallet::Error<T>
   **/
  PalletElectionsPhragmenError: {
    _enum: ['UnableToVote', 'NoVotes', 'TooManyVotes', 'MaximumVotesExceeded', 'LowBalance', 'UnableToPayBond', 'MustBeVoter', 'DuplicatedCandidate', 'TooManyCandidates', 'MemberSubmit', 'RunnerUpSubmit', 'InsufficientCandidateFunds', 'NotMember', 'InvalidWitnessData', 'InvalidVoteCount', 'InvalidRenouncing', 'InvalidReplacement']
  },
  /**
   * Lookup792: vested_rewards::RewardInfo
   **/
  VestedRewardsRewardInfo: {
    limit: 'u128',
    totalAvailable: 'u128',
    rewards: 'BTreeMap<CommonPrimitivesRewardReason, u128>'
  },
  /**
   * Lookup793: vested_rewards::CrowdloanInfo<common::primitives::AssetId32<common::primitives::_allowed_deprecated::PredefinedAssetId>, BlockNumber, sp_core::crypto::AccountId32>
   **/
  VestedRewardsCrowdloanInfo: {
    totalContribution: 'u128',
    rewards: 'Vec<(CommonPrimitivesAssetId32,u128)>',
    startBlock: 'u32',
    length: 'u32',
    account: 'AccountId32'
  },
  /**
   * Lookup795: vested_rewards::CrowdloanUserInfo<common::primitives::AssetId32<common::primitives::_allowed_deprecated::PredefinedAssetId>>
   **/
  VestedRewardsCrowdloanUserInfo: {
    contribution: 'u128',
    rewarded: 'Vec<(CommonPrimitivesAssetId32,u128)>'
  },
  /**
   * Lookup796: vested_rewards::pallet::Error<T>
   **/
  VestedRewardsError: {
    _enum: ['NothingToClaim', 'ClaimLimitExceeded', 'UnhandledRewardType', 'RewardsSupplyShortage', 'IncRefError', 'CantSubtractSnapshot', 'CantCalculateReward', 'NoRewardsForAsset', 'ArithmeticError', 'NumberConversionError', 'UnableToGetBaseAssetPrice', 'CrowdloanAlreadyExists', 'WrongCrowdloanInfo', 'CrowdloanRewardsDistributionNotStarted', 'CrowdloanDoesNotExists', 'NotCrowdloanParticipant']
  },
  /**
   * Lookup797: pallet_identity::types::Registration<Balance, MaxJudgements, MaxAdditionalFields>
   **/
  PalletIdentityRegistration: {
    judgements: 'Vec<(u32,PalletIdentityJudgement)>',
    deposit: 'u128',
    info: 'PalletIdentityIdentityInfo'
  },
  /**
   * Lookup805: pallet_identity::types::RegistrarInfo<Balance, sp_core::crypto::AccountId32>
   **/
  PalletIdentityRegistrarInfo: {
    account: 'AccountId32',
    fee: 'u128',
    fields: 'PalletIdentityBitFlags'
  },
  /**
   * Lookup807: pallet_identity::pallet::Error<T>
   **/
  PalletIdentityError: {
    _enum: ['TooManySubAccounts', 'NotFound', 'NotNamed', 'EmptyIndex', 'FeeChanged', 'NoIdentity', 'StickyJudgement', 'JudgementGiven', 'InvalidJudgement', 'InvalidIndex', 'InvalidTarget', 'TooManyFields', 'TooManyRegistrars', 'AlreadyClaimed', 'NotSub', 'NotOwned', 'JudgementForDifferentIdentity', 'JudgementPaymentFailed']
  },
  /**
   * Lookup809: farming::PoolFarmer<T>
   **/
  FarmingPoolFarmer: {
    account: 'AccountId32',
    block: 'u32',
    weight: 'u128'
  },
  /**
   * Lookup810: farming::pallet::Error<T>
   **/
  FarmingError: {
    _enum: ['IncRefError']
  },
  /**
   * Lookup811: xst::SyntheticInfo<common::primitives::SymbolName>
   **/
  XstSyntheticInfo: {
    referenceSymbol: 'Bytes',
    feeRatio: 'FixnumFixedPoint'
  },
  /**
   * Lookup812: xst::pallet::Error<T>
   **/
  XstError: {
    _enum: ['PriceCalculationFailed', 'SlippageLimitExceeded', 'CantExchange', 'SyntheticDoesNotExist', 'SymbolDoesNotExist', 'SymbolAlreadyReferencedToSynthetic', 'SyntheticIsNotEnabled', 'OracleQuoteError', 'InvalidFeeRatio', 'IndivisibleReferenceAsset', 'CantEnableIndivisibleAsset', 'SyntheticBaseBuySellLimitExceeded']
  },
  /**
   * Lookup813: price_tools::AggregatedPriceInfo
   **/
  PriceToolsAggregatedPriceInfo: {
    buy: 'PriceToolsPriceInfo',
    sell: 'PriceToolsPriceInfo'
  },
  /**
   * Lookup814: price_tools::PriceInfo
   **/
  PriceToolsPriceInfo: {
    priceFailures: 'u32',
    spotPrices: 'Vec<u128>',
    averagePrice: 'u128',
    needsUpdate: 'bool',
    lastSpotPrice: 'u128'
  },
  /**
   * Lookup815: price_tools::pallet::Error<T>
   **/
  PriceToolsError: {
    _enum: ['AveragePriceCalculationFailed', 'UpdateAverageWithSpotPriceFailed', 'InsufficientSpotPriceData', 'UnsupportedQuotePath', 'FailedToQuoteAveragePrice', 'AssetAlreadyRegistered', 'CantDuplicateLastPrice']
  },
  /**
   * Lookup816: ceres_staking::StakingInfo
   **/
  CeresStakingStakingInfo: {
    deposited: 'u128',
    rewards: 'u128'
  },
  /**
   * Lookup817: ceres_staking::pallet::Error<T>
   **/
  CeresStakingError: {
    _enum: ['StakingPoolIsFull', 'Unauthorized']
  },
  /**
   * Lookup818: ceres_liquidity_locker::StorageVersion
   **/
  CeresLiquidityLockerStorageVersion: {
    _enum: ['V1', 'V2']
  },
  /**
   * Lookup820: ceres_liquidity_locker::LockInfo<Balance, Moment, common::primitives::AssetId32<common::primitives::_allowed_deprecated::PredefinedAssetId>>
   **/
  CeresLiquidityLockerLockInfo: {
    poolTokens: 'u128',
    unlockingTimestamp: 'u64',
    assetA: 'CommonPrimitivesAssetId32',
    assetB: 'CommonPrimitivesAssetId32'
  },
  /**
   * Lookup821: ceres_liquidity_locker::pallet::Error<T>
   **/
  CeresLiquidityLockerError: {
    _enum: ['PoolDoesNotExist', 'InsufficientLiquidityToLock', 'InvalidPercentage', 'Unauthorized', 'InvalidUnlockingTimestamp']
  },
  /**
   * Lookup822: ceres_token_locker::StorageVersion
   **/
  CeresTokenLockerStorageVersion: {
    _enum: ['V1', 'V2']
  },
  /**
   * Lookup824: ceres_token_locker::TokenLockInfo<Balance, Moment, common::primitives::AssetId32<common::primitives::_allowed_deprecated::PredefinedAssetId>>
   **/
  CeresTokenLockerTokenLockInfo: {
    tokens: 'u128',
    unlockingTimestamp: 'u64',
    assetId: 'CommonPrimitivesAssetId32'
  },
  /**
   * Lookup825: ceres_token_locker::pallet::Error<T>
   **/
  CeresTokenLockerError: {
    _enum: ['InvalidNumberOfTokens', 'Unauthorized', 'InvalidUnlockingTimestamp', 'NotEnoughFunds', 'NotUnlockedYet', 'LockInfoDoesNotExist']
  },
  /**
   * Lookup827: ceres_governance_platform::VotingInfo
   **/
  CeresGovernancePlatformVotingInfo: {
    votingOption: 'u32',
    numberOfVotes: 'u128',
    assetWithdrawn: 'bool'
  },
  /**
   * Lookup828: ceres_governance_platform::PollInfo<common::primitives::AssetId32<common::primitives::_allowed_deprecated::PredefinedAssetId>, Moment, StringLimit, OptionsLimit, TitleLimit, DescriptionLimit>
   **/
  CeresGovernancePlatformPollInfo: {
    pollAsset: 'CommonPrimitivesAssetId32',
    pollStartTimestamp: 'u64',
    pollEndTimestamp: 'u64',
    title: 'Bytes',
    description: 'Bytes',
    options: 'Vec<Bytes>'
  },
  /**
   * Lookup829: ceres_governance_platform::StorageVersion
   **/
  CeresGovernancePlatformStorageVersion: {
    _enum: ['V1', 'V2', 'V3']
  },
  /**
   * Lookup830: ceres_governance_platform::pallet::Error<T>
   **/
  CeresGovernancePlatformError: {
    _enum: ['PollIsFinished', 'PollIsNotStarted', 'NotEnoughFunds', 'VoteDenied', 'InvalidStartTimestamp', 'InvalidEndTimestamp', 'PollIsNotFinished', 'InvalidNumberOfVotes', 'FundsAlreadyWithdrawn', 'InvalidVotingOptions', 'TooManyVotingOptions', 'DuplicateOptions', 'PollDoesNotExist', 'InvalidOption', 'NotVoted', 'Unauthorized']
  },
  /**
   * Lookup831: ceres_launchpad::ILOInfo<Balance, sp_core::crypto::AccountId32, Moment, common::primitives::AssetId32<common::primitives::_allowed_deprecated::PredefinedAssetId>>
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
   * Lookup832: ceres_launchpad::ContributorsVesting<Balance, Moment>
   **/
  CeresLaunchpadContributorsVesting: {
    firstReleasePercent: 'u128',
    vestingPeriod: 'u64',
    vestingPercent: 'u128'
  },
  /**
   * Lookup833: ceres_launchpad::TeamVesting<Balance, Moment>
   **/
  CeresLaunchpadTeamVesting: {
    teamVestingTotalTokens: 'u128',
    teamVestingFirstReleasePercent: 'u128',
    teamVestingPeriod: 'u64',
    teamVestingPercent: 'u128'
  },
  /**
   * Lookup835: ceres_launchpad::ContributionInfo<Balance>
   **/
  CeresLaunchpadContributionInfo: {
    fundsContributed: 'u128',
    tokensBought: 'u128',
    tokensClaimed: 'u128',
    claimingFinished: 'bool',
    numberOfClaims: 'u32'
  },
  /**
   * Lookup836: ceres_launchpad::pallet::Error<T>
   **/
  CeresLaunchpadError: {
    _enum: ['ILOAlreadyExists', 'ParameterCantBeZero', 'InvalidSoftCap', 'InvalidMinimumContribution', 'InvalidMaximumContribution', 'InvalidLiquidityPercent', 'InvalidLockupDays', 'InvalidStartTimestamp', 'InvalidEndTimestamp', 'InvalidPrice', 'InvalidNumberOfTokensForLiquidity', 'InvalidNumberOfTokensForILO', 'InvalidFirstReleasePercent', 'InvalidVestingPercent', 'InvalidVestingPeriod', 'NotEnoughCeres', 'NotEnoughTokens', 'ILONotStarted', 'ILOIsFinished', 'CantContributeInILO', 'HardCapIsHit', 'NotEnoughTokensToBuy', 'ContributionIsLowerThenMin', 'ContributionIsBiggerThenMax', 'NotEnoughFunds', 'ILODoesNotExist', 'ILOIsNotFinished', 'PoolDoesNotExist', 'Unauthorized', 'CantClaimLPTokens', 'FundsAlreadyClaimed', 'NothingToClaim', 'ILOIsFailed', 'ILOIsSucceeded', 'CantCreateILOForListedToken', 'AccountIsNotWhitelisted', 'InvalidTeamFirstReleasePercent', 'InvalidTeamVestingPercent', 'InvalidTeamVestingPeriod', 'NotEnoughTeamTokensToLock', 'InvalidFeePercent', 'BaseAssetNotSupported']
  },
  /**
   * Lookup837: demeter_farming_platform::TokenInfo<sp_core::crypto::AccountId32>
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
   * Lookup839: demeter_farming_platform::UserInfo<common::primitives::AssetId32<common::primitives::_allowed_deprecated::PredefinedAssetId>>
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
   * Lookup841: demeter_farming_platform::PoolData<common::primitives::AssetId32<common::primitives::_allowed_deprecated::PredefinedAssetId>>
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
   * Lookup842: demeter_farming_platform::StorageVersion
   **/
  DemeterFarmingPlatformStorageVersion: {
    _enum: ['V1', 'V2']
  },
  /**
   * Lookup843: demeter_farming_platform::pallet::Error<T>
   **/
  DemeterFarmingPlatformError: {
    _enum: ['TokenAlreadyRegistered', 'TokenPerBlockCantBeZero', 'InvalidAllocationParameters', 'InvalidMultiplier', 'InvalidDepositFee', 'RewardTokenIsNotRegistered', 'PoolAlreadyExists', 'InsufficientFunds', 'ZeroRewards', 'PoolDoesNotExist', 'InsufficientLPTokens', 'PoolDoesNotHaveRewards', 'Unauthorized']
  },
  /**
   * Lookup844: pallet_bags_list::list::Node<T, I>
   **/
  PalletBagsListListNode: {
    id: 'AccountId32',
    prev: 'Option<AccountId32>',
    next: 'Option<AccountId32>',
    bagUpper: 'u64',
    score: 'u64'
  },
  /**
   * Lookup845: pallet_bags_list::list::Bag<T, I>
   **/
  PalletBagsListListBag: {
    head: 'Option<AccountId32>',
    tail: 'Option<AccountId32>'
  },
  /**
   * Lookup847: pallet_bags_list::pallet::Error<T, I>
   **/
  PalletBagsListError: {
    _enum: {
      List: 'PalletBagsListListListError'
    }
  },
  /**
   * Lookup848: pallet_bags_list::list::ListError
   **/
  PalletBagsListListListError: {
    _enum: ['Duplicate', 'NotHeavier', 'NotInSameBag', 'NodeNotFound']
  },
  /**
   * Lookup849: pallet_election_provider_multi_phase::ReadySolution<T>
   **/
  PalletElectionProviderMultiPhaseReadySolution: {
    supports: 'Vec<(AccountId32,SpNposElectionsSupport)>',
    score: 'SpNposElectionsElectionScore',
    compute: 'PalletElectionProviderMultiPhaseElectionCompute'
  },
  /**
   * Lookup851: pallet_election_provider_multi_phase::RoundSnapshot<T>
   **/
  PalletElectionProviderMultiPhaseRoundSnapshot: {
    voters: 'Vec<(AccountId32,u64,Vec<AccountId32>)>',
    targets: 'Vec<AccountId32>'
  },
  /**
   * Lookup857: pallet_election_provider_multi_phase::signed::SignedSubmission<sp_core::crypto::AccountId32, Balance, framenode_runtime::NposCompactSolution24>
   **/
  PalletElectionProviderMultiPhaseSignedSignedSubmission: {
    who: 'AccountId32',
    deposit: 'u128',
    rawSolution: 'PalletElectionProviderMultiPhaseRawSolution',
    callFee: 'u128'
  },
  /**
   * Lookup858: pallet_election_provider_multi_phase::pallet::Error<T>
   **/
  PalletElectionProviderMultiPhaseError: {
    _enum: ['PreDispatchEarlySubmission', 'PreDispatchWrongWinnerCount', 'PreDispatchWeakSubmission', 'SignedQueueFull', 'SignedCannotPayDeposit', 'SignedInvalidWitness', 'SignedTooMuchWeight', 'OcwCallWrongEra', 'MissingSnapshotMetadata', 'InvalidSubmissionIndex', 'CallNotAllowed', 'FallbackFailed', 'BoundNotMet', 'TooManyWinners']
  },
  /**
   * Lookup860: band::BandRate<BlockNumber>
   **/
  BandBandRate: {
    value: 'u128',
    lastUpdated: 'u64',
    lastUpdatedBlock: 'u32',
    requestId: 'u64',
    dynamicFee: 'FixnumFixedPoint'
  },
  /**
   * Lookup862: band::pallet::Error<T, I>
   **/
  BandError: {
    _enum: ['UnauthorizedRelayer', 'AlreadyATrustedRelayer', 'NoSuchRelayer', 'RateConversionOverflow', 'RateHasInvalidTimestamp', 'RateExpired', 'DynamicFeeCalculationError', 'InvalidDynamicFeeParameters']
  },
  /**
   * Lookup865: oracle_proxy::pallet::Error<T>
   **/
  OracleProxyError: {
    _enum: ['OracleAlreadyEnabled', 'OracleAlreadyDisabled']
  },
  /**
   * Lookup866: hermes_governance_platform::HermesVotingInfo<StringLimit>
   **/
  HermesGovernancePlatformHermesVotingInfo: {
    votingOption: 'Bytes',
    numberOfHermes: 'u128',
    hermesWithdrawn: 'bool'
  },
  /**
   * Lookup867: hermes_governance_platform::HermesPollInfo<sp_core::crypto::AccountId32, Moment, StringLimit, OptionsLimit, TitleLimit, DescriptionLimit>
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
   * Lookup868: hermes_governance_platform::StorageVersion
   **/
  HermesGovernancePlatformStorageVersion: {
    _enum: ['V1', 'V2']
  },
  /**
   * Lookup869: hermes_governance_platform::pallet::Error<T>
   **/
  HermesGovernancePlatformError: {
    _enum: ['PollIsNotStarted', 'PollIsFinished', 'InvalidStartTimestamp', 'InvalidEndTimestamp', 'NotEnoughHermesForCreatingPoll', 'FundsAlreadyWithdrawn', 'PollIsNotFinished', 'YouAreNotCreator', 'Unauthorized', 'PollDoesNotExist', 'NotEnoughHermesForVoting', 'AlreadyVoted', 'InvalidMinimumDurationOfPoll', 'InvalidMaximumDurationOfPoll', 'NotVoted', 'InvalidVotingOptions', 'TooManyVotingOptions', 'InvalidOption', 'DuplicateOptions']
  },
  /**
   * Lookup870: pallet_preimage::RequestStatus<sp_core::crypto::AccountId32, Balance>
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
   * Lookup874: pallet_preimage::pallet::Error<T>
   **/
  PalletPreimageError: {
    _enum: ['TooBig', 'AlreadyNoted', 'NotAuthorized', 'NotNoted', 'Requested', 'NotRequested']
  },
  /**
   * Lookup875: order_book::order_book::OrderBook<T>
   **/
  OrderBook: {
    orderBookId: 'OrderBookOrderBookId',
    status: 'OrderBookOrderBookStatus',
    lastOrderId: 'u128',
    tickSize: 'CommonBalanceUnit',
    stepLotSize: 'CommonBalanceUnit',
    minLotSize: 'CommonBalanceUnit',
    maxLotSize: 'CommonBalanceUnit',
    techStatus: 'OrderBookOrderBookTechStatus'
  },
  /**
   * Lookup876: order_book::types::OrderBookTechStatus
   **/
  OrderBookOrderBookTechStatus: {
    _enum: ['Ready', 'Updating']
  },
  /**
   * Lookup878: order_book::limit_order::LimitOrder<T>
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
   * Lookup888: order_book::pallet::Error<T>
   **/
  OrderBookError: {
    _enum: ['UnknownOrderBook', 'InvalidOrderBookId', 'OrderBookAlreadyExists', 'UnknownLimitOrder', 'LimitOrderAlreadyExists', 'LimitOrderStorageOverflow', 'UpdateLimitOrderError', 'DeleteLimitOrderError', 'BlockScheduleFull', 'ExpirationNotFound', 'NoDataForPrice', 'NoAggregatedData', 'NotEnoughLiquidityInOrderBook', 'ForbiddenToCreateOrderBookWithSameAssets', 'NotAllowedQuoteAsset', 'NotAllowedDEXId', 'SyntheticAssetIsForbidden', 'UserHasNoNft', 'InvalidLifespan', 'InvalidOrderAmount', 'InvalidLimitOrderPrice', 'LimitOrderPriceIsTooFarFromSpread', 'TradingIsForbidden', 'PlacementOfLimitOrdersIsForbidden', 'CancellationOfLimitOrdersIsForbidden', 'UserHasMaxCountOfOpenedOrders', 'PriceReachedMaxCountOfLimitOrders', 'OrderBookReachedMaxCountOfPricesForSide', 'AmountCalculationFailed', 'PriceCalculationFailed', 'Unauthorized', 'InvalidAsset', 'InvalidTickSize', 'InvalidStepLotSize', 'InvalidMinLotSize', 'InvalidMaxLotSize', 'TickSizeAndStepLotSizeAreTooBig', 'TickSizeAndStepLotSizeLosePrecision', 'MaxLotSizeIsMoreThanTotalSupply', 'SlippageLimitExceeded', 'MarketOrdersAllowedOnlyForIndivisibleAssets', 'ForbiddenStatusToDeleteOrderBook', 'OrderBookIsNotEmpty', 'ForbiddenStatusToUpdateOrderBook', 'OrderBookIsLocked']
  },
  /**
   * Lookup889: kensetsu::StablecoinInfo<common::primitives::AssetId32<common::primitives::_allowed_deprecated::PredefinedAssetId>>
   **/
  KensetsuStablecoinInfo: {
    badDebt: 'u128',
    stablecoinParameters: 'KensetsuStablecoinParameters'
  },
  /**
   * Lookup890: kensetsu::StablecoinCollateralIdentifier<common::primitives::AssetId32<common::primitives::_allowed_deprecated::PredefinedAssetId>>
   **/
  KensetsuStablecoinCollateralIdentifier: {
    collateralAssetId: 'CommonPrimitivesAssetId32',
    stablecoinAssetId: 'CommonPrimitivesAssetId32'
  },
  /**
   * Lookup891: kensetsu::CollateralInfo<Moment>
   **/
  KensetsuCollateralInfo: {
    riskParameters: 'KensetsuCollateralRiskParameters',
    totalCollateral: 'u128',
    stablecoinSupply: 'u128',
    lastFeeUpdateTime: 'u64',
    interestCoefficient: 'u128'
  },
  /**
   * Lookup892: kensetsu::CollateralizedDebtPosition<sp_core::crypto::AccountId32, common::primitives::AssetId32<common::primitives::_allowed_deprecated::PredefinedAssetId>>
   **/
  KensetsuCollateralizedDebtPosition: {
    owner: 'AccountId32',
    collateralAssetId: 'CommonPrimitivesAssetId32',
    collateralAmount: 'u128',
    stablecoinAssetId: 'CommonPrimitivesAssetId32',
    debt: 'u128',
    interestCoefficient: 'u128'
  },
  /**
   * Lookup894: kensetsu::pallet::Error<T>
   **/
  KensetsuError: {
    _enum: ['ArithmeticError', 'WrongAssetId', 'CDPNotFound', 'CollateralInfoNotFound', 'CollateralBelowMinimal', 'CDPSafe', 'CDPUnsafe', 'CDPLimitPerUser', 'OperationNotPermitted', 'UncollectedStabilityFeeTooSmall', 'HardCapSupply', 'AccrueWrongTime', 'ZeroLiquidationLot', 'LiquidationLimit', 'WrongBorrowAmounts', 'SymbolNotEnabledByOracle', 'StablecoinInfoNotFound', 'CollateralNotRegisteredInPriceTools']
  },
  /**
   * Lookup897: bridge_proxy::BridgeRequest<common::primitives::AssetId32<common::primitives::_allowed_deprecated::PredefinedAssetId>>
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
   * Lookup898: bridge_types::types::MessageDirection
   **/
  BridgeTypesMessageDirection: {
    _enum: ['Inbound', 'Outbound']
  },
  /**
   * Lookup901: bridge_proxy::pallet::Error<T>
   **/
  BridgeProxyError: {
    _enum: ['PathIsNotAvailable', 'WrongAccountKind', 'NotEnoughLockedLiquidity', 'Overflow', 'TransferLimitReached', 'AssetAlreadyLimited', 'AssetNotLimited', 'WrongLimitSettings']
  },
  /**
   * Lookup902: bridge_channel::inbound::pallet::Error<T>
   **/
  BridgeChannelInboundPalletError: {
    _enum: ['InvalidNetwork', 'InvalidSourceChannel', 'InvalidCommitment', 'InvalidNonce', 'InvalidRewardFraction', 'ContractExists', 'CallEncodeFailed', 'InvalidBaseFeeUpdate']
  },
  /**
   * Lookup904: bridge_types::GenericBridgeMessage<MaxPayload>
   **/
  BridgeTypesGenericBridgeMessage: {
    _enum: {
      Sub: 'BridgeTypesSubstrateBridgeMessage',
      EVM: 'BridgeTypesEvmMessage'
    }
  },
  /**
   * Lookup906: bridge_types::types::GenericCommitmentWithBlock<BlockNumber, MaxMessages, MaxPayload>
   **/
  BridgeTypesGenericCommitmentWithBlock: {
    blockNumber: 'u32',
    commitment: 'BridgeTypesGenericCommitment'
  },
  /**
   * Lookup907: bridge_channel::outbound::pallet::Error<T>
   **/
  BridgeChannelOutboundPalletError: {
    _enum: ['PayloadTooLarge', 'QueueSizeLimitReached', 'MaxGasTooBig', 'NoFunds', 'Overflow', 'ChannelExists', 'MessageTypeIsNotSupported', 'MessageGasLimitExceeded', 'CommitmentGasLimitExceeded']
  },
  /**
   * Lookup910: evm_fungible_app::BaseFeeInfo<BlockNumber>
   **/
  EvmFungibleAppBaseFeeInfo: {
    baseFee: 'U256',
    updated: 'u32',
    evmBlockNumber: 'u64'
  },
  /**
   * Lookup911: evm_fungible_app::pallet::Error<T>
   **/
  EvmFungibleAppError: {
    _enum: ['TokenIsNotRegistered', 'AppIsNotRegistered', 'NotEnoughFunds', 'InvalidNetwork', 'TokenAlreadyRegistered', 'AppAlreadyRegistered', 'CallEncodeFailed', 'WrongAmount', 'WrongRequest', 'WrongRequestStatus', 'BaseFeeLifetimeExceeded', 'InvalidSignature', 'NothingToClaim', 'NotEnoughFeesCollected', 'BaseFeeIsNotAvailable', 'InvalidBaseFeeUpdate']
  },
  /**
   * Lookup912: beefy_light_client::pallet::Error<T>
   **/
  BeefyLightClientError: {
    _enum: ['InvalidValidatorSetId', 'InvalidMMRProof', 'PayloadBlocknumberTooOld', 'PayloadBlocknumberTooNew', 'CannotSwitchOldValidatorSet', 'NotEnoughValidatorSignatures', 'InvalidNumberOfSignatures', 'InvalidNumberOfPositions', 'InvalidNumberOfPublicKeys', 'ValidatorNotOnceInbitfield', 'ValidatorSetIncorrectPosition', 'InvalidSignature', 'MerklePositionTooHigh', 'MerkleProofTooShort', 'MerkleProofTooHigh', 'PalletNotInitialized', 'InvalidDigestHash', 'CommitmentNotFoundInDigest', 'MMRPayloadNotFound', 'InvalidNetworkId']
  },
  /**
   * Lookup913: substrate_bridge_channel::inbound::pallet::Error<T>
   **/
  SubstrateBridgeChannelInboundPalletError: {
    _enum: ['InvalidNetwork', 'InvalidSourceChannel', 'InvalidCommitment', 'InvalidNonce', 'InvalidRewardFraction', 'ContractExists', 'CallEncodeFailed']
  },
  /**
   * Lookup914: substrate_bridge_channel::outbound::pallet::Error<T>
   **/
  SubstrateBridgeChannelOutboundPalletError: {
    _enum: ['PayloadTooLarge', 'QueueSizeLimitReached', 'MaxGasTooBig', 'NoFunds', 'Overflow', 'ChannelExists', 'ZeroInterval']
  },
  /**
   * Lookup917: parachain_bridge_app::pallet::Error<T>
   **/
  ParachainBridgeAppError: {
    _enum: ['TokenIsNotRegistered', 'AppIsNotRegistered', 'NotEnoughFunds', 'InvalidNetwork', 'TokenAlreadyRegistered', 'AppAlreadyRegistered', 'CallEncodeFailed', 'WrongAmount', 'TransferLimitReached', 'UnknownPrecision', 'MessageIdNotFound', 'InvalidDestinationParachain', 'InvalidDestinationParams', 'RelaychainAssetNotRegistered', 'NotRelayTransferableAsset', 'RelaychainAssetRegistered']
  },
  /**
   * Lookup924: bridge_data_signer::pallet::Error<T>
   **/
  BridgeDataSignerError: {
    _enum: ['PalletInitialized', 'PalletNotInitialized', 'PeerExists', 'PeerNotExists', 'TooMuchPeers', 'FailedToVerifySignature', 'PeerNotFound', 'TooMuchApprovals', 'ApprovalsNotFound', 'SignaturesNotFound', 'HasPendingPeerUpdate', 'DontHavePendingPeerUpdates', 'NetworkNotSupported', 'SignatureAlreadyExists']
  },
  /**
   * Lookup925: multisig_verifier::pallet::Error<T>
   **/
  MultisigVerifierError: {
    _enum: ['InvalidInitParams', 'TooMuchPeers', 'NetworkNotInitialized', 'InvalidNumberOfSignatures', 'InvalidSignature', 'NotTrustedPeerSignature', 'PeerExists', 'NoSuchPeer', 'InvalidNetworkId', 'CommitmentNotFoundInDigest', 'DuplicatedPeer']
  },
  /**
   * Lookup927: substrate_bridge_app::pallet::Error<T>
   **/
  SubstrateBridgeAppError: {
    _enum: ['TokenIsNotRegistered', 'InvalidNetwork', 'TokenAlreadyRegistered', 'CallEncodeFailed', 'WrongAmount', 'UnknownPrecision', 'WrongAssetId', 'WrongAccountId']
  },
  /**
   * Lookup930: pallet_sudo::pallet::Error<T>
   **/
  PalletSudoError: {
    _enum: ['RequireSudo']
  },
  /**
   * Lookup931: faucet::pallet::Error<T>
   **/
  FaucetError: {
    _enum: ['AssetNotSupported', 'AmountAboveLimit', 'NotEnoughReserves']
  },
  /**
   * Lookup932: qa_tools::pallet::Error<T>
   **/
  QaToolsError: {
    _enum: ['ArithmeticError', 'BuyLessThanSell', 'CannotFillUnknownOrderBook', 'OrderBookAlreadyExists', 'IncorrectPrice', 'EmptyRandomRange', 'OutOfBoundsRandomRange', 'TooManyOrders', 'TooManyPrices', 'AssetsMustBeDivisible', 'AssetAlreadyExists', 'UnknownSynthetic', 'UnknownMcbcAsset', 'IncorrectCollateralAsset', 'ReferenceAssetPriceNotFound']
  },
  /**
   * Lookup933: apollo_platform::LendingPosition<BlockNumberFor>
   **/
  ApolloPlatformLendingPosition: {
    lendingAmount: 'u128',
    lendingInterest: 'u128',
    lastLendingBlock: 'u32'
  },
  /**
   * Lookup935: apollo_platform::BorrowingPosition<BlockNumberFor>
   **/
  ApolloPlatformBorrowingPosition: {
    collateralAmount: 'u128',
    borrowingAmount: 'u128',
    borrowingInterest: 'u128',
    lastBorrowingBlock: 'u32',
    borrowingRewards: 'u128'
  },
  /**
   * Lookup938: apollo_platform::PoolInfo
   **/
  ApolloPlatformPoolInfo: {
    totalLiquidity: 'u128',
    totalBorrowed: 'u128',
    totalCollateral: 'u128',
    basicLendingRate: 'u128',
    profitLendingRate: 'u128',
    borrowingRate: 'u128',
    borrowingRewardsRate: 'u128',
    loanToValue: 'u128',
    liquidationThreshold: 'u128',
    optimalUtilizationRate: 'u128',
    baseRate: 'u128',
    slopeRate1: 'u128',
    slopeRate2: 'u128',
    reserveFactor: 'u128',
    rewards: 'u128',
    isRemoved: 'bool'
  },
  /**
   * Lookup939: apollo_platform::pallet::Error<T>
   **/
  ApolloPlatformError: {
    _enum: ['Unauthorized', 'AssetAlreadyListed', 'InvalidPoolParameters', 'PoolDoesNotExist', 'InvalidLendingAmount', 'CollateralTokenDoesNotExist', 'NoLendingAmountToBorrow', 'SameCollateralAndBorrowingAssets', 'NoLiquidityForBorrowingAsset', 'NothingLent', 'InvalidCollateralAmount', 'CanNotTransferBorrowingAmount', 'CanNotTransferCollateralAmount', 'NoRewardsToClaim', 'UnableToTransferRewards', 'InsufficientLendingAmount', 'LendingAmountExceeded', 'CanNotTransferLendingAmount', 'NothingBorrowed', 'NonexistentBorrowingPosition', 'NothingToRepay', 'CanNotTransferLendingInterest', 'UnableToTransferCollateral', 'UnableToTransferAmountToRepay', 'CanNotWithdrawLendingAmount', 'CanNotTransferBorrowingRewards', 'CanNotTransferAmountToRepay', 'CanNotTransferAmountToDevelopers', 'InvalidLiquidation', 'PoolIsRemoved', 'InvalidBorrowingAmount', 'InvalidLoanToValue']
  },
  /**
   * Lookup940: extended_assets::SoulboundTokenMetadata<Moment>
   **/
  ExtendedAssetsSoulboundTokenMetadata: {
    externalUrl: 'Option<Bytes>',
    issuedAt: 'u64'
  },
  /**
   * Lookup941: extended_assets::pallet::Error<T>
   **/
  ExtendedAssetsError: {
    _enum: ['SoulboundAssetNotOperationable', 'SoulboundAssetNotTransferable', 'OnlyAssetOwnerCanRegulate', 'AssetAlreadyRegulated', 'AllInvolvedUsersShouldHoldValidSBT', 'RegulatedAssetNoOwnedBySBTIssuer', 'AssetNotRegulated', 'SBTNotFound', 'NotSBTOwner', 'NotAllowedToRegulateSoulboundAsset', 'InvalidExternalUrl']
  },
  /**
   * Lookup943: sp_runtime::MultiSignature
   **/
  SpRuntimeMultiSignature: {
    _enum: {
      Ed25519: 'SpCoreEd25519Signature',
      Sr25519: 'SpCoreSr25519Signature',
      Ecdsa: 'SpCoreEcdsaSignature'
    }
  },
  /**
   * Lookup945: frame_system::extensions::check_spec_version::CheckSpecVersion<T>
   **/
  FrameSystemExtensionsCheckSpecVersion: 'Null',
  /**
   * Lookup946: frame_system::extensions::check_tx_version::CheckTxVersion<T>
   **/
  FrameSystemExtensionsCheckTxVersion: 'Null',
  /**
   * Lookup947: frame_system::extensions::check_genesis::CheckGenesis<T>
   **/
  FrameSystemExtensionsCheckGenesis: 'Null',
  /**
   * Lookup950: frame_system::extensions::check_nonce::CheckNonce<T>
   **/
  FrameSystemExtensionsCheckNonce: 'Compact<u32>',
  /**
   * Lookup951: frame_system::extensions::check_weight::CheckWeight<T>
   **/
  FrameSystemExtensionsCheckWeight: 'Null',
  /**
   * Lookup952: xor_fee::extension::ChargeTransactionPayment<T>
   **/
  XorFeeExtensionChargeTransactionPayment: {
    tip: 'Compact<u128>'
  },
  /**
   * Lookup953: framenode_runtime::Runtime
   **/
  FramenodeRuntimeRuntime: 'Null'
};
