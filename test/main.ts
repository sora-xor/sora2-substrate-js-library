import { ApiPromise } from '@polkadot/api';
import { WsProvider } from '@polkadot/rpc-provider';
import { options } from '../build/api/src';

async function main (): Promise<void> {
  const provider = new WsProvider('wss://testnet-node-1.acala.laminar.one/ws');
  const api = new ApiPromise(options({ provider }));
  await api.isReady;

  // use api
}

main()
