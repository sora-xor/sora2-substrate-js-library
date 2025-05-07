import { connectAndImportAccount, delay } from './util';
import { SORA_ENV } from '@sora-substrate/types/scripts/consts';
import { api, connection } from '@sora-substrate/sdk';
import { mnemonicGenerate } from '@polkadot/util-crypto';
import { Keyring } from '@polkadot/api';
import { XOR } from '@sora-substrate/sdk/assets/consts';

async function main(): Promise<void> {
  await connectAndImportAccount(SORA_ENV.test);
  const cast = new Keyring({ type: 'sr25519' });
  const accountAMnem = mnemonicGenerate(12);
  const accountBMnem = mnemonicGenerate(12);
  const accountCMnem = mnemonicGenerate(12);
  const recieverMnem = mnemonicGenerate(12);
  const userA = { passphrase: accountAMnem, keyring: cast.addFromMnemonic(accountAMnem) };
  const userB = { passphrase: accountBMnem, keyring: cast.addFromMnemonic(accountBMnem) };
  const userC = { passphrase: accountCMnem, keyring: cast.addFromMnemonic(accountCMnem) };
  const reciever = { passphrase: recieverMnem, keyring: cast.addFromMnemonic(recieverMnem) };
  await api.assets.transfer(XOR, userA.keyring.address, '100000');
  await api.assets.transfer(XOR, userB.keyring.address, '100000');
  await api.assets.transfer(XOR, userC.keyring.address, '100000');
  await delay(6000);
  api.logout();
  api.importAccount(userA.passphrase, 'test', '123456');
  const mstAccount = api.mst.createMST(
    [userA.keyring.address, userB.keyring.address, userC.keyring.address],
    3,
    'MST_Test'
  );
  api.mst.switchAccount(true);
  await api.assets.transfer(XOR, reciever.keyring.address, 100);
  await delay(6000);
  const callHash = (await api.api.query.multisig.multisigs.entries(api.formatAddress(mstAccount)))[0][0].toHuman()[1];
  api.logout();
  api.importAccount(userB.passphrase, 'test', '123456');
  api.mst.createMST([userA.keyring.address, userB.keyring.address, userC.keyring.address], 3, 'MST_Test');
  api.mst.switchAccount(true);
  await api.mst.approveMultisigExtrinsic(callHash, api.formatAddress(mstAccount));
  await connection.close();
}

main()
  .catch(console.error)
  .finally(() => process.exit());
