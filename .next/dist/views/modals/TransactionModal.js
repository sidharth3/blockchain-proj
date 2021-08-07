'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = require('semantic-ui-react');

var _Constant = require('../../support/Constant');

var _Constant2 = _interopRequireDefault(_Constant);

var _web = require('../../ethereum/web3');

var _web2 = _interopRequireDefault(_web);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/home/victorpham1997/Workplace/SUTD/50037_blockchain/blockchain-proj/views/modals/TransactionModal.js';
// Copyright (c) 2018 Nguyen Vu Nhat Minh
// Distributed under the MIT software license, see the accompanying file LICENSE

var TransactionModal = function (_Component) {
    (0, _inherits3.default)(TransactionModal, _Component);

    function TransactionModal(props) {
        var _this2 = this;

        (0, _classCallCheck3.default)(this, TransactionModal);

        var _this = (0, _possibleConstructorReturn3.default)(this, (TransactionModal.__proto__ || (0, _getPrototypeOf2.default)(TransactionModal)).call(this, props));

        _this.handleReject = function (e) {
            e.preventDefault();
            _this.setState({ modalOpen: false });

            _this.dispatcher.dispatch({
                action: _Constant2.default.ACTION.REJECT_TRANSACTION,
                transactionId: _this.state.transactionId
            });
        };

        _this.handleApprove = function (e) {
            e.preventDefault();
            _this.setState({ modalOpen: false });

            _this.dispatcher.dispatch({
                action: _Constant2.default.ACTION.APPROVE_TRANSACTION,
                transactionId: _this.state.transactionId,
                method: _this.method,
                gasPrice: _this.state.gasPrice,
                gasAmount: _this.state.estimatedGas
            });
        };

        _this.componentDidMount = function () {
            _this.dispatcher.register(function (payload) {
                if (payload.action == _Constant2.default.ACTION.OPEN_TRANSACTION_MODAL) {
                    _this.method = payload.method;
                    _this.setState({ modalOpen: true, estimatedGas: 0, gasPrice: 0, transactionId: payload.transactionId });
                    _this.updateInfo();
                }
            });
        };

        _this.updateInfo = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
            var estimatedGas, warningMessage, gasPrice;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            warningMessage = "";
                            _context.prev = 1;
                            _context.next = 4;
                            return _this.method.estimateGas({
                                gas: 3000000
                                // from: this.account.getAddress()
                            });

                        case 4:
                            estimatedGas = _context.sent;
                            _context.next = 11;
                            break;

                        case 7:
                            _context.prev = 7;
                            _context.t0 = _context['catch'](1);

                            estimatedGas = 3000000;
                            if (_context.t0) {
                                warningMessage = _context.t0.message;
                            }

                        case 11:
                            _context.next = 13;
                            return _web2.default.eth.getGasPrice();

                        case 13:
                            gasPrice = _context.sent;

                            _this.setState({ estimatedGas: estimatedGas, gasPrice: gasPrice, warningMessage: warningMessage });

                        case 15:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this2, [[1, 7]]);
        }));

        _this.dispatcher = props.dispatcher;
        _this.state = { modalOpen: false, estimatedGas: 0, gasPrice: 0, transactionId: 0, warningMessage: "" };
        return _this;
    }

    (0, _createClass3.default)(TransactionModal, [{
        key: 'render',
        value: function render() {
            var _this3 = this;

            var content = _react2.default.createElement(_semanticUiReact.Dimmer.Dimmable, { as: _semanticUiReact.Modal.Content, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 78
                }
            }, _react2.default.createElement(_semanticUiReact.Dimmer, { active: true, inverted: true, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 79
                }
            }, _react2.default.createElement(_semanticUiReact.Loader, { active: true, inline: 'centered', inverted: true, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 79
                }
            })));
            if (this.state.gasPrice) {
                content = _react2.default.createElement(_semanticUiReact.Modal.Content, {
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 84
                    }
                }, _react2.default.createElement(_semanticUiReact.Form, { warning: this.state.warningMessage != "", __source: {
                        fileName: _jsxFileName,
                        lineNumber: 85
                    }
                }, _react2.default.createElement(_semanticUiReact.Form.Field, {
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 86
                    }
                }, 'The gas price is suggested by the last few blocks median gas price.'), _react2.default.createElement(_semanticUiReact.Form.Field, { inline: true, __source: {
                        fileName: _jsxFileName,
                        lineNumber: 89
                    }
                }, _react2.default.createElement('label', {
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 90
                    }
                }, 'Gas limit: '), _react2.default.createElement('input', { value: this.state.estimatedGas, disabled: true, __source: {
                        fileName: _jsxFileName,
                        lineNumber: 91
                    }
                })), _react2.default.createElement(_semanticUiReact.Form.Field, { inline: true, __source: {
                        fileName: _jsxFileName,
                        lineNumber: 93
                    }
                }, _react2.default.createElement('label', {
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 94
                    }
                }, 'Gas price'), _react2.default.createElement(_semanticUiReact.Input, { value: _web2.default.utils.fromWei(this.state.gasPrice, 'gwei'),
                    label: { basic: true, content: 'Gwei' }, labelPosition: 'right',
                    onChange: function onChange(e) {
                        if (e.target.value < 1000000) {
                            _this3.setState({ gasPrice: _web2.default.utils.toWei(e.target.value, 'gwei') });
                        }
                    },
                    style: { textAlign: 'right' }, __source: {
                        fileName: _jsxFileName,
                        lineNumber: 95
                    }
                })), _react2.default.createElement(_semanticUiReact.Form.Field, { inline: true, __source: {
                        fileName: _jsxFileName,
                        lineNumber: 105
                    }
                }, _react2.default.createElement('label', {
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 106
                    }
                }, 'Transaction fee: '), _react2.default.createElement('label', {
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 107
                    }
                }, _web2.default.utils.fromWei((this.state.estimatedGas * this.state.gasPrice).toString(), 'ether') + ' ETH')), _react2.default.createElement(_semanticUiReact.Form.Field, {
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 109
                    }
                }, _react2.default.createElement(_semanticUiReact.Message, { warning: true, __source: {
                        fileName: _jsxFileName,
                        lineNumber: 110
                    }
                }, this.state.warningMessage))));
            }

            return _react2.default.createElement(_semanticUiReact.Modal, {
                open: this.state.modalOpen,
                onClose: this.handleClose,
                size: 'mini',
                closeOnDimmerClick: false,
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 117
                }
            }, _react2.default.createElement(_semanticUiReact.Header, { icon: '', content: 'Confirm transaction', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 123
                }
            }), content, _react2.default.createElement(_semanticUiReact.Modal.Actions, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 125
                }
            }, _react2.default.createElement(_semanticUiReact.Button, { color: 'orange', onClick: this.handleApprove, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 126
                }
            }, 'Approve'), _react2.default.createElement(_semanticUiReact.Button, { color: 'red', onClick: this.handleReject, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 129
                }
            }, 'Reject')));
        }
    }]);

    return TransactionModal;
}(_react.Component);

exports.default = TransactionModal;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZXdzL21vZGFscy9UcmFuc2FjdGlvbk1vZGFsLmpzIl0sIm5hbWVzIjpbIkNvbXBvbmVudCIsIk1vZGFsIiwiSGVhZGVyIiwiQnV0dG9uIiwiTWVzc2FnZSIsIkxvYWRlciIsIkRpbW1lciIsIkZvcm0iLCJJbnB1dCIsIkNvbnN0YW50Iiwid2ViMyIsIlRyYW5zYWN0aW9uTW9kYWwiLCJwcm9wcyIsImhhbmRsZVJlamVjdCIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInNldFN0YXRlIiwibW9kYWxPcGVuIiwiZGlzcGF0Y2hlciIsImRpc3BhdGNoIiwiYWN0aW9uIiwiQUNUSU9OIiwiUkVKRUNUX1RSQU5TQUNUSU9OIiwidHJhbnNhY3Rpb25JZCIsInN0YXRlIiwiaGFuZGxlQXBwcm92ZSIsIkFQUFJPVkVfVFJBTlNBQ1RJT04iLCJtZXRob2QiLCJnYXNQcmljZSIsImdhc0Ftb3VudCIsImVzdGltYXRlZEdhcyIsImNvbXBvbmVudERpZE1vdW50IiwicmVnaXN0ZXIiLCJwYXlsb2FkIiwiT1BFTl9UUkFOU0FDVElPTl9NT0RBTCIsInVwZGF0ZUluZm8iLCJ3YXJuaW5nTWVzc2FnZSIsImVzdGltYXRlR2FzIiwiZ2FzIiwibWVzc2FnZSIsImV0aCIsImdldEdhc1ByaWNlIiwiY29udGVudCIsIkNvbnRlbnQiLCJ1dGlscyIsImZyb21XZWkiLCJiYXNpYyIsInRhcmdldCIsInZhbHVlIiwidG9XZWkiLCJ0ZXh0QWxpZ24iLCJ0b1N0cmluZyIsImhhbmRsZUNsb3NlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUlBLEFBQ0ksQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQTs7QUFFSixBQUFPLEFBQWM7Ozs7QUFDckIsQUFBTyxBQUFVOzs7Ozs7O0FBZmpCO0FBQ0EsQUFFQSxBQUFROztJLEFBY0Y7OENBQ0Y7OzhCQUFBLEFBQVksT0FBTztxQkFBQTs7NENBQUE7OzhKQUFBLEFBQ1Q7O2NBRFMs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SyxNQUFMLEFBQVcsUUFBUSxDQUFDLEtBQUEsQUFBSyxNQUFMLEFBQVcsZUFBYSxLQUFBLEFBQUssTUFBOUIsQUFBb0MsVUFBdkQsQUFBbUIsQUFBOEMsWUFBakUsQUFBNkUsV0F0QnpGLEFBb0JJLEFBRUEsQUFBZ0csQUFFaEcsMEJBQUMsY0FBRCxzQkFBQSxBQUFNOztrQ0FBTjtvQ0FBQSxBQUNJO0FBREo7QUFBQSxtQ0FDSSxBQUFDLDBDQUFRLFNBQVQ7a0NBQUE7b0NBQUEsQUFBa0I7QUFBbEI7d0JBQWtCLEFBQUssTUEzQm5DLEFBQ0EsQUFDSSxBQXdCSSxBQUNJLEFBQTZCLEFBSTVDO0FBRUQ7O21DQUNJLEFBQUM7c0JBQ1MsS0FBQSxBQUFLLE1BRGYsQUFDcUIsQUFDakI7eUJBQVMsS0FGYixBQUVrQixBQUNkO3NCQUhKLEFBR1MsQUFDTDtvQ0FKSixBQUl3Qjs7OEJBSnhCO2dDQUFBLEFBTUk7QUFOSjtBQUNJLGFBREosa0JBTUksQUFBQyx5Q0FBTyxNQUFSLEFBQWEsSUFBRyxTQUFoQixBQUF3Qjs4QkFBeEI7Z0NBTkosQUFNSSxBQUNLO0FBREw7Z0JBTkosQUFRUSx5QkFBQyxjQUFELHVCQUFBLEFBQU87OzhCQUFQO2dDQUFBLEFBQ0E7QUFEQTtBQUFBLCtCQUNBLEFBQUMseUNBQU8sT0FBUixBQUFjLFVBQVMsU0FBUyxLQUFoQyxBQUFxQzs4QkFBckM7Z0NBQUE7QUFBQTtlQURBLEFBQ0EsQUFHQSw0QkFBQSxBQUFDLHlDQUFPLE9BQVIsQUFBYyxPQUFNLFNBQVMsS0FBN0IsQUFBa0M7OEJBQWxDO2dDQUFBO0FBQUE7ZUFiWixBQUNJLEFBUVEsQUFJQSxBQU1mOzs7OztBQXJIMEIsQSxBQXdIL0I7O2tCQUFBLEFBQWUiLCJmaWxlIjoiVHJhbnNhY3Rpb25Nb2RhbC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS92aWN0b3JwaGFtMTk5Ny9Xb3JrcGxhY2UvU1VURC81MDAzN19ibG9ja2NoYWluL2Jsb2NrY2hhaW4tcHJvaiJ9