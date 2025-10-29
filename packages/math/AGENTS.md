# AGENT NOTES — `@sora-substrate/math`

## Purpose

- Centralised fixed-point arithmetic utilities for the SORA ecosystem. Everything funnels through the `FPNumber` class defined in `src/index.ts`.
- Wraps `bignumber.js` to guarantee consistent precision, rounding, and string formatting across packages.

## Key Concepts

- `FPNumber.fromNatural`, `fromCodecValue`, and static constants (`ZERO`, `TEN`, etc.) normalise conversions between raw chain values and human-readable numbers.
- Static comparison helpers (`lt`, `lte`, `gt`, `gte`, `eq`) exist to keep relational logic consistent; prefer them over manual BigNumber comparisons.
- Configuration knobs (`DEFAULT_PRECISION`, `DEFAULT_DECIMAL_PLACES`, `DEFAULT_ROUND_MODE`) are global; change with care because they impact liquidity math and SDK quotes.

## Testing

- Regression coverage for fixed-point operations lives at `tests/math/fp.spec.ts`. Extend that file when adding new operations or changing defaults.
