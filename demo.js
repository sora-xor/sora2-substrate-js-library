console.log('TEST IMPORT')
const { ApiPromise } = require('@polkadot/api');
const { WsProvider } = require('@polkadot/rpc-provider');
const { options } = require('@sora-substrate/api');
const { Keyring } = require('@polkadot/api');

async function main() {
  console.log('TEST MAIN FUNCTION');
  const provider = new WsProvider('ws://localhost:19744/');
  const api = new ApiPromise(options({ provider }));
  await api.isReady;

  console.log('STARTED CALLING');

  const [a, b] = await api.query.mockLiquiditySource.reserves(0, 1);
  console.log(a.toHuman());
  console.log(b.toHuman());

  const info = await api.query.dexManager.dEXInfos(0);
  console.log(info.toHuman());

  const info2 = await api.derive.dexManager.dexInfo(0);
  console.log(info2.default_fee.toString());

  const ids = await api.rpc.dexManager.listDEXIds();
  console.log(ids.toHuman());

  const cur = api.consts.currencies.nativeCurrencyId;
  console.log(cur.toHuman());

  // Searching for correct attribute names, which are renamed in runtime
  // console.log(api.query)

  const keyring = new Keyring({ type: 'sr25519' });
  const alice = keyring.addFromUri('//Alice', { name: 'Alice default' });

  // this is quick example, refer to https://polkadot.js.org/docs/api/cookbook/tx and https://polkadot.js.org/docs/api/start/api.tx.subs
  const unsub = await api.tx.mockLiquiditySource.testAccess(0, 2).signAndSend(alice, (result) => {
    console.log(`Current status is ${result.status}`);

    if (result.status.isInBlock) {
      console.log(`Transaction included at blockHash ${result.status.asInBlock}`);
    } else if (result.status.isFinalized) {
      console.log(`Transaction finalized at blockHash ${result.status.asFinalized}`);

      result.events.forEach(({ phase, event: { data, method, section } }) => {
        console.log(`\t' ${phase}: ${section}.${method}:: ${data}`);
        if (section === 'system' && method === 'ExtrinsicFailed') {
          const [error, info] = data;
          if (error.isModule) {
            // for module errors, we have the section indexed, lookup
            const decoded = api.registry.findMetaError(error.asModule);
            const { documentation, method, section } = decoded;

            console.log(`${section}.${method}: ${documentation.join(' ')}`);
          } else {
            // Other, CannotLookup, BadOrigin, no extra info
            console.log(error.toString());
          }
        } else {
          console.log("Transaction success.")
        }
      });

      unsub();
    }
  });

  console.log('FINISHED CALLING');
}

main()
