import { mnemonicGenerate, mnemonicToMiniSecret, sr25519PairFromSeed } from '@polkadot/util-crypto';
import { withConnectedAccount } from './util';
import { api, Cosigners } from '@sora-substrate/sdk';

async function main(): Promise<void> {
  await withConnectedAccount(async () => {
    const aliceMnemonic = mnemonicGenerate();
    const aliceSeed = mnemonicToMiniSecret(aliceMnemonic);
    const alice = sr25519PairFromSeed(aliceSeed);

    const bobMnemonic = mnemonicGenerate();
    const bobSeed = mnemonicToMiniSecret(bobMnemonic);
    const bob = sr25519PairFromSeed(bobSeed);

    const charlieMnemonic = mnemonicGenerate();
    const charlieSeed = mnemonicToMiniSecret(charlieMnemonic);
    const charlie = sr25519PairFromSeed(charlieSeed);

    const callData = { foo: 'bar', number: 42 };
    const callDataStr = JSON.stringify(callData);
    const cosigners: Cosigners = {
      alice: alice.publicKey,
      bob: bob.publicKey,
      charlie: charlie.publicKey,
    };

    const finalEncrypted = api.crypto.encryptBySigner(callDataStr, cosigners, alice.secretKey);

    console.log('Final Encrypted Structure:', JSON.stringify(finalEncrypted, null, 2));
    const decryptedCallDataBob = api.crypto.decryptForCosigner('bob', alice.publicKey, finalEncrypted, bob.secretKey);
    console.log('Bob decrypted callData:', decryptedCallDataBob);
    const decryptedCallDataCharlie = api.crypto.decryptForCosigner(
      'charlie',
      alice.publicKey,
      finalEncrypted,
      charlie.secretKey
    );
    console.log('Charlie decrypted callData:', decryptedCallDataCharlie);
    const decryptedCallDataAlice = api.crypto.decryptForCosigner(
      'alice',
      alice.publicKey,
      finalEncrypted,
      alice.secretKey
    );
    console.log('Alice decrypted callData:', decryptedCallDataAlice);
  });
}

main()
  .catch(console.error)
  .finally(() => process.exit());
