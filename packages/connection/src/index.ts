import { ApiPromise } from '@polkadot/api';
import { WsProvider } from '@polkadot/rpc-provider';
import { options } from '@sora-substrate/api';
import type { ApiInterfaceEvents, ApiOptions } from '@polkadot/api/types';
import type { ProviderInterfaceEmitCb } from '@polkadot/rpc-provider/types';

type ConnectionEventListener = [ApiInterfaceEvents, ProviderInterfaceEmitCb];

export interface ConnectionRunOptions {
  once?: boolean;
  timeout?: number;
  autoConnectMs?: number;
  eventListeners?: ConnectionEventListener[];
}

const disconnectApi = async (api: ApiPromise, eventListeners: ConnectionEventListener[]): Promise<void> => {
  if (!api) return;

  eventListeners.forEach(([eventName, eventHandler]) => api.off(eventName, eventHandler));

  // close the connection manually
  if (api.isConnected) {
    try {
      await api.disconnect();
    } catch (error) {
      console.error(error);
    }
  }
};

const createConnectionTimeout = (timeout: number): Promise<void> => {
  return new Promise((_, reject) => {
    setTimeout(() => reject('Connection Timeout'), timeout);
  });
};

class Connection {
  public api: ApiPromise | null = null;
  public endpoint = '';
  public loading = false;

  private eventListeners: Array<[ApiInterfaceEvents, ProviderInterfaceEmitCb]> = [];

  constructor(private readonly apiOptions: ApiOptions) {}

  private async withLoading(func: Function): Promise<any> {
    this.loading = true;
    try {
      return await func();
    } catch (e) {
      throw e;
    } finally {
      this.loading = false;
    }
  }

  private async run(endpoint: string, runOptions?: ConnectionRunOptions): Promise<void> {
    const { once = false, timeout = 0, autoConnectMs = 5000, eventListeners = [] } = runOptions || {};

    const providerAutoConnectMs = once ? false : autoConnectMs;
    const apiConnectionPromise = once ? 'isReadyOrError' : 'isReady';

    const provider = new WsProvider(endpoint, providerAutoConnectMs);

    this.api = new ApiPromise({ ...this.apiOptions, provider, noInitWarn: true });
    this.endpoint = endpoint;

    const connectionRequests: Array<Promise<any>> = [this.api[apiConnectionPromise]];

    if (timeout) connectionRequests.push(createConnectionTimeout(timeout));

    try {
      eventListeners.forEach(([eventName, eventHandler]) => {
        this.addEventListener(eventName, eventHandler);
      });

      // we should manually call connect fn without autoConnectMs
      if (!providerAutoConnectMs) {
        this.api.connect();
      }

      await Promise.race(connectionRequests);
    } catch (error) {
      this.stop();
      throw error;
    }
  }

  private async stop(): Promise<void> {
    await disconnectApi(this.api, this.eventListeners);
    this.api = null;
    this.endpoint = '';
    this.eventListeners = [];
  }

  public addEventListener(eventName: ApiInterfaceEvents, eventHandler: ProviderInterfaceEmitCb) {
    this.api.on(eventName, eventHandler);
    this.eventListeners.push([eventName, eventHandler]);
  }

  public get opened(): boolean {
    return !!this.api;
  }

  /**
   * Open connection
   * @param endpoint address of node
   * @param options
   */
  public async open(endpoint?: string, options?: ConnectionRunOptions): Promise<void> {
    if (!(endpoint || this.endpoint)) throw new Error('You should set endpoint for connection');
    await this.withLoading(async () => await this.run(endpoint || this.endpoint, options));
  }

  /**
   * Close connection
   */
  public async close(): Promise<void> {
    await this.withLoading(async () => await this.stop());
  }
}

/**
 * Base SORA connection object
 */
const connection = new Connection(options());

export { connection, Connection };
