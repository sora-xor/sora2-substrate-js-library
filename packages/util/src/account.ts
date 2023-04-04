import type { CreateResult } from '@polkadot/ui-keyring/types';
import type { KeyringPair, KeyringPair$Json } from '@polkadot/keyring/types';

import { AccountHistory } from './accountHistory';
import { AccountAssets } from './account/modules/assets';
import { Formatters } from './formatters';

import type { Storage } from './storage';
import type { BaseApi } from './BaseApi';

/**
 * The purpose of this class is to store account data and create an instance of the account's transaction history.
 */
class Account {
  protected storage?: typeof Storage;
  protected root?: BaseApi;

  protected account!: CreateResult;
  protected assets!: AccountAssets;

  public accountStorage?: Storage;
  public history!: AccountHistory;

  constructor(root?: BaseApi, storage?: typeof Storage) {
    this.root = root;
    this.storage = storage;

    this.assets = new AccountAssets(this, root);
  }

  public get pair(): KeyringPair {
    if (!this.account) {
      return null;
    }
    return this.account.pair;
  }

  public get json(): KeyringPair$Json {
    if (!this.account) {
      return null;
    }
    return this.account.json;
  }

  public get address(): string {
    if (!this.pair) {
      return '';
    }
    return Formatters.formatAddress(this.pair.address);
  }

  /**
   * Unlock pair to sign tx
   * @param password
   */
  public unlockPair(password: string): void {
    this.pair.unlock(password);
  }

  /**
   * Lock pair
   */
  public lockPair(): void {
    if (!this.pair?.isLocked) {
      this.pair.lock();
    }
  }

  /**
   * Inject account data to work with
   * @param data account data
   */
  public setAccount(data: CreateResult): void {
    this.account = data;
    this.initAccountStorage();
    this.initHistory();
  }

  public resetAccount(): void {
    this.account = undefined;
    this.accountStorage = undefined;
    this.history = undefined;
    this.assets.clearAccountAssets();
  }

  public initAccountStorage() {
    if (!(this.pair && this.storage)) return;

    const id = Formatters.toHmacSHA256(this.pair.address);
    const namespace = `account:${id}`;
    this.accountStorage = new this.storage(namespace);
  }

  /**
   * Initialize account history
   */
  public initHistory(storageKey = 'history'): void {
    if (!this.pair) return;

    this.history = new AccountHistory(this.accountStorage, storageKey);
  }

  /**
   * Inject Storage class as dependency
   * @param storage
   */
  public injectStorage(storage: typeof Storage): void {
    this.storage = storage;
  }
}

export { Account };
