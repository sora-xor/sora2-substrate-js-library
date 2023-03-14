import { assert, isHex } from '@polkadot/util';
import { keyExtractSuri, mnemonicValidate, mnemonicGenerate, cryptoWaitReady } from '@polkadot/util-crypto';
import { Keyring } from '@polkadot/ui-keyring';
import { CodecString, FPNumber, NumberLike } from '@sora-substrate/math';
import type { KeypairType } from '@polkadot/util-crypto/types';
import type { CreateResult, KeyringAddress } from '@polkadot/ui-keyring/types';
import type { KeyringPair, KeyringPair$Json, KeyringPair$Meta } from '@polkadot/keyring/types';
import type { Signer } from '@polkadot/types/types';

import { decrypt, encrypt } from './crypto';
import { BaseApi, Operation, KeyringType } from './BaseApi';
import { Messages } from './logger';
import { BridgeApi } from './BridgeApi';
import { SwapModule } from './swap';
import { RewardsModule } from './rewards';
import { PoolXykModule } from './poolXyk';
import { ReferralSystemModule } from './referralSystem';
import { AssetsModule } from './assets';
import { MstTransfersModule } from './mstTransfers';
import { SystemModule } from './system';
import { DemeterFarmingModule } from './demeterFarming';
import { DexModule } from './dex';
import { CeresLiquidityLockerModule } from './ceresLiquidityLocker';
import { XOR } from './assets/consts';
import type { Storage } from './storage';
import type { AccountAsset, Asset } from './assets/types';
import type { HistoryItem } from './BaseApi';

let keyring!: Keyring;

/**
 * Contains all necessary data and functions for the wallet & polkaswap client
 */
export class Api<T = void> extends BaseApi<T> {
  private readonly type: KeypairType = KeyringType;

  public readonly defaultSlippageTolerancePercent = 0.5;
  public readonly seedLength = 12;

  public readonly bridge = new BridgeApi<T>();

  public readonly swap = new SwapModule<T>(this);
  public readonly rewards = new RewardsModule<T>(this);
  public readonly poolXyk = new PoolXykModule<T>(this);
  public readonly referralSystem = new ReferralSystemModule<T>(this);
  public readonly assets = new AssetsModule<T>(this);
  /** This module is used for internal needs */
  public readonly mstTransfers = new MstTransfersModule<T>(this);
  public readonly system = new SystemModule<T>(this);
  public readonly demeterFarming = new DemeterFarmingModule<T>(this);
  public readonly dex = new DexModule<T>(this);
  public readonly ceresLiquidityLocker = new CeresLiquidityLockerModule<T>(this);

  public initAccountStorage() {
    super.initAccountStorage();
    this.bridge.initAccountStorage();
  }

  // # History methods
  /**
   * Remove all history
   * @param assetAddress If it's empty then all history will be removed, else - only history of the specific asset
   */
  public clearHistory(assetAddress?: string) {
    if (assetAddress) {
      const filterFn = (item: HistoryItem) =>
        !!assetAddress && ![item.assetAddress, item.asset2Address].includes(assetAddress);

      this.history = this.getFilteredHistory(filterFn);
    } else {
      super.clearHistory();
    }
  }

  /**
   * Set storage if it should be used as data storage
   * @param storage
   */
  public setStorage(storage: Storage): void {
    super.setStorage(storage);
    this.bridge.setStorage(storage);
  }

  // # Account management methods

  /**
   * Set signer if the pair is locked (For polkadot js extension usage)
   * @param signer
   */
  public setSigner(signer: Signer): void {
    super.setSigner(signer);
    this.bridge.setSigner(signer);
  }

  /**
   * Set account data
   * @param account
   */
  public setAccount(account: CreateResult): void {
    super.setAccount(account);
    this.bridge.setAccount(account);
  }

  private async initKeyring(silent = false): Promise<void> {
    keyring = new Keyring();

    await cryptoWaitReady();

    try {
      // Restore accounts from keyring storage (localStorage)
      keyring.loadAll({ type: this.type });
    } catch (error) {
      // Dont throw "Unable to initialise options more than once" error in silent mode
      if (!silent) {
        throw error;
      }
    }
  }

  /**
   * The first method you should run. Includes initialization process
   * @param withKeyringLoading `true` by default
   */
  public async initialize(withKeyringLoading = true): Promise<void> {
    const isExternalFlag = this.storage?.get('isExternal');

    const address = this.storage?.get('address');
    const name = this.storage?.get('name');
    const source = this.storage?.get('source');
    const isExternal = isExternalFlag ? JSON.parse(isExternalFlag) : null;

    if (withKeyringLoading) {
      await this.initKeyring();

      if (address) {
        const defaultAddress = this.formatAddress(address, false);
        const isExternalAccount = isExternal || (isExternal === null && !!source);

        this.loginAccount(defaultAddress, name, source, isExternalAccount);
      }
    }

    // Update available dex list
    await this.dex.updateList();
  }

  /**
   * Before use the seed for wallet connection you may want to check its correctness
   * @param suri Seed which is set by the user
   */
  public checkSeed(suri: string): { address: string; suri: string } {
    const { phrase } = keyExtractSuri(suri);
    if (isHex(phrase)) {
      assert(isHex(phrase, 256), 'Hex seed is not 256-bits');
    } else {
      assert(String(phrase).split(' ').length === this.seedLength, `Mnemonic should contain ${this.seedLength} words`);
      assert(mnemonicValidate(phrase), 'There is no valid mnemonic seed');
    }
    return {
      address: this.createAccountPair(suri).address,
      suri,
    };
  }

  private updateAccountData(account: CreateResult, name?: string, source?: string, isExternal?: boolean): void {
    this.setAccount(account);

    if (this.storage) {
      const soraAddress = this.formatAddress(account.pair.address);

      this.storage.set('address', soraAddress);
      // Optional params are just for External clients for now
      name && this.storage.set('name', name);
      source && this.storage.set('source', source);
      typeof isExternal === 'boolean' && this.storage.set('isExternal', isExternal);
    }

    this.initAccountStorage();
  }

  /**
   * Login to account
   * @param address account address
   * @param name account name
   * @param source wallet identity
   * @param isExternal is account from extension or not
   */
  public async loginAccount(address: string, name?: string, source?: string, isExternal?: boolean): Promise<void> {
    try {
      const meta = { name: name || '' };

      let account!: CreateResult;

      if (isExternal) {
        account = keyring.addExternal(address, meta);
      } else {
        const accounts = await this.getAccounts();

        if (!accounts.find((acc) => acc.address === address)) {
          // [Multiple Tabs] to restore accounts from keyring storage (localStorage)
          await this.initKeyring(true);
        }

        account = {
          pair: keyring.getPair(address),
          json: null,
        };
      }

      this.updateAccountData(account, name, source, isExternal);
    } catch (error) {
      console.error(error);
      this.logout();
    }
  }

  /**
   * Import account using credentials
   * @param suri Seed of the account
   * @param name Name of the account
   * @param password Password which will be set for the account
   */
  public addAccount(suri: string, name: string, password: string): CreateResult {
    return keyring.addUri(suri, password, { name }, this.type);
  }

  /**
   * Create an account pair
   * It could be added to account list using addAccountPair method
   * @param suri Seed of the account
   * @param name Name of the account
   */
  public createAccountPair(suri: string, name?: string): KeyringPair {
    const meta = { name: name || '' };

    return keyring.createFromUri(suri, meta, this.type);
  }

  /**
   * Import account using account pair
   * @param pair account pair to add
   * @param password account password
   */
  public addAccountPair(pair: KeyringPair, password: string): void {
    keyring.addPair(pair, password);
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
   * Get all imported accounts.
   * It returns list of imported accounts
   * added via api.importAccount()
   *
   */
  public async getAccounts(): Promise<KeyringAddress[]> {
    return keyring.getAccounts();
  }

  /**
   * Change the account password.
   * It generates an error if `oldPassword` is invalid
   * @param oldPassword
   * @param newPassword
   */
  public changeAccountPassword(oldPassword: string, newPassword: string): void {
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
      this.storage.set('password', encrypt(newPassword));
    }
  }

  /**
   * Change the account name
   * TODO: check it, polkadot-js extension doesn't change account name
   * @param name New name
   */
  public changeAccountName(name: string): void {
    const pair = this.accountPair;
    keyring.saveAccountMeta(pair, { ...pair.meta, name });
    if (this.storage) {
      this.storage.set('name', name);
    }
  }

  /**
   * Restore from JSON object.
   * Adds it to keyring storage
   * It generates an error if JSON or/and password are not valid
   * @param json
   * @param password
   */
  public restoreAccountFromJson(json: KeyringPair$Json, password: string): { address: string; name: string } {
    const pair = keyring.restoreAccount(json, password);
    return { address: pair.address, name: ((pair.meta || {}).name || '') as string };
  }

  /**
   * Export a JSON with the account data
   * @param password
   * @param encrypted If `true` then it will be decrypted. `false` by default
   */
  public exportAccount(pair: KeyringPair, password: string, encrypted = false): string {
    const pass = encrypted ? decrypt(password) : password;
    return JSON.stringify(keyring.backupAccount(pair, pass));
  }

  /**
   * Create seed phrase. It returns `{ address, seed }` object.
   */
  public createSeed(): { address: string; seed: string } {
    const seed = mnemonicGenerate(this.seedLength);
    return {
      address: this.createAccountPair(seed).address,
      seed,
    };
  }

  // # API methods

  /**
   * Transfer amount from account
   * @param asset Asset object
   * @param toAddress Account address
   * @param amount Amount value
   */
  public transfer(asset: Asset | AccountAsset, toAddress: string, amount: NumberLike): Promise<T> {
    assert(this.account, Messages.connectWallet);
    const assetAddress = asset.address;
    const formattedToAddress = toAddress.slice(0, 2) === 'cn' ? toAddress : this.formatAddress(toAddress);
    return this.submitExtrinsic(
      this.api.tx.assets.transfer(assetAddress, toAddress, new FPNumber(amount, asset.decimals).toCodecString()),
      this.account.pair,
      { symbol: asset.symbol, to: formattedToAddress, amount: `${amount}`, assetAddress, type: Operation.Transfer }
    );
  }

  // # Logout & reset methods

  /**
   * Forget account from keyring
   * @param address account address to forget
   */
  public forgetAccount(address = this.address): void {
    if (address) {
      const defaultAddress = this.formatAddress(address, false);
      keyring.forgetAccount(defaultAddress);
      keyring.forgetAddress(defaultAddress);
    }
  }

  /**
   * Remove all wallet data
   */
  public logout(): void {
    this.assets.clearAccountAssets();
    this.poolXyk.clearAccountLiquidity();

    super.logout();
    this.bridge.logout();
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
    const result = !reversed
      ? firstAmountNum.div(!secondAmountNum.isZero() ? secondAmountNum : one)
      : secondAmountNum.div(!firstAmountNum.isZero() ? firstAmountNum : one);
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
