console.log('TEST IMPORT')
const { ApiPromise } = require('@polkadot/api');
const { WsProvider } = require('@polkadot/rpc-provider');
const { options } = require('@sora-neo-substrate/api');

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

  // Searching for correct attribute names, which are renamed in runtime
  // for (attr in api.query) {
  //   console.log(attr);
  // }

  // TODO: signed transaction submit demo

  console.log('FINISHED CALLING');
}

main().catch(console.error).finally(() => process.exit());
