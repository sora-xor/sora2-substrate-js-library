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

  private async run (endpoint: string): Promise<void> {
    this.endpoint = endpoint

    const provider = new WsProvider(endpoint)
    const api = new ApiPromise(options({ provider }))
    const apiRx = new ApiRx(options({ provider }))

    await api.isReady
    await apiRx.isReady.toPromise()

    // because this.endpoint can be overwritten by the next run call, which is faster
    if (this.endpoint === endpoint) {
      this.api = api
      this.apiRx = apiRx
    }
  }

  private async stop (): Promise<void> {
    await this.api.disconnect()
    this.api = null
    this.apiRx = null
    this.endpoint = ''
  }

  public get opened (): boolean {
    return !!this.api
  }

  public async open (endpoint?: string): Promise<void> {
    assert(endpoint || this.endpoint, Messages.endpointIsUndefined)
    await this.withLoading(async () => await this.run(endpoint || this.endpoint))
  }

  public async close (): Promise<void> {
    await this.withLoading(async () => await this.stop())
  }

  public async restart (endpoint: string): Promise<void> {
    await this.withLoading(async () => {
      await this.stop()
      await this.run(endpoint)
    })
  }
}

/**
 * Base connection object which should be used for any api
 */
export const connection = new Connection()
