console.log('TEST IMPORT')
import { ApiPromise } from '@polkadot/api';
import { WsProvider } from '@polkadot/rpc-provider';
import { options } from '@sora-neo-substrate/api';
import { Keyring } from '@polkadot/api';
import { strictEqual, ok } from 'assert';


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
        } else {
          console.log("Transaction success.")
        }
      });

      unsub();
      finishCallback();
    }
  });
}

async function submitExtrinsic(api: ApiPromise, extrinsic: any, signer: any, debugMessage: String = ''): Promise<void> {
  console.log(`\nSubmit extrinsic: ${debugMessage}\n`);
  return new Promise((resolve, _reject) => {
    inner_submitExtrinsic(api, extrinsic, signer, resolve);
  });
}

function toAssetIdForRPC(assetId: any): string {
  return assetId.data.toString();
}


async function main(): Promise<void> {
  console.log('TEST MAIN FUNCTION');
  const provider = new WsProvider('ws://localhost:19744/');
  const api = new ApiPromise(options({ provider }));
  await api.isReady;

  console.log('STARTED CALLING');

  const keyring = new Keyring({ type: 'sr25519' });
  const alice = keyring.addFromUri('//Alice', { name: 'Alice default' });

  const XORAssetId = api.createType('AssetId', '0x0200000000000000000000000000000000000000000000000000000000000000');
  const AnotherAssetId = api.createType('AssetId', '0x0200000000000000000000000000000000000000000000000000000000000001');

  // Check general requests

  const info = await api.query.dexManager.dEXInfos(0);
  strictEqual((info as any).base_asset_id.toString(), XORAssetId.toString());
  strictEqual((info as any).default_fee.toString(), '30');
  strictEqual((info as any).default_protocol_fee.toString(), '0');

  const info2 = await (api.derive as any).dexManager.dexInfo(0);
  strictEqual(info2.default_fee.toString(), '30');

  const ids = await (api.rpc as any).dexManager.listDEXIds();
  strictEqual(ids[0].toString(), '0');


  // Check client calculations

  const manualCreate = api.createType('Fixed', '1050000000000000000');
  strictEqual(manualCreate.toString(), '1050000000000000000');

  const doubled = await (api.rpc as any).template.testMultiply2("1050000000000000000");
  ok(doubled.isSome);
  strictEqual(doubled.unwrap().amount.toString(), '2100000000000000000');

  // Check Constants

  const cur = api.consts.currencies.nativeCurrencyId;
  console.assert(cur.toString(), '1050000000000000000');

  // Check Extrinsics:

  await submitExtrinsic(api, api.tx.tradingPair.register(0, XORAssetId, AnotherAssetId), alice, 'Register Trading Pair');

  await submitExtrinsic(api, api.tx.mockLiquiditySource.testAccess(0, AnotherAssetId), alice, 'Mock Pool Test Access');

  await submitExtrinsic(api, api.tx.mockLiquiditySource.setReserve(0, AnotherAssetId, "5000000000000000000", "7000000000000000000"), alice, "Set Reserves on Mock Pool");

  const price2 = await (api.rpc as any).dexApi.quote(0, "MockPool", toAssetIdForRPC(XORAssetId), toAssetIdForRPC(AnotherAssetId), "1050000000000000000", "WithDesiredInput");
  ok(price2.isSome);

  const res1 = await (api.rpc as any).dexApi.canExchange(0, "MockPool", toAssetIdForRPC(XORAssetId), toAssetIdForRPC(AnotherAssetId));
  ok(res1);

  const res2 = await (api.rpc as any).tradingPair.listEnabledPairs(0);
  strictEqual(toAssetIdForRPC(res2[0].base_asset_id), toAssetIdForRPC(XORAssetId));
  strictEqual(toAssetIdForRPC(res2[0].target_asset_id), toAssetIdForRPC(AnotherAssetId));

  const res3 = await (api.rpc as any).tradingPair.isPairEnabled(0, toAssetIdForRPC(XORAssetId), toAssetIdForRPC(AnotherAssetId));
  ok(res3.isTrue);

  await submitExtrinsic(api, api.tx.dexapi.swap(0, "MockPool", XORAssetId, AnotherAssetId, "1000000000000000000", "0", "WithDesiredInput", api.createType("Option<AccountId>")), alice, "Exchange on Mock Pool");

  console.log('\nFINISHED CALLING');
}

main().catch(console.error).finally(() => process.exit());
