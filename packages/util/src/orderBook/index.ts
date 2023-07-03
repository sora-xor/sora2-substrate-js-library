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

      const { dexId, orderBookId, status, lastOrderId, tickSize, stepLotSize, minLotSize, maxLotSize } = meta;

      const base = orderBookId.toJSON().base;
      const quote = orderBookId.toJSON().quote;

      buffer[toKey(base) + toKey(quote)] = {
        orderBook,
        dexId: dexId.toNumber(),
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

  async getLimitOrders(base: string, quote: string) {
    console.log(
      'this.root.api.query.orderBook.limitOrders',
      await this.root.api.query.orderBook.limitOrders.entries({ base, quote })
    );

    // DOES NOT EXECUTE

    const limitOrders = await this.root.api.query.orderBook.limitOrders.entries({ base, quote });
    console.log('limitOrders', limitOrders);
  }

  createOrderBook(base: string, quote: string, dexId = DexId.XOR) {
    this.root.submitExtrinsic(
      this.root.api.tx.orderBook.createOrderbook(dexId, { base, quote }),
      this.root.account.pair
    );
  }

  deleteOrderBook(base: string, quote: string) {
    this.root.submitExtrinsic(this.root.api.tx.orderBook.deleteOrderbook({ base, quote }), this.root.account.pair);
  }

  updateOrderBook(base: string, quote: string, options) {
    const { tickSize, stepLotSize, minLotSize, maxLotSize } = options;

    this.root.submitExtrinsic(
      this.root.api.tx.orderBook.updateOrderbook({ base, quote }, tickSize, stepLotSize, minLotSize, maxLotSize),
      this.root.account.pair
    );
  }

  changeOrderBookStatus(base: string, quote: string, status: OrderBookOrderBookStatus) {
    this.root.submitExtrinsic(
      this.root.api.tx.orderBook.changeOrderbookStatus({ base, quote }, status),
      this.root.account.pair
    );
  }

  placeLimitOrder() {}

  cancelLimitOrder() {}
}
