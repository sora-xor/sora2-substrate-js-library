import { FPNumber } from '@sora-substrate/math';

import { SwapVariant } from '../consts';
import { safeDivide } from '../utils';

export class SideAmount {
  public amount!: FPNumber;
  public variant!: SwapVariant;

  constructor(amount: FPNumber, variant: SwapVariant) {
    this.amount = amount;
    this.variant = variant;
  }

  get isInput(): boolean {
    return this.variant === SwapVariant.WithDesiredInput;
  }
}

export class SwapChunk {
  public input!: FPNumber;
  public output!: FPNumber;
  public fee!: FPNumber;

  constructor(input: FPNumber, output: FPNumber, fee: FPNumber) {
    this.input = input;
    this.output = output;
    this.fee = fee;
  }

  public getAssociatedField(swapVariant: SwapVariant): SideAmount {
    if (swapVariant === SwapVariant.WithDesiredInput) {
      return new SideAmount(this.input, SwapVariant.WithDesiredInput);
    } else {
      return new SideAmount(this.output, SwapVariant.WithDesiredOutput);
    }
  }

  public eq(other: SideAmount): boolean {
    if (other.isInput) {
      return FPNumber.isEqualTo(this.input, other.amount);
    } else {
      return FPNumber.isEqualTo(this.output, other.amount);
    }
  }

  public zero(): SwapChunk {
    return new SwapChunk(FPNumber.ZERO, FPNumber.ZERO, FPNumber.ZERO);
  }

  public isZero(): boolean {
    return this.input.isZero() && this.output.isZero() && this.fee.isZero();
  }

  /** Calculates a price of the chunk */
  get price(): FPNumber {
    return safeDivide(this.output, this.input);
  }

  /**
   * Calculates a linearly proportional input amount depending on the price and an output amount.
   * `output` attribute must be less than or equal to `self.output`
   */
  public proportionalInput(output: FPNumber): FPNumber {
    if (output.isZero()) return FPNumber.ZERO;

    return safeDivide(output, this.price);
  }

  /**
   * Calculates a linearly proportional output amount depending on the price and an input amount.
   * `input` attribute must be less than or equal to `self.input`
   */
  public proportionalOutput(input: FPNumber): FPNumber {
    if (input.isZero()) return FPNumber.ZERO;

    return input.mul(this.price);
  }

  public rescaleByInput(input: FPNumber): SwapChunk {
    const output = this.proportionalOutput(input);
    const ratio = safeDivide(input, this.input);
    const fee = this.fee.mul(ratio);

    return new SwapChunk(input, output, fee);
  }

  public rescaleByOutput(output: FPNumber): SwapChunk {
    const input = this.proportionalInput(output);
    const ratio = safeDivide(output, this.output);
    const fee = this.fee.mul(ratio);

    return new SwapChunk(input, output, fee);
  }

  public rescaleByRatio(ratio: FPNumber) {
    const input = this.input.mul(ratio);
    const output = this.output.mul(ratio);
    const fee = this.fee.mul(ratio);

    return new SwapChunk(input, output, fee);
  }

  public rescaleBySideAmount(amount: SideAmount) {
    if (amount.isInput) {
      return this.rescaleByInput(amount.amount);
    } else {
      return this.rescaleByOutput(amount.amount);
    }
  }

  public saturatingAdd(chunk: SwapChunk) {
    return new SwapChunk(this.input.add(chunk.input), this.output.add(chunk.output), this.fee.add(chunk.fee));
  }

  // is greater or equal than 0 ?
  public saturatingSub(chunk: SwapChunk) {
    return new SwapChunk(this.input.sub(chunk.input), this.output.sub(chunk.output), this.fee.sub(chunk.fee));
  }
}

type SideAmountOption = SideAmount | null;

export class SwapLimits {
  /// The amount of swap cannot be less than `min_amount` if it's defined
  public minAmount!: SideAmountOption;
  /// The amount of swap cannot be more than `max_amount` if it's defined
  public maxAmount!: SideAmountOption;
  /// The amount of swap must be a multiplier of `amount_precision` if it's defined
  public amountPrecision!: SideAmountOption;

  constructor(minAmount: SideAmountOption, maxAmount: SideAmountOption, amountPrecision: SideAmountOption) {
    this.minAmount = minAmount;
    this.maxAmount = maxAmount;
    this.amountPrecision = amountPrecision;
  }

  // Aligns the `chunk` regarding to the `min_amount` limit.
  // Returns the aligned chunk and the remainder
  alignChunkMin(chunk: SwapChunk) {
    const min = this.minAmount;

    if (min) {
      if (min.isInput) {
        if (FPNumber.isLessThan(chunk.input, min.amount)) {
          return [null, chunk];
        }
      } else {
        if (FPNumber.isLessThan(chunk.output, min.amount)) {
          return [null, chunk];
        }
      }
    }

    return [chunk, null]; // Zero::zero() ?
  }

  // Aligns the `chunk` regarding to the `max_amount` limit.
  // Returns the aligned chunk and the remainder
  alignChunkMax(chunk: SwapChunk) {
    const max = this.maxAmount;

    if (max) {
      if (max.isInput) {
        if (FPNumber.isGreaterThan(chunk.input, max.amount)) {
          const rescaled = chunk.rescaleByInput(max.amount);
          const remainder = chunk.saturatingSub(rescaled);
          return [rescaled, remainder];
        }
      } else {
        if (FPNumber.isGreaterThan(chunk.output, max.amount)) {
          const rescaled = chunk.rescaleByOutput(max.amount);
          const remainder = chunk.saturatingSub(rescaled);
          return [rescaled, remainder];
        }
      }
    }

    return [chunk, null]; // Zero::zero() ?
  }

  // Aligns the extra `chunk` regarding to the `max_amount` limit taking into account in calculations the accumulator `acc` values.
  // Returns the aligned chunk and the remainder
  alignExtraChunkMax(acc: SwapChunk, chunk: SwapChunk) {
    const max = this.maxAmount;

    if (max) {
      if (max.isInput) {
        if (FPNumber.isGreaterThan(acc.input.add(chunk.input), max.amount)) {
          const diff = max.amount.sub(acc.input);
          const rescaled = chunk.rescaleByInput(diff);
          const remainder = chunk.saturatingSub(rescaled);
          return [rescaled, remainder];
        }
      } else {
        if (FPNumber.isGreaterThan(acc.output.sub(chunk.output), max.amount)) {
          const diff = max.amount.sub(acc.output);
          const rescaled = chunk.rescaleByOutput(diff);
          const remainder = chunk.saturatingSub(rescaled);
          return [rescaled, remainder];
        }
      }
    }

    return [chunk, null]; // Zero::zero() ?
  }

  // Aligns the `chunk` regarding to the `amount_precision` limit.
  // Returns the aligned chunk and the remainder
  alignChunkPrecision(chunk: SwapChunk) {
    const precision = this.amountPrecision;

    if (precision) {
      if (precision.isInput) {
        if (!chunk.input.isZeroMod(precision.amount)) {
          const count = Math.floor(safeDivide(chunk.input, precision.amount).toNumber());
          const aligned = FPNumber.fromNatural(count).mul(precision.amount);
          const rescaled = chunk.rescaleByInput(aligned);
          const remainder = chunk.saturatingSub(rescaled);
          return [rescaled, remainder];
        }
      } else {
        if (!chunk.output.isZeroMod(precision.amount)) {
          const count = Math.floor(safeDivide(chunk.output, precision.amount).toNumber());
          const aligned = FPNumber.fromNatural(count).mul(precision.amount);
          const rescaled = chunk.rescaleByOutput(aligned);
          const remainder = chunk.saturatingSub(rescaled);
          return [rescaled, remainder];
        }
      }
    }

    return [chunk, null]; // Zero::zero() ?
  }

  // Aligns the `chunk` regarding to the limits.
  // Returns the aligned chunk and the remainder
  alignChunk(chunk: SwapChunk) {
    let rescaled!: SwapChunk | null;
    let remainder!: SwapChunk | null;

    [rescaled, remainder] = this.alignChunkMin(chunk);
    if (remainder) return [rescaled, remainder];

    [rescaled, remainder] = this.alignChunkMax(chunk);
    if (remainder) return [rescaled, remainder];

    [rescaled, remainder] = this.alignChunkPrecision(chunk);
    if (remainder) return [rescaled, remainder];

    return [chunk, null];
  }
}

// Discrete result of quotation
export class DiscreteQuotation {
  public chunks!: SwapChunk[];
  public limits!: SwapLimits;

  constructor() {
    this.chunks = [];
    this.limits = new SwapLimits(null, null, null);
  }
}
