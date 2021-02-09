import { connection, KnownAssets, KnownSymbols } from '@sora-substrate/util'
import { TestApi } from '../util'
import { config } from '../config'

const TEST_ENDPOINT = config.url
const sudoSeed = config.sudoSeed
const dexSeed = config.dexSeed
const testUserSeed = config.userSeed

describe('Test Transfer function', (): void => {
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
  it.only.each([
    [KnownSymbols.XOR, 10],
    [KnownSymbols.PSWAP, 10],
    [KnownSymbols.VAL, 10]
  ])('Transfer %s amount= %s', async (assetSymbol, amount): Promise<void> => {
    //Given
    let transferAmount: number
    const receiverSeed = testApi.createSeed().seed
    const dexKeyPair = testApi.createKeyring('sr25519', 'dex', dexSeed)
    const receiver = testApi.createKeyring('sr25519', 'receiver', await receiverSeed)
    const senderSeed = testApi.createSeed().seed
    const sender = testApi.createKeyring('sr25519', "Sender", senderSeed)
    const xor = KnownAssets.get(KnownSymbols.XOR)
    const inputAsset = KnownAssets.get(assetSymbol)

    testApi.importAccount(senderSeed,"Test","1")
    await testApi.mintTokens(dexKeyPair, amount, sender, inputAsset)
    if (assetSymbol !== xor.symbol){
      await testApi.mintTokens(dexKeyPair, 1, sender, xor)
    }
    await testApi.getKnownAccountAssets()

    const senderAccountAsset = testApi.accountAssets.find(i => i.symbol === assetSymbol)
    const balanceBeforeTransfer = senderAccountAsset.balance

    const networkFee = await testApi.getTransferNetworkFee(inputAsset.address, receiver.address, amount)

    if (assetSymbol == xor.symbol){
      transferAmount = amount - +networkFee
    } else {
      transferAmount = amount
    }

    //Then
    await testApi.transfer(inputAsset.address, receiver.address, transferAmount)

    //When
    await testApi.updateBalance(inputAsset, balanceBeforeTransfer)
    const result = +balanceBeforeTransfer - amount

    expect(+senderAccountAsset.balance).toBe(result)
  })
})