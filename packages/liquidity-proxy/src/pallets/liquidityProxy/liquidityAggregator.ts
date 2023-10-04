import { FPNumber } from '@sora-substrate/math';

import { SwapVariant, LiquiditySourceTypes } from '../../consts';
import { isGreaterThanZero } from '../../utils';
import { SwapChunk } from '../../common/primitives';

import type { DistributionChunk } from '../../types';

type AggregatedSwapOutcome = {
  /** A distribution of amounts each liquidity sources gets to swap in the entire trade */
  distribution: Array<DistributionChunk>;
  /** The best possible output/input amount for a given trade and a set of liquidity sources */
  amount: FPNumber;
  /** Total fee amount, nominated in XOR */
  fee: FPNumber;
};

export class LiquidityAggregator {
  public liquidityChunks!: Partial<Record<LiquiditySourceTypes, Array<SwapChunk>>>;
  public variant!: SwapVariant;

  constructor(variant: SwapVariant) {
    this.liquidityChunks = {};
    this.variant = variant;
  }

  public addSource(source: LiquiditySourceTypes, sortedChunks: Array<SwapChunk>) {
    this.liquidityChunks[source] = sortedChunks;
  }

  public aggregateSwapOutcome(amount: FPNumber): AggregatedSwapOutcome | null {
    if (!Object.keys(this.liquidityChunks).length) return null;

    let remainingAmount = amount;
    let resultAmount = FPNumber.ZERO;
    let fee = FPNumber.ZERO;

    let distribution: Partial<Record<LiquiditySourceTypes, DistributionChunk>> = {};

    while (isGreaterThanZero(remainingAmount)) {
      let candidates = this.findBestPriceCandidates();
      let source = candidates[0];

      // if there are several candidates with the same best price,
      // then we need to select the source that already been selected
      for (const candidate of candidates) {
        if (Object.keys(distribution).includes(candidate)) {
          source = candidate;
          break;
        }
      }

      let chunk = this.liquidityChunks[source].shift();

      if (this.variant === SwapVariant.WithDesiredInput) {
        if (FPNumber.isLessThan(remainingAmount, chunk.input)) {
          chunk = chunk.rescaleByInput(remainingAmount);
        }
      } else {
        if (FPNumber.isLessThan(remainingAmount, chunk.output)) {
          chunk = chunk.rescaleByOutput(remainingAmount);
        }
      }

      const remainingDelta = chunk.input;
      const resultDelta = chunk.output;
      const feeDelta = chunk.fee;

      if (!distribution[source]) {
        distribution[source] = {
          source,
          income: FPNumber.ZERO,
          outcome: FPNumber.ZERO,
          fee: FPNumber.ZERO,
        };
      }

      distribution[source].income.add(remainingDelta);
      distribution[source].outcome.add(resultDelta);
      distribution[source].fee.add(feeDelta);

      resultAmount = resultAmount.add(resultDelta);
      remainingAmount = remainingAmount.sub(remainingDelta);
      fee = fee.add(feeDelta);
    }

    return {
      distribution: Object.values(distribution),
      amount: resultAmount,
      fee,
    };
  }

  public findBestPriceCandidates(): Array<LiquiditySourceTypes> {
    let candidates = [];
    let max = FPNumber.ZERO;

    for (const [source, chunks] of Object.entries(this.liquidityChunks)) {
      let price!: FPNumber;

      try {
        const front = chunks[0];
        price = front.price;
      } catch {
        continue;
      }

      if (FPNumber.isEqualTo(price, max)) {
        candidates.push(source);
      }

      if (FPNumber.isGreaterThan(price, max)) {
        candidates = [];
        max = price;
        candidates.push(source);
      }
    }

    return candidates;
  }
}
