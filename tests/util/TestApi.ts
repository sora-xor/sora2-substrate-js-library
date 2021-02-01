import * as bip39 from 'bip39'
import { ApiPromise } from '@polkadot/api'
import { Asset, DexApi, KnownAssets, KnownSymbols, FPNumber } from '@sora-substrate/util'
import { Keyring } from '@polkadot/api'
import { KeypairType } from '@polkadot/util-crypto/types'
import { KeyringPair } from '@polkadot/keyring/types'

export class TestApi extends DexApi {

  private async innerSubmitExtrinsic(api: ApiPromise, extrinsic: any, signer: any, finishCallback: any): Promise<void> {
    // this is quick example, refer to https://polkadot.js.org/docs/api/cookbook/tx and https://polkadot.js.org/docs/api/start/api.tx.subs
    const unsub = await extrinsic.signAndSend(signer, (result: any) => {
      console.log(`Current status is ${result.status}`)
      if (result.status.isInBlock) {
        console.log(`Transaction included at blockHash ${result.status.asInBlock}`)
      } else if (result.status.isFinalized) {
        console.log(`Transaction finalized at blockHash ${result.status.asFinalized}`)
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
        })

        unsub()
        finishCallback()
      }
    })
  }

  public async customSubmitExtrinsic(extrinsic: any, signer: any, debugMessage = ''): Promise<void> {
    console.log(`\nSubmit extrinsic: ${debugMessage}\n`)
    return new Promise((resolve, _reject) => {
      this.innerSubmitExtrinsic(this.api, extrinsic, signer, resolve)
    })
  }
  /**
   * Tries to update the balance 10 times, if the balance is not updated, the pledge will be rejected.
   * @param asset
   * @param balanceBefore The amount with which the balance will be compared after the update
   */
  public async updateBalance(asset: Asset, balanceBefore: string): Promise<void> {
    for (let i = 0; i <= 10; i++) {
      if (balanceBefore == this.accountAssets.find(i => i.symbol === asset.symbol).balance){
        await this.updateAccountAssets()
        await new Promise((r) => setTimeout(r, 3000))
      }
      else if (i==10 && balanceBefore == this.accountAssets.find(i => i.symbol === asset.symbol).balance) {
        console.log("Balance is not updated after 10 times") 
        Promise.reject
      } else {
        Promise.resolve
        break
      }
    }
  }

  /**
   * Create KeyringPair from mnemonic phrase or generate random if mnemonic has not been provided.
   * @param cryptoType type like "ed25519" | "sr25519" | "ecdsa" | "ethereum"
   * @param userName Just name.
   * @param mnemonic If passed generates a KeyringPair from this mnemonic.
   * @param mnemonicLength If passed generates a KeyringPair from mnemonic of a specific length(12, 18 or 24), default - 12 words
   * @returns KeyringPair
   */
  public createKeyring(cryptoType: KeypairType, userName: string, mnemonic?: string, mnemonicLength?: number): KeyringPair {
    const keyring = new Keyring({ type: cryptoType });
    if (mnemonic) {
      return keyring.addFromMnemonic(mnemonic, { name: userName })
    } 
    else {
      const generatedMnemonic = bip39.generateMnemonic(!mnemonicLength ? 12 : mnemonicLength)
      console.log("Generated mnemonic:" + generatedMnemonic)
      return keyring.addFromMnemonic(generatedMnemonic, { name: userName })
    }
  }

  /**
   * Mint all assets from KnownAssets on Amount to this.account or receiverKeyring if it passed 
   * @param dexKeyPair Account with access to mint assets
   * @param amount Amount for mint, keep decimal of asset in mind.
   * @param receiver Receiver KeyringPair
   * @param asset If passed mint only this asset
   */
  public async mintTokens(dexKeyPair: KeyringPair, amount: number, receiver?: KeyringPair, asset?: Asset): Promise<void>{
    if (asset) {
      //TODO Make it function more beautiful.
      const amountString = new FPNumber(amount, asset.decimals).bnToString()
      const receiverBalance = (await (this.api.rpc as any).assets.freeBalance(
        (!receiver ? this.accountPair.address : receiver.address),
        asset.address
      )).unwrap().balance.toString()
      if (+receiverBalance < +amountString){
        try{
          await this.customSubmitExtrinsic(this.api.tx.assets.mint(asset.address, this.accountPair.address, amountString), dexKeyPair, "Mint " + asset.symbol)
        } catch (err){
          console.log(err)
        }
      } else {
        console.log("=========================================================="+'\n'+
        "User: "
        +(!receiver ? this.accountPair.address : receiver.address)+
        " have: "
        +new FPNumber(receiverBalance, asset.decimals).toFixed()+
        " of "+asset.symbol+ '\n'+
        "==========================================================")
      }
    } else {
      for (const token of KnownAssets) {
        const amountString = new FPNumber(amount, token.decimals).bnToString()
        const receiverBalance = (await (this.api.rpc as any).assets.freeBalance(
          (!receiver ? this.accountPair.address : receiver.address),
          token.address
        )).unwrap().balance.toString()
        if (+receiverBalance < +amountString){
          await this.customSubmitExtrinsic(this.api.tx.assets.mint(token.address, this.accountPair.address, amountString), dexKeyPair, "Mint " + token.symbol)
        } else {
          console.log("=========================================================="+'\n'+
          "User " +(!receiver ? this.accountPair.address : receiver.address)+ "have: " 
          +new FPNumber(receiverBalance, token.decimals).toFixed()+
          " of " +token.symbol+ '\n'+
          "==========================================================")
        }
      }
    }
  }

  /**
   * Check if XOR trading pairs are created with tokens from KnownAssets if not, creates them
   * @param sudoKeyPair account with access to create trading pairs
   */
  public async createTradingPairs(sudoKeyPair: KeyringPair): Promise<void>{
    const dexID = 0
    let enabled: boolean
    const xor = KnownAssets.get(KnownSymbols.XOR)
    for (const token of KnownAssets) {
      if (token.symbol == "XOR") {
        continue
      }
      enabled = await (this.api.rpc as any).tradingPair.isPairEnabled(dexID, xor.address, token.address)
      if (enabled == false){
        await this.customSubmitExtrinsic(this.api.tx.tradingPair.register(0, xor.address, token.address), sudoKeyPair, "Enable Pair XOR - " + token.symbol)

        await this.customSubmitExtrinsic(this.api.tx.poolXyk.initializePool(0, xor.address, token.address), sudoKeyPair, "Initialize Pool XOR - " + token.symbol);
        console.log("Pair of XOR - " + token.symbol + "was registered!")
      }
    }
    console.log("All trading pair is registered!")
  }

  /**
   * Check balance of receiver, if it lower that amount send him from sender.
   * @param receiver Account that receive
   * @param amount Amount of token
   * @param asset Asset to be sent
   * @param sender Account that sends
   */
  public async sendTokenIfNeed(receiver: KeyringPair, amount: number, asset: Asset,  sender: KeyringPair): Promise<void> {
    const amountString = new FPNumber(amount, asset.decimals).bnToString()
    const receiverBalance = (await (this.api.rpc as any).assets.freeBalance(
      receiver.address,
      asset.address
    )).unwrap().balance.toString()
    if (+receiverBalance < +amountString){
      await this.customSubmitExtrinsic(this.api.tx.assets.transfer(
        asset.address,
        receiver.address,
        amountString
      ), sender, "Transfer " +asset.symbol+ " amount: " +amount+ " from: " +sender.address+ " to: " +receiver.address)
    } else {
      console.log("=========================================================="+'\n'+
      "User " +receiver.address+ "have: " 
      +new FPNumber(receiverBalance, asset.decimals).toFixed()+
      " of " +asset.symbol+ '\n'+
      "==========================================================")
    }
  }

  /**
   * Checks the total liquidity of PoolTokens with XOR and the asset from KnownAssets, if it is empty makes a deposit.
   * @param amount 
   */
  public async setLiquidity(amount: number): Promise<void>{
    // const ListAsset = await (this.api.rpc as any).assets.listAssetInfos() //TODO make add liquidity for all assets
    const xor = KnownAssets.get(KnownSymbols.XOR)
    for (const token of KnownAssets) {
      const amountToString = new FPNumber(amount, token.decimals).bnToString()
      if (token.symbol == "XOR"){
        continue
      }
      const totalLiquidity = await this.getLiquidityReserves(xor.address, token.address)
      if (+totalLiquidity[0] == 0 || +totalLiquidity[1] == 0) {
        await this.customSubmitExtrinsic(this.api.tx.poolXyk.depositLiquidity(
          0,
          xor.address,
          token.address,
          amountToString,
          amountToString,
          "0",
          "0"
        ), this.accountPair, "Add liquidity XOR - " + token.symbol)
      }
    }
  }

  public symbolToU8Array(str): Uint8Array {
    const buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
    const bufView = new Uint8Array(buf);
    for (let i = 0, strLen = str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return bufView;
  }

  public async createAsset(sudoKeyPair: KeyringPair, asset: Asset): Promise<void> {
    // const symbol = symbolToU8Array(asset.symbol)
    // await utils.submitExtrinsic(api, api.tx.assets.register(), sudoKeyPair, "Register - " + asset.symbol)
  }

  /**
   * Checks the environment if it needs mint tokens, create trading pairs and add liquidity.
   * @param sudoSeed 
   * @param testUserSeed 
   * @param dexSeed 
   */
  public async setupEnvironment(sudoSeed: string, testUserSeed: string, dexSeed: string): Promise<void>{
    console.log('Setup environment')
    //Some preparation things
    const xor = KnownAssets.get(KnownSymbols.XOR)
    const amountForDex = 10
    const amountForMinting = 5000
    const amountForLiquidity = 1000
    this.importAccount(testUserSeed,"TestUser","1")
    const sudoKeyPair = this.createKeyring('sr25519', 'SudoUser', sudoSeed)
    const dexKeyPair = this.createKeyring('sr25519', 'DexUser', dexSeed)
    await this.getKnownAccountAssets()

    //Check balance of DEX user if it small transfer from sudo
    await this.sendTokenIfNeed(dexKeyPair, amountForDex, xor, sudoKeyPair)
    //Create assets
    // await createAsset(utils, api, sudoKeyPair, KnownAssets.get(KnownSymbols.DOT)) //TODO not implemented.
    //Mint tokens
    await this.mintTokens(dexKeyPair, amountForMinting)
    // Check and create trading pairs
    await this.createTradingPairs(sudoKeyPair)
    // Add liquidity
    await this.setLiquidity(amountForLiquidity)
    console.log("end")
    Promise.resolve()
  }
}