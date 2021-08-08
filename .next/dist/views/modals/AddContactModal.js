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

var _web = require('../../ethereum/web3');

var _web2 = _interopRequireDefault(_web);

var _semanticUiReact = require('semantic-ui-react');

var _AppDispatcher = require('../../core/AppDispatcher');

var _AppDispatcher2 = _interopRequireDefault(_AppDispatcher);

var _Constant = require('../../support/Constant');

var _Constant2 = _interopRequireDefault(_Constant);

var _ContactList = require('../ContactList');

var _ContactList2 = _interopRequireDefault(_ContactList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/home/victorpham1997/Workplace/SUTD/50037_blockchain/blockchain-proj/views/modals/AddContactModal.js';
// Copyright (c) 2018 Nguyen Vu Nhat Minh
// Distributed under the MIT software license, see the accompanying file LICENSE

var AddContactModal = function (_Component) {
    (0, _inherits3.default)(AddContactModal, _Component);

    function AddContactModal(props) {
        (0, _classCallCheck3.default)(this, AddContactModal);

        var _this = (0, _possibleConstructorReturn3.default)(this, (AddContactModal.__proto__ || (0, _getPrototypeOf2.default)(AddContactModal)).call(this, props));

        _this.handleClose = function (e) {
            e.preventDefault();
            _this.setState({ errorMessage: "" });
            _this.setState({ modalOpen: false });
        };

        _this.handleAddContact = function (e) {
            if (_web2.default.utils.isAddress(_this.state.address)) {
                _this.contractManager.addContact(_this.state.address);
                // this.storageManager.addContact(this.state.address);
                // appDispatcher.dispatch({
                //     action: Constant.EVENT.CONTACT_LIST_UPDATED
                // });
                _this.setState({ errorMessage: "", modalOpen: false });
            } else {
                _this.setState({ errorMessage: "Invalid ethereum address" });
            }
        };

        _this.state = { modalOpen: false, errorMessage: "", address: "" };
        _this.contractManager = props.contractManager;
        _this.storageManager = props.storageManager;
        return _this;
    }

    (0, _createClass3.default)(AddContactModal, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _this2 = this;

            _AppDispatcher2.default.register(function (payload) {
                if (payload.action == _Constant2.default.ACTION.ADD_CONTACT) {
                    _this2.setState({ modalOpen: true, errorMessage: "", isLoading: false, address: "" });
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
                    lineNumber: 55
                }
            }, _react2.default.createElement(_semanticUiReact.Header, { icon: '', content: 'Add contact by address', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 60
                }
            }), _react2.default.createElement(_semanticUiReact.Modal.Content, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 61
                }
            }, _react2.default.createElement(_semanticUiReact.Input, { fluid: true, value: this.state.address, onChange: function onChange(event) {
                    return _this3.setState({ address: event.target.value });
                }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 62
                }
            }), _react2.default.createElement(_semanticUiReact.Message, { error: true, header: this.state.errorMessage, hidden: this.state.errorMessage == "", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 63
                }
            })), _react2.default.createElement(_semanticUiReact.Modal.Actions, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 65
                }
            }, _react2.default.createElement(_semanticUiReact.Button, { color: 'orange', onClick: this.handleAddContact, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 66
                }
            }, _react2.default.createElement(_semanticUiReact.Icon, { name: 'checkmark', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 67
                }
            }), ' Add'), _react2.default.createElement(_semanticUiReact.Button, { color: 'grey', onClick: this.handleClose, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 69
                }
            }, _react2.default.createElement(_semanticUiReact.Icon, { name: 'close', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 70
                }
            }), ' Close')));
        }
    }]);

    return AddContactModal;
}(_react.Component);

exports.default = AddContactModal;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZXdzL21vZGFscy9BZGRDb250YWN0TW9kYWwuanMiXSwibmFtZXMiOlsiQ29tcG9uZW50Iiwid2ViMyIsIk1vZGFsIiwiSW5wdXQiLCJNZXNzYWdlIiwiQnV0dG9uIiwiSWNvbiIsIkhlYWRlciIsImFwcERpc3BhdGNoZXIiLCJDb25zdGFudCIsIkNvbnRhY3RMaXN0IiwiQWRkQ29udGFjdE1vZGFsIiwicHJvcHMiLCJoYW5kbGVDbG9zZSIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInNldFN0YXRlIiwiZXJyb3JNZXNzYWdlIiwibW9kYWxPcGVuIiwiaGFuZGxlQWRkQ29udGFjdCIsInV0aWxzIiwiaXNBZGRyZXNzIiwic3RhdGUiLCJhZGRyZXNzIiwiY29udHJhY3RNYW5hZ2VyIiwiYWRkQ29udGFjdCIsInN0b3JhZ2VNYW5hZ2VyIiwicmVnaXN0ZXIiLCJwYXlsb2FkIiwiYWN0aW9uIiwiQUNUSU9OIiwiQUREX0NPTlRBQ1QiLCJpc0xvYWRpbmciLCJldmVudCIsInRhcmdldCIsInZhbHVlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJQSxBQUFPLEFBQVU7Ozs7QUFDakIsQUFDSSxBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0E7O0FBRUosQUFBTyxBQUFtQjs7OztBQUMxQixBQUFPLEFBQWM7Ozs7QUFDckIsQUFBTyxBQUFpQjs7Ozs7OztBQWZ4QjtBQUNBLEFBRUEsQUFBUTs7SUFjRixBOzZDQUNGOzs2QkFBQSxBQUFZLE9BQU87NENBQUE7OzRKQUFBLEFBQ1Q7O2NBRFMsQUFlbkIsY0FBYyxVQUFBLEFBQUMsR0FBTSxBQUNqQjtjQUFBLEFBQUUsQUFDRjtrQkFBQSxBQUFLLFNBQVMsRUFBQyxjQUFmLEFBQWMsQUFBZSxBQUM3QjtrQkFBQSxBQUFLLFNBQVMsRUFBRSxXQUFoQixBQUFjLEFBQWEsQUFDOUI7QUFuQmtCOztjQUFBLEFBcUJuQixtQkFBbUIsVUFBQSxBQUFDLEdBQU0sQUFDdEI7Z0JBQUksY0FBQSxBQUFLLE1BQUwsQUFBVyxVQUFVLE1BQUEsQUFBSyxNQUE5QixBQUFJLEFBQWdDLFVBQVUsQUFDMUM7c0JBQUEsQUFBSyxnQkFBTCxBQUFxQixXQUFXLE1BQUEsQUFBSyxNQUFyQyxBQUEyQyxBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO3NCQUFBLEFBQUssU0FBUyxFQUFDLGNBQUQsQUFBZSxJQUFJLFdBQWpDLEFBQWMsQUFBOEIsQUFDL0M7QUFQRCxtQkFPTyxBQUNIO3NCQUFBLEFBQUssU0FBUyxFQUFDLGNBQWYsQUFBYyxBQUFlLEFBQ2hDO0FBQ0o7QUFoQ2tCLEFBRWY7O2NBQUEsQUFBSyxRQUFRLEVBQUUsV0FBRixBQUFhLE9BQU8sY0FBcEIsQUFBa0MsSUFBSSxTQUFuRCxBQUFhLEFBQStDLEFBQzVEO2NBQUEsQUFBSyxrQkFBa0IsTUFBdkIsQUFBNkIsQUFDN0I7Y0FBQSxBQUFLLGlCQUFpQixNQUpQLEFBSWYsQUFBNEI7ZUFDL0I7Ozs7OzZDQUVvQjt5QkFDakI7O29DQUFBLEFBQWMsU0FBUyxVQUFBLEFBQUMsU0FBWSxBQUNoQztvQkFBSSxRQUFBLEFBQVEsVUFBVSxtQkFBQSxBQUFTLE9BQS9CLEFBQXNDLGFBQWEsQUFDL0M7MkJBQUEsQUFBSyxTQUFTLEVBQUMsV0FBRCxBQUFZLE1BQU0sY0FBbEIsQUFBZ0MsSUFBSSxXQUFwQyxBQUErQyxPQUFPLFNBQXBFLEFBQWMsQUFBK0QsQUFDaEY7QUFDSjtBQUpELEFBS0g7Ozs7aUNBcUJRO3lCQUNMOzttQ0FDSSxBQUFDO3NCQUNTLEtBQUEsQUFBSyxNQURmLEFBQ3FCLEFBQ2pCO3lCQUFTLEtBRmIsQUFFa0IsQUFDZDtzQkFISixBQUdTOzs4QkFIVDtnQ0FBQSxBQUtJO0FBTEo7QUFDSSxhQURKLGtCQUtJLEFBQUMseUNBQU8sTUFBUixBQUFhLElBQUcsU0FBaEIsQUFBd0I7OEJBQXhCO2dDQUxKLEFBS0ksQUFDSTtBQURKO2dDQUNLLGNBQUQsdUJBQUEsQUFBTzs7OEJBQVA7Z0NBQUEsQUFDSTtBQURKO0FBQUEsK0JBQ0ksQUFBQyx3Q0FBTSxPQUFQLE1BQWEsT0FBTyxLQUFBLEFBQUssTUFBekIsQUFBK0IsU0FBUyxVQUFVLHlCQUFBOzJCQUFTLE9BQUEsQUFBSyxTQUFTLEVBQUMsU0FBUyxNQUFBLEFBQU0sT0FBdkMsQUFBUyxBQUFjLEFBQXVCO0FBQWhHOzhCQUFBO2dDQURKLEFBQ0ksQUFDQTtBQURBO2dDQUNBLEFBQUMsMENBQVEsT0FBVCxNQUFlLFFBQVEsS0FBQSxBQUFLLE1BQTVCLEFBQWtDLGNBQWMsUUFBUSxLQUFBLEFBQUssTUFBTCxBQUFXLGdCQUFuRSxBQUFtRjs4QkFBbkY7Z0NBUlosQUFNUSxBQUVJLEFBRUo7QUFGSTtpQ0FFSCxjQUFELHVCQUFBLEFBQU87OzhCQUFQO2dDQUFBLEFBQ0E7QUFEQTtBQUFBLCtCQUNBLEFBQUMseUNBQU8sT0FBUixBQUFjLFVBQVMsU0FBUyxLQUFoQyxBQUFxQzs4QkFBckM7Z0NBQUEsQUFDSTtBQURKOytCQUNJLEFBQUMsdUNBQUssTUFBTixBQUFXOzhCQUFYO2dDQURKLEFBQ0k7QUFBQTtnQkFGSixBQUNBLEFBR0EseUJBQUEsQUFBQyx5Q0FBTyxPQUFSLEFBQWMsUUFBTyxTQUFTLEtBQTlCLEFBQW1DOzhCQUFuQztnQ0FBQSxBQUNJO0FBREo7K0JBQ0ksQUFBQyx1Q0FBSyxNQUFOLEFBQVc7OEJBQVg7Z0NBREosQUFDSTtBQUFBO2dCQWhCaEIsQUFDSSxBQVVRLEFBSUEsQUFNZjs7Ozs7QUF6RHlCLEEsQUE0RDlCOztrQkFBQSxBQUFlIiwiZmlsZSI6IkFkZENvbnRhY3RNb2RhbC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS92aWN0b3JwaGFtMTk5Ny9Xb3JrcGxhY2UvU1VURC81MDAzN19ibG9ja2NoYWluL2Jsb2NrY2hhaW4tcHJvaiJ9