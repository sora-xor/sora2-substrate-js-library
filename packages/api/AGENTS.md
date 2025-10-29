# AGENT NOTES — `@sora-substrate/api`

## Primary Responsibilities

- Provide a single source of truth for ApiPromise configuration against the SORA chain (`src/index.ts`).
- Exposes `defaultOptions` (baseline `types`/`rpc`) and `options(customOverrides)` which merges caller overrides with SORA defaults, the ORML derives, and custom signed extensions.

## Usage Pattern

- Downstream code should call `options({ provider })` when instantiating a Polkadot.js `ApiPromise`.
- Keep SORA-specific wiring (`types`, `typesAlias`, `typesBundle`, custom `signedExtensions`) here, not in consumers.
- Dependencies: `@sora-substrate/types` for type bundles and `@open-web3/orml-api-derive` for derives.

## Maintenance Tips

- Whenever `@sora-substrate/types` exports new metadata/spec entries, ensure the merge logic in `options` still surfaces them (especially `typesBundle.spec.sora` overlays).
- If you add new signed extensions or RPC sections, document them and add minimal smoke tests in `tests/` to prevent regressions.
