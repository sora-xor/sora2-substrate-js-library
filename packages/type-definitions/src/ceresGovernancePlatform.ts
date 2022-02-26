export default {
    rpc: {},
    types: {
        VotingInfo: {
            voting_option: 'u32',
            number_of_votes: 'Balance',
            ceres_withdrawn: 'bool',
        },
        PollInfo: {
            number_of_options: 'u32',
            poll_start_block: 'BlockNumber',
            poll_end_block: 'BlockNumber',
        },
    },
};
