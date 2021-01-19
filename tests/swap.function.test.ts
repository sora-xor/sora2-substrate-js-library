import { DexApi, KnownAssets, KnownSymbols } from '@sora-substrate/util'
import { TestUtils, getAsset, updateBalance, createKeyring, setupEnvironment } from './util'
import { ApiPromise } from '@polkadot/api'
import { strictEqual } from 'assert'

const TEST_ENDPOINT = 'wss://ws.framenode-1.s1.dev.sora2.soramitsu.co.jp/'

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
  let utils: TestUtils
  let dexApi: DexApi
  beforeAll(async (done) => {
    dexApi = new DexApi(TEST_ENDPOINT)
    utils = new TestUtils
    await dexApi.initialize()
    await setupEnvironment(TEST_ENDPOINT, dexApi, sudoSeed, dexSeed)
    done()
  }, 10_000_000)
  afterAll(async (done) => {
    await dexApi.disconnect()
    await utils.disconnect()
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
    const quote = await dexApi.getSwapResult(
      getAsset(inputAssetSymbol).address,
      getAsset(outputAssetSymbol).address,
      amount,
      reversed
    )
    //When
    strictEqual(quote.amount, gettingAsset)
  })
  it.each([
    ["XOR", "VAL", 0.1, false, "0.5"],
    ["XOR", "KSM", 10, false, "0.5"],
    ["XOR", "DOT", 10, false, "0.5"],
    ["XOR", "PSWAP", 10, false, "0.5"],
    ["XOR", "USD", 10, false, "0.5"],
  ])('SWAP Assets', async (inputAssetSymbol, outputAssetSymbol, amount, reversed, slippageTolerance): Promise<void> => {
    //Given
    dexApi.importAccount(sudoSeed,"Sudo","1")
    await dexApi.getKnownAccountAssets()
    const inputBalanceBeforeSwap = dexApi.accountAssets.find(i => i.symbol === inputAssetSymbol).balance
    const outputBalanceBeforeSwap = dexApi.accountAssets.find(i => i.symbol === outputAssetSymbol).balance
    const quote = await dexApi.getSwapResult(
      getAsset(inputAssetSymbol).address,
      getAsset(outputAssetSymbol).address,
      amount,
      reversed
    )
    const checkInputSum = +inputBalanceBeforeSwap - 210.10125
    const checkOutputSum = +outputBalanceBeforeSwap + +quote.amount
    //Then
    await dexApi.swap(
      getAsset(inputAssetSymbol).address,
      getAsset(outputAssetSymbol).address,
      amount,
      quote.amount,
      slippageTolerance,
      reversed
    )
    //When
    await updateBalance(inputAssetSymbol, inputBalanceBeforeSwap, dexApi)
    strictEqual(dexApi.accountAssets.find(i => i.symbol === inputAssetSymbol).balance, String(checkInputSum))
    strictEqual(dexApi.accountAssets.find(i => i.symbol === outputAssetSymbol).balance, String(checkOutputSum))
  })
  it.each([
    [KnownSymbols.XOR, "100500"],
    [KnownSymbols.DOT, "100500"],
    [KnownSymbols.KSM, "100500"],
    [KnownSymbols.PSWAP, "100500"],
    [KnownSymbols.USD, "100500"],
    [KnownSymbols.VAL, "100500"]
  ])('Transfer "%s", Amount = %s', async (assetSymbol, amount): Promise<void> => {
    //Given
    const sudoUser = createKeyring('sr25519', 'SudoUser', sudoSeed)
    const receivedUser = createKeyring('sr25519', 'ReceiveUser')
    //Then
    await utils.submitExtrinsic(dexApi.api, dexApi.api.tx.assets.transfer(getAsset(assetSymbol).toString(), receivedUser.address, amount), sudoUser, "Transfer "+assetSymbol+" to random user")
    //When
    const balance = await (dexApi.api.rpc as any).assets.freeBalance(receivedUser.address, getAsset(assetSymbol).address)
    strictEqual(balance.unwrap().balance.toString(), amount)
  })
})