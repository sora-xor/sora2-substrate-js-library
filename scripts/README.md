# Batch Transfers Script

### Requirements

- node version at least v14.14.0

### Prepare

```
yarn
yarn build
```

**CSV file** should be located in `scripts` directory. It should have the following structure:

`Name`;`Address`;`Amount`;`Asset Id` OR `Asset Symbol` (XOR, VAL, PSWAP, XSTUSD are available)

There is a `example.csv` file located in `scripts` directory as an example.

### How to use

```
yarn transfers
```

After run this script you should set the following params like:

- CSV file name without the extension

- endpoint, which will be used as a connection to SORA network. For example, `wss://ws.sora2.soramitsu.co.jp`.
  If you want to use SORA Mainnet, just press "Enter"

- 12 words mnemonic seed

- co-signers account addresses (SORA address should start with cn) using "," between it. For instance:
  `cnVFiwzF3WPtnTpPc726d77MHcHEqbo1qRs589B5HLcwP2nse,cnToWyQbAUWygF6utv6vSqFfi6VKayKsvXEkbyLGKFBTRYbz8`

- threshold for MST account

- After all steps above please check all input data. If everything is OK, just press "Enter". Otherwise, you should terminate the script.
