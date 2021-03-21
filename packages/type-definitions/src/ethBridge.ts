export default {
  rpc: {
    getRequests: {
      description: 'Get registered requests and their statuses.',
      params: [
        {
          name: 'requestHashes',
          type: 'Vec<H256>'
        },
        {
          name: 'networkId',
          type: 'Option<BridgeNetworkId>'
        },
      ],
      type: 'Result<Vec<(OffchainRequest, RequestStatus)>, DispatchError>'
    },
    getApprovedRequests: {
      description: 'Get approved encoded requests and their approvals.',
      params: [
        {
          name: 'requestHashes',
          type: 'Vec<H256>'
        },
        {
          name: 'networkId',
          type: 'Option<BridgeNetworkId>'
        },
      ],
      type: 'Result<Vec<(OutgoingRequestEncoded, Vec<SignatureParams>)>, DispatchError>'
    },
    getApprovals: {
      description: 'Get approvals of the given requests.',
      params: [
        {
          name: 'requestHashes',
          type: 'Vec<H256>'
        },
        {
          name: 'networkId',
          type: 'Option<BridgeNetworkId>'
        },
      ],
      type: 'Result<Vec<Vec<SignatureParams>>, DispatchError>'
    },
    getAccountRequests: {
      description: 'Get account requests hashes.',
      params: [
        {
          name: 'accountId',
          type: 'AccountId'
        },
        {
          name: 'statusFilter',
          type: 'Option<RequestStatus>'
        },
      ],
      type: 'Result<Vec<(BridgeNetworkId, H256)>, DispatchError>'
    },
    getRegisteredAssets: {
      description: 'Get registered assets and tokens.',
      params: [
        {
          name: 'networkId',
          type: 'Option<BridgeNetworkId>'
        },
      ],
      type: 'Result<Vec<(AssetKind, AssetId, Option<H160>)>, DispatchError>'
    },
  },
  types: {
    EthPeersSync: {
      is_bridge_ready: "bool",
      is_xor_ready: "bool",
      is_val_ready: "bool",
    },
    BridgeStatus: {
      _enum: [
        "Initialized",
        "Migrating",
      ]
    },
    BridgeNetworkId: "u32",
    AssetKind: {
      _enum: [
        "Thischain",
        "Sidechain",
        "SidechainOwned"
      ]
    },
    RequestStatus: {
      _enum: [
        "Pending",
        "Frozen",
        "ApprovalsReady",
        "Failed",
        "Done"
      ]
    },
    SignatureParams: {
      r: "[u8; 32]",
      s: "[u8; 32]",
      v: "u8"
    },
    IncomingRequestKind: {
      _enum: [
        "Transfer",
        "AddAsset",
        "AddPeer",
        "RemovePeer",
        "CancelOutgoingRequest",
        "MarkAsDone",
        "PrepareForMigration",
        "Migrate",
      ]
    },
    ChangePeersContract: {
      _enum: [
        "XOR",
        "VAL",
      ]
    },
    CurrencyIdEncoded: {
      _enum: {
        AssetId: "H256",
        TokenAddress: "H160",
      }
    },
    FixedBytes: 'Vec<u8>',
    OutgoingTransfer: {
      from: "AccountId",
      to: "EthereumAddress",
      asset_id: "AssetId",
      amount: "Balance",
      nonce: "Index",
      network_id: "BridgeNetworkId",
      timepoint: "Timepoint",
    },
    OutgoingTransferEncoded: {
      currency_id: "CurrencyIdEncoded",
      amount: "U256",
      to: "EthereumAddress",
      from: "EthereumAddress",
      tx_hash: "H256",
      network_id: "H256",
      raw: "Vec<u8>",
    },
    OutgoingAddAsset: {
      author: "AccountId",
      asset_id: "AssetId",
      supply: "Balance",
      nonce: "Index",
      network_id: "BridgeNetworkId",
      timepoint: "Timepoint",
    },
    OutgoingAddAssetEncoded: {
      name: "String",
      symbol: "String",
      decimal: "u8",
      supply: "U256",
      sidechain_asset_id: "FixedBytes",
      hash: "H256",
      network_id: "H256",
      raw: "Vec<u8>",
    },
    OutgoingAddToken: {
      author: "AccountId",
      token_address: "EthereumAddress",
      ticker: "String",
      name: "String",
      decimals: "u8",
      nonce: "Index",
      network_id: "BridgeNetworkId",
      timepoint: "Timepoint",
    },
    OutgoingAddTokenEncoded: {
      token_address: "EthereumAddress",
      ticker: "String",
      name: "String",
      decimals: "u8",
      hash: "H256",
      network_id: "H256",
      raw: "Vec<u8>",
    },
    OutgoingAddPeer: {
      author: "AccountId",
      peer_address: "EthereumAddress",
      peer_account_id: "AccountId",
      nonce: "Index",
      network_id: "BridgeNetworkId",
      timepoint: "Timepoint",
    },
    OutgoingAddPeerCompat: {
      author: "AccountId",
      peer_address: "EthereumAddress",
      peer_account_id: "AccountId",
      nonce: "Index",
      network_id: "BridgeNetworkId",
      timepoint: "Timepoint",
    },
    OutgoingAddPeerEncoded: {
      peer_address: "EthereumAddress",
      tx_hash: "H256",
      network_id: "H256",
      raw: "Vec<u8>",
    },
    OutgoingRemovePeer: {
      author: "AccountId",
      peer_account_id: "AccountId",
      peer_address: "EthereumAddress",
      nonce: "Index",
      network_id: "BridgeNetworkId",
      timepoint: "Timepoint",
    },
    OutgoingRemovePeerCompat: {
      author: "AccountId",
      peer_account_id: "AccountId",
      peer_address: "EthereumAddress",
      nonce: "Index",
      network_id: "BridgeNetworkId",
      timepoint: "Timepoint",
    },
    OutgoingRemovePeerEncoded: {
      peer_address: "EthereumAddress",
      tx_hash: "H256",
      network_id: "H256",
      raw: "Vec<u8>",
    },
    OutgoingPrepareForMigration: {
      author: "AccountId",
      nonce: "Index",
      network_id: "BridgeNetworkId",
      timepoint: "Timepoint",
    },
    OutgoingPrepareForMigrationEncoded: {
      this_contract_address: "EthereumAddress",
      tx_hash: "H256",
      network_id: "H256",
      raw: "Vec<u8>",
    },
    OutgoingMigrate: {
      author: "AccountId",
      new_contract_address: "EthereumAddress",
      erc20_native_tokens: "Vec<EthereumAddress>",
      nonce: "Index",
      network_id: "BridgeNetworkId",
      timepoint: "Timepoint",
    },
    OutgoingMigrateEncoded: {
      this_contract_address: "EthereumAddress",
      tx_hash: "H256",
      new_contract_address: "EthereumAddress",
      erc20_native_tokens: "Vec<EthereumAddress>",
      network_id: "H256",
      raw: "Vec<u8>",
    },
    OutgoingRequest: {
      _enum: {
        Transfer: "OutgoingTransfer",
        AddAsset: "OutgoingAddAsset",
        AddToken: "OutgoingAddToken",
        AddPeer: "OutgoingAddPeer",
        RemovePeer: "OutgoingRemovePeer",
        PrepareForMigration: "OutgoingPrepareForMigration",
        Migrate: "OutgoingMigrate",
      }
    },
    OutgoingRequestEncoded: {
      _enum: {
        Transfer: "OutgoingTransferEncoded",
        AddAsset: "OutgoingAddAssetEncoded",
        AddToken: "OutgoingAddTokenEncoded",
        AddPeer: "OutgoingAddPeerEncoded",
        RemovePeer: "OutgoingRemovePeerEncoded",
        PrepareForMigration: "OutgoingPrepareForMigrationEncoded",
        Migrate: "OutgoingMigrateEncoded",
      }
    },
    IncomingTransfer: {
      from: "EthereumAddress",
      to: "AccountId",
      asset_id: "AssetId",
      asset_kind: "AssetKind",
      amount: "Balance",
      tx_hash: "H256",
      at_height: "u64",
      timepoint: "Timepoint",
      network_id: "BridgeNetworkId",
    },
    IncomingAddToken: {
      token_address: "EthereumAddress",
      asset_id: "AssetId",
      precision: "BalancePrecision",
      symbol: "AssetSymbol",
      tx_hash: "H256",
      at_height: "u64",
      timepoint: "Timepoint",
      network_id: "BridgeNetworkId",
    },
    IncomingChangePeers: {
      peer_account_id: "AccountId",
      peer_address: "EthereumAddress",
      added: "bool",
      tx_hash: "H256",
      at_height: "u64",
      timepoint: "Timepoint",
      network_id: "BridgeNetworkId",
    },
    IncomingChangePeersCompat: {
      peer_account_id: "AccountId",
      peer_address: "EthereumAddress",
      added: "bool",
      contract: "ChangePeersContract",
      tx_hash: "H256",
      at_height: "u64",
      timepoint: "Timepoint",
      network_id: "BridgeNetworkId",
    },
    IncomingCancelOutgoingRequest: {
      request: "OutgoingRequest",
      tx_input: "Vec<u8>",
      tx_hash: "H256",
      at_height: "u64",
      timepoint: "Timepoint",
      network_id: "BridgeNetworkId",
    },
    IncomingPrepareForMigration: {
      tx_hash: "H256",
      at_height: "u64",
      timepoint: "Timepoint",
      network_id: "BridgeNetworkId",
    },
    IncomingMigrate: {
      new_contract_address: "EthereumAddress",
      tx_hash: "H256",
      at_height: "u64",
      timepoint: "Timepoint",
      network_id: "BridgeNetworkId",
    },
    IncomingRequest: {
      _enum: {
        Transfer: "IncomingTransfer",
        AddAsset: "IncomingAddToken",
        ChangePeers: "IncomingChangePeers",
        CancelOutgoingRequest: "IncomingCancelOutgoingRequest",
        PrepareForMigration: "IncomingPrepareForMigration",
        Migrate: "IncomingMigrate",
      }
    },
    IncomingPreRequest: {
      author: "AccountId",
      hash: "H256",
      timepoint: "Timepoint",
      kind: "IncomingRequestKind",
      network_id: "BridgeNetworkId",
    },
    OffchainRequest: {
      _enum: {
        Outgoing: "(OutgoingRequest, H256)",
        Incoming: "IncomingPreRequest",
      }
    },
  }
}
