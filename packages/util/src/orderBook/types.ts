import type { FPNumber } from '@sora-substrate/math';
import type { OrderBookId, PriceVariant } from '@sora-substrate/liquidity-proxy';

import type { History } from '../BaseApi';

export interface LimitOrder {
  readonly orderBookId: OrderBookId;
  readonly id: number;
  readonly owner: string;
  readonly side: PriceVariant;
  readonly price: FPNumber | string;
  readonly originalAmount: FPNumber;
  readonly amount: FPNumber | string;
  readonly time: number;
  readonly lifespan: number;
  readonly expiresAt: number;
}

export interface LimitOrderHistory extends History {
  orders?: Array<Partial<LimitOrder>>;
  orderId?: number;
}
