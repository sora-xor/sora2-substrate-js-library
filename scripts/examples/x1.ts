import { FPNumber, api } from '@sora-substrate/util';
import { connection } from '@sora-substrate/connection';
import { DAI, XOR } from '@sora-substrate/util/assets/consts';
import { map } from 'rxjs';
import { formatBalance } from '@sora-substrate/util/assets';
import { delay } from './util';

const YOUR_MNEMONIC_HERE = '';
const NODE = 'wss://mof2.sora.org';
const X1_ADDRESS = '';
const LIMIT_IN_DOLLAR_STRING = '2000';

async function main(): Promise<void> {
  const LIMIT = new FPNumber(LIMIT_IN_DOLLAR_STRING);
  let yourXorBalance = FPNumber.ZERO;

  await connection.open(NODE);
  await api.initialize(true);
  await api.calcStaticNetworkFees();
  api.importAccount(YOUR_MNEMONIC_HERE, 'name', 'pass');

  const TRANSFER_FEE = FPNumber.fromCodecValue(api.NetworkFee.Transfer);

  api.assets.getAssetBalanceObservable(XOR).subscribe((balance) => {
    yourXorBalance = FPNumber.fromCodecValue(balance.transferable);
  });

  api.apiRx.query.system
    .account(X1_ADDRESS)
    .pipe(map((result) => formatBalance(result[0].data, XOR.decimals)))
    .subscribe(async (x1XorBalance) => {
      const x1XorBalanceFp = FPNumber.fromCodecValue(x1XorBalance.transferable);
      const x1BalanceInDaiCodec = await api.swap.getResultRpc(XOR.address, DAI.address, x1XorBalanceFp.toString());
      const x1BalanceInDai = FPNumber.fromCodecValue(x1BalanceInDaiCodec.amount);
      if (FPNumber.lt(x1BalanceInDai, LIMIT)) {
        // LESS THAN LIMIT
        const howMuchShouldYouSend = await api.swap.getResultRpc(
          XOR.address,
          DAI.address,
          LIMIT_IN_DOLLAR_STRING,
          true
        );
        const howMuchShouldYouSendFp = FPNumber.fromCodecValue(howMuchShouldYouSend.amount);
        const howMuchShouldYouHave = howMuchShouldYouSendFp.add(TRANSFER_FEE);

        if (FPNumber.lt(yourXorBalance, howMuchShouldYouHave)) {
          throw 'You do not have enough balance to transfer';
        } else {
          await api.transfer(XOR, X1_ADDRESS, howMuchShouldYouSendFp.toString());
          console.info('X1 should receive funds');
          await new Promise((resolve) => setTimeout(resolve, 20_000)); // wait 20 seconds
        }
      }
    });
}

main()
  .catch(console.error)
  .finally(async () => {
    api.logout();
    await connection.close();
    process.exit();
  });
