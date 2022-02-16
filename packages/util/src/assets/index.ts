import { assert } from '@polkadot/util';
import { map } from '@polkadot/x-rxjs/operators';
import { combineLatest } from '@polkadot/x-rxjs';
import { Subject } from '@polkadot/x-rxjs';
import type { ApiPromise } from '@polkadot/api';
import type { Codec, Observable } from '@polkadot/types/types';
import type { AccountData } from '@polkadot/types/interfaces/balances';
import type { OrmlAccountData } from '@open-web3/orml-types/interfaces/tokens';
import type { Subscription } from '@polkadot/x-rxjs';

import { FPNumber, NumberLike } from '../fp';
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
  const bonded = new FPNumber(bondedData || 0, assetDecimals);
  const freeAndReserved = free.add(reserved);
  const hasBonded = bonded.isFinity();
  return {
    reserved: reserved.toCodecString(),
    locked: locked.toCodecString(),
    total: (hasBonded ? freeAndReserved.add(bonded) : freeAndReserved).toCodecString(),
    transferable: free.sub(locked).toCodecString(),
    frozen: (frozen.isZero() ? locked.add(reserved) : frozen).toCodecString(),
    bonded: hasBonded ? bonded.toCodecString() : '0',
  } as AccountBalance;
}

async function getAssetInfo(api: ApiPromise, address: string): Promise<Asset> {
  const [symbol, name, decimals, _] = (await api.query.assets.assetInfos(address)).toHuman() as any;
  return { address, symbol, name, decimals: +decimals } as Asset;
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
    const [symbol, name, decimals, _] = codec.toHuman() as any;
    return { address, symbol, name, decimals: +decimals };
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

  // Default assets addresses of account - list of NativeAssets addresses
  public accountDefaultAssetsAddresses: Array<string> = NativeAssets.map((asset) => asset.address);

  private _accountAssetsAddresses: Array<string> = [];
  private balanceSubscriptions: Map<string, Subscription> = new Map();
  private balanceSubject = new Subject<void>();
  public balanceUpdated = this.balanceSubject.asObservable();
  public accountAssets: Array<AccountAsset> = [];

  // # Account assets methods

  private async addToAccountAssetsList(address: string): Promise<void> {
    if (!this.getAsset(address)) {
      const asset = (await this.getAssetInfo(address)) as AccountAsset;
      const subscription = this.getAssetBalanceObservable(asset).subscribe((accountBalance: AccountBalance) => {
        (asset as AccountAsset).balance = accountBalance;
        this.balanceSubject.next();
      });
      this.balanceSubscriptions.set(address, subscription);
      this.accountAssets.push(asset);
    }
  }

  private removeFromAccountAssetsList(address: string): void {
    this.unsubscribeFromAssetBalance(address);
    this.accountAssets = this.accountAssets.filter((item) => item.address !== address);
    this.balanceSubject.next();
  }

  public async addAccountAsset(address: string): Promise<void> {
    this.addToAccountAssetsAddressesList(address);
    await this.addToAccountAssetsList(address);
  }

  public removeAccountAsset(address: string): void {
    this.removeFromAccountAssetsAddressesList(address);
    this.removeFromAccountAssetsList(address);
  }

  public clearAccountAssets() {
    for (const address of this.balanceSubscriptions.keys()) {
      this.unsubscribeFromAssetBalance(address);
    }
    this.accountAssets = [];
  }

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
   * Set subscriptions for balance updates of the account asset list
   */
  public async updateAccountAssets(): Promise<void> {
    assert(this.root.account, Messages.connectWallet);

    if (!this.accountAssetsAddresses.length) {
      this.accountAssetsAddresses = [...this.accountDefaultAssetsAddresses];
    }

    const current = this.accountAssets.map((asset) => asset.address);
    const excluded = current.filter((address) => !this.accountAssetsAddresses.includes(address));

    for (const assetAddress of excluded) {
      this.removeFromAccountAssetsList(assetAddress);
    }

    for (const assetAddress of this.accountAssetsAddresses) {
      this.addToAccountAssetsList(assetAddress);
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
      } as Asset;
    }
    return await getAssetInfo(this.root.api, address);
  }

  /**
   * Get account asset information.
   * You can just check balance of any asset
   * @param address asset address
   * @param addToList should asset be added to list or not
   */
  public async getAccountAsset(address: string): Promise<AccountAsset> {
    assert(this.root.account, Messages.connectWallet);
    const { decimals, symbol, name } = await this.getAssetInfo(address);
    const asset = { address, decimals, symbol, name } as AccountAsset;
    const result = await getAssetBalance(this.root.api, this.root.account.pair.address, address, decimals);
    asset.balance = result;

    return asset;
  }

  private unsubscribeFromAssetBalance(address: string): void {
    if (this.balanceSubscriptions.has(address)) {
      this.balanceSubscriptions.get(address).unsubscribe();
      this.balanceSubscriptions.delete(address);
    }
  }

  // # Account assets addresses

  private get accountAssetsAddresses(): Array<string> {
    if (this.root.accountStorage) {
      this._accountAssetsAddresses =
        (JSON.parse(this.root.accountStorage.get('assetsAddresses')) as Array<string>) || [];
    }
    return this._accountAssetsAddresses;
  }

  private set accountAssetsAddresses(assetsAddresses: Array<string>) {
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
    nft = {
      isNft: false,
      content: null,
      description: null,
    }
  ) {
    assert(this.root.account, Messages.connectWallet);
    const supply = nft.isNft ? new FPNumber(totalSupply, 0) : new FPNumber(totalSupply);
    return {
      args: [symbol, name, supply.toCodecString(), extensibleSupply, nft.isNft, nft.content, nft.description],
    };
  }

  /**
   * Register asset
   * @param symbol string with asset symbol
   * @param name string with asset name
   * @param totalSupply
   * @param extensibleSupply
   */
  public async register(
    symbol: string,
    name: string,
    totalSupply: NumberLike,
    extensibleSupply = false,
    nft = {
      isNft: false,
      content: null,
      description: null,
    }
  ): Promise<void> {
    const params = await this.calcRegisterAssetParams(symbol, name, totalSupply, extensibleSupply, nft);
    await this.root.submitExtrinsic((this.root.api.tx.assets.register as any)(...params.args), this.root.account.pair, {
      symbol,
      type: Operation.RegisterAsset,
    });
  }

  /**
   * Get NFT content
   * @param assetId Asset ID
   */
  public async getNftContent(assetId: string): Promise<string> {
    const content = await this.root.api.query.assets.assetContentSource(assetId);
    return `${content.toHuman()}`;
  }

  /**
   * Get NFT description
   * @param assetId Asset ID
   */
  public async getNftDescription(assetId: string): Promise<string> {
    const desc = await this.root.api.query.assets.assetDescription(assetId);
    return `${desc.toHuman()}`;
  }
}
