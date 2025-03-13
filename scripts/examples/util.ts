import { api, connection } from '@sora-substrate/sdk';
import { SORA_ENV } from '@sora-substrate/types/scripts/consts';

// import { mnemonicGenerate } from '@polkadot/util-crypto'; // TODO: use it within the faucet

const TST_MNEMONIC = 'street firm worth record skin taste legend lobster magnet stove drive side';

const TST_JSON_ACCOUNT_PASSWORD = 'soratest';
const TST_JSON_ACCOUNT = {
  encoded:
    '7jzkrA8197VeKooU7peSfCNtgsgLlhA13Fk6lHdQLKMAgAAAAQAAAAgAAADe2IIB9bellrk/4JsL6BZqDtpHHv9GfrP1gA+S5L91m9A2QnoE3pITBaUTcWGWlFJVuS1oizMPsrlyilAC08q3AmCdCxcZr6FqXBVBXlpL/9gcS6h+rHB6cuQTvWaYXnLOolRctaB9oIKbaJ2z3bOZ62T7UGkU5trZaKvGF2gCH5TE7oEhCcmGQbQBGUm56ThhU+F9qqIacLcbIOwx',
  encoding: { content: ['pkcs8', 'sr25519'], type: ['scrypt', 'xsalsa20-poly1305'], version: '3' },
  address: '5GLDeyxgNzsnm4NeSHZd9imbSMaV2RUPGRSkchxsUqSbfBpu',
  meta: { isHidden: false, name: 'soratest', whenCreated: 1691752486854 },
};

export async function delay(ms = 40_000): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

export async function connectAndImportAccount(
  env: SORA_ENV | string = SORA_ENV.stage,
  withKeyringLoading = true,
  mnemonic?: string
): Promise<void> {
  await connection.open(env);
  console.info('Connected: ' + env);
  await api.initialize(withKeyringLoading);
  await api.calcStaticNetworkFees();

  api.importAccount(mnemonic ?? TST_MNEMONIC, 'name', 'pass');
}

export async function connectAndImportAccountJson(
  env: SORA_ENV | string = SORA_ENV.stage,
  json: any,
  password: string,
  withKeyringLoading = true
): Promise<void> {
  await connection.open(env);
  console.info('Connected: ' + env);
  await api.initialize(withKeyringLoading);
  await api.calcStaticNetworkFees();

  api.restoreAccountFromJson(json, password);

  await api.loginAccount(json.address);
}

export async function disconnect(): Promise<void> {
  api.logout();
  await connection.close();
  console.info('Disconnected!');
}

export async function withConnectedAccount(
  fn: Function,
  env: SORA_ENV | string = SORA_ENV.test,
  mnemonic?: string
): Promise<void> {
  await connectAndImportAccount(env, true, mnemonic);
  await fn();
  await disconnect();
}

export async function withImportedFromJsonAccount(fn: Function, env: SORA_ENV | string = SORA_ENV.test): Promise<void> {
  await connectAndImportAccountJson(env, TST_JSON_ACCOUNT, TST_JSON_ACCOUNT_PASSWORD, true);
  api.unlockPair(TST_JSON_ACCOUNT_PASSWORD);
  await fn();
  api.lockPair();
  await disconnect();
}
