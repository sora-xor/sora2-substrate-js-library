import { Metadata } from '@polkadot/metadata'
import { TypeRegistry } from '@polkadot/types/create'
import { generateInterfaceTypes } from '@polkadot/typegen/generate/interfaceRegistry'
import { generateTsDef } from '@polkadot/typegen/generate/tsDef'
import {
  generateDefaultConsts,
  generateDefaultQuery,
  generateDefaultTx,
  generateDefaultRpc
} from '@polkadot/typegen/generate';
import { registerDefinitions } from '@polkadot/typegen/util'
import generateMobx from '@open-web3/api-mobx/scripts/mobx'

import * as defaultDefinitions from '@polkadot/types/interfaces/definitions'

import * as ormlDefinitions from '@open-web3/orml-types/interfaces/definitions'

import * as soraDefinitions from '../src/interfaces/definitions'

function filterModules(names: string[], defs: any, metaHex: any): string {
  const registry = new TypeRegistry()
  registerDefinitions(registry, defs)

  const metadata = new Metadata(registry, metaHex)

  // populate registry workaround
  metadata.asLatest.toJSON()

  const filtered = metadata.toJSON() as any

  filtered.metadata.v12.modules = filtered.metadata.v12.modules.filter(({ name }: any) => names.includes(name))
  console.log('Enabled modules:\n' + filtered.metadata.v12.modules.map(({ name }: any) => name).join('\n') + '\n')

  return new Metadata(registry, filtered).toHex()
}

const { runtime, ...substrateDefinitions } = defaultDefinitions

const { runtime: _runtime, ...ormlModulesDefinitions } = ormlDefinitions

const definitions = {
  '@polkadot/types/interfaces': substrateDefinitions,
  '@open-web3/orml-types/interfaces': ormlModulesDefinitions,
  '@sora-substrate/types/interfaces': soraDefinitions
} as any

const env = process.argv[2]
import(`../src/metadata${env ? '/' + env : ''}/latest`).then(meta => {
  const metaHex = meta.default ?? meta
  const metadata = filterModules(
    [
      // // 'System', // guaranteed conflict with extensions
      'Timestamp',
      'Balances',
      // 'Sudo',
      'RandomnessCollectiveFlip',
      // 'ParachainUpgrade',
      'MessageBroker',
      'TransactionPayment',
      // 'ParachainInfo',
      'Permissions',
      'TokenDealer',
      'TemplateModule',
      'ReferralSystem',
      'XorFee',
      'Tokens',
      'Currencies',
      'TradingPair',
      // 'Assets',
      'DEXManager',
      'BondingCurvePool',
      'Technical',
      'LiquidityProxy',
      'MockLiquiditySource',
      'MockLiquiditySource2',
      'MockLiquiditySource3',
      'MockLiquiditySource4',
      'DEXAPI',
      'Farming',
    ],
    definitions,
    metaHex
  )

  generateTsDef(definitions, 'packages/types/src/interfaces', '@sora-substrate/types/interfaces')
  generateInterfaceTypes(definitions, 'packages/types/src/interfaces/augment-types.ts')
  generateDefaultConsts('packages/types/src/interfaces/augment-api-consts.ts', metadata, definitions)

  generateDefaultTx('packages/types/src/interfaces/augment-api-tx.ts', metadata, definitions)
  generateDefaultQuery('packages/types/src/interfaces/augment-api-query.ts', metadata, definitions)
  generateDefaultRpc('packages/types/src/interfaces/augment-api-rpc.ts', definitions)

  generateMobx('packages/types/src/interfaces/augment-api-mobx.ts', metaHex, definitions)
})
