export enum EvmNetworkId {
  // ETH
  EthereumMainnet = 1,
  EthereumRopsten = 3,
  EthereumRinkeby = 4,
  EthereumGoerli = 5,
  EthereumKovan = 42,
  EthereumSepolia = 11155111,
  // Binance Smart Chain
  BinanceSmartChainMainnet = 56,
  BinanceSmartChainTestnet = 97,
  // Ethereum Classic
  EthereumClassicMainnet = 61,
  EthereumClassicTestnetMordor = 63,
  // Polygon
  PolygonMainnet = 137,
  PolygonTestnetMumbai = 8001,
  // Klaytn
  KlaytnMainnet = 8217,
  KlaytnTestnetBaobab = 1001,
  // Avalanche
  AvalancheMainnet = 43114,
  AvalancheTestnetFuji = 43113,
}

export enum EvmDirection {
  Outgoing = 'Outgoing',
  Incoming = 'Incoming',
}

export enum EvmTxStatus {
  Done = 'Done',
  Failed = 'Failed',
  Pending = 'Pending',
}

export enum BridgeTypeNetwork {
  Evm = 'EVM',
  Sub = 'Sub',
}

export enum BridgeTypeAccount {
  Evm = 'EVM',
  Sora = 'Sora',
  Parachain = 'Parachain',
  Unknown = 'Unknown',
}

export enum SubNetworkId {
  Mainnet = 'Mainnet',
  Kusama = 'Kusama',
  Polkadot = 'Polkadot',
  Rococo = 'Rococo',
  Custom = 'Custom',
}
