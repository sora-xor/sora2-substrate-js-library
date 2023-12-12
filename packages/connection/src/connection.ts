import { ApiPromise } from '@polkadot/api';
import { WsProvider } from '@polkadot/rpc-provider';
import { options } from '@sora-substrate/api';

import { fetchRpc, getRpcEndpoint } from './http';

import type { ApiInterfaceEvents, ApiOptions } from '@polkadot/api/types';
import type { ProviderInterfaceEmitCb } from '@polkadot/rpc-provider/types';
import type { HexString } from '@polkadot/util/types';

type ConnectionEventListener = [ApiInterfaceEvents, ProviderInterfaceEmitCb];

export interface ConnectionRunOptions {
  once?: boolean;
  timeout?: number;
  autoConnectMs?: number;
  eventListeners?: ConnectionEventListener[];
  getMetadata?: (genesisHash: string, specVersion: number) => Promise<string | null>;
  setMetadata?: (genesisHash: string, specVersion: number, metadata: string) => Promise<void>;
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
  return new Promise((_resolve, reject) => {
    setTimeout(() => reject(new Error('Connection Timeout')), timeout);
  });
};

export class Connection {
  public api: ApiPromise | null = null;
  public endpoint = '';
  public loading = false;

  private eventListeners: Array<[ApiInterfaceEvents, ProviderInterfaceEmitCb]> = [];

  constructor(private readonly apiOptions: ApiOptions) {}

  private async withLoading<T>(func: () => Promise<T>): Promise<T> {
    this.loading = true;
    try {
      return await func();
    } finally {
      this.loading = false;
    }
  }

  private async run(endpoint: string, runOptions?: ConnectionRunOptions): Promise<void> {
    const {
      once = false,
      timeout = 0,
      autoConnectMs = 5000,
      eventListeners = [],
      getMetadata,
      setMetadata,
    } = runOptions || {};

    const providerAutoConnectMs = once ? false : autoConnectMs;
    const apiConnectionPromise = once ? 'isReadyOrError' : 'isReady';

    let metadata!: Record<string, HexString>;

    if (getMetadata || setMetadata) {
      const metadataKeys = await this.fetchMetadataKeys(endpoint);

      if (metadataKeys) {
        const { genesisHash, specVersion } = metadataKeys;
        const metadataHex = (await getMetadata?.(genesisHash, specVersion)) ?? (await this.fetchMetadataHex(endpoint));

        if (metadataHex) {
          const key = this.generateMetadataKey(genesisHash, specVersion);
          metadata = { [key]: metadataHex as HexString };
          setMetadata?.(genesisHash, specVersion, metadataHex);
        }
      }
    }

    const provider = new WsProvider(endpoint, providerAutoConnectMs);

    this.api = new ApiPromise({ ...this.apiOptions, provider, noInitWarn: true, metadata });
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
    await disconnectApi(this.api!, this.eventListeners);
    this.api = null;
    this.endpoint = '';
    this.eventListeners = [];
  }

  public addEventListener(eventName: ApiInterfaceEvents, eventHandler: ProviderInterfaceEmitCb) {
    this.api!.on(eventName, eventHandler);
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

  // https://github.com/polkadot-js/api/blob/master/packages/api/src/base/Init.ts#L344
  public generateMetadataKey(genesisHash: string, specVersion: string | number) {
    return `${genesisHash}-${String(specVersion)}`;
  }

  public async fetchMetadataKeys(wsEndpoint: string): Promise<{ genesisHash: string; specVersion: number } | null> {
    try {
      const rpcEndpoint = getRpcEndpoint(wsEndpoint);

      const [genesisHash, runtimeVersion] = await Promise.all([
        fetchRpc(rpcEndpoint, 'chain_getBlockHash', [0]),
        fetchRpc(rpcEndpoint, 'state_getRuntimeVersion', []),
      ]);
      const { specVersion } = runtimeVersion;

      return { genesisHash, specVersion: Number(specVersion) };
    } catch {
      return null;
    }
  }

  public async fetchMetadataHex(wsEndpoint: string): Promise<HexString | null> {
    try {
      const rpcEndpoint = getRpcEndpoint(wsEndpoint);
      const metadataHex = await fetchRpc(rpcEndpoint, 'state_getMetadata', []);

      return metadataHex;
    } catch {
      return null;
    }
  }
}

/**
 * Base SORA connection object
 */
export const connection = new Connection(options());
