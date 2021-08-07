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

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _ethereumjsUtil = require('ethereumjs-util');

var _ethereumjsWallet = require('ethereumjs-wallet');

var _ethereumjsWallet2 = _interopRequireDefault(_ethereumjsWallet);

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _web = require('../ethereum/web3');

var _web2 = _interopRequireDefault(_web);

var _Utils = require('../support/Utils');

var _Utils2 = _interopRequireDefault(_Utils);

var _EventHandler = require('./EventHandler');

var _EventHandler2 = _interopRequireDefault(_EventHandler);

var _AppDispatcher = require('../core/AppDispatcher');

var _AppDispatcher2 = _interopRequireDefault(_AppDispatcher);

var _TransactionManager = require('./TransactionManager');

var _TransactionManager2 = _interopRequireDefault(_TransactionManager);

var _Constant = require('../support/Constant');

var _Constant2 = _interopRequireDefault(_Constant);

var _Config = require('../support/Config');

var _Config2 = _interopRequireDefault(_Config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright (c) 2018 Nguyen Vu Nhat Minh
// Distributed under the MIT software license, see the accompanying file LICENSE

var AccountManager = function () {
    function AccountManager(storageManager) {
        var _this = this;

        (0, _classCallCheck3.default)(this, AccountManager);

        this.loadInfoFromstorageManager = function () {
            _this.balance = _this.storageManager.getBalance();
            _this.name = _this.storageManager.getName();
            _this.avatarUrl = _this.storageManager.getAvatarUrl();
            _this.isJoined = _this.storageManager.getJoinedStatus();
            _this.askForTransactionApproval = _this.storageManager.getAskForTransactionApproval();
        };

        this.setProfile = function (name, avatarUrl, isJoined) {
            _this.name = name;
            _this.avatarUrl = avatarUrl;
            _this.isJoined = isJoined;
        };

        this.updateBalance = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return _web2.default.eth.getBalance(_this.walletAccount.getAddress().toString('hex'));

                        case 2:
                            _this.balance = _context.sent;

                            _this.storageManager.setBalance(_this.balance);
                            _AppDispatcher2.default.dispatch({
                                action: _Constant2.default.EVENT.ACCOUNT_BALANCE_UPDATED
                            });

                        case 5:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this);
        }));

        this.setAskForTransactionApproval = function (askForApproval) {
            _this.storageManager.setAskForTransactionApproval(askForApproval);
            _this.askForTransactionApproval = askForApproval;
        };

        this.loadPrivateKey = function () {
            var privateKeyHex = _this.storageManager.getPrivateKey();
            if (privateKeyHex) {
                var privateKeyBuffer = Buffer.from(privateKeyHex, 'hex');
                _this.walletAccount = _ethereumjsWallet2.default.fromPrivateKey(privateKeyBuffer);
                _this.updateBalance();
            }
        };

        this.storePrivateKey = function (privateKey) {
            var isValid = false;
            try {
                var privateKeyBuffer = Buffer.from(privateKey, 'hex');
                _this.walletAccount = _ethereumjsWallet2.default.fromPrivateKey(privateKeyBuffer);
                _this.storageManager.storePrivateKeyAndAddress(privateKey, _this.getAddress());
                isValid = true;
            } catch (err) {}
            _this.updateBalance();
            return isValid;
        };

        this.getAddress = function () {
            if (_this.walletAccount) {
                return '0x' + _this.walletAccount.getAddress().toString('hex');
            } else {
                return "";
            }
        };

        this.computeSecret = function (publicKeyBuffer) {
            var a = _crypto2.default.createECDH('secp256k1');
            a.generateKeys();
            a.setPrivateKey(_this.getPrivateKeyBuffer());
            return a.computeSecret(publicKeyBuffer);
        };

        this.isJoined = false;
        this.balance = 0;
        this.name = "";
        this.avatarUrl = "";
        this.storageManager = storageManager;
        this.loadPrivateKey();
        this.loadInfoFromstorageManager();
    }

    // Update balance of the current account


    // Load private key from browser's local storage


    (0, _createClass3.default)(AccountManager, [{
        key: 'getPublicKeyBuffer',
        value: function getPublicKeyBuffer() {
            return this.walletAccount.getPublicKey();
        }
    }, {
        key: 'getPrivateKeyBuffer',
        value: function getPrivateKeyBuffer() {
            return this.walletAccount.getPrivateKey();
        }

        // Compute a secret key for messages encryption/decryption

    }]);

    return AccountManager;
}();

exports.default = AccountManager;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvQWNjb3VudE1hbmFnZXIuanMiXSwibmFtZXMiOlsic2hhMjU2IiwiV2FsbGV0IiwiY3J5cHRvIiwid2ViMyIsInV0aWxzIiwiRXZlbnRIYW5kbGVyIiwiYXBwRGlzcGF0Y2hlciIsIlRyYW5zYWN0aW9uTWFuYWdlciIsIkNvbnN0YW50IiwiQ29uZmlnIiwiQWNjb3VudE1hbmFnZXIiLCJzdG9yYWdlTWFuYWdlciIsImxvYWRJbmZvRnJvbXN0b3JhZ2VNYW5hZ2VyIiwiYmFsYW5jZSIsImdldEJhbGFuY2UiLCJuYW1lIiwiZ2V0TmFtZSIsImF2YXRhclVybCIsImdldEF2YXRhclVybCIsImlzSm9pbmVkIiwiZ2V0Sm9pbmVkU3RhdHVzIiwiYXNrRm9yVHJhbnNhY3Rpb25BcHByb3ZhbCIsImdldEFza0ZvclRyYW5zYWN0aW9uQXBwcm92YWwiLCJzZXRQcm9maWxlIiwidXBkYXRlQmFsYW5jZSIsImV0aCIsIndhbGxldEFjY291bnQiLCJnZXRBZGRyZXNzIiwidG9TdHJpbmciLCJzZXRCYWxhbmNlIiwiZGlzcGF0Y2giLCJhY3Rpb24iLCJFVkVOVCIsIkFDQ09VTlRfQkFMQU5DRV9VUERBVEVEIiwic2V0QXNrRm9yVHJhbnNhY3Rpb25BcHByb3ZhbCIsImFza0ZvckFwcHJvdmFsIiwibG9hZFByaXZhdGVLZXkiLCJwcml2YXRlS2V5SGV4IiwiZ2V0UHJpdmF0ZUtleSIsInByaXZhdGVLZXlCdWZmZXIiLCJCdWZmZXIiLCJmcm9tIiwiZnJvbVByaXZhdGVLZXkiLCJzdG9yZVByaXZhdGVLZXkiLCJwcml2YXRlS2V5IiwiaXNWYWxpZCIsInN0b3JlUHJpdmF0ZUtleUFuZEFkZHJlc3MiLCJlcnIiLCJjb21wdXRlU2VjcmV0IiwicHVibGljS2V5QnVmZmVyIiwiYSIsImNyZWF0ZUVDREgiLCJnZW5lcmF0ZUtleXMiLCJzZXRQcml2YXRlS2V5IiwiZ2V0UHJpdmF0ZUtleUJ1ZmZlciIsImdldFB1YmxpY0tleSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7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MUQ7QUFGRCxtQkFFTyxBQUNIO3VCQUFBLEFBQU8sQUFDVjtBQUNKO0FBM0UyQjs7YUFBQSxBQThFNUIsZ0JBQWdCLFVBQUEsQUFBQyxpQkFBb0IsQUFDakM7Z0JBQUksSUFBSSxpQkFBQSxBQUFPLFdBQWYsQUFBUSxBQUFrQixBQUMxQjtjQUFBLEFBQUUsQUFDRjtjQUFBLEFBQUUsY0FBYyxNQUFoQixBQUFnQixBQUFLLEFBQ3JCO21CQUFPLEVBQUEsQUFBRSxjQUFULEFBQU8sQUFBZ0IsQUFDMUI7QUFuRjJCLEFBQ3hCOzthQUFBLEFBQUssV0FBTCxBQUFnQixBQUNoQjthQUFBLEFBQUssVUFBTCxBQUFlLEFBQ2Y7YUFBQSxBQUFLLE9BQUwsQUFBWSxBQUNaO2FBQUEsQUFBSyxZQUFMLEFBQWlCLEFBQ2pCO2FBQUEsQUFBSyxpQkFBTCxBQUFzQixBQUN0QjthQUFBLEFBQUssQUFDTDthQUFBLEFBQUssQUFDUjtBQWdCRDs7QUFjQTs7Ozs7Ozs7NkNBdUJxQixBQUNqQjttQkFBTyxLQUFBLEFBQUssY0FBWixBQUFPLEFBQW1CLEFBQzdCOzs7OzhDQUVxQixBQUNsQjttQkFBTyxLQUFBLEFBQUssY0FBWixBQUFPLEFBQW1CLEFBQzdCO0FBVUQ7Ozs7Ozs7QUFTSjs7a0JBQUEsQUFBZSIsImZpbGUiOiJBY2NvdW50TWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS92aWN0b3JwaGFtMTk5Ny9Xb3JrcGxhY2UvU1VURC81MDAzN19ibG9ja2NoYWluL2Jsb2NrY2hhaW4tcHJvaiJ9