import { TestApi } from '../util'
import { ApiPromise } from '@polkadot/api'

const TEST_ENDPOINT = 'wss://ws.stage.sora2.soramitsu.co.jp'


/*
Seeds for testnet can found here:
https://soramitsu.atlassian.net/wiki/spaces/PLS/pages/2224816140/Environments
*/

describe('Test fauset function', (): void => {
  let testApi: TestApi
  beforeAll(async (done) => {
    testApi = new TestApi(TEST_ENDPOINT)
    await testApi.initialize();
    done()
  })
  afterAll(async (done) => {
    await testApi.disconnect()
    done()
  })
  it('Check minimal amount', async (): Promise<void> => {
    //Given
  
    //Then

    //When

  })
  it('Check maximum amount', async (): Promise<void> => {
    //Given

    //Then

    //When

  })
  it('Check double getting', async (): Promise<void> => {
    //Given

    //Then

    //When

  })
  it('Check geting over that max receive', async (): Promise<void> => {
    //Given

    //Then

    //When

  })
});