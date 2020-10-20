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

import * as defaultDefinitions from '@polkadot/types/interfaces/definitions'

import * as ormlDefinitions from '@open-web3/orml-types/interfaces/definitions'

import * as soraneoDefinitions from '../src/interfaces/definitions'

function filterModules(names: string[], defs: any): string {
  const registry = new TypeRegistry();
  registerDefinitions(registry, defs);
  const metadata = new Metadata(registry, metaHex);

  const filtered = metadata.toJSON() as any;

  console.log("Available modules:\n" + filtered.metadata.V11.modules.map(({ name }: any) => name).join("\n") + "\n");
  filtered.metadata.V11.modules = filtered.metadata.V11.modules.filter(({ name }: any) => names.includes(name));
  console.log("Enabled modules:\n" + filtered.metadata.V11.modules.map(({ name }: any) => name).join("\n") + "\n");

  return new Metadata(registry, filtered).toHex();
}

const { runtime, ...substrateDefinitions } = defaultDefinitions

const { runtime: _runtime, ...ormlModulesDefinitions } = ormlDefinitions

const definitions = {
  '@polkadot/types/interfaces': substrateDefinitions,
  '@open-web3/orml-types/interfaces': ormlModulesDefinitions,
  '@sora-neo-substrate/types/interfaces': soraneoDefinitions
} as any

const metadata = filterModules(
  [
    // 'System', // guaranteed conflict with extensions
    'Timestamp',
    'Balances',
    'Sudo',
    'RandomnessCollectiveFlip',
    'ParachainUpgrade',
    'MessageBroker',
    'TransactionPayment',
    'ParachainInfo',
    'Permissions',
    'TokenDealer',
    'TemplateModule',
    'ReferralSystem',
    'XorFee',
    'Tokens',
    'Currencies',
    'TradingPair',
    'Assets',
    'DEXManager',
    'BondingCurvePool',
    'Technical',
    'LiquidityProxy',
    'MockLiquiditySource',
    'MockLiquiditySource2',
    'MockLiquiditySource3',
    'MockLiquiditySource4',
    'DEXAPI'
  ],
  definitions
);

generateTsDef(definitions, 'packages/types/src/interfaces', '@sora-neo-substrate/types/interfaces')
generateInterfaceTypes(definitions, 'packages/types/src/interfaces/augment-types.ts')
generateConst('packages/types/src/interfaces/augment-api-consts.ts', metadata, definitions)

generateTx('packages/types/src/interfaces/augment-api-tx.ts', metadata, definitions)
generateQuery('packages/types/src/interfaces/augment-api-query.ts', metadata, definitions)

generateMobx('packages/types/src/interfaces/augment-api-mobx.ts', metaHex, definitions)