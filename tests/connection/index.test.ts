import type { ApiOptions } from '@polkadot/api/types';
import { Connection, ConnectionRunOptions } from '@sora-substrate/connection';

class MockWsProvider {
  public endpoint: string;
  public autoConnectMs: boolean | number;
  public isConnected = false;

  constructor(endpoint: string, autoConnectMs?: boolean | number) {
    this.endpoint = endpoint;
    this.autoConnectMs = autoConnectMs ?? true;
  }

  async connect(): Promise<void> {
    this.isConnected = true;
  }

  async disconnect(): Promise<void> {
    this.isConnected = false;
  }
}

class MockApiPromise {
  public static instances: MockApiPromise[] = [];
  public provider: MockWsProvider;
  public isConnected = false;
  public isReady: Promise<MockApiPromise>;
  public isReadyOrError: Promise<MockApiPromise>;

  constructor(options: ApiOptions) {
    this.provider = options.provider as MockWsProvider;
    this.isReady = Promise.resolve(this);
    this.isReadyOrError = Promise.resolve(this);
    MockApiPromise.instances.push(this);
  }

  async connect(): Promise<void> {
    this.isConnected = true;
  }

  async disconnect(): Promise<void> {
    this.isConnected = false;
  }

  on(): void {}
  off(): void {}
}

describe('Connection', () => {
  let connection: Connection;

  beforeEach(() => {
    connection = new Connection(
      MockApiPromise as unknown as typeof import('@polkadot/api').ApiPromise,
      MockWsProvider as unknown as typeof import('@polkadot/rpc-provider').WsProvider,
      {}
    );
  });

  afterEach(async () => {
    await connection.close();
  });

  it('should open connection successfully', async () => {
    const endpoint = 'wss://mock-endpoint';
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
    await connection.open('wss://mock-endpoint');
    await connection.close();

    expect(connection.opened).toBe(false);
    expect(connection.endpoint).toBe('');
    expect(connection.api).toBeNull();
  });
});
