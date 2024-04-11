import { FPNumber } from '@sora-substrate/math';
import { connection } from '@sora-substrate/connection';
import { SORA_ENV } from '@sora-substrate/types/scripts/consts';

describe('FPNumber', () => {
  it.each([
    ['', 18, '0'], // Edge case: empty string
    ['0', 18, '0'], // Edge case: zero
    ['-0', 18, '0'], // Edge case: negative zero
    [0, 18, '0'], // Edge case: zero
    ['0.000001', 18, '0.000001'], // Edge case: smallest positive number
    [0.000001, 18, '0.000001'], // Edge case: smallest positive number
    ['-123.456', 18, '-123.456'], // Edge case: negative number
    [-123.456, 18, '-123.456'], // Edge case: negative number
    ['123456.123456', 1, '123456.1'], // Edge case: rounding
    [123456.123456, 1, '123456.1'], // Edge case: rounding
    [Number.POSITIVE_INFINITY, 1, 'Infinity'], // Edge case: positive infinity
    [Number.NEGATIVE_INFINITY, 1, '-Infinity'], // Edge case: negative infinity
    [Number.NaN, 1, 'NaN'], // Edge case: NaN
    ['Infinity', 1, 'Infinity'], // Edge case: positive infinity
    ['-Infinity', 1, '-Infinity'], // Edge case: negative infinity
    ['NaN', 1, 'NaN'], // Edge case: NaN
    ['0.9999999999999999', 18, '0.9999999999999999'], // Edge case: rounding
    ['-0.9999999999999999', 18, '-0.9999999999999999'], // Edge case: negative rounding
    ['1.0000000000000001', 18, '1.0000000000000001'], // Edge case: rounding up
    ['-1.0000000000000001', 18, '-1.0000000000000001'], // Edge case: negative rounding up
    ['1e-18', 18, '0.000000000000000001'], // Edge case: smallest positive number
    ['-1e-18', 18, '-0.000000000000000001'], // Edge case: smallest negative number
    ['1e18', 18, '1000000000000000000'], // Edge case: largest number
    ['-1e18', 18, '-1000000000000000000'], // Edge case: largest negative number
    ['-1e+18', 18, '-1000000000000000000'], // Edge case: largest negative number
    [-1e18, 18, '-1000000000000000000'], // Edge case: largest negative number
  ])('[toString] instance of "%s" with precision "%s" should display "%s"', (value, precision, result) => {
    const instance = new FPNumber(value, precision);
    expect(instance.toString()).toBe(result);
  });

  it.each([
    ['0', 18, '0'], // Edge case: zero
    ['-0', 18, '0'], // Edge case: negative zero
    [0, 18, '0'], // Edge case: zero
    ['0.000001', 18, '0.000001'],

    // Edge case: rounding
    [0.000001, 18, '0.000001'],
    ['-123.456', 18, '-123.456'],
    [-123.456, 18, '-123.456'],
    ['123456.123456', 1, '123456.1'],
    [123456.123456, 1, '123456.1'],
    [0.01, 1, '0'],
    ['0.01', 1, '0'],
    [0.0000000123, 10, '0.00000001'],
    ['0.0000000123', 10, '0.00000001'],
    [0.123456789, 10, '0.1234567'],
    ['0.123456789', 10, '0.1234567'],

    [Number.POSITIVE_INFINITY, 1, 'Infinity'], // Edge case: positive infinity
    [Number.NEGATIVE_INFINITY, 1, '-Infinity'], // Edge case: negative infinity
    [Number.NaN, 1, 'NaN'], // Edge case: NaN
    ['Infinity', 1, 'Infinity'], // Edge case: positive infinity
    ['-Infinity', 1, '-Infinity'], // Edge case: negative infinity
    ['NaN', 1, 'NaN'], // Edge case: NaN
    ['1234567890123456789', 18, '1234567890123456789'], // Edge case: large positive number
    ['-1234567890123456789', 18, '-1234567890123456789'], // Edge case: large negative number
    [0.000000000000000001, 18, '0.000000000000000001'], // Edge case: smallest positive number
    [-0.000000000000000001, 18, '-0.0000001'], // Edge case: smallest negative number, rounding mode = 3, dp = 7
    [0.9999999999999999, 18, '0.9999999'], // Edge case: largest number less than 1, rounding mode = 3, dp = 7
    ['-0.9999999999999999', 18, '-1'], // Edge case: largest negative number less than 1, rounding mode = 3, dp = 7
    ['1.0000000000000001', 18, '1'], // Edge case: smallest number greater than 1, rounding mode = 3, dp = 7
    ['-1.0000000000000001', 18, '-1.0000001'], // Edge case: smallest negative number greater than 1, rounding mode = 3, dp = 7
  ])('[format] instance of "%s" with precision "%s" should display "%s"', (value, precision, result) => {
    const instance = new FPNumber(value, precision);
    expect(instance.format()).toBe(result);
  });

  it.each([
    ['0', 18, '0'], // Edge case: zero
    ['-0', 18, '0'], // Edge case: negative zero
    [0, 18, '0'], // Edge case: zero
    ['0.000001', 18, '0.000001'], // Edge case: smallest positive number
    [0.000001, 18, '0.000001'], // Edge case: smallest positive number
    ['-123.456', 18, '-123.456'], // Edge case: negative number
    [-123.456, 18, '-123.456'], // Edge case: negative number
    ['-12.3', 18, '-12.3'], // Edge case: negative number
    [-12.3, 18, '-12.3'], // Edge case: negative number
    ['1234.123456', 1, '1,234.1'], // Edge case: rounding
    [1234.123456, 1, '1,234.1'], // Edge case: rounding
    ['1234567.123456', undefined, '1,234,567.123456'], // Edge case: large number
    [1234567.123456, undefined, '1,234,567.123456'], // Edge case: large number
    ['0.9999999999999999', 18, '0.9999999'], // Edge case: rounding
    ['-0.9999999999999999', 18, '-1'], // Edge case: negative rounding
    ['1.0000000000000001', 18, '1'], // Edge case: rounding up
    ['-1.0000000000000001', 18, '-1.0000001'], // Edge case: negative rounding up
    ['1e-18', 18, '0.000000000000000001'], // Edge case: smallest positive number
    ['-1e-18', 18, '-0.0000001'], // Edge case: smallest negative number
    ['1e18', 18, '1,000,000,000,000,000,000'], // Edge case: largest number
    ['-1e18', 18, '-1,000,000,000,000,000,000'], // Edge case: largest negative number
    ['-1e+18', 18, '-1,000,000,000,000,000,000'], // Edge case: largest negative number
    [-1e18, 18, '-1,000,000,000,000,000,000'], // Edge case: largest negative number
  ])('[toLocaleString] instance of "%s" with precision "%s" should display "%s"', (value, precision, result) => {
    const instance = new FPNumber(value, precision);
    expect(instance.toLocaleString()).toBe(result);
  });

  it.each([
    ['0', 18, 2, '0.00'], // Edge case: zero
    ['-0', 18, 2, '0.00'], // Edge case: negative zero
    [0, 18, 2, '0.00'], // Edge case: zero
    ['0.000001', 18, 2, '0.00'], // Edge case: smallest positive number
    [0.000001, 18, 2, '0.00'], // Edge case: smallest positive number
    ['-123.456', 18, 6, '-123.456000'], // Edge case: negative number
    [-123.456, 18, 6, '-123.456000'], // Edge case: negative number
    ['-12.3', 18, 2, '-12.30'], // Edge case: negative number
    [-12.3, 18, 2, '-12.30'], // Edge case: negative number
    ['1234.123456', 1, 2, '1,234.10'], // Edge case: rounding
    [1234.123456, 1, 2, '1,234.10'], // Edge case: rounding
    ['1234567.123456', undefined, 6, '1,234,567.123456'], // Edge case: large number
    [1234567.123456, undefined, 6, '1,234,567.123456'], // Edge case: large number
    ['0.0000001', 18, 7, '0.0000001'], // Edge case: small number kept as is
    ['0.00000001', 18, 7, '0.0000000'], // Edge case: small number rounded down
    ['0.00000005', 18, 7, '0.0000001'], // Edge case: small number rounded up
    ['1234567.1234567', undefined, 7, '1,234,567.1234567'], // Edge case: default dp
    ['1234567.12345675', undefined, 7, '1,234,567.1234567'], // Edge case: default rounding mode
    ['1234567.12345674', undefined, 7, '1,234,567.1234567'], // Edge case: default rounding mode
  ])(
    '[toLocaleString with preserveOrder] instance of "%s" with precision "%s" and dp="%s" should display "%s"',
    (value, precision, dp, result) => {
      const instance = new FPNumber(value, precision);
      expect(instance.toLocaleString(dp, true)).toBe(result);
    }
  );

  it.each([
    [1234.5678, 4, '1,234.5678'], // Edge case: positive number
    ['1234.5678', 4, '1,234.5678'], // Edge case: positive number
    [-1234.5678, 4, '-1,234.5678'], // Edge case: negative number
    ['-1234.5678', 4, '-1,234.5678'], // Edge case: negative number
    [12341234.5678, 5, '12,341,234.5678'], // Edge case: large number
    ['12341234.5678', 5, '12,341,234.5678'], // Edge case: large number
    [234.5678, 3, '234.567'], // Edge case: rounding
    ['234.5678', 3, '234.567'], // Edge case: rounding
    [0.0009, 3, '0.0009'], // Edge case: smallest positive number
    ['0.0009', 3, '0.0009'], // Edge case: smallest positive number
    [0.0019, 3, '0.001'], // Edge case: rounding
    ['0.0019', 3, '0.001'], // Edge case: rounding
    [0, 4, '0'], // Edge case: zero
    ['-0', 4, '0'], // Edge case: negative zero
    [0.000000000000000001, 4, '0'], // Edge case: smallest positive number
    [-0.000000000000000001, 4, '0'], // Edge case: smallest negative number
    [0.9999999999999999, 4, '0.9999'], // Edge case: largest number less than 1
    ['-0.9999999999999999', 4, '-0.9999'], // Edge case: largest negative number less than 1
    ['1.0000000000000001', 4, '1'], // Edge case: smallest number greater than 1
    ['-1.0000000000000001', 4, '-1'], // Edge case: smallest negative number greater than 1
    [1e-18, 4, '0'], // Edge case: smallest positive number
    [-1e-18, 4, '0'], // Edge case: smallest negative number
    [1e18, 4, '1,000,000,000,000,000,000'], // Edge case: largest number
    [-1e18, 4, '-1,000,000,000,000,000,000'], // Edge case: largest negative number
  ])(
    '[format with params: dp "%s", custom formatting] instance of "%s" with precision "4" should display "%s"',
    (value, dp, result) => {
      const format = {
        decimalSeparator: '.',
        groupSeparator: ',',
        groupSize: 3,
        fractionGroupSeparator: '',
      };
      const instance = new FPNumber(value, 4);
      expect(instance.format(dp, format)).toBe(result);
    }
  );

  it.each([
    [1234.5678, 6, '1,234.567800'], // Edge case: positive number
    ['1234.5678', 6, '1,234.567800'], // Edge case: positive number
    [-1234.5678, 6, '-1,234.567800'], // Edge case: negative number
    ['-1234.5678', 6, '-1,234.567800'], // Edge case: negative number
    [12341234.5678, 5, '12,341,234.56780'], // Edge case: large number
    ['12341234.5678', 5, '12,341,234.56780'], // Edge case: large number
    [234.5678, 3, '234.567'], // Edge case: rounding
    ['234.5678', 3, '234.567'], // Edge case: rounding
    [0.0009, 3, '0.001'], // Edge case: smallest positive number
    ['0.0009', 3, '0.001'], // Edge case: smallest positive number
    [0.0019, 3, '0.001'], // Edge case: rounding
    ['0.0019', 3, '0.001'], // Edge case: rounding
    [0.0019, 8, '0.00190000'], // Edge case: rounding
    ['-0.0019', 8, '-0.00190000'], // Edge case: negative number
    [0.000000000000000001, 4, '0.0000'], // Edge case: smallest positive number
    [-0.000000000000000001, 4, '0.0000'], // Edge case: smallest negative number
    [0.9999999999999999, 4, '0.9999'], // Edge case: largest number less than 1
    ['-0.9999999999999999', 4, '-0.9999'], // Edge case: largest negative number less than 1
    ['1.0000000000000001', 4, '1.0000'], // Edge case: smallest number greater than 1
    ['-1.0000000000000001', 4, '-1.0000'], // Edge case: smallest negative number greater than 1
    [1e-18, 4, '0.0000'], // Edge case: smallest positive number
    [-1e-18, 4, '0.0000'], // Edge case: smallest negative number
    [1e18, 4, '1,000,000,000,000,000,000.0000'], // Edge case: largest number
    [-1e18, 4, '-1,000,000,000,000,000,000.0000'], // Edge case: largest negative number
    [Number.MAX_SAFE_INTEGER, 4, '9,007,199,254,740,991.0000'], // Edge case: maximum safe integer
    [Number.MIN_SAFE_INTEGER, 4, '-9,007,199,254,740,991.0000'], // Edge case: minimum safe integer
    [
      Number.MAX_VALUE,
      4,
      '179,769,313,486,231,570,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000.0000',
    ], // Edge case: maximum value
    [
      -Number.MAX_VALUE,
      4,
      '-179,769,313,486,231,570,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000.0000',
    ], // Edge case: minimum value
  ])(
    '[format with preserveOrder: dp "%s", custom formatting] instance of "%s" with precision "4" should display "%s"',
    (value, dp, result) => {
      const format = {
        decimalSeparator: '.',
        groupSeparator: ',',
        groupSize: 3,
        fractionGroupSeparator: '',
      };
      const instance = new FPNumber(value, 4);
      expect(instance.format(dp, format, true)).toBe(result);
    }
  );

  it.each([
    ['0', 18, '0.000'], // Edge case: zero
    ['-0', 18, '0.000'], // Edge case: negative zero
    [0, 18, '0.000'], // Edge case: zero
    ['0.000001', 18, '0.000'], // Edge case: smallest positive number
    [0.000001, 18, '0.000'], // Edge case: smallest positive number
    ['-123.456', 18, '-123.456'], // Edge case: negative number
    [-123.456, 18, '-123.456'], // Edge case: negative number
    ['123456.123456', 1, '123456.100'], // Edge case: rounding
    [123456.123456, 1, '123456.100'], // Edge case: rounding
    [Number.POSITIVE_INFINITY, 1, 'Infinity'], // Edge case: positive infinity
    [Number.NEGATIVE_INFINITY, 1, '-Infinity'], // Edge case: negative infinity
    [Number.NaN, 1, 'NaN'], // Edge case: NaN
    ['Infinity', 1, 'Infinity'], // Edge case: positive infinity
    ['-Infinity', 1, '-Infinity'], // Edge case: negative infinity
    ['NaN', 1, 'NaN'], // Edge case: NaN
    [0.000000000000000001, 18, '0.000'], // Additional edge case: smallest positive number
    [-0.000000000000000001, 18, '-0.001'], // Additional edge case: smallest negative number
    [1e-18, 18, '0.000'], // Additional edge case: smallest positive number
    [-1e-18, 18, '-0.001'], // Additional edge case: smallest negative number
    [1e18, 18, '1000000000000000000.000'], // Additional edge case: largest number
    [-1e18, 18, '-1000000000000000000.000'], // Additional edge case: largest negative number
    [Number.MAX_SAFE_INTEGER, 18, '9007199254740991.000'], // Additional edge case: maximum safe integer
    [Number.MIN_SAFE_INTEGER, 18, '-9007199254740991.000'], // Additional edge case: minimum safe integer
  ])('[toFixed] instance of "%s" with precision "%s" should display "%s"', (value, precision, result) => {
    const instance = new FPNumber(value, precision);
    expect(instance.toFixed(3)).toBe(result);
  });

  it.each([
    ['-0', 18, 0, '0', '0'],
    ['-0', 18, 18, '0', '0'],

    ['0.000001', 18, 0, '0', '0'],
    ['0.000001', 18, 1, '0', '0'],
    ['0.000001', 18, 2, '0', '0'],
    ['0.000001', 18, 3, '0', '0'],
    ['0.000001', 18, 4, '0', '0'],
    ['0.000001', 18, 5, '0', '0'],
    ['0.000001', 18, 6, '0.000001', '0.000001'],
    ['0.000001', 18, 18, '0.000001', '0.000001'],

    ['-123.456', 18, 0, '-124', '-123'],
    ['-123.456', 18, 1, '-123.5', '-123.4'],
    ['-123.456', 18, 2, '-123.46', '-123.45'],
    ['-123.456', 18, 3, '-123.456', '-123.456'],
    ['-123.456', 18, 18, '-123.456', '-123.456'],

    ['1.123456789012345678', 18, 0, '1', '1'],
    ['1.123456789012345678', 18, 1, '1.1', '1.1'],
    ['1.123456789012345678', 18, 2, '1.12', '1.12'],
    ['1.123456789012345678', 18, 3, '1.123', '1.123'],
    ['1.123456789012345678', 18, 4, '1.1234', '1.1234'],
    ['1.123456789012345678', 18, 5, '1.12345', '1.12345'],
    ['1.123456789012345678', 18, 6, '1.123456', '1.123456'],
    ['1.123456789012345678', 18, 7, '1.1234567', '1.1234567'],
    ['1.123456789012345678', 18, 8, '1.12345678', '1.12345678'],
    ['1.123456789012345678', 18, 9, '1.123456789', '1.123456789'],
    ['1.123456789012345678', 18, 10, '1.123456789', '1.123456789'],
    ['1.123456789012345678', 18, 11, '1.12345678901', '1.12345678901'],
    ['1.123456789012345678', 18, 12, '1.123456789012', '1.123456789012'],
    ['1.123456789012345678', 18, 13, '1.1234567890123', '1.1234567890123'],
    ['1.123456789012345678', 18, 14, '1.12345678901234', '1.12345678901234'],
    ['1.123456789012345678', 18, 15, '1.123456789012345', '1.123456789012345'],
    ['1.123456789012345678', 18, 16, '1.1234567890123456', '1.1234567890123456'],
    ['1.123456789012345678', 18, 17, '1.12345678901234567', '1.12345678901234567'],
    ['1.123456789012345678', 18, 18, '1.123456789012345678', '1.123456789012345678'],

    [Number.POSITIVE_INFINITY, 18, 0, 'Infinity', 'Infinity'],
    [Number.POSITIVE_INFINITY, 18, 18, 'Infinity', 'Infinity'],

    [Number.NEGATIVE_INFINITY, 18, 0, '-Infinity', '-Infinity'],
    [Number.NEGATIVE_INFINITY, 18, 18, '-Infinity', '-Infinity'],

    [Number.NaN, 18, 0, 'NaN', 'NaN'],
    [Number.NaN, 18, 18, 'NaN', 'NaN'],

    // Additional edge cases
    ['0.000000000000000001', 18, 18, '0.000000000000000001', '0.000000000000000001'],
    ['0.000000000000000001', 18, 0, '0', '0'],
    ['0.000000000000000001', 18, 1, '0', '0'],
    ['0.000000000000000001', 18, 2, '0', '0'],
    ['0.000000000000000001', 18, 3, '0', '0'],
    ['0.000000000000000001', 18, 4, '0', '0'],
    ['0.000000000000000001', 18, 5, '0', '0'],
    ['0.000000000000000001', 18, 6, '0', '0'],
    ['0.000000000000000001', 18, 7, '0', '0'],
    ['0.000000000000000001', 18, 8, '0', '0'],
    ['0.000000000000000001', 18, 9, '0', '0'],
    ['0.000000000000000001', 18, 10, '0', '0'],
    ['0.000000000000000001', 18, 11, '0', '0'],
    ['0.000000000000000001', 18, 12, '0', '0'],
    ['0.000000000000000001', 18, 13, '0', '0'],
    ['0.000000000000000001', 18, 14, '0', '0'],
    ['0.000000000000000001', 18, 15, '0', '0'],
    ['0.000000000000000001', 18, 16, '0', '0'],
    ['0.000000000000000001', 18, 17, '0', '0'],
    ['0.000000000000000001', 18, 18, '0.000000000000000001', '0.000000000000000001'],
  ])(
    '[dp] instance of "%s" with "%s" precision converted to "%s" decimal places should display "%s"; and visa versa "%s"',
    (value, precision, decimals, result1, result2) => {
      const instance1 = new FPNumber(value, precision);
      const instance2 = new FPNumber(value, decimals);
      expect(instance1.dp(decimals).toString()).toBe(result1);
      expect(instance2.dp(precision).toString()).toBe(result2);
    }
  );

  it.each([
    ['', 8, '0'],
    ['-Infinity', 8, '-Infinity'],
    ['Infinity', 8, 'Infinity'],
    ['0', 8, '0'],
    ['10', 0, '10'],
    ['10.9', 0, '109'],
    ['10,9', 0, '109'],
    ['1 0 9', 1, '10.9'],
    ['-10', 0, '-10'],
    ['NaN', 8, 'NaN'],
    ['-1234567890', 8, '-12.3456789'],
    ['1234567890', 8, '12.3456789'],
    ['12345678912', 10, '1.2345678912'],
    ['1000000000', 9, '1'],
    ['1000000000', 10, '0.1'],
  ])(
    '[FPNumber.fromCodecValue] instance of "%s" with precision "%s" should display "%s"',
    (value, precision, result) => {
      const instance = FPNumber.fromCodecValue(value, precision);
      expect(instance.toString()).toBe(result);
    }
  );

  it.each([
    ['0', 18, '0'],
    ['-0', 18, '0'],
    [0, 18, '0'],
    ['0.000001', 10, '10000'],
    [0.000001, 10, '10000'],
    ['-123.456', 3, '-123456'],
    [-123.456, 3, '-123456'],
    ['123456.123456', 1, '1234561'],
    [123456.123456, 1, '1234561'],
    [Number.POSITIVE_INFINITY, 1, 'Infinity'],
    [Number.NEGATIVE_INFINITY, 1, '-Infinity'],
    [Number.NaN, 1, 'NaN'],
    ['Infinity', 1, 'Infinity'],
    ['-Infinity', 1, '-Infinity'],
    ['NaN', 1, 'NaN'],
  ])('[toCodecString] instance of "%s" with precision "%s" should display "%s"', (value, precision, result) => {
    const instance = new FPNumber(value, precision);
    expect(instance.toCodecString()).toBe(result);
  });

  it.each([
    [1, 18, 2, 18, '3'],
    [1, 18, -2, 18, '-1'],
    [1.5, 10, 2.5, 18, '4'],
    [1.5, 10, -2.5, 18, '-1'],
    [1.5, 10, -2, 18, '-0.5'],
    [1, 10, '-Infinity', 18, '-Infinity'],
    [1, 10, 'Infinity', 18, 'Infinity'],
    [1, 10, 'NaN', 18, 'NaN'],
    ['-Infinity', 10, 1, 18, '-Infinity'],
    ['Infinity', 10, 1, 18, 'Infinity'],
    ['NaN', 10, 1, 18, 'NaN'],
    ['Infinity', 10, 'Infinity', 18, 'Infinity'],
    ['Infinity', 10, '-Infinity', 18, 'NaN'],
    ['-Infinity', 10, 'Infinity', 18, 'NaN'],
    ['-Infinity', 10, '-Infinity', 18, '-Infinity'],
    ['NaN', 10, 'NaN', 18, 'NaN'],
    [0, 18, 0, 18, '0'],
    [0, 18, 1, 18, '1'],
    [1, 18, 0, 18, '1'],
    [0, 18, -1, 18, '-1'],
    [-1, 18, 0, 18, '-1'],
    [0, 18, 0.5, 18, '0.5'],
    [0.5, 18, 0, 18, '0.5'],
    [0, 18, -0.5, 18, '-0.5'],
    [-0.5, 18, 0, 18, '-0.5'],
    [0, 18, 'Infinity', 18, 'Infinity'],
    ['Infinity', 18, 0, 18, 'Infinity'],
    [0, 18, '-Infinity', 18, '-Infinity'],
    ['-Infinity', 18, 0, 18, '-Infinity'],
    [0, 18, 'NaN', 18, 'NaN'],
    ['NaN', 18, 0, 18, 'NaN'],
    ['Infinity', 18, 'Infinity', 18, 'Infinity'],
    ['-Infinity', 18, '-Infinity', 18, '-Infinity'],
    ['NaN', 18, 'NaN', 18, 'NaN'],
  ])('[add] (value "%s", precision "%s") + (value "%s", precision "%s") = "%s"', (num1, pr1, num2, pr2, result) => {
    const instance1 = new FPNumber(num1, pr1);
    const instance2 = new FPNumber(num2, pr2);
    expect(instance1.add(instance2).toString()).toBe(result);
  });

  it.each([
    [1, 18, 2, 18, '1'],
    [2, 18, 3, 5, '8'],
    [2, 18, 0, 5, '1'],
    [1, 18, -2, 18, '1'],
    [1, 18, 0, 18, '1'],
    [1.5, 10, 2, 18, '2.25'],
    [1.5, 10, -2, 18, '0.4444444444'],
    [-1.5, 10, 2, 18, '2.25'],
    [-1.5, 10, -2, 18, '0.4444444444'],
    [1.00001, 10, 200_000, 18, '7.3889822093'],
    [1.00001, 10, 2_000_000, 18, '485116681.7029644'],
    [1, 10, '-Infinity', 18, 'NaN'],
    [1, 10, 'Infinity', 18, 'NaN'],
    [1, 10, 'NaN', 18, 'NaN'],
    ['-Infinity', 10, 1, 18, '-Infinity'],
    ['-Infinity', 10, 2, 18, 'Infinity'],
    ['-Infinity', 10, 0, 18, '1'],
    ['-Infinity', 10, -1, 18, '0'],
    ['Infinity', 10, 1, 18, 'Infinity'],
    ['Infinity', 10, 2, 18, 'Infinity'],
    ['Infinity', 10, 0, 18, '1'],
    ['Infinity', 10, -1, 18, '0'],
    ['NaN', 10, 1, 18, 'NaN'],
    ['Infinity', 10, 'Infinity', 18, 'Infinity'],
    ['Infinity', 10, '-Infinity', 18, '0'],
    ['-Infinity', 10, 'Infinity', 18, 'Infinity'],
    ['-Infinity', 10, '-Infinity', 18, '0'],
    ['NaN', 10, 'NaN', 18, 'NaN'],
    [0, 18, 0, 18, '1'], // 0 to the power of 0 is undefined
    [0, 18, 1, 18, '0'], // 0 to the power of any positive number is 0
    [0, 18, -1, 18, 'Infinity'], // 0 to the power of any negative number is Infinity
    [2, 18, 0.5, 18, '1.4142135623730951'], // square root of 2
    [-1, 18, 0.5, 18, 'NaN'], // square root of -1 is NaN in real numbers
    [2, 18, -0.5, 18, '0.7071067811865475'], // reciprocal of square root of 2
  ])('[pow] (value "%s", precision "%s") ** (value "%s", precision "%s") = "%s"', (num1, pr1, num2, pr2, result) => {
    const instance1 = new FPNumber(num1, pr1);
    const instance2 = new FPNumber(num2, pr2);
    expect(instance1.pow(instance2).toString()).toBe(result);
  });

  it.each([
    [1, 18, 2, 18, '-1'],
    [5, 18, 2, 18, '3'],
    [5, 18, -2, 18, '7'],
    [-5, 18, -2, 18, '-3'],
    [1, 18, 0, 18, '1'],
    [0, 18, -1, 18, '1'],
    [0, 18, 1, 18, '-1'],
    [1.5, 10, 2.5, 18, '-1'],
    [1.5, 10, -2.5, 18, '4'],
    [1.5, 10, -2, 18, '3.5'],
    [1, 10, '-Infinity', 18, 'Infinity'],
    [1, 10, 'Infinity', 18, '-Infinity'],
    [1, 10, 'NaN', 18, 'NaN'],
    ['-Infinity', 10, 1, 18, '-Infinity'],
    ['Infinity', 10, 1, 18, 'Infinity'],
    ['NaN', 10, 1, 18, 'NaN'],
    ['Infinity', 10, 'Infinity', 18, 'NaN'],
    ['Infinity', 10, '-Infinity', 18, 'Infinity'],
    ['-Infinity', 10, '-Infinity', 18, 'NaN'],
    ['NaN', 10, 'NaN', 18, 'NaN'],
    // Additional test cases
    [0, 18, 0, 18, '0'],
    ['0', 18, '0', 18, '0'],
    ['Infinity', 18, 'Infinity', 18, 'NaN'],
    ['-Infinity', 18, '-Infinity', 18, 'NaN'],
    ['NaN', 18, 'NaN', 18, 'NaN'],
    [Number.MAX_SAFE_INTEGER, 18, Number.MAX_SAFE_INTEGER, 18, '0'],
    [Number.MIN_SAFE_INTEGER, 18, Number.MIN_SAFE_INTEGER, 18, '0'],
    [Number.MAX_SAFE_INTEGER, 18, Number.MIN_SAFE_INTEGER, 18, '18014398509481982'],
    [Number.MIN_SAFE_INTEGER, 18, Number.MAX_SAFE_INTEGER, 18, '-18014398509481982'],
  ])('[sub] (value "%s", precision "%s") - (value "%s", precision "%s") = "%s"', (num1, pr1, num2, pr2, result) => {
    const instance1 = new FPNumber(num1, pr1);
    const instance2 = new FPNumber(num2, pr2);
    expect(instance1.sub(instance2).toString()).toBe(result);
  });

  it.each([
    [1, 18, 2, 18, '2'],
    [1, 18, -2, 18, '-2'],
    [1, 18, 0, 18, '0'],
    [1, 18, -0, 18, '0'],
    [-5, 10, -2, 18, '10'],
    [-5, 10, -2.4, 18, '12'],
    [-5, 10, -2.5, 18, '12.5'],
    [0, 10, 'Infinity', 10, 'NaN'],
    [0, 10, '-Infinity', 10, 'NaN'],
    [0, 10, 'NaN', 10, 'NaN'],
    ['Infinity', 10, 0, 10, 'NaN'],
    ['-Infinity', 10, 0, 10, 'NaN'],
    ['NaN', 10, 0, 10, 'NaN'],
    ['Infinity', 10, 'Infinity', 10, 'Infinity'],
    ['Infinity', 10, '-Infinity', 10, '-Infinity'],
    ['-Infinity', 10, '-Infinity', 10, 'Infinity'],
    ['Infinity', 10, 'NaN', 10, 'NaN'],
    ['NaN', 10, 'NaN', 10, 'NaN'],
    [0.5, 18, 2, 18, '1'], // edge case: fractional number
    [-0.5, 18, 2, 18, '-1'], // edge case: negative fractional number
    [1, 18, 0.5, 18, '0.5'], // edge case: multiplication with fractional number
    [1, 18, -0.5, 18, '-0.5'], // edge case: multiplication with negative fractional number
    [Number.MAX_SAFE_INTEGER, 18, 1, 18, String(Number.MAX_SAFE_INTEGER)], // edge case: max safe integer
    [Number.MIN_SAFE_INTEGER, 18, 1, 18, String(Number.MIN_SAFE_INTEGER)], // edge case: min safe integer
  ])('[mul] (value "%s", precision "%s") * (value "%s", precision "%s") = "%s"', (num1, pr1, num2, pr2, result) => {
    const instance1 = new FPNumber(num1, pr1);
    const instance2 = new FPNumber(num2, pr2);
    expect(instance1.mul(instance2).toString()).toBe(result);
  });

  it.each([
    [1, 18, 2, 18, '0.5'],
    [1, 18, -2, 18, '-0.5'],
    [1, 18, 0, 18, 'Infinity'],
    [-1, 18, 0, 18, '-Infinity'],
    [0, 18, 1, 18, '0'],
    [100, 18, 10, 10, '10'],
    [100, 18, -10, 10, '-10'],
    [100, 18, -0.1, 10, '-1000'],
    [125, 18, 10, 10, '12.5'],
    [125, 18, -12.5, 10, '-10'],
    [0, 10, 'Infinity', 10, '0'],
    [0, 10, '-Infinity', 10, '0'],
    [0, 10, 'NaN', 10, 'NaN'],
    ['Infinity', 10, 0, 10, 'Infinity'],
    ['-Infinity', 10, 0, 10, '-Infinity'],
    ['NaN', 10, 0, 10, 'NaN'],
    ['Infinity', 10, 'Infinity', 10, 'NaN'],
    ['Infinity', 10, '-Infinity', 10, 'NaN'],
    ['Infinity', 10, 'NaN', 10, 'NaN'],
    // Additional test cases
    [0, 18, -1, 18, '0'],
    [-0, 18, 1, 18, '0'],
    [1, 18, 'Infinity', 18, '0'],
    [1, 18, '-Infinity', 18, '0'],
    ['Infinity', 18, 1, 18, 'Infinity'],
    ['-Infinity', 18, 1, 18, '-Infinity'],
    ['NaN', 18, 1, 18, 'NaN'],
    ['Infinity', 18, 'Infinity', 18, 'NaN'],
    ['Infinity', 18, '-Infinity', 18, 'NaN'],
    ['Infinity', 18, 'NaN', 18, 'NaN'],
  ])('[div] (value "%s", precision "%s") / (value "%s", precision "%s") = "%s"', (num1, pr1, num2, pr2, result) => {
    const instance1 = new FPNumber(num1, pr1);
    const instance2 = new FPNumber(num2, pr2);
    expect(instance1.div(instance2).toString()).toBe(result);
  });

  it.each([
    [1, 18, 2, 18, '1'],
    [1, 18, -2, 18, '1'],
    [1, 18, 0, 18, 'NaN'],
    [-1, 18, 0, 18, 'NaN'],
    [0, 18, 1, 18, '0'],
    [100, 18, 10, 10, '0'],
    [100, 18, -10, 10, '0'],
    [100, 18, 33, 10, '1'],
    [-100, 18, 33, 10, '-1'],
    [-100, 18, -33, 10, '-1'],
    ['0.00000009615905582904815673828125', 32, '0.00000001373700797557830810546875', 32, '0'],
    ['0.00000009615905582904', 20, '10', 20, '0.00000009615905582904'],
    [4, 10, 6, 10, '4'],
    [-4, 10, 6, 10, '-4'],
    [7, 10, 4, 10, '3'],
    [-7, 10, 4, 10, '-3'],
    [-7, 10, -4, 10, '-3'],
    [0, 10, 'Infinity', 10, '0'],
    [0, 10, '-Infinity', 10, '0'],
    [0, 10, 'NaN', 10, 'NaN'],
    ['Infinity', 10, 0, 10, 'NaN'],
    ['-Infinity', 10, 0, 10, 'NaN'],
    ['NaN', 10, 0, 10, 'NaN'],
    ['Infinity', 10, 'Infinity', 10, 'NaN'],
    ['Infinity', 10, '-Infinity', 10, 'NaN'],
    ['Infinity', 10, 'NaN', 10, 'NaN'],
    // Additional test cases
    [0, 18, -1, 18, '0'],
    [1, 18, 1, 18, '0'],
    [-1, 18, -1, 18, '0'],
    [1.5, 18, 0.5, 18, '0'],
    [-1.5, 18, 0.5, 18, '0'],
    [1.5, 18, -0.5, 18, '0'],
    [-1.5, 18, -0.5, 18, '0'],
    ['Infinity', 18, 'Infinity', 18, 'NaN'],
    ['-Infinity', 18, 'Infinity', 18, 'NaN'],
    ['Infinity', 18, '-Infinity', 18, 'NaN'],
    ['-Infinity', 18, '-Infinity', 18, 'NaN'],
  ])('[mod] (value "%s", precision "%s") % (value "%s", precision "%s") = "%s"', (num1, pr1, num2, pr2, result) => {
    const instance1 = new FPNumber(num1, pr1);
    const instance2 = new FPNumber(num2, pr2);
    expect(instance1.mod(instance2).toString()).toBe(result);
  });

  it.each([
    [1, 18, 2, 18, false],
    [1, 18, -2, 18, false],
    [1, 18, 0, 18, false],
    [-1, 18, 0, 18, false],
    [0, 18, 1, 18, true],
    [100, 18, 10, 10, true],
    [100, 18, -10, 10, true],
    [100, 18, 33, 10, false],
    [-100, 18, 33, 10, false],
    [-100, 18, -33, 10, false],
    ['0.00000009615905582904815673828125', 32, '0.00000001373700797557830810546875', 32, true],
    ['0.00000009615905582904', 20, '10', 20, false],
    [4, 10, 6, 10, false],
    [-4, 10, 6, 10, false],
    [7, 10, 4, 10, false],
    [-7, 10, 4, 10, false],
    [-7, 10, -4, 10, false],
    [0, 10, 'Infinity', 10, true],
    [0, 10, '-Infinity', 10, true],
    [0, 10, 'NaN', 10, false],
    ['Infinity', 10, 0, 10, false],
    ['-Infinity', 10, 0, 10, false],
    ['NaN', 10, 0, 10, false],
    ['Infinity', 10, 'Infinity', 10, false],
    ['Infinity', 10, '-Infinity', 10, false],
    ['Infinity', 10, 'NaN', 10, false],
    // Additional test cases
    [0, 18, 0, 18, false],
    [1, 18, 1, 18, true],
    [-1, 18, -1, 18, true],
    [1.5, 18, 0.5, 18, true],
    [1.5, 18, 0.6, 18, false],
    [Number.MAX_VALUE, 18, Number.MAX_VALUE, 18, true],
    [Number.MIN_VALUE, 18, Number.MIN_VALUE, 18, false], // Number.MIN_VALUE (equals zero because of 18 decimals) is the smallest positive number
    [Number.MAX_VALUE, 18, Number.MIN_VALUE, 18, false],
    [Number.MIN_VALUE, 18, Number.MAX_VALUE, 18, true],
  ])(
    '[isZeroMod] (value "%s", precision "%s") % (value "%s", precision "%s") = "%s"',
    (num1, pr1, num2, pr2, result) => {
      const instance1 = new FPNumber(num1, pr1);
      const instance2 = new FPNumber(num2, pr2);
      expect(instance1.isZeroMod(instance2)).toBe(Boolean(result));
    }
  );

  it.each([
    [1, 18, 2, 18, '2'],
    [1, 18, -2, 18, '1'],
    [1, 18, 0, 18, '1'],
    [-1, 18, 0, 18, '0'],
    [1, 18, 1.123, 18, '1.123'],
    [1, 18, -1.123, 18, '1'],
    [1, 10, 2, 18, '2'],
    [1, 10, -2, 18, '1'],
    [1, 10, 0, 18, '1'],
    [-1, 10, 0, 18, '0'],
    [1, 10, 1.123, 18, '1.123'],
    [1, 10, -1.123, 18, '1'],
    [Number.NEGATIVE_INFINITY, 10, 'Infinity', 10, 'Infinity'],
    [Number.NEGATIVE_INFINITY, 10, 'NaN', 10, 'NaN'],
    [Number.POSITIVE_INFINITY, 10, 'NaN', 10, 'NaN'],
    [Number.NaN, 10, 'NaN', 10, 'NaN'],
    // Additional test cases
    [0, 18, 0, 18, '0'],
    [-1, 18, 1, 18, '1'],
    [1.5, 18, 1.4, 18, '1.5'],
    [-1.5, 18, -1.4, 18, '-1.4'],
    [
      Number.MAX_VALUE,
      18,
      Number.MIN_VALUE,
      18,
      '179769313486231570000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    ],
    [
      Number.MIN_VALUE,
      18,
      Number.MAX_VALUE,
      18,
      '179769313486231570000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    ],
    [Number.POSITIVE_INFINITY, 18, Number.NEGATIVE_INFINITY, 18, 'Infinity'],
    [Number.NEGATIVE_INFINITY, 18, Number.POSITIVE_INFINITY, 18, 'Infinity'],
    [Number.NaN, 18, 1, 18, 'NaN'],
    [1, 18, Number.NaN, 18, 'NaN'],
  ])('[max] max (value "%s", precision "%s") (value "%s", precision "%s") -> "%s"', (num1, pr1, num2, pr2, result) => {
    const instance1 = new FPNumber(num1, pr1);
    const instance2 = new FPNumber(num2, pr2);
    const staticMax = FPNumber.max(instance1, instance2);
    const max = instance1.max(instance2);
    expect(staticMax.toString()).toBe(result);
    expect(max.toString()).toBe(result);
  });

  it.each([
    [1, 18, 2, 18, '1'],
    [1, 18, -2, 18, '-2'],
    [1, 18, 0, 18, '0'],
    [-1, 18, 0, 18, '-1'],
    [1, 18, 1.123, 18, '1'],
    [1, 18, -1.123, 18, '-1.123'],
    [1, 10, 2, 18, '1'],
    [1, 10, -2, 18, '-2'],
    [1, 10, 0, 18, '0'],
    [-1, 10, 0, 18, '-1'],
    [1, 10, 1.123, 18, '1'],
    [1, 10, -1.123, 18, '-1.123'],
    [Number.NEGATIVE_INFINITY, 10, 'Infinity', 10, '-Infinity'],
    [Number.NEGATIVE_INFINITY, 10, 'NaN', 10, 'NaN'],
    [Number.POSITIVE_INFINITY, 10, 'NaN', 10, 'NaN'],
    [Number.NaN, 10, 'NaN', 10, 'NaN'],
    // Additional test cases
    [0, 18, 0, 18, '0'],
    [0, 18, -0, 18, '0'],
    [0, 18, Number.NEGATIVE_INFINITY, 18, '-Infinity'],
    [0, 18, Number.POSITIVE_INFINITY, 18, '0'],
    [Number.NEGATIVE_INFINITY, 18, Number.POSITIVE_INFINITY, 18, '-Infinity'],
    [Number.POSITIVE_INFINITY, 18, Number.POSITIVE_INFINITY, 18, 'Infinity'],
    [Number.NaN, 18, Number.NaN, 18, 'NaN'],
    // [Number.NaN, 18, 0, 18, '0'], // TODO: bugs? check how should it work for min/max
    // [Number.NaN, 18, Number.POSITIVE_INFINITY, 18, 'Infinity'],
    // [Number.NaN, 18, Number.NEGATIVE_INFINITY, 18, '-Infinity'],
  ])('[min] min (value "%s", precision "%s") (value "%s", precision "%s") -> "%s"', (num1, pr1, num2, pr2, result) => {
    const instance1 = new FPNumber(num1, pr1);
    const instance2 = new FPNumber(num2, pr2);
    const staticMin = FPNumber.min(instance1, instance2);
    const min = instance1.min(instance2);
    expect(staticMin.toString()).toBe(result);
    expect(min.toString()).toBe(result);
  });

  it.each([
    [1, 18, 2, 18, 3, 18, '3'],
    [1, 18, -2, 18, 0, 18, '1'],
    [1, 18, 1.123, 18, -1.123, 18, '1.123'],
    [1, 10, 2, 18, 3, 0, '3'],
    [1, 10, 2, 18, 3, 20, '3'],
    [Number.NEGATIVE_INFINITY, 10, 'Infinity', 10, 0, 0, 'Infinity'],
    [Number.NaN, 10, 'NaN', 10, 0, 0, 'NaN'],
  ])(
    '[max] max (value "%s", precision "%s") (value "%s", precision "%s") (value "%s", precision "%s") -> "%s"',
    (num1, pr1, num2, pr2, num3, pr3, result) => {
      const instance1 = new FPNumber(num1, pr1);
      const instance2 = new FPNumber(num2, pr2);
      const instance3 = new FPNumber(num3, pr3);
      const staticMax = FPNumber.max(instance1, instance2, instance3);
      const max = instance1.max(instance2, instance3);
      expect(staticMax.toString()).toBe(result);
      expect(max.toString()).toBe(result);
    }
  );

  it.each([
    [1, 18, 2, 18, -2, 18, '-2'],
    [1, 18, 0, 18, -1, 18, '-1'],
    [1, 18, 1.123, 18, -1.123, 18, '-1.123'],
    [1, 10, 2, 18, -3, 0, '-3'],
    [1, 10, 2, 18, 0, 20, '0'],
    [Number.NEGATIVE_INFINITY, 10, 'Infinity', 10, 0, 0, '-Infinity'],
    [Number.NaN, 10, 'NaN', 10, Number.NEGATIVE_INFINITY, 0, 'NaN'],
  ])(
    '[min] min (value "%s", precision "%s") (value "%s", precision "%s") (value "%s", precision "%s") -> "%s"',
    (num1, pr1, num2, pr2, num3, pr3, result) => {
      const instance1 = new FPNumber(num1, pr1);
      const instance2 = new FPNumber(num2, pr2);
      const instance3 = new FPNumber(num3, pr3);
      const staticMin = FPNumber.min(instance1, instance2, instance3);
      const min = instance1.min(instance2, instance3);
      expect(staticMin.toString()).toBe(result);
      expect(min.toString()).toBe(result);
    }
  );

  it.each([
    [1, 18, 2, 18, true],
    [1, 18, -2, 18, false],
    [1, 18, 0, 18, false],
    [-1, 18, 0, 18, true],
    [1, 18, 1.123, 18, true],
    [1, 18, -1.123, 18, false],
    [1, 10, 2, 18, true],
    [1, 10, -2, 18, false],
    [1, 10, 0, 18, false],
    [-1, 10, 0, 18, true],
    [1, 10, 1.123, 18, true],
    [1, 10, -1.123, 18, false],
    ['NaN', 10, 'NaN', 10, false],
    ['NaN', 10, Number.NaN, 10, false],
    ['Infinity', 10, Number.POSITIVE_INFINITY, 18, false],
    [Number.NEGATIVE_INFINITY, 10, 'Infinity', 18, true],
    ['Infinity', 10, Number.NEGATIVE_INFINITY, 10, false],
    ['Infinity', 10, Number.NaN, 10, false],
    [Number.NEGATIVE_INFINITY, 10, 'NaN', 10, false],
  ])(
    '[lt - isLessThan] (value "%s", precision "%s") < (value "%s", precision "%s") -> "%s"',
    (num1, pr1, num2, pr2, result) => {
      const instance1 = new FPNumber(num1, pr1);
      const instance2 = new FPNumber(num2, pr2);
      const staticLt = FPNumber.lt(instance1, instance2);
      const lt = instance1.lt(instance2);
      expect(staticLt).toBe(result);
      expect(lt).toBe(result);
    }
  );

  it.each([
    [1, 18, 2, 18, false],
    [1, 18, -2, 18, true],
    [1, 18, 0, 18, true],
    [-1, 18, 0, 18, false],
    [1, 18, 1.123, 18, false],
    [1, 18, -1.123, 18, true],
    [1, 10, 2, 18, false],
    [1, 10, -2, 18, true],
    [1, 10, 0, 18, true],
    [-1, 10, 0, 18, false],
    [1, 10, 1.123, 18, false],
    [1, 10, -1.123, 18, true],
    ['NaN', 10, 'NaN', 10, false],
    ['NaN', 10, Number.NaN, 10, false],
    ['Infinity', 10, Number.POSITIVE_INFINITY, 18, false],
    [Number.NEGATIVE_INFINITY, 10, '-Infinity', 18, false],
    ['Infinity', 10, Number.NEGATIVE_INFINITY, 10, true],
    ['Infinity', 10, Number.NaN, 10, false],
    [Number.NEGATIVE_INFINITY, 10, 'NaN', 10, false],
  ])(
    '[gt - isGreaterThan] (value "%s", precision "%s") > (value "%s", precision "%s") -> "%s"',
    (num1, pr1, num2, pr2, result) => {
      const instance1 = new FPNumber(num1, pr1);
      const instance2 = new FPNumber(num2, pr2);
      const staticGt = FPNumber.gt(instance1, instance2);
      const gt = instance1.gt(instance2);
      expect(staticGt).toBe(result);
      expect(gt).toBe(result);
    }
  );

  it.each([
    [2, 18, 2, 18, true],
    [-2.123, 18, -2, 18, false],
    ['-0', 18, 0, 18, true],
    [-1, 18, 0, 18, false],
    [2, 10, 2, 18, true],
    [-2.123, 10, -2, 18, false],
    ['-0', 10, 0, 18, true],
    [-1, 10, 0, 18, false],
    ['NaN', 10, 'NaN', 10, false],
    ['NaN', 10, Number.NaN, 10, false],
    ['Infinity', 10, Number.POSITIVE_INFINITY, 18, true],
    [Number.NEGATIVE_INFINITY, 10, '-Infinity', 18, true],
    ['Infinity', 10, Number.NEGATIVE_INFINITY, 10, false],
    ['Infinity', 10, Number.NaN, 10, false],
    [Number.NEGATIVE_INFINITY, 10, 'NaN', 10, false],
  ])(
    '[eq - isEqual] (value "%s", precision "%s") === (value "%s", precision "%s") -> "%s"',
    (num1, pr1, num2, pr2, result) => {
      const instance1 = new FPNumber(num1, pr1);
      const instance2 = new FPNumber(num2, pr2);
      const staticEq = FPNumber.eq(instance1, instance2);
      const eq = instance1.eq(instance2);
      expect(staticEq).toBe(result);
      expect(eq).toBe(result);
    }
  );

  it.each([
    [2, 18, 2, 18, true],
    [-2.123, 18, -2, 18, true],
    ['-0', 18, 0, 18, true],
    [-1, 18, 0, 18, true],
    [2, 10, 2, 18, true],
    [-2.123, 10, -2, 18, true],
    ['-0', 10, 0, 18, true],
    [-1, 10, 0, 18, true],
    ['NaN', 10, 'NaN', 10, false],
    ['NaN', 10, Number.NaN, 10, false],
    ['Infinity', 10, Number.POSITIVE_INFINITY, 18, true],
    [Number.NEGATIVE_INFINITY, 10, '-Infinity', 18, true],
    ['Infinity', 10, Number.NEGATIVE_INFINITY, 10, false],
    ['Infinity', 10, Number.NaN, 10, false],
    [Number.NEGATIVE_INFINITY, 10, 'NaN', 10, false],
  ])(
    '[lte - lessThanOrEqualTo] (value "%s", precision "%s") <= (value "%s", precision "%s") -> "%s"',
    (num1, pr1, num2, pr2, result) => {
      const instance1 = new FPNumber(num1, pr1);
      const instance2 = new FPNumber(num2, pr2);
      const staticLte = FPNumber.lte(instance1, instance2);
      const lte = instance1.lte(instance2);
      expect(staticLte).toBe(result);
      expect(lte).toBe(result);
    }
  );

  it.each([
    [2, 18, 2, 18, true],
    [-2, 18, -2.123, 18, true],
    ['-0', 18, 0, 18, true],
    [0, 18, -1, 18, true],
    [2, 10, 2, 18, true],
    [-2, 10, -2.123, 18, true],
    ['-0', 10, 0, 18, true],
    [0, 10, -1, 18, true],
    ['NaN', 10, 'NaN', 10, false],
    ['NaN', 10, Number.NaN, 10, false],
    ['Infinity', 10, Number.POSITIVE_INFINITY, 18, true],
    [Number.NEGATIVE_INFINITY, 10, '-Infinity', 18, true],
    ['Infinity', 10, Number.NEGATIVE_INFINITY, 10, true],
    ['Infinity', 10, Number.NaN, 10, false],
    [Number.NEGATIVE_INFINITY, 10, 'NaN', 10, false],
  ])(
    '[gte - greaterThanOrEqualTo] (value "%s", precision "%s") >= (value "%s", precision "%s") -> "%s"',
    (num1, pr1, num2, pr2, result) => {
      const instance1 = new FPNumber(num1, pr1);
      const instance2 = new FPNumber(num2, pr2);
      const staticGte = FPNumber.gte(instance1, instance2);
      const gte = instance1.gte(instance2);
      expect(staticGte).toBe(result);
      expect(gte).toBe(result);
    }
  );

  it.each([
    [2, 18, '-2'],
    [-2, 18, '2'],
    [0, 18, '0'],
    [-0, 18, '0'],
    [0.123456, 18, '-0.123456'],
    [-0.123456, 18, '0.123456'],
    [Number.POSITIVE_INFINITY, 18, '-Infinity'],
    [Number.NEGATIVE_INFINITY, 18, 'Infinity'],
    [Number.NaN, 18, 'NaN'],
    [2, 18, '-2'],
    [-2, 18, '2'],
    [0, 18, '0'],
    [-0, 18, '0'],
    [0.123456, 18, '-0.123456'],
    [-0.123456, 18, '0.123456'],
    ['Infinity', 18, '-Infinity'],
    ['-Infinity', 18, 'Infinity'],
    ['NaN', 18, 'NaN'],
    // Additional test cases
    [1.23456789123456789, 18, '-1.234567891234568'],
    [-1.23456789123456789, 18, '1.234567891234568'],
    ['123456789123456789', 18, '-123456789123456789'],
    ['-123456789123456789', 18, '123456789123456789'],
    ['1.23456789123456789', 18, '-1.23456789123456789'],
    ['-1.23456789123456789', 18, '1.23456789123456789'],
  ])('[negative] !(value "%s", precision "%s") = "%s"', (value, precision, result) => {
    const instance = new FPNumber(value, precision);
    expect(instance.negative().toString()).toBe(result);
  });

  it.each([
    [4, 17, '2'],
    [-4, 17, 'NaN'],
    [0, 17, '0'],
    [-0, 17, '0'],
    [148.84, 17, '12.2'],
    [Number.POSITIVE_INFINITY, 17, 'Infinity'],
    [Number.NEGATIVE_INFINITY, 17, 'NaN'],
    [Number.NaN, 17, 'NaN'],
    ['4', 17, '2'],
    ['-4', 17, 'NaN'],
    ['0', 17, '0'],
    ['-0', 17, '0'],
    ['148.84', 17, '12.2'],
    ['Infinity', 17, 'Infinity'],
    ['-Infinity', 17, 'NaN'],
    ['NaN', 17, 'NaN'],
    [1, 17, '1'],
    [0.25, 17, '0.5'],
    [0.0625, 17, '0.25'],
    [2.718281828459045, 17, '1.64872127070012807'],
    [7.389056098930649, 17, '2.718281828459045'],
    [54.598150033144236, 17, '7.38905609893065001'],
    [403.4287934927351, 17, '20.08553692318766717'],
    [2980.9579870417283, 17, '54.5981500331442393'],
    [22026.465794806718, 17, '148.41315910257660841'],
    [8103.083927575384, 17, '90.0171313005218135'],
    [444.8580662229411, 17, '21.09165868828104045'],
    [1.2345678910111213, 17, '1.11111110651056013'],
    [0.9876543210987654, 17, '0.99380799005580821'],
  ])('[sqrt] sqrt(value "%s", precision "%s") = "%s"', (value, precision, result) => {
    const instance = new FPNumber(value, precision);
    expect(instance.sqrt().toString()).toBe(result);
  });

  it.each([
    [0.000000000000000001, 18, false],
    [0.0000000000000000001, 18, true],
    [-0.000000000000000001, 18, false],
    [-0.0000000000000000001, 18, true],
    [0, 18, true],
    [-0, 18, true],
    [Number.POSITIVE_INFINITY, 18, false],
    [Number.NEGATIVE_INFINITY, 18, false],
    [Number.NaN, 18, false],
    ['0.000000000000000001', 18, false],
    ['0.0000000000000000001', 18, true],
    ['-0.000000000000000001', 18, false],
    ['-0.0000000000000000001', 18, true],
    ['0', 18, true],
    ['-0', 18, true],
    ['Infinity', 18, false],
    ['-Infinity', 18, false],
    ['NaN', 18, false],
  ])('[isZero] (value "%s", precision "%s") === 0 -> "%s"', (value, precision, result) => {
    const instance = new FPNumber(value, precision);
    expect(instance.isZero()).toBe(result);
  });

  it.each([
    [0.000000000000000001, 18, false],
    [0.0000000000000000001, 18, true],
    [-0.000000000000000001, 18, true],
    [-0.0000000000000000001, 18, true],
    [0, 18, true],
    [-0, 18, true],
    [Number.POSITIVE_INFINITY, 18, false],
    [Number.NEGATIVE_INFINITY, 18, true],
    [Number.NaN, 18, false],
    ['0.000000000000000001', 18, false],
    ['0.0000000000000000001', 18, true],
    ['-0.000000000000000001', 18, true],
    ['-0.0000000000000000001', 18, true],
    ['0', 18, true],
    ['-0', 18, true],
    ['Infinity', 18, false],
    ['-Infinity', 18, true],
    ['NaN', 18, false],
  ])('[isLteZero] (value "%s", precision "%s") === 0 -> "%s"', (value, precision, result) => {
    const instance = new FPNumber(value, precision);
    expect(instance.isLteZero()).toBe(result);
  });

  it.each([
    [0.000000000000000001, 18, true],
    [0.0000000000000000001, 18, true],
    [-0.000000000000000001, 18, false],
    [-0.0000000000000000001, 18, true],
    [0, 18, true],
    [-0, 18, true],
    [Number.POSITIVE_INFINITY, 18, true],
    [Number.NEGATIVE_INFINITY, 18, false],
    [Number.NaN, 18, false],
    ['0.000000000000000001', 18, true],
    ['0.0000000000000000001', 18, true],
    ['-0.000000000000000001', 18, false],
    ['-0.0000000000000000001', 18, true],
    ['0', 18, true],
    ['-0', 18, true],
    ['Infinity', 18, true],
    ['-Infinity', 18, false],
    ['NaN', 18, false],
  ])('[isGteZero] (value "%s", precision "%s") === 0 -> "%s"', (value, precision, result) => {
    const instance = new FPNumber(value, precision);
    expect(instance.isGteZero()).toBe(result);
  });

  it.each([
    [0.000000000000000001, 18, false],
    [0.0000000000000000001, 18, false],
    [-0.000000000000000001, 18, true],
    [-0.0000000000000000001, 18, false],
    [0, 18, false],
    [-0, 18, false],
    [Number.POSITIVE_INFINITY, 18, false],
    [Number.NEGATIVE_INFINITY, 18, true],
    [Number.NaN, 18, false],
    ['0.000000000000000001', 18, false],
    ['0.0000000000000000001', 18, false],
    ['-0.000000000000000001', 18, true],
    ['-0.0000000000000000001', 18, false],
    ['0', 18, false],
    ['-0', 18, false],
    ['Infinity', 18, false],
    ['-Infinity', 18, true],
    ['NaN', 18, false],
  ])('[isLtZero] (value "%s", precision "%s") === 0 -> "%s"', (value, precision, result) => {
    const instance = new FPNumber(value, precision);
    expect(instance.isLtZero()).toBe(result);
  });

  it.each([
    [0.000000000000000001, 18, true],
    [0.0000000000000000001, 18, false],
    [-0.000000000000000001, 18, false],
    [-0.0000000000000000001, 18, false],
    [0, 18, false],
    [-0, 18, false],
    [Number.POSITIVE_INFINITY, 18, true],
    [Number.NEGATIVE_INFINITY, 18, false],
    [Number.NaN, 18, false],
    ['0.000000000000000001', 18, true],
    ['0.0000000000000000001', 18, false],
    ['-0.000000000000000001', 18, false],
    ['-0.0000000000000000001', 18, false],
    ['0', 18, false],
    ['-0', 18, false],
    ['Infinity', 18, true],
    ['-Infinity', 18, false],
    ['NaN', 18, false],
  ])('[isGtZero] (value "%s", precision "%s") === 0 -> "%s"', (value, precision, result) => {
    const instance = new FPNumber(value, precision);
    expect(instance.isGtZero()).toBe(result);
  });

  it.each([
    ['0', 18, false],
    ['Infinity', 18, false],
    ['-Infinity', 18, false],
    ['NaN', 18, true],
    [0, 18, false],
    [Number.POSITIVE_INFINITY, 18, false],
    [Number.NEGATIVE_INFINITY, 18, false],
    [Number.NaN, 18, true],
  ])('[isNaN] (value "%s", precision "%s") is NaN -> "%s"', (value, precision, result) => {
    const instance = new FPNumber(value, precision);
    expect(instance.isNaN()).toBe(result);
  });

  it.each([
    ['0', 18, true],
    ['Infinity', 18, false],
    ['-Infinity', 18, false],
    ['NaN', 18, false],
    [0, 18, true],
    [Number.POSITIVE_INFINITY, 18, false],
    [Number.NEGATIVE_INFINITY, 18, false],
    [Number.NaN, 18, false],
  ])('[isFinity] (value "%s", precision "%s") is Finity -> "%s"', (value, precision, result) => {
    const instance = new FPNumber(value, precision);
    expect(instance.isFinity()).toBe(result);
  });

  it.each([
    [0, FPNumber.ZERO],
    [100, FPNumber.HUNDRED],
  ])('[FPNumber static] (value "%s") is equal to new FPNumber("%s")', (value, staticValue) => {
    const instance = new FPNumber(value);

    expect(FPNumber.isEqualTo(instance, staticValue)).toBe(true);

    expect(instance.toString()).toBe(staticValue.toString());
    expect(instance.toCodecString()).toBe(staticValue.toCodecString());
    expect(instance.toLocaleString()).toBe(staticValue.toLocaleString());
    expect(instance.toFixed()).toBe(staticValue.toFixed());
  });
});

describe('FPNumber codec', () => {
  beforeAll(async () => {
    await connection.open(SORA_ENV.stage);
  });

  afterAll(async () => {
    await connection.close();
  });

  it.each([
    ['1234567890', 8, '12.3456789'],
    ['12345678912', 10, '1.2345678912'],
    ['1000000000', 9, '1'],
    ['1000000000', 10, '0.1'],
  ])(
    '[toString from Codec object] instance of "%s" with precision "%s" should display "%s"',
    (value, precision, result) => {
      const codec = connection?.api?.createType('Balance', value);
      if (codec) {
        const instance = new FPNumber(codec, precision);
        expect(instance.toString()).toBe(result);
      }
    }
  );
});
