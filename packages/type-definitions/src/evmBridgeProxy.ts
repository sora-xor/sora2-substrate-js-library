export default {
  rpc: {
    listApps: {
      description: '',
      params: [
        {
          name: 'networkId',
          type: 'EVMChainId',
        },
        {
          name: 'at',
          type: 'BlockHash',
          isOptional: true,
        },
      ],
      type: 'Vec<BridgeAppInfo>',
    },
    listSupportedAssets: {
      description: '',
      params: [
        {
          name: 'networkId',
          type: 'EVMChainId',
        },
        {
          name: 'at',
          type: 'BlockHash',
          isOptional: true,
        },
      ],
      type: 'Vec<BridgeAssetInfo<AssetId>>',
    },
    listAppsWithSupportedAssets: {
      description: '',
      params: [
        {
          name: 'networkId',
          type: 'EVMChainId',
        },
        {
          name: 'at',
          type: 'BlockHash',
          isOptional: true,
        },
      ],
      type: 'AppsWithSupportedAssets<AssetId>',
    },
  },
  types: {
    AppsWithSupportedAssets: {
      apps: 'Vec<BridgeAppInfo>',
      assets: 'Vec<BridgeAssetInfo<AssetId>>',
    },
  },
};
