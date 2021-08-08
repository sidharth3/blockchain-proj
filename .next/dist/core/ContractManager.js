'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _web = require('../ethereum/web3');

var _web2 = _interopRequireDefault(_web);

var _EtherChat = require('../ethereum/build/EtherChat.json');

var _EtherChat2 = _interopRequireDefault(_EtherChat);

var _TransactionManager = require('./TransactionManager');

var _TransactionManager2 = _interopRequireDefault(_TransactionManager);

var _AppDispatcher = require('./AppDispatcher');

var _AppDispatcher2 = _interopRequireDefault(_AppDispatcher);

var _Config = require('../support/Config');

var _Config2 = _interopRequireDefault(_Config);

var _Constant = require('../support/Constant');

var _Constant2 = _interopRequireDefault(_Constant);

var _Utils = require('../support/Utils');

var _Utils2 = _interopRequireDefault(_Utils);

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Responsible for interacting with the Ethereum smart contract
 */

var ContractManager = function ContractManager(accountManager, storageManager) {
    var _this = this;

    (0, _classCallCheck3.default)(this, ContractManager);

    this.getContract = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return new _web2.default.eth.Contract(JSON.parse(_EtherChat2.default.interface), _Config2.default.ENV.ContractAddress);

                    case 2:
                        _this.contract = _context.sent;

                        _AppDispatcher2.default.dispatch({
                            action: _Constant2.default.EVENT.CONTRACT_READY
                        });

                    case 4:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, _this);
    }));

    this.getProfile = function () {
        var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(address) {
            var result, profile;
            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.next = 2;
                            return _this.contract.methods.members(_this.accountManager.getAddress()).call();

                        case 2:
                            result = _context2.sent;
                            profile = {};

                            if (result.isMember == 1) {
                                profile.isJoined = true;
                                profile.avatarUrl = _Utils2.default.hexStringToAsciiString(result.avatarUrl);
                                profile.name = _Utils2.default.hexStringToAsciiString(result.name);

                                _this.storageManager.setJoinedStatus(true);
                                _this.storageManager.setName(_this.name);
                                _this.storageManager.setAvatarUrl(_this.avatarUrl);

                                _AppDispatcher2.default.dispatch({
                                    action: _Constant2.default.EVENT.ACCOUNT_INFO_UPDATED,
                                    profile: profile
                                });
                            }
                            return _context2.abrupt('return', profile);

                        case 6:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, _this);
        }));

        return function (_x) {
            return _ref2.apply(this, arguments);
        };
    }();

    this.getMemberInfo = function () {
        var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(address, relationship) {
            var memberInfo, publicKey, name, avatarUrl;
            return _regenerator2.default.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _context3.next = 2;
                            return _this.contract.methods.members(address).call();

                        case 2:
                            memberInfo = _context3.sent;

                            if (memberInfo.isMember) {
                                publicKey = '04' + memberInfo.publicKeyLeft.substr(2) + memberInfo.publicKeyRight.substr(2);
                                name = _Utils2.default.hexStringToAsciiString(memberInfo.name);
                                avatarUrl = _Utils2.default.hexStringToAsciiString(memberInfo.avatarUrl);

                                _this.storageManager.updateContact(address, publicKey, name, avatarUrl, relationship);
                            }

                        case 4:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, _this);
        }));

        return function (_x2, _x3) {
            return _ref3.apply(this, arguments);
        };
    }();

    this.getPastEvents = function () {
        var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(eventName, filters) {
            return _regenerator2.default.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            _context4.next = 2;
                            return _this.contract.getPastEvents(eventName, filters);

                        case 2:
                            return _context4.abrupt('return', _context4.sent);

                        case 3:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, _this);
        }));

        return function (_x4, _x5) {
            return _ref4.apply(this, arguments);
        };
    }();

    this.joinContract = function () {
        var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(publicKeyBuffer, callback) {
            var publicKeyLeft, publicKeyRight;
            return _regenerator2.default.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            console.log(publicKeyBuffer);
                            publicKeyLeft = '0x' + publicKeyBuffer.toString('hex', 0, 32);
                            publicKeyRight = '0x' + publicKeyBuffer.toString('hex', 32, 64);

                            _this.transactionManager.executeMethod(_this.contract.methods.join(publicKeyLeft, publicKeyRight)).on(_Constant2.default.EVENT.ON_APPROVED, function (txHash) {
                                if (callback) callback(_Constant2.default.EVENT.ON_APPROVED);
                            }).on(_Constant2.default.EVENT.ON_REJECTED, function (txHash) {
                                if (callback) callback(_Constant2.default.EVENT.ON_REJECTED);
                            }).on(_Constant2.default.EVENT.ON_RECEIPT, function (receipt) {
                                if (callback) callback(_Constant2.default.EVENT.ON_RECEIPT);
                            }).on(_Constant2.default.EVENT.ON_ERROR, function (error, txHash) {
                                _AppDispatcher2.default.dispatch({
                                    action: _Constant2.default.EVENT.ENCOUNTERED_ERROR,
                                    message: error.message,
                                    title: "Error"
                                });
                                if (callback) callback(_Constant2.default.EVENT.ON_ERROR);
                            });

                        case 4:
                        case 'end':
                            return _context5.stop();
                    }
                }
            }, _callee5, _this);
        }));

        return function (_x6, _x7) {
            return _ref5.apply(this, arguments);
        };
    }();

    this.addContact = function () {
        var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(address) {
            var memberInfo, publicKey;
            return _regenerator2.default.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            console.log(address);
                            _context6.next = 3;
                            return _this.contract.methods.members(address).call();

                        case 3:
                            memberInfo = _context6.sent;

                            // console.log(address, memberInfo.isMember);
                            if (memberInfo.isMember) {
                                publicKey = '04' + memberInfo.publicKeyLeft.substr(2) + memberInfo.publicKeyRight.substr(2);

                                _this.storageManager.addContact(address, publicKey);
                            } else {
                                console.log("EEROR");
                                _AppDispatcher2.default.dispatch({
                                    action: _Constant2.default.EVENT.ENCOUNTERED_ERROR,
                                    message: "This address is not a member of Ethereum Messenger :(",
                                    title: "Error"
                                });
                            }
                        // var method = this.contract.methods.addContact(address);
                        // this.transactionManager.executeMethod(method)
                        //     .on(Constant.EVENT.ON_APPROVED, (txHash) => {
                        //         if (callback) callback(Constant.EVENT.ON_APPROVED);
                        //     })
                        //     .on(Constant.EVENT.ON_RECEIPT, (receipt) => {
                        //         if (callback) callback(Constant.EVENT.ON_RECEIPT);
                        //     })
                        //     .on(Constant.EVENT.ON_ERROR, (error, txHash) => {
                        //         appDispatcher.dispatch({
                        //             action: Constant.EVENT.ENCOUNTERED_ERROR,
                        //             message: error.message,
                        //             title: "Error"
                        //         });
                        //         if (callback) callback(Constant.EVENT.ON_ERROR);
                        //     });

                        case 5:
                        case 'end':
                            return _context6.stop();
                    }
                }
            }, _callee6, _this);
        }));

        return function (_x8) {
            return _ref6.apply(this, arguments);
        };
    }();

    this.acceptContactRequest = function () {
        var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(address, callback) {
            var method;
            return _regenerator2.default.wrap(function _callee7$(_context7) {
                while (1) {
                    switch (_context7.prev = _context7.next) {
                        case 0:
                            method = _this.contract.methods.acceptContactRequest(address);

                            _this.transactionManager.executeMethod(method).on(_Constant2.default.EVENT.ON_APPROVED, function (txHash) {
                                if (callback) callback(_Constant2.default.EVENT.ON_APPROVED);
                            }).on(_Constant2.default.EVENT.ON_RECEIPT, function (receipt) {
                                if (callback) callback(_Constant2.default.EVENT.ON_RECEIPT);
                            }).on(_Constant2.default.EVENT.ON_ERROR, function (error, txHash) {
                                _AppDispatcher2.default.dispatch({
                                    action: _Constant2.default.EVENT.ENCOUNTERED_ERROR,
                                    message: error.message,
                                    title: "Error"
                                });
                                if (callback) callback(_Constant2.default.EVENT.ON_ERROR);
                            });

                        case 2:
                        case 'end':
                            return _context7.stop();
                    }
                }
            }, _callee7, _this);
        }));

        return function (_x9, _x10) {
            return _ref7.apply(this, arguments);
        };
    }();

    this.updateProfile = function () {
        var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(name, avatarUrl, callback) {
            var nameHex, avatarUrlHex, method;
            return _regenerator2.default.wrap(function _callee8$(_context8) {
                while (1) {
                    switch (_context8.prev = _context8.next) {
                        case 0:
                            nameHex = '0x' + Buffer.from(name, 'ascii').toString('hex');
                            avatarUrlHex = '0x' + Buffer.from(avatarUrl, 'ascii').toString('hex');
                            method = _this.contract.methods.updateProfile(nameHex, avatarUrlHex);

                            _this.transactionManager.executeMethod(method).on(_Constant2.default.EVENT.ON_APPROVED, function (txHash) {
                                if (callback) callback(_Constant2.default.EVENT.ON_APPROVED);
                            }).on(_Constant2.default.EVENT.ON_RECEIPT, function (receipt) {
                                if (callback) callback(_Constant2.default.EVENT.ON_RECEIPT);
                            }).on(_Constant2.default.EVENT.ON_ERROR, function (error, txHash) {
                                _AppDispatcher2.default.dispatch({
                                    action: _Constant2.default.EVENT.ENCOUNTERED_ERROR,
                                    message: error.message,
                                    title: "Error"
                                });
                                if (callback) callback(_Constant2.default.EVENT.ON_ERROR);
                            });

                        case 4:
                        case 'end':
                            return _context8.stop();
                    }
                }
            }, _callee8, _this);
        }));

        return function (_x11, _x12, _x13) {
            return _ref8.apply(this, arguments);
        };
    }();

    this.sendMessage = function () {
        var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(toAddress, publicKey, message) {
            var publicKeyBuffer, encryptedRaw, encryptedMessage, method;
            return _regenerator2.default.wrap(function _callee9$(_context9) {
                while (1) {
                    switch (_context9.prev = _context9.next) {
                        case 0:
                            publicKeyBuffer = Buffer.from(publicKey, 'hex');
                            encryptedRaw = _Utils2.default.encrypt(message, _this.accountManager.computeSecret(publicKeyBuffer));
                            encryptedMessage = '0x' + encryptedRaw.toString('hex');
                            method = _this.contract.methods.sendMessage(toAddress, encryptedMessage, _Utils2.default.getEncryptAlgorithmInHex());

                            _this.transactionManager.executeMethod(method).on(_Constant2.default.EVENT.ON_APPROVED, function (txHash) {
                                _this.storageManager.addMyLocalMessage(encryptedMessage, toAddress, _Utils2.default.getEncryptAlgorithm(), txHash);
                                _AppDispatcher2.default.dispatch({
                                    action: _Constant2.default.EVENT.MESSAGES_UPDATED,
                                    data: toAddress
                                });
                            }).on(_Constant2.default.EVENT.ON_REJECTED, function (data) {
                                // do nothing
                            }).on(_Constant2.default.EVENT.ON_RECEIPT, function (receipt) {
                                _this.storageManager.updateLocalMessage(toAddress, receipt.transactionHash, _Constant2.default.SENT_STATUS.SUCCESS);
                                _AppDispatcher2.default.dispatch({
                                    action: _Constant2.default.EVENT.MESSAGES_UPDATED,
                                    data: toAddress
                                });
                            }).on(_Constant2.default.EVENT.ON_ERROR, function (error, txHash) {
                                _this.storageManager.updateLocalMessage(toAddress, txHash, _Constant2.default.SENT_STATUS.FAILED);
                                _AppDispatcher2.default.dispatch({
                                    action: _Constant2.default.EVENT.MESSAGES_UPDATED,
                                    data: toAddress
                                });
                            });

                        case 5:
                        case 'end':
                            return _context9.stop();
                    }
                }
            }, _callee9, _this);
        }));

        return function (_x14, _x15, _x16) {
            return _ref9.apply(this, arguments);
        };
    }();

    this.getContract();
    this.accountManager = accountManager;
    this.storageManager = storageManager;
    this.transactionManager = new _TransactionManager2.default(accountManager);
}

// Create a web3 contract object that represent the ethereum smart contract


// Get current account profile from EtherChat contract's storage


// A message will be encrypted locally before sending to the smart contract
;

exports.default = ContractManager;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvQ29udHJhY3RNYW5hZ2VyLmpzIl0sIm5hbWVzIjpbIndlYjMiLCJjb21waWxlZENvbnRyYWN0IiwiVHJhbnNhY3Rpb25zTWFuYWdlciIsImFwcERpc3BhdGNoZXIiLCJDb25maWciLCJDb25zdGFudCIsInV0aWxzIiwiY3J5cHRvIiwiQ29udHJhY3RNYW5hZ2VyIiwiYWNjb3VudE1hbmFnZXIiLCJzdG9yYWdlTWFuYWdlciIsImdldENvbnRyYWN0IiwiZXRoIiwiQ29udHJhY3QiLCJKU09OIiwicGFyc2UiLCJpbnRlcmZhY2UiLCJFTlYiLCJDb250cmFjdEFkZHJlc3MiLCJjb250cmFjdCIsImRpc3BhdGNoIiwiYWN0aW9uIiwiRVZFTlQiLCJDT05UUkFDVF9SRUFEWSIsImdldFByb2ZpbGUiLCJhZGRyZXNzIiwibWV0aG9kcyIsIm1lbWJlcnMiLCJnZXRBZGRyZXNzIiwiY2FsbCIsInJlc3VsdCIsInByb2ZpbGUiLCJpc01lbWJlciIsImlzSm9pbmVkIiwiYXZhdGFyVXJsIiwiaGV4U3RyaW5nVG9Bc2NpaVN0cmluZyIsIm5hbWUiLCJzZXRKb2luZWRTdGF0dXMiLCJzZXROYW1lIiwic2V0QXZhdGFyVXJsIiwiQUNDT1VOVF9JTkZPX1VQREFURUQiLCJnZXRNZW1iZXJJbmZvIiwicmVsYXRpb25zaGlwIiwibWVtYmVySW5mbyIsInB1YmxpY0tleSIsInB1YmxpY0tleUxlZnQiLCJzdWJzdHIiLCJwdWJsaWNLZXlSaWdodCIsInVwZGF0ZUNvbnRhY3QiLCJnZXRQYXN0RXZlbnRzIiwiZXZlbnROYW1lIiwiZmlsdGVycyIsImpvaW5Db250cmFjdCIsInB1YmxpY0tleUJ1ZmZlciIsImNhbGxiYWNrIiwiY29uc29sZSIsImxvZyIsInRvU3RyaW5nIiwidHJhbnNhY3Rpb25NYW5hZ2VyIiwiZXhlY3V0ZU1ldGhvZCIsImpvaW4iLCJvbiIsIk9OX0FQUFJPVkVEIiwidHhIYXNoIiwiT05fUkVKRUNURUQiLCJPTl9SRUNFSVBUIiwicmVjZWlwdCIsIk9OX0VSUk9SIiwiZXJyb3IiLCJFTkNPVU5URVJFRF9FUlJPUiIsIm1lc3NhZ2UiLCJ0aXRsZSIsImFkZENvbnRhY3QiLCJhY2NlcHRDb250YWN0UmVxdWVzdCIsIm1ldGhvZCIsInVwZGF0ZVByb2ZpbGUiLCJuYW1lSGV4IiwiQnVmZmVyIiwiZnJvbSIsImF2YXRhclVybEhleCIsInNlbmRNZXNzYWdlIiwidG9BZGRyZXNzIiwiZW5jcnlwdGVkUmF3IiwiZW5jcnlwdCIsImNvbXB1dGVTZWNyZXQiLCJlbmNyeXB0ZWRNZXNzYWdlIiwiZ2V0RW5jcnlwdEFsZ29yaXRobUluSGV4IiwiYWRkTXlMb2NhbE1lc3NhZ2UiLCJnZXRFbmNyeXB0QWxnb3JpdGhtIiwiTUVTU0FHRVNfVVBEQVRFRCIsImRhdGEiLCJ1cGRhdGVMb2NhbE1lc3NhZ2UiLCJ0cmFuc2FjdGlvbkhhc2giLCJTRU5UX1NUQVRVUyIsIlNVQ0NFU1MiLCJGQUlMRUQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLEFBQU8sQUFBVTs7OztBQUNqQixBQUFPLEFBQXNCOzs7O0FBQzdCLEFBQU8sQUFBeUI7Ozs7QUFDaEMsQUFBTyxBQUFtQjs7OztBQUMxQixBQUFPLEFBQVk7Ozs7QUFDbkIsQUFBTyxBQUFjOzs7O0FBQ3JCLEFBQU8sQUFBVzs7OztBQUNsQixBQUFPOzs7Ozs7QUFFUDs7OztJLEFBSU0sa0JBQ0YseUJBQUEsQUFBWSxnQkFBWixBQUE0QixnQkFBZ0I7Z0JBQUE7O3dDQUFBOztTQUFBLEFBUTVDLHVGQUFjLG1CQUFBO3NFQUFBO3NCQUFBO2lEQUFBO3lCQUFBO3dDQUFBOytCQUNZLElBQUksY0FBQSxBQUFLLElBQVQsQUFBYSxTQUFTLEtBQUEsQUFBSyxNQUFNLG9CQUFqQyxBQUFzQixBQUE0QixZQUNoRSxpQkFBQSxBQUFPLElBRkwsQUFDWSxBQUNIOzt5QkFEbkI7OEJBRFUsQUFDTCxvQkFFTDs7Z0RBQUEsQUFBYztvQ0FDRixtQkFBQSxBQUFTLE1BSlgsQUFHVixBQUF1QixBQUNJO0FBREosQUFDbkI7O3lC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