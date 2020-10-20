/* eslint-disable @typescript-eslint/camelcase */
export default {
  rpc: {},
  types: {
    // Address: 'AccountId', // supposed to be as in defaults
    // LookupSource: 'AccountId',
    Balance: 'u128',
    AssetId: 'u8',
    Amount: 'i128',
    AmountOf: 'Amount',
    CurrencyId: 'AssetId',
    CurrencyIdOf: 'AssetId',
    BasisPoints: 'u16',
    Fixed: 'FixedU128',
    DEXId: 'u32',
    DEXInfo: {
      base_asset_id: 'AssetId',
      default_fee: 'BasisPoints',
      default_protocol_fee: 'BasisPoints'
    },
    TechAmount: 'Amount',
    TechBalance: 'Balance',
    LiquiditySourceType: {
      _enum: [
        'BondingCurve', 'XYKPool', 'MockPool', 'MockPool2', 'MockPool3', 'MockPool4'
      ]
    },
    TradingPair: {
      base_asset_id: "AssetId",
      target_asset_id: "AssetId"
    },
    TechPurpose: {
      _enum: {
        FeeCollector: null,
        LiquidityKeeper: "TradingPair",
        Identifier: "Vec<u8>"
      }
    },
    // TechAccountId: {
    //   _enum: {
    //     Pure: {
    //       _hidden_0: "DEXId",
    //       _hidden_1: "TechPurpose"
    //     },
    //     Generic: {
    //       _hidden_0: "Vec<u8>",
    //       _hidden_1: "Vec<u8>"
    //     },
    //     Wrapped: "AccountId",
    //     WrappedRepr: "AccountId"
    //   }
    // },
    TechAssetId: "u128", // Dummy value, will fail on decode
    TechAccountId: "u128", // Dummy value, will fail on decode
    TechAccountIdPrimitive: "u128", // Dummy value, will fail on decode
    SwapAction: "u128", //Dummy value, will fail on decode
    Permission: {
      owner_id: "AccountId",
      params: "Option<H512>"
    },
    ValidationFunction: "u128" //Dummy value, will fail on decode
  }
}
