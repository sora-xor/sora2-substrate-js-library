import { OrderBookOrderBookStatus } from '@polkadot/types/lookup';
import type { Api } from '../api';

import { DexId } from '../dex/consts';

export class OrderBookModule<T> {
  constructor(private readonly root: Api<T>) {}

  public orderBooks = {};

  async getOrderBooks() {
    const toKey = (address) => address.code.toString();

    const entries = await this.root.api.query.orderBook.orderBooks.entries();

    const orderBooks = entries.reduce((buffer, [key, value]) => {
      const orderBook = key.args[0].toJSON();

      const meta = value.unwrap();

      const { orderBookId, status, lastOrderId, tickSize, stepLotSize, minLotSize, maxLotSize } = meta;

      const base = orderBookId.toJSON().base;
      const quote = orderBookId.toJSON().quote;

      buffer[toKey(base) + toKey(quote)] = {
        orderBook,
        status: status.toString(),
        lastOrderId: lastOrderId.toNumber(),
        tickSize: tickSize.toNumber(),
        stepLotSize: stepLotSize.toNumber(),
        minLotSize: minLotSize.toBigInt(),
        maxLotSize: maxLotSize.toBigInt(),
      };

      return buffer;
    }, {});

    this.orderBooks = orderBooks;
  }

  async getUserLimitOrders(account: string) {
    const toKey = (address) => address.code.toString();

    const entries = await this.root.api.query.orderBook.userLimitOrders.entries(account);

    const userLimitOrderIds = entries.reduce((buffer, [key, value]) => {
      const base = key.args[1].toJSON().base;
      const quote = key.args[1].toJSON().quote;

      const limitOrderIds = value.toJSON();

      buffer[toKey(base) + toKey(quote)] = limitOrderIds;

      return buffer;
    }, {});

    Object.entries(userLimitOrderIds);

    const entry = await this.root.api.query.orderBook.limitOrders(
      {
        base: '0x0200040000000000000000000000000000000000000000000000000000000000',
        quote: '0x0200000000000000000000000000000000000000000000000000000000000000',
      },
      2
    );

    console.log('entry', entry);
  }

  async getLimitOrders(base: string, quote: string) {
    const limitOrders = await this.root.api.query.orderBook.limitOrders.entries({ base, quote });

    console.log('limitOrders', limitOrders);
  }

  placeLimitOrder(base: string, quote: string) {
    this.root.submitExtrinsic(
      this.root.api.tx.orderBook.placeLimitOrder({ base, quote }, 10000, 1000, 'Buy', 9999),
      this.root.account.pair
    );
  }

  cancelLimitOrder(base: string, quote: string) {
    this.root.submitExtrinsic(this.root.api.tx.orderBook.cancelLimitOrder({ base, quote }, 1), this.root.account.pair);
  }
}
