import { api } from '@sora-substrate/util';
import { connection } from '@sora-substrate/connection';
import { SORA_ENV } from '@sora-substrate/types/scripts/consts';
// import { mnemonicGenerate } from '@polkadot/util-crypto'; // TODO: use it within the faucet

const TST_MNEMONIC = 'street firm worth record skin taste legend lobster magnet stove drive side';

export async function delay(ms = 40000): Promise<void> {
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

export async function disconnect(): Promise<void> {
  api.logout();
  await connection.close();
  console.info('Disconnected!');
}

export async function withConnectedAccount(
  fn: Function,
  env: SORA_ENV | string = SORA_ENV.dev,
  mnemonic?: string
): Promise<void> {
  await connectAndImportAccount(env, true, mnemonic);
  await fn();
  await disconnect();
}
