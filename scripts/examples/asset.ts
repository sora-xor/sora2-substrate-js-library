import { FPNumber, api } from '@sora-substrate/util';

import { delay, withConnectedAccount } from './util';

async function main(): Promise<void> {
  await withConnectedAccount(async () => {
    console.info('RegisterAsset fee', FPNumber.fromCodecValue(api.NetworkFee.RegisterAsset).toString());
    console.info('Transfer fee', FPNumber.fromCodecValue(api.NetworkFee.Transfer).toString());
    console.info('XorlessTransfer fee', FPNumber.fromCodecValue(api.NetworkFee.XorlessTransfer).toString());
    console.info('Mint fee', FPNumber.fromCodecValue(api.NetworkFee.Mint).toString());
    console.info('Burn fee', FPNumber.fromCodecValue(api.NetworkFee.Burn).toString());

    let assets = await api.assets.getAssets();
    console.info('Assets length:', assets.length);

    const tokenSymbol = 'OWNER3';
    await api.assets.register(tokenSymbol, 'OWNER3 Test Token', 10, false, true, {
      content: 'Test content',
      description: 'Test description',
    });

    await delay();

    console.info('Account History:', api.historyList);

    assets = await api.assets.getAssets();
    console.info('Assets length:', assets.length);

    const token = assets.find((asset) => asset.symbol === tokenSymbol);
    console.info(`${tokenSymbol} was found:`, token);

    if (!token) return;

    let supply = FPNumber.fromCodecValue(await api.assets.getAssetSupply(token.address), token.decimals).toString();
    console.info('Supply:', supply);

    console.info('Burn 10 (should be done successfully)');
    await api.assets.burn(token, 10);

    await delay();

    console.info('Account History:', api.historyList);

    supply = FPNumber.fromCodecValue(await api.assets.getAssetSupply(token.address)).toString();
    console.info('Supply', supply);

    console.info('Mint 10 (should fail)');
    await api.assets.mint(token, 10);

    await delay();

    console.info('Account History', api.historyList);

    supply = FPNumber.fromCodecValue(await api.assets.getAssetSupply(token.address)).toString();
    console.info('Supply', supply);
  });
}

main()
  .catch(console.error)
  .finally(() => process.exit());
