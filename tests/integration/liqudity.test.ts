import { connection, DexApi, KnownAssets, KnownSymbols } from '@sora-substrate/util'
import { TestApi } from '../util'
import { config } from '../config'

const TEST_ENDPOINT = config.url
const sudoSeed = config.sudoSeed
const dexSeed = config.dexSeed
const testUserSeed = config.userSeed
const liquidityUserSeed = config.liquiditySeed

describe('Liquidity test functions', (): void => {
  let testApi: TestApi
  jest.setTimeout(1000000)
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
  it.each([
    [KnownSymbols.XOR, KnownSymbols.VAL, 10, "1"],
    [KnownSymbols.XOR, KnownSymbols.PSWAP, 100, "1"],
    [KnownSymbols.XOR, KnownSymbols.VAL, 0.001, "1"],
    [KnownSymbols.XOR, KnownSymbols.PSWAP, 0.0001, "1"]
  ])('Add liquidity for %s and %s, amount of first asset=%s', async (symbolA: KnownSymbols, symbolB: KnownSymbols, amountA: number, slippageTolerance: string): Promise<void> => {
    //Given
    const amountForMint = 1000
    let accountLiquidity
    const dexKeyPair = testApi.createKeyring('sr25519', 'dex', dexSeed)
    const liquidityUser = testApi.createKeyring('sr25519', 'liquidityUser', liquidityUserSeed)
    const xor = KnownAssets.get(KnownSymbols.XOR)
    await testApi.importAccount(liquidityUserSeed,"liquidityUser","1")

    await testApi.mintTokens(dexKeyPair, amountForMint, liquidityUser, KnownAssets.get(symbolA))
    await testApi.mintTokens(dexKeyPair, amountForMint, liquidityUser, KnownAssets.get(symbolB))
    await testApi.getKnownAccountAssets()
    const accountAssetA = testApi.accountAssets.find(i => i.symbol === symbolA)
    const accountAssetB = testApi.accountAssets.find(i => i.symbol === symbolB)
    
    const liquidityReserve = await testApi.getLiquidityReserves(accountAssetA.address, accountAssetB.address)
    const estimate = await testApi.estimateTokensRetrieved(accountAssetA.address, accountAssetB.address, amountA, liquidityReserve[0], liquidityReserve[1])
    accountLiquidity = await testApi.getAccountLiquidity(accountAssetA.address, accountAssetB.address)
    await testApi.updateAccountLiquidity()
    const firstLiquidityBalanceBefore = accountLiquidity.firstBalance
    const secondLiquidityBalanceBefore = accountLiquidity.secondBalance
    
    //Then
    await testApi.addLiquidity(accountAssetA.address, accountAssetB.address, estimate[0], estimate[1], slippageTolerance)

    //When
    await testApi.updateBalance(xor, accountAssetA.balance)
    accountLiquidity = await testApi.getAccountLiquidity(accountAssetA.address, accountAssetB.address)
    await testApi.updateAccountLiquidity()
    
    const firstBalanceAfter = +firstLiquidityBalanceBefore + +estimate[0]
    const secondBalanceAfter = +secondLiquidityBalanceBefore + +estimate[1]
    expect(+accountLiquidity.firstBalance).toBeCloseTo(+firstBalanceAfter, 5)
    expect(+accountLiquidity.secondBalance).toBeCloseTo(+secondBalanceAfter, 5)
  })
 
  it.each([
    [KnownSymbols.XOR, KnownSymbols.VAL, 10, "1"],
    [KnownSymbols.XOR, KnownSymbols.PSWAP, 100, "1"],
    [KnownSymbols.XOR, KnownSymbols.VAL, 0.01, "1"],
    [KnownSymbols.XOR, KnownSymbols.PSWAP, 0.01, "1"]
  ])('Remove liquidity for %s - %s pair, remove poolToken Amount=%s', async (symbolA: KnownSymbols, symbolB: KnownSymbols, removeAmount: number, slippageTolerance: string): Promise<void> => {
    //Given
    let accountLiquidity
    const liquidityUser = testApi.createKeyring('sr25519', 'liquidityUser', liquidityUserSeed)
    const xor = KnownAssets.get(KnownSymbols.XOR)
    await testApi.importAccount(liquidityUserSeed,"liquidityUser","1")

    await testApi.getKnownAccountAssets()
    const accountAssetA = testApi.accountAssets.find(i => i.symbol === symbolA)
    const accountAssetB = testApi.accountAssets.find(i => i.symbol === symbolB)
    const balanceBeforeRemoveA = accountAssetA.balance
    const balanceBeforeRemoveB = accountAssetB.balance

    accountLiquidity = await testApi.getAccountLiquidity(accountAssetA.address, accountAssetB.address)
    await testApi.updateAccountLiquidity()
    const balancePoolTokenBeforeRemove = accountLiquidity.balance
    if (+balancePoolTokenBeforeRemove < removeAmount){
      console.log("Balance of pool token=" +balancePoolTokenBeforeRemove+ " less that removeAmount=" +removeAmount)
    }

    const liquidityReserve = await testApi.getLiquidityReserves(accountAssetA.address, accountAssetB.address)
    const estimate = await testApi.estimateTokensRetrieved(accountAssetA.address, accountAssetB.address, removeAmount, liquidityReserve[0], liquidityReserve[1])

    const networkFee = await testApi.getRemoveLiquidityNetworkFee(accountAssetA.address, accountAssetB.address, removeAmount, liquidityReserve[0], liquidityReserve[1], estimate[2], slippageTolerance)

    //Then
    await testApi.removeLiquidity(accountAssetA.address, accountAssetB.address, removeAmount, liquidityReserve[0], liquidityReserve[1], estimate[2], slippageTolerance)

    //When
    await testApi.updateBalance(xor, accountAssetA.balance)
    accountLiquidity = await testApi.getAccountLiquidity(accountAssetA.address, accountAssetB.address)
    await testApi.updateAccountLiquidity()

    const balanceAfterRemoveA = +balanceBeforeRemoveA + +estimate[0] - +networkFee
    const balanceAfterRemoveB = +balanceBeforeRemoveB + +estimate[1]
    const balancePoolTokenAfterRemove = +balancePoolTokenBeforeRemove - removeAmount
    expect(+accountLiquidity.balance).toBeCloseTo(balancePoolTokenAfterRemove, 5)
    expect(+accountAssetA.balance).toBeCloseTo(balanceAfterRemoveA, 5)
    expect(+accountAssetB.balance).toBeCloseTo(balanceAfterRemoveB, 5)
  })

  it.each([
    [KnownSymbols.XOR, KnownSymbols.VAL, 10, "1"],
    [KnownSymbols.XOR, KnownSymbols.PSWAP, 100, "1"],
    [KnownSymbols.XOR, KnownSymbols.VAL, 300, "1"],
    [KnownSymbols.XOR, KnownSymbols.PSWAP, 500, "1"],
    [KnownSymbols.XOR, KnownSymbols.VAL, 0.1, "1"],
    [KnownSymbols.XOR, KnownSymbols.PSWAP, 0.1, "1"]
  ])('Remove all liquidity pair: %s-%s, amountAssetA = %s', async (symbolA: KnownSymbols, symbolB: KnownSymbols, amountA: number, slippageTolerance: string): Promise<void> => {
    //Given
    let accountLiquidity
    const amountForMint = 10000
    const userSeed = testApi.createSeed().seed
    const dexKeyPair = testApi.createKeyring('sr25519', 'dex', dexSeed)
    const user = testApi.createKeyring('sr25519', 'receiver', await userSeed)
    const xor = KnownAssets.get(KnownSymbols.XOR)
    const tokenA = KnownAssets.get(symbolA)
    const tokenB = KnownAssets.get(symbolB)

    testApi.importAccount(userSeed,"Test","1")
    await testApi.mintTokens(dexKeyPair, amountForMint, user, tokenA)
    await testApi.mintTokens(dexKeyPair, amountForMint, user, tokenB)
    await testApi.getKnownAccountAssets()
    const accountAssetA = testApi.accountAssets.find(i => i.symbol === symbolA)
    const accountAssetB = testApi.accountAssets.find(i => i.symbol === symbolB)

    let liquidityReserve = await testApi.getLiquidityReserves(tokenA.address, tokenB.address)
    const estimateAdd = await testApi.estimateTokensRetrieved(tokenA.address, tokenB.address, amountA, liquidityReserve[0], liquidityReserve[1])

    await testApi.addLiquidity(accountAssetA.address, accountAssetB.address, estimateAdd[0], estimateAdd[1], slippageTolerance)

    await testApi.updateBalance(xor, accountAssetA.balance)
    accountLiquidity = await testApi.getAccountLiquidity(accountAssetA.address, accountAssetB.address)
    await testApi.updateAccountLiquidity()
    const poolTokenBalanceBefore = accountLiquidity.balance

    liquidityReserve = await testApi.getLiquidityReserves(tokenA.address, tokenB.address)
    const estimateRemove = await testApi.estimateTokensRetrieved(tokenA.address, tokenB.address, +accountLiquidity.balance, liquidityReserve[0], liquidityReserve[1])

    //Then
    await testApi.removeLiquidity(accountAssetA.address, accountAssetB.address, poolTokenBalanceBefore, liquidityReserve[0], liquidityReserve[1], estimateRemove[2], slippageTolerance)

    //When
    await testApi.updateBalance(xor, accountAssetA.balance)
    accountLiquidity = await testApi.getAccountLiquidity(accountAssetA.address, accountAssetB.address)
    await testApi.updateAccountLiquidity()

    expect(+accountLiquidity.balance).toBe(0)
    expect(+accountLiquidity.firstBalance).toBe(0)
    expect(+accountLiquidity.secondBalance).toBe(0)
  })

  it("Remove liquidity during change total supply with swap")
  //TODO
  
  it("Remove liquidity during change total supply with add supply")
  //TODO
})