# AGENT NOTES — `@sora-substrate/connection`

## What Lives Here

- Thin wrapper around `ApiPromise` + `WsProvider` lifecycle with retry, timeout, and event listener management (`src/index.ts`).
- Public surface: `Connection` class with `open`, `close`, `addEventListener`, and state flags (`api`, `opened`, `loading`).

## Key Behaviours

- `open(endpoint, { once, timeout, autoConnectMs, eventListeners })` supports one-shot connections (no auto reconnect) and injects pre-defined event handlers.
- `close()` tears down listeners and explicitly disconnects the underlying provider once the API is ready.
- Errors during `open` trigger `stop()` cleanup before rethrowing.

## Working With Tests

- Jest coverage in `tests/connection/index.test.ts` validates timeout handling and event registration. Update those tests when adjusting connection semantics.

## Extension Guidance

- Add new observable state as getters/setters to avoid leaking internal API objects.
- Keep environment configuration (endpoints, credentials) elsewhere—this module should stay focused on connection lifecycle only.
