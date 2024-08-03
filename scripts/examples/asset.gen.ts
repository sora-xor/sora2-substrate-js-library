import { api } from '@sora-substrate/util';
import { SORA_ENV } from '@sora-substrate/types/scripts/consts';

import { withConnectedAccount } from './util';

async function main(): Promise<void> {
  await withConnectedAccount(async () => {
    const nextAssetId = await api.assets.getNextRegisteredAssetId();
    console.info('Asset ID:', nextAssetId);
  }, SORA_ENV.stage);
}

main()
  .catch(console.error)
  .finally(() => process.exit());
