'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var _AppDispatcher = require('../../core/AppDispatcher');

var _AppDispatcher2 = _interopRequireDefault(_AppDispatcher);

var _Constant = require('../../support/Constant');

var _Constant2 = _interopRequireDefault(_Constant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/home/victorpham1997/Workplace/SUTD/50037_blockchain/blockchain-proj/views/modals/EnterPrivateKeyModal.js';
// Copyright (c) 2018 Nguyen Vu Nhat Minh
// Distributed under the MIT software license, see the accompanying file LICENSE

var EnterPrivateKeyModal = function (_Component) {
    (0, _inherits3.default)(EnterPrivateKeyModal, _Component);

    function EnterPrivateKeyModal(props) {
        (0, _classCallCheck3.default)(this, EnterPrivateKeyModal);

        var _this = (0, _possibleConstructorReturn3.default)(this, (EnterPrivateKeyModal.__proto__ || (0, _getPrototypeOf2.default)(EnterPrivateKeyModal)).call(this, props));

        _this.handleClose = function (e) {
            e.preventDefault();
            _this.setState({ errorMessage: "" });
            _this.setState({ modalOpen: false });
        };

        _this.handleConfirm = function (e) {
            e.preventDefault();
            _this.setState({ errorMessage: "" });

            var success = _this.account.storePrivateKey(_this.state.key);
            if (success) {
                _this.setState({ modalOpen: false });
                window.location.reload();
            } else {
                _this.setState({ errorMessage: "Invalid private key" });
            }
        };

        _this.state = { modalOpen: false, key: "", errorMessage: "" };
        _this.account = props.account;
        return _this;
    }

    (0, _createClass3.default)(EnterPrivateKeyModal, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _this2 = this;

            _AppDispatcher2.default.register(function (payload) {
                if (payload.action == _Constant2.default.ACTION.OPEN_PRIVATE_KEY_MODAL) {
                    _this2.setState({ modalOpen: true });
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            return _react2.default.createElement(_semanticUiReact.Modal, {
                open: this.state.modalOpen,
                onClose: this.handleClose,
                size: 'small',
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 53
                }
            }, _react2.default.createElement(_semanticUiReact.Header, { icon: '', content: 'Import private key', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 58
                }
            }), _react2.default.createElement(_semanticUiReact.Modal.Content, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 59
                }
            }, _react2.default.createElement(_semanticUiReact.Input, { fluid: true, value: this.state.key,
                onChange: function onChange(event) {
                    return _this3.setState({ key: event.target.value });
                },
                placeholder: 'Ethereum private key', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 60
                }
            }), _react2.default.createElement(_semanticUiReact.Message, { error: true, header: this.state.errorMessage, hidden: this.state.errorMessage == "", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 63
                }
            }), _react2.default.createElement('p', { style: { marginTop: 20 }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 64
                }
            }, 'By clicking Confirm, you also agree to our ', _react2.default.createElement('a', { href: '/terms', target: '_blank', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 64
                }
            }, 'Terms of use'))), _react2.default.createElement(_semanticUiReact.Modal.Actions, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 66
                }
            }, _react2.default.createElement(_semanticUiReact.Button, { color: 'blue', onClick: this.handleConfirm, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 67
                }
            }, _react2.default.createElement(_semanticUiReact.Icon, { name: 'checkmark', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 68
                }
            }), ' Confirm'), _react2.default.createElement(_semanticUiReact.Button, { color: 'grey', onClick: this.handleClose, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 70
                }
            }, _react2.default.createElement(_semanticUiReact.Icon, { name: 'close', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 71
                }
            }), ' Close')));
        }
    }]);

    return EnterPrivateKeyModal;
}(_react.Component);

exports.default = EnterPrivateKeyModal;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZXdzL21vZGFscy9FbnRlclByaXZhdGVLZXlNb2RhbC5qcyJdLCJuYW1lcyI6WyJDb21wb25lbnQiLCJNb2RhbCIsIkhlYWRlciIsIkJ1dHRvbiIsIkljb24iLCJJbnB1dCIsIk1lc3NhZ2UiLCJhcHBEaXNwYXRjaGVyIiwiQ29uc3RhbnQiLCJFbnRlclByaXZhdGVLZXlNb2RhbCIsInByb3BzIiwiaGFuZGxlQ2xvc2UiLCJlIiwicHJldmVudERlZmF1bHQiLCJzZXRTdGF0ZSIsImVycm9yTWVzc2FnZSIsIm1vZGFsT3BlbiIsImhhbmRsZUNvbmZpcm0iLCJzdWNjZXNzIiwiYWNjb3VudCIsInN0b3JlUHJpdmF0ZUtleSIsInN0YXRlIiwia2V5Iiwid2luZG93IiwibG9jYXRpb24iLCJyZWxvYWQiLCJyZWdpc3RlciIsInBheWxvYWQiLCJhY3Rpb24iLCJBQ1RJT04iLCJPUEVOX1BSSVZBVEVfS0VZX01PREFMIiwiZXZlbnQiLCJ0YXJnZXQiLCJ2YWx1ZSIsIm1hcmdpblRvcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSUEsQUFDSSxBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0E7O0FBRUosQUFBTyxBQUFtQjs7OztBQUMxQixBQUFPLEFBQWM7Ozs7Ozs7QUFickI7QUFDQSxBQUVBLEFBQVE7O0ksQUFZRjtrREFDRjs7a0NBQUEsQUFBWSxPQUFPOzRDQUFBOztzS0FBQSxBQUNUOztjQURTLEFBTW5CLGNBQWMsVUFBQSxBQUFDLEdBQU0sQUFDakI7Y0FBQSxBQUFFLEFBQ0Y7a0JBQUEsQUFBSyxTQUFTLEVBQUMsY0FBZixBQUFjLEFBQWUsQUFDN0I7a0JBQUEsQUFBSyxTQUFTLEVBQUUsV0FBaEIsQUFBYyxBQUFhLEFBQzlCO0FBVmtCOztjQUFBLEFBWW5CLGdCQUFnQixVQUFBLEFBQUMsR0FBTSxBQUNuQjtjQUFBLEFBQUUsQUFDRjtrQkFBQSxBQUFLLFNBQVMsRUFBQyxjQUFmLEFBQWMsQUFBZSxBQUU3Qjs7Z0JBQUksVUFBVSxNQUFBLEFBQUssUUFBTCxBQUFhLGdCQUFnQixNQUFBLEFBQUssTUFBaEQsQUFBYyxBQUF3QyxBQUN0RDtnQkFBQSxBQUFJLFNBQVMsQUFDVDtzQkFBQSxBQUFLLFNBQVMsRUFBRSxXQUFoQixBQUFjLEFBQWEsQUFDM0I7dUJBQUEsQUFBTyxTQUFQLEFBQWdCLEFBQ25CO0FBSEQsbUJBR08sQUFDSDtzQkFBQSxBQUFLLFNBQVMsRUFBQyxjQUFmLEFBQWMsQUFBZSxBQUNoQztBQUVKO0FBeEJrQixBQUVmOztjQUFBLEFBQUssUUFBUSxFQUFFLFdBQUYsQUFBYSxPQUFPLEtBQXBCLEFBQXlCLElBQUksY0FBMUMsQUFBYSxBQUEwQyxBQUN2RDtjQUFBLEFBQUssVUFBVSxNQUhBLEFBR2YsQUFBcUI7ZUFDeEI7Ozs7OzZDQXNCb0I7eUJBQ2pCOztvQ0FBQSxBQUFjLFNBQVMsVUFBQSxBQUFDLFNBQVksQUFDaEM7b0JBQUksUUFBQSxBQUFRLFVBQVUsbUJBQUEsQUFBUyxPQUEvQixBQUFzQyx3QkFBd0IsQUFDMUQ7MkJBQUEsQUFBSyxTQUFTLEVBQUMsV0FBZixBQUFjLEFBQVksQUFDN0I7QUFDSjtBQUpELEFBS0g7Ozs7aUNBRVE7eUJBQ0w7O21DQUNJLEFBQUM7c0JBQ1MsS0FBQSxBQUFLLE1BRGYsQUFDcUIsQUFDakI7eUJBQVMsS0FGYixBQUVrQixBQUNkO3NCQUhKLEFBR1M7OzhCQUhUO2dDQUFBLEFBS0k7QUFMSjtBQUNJLGFBREosa0JBS0ksQUFBQyx5Q0FBTyxNQUFSLEFBQWEsSUFBRyxTQUFoQixBQUF3Qjs4QkFBeEI7Z0NBTEosQUFLSSxBQUNJO0FBREo7Z0NBQ0ssY0FBRCx1QkFBQSxBQUFPOzs4QkFBUDtnQ0FBQSxBQUNJO0FBREo7QUFBQSwrQkFDSSxBQUFDLHdDQUFNLE9BQVAsTUFBYSxPQUFPLEtBQUEsQUFBSyxNQUF6QixBQUErQixBQUMzQjswQkFBVSx5QkFBQTsyQkFBUyxPQUFBLEFBQUssU0FBUyxFQUFDLEtBQUssTUFBQSxBQUFNLE9BQW5DLEFBQVMsQUFBYyxBQUFtQjtBQUR4RCxBQUVJOzZCQUZKLEFBRWdCOzhCQUZoQjtnQ0FESixBQUNJLEFBR0E7QUFIQTtnQ0FHQSxBQUFDLDBDQUFRLE9BQVQsTUFBZSxRQUFRLEtBQUEsQUFBSyxNQUE1QixBQUFrQyxjQUFjLFFBQVEsS0FBQSxBQUFLLE1BQUwsQUFBVyxnQkFBbkUsQUFBbUY7OEJBQW5GO2dDQUpKLEFBSUksQUFDQTtBQURBO2dDQUNBLGNBQUEsT0FBRyxPQUFPLEVBQUMsV0FBWCxBQUFVLEFBQVk7OEJBQXRCO2dDQUFBO0FBQUE7ZUFBc0UsK0RBQUEsY0FBQSxPQUFHLE1BQUgsQUFBUSxVQUFTLFFBQWpCLEFBQXdCOzhCQUF4QjtnQ0FBQTtBQUFBO2VBWGxGLEFBTVEsQUFLSSxBQUFzRSxBQUUxRSxtQ0FBQyxjQUFELHVCQUFBLEFBQU87OzhCQUFQO2dDQUFBLEFBQ0E7QUFEQTtBQUFBLCtCQUNBLEFBQUMseUNBQU8sT0FBUixBQUFjLFFBQU8sU0FBUyxLQUE5QixBQUFtQzs4QkFBbkM7Z0NBQUEsQUFDSTtBQURKOytCQUNJLEFBQUMsdUNBQUssTUFBTixBQUFXOzhCQUFYO2dDQURKLEFBQ0k7QUFBQTtnQkFGSixBQUNBLEFBR0EsNkJBQUEsQUFBQyx5Q0FBTyxPQUFSLEFBQWMsUUFBTyxTQUFTLEtBQTlCLEFBQW1DOzhCQUFuQztnQ0FBQSxBQUNJO0FBREo7K0JBQ0ksQUFBQyx1Q0FBSyxNQUFOLEFBQVc7OEJBQVg7Z0NBREosQUFDSTtBQUFBO2dCQW5CaEIsQUFDSSxBQWFRLEFBSUEsQUFNZjs7Ozs7QUE1RDhCLEEsQUErRG5DOztrQkFBQSxBQUFlIiwiZmlsZSI6IkVudGVyUHJpdmF0ZUtleU1vZGFsLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3ZpY3RvcnBoYW0xOTk3L1dvcmtwbGFjZS9TVVRELzUwMDM3X2Jsb2NrY2hhaW4vYmxvY2tjaGFpbi1wcm9qIn0=