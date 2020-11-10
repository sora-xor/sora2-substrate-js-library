// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

import { AnyNumber, ITuple } from '@polkadot/types/types';
import { Option, Vec } from '@polkadot/types/codec';
import { Bytes, bool, u32 } from '@polkadot/types/primitive';
import { AccountData, BalanceLock } from '@polkadot/types/interfaces/balances';
import { ParaId, RelayChainBlockNumber } from '@polkadot/types/interfaces/parachains';
import { AccountInfo, DigestOf, EventIndex, EventRecord, LastRuntimeUpgradeInfo, Phase } from '@polkadot/types/interfaces/system';
import { Multiplier } from '@polkadot/types/interfaces/txpayment';
import { AccountId, AssetId, Balance, BlockNumber, CurrencyId, DEXId, DEXInfo, ExtrinsicsWeight, Fixed, Hash, Moment, Permission, Releases, TechAccountId, ValidationFunction } from '@sora-substrate/types/interfaces/runtime';
import { BaseStorageType, StorageDoubleMap, StorageMap } from '@open-web3/api-mobx';

export interface StorageType extends BaseStorageType {
  balances: {    /**
     * The balance of an account.
     * 
     * NOTE: This is only used in the case that this module is used to store balances.
     **/
    account: StorageMap<AccountId | string, AccountData>;
    /**
     * Any liquidity locks on some account balances.
     * NOTE: Should only be accessed when setting, changing and freeing a lock.
     **/
    locks: StorageMap<AccountId | string, Vec<BalanceLock>>;
    /**
     * Storage version of the pallet.
     * 
     * This is set to v2.0.0 for new networks.
     **/
    storageVersion: Releases | null;
    /**
     * The total units issued in the system.
     **/
    totalIssuance: Balance | null;
  };
  dexManager: {    dexInfos: StorageMap<DEXId | AnyNumber, DEXInfo>;
  };
  mockLiquiditySource: {    reserves: StorageDoubleMap<DEXId | AnyNumber, AssetId | AnyNumber, ITuple<[Fixed, Fixed]>>;
    reservesAcc: TechAccountId | null;
  };
  mockLiquiditySource2: {    reserves: StorageDoubleMap<DEXId | AnyNumber, AssetId | AnyNumber, ITuple<[Fixed, Fixed]>>;
    reservesAcc: TechAccountId | null;
  };
  mockLiquiditySource3: {    reserves: StorageDoubleMap<DEXId | AnyNumber, AssetId | AnyNumber, ITuple<[Fixed, Fixed]>>;
    reservesAcc: TechAccountId | null;
  };
  mockLiquiditySource4: {    reserves: StorageDoubleMap<DEXId | AnyNumber, AssetId | AnyNumber, ITuple<[Fixed, Fixed]>>;
    reservesAcc: TechAccountId | null;
  };
  parachainInfo: {    parachainId: ParaId | null;
  };
  parachainUpgrade: {    /**
     * Were the VFPs updated this block?
     **/
    didUpdateVfPs: bool | null;
    pendingValidationFunction: Option<ITuple<[RelayChainBlockNumber, ValidationFunction]>> | null;
  };
  permissions: {    /**
     * Storage with double keys (permission_id, holder_id).
     **/
    permissions: StorageDoubleMap<u32 | AnyNumber, AccountId | string, Option<Permission>>;
  };
  randomnessCollectiveFlip: {    /**
     * Series of block headers from the last 81 blocks that acts as random seed material. This
     * is arranged as a ring buffer with `block_number % 81` being the index into the `Vec` of
     * the oldest hash.
     **/
    randomMaterial: Vec<Hash> | null;
  };
  referralSystem: {    referrerAccount: StorageMap<AccountId | string, AccountId>;
  };
  sudo: {    /**
     * The `AccountId` of the sudo key.
     **/
    key: AccountId | null;
  };
  system: {    /**
     * The full account information for a particular account ID.
     **/
    account: StorageMap<AccountId | string, AccountInfo>;
    /**
     * Total length (in bytes) for all extrinsics put together, for the current block.
     **/
    allExtrinsicsLen: Option<u32> | null;
    /**
     * Map of block numbers to block hashes.
     **/
    blockHash: StorageMap<BlockNumber | AnyNumber, Hash>;
    /**
     * The current weight for the block.
     **/
    blockWeight: ExtrinsicsWeight | null;
    /**
     * Digest of the current block, also part of the block header.
     **/
    digest: DigestOf | null;
    /**
     * The number of events in the `Events<T>` list.
     **/
    eventCount: EventIndex | null;
    /**
     * Events deposited for the current block.
     **/
    events: Vec<EventRecord> | null;
    /**
     * Mapping between a topic (represented by T::Hash) and a vector of indexes
     * of events in the `<Events<T>>` list.
     * 
     * All topic vectors have deterministic storage locations depending on the topic. This
     * allows light-clients to leverage the changes trie storage tracking mechanism and
     * in case of changes fetch the list of events of interest.
     * 
     * The value has the type `(T::BlockNumber, EventIndex)` because if we used only just
     * the `EventIndex` then in case if the topic has the same contents on the next block
     * no notification will be triggered thus the event might be lost.
     **/
    eventTopics: StorageMap<Hash | string, Vec<ITuple<[BlockNumber, EventIndex]>>>;
    /**
     * The execution phase of the block.
     **/
    executionPhase: Option<Phase> | null;
    /**
     * Total extrinsics count for the current block.
     **/
    extrinsicCount: Option<u32> | null;
    /**
     * Extrinsics data for the current block (maps an extrinsic's index to its data).
     **/
    extrinsicData: StorageMap<u32 | AnyNumber, Bytes>;
    /**
     * Extrinsics root of the current block, also part of the block header.
     **/
    extrinsicsRoot: Hash | null;
    /**
     * Stores the `spec_version` and `spec_name` of when the last runtime upgrade happened.
     **/
    lastRuntimeUpgrade: Option<LastRuntimeUpgradeInfo> | null;
    /**
     * The current block number being processed. Set by `execute_block`.
     **/
    number: BlockNumber | null;
    /**
     * Hash of the previous block.
     **/
    parentHash: Hash | null;
  };
  templateModule: {    something: Option<u32> | null;
  };
  timestamp: {    /**
     * Did the timestamp get updated in this block?
     **/
    didUpdate: bool | null;
    /**
     * Current time for the current block.
     **/
    now: Moment | null;
  };
  tokens: {    /**
     * The balance of a token type under an account.
     * 
     * NOTE: If the total is ever zero, decrease account ref account.
     * 
     * NOTE: This is only used in the case that this module is used to store balances.
     **/
    accounts: StorageDoubleMap<AccountId | string, CurrencyId | AnyNumber, AccountData>;
    /**
     * Any liquidity locks of a token type under an account.
     * NOTE: Should only be accessed when setting, changing and freeing a lock.
     **/
    locks: StorageDoubleMap<AccountId | string, CurrencyId | AnyNumber, Vec<BalanceLock>>;
    /**
     * The total issuance of a token type.
     **/
    totalIssuance: StorageMap<CurrencyId | AnyNumber, Balance>;
  };
  transactionPayment: {    nextFeeMultiplier: Multiplier | null;
    storageVersion: Releases | null;
  };
  xorFee: {  };
}
