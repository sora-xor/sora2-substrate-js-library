import { api } from '@sora-substrate/util';
import { connection } from '@sora-substrate/connection';
import { SORA_ENV } from '@sora-substrate/types/scripts/consts';
// import { mnemonicGenerate } from '@polkadot/util-crypto'; // TODO: use it within the faucet

const TST_MNEMONIC = 'street firm worth record skin taste legend lobster magnet stove drive side';

export async function delay(ms = 40000): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

async function connectAndImportAccount(env = SORA_ENV.dev, mnemonic?: string): Promise<void> {
  await connection.open(env);
  console.info('Connected: ' + env);
  await api.initialize();
  await api.calcStaticNetworkFees();
  // salon muscle select culture inform pen typical object fox fruit culture civil
  api.importAccount(mnemonic ?? TST_MNEMONIC, 'name', 'pass');
}

async function disconnect(): Promise<void> {
  api.logout();
  await connection.close();
}

export async function withConnectedAccount(fn: Function, env = SORA_ENV.dev, mnemonic?: string): Promise<void> {
  await connectAndImportAccount(env, mnemonic);
  await fn();
  await disconnect();
}
