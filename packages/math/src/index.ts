import BigNumber from 'bignumber.js';
import isNil from 'lodash/fp/isNil';
import type { Codec } from '@polkadot/types/types';

export type CodecString = string;
export type NumberLike = number | string;

BigNumber.config({
  FORMAT: {
    decimalSeparator: '.',
    groupSeparator: '',
    fractionGroupSeparator: '',
  },
});

type NumberType = Codec | string | number | BigNumber | FPNumber;

const equalizedBN = (target: FPNumber, precision: number) => {
  return target.precision === precision
    ? target.value
    : target.value.times(10 ** precision).div(10 ** target.precision);
};

const checkFinityString = (str: string) => !['-Infinity', 'Infinity', 'NaN'].includes(str);

export class FPNumber {
  /**
   * Numbers' delimiters config
   */
  public static DELIMITERS_CONFIG = {
    thousand: ',',
    decimal: '.',
  };

  /**
   * Default precision = `18`
   */
  public static DEFAULT_PRECISION = 18;

  /**
   * Default decimal places = `7`
   */
  public static DEFAULT_DECIMAL_PLACES = 7;

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
  public static DEFAULT_ROUND_MODE: BigNumber.RoundingMode = 3;

  /** Zero value (0) */
  public static ZERO = FPNumber.fromNatural(0);
  /** One value (1) */
  public static ONE = FPNumber.fromNatural(1);
  /** Two value (2) */
  public static TWO = FPNumber.fromNatural(2);
  /** Three value (3) */
  public static THREE = FPNumber.fromNatural(3);
  /** Four value (4) */
  public static FOUR = FPNumber.fromNatural(4);
  /** Five value (5) */
  public static FIVE = FPNumber.fromNatural(5);
  /** Ten value (10) */
  public static TEN = FPNumber.fromNatural(10);
  /** Hundred value (100) */
  public static HUNDRED = FPNumber.fromNatural(100);
  /** Thousand value (1000) */
  public static THOUSAND = FPNumber.fromNatural(1000);
  /**
   * Return the **max** value, `null` if an array is empty
   * @param {...FPNumber} numbers
   */
  public static max(...numbers: Array<FPNumber>): FPNumber | null {
    if (!numbers || !numbers.length) {
      return null;
    }
    const precision = numbers[0].precision;
    const filtered = numbers.map((item) => equalizedBN(item, precision));
    return new FPNumber(BigNumber.max(...filtered), precision);
  }

  /**
   * Return the **min** value, `null` if an array is empty
   * @param {...FPNumber} numbers
   */
  public static min(...numbers: Array<FPNumber>): FPNumber | null {
    if (!numbers?.length) {
      return null;
    }
    const precision = numbers[0].precision;
    const filtered = numbers.map((item) => equalizedBN(item, precision));
    return new FPNumber(BigNumber.min(...filtered), precision);
  }

  /**
   * Return `true` if the first value is less than the second
   * @param {FPNumber} first First number
   * @param {FPNumber} second Second number
   */
  public static lt(first: FPNumber, second: FPNumber): boolean {
    return first.value.lt(equalizedBN(second, first.precision));
  }

  /**
   * Return `true` if the first value is less than the second
   * @param {FPNumber} first First number
   * @param {FPNumber} second Second number
   */
  public static isLessThan = FPNumber.lt;

  /**
   * Return `true` if the first value is less of equal than the second
   * @param {FPNumber} first First number
   * @param {FPNumber} second Second number
   */
  public static lte(first: FPNumber, second: FPNumber): boolean {
    return first.value.lte(equalizedBN(second, first.precision));
  }

  /**
   * Return `true` if the first value is less of equal than the second
   * @param {FPNumber} first First number
   * @param {FPNumber} second Second number
   */
  public static isLessThanOrEqualTo = FPNumber.lte;

  /**
   * Return `true` if the first value is greater than the second
   * @param {FPNumber} first First number
   * @param {FPNumber} second Second number
   */
  public static gt(first: FPNumber, second: FPNumber): boolean {
    return first.value.gt(equalizedBN(second, first.precision));
  }

  /**
   * Return `true` if the first value is greater than the second
   * @param {FPNumber} first First number
   * @param {FPNumber} second Second number
   */
  public static isGreaterThan = FPNumber.gt;

  /**
   * Return `true` if the first value is greater or equal than the second
   * @param {FPNumber} first First number
   * @param {FPNumber} second Second number
   */
  public static gte(first: FPNumber, second: FPNumber): boolean {
    return first.value.gte(equalizedBN(second, first.precision));
  }

  /**
   * Return `true` if the first value is greater or equal than the second
   * @param {FPNumber} first First number
   * @param {FPNumber} second Second number
   */
  public static isGreaterThanOrEqualTo = FPNumber.gte;

  /**
   * Return `true` if values are equal
   * @param {FPNumber} first First number
   * @param {FPNumber} second Second number
   */
  public static eq(first: FPNumber, second: FPNumber): boolean {
    return first.value.eq(equalizedBN(second, first.precision));
  }

  /**
   * Return `true` if values are equal
   * @param {FPNumber} first First number
   * @param {FPNumber} second Second number
   */
  public static isEqualTo = FPNumber.eq;

  /**
   * Get FPNumber from real number, will multiply by precision
   * @param {(string | number)} value Target number
   * @param {number} precision Precision
   */
  public static fromNatural(value: number | string, precision: number = FPNumber.DEFAULT_PRECISION): FPNumber {
    return new FPNumber(value, precision);
  }

  /**
   * Get FPNumber from codec value
   * @param {(string | number)} value Codec value `(value * 10^precision)`
   * @param {number} precision Precision
   */
  public static fromCodecValue(value: number | string, precision: number = FPNumber.DEFAULT_PRECISION): FPNumber {
    const filtered = typeof value === 'string' ? value.replace(/[, ]/g, '') : value;
    return new FPNumber(new BigNumber(filtered), precision);
  }

  public value: BigNumber;

  /**
   * Supports `data` as `string`, `number`, `BigNumber`, `FPNumber` and `Codec` data types.
   * It's better not to use `number` parameter as data if you want the strict rules for rounding
   * @param data
   * @param precision
   */
  constructor(data: NumberType, public precision = FPNumber.DEFAULT_PRECISION) {
    if (data instanceof BigNumber) {
      this.value = data;
    } else if (data instanceof FPNumber) {
      this.value = data.value;
      this.precision = data.precision;
    } else {
      const formatted = () => {
        if (typeof data === 'number') {
          return (data * 10 ** precision).toFixed();
        }
        if (typeof data === 'string') {
          if (!checkFinityString(data)) {
            return data;
          }
          const withoutFormatting = data.replace(/[, ]/g, '');
          const [integer, fractional] = withoutFormatting.split('.');
          let fractionalPart = '';
          if (fractional) {
            fractionalPart =
              fractional.length > precision
                ? fractional.substring(0, precision)
                : `${fractional}${Array(precision - fractional.length)
                    .fill(0)
                    .join('')}`;
          } else {
            fractionalPart = `${Array(precision).fill(0).join('')}`;
          }
          return `${integer}${fractionalPart}`;
        }
        if ('toString' in (data as any)) {
          const json = data.toJSON() as any;
          // `BalanceInfo` or `Balance` check
          return json && !isNil(json.balance) ? `${json.balance}`.replace(/[, ]/g, '') : data.toString();
        }
        return 0;
      };
      this.value = new BigNumber(formatted()).dp(0, FPNumber.DEFAULT_ROUND_MODE);
    }
  }

  /**
   * Format number to Codec string
   */
  public toCodecString(): string {
    return this.value.toFormat();
  }

  public format(dp = FPNumber.DEFAULT_DECIMAL_PLACES, format?: BigNumber.Format): string {
    const value = this.value.div(10 ** this.precision);
    if (value.isZero()) {
      return format ? value.toFormat(format) : value.toFormat();
    }
    let formatted = value.dp(dp, FPNumber.DEFAULT_ROUND_MODE);
    if (formatted.isZero()) {
      // First significant character
      formatted = new BigNumber(value.toFormat().replace(/(0\.0*[1-9])([0-9]*)/, '$1'));
    }
    return format ? formatted.toFormat(format) : formatted.toFormat();
  }

  public toLocaleString(): string {
    let [integer, decimal] = this.format().split('.');

    if (integer.length > 3) {
      const integerReversed = integer.split('').reverse();
      const lastIndex = integerReversed.length - 1;
      integer = integerReversed
        .reduce((prev, current, index) => {
          prev += current;
          if (++index % 3 === 0 && index !== integerReversed.length) {
            // Avoid thousands' delimiter for negative numbers
            if (index === lastIndex && integerReversed[lastIndex] === '-') {
              return prev;
            }
            prev += FPNumber.DELIMITERS_CONFIG.thousand;
          }
          return prev;
        })
        .split('')
        .reverse()
        .join('');
    }

    return decimal ? integer.concat(FPNumber.DELIMITERS_CONFIG.decimal, decimal) : integer;
  }

  /**
   * Format real number (divided by precision) to string
   */
  public toString(): string {
    const result = this.value.div(10 ** this.precision);
    return result.toFormat();
  }

  /**
   * Format real number string (divided by precision) to fixed string (like `Number.toFixed`)
   * @param {number} [dp=4] Decimal places deafult is 4
   */
  public toFixed(dp: number = 4): string {
    const result = this.value.div(10 ** this.precision);
    return result.toFixed(dp, FPNumber.DEFAULT_ROUND_MODE);
  }

  /**
   * Format inner BigNumber value to string
   * @param {number} [dp=0] Decimal places deafult is 0
   */
  public bnToString(dp: number = 0): string {
    // Return 0 if the value is Infinity, -Infinity and NaN
    if (!this.isFinity()) {
      return '0';
    }
    return this.value.dp(dp, FPNumber.DEFAULT_ROUND_MODE).toFixed();
  }

  /**
   * Format inner BigNumber value to number
   * @param {number} [dp=0] - Decimal places deafult is 0
   */
  public bnToNumber(dp: number = 0): number {
    // Return 0 if the value is Infinity, -Infinity and NaN
    if (!this.isFinity()) {
      return 0;
    }
    return this.value.dp(dp, FPNumber.DEFAULT_ROUND_MODE).toNumber();
  }

  /**
   * Format real number (divided by precision) to number
   * @param {number} [dp=6] Decimal places
   */
  public toNumber(dp: number = FPNumber.DEFAULT_DECIMAL_PLACES): number {
    let result = this.value.div(10 ** this.precision);
    result = result.dp(dp, FPNumber.DEFAULT_ROUND_MODE);
    return result.toNumber();
  }

  /**
   * Returns a FPNumber whose value is the value of this FPNumber to a maximum of decimalPlaces decimal places.
   * @param {number} [dp=precision] Decimal places
   */
  public dp(dp: number = this.precision): FPNumber {
    return FPNumber.fromNatural(this.toNumber(dp));
  }

  /**
   * Addition operator
   * @param {FPNumber} target Target number
   */
  public add(target: FPNumber): FPNumber {
    return new FPNumber(
      this.value.plus(equalizedBN(target, this.precision)).dp(0, FPNumber.DEFAULT_ROUND_MODE),
      this.precision
    );
  }

  /**
   * Subtraction operator
   * @param {FPNumber} target Target number
   */
  public sub(target: FPNumber): FPNumber {
    return new FPNumber(
      this.value.minus(equalizedBN(target, this.precision)).dp(0, FPNumber.DEFAULT_ROUND_MODE),
      this.precision
    );
  }

  /**
   * Multiplication operator
   * @param {FPNumber} target Target number
   */
  public mul(target: FPNumber): FPNumber {
    return new FPNumber(
      this.value
        .times(equalizedBN(target, this.precision))
        .div(10 ** this.precision)
        .dp(0, FPNumber.DEFAULT_ROUND_MODE),
      this.precision
    );
  }

  /**
   * Dividion operator
   * @param {FPNumber} target Target number
   */
  public div(target: FPNumber): FPNumber {
    return new FPNumber(
      this.value
        .div(equalizedBN(target, this.precision))
        .times(10 ** this.precision)
        .dp(0, FPNumber.DEFAULT_ROUND_MODE),
      this.precision
    );
  }

  /**
   * Mod operator TODO: Add tests
   * @param {FPNumber} target Target number
   */
  public mod(target: FPNumber): FPNumber {
    return new FPNumber(
      this.value.mod(equalizedBN(target, this.precision)).dp(0, FPNumber.DEFAULT_ROUND_MODE),
      this.precision
    );
  }

  /**
   * Returns `true` if mod operation returns zero.
   *
   * For instance, 4 % 2 = 0, so it returns `true` in this case.
   *
   * TODO: Add tests
   * @param {FPNumber} target Target number
   */
  public isZeroMod(target: FPNumber): boolean {
    return new FPNumber(
      this.value
        .mod(equalizedBN(target, this.precision))
        .times(10 ** this.precision)
        .dp(0, FPNumber.DEFAULT_ROUND_MODE),
      this.precision
    ).isZero();
  }

  /**
   * Return the nagetive number
   */
  public negative(): FPNumber {
    return new FPNumber(this.value.negated());
  }

  /**
   * Return the sqrt number
   */
  public sqrt(): FPNumber {
    return new FPNumber(
      this.value
        .times(10 ** this.precision)
        .sqrt()
        .dp(0, FPNumber.DEFAULT_ROUND_MODE),
      this.precision
    );
  }

  /**
   * Return `true` if the value of inner is NaN
   */
  public isNaN(): boolean {
    return this.value.isNaN();
  }

  /**
   * Return `true` if the value of inner is finity, only return `false` when the value is `NaN`, `-Infinity` or `Infinity`.
   */
  public isFinity(): boolean {
    return this.value.isFinite();
  }

  /**
   * Return `true` if the value is 0
   */
  public isZero(): boolean {
    return this.value.isZero();
  }

  /**
   * Return `true` if the value is less than 0
   */
  public isLtZero(): boolean {
    return this.lt(FPNumber.ZERO);
  }

  /**
   * Return `true` if the value is less than or equal to 0
   */
  public isLteZero(): boolean {
    return this.lte(FPNumber.ZERO);
  }

  /**
   * Return `true` if the value is greater than 0
   */
  public isGtZero(): boolean {
    return this.gt(FPNumber.ZERO);
  }

  /**
   * Return `true` if the value is greater than or equal to 0
   */
  public isGteZero(): boolean {
    return this.gte(FPNumber.ZERO);
  }

  /**
   * Return the **max** value (this number or the number from params)
   * @param {Array<FPNumber>} numbers Other numbers
   */
  public max(...numbers: Array<FPNumber>): FPNumber {
    return FPNumber.max(this, ...numbers);
  }

  /**
   * Return the **min** value (this number or the number from params)
   * @param {Array<FPNumber>} numbers Other numbers
   */
  public min(...numbers: Array<FPNumber>): FPNumber {
    return FPNumber.min(this, ...numbers);
  }

  /**
   * Return `true` if this number is less than the number from param
   * @param {FPNumber} number Another number
   */
  public lt(number: FPNumber): boolean {
    return FPNumber.lt(this, number);
  }

  /**
   * Return `true` if this number is less than the number from param
   * @param {FPNumber} number Another number
   */
  public isLessThan = this.lt;

  /**
   * Return `true` if this number is less of equal than the number from param
   * @param {FPNumber} number Another number
   */
  public lte(number: FPNumber): boolean {
    return FPNumber.lte(this, number);
  }

  /**
   * Return `true` if this number is less of equal than the number from param
   * @param {FPNumber} number Another number
   */
  public isLessThanOrEqualTo = this.lte;

  /**
   * Return `true` if this number is greater than the number from param
   * @param {FPNumber} number Another number
   */
  public gt(number: FPNumber): boolean {
    return FPNumber.gt(this, number);
  }

  /**
   * Return `true` if this number is greater than the number from param
   * @param {FPNumber} number Another number
   */
  public isGreaterThan = this.gt;

  /**
   * Return `true` if this number is greater or equal than the number from param
   * @param {FPNumber} number Another number
   */
  public gte(number: FPNumber): boolean {
    return FPNumber.gte(this, number);
  }

  /**
   * Return `true` if this number is greater or equal than the number from param
   * @param {FPNumber} number Another number
   */
  public isGreaterThanOrEqualTo = this.gte;

  /**
   * Return `true` if values are equal
   * @param {FPNumber} number Another number
   */
  public eq(number: FPNumber): boolean {
    return FPNumber.eq(this, number);
  }

  /**
   * Return `true` if values are equal
   * @param {FPNumber} number Another number
   */
  public isEqualTo = this.eq;
}
