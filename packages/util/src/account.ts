import type { CreateResult } from '@polkadot/ui-keyring/types';
import type { KeyringPair, KeyringPair$Json } from '@polkadot/keyring/types';

import { AccountHistoryFactory } from './accountHistory';
import { formatAddress } from './formatters';

import type { AccountHistory } from './accountHistory';
import type { Storage } from './storage';

/**
 * The purpose of this class is to store account data and create an instance of the account's transaction history.
 */
class Account {
  protected account!: CreateResult;
  protected historyFactory = new AccountHistoryFactory();

  public history!: AccountHistory;

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
    return formatAddress(this.pair.address);
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
  }

  public resetAccount(): void {
    this.account = undefined;
    this.history = undefined;
  }

  /**
   * Initialize account history
   */
  public initHistory(storageKey = 'history'): void {
    if (!this.pair) return;

    this.history = this.historyFactory.create(this.pair.address, storageKey);
  }

  /**
   * Inject Storage class as dependency
   * @param storage
   */
  public injectStorage(storage: typeof Storage): void {
    this.historyFactory.injectStorage(storage);
  }
}

export { Account };
