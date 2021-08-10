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

var _jsxFileName = '/Users/thebe/Desktop/blockchain-proj/views/modals/UpdateProfileModal.js';
// Copyright (c) 2018 Nguyen Vu Nhat Minh
// Distributed under the MIT software license, see the accompanying file LICENSE

var UpdateProfileModal = function (_Component) {
    (0, _inherits3.default)(UpdateProfileModal, _Component);

    function UpdateProfileModal(props) {
        (0, _classCallCheck3.default)(this, UpdateProfileModal);

        var _this = (0, _possibleConstructorReturn3.default)(this, (UpdateProfileModal.__proto__ || (0, _getPrototypeOf2.default)(UpdateProfileModal)).call(this, props));

        _this.handleClose = function (e) {
            e.preventDefault();
            _this.setState({ modalOpen: false });
        };

        _this.updateProfileClicked = function (e) {
            e.preventDefault();
            _this.contractManager.updateProfile(_this.state.name, _this.state.avatarUrl, function (resultEvent) {
                if (resultEvent == _Constant2.default.EVENT.ON_RECEIPT) {
                    window.location.reload();
                }
            });
            _this.setState({ modalOpen: false });
        };

        _this.account = props.account;
        _this.contractManager = props.contractManager;
        _this.state = { modalOpen: false, name: _this.account.name, avatarUrl: _this.account.avatarUrl };
        return _this;
    }

    (0, _createClass3.default)(UpdateProfileModal, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            _AppDispatcher2.default.register(function (payload) {
                if (payload.action == _Constant2.default.ACTION.OPEN_UPDATE_PROFILE) {
                    _this2.setState({ modalOpen: true });
                } else if (payload.action == _Constant2.default.EVENT.ACCOUNT_INFO_UPDATED) {
                    _this2.setState({ name: payload.profile.name, avatarUrl: payload.profile.avatarUrl });
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
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 50
                }
            }, _react2.default.createElement(_semanticUiReact.Header, { icon: '', content: 'Update name and avatar', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 54
                }
            }), _react2.default.createElement(_semanticUiReact.Modal.Content, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 55
                }
            }, _react2.default.createElement(_semanticUiReact.Form, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 56
                }
            }, _react2.default.createElement(_semanticUiReact.Form.Field, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 57
                }
            }, _react2.default.createElement('label', {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 58
                }
            }, 'Name'), _react2.default.createElement('input', { placeholder: 'Maximum 32 characters', value: this.state.name,
                onChange: function onChange(e) {
                    if (e.target.value.length <= 32) {
                        _this3.setState({ name: e.target.value });
                    }
                }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 59
                }
            })), _react2.default.createElement(_semanticUiReact.Form.Field, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 66
                }
            }, _react2.default.createElement('label', {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 67
                }
            }, 'Avatar URL'), _react2.default.createElement('input', { placeholder: 'Maximum 32 characters', value: this.state.avatarUrl,
                onChange: function onChange(e) {
                    if (e.target.value.length <= 32) {
                        _this3.setState({ avatarUrl: e.target.value });
                    }
                }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 68
                }
            }), _react2.default.createElement('label', {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 74
                }
            }, 'If your avatar URL is longer than 32 characters, please consider using ', _react2.default.createElement('a', { href: 'https://goo.gl/', target: '_blank', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 75
                }
            }, 'Google URL Shortener'))))), _react2.default.createElement(_semanticUiReact.Modal.Actions, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 79
                }
            }, _react2.default.createElement(_semanticUiReact.Button, { color: 'orange', onClick: this.updateProfileClicked, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 80
                }
            }, 'Update'), _react2.default.createElement(_semanticUiReact.Button, { color: 'grey', onClick: this.handleClose, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 83
                }
            }, 'Close')));
        }
    }]);

    return UpdateProfileModal;
}(_react.Component);

exports.default = UpdateProfileModal;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZXdzL21vZGFscy9VcGRhdGVQcm9maWxlTW9kYWwuanMiXSwibmFtZXMiOlsiQ29tcG9uZW50IiwiTW9kYWwiLCJIZWFkZXIiLCJCdXR0b24iLCJJY29uIiwiRm9ybSIsImFwcERpc3BhdGNoZXIiLCJDb25zdGFudCIsIlVwZGF0ZVByb2ZpbGVNb2RhbCIsInByb3BzIiwiaGFuZGxlQ2xvc2UiLCJlIiwicHJldmVudERlZmF1bHQiLCJzZXRTdGF0ZSIsIm1vZGFsT3BlbiIsInVwZGF0ZVByb2ZpbGVDbGlja2VkIiwiY29udHJhY3RNYW5hZ2VyIiwidXBkYXRlUHJvZmlsZSIsInN0YXRlIiwibmFtZSIsImF2YXRhclVybCIsInJlc3VsdEV2ZW50IiwiRVZFTlQiLCJPTl9SRUNFSVBUIiwid2luZG93IiwibG9jYXRpb24iLCJyZWxvYWQiLCJhY2NvdW50IiwicmVnaXN0ZXIiLCJwYXlsb2FkIiwiYWN0aW9uIiwiQUNUSU9OIiwiT1BFTl9VUERBVEVfUFJPRklMRSIsIkFDQ09VTlRfSU5GT19VUERBVEVEIiwicHJvZmlsZSIsInRhcmdldCIsInZhbHVlIiwibGVuZ3RoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJQSxBQUNJLEFBQ0EsQUFDQSxBQUNBLEFBQ0E7O0FBRUosQUFBTyxBQUFtQjs7OztBQUMxQixBQUFPLEFBQWM7Ozs7Ozs7QUFackI7QUFDQSxBQUVBLEFBQVE7O0ksQUFXRjtnREFDRjs7Z0NBQUEsQUFBWSxPQUFPOzRDQUFBOztrS0FBQSxBQUNUOztjQURTLEFBT25CLGNBQWMsVUFBQSxBQUFDLEdBQU0sQUFDakI7Y0FBQSxBQUFFLEFBQ0Y7a0JBQUEsQUFBSyxTQUFTLEVBQUUsV0FBaEIsQUFBYyxBQUFhLEFBQzlCO0FBVmtCOztjQUFBLEFBWW5CLHVCQUF1QixVQUFBLEFBQUMsR0FBTSxBQUMxQjtjQUFBLEFBQUUsQUFDRjtrQkFBQSxBQUFLLGdCQUFMLEFBQXFCLGNBQWMsTUFBQSxBQUFLLE1BQXhDLEFBQThDLE1BQU0sTUFBQSxBQUFLLE1BQXpELEFBQStELFdBQVcsVUFBQSxBQUFDLGFBQWdCLEFBQ3ZGO29CQUFJLGVBQWUsbUJBQUEsQUFBUyxNQUE1QixBQUFrQyxZQUFZLEFBQzFDOzJCQUFBLEFBQU8sU0FBUCxBQUFnQixBQUNuQjtBQUNKO0FBSkQsQUFLQTtrQkFBQSxBQUFLLFNBQVMsRUFBRSxXQUFoQixBQUFjLEFBQWEsQUFDOUI7QUFwQmtCLEFBRWY7O2NBQUEsQUFBSyxVQUFVLE1BQWYsQUFBcUIsQUFDckI7Y0FBQSxBQUFLLGtCQUFrQixNQUF2QixBQUE2QixBQUM3QjtjQUFBLEFBQUssUUFBUSxFQUFDLFdBQUQsQUFBWSxPQUFPLE1BQU0sTUFBQSxBQUFLLFFBQTlCLEFBQXNDLE1BQU0sV0FBVyxNQUFBLEFBQUssUUFKMUQsQUFJZixBQUFhLEFBQW9FO2VBQ3BGOzs7Ozs0Q0FpQm1CO3lCQUNoQjs7b0NBQUEsQUFBYyxTQUFTLFVBQUEsQUFBQyxTQUFZLEFBQ2hDO29CQUFJLFFBQUEsQUFBUSxVQUFVLG1CQUFBLEFBQVMsT0FBL0IsQUFBc0MscUJBQXFCLEFBQ3ZEOzJCQUFBLEFBQUssU0FBUyxFQUFDLFdBQWYsQUFBYyxBQUFZLEFBQzdCO0FBRkQsdUJBRU8sSUFBSSxRQUFBLEFBQVEsVUFBVSxtQkFBQSxBQUFTLE1BQS9CLEFBQXFDLHNCQUFzQixBQUM5RDsyQkFBQSxBQUFLLFNBQVMsRUFBQyxNQUFNLFFBQUEsQUFBUSxRQUFmLEFBQXVCLE1BQU0sV0FBVyxRQUFBLEFBQVEsUUFBOUQsQUFBYyxBQUF3RCxBQUN6RTtBQUNKO0FBTkQsQUFPSDs7OztpQ0FFUTt5QkFDTDs7bUNBQ0ksQUFBQztzQkFDUyxLQUFBLEFBQUssTUFEZixBQUNxQixBQUNqQjt5QkFBUyxLQUZiLEFBRWtCOzs4QkFGbEI7Z0NBQUEsQUFJSTtBQUpKO0FBQ0ksYUFESixrQkFJSSxBQUFDLHlDQUFPLE1BQVIsQUFBYSxJQUFHLFNBQWhCLEFBQXdCOzhCQUF4QjtnQ0FKSixBQUlJLEFBQ0k7QUFESjtnQ0FDSyxjQUFELHVCQUFBLEFBQU87OzhCQUFQO2dDQUFBLEFBQ0k7QUFESjtBQUFBLCtCQUNJLEFBQUM7OzhCQUFEO2dDQUFBLEFBQ0k7QUFESjtBQUFBLCtCQUNLLGNBQUQsc0JBQUEsQUFBTTs7OEJBQU47Z0NBQUEsQUFDQTtBQURBO0FBQUEsK0JBQ0EsY0FBQTs7OEJBQUE7Z0NBQUE7QUFBQTtBQUFBLGVBREEsQUFDQSxBQUNBLGtEQUFPLGFBQVAsQUFBbUIseUJBQXdCLE9BQU8sS0FBQSxBQUFLLE1BQXZELEFBQTZELEFBQ3pEOzBCQUFVLGtCQUFBLEFBQUMsR0FBTSxBQUNiO3dCQUFJLEVBQUEsQUFBRSxPQUFGLEFBQVMsTUFBVCxBQUFlLFVBQW5CLEFBQTZCLElBQUksQUFDN0I7K0JBQUEsQUFBSyxTQUFTLEVBQUMsTUFBTSxFQUFBLEFBQUUsT0FBdkIsQUFBYyxBQUFnQixBQUNqQztBQUNKO0FBTEw7OEJBQUE7Z0NBSEosQUFDSSxBQUVBLEFBT0E7QUFQQTtpQ0FPQyxjQUFELHNCQUFBLEFBQU07OzhCQUFOO2dDQUFBLEFBQ0E7QUFEQTtBQUFBLCtCQUNBLGNBQUE7OzhCQUFBO2dDQUFBO0FBQUE7QUFBQSxlQURBLEFBQ0EsQUFDQSx3REFBTyxhQUFQLEFBQW1CLHlCQUF3QixPQUFPLEtBQUEsQUFBSyxNQUF2RCxBQUE2RCxBQUN6RDswQkFBVSxrQkFBQSxBQUFDLEdBQU0sQUFDYjt3QkFBSSxFQUFBLEFBQUUsT0FBRixBQUFTLE1BQVQsQUFBZSxVQUFuQixBQUE2QixJQUFJLEFBQzdCOytCQUFBLEFBQUssU0FBUyxFQUFDLFdBQVcsRUFBQSxBQUFFLE9BQTVCLEFBQWMsQUFBcUIsQUFDdEM7QUFDSjtBQUxMOzhCQUFBO2dDQUZBLEFBRUEsQUFNQTtBQU5BO2dDQU1BLGNBQUE7OzhCQUFBO2dDQUFBO0FBQUE7QUFBQSxlQUMwQiwyRkFBQSxjQUFBLE9BQUcsTUFBSCxBQUFRLG1CQUFrQixRQUExQixBQUFpQzs4QkFBakM7Z0NBQUE7QUFBQTtlQXpCMUMsQUFLUSxBQUNJLEFBVUksQUFRQSxBQUMwQixBQUlsQyw2Q0FBQyxjQUFELHVCQUFBLEFBQU87OzhCQUFQO2dDQUFBLEFBQ0E7QUFEQTtBQUFBLCtCQUNBLEFBQUMseUNBQU8sT0FBUixBQUFjLFVBQVMsU0FBUyxLQUFoQyxBQUFxQzs4QkFBckM7Z0NBQUE7QUFBQTtlQURBLEFBQ0EsQUFHQSwyQkFBQSxBQUFDLHlDQUFPLE9BQVIsQUFBYyxRQUFPLFNBQVMsS0FBOUIsQUFBbUM7OEJBQW5DO2dDQUFBO0FBQUE7ZUFsQ1osQUFDSSxBQTZCUSxBQUlBLEFBTWY7Ozs7O0EsQUExRTRCLEFBNkVqQzs7a0JBQUEsQUFBZSIsImZpbGUiOiJVcGRhdGVQcm9maWxlTW9kYWwuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3RoZWJlL0Rlc2t0b3AvYmxvY2tjaGFpbi1wcm9qIn0=