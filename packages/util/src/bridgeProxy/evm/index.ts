import { FPNumber } from '@sora-substrate/math';
import { assert } from '@polkadot/util';

import { BaseApi, isEvmOperation, Operation } from '../../BaseApi';
import { Messages } from '../../logger';
import { BridgeTxStatus, BridgeNetworkType, BridgeAccountType } from '../consts';
import { getTransactionDetails, getUserTransactions, subscribeOnTransactionDetails, getLockedAssets } from '../methods';

import type { CodecString } from '@sora-substrate/math';
import type { Asset } from '../../assets/types';
import type { EvmHistory, EvmNetwork, EvmAsset } from './types';

export class EvmBridgeApi<T> extends BaseApi<T> {
  constructor() {
    super('evmHistory');
  }

  public generateHistoryItem(params: EvmHistory): EvmHistory | null {
    if (!params.type) {
      return null;
    }
    const historyItem = (params || {}) as EvmHistory;
    historyItem.startTime = historyItem.startTime || Date.now();
    historyItem.id = this.encrypt(`${historyItem.startTime}`);
    historyItem.transactionState = historyItem.transactionState || BridgeTxStatus.Pending;
    this.saveHistory(historyItem);
    return historyItem;
  }

  public saveHistory(history: EvmHistory): void {
    if (!isEvmOperation(history.type)) return;
    super.saveHistory(history);
  }

  public async getRegisteredAssets(evmNetwork: EvmNetwork): Promise<Record<string, EvmAsset>> {
    const assets = {};

    try {
      const data = await this.api.rpc.bridgeProxy.listAssets({ [BridgeNetworkType.Evm]: evmNetwork });

      data.forEach((assetData) => {
        const assetInfo = assetData.asEvm;
        const soraAddress = assetInfo.assetId.toString();
        const evmAddress = assetInfo.evmAddress.toString();
        const appKind = assetInfo.appKind.toString();
        const decimals = assetInfo.precision.toNumber();

        assets[soraAddress] = {
          address: evmAddress,
          appKind,
          decimals,
        };
      });

      return assets;
    } catch {
      return assets;
    }
  }

  public async getUserTransactions(accountAddress: string, evmNetwork: EvmNetwork) {
    return await getUserTransactions(
      this.api,
      accountAddress,
      { [BridgeNetworkType.Evm]: evmNetwork },
      evmNetwork,
      BridgeNetworkType.Evm
    );
  }

  public async getTransactionDetails(accountAddress: string, evmNetwork: EvmNetwork, hash: string) {
    return await getTransactionDetails(
      this.api,
      accountAddress,
      hash,
      { [BridgeNetworkType.Evm]: evmNetwork },
      evmNetwork,
      BridgeNetworkType.Evm
    );
  }

  public subscribeOnTransactionDetails(accountAddress: string, evmNetwork: EvmNetwork, hash: string) {
    return subscribeOnTransactionDetails(
      this.apiRx,
      accountAddress,
      hash,
      { [BridgeNetworkType.Evm]: evmNetwork },
      evmNetwork,
      BridgeNetworkType.Evm
    );
  }

  public async getLockedAssets(evmNetwork: EvmNetwork, assetAddress: string) {
    return await getLockedAssets(this.api, { [BridgeNetworkType.Evm]: evmNetwork }, assetAddress);
  }

  /** UNCHECKED */
  protected getTransferExtrinsic(asset: Asset, recipient: string, amount: string | number, evmNetwork: EvmNetwork) {
    const value = new FPNumber(amount, asset.decimals).toCodecString();

    return this.api.tx.bridgeProxy.burn(
      { [BridgeNetworkType.Evm]: evmNetwork },
      asset.address,
      { [BridgeAccountType.Evm]: recipient },
      value
    );
  }

  public async transfer(
    asset: Asset,
    recipient: string,
    amount: string | number,
    evmNetwork: EvmNetwork,
    historyId?: string
  ): Promise<void> {
    assert(this.account, Messages.connectWallet);

    const extrinsic = this.getTransferExtrinsic(asset, recipient, amount, evmNetwork);
    const historyItem = this.getHistory(historyId) || {
      type: Operation.EvmOutgoing,
      symbol: asset.symbol,
      assetAddress: asset.address,
      amount: `${amount}`,
    };

    await this.submitExtrinsic(extrinsic, this.account.pair, historyItem);
  }

  public async getNetworkFee(asset: Asset, evmNetwork: EvmNetwork): Promise<CodecString> {
    const tx = this.getTransferExtrinsic(asset, '', '0', evmNetwork);

    return await this.getTransactionFee(tx);
  }
}
