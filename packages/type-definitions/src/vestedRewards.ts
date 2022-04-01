export default {
  rpc: {
    crowdloanClaimable: {
      description: 'Get available crowdloan reward for a user.',
      params: [
        {
          name: 'accountId',
          type: 'AccountId',
        },
        {
          name: 'assetId',
          type: 'AssetId',
        },
        {
          name: 'at',
          type: 'BlockHash',
          isOptional: true,
        },
      ],
      type: 'Option<BalanceInfo>',
    },
  },
  types: {
    BalanceInfo: {
      balance: 'Balance',
    },
  },
};
