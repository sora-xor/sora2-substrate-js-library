# Upgrade Roadmap

This document captures the remaining work items around the toolchain + dependency upgrade. Use the checkboxes to track progress as follow‑ups land.

## Phase 1 — Stabilise Core Toolchain

- [x] Bump repo dependencies to latest and restore green `yarn build`, `yarn test`, `yarn test:all`.
- [x] Silence Polkadot API metadata warning spam during Jest runs by filtering logger output in Jest setup.
- [x] Add CI job that exercises the new TS composite builds (e.g. `yarn build` + `yarn test:all`) so regressions are caught automatically.

## Phase 2 — Polish Type Generation & Packages

- [x] Replace relative `../../../../type-definitions/src/*` imports in generated interface files with a helper alias or path mapping to keep diffs small on regeneration.
- [x] Teach the `generate:defs:*` scripts to drop the intermediate `.d.ts`/`.js` outputs from git automatically (post-run clean).
- [x] Validate that downstream packages consuming `@sora-substrate/types` survive the `.ts` interface export change (sample: wallet, liquidity services).

## Phase 3 — Runtime & Test Hardening

- [x] Review `tests/math/fp.spec.ts` tolerance expectations after the BigNumber bump (consider switching to `toBeCloseTo` for irrational comparisons).
- [x] Investigate long-lived timers in connection tests so Jest stops reporting forced worker shutdowns.
- [x] Verify demo scripts (`yarn demo`, `yarn example swap`) against the upgraded SDK; update READMEs with any changed behaviours.

## Phase 4 — Wishlist / Nice-to-haves

- [x] Adopt native ESM output (`moduleResolution: nodenext`) once tooling supports it end-to-end; drop CommonJS specific shims at that point.
- [x] Automate dependency health checks (e.g. `yarn npm-check-updates --doctor`) so future major bumps have early alerts.
- [x] Add integration coverage exercising Polkadot RPCs via mocked providers to avoid flakey WS connections in unit tests.
