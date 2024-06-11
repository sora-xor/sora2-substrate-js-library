import { Consts } from '../consts';

import type { TradingPair } from '../types';

// https://github.com/sora-xor/sora2-network/blob/master/runtime/src/lib.rs#L1012
export const getChameleonPoolBaseAssetId = (dexBaseAssetId: string): string | null => {
  if (dexBaseAssetId === Consts.XOR) {
    return Consts.KXOR;
  } else {
    return null;
  }
};

// https://github.com/sora-xor/sora2-network/blob/master/runtime/src/lib.rs#L1026
export const getChameleonPool = (tPair: TradingPair): boolean => {
  if (tPair.baseAssetId === Consts.XOR && tPair.targetAssetId === Consts.ETH) {
    return true;
  } else {
    return false;
  }
};
