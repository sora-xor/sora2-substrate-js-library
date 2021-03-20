export default {
    rpc: {
        claimables: {
            description: 'Get claimable rewards',
            params: [
                {
                    name: 'eth_address',
                    type: 'EthereumAddress'
                },
            ],
            type: 'Vec<BalanceInfo>'
        }
    },
    types: {
    }
}
