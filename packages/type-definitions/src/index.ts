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

const additionalOverride = {
  Address: 'AccountId',
  LookupSource: 'AccountId'
  // Keys: 'SessionKeys2', // May be useful in future
  // PalletsOrigin: {
  //   _enum: {
  //     System: 'SystemOrigin',
  //     Timestamp: 'Null',
  //     Balances: 'Null',
  //     Sudo: 'Null',
  //     RandomnessCollectiveFlip: 'Null',
  //     ParachainUpgrade: 'Null',
  //     MessageBroker: 'Null',
  //     TransactionPayment: 'Null',
  //     ParachainInfo: 'Null',
  //     Permissions: 'Null',
  //     TokenDealer: 'Null',
  //     TemplateModule: 'Null',
  //     ReferralSystem: 'Null',
  //     XorFee: 'Null',
  //     Tokens: 'Null',
  //     Currencies: 'Null',
  //     TradingPair: 'Null',
  //     Assets: 'Null',
  //     DEXManager: 'Null',
  //     BondingCurvePool: 'Null',
  //     Technical: 'Null',
  //     LiquidityProxy: 'Null',
  //     MockLiquiditySource: 'Null',
  //     MockLiquiditySource2: 'Null',
  //     MockLiquiditySource3: 'Null',
  //     MockLiquiditySource4: 'Null',
  //     DEXAPI: 'Null'
  //   }
  // }
};

export const types = {
  ...ormlTypes,
  ...typesFromDefs(soraneoDefs),
  ...additionalOverride
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
