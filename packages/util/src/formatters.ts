import { AES, HmacSHA256, enc } from 'crypto-js';
import { decodeAddress, encodeAddress } from '@polkadot/util-crypto';

// TODO: add random generator and think how to store it
const key = 'U2FsdGVkX18ZUVvShFSES21qHsQEqZXMxQ9zgHy';

class Formatters {
  public static PREFIX = 69;

  /**
   * Format address
   * @param withSoraPrefix `true` by default
   */
  public static formatAddress(address: string, withSoraPrefix = true): string {
    const publicKey = decodeAddress(address, false);

    if (withSoraPrefix) {
      return encodeAddress(publicKey, Formatters.PREFIX);
    }

    return encodeAddress(publicKey);
  }

  /**
   * Validate address
   * @param address
   */
  public static validateAddress(address: string): boolean {
    try {
      decodeAddress(address, false);
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Get public key as hex string by account address
   * @param address
   * @returns
   */
  public static getPublicKeyByAddress(address: string): string {
    const publicKey = decodeAddress(address, false);

    return Buffer.from(publicKey).toString('hex');
  }

  /**
   * Generate unique string from value
   * @param value
   * @returns
   */
  public static encrypt(value: string): string {
    return AES.encrypt(value, key).toString();
  }

  public static decrypt(value: string): string {
    return AES.decrypt(value, key).toString(enc.Utf8);
  }

  public static toHmacSHA256(value: string): string {
    return HmacSHA256(value, key).toString();
  }
}

export { Formatters };
