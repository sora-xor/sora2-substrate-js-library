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
