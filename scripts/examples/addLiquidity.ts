import { api } from '@sora-substrate/util';

import { delay, withConnectedAccount } from './util';

async function main(): Promise<void> {
  withConnectedAccount(async () => {
    // ADD LIQUIDITY TX
  })
}

main()
  .catch(console.error)
  .finally(() => process.exit());
