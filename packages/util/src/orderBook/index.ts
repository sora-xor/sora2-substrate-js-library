import { map } from 'rxjs';
import { CodecString, FPNumber } from '@sora-substrate/math';
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

import { XOR } from '../assets/consts';
import { DexId } from '../dex/consts';
import type { Api } from '../api';
import type { AggregatedOrderBook, LimitOrder } from './types';

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

  /**
   * Get order books object `Record<serializedKey, OrderBook>`
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
   * Get user's order book addresses
   * @param account account address
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
   * @param base base orderbook asset ID
   * @param quote quote orderbook asset ID
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
   * @param base base orderbook asset ID
   * @param quote quote orderbook asset ID
   * @param dex (optional) dexId number to avoid unnecessary array search if it's already known before
   */
  public async getAggregatedAsks(base: string, quote: string, dex?: number): Promise<Array<OrderBookPriceVolume>> {
    const dexId = dex ?? this.root.dex.getDexId(quote);
    const data = await this.root.api.query.orderBook.aggregatedAsks({ dexId, base, quote });
    const asks: Array<[FPNumber, FPNumber]> = [];
    data.forEach((value, key) => {
      const price = toFP(key);
      const amount = toFP(value);
      asks.push([price, amount]);
    });
    return asks;
  }

  /**
   * Subscribe on mappings price to amount of asks
   *
   * Represented as **[[price, amount], [price, amount], ...]**
   * @param base base orderbook asset ID
   * @param quote quote orderbook asset ID
   * @param dex (optional) dexId number to avoid unnecessary array search if it's already known before
   */
  public subscribeOnAggregatedAsks(base: string, quote: string, dex?: number): Observable<Array<OrderBookPriceVolume>> {
    const dexId = dex ?? this.root.dex.getDexId(quote);
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
   * @param base base orderbook asset ID
   * @param quote quote orderbook asset ID
   * @param dex (optional) dexId number to avoid unnecessary array search if it's already known before
   */
  public async getAggregatedBids(base: string, quote: string, dex?: number): Promise<Array<OrderBookPriceVolume>> {
    const dexId = dex ?? this.root.dex.getDexId(quote);
    const data = await this.root.api.query.orderBook.aggregatedBids({ dexId, base, quote });
    const bids: Array<[FPNumber, FPNumber]> = [];
    data.forEach((value, key) => {
      const price = toFP(key);
      const amount = toFP(value);
      bids.push([price, amount]);
    });
    return bids;
  }

  /**
   * Subscribe on mappings price to amount of bids
   *
   * Represented as **[[price, amount], [price, amount], ...]**
   * @param base base orderbook asset ID
   * @param quote quote orderbook asset ID
   * @param dex (optional) dexId number to avoid unnecessary array search if it's already known before
   */
  public subscribeOnAggregatedBids(base: string, quote: string, dex?: number): Observable<Array<OrderBookPriceVolume>> {
    const dexId = dex ?? this.root.dex.getDexId(quote);
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
   * Get mappings price to amount of asks and bids
   *
   * Represented as **{ asks: [[price, amount], [price, amount], ...], bids: [[price, amount], [price, amount], ...] }**
   * @param base base orderbook asset ID
   * @param quote quote orderbook asset ID
   */
  public async getAggregatedAsksAndBids(base: string, quote: string): Promise<AggregatedOrderBook> {
    const dexId = this.root.dex.getDexId(quote);
    const asks = await this.getAggregatedAsks(base, quote, dexId);
    const bids = await this.getAggregatedBids(base, quote, dexId);

    return { asks, bids };
  }

  /**
   * Get user's limit order ids
   * @param base base orderbook asset ID
   * @param quote quote orderbook asset ID
   * @param account account address
   */
  public async getUserLimitOrdersIds(base: string, quote: string, account: string): Promise<Array<number>> {
    const dexId = this.root.dex.getDexId(quote);
    const idsCodec = await this.root.api.query.orderBook.userLimitOrders(account, { dexId, base, quote });
    return (idsCodec.unwrapOrDefault().toJSON() ?? []) as Array<number>;
  }

  /**
   * Get all user's limit order ids
   * @param account account address
   */
  public async getAllUserLimitOrdersIds(account: string): Promise<Array<number>> {
    const data = await this.root.api.query.orderBook.userLimitOrders.entries(account);
    return data.flatMap(([_, value]) => (value.unwrapOrDefault().toJSON() ?? []) as Array<number>);
  }

  /**
   * Subscribe on user's limit order ids
   * @param base base orderbook asset ID
   * @param quote quote orderbook asset ID
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
   * @param base base orderbook asset ID
   * @param quote quote orderbook asset ID
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
   * @param base base orderbook asset ID
   * @param quote quote orderbook asset ID
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
      this.root.api.tx.orderBook.placeLimitOrder(
        { dexId, base, quote },
        new FPNumber(price).toCodecString(),
        new FPNumber(amount).toCodecString(),
        side,
        timestamp
      ),
      this.root.account.pair,
      {
        type: Operation.OrderBookPlaceLimitOrder,
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
   * @param base base orderbook asset ID
   * @param quote quote orderbook asset ID
   * @param orderId number
   */
  public cancelLimitOrder(base: string, quote: string, orderId: number): Promise<T> {
    const dexId = this.root.dex.getDexId(quote);

    return this.root.submitExtrinsic(
      this.root.api.tx.orderBook.cancelLimitOrder({ dexId, base, quote }, orderId),
      this.root.account.pair,
      {
        type: Operation.OrderBookCancelLimitOrder,
        assetAddress: base,
        asset2Address: quote,
        limitOrderIds: [orderId],
      }
    );
  }

  /**
   * Cancel several limit orders at once
   * @param base base orderbook asset ID
   * @param quote quote orderbook asset ID
   * @param orderIds array ids
   */
  public cancelLimitOrderBatch(base: string, quote: string, orderIds: number[]): Promise<T> {
    const dexId = this.root.dex.getDexId(quote);

    return this.root.submitExtrinsic(
      this.root.api.tx.orderBook.cancelLimitOrdersBatch([[{ dexId, base, quote }, orderIds]]),
      this.root.account.pair,
      {
        type: Operation.OrderBookCancelLimitOrders,
        assetAddress: base,
        asset2Address: quote,
        limitOrderIds: orderIds,
      }
    );
  }

  public serializedKey(base: string, quote: string): string {
    if (!(base && quote)) return '';
    return `${base},${quote}`;
  }

  public deserializeKey(key: string): Partial<{ base: string; quote: string }> {
    if (!key) return null;
    const [base, quote] = key.split(',');
    return { base, quote };
  }

  /**
   * Returns the network fee for orderBook.placeLimitOrder. Should be executed during each timestamp change.
   *
   * It won't be called frequently cuz the timestamp will be managed by the datepicker.
   */
  public async getPlaceOrderNetworkFee(timestamp = MAX_TIMESTAMP): Promise<CodecString> {
    const tx = this.root.api.tx.orderBook.placeLimitOrder(
      { dexId: DexId.XOR, base: XOR.address, quote: XOR.address },
      0,
      0,
      PriceVariant.Buy,
      timestamp
    );

    return await this.root.getTransactionFee(tx);
  }
}
