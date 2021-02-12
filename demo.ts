import { ApiPromise } from '@polkadot/api';
import { WsProvider } from '@polkadot/rpc-provider';
import { options } from '@sora-substrate/api';
import { Keyring } from '@polkadot/api';
import { strictEqual, ok } from 'assert';

async function demo(): Promise<void> {
  console.log('INITIALIZING API');

  // NOTE: replace to use relevant endpoint: 'ws://localhost:9944/' for local, wss://ws.address.of.chain:9944/ for testnet
  // const provider = new WsProvider('wss://ws.stage.sora2.soramitsu.co.jp');
  const provider = new WsProvider('ws://localhost:9944');
  const api = new ApiPromise(options({ provider }));
  await api.isReady;

  console.log('API IS READY, STARTING DEMO CALLS');

  const keyring = new Keyring({ type: 'sr25519' });
  // NOTE: replace to use specific keys
  const root = keyring.addFromUri('//Alice', { name: 'Root' });
  const user_a = keyring.addFromUri('//Bob', { name: 'UserA' });
  // not a secret, specifically generated mnemonic for this demo
  const user_b = keyring.addFromMnemonic('shield shed shallow chase peace blade erosion poem health foil federal cushion', { name: 'UserB' });

  // Creating types is not necessary, they will be automatically created if string is passed directly into function.
  const XORAssetId = api.createType('AssetId', '0x0200000000000000000000000000000000000000000000000000000000000000');
  const USDAssetId = api.createType('AssetId', '0x0200030000000000000000000000000000000000000000000000000000000000');
  const VALAssetId = api.createType('AssetId', '0x0200040000000000000000000000000000000000000000000000000000000000');
  const PSWAPAssetId = api.createType('AssetId', '0x0200050000000000000000000000000000000000000000000000000000000000');

  // Example to manually look up errors
  // const decoded = api.registry.findMetaError({ index: api.createType("u8", 2), error: api.createType("u8", 1) });
  // const { documentation, name, section } = decoded;
  // console.log(name, section, documentation);

  // register pair
  await submitExtrinsic(api, api.tx.tradingPair.register(0, XORAssetId, VALAssetId), root, "Enable Pair XOR-DOT");

  // initialize pool
  await submitExtrinsic(api, api.tx.poolXyk.initializePool(0, XORAssetId, VALAssetId), root, "Initialize Pool for Pair XOR-VAL");

  // check source existence
  let pairs = await (api.rpc as any).tradingPair.listEnabledSourcesForPair(0, XORAssetId, VALAssetId);
  logResult(api, pairs, "Should fail: ");

  let pairEnabled = await (api.rpc as any).tradingPair.isPairEnabled(0, XORAssetId, VALAssetId);
  logResult(api, pairEnabled, "IS XOR-VAL pair enabled");

  // mint xor and dot for account
  await submitExtrinsic(api, api.tx.assets.mint(XORAssetId, user_b.address, "105000000000000000000000000000000000"), root, "Mint XOR for User B");
  await submitExtrinsic(api, api.tx.assets.mint(VALAssetId, user_b.address, "144000000000000000000000000000000000"), root, "Mint DOT for User B");

  // add liquidity
  await submitExtrinsic(api, api.tx.poolXyk.depositLiquidity(0, XORAssetId, VALAssetId, "1000000000000000000", "2000000000000000000", "0", "0"), user_b, "Add liquidity from User B");

  // check balances
  let balanceX = await (api.rpc as any).assets.usableBalance(user_b.address, XORAssetId);
  logResult(api, balanceX, "User B XOR USABLE");
  let balanceD = await (api.rpc as any).assets.usableBalance(user_b.address, VALAssetId);
  logResult(api, balanceD, "User B DOT USABLE");

  // get the price via liquidity proxy
  let quoted_result = await (api.rpc as any).liquidityProxy.quote(0, XORAssetId, VALAssetId, "1000000000000000000", "WithDesiredInput", [], "Disabled");
  logResult(api, quoted_result, "Quote XOR-VAL 1.0");
  let quoted_result_2 = await (api.rpc as any).liquidityProxy.quote(0, VALAssetId, XORAssetId, "1000000000000000000", "WithDesiredInput", [], "Disabled");
  logResult(api, quoted_result_2, "Quote VAL-XOR 1.0");


  let quoted_result_inverse = await (api.rpc as any).liquidityProxy.quote(0, XORAssetId, VALAssetId, "998497746619929894", "WithDesiredOutput", [], "Disabled");
  logResult(api, quoted_result_inverse, "Quote XOR-VAL 1.0");
  let quoted_result_inverse_2 = await (api.rpc as any).liquidityProxy.quote(0, VALAssetId, XORAssetId, "332333333333333334", "WithDesiredOutput", [], "Disabled");
  logResult(api, quoted_result_inverse_2, "Quote VAL-XOR 1.0");

  // perform swap via liquidity proxy
  await submitExtrinsic(api, api.tx.liquidityProxy.swap(0, XORAssetId, VALAssetId, { WithDesiredInput: { desired_amount_in: "1000000000000000000", min_amount_out: "0" } }, [], "Disabled"), user_b, "User B swaps");

  // check user_b balance
  let balance2 = await (api.rpc as any).assets.freeBalance(user_b.address, VALAssetId);
  logResult(api, balance2, "User B DOT FREE");

}

async function inner_submitExtrinsic(api: ApiPromise, extrinsic: any, signer: any, finishCallback: any): Promise<void> {
  // this is quick example, refer to https://polkadot.js.org/docs/api/cookbook/tx and https://polkadot.js.org/docs/api/start/api.tx.subs
  const unsub = await extrinsic.signAndSend(signer, (result: any) => {
    console.log(`Current status is ${result.status}`);

    if (result.status.isInBlock) {
      console.log(`Transaction included at blockHash ${result.status.asInBlock}`);
    } else if (result.status.isFinalized) {
      console.log(`Transaction finalized at blockHash ${result.status.asFinalized}`);

      result.events.forEach(({ phase, event: { data, method, section } }: any) => {
        console.log(`\t' ${phase}: ${section}.${method}:: ${data}`);
        if (section === 'system' && method === 'ExtrinsicFailed') {
          const [error,] = data;
          if (error.isModule) {
            const decoded = api.registry.findMetaError(error.asModule);
            const { documentation, name, section } = decoded;
            console.log(`${section}.${name}: ${documentation.join(' ')}`);
          } else {
            // Other, CannotLookup, BadOrigin, no extra info
            console.log(error.toString());
          }
        }
      });

      unsub();
      finishCallback();
    }
  });
}

async function submitExtrinsic(api: ApiPromise, extrinsic: any, signer: any, debugMessage = ''): Promise<void> {
  console.log(`\nSubmit extrinsic: ${debugMessage}\n`);
  return new Promise((resolve, _reject) => {
    inner_submitExtrinsic(api, extrinsic, signer, resolve);
  });
}

function logError(api: ApiPromise, error, message = "", spacer = ": ") {
  if (error.isModule) {
    const decoded = api.registry.findMetaError(error.asModule);
    const { documentation, name, section } = decoded;
    console.log(`${message}${spacer}${section}.${name}: ${documentation.join(' ')}`);
  } else {
    // Other(message), CannotLookup, BadOrigin ...
    console.log(message + spacer, error.toString());
  }
}

function logResult(api: ApiPromise, result, message = "", spacer = ": ") {
  if (result.isErr) {
    logError(api, result.asErr, message, spacer);
  } else {
    console.log(message + spacer, result.asOk.toHuman());
  }
}

demo().catch(console.error).finally(() => process.exit());