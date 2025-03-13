import { api } from '@sora-substrate/sdk';

import { delay, withConnectedAccount } from './util';
import { Country } from '@sora-substrate/sdk/presto/types';
import { Role } from '@sora-substrate/sdk/presto/consts';

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
    console.info('result', cropReceipts);

    await api.presto.createDepositRequest('1', 'invoice 1234', 'important details to know fiat reference');

    const requests = await api.presto.getRequests('cnVkoGs3rEMqLqY27c2nfVXJRGdzNJk2ns78DcqtppaSRe8qm');
    console.info('requests', requests);

    await api.presto.assignRole(Role.Investor, 'cnUaaC2q8z1SFkZcPNDQ38maLVFhuNeuZeFQnUCRLEM8FvMs4');
    await delay(1000);

    const role = await api.presto.getRole('cnUaaC2q8z1SFkZcPNDQ38maLVFhuNeuZeFQnUCRLEM8FvMs4');
    console.info('role', role);

    await delay(100000);
  });
}

main()
  .catch(console.error)
  .finally(() => process.exit());
