export enum SubAssetKind {
  Thischain = 'Thischain',
  Sidechain = 'Sidechain',
}

export enum SubNetwork {
  /** Kusama relaychain */
  Kusama = 'Kusama',
  /** Polkadot relaychain */
  Polkadot = 'Polkadot',
  /** Rococo relaychain (Kusama testnet) */
  Rococo = 'Rococo',
  Custom = 'Custom', // not used yet
  /** SORA parachain in Rococo relaychain */
  RococoSora = 'RococoSora',
  /** Karura parachain in Kusama relaychain */
  KusamaKarura = 'KusamaKarura',
  /** SORA parachain in Kusama relaychain */
  KusamaSora = 'KusamaSora',
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
