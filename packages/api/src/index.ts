import { derive as ormlDerives } from '@open-web3/orml-api-derive'
import { derive as soraneoDerives } from '@sora-neo-substrate/api-derive'

import {
  rpc as soraneoRpc,
  types as soraneoTypes,
  typesAlias as soraneoTypesAlias,
  typesBundle as soraneoTypesBundle
} from '@sora-neo-substrate/types'
import { ApiOptions } from '@polkadot/api/types'

export const defaultOptions: ApiOptions = {
  types: soraneoTypes,
  rpc: soraneoRpc
}

export const options = ({
  types = {},
  rpc = {},
  typesAlias = {},
  typesBundle = {},
  ...otherOptions
}: ApiOptions = {}): ApiOptions => ({
  types: {
    ...soraneoTypes,
    ...types
  },
  rpc: {
    ...soraneoRpc,
    ...rpc
  },
  typesAlias: {
    ...soraneoTypesAlias,
    ...typesAlias
  },
  derives: {
    ...ormlDerives,
    ...soraneoDerives
  },
  typesBundle: {
    ...typesBundle,
    spec: {
      ...typesBundle.spec,
      soraneo: {
        ...soraneoTypesBundle?.spec?.soraneo,
        ...typesBundle?.spec?.soraneo
      }
    }
  },
  ...otherOptions
})
