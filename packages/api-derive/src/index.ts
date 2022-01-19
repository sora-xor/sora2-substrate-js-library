import { DeriveCustom } from '@polkadot/api-derive';

import * as dexManager from './dexManager';

export const derive: DeriveCustom = { dexManager };

export * from './types';
