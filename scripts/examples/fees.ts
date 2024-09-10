import { api } from '@sora-substrate/sdk';

import { delay, withConnectedAccount } from './util';

async function main(): Promise<void> {
  await withConnectedAccount(async () => {
    const num = 50;
    let total = 0;
    for (let index = 0; index < num; index++) {
      const start = performance.now();
      await api.calcStaticNetworkFees();
      if (index === 0) {
        console.info(api.NetworkFee);
      }
      const end = performance.now();
      const time = end - start;
      total = total + time;
      console.info(`[#${index + 1}]: ${time} ms`);
    }
    console.info('Average time:', total / num);
  });
}

main()
  .catch(console.error)
  .finally(() => process.exit());
