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

var _AppDispatcher = require('../core/AppDispatcher');

var _AppDispatcher2 = _interopRequireDefault(_AppDispatcher);

var _Constant = require('../support/Constant');

var _Constant2 = _interopRequireDefault(_Constant);

var _Utils = require('../support/Utils');

var _Utils2 = _interopRequireDefault(_Utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// EventHandler object currently make requests to the smart contract periodically 
//    to get events initiated by the contract.

// Copyright (c) 2018 Nguyen Vu Nhat Minh
// Distributed under the MIT software license, see the accompanying file LICENSE

var EventHandler = function EventHandler(myAddress, contractManager, storageManager) {
    var _this = this;

    (0, _classCallCheck3.default)(this, EventHandler);

    this.pullContactEvents = function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(blockNumber, currentDataBlock) {
            var myRequestEvents, invitationEvents, i, myAcceptContactEvents, acceptContactEvents, fromAddress, profileUpdateEvents, eventData;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return _this.contractManager.getPastEvents('addContactEvent', {
                                filter: { from: _this.myAddress },
                                fromBlock: currentDataBlock + 1,
                                toBlock: blockNumber
                            });

                        case 2:
                            myRequestEvents = _context.sent;

                            _this.storageManager.addRequestEvents(myRequestEvents);

                            // Get list of invitation requests from other users send to the current user
                            _context.next = 6;
                            return _this.contractManager.getPastEvents('addContactEvent', {
                                filter: { to: _this.myAddress },
                                fromBlock: currentDataBlock + 1,
                                toBlock: blockNumber
                            });

                        case 6:
                            invitationEvents = _context.sent;

                            _this.storageManager.addInvitationEvents(invitationEvents);

                            i = 0;

                        case 9:
                            if (!(i < myRequestEvents.length)) {
                                _context.next = 15;
                                break;
                            }

                            _context.next = 12;
                            return _this.contractManager.getMemberInfo(myRequestEvents[i].returnValues.to, _Constant2.default.Relationship.Requested);

                        case 12:
                            i++;
                            _context.next = 9;
                            break;

                        case 15:
                            i = 0;

                        case 16:
                            if (!(i < invitationEvents.length)) {
                                _context.next = 22;
                                break;
                            }

                            _context.next = 19;
                            return _this.contractManager.getMemberInfo(invitationEvents[i].returnValues.from, _Constant2.default.Relationship.NoRelation);

                        case 19:
                            i++;
                            _context.next = 16;
                            break;

                        case 22:
                            _context.next = 24;
                            return _this.contractManager.getPastEvents('acceptContactEvent', {
                                filter: { from: _this.myAddress },
                                fromBlock: currentDataBlock + 1,
                                toBlock: blockNumber
                            });

                        case 24:
                            myAcceptContactEvents = _context.sent;

                            _this.storageManager.addMyAcceptContactEvents(myAcceptContactEvents);

                            _context.next = 28;
                            return _this.contractManager.getPastEvents('acceptContactEvent', {
                                filter: { to: _this.myAddress },
                                fromBlock: currentDataBlock + 1,
                                toBlock: blockNumber
                            });

                        case 28:
                            acceptContactEvents = _context.sent;

                            _this.storageManager.addAcceptContactEvents(acceptContactEvents);

                            // If the one who accept our contact doesn't have publicKey yet 
                            // we need to get it from the smart contract
                            i = 0;

                        case 31:
                            if (!(i < acceptContactEvents.length)) {
                                _context.next = 39;
                                break;
                            }

                            fromAddress = acceptContactEvents[i].returnValues.from;

                            if (_this.storageManager.contacts[fromAddress].publicKey) {
                                _context.next = 36;
                                break;
                            }

                            _context.next = 36;
                            return _this.contractManager.getMemberInfo(fromAddress, _Constant2.default.Relationship.Connected);

                        case 36:
                            i++;
                            _context.next = 31;
                            break;

                        case 39:
                            _context.next = 41;
                            return _this.contractManager.getPastEvents('profileUpdateEvent', {
                                filter: { from: _this.storageManager.contactAddresses },
                                fromBlock: currentDataBlock + 1,
                                toBlock: blockNumber
                            });

                        case 41:
                            profileUpdateEvents = _context.sent;

                            for (i = 0; i < profileUpdateEvents.length; i++) {
                                eventData = profileUpdateEvents[i].returnValues;

                                _this.storageManager.updateContact(eventData.from, "", _Utils2.default.hexStringToAsciiString(eventData.name), _Utils2.default.hexStringToAsciiString(eventData.avatarUrl), 0);
                            }

                            if (myRequestEvents.length > 0 || invitationEvents.length > 0 || profileUpdateEvents.length > 0 || myAcceptContactEvents.length > 0 || acceptContactEvents.length > 0) {

                                _AppDispatcher2.default.dispatch({
                                    action: _Constant2.default.EVENT.CONTACT_LIST_UPDATED
                                });
                            }

                        case 44:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this);
        }));

        return function (_x, _x2) {
            return _ref.apply(this, arguments);
        };
    }();

    this.pullMessageEvents = function () {
        var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(blockNumber, currentDataBlock) {
            var messagesSent, messagesReceived, iSent, iReceived;
            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.next = 2;
                            return _this.contractManager.getPastEvents('messageSentEvent', {
                                filter: { from: _this.myAddress },
                                fromBlock: currentDataBlock + 1,
                                toBlock: blockNumber
                            });

                        case 2:
                            messagesSent = _context2.sent;
                            _context2.next = 5;
                            return _this.contractManager.getPastEvents('messageSentEvent', {
                                filter: { to: _this.myAddress },
                                fromBlock: currentDataBlock + 1,
                                toBlock: blockNumber
                            });

                        case 5:
                            messagesReceived = _context2.sent;
                            iSent = 0;
                            iReceived = 0;

                            while (iSent < messagesSent.length || iReceived < messagesReceived.length) {
                                if (iSent >= messagesSent.length) {
                                    _this.storageManager.addMessageFromFriendEvent(messagesReceived[iReceived]);
                                    iReceived++;
                                } else if (iReceived >= messagesReceived.length) {
                                    _this.storageManager.addMyMessageEvent(messagesSent[iSent]);
                                    iSent++;
                                } else {
                                    if (messagesSent[iSent].blockNumber < messagesReceived[iReceived].blockNumber) {
                                        _this.storageManager.addMyMessageEvent(messagesSent[iSent]);
                                        iSent++;
                                    } else {
                                        _this.storageManager.addMessageFromFriendEvent(messagesReceived[iReceived]);
                                        iReceived++;
                                    }
                                }
                            }

                            if (messagesReceived.length > 0 || messagesSent.length > 0) {
                                _AppDispatcher2.default.dispatch({
                                    action: _Constant2.default.EVENT.MESSAGES_UPDATED
                                });
                            }

                        case 10:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, _this);
        }));

        return function (_x3, _x4) {
            return _ref2.apply(this, arguments);
        };
    }();

    this.pullEvents = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
        var currentDataBlock, blockNumber;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.prev = 0;

                        // Get the last updated block number
                        currentDataBlock = _this.storageManager.getCurrentDataBlock();
                        _context3.next = 4;
                        return _web2.default.eth.getBlockNumber();

                    case 4:
                        blockNumber = _context3.sent;

                        if (!(blockNumber > currentDataBlock)) {
                            _context3.next = 11;
                            break;
                        }

                        _context3.next = 8;
                        return _this.pullContactEvents(blockNumber, currentDataBlock);

                    case 8:
                        _context3.next = 10;
                        return _this.pullMessageEvents(blockNumber, currentDataBlock);

                    case 10:
                        _this.storageManager.setCurrentDataBlock(blockNumber);

                    case 11:
                        _context3.next = 16;
                        break;

                    case 13:
                        _context3.prev = 13;
                        _context3.t0 = _context3['catch'](0);

                        console.log(_context3.t0.message);

                    case 16:

                        setTimeout(_this.pullEvents, 5000);

                    case 17:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, _this, [[0, 13]]);
    }));

    this.start = function () {
        _this.pullEvents();
    };

    this.myAddress = myAddress;
    this.contractManager = contractManager;
    this.storageManager = storageManager;
};

exports.default = EventHandler;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvRXZlbnRIYW5kbGVyLmpzIl0sIm5hbWVzIjpbIndlYjMiLCJhcHBEaXNwYXRjaGVyIiwiQ29uc3RhbnQiLCJ1dGlscyIsIkV2ZW50SGFuZGxlciIsIm15QWRkcmVzcyIsImNvbnRyYWN0TWFuYWdlciIsInN0b3JhZ2VNYW5hZ2VyIiwicHVsbENvbnRhY3RFdmVudHMiLCJibG9ja051bWJlciIsImN1cnJlbnREYXRhQmxvY2siLCJnZXRQYXN0RXZlbnRzIiwiZmlsdGVyIiwiZnJvbSIsImZyb21CbG9jayIsInRvQmxvY2siLCJteVJlcXVlc3RFdmVudHMiLCJhZGRSZXF1ZXN0RXZlbnRzIiwidG8iLCJpbnZpdGF0aW9uRXZlbnRzIiwiYWRkSW52aXRhdGlvbkV2ZW50cyIsImkiLCJsZW5ndGgiLCJnZXRNZW1iZXJJbmZvIiwicmV0dXJuVmFsdWVzIiwiUmVsYXRpb25zaGlwIiwiUmVxdWVzdGVkIiwiTm9SZWxhdGlvbiIsIm15QWNjZXB0Q29udGFjdEV2ZW50cyIsImFkZE15QWNjZXB0Q29udGFjdEV2ZW50cyIsImFjY2VwdENvbnRhY3RFdmVudHMiLCJhZGRBY2NlcHRDb250YWN0RXZlbnRzIiwiZnJvbUFkZHJlc3MiLCJjb250YWN0cyIsInB1YmxpY0tleSIsIkNvbm5lY3RlZCIsImNvbnRhY3RBZGRyZXNzZXMiLCJwcm9maWxlVXBkYXRlRXZlbnRzIiwiZXZlbnREYXRhIiwidXBkYXRlQ29udGFjdCIsImhleFN0cmluZ1RvQXNjaWlTdHJpbmciLCJuYW1lIiwiYXZhdGFyVXJsIiwiZGlzcGF0Y2giLCJhY3Rpb24iLCJFVkVOVCIsIkNPTlRBQ1RfTElTVF9VUERBVEVEIiwicHVsbE1lc3NhZ2VFdmVudHMiLCJtZXNzYWdlc1NlbnQiLCJtZXNzYWdlc1JlY2VpdmVkIiwiaVNlbnQiLCJpUmVjZWl2ZWQiLCJhZGRNZXNzYWdlRnJvbUZyaWVuZEV2ZW50IiwiYWRkTXlNZXNzYWdlRXZlbnQiLCJNRVNTQUdFU19VUERBVEVEIiwicHVsbEV2ZW50cyIsImdldEN1cnJlbnREYXRhQmxvY2siLCJldGgiLCJnZXRCbG9ja051bWJlciIsInNldEN1cnJlbnREYXRhQmxvY2siLCJjb25zb2xlIiwibG9nIiwibWVzc2FnZSIsInNldFRpbWVvdXQiLCJzdGFydCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0EsQUFBTyxBQUFVOzs7O0FBQ2pCLEFBQU8sQUFBbUI7Ozs7QUFDMUIsQUFBTyxBQUFjOzs7O0FBQ3JCLEFBQU8sQUFBVzs7Ozs7O0FBRWxCO0FBQ0E7O0FBVEE7QUFDQTs7SSxBQVVNLGVBQ0Ysc0JBQUEsQUFBWSxXQUFaLEFBQXVCLGlCQUF2QixBQUF3QyxnQkFBZ0I7Z0JBQUE7O3dDQUFBOztTQUFBLEFBTXhELGdDQU53RDs0RkFNcEMsaUJBQUEsQUFBTyxhQUFQLEFBQW9CLGtCQUFwQjtvSUFBQTswRUFBQTswQkFBQTtxREFBQTs2QkFBQTs0Q0FBQTt5Q0FHWSxBQUFLLGdCQUFMLEFBQXFCLGNBQXJCLEFBQW1DO3dDQUNuRCxFQUFDLE1BQU0sTUFEK0QsQUFDdEUsQUFBWSxBQUNwQjsyQ0FBVyxtQkFGbUUsQUFFbEQsQUFDNUI7eUNBTlksQUFHWSxBQUFzRCxBQUdyRTtBQUhxRSxBQUM5RSw2QkFEd0I7OzZCQUF4QjtBQUhZLHVEQVFoQjs7a0NBQUEsQUFBSyxlQUFMLEFBQW9CLGlCQUFwQixBQUFxQyxBQUVyQzs7QUFWZ0I7NENBQUE7eUNBV2EsQUFBSyxnQkFBTCxBQUFxQixjQUFyQixBQUFtQzt3Q0FDcEQsRUFBQyxJQUFJLE1BRGtFLEFBQ3ZFLEFBQVUsQUFDbEI7MkNBQVcsbUJBRm9FLEFBRW5ELEFBQzVCO3lDQWRZLEFBV2EsQUFBc0QsQUFHdEU7QUFIc0UsQUFDL0UsNkJBRHlCOzs2QkFBekI7QUFYWSx3REFnQmhCOztrQ0FBQSxBQUFLLGVBQUwsQUFBb0Isb0JBQXBCLEFBQXdDLEFBRS9COztBQWxCTyxnQ0FBQSxBQWtCTDs7NkJBbEJLO2tDQWtCSCxJQUFFLGdCQWxCQyxBQWtCZSxTQWxCZjtnREFBQTtBQUFBO0FBQUE7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QUFrQixhQUF0QyxBQUFzQyxBQUFhLEFBQ25EO0FBQ0g7QUFIRCwyQ0FHTyxBQUNIOzhDQUFBLEFBQUssZUFBTCxBQUFvQiwwQkFBMEIsaUJBQTlDLEFBQThDLEFBQWlCLEFBQy9EO0FBQ0g7QUFDSjtBQUNKO0FBRUQ7O2dDQUFJLGlCQUFBLEFBQWlCLFNBQWpCLEFBQTBCLEtBQUssYUFBQSxBQUFhLFNBQWhELEFBQXlELEdBQUcsQUFDeEQ7d0RBQUEsQUFBYzs0Q0FDRixtQkFBQSxBQUFTLE1BRHJCLEFBQXVCLEFBQ0ksQUFFOUI7QUFIMEIsQUFDbkI7QUFsQ1E7OzZCQUFBOzZCQUFBOzZDQUFBOztBQUFBO3lCQUFBO0FBOUVvQzs7bUNBQUE7cUNBQUE7QUFBQTtBQUFBOztTQUFBLEFBcUh4RCxzRkFBYSxvQkFBQTs4QkFBQTt3RUFBQTtzQkFBQTttREFBQTt5QkFBQTt5Q0FFTDs7QUFDSTtBQUhDLDJDQUdrQixNQUFBLEFBQUssZUFIdkIsQUFHa0IsQUFBb0I7eUNBSHRDOytCQUttQixjQUFBLEFBQUssSUFMeEIsQUFLbUIsQUFBUzs7eUJBQTdCO0FBTEMsZ0RBQUE7OzhCQU9ELGNBUEMsQUFPYSxtQkFQYjs2Q0FBQTtBQUFBO0FBQUE7O3lDQUFBOytCQVFLLE1BQUEsQUFBSyxrQkFBTCxBQUF1QixhQVI1QixBQVFLLEFBQW9DOzt5QkFSekM7eUNBQUE7K0JBU0ssTUFBQSxBQUFLLGtCQUFMLEFBQXVCLGFBVDVCLEFBU0ssQUFBb0M7O3lCQUMxQzs4QkFBQSxBQUFLLGVBQUwsQUFBb0Isb0JBVm5CLEFBVUQsQUFBd0M7O3lCQVZ2Qzt5Q0FBQTtBQUFBOzt5QkFBQTt5Q0FBQTswREFjTDs7Z0NBQUEsQUFBUSxJQUFJLGFBZFAsQUFjTCxBQUFnQjs7eUJBR3BCOzttQ0FBVyxNQUFYLEFBQWdCLFlBakJQLEFBaUJULEFBQTRCOzt5QkFqQm5CO3lCQUFBO3lDQUFBOztBQUFBO2lDQUFBO0FBckgyQzs7U0FBQSxBQXlJeEQsUUFBUSxZQUFNLEFBQ1Y7Y0FBQSxBQUFLLEFBQ1I7QUEzSXVELEFBQ3BEOztTQUFBLEFBQUssWUFBTCxBQUFpQixBQUNqQjtTQUFBLEFBQUssa0JBQUwsQUFBdUIsQUFDdkI7U0FBQSxBQUFLLGlCQUFMLEFBQXNCLEFBQ3pCO0EsQUEwSUw7O2tCQUFBLEFBQWUiLCJmaWxlIjoiRXZlbnRIYW5kbGVyLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3ZpY3RvcnBoYW0xOTk3L1dvcmtwbGFjZS9TVVRELzUwMDM3X2Jsb2NrY2hhaW4vYmxvY2tjaGFpbi1wcm9qIn0=