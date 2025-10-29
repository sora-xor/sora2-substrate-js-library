# AGENT NOTES — `tests/`

## Structure

- Jest suites grouped by domain:
  - `connection/index.test.ts` — verifies `@sora-substrate/connection` lifecycle (timeouts, event wiring).
  - `math/fp.spec.ts` — exercises `FPNumber` arithmetic and edge cases.
  - `api/rpc.integration.test.ts` — mocks the RPC layer with `MockProvider` to ensure `@sora-substrate/api` consumes local type bundles without touching live nodes.

## Running

- Use `yarn test` for local runs, `yarn test:all` for build + coverage (required before publishing).
- Tests rely on compiled artifacts in `packages/*/build`, so run `yarn build` first when executing in a clean workspace.

## Adding Coverage

- Place new suites alongside the package they test (mirroring the folder structure). Keep filenames aligned with Jest glob defaults (`*.test.ts` / `*.spec.ts`).
- Mock network calls or Polkadot.js APIs; live node dependencies should stay in example scripts instead of automated tests.
