import { FPNumber } from '../../util/src'

describe('FPNumber', () => {

  beforeAll(() => {
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
    expect(instance.toString()).toMatch(result)
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
    expect(instance.toCodecString()).toMatch(result)
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
    expect(instance1.add(instance2).toString()).toMatch(result)
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
    expect(instance1.sub(instance2).toString()).toMatch(result)
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
    expect(instance1.mul(instance2).toString()).toMatch(result)
  })

  it.each([
    [1, 18, 2, 18, '0.5'],
    [1, 18, -2, 18, '-0.5'],
    [1, 18, 0, 18, 'Infinity'],
    [-1, 18, 0, 18, 'Infinity'],
    [0, 18, 1, 18, '0'],
    [100, 18, 10, 10, '10'],
    [100, 18, -10, 10, '-10'],
    [100, 18, -0.1, 10, '-1000'],
    [125, 18, 10, 10, '12.5'],
    [125, 18, -12.5, 10, '10'],
  ])('[div] (value "%s", precision "%s") / (value "%s", precision "%s") = "%s"', (num1, pr1, num2, pr2, result) => {
    const instance1 = new FPNumber(num1, pr1)
    const instance2 = new FPNumber(num2, pr2)
    expect(instance1.div(instance2).toString()).toMatch(result)
  })
})
