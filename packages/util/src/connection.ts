import { assert } from '@polkadot/util'
import { ApiPromise, ApiRx } from '@polkadot/api'
import { WsProvider } from '@polkadot/rpc-provider'
import { options } from '@sora-substrate/api'

import { Messages } from './logger'

class Connection {
  public api: ApiPromise
  public apiRx: ApiRx
  public endpoint: string
  public loading = false

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

  private async run (endpoint: string, once = false): Promise<void> {
    const prevEndpoint = this.endpoint
    this.endpoint = endpoint

    const provider = new WsProvider(endpoint)
    const api = new ApiPromise(options({ provider }))
    const apiRx = new ApiRx(options({ provider }))
    const apiConnectionPromise = once ? 'isReadyOrError' : 'isReady'
    // because this.endpoint can be overwritten by the next run call, which is faster
    const connectionEndpointIsStable = () => this.endpoint === endpoint

    try {
      await api[apiConnectionPromise]
      await apiRx.isReady.toPromise()

      if (connectionEndpointIsStable()) {
        this.api = api
        this.apiRx = apiRx
      }
    } catch (error) {
      provider.disconnect()
      if (connectionEndpointIsStable()) {
        this.endpoint = prevEndpoint
      }
      throw error
    }
  }

  private async stop (): Promise<void> {
    if (this.api) {
      await this.api.disconnect()
    }
    this.api = null
    this.apiRx = null
    this.endpoint = ''
  }

  public get opened (): boolean {
    return !!this.api
  }

  public async open (endpoint?: string, once?: boolean): Promise<void> {
    assert(endpoint || this.endpoint, Messages.endpointIsUndefined)
    await this.withLoading(async () => await this.run(endpoint || this.endpoint, once))
  }

  public async close (): Promise<void> {
    await this.withLoading(async () => await this.stop())
  }

  public async restart (endpoint: string, once?: boolean): Promise<void> {
    await this.withLoading(async () => {
      await this.stop()
      await this.run(endpoint, once)
    })
  }
}

/**
 * Base connection object which should be used for any api
 */
export const connection = new Connection()
