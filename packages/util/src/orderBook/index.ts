import type { Api } from '../api';

import { map } from 'rxjs';
import { FPNumber } from '@sora-substrate/math';
import { HistoryItem } from '../BaseApi';
import { LimitOrder, Side, Value } from './types';

import type { Observable } from '@polkadot/types/types';

export class OrderBookModule<T> {
  constructor(private readonly root: Api<T>) {}

  public orderBooks = {};
  public userOrderBooks: Array<string> = [];

  public async getOrderBooks(): Promise<void> {
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
        tickSize: this.getValueFromJson(tickSize as unknown as Value),
        stepLotSize: this.getValueFromJson(stepLotSize as unknown as Value),
        minLotSize: this.getValueFromJson(minLotSize as unknown as Value),
        maxLotSize: this.getValueFromJson(maxLotSize as unknown as Value),
      };

      return buffer;
    }, {});

    this.orderBooks = orderBooks;
  }

  public async getUserOrderBooks(account: string): Promise<void> {
    const toKey = (address) => address.code.toString();

    const userOrderBooksIds = [];

    const entries = await this.root.api.query.orderBook.userLimitOrders.entries(account);
    entries.map(([book]) => {
      userOrderBooksIds.push(toKey(book.toHuman()[1].base) + toKey(book.toHuman()[1].quote));
    });

    this.userOrderBooks = userOrderBooksIds;
  }

  public subscribeOnUserOrderBooks(account: string): Observable<Promise<String[]>> {
    return this.root.system.getBlockNumberObservable().pipe(
      map(async () => {
        await this.getUserOrderBooks(account);
        return this.userOrderBooks;
      })
    );
  }

  public getAggregatedAsks(base: string, quote: string): Observable<Array<[]>> {
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

  public getAggregatedBids(base: string, quote: string): Observable<Array<[]>> {
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

  public getValue(value: Value): FPNumber {
    const decimals = value.isDivisible ? FPNumber.DEFAULT_PRECISION : 0;
    return FPNumber.fromCodecValue(value.inner, decimals);
  }

  public getValueFromJson(value: Value): FPNumber {
    const decimals = JSON.parse(value as unknown as string).isDivisible ? FPNumber.DEFAULT_PRECISION : 0;
    return FPNumber.fromCodecValue(value.inner, decimals);
  }

  public getUserLimitOrdersIds(base: string, quote: string, account: string): Observable<Array<number>> {
    return this.root.apiRx.query.orderBook
      .userLimitOrders(account, { dexId: 0, base, quote })
      .pipe(map((ids) => ids.toJSON() as Array<number>));
  }

  public async getLimitOrder(base: string, quote: string, id: number): Promise<LimitOrder> {
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
  ): Promise<void> {
    await this.root.submitExtrinsic(
      this.root.api.tx.orderBook.placeLimitOrder({ dexId: 0, base, quote }, price, amount, side, timestamp),
      this.root.account.pair,
      {} as HistoryItem
    );
  }

  public async cancelLimitOrder(base: string, quote: string, orderId: number): Promise<void> {
    await this.root.submitExtrinsic(
      this.root.api.tx.orderBook.cancelLimitOrder({ dexId: 0, base, quote }, orderId),
      this.root.account.pair,
      {} as HistoryItem
    );
  }

  public async cancelLimitOrderBatch(base: string, quote: string, orderIds: number[]): Promise<void> {
    await this.root.submitExtrinsic(
      this.root.api.tx.orderBook.cancelLimitOrdersBatch([[{ dexId: 0, base, quote }, orderIds]]),
      this.root.account.pair,
      {} as HistoryItem
    );
  }
}
