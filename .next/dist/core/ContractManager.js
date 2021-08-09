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
    this.getJoinedAddress = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        var currentDataBlock, blockNumber, x;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        currentDataBlock = _this.storageManager.getCurrentDataBlock();
                        _context2.next = 3;
                        return _web2.default.eth.getBlockNumber();

                    case 3:
                        blockNumber = _context2.sent;
                        _context2.next = 6;
                        return _this.getPastEvents('addressJoinEvent', {
                            filter: { from: _this.accountManager.getAddress() },
                            fromBlock: currentDataBlock + 1,
                            toBlock: blockNumber
                        });

                    case 6:
                        x = _context2.sent;
                        return _context2.abrupt('return', x);

                    case 8:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, _this);
    }));

    this.getProfile = function () {
        var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(address) {
            var result, profile;
            return _regenerator2.default.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _context3.next = 2;
                            return _this.contract.methods.members(_this.accountManager.getAddress()).call();

                        case 2:
                            result = _context3.sent;
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
                            return _context3.abrupt('return', profile);

                        case 6:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, _this);
        }));

        return function (_x) {
            return _ref3.apply(this, arguments);
        };
    }();

    this.getMemberInfo = function () {
        var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(address, relationship) {
            var memberInfo, publicKey, name, avatarUrl;
            return _regenerator2.default.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            _context4.next = 2;
                            return _this.contract.methods.members(address).call();

                        case 2:
                            memberInfo = _context4.sent;

                            if (memberInfo.isMember) {
                                publicKey = '04' + memberInfo.publicKeyLeft.substr(2) + memberInfo.publicKeyRight.substr(2);
                                name = _Utils2.default.hexStringToAsciiString(memberInfo.name);
                                avatarUrl = _Utils2.default.hexStringToAsciiString(memberInfo.avatarUrl);

                                _this.storageManager.updateContact(address, publicKey, name, avatarUrl, relationship);
                            }

                        case 4:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, _this);
        }));

        return function (_x2, _x3) {
            return _ref4.apply(this, arguments);
        };
    }();

    this.getPastEvents = function () {
        var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(eventName, filters) {
            return _regenerator2.default.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            _context5.next = 2;
                            return _this.contract.getPastEvents(eventName, filters);

                        case 2:
                            return _context5.abrupt('return', _context5.sent);

                        case 3:
                        case 'end':
                            return _context5.stop();
                    }
                }
            }, _callee5, _this);
        }));

        return function (_x4, _x5) {
            return _ref5.apply(this, arguments);
        };
    }();

    this.joinContract = function () {
        var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(publicKeyBuffer, callback) {
            var publicKeyLeft, publicKeyRight;
            return _regenerator2.default.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            publicKeyLeft = '0x' + publicKeyBuffer.toString('hex', 0, 32);
                            publicKeyRight = '0x' + publicKeyBuffer.toString('hex', 32, 64);

                            // var profile = await this.getProfile(this.accountManager.getAddress())


                            try {
                                _this.transactionManager.executeMethod(_this.contract.methods.join(publicKeyLeft, publicKeyRight)).on(_Constant2.default.EVENT.ON_APPROVED, function (txHash) {
                                    console.log(1);
                                    window.localStorge.setItem("reload", 1);
                                    if (callback) callback(_Constant2.default.EVENT.ON_APPROVED);
                                }).on(_Constant2.default.EVENT.ON_REJECTED, function (txHash) {
                                    console.log(2);
                                    if (callback) callback(_Constant2.default.EVENT.ON_REJECTED);
                                }).on(_Constant2.default.EVENT.ON_RECEIPT, function (receipt) {
                                    console.log(3);
                                    if (callback) callback(_Constant2.default.EVENT.ON_RECEIPT);
                                }).on(_Constant2.default.EVENT.ON_ERROR, function (error, txHash) {
                                    console.log(4);
                                    _AppDispatcher2.default.dispatch({
                                        action: _Constant2.default.EVENT.ENCOUNTERED_ERROR,
                                        message: error.message,
                                        title: "Error"
                                    });
                                    if (callback) callback(_Constant2.default.EVENT.ON_ERROR);
                                });
                            } catch (error) {
                                _AppDispatcher2.default.dispatch({
                                    action: _Constant2.default.EVENT.ENCOUNTERED_ERROR,
                                    message: error.message,
                                    title: "Error"
                                });
                            }

                        case 3:
                        case 'end':
                            return _context6.stop();
                    }
                }
            }, _callee6, _this);
        }));

        return function (_x6, _x7) {
            return _ref6.apply(this, arguments);
        };
    }();

    this.addContact = function () {
        var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(address) {
            var memberInfo, publicKey;
            return _regenerator2.default.wrap(function _callee7$(_context7) {
                while (1) {
                    switch (_context7.prev = _context7.next) {
                        case 0:
                            console.log(address);
                            _context7.next = 3;
                            return _this.contract.methods.members(address).call();

                        case 3:
                            memberInfo = _context7.sent;

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
                            return _context7.stop();
                    }
                }
            }, _callee7, _this);
        }));

        return function (_x8) {
            return _ref7.apply(this, arguments);
        };
    }();

    this.acceptContactRequest = function () {
        var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(address, callback) {
            var method;
            return _regenerator2.default.wrap(function _callee8$(_context8) {
                while (1) {
                    switch (_context8.prev = _context8.next) {
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
                            return _context8.stop();
                    }
                }
            }, _callee8, _this);
        }));

        return function (_x9, _x10) {
            return _ref8.apply(this, arguments);
        };
    }();

    this.updateProfile = function () {
        var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(name, avatarUrl, callback) {
            var nameHex, avatarUrlHex, method;
            return _regenerator2.default.wrap(function _callee9$(_context9) {
                while (1) {
                    switch (_context9.prev = _context9.next) {
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
                            return _context9.stop();
                    }
                }
            }, _callee9, _this);
        }));

        return function (_x11, _x12, _x13) {
            return _ref9.apply(this, arguments);
        };
    }();

    this.sendMessage = function () {
        var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10(toAddress, publicKey, message) {
            var publicKeyBuffer, encryptedRaw, encryptedMessage, method;
            return _regenerator2.default.wrap(function _callee10$(_context10) {
                while (1) {
                    switch (_context10.prev = _context10.next) {
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
                            return _context10.stop();
                    }
                }
            }, _callee10, _this);
        }));

        return function (_x14, _x15, _x16) {
            return _ref10.apply(this, arguments);
        };
    }();

    this.getContract();
    this.accountManager = accountManager;
    this.storageManager = storageManager;
    this.transactionManager = new _TransactionManager2.default(accountManager);
}

// Create a web3 contract object that represent the ethereum smart contract


// Get current account profile from EtherChat contract's storage


// checkAcc = async (address) =>{
//     var memberInfo = await this.contract.methods.members(address).call();
//     console.log(memberInfo.isMember);

// }


// A message will be encrypted locally before sending to the smart contract
;

exports.default = ContractManager;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvQ29udHJhY3RNYW5hZ2VyLmpzIl0sIm5hbWVzIjpbIndlYjMiLCJjb21waWxlZENvbnRyYWN0IiwiVHJhbnNhY3Rpb25zTWFuYWdlciIsImFwcERpc3BhdGNoZXIiLCJDb25maWciLCJDb25zdGFudCIsInV0aWxzIiwiY3J5cHRvIiwiQ29udHJhY3RNYW5hZ2VyIiwiYWNjb3VudE1hbmFnZXIiLCJzdG9yYWdlTWFuYWdlciIsImdldENvbnRyYWN0IiwiZXRoIiwiQ29udHJhY3QiLCJKU09OIiwicGFyc2UiLCJpbnRlcmZhY2UiLCJFTlYiLCJDb250cmFjdEFkZHJlc3MiLCJjb250cmFjdCIsImRpc3BhdGNoIiwiYWN0aW9uIiwiRVZFTlQiLCJDT05UUkFDVF9SRUFEWSIsImdldEpvaW5lZEFkZHJlc3MiLCJjdXJyZW50RGF0YUJsb2NrIiwiZ2V0Q3VycmVudERhdGFCbG9jayIsImdldEJsb2NrTnVtYmVyIiwiYmxvY2tOdW1iZXIiLCJnZXRQYXN0RXZlbnRzIiwiZmlsdGVyIiwiZnJvbSIsImdldEFkZHJlc3MiLCJmcm9tQmxvY2siLCJ0b0Jsb2NrIiwieCIsImdldFByb2ZpbGUiLCJhZGRyZXNzIiwibWV0aG9kcyIsIm1lbWJlcnMiLCJjYWxsIiwicmVzdWx0IiwicHJvZmlsZSIsImlzTWVtYmVyIiwiaXNKb2luZWQiLCJhdmF0YXJVcmwiLCJoZXhTdHJpbmdUb0FzY2lpU3RyaW5nIiwibmFtZSIsInNldEpvaW5lZFN0YXR1cyIsInNldE5hbWUiLCJzZXRBdmF0YXJVcmwiLCJBQ0NPVU5UX0lORk9fVVBEQVRFRCIsImdldE1lbWJlckluZm8iLCJyZWxhdGlvbnNoaXAiLCJtZW1iZXJJbmZvIiwicHVibGljS2V5IiwicHVibGljS2V5TGVmdCIsInN1YnN0ciIsInB1YmxpY0tleVJpZ2h0IiwidXBkYXRlQ29udGFjdCIsImV2ZW50TmFtZSIsImZpbHRlcnMiLCJqb2luQ29udHJhY3QiLCJwdWJsaWNLZXlCdWZmZXIiLCJjYWxsYmFjayIsInRvU3RyaW5nIiwidHJhbnNhY3Rpb25NYW5hZ2VyIiwiZXhlY3V0ZU1ldGhvZCIsImpvaW4iLCJvbiIsIk9OX0FQUFJPVkVEIiwidHhIYXNoIiwiY29uc29sZSIsImxvZyIsIndpbmRvdyIsImxvY2FsU3RvcmdlIiwic2V0SXRlbSIsIk9OX1JFSkVDVEVEIiwiT05fUkVDRUlQVCIsInJlY2VpcHQiLCJPTl9FUlJPUiIsImVycm9yIiwiRU5DT1VOVEVSRURfRVJST1IiLCJtZXNzYWdlIiwidGl0bGUiLCJhZGRDb250YWN0IiwiYWNjZXB0Q29udGFjdFJlcXVlc3QiLCJtZXRob2QiLCJ1cGRhdGVQcm9maWxlIiwibmFtZUhleCIsIkJ1ZmZlciIsImF2YXRhclVybEhleCIsInNlbmRNZXNzYWdlIiwidG9BZGRyZXNzIiwiZW5jcnlwdGVkUmF3IiwiZW5jcnlwdCIsImNvbXB1dGVTZWNyZXQiLCJlbmNyeXB0ZWRNZXNzYWdlIiwiZ2V0RW5jcnlwdEFsZ29yaXRobUluSGV4IiwiYWRkTXlMb2NhbE1lc3NhZ2UiLCJnZXRFbmNyeXB0QWxnb3JpdGhtIiwiTUVTU0FHRVNfVVBEQVRFRCIsImRhdGEiLCJ1cGRhdGVMb2NhbE1lc3NhZ2UiLCJ0cmFuc2FjdGlvbkhhc2giLCJTRU5UX1NUQVRVUyIsIlNVQ0NFU1MiLCJGQUlMRUQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLEFBQU8sQUFBVTs7OztBQUNqQixBQUFPLEFBQXNCOzs7O0FBQzdCLEFBQU8sQUFBeUI7Ozs7QUFDaEMsQUFBTyxBQUFtQjs7OztBQUMxQixBQUFPLEFBQVk7Ozs7QUFDbkIsQUFBTyxBQUFjOzs7O0FBQ3JCLEFBQU8sQUFBVzs7OztBQUNsQixBQUFPOzs7Ozs7QUFFUDs7OztJLEFBSU0sa0JBQ0YseUJBQUEsQUFBWSxnQkFBWixBQUE0QixnQkFBZ0I7Z0JBQUE7O3dDQUFBOztTQUFBLEFBVTVDLHVGQUFjLG1CQUFBO3NFQUFBO3NCQUFBO2lEQUFBO3lCQUFBO3dDQUFBOytCQUNZLElBQUksY0FBQSxBQUFLLElBQVQsQUFBYSxT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QUFBLEFBUUssR0FBRyxtQkFBQSxBQUFTLE1BUmpCLEFBUXVCLGFBQWEsVUFBQSxBQUFDLE1BQVMsQUFDdEM7QUFDSDtBQVZMLCtCQUFBLEFBV0ssR0FBRyxtQkFBQSxBQUFTLE1BWGpCLEFBV3VCLFlBQVksVUFBQSxBQUFDLFNBQWMsQUFDMUM7c0NBQUEsQUFBSyxlQUFMLEFBQW9CLG1CQUFwQixBQUF1QyxXQUFXLFFBQWxELEFBQTBELGlCQUFpQixtQkFBQSxBQUFTLFlBQXBGLEFBQWdHLEFBQ2hHO3dEQUFBLEFBQWM7NENBQ0YsbUJBQUEsQUFBUyxNQURFLEFBQ0ksQUFDdkI7MENBRkosQUFBdUIsQUFFYixBQUViO0FBSjBCLEFBQ25CO0FBZFosK0JBQUEsQUFrQkssR0FBRyxtQkFBQSxBQUFTLE1BbEJqQixBQWtCdUIsVUFBVSxVQUFBLEFBQUMsT0FBRCxBQUFRLFFBQVcsQUFDNUM7c0NBQUEsQUFBSyxlQUFMLEFBQW9CLG1CQUFwQixBQUF1QyxXQUF2QyxBQUFrRCxRQUFRLG1CQUFBLEFBQVMsWUFBbkUsQUFBK0UsQUFDL0U7d0RBQUEsQUFBYzs0Q0FDRixtQkFBQSxBQUFTLE1BREUsQUFDSSxBQUN2QjswQ0FGSixBQUF1QixBQUViLEFBRWI7QUFKMEIsQUFDbkI7QUE1QkYsQUFPVjs7NkJBUFU7NkJBQUE7OENBQUE7O0FBQUE7MEJBQUE7QUEzTDhCOzsyQ0FBQTtzQ0FBQTtBQUFBO0FBQ3hDOztTQUFBLEFBQUssQUFDTDtTQUFBLEFBQUssaUJBQUwsQUFBc0IsQUFDdEI7U0FBQSxBQUFLLGlCQUFMLEFBQXNCLEFBQ3RCO1NBQUEsQUFBSyxxQkFBcUIsQUFBSSxpQ0FBOUIsQUFBMEIsQUFBd0IsQUFHckQ7OztBQUVEOzs7QUFxQkE7OztBQStCQTtBQUNBO0FBQ0E7O0FBRUE7OztBQXlIQSxBQW9DSjs7O2tCQUFBLEFBQWUiLCJmaWxlIjoiQ29udHJhY3RNYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3ZpY3RvcnBoYW0xOTk3L1dvcmtwbGFjZS9TVVRELzUwMDM3X2Jsb2NrY2hhaW4vYmxvY2tjaGFpbi1wcm9qIn0=