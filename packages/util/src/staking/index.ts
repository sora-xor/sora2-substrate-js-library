import type { Api } from '../api';
import type { ValidatorInfo } from './types';

export class StakingModule {
  constructor(private readonly root: Api) {}

  public async getValidatorInfos(): Promise<ValidatorInfo[]> {
    const validators = (await this.root.api.query.staking.validators.entries()).map(([key, codec]) => {
      const [address] = key.toHuman() as any;
      const { commission, blocked } = codec.toHuman();

      return { address, commission, blocked };
    });

    return validators as ValidatorInfo[];
  }
}
