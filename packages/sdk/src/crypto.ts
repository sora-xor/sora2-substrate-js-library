import { AES, HmacSHA256, enc } from 'crypto-js';
import crypto from 'crypto-js';
import { EncryptedKeyForCosigner, FinalEncryptedStructure, CosignerKeyPair } from '@sora-substrate/sdk';
import { u8aToHex, hexToU8a } from '@polkadot/util';
import {
  convertPublicKeyToCurve25519,
  convertSecretKeyToCurve25519,
  mnemonicGenerate,
  mnemonicToMiniSecret,
  ed25519PairFromSeed,
} from '@polkadot/util-crypto';
import nacl from 'tweetnacl';

// TODO: add random generator and think how to store it
const key = 'U2FsdGVkX18ZUVvShFSES21qHsQEqZXMxQ9zgHy';

export const encrypt = (message: string) => AES.encrypt(message, key).toString();

export const decrypt = (message: string) => AES.decrypt(message, key).toString(enc.Utf8);

export const toHmacSHA256 = (message: string) => HmacSHA256(message, key).toString();

export class CryptoModule {
  /**
   * Encrypts a message (symmetric key or callData) with AES (CBC) using crypto-js.
   * @param keyHex - key in hex format (must be 32 bytes => 64 hex chars)
   * @param message - message string
   */
  _encryptMessage = (keyHex: string, message: string): { encryptedData: string; iv: string } => {
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
   * Generates an Ed25519 key pair using mnemonic
   */
  generateEd25519KeyPair = (): CosignerKeyPair => {
    const mnemonic = mnemonicGenerate();
    const seed = mnemonicToMiniSecret(mnemonic);
    return ed25519PairFromSeed(seed);
  };

  /**
   * Encrypt callData for multiple cosigners:
   * 1. Generate an ephemeral key pair for ECDH.
   * 2. Convert keys to x25519 and compute shared secrets.
   * 3. Encrypt symmetric key for each cosigner.
   */
  encryptForCosigners = (cosigners: Record<string, CosignerKeyPair>, callDataStr: string): FinalEncryptedStructure => {
    // Step 1: Generate a random symmetric key (32 bytes, represented as a 64-character hex string)
    const symmetricKey = crypto.lib.WordArray.random(32).toString(crypto.enc.Hex);

    // Step 2: Encrypt the provided callData (payload) using the symmetric key and AES encryption (CBC mode)
    const { encryptedData: encryptedCallData, iv: dataIv } = this._encryptMessage(symmetricKey, callDataStr);

    // Step 3: Generate an ephemeral Ed25519 key pair for the sender to use in ECDH key exchange
    const ephemeral = ed25519PairFromSeed(mnemonicToMiniSecret(mnemonicGenerate()));

    // Step 4: Convert the ephemeral secret key to x25519 format, which is required for ECDH
    const ephemeralCurveSecret = convertSecretKeyToCurve25519(ephemeral.secretKey);

    // Step 5: Initialize an object to store encrypted keys for all cosigners
    const encryptedKeys: { [cosignerName: string]: EncryptedKeyForCosigner } = {};

    // Step 6: For each cosigner, compute the shared secret and encrypt the symmetric key
    for (const [name, cosignerPair] of Object.entries(cosigners)) {
      // Convert the cosigner's public key from Ed25519 to x25519 for ECDH
      const cosignerCurvePublic = convertPublicKeyToCurve25519(cosignerPair.publicKey);

      // Perform ECDH key exchange to compute the shared secret using the ephemeral secret key and the cosigner's public key
      const sharedSecret = nacl.scalarMult(ephemeralCurveSecret, cosignerCurvePublic);

      // Convert the shared secret to a hex string to use for symmetric encryption
      const sharedSecretHex = u8aToHex(sharedSecret).replace(/^0x/, '');

      // Encrypt the symmetric key with the computed shared secret
      const { encryptedData: encryptedSymKey, iv: symKeyIv } = this._encryptMessage(sharedSecretHex, symmetricKey);

      // Store the encrypted symmetric key and associated IV, along with the ephemeral public key
      encryptedKeys[name] = {
        ephemeralPubHex: u8aToHex(ephemeral.publicKey),
        encryptedKey: encryptedSymKey,
        iv: symKeyIv,
      };
    }

    // Step 7: Return the final encrypted structure containing encrypted callData, IV, and keys for all cosigners
    return {
      encryptedData: encryptedCallData,
      dataIv: dataIv,
      encryptedKeys: encryptedKeys,
    };
  };

  /**
   * Decrypts the callData for a specific cosigner using their secret key and the provided encrypted structure.
   */
  decryptForCosigner = (
    finalEncrypted: FinalEncryptedStructure,
    cosignerName: string,
    cosignerSecretKey: Uint8Array
  ): any => {
    // Step 1: Retrieve the encrypted key and IV specific to the cosigner
    const cosignerData = finalEncrypted.encryptedKeys[cosignerName];

    // Step 2: Convert the cosigner's secret key and ephemeral public key to x25519 format
    const ephemeralPubForCosigner = hexToU8a(cosignerData.ephemeralPubHex);
    const cosignerCurveSecret = convertSecretKeyToCurve25519(cosignerSecretKey);
    const ephemeralCurvePublicForCosigner = convertPublicKeyToCurve25519(ephemeralPubForCosigner);

    // Step 3: Perform ECDH key exchange to compute the shared secret
    const sharedSecret = nacl.scalarMult(cosignerCurveSecret, ephemeralCurvePublicForCosigner);

    // Convert the shared secret to a hex string to use for decryption
    const sharedSecretHex = u8aToHex(sharedSecret).replace(/^0x/, '');

    // Step 4: Decrypt the symmetric key using the shared secret and the encrypted key
    const symKey = this._decryptMessage(sharedSecretHex, cosignerData.encryptedKey, cosignerData.iv);

    // Step 5: Decrypt the callData using the decrypted symmetric key and the data IV
    const decryptedCallDataStr = this._decryptMessage(symKey, finalEncrypted.encryptedData, finalEncrypted.dataIv);

    // Step 6: Parse and return the decrypted callData as a JSON object
    return JSON.parse(decryptedCallDataStr);
  };
}
