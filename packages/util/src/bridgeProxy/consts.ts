export enum BridgeTxDirection {
  Outgoing = 'Outgoing',
  Incoming = 'Incoming',
}

export enum BridgeTxStatus {
  Done = 'Done',
  Failed = 'Failed',
  Pending = 'Pending',
}

export enum BridgeNetworkType {
  Evm = 'EVM',
  Sub = 'Sub',
  EvmLegacy = 'EVMLegacy',
}

export enum BridgeAccountType {
  Evm = 'EVM',
  Sora = 'Sora',
  Parachain = 'Parachain',
  Unknown = 'Unknown',
}
