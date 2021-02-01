import * as bip39 from 'bip39'
import { ApiPromise } from '@polkadot/api'
import { AccountAsset, Asset, DexApi, KnownAssets, KnownSymbols } from '@sora-substrate/util'
import { Keyring } from '@polkadot/api'
import { KeypairType } from '@polkadot/util-crypto/types'
import { KeyringPair } from '@polkadot/keyring/types'
import { FPNumber } from '@sora-substrate/util'

export class TestApi extends DexApi {

  constructor (endpoint?: string) {
    super(endpoint)
  }

  private async innerSubmitExtrinsic(api: ApiPromise, extrinsic: any, signer: any, finishCallback: any): Promise<void> {
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

  public async customSubmitExtrinsic(extrinsic: any, signer: any, debugMessage = ''): Promise<void> {
    console.log(`\nSubmit extrinsic: ${debugMessage}\n`);
    return new Promise((resolve, _reject) => {
      this.innerSubmitExtrinsic(this.api, extrinsic, signer, resolve);
    });
  }

  /**
 * Makes 3 attempts to update the balance, if the balance is not updated during this time makes reject
 * @param inputAssetSymbol 
 * @param inputAssetsBeforeSwap 
 */
  public async updateBalance(inputAssetSymbol: KnownSymbols, inputAssetsBeforeSwap: string): Promise<void> {
    for (let i = 0; i < 3; i++) {
      if (inputAssetsBeforeSwap == this.accountAssets.find(i => i.symbol === inputAssetSymbol).balance)
        await this.updateAccountAssets()
      else if (i==3 && inputAssetsBeforeSwap == this.accountAssets.find(i => i.symbol === inputAssetSymbol).balance) {
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
  public createKeyring(cryptoType: KeypairType, userName: string, mnemonic?: string): KeyringPair {
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
  public async mintTokens(sudoKeyPair: KeyringPair, currentAmount: number, assets?: Array<AccountAsset>): Promise<void>{
    if (!assets){
      for (const token of KnownAssets) {
        const amount = currentAmount * 10**(token.decimals)
        const accountAsset = this.accountAssets.find(i => i.symbol === token.symbol)
        if (accountAsset){
          const checkBalance = new FPNumber(amount.toString(), token.decimals)
          if (+accountAsset.balance <= currentAmount) {
            await this.customSubmitExtrinsic(this.api.tx.assets.mint(token.address, this.accountPair.address, "10000000"), sudoKeyPair, "Mint " + token.symbol)
          }
        } else {
          await this.customSubmitExtrinsic(this.api.tx.assets.mint(token.address, token.address, amount.toString()), sudoKeyPair, "Mint " + token.symbol)
        }
      }
    } else {
      for (const token of assets){
        const amount = currentAmount * 10**(token.decimals)
        await this.customSubmitExtrinsic(this.api.tx.assets.mint(token.address, this.accountPair.address, amount.toString()), sudoKeyPair, "Mint " + token.symbol)
      }
    }
  }

  /**
   * Check all trading pair with KnownAssets and registered it if is not Enabled.
   */
  public async createTraidingPairs(sudoKeyPair: KeyringPair): Promise<void>{
    const dexID = 0
    let enabled: boolean
    for (const pair of KnownAssets) {
      if (pair.symbol == "XOR")
        continue
      enabled = await (this.api.rpc as any).tradingPair.isPairEnabled(dexID, KnownAssets.get(KnownSymbols.XOR).address, pair.address)
      if (enabled == false){
        await this.customSubmitExtrinsic(this.api.tx.tradingPair.register(0, KnownAssets.get(KnownSymbols.XOR).address, pair.address), sudoKeyPair, "Enable Pair XOR - " + pair.symbol)

        await this.customSubmitExtrinsic(this.api.tx.poolXyk.initializePool(0, KnownAssets.get(KnownSymbols.XOR).address, pair.address), sudoKeyPair, "Initialize Pool XOR - " + pair.symbol);
        console.log("Pair of XOR - " + pair.symbol + "was registered!")
      }
    }
    console.log("All traiding pair is registered!")
  }

  public async addLiqudity(sudoKeyPair: KeyringPair, firstTokenAmount: number, secondTokenAmount: number, assets?: Array<AccountAsset>): Promise<void>{
    const ListAsset = await (this.api.rpc as any).assets.listAssetInfos()
    // for (const xyk of ListAsset){
    //   if (xyk.symbol == "XYKPOOL") {
    //     //add object for make tokens pool
    //     console.log("11")
    //   }
    // }
    for (const token of KnownAssets) {
      const firstAsset = firstTokenAmount * 10**(token.decimals)
      const secondAsset = secondTokenAmount * 10**(token.decimals)
      if (token.symbol == "VAL"){
        await this.customSubmitExtrinsic(this.api.tx.poolXyk.depositLiquidity(0, KnownAssets.get(KnownSymbols.XOR).address, token.address, "10000000000000", "10000000000000", "0", "0"), this.accountPair, "Add liquidity XOR - " + token.symbol)
        // await this.addLiquidity(KnownAssets.get(KnownSymbols.XOR).address, token.address, 10, 10)
      }
      // const totalSupply = await (this.api.rpc as any).assets.totalSupply()
      // if (+totalSupply.unwrap().balance.toString() == 0) {
      
      // }
    }
  }

  public str2ab(str): Uint8Array {
    const buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
    const bufView = new Uint8Array(buf);
    for (let i = 0, strLen = str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return bufView;
  }

  public async createAsset(sudoKeyPair: KeyringPair, asset: Asset): Promise<void> {
    // const symbol = str2ab(asset.symbol)
    // await utils.submitExtrinsic(api, api.tx.assets.register(), sudoKeyPair, "Register - " + asset.symbol)
  }

  public async setupEnvironment(sudoSeed: string, testUserSeed: string): Promise<void>{
    console.log('Setup environment')

    //Some preparation things
    this.importAccount(testUserSeed,"TestUser","1")
    const sudoKeyPair = this.createKeyring('sr25519', 'SudoUser', sudoSeed)
    await this.getKnownAccountAssets()
    // await dexApi.getAccountAsset(dexApi.accountPair.address)

    //Create assets
    // await createAsset(utils, api, sudoKeyPair, KnownAssets.get(KnownSymbols.DOT))

    //Mint tokens
    await this.mintTokens(sudoKeyPair, 1000)

    // Check and create trading pairs
    await this.createTraidingPairs(sudoKeyPair)

    // Add liquidity
    await this.addLiqudity(sudoKeyPair, 100, 100)

    console.log("end")
    Promise.resolve()
  }
}