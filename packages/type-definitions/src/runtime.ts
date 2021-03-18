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
    BalancePrecision: "u8",
    AssetSymbol: "Vec<u8>",
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
    TechPurpose: {
      _enum: {
        FeeCollector: "Null",
        LiquidityKeeper: "TradingPair",
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
    OracleKey: "AssetId",
    ChargeFeeInfo: {
      tip: "Compact<Balance>",
      target_asset_id: "AssetId"
    },
    TechAssetId: "Null",            // define properly if needed
    TechAccountIdPrimitive: "Null", // define properly if needed
    SwapAction: "Null",             // define properly if needed
    ValidationFunction: "Null",     // define properly if needed
    Permission: "Null",             // define properly if needed
    DistributionAccounts: "Null",
    MultisigAccount: "Null",
    PendingMultisigAccount: "Null",
    Farmer: "Null",
    Farm: "Null",
    SmoothPriceState: "Null",
    MultiCurrencyBalanceOf: "Null",
    Duration: "Null",
  }
}
