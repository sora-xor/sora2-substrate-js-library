# AGENT NOTES — `@sora-substrate/type-definitions`

## Purpose

- Source-of-truth Polkadot.js type definitions for SORA pallets. Each `src/*.ts` file describes one pallet's custom types, RPC, and storage structs.
- Consumed by `@sora-substrate/types` to build bundles/interfaces and by the SDK when generating metadata-driven code.

## File Layout

- Per-pallet definition files (`assets.ts`, `dexApi.ts`, `liquidityProxy.ts`, etc.) export `types`, `rpc`, `alias`, and `bundle` fragments.
- `src/index.ts` aggregates all pallet definitions, merges them with ORML defaults, applies overrides, and constructs `types`, `rpc`, `typesAlias`, and versioned bundles.
- `src/versioned.ts` holds min/max runtime overrides for historical compatibility (fed into `slimOverrideBundle`/`fullOverrideBundle`).
- `src/types.ts` exports the `SoraDefinitions` helper type used during generation.

## Generation Workflow

- `yarn generate:defs:<env>` consumes these definitions to produce TypeScript interfaces under `packages/types/src/interfaces`.
- Keep definitions in sync with the on-chain runtime; when upstream pallets introduce new structs, update the relevant file here first.
- After editing, run `yarn build` to ensure `polkadot-types-from-defs` succeeds and adjust downstream modules if signatures changed.
