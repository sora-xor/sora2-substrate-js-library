import BigNumber from 'bignumber.js';
import isNil from 'lodash/fp/isNil';
import type { AnyJson, Codec } from '@polkadot/types/types';

/**
 * Use just to highlight the visual difference across the "string" itself.
 * It's just impossible to specify the type
 */
export type CodecString = string; // NOSONAR
export type NumberLike = number | string;

BigNumber.config({
  FORMAT: {
    decimalSeparator: '.',
    groupSeparator: '',
    fractionGroupSeparator: '',
  },
});

type NumberType = Codec | string | number | BigNumber | FPNumber;

const isFinityString = (str: string) => !['-Infinity', 'Infinity', 'NaN'].includes(str);
const isZeroString = (str: string) => str === '0' || str === '-0';

export class FPNumber {
  /**
   * Numbers' delimiters config. Might be edited to support different locales
   */
  // prettier-ignore
  public static DELIMITERS_CONFIG = { // NOSONAR
    thousand: ',',
    decimal: '.',
  };

  /**
   * Default precision = `18`. Might be modified
   */
  public static DEFAULT_PRECISION = 18; // NOSONAR

  /**
   * Default decimal places = `7`. Might be modified
   */
  public static DEFAULT_DECIMAL_PLACES = 7; // NOSONAR

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
  public static DEFAULT_ROUND_MODE: BigNumber.RoundingMode = 3; // NOSONAR

  /** Zero value (0) */
  public static readonly ZERO = FPNumber.fromNatural(0);
  /** One value (1) */
  public static readonly ONE = FPNumber.fromNatural(1);
  /** Two value (2) */
  public static readonly TWO = FPNumber.fromNatural(2);
  /** Three value (3) */
  public static readonly THREE = FPNumber.fromNatural(3);
  /** Four value (4) */
  public static readonly FOUR = FPNumber.fromNatural(4);
  /** Five value (5) */
  public static readonly FIVE = FPNumber.fromNatural(5);
  /** Ten value (10) */
  public static readonly TEN = FPNumber.fromNatural(10);
  /** Hundred value (100) */
  public static readonly HUNDRED = FPNumber.fromNatural(100);
  /** Thousand value (1_000) */
  public static readonly THOUSAND = FPNumber.fromNatural(1000);
  /** Ten thousands value (10_000) */
  public static readonly TEN_THOUSANDS = FPNumber.fromNatural(10_000);
  /**
   * Return the **max** value, `null` if an array is empty
   * @param {...FPNumber} numbers
   */
  public static max(...numbers: Array<FPNumber>): FPNumber;
  public static max(...numbers: []): null;
  public static max(...numbers: Array<FPNumber>): FPNumber | null {
    if (!numbers?.length) {
      return null;
    }
    const precision = numbers[0].precision;
    const filtered = numbers.map((item) => item.value);
    return new FPNumber(BigNumber.max(...filtered), precision);
  }

  /**
   * Return the **min** value, `null` if an array is empty
   * @param {...FPNumber} numbers
   */
  public static min(...numbers: Array<FPNumber>): FPNumber;
  public static min(...numbers: []): null;
  public static min(...numbers: Array<FPNumber>): FPNumber | null {
    if (!numbers?.length) {
      return null;
    }
    const precision = numbers[0].precision;
    const filtered = numbers.map((item) => item.value);
    return new FPNumber(BigNumber.min(...filtered), precision);
  }

  /**
   * Return `true` if the first value is less than the second
   * @param {FPNumber} first First number
   * @param {FPNumber} second Second number
   */
  public static lt(first: FPNumber, second: FPNumber): boolean {
    return first.value.lt(second.value);
  }

  /**
   * Return `true` if the first value is less than the second
   * @param {FPNumber} first First number
   * @param {FPNumber} second Second number
   */
  public static readonly isLessThan = FPNumber.lt;

  /**
   * Return `true` if the first value is less of equal than the second
   * @param {FPNumber} first First number
   * @param {FPNumber} second Second number
   */
  public static lte(first: FPNumber, second: FPNumber): boolean {
    return first.value.lte(second.value);
  }

  /**
   * Return `true` if the first value is less of equal than the second
   * @param {FPNumber} first First number
   * @param {FPNumber} second Second number
   */
  public static readonly isLessThanOrEqualTo = FPNumber.lte;

  /**
   * Return `true` if the first value is greater than the second
   * @param {FPNumber} first First number
   * @param {FPNumber} second Second number
   */
  public static gt(first: FPNumber, second: FPNumber): boolean {
    return first.value.gt(second.value);
  }

  /**
   * Return `true` if the first value is greater than the second
   * @param {FPNumber} first First number
   * @param {FPNumber} second Second number
   */
  public static readonly isGreaterThan = FPNumber.gt;

  /**
   * Return `true` if the first value is greater or equal than the second
   * @param {FPNumber} first First number
   * @param {FPNumber} second Second number
   */
  public static gte(first: FPNumber, second: FPNumber): boolean {
    return first.value.gte(second.value);
  }

  /**
   * Return `true` if the first value is greater or equal than the second
   * @param {FPNumber} first First number
   * @param {FPNumber} second Second number
   */
  public static readonly isGreaterThanOrEqualTo = FPNumber.gte;

  /**
   * Return `true` if values are equal
   * @param {FPNumber} first First number
   * @param {FPNumber} second Second number
   */
  public static eq(first: FPNumber, second: FPNumber): boolean {
    return first.value.eq(second.value);
  }

  /**
   * Return `true` if values are equal
   * @param {FPNumber} first First number
   * @param {FPNumber} second Second number
   */
  public static readonly isEqualTo = FPNumber.eq;

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
    const filtered = typeof value === 'string' ? value.replace(/[,. ]/g, '') : value;
    const bn = new BigNumber(filtered);
    return new FPNumber(bn.div(10 ** precision), precision);
  }

  public readonly value: BigNumber;

  private formatInitialData(data: string | number | Codec, precision: number): string | number {
    if (typeof data === 'number') {
      return data;
    }
    if (typeof data === 'string') {
      if (!isFinityString(data)) return data; // '-Infinity', 'Infinity', 'NaN'

      if (isZeroString(data)) return '0';

      const withoutFormatting = data.replace(/[, ]/g, '');
      const [integer, fractional] = withoutFormatting.split('.') as [string, string | undefined];

      if (!(integer && Number.isFinite(+integer))) return 'NaN';
      if (fractional && !Number.isFinite(+fractional)) return 'NaN';

      return `${integer ?? 0}.${fractional ?? 0}`;
    }
    if ('toString' in data) {
      const json = data.toJSON() as (AnyJson & { balance: string }) | null;
      // `BalanceInfo` or `Balance` check
      let str = json && !isNil(json.balance) ? `${json.balance}`.replace(/[,. ]/g, '') : data.toString();

      if (!isFinityString(str)) return str; // '-Infinity', 'Infinity', 'NaN'

      if (isZeroString(str)) return '0';

      const isNegative = str.startsWith('-');
      if (isNegative) {
        str.replace('-', '');
      }

      let fractionalPart = '';
      let integerPart = '';
      const zerosLeftInFractionalPart = precision - str.length;

      if (zerosLeftInFractionalPart >= 0) {
        // only fractional part
        integerPart = '0';
        fractionalPart = `${Array(zerosLeftInFractionalPart).fill(0).join('')}${str}`;
      } else {
        const integerLength = str.length - precision;
        integerPart = str.slice(0, integerLength);
        fractionalPart = str.slice(integerLength);
      }

      if (!(Number.isFinite(+integerPart) && Number.isFinite(+fractionalPart))) return 'NaN';

      return `${isNegative ? '-' : ''}${integerPart}.${fractionalPart}`;
    }
    return 0;
  }

  /**
   * Supports `data` as `string`, `number`, `BigNumber`, `FPNumber` and `Codec` data types.
   * It's better not to use `number` parameter as data if you want the strict rules for rounding
   * @param data
   * @param precision
   */
  constructor(data: NumberType, public precision = FPNumber.DEFAULT_PRECISION) {
    let value: BigNumber;
    if (data instanceof BigNumber) {
      value = data;
    } else if (data instanceof FPNumber) {
      value = data.value;
      this.precision = data.precision;
    } else {
      value = new BigNumber(this.formatInitialData(data, precision));
    }
    this.value = value.dp(this.precision, 1); // `1` Rounds towards zero
  }

  /**
   * Formatted codec string representation
   */
  get codec(): string {
    return this.value.times(10 ** this.precision).toFormat(0);
  }

  /**
   * Format number to Codec string
   */
  public toCodecString(): string {
    return this.codec;
  }

  /**
   * Returns a string representation of the value using the custom formatting.
   * @param dp max decimal places
   * @param format BigNumber.Format object
   * @param preserveOrder (default: false) Keep empty decimals related to the **dp** param
   */
  public format(dp = FPNumber.DEFAULT_DECIMAL_PLACES, format?: BigNumber.Format, preserveOrder = false): string {
    const value = this.value;
    if (value.isZero()) {
      if (format) {
        return preserveOrder ? value.toFormat(dp, format) : value.toFormat(format);
      }
      return value.toFormat();
    }
    let formatted = value.dp(dp, FPNumber.DEFAULT_ROUND_MODE);
    if (formatted.isZero()) {
      // First significant character
      formatted = new BigNumber(value.toFormat().replace(/(0\.0*[1-9])(\d*)/, '$1'));
    }
    if (format) {
      return preserveOrder ? formatted.toFormat(dp, format) : formatted.toFormat(format);
    }
    return formatted.toFormat();
  }

  /**
   * Converts a number to a string by using the current locale params.
   * @param dp max decimal places
   * @param preserveOrder (default: false) Keep empty decimals related to the **dp** param
   */
  public toLocaleString(dp = FPNumber.DEFAULT_DECIMAL_PLACES, preserveOrder = false): string {
    let [integer, decimal] = this.format(
      dp,
      {
        groupSize: 3,
        groupSeparator: FPNumber.DELIMITERS_CONFIG.thousand,
        decimalSeparator: FPNumber.DELIMITERS_CONFIG.decimal,
      },
      preserveOrder
    ).split(FPNumber.DELIMITERS_CONFIG.decimal);

    return decimal ? integer.concat(FPNumber.DELIMITERS_CONFIG.decimal, decimal) : integer;
  }

  /**
   * Format real number to string
   */
  public toString(): string {
    return this.value.toFormat();
  }

  /**
   * Format real number to fixed string (like `Number.toFixed`)
   * @param {number} [dp=4] Decimal places deafult is 4
   */
  public toFixed(dp: number = 4): string {
    return this.value.toFixed(dp, FPNumber.DEFAULT_ROUND_MODE);
  }

  /**
   * Format FPNumber to number
   * @param {number} [dp=6] Decimal places
   */
  public toNumber(dp: number = FPNumber.DEFAULT_DECIMAL_PLACES): number {
    const result = this.value.dp(dp, FPNumber.DEFAULT_ROUND_MODE);
    return result.toNumber();
  }

  /**
   * Returns a FPNumber whose value is the value of this FPNumber to a maximum of decimalPlaces decimal places.
   * @param {number} [dp=precision] Decimal places
   */
  public dp(dp: number = this.precision): FPNumber {
    const newValue = this.value.dp(dp, FPNumber.DEFAULT_ROUND_MODE);
    return new FPNumber(newValue, dp);
  }

  /**
   * Addition (+) operator
   * @param {FPNumber} target Target number
   */
  public add(target: FPNumber): FPNumber;
  /**
   * Addition (+) operator
   * @param {string | number | BigNumber} target Target number, might be represented by 'string', 'number' or 'BigNumber' type
   */
  public add(target: string | number | BigNumber): FPNumber;
  public add(target: FPNumber | string | number | BigNumber): FPNumber {
    const value = target instanceof FPNumber ? target.value : target;
    return new FPNumber(this.value.plus(value), this.precision);
  }

  /**
   * Subtraction (-) operator
   * @param {FPNumber} target Target number
   */
  public sub(target: FPNumber): FPNumber;
  /**
   * Subtraction (-) operator
   * @param {string | number | BigNumber} target Target number, might be represented by 'string', 'number' or 'BigNumber' type
   */
  public sub(target: string | number | BigNumber): FPNumber;
  public sub(target: FPNumber | string | number | BigNumber): FPNumber {
    const value = target instanceof FPNumber ? target.value : target;
    return new FPNumber(this.value.minus(value), this.precision);
  }

  /**
   * Multiplication (*) operator
   * @param {FPNumber} target Target number
   */
  public mul(target: FPNumber): FPNumber;
  /**
   * Multiplication (*) operator
   * @param {string | number | BigNumber} target Target number, might be represented by 'string', 'number' or 'BigNumber' type
   */
  public mul(target: string | number | BigNumber): FPNumber;
  public mul(target: FPNumber | string | number | BigNumber): FPNumber {
    const value = target instanceof FPNumber ? target.value : target;
    return new FPNumber(this.value.times(value), this.precision);
  }

  /**
   * Div (/) operator
   * @param {FPNumber} target Target number
   */
  public div(target: FPNumber): FPNumber;
  /**
   * Div (/) operator
   * @param {string | number | BigNumber} target Target number, might be represented by 'string', 'number' or 'BigNumber' type
   */
  public div(target: string | number | BigNumber): FPNumber;
  public div(target: FPNumber | string | number | BigNumber): FPNumber {
    const value = target instanceof FPNumber ? target.value : target;
    return new FPNumber(this.value.div(value), this.precision);
  }

  /**
   * Mod (%) operator
   * @param {FPNumber} target Target number
   */
  public mod(target: FPNumber): FPNumber;
  /**
   * Mod (%) operator
   * @param {string | number | BigNumber} target Target number, might be represented by 'string', 'number' or 'BigNumber' type
   */
  public mod(target: string | number | BigNumber): FPNumber;
  public mod(target: FPNumber | string | number | BigNumber): FPNumber {
    const value = target instanceof FPNumber ? target.value : target;
    return new FPNumber(this.value.mod(value), this.precision);
  }

  /**
   * Returns `true` if mod operation returns zero.
   *
   * For instance, 4 % 2 = 0, so it returns `true` in this case.
   *
   * @param {FPNumber} target Target number
   */
  public isZeroMod(target: FPNumber): boolean;
  /**
   * Returns `true` if mod operation returns zero.
   *
   * For instance, 4 % 2 = 0, so it returns `true` in this case.
   *
   * @param {string | number | BigNumber} target Target number, might be represented by 'string', 'number' or 'BigNumber' type
   */
  public isZeroMod(target: string | number | BigNumber): boolean;
  public isZeroMod(target: FPNumber | string | number | BigNumber): boolean {
    const value = target instanceof FPNumber ? target.value : target;
    return new FPNumber(this.value.mod(value), this.precision).isZero();
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
    return new FPNumber(this.value.sqrt(), this.precision);
  }

  /**
   * Pow (**) operator
   * @param {FPNumber} exp Exponent number
   */
  public pow(exp: FPNumber): FPNumber;
  /**
   * Pow (**) operator
   * @param {string | number | BigNumber} exp Exponent number represented by 'string', 'number' or 'BigNumber' type
   */
  public pow(exp: string | number | BigNumber): FPNumber;
  public pow(exp: FPNumber | string | number | BigNumber): FPNumber {
    const value = exp instanceof FPNumber ? exp.value : exp;
    const numValue = value instanceof BigNumber ? value.toNumber() : +value;
    // BigNumber.pow works really slow so Math.pow should be used here
    return new FPNumber(Math.pow(this.toNumber(), numValue), this.precision);
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
