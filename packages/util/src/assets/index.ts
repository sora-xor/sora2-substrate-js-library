import { assert } from '@polkadot/util';
import { combineLatest, map } from 'rxjs';
import { FPNumber, NumberLike } from '@sora-substrate/math';
import type { BalanceInfo } from '@sora-substrate/types';
import type { ApiPromise } from '@polkadot/api';
import type { Observable } from '@polkadot/types/types';
import type { OrmlTokensAccountData, PalletBalancesAccountData } from '@polkadot/types/lookup';
import type { Option, u128 } from '@polkadot/types-codec';

import { KnownAssets, NativeAssets, XOR } from './consts';
import { PoolTokens } from '../poolXyk/consts';
import { Operation } from '../BaseApi';
import { Formatters } from '../formatters';
import type {
  AccountAsset,
  AccountBalance,
  Asset,
  Blacklist,
  Whitelist,
  WhitelistArrayItem,
  WhitelistIdsBySymbol,
} from './types';

import type { BaseApi, ApiExtrinsicPayload } from '../BaseApi';

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
  constructor(private readonly root: BaseApi<T>) {}

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

  /**
   * **For the external collaboration**
   *
   * Returns Asset Balance.
   *
   * If Asset ID == XOR, referrals.referrerBalances will be included as bonded
   *
   * @param accountAddress Account ID
   * @param assetAddress Asset ID
   * @param assetDecimals Asset decimals, 18 is used by default
   */
  async getAssetBalance(accountAddress: string, assetAddress: string, assetDecimals = 18): Promise<AccountBalance> {
    if (assetAddress === XOR.address) {
      const accountInfo = await this.root.api.query.system.account(accountAddress);
      const bondedBalance = await this.root.api.query.referrals.referrerBalances(accountAddress);
      return formatBalance(accountInfo.data, assetDecimals, bondedBalance);
    }
    const accountData = await this.root.api.query.tokens.accounts(accountAddress, assetAddress);
    return formatBalance(accountData, assetDecimals);
  }

  public getAssetBalanceObservable(asset: AccountAsset | Asset, accountAddress: string): Observable<AccountBalance> {
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
  public getTotalXorBalanceObservable(accountAddress: string): Observable<FPNumber> {
    return combineLatest([
      this.getAssetBalanceObservable(XOR, accountAddress),
      this.root.demeterFarming.getAccountPoolsObservable(accountAddress),
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
   * Get asset information
   * @param address asset address
   */
  public async getAssetInfo(address: string): Promise<Asset> {
    const knownAsset = KnownAssets.get(address);

    if (knownAsset) {
      return knownAsset;
    }

    // [TODO]: memo

    return await getAssetInfo(this.root.api, address);
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
  ): ApiExtrinsicPayload {
    const params = this.calcRegisterAssetParams(symbol, name, totalSupply, extensibleSupply, nonDivisible, nft);

    const extrinsic = (this.root.api.tx.assets.register as any)(...params.args);
    const history = {
      symbol,
      type: Operation.RegisterAsset,
    };

    return { extrinsic, history };
    // return this.root.submitExtrinsic(extrinsic, this.root.account.pair, history);
  }

  /**
   * Transfer amount from account
   * @param asset Asset object
   * @param toAddress Account address
   * @param amount Amount value
   */
  public transfer(asset: Asset | AccountAsset, toAddress: string, amount: NumberLike): ApiExtrinsicPayload {
    const assetAddress = asset.address;
    const formattedToAddress = toAddress.slice(0, 2) === 'cn' ? toAddress : Formatters.formatAddress(toAddress);

    const extrinsic = this.root.api.tx.assets.transfer(
      assetAddress,
      toAddress,
      new FPNumber(amount, asset.decimals).toCodecString()
    );
    const history = {
      symbol: asset.symbol,
      to: formattedToAddress,
      amount: `${amount}`,
      assetAddress,
      type: Operation.Transfer,
    };

    return { extrinsic, history };

    // return this.root.submitExtrinsic(extrinsic, this.root.account.pair, history);
  }

  private divideAssetsInternal(
    firstAsset: Asset | AccountAsset,
    secondAsset: Asset | AccountAsset,
    firstAmount: NumberLike,
    secondAmount: NumberLike,
    reversed: boolean
  ): string {
    const decimals = Math.max(firstAsset.decimals, secondAsset.decimals);
    const one = new FPNumber(1, decimals);
    const firstAmountNum = new FPNumber(firstAmount, decimals);
    const secondAmountNum = new FPNumber(secondAmount, decimals);
    const result = !reversed
      ? firstAmountNum.div(!secondAmountNum.isZero() ? secondAmountNum : one)
      : secondAmountNum.div(!firstAmountNum.isZero() ? firstAmountNum : one);
    return result.format();
  }

  /**
   * Divide the first asset by the second
   * @param firstAsset
   * @param secondAsset
   * @param firstAmount
   * @param secondAmount
   * @param reversed If `true`: the second by the first (`false` by default)
   * @returns Formatted string
   */
  public divideAssets(
    firstAsset: Asset | AccountAsset,
    secondAsset: Asset | AccountAsset,
    firstAmount: NumberLike,
    secondAmount: NumberLike,
    reversed = false
  ): string {
    return this.divideAssetsInternal(firstAsset, secondAsset, firstAmount, secondAmount, reversed);
  }

  /**
   * Divide the first asset by the second
   * @param firstAssetAddress
   * @param secondAssetAddress
   * @param firstAmount
   * @param secondAmount
   * @param reversed If `true`: the second by the first (`false` by default)
   * @returns Promise with formatted string
   */
  public async divideAssetsByAssetIds(
    firstAssetAddress: string,
    secondAssetAddress: string,
    firstAmount: NumberLike,
    secondAmount: NumberLike,
    reversed = false
  ): Promise<string> {
    const firstAsset = await this.getAssetInfo(firstAssetAddress);
    const secondAsset = await this.getAssetInfo(secondAssetAddress);
    return this.divideAssetsInternal(firstAsset, secondAsset, firstAmount, secondAmount, reversed);
  }
}
