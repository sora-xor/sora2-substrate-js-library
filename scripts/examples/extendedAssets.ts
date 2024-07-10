import { api } from '@sora-substrate/util';

import { delay, withConnectedAccount } from './util';

async function main(): Promise<void> {
  await withConnectedAccount(async () => {
    const assetId = '0x00ad9559393c1c154c3da5fd2f0280fb701a0fac23d4f35b65643236ff4254d5';
    const sbtId = '0x0023e888d25c3451585bdf75e75ec44be448bdc88ac10aae084a7d26ba8c78d0';
    const accountId = 'cnUaaC2q8z1SFkZcPNDQ38maLVFhuNeuZeFQnUCRLEM8FvMs4';

    await api.extendedAssets.regulateAsset(assetId);

    const isAssetRegulated = await api.extendedAssets.isAssetRegulated(assetId);
    console.log('isAssetRegulated', isAssetRegulated);

    await api.extendedAssets.issueSbt(
      'SBT',
      'sbt',
      'this is sbt to check',
      'bafybeig5ymwb7tsjgpzqyckkzhihnjm7gbw5chjamvymfwy2aityda3ufe/_WRR9729.jpg',
      'web3.com'
    );

    await api.extendedAssets.bindRegulatedAssetToSBT(sbtId, assetId);

    const sbtMeta = await api.extendedAssets.getSbtMetaInfo(sbtId);
    console.log('sbtMeta', sbtMeta);

    const expDate = await api.extendedAssets.getSbtExpiration(
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
