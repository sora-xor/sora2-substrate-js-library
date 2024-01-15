import { Subscription, firstValueFrom } from 'rxjs';
import { api } from '@sora-substrate/util';
import { SORA_ENV } from '@sora-substrate/types/scripts/consts';
import { disconnect, connectAndImportAccount } from './util';

async function main(): Promise<void> {
  api.initKeyring();
  const num = 50;
  let total = 0;
  let sub: Subscription | undefined;
  for (let index = 0; index < num; index++) {
    await connectAndImportAccount(SORA_ENV.stage, false);
    await api.restoreActiveAccount();
    const start = performance.now();
    sub = api.poolXyk.getUserPoolsSubscription();
    await firstValueFrom(api.poolXyk.accountLiquidityLoaded);
    console.info(api.poolXyk.accountLiquidity.length);
    sub.unsubscribe();
    const end = performance.now();
    const time = end - start;
    total = total + time;
    console.info(`[#${index + 1}] time: ${time} ms`);
    await disconnect();
  }
  console.info('Average time:', total / num);
}

main()
  .catch(console.error)
  .finally(() => process.exit());
