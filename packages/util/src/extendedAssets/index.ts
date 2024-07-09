import type { Api } from '../api';
import { SoulBoundToken } from './types';

export class ExtendedAssetsModule<T> {
  constructor(private readonly root: Api<T>) {}

  /**
   * Get SBT meta info by collecting it from different states
   * @param assetId asset ID
   *
   */
  public async getSbtMetaInfo(assetId: string): Promise<SoulBoundToken> {
    const sbtSpecificInfo = await this.root.api.query.extendedAssets.soulboundAsset(assetId);
    const sbtCommonInfo = await this.root.api.query.assets.assetInfosV2(assetId);

    const { externalUrl, issuedAt, regulatedAssets = [] } = sbtSpecificInfo.toHuman() as Partial<SoulBoundToken>;
    const { symbol, name, assetType, contentSource, description } = sbtCommonInfo.toHuman() as Partial<SoulBoundToken>;

    return {
      address: assetId,
      symbol,
      name,
      assetType,
      contentSource,
      description,
      externalUrl,
      issuedAt,
      regulatedAssets: regulatedAssets.map((regulatedAsset) => (regulatedAsset as { code: string }).code),
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
   * Give privilege for provided account for specified lifespan.
   * @param accountId account address to give access to
   * @param sbtAssetId asset ID of SBT
   * @param timestamp time when access is expired
   *
   */
  public async givePrivilege(accountId: string, sbtAssetId: string, timestamp: number): Promise<T> {
    // TODO: add logic for possible minting
    return this.root.submitExtrinsic(
      this.root.api.tx.extendedAssets.setSbtExpiration(accountId, sbtAssetId, timestamp * 1000),
      this.root.account.pair
    );
  }

  /**
   * Revoke privilege from provided account
   * @param accountId account address to give access to
   * @param sbtAssetId asset ID of SBT
   *
   */
  public async revokePrivilege(accountId: string, sbtAssetId: string): Promise<T> {
    // TODO: add logic for possible burning
    return this.root.submitExtrinsic(
      this.root.api.tx.extendedAssets.setSbtExpiration(accountId, sbtAssetId, Date.now() * 1000),
      this.root.account.pair
    );
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
   *
   */
  public async issueSbt(symbol: string, name: string, description = '', image = '', extendedUrl = ''): Promise<T> {
    return this.root.submitExtrinsic(
      this.root.api.tx.extendedAssets.issueSbt(symbol, name, description, image, extendedUrl),
      this.root.account.pair
    );
  }
}
