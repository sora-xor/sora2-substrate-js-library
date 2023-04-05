import type { Connection } from '@sora-substrate/connection';
import type { CreateResult } from '@polkadot/ui-keyring/types';

import { BaseApi } from './BaseApi';
import { AccountManager } from './accountManager';
import { Account } from './account/account';
import { Formatters } from './formatters';

import type { Storage } from './storage';

class Api<T = void> extends BaseApi<T> {
  public readonly account!: Account<T>;
  public readonly accountManager!: AccountManager;

  protected readonly storage!: Storage;

  constructor(connection: Connection, storage?: typeof Storage) {
    super(connection);

    if (storage) {
      this.storage = new storage();
    }

    this.account = new Account(this, storage);
    this.accountManager = new AccountManager();
  }

  /**
   * The first method you should run. Includes initialization process
   */
  public async initialize(): Promise<void> {
    await this.initialize();
    await this.accountManager.initialize();

    const address = this.storage?.get('address');

    if (address) {
      const defaultAddress = Formatters.formatAddress(address, false);
      const name = this.storage?.get('name');
      const source = this.storage?.get('source');
      const isExternalFlag = this.storage?.get('isExternal');
      const isExternal = isExternalFlag ? JSON.parse(isExternalFlag) : null;
      const isExternalAccount = isExternal || (isExternal === null && !!source);

      this.login(defaultAddress, name, source, isExternalAccount);
    }
  }

  /**
   * Login to account
   * @param address account address
   * @param name account name
   * @param source wallet identity
   * @param isExternal is account from extension or not
   */
  public async login(address: string, name?: string, source?: string, isExternal?: boolean): Promise<void> {
    try {
      const meta = { name: name || '' };

      let account!: CreateResult;

      if (isExternal) {
        account = this.accountManager.addExternal(address, meta);
      } else {
        const accounts = await this.accountManager.getAccounts();

        if (!accounts.find((acc) => acc.address === address)) {
          // [Multiple Tabs] to restore accounts from keyring storage (localStorage)
          await this.accountManager.initialize(true);
        }

        account = {
          pair: this.accountManager.getAccountPair(address),
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
   * Reset account data
   */
  public logout(): void {
    this.account.resetAccount();
  }

  private updateAccountData(account: CreateResult, name?: string, source?: string, isExternal?: boolean): void {
    this.account.setAccount(account);

    if (this.storage) {
      const soraAddress = Formatters.formatAddress(account.pair.address);

      this.storage.set('address', soraAddress);
      // Optional params are just for External clients for now
      name && this.storage.set('name', name);
      source && this.storage.set('source', source);
      typeof isExternal === 'boolean' && this.storage.set('isExternal', isExternal);
    }
  }
}

export { Api };
