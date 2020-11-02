export default {
    rpc: {
        listEnabledPairs: {
            description: 'List enabled trading pairs for DEX.',
            params: [
                {
                    name: 'dexId',
                    type: 'DEXId'
                }
            ],
            type: 'Vec<TradingPair>'
        },
        isPairEnabled: {
            description: 'Query if particular trading pair is enabled for DEX.',
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
                }
            ],
            type: 'bool'
        }
    },
    types: {
        TP: "TradingPair", // TODO: fix `TP` abbr in pallet to avoid confusion
    }
}
