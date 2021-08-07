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

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

var _Constant = require('../support/Constant');

var _Constant2 = _interopRequireDefault(_Constant);

var _Config = require('../support/Config');

var _Config2 = _interopRequireDefault(_Config);

var _flux = require('flux');

var _web = require('../ethereum/web3');

var _web2 = _interopRequireDefault(_web);

var _ethereumjsTx = require('ethereumjs-tx');

var _ethereumjsTx2 = _interopRequireDefault(_ethereumjsTx);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright (c) 2018 Nguyen Vu Nhat Minh
// Distributed under the MIT software license, see the accompanying file LICENSE

var TransactionsManager = function () {
    function TransactionsManager(account) {
        var _this = this;

        (0, _classCallCheck3.default)(this, TransactionsManager);

        this.approveTransaction = function () {
            var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(transactionId, gasPrice, gasAmount, method) {
                var emitter, data, transactionCount, rawTx, tx, serializedTx, txHash;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                emitter = _this.emitterMapping[transactionId];
                                data = method.encodeABI();
                                _context.next = 4;
                                return _web2.default.eth.getTransactionCount(_this.account.getAddress());

                            case 4:
                                transactionCount = _context.sent;
                                rawTx = {
                                    nonce: parseInt(transactionCount + _this.numPendingTx),
                                    gasPrice: parseInt(gasPrice),
                                    gasLimit: parseInt(gasAmount),
                                    to: _Config2.default.ENV.ContractAddress,
                                    value: 0,
                                    data: data
                                };
                                tx = new _ethereumjsTx2.default(rawTx);

                                tx.sign(_this.account.getPrivateKeyBuffer());
                                serializedTx = tx.serialize();
                                txHash = '0x' + tx.hash().toString('hex');

                                _this.updatePendingTx(_this.numPendingTx + 1);
                                _web2.default.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('receipt', function (receipt) {
                                    _this.updatePendingTx(_this.numPendingTx - 1);
                                    emitter.emit(_Constant2.default.EVENT.ON_RECEIPT, receipt);
                                }).on('error', function (err, data) {
                                    _this.updatePendingTx(_this.numPendingTx - 1);
                                    emitter.emit(_Constant2.default.EVENT.ON_ERROR, err, txHash);
                                });
                                emitter.emit(_Constant2.default.EVENT.ON_APPROVED, txHash);

                            case 13:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, _this);
            }));

            return function (_x, _x2, _x3, _x4) {
                return _ref.apply(this, arguments);
            };
        }();

        this.rejectTransaction = function (transactionId) {
            var emitter = _this.emitterMapping[transactionId];
            emitter.emit(_Constant2.default.EVENT.ON_REJECTED);

            delete _this.emitterMapping[transactionId];
        };

        this.automaticallyApproveTransaction = function () {
            var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(transactionId, method) {
                var estimatedGas, gasPrice;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.prev = 0;
                                _context2.next = 3;
                                return method.estimateGas({
                                    gas: 3000000
                                });

                            case 3:
                                estimatedGas = _context2.sent;
                                _context2.next = 9;
                                break;

                            case 6:
                                _context2.prev = 6;
                                _context2.t0 = _context2['catch'](0);

                                estimatedGas = 3000000;

                            case 9:
                                _context2.next = 11;
                                return _web2.default.eth.getGasPrice();

                            case 11:
                                gasPrice = _context2.sent;

                                _this.approveTransaction(transactionId, gasPrice, estimatedGas, method);

                            case 13:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, _this, [[0, 6]]);
            }));

            return function (_x5, _x6) {
                return _ref2.apply(this, arguments);
            };
        }();

        this.account = account;
        this.numPendingTx = 0; // Number of pending Ethereum transactions
        this.emitterMapping = {}; // A mapping of an increamental id with an event emitter in order
        // to emit user approval and transaction results.

        this.emitterIncrementalId = 0; // will be increased everytime executeMethod get called
        this.dispatcher = new _flux.Dispatcher();

        this.dispatcher.register(function (payload) {
            if (payload.action == _Constant2.default.ACTION.APPROVE_TRANSACTION) {
                _this.approveTransaction(payload.transactionId, payload.gasPrice, payload.gasAmount, payload.method);
            } else if (payload.action == _Constant2.default.ACTION.REJECT_TRANSACTION) {
                _this.rejectTransaction(payload.transactionId);
            }
        });
    }

    /**
     * @description Get called when user click on Approve button from a TransactionModal
     */

    /**
     * @description Get called when user click on Approve button from a TransactionModal
     */

    (0, _createClass3.default)(TransactionsManager, [{
        key: 'updatePendingTx',
        value: function updatePendingTx(numPendingTx) {
            this.numPendingTx = numPendingTx;
            this.dispatcher.dispatch({
                action: _Constant2.default.EVENT.PENDING_TRANSACTION_UPDATED,
                numPendingTx: this.numPendingTx
            });
        }

        /**
         * @description Execute a web3's method by signing and sending the raw transaction to EtherChat contract.
         * @param {*} method Web3 contract method instance, which contains method's parameters.
         */

    }, {
        key: 'executeMethod',
        value: function executeMethod(method) {
            this.emitterIncrementalId++;
            var emitter = new _events2.default();
            this.emitterMapping[this.emitterIncrementalId] = emitter;

            if (this.account.askForTransactionApproval) {
                this.dispatcher.dispatch({
                    action: _Constant2.default.ACTION.OPEN_TRANSACTION_MODAL,
                    method: method,
                    transactionId: this.emitterIncrementalId
                });
            } else {
                this.automaticallyApproveTransaction(this.emitterIncrementalId, method);
            }

            return emitter;
        }

        /**
         * @description Approve a transaction without asking for user permission. Gas price will be
         * calculated automatically
         */

    }]);

    return TransactionsManager;
}();

exports.default = TransactionsManager;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvVHJhbnNhY3Rpb25NYW5hZ2VyLmpzIl0sIm5hbWVzIjpbIkV2ZW50RW1pdHRlciIsIkNvbnN0YW50IiwiQ29uZmlnIiwiRGlzcGF0Y2hlciIsIndlYjMiLCJUeCIsIlRyYW5zYWN0aW9uc01hbmFnZXIiLCJhY2NvdW50IiwiYXBwcm92ZVRyYW5zYWN0aW9uIiwidHJhbnNhY3Rpb25JZCIsImdhc1ByaWNlIiwiZ2FzQW1vdW50IiwibWV0aG9kIiwiZW1pdHRlciIsImVtaXR0ZXJNYXBwaW5nIiwiZGF0YSIsImVuY29kZUFCSSIsImV0aCIsImdldFRyYW5zYWN0aW9uQ291bnQiLCJnZXRBZGRyZXNzIiwidHJhbnNhY3Rpb25Db3VudCIsInJhd1R4Iiwibm9uY2UiLCJwYXJzZUludCIsIm51bVBlbmRpbmdUeCIsImdhc0xpbWl0IiwidG8iLCJFTlYiLCJDb250cmFjdEFkZHJlc3MiLCJ2YWx1ZSIsInR4Iiwic2lnbiIsImdldFByaXZhdGVLZXlCdWZmZXIiLCJzZXJpYWxpemVkVHgiLCJzZXJpYWxpemUiLCJ0eEhhc2giLCJoYXNoIiwidG9TdHJpbmciLCJ1cGRhdGVQZW5kaW5nVHgiLCJzZW5kU2lnbmVkVHJhbnNhY3Rpb24iLCJvbiIsInJlY2VpcHQiLCJlbWl0IiwiRVZFTlQiLCJPTl9SRUNFSVBUIiwiZXJyIiwiT05fRVJST1IiLCJPTl9BUFBST1ZFRCIsInJlamVjdFRyYW5zYWN0aW9uIiwiT05fUkVKRUNURUQiLCJhdXRvbWF0aWNhbGx5QXBwcm92ZVRyYW5zYWN0aW9uIiwiZXN0aW1hdGVHYXMiLCJnYXMiLCJlc3RpbWF0ZWRHYXMiLCJnZXRHYXNQcmljZSIsImVtaXR0ZXJJbmNyZW1lbnRhbElkIiwiZGlzcGF0Y2hlciIsInJlZ2lzdGVyIiwicGF5bG9hZCIsImFjdGlvbiIsIkFDVElPTiIsIkFQUFJPVkVfVFJBTlNBQ1RJT04iLCJSRUpFQ1RfVFJBTlNBQ1RJT04iLCJkaXNwYXRjaCIsIlBFTkRJTkdfVFJBTlNBQ1RJT05fVVBEQVRFRCIs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LFFBQVEsQUFDbEI7aUJBQUEsQUFBSyxBQUNMO2dCQUFJLFVBQUosQUFBYyxBQUFJLEFBQ2xCO2lCQUFBLEFBQUssZUFBZSxLQUFwQixBQUF5Qix3QkFBekIsQUFBaUQsQUFFakQ7O2dCQUFJLEtBQUEsQUFBSyxRQUFULEFBQWlCLDJCQUEyQixBQUN4QztxQkFBQSxBQUFLLFdBQUwsQUFBZ0I7NEJBQ0osbUJBQUEsQUFBUyxPQURJLEFBQ0csQUFDeEI7NEJBRnFCLEFBRWIsQUFDUjttQ0FBZSxLQUhuQixBQUF5QixBQUdELEFBRTNCO0FBTDRCLEFBQ3JCO0FBRlIsbUJBTU8sQUFDSDtxQkFBQSxBQUFLLGdDQUFnQyxLQUFyQyxBQUEwQyxzQkFBMUMsQUFBZ0UsQUFDbkU7QUFFRDs7bUJBQUEsQUFBTyxBQUNWO0FBRUQ7Ozs7Ozs7Ozs7QUFrQko7O2tCQUFBLEFBQWUiLCJmaWxlIjoiVHJhbnNhY3Rpb25NYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3ZpY3RvcnBoYW0xOTk3L1dvcmtwbGFjZS9TVVRELzUwMDM3X2Jsb2NrY2hhaW4vYmxvY2tjaGFpbi1wcm9qIn0=