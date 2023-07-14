import { assert } from '@polkadot/util';
import { FPNumber } from '@sora-substrate/math';
import { map } from 'rxjs';

import { Messages } from '../logger';
import { Operation } from '../BaseApi';
import { XOR } from '../assets/consts';
import { StakingRewardsDestination } from './types';

import type { Exposure } from '@polkadot/types/interfaces/staking';

import type { Observable } from '@polkadot/types/types';
import type { KeyringPair } from '@polkadot/keyring/types';
import type { Api } from '../api';
import type { CodecString, NumberLike } from '@sora-substrate/math';
import type {
  ValidatorInfo,
  StashNominatorsInfo,
  ActiveEra,
  EraElectionStatus,
  EraRewardPoints,
  ValidatorExposure,
  ElectedValidator,
  AccountStakingLedger,
} from './types';

// UTILS
const formatBalance = (value: any) => new FPNumber(value).toCodecString();

const formatValidatorExposure = (codec: Exposure): ValidatorExposure => {
  return {
    total: formatBalance(codec.total),
    own: formatBalance(codec.own),
    others: codec.others.map((item) => ({ who: item.who.toString(), value: formatBalance(item.value) })),
  };
};

const formatPayee = (payee: StakingRewardsDestination | string): string | { Account: string } => {
  return payee in StakingRewardsDestination ? payee : { Account: payee };
};

export class StakingModule<T> {
  constructor(private readonly root: Api<T>) {}

  public getSignerPair(signerPair?: KeyringPair) {
    const pair = signerPair || this.root.account.pair;
    assert(pair, Messages.provideAccountPair);

    return pair;
  }

  /**
   * Get observable session index
   *
   * Each era is divided into sessions.
   * Session defines an interval during which validators must submit heartbeat if they don’t produce blocks.
   * Another usage of sessions is that reward points are calculated per session.
   * Reward points are used to calculate reward for validators at the end of each era.
   * @returns session index
   */
  public getCurrentSessionObservable(): Observable<number> {
    return this.root.apiRx.query.session.currentIndex().pipe(
      map((data) => {
        return data.toNumber();
      })
    );
  }

  /**
   * Get observable preferred validator count
   * Staking module provides a variable that describes the preferred number of validators needs to be elected per era
   * @returns validator count (69)
   */
  public getPreferredValidatorCountObservable(): Observable<number> {
    return this.root.apiRx.query.staking.validatorCount().pipe(
      map((data) => {
        return data.toNumber();
      })
    );
  }

  /**
   * Get observable active era
   * @returns era index & era start timestamp
   */
  public getActiveEraObservable(): Observable<ActiveEra | null> {
    return this.root.apiRx.query.staking.activeEra().pipe(
      map((data) => {
        if (data.isEmpty) return null;

        const era = data.unwrap();
        const index = era.index.toNumber();
        const start = era.start.unwrap().toNumber();

        return { index, start };
      })
    );
  }

  /**
   * Get observable current era
   * @returns current era index
   */
  public getCurrentEraObservable(): Observable<number> {
    return this.root.apiRx.query.staking.currentEra().pipe(
      map((data) => {
        const era = data.unwrap();
        return era.toNumber();
      })
    );
  }

  /**
   * Election status determines whether validator election is completed.
   * This value is very important from the point of view that many calls to the Staking module are only allowed when election is completed.
   * @returns election status of current era
   */
  // public getEraElectionStatusObservable(): Observable<EraElectionStatus> {
  //   return this.root.apiRx.query.staking.eraElectionStatus().pipe(
  //     map((electionStatus) => {
  //       return electionStatus.toJSON() as EraElectionStatus;
  //     })
  //   );
  // }

  /**
   * Get observable eras total stake
   * @param eraIndex index of era
   * @returns total stake balance in XOR (codec string)
   */
  public getEraTotalStakeObservable(eraIndex: number): Observable<CodecString> {
    return this.root.apiRx.query.staking.erasTotalStake(eraIndex).pipe(
      map((data) => {
        return new FPNumber(data).toCodecString();
      })
    );
  }

  /**
   * Get observable reward points of validators for era
   * @param eraIndex index of era
   * @returns total points and validator points
   */
  public getEraRewardPointsObservable(eraIndex: number): Observable<EraRewardPoints> {
    return this.root.apiRx.query.staking.erasRewardPoints(eraIndex).pipe(
      map((data) => {
        const total = data.total.toNumber();
        const individual = {};

        for (const [account, points] of data.individual.entries()) {
          individual[account.toString()] = points.toNumber();
        }

        return { individual, total };
      })
    );
  }

  /**
   * **CONTROLLER**
   * CONTROLLER - STASH relation
   * Get observable information about stash address, locked funds and claimed rewards
   * @param controllerAddress address of controller account
   */
  public getAccountLedgerObservable(controllerAddress: string): Observable<AccountStakingLedger | null> {
    return this.root.apiRx.query.staking.ledger(controllerAddress).pipe(
      map((codec) => {
        if (codec.isEmpty) return null;

        const data = codec.unwrap();

        return {
          stash: data.stash.toString(),
          total: formatBalance(data.total),
          active: formatBalance(data.active),
          unlocking: data.unlocking.map((item) => ({ value: formatBalance(item.value), era: item.era.toNumber() })),
        };
      })
    );
  }

  /**
   * **STASH**
   * STASH - CONTROLLER relation
   * Get observable controller account address for stash account
   * @param stashAddress address of stash account
   */
  public getControllerObservable(stashAddress: string): Observable<string | null> {
    return this.root.apiRx.query.staking.bonded(stashAddress).pipe(
      map((data) => {
        if (data.isEmpty) return null;
        return data.unwrap().toString();
      })
    );
  }

  /**
   * **STASH**
   * Get observable rewards destination of stash account
   * @param stashAddress address of stash account
   * @returns rewards destination
   */
  public getPayeeObservable(stashAddress: string): Observable<StakingRewardsDestination | string> {
    return this.root.apiRx.query.staking.payee(stashAddress).pipe(
      map((data) => {
        if (data.isController) return StakingRewardsDestination.Controller;
        if (data.isStash) return StakingRewardsDestination.Stash;
        if (data.isAccount) return data.value.toString();
        return StakingRewardsDestination.None;
      })
    );
  }

  /**
   * Get all accounts which want to be a validator
   * @returns list of validators infos (address, commission, blocked)
   */
  public async getWannabeValidators(): Promise<ValidatorInfo[]> {
    const validators = (await this.root.api.query.staking.validators.entries()).map(([key, codec]) => {
      const address = key.args[0].toString();
      const { commission, blocked } = codec;

      return {
        address,
        blocked: blocked.isTrue,
        commission: commission.unwrap().toString(),
      };
    });

    return validators;
  }

  /**
   * Get a set of validators elected for a given era
   * @param eraIndex index of era
   * @param clipped flag to reduce 'others' list to biggest stakers
   * @returns a list of elected validators
   */
  public async getElectedValidators(eraIndex: number, clipped = false): Promise<ElectedValidator[]> {
    const storage = clipped ? this.root.api.query.staking.erasStakersClipped : this.root.api.query.staking.erasStakers;

    const validators = (await storage.entries(eraIndex)).map(([key, codec]) => {
      const address = key.args[1].toString();
      const data = formatValidatorExposure(codec);

      return { address, ...data };
    });

    return validators;
  }

  /**
   * Get validator exposure observable
   * @param eraIndex index of era
   * @param validatorAddress address of validator
   * @param clipped flag to reduce 'others' list to biggest stakers
   * @returns validator exposure
   */
  public getElectedValidatorObservable(
    eraIndex: number,
    validatorAddress: string,
    clipped = false
  ): Observable<ValidatorExposure> {
    const observable = clipped
      ? this.root.apiRx.query.staking.erasStakersClipped
      : this.root.apiRx.query.staking.erasStakers;

    return observable(eraIndex, validatorAddress).pipe(
      map((codec) => {
        return formatValidatorExposure(codec);
      })
    );
  }

  /**
   * New set of validators for the current era starts working from the second session of the era and until the first session of the next era.
   * This request is used to fetch validators when EraStakers returns no validators during transition to the new era.
   * @returns list of validator addresses
   */
  public async getSessionValidators(): Promise<string[]> {
    const data = await this.root.api.query.session.validators();

    return data.map((id) => id.toString());
  }

  /**
   * **STASH**
   * Get observable validators nominated by stash
   * @param stashAddress address of stash account
   * @returns The structure with the list of validators, eraIndex
   */
  public getNominationsObservable(stashAddress: string): Observable<StashNominatorsInfo | null> {
    return this.root.apiRx.query.staking.nominators(stashAddress).pipe(
      map((codec) => {
        if (codec.isEmpty) return null;
        const data = codec.unwrap();
        const targets = data.targets.map((target) => target.toString());
        const suppressed = data.suppressed.isTrue;
        const submittedIn = data.submittedIn.toNumber();
        return { targets, suppressed, submittedIn };
      })
    );
  }

  /**
   * Calc bond tx params
   * @param value amount to bond (XOR)
   * @param controller address of controller account
   * @param payee destination of rewards (one of payee or specific account address for payments)
   * @returns
   */
  private calcBondParams(
    value: NumberLike,
    controller: string,
    payee: StakingRewardsDestination | string
  ): [string, string, string | { Account: string }] {
    const amount = new FPNumber(value, XOR.decimals).toCodecString();
    const destination = formatPayee(payee);

    return [controller, amount, destination];
  }

  /**
   * **STASH**
   * Lock the stake
   * @param args.value amount to bond (XOR)
   * @param args.controller address of controller account
   * @param args.payee destination of rewards (one of payee or account address for payments)
   * @param signerPair account pair for transaction sign (otherwise the connected account will be used)
   */
  public async bond(
    args: { value: NumberLike; controller: string; payee: StakingRewardsDestination | string },
    signerPair?: KeyringPair
  ): Promise<void> {
    const pair = this.getSignerPair(signerPair);
    const params = this.calcBondParams(args.value, args.controller, args.payee);

    await this.root.submitExtrinsic(this.root.api.tx.staking.bond(...params), pair, {
      type: Operation.StakingBond,
      symbol: XOR.symbol,
      assetAddress: XOR.address,
      amount: `${args.value}`,
    });
  }

  /**
   * **STASH**
   * Add more funds to an existing stake
   * @param args.value amount add to stake
   * @param signerPair account pair for transaction sign (otherwise the connected account will be used)
   */
  public async bondExtra(args: { value: NumberLike }, signerPair?: KeyringPair): Promise<void> {
    const pair = this.getSignerPair(signerPair);

    await this.root.submitExtrinsic(
      this.root.api.tx.staking.bondExtra(new FPNumber(args.value, XOR.decimals).toCodecString()),
      pair,
      {
        type: Operation.StakingBondExtra,
        symbol: XOR.symbol,
        assetAddress: XOR.address,
        amount: `${args.value}`,
      }
    );
  }

  /**
   * **CONTROLLER**
   * Lock again part of currently unlocking value
   * @param args.value amount to lock in stake
   * @param signerPair account pair for transaction sign (otherwise the connected account will be used)
   */
  public async rebond(args: { value: NumberLike }, signerPair?: KeyringPair): Promise<void> {
    const pair = this.getSignerPair(signerPair);

    await this.root.submitExtrinsic(
      this.root.api.tx.staking.rebond(new FPNumber(args.value, XOR.decimals).toCodecString()),
      pair,
      {
        type: Operation.StakingRebond,
        symbol: XOR.symbol,
        assetAddress: XOR.address,
        amount: `${args.value}`,
      }
    );
  }

  /**
   * **CONTROLLER**
   * To withdraw part of the staked amount a user must perform unbounding firstly
   * @param args.value amount to unbond from stake
   * @param signerPair account pair for transaction sign (otherwise the connected account will be used)
   */
  public async unbond(args: { value: NumberLike }, signerPair?: KeyringPair): Promise<void> {
    const pair = this.getSignerPair(signerPair);

    await this.root.submitExtrinsic(
      this.root.api.tx.staking.unbond(new FPNumber(args.value, XOR.decimals).toCodecString()),
      pair,
      {
        type: Operation.StakingUnbond,
        symbol: XOR.symbol,
        assetAddress: XOR.address,
        amount: `${args.value}`,
      }
    );
  }

  /**
   * **CONTROLLER**
   * Moves unlocked value to the free balance of the stash account
   * @param args.value amount to withdraw - not used in extrinsic call, but can be passed to save this value in history
   * @param signerPair account pair for transaction sign (otherwise the connected account will be used)
   */
  public async withdrawUndonded(args: { value?: NumberLike }, signerPair?: KeyringPair): Promise<void> {
    const pair = this.getSignerPair(signerPair);
    /**
     * slashingSpans parameter is needed to ensure
     * that the user agrees that staking information will be removed when there is no unlocking items pending
     * and active value goes below minimum_balance due to slashing.
     */
    const slashingSpans = 0;
    await this.root.submitExtrinsic(this.root.api.tx.staking.withdrawUnbonded(slashingSpans), pair, {
      type: Operation.StakingWithdrawUnbonded,
      symbol: XOR.symbol,
      assetAddress: XOR.address,
      amount: args.value ? `${args.value}` : undefined,
    });
  }

  /**
   * **CONTROLLER**
   * Start nominating a list of validators from the next era
   * @param args.validators list of validators addresses to nominate
   * @param signerPair account pair for transaction sign (otherwise the connected account will be used)
   */
  public async nominate(args: { validators: string[] }, signerPair?: KeyringPair): Promise<void> {
    const pair = this.getSignerPair(signerPair);

    await this.root.submitExtrinsic(this.root.api.tx.staking.nominate(args.validators), pair, {
      type: Operation.StakingNominate,
      validators: args.validators,
    });
  }

  /**
   * **CONTROLLER**
   * Stop nominating or validating from the next era.
   * @param signerPair account pair for transaction sign (otherwise the connected account will be used)
   */
  public async chill(signerPair?: KeyringPair): Promise<void> {
    const pair = this.getSignerPair(signerPair);

    await this.root.submitExtrinsic(this.root.api.tx.staking.chill(), pair, {
      type: Operation.StakingChill,
    });
  }

  /**
   * **CONTROLLER**
   * Changes new account to which staking reward is sent starting from the next era
   * @param args.payee rewards destination
   * @param signerPair account pair for transaction sign (otherwise the connected account will be used)
   */
  public async setPayee(args: { payee: StakingRewardsDestination }, signerPair?: KeyringPair): Promise<void> {
    const pair = this.getSignerPair(signerPair);
    const destination = formatPayee(args.payee);

    await this.root.submitExtrinsic(this.root.api.tx.staking.setPayee(destination), pair, {
      type: Operation.StakingSetPayee,
      payee: args.payee,
    });
  }

  /**
   * **STASH**
   * Set new controller for the current stash starting from the next era
   * @param args.address address of controller account
   * @param signerPair account pair for transaction sign (otherwise the connected account will be used)
   */
  public async setController(args: { address: string }, signerPair?: KeyringPair): Promise<void> {
    const pair = this.getSignerPair(signerPair);

    await this.root.submitExtrinsic(this.root.api.tx.staking.setController(args.address), pair, {
      type: Operation.StakingSetPayee,
      controller: args.address,
    });
  }

  /**
   * Distribute payout for staking in a given era for given validators
   * @param args.validators array of validators addresses
   * @param args.eraIndex era index
   * @param signerPair account pair for transaction sign (otherwise the connected account will be used)
   */
  public async payout(args: { validators: string[]; eraIndex: number }, signerPair?: KeyringPair): Promise<void> {
    const pair = this.getSignerPair(signerPair);
    const transactions = args.validators.map((validator) =>
      this.root.api.tx.staking.payoutStakers(validator, args.eraIndex)
    );
    const call = transactions.length > 1 ? this.root.api.tx.utility.batchAll(transactions) : transactions[0];

    await this.root.submitExtrinsic(call, pair, {
      type: Operation.StakingPayout,
      validators: args.validators,
    });
  }
}