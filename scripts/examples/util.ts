import { api, connection } from '@sora-substrate/util';

export async function delay(ms = 40000): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

async function connectAndImportAccount(): Promise<void> {
  await connection.open('wss://ws.framenode-3.s3.dev.sora2.soramitsu.co.jp');
  api.initialize();
  api.importAccount('salon muscle select culture inform pen typical object fox fruit culture civil', 'name', 'pass');
}

async function disconnect(): Promise<void> {
  await connection.close();
}

export async function withConnectedAccount(fn): Promise<void> {
  await connectAndImportAccount();
  await fn();
  await disconnect();
}
