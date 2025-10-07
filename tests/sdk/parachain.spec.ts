import { FPNumber } from '@sora-substrate/math';
import { SoraParachainApi } from '@sora-substrate/sdk/bridgeProxy/sub/parachain';

import type { ApiPromise } from '@polkadot/api';
import type { XcmV3MultiLocation } from '@polkadot/types/lookup';

const createOption = <T>(value?: T) => ({
  isSome: value !== undefined,
  unwrap: jest.fn(() => {
    if (value === undefined) {
      throw new Error('unwrap called on None');
    }
    return value;
  }),
});

const createApi = () => {
  const query = {
    parachainInfo: {
      parachainId: jest.fn(),
    },
    parachainSystem: {
      lastRelayChainBlockNumber: jest.fn(),
    },
    xcmApp: {
      assetIdToMultilocation: jest.fn(),
      assetMinimumAmount: jest.fn(),
    },
  };

  const tx = {
    xcmApp: {
      sendXorToMainnet: jest.fn(),
    },
  };

  const createType = jest.fn();
  const apiAt = jest.fn();

  const api = {
    at: apiAt,
    createType,
    query,
    tx,
  } as unknown as ApiPromise;

  apiAt.mockImplementation(async () => ({
    query: {
      parachainSystem: {
        lastRelayChainBlockNumber: query.parachainSystem.lastRelayChainBlockNumber,
      },
    },
  }));

  return { api, query, tx, createType, apiAt };
};

describe('SoraParachainApi', () => {
  const parachainApi = new SoraParachainApi();

  it('returns the parachain id as a number', async () => {
    const { api, query } = createApi();
    query.parachainInfo.parachainId.mockResolvedValue({
      toNumber: () => 2012,
    });

    const result = await parachainApi.getParachainId(api);

    expect(query.parachainInfo.parachainId).toHaveBeenCalledTimes(1);
    expect(result).toBe(2012);
  });

  it('resolves the relay chain block number at a given block hash', async () => {
    const { api, query, apiAt } = createApi();
    const blockHash = '0x1234';

    query.parachainSystem.lastRelayChainBlockNumber.mockResolvedValue({
      toNumber: () => 42,
    });

    const result = await parachainApi.getRelayChainBlockNumber(blockHash, api);

    expect(apiAt).toHaveBeenCalledWith(blockHash);
    expect(query.parachainSystem.lastRelayChainBlockNumber).toHaveBeenCalledTimes(1);
    expect(result).toBe(42);
  });

  it('returns null when an asset has no registered multilocation', async () => {
    const { api, query } = createApi();
    const option = createOption<XcmV3MultiLocation>();

    query.xcmApp.assetIdToMultilocation.mockResolvedValue(option);

    const result = await parachainApi.getAssetMulilocation('ASSET', api);

    expect(query.xcmApp.assetIdToMultilocation).toHaveBeenCalledWith('ASSET');
    expect(option.unwrap).not.toHaveBeenCalled();
    expect(result).toBeNull();
  });

  it('returns the multilocation when present', async () => {
    const { api, query } = createApi();
    const multilocation = { foo: 'bar' } as unknown as XcmV3MultiLocation;
    const option = createOption(multilocation);

    query.xcmApp.assetIdToMultilocation.mockResolvedValue(option);

    const result = await parachainApi.getAssetMulilocation('ASSET', api);

    expect(option.unwrap).toHaveBeenCalledTimes(1);
    expect(result).toBe(multilocation);
  });

  it('returns zero minimum amount when no multilocation exists', async () => {
    const { api, query } = createApi();
    query.xcmApp.assetIdToMultilocation.mockResolvedValue(createOption<XcmV3MultiLocation>());

    const result = await parachainApi.getAssetMinimumAmount('ASSET', api);

    expect(query.xcmApp.assetMinimumAmount).not.toHaveBeenCalled();
    expect(result).toBe('0');
  });

  it('returns the configured minimum amount for a multilocated asset', async () => {
    const { api, query } = createApi();
    const multilocation = { some: 'value' } as unknown as XcmV3MultiLocation;

    query.xcmApp.assetIdToMultilocation.mockResolvedValue(createOption(multilocation));
    query.xcmApp.assetMinimumAmount.mockResolvedValue(
      createOption({
        toString: () => '5000',
      })
    );

    const result = await parachainApi.getAssetMinimumAmount('ASSET', api);

    expect(query.xcmApp.assetMinimumAmount).toHaveBeenCalledWith(multilocation);
    expect(result).toBe('5000');
  });

  it('builds the transfer extrinsic using account and fp number conversion', () => {
    const { api, tx, createType } = createApi();
    const asset = { decimals: 18 } as unknown as { decimals: number };
    const recipient = 'recipient-address';
    const amount = '12.34';
    const expectedValue = new FPNumber(amount, asset.decimals).toCodecString();

    createType.mockReturnValue('encoded-account');
    tx.xcmApp.sendXorToMainnet.mockReturnValue('extrinsic');

    const extrinsic = parachainApi.getTransferExtrinsic(asset as never, recipient, amount, api);

    expect(createType).toHaveBeenCalledWith('AccountId32', recipient);
    expect(tx.xcmApp.sendXorToMainnet).toHaveBeenCalledWith('encoded-account', expectedValue);
    expect(extrinsic).toBe('extrinsic');
  });
});
