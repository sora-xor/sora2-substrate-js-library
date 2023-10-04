import { FPNumber } from '@sora-substrate/math';
import { SwapVariant, LiquiditySourceTypes } from '../consts';
import { isGreaterThanZero } from '../utils';

import { SwapChunk } from '../common/primitives';

/** Info with input & output amounts for liquidity source */
type SwapInfo = Partial<Record<LiquiditySourceTypes, [FPNumber, FPNumber]>>;

type AggregatedSwapOutcome = {
  /** A distribution of amounts each liquidity sources gets to swap in the entire trade */
  distribution: Array<[LiquiditySourceTypes, FPNumber]>;
  /** The best possible output/input amount for a given trade and a set of liquidity sources */
  amount: FPNumber;
  /** Total fee amount, nominated in XOR */
  fee: FPNumber;
};

class LiquidityAggregator {
  public liquidityChunks!: Partial<Record<LiquiditySourceTypes, Array<SwapChunk>>>;
  public variant!: SwapVariant;

  constructor(variant: SwapVariant) {
    this.liquidityChunks = {};
    this.variant = variant;
  }

  public addSource(source: LiquiditySourceTypes, sortedChunks: Array<SwapChunk>) {
    this.liquidityChunks[source] = sortedChunks;
  }

  public aggregateSwapOutcome(amount: FPNumber): [SwapInfo, AggregatedSwapOutcome] | null {
    if (!Object.keys(this.liquidityChunks).length) return null;

    let remainingAmount = amount;
    let resultAmount = FPNumber.ZERO;
    let fee = FPNumber.ZERO;

    let distribution: Partial<Record<LiquiditySourceTypes, FPNumber>> = {};
    let swapInfo: SwapInfo = {};

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

      let remainingDelta = chunk.input;
      let resultDelta = chunk.output;
      let feeDelta = chunk.fee;

      swapInfo[source] = [
        (swapInfo[source][0] ?? FPNumber.ZERO).add(chunk.input),
        (swapInfo[source][1] ?? FPNumber.ZERO).add(chunk.output),
      ];

      distribution[source] = (distribution[source] ?? FPNumber.ZERO).add(remainingDelta);

      resultAmount = resultAmount.add(resultDelta);
      remainingAmount = remainingAmount.sub(remainingDelta);
      fee = fee.add(feeDelta);
    }

    return [
      swapInfo,
      {
        distribution: Object.entries(distribution).map(([source, amount]) => [source as LiquiditySourceTypes, amount]),
        amount: resultAmount,
        fee,
      },
    ];
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
