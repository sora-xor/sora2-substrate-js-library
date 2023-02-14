import { assert } from '@polkadot/util';
import { ApiPromise } from '@polkadot/api';
import { WsProvider } from '@polkadot/rpc-provider';
import { options } from '@sora-substrate/api';
import type { ProviderInterfaceEmitCb } from '@polkadot/rpc-provider/types';
import type { ApiInterfaceEvents } from '@polkadot/api/types';

import { Messages } from './logger';

type ConnectionEventListener = [ApiInterfaceEvents, ProviderInterfaceEmitCb];

export interface ConnectionRunOptions {
  once?: boolean;
  timeout?: number;
  autoConnectMs?: number;
  eventListeners?: ConnectionEventListener[];
}

const addEventListeners = (api: ApiPromise, eventListeners: ConnectionEventListener[]): void => {
  eventListeners.forEach(([eventName, eventHandler]) => api.on(eventName, eventHandler));
};

const removeEventListeners = (api: ApiPromise, eventListeners: ConnectionEventListener[]): void => {
  eventListeners.forEach(([eventName, eventHandler]) => api.off(eventName, eventHandler));
};

const disconnectApi = async (api: ApiPromise, eventListeners: ConnectionEventListener[]): Promise<void> => {
  if (!api) return;

  removeEventListeners(api, eventListeners);
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

    const providerAutoConnectMs = once ? 0 : autoConnectMs;
    const apiConnectionPromise = once ? 'isReadyOrError' : 'isReady';

    const provider = new WsProvider(endpoint, providerAutoConnectMs);

    this.api = new ApiPromise(options({ provider, noInitWarn: true }));
    this.endpoint = endpoint;
    this.eventListeners = eventListeners;

    const connectionRequests: Array<Promise<any>> = [this.api[apiConnectionPromise]];

    if (timeout) connectionRequests.push(createConnectionTimeout(timeout));

    try {
      addEventListeners(this.api, this.eventListeners);

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

  public get opened(): boolean {
    return !!this.api;
  }

  /**
   * Open connection
   * @param endpoint address of node
   * @param options
   */
  public async open(endpoint?: string, options?: ConnectionRunOptions): Promise<void> {
    assert(endpoint || this.endpoint, Messages.endpointIsUndefined);
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
 * Base connection object which should be used for any api
 */
export const connection = new Connection();
