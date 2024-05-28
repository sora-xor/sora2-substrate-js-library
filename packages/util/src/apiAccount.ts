import last from 'lodash/fp/last';
import first from 'lodash/fp/first';
import omit from 'lodash/fp/omit';
import { Keyring } from '@polkadot/ui-keyring';
import { assert, isHex } from '@polkadot/util';
import { Observable, Subscriber } from 'rxjs';
import {
  base58Decode,
  decodeAddress,
  encodeAddress,
  cryptoWaitReady,
  mnemonicGenerate,
  keyExtractSuri,
  mnemonicValidate,
} from '@polkadot/util-crypto';
import type { KeypairType } from '@polkadot/util-crypto/types';
import { FPNumber, CodecString } from '@sora-substrate/math';
import type { Connection } from '@sora-substrate/connection';
import type { ApiPromise, ApiRx } from '@polkadot/api';
import type { CreateResult } from '@polkadot/ui-keyring/types';
import type { KeyringPair, KeyringPair$Json, KeyringPair$Meta } from '@polkadot/keyring/types';
import type { Signer, ISubmittableResult } from '@polkadot/types/types';
import type { SubmittableExtrinsic } from '@polkadot/api-base/types';

import { XOR } from './assets/consts';
import { decrypt, encrypt, toHmacSHA256 } from './crypto';
import { Messages } from './logger';
import { AccountStorage, Storage } from './storage';
import { Operation, TransactionStatus } from './types';

import type {
  AccountWithOptions,
  ISubmitExtrinsic,
  ExtrinsicEvent,
  AccountHistory,
  HistoryItem,
  CombinedHistoryItem,
  SaveHistoryOptions,
  OnChainIdentity,
} from './types';
import type { OriginalIdentity } from './staking/types';
import type { CommonPrimitivesAssetId32Override } from './typeOverrides';

// We don't need to know real account address for checking network fees
const mockAccountAddress = 'cnRuw2R6EVgQW3e4h8XeiFym2iU17fNsms15zRGcg9YEJndAs';

export const KeyringType = 'sr25519';

export const SoraPrefix = 69;

export let keyring!: Keyring;

export const isLiquidityPoolOperation = (operation: Operation) =>
  [Operation.AddLiquidity, Operation.RemoveLiquidity].includes(operation);

export const isEthOperation = (operation: Operation) =>
  [Operation.EthBridgeIncoming, Operation.EthBridgeOutgoing].includes(operation);

export const isEvmOperation = (operation: Operation) =>
  [Operation.EvmIncoming, Operation.EvmOutgoing].includes(operation);

export const isSubstrateOperation = (operation: Operation) =>
  [Operation.SubstrateIncoming, Operation.SubstrateOutgoing].includes(operation);

export class WithConnectionApi {
  /** Connection class that provides Api */
  public connection!: Connection;

  public setConnection(connection: Connection): void {
    this.connection = connection;
  }

  /** API instance for data requests. Should be used during the connection only */
  public get api(): ApiPromise {
    return this.connection.api as ApiPromise;
  }

  /** API RX instance for data subscriptions. Should be used during the connection only */
  public get apiRx(): ApiRx {
    return this.api.rx as ApiRx;
  }

  get connected(): boolean {
    return !!this.api?.isConnected;
  }

  get chainSymbol(): string | undefined {
    return this.api?.registry.chainTokens[0];
  }

  get chainDecimals(): number | undefined {
    return this.api?.registry.chainDecimals[0];
  }

  get chainSS58(): number | undefined {
    return this.api?.registry.chainSS58;
  }

  /**
   * Format account address
   * @param withPrefix `true` by default
   */
  public formatAddress(address: string, withPrefix = true): string {
    const publicKey = decodeAddress(address, false);

    if (withPrefix) {
      return encodeAddress(publicKey, this.chainSS58 ?? SoraPrefix);
    }

    return encodeAddress(publicKey);
  }
}

export class WithSigner extends WithConnectionApi {
  protected signer?: Signer;

  /**
   * Set signer if the pair is locked (For polkadot js extension usage)
   * @param signer
   */
  public setSigner(signer: Signer): void {
    this.api.setSigner(signer);
    this.signer = signer;
  }
}

export class WithAccountPair extends WithSigner {
  public account?: CreateResult;

  public get accountPair(): KeyringPair | null {
    if (!this.account) {
      return null;
    }
    return this.account.pair;
  }

  public get accountJson(): KeyringPair$Json | null {
    if (!this.account) {
      return null;
    }
    return this.account.json;
  }

  public get address(): string {
    if (!this.accountPair) {
      return '';
    }
    return this.formatAddress(this.accountPair.address);
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
    this.accountPair?.unlock(password);
  }

  /**
   * Lock pair
   */
  public lockPair(): void {
    if (!this.accountPair?.isLocked) {
      this.accountPair?.lock();
    }
  }

  protected getAccountWithOptions(): AccountWithOptions | { account: undefined; options: {} } {
    if (!this.accountPair) return { account: undefined, options: {} };

    return {
      account: this.accountPair.isLocked ? this.accountPair.address : this.accountPair,
      options: { signer: this.signer },
    };
  }
}

export class WithKeyring extends WithAccountPair {
  public readonly seedLength = 12;
  public readonly type: KeypairType = KeyringType;

  public async initKeyring(silent = false): Promise<void> {
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
   * Get all imported accounts.
   * It returns list of imported accounts
   * added via api.importAccount()
   */
  public getAccounts() {
    return keyring.getAccounts();
  }

  /**
   * Get already imported account pair by address
   * @param address account address
   */
  public getAccountPair(address: string): KeyringPair {
    const defaultAddress = this.formatAddress(address, false);

    return keyring.getPair(defaultAddress);
  }

  /**
   * Create an account pair
   * It could be added to account list using addAccountPair method
   * @param suri Seed of the account
   * @param name Name of the account
   */
  public createAccountPair(suri: string, name?: string): KeyringPair {
    const meta = { name: name ?? '' };

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
   * Create account pair from json
   * @param json account json
   * @param meta account meta
   */
  public createAccountPairFromJson(json: KeyringPair$Json, meta?: KeyringPair$Meta): KeyringPair {
    return keyring.createFromJson(json, meta);
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
    return { address: pair.address, name: (pair.meta?.name ?? '') as string };
  }

  /**
   * Export a JSON with the account data
   * @param password
   * @param encrypted If `true` then it will be decrypted. `false` by default
   */
  public exportAccount(pair: KeyringPair, password: string, encrypted = false): string {
    const pass = encrypted ? this.decrypt(password) : password;

    return JSON.stringify(keyring.backupAccount(pair, pass));
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
   * Generate unique string from value
   * @param value
   * @returns
   */
  public encrypt(value: string): string {
    return encrypt(value);
  }

  public decrypt(value: string): string {
    return decrypt(value);
  }
}

export class WithStorage extends WithKeyring {
  /** Common data storage */
  public storage?: Storage;

  /**
   * Set storage if it should be used as data storage
   * @param storage
   */
  public setStorage(storage: Storage): void {
    this.storage = storage;
  }
}

export class WithAccountStorage extends WithStorage {
  /** Account data storage */
  public accountStorage?: AccountStorage;

  public initAccountStorage() {
    if (!this.account?.pair?.address) return;
    // TODO: dependency injection ?
    if (this.storage) {
      this.accountStorage = new AccountStorage(toHmacSHA256(this.account.pair.address));
    }
  }

  protected updateAccountData(account: CreateResult, name?: string, source?: string, isExternal?: boolean): void {
    this.setAccount(account);
    this.initAccountStorage();
  }
}

export class WithAccountHistory extends WithAccountStorage {
  constructor(public readonly historyNamespace = 'history') {
    super();
  }

  protected _history: AccountHistory<HistoryItem> = {};

  // methods for working with history
  public get history(): AccountHistory<HistoryItem> {
    if (this.accountStorage) {
      const history = this.accountStorage.get(this.historyNamespace);
      this._history = history ? (JSON.parse(history) as AccountHistory<HistoryItem>) : {};
    }
    return this._history;
  }

  public set history(value: AccountHistory<HistoryItem>) {
    this.accountStorage?.set(this.historyNamespace, JSON.stringify(value));
    this._history = { ...value };
  }

  public get historyList(): Array<HistoryItem> {
    return Object.values(this.history);
  }

  public getHistory(id: string): HistoryItem | null {
    return this.history[id] ?? null;
  }

  public getFilteredHistory(filterFn: (item: HistoryItem) => boolean): AccountHistory<HistoryItem> {
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

  public saveHistory(historyItem: HistoryItem, options?: SaveHistoryOptions): void {
    if (!historyItem?.id) return;

    let historyCopy: AccountHistory<HistoryItem>;
    let addressStorage: Storage | undefined = undefined;

    const hasAccessToStorage = !!this.storage;
    const historyItemHasSigner = !!historyItem.from;
    // historyItem.from should appear here
    const historyItemFromAddress = historyItemHasSigner
      ? this.formatAddress(historyItem.from as string, false) // NOSONAR
      : '';
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

  public removeHistory(...ids: Array<string>): void {
    if (!ids.length) return;

    this.history = omit(ids, this.history);
  }

  /**
   * Remove all history
   * @param assetAddress If it's empty then all history will be removed, else - only history of the specific asset
   */
  public clearHistory(assetAddress?: string): void {
    if (assetAddress) {
      const filterFn = (item: HistoryItem) => ![item.assetAddress, item.asset2Address].includes(assetAddress);

      this.history = this.getFilteredHistory(filterFn);
    } else {
      this.history = {};
    }
  }
}

export class ApiAccount<T = void> extends WithAccountHistory implements ISubmitExtrinsic<T> {
  /** If `true` it'll be locked during extrinsics submit (`false` by default) */
  public shouldPairBeLocked = false;
  /** If `true` you might subscribe on extrinsic statuses (`false` by default) */
  public shouldObservableBeUsed = false;

  /**
   * Login to account
   * @param address account address
   * @param name account name
   * @param source wallet identity
   * @param isExternal is account from extension or not
   */
  public async loginAccount(address: string, name?: string, source?: string, isExternal?: boolean): Promise<void> {
    try {
      const meta = { name: name ?? '' };

      let account!: CreateResult | { pair: KeyringPair; json: null };

      if (isExternal) {
        account = keyring.addExternal(address, meta);
      } else {
        const accounts = this.getAccounts();

        if (!accounts.find((acc) => acc.address === address)) {
          // [Multiple Tabs] to restore accounts from keyring storage (localStorage)
          await this.initKeyring(true);
        }

        account = {
          pair: this.getAccountPair(address),
          json: null, // we don't need json here
        };
      }

      this.updateAccountData(account as CreateResult, name, source, isExternal);
    } catch (error) {
      console.error(error);
      this.logout();
    }
  }

  public logout(): void {
    this.account = undefined;
    this.accountStorage = undefined;
    this.signer = undefined;

    this.clearHistory();
    this.storage?.clear();
  }

  // prettier-ignore
  public async submitApiExtrinsic( // NOSONAR
    api: ApiPromise,
    extrinsic: SubmittableExtrinsic<'promise'>,
    signer: KeyringPair,
    historyData?: HistoryItem,
    unsigned = false
  ): Promise<T> {
    const nonce = await api.rpc.system.accountNextIndex(signer.address);
    const { account, options } = this.getAccountWithOptions();
    assert(account, Messages.connectWallet);
    // Signing the transaction
    const signedTx = unsigned ? extrinsic : await extrinsic.signAsync(account, { ...options, nonce });

    // we should lock pair, if it's not locked
    this.shouldPairBeLocked && this.lockPair();

    const isNotFaucetOperation = !historyData || historyData.type !== Operation.Faucet;

    // history initial params
    const from = isNotFaucetOperation && signer ? this.address : undefined;
    const txId = signedTx.hash.toString();
    const id = historyData?.id ?? txId;
    const type = historyData?.type;
    const startTime = historyData?.startTime ?? Date.now();
    // history required params for each update
    const requiredParams = { id, from, type } as HistoryItem;

    this.saveHistory({ ...historyData, ...requiredParams, txId, startTime });

    const extrinsicFn = async (subscriber?: Subscriber<ExtrinsicEvent>) => {
      const unsub = await extrinsic
        .send((result: ISubmittableResult) => {
          // Status cannot be null
          const status = first<string>(
            Object.keys(result.status.toJSON() as object)
          )?.toLowerCase() as TransactionStatus;
          const updated: Partial<CombinedHistoryItem> = {};
          

          updated.status = status;

          if (result.status.isInBlock) {
            updated.blockId = result.status.asInBlock.toString();
          } else if (result.status.isFinalized) {
            updated.endTime = Date.now();

            const txIndex = result.txIndex;

            for (const {
              phase,
              event: { data, method, section },
            } of result.events) {
              if (!(phase.isApplyExtrinsic && phase.asApplyExtrinsic.toNumber() === txIndex)) continue;

              if (method === 'FeeWithdrawn' && section === 'xorFee') {
                const [_, soraNetworkFee] = data;
                updated.soraNetworkFee = soraNetworkFee.toString();
              } else if (method === 'AssetRegistered' && section === 'assets') {
                const [assetId, _] = data;
                updated.assetAddress = ((assetId as CommonPrimitivesAssetId32Override).code ?? assetId).toString();
              } else if (
                method === 'Transfer' &&
                ['balances', 'tokens'].includes(section) &&
                isLiquidityPoolOperation(type as Operation)
              ) {
                // balances.Transfer doesn't have assetId field
                const [amount] = data.slice().reverse();
                const amountFormatted = new FPNumber(amount).toString();
                const history = this.getHistory(id);
                // events for 1st token and 2nd token are ordered in extrinsic
                const amountKey = history && 'amount' in history ? 'amount' : 'amount2';
                updated[amountKey] = amountFormatted;
              } else if (
                (method === 'RequestRegistered' && isEthOperation(type as Operation)) ||
                (method === 'RequestStatusUpdate' &&
                  (isEvmOperation(type as Operation) || isSubstrateOperation(type as Operation)))
              ) {
                updated.hash = first(data.toJSON() as any);
              } else if (method === 'CDPCreated' && section === 'kensetsu') {
                updated.vaultId = first(data.toJSON() as any);
              } else if (method === 'ExtrinsicFailed' && section === 'system') {
                updated.status = TransactionStatus.Error;
                updated.endTime = Date.now();

                const error = data[0] as any;
                if (error.isModule) {
                  const decoded = this.api.registry.findMetaError(error.asModule);
                  const { docs, section, name } = decoded;
                  updated.errorMessage = section && name ? { name, section } : docs.join(' ').trim();
                } else {
                  // Other, CannotLookup, BadOrigin, no extra info
                  updated.errorMessage = error.toString();
                }
              }
            }
          }

          this.saveHistory({ ...requiredParams, ...updated }); // Save history during each status update
          // HistoryItem should appear here
          subscriber?.next([status, this.getHistory(id) as HistoryItem]); // NOSONAR

          if (result.status.isFinalized) {
            subscriber?.complete();
            unsub();
          }
        })
        .catch((e: Error) => {
          const errorParts = e?.message?.split(':');
          const errorInfo = last(errorParts)?.trim();
          const status = TransactionStatus.Error;
          const updated: any = {};

          updated.status = status;
          updated.endTime = Date.now();
          updated.errorMessage = errorInfo;

          // save history and then delete 'txId'
          this.saveHistory(
            { ...requiredParams, ...updated },
            {
              wasNotGenerated: true,
            }
          );
          // HistoryItem should appear here
          subscriber?.next([status, this.getHistory(id) as HistoryItem]); // NOSONAR
          subscriber?.complete();
          throw new Error(errorInfo);
        });
    };
    if (this.shouldObservableBeUsed) {
      return new Observable<ExtrinsicEvent>((subscriber) => {
        extrinsicFn(subscriber);
      }) as unknown as T; // T is `Observable<ExtrinsicEvent>` here
    }
    return extrinsicFn() as unknown as Promise<T>; // T is `void` here
  }

  public async submitExtrinsic(
    extrinsic: SubmittableExtrinsic<'promise'>,
    signer: KeyringPair,
    historyData?: HistoryItem,
    unsigned = false
  ): Promise<T> {
    return await this.submitApiExtrinsic(this.api, extrinsic, signer, historyData, unsigned);
  }

  /**
   * Calc network fee for the extrinsic based on paymentInfo
   * @param extrinsic Extrinsic entity
   * @param decimals (Optional) 18 decimals of SORA network is used by default
   */
  public async getTransactionFee(
    extrinsic: SubmittableExtrinsic<'promise'>,
    decimals = XOR.decimals
  ): Promise<CodecString> {
    try {
      const res = await extrinsic.paymentInfo(mockAccountAddress);

      return new FPNumber(res.partialFee, decimals).toCodecString();
    } catch {
      // extrinsic is not supported in chain
      return '0';
    }
  }

  /**
   * Get on-chain account's identity
   * @param address account address
   */
  public async getAccountOnChainIdentity(address: string): Promise<OnChainIdentity | null> {
    const data = await this.api.query.identity.identityOf(address);

    if (data.isEmpty || data.isNone) return null;

    const result = data.unwrap();

    return {
      legalName: result.info.legal.value.toHuman() as string,
      approved: Boolean(result.judgements.length),
      identity: result.toHuman() as unknown as OriginalIdentity,
    };
  }

  /**
   * Validate account address
   * @param address
   */
  public validateAddress(address: string): boolean {
    try {
      base58Decode(address);
      decodeAddress(address, false);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get public key as hex string by account address
   * @param address
   * @returns
   */
  public getPublicKeyByAddress(address: string): string {
    const publicKey = decodeAddress(address, false);

    return Buffer.from(publicKey).toString('hex');
  }
}