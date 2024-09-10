import { FPNumber, api, axiosInstance } from '@sora-substrate/sdk';

import { delay, withConnectedAccount } from './util';
import { PSWAP, VAL, XOR } from '@sora-substrate/sdk/assets/consts';

async function main(): Promise<void> {
  await withConnectedAccount(async () => {
    const assets = [XOR, VAL, PSWAP];
    for (const asset of assets) {
      const supplyA = FPNumber.fromCodecValue(await api.assets.getAssetSupply(asset.address), asset.decimals);
      const supplyB = new FPNumber(
        (await axiosInstance.get('https://mof.sora.org/qty/' + asset.symbol.toLowerCase())).data,
        asset.decimals
      );
      const diff = supplyA.sub(supplyB);
      const absDiff = diff.isLtZero() ? FPNumber.ZERO : diff;
      console.info('SYMBOL:', asset.symbol);
      console.info('Total supply:', supplyA.toString());
      console.info('Circulating supply:', supplyB.toString());
      console.info('DIFF:', absDiff.toString());
      console.info('________________________');
    }
  }, 'wss://mof3.sora.org');
}

main()
  .catch(console.error)
  .finally(() => process.exit());
