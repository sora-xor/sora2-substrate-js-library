import { FPNumber } from '@sora-substrate/math';

import { safeDivide } from '../utils';

export class SwapChunk {
  public input!: FPNumber;
  public output!: FPNumber;
  public fee!: FPNumber;

  constructor(input: FPNumber, output: FPNumber, fee: FPNumber) {
    this.input = input;
    this.output = output;
    this.fee = fee;
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
}
