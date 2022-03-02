import { assert } from '@polkadot/util';
import { map } from '@polkadot/x-rxjs/operators';

import { Messages } from '../logger';
import { FPNumber } from '../fp';

import type { Observable } from '@polkadot/types/types';
import type { Api } from '../api';
import type { CodecString } from '../fp';
import type { ValidatorInfo, StashNominatorsInfo, ActiveEra, AccountStakingLedger } from './types';

export class StakingModule {
  constructor(private readonly root: Api) {}

  /**
   * Get observable active era
   * @returns active era observalbe: era index & era start timestamp
   */
  public getActiveEraObservable(): Observable<ActiveEra> {
    return this.root.apiRx.query.staking.activeEra().pipe(
      map((data) => {
        return data.toJSON() as any as ActiveEra;
      })
    );
  }

  /**
   * Get observable eras total stake
   * @returns total stake balance in XOR (codec string)
   */
  public getEraTotalStakeObservable(eraIndex: number): Observable<CodecString> {
    return this.root.apiRx.query.staking.erasTotalStake(eraIndex).pipe(
      map((data) => {
        return data.toString();
      })
    );
  }

  public getAccountLedgerObservable(): Observable<AccountStakingLedger> {
    assert(this.root.account, Messages.connectWallet);

    const toCodecString = (value: string) => FPNumber.fromCodecValue(value).toCodecString();

    return this.root.apiRx.query.staking.ledger(this.root.account.pair.address).pipe(
      map((data) => {
        const { stash, total, active, unlocking } = data.toJSON() as any;

        return {
          stash,
          total: toCodecString(total),
          active: toCodecString(active),
          unlocking: unlocking.map((item) => ({ value: toCodecString(item.value), era: item.era })),
        };
      })
    );
  }

  /**
   * Get list of validators infos (address, commission, blocked)
   */
  public async getValidatorInfos(): Promise<ValidatorInfo[]> {
    const validators = (await this.root.api.query.staking.validators.entries()).map(([key, codec]) => {
      const [address] = key.toHuman() as any;
      const { commission, blocked } = codec.toHuman();

      return { address, commission, blocked };
    });

    return validators as ValidatorInfo[];
  }

  /**
   * Get validators nominated by stash
   * @param accountAddress shash account address
   * @returns The structure with the list of validators, eraIndex
   */
  public async getStashNominators(accountAddress: string): Promise<StashNominatorsInfo> {
    const data = (await this.root.api.query.staking.nominators(accountAddress)).toJSON() as any;

    return data as StashNominatorsInfo;
  }
}
