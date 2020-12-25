import { KnownAssets, KnownSymbols, DexApi, FPNumber } from '@sora-substrate/util'

async function main(): Promise<void> {
  const mnemonicSeed = 'scissors spread water arrive damp face amazing shrug warfare silk dry prison'
  const xor = KnownAssets.get(KnownSymbols.XOR)
  const dot = KnownAssets.get(KnownSymbols.DOT)
  const anotherUser = '0x92c4ff71ae7492a1e6fef5d80546ea16307c560ac1063ffaa5e0e084df1e2b7e'
  const dexApi = new DexApi(/*'ws://localhost:9944'*/'wss://ws.stage.sora2.soramitsu.co.jp')
  await dexApi.initialize()
  const { address } = dexApi.checkSeed(mnemonicSeed)
  if (!address) {
    console.error('Mnemonic Seed is incorrect')
  }
  dexApi.importAccount(mnemonicSeed, 'Test', 'qwasZX123')
  // console.log(await dexApi.getKnownAccountAssets())
  // await dexApi.transfer(xor.address, anotherUser, '10')
  await dexApi.swap(xor.address, dot.address, 1, 2000)
  await new Promise(resolve => setTimeout(resolve, 40000))
  // console.log(await dexApi.getKnownAccountLiquidity())
  // await dexApi.updateAccountLiquidity() // per 5 seconds
  // console.log(dexApi.accountLiquidity) // here is the updated list
  // const isCorrect = await dexApi.checkLiquidity(xor.address, dot.address)
  // if (!isCorrect) {
  //   console.warn('Liquidity is invalid')
  //   return
  // }





  // Add liquidity
  // const [reserveA, reserveB] = await dexApi.getLiquidityReserves(xor.address, dot.address)
  // console.log('reserves', reserveA, reserveB) // show reserves
  // const minted = await dexApi.estimatePoolTokensMinted(xor.address, dot.address, '10', '20', reserveA, reserveB)
  // console.log('minted', minted) // show minted assets
  // await dexApi.addLiquidity(xor.address, dot.address, '10', '20')
  // await new Promise(resolve => setTimeout(resolve, 40000))

  // Remove liquidity
  // const [reserveA, reserveB] = await dexApi.getLiquidityReserves(xor.address, dot.address)
  // console.log('reserves', reserveA, reserveB) // show reserves
  // const [aOut, bOut, pts] = await dexApi.estimateTokensRetrieved(xor.address, dot.address, '99', reserveA, reserveB)
  // console.log('Retrieved', aOut, bOut, 'total supply', pts) // Show retrieved assets and total supply
  // await dexApi.removeLiquidity(xor.address, dot.address, '99', reserveA, reserveB, pts)
  // await new Promise(resolve => setTimeout(resolve, 40000))

  // console.log(await dexApi.getKnownAccountAssets())
  // console.log(await dexApi.getKnownAccountLiquidity())
  await dexApi.disconnect()
  console.log('\nFINISH')
}

main().catch(console.error).finally(() => process.exit())
