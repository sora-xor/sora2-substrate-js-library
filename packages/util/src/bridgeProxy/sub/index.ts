import { FPNumber } from '@sora-substrate/math';

import { BaseApi, isSubstrateOperation, Operation } from '../../BaseApi';
import { BridgeTxStatus, BridgeNetworkType, BridgeAccountType } from '../consts';
import {
  getTransactionDetails,
  getUserTransactions,
  subscribeOnTransactionDetails,
  subscribeOnLockedAsset,
  getLockedAssets,
} from '../methods';
import { SubNetwork, SubAssetKind, XcmVersionedMultiLocation, XcmMultilocationJunction, XcmJunction } from './consts';

import type { Asset } from '../../assets/types';
import type { SubHistory, SubAsset, ParachainIds } from './types';

export class SubBridgeApi<T> extends BaseApi<T> {
  constructor() {
    super('subHistory');
  }

  // override it from frontend config if needed
  public parachainIds: ParachainIds = {
    // Sora
    [SubNetwork.RococoSora]: 2011,
    [SubNetwork.KusamaSora]: 2011,
    // Karura
    [SubNetwork.KusamaKarura]: 2000,
  };

  public getRelayChain(subNetwork: SubNetwork): SubNetwork {
    if (this.isRelayChain(subNetwork)) return subNetwork;

    switch (subNetwork) {
      case SubNetwork.RococoSora:
        return SubNetwork.Rococo;
      case SubNetwork.KusamaKarura:
      case SubNetwork.KusamaSora:
        return SubNetwork.Kusama;
      default:
        throw new Error(`"${subNetwork}" has not relaychain`);
    }
  }

  public getSoraParachain(subNetwork: SubNetwork): SubNetwork {
    if (this.isSoraParachain(subNetwork)) return subNetwork;

    switch (subNetwork) {
      case SubNetwork.Kusama:
      case SubNetwork.KusamaKarura:
        return SubNetwork.KusamaSora;
      case SubNetwork.Rococo:
        return SubNetwork.RococoSora;
      default:
        throw new Error(`"${subNetwork}" has not SORA parachain`);
    }
  }

  public getParachainId(subNetwork: SubNetwork): number {
    const parachainId = this.parachainIds[subNetwork];

    if (!parachainId) throw new Error(`Parachain id is not defined for "${subNetwork}" parachain`);

    return parachainId;
  }

  public isRelayChain(subNetwork: SubNetwork): boolean {
    return [SubNetwork.Kusama, SubNetwork.Polkadot, SubNetwork.Rococo].includes(subNetwork);
  }

  public isSoraParachain(subNetwork: SubNetwork): boolean {
    return [SubNetwork.RococoSora, SubNetwork.KusamaSora].includes(subNetwork);
  }

  private getRecipientArg(subNetwork: SubNetwork, recipient: string) {
    const recipientPublicKey = this.api.createType('AccountId32', recipient).toHex();

    const accountXcmJunction = {
      [XcmJunction.AccountId32]: {
        id: recipientPublicKey,
      },
    };

    if (this.isRelayChain(subNetwork)) {
      return {
        [BridgeAccountType.Parachain]: {
          [XcmVersionedMultiLocation.V3]: {
            parents: 1,
            interior: {
              [XcmMultilocationJunction.X1]: accountXcmJunction,
            },
          },
        },
      };
    }

    return {
      [BridgeAccountType.Parachain]: {
        [XcmVersionedMultiLocation.V3]: {
          parents: 1,
          interior: {
            [XcmMultilocationJunction.X2]: [
              // parachain id in relaychain
              {
                [XcmJunction.Parachain]: this.getParachainId(subNetwork),
              },
              // recipient account
              accountXcmJunction,
            ],
          },
        },
      },
    };
  }

  public generateHistoryItem(params: SubHistory): SubHistory | null {
    if (!params.type) {
      return null;
    }
    const historyItem = (params || {}) as SubHistory;
    historyItem.startTime = historyItem.startTime || Date.now();
    historyItem.id = this.encrypt(`${historyItem.startTime}`);
    historyItem.transactionState = historyItem.transactionState || BridgeTxStatus.Pending;
    this.saveHistory(historyItem);
    return historyItem;
  }

  public saveHistory(history: SubHistory): void {
    if (!isSubstrateOperation(history.type)) return;
    super.saveHistory(history);
  }

  private async getSubAssetData(relaychain: SubNetwork, soraAssetId: string): Promise<SubAsset> {
    const [precision, kind] = await Promise.all([
      this.api.query.substrateBridgeApp.sidechainPrecision(relaychain, soraAssetId),
      this.api.query.substrateBridgeApp.assetKinds(relaychain, soraAssetId),
    ]);

    return {
      decimals: precision.unwrap().toNumber(),
      assetKind: kind.unwrap().isSidechain ? SubAssetKind.Sidechain : SubAssetKind.Thischain,
    };
  }

  private async getRelayChainAssets(relaychain: SubNetwork): Promise<Record<string, SubAsset>> {
    const assets: Record<string, SubAsset> = {};

    try {
      const assetCodec = await this.api.query.substrateBridgeApp.relaychainAsset(relaychain);
      const soraAssetId = assetCodec.unwrap().code.toString();
      const data = await this.getSubAssetData(relaychain, soraAssetId);

      assets[soraAssetId] = data;

      return assets;
    } catch {
      return assets;
    }
  }

  private async getParaChainAssets(parachain: SubNetwork): Promise<Record<string, SubAsset>> {
    const assets: Record<string, SubAsset> = {};
    const relaychain = this.getRelayChain(parachain);
    const parachainId = this.getParachainId(parachain);

    try {
      const assetsCodecs = await this.api.query.substrateBridgeApp.allowedParachainAssets(relaychain, parachainId);
      const soraAssetIds = assetsCodecs.map((item) => item.code.toString());

      await Promise.all(
        soraAssetIds.map(async (soraAssetId) => {
          const data = await this.getSubAssetData(relaychain, soraAssetId);

          assets[soraAssetId] = data;
        })
      );

      return assets;
    } catch {
      return assets;
    }
  }

  public async getRegisteredAssets(subNetwork: SubNetwork): Promise<Record<string, SubAsset>> {
    return this.isRelayChain(subNetwork)
      ? await this.getRelayChainAssets(subNetwork)
      : await this.getParaChainAssets(subNetwork);
  }

  public async getUserTransactions(accountAddress: string, subNetwork: SubNetwork) {
    return await getUserTransactions(
      this.api,
      accountAddress,
      {
        [BridgeNetworkType.Sub]: this.getRelayChain(subNetwork),
      },
      subNetwork,
      BridgeNetworkType.Sub,
      this.parachainIds
    );
  }

  public async getTransactionDetails(accountAddress: string, subNetwork: SubNetwork, hash: string) {
    return await getTransactionDetails(
      this.api,
      accountAddress,
      hash,
      { [BridgeNetworkType.Sub]: this.getRelayChain(subNetwork) },
      subNetwork,
      BridgeNetworkType.Sub,
      this.parachainIds
    );
  }

  public subscribeOnTransactionDetails(accountAddress: string, subNetwork: SubNetwork, hash: string) {
    return subscribeOnTransactionDetails(
      this.apiRx,
      accountAddress,
      hash,
      { [BridgeNetworkType.Sub]: this.getRelayChain(subNetwork) },
      subNetwork,
      BridgeNetworkType.Sub,
      this.parachainIds
    );
  }

  public async getLockedAssets(subNetwork: SubNetwork, assetAddress: string) {
    return await getLockedAssets(this.api, { [BridgeNetworkType.Sub]: subNetwork }, assetAddress);
  }

  public subscribeOnLockedAsset(subNetwork: SubNetwork, assetAddress: string) {
    return subscribeOnLockedAsset(this.apiRx, { [BridgeNetworkType.Sub]: subNetwork }, assetAddress);
  }

  public async transfer(
    asset: Asset,
    recipient: string,
    amount: string | number,
    subNetwork: SubNetwork,
    historyId?: string
  ): Promise<void> {
    const value = new FPNumber(amount, asset.decimals).toCodecString();
    const historyItem = this.getHistory(historyId) || {
      type: Operation.SubstrateOutgoing,
      symbol: asset.symbol,
      assetAddress: asset.address,
      amount: `${amount}`,
    };
    const network = this.getRelayChain(subNetwork);
    const recipientData = this.getRecipientArg(subNetwork, recipient);

    await this.submitExtrinsic(
      this.api.tx.bridgeProxy.burn({ [BridgeNetworkType.Sub]: network }, asset.address, recipientData, value),
      this.account.pair,
      historyItem
    );
  }
}
