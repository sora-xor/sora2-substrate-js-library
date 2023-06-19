import { map, Subject } from 'rxjs';
import { FPNumber } from '@sora-substrate/math';
import type { Subscription } from 'rxjs';
import type { EventRecord } from '@polkadot/types/interfaces/system';
import type { Observable } from '@polkadot/types/types';
import type { GenericExtrinsic } from '@polkadot/types';
import type { u32, Vec, u128 } from '@polkadot/types-codec';
import type { AnyTuple } from '@polkadot/types-codec/types';
import type { FrameSystemEventRecord } from '@polkadot/types/lookup';

import type { Api } from '../api';

export class SystemModule<T> {
  constructor(private readonly root: Api<T>) {}

  private subject = new Subject<Vec<EventRecord>>();
  public updated = this.subject.asObservable();

  get specVersion(): number {
    return this.root.api.consts.system.version.specVersion.toNumber();
  }

  public getNetworkFeeMultiplierObservable(): Observable<number> {
    return this.root.apiRx.query.xorFee.multiplier().pipe(map<u128, number>((codec) => new FPNumber(codec).toNumber()));
  }

  public getBlockNumberObservable(): Observable<number> {
    return this.root.apiRx.query.system.number().pipe(map<u32, number>((codec) => codec.toNumber()));
  }

  public getRuntimeVersionObservable(): Observable<number> {
    return this.root.apiRx.query.system
      .lastRuntimeUpgrade()
      .pipe<number>(map((data) => data.value.specVersion.toNumber()));
  }

  public getEventsSubscription(): Subscription {
    return this.root.apiRx.query.system.events().subscribe((events) => {
      this.subject.next(events);
    });
  }

  public async getBlockHash(blockNumber: number): Promise<string> {
    return (await this.root.api.rpc.chain.getBlockHash(blockNumber)).toString();
  }

  public async getBlockNumber(blockHash: string): Promise<number> {
    const apiInstanceAtBlock = await this.root.api.at(blockHash);
    return (await apiInstanceAtBlock.query.system.number()).toNumber();
  }

  public async getBlockTimestamp(blockHash: string): Promise<number> {
    const apiInstanceAtBlock = await this.root.api.at(blockHash);
    return (await apiInstanceAtBlock.query.timestamp.now()).toNumber();
  }

  public async getExtrinsicsFromBlock(blockId: string): Promise<Array<GenericExtrinsic<AnyTuple>>> {
    const signedBlock = await this.root.api.rpc.chain.getBlock(blockId);
    return signedBlock.block?.extrinsics.toArray() ?? [];
  }

  public async getBlockEvents(blockId: string): Promise<Array<FrameSystemEventRecord>> {
    const apiInstanceAtBlock = await this.root.api.at(blockId);
    return (await apiInstanceAtBlock.query.system.events()).toArray();
  }
}
