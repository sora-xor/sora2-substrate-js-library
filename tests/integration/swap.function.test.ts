import { connection, KnownAssets, KnownSymbols } from '@sora-substrate/util'
import { TestApi } from '../util'
import { strictEqual } from 'assert'
import { ENV } from '../env'

const env = ENV.DEV
const TEST_ENDPOINT = env.URL
const sudoSeed = env.SUDO_SEED
const dexSeed = env.DEX_SEED
const testUserSeed = env.USER_SEED

describe('Test SWAP function', (): void => {
  let testApi: TestApi
  jest.setTimeout(80_000)
  beforeAll(async (done) => {
    testApi = new TestApi()
    await connection.open(TEST_ENDPOINT)
    await testApi.initialize()
    await testApi.setupEnvironment(sudoSeed, testUserSeed, dexSeed)
    done()
  }, 10_000_000)
  afterAll(async (done) => {
    await connection.close()
    done()
  })
  beforeEach(async (done) => {
    testApi.logout()
    done()
  })
  
  it.skip.each([//This case not fixed on backend
    [KnownSymbols.XOR, KnownSymbols.VAL, 10],
    [KnownSymbols.XOR, KnownSymbols.PSWAP, 100.01],
    [KnownSymbols.VAL, KnownSymbols.XOR, 999],
    [KnownSymbols.PSWAP, KnownSymbols.XOR, 9999.99],
    [KnownSymbols.PSWAP, KnownSymbols.VAL, 100000],
    [KnownSymbols.VAL, KnownSymbols.PSWAP, 1000000]
  ])('Reversed swap result should be same swap result. AssetA = %s, AssetB =%s, Amount =%s', async (inputAssetSymbol, outputAssetSymbol, amount): Promise<void> => {
    //Given
    const quote = await testApi.getSwapResult(
      KnownAssets.get(inputAssetSymbol).address,
      KnownAssets.get(outputAssetSymbol).address,
      amount,
      false
    )
    //Then
    const reversedQuote = await testApi.getSwapResult(
      KnownAssets.get(inputAssetSymbol).address,
      KnownAssets.get(outputAssetSymbol).address,
      quote.amount,
      true
    )
    //When
    expect(reversedQuote.fee).toBe(quote.fee)
    expect(+reversedQuote.amount).toBe(amount)
  })

  it.skip.each([//This case not fixed on backend
    [KnownSymbols.XOR, KnownSymbols.VAL, 1],
    [KnownSymbols.XOR, KnownSymbols.PSWAP, 100.01],
    [KnownSymbols.VAL, KnownSymbols.XOR, 999],
    [KnownSymbols.PSWAP, KnownSymbols.XOR, 9999.99],
    [KnownSymbols.PSWAP, KnownSymbols.VAL, 100000],
    [KnownSymbols.VAL, KnownSymbols.PSWAP, 1000000]
  ])('Reversed network fee should be same network fee AssetA=%s, AssetB=%s, Amount=%s', async (inputAssetSymbol, outputAssetSymbol, amount): Promise<void> => {
    //Given
    await testApi.importAccount(testUserSeed,"TestUser","1")

    const quote = await testApi.getSwapResult(
      KnownAssets.get(inputAssetSymbol).address,
      KnownAssets.get(outputAssetSymbol).address,
      amount,
      false
    )
    const networkFee = await testApi.getSwapNetworkFee(
      KnownAssets.get(inputAssetSymbol).address,
      KnownAssets.get(outputAssetSymbol).address,
      amount, +quote.amount, 1)
    //Then
    const reverseNetworkFee = await testApi.getSwapNetworkFee(
      KnownAssets.get(inputAssetSymbol).address,
      KnownAssets.get(outputAssetSymbol).address,
      amount, +quote.amount, 1, true)
    //When
    strictEqual(networkFee, reverseNetworkFee)
  })

  it.each([
    [KnownSymbols.XOR, KnownSymbols.VAL, 1, false, "1"],
    [KnownSymbols.XOR, KnownSymbols.PSWAP, 1, false, "1"],
    [KnownSymbols.VAL, KnownSymbols.XOR, 1, false, "1"],
    [KnownSymbols.PSWAP, KnownSymbols.XOR, 1, false, "1"],
    [KnownSymbols.XOR, KnownSymbols.VAL, 100, false, "1"],
    //[KnownSymbols.VAL, KnownSymbols.PSWAP, 100, false, "1"], //Not implemented yet
    [KnownSymbols.VAL, KnownSymbols.XOR, 100, false, "1"],
    [KnownSymbols.PSWAP, KnownSymbols.XOR, 100, false, "1"],
    [KnownSymbols.XOR, KnownSymbols.VAL, 0.0001, false, "1"],
    [KnownSymbols.VAL, KnownSymbols.XOR, 0.0001, false, "1"],
    [KnownSymbols.XOR, KnownSymbols.PSWAP, 0.0001, false, "1"],
    // [KnownSymbols.VAL, KnownSymbols.PSWAP, 0.0001, false, "1"], //Not implemented yet
    // [KnownSymbols.PSWAP, KnownSymbols.VAL, 0.0001, false, "1"] //Not implemented yet
  ])('SWAP %s to %s input amount = %s', async (inputAssetSymbol, outputAssetSymbol, amount, reversed, slippageTolerance): Promise<void> => {
    //Given
    let expectInputBalance: number
    let expectOutputBalance: number
    testApi.importAccount(testUserSeed,"Test","1")
    await testApi.getKnownAccountAssets()
    const inputToken = KnownAssets.get(inputAssetSymbol)
    const outputToken = KnownAssets.get(outputAssetSymbol)
    const ipBalance = testApi.accountAssets.find(i => i.symbol === inputAssetSymbol).balance
    const opBalance = testApi.accountAssets.find(i => i.symbol === outputAssetSymbol).balance
    const quote = await testApi.getSwapResult(
      inputToken.address,
      outputToken.address,
      amount
    )
    const networkFee = await testApi.getSwapNetworkFee(
      inputToken.address,
      outputToken.address,
      amount,
      quote.amount,
      slippageTolerance
    )

    //Then
    const swap = await testApi.swap(
      inputToken.address,
      outputToken.address,
      amount,
      quote.amount,
      1,
      reversed
    )

    //When
    await testApi.updateBalance(inputToken, ipBalance)
    if (inputAssetSymbol == KnownSymbols.XOR){
      expectInputBalance = +ipBalance - amount - +networkFee
      expectOutputBalance = +opBalance + +quote.amount
    } else if (outputAssetSymbol == KnownSymbols.XOR){
      expectInputBalance = +ipBalance - amount
      expectOutputBalance = +opBalance + +quote.amount - +networkFee
    } else {
      expectInputBalance = +ipBalance - amount
      expectOutputBalance = +opBalance + +quote.amount
    }
    expect(+testApi.accountAssets.find(i => i.symbol === inputAssetSymbol).balance).toBeCloseTo(expectInputBalance, 4)
    expect(+testApi.accountAssets.find(i => i.symbol === outputAssetSymbol).balance).toBeCloseTo(expectOutputBalance, 4)
  })

  it.each([
    [KnownSymbols.XOR, KnownSymbols.VAL, 100, false, "1"],
    [KnownSymbols.XOR, KnownSymbols.PSWAP, 100, false, "1"],
    [KnownSymbols.VAL, KnownSymbols.XOR, 100, false, "1"],
    [KnownSymbols.PSWAP, KnownSymbols.XOR, 100, false, "1"],
    // [KnownSymbols.VAL, KnownSymbols.PSWAP, 0.0001, false, "1"], //Not implemented yet
    // [KnownSymbols.PSWAP, KnownSymbols.VAL, 0.0001, false, "1"] //Not implemented yet
  ])('SWAP all %s tokens to %s, amount = %s', async (inputAssetSymbol, outputAssetSymbol, amount, reversed, slippageTolerance): Promise<void> => {
    //Given
    let swapAmount = amount
    let receiveAmount: number
    let amountForFee = 1
    const receiverSeed = testApi.createSeed().seed
    const dexKeyPair = testApi.createKeyring('sr25519', 'dex', dexSeed)
    const receiver = testApi.createKeyring('sr25519', 'receiver', await receiverSeed)
    const xor = KnownAssets.get(KnownSymbols.XOR)
    const inputToken = KnownAssets.get(inputAssetSymbol)
    const outputToken = KnownAssets.get(outputAssetSymbol)

    testApi.importAccount(receiverSeed,"Test","1")
    await testApi.mintTokens(dexKeyPair, amount, receiver, inputToken)
    if (inputAssetSymbol !== xor.symbol){
      await testApi.mintTokens(dexKeyPair, amountForFee, receiver, xor)
    } else { amountForFee = 0}
    await testApi.getKnownAccountAssets()

    const inputAccountToken = testApi.accountAssets.find(i => i.symbol === inputAssetSymbol)

    const quote = await testApi.getSwapResult(
      inputToken.address,
      outputToken.address,
      +inputAccountToken.balance
    )
    const networkFee = await testApi.getSwapNetworkFee(
      inputToken.address,
      outputToken.address,
      +inputAccountToken.balance,
      quote.amount,
      slippageTolerance
    )
    if (inputAssetSymbol == xor.symbol){
      swapAmount = amount - +networkFee
    } else if (outputAssetSymbol == xor.symbol) {
      receiveAmount = +quote.amount - +networkFee
    } else {
      receiveAmount = +quote.amount
    }

    //Then
    await testApi.swap(
      inputToken.address,
      outputToken.address,
      swapAmount,
      quote.amount,
      1,
      reversed
    )

    //When
    await testApi.updateBalance(inputToken, amount.toString())
    const inputBalance = inputAccountToken.balance
    const outputBalance = testApi.accountAssets.find(i => i.symbol === outputAssetSymbol).balance
    expect(+inputBalance).toBe(0)
    expect(+outputBalance).toBeCloseTo(receiveAmount + amountForFee, 4)
  })

  it.each([
    [KnownSymbols.XOR, KnownSymbols.VAL, 10, false, "1"],
    [KnownSymbols.XOR, KnownSymbols.VAL, 10, true, "1"],
    [KnownSymbols.XOR, KnownSymbols.PSWAP, 10, false, "1"],
    [KnownSymbols.XOR, KnownSymbols.PSWAP, 10, true, "1"]
  ])('Check liquidity provider fee', async (inputAssetSymbol, outputAssetSymbol, amount, reversed): Promise<void> => {
    //Given

    testApi.importAccount(testUserSeed,"Test","1")
    //Then
    const quote = await testApi.getSwapResult(
      KnownAssets.get(inputAssetSymbol).address,
      KnownAssets.get(outputAssetSymbol).address,
      amount,
      reversed
    )
    //When
    strictEqual(+quote.fee, +quote.amount*0.003) //todo need learn this situation
  })
})