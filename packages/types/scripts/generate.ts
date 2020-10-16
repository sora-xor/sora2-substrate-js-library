import { Metadata } from '@polkadot/types'
import { TypeRegistry } from '@polkadot/types/create'
import { generateInterfaceTypes } from '@polkadot/typegen/generate/interfaceRegistry'
import { generateTsDef } from '@polkadot/typegen/generate/tsDef'
import generateConst from '@polkadot/typegen/generate/consts'
import generateQuery from '@polkadot/typegen/generate/query'
import generateTx from '@polkadot/typegen/generate/tx'
import { registerDefinitions } from '@polkadot/typegen/util'
import generateMobx from '@open-web3/api-mobx/scripts/mobx'
import metaHex from '../src/metadata/latest'

import * as defaultDefinations from '@polkadot/types/interfaces/definitions'

import * as ormlDefinations from '@open-web3/orml-types/interfaces/definitions'

import * as soraneoDefinations from '../src/interfaces/definitions'

function filterModules(defs: any): string {
  const registry = new TypeRegistry()
  registerDefinitions(registry, defs)
  const metadata = new Metadata(registry, metaHex)
  metadata.asLatest.toJSON()
  const filtered = metadata.toJSON() as any
  return new Metadata(registry, filtered).toHex()
}

const { runtime, ...substrateDefinations } = defaultDefinations

const { runtime: _runtime, ...ormlModulesDefinations } = ormlDefinations

const definations = {
  '@polkadot/types/interfaces': substrateDefinations,
  '@open-web3/orml-types/interfaces': ormlModulesDefinations,
  '@sora-neo-substrate/types/interfaces': soraneoDefinations
} as any

const metadata = filterModules(definations)

generateTsDef(definations, 'packages/types/src/interfaces', '@sora-neo-substrate/types/interfaces')
generateInterfaceTypes(definations, 'packages/types/src/interfaces/augment-types.ts')
generateConst('packages/types/src/interfaces/augment-api-consts.ts', metadata, definations)

generateTx('packages/types/src/interfaces/augment-api-tx.ts', metadata, definations)
generateQuery('packages/types/src/interfaces/augment-api-query.ts', metadata, definations)

generateMobx('packages/types/src/interfaces/augment-api-mobx.ts', metaHex, definations)
