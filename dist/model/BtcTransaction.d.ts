import { IRpcContext } from '../rpc';
export declare class BtcTransDetails {
    address: string;
    category: string;
    amount: number;
    label: string;
    vout: number;
    fee: number;
    abandoned: number;
}
export declare class BtcTransaction implements IRpcContext {
    amount: number;
    fee: number;
    confirmations: number;
    blockhash: string;
    blockindex: number;
    blocktime: number;
    txid: string;
    time: number;
    timereceived: number;
    details: BtcTransDetails[];
    hex: string;
}
