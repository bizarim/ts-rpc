import * as fs from 'fs';
import { BtcRpcClient } from '../../src/rpc/BtcRpcClient';
import { BtcRpcOpts, RpcResponse } from '../../src/rpc/Models';

let user = 'abc';
let pwd = 'qwe123';
let endpoint = 'http://127.0.0.1:18443';

export function initBtcRpc(strConfig?: string): void {

    if (undefined !== strConfig) {
        const opts: BtcRpcOpts = JSON.parse(strConfig) as BtcRpcOpts;
        if (undefined !== opts.user) user = opts.user;
        if (undefined !== opts.pwd) pwd = opts.pwd;
        if (undefined !== opts.endpoint) endpoint = opts.endpoint;
    }
}

/**
 * 최근 10개 트랜잭션 조회
 * @param walletId 주소에 사용됨
 */
export async function btcCallListTransactions(walletId: string): Promise<RpcResponse> {
    const rpc = new BtcRpcClient({ user: user, pwd: pwd, endpoint: endpoint, walletId: walletId });
    return await rpc.call('listtransactions', []);
}

/**
 * 잔액 조회
 * @param walletId 주소에 사용됨
 */
export async function callBalance(walletId: string): Promise<RpcResponse> {
    const rpc = new BtcRpcClient({ user: user, pwd: pwd, endpoint: endpoint, walletId: walletId });
    return await rpc.call('getbalance', []);
}

/**
 * 확인 되지 않는 잔액 조회
 * @param walletId 주소에 사용됨
 */
export async function callUnconfirmBalance(walletId: string): Promise<RpcResponse> {
    const rpc = new BtcRpcClient({ user: user, pwd: pwd, endpoint: endpoint, walletId: walletId });
    return await rpc.call('getunconfirmedbalance', []);
}

/**
 * 소모 가능한 잔액 리스트
 * @param walletId 주소에 사용됨
 */
export async function callListUnspent(walletId: string): Promise<RpcResponse> {
    const rpc = new BtcRpcClient({ user: user, pwd: pwd, endpoint: endpoint, walletId: walletId });
    return await rpc.call('listunspent', []);
}

/**
 * 지갑 생성 (Multi Wallet)
 * @param walletId params에 사용됨
 */
export async function callCreateWallet(walletId: string): Promise<RpcResponse> {
    // 3. 지갑 생성
    const rpc = new BtcRpcClient({ user: user, pwd: pwd, endpoint: endpoint });
    return await rpc.call('createwallet', [walletId]);
}

/**
 * 새주소 생성
 * @param walletId 주소에 사용됨
 */
export async function callGetNewAddress(walletId: string): Promise<RpcResponse> {
    const rpc = new BtcRpcClient({ user: user, pwd: pwd, endpoint: endpoint, walletId: walletId });
    return await rpc.call('getnewaddress', []);
}

/**
 * 트랜잭션 조회
 * @param walletId 주소에 사용됨
 * @param transId params에 사용됨
 */
export async function callGetTransaction(walletId: string, transId: string): Promise<RpcResponse> {
    const rpc = new BtcRpcClient({ user: user, pwd: pwd, endpoint: endpoint, walletId: walletId });
    return await rpc.call('gettransaction', [transId]);
}

/**
 * 출금
 * @param walletId 주소에 사용됨
 * @param toAddress 목적지 주소
 * @param amount 수량
 */
export async function callSendToAddress(walletId: string, toAddress: string, amount: number): Promise<RpcResponse> {
    const rpc = new BtcRpcClient({ user: user, pwd: pwd, endpoint: endpoint, walletId: walletId });
    return await rpc.call('sendtoaddress', [toAddress, amount]);
}

/**
 * 로컬 테스트에서만 가능 마이닝
 * @param walletId 주소에 사용됨
 */
export async function callGenerate(walletId: string): Promise<RpcResponse> {
    const rpc = new BtcRpcClient({ user: user, pwd: pwd, endpoint: endpoint, walletId: walletId });
    return await rpc.call('generate', [1]);
}

/**
 * 블럭정보 얻어오기
 * @param blockHash params에 사용됨
 */
export async function callGetBlock(blockHash: string): Promise<RpcResponse> {
    const rpc = new BtcRpcClient({ user: user, pwd: pwd, endpoint: endpoint });
    return await rpc.call('getblock', [blockHash]);
}

