import last from 'lodash/fp/last';
import first from 'lodash/fp/first';
import { Observable, Subscriber } from 'rxjs';
import { CodecString, FPNumber } from '@sora-substrate/math';
import { Connection } from '@sora-substrate/connection';
import type { ApiPromise, ApiRx } from '@polkadot/api';
import type { KeyringPair } from '@polkadot/keyring/types';
import type { Signer, ISubmittableResult } from '@polkadot/types/types';
import type { SubmittableExtrinsic } from '@polkadot/api-base/types';
import type { CommonPrimitivesAssetId32 } from '@polkadot/types/lookup';

import { DexId } from './dex/consts';
import { XOR } from './assets/consts';
import { Formatters } from './formatters';

import type { BridgeHistory } from './BridgeApi';
import type { RewardClaimHistory } from './rewards/types';

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
  SwapAndSend = 'SwapAndSend',
  ReferralReserveXor = 'ReferralReserveXor',
  ReferralUnreserveXor = 'ReferralUnreserveXor',
  ReferralSetInvitedUser = 'ReferralSetInvitedUser',
  /** Demeter Farming Platform  */
  DemeterFarmingDepositLiquidity = 'DemeterFarmingDepositLiquidity',
  DemeterFarmingWithdrawLiquidity = 'DemeterFarmingWithdrawLiquidity',
  DemeterFarmingStakeToken = 'DemeterFarmingStakeToken',
  DemeterFarmingUnstakeToken = 'DemeterFarmingUnstakeToken',
  DemeterFarmingGetRewards = 'DemeterFarmingGetRewards',
  /** Ceres Liquidity Locker  */
  CeresLiquidityLockerLockLiquidity = 'CeresLiquidityLockerLockLiquidity',
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
  errorMessage?: ErrorMessageFields | string;
  liquiditySource?: string;
  liquidityProviderFee?: CodecString;
  soraNetworkFee?: CodecString;
  payload?: any; // can be used to integrate with third-party services
}

export type ErrorMessageFields = {
  section: string;
  name: string;
};

export type NetworkFeesObject = {
  [key in Operation]: CodecString;
};

export type HistoryItem = History | BridgeHistory | RewardClaimHistory;

export type FnResult = void | Observable<ExtrinsicEvent>;

export type ExtrinsicEvent = ['inblock' | 'finalized' | 'error', History & BridgeHistory & RewardClaimHistory];

export const isBridgeOperation = (operation: Operation) =>
  [Operation.EthBridgeIncoming, Operation.EthBridgeOutgoing].includes(operation);

export const isEvmOperation = (operation: Operation) =>
  [Operation.EvmIncoming, Operation.EvmOutgoing].includes(operation);

const isLiquidityPoolOperation = (operation: Operation) =>
  [Operation.AddLiquidity, Operation.RemoveLiquidity].includes(operation);

interface ISubmitExtrinsic<T> {
  submitExtrinsic(
    extrinsic: SubmittableExtrinsic<'promise'>,
    accountPair: KeyringPair,
    historyData?: HistoryItem,
    unsigned?: boolean
  ): Promise<T>;
}

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
    [Operation.RegisterAsset]: '0',
    [Operation.RemoveLiquidity]: '0',
    [Operation.Swap]: '0',
    [Operation.SwapAndSend]: '0',
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
  } as NetworkFeesObject;

  /** If `true` you might subscribe on extrinsic statuses */
  public shouldObservableBeUsed = false;

  constructor(public readonly connection: Connection) {}

  public get api(): ApiPromise {
    return this.connection.api;
  }

  public get apiRx(): ApiRx {
    return this.connection.api.rx as ApiRx;
  }

  /**
   * Set signer if the pair is locked (For polkadot js extension usage)
   * @param signer
   */
  public setSigner(signer: Signer): void {
    this.api.setSigner(signer);
  }

  public async signExtrinsic(extrinsic: SubmittableExtrinsic<'promise'>, accountPair: KeyringPair) {
    const nonce = await this.api.rpc.system.accountNextIndex(accountPair.address);
    // Account pair or address
    const account = accountPair.isLocked ? accountPair.address : accountPair;
    // Signing the transaction
    const signedTx = await extrinsic.signAsync(account, { nonce });
    // we should lock pair, if it's not locked
    if (!accountPair.isLocked) {
      accountPair.lock();
    }

    return signedTx;
  }

  public async submitExtrinsic(
    extrinsic: SubmittableExtrinsic<'promise'>,
    accountPair?: KeyringPair,
    historyData?: HistoryItem
  ): Promise<T> {
    const signedTx = accountPair ? await this.signExtrinsic(extrinsic, accountPair) : extrinsic;

    const history = (historyData || {}) as History & BridgeHistory & RewardClaimHistory;
    const isNotFaucetOperation = !historyData || historyData.type !== Operation.Faucet;

    if (isNotFaucetOperation && accountPair) {
      history.from = Formatters.formatAddress(accountPair.address);
    }

    history.txId = signedTx.hash.toString();

    // History id value will be equal to transaction hash
    if (!history.id) {
      history.startTime = Date.now();
      history.id = history.txId;
    }

    const extrinsicFn = async (subscriber?: Subscriber<ExtrinsicEvent>) => {
      const unsub = await signedTx
        .send((result: ISubmittableResult) => {
          history.status = first(Object.keys(result.status.toJSON())).toLowerCase();
          if (result.status.isInBlock) {
            history.blockId = result.status.asInBlock.toString();
            subscriber?.next(['inblock', history]);
          } else if (result.status.isFinalized) {
            history.endTime = Date.now();
            result.events.forEach(({ event: { data, method, section } }: any) => {
              if (method === 'FeeWithdrawn' && section === 'xorFee') {
                const [_, soraNetworkFee] = data;
                history.soraNetworkFee = soraNetworkFee.toString();
              } else if (method === 'AssetRegistered' && section === 'assets') {
                const [assetId, _] = data;
                history.assetAddress = ((assetId as CommonPrimitivesAssetId32).code ?? assetId).toString();
              } else if (
                method === 'Transfer' &&
                ['balances', 'tokens'].includes(section) &&
                isLiquidityPoolOperation(history.type)
              ) {
                // balances.Transfer hasn't assetId field
                const [amount, to, from, assetId] = data.slice().reverse();
                const amountFormatted = new FPNumber(amount).toString();
                // events for 1st token and 2nd token are ordered in extrinsic
                const amountKey = !history.amount ? 'amount' : 'amount2';
                history[amountKey] = amountFormatted;
              } else if (
                (method === 'RequestRegistered' && isBridgeOperation(history.type)) ||
                (method === 'RequestStatusUpdate' && isEvmOperation(history.type))
              ) {
                history.hash = first(data.toJSON());
              } else if (section === 'system' && method === 'ExtrinsicFailed') {
                history.status = TransactionStatus.Error;
                history.endTime = Date.now();
                const [error] = data;
                if (error.isModule) {
                  const decoded = this.api.registry.findMetaError(error.asModule);
                  const { docs, section, name } = decoded;
                  history.errorMessage = section && name ? { name, section } : docs.join(' ').trim();
                } else {
                  // Other, CannotLookup, BadOrigin, no extra info
                  history.errorMessage = error.toString();
                }
              }
            });
            const state = history.status === TransactionStatus.Error ? 'error' : 'finalized';
            subscriber?.next([state, history]);
            subscriber?.complete();
            unsub();
          }
        })
        .catch((e: Error) => {
          // override history 'id' to 'startTime', because we will delete history 'txId' below
          history.id = Formatters.encrypt(`${history.startTime}`);
          history.status = TransactionStatus.Error;
          history.endTime = Date.now();
          const errorParts = e?.message?.split(':');
          const errorInfo = last(errorParts)?.trim();
          history.errorMessage = errorInfo;
          subscriber?.next(['error', history]);
          subscriber?.complete();
          throw new Error(errorInfo);
        });
    };

    // if (this.shouldObservableBeUsed) {
    return new Observable<ExtrinsicEvent>((subscriber) => {
      extrinsicFn(subscriber);
    }) as unknown as T; // T is `Observable<ExtrinsicEvent>` here
    // }
    // return extrinsicFn() as unknown as Promise<T>; // T is `void` here
  }

  /**
   * TODO: make it possible to remove this method
   * @param type
   * @param params
   * @returns value * 10 ^ decimals
   */
  public async getNetworkFee(type: Operation, ...params: Array<any>): Promise<CodecString> {
    let extrinsicParams: any = params;
    let extrinsic: any = null;
    switch (type) {
      case Operation.Transfer:
        extrinsic = this.api.tx.assets.transfer;
        break;
      case Operation.Swap:
        extrinsic = this.api.tx.liquidityProxy.swap;
        break;
      case Operation.AddLiquidity:
        extrinsic = this.api.tx.poolXYK.depositLiquidity;
        break;
      case Operation.RemoveLiquidity:
        extrinsic = this.api.tx.poolXYK.withdrawLiquidity;
        break;
      case Operation.CreatePair:
        extrinsic = this.api.tx.utility.batchAll;
        extrinsicParams = [
          [
            (this.api.tx.tradingPair as any).register(...params[0].pairCreationArgs),
            (this.api.tx.poolXYK as any).initializePool(...params[0].pairCreationArgs),
            (this.api.tx.poolXYK as any).depositLiquidity(...params[0].addLiquidityArgs),
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
        extrinsic = params[0];
        extrinsicParams = null;
        break;
      case Operation.SwapAndSend:
        extrinsic = this.api.tx.liquidityProxy.swapTransfer;
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
      case Operation.DemeterFarmingDepositLiquidity:
      case Operation.DemeterFarmingStakeToken:
        extrinsic = this.api.tx.demeterFarmingPlatform.deposit;
        break;
      case Operation.DemeterFarmingWithdrawLiquidity:
      case Operation.DemeterFarmingUnstakeToken:
        extrinsic = this.api.tx.demeterFarmingPlatform.withdraw;
        break;
      case Operation.DemeterFarmingGetRewards:
        extrinsic = this.api.tx.demeterFarmingPlatform.getRewards;
        break;
      case Operation.CeresLiquidityLockerLockLiquidity:
        extrinsic = this.api.tx.ceresLiquidityLocker.lockLiquidity;
        break;
      default:
        throw new Error('Unknown function');
    }
    const tx =
      type === Operation.TransferAll ? extrinsic : (extrinsic(...extrinsicParams) as SubmittableExtrinsic<'promise'>);
    const res = await tx.paymentInfo(mockAccountAddress);
    return new FPNumber(res.partialFee, XOR.decimals).toCodecString();
  }

  /**
   * Returns an extrinsic with the default or empty params.
   *
   * Actually, network fee value doesn't depend on extrinsic params, so, we can use empty/default values
   * @param operation
   */
  private getEmptyExtrinsic(operation: Operation): SubmittableExtrinsic<'promise'> | null {
    switch (operation) {
      case Operation.AddLiquidity:
        return this.api.tx.poolXYK.depositLiquidity(DexId.XOR, '', '', '0', '0', '0', '0');
      case Operation.CreatePair:
        return this.api.tx.utility.batchAll([
          this.api.tx.tradingPair.register(DexId.XOR, '', ''),
          this.api.tx.poolXYK.initializePool(DexId.XOR, '', ''),
          this.api.tx.poolXYK.depositLiquidity(DexId.XOR, '', '', '0', '0', '0', '0'),
        ]);
      case Operation.EthBridgeIncoming:
        return this.api.tx.ethBridge.requestFromSidechain('', { Transaction: 'Transfer' }, 0);
      case Operation.EthBridgeOutgoing:
        return this.api.tx.ethBridge.transferToSidechain('', '', '0', 0);
      case Operation.RegisterAsset:
        return this.api.tx.assets.register('', '', '0', false, false, null, null);
      case Operation.RemoveLiquidity:
        return this.api.tx.poolXYK.withdrawLiquidity(DexId.XOR, '', '', '0', '0', '0');
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
      case Operation.Transfer:
        return this.api.tx.assets.transfer('', '', '0');
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
        return this.api.tx.referrals.reserve('0');
      case Operation.ReferralUnreserveXor:
        return this.api.tx.referrals.unreserve('0');
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
    ];

    await Promise.all(
      operations.map(async (operation) => {
        const extrinsic = this.getEmptyExtrinsic(operation);

        if (extrinsic) {
          const res = await extrinsic.paymentInfo(mockAccountAddress);
          this.NetworkFee[operation] = new FPNumber(res.partialFee, XOR.decimals).toCodecString();
        }
      })
    );
  }
}
