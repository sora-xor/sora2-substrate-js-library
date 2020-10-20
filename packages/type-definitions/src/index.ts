import { rpc as ormlRpc, types as ormlTypes, typesAlias as ormlAlias } from '@open-web3/orml-type-definitions'
import { jsonrpcFromDefs, typesAliasFromDefs, typesFromDefs } from '@open-web3/orml-type-definitions/utils'

import runtime from './runtime'
import dexApi from './dexApi'
import dexManager from './dexManager'
import tradingPair from './tradingPair'

const soraneoDefs = {
  runtime,
  dexApi,
  dexManager,
  tradingPair
}

export const types = {
  ...ormlTypes,
  ...typesFromDefs(soraneoDefs)
}
export const typesBundle = {
  spec: {
    soraneo: {
      types
    } as any
  }
}
export const rpc = jsonrpcFromDefs(soraneoDefs, { ...ormlRpc })
export const typesAlias = typesAliasFromDefs(soraneoDefs, { ...ormlAlias })

export const typesBundleForPolkadot = {
  spec: {
    soraneo: {
      types: {
        minmax: [0, 499], // TODO
        types
      }
    }
  }
}
