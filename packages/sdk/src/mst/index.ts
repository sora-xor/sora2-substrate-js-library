import { assert } from '@polkadot/util';
import { FPNumber, NumberLike, CodecString } from '@sora-substrate/math';
import type { SubmittableExtrinsic } from '@polkadot/api/promise/types';

import { Messages } from '../logger';
import { HistoryItem, Operation } from '../types';
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
    const addressMST =
      this.root.formatAddress(this.root.accountStorage?.get('MSTAddress')) ||
      this.root.formatAddress(this.root.account?.pair?.address);

    const multisigAccount = this.getMstAccount(addressMST);
    if (multisigAccount) {
      this.root.changeAccountName(multisigAccount.address, newName);
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
    // callData преобразование в historyItem
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
    try {
      const pendingData = await this.root.api.query.multisig.multisigs.entries(mstAccount);
      console.info('Pending multisig entries:', pendingData);

      for (const [key, multisigInfo] of pendingData) {
        const callHash = key.args[1].toHex();
        const info = multisigInfo.unwrap();
        const { when } = info;
        const blockNumber = when.height.toNumber();
        const extrinsicIndex = when.index.toNumber();

        console.info('Call Hash:', callHash);
        console.info('Block Number:', blockNumber);
        console.info('Extrinsic Index:', extrinsicIndex);

        // Fetch the block and extrinsics
        const blockHash = await this.root.api.rpc.chain.getBlockHash(blockNumber);
        const signedBlock = await this.root.api.rpc.chain.getBlock(blockHash);
        const extrinsics = signedBlock.block.extrinsics;

        console.info(`Fetched block ${blockNumber} with hash ${blockHash.toHex()}`);
        console.info(`Extrinsics in block: ${extrinsics.length}`);

        // Retrieve the extrinsic at the specified index
        const extrinsic = extrinsics[extrinsicIndex];
        console.info('Extrinsic Method:', extrinsic.method.section, extrinsic.method.method);

        // Check if the extrinsic is `asMulti` (which contains `callData`) and process it
        if (extrinsic.method.section === 'multisig' && extrinsic.method.method === 'asMulti') {
          console.info('Found `asMulti` extrinsic containing the original call data.');

          // Retrieve call data and threshold information
          const threshold = Number(extrinsic.method.args[0].toString());
          const otherSignatories = extrinsic.method.args[1].toHuman();
          const callData = extrinsic.method.args[3]; // Call data is at index 3 in `asMulti`
          const computedCallHash = this.root.api.registry.hash(callData.toU8a()).toHex();

          console.info('Threshold:', threshold);
          console.info('Other Signatories:', otherSignatories);
          console.info('Computed Call Hash from Call Data:', computedCallHash);
          console.info('Stored Call Hash:', callHash);

          // Verify that the computed call hash matches the stored call hash
          if (computedCallHash === callHash) {
            console.info('Computed call hash matches stored call hash.');
            console.info('Decoding call data to extract method details...');

            // Decode the `callData` to retrieve transaction details
            const decodedCall = this.root.api.registry.createType('Call', callData);
            const method = decodedCall.method;
            const section = decodedCall.section;
            // Decode and interpret the transfer arguments
            const args = decodedCall.args;

            // Extract the asset ID (assumes it can be converted to human-readable format)
            const assetId = args[0].toHuman(); // Decodes asset ID, if human-readable is available
            console.info('Asset ID:', assetId);

            // Decode recipient address (formatted address)
            const recipientAddress = this.root.api.registry.createType('AccountId', args[1]).toString();
            console.info('Recipient Address:', recipientAddress);

            // Decode amount (convert to main denomination if needed)
            const amountRaw = args[2].toString();
            const amountFormatted = new FPNumber(amountRaw, this.root.chainDecimals).toString();
            console.info('Amount:', amountFormatted);

            // Output final information
            console.info(`Pending multisig transaction details: ${amountFormatted} ${assetId} to ${recipientAddress}`);

            console.info(`Pending multisig transaction: ${section}.${method}`);
            console.info('Arguments:', args);

            // You can now process the decoded call data (e.g., transfer amount, recipient)
          } else {
            console.warn('Computed call hash does not match the stored call hash');
          }
        } else {
          console.warn('Extrinsic at specified index is not multisig.asMulti');
        }
      }

      // Return the first call hash (or adjust as needed)
      return pendingData.length > 0 ? pendingData[0][0].args[1].toHex() : null;
    } catch (error) {
      console.error('Error in subscribeOnPendingTxs:', error);
      return null;
    }
  }
}
