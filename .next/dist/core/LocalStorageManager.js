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

var _Config = require('../support/Config');

var _Config2 = _interopRequireDefault(_Config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright (c) 2018 Nguyen Vu Nhat Minh
// Distributed under the MIT software license, see the accompanying file LICENSE

var LocalStorageManager = function () {
    function LocalStorageManager() {
        var _this = this;

        (0, _classCallCheck3.default)(this, LocalStorageManager);

        this.loadLocalContactAddresses = function () {
            _this.contactAddresses = []; // A list of Ethereum addresses in the contact list of the current user.
            if (typeof Storage != 'undefined') {
                var rawContactAddresses = window.localStorage.contactAddresses;
                // var contactArray = [];
                // var userAddress = window.localStorage.address;
                // console.log(Config.ENV.ContractAddress);
                if (rawContactAddresses != undefined) {
                    // var rawContactArray = JSON.parse(rawContactAddresses);
                    // for(var i = 0; i < rawContactArray.length; i++ ){
                    //     if(rawContactArray[i].toLowerCase() != userAddress && rawContactArray[i] != Config.ENV.ContractAddress){
                    //         this.contactAddresses.push(rawContactArray[i]);
                    //     }
                    // }
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

        this.addContact = function (address, publicKey) {
            if (!_this.contactAddresses.includes(address)) {
                var user = {};
                user.messages = [];
                user.relationship = 2;
                user.publicKey = publicKey;
                window.localStorage.setItem(address, (0, _stringify2.default)(user));
                _this.contacts[address] = user;
                _this.contactAddresses.push(address);
                window.localStorage.setItem('contactAddresses', (0, _stringify2.default)(_this.contactAddresses));
            }
            _AppDispatcher2.default.dispatch({
                action: _Constant2.default.EVENT.CONTACT_LIST_UPDATED
            });
        };

        this.updateContact = function (address, publicKey, name, avatarUrl, relationship) {
            var data = _this.contacts[address];
            if (data != undefined) {
                if (relationship) {
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
                _AppDispatcher2.default.dispatch({
                    action: _Constant2.default.EVENT.CONTACT_LIST_UPDATED
                });
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

        this.addContactFromMessage = function (event) {
            var data = event.returnValues;
            var senderAddress = data.from;
        };

        this.addMessageFromFriendEvent = function (event) {
            var data = event.returnValues;
            var fromAddress = data.from;
            var message = {};
            message.isMine = false;
            message.message = data.message;
            message.encryption = _Utils2.default.hexStringToAsciiString(data.encryption);
            message.txHash = event.transactionHash;
            //TODO: push from address to contactAddress

            _this.contacts[fromAddress].messages.push(message);

            window.localStorage.setItem(fromAddress, (0, _stringify2.default)(_this.contacts[fromAddress]));
        };

        this.addMyMessageEvent = function (event) {
            var data = event.returnValues;
            var localMessages = _this.contacts[data.to];
            //TODO: push to address to contactAddress

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
            // console.log(this.contacts[to]);
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
            this.reload = 0;
            // this.contactAddresses = [];
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
            // window.location.reload();
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

exports.default = LocalStorageManager;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvTG9jYWxTdG9yYWdlTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJhcHBEaXNwYXRjaGVyIiwiQ29uc3RhbnQiLCJ1dGlscyIsIkNvbmZpZyIsIkxvY2FsU3RvcmFnZU1hbmFnZXIiLCJsb2FkTG9jYWxDb250YWN0QWRkcmVzc2VzIiwiY29udGFjdEFkZHJlc3NlcyIsIlN0b3JhZ2UiLCJyYXdDb250YWN0QWRkcmVzc2VzIiwid2luZG93IiwibG9jYWxTdG9yYWdlIiwidW5kZWZpbmVkIiwiSlNPTiIsInBhcnNlIiwibG9hZENvbnRhY3RNZXNzYWdlcyIsImkiLCJsZW5ndGgiLCJhZGRyZXNzIiwibG9jYWxDb250YWN0IiwiY29udGFjdHMiLCJhZGRDb250YWN0IiwicHVibGljS2V5IiwiaW5jbHVkZXMiLCJ1c2VyIiwibWVzc2FnZXMiLCJyZWxhdGlvbnNoaXAiLCJzZXRJdGVtIiwicHVzaCIsImRpc3BhdGNoIiwiYWN0aW9uIiwiRVZFTlQiLCJDT05UQUNUX0xJU1RfVVBEQVRFRCIsInVwZGF0ZUNvbnRhY3QiLCJuYW1lIiwiYXZhdGFyVXJsIiwiZGF0YSIsImFkZEludml0YXRpb25FdmVudHMiLCJldmVudHMiLCJyZXR1cm5WYWx1ZXMiLCJSZWxhdGlvbnNoaXAiLCJOb1JlbGF0aW9uIiwiYWRkUmVxdWVzdEV2ZW50cyIsIlJlcXVlc3RlZCIsImFkZE15QWNjZXB0Q29udGFjdEV2ZW50cyIsIkNvbm5lY3RlZCIsImFkZEFjY2VwdENvbnRhY3RFdmVudHMiLCJhZGRDb250YWN0RnJvbU1lc3NhZ2UiLCJldmVudCIsInNlbmRlckFkZHJlc3MiLCJmcm9tIiwiYWRkTWVzc2FnZUZyb21GcmllbmRFdmVudCIsImZyb21BZGRyZXNzIiwibWVzc2FnZSIsImlzTWluZSIsImVuY3J5cHRpb24iLCJoZXhTdHJpbmdUb0FzY2lpU3RyaW5nIiwidHhIYXNoIiwidHJhbnNhY3Rpb25IYXNoIiwiYWRkTXlNZXNzYWdlRXZlbnQiLCJsb2NhbE1lc3NhZ2VzIiwidG8iLCJub01hdGNoaW5nSXRlbSIsInN0YXR1cyIsIlNFTlRfU1RBVFVTIiwiU1VDQ0VTUyIsImFkZE15TG9jYWxNZXNzYWdlIiwiUEVORElORyIsInVwZGF0ZUxvY2FsTWVzc2FnZSIsInRvQWRkcmVzcyIsImNsZWFyTWVzc2FnZXMiLCJyZW1vdmVJdGVtIiwicmVsb2FkIiwicHJpdmF0ZUtleSIsImJhbGFuY2UiLCJpc0pvaW5lZCIsInBhcnNlSW50IiwiY3VycmVudERhdGFCbG9jayIsImJsb2NrTnVtYmVyIiwiYm9vbFZhbHVlIiwiYXNrRm9yVHJhbnNhY3Rpb25BcHByb3ZhbCIsInJhd0FkZHJlc3NlcyIsImFkZHJlc3NlcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0EsQUFBTyxBQUFtQjs7OztBQUMxQixBQUFPLEFBQWM7Ozs7QUFDckIsQUFBTyxBQUFXOzs7O0FBQ2xCLEFBQU8sQUFBWTs7Ozs7O0FBTm5CO0FBQ0E7O0ksQUFPTTs7Ozs7O2FBYUYsQSw0QkFBNEI7a0JBQ3hCLEFBQUssbUJBRHlCLEFBQzlCLEFBQXdCLEdBRE0sQUFDOUIsQ0FBNEIsQUFDNUI7Z0JBQUksT0FBQSxBQUFPLFdBQVgsQUFBdUIsYUFBYSxBQUNoQztvQkFBSSxzQkFBc0IsT0FBQSxBQUFPLGFBQWpDLEFBQThDLEFBQzlDO0FBQ0E7QUFDQTtBQUNBO29CQUFJLHVCQUFKLEFBQTJCLFdBQVcsQUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7MEJBQUEsQUFBSyxtQkFBbUIsS0FBQSxBQUFLLE1BQTdCLEFBQXdCLEFBQVcsQUFDdEM7QUFDSjtBQUNKO0E7O2EsQUFFRCxzQkFBc0IsWUFBTSxBQUN4QjtnQkFBSSxPQUFBLEFBQU8sV0FBWCxBQUF1QixhQUFhLEFBQ2hDO3FCQUFLLElBQUksSUFBVCxBQUFXLEdBQUUsSUFBRSxNQUFBLEFBQUssaUJBQXBCLEFBQXFDLFFBQXJDLEFBQTRDLEtBQUssQUFDN0M7d0JBQUksVUFBVSxNQUFBLEFBQUssaUJBQW5CLEFBQWMsQUFBc0IsQUFDcEM7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QUEsQUFBTyxhQUFQLEFBQW9CLFFBQXBCLEFBQTRCLDZCQUE1QixBQUF5RCxBQUM1RDtBQUNKOzs7O3VEQUU4QixBQUMzQjtnQkFBSSxPQUFBLEFBQU8sWUFBUCxBQUFvQixlQUFlLE9BQUEsQUFBTyxhQUE5QyxBQUEyRCwyQkFBMkIsQUFDbEY7dUJBQVEsT0FBQSxBQUFPLGFBQVAsQUFBb0IsNkJBQTVCLEFBQXlELEFBQzVEO0FBRkQsbUJBRU8sQUFDSDt1QkFBQSxBQUFPLEFBQ1Y7QUFDSjs7OztxREFFNEIsQUFDekI7Z0JBQUksT0FBQSxBQUFPLFlBQVgsQUFBd0IsYUFBYSxBQUNqQztvQkFBSSxlQUFlLE9BQUEsQUFBTyxhQUExQixBQUF1QyxBQUN2QztvQkFBSSxnQkFBSixBQUFvQixXQUFXLEFBQzNCO3dCQUFJLFlBQVksS0FBQSxBQUFLLE1BQXJCLEFBQWdCLEFBQVcsQUFDM0I7eUJBQUssSUFBSSxJQUFULEFBQVcsR0FBRSxJQUFFLFVBQWYsQUFBeUIsUUFBekIsQUFBZ0MsS0FBSyxBQUNqQzsrQkFBQSxBQUFPLGFBQVAsQUFBb0IsV0FBVyxVQUEvQixBQUErQixBQUFVLEFBQzVDO0FBQ0Q7MkJBQUEsQUFBTyxhQUFQLEFBQW9CLFdBQXBCLEFBQStCLEFBQ2xDO0FBQ0Q7dUJBQUEsQUFBTyxhQUFQLEFBQW9CLFdBQXBCLEFBQStCLEFBQy9CO3VCQUFBLEFBQU8sYUFBUCxBQUFvQixXQUFwQixBQUErQixBQUMvQjt1QkFBQSxBQUFPLGFBQVAsQUFBb0IsV0FBcEIsQUFBK0IsQUFDL0I7dUJBQUEsQUFBTyxhQUFQLEFBQW9CLFdBQXBCLEFBQStCLEFBQy9CO3VCQUFBLEFBQU8sYUFBUCxBQUFvQixRQUFwQixBQUE0QixvQkFBNUIsQUFBZ0QsQUFDbkQ7QUFDSjs7Ozs7QUFXTDs7a0JBQUEsQUFBZSIsImZpbGUiOiJMb2NhbFN0b3JhZ2VNYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3ZpY3RvcnBoYW0xOTk3L1dvcmtwbGFjZS9TVVRELzUwMDM3X2Jsb2NrY2hhaW4vYmxvY2tjaGFpbi1wcm9qIn0=