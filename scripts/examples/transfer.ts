import { api, FPNumber, TransactionStatus } from '@sora-substrate/util';
import { XOR } from '@sora-substrate/util/assets/consts';

import { delay, withConnectedAccount } from './util';

async function waitTxFinalizationOrError(): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const historyItem = Object.values(api.history)[0];
  if ([TransactionStatus.Error, TransactionStatus.Finalized].includes(historyItem.status as any)) {
    return;
  }
  await delay();
}

async function main(): Promise<void> {
  // 1. Connection
  await withConnectedAccount(async () => {
    // 2. Get balance
    const xor = await api.assets.getAccountAsset(XOR.address);
    const xorBalance = FPNumber.fromCodecValue(xor.balance.transferable).toString();
    console.log('XOR balance', xorBalance);
    // 3. Make transfer
    await api.transfer(xor, 'SOME_ADDRESS', 1);
    await waitTxFinalizationOrError();
    // 4. Check TX details
    const historyItem = Object.values(api.history)[0];
    console.log('TX hash', historyItem.txId);
  });
}

main()
  .catch(console.error)
  .finally(() => process.exit());
