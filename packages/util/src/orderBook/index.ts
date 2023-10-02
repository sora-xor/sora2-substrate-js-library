import { OrderBookOrderBookStatus } from '@polkadot/types/lookup';

import type { Api } from '../api';

import { map } from 'rxjs';
import { FPNumber } from '@sora-substrate/math';

export class OrderBookModule<T> {
  constructor(private readonly root: Api<T>) {}

  public orderBooks = {};
  public userOrderLimits = {};

  async getOrderBooks() {
    const toKey = (address) => address.code.toString();

    const entries = await this.root.api.query.orderBook.orderBooks.entries();

    console.log('entries', entries);

    const orderBooks = entries.reduce((buffer, [key, value]) => {
      // const orderBook = key.args[0].toJSON();
      // const meta = value.unwrap();
      // const { orderBookId, status, lastOrderId, tickSize, stepLotSize, minLotSize, maxLotSize } = meta;
      // const base = orderBookId.toJSON().base;
      // const quote = orderBookId.toJSON().quote;
      // buffer[toKey(base) + toKey(quote)] = {
      //   orderBook,
      //   status: status.toString(),
      //   lastOrderId: lastOrderId.toNumber(),
      //   tickSize: tickSize.toNumber(),
      //   stepLotSize: stepLotSize.toNumber(),
      //   minLotSize: minLotSize.toBigInt(),
      //   maxLotSize: maxLotSize.toBigInt(),
      // };
      // return buffer;
    }, {});

    this.orderBooks = orderBooks;
  }

  getAggregatedAsks(base, quote) {
    // return this.root.apiRx.query.orderBook.aggregatedAsks({ dexId: 0, base, quote }).pipe(
    //   map((data) => {
    //     const asks = data.toJSON();
    //     for (const ask of Object.keys(asks)) {
    //       console.log('price', JSON.parse(ask).inner);
    //       console.log('amount', asks[ask].inner);
    //     }
    //     return asks;
    //   })
    // );
  }

  getAggregatedBids(base, quote) {
    // return this.root.apiRx.query.orderBook.aggregatedBids({ dexId: 0, base, quote }).pipe(
    //   map((result) => {
    //     console.log('result bids', result.toJSON());
    //     return result;
    //   })
    // );
  }

  getUserLimitOrders(base, quote) {
    // TODO: get ids first
    // return this.root.apiRx.query.orderBook.limitOrders.multi([
    //   [{ dexId: 0, base, quote }, 1],
    //   [{ dexId: 0, base, quote }, 2],
    // ]);
  }

  async getUserLimitOrdersIds(account: string) {
    // const toKey = (address) => address.code.toString();
    // const entries = await this.root.api.query.orderBook.userLimitOrders.entries(account);
    // const userLimitOrderIds = entries.reduce((buffer, [key, value]) => {
    //   const base = key.args[1].toJSON().base;
    //   const quote = key.args[1].toJSON().quote;
    //   const limitOrderIds = value.toJSON();
    //   buffer[toKey(base) + toKey(quote)] = limitOrderIds;
    //   return buffer;
    // }, {});
    // return userLimitOrderIds;
  }

  // public async getLimitOrdersObservable(base: string, quote: string) {
  //   const multiEntries = [
  //     [base, quote],
  //     [4, 5, 6, 2],
  //   ];

  //   // const otherParams = otherAssetIds.map((assetId) => [accountId, assetId]);

  //   return this.root.apiRx.query.orderBook.limitOrders.multi(multiEntries);
  // }

  // placeLimitOrder(base: string, quote: string) {
  //   this.root.submitExtrinsic(
  //     this.root.api.tx.orderBook.placeLimitOrder({ base, quote }, 10000, 1000, 'Buy', 9999),
  //     this.root.account.pair
  //   );
  // }

  // cancelLimitOrder(base: string, quote: string) {
  //   this.root.submitExtrinsic(this.root.api.tx.orderBook.cancelLimitOrder({ base, quote }, 1), this.root.account.pair);
  // }
}
