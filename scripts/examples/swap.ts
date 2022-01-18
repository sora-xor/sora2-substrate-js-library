import { api } from '@sora-substrate/util';

import { delay, withConnectedAccount } from './util';

async function main(): Promise<void> {
  await withConnectedAccount(async () => {
    // SWAP TX
  })
}

main()
  .catch(console.error)
  .finally(() => process.exit());
