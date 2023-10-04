import type { Api } from '../api';

import { map } from 'rxjs';
import { FPNumber } from '@sora-substrate/math';
import { HistoryItem } from '../BaseApi';
import { Side } from './types';

export class OrderBookModule<T> {
  constructor(private readonly root: Api<T>) {}

  public orderBooks = {};
  public userOrderLimits = {};

  public async getOrderBooks() {
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
        tickSize: this.getValueFromJson(tickSize),
        stepLotSize: this.getValueFromJson(stepLotSize),
        minLotSize: this.getValueFromJson(minLotSize),
        maxLotSize: this.getValueFromJson(maxLotSize),
      };

      return buffer;
    }, {});

    this.orderBooks = orderBooks;
  }

  public getAggregatedAsks(base: string, quote: string) {
    return this.root.apiRx.query.orderBook.aggregatedAsks({ dexId: 0, base, quote }).pipe(
      map((data) => {
        const priceAmountMapping = data.toJSON() as any;
        let asks = [];

        for (const ask of Object.keys(priceAmountMapping)) {
          const price = this.getValue(JSON.parse(ask));
          const amount = this.getValue(priceAmountMapping[ask]);

          asks.push([price, amount]);
        }

        return asks;
      })
    );
  }

  public getAggregatedBids(base: string, quote: string) {
    return this.root.apiRx.query.orderBook.aggregatedBids({ dexId: 0, base, quote }).pipe(
      map((data) => {
        const priceAmountMapping = data.toJSON() as any;
        let bids = [];

        for (const bid of Object.keys(priceAmountMapping)) {
          const price = this.getValue(JSON.parse(bid));
          const amount = this.getValue(priceAmountMapping[bid]);

          bids.push([price, amount]);
        }

        return bids;
      })
    );
  }

  public getValue(value): FPNumber {
    const decimals = value.isDivisible ? FPNumber.DEFAULT_PRECISION : 0;
    return FPNumber.fromCodecValue(value.inner, decimals);
  }

  public getValueFromJson(value): FPNumber {
    const decimals = JSON.parse(value).isDivisible ? FPNumber.DEFAULT_PRECISION : 0;
    return FPNumber.fromCodecValue(value.inner, decimals);
  }

  public getUserLimitOrdersIds(base: string, quote: string, account: string) {
    return this.root.apiRx.query.orderBook
      .userLimitOrders(account, { dexId: 0, base, quote })
      .pipe(map((ids) => ids.toJSON()));
  }

  public async getLimitOrder(base: string, quote: string, id: number) {
    const order = (await this.root.api.query.orderBook.limitOrders({ dexId: 0, base, quote }, id)).toJSON() as any;

    return {
      ...order,
      price: this.getValue(order.price),
      amount: this.getValue(order.amount),
      originalAmount: this.getValue(order.originalAmount),
    };
  }

  public async placeLimitOrder(
    base: string,
    quote: string,
    price: string,
    amount: string,
    side: Side,
    timestamp: string
  ) {
    await this.root.submitExtrinsic(
      this.root.api.tx.orderBook.placeLimitOrder({ dexId: 0, base, quote }, price, amount, side, timestamp),
      this.root.account.pair,
      {} as HistoryItem
    );
  }

  public async cancelLimitOrder(base: string, quote: string, orderId: number) {
    await this.root.submitExtrinsic(
      this.root.api.tx.orderBook.cancelLimitOrder({ dexId: 0, base, quote }, orderId),
      this.root.account.pair,
      {} as HistoryItem
    );
  }

  public async cancelLimitOrderBatch(base: string, quote: string, orderIds: number[]) {
    await this.root.submitExtrinsic(
      this.root.api.tx.orderBook.cancelLimitOrdersBatch([[{ dexId: 0, base, quote }, orderIds]]),
      this.root.account.pair,
      {} as HistoryItem
    );
  }
}
