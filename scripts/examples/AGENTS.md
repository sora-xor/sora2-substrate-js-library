# AGENT NOTES — `scripts/examples/`

## Purpose

- Runnable reference scenarios showcasing how to use `@sora-substrate/sdk` modules end-to-end (swaps, liquidity management, NFT, bridge, staking, etc.).
- Acts as a cookbook for automation or manual testing; each file exports a default async function invoked by the example runner.

## Running Examples

- Use `yarn example <file-name>` (without extension). Example: `yarn example swap` executes `swap.ts`.
- `yarn demo` runs `demo.ts` at the repository root, which typically wires together multiple scenarios.

## Authoring Guidelines

- Stick to async main functions and wrap interactions in try/catch with informative logging so command-line users understand failures.
- Import the shared `Api` class from `@sora-substrate/sdk`; rely on `Api`'s `initialize` lifecycle before invoking module methods.
- When an example needs credentials or secrets, read them from environment variables or prompt the user—never hardcode.
- Update this file with a one-line description when adding a new scenario so agents know what coverage already exists.
