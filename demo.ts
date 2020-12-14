import { ApiPromise } from '@polkadot/api';
import { WsProvider } from '@polkadot/rpc-provider';
import { options } from '@sora-substrate/api';
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

async function main(): Promise<void> {
  console.log('TEST MAIN FUNCTION');
  const provider = new WsProvider('ws://localhost:19744/');
  const api = new ApiPromise(options({ provider }));
  await api.isReady;

  console.log('STARTED CALLING');

  const keyring = new Keyring({ type: 'sr25519' });
  const root = keyring.addFromUri('//Alice', { name: 'Root' });
  const user_a = keyring.addFromUri('//Bob', { name: 'UserA' });
  // not a secret, specifically generated mnemonic for this demo
  const user_b = keyring.addFromMnemonic('shield shed shallow chase peace blade erosion poem health foil federal cushion', { name: 'UserB' });

  console.log(root.address.toString());
  return;

  // Creating types is not necessary, they will be automatically created if string is passed directly into function.
  const XORAssetId = api.createType('AssetId', '0x0200000000000000000000000000000000000000000000000000000000000000');
  const DOTAssetId = api.createType('AssetId', '0x0200010000000000000000000000000000000000000000000000000000000000');
  const KSMAssetId = api.createType('AssetId', '0x0200020000000000000000000000000000000000000000000000000000000000');
  const USDAssetId = api.createType('AssetId', '0x0200030000000000000000000000000000000000000000000000000000000000');
  const VALAssetId = api.createType('AssetId', '0x0200040000000000000000000000000000000000000000000000000000000000');

  // Check general requests

  const info = await api.query.dexManager.dEXInfos(0);
  strictEqual((info as any).base_asset_id.toString(), XORAssetId.toString());
  strictEqual((info as any).default_fee.toString(), '30');
  strictEqual((info as any).default_protocol_fee.toString(), '0');

  const info2 = await (api.derive as any).dexManager.dexInfo(0);
  strictEqual(info2.default_fee.toString(), '30');

  const ids = await (api.rpc as any).dexManager.listDEXIds();
  strictEqual(ids[0].toString(), '0');

  // Assets

  const nativeCurrency = await api.consts.currencies.nativeCurrencyId;
  console.log("Native Currency: ", nativeCurrency.toString());

  const assetIds = await (api.rpc as any).assets.listAssetIds();
  console.log("Asset Ids on chain: ", assetIds.toString());

  const assetInfos = await (api.rpc as any).assets.listAssetInfos();
  console.log("Infos for assets on chain: ", assetInfos.toString());

  const assetInfo = await (api.rpc as any).assets.getAssetInfo(DOTAssetId);
  console.log("Info for particular asset", assetInfo.toString());

  const nativeTotal = await (api.rpc as any).assets.totalBalance(user_a.address, XORAssetId);
  if (nativeTotal.isSome) { // Option<Type> should be properly checked before unwrapping
    console.log("UserA XOR TOTAL ", nativeTotal.unwrap().balance.toString());
  }

  const nativeFreeBBefore = await (api.rpc as any).assets.freeBalance(user_b.address, XORAssetId);
  console.log("UserB XOR FREE ", nativeFreeBBefore.unwrap().balance.toString());

  const rootXor1 = await (api.rpc as any).assets.freeBalance(root.address, XORAssetId);
  console.log("Root XOR (System) ", rootXor1.unwrap().balance.toString());

  await submitExtrinsic(api, api.tx.assets.mint(DOTAssetId, user_b.address, '3000000000000000000'), root, "Mint 3 DOT to UserB");
  await submitExtrinsic(api, api.tx.assets.mint(XORAssetId, user_b.address, '340282366920938463463374607431768211455'), root, "Mint Max Possible XOR to UserB (for fees)");

  const rootXor2 = await api.query.system.account(root.address);
  console.log("Root XOR FREE (System) ", rootXor2.data.free.toString());

  const nonNativeFreeBAfter = await (api.rpc as any).assets.freeBalance(user_b.address, DOTAssetId);
  console.log("UserB DOT FREE ", nonNativeFreeBAfter.unwrap().balance.toString());

  const nonNativeFreeRootBefore = await (api.rpc as any).assets.freeBalance(user_b.address, DOTAssetId);
  console.log("Root DOT FREE ", nonNativeFreeRootBefore.unwrap().balance.toString());

  // currently doesn't work
  // const payment_info = await api.tx.assets.transferTo(DOTAssetId, root.address, '500000000000000000').paymentInfo(user_b.address);
  // // log relevant info, partialFee is Balance, estimated for current
  // console.log(`
  //   class=${payment_info.class.toString()},
  //   weight=${payment_info.weight.toString()},
  //   partialFee=${payment_info.partialFee.toHuman()}
  // `);

  await submitExtrinsic(api, api.tx.assets.transfer(DOTAssetId, root.address, '500000000000000000'), user_b, "Transfer 0.5 DOT from UserB to Root");

  const nonNativeFreeBAfter2 = await (api.rpc as any).assets.freeBalance(user_b.address, DOTAssetId);
  console.log("UserB DOT FREE ", nonNativeFreeBAfter2.unwrap().balance.toString());

  const nonNativeFreeRootAfter = await (api.rpc as any).assets.freeBalance(user_b.address, DOTAssetId);
  console.log("Root DOT FREE ", nonNativeFreeRootAfter.unwrap().balance.toString());

  await submitExtrinsic(api, api.tx.assets.burn(DOTAssetId, '300000000000000000'), root, "Burn 0.3 DOT from Root");

  const nonNativeFreeRootAfter2 = await (api.rpc as any).assets.freeBalance(user_b.address, DOTAssetId);
  console.log("Root DOT FREE ", nonNativeFreeRootAfter2.unwrap().balance.toString());

  // Check client calculations

  const manualCreate = api.createType('Fixed', '1050000000000000000');
  strictEqual(manualCreate.toString(), '1050000000000000000');

  const doubled = await (api.rpc as any).template.testMultiply2("1050000000000000000");
  ok(doubled.isSome);
  strictEqual(doubled.unwrap().amount.toString(), '2100000000000000000');

  // Check Constants

  const native_cur = api.consts.currencies.nativeCurrencyId;
  console.assert(native_cur.toString(), '1050000000000000000');
  console.log(native_cur.toString());

  // Check Extrinsics:

  await submitExtrinsic(api, api.tx.tradingPair.register(0, XORAssetId, DOTAssetId), root, 'Register Trading Pair');

  await submitExtrinsic(api, api.tx.mockLiquiditySource.testAccess(0, DOTAssetId), root, 'Mock Pool Test Access');

  await submitExtrinsic(api, api.tx.mockLiquiditySource.setReserve(0, DOTAssetId, "5000000000000000000", "7000000000000000000"), root, "Set Reserves on Mock Pool");

  const price2 = await (api.rpc as any).dexApi.quote(0, "MockPool", XORAssetId, DOTAssetId, "1050000000000000000", "WithDesiredInput");
  ok(price2.isSome);

  const res1 = await (api.rpc as any).dexApi.canExchange(0, "MockPool", XORAssetId, DOTAssetId);
  ok(res1);

  const res2 = await (api.rpc as any).tradingPair.listEnabledPairs(0);
  strictEqual(res2[0].base_asset_id.toString(), XORAssetId.toString());
  strictEqual(res2[0].target_asset_id.toString(), DOTAssetId.toString());

  const res3 = await (api.rpc as any).tradingPair.isPairEnabled(0, XORAssetId, DOTAssetId);
  ok(res3.isTrue);

  await submitExtrinsic(api, api.tx.dexapi.swap(0, "MockPool", XORAssetId, DOTAssetId, "1000000000000000000", "0", "WithDesiredInput", api.createType("Option<AccountId>")), root, "Exchange on Mock Pool");

  console.log('\nFINISHED CALLING');
}

// main().catch(console.error).finally(() => process.exit());

async function demo(): Promise<void> {
  console.log('TEST MAIN FUNCTION');
  const provider = new WsProvider('ws://localhost:9944/');
  const api = new ApiPromise(options({ provider }));
  await api.isReady;

  console.log('STARTED CALLING');

  const keyring = new Keyring({ type: 'sr25519' });
  const root = keyring.addFromUri('//Alice', { name: 'Root' });
  const user_a = keyring.addFromUri('//Bob', { name: 'UserA' });
  // not a secret, specifically generated mnemonic for this demo
  const user_b = keyring.addFromMnemonic('shield shed shallow chase peace blade erosion poem health foil federal cushion', { name: 'UserB' });

  console.log(root.address.toString());

  // Creating types is not necessary, they will be automatically created if string is passed directly into function.
  const XORAssetId = api.createType('AssetId', '0x0200000000000000000000000000000000000000000000000000000000000000');
  const DOTAssetId = api.createType('AssetId', '0x0200010000000000000000000000000000000000000000000000000000000000');
  const KSMAssetId = api.createType('AssetId', '0x0200020000000000000000000000000000000000000000000000000000000000');
  const USDAssetId = api.createType('AssetId', '0x0200030000000000000000000000000000000000000000000000000000000000');
  const VALAssetId = api.createType('AssetId', '0x0200040000000000000000000000000000000000000000000000000000000000');

  // register pair
  await submitExtrinsic(api, api.tx.tradingPair.register(0, XORAssetId, DOTAssetId), root, "Enable Pair XOR-DOT");

  // // init pool
  await submitExtrinsic(api, api.tx.poolXyk.initializePool(0, XORAssetId, DOTAssetId), root, "Initialize Pool for Pair XOR-DOT");

  // // mint xor and dot for account
  await submitExtrinsic(api, api.tx.assets.mint(XORAssetId, user_b.address, "105000000000000000000000000000000000"), root, "Mint XOR for User B");
  await submitExtrinsic(api, api.tx.assets.mint(DOTAssetId, user_b.address, "144000000000000000000000000000000000"), root, "Mint DOT for User B");

  // // add liquidity
  await submitExtrinsic(api, api.tx.poolXyk.depositLiquidity(0, XORAssetId, DOTAssetId, "1000000000000000000", "1000000000000000000", "0", "0"), user_b, "Add liquidity from User B");

  // // check balances
  let balanceX = await (api.rpc as any).assets.freeBalance(user_b.address, XORAssetId);
  console.log("User B XOR FREE: ", balanceX.unwrap().balance.toString());
  let balanceD = await (api.rpc as any).assets.freeBalance(user_b.address, DOTAssetId);
  console.log("User B DOT FREE: ", balanceD.unwrap().balance.toString());
  // check pool balance
  // exchange
  let quoted_result = await (api.rpc as any).liquidityProxy.quote(0, XORAssetId, DOTAssetId, "1000000000000000000", "WithDesiredInput", [], "Disabled");
  console.log("Quoted exchange DOT: ", quoted_result.unwrap().amount.toString());
  console.log("Quoted exchange FEE: ", quoted_result.unwrap().fee.toString());
  // check balances
  await submitExtrinsic(api, api.tx.liquidityProxy.swap(0, XORAssetId, DOTAssetId, { WithDesiredInput: { desired_amount_in: "1000000000000000000", min_amount_out: "0" } }, [], "Disabled"), user_b, "User B swaps");
  // // check pool balance
  let balance2 = await (api.rpc as any).assets.freeBalance(user_b.address, DOTAssetId);
  console.log("User B DOT FREE: ", balance2.unwrap().balance.toString());
}

demo().catch(console.error).finally(() => process.exit());