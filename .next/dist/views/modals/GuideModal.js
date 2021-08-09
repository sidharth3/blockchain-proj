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

var _jsxFileName = '/home/victorpham1997/Workplace/SUTD/50037_blockchain/blockchain-proj/views/modals/GuideModal.js';
// Copyright (c) 2018 Nguyen Vu Nhat Minh
// Distributed under the MIT software license, see the accompanying file LICENSE

var GuideModal = function (_Component) {
    (0, _inherits3.default)(GuideModal, _Component);

    function GuideModal() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, GuideModal);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = GuideModal.__proto__ || (0, _getPrototypeOf2.default)(GuideModal)).call.apply(_ref, [this].concat(args))), _this), _this.state = { modalOpen: false, key: "" }, _this.handleClose = function (e) {
            e.preventDefault();
            _this.setState({ modalOpen: false });

            var firstTimeUse = window.localStorage.firstTimeUse;
            if (firstTimeUse == undefined) {
                window.localStorage.setItem('firstTimeUse', "false");
                _AppDispatcher2.default.dispatch({
                    action: _Constant2.default.ACTION.OPEN_PRIVATE_KEY_MODAL
                });
            }
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(GuideModal, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            this.checkForFirstTime();
            _AppDispatcher2.default.register(function (payload) {
                if (payload.action == _Constant2.default.ACTION.OPEN_GUIDE) {
                    _this2.setState({ modalOpen: true });
                }
            });
        }
    }, {
        key: 'checkForFirstTime',
        value: function checkForFirstTime() {
            if (typeof Storage !== "undefined") {
                var firstTimeUse = window.localStorage.firstTimeUse;
                if (firstTimeUse == undefined || firstTimeUse == false) {
                    this.setState({ modalOpen: true });
                }
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(_semanticUiReact.Modal, {
                open: this.state.modalOpen,
                onClose: this.handleClose,
                size: 'small',
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 50
                }
            }, _react2.default.createElement(_semanticUiReact.Header, { icon: '', content: 'Welcome to EtherChat', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 55
                }
            }), _react2.default.createElement(_semanticUiReact.Modal.Content, { style: { fontSize: '1.2em' }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 56
                }
            }, _react2.default.createElement('h2', {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 57
                }
            }, 'Please read our note carefully'), _react2.default.createElement('p', {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 58
                }
            }, 'EtherChat is an Ethereum app that allows you to send encrypted messages via a smart contract that only you and the recipient of a message can decrypt it. EtherChat can operate without any centralized server'), _react2.default.createElement('p', {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 61
                }
            }, 'You will be required to key in your Ethereum private key in order to use EtherChat. Make sure that you understand the risk of giving your private key to any third party.'), _react2.default.createElement('p', {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 64
                }
            }, 'We recommend you to try EtherChat on Rinkeby test net. You can get free ether on Rinkeby at https://faucet.rinkeby.io/.'), _react2.default.createElement('p', {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 65
                }
            }, 'All orange colored buttons you see on EtherChat.co will require you to pay a small transaction fee. By default, when you clicked on an orange button, a transaction will be submitted to the network automatically. However, you can disable it by turning on the transaction details dialog in "Settings".'), _react2.default.createElement('p', {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 68
                }
            }, 'EtherChat is an open source project and available at: ', _react2.default.createElement('a', { href: _Constant2.default.GITHUB_LINK, target: '_blank', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 68
                }
            }, 'Github link')), _react2.default.createElement('p', {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 69
                }
            }, 'We also published an ', _react2.default.createElement('a', { href: _Constant2.default.MEDIUM_LINK, target: '_blank', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 69
                }
            }, 'article on medium'))), _react2.default.createElement(_semanticUiReact.Modal.Actions, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 71
                }
            }, _react2.default.createElement(_semanticUiReact.Button, { color: 'green', onClick: this.handleClose, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 72
                }
            }, _react2.default.createElement(_semanticUiReact.Icon, { name: 'checkmark', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 73
                }
            }), ' Got it')));
        }
    }]);

    return GuideModal;
}(_react.Component);

exports.default = GuideModal;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZXdzL21vZGFscy9HdWlkZU1vZGFsLmpzIl0sIm5hbWVzIjpbIkNvbXBvbmVudCIsIk1vZGFsIiwiSGVhZGVyIiwiQnV0dG9uIiwiSWNvbiIsImFwcERpc3BhdGNoZXIiLCJDb25zdGFudCIsIkd1aWRlTW9kYWwiLCJzdGF0ZSIsIm1vZGFsT3BlbiIsImtleSIsImhhbmRsZUNsb3NlIiwiZSIsInByZXZlbnREZWZhdWx0Iiwic2V0U3RhdGUiLCJmaXJzdFRpbWVVc2UiLCJ3aW5kb3ciLCJsb2NhbFN0b3JhZ2UiLCJ1bmRlZmluZWQiLCJzZXRJdGVtIiwiZGlzcGF0Y2giLCJhY3Rpb24iLCJBQ1RJT04iLCJPUEVOX1BSSVZBVEVfS0VZX01PREFMIiwiY2hlY2tGb3JGaXJzdFRpbWUiLCJyZWdpc3RlciIsInBheWxvYWQiLCJPUEVOX0dVSURFIiwiU3RvcmFnZSIsImZvbnRTaXplIiwiR0lUSFVCX0xJTksiLCJNRURJVU1fTElOSyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSUEsQUFDSSxBQUNBLEFBQ0EsQUFDQTs7QUFFSixBQUFPLEFBQW1COzs7O0FBQzFCLEFBQU8sQUFBYzs7Ozs7OztBQVhyQjtBQUNBLEFBRUEsQUFBUTs7SSxBQVVGOzs7Ozs7Ozs7Ozs7Ozt3TixBQUNGLFFBQVEsRUFBRSxXQUFGLEFBQWEsT0FBTyxLQUFwQixBQUF5QixBLFlBRWpDLEEsY0FBYyxVQUFBLEFBQUMsR0FBTSxBQUNqQjtjQUFBLEFBQUUsQUFDRjtrQkFBQSxBQUFLLFNBQVMsRUFBRSxXQUFoQixBQUFjLEFBQWEsQUFFM0I7O2dCQUFJLGVBQWUsT0FBQSxBQUFPLGFBQTFCLEFBQXVDLEFBQ3ZDO2dCQUFJLGdCQUFKLEFBQW9CLFdBQVcsQUFDM0I7dUJBQUEsQUFBTyxhQUFQLEFBQW9CLFFBQXBCLEFBQTRCLGdCQUE1QixBQUE0QyxBQUM1Qzt3Q0FBQSxBQUFjOzRCQUNGLG1CQUFBLEFBQVMsT0FEckIsQUFBdUIsQUFDSyxBQUUvQjtBQUgwQixBQUNuQjtBQUdYO0E7Ozs7OzRDQUVtQjt5QkFDaEI7O2lCQUFBLEFBQUssQUFDTDtvQ0FBQSxBQUFjLFNBQVMsVUFBQSxBQUFDLFNBQVksQUFDaEM7b0JBQUksUUFBQSxBQUFRLFVBQVUsbUJBQUEsQUFBUyxPQUEvQixBQUFzQyxZQUFZLEFBQzlDOzJCQUFBLEFBQUssU0FBUyxFQUFDLFdBQWYsQUFBYyxBQUFZLEFBQzdCO0FBQ0o7QUFKRCxBQUtIOzs7OzRDQUVtQixBQUNoQjtnQkFBSSxPQUFBLEFBQU8sWUFBWCxBQUF3QixhQUFhLEFBQ2pDO29CQUFJLGVBQWUsT0FBQSxBQUFPLGFBQTFCLEFBQXVDLEFBQ3ZDO29CQUFJLGdCQUFBLEFBQWdCLGFBQWEsZ0JBQWpDLEFBQWlELE9BQU8sQUFDcEQ7eUJBQUEsQUFBSyxTQUFTLEVBQUMsV0FBZixBQUFjLEFBQVksQUFDN0I7QUFDSjtBQUNKOzs7O2lDQUVRLEFBQ0w7bUNBQ0ksQUFBQztzQkFDUyxLQUFBLEFBQUssTUFEZixBQUNxQixBQUNqQjt5QkFBUyxLQUZiLEFBRWtCLEFBQ2Q7c0JBSEosQUFHUzs7OEJBSFQ7Z0NBQUEsQUFLSTtBQUxKO0FBQ0ksYUFESixrQkFLSSxBQUFDLHlDQUFPLE1BQVIsQUFBYSxJQUFHLFNBQWhCLEFBQXdCOzhCQUF4QjtnQ0FMSixBQUtJLEFBQ0k7QUFESjtnQ0FDSyxjQUFELHVCQUFBLEFBQU8sV0FBUSxPQUFPLEVBQUMsVUFBdkIsQUFBc0IsQUFBVzs4QkFBakM7Z0NBQUEsQUFDSTtBQURKOytCQUNJLGNBQUE7OzhCQUFBO2dDQUFBO0FBQUE7QUFBQSxlQURKLEFBQ0ksQUFDQSxtREFBQSxjQUFBOzs4QkFBQTtnQ0FBQTtBQUFBO0FBQUEsZUFGSixBQUVJLEFBR0EsbU9BQUEsY0FBQTs7OEJBQUE7Z0NBQUE7QUFBQTtBQUFBLGVBTEosQUFLSSxBQUdBLDhMQUFBLGNBQUE7OzhCQUFBO2dDQUFBO0FBQUE7QUFBQSxlQVJKLEFBUUksQUFDQSw0SUFBQSxjQUFBOzs4QkFBQTtnQ0FBQTtBQUFBO0FBQUEsZUFUSixBQVNJLEFBR0EsZ1VBQUEsY0FBQTs7OEJBQUE7Z0NBQUE7QUFBQTtBQUFBLGVBQXlELDBFQUFBLGNBQUEsT0FBRyxNQUFNLG1CQUFULEFBQWtCLGFBQWEsUUFBL0IsQUFBc0M7OEJBQXRDO2dDQUFBO0FBQUE7ZUFaN0QsQUFZSSxBQUF5RCxBQUN6RCxpQ0FBQSxjQUFBOzs4QkFBQTtnQ0FBQTtBQUFBO0FBQUEsZUFBd0IseUNBQUEsY0FBQSxPQUFHLE1BQU0sbUJBQVQsQUFBa0IsYUFBYSxRQUEvQixBQUFzQzs4QkFBdEM7Z0NBQUE7QUFBQTtlQW5CcEMsQUFNUSxBQWFJLEFBQXdCLEFBRTVCLHdDQUFDLGNBQUQsdUJBQUEsQUFBTzs7OEJBQVA7Z0NBQUEsQUFDQTtBQURBO0FBQUEsK0JBQ0EsQUFBQyx5Q0FBTyxPQUFSLEFBQWMsU0FBUSxTQUFTLEtBQS9CLEFBQW9DOzhCQUFwQztnQ0FBQSxBQUNJO0FBREo7K0JBQ0ksQUFBQyx1Q0FBSyxNQUFOLEFBQVc7OEJBQVg7Z0NBREosQUFDSTtBQUFBO2dCQXhCaEIsQUFDSSxBQXFCUSxBQUNBLEFBTWY7Ozs7O0FBaEVvQixBLEFBbUV6Qjs7a0JBQUEsQUFBZSIsImZpbGUiOiJHdWlkZU1vZGFsLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3ZpY3RvcnBoYW0xOTk3L1dvcmtwbGFjZS9TVVRELzUwMDM3X2Jsb2NrY2hhaW4vYmxvY2tjaGFpbi1wcm9qIn0=