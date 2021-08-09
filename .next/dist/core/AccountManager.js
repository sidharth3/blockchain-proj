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
            try {
                var privateKeyBuffer = Buffer.from(privateKey, 'hex');
                _this.walletAccount = _ethereumjsWallet2.default.fromPrivateKey(privateKeyBuffer);
                _this.storageManager.storePrivateKeyAndAddress(privateKey, _this.getAddress());
                _this.updateBalance();
            } catch (err) {
                console.log(err.message);
            }
        };

        this.checkPrivateKey = function (privateKey) {
            try {
                var privateKeyBuffer = Buffer.from(privateKey, 'hex');
                var walletAcc = _ethereumjsWallet2.default.fromPrivateKey(privateKeyBuffer);
                var walletAddress = walletAcc.getAddress().toString('hex');
                return walletAddress;
            } catch (err) {
                console.log(err.message);
                return false;
            }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvQWNjb3VudE1hbmFnZXIuanMiXSwibmFtZXMiOlsic2hhMjU2IiwiV2FsbGV0IiwiY3J5cHRvIiwid2ViMyIsInV0aWxzIiwiRXZlbnRIYW5kbGVyIiwiYXBwRGlzcGF0Y2hlciIsIlRyYW5zYWN0aW9uTWFuYWdlciIsIkNvbnN0YW50IiwiQ29uZmlnIiwiQWNjb3VudE1hbmFnZXIiLCJzdG9yYWdlTWFuYWdlciIsImxvYWRJbmZvRnJvbXN0b3JhZ2VNYW5hZ2VyIiwiYmFsYW5jZSIsImdldEJhbGFuY2UiLCJuYW1lIiwiZ2V0TmFtZSIsImF2YXRhclVybCIsImdldEF2YXRhclVybCIsImlzSm9pbmVkIiwiZ2V0Sm9pbmVkU3RhdHVzIiwiYXNrRm9yVHJhbnNhY3Rpb25BcHByb3ZhbCIsImdldEFza0ZvclRyYW5zYWN0aW9uQXBwcm92YWwiLCJzZXRQcm9maWxlIiwidXBkYXRlQmFsYW5jZSIsImV0aCIsIndhbGxldEFjY291bnQiLCJnZXRBZGRyZXNzIiwidG9TdHJpbmciLCJzZXRCYWxhbmNlIiwiZGlzcGF0Y2giLCJhY3Rpb24iLCJFVkVOVCIsIkFDQ09VTlRfQkFMQU5DRV9VUERBVEVEIiwic2V0QXNrRm9yVHJhbnNhY3Rpb25BcHByb3ZhbCIsImFza0ZvckFwcHJvdmFsIiwibG9hZFByaXZhdGVLZXkiLCJwcml2YXRlS2V5SGV4IiwiZ2V0UHJpdmF0ZUtleSIsInByaXZhdGVLZXlCdWZmZXIiLCJCdWZmZXIiLCJmcm9tIiwiZnJvbVByaXZhdGVLZXkiLCJzdG9yZVByaXZhdGVLZXkiLCJwcml2YXRlS2V5Iiwic3RvcmVQcml2YXRlS2V5QW5kQWRkcmVzcyIsImVyciIsImNvbnNvbGUiLCJsb2ciLCJtZXNzYWdlIiwiY2hlY2tQcml2YXRlS2V5Iiwid2FsbGV0QWNjIiwid2FsbGV0QWRkcmVzcyIsImNvbXB1dGVTZWNyZXQiLCJwdWJsaWNLZXlCdWZmZXIiLCJhIiwiY3JlYXRlRUNESCIsImdlbmVyYXRlS2V5cyIsInNldFByaXZhdGVLZXkiLCJnZXRQcml2YXRlS2V5QnVmZmVyIiwiZ2V0UHVibGljS2V5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0EsQUFBUzs7QUFFVCxBQUFPOzs7O0FBQ1AsQUFBTzs7OztBQUNQLEFBQU8sQUFBVTs7OztBQUNqQixBQUFPLEFBQVc7Ozs7QUFDbEIsQUFBTyxBQUFrQjs7OztBQUN6QixBQUFPLEFBQW1COzs7O0FBQzFCLEFBQU8sQUFBd0I7Ozs7QUFDL0IsQUFBTyxBQUFjOzs7O0FBQ3JCLEFBQU8sQUFBWTs7Ozs7O0FBYm5CO0FBQ0E7O0ksQUFjTSw2QkFDRjs0QkFBQSxBQUFZLGdCQUFnQjtvQkFBQTs7NENBQUE7O2FBQUEsQUFVNUIsNkJBQTZCLFlBQU0sQUFDL0I7a0JBQUEsQUFBSyxVQUFVLE1BQUEsQUFBSyxlQUFwQixBQUFlLEFBQW9CLEFBQ25DO2tCQUFBLEFBQUssT0FBTyxNQUFBLEFBQUssZUFBakIsQUFBWSxBQUFvQixBQUNoQztrQkFBQSxBQUFLLFlBQVksTUFBQSxBQUFLLGVBQXRCLEFBQWlCLEFBQW9CLEFBQ3JDO2tCQUFBLEFBQUssV0FBVyxNQUFBLEFBQUssZUFBckIsQUFBZ0IsQUFBb0IsQUFDcEM7a0JBQUEsQUFBSyw0QkFBNEIsTUFBQSxBQUFLLGVBQXRDLEFBQWlDLEFBQW9CLEFBQ3hEO0FBaEIyQjs7YUFBQSxBQWtCNUIsYUFBYSxVQUFBLEFBQUMsTUFBRCxBQUFPLFdBQVAsQUFBa0IsVUFBYSxBQUN4QztrQkFBQSxBQUFLLE9BQUwsQUFBWSxBQUNaO2tCQUFBLEFBQUssWUFBTCxBQUFpQixBQUNqQjtrQkFBQSxBQUFLLFdBQUwsQUFBZ0IsQUFDbkI7QUF0QjJCOzthQUFBLEFBeUI1Qix5RkFBZ0IsbUJBQUE7MEVBQUE7MEJBQUE7cURBQUE7NkJBQUE7NENBQUE7bUNBQ1MsY0FBQSxBQUFLLElBQUwsQUFBUyxXQUFXLE1BQUEsQUFBSyxjQUFMLEFBQW1CLGFBQW5CLEFBQWdDLFNBRDdELEFBQ1MsQUFBb0IsQUFBeUM7OzZCQUFsRjtrQ0FEWSxBQUNQLG1CQUNMOztrQ0FBQSxBQUFLLGVBQUwsQUFBb0IsV0FBVyxNQUEvQixBQUFvQyxBQUNwQztvREFBQSxBQUFjO3dDQUNGLG1CQUFBLEFBQVMsTUFKVCxBQUdaLEFBQXVCLEFBQ0k7QUFESixBQUNuQjs7NkJBSlE7NkJBQUE7NENBQUE7O0FBQUE7d0JBQUE7QUF6Qlk7O2FBQUEsQUFpQzVCLCtCQUErQixVQUFBLEFBQUMsZ0JBQW1CLEFBQy9DO2tCQUFBLEFBQUssZUFBTCxBQUFvQiw2QkFBcEIsQUFBaUQsQUFDakQ7a0JBQUEsQUFBSyw0QkFBTCxBQUFpQyxBQUNwQztBQXBDMkI7O2FBQUEsQUF1QzVCLGlCQUFpQixZQUFNLEFBQ25CO2dCQUFJLGdCQUFnQixNQUFBLEFBQUssZUFBekIsQUFBb0IsQUFBb0IsQUFDeEM7Z0JBQUEsQUFBSSxlQUFlLEFBQ2Y7b0JBQUksbUJBQW1CLE9BQUEsQUFBTyxLQUFQLEFBQVksZUFBbkMsQUFBdUIsQUFBMkIsQUFDbEQ7c0JBQUEsQUFBSyxnQkFBZ0IsMkJBQUEsQUFBTyxlQUE1QixBQUFxQixBQUFzQixBQUMzQztzQkFBQSxBQUFLLEFBQ1I7QUFDSjtBQTlDMkI7O2FBQUEsQUFnRDVCLGtCQUFrQixVQUFBLEFBQUMsWUFBZSxBQUM5QjtnQkFBSSxBQUNBO29CQUFJLG1CQUFtQixPQUFBLEFBQU8sS0FBUCxBQUFZLFlBQW5DLEFBQXVCLEFBQXdCLEFBQy9DO3NCQUFBLEFBQUssZ0JBQWdCLDJCQUFBLEFBQU8sZUFBNUIsQUFBcUIsQUFBc0IsQUFDM0M7c0JBQUEsQUFBSyxlQUFMLEFBQW9CLDBCQUFwQixBQUE4QyxZQUFZLE1BQTFELEFBQTBELEFBQUssQUFDL0Q7c0JBQUEsQUFBSyxBQUNSO0FBTEQsY0FLRSxPQUFBLEFBQU8sS0FBSyxBQUNWO3dCQUFBLEFBQVEsSUFBSSxJQUFaLEFBQWdCLEFBQ25CO0FBQ0o7QUF6RDJCOzthQUFBLEFBMkQ1QixrQkFBa0IsVUFBQSxBQUFDLFlBQWUsQUFDOUI7Z0JBQUcsQUFDQztvQkFBSSxtQkFBbUIsT0FBQSxBQUFPLEtBQVAsQUFBWSxZQUFuQyxBQUF1QixBQUF3QixBQUMvQztvQkFBSSxZQUFZLDJCQUFBLEFBQU8sZUFBdkIsQUFBZ0IsQUFBc0IsQUFDdEM7b0JBQUksZ0JBQWdCLFVBQUEsQUFBVSxhQUFWLEFBQXVCLFNBQTNDLEFBQW9CLEFBQWdDLEFBQ3BEO3VCQUFBLEFBQU8sQUFFVjtBQU5ELGNBTUMsT0FBQSxBQUFNLEtBQUksQUFDUDt3QkFBQSxBQUFRLElBQUksSUFBWixBQUFnQixBQUNoQjt1QkFBQSxBQUFPLEFBQ1Y7QUFDSjtBQXRFMkI7O2FBQUEsQUFnRjVCLGFBQWEsWUFBTSxBQUNmO2dCQUFJLE1BQUosQUFBUyxlQUFlLEFBQ3BCO3VCQUFPLE9BQU8sTUFBQSxBQUFLLGNBQUwsQUFBbUIsYUFBbkIsQUFBZ0MsU0FBOUMsQUFBYyxBQUF5QyxBQUMxRDtBQUZELG1CQUVPLEFBQ0g7dUJBQUEsQUFBTyxBQUNWO0FBQ0o7QUF0RjJCOzthQUFBLEFBeUY1QixnQkFBZ0IsVUFBQSxBQUFDLGlCQUFvQixBQUNqQztnQkFBSSxJQUFJLGlCQUFBLEFBQU8sV0FBZixBQUFRLEFBQWtCLEFBQzFCO2NBQUEsQUFBRSxBQUNGO2NBQUEsQUFBRSxjQUFjLE1BQWhCLEFBQWdCLEFBQUssQUFDckI7bUJBQU8sRUFBQSxBQUFFLGNBQVQsQUFBTyxBQUFnQixBQUMxQjtBQTlGMkIsQUFDeEI7O2FBQUEsQUFBSyxXQUFMLEFBQWdCLEFBQ2hCO2FBQUEsQUFBSyxVQUFMLEFBQWUsQUFDZjthQUFBLEFBQUssT0FBTCxBQUFZLEFBQ1o7YUFBQSxBQUFLLFlBQUwsQUFBaUIsQUFDakI7YUFBQSxBQUFLLGlCQUFMLEFBQXNCLEFBQ3RCO2FBQUEsQUFBSyxBQUNMO2FBQUEsQUFBSyxBQUNSO0FBZ0JEOztBQWNBOzs7Ozs7Ozs2Q0FrQ3FCLEFBQ2pCO21CQUFPLEtBQUEsQUFBSyxjQUFaLEFBQU8sQUFBbUIsQUFDN0I7Ozs7OENBRXFCLEFBQ2xCO21CQUFPLEtBQUEsQUFBSyxjQUFaLEFBQU8sQUFBbUIsQUFDN0I7QUFVRDs7Ozs7OztBQVNKOztrQkFBQSxBQUFlIiwiZmlsZSI6IkFjY291bnRNYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3ZpY3RvcnBoYW0xOTk3L1dvcmtwbGFjZS9TVVRELzUwMDM3X2Jsb2NrY2hhaW4vYmxvY2tjaGFpbi1wcm9qIn0=