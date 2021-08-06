import { assert } from '@polkadot/util'
import { ApiPromise } from '@polkadot/api'
import { WsProvider } from '@polkadot/rpc-provider'
import { ProviderInterfaceEmitted, ProviderInterfaceEmitCb } from '@polkadot/rpc-provider/types'
import { options } from '@sora-substrate/api'

import { Messages } from './logger'

export interface ConnectionRunOptions {
  once?: boolean;
  timeout?: number;
  autoConnectMs?: number;
  eventListeners?: Array<[ProviderInterfaceEmitted, ProviderInterfaceEmitCb]>
}

class Connection {
  public api: ApiPromise
  public endpoint: string
  public loading = false
  public eventHandlers: Array<Function> = []

  private async withLoading (func: Function): Promise<any> {
    this.loading = true
    try {
      return await func()
    } catch (e) {
      throw e
    } finally {
      this.loading = false
    }
  }

  private async run (endpoint: string, runOptions?: ConnectionRunOptions): Promise<void> {
    let connectionTimeout: any
    const { once = false, timeout = 0, eventListeners = [], autoConnectMs = 1000 } = runOptions || {}
    const prevEndpoint = this.endpoint
    this.endpoint = endpoint

    const provider = new WsProvider(endpoint, once ? 0 : autoConnectMs)
    const api = new ApiPromise(options({ provider }))
    const apiConnectionPromise = once ? 'isReadyOrError' : 'isReady'

    // because this.endpoint can be overwritten by the next run call, which is faster
    const connectionEndpointIsStable = () => this.endpoint === endpoint
    const runConnectionTimeout = (): Promise<void> => {
      if (!timeout) return Promise.resolve()

      return new Promise ((_, reject) => {
        connectionTimeout = setTimeout(() => reject('Connection Timeout'), timeout)
      })
    }

    const connectionRequests: Array<Promise<any>> = [
      api[apiConnectionPromise]
    ]

    if (timeout) connectionRequests.push(runConnectionTimeout())

    try {
      api.connect()

      await Promise.race(connectionRequests)

      if (!connectionEndpointIsStable()) {
        api.disconnect()
        return
      }

      this.api = api

      // add new event handlers
      if (eventListeners.length > 0) {
        this.eventHandlers = eventListeners.map(([eventName, callback]) => provider.on(eventName, callback))
      }
    } catch (error) {
      provider.disconnect()
      if (connectionEndpointIsStable()) {
        this.endpoint = prevEndpoint
      }
      throw error
    } finally {
      clearTimeout(connectionTimeout)
    }
  }

  public unsubscribeEventHandlers (): void {
    if (this.eventHandlers.length > 0) {
      this.eventHandlers.forEach(unsubscribeFn => unsubscribeFn())
      this.eventHandlers = []
    }
  }

  private async stop (): Promise<void> {
    if (this.api) {
      this.unsubscribeEventHandlers()
      await this.api.disconnect()
    }
    this.api = null
    this.endpoint = ''
  }

  public get opened (): boolean {
    return !!this.api
  }

  public async open (endpoint?: string, options?: ConnectionRunOptions): Promise<void> {
    assert(endpoint || this.endpoint, Messages.endpointIsUndefined)
    await this.withLoading(async () => await this.run(endpoint || this.endpoint, options))
  }

  public async close (): Promise<void> {
    await this.withLoading(async () => await this.stop())
  }

  public async restart (endpoint: string, options?: ConnectionRunOptions): Promise<void> {
    await this.withLoading(async () => {
      await this.stop()
      await this.run(endpoint, options)
    })
  }
}

/**
 * Base connection object which should be used for any api
 */
export const connection = new Connection()
