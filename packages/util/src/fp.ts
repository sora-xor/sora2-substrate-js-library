
import BigNumber from 'bignumber.js'
import { Codec } from '@polkadot/types/types'

type NumberType = Codec | string | number | BigNumber | FPNumber

const equalizedBN = (target: FPNumber, precision: number) => {
  return target.precision === precision
    ? target.value
    : target.value.times(10 ** precision).div(10 ** target.precision)
}

const checkPrecisionEquality = (numbers: Array<FPNumber>) => {
  if (!numbers || !numbers.length) {
    return false
  }
  const precision = numbers[0].precision
  return numbers.every(num => num.precision === precision)
}

export class FPNumber {
  /**
   * Zero value
   */
  public static ZERO = FPNumber.fromNatural(0)

  /**
   * Default precision
   */
  public static DEFAULT_PRECISION = 18

  /**
   * Return the **max** value, `null` if precision will be different or an array is empty
   * @param {...FPNumber} numbers
   */
  public static max (...numbers: Array<FPNumber>): FPNumber {
    if (!checkPrecisionEquality(numbers)) {
      return null
    }
    return new FPNumber(BigNumber.max.apply(null, numbers.map((i) => i.value)))
  }

  /**
   * Return the **min** value, `null` if precision will be different or an array is empty
   * @param {...FPNumber} numbers
   */
  public static min (...numbers: Array<FPNumber>): FPNumber {
    if (!checkPrecisionEquality(numbers)) {
      return null
    }
    return new FPNumber(BigNumber.min.apply(null, numbers.map((i) => i.value)))
  }

  /**
   * Return `true` if the first value is less than the second
   * @param {FPNumber} first First number
   * @param {FPNumber} second Second number
   */
  public static isLessThan (first: FPNumber, second: FPNumber): boolean {
    return first.value.isLessThan(equalizedBN(second, first.precision))
  }

  /**
   * Return `true` if the first value is greater than the second
   * @param {FPNumber} first First number
   * @param {FPNumber} second Second number
   */
  public static isGreaterThan (first: FPNumber, second: FPNumber): boolean {
    return first.value.isGreaterThan(equalizedBN(second, first.precision))
  }

  /**
   * Return `true` if values are equal
   * @param {FPNumber} first First number
   * @param {FPNumber} second Second number
   */
  public static isEqual (first: FPNumber, second: FPNumber): boolean {
    return first.value.isEqualTo(equalizedBN(second, first.precision))
  }

  /**
   * Get FPNumber from real number, will multiply by precision
   * @param {(string | number)} value Target number
   * @param {number} precision Precision
   */
  public static fromNatural (value: number | string, precision: number = FPNumber.DEFAULT_PRECISION): FPNumber {
    return new FPNumber(new BigNumber(value).times(10 ** precision))
  }

  public value: BigNumber

  constructor (
    data: NumberType,
    public precision = 18
  ) {
    if (data instanceof BigNumber) {
      this.value = data
    } else if (data instanceof FPNumber) {
      this.value = data.value
      this.precision = data.precision
    } else {
      const formatted = () => {
        if (typeof data === 'number') {
          return data * (10 ** precision)
        }
        if (typeof data === 'string') {
          const [integer, fractional] = data.split('.')
          let fractionalPart = ''
          if (fractional) {
            fractionalPart = fractional.length > precision
              ? fractional.substring(0, precision)
              : `${fractional}${Array(fractional ? precision - fractional.length : precision).fill(0).join('')}`
          }
          return `${integer}${fractionalPart}`
        }
        if ('toString' in (data as any)) {
          return data.toString()
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
    let result = this.value.div(10 ** this.precision)
    result = result.decimalPlaces(dp, 3)
    return result.toString()
  }

  /**
   * Format real number string (divided by precision) to string
   * @param {number} [dp=6] Decimal places deafult is 6
   */
  public toFixed (dp: number = 6): string {
    let result = this.value.div(10 ** this.precision)
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
    let result = this.value.div(10 ** this.precision)
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
    return new FPNumber(
      this.value.plus(equalizedBN(target, this.precision)).decimalPlaces(0, 3),
      this.precision
    )
  }

  /**
   * Subtraction operator
   * @param {FPNumber} target Target number
   */
  public sub (target: FPNumber): FPNumber {
    return new FPNumber(
      this.value.minus(equalizedBN(target, this.precision)).decimalPlaces(0, 3),
      this.precision
    )
  }

  /**
   * Multiplication operator
   * @param {FPNumber} target Target number
   */
  public mul (target: FPNumber): FPNumber {
    return new FPNumber(
      this.value.times(equalizedBN(target, this.precision)).div(10 ** this.precision).decimalPlaces(0, 3),
      this.precision
    )
  }

  /**
   * Dividion operator
   * @param {FPNumber} target Target number
   */
  public div (target: FPNumber): FPNumber {
    return new FPNumber(
      this.value.div(equalizedBN(target, this.precision)).times(10 ** this.precision).decimalPlaces(0, 3),
      this.precision
    )
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
