# SoraNeo-substrate-js-library
SoraNeo-substrate-js-library (This repository is managed by Terraform!)

### Requirements
* node version at least v14.14.0

### Prepare
```
yarn install
yarn build
```

### Run local test net first
change dir to SoraNeo-substrate repos dir
compile parachain
run local test net

for example with script
```
./scripts/localtestnet.sh -s
```

### Run tests
```
yarn test
```
or
```
node -r ts-node/register -r tsconfig-paths/register demo.js
```
