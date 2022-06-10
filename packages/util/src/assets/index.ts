import { assert } from '@polkadot/util';
import { map } from '@polkadot/x-rxjs/operators';
import { combineLatest } from '@polkadot/x-rxjs';
import { Subject } from '@polkadot/x-rxjs';
import { FPNumber, NumberLike } from '@sora-substrate/math';
import type { ApiPromise } from '@polkadot/api';
import type { Codec, Observable } from '@polkadot/types/types';
import type { AccountData } from '@polkadot/types/interfaces/balances';
import type { OrmlAccountData } from '@open-web3/orml-types/interfaces/tokens';
import type { Subscription } from '@polkadot/x-rxjs';

import { KnownAssets, NativeAssets, XOR } from './consts';
import { PoolTokens } from '../poolXyk/consts';
import { Messages } from '../logger';
import { Operation } from '../BaseApi';
import type { AccountAsset, AccountBalance, Asset, Whitelist, WhitelistArrayItem } from './types';
import type { Api } from '../api';

function formatBalance(
  data: AccountData | OrmlAccountData,
  assetDecimals?: number,
  bondedData?: Codec
): AccountBalance {
  const free = new FPNumber(data.free || 0, assetDecimals);
  const reserved = new FPNumber(data.reserved || 0, assetDecimals);
  const miscFrozen = new FPNumber((data as AccountData).miscFrozen || 0, assetDecimals);
  const feeFrozen = new FPNumber((data as AccountData).feeFrozen || 0, assetDecimals);
  const frozen = new FPNumber((data as OrmlAccountData).frozen || 0, assetDecimals);
  const locked = FPNumber.max(miscFrozen, feeFrozen);
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
    await api.query.assets.assetInfos(address)
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
export async function getBalance(api: ApiPromise, accountAddress: string, assetAddress: string): Promise<Codec> {
  return await (api.rpc as any).assets.usableBalance(accountAddress, assetAddress); // BalanceInfo
}

export function isNativeAsset(asset: any): boolean {
  if (!asset.address) {
    return false;
  }
  return !!NativeAssets.get(asset.address);
}

export async function getAssets(api: ApiPromise, whitelist?: Whitelist): Promise<Array<Asset>> {
  const assets = (await api.query.assets.assetInfos.entries()).map(([key, codec]) => {
    const [address] = key.toHuman() as any;
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
      acc[asset.address] = {
        name: asset.name,
        symbol: asset.symbol,
        decimals: asset.decimals,
        icon: asset.icon,
      };
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
    return whitelist.reduce<any>((acc, asset) => {
      acc[asset.symbol.toUpperCase()] = asset.address;
      return acc;
    }, {});
  }

  /**
   * Check is blacklisted asset or not
   * @param asset Asset object
   * @param whitelistIdsBySymbol whitelist object by symbol as keys
   */
  isBlacklist(asset: Partial<Asset>, whitelistIdsBySymbol: any): boolean {
    if (!asset.address || !asset.symbol) {
      return false;
    }
    const address = whitelistIdsBySymbol[asset.symbol];
    if (!address) {
      return false;
    }
    return address !== asset.address;
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
    if (!this.getAsset(address)) {
      const asset = await this.getAccountAsset(address);
      this.accountAssets.push(asset);
      this.subscribeToAssetBalance(asset);
    }
  }

  private removeFromAccountAssetsList(address: string): void {
    this.unsubscribeFromAssetBalance(address);
    this.accountAssets = this.accountAssets.filter((item) => item.address !== address);
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
    if (asset.address === XOR.address) {
      const accountInfo = this.root.apiRx.query.system.account(accountAddress);
      const bondedBalance = this.root.apiRx.query.referrals.referrerBalances(accountAddress);

      return combineLatest([accountInfo, bondedBalance]).pipe(
        map((result) => formatBalance(result[0].data, asset.decimals, result[1]))
      );
    }
    return this.root.apiRx.query.tokens
      .accounts(accountAddress, asset.address)
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
      this._accountAssetsAddresses =
        (JSON.parse(this.root.accountStorage.get('assetsAddresses')) as Array<string>) || [];
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
    const supply = nonDivisible ? new FPNumber(totalSupply, 0) : new FPNumber(totalSupply);
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
