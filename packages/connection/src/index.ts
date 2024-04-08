import { ApiPromise } from '@polkadot/api';
import { WsProvider } from '@polkadot/rpc-provider';
import { options } from '@sora-substrate/api';
import type { ApiInterfaceEvents, ApiOptions } from '@polkadot/api/types';
import type { ProviderInterfaceEmitCb, ProviderInterfaceCallback } from '@polkadot/rpc-provider/types';

// Non-exported types from `@polkadot/rpc-provider/types`
interface SubscriptionHandler {
  callback: ProviderInterfaceCallback;
  type: string;
}

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

  try {
    // wait until the api connection is completed to check the "isConnected" flag
    await api.isReadyOrError;
  } catch {}

  try {
    // close the connection manually
    if (api.isConnected) {
      await api.disconnect();
    }
  } catch (error) {
    console.error(error);
  }
};

const createConnectionTimeout = (timeout: number): Promise<void> => {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Connection Timeout')), timeout);
  });
};

class Connection {
  public api: ApiPromise | null = null;
  public endpoint = '';
  public loading = false;

  private eventListeners: Array<[ApiInterfaceEvents, ProviderInterfaceEmitCb]> = [];

  /**
   * @param apiOptions ApiOptions object
   * @param isCacheable flag to enable cache for the provider requests (default: false)
   * @see https://github.com/polkadot-js/api/blob/56fb5c9985fd9c97bcd2a6086cbb972780e94fd4/packages/rpc-core/src/bundle.ts#L470-L473
   */
  constructor(
    private readonly apiOptions: ApiOptions,
    private readonly isCacheable = false
  ) {}

  private async withLoading(func: Function): Promise<any> {
    this.loading = true;
    try {
      return await func();
    } finally {
      this.loading = false;
    }
  }

  private async run(endpoint: string, runOptions?: ConnectionRunOptions): Promise<void> {
    const { once = false, timeout = 0, autoConnectMs = 5000, eventListeners = [] } = runOptions ?? {};

    const providerAutoConnectMs = once ? false : autoConnectMs;
    const apiConnectionPromise = once ? 'isReadyOrError' : 'isReady';

    const provider = new WsProvider(endpoint, providerAutoConnectMs);
    if (!this.isCacheable) {
      const send = (method: string, params: unknown[], isCacheable?: boolean, subscription?: SubscriptionHandler) =>
        provider.send(method, params, false, subscription);
      // durty hack to disable cache
      provider.send = send;
    }

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
    if (this.api) {
      await disconnectApi(this.api, this.eventListeners);
    }
    this.api = null;
    this.endpoint = '';
    this.eventListeners = [];
  }

  public addEventListener(eventName: ApiInterfaceEvents, eventHandler: ProviderInterfaceEmitCb) {
    this.api?.on(eventName, eventHandler);
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
    await this.withLoading(async () => await this.run(endpoint ?? this.endpoint, options));
  }

  /**
   * Close connection
   */
  public async close(): Promise<void> {
    await this.withLoading(async () => await this.stop());
  }
}

/**
 * Base SORA connection object (without cache by default)
 */
const connection = new Connection(options());

export { connection, Connection };
