import { api, connection } from '@sora-substrate/util';
import { SORA_ENV } from '@sora-substrate/types/scripts/consts';
// import { mnemonicGenerate } from '@polkadot/util-crypto'; // TODO: use it within the faucet

export async function delay(ms = 40000): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

async function connectAndImportAccount(env = SORA_ENV.dev): Promise<void> {
  await connection.open(env);
  console.info('Connected: ' + env);
  await api.initialize();
  await api.calcStaticNetworkFees();
  // salon muscle select culture inform pen typical object fox fruit culture civil
  api.importAccount('street firm worth record skin taste legend lobster magnet stove drive side', 'name', 'pass');
}

async function disconnect(): Promise<void> {
  await connection.close();
}

export async function withConnectedAccount(fn): Promise<void> {
  await connectAndImportAccount();
  await fn();
  await disconnect();
}
