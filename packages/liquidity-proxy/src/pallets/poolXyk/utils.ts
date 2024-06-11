import { Errors } from '../../consts';
import { getChameleonPoolBaseAssetId, getChameleonPool } from '../../runtime';

import type { TradingPair } from '../../types';

// get_pair_info
/** Returns trading pair, chameleon base asset id (if exists) and chameleon pool flag */
export const getPairInfo = (
  baseAssetId: string,
  assetA: string,
  assetB: string
): [TradingPair, string | null, boolean] => {
  if (assetA === assetB) throw new Error(Errors.AssetsMustNotBeSame);

  const baseChameleonAssetId = getChameleonPoolBaseAssetId(baseAssetId);

  const [ta, isChameleonPool] = (() => {
    if (baseAssetId === assetA) {
      return [assetB, false];
    } else if (baseAssetId === assetB) {
      return [assetA, false];
    } else if (baseChameleonAssetId) {
      if (baseChameleonAssetId === assetA) {
        return [assetB, true];
      } else if (baseChameleonAssetId === assetB) {
        return [assetA, true];
      } else {
        throw new Error(Errors.BaseAssetIsNotMatchedWithAnyAssetArguments);
      }
    } else {
      throw new Error(Errors.BaseAssetIsNotMatchedWithAnyAssetArguments);
    }
  })();

  const tPair: TradingPair = { baseAssetId, targetAssetId: ta };
  const isAllowedChameleonPool = getChameleonPool(tPair);

  if (isChameleonPool && !isAllowedChameleonPool) {
    throw new Error(Errors.RestrictedChameleonPool);
  }

  return [tPair, baseChameleonAssetId, isAllowedChameleonPool];
};

// get_trading_pair
/** Get trading pair from assets */
export const getTradingPair = (baseAssetId: string, assetA: string, assetB: string): TradingPair => {
  const [tPair] = getPairInfo(baseAssetId, assetA, assetB);
  return tPair;
};
