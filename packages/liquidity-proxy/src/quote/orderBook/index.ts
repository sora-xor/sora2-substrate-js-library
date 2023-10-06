import { FPNumber } from '@sora-substrate/math';

import { isAssetAddress, safeQuoteResult, safeDivide, isGreaterThanZero } from '../../utils';
import { LiquiditySourceTypes, Errors, Consts, PriceVariant } from '../../consts';

import type { QuotePayload, QuoteResult } from '../../types';
import type { OrderBookId, OrderBook, OrderBookAggregated, OrderBookPriceAmount } from './types';

type DealInfo = {
  inputAsset: string;
  inputAmount: OrderAmount;
  outputAsset: string;
  outputAmount: OrderAmount;
  averagePrice: FPNumber;
  direction: PriceVariant;
};

enum OrderAmountType {
  Base = 'Base',
  Quote = 'Quote',
}

class OrderAmount {
  public type!: OrderAmountType;
  public value!: FPNumber;

  constructor(type: OrderAmountType, value: FPNumber) {
    this.type = type;
    this.value = value;
  }

  get isBase(): boolean {
    return this.type === OrderAmountType.Base;
  }

  get isQuote(): boolean {
    return this.type === OrderAmountType.Quote;
  }

  isSame(other: OrderAmount): boolean {
    return (this.isBase && other.isBase) || (this.isQuote && other.isQuote);
  }

  copyType(amount: FPNumber): OrderAmount {
    return new OrderAmount(this.type, amount);
  }

  associatedAsset(id: OrderBookId) {
    if (this.type === OrderAmountType.Base) {
      return id.base;
    } else {
      return id.quote;
    }
  }

  static averagePrice(input: OrderAmount, output: OrderAmount) {
    if (input.isQuote) {
      return safeDivide(input.value, output.value);
    } else {
      return safeDivide(output.value, input.value);
    }
  }

  add(other: OrderAmount) {
    if (!this.isSame(other)) throw new Error('');

    const result = this.value.add(other.value);
    return this.copyType(result);
  }

  sub(other: OrderAmount) {
    if (!this.isSame(other)) throw new Error('');

    const result = this.value.sub(other.value);
    return this.copyType(result);
  }
}

// assemble_order_book_id
const assembleOrderBookId = (baseAssetId: string, inputAsset: string, outputAsset: string): OrderBookId => {
  // trick
  const dexId = isAssetAddress(baseAssetId, Consts.XOR) ? 0 : 1;

  if (isAssetAddress(inputAsset, outputAsset)) return null;

  if (isAssetAddress(inputAsset, baseAssetId)) {
    return { dexId, base: outputAsset, quote: inputAsset };
  } else if (isAssetAddress(outputAsset, baseAssetId)) {
    return { dexId, base: inputAsset, quote: outputAsset };
  } else {
    return null;
  }
};

// get_direction
const getDirection = (book: OrderBookAggregated, inputAsset: string, outputAsset: string): PriceVariant => {
  const { base, quote } = book.orderBookId;

  if (isAssetAddress(base, outputAsset) && isAssetAddress(quote, inputAsset)) {
    return PriceVariant.Buy;
  }
  if (isAssetAddress(base, inputAsset) && isAssetAddress(quote, outputAsset)) {
    return PriceVariant.Sell;
  }

  throw new Error('Invalid Assets');
};

// [TODO] check
// align_amount
const alignAmount = (amount: FPNumber, book: OrderBook) => {
  const steps = safeDivide(amount, book.stepLotSize).dp(0);
  const aligned = steps.mul(book.stepLotSize);

  return aligned;
};

// sum_market
const sumMarket = (
  book: OrderBook,
  marketData: OrderBookPriceAmount[],
  depthLimit: OrderAmount | null
): [OrderAmount, OrderAmount] => {
  let marketBaseVolume = FPNumber.ZERO;
  let marketQuoteVolume = FPNumber.ZERO;
  let enoughLiquidity = false;

  for (const [price, baseVolume] of marketData) {
    let quoteVolume = price.mul(baseVolume);
    let limit = depthLimit;

    if (depthLimit) {
      if (limit.isBase) {
        let baseLimit = limit.value;
        if (FPNumber.isGreaterThan(marketBaseVolume.add(baseVolume), baseLimit)) {
          const delta = alignAmount(baseLimit.sub(marketBaseVolume), book);
          marketBaseVolume = marketBaseVolume.add(delta);
          marketQuoteVolume = marketQuoteVolume.add(price.mul(delta));
          enoughLiquidity = true;
          break;
        }
      } else {
        let quoteLimit = limit.value;
        if (FPNumber.isGreaterThan(marketQuoteVolume.add(quoteLimit), quoteLimit)) {
          const delta = alignAmount(safeDivide(quoteLimit.sub(marketQuoteVolume), price), book);
          marketBaseVolume = marketBaseVolume.add(delta);
          marketQuoteVolume = marketQuoteVolume.add(price.mul(delta));
          enoughLiquidity = true;
          break;
        }
      }
    }

    marketBaseVolume = marketBaseVolume.add(baseVolume);
    marketQuoteVolume = marketQuoteVolume.add(quoteVolume);
  }

  if (!(!depthLimit || enoughLiquidity)) {
    throw new Error(Errors.NotEnoughLiquidityInOrderBook);
  }

  return [
    new OrderAmount(OrderAmountType.Base, marketBaseVolume),
    new OrderAmount(OrderAmountType.Quote, marketQuoteVolume),
  ];
};

// calculate_deal
const calculateDeal = (
  book: OrderBookAggregated,
  inputAsset: string,
  outputAsset: string,
  amount: FPNumber,
  isDesiredInput: boolean
): DealInfo => {
  const direction = getDirection(book, inputAsset, outputAsset);
  const isBuyDirection = direction === PriceVariant.Buy;

  let base!: OrderAmount;
  let quote!: OrderAmount;

  if (isDesiredInput) {
    if (isBuyDirection) {
      [base, quote] = sumMarket(
        book,
        book.aggregated.asks,
        new OrderAmount(OrderAmountType.Quote, amount.dp(book.tickSize.precision))
      );
    } else {
      [base, quote] = sumMarket(
        book,
        book.aggregated.bids,
        new OrderAmount(OrderAmountType.Base, amount.dp(book.stepLotSize.precision))
      );
    }
  } else {
    if (isBuyDirection) {
      [base, quote] = sumMarket(
        book,
        book.aggregated.asks,
        new OrderAmount(OrderAmountType.Base, amount.dp(book.stepLotSize.precision))
      );
    } else {
      [base, quote] = sumMarket(
        book,
        book.aggregated.bids,
        new OrderAmount(OrderAmountType.Quote, amount.dp(book.tickSize.precision))
      );
    }
  }

  if (!(isGreaterThanZero(base.value) && isGreaterThanZero(quote.value))) {
    throw new Error(Errors.InvalidOrderAmount);
  }

  const [inputAmount, outputAmount] = isBuyDirection ? [quote, base] : [base, quote];

  const averagePrice = OrderAmount.averagePrice(inputAmount, outputAmount);

  return {
    inputAsset,
    inputAmount,
    outputAsset,
    outputAmount,
    averagePrice,
    direction,
  };
};

// quote
export const orderBookQuote = (
  baseAssetId: string,
  inputAsset: string,
  outputAsset: string,
  amount: FPNumber,
  isDesiredInput: boolean,
  payload: QuotePayload,
  _deduceFee = true
): QuoteResult => {
  try {
    const id = assembleOrderBookId(baseAssetId, inputAsset, outputAsset);

    if (!id) throw new Error(Errors.UnknownOrderBook);

    const orderBook = payload.reserves.orderBook[id.quote];

    if (!orderBook) throw new Error(Errors.UnknownOrderBook);

    const dealInfo = calculateDeal(orderBook, inputAsset, outputAsset, amount, isDesiredInput);

    // order-book doesn't take fee
    const fee = FPNumber.ZERO;

    if (isDesiredInput) {
      return {
        amount: dealInfo.outputAmount.value,
        fee,
        rewards: [],
        distribution: [
          {
            market: LiquiditySourceTypes.OrderBook,
            input: inputAsset,
            output: outputAsset,
            income: amount,
            outcome: dealInfo.outputAmount.value,
            fee,
          },
        ],
      };
    } else {
      return {
        amount: dealInfo.inputAmount.value,
        fee,
        rewards: [],
        distribution: [
          {
            market: LiquiditySourceTypes.OrderBook,
            input: inputAsset,
            output: outputAsset,
            income: dealInfo.inputAmount.value,
            outcome: amount,
            fee,
          },
        ],
      };
    }
  } catch {
    return safeQuoteResult(inputAsset, outputAsset, amount, LiquiditySourceTypes.OrderBook);
  }
};
