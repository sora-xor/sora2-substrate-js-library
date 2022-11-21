import { mnemonicGenerate } from '@polkadot/util-crypto';

import { Api, connection, FaucetApi, FPNumber } from '@sora-substrate/util';
import { XOR } from '@sora-substrate/util/assets/consts';

import { delay } from './util';

const TEST_PASS = 'qwasZX123';

async function main(): Promise<void> {
  // Open connection & initiate the faucet instance
  await connection.open('wss://ws.framenode-3.s3.dev.sora2.soramitsu.co.jp');
  console.log('Connected!', connection.endpoint);
  const faucet = new FaucetApi();
  // Generate array of mnemonics
  const mnemonics = Array(10)
    .fill('')
    .map((_) => mnemonicGenerate());
  const apiInstances: Array<Api> = [];
  // Initiate api instances for each generated account & mint tokens via faucet
  for (let index = 0; index < mnemonics.length; index++) {
    const num = index + 1;
    const withKeyringLoading = false; // cuz keyring was loaded via the faucet instance
    const mnemonic = mnemonics[index];
    console.log(`Case #${num}, Seed: ${mnemonic}`);
    const api = new Api();
    api.initialize(withKeyringLoading);
    api.importAccount(mnemonic, `Account ${num}`, TEST_PASS);
    await faucet.send(XOR.address, api.account.pair.address, 10 + index);
    apiInstances.push(api);
  }
  // Wait until all faucet TXs are done
  // (need to check the exact number of secs, cuz it depends on number of mnemonics)
  await delay(5000);
  console.log('__________________________________________________________________________');
  // Check balances for each api instance
  for (const api of apiInstances) {
    const xor = await api.assets.getAccountAsset(XOR.address);
    const xorBalance = FPNumber.fromCodecValue(xor.balance.transferable).toString();
    console.log(`Account: ${api.account.pair.address}`);
    console.log(`${xorBalance} XOR`);
  }
  // Close the connection
  await connection.close();
  console.log('\nFINISH');
}

main()
  .catch(console.error)
  .finally(() => process.exit());
