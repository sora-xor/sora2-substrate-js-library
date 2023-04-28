// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Struct, Vec } from '@polkadot/types-codec';

/** @name AppsWithSupportedAssets */
export interface AppsWithSupportedAssets extends Struct {
  readonly apps: Vec<BridgeAppInfo>;
  readonly assets: Vec<BridgeAssetInfo>;
}

export type PHANTOM_EVMBRIDGEPROXY = 'evmBridgeProxy';
