import type { ApiPromise } from '@polkadot/api';
import type { CodecString } from '@sora-substrate/math';

export class SoraParachainApi {
  public async getRelayChainBlockNumber(blockHash: string, api: ApiPromise): Promise<number> {
    const apiInstanceAtBlock = await api.at(blockHash);
    const blockNumber = await apiInstanceAtBlock.query.parachainSystem.lastRelayChainBlockNumber();

    return Number(blockNumber.toString());
  }

  public async getAssetMulilocation(assetId: string, api: ApiPromise) {
    const multilocation = await api.query.xcmApp.assetIdToMultilocation(assetId);

    return multilocation;
  }

  public async getAssetMinimumAmount(assetId: string, api: ApiPromise): Promise<CodecString> {
    const multilocation = await this.getAssetMulilocation(assetId, api);
    const amount = await api.query.xcmApp.assetMinimumAmount(multilocation);

    return amount.toString();
  }
}
