import { api } from '@sora-substrate/sdk';

import { delay, withConnectedAccount } from './util';

async function main(): Promise<void> {
  await withConnectedAccount(async () => {
    // ADD LIQUIDITY TX
  });
}

main()
  .catch(console.error)
  .finally(() => process.exit());
