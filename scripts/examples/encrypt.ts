import { mnemonicGenerate, mnemonicToMiniSecret, sr25519PairFromSeed, decodeAddress } from '@polkadot/util-crypto';
import { withConnectedAccount } from './util';
import { api, Cosigners } from '@sora-substrate/sdk';

async function main(): Promise<void> {
  await withConnectedAccount(async () => {
    const mySelfMnemonic = 'forum trade finish nest scheme type confirm turkey indicate legal deposit size';
    const mySelfSeed = mnemonicToMiniSecret(mySelfMnemonic);
    const mySelf = sr25519PairFromSeed(mySelfSeed);

    const bobMnemonic = 'tonight security clump breeze chef attract average bacon guitar economy gentle bid';
    const bobSeed = mnemonicToMiniSecret(bobMnemonic);
    const bob = sr25519PairFromSeed(bobSeed);

    const charlieMnemonic = 'world capital key quit develop advance horror idea omit dose polar unveil';
    const charlieSeed = mnemonicToMiniSecret(charlieMnemonic);
    const charlie = sr25519PairFromSeed(charlieSeed);

    const callData = { foo: 'bar', number: 42 };
    const callDataStr = JSON.stringify(callData);
    const pair = decodeAddress('cnVUWVz8c1GAn6vUA9qgxLgbSechR3afEe9VbvXMqo7sXcDAt');
    console.info('pair is', pair);
    const cosigners: Cosigners = {
      mySelf: mySelf.publicKey,
      bob: bob.publicKey,
      charlie: charlie.publicKey,
    };
    console.info('cosigners', cosigners);
    interface Cosigners {
      [address: string]: Uint8Array;
    }
    interface EncryptByCosignerData {
      address: string;
      data: string;
      cosigners: Cosigners;
    }
    const encryptParams: EncryptByCosignerData = {
      address: 'cnVUWVz8c1GAn6vUA9qgxLgbSechR3afEe9VbvXMqo7sXcDAt',
      data: callDataStr,
      cosigners,
    };
    console.info('encryptParams', encryptParams);
    console.info('mySelf.secretKey', mySelf.secretKey);
    const finalEncrypted = api.crypto.encryptBySigner(callDataStr, cosigners, mySelf.secretKey);

    console.log('Final Encrypted Structure:', JSON.stringify(finalEncrypted, null, 2));
    const decryptedCallDataBob = api.crypto.decryptForCosigner('bob', mySelf.publicKey, finalEncrypted, bob.secretKey);
    console.log('Bob decrypted callData:', decryptedCallDataBob);
    // const decryptedCallDataCharlie = api.crypto.decryptForCosigner(
    //   'charlie',
    //   mySelf.publicKey,
    //   finalEncrypted,
    //   charlie.secretKey
    // );
    // console.log('Charlie decrypted callData:', decryptedCallDataCharlie);
    // const decryptedCallDatamySelf = api.crypto.decryptForCosigner(
    //   'mySelf',
    //   mySelf.publicKey,
    //   finalEncrypted,
    //   mySelf.secretKey
    // );
    // console.log('mySelf decrypted callData:', decryptedCallDatamySelf);
  });
}

main()
  .catch(console.error)
  .finally(() => process.exit());
