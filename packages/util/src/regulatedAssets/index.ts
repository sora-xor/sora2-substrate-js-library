import type { Api } from '../api';
import { Asset } from '../assets/types';

export class RegulatedAssetsModule<T> {
  constructor(private readonly root: Api<T>) {}

  /**
   * Get SBT meta info by collecting it from different states
   * @param assetId asset ID
   *
   */
  public async getSbtMetaInfo(assetId: string): Promise<any> {
    // TODO: take from assetInfos also
    const sbtMeta = await this.root.api.query.regulatedAssets.soulboundAsset(assetId);
  }

  /**
   * Get all existing SBT addresses
   *
   */
  public async getAllSbtIds(): Promise<Array<string>> {
    const data = await this.root.api.query.regulatedAssets.soulboundAsset.entries();

    return data.map(([code]) => code.args[0].toHuman().code) as Array<string>;
  }

  /**
   * Checks whether provided asset is regulated to operate on it
   * among KYC-verified accounts
   * @param assetId asset ID
   *
   */
  public async isAssetRegulated(assetId: string): Promise<Boolean> {
    return (await this.root.api.query.regulatedAssets.regulatedAsset(assetId)).toHuman();
  }

  /**
   * Give privilege to provided account
   * @param sbtAssetId asset ID of SBT
   * @param accountId account address to give access to
   *
   */
  public async givePrivilege(sbtAssetId: string, accountId: string): Promise<T> {
    // TODO: replace with another call
    return this.root.assets.mint({ address: sbtAssetId } as Asset, '1', accountId);
  }

  /**
   * Revoke privilege from provided account
   * @param sbtAssetId asset ID of SBT
   * @param accountId account address to give access to
   *
   */
  public async revokePrivilege(sbtAssetId: string, accountId: string): Promise<T> {
    // TODO: replace with another call
    return this.root.assets.burn({ address: sbtAssetId } as Asset, '1');
  }

  /**
   * Regulate SB asset. For the asset to be only operable between KYC-verified wallets.
   * Should be run on assets before provided to allowed assets of issueSbt()
   * @param assetId asset identificator
   *
   */
  public async regulateAsset(assetId: string): Promise<T> {
    return this.root.submitExtrinsic(this.root.api.tx.regulatedAssets.regulateAsset(assetId), this.root.account.pair);
  }

  /**
   * Register SB token
   * @param symbol string with asset symbol
   * @param name string with asset name
   * @param allowedAssets list of accessible assets
   * @param description description string
   */
  public async issueSbt(symbol: string, name: string, allowedAssets: Array<string>, description?: string): Promise<T> {
    return this.root.submitExtrinsic(
      this.root.api.tx.regulatedAssets.issueSbt(symbol, name, allowedAssets, description || null)
    );
  }
}
