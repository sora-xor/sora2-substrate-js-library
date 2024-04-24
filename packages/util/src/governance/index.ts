import type { Observable } from '@polkadot/types/types';

import type { Api } from '../api';
import { Proposal, Referendum, ReferendumExt } from './types';
import { AccountId } from '@sora-substrate/types';

export class GovernanceModule<T> {
  constructor(private readonly root: Api<T>) {}

  /**
   * Get observable referendums
   * @returns The list of referendums
   */
  public getReferendumsObservable(): Observable<ReferendumExt[]> {
    return this.root.apiRx.derive.democracy.referendums();
  }

  public getReferendumsActiveObservable(): Observable<Referendum[]> {
    return this.root.apiRx.derive.democracy.referendumsActive();
  }

  public getReferendumsFinishedObservable(): Observable<Referendum[]> {
    return this.root.apiRx.derive.democracy.referendumsFinished();
  }

  /**
   * Get observable proposals
   * @returns The list of proposals
   */
  public getProposalsObservable(): Observable<Proposal[]> {
    return this.root.apiRx.derive.democracy.proposals();
  }

  /**
   * Get observable council members
   * @returns The list of council members
   */
  public getCouncilMembersObservable(): Observable<AccountId[]> {
    return this.root.apiRx.derive.council.members();
  }

  /**
   * Get observable technical committee members
   * @returns The list of technical committee members
   */
  public getTechnicalCommitteeMembersObservable(): Observable<AccountId[]> {
    return this.root.apiRx.derive.technicalCommittee.members();
  }
}
