import {
  typesBundle as soraneoTypesBundle,
  types as soraneoTypes,
  typesAlias as soraneoTypeAlias,
  rpc as soraneoRpc
} from '@sora-substrate/type-definitions'
import {
  OverrideBundleType,
  OverrideModuleType,
  RegistryTypes,
  DefinitionRpc,
  DefinitionRpcSub
} from '@polkadot/types/types'

import './interfaces/augment-api'
import './interfaces/augment-api-consts'
import './interfaces/augment-api-query'
import './interfaces/augment-api-tx'
import './interfaces/augment-types'

export * from './interfaces/augment-api-mobx'

export const types: RegistryTypes = soraneoTypes

export const rpc: Record<string, Record<string, DefinitionRpc | DefinitionRpcSub>> = soraneoRpc

export const typesAlias: Record<string, OverrideModuleType> = soraneoTypeAlias

export const typesBundle = soraneoTypesBundle as OverrideBundleType
