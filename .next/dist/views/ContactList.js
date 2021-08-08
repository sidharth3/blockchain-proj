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
            // if (this.account.storageManager.contacts[address].relationship == Constant.Relationship.Connected &&
            //     this.account.storageManager.contacts[address].publicKey) {
            //     appDispatcher.dispatch({
            //         action: Constant.ACTION.SELECT_CONTACT,
            //         data: address
            //     });
            //     this.setState({selectedAddress: address});
            // }
            _AppDispatcher2.default.dispatch({
                action: _Constant2.default.ACTION.SELECT_CONTACT,
                data: address
            });
            _this.setState({ selectedAddress: address });
        };

        _this.account = props.account;
        _this.contractManager = props.contractManager;
        _this.state = { contactAddresses: [], isAccepting: [], selectedAddress: "" };
        return _this;
    }

    (0, _createClass3.default)(ContactList, [{
        key: 'updateContact',
        value: function updateContact() {
            var rawContactArray = this.account.storageManager.contactAddresses;
            var contactArray = [];
            for (var i = 0; i < rawContactArray.length; i++) {
                if (rawContactArray[i].toLowerCase() != window.localStorage.address && rawContactArray[i] != _Config2.default.ENV.ContractAddress) {
                    contactArray.push(rawContactArray[i]);
                }
            }
            // console.log(this.account.storageManager.contactAddresses);
            this.setState({ contactAddresses: contactArray });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            // this.setState({contactAddresses: this.account.storageManager.contactAddresses});
            this.updateContact();

            _AppDispatcher2.default.register(function (payload) {
                if (payload.action == _Constant2.default.EVENT.CONTACT_LIST_UPDATED) {

                    _this2.updateContact();
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
                        lineNumber: 120
                    }
                });
            } else if (contactAddresses.length == 0) {
                contactItems.push(_react2.default.createElement(_semanticUiReact.List.Item, { key: 'contact_' + i, __source: {
                        fileName: _jsxFileName,
                        lineNumber: 124
                    }
                }, _react2.default.createElement(_semanticUiReact.List.Content, {
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 125
                    }
                }, _react2.default.createElement(_semanticUiReact.List.Header, {
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 126
                    }
                }, 'Empty'))));
                htmlContent = _react2.default.createElement(_semanticUiReact.List, { selection: true, verticalAlign: 'middle', __source: {
                        fileName: _jsxFileName,
                        lineNumber: 130
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
                                lineNumber: 138
                            }
                        }, _react2.default.createElement(_semanticUiReact.Button, { color: 'orange', loading: user.isAccepting, disabled: user.isAccepting,
                            onClick: this.acceptContactRequest, value: contactAddresses[i], __source: {
                                fileName: _jsxFileName,
                                lineNumber: 139
                            }
                        }, 'Accept'), _react2.default.createElement(_semanticUiReact.Popup, { key: 'info_button_popup_' + i,
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
                    } else if (user.relationship == _Constant2.default.Relationship.Requested) {
                        rightAlignedContent = _react2.default.createElement(_semanticUiReact.List.Content, { floated: 'right', __source: {
                                fileName: _jsxFileName,
                                lineNumber: 149
                            }
                        }, _react2.default.createElement(_semanticUiReact.Popup, { key: 'wait_popup_' + i,
                            trigger: _react2.default.createElement(_semanticUiReact.Button, { color: 'yellow', circular: true, icon: 'wait', __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 151
                                }
                            }),
                            content: 'Pending acceptance',
                            __source: {
                                fileName: _jsxFileName,
                                lineNumber: 150
                            }
                        }), _react2.default.createElement(_semanticUiReact.Popup, { key: 'info_button_popup_' + i,
                            trigger: _react2.default.createElement(_semanticUiReact.Button, { color: 'green', as: 'a', href: addressExplorerUrl, target: '_blank', circular: true, icon: 'info circle', __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 155
                                }
                            }),
                            content: 'View on Etherscan',
                            __source: {
                                fileName: _jsxFileName,
                                lineNumber: 154
                            }
                        }));
                    } else {
                        rightAlignedContent = _react2.default.createElement(_semanticUiReact.List.Content, { floated: 'right', __source: {
                                fileName: _jsxFileName,
                                lineNumber: 162
                            }
                        }, _react2.default.createElement(_semanticUiReact.Popup, { key: 'info_button_popup_' + i,
                            trigger: _react2.default.createElement(_semanticUiReact.Button, { color: 'green', as: 'a', href: addressExplorerUrl, target: '_blank', circular: true, icon: 'info circle', __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 164
                                }
                            }),
                            content: 'View on Etherscan',
                            __source: {
                                fileName: _jsxFileName,
                                lineNumber: 163
                            }
                        }));
                    }

                    var address = contactAddresses[i];
                    contactItems.push(_react2.default.createElement(_semanticUiReact.List.Item, { active: address == this.state.selectedAddress, key: 'contact_' + i, value: address, onClick: this.listItemClicked.bind(this, address), __source: {
                            fileName: _jsxFileName,
                            lineNumber: 173
                        }
                    }, _react2.default.createElement(_semanticUiReact.Image, { avatar: true, src: user.avatarUrl ? user.avatarUrl : 'static/images/user.png', __source: {
                            fileName: _jsxFileName,
                            lineNumber: 174
                        }
                    }), _react2.default.createElement(_semanticUiReact.List.Content, {
                        __source: {
                            fileName: _jsxFileName,
                            lineNumber: 175
                        }
                    }, _react2.default.createElement(_semanticUiReact.List.Header, {
                        __source: {
                            fileName: _jsxFileName,
                            lineNumber: 176
                        }
                    }, user.name ? user.name : address.substr(0, 10)), address.substr(0, 14) + '...'), rightAlignedContent));
                }
                htmlContent = _react2.default.createElement(_semanticUiReact.List, { selection: true, verticalAlign: 'middle', __source: {
                        fileName: _jsxFileName,
                        lineNumber: 185
                    }
                }, contactItems);
            }

            return _react2.default.createElement('div', { style: { width: '100%' }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 189
                }
            }, _react2.default.createElement('div', { style: { height: 40, width: '100%' }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 190
                }
            }, _react2.default.createElement(_semanticUiReact.Header, { as: 'h2', style: { float: 'left' }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 191
                }
            }, 'Contact list'), _react2.default.createElement(_semanticUiReact.Button, { color: 'blue', style: { float: 'right' }, onClick: this.addContactClicked, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 192
                }
            }, _react2.default.createElement(_semanticUiReact.Icon, { name: 'add user', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 192
                }
            }), 'Add')), _react2.default.createElement('div', { style: { height: height - 40, overflow: 'auto', float: 'left', width: '100%' }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 194
                }
            }, htmlContent), _react2.default.createElement(_AddContactModal2.default, { contractManager: this.contractManager, storageManager: this.account.storageManager, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 197
                }
            }));
        }
    }]);

    return ContactList;
}(_react.Component);

exports.default = ContactList;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZXdzL0NvbnRhY3RMaXN0LmpzIl0sIm5hbWVzIjpbIkNvbXBvbmVudCIsIkxpc3QiLCJJbWFnZSIsIkxvYWRlciIsIkRpbW1lciIsIkJ1dHRvbiIsIkljb24iLCJIZWFkZXIiLCJQb3B1cCIsImFwcERpc3BhdGNoZXIiLCJDb25zdGFudCIsIkNvbmZpZyIsIkFkZENvbnRhY3RNb2RhbCIsIkNvbnRhY3RMaXN0IiwicHJvcHMiLCJhZGRDb250YWN0Q2xpY2tlZCIsImFjY291bnQiLCJpc0pvaW5lZCIsImRpc3BhdGNoIiwiYWN0aW9uIiwiQUNUSU9OIiwiQUREX0NPTlRBQ1QiLCJFVkVOVCIsIkVOQ09VTlRFUkVEX0VSUk9SIiwibWVzc2FnZSIsIkFQUF9OQU1FIiwiYWNjZXB0Q29udGFjdFJlcXVlc3QiLCJldmVudCIsImFkZHJlc3MiLCJ0YXJnZXQiLCJ2YWx1ZSIsInN0b3JhZ2VNYW5hZ2VyIiwiY29udGFjdHMiLCJpc0FjY2VwdGluZyIsImZvcmNlVXBkYXRlIiwiY29udHJhY3RNYW5hZ2VyIiwicmVzdWx0RXZlbnQiLCJPTl9SRUpFQ1RFRCIsIk9OX0VSUk9SIiwiT05fUkVDRUlQVCIsInJlbGF0aW9uc2hpcCIsIlJlbGF0aW9uc2hpcCIsIkNvbm5lY3RlZCIsInNldFN0YXRlIiwiY29udGFjdEFkZHJlc3NlcyIsImxpc3RJdGVtQ2xpY2tlZCIsIlNFTEVDVF9DT05UQUNUIiwiZGF0YSIsInNlbGVjdGVkQWRkcmVzcyIsInN0YXRlIiwicmF3Q29udGFjdEFycmF5IiwiY29udGFjdEFycmF5IiwiaSIsImxlbmd0aCIsInRvTG93ZXJDYXNlIiwid2luZG93IiwibG9jYWxTdG9yYWdlIiwiRU5WIiwiQ29udHJhY3RBZGRyZXNzIiwicHVzaCIsInVwZGF0ZUNvbnRhY3QiLCJyZWdpc3RlciIsInBheWxvYWQiLCJDT05UQUNUX0xJU1RfVVBEQVRFRCIsImhlaWdodCIsImh0bWxDb250ZW50IiwiY29udGFjdEl0ZW1zIiwidW5kZWZpbmVkIiwidXNlciIsImFkZHJlc3NFeHBsb3JlclVybCIsIkV4cGxvcmVyVXJsIiwicmlnaHRBbGlnbmVkQ29udGVudCIsIk5vUmVsYXRpb24iLCJSZXF1ZXN0ZWQiLCJiaW5kIiwiYXZhdGFyVXJsIiwibmFtZSIsInN1YnN0ciIsIndpZHRoIiwiZmxvYXQiLCJvdmVyZmxvdyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSUEsQUFDSSxBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBOztBQUVKLEFBQU8sQUFBbUI7Ozs7QUFDMUIsQUFBTyxBQUFjOzs7O0FBQ3JCLEFBQU8sQUFBWTs7OztBQUNuQixBQUFPLEFBQXFCOzs7Ozs7O0FBakI1QjtBQUNBLEFBRUEsQUFBUTs7SUFnQkYsQTt5Q0FDRjs7eUJBQUEsQUFBWSxPQUFPOzRDQUFBOztvSkFBQSxBQUNUOztjQURTLEFBaUNuQixvQkFBb0IsWUFBTSxBQUN0QjtnQkFBSSxNQUFBLEFBQUssUUFBVCxBQUFpQixVQUFVLEFBQ3ZCO3dDQUFBLEFBQWM7NEJBQ0YsbUJBQUEsQUFBUyxPQURyQixBQUF1QixBQUNLLEFBRS9CO0FBSDBCLEFBQ25CO0FBRlIsbUJBSU8sQUFDSDt3Q0FBQSxBQUFjOzRCQUNGLG1CQUFBLEFBQVMsTUFERSxBQUNJLEFBQ3ZCOzZCQUFTLGlCQUFlLG1CQUFmLEFBQXdCLFdBRnJDLEFBQXVCLEFBRXVCLEFBRWpEO0FBSjBCLEFBQ25CO0FBSVg7QUE1Q2tCOztjQUFBLEFBOENuQix1QkFBdUIsVUFBQSxBQUFDLE9BQVUsQUFDOUI7Z0JBQUksTUFBQSxBQUFLLFFBQVQsQUFBaUIsVUFBVSxBQUN2QjtvQkFBSSxVQUFVLE1BQUEsQUFBTSxPQUFwQixBQUEyQixBQUUzQjs7c0JBQUEsQUFBSyxRQUFMLEFBQWEsZUFBYixBQUE0QixTQUE1QixBQUFxQyxTQUFyQyxBQUE4QyxjQUE5QyxBQUE0RCxBQUM1RDtzQkFBQSxBQUFLLEFBRUw7O3NCQUFBLEFBQUssZ0JBQUwsQUFBcUIscUJBQXJCLEFBQTBDLFNBQVMs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LEFBQWUsQUFDbEI7QUFFRDs7bUNBQ0ksY0FBQSxTQUFLLE9BQU8sRUFBQyxPQUFiLEFBQVksQUFBUTs4QkFBcEI7Z0NBQUEsQUFDSTtBQURKO2FBQUEsa0JBQ0ksY0FBQSxTQUFLLE9BQU8sRUFBQyxRQUFELEFBQVMsSUFBSSxPQUF6QixBQUFZLEFBQW9COzhCQUFoQztnQ0FBQSxBQUNBO0FBREE7K0JBQ0EsQUFBQyx5Q0FBTyxJQUFSLEFBQVcsTUFBSyxPQUFPLEVBQUMsT0FBeEIsQUFBdUIsQUFBUTs4QkFBL0I7Z0NBQUE7QUFBQTtlQURBLEFBQ0EsQUFDQSxpQ0FBQSxBQUFDLHlDQUFPLE9BQVIsQUFBYyxRQUFPLE9BQU8sRUFBQyxPQUE3QixBQUE0QixBQUFRLFdBQVUsU0FBUyxLQUF2RCxBQUE0RDs4QkFBNUQ7Z0NBQUEsQUFBK0U7QUFBL0U7K0JBQStFLEFBQUMsdUNBQUssTUFBTixBQUFXOzhCQUFYO2dDQUEvRSxBQUErRTtBQUFBO2dCQUhuRixBQUNJLEFBRUEsQUFFQSx5QkFBQSxjQUFBLFNBQUssT0FBTyxFQUFDLFFBQVEsU0FBVCxBQUFrQixJQUFJLFVBQXRCLEFBQWdDLFFBQVEsT0FBeEMsQUFBK0MsUUFBUSxPQUFuRSxBQUFZLEFBQTZEOzhCQUF6RTtnQ0FBQSxBQUNLO0FBREw7ZUFMSixBQUtJLEFBR0EsOEJBQUEsQUFBQywyQ0FBZ0IsaUJBQWlCLEtBQWxDLEFBQXVDLGlCQUFpQixnQkFBZ0IsS0FBQSxBQUFLLFFBQTdFLEFBQXFGOzhCQUFyRjtnQ0FUUixBQUNJLEFBUUksQUFHWDtBQUhXOzs7Ozs7QUFqTFUsQSxBQXVMMUI7O2tCQUFBLEFBQWUiLCJmaWxlIjoiQ29udGFjdExpc3QuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdmljdG9ycGhhbTE5OTcvV29ya3BsYWNlL1NVVEQvNTAwMzdfYmxvY2tjaGFpbi9ibG9ja2NoYWluLXByb2oifQ==