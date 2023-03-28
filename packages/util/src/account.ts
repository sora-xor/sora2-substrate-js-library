import omit from 'lodash/fp/omit';
import { toHmacSHA256 } from './crypto';

import type { CreateResult } from '@polkadot/ui-keyring/types';
import type { KeyringPair, KeyringPair$Json } from '@polkadot/keyring/types';

import { AccountStorage, Storage } from './storage';

import { formatAddress } from './formatters';

import type { History } from './BaseApi';
import type { BridgeHistory } from './BridgeApi';
import type { RewardClaimHistory } from './rewards/types';

export type AccountHistory<T> = {
  [key: string]: T;
};

export type HistoryItem = History | BridgeHistory | RewardClaimHistory;

export type SaveHistoryOptions = {
  wasNotGenerated?: boolean;
  toCurrentAccount?: boolean;
};

class HistoryStorage {
  protected readonly storage!: AccountStorage;
  protected readonly key!: string;

  private _history: AccountHistory<HistoryItem> = {};

  constructor(storage: AccountStorage, key = 'history') {
    this.storage = storage;
    this.key = key;
  }

  public get history(): AccountHistory<HistoryItem> {
    if (this.storage) {
      const history = this.storage.get(this.key);
      this._history = history ? (JSON.parse(history) as AccountHistory<HistoryItem>) : {};
    }
    return this._history;
  }

  public set history(value: AccountHistory<HistoryItem>) {
    this.storage?.set(this.key, JSON.stringify(value));
    this._history = { ...value };
  }

  public get list(): Array<HistoryItem> {
    return Object.values(this.history);
  }

  public get(id: string): HistoryItem | null {
    return this.history[id] ?? null;
  }

  public getFiltered(filterFn: (item: HistoryItem) => boolean): AccountHistory<HistoryItem> {
    const currentHistory = this.history;
    const filtered: AccountHistory<HistoryItem> = {};

    for (const id in currentHistory) {
      const item = currentHistory[id];
      if (filterFn(item)) {
        filtered[id] = item;
      }
    }

    return filtered;
  }

  public save(item: HistoryItem): void {
    if (!item || !item.id) return;

    const history = { ...this.history };
    const historyItem = { ...(history[item.id] || {}), ...item };

    history[historyItem.id] = historyItem;

    this.history = history;
  }

  public remove(...ids: Array<string>): void {
    if (!ids.length) return;

    this.history = omit(ids, this.history);
  }

  /**
   * Remove all history
   * @param assetAddress If it's empty then all history will be removed, else - only history of the specific asset
   */
  public clear(assetAddress?: string): void {
    if (assetAddress) {
      const filterFn = (item: HistoryItem) => ![item.assetAddress, item.asset2Address].includes(assetAddress);
      this.history = this.getFiltered(filterFn);
    } else {
      this.history = {};
    }
  }
}

class Account {
  public storage?: Storage; // common data storage
  public accountStorage?: AccountStorage; // account data storage
  public account: CreateResult;

  constructor(public readonly historyNamespace = 'history') {}

  public get address(): string {
    if (!this.pair) {
      return '';
    }
    return formatAddress(this.pair.address);
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

  /**
   * Set account data
   * @param account
   */
  public setAccount(account: CreateResult): void {
    this.account = account;
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

  public saveHistory(historyItem: HistoryItem, options?: SaveHistoryOptions): void {
    if (!historyItem || !historyItem.id) return;

    let historyCopy: AccountHistory<HistoryItem>;
    let addressStorage: Storage;

    const hasAccessToStorage = !!this.storage;
    const historyItemHasSigner = !!historyItem.from;
    const historyItemFromAddress = historyItemHasSigner ? formatAddress(historyItem.from, false) : '';
    const needToUpdateAddressStorage =
      !options?.toCurrentAccount &&
      historyItemFromAddress &&
      historyItemFromAddress !== this.address &&
      hasAccessToStorage;

    if (needToUpdateAddressStorage) {
      addressStorage = new AccountStorage(toHmacSHA256(historyItemFromAddress));
      const history = addressStorage.get(this.historyNamespace);
      historyCopy = history ? JSON.parse(history) : {};
    } else {
      historyCopy = { ...this.history };
    }

    const item = { ...(historyCopy[historyItem.id] || {}), ...historyItem };

    if (options?.wasNotGenerated) {
      // Tx was failed on the static validation and wasn't generated in the network
      delete item.txId;
    }

    historyCopy[historyItem.id] = item;

    if (needToUpdateAddressStorage && addressStorage) {
      addressStorage.set(this.historyNamespace, JSON.stringify(historyCopy));
    } else {
      this.history = historyCopy;
    }
  }

  public logout(): void {
    this.account = undefined;
    this.accountStorage = undefined;
    this.history = {};
    if (this.storage) {
      this.storage.clear();
    }
  }
}
