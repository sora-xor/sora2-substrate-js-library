import { api, connection, FPNumber, KnownAssets, KnownSymbols, TransactionStatus } from '@sora-substrate/util'
import fs from 'fs'
import path from 'path'
import readline from 'readline'

const ENDPOINT = 'wss://ws.sora2.soramitsu.co.jp'

async function question (rl: readline.Interface, value: string): Promise<string> {
  return new Promise(resolve => rl.question(value, resolve))
}

async function getTransferParams (rl: readline.Interface, assetSymbol: string): Promise<Array<{ toAddress: string; amount: string; assetAddress: string }>> {
  const filename = await question(rl, `
\n\nPlease input a name of the CSV file for ${assetSymbol} tokens (without an extension)\n
This file should be located in "scripts" directory. If you want to skip it - just press "Enter"...\n\n`
  )
  let data = ''
  try {
    data = fs.readFileSync(path.resolve(__dirname, filename + '.csv')).toString()
  } catch (error) {
    console.warn(
`CSV file "${filename}" for "${assetSymbol}" tokens is not found! File should be located in "scripts" directory.\n
"filename" should be just a name of the file with extension without the path.\n
"${assetSymbol}" TRANSFERS WILL BE SKIPPED\n\n`
    )
    return []
  }
  const accountDataArray = data.split(/\r?\n/).filter((item, index) => item && index)
  const transferParams = []
  for (const accountData of accountDataArray) {
    const [_, toAddress, amount] = accountData.split(',')
    transferParams.push({ toAddress, amount, assetAddress: KnownAssets.get(assetSymbol).address })
  }
  return transferParams
}

async function delay (): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 500))
  if ([TransactionStatus.Error, TransactionStatus.Finalized].includes(api.history[0].status as any)) {
    return
  }
  await delay()
}

async function main(): Promise<void> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })
  const endpoint = await question(rl, `
  \n\nPlease input the endpoint ("${ENDPOINT}" will be set by default):\n
______________________________________________________________\n`
    )
  // Get data from files
  const xorParams = await getTransferParams(rl, KnownSymbols.XOR)
  const valParams = await getTransferParams(rl, KnownSymbols.VAL)
  const pswapParams = await getTransferParams(rl, KnownSymbols.PSWAP)
  const transferParams = [...xorParams, ...valParams, ...pswapParams]
  if (!transferParams.length) {
    throw new Error('There is no data. Please try again')
  }
  // Get mnemonic seed
  const mnemonicSeed = await question(rl, `
\n\nPlease input 12 words mnemonic seed with the following format:\n
one two three four five six seven eight nine ten eleven twelve\n
______________________________________________________________\n`
  )
  if (mnemonicSeed.split(' ').length !== 12) {
    throw new Error('Incorrect seed. It should be written with spaces like:\none two three four five six seven eight nine ten eleven twelve\n\n')
  }
  // Open connection & import account
  const usedEndpoint = endpoint.trim() || ENDPOINT
  await connection.open(usedEndpoint)
  api.initialize()
  console.log('Connected to:', usedEndpoint)
  const { address } = api.checkSeed(mnemonicSeed)
  if (!address) {
    throw new Error(`Mnemonic Seed "${mnemonicSeed}" is incorrect!\n\n`)
  }
  api.importAccount(mnemonicSeed, 'Test', 'qwasZX123')
  // Display network fee
  const fee = await api.getTransferAllNetworkFee(transferParams)
  console.log(`Network fee is ${FPNumber.fromCodecValue(fee).toLocaleString()} XOR\n`)
  // Submit transfers
  await api.transferAll(transferParams)
  await delay()
  if (api.history[0].status === TransactionStatus.Error) {
    throw new Error('Something went wrong:\n\n' + api.history[0].errorMessage)
  }

  await connection.close()
  console.log('\nDone!')
}

main().catch(console.error).finally(() => process.exit())
