import { DexId } from './consts';
import { XOR } from '../assets/consts';

import type { Api } from '../api';
import type { DexInfo } from './types';

export class DexModule {
  constructor(private readonly root: Api) {}

  public static defaultDexId = DexId.XOR;
  public static defaultBaseAssetId = XOR.address;

  public dexList: DexInfo[] = [];

  get publicDexes(): DexInfo[] {
    return this.dexList.filter((dex) => !!dex.isPublic);
  }

  get poolBaseAssetsIds(): string[] {
    return this.publicDexes.map((item) => item.baseAssetId);
  }

  get baseAssetsIds(): string[] {
    return this.dexList.map((item) => item.baseAssetId);
  }

  public async updateList(): Promise<void> {
    const data = await this.root.api.query.dexManager.dexInfos.entries();

    this.dexList = data.map(([key, codec]) => {
      const dexId = key.args[0].toNumber();
      const baseAssetId = codec.value.baseAssetId.code.toString();
      const isPublic = codec.value.isPublic.isTrue;

      return { dexId, baseAssetId, isPublic };
    });
  }

  public getDexId(baseAssetId: string): number {
    return this.dexList.find((dex) => dex.baseAssetId === baseAssetId)?.dexId ?? DexModule.defaultDexId;
  }

  public getBaseAssetId(dexId: number): string {
    return this.dexList.find((dex) => dex.dexId === dexId)?.baseAssetId ?? DexModule.defaultBaseAssetId;
  }
}
