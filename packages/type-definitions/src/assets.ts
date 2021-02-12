export default {
    rpc: {
        freeBalance: {
            description: 'Get free balance of particular asset for account.',
            params: [
                {
                    name: 'accountId',
                    type: 'AccountId'
                },
                {
                    name: 'assetId',
                    type: 'AssetId'
                },
            ],
            type: 'ResultBalanceInfo'
        },
        usableBalance: {
            description: 'Get usable (free and non-frozen, except for network fees) balance of particular asset for account.',
            params: [
                {
                    name: 'accountId',
                    type: 'AccountId'
                },
                {
                    name: 'assetId',
                    type: 'AssetId'
                },
            ],
            type: 'ResultBalanceInfo'
        },
        totalBalance: {
            description: 'Get total balance (free + reserved) of particular asset for account.',
            params: [
                {
                    name: 'accountId',
                    type: 'AccountId'
                },
                {
                    name: 'assetId',
                    type: 'AssetId'
                },
            ],
            type: 'ResultBalanceInfo'
        },
        totalSupply: {
            description: 'Get total supply of particular asset on chain.',
            params: [
                {
                    name: 'assetId',
                    type: 'AssetId'
                },
            ],
            type: 'ResultBalanceInfo'
        },
        listAssetIds: {
            description: 'List Ids of all assets registered on chain.',
            params: [],
            type: 'Vec<AssetId>'
        },
        listAssetInfos: {
            description: 'List Infos of all assets registered on chain.',
            params: [],
            type: 'Vec<AssetInfo>'
        },
        getAssetInfo: {
            description: 'Get Info for particular asset on chain.',
            params: [
                {
                    name: 'assetId',
                    type: 'AssetId'
                },
            ],
            type: 'ResultAssetInfo'
        },
    },
    types: {
        BalanceInfo: {
            balance: 'Balance',
        },
        AssetInfo: {
            asset_id: 'AssetId',
            symbol: 'AssetSymbolStr',
            precision: 'u8',
            is_mintable: 'bool'
        },
        AssetSymbolStr: 'String',
    }
}
