import { FPNumber } from '@sora-substrate/util';
import { connection } from '@sora-substrate/connection';
import { SORA_ENV } from '@sora-substrate/types/scripts/consts';

describe('FPNumber', () => {
  beforeAll(async (done) => {
    await connection.open(SORA_ENV.stage);
    done();
  });

  afterAll(async (done) => {
    await connection.close();
    done();
  });

  it.each([
    ['0', 18, '0'],
    ['-0', 18, '0'],
    [0, 18, '0'],
    ['0.000001', 18, '0.000001'],
    [0.000001, 18, '0.000001'],
    ['-123.456', 18, '-123.456'],
    [-123.456, 18, '-123.456'],
    ['123456.123456', 1, '123456.1'],
    [123456.123456, 1, '123456.1'],
    [Number.POSITIVE_INFINITY, 1, 'Infinity'],
    [Number.NEGATIVE_INFINITY, 1, '-Infinity'],
    [Number.NaN, 1, 'NaN'],
    ['Infinity', 1, 'Infinity'],
    ['-Infinity', 1, '-Infinity'],
    ['NaN', 1, 'NaN'],
  ])('[toString] instance of "%s" with precision "%s" should display "%s"', (value, precision, result) => {
    const instance = new FPNumber(value, precision);
    expect(instance.toString()).toBe(result);
  });

  it.each([
    ['0', 18, '0'],
    ['-0', 18, '0'],
    [0, 18, '0'],
    ['0.000001', 18, '0.000001'],
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
    [Number.POSITIVE_INFINITY, 1, 'Infinity'],
    [Number.NEGATIVE_INFINITY, 1, '-Infinity'],
    [Number.NaN, 1, 'NaN'],
    ['Infinity', 1, 'Infinity'],
    ['-Infinity', 1, '-Infinity'],
    ['NaN', 1, 'NaN'],
  ])('[format] instance of "%s" with precision "%s" should display "%s"', (value, precision, result) => {
    const instance = new FPNumber(value, precision);
    expect(instance.format()).toBe(result);
  });

  it.each([
    ['0', 18, '0'],
    ['-0', 18, '0'],
    [0, 18, '0'],
    ['0.000001', 18, '0.000001'],
    [0.000001, 18, '0.000001'],
    ['-123.456', 18, '-123.456'],
    [-123.456, 18, '-123.456'],
    ['-12.3', 18, '-12.3'],
    [-12.3, 18, '-12.3'],
    ['1234.123456', 1, '1,234.1'],
    [1234.123456, 1, '1,234.1'],
    ['1234567.123456', undefined, '1,234,567.123456'],
    [1234567.123456, undefined, '1,234,567.123456'],
  ])('[toLocaleString] instance of "%s" with precision "%s" should display "%s"', (value, precision, result) => {
    const instance = new FPNumber(value, precision);
    expect(instance.toLocaleString()).toBe(result);
  });

  it.each([
    [1234.5678, 4, '1,234.5678'],
    ['1234.5678', 4, '1,234.5678'],
    [-1234.5678, 4, '-1,234.5678'],
    ['-1234.5678', 4, '-1,234.5678'],
    [12341234.5678, 5, '12,341,234.5678'],
    ['12341234.5678', 5, '12,341,234.5678'],
    [234.5678, 3, '234.567'],
    ['234.5678', 3, '234.567'],
    [0.0009, 3, '0.0009'],
    ['0.0009', 3, '0.0009'],
    [0.0019, 3, '0.001'],
    ['0.0019', 3, '0.001'],
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
    ['0', 18, '0.000'],
    ['-0', 18, '0.000'],
    [0, 18, '0.000'],
    ['0.000001', 18, '0.000'],
    [0.000001, 18, '0.000'],
    ['-123.456', 18, '-123.456'],
    [-123.456, 18, '-123.456'],
    ['123456.123456', 1, '123456.100'],
    [123456.123456, 1, '123456.100'],
    [Number.POSITIVE_INFINITY, 1, 'Infinity'],
    [Number.NEGATIVE_INFINITY, 1, '-Infinity'],
    [Number.NaN, 1, 'NaN'],
    ['Infinity', 1, 'Infinity'],
    ['-Infinity', 1, '-Infinity'],
    ['NaN', 1, 'NaN'],
  ])('[toFixed] instance of "%s" with precision "%s" should display "%s"', (value, precision, result) => {
    const instance = new FPNumber(value, precision);
    expect(instance.toFixed(3)).toBe(result);
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
    [1, 18, 0, 18, '1'],
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
  ])('[add] (value "%s", precision "%s") + (value "%s", precision "%s") = "%s"', (num1, pr1, num2, pr2, result) => {
    const instance1 = new FPNumber(num1, pr1);
    const instance2 = new FPNumber(num2, pr2);
    expect(instance1.add(instance2).toString()).toBe(result);
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
  ])('[div] (value "%s", precision "%s") / (value "%s", precision "%s") = "%s"', (num1, pr1, num2, pr2, result) => {
    const instance1 = new FPNumber(num1, pr1);
    const instance2 = new FPNumber(num2, pr2);
    expect(instance1.div(instance2).toString()).toBe(result);
  });

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
  ])('[max] max (value "%s", precision "%s") (value "%s", precision "%s") -> "%s"', (num1, pr1, num2, pr2, result) => {
    const instance1 = new FPNumber(num1, pr1);
    const instance2 = new FPNumber(num2, pr2);
    const max = FPNumber.max(instance1, instance2) as FPNumber;
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
  ])('[min] min (value "%s", precision "%s") (value "%s", precision "%s") -> "%s"', (num1, pr1, num2, pr2, result) => {
    const instance1 = new FPNumber(num1, pr1);
    const instance2 = new FPNumber(num2, pr2);
    const min = FPNumber.min(instance1, instance2) as FPNumber;
    expect(min.toString()).toBe(result);
  });

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
      expect(FPNumber.lt(instance1, instance2)).toBe(result);
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
      expect(FPNumber.gt(instance1, instance2)).toBe(result);
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
      expect(FPNumber.eq(instance1, instance2)).toBe(result);
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
