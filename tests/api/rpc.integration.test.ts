import { ApiPromise } from '@polkadot/api';
import { MockProvider } from '@polkadot/rpc-provider/mock';
import { TypeRegistry } from '@polkadot/types/create';
import { options } from '@sora-substrate/api';

describe('API RPC integration (mocked provider)', () => {
  it('responds to custom assets RPC responses without hitting a live node', async () => {
    const registry = new TypeRegistry();
    const provider = new MockProvider(registry);

    provider.isUpdating = false;

    const providerInternals = provider as unknown as {
      intervalId?: ReturnType<typeof setInterval>;
      requests: Record<string, (...args: unknown[]) => unknown>;
    };

    if (providerInternals.intervalId) {
      clearInterval(providerInternals.intervalId);
      providerInternals.intervalId = undefined;
    }

    const api = await ApiPromise.create(options({ provider }));

    try {
      providerInternals.requests.assets_freeBalance = () =>
        api
          .createType('Option<BalanceInfo>', {
            balance: api.createType('Balance', '123456789000000000000'),
          })
          .toJSON();

      const response = await api.rpc.assets.freeBalance(
        '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
        '0x0200000000000000000000000000000000000000000000000000000000000000'
      );

      expect(response.unwrap().balance.toString()).toBe('123456789000000000000');
    } finally {
      await api.disconnect();
      await provider.disconnect();
    }
  });
});
