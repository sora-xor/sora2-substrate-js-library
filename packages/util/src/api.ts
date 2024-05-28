import { assert } from '@polkadot/util';
import { CodecString, FPNumber, NumberLike } from '@sora-substrate/math';
import type { Connection } from '@sora-substrate/connection';
import type { CreateResult } from '@polkadot/ui-keyring/types';
import type { Signer } from '@polkadot/types/types';

import { BaseApi } from './BaseApi';
import { keyring } from './apiAccount';
import { Messages } from './logger';
import { BridgeProxyModule } from './bridgeProxy';
import { SwapModule } from './swap';
import { RewardsModule } from './rewards';
import { PoolXykModule } from './poolXyk';
import { ReferralSystemModule } from './referralSystem';
import { AssetsModule } from './assets';
import { OrderBookModule } from './orderBook';
import { MstTransfersModule } from './mstTransfers';
import { SystemModule } from './system';
import { StakingModule } from './staking';
import { DemeterFarmingModule } from './demeterFarming';
import { DexModule } from './dex';
import { CeresLiquidityLockerModule } from './ceresLiquidityLocker';
import { KensetsuModule } from './kensetsu';
import { XOR } from './assets/consts';
import type { Storage } from './storage';
import type { AccountAsset, Asset } from './assets/types';

/**
 * Contains all necessary data and functions for the wallet & polkaswap client
 */
export class Api<T = void> extends BaseApi<T> {
  public readonly defaultSlippageTolerancePercent = 0.5;

  public readonly bridgeProxy = new BridgeProxyModule<T>(this);

  public readonly swap = new SwapModule<T>(this);
  public readonly rewards = new RewardsModule<T>(this);
  public readonly poolXyk = new PoolXykModule<T>(this);
  public readonly referralSystem = new ReferralSystemModule<T>(this);
  public readonly assets = new AssetsModule<T>(this);
  public readonly orderBook = new OrderBookModule<T>(this);
  /** This module is used for internal needs */
  public readonly mstTransfers = new MstTransfersModule<T>(this);
  public readonly system = new SystemModule<T>(this);
  public readonly staking = new StakingModule<T>(this);
  public readonly demeterFarming = new DemeterFarmingModule<T>(this);
  public readonly dex = new DexModule<T>(this);
  public readonly ceresLiquidityLocker = new CeresLiquidityLockerModule<T>(this);
  public readonly kensetsu = new KensetsuModule<T>(this);

  public override setConnection(connection: Connection) {
    super.setConnection(connection);
    this.bridgeProxy.setConnection(this.connection);
  }

  public override initAccountStorage() {
    super.initAccountStorage();
    this.bridgeProxy.initAccountStorage();
  }

  /**
   * Set storage if it should be used as data storage
   * @param storage
   */
  public override setStorage(storage: Storage): void {
    super.setStorage(storage);
    this.bridgeProxy.setStorage(storage);
  }

  // # Account management methods

  /**
   * Set signer if the pair is locked (For polkadot js extension usage)
   * @param signer
   */
  public override setSigner(signer: Signer): void {
    super.setSigner(signer);
    this.bridgeProxy.setSigner(signer);
  }

  /**
   * Set account data
   * @param account
   */
  public override setAccount(account: CreateResult): void {
    super.setAccount(account);
    this.bridgeProxy.setAccount(account);
  }

  public async restoreActiveAccount(): Promise<void> {
    const address = this.storage?.get('address');

    if (address) {
      const defaultAddress = this.formatAddress(address, false);
      const name = this.storage?.get('name');
      const source = this.storage?.get('source');
      const isExternalFlag = this.storage?.get('isExternal');
      const isExternal = isExternalFlag ? JSON.parse(isExternalFlag) : null;
      const isExternalAccount = isExternal || (isExternal === null && !!source);

      await this.loginAccount(defaultAddress, name, source, isExternalAccount);
    }
  }

  /**
   * The first method you should run. Includes initialization process
   * @param withKeyringLoading `true` by default
   */
  public async initialize(withKeyringLoading = true): Promise<void> {
    if (withKeyringLoading) {
      await this.initKeyring();
      await this.restoreActiveAccount();
    }

    // Update dex data
    await Promise.allSettled([this.dex.update(), this.swap.update()]);
  }

  protected override updateAccountData(
    account: CreateResult,
    name?: string,
    source?: string,
    isExternal?: boolean
  ): void {
    super.updateAccountData(account);

    if (this.storage) {
      const soraAddress = this.formatAddress(account.pair.address);

      this.storage.set('address', soraAddress);
      // Optional params are just for External clients for now
      name && this.storage.set('name', name);
      source && this.storage.set('source', source);
      typeof isExternal === 'boolean' && this.storage.set('isExternal', isExternal);
    }
  }

  /**
   * Import account & login
   * @param suri Seed of the account
   * @param name Name of the account
   * @param password Password which will be set for the account
   */
  public importAccount(suri: string, name: string, password: string): void {
    const account = this.addAccount(suri, name, password);
    this.updateAccountData(account, name);
  }

  /**
   * Change the account password.
   * It generates an error if `oldPassword` is invalid
   * @param oldPassword
   * @param newPassword
   */
  public changeAccountPassword(oldPassword: string, newPassword: string): void {
    assert(this.accountPair, Messages.connectWallet);

    const pair = this.accountPair;
    try {
      if (!pair.isLocked) {
        pair.lock();
      }
      pair.decodePkcs8(oldPassword);
    } catch (error) {
      throw new Error('Old password is invalid');
    }
    keyring.encryptAccount(pair, newPassword);

    if (this.storage) {
      this.storage.set('password', this.encrypt(newPassword));
    }
  }

  /**
   * Change the account name
   * TODO: check it, polkadot-js extension doesn't change account name
   * @param address account address
   * @param name New name
   */
  public changeAccountName(address: string, name: string): void {
    const pair = this.getAccountPair(address);

    keyring.saveAccountMeta(pair, { ...pair.meta, name });

    if (this.storage && this.accountPair && pair.address === this.accountPair.address) {
      this.storage.set('name', name);
    }
  }

  /**
   * Remove all wallet data
   */
  public override logout(): void {
    this.assets.clearAccountAssets();
    this.poolXyk.clearAccountLiquidity();

    super.logout();
    this.bridgeProxy.logout();
  }

  // # Formatter methods
  public hasEnoughXor(asset: AccountAsset, amount: string | number, fee: FPNumber | CodecString): boolean {
    const xorDecimals = XOR.decimals;
    const fpFee = fee instanceof FPNumber ? fee : FPNumber.fromCodecValue(fee, xorDecimals);
    if (asset.address === XOR.address) {
      const fpBalance = FPNumber.fromCodecValue(asset.balance.transferable, xorDecimals);
      const fpAmount = new FPNumber(amount, xorDecimals);
      return FPNumber.lte(fpFee, fpBalance.sub(fpAmount));
    }
    // Here we should be sure that xor value of account was tracked & updated
    const xorAccountAsset = this.assets.getAsset(XOR.address);
    if (!xorAccountAsset) {
      return false;
    }
    const xorBalance = FPNumber.fromCodecValue(xorAccountAsset.balance.transferable, xorDecimals);
    return FPNumber.lte(fpFee, xorBalance);
  }

  private divideAssetsInternal(
    firstAsset: Asset | AccountAsset,
    secondAsset: Asset | AccountAsset,
    firstAmount: NumberLike,
    secondAmount: NumberLike,
    reversed: boolean
  ): string {
    const decimals = Math.max(firstAsset.decimals, secondAsset.decimals);
    const one = new FPNumber(1, decimals);
    const firstAmountNum = new FPNumber(firstAmount, decimals);
    const secondAmountNum = new FPNumber(secondAmount, decimals);
    const nonReversedSecond = !secondAmountNum.isZero() ? secondAmountNum : one;
    const reversedSecond = !firstAmountNum.isZero() ? firstAmountNum : one;
    const result = !reversed ? firstAmountNum.div(nonReversedSecond) : secondAmountNum.div(reversedSecond);
    return result.format();
  }

  /**
   * Divide the first asset by the second
   * @param firstAsset
   * @param secondAsset
   * @param firstAmount
   * @param secondAmount
   * @param reversed If `true`: the second by the first (`false` by default)
   * @returns Formatted string
   */
  public divideAssets(
    firstAsset: Asset | AccountAsset,
    secondAsset: Asset | AccountAsset,
    firstAmount: NumberLike,
    secondAmount: NumberLike,
    reversed = false
  ): string {
    return this.divideAssetsInternal(firstAsset, secondAsset, firstAmount, secondAmount, reversed);
  }

  /**
   * Divide the first asset by the second
   * @param firstAssetAddress
   * @param secondAssetAddress
   * @param firstAmount
   * @param secondAmount
   * @param reversed If `true`: the second by the first (`false` by default)
   * @returns Promise with formatted string
   */
  public async divideAssetsByAssetIds(
    firstAssetAddress: string,
    secondAssetAddress: string,
    firstAmount: NumberLike,
    secondAmount: NumberLike,
    reversed = false
  ): Promise<string> {
    const firstAsset = await this.assets.getAssetInfo(firstAssetAddress);
    const secondAsset = await this.assets.getAssetInfo(secondAssetAddress);
    return this.divideAssetsInternal(firstAsset, secondAsset, firstAmount, secondAmount, reversed);
  }
}

/** Api object */
export const api = new Api();
