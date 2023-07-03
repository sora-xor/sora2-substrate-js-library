export enum OrderBookStatus {
  // All operations are allowed
  Trade,

  // Users can place and cancel limit order, but trading is forbidden
  PlaceAndCancel,

  // Users can only cancel their limit orders. Placement and trading are forbidden
  OnlyCancel,

  // All operations with order book are forbidden. Current limit orders are frozen
  // and users cannot cancel them
  Stop,
}
