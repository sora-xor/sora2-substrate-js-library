import { rpc as ormlRpc, types as ormlTypes, typesAlias as ormlAlias } from '@open-web3/orml-type-definitions'
import { jsonrpcFromDefs, typesAliasFromDefs, typesFromDefs } from '@open-web3/orml-type-definitions/utils'

import runtime from './runtime'
import dexApi from './dexApi'
import dexManager from './dexManager'
import tradingPair from './tradingPair'
import template from './template'
import assets from './assets'
import liquidityProxy from './liquidityProxy'

const soraDefs = {
  runtime,
  dexApi,
  dexManager,
  tradingPair,
  template,
  assets,
  liquidityProxy,
}

const overrides = {
  Address: 'AccountId',
  LookupSource: 'AccountId',
  AssetId: 'AssetId32',
  Balance: 'FixedU128',
  RefCount: "u8"
};

export const types = {
  ...ormlTypes,
  ...typesFromDefs(soraDefs),
  ...overrides
}
export const typesBundle = {
  spec: {
    sora: {
      types
    } as any
  }
}
export const rpc = jsonrpcFromDefs(soraDefs, { ...ormlRpc })
export const typesAlias = typesAliasFromDefs(soraDefs, { ...ormlAlias })

export const slimOverrideBundle = {
  spec: {
    sora: {
      types: [
        {
          minmax: [0, 99] as any,
          types
        }
      ]
    }
  }
}

export const fullOverrideBundle = {
  spec: {
    sora: {
      alias: typesAlias,
      rpc,
      types: [
        {
          minmax: [0, 99] as any,
          types
        }
      ]
    }
  }
}