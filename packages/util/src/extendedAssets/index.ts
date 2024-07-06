import type { Api } from '../api';
import { Asset } from '../assets/types';

export class ExtendedAssetsModule<T> {
  constructor(private readonly root: Api<T>) {}

  /**
   * Get SBT meta info by collecting it from different states
   * @param assetId asset ID
   *
   */
  public async getSbtMetaInfo(assetId: string): Promise<any> {
    const sbtSpecificInfo = await this.root.api.query.extendedAssets.soulboundAsset(assetId);
    const sbtCommonInfo = await this.root.api.query.assets.assetInfosV2(assetId);

    const { externalUrl, issuedAt, regulatedAssets } = sbtSpecificInfo.toHuman() as any;
    const { symbol, name, assetType, contentSource, description } = sbtCommonInfo.toHuman() as any;

    return {
      symbol,
      name,
      assetType,
      contentSource,
      description,
      externalUrl,
      issuedAt,
      regulatedAssets: regulatedAssets.map((regulatedAsset: { code: string }) => regulatedAsset.code),
    };
  }

  /**
   * Get all existing SBT addresses
   *
   */
  public async getAllSbtIds(): Promise<Array<string>> {
    const data = await this.root.api.query.extendedAssets.soulboundAsset.entries();

    return data.map(([code]) => code.args[0].toHuman().code) as Array<string>;
  }

  /**
   * Checks whether provided asset is regulated to operate on it
   * among KYC-verified accounts
   * @param assetId asset ID
   *
   */
  public async isAssetRegulated(assetId: string): Promise<Boolean> {
    return (await this.root.api.query.extendedAssets.regulatedAsset(assetId)).toHuman();
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
   * Regulate SB asset.
   * Should be run on assets before provided to bindRegulatedAssetToSBT()
   * @param assetId asset identificator
   *
   */
  public async regulateAsset(assetId: string): Promise<T> {
    return this.root.submitExtrinsic(this.root.api.tx.extendedAssets.regulateAsset(assetId), this.root.account.pair);
  }

  /**
   * Bind regulated asset to SB token. For the asset to be only operable between KYC-verified wallets.
   * @param sbtAssetId SB address
   * @param regulatedAssetId regulated asset address
   *
   */
  public async bindRegulatedAssetToSBT(sbtAssetId: string, regulatedAssetId: string): Promise<T> {
    return this.root.submitExtrinsic(
      this.root.api.tx.extendedAssets.bindRegulatedAssetToSbt(sbtAssetId, regulatedAssetId),
      this.root.account.pair
    );
  }

  /**
   * Register SB token
   * @param symbol string with asset symbol
   * @param name string with asset name
   * @param description description string
   * @param image image source (ipfs)
   * @param extendedUrl url of financial institution
   */
  public async issueSbt(symbol: string, name: string, description = '', image = '', extendedUrl = ''): Promise<T> {
    return this.root.submitExtrinsic(
      this.root.api.tx.extendedAssets.issueSbt(symbol, name, description, image, extendedUrl),
      this.root.account.pair
    );
  }
}
