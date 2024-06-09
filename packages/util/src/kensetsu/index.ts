import { map } from 'rxjs';
import { assert } from '@polkadot/util';
import { FPNumber, NumberLike } from '@sora-substrate/math';
import type { KensetsuCollateralInfo, KensetsuCollateralizedDebtPosition } from '@polkadot/types/lookup';
import type { Observable } from '@polkadot/types/types';
import type { Vec, u128 } from '@polkadot/types-codec';

import { Messages } from '../logger';
import { Operation } from '../types';
import { KUSD } from '../assets/consts';
import { VaultTypes } from './consts';
import type { Api } from '../api';
import type { AccountAsset, Asset } from '../assets/types';
import type { Collateral, Vault } from './types';

export class KensetsuModule<T> {
  constructor(private readonly root: Api<T>) {}

  /** {lockedAssetId},{debtAssetId} serialization */
  public serializeKey(lockedAssetId: string, debtAssetId: string): string {
    if (!(lockedAssetId && debtAssetId)) return '';
    return `${lockedAssetId},${debtAssetId}`;
  }

  /** {lockedAssetId},{debtAssetId} deserialization -> { lockedAssetId: string; debtAssetId: string; } */
  public deserializeKey(key: string): Partial<{ lockedAssetId: string; debtAssetId: string }> | null {
    if (!key) return null;
    const [lockedAssetId, debtAssetId] = key.split(',');
    return { lockedAssetId, debtAssetId };
  }

  /**
   * Usage: general system parameters, statistical information
   *
   * @returns Bad debt as `Record<string, FPNumber>` where key is the asset address and value is the amount of bad debt
   */
  async getBadDebt(): Promise<Record<string, FPNumber>> {
    const stablecoinInfos = await this.root.api.query.kensetsu.stablecoinInfos.entries();
    return stablecoinInfos.reduce<Record<string, FPNumber>>((acc, item) => {
      const [key, value] = item;

      const assetId = key.args[0].code.toString();
      const info = value.unwrapOr(null);
      const badDebt = info ? new FPNumber(info.badDebt) : FPNumber.ZERO;
      acc[assetId] = badDebt;

      return acc;
    }, {});
  }

  /**
   * Usage: general system parameters, statistical information
   *
   * Bad debt as `Record<string, FPNumber>` where key is the asset address and value is the amount of bad debt
   */
  async subscribeOnBadDebt(): Promise<Observable<Record<string, FPNumber>>> {
    const keys = await this.root.api.query.kensetsu.stablecoinInfos.keys();
    const assetIds = keys.map((key) => key.args[0].code.toString());

    return this.root.apiRx.query.kensetsu.stablecoinInfos.multi(assetIds).pipe(
      map((infos) => {
        return infos.reduce<Record<string, FPNumber>>((acc, value, index) => {
          const assetId = assetIds[index];
          const info = value.unwrapOr(null);
          const badDebt = info ? new FPNumber(info.badDebt) : FPNumber.ZERO;
          acc[assetId] = badDebt;
          return acc;
        }, {});
      })
    );
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

  /**
   * Usage: general system parameters, debt calculation, statistical information
   *
   * Returns the tax for borrowing stablecoin in %
   */
  async getBorrowTax(): Promise<number> {
    const borrowTax = await this.root.api.query.kensetsu.borrowTax();
    return borrowTax.toNumber();
  }

  /**
   * Returns the subscription on the tax for borrowing stablecoin in %
   */
  subscribeOnBorrowTax(): Observable<number> {
    return this.root.apiRx.query.kensetsu.borrowTax().pipe(map((res) => res.toNumber()));
  }

  /**
   * Returns the TBCD tax in %
   */
  async getTbcdBorrowTax(): Promise<number> {
    const borrowTax = await this.root.api.query.kensetsu.tbcdBorrowTax();
    return borrowTax.toNumber();
  }

  /**
   * Returns the subscription on the TBCD tax in %
   */
  subscribeOnTbcdBorrowTax(): Observable<number> {
    return this.root.apiRx.query.kensetsu.tbcdBorrowTax().pipe(map((res) => res.toNumber()));
  }

  /**
   * Returns the KARMA tax in %
   */
  async getKarmaBorrowTax(): Promise<number> {
    const borrowTax = await this.root.api.query.kensetsu.karmaBorrowTax();
    return borrowTax.toNumber();
  }

  /**
   * Returns the subscription on the KARMA tax in %
   */
  subscribeOnKarmaBorrowTax(): Observable<number> {
    return this.root.apiRx.query.kensetsu.karmaBorrowTax().pipe(map((res) => res.toNumber()));
  }

  // update_collateral_interest_coefficient
  updateCollateralInterestCoefficient(collateral: Collateral): FPNumber | null {
    const now = Date.now();
    if (now <= collateral.lastFeeUpdateTime) return null; // do nothing cuz it's already updated

    const timePassed = now - collateral.lastFeeUpdateTime;
    const collateralInterestCoeff = collateral.interestCoefficient;
    const stabilityFeeMs = collateral.riskParams.stabilityFeeMs;
    // interest_coefficient * ((1 + stability_fee_ms) ^ time_passed)
    return collateralInterestCoeff.mul(FPNumber.ONE.add(stabilityFeeMs).pow(timePassed));
  }

  // accrue_internal
  calcNewDebt(collateral: Collateral, vault: Vault | null): FPNumber | null {
    if (!vault) return null;
    const newCoefficient = this.updateCollateralInterestCoefficient(collateral);
    if (!newCoefficient) return null;

    const vaultInterestCoefficient = vault.interestCoefficient;
    const vaultDebt = vault.internalDebt;

    const interestPercent = newCoefficient.sub(vaultInterestCoefficient).div(vaultInterestCoefficient);
    const stabilityFee = vaultDebt.mul(interestPercent);
    return vaultDebt.add(stabilityFee);
  }

  private formatCollateral(
    collateralInfo: KensetsuCollateralInfo,
    lockedAssetId: string,
    debtAssetId: string
  ): Collateral {
    // ratioReversed has Perbill type = 1_000_000_000 decimals * 100 because of %, so we set decimals = 9 - 2 = 7
    const ratioReversed = new FPNumber(collateralInfo.riskParameters.liquidationRatio, 7);
    const ratio = FPNumber.ONE.div(ratioReversed).mul(FPNumber.TEN_THOUSANDS);
    // collateralInfo.riskParameters.stabilityFeeRate is presented in ms
    const stabilityFeeMs = new FPNumber(collateralInfo.riskParameters.stabilityFeeRate);
    // stability_fee_annual = (1 + stability_fee_ms) ^ 31_556_952 - 1; 31_556_952 - seconds in a year (an average Gregorian year has 365.2425 days)
    const stabilityFeeAnnual = FPNumber.ONE.add(stabilityFeeMs).pow(31_556_952).sub(1).mul(100_000).dp(2); // * 100 (to %) * 1000 (ms to seconds)
    const formatted: Collateral = {
      lockedAssetId,
      debtAssetId,
      lastFeeUpdateTime: collateralInfo.lastFeeUpdateTime.toNumber(),
      interestCoefficient: new FPNumber(collateralInfo.interestCoefficient),
      debtSupply: new FPNumber(collateralInfo.stablecoinSupply),
      totalLocked: new FPNumber(collateralInfo.totalCollateral),
      riskParams: {
        liquidationRatio: ratio.toNumber(2),
        liquidationRatioReversed: ratioReversed.toNumber(2),
        hardCap: new FPNumber(collateralInfo.riskParameters.hardCap),
        maxLiquidationLot: new FPNumber(collateralInfo.riskParameters.maxLiquidationLot),
        stabilityFeeMs,
        stabilityFeeAnnual,
        minDeposit: new FPNumber(collateralInfo.riskParameters.minimalCollateralDeposit),
      },
    };
    return formatted;
  }

  /**
   * Usage: statistical information, for instance, Explore page
   */
  async getCollateral(lockedAsset: Asset, debtAsset: Asset): Promise<Collateral | null> {
    const collateralAssetId = lockedAsset.address;
    const stablecoinAssetId = debtAsset.address;
    const data = await this.root.api.query.kensetsu.collateralInfos({ collateralAssetId, stablecoinAssetId });
    const collateralInfo: KensetsuCollateralInfo | null = data.unwrapOr(null);
    if (!collateralInfo) return null;
    return this.formatCollateral(collateralInfo, collateralAssetId, stablecoinAssetId);
  }

  subscribeOnCollateral(lockedAsset: Asset, debtAsset: Asset): Observable<Collateral | null> {
    const collateralAssetId = lockedAsset.address;
    const stablecoinAssetId = debtAsset.address;
    return this.root.apiRx.query.kensetsu.collateralInfos({ collateralAssetId, stablecoinAssetId }).pipe(
      map((data) => {
        const collateralInfo: KensetsuCollateralInfo | null = data.unwrapOr(null);
        if (!collateralInfo) return null;
        return this.formatCollateral(collateralInfo, collateralAssetId, stablecoinAssetId);
      })
    );
  }

  /**
   * Usage: statistical information & positions management
   */
  async getCollaterals(): Promise<Record<string, Collateral>> {
    const data = await this.root.api.query.kensetsu.collateralInfos.entries();

    return data.reduce<Record<string, Collateral>>((acc, item) => {
      const id = item[0].args[0];
      const lockedAssetId = id.collateralAssetId.code.toString();
      const debtAssetId = id.stablecoinAssetId.code.toString();
      const key = this.serializeKey(lockedAssetId, debtAssetId);
      const info: KensetsuCollateralInfo | null = item[1].unwrapOr(null);
      if (info) {
        acc[key] = this.formatCollateral(info, lockedAssetId, debtAssetId);
      }
      return acc;
    }, {});
  }

  private formatVault(data: KensetsuCollateralizedDebtPosition, id: number): Vault {
    const vault: Vault = {
      lockedAmount: new FPNumber(data.collateralAmount),
      debtAssetId: KUSD.address,
      vaultType: VaultTypes.V2,
      debt: new FPNumber(data.debt),
      internalDebt: new FPNumber(data.debt),
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

  /**
   * Create a new vault
   *
   * @param lockedAsset Locked asset
   * @param debtAsset Debt asset
   * @param collateralAmount Amount of collateral asset
   * @param borrowAmount Amount of KUSD which will be borrowed
   * @param slippageTolerance Slippage tolerance coefficient (in %)
   */
  createVault(
    lockedAsset: Asset | AccountAsset,
    debtAsset: Asset | AccountAsset,
    collateralAmount: NumberLike,
    borrowAmount: NumberLike,
    slippageTolerance: NumberLike = this.root.defaultSlippageTolerancePercent
  ): Promise<T> {
    assert(this.root.account, Messages.connectWallet);

    const assetAddress = lockedAsset.address;
    const asset2Address = debtAsset.address;
    const collateralCodec = new FPNumber(collateralAmount).codec;
    const borrow = new FPNumber(borrowAmount);

    const slippage = borrow.mul(Number(slippageTolerance) / 100);
    const minBorrowAmountCodec = borrow.sub(slippage).codec;

    return this.root.submitExtrinsic(
      this.root.api.tx.kensetsu.createCdp(
        assetAddress,
        collateralCodec,
        asset2Address,
        minBorrowAmountCodec,
        borrow.codec,
        'Type2'
      ),
      this.root.account.pair,
      {
        type: Operation.CreateVault,
        amount: `${collateralAmount}`,
        amount2: `${borrowAmount}`,
        assetAddress,
        asset2Address,
        symbol: lockedAsset.symbol,
        symbol2: debtAsset.symbol,
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
   * @param slippageTolerance Slippage tolerance coefficient (in %)
   */
  borrow(
    vault: Vault,
    amount: NumberLike,
    slippageTolerance: NumberLike = this.root.defaultSlippageTolerancePercent
  ): Promise<T> {
    assert(this.root.account, Messages.connectWallet);
    const willToBorrow = new FPNumber(amount);

    const slippage = willToBorrow.mul(Number(slippageTolerance) / 100);
    const minWillToBorrowCodec = willToBorrow.sub(slippage).codec;

    return this.root.submitExtrinsic(
      this.root.api.tx.kensetsu.borrow(vault.id, minWillToBorrowCodec, willToBorrow.codec),
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
