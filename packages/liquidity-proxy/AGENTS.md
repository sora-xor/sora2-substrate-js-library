# AGENT NOTES — `@sora-substrate/liquidity-proxy`

## Scope

- Pure TypeScript mirror of the SORA Liquidity Proxy pallet. Provides deterministic route building, quoting, and swap math without touching the network.
- Entrypoint (`src/index.ts`) re-exports consts, types, pallet helpers, and runtime flags so consumers can cherry-pick algorithms.

## Layout Highlights

- `src/consts.ts` & `src/types.ts` define liquidity source enums, error codes, and payload/result shapes.
- `src/utils.ts` collects numeric helpers (set operations, safe division) used across pallet modules.
- `src/runtime/index.ts` centralises runtime feature toggles (e.g., chameleon pool availability).
- `src/pallets/liquidityProxy/*` implements routing (`PathBuilder`, `smartSplit`, registries) and swap execution planning.
- Additional pallet mirrors live under `src/pallets/*`:
  - `dexApi.ts`, `poolXyk/*` expose pool state helpers.
  - `priceTools.ts`, `oracleProxy.ts`, `band.ts`, `xst.ts` cover price feeds.
  - `orderBook/*` represents order book liquidity sources.
  - `multicollateralBoundingCurvePool.ts` addresses XST/USD conversions.

## Working Rules

- Stay deterministic—no side effects or network calls. Consumers wire the calculations into higher-level SDK flows.
- When parity with on-chain logic is needed, cross-check the referenced Rust pallet (link in `README.md`) and update both constants and helper math here.
- Any new liquidity source should register through `LiquidityRegistry` and supply test vectors in the SDK or downstream application.
