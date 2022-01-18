import { api, connection } from '@sora-substrate/util'
import { KnownAssets, KnownSymbols } from '@sora-substrate/util/assets/consts'
// import fs from 'fs'

async function main(): Promise<void> {
  const mnemonicSeed = 'grant noodle usual oyster drip adult search toast liberty feel resource remind'
  const xor = KnownAssets.get(KnownSymbols.XOR)
  const val = KnownAssets.get(KnownSymbols.VAL)
  const pswap = KnownAssets.get(KnownSymbols.PSWAP)
  const anotherUserId = '0x92c4ff71ae7492a1e6fef5d80546ea16307c560ac1063ffaa5e0e084df1e2b7e'
  const anotherUserAddress = '5FP9NMFdYHgvsLE4jo2SAECUNWByaLo5HwhRy2wciPFTSMW3'
  await connection.open('wss://ws.framenode-3.s3.dev.sora2.soramitsu.co.jp')
  api.initialize()
  const { address } = api.checkSeed(mnemonicSeed)
  if (!address) {
    console.error('Mnemonic Seed is incorrect')
  }
  api.importAccount(mnemonicSeed, 'Test', 'qwasZX123')
  console.log('Connected!', api.address)
  const assets = (await api.assets.getAssets())
  console.log(assets.filter(item => item.symbol === KnownSymbols.XOR))
  console.log(assets.filter(item => item.decimals != 18))
  // 0. Subscribe on account assets
  // await api.getKnownAccountAssets();
  // const assetsSubscription = api.assetsBalanceUpdated.subscribe(() => {
  //   console.log(api.accountAssets.find(asset => asset.address === XOR.address).balance)
  // })
  // api.updateAccountAssets();

  // // 1. Get XOR balance
  // let accAssets = await api.getKnownAccountAssets()
  // let xorAccAsset = accAssets.find(item => item.address === XOR.address)
  // // 2. Calc MAX swapped value
  // const fee = FPNumber.fromCodecValue(api.NetworkFee.Swap)
  // const maxXorAmount = FPNumber.fromCodecValue(xorAccAsset.balance.transferable).sub(fee).toString()
  // // 3. Get SWAP result
  // const res = await api.getSwapResult(XOR.address, val.address, maxXorAmount)
  // const stringRes = FPNumber.fromCodecValue(res.amount).toString()
  // console.log(maxXorAmount, stringRes)
  // // 4. SWAP
  // await api.swap(XOR.address, val.address, maxXorAmount, stringRes)
  // await new Promise(resolve => setTimeout(resolve, 4000000))
  // // 5. Check balance
  // accAssets = await api.getKnownAccountAssets()
  // xorAccAsset = accAssets.find(item => item.address === XOR.address)
  // const updatedXorBalance = FPNumber.fromCodecValue(xorAccAsset.balance.transferable).toString()
  // console.log('updatedXorBalance', updatedXorBalance)

  // const assets = (await api.getAssets()).filter(asset => isRegisteredAsset(asset)).map(item => ({ ...item, icon: RegisteredAssets[item.address] }))
  // const obj = {} as any
  // for (const asset of assets) {
  //   obj[asset.address] = {
  //     symbol: asset.symbol,
  //     name: asset.name,
  //     decimals: asset.decimals,
  //     icon: RegisteredAssets[asset.address]
  //   }
  // }
  // fs.writeFileSync('whitelist.json', JSON.stringify(assets, null, 4))

  await connection.close()
  console.log('\nFINISH')
}

main().catch(console.error).finally(() => process.exit())
