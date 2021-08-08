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

    this.pullContactInfo = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        var contactAddresses, i;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        contactAddresses = _this.storageManager.contactAddresses;

                        console.log(contactAddresses);

                        i = 0;

                    case 3:
                        if (!(i < contactAddresses.length)) {
                            _context2.next = 9;
                            break;
                        }

                        _context2.next = 6;
                        return _this.contractManager.getMemberInfo(contactAddresses[i], _Constant2.default.Relationship.Connected);

                    case 6:
                        i++;
                        _context2.next = 3;
                        break;

                    case 9:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, _this);
    }));

    this.pullMessageEvents = function () {
        var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(blockNumber, currentDataBlock) {
            var messagesSent, messagesReceived, iSent, iReceived;
            return _regenerator2.default.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _context3.next = 2;
                            return _this.contractManager.getPastEvents('messageSentEvent', {
                                filter: { from: _this.myAddress },
                                fromBlock: currentDataBlock + 1,
                                toBlock: blockNumber
                            });

                        case 2:
                            messagesSent = _context3.sent;
                            _context3.next = 5;
                            return _this.contractManager.getPastEvents('messageSentEvent', {
                                filter: { to: _this.myAddress },
                                fromBlock: currentDataBlock + 1,
                                toBlock: blockNumber
                            });

                        case 5:
                            messagesReceived = _context3.sent;
                            iSent = 0;
                            iReceived = 0;
                            // console.log(messagesReceived[0]);

                            console.log(messagesSent.length, messagesReceived.length);
                            console.log("--------------------");

                        case 10:
                            if (!(iSent < messagesSent.length || iReceived < messagesReceived.length)) {
                                _context3.next = 38;
                                break;
                            }

                            if (!(iSent >= messagesSent.length)) {
                                _context3.next = 18;
                                break;
                            }

                            _context3.next = 14;
                            return _this.contractManager.addContact(messagesReceived[iReceived].returnValues.from);

                        case 14:
                            _this.storageManager.addMessageFromFriendEvent(messagesReceived[iReceived]);
                            iReceived++;
                            _context3.next = 36;
                            break;

                        case 18:
                            if (!(iReceived >= messagesReceived.length)) {
                                _context3.next = 25;
                                break;
                            }

                            _context3.next = 21;
                            return _this.contractManager.addContact(messagesSent[iSent].returnValues.to);

                        case 21:
                            _this.storageManager.addMyMessageEvent(messagesSent[iSent]);
                            iSent++;
                            _context3.next = 36;
                            break;

                        case 25:
                            if (!(messagesSent[iSent].blockNumber < messagesReceived[iReceived].blockNumber)) {
                                _context3.next = 32;
                                break;
                            }

                            _context3.next = 28;
                            return _this.contractManager.addContact(messagesSent[iSent].returnValues.to);

                        case 28:
                            _this.storageManager.addMyMessageEvent(messagesSent[iSent]);
                            iSent++;
                            _context3.next = 36;
                            break;

                        case 32:
                            _context3.next = 34;
                            return _this.contractManager.addContact(messagesReceived[iReceived].returnValues.from);

                        case 34:
                            _this.storageManager.addMessageFromFriendEvent(messagesReceived[iReceived]);
                            iReceived++;

                        case 36:
                            _context3.next = 10;
                            break;

                        case 38:

                            if (messagesReceived.length > 0 || messagesSent.length > 0) {
                                _AppDispatcher2.default.dispatch({
                                    action: _Constant2.default.EVENT.MESSAGES_UPDATED
                                });
                            }

                        case 39:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, _this);
        }));

        return function (_x3, _x4) {
            return _ref3.apply(this, arguments);
        };
    }();

    this.pullEvents = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
        var currentDataBlock, blockNumber;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        _context4.prev = 0;

                        // Get the last updated block number
                        currentDataBlock = _this.storageManager.getCurrentDataBlock();
                        _context4.next = 4;
                        return _web2.default.eth.getBlockNumber();

                    case 4:
                        blockNumber = _context4.sent;

                        if (!(blockNumber > currentDataBlock)) {
                            _context4.next = 11;
                            break;
                        }

                        _context4.next = 8;
                        return _this.pullMessageEvents(blockNumber, currentDataBlock);

                    case 8:
                        _context4.next = 10;
                        return _this.pullContactInfo();

                    case 10:
                        _this.storageManager.setCurrentDataBlock(blockNumber);

                    case 11:
                        _context4.next = 16;
                        break;

                    case 13:
                        _context4.prev = 13;
                        _context4.t0 = _context4['catch'](0);

                        console.log(_context4.t0.message);

                    case 16:

                        setTimeout(_this.pullEvents, 5000);

                    case 17:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, _this, [[0, 13]]);
    }));

    this.start = function () {
        _this.pullEvents();
    };

    this.myAddress = myAddress;
    this.contractManager = contractManager;
    this.storageManager = storageManager;
};

exports.default = EventHandler;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvRXZlbnRIYW5kbGVyLmpzIl0sIm5hbWVzIjpbIndlYjMiLCJhcHBEaXNwYXRjaGVyIiwiQ29uc3RhbnQiLCJ1dGlscyIsIkV2ZW50SGFuZGxlciIsIm15QWRkcmVzcyIsImNvbnRyYWN0TWFuYWdlciIsInN0b3JhZ2VNYW5hZ2VyIiwicHVsbENvbnRhY3RFdmVudHMiLCJibG9ja051bWJlciIsImN1cnJlbnREYXRhQmxvY2siLCJnZXRQYXN0RXZlbnRzIiwiZmlsdGVyIiwiZnJvbSIsImZyb21CbG9jayIsInRvQmxvY2siLCJteVJlcXVlc3RFdmVudHMiLCJhZGRSZXF1ZXN0RXZlbnRzIiwidG8iLCJpbnZpdGF0aW9uRXZlbnRzIiwiYWRkSW52aXRhdGlvbkV2ZW50cyIsImkiLCJsZW5ndGgiLCJnZXRNZW1iZXJJbmZvIiwicmV0dXJuVmFsdWVzIiwiUmVsYXRpb25zaGlwIiwiUmVxdWVzdGVkIiwiTm9SZWxhdGlvbiIsIm15QWNjZXB0Q29udGFjdEV2ZW50cyIsImFkZE15QWNjZXB0Q29udGFjdEV2ZW50cyIsImFjY2VwdENvbnRhY3RFdmVudHMiLCJhZGRBY2NlcHRDb250YWN0RXZlbnRzIiwiZnJvbUFkZHJlc3MiLCJjb250YWN0cyIsInB1YmxpY0tleSIsIkNvbm5lY3RlZCIsImNvbnRhY3RBZGRyZXNzZXMiLCJwcm9maWxlVXBkYXRlRXZlbnRzIiwiZXZlbnREYXRhIiwidXBkYXRlQ29udGFjdCIsImhleFN0cmluZ1RvQXNjaWlTdHJpbmciLCJuYW1lIiwiYXZhdGFyVXJsIiwiZGlzcGF0Y2giLCJhY3Rpb24iLCJFVkVOVCIsIkNPTlRBQ1RfTElTVF9VUERBVEVEIiwicHVsbENvbnRhY3RJbmZvIiwiY29uc29sZSIsImxvZyIsInB1bGxNZXNzYWdlRXZlbnRzIiwibWVzc2FnZXNTZW50IiwibWVzc2FnZXNSZWNlaXZlZCIsImlTZW50IiwiaVJlY2VpdmVkIiwiYWRkQ29udGFjdCIsImFkZE1lc3NhZ2VGcm9tRnJpZW5kRXZlbnQiLCJhZGRNeU1lc3NhZ2VFdmVudCIsIk1FU1NBR0VTX1VQREFURUQiLCJwdWxsRXZlbnRzIiwiZ2V0Q3VycmVudERhdGFCbG9jayIsImV0aCIsImdldEJsb2NrTnVtYmVyIiwic2V0Q3VycmVudERhdGFCbG9jayIsIm1lc3NhZ2UiLCJzZXRUaW1lb3V0Iiwic3RhcnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUdBLEFBQU8sQUFBVTs7OztBQUNqQixBQUFPLEFBQW1COzs7O0FBQzFCLEFBQU8sQUFBYzs7OztBQUNyQixBQUFPLEFBQVc7Ozs7OztBQUVsQjtBQUNBOztBQVRBO0FBQ0E7O0ksQUFVTSxlQUNGLHNCQUFBLEFBQVksV0FBWixBQUF1QixpQkFBdkIsQUFBd0MsZ0JBQWdCO2dCQUFBOzt3Q0FBQTs7U0FBQSxBQU14RCxnQ0FOd0Q7NEZBTXBDLGlCQUFBLEFBQU8sYUFBUCxBQUFvQixrQkFBcEI7b0lBQUE7MEVBQUE7MEJBQUE7cURBQUE7NkJBQUE7NENBQUE7eUNBR1ksQUFBSyxnQkFBTCxBQUFxQixjQUFyQixBQUFtQzt3Q0FDbkQsRUFBQyxNQUFNLE1BRCtELEFBQ3RFLEFBQVksQUFDcEI7MkNBQVcsbUJBRm1FLEFBRWxELEFBQzVCO3lDQU5ZLEFBR1ksQUFBc0QsQUFHckU7QUFIcUUsQUFDOUUsNkJBRHdCOzs2QkFBeEI7QUFIWSx1REFRaEI7O2tDQUFBLEFBQUssZUFBTCxBQUFvQixpQkFBcEIsQUFBcUMsQUFFckM7O0FBVmdCOzRDQUFBO3lDQVdhLEFBQUssZ0JBQUwsQUFBcUIsY0FBckIsQUFBbUM7d0NBQ3BELEVBQUMsSUFBSSxNQURrRSxBQUN2RSxBQUFVLEFBQ2xCOzJDQUFXLG1CQUZvRSxBQUVuRCxBQUM1Qjt5Q0FkWSxBQVdhLEFBQXNELEFBR3RFO0FBSHNFLEFBQy9FLDZCQUR5Qjs7NkJBQXpCO0FBWFksd0RBZ0JoQjs7a0NBQUEsQUFBSyxlQUFMLEFBQW9CLG9CQUFwQixBQUF3QyxBQUUvQjs7QUFsQk8sZ0NBQUEsQUFrQkw7OzZCQWxCSztrQ0FrQkgsSUFBRSxnQkFs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LGlCQUFBLEFBQWlCLFdBQWpCLEFBQTRCLGFBbkM5RCxBQW1DRSxBQUF5RTs7NkJBQy9FO2tDQUFBLEFBQUssZUFBTCxBQUFvQiwwQkFBMEIsaUJBQTlDLEFBQThDLEFBQWlCLEFBQy9EO0FBckNJOzs2QkFBQTs2Q0FBQTtBQUFBOzs2QkEwQ2hCOztnQ0FBSSxpQkFBQSxBQUFpQixTQUFqQixBQUEwQixLQUFLLGFBQUEsQUFBYSxTQUFoRCxBQUF5RCxHQUFHLEFBQ3hEO3dEQUFBLEFBQWM7NENBQ0YsbUJBQUEsQUFBUyxNQURyQixBQUF1QixBQUNJLEFBRTlCO0FBSDBCLEFBQ25CO0FBNUNROzs2QkFBQTs2QkFBQTs2Q0FBQTs7QUFBQTt5QkFBQTtBQXRGb0M7O21DQUFBO3FDQUFBO0FBQUE7QUFBQTs7U0FBQSxBQXVJeEQsc0ZBQWEsb0JBQUE7OEJBQUE7d0VBQUE7c0JBQUE7bURBQUE7eUJBQUE7eUNBRUw7O0FBQ0k7QUFIQywyQ0FHa0IsTUFBQSxBQUFLLGVBSHZCLEFBR2tCLEFBQW9CO3lDQUh0QzsrQkFLbUIsY0FBQSxBQUFLLElBTHhCLEFBS21CLEFBQVM7O3lCQUE3QjtBQUxDLGdEQUFBOzs4QkFPRCxjQVBDLEFBT2EsbUJBUGI7NkNBQUE7QUFBQTtBQUFBOzt5Q0FBQTsrQkFTSyxNQUFBLEFBQUssa0JBQUwsQUFBdUIsYUFUNUIsQUFTSyxBQUFvQzs7eUJBVHpDO3lDQUFBOytCQVVLLE1BVkwsQUFVSyxBQUFLOzt5QkFDWDs4QkFBQSxBQUFLLGVBQUwsQUFBb0Isb0JBWG5CLEFBV0QsQUFBd0M7O3lCQVh2Qzt5Q0FBQTtBQUFBOzt5QkFBQTt5Q0FBQTswREFlTDs7Z0NBQUEsQUFBUSxJQUFJLGFBZlAsQUFlTCxBQUFnQjs7eUJBR3BCOzttQ0FBVyxNQUFYLEFBQWdCLFlBbEJQLEFBa0JULEFBQTRCOzt5QkFsQm5CO3lCQUFBO3lDQUFBOztBQUFBO2lDQUFBO0FBdkkyQzs7U0FBQSxBQTRKeEQsUUFBUSxZQUFNLEFBQ1Y7Y0FBQSxBQUFLLEFBQ1I7QUE5SnVELEFBQ3BEOztTQUFBLEFBQUssWUFBTCxBQUFpQixBQUNqQjtTQUFBLEFBQUssa0JBQUwsQUFBdUIsQUFDdkI7U0FBQSxBQUFLLGlCQUFMLEFBQXNCLEFBQ3pCO0EsQUE2Skw7O2tCQUFBLEFBQWUiLCJmaWxlIjoiRXZlbnRIYW5kbGVyLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3ZpY3RvcnBoYW0xOTk3L1dvcmtwbGFjZS9TVVRELzUwMDM3X2Jsb2NrY2hhaW4vYmxvY2tjaGFpbi1wcm9qIn0=