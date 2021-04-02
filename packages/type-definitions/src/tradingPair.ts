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
        },
        listEnabledSourcesForPair: {
            description: 'List enabled liquidity sources for trading pair.',
            params: [
                {
                    name: 'dexId',
                    type: 'DEXId'
                },
                {
                    name: 'baseAssetId',
                    type: 'AssetId'
                },
                {
                    name: 'targetAssetId',
                    type: 'AssetId'
                }
            ],
            type: 'Vec<LiquiditySourceType>'
        },
        isSourceEnabledForPair: {
            description: 'Query if particular liquidity source is enabled for pair.',
            params: [
                {
                    name: 'dexId',
                    type: 'DEXId'
                },
                {
                    name: 'baseAssetId',
                    type: 'AssetId'
                },
                {
                    name: 'targetAssetId',
                    type: 'AssetId'
                },
                {
                    name: 'liquiditySourceType',
                    type: 'LiquiditySourceType'
                },
            ],
            type: 'bool'
        }
    },
    types: {
        TP: "TradingPair", // TODO: fix `TP` abbr in pallet to avoid confusion
    }
}
