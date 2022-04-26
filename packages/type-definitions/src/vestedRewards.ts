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
    crowdloanLease: {
      description: 'Get crowdloan rewards lease period info.',
      params: [
        {
          name: 'at',
          type: 'BlockHash',
          isOptional: true,
        },
      ],
      type: 'CrowdloanLease',
    },
  },
  types: {
    BalanceInfo: {
      balance: 'Balance',
    },
    CrowdloanLease: {
      start_block: 'String',
      total_days: 'String',
      blocks_per_day: 'String',
    },
  },
};
