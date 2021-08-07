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

                        case 3:
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
        var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(address, callback) {
            var method;
            return _regenerator2.default.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            console.log(address);

                            method = _this.contract.methods.addContact(address);

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

                        case 3:
                        case 'end':
                            return _context6.stop();
                    }
                }
            }, _callee6, _this);
        }));

        return function (_x8, _x9) {
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

        return function (_x10, _x11) {
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

        return function (_x12, _x13, _x14) {
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

        return function (_x15, _x16, _x17) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvQ29udHJhY3RNYW5hZ2VyLmpzIl0sIm5hbWVzIjpbIndlYjMiLCJjb21waWxlZENvbnRyYWN0IiwiVHJhbnNhY3Rpb25zTWFuYWdlciIsImFwcERpc3BhdGNoZXIiLCJDb25maWciLCJDb25zdGFudCIsInV0aWxzIiwiY3J5cHRvIiwiQ29udHJhY3RNYW5hZ2VyIiwiYWNjb3VudE1hbmFnZXIiLCJzdG9yYWdlTWFuYWdlciIsImdldENvbnRyYWN0IiwiZXRoIiwiQ29udHJhY3QiLCJKU09OIiwicGFyc2UiLCJpbnRlcmZhY2UiLCJFTlYiLCJDb250cmFjdEFkZHJlc3MiLCJjb250cmFjdCIsImRpc3BhdGNoIiwiYWN0aW9uIiwiRVZFTlQiLCJDT05UUkFDVF9SRUFEWSIsImdldFByb2ZpbGUiLCJhZGRyZXNzIiwibWV0aG9kcyIsIm1lbWJlcnMiLCJnZXRBZGRyZXNzIiwiY2FsbCIsInJlc3VsdCIsInByb2ZpbGUiLCJpc01lbWJlciIsImlzSm9pbmVkIiwiYXZhdGFyVXJsIiwiaGV4U3RyaW5nVG9Bc2NpaVN0cmluZyIsIm5hbWUiLCJzZXRKb2luZWRTdGF0dXMiLCJzZXROYW1lIiwic2V0QXZhdGFyVXJsIiwiQUNDT1VOVF9JTkZPX1VQREFURUQiLCJnZXRNZW1iZXJJbmZvIiwicmVsYXRpb25zaGlwIiwibWVtYmVySW5mbyIsInB1YmxpY0tleSIsInB1YmxpY0tleUxlZnQiLCJzdWJzdHIiLCJwdWJsaWNLZXlSaWdodCIsInVwZGF0ZUNvbnRhY3QiLCJnZXRQYXN0RXZlbnRzIiwiZXZlbnROYW1lIiwiZmlsdGVycyIsImpvaW5Db250cmFjdCIsInB1YmxpY0tleUJ1ZmZlciIsImNhbGxiYWNrIiwidG9TdHJpbmciLCJ0cmFuc2FjdGlvbk1hbmFnZXIiLCJleGVjdXRlTWV0aG9kIiwiam9pbiIsIm9uIiwiT05fQVBQUk9WRUQiLCJ0eEhhc2giLCJPTl9SRUpFQ1RFRCIsIk9OX1JFQ0VJUFQiLCJyZWNlaXB0IiwiT05fRVJST1IiLCJlcnJvciIsIkVOQ09VTlRFUkVEX0VSUk9SIiwibWVzc2FnZSIsInRpdGxlIiwiYWRkQ29udGFjdCIsImNvbnNvbGUiLCJsb2ciLCJtZXRob2QiLCJhY2NlcHRDb250YWN0UmVxdWVzdCIsInVwZGF0ZVByb2ZpbGUiLCJuYW1lSGV4IiwiQnVmZmVyIiwiZnJvbSIsImF2YXRhclVybEhleCIsInNlbmRNZXNzYWdlIiwidG9BZGRyZXNzIiwiZW5jcnlwdGVkUmF3IiwiZW5jcnlwdCIsImNvbXB1dGVTZWNyZXQiLCJlbmNyeXB0ZWRNZXNzYWdlIiwiZ2V0RW5jcnlwdEFsZ29yaXRobUluSGV4IiwiYWRkTXlMb2NhbE1lc3NhZ2UiLCJnZXRFbmNyeXB0QWxnb3JpdGhtIiwiTUVTU0FHRVNfVVBEQVRFRCIsImRhdGEiLCJ1cGRhdGVMb2NhbE1lc3NhZ2UiLCJ0cmFuc2FjdGlvbkhhc2giLCJTRU5UX1NUQVRVUyIsIlNVQ0NFU1MiLCJGQUlMRUQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLEFBQU8sQUFBVTs7OztBQUNqQixBQUFPLEFBQXNCOzs7O0FBQzdCLEFBQU8sQUFBeUI7Ozs7QUFDaEMsQUFBTyxBQUFtQjs7OztBQUMxQixBQUFPLEFBQVk7Ozs7QUFDbkIsQUFBTyxBQUFjOzs7O0FBQ3JCLEFBQU8sQUFBVzs7OztBQUNsQixBQUFPOzs7Ozs7QUFFUDs7OztJQUlNLEEsa0JBQ0YseUJBQUEsQUFBWSxnQkFBWixBQUE0QixnQkFBZ0I7Z0JBQUE7O3dDQUFBOztTQUFBLEFBUTVDLHVGQUFjLG1CQUFBO3NFQUFBO3NCQUFBO2lEQUFBO3lCQUFBO3dDQUFBOytCQUNZLElBQUksY0FBQSxBQUFLLElBQVQsQUFBYSxTQUFTLEtBQUEsQUFBSyxNQUFNLG9CQUFqQyxBQUFzQixBQUE0QixZQUNoRSxpQkFBQSxBQUFPLElBRkwsQUFDWSxBQUNIOzt5QkFEbkI7OEJBRFUsQUFDTCxvQkFFTDs7Z0RBQUEsQUFBYztvQ0FDRixtQkFBQSxBQUFTLE1BSlgsQUFHVixBQUF1QixBQUNJO0FBREosQUFDbkI7O3lC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