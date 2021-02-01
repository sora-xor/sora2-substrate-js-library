import { connection, DexApi, KnownAssets, KnownSymbols } from '@sora-substrate/util'
import { TestApi } from '../util'
import { ENV } from '../env'

const env = ENV.STAGE
const TEST_ENDPOINT = env.URL
const sudoSeed = env.SUDO_SEED
const dexSeed = env.DEX_SEED
const testUserSeed = env.USER_SEED

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
  it('Get liquidity queue', async (): Promise<void> => {
    //Given
    await testApi.importAccount(testUserSeed,"TestUser","1")
    const liquidityAsset = await testApi.getLiquidityInfo(KnownAssets.get(KnownSymbols.XOR).address, KnownAssets.get(KnownSymbols.PSWAP).address)
    //Then
    const accLiquidity = await testApi.getAccountLiquidity(KnownAssets.get(KnownSymbols.XOR).address, KnownAssets.get(KnownSymbols.PSWAP).address)
    const x = await testApi.getLiquidityReserves(KnownAssets.get(KnownSymbols.XOR).address, KnownAssets.get(KnownSymbols.PSWAP).address)
    await testApi.addLiquidity(KnownAssets.get(KnownSymbols.XOR).address, KnownAssets.get(KnownSymbols.PSWAP).address, 100000000000000000000, 100000000000000000000)
    //When
    const accLiquidityAfter = await testApi.getAccountLiquidity(KnownAssets.get(KnownSymbols.XOR).address, KnownAssets.get(KnownSymbols.PSWAP).address)
    const y = await testApi.getLiquidityReserves(KnownAssets.get(KnownSymbols.XOR).address, KnownAssets.get(KnownSymbols.PSWAP).address)
    console.log("liquidityInfo")
  })

  it('Delete liquidity', async (): Promise<void> => {
    //Given

    //Then

    //When

  })
})