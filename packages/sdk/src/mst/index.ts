import { assert } from '@polkadot/util';
import { FPNumber, NumberLike, CodecString } from '@sora-substrate/math';
import type { SubmittableExtrinsic } from '@polkadot/api/promise/types';

import { Messages } from '../logger';
import { Operation } from '../types';
import type { Api } from '../api';
import { KeyringAddress } from '@polkadot/ui-keyring/types';

/**
 * This module is used for internal needs
 */
export class MstModule<T> {
  constructor(private readonly root: Api<T>) {}

  /**
   * Returns batch tx
   * @param data List with data for Transfer All Tx
   */
  public prepareCall(
    data: Array<{ assetAddress: string; toAddress: string; amount: NumberLike }>
  ): SubmittableExtrinsic {
    assert(data.length, Messages.noTransferData);

    const txs = data.map((item) => {
      return this.root.api.tx.assets.transfer(
        item.assetAddress,
        item.toAddress,
        new FPNumber(item.amount).toCodecString()
      );
    });
    return this.root.api.tx.utility.batchAll(txs);
  }

  /**
   * Returns the final extrinsic for Trnaser All MST transaction
   * @param call `api.prepareTransferAllAsMstCall` result
   * @param threshold Minimum number of signers
   * @param coSigners List of co-signers
   */
  public prepareExtrinsic(
    call: SubmittableExtrinsic,
    threshold: number,
    coSigners: Array<string>
  ): SubmittableExtrinsic {
    assert(this.root.account, Messages.connectWallet);
    const MAX_WEIGHT = 640000000;
    // TODO: [MST] check MAX_WEIGHT arg
    return this.root.api.tx.multisig.approveAsMulti(threshold, coSigners, null, call.method.hash, `${MAX_WEIGHT}`);
  }

  /**
   * Get network fee for Transfer All MST Tx
   * @param extrinsic `api.prepareTransferAllAsMstExtrinsic` result
   */
  public async getNetworkFee(tx: SubmittableExtrinsic): Promise<CodecString> {
    return await this.root.getTransactionFee(tx);
  }

  /**
   * Transfer all data from array as MST
   * @param extrinsic `api.prepareTransferAllAsMstExtrinsic` result
   */
  public submit(extrinsic: SubmittableExtrinsic): Promise<T> {
    assert(this.root.account, Messages.connectWallet);
    return this.root.submitExtrinsic(extrinsic, this.root.account.pair, {
      type: Operation.TransferAll,
    });
  }

  /**
   * Get the last (frist from array of multisigns) pending TX from MST
   * @param mstAccount MST account
   */
  public async getLastPendingTx(mstAccount: string): Promise<string | null> {
    try {
      const pendingData = await this.root.api.query.multisig.multisigs.entries(mstAccount);
      return pendingData.map(([item, _]) => item.args[1].toString())[0];
    } catch {
      return null;
    }
  }

  getMSTName(): string {
    const addressMST = this.root.account?.pair?.address ?? '';
    const multisigAccount = this.getMstAccount(addressMST);
    return multisigAccount?.meta.name ?? '';
  }

  public createMST(accounts: string[], threshold: number, name: string): string {
    const keyring = this.root.keyring; // Access keyring via the getter

    const result = keyring.addMultisig(accounts, threshold, { name });
    const addressMST = this.root.formatAddress(result.pair.address);
    keyring.saveAddress(addressMST, {
      name,
      isMultisig: true,
      whenCreated: Date.now(),
      threshold,
      who: accounts,
    });
    // In default account set MST Address account
    this.root.accountStorage?.set('MSTAddress', addressMST);

    return addressMST;
  }

  /**
   * Get Multisig Account
   */
  public getMstAccount(address: string): KeyringAddress | undefined {
    const keyring = this.root.keyring; // Access keyring via the getter

    const multisigAccounts = keyring.getAddresses().filter(({ meta }) => meta.isMultisig);
    const multisigAccount = multisigAccounts.find((account) => {
      const accountAddress = this.root.formatAddress(account.address, false);
      const targetAddress = this.root.formatAddress(address, false);
      return accountAddress === targetAddress;
    });
    return multisigAccount;
  }

  /**
   * Update Multisig Account Name
   */
  public updateMultisigName(newName: string): void {
    const keyring = this.root.keyring; // Access keyring via the getter

    const addressMST = this.root.formatAddress(this.root.account?.pair?.address) ?? '';
    const multisigAccount = this.getMstAccount(addressMST);
    if (multisigAccount) {
      const pair = keyring.getPair(multisigAccount.address);
      const currentMeta = pair.meta || {};
      const updatedMeta = { ...currentMeta, name: newName };
      keyring.saveAccountMeta(pair, updatedMeta);
    } else {
      console.error(`Multisig account with address ${addressMST} not found among multisig accounts.`);
    }
  }

  public isMstAddressExist(): boolean {
    /* We taking previousAccountAddress because for now we are in MST,
    and we have MST address stored onle in default account
    previousAccountAddress have only MST*/
    const addressMST =
      (this.root.accountStorage?.get('previousAccountAddress') || this.root.accountStorage?.get('MSTAddress')) ?? '';
    return addressMST !== '';
  }

  public getMstAddress(): string {
    console.info('we are in getMstAddress');
    console.info('first', this.root.accountStorage?.get('MSTAddress'));
    console.info('second', this.root.account?.pair?.address);
    return this.root.accountStorage?.get('MSTAddress') || this.root.account?.pair?.address || '';
  }

  public isMST(): boolean {
    const addressMST = this.root.accountStorage?.get('previousAccountAddress');
    return addressMST !== '';
  }

  public forgetMSTAccount(): void {
    // We will be always in MST before delete it
    const previousAccountAddress = this.root.accountStorage?.get('previousAccountAddress');
    const previousAccountPair = this.root.getAccountPair(previousAccountAddress ?? '');
    const meta = previousAccountPair.meta;
    const mstAddress = this.root.address;

    this.root.accountStorage?.remove('previousAccountAddress');
    this.root.accountStorage?.remove('assetsAddresses');
    // Login to the default account
    this.root.loginAccount(
      previousAccountPair.address,
      meta.name as string,
      meta.source as string,
      meta.isExternal as boolean
    );
    this.root.accountStorage?.remove('MSTAddress');
    this.root.forgetAccount(mstAddress);
  }

  public switchAccount(switchToMST: boolean): void {
    const currentAccountAddress = this.root.account?.pair?.address ?? '';
    let targetAddress: string | undefined;
    let storePreviousAccountAddress = false;

    if (switchToMST) {
      targetAddress = this.root.accountStorage?.get('MSTAddress');
      storePreviousAccountAddress = true;
    } else {
      targetAddress = this.root.accountStorage?.get('previousAccountAddress');
    }

    const accountPair = this.root.getAccountPair(targetAddress ?? '');
    const meta = accountPair.meta;
    this.root.loginAccount(accountPair.address, meta.name as string, meta.source as string, meta.isExternal as boolean);

    if (storePreviousAccountAddress) {
      this.root.accountStorage?.set('previousAccountAddress', currentAccountAddress);
    }
  }

  public async subscribeOnPendingTxs(mstAccount: string): Promise<string | null> {
    // Observable
    // Stefan + Rustem + Nikita -> MST (public address)
    // 1. All member should generate the same MST account using parameters (all co-signer addresses + treshold)
    try {
      // 1. TODO: subscribe to block
      const pendingData = await this.root.api.query.multisig.multisigs.entries(mstAccount);
      console.info(pendingData);
      return pendingData.map(([item, _]) => item.args[1].toString())[0];
      // 2. [AccountId32, U8aFixed] - 2nd (U8aFixed) is callHash
      // 3. 'someData' below contains block number where this TX was created
      // 4. request extrinsics from this block (system.getExtrinsicsFromBlock)
      // 5. find needed extrinsic (with tx.system.remark event + multisig.approveAsMulti event)
      // 6. get the data from system.remark, decrypt it. it'll be represented as callData
      // 6.1 ensure that hash(callData) is the same as callHash
      // Other methods
      // 7. show it to the user (getHistoryByCallData)
      // 8. user approves or declines:
      // 8.1. if the TX was not the last from threshold - approveAsMulti(callHash)
      // 8.2. if the TX was the last from threshold - asMulti(callData)

      // !!!! Users should have an ability to see callData in UI in case they don't use Fearless Wallet
      // !!!! We should block the flow where user doesn't use Fearless Wallet | Desktop
      return pendingData.map(([item, someData]) => item.args[1].toString())[0];
    } catch {
      return null;
    }
  }
}
