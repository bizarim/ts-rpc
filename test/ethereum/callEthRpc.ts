import * as fs from 'fs';
import { EthRpcClinet } from '../../src/rpc/EthRpcClinet';
import { BtcRpcOpts, RpcResponse, EthRpcOpts } from '../../src/rpc/Models';
import { eEthBlockOpts, eEthValue } from '../../src/enums/Wallet';
import { UInt64, Int64 } from '../../src/utill/Int64';


let endpoint = 'http://127.0.0.1:18443';

export function initEthRpc(strConfig?: string): void {

    if (undefined !== strConfig) {
        const opts: EthRpcOpts = JSON.parse(strConfig) as EthRpcOpts;
        if (undefined !== opts.endpoint) endpoint = opts.endpoint;
    }
}

/**
 * 블럭넘버 얻어오기
 */
export async function callGetBlockByNumber(): Promise<RpcResponse> {

    const rpc = new EthRpcClinet({ endpoint: endpoint });
    return await rpc.call('eth_getBlockByNumber', ['latest', true]);
}

/**
 * 주소 생성
 * @param passphrase 암호
 */
export async function callNewAccount(passphrase: string): Promise<RpcResponse> {
    // personal_newAccount
    // {"method": "personal_newAccount", "params": [string]}
    const rpc = new EthRpcClinet({ endpoint: endpoint });
    return await rpc.call('personal_newAccount', [passphrase]);
}

export async function callUnlockAccount(address: string, passphrase: string): Promise<RpcResponse> {
    // personal_unlockAccount
    // {"method": "personal_unlockAccount", "params": [string, string, number]}
    // {
    //     "method":"personal_unlockAccount",
    //     "params": ["0xddb990fe7fa6320947ae6068f2337fcf1a7d5659","123"],
    //     "id":100
    // }
    const rpc = new EthRpcClinet({ endpoint: endpoint });
    return await rpc.call('personal_unlockAccount', [address, passphrase, 30]);
}

export class Payload {
    from: string;
    to: string;
    gas: string;
    gasPrice: string;
    value: string;
}


export async function callSendTransaction(from: string, to: string, value: number, gas: number, gasPrice: number = 21000): Promise<RpcResponse> {
    const payload: Payload = {
        from: from,
        to: to,
        gas: new UInt64(gas).toString(16),
        gasPrice: new UInt64(gasPrice).toString(16),
        value: new Int64((value * eEthValue.ether)).toString(16)
    };

    console.log(payload);
    // eth_sendTransaction
    // {"method": "eth_sendTransaction", "params": [tx]}
    // eth_sendTransaction
    // {
    //     "method":"eth_sendTransaction",
    //     "params": [{
    // 		"from": "0xddb990fe7fa6320947ae6068f2337fcf1a7d5659",
    // 		"to": "0x1937a45636ce9199ce0d5b3c09dfc7a6ec0b8354",
    // 		"gas": "0x76c0",
    // 		"gasPrice": "0x9184e72a000",
    // 		"value": "0x9184e72a",
    // 		"data": "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675"
    // 	}],
    //     "id":100
    // }
    const rpc = new EthRpcClinet({ endpoint: endpoint });
    return await rpc.call('eth_sendTransaction', [payload]);
}

export async function callGetTransactionReceipt(transId: string): Promise<RpcResponse> {
    // eth_getTransactionReceipt
    // {"method": "eth_getTransactionReceipt", "params": ['0xff9e707340d5323805764af6763decf4e5787548cb7b50bffb724ded6c0aead3']}
    const rpc = new EthRpcClinet({ endpoint: endpoint });
    return await rpc.call('eth_getTransactionReceipt', [transId]);
}

export async function callGetBloc(blockhash: string): Promise<RpcResponse> {
    // eth_getBlockByHash
    // { 'method';: 'eth_getBlockByHash', 'params'; : ['0xac63095b7fa7bfab28ebd5fe3e20911b67642ea8e6a3c73ace71dbe8c46b5ead', true] }
    const rpc = new EthRpcClinet({ endpoint: endpoint });
    return await rpc.call('eth_getBlockByHash', [blockhash]);
}

export async function callGetBalance(address: string, ebo: eEthBlockOpts = eEthBlockOpts.latest): Promise<RpcResponse> {
    // eth_getBalance
    // {"method":"eth_getBalance","params":["0x1937a45636ce9199ce0d5b3c09dfc7a6ec0b8354", "latest"] }
    const rpc = new EthRpcClinet({ endpoint: endpoint });
    return await rpc.call('eth_getBalance', [address, ebo]);
}


