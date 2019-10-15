import { expect } from 'chai';
import { initEthRpc, callGetBlockByNumber, RpcResponse, callSendTransaction, callUnlockAccount } from '../src';



describe('rpcTest.test', function () {

    it('rpc initEthRpc', async function () {
        initEthRpc('{ "endpoint" : "http://192.168.4.175:18443" }');
    });


    it('rpc callGetBlockByNumber', async function () {
        const res: RpcResponse = await callGetBlockByNumber();
        // console.log(res);
        expect(res.error).to.be.an('undefined');
        // expect(res.error).to.be.an('object');
    });

    it('rpc callUnlockAccount', async function () {
        const res: RpcResponse = await callUnlockAccount('0xddb990fe7fa6320947ae6068f2337fcf1a7d5659', '123');
        // console.log(res);
        expect(res.error).to.be.an('undefined');
        // expect(res.error).to.be.an('object');
    });

    it('rpc callSendTransaction', async function () {
        const from: string = '0xddb990fe7fa6320947ae6068f2337fcf1a7d5659';
        const to: string = '0x1937a45636ce9199ce0d5b3c09dfc7a6ec0b8354';
        const value: number = 0.000001;
        const gas: number = 21000;
        const res: RpcResponse = await callSendTransaction(from, to, value, gas);
        // console.log(res);
        expect(res.error).to.be.an('undefined');
        // expect(res.error).to.be.an('object');
    });

});