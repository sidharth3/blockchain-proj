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

var _jsxFileName = '/home/victorpham1997/Workplace/SUTD/50037_blockchain/blockchain-proj/views/Chat.js';
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
                                    as: 'span', size: 'large', color: 'blue', style: { fontWeight: '100', lineHeight: '1.5' }, __source: {
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
                                    as: 'span', key: 'msg_' + i, size: 'large', color: 'blue',
                                    style: { fontWeight: '100', lineHeight: '1.5' }, __source: {
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
                                key: 'msg_' + i, size: 'large', style: { fontWeight: '100', lineHeight: '1.5' }, __source: {
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
                action: { color: 'orange', labelPosition: 'right', icon: 'send', content: 'Send', onClick: function onClick(e) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZXdzL0NoYXQuanMiXSwibmFtZXMiOlsiQ29tcG9uZW50IiwiU2VnbWVudCIsIklucHV0IiwiQnV0dG9uIiwiTWVzc2FnZSIsIkljb24iLCJIZWFkZXIiLCJMYWJlbCIsImFwcERpc3BhdGNoZXIiLCJDb25zdGFudCIsIkNvbmZpZyIsInV0aWxzIiwiQ2hhdCIsInByb3BzIiwic2VuZE1lc3NhZ2UiLCJtZXNzYWdlIiwiY29udHJhY3RNYW5hZ2VyIiwic3RhdGUiLCJhZGRyZXNzIiwiYWNjb3VudCIsInN0b3JhZ2VNYW5hZ2VyIiwiY29udGFjdHMiLCJwdWJsaWNLZXkiLCJtZXNzYWdlcyIsInNjcm9sbFRvQm90dG9tIiwibGFzdE9iamVjdEFuY2hvciIsInVuZGVmaW5lZCIsInNjcm9sbEludG9WaWV3IiwiYmVoYXZpb3IiLCJyZWdpc3RlciIsInBheWxvYWQiLCJhY3Rpb24iLCJBQ1RJT04iLCJTRUxFQ1RfQ09OVEFDVCIsInNldFN0YXRlIiwiZGF0YSIsIkVWRU5UIiwiTUVTU0FHRVNfVVBEQVRFRCIsImhlaWdodCIsIm1lc3NhZ2VJdGVtcyIsImxlbmd0aCIsImkiLCJkZWNyeXB0ZWRNZXNzYWdlIiwiZW5jcnlwdGlvbiIsImRlY3J5cHQiLCJzdWJzdHIiLCJjb21wdXRlU2VjcmV0IiwiQnVmZmVyIiwiZnJvbSIsImV4cGxvcmVyVXJsIiwiRU5WIiwiRXhwbG9yZXJVcmwiLCJ0eEhhc2giLCJpc01pbmUiLCJzdGF0dXMiLCJTRU5UX1NUQVRVUyIsIlBFTkRJTkciLCJwdXNoIiwiZm9udFdlaWdodCIsImxpbmVIZWlnaHQiLCJGQUlMRUQiLCJ3aWR0aCIsIm92ZXJmbG93IiwiVGV4dElucHV0IiwiZGlzYWJsZWQiLCJjb250ZW50Iiwib25TZW5kIiwiZSIsInRhcmdldCIsInZhbHVlIiwiY29sb3IiLCJsYWJlbFBvc2l0aW9uIiwiaWNvbiIsIm9uQ2xpY2siLCJzZW5kTWVzc2FnZUNsaWNrZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7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aUJBQUEsQUFBSyxTQUFTLEVBQUMsVUFBVSxNQUF6QixBQUFjLEFBQWlCLEFBQ2xDOzs7OzZDQUVvQixBQUNqQjtnQkFBSSxLQUFBLEFBQUssTUFBVCxBQUFlLFNBQVMsQUFDcEI7cUJBQUEsQUFBSyxPQUFPLEtBQUEsQUFBSyxNQUFqQixBQUF1QixBQUN2QjtxQkFBQSxBQUFLLFNBQVMsRUFBQyxTQUFmLEFBQWMsQUFBVSxBQUMzQjtBQUNKOzs7O2lDQUVRO3lCQUNMOzttQ0FDSSxBQUFDLHdDQUFNLE9BQVAsTUFBYSxVQUFVLEtBQUEsQUFBSyxNQUE1QixBQUFrQyxBQUM5Qjt1QkFBTyxLQUFBLEFBQUssTUFEaEIsQUFDc0IsQUFDbEI7MEJBQVUsa0JBQUEsQUFBQyxHQUFEOzJCQUFPLE9BQUEsQUFBSyxTQUFTLEVBQUMsU0FBUyxFQUFBLEFBQUUsT0FBakMsQUFBTyxBQUFjLEFBQW1CO0FBRnRELEFBR0k7MEJBQVUsT0FBRixBQUFTLFVBQVUsZUFBbkIsQUFBa0MsU0FBUyxNQUEzQyxBQUFpRCxRQUFRLFNBQXpELEFBQWtFLFFBQVEsU0FBUyxpQkFBQSxBQUFDLEdBQUQ7K0JBQUssT0FBTCxBQUFLLEFBQUs7QUFIekcsQUFHWSxxQkFBQTs4QkFIWjtnQ0FESixBQUNJLEFBS1A7QUFMTzthQUFBOzs7OztBQXBCWSxBLEFBNEJ4Qjs7a0JBQUEsQUFBZSIsImZpbGUiOiJDaGF0LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3ZpY3RvcnBoYW0xOTk3L1dvcmtwbGFjZS9TVVRELzUwMDM3X2Jsb2NrY2hhaW4vYmxvY2tjaGFpbi1wcm9qIn0=