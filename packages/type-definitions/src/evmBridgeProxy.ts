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
    AppKind: {
      _enum: ['EthApp', 'ERC20App', 'SidechainApp', 'SubstrateApp'],
    },
    AppsWithSupportedAssets: {
      apps: 'Vec<BridgeAppInfo>',
      assets: 'Vec<BridgeAssetInfo<AssetId>>',
    },
    BridgeAssetInfo: {
      assetId: 'AssetId',
      evmAddress: 'Option<H160>',
      appKind: 'AppKind',
    },
    BridgeAppInfo: {
      evmAddress: 'H160',
      appKind: 'AppKind',
    },
    EVMChainId: 'U256',
  },
};
