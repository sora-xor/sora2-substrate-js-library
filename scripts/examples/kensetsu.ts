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
    // await api.kensetsu.createVault(DAI, KUSD, 100, 20);
    // await delay();
    // console.info('History:', api.historyList[0]);
  }, SORA_ENV.test);
}

main()
  .catch(console.error)
  .finally(() => process.exit());
