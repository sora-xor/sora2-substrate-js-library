# sora-substrate-js-library
sora-substrate-js-library (This repository is managed by Terraform!)

### Requirements
* node version at least v14.14.0

### Prepare
```
yarn install
yarn build
```
also to get latest definitions for extrinsics, state queries and consts:\
(local test net should be running)
```
yarn pull-metadata
```

### Run local test net with parachain first

> This library version should be compatible with **develop** branch of **SoraNeo-substrate** parachain.

Build & Run local test net, e.g. via script:
```
./scripts/localtestnet.sh -s
```

### Tests
```
yarn test
```
or
```
node -r ts-node/register -r tsconfig-paths/register demo.ts
```
