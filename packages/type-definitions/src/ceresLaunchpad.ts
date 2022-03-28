export default {
  rpc: {},
  types: {
    ContributorsVesting: {
      first_release_percent: 'Balance',
      vesting_period: 'BlockNumber',
      vesting_percent: 'Balance',
    },
    TeamVesting: {
      team_vesting_total_tokens: 'Balance',
      team_vesting_first_release_percent: 'Balance',
      team_vesting_period: 'BlockNumber',
      team_vesting_percent: 'Balance',
    },
    ContributionInfo: {
      funds_contributed: 'Balance',
      tokens_bought: 'Balance',
      tokens_claimed: 'Balance',
      claiming_finished: 'bool',
      number_of_claims: 'u32',
    },
    ILOInfo:  {
      ilo_organizer: 'AccountId',
      tokens_for_ilo: 'Balance',
      tokens_for_liquidity: 'Balance',
      ilo_price: 'Balance',
      soft_cap: 'Balance',
      hard_cap: 'Balance',
      min_contribution: 'Balance',
      max_contribution: 'Balance',
      refund_type: 'bool',
      liquidity_percent: 'Balance',
      listing_price: 'Balance',
      lockup_days: 'u32',
      start_block: 'BlockNumber',
      end_block: 'BlockNumber',
      contributors_vesting: 'ContributorsVesting',
      team_vesting: 'TeamVesting',
      sold_tokens: 'Balance',
      funds_raised: 'Balance',
      succeeded: 'bool',
      failed: 'bool',
      lp_tokens: 'Balance',
      claimed_lp_tokens: 'bool',
      finish_block: 'BlockNumber',
    }
  }
};
