import { FPNumber, api } from '@sora-substrate/util';
import { DAI, XOR } from '@sora-substrate/util/assets/consts';
import { withConnectedAccount } from './util';

async function main(): Promise<void> {
  await withConnectedAccount(async () => {
    const num = 50;
    let total = 0;
    for (let index = 0; index < num; index++) {
      const start = performance.now();
      const res = await api.swap.getResultRpc(XOR.address, DAI.address, 100);
      const amount = FPNumber.fromCodecValue(res.amount);
      const amountStr = amount.toLocaleString();
      const end = performance.now();
      const time = end - start;
      total = total + time;
      console.info(`[#${index + 1}] amount: ${amountStr} DAI, time: ${time} ms`);
    }
    console.info('Average time:', total / num);
  });
}

main()
  .catch(console.error)
  .finally(() => process.exit());
