import { api } from '@sora-substrate/sdk';
import { withConnectedAccount } from './util';

async function main(): Promise<void> {
  await withConnectedAccount(async () => {
    // Generate cosigner key pairs
    const alice = api.crypto.generateEd25519KeyPair();
    const bob = api.crypto.generateEd25519KeyPair();
    const charlie = api.crypto.generateEd25519KeyPair();

    const cosigners = { alice, bob, charlie };

    // Data to encrypt
    const callData = { foo: 'bar', number: 42 };
    const callDataStr = JSON.stringify(callData);

    // Encrypt data for cosigners
    const finalEncrypted = api.crypto.encryptForCosigners(cosigners, callDataStr);
    console.log('Final Encrypted Structure:', JSON.stringify(finalEncrypted, null, 2));

    // Decrypt data for Bob
    const bobDecrypted = api.crypto.decryptForCosigner(finalEncrypted, 'bob', bob.secretKey);
    console.log('Bob decrypted callData:', bobDecrypted);

    // Decrypt data for Alice
    const aliceDecrypted = api.crypto.decryptForCosigner(finalEncrypted, 'alice', alice.secretKey);
    console.log('Alice decrypted callData:', aliceDecrypted);

    // Decrypt data for Charlie
    const charlieDecrypted = api.crypto.decryptForCosigner(finalEncrypted, 'charlie', charlie.secretKey);
    console.log('Charlie decrypted callData:', charlieDecrypted);
  });
}

main()
  .catch(console.error)
  .finally(() => process.exit());
