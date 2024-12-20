import { AES, HmacSHA256, enc } from 'crypto-js';
import crypto from 'crypto-js';
import { Cosigners, EncryptedKeyForCosigner, FinalEncryptedStructure } from '@sora-substrate/sdk';
import { u8aToHex } from '@polkadot/util';
import { sr25519Agreement } from '@polkadot/util-crypto';

// TODO: add random generator and think how to store it
const key = 'U2FsdGVkX18ZUVvShFSES21qHsQEqZXMxQ9zgHy';

export const encrypt = (message: string) => AES.encrypt(message, key).toString();

export const decrypt = (message: string) => AES.decrypt(message, key).toString(enc.Utf8);

export const toHmacSHA256 = (message: string) => HmacSHA256(message, key).toString();

export class CryptoModule {
  combineSharedSecret(publicKey: Uint8Array, secretKey: Uint8Array): Uint8Array {
    return sr25519Agreement(secretKey, publicKey);
  }

  _encryptMessage(keyHex: string, message: string): { encryptedData: string; iv: string } {
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

  _decryptMessage(keyHex: string, encryptedData: string, iv: string): string {
    const decrypted = crypto.AES.decrypt(encryptedData, crypto.enc.Hex.parse(keyHex), {
      iv: crypto.enc.Hex.parse(iv),
      mode: crypto.mode.CBC,
      padding: crypto.pad.Pkcs7,
    });
    return decrypted.toString(crypto.enc.Utf8);
  }

  encryptBySigner(callDataStr: string, cosigners: Cosigners, secretKeyOfSigner: Uint8Array) {
    const symmetricKey = crypto.lib.WordArray.random(32).toString(crypto.enc.Hex);

    // Encrypt callData with symmetricKey
    const { encryptedData: encryptedCallData, iv: dataIv } = this._encryptMessage(symmetricKey, callDataStr);
    const encryptedKeys: { [cosignerAddress: string]: EncryptedKeyForCosigner } = {};
    for (const [name, cosignerPublicKey] of Object.entries(cosigners)) {
      const sharedSecret = this.combineSharedSecret(cosignerPublicKey, secretKeyOfSigner);
      const sharedSecretHex = u8aToHex(sharedSecret).replace(/^0x/, '');

      const { encryptedData: encryptedSymKey, iv: symKeyIv } = this._encryptMessage(sharedSecretHex, symmetricKey);

      encryptedKeys[name] = {
        encryptedKey: encryptedSymKey,
        iv: symKeyIv,
      };
    }
    const finalEncrypted: FinalEncryptedStructure = {
      encryptedData: encryptedCallData,
      dataIv: dataIv,
      encryptedKeys: encryptedKeys,
    };
    return finalEncrypted;
  }

  decryptForCosigner(
    cosignerAddress: string,
    encryptorPublicKey: Uint8Array,
    finalEncrypted: FinalEncryptedStructure,
    secretKeyOfSigner: Uint8Array
  ): any {
    const cosignerData = finalEncrypted.encryptedKeys[cosignerAddress];

    if (!cosignerData) {
      throw new Error(`No encrypted data found for cosigner: ${cosignerAddress}`);
    }

    // Generate the shared secret using the cosigner's secret key and the encryptor's public key
    const sharedSecret = this.combineSharedSecret(encryptorPublicKey, secretKeyOfSigner);
    const sharedSecretHex = u8aToHex(sharedSecret).replace(/^0x/, '');

    // Decrypt the symmetric key for the cosigner
    const symmetricKey = this._decryptMessage(sharedSecretHex, cosignerData.encryptedKey, cosignerData.iv);

    // Decrypt the main call data
    const decryptedCallDataStr = this._decryptMessage(
      symmetricKey,
      finalEncrypted.encryptedData,
      finalEncrypted.dataIv
    );

    // Parse and return the decrypted call data
    return JSON.parse(decryptedCallDataStr);
  }
}
