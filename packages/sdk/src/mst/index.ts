import { BN } from '@polkadot/util';
import { FPNumber } from '@sora-substrate/math';
import type { SubmittableExtrinsic } from '@polkadot/api/promise/types';
import type { KeyringPair } from '@polkadot/keyring/types';

import { HistoryItem, Operation, TransactionStatus } from '../types';
import type { Api } from '../api';
import { KeyringAddress } from '@polkadot/ui-keyring/types';
import { blake2AsHex } from '@polkadot/util-crypto';
import { Subject, Subscription } from 'rxjs';
import { SwapAmount } from '@sora-substrate/types';

/**
 * This module is used for internal needs
 */
export class MstModule<T> {
  constructor(private readonly root: Api<T>) {}

  private mstAddress?: string;
  private pendingTxsSubject = new Subject<HistoryItem[]>();
  public pendingTxsUpdated = this.pendingTxsSubject.asObservable();
  private lastPendingTxs: HistoryItem[] = [];
  private pendingTxsSubscription: Subscription | null = null;
  getMSTName(): string {
    const addressMST = this.root.account?.pair?.address ?? '';
    const multisigAccount = this.getMstAccount(addressMST);
    return multisigAccount?.meta.name ?? '';
  }

  public createMST(accounts: string[], threshold: number, name: string, deadlineInBlocks?: number): string {
    const keyring = this.root.keyring; // Access keyring via the getter

    const result = keyring.addMultisig(accounts, threshold, { name });
    const addressMST = this.root.formatAddress(result.pair.address);
    keyring.saveAddress(addressMST, {
      name,
      isMultisig: true,
      whenCreated: Date.now(),
      threshold,
      who: accounts,
      deadlineInBlocks,
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

  public getPrevoiusAccount(): string | undefined {
    return this.root.accountStorage?.get('previousAccountAddress');
  }

  public getMstAddress(): string {
    return this.root.accountStorage?.get('MSTAddress') || this.root.account?.pair?.address || '';
  }

  public isMST(): boolean {
    const addressMST = this.root.accountStorage?.get('previousAccountAddress');
    return addressMST !== '';
  }

  public forgetMSTAccount(): void {
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
        this.root.accountStorage?.get('previousAccountAddress') || this.root.previousAccount?.pair.address;
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

  // Submitting for the first time
  public async submitMultisigExtrinsic(
    call: SubmittableExtrinsic,
    multisigAccountPair: KeyringPair,
    signerAccountPair: KeyringPair,
    historyData: HistoryItem,
    unsigned = false
  ): Promise<T> {
    console.info('we are in submitMultisigExtrinsic');
    const callHash = call.method.hash;
    const multisigAccount = this.getMstAccount(multisigAccountPair.address);
    if (!multisigAccount) {
      throw new Error(`Multisig account with address ${multisigAccountPair.address} not found.`);
    }

    const meta = multisigAccount.meta as unknown as any;
    if (!meta) {
      throw new Error(`Metadata for multisig account ${multisigAccountPair.address} is missing.`);
    }

    const allSignatories = meta.who ? [...meta.who].map((address) => this.root.formatAddress(address)) : [];
    const formattedSignerAddress = this.root.formatAddress(signerAccountPair.address);

    const otherSignatories = allSignatories.filter((address) => address !== formattedSignerAddress);
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

    const callData = call.method.toHex();

    const systemRemarkCall = this.root.api.tx.system.remark(callData);

    const multisigCall = this.root.api.tx.multisig.asMulti(
      threshold,
      otherSignatories,
      maybeTimepoint,
      call,
      maxWeight
    );

    // Create batch call
    const batchCall = this.root.api.tx.utility.batch([systemRemarkCall, multisigCall]);

    const updatedHistoryData = {
      ...historyData,
      from: multisigAccountPair.address,
      ...(threshold === 1 && { status: TransactionStatus.Finalized }),
    };

    return await this.root.submitExtrinsic(batchCall, signerAccountPair, updatedHistoryData, unsigned);
  }

  // Approving from another co-signers
  public async approveMultisigExtrinsic(callHash: string, multisigAccountAddress: string): Promise<void> {
    const signerAddress =
      this.root.formatAddress(this.root.accountStorage?.get('previousAccountAddress')) ||
      this.root.formatAddress(this.root.previousAccount?.pair.address) ||
      '';
    const signerAccountPair = this.root.getAccountPair(signerAddress);

    const multisigAccount = this.getMstAccount(multisigAccountAddress);

    if (!multisigAccount) {
      throw new Error(`Multisig account with address ${multisigAccountAddress} not found.`);
    }

    const meta = multisigAccount.meta as any;
    if (!meta) {
      throw new Error(`Metadata for multisig account ${multisigAccountAddress} is missing.`);
    }
    const allSignatories = meta.who ? [...meta.who].map((address) => this.root.formatAddress(address)) : [];
    const formattedSignerAddress = this.root.formatAddress(signerAccountPair.address);

    const otherSignatories = allSignatories.filter((address) => address !== formattedSignerAddress);
    otherSignatories.sort();
    const threshold = meta.threshold;

    const info = await this.root.api.query.multisig.multisigs(multisigAccountAddress, callHash);
    if (info.isNone) {
      throw new Error('No pending multisig transaction found for the given callHash');
    }

    const { when, approvals } = info.unwrap();
    const maybeTimepoint = when;

    const numApprovals = approvals.length;
    const willReachThreshold = numApprovals + 1 >= threshold;

    if (willReachThreshold) {
      const blockNumber = when.height.toNumber();
      const extrinsicIndex = when.index.toNumber();
      const blockHash = await this.root.api.rpc.chain.getBlockHash(blockNumber);
      const signedBlock = await this.root.api.rpc.chain.getBlock(blockHash);
      const extrinsics = signedBlock.block.extrinsics;
      const extrinsic = extrinsics[extrinsicIndex];

      if (extrinsic.method.section === 'utility' && extrinsic.method.method === 'batch') {
        const calls = extrinsic.method.args[0] as any;

        let systemRemarkCall: any = null;

        for (const call of calls) {
          if (call.section === 'system' && call.method === 'remark') {
            systemRemarkCall = call;
            break;
          }
        }

        if (!systemRemarkCall) {
          throw new Error('No system.remark call found in the batch');
        }

        const callDataHex = systemRemarkCall.args[0].toString();

        const callData = this.root.api.registry.createType('Call', callDataHex);
        const computedCallHash = blake2AsHex(callData.toU8a());

        if (computedCallHash !== callHash) {
          throw new Error('Computed call hash does not match the provided callHash');
        }

        const callArgs = Array.from(callData.args);
        const dummyExtrinsic = this.root.api.tx[callData.section][callData.method].apply(null, callArgs);
        const paymentInfo = await dummyExtrinsic.paymentInfo(signerAddress);
        const callWeight = paymentInfo.weight;
        const callLength = callData.encodedLength;
        const callRefTime = callWeight.refTime.toBn();
        const callProofSize = callWeight.proofSize.toBn();
        const totalProofSize = callProofSize.addn(callLength);

        const adjustedRefTime = callRefTime.muln(110).divn(100);
        const adjustedProofSize = totalProofSize.muln(110).divn(100);

        const maxBlockWeights = this.root.api.consts.system.blockWeights;
        const maxBlockRefTime = maxBlockWeights.maxBlock.refTime.toBn();
        const maxBlockProofSize = maxBlockWeights.maxBlock.proofSize.toBn();

        const finalRefTime = BN.min(adjustedRefTime, maxBlockRefTime);
        const finalProofSize = BN.min(adjustedProofSize, maxBlockProofSize);

        const MAX_WEIGHT = this.root.api.registry.createType('WeightV2', {
          refTime: finalRefTime,
          proofSize: finalProofSize,
        });

        const asMultiExtrinsic = this.root.api.tx.multisig.asMulti(
          threshold,
          otherSignatories,
          maybeTimepoint,
          callData,
          MAX_WEIGHT
        );

        // TODO what if transaction failed

        await this.root.submitExtrinsic(asMultiExtrinsic, signerAccountPair);
        const existingHistoryItem = this.root.getHistory(callHash);
        if (existingHistoryItem) {
          existingHistoryItem.status = TransactionStatus.Finalized;
          if ('multisig' in existingHistoryItem && existingHistoryItem.multisig) {
            existingHistoryItem.multisig.numApprovals = existingHistoryItem.multisig.numApprovals + 1;
          }
          this.root.saveHistory(existingHistoryItem);
        } else {
          console.warn(`No history item found for callHash: ${callHash}`);
        }
      } else {
        throw new Error('Extrinsic at specified index is not utility.batch');
      }
    } else {
      const MAX_WEIGHT = this.root.api.registry.createType('Weight', { refTime: new BN('640000000'), proofSize: 0 });

      const approveExtrinsic = this.root.api.tx.multisig.approveAsMulti(
        threshold,
        otherSignatories,
        maybeTimepoint,
        callHash,
        MAX_WEIGHT
      );

      await this.root.submitExtrinsic(approveExtrinsic, signerAccountPair);
    }
  }

  public async startPendingTxsSubscription(mstAccount: string): Promise<void> {
    try {
      // Subscribe to new blocks
      const unsubscribe = await this.root.api.rpc.chain.subscribeNewHeads(async () => {
        try {
          const pendingTxs = await this.subscribeOnPendingTxs(mstAccount);

          // Update the last known pending transactions
          this.lastPendingTxs = pendingTxs || [];

          // Emit the new pending transactions
          this.pendingTxsSubject.next(this.lastPendingTxs);
        } catch (error) {
          console.error('Error checking pending MST transactions:', error);
        }
      });

      // Store the unsubscribe function
      this.pendingTxsSubscription = new Subscription(unsubscribe);
    } catch (error) {
      console.error('Error subscribing to new blocks:', error);
    }
  }
  public stopPendingTxsSubscription(): void {
    if (this.pendingTxsSubscription) {
      this.pendingTxsSubscription.unsubscribe();
      this.pendingTxsSubscription = null;
    }
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
          this.root.saveHistory(historyItem);
        }
      }

      const pendingTransactionIds = pendingTransactions.map((tx) => tx.id);
      for (const [id, transaction] of Object.entries(this.root.history)) {
        if ('multisig' in transaction && transaction.status === TransactionStatus.Pending) {
          if (!pendingTransactionIds.includes(id)) {
            transaction.status = TransactionStatus.Finalized;
            this.root.saveHistory(transaction);
          }
        }
      }

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
    multisigInfo: {
      threshold: number;
      signatories: string[];
      numApprovals: number;
      walletsApproved: string[];
    },
    deadlineTrx: {
      expirationBlock: number;
      blocksRemaining: number;
      secondsRemaining: number;
    },
    blockNumber: number,
    blockHash: string,
    blockTimestamp: number,
    mstAccount: string
  ): Promise<HistoryItem> {
    console.info('we are in parseCallDataToHistoryItem');
    const decodedCall = this.root.api.registry.createType('Call', callData);
    console.info('here is decondedCall', decodedCall);
    const method = decodedCall.method;
    console.info('here is method', method);
    const section = decodedCall.section;
    console.info('here is section', section);
    const args = decodedCall.args;
    console.info('here is args', args);
    let historyItem: HistoryItem = {
      id: '',
      from: this.root.formatAddress(mstAccount),
      type: Operation.Transfer,
      multisig: {
        threshold: multisigInfo.threshold,
        signatories: multisigInfo.signatories,
        numApprovals: multisigInfo.numApprovals,
        walletsApproved: multisigInfo.walletsApproved,
      },
      deadline: {
        expirationBlock: deadlineTrx.expirationBlock,
        blocksRemaining: deadlineTrx.blocksRemaining,
        secondsRemaining: deadlineTrx.secondsRemaining,
      },
      blockId: blockHash,
      blockHeight: blockNumber,
      startTime: blockTimestamp,
    };

    const operationKey = `${section}.${method}`;
    const operationMap: { [key: string]: Operation } = {
      'assets.transfer': Operation.Transfer,
      'assets.register': Operation.RegisterAsset,
      'liquidityProxy.swap': Operation.Swap,
      'poolXYK.depositLiquidity': Operation.AddLiquidity,
    };

    historyItem.type = operationMap[operationKey];

    switch (historyItem.type) {
      case Operation.Transfer:
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

        const recipientAddress = this.root.formatAddress(args[1].toString());
        historyItem.to = recipientAddress;

        const amountRaw = args[2].toString();
        const assetInfo = await this.root.assets.getAssetInfo(assetAddress);
        const decimals = assetInfo?.decimals ?? this.root.chainDecimals;
        historyItem.amount = new FPNumber(amountRaw, this.root.chainDecimals)
          .div(new FPNumber(10 ** decimals, this.root.chainDecimals))
          .toString();

        historyItem.symbol = assetInfo?.symbol;
        historyItem.decimals = decimals;

        break;
      case Operation.Swap:
        const inputAssetId = args[1].toString();
        const outputAssetId = args[2].toString();
        const swapAmount = args[3] as SwapAmount;

        historyItem.assetAddress = inputAssetId;
        historyItem.asset2Address = outputAssetId;

        if (swapAmount.isWithDesiredInput) {
          const amount = swapAmount.asWithDesiredInput!.desiredAmountIn.toString();
          historyItem.amount = new FPNumber(amount, this.root.chainDecimals).toString();
        } else if (swapAmount.isWithDesiredOutput) {
          const amount = swapAmount.asWithDesiredOutput!.desiredAmountOut.toString();
          historyItem.amount2 = new FPNumber(amount, this.root.chainDecimals).toString();
        }

        const inputAssetInfo = await this.root.assets.getAssetInfo(inputAssetId);
        const outputAssetInfo = await this.root.assets.getAssetInfo(outputAssetId);

        historyItem.symbol = inputAssetInfo?.symbol;
        historyItem.symbol2 = outputAssetInfo?.symbol;
        historyItem.decimals = inputAssetInfo?.decimals ?? this.root.chainDecimals;
        historyItem.decimals2 = outputAssetInfo?.decimals ?? this.root.chainDecimals;
        break;

      case Operation.AddLiquidity:
        const assetAId = args[1].toString();
        const assetBId = args[2].toString();
        const amountA = new FPNumber(args[3].toString(), this.root.chainDecimals).toString();
        const amountB = new FPNumber(args[4].toString(), this.root.chainDecimals).toString();

        const assetAInfo = await this.root.assets.getAssetInfo(assetAId);
        const assetBInfo = await this.root.assets.getAssetInfo(assetBId);

        historyItem.assetAddress = assetAId;
        historyItem.asset2Address = assetBId;
        historyItem.amount = amountA;
        historyItem.amount2 = amountB;

        historyItem.symbol = assetAInfo?.symbol;
        historyItem.symbol2 = assetBInfo?.symbol;
        historyItem.decimals = assetAInfo?.decimals ?? this.root.chainDecimals;
        historyItem.decimals2 = assetBInfo?.decimals ?? this.root.chainDecimals;

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
    const { when, approvals } = info;
    const blockNumber = when.height.toNumber();
    const extrinsicIndex = when.index.toNumber();
    const blockHash = await this.root.api.rpc.chain.getBlockHash(blockNumber);
    const signedBlock = await this.root.api.rpc.chain.getBlock(blockHash);
    const extrinsics = signedBlock.block.extrinsics;

    const extrinsic = extrinsics[extrinsicIndex];

    const fullExtrinsicHash = blake2AsHex(extrinsic.toU8a());
    const historyEntries = Object.entries(this.root.history);

    for (const [id] of historyEntries) {
      if (id === fullExtrinsicHash) {
        this.root.removeHistory(id);
        break;
      }
    }

    if (extrinsic.method.section === 'utility' && extrinsic.method.method === 'batch') {
      const calls = extrinsic.method.args[0] as any;
      let systemRemarkCall: any = null;
      let asMultiCall: any = null;

      for (const call of calls) {
        if (call.section === 'system' && call.method === 'remark') {
          systemRemarkCall = call;
        } else if (call.section === 'multisig' && call.method === 'asMulti') {
          asMultiCall = call;
        }
      }
      if (!asMultiCall) {
        console.warn('No multisig.asMulti call found in the batch');
        return null;
      }

      if (!systemRemarkCall) {
        console.warn('No system.remark call found in the batch');
        return null;
      }

      const callDataHex = systemRemarkCall.args[0].toString();
      const callData = this.root.api.registry.createType('Call', callDataHex);

      const threshold = Number(asMultiCall.args[0].toString());
      const otherSignatories = asMultiCall.args[1].toHuman() as string[];
      const signerAddress = extrinsic.signer.toString();
      const allSignatories = [signerAddress, ...otherSignatories].map((s) => this.root.formatAddress(s));

      const approvalsArray = approvals.toHuman() as string[];
      const numApprovals = approvalsArray.length;

      const multisigInfoExtended = {
        threshold: threshold,
        signatories: allSignatories,
        walletsApproved: approvalsArray.map((s) => this.root.formatAddress(s)),
        numApprovals: numApprovals,
      };

      const multisigAccount = this.getMstAccount(this.root.formatAddress(mstAccount));
      if (!multisigAccount) {
        throw new Error(`Multisig account with address ${mstAccount} not found.`);
      }

      const meta = multisigAccount.meta as any;
      if (!meta) {
        throw new Error(`Metadata for multisig account ${mstAccount} is missing.`);
      }

      const deadlineInBlocks = meta.deadlineInBlocks as number;
      if (!deadlineInBlocks) {
        throw new Error(`Deadline is not set in the metadata of the multisig account ${mstAccount}.`);
      }
      const creationBlockNumber = when.height.toNumber();
      const expirationBlockNumber = creationBlockNumber + deadlineInBlocks;

      const currentHeader = await this.root.api.rpc.chain.getHeader();
      const currentBlockNumber = currentHeader.number.toNumber();

      const blocksUntilExpiration = expirationBlockNumber - currentBlockNumber;

      if (blocksUntilExpiration <= 0) {
        return null;
      }
      const blockTimeInSeconds = 6;
      const secondsUntilExpiration = blocksUntilExpiration * blockTimeInSeconds;

      const deadlineTrx = {
        expirationBlock: expirationBlockNumber,
        blocksRemaining: blocksUntilExpiration,
        secondsRemaining: secondsUntilExpiration,
      };

      const blockTimestamp = await this.getBlockTimestamp(blockHash);
      const historyItem = await this.parseCallDataToHistoryItem(
        callData,
        multisigInfoExtended,
        deadlineTrx,
        blockNumber,
        blockHash.toHex(),
        blockTimestamp,
        mstAccount
      );

      historyItem.id = callHash;
      historyItem.txId = callHash;
      historyItem.status = TransactionStatus.Pending;

      return historyItem;
    } else {
      console.warn('Extrinsic at specified index is not utility.batch');
      return null;
    }
  }

  private async getBlockTimestamp(blockHash: any): Promise<number> {
    const atApi = await this.root.api.at(blockHash);
    const timestamp = await atApi.query.timestamp.now();
    return Number(timestamp.toBigInt());
  }
}
