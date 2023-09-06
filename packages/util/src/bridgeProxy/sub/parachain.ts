import type { ApiPromise } from '@polkadot/api';
import type { CodecString } from '@sora-substrate/math';
import type { u32, u128 } from '@polkadot/types';
import type { Option } from '@polkadot/types-codec';
import type { XcmV3MultiLocation } from '@polkadot/types/lookup';

export class SoraParachainApi {
  public async getRelayChainBlockNumber(blockHash: string, api: ApiPromise): Promise<number> {
    const apiInstanceAtBlock = await api.at(blockHash);
    const blockNumber = (await apiInstanceAtBlock.query.parachainSystem.lastRelayChainBlockNumber()) as u32;

    return blockNumber.toNumber();
  }

  public async getAssetMulilocation(assetId: string, api: ApiPromise): Promise<XcmV3MultiLocation | null> {
    const multilocation = (await api.query.xcmApp.assetIdToMultilocation(assetId)) as Option<XcmV3MultiLocation>;

    return multilocation.isSome ? multilocation.unwrap() : null;
  }

  public async getAssetMinimumAmount(assetId: string, api: ApiPromise): Promise<CodecString> {
    const multilocation = await this.getAssetMulilocation(assetId, api);

    if (!multilocation) return '0';

    const amount = (await api.query.xcmApp.assetMinimumAmount(multilocation)) as Option<u128>;

    return amount.isSome ? amount.unwrap().toString() : '0';
  }
}
