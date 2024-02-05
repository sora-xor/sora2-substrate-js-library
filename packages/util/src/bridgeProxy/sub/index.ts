import { FPNumber } from '@sora-substrate/math';
import { assert } from '@polkadot/util';

import { BaseApi, isSubstrateOperation, Operation } from '../../BaseApi';
import { Messages } from '../../logger';
import { BridgeTxStatus, BridgeNetworkType, BridgeAccountType } from '../consts';
import { getTransactionDetails, getUserTransactions, subscribeOnTransactionDetails, getLockedAssets } from '../methods';
import {
  SubNetworkId,
  SubAssetKind,
  XcmVersionedMultiLocation,
  XcmMultilocationJunction,
  XcmJunction,
  SoraParachains,
  Relaychains,
  Parachains,
  Standalones,
  LiberlandAssetType,
} from './consts';
import { SoraParachainApi } from './parachain';

import type { CodecString } from '@sora-substrate/math';
import type { Asset } from '../../assets/types';
import type {
  SubHistory,
  SubAsset,
  SubAssetId,
  ParachainIds,
  SubNetwork,
  SubNetworkChainId,
  SoraParachain,
  Relaychain,
  Parachain,
  Standalone,
} from './types';
import type { BridgeTypesGenericNetworkId, BridgeTypesAssetKind } from '@polkadot/types/lookup';
import type { Option, u8 } from '@polkadot/types-codec';

const parseSubBridgeAssetKind = (kind: Option<BridgeTypesAssetKind>): SubAssetKind => {
  return kind.unwrap().isSidechain ? SubAssetKind.Sidechain : SubAssetKind.Thischain;
};

const parseSubBridgeAssetDecimals = (precision: Option<u8>) => {
  return precision.unwrap().toNumber();
};

export class SubBridgeApi<T> extends BaseApi<T> {
  constructor() {
    super('subHistory');
  }

  public readonly soraParachainApi = new SoraParachainApi();

  // override it from frontend config if needed
  public parachainIds: ParachainIds = {
    [SubNetworkId.PolkadotSora]: 2025,
    [SubNetworkId.RococoSora]: 2011,
    [SubNetworkId.KusamaSora]: 2011,
    [SubNetworkId.AlphanetSora]: 2011,
  };

  public prepareNetworkParam(subNetwork: SubNetwork): BridgeTypesGenericNetworkId {
    const networkId = this.getSubNetworkChainId(subNetwork);
    const genericNetworkId: BridgeTypesGenericNetworkId = this.api.createType('BridgeTypesGenericNetworkId', {
      [BridgeNetworkType.Sub]: networkId,
    });

    return genericNetworkId;
  }

  public getRelayChain(subNetwork: SubNetwork): Relaychain {
    if (this.isRelayChain(subNetwork)) return subNetwork as Relaychain;

    switch (subNetwork) {
      case SubNetworkId.PolkadotSora:
        return SubNetworkId.Polkadot;
      case SubNetworkId.KusamaSora:
        return SubNetworkId.Kusama;
      case SubNetworkId.RococoSora:
        return SubNetworkId.Rococo;
      case SubNetworkId.AlphanetSora:
        return SubNetworkId.Alphanet;
      default:
        throw new Error(`"${subNetwork}" has not relaychain`);
    }
  }

  public getSoraParachain(subNetwork: SubNetwork): SoraParachain {
    if (this.isSoraParachain(subNetwork)) return subNetwork as SoraParachain;

    switch (subNetwork) {
      case SubNetworkId.Polkadot:
        return SubNetworkId.PolkadotSora;
      case SubNetworkId.Kusama:
        return SubNetworkId.KusamaSora;
      case SubNetworkId.Rococo:
        return SubNetworkId.RococoSora;
      case SubNetworkId.Alphanet:
        return SubNetworkId.AlphanetSora;
      default:
        throw new Error(`"${subNetwork}" has not SORA parachain`);
    }
  }

  /** Get value how this network is defined on blockchain */
  public getSubNetworkChainId(subNetwork: SubNetwork): SubNetworkChainId {
    if (this.isStandalone(subNetwork)) return subNetwork as Standalone;

    return this.getRelayChain(subNetwork);
  }

  public getParachainId(parachain: SubNetwork): number {
    const parachainId = this.parachainIds[parachain];

    if (!parachainId) throw new Error(`Parachain id is not defined for "${parachain}" parachain`);

    return parachainId;
  }

  public isRelayChain(subNetwork: SubNetwork): boolean {
    return Relaychains.includes(subNetwork as Relaychain);
  }

  public isSoraParachain(subNetwork: SubNetwork): boolean {
    return SoraParachains.includes(subNetwork as SoraParachain);
  }

  public isParachain(subNetwork: SubNetwork): boolean {
    return Parachains.includes(subNetwork as Parachain);
  }

  public isStandalone(subNetwork: SubNetwork): boolean {
    return Standalones.includes(subNetwork as Standalone);
  }

  private getRecipientArg(subNetwork: SubNetwork, recipient: string) {
    const accountId32 = this.api.createType('AccountId32', recipient);

    if (this.isStandalone(subNetwork)) {
      if (subNetwork === SubNetworkId.Liberland) {
        return this.api.createType('BridgeTypesGenericAccount', {
          [BridgeAccountType.Liberland]: accountId32,
        });
      }

      throw new Error(`Unsupported BridgeAccountType for "${subNetwork}" Standalone network`);
    }

    const accountXcmJunction = {
      [XcmJunction.AccountId32]: {
        id: accountId32.toHex(), // account public key
      },
    };

    if (this.isRelayChain(subNetwork)) {
      return this.api.createType('BridgeTypesGenericAccount', {
        [BridgeAccountType.Parachain]: {
          [XcmVersionedMultiLocation.V3]: {
            parents: 1,
            interior: {
              [XcmMultilocationJunction.X1]: accountXcmJunction,
            },
          },
        },
      });
    }

    const parachainXcmJunction = {
      [XcmJunction.Parachain]: this.getParachainId(subNetwork), // parachain id in relaychain
    };

    return this.api.createType('BridgeTypesGenericAccount', {
      [BridgeAccountType.Parachain]: {
        [XcmVersionedMultiLocation.V3]: {
          parents: 1,
          interior: {
            [XcmMultilocationJunction.X2]: [parachainXcmJunction, accountXcmJunction],
          },
        },
      },
    });
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

  public async getSubAssetDecimals(subNetworkId: SubNetworkChainId, soraAssetId: string): Promise<number> {
    if (subNetworkId === SubNetworkId.Liberland) {
      const precision = await this.api.query.liberlandBridgeApp.sidechainPrecision(subNetworkId, soraAssetId);
      return parseSubBridgeAssetDecimals(precision);
    } else {
      const precision = await this.api.query.parachainBridgeApp.sidechainPrecision(subNetworkId, soraAssetId);
      return parseSubBridgeAssetDecimals(precision);
    }
  }

  private async getSubAssetAddress(subNetworkId: SubNetworkChainId, soraAssetId: string): Promise<SubAssetId> {
    if (subNetworkId === SubNetworkId.Liberland) {
      const result = await this.api.query.liberlandBridgeApp.sidechainAssetId(subNetworkId, soraAssetId);

      if (result.isEmpty) return undefined;

      const assetId = result.unwrap().asLiberland;

      return assetId.isLld ? LiberlandAssetType.LLD : { [LiberlandAssetType.Asset]: assetId.asAsset.toNumber() };
    }

    return undefined;
  }

  private async getSubAssetKind(subNetworkId: SubNetworkChainId, soraAssetId: string): Promise<SubAssetKind> {
    if (subNetworkId === SubNetworkId.Liberland) {
      const kind = await this.api.query.liberlandBridgeApp.assetKinds(subNetworkId, soraAssetId);
      return parseSubBridgeAssetKind(kind);
    } else {
      const kind = await this.api.query.parachainBridgeApp.assetKinds(subNetworkId, soraAssetId);
      return parseSubBridgeAssetKind(kind);
    }
  }

  private async getSubAssetData(chain: Relaychain | Standalone, soraAssetId: string): Promise<SubAsset> {
    const [address, decimals, assetKind] = await Promise.all([
      this.getSubAssetAddress(chain, soraAssetId),
      this.getSubAssetDecimals(chain, soraAssetId),
      this.getSubAssetKind(chain, soraAssetId),
    ]);

    return { address, decimals, assetKind };
  }

  private async getRelayChainAssets(relaychain: Relaychain): Promise<Record<string, SubAsset>> {
    const assets: Record<string, SubAsset> = {};

    try {
      const assetCodec = await this.api.query.parachainBridgeApp.relaychainAsset(relaychain);
      const soraAssetId = assetCodec.unwrap().code.toString();
      const data = await this.getSubAssetData(relaychain, soraAssetId);

      assets[soraAssetId] = data;

      return assets;
    } catch {
      return assets;
    }
  }

  private async getParaChainAssets(parachain: Parachain): Promise<Record<string, SubAsset>> {
    const assets: Record<string, SubAsset> = {};
    const relaychain = this.getRelayChain(parachain);
    const parachainId = this.getParachainId(parachain);

    try {
      const assetsCodecs = await this.api.query.parachainBridgeApp.allowedParachainAssets(relaychain, parachainId);
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

  private async getStandaloneAssets(standalone: Standalone): Promise<Record<string, SubAsset>> {
    if (standalone === SubNetworkId.Liberland) {
      return await this.getLiberlandAssets();
    }

    throw new Error(`"${standalone}" network registered assets request not supported`);
  }

  private async getLiberlandAssets(): Promise<Record<string, SubAsset>> {
    const assets: Record<string, SubAsset> = {};

    try {
      const keys = await this.api.query.liberlandBridgeApp.assetKinds.keys(SubNetworkId.Liberland);
      const soraAssetIds = keys.map((key) => key.args[1].code.toString());

      await Promise.all(
        soraAssetIds.map(async (soraAssetId) => {
          const data = await this.getSubAssetData(SubNetworkId.Liberland, soraAssetId);

          assets[soraAssetId] = data;
        })
      );

      return assets;
    } catch {
      return assets;
    }
  }

  public async getRegisteredAssets(subNetwork: SubNetwork): Promise<Record<string, SubAsset>> {
    if (this.isStandalone(subNetwork)) {
      return await this.getStandaloneAssets(subNetwork as Standalone);
    }
    if (this.isRelayChain(subNetwork)) {
      return await this.getRelayChainAssets(subNetwork as Relaychain);
    }

    return await this.getParaChainAssets(subNetwork as Parachain);
  }

  public async getUserTransactions(accountAddress: string, subNetwork: SubNetwork) {
    return await getUserTransactions(
      this.api,
      accountAddress,
      this.prepareNetworkParam(subNetwork),
      subNetwork,
      this.parachainIds
    );
  }

  public async getTransactionDetails(accountAddress: string, subNetwork: SubNetwork, hash: string) {
    return await getTransactionDetails(
      this.api,
      accountAddress,
      hash,
      this.prepareNetworkParam(subNetwork),
      subNetwork,
      this.parachainIds
    );
  }

  public subscribeOnTransactionDetails(accountAddress: string, subNetwork: SubNetwork, hash: string) {
    return subscribeOnTransactionDetails(
      this.apiRx,
      accountAddress,
      hash,
      this.prepareNetworkParam(subNetwork),
      subNetwork,
      this.parachainIds
    );
  }

  public async getLockedAssets(subNetwork: SubNetwork, assetAddress: string) {
    return await getLockedAssets(this.api, this.prepareNetworkParam(subNetwork), assetAddress);
  }

  protected getTransferExtrinsic(asset: Asset, recipient: string, amount: string | number, subNetwork: SubNetwork) {
    const network = this.prepareNetworkParam(subNetwork);
    const recipientData = this.getRecipientArg(subNetwork, recipient);
    const value = new FPNumber(amount, asset.decimals).toCodecString();

    return this.api.tx.bridgeProxy.burn(network, asset.address, recipientData, value);
  }

  public async transfer(
    asset: Asset,
    recipient: string,
    amount: string | number,
    subNetwork: SubNetwork,
    historyId?: string
  ): Promise<void> {
    assert(this.account, Messages.connectWallet);

    const extrinsic = this.getTransferExtrinsic(asset, recipient, amount, subNetwork);
    const historyItem = this.getHistory(historyId) || {
      type: Operation.SubstrateOutgoing,
      symbol: asset.symbol,
      assetAddress: asset.address,
      amount: `${amount}`,
    };

    await this.submitExtrinsic(extrinsic, this.account.pair, historyItem);
  }

  public async getNetworkFee(asset: Asset, subNetwork: SubNetwork): Promise<CodecString> {
    const tx = this.getTransferExtrinsic(asset, '', '0', subNetwork);

    return await this.getTransactionFee(tx);
  }
}
