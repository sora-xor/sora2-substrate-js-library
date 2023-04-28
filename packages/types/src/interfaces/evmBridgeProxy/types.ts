// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Enum, Option, Struct, U256, Vec } from '@polkadot/types-codec';
import type { AssetId, H160 } from '@sora-substrate/types/interfaces/runtime';

/** @name AppKind */
export interface AppKind extends Enum {
  readonly isEthApp: boolean;
  readonly isErc20App: boolean;
  readonly isSidechainApp: boolean;
  readonly isSubstrateApp: boolean;
  readonly type: 'EthApp' | 'Erc20App' | 'SidechainApp' | 'SubstrateApp';
}

/** @name AppsWithSupportedAssets */
export interface AppsWithSupportedAssets extends Struct {
  readonly apps: Vec<BridgeAppInfo>;
  readonly assets: Vec<BridgeAssetInfo>;
}

/** @name BridgeAppInfo */
export interface BridgeAppInfo extends Struct {
  readonly evmAddress: H160;
  readonly appKind: AppKind;
}

/** @name BridgeAssetInfo */
export interface BridgeAssetInfo extends Struct {
  readonly assetId: AssetId;
  readonly evmAddress: Option<H160>;
  readonly appKind: AppKind;
}

/** @name EVMChainId */
export interface EVMChainId extends U256 {}

export type PHANTOM_EVMBRIDGEPROXY = 'evmBridgeProxy';
