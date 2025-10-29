# AGENT NOTES — `packages/`

## Workspace Expectations

- Independent-version Yarn workspaces managed by Lerna (`lerna.json`). Version bumps run through `yarn bump-version` (patch) or `yarn set-version` (manual).
- Each package compiles TypeScript into its local `build/` directory via the shared `yarn build` pipeline.
- Keep package entry points minimal; surface only what higher-level consumers (notably `@sora-substrate/sdk`) need.

## Package Guide

- `@sora-substrate/api` — wraps Polkadot.js ApiPromise instantiation with SORA-specific type bundles (`src/index.ts`). Consumed by SDK and scripts to ensure consistent chain settings.
- `@sora-substrate/connection` — connection lifecycle manager that mediates WebSocket providers, retries, and event listeners (`src/index.ts`). Tests live in `tests/connection/index.test.ts`.
- `@sora-substrate/liquidity-proxy` — pure helper library mirroring the Liquidity Proxy pallet logic (`src/pallets/*`). Used for off-chain quoting; relies on math helpers and shared type definitions.
- `@sora-substrate/math` — fixed-point helpers (`src/index.ts`) used across liquidity and SDK packages. Jest expectations in `tests/math/fp.spec.ts`.
- `@sora-substrate/sdk` — user-facing façade that composes API, connection, math, and pallet-specific utilities (`src/**`). Organised by domain (assets, dex, poolXyk, etc.); prefer contributing new functionality here once lower layers exist.
- `@sora-substrate/type-definitions` — strongly typed representations of SORA pallets for Polkadot.js (`src/*.ts`). Source for generated interfaces consumed by `@sora-substrate/types`.
- `@sora-substrate/types` — wires definitions into Polkadot.js type bundles and contains metadata exports under `src/metadata`. Build outputs feed `@sora-substrate/api`.

## When Adding A Package

- Create `package.json` mirroring existing format (`name` scoped to `@sora-substrate/*`, `main`/`typings` pointing at `build/`).
- Register new type definitions under `type-definitions` first if they introduce chain primitives, then plumb them through `types` before exposing in higher layers.
- Add or update AGENTS notes so downstream agents know entry points, scripts, and tests for the new module.
