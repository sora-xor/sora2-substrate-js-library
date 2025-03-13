import { api } from '@sora-substrate/sdk';

import { delay, withConnectedAccount } from './util';
import { PSWAP, VAL } from '@sora-substrate/sdk/assets/consts';

async function main(): Promise<void> {
  await withConnectedAccount(async () => {
    // // performance test
    // const num = 50;
    // let total = 0;
    // for (let index = 0; index < num; index++) {
    //   const start = performance.now();
    //   await api.calcStaticNetworkFees();
    //   if (index === 0) {
    //     console.info(api.NetworkFee);
    //   }
    //   const end = performance.now();
    //   const time = end - start;
    //   total = total + time;
    //   console.info(`[#${index + 1}]: ${time} ms`);
    // }
    // console.info('Average time:', total / num);

    // // xorless fee
    // const extrinsic = api.api.tx.assets.transfer('', '', 0);
    // const xorlessWrapper = api.api.tx.xorFee.xorlessCall;

    // const fee = await api.getTransactionFee(extrinsic);
    // const xorlessFee = await api.getTransactionFee(xorlessWrapper(extrinsic, VAL.address));

    // console.info('fee', fee);
    // console.info('xorlessFee', xorlessFee);

    await api.fetchAssetsForFee();
    console.info('Fee assets to choose from', api.feeAssets);

    api.subscribeOnRateForAssetFee(PSWAP.address);

    await delay(100000);
  });
}

main()
  .catch(console.error)
  .finally(() => process.exit());
