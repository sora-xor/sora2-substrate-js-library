import { api } from '@sora-substrate/util';

import { withConnectedAccount } from './examples/util';

async function main(): Promise<void> {
  await withConnectedAccount(async () => {
    // await api.orderBook.getOrderBooks();

    // console.log('orderBooks', api.orderBook.orderBooks);

    await api.orderBook.getUserLimitOrders('cnVkoGs3rEMqLqY27c2nfVXJRGdzNJk2ns78DcqtppaSRe8qm');

    // api.orderBook.getLimitOrders(
    //   '0x0200050000000000000000000000000000000000000000000000000000000000',
    //   '0x0200000000000000000000000000000000000000000000000000000000000000'
    // );
  });
}

main()
  .catch(console.error)
  .finally(() => process.exit());
