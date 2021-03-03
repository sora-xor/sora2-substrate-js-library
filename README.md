# sora-substrate-js-library
sora-substrate-js-library (This repository is managed by Terraform!)

### Requirements
* node version at least v14.14.0

### Prepare
```
yarn install
yarn build
```
additionally to get latest definitions for extrinsics, state queries and consts:\
(local test net should be running)
```
yarn pull-metadata
yarn build
```

### Export types as JSON
```
yarn build
yarn export-types
```
Resulting JSON is located in `<repo root>/packages/types/src/metadata/types.json`

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
yarn test
```
or
```
node -r ts-node/register -r tsconfig-paths/register demo.ts
```
