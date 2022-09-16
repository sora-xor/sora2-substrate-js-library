export default {
  rpc: {
    listApps: {
      description: 'Get a list of apps',
      params: [
        {
          name: 'networkId',
          type: 'String',
        },
        {
          name: 'at',
          type: 'BlockHash',
          isOptional: true,
        },
      ],
      type: 'Vec<(AppKind, H160)>',
    },
    listAssets: {
      description: 'Get a list of assets',
      params: [
        {
          name: 'networkId',
          type: 'String',
        },
        {
          name: 'at',
          type: 'BlockHash',
          isOptional: true,
        },
      ],
      type: 'Vec<(AppKind, AssetId)>',
    },
    listAppsWithSupportedAssets: {
      description: 'Get a list of apps with supported assets',
      params: [
        {
          name: 'networkId',
          type: 'String',
        },
        {
          name: 'at',
          type: 'BlockHash',
          isOptional: true,
        },
      ],
      type: 'Vec<AppWithSupportedAssets<AssetId>>',
    },
  },
  types: {
    AppKind: {
      _enum: ['EthApp', 'ERC20App', 'SidechainApp'],
    },
    AppWithSupportedAssets: {
      kind: 'AppKind',
      address: 'H160',
      supportedAssets: 'Vec<AssetId>',
    },
  },
};
