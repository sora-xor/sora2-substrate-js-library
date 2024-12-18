import { mnemonicGenerate, mnemonicToMiniSecret, sr25519PairFromSeed } from '@polkadot/util-crypto';
import { u8aToHex, hexToU8a } from '@polkadot/util';
import crypto from 'crypto-js';
import { randomBytes } from 'crypto';

import { withConnectedAccount } from './util';

function combineSharedSecret(publicKey: Uint8Array, secretKey: Uint8Array): Uint8Array {
  const shared = new Uint8Array(32);
  for (let i = 0; i < 32; i++) {
    shared[i] = publicKey[i] ^ secretKey[i]; // Insecure bitwise XOR
  }
  return shared;
}

function _encryptMessage(keyHex: string, message: string): { encryptedData: string; iv: string } {
  const iv = crypto.lib.WordArray.random(16);
  const encrypted = crypto.AES.encrypt(message, crypto.enc.Hex.parse(keyHex), {
    iv: iv,
    mode: crypto.mode.CBC,
    padding: crypto.pad.Pkcs7,
  });

  return {
    encryptedData: encrypted.toString(),
    iv: iv.toString(crypto.enc.Hex),
  };
}

function _decryptMessage(keyHex: string, encryptedData: string, iv: string): string {
  const decrypted = crypto.AES.decrypt(encryptedData, crypto.enc.Hex.parse(keyHex), {
    iv: crypto.enc.Hex.parse(iv),
    mode: crypto.mode.CBC,
    padding: crypto.pad.Pkcs7,
  });
  return decrypted.toString(crypto.enc.Utf8);
}

function generateSr25519Pair() {
  const seed = new Uint8Array(randomBytes(32));
  return sr25519PairFromSeed(seed);
}

interface EncryptedKeyForCosigner {
  ephemeralPubHex: string;
  encryptedKey: string;
  iv: string;
}

interface FinalEncryptedStructure {
  encryptedData: string;
  dataIv: string;
  encryptedKeys: {
    [cosignerName: string]: EncryptedKeyForCosigner;
  };
}

async function main(): Promise<void> {
  await withConnectedAccount(async () => {
    // Generate three cosigners
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

    // Generate a symmetric key
    const symmetricKey = crypto.lib.WordArray.random(32).toString(crypto.enc.Hex);

    // Encrypt callData with symmetric key
    const { encryptedData: encryptedCallData, iv: dataIv } = _encryptMessage(symmetricKey, callDataStr);

    const cosigners = { alice, bob, charlie };
    const encryptedKeys: { [cosignerName: string]: EncryptedKeyForCosigner } = {};

    for (const [name, cosignerPair] of Object.entries(cosigners)) {
      // Combine Alice's public key with the cosigner's public key to form the "shared secret"
      const sharedSecret = combineSharedSecret(alice.publicKey, cosignerPair.publicKey);
      const sharedSecretHex = u8aToHex(sharedSecret).replace(/^0x/, '');

      const { encryptedData: encryptedSymKey, iv: symKeyIv } = _encryptMessage(sharedSecretHex, symmetricKey);

      encryptedKeys[name] = {
        ephemeralPubHex: u8aToHex(alice.publicKey),
        encryptedKey: encryptedSymKey,
        iv: symKeyIv,
      };
    }

    const finalEncrypted: FinalEncryptedStructure = {
      encryptedData: encryptedCallData,
      dataIv: dataIv,
      encryptedKeys: encryptedKeys,
    };

    console.log('Final Encrypted Structure:', JSON.stringify(finalEncrypted, null, 2));

    // Now let's try to decrypt for Bob as an example:
    const bobData = finalEncrypted.encryptedKeys['bob'];
    const ephemeralPubForBob = hexToU8a(bobData.ephemeralPubHex);
    // Should use not secretKey but public
    const bobSharedSecret = combineSharedSecret(ephemeralPubForBob, bob.secretKey);
    const bobSharedSecretHex = u8aToHex(bobSharedSecret).replace(/^0x/, '');
    const bobSymKey = _decryptMessage(bobSharedSecretHex, bobData.encryptedKey, bobData.iv);
    const decryptedCallDataStr = _decryptMessage(bobSymKey, finalEncrypted.encryptedData, finalEncrypted.dataIv);
    const decryptedCallData = JSON.parse(decryptedCallDataStr);
    console.log('Bob decrypted callData:', decryptedCallData);
  });
}

main()
  .catch(console.error)
  .finally(() => process.exit());

// TODO old versions don't delete
// import { mnemonicGenerate, mnemonicToMiniSecret, sr25519PairFromSeed } from '@polkadot/util-crypto';
// import { u8aToHex, hexToU8a } from '@polkadot/util';
// import crypto from 'crypto-js';
// import { randomBytes } from 'crypto';

// import { withConnectedAccount } from './util';

// /**
//  * This function applies a simple bitwise combination to derive a "shared secret".
//  * We assume that publicKey has 32 bytes and secretKey has 64 bytes (common for SR25519).
//  * We take the first 32 bytes of secretKey and combine each byte with the corresponding
//  * byte of publicKey.
//  */
// function combineSharedSecret(publicKey: Uint8Array, secretKey: Uint8Array): Uint8Array {
//   const shared = new Uint8Array(32);
//   for (let i = 0; i < 32; i++) {
//     // Using a bitwise operation for demonstration (insecure)
//     shared[i] = publicKey[i] ^ secretKey[i];
//   }
//   return shared;
// }

// /**
//  * Encrypts a message (symmetric key or callData) with AES (CBC) using crypto-js.
//  * @param keyHex - key in hex format (must be 32 bytes => 64 hex chars)
//  * @param message - message string
//  */
// function _encryptMessage(keyHex: string, message: string): { encryptedData: string; iv: string } {
//   const iv = crypto.lib.WordArray.random(16); // 16-byte IV
//   const encrypted = crypto.AES.encrypt(message, crypto.enc.Hex.parse(keyHex), {
//     iv: iv,
//     mode: crypto.mode.CBC,
//     padding: crypto.pad.Pkcs7,
//   });

//   return {
//     encryptedData: encrypted.toString(),
//     iv: iv.toString(crypto.enc.Hex),
//   };
// }

// /**
//  * Decrypts a message (AES CBC)
//  */
// function _decryptMessage(keyHex: string, encryptedData: string, iv: string): string {
//   const decrypted = crypto.AES.decrypt(encryptedData, crypto.enc.Hex.parse(keyHex), {
//     iv: crypto.enc.Hex.parse(iv),
//     mode: crypto.mode.CBC,
//     padding: crypto.pad.Pkcs7,
//   });
//   console.info('decrypted', decrypted);
//   return decrypted.toString(crypto.enc.Utf8);
// }

// /**
//  * Generates an SR25519 key pair from a random seed
//  */
// function generateSr25519Pair() {
//   const seed = new Uint8Array(randomBytes(32));
//   return sr25519PairFromSeed(seed);
// }

// /**
//  * Generates an ephemeral SR25519 pair
//  */
// function generateEphemeralSr25519Pair() {
//   return generateSr25519Pair();
// }

// interface EncryptedKeyForCosigner {
//   ephemeralPubHex: string;
//   encryptedKey: string;
//   iv: string;
// }

// interface FinalEncryptedStructure {
//   encryptedData: string;
//   dataIv: string;
//   encryptedKeys: {
//     [cosignerName: string]: EncryptedKeyForCosigner;
//   };
// }

// async function main(): Promise<void> {
//   await withConnectedAccount(async () => {
//     // Three cosigners: Alice, Bob, Charlie
//     const aliceMnemonic = mnemonicGenerate();
//     const aliceSeed = mnemonicToMiniSecret(aliceMnemonic);
//     const alice = sr25519PairFromSeed(aliceSeed);

//     const bobMnemonic = mnemonicGenerate();
//     const bobSeed = mnemonicToMiniSecret(bobMnemonic);
//     const bob = sr25519PairFromSeed(bobSeed);

//     const charlieMnemonic = mnemonicGenerate();
//     const charlieSeed = mnemonicToMiniSecret(charlieMnemonic);
//     const charlie = sr25519PairFromSeed(charlieSeed);

//     // callData excample (JSON)
//     const callData = { foo: 'bar', number: 42 };
//     const callDataStr = JSON.stringify(callData);

//     // Generate a symmetric key (32 bytes => 64 hex chars)
//     const symmetricKey = crypto.lib.WordArray.random(32).toString(crypto.enc.Hex);

//     // Encrypt callData with the symmetric key
//     // The encryption process also includes an Initialization Vector (IV),
//     // which adds randomness to the encryption process.
//     // Even if the same key and data are used multiple times, IV ensures
//     // that the resulting encrypted data will be different each time.
//     const { encryptedData: encryptedCallData, iv: dataIv } = _encryptMessage(symmetricKey, callDataStr);

//     // Cosigners
//     const cosigners = {
//       alice,
//       bob,
//       charlie,
//     };

//     // Empty encryptedKeys
//     const encryptedKeys: { [cosignerName: string]: EncryptedKeyForCosigner } = {};

//     // Assume Alice is the sender, and she encrypts the symmetric key for each cosigner
//     // using an ephemeral key pair and the bitwise combination for the "shared secret".
//     for (const [name, cosignerPair] of Object.entries(cosigners)) {
//       // Generate an ephemeral SR25519 pair.
//       // Ephemeral keys are unique for each operation and ensure that each cosigner's shared secret is isolated.
//       // This provides additional security and prevents data reuse or correlation between transactions.
//       const ephemeral = generateEphemeralSr25519Pair();

//       // Obtain the "shared secret" by combining the ephemeral public key and the cosigner's secret key
//       // BUT we can't get secret key
//       const sharedSecret = combineSharedSecret(ephemeral.publicKey, cosignerPair.publicKey);
//       const sharedSecretHex = u8aToHex(sharedSecret).replace(/^0x/, '');

//       // Encrypt the symmetric key with this "shared secret"
//       const { encryptedData: encryptedSymKey, iv: symKeyIv } = _encryptMessage(sharedSecretHex, symmetricKey);

//       encryptedKeys[name] = {
//         ephemeralPubHex: u8aToHex(ephemeral.publicKey),
//         encryptedKey: encryptedSymKey,
//         iv: symKeyIv,
//       };
//     }

//     // Our final encryptedData that will be send as system.remark in our MST extrinsic
//     const finalEncrypted: FinalEncryptedStructure = {
//       encryptedData: encryptedCallData,
//       dataIv: dataIv,
//       encryptedKeys: encryptedKeys,
//     };

//     console.log(
//       'Final Encrypted Structure (bitwise combination version, INSECURE):',
//       JSON.stringify(finalEncrypted, null, 2)
//     );

//     // Now Bob wants to decrypt the callData
//     const bobData = finalEncrypted.encryptedKeys['bob'];
//     const ephemeralPubForBob = hexToU8a(bobData.ephemeralPubHex);

//     // Recover the "shared secret" for Bob: combine his private key and the ephemeral public key
//     // Works with PUBLIC KEY
//     const bobSharedSecret = combineSharedSecret(ephemeralPubForBob, bob.publicKey);
//     const bobSharedSecretHex = u8aToHex(bobSharedSecret).replace(/^0x/, '');

//     // Decrypt the symmetric key
//     const bobSymKey = _decryptMessage(bobSharedSecretHex, bobData.encryptedKey, bobData.iv);

//     // Now Bob can decrypt the callData
//     const decryptedCallDataStr = _decryptMessage(bobSymKey, finalEncrypted.encryptedData, finalEncrypted.dataIv);
//     const decryptedCallData = JSON.parse(decryptedCallDataStr);

//     console.log('Bob decrypted callData (bitwise combination version):', decryptedCallData);

//     // Similarly, other cosigners with their private keys can decrypt their symmetric keys and read the callData.
//     // Below decryption for others

//     // **Decryption for Charlie**
//     const charlieData = finalEncrypted.encryptedKeys['charlie'];
//     const ephemeralPubForCharlie = hexToU8a(charlieData.ephemeralPubHex);
//     // Don't work with secretKey
//     const charlieSharedSecret = combineSharedSecret(ephemeralPubForCharlie, charlie.secretKey);
//     const charlieSharedSecretHex = u8aToHex(charlieSharedSecret).replace(/^0x/, '');
//     const charlieSymKey = _decryptMessage(charlieSharedSecretHex, charlieData.encryptedKey, charlieData.iv);
//     const decryptedCallDataStrCharlie = _decryptMessage(
//       charlieSymKey,
//       finalEncrypted.encryptedData,
//       finalEncrypted.dataIv
//     );
//     const decryptedCallDataCharlie = JSON.parse(decryptedCallDataStrCharlie);

//     console.log('Charlie decrypted callData:', decryptedCallDataCharlie);

//     // **Decryption for Alice**
//     const aliceData = finalEncrypted.encryptedKeys['alice'];
//     const ephemeralPubForAlice = hexToU8a(aliceData.ephemeralPubHex);
//     const aliceSharedSecret = combineSharedSecret(ephemeralPubForAlice, alice.secretKey);
//     const aliceSharedSecretHex = u8aToHex(aliceSharedSecret).replace(/^0x/, '');
//     const aliceSymKey = _decryptMessage(aliceSharedSecretHex, aliceData.encryptedKey, aliceData.iv);
//     const decryptedCallDataStrAlice = _decryptMessage(aliceSymKey, finalEncrypted.encryptedData, finalEncrypted.dataIv);
//     const decryptedCallDataAlice = JSON.parse(decryptedCallDataStrAlice);

//     console.log('Alice decrypted callData:', decryptedCallDataAlice);
//   });
// }

// main()
//   .catch(console.error)
//   .finally(() => process.exit());

// New version don't delete
// import { api } from '@sora-substrate/sdk';
// import { withConnectedAccount } from './util';

// async function main(): Promise<void> {
//   await withConnectedAccount(async () => {
//     // Generate cosigner key pairs
//     const alice = api.crypto.generateEd25519KeyPair();
//     const bob = api.crypto.generateEd25519KeyPair();
//     const charlie = api.crypto.generateEd25519KeyPair();

//     const cosigners = { alice, bob, charlie };

//     // Data to encrypt
//     const callData = { foo: 'bar', number: 42 };
//     const callDataStr = JSON.stringify(callData);

//     // Encrypt data for cosigners
//     const finalEncrypted = api.crypto.encryptForCosigners(cosigners, callDataStr);
//     console.log('Final Encrypted Structure:', JSON.stringify(finalEncrypted, null, 2));

//     // Decrypt data for Bob
//     const bobDecrypted = api.crypto.decryptForCosigner(finalEncrypted, 'bob', bob.secretKey);
//     console.log('Bob decrypted callData:', bobDecrypted);

//     // Decrypt data for Alice
//     const aliceDecrypted = api.crypto.decryptForCosigner(finalEncrypted, 'alice', alice.secretKey);
//     console.log('Alice decrypted callData:', aliceDecrypted);

//     // Decrypt data for Charlie
//     const charlieDecrypted = api.crypto.decryptForCosigner(finalEncrypted, 'charlie', charlie.secretKey);
//     console.log('Charlie decrypted callData:', charlieDecrypted);
//   });
// }

// main()
//   .catch(console.error)
//   .finally(() => process.exit());
