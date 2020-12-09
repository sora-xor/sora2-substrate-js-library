import { ApiPromise } from '@polkadot/api'
import { WsProvider } from '@polkadot/rpc-provider'
import { options } from '@sora-substrate/api'

export class BaseApi {
  protected api: ApiPromise
  public endpoint: string

  constructor (endpoint?: string) {
    if (endpoint) {
      this.endpoint = endpoint
    }
  }

  public async connect (endpoint?: string): Promise<void> {
    if (endpoint) {
      this.endpoint = endpoint
    }
    const provider = new WsProvider(this.endpoint)
    this.api = new ApiPromise(options({ provider }))
    await this.api.isReady
  }

  protected async submitExtrinsic (
    extrinsic: any,
    signer: any,
    debugMessage = ''
  ): Promise<void> {
  
    console.log(`\nSubmit extrinsic: ${debugMessage}\n`)
  
    return new Promise(async (resolve, _reject) => {
      const unsub = await extrinsic.signAndSend(signer, (result: any) => {
        console.log(`Current status is ${result.status}`)
  
        if (result.status.isInBlock) {
          console.log(`Transaction included at blockHash ${result.status.asInBlock}`)
        } else if (result.status.isFinalized) {
          console.log(`Transaction finalized at blockHash ${result.status.asFinalized}`)
  
          result.events.forEach(({ phase, event: { data, method, section } }: any) => {
            console.log(`\t' ${phase}: ${section}.${method}:: ${data}`)
            if (section === 'system' && method === 'ExtrinsicFailed') {
              const [error] = data
              if (error.isModule) {
                const decoded = this.api.registry.findMetaError(error.asModule)
                const { documentation, name, section } = decoded
                console.log(`${section}.${name}: ${documentation.join(' ')}`)
              } else {
                // Other, CannotLookup, BadOrigin, no extra info
                console.log(error.toString())
              }
            }
          })
  
          unsub()
          resolve()
        }
      })
    })
  }

  public async disconnect (): Promise<void> {
    await this.api.disconnect()
  }
}
