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
                    type: 'Balance'
                },
                {
                    name: 'swapVariant',
                    type: 'SwapVariant'
                },
                {
                    name: 'selectedSourceTypes',
                    type: 'LiquiditySourceType'
                },
                {
                    name: 'filterMode',
                    type: 'FilterMode'
                },
            ],
            type: 'Option<SwapOutcomeInfo>'
        }
    },
    types: {}
}
