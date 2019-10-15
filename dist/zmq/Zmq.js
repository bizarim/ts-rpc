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
const eventemitter2_1 = require("eventemitter2");
const zmq = require("zeromq");
const util_1 = require("util");
const nextTick = util_1.promisify(process.nextTick);
const CONNECT_MAX_RETRY = 20;
const EVENT_EMITTER_CONFIG = {
    wildcard: true,
    delimiter: ':',
    maxListeners: 20
};
exports.NODETYPES = {
    hashtx: 'hashtx',
    hashblock: 'hashblock',
    rawtx: 'rawtx',
    rawblock: 'rawblock'
};
class ZmqNode {
}
exports.ZmqNode = ZmqNode;
class ZmqOpts {
}
exports.ZmqOpts = ZmqOpts;
class ZMQ extends eventemitter2_1.EventEmitter2 {
    constructor(nodes, opts, logger) {
        super(EVENT_EMITTER_CONFIG);
        this.logger = logger;
        this.nodes = {};
        this.opts = opts || { maxRetry: CONNECT_MAX_RETRY };
        this.connRetries = {};
        for (const [nodeType, uri] of Object.entries(nodes)) {
            this.add(nodeType, uri);
        }
    }
    debug(msg) {
        if (undefined !== this.logger)
            this.logger.debug(msg);
        else
            console.log(msg);
    }
    onError(err, nodeType) {
        this.debug(`Error for ${nodeType}, ${err.message}, ${err.stack}`);
        this.emit(`error:${nodeType}`, err, nodeType);
        this.disconnect(nodeType);
    }
    onRetry(type) {
        this.connRetries[type] = this.connRetries[type] ? this.connRetries[type] + 1 : 1;
        this.debug(`Reconnection attempt#${this.connRetries[type]} for "${type}"`);
        this.emit(`retry:${type}`, type, this.connRetries[type]);
        if (this.connRetries[type] >= this.opts.maxRetry) {
            this.connRetries[type] = 0;
            this.onError(new Error(`Max connect retry attempt reached (${this.opts.maxRetry})`), type);
        }
    }
    add(type, uri) {
        const socket = zmq.socket('sub');
        socket.monitor(1, 0);
        this.debug(`Adding socket ${type}: ${uri}`);
        this.nodes[type] = { socket, uri };
    }
    connect(nodeType) {
        return __awaiter(this, void 0, void 0, function* () {
            let connects;
            if (undefined === nodeType) {
                connects = Object.keys(this.nodes); // all sockets
            }
            else {
                connects = Array.isArray(nodeType) ? nodeType : [nodeType];
            }
            for (const type of connects) {
                const node = this.nodes[type];
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
        });
    }
    disconnect(nodeType) {
        return __awaiter(this, void 0, void 0, function* () {
            let connects;
            if (undefined === nodeType) {
                connects = Object.keys(this.nodes); // all sockets
            }
            else {
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
        });
    }
}
exports.ZMQ = ZMQ;
//# sourceMappingURL=Zmq.js.map