import type { Signer } from '@polkadot/types/types';
import type { CreateResult } from '@polkadot/ui-keyring/types';

import { EvmBridgeApi } from './evm';
import { SubBridgeApi } from './sub';

import { BridgeNetworkType } from './consts';
import { SubNetwork } from './sub/consts';
import type { Api } from '../api';
import type { Storage } from '../storage';
import type { SupportedApps } from './types';

export class BridgeProxyModule<T> {
  constructor(private readonly root: Api<T>) {}

  public readonly evm = new EvmBridgeApi<T>();
  public readonly sub = new SubBridgeApi<T>();

  public initAccountStorage() {
    this.evm.initAccountStorage();
    this.sub.initAccountStorage();
  }

  public setStorage(storage: Storage): void {
    this.evm.setStorage(storage);
    this.sub.setStorage(storage);
  }

  public setSigner(signer: Signer): void {
    this.evm.setSigner(signer);
    this.sub.setSigner(signer);
  }

  public setAccount(account: CreateResult): void {
    this.evm.setAccount(account);
    this.sub.setAccount(account);
  }

  public logout(): void {
    this.evm.logout();
    this.sub.logout();
  }

  public async getListApps(): Promise<SupportedApps> {
    const apps: SupportedApps = {
      [BridgeNetworkType.EvmLegacy]: {},
      [BridgeNetworkType.Evm]: {},
      [BridgeNetworkType.Sub]: [],
    };

    try {
      const data = await this.root.api.rpc.bridgeProxy.listApps();

      data.forEach((appInfo) => {
        if (appInfo.isEvm) {
          const [genericNetworkId, evmAppInfo] = appInfo.asEvm;
          const id = genericNetworkId.isEvmLegacy
            ? genericNetworkId.asEvmLegacy.toNumber()
            : genericNetworkId.asEvm.toNumber();
          const type = genericNetworkId.isEvmLegacy ? BridgeNetworkType.EvmLegacy : BridgeNetworkType.Evm;
          const kind = evmAppInfo.appKind.toString();
          const address = evmAppInfo.evmAddress.toString();

          if (!apps[type][id]) apps[type][id] = {};

          apps[type][id][kind] = address;
        } else {
          const genericNetworkId = appInfo.asSub;
          const type = BridgeNetworkType.Sub;
          const subNetwork = genericNetworkId.asSub;
          const name = subNetwork.toString();

          // adding networks we work through parachains
          if (subNetwork.isRococo) {
            apps[type].push(SubNetwork.Karura);
          }

          apps[type].push(name as SubNetwork);
        }
      });

      return apps;
    } catch {
      return apps;
    }
  }
}
