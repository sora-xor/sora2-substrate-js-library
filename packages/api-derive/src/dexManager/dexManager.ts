import { ApiInterfaceRx } from '@polkadot/api/types';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { DEXId, DEXInfo } from '@sora-substrate/types/interfaces';
import { memo } from '@polkadot/api-derive/util';

import { DEXInfoDerived } from '../types/dexManager';

// export function dexInfo(instanceId: string, api: ApiInterfaceRx): (dexId: DEXId | number) => Observable<DEXInfoDerived> {
//     return memo(instanceId, (dexId: DEXId | number) => {
//         return api.query.dexManager.dEXInfos<DEXInfo>(dexId).pipe(
//             map((result) => {
//                 const { ...attrs } = result;
//                 return { ...attrs };
//             })
//         );
//     });
// }
