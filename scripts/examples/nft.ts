import { AxiosError } from 'axios';
import { api, axiosInstance } from '@sora-substrate/util';
import { SORA_ENV } from '@sora-substrate/types/scripts/consts';

import { withConnectedAccount } from './util';

const IPFS_GATEWAY = 'https://ipfs.io/ipfs/';

async function main(): Promise<void> {
  await withConnectedAccount(async () => {
    console.info('_______________________________\nGetting assets...');
    const assets = await api.assets.getAssets();
    console.info('_______________________________\nTotal assets:', assets.length);
    const nftsArray = assets.filter((asset) => !!asset.content);
    console.info('_______________________________\nTotal NFTs:', nftsArray.length);
    const nfts = nftsArray.reduce<Record<string, string>>((acc, asset) => {
      acc[asset.address] = asset.content;
      return acc;
    }, {});
    console.info('_______________________________\nNFTs:', nfts);
    console.info('_______________________________\nChecking NFTs content...');
    for (const [assetId, nft] of Object.entries(nfts)) {
      const path = IPFS_GATEWAY + nft;
      try {
        await axiosInstance.get(path);
      } catch (e) {
        const error = e as AxiosError;
        console.error(
          `_______________________________\nBROKEN IPFS CONTENT: asset=${assetId}, path=${path}`,
          error.response?.status,
          error.response?.statusText
        );
      }
    }
    console.info('_______________________________\nAll NFTs are checked');
  }, SORA_ENV.prod);
}

main()
  .catch(console.error)
  .finally(() => process.exit());
