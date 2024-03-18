import { FPNumber, api } from '@sora-substrate/util';
import { VAL } from '@sora-substrate/util/assets/consts';
import { withConnectedAccount } from './util';

async function main(): Promise<void> {
  await withConnectedAccount(async () => {
    const SwapTransferBatchData = [
      {
        outcomeAssetId: '0x0200040000000000000000000000000000000000000000000000000000000000',
        receivers: [
          {
            accountId: '5CDfwaL7sUuZxH2ukNz89PXecgwzBSdgahXn9GgfGQR35ien',
            targetAmount: FPNumber.ONE,
          },
          {
            accountId: '5Cha9pZrw8PzyGFcVKFZs4E9w4TM6F1x1sedvms2Uxscx8Sx',
            targetAmount: FPNumber.ONE,
          },
          {
            accountId: '5Cha9pZrw8PzyGFcVKFZs4E9w4TM6F1x1sedvms2Uxscx8Sx',
            targetAmount: FPNumber.ONE,
          },
        ],
        dexId: 0,
        outcomeAssetReuse: FPNumber.ZERO,
      },
      {
        outcomeAssetId: '0x0200080000000000000000000000000000000000000000000000000000000000',
        receivers: [
          {
            accountId: '5Cha9pZrw8PzyGFcVKFZs4E9w4TM6F1x1sedvms2Uxscx8Sx',
            targetAmount: FPNumber.ONE,
          },
        ],
        dexId: 0,
        outcomeAssetReuse: FPNumber.ZERO,
      },
      {
        outcomeAssetId: '0x0200000000000000000000000000000000000000000000000000000000000000',
        receivers: [
          {
            accountId: '5CDfwaL7sUuZxH2ukNz89PXecgwzBSdgahXn9GgfGQR35ien',
            targetAmount: FPNumber.ONE,
          },
        ],
        dexId: 0,
        outcomeAssetReuse: FPNumber.fromCodecValue('1002500000000000000'),
      },
    ];

    const maxInputAmount = FPNumber.fromCodecValue('3060019612559079462');

    api.swap.executeSwapTransferBatch(SwapTransferBatchData, VAL, maxInputAmount);
  });
}

main()
  .catch(console.error)
  .finally(() => process.exit());
