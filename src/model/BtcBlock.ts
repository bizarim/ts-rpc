import { IRpcContext } from '..';

export class BtcBlock implements IRpcContext  {

    hash: string;
    confirmations: number;
    size: number;
    strippedsize: number;
    weight: number;
    height: number;
    version: number;
    versionHex: string;
    merkleroot: string;
    tx: string[];
    time: number;
    mediantime: number;
    nonce: number;
    bits: string;
    difficulty: number;
    chainwork: string;
    nTx: number;
    previousblockhash: string;
    nextblockhash: string;
}

// {
//     "hash" : "hash",     (string) the block hash (same as provided)
//     "confirmations" : n,   (numeric) The number of confirmations, or -1 if the block is not on the main chain
//     "size" : n,            (numeric) The block size
//     "strippedsize" : n,    (numeric) The block size excluding witness data
//     "weight" : n           (numeric) The block weight as defined in BIP 141
//     "height" : n,          (numeric) The block height or index
//     "version" : n,         (numeric) The block version
//     "versionHex" : "00000000", (string) The block version formatted in hexadecimal
//     "merkleroot" : "xxxx", (string) The merkle root
//     "tx" : [               (array of string) The transaction ids
//        "transactionid"     (string) The transaction id
//        ,...
//     ],
//     "time" : ttt,          (numeric) The block time in seconds since epoch (Jan 1 1970 GMT)
//     "mediantime" : ttt,    (numeric) The median block time in seconds since epoch (Jan 1 1970 GMT)
//     "nonce" : n,           (numeric) The nonce
//     "bits" : "1d00ffff", (string) The bits
//     "difficulty" : x.xxx,  (numeric) The difficulty
//     "chainwork" : "xxxx",  (string) Expected number of hashes required to produce the chain up to this block (in hex)
//     "nTx" : n,             (numeric) The number of transactions in the block.
//     "previousblockhash" : "hash",  (string) The hash of the previous block
//     "nextblockhash" : "hash"       (string) The hash of the next block
//   }