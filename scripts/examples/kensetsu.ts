import { FPNumber, api } from '@sora-substrate/sdk';
import { SORA_ENV } from '@sora-substrate/types/scripts/consts';
import { DAI, KUSD, XOR } from '@sora-substrate/sdk/assets/consts';

import { withConnectedAccount, delay } from './util';

async function main(): Promise<void> {
  await withConnectedAccount(async () => {
    console.info('\n\nKensetsu Stats____________________________');
    const borrowTax = await api.kensetsu.getBorrowTax();
    console.info('borrowTax (%)', borrowTax.toLocaleString());
    const tbcdBorrowTax = await api.kensetsu.getTbcdBorrowTax();
    console.info('tbcdBorrowTax (%)', tbcdBorrowTax.toLocaleString());
    const karmaBorrowTax = await api.kensetsu.getKarmaBorrowTax();
    console.info('karmaBorrowTax (%)', karmaBorrowTax.toLocaleString());

    const stablecoinInfos = await api.kensetsu.getStablecoinInfos();
    console.info(
      'stablecoinInfos:\n',
      Object.entries(stablecoinInfos)
        .map(
          ([assetId, value]) =>
            `_____\n${assetId}:\nbadDebt:${value.badDebt.toString()}\npegAsset:${value.pegAsset}\nisSoraAsset:${value.isSoraAsset}`
        )
        .join('\n')
    );

    const cdpCount = await api.kensetsu.getCdpCount();
    console.info('cdpCount', cdpCount);

    const liquidationPenalty = await api.kensetsu.getLiquidationPenalty();
    console.info('liquidationPenalty (%)', liquidationPenalty);

    const collaterals = await api.kensetsu.getCollaterals();
    console.info('collaterals:assetIds', Object.keys(collaterals));

    const vaults = await api.kensetsu.getVaults();
    console.info(
      'vaults:ids',
      vaults.map(({ id }) => id)
    );

    const collateral = await api.kensetsu.getCollateral(XOR, KUSD);
    console.info('\n\nCollateral for XOR_______________________');
    console.info('collateral.interestCoefficient', collateral.interestCoefficient.toString());
    console.info('collateral.debtSupply (KUSD)', collateral.debtSupply.toString());
    console.info('collateral.totalLocked (XOR)', collateral.totalLocked.toString());
    console.info('collateral.lastFeeUpdateTimeSecs', collateral.lastFeeUpdateTimeSecs);
    console.info('collateral.riskParams.hardCap', collateral.riskParams.hardCap.toString());
    console.info('collateral.riskParams.maxLiquidationLot', collateral.riskParams.maxLiquidationLot.toString());
    console.info('collateral.riskParams.liquidationRatio (%)', collateral.riskParams.liquidationRatio);
    console.info('collateral.riskParams.liquidationRatioReversed (%)', collateral.riskParams.liquidationRatioReversed);
    console.info('collateral.riskParams.stabilityFeeSecs', collateral.riskParams.stabilityFeeSecs.toString());
    console.info(
      'collateral.riskParams.stabilityFeeSecs (%)',
      collateral.riskParams.stabilityFeeSecs.mul(100).toString()
    );
    console.info('collateral.riskParams.stabilityFeeAnnual (%)', collateral.riskParams.stabilityFeeAnnual.toString());
    console.info('collateral.riskParams.minDeposit (XOR)', collateral.riskParams.minDeposit.toString());

    const vault = vaults[0];
    console.info(`\n\nSelected Vault with ID=${vault.id}________________`);

    if (vault) {
      console.info('vault.lockedAssetId', vault.lockedAssetId);
      console.info('vault.owner', vault.owner);
      console.info('vault.id', vault.id);
      console.info('vault.lockedAmount', vault.lockedAmount.toString());
      console.info('vault.debt', vault.debt.toString());
      console.info('vault.interestCoefficient', vault.interestCoefficient.toString());
    }

    console.info('\n\nOther data_____________________________');

    const accountVaultIds = await api.kensetsu.getAccountVaultIds();
    console.info('Vault IDs for connected account:', accountVaultIds);

    const accountVaults = await api.kensetsu.getAccountVaults();
    console.info('Vaults for connected account: length =', accountVaults.length);

    let newCoeff = api.kensetsu.updateCollateralInterestCoefficient(collateral);
    console.info('calcNewCoeff for selected collateral', newCoeff.toString());
    let newDebt = api.kensetsu.calcNewDebt(collateral, vault);
    console.info('newDebt for selected vault', newDebt.toString());
    await delay(5_000);
    newCoeff = api.kensetsu.updateCollateralInterestCoefficient(collateral);
    console.info('calcNewCoeff for selected collateral (+ 5 seconds)', newCoeff.toString());
    newDebt = api.kensetsu.calcNewDebt(collateral, vault);
    console.info('newDebt for selected vault (+ 5 seconds)', newDebt.toString());

    console.info('\n\nVault Creation__________________________');
    console.info(`Network fee: ${FPNumber.fromCodecValue(api.NetworkFee.CreateVault).toString()} XOR`);

    console.info('\n\nCreating MST Account______________________');
    const secondAccountAddress = 'cnT3RCp1vihUWncRgHvFBz1ior5phHknTnNM3GUPpmtGnWHVW';
    const mainAccountAddress = api.accountPair.address; // Get main account address
    console.info(`Main account pair`, api.formatAddress(mainAccountAddress));
    const accounts = [mainAccountAddress, secondAccountAddress]; // List of signatories
    const threshold = 2; // Threshold for multisig
    const mstName = 'My MST Account';

    const mstAddress = api.mst.createMST(accounts, threshold, mstName);
    console.info('MST Account Address:', mstAddress);

    console.info('\n\nSwitching to MST Account__________________');
    api.mst.switchAccount(true); // Switch to MST account
    // api.mst.approveMultisigExtrinsic('0x0sd', 'cns');
    // const updateMainAccountSwitchedAfterMST = api.accountPair.address;
    // console.info(`updateMainAccountSwitchedAfterMST`, api.formatAddress(updateMainAccountSwitchedAfterMST));
    // console.info('previous account that is not the mst is', api.formatAddress(api.previousAccount.pair.address));
    await api.kensetsu.createVault(DAI, KUSD, 100, 20);
    await delay(1_000);
    await api.mst.approveMultisigExtrinsic('0xcs', mstAddress);

    // console.info('History for the mst:', api.historyList[0]);
    // console.info('now we will switch back to the main account');
    // console.info('\n\nSwitching to MAIN Account__________________');
    // api.mst.switchAccount(false);
    // const switchedBackAccountAddress = api.accountPair.address;
    // console.info('switchedBackAccountAddress', api.formatAddress(switchedBackAccountAddress));
    // console.info('\n\nUnlocking Main Account____________________');
    // api.unlockPair('pass');
    // await api.kensetsu.createVault(DAI, KUSD, 100, 20);
    // await delay(1_000);
    // console.info('History for the main acc:', api.historyList[1]);
    // console.info('\n\nSwitching to MST Account again__________________');
    // api.mst.switchAccount(true); // Switch to MST account
    // await api.kensetsu.createVault(DAI, KUSD, 100, 20);
    // await delay();
    // console.info('History for the mst again:', api.historyList[2]);
  });
}

main()
  .catch(console.error)
  .finally(() => process.exit());
