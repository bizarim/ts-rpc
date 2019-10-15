"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Models_1 = require("./Models");
const dHttp_1 = require("./dHttp");
let rpcCount = 0; // global used to prevent duplicates
/**
 * RPC Client
 */
class BtcRpcClient {
    constructor(opts) {
        const { pwd, user, endpoint, walletId } = opts;
        if (!endpoint)
            throw new TypeError('Expected RPC opts.url, got ' + endpoint);
        if (undefined === pwd)
            throw new Error('pwd error');
        if (undefined === user)
            throw new Error('user error');
        if (undefined !== walletId)
            this.url = `${endpoint}/wallet/${walletId}`;
        else
            this.url = `${endpoint}`;
        this.auth = 'Basic ' + Buffer.from(`${user}:${pwd}`, 'utf8').toString('base64');
    }
    call(method, params, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const req = new Models_1.RpcRequest();
            req.auth = this.auth;
            req.body = JSON.stringify({ id: undefined === id ? `${rpcCount}` : id, method, params });
            req.method = 'POST';
            req.url = this.url;
            rpcCount = (rpcCount + 1) | 0; // overflows at UINT32
            return yield dHttp_1.dHttp(req);
        });
    }
}
exports.BtcRpcClient = BtcRpcClient;
//# sourceMappingURL=BtcRpcClient.js.map