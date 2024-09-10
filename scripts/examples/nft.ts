import fetch from 'node-fetch';
import { api } from '@sora-substrate/sdk';
import { SORA_ENV } from '@sora-substrate/types/scripts/consts';

import { withConnectedAccount, delay } from './util';

enum IpfsProviders {
  Pinata = 'pinata',
  Dweb = 'dweb',
  NFTStorage = 'nftstorage',
  Default = 'ipfs.io',
}

type IpfsProvider = {
  type: IpfsProviders;
  fn: (link: string) => string;
};

const IPFS_PREFIX = 'https://ipfs.io/ipfs/';
const PINATA_PREFIX = 'https://gateway.pinata.cloud/ipfs/';
const DWEB_SUFFIX = '.ipfs.dweb.link/';
const NFTSTORAGE_SUFFIX = '.ipfs.nftstorage.link/';

function getIpfsUrl(link: string): string {
  return IPFS_PREFIX + link;
}

/** Alternative url if `getIpfsUrl` does't work */
function getNftstorageUrl(link: string): string {
  const [path, name] = link.split('/');
  return `https://${path}${NFTSTORAGE_SUFFIX}${name}`;
}

/** Alternative url if `getIpfsUrl` does't work */
function getDwebUrl(link: string): string {
  const [path, name] = link.split('/');
  return `https://${path}${DWEB_SUFFIX}${name}`;
}

/** Alternative url if `getIpfsUrl` does't work */
function getPinataUrl(link: string): string {
  return PINATA_PREFIX + link;
}

const Providers: IpfsProvider[] = [
  { type: IpfsProviders.Pinata, fn: getPinataUrl },
  { type: IpfsProviders.Dweb, fn: getDwebUrl },
  { type: IpfsProviders.NFTStorage, fn: getNftstorageUrl },
  { type: IpfsProviders.Default, fn: getIpfsUrl },
];

async function tryRequestImage(link: string): Promise<string | null> {
  for (const { fn } of Providers) {
    try {
      const path = fn(link);
      const response = await fetch(path, { timeout: 5_000 });
      if (response.ok) {
        await response.blob();
        return path;
      }
    } catch (error) {
      // do nothing
    }
  }
  return null;
}

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
    console.info('_______________________________\nChecking NFTs content (pinata, dweb, nftstorage, ipfs.io)...');
    const brokenNfts: { assetId: string; nft: string }[] = [];
    for (const [assetId, nft] of Object.entries(nfts)) {
      console.info('_______________________________\nChecking NFT:', assetId);
      const path = await tryRequestImage(nft);
      await delay(1_000); // 1 sec to avoid any limit
      if (!path) {
        console.error(`BROKEN IPFS CONTENT: asset=${assetId}, path=${nft}`);
        brokenNfts.push({ assetId, nft });
      } else {
        console.info(`SUCCESS: asset=${assetId}, path=${path}`);
      }
    }
    console.info('_______________________________\nAll NFTs are checked');
    if (brokenNfts.length) {
      console.info('_______________________________\nBROKEN NFTs total:', brokenNfts.length);
      console.info('_______________________________\nBROKEN NFTs:', brokenNfts);
    }
  }, SORA_ENV.prod);
}

main()
  .catch(console.error)
  .finally(() => process.exit());
