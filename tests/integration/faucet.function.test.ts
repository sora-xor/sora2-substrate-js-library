import { TestApi } from '../util'
import { connection } from '@sora-substrate/util'
import { ENV } from '../env'

const env = ENV.STAGE
const TEST_ENDPOINT = env.URL
const sudoSeed = env.SUDO_SEED
const dexSeed = env.DEX_SEED
const testUserSeed = env.USER_SEED


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