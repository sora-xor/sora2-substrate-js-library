console.log('TEST IMPORT')
import { ApiPromise } from '@polkadot/api';
import { WsProvider } from '@polkadot/rpc-provider';
import { options } from '@sora-neo-substrate/api';
import { DEXInfo } from '@sora-neo-substrate/types/interfaces';

async function main(): Promise<void> {
  console.log('TEST MAIN FUNCTION')
  const provider = new WsProvider('wss://127.0.0.1:19744');
  const api = new ApiPromise(options({ provider }));
  await api.isReady;

  console.log(api.query.dexManager.dexInfos<DEXInfo>(0));
}

main()
