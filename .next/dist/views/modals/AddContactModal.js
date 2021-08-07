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
                _this.setState({ errorMessage: "", modalOpen: false });
            } else {
                _this.setState({ errorMessage: "Invalid ethereum address" });
            }
        };

        _this.state = { modalOpen: false, errorMessage: "", address: "" };
        _this.contractManager = props.contractManager;
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
                    lineNumber: 49
                }
            }, _react2.default.createElement(_semanticUiReact.Header, { icon: '', content: 'Add contact by address', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 54
                }
            }), _react2.default.createElement(_semanticUiReact.Modal.Content, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 55
                }
            }, _react2.default.createElement(_semanticUiReact.Input, { fluid: true, value: this.state.address, onChange: function onChange(event) {
                    return _this3.setState({ address: event.target.value });
                }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 56
                }
            }), _react2.default.createElement(_semanticUiReact.Message, { error: true, header: this.state.errorMessage, hidden: this.state.errorMessage == "", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 57
                }
            })), _react2.default.createElement(_semanticUiReact.Modal.Actions, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 59
                }
            }, _react2.default.createElement(_semanticUiReact.Button, { color: 'orange', onClick: this.handleAddContact, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 60
                }
            }, _react2.default.createElement(_semanticUiReact.Icon, { name: 'checkmark', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 61
                }
            }), ' Add'), _react2.default.createElement(_semanticUiReact.Button, { color: 'grey', onClick: this.handleClose, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 63
                }
            }, _react2.default.createElement(_semanticUiReact.Icon, { name: 'close', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 64
                }
            }), ' Close')));
        }
    }]);

    return AddContactModal;
}(_react.Component);

exports.default = AddContactModal;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZXdzL21vZGFscy9BZGRDb250YWN0TW9kYWwuanMiXSwibmFtZXMiOlsiQ29tcG9uZW50Iiwid2ViMyIsIk1vZGFsIiwiSW5wdXQiLCJNZXNzYWdlIiwiQnV0dG9uIiwiSWNvbiIsIkhlYWRlciIsImFwcERpc3BhdGNoZXIiLCJDb25zdGFudCIsIkFkZENvbnRhY3RNb2RhbCIsInByb3BzIiwiaGFuZGxlQ2xvc2UiLCJlIiwicHJldmVudERlZmF1bHQiLCJzZXRTdGF0ZSIsImVycm9yTWVzc2FnZSIsIm1vZGFsT3BlbiIsImhhbmRsZUFkZENvbnRhY3QiLCJ1dGlscyIsImlzQWRkcmVzcyIsInN0YXRlIiwiYWRkcmVzcyIsImNvbnRyYWN0TWFuYWdlciIsImFkZENvbnRhY3QiLCJyZWdpc3RlciIsInBheWxvYWQiLCJhY3Rpb24iLCJBQ1RJT04iLCJBRERfQ09OVEFDVCIsImlzTG9hZGluZyIsImV2ZW50IiwidGFyZ2V0IiwidmFsdWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUlBLEFBQU8sQUFBVTs7OztBQUNqQixBQUNJLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQTs7QUFFSixBQUFPLEFBQW1COzs7O0FBQzFCLEFBQU8sQUFBYzs7Ozs7OztBQWRyQjtBQUNBLEFBRUEsQUFBUTs7SSxBQWFGOzZDQUNGOzs2QkFBQSxBQUFZLE9BQU87NENBQUE7OzRKQUFBLEFBQ1Q7O2NBRFMsQUFjbkIsY0FBYyxVQUFBLEFBQUMsR0FBTSxBQUNqQjtjQUFBLEFBQUUsQUFDRjtrQkFBQSxBQUFLLFNBQVMsRUFBQyxjQUFmLEFBQWMsQUFBZSxBQUM3QjtrQkFBQSxBQUFLLFNBQVMsRUFBRSxXQUFoQixBQUFjLEFBQWEsQUFDOUI7QUFsQmtCOztjQUFBLEFBb0JuQixtQkFBbUIsVUFBQSxBQUFDLEdBQU0sQUFDdEI7Z0JBQUksY0FBQSxBQUFLLE1BQUwsQUFBVyxVQUFVLE1BQUEsQUFBSyxNQUE5QixBQUFJLEFBQWdDLFVBQVUsQUFDMUM7c0JBQUEsQUFBSyxnQkFBTCxBQUFxQixXQUFXLE1BQUEsQUFBSyxNQUFyQyxBQUEyQyxBQUMzQztzQkFBQSxBQUFLLFNBQVMsRUFBQyxjQUFELEFBQWUsSUFBSSxXQUFqQyxBQUFjLEFBQThCLEFBQy9DO0FBSEQsbUJBR08sQUFDSDtzQkFBQSxBQUFLLFNBQVMsRUFBQyxjQUFmLEFBQWMsQUFBZSxBQUNoQztBQUNKO0FBM0JrQixBQUVmOztjQUFBLEFBQUssUUFBUSxFQUFFLFdBQUYsQUFBYSxPQUFPLGNBQXBCLEFBQWtDLElBQUksU0FBbkQsQUFBYSxBQUErQyxBQUM1RDtjQUFBLEFBQUssa0JBQWtCLE1BSFIsQUFHZixBQUE2QjtlQUNoQzs7Ozs7NkNBRW9CO3lCQUNqQjs7b0NBQUEsQUFBYyxTQUFTLFVBQUEsQUFBQyxTQUFZLEFBQ2hDO29CQUFJLFFBQUEsQUFBUSxVQUFVLG1CQUFBLEFBQVMsT0FBL0IsQUFBc0MsYUFBYSxBQUMvQzsyQkFBQSxBQUFLLFNBQVMsRUFBQyxXQUFELEFBQVksTUFBTSxjQUFsQixBQUFnQyxJQUFJLFdBQXBDLEFBQStDLE9BQU8sU0FBcEUsQUFBYyxBQUErRCxBQUNoRjtBQUNKO0FBSkQsQUFLSDs7OztpQ0FpQlE7eUJBQ0w7O21DQUNJLEFBQUM7c0JBQ1MsS0FBQSxBQUFLLE1BRGYsQUFDcUIsQUFDakI7eUJBQVMsS0FGYixBQUVrQixBQUNkO3NCQUhKLEFBR1M7OzhCQUhUO2dDQUFBLEFBS0k7QUFMSjtBQUNJLGFBREosa0JBS0ksQUFBQyx5Q0FBTyxNQUFSLEFBQWEsSUFBRyxTQUFoQixBQUF3Qjs4QkFBeEI7Z0NBTEosQUFLSSxBQUNJO0FBREo7Z0NBQ0ssY0FBRCx1QkFBQSxBQUFPOzs4QkFBUDtnQ0FBQSxBQUNJO0FBREo7QUFBQSwrQkFDSSxBQUFDLHdDQUFNLE9BQVAsTUFBYSxPQUFPLEtBQUEsQUFBSyxNQUF6QixBQUErQixTQUFTLFVBQVUseUJBQUE7MkJBQVMsT0FBQSxBQUFLLFNBQVMsRUFBQyxTQUFTLE1BQUEsQUFBTSxPQUF2QyxBQUFTLEFBQWMsQUFBdUI7QUFBaEc7OEJBQUE7Z0NBREosQUFDSSxBQUNBO0FBREE7Z0NBQ0EsQUFBQywwQ0FBUSxPQUFULE1BQWUsUUFBUSxLQUFBLEFBQUssTUFBNUIsQUFBa0MsY0FBYyxRQUFRLEtBQUEsQUFBSyxNQUFMLEFBQVcsZ0JBQW5FLEFBQW1GOzhCQUFuRjtnQ0FSWixBQU1RLEFBRUksQUFFSjtBQUZJO2lDQUVILGNBQUQsdUJBQUEsQUFBTzs7OEJBQVA7Z0NBQUEsQUFDQTtBQURBO0FBQUEsK0JBQ0EsQUFBQyx5Q0FBTyxPQUFSLEFBQWMsVUFBUyxTQUFTLEtBQWhDLEFBQXFDOzhCQUFyQztnQ0FBQSxBQUNJO0FBREo7K0JBQ0ksQUFBQyx1Q0FBSyxNQUFOLEFBQVc7OEJBQVg7Z0NBREosQUFDSTtBQUFBO2dCQUZKLEFBQ0EsQUFHQSx5QkFBQSxBQUFDLHlDQUFPLE9BQVIsQUFBYyxRQUFPLFNBQVMsS0FBOUIsQUFBbUM7OEJBQW5DO2dDQUFBLEFBQ0k7QUFESjsrQkFDSSxBQUFDLHVDQUFLLE1BQU4sQUFBVzs4QkFBWDtnQ0FESixBQUNJO0FBQUE7Z0JBaEJoQixBQUNJLEFBVVEsQUFJQSxBQU1mOzs7OztBQXBEeUIsQSxBQXVEOUI7O2tCQUFBLEFBQWUiLCJmaWxlIjoiQWRkQ29udGFjdE1vZGFsLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3ZpY3RvcnBoYW0xOTk3L1dvcmtwbGFjZS9TVVRELzUwMDM3X2Jsb2NrY2hhaW4vYmxvY2tjaGFpbi1wcm9qIn0=