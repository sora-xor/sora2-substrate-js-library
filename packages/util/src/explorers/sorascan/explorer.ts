import { axiosInstance } from '../../http'
import { Explorer } from '../types'

export default class SoraScanExplorer implements Explorer {
  public static API_VERSION = 1

  public static getBaseUrl (soraNetwork?: string): string {
    switch (soraNetwork) {
      case 'Testnet':
        return 'https://test.sorascan.com'
      case 'Mainnet':
        return 'https://sorascan.com'
      case 'Devnet':
      default:
        return 'https://explorer.s2.dev.sora2.soramitsu.co.jp'
    }
  }

  public static getNetworkUrl (soraNetwork?: string): string {
    const baseUrl = SoraScanExplorer.getBaseUrl(soraNetwork)

    switch (soraNetwork) {
      case 'Testnet':
        return `${baseUrl}/sora-staging`
      case 'Mainnet':
        return `${baseUrl}/sora-mainnet`
      case 'Devnet':
      default:
        return `${baseUrl}/sora-dev`
    }
  }

  public static getBlockUrl (entityType: string, entityId, soraNetwork?: string): string {
    const networkUrl = SoraScanExplorer.getNetworkUrl(soraNetwork)

    return `${networkUrl}/${entityType}/${entityId}`
  }

  public static getApiUrl (soraNetwork?: string) {
    const baseUrl = SoraScanExplorer.getBaseUrl(soraNetwork)
    const apiVersion = SoraScanExplorer.API_VERSION

    return `${baseUrl}/api/v${apiVersion}`
  }

  public soraNetwork: string

  constructor (soraNetwork?: string) {
    this.soraNetwork = soraNetwork
  }

  public async getAccountTransactions (accountAddress: string): Promise<Array<any>> {
    try {
      const apiUrl = SoraScanExplorer.getApiUrl(this.soraNetwork)
      const { data } = await axiosInstance.get(`${apiUrl}/extrinsic?filter[address]=${accountAddress}`)

      // parse json api structure
      const transactions = data.data.map(item => item.attributes)
    
      return transactions
    } catch (error) {
      console.error(error)
      return []
    }
  }

  public async getTransaction (hash: string): Promise<any> {
    try {
      const apiUrl = SoraScanExplorer.getApiUrl(this.soraNetwork)
      const { data } = await axiosInstance.get(`${apiUrl}/extrinsic/${hash}`, {
        params: {
          include: 'events'
        }
      })

      return data
    } catch (error) {
      console.error(error)
      return null
    }
  }
}