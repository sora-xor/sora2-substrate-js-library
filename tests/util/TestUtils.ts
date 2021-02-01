import * as bip39 from 'bip39'
import { ApiPromise } from '@polkadot/api'
import { WsProvider } from '@polkadot/rpc-provider'
import { options } from '@sora-substrate/api'
import { AccountAsset, Asset, DexApi, KnownAssets, KnownSymbols } from '@sora-substrate/util'
import { Keyring } from '@polkadot/api'
import { KeypairType } from '@polkadot/util-crypto/types'
import { KeyringPair } from '@polkadot/keyring/types'
import { FPNumber } from '@sora-substrate/util'

export class TestUtils {

  public createApi(TEST_ENDPOINT): Promise<ApiPromise> {
    jest.setTimeout(90000);
    const provider = new WsProvider(TEST_ENDPOINT);
    const api = new ApiPromise(options({ provider }));
    return api.isReady;
  }

  public async innerSubmitExtrinsic(api: ApiPromise, extrinsic: any, signer: any, finishCallback: any): Promise<void> {
    // this is quick example, refer to https://polkadot.js.org/docs/api/cookbook/tx and https://polkadot.js.org/docs/api/start/api.tx.subs
    const unsub = await extrinsic.signAndSend(signer, (result: any) => {
      console.log(`Current status is ${result.status}`);

      if (result.status.isInBlock) {
        console.log(`Transaction included at blockHash ${result.status.asInBlock}`);
      } else if (result.status.isFinalized) {
        console.log(`Transaction finalized at blockHash ${result.status.asFinalized}`);

        result.events.forEach(({ phase, event: { data, method, section } }: any) => {
          console.log(`\t' ${phase}: ${section}.${method}:: ${data}`);
          if (section === 'system' && method === 'ExtrinsicFailed') {
            const [error,] = data;
            if (error.isModule) {
              const decoded = api.registry.findMetaError(error.asModule);
              const { documentation, name, section } = decoded;
              console.log(`${section}.${name}: ${documentation.join(' ')}`);
            } else {
              // Other, CannotLookup, BadOrigin, no extra info
              console.log(error.toString());
            }
          } else {
            console.log("Transaction success.")
          }
        });

        unsub();
        finishCallback();
      }
    });
  }

  public async submitExtrinsic(api: ApiPromise, extrinsic: any, signer: any, debugMessage = ''): Promise<void> {
    console.log(`\nSubmit extrinsic: ${debugMessage}\n`);
    return new Promise((resolve, _reject) => {
      this.innerSubmitExtrinsic(api, extrinsic, signer, resolve);
    });
  }

  public async disconnect(): Promise<void> {
    await this.disconnect()
  }
}

/**
 * Compact function for gettting Asset
 * @param assetSymbol 
 * @returns
 */
export function getAsset(assetSymbol: string): Asset {
  const asset = KnownAssets.find(i => i.symbol === assetSymbol)
  return asset
}

/**
 * Makes 3 attempts to update the balance, if the balance is not updated during this time makes reject
 * @param inputAssetSymbol 
 * @param inputAssetsBeforeSwap 
 * @param dexApi 
 */
export async function updateBalance(inputAssetSymbol: string, inputAssetsBeforeSwap: string, dexApi: DexApi): Promise<void> {
  for (let i = 0; i < 3; i++) {
    if (inputAssetsBeforeSwap == dexApi.accountAssets.find(i => i.symbol === inputAssetSymbol).balance)
      await dexApi.updateAccountAssets()
    else if (i==3 && inputAssetsBeforeSwap == dexApi.accountAssets.find(i => i.symbol === inputAssetSymbol).balance) {
      console.log("Balance is not updated after 3 times") 
      Promise.reject
    } else continue
  }
}

/**
 * 
 * @param cryptoType 
 * @param userName 
 * @param mnemonic If you do not pass this parameter the key pair will be generated from a random mnemonic
 * @returns
 */
export function createKeyring(cryptoType: KeypairType, userName: string, mnemonic?: string): KeyringPair {
  const keyring = new Keyring({ type: cryptoType });
  if (mnemonic) {
    return keyring.addFromMnemonic(mnemonic, { name: userName })
  } 
  else {
    const generatedMnemonic = bip39.generateMnemonic()
    console.log("Generated mnemonic:" + generatedMnemonic)
    return keyring.addFromMnemonic(generatedMnemonic)
  }
}

/**
 * Mint tokens with different cases:
 * 1. Account haven't tokens. This function has minted it.
 * 2. Account have token. Then balance will be checked and if it less than the Amount, mint will be executed.
 * 3. If the list of Assets is passed, than each Asset from list will be minted
 * @param utils 
 * @param api 
 * @param sudoKeyPair 
 * @param dexApi 
 * @param currentAmount 
 * @param assets 
 */
export async function mintTokens(utils: TestUtils, api: ApiPromise, sudoKeyPair: KeyringPair, dexApi: DexApi, currentAmount: number, assets?: Array<AccountAsset>): Promise<void>{
  if (!assets){
    for (const token of KnownAssets) {
      const amount = currentAmount * 10**(token.decimals)
      const accountAsset = dexApi.accountAssets.find(i => i.symbol === token.symbol)
      if (accountAsset){
        if (+accountAsset.balance <= new FPNumber(amount, token.decimals).toNumber()) {
          await utils.submitExtrinsic(api, api.tx.assets.mint(token.address, dexApi.accountPair.address, amount.toString()), sudoKeyPair, "Mint " + token.symbol)
        }
      } else {
        await utils.submitExtrinsic(api, api.tx.assets.mint(token.address, dexApi.accountPair.address, amount.toString()), sudoKeyPair, "Mint " + token.symbol)
      }
    }
  } else {
    for (const token of assets)
      await utils.submitExtrinsic(api, api.tx.assets.mint(token.address, dexApi.accountPair.address, currentAmount), sudoKeyPair, "Mint " + token.symbol)
  }
}

/**
 * Check all trading pair with KnownAssets and registered it if is not Enabled.
 */
export async function createTraidingPairs(utils: TestUtils, api: ApiPromise, sudoKeyPair: KeyringPair): Promise<void>{
  const dexID = 0
  let enabled: boolean
  for (const pair of KnownAssets) {
    if (pair.symbol == "XOR")
      continue
    enabled = await (api.rpc as any).tradingPair.isPairEnabled(dexID, KnownAssets.get(KnownSymbols.XOR).address, pair.address)
    if (!enabled){
      await utils.submitExtrinsic(api, api.tx.tradingPair.register(0, getAsset("XOR").address, pair.address), sudoKeyPair, "Enable Pair XOR - " + pair.symbol)

      await utils.submitExtrinsic(api, api.tx.poolXyk.initializePool(0, getAsset("XOR").address, pair.address), sudoKeyPair, "Initialize Pool XOR - " + pair.symbol);
      console.log("Pair of XOR - " + pair.symbol + "was registered!")
    }
  }
  console.log("All traiding pair is registered!")
}

export async function addLiqudity(utils: TestUtils, api: ApiPromise, dexApi: DexApi, sudoKeyPair: KeyringPair, firstTokenAmount: string, secondTokenAmount: string, assets?: Array<AccountAsset>): Promise<void>{
  if (!assets){
    for (const token of KnownAssets) {
      const ListAsset = await (api.rpc as any).assets.listAssetInfos()
      for (const xyk of ListAsset){
        if (xyk.symbol == "XYKPOOL") {
          const totalSupply = await (api.rpc as any).assets.totalSupply(xyk.asset_id.toString())
          if (+totalSupply.unwrap().balance.toString() == 0) {
            await utils.submitExtrinsic(api, api.tx.poolXyk.depositLiquidity(0, getAsset("XOR").address, token.address, firstTokenAmount, secondTokenAmount, "0", "0"), sudoKeyPair, "Add liquidity XOR - " + token.symbol)
          }
        }
      }
    }
  }
  else {
    for (const token of assets){
      await utils.submitExtrinsic(api, api.tx.poolXyk.depositLiquidity(0, getAsset("XOR").address, token.address, firstTokenAmount, secondTokenAmount, "0", "0"), sudoKeyPair, "Add liquidity XOR - " + token.symbol)
    }
  }   
}


export async function setupEnvironment(TEST_ENDPOINT: string, dexApi: DexApi, sudoSeed: string, testUserSeed: string): Promise<void>{
  console.log('Setup environment')

  //Some preparation things
  const utils = new TestUtils
  const api = await utils.createApi(TEST_ENDPOINT)
  dexApi.importAccount(testUserSeed,"TestUser","1")
  const sudoKeyPair = createKeyring('sr25519', 'SudoUser', sudoSeed)
  await dexApi.getKnownAccountAssets()

  //Mint tokens
  await mintTokens(utils, api, sudoKeyPair, dexApi, 10)

  // Check and create trading pairs
  await createTraidingPairs(utils, api, sudoKeyPair)

  // Add liquidity
  await addLiqudity(utils, api, dexApi, sudoKeyPair, "10000000", "10000000")

  console.log("end")
  Promise.resolve()
}
