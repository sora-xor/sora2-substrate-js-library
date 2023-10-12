import { map } from 'rxjs';
import { FPNumber } from '@sora-substrate/math';
import { Operation } from '../BaseApi';
import { MAX_TIMESTAMP } from './consts';
import { OrderBookStatus, PriceVariant } from '@sora-substrate/liquidity-proxy';
import type { OrderBook, OrderBookPriceVolume } from '@sora-substrate/liquidity-proxy';

import type { Observable } from '@polkadot/types/types';
import type { Option } from '@polkadot/types-codec';
import type {
  CommonBalanceUnit,
  CommonPrimitivesAssetId32,
  CommonPrimitivesPriceVariant,
  OrderBookOrderBookStatus,
  OrderBook as OrderBookStruct,
} from '@polkadot/types/lookup';

import type { Api } from '../api';
import type { LimitOrder } from './types';

const toAssetId = (asset: CommonPrimitivesAssetId32) => asset.code.toString();

function toFP(value: CommonBalanceUnit): FPNumber {
  const decimals = value.isDivisible.isTrue ? FPNumber.DEFAULT_PRECISION : 0;
  return FPNumber.fromCodecValue(value.inner.toString(), decimals);
}

const getStatus = (status: OrderBookOrderBookStatus): OrderBookStatus => {
  if (status.isTrade) return OrderBookStatus.Trade;
  if (status.isPlaceAndCancel) return OrderBookStatus.PlaceAndCancel;
  if (status.isOnlyCancel) return OrderBookStatus.OnlyCancel;

  return OrderBookStatus.Stop;
};

const getPriceVariant = (variant: CommonPrimitivesPriceVariant): PriceVariant => {
  if (variant.isBuy) {
    return PriceVariant.Buy;
  } else {
    return PriceVariant.Sell;
  }
};

const formatOrderBookOption = (option: Option<OrderBookStruct>): OrderBook | null => {
  if (!option.isSome) return null;

  const { orderBookId, status, lastOrderId, tickSize, stepLotSize, minLotSize, maxLotSize } = option.unwrap();

  const dexId = orderBookId.dexId.toNumber();
  const base = toAssetId(orderBookId.base);
  const quote = toAssetId(orderBookId.quote);

  return {
    orderBookId: { dexId, base, quote },
    status: getStatus(status),
    lastOrderId: lastOrderId.toNumber(),
    tickSize: toFP(tickSize),
    stepLotSize: toFP(stepLotSize),
    minLotSize: toFP(minLotSize),
    maxLotSize: toFP(maxLotSize),
  };
};

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
      const book = formatOrderBookOption(value);

      if (!book) return buffer;

      const { base, quote } = book.orderBookId;

      buffer[this.serializedKey(base, quote)] = book;

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
   * Get observable order book data
   * @param orderBookId base and quote addresses
   */
  public getOrderBookObservable(base: string, quote: string): Observable<OrderBook | null> {
    const dexId = this.root.dex.getDexId(quote);

    return this.root.apiRx.query.orderBook
      .orderBooks({ dexId, base, quote })
      .pipe(map((option) => formatOrderBookOption(option)));
  }

  /**
   * Get mappings price to amount of asks
   *
   * Represented as **[[price, amount], [price, amount], ...]**
   * @param orderBookId base and quote addresses
   */
  public subscribeOnAggregatedAsks(base: string, quote: string): Observable<Array<OrderBookPriceVolume>> {
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
  public subscribeOnAggregatedBids(base: string, quote: string): Observable<Array<OrderBookPriceVolume>> {
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
      orderBookId: { dexId, base, quote },
      id: order.id.toNumber(),
      expiresAt: order.expiresAt.toNumber(),
      lifespan: order.lifespan.toNumber(),
      time: order.time.toNumber(),
      owner: order.owner.toString(),
      side: getPriceVariant(order.side),
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
    side: PriceVariant,
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
