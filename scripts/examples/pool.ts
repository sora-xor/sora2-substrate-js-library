import { api } from '@sora-substrate/util';

import { delay, withConnectedAccount } from './util';

async function main(): Promise<void> {
  await withConnectedAccount(async () => {
    const sub = api.poolXyk.getUserPoolsSubscription();
    await delay(5000);
    sub.unsubscribe();
  });
}

main()
  .catch(console.error)
  .finally(() => process.exit());
