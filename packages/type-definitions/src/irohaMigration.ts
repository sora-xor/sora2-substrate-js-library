export default {
  rpc: {
    needsMigration: {
      description: 'Check if the account needs migration',
      params: [
        {
          name: 'iroha_address',
          type: 'String',
        },
        {
          name: 'at',
          type: 'BlockHash',
          isOptional: true,
        },
      ],
      type: 'bool',
    },
  },
  types: {
    PendingMultisigAccount: {
      approving_accounts: 'Vec<AccountId>',
      migrate_at: 'Option<BlockNumber>',
    },
  },
};
