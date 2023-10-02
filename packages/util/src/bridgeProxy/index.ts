import { map, combineLatest } from 'rxjs';
import { FPNumber } from '@sora-substrate/math';

import type { Observable, Signer } from '@polkadot/types/types';
import type { CreateResult } from '@polkadot/ui-keyring/types';
import type { CodecString } from '@sora-substrate/math';

import { EthBridgeApi } from './eth';
import { EvmBridgeApi } from './evm';
import { SubBridgeApi } from './sub';

import { BridgeNetworkType } from './consts';
import { SubNetwork } from './sub/consts';
import type { Api } from '../api';
import type { Storage } from '../storage';
import type { SupportedApps } from './types';

export class BridgeProxyModule<T> {
  constructor(private readonly root: Api<T>) {}

  public readonly eth = new EthBridgeApi<T>();
  public readonly evm = new EvmBridgeApi<T>();
  public readonly sub = new SubBridgeApi<T>();

  public initAccountStorage() {
    this.eth.initAccountStorage();
    this.evm.initAccountStorage();
    this.sub.initAccountStorage();
  }

  public setStorage(storage: Storage): void {
    this.eth.setStorage(storage);
    this.evm.setStorage(storage);
    this.sub.setStorage(storage);
  }

  public setSigner(signer: Signer): void {
    this.eth.setSigner(signer);
    this.evm.setSigner(signer);
    this.sub.setSigner(signer);
  }

  public setAccount(account: CreateResult): void {
    this.eth.setAccount(account);
    this.evm.setAccount(account);
    this.sub.setAccount(account);
  }

  public logout(): void {
    this.eth.logout();
    this.evm.logout();
    this.sub.logout();
  }

  public async getListApps(): Promise<SupportedApps> {
    const apps: SupportedApps = {
      [BridgeNetworkType.Eth]: {},
      [BridgeNetworkType.Evm]: {},
      [BridgeNetworkType.Sub]: [],
    };

    try {
      const data = await this.root.api.rpc.bridgeProxy.listApps();

      data.forEach((appInfo) => {
        if (appInfo.isEvm) {
          const [genericNetworkId, evmAppInfo] = appInfo.asEvm;
          const id = genericNetworkId.isEvm
            ? genericNetworkId.asEvm.toNumber()
            : genericNetworkId.asEvmLegacy.toNumber();
          const type = genericNetworkId.isEvm ? BridgeNetworkType.Evm : BridgeNetworkType.Eth;
          const kind = evmAppInfo.appKind.toString();
          const address = evmAppInfo.evmAddress.toString();

          if (!apps[type][id]) apps[type][id] = {};

          apps[type][id][kind] = address;
        } else {
          const genericNetworkId = appInfo.asSub;
          const type = BridgeNetworkType.Sub;
          const subNetwork = genericNetworkId.asSub;
          const name = subNetwork.toString();

          if (subNetwork.isRococo) {
            // adding parachains we work through relaychain
          }

          apps[type].push(name as SubNetwork);
        }
      });

      return apps;
    } catch {
      return apps;
    }
  }

  public async isAssetTransferLimited(assetAddress: string): Promise<boolean> {
    const result = await this.root.api.query.bridgeProxy.limitedAssets(assetAddress);

    return result.isTrue;
  }

  public getTransferLimitObservable(): Observable<CodecString> {
    return this.root.apiRx.query.bridgeProxy
      .transferLimit()
      .pipe(map((limitSettings) => limitSettings.maxAmount.toString()));
  }

  public getConsumedTransferLimitObservable(): Observable<CodecString> {
    return this.root.apiRx.query.bridgeProxy.consumedTransferLimit().pipe(map((limit) => limit.toString()));
  }

  public getCurrentTransferLimitObservable(): Observable<CodecString> {
    return combineLatest([this.getTransferLimitObservable(), this.getConsumedTransferLimitObservable()]).pipe(
      map(([maxLimit, consumedLimit]) => {
        const max = FPNumber.fromCodecValue(maxLimit);
        const consumed = FPNumber.fromCodecValue(consumedLimit);
        const current = max.sub(consumed);
        const checked = FPNumber.isGreaterThan(current, FPNumber.ZERO) ? current : FPNumber.ZERO;

        return checked.toCodecString();
      })
    );
  }

  public async getTransferLimitUnlockSchedule(): Promise<{ blockNumber: number; amount: CodecString }[]> {
    const data = await this.root.api.query.bridgeProxy.transferLimitUnlockSchedule.entries();
    const unlocks = data
      .map(([key, value]) => {
        const blockNumber = key.args[0].toNumber();
        const amount = value.toString();

        return { blockNumber, amount };
      })
      .sort((a, b) => a.blockNumber - b.blockNumber);

    return unlocks;
  }
}
