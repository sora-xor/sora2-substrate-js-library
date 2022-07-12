export default {
  rpc: {},
  types: {
    ContributorsVesting: {
      firstReleasePercent: 'Balance',
      vestingPeriod: 'Moment',
      vestingPercent: 'Balance',
    },
    TeamVesting: {
      teamVestingTotalTokens: 'Balance',
      teamVestingFirstReleasePercent: 'Balance',
      teamVestingPeriod: 'Moment',
      teamVestingPercent: 'Balance',
    },
    ContributionInfo: {
      fundsContributed: 'Balance',
      tokensBought: 'Balance',
      tokensClaimed: 'Balance',
      claimingFinished: 'bool',
      numberOfClaims: 'u32',
    },
    ILOInfo: {
      iloOrganizer: 'AccountId',
      tokensForIlo: 'Balance',
      tokensForLiquidity: 'Balance',
      iloPrice: 'Balance',
      softCap: 'Balance',
      hardCap: 'Balance',
      minContribution: 'Balance',
      maxContribution: 'Balance',
      refundType: 'bool',
      liquidityPercent: 'Balance',
      listingPrice: 'Balance',
      lockupDays: 'u32',
      startTimestamp: 'Moment',
      endTimestamp: 'Moment',
      contributorsVesting: 'ContributorsVesting',
      teamVesting: 'TeamVesting',
      soldTokens: 'Balance',
      fundsRaised: 'Balance',
      succeeded: 'bool',
      failed: 'bool',
      lpTokens: 'Balance',
      claimedLpTokens: 'bool',
      finishTimestamp: 'Moment',
    },
  },
};
