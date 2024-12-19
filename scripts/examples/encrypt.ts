import { mnemonicGenerate, mnemonicToMiniSecret, sr25519PairFromSeed } from '@polkadot/util-crypto';
import { u8aToHex, hexToU8a } from '@polkadot/util';
import crypto from 'crypto-js';
import { randomBytes } from 'crypto';

import { withConnectedAccount } from './util';

function combineSharedSecret(publicKey: Uint8Array, secretKey: Uint8Array): Uint8Array {
  const shared = new Uint8Array(32);
  for (let i = 0; i < 32; i++) {
    shared[i] = publicKey[i] ^ secretKey[i];
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
  // Падаем вот тут
  return decrypted.toString(crypto.enc.Utf8);
}

interface EncryptedKeyForCosigner {
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
    // Создаем пары для трех косайнеров
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

    // Генерим симметричный ключ
    const symmetricKey = crypto.lib.WordArray.random(32).toString(crypto.enc.Hex);

    // Шифруем callData
    const { encryptedData: encryptedCallData, iv: dataIv } = _encryptMessage(symmetricKey, callDataStr);

    const cosigners = { alice, bob, charlie };
    const encryptedKeys: { [cosignerName: string]: EncryptedKeyForCosigner } = {};

    // Проходимся по каждому косайнеру
    for (const [name, cosignerPair] of Object.entries(cosigners)) {
      /*  Предположим,что alice хочет зашифровать данные
          Указываем публичный ключ каждого из косайнеров
          А также указываем secretKey alice
      */
      const sharedSecret = combineSharedSecret(cosignerPair.publicKey, alice.secretKey);
      const sharedSecretHex = u8aToHex(sharedSecret).replace(/^0x/, '');

      // Шифруем дату с помощью sharedSecretHex
      const { encryptedData: encryptedSymKey, iv: symKeyIv } = _encryptMessage(sharedSecretHex, symmetricKey);

      encryptedKeys[name] = {
        encryptedKey: encryptedSymKey,
        iv: symKeyIv,
      };
    }

    // Эти данные уйдут в блокчейн через system.remark при вызове транзакии от MST
    const finalEncrypted: FinalEncryptedStructure = {
      encryptedData: encryptedCallData,
      dataIv: dataIv,
      encryptedKeys: encryptedKeys,
    };

    console.log('Final Encrypted Structure:', JSON.stringify(finalEncrypted, null, 2));

    // Получаем зашифрованные данные для bob
    const bobData = finalEncrypted.encryptedKeys['bob'];
    // Получаем sharedSecret
    const bobSharedSecret = combineSharedSecret(bob.publicKey, bob.secretKey);
    const bobSharedSecretHex = u8aToHex(bobSharedSecret).replace(/^0x/, '');

    /* Пытаемся получить bobSymKey
       В ЭТОМ МОМЕНТА ПАДАЕМ С ОШИБКОЙ
       Предположительно падаем,потому что пытаемся расшифровать дату с помощью неподходящего sharedSecret
       Т.к у нас до этого sharedSecret был зашифрован с помощью bob.publicKey(cosignerPair.publicKey) и alice.secretKey
       А сейчас у нас sharedSecret получен из bob.publicKey и bob.secretKey
       Если использовать alice.secretKey вместо bob.secretKey, когда пытаемся получить bobSharedSecret
       То данные успешно дешифруются
       Также если мы заменим alice.secretKey на cosignerPair.secretKey,то сможем дешифровать с помощью bob.secretKey
       Cделать этого не можем т.к не знаем secretKey других косайнеров
    */
    const bobSymKey = _decryptMessage(bobSharedSecretHex, bobData.encryptedKey, bobData.iv);
    const decryptedCallDataStr = _decryptMessage(bobSymKey, finalEncrypted.encryptedData, finalEncrypted.dataIv);
    const decryptedCallData = JSON.parse(decryptedCallDataStr);
    console.log('Bob decrypted callData:', decryptedCallData);
  });
}

main()
  .catch(console.error)
  .finally(() => process.exit());
