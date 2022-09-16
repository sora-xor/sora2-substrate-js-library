// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Enum, Struct, Vec } from '@polkadot/types-codec';
import type { AssetId, H160 } from '@sora-substrate/types/interfaces/runtime';

/** @name AppKind */
export interface AppKind extends Enum {
  readonly isEthApp: boolean;
  readonly isErc20App: boolean;
  readonly isSidechainApp: boolean;
  readonly type: 'EthApp' | 'Erc20App' | 'SidechainApp';
}

/** @name AppWithSupportedAssets */
export interface AppWithSupportedAssets extends Struct {
  readonly kind: AppKind;
  readonly address: H160;
  readonly supportedAssets: Vec<AssetId>;
}

export type PHANTOM_EVMBRIDGEPROXY = 'evmBridgeProxy';
