import { mnemonicGenerate } from '@polkadot/util-crypto';

import { Api, BaseApi, FPNumber, connection } from '@sora-substrate/sdk';
import { XOR } from '@sora-substrate/sdk/assets/consts';
import { SORA_ENV } from '@sora-substrate/types/scripts/consts';

import { delay } from './util';

const TEST_PASS = 'qwasZX123';

const fausetSignerSeed = 'fuel start grant tackle void tree unusual teach grocery jar pulp weird';
const faucetSignerName = 'Faucet Signer';
const faucetSignerPassword = 'qwaszx';

async function main(): Promise<void> {
  // Open connection & initiate the faucet instance
  await connection.open(SORA_ENV.test);
  console.log('Connected!', connection.endpoint);
  const faucet = new BaseApi();
  faucet.setConnection(connection);
  await faucet.initKeyring(true);
  faucet.importAccount(fausetSignerSeed, faucetSignerName, faucetSignerPassword);
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
    api.setConnection(connection);
    await api.initialize(withKeyringLoading);
    api.importAccount(mnemonic, `Account ${num}`, TEST_PASS);
    await faucet.submitExtrinsic(
      this.api.tx.faucet.transfer(XOR.address, api.account.pair.address, new FPNumber(10 + index).toCodecString()),
      this.faucetSigner.pair
    );
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
