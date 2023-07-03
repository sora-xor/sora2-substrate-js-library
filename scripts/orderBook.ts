import { api } from '@sora-substrate/util';

import { withConnectedAccount } from './examples/util';

async function main(): Promise<void> {
  await withConnectedAccount(async () => {
    await api.orderBook.getOrderBooks();
    api.orderBook.orderBooks;

    console.log('OrderBooks', api.orderBook.orderBooks);

    // api.orderBook.createOrderBook(
    //   '0x0200090000000000000000000000000000000000000000000000000000000000',
    //   '0x0200000000000000000000000000000000000000000000000000000000000000'
    // );

    api.orderBook.getLimitOrders(
      '0x0200050000000000000000000000000000000000000000000000000000000000',
      '0x0200000000000000000000000000000000000000000000000000000000000000'
    );
  });
}

main()
  .catch(console.error)
  .finally(() => process.exit());
