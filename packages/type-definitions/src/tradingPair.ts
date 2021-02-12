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
            type: 'ResultVecTradingPair'
        },
        isPairEnabled: {
            description: 'Query if particular trading pair is enabled for DEX.',
            params: [
                {
                    name: 'dexId',
                    type: 'DEXId'
                },
                {
                    name: 'AssetIdA',
                    type: 'AssetId'
                },
                {
                    name: 'AssetIdB',
                    type: 'AssetId'
                }
            ],
            type: 'ResultBool'
        },
        listEnabledSourcesForPair: {
            description: '',
            params: [
                {
                    name: 'dexId',
                    type: 'DEXId'
                },
                {
                    name: 'AssetIdA',
                    type: 'AssetId'
                },
                {
                    name: 'AssetIdB',
                    type: 'AssetId'
                }
            ],
            type: 'ResultVecLiquiditySourceType'
        },
        isSourceEnabledForPair: {
            description: '',
            params: [
                {
                    name: 'dexId',
                    type: 'DEXId'
                },
                {
                    name: 'AssetIdA',
                    type: 'AssetId'
                },
                {
                    name: 'AssetIdB',
                    type: 'AssetId'
                },
                {
                    name: 'liquiditySourceType',
                    type: 'LiquiditySourceType'
                }
            ],
            type: 'ResultBool'
        }
    },
    types: {
        TP: "TradingPair", // TODO: fix `TP` abbr in pallet to avoid confusion
    }
}
