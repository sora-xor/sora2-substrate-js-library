import { bandQuote } from './band';

import type { QuotePayload, OracleRate } from '../types';

export const oracleProxyQuote = (symbol: string, payload: QuotePayload): OracleRate => {
  return bandQuote(symbol, payload);
};
