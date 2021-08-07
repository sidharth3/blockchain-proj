'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _AppDispatcher = require('../core/AppDispatcher');

var _AppDispatcher2 = _interopRequireDefault(_AppDispatcher);

var _Constant = require('../support/Constant');

var _Constant2 = _interopRequireDefault(_Constant);

var _Utils = require('../support/Utils');

var _Utils2 = _interopRequireDefault(_Utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LocalStorageManager = function () {
    function LocalStorageManager() {
        var _this = this;

        (0, _classCallCheck3.default)(this, LocalStorageManager);

        this.loadLocalContactAddresses = function () {
            _this.contactAddresses = []; // A list of Ethereum addresses in the contact list of the current user.
            if (typeof Storage != 'undefined') {
                var rawContactAddresses = window.localStorage.contactAddresses;
                if (rawContactAddresses != undefined) {
                    _this.contactAddresses = JSON.parse(rawContactAddresses);
                }
            }
        };

        this.loadContactMessages = function () {
            if (typeof Storage != 'undefined') {
                for (var i = 0; i < _this.contactAddresses.length; i++) {
                    var address = _this.contactAddresses[i];
                    var localContact = window.localStorage[address];
                    _this.contacts[address] = JSON.parse(localContact);
                }
            }
        };

        this.addContact = function (address, relationship) {
            var data = _this.contacts[address];
            if (data == undefined) {
                var member = {};
                member.messages = [];
                member.relationship = relationship;
                window.localStorage.setItem(address, (0, _stringify2.default)(member));
                _this.contacts[address] = member;

                _this.contactAddresses.push(address);
                window.localStorage.setItem('contactAddresses', (0, _stringify2.default)(_this.contactAddresses));
            }
        };

        this.updateContact = function (address, publicKey, name, avatarUrl, relationship) {
            var data = _this.contacts[address];
            if (data != undefined) {
                if (data.relationship < relationship) {
                    data.relationship = relationship;
                }
                if (publicKey) {
                    data.publicKey = publicKey;
                }
                if (name) {
                    data.name = name;
                }
                if (avatarUrl) {
                    data.avatarUrl = avatarUrl;
                }
                window.localStorage.setItem(address, (0, _stringify2.default)(data));
            }
        };

        this.addInvitationEvents = function (events) {
            for (var i = 0; i < events.length; i++) {
                _this.addContact(events[i].returnValues["from"], _Constant2.default.Relationship.NoRelation);
            }
        };

        this.addRequestEvents = function (events) {
            for (var i = 0; i < events.length; i++) {
                _this.addContact(events[i].returnValues["to"], _Constant2.default.Relationship.Requested);
            }
        };

        this.addMyAcceptContactEvents = function (events) {
            for (var i = 0; i < events.length; i++) {
                _this.updateContact(events[i].returnValues["to"], "", "", "", _Constant2.default.Relationship.Connected);
            }
        };

        this.addAcceptContactEvents = function (events) {
            for (var i = 0; i < events.length; i++) {
                _this.updateContact(events[i].returnValues["from"], "", "", "", _Constant2.default.Relationship.Connected);
            }
        };

        this.addMessageFromFriendEvent = function (event) {
            var data = event.returnValues;
            var fromAddress = data.from;
            var message = {};
            message.isMine = false;
            message.message = data.message;
            message.encryption = _Utils2.default.hexStringToAsciiString(data.encryption);
            message.txHash = event.transactionHash;

            _this.contacts[fromAddress].messages.push(message);

            window.localStorage.setItem(fromAddress, (0, _stringify2.default)(_this.contacts[fromAddress]));
        };

        this.addMyMessageEvent = function (event) {
            var data = event.returnValues;
            var localMessages = _this.contacts[data.to];

            var noMatchingItem = true;
            for (var i = localMessages.messages.length - 1; i >= 0; i--) {
                if (event.transactionHash == localMessages.messages[i].txHash) {
                    localMessages.messages[i].status = _Constant2.default.SENT_STATUS.SUCCESS;
                    window.localStorage.setItem(data.to, (0, _stringify2.default)(_this.contacts[data.to]));
                    noMatchingItem = false;
                }
            }
            if (noMatchingItem) {
                var message = {};
                message.isMine = true;
                message.message = data.message;
                message.encryption = _Utils2.default.hexStringToAsciiString(data.encryption);
                message.txHash = event.transactionHash;
                localMessages.messages.push(message);
                window.localStorage.setItem(data.to, (0, _stringify2.default)(_this.contacts[data.to]));
            }
        };

        this.addMyLocalMessage = function (message, to, encryption, txHash) {
            var message = { message: message, encryption: encryption, txHash: txHash };
            message.status = _Constant2.default.SENT_STATUS.PENDING;
            message.isMine = true;
            _this.contacts[to].messages.push(message);
            window.localStorage.setItem(to, (0, _stringify2.default)(_this.contacts[to]));
        };

        this.updateLocalMessage = function (toAddress, txHash, status) {
            var localMessages = _this.contacts[toAddress];
            for (var i = localMessages.messages.length - 1; i >= 0; i--) {
                if (txHash == localMessages.messages[i].txHash) {
                    localMessages.messages[i].status = status;
                    window.localStorage.setItem(toAddress, (0, _stringify2.default)(_this.contacts[toAddress]));
                }
            }
        };

        this.clearMessages = function (contacts) {
            window.localStorage.setItem('currentDataBlock', "0");
            window.localStorage.removeItem('contactAddresses');
            for (var i = 0; i < contacts.length; i++) {
                window.localStorage.removeItem(contacts[i]);
            }
        };
    }

    (0, _createClass3.default)(LocalStorageManager, [{
        key: 'initialize',
        value: function initialize() {
            this.contacts = {}; // Map Ethereum addresses with all messages and information belong to an address
            this.loadLocalContactAddresses();
            this.loadContactMessages();
            _AppDispatcher2.default.dispatch({
                action: _Constant2.default.EVENT.CONTACT_LIST_UPDATED
            });
        }
    }, {
        key: 'storePrivateKeyAndAddress',
        value: function storePrivateKeyAndAddress(privateKey, address) {
            if (typeof Storage !== 'undefined') {
                window.localStorage.setItem("privateKey", privateKey);
                window.localStorage.setItem("address", address);
                window.localStorage.setItem("currentDataBlock", "0");
                window.localStorage.setItem("ethNetwork", "4");
            }
        }
    }, {
        key: 'getPrivateKey',
        value: function getPrivateKey() {
            if (typeof Storage !== 'undefined') {
                return window.localStorage.privateKey;
            }
        }
    }, {
        key: 'getAddress',
        value: function getAddress() {
            if (typeof Storage !== 'undefined') {
                return window.localStorage.address;
            }
        }
    }, {
        key: 'setBalance',
        value: function setBalance(balance) {
            if (typeof Storage !== 'undefined') {
                window.localStorage.setItem('balance', balance);
            }
        }
    }, {
        key: 'getBalance',
        value: function getBalance() {
            if (typeof Storage !== 'undefined' && window.localStorage.balance != undefined) {
                return window.localStorage.balance;
            } else {
                return "0";
            }
        }
    }, {
        key: 'setName',
        value: function setName(name) {
            if (typeof Storage !== 'undefined' && name != "") {
                window.localStorage.setItem('name', name);
            }
        }
    }, {
        key: 'getName',
        value: function getName() {
            if (typeof Storage !== 'undefined' && window.localStorage.name != undefined) {
                return window.localStorage.name;
            } else {
                return "";
            }
        }
    }, {
        key: 'setAvatarUrl',
        value: function setAvatarUrl(avatarUrl) {
            if (typeof Storage !== 'undefined' && avatarUrl) {
                window.localStorage.setItem('avatarUrl', avatarUrl);
            }
        }
    }, {
        key: 'getAvatarUrl',
        value: function getAvatarUrl() {
            if (typeof Storage !== 'undefined' && window.localStorage.avatarUrl != undefined) {
                return window.localStorage.avatarUrl;
            } else {
                return "";
            }
        }
    }, {
        key: 'setJoinedStatus',
        value: function setJoinedStatus(isJoined) {
            if (typeof Storage !== 'undefined') {
                window.localStorage.setItem('isJoined', isJoined);
            }
        }
    }, {
        key: 'getJoinedStatus',
        value: function getJoinedStatus() {
            if (typeof Storage !== 'undefined' && window.localStorage.isJoined != undefined) {
                return window.localStorage.isJoined;
            } else {
                return false;
            }
        }

        // Get current block number of contract events' data (message events, invitation events...)

    }, {
        key: 'getCurrentDataBlock',
        value: function getCurrentDataBlock() {
            return parseInt(window.localStorage.currentDataBlock);
        }
    }, {
        key: 'setCurrentDataBlock',
        value: function setCurrentDataBlock(blockNumber) {
            window.localStorage.setItem('currentDataBlock', blockNumber);
        }
    }, {
        key: 'setAskForTransactionApproval',
        value: function setAskForTransactionApproval(boolValue) {
            if (typeof Storage !== 'undefined') {
                window.localStorage.setItem('askForTransactionApproval', boolValue);
            }
        }
    }, {
        key: 'getAskForTransactionApproval',
        value: function getAskForTransactionApproval() {
            if (typeof Storage !== 'undefined' && window.localStorage.askForTransactionApproval) {
                return window.localStorage.askForTransactionApproval == "true";
            } else {
                return false;
            }
        }
    }, {
        key: 'removeNetworkDependentData',
        value: function removeNetworkDependentData() {
            if (typeof Storage !== 'undefined') {
                var rawAddresses = window.localStorage.contactAddresses;
                if (rawAddresses != undefined) {
                    var addresses = JSON.parse(rawAddresses);
                    for (var i = 0; i < addresses.length; i++) {
                        window.localStorage.removeItem(addresses[i]);
                    }
                    window.localStorage.removeItem('contactAddresses');
                }
                window.localStorage.removeItem('balance');
                window.localStorage.removeItem('isJoined');
                window.localStorage.removeItem('name');
                window.localStorage.removeItem('avatarUrl');
                window.localStorage.setItem('currentDataBlock', '0');
            }
        }
    }]);

    return LocalStorageManager;
}();
// Copyright (c) 2018 Nguyen Vu Nhat Minh
// Distributed under the MIT software license, see the accompanying file LICENSE

exports.default = LocalStorageManager;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvTG9jYWxTdG9yYWdlTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJhcHBEaXNwYXRjaGVyIiwiQ29uc3RhbnQiLCJ1dGlscyIsIkxvY2FsU3RvcmFnZU1hbmFnZXIiLCJsb2FkTG9jYWxDb250YWN0QWRkcmVzc2VzIiwiY29udGFjdEFkZHJlc3NlcyIsIlN0b3JhZ2UiLCJyYXdDb250YWN0QWRkcmVzc2VzIiwid2luZG93IiwibG9jYWxTdG9yYWdlIiwidW5kZWZpbmVkIiwiSlNPTiIsInBhcnNlIiwibG9hZENvbnRhY3RNZXNzYWdlcyIsImkiLCJsZW5ndGgiLCJhZGRyZXNzIiwibG9jYWxDb250YWN0IiwiY29udGFjdHMiLCJhZGRDb250YWN0IiwicmVsYXRpb25zaGlwIiwiZGF0YSIsIm1lbWJlciIsIm1lc3NhZ2VzIiwic2V0SXRlbSIsInB1c2giLCJ1cGRhdGVDb250YWN0IiwicHVibGljS2V5IiwibmFtZSIsImF2YXRhclVybCIsImFkZEludml0YXRpb25FdmVudHMiLCJldmVudHMiLCJyZXR1cm5WYWx1ZXMiLCJSZWxhdGlvbnNoaXAiLCJOb1JlbGF0aW9uIiwiYWRkUmVxdWVzdEV2ZW50cyIsIlJlcXVlc3RlZCIsImFkZE15QWNjZXB0Q29udGFjdEV2ZW50cyIsIkNvbm5lY3RlZCIsImFkZEFjY2VwdENvbnRhY3RFdmVudHMiLCJhZGRNZXNzYWdlRnJvbUZyaWVuZEV2ZW50IiwiZXZlbnQiLCJmcm9tQWRkcmVzcyIsImZyb20iLCJtZXNzYWdlIiwiaXNNaW5lIiwiZW5jcnlwdGlvbiIsImhleFN0cmluZ1RvQXNjaWlTdHJpbmciLCJ0eEhhc2giLCJ0cmFuc2FjdGlvbkhhc2giLCJhZGRNeU1lc3NhZ2VFdmVudCIsImxvY2FsTWVzc2FnZXMiLCJ0byIsIm5vTWF0Y2hpbmdJdGVtIiwic3RhdHVzIiwiU0VOVF9TVEFUVVMiLCJTVUNDRVNTIiwiYWRkTXlMb2NhbE1lc3NhZ2UiLCJQRU5ESU5HIiwidXBkYXRlTG9jYWxNZXNzYWdlIiwidG9BZGRyZXNzIiwiY2xlYXJNZXNzYWdlcyIsInJlbW92ZUl0ZW0iLCJkaXNwYXRjaCIsImFjdGlvbiIsIkVWRU5UIiwiQ09OVEFDVF9MSVNUX1VQREFURUQiLCJwcml2YXRlS2V5IiwiYmFsYW5jZSIsImlzSm9pbmVkIiwicGFyc2VJbnQiLCJjdXJyZW50RGF0YUJsb2NrIiwiYmxvY2tOdW1iZXIiLCJib29sVmFsdWUiLCJhc2tGb3JUcmFuc2FjdGlvbkFwcHJvdmFsIiwicmF3QWRkcmVzc2VzIiwiYWRkcmVzc2VzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQSxBQUFPLEFBQW1COzs7O0FBQzFCLEFBQU8sQUFBYzs7OztBQUNyQixBQUFPLEFBQVc7Ozs7OztJLEFBRVo7Ozs7OzthLEFBVUYsNEJBQTRCO2tCQUN4QixBQUFLLG1CQUR5QixBQUM5QixBQUF3QixHQURNLEFBQzlCLENBQTRCLEFBQzVCO2dCQUFJLE9BQUEsQUFBTyxXQUFYLEFBQXVCLGFBQWEsQUFDaEM7b0JBQUksc0JBQXNCLE9BQUEsQUFBTyxhQUFqQyxBQUE4QyxBQUM5QztvQkFBSSx1QkFBSixBQUEyQixXQUFXLEFBQ2xDOzBCQUFBLEFBQUssbUJBQW1CLEtBQUEsQUFBSyxNQUE3QixBQUF3QixBQUFXLEFBQ3RDO0FBQ0o7QUFDSjtBOzthQUVELEEsc0JBQXNCLFlBQU0sQUFDeEI7Z0JBQUksT0FBQSxBQUFPLFdBQVgsQUFBdUIsYUFBYSxBQUNoQztxQkFBSyxJQUFJLElBQVQsQUFBVyxHQUFFLElBQUUsTUFBQSxBQUFLLGlCQUFwQixBQUFxQyxRQUFyQyxBQUE0QyxLQUFLLEFBQzdDO3dCQUFJLFVBQVUsTUFBQSxBQUFLLGlCQUFuQixBQUFjLEFBQXNCLEFBQ3BDO3dCQUFJLGVBQWUsT0FBQSxBQUFPLGFBQTFCLEFBQW1CLEFBQW9CLEFBQ3ZDOzBCQUFBLEFBQUssU0FBTCxBQUFjLFdBQVcsS0FBQSxBQUFLLE1BQTlCLEFBQXlCLEFBQVcsQUFDdkM7QUFDSjtBQUNKO0E7O2EsQUFFRCxhQUFhLFVBQUEsQUFBQyxTQUFE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VUFBZixBQUF5QixRQUF6QixBQUFnQyxLQUFLLEFBQ2pDOytCQUFBLEFBQU8sYUFBUCxBQUFvQixXQUFXLFVBQS9CLEFBQStCLEFBQVUsQUFDNUM7QUFDRDsyQkFBQSxBQUFPLGFBQVAsQUFBb0IsV0FBcEIsQUFBK0IsQUFDbEM7QUFDRDt1QkFBQSxBQUFPLGFBQVAsQUFBb0IsV0FBcEIsQUFBK0IsQUFDL0I7dUJBQUEsQUFBTyxhQUFQLEFBQW9CLFdBQXBCLEFBQStCLEFBQy9CO3VCQUFBLEFBQU8sYUFBUCxBQUFvQixXQUFwQixBQUErQixBQUMvQjt1QkFBQSxBQUFPLGFBQVAsQUFBb0IsV0FBcEIsQUFBK0IsQUFDL0I7dUJBQUEsQUFBTyxhQUFQLEFBQW9CLFFBQXBCLEFBQTRCLG9CQUE1QixBQUFnRCxBQUNuRDtBQUNKOzs7OztBQVdMO0FBcFJBO0FBQ0E7O2tCQW1SQSxBQUFlIiwiZmlsZSI6IkxvY2FsU3RvcmFnZU1hbmFnZXIuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdmljdG9ycGhhbTE5OTcvV29ya3BsYWNlL1NVVEQvNTAwMzdfYmxvY2tjaGFpbi9ibG9ja2NoYWluLXByb2oifQ==