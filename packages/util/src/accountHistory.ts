import omit from 'lodash/fp/omit';

import { Formatters } from './formatters';

import type { Storage } from './storage';
import type { HistoryItem } from './BaseApi';

export type AccountHistoryCollection<T> = {
  [key: string]: T;
};

class AccountHistory {
  private storage?: Storage;
  private storageKey?: string;

  private items: AccountHistoryCollection<HistoryItem> = {};

  constructor(storage?: Storage, storageKey?: string) {
    this.storage = storage;
    this.storageKey = storageKey;
  }

  public get history(): AccountHistoryCollection<HistoryItem> {
    if (this.storage) {
      const history = this.storage.get(this.storageKey);
      this.items = history ? (JSON.parse(history) as AccountHistoryCollection<HistoryItem>) : {};
    }
    return this.items;
  }

  public set history(value: AccountHistoryCollection<HistoryItem>) {
    this.storage?.set(this.storageKey, JSON.stringify(value));
    this.items = { ...value };
  }

  public get list(): Array<HistoryItem> {
    return Object.values(this.history);
  }

  public get(id: string): HistoryItem | null {
    return this.history[id] ?? null;
  }

  public getFiltered(filterFn: (item: HistoryItem) => boolean): AccountHistoryCollection<HistoryItem> {
    const currentHistory = this.history;
    const filtered: AccountHistoryCollection<HistoryItem> = {};

    for (const id in currentHistory) {
      const item = currentHistory[id];
      if (filterFn(item)) {
        filtered[id] = item;
      }
    }

    return filtered;
  }

  public save(item: HistoryItem, wasNotGenerated = false): void {
    if (!item || !item.id) return;

    const history = { ...this.history };
    const historyItem = { ...(history[item.id] || {}), ...item };

    if (wasNotGenerated) {
      // Tx was failed on the static validation and wasn't generated in the network
      delete historyItem.txId;
    }

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

class AccountHistoryFactory {
  private storage!: typeof Storage;

  injectStorage(storage: typeof Storage): void {
    this.storage = storage;
  }

  create(accountAddress: string, key = 'history'): AccountHistory {
    if (this.storage) {
      const id = Formatters.toHmacSHA256(accountAddress);
      const namespace = `account:${id}`;
      const accountStorage = new this.storage(namespace);

      return new AccountHistory(accountStorage, key);
    }

    return new AccountHistory();
  }
}

export { AccountHistory, AccountHistoryFactory };
