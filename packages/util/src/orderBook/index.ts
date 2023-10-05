import type { Api } from '../api';

import { map } from 'rxjs';
import { FPNumber } from '@sora-substrate/math';
import { Operation } from '../BaseApi';
import { LimitOrder, Side, Value } from './types';
import { MAX_TIMESTAMP } from './consts';

import type { Observable } from '@polkadot/types/types';

export class OrderBookModule<T> {
  constructor(private readonly root: Api<T>) {}

  public orderBooks = {};
  public userOrderBooks: Array<string> = [];

  /**
   * Get order books and set to public orderBooks object
   *
   */
  public async getOrderBooks(): Promise<void> {
    const toKey = (address) => address.code.toString();

    const entries = await this.root.api.query.orderBook.orderBooks.entries();

    const orderBooks = entries.reduce((buffer, [key, value]) => {
      if (value.isEmpty || value.isNone) return {};
      const orderBook = key.args[0].toJSON();
      const meta = value.unwrap();
      const { orderBookId, status, lastOrderId, tickSize, stepLotSize, minLotSize, maxLotSize } = meta;
      const orderBookData = orderBookId.toJSON();
      const base = orderBookData.base;
      const quote = orderBookData.quote;

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

  /**
   * Get user's order book addresses and set to public userOrderBooks array
   *
   */
  public async getUserOrderBooks(account: string): Promise<void> {
    const toKey = (address) => address.code.toString();

    const userOrderBooksIds = [];

    const entries = await this.root.api.query.orderBook.userLimitOrders.entries(account);
    entries.forEach(([book]) => {
      userOrderBooksIds.push(toKey(book.toHuman()[1].base) + toKey(book.toHuman()[1].quote));
    });

    this.userOrderBooks = userOrderBooksIds;
  }

  /**
   * Creates a subscription that relies on block emitting
   * @param account account address
   * @returns array of book addresses the user is in
   */
  public subscribeOnUserOrderBooks(account: string): Observable<Promise<string[]>> {
    return this.root.system.getBlockNumberObservable().pipe(
      map(async () => {
        await this.getUserOrderBooks(account);
        return this.userOrderBooks;
      })
    );
  }

  /**
   * Get mappings price to amount of asks
   * @param orderBookId base and quote addresses
   */
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

  /**
   * Get mappings price to amount of bids
   * @param orderBookId base and quote addresses
   */
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

  /**
   * Get user's limit order ids
   * @param orderBookId base and quote addresses
   * @param account account address
   */
  public getUserLimitOrdersIds(base: string, quote: string, account: string): Observable<Array<number>> {
    return this.root.apiRx.query.orderBook
      .userLimitOrders(account, { dexId: 0, base, quote })
      .pipe(map((ids) => ids.toJSON() as Array<number>));
  }

  /**
   * Get user's limit order info
   * @param orderBookId base and quote addresses
   * @param id limit order id
   * @returns formatted limit order info
   */
  public async getLimitOrder(base: string, quote: string, id: number): Promise<LimitOrder> {
    const order = (await this.root.api.query.orderBook.limitOrders({ dexId: 0, base, quote }, id)).toJSON() as any;

    if (!order) return null;

    return {
      ...order,
      price: this.getValue(order.price),
      amount: this.getValue(order.amount),
      originalAmount: this.getValue(order.originalAmount),
    };
  }

  /**
   * Place limit order
   * @param orderBookId base and quote addresses
   * @param price order price
   * @param amount order amount
   * @param side buy or sell
   * @param timestamp order expiration
   */
  public placeLimitOrder(
    base: string,
    quote: string,
    price: string,
    amount: string,
    side: Side,
    timestamp = MAX_TIMESTAMP
  ): Promise<T> {
    return this.root.submitExtrinsic(
      this.root.api.tx.orderBook.placeLimitOrder({ dexId: 0, base, quote }, price, amount, side, timestamp),
      this.root.account.pair,
      {
        type: Operation.PlaceLimitOrder,
        assetAddress: base,
        asset2Address: quote,
        price,
        amount,
        side,
        limitOrderTimestamp: timestamp,
      }
    );
  }

  /**
   * Cancel one limit order by id
   * @param orderBookId base and quote addresses
   * @param orderId number
   */
  public cancelLimitOrder(base: string, quote: string, orderId: number): Promise<T> {
    return this.root.submitExtrinsic(
      this.root.api.tx.orderBook.cancelLimitOrder({ dexId: 0, base, quote }, orderId),
      this.root.account.pair,
      {
        type: Operation.CancelLimitOrder,
        assetAddress: base,
        asset2Address: quote,
        limitOrderIds: orderId,
      }
    );
  }

  /**
   * Cancel several limit orders at once
   * @param orderBookId base and quote addresses
   * @param orderIds array ids
   */
  public cancelLimitOrderBatch(base: string, quote: string, orderIds: number[]): Promise<T> {
    return this.root.submitExtrinsic(
      this.root.api.tx.orderBook.cancelLimitOrdersBatch([[{ dexId: 0, base, quote }, orderIds]]),
      this.root.account.pair,
      {
        type: Operation.CancelLimitOrders,
        assetAddress: base,
        asset2Address: quote,
        limitOrderIds: orderIds,
      }
    );
  }
}
