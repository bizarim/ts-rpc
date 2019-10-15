export declare class BtcRpcOpts {
    user?: string;
    pwd?: string;
    endpoint?: string;
    walletId?: string;
}
export declare class EthRpcOpts {
    endpoint?: string;
    ws?: string;
}
export declare class RpcRequest {
    url: string;
    method: string;
    body: string;
    auth: string;
    timeout: number;
}
export declare class RpcResponse {
    error: RpcError | object | undefined;
    context: RpcContext | undefined;
}
export declare class RpcError {
    code: number;
    message: string;
}
export interface IRpcContext {
}
export declare class RpcContext implements IRpcContext {
    error: RpcError | object | undefined;
    id: string;
    jsonrpc: string;
    result: undefined | string | boolean | object;
}
