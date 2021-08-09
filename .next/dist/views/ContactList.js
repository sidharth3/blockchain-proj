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
                        lineNumber: 122
                    }
                });
            } else if (contactAddresses.length == 0) {
                contactItems.push(_react2.default.createElement(_semanticUiReact.List.Item, { key: 'contact_' + i, __source: {
                        fileName: _jsxFileName,
                        lineNumber: 126
                    }
                }, _react2.default.createElement(_semanticUiReact.List.Content, {
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 127
                    }
                }, _react2.default.createElement(_semanticUiReact.List.Header, {
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 128
                    }
                }, 'Empty'))));
                htmlContent = _react2.default.createElement(_semanticUiReact.List, { selection: true, verticalAlign: 'middle', __source: {
                        fileName: _jsxFileName,
                        lineNumber: 132
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
                                lineNumber: 140
                            }
                        }, _react2.default.createElement(_semanticUiReact.Button, { color: 'orange', loading: user.isAccepting, disabled: user.isAccepting,
                            onClick: this.acceptContactRequest, value: contactAddresses[i], __source: {
                                fileName: _jsxFileName,
                                lineNumber: 141
                            }
                        }, 'Accept'), _react2.default.createElement(_semanticUiReact.Popup, { key: 'info_button_popup_' + i,
                            trigger: _react2.default.createElement(_semanticUiReact.Button, { color: 'green', as: 'a', href: addressExplorerUrl, target: '_blank', circular: true, icon: 'info circle', __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 144
                                }
                            }),
                            content: 'View on Etherscan',
                            __source: {
                                fileName: _jsxFileName,
                                lineNumber: 143
                            }
                        }));
                    } else if (user.relationship == _Constant2.default.Relationship.Requested) {
                        rightAlignedContent = _react2.default.createElement(_semanticUiReact.List.Content, { floated: 'right', __source: {
                                fileName: _jsxFileName,
                                lineNumber: 151
                            }
                        }, _react2.default.createElement(_semanticUiReact.Popup, { key: 'wait_popup_' + i,
                            trigger: _react2.default.createElement(_semanticUiReact.Button, { color: 'yellow', circular: true, icon: 'wait', __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 153
                                }
                            }),
                            content: 'Pending acceptance',
                            __source: {
                                fileName: _jsxFileName,
                                lineNumber: 152
                            }
                        }), _react2.default.createElement(_semanticUiReact.Popup, { key: 'info_button_popup_' + i,
                            trigger: _react2.default.createElement(_semanticUiReact.Button, { color: 'green', as: 'a', href: addressExplorerUrl, target: '_blank', circular: true, icon: 'info circle', __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 157
                                }
                            }),
                            content: 'View on Etherscan',
                            __source: {
                                fileName: _jsxFileName,
                                lineNumber: 156
                            }
                        }));
                    } else {
                        rightAlignedContent = _react2.default.createElement(_semanticUiReact.List.Content, { floated: 'right', __source: {
                                fileName: _jsxFileName,
                                lineNumber: 164
                            }
                        }, _react2.default.createElement(_semanticUiReact.Popup, { key: 'info_button_popup_' + i,
                            trigger: _react2.default.createElement(_semanticUiReact.Button, { color: 'green', as: 'a', href: addressExplorerUrl, target: '_blank', circular: true, icon: 'info circle', __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 166
                                }
                            }),
                            content: 'View on Etherscan',
                            __source: {
                                fileName: _jsxFileName,
                                lineNumber: 165
                            }
                        }));
                    }

                    var address = contactAddresses[i];
                    contactItems.push(_react2.default.createElement(_semanticUiReact.List.Item, { active: address == this.state.selectedAddress, key: 'contact_' + i, value: address, onClick: this.listItemClicked.bind(this, address), __source: {
                            fileName: _jsxFileName,
                            lineNumber: 175
                        }
                    }, _react2.default.createElement(_semanticUiReact.Image, { avatar: true, src: user.avatarUrl ? user.avatarUrl : 'static/images/user.png', __source: {
                            fileName: _jsxFileName,
                            lineNumber: 176
                        }
                    }), _react2.default.createElement(_semanticUiReact.List.Content, {
                        __source: {
                            fileName: _jsxFileName,
                            lineNumber: 177
                        }
                    }, _react2.default.createElement(_semanticUiReact.List.Header, {
                        __source: {
                            fileName: _jsxFileName,
                            lineNumber: 178
                        }
                    }, user.name ? user.name : address.substr(0, 10)), address.substr(0, 14) + '...'), rightAlignedContent));
                }
                htmlContent = _react2.default.createElement(_semanticUiReact.List, { selection: true, verticalAlign: 'middle', __source: {
                        fileName: _jsxFileName,
                        lineNumber: 187
                    }
                }, contactItems);
            }

            return _react2.default.createElement('div', { style: { width: '100%' }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 191
                }
            }, _react2.default.createElement('div', { style: { height: 40, width: '100%' }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 192
                }
            }, _react2.default.createElement(_AddContactModal2.default, { contractManager: this.contractManager, storageManager: this.account.storageManager, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 193
                }
            }), _react2.default.createElement(_semanticUiReact.Header, { as: 'h2', style: { float: 'left' }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 194
                }
            }, 'Contact list')), _react2.default.createElement('div', { style: { height: height - 40, overflow: 'auto', float: 'left', width: '100%' }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 196
                }
            }, htmlContent));
        }
    }]);

    return ContactList;
}(_react.Component);

exports.default = ContactList;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZXdzL0NvbnRhY3RMaXN0LmpzIl0sIm5hbWVzIjpbIkNvbXBvbmVudCIsIkxpc3QiLCJJbWFnZSIsIkxvYWRlciIsIkRpbW1lciIsIkJ1dHRvbiIsIkljb24iLCJIZWFkZXIiLCJQb3B1cCIsIklucHV0IiwiTWVzc2FnZSIsImFwcERpc3BhdGNoZXIiLCJDb25zdGFudCIsIkNvbmZpZyIsIkFkZENvbnRhY3RNb2RhbCIsIkNvbnRhY3RMaXN0IiwicHJvcHMiLCJhZGRDb250YWN0Q2xpY2tlZCIsImFjY291bnQiLCJpc0pvaW5lZCIsImRpc3BhdGNoIiwiYWN0aW9uIiwiQUNUSU9OIiwiQUREX0NPTlRBQ1QiLCJFVkVOVCIsIkVOQ09VTlRFUkVEX0VSUk9SIiwibWVzc2FnZSIsIkFQUF9OQU1FIiwiYWNjZXB0Q29udGFjdFJlcXVlc3QiLCJldmVudCIsImFkZHJlc3MiLCJ0YXJnZXQiLCJ2YWx1ZSIsInN0b3JhZ2VNYW5hZ2VyIiwiY29udGFjdHMiLCJpc0FjY2VwdGluZyIsImZvcmNlVXBkYXRlIiwiY29udHJhY3RNYW5hZ2VyIiwicmVzdWx0RXZlbnQiLCJPTl9SRUpFQ1RFRCIsIk9OX0VSUk9SIiwiT05fUkVDRUlQVCIsInJlbGF0aW9uc2hpcCIsIlJlbGF0aW9uc2hpcCIsIkNvbm5lY3RlZCIsInNldFN0YXRlIiwiY29udGFjdEFkZHJlc3NlcyIsImxpc3RJdGVtQ2xpY2tlZCIsIlNFTEVDVF9DT05UQUNUIiwiZGF0YSIsInNlbGVjdGVkQWRkcmVzcyIsInN0YXRlIiwicmF3Q29udGFjdEFycmF5IiwiY29udGFjdEFycmF5IiwiaSIsImxlbmd0aCIsInRvTG93ZXJDYXNlIiwid2luZG93IiwibG9jYWxTdG9yYWdlIiwiRU5WIiwiQ29udHJhY3RBZGRyZXNzIiwicHVzaCIsInVwZGF0ZUNvbnRhY3QiLCJyZWdpc3RlciIsInBheWxvYWQiLCJDT05UQUNUX0xJU1RfVVBEQVRFRCIsImhlaWdodCIsImh0bWxDb250ZW50IiwiY29udGFjdEl0ZW1zIiwidW5kZWZpbmVkIiwidXNlciIsImFkZHJlc3NFeHBsb3JlclVybCIsIkV4cGxvcmVyVXJsIiwicmlnaHRBbGlnbmVkQ29udGVudCIsIk5vUmVsYXRpb24iLCJSZXF1ZXN0ZWQiLCJiaW5kIiwiYXZhdGFyVXJsIiwibmFtZSIsInN1YnN0ciIsIndpZHRoIiwiZmxvYXQiLCJvdmVyZmxvdyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSUEsQUFDSSxBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQTs7QUFFSixBQUFPLEFBQW1COzs7O0FBQzFCLEFBQU8sQUFBYzs7OztBQUNyQixBQUFPLEFBQVk7Ozs7QUFDbkIsQUFBTyxBQUFxQjs7Ozs7OztBQW5CNUI7QUFDQSxBQUVBLEFBQVE7O0lBa0JGLEE7eUNBQ0Y7O3lCQUFBLEFBQVksT0FBTzs0Q0FBQTs7b0pBQUEsQUFDVDs7Y0FEUyxBQWlDbkIsb0JBQW9CLFlBQU0sQUFDdEI7Z0JBQUksTUFBQSxBQUFLLFFBQVQsQUFBaUIsVUFBVSxBQUN2Qjt3Q0FBQSxBQUFjOzRCQUNGLG1CQUFBLEFBQVMsT0FEckIsQUFBdUIsQUFDSyxBQUUvQjtBQUgwQixBQUNuQjtBQUZSLG1CQUlPLEFBQ0g7d0NBQUEsQUFBYzs0QkFDRixtQkFBQSxBQUFTLE1BREUsQUFDSSxBQUN2Qjs2QkFBUyxpQkFBZSxtQkFBZixBQUF3QixXQUZyQyxBQUF1QixBQUV1QixBQUVqRDtBQUowQixBQUNuQjtBQUlYO0FBNUNrQjs7Y0FBQSxBQThDbkIsdUJBQXVCLFVBQUEsQUFBQyxPQUFVLEFBQzlCO2dCQUFJLE1BQUEsQUFBSyxRQUFULEFBQWlCLFVBQVUsQUFDdkI7b0JBQUksVUFBVSxNQUFBLEFBQU0sT0FBcEIsQUFBMkIsQUFFM0I7O3NCQUFBLEFBQUssUUFBTCxBQUFhLGVBQWIsQUFBNEIsU0FBNUIsQUFBcUMsU0FBckMsQUFBOEMsY0FBOUMsQUFBNEQsQUFDNUQ7c0JBQUEsQUFBSyxBQUVMOztzQkFBQSxBQUFLLGdC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b0NBQUEsQUFBd0M7QUFBeEM7aUJBQUEsRUFBZixBQUFlLEFBQ2xCO0FBRUQ7O21DQUNJLGNBQUEsU0FBSyxPQUFPLEVBQUMsT0FBYixBQUFZLEFBQVE7OEJBQXBCO2dDQUFBLEFBQ0k7QUFESjthQUFBLGtCQUNJLGNBQUEsU0FBSyxPQUFPLEVBQUMsUUFBRCxBQUFTLElBQUksT0FBekIsQUFBWSxBQUFvQjs4QkFBaEM7Z0NBQUEsQUFDQTtBQURBOytCQUNBLEFBQUMsMkNBQWdCLGlCQUFpQixLQUFsQyxBQUF1QyxpQkFBaUIsZ0JBQWdCLEtBQUEsQUFBSyxRQUE3RSxBQUFxRjs4QkFBckY7Z0NBREEsQUFDQSxBQUNBO0FBREE7Z0NBQ0EsQUFBQyx5Q0FBTyxJQUFSLEFBQVcsTUFBSyxPQUFPLEVBQUMsT0FBeEIsQUFBdUIsQUFBUTs4QkFBL0I7Z0NBQUE7QUFBQTtlQUhKLEFBQ0ksQUFFQSxBQUVBLGtDQUFBLGNBQUEsU0FBSyxPQUFPLEVBQUMsUUFBUSxTQUFULEFBQWtCLElBQUksVUFBdEIsQUFBZ0MsUUFBUSxPQUF4QyxBQUErQyxRQUFRLE9BQW5FLEFBQVksQUFBNkQ7OEJBQXpFO2dDQUFBLEFBQ0s7QUFETDtlQU5SLEFBQ0ksQUFLSSxBQUtYOzs7OztBQW5McUIsQSxBQXNMMUI7O2tCQUFBLEFBQWUiLCJmaWxlIjoiQ29udGFjdExpc3QuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdmljdG9ycGhhbTE5OTcvV29ya3BsYWNlL1NVVEQvNTAwMzdfYmxvY2tjaGFpbi9ibG9ja2NoYWluLXByb2oifQ==