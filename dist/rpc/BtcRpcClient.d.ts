import { BtcRpcOpts, RpcResponse } from './Models';
import { IRpcClient } from './IRpcClient';
/**
 * RPC Client
 */
export declare class BtcRpcClient implements IRpcClient {
    auth: string;
    url: string;
    constructor(opts: BtcRpcOpts);
    call(method: string, params: any[], id?: string): Promise<RpcResponse>;
}
