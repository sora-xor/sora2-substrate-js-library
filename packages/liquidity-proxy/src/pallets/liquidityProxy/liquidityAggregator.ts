import { FPNumber } from '@sora-substrate/math';

import { SwapVariant, LiquiditySourceTypes } from '../../consts';
import { SwapChunk, DiscreteQuotation, SideAmount } from '../../common/primitives';

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
  public liquidityQuotations!: Map<LiquiditySourceTypes, DiscreteQuotation>;
  public variant!: SwapVariant;

  constructor(variant: SwapVariant) {
    this.liquidityQuotations = new Map();
    this.variant = variant;
  }

  public addSource(source: LiquiditySourceTypes, discreteQuotation: DiscreteQuotation) {
    this.liquidityQuotations.set(source, discreteQuotation);
  }

  // Aggregates the liquidity from the provided liquidity sources.
  // Liquidity sources provide discretized liquidity curve by chunks and then Liquidity Aggregator selects the best chunks from different sources to gain the best swap amount.
  public aggregateSwapOutcome(amount: FPNumber): AggregatedSwapOutcome | null {
    if (!this.liquidityQuotations.size) return null;

    let remainingAmount = amount;
    const lockedSources: LiquiditySourceTypes[] = [];
    const selected: Map<LiquiditySourceTypes, SwapChunk[]> = new Map();

    while (FPNumber.isGreaterThan(remainingAmount, FPNumber.ZERO)) {
      const candidates = this.findBestPriceCandidates(lockedSources);
      let source = candidates[0];

      // if there are several candidates with the same best price,
      // then we need to select the source that already been selected
      for (const candidate of candidates) {
        if (selected.has(candidate)) {
          source = candidate;
          break;
        }
      }

      let discreteQuotation = this.liquidityQuotations.get(source) as DiscreteQuotation; // [check]
      let chunk = discreteQuotation.chunks.shift() as SwapChunk;
      let payback = SwapChunk.zero();

      const total = this.sumChunks(selected.get(source) ?? []); // [check]
      const [aligned, remainder] = discreteQuotation.limits.alignExtraChunkMax(total, chunk);

      if (!remainder.isZero()) {
        // max amount (already selected + new chunk) exceeded
        chunk = aligned;
        payback = remainder;
        lockedSources.push(source);
      }

      const remainingSideAmount = new SideAmount(remainingAmount, this.variant);

      // [check]
      if (FPNumber.isGreaterThan(chunk.forCompare(remainingSideAmount), remainingSideAmount.amount)) {
        const rescaled = chunk.rescaleBySideAmount(remainingSideAmount);
        payback = payback.saturatingAdd(chunk.saturatingSub(rescaled));
        chunk = rescaled;
      }

      const remainingDelta = chunk.getAssociatedField(this.variant).amount;

      if (!payback.isZero()) {
        // push remains of the chunk back
        discreteQuotation.chunks.unshift(payback);
      }

      if (chunk.isZero()) {
        continue;
      }

      // [check]
      if (!selected.has(source)) {
        selected.set(source, []);
      }
      selected.get(source)?.push(chunk);

      remainingAmount = remainingAmount.sub(remainingDelta);

      if (remainingAmount.isZero()) {
        const toDelete: LiquiditySourceTypes[] = [];

        for (const [source, chunks] of selected.entries()) {
          const total = this.sumChunks(chunks);
          const discreteQuotation = this.liquidityQuotations.get(source) as DiscreteQuotation;
          const [aligned, remainder] = discreteQuotation.limits.alignChunk(total);

          if (!remainder.isZero()) {
            remainingAmount = remainingAmount.add(remainder.getAssociatedField(this.variant).amount);
            lockedSources.push(source);

            if (aligned.isZero()) {
              // liquidity is not enough even for the min amount
              toDelete.push(source);

              for (const chunk of [...chunks].reverse()) {
                discreteQuotation.chunks.unshift(chunk);
              }
            } else {
              const remainderSide = remainder.getAssociatedField(this.variant);

              while (FPNumber.isGreaterThan(remainderSide.amount, FPNumber.ZERO)) {
                const chunk = chunks.pop();

                if (!chunk) {
                  toDelete.push(source);
                  break;
                }

                // [check]
                if (FPNumber.isLessThanOrEqualTo(chunk.forCompare(remainderSide), remainderSide.amount)) {
                  remainderSide.amount = remainderSide.amount.sub(chunk.getAssociatedField(this.variant).amount);
                  discreteQuotation.chunks.unshift(chunk);
                } else {
                  const remainderChunk = chunk.rescaleBySideAmount(remainderSide);
                  const chunkUpdated = chunk.saturatingSub(remainderChunk);

                  chunks.push(chunkUpdated);
                  discreteQuotation.chunks.unshift(remainderChunk);
                }
              }
            }
          }
        }

        toDelete.forEach((source) => selected.delete(source));
      }
    }

    let distribution = [];
    let resultAmount = FPNumber.ZERO;
    let fee = FPNumber.ZERO;

    for (const [source, chunks] of selected.entries()) {
      const total = this.sumChunks(chunks);

      const [desiredPart, resultPart] =
        this.variant === SwapVariant.WithDesiredInput ? [total.input, total.output] : [total.output, total.input];

      distribution.push({
        market: source,
        income: desiredPart,
        outcome: resultPart,
        fee: total.fee,
      });
      resultAmount = resultAmount.add(resultPart);
      fee = fee.add(total.fee);
    }

    return {
      distribution,
      amount: resultAmount,
      fee,
    };
  }

  public findBestPriceCandidates(locked: LiquiditySourceTypes[] = []): Array<LiquiditySourceTypes> {
    let candidates: LiquiditySourceTypes[] = [];
    let max = FPNumber.ZERO;

    for (const [source, discreteQuotation] of this.liquidityQuotations.entries()) {
      // skip the locked source
      if (locked.includes(source)) continue;

      let price!: FPNumber;

      try {
        const front = discreteQuotation.chunks[0];
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

  public sumChunks(chunks: SwapChunk[]) {
    return chunks.reduce((acc, next) => acc.saturatingAdd(next));
  }
}
