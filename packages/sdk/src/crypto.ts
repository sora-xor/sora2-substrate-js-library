import { AES, HmacSHA256, enc } from 'crypto-js';
import { sr25519PairFromSeed } from '@polkadot/util-crypto';
import crypto from 'crypto-js';
import { randomBytes } from 'crypto';

// TODO: add random generator and think how to store it
const key = 'U2FsdGVkX18ZUVvShFSES21qHsQEqZXMxQ9zgHy';

export const encrypt = (message: string) => AES.encrypt(message, key).toString();

export const decrypt = (message: string) => AES.decrypt(message, key).toString(enc.Utf8);

export const toHmacSHA256 = (message: string) => HmacSHA256(message, key).toString();

export class CryptoModule {
  /**
   * This function applies a simple bitwise combination to derive a "shared secret".
   * We assume that publicKey has 32 bytes and secretKey has 64 bytes (common for SR25519).
   * We take the first 32 bytes of secretKey and combine each byte with the corresponding
   * byte of publicKey.
   */
  combineSharedSecret = (publicKey: Uint8Array, secretKey: Uint8Array): Uint8Array => {
    const shared = new Uint8Array(32);
    for (let i = 0; i < 32; i++) {
      // Using a bitwise operation for demonstration (insecure)
      shared[i] = publicKey[i] ^ secretKey[i];
    }
    return shared;
  };

  /**
   * Encrypts a message (symmetric key or callData) with AES (CBC) using crypto-js.
   * @param keyHex - key in hex format (must be 32 bytes => 64 hex chars)
   * @param message - message string
   */
  _encryptMessage = (keyHex: string, message: string): { encryptedData: string; iv: string } => {
    const iv = crypto.lib.WordArray.random(16); // 16-byte IV
    const encrypted = crypto.AES.encrypt(message, crypto.enc.Hex.parse(keyHex), {
      iv: iv,
      mode: crypto.mode.CBC,
      padding: crypto.pad.Pkcs7,
    });

    return {
      encryptedData: encrypted.toString(),
      iv: iv.toString(crypto.enc.Hex),
    };
  };

  /**
   * Decrypts a message (AES CBC)
   */
  _decryptMessage = (keyHex: string, encryptedData: string, iv: string): string => {
    const decrypted = crypto.AES.decrypt(encryptedData, crypto.enc.Hex.parse(keyHex), {
      iv: crypto.enc.Hex.parse(iv),
      mode: crypto.mode.CBC,
      padding: crypto.pad.Pkcs7,
    });
    return decrypted.toString(crypto.enc.Utf8);
  };

  /**
   * Generates an SR25519 key pair from a random seed
   */
  generateSr25519Pair = () => {
    const seed = new Uint8Array(randomBytes(32));
    return sr25519PairFromSeed(seed);
  };

  /**
   * Generates an ephemeral SR25519 pair
   */
  generateEphemeralSr25519Pair = () => {
    return this.generateSr25519Pair();
  };
}
