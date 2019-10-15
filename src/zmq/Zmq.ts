import { ILogger } from 'ts-common';
import { EventEmitter2 } from 'eventemitter2';
import * as zmq from 'zeromq';
import { promisify } from 'util';

const nextTick = promisify(process.nextTick);
const CONNECT_MAX_RETRY = 20;
const EVENT_EMITTER_CONFIG = {
    wildcard: true,
    delimiter: ':',
    maxListeners: 20
};
export const NODETYPES = {
    hashtx: 'hashtx',
    hashblock: 'hashblock',
    rawtx: 'rawtx',
    rawblock: 'rawblock'
};

export class ZmqNode {
    socket: zmq.Socket;
    uri: string;
}

export class ZmqOpts {
    maxRetry: number;
}

export class ZMQ extends EventEmitter2 {
    private logger?: ILogger;
    private nodes: { [key: string]: ZmqNode; };
    private opts: ZmqOpts;
    private connRetries: { [key: string]: number; };
    constructor(nodes: { [key: string]: string; }, opts?: ZmqOpts, logger?: ILogger) {
        super(EVENT_EMITTER_CONFIG);
        this.logger = logger;
        this.nodes = {};
        this.opts = opts || { maxRetry: CONNECT_MAX_RETRY };
        this.connRetries = {};
        for (const [nodeType, uri] of Object.entries(nodes)) {
            this.add(nodeType, uri);
        }
    }

    private debug(msg: string) {
        if (undefined !== this.logger) this.logger.debug(msg);
        else console.log(msg);
    }

    private onError(err: Error, nodeType: string) {
        this.debug(`Error for ${nodeType}, ${err.message}, ${err.stack}`);
        this.emit(`error:${nodeType}`, err, nodeType);
        this.disconnect(nodeType);
    }

    private onRetry(type: string) {
        this.connRetries[type] = this.connRetries[type] ? this.connRetries[type] + 1 : 1;
        this.debug(`Reconnection attempt#${this.connRetries[type]} for "${type}"`);
        this.emit(`retry:${type}`, type, this.connRetries[type]);
        if (this.connRetries[type] >= this.opts.maxRetry) {
            this.connRetries[type] = 0;
            this.onError(new Error(`Max connect retry attempt reached (${this.opts.maxRetry})`), type);
        }
    }

    add(type: string, uri: string) {
        const socket = zmq.socket('sub');
        socket.monitor(1, 0);
        this.debug(`Adding socket ${type}: ${uri}`);
        this.nodes[type] = { socket, uri };
    }

    async connect(nodeType?: string | string[]): Promise<unknown> {
        let connects: string[];
        if (undefined === nodeType) {
            connects = Object.keys(this.nodes); // all sockets
        } else {
            connects = Array.isArray(nodeType) ? nodeType : [nodeType];
        }

        for (const type of connects) {
            const node: ZmqNode | undefined = this.nodes[type];
            if (undefined === node) {
                this.debug(`node ${type} not found! Make sure to add it before connect()`);
                continue;
            }
            node.socket.on('error', (err) => this.onError(new Error(`socket error: ${err.stack || err}`), type));
            node.socket.on('close', (err) => this.emit(`close:${type}`, new Error(`socket close: ${err.stack || err}`), type));
            node.socket.on('connect', () => this.emit(`connect:${type}`, node.uri, type));
            this.debug(`Connecting to ${node.uri}`);
            node.socket.connect(node.uri);
            this.debug(`Subscribing to ${type}`);
            node.socket.subscribe(type);
            node.socket.on('message', (topic, message) => this.emit(topic.toString(), message));
            node.socket.on('connect_retry', () => this.onRetry(type));
        }

        return nextTick();
    }

    async disconnect(nodeType: undefined | string | string[]) {
        let connects: string[];
        if (undefined === nodeType) {
            connects = Object.keys(this.nodes); // all sockets
        } else {
            connects = Array.isArray(nodeType) ? nodeType : [nodeType];
        }

        return Promise.all(connects.map((type) => new Promise((resolve, reject) => {
            const { socket, uri } = this.nodes[type];
            socket.removeAllListeners();

            socket.once('error', reject);
            socket.once('close', () => {
                this.emit(`close:${type}`, undefined, type);
                resolve();
            });

            this.debug(`Disconnecting ${uri}`);
            socket.close();
            // if (socket.closed) socket.emit('close'); // HACK: issue #273
        })));
    }
}