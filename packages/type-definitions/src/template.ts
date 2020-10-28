export default {
    rpc: {
        testMultiply2: {
            description: 'Test type of Balance',
            params: [
                {
                    name: 'amount',
                    type: 'String'
                }
            ],
            type: 'Option<CustomInfo>'
        }
    },
    types: {
        CustomInfo: {
            amount: 'Balance'
        }
    }
}