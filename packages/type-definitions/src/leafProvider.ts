export default {
  rpc: {
    latestDigest: {
      description: 'Get logs.',
      params: [
        {
          name: 'at',
          type: 'BlockHash',
          isOptional: true,
        },
      ],
      type: 'BridgeTypesAuxiliaryDigest',
    },
  },
  types: {},
};
