import last from 'lodash/fp/last';
import first from 'lodash/fp/first';
import omit from 'lodash/fp/omit';
import { Observable, Subscriber } from 'rxjs';
import { decodeAddress, encodeAddress } from '@polkadot/util-crypto';
import { CodecString, FPNumber } from '@sora-substrate/math';
import { connection } from '@sora-substrate/connection';
import type { ApiPromise, ApiRx } from '@polkadot/api';
import type { CreateResult } from '@polkadot/ui-keyring/types';
import type { KeyringPair, KeyringPair$Json } from '@polkadot/keyring/types';
import type { Signer, ISubmittableResult } from '@polkadot/types/types';
import type { SubmittableExtrinsic } from '@polkadot/api-base/types';
import type { AddressOrPair, SignerOptions } from '@polkadot/api/submittable/types';
import type { CommonPrimitivesAssetId32 } from '@polkadot/types/lookup';

import { AccountStorage, Storage } from './storage';
import { DexId } from './dex/consts';
import { XOR } from './assets/consts';
import { encrypt, toHmacSHA256 } from './crypto';
import { ReceiverHistoryItem } from './swap/types';
import type { EthHistory } from './bridgeProxy/eth/types';
import type { EvmHistory } from './bridgeProxy/evm/types';
import type { SubHistory } from './bridgeProxy/sub/types';
import type { RewardClaimHistory } from './rewards/types';
import type { OriginalIdentity, StakingHistory } from './staking/types';
import type { LimitOrderHistory } from './orderBook/types';

type AccountWithOptions = {
  account: AddressOrPair;
  options: Partial<SignerOptions>;
};

export type SaveHistoryOptions = {
  wasNotGenerated?: boolean;
  toCurrentAccount?: boolean;
};

export type ErrorMessageFields = {
  section: string;
  name: string;
};

export type NetworkFeesObject = {
  [key in Operation]: CodecString;
};

export type IBridgeTransaction = EvmHistory | SubHistory | EthHistory;

export type HistoryItem = History | IBridgeTransaction | RewardClaimHistory | StakingHistory | LimitOrderHistory;

export type FnResult = void | Observable<ExtrinsicEvent>;

export type ExtrinsicEvent = [TransactionStatus, HistoryItem];

interface ISubmitExtrinsic<T> {
  submitExtrinsic(
    extrinsic: SubmittableExtrinsic<'promise'>,
    signer: KeyringPair,
    historyData?: HistoryItem,
    unsigned?: boolean
  ): Promise<T>;
}

export type AccountHistory<T> = {
  [key: string]: T;
};

export const isEthOperation = (operation: Operation) =>
  [Operation.EthBridgeIncoming, Operation.EthBridgeOutgoing].includes(operation);

export const isEvmOperation = (operation: Operation) =>
  [Operation.EvmIncoming, Operation.EvmOutgoing].includes(operation);

export const isSubstrateOperation = (operation: Operation) =>
  [Operation.SubstrateIncoming, Operation.SubstrateOutgoing].includes(operation);

const isLiquidityPoolOperation = (operation: Operation) =>
  [Operation.AddLiquidity, Operation.RemoveLiquidity].includes(operation);

export const KeyringType = 'sr25519';

// We don't need to know real account address for checking network fees
const mockAccountAddress = 'cnRuw2R6EVgQW3e4h8XeiFym2iU17fNsms15zRGcg9YEJndAs';

export class BaseApi<T = void> implements ISubmitExtrinsic<T> {
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
    [Operation.EvmIncoming]: '0',
    [Operation.EvmOutgoing]: '0',
    [Operation.SubstrateIncoming]: '0',
    [Operation.SubstrateOutgoing]: '0',
    [Operation.RegisterAsset]: '0',
    [Operation.RemoveLiquidity]: '0',
    [Operation.Swap]: '0',
    [Operation.SwapAndSend]: '0',
    [Operation.SwapTransferBatch]: '0',
    [Operation.Transfer]: '0',
    [Operation.ClaimVestedRewards]: '0',
    [Operation.ClaimCrowdloanRewards]: '0',
    [Operation.ClaimLiquidityProvisionRewards]: '0',
    [Operation.ClaimExternalRewards]: '0',
    [Operation.ReferralReserveXor]: '0',
    [Operation.ReferralUnreserveXor]: '0',
    [Operation.ReferralSetInvitedUser]: '0',
    [Operation.DemeterFarmingDepositLiquidity]: '0',
    [Operation.DemeterFarmingWithdrawLiquidity]: '0',
    [Operation.DemeterFarmingStakeToken]: '0',
    [Operation.DemeterFarmingUnstakeToken]: '0',
    [Operation.DemeterFarmingGetRewards]: '0',
    [Operation.CeresLiquidityLockerLockLiquidity]: '0',
    [Operation.StakingBond]: '0',
    [Operation.StakingBondExtra]: '0',
    [Operation.StakingRebond]: '0',
    [Operation.StakingUnbond]: '0',
    [Operation.StakingWithdrawUnbonded]: '0',
    [Operation.StakingNominate]: '0',
    [Operation.StakingChill]: '0',
    [Operation.StakingSetPayee]: '0',
    [Operation.StakingSetController]: '0',
    [Operation.StakingPayout]: '0',
  } as NetworkFeesObject;

  public readonly prefix = 69;

  private _history: AccountHistory<HistoryItem> = {};

  protected signer?: Signer;
  public storage?: Storage; // common data storage
  public accountStorage?: AccountStorage; // account data storage
  public account: CreateResult;
  /** If `true` you might subscribe on extrinsic statuses (`false` by default) */
  public shouldObservableBeUsed = false;
  /** If `true` it'll be locked during extrinsics submit (`false` by default) */
  public shouldPairBeLocked = false;

  constructor(public readonly historyNamespace = 'history') {}

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
    this.account = undefined;
    this.accountStorage = undefined;
    this.signer = undefined;
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
   * Unlock pair to sign tx
   * @param password
   */
  public unlockPair(password: string): void {
    this.account.pair.unlock(password);
  }

  /**
   * Lock pair
   */
  public lockPair(): void {
    if (!this.account.pair?.isLocked) {
      this.account.pair.lock();
    }
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

  public async submitApiExtrinsic(
    api: ApiPromise,
    extrinsic: SubmittableExtrinsic<'promise'>,
    signer: KeyringPair,
    historyData?: HistoryItem,
    unsigned = false
  ): Promise<T> {
    const nonce = await api.rpc.system.accountNextIndex(signer.address);
    const { account, options } = this.getAccountWithOptions();
    // Signing the transaction
    const signedTx = unsigned ? extrinsic : await extrinsic.signAsync(account, { ...options, nonce });

    // we should lock pair, if it's not locked
    this.shouldPairBeLocked && this.lockPair();

    const isNotFaucetOperation = !historyData || historyData.type !== Operation.Faucet;

    // history initial params
    const from = isNotFaucetOperation && signer ? this.address : undefined;
    const txId = signedTx.hash.toString();
    const id = historyData.id ?? txId;
    const type = historyData.type;
    const startTime = historyData.startTime ?? Date.now();
    // history required params for each update
    const requiredParams = { id, from, type };

    this.saveHistory({ ...historyData, ...requiredParams, txId, startTime });

    const extrinsicFn = async (subscriber?: Subscriber<ExtrinsicEvent>) => {
      const unsub = await extrinsic
        .send((result: ISubmittableResult) => {
          const status = first(Object.keys(result.status.toJSON())).toLowerCase() as TransactionStatus;
          const updated: any = {};

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
                updated.assetAddress = ((assetId as CommonPrimitivesAssetId32).code ?? assetId).toString();
              } else if (
                method === 'Transfer' &&
                ['balances', 'tokens'].includes(section) &&
                isLiquidityPoolOperation(type)
              ) {
                // balances.Transfer hasn't assetId field
                const [amount, to, from, assetId] = data.slice().reverse();
                const amountFormatted = new FPNumber(amount).toString();
                const history = this.getHistory(id);
                // events for 1st token and 2nd token are ordered in extrinsic
                const amountKey = !history.amount ? 'amount' : 'amount2';
                updated[amountKey] = amountFormatted;
              } else if (
                (method === 'RequestRegistered' && isEthOperation(type)) ||
                (method === 'RequestStatusUpdate' && (isEvmOperation(type) || isSubstrateOperation(type)))
              ) {
                updated.hash = first(data.toJSON() as any);
              } else if (section === 'system' && method === 'ExtrinsicFailed') {
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

          subscriber?.next([status, this.getHistory(id)]);

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

          subscriber?.next([status, this.getHistory(id)]);
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
   * Returns an extrinsic with the default or empty params.
   *
   * Actually, network fee value doesn't depend on extrinsic params, so, we can use empty/default values
   * @param operation
   */
  private getEmptyExtrinsic(operation: Operation): SubmittableExtrinsic<'promise'> | null {
    try {
      switch (operation) {
        case Operation.AddLiquidity:
          return this.api.tx.poolXYK.depositLiquidity(DexId.XOR, '', '', 0, 0, 0, 0);
        case Operation.CreatePair:
          return this.api.tx.utility.batchAll([
            this.api.tx.tradingPair.register(DexId.XOR, '', ''),
            this.api.tx.poolXYK.initializePool(DexId.XOR, '', ''),
            this.api.tx.poolXYK.depositLiquidity(DexId.XOR, '', '', 0, 0, 0, 0),
          ]);
        case Operation.EthBridgeIncoming:
        case Operation.EvmIncoming:
        case Operation.SubstrateIncoming:
        case Operation.EvmOutgoing:
        case Operation.SubstrateOutgoing:
          return null;
        case Operation.EthBridgeOutgoing:
          return this.api.tx.ethBridge.transferToSidechain('', '', 0, 0);
        case Operation.RegisterAsset:
          return this.api.tx.assets.register('', '', 0, false, false, null, null);
        case Operation.RemoveLiquidity:
          return this.api.tx.poolXYK.withdrawLiquidity(DexId.XOR, '', '', 0, 0, 0);
        case Operation.Swap:
          return this.api.tx.liquidityProxy.swap(
            DexId.XOR,
            '',
            '',
            { WithDesiredInput: { desiredAmountIn: '0', minAmountOut: '0' } },
            [],
            'Disabled'
          );
        case Operation.SwapAndSend:
          return this.api.tx.liquidityProxy.swapTransfer(
            '',
            DexId.XOR,
            '',
            '',
            { WithDesiredInput: { desiredAmountIn: '0', minAmountOut: '0' } },
            [],
            'Disabled'
          );
        case Operation.SwapTransferBatch:
          return this.api.tx.liquidityProxy.swapTransferBatch([], '', '', [], 'Disabled');
        case Operation.Transfer:
          return this.api.tx.assets.transfer('', '', 0);
        case Operation.ClaimVestedRewards:
          return this.api.tx.vestedRewards.claimRewards();
        case Operation.ClaimCrowdloanRewards:
          return this.api.tx.vestedRewards.claimCrowdloanRewards(XOR.address);
        case Operation.ClaimLiquidityProvisionRewards:
          return this.api.tx.pswapDistribution.claimIncentive();
        case Operation.ClaimExternalRewards:
          return this.api.tx.rewards.claim(
            '0xa8811ca9a2f65a4e21bd82a1e121f2a7f0f94006d0d4bcacf50016aef0b67765692bb7a06367365f13a521ec129c260451a682e658048729ff514e77e4cdffab1b'
          ); // signature mock
        case Operation.ReferralReserveXor:
          return this.api.tx.referrals.reserve(0);
        case Operation.ReferralUnreserveXor:
          return this.api.tx.referrals.unreserve(0);
        case Operation.ReferralSetInvitedUser:
          return this.api.tx.referrals.setReferrer('');
        case Operation.DemeterFarmingDepositLiquidity:
          return this.api.tx.demeterFarmingPlatform.deposit(XOR.address, XOR.address, XOR.address, true, 0);
        case Operation.DemeterFarmingWithdrawLiquidity:
          return this.api.tx.demeterFarmingPlatform.withdraw(XOR.address, XOR.address, XOR.address, 0, true);
        case Operation.DemeterFarmingStakeToken:
          return this.api.tx.demeterFarmingPlatform.deposit(XOR.address, XOR.address, XOR.address, false, 0);
        case Operation.DemeterFarmingUnstakeToken:
          return this.api.tx.demeterFarmingPlatform.withdraw(XOR.address, XOR.address, XOR.address, 0, false);
        case Operation.DemeterFarmingGetRewards:
          return this.api.tx.demeterFarmingPlatform.getRewards(XOR.address, XOR.address, XOR.address, true);
        case Operation.CeresLiquidityLockerLockLiquidity:
          return this.api.tx.ceresLiquidityLocker.lockLiquidity(XOR.address, XOR.address, 0, 100, false);
        case Operation.StakingBond:
          return this.api.tx.staking.bond(mockAccountAddress, 0, { Account: mockAccountAddress });
        case Operation.StakingBondExtra:
          return this.api.tx.staking.bondExtra(0);
        case Operation.StakingRebond:
          return this.api.tx.staking.rebond(0);
        case Operation.StakingUnbond:
          return this.api.tx.staking.unbond(0);
        case Operation.StakingWithdrawUnbonded:
          return this.api.tx.staking.withdrawUnbonded(0);
        case Operation.StakingNominate:
          return this.api.tx.staking.nominate([mockAccountAddress]);
        case Operation.StakingChill:
          return this.api.tx.staking.chill();
        case Operation.StakingSetPayee:
          return this.api.tx.staking.setPayee({ Account: mockAccountAddress });
        case Operation.StakingSetController:
          return this.api.tx.staking.setController(mockAccountAddress);
        case Operation.StakingPayout:
          return this.api.tx.staking.payoutStakers(mockAccountAddress, 3449);
        default:
          return null;
      }
    } catch {
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
      Operation.EvmIncoming,
      Operation.EvmOutgoing,
      Operation.SubstrateIncoming,
      Operation.SubstrateOutgoing,
      Operation.RegisterAsset,
      Operation.RemoveLiquidity,
      Operation.Swap,
      Operation.SwapAndSend,
      Operation.SwapTransferBatch,
      Operation.Transfer,
      Operation.ClaimVestedRewards,
      Operation.ClaimCrowdloanRewards,
      Operation.ClaimLiquidityProvisionRewards,
      Operation.ClaimExternalRewards,
      Operation.ReferralReserveXor,
      Operation.ReferralUnreserveXor,
      Operation.ReferralSetInvitedUser,
      Operation.DemeterFarmingDepositLiquidity,
      Operation.DemeterFarmingWithdrawLiquidity,
      Operation.DemeterFarmingStakeToken,
      Operation.DemeterFarmingUnstakeToken,
      Operation.DemeterFarmingGetRewards,
      Operation.CeresLiquidityLockerLockLiquidity,
      Operation.StakingBond,
      Operation.StakingBondExtra,
      Operation.StakingRebond,
      Operation.StakingUnbond,
      Operation.StakingWithdrawUnbonded,
      Operation.StakingNominate,
      Operation.StakingChill,
      Operation.StakingSetPayee,
      Operation.StakingSetController,
      Operation.StakingPayout,
    ];

    const operationsPromises = operations.map(async (operation) => {
      const extrinsic = this.getEmptyExtrinsic(operation);

      if (extrinsic) {
        this.NetworkFee[operation] = await this.getTransactionFee(extrinsic);
      }
    });

    await Promise.allSettled(operationsPromises);
  }

  public async getTransactionFee(extrinsic: SubmittableExtrinsic<'promise'>): Promise<CodecString> {
    try {
      const res = await extrinsic.paymentInfo(mockAccountAddress);

      return new FPNumber(res.partialFee, XOR.decimals).toCodecString();
    } catch {
      // extrinsic is not supported in chain
      return '0';
    }
  }

  /**
   * Format address
   * @param withSoraPrefix `true` by default
   */
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

  /**
   * Generate unique string from value
   * @param value
   * @returns
   */
  public encrypt(value: string): string {
    return encrypt(value);
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
  EvmOutgoing = 'EvmOutgoing',
  EvmIncoming = 'EvmIncoming',
  SubstrateOutgoing = 'SubstrateOutgoing',
  SubstrateIncoming = 'SubstrateIncoming',
  ClaimRewards = 'ClaimRewards',
  /** it's used for calc network fee */
  ClaimVestedRewards = 'ClaimVestedRewards',
  /** it's used for calc network fee */
  ClaimCrowdloanRewards = 'ClaimCrowdloanRewards',
  /** it's used for calc network fee */
  ClaimLiquidityProvisionRewards = 'LiquidityProvisionRewards',
  /** it's used for calc network fee */
  ClaimExternalRewards = 'ClaimExternalRewards',
  /** it's used for internal needs as the MST batch with transfers  */
  TransferAll = 'TransferAll',
  /** Complex Swap */
  SwapAndSend = 'SwapAndSend',
  SwapTransferBatch = 'SwapTransferBatch',
  /** Referral System */
  ReferralReserveXor = 'ReferralReserveXor',
  ReferralUnreserveXor = 'ReferralUnreserveXor',
  ReferralSetInvitedUser = 'ReferralSetInvitedUser',
  /** Staking */
  StakingBond = 'StakingBond',
  StakingBondExtra = 'StakingBondExtra',
  StakingRebond = 'StakingRebond',
  StakingUnbond = 'StakingUnbond',
  StakingWithdrawUnbonded = 'StakingWithdrawUnbonded',
  StakingNominate = 'StakingNominate',
  StakingChill = 'StakingChill',
  StakingSetPayee = 'StakingSetPayee',
  StakingSetController = 'StakingSetController',
  StakingPayout = 'StakingPayout',
  /** Demeter Farming Platform  */
  DemeterFarmingDepositLiquidity = 'DemeterFarmingDepositLiquidity',
  DemeterFarmingWithdrawLiquidity = 'DemeterFarmingWithdrawLiquidity',
  DemeterFarmingStakeToken = 'DemeterFarmingStakeToken',
  DemeterFarmingUnstakeToken = 'DemeterFarmingUnstakeToken',
  DemeterFarmingGetRewards = 'DemeterFarmingGetRewards',
  /** Ceres Liquidity Locker  */
  CeresLiquidityLockerLockLiquidity = 'CeresLiquidityLockerLockLiquidity',
  /** Order Book */
  PlaceLimitOrder = 'PlaceLimitOrder',
  CancelLimitOrder = 'CancelLimitOrder',
  CancelLimitOrders = 'CancelLimitOrders',
}

export interface History {
  txId?: string;
  type: Operation;
  amount?: string;
  symbol?: string;
  assetAddress?: string;
  id?: string;
  blockId?: string;
  blockHeight?: number;
  to?: string;
  receivers?: Array<ReceiverHistoryItem>;
  amount2?: string;
  symbol2?: string;
  asset2Address?: string;
  decimals?: number;
  decimals2?: number;
  startTime?: number;
  endTime?: number;
  from?: string;
  status?: string;
  errorMessage?: ErrorMessageFields | string;
  liquiditySource?: string;
  liquidityProviderFee?: CodecString;
  soraNetworkFee?: CodecString;
  payload?: any; // can be used to integrate with third-party services
}

export interface OnChainIdentity {
  legalName: string;
  approved: boolean;
  identity: OriginalIdentity;
}
