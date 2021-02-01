import { KnownAssets, KnownSymbols } from '@sora-substrate/util'
import { TestApi } from '../util'
import { strictEqual } from 'assert'

const TEST_ENDPOINT = 'wss://ws.framenode-1.s1.dev.sora2.soramitsu.co.jp/'
//wss://ws.stage.sora2.soramitsu.co.jp/
//wss://ws.framenode-1.s1.dev.sora2.soramitsu.co.jp/

/*
Seeds for testnet can found here:
https://soramitsu.atlassian.net/wiki/spaces/PLS/pages/2224816140/Environments
*/
// const sudoSeed = "scissors spread water arrive damp face amazing shrug warfare silk dry prison"
const sudoSeed = "era actor pluck voice frost club gallery palm moment empower whale flame"
// const dexSeed = "era actor pluck voice frost club gallery palm moment empower whale flame"
const dexSeed = "scissors spread water arrive damp face amazing shrug warfare silk dry prison"
const testUserSeed = "nominee hundred leader math hurt federal limit frozen flag skirt sentence hello"

describe('Test SWAP function', (): void => {
  let testApi: TestApi
  jest.setTimeout(1000000)
  beforeAll(async (done) => {
    testApi = new TestApi(TEST_ENDPOINT)
    await testApi.initialize()
    await testApi.setupEnvironment(sudoSeed, testUserSeed)
    done()
  }, 10_000_000)
  afterAll(async (done) => {
    await testApi.disconnect()
    done()
  })
  it.each([
    [KnownSymbols.XOR, KnownSymbols.VAL, 1, false, "0.381288"],
    [KnownSymbols.XOR, KnownSymbols.VAL, 10, false, "3.78328"],
    [KnownSymbols.XOR, KnownSymbols.VAL, 100, false, "35.107074"],
    [KnownSymbols.XOR, KnownSymbols.VAL, 1000, false, "204.055492"],
    [KnownSymbols.XOR, KnownSymbols.VAL, 10000, false, "393.350535"],
  ])('Check liqudityProxyQuote Assets: "%s" to "%s", Amount = %s', async (inputAssetSymbol, outputAssetSymbol, amount, reversed, gettingAsset): Promise<void> => {
    //Given
    //Then
    const quote = await testApi.getSwapResult(
      KnownAssets.get(inputAssetSymbol).address,
      KnownAssets.get(outputAssetSymbol).address,
      amount,
      reversed
    )
    //When
    strictEqual(quote.amount, gettingAsset)
  })
  it.each([
    [KnownSymbols.XOR, KnownSymbols.VAL, 26.61, false, "1"],
    // ["XOR", "KSM", 10, false, "0.5"],
    // ["XOR", "DOT", 10, false, "0.5"],
    // ["XOR", "PSWAP", 10, false, "0.5"],
    // ["XOR", "USD", 10, false, "0.5"],
  ])('SWAP Assets', async (inputAssetSymbol, outputAssetSymbol, amount, reversed, slippageTolerance): Promise<void> => {
    //Given
    testApi.importAccount(testUserSeed,"Sudo","1")
    await testApi.getKnownAccountAssets()
    const inputBalanceBeforeSwap = testApi.accountAssets.find(i => i.symbol === inputAssetSymbol).balance
    const outputBalanceBeforeSwap = testApi.accountAssets.find(i => i.symbol === outputAssetSymbol).balance

    const quote = await testApi.getSwapResult(
      KnownAssets.get(inputAssetSymbol).address,
      KnownAssets.get(outputAssetSymbol).address,
      inputBalanceBeforeSwap
    )

    const fee = await testApi.getSwapNetworkFee(
      KnownAssets.get(inputAssetSymbol).address, KnownAssets.get(outputAssetSymbol).address, inputBalanceBeforeSwap,
      +quote.amount,
      1
    )
    const liquidityfee = await testApi.getAddLiquidityNetworkFee(
      KnownAssets.get(inputAssetSymbol).address,
      KnownAssets.get(outputAssetSymbol).address,
      inputBalanceBeforeSwap,
      +quote.amount,
      1
    )
    const receive = +quote.amount - +quote.fee
    //Then
    const result = +inputBalanceBeforeSwap - +fee
    const swap = await testApi.swap(
      KnownAssets.get(inputAssetSymbol).address,
      KnownAssets.get(outputAssetSymbol).address,
      result,
      receive,
      1,
      reversed
    )

    //When
    await testApi.updateBalance(inputAssetSymbol, inputBalanceBeforeSwap)

    strictEqual(testApi.accountAssets.find(i => i.symbol === inputAssetSymbol).balance, String(quote.amount))//TODO
    strictEqual(testApi.accountAssets.find(i => i.symbol === outputAssetSymbol).balance, String(quote.amount))
  })

  it.each([
    [KnownSymbols.XOR, "100500"],
    // [KnownSymbols.DOT, "100500"],
    // [KnownSymbols.KSM, "100500"],
    // [KnownSymbols.PSWAP, "100500"],
    // [KnownSymbols.USD, "100500"],
    // [KnownSymbols.VAL, "100500"]
  ])('Transfer "%s", Amount = %s', async (assetSymbol, amount): Promise<void> => {
    //Given
    const sudoUser = testApi.createKeyring('sr25519', 'SudoUser', sudoSeed)
    const receivedUser = testApi.createKeyring('sr25519', 'ReceiveUser')
    const balanceBeforeSwap = testApi.accountAssets.find(i => i.symbol === assetSymbol).balance
    //Then
    const fee = await testApi.getTransferNetworkFee(KnownAssets.get(assetSymbol).address, receivedUser.address, amount)
    await testApi.transfer(KnownAssets.get(assetSymbol).address, receivedUser.address, amount)
    //When
    await testApi.updateBalance(assetSymbol, balanceBeforeSwap)
    const result = +testApi.accountAssets.find(i => i.symbol === assetSymbol).balance - +balanceBeforeSwap - +fee

    strictEqual(result, amount)
  })
})