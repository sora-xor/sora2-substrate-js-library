import { api } from '@sora-substrate/sdk';

import { delay, withConnectedAccount } from './util';
import { Country } from '@sora-substrate/sdk/presto/types';

async function main(): Promise<void> {
  await withConnectedAccount(async () => {
    await api.presto.createCropReceipt(
      '1',
      3,
      Country.BR,
      1740048517,
      1740048517,
      'Place of issuer',
      'Debitor and some important information',
      'Creditor and some important information',
      1733291615,
      'Terms and agreements'
    );

    const cropReceipts = await api.presto.getCropReceipts('cnVkoGs3rEMqLqY27c2nfVXJRGdzNJk2ns78DcqtppaSRe8qm');
    console.log('result', cropReceipts);

    await api.presto.createDepositRequest('1', 'invoice 1234', 'important details to know fiat reference');

    const requests = await api.presto.getRequests('cnVkoGs3rEMqLqY27c2nfVXJRGdzNJk2ns78DcqtppaSRe8qm');
    console.log('requests', requests);

    await delay(100000);
  });
}

main()
  .catch(console.error)
  .finally(() => process.exit());
