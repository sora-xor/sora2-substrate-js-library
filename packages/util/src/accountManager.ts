import { assert, isHex } from '@polkadot/util';
import { keyExtractSuri, mnemonicValidate, mnemonicGenerate, cryptoWaitReady } from '@polkadot/util-crypto';
import { keyring } from '@polkadot/ui-keyring';
import type { CreateResult, KeyringAddress } from '@polkadot/ui-keyring/types';
import type { KeypairType } from '@polkadot/util-crypto/types';
import type { KeyringPair, KeyringPair$Json, KeyringPair$Meta } from '@polkadot/keyring/types';

import { Account } from './account/account';
import { Formatters } from './formatters';

import type { Storage } from './storage';

export const KeyringType = 'sr25519';

class AccountManager {
  public readonly seedLength = 12;
  public readonly account = new Account();

  private readonly type: KeypairType = KeyringType;
  private storage?: Storage;

  /**
   * Inject Storage class as dependency
   * @param storage
   */
  public injectStorage(storage: typeof Storage): void {
    this.storage = new storage();
    this.account.injectStorage(storage);
  }

  private async initKeyring(silent = false): Promise<void> {
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
   */
  public async initialize(): Promise<void> {
    await this.initKeyring();

    const address = this.storage?.get('address');

    if (address) {
      const defaultAddress = Formatters.formatAddress(address, false);
      const name = this.storage?.get('name');
      const source = this.storage?.get('source');
      const isExternalFlag = this.storage?.get('isExternal');
      const isExternal = isExternalFlag ? JSON.parse(isExternalFlag) : null;
      const isExternalAccount = isExternal || (isExternal === null && !!source);

      this.loginAccount(defaultAddress, name, source, isExternalAccount);
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
      address: this.createAccountPair(suri).address,
      suri,
    };
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
          pair: this.getAccountPair(address),
          json: null,
        };
      }

      this.updateAccountData(account, name, source, isExternal);
    } catch (error) {
      console.error(error);
      this.logout();
    }
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

  /**
   * Remove all wallet data
   */
  public logout(): void {
    this.account.resetAccount();
  }

  // Working with Keyring

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
   * Create account pair from json
   * @param json account json
   * @param meta account meta
   */
  public createAccountPairFromJson(json: KeyringPair$Json, meta?: KeyringPair$Meta): KeyringPair {
    return keyring.createFromJson(json, meta);
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
   * Get already imported account pair by address
   * @param address account address
   */
  public getAccountPair(address: string): KeyringPair {
    const defaultAddress = Formatters.formatAddress(address, false);

    return keyring.getPair(defaultAddress);
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
    const pass = encrypted ? Formatters.decrypt(password) : password;

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

  /**
   * Forget account from keyring
   * @param address account address to forget
   */
  public forgetAccount(address = this.account.address): void {
    if (address) {
      const defaultAddress = Formatters.formatAddress(address, false);
      keyring.forgetAccount(defaultAddress);
      keyring.forgetAddress(defaultAddress);
    }
  }

  /**
   * Change the account password.
   * It generates an error if `oldPassword` is invalid
   * @param oldPassword
   * @param newPassword
   */
  public changeAccountPassword(address: string, oldPassword: string, newPassword: string): void {
    const pair = this.getAccountPair(address);

    try {
      if (!pair.isLocked) {
        pair.lock();
      }
      pair.decodePkcs8(oldPassword);
    } catch (error) {
      throw new Error('Old password is invalid');
    }

    keyring.encryptAccount(pair, newPassword);
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

    if (this.storage && this.account.pair && pair.address === this.account.pair.address) {
      this.storage.set('name', name);
    }
  }
}

export { AccountManager };
