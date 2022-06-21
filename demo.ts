import { ApiPromise } from '@polkadot/api';
import { WsProvider } from '@polkadot/rpc-provider';
import { options } from '@sora-substrate/api';
import { Keyring } from '@polkadot/api';
import { CommonPrimitivesAssetId32 } from '@polkadot/types/lookup';

async function demo(): Promise<void> {
  console.log('INITIALIZING API');

  // NOTE: replace to use relevant endpoint: 'ws://localhost:9944/' for local, wss://ws.address.of.chain:9944/ for testnet
  const provider = new WsProvider('ws://localhost:9944/');
  const api = new ApiPromise(options({ provider }));
  await api.isReady;

  console.log('API IS READY, STARTING DEMO CALLS');

  const keyring = new Keyring({ type: 'sr25519' });
  // NOTE: replace to use specific keys
  const root = keyring.addFromUri('//Alice', { name: 'Root' });
  // const user_a = keyring.addFromUri('//Bob', { name: 'UserA' });
  // not a secret, specifically generated mnemonic for this demo
  const user_b = keyring.addFromMnemonic(
    'shield shed shallow chase peace blade erosion poem health foil federal cushion',
    { name: 'UserB' }
  );

  console.log(root.address.toString());

  // Creating types is not necessary, they will be automatically created if string is passed directly into function.
  const XORAssetId = api.createType(
    'AssetId',
    '0x0200000000000000000000000000000000000000000000000000000000000000'
  ) as unknown as CommonPrimitivesAssetId32;
  const VALAssetId = api.createType(
    'AssetId',
    '0x0200040000000000000000000000000000000000000000000000000000000000'
  ) as unknown as CommonPrimitivesAssetId32;
  const PSWAPAssetId = api.createType(
    'AssetId',
    '0x0200050000000000000000000000000000000000000000000000000000000000'
  ) as unknown as CommonPrimitivesAssetId32;
  const DAIAssetId = api.createType('AssetId', '0x0200060000000000000000000000000000000000000000000000000000000000');

  // register pair
  await submitExtrinsic(api, api.tx.tradingPair.register(0, XORAssetId, PSWAPAssetId), root, 'Enable Pair XOR-DOT');

  // initialize pool
  await submitExtrinsic(
    api,
    api.tx.poolXYK.initializePool(0, XORAssetId, PSWAPAssetId),
    root,
    'Initialize Pool for Pair XOR-DOT'
  );

  // mint xor and dot for account
  await submitExtrinsic(
    api,
    api.tx.assets.mint(XORAssetId, user_b.address, '105000000000000000000000000000000000'),
    root,
    'Mint XOR for User B'
  );
  await submitExtrinsic(
    api,
    api.tx.assets.mint(PSWAPAssetId, user_b.address, '144000000000000000000000000000000000'),
    root,
    'Mint DOT for User B'
  );

  // add liquidity
  await submitExtrinsic(
    api,
    api.tx.poolXYK.depositLiquidity(
      0,
      XORAssetId,
      PSWAPAssetId,
      '1000000000000000000',
      '2000000000000000000',
      '0',
      '0'
    ),
    user_b,
    'Add liquidity from User B'
  );

  // check balances
  let balanceX = await (api.rpc as any).assets.freeBalance(user_b.address, XORAssetId);
  console.log('User B XOR FREE: ', balanceX.unwrap().balance.toString());
  let balanceD = await (api.rpc as any).assets.freeBalance(user_b.address, PSWAPAssetId);
  console.log('User B DOT FREE: ', balanceD.unwrap().balance.toString());

  let claimables = await (api.rpc as any).rewards.claimables('21Bc9f4a3d9Dc86f142F802668dB7D908cF0A636').toString();
  console.log(claimables);

  // get the liquidity sources list for path via liquidity proxy
  let listEnabledSourcesForPath = (
    await (api.rpc as any).liquidityProxy.listEnabledSourcesForPath(0, XORAssetId, VALAssetId)
  ).toJSON();
  console.log(`listEnabledSourcesForPath ${XORAssetId} -> ${VALAssetId}`, listEnabledSourcesForPath);

  // get the price via liquidity proxy
  let quoted_result = await (api.rpc as any).liquidityProxy.quote(
    0,
    DAIAssetId,
    XORAssetId,
    '1000000000000000000',
    'WithDesiredInput',
    [],
    'Disabled'
  );
  console.log('Quoted exchange DOT: ', quoted_result.unwrap().amount.toString());
  console.log('Quoted exchange FEE: ', quoted_result.unwrap().fee.toString());
  console.log('Quoted exchange rewards: ', quoted_result.unwrap().rewards.toJSON());

  // perform swap via liquidity proxy
  await submitExtrinsic(
    api,
    api.tx.liquidityProxy.swap(
      0,
      XORAssetId,
      PSWAPAssetId,
      { WithDesiredInput: { desired_amount_in: '1000000000000000000', min_amount_out: '0' } },
      [],
      'Disabled'
    ),
    user_b,
    'User B swaps'
  );

  // check user_b balance
  let balance2 = await (api.rpc as any).assets.freeBalance(user_b.address, PSWAPAssetId);
  console.log('User B DOT FREE: ', balance2.unwrap().balance.toString());
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
          const [error] = data;
          if (error.isModule) {
            const decoded = api.registry.findMetaError(error.asModule);
            const { docs, name, section } = decoded;
            console.log(`${section}.${name}: ${docs.join(' ')}`);
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

demo()
  .catch(console.error)
  .finally(() => process.exit());
