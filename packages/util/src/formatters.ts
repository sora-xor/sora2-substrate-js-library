import { decodeAddress, encodeAddress } from '@polkadot/util-crypto';

export const Prefix = 69;

/**
 * Format address
 * @param withSoraPrefix `true` by default
 */
export function formatAddress(address: string, withSoraPrefix = true): string {
  const publicKey = decodeAddress(address, false);

  if (withSoraPrefix) {
    return encodeAddress(publicKey, Prefix);
  }

  return encodeAddress(publicKey);
}
