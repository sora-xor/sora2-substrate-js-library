export default {
  rpc: {
    canExchange: {
      description: 'Query capability to exchange particular tokens on DEX.',
      params: [
        {
          name: 'dexId',
          type: 'DEXId'
        },
        {
          name: 'liquiditySourceType',
          type: 'LiquiditySourceType'
        },
        {
          name: 'inputAssetId',
          type: 'H256'
        },
        {
          name: 'outputAssetId',
          type: 'H256'
        }
      ],
      type: 'bool'
    },
    listSupportedSources: {
      description: 'List liquidity source types enabled on chain.',
      params: [],
      type: 'Vec<LiquiditySourceTypee>'
    },
    quote: {
      description: 'Get price for a given input or output token amount.',
      params: [
        {
          name: 'dexId',
          type: 'DEXId'
        },
        {
          name: 'liquiditySourceType',
          type: 'LiquiditySourceType'
        },
        {
          name: 'inputAssetId',
          type: 'H256'
        },
        {
          name: 'outputAssetId',
          type: 'H256'
        },
        {
          name: 'amount',
          type: 'String'
        },
        {
          name: 'swapVariant',
          type: 'SwapVariant'
        }
      ],
      type: 'Option<SwapOutcomeInfo>'
    }
  },
  types: {
    SwapOutcomeInfo: {
      amount: 'Balance',
      fee: 'Balance',
    }
  }
}
