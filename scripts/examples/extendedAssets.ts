import { api } from '@sora-substrate/util';

import { delay, withConnectedAccount } from './util';

async function main(): Promise<void> {
  await withConnectedAccount(async () => {
    const assetId1 = '';
    const assetId2 = '';
    const sbtId = '';
    const accountId = '';

    const sbtAdresses = await api.extendedAssets.getAllSbtIds();

    await api.extendedAssets.regulateAsset(assetId1);

    await api.extendedAssets.issueSbt(
      'SBT',
      'sbt',
      'this is sbt to check',
      'bafybeig5ymwb7tsjgpzqyckkzhihnjm7gbw5chjamvymfwy2aityda3ufe/_WRR9729.jpg',
      'web3.com',
      [assetId1, assetId2]
    );

    await api.extendedAssets.bindRegulatedAssetToSBT(sbtId, [assetId1, assetId2]);

    const sbtMeta = await api.extendedAssets.getSbtMetaInfo(sbtId);
    console.log('sbtMeta', sbtMeta);

    const timestamp = await api.extendedAssets.getSbtExpiration(
      'cnVDcsDK6cvS6VBP36SbwM3GhQQWe9kxzZEgfqSRABRoCfn79',
      sbtId
    );

    const sbtAsset = await api.assets.getAssetInfo(sbtId);
    console.log('sbtAsset', sbtAsset);
    await api.extendedAssets.givePrivilege(accountId, sbtAsset, 1720671542);

    api.extendedAssets.revokePrivilege('', sbtId);

    await delay(100000);
  });
}

main()
  .catch(console.error)
  .finally(() => process.exit());
