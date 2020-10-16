export default {
  rpc: {},
  types: {
    Address: 'AccountId',
    LookupSource: 'AccountId',
    Balance: 'u128',
    AssetId: 'u8',
    Amount: 'i128',
    AmountOf: 'Amount',
    CurrencyId: 'AssetId',
    CurrencyIdOf: 'AssetId',
    BasisPoints: 'u16',
    Fixed: 'FixedU128',
    DEXId: 'u8',
    TechAmount: 'Amount',
    TechBalance: 'Balance',
    LiquiditySourceType: {
      _enum: [
        'BondingCurve', 'XYKPool', 'MockPool', 'MockPool2', 'MockPool3', 'MockPool4'
      ]
    }
  }
}
