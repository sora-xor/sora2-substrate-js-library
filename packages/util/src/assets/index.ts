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
import type { AccountAsset, AccountBalance, Asset, Whitelist, WhitelistArrayItem, WhitelistIdsBySymbol } from './types';
import type { Api } from '../api';

function formatBalance(
  data: PalletBalancesAccountData | OrmlTokensAccountData,
  assetDecimals?: number,
  bondedData?: Option<u128>
): AccountBalance {
  const free = new FPNumber(data.free || 0, assetDecimals);
  const reserved = new FPNumber(data.reserved || 0, assetDecimals);
  const miscFrozen = new FPNumber((data as PalletBalancesAccountData).miscFrozen || 0, assetDecimals);
  const feeFrozen = new FPNumber((data as PalletBalancesAccountData).feeFrozen || 0, assetDecimals);
  const frozen = new FPNumber((data as OrmlTokensAccountData).frozen || 0, assetDecimals);
  const locked = FPNumber.max(miscFrozen, feeFrozen) as FPNumber;
  // bondedData can be NaN, it can be checked by isEmpty===true
  const bonded = new FPNumber(!bondedData || bondedData.isEmpty ? 0 : bondedData, assetDecimals);
  const freeAndReserved = free.add(reserved);
  return {
    reserved: reserved.toCodecString(),
    locked: locked.toCodecString(),
    total: freeAndReserved.add(bonded).toCodecString(),
    transferable: free.sub(locked).toCodecString(),
    frozen: (frozen.isZero() ? locked.add(reserved) : frozen).add(bonded).toCodecString(),
    bonded: bonded.toCodecString(),
  } as AccountBalance;
}

async function getAssetInfo(api: ApiPromise, address: string): Promise<Asset> {
  const [symbol, name, decimals, _, content, description] = (
    await api.query.assets.assetInfos({ code: address })
  ).toHuman() as any;
  return { address, symbol, name, decimals: +decimals, content, description } as Asset;
}

async function getAssetBalance(
  api: ApiPromise,
  accountAddress: string,
  assetAddress: string,
  assetDecimals: number
): Promise<AccountBalance> {
  if (assetAddress === XOR.address) {
    const accountInfo = await api.query.system.account(accountAddress);
    const bondedBalance = await api.query.referrals.referrerBalances(accountAddress);
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
export async function getBalance(
  api: ApiPromise,
  accountAddress: string,
  assetAddress: string
): Promise<Option<BalanceInfo>> {
  return await api.rpc.assets.usableBalance(accountAddress, assetAddress);
}

export function isNativeAsset(asset: any): boolean {
  if (!asset.address) {
    return false;
  }
  return !!NativeAssets.get(asset.address);
}

export async function getAssets(api: ApiPromise, whitelist?: Whitelist): Promise<Array<Asset>> {
  const assets = (await api.query.assets.assetInfos.entries()).map(([key, codec]) => {
    const address = key.args[0].code.toString();
    const [symbol, name, decimals, _, content, description] = codec.toHuman() as any;
    return { address, symbol, name, decimals: +decimals, content, description };
  }) as Array<Asset>;
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

export class AssetsModule {
  constructor(private readonly root: Api) {}

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
    const accountAsset = this.getAsset(address);

    if (!accountAsset) {
      const asset = await this.getAccountAsset(address);
      this.accountAssets.push(asset);
      this.subscribeToAssetBalance(asset);
    } else {
      // move asset to the end of list
      this.removeFromAccountAssets(address);
      this.accountAssets.push(accountAsset);
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
   * Add account asset & create balance subscription
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

  public getAssetBalanceObservable(asset: AccountAsset): Observable<AccountBalance> {
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
   * Sync account assets with account assets address list
   * During update process, assets should be removed according to 'excludedAddresses'
   * and exists in accounts assets list according to 'currentAddresses'
   */
  public async updateAccountAssets(): Promise<void> {
    assert(this.root.account, Messages.connectWallet);

    if (!this.accountAssetsAddresses.length) {
      this.accountAssetsAddresses = this.accountDefaultAssetsAddresses;
    }

    const currentAddresses = this.accountAssetsAddresses;
    const excludedAddresses = this.accountAssets.reduce<string[]>(
      (result, { address }) => (currentAddresses.includes(address) ? result : [...result, address]),
      []
    );

    for (const assetAddress of excludedAddresses) {
      this.removeFromAccountAssetsList(assetAddress);
    }

    for (const assetAddress of currentAddresses) {
      await this.addToAccountAssetsList(assetAddress);
    }
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
    const assetsAddressesCopy = [...this.accountAssetsAddresses];
    const index = assetsAddressesCopy.findIndex((address) => address === assetAddress);

    ~index ? (assetsAddressesCopy[index] = assetAddress) : assetsAddressesCopy.push(assetAddress);

    this.accountAssetsAddresses = assetsAddressesCopy;
  }

  private removeFromAccountAssetsAddressesList(address: string): void {
    this.accountAssetsAddresses = this.accountAssetsAddresses.filter((item) => item !== address);
  }

  /**
   * Get all tokens list registered in the blockchain network
   * @param whitelist set of whitelist tokens
   * @param withPoolTokens `false` by default
   */
  public async getAssets(whitelist?: Whitelist, withPoolTokens = false): Promise<Array<Asset>> {
    const assets = await getAssets(this.root.api, whitelist);
    return withPoolTokens ? assets : assets.filter((asset) => asset.symbol !== PoolTokens.XYKPOOL);
  }

  private async calcRegisterAssetParams(
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
  public async register(
    symbol: string,
    name: string,
    totalSupply: NumberLike,
    extensibleSupply = false,
    nonDivisible = false,
    nft = {
      content: null,
      description: null,
    }
  ): Promise<void> {
    const params = await this.calcRegisterAssetParams(symbol, name, totalSupply, extensibleSupply, nonDivisible, nft);
    await this.root.submitExtrinsic((this.root.api.tx.assets.register as any)(...params.args), this.root.account.pair, {
      symbol,
      type: Operation.RegisterAsset,
    });
  }
}
