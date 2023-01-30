## Swap examples

### 1. Get swap data using RPC

Swap 1 XOR to VAL:

```
const { amount, fee, rewards } = api.swap.getResultFromBackned(
    '0x0200000000000000000000000000000000000000000000000000000000000000',
    '0x0200040000000000000000000000000000000000000000000000000000000000',
    '1',
    false,
    "", // selected liquidity source, if empty string - any source; otherwise
    0, // selected Dex ID
);
```

### 2. Get swap data using frontend subscriptions

Swap 1 XOR to VAL:

1. Subscribe on primary market assets (TBC, XST)

```
this.enabledAssetsSubscription = api.swap.subscribeOnPrimaryMarketsEnabledAssets().subscribe((enabledAssets) => {
    this.setEnabledAssets(enabledAssets); // save primary market asset
    this.subscribeOnSwapReserves(); // subscribe on dexes data
});
```

2. Subscribe on dexes data

```
subscribeOnSwapReserves(): void {
    this.cleanSwapReservesSubscription(); // clean subscription

    if (!this.areTokensSelected) return; // if tokens not selected, return

    this.loading = true;

    this.liquidityReservesSubscription = api.swap
        .subscribeOnAllDexesReserves(
            (this.tokenFrom as AccountAsset).address, // address of token A
            (this.tokenTo as AccountAsset).address, // address of token B
            this.enabledAssets, // primary market asset from step 1
            this.liquiditySource as LiquiditySourceTypes
        )
        .subscribe((results) => {
            // iterate over dexes
            results.forEach((result) => this.setSubscriptionPayload(result));
            this.runRecountSwapValues();
            this.loading = false;
        });
}

// action
setSubscriptionPayload(context, { dexId, payload }: { dexId: number; payload: QuotePayload }): void {
    const { state, getters, commit } = swapActionContext(context);

    const inputAssetId = getters.tokenFrom?.address;
    const outputAssetId = getters.tokenTo?.address;

    if (!(inputAssetId && outputAssetId && payload)) {
      return;
    }

    // tbc & xst is enabled only on dex 0
    const enabledAssets = dexId === DexId.XOR ? state.enabledAssets : { tbc: [], xst: [], lockedSources: [] };
    const baseAssetId = api.dex.getBaseAssetId(dexId);
    const syntheticBaseAssetId = api.dex.getSyntheticBaseAssetId(dexId);

    const { paths, liquiditySources } = getPathsAndPairLiquiditySources(
      payload,
      enabledAssets,
      baseAssetId,
      syntheticBaseAssetId
    );

    commit.setSubscriptionPayload({ dexId, liquiditySources, paths, payload });
},

// mutation
setSubscriptionPayload(
    state,
    {
      dexId,
      payload,
      paths,
      liquiditySources,
    }: { payload: QuotePayload; dexId: number; paths: QuotePaths; liquiditySources: Array<LiquiditySourceTypes> }
  ): void {
    state.dexQuoteData = {
      ...state.dexQuoteData,
      [dexId]: Object.freeze({
        payload,
        paths,
        pairLiquiditySources: liquiditySources,
      }),
    };
},
```

3. Find best swap result

```
private runRecountSwapValues(): void {
    const value = this.isExchangeB ? this.toValue : this.fromValue;

    if (!this.areTokensSelected || asZeroValue(value)) return;

    const setOppositeValue = this.isExchangeB ? this.setFromValue : this.setToValue;
    const resetOppositeValue = this.isExchangeB ? this.resetFieldFrom : this.resetFieldTo;
    const oppositeToken = (this.isExchangeB ? this.tokenFrom : this.tokenTo) as AccountAsset;

    const dexes = api.dex.dexList; // list of available Dexes

    try {
      const results = dexes.reduce<{ [dexId: number]: SwapResult }>((buffer, { dexId }) => {
        const swapResult = api.swap.getResult(
          this.tokenFrom as Asset,
          this.tokenTo as Asset,
          value,
          this.isExchangeB,
          [this.liquiditySource].filter(Boolean) as Array<LiquiditySourceTypes>,
          this.dexQuoteData[dexId].paths,
          this.dexQuoteData[dexId].payload as QuotePayload,
          dexId as DexId
        );

        return { ...buffer, [dexId]: swapResult };
      }, {});

      let bestDexId: number = DexId.XOR;

      for (const currentDexId in results) {
        const currAmount = FPNumber.fromCodecValue(results[currentDexId].amount);
        const bestAmount = FPNumber.fromCodecValue(results[bestDexId].amount);

        if (currAmount.isZero()) continue;

        if (
          (FPNumber.isLessThan(currAmount, bestAmount) && this.isExchangeB) ||
          (FPNumber.isLessThan(bestAmount, currAmount) && !this.isExchangeB)
        ) {
          bestDexId = +currentDexId;
        }
      }

      const { amount, amountWithoutImpact, fee, rewards, path } = results[bestDexId];

      setOppositeValue(this.getStringFromCodec(amount, oppositeToken.decimals));
      this.setAmountWithoutImpact(amountWithoutImpact as string);
      this.setLiquidityProviderFee(fee);
      this.setRewards(rewards);
      this.setPath(path as string[]);
      this.selectDexId(bestDexId);
    } catch (error: any) {
      console.error(error);
      resetOppositeValue();
    }
}
```
