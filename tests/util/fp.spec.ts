import { FPNumber, BaseApi } from '@sora-substrate/util'

const TEST_ENDPOINT = 'wss://ws.framenode-1.s1.stg1.sora2.soramitsu.co.jp'

describe('FPNumber', () => {
  let baseApi: BaseApi

  beforeAll(async (done) => {
    baseApi = new BaseApi(TEST_ENDPOINT)
    await baseApi.connect()
    done()
  })

  afterAll(async (done) => {
    await baseApi.disconnect()
    done()
  })

  it.each([
    ['0', 18, '0'],
    ['-0', 18, '0'],
    [0, 18, '0'],
    ['0.000001', 18, '0.000001'],
    [0.000001, 18, '0.000001'],
    ['-123.456', 18, '-123.456'],
    [-123.456, 18, '-123.456'],
    ['123456.123456', 1, '123456.1'],
    [123456.123456, 1, '123456.1']
  ])('[toString] instance of "%s" with precision "%s" should display "%s"', (value, precision, result) => {
    const instance = new FPNumber(value, precision)
    expect(instance.toString()).toBe(result)
  })

  it.each([
    ['1234567890', 8, '12.345678'],
    ['1234567890', 10, '0.123456'],
    ['1000000000', 9, '1'],
    ['1000000000', 10, '0.1']
  ])('[toString from Codec object] instance of "%s" with precision "%s" should display "%s"', (value, precision, result) => {
    const codec = baseApi.api.createType("Balance", value)
    const instance = new FPNumber(codec, precision)
    expect(instance.toString()).toBe(result)
  })

  it.each([
    ['0', 18, '0'],
    ['-0', 18, '0'],
    [0, 18, '0'],
    ['0.000001', 10, '10000'],
    [0.000001, 10, '10000'],
    ['-123.456', 3, '-123456'],
    [-123.456, 3, '-123456'],
    ['123456.123456', 1, '1234561'],
    [123456.123456, 1, '1234561']
  ])('[toCodecString] instance of "%s" with precision "%s" should display "%s"', (value, precision, result) => {
    const instance = new FPNumber(value, precision)
    expect(instance.toCodecString()).toBe(result)
  })

  it.each([
    [1, 18, 2, 18, '3'],
    [1, 18, -2, 18, '-1'],
    [1, 18, 0, 18, '1'],
    [1.5, 10, 2.5, 18, '4'],
    [1.5, 10, -2.5, 18, '-1'],
    [1.5, 10, -2, 18, '-0.5']
  ])('[add] (value "%s", precision "%s") + (value "%s", precision "%s") = "%s"', (num1, pr1, num2, pr2, result) => {
    const instance1 = new FPNumber(num1, pr1)
    const instance2 = new FPNumber(num2, pr2)
    expect(instance1.add(instance2).toString()).toBe(result)
  })

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
    [1.5, 10, -2, 18, '3.5']
  ])('[sub] (value "%s", precision "%s") - (value "%s", precision "%s") = "%s"', (num1, pr1, num2, pr2, result) => {
    const instance1 = new FPNumber(num1, pr1)
    const instance2 = new FPNumber(num2, pr2)
    expect(instance1.sub(instance2).toString()).toBe(result)
  })

  it.each([
    [1, 18, 2, 18, '2'],
    [1, 18, -2, 18, '-2'],
    [1, 18, 0, 18, '0'],
    [1, 18, -0, 18, '0'],
    [-5, 10, -2, 18, '10'],
    [-5, 10, -2.4, 18, '12'],
    [-5, 10, -2.5, 18, '12.5'],
  ])('[mul] (value "%s", precision "%s") * (value "%s", precision "%s") = "%s"', (num1, pr1, num2, pr2, result) => {
    const instance1 = new FPNumber(num1, pr1)
    const instance2 = new FPNumber(num2, pr2)
    expect(instance1.mul(instance2).toString()).toBe(result)
  })

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
  ])('[div] (value "%s", precision "%s") / (value "%s", precision "%s") = "%s"', (num1, pr1, num2, pr2, result) => {
    const instance1 = new FPNumber(num1, pr1)
    const instance2 = new FPNumber(num2, pr2)
    expect(instance1.div(instance2).toString()).toBe(result)
  })

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
  ])('[max] max (value "%s", precision "%s") (value "%s", precision "%s") -> "%s"', (num1, pr1, num2, pr2, result) => {
    const instance1 = new FPNumber(num1, pr1)
    const instance2 = new FPNumber(num2, pr2)
    expect(FPNumber.max(instance1, instance2).toString()).toBe(result)
  })

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
  ])('[min] min (value "%s", precision "%s") (value "%s", precision "%s") -> "%s"', (num1, pr1, num2, pr2, result) => {
    const instance1 = new FPNumber(num1, pr1)
    const instance2 = new FPNumber(num2, pr2)
    expect(FPNumber.min(instance1, instance2).toString()).toBe(result)
  })

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
  ])('[isLessThan] (value "%s", precision "%s") < (value "%s", precision "%s") -> "%s"', (num1, pr1, num2, pr2, result) => {
    const instance1 = new FPNumber(num1, pr1)
    const instance2 = new FPNumber(num2, pr2)
    expect(FPNumber.isLessThan(instance1, instance2)).toBe(result)
  })

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
  ])('[isGreaterThan] (value "%s", precision "%s") > (value "%s", precision "%s") -> "%s"', (num1, pr1, num2, pr2, result) => {
    const instance1 = new FPNumber(num1, pr1)
    const instance2 = new FPNumber(num2, pr2)
    expect(FPNumber.isGreaterThan(instance1, instance2)).toBe(result)
  })

  it.each([
    [2, 18, 2, 18, true],
    [-2.123, 18, -2, 18, false],
    ['-0', 18, 0, 18, true],
    [-1, 18, 0, 18, false],
    [2, 10, 2, 18, true],
    [-2.123, 10, -2, 18, false],
    ['-0', 10, 0, 18, true],
    [-1, 10, 0, 18, false],
  ])('[isEqual] (value "%s", precision "%s") === (value "%s", precision "%s") -> "%s"', (num1, pr1, num2, pr2, result) => {
    const instance1 = new FPNumber(num1, pr1)
    const instance2 = new FPNumber(num2, pr2)
    expect(FPNumber.isEqual(instance1, instance2)).toBe(result)
  })

  it.each([
    [2, 18, '-2'],
    [-2, 18, '2'],
    [0, 18, '0'],
    [-0, 18, '0'],
    [0.123456, 18, '-0.123456'],
    [-0.123456, 18, '0.123456'],
  ])('[negative] !(value "%s", precision "%s") = "%s"', (value, precision, result) => {
    const instance = new FPNumber(value, precision)
    expect(instance.negative().toString()).toBe(result)
  })

  it.each([
    [2, 18, false],
    [0, 18, true],
    [-0, 18, true],
  ])('[isZero] (value "%s", precision "%s") === 0 -> "%s"', (value, precision, result) => {
    const instance = new FPNumber(value, precision)
    expect(instance.isZero()).toBe(result)
  })

  it.each([
    [0, 18, false],
    ['Infinity', 18, false],
    ['-Infinity', 18, false],
    ['NaN', 18, true],
  ])('[isNaN] (value "%s", precision "%s") is NaN -> "%s"', (value, precision, result) => {
    const instance = new FPNumber(value, precision)
    expect(instance.isNaN()).toBe(result)
  })

  it.each([
    [0, 18, true],
    ['Infinity', 18, false],
    ['-Infinity', 18, false],
    ['NaN', 18, false],
  ])('[isFinity] (value "%s", precision "%s") is Finity -> "%s"', (value, precision, result) => {
    const instance = new FPNumber(value, precision)
    expect(instance.isFinity()).toBe(result)
  })
})
