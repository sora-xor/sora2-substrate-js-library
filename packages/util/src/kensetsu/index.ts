import { map } from 'rxjs';
import type { KensetsuCollateralInfo, KensetsuCollateralizedDebtPosition } from '@polkadot/types/lookup';
import type { Observable } from '@polkadot/types/types';

import type { Api } from '../api';
import type { Asset } from '../assets/types';

export class KensetsuModule<T> {
  constructor(private readonly root: Api<T>) {}

  /**
   * Usage: general system parameters, statistical information
   * @todo Check do we need a subscription to that data
   */
  async getBadDebt(): Promise<number> {
    const badDebt = await this.root.api.query.kensetsu.badDebt();
    return badDebt.toNumber();
  }

  /**
   * Usage: statistical information, for instance, Explore page
   * @todo Check do we need a subscription to that data
   * @todo Add data formatter
   */
  async getCollateralInfo(asset: Asset): Promise<KensetsuCollateralInfo | null> {
    const data = await this.root.api.query.kensetsu.collateralInfos(asset.address);
    const collateralInfo: KensetsuCollateralInfo | null = data.unwrapOr(null);
    return collateralInfo;
  }

  /**
   * Usage: statistical information, for instance, Explore page
   * @todo Check do we need a subscription to that data
   * @todo Add data formatter
   * @todo Use entriesPaged
   */
  async getCollateralInfos(): Promise<Record<string, KensetsuCollateralInfo>> {
    const data = await this.root.api.query.kensetsu.collateralInfos.entries();
    const infos: Record<string, KensetsuCollateralInfo> = {};
    data.forEach((item) => {
      const info: KensetsuCollateralInfo | null = item[1].unwrapOr(null);
      if (info) {
        infos[item[0].args[0].code.toString()] = info;
      }
    });
    return infos;
  }

  /**
   * Usage: the main entity for checking the vaults.
   * @todo There may be too many of them. It uses cdp ID, but we need an account, so the additional query is needed.
   * @todo Wait for new extra query with account ID as the parameter
   * @todo Add data formatter
   */
  subscribeOnCdp(cdpId: number): Observable<KensetsuCollateralizedDebtPosition | null> {
    return this.root.apiRx.query.kensetsu.cdpDepository(cdpId).pipe(
      map((data) => {
        const cdp: KensetsuCollateralizedDebtPosition | null = data.unwrapOr(null);
        return cdp;
      })
    );
  }

  /**
   * Get upper limit of KUSD
   */
  async getKusdHardCap(): Promise<number> {
    const kusdHardCap = await this.root.api.query.kensetsu.kusdHardCap();
    return kusdHardCap.toNumber();
  }

  /**
   * @example If you had a cdp where you had 100 XOR for 100 KUSD and it became unsafe,
   * these 100 KUSD were sold, of which 10 KUSD went to protocol revenue and 90 KUSD to closing the debt,
   * if liquidationPenalty = 10%
   * @todo Check the result type
   */
  async getLiquidationPenalty(): Promise<number> {
    const liquidationPenalty = await this.root.api.query.kensetsu.liquidationPenalty();
    return liquidationPenalty.toNumber();
  }

  /**
   * Usage: statistical information
   * Returns the number about how much cdp were created
   */
  async getCdpCount(): Promise<number> {
    const nextCDPId = await this.root.api.query.kensetsu.nextCDPId();
    return nextCDPId.toNumber();
  }
}
