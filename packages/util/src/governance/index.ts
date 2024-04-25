import type { Observable } from '@polkadot/types/types';

import { Operation } from '../BaseApi';
import type { Api } from '../api';
import { CollectiveProposal, ElectionsInfo, Proposal, Referendum, ReferendumExt } from './types';
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

  /**
   * Get observable active referendums
   * @returns The list of active referendums
   */
  public getReferendumsActiveObservable(): Observable<Referendum[]> {
    return this.root.apiRx.derive.democracy.referendumsActive();
  }

  public voteOnReferendum(referendumIndex: number, vote: string): Promise<T> {
    return this.root.submitExtrinsic(this.root.api.tx.democracy.vote(referendumIndex, vote), this.root.account.pair, {
      type: Operation.GovernanceVoteOnReferendum,
    });
  }

  /**
   * Get observable proposals
   * @returns The list of proposals
   */
  public getProposalsObservable(): Observable<Proposal[]> {
    return this.root.apiRx.derive.democracy.proposals();
  }

  public submitProposal(proposal: any, value: number): Promise<T> {
    return this.root.submitExtrinsic(this.root.api.tx.democracy.propose(proposal, value), this.root.account.pair, {
      type: Operation.GovernanceSubmitProposal,
    });
  }

  /**
   * Get observable elections info
   * @returns The structure with the list of council members, candidates, and runners-up
   */
  public getElectionsInfoObservable(): Observable<ElectionsInfo> {
    return this.root.apiRx.derive.elections.info();
  }

  public voteOnCandidate(candidates: AccountId[], value: number): Promise<T> {
    return this.root.submitExtrinsic(
      this.root.api.tx.electionsPhragmen.vote(candidates, value),
      this.root.account.pair,
      {
        type: Operation.GovernanceVoteOnCandidate,
      }
    );
  }

  public submitCandidacy(value: number): Promise<T> {
    return this.root.submitExtrinsic(
      this.root.api.tx.electionsPhragmen.submitCandidacy(value),
      this.root.account.pair,
      {
        type: Operation.GovernanceSubmitCandidacy,
      }
    );
  }

  /**
   * Get observable technical committee members
   * @returns The list of technical committee members
   */
  public getTechnicalCommitteeMembersObservable(): Observable<AccountId[]> {
    return this.root.apiRx.derive.technicalCommittee.members();
  }

  /**
   * Get observable proposals
   * @returns The list of proposals
   */
  public getTechnicalCommitteeProposalsObservable(): Observable<CollectiveProposal[]> {
    return this.root.apiRx.derive.technicalCommittee.proposals() as any as Observable<CollectiveProposal[]>;
  }
}
