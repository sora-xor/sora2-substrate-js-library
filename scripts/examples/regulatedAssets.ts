import { api } from '@sora-substrate/util';

import { delay, withConnectedAccount } from './util';

async function main(): Promise<void> {
  await withConnectedAccount(async () => {
    // const assetId = '0x00e52f543cda7265f88ef0934304942fad057e51243e5714a2989b691719b01d';

    // await api.regulatedAssets.getSbtMetaInfo(assetId);

    // const isRegulated = await api.regulatedAssets.isAssetRegulated(assetId);
    // console.log('isRegulated', isRegulated);

    // const allSbtIds = await api.regulatedAssets.getAllSbtIds();

    await api.regulatedAssets.givePrivilege(
      '0x00502bddfd0a25c7ba6c606c7e2526c520e2ec50e04242a6d30e19080bd5fdbf',
      'cnUaaC2q8z1SFkZcPNDQ38maLVFhuNeuZeFQnUCRLEM8FvMs4'
    );

    // const symbol = 'SBT';
    // const name = 'SoulBoundToken';
    // const allowedAssets = [
    //   '0x0200000000000000000000000000000000000000000000000000000000000000',
    //   '0x0200040000000000000000000000000000000000000000000000000000000000',
    // ]; // xor, val
    // const description = 'This is SB token to use';

    // await api.regulatedAssets.issueSbt(symbol, name, allowedAssets, description);

    await delay(100000);
  });
}

main()
  .catch(console.error)
  .finally(() => process.exit());
