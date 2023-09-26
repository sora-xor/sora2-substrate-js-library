import { api } from '@sora-substrate/util';

import { withConnectedAccount } from './util';

async function main(): Promise<void> {
  await withConnectedAccount(async () => {
    const registeredAssets = await api.bridgeProxy.eth.getRegisteredAssets();
    console.log('registeredAssets', registeredAssets);
  });
}

main()
  .catch(console.error)
  .finally(() => process.exit());
