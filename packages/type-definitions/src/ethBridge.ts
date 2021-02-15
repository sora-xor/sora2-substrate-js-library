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
          type: 'Option<NetworkId>'
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
          type: 'Option<NetworkId>'
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
          type: 'Option<NetworkId>'
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
      type: 'Result<Vec<(NetworkId, H256)>, DispatchError>'
    },
    getRegisteredAssets: {
      description: 'Get registered assets and tokens.',
      params: [
        {
          name: 'networkId',
          type: 'Option<NetworkId>'
        },
      ],
      type: 'Result<Vec<(AssetKind, AssetId, Option<H160>)>, DispatchError>'
    },
  },
  types: {
    NetworkId: "u32",
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
        "ClaimPswap",
        "CancelOutgoingRequest",
        "MarkAsDone",
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
      network_id: "NetworkId",
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
      network_id: "NetworkId",
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
      network_id: "NetworkId",
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
      network_id: "NetworkId",
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
      network_id: "NetworkId",
    },
    OutgoingRemovePeerEncoded: {
      peer_address: "EthereumAddress",
      tx_hash: "H256",
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
      }
    },
    OutgoingRequestEncoded: {
      _enum: {
        Transfer: "OutgoingTransferEncoded",
        AddAsset: "OutgoingAddAssetEncoded",
        AddToken: "OutgoingAddTokenEncoded",
        AddPeer: "OutgoingAddPeerEncoded",
        RemovePeer: "OutgoingRemovePeerEncoded",
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
      network_id: "NetworkId",
    },
    IncomingAddToken: {
      token_address: "EthereumAddress",
      asset_id: "AssetId",
      precision: "BalancePrecision",
      symbol: "AssetSymbol",
      tx_hash: "H256",
      at_height: "u64",
      timepoint: "Timepoint",
      network_id: "NetworkId",
    },
    IncomingChangePeers: {
      peer_account_id: "AccountId",
      peer_address: "EthereumAddress",
      added: "bool",
      tx_hash: "H256",
      at_height: "u64",
      timepoint: "Timepoint",
      network_id: "NetworkId",
    },
    IncomingClaimPswap: {
      account_id: "AccountId",
      eth_address: "EthereumAddress",
      tx_hash: "H256",
      at_height: "u64",
      timepoint: "Timepoint",
      network_id: "NetworkId",
    },
    IncomingCancelOutgoingRequest: {
      request: "OutgoingRequest",
      tx_input: "Vec<u8>",
      tx_hash: "H256",
      at_height: "u64",
      timepoint: "Timepoint",
      network_id: "NetworkId",
    },
    IncomingRequest: {
      _enum: {
        Transfer: "IncomingTransfer",
        AddAsset: "IncomingAddToken",
        ChangePeers: "IncomingChangePeers",
        ClaimPswap: "IncomingClaimPswap",
        CancelOutgoingRequest: "IncomingCancelOutgoingRequest",
      }
    },
    IncomingPreRequest: {
      author: "AccountId",
      hash: "H256",
      timepoint: "Timepoint",
      kind: "IncomingRequestKind",
      network_id: "NetworkId",
    },
    OffchainRequest: {
      _enum: {
        Outgoing: "(OutgoingRequest, H256)",
        Incoming: "IncomingPreRequest",
      }
    },
  }
}
