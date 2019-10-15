import { ILogger } from 'ts-common';
import { EventEmitter2 } from 'eventemitter2';
import * as zmq from 'zeromq';
export declare const NODETYPES: {
    hashtx: string;
    hashblock: string;
    rawtx: string;
    rawblock: string;
};
export declare class ZmqNode {
    socket: zmq.Socket;
    uri: string;
}
export declare class ZmqOpts {
    maxRetry: number;
}
export declare class ZMQ extends EventEmitter2 {
    private logger?;
    private nodes;
    private opts;
    private connRetries;
    constructor(nodes: {
        [key: string]: string;
    }, opts?: ZmqOpts, logger?: ILogger);
    private debug;
    private onError;
    private onRetry;
    add(type: string, uri: string): void;
    connect(nodeType?: string | string[]): Promise<unknown>;
    disconnect(nodeType: undefined | string | string[]): Promise<unknown[]>;
}
