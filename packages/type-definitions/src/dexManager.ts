export default {
  rpc: {
    listDEXIds: {
      description: 'Enumerate available ids of DEXes',
      params: [],
      type: 'Vec<DEXId>'
    },
    testBalance: {
      description: 'Test type of Balance',
      params: [],
      type: 'Fixed'
    }
  },
  types: {
  }
}
