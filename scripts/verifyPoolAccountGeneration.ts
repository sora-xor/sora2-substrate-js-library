import { api, connection } from '@sora-substrate/util';
import { poolAccountIdFromAssetPair } from '@sora-substrate/util/poolXyk/account';

async function main(): Promise<void> {
  await connection.open('wss://ws.mof.sora.org');
  await api.initialize();

  let baseAsset = api.api.createType('AssetId', '0x0200000000000000000000000000000000000000000000000000000000000000');
  let properties = await api.api.query.poolXYK.properties.entries(baseAsset as unknown as string);
  for (let entry in properties) {
    const targetAsset = api.api.createType('AssetId', properties[entry][0].slice(-32)).toString();
    const actualAccount = properties[entry][1].toJSON()[0].toString();
    const generatedAccount = poolAccountIdFromAssetPair(api, baseAsset, targetAsset).toString();
    console.log(targetAsset, actualAccount, generatedAccount, actualAccount == generatedAccount ? 'OK' : 'ERROR');
    if (actualAccount != generatedAccount) {
      throw new Error('Found pool account mismatch!');
    }
  }
  console.log('All accounts are OK');
}

main()
  .catch(console.error)
  .finally(() => process.exit());
