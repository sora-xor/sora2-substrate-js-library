import { NumberLike } from '@sora-substrate/math';
import type { Api } from '../api';
import { Asset } from '../assets/types';
import { Operation } from '../types';
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

    const { externalUrl, issuedAt, regulatedAssets } = sbtSpecificInfo.unwrapOrDefault();
    const { symbol, name, assetType, contentSource, description } = sbtCommonInfo.toHuman() as Partial<SoulBoundToken>;

    const regulatedAssetsList: Array<string> = [];
    regulatedAssets.forEach((assetAddressEncoded) => {
      regulatedAssetsList.push(assetAddressEncoded.code.toString());
    });

    return {
      address: assetId,
      symbol,
      name,
      assetType,
      contentSource,
      description,
      externalUrl: externalUrl.toHuman() as string,
      issuedAt: issuedAt.toHuman(),
      regulatedAssets: regulatedAssetsList,
    };
  }

  /**
   * Get all existing SBT addresses
   *
   */
  public async getAllSbtIds(): Promise<Array<string>> {
    const data = await this.root.api.query.extendedAssets.soulboundAsset.entries();

    return data.map(([code]) => code.args[0].code.toString());
  }

  /**
   * Get SBT expiration on account
   * @param accountId account address
   * @param sbtAssetId asset ID of SBT
   *
   */
  public async getSbtExpiration(accountId: string, sbtAssetId: string): Promise<string> {
    return (await this.root.api.query.extendedAssets.sbtExpiration(accountId, sbtAssetId))
      .unwrapOr(Infinity)
      .toString();
  }

  /**
   * Give privilege for provided account for specified lifespan.
   * @param accountId account address to give access to
   * @param sbtAsset SBT asset
   * @param timestamp time when access is expired
   *
   */
  public async givePrivilege(accountId: string, sbtAsset: Asset, timestamp?: number): Promise<T> {
    // if provided, account has some determined lifespan to operate, otherwise, it is indefinite
    if (timestamp) {
      this.root.submitExtrinsic(
        this.root.api.tx.extendedAssets.setSbtExpiration(accountId, sbtAsset.address, timestamp),
        this.root.account.pair,
        { type: Operation.SetAccessExpiration, assetAddress: sbtAsset.address, to: accountId, endTime: timestamp }
      );
    }

    return this.root.assets.mint(sbtAsset, '1', accountId);
  }

  /**
   * Revoke privilege from provided account
   * @param accountId account address to give access to
   * @param sbtAssetId asset ID of SBT
   *
   */
  public async revokePrivilege(accountId: string, sbtAssetId: string): Promise<T> {
    const currentTimestamp = Math.round(Date.now() / 1000);

    return this.root.submitExtrinsic(
      this.root.api.tx.extendedAssets.setSbtExpiration(accountId, sbtAssetId, currentTimestamp),
      this.root.account.pair,
      { type: Operation.SetAccessExpiration, assetAddress: sbtAssetId, to: accountId, endTime: currentTimestamp }
    );
  }

  /**
   * Regulate SB asset.
   * Should be run on assets before provided to bindRegulatedAssetToSBT()
   * @param assetId asset identificator
   *
   */
  public async regulateAsset(assetId: string): Promise<T> {
    return this.root.submitExtrinsic(this.root.api.tx.extendedAssets.regulateAsset(assetId), this.root.account?.pair, {
      type: Operation.RegulateAsset,
      assetAddress: assetId,
    });
  }

  public async registerRegulatedAsset(
    symbol: string,
    name: string,
    initialSupply: NumberLike,
    isMintable = false,
    isIndivisible = false
  ) {
    // return this.root.submitExtrinsic(this.root.api.tx.extendedAssets.issueSbt()), this.root.account?.pair, {});
  }

  /**
   * Bind regulated asset to SB token. For the asset to be only operable between KYC-verified wallets.
   * @param sbtAssetId SB address
   * @param regulatedAssetIds array of regulated asset addresses
   *
   */
  public async bindRegulatedAssetToSBT(sbtAssetId: string, regulatedAssetIds: Array<string>): Promise<T> {
    if (regulatedAssetIds.length === 1) {
      return this.root.submitExtrinsic(
        this.root.api.tx.extendedAssets.bindRegulatedAssetToSbt(sbtAssetId, regulatedAssetIds[0]),
        this.root.account.pair,
        { type: Operation.BindRegulatedAsset, assetAddress: sbtAssetId, asset2Address: regulatedAssetIds[0] }
      );
    }

    // batch
    const transactions = regulatedAssetIds.map((regulatedAssetAddress) =>
      this.root.api.tx.extendedAssets.bindRegulatedAssetToSbt(sbtAssetId, regulatedAssetAddress)
    );

    return this.root.submitExtrinsic(this.root.api.tx.utility.batchAll(transactions), this.root.account.pair, {
      type: Operation.BindRegulatedAsset,
      assetAddress: sbtAssetId,
      asset2Address: regulatedAssetIds[0],
    });
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
      this.root.account.pair,
      { type: Operation.IssueSoulBoundToken, symbol }
    );
  }
}
