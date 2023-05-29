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

export enum BridgeTxDirection {
  Outgoing = 'Outgoing',
  Incoming = 'Incoming',
}

export enum BridgeTxStatus {
  Done = 'Done',
  Failed = 'Failed',
  Pending = 'Pending',
}

export enum EvmAppKinds {
  EthApp = 'EthApp',
  ERC20App = 'ERC20App',
  SidechainApp = 'SidechainApp',
  HashiBridge = 'HashiBridge',
  XorMaster = 'XorMaster',
  ValMaster = 'ValMaster',
}

export enum SubAssetKind {
  Thischain = 'Thischain',
  Sidechain = 'Sidechain',
}

export enum BridgeTypeNetwork {
  Evm = 'EVM',
  Sub = 'Sub',
  EvmLegacy = 'EVMLegacy',
}

export enum BridgeTypeAccount {
  Evm = 'EVM',
  Sora = 'Sora',
  Parachain = 'Parachain',
  Unknown = 'Unknown',
}

export enum SubNetwork {
  // from chain
  Mainnet = 'Mainnet',
  Kusama = 'Kusama',
  Polkadot = 'Polkadot',
  Rococo = 'Rococo',
  Custom = 'Custom',
  // working with through parachains
  Karura = 'Karura', // Rococo
}

export enum XcmVersionedMultiLocation {
  V2 = 'V2',
  V3 = 'V3',
}

// V2 & V3
export enum XcmMultilocationJunction {
  X1 = 'X1',
  X2 = 'X2',
  X3 = 'X3',
  X4 = 'X4',
  X5 = 'X5',
  X6 = 'X6',
  X7 = 'X7',
  X8 = 'X8',
  Here = 'Here',
}

// V2 & V3
export enum XcmJunction {
  Parachain = 'Parachain',
  AccountId32 = 'AccountId32',
  AccountIndex64 = 'AccountIndex64',
  AccountKey20 = 'AccountKey20',
  PalletInstance = 'PalletInstance',
  GeneralIndex = 'GeneralIndex',
  GeneralKey = 'GeneralKey',
  OnlyChild = 'OnlyChild',
  Plurality = 'Plurality',
  GlobalConsensus = 'GlobalConsensus',
}

// XcmV2NetworkId
export enum XcmV2NetworkId {
  Any = 'Any',
  Named = 'Named',
  Polkadot = 'Polkadot',
  Kusama = 'Kusama',
}

// XcmV3JunctionNetworkId
export enum XcmV3NetworkId {
  ByGenesis = 'ByGenesis',
  ByFork = 'ByFork',
  Polkadot = 'Polkadot',
  Kusama = 'Kusama',
  Westend = 'Westend',
  Rococo = 'Rococo',
  Wococo = 'Wococo',
  Ethereum = 'Ethereum',
  BitcoinCore = 'BitcoinCore',
  BitcoinCash = 'BitcoinCash',
}

// [CHECK] union with XcmV3BodyId?
// XcmV2BodyId
export enum XcmV2BodyId {
  Unit = 'Unit',
  Named = 'Named',
  Index = 'Index',
  Executive = 'Executive',
  Technical = 'Technical',
  Legislative = 'Legislative',
  Judicial = 'Judicial',
  Defense = 'Defense',
  Administration = 'Administration',
  Treasury = 'Treasury',
}

// XcmV3JunctionBodyId
export enum XcmV3BodyId {
  Unit = 'Unit',
  Moniker = 'Moniker',
  Index = 'Index',
  Executive = 'Executive',
  Technical = 'Technical',
  Legislative = 'Legislative',
  Judicial = 'Judicial',
  Defense = 'Defense',
  Administration = 'Administration',
  Treasury = 'Treasury',
}

// XcmV2BodyPart
// XcmV3JunctionBodyPart
export enum XcmBodyPart {
  Voice = 'Voice',
  Members = 'Members',
  Fraction = 'Fraction',
  AtLeastProportion = 'AtLeastProportion',
  MoreThanProportion = 'MoreThanProportion',
}

export enum SupportedParachains {
  Sora = 2011,
  Karura = 2000,
}
