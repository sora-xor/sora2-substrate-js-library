import merge from 'lodash/merge'
import { rpc as ormlRpc, types as ormlTypes, typesAlias as ormlAlias } from '@open-web3/orml-type-definitions'
import { jsonrpcFromDefs, typesAliasFromDefs, typesFromDefs } from '@open-web3/orml-type-definitions/utils'

import runtime from './runtime'
import dexApi from './dexApi'
import dexManager from './dexManager'
import tradingPair from './tradingPair'
import template from './template'
import assets from './assets'
import irohaMigration from './irohaMigration'
import liquidityProxy from './liquidityProxy'
import ethBridge from './ethBridge'
import pswapDistribution from './pswapDistribution'
import rewards from './rewards'
import farming from './farming'

import versionedOverrides from './versioned';

const soraDefs = {
  assets,
  dexApi,
  dexManager,
  ethBridge,
  farming,
  irohaMigration,
  liquidityProxy,
  pswapDistribution,
  rewards,
  runtime,
  template,
  tradingPair,
}

const overrides = {
  Address: 'AccountId',
  LookupSource: 'AccountId',
  AssetId: 'AssetId32',
  Keys: 'SessionKeys3',
  RefCount: 'u32',
  Balance: 'u128',
  TAssetBalance: 'Balance',
  MultiCurrencyBalance: 'Balance',
  MultiCurrencyBalanceOf: 'MultiCurrencyBalance',
  AccountInfo: 'AccountInfoWithDualRefCount',
};

export const types = {
  ...ormlTypes,
  ...typesFromDefs(soraDefs),
  ...overrides
}

export const localTypes = {
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
// TODO: MIGRATE TO typesAliasFromDefs WHEN PR WILL BE MERGED
// https://github.com/open-web3-stack/open-web3.js/pull/181
function typesAliasFromDefsInternal (
  definitions: Record<string, Record<string, any>>,
  initAlias: Record<string, any> = {}
): Record<string, any> {
  return Object.values(definitions).reduce(
    (res: Record<string, any>, { typesAlias }): Record<string, any> => merge({}, typesAlias, res),
    initAlias
  )
}
export const rpc = jsonrpcFromDefs(soraDefs, { ...ormlRpc })
export const typesAlias = typesAliasFromDefsInternal(soraDefs, { ...ormlAlias })

export const slimOverrideBundle = {
  spec: {
    sora: {
      types: [...versionedOverrides].map((version) => {
        return {
          minmax: version.minmax,
          types: {
            ...types,
            ...version.types
          }
        };
      }),
    }
  }
}

export const fullOverrideBundle = {
  spec: {
    sora: {
      alias: typesAlias,
      rpc,
      types: [...versionedOverrides].map((version) => {
        return {
          minmax: version.minmax,
          types: {
            ...types,
            ...version.types
          }
        };
      }),
    }
  }
}
