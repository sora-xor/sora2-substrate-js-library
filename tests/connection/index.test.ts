import { Connection, ConnectionRunOptions } from '@sora-substrate/connection';
import { SORA_ENV } from '@sora-substrate/types/scripts/consts';
import type { ApiPromise } from '@polkadot/api';
import type { ApiOptions } from '@polkadot/api/types';
import type { WsProvider } from '@polkadot/rpc-provider';

class MockWsProvider {
  public endpoint: string;
  public autoConnect: number | false;

  constructor(endpoint: string, autoConnect: number | false) {
    this.endpoint = endpoint;
    this.autoConnect = autoConnect;
  }
}

class MockApiPromise {
  public static instances: MockApiPromise[] = [];

  public isConnected = false;
  public readonly provider: MockWsProvider;
  public readonly options: ApiOptions;
  public readonly on = jest.fn();
  public readonly off = jest.fn();

  public readonly isReady: Promise<MockApiPromise>;
  public readonly isReadyOrError: Promise<MockApiPromise>;

  constructor(options: ApiOptions & { provider: MockWsProvider }) {
    this.provider = options.provider;
    this.options = options;
    this.isReady = Promise.resolve(this);
    this.isReadyOrError = Promise.resolve(this);

    if (this.provider.autoConnect !== false) {
      this.isConnected = true;
    }

    MockApiPromise.instances.push(this);
  }

  public connect = jest.fn(async () => {
    this.isConnected = true;
  });

  public disconnect = jest.fn(async () => {
    this.isConnected = false;
  });
}

const MockApiPromiseCtor = MockApiPromise as unknown as typeof ApiPromise;
const MockWsProviderCtor = MockWsProvider as unknown as typeof WsProvider;

describe('Connection', () => {
  let connection: Connection;

  beforeEach(() => {
    connection = new Connection(MockApiPromiseCtor, MockWsProviderCtor, {} as ApiOptions);
  });

  afterEach(async () => {
    await connection.close();
    MockApiPromise.instances.length = 0;
  });

  it('should open connection successfully', async () => {
    const endpoint = SORA_ENV.stage;
    const options: ConnectionRunOptions = {
      once: true,
      timeout: 5000,
      autoConnectMs: 5000,
      eventListeners: [],
    };

    await connection.open(endpoint, options);

    expect(connection.loading).toBe(false);
    expect(connection.opened).toBe(true);
    expect(connection.endpoint).toBe(endpoint);
    expect(connection.api).toBeInstanceOf(MockApiPromise);
  });

  it('should throw an error if endpoint is not set', async () => {
    await expect(connection.open()).rejects.toThrow('You should set endpoint for connection');
  });

  it('should close connection successfully', async () => {
    await connection.open(SORA_ENV.stage);
    await connection.close();

    expect(connection.opened).toBe(false);
    expect(connection.endpoint).toBe('');
    expect(connection.api).toBeNull();
    expect(MockApiPromise.instances[0]?.disconnect).toHaveBeenCalled();
  });
});
