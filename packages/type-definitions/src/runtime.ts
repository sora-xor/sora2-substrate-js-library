/* eslint-disable @typescript-eslint/camelcase */
export default {
  rpc: {},
  types: {
    AssetIdOf: 'AssetId',
    Amount: 'i128',
    AmountOf: 'Amount',
    CurrencyId: 'AssetId',
    CurrencyIdOf: 'AssetId',
    BasisPoints: 'u16',
    Fixed: 'FixedU128',
    FarmId: 'u64',
    DEXId: 'u32',
    DEXIdOf: 'DEXId',
    DEXInfo: {
      base_asset_id: 'AssetId',
      default_fee: 'BasisPoints',
      default_protocol_fee: 'BasisPoints'
    },
    BalancePrecision: 'u8',
    AssetSymbol: 'Vec<u8>',
    AssetName: 'Vec<u8>',
    AssetId32: '[u8; 32]',
    SwapWithDesiredInput: {
      desired_amount_in: "Balance",
      min_amount_out: "Balance"
    },
    SwapWithDesiredOutput: {
      desired_amount_out: "Balance",
      max_amount_in: "Balance"
    },
    SwapAmount: {
      _enum: {
        WithDesiredInput: "SwapWithDesiredInput",
        WithDesiredOutput: "SwapWithDesiredOutput"
      }
    },
    QuoteWithDesiredInput: {
      desired_amount_in: "Balance"
    },
    QuoteWithDesiredOutput: {
      desired_amount_out: "Balance"
    },
    QuoteAmount: {
      _enum: {
        WithDesiredInput: "QuoteWithDesiredInput",
        WithDesiredOutput: "QuoteWithDesiredOutput"
      }
    },
    SwapVariant: {
      _enum: [
        'WithDesiredInput',
        'WithDesiredOutput'
      ]
    },
    TechAmount: 'Amount',
    TechBalance: 'Balance',
    SwapOutcome: {
      amount: "Balance",
      fee: "Balance",
    },
    LiquiditySourceType: {
      _enum: [
        'XYKPool',
        'BondingCurvePool',
        'MulticollateralBondingCurvePool',
        'MockPool',
        'MockPool2',
        'MockPool3',
        'MockPool4'
      ]
    },
    FilterMode: {
      _enum: [
        'Disabled',
        'ForbidSelected',
        'AllowSelected',
      ]
    },
    SwapOutcomeInfo: {
      amount: 'Balance',
      fee: 'Balance'
    },
    TradingPair: {
      base_asset_id: "AssetId",
      target_asset_id: "AssetId"
    },
    PermissionId: "u32",
    HolderId: "AccountId",
    OwnerId: "AccountId",
    Mode: {
      _enum: [
        'Permit', 'Forbid'
      ]
    },
    Scope: {
      _enum: {
        Limited: "H512",
        Unlimited: "Null"
      }
    },
    OracleKey: "AssetId",
    ChargeFeeInfo: {
      tip: "Compact<Balance>",
      target_asset_id: "AssetId"
    },
    SwapAction: "Null",             // define properly if needed
    ValidationFunction: "Null",     // define properly if needed
    Permission: "Null",             // define properly if needed
    DistributionAccounts: "Null",
    MultisigAccount: "Null",
    Farmer: "Null",
    Farm: "Null",
    SmoothPriceState: "Null",
    MultiCurrencyBalanceOf: "Null",
    Duration: "Null",
    PostDispatchInfo: {
      actual_weight: "Option<Weight>",
      pays_fee: "Pays",
    },
    DispatchErrorWithPostInfoTPostDispatchInfo: {
      post_info: "PostDispatchInfo",
      error: "DispatchError",
    },
    DispatchResultWithPostInfo: "Result<PostDispatchInfo, DispatchErrorWithPostInfoTPostDispatchInfo>",
    Public: "[u8; 33]",
    RewardReason: {
      _enum: [
        "Unspecified", "BuyOnBondingCurve", "LiquidityProvisionFarming", "MarketMakerVolume"
      ]
    },
    StorageVersion: "Null", // Generic storage version
    MarketMakerInfo: {
      count: "u32",
      volume: "Balance",
    },
    PredefinedAssetId: {
      _enum: [ // Order must match rust definition
        "XOR",
        "DOT",
        "KSM",
        "USDT",
        "VAL",
        "PSWAP",
        "DAI",
        "ETH"
      ]
    },
    RewardInfo: {
      limit: "Balance",
      total_available: "Balance",
      rewards: "BTreeMap<RewardReason, Balance>",
    },
    TechTradingPair: {
      base_asset_id: 'TechAssetId',
      target_asset_id: 'TechAssetId',
    },
    TechAssetId: {
      _enum: {
        Wrapped: "PredefinedAssetId",
        Escaped: "AssetId"
      }
    },
    TechPurpose: {
      _enum: {
        FeeCollector: "Null",
        FeeCollectorForPair: "TechTradingPair",
        LiquidityKeeper: "TechTradingPair",
        Identifier: "Vec<u8>"
      }
    },
    TechAccountId: {
      _enum: {
        Pure: "(DEXId, TechPurpose)",
        Generic: "(Vec<u8>, Vec<u8>)",
        Wrapped: "AccountId",
        WrappedRepr: "AccountId"
      }
    },
    PriceInfo: {
      price_failures: "u32",
      spot_prices: "Vec<Balance>",
      average_price: "Balance",
      needs_update: "bool",
      last_spot_price: "Balance",
    }
  }
}
