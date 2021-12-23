import { api, connection } from '@sora-substrate/util';

async function delay(): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 40000));
}

async function main(): Promise<void> {
  const nftSymbol = 'NFTRTX';
  const nftName = 'NFTName';

  await connection.open('wss://ws.framenode-3.s3.dev.sora2.soramitsu.co.jp');

  api.initialize();

  api.importAccount(
    'salon muscle select culture inform pen typical object fox fruit culture civil',
    'name',
    'namename'
  );

  await api.registerAsset(nftSymbol, nftName, '150', false, {
    isNft: true,
    content: 'link',
    description: 'description'
  });
  await delay();

  console.log(`accountHistory`, api.accountHistory);

  const assets = await api.getAssets();

  const nftAsset = assets.find(asset => asset.symbol === nftSymbol);
  console.log(`nftAsset`, nftAsset);

  console.log(`api.getNftContent()`, await api.getNftContent(nftAsset.address));
  console.log(`api.getNftDesc()`, await api.getNftDescription(nftAsset.address));

  await connection.close();
}

main()
  .catch(console.error)
  .finally(() => process.exit());
