export default {
    rpc: {
        claimables: {
            description: 'Get claimable rewards',
            params: [
                {
                    name: 'eth_address',
                    type: 'EthereumAddress'
                },
                {
                    name: 'at',
                    type: 'BlockHash',
                    isOptional: true
                },
            ],
            type: 'Vec<BalanceInfo>'
        }
    },
    types: {
    }
}
