export default {
  rpc: {},
  types: {
    PoolData: {
      multiplier: 'u32',
      deposit_fee: 'Balance',
      is_core: 'bool',
      is_farm: 'bool',
      total_tokens_in_pool: 'Balance',
      rewards: 'Balance',
      rewards_to_be_distributed: 'Balance',
      is_removed: 'bool',
    },
    TokenInfo: {
      farms_total_multiplier: 'u32',
      staking_total_multiplier: 'u32',
      token_per_block: 'Balance',
      farms_allocation: 'Balance',
      staking_allocation: 'Balance',
      team_allocation: 'Balance',
      team_account: 'AccountId',
    },
    UserInfo: {
      pool_asset: 'AssetId',
      reward_asset: 'AssetId',
      is_farm: 'bool',
      pooled_tokens: 'Balance',
      rewards: 'Balance',
    },
  },
};
