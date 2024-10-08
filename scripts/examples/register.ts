import { api } from '@sora-substrate/sdk';

import { delay, withConnectedAccount } from './util';

async function main(): Promise<void> {
  await withConnectedAccount(async () => {
    // Register MYTOKEN token with 200 extensible sypply.
    // You, as token owner, can mint this token any time.
    const tokenSymbol = 'MYTOKEN';
    await api.assets.register(tokenSymbol, 'My Test Token', 200, true);
    // Register NFTTKN nft token
    const nftSymbol = 'NFTTKN';
    await api.assets.register(nftSymbol, 'My NFT Token', 1, false, true, {
      content: 'link_to_nft_content',
      description: 'Some description of this NFT',
    });

    await delay();

    console.log('Account History', api.historyList);

    const assets = await api.assets.getAssets();

    const token = assets.find((asset) => asset.symbol === tokenSymbol);
    const nftToken = assets.find((asset) => asset.symbol === nftSymbol);

    console.log(`${tokenSymbol} was found:`, token);
    console.log(`${nftSymbol} was found:`, nftToken);
  });
}

main()
  .catch(console.error)
  .finally(() => process.exit());
