import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { encodeMultiAddress, sortAddresses } from '@polkadot/util-crypto';

import { api, connection, FPNumber, TransactionStatus } from '@sora-substrate/util';
import { NativeAssets } from '@sora-substrate/util/assets/consts';

const ENDPOINT = 'wss://mof3.sora.org';

async function question(rl: readline.Interface, value: string): Promise<string> {
  return new Promise((resolve) => rl.question(value, resolve));
}

async function getTransferParams(
  rl: readline.Interface
): Promise<Array<{ toAddress: string; amount: string; assetAddress: string }>> {
  const filename = await question(
    rl,
    `
\n\nPlease input a name of the CSV file (without an extension)\n
This file should be located in "scripts" directory.\n\n`
  );
  let data = '';
  try {
    data = fs.readFileSync(path.resolve(__dirname, filename + '.csv')).toString();
  } catch (error) {
    console.warn(
      `CSV file "${filename}" is not found! File should be located in "scripts" directory.\n
"filename" should be just a name of the file with extension without the path.\n\n`
    );
    return [];
  }
  const accountDataArray = data.split(/\r?\n/).filter((item, index) => item && index);
  const transferParams = [];
  for (const accountData of accountDataArray) {
    const [_, toAddress, amount, symbolOrAssetId] = accountData.split(';');
    const asset = NativeAssets.get(symbolOrAssetId);
    if (!asset) {
      continue;
    }
    transferParams.push({ toAddress, amount, assetAddress: asset.address });
  }
  return transferParams;
}

async function delay(): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const historyItem = Object.values(api.history)[0];
  if ([TransactionStatus.Error, TransactionStatus.Finalized].includes(historyItem.status as any)) {
    return;
  }
  await delay();
}

async function main(): Promise<void> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  // Get data from files
  const transferParams = await getTransferParams(rl);
  console.log(transferParams);
  if (!transferParams.length) {
    throw new Error('There is no data. Please try again');
  }
  const endpoint = await question(
    rl,
    `
  \n\nPlease input the endpoint ("${ENDPOINT}" will be set by default):\n
______________________________________________________________\n`
  );
  // Open connection & import account
  const usedEndpoint = endpoint.trim() || ENDPOINT;
  await connection.open(usedEndpoint);
  api.initialize();
  console.log('Connected to:', usedEndpoint);
  // Get mnemonic seed
  const mnemonicSeed = await question(
    rl,
    `
\n\nPlease input 12 words mnemonic seed with the following format:\n
one two three four five six seven eight nine ten eleven twelve\n
______________________________________________________________\n`
  );
  if (mnemonicSeed.split(' ').length !== 12) {
    throw new Error(
      'Incorrect seed. It should be written with spaces like:\none two three four five six seven eight nine ten eleven twelve\n\n'
    );
  }
  const { address } = api.checkSeed(mnemonicSeed);
  if (!address) {
    throw new Error(`Mnemonic Seed "${mnemonicSeed}" is incorrect!\n\n`);
  }
  api.importAccount(mnemonicSeed, 'Test', 'qwasZX123');
  // MST account creation
  const mstAccountsStr = await question(
    rl,
    `
  \n\nPlease input all co-signers account addresses (SORA address should start with cn) using "," between it:\n
______________________________________________________________\n`
  );
  const threshold = +(
    await question(
      rl,
      `
  \n\nPlease input threshold for MST account (it should be <= number of co-signers):\n
______________________________________________________________\n`
    )
  ).trim();
  const coSigners = sortAddresses(mstAccountsStr.split(',').map((item) => item.trim()));
  const multisig = api.formatAddress(encodeMultiAddress([address, ...coSigners], threshold));
  console.log('______________________________________________________________');
  console.log(`Your Multisig Address: ${multisig}\n`);
  // Display network fee & MST TX preparation
  const call = api.mstTransfers.prepareCall(transferParams);
  const extrinsic = api.mstTransfers.prepareExtrinsic(call, threshold, coSigners);
  const fee = await api.mstTransfers.getNetworkFee(extrinsic);
  console.log(`Network fee is ${FPNumber.fromCodecValue(fee).toLocaleString()} XOR\n`);
  await question(
    rl,
    `
  \n\nPLEASE CHECK ALL DATA AND YOUR XOR AMOUNT FOR FEE.\n
If everything is OK, just press "Enter"\n
______________________________________________________________\n`
  );
  // Submit transfers
  await api.mstTransfers.submit(extrinsic);
  await delay();
  const historyItem = Object.values(api.history)[0];
  const lastPendingTx = await api.mstTransfers.getLastPendingTx(multisig);
  if (historyItem.status === TransactionStatus.Error || !lastPendingTx) {
    throw new Error('Something went wrong\n\n' + historyItem.errorMessage);
  }
  console.log('______________________________________________________________\nIMPORTANT!');
  console.log('Pending TX which co-signers should sign:\n', lastPendingTx, '\n');
  console.log('Call data which you should send for all co-signers:\n', call.method.toHex());
  console.log('______________________________________________________________');
  await connection.close();
  console.log('\nDone!');
}

main()
  .catch(console.error)
  .finally(() => process.exit());
