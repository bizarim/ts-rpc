import { RpcResponse, EthRpcOpts } from './Models';
import { IRpcClient } from './IRpcClient';
/**
 * RPC Client
 */
export declare class EthRpcClinet implements IRpcClient {
    auth: string;
    url: string;
    constructor(opts: EthRpcOpts);
    call(method: string, params: any[], id?: string): Promise<RpcResponse>;
}
