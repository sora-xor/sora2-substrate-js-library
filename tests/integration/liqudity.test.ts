import { connection, DexApi, KnownAssets, KnownSymbols } from '@sora-substrate/util'
import { TestApi } from '../util'
import { ENV } from '../env'

const env = ENV.DEV
const TEST_ENDPOINT = env.URL
const dexSeed = env.DEX_SEED
const liquidityUserSeed = env.LIQUIDITY_USER_SEED

describe('Liquidity test functions', (): void => {
  let testApi: TestApi
  jest.setTimeout(1000000)
  beforeAll(async (done) => {
    testApi = new TestApi()
    await connection.open(TEST_ENDPOINT)
    await testApi.initialize()
    // await testApi.setupEnvironment(sudoSeed, testUserSeed, dexSeed)
    done()
  }, 10_000_000)
  afterAll(async (done) => {
    await connection.close()
    done()
  })
  it.each([
    [KnownSymbols.XOR, KnownSymbols.VAL, 100, 100, "1"],
    [KnownSymbols.XOR, KnownSymbols.PSWAP, 100, 100, "1"]
  ])('Add liquidity', async (symbolA: KnownSymbols, symbolB: KnownSymbols, amountA: number, amountB: number, slippageTolerance: string): Promise<void> => {
    //Given
    const dexKeyPair = testApi.createKeyring('sr25519', 'dex', dexSeed)
    const liquidityUser = testApi.createKeyring('sr25519', 'liquidityUser', liquidityUserSeed)
    const xor = KnownAssets.get(KnownSymbols.XOR)
    const tokenA = KnownAssets.get(symbolA)
    const tokenB = KnownAssets.get(symbolB)
    await testApi.importAccount(liquidityUserSeed,"liquidityUser","1")

    const liquidityFee = await testApi.getAddLiquidityNetworkFee(tokenA.address, tokenB.address, amountA, amountB, slippageTolerance)
    await testApi.mintTokens(dexKeyPair, amountA + +liquidityFee, liquidityUser, tokenA)
    await testApi.mintTokens(dexKeyPair, amountB, liquidityUser, tokenB)
    await testApi.getKnownAccountAssets()
    
    const liquidityInfo = await testApi.getLiquidityInfo(tokenA.address, tokenB.address)
    const liquidityReserve = await testApi.getLiquidityReserves(tokenA.address, tokenB.address)
    const accountLiquidity = await testApi.getAccountLiquidity(tokenA.address, tokenB.address)
    
    //Then
    await testApi.addLiquidity(tokenA.address, tokenB.address, amountA, amountB, slippageTolerance)
    await testApi.updateAccountLiquidity()

    //When
    expect(accountLiquidity.firstBalance).toBe(amountA)
    expect(accountLiquidity.secondAddress).toBe(amountB)
  })

  it('Remove liquidity', async (): Promise<void> => {
    //Given

    //Then

    //When

  })
})