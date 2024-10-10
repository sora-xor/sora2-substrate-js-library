import { api, Api, connection } from '@sora-substrate/sdk';
import { mnemonicGenerate, mnemonicToMiniSecret, ed25519PairFromSeed } from '@polkadot/util-crypto';
import { u8aToHex, u8aToString } from '@polkadot/util';
import type { KeyringPair } from '@polkadot/keyring/types';
import crypto from 'crypto-js';

import { delay, withConnectedAccount } from './util';

/**
 * Encrypt message using AES symmetric encryption with `crypto-js`
 * @param sharedSecret - Shared secret key
 * @param message - Message to encrypt
 * @returns Encrypted data and initialization vector
 */
function _encryptMessage(sharedSecret: string, message: string): { encryptedData: string; iv: string } {
  const iv = crypto.lib.WordArray.random(16); // Initialization vector
  const encrypted = crypto.AES.encrypt(message, crypto.enc.Hex.parse(sharedSecret), {
    iv: iv,
    mode: crypto.mode.CBC,
    padding: crypto.pad.Pkcs7,
  });

  return {
    encryptedData: encrypted.toString(),
    iv: iv.toString(crypto.enc.Hex),
  };
}

/**
 * Decrypt message using AES symmetric encryption with `crypto-js`
 * @param sharedSecret - Shared secret key
 * @param encryptedData - Encrypted data
 * @param iv - Initialization vector
 * @returns Decrypted message
 */
function _decryptMessage(sharedSecret: string, encryptedData: string, iv: string): string {
  const decrypted = crypto.AES.decrypt(encryptedData, crypto.enc.Hex.parse(sharedSecret), {
    iv: crypto.enc.Hex.parse(iv),
    mode: crypto.mode.CBC,
    padding: crypto.pad.Pkcs7,
  });

  return decrypted.toString(crypto.enc.Utf8);
}

/// TODO: check Vladimir's implementation again
function sharedSecret(senderPair: KeyringPair, receiverPublicKey: string): KeyringPair {
  const aliceSecret = senderPair.derive(receiverPublicKey);
  return aliceSecret; // Shared secret derived
}

// AES-GCM Encryption
// function encryptMessage(sharedSecret: KeyringPair, message: string) {
//   const key = crypto.enc.Hex.parse(sharedSecret.toString('hex'));  // Convert shared secret to HEX format
//   const iv = crypto.lib.WordArray.random(12);  // Generate a 12-byte nonce (IV)
//
//   const encrypted = crypto.AES.encrypt(message, key, {
//       iv: iv,
//       // mode: crypto.mode.GCM,
//       format: crypto.format.Hex
//   });
//
//   return {
//       cipherText: encrypted.ciphertext.toString(crypto.enc.Hex),
//       nonce: iv.toString(crypto.enc.Hex)
//   };
// }

// AES-GCM Decryption
// function decryptMessage(sharedSecret: KeyringPair, encryptedData) {
//   const key = crypto.enc.Hex.parse(sharedSecret.toString('hex'));
//   const iv = crypto.enc.Hex.parse(encryptedData.nonce);
//
//   const decrypted = crypto.AES.decrypt(
//       { ciphertext: crypto.enc.Hex.parse(encryptedData.cipherText) },
//       key, { iv: iv, /* mode: crypto.mode.GCM, */ format: crypto.format.Hex } // mode might be used by default
//   );
//
//   return decrypted.toString(crypto.enc.Utf8);
// }

async function main(): Promise<void> {
  await withConnectedAccount(async () => {
    const seed = mnemonicToMiniSecret('street firm worth record skin taste legend lobster magnet stove drive side');
    const edAccountPair = ed25519PairFromSeed(seed);
    // Create a new API instance for the second account
    const api2 = new Api();
    const mnemonic2 = mnemonicGenerate();
    const seed2 = mnemonicToMiniSecret(mnemonic2);
    const edAccountPair2 = ed25519PairFromSeed(seed2);
    api2.setConnection(connection);
    api2.importAccount(mnemonic2, 'second', 'pass');
    // Encrypt message for the second account
    const encrypted = api.accountPair.encryptMessage('Hello, second account!', api2.accountPair.publicKey);
    console.info('Encrypted message:', u8aToHex(encrypted));
    api.accountPair.lock();
    // Decrypt message using the second account
    api2.accountPair.unlock('pass');
    const decrypted = api2.accountPair.decryptMessage(encrypted, api.accountPair.publicKey);
    console.info('Decrypted message:', u8aToString(decrypted));
    api2.accountPair.lock();
  });
}

main()
  .catch(console.error)
  .finally(() => process.exit());
