
import BigNumber from 'bignumber.js'
import { Codec } from '@polkadot/types/types'

export type NumberLike = number | string

BigNumber.config({
  FORMAT: {
    decimalSeparator: '.',
    groupSeparator: '',
    fractionGroupSeparator: ''
  }
})

type NumberType = Codec | string | number | BigNumber | FPNumber

const equalizedBN = (target: FPNumber, precision: number) => {
  return target.precision === precision
    ? target.value
    : target.value.times(10 ** precision).div(10 ** target.precision)
}

export class FPNumber {
  /**
   * Zero value
   */
  public static ZERO = FPNumber.fromNatural(0)

  /**
   * Default precision = `18`
   */
  public static DEFAULT_PRECISION = 18

  /**
   * Default decimal places = `6`
   */
  public static DEFAULT_DECIMAL_PLACES = 6

  /**
   * Default round type = `3`
   *
   * `0` Rounds away from zero
   * `1` Rounds towards zero
   * `2` Rounds towards Infinity
   * `3` Rounds towards -Infinity
   * `4` Rounds towards nearest neighbour. If equidistant, rounds away from zero
   * `5` Rounds towards nearest neighbour. If equidistant, rounds towards zero
   * `6` Rounds towards nearest neighbour. If equidistant, rounds towards even neighbour
   * `7` Rounds towards nearest neighbour. If equidistant, rounds towards Infinity
   * `8` Rounds towards nearest neighbour. If equidistant, rounds towards -Infinity
   */
  public static DEFAULT_ROUND_MODE: BigNumber.RoundingMode = 3

  /**
   * Return the **max** value, `null` if an array is empty
   * @param {...FPNumber} numbers
   */
  public static max (...numbers: Array<FPNumber>): FPNumber {
    if (!numbers || !numbers.length) {
      return null
    }
    const precision = numbers[0].precision
    const filtered = numbers.map(item => equalizedBN(item, precision))
    return new FPNumber(BigNumber.max(...filtered), precision)
  }

  /**
   * Return the **min** value, `null` if an array is empty
   * @param {...FPNumber} numbers
   */
  public static min (...numbers: Array<FPNumber>): FPNumber {
    if (!numbers || !numbers.length) {
      return null
    }
    const precision = numbers[0].precision
    const filtered = numbers.map(item => equalizedBN(item, precision))
    return new FPNumber(BigNumber.min(...filtered), precision)
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
    public precision = FPNumber.DEFAULT_PRECISION
  ) {
    if (data instanceof BigNumber) {
      this.value = data
    } else if (data instanceof FPNumber) {
      this.value = data.value
      this.precision = data.precision
    } else {
      const formatted = () => {
        if (typeof data === 'number') {
          return (data * (10 ** precision)).toFixed()
        }
        if (typeof data === 'string') {
          const withoutFormatting = data.replace(/[, ]/g, '')
          const [integer, fractional] = withoutFormatting.split('.')
          let fractionalPart = ''
          if (fractional) {
            fractionalPart = fractional.length > precision
              ? fractional.substring(0, precision)
              : `${fractional}${Array(precision - fractional.length).fill(0).join('')}`
          } else {
            fractionalPart = `${Array(precision).fill(0).join('')}`
          }
          return `${integer}${fractionalPart}`
        }
        if ('toString' in (data as any)) {
          const json = data.toJSON() as any
          // `BalanceInfo` or `Balance` check
          return (json && json.balance) ? `${json.balance}`.replace(/[, ]/g, '') : data.toString()
        }
        return 0
      }
      this.value = new BigNumber(formatted()).decimalPlaces(0, FPNumber.DEFAULT_ROUND_MODE)
    }
  }

  /**
   * Format number to Codec string
   */
  public toCodecString (): string {
    return this.value.toFormat()
  }

  /**
   * Format real number (divided by precision) to string
   * @param {number} [dp=6] Decimal places deafult is 6
   */
  public toString (dp: number = FPNumber.DEFAULT_DECIMAL_PLACES): string {
    let result = this.value.div(10 ** this.precision)
    result = result.decimalPlaces(dp, FPNumber.DEFAULT_ROUND_MODE)
    return result.toFormat()
  }

  /**
   * Format real number string (divided by precision) to string
   * @param {number} [dp=6] Decimal places deafult is 6
   */
  public toFixed (dp: number = FPNumber.DEFAULT_DECIMAL_PLACES): string {
    let result = this.value.div(10 ** this.precision)
    result = result.decimalPlaces(dp, FPNumber.DEFAULT_ROUND_MODE)
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
    return this.value.decimalPlaces(dp, FPNumber.DEFAULT_ROUND_MODE).toFixed()
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
    return this.value.decimalPlaces(dp, FPNumber.DEFAULT_ROUND_MODE).toNumber()
  }

  /**
   * Format real number (divided by precision) to number
   * @param {number} [dp=6] Decimal places
   */
  public toNumber (dp: number = FPNumber.DEFAULT_DECIMAL_PLACES): number {
    let result = this.value.div(10 ** this.precision)
    result = result.decimalPlaces(dp, FPNumber.DEFAULT_ROUND_MODE)
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
      this.value.plus(equalizedBN(target, this.precision)).decimalPlaces(0, FPNumber.DEFAULT_ROUND_MODE),
      this.precision
    )
  }

  /**
   * Subtraction operator
   * @param {FPNumber} target Target number
   */
  public sub (target: FPNumber): FPNumber {
    return new FPNumber(
      this.value.minus(equalizedBN(target, this.precision)).decimalPlaces(0, FPNumber.DEFAULT_ROUND_MODE),
      this.precision
    )
  }

  /**
   * Multiplication operator
   * @param {FPNumber} target Target number
   */
  public mul (target: FPNumber): FPNumber {
    return new FPNumber(
      this.value.times(equalizedBN(target, this.precision)).div(10 ** this.precision).decimalPlaces(0, FPNumber.DEFAULT_ROUND_MODE),
      this.precision
    )
  }

  /**
   * Dividion operator
   * @param {FPNumber} target Target number
   */
  public div (target: FPNumber): FPNumber {
    return new FPNumber(
      this.value.div(equalizedBN(target, this.precision)).times(10 ** this.precision).decimalPlaces(0, FPNumber.DEFAULT_ROUND_MODE),
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
   * Return the sqrt number
   */
  public sqrt (): FPNumber {
    return new FPNumber(
      this.value.times(10 ** this.precision).sqrt().decimalPlaces(0, FPNumber.DEFAULT_ROUND_MODE),
      this.precision
    )
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
