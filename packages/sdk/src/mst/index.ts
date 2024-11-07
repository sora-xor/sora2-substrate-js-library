import { BN } from '@polkadot/util';
import { FPNumber } from '@sora-substrate/math';
import type { SubmittableExtrinsic } from '@polkadot/api/promise/types';
import type { KeyringPair } from '@polkadot/keyring/types';

import { HistoryItem, Operation } from '../types';
import type { Api } from '../api';
import { KeyringAddress } from '@polkadot/ui-keyring/types';

/**
 * This module is used for internal needs
 */
export class MstModule<T> {
  constructor(private readonly root: Api<T>) {}

  private mstAddress?: string;
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
    this.root.accountStorage?.set('MSTAddress', addressMST);

    this.mstAddress = addressMST;
    this.root.setMstAccount(result);

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
      targetAddress = this.root.accountStorage?.get('MSTAddress') ?? this.mstAddress;
      storePreviousAccountAddress = true;
    } else {
      targetAddress =
        this.root.accountStorage?.get('previousAccountAddress') ?? this.root.previousAccount?.pair.address;
    }

    const accountPair = this.root.getAccountPair(this.root.formatAddress(targetAddress) ?? '');
    const meta = accountPair.meta;

    if (switchToMST) {
      this.root.switchToMstAccount();
    } else {
      this.root.switchToMainAccount();
    }
    this.root.loginAccount(accountPair.address, meta.name as string, meta.source as string, meta.isExternal as boolean);
    if (storePreviousAccountAddress) {
      this.root.accountStorage?.set('previousAccountAddress', currentAccountAddress);
    }
  }

  public async submitMultisigExtrinsic(
    call: SubmittableExtrinsic,
    multisigAccountPair: KeyringPair,
    signerAccountPair: KeyringPair,
    historyData: HistoryItem,
    unsigned = false
  ): Promise<T> {
    console.info('Submitting multisig extrinsic');

    const callHash = call.method.hash;
    const multisigAccount = this.getMstAccount(multisigAccountPair.address);
    console.info('the multisigAccount', multisigAccount?.address);
    if (!multisigAccount) {
      throw new Error(`Multisig account with address ${multisigAccountPair.address} not found.`);
    }

    const meta = multisigAccount.meta as unknown as any;
    if (!meta) {
      throw new Error(`Metadata for multisig account ${multisigAccountPair.address} is missing.`);
    }

    const allSignatories = meta.who ? [...meta.who] : [];
    const otherSignatories = allSignatories.filter(
      (address) => address !== this.root.formatAddress(signerAccountPair.address)
    );
    otherSignatories.sort();
    const threshold = meta.threshold;

    const multisigAddress = multisigAccountPair.address;
    const info = await this.root.api.query.multisig.multisigs(multisigAddress, callHash);
    let maybeTimepoint = null;
    if (info.isSome) {
      const { when } = info.unwrap();
      maybeTimepoint = when;
    }

    const MAX_WEIGHT = new BN('640000000');
    const maxWeight = this.root.api.registry.createType('Weight', {
      refTime: MAX_WEIGHT,
      proofSize: new BN(0),
    });

    const approveExtrinsic = this.root.api.tx.multisig.asMulti(
      threshold,
      otherSignatories,
      maybeTimepoint,
      call,
      maxWeight
    );

    const updatedHistoryData = { ...historyData, from: multisigAccountPair.address };
    return await this.root.submitExtrinsic(approveExtrinsic, signerAccountPair, updatedHistoryData, unsigned);
  }

  public async subscribeOnPendingTxs(mstAccount: string): Promise<HistoryItem[] | null> {
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
      const pendingData = await this.getPendingMultisigTransactions(mstAccount);
      const pendingTransactions: HistoryItem[] = [];

      for (const [key, multisigInfo] of pendingData) {
        const historyItem = await this.processPendingTransaction(mstAccount, key, multisigInfo);
        if (historyItem) {
          pendingTransactions.push(historyItem);
        }
      }
      console.info('here are pendingTransactions');
      console.info(pendingTransactions);
      return pendingTransactions.length > 0 ? pendingTransactions : null;
    } catch (error) {
      console.error('Error in subscribeOnPendingTxs:', error);
      return null;
    }
  }
  private async getPendingMultisigTransactions(mstAccount: string) {
    return await this.root.api.query.multisig.multisigs.entries(mstAccount);
  }
  private async parseCallDataToHistoryItem(
    callData: any,
    multisigInfo: { threshold: number; signatories: string[] },
    blockNumber: number,
    blockHash: string,
    blockTimestamp: number,
    mstAccount: string
  ): Promise<HistoryItem> {
    const decodedCall = this.root.api.registry.createType('Call', callData);
    const method = decodedCall.method;
    const section = decodedCall.section;
    const args = decodedCall.args;
    console.info('the args are');
    console.info(args);
    let historyItem: HistoryItem = {
      id: '',
      from: this.root.formatAddress(mstAccount),
      type: Operation.Transfer,
      multisig: {
        threshold: multisigInfo.threshold,
        signatories: multisigInfo.signatories,
      },
      blockId: blockHash,
      blockHeight: blockNumber,
      startTime: blockTimestamp,
    };

    const operationKey = `${section}.${method}`;
    const operationMap: { [key: string]: Operation } = {
      'assets.transfer': Operation.Transfer,
      'assets.register': Operation.RegisterAsset,
    };

    historyItem.type = operationMap[operationKey];

    switch (historyItem.type) {
      case Operation.Transfer:
        // Extract assetAddress
        const assetId = args[0];
        let assetAddress: string = '';

        const assetIdHuman = assetId.toHuman();

        if (typeof assetIdHuman === 'object' && assetIdHuman !== null && 'code' in assetIdHuman) {
          assetAddress = assetIdHuman.code != null ? assetIdHuman.code.toString() : '';
        } else if (typeof assetIdHuman === 'string') {
          assetAddress = assetIdHuman;
        } else {
          assetAddress = assetId.toString();
        }

        historyItem.assetAddress = assetAddress;

        // Extract recipient address
        const recipientAddress = this.root.formatAddress(args[1].toString());
        historyItem.to = recipientAddress;

        // Extract amount
        const amountRaw = args[2].toString();
        historyItem.amount = new FPNumber(amountRaw, this.root.chainDecimals).toString();
        const assetInfo = await this.root.assets.getAssetInfo(assetAddress);
        historyItem.symbol = assetInfo?.symbol;
        historyItem.decimals = assetInfo?.decimals;

        break;
      default:
        console.warn(`Unhandled operation for ${operationKey}`);
        break;
    }

    return historyItem;
  }
  private async processPendingTransaction(
    mstAccount: string,
    key: any,
    multisigInfo: any
  ): Promise<HistoryItem | null> {
    const callHash = key.args[1].toHex();
    const info = multisigInfo.unwrap();
    const { when } = info;
    const blockNumber = when.height.toNumber();
    const extrinsicIndex = when.index.toNumber();
    const blockHash = await this.root.api.rpc.chain.getBlockHash(blockNumber);
    const signedBlock = await this.root.api.rpc.chain.getBlock(blockHash);
    const extrinsics = signedBlock.block.extrinsics;

    const extrinsic = extrinsics[extrinsicIndex];

    if (extrinsic.method.section === 'multisig' && extrinsic.method.method === 'asMulti') {
      const callData = extrinsic.method.args[3];

      // Extract multisig info
      const threshold = Number(extrinsic.method.args[0].toString());
      const otherSignatories = extrinsic.method.args[1].toHuman() as string[];
      const signerAddress = extrinsic.signer.toString();
      const allSignatories = [signerAddress, ...otherSignatories].map((s) => this.root.formatAddress(s));

      const multisigInfo = {
        threshold: threshold,
        signatories: allSignatories,
      };

      const blockTimestamp = await this.getBlockTimestamp(blockHash);
      const historyItem = this.parseCallDataToHistoryItem(
        callData,
        multisigInfo,
        blockNumber,
        blockHash.toHex(),
        blockTimestamp,
        mstAccount
      );
      (await historyItem).id = callHash;
      return historyItem;
    } else {
      console.warn('Extrinsic at specified index is not multisig.asMulti');
      return null;
    }
  }

  private async getBlockTimestamp(blockHash: any): Promise<number> {
    const atApi = await this.root.api.at(blockHash);
    const timestamp = await atApi.query.timestamp.now();
    return Number(timestamp.toBigInt());
  }
}
