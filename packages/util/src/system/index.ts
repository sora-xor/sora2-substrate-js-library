import { map, Subject } from 'rxjs';
import { FPNumber } from '@sora-substrate/math';
import type { Observable } from '@polkadot/types/types';
import type { GenericExtrinsic } from '@polkadot/types';
import type { u32, Vec, u128 } from '@polkadot/types-codec';
import type { AnyTuple } from '@polkadot/types-codec/types';
import type { FrameSystemEventRecord } from '@polkadot/types/lookup';

import type { Api } from '../api';

export class SystemModule<T> {
  constructor(private readonly root: Api<T>) {}

  private subject = new Subject<number>();
  public updated = this.subject.asObservable();

  get specVersion(): number {
    return this.root.api.consts.system.version.specVersion.toNumber();
  }

  public getChainDecimals(api = this.root.api): number {
    return api.registry.chainDecimals[0];
  }

  public getNetworkFeeMultiplierObservable(apiRx = this.root.apiRx): Observable<number> {
    return apiRx.query.xorFee.multiplier().pipe(map<u128, number>((codec) => new FPNumber(codec).toNumber()));
  }

  public getBlockNumberObservable(apiRx = this.root.apiRx): Observable<number> {
    return apiRx.query.system.number().pipe(
      map<u32, number>((codec) => {
        const blockNumber = codec.toNumber();

        this.subject.next(blockNumber);

        return blockNumber;
      })
    );
  }

  public getBlockHashObservable(blockNumber: number, apiRx = this.root.apiRx): Observable<string | null> {
    return apiRx.query.system.blockHash(blockNumber).pipe(
      map((hash) => {
        return hash.isEmpty ? null : hash.toString();
      })
    );
  }

  public getRuntimeVersionObservable(apiRx = this.root.apiRx): Observable<number> {
    return apiRx.query.system.lastRuntimeUpgrade().pipe<number>(map((data) => data.value.specVersion.toNumber()));
  }

  public getEventsObservable(apiRx = this.root.apiRx): Observable<Vec<FrameSystemEventRecord>> {
    return apiRx.query.system.events();
  }

  public async getBlockHash(blockNumber: number, api = this.root.api): Promise<string> {
    return (await api.rpc.chain.getBlockHash(blockNumber)).toString();
  }

  public async getBlockNumber(blockHash: string, api = this.root.api): Promise<number> {
    const apiInstanceAtBlock = await api.at(blockHash);
    return (await apiInstanceAtBlock.query.system.number()).toNumber();
  }

  public async getBlockTimestamp(blockHash: string, api = this.root.api): Promise<number> {
    const apiInstanceAtBlock = await api.at(blockHash);
    return (await apiInstanceAtBlock.query.timestamp.now()).toNumber();
  }

  public async getExtrinsicsFromBlock(
    blockId: string,
    api = this.root.api
  ): Promise<Array<GenericExtrinsic<AnyTuple>>> {
    const signedBlock = await api.rpc.chain.getBlock(blockId);
    return signedBlock.block?.extrinsics.toArray() ?? [];
  }

  public async getBlockEvents(blockId: string, api = this.root.api): Promise<Array<FrameSystemEventRecord>> {
    const apiInstanceAtBlock = await api.at(blockId);
    return (await apiInstanceAtBlock.query.system.events()).toArray();
  }
}
