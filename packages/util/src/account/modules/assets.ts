import { Subscription, Subject } from 'rxjs';
import { FPNumber } from '@sora-substrate/math';
import type { CodecString } from '@sora-substrate/math';

import { NativeAssets, XOR } from '../../assets/consts';

import type { BaseApi } from '../../BaseApi';
import type { Account } from '../../account';
import type { AccountAsset, AccountBalance } from '../../assets/types';

class AccountAssets {
  protected readonly account!: Account;
  protected readonly root!: BaseApi;

  constructor(account: Account, root: BaseApi) {
    this.account = account;
    this.root = root;
  }

  // Default assets addresses of account - list of NativeAssets addresses
  public accountDefaultAssetsAddresses: Array<string> = NativeAssets.map((asset) => asset.address);

  private _accountAssetsAddresses: Array<string> = [];
  private balanceSubscriptions: Map<string, Subscription> = new Map();
  private balanceSubject = new Subject<void>();

  public balanceUpdated = this.balanceSubject.asObservable();
  public accountAssets: Array<AccountAsset> = [];

  // # Account assets methods

  public get accountAssetsAddresses(): Array<string> {
    if (this.account.accountStorage) {
      const addresses = this.account.accountStorage.get('assetsAddresses');
      this._accountAssetsAddresses = addresses ? (JSON.parse(addresses) as Array<string>) : [];
    }
    return this._accountAssetsAddresses;
  }

  public set accountAssetsAddresses(assetsAddresses: Array<string>) {
    this.account.accountStorage?.set('assetsAddresses', JSON.stringify(assetsAddresses));
    this._accountAssetsAddresses = [...assetsAddresses];
  }

  private addToAccountAssetsAddressesList(assetAddress: string): void {
    const assetsAddressesCopy = [...this.accountAssetsAddresses];
    const index = assetsAddressesCopy.findIndex((address) => address === assetAddress);

    ~index ? (assetsAddressesCopy[index] = assetAddress) : assetsAddressesCopy.push(assetAddress);

    this.accountAssetsAddresses = assetsAddressesCopy;
  }

  private subscribeToAssetBalance(asset: AccountAsset): void {
    const subscription = this.root.assets
      .getAssetBalanceObservable(asset, this.account.address)
      .subscribe((accountBalance: AccountBalance) => {
        asset.balance = accountBalance;
        this.balanceSubject.next();
      });
    this.balanceSubscriptions.set(asset.address, subscription);
  }

  private unsubscribeFromAssetBalance(address: string): void {
    this.balanceSubscriptions.get(address)?.unsubscribe();
    this.balanceSubscriptions.delete(address);
  }

  private async addToAccountAssetsList(address: string): Promise<void> {
    // Check asset in account assets list
    const accountAsset = this.getAsset(address);
    // If asset is not added to account assets
    if (!accountAsset) {
      // Get asset data and balance info
      const asset = await this.getAccountAsset(address);
      // During async execution of the method above, asset may have already been added
      // Check again, that asset is not in account assets list
      if (!this.getAsset(address)) {
        this.accountAssets.push(asset);
        this.subscribeToAssetBalance(asset);
      }
    } else {
      // Move asset to the end of list, keep balance subscription
      this.removeFromAccountAssets(address);
      this.accountAssets.push(accountAsset);
    }
  }

  private removeFromAccountAssets(address: string): void {
    this.accountAssets = this.accountAssets.filter((item) => item.address !== address);
  }

  private removeFromAccountAssetsList(address: string): void {
    this.unsubscribeFromAssetBalance(address);
    this.removeFromAccountAssets(address);
    this.balanceSubject.next();
  }

  private removeFromAccountAssetsAddressesList(address: string): void {
    this.accountAssetsAddresses = this.accountAssetsAddresses.filter((item) => item !== address);
  }

  /**
   * Add account asset & create balance subscription
   * @param address asset address
   */
  public async addAccountAsset(address: string): Promise<void> {
    this.addToAccountAssetsAddressesList(address);
    await this.addToAccountAssetsList(address);
  }

  /**
   * Remove account asset & it's balance subscription
   * @param address asset address
   */
  public removeAccountAsset(address: string): void {
    this.removeFromAccountAssetsAddressesList(address);
    this.removeFromAccountAssetsList(address);
  }

  /**
   * Clear account assets & their balance subscriptions
   */
  public clearAccountAssets() {
    for (const address of this.balanceSubscriptions.keys()) {
      this.unsubscribeFromAssetBalance(address);
    }
    this.accountAssets = [];
  }

  /**
   * Find account asset in account assets list
   * @param address asset address
   */
  public getAsset(address: string): AccountAsset | null {
    return this.accountAssets.find((asset) => asset.address === address) ?? null;
  }

  /**
   * Get account asset information.
   * You can just check balance of any asset
   * @param address asset address
   */
  public async getAccountAsset(address: string): Promise<AccountAsset> {
    const { decimals, symbol, name, content, description } = await this.root.assets.getAssetInfo(address);
    const asset = { address, decimals, symbol, name, content, description } as AccountAsset;
    const result = await this.root.assets.getAssetBalance(this.account.address, address, decimals);
    asset.balance = result;

    return asset;
  }

  /**
   * Sync account assets with account assets address list
   * During update process, assets should be removed according to 'excludedAddresses'
   * and exists in accounts assets list according to 'currentAddresses'
   */
  public async updateAccountAssets(): Promise<void> {
    if (!this.accountAssetsAddresses.length) {
      this.accountAssetsAddresses = this.accountDefaultAssetsAddresses;
    }

    const currentAddresses = this.accountAssetsAddresses;
    const excludedAddresses = this.accountAssets.reduce<string[]>(
      (result, { address }) => (currentAddresses.includes(address) ? result : [...result, address]),
      []
    );

    for (const assetAddress of excludedAddresses) {
      this.removeFromAccountAssetsList(assetAddress);
    }

    for (const assetAddress of currentAddresses) {
      await this.addToAccountAssetsList(assetAddress);
    }
  }

  public hasEnoughXor(asset: AccountAsset, amount: string | number, fee: FPNumber | CodecString): boolean {
    const xorDecimals = XOR.decimals;
    const fpFee = fee instanceof FPNumber ? fee : FPNumber.fromCodecValue(fee, xorDecimals);

    if (asset.address === XOR.address) {
      const fpBalance = FPNumber.fromCodecValue(asset.balance.transferable, xorDecimals);
      const fpAmount = new FPNumber(amount, xorDecimals);
      return FPNumber.lte(fpFee, fpBalance.sub(fpAmount));
    }
    // Here we should be sure that xor value of account was tracked & updated
    const xorAccountAsset = this.getAsset(XOR.address);
    if (!xorAccountAsset) {
      return false;
    }
    const xorBalance = FPNumber.fromCodecValue(xorAccountAsset.balance.transferable, xorDecimals);
    return FPNumber.lte(fpFee, xorBalance);
  }
}

export { AccountAssets };
