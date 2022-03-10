import { assert } from '@polkadot/util';
import { map } from '@polkadot/x-rxjs/operators';

import { Messages } from '../logger';
import { FPNumber } from '../fp';
import { Operation } from '../BaseApi';
import { XOR } from '../assets/consts';
import { StakingRewardsDestination } from './types';

import type { Observable } from '@polkadot/types/types';
import type { Api } from '../api';
import type { CodecString, NumberLike } from '../fp';
import type {
  ValidatorInfo,
  StashNominatorsInfo,
  ActiveEra,
  EraElectionStatus,
  EraRewardPoints,
  AccountStakingLedger,
  AccountStakingLedgerUnlock,
} from './types';

export class StakingModule {
  constructor(private readonly root: Api) {}

  /**
   * Get observable active era
   * @returns era index & era start timestamp
   */
  public getActiveEraObservable(): Observable<ActiveEra> {
    return this.root.apiRx.query.staking.activeEra().pipe(
      map((data) => {
        return data.toJSON() as ActiveEra;
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
        return data.toHuman() as number;
      })
    );
  }

  /**
   * Election status determines whether validator election is completed.
   * This value is very important from the point of view that many calls to the Staking module are only allowed when election is completed.
   * @returns election status of current era
   */
  public getEraElectionStatusObservable(): Observable<EraElectionStatus> {
    return this.root.apiRx.query.staking.eraElectionStatus().pipe(
      map((electionStatus) => {
        return electionStatus.toJSON() as EraElectionStatus;
      })
    );
  }

  /**
   * Get observable eras total stake
   * @param eraIndex index of era
   * @returns total stake balance in XOR (codec string)
   */
  public getEraTotalStakeObservable(eraIndex: number): Observable<CodecString> {
    return this.root.apiRx.query.staking.erasTotalStake(eraIndex).pipe(
      map((data) => {
        return data.toString();
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
        return data.toJSON() as EraRewardPoints;
      })
    );
  }

  /**
   * **CONTROLLER**
   * CONTROLLER - STASH relation
   * Get observable information about stash address, locked funds and claimed rewards
   * @param accountAddress address of controller account
   */
  public getAccountLedgerObservable(accountAddress: string): Observable<AccountStakingLedger> {
    const toCodecString = (value: string) => FPNumber.fromCodecValue(value).toCodecString();

    return this.root.apiRx.query.staking.ledger(accountAddress).pipe(
      map((data) => {
        const { stash, total, active, unlocking } = data.toJSON() as any;

        return {
          stash,
          total: toCodecString(total),
          active: toCodecString(active),
          unlocking: unlocking.map(
            (item) => ({ value: toCodecString(item.value), era: item.era } as AccountStakingLedgerUnlock)
          ),
        };
      })
    );
  }

  /**
   * **STASH**
   * STASH - CONTROLLER relation
   * Get observable controller account address for stash account
   */
  public getControllerObservable(): Observable<string | null> {
    assert(this.root.account, Messages.connectWallet);
    return this.root.apiRx.query.staking
      .bonded(this.root.account.pair.address)
      .pipe(map((data) => data.toHuman() as string | null));
  }

  /**
   * Get list of validators infos (address, commission, blocked)
   */
  public async getValidatorInfos(): Promise<ValidatorInfo[]> {
    const validators = (await this.root.api.query.staking.validators.entries()).map(([key, codec]) => {
      const [address] = key.toHuman() as any;
      const { commission, blocked } = codec.toHuman();

      return { address, commission, blocked };
    });

    return validators as ValidatorInfo[];
  }

  /**
   * Get validators nominated by stash
   * - The call must be initiated by shash;
   * @returns The structure with the list of validators, eraIndex
   */
  public async getStashNominators(): Promise<StashNominatorsInfo> {
    assert(this.root.account, Messages.connectWallet);

    const data = (await this.root.api.query.staking.nominators(this.root.account.pair.address)).toJSON() as any;

    return data as StashNominatorsInfo;
  }

  public formatPayee(payee: StakingRewardsDestination | string): string | { Account: string } {
    return payee in StakingRewardsDestination ? payee : { Account: payee };
  }

  /**
   * Calc bond tx params
   * @param value amount to bond (XOR)
   * @param payee destination of rewards (one of payee or specific account address for payments)
   * @returns
   */
  private calcBondParams(
    value: NumberLike,
    controller: string,
    payee: StakingRewardsDestination | string
  ): [string, string, string | { Account: string }] {
    assert(this.root.account, Messages.connectWallet);
    const amount = new FPNumber(value, XOR.decimals).toCodecString();
    const destination = this.formatPayee(payee);

    return [controller, amount, destination];
  }

  /**
   * **STASH**
   * Lock the stake
   * @param value amount to bond (XOR)
   * @param payee destination of rewards (one of payee or account address for payments)
   */
  public async bond(value: NumberLike, controller: string, payee: StakingRewardsDestination | string): Promise<void> {
    assert(this.root.account, Messages.connectWallet);
    const params = this.calcBondParams(value, controller, payee);
    await this.root.submitExtrinsic(this.root.api.tx.staking.bond(...params), this.root.account.pair, {
      type: Operation.StakingBond,
      symbol: XOR.symbol,
      assetAddress: XOR.address,
      amount: `${value}`,
    });
  }

  /**
   * **STASH**
   * Add more funds to an existing stake
   * @param value amount add to stake
   */
  public async bondExtra(value: NumberLike): Promise<void> {
    assert(this.root.account, Messages.connectWallet);
    await this.root.submitExtrinsic(
      this.root.api.tx.staking.bondExtra(new FPNumber(value, XOR.decimals).toCodecString()),
      this.root.account.pair,
      {
        type: Operation.StakingBondExtra,
        symbol: XOR.symbol,
        assetAddress: XOR.address,
        amount: `${value}`,
      }
    );
  }

  /**
   * **CONTROLLER**
   * Lock again part of currently unlocking value
   * @param value amount to lock in stake
   */
  public async rebond(value: NumberLike): Promise<void> {
    assert(this.root.account, Messages.connectWallet);
    await this.root.submitExtrinsic(
      this.root.api.tx.staking.rebond(new FPNumber(value, XOR.decimals).toCodecString()),
      this.root.account.pair,
      {
        type: Operation.StakingRebond,
        symbol: XOR.symbol,
        assetAddress: XOR.address,
        amount: `${value}`,
      }
    );
  }

  /**
   * **CONTROLLER**
   * To withdraw part of the staked amount a user must perform unbounding firstly
   * @param value amount to unbond from stake
   */
  public async unbond(value: NumberLike): Promise<void> {
    assert(this.root.account, Messages.connectWallet);
    await this.root.submitExtrinsic(
      this.root.api.tx.staking.unbond(new FPNumber(value, XOR.decimals).toCodecString()),
      this.root.account.pair,
      {
        type: Operation.StakingUnbond,
        symbol: XOR.symbol,
        assetAddress: XOR.address,
        amount: `${value}`,
      }
    );
  }

  /**
   * **CONTROLLER**
   * Moves unlocked value to the free balance of the stash account
   * @param value amount to withdraw - not used in extrinsic call, but can be passed to save this value in history
   */
  public async withdrawUndonded(value?: NumberLike): Promise<void> {
    assert(this.root.account, Messages.connectWallet);
    /**
     * slashingSpans parameter is needed to ensure
     * that the user agrees that staking information will be removed when there is no unlocking items pending
     * and active value goes below minimum_balance due to slashing.
     */
    const slashingSpans = 0;
    await this.root.submitExtrinsic(this.root.api.tx.staking.withdrawUnbonded(slashingSpans), this.root.account.pair, {
      type: Operation.StakingWithdrawUnbonded,
      symbol: XOR.symbol,
      assetAddress: XOR.address,
      amount: value ? `${value}` : undefined,
    });
  }

  /**
   * **CONTROLLER**
   * Start nominating a list of validators from the next era
   */
  public async nominate(validators: string[]): Promise<void> {
    assert(this.root.account, Messages.connectWallet);
    await this.root.submitExtrinsic(this.root.api.tx.staking.nominate(validators), this.root.account.pair, {
      type: Operation.StakingNominate,
      validators,
    });
  }

  /**
   * **CONTROLLER**
   * Stop nominating or validating from the next era.
   */
  public async chill(): Promise<void> {
    assert(this.root.account, Messages.connectWallet);
    await this.root.submitExtrinsic(this.root.api.tx.staking.chill(), this.root.account.pair, {
      type: Operation.StakingChill,
    });
  }

  /**
   * **CONTROLLER**
   * Changes new account to which staking reward is sent starting from the next era
   * @param payee rewards destination
   */
  public async setPayee(payee: StakingRewardsDestination): Promise<void> {
    assert(this.root.account, Messages.connectWallet);
    const destination = this.formatPayee(payee);
    await this.root.submitExtrinsic(this.root.api.tx.staking.setPayee(destination), this.root.account.pair, {
      type: Operation.StakingSetPayee,
      payee,
    });
  }

  /**
   * **STASH**
   * Set new controller for the current stash starting from the next era
   * @param accountAddress address of controller account
   */
  public async setController(accountAddress: string): Promise<void> {
    assert(this.root.account, Messages.connectWallet);
    await this.root.submitExtrinsic(this.root.api.tx.staking.setController(accountAddress), this.root.account.pair, {
      type: Operation.StakingSetPayee,
      controller: accountAddress,
    });
  }

  /**
   * Distribute payout for staking in a given era for given validators
   * @param validators array of validators addresses
   * @param eraIndex era index
   */
  public async payout(validators: string[], eraIndex: number): Promise<void> {
    assert(this.root.account, Messages.connectWallet);
    const transactions = validators.map((validator) => this.root.api.tx.staking.payoutStakers(validator, eraIndex));
    const call = transactions.length > 1 ? this.root.api.tx.utility.batchAll(transactions) : transactions[0];

    await this.root.submitExtrinsic(call, this.root.account.pair, {
      type: Operation.StakingPayout,
      validators,
    });
  }
}
