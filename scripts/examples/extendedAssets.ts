import { api } from '@sora-substrate/util';

import { delay, withConnectedAccount } from './util';

async function main(): Promise<void> {
  await withConnectedAccount(async () => {
    const assetId = '0x00d2121ea72fdd6d58f84ffda6d774c27b4dfcd0e4bd1e009f6fc2c3bc6e15f7';
    const sbtId = '0x00a8417ec4f1cd32e5d4ad8e5b95774f976adffb643cfa19ee7acf4f2743f7af';

    await api.extendedAssets.regulateAsset(assetId);

    const isAssetRegulated = await api.extendedAssets.isAssetRegulated(assetId);
    console.log('isAssetRegulated', isAssetRegulated);

    await api.extendedAssets.issueSbt('', '', '', '', '');

    await api.extendedAssets.bindRegulatedAssetToSBT(sbtId, assetId);

    const sbtMeta = await api.extendedAssets.getSbtMetaInfo(sbtId);
    console.log('sbtMeta', sbtMeta);

    api.extendedAssets.givePrivilege(sbtId, 'cnUXnonneSuLxGvue6unKK3Tmg26KxUABmpgARjvseCKbvtcP', 1720605154);

    api.extendedAssets.revokePrivilege('cnUPy2FsUiovqicx9Decf6dBrPAD9RcEDUxo9DWSbqkw1vtPR', sbtId);

    await delay(100000);
  });
}

main()
  .catch(console.error)
  .finally(() => process.exit());
