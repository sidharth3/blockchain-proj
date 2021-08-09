'use strict';

// Copyright (c) 2018 Nguyen Vu Nhat Minh
// Distributed under the MIT software license, see the accompanying file LICENSE

var crypto = require('crypto');
var wallet = require('ethereumjs-wallet');

var algorithm = 'aes256';

module.exports.getEncryptAlgorithm = function () {
    return algorithm;
};

module.exports.getEncryptAlgorithmInHex = function () {
    return '0x' + Buffer.from(algorithm, 'ascii').toString('hex');
};

module.exports.hexStringToAsciiString = function (hexString) {
    if (hexString.startsWith('0x')) {
        hexString = hexString.substr(2);
    }
    return Buffer.from(hexString, 'hex').toString('ascii').replace(/\0/g, '');
};

module.exports.privateToPublic = function (privateKey) {
    var account = crypto.createECDH('secp256k1');
    account.setPrivateKey(privateKey);
    return account.getPublicKey().slice(1);
};

module.exports.computeSecret = function (privateKeyFromA, publicKeyFromB) {
    var A = crypto.createECDH('secp256k1');
    A.setPrivateKey(privateKeyFromA);
    return A.computeSecret(publicKeyFromB);
};

exports.encrypt = function (message, secret) {
    var cipher = crypto.createCipher(algorithm, secret);
    var crypted = cipher.update(message, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
};

exports.decrypt = function (encryptedMessage, secret) {
    var decipher = crypto.createDecipher(algorithm, secret);
    var dec = decipher.update(encryptedMessage, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
};

// exports.getPubkeyFromTransaction = (rawTx) => {
//       var localTx = {
//         nonce: parseInt(rawTx.nonce),
//         gasPrice: parseInt(rawTx.gasPrice),
//         gasLimit: parseInt(rawTx.gas),
//         to: rawTx.to,
//         value: parseInt(rawTx.value),
//         r: rawTx.r,
//         s: rawTx.s,
//         v: rawTx.v,
//         data: rawTx.input,
//       };

//     var txInstance = new Transaction(localTx);
//     return txInstance.getSenderPublicKey().toString('hex');
//   }
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN1cHBvcnQvVXRpbHMuanMiXSwibmFtZXMiOlsiY3J5cHRvIiwicmVxdWlyZSIsIndhbGxldCIsImFsZ29yaXRobSIsIm1vZHVsZSIsImV4cG9ydHMiLCJnZXRFbmNyeXB0QWxnb3JpdGhtIiwiZ2V0RW5jcnlwdEFsZ29yaXRobUluSGV4IiwiQnVmZmVyIiwiZnJvbSIsInRvU3RyaW5nIiwiaGV4U3RyaW5nVG9Bc2NpaVN0cmluZyIsImhleFN0cmluZyIsInN0YXJ0c1dpdGgiLCJzdWJzdHIiLCJyZXBsYWNlIiwicHJpdmF0ZVRvUHVibGljIiwicHJpdmF0ZUtleSIsImFjY291bnQiLCJjcmVhdGVFQ0RIIiwic2V0UHJpdmF0ZUtleSIsImdldFB1YmxpY0tleSIsInNsaWNlIiwiY29tcHV0ZVNlY3JldCIsInByaXZhdGVLZXlGcm9tQSIsInB1YmxpY0tleUZyb21CIiwiQSIsImVuY3J5cHQiLCJtZXNzYWdlIiwic2VjcmV0IiwiY2lwaGVyIiwiY3JlYXRlQ2lwaGVyIiwiY3J5cHRlZCIsInVwZGF0ZSIsImZpbmFsIiwiZGVjcnlwdCIsImVuY3J5cHRlZE1lc3NhZ2UiLCJkZWNpcGhlciIsImNyZWF0ZURlY2lwaGVyIiwiZGVjIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7O0FBRUEsSUFBSSxTQUFTLEFBQVQsQUFBSjtBQUNBLElBQUksU0FBUyxBQUFULEFBQUo7O0FBRUEsSUFBSSxZQUFZLEFBQWhCOztBQUVBLE9BQU8sQUFBUCxRQUFlLEFBQWYsc0JBQXFDLFlBQU0sQUFDdkM7V0FBTyxBQUFQLEFBQ0g7QUFGRDs7QUFJQSxPQUFPLEFBQVAsUUFBZSxBQUFmLDJCQUEwQyxZQUFNLEFBQzVDO1dBQU8sT0FBTyxPQUFPLEFBQVAsS0FBWSxBQUFaLFdBQXVCLEFBQXZCLFNBQWdDLEFBQWhDLFNBQXlDLEFBQXpDLEFBQWQsQUFDSDtBQUZEOztBQUlBLE9BQU8sQUFBUCxRQUFlLEFBQWYseUJBQXdDLFVBQUMsQUFBRCxXQUFlLEFBQ25EO1FBQUksVUFBVSxBQUFWLFdBQXFCLEFBQXJCLEFBQUosT0FBZ0MsQUFDNUI7b0JBQVksVUFBVSxBQUFWLE9BQWlCLEFBQWpCLEFBQVosQUFDSDtBQUNEO1dBQU8sT0FBTyxBQUFQLEtBQVksQUFBWixXQUF1QixBQUF2QixPQUE4QixBQUE5QixTQUF1QyxBQUF2QyxTQUFnRCxBQUFoRCxRQUF3RCxBQUF4RCxPQUErRCxBQUEvRCxBQUFQLEFBQ0g7QUFMRDs7QUFPQSxPQUFPLEFBQVAsUUFBZSxBQUFmLGtCQUFpQyxVQUFDLEFBQUQsWUFBZ0IsQUFDN0M7UUFBSSxVQUFVLE9BQU8sQUFBUCxXQUFrQixBQUFsQixBQUFkLEFBQ0E7WUFBUSxBQUFSLGNBQXNCLEFBQXRCLEFBQ0E7V0FBTyxRQUFRLEFBQVIsZUFBdUIsQUFBdkIsTUFBNkIsQUFBN0IsQUFBUCxBQUNIO0FBSkQ7O0FBTUEsT0FBTyxBQUFQLFFBQWUsQUFBZixnQkFBK0IsVUFBQyxBQUFELGlCQUFrQixBQUFsQixnQkFBcUMsQUFDaEU7UUFBSSxJQUFJLE9BQU8sQUFBUCxXQUFrQixBQUFsQixBQUFSLEFBQ0E7TUFBRSxBQUFGLGNBQWdCLEFBQWhCLEFBQ0E7V0FBTyxFQUFFLEFBQUYsY0FBZ0IsQUFBaEIsQUFBUCxBQUNIO0FBSkQ7O0FBTUEsUUFBUSxBQUFSLFVBQWtCLFVBQUMsQUFBRCxTQUFVLEFBQVYsUUFBcUIsQUFDbkM7UUFBSSxTQUFTLE9BQU8sQUFBUCxhQUFvQixBQUFwQixXQUErQixBQUEvQixBQUFiLEFBQ0E7UUFBSSxVQUFVLE9BQU8sQUFBUCxPQUFjLEFBQWQsU0FBc0IsQUFBdEIsUUFBNkIsQUFBN0IsQUFBZCxBQUNBO2VBQVcsT0FBTyxBQUFQLE1BQWEsQUFBYixBQUFYLEFBQ0E7V0FBTyxBQUFQLEFBQ0Q7QUFMSDs7QUFPQSxRQUFRLEFBQVIsVUFBa0IsVUFBQyxBQUFELGtCQUFtQixBQUFuQixRQUE4QixBQUM1QztRQUFJLFdBQVcsT0FBTyxBQUFQLGVBQXNCLEFBQXRCLFdBQWdDLEFBQWhDLEFBQWYsQUFDQTtRQUFJLE1BQU0sU0FBUyxBQUFULE9BQWdCLEFBQWhCLGtCQUFpQyxBQUFqQyxPQUF1QyxBQUF2QyxBQUFWLEFBQ0E7V0FBTyxTQUFTLEFBQVQsTUFBZSxBQUFmLEFBQVAsQUFDQTtXQUFPLEFBQVAsQUFDSDtBQUxEOztBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EiLCJmaWxlIjoiVXRpbHMuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3RoZWJlL0Rlc2t0b3AvYmxvY2tjaGFpbi1wcm9qIn0=