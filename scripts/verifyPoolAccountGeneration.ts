
import { ApiPromise } from '@polkadot/api';
import { WsProvider } from '@polkadot/rpc-provider';
import { options } from '@sora-substrate/api';
import { Keyring } from '@polkadot/api';
import { poolAccountIdFromAssetPair } from '@sora-substrate/util';

async function main(): Promise<void> {
  const provider = new WsProvider('wss://ws.mof.sora.org');
  const api = new ApiPromise(options({ provider }));
  await api.isReady;

  let baseAsset = api.createType('AssetId', '0x0200000000000000000000000000000000000000000000000000000000000000');
  let properties = await api.query.poolXyk.properties.entries(baseAsset);
  for (let entry in properties) {
    const targetAsset = api.createType("AssetId", properties[entry][0].slice(-32)).toString();
    const actualAccount = properties[entry][1].toJSON()[0].toString();
    const generatedAccount = poolAccountIdFromAssetPair(api, baseAsset, targetAsset).toString()
    console.log(targetAsset, actualAccount, generatedAccount, actualAccount == generatedAccount?'OK':'ERROR');
    if (actualAccount != generatedAccount) {
      throw new Error('Found pool account mismatch!');
    }
  }
  console.log("All accounts are OK");
}

main().catch(console.error).finally(() => process.exit());
