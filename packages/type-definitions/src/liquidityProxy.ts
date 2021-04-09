export default {
    rpc: {
        quote: {
            description: 'Get price with indicated Asset amount and direction, filtered by selected_types',
            params: [
                {
                    name: 'dexId',
                    type: 'DEXId'
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
                    name: 'amount',
                    type: 'String'
                },
                {
                    name: 'swapVariant',
                    type: 'SwapVariant'
                },
                {
                    name: 'selectedSourceTypes',
                    type: 'Vec<LiquiditySourceType>'
                },
                {
                    name: 'filterMode',
                    type: 'FilterMode'
                },
            ],
            type: 'Option<SwapOutcomeInfo>'
        },
        isPathAvailable: {
            description: 'Check if given two arbitrary tokens can be exchanged via any liquidity sources',
            params: [
                {
                    name: 'dexId',
                    type: 'DEXId'
                },
                {
                    name: 'inputAssetId',
                    type: 'AssetId'
                },
                {
                    name: 'outputAssetId',
                    type: 'AssetId'
                },
            ],
            type: 'bool'
        }
    },
    types: {}
}
