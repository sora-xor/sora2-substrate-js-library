import last from 'lodash/fp/last'
import { ApiPromise } from '@polkadot/api'
import { WsProvider } from '@polkadot/rpc-provider'
import { KeyringPair } from '@polkadot/keyring/types'
import { Signer } from '@polkadot/types/types'
import { options } from '@sora-substrate/api'

export const KeyringType = 'sr25519'

export class BaseApi {
  public api: ApiPromise
  public endpoint: string

  protected signer?: Signer

  constructor (endpoint?: string) {
    if (endpoint) {
      this.endpoint = endpoint
    }
  }

  /**
   * Set signer if the pair is locked (For polkadot js extension usage)
   * @param signer
   */
  public setSigner (signer: Signer): void {
    this.api.setSigner(signer)
    this.signer = signer
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
    signer: KeyringPair,
    debugMessage = ''
  ): Promise<void> {
    console.log(`\nSubmit extrinsic: ${debugMessage}\n`)
    const unsub = await extrinsic.signAndSend(signer.isLocked ? signer.address : signer, { signer: this.signer }, (result: any) => {
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
      }
    }).catch((e: Error) => {
      const errorParts = e.message.split(':')
      const errorInfo = last(errorParts).trim()
      throw new Error(errorInfo)
    })
  }

  public async disconnect (): Promise<void> {
    await this.api.disconnect()
  }
}
