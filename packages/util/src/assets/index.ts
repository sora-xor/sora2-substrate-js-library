import { assert } from '@polkadot/util';
import { Subscription, Subject, combineLatest, map } from 'rxjs';
import { FPNumber, NumberLike } from '@sora-substrate/math';
import type { BalanceInfo } from '@sora-substrate/types';
import type { ApiPromise } from '@polkadot/api';
import type { Observable } from '@polkadot/types/types';
import type { OrmlTokensAccountData, PalletBalancesAccountData } from '@polkadot/types/lookup';
import type { Option, u128 } from '@polkadot/types-codec';

import { KnownAssets, NativeAssets, XOR } from './consts';
import { PoolTokens } from '../poolXyk/consts';
import { Messages } from '../logger';
import { Operation } from '../BaseApi';
import type {
  AccountAsset,
  AccountBalance,
  Asset,
  Blacklist,
  Whitelist,
  WhitelistArrayItem,
  WhitelistIdsBySymbol,
} from './types';
import type { Api } from '../api';

/**
 * **For the external collaboration**
 *
 * Useful method for balance formatting
 *
 * @param data Account Data for ORML tokens or for PalletBalances
 * @param assetDecimals Asset decimals, 18 is used by default
 * @param bondedData Required only for XOR tokens in SORA network
 */
export function formatBalance(
  data: PalletBalancesAccountData | OrmlTokensAccountData,
  assetDecimals?: number,
  bondedData?: Option<u128>
): AccountBalance {
  const free = new FPNumber(data.free || 0, assetDecimals);
  const reserved = new FPNumber(data.reserved || 0, assetDecimals);
  // [Substrate 4: PalletBalancesAccountData]
  const miscFrozen = new FPNumber((data as PalletBalancesAccountData).miscFrozen || 0, assetDecimals);
  // [Substrate 4: PalletBalancesAccountData]
  const feeFrozen = new FPNumber((data as PalletBalancesAccountData).feeFrozen || 0, assetDecimals);
  const frozenDeprecated = FPNumber.max(miscFrozen, feeFrozen);
  // [Substrate 5: PalletBalancesAccountData] & OrmlTokensAccountData
  const frozenCurrent = new FPNumber((data as OrmlTokensAccountData).frozen || 0, assetDecimals);
  const frozen = FPNumber.max(frozenCurrent, frozenDeprecated);
  // [SORA] bondedData can be NaN, it can be checked by isEmpty===true
  const bonded = new FPNumber(!bondedData || bondedData.isEmpty ? 0 : bondedData, assetDecimals);
  // [SORA]
  const locked = reserved.add(frozen).add(bonded);

  return {
    free: free.toCodecString(),
    reserved: reserved.toCodecString(),
    frozen: frozen.toCodecString(),
    bonded: bonded.toCodecString(),
    locked: locked.toCodecString(),
    total: free.add(locked).toCodecString(),
    transferable: free.sub(frozen).toCodecString(),
  };
}

async function getAssetInfo(api: ApiPromise, address: string): Promise<Asset> {
  const [symbol, name, decimals, _, content, description] = (
    await api.query.assets.assetInfos({ code: address })
  ).toHuman() as any;
  return { address, symbol, name, decimals: +decimals, content, description } as Asset;
}

/**
 * **For the external collaboration**
 *
 * Returns Asset Balance.
 *
 * If Asset ID == XOR, referrals.referrerBalances will be included as bonded
 *
 * @param api Polkadot based API object
 * @param accountAddress Account ID
 * @param assetAddress Asset ID
 * @param assetDecimals Asset decimals, 18 is used by default
 */
export async function getAssetBalance(
  api: ApiPromise,
  accountAddress: string,
  assetAddress: string,
  assetDecimals = 18
): Promise<AccountBalance> {
  if (assetAddress === XOR.address) {
    const [accountInfo, bondedBalance] = await Promise.all([
      api.query.system.account(accountAddress),
      api.query.referrals.referrerBalances(accountAddress),
    ]);
    return formatBalance(accountInfo.data, assetDecimals, bondedBalance);
  }
  const accountData = await api.query.tokens.accounts(accountAddress, assetAddress);
  return formatBalance(accountData, assetDecimals);
}

function isRegisteredAsset(asset: any, whitelist: Whitelist): boolean {
  if (!asset.address) {
    return false;
  }
  return !!whitelist[asset.address];
}

/**
 * Used *ONLY* for faucet
 */
export function getBalance(
  api: ApiPromise,
  accountAddress: string,
  assetAddress: string
): Promise<Option<BalanceInfo>> {
  return api.rpc.assets.usableBalance(accountAddress, assetAddress);
}

export function isNativeAsset(asset: any): boolean {
  if (!asset.address) {
    return false;
  }
  return !!NativeAssets.get(asset.address);
}

export function excludePoolXYKAssets(assets: Asset[]): Asset[] {
  return assets.filter((asset) => asset.symbol !== PoolTokens.XYKPOOL);
}

export function isBlacklistedAssetAddress(address: string, blacklist: Blacklist): boolean {
  return blacklist.includes(address);
}

export function getLegalAssets(allAssets: Array<Asset>, blacklist: Blacklist): Array<Asset> {
  if (!blacklist.length) return allAssets;

  return allAssets.filter(({ address }) => !isBlacklistedAssetAddress(address, blacklist));
}

export async function getAssets(api: ApiPromise, whitelist?: Whitelist, blacklist?: Blacklist): Promise<Array<Asset>> {
  const allAssets = (await api.query.assets.assetInfos.entries()).map(([key, codec]) => {
    const address = key.args[0].code.toString();
    const [symbol, name, decimals, _, content, description] = codec.toHuman() as any;
    return { address, symbol, name, decimals: +decimals, content, description };
  }) as Array<Asset>;

  const assets = blacklist?.length ? getLegalAssets(allAssets, blacklist) : allAssets;

  return !whitelist
    ? assets
    : assets.sort((a, b) => {
        const isNativeA = isNativeAsset(a);
        const isNativeB = isNativeAsset(b);
        const isRegisteredA = isRegisteredAsset(a, whitelist);
        const isRegisteredB = isRegisteredAsset(b, whitelist);
        if ((isNativeA && !isNativeB) || (isRegisteredA && !isRegisteredB)) {
          return -1;
        }
        if ((!isNativeA && isNativeB) || (!isRegisteredA && isRegisteredB)) {
          return 1;
        }
        if (a.symbol < b.symbol) {
          return -1;
        }
        if (a.symbol > b.symbol) {
          return 1;
        }
        return 0;
      });
}

export class AssetsModule<T> {
  constructor(private readonly root: Api<T>) {}

  /**
   * Get whitelist assets object
   * @param whitelist Whitelist array
   */
  getWhitelist(whitelist: Array<WhitelistArrayItem>): Whitelist {
    return whitelist.reduce<Whitelist>((acc, asset) => {
      const { address, name, symbol, decimals, icon } = asset;
      acc[address] = { name, symbol, decimals, icon };
      return acc;
    }, {});
  }

  /**
   * Check is whitelisted asset or not
   * @param asset Asset object
   * @param whitelist Whitelist assets object
   */
  isWhitelist(asset: Partial<Asset>, whitelist: Whitelist): boolean {
    return isRegisteredAsset(asset, whitelist);
  }

  /**
   * Get whitelist object by symbol as keys
   * @param whitelist Whitelist array
   */
  getWhitelistIdsBySymbol(whitelist: Array<WhitelistArrayItem>) {
    return whitelist.reduce<WhitelistIdsBySymbol>((acc, asset) => {
      const { address, symbol } = asset;
      acc[symbol.toUpperCase()] = address;
      return acc;
    }, {});
  }

  /**
   * Check is blacklisted asset or not
   * @param asset Asset object
   * @param whitelistIdsBySymbol whitelist object by symbol as keys
   */
  isBlacklist(asset: Partial<Asset>, whitelistIdsBySymbol: WhitelistIdsBySymbol): boolean {
    const { address, symbol } = asset;
    if (!address || !symbol) {
      return false;
    }
    const foundAddress = whitelistIdsBySymbol[symbol];
    if (!foundAddress) {
      return false;
    }
    return foundAddress !== address;
  }

  /**
   * Checks if asset is NFT or not.
   *
   * **Asset is NFT if it has content and description fields**
   * @param asset
   */
  isNft(asset: Asset | AccountAsset): boolean {
    return !!(asset.content && asset.description);
  }

  /**
   * Checks if NFT asset is blacklisted or not.
   * @param asset Asset object
   * @param blacklist Blacklist assets object
   */
  isNftBlacklisted(asset: Partial<Asset>, blacklist: Blacklist): boolean {
    if (!asset.address) {
      return false;
    }

    return blacklist.includes(asset.address);
  }

  // Default assets addresses of account - list of NativeAssets addresses
  public accountDefaultAssetsAddresses: Array<string> = NativeAssets.map((asset) => asset.address);

  private _accountAssetsAddresses: Array<string> = [];
  private balanceSubscriptions: Map<string, Subscription> = new Map();
  private balanceSubject = new Subject<void>();
  public balanceUpdated = this.balanceSubject.asObservable();
  public accountAssets: Array<AccountAsset> = [];

  // # Account assets methods

  private subscribeToAssetBalance(asset: AccountAsset): void {
    const subscription = this.getAssetBalanceObservable(asset).subscribe((accountBalance: AccountBalance) => {
      asset.balance = accountBalance;
      this.balanceSubject.next();
    });
    this.balanceSubscriptions.set(asset.address, subscription);
  }

  private unsubscribeFromAssetBalance(address: string): void {
    this.balanceSubscriptions.get(address)?.unsubscribe();
    this.balanceSubscriptions.delete(address);
  }

  private async addToAccountAssetsList(address: string): Promise<void> {
    if (this.getAsset(address)) return;
    // Get asset data and balance info
    const asset = await this.getAccountAsset(address);
    // During async execution of the method above, asset may have already been added
    // Check again, that asset is not in account assets list
    if (!this.getAsset(address)) {
      this.accountAssets.push(asset);
      this.subscribeToAssetBalance(asset);
    }
  }

  private removeFromAccountAssets(address: string): void {
    this.accountAssets = this.accountAssets.filter((item) => item.address !== address);
  }

  private removeFromAccountAssetsList(address: string): void {
    this.unsubscribeFromAssetBalance(address);
    this.removeFromAccountAssets(address);
    this.balanceSubject.next();
  }

  /**
   * Add account asset to the end of list & create balance subscription
   * @param address asset address
   */
  public async addAccountAsset(address: string): Promise<void> {
    this.addToAccountAssetsAddressesList(address);
    await this.addToAccountAssetsList(address);
  }

  /**
   * Remove account asset & it's balance subscription
   * @param address asset address
   */
  public removeAccountAsset(address: string): void {
    this.removeFromAccountAssetsAddressesList(address);
    this.removeFromAccountAssetsList(address);
  }

  /**
   * Clear account assets & their balance subscriptions
   */
  public clearAccountAssets() {
    for (const address of this.balanceSubscriptions.keys()) {
      this.unsubscribeFromAssetBalance(address);
    }
    this.accountAssets = [];
  }

  /**
   * Find account asset in account assets list
   * @param address asset address
   */
  public getAsset(address: string): AccountAsset | null {
    return this.accountAssets.find((asset) => asset.address === address) ?? null;
  }

  public getAssetBalanceObservable(asset: AccountAsset | Asset): Observable<AccountBalance> {
    const accountAddress = this.root.account.pair.address;
    const assetAddress = asset.address;
    if (assetAddress === XOR.address) {
      const accountInfo = this.root.apiRx.query.system.account(accountAddress);
      const bondedBalance = this.root.apiRx.query.referrals.referrerBalances(accountAddress);

      return combineLatest([accountInfo, bondedBalance]).pipe(
        map((result) => formatBalance(result[0].data, asset.decimals, result[1]))
      );
    }
    return this.root.apiRx.query.tokens
      .accounts(accountAddress, assetAddress)
      .pipe(map((accountData) => formatBalance(accountData, asset.decimals)));
  }

  /**
   * Get total XOR balance including staking
   * and liquidity poolings
   *
   */
  public getTotalXorBalanceObservable(): Observable<FPNumber> {
    return combineLatest([
      this.getAssetBalanceObservable(XOR),
      this.root.demeterFarming.getAccountPoolsObservable(),
    ]).pipe(
      map(([xorAssetBalance, demeterFarmingPools]) => {
        // wallet xor balance (including frozen & bonded)
        const xorBalanceTotal = FPNumber.fromCodecValue(xorAssetBalance.total);

        // staked xor in demeter farming platform
        const xorStaked = demeterFarmingPools
          .filter((pool) => pool.isFarm === false && pool.poolAsset === XOR.address)
          .map((pool) => pool.pooledTokens);
        const xorStakedTotal = xorStaked.reduce((prev, curr) => prev.add(curr), FPNumber.ZERO);

        // pooled xor
        const xorPooled = this.root.poolXyk.accountLiquidity
          .filter((pool) => pool.firstAddress === XOR.address || pool.secondAddress === XOR.address)
          .map((pool) => (pool.firstAddress === XOR.address ? pool.firstBalance : pool.secondBalance))
          .map((pooledXor) => FPNumber.fromCodecValue(pooledXor));
        const xorPooledTotal = xorPooled.reduce((prev, curr) => prev.add(curr), FPNumber.ZERO);

        return xorBalanceTotal.add(xorStakedTotal).add(xorPooledTotal);
      })
    );
  }

  /**
   * Sync account assets with account assets address list
   * During update process, assets should be removed according to 'excludedAddresses'
   * and exists in accounts assets list according to 'currentAddresses'
   */
  public async updateAccountAssets(): Promise<void> {
    assert(this.root.account, Messages.connectWallet);

    if (!this.accountAssetsAddresses.length) {
      const defaultList = this.accountDefaultAssetsAddresses;
      const accountList = await this.getAccountTokensAddressesList();
      this.accountAssetsAddresses = [...new Set([...defaultList, ...accountList])];
    }

    const currentAddresses = this.accountAssetsAddresses;
    const excludedAddresses = this.accountAssets.reduce<string[]>(
      (result, { address }) => (currentAddresses.includes(address) ? result : [...result, address]),
      []
    );

    for (const assetAddress of excludedAddresses) {
      this.removeFromAccountAssetsList(assetAddress);
    }

    if (!currentAddresses.length) return;

    const addToAccountAssetsListPromises = currentAddresses.map((assetId) => this.addToAccountAssetsList(assetId));
    await Promise.allSettled(addToAccountAssetsListPromises);
    // sort assets by currentAddresses list
    this.accountAssets.sort((a, b) => {
      return currentAddresses.indexOf(a.address) - currentAddresses.indexOf(b.address);
    });
  }

  /**
   * Get asset information
   * @param address asset address
   */
  public async getAssetInfo(address: string): Promise<Asset> {
    const knownAsset = KnownAssets.get(address);
    if (knownAsset) {
      return knownAsset;
    }
    const existingAsset =
      this.getAsset(address) || this.root.poolXyk.accountLiquidity.find((asset) => asset.address === address);
    if (existingAsset) {
      return {
        address: existingAsset.address,
        decimals: existingAsset.decimals,
        symbol: existingAsset.symbol,
        name: existingAsset.name,
        content: (existingAsset as AccountAsset).content, // will be undefined,
        description: (existingAsset as AccountAsset).description, // if there are no such props
      } as Asset;
    }
    return await getAssetInfo(this.root.api, address);
  }

  /**
   * Get account asset information.
   * You can just check balance of any asset
   * @param address asset address
   */
  public async getAccountAsset(address: string): Promise<AccountAsset> {
    assert(this.root.account, Messages.connectWallet);
    const { decimals, symbol, name, content, description } = await this.getAssetInfo(address);
    const asset = { address, decimals, symbol, name, content, description } as AccountAsset;
    const result = await getAssetBalance(this.root.api, this.root.account.pair.address, address, decimals);
    asset.balance = result;

    return asset;
  }

  /**
   * Get account ORML tokens list with any non zero balance
   */
  public async getAccountTokensAddressesList(): Promise<string[]> {
    const data = await this.root.api.query.tokens.accounts.entries(this.root.account.pair.address);
    const list = [];

    for (const [key, { free, reserved, frozen }] of data) {
      const assetId = key.args[1].code.toString();
      const hasAssetAnyBalance = [free, reserved, frozen].some((value) => !new FPNumber(value).isZero());

      if (hasAssetAnyBalance) {
        list.push(assetId);
      }
    }

    return list;
  }

  // # Account assets addresses

  public get accountAssetsAddresses(): Array<string> {
    if (this.root.accountStorage) {
      const addresses = this.root.accountStorage.get('assetsAddresses');
      this._accountAssetsAddresses = addresses ? (JSON.parse(addresses) as Array<string>) : [];
    }
    return this._accountAssetsAddresses;
  }

  public set accountAssetsAddresses(assetsAddresses: Array<string>) {
    this.root.accountStorage?.set('assetsAddresses', JSON.stringify(assetsAddresses));
    this._accountAssetsAddresses = [...assetsAddresses];
  }

  private addToAccountAssetsAddressesList(assetAddress: string): void {
    if (this.accountAssetsAddresses.includes(assetAddress)) return;
    // add address to the end of list
    this.accountAssetsAddresses = [...this.accountAssetsAddresses, assetAddress];
  }

  private removeFromAccountAssetsAddressesList(address: string): void {
    this.accountAssetsAddresses = this.accountAssetsAddresses.filter((item) => item !== address);
  }

  /**
   * Get all tokens list registered in the blockchain network
   * @param withPoolTokens `false` by default
   * @param whitelist set of whitelist tokens
   * @param blacklist set of blacklist tokens
   */
  public async getAssets(withPoolTokens = false, whitelist?: Whitelist, blacklist?: Blacklist): Promise<Array<Asset>> {
    const assets = await getAssets(this.root.api, whitelist, blacklist);

    return withPoolTokens ? assets : excludePoolXYKAssets(assets);
  }

  /**
   * Get all tokens addresses list registered in the blockchain network
   * @param blacklist set of blacklist tokens
   */
  public async getAssetsIds(blacklist?: Blacklist): Promise<string[]> {
    const ids = (await this.root.api.rpc.assets.listAssetIds()).map((codec) => codec.toString());
    const filtered = blacklist?.length ? ids.filter((id) => !isBlacklistedAssetAddress(id, blacklist)) : ids;

    return filtered;
  }

  private calcRegisterAssetParams(
    symbol: string,
    name: string,
    totalSupply: NumberLike,
    extensibleSupply: boolean,
    nonDivisible: boolean,
    nft = {
      content: null,
      description: null,
    }
  ) {
    assert(this.root.account, Messages.connectWallet);
    const supply = new FPNumber(totalSupply, nonDivisible ? 0 : FPNumber.DEFAULT_PRECISION);
    return {
      args: [symbol, name, supply.toCodecString(), extensibleSupply, nonDivisible, nft.content, nft.description],
    };
  }

  /**
   * Register asset
   * @param symbol string with asset symbol
   * @param name string with asset name
   * @param totalSupply total token supply
   * @param extensibleSupply `true` means that token can be mintable any time by the owner of that token. `false` by default
   * @param nonDivisible `false` by default
   * @param nft Nft params object which contains content & description
   */
  public register(
    symbol: string,
    name: string,
    totalSupply: NumberLike,
    extensibleSupply = false,
    nonDivisible = false,
    nft = {
      content: null,
      description: null,
    }
  ): Promise<T> {
    const params = this.calcRegisterAssetParams(symbol, name, totalSupply, extensibleSupply, nonDivisible, nft);
    return this.root.submitExtrinsic(
      (this.root.api.tx.assets.register as any)(...params.args),
      this.root.account.pair,
      {
        symbol,
        type: Operation.RegisterAsset,
      }
    );
  }
}
