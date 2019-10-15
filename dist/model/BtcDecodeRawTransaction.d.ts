import { IRpcContext } from '..';
export declare class BtcVInput {
    txid: string;
    vout: number;
    scriptSig: {
        asm: string;
        hex: string;
    };
    txinwitness: string[];
    sequence: number;
}
export declare class BtcVOutput {
    value: number;
    n: number;
    scriptPubKey: {
        asm: string;
        hex: string;
        reqSigs: number;
        type: string;
        addresses: string[];
    };
}
export declare class BtcDecodeRawTransaction implements IRpcContext {
    txid: string;
    hash: string;
    size: number;
    vsize: number;
    weight: number;
    version: number;
    locktime: number;
    vin: BtcVInput[];
    vout: BtcVOutput[];
}
