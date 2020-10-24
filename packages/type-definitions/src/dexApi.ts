export default {
  rpc: {
    getPriceWithDesiredInput: {
      description: 'Get price with indicated input amount',
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
          type: 'AssetId'
        },
        {
          name: 'outputAssetId',
          type: 'AssetId'
        },
        {
          name: 'desiredInputAmount',
          type: 'Balance'
        }
      ],
      type: 'Balance'
    },
    getPriceWithDesiredOutput: {
      description: 'Get price with indicated output amount',
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
          type: 'AssetId'
        },
        {
          name: 'outputAssetId',
          type: 'AssetId'
        },
        {
          name: 'desiredOutputAmount',
          type: 'Balance'
        }
      ],
      type: 'Balance'
    }
  },
  types: {
  }
}
