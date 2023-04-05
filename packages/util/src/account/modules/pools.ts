import { Subject, combineLatest, map } from 'rxjs';
import type { Subscription } from 'rxjs';

import { serializeLPKey, deserializeLPKey } from '../../poolXyk';
import { poolAccountIdFromAssetPair } from '../../poolXyk/account';

import type { BaseApi } from '../../BaseApi';
import type { Account } from '../../account';

import type { AccountLiquidity } from '../../poolXyk/types';

class AccountPools {
  protected readonly account!: Account;
  protected readonly root!: BaseApi;

  constructor(account: Account, root: BaseApi) {
    this.account = account;
    this.root = root;
  }

  /** key = `baseAssetId,targetAssetId` */
  private subscriptions: Map<string, Subscription> = new Map();
  private subject = new Subject<void>();
  public updated = this.subject.asObservable();
  public accountLiquidity: Array<AccountLiquidity> = [];
  public accountLiquidityLoaded!: Subject<void>;

  private addToLiquidityList(asset: AccountLiquidity): void {
    const liquidityCopy = [...this.accountLiquidity];
    const index = liquidityCopy.findIndex((item) => item.address === asset.address);

    ~index ? (liquidityCopy[index] = asset) : liquidityCopy.push(asset);

    this.accountLiquidity = liquidityCopy;
  }

  private removeAccountLiquidity(liquidity: Partial<AccountLiquidity>): void {
    this.unsubscribeFromAccountLiquidity(liquidity);
    this.accountLiquidity = this.accountLiquidity.filter(({ firstAddress, secondAddress }) => {
      return !(liquidity.firstAddress === firstAddress && liquidity.secondAddress === secondAddress);
    });
  }

  public unsubscribeFromAccountLiquidity(liquidity: Partial<AccountLiquidity>): void {
    const key = serializeLPKey(liquidity);
    this.subscriptions.get(key)?.unsubscribe();
    this.subscriptions.delete(key);
  }

  public unsubscribeFromAllUpdates(): void {
    for (const key of this.subscriptions.keys()) {
      const liquidity = deserializeLPKey(key);
      this.unsubscribeFromAccountLiquidity(liquidity);
    }
  }

  public clearAccountLiquidity(): void {
    this.unsubscribeFromAllUpdates();
    this.accountLiquidity = [];
  }

  private async subscribeOnAccountLiquidity(liquidity: Partial<AccountLiquidity>): Promise<void> {
    if (this.subscriptions.has(serializeLPKey(liquidity))) return;

    const { firstAddress, secondAddress } = liquidity;
    const poolAccount = poolAccountIdFromAssetPair(this.root, firstAddress, secondAddress).toString();

    const accountPoolBalanceObservable = this.root.poolXyk.getPoolBalanceObservable(
      firstAddress,
      secondAddress,
      this.account.address
    );
    const poolReservesObservable = this.root.poolXyk.getReservesObservable(firstAddress, secondAddress);
    const poolTotalSupplyObservable = this.root.poolXyk.getTotalSupplyObservable(firstAddress, secondAddress);

    let subscription: Subscription;
    let isFirstTick = true;

    const key = serializeLPKey(liquidity);

    await new Promise<void>((resolve) => {
      subscription = combineLatest([
        poolReservesObservable,
        accountPoolBalanceObservable,
        poolTotalSupplyObservable,
      ]).subscribe(async ([reserves, balance, supply]) => {
        const updatedLiquidity = await this.root.poolXyk.getAccountLiquidityItem(
          poolAccount,
          firstAddress,
          secondAddress,
          reserves,
          balance,
          supply
        );
        // add or update liquidity only if subscription exists, or this is first subscription result
        if (updatedLiquidity && (this.subscriptions.has(key) || isFirstTick)) {
          this.addToLiquidityList(updatedLiquidity);
        } else {
          this.removeAccountLiquidity(liquidity); // Remove it from list if something was wrong
        }

        isFirstTick = false;
        this.subject.next();
        resolve();
      });
    });

    this.subscriptions.set(key, subscription);
  }

  /**
   * Set subscriptions for balance updates of the account asset list
   * @param assetIdPairs
   */
  private async updateAccountLiquiditySubscriptions(assetIdPairs: Array<Array<string>>): Promise<void> {
    // liquidities to be subscribed
    const includedLiquidityList = assetIdPairs.map(([first, second]) => ({
      firstAddress: first,
      secondAddress: second,
    }));
    // liquidities to be unsubscribed and removed
    const excludedLiquidityList = this.accountLiquidity.reduce<AccountLiquidity[]>(
      (result, liquidity) =>
        assetIdPairs.find(([first, second]) => liquidity.firstAddress === first && liquidity.secondAddress === second)
          ? result
          : [...result, liquidity],
      []
    );

    for (const liquidity of excludedLiquidityList) {
      this.removeAccountLiquidity(liquidity);
    }

    for (const liquidity of includedLiquidityList) {
      await this.subscribeOnAccountLiquidity(liquidity);
    }

    this.subject.next();
  }

  /**
   * Subscription which should be used when user is on the pool page.
   * Also, it can be used in a background - it depends on the performance.
   *
   * Do not forget to call `unsubscribe`
   */
  public getUserPoolsSubscription(): Subscription {
    // assert(this.root.account, Messages.connectWallet);

    this.accountLiquidityLoaded = new Subject<void>();

    const account = this.account.address;
    const baseAssetIds = this.root.dex.baseAssetsIds;
    const multiEntries = baseAssetIds.map((baseAssetId) => [account, baseAssetId]);

    return this.root.apiRx.query.poolXYK.accountPools.multi(multiEntries).subscribe(async (lists) => {
      const assetIdPairs = [];

      lists.forEach((list, index) => {
        const baseAssetId = baseAssetIds[index];

        list.forEach((targetAssetId) => {
          const pair = [baseAssetId, targetAssetId.code.toString()];
          assetIdPairs.push(pair);
        });
      });

      await this.updateAccountLiquiditySubscriptions(assetIdPairs);

      this.accountLiquidityLoaded.complete();
    });
  }
}

export { AccountPools };
