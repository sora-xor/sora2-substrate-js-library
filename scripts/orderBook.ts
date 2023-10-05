import { api } from '@sora-substrate/util';

import { delay, withConnectedAccount } from './examples/util';
import { Side } from '@sora-substrate/util/orderBook/types';
import { DexId } from '@sora-substrate/util/dex/consts';

async function main(): Promise<void> {
  await withConnectedAccount(async () => {
    const xor = '0x0200000000000000000000000000000000000000000000000000000000000000';
    const val = '0x0200040000000000000000000000000000000000000000000000000000000000';
    const account = 'cnVkoGs3rEMqLqY27c2nfVXJRGdzNJk2ns78DcqtppaSRe8qm';

    await api.orderBook.getOrderBooks();

    console.log('api.orderBook.orderBooks', api.orderBook.orderBooks);

    await api.orderBook.getUserOrderBooks(account);

    api.orderBook.getUserLimitOrdersIds(DexId.XOR, val, xor, account).subscribe((ids) => {
      console.log('ids', ids);
    });

    const order = await api.orderBook.getLimitOrder(DexId.XOR, val, xor, 16);
    console.log('order', order);

    api.orderBook.getAggregatedAsks(DexId.XOR, val, xor).subscribe((asks) => {
      console.log('asks', asks);
    });

    api.orderBook.getAggregatedBids(DexId.XOR, val, xor).subscribe((bids) => {
      console.log('bids', bids);
    });

    const price = '1100000000000000000';
    const amount = '100000000000000000000';
    const side: Side = 'Buy';

    await api.orderBook.placeLimitOrder(DexId.XOR, val, xor, price, amount, side);

    await delay(100000);
  });
}

main()
  .catch(console.error)
  .finally(() => process.exit());
