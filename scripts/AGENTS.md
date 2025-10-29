# AGENT NOTES — `scripts/`

## Contents

- `transfers.ts` — batch transfer CLI referenced in `scripts/README.md`. Run via `yarn transfers`; expects a CSV (see `example.csv`) and interactive prompts for endpoint, mnemonic, cosigners, and threshold.
- `verifyPoolAccountGeneration.ts` — utility for validating pool account derivation logic; executed with `yarn verify-pool-account-gen`.
- `examples/` — collection of runnable SDK recipes (add liquidity, swap, bridge flows, etc.). Invoked with `yarn example <name>` or `yarn demo` for `demo.ts`.
- `checkDependencyHealth.js` — automation behind `yarn health:deps`; surfaces major dependency upgrades across all workspaces and fails CI when present.
- `README.md` — operational instructions for the transfer script; update it alongside code changes.

## Usage Notes

- All scripts assume the repository has been built (`yarn build`) so compiled JS exists under `packages/*/build`.
- Example scripts import from `@sora-substrate/sdk`; they are safe sandboxes for new flows. Create new examples under `scripts/examples/` and document the entry name in this file.
- Override defaults with env vars: `SORA_ENV` to pick the target cluster, `SORA_WS_PROVIDER` for ad-hoc WebSocket URLs (used by `yarn demo`), and `SORA_MNEMONIC` to switch the seed phrase.
- Scripts run against live endpoints by default. When targeting local nodes, pass the appropriate WebSocket endpoint at the prompt.
