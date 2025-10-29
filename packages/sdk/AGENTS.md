# AGENT NOTES — `@sora-substrate/sdk`

## Role In The Stack

- High-level façade for wallet / Polkaswap clients. Composes connection handling, Polkadot.js API configuration, liquidity math, and pallet-specific helpers in one consumable API (`src/api.ts`).
- `Api` extends `BaseApi` and wires domain modules (`swap`, `assets`, `bridgeProxy`, `staking`, etc.) that each live in subdirectories under `src/`.

## Structure Overview

- `src/BaseApi.ts` contains shared connection, keyring, and storage plumbing. Anything common across modules belongs here.
- Domain modules (e.g., `src/assets`, `src/swap`, `src/poolXyk`) encapsulate pallet-specific logic. They usually expose a `<Name>Module` class that receives the root `Api` instance.
- Barrel (`src/index.ts`) ensures side-effect imports register consts/types before exporting public modules and types.
- Shared glue:
  - `src/storage.ts` defines the persistence abstraction used by `Api` and modules.
  - `src/typeOverrides.ts` / `src/types.ts` host SDK-level type helpers and history item shapes.
  - `src/http.ts` encapsulates fetch wrappers for off-chain services (price endpoints, etc.).

## Best Practices

- Instantiate via `const api = new Api(); await api.initConnection(endpoint); await api.initialize();` so that modules have connection + storage context.
- Always reuse the `Connection` class from `@sora-substrate/connection` for network handling; do not embed raw `WsProvider` usage inside modules.
- When adding a new pallet module:
  1. Define any missing type definitions in `@sora-substrate/type-definitions`/`types`.
  2. Add module folder under `src/`, exporting a `<Foo>Module`.
  3. Register side-effect imports and property wiring inside `src/index.ts` and `src/api.ts`.
  4. Document the module here so consumers know it exists.

## Testing & Examples

- Use `yarn example <scenario>` to execute sample flows in `scripts/examples/*.ts`; they import from this SDK.
- Module-specific tests typically reside next to the consuming app, but add Jest suites under `tests/` when covering tricky logic (e.g., quoting, sorting).
