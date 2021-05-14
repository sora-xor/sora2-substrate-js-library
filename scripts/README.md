# Batch Transfers Script

### Requirements
* node version at least v14.14.0

### Prepare
```
yarn --update-checksums
yarn build
```
**CSV files for VAL or/and PSWAP tokens** should be located in `scripts` directory.

### How to use
```
yarn transfers
```

After run this script you should set the following params like:

- endpoint, which will be used as a connection to SORA network. For example, `wss://ws.sora2.soramitsu.co.jp`.
If you want to use SORA Mainnet, just press "Enter"

- CSV file names for VAL or/and PSWAP tokens without the extension

- 12 words mnemonic seed
