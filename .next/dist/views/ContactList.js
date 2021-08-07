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

var _AddContactModal = require('./modals/AddContactModal');

var _AddContactModal2 = _interopRequireDefault(_AddContactModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/home/victorpham1997/Workplace/SUTD/50037_blockchain/blockchain-proj/views/ContactList.js';
// Copyright (c) 2018 Nguyen Vu Nhat Minh
// Distributed under the MIT software license, see the accompanying file LICENSE

var ContactList = function (_Component) {
    (0, _inherits3.default)(ContactList, _Component);

    function ContactList(props) {
        (0, _classCallCheck3.default)(this, ContactList);

        var _this = (0, _possibleConstructorReturn3.default)(this, (ContactList.__proto__ || (0, _getPrototypeOf2.default)(ContactList)).call(this, props));

        _this.addContactClicked = function () {
            if (_this.account.isJoined) {
                _AppDispatcher2.default.dispatch({
                    action: _Constant2.default.ACTION.ADD_CONTACT
                });
            } else {
                _AppDispatcher2.default.dispatch({
                    action: _Constant2.default.EVENT.ENCOUNTERED_ERROR,
                    message: 'Please join ' + _Constant2.default.APP_NAME + ' first by click on the \'Join\' button on the top-right corner'
                });
            }
        };

        _this.acceptContactRequest = function (event) {
            if (_this.account.isJoined) {
                var address = event.target.value;

                _this.account.storageManager.contacts[address].isAccepting = true;
                _this.forceUpdate();

                _this.contractManager.acceptContactRequest(address, function (resultEvent) {
                    if (resultEvent == _Constant2.default.EVENT.ON_REJECTED) {
                        _this.account.storageManager.contacts[address].isAccepting = false;
                        _this.forceUpdate();
                    } else if (resultEvent == _Constant2.default.EVENT.ON_ERROR) {
                        _this.account.storageManager.contacts[address].isAccepting = false;
                        _this.forceUpdate();
                    } else if (resultEvent == _Constant2.default.EVENT.ON_RECEIPT) {
                        _this.account.storageManager.contacts[address].isAccepting = false;
                        _this.account.storageManager.contacts[address].relationship = _Constant2.default.Relationship.Connected;
                        _this.setState({ contactAddresses: _this.account.storageManager.contactAddresses });
                    }
                });
            } else {
                _AppDispatcher2.default.dispatch({
                    action: _Constant2.default.EVENT.ENCOUNTERED_ERROR,
                    message: 'Please join ' + _Constant2.default.APP_NAME + ' first by click on the \'Join\' button on the top-right corner'
                });
            }
        };

        _this.listItemClicked = function (address, event) {
            if (_this.account.storageManager.contacts[address].relationship == _Constant2.default.Relationship.Connected && _this.account.storageManager.contacts[address].publicKey) {
                _AppDispatcher2.default.dispatch({
                    action: _Constant2.default.ACTION.SELECT_CONTACT,
                    data: address
                });
                _this.setState({ selectedAddress: address });
            }
        };

        _this.account = props.account;
        _this.contractManager = props.contractManager;
        _this.state = { contactAddresses: [], isAccepting: [], selectedAddress: "" };
        return _this;
    }

    (0, _createClass3.default)(ContactList, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            this.setState({ contactAddresses: this.account.storageManager.contactAddresses });

            _AppDispatcher2.default.register(function (payload) {
                if (payload.action == _Constant2.default.EVENT.CONTACT_LIST_UPDATED) {
                    _this2.setState({ contactAddresses: _this2.account.storageManager.contactAddresses });
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var contactAddresses = this.state.contactAddresses;
            var height = this.props.height;

            var htmlContent;

            var contactItems = [];

            if (contactAddresses == undefined) {
                htmlContent = _react2.default.createElement('div', {
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 98
                    }
                });
            } else if (contactAddresses.length == 0) {
                contactItems.push(_react2.default.createElement(_semanticUiReact.List.Item, { key: 'contact_' + i, __source: {
                        fileName: _jsxFileName,
                        lineNumber: 102
                    }
                }, _react2.default.createElement(_semanticUiReact.List.Content, {
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 103
                    }
                }, _react2.default.createElement(_semanticUiReact.List.Header, {
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 104
                    }
                }, 'Empty'))));
                htmlContent = _react2.default.createElement(_semanticUiReact.List, { selection: true, verticalAlign: 'middle', __source: {
                        fileName: _jsxFileName,
                        lineNumber: 108
                    }
                }, contactItems);
            } else {
                for (var i = 0; i < contactAddresses.length; i++) {
                    var user = this.account.storageManager.contacts[contactAddresses[i]];
                    var addressExplorerUrl = _Config2.default.ENV.ExplorerUrl + 'address/' + contactAddresses[i];
                    var rightAlignedContent;
                    if (user.relationship == _Constant2.default.Relationship.NoRelation) {
                        rightAlignedContent = _react2.default.createElement(_semanticUiReact.List.Content, { floated: 'right', __source: {
                                fileName: _jsxFileName,
                                lineNumber: 116
                            }
                        }, _react2.default.createElement(_semanticUiReact.Button, { color: 'orange', loading: user.isAccepting, disabled: user.isAccepting,
                            onClick: this.acceptContactRequest, value: contactAddresses[i], __source: {
                                fileName: _jsxFileName,
                                lineNumber: 117
                            }
                        }, 'Accept'), _react2.default.createElement(_semanticUiReact.Popup, { key: 'info_button_popup_' + i,
                            trigger: _react2.default.createElement(_semanticUiReact.Button, { color: 'green', as: 'a', href: addressExplorerUrl, target: '_blank', circular: true, icon: 'info circle', __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 120
                                }
                            }),
                            content: 'View on Etherscan',
                            __source: {
                                fileName: _jsxFileName,
                                lineNumber: 119
                            }
                        }));
                    } else if (user.relationship == _Constant2.default.Relationship.Requested) {
                        rightAlignedContent = _react2.default.createElement(_semanticUiReact.List.Content, { floated: 'right', __source: {
                                fileName: _jsxFileName,
                                lineNumber: 127
                            }
                        }, _react2.default.createElement(_semanticUiReact.Popup, { key: 'wait_popup_' + i,
                            trigger: _react2.default.createElement(_semanticUiReact.Button, { color: 'yellow', circular: true, icon: 'wait', __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 129
                                }
                            }),
                            content: 'Pending acceptance',
                            __source: {
                                fileName: _jsxFileName,
                                lineNumber: 128
                            }
                        }), _react2.default.createElement(_semanticUiReact.Popup, { key: 'info_button_popup_' + i,
                            trigger: _react2.default.createElement(_semanticUiReact.Button, { color: 'green', as: 'a', href: addressExplorerUrl, target: '_blank', circular: true, icon: 'info circle', __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 133
                                }
                            }),
                            content: 'View on Etherscan',
                            __source: {
                                fileName: _jsxFileName,
                                lineNumber: 132
                            }
                        }));
                    } else {
                        rightAlignedContent = _react2.default.createElement(_semanticUiReact.List.Content, { floated: 'right', __source: {
                                fileName: _jsxFileName,
                                lineNumber: 140
                            }
                        }, _react2.default.createElement(_semanticUiReact.Popup, { key: 'info_button_popup_' + i,
                            trigger: _react2.default.createElement(_semanticUiReact.Button, { color: 'green', as: 'a', href: addressExplorerUrl, target: '_blank', circular: true, icon: 'info circle', __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 142
                                }
                            }),
                            content: 'View on Etherscan',
                            __source: {
                                fileName: _jsxFileName,
                                lineNumber: 141
                            }
                        }));
                    }

                    var address = contactAddresses[i];
                    contactItems.push(_react2.default.createElement(_semanticUiReact.List.Item, { active: address == this.state.selectedAddress, key: 'contact_' + i, value: address, onClick: this.listItemClicked.bind(this, address), __source: {
                            fileName: _jsxFileName,
                            lineNumber: 151
                        }
                    }, _react2.default.createElement(_semanticUiReact.Image, { avatar: true, src: user.avatarUrl ? user.avatarUrl : 'static/images/user.png', __source: {
                            fileName: _jsxFileName,
                            lineNumber: 152
                        }
                    }), _react2.default.createElement(_semanticUiReact.List.Content, {
                        __source: {
                            fileName: _jsxFileName,
                            lineNumber: 153
                        }
                    }, _react2.default.createElement(_semanticUiReact.List.Header, {
                        __source: {
                            fileName: _jsxFileName,
                            lineNumber: 154
                        }
                    }, user.name ? user.name : address.substr(0, 10)), address.substr(0, 14) + '...'), rightAlignedContent));
                }
                htmlContent = _react2.default.createElement(_semanticUiReact.List, { selection: true, verticalAlign: 'middle', __source: {
                        fileName: _jsxFileName,
                        lineNumber: 163
                    }
                }, contactItems);
            }

            return _react2.default.createElement('div', { style: { width: '100%' }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 167
                }
            }, _react2.default.createElement('div', { style: { height: 40, width: '100%' }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 168
                }
            }, _react2.default.createElement(_semanticUiReact.Header, { as: 'h2', style: { float: 'left' }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 169
                }
            }, 'Contact list'), _react2.default.createElement(_semanticUiReact.Button, { color: 'blue', style: { float: 'right' }, onClick: this.addContactClicked, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 170
                }
            }, _react2.default.createElement(_semanticUiReact.Icon, { name: 'add user', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 170
                }
            }), 'Add')), _react2.default.createElement('div', { style: { height: height - 40, overflow: 'auto', float: 'left', width: '100%' }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 172
                }
            }, htmlContent), _react2.default.createElement(_AddContactModal2.default, { contractManager: this.contractManager, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 175
                }
            }));
        }
    }]);

    return ContactList;
}(_react.Component);

exports.default = ContactList;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZXdzL0NvbnRhY3RMaXN0LmpzIl0sIm5hbWVzIjpbIkNvbXBvbmVudCIsIkxpc3QiLCJJbWFnZSIsIkxvYWRlciIsIkRpbW1lciIsIkJ1dHRvbiIsIkljb24iLCJIZWFkZXIiLCJQb3B1cCIsImFwcERpc3BhdGNoZXIiLCJDb25zdGFudCIsIkNvbmZpZyIsIkFkZENvbnRhY3RNb2RhbCIsIkNvbnRhY3RMaXN0IiwicHJvcHMiLCJhZGRDb250YWN0Q2xpY2tlZCIsImFjY291bnQiLCJpc0pvaW5lZCIsImRpc3BhdGNoIiwiYWN0aW9uIiwiQUNUSU9OIiwiQUREX0NPTlRBQ1QiLCJFVkVOVCIsIkVOQ09VTlRFUkVEX0VSUk9SIiwibWVzc2FnZSIsIkFQUF9OQU1FIiwiYWNjZXB0Q29udGFjdFJlcXVlc3QiLCJldmVudCIsImFkZHJlc3MiLCJ0YXJnZXQiLCJ2YWx1ZSIsInN0b3JhZ2VNYW5hZ2VyIiwiY29udGFjdHMiLCJpc0FjY2VwdGluZyIsImZvcmNlVXBkYXRlIiwiY29udHJhY3RNYW5hZ2VyIiwicmVzdWx0RXZlbnQiLCJPTl9SRUpFQ1RFRCIsIk9OX0VSUk9SIiwiT05fUkVDRUlQVCIsInJlbGF0aW9uc2hpcCIsIlJlbGF0aW9uc2hpcCIsIkNvbm5lY3RlZCIsInNldFN0YXRlIiwiY29udGFjdEFkZHJlc3NlcyIsImxpc3RJdGVtQ2xpY2tlZCIsInB1YmxpY0tleSIsIlNFTEVDVF9DT05UQUNUIiwiZGF0YSIsInNlbGVjdGVkQWRkcmVzcyIsInN0YXRlIiwicmVnaXN0ZXIiLCJwYXlsb2FkIiwiQ09OVEFDVF9MSVNUX1VQREFURUQiLCJoZWlnaHQiLCJodG1sQ29udGVudCIsImNvbnRhY3RJdGVtcyIsInVuZGVmaW5lZCIsImxlbmd0aCIsInB1c2giLCJpIiwidXNlciIsImFkZHJlc3NFeHBsb3JlclVybCIsIkVOViIsIkV4cGxvcmVyVXJsIiwicmlnaHRBbGlnbmVkQ29udGVudCIsIk5vUmVsYXRpb24iLCJSZXF1ZXN0ZWQiLCJiaW5kIiwiYXZh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O2dDQUFBO0FBQUE7ZUFEQSxBQUNBLEFBQ0EsaUNBQUEsQUFBQyx5Q0FBTyxPQUFSLEFBQWMsUUFBTyxPQUFPLEVBQUMsT0FBN0IsQUFBNEIsQUFBUSxXQUFVLFNBQVMsS0FBdkQsQUFBNEQ7OEJBQTVEO2dDQUFBLEFBQStFO0FBQS9FOytCQUErRSxBQUFDLHVDQUFLLE1BQU4sQUFBVzs4QkFBWDtnQ0FBL0UsQUFBK0U7QUFBQTtnQkFIbkYsQUFDSSxBQUVBLEFBRUEseUJBQUEsY0FBQSxTQUFLLE9BQU8sRUFBQyxRQUFRLFNBQVQsQUFBa0IsSUFBSSxVQUF0QixBQUFnQyxRQUFRLE9BQXhDLEFBQStDLFFBQVEsT0FBbkUsQUFBWSxBQUE2RDs4QkFBekU7Z0NBQUEsQUFDSztBQURMO2VBTEosQUFLSSxBQUdBLDhCQUFBLEFBQUMsMkNBQWdCLGlCQUFpQixLQUFsQyxBQUF1Qzs4QkFBdkM7Z0NBVFIsQUFDSSxBQVFJLEFBR1g7QUFIVzs7Ozs7O0FBM0pVLEEsQUFpSzFCOztrQkFBQSxBQUFlIiwiZmlsZSI6IkNvbnRhY3RMaXN0LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3ZpY3RvcnBoYW0xOTk3L1dvcmtwbGFjZS9TVVRELzUwMDM3X2Jsb2NrY2hhaW4vYmxvY2tjaGFpbi1wcm9qIn0=