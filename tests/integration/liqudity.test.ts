import { DexApi, KnownAssets, KnownSymbols } from '@sora-substrate/util'
import { TestApi } from '../util'
import { ApiPromise } from '@polkadot/api'
import { strictEqual } from 'assert'

const TEST_ENDPOINT = 'wss://ws.stage.sora2.soramitsu.co.jp'
const sudoSeed = "scissors spread water arrive damp face amazing shrug warfare silk dry prison"
const dexSeed = "era actor pluck voice frost club gallery palm moment empower whale flame"
const testUserSeed = "nominee hundred leader math hurt federal limit frozen flag skirt sentence hello"

describe('Liqudity test function', (): void => {
  let testApi: TestApi
  beforeAll(async (done) => {
    testApi = new TestApi(TEST_ENDPOINT)
    await testApi.initialize()
    await testApi.setupEnvironment(sudoSeed, testUserSeed)
    done()
  }, 10_000_000)
  afterAll(async (done) => {
    await testApi.disconnect()
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