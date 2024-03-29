import { map } from 'rxjs';
import { assert } from '@polkadot/util';
import { FPNumber, NumberLike } from '@sora-substrate/math';
import type { KensetsuCollateralInfo, KensetsuCollateralizedDebtPosition } from '@polkadot/types/lookup';
import type { Observable } from '@polkadot/types/types';
import type { Vec, u128 } from '@polkadot/types-codec';

import { Messages } from '../logger';
import { Operation } from '../BaseApi';
import { KUSD } from '../assets/consts';
import type { Api } from '../api';
import type { AccountAsset, Asset } from '../assets/types';
import type { Collateral, Vault } from './types';

export class KensetsuModule<T> {
  constructor(private readonly root: Api<T>) {}

  /**
   * Usage: general system parameters, statistical information
   *
   * Bad debt in KUSD
   */
  async getBadDebt(): Promise<FPNumber> {
    const badDebt = await this.root.api.query.kensetsu.badDebt();
    return new FPNumber(badDebt);
  }

  /**
   * Usage: general system parameters, statistical information
   *
   * Bad debt in KUSD
   */
  subscribeOnBadDept(): Observable<FPNumber> {
    return this.root.apiRx.query.kensetsu.badDebt().pipe(map((res) => new FPNumber(res)));
  }

  /**
   * Get the upper limit of KUSD
   */
  async getKusdHardCap(): Promise<FPNumber> {
    const kusdHardCap = await this.root.api.query.kensetsu.kusdHardCap();
    return new FPNumber(kusdHardCap);
  }

  /**
   * Subscribe on the upper limit of KUSD
   */
  subscribeOnKusdHardCap(): Observable<FPNumber> {
    return this.root.apiRx.query.kensetsu.kusdHardCap().pipe(map((res) => new FPNumber(res)));
  }

  /**
   * @example If you had a cdp where you had 100 XOR for 100 KUSD and it became unsafe,
   * these 100 KUSD were sold, of which 10 KUSD went to protocol revenue and 90 KUSD to closing the debt,
   * if liquidationPenalty = 10%
   */
  async getLiquidationPenalty(): Promise<number> {
    const liquidationPenalty = await this.root.api.query.kensetsu.liquidationPenalty();
    return liquidationPenalty.toNumber();
  }

  /**
   * @example If you had a cdp where you had 100 XOR for 100 KUSD and it became unsafe,
   * these 100 KUSD were sold, of which 10 KUSD went to protocol revenue and 90 KUSD to closing the debt,
   * if liquidationPenalty = 10%
   */
  subscribeOnLiquidationPenalty(): Observable<number> {
    return this.root.apiRx.query.kensetsu.liquidationPenalty().pipe(map((res) => res.toNumber()));
  }

  /**
   * Usage: statistical information
   * Returns the number about how much cdp were created
   */
  async getCdpCount(): Promise<number> {
    const nextCDPId = await this.root.api.query.kensetsu.nextCDPId();
    return nextCDPId.toNumber();
  }

  /**
   * Usage: statistical information
   * Returns the subscription on the number about how much cdp were created
   */
  subscribeOnCdpCount(): Observable<number> {
    return this.root.apiRx.query.kensetsu.nextCDPId().pipe(map((res) => res.toNumber()));
  }

  // update_collateral_interest_coefficient
  updateCollateralInterestCoefficient(collateral: Collateral): FPNumber | null {
    const now = Date.now();
    if (now <= collateral.lastFeeUpdateTime) return null; // do nothing cuz it's already updated

    const timePassed = now - collateral.lastFeeUpdateTime;
    const collateralInterestCoeff = collateral.interestCoefficient;
    const rateSecondlyCoeff = collateral.riskParams.rateSecondlyCoeff;

    return collateralInterestCoeff.mul(FPNumber.ONE.add(rateSecondlyCoeff).pow(timePassed));
  }

  // accrue_internal
  calcNewDebt(collateral: Collateral, vault: Vault | null): FPNumber | null {
    if (!vault) return null;
    const newCoefficient = this.updateCollateralInterestCoefficient(collateral);
    if (!newCoefficient) return null;

    const vaultInterestCoefficient = vault.interestCoefficient;
    const vaultDebt = vault.debt;

    const interestPercent = newCoefficient.sub(vaultInterestCoefficient).div(vaultInterestCoefficient);
    const stabilityFee = vaultDebt.mul(interestPercent);
    return vaultDebt.add(stabilityFee);
  }

  private formatCollateral(collateralInfo: KensetsuCollateralInfo): Collateral {
    // ratioReversed has Perbill type = 1_000_000_000 decimals * 100 because of %
    const ratioReversed = new FPNumber(collateralInfo.riskParameters.liquidationRatio, 7);
    const ratio = FPNumber.ONE.div(ratioReversed).mul(FPNumber.TEN_THOUSANDS);
    // rate_annual = (1 + rate_secondly) ^ 31_556_952 - 1
    const rateSecondlyCoeff = new FPNumber(collateralInfo.riskParameters.stabilityFeeRate);
    const rateAnnual = FPNumber.ONE.add(rateSecondlyCoeff).pow(31_556_952).sub(1).mul(100).dp(2);
    const formatted: Collateral = {
      lastFeeUpdateTime: collateralInfo.lastFeeUpdateTime.toNumber(),
      interestCoefficient: new FPNumber(collateralInfo.interestCoefficient),
      kusdSupply: new FPNumber(collateralInfo.kusdSupply),
      riskParams: {
        liquidationRatio: ratio.toNumber(2),
        liquidationRatioReversed: ratioReversed.toNumber(2),
        hardCap: new FPNumber(collateralInfo.riskParameters.hardCap),
        maxLiquidationLot: new FPNumber(collateralInfo.riskParameters.maxLiquidationLot),
        rateSecondlyCoeff,
        rateAnnual,
      },
    };
    return formatted;
  }

  /**
   * Usage: statistical information, for instance, Explore page
   */
  async getCollateral(asset: Asset): Promise<Collateral | null> {
    const data = await this.root.api.query.kensetsu.collateralInfos(asset.address);
    const collateralInfo: KensetsuCollateralInfo | null = data.unwrapOr(null);
    if (!collateralInfo) return null;
    return this.formatCollateral(collateralInfo);
  }

  subscribeOnCollateral(asset: Asset): Observable<Collateral | null> {
    return this.root.apiRx.query.kensetsu.collateralInfos(asset.address).pipe(
      map((data) => {
        const collateralInfo: KensetsuCollateralInfo | null = data.unwrapOr(null);
        if (!collateralInfo) return null;
        return this.formatCollateral(collateralInfo);
      })
    );
  }

  /**
   * Usage: statistical information, for instance, Explore page
   */
  async getCollaterals(): Promise<Record<string, Collateral>> {
    const data = await this.root.api.query.kensetsu.collateralInfos.entries();
    const infos: Record<string, Collateral> = {};
    data.forEach((item) => {
      const info: KensetsuCollateralInfo | null = item[1].unwrapOr(null);
      if (info) {
        infos[item[0].args[0].code.toString()] = this.formatCollateral(info);
      }
    });
    return infos;
  }

  private formatVault(data: KensetsuCollateralizedDebtPosition, id: number): Vault {
    const vault: Vault = {
      lockedAmount: new FPNumber(data.collateralAmount),
      debt: new FPNumber(data.debt),
      interestCoefficient: new FPNumber(data.interestCoefficient),
      owner: data.owner.toString(),
      lockedAssetId: data.collateralAssetId.code.toString(),
      id,
    };
    return vault;
  }

  async getVault(id: number): Promise<Vault | null> {
    const data = await this.root.api.query.kensetsu.cdpDepository(id);
    const vault = data.unwrapOr(null);
    if (!vault) return null;
    return this.formatVault(vault, id);
  }

  /**
   * Request all vaults.
   *
   * It utilizes a lot of resources
   */
  async getVaults(): Promise<Vault[]> {
    const data = await this.root.api.query.kensetsu.cdpDepository.entries();
    const vaults: Vault[] = [];
    for (const item of data) {
      const vault = item[1].unwrapOr(null);
      if (vault) {
        vaults.push(this.formatVault(vault, item[0].args[0].toNumber()));
      }
    }
    return vaults;
  }

  /**
   * Usage: the main entity for checking the vaults.
   */
  subscribeOnVault(id: number): Observable<Vault | null> {
    return this.root.apiRx.query.kensetsu.cdpDepository(id).pipe(
      map((data) => {
        const vault = data.unwrapOr(null);
        if (!vault) return null;
        return this.formatVault(vault, id);
      })
    );
  }

  async getAccountVaultIds(): Promise<number[]> {
    assert(this.root.account, Messages.connectWallet);

    const data = await this.root.api.query.kensetsu.cdpOwnerIndex(this.root.account.pair.address);
    const ids = data.unwrapOr([]) as Vec<u128>;

    return ids.map((id) => id.toNumber());
  }

  async getAccountVaults(): Promise<Vault[]> {
    assert(this.root.account, Messages.connectWallet);

    const data = await this.root.api.query.kensetsu.cdpOwnerIndex(this.root.account.pair.address);
    const ids = data.unwrapOr([]) as Vec<u128>;
    if (!ids.length) return [];

    const vaultsPromises = ids.map(async (id) => {
      const item = await this.root.api.query.kensetsu.cdpDepository(id);
      return { id: id.toNumber(), item };
    });
    const vaultsData = await Promise.all(vaultsPromises);

    const vaults: Vault[] = [];
    for (const { id, item } of vaultsData) {
      const vault = item.unwrapOr(null);
      if (vault) {
        vaults.push(this.formatVault(vault, id));
      }
    }
    return vaults;
  }

  subscribeOnAccountVaultIds(): Observable<number[]> {
    assert(this.root.account, Messages.connectWallet);

    return this.root.apiRx.query.kensetsu.cdpOwnerIndex(this.root.account.pair.address).pipe(
      map((data) => {
        const ids = data.unwrapOr([]) as Vec<u128>;
        return ids.map((item) => item.toNumber());
      })
    );
  }

  subscribeOnVaults(ids: number[]): Observable<Vault[]> {
    return this.root.apiRx.query.kensetsu.cdpDepository.multi(ids).pipe(
      map((data) => {
        const vaults: Vault[] = [];
        for (const [index, item] of data.entries()) {
          const id = ids[index];
          const vault = item.unwrapOr(null);
          if (vault) {
            vaults.push(this.formatVault(vault, id));
          }
        }
        return vaults;
      })
    );
  }

  createVault(asset: Asset | AccountAsset, collateralAmount: NumberLike, borrowAmount: NumberLike): Promise<T> {
    assert(this.root.account, Messages.connectWallet);

    const assetAddress = asset.address;
    const collateralCodec = new FPNumber(collateralAmount).codec;
    const borrowCodec = new FPNumber(borrowAmount).codec;

    return this.root.submitExtrinsic(
      this.root.api.tx.kensetsu.createCdp(assetAddress, collateralCodec, borrowCodec),
      this.root.account.pair,
      {
        type: Operation.CreateVault,
        amount: `${collateralAmount}`,
        amount2: `${borrowAmount}`,
        assetAddress,
        symbol: asset.symbol,
        asset2Address: KUSD.address,
        symbol2: KUSD.symbol,
      }
    );
  }

  /**
   * Close user's vault (repay full debt & close vault)
   *
   * Be sure that the account has enough KUSD for covering all the debt
   *
   * @param vault User's vault
   * @param collateralAsset Collateral asset; it's required to set it as well to have correct asset symbol in a history
   */
  closeVault(vault: Vault, collateralAsset: Asset): Promise<T> {
    assert(this.root.account, Messages.connectWallet);
    const vaultId = vault.id;
    const symbol = collateralAsset?.symbol ?? '';

    return this.root.submitExtrinsic(this.root.api.tx.kensetsu.closeCdp(vaultId), this.root.account.pair, {
      type: Operation.CloseVault,
      vaultId,
      amount: vault.lockedAmount.toString(),
      amount2: vault.debt.toString(),
      assetAddress: vault.lockedAssetId,
      symbol,
      asset2Address: KUSD.address,
      symbol2: KUSD.symbol,
    });
  }

  /**
   * Manual repay vault debt.
   *
   * If you want to repay everything and close vault then it's better to use `closeVault`
   *
   * @param vault User's vault
   * @param amount Amount in KUSD from the account which will cover the debt in KUSD
   */
  repayVaultDebt(vault: Vault, amount: NumberLike): Promise<T> {
    assert(this.root.account, Messages.connectWallet);
    const repayDebt = new FPNumber(amount);
    assert(vault.debt.gte(repayDebt), Messages.repayVaultDebtMoreThanDebt);

    return this.root.submitExtrinsic(
      this.root.api.tx.kensetsu.repayDebt(vault.id, repayDebt.codec),
      this.root.account.pair,
      {
        type: Operation.RepayVaultDebt,
        vaultId: vault.id,
        amount: `${amount}`,
        assetAddress: KUSD.address,
        symbol: KUSD.symbol,
      }
    );
  }

  /**
   * Deposit extra collateral to the existing vault
   *
   * @param vault User's vault
   * @param amount Collateral amount which will be deposited to the existing vault
   * @param collateralAsset Collateral asset; it's required to set it as well to have correct asset symbol in a history
   */
  depositCollateral(vault: Vault, amount: NumberLike, collateralAsset: Asset): Promise<T> {
    assert(this.root.account, Messages.connectWallet);
    const extraCollateralCodec = new FPNumber(amount).codec;
    const symbol = collateralAsset?.symbol ?? '';

    return this.root.submitExtrinsic(
      this.root.api.tx.kensetsu.depositCollateral(vault.id, extraCollateralCodec),
      this.root.account.pair,
      {
        type: Operation.DepositCollateral,
        vaultId: vault.id,
        amount: `${amount}`,
        assetAddress: vault.lockedAssetId,
        symbol,
      }
    );
  }

  /**
   * Borrow extra KUSD from the existing vault
   *
   * @param vault User's vault
   * @param amount Amount which will be borrowed to the existing vault
   */
  borrow(vault: Vault, amount: NumberLike): Promise<T> {
    assert(this.root.account, Messages.connectWallet);
    const willToBorrowCodec = new FPNumber(amount).codec;

    return this.root.submitExtrinsic(
      this.root.api.tx.kensetsu.borrow(vault.id, willToBorrowCodec),
      this.root.account.pair,
      {
        type: Operation.BorrowVaultDebt,
        vaultId: vault.id,
        amount: `${amount}`,
        assetAddress: KUSD.address,
        symbol: KUSD.symbol,
      }
    );
  }
}
