import { api } from '@sora-substrate/util';

import { delay, withConnectedAccount } from './util';

async function main(): Promise<void> {
  await withConnectedAccount(async () => {
    const assetId = '0x0051e3d18281ce07299a00079d29e2c817dc1c9418bb4cfda6a7dc6832af6262';
    const sbtId = '0x003958e97b3053835992946d797d5d5392f73005ad62ba3ce93233a519275d41';

    // await api.extendedAssets.regulateAsset(assetId);

    const isAssetRegulated = await api.extendedAssets.isAssetRegulated(assetId);
    console.log('isAssetRegulated', isAssetRegulated);

    // await api.extendedAssets.issueSbt(
    //   'SBT',
    //   'sbt',
    //   'This is SBT for check',
    //   'bafybeig5ymwb7tsjgpzqyckkzhihnjm7gbw5chjamvymfwy2aityda3ufe/_WRR9729.jpg',
    //   'web3.com'
    // );

    await api.extendedAssets.bindRegulatedAssetToSBT(sbtId, assetId);

    const sbtMeta = await api.extendedAssets.getSbtMetaInfo(sbtId);
    console.log('sbtMeta', sbtMeta);

    await delay(100000);
  });
}

main()
  .catch(console.error)
  .finally(() => process.exit());
