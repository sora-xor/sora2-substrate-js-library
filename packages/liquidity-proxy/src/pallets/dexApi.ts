import { LiquiditySourceTypes } from '../consts';
import { LiquidityRegistry } from './liquidityProxy/liquidityRegistry';

import type { QuotePayload } from '../types';

/**
 * Liquidity sources for direct exchange between two asssets
 */
export const listLiquiditySources = (
  baseAssetId: string,
  syntheticBaseAssetId: string,
  inputAssetId: string,
  outputAssetId: string,
  selectedSources: LiquiditySourceTypes[] = [],
  payload: QuotePayload
): Array<LiquiditySourceTypes> => {
  const sources = Object.values(LiquiditySourceTypes).filter((source) => {
    return (
      !payload.lockedSources.includes(source) &&
      LiquidityRegistry.canExchange(source)(baseAssetId, syntheticBaseAssetId, inputAssetId, outputAssetId, payload)
    );
  });

  if (!selectedSources.length) return sources;

  return sources.filter((source) => selectedSources.includes(source));
};
