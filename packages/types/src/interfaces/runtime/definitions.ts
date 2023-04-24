import definitions from '@polkadot/types/interfaces/runtime/definitions';
import runtime from '@sora-substrate/type-definitions/runtime';
import type { Definitions } from '@polkadot/types/types';

export default {
  rpc: {},
  types: {
    ...definitions.types,
    ...runtime.types,
  },
} as Definitions;
