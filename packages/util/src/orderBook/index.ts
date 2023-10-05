import { map } from 'rxjs';
import { FPNumber } from '@sora-substrate/math';
import { Operation } from '../BaseApi';
import { MAX_TIMESTAMP } from './consts';

import type { Observable } from '@polkadot/types/types';
import type { CommonBalanceUnit, CommonPrimitivesAssetId32 } from '@polkadot/types/lookup';
import type { Api } from '../api';
import type { LimitOrder, OrderBook, Side } from './types';

const toAssetId = (asset: CommonPrimitivesAssetId32) => asset.code.toString();

function toFP(value: CommonBalanceUnit): FPNumber {
  const decimals = value.isDivisible.isTrue ? FPNumber.DEFAULT_PRECISION : 0;
  return FPNumber.fromCodecValue(value.inner.toString(), decimals);
}

export class OrderBookModule<T> {
  constructor(private readonly root: Api<T>) {}

  serializedKey(base: string, quote: string): string {
    if (!(base && quote)) return '';
    return `${base},${quote}`;
  }

  deserializeKey(key: string): Partial<{ base: string; quote: string }> {
    if (!key) return null;
    const [base, quote] = key.split(',');
    return { base, quote };
  }

  /**
   * Get order books and set to public orderBooks object
   *
   */
  public async getOrderBooks(): Promise<Record<string, OrderBook>> {
    const entries = await this.root.api.query.orderBook.orderBooks.entries();

    const orderBooks: Record<string, OrderBook> = entries.reduce((buffer, [_, value]) => {
      if (!value.isSome) return buffer;

      const meta = value.unwrap();
      const { orderBookId, status, lastOrderId, tickSize, stepLotSize, minLotSize, maxLotSize } = meta;
      const base = toAssetId(orderBookId.base);
      const quote = toAssetId(orderBookId.quote);

      buffer[this.serializedKey(base, quote)] = {
        orderBookId,
        status: status.toString(),
        lastOrderId: lastOrderId.toNumber(),
        tickSize: toFP(tickSize),
        stepLotSize: toFP(stepLotSize),
        minLotSize: toFP(minLotSize),
        maxLotSize: toFP(maxLotSize),
      };

      return buffer;
    }, {});

    return orderBooks;
  }

  /**
   * Get user's order book addresses and set to public userOrderBooks array
   */
  public async getUserOrderBooks(account: string): Promise<string[]> {
    const entries = await this.root.api.query.orderBook.userLimitOrders.entries(account);

    return entries.map(([key, _]) => {
      const { base, quote } = key.args[1];
      return this.serializedKey(toAssetId(base), toAssetId(quote));
    });
  }

  /**
   * Creates a subscription that relies on block emitting
   * @param account account address
   * @returns array of book addresses the user is in
   */
  public subscribeOnUserOrderBooks(account: string): Observable<Promise<string[]>> {
    return this.root.system.getBlockNumberObservable().pipe(map(() => this.getUserOrderBooks(account)));
  }

  /**
   * Get mappings price to amount of asks
   *
   * Represented as **[[price, amount], [price, amount], ...]**
   * @param orderBookId base and quote addresses
   */
  public subscribeOnAggregatedAsks(base: string, quote: string): Observable<Array<[FPNumber, FPNumber]>> {
    const dexId = this.root.dex.getDexId(quote);
    return this.root.apiRx.query.orderBook.aggregatedAsks({ dexId, base, quote }).pipe(
      map((data) => {
        const asks: Array<[FPNumber, FPNumber]> = [];

        data.forEach((value, key) => {
          const price = toFP(key);
          const amount = toFP(value);
          asks.push([price, amount]);
        });

        return asks;
      })
    );
  }

  /**
   * Get mappings price to amount of bids
   *
   * Represented as **[[price, amount], [price, amount], ...]**
   * @param orderBookId base and quote addresses
   */
  public subscribeOnAggregatedBids(base: string, quote: string): Observable<Array<[FPNumber, FPNumber]>> {
    const dexId = this.root.dex.getDexId(quote);
    return this.root.apiRx.query.orderBook.aggregatedBids({ dexId, base, quote }).pipe(
      map((data) => {
        const bids: Array<[FPNumber, FPNumber]> = [];

        data.forEach((value, key) => {
          const price = toFP(key);
          const amount = toFP(value);
          bids.push([price, amount]);
        });

        return bids;
      })
    );
  }

  /**
   * Get user's limit order ids
   * @param orderBookId base and quote addresses
   * @param account account address
   */
  public subscribeOnUserLimitOrdersIds(base: string, quote: string, account: string): Observable<Array<number>> {
    const dexId = this.root.dex.getDexId(quote);
    return this.root.apiRx.query.orderBook
      .userLimitOrders(account, { dexId, base, quote })
      .pipe(map((idsCodec) => idsCodec.unwrapOrDefault().toJSON() as Array<number>));
  }

  /**
   * Get user's limit order info
   * @param orderBookId base and quote addresses
   * @param id limit order id
   * @returns formatted limit order info
   */
  public async getLimitOrder(base: string, quote: string, id: number): Promise<LimitOrder> {
    const dexId = this.root.dex.getDexId(quote);
    const orderCodec = await this.root.api.query.orderBook.limitOrders({ dexId, base, quote }, id);

    if (!orderCodec.isSome) return null;
    const order = orderCodec.unwrap();

    return {
      id: order.id.toNumber(),
      expiresAt: order.expiresAt.toNumber(),
      lifespan: order.lifespan.toNumber(),
      time: order.time.toNumber(),
      owner: order.owner.toString(),
      side: order.side.toString() as Side,
      price: toFP(order.price),
      amount: toFP(order.amount),
      originalAmount: toFP(order.originalAmount),
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
    const dexId = this.root.dex.getDexId(quote);

    return this.root.submitExtrinsic(
      this.root.api.tx.orderBook.placeLimitOrder({ dexId, base, quote }, price, amount, side, timestamp),
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
    const dexId = this.root.dex.getDexId(quote);

    return this.root.submitExtrinsic(
      this.root.api.tx.orderBook.cancelLimitOrder({ dexId, base, quote }, orderId),
      this.root.account.pair,
      {
        type: Operation.CancelLimitOrder,
        assetAddress: base,
        asset2Address: quote,
        limitOrderIds: [orderId],
      }
    );
  }

  /**
   * Cancel several limit orders at once
   * @param orderBookId base and quote addresses
   * @param orderIds array ids
   */
  public cancelLimitOrderBatch(base: string, quote: string, orderIds: number[]): Promise<T> {
    const dexId = this.root.dex.getDexId(quote);

    return this.root.submitExtrinsic(
      this.root.api.tx.orderBook.cancelLimitOrdersBatch([[{ dexId, base, quote }, orderIds]]),
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
