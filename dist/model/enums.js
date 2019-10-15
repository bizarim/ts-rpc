"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var eTxCategory;
(function (eTxCategory) {
    eTxCategory["none"] = "none";
    eTxCategory["send"] = "send";
    eTxCategory["receive"] = "receive";
    eTxCategory["confirmed"] = "confirmed";
    eTxCategory["immature"] = "immature";
    eTxCategory["generate"] = "generate";
})(eTxCategory = exports.eTxCategory || (exports.eTxCategory = {}));
var eEthBlockOpts;
(function (eEthBlockOpts) {
    eEthBlockOpts["earliest"] = "earliest";
    eEthBlockOpts["latest"] = "latest";
    eEthBlockOpts["pending"] = "pending";
})(eEthBlockOpts = exports.eEthBlockOpts || (exports.eEthBlockOpts = {}));
var eEthValue;
(function (eEthValue) {
    eEthValue[eEthValue["ether"] = 1000000000000000000] = "ether";
    eEthValue[eEthValue["finney"] = 1000000000000000] = "finney";
    eEthValue[eEthValue["szabo"] = 1000000000000] = "szabo";
    eEthValue[eEthValue["shannon"] = 1000000000] = "shannon";
})(eEthValue = exports.eEthValue || (exports.eEthValue = {}));
// noether: '0',
// wei:        '1',
// kwei:       '1000',
// Kwei:       '1000',
// babbage:    '1000',
// femtoether: '1000',
// mwei:       '1000000',
// Mwei:       '1000000',
// lovelace:   '1000000',
// picoether:  '1000000',
// gwei:       '1000000000',
// Gwei:       '1000000000',
// shannon:    '1000000000',
// nanoether:  '1000000000',
// nano:       '1000000000',
// szabo:      '1000000000000',
// microether: '1000000000000',
// micro:      '1000000000000',
// finney:     '1000000000000000',
// milliether: '1000000000000000',
// milli:      '1000000000000000',
// ether:      '1000000000000000000',
// kether:     '1000000000000000000000',
// grand:      '1000000000000000000000',
// mether:     '1000000000000000000000000',
// gether:     '1000000000000000000000000000',
// tether:     '1000000000000000000000000000000'
//# sourceMappingURL=enums.js.map