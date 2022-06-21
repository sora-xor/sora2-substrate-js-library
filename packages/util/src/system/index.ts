import { map, Subject } from 'rxjs';
import type { EventRecord } from '@polkadot/types/interfaces/system';
import type { Observable } from '@polkadot/types/types';
import type { Subscription } from 'rxjs';
import type { u32, Vec } from '@polkadot/types-codec';

import type { Api } from '../api';

export class SystemModule {
  constructor(private readonly root: Api) {}

  private subject = new Subject<Vec<EventRecord>>();
  public updated = this.subject.asObservable();

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
}
