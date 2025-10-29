import assetsDefinitions from '@sora-substrate/types/interfaces/assets/definitions';
import { options } from '@sora-substrate/api';
import { typesBundle } from '@sora-substrate/types';

describe('Types integration', () => {
  it('exposes generated definitions via workspace path mapping', () => {
    expect(assetsDefinitions).toBeDefined();
    expect((assetsDefinitions as any).rpc?.freeBalance?.description).toContain('balance');
  });

  it('keeps API options aligned with the exported types bundle shape', () => {
    const config = options();
    expect(config.types?.AssetId).toBeDefined();

    const soraBundle = (config.typesBundle as any)?.spec?.sora;

    expect(typeof soraBundle?.types).toBe('object');
    expect(Object.keys(soraBundle?.types ?? {}).length).toBeGreaterThan(0);
  });

  it('exports a bundle structure consumable by downstream packages', () => {
    const soraSpec = (typesBundle.spec as any)?.sora;

    expect(typeof soraSpec?.types).toBe('object');
    expect(Object.keys(soraSpec?.types ?? {}).length).toBeGreaterThan(0);
  });
});
