import { BaseApi } from './BaseApi';
import { BridgeApi } from './BridgeApi';
import { SwapModule } from './swap';
import { RewardsModule } from './rewards';
import { PoolXykModule } from './poolXyk';
import { ReferralSystemModule } from './referralSystem';
import { AssetsModule } from './assets';
import { MstTransfersModule } from './mstTransfers';
import { SystemModule } from './system';
import { DemeterFarmingModule } from './demeterFarming';
import { DexModule } from './dex';
import { CeresLiquidityLockerModule } from './ceresLiquidityLocker';

/**
 * Contains all necessary data and functions for the wallet & polkaswap client
 */
export class Api<T = void> extends BaseApi<T> {
  public readonly defaultSlippageTolerancePercent = 0.5; // related to swap & pools
  public readonly seedLength = 12;

  public readonly bridge = new BridgeApi<T>();

  public readonly swap = new SwapModule<T>(this);
  public readonly rewards = new RewardsModule<T>(this);
  public readonly poolXyk = new PoolXykModule<T>(this);
  public readonly referralSystem = new ReferralSystemModule<T>(this);
  public readonly assets = new AssetsModule<T>(this);
  /** This module is used for internal needs */
  public readonly mstTransfers = new MstTransfersModule<T>(this);
  public readonly system = new SystemModule<T>(this);
  public readonly demeterFarming = new DemeterFarmingModule<T>(this);
  public readonly dex = new DexModule<T>(this);
  public readonly ceresLiquidityLocker = new CeresLiquidityLockerModule<T>(this);

  /**
   * The first method you should run. Includes initialization process
   */
  public async initialize(): Promise<void> {
    // Update available dex list
    await this.dex.updateList();
  }
}

/** Api object */
export const api = new Api();
