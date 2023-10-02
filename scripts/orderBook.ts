import { api } from '@sora-substrate/util';

import { delay, withConnectedAccount } from './examples/util';

async function main(): Promise<void> {
  await withConnectedAccount(async () => {
    // console.log('FEE:', api.NetworkFee);
    const xor = '0x0200000000000000000000000000000000000000000000000000000000000000';
    const val = '0x0200040000000000000000000000000000000000000000000000000000000000';

    await api.orderBook.getOrderBooks();

    // console.log('orderBooks', api.orderBook.orderBooks);

    // const result = await api.orderBook.getUserLimitOrdersIds('cnVkoGs3rEMqLqY27c2nfVXJRGdzNJk2ns78DcqtppaSRe8qm');

    // console.log('result ids', result);

    // const subscription = api.orderBook.getLimitOrdersObservable(val, xor).subscribe((result) => {
    //   console.log('subscription', result);
    // });

    // await api.orderBook.getLimitOrdersObservable(val, xor);

    // api.orderBook.getUserLimitOrders(val, xor).subscribe((result) => {
    //   console.log('result', result);
    // });

    // api.orderBook.getAggregatedAsks(val, xor).subscribe((asks) => {
    //   // console.log('asks', asks);
    // });

    // api.orderBook.getAggregatedBids(val, xor).subscribe((bids) => {
    //   console.log('bids', bids);
    // });

    await delay(100000);
  });
}

main()
  .catch(console.error)
  .finally(() => process.exit());
