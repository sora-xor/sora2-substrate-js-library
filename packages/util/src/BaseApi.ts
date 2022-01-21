import last from 'lodash/fp/last';
import first from 'lodash/fp/first';
import omit from 'lodash/fp/omit';
import { decodeAddress, encodeAddress } from '@polkadot/util-crypto';
import type { ApiPromise, ApiRx } from '@polkadot/api';
import type { CreateResult } from '@polkadot/ui-keyring/types';
import type { KeyringPair, KeyringPair$Json } from '@polkadot/keyring/types';
import type { Signer, ISubmittableResult } from '@polkadot/types/types';
import type { SubmittableExtrinsic } from '@polkadot/api/promise/types';
import type { AddressOrPair, SignerOptions } from '@polkadot/api/submittable/types';

import { AccountStorage, Storage } from './storage';
import { XOR } from './assets/consts';
import { CodecString, FPNumber } from './fp';
import { encrypt, toHmacSHA256 } from './crypto';
import { connection } from './connection';
import type { BridgeHistory } from './BridgeApi';
import type { RewardClaimHistory } from './rewards/types';

type AccountWithOptions = {
  account: AddressOrPair;
  options: Partial<SignerOptions>;
};

export type SaveHistoryOptions = {
  wasNotGenerated?: boolean;
  toCurrentAccount?: boolean;
};

export type NetworkFeesObject = {
  [key in Operation]: CodecString;
};

export type HistoryItem = History | BridgeHistory | RewardClaimHistory;

export type AccountHistory<T> = {
  [key: string]: T;
};

export const isBridgeOperation = (operation: Operation) =>
  [Operation.EthBridgeIncoming, Operation.EthBridgeOutgoing].includes(operation);

const isLiquidityPoolOperation = (operation: Operation) =>
  [Operation.AddLiquidity, Operation.RemoveLiquidity].includes(operation);

export const KeyringType = 'sr25519';

export class BaseApi {
  /**
   * Network fee values which can be used right after `calcStaticNetworkFees` method.
   *
   * Each value is represented as `CodecString`
   */
  public NetworkFee = {
    [Operation.AddLiquidity]: '0',
    [Operation.CreatePair]: '0',
    [Operation.EthBridgeIncoming]: '0',
    [Operation.EthBridgeOutgoing]: '0',
    [Operation.RegisterAsset]: '0',
    [Operation.RemoveLiquidity]: '0',
    [Operation.Swap]: '0',
    [Operation.SwapAndSend]: '0',
    [Operation.Transfer]: '0',
    [Operation.ClaimVestedRewards]: '0',
    [Operation.ClaimLiquidityProvisionRewards]: '0',
    [Operation.ClaimExternalRewards]: '0',
    [Operation.ReferralReserveXor]: '0',
    [Operation.ReferralUnreserveXor]: '0',
    [Operation.ReferralSetInvitedUser]: '0',
  } as NetworkFeesObject;

  protected readonly prefix = 69;
  public readonly defaultDEXId = 0;

  public readonly historyNamespace: string;
  private _history: AccountHistory<HistoryItem> = {};
  private _historySyncTimestamp: number = 0;
  private _historySyncOperations: Array<Operation> = [];
  private _restored: boolean = false;

  protected signer?: Signer;
  public storage?: Storage; // common data storage
  public accountStorage?: AccountStorage; // account data storage
  public account: CreateResult;

  constructor({ historyNamespace = 'history' } = {}) {
    this.historyNamespace = historyNamespace;
  }

  public get api(): ApiPromise {
    return connection.api;
  }

  public get apiRx(): ApiRx {
    return connection.api.rx as ApiRx;
  }

  public get accountPair(): KeyringPair {
    if (!this.account) {
      return null;
    }
    return this.account.pair;
  }

  public get address(): string {
    if (!this.account) {
      return '';
    }
    return this.formatAddress(this.account.pair.address);
  }

  public get accountJson(): KeyringPair$Json {
    if (!this.account) {
      return null;
    }
    return this.account.json;
  }

  public logout(): void {
    this.account = null;
    this.accountStorage = null;
    this.signer = null;
    this.history = {};
    if (this.storage) {
      this.storage.clear();
    }
  }

  public initAccountStorage() {
    if (!this.account?.pair?.address) return;
    // TODO: dependency injection ?
    if (this.storage) {
      this.accountStorage = new AccountStorage(toHmacSHA256(this.account.pair.address));
    }
  }

  // methods for working with history
  public get history(): AccountHistory<HistoryItem> {
    if (this.accountStorage) {
      this._history = (JSON.parse(this.accountStorage.get(this.historyNamespace)) as AccountHistory<HistoryItem>) || {};
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

  public get restored(): boolean {
    if (this.accountStorage) {
      this._restored = JSON.parse(this.accountStorage.get('restored')) || false;
    }
    return this._restored;
  }

  public set restored(value: boolean) {
    this.accountStorage?.set('restored', JSON.stringify(value));
    this._restored = value;
  }

  public get historySyncTimestamp(): number {
    if (this.accountStorage) {
      this._historySyncTimestamp = JSON.parse(this.accountStorage.get('historySyncTimestamp')) || 0;
    }
    return this._historySyncTimestamp;
  }

  public set historySyncTimestamp(value: number) {
    this.accountStorage?.set('historySyncTimestamp', JSON.stringify(value));
    this._historySyncTimestamp = value;
  }

  public get historySyncOperations(): Array<Operation> {
    if (this.accountStorage) {
      this._historySyncOperations =
        (JSON.parse(this.accountStorage.get('historySyncOperations')) as Array<Operation>) || [];
    }
    return this._historySyncOperations;
  }

  public set historySyncOperations(value: Array<Operation>) {
    this.accountStorage?.set('historySyncOperations', JSON.stringify(value));
    this._historySyncOperations = [...value];
  }

  public getHistory(id: string): HistoryItem | null {
    return this.history[id] ?? null;
  }

  public getFilteredHistory(filterFn: (item: HistoryItem) => boolean): AccountHistory<HistoryItem> {
    const current = this.history;
    const filtered: AccountHistory<HistoryItem> = {};

    for (const id in current) {
      const item = current[id];
      if (filterFn(item)) {
        filtered[id] = item;
      }
    }

    return filtered;
  }

  public saveHistory(historyItem: HistoryItem, options?: SaveHistoryOptions): void {
    if (!historyItem || !historyItem.id) return;

    let historyCopy: AccountHistory<HistoryItem>;
    let addressStorage: Storage;

    const hasAccessToStorage = !!this.storage;
    const historyItemHasSigner = !!historyItem.from;
    const historyItemFromAddress = historyItemHasSigner ? this.formatAddress(historyItem.from, false) : '';
    const needToUpdateAddressStorage =
      !options?.toCurrentAccount &&
      historyItemFromAddress &&
      historyItemFromAddress !== this.address &&
      hasAccessToStorage;

    if (needToUpdateAddressStorage) {
      addressStorage = new AccountStorage(toHmacSHA256(historyItemFromAddress));
      historyCopy = JSON.parse(addressStorage.get(this.historyNamespace)) || {};
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

  public removeHistory(id: string): void {
    if (!id) return;

    this.history = omit([id], this.history);
  }

  public clearHistory(): void {
    this.history = {};
  }

  /**
   * Set account data
   * @param account
   */
  public setAccount(account: CreateResult): void {
    this.account = account;
  }

  /**
   * Set signer if the pair is locked (For polkadot js extension usage)
   * @param signer
   */
  public setSigner(signer: Signer): void {
    this.api.setSigner(signer);
    this.signer = signer;
  }

  /**
   * Set storage if it should be used as data storage
   * @param storage
   */
  public setStorage(storage: Storage): void {
    this.storage = storage;
  }

  private getAccountWithOptions(): AccountWithOptions {
    return {
      account: this.accountPair.isLocked ? this.accountPair.address : this.accountPair,
      options: { signer: this.signer },
    };
  }

  public async submitExtrinsic(
    extrinsic: SubmittableExtrinsic,
    signer: KeyringPair,
    historyData?: HistoryItem,
    unsigned = false
  ): Promise<void> {
    const history = (historyData || {}) as History & BridgeHistory & RewardClaimHistory;
    const isNotFaucetOperation = !historyData || historyData.type !== Operation.Faucet;
    if (isNotFaucetOperation && signer) {
      history.from = this.address;
    }
    if (!history.id) {
      history.startTime = Date.now();
      history.id = encrypt(`${history.startTime}`);
    }
    const nonce = await this.api.rpc.system.accountNextIndex(signer.address);
    const { account, options } = this.getAccountWithOptions();
    // TODO: Add ERA only for SWAP
    // Check how to add ONLY as immortal era
    const signedTx = unsigned ? extrinsic : await extrinsic.signAsync(account, { ...options, nonce });
    history.txId = signedTx.hash.toString();
    const extrinsicFn = (callbackFn: (result: ISubmittableResult) => void) => extrinsic.send(callbackFn);
    const unsub = await extrinsicFn((result: ISubmittableResult) => {
      if (isBridgeOperation(history.type)) {
        history.signed = true;
      }
      history.status = first(Object.keys(result.status.toJSON())).toLowerCase();
      this.saveHistory(history);
      if (result.status.isInBlock) {
        history.blockId = result.status.asInBlock.toString();
        this.saveHistory(history);
      } else if (result.status.isFinalized) {
        history.endTime = Date.now();
        this.saveHistory(history);
        result.events.forEach(({ event: { data, method, section } }: any) => {
          if (method === 'Transferred' && section === 'currencies' && isLiquidityPoolOperation(history.type)) {
            const [assetId, from, to, amount] = data;

            const address = assetId.toString();
            const amountFormatted = new FPNumber(amount).toString();
            const amountKey = XOR.address === address ? 'amount' : 'amount2';

            history[amountKey] = amountFormatted;
            this.saveHistory(history);
          }

          if (method === 'RequestRegistered' && isBridgeOperation(history.type)) {
            history.hash = first(data.toJSON());
            this.saveHistory(history);
          }
          if (section === 'system' && method === 'ExtrinsicFailed') {
            history.status = TransactionStatus.Error;
            history.endTime = Date.now();
            const [error] = data;
            if (error.isModule) {
              const decoded = this.api.registry.findMetaError(error.asModule);
              const { documentation } = decoded;
              history.errorMessage = documentation.join(' ').trim();
            } else {
              // Other, CannotLookup, BadOrigin, no extra info
              history.errorMessage = error.toString();
            }
            this.saveHistory(history);
          }
        });
        unsub();
      }
    }).catch((e: Error) => {
      history.status = TransactionStatus.Error;
      history.endTime = Date.now();
      const errorParts = e.message.split(':');
      const errorInfo = last(errorParts).trim();
      history.errorMessage = errorInfo;
      this.saveHistory(history, {
        wasNotGenerated: true,
      });
      throw new Error(errorInfo);
    });
  }

  /**
   * TODO: make it possible to remove this method
   * @param type
   * @param params
   * @returns value * 10 ^ decimals
   */
  public async getNetworkFee(type: Operation, ...params: Array<any>): Promise<CodecString> {
    let extrinsicParams = params;
    let extrinsic = null;
    switch (type) {
      case Operation.Transfer:
        extrinsic = this.api.tx.assets.transfer;
        break;
      case Operation.Swap:
        extrinsic = this.api.tx.liquidityProxy.swap;
        break;
      case Operation.AddLiquidity:
        extrinsic = this.api.tx.poolXyk.depositLiquidity;
        break;
      case Operation.RemoveLiquidity:
        extrinsic = this.api.tx.poolXyk.withdrawLiquidity;
        break;
      case Operation.CreatePair:
        extrinsic = this.api.tx.utility.batchAll;
        extrinsicParams = [
          [
            (this.api.tx.tradingPair as any).register(...params[0].pairCreationArgs),
            this.api.tx.poolXyk.initializePool(...params[0].pairCreationArgs),
            this.api.tx.poolXyk.depositLiquidity(...params[0].addLiquidityArgs),
          ],
        ];
        break;
      case Operation.EthBridgeOutgoing:
        extrinsic = this.api.tx.ethBridge.transferToSidechain;
        break;
      case Operation.EthBridgeIncoming:
        extrinsic = this.api.tx.ethBridge.requestFromSidechain;
        break;
      case Operation.RegisterAsset:
        extrinsic = this.api.tx.assets.register;
        break;
      case Operation.ClaimRewards:
        extrinsic = params[0].extrinsic;
        extrinsicParams = params[0].args;
        break;
      case Operation.TransferAll:
        extrinsic = this.api.tx.utility.batchAll;
        extrinsicParams = params;
        break;
      case Operation.SwapAndSend:
        extrinsic = this.api.tx.utility.batchAll;
        extrinsicParams = [
          [
            (this.api.tx.liquidityProxy as any).swap(...params[0].args),
            (this.api.tx.assets as any).transfer(...params[0].transferArgs),
          ],
        ];
        break;
      case Operation.ReferralReserveXor:
        extrinsic = this.api.tx.referrals.reserve;
        break;
      case Operation.ReferralUnreserveXor:
        extrinsic = this.api.tx.referrals.unreserve;
        break;
      case Operation.ReferralSetInvitedUser:
        extrinsic = this.api.tx.referrals.setReferrer;
        break;
      default:
        throw new Error('Unknown function');
    }
    const { account, options } = this.getAccountWithOptions();
    const res = await (extrinsic(...extrinsicParams) as SubmittableExtrinsic).paymentInfo(account, options);
    return new FPNumber(res.partialFee, XOR.decimals).toCodecString();
  }

  /**
   * Returns an extrinsic with the default or empty params.
   *
   * Actually, network fee value doesn't depend on extrinsic params, so, we can use empty/default values
   * @param operation
   */
  private getEmptyExtrinsic(operation: Operation): SubmittableExtrinsic | null {
    switch (operation) {
      case Operation.AddLiquidity:
        return this.api.tx.poolXyk.depositLiquidity(this.defaultDEXId, '', '', '0', '0', '0', '0');
      case Operation.CreatePair:
        return this.api.tx.utility.batchAll([
          this.api.tx.tradingPair.register(this.defaultDEXId, '', ''),
          this.api.tx.poolXyk.initializePool(this.defaultDEXId, '', ''),
          this.api.tx.poolXyk.depositLiquidity(this.defaultDEXId, '', '', '0', '0', '0', '0'),
        ]);
      case Operation.EthBridgeIncoming:
        return this.api.tx.ethBridge.requestFromSidechain('', { Transaction: 'Transfer' }, 0);
      case Operation.EthBridgeOutgoing:
        return this.api.tx.ethBridge.transferToSidechain('', '', '0', 0);
      case Operation.RegisterAsset:
        try {
          return this.api.tx.assets.register('', '', '0', false, false, null, null);
        } catch (error) {
          // TODO: remove this hack when nft tokens will be supported
          return this.api.tx.assets.register('', '', '0', false);
        }
      case Operation.RemoveLiquidity:
        return this.api.tx.poolXyk.withdrawLiquidity(this.defaultDEXId, '', '', '0', '0', '0');
      case Operation.Swap:
        return this.api.tx.liquidityProxy.swap(
          this.defaultDEXId,
          '',
          '',
          { WithDesiredInput: { desired_amount_in: '0', min_amount_out: '0' } },
          [],
          'Disabled'
        );
      case Operation.SwapAndSend:
        return this.api.tx.utility.batchAll([
          this.api.tx.liquidityProxy.swap(
            this.defaultDEXId,
            '',
            '',
            { WithDesiredInput: { desired_amount_in: '0', min_amount_out: '0' } },
            [],
            'Disabled'
          ),
          this.api.tx.assets.transfer('', '', '0'),
        ]);
      case Operation.Transfer:
        return this.api.tx.assets.transfer('', '', '0');
      case Operation.ClaimVestedRewards:
        return this.api.tx.vestedRewards.claimRewards();
      case Operation.ClaimLiquidityProvisionRewards:
        return this.api.tx.pswapDistribution.claimIncentive();
      case Operation.ClaimExternalRewards:
        return this.api.tx.rewards.claim(
          '0xa8811ca9a2f65a4e21bd82a1e121f2a7f0f94006d0d4bcacf50016aef0b67765692bb7a06367365f13a521ec129c260451a682e658048729ff514e77e4cdffab1b'
        ); // signature mock
      case Operation.ReferralReserveXor:
        return this.api.tx.referrals.reserve('0');
      case Operation.ReferralUnreserveXor:
        return this.api.tx.referrals.unreserve('0');
      case Operation.ReferralSetInvitedUser:
        return this.api.tx.referrals.setReferrer('');
      default:
        return null;
    }
  }

  /**
   * Calc all required network fees. The result will be written to `NetworkFee` object.
   *
   * For example, `api.NetworkFee[Operation.AddLiquidity]`
   */
  public async calcStaticNetworkFees(): Promise<void> {
    const operations = [
      Operation.AddLiquidity,
      Operation.CreatePair,
      Operation.EthBridgeIncoming,
      Operation.EthBridgeOutgoing,
      Operation.RegisterAsset,
      Operation.RemoveLiquidity,
      Operation.Swap,
      Operation.SwapAndSend,
      Operation.Transfer,
      Operation.ClaimVestedRewards,
      Operation.ClaimLiquidityProvisionRewards,
      Operation.ClaimExternalRewards,
      Operation.ReferralReserveXor,
      Operation.ReferralUnreserveXor,
      Operation.ReferralSetInvitedUser,
    ];
    // We don't need to know real account address for checking network fees
    const mockAccountAddress = 'cnRuw2R6EVgQW3e4h8XeiFym2iU17fNsms15zRGcg9YEJndAs';
    for (const operation of operations) {
      const extrinsic = this.getEmptyExtrinsic(operation);
      if (extrinsic) {
        const res = await extrinsic.paymentInfo(mockAccountAddress);
        this.NetworkFee[operation] = new FPNumber(res.partialFee, XOR.decimals).toCodecString();
      }
    }
  }

  public formatAddress(address: string, withSoraPrefix = true): string {
    const publicKey = decodeAddress(address, false);

    if (withSoraPrefix) {
      return encodeAddress(publicKey, this.prefix);
    }
    return encodeAddress(publicKey);
  }

  /**
   * Validate address
   * @param address
   */
  public validateAddress(address: string): boolean {
    try {
      decodeAddress(address, false);
      return true;
    } catch (error) {
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

export enum TransactionStatus {
  Ready = 'ready',
  Broadcast = 'broadcast',
  InBlock = 'inblock',
  Finalized = 'finalized',
  Error = 'error',
  Usurped = 'usurped', // When TX is outdated
  Invalid = 'invalid', // When something happened before sending to network
}

export enum Operation {
  Swap = 'Swap',
  Transfer = 'Transfer',
  AddLiquidity = 'AddLiquidity',
  RemoveLiquidity = 'RemoveLiquidity',
  CreatePair = 'CreatePair',
  Faucet = 'Faucet',
  RegisterAsset = 'RegisterAsset',
  EthBridgeOutgoing = 'EthBridgeOutgoing',
  EthBridgeIncoming = 'EthBridgeIncoming',
  ClaimRewards = 'ClaimRewards',
  /** it's used for calc network fee */
  ClaimVestedRewards = 'ClaimVestedRewards',
  /** it's used for calc network fee */
  ClaimLiquidityProvisionRewards = 'LiquidityProvisionRewards',
  /** it's used for calc network fee */
  ClaimExternalRewards = 'ClaimExternalRewards',
  TransferAll = 'TransferAll', // Batch with transfers
  SwapAndSend = 'SwapAndSend',
  ReferralReserveXor = 'ReferralReserveXor',
  ReferralUnreserveXor = 'ReferralUnreserveXor',
  ReferralSetInvitedUser = 'ReferralSetInvitedUser',
}

export interface History {
  txId?: string;
  type: Operation;
  amount?: string;
  symbol?: string;
  assetAddress?: string;
  id?: string;
  blockId?: string;
  blockHeight?: string;
  to?: string;
  amount2?: string;
  symbol2?: string;
  asset2Address?: string;
  decimals?: number;
  decimals2?: number;
  startTime?: number;
  endTime?: number;
  from?: string;
  status?: string;
  errorMessage?: string;
  liquiditySource?: string;
  liquidityProviderFee?: CodecString;
  soraNetworkFee?: CodecString;
  payload?: any; // can be used to integrate with third-party services
}
