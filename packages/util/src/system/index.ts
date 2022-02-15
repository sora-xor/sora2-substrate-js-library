import { map } from '@polkadot/x-rxjs/operators';
import { Subject } from '@polkadot/x-rxjs';
import type { EventRecord } from '@polkadot/types/interfaces/system';
import type { Vec } from '@polkadot/types/codec';
import type { Observable } from '@polkadot/types/types';
import type { Subscription } from '@polkadot/x-rxjs';

import type { Api } from '../api';

export class SystemModule {
  constructor(private readonly root: Api) {}

  private subject = new Subject<Vec<EventRecord>>();
  public updated = this.subject.asObservable();

  public getBlockNumberObservable(): Observable<string> {
    return this.root.apiRx.query.system.number().pipe(map((codec) => codec.toString()));
  }

  public getRuntimeVersionObservable(): Observable<number> {
    return this.root.apiRx.query.system.lastRuntimeUpgrade().pipe(map((value) => (value.toJSON() as any).specVersion));
  }

  public getEventsSubscription(): Subscription {
    return this.root.apiRx.query.system.events().subscribe((events) => {
      this.subject.next(events);
    });
  }
}
