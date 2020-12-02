import { AssetId, BasisPoints } from '@sora-substrate/types/interfaces';

export interface DEXInfoDerived {
    base_asset_id: AssetId;
    default_fee: BasisPoints;
    default_protocol_fee: BasisPoints;
}