import { BtcRpcOpts, RpcResponse, RpcRequest } from './Models';
import { dHttp } from './dHttp';
import { IRpcClient } from './IRpcClient';

let rpcCount = 0;  // global used to prevent duplicates

/**
 * RPC Client
 */
export class BtcRpcClient implements IRpcClient {
    public auth: string;
    public url: string;

    constructor(opts: BtcRpcOpts) {
        const { pwd, user, endpoint, walletId } = opts;
        if (!endpoint) throw new TypeError('Expected RPC opts.url, got ' + endpoint);
        if (undefined === pwd) throw new Error('pwd error');
        if (undefined === user) throw new Error('user error');
        if (undefined !== walletId) this.url = `${endpoint}/wallet/${walletId}`;
        else this.url = `${endpoint}`;
        this.auth = 'Basic ' + Buffer.from(`${user}:${pwd}`, 'utf8').toString('base64');
    }

    public async call(method: string, params: any[], id?: string): Promise<RpcResponse> {
        const req = new RpcRequest();
        req.auth = this.auth;
        req.body = JSON.stringify({ id: undefined === id ? `${rpcCount}` : id, method, params });
        req.method = 'POST';
        req.url = this.url;
        rpcCount = (rpcCount + 1) | 0;  // overflows at UINT32
        return await dHttp(req);
    }
}
