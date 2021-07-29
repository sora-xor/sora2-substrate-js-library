
import { Operation, TransactionStatus, History } from '../../BaseApi'
import { Api } from '../../api'
import { FPNumber } from '../../fp'
import { ExplorerDataParser } from '../types'
import SoraScanExplorer from './explorer'

enum ModuleCallOperation {
  RegisterPair = 'RegisterPair',
  InitializePool = 'InitializePool'
}

enum ModuleNames {
  Assets = 'Assets',
  LiquidityProxy = 'LiquidityProxy',
  Rewards = 'Rewards',
  PoolXYK = 'PoolXYK',
  TradingPair = 'TradingPair',
  Utility = 'Utility'
}

/* eslint-disable @typescript-eslint/camelcase */
const OperationByModuleCall = {
  [ModuleNames.Assets]: {
    transfer: Operation.Transfer,
    register: Operation.RegisterAsset
  },
  [ModuleNames.LiquidityProxy]: {
    swap: Operation.Swap
  },
  [ModuleNames.Rewards]: {
    claim: Operation.ClaimRewards
  },
  [ModuleNames.PoolXYK]: {
    deposit_liquidity: Operation.AddLiquidity,
    withdraw_liquidity: Operation.RemoveLiquidity,
    initialize_pool: ModuleCallOperation.InitializePool
  },
  [ModuleNames.TradingPair]: {
    register: ModuleCallOperation.RegisterPair
  }
}

const CreatePairOperationKey = JSON.stringify([ModuleCallOperation.RegisterPair, ModuleCallOperation.InitializePool, Operation.AddLiquidity])

const OperationByKey = {
  [CreatePairOperationKey]: Operation.CreatePair
}

const detectOperationByCalls = (calls: Array<any>): string => {
  const operationKey = JSON.stringify(calls.map(item => getOperationByModuleCall(item.call_module, item.call_function)))

  return OperationByKey[operationKey] ?? ''
}

const getOperationByModuleCall = (module: string, call: string): string => {
  return OperationByModuleCall[module]?.[call] ?? ''
}

const getTransactionId = (tx: any): string => tx.extrinsic_hash ? `0x${tx.extrinsic_hash}` : ''

const getTransactionOperationType = (tx: any): string => {
  const { module_id: moduleId, call_id: callId } = tx

  if (moduleId === ModuleNames.Utility && callId === 'batch_all') {
    const calls = getParamByName(tx.params, 'calls')

    if (!calls?.value) return ''

    return detectOperationByCalls(calls.value)
  }

  return getOperationByModuleCall(moduleId, callId)
}

const getTransactionTimestamp = (tx: any) => tx.transaction_timestamp

const getTransactionStatus = (tx: any): string => {
  if (tx.error === 1) return TransactionStatus.Error
  if (tx.success === 1) return TransactionStatus.Finalized

  return ''
}

const getParamByName = (params: Array<any>, name: string) => params.find(param => param.name === name)
const isEventWithName = (event, name: string) => event.attributes.event_id === name
const getEventByName = (events, name: string) => events.find(event => isEventWithName(event, name))
const getAttrByType = (attrs, type: string) => attrs.find(attr => attr.type === type)

const getLiquidityOperationPayload = async ({ assetA, assetB, amountA, amountB, included, api }) => {
  const payload: any = {}

  const transferedEvents = included.filter(event => isEventWithName(event, 'Transferred'))

  const assetAddress = assetA?.value ?? ''
  const assetData = assetAddress ? await api.getAssetInfo(assetAddress) : null
  const assetAddress2 = assetB?.value ?? ''
  const asset2Data = assetAddress2 ? await api.getAssetInfo(assetAddress2) : null

  if (transferedEvents.length === 2) {
    const amounts = transferedEvents.reduce((result, event) => {
      const { attributes } = event.attributes
      const addressAttr = getAttrByType(attributes, 'CurrencyIdOf<T>')
      const balanceAttr = getAttrByType(attributes, 'BalanceOf<T>')

      if (!addressAttr?.value) return result

      return {
        ...result,
        [addressAttr.value]: balanceAttr?.value ?? 0
      }
    }, {})

    payload.amount = FPNumber.fromCodecValue(amounts[assetAddress] ?? 0, assetData?.decimals).toString()
    payload.amount2 = FPNumber.fromCodecValue(amounts[assetAddress2] ?? 0, asset2Data?.decimals).toString()
  } else {
  // error
    payload.amount = FPNumber.fromCodecValue(amountA?.value ?? 0, assetData?.decimals).toString()
    payload.amount2 = FPNumber.fromCodecValue(amountB?.value ?? 0, asset2Data?.decimals).toString()
  }

  payload.assetAddress = assetAddress
  payload.symbol = assetData?.symbol ?? ''
  payload.asset2Address = assetAddress2
  payload.symbol2 = asset2Data?.symbol ?? ''

  return payload
}

const getHistoryAttributes = async (transaction, included, api) => {
  const type = getTransactionOperationType(transaction)

  // common attributes
  const payload: any = {
    type,
    txId: getTransactionId(transaction),
    startTime: getTransactionTimestamp(transaction),
    endTime: getTransactionTimestamp(transaction),
    from: transaction.address,
    soraNetworkFee: String(transaction.fee),
    status: getTransactionStatus(transaction)
  }

  const { params, ...attrs } = transaction

  if (attrs.error_message) {
    payload.errorMessage = attrs.error_message
  }

  switch (type) {
    case Operation.Swap: {
      const assetAParam = getParamByName(params, 'input_asset_id')
      const assetAAddress = assetAParam?.value
      const assetA = assetAAddress ? await api.getAssetInfo(assetAAddress) : null
      const assetBParam = getParamByName(params, 'output_asset_id')
      const assetBAddress = assetBParam?.value
      const assetB = assetBAddress ? await api.getAssetInfo(assetBAddress) : null
      const liquiditySource = getParamByName(params, 'selected_source_types')
      const exchangeEvent = getEventByName(included, 'Exchange')

      if (exchangeEvent) {
        payload.amount = FPNumber.fromCodecValue(exchangeEvent?.attributes?.attributes[4]?.value, assetA?.decimals).toString()
        payload.amount2 = FPNumber.fromCodecValue(exchangeEvent?.attributes?.attributes[5]?.value, assetB?.decimals).toString()
      } else {
        const swapAmount = getParamByName(params, 'swap_amount')

        if (swapAmount?.value) {
          if ('WithDesiredOutput' in swapAmount.value) {
            payload.amount = FPNumber.fromCodecValue(swapAmount.value.WithDesiredOutput.max_amount_in, assetA?.decimals).toString()
            payload.amount2 = FPNumber.fromCodecValue(swapAmount.value.WithDesiredOutput.desired_amount_out, assetB?.decimals).toString()
          } else {
            payload.amount = FPNumber.fromCodecValue(swapAmount.value.WithDesiredInput.desired_amount_in, assetA?.decimals).toString()
            payload.amount2 = FPNumber.fromCodecValue(swapAmount.value.WithDesiredInput.min_amount_out, assetB?.decimals).toString()
          }
        }
      }

      payload.assetAddress = assetAAddress
      payload.asset2Address = assetBAddress
      payload.symbol = assetAParam?.currency
      payload.symbol2 = assetBParam?.currency
      payload.liquiditySource = liquiditySource?.value?.[0] ?? ''

      return payload
    }
    case Operation.AddLiquidity: {
      const assetA = getParamByName(params, 'input_asset_a')
      const assetB = getParamByName(params, 'input_asset_b')
      const amountA = getParamByName(params, 'input_a_desired')
      const amountB = getParamByName(params, 'input_b_desired')

      const operationPayload = await getLiquidityOperationPayload({ assetA, assetB, amountA, amountB, included, api })

      return { ...payload, ...operationPayload }
    }
    case Operation.RemoveLiquidity: {
      const assetA = getParamByName(params, 'output_asset_a')
      const assetB = getParamByName(params, 'output_asset_b')
      const amountA = getParamByName(params, 'output_a_min')
      const amountB = getParamByName(params, 'output_b_min')

      const operationPayload = await getLiquidityOperationPayload({ assetA, assetB, amountA, amountB, included, api })

      return { ...payload, ...operationPayload }
    }
    case Operation.CreatePair: {
      const calls = getParamByName(params, 'calls')
      const registerCall = calls.value.find(item => item.call_module === ModuleNames.TradingPair && item.call_function === 'register')
      const depositLiquidityCall = calls.value.find(item => item.call_module === ModuleNames.PoolXYK && item.call_function === 'deposit_liquidity')

      const assetA = getParamByName(registerCall.call_args, 'base_asset_id')
      const assetB = getParamByName(registerCall.call_args, 'target_asset_id')
      const amountA = getParamByName(depositLiquidityCall.call_args, 'input_a_desired')
      const amountB = getParamByName(depositLiquidityCall.call_args, 'input_b_desired')

      const operationPayload = await getLiquidityOperationPayload({ assetA, assetB, amountA, amountB, included, api })

      return { ...payload, ...operationPayload }
    }
    case Operation.ClaimRewards: {
      const transferedEvents = included.filter(event => isEventWithName(event, 'Transferred'))
      const rewards = await Promise.all(transferedEvents.map(async event => {
        const { attributes } = event.attributes
        const addressAttr = getAttrByType(attributes, 'CurrencyIdOf<T>')
        const balanceAttr = getAttrByType(attributes, 'BalanceOf<T>')
        const address = addressAttr?.value
        const amount = String(balanceAttr?.value ?? 0)
        const asset = address ? await api.getAssetInfo(address) : {}

        return {
          asset,
          amount,
          type: ''
        }
      }))

      payload.rewards = rewards

      return payload
    }
    case Operation.Transfer: {
      const amountParam = getParamByName(params, 'amount')
      const assetParam = getParamByName(params, 'asset_id')
      const toParam = getParamByName(params, 'to')
      const assetAddress = assetParam?.value ?? ''
      const assetData = assetAddress ? await api.getAssetInfo(assetAddress) : null

      payload.assetAddress = assetParam?.value ?? ''
      payload.symbol = assetParam?.currency ?? ''
      payload.to = toParam?.value ?? ''
      payload.amount = FPNumber.fromCodecValue(amountParam?.value ?? 0, assetData?.decimals).toString()

      return payload
    }
    case Operation.RegisterAsset: {
      const symbol = getParamByName(params, 'symbol')
      payload.symbol = symbol?.value ?? ''
      return payload
    }
    default: {
      return payload
    }
  }
}

export default class SoraScanDataParser implements ExplorerDataParser {
  protected api: Api
  protected explorer: SoraScanExplorer

  constructor (api: Api, explorer: SoraScanExplorer) {
    this.api = api
    this.explorer = explorer
  }

  public async parseTransactionAsHistoryItem (transaction): Promise<History> {
    const id = getTransactionId(transaction)
    const blockId = transaction.block_hash

    const data = await this.explorer.getTransaction(id)

    // json api structure
    const {
      data: {
        attributes: transactionData
      },
      included
    } = data
  
    const payload = await getHistoryAttributes(transactionData, included, this.api)

    return {
      blockId,
      ...payload
    } as History
  }
}
