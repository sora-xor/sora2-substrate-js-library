import { api, FPNumber } from '@sora-substrate/util';
import { XOR } from '@sora-substrate/util/assets/consts';

import { delay, withConnectedAccount } from './util';

async function main(): Promise<void> {
  await withConnectedAccount(async () => {
    // SWAP TX
    const accountId = api.formatAddress(api.account.pair.address);
    const ethAccountId = '0xF5615e51D00f0a3Dd50C302Ee85DDca627B9885a'; // Account with ETH on Mordor network
    console.log('SORA account ID', accountId);
    console.log('ETH account ID', ethAccountId);
    console.log('Network fee', FPNumber.fromCodecValue(await api.evm.getNetworkFee()).toLocaleString());

    const hashes = await api.evm.getUserTxHashes();
    console.log(hashes);
    console.log('LENGTH = ', hashes.length);

    let detailsSub;

    const subOnHashes = api.evm.subscribeOnUserTxHashes().subscribe((items) => {
      console.log('UPD', items);
      console.log('NEW LENGTH', items.length);
      if (items.length > hashes.length) {
        detailsSub = api.evm.subscribeOnTxDetails(items[0]).subscribe((items) => {
          console.log('TX DETAILS', items);
        });
        // detailsSub = api.evm.subscribeOnTxsDetails([items[0], items[1]]).subscribe(items => {
        //   console.log('DETAILS', items);
        // });
      }
    });

    await api.evm.burn(XOR, ethAccountId, '1');

    await delay(40000);

    console.log('HISTORY', api.evm.history);

    await delay(50000000);

    subOnHashes.unsubscribe();
    detailsSub.unsubscribe();
  });
}

main()
  .catch(console.error)
  .finally(() => process.exit());
