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

var _AppDispatcher = require('../core/AppDispatcher');

var _AppDispatcher2 = _interopRequireDefault(_AppDispatcher);

var _Constant = require('../support/Constant');

var _Constant2 = _interopRequireDefault(_Constant);

var _Config = require('../support/Config');

var _Config2 = _interopRequireDefault(_Config);

var _Utils = require('../support/Utils');

var _Utils2 = _interopRequireDefault(_Utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/thebe/Desktop/blockchain-proj/views/Chat.js';
// Copyright (c) 2018 Nguyen Vu Nhat Minh
// Distributed under the MIT software license, see the accompanying file LICENSE

var Chat = function (_Component) {
    (0, _inherits3.default)(Chat, _Component);

    function Chat(props) {
        (0, _classCallCheck3.default)(this, Chat);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Chat.__proto__ || (0, _getPrototypeOf2.default)(Chat)).call(this, props));

        _this.sendMessage = function (message) {
            _this.contractManager.sendMessage(_this.state.address, _this.account.storageManager.contacts[_this.state.address].publicKey, message);
        };

        _this.account = props.account;
        _this.contractManager = props.contractManager;
        _this.state = { address: "", messages: [], publicKey: "" };
        return _this;
    }

    (0, _createClass3.default)(Chat, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.scrollToBottom();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this.scrollToBottom();
        }
    }, {
        key: 'scrollToBottom',
        value: function scrollToBottom() {
            if (this.lastObjectAnchor != undefined) {
                this.lastObjectAnchor.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            _AppDispatcher2.default.register(function (payload) {
                if (payload.action == _Constant2.default.ACTION.SELECT_CONTACT) {
                    _this2.setState({ address: payload.data,
                        publicKey: _this2.account.storageManager.contacts[payload.data].publicKey,
                        messages: _this2.account.storageManager.contacts[payload.data].messages });
                    // console.log(this.account.storageManager.contacts[payload.data].publicKey);
                } else if (_this2.state.address != "" && payload.action == _Constant2.default.EVENT.MESSAGES_UPDATED) {
                    if (payload.data == undefined || payload.data == _this2.state.address) {
                        _this2.setState({ messages: _this2.account.storageManager.contacts[_this2.state.address].messages });
                    }
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var height = this.props.height;
            var _state = this.state,
                publicKey = _state.publicKey,
                messages = _state.messages;

            var messageItems = [];

            if (publicKey) {
                // console.log(this.state);
                if (messages.length > 0) {
                    for (var i = 0; i < messages.length; i++) {
                        var decryptedMessage;
                        if (messages[i].encryption == 'aes256') {
                            decryptedMessage = _Utils2.default.decrypt(messages[i].message.substr(2), this.account.computeSecret(Buffer.from(publicKey, 'hex')));
                        } else {
                            decryptedMessage = messages[i].message;
                        }

                        var lastObjectAnchor = _react2.default.createElement('span', {
                            __source: {
                                fileName: _jsxFileName,
                                lineNumber: 84
                            }
                        });
                        if (i == messages.length - 1) {
                            lastObjectAnchor = _react2.default.createElement('span', { ref: function ref(lastObjectAnchor) {
                                    _this3.lastObjectAnchor = lastObjectAnchor;
                                }, __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 86
                                }
                            });
                        }

                        var explorerUrl = _Config2.default.ENV.ExplorerUrl + 'tx/' + messages[i].txHash;
                        if (messages[i].isMine) {
                            if (messages[i].status == _Constant2.default.SENT_STATUS.PENDING) {
                                messageItems.push(_react2.default.createElement('p', { align: 'right', key: 'msg_' + i, __source: {
                                        fileName: _jsxFileName,
                                        lineNumber: 93
                                    }
                                }, _react2.default.createElement(_semanticUiReact.Label, { pointing: 'right',
                                    as: 'span', size: 'large', color: 'teal', style: { fontWeight: '100', lineHeight: '1.5' }, __source: {
                                        fileName: _jsxFileName,
                                        lineNumber: 93
                                    }
                                }, _react2.default.createElement(_semanticUiReact.Icon, { name: 'circle notched', loading: true, __source: {
                                        fileName: _jsxFileName,
                                        lineNumber: 95
                                    }
                                }), decryptedMessage, lastObjectAnchor)));
                            } else if (messages[i].status == _Constant2.default.SENT_STATUS.FAILED) {
                                messageItems.push(_react2.default.createElement('p', { align: 'right', key: 'msg_' + i, __source: {
                                        fileName: _jsxFileName,
                                        lineNumber: 102
                                    }
                                }, _react2.default.createElement(_semanticUiReact.Label, { pointing: 'right',
                                    as: 'span', key: 'msg_' + i, size: 'large', color: 'blue',
                                    style: { fontWeight: '100', lineHeight: '1.5' }, __source: {
                                        fileName: _jsxFileName,
                                        lineNumber: 102
                                    }
                                }, _react2.default.createElement(_semanticUiReact.Icon, { name: 'warning sign', __source: {
                                        fileName: _jsxFileName,
                                        lineNumber: 105
                                    }
                                }), decryptedMessage, lastObjectAnchor)));
                            } else {
                                messageItems.push(_react2.default.createElement('p', { align: 'right', key: 'msg_' + i, __source: {
                                        fileName: _jsxFileName,
                                        lineNumber: 112
                                    }
                                }, _react2.default.createElement('a', { href: explorerUrl, target: '_blank', __source: {
                                        fileName: _jsxFileName,
                                        lineNumber: 113
                                    }
                                }, _react2.default.createElement(_semanticUiReact.Label, { pointing: 'right',
                                    as: 'span', key: 'msg_' + i, size: 'large', color: 'teal',
                                    style: { font: '10', lineHeight: '1.5' }, __source: {
                                        fileName: _jsxFileName,
                                        lineNumber: 113
                                    }
                                }, decryptedMessage, lastObjectAnchor))));
                            }
                        } else {
                            messageItems.push(_react2.default.createElement('p', { key: 'msg_' + i, __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 123
                                }
                            }, _react2.default.createElement('a', { href: explorerUrl, target: '_blank', __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 124
                                }
                            }, _react2.default.createElement(_semanticUiReact.Label, { pointing: 'left', as: 'span',
                                key: 'msg_' + i, size: 'large', style: { font: '100', lineHeight: '1.5' }, __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 125
                                }
                            }, decryptedMessage, lastObjectAnchor))));
                        }
                    }
                } else {
                    messageItems.push(_react2.default.createElement(_semanticUiReact.Header, { as: 'h2', textAlign: 'center', key: 'no_messages', __source: {
                            fileName: _jsxFileName,
                            lineNumber: 135
                        }
                    }, 'No messages'));
                }
            }

            return _react2.default.createElement('div', { style: { width: '100%' }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 141
                }
            }, _react2.default.createElement(_semanticUiReact.Segment, { style: { height: height - 90 + "px", width: '100%', overflow: 'auto' }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 142
                }
            }, messageItems), _react2.default.createElement(_semanticUiReact.Segment, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 145
                }
            }, _react2.default.createElement(TextInput, { disabled: this.state.address ? false : true, onSend: this.sendMessage, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 146
                }
            })));
        }
    }]);

    return Chat;
}(_react.Component);

var TextInput = function (_Component2) {
    (0, _inherits3.default)(TextInput, _Component2);

    function TextInput(props) {
        (0, _classCallCheck3.default)(this, TextInput);

        var _this4 = (0, _possibleConstructorReturn3.default)(this, (TextInput.__proto__ || (0, _getPrototypeOf2.default)(TextInput)).call(this, props));

        _this4.state = { disabled: props.disabled, content: "" };
        _this4.onSend = props.onSend;
        return _this4;
    }

    (0, _createClass3.default)(TextInput, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(props) {
            this.setState({ disabled: props.disabled });
        }
    }, {
        key: 'sendMessageClicked',
        value: function sendMessageClicked() {
            if (this.state.content) {
                this.onSend(this.state.content);
                this.setState({ content: "" });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this5 = this;

            return _react2.default.createElement(_semanticUiReact.Input, { fluid: true, disabled: this.state.disabled,
                value: this.state.content,
                onChange: function onChange(e) {
                    return _this5.setState({ content: e.target.value });
                },
                action: { color: 'blue', labelPosition: 'right', icon: 'send', content: 'Send', onClick: function onClick(e) {
                        return _this5.sendMessageClicked();
                    } }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 173
                }
            });
        }
    }]);

    return TextInput;
}(_react.Component);

exports.default = Chat;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZXdzL0NoYXQuanMiXSwibmFtZXMiOlsiQ29tcG9uZW50IiwiU2VnbWVudCIsIklucHV0IiwiQnV0dG9uIiwiTWVzc2FnZSIsIkljb24iLCJIZWFkZXIiLCJMYWJlbCIsImFwcERpc3BhdGNoZXIiLCJDb25zdGFudCIsIkNvbmZpZyIsInV0aWxzIiwiQ2hhdCIsInByb3BzIiwic2VuZE1lc3NhZ2UiLCJtZXNzYWdlIiwiY29udHJhY3RNYW5hZ2VyIiwic3RhdGUiLCJhZGRyZXNzIiwiYWNjb3VudCIsInN0b3JhZ2VNYW5hZ2VyIiwiY29udGFjdHMiLCJwdWJsaWNLZXkiLCJtZXNzYWdlcyIsInNjcm9sbFRvQm90dG9tIiwibGFzdE9iamVjdEFuY2hvciIsInVuZGVmaW5lZCIsInNjcm9sbEludG9WaWV3IiwiYmVoYXZpb3IiLCJyZWdpc3RlciIsInBheWxvYWQiLCJhY3Rpb24iLCJBQ1RJT04iLCJTRUxFQ1RfQ09OVEFDVCIsInNldFN0YXRlIiwiZGF0YSIsIkVWRU5UIiwiTUVTU0FHRVNfVVBEQVRFRCIsImhlaWdodCIsIm1lc3NhZ2VJdGVtcyIsImxlbmd0aCIsImkiLCJkZWNyeXB0ZWRNZXNzYWdlIiwiZW5jcnlwdGlvbiIsImRlY3J5cHQiLCJzdWJzdHIiLCJjb21wdXRlU2VjcmV0IiwiQnVmZmVyIiwiZnJvbSIsImV4cGxvcmVyVXJsIiwiRU5WIiwiRXhwbG9yZXJVcmwiLCJ0eEhhc2giLCJpc01pbmUiLCJzdGF0dXMiLCJTRU5UX1NUQVRVUyIsIlBFTkRJTkciLCJwdXNoIiwiZm9udFdlaWdodCIsImxpbmVIZWlnaHQiLCJGQUlMRUQiLCJmb250Iiwid2lkdGgiLCJvdmVyZmxvdyIsIlRleHRJbnB1dCIsImRpc2FibGVkIiwiY29udGVudCIsIm9uU2VuZCIsImUiLCJ0YXJnZXQiLCJ2YWx1ZSIsImNvbG9yIiwibGFiZWxQb3NpdGlvbiIsImljb24iLCJvbkNsaWNrIiwic2VuZE1lc3NhZ2VDbGlja2VkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7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LEFBQzdCO2lCQUFBLEFBQUssU0FBUyxFQUFDLFVBQVUsTUFBekIsQUFBYyxBQUFpQixBQUNsQzs7Ozs2Q0FFb0IsQUFDakI7Z0JBQUksS0FBQSxBQUFLLE1BQVQsQUFBZSxTQUFTLEFBQ3BCO3FCQUFBLEFBQUssT0FBTyxLQUFBLEFBQUssTUFBakIsQUFBdUIsQUFDdkI7cUJBQUEsQUFBSyxTQUFTLEVBQUMsU0FBZixBQUFjLEFBQVUsQUFDM0I7QUFDSjs7OztpQ0FFUTt5QkFDTDs7bUNBQ0ksQUFBQyx3Q0FBTSxPQUFQLE1BQWEsVUFBVSxLQUFBLEFBQUssTUFBNUIsQUFBa0MsQUFDOUI7dUJBQU8sS0FBQSxBQUFLLE1BRGhCLEFBQ3NCLEFBQ2xCOzBCQUFVLGtCQUFBLEFBQUMsR0FBRDsyQkFBTyxPQUFBLEFBQUssU0FBUyxFQUFDLFNBQVMsRUFBQSxBQUFFLE9BQWpDLEFBQU8sQUFBYyxBQUFtQjtBQUZ0RCxBQUdJOzBCQUFVLE9BQUYsQUFBUyxRQUFRLGVBQWpCLEFBQWdDLFNBQVMsTUFBekMsQUFBK0MsUUFBUSxTQUF2RCxBQUFnRSxRQUFRLFNBQVMsaUJBQUEsQUFBQyxHQUFEOytCQUFLLE9BQUwsQUFBSyxBQUFLO0FBSHZHLEFBR1kscUJBQUE7OEJBSFo7Z0NBREosQUFDSSxBQUtQO0FBTE87YUFBQTs7Ozs7QSxBQXBCWSxBQTRCeEI7O2tCQUFBLEFBQWUiLCJmaWxlIjoiQ2hhdC5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvdGhlYmUvRGVza3RvcC9ibG9ja2NoYWluLXByb2oifQ==