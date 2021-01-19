import * as delay from 'delay';
import { TestUtils } from './util';
import { ApiPromise } from '@polkadot/api'
import { strictEqual, ok } from 'assert';

const TEST_ENDPOINT = 'wss://ws.stage.sora2.soramitsu.co.jp'


/*
Seeds for testnet can found here:
https://soramitsu.atlassian.net/wiki/spaces/PLS/pages/2224816140/Environments
*/

describe('Test fauset function', (): void => {
  let utils: TestUtils
  let api: ApiPromise
  beforeAll(async (done) => {
    utils = new TestUtils();
    api = await utils.createApi(TEST_ENDPOINT);
    done()
  })
  afterAll(async (done) => {
    await api.disconnect()
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