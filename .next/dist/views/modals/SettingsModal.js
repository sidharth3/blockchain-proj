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

var _jsxFileName = '/home/victorpham1997/Workplace/SUTD/50037_blockchain/blockchain-proj/views/modals/SettingsModal.js';
// Copyright (c) 2018 Nguyen Vu Nhat Minh
// Distributed under the MIT software license, see the accompanying file LICENSE

var SettingsModal = function (_Component) {
    (0, _inherits3.default)(SettingsModal, _Component);

    function SettingsModal(props) {
        (0, _classCallCheck3.default)(this, SettingsModal);

        var _this = (0, _possibleConstructorReturn3.default)(this, (SettingsModal.__proto__ || (0, _getPrototypeOf2.default)(SettingsModal)).call(this, props));

        _this.handleClose = function (e) {
            e.preventDefault();
            _this.setState({ modalOpen: false });
        };

        _this.handleUpdate = function () {
            _this.account.setAskForTransactionApproval(_this.state.askForApproval);
            _this.setState({ modalOpen: false });
        };

        _this.account = props.account;
        _this.state = { modalOpen: false, askForApproval: false };
        return _this;
    }

    (0, _createClass3.default)(SettingsModal, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            _AppDispatcher2.default.register(function (payload) {
                if (payload.action == _Constant2.default.ACTION.OPEN_SETTINGS_MODAL) {
                    var askForApproval = _this2.account.askForTransactionApproval;
                    _this2.setState({ modalOpen: true, askForApproval: askForApproval });
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
                    lineNumber: 43
                }
            }, _react2.default.createElement(_semanticUiReact.Header, { icon: '', content: 'Settings', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 48
                }
            }), _react2.default.createElement(_semanticUiReact.Modal.Content, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 49
                }
            }, _react2.default.createElement(_semanticUiReact.Checkbox, { toggle: true, label: 'Ask for transaction approval', checked: this.state.askForApproval, onChange: function onChange(event, data) {
                    return _this3.setState({ askForApproval: data.checked });
                }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 50
                }
            })), _react2.default.createElement(_semanticUiReact.Modal.Actions, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 52
                }
            }, _react2.default.createElement(_semanticUiReact.Button, { color: 'blue', onClick: this.handleUpdate, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 53
                }
            }, 'Update'), _react2.default.createElement(_semanticUiReact.Button, { color: 'grey', onClick: this.handleClose, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 56
                }
            }, 'Close')));
        }
    }]);

    return SettingsModal;
}(_react.Component);

exports.default = SettingsModal;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZXdzL21vZGFscy9TZXR0aW5nc01vZGFsLmpzIl0sIm5hbWVzIjpbIkNvbXBvbmVudCIsIk1vZGFsIiwiSGVhZGVyIiwiQnV0dG9uIiwiTWVzc2FnZSIsIkNoZWNrYm94IiwiYXBwRGlzcGF0Y2hlciIsIkNvbnN0YW50IiwiU2V0dGluZ3NNb2RhbCIsInByb3BzIiwiaGFuZGxlQ2xvc2UiLCJlIiwicHJldmVudERlZmF1bHQiLCJzZXRTdGF0ZSIsIm1vZGFsT3BlbiIsImhhbmRsZVVwZGF0ZSIsImFjY291bnQiLCJzZXRBc2tGb3JUcmFuc2FjdGlvbkFwcHJvdmFsIiwic3RhdGUiLCJhc2tGb3JBcHByb3ZhbCIsInJlZ2lzdGVyIiwicGF5bG9hZCIsImFjdGlvbiIsIkFDVElPTiIsIk9QRU5fU0VUVElOR1NfTU9EQUwiLCJhc2tGb3JUcmFuc2FjdGlvbkFwcHJvdmFsIiwiZXZlbnQiLCJkYXRhIiwiY2hlY2tlZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSUEsQUFDSSxBQUNBLEFBQ0EsQUFDQSxBQUNBOztBQUVKLEFBQU8sQUFBbUI7Ozs7QUFDMUIsQUFBTyxBQUFjOzs7Ozs7O0FBWnJCO0FBQ0EsQUFFQSxBQUFROztJLEFBV0Y7MkNBQ0Y7OzJCQUFBLEFBQVksT0FBTzs0Q0FBQTs7d0pBQUEsQUFDVDs7Y0FEUyxBQU1uQixjQUFjLFVBQUEsQUFBQyxHQUFNLEFBQ2pCO2NBQUEsQUFBRSxBQUNGO2tCQUFBLEFBQUssU0FBUyxFQUFFLFdBQWhCLEFBQWMsQUFBYSxBQUM5QjtBQVRrQjs7Y0FBQSxBQVduQixlQUFlLFlBQU0sQUFDakI7a0JBQUEsQUFBSyxRQUFMLEFBQWEsNkJBQTZCLE1BQUEsQUFBSyxNQUEvQyxBQUFxRCxBQUNyRDtrQkFBQSxBQUFLLFNBQVMsRUFBRSxXQUFoQixBQUFjLEFBQWEsQUFDOUI7QUFka0IsQUFFZjs7Y0FBQSxBQUFLLFVBQVUsTUFBZixBQUFxQixBQUNyQjtjQUFBLEFBQUssUUFBUSxFQUFFLFdBQUYsQUFBYSxPQUFPLGdCQUhsQixBQUdmLEFBQWEsQUFBb0M7ZUFDcEQ7Ozs7OzRDQVltQjt5QkFDaEI7O29DQUFBLEFBQWMsU0FBUyxVQUFBLEFBQUMsU0FBWSxBQUNoQztvQkFBSSxRQUFBLEFBQVEsVUFBVSxtQkFBQSxBQUFTLE9BQS9CLEFBQXNDLHFCQUFxQixBQUN2RDt3QkFBSSxpQkFBaUIsT0FBQSxBQUFLLFFBQTFCLEFBQWtDLEFBQ2xDOzJCQUFBLEFBQUssU0FBUyxFQUFDLFdBQUQsQUFBWSxNQUFNLGdCQUFoQyxBQUFjLEFBQ2pCO0FBQ0o7QUFMRCxBQU1IOzs7O2lDQUVRO3lCQUNMOzttQ0FDSSxBQUFDO3NCQUNTLEtBQUEsQUFBSyxNQURmLEFBQ3FCLEFBQ2pCO3lCQUFTLEtBRmIsQUFFa0IsQUFDZDtzQkFISixBQUdTOzs4QkFIVDtnQ0FBQSxBQUtJO0FBTEo7QUFDSSxhQURKLGtCQUtJLEFBQUMseUNBQU8sTUFBUixBQUFhLElBQUcsU0FBaEIsQUFBd0I7OEJBQXhCO2dDQUxKLEFBS0ksQUFDSTtBQURKO2dDQUNLLGNBQUQsdUJBQUEsQUFBTzs7OEJBQVA7Z0NBQUEsQUFDSTtBQURKO0FBQUEsK0JBQ0ksQUFBQywyQ0FBUyxRQUFWLE1BQWlCLE9BQWpCLEFBQXVCLGdDQUErQixTQUFTLEtBQUEsQUFBSyxNQUFwRSxBQUEwRSxnQkFBZ0IsVUFBVSxrQkFBQSxBQUFDLE9BQUQsQUFBUSxNQUFSOzJCQUFpQixPQUFBLEFBQUssU0FBUyxFQUFDLGdCQUFnQixLQUFoRCxBQUFpQixBQUFjLEFBQXNCO0FBQXpKOzhCQUFBO2dDQVBaLEFBTVEsQUFDSSxBQUVKO0FBRkk7aUNBRUgsY0FBRCx1QkFBQSxBQUFPOzs4QkFBUDtnQ0FBQSxBQUNBO0FBREE7QUFBQSwrQkFDQSxBQUFDLHlDQUFPLE9BQVIsQUFBYyxRQUFPLFNBQVMsS0FBOUIsQUFBbUM7OEJBQW5DO2dDQUFBO0FBQUE7ZUFEQSxBQUNBLEFBR0EsMkJBQUEsQUFBQyx5Q0FBTyxPQUFSLEFBQWMsUUFBTyxTQUFTLEtBQTlCLEFBQW1DOzhCQUFuQztnQ0FBQTtBQUFBO2VBZFosQUFDSSxBQVNRLEFBSUEsQUFNZjs7Ozs7QUEvQ3VCLEEsQUFrRDVCOztrQkFBQSxBQUFlIiwiZmlsZSI6IlNldHRpbmdzTW9kYWwuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdmljdG9ycGhhbTE5OTcvV29ya3BsYWNlL1NVVEQvNTAwMzdfYmxvY2tjaGFpbi9ibG9ja2NoYWluLXByb2oifQ==