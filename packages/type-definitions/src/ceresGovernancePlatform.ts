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
            poll_start_timestamp: 'Moment',
            poll_end_timestamp: 'Moment',
        },
    },
};
