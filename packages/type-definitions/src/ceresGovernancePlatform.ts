export default {
  rpc: {},
  types: {
    VotingInfo: {
      votingOption: 'u32',
      numberOfVotes: 'Balance',
      ceresWithdrawn: 'bool',
    },
    PollInfo: {
      numberOfOptions: 'u32',
      pollStartBlock: 'BlockNumber',
      pollEndBlock: 'BlockNumber',
    },
  },
};
