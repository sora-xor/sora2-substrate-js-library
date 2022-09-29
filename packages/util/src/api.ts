import { assert, isHex } from '@polkadot/util';
import { keyExtractSuri, mnemonicValidate, mnemonicGenerate, cryptoWaitReady } from '@polkadot/util-crypto';
import keyring from '@polkadot/ui-keyring';
import { CodecString, FPNumber, NumberLike } from '@sora-substrate/math';
import type { KeypairType } from '@polkadot/util-crypto/types';
import type { CreateResult, KeyringAddress } from '@polkadot/ui-keyring/types';
import type { KeyringPair$Json } from '@polkadot/keyring/types';
import type { Signer } from '@polkadot/types/types';

import { decrypt, encrypt } from './crypto';
import { BaseApi, Operation, KeyringType, isBridgeOperation } from './BaseApi';
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
import { XOR } from './assets/consts';
import type { Storage } from './storage';
import type { AccountAsset, Asset } from './assets/types';
import type { HistoryItem } from './BaseApi';

/**
 * Contains all necessary data and functions for the wallet & polkaswap client
 */
export class Api extends BaseApi {
  private readonly type: KeypairType = KeyringType;
  public readonly defaultSlippageTolerancePercent = 0.5;
  public readonly seedLength = 12;

  public readonly bridge: BridgeApi = new BridgeApi();

  public readonly swap: SwapModule = new SwapModule(this);
  public readonly rewards: RewardsModule = new RewardsModule(this);
  public readonly poolXyk: PoolXykModule = new PoolXykModule(this);
  public readonly referralSystem: ReferralSystemModule = new ReferralSystemModule(this);
  public readonly assets: AssetsModule = new AssetsModule(this);
  /** This module is used for internal needs */
  public readonly mstTransfers: MstTransfersModule = new MstTransfersModule(this);
  public readonly system: SystemModule = new SystemModule(this);
  public readonly demeterFarming: DemeterFarmingModule = new DemeterFarmingModule(this);

  public initAccountStorage() {
    super.initAccountStorage();
    this.bridge.initAccountStorage();

    // since 1.7.15 history should be saved as object
    if (this.accountStorage) {
      const oldHistory = this.history;

      if (Array.isArray(oldHistory)) {
        this.runHistoryListToObjectMigration(oldHistory);
        this.historySyncTimestamp = 0;
        this.accountStorage.remove('historySyncOperations');
      }
    }
  }

  // # History methods
  /**
   * Save history items in storage as object
   * @param list array of history items
   */
  private runHistoryListToObjectMigration(list: Array<HistoryItem>) {
    const history = {};
    const bridgeHistory = {};

    for (const item of list) {
      if (!item.id) continue;
      if (isBridgeOperation(item.type)) {
        bridgeHistory[item.id] = item;
      } else {
        // 'txId' has higher priority
        history[item.txId || item.id] = item;
      }
    }

    this.history = history;
    this.bridge.history = bridgeHistory;
  }

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

  /**
   * The first method you should run. Includes initialization process
   * @param withKeyringLoading `true` by default
   */
  public async initialize(withKeyringLoading = true): Promise<void> {
    const address = this.storage?.get('address');
    const password = this.storage?.get('password');
    const name = this.storage?.get('name');
    const source = this.storage?.get('source');

    if (withKeyringLoading) {
      await cryptoWaitReady();

      keyring.loadAll({ type: KeyringType });

      if (!address) {
        return;
      }

      const defaultAddress = this.formatAddress(address, false);
      const soraAddress = this.formatAddress(address);

      this.storage?.set('address', soraAddress);

      const pair = keyring.getPair(defaultAddress);
      const account =
        !source && password
          ? keyring.addPair(pair, decrypt(password as string))
          : keyring.addExternal(defaultAddress, name ? { name } : {});

      this.setAccount(account);
      this.initAccountStorage();
    }

    // [1.9.9]: Migration from 'isExternal' to 'source' in localstorage
    if (Boolean(this.storage?.get('isExternal'))) {
      this.storage?.remove('isExternal');
      this.logout();
      return;
    }
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
      address: keyring.createFromUri(suri, {}, this.type).address,
      suri,
    };
  }

  /**
   * Import wallet operation
   * @param suri Seed of the wallet
   * @param name Name of the wallet account
   * @param password Password which will be set for the wallet
   */
  public importAccount(suri: string, name: string, password: string): void {
    const account = keyring.addUri(suri, password, { name }, this.type);

    this.setAccount(account);

    if (this.storage) {
      this.storage.set('name', name);
      this.storage.set('password', encrypt(password));
      const soraAddress = this.formatAddress(account.pair.address);
      this.storage.set('address', soraAddress);
    }

    this.initAccountStorage();
  }

  /**
   * Import wallet operation
   * It returns account creation result
   * @param suri Seed of the wallet
   * @param name Name of the wallet account
   * @param password Password which will be set for the wallet
   */
  public async createAccount(suri: string, name: string, password: string): Promise<CreateResult> {
    const account = keyring.addUri(suri, password, { name }, this.type);

    this.setAccount(account);

    if (this.storage) {
      this.storage.set('name', name);
      this.storage.set('password', encrypt(password));
      const soraAddress = this.formatAddress(account.pair.address);
      this.storage.set('address', soraAddress);
    }

    this.initAccountStorage();

    return account;
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
  public changePassword(oldPassword: string, newPassword: string): void {
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
  public changeName(name: string): void {
    const pair = this.accountPair;
    keyring.saveAccountMeta(pair, { ...pair.meta, name });
    if (this.storage) {
      this.storage.set('name', name);
    }
  }

  /**
   * Restore from JSON object.
   * It generates an error if JSON or/and password are not valid
   * @param json
   * @param password
   */
  public restoreFromJson(json: KeyringPair$Json, password: string): { address: string; name: string } {
    try {
      const pair = keyring.restoreAccount(json, password);
      return { address: pair.address, name: ((pair.meta || {}).name || '') as string };
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  /**
   * Export a JSON with the account data
   * @param password
   * @param encrypted If `true` then it will be decrypted. `false` by default
   */
  public exportAccount(password: string, encrypted = false): string {
    let pass = password;
    if (encrypted) {
      pass = decrypt(password);
    }
    const pair = this.accountPair;
    return JSON.stringify(keyring.backupAccount(pair, pass));
  }

  /**
   * Create seed phrase. It returns `{ address, seed }` object.
   */
  public createSeed(): { address: string; seed: string } {
    const seed = mnemonicGenerate(this.seedLength);
    return {
      address: keyring.createFromUri(seed, {}, this.type).address,
      seed,
    };
  }

  /**
   * Import account by PolkadotJs extension
   * @param address
   * @param name
   * @param source
   */
  public importByPolkadotJs(address: string, name: string, source: string): void {
    let account;

    if (!source) {
      const pair = keyring.getPair(address);
      account = { pair };
    } else {
      account = keyring.addExternal(address, { name: name || '' });
    }

    this.setAccount(account);

    if (this.storage) {
      const soraAddress = this.formatAddress(account.pair.address);
      this.storage.set('name', name);
      this.storage.set('address', soraAddress);
      this.storage.set('source', source);
    }

    this.initAccountStorage();
  }

  // # API methods

  /**
   * Transfer amount from account
   * @param asset Asset object
   * @param toAddress Account address
   * @param amount Amount value
   */
  public async transfer(asset: Asset | AccountAsset, toAddress: string, amount: NumberLike): Promise<void> {
    assert(this.account, Messages.connectWallet);
    const assetAddress = asset.address;
    const formattedToAddress = toAddress.slice(0, 2) === 'cn' ? toAddress : this.formatAddress(toAddress);
    await this.submitExtrinsic(
      this.api.tx.assets.transfer(assetAddress, toAddress, new FPNumber(amount, asset.decimals).toCodecString()),
      this.account.pair,
      { symbol: asset.symbol, to: formattedToAddress, amount: `${amount}`, assetAddress, type: Operation.Transfer }
    );
  }

  // # Logout & reset methods

  /**
   * Remove all wallet data
   */
  public logout(onDesktop = false): void {
    if (!onDesktop && this.account) {
      const address = this.account.pair.address;
      keyring.forgetAccount(address);
      keyring.forgetAddress(address);
    }

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
