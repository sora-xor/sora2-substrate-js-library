import { DexApi, KnownAssets, KnownSymbols } from '@sora-substrate/util'
import { TestUtils, getAsset, updateBalance, createKeyring, setupEnvironment } from './util'
import { ApiPromise } from '@polkadot/api'
import { strictEqual } from 'assert'

const TEST_ENDPOINT = 'wss://ws.stage.sora2.soramitsu.co.jp'
const sudoSeed = "scissors spread water arrive damp face amazing shrug warfare silk dry prison"
const dexSeed = "era actor pluck voice frost club gallery palm moment empower whale flame"

describe('Liqudity test function', (): void => {
  let utils: TestUtils
  let dexApi: DexApi
  beforeAll(async (done) => {
    dexApi = new DexApi(TEST_ENDPOINT)
    utils = new TestUtils
    await dexApi.initialize()
    await setupEnvironment(TEST_ENDPOINT, dexApi, sudoSeed, dexSeed)
    done()
  }, 10_000_000)
  afterAll(async (done) => {
    await dexApi.disconnect()
    await utils.disconnect()
    done()
  })
  it('Add liqudity', async (): Promise<void> => {
    //Given

    //Then

    //When

  })

  it('Delete liqudity', async (): Promise<void> => {
    //Given

    //Then

    //When

  })
})