import type { Vec } from '@polkadot/types';
import type {
  AccountId,
  Balance,
  Call,
  Hash,
  PropIndex,
  ReferendumIndex,
  ReferendumInfoTo239,
  Vote,
} from '@polkadot/types/interfaces';
import type { PalletDemocracyReferendumStatus, PalletDemocracyVoteThreshold } from '@polkadot/types/lookup';
import type { BN } from '@polkadot/util';
import type { HexString } from '@polkadot/util/types';

export interface AtBlock {
  at: BN;
}
export interface DemocracyLock {
  balance: Balance;
  isDelegated: boolean;
  isFinished: boolean;
  referendumEnd: BN;
  referendumId: ReferendumIndex;
  unlockAt: BN;
  vote: Vote;
}
export interface ProposalImage extends AtBlock {
  balance: Balance;
  proposal?: Call;
  proposalHash?: HexString;
  proposalLen?: number;
  proposer: AccountId;
}
export interface Dispatch extends AtBlock {
  index: ReferendumIndex;
  imageHash: HexString;
  image?: ProposalImage;
}
export interface Proposal {
  balance?: Balance;
  index: PropIndex;
  image?: ProposalImage;
  imageHash: Hash;
  proposer: AccountId;
  seconds: Vec<AccountId>;
}
export interface ProposalExternal {
  image?: ProposalImage;
  imageHash: HexString;
  threshold: PalletDemocracyVoteThreshold;
}
export interface Referendum {
  index: ReferendumIndex;
  image?: ProposalImage;
  imageHash: HexString;
  status: PalletDemocracyReferendumStatus | ReferendumInfoTo239;
}
export interface ReferendumVote {
  accountId: AccountId;
  balance: Balance;
  isDelegating: boolean;
  vote: Vote;
}
export interface ReferendumVoteState {
  allAye: ReferendumVote[];
  allNay: ReferendumVote[];
  voteCount: number;
  voteCountAye: number;
  voteCountNay: number;
  votedAye: BN;
  votedNay: BN;
  votedTotal: BN;
}
export interface ReferendumVotes extends ReferendumVoteState {
  isPassing: boolean;
  votes: ReferendumVote[];
}
export interface ReferendumExt extends Referendum, ReferendumVotes {}
