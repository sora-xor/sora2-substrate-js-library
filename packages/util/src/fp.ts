
import BigNumber from 'bignumber.js'
import { Codec } from '@polkadot/types/types'

type NumberType = Codec | string | number | BigNumber | FPNumber

export class FPNumber {
  /**
   * Zero value
   */
  public static ZERO = FPNumber.fromNatural(0)

  /**
   * Default precision (18 decimals)
   */
  public static DEFAULT_PRECISION = 10 ** 18

  /**
   * Return the **max** value
   * @param {...FPNumber} numbers
   */
  public static max (...numbers: Array<FPNumber>): FPNumber {
    return new FPNumber(BigNumber.max.apply(null, numbers.map((i) => i.value)))
  }

  /**
   * Return the **min** value
   * @param {...FPNumber} numbers
   */
  public static min (...numbers: Array<FPNumber>): FPNumber {
    return new FPNumber(BigNumber.min.apply(null, numbers.map((i) => i.value)))
  }

  /**
   * Return `true` if the first value is less than the second
   * @param {FPNumber} first First number
   * @param {FPNumber} second Second number
   */
  public static isLessThan (first: FPNumber, second: FPNumber): boolean {
    return first.value.isLessThan(second.value)
  }

  /**
   * Return `true` if the first value is greater than the second
   * @param {FPNumber} first First number
   * @param {FPNumber} second Second number
   */
  public static isGreaterThan (first: FPNumber, second: FPNumber): boolean {
    return first.value.isGreaterThan(second.value)
  }

  /**
   * Return `true` if values are equal
   * @param {FPNumber} first First number
   * @param {FPNumber} second Second number
   */
  public static isEqual (first: FPNumber, second: FPNumber): boolean {
    return first.value.isEqualTo(second.value)
  }

  /**
   * Get FPNumber from real number, will multiply by precision
   * @param {(string | number)} value Target number
   * @param {number} precision Precision
   */
  public static fromNatural (value: number | string, precision: number = FPNumber.DEFAULT_PRECISION): FPNumber {
    return new FPNumber(new BigNumber(value).times(precision))
  }

  public value: BigNumber

  constructor (
    data: NumberType,
    public precision = FPNumber.DEFAULT_PRECISION
  ) {
    if (data instanceof BigNumber) {
      this.value = data
    } else if (data instanceof FPNumber) {
      this.value = data.value
      this.precision = data.precision
    } else {
      const formatted = () => {
        if (data.toString) {
          return data.toString()
        }
        if (typeof data === 'number') {
          return data * precision
        }
        if (typeof data === 'string') {
          const fractional = data.split('.')[1]
          // TODO: add check for case if fractional.length > precision
          return `${data}${10 ** (fractional ? precision - fractional.length : precision)}`
        }
        return 0
      }
      this.value = new BigNumber(formatted())
    }
  }

  /**
   * Format number to Codec string
   */
  public toCodecString (): string {
    return this.value.toString()
  }

  /**
   * Format real number (divided by precision) to string
   * @param {number} [dp=6] Decimal places deafult is 6
   */
  public toString (dp: number = 6): string {
    let result = this.value.div(this.precision)
    result = result.decimalPlaces(dp, 3)
    return result.toString()
  }

  /**
   * Format real number string (divided by precision) to string
   * @param {number} [dp=6] Decimal places deafult is 6
   */
  public toFixed (dp: number = 6): string {
    let result = this.value.div(this.precision)
    result = result.decimalPlaces(dp, 3)
    return result.toFixed()
  }

  /**
   * Format inner BigNumber value to string
   * @param {number} [dp=0] Decimal places deafult is 0
   */
  public bnToString (dp: number = 0): string {
    // Return 0 if the value is Infinity, -Infinity and NaN
    if (!this.isFinity()) {
      return '0';
    }
    return this.value.decimalPlaces(dp, 3).toFixed()
  }

  /**
   * Format inner BigNumber value to number
   * @param {number} [dp=0] - Decimal places deafult is 0
   */
  public bnToNumber (dp: number = 0): number {
    // Return 0 if the value is Infinity, -Infinity and NaN
    if (!this.isFinity()) {
      return 0
    }
    return this.value.decimalPlaces(dp, 3).toNumber()
  }

  /**
   * Format real number (divided by precision) to number
   * @param {number} [dp=6] Decimal places
   */
  public toNumber (dp: number = 6): number {
    let result = this.value.div(this.precision)
    result = result.decimalPlaces(dp, 3)
    return result.toNumber()
  }

  /**
   * Returns a FPNumber whose value is the value of this FPNumber to a maximum of decimalPlaces decimal places.
   * @param {number} [dp=precision] Decimal places
   */
  public decimalPlaces (dp: number = this.precision): FPNumber {
    return FPNumber.fromNatural(this.toNumber(dp))
  }

  /**
   * Addition operator
   * @param {FPNumber} target Target number
   */
  public add (target: FPNumber): FPNumber {
    return new FPNumber(this.value.plus(target.value).decimalPlaces(0, 3))
  }

  /**
   * Subtraction operator
   * @param {FPNumber} target Target number
   */
  public sub (target: FPNumber): FPNumber {
    return new FPNumber(this.value.minus(target.value).decimalPlaces(0, 3))
  }

  /**
   * Multiplication operator
   * @param {FPNumber} target Target number
   */
  public mul (target: FPNumber): FPNumber {
    const value = this.value.times(target.value).div(this.precision).decimalPlaces(0, 3)
    return new FPNumber(value)
  }

  /**
   * Dividion operator
   * @param {FPNumber} target Target number
   */
  public div (target: FPNumber): FPNumber {
    const value = this.value.div(target.value).times(this.precision).decimalPlaces(0, 3)
    return new FPNumber(value)
  }

  /**
   * Return the nagetive number
   */
  public negative (): FPNumber {
    return new FPNumber(this.value.negated())
  }

  /**
   * Return `true` if the value of inner is NaN
   */
  public isNaN (): boolean {
    return this.value.isNaN()
  }

  /**
   * Return `true` if the value of inner is finity, only return `false` when the value is `NaN`, `-Infinity` or `Infinity`.
   */
  public isFinity (): boolean {
    return this.value.isFinite()
  }

  /**
   * Return `true` if the value is 0
   */
  public isZero (): boolean {
    return this.value.isZero()
  }
}
