# SoraNeo-substrate-js-library
SoraNeo-substrate-js-library (This repository is managed by Terraform!)

### Requirements
* node version at least v14.14.0

### Prepare
```
yarn install
yarn build
```

### Run local test net with parachain first

> This library version is compatible with **modbrin/initial-rpc** branch of **SoraNeo-substrate** parachain and further will be maintained to be compatible with develop branch.

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
node -r ts-node/register -r tsconfig-paths/register demo.js
```
