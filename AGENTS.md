# AGENT NOTES

## Mission Profile

- Monorepo of SORA Substrate utilities that wrap the Polkadot.js API, surface pallet-specific helpers, and expose generated type metadata for the SORA network.
- Yarn v1 workspaces; every publishable package lives under `packages/`.
- Node 20.8.1+ is required (see `README.md`) because generated TypeScript depends on modern runtime features.
- TypeScript uses `moduleResolution: nodenext`; prefer `.ts` extension imports when authoring new source files.

## Operational Map

- `packages/` contains workspace packages. See `packages/AGENTS.md` for package-by-package roles, test entry points, and publishing expectations.
- `scripts/` houses operational tooling (`yarn transfers`, `yarn example <name>`) plus reference CSV/sample flows; details in `scripts/AGENTS.md`.
- `tests/` collects Jest suites that exercise the math helpers and connection manager; guidance in `tests/AGENTS.md`.
- `doc.md` is generated API documentation (`yarn generate:docs`); `packages/types/src/metadata` stores exported chain metadata from `yarn export-types:<env>`.

## Common Commands

- Build everything before running scripts: `yarn` → `yarn build`.
- Type export workflow: `yarn export-types:test|stage|prod` (writes JSON into `packages/types/src/metadata`).
- Jest coverage: `yarn test:all`.
- Example runner: `yarn example swap` executes `scripts/examples/swap.ts`; `yarn demo` runs `demo.ts`.
- Dependency health check: `yarn health:deps` (fails CI on outstanding major upgrades).

## Contribution Guidance

- Prefer extending existing packages rather than adding new ones; reuse the shared Polkadot API configuration from `@sora-substrate/api` and connection lifecycle utilities from `@sora-substrate/connection`.
- When adding a new on-chain pallet helper, mirror the pattern in `packages/type-definitions` (type definitions) and `packages/types` (bundle wiring) before exposing high-level helpers in `packages/sdk`.
- Update the relevant AGENTS file whenever you introduce a new workflow, script, or package so automation-aware contributors have up-to-date instructions.
