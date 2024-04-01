# sora-substrate-js-library

sora-substrate-js-library

### Requirements

- node version at least v20.8.1

### Prepare

```
yarn
yarn build
```

### Export types as JSON

`yarn build`
`yarn export-types` (for the local node) OR `yarn export-types:all` (for all environments)

Resulting JSON is located in:

- `<repo root>/packages/types/src/metadata/types.json`
- `<repo root>/packages/types/src/metadata/<env>/types.json`

### Export node api as markdown document

`yarn generate-doc`

Resulting MD is located in `<repo root>/doc.md`

### Run local test net with framenode first

> This library version should be compatible with **develop** branch of **sora2-substrate** chain.

Build & Run local test net, e.g. via script:

```
cargo build --release
./run_script.sh
```

**or use provided testnet endpoints**

### Tests

```
yarn test:all
```

### Demo

```
yarn example <fileName from scripts/examples>
```

or

```
yarn demo
```
