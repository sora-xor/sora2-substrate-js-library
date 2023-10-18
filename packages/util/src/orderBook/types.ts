import type { FPNumber } from '@sora-substrate/math';
import type { OrderBookId, PriceVariant } from '@sora-substrate/liquidity-proxy';

import type { History } from '../BaseApi';

export interface LimitOrder {
  readonly orderBookId: OrderBookId;
  readonly id: number;
  readonly owner: string;
  readonly side: PriceVariant;
  readonly price: FPNumber;
  readonly originalAmount: FPNumber;
  readonly amount: FPNumber;
  readonly time: number;
  readonly lifespan: number;
  readonly expiresAt: number;
}

export interface LimitOrderHistory extends History {
  price?: string;
  side?: PriceVariant;
  limitOrderTimestamp?: number;
  limitOrderIds?: number[];
}
