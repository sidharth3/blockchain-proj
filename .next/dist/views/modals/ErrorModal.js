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

var _jsxFileName = '/Users/thebe/Desktop/blockchain-proj/views/modals/ErrorModal.js';
// Copyright (c) 2018 Nguyen Vu Nhat Minh
// Distributed under the MIT software license, see the accompanying file LICENSE

var ErrorModal = function (_Component) {
    (0, _inherits3.default)(ErrorModal, _Component);

    function ErrorModal() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, ErrorModal);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = ErrorModal.__proto__ || (0, _getPrototypeOf2.default)(ErrorModal)).call.apply(_ref, [this].concat(args))), _this), _this.state = { modalOpen: false, message: "", title: "" }, _this.handleClose = function (e) {
            e.preventDefault();
            _this.setState({ modalOpen: false });
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(ErrorModal, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            _AppDispatcher2.default.register(function (payload) {
                if (payload.action == _Constant2.default.EVENT.ENCOUNTERED_ERROR) {
                    _this2.setState({ modalOpen: true, message: payload.message, title: payload.title });
                }
            });
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
                    lineNumber: 32
                }
            }, _react2.default.createElement(_semanticUiReact.Header, { icon: '', content: this.state.title ? this.state.title : "Notice", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 37
                }
            }), _react2.default.createElement(_semanticUiReact.Modal.Content, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 38
                }
            }, _react2.default.createElement(_semanticUiReact.Message, { error: true, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 39
                }
            }, this.state.message)), _react2.default.createElement(_semanticUiReact.Modal.Actions, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 41
                }
            }, _react2.default.createElement(_semanticUiReact.Button, { color: 'grey', onClick: this.handleClose, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 42
                }
            }, 'Close')));
        }
    }]);

    return ErrorModal;
}(_react.Component);

exports.default = ErrorModal;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZXdzL21vZGFscy9FcnJvck1vZGFsLmpzIl0sIm5hbWVzIjpbIkNvbXBvbmVudCIsIk1vZGFsIiwiSGVhZGVyIiwiQnV0dG9uIiwiTWVzc2FnZSIsImFwcERpc3BhdGNoZXIiLCJDb25zdGFudCIsIkVycm9yTW9kYWwiLCJzdGF0ZSIsIm1vZGFsT3BlbiIsIm1lc3NhZ2UiLCJ0aXRsZSIsImhhbmRsZUNsb3NlIiwiZSIsInByZXZlbnREZWZhdWx0Iiwic2V0U3RhdGUiLCJyZWdpc3RlciIsInBheWxvYWQiLCJhY3Rpb24iLCJFVkVOVCIsIkVOQ09VTlRFUkVEX0VSUk9SIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJQSxBQUNJLEFBQ0EsQUFDQSxBQUNBOztBQUVKLEFBQU8sQUFBbUI7Ozs7QUFDMUIsQUFBTyxBQUFjOzs7Ozs7O0FBWHJCO0FBQ0EsQUFFQSxBQUFROztJLEFBVUY7Ozs7Ozs7Ozs7Ozs7O3dOLEFBQ0YsUUFBUSxFQUFFLFdBQUYsQUFBYSxPQUFPLFNBQXBCLEFBQTZCLElBQUksTyxBQUFqQyxBQUF3QyxZLEFBRWhELGNBQWMsVUFBQSxBQUFDLEdBQU0sQUFDakI7Y0FBQSxBQUFFLEFBQ0Y7a0JBQUEsQUFBSyxTQUFTLEVBQUUsV0FBaEIsQUFBYyxBQUFhLEFBQzlCO0E7Ozs7OzRDQUVtQjt5QkFDaEI7O29DQUFBLEFBQWMsU0FBUyxVQUFBLEFBQUMsU0FBWSxBQUNoQztvQkFBSSxRQUFBLEFBQVEsVUFBVSxtQkFBQSxBQUFTLE1BQS9CLEFBQXFDLG1CQUFtQixBQUNwRDsyQkFBQSxBQUFLLFNBQVMsRUFBQyxXQUFELEFBQVksTUFBTSxTQUFTLFFBQTNCLEFBQW1DLFNBQVMsT0FBTyxRQUFqRSxBQUFjLEFBQTJELEFBQzVFO0FBQ0o7QUFKRCxBQUtIOzs7O2lDQUVRLEFBQ0w7bUNBQ0ksQUFBQztzQkFDUyxLQUFBLEFBQUssTUFEZixBQUNxQixBQUNqQjt5QkFBUyxLQUZiLEFBRWtCLEFBQ2Q7c0JBSEosQUFHUzs7OEJBSFQ7Z0NBQUEsQUFLSTtBQUxKO0FBQ0ksYUFESixrQkFLSSxBQUFDLHlDQUFPLE1BQVIsQUFBYSxJQUFHLFNBQVMsS0FBQSxBQUFLLE1BQUwsQUFBVyxRQUFRLEtBQUEsQUFBSyxNQUF4QixBQUE4QixRQUF2RCxBQUErRDs4QkFBL0Q7Z0NBTEosQUFLSSxBQUNJO0FBREo7Z0NBQ0ssY0FBRCx1QkFBQSxBQUFPOzs4QkFBUDtnQ0FBQSxBQUNJO0FBREo7QUFBQSwrQkFDSSxBQUFDLDBDQUFRLE9BQVQ7OEJBQUE7Z0NBQUEsQUFBZ0I7QUFBaEI7b0JBQWdCLEFBQUssTUFQakMsQUFNUSxBQUNJLEFBQTJCLEFBRS9CLDJCQUFDLGNBQUQsdUJBQUEsQUFBTzs7OEJBQVA7Z0NBQUEsQUFDQTtBQURBO0FBQUEsK0JBQ0EsQUFBQyx5Q0FBTyxPQUFSLEFBQWMsUUFBTyxTQUFTLEtBQTlCLEFBQW1DOzhCQUFuQztnQ0FBQTtBQUFBO2VBWFosQUFDSSxBQVNRLEFBQ0EsQUFNZjs7Ozs7QSxBQWxDb0IsQUFxQ3pCOztrQkFBQSxBQUFlIiwiZmlsZSI6IkVycm9yTW9kYWwuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3RoZWJlL0Rlc2t0b3AvYmxvY2tjaGFpbi1wcm9qIn0=