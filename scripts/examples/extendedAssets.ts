import { api } from '@sora-substrate/util';

import { delay, withConnectedAccount } from './util';

async function main(): Promise<void> {
  await withConnectedAccount(async () => {
    const assetId1 = '0x002115b295ba9da6a18707f39287b1497f605c43649530a7361ccd7675e3aa8b';
    const assetId2 = '0x0051e3d18281ce07299a00079d29e2c817dc1c9418bb4cfda6a7dc6832af6262';
    const sbtId = '0x008967a08c9f151b9632b2d9f69b37425d1bcd58a3be0366b426db426003292f';
    const accountId = '';

    // const sbtAdresses = await api.extendedAssets.getAllSbtIds();

    // await api.extendedAssets.regulateAsset(assetId);

    // await api.extendedAssets.issueSbt(
    //   'SBT',
    //   'sbt',
    //   'this is sbt to check',
    //   'bafybeig5ymwb7tsjgpzqyckkzhihnjm7gbw5chjamvymfwy2aityda3ufe/_WRR9729.jpg',
    //   'web3.com'
    // );

    await api.extendedAssets.bindRegulatedAssetToSBT(sbtId, [assetId1]);

    // const sbtMeta = await api.extendedAssets.getSbtMetaInfo(sbtId);
    // console.log('sbtMeta', sbtMeta);

    // const timestamp = await api.extendedAssets.getSbtExpiration(
    //   'cnVDcsDK6cvS6VBP36SbwM3GhQQWe9kxzZEgfqSRABRoCfn79',
    //   sbtId
    // );

    // const sbtAsset = await api.assets.getAssetInfo(sbtId);
    // console.log('sbtAsset', sbtAsset);
    // await api.extendedAssets.givePrivilege(accountId, sbtAsset, 1720671542);

    // api.extendedAssets.revokePrivilege('', sbtId);

    await delay(100000);
  });
}

main()
  .catch(console.error)
  .finally(() => process.exit());
