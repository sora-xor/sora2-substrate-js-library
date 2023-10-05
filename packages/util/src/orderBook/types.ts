import { FPNumber } from '@sora-substrate/math';
import type { History } from '../BaseApi';

export enum OrderBookStatus {
  /**
   * All operations are allowed
   */
  Trade,

  /**
   * Users can place and cancel limit order, but trading is forbidden
   */
  PlaceAndCancel,

  /**
   * Users can only cancel their limit orders. Placement and trading are forbidden
   */
  OnlyCancel,

  /**
   * All operations with order book are forbidden. Current limit orders are
   * frozen and users cannot cancel them
   */
  Stop,
}

export type Side = 'Buy' | 'Sell';

export interface Value {
  isDivisible: boolean;
  inner: string;
}

export interface LimitOrder {
  readonly id: number;
  readonly owner: string;
  readonly side: Side;
  readonly price: Value;
  readonly originalAmount: Value;
  readonly amount: Value;
  readonly time: string;
  readonly lifespan: string;
  readonly expiresAt: string;
}

export interface OrderBook {
  readonly orderBookId: OrderBookId;
  readonly status: OrderBookStatus;
  readonly lastOrderId: number;
  readonly tickSize: FPNumber;
  readonly stepLotSize: FPNumber;
  readonly minLotSize: FPNumber;
  readonly maxLotSize: FPNumber;
}

export interface OrderBookId {
  dexId: number;
  base: string;
  quote: string;
}

export interface LimitOrderHistory extends History {
  price?: string;
  side?: Side;
  limitOrderTimestamp?: number;
  limitOrderIds?: number | number[];
}
