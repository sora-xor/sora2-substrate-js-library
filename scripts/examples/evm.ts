import { api } from '@sora-substrate/util';
import { XOR } from '@sora-substrate/util/assets/consts';
import { EvmNetwork } from '@sora-substrate/util/evm/consts';

import { delay, withConnectedAccount } from './util';

async function main(): Promise<void> {
  await withConnectedAccount(async () => {
    api.evm.externalNetwork = EvmNetwork.Mordor;
    // SWAP TX
    const accountId = api.formatAddress(api.account.pair.address);
    const ethAccountId = '0xF5615e51D00f0a3Dd50C302Ee85DDca627B9885a'; // Account with ETH on Mordor network
    console.log('SORA account ID', accountId);
    console.log('ETH account ID', ethAccountId);

    const hashes = await api.evm.getUserTxHashes(api.evm.externalNetwork);
    console.log(hashes);
    console.log('LENGTH = ', hashes.length);

    let detailsSub;

    const subOnHashes = api.evm.subscribeOnUserTxHashes(api.evm.externalNetwork).subscribe((items) => {
      console.log('UPD', items);
      console.log('NEW LENGTH', items.length);
      if (items.length > hashes.length) {
        detailsSub = api.evm.subscribeOnTxDetails(api.evm.externalNetwork, items[0]).subscribe((items) => {
          console.log('TX DETAILS', items);
        });
        // detailsSub = api.evm.subscribeOnTxsDetails(api.evm.externalNetwork, [items[0], items[1]]).subscribe(items => {
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
