import { IRpcContext } from '..';

export class BtcVInput {
    txid: string;
    vout: number;
    scriptSig: {
        asm: string,
        hex: string
    };

    txinwitness: string[];
    sequence: number;
}
export class BtcVOutput {
    value: number;
    n: number;
    scriptPubKey: {
        asm: string;
        hex: string;
        reqSigs: number;
        type: string;
        addresses: string[];
    };
}
export class BtcDecodeRawTransaction implements IRpcContext {

    txid: string;
    hash: string;
    size: number;
    vsize: number;
    weight: number;
    version: number;
    locktime: number;
    vin: BtcVInput[];
    vout: BtcVOutput[];
}


// {
//     "txid" : "id",        (string) The transaction id
//     "hash" : "id",        (string) The transaction hash (differs from txid for witness transactions)
//     "size" : n,             (numeric) The transaction size
//     "vsize" : n,            (numeric) The virtual transaction size (differs from size for witness transactions)
//     "weight" : n,           (numeric) The transaction's weight (between vsize*4 - 3 and vsize*4)
//     "version" : n,          (numeric) The version
//     "locktime" : ttt,       (numeric) The lock time
//     "vin" : [               (array of json objects)
//        {
//          "txid": "id",    (string) The transaction id
//          "vout": n,         (numeric) The output number
//          "scriptSig": {     (json object) The script
//            "asm": "asm",  (string) asm
//            "hex": "hex"   (string) hex
//          },
//          "txinwitness": ["hex", ...] (array of string) hex-encoded witness data (if any)
//          "sequence": n     (numeric) The script sequence number
//        }
//        ,...
//     ],
//     "vout" : [             (array of json objects)
//        {
//          "value" : x.xxx,            (numeric) The value in BTC
//          "n" : n,                    (numeric) index
//          "scriptPubKey" : {          (json object)
//            "asm" : "asm",          (string) the asm
//            "hex" : "hex",          (string) the hex
//            "reqSigs" : n,            (numeric) The required sigs
//            "type" : "pubkeyhash",  (string) The type, eg 'pubkeyhash'
//            "addresses" : [           (json array of string)
//              "12tvKAXCxZjSmdNbao16dKXC8tRWfcF5oc"   (string) bitcoin address
//              ,...
//            ]
//          }
//        }
//        ,...
//     ],
//   }
