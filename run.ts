import { KnownAssets, KnownSymbols, DexApi } from '@sora-substrate/util'

async function main(): Promise<void> {
  const mnemonicSeed = 'scissors spread water arrive damp face amazing shrug warfare silk dry prison'
  const xor = KnownAssets.get(KnownSymbols.XOR)
  const dot = KnownAssets.get(KnownSymbols.DOT)
  const oneXor = '1000000000000000000'
  const halfXor = '500000000000000000'
  const anotherUser = '0xda723e9d76bd60da0ec846895c5e0ecf795b50ae652c012f27e56293277ef372'
  console.log('START')
  const dexApi = new DexApi(/*'ws://localhost:9944'*/'wss://ws.stage.sora2.soramitsu.co.jp')
  await dexApi.initialize()
  console.log('\nCONNECTED\n')
  const { address } = dexApi.checkSeed(mnemonicSeed)
  if (!address) {
    console.error('Mnemonic Seed is incorrect')
  }
  dexApi.importAccount(mnemonicSeed, 'Test', 'qwasZX123')

  // Check total supply
  // const liquidity = await dexApi.getAccountLiquidity(xor.address, dot.address)
  // const reserves = await dexApi.checkLiquidityReserves(xor.address, dot.address)
  // await dexApi.calculateTotalSupply(xor.address, dot.address, oneXor, halfXor, reserves[0], reserves[1])
  // End check

  console.log(await dexApi.getKnownAccountAssets())
  console.log(await dexApi.getKnownAccountLiquidity())
  await dexApi.disconnect()
  console.log('\nFINISH')
}

main().catch(console.error).finally(() => process.exit())
