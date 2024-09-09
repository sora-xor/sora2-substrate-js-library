import { api } from '@sora-substrate/sdk';
import { PriceVariant } from '@sora-substrate/liquidity-proxy';

import { delay, withConnectedAccount } from './util';

async function main(): Promise<void> {
  await withConnectedAccount(async () => {
    const xor = '0x0200000000000000000000000000000000000000000000000000000000000000';
    const val = '0x0200040000000000000000000000000000000000000000000000000000000000';
    const account = 'cnVkoGs3rEMqLqY27c2nfVXJRGdzNJk2ns78DcqtppaSRe8qm';

    const orderBooks = await api.orderBook.getOrderBooks();
    console.log('orderBooks', orderBooks);

    const isOrderPlaceable = await api.orderBook.isOrderPlaceable(val, xor, PriceVariant.Sell, '5');
    console.log('isOrderPlaceable', isOrderPlaceable);

    await api.orderBook.getUserOrderBooks(account);

    api.orderBook.subscribeOnUserLimitOrdersIds(val, xor, account).subscribe((ids) => {
      console.log('ids', ids);
    });

    const order = await api.orderBook.getLimitOrder(val, xor, 16);
    console.log('order', order);

    api.orderBook.subscribeOnAggregatedAsks(val, xor).subscribe((asks) => {
      console.log('asks', asks);
    });

    api.orderBook.subscribeOnAggregatedBids(val, xor).subscribe((bids) => {
      console.log('bids', bids);
    });

    const price = '1100000000000000000';
    const amount = '100000000000000000000';
    const side: PriceVariant = PriceVariant.Buy;

    await api.orderBook.placeLimitOrder(val, xor, price, amount, side);

    await delay(100000);
  });
}

main()
  .catch(console.error)
  .finally(() => process.exit());
