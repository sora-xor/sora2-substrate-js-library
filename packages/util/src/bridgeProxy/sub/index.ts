import { FPNumber } from '@sora-substrate/math';

import { BaseApi, isSubstrateOperation, Operation } from '../../BaseApi';
import { BridgeTxStatus, BridgeNetworkType, BridgeAccountType } from '../consts';
import { getTransactionDetails, getUserTransactions, subscribeOnTransactionDetails } from '../methods';
import { SubNetwork, XcmVersionedMultiLocation, XcmMultilocationJunction, XcmJunction } from './consts';

import type { Asset } from '../../assets/types';
import type { SubHistory, SubAsset, ParachainIds } from './types';

export class SubBridgeApi<T> extends BaseApi<T> {
  constructor() {
    super('subHistory');
  }

  // override it from frontend config
  public parachainIds: ParachainIds = {
    [SubNetwork.Mainnet]: 2011,
    [SubNetwork.Karura]: 2000,
  };

  private getParachainNetwork(subNetwork: SubNetwork): SubNetwork {
    if (subNetwork === SubNetwork.Karura) {
      return SubNetwork.Rococo;
    }

    return subNetwork;
  }

  private getRecipientArg(subNetwork: SubNetwork, recipient: string) {
    const recipientPublicKey = this.api.createType('AccountId32', recipient).toHex();

    if (subNetwork === SubNetwork.Karura) {
      return {
        [BridgeAccountType.Parachain]: {
          [XcmVersionedMultiLocation.V3]: {
            parents: 1,
            interior: {
              [XcmMultilocationJunction.X2]: [
                // karura parachain
                {
                  [XcmJunction.Parachain]: this.parachainIds[SubNetwork.Karura],
                },
                // recipient account
                {
                  [XcmJunction.AccountId32]: {
                    id: recipientPublicKey,
                  },
                },
              ],
            },
          },
        },
      };
    }

    // Rococo
    return {
      [BridgeAccountType.Parachain]: {
        [XcmVersionedMultiLocation.V3]: {
          parents: 0,
          interior: {
            [XcmMultilocationJunction.X1]: {
              // recipient account
              [XcmJunction.AccountId32]: {
                id: recipientPublicKey,
              },
            },
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

  public async getRegisteredAssets(subNetwork: SubNetwork): Promise<Record<string, SubAsset>> {
    const assets = {};
    const network = this.getParachainNetwork(subNetwork);
    try {
      const data = await this.api.rpc.bridgeProxy.listAssets({ [BridgeNetworkType.Sub]: network });

      data.forEach((assetData) => {
        const assetInfo = assetData.asSub;
        const soraAddress = assetInfo.assetId.toString();
        const assetKind = assetInfo.assetKind.toString();
        const decimals = assetInfo.precision.toNumber();

        assets[soraAddress] = {
          assetKind,
          decimals,
        };
      });

      return assets;
    } catch {
      return assets;
    }
  }

  public async getUserTransactions(accountAddress: string, subNetwork: SubNetwork) {
    return await getUserTransactions(
      this.api,
      accountAddress,
      {
        [BridgeNetworkType.Sub]: this.getParachainNetwork(subNetwork),
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
      { [BridgeNetworkType.Sub]: this.getParachainNetwork(subNetwork) },
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
      { [BridgeNetworkType.Sub]: this.getParachainNetwork(subNetwork) },
      subNetwork,
      BridgeNetworkType.Sub,
      this.parachainIds
    );
  }

  public async transfer(
    asset: Asset,
    recipient: string,
    amount: string | number,
    subNetwork: SubNetwork,
    historyId?: string
  ): Promise<void> {
    // asset should be checked as registered on bridge or not
    const value = new FPNumber(amount, asset.decimals).toCodecString();
    const historyItem = this.getHistory(historyId) || {
      type: Operation.SubstrateOutgoing,
      symbol: asset.symbol,
      assetAddress: asset.address,
      amount: `${amount}`,
    };
    const network = this.getParachainNetwork(subNetwork);
    const recipientData = this.getRecipientArg(subNetwork, recipient);

    await this.submitExtrinsic(
      this.api.tx.bridgeProxy.burn({ [BridgeNetworkType.Sub]: network }, asset.address, recipientData, value),
      this.account.pair,
      historyItem
    );
  }
}
