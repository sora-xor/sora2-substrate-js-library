import { ApiPromise, WsProvider } from '@polkadot/api';
import { Connection, ConnectionRunOptions } from '@sora-substrate/connection';
import { SORA_ENV } from '@sora-substrate/types/scripts/consts';

describe('Connection', () => {
  let connection: Connection;

  beforeEach(() => {
    connection = new Connection(ApiPromise, WsProvider, {});
  });

  afterEach(async () => {
    await connection.close();
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
    expect(connection.api).toBeInstanceOf(ApiPromise);
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
  });
});
