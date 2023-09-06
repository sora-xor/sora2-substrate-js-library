import { u128 } from '@polkadot/types-codec';
import { Option, u32 } from '@polkadot/types';
import { StakingRewardsDestination, RewardPointsIndividual, StashNominatorsInfo, ValidatorExposure } from './types';
import { PalletStakingEraRewardPoints, PalletStakingNominations } from '@polkadot/types/lookup';
import { FPNumber } from '@sora-substrate/math';
import type { Exposure } from '@polkadot/types/interfaces/staking';
import type { CodecString } from '@sora-substrate/math';

const formatEra = (data: Option<u32>): number => {
  const era = data.unwrap();

  return era.toNumber();
};

const formatIndividualRewardPoints = (data: PalletStakingEraRewardPoints): RewardPointsIndividual => {
  const result: RewardPointsIndividual = {};

  for (const [account, points] of data.individual.entries()) {
    result[account.toString()] = points.toNumber();
  }

  return result;
};

const formatNominations = (codec: Option<PalletStakingNominations>): StashNominatorsInfo | null => {
  if (codec.isEmpty) return null;

  const data = codec.unwrap();
  const targets = data.targets.map((target) => target.toString());
  const suppressed = data.suppressed.isTrue;
  const submittedIn = data.submittedIn.toNumber();

  return { targets, suppressed, submittedIn };
};

const formatPayee = (payee: StakingRewardsDestination | string): string | { Account: string } => {
  return payee in StakingRewardsDestination ? payee : { Account: payee };
};

const formatValidatorExposure = (codec: Exposure): ValidatorExposure => {
  return {
    total: toCodecString(codec.total),
    own: toCodecString(codec.own),
    others: codec.others.map((item) => ({ who: item.who.toString(), value: toCodecString(item.value) })),
  };
};

const toCodecString = (value: any) => new FPNumber(value).toCodecString();

export {
  formatEra,
  formatPayee,
  toCodecString,
  formatNominations,
  formatValidatorExposure,
  formatIndividualRewardPoints,
};
