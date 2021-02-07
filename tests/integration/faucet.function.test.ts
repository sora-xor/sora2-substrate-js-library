import { TestApi } from '../util'
import { connection } from '@sora-substrate/util'
import { config } from '../config'

const TEST_ENDPOINT = config.url
const sudoSeed = config.sudoSeed
const dexSeed = config.dexSeed
const testUserSeed = config.userSeed


/*
Seeds for testnet can found here:
https://soramitsu.atlassian.net/wiki/spaces/PLS/pages/2224816140/Environments
*/

describe('Test fauset function', (): void => {
  let testApi: TestApi
  beforeAll(async (done) => {
    testApi = new TestApi()
    await testApi.initialize();
    done()
  })
  afterAll(async (done) => {
    await connection.close()
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