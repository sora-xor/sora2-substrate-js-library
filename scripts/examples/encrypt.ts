import { mnemonicGenerate, mnemonicToMiniSecret, sr25519PairFromSeed } from '@polkadot/util-crypto';
import { u8aToHex, hexToU8a } from '@polkadot/util';
import { api, EncryptedKeyForCosigner, FinalEncryptedStructure } from '@sora-substrate/sdk';
import crypto from 'crypto-js';
import { withConnectedAccount } from './util';

async function main(): Promise<void> {
  await withConnectedAccount(async () => {
    // Three cosigners: Alice, Bob, Charlie
    const aliceMnemonic = mnemonicGenerate();
    const aliceSeed = mnemonicToMiniSecret(aliceMnemonic);
    const alice = sr25519PairFromSeed(aliceSeed);

    const bobMnemonic = mnemonicGenerate();
    const bobSeed = mnemonicToMiniSecret(bobMnemonic);
    const bob = sr25519PairFromSeed(bobSeed);

    const charlieMnemonic = mnemonicGenerate();
    const charlieSeed = mnemonicToMiniSecret(charlieMnemonic);
    const charlie = sr25519PairFromSeed(charlieSeed);

    // callData excample (JSON)
    const callData = { foo: 'bar', number: 42 };
    const callDataStr = JSON.stringify(callData);

    // Generate a symmetric key (32 bytes => 64 hex chars)
    const symmetricKey = crypto.lib.WordArray.random(32).toString(crypto.enc.Hex);

    // Encrypt callData with the symmetric key
    // The encryption process also includes an Initialization Vector (IV),
    // which adds randomness to the encryption process.
    // Even if the same key and data are used multiple times, IV ensures
    // that the resulting encrypted data will be different each time.
    const { encryptedData: encryptedCallData, iv: dataIv } = api.crypto._encryptMessage(symmetricKey, callDataStr);

    // Cosigners
    const cosigners = {
      alice,
      bob,
      charlie,
    };

    // Empty encryptedKeys
    const encryptedKeys: { [cosignerName: string]: EncryptedKeyForCosigner } = {};

    // Assume Alice is the sender, and she encrypts the symmetric key for each cosigner
    // using an ephemeral key pair and the bitwise combination for the "shared secret".
    for (const [name, cosignerPair] of Object.entries(cosigners)) {
      // Generate an ephemeral SR25519 pair.
      // Ephemeral keys are unique for each operation and ensure that each cosigner's shared secret is isolated.
      // This provides additional security and prevents data reuse or correlation between transactions.
      const ephemeral = api.crypto.generateEphemeralSr25519Pair();

      // Obtain the "shared secret" by combining the ephemeral public key and the cosigner's secret key
      const sharedSecret = api.crypto.combineSharedSecret(ephemeral.publicKey, cosignerPair.secretKey);
      const sharedSecretHex = u8aToHex(sharedSecret).replace(/^0x/, '');

      // Encrypt the symmetric key with this "shared secret"
      const { encryptedData: encryptedSymKey, iv: symKeyIv } = api.crypto._encryptMessage(
        sharedSecretHex,
        symmetricKey
      );

      encryptedKeys[name] = {
        ephemeralPubHex: u8aToHex(ephemeral.publicKey),
        encryptedKey: encryptedSymKey,
        iv: symKeyIv,
      };
    }

    // Our final encryptedData that will be send as system.remark in our MST extrinsic
    const finalEncrypted: FinalEncryptedStructure = {
      encryptedData: encryptedCallData,
      dataIv: dataIv,
      encryptedKeys: encryptedKeys,
    };

    console.log(
      'Final Encrypted Structure (bitwise combination version, INSECURE):',
      JSON.stringify(finalEncrypted, null, 2)
    );

    // Now Bob wants to decrypt the callData
    const bobData = finalEncrypted.encryptedKeys['bob'];
    const ephemeralPubForBob = hexToU8a(bobData.ephemeralPubHex);

    // Recover the "shared secret" for Bob: combine his private key and the ephemeral public key
    const bobSharedSecret = api.crypto.combineSharedSecret(ephemeralPubForBob, bob.secretKey);
    const bobSharedSecretHex = u8aToHex(bobSharedSecret).replace(/^0x/, '');

    // Decrypt the symmetric key
    const bobSymKey = api.crypto._decryptMessage(bobSharedSecretHex, bobData.encryptedKey, bobData.iv);

    // Now Bob can decrypt the callData
    const decryptedCallDataStr = api.crypto._decryptMessage(
      bobSymKey,
      finalEncrypted.encryptedData,
      finalEncrypted.dataIv
    );
    const decryptedCallData = JSON.parse(decryptedCallDataStr);

    console.log('Bob decrypted callData (bitwise combination version):', decryptedCallData);

    // Similarly, other cosigners with their private keys can decrypt their symmetric keys and read the callData.
    // Below decryption for others

    // **Decryption for Charlie**
    const charlieData = finalEncrypted.encryptedKeys['charlie'];
    const ephemeralPubForCharlie = hexToU8a(charlieData.ephemeralPubHex);
    const charlieSharedSecret = api.crypto.combineSharedSecret(ephemeralPubForCharlie, charlie.secretKey);
    const charlieSharedSecretHex = u8aToHex(charlieSharedSecret).replace(/^0x/, '');
    const charlieSymKey = api.crypto._decryptMessage(charlieSharedSecretHex, charlieData.encryptedKey, charlieData.iv);
    const decryptedCallDataStrCharlie = api.crypto._decryptMessage(
      charlieSymKey,
      finalEncrypted.encryptedData,
      finalEncrypted.dataIv
    );
    const decryptedCallDataCharlie = JSON.parse(decryptedCallDataStrCharlie);

    console.log('Charlie decrypted callData:', decryptedCallDataCharlie);

    // **Decryption for Alice**
    const aliceData = finalEncrypted.encryptedKeys['alice'];
    const ephemeralPubForAlice = hexToU8a(aliceData.ephemeralPubHex);
    const aliceSharedSecret = api.crypto.combineSharedSecret(ephemeralPubForAlice, alice.secretKey);
    const aliceSharedSecretHex = u8aToHex(aliceSharedSecret).replace(/^0x/, '');
    const aliceSymKey = api.crypto._decryptMessage(aliceSharedSecretHex, aliceData.encryptedKey, aliceData.iv);
    const decryptedCallDataStrAlice = api.crypto._decryptMessage(
      aliceSymKey,
      finalEncrypted.encryptedData,
      finalEncrypted.dataIv
    );
    const decryptedCallDataAlice = JSON.parse(decryptedCallDataStrAlice);

    console.log('Alice decrypted callData:', decryptedCallDataAlice);
  });
}

main()
  .catch(console.error)
  .finally(() => process.exit());
