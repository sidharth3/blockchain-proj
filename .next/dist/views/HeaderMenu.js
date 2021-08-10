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

var _head = require('next/dist/lib/head.js');

var _head2 = _interopRequireDefault(_head);

var _web = require('../ethereum/web3');

var _web2 = _interopRequireDefault(_web);

var _Constant = require('../support/Constant');

var _Constant2 = _interopRequireDefault(_Constant);

var _Config = require('../support/Config');

var _Config2 = _interopRequireDefault(_Config);

var _AppDispatcher = require('../core/AppDispatcher');

var _AppDispatcher2 = _interopRequireDefault(_AppDispatcher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/thebe/Desktop/blockchain-proj/views/HeaderMenu.js';
// Copyright (c) 2018 Nguyen Vu Nhat Minh
// Distributed under the MIT software license, see the accompanying file LICENSE

var HeaderMenu = function (_Component) {
    (0, _inherits3.default)(HeaderMenu, _Component);

    function HeaderMenu(props) {
        (0, _classCallCheck3.default)(this, HeaderMenu);

        var _this = (0, _possibleConstructorReturn3.default)(this, (HeaderMenu.__proto__ || (0, _getPrototypeOf2.default)(HeaderMenu)).call(this, props));

        _this.clearAllData = function () {
            window.localStorage.clear();
        };

        _this.getAccountInfo = function () {
            var address = _this.account.getAddress();
            if (address) {
                _this.setState({ address: address, balance: _this.account.balance, isLoading: false, isJoined: _this.account.isJoined });
            } else {
                if (_this.reloadCount == 1) {
                    _this.setState({ isLoading: false });
                } else {
                    _this.reloadCount++;
                    setTimeout(_this.getAccountInfo, 800);
                }
            }
        };

        _this.handleLogout = function (event, data) {
            _this.clearAllData();
            window.location.reload();
        };

        _this.removeNetworkDependentData = function () {
            _this.account.storageManager.removeNetworkDependentData();
        };

        _this.account = props.account;
        _this.contractManager = props.contractManager;
        _this.transactionDispatcher = props.transactionDispatcher;
        _this.state = { address: "", balance: "", name: "",
            avatarUrl: "", isLoading: true, isJoinButtonLoading: false,
            isJoined: false, numPendingTx: 0 };
        _this.reloadCount = 0;
        return _this;
    }

    (0, _createClass3.default)(HeaderMenu, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            if (this.account) {
                this.getAccountInfo();
                _AppDispatcher2.default.register(function (payload) {
                    if (payload.action == _Constant2.default.EVENT.ACCOUNT_BALANCE_UPDATED) {
                        _this2.setState({ balance: _this2.account.balance });
                    } else if (payload.action == _Constant2.default.EVENT.ACCOUNT_INFO_UPDATED) {
                        _this2.setState({ name: payload.profile.name, avatarUrl: payload.profile.avatarUrl, isJoined: payload.profile.isJoined });
                    }
                });
                this.transactionDispatcher.register(function (payload) {
                    if (payload.action == _Constant2.default.EVENT.PENDING_TRANSACTION_UPDATED) {
                        _this2.setState({ numPendingTx: payload.numPendingTx });
                    }
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var accountInfo = _react2.default.createElement('div', {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 81
                }
            });

            if (this.account) {
                if (this.state.isLoading == false) {
                    if (this.state.address) {
                        var addressExplorerUrl = _Config2.default.ENV.ExplorerUrl + 'address/' + this.state.address;
                        var dropdownTrigger;

                        if (this.state.avatarUrl) {
                            dropdownTrigger = _react2.default.createElement('span', {
                                __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 91
                                }
                            }, _react2.default.createElement(_semanticUiReact.Image, { src: this.state.avatarUrl, avatar: true, __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 91
                                }
                            }), this.state.name ? this.state.name : this.state.address.substr(0, 10));
                        } else {
                            dropdownTrigger = _react2.default.createElement('span', {
                                __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 95
                                }
                            }, _react2.default.createElement(_semanticUiReact.Icon, { name: 'user', size: 'large', __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 95
                                }
                            }), this.state.name ? this.state.name : this.state.address.substr(0, 10));
                        }

                        var logOutButton;
                        if (this.account.isJoined) {
                            logOutButton = _react2.default.createElement(_semanticUiReact.Button, { color: 'red', onClick: this.handleLogout, __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 103
                                }
                            }, _react2.default.createElement(_semanticUiReact.Icon, { name: 'log out', __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 104
                                }
                            }), 'Log out');
                        }

                        // var pendingTxItem;
                        // if (this.state.numPendingTx > 0) {
                        //     pendingTxItem = (
                        //         <Label as='a' color='yellow' href={addressExplorerUrl} target='_blank'>
                        //             <Icon name='spinner' loading/>
                        //             {this.state.numPendingTx} pending tx
                        //         </Label>
                        //     );
                        // }

                        accountInfo = _react2.default.createElement(_semanticUiReact.Menu.Item, {
                            __source: {
                                fileName: _jsxFileName,
                                lineNumber: 119
                            }
                        }, _react2.default.createElement(_semanticUiReact.List, {
                            __source: {
                                fileName: _jsxFileName,
                                lineNumber: 120
                            }
                        }, _react2.default.createElement(_semanticUiReact.List.Item, {
                            __source: {
                                fileName: _jsxFileName,
                                lineNumber: 121
                            }
                        }, 'Address: ', _react2.default.createElement(_semanticUiReact.Label, { as: 'a', href: addressExplorerUrl, target: '_blank', color: 'green', __source: {
                                fileName: _jsxFileName,
                                lineNumber: 122
                            }
                        }, this.state.address)), _react2.default.createElement(_semanticUiReact.List.Item, {
                            __source: {
                                fileName: _jsxFileName,
                                lineNumber: 124
                            }
                        }, 'Balance: ', _react2.default.createElement(_semanticUiReact.Label, { as: 'a', href: addressExplorerUrl, target: '_blank', color: 'green', __source: {
                                fileName: _jsxFileName,
                                lineNumber: 125
                            }
                        }, parseFloat(_web2.default.utils.fromWei("" + this.state.balance, 'ether')).toFixed(8) + ' ETH'))));
                    }
                } else {
                    accountInfo = _react2.default.createElement(_semanticUiReact.Loader, { inverted: true, active: true, __source: {
                            fileName: _jsxFileName,
                            lineNumber: 133
                        }
                    });
                }
            }

            return _react2.default.createElement(_semanticUiReact.Menu, { fluid: true, color: 'blue', inverted: true, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 138
                }
            }, _react2.default.createElement(_head2.default, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 139
                }
            }, _react2.default.createElement('link', { rel: 'stylesheet', href: '//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 140
                }
            })), _react2.default.createElement(_semanticUiReact.Menu.Item, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 142
                }
            }, _react2.default.createElement('a', { href: '/', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 143
                }
            }, _react2.default.createElement(_semanticUiReact.Image, { src: 'static/images/ethereum-messenger-logo.png', height: 50, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 143
                }
            }))), this.account ? accountInfo : _react2.default.createElement('div', {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 145
                }
            }), _react2.default.createElement(_semanticUiReact.Menu.Menu, { position: 'right', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 146
                }
            }, _react2.default.createElement(_semanticUiReact.Menu.Item, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 147
                }
            }, logOutButton)));
        }
    }]);

    return HeaderMenu;
}(_react.Component);

exports.default = HeaderMenu;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZXdzL0hlYWRlck1lbnUuanMiXSwibmFtZXMiOlsiQ29tcG9uZW50IiwiTWVudSIsIkNvbnRhaW5lciIsIkJ1dHRvbiIsIkxhYmVsIiwiTG9hZGVyIiwiTGlzdCIsIkltYWdlIiwiSWNvbiIsIkRyb3Bkb3duIiwiSGVhZCIsIndlYjMiLCJDb25zdGFudCIsIkNvbmZpZyIsImFwcERpc3BhdGNoZXIiLCJIZWFkZXJNZW51IiwicHJvcHMiLCJjbGVhckFsbERhdGEiLCJ3aW5kb3ciLCJsb2NhbFN0b3JhZ2UiLCJjbGVhciIsImdldEFjY291bnRJbmZvIiwiYWRkcmVzcyIsImFjY291bnQiLCJnZXRBZGRyZXNzIiwic2V0U3RhdGUiLCJiYWxhbmNlIiwiaXNMb2FkaW5nIiwiaXNKb2luZWQiLCJyZWxvYWRDb3VudCIsInNldFRpbWVvdXQiLCJoYW5kbGVMb2dvdXQiLCJldmVudCIsImRhdGEiLCJsb2NhdGlvbiIsInJlbG9hZCIsInJlbW92ZU5ldHdvcmtEZXBlbmRlbnREYXRhIiwic3RvcmFnZU1hbmFnZXIiLCJjb250cmFjdE1hbmFnZXIiLCJ0cmFuc2FjdGlvbkRpc3BhdGNoZXIiLCJzdGF0ZSIsIm5hbWUiLCJhdmF0YXJVcmwiLCJpc0pvaW5CdXR0b25Mb2FkaW5nIiwibnVtUGVuZGluZ1R4IiwicmVnaXN0ZXIiLCJwYXlsb2FkIiwiYWN0aW9uIiwiRVZFTlQiLCJBQ0NPVU5UX0JBTEFOQ0VfVVBEQVRFRCIsIkFDQ09VTlRfSU5GT19VUERBVEVEIiwicHJvZmlsZSIsIlBFTkRJTkdfVFJBTlNBQ1RJT05fVVBEQVRFRCIsImFjY291bnRJbmZvIiwiYWRkcmVzc0V4cGxvcmVyVXJsIiwiRU5WIiwiRXhwbG9yZXJVcmwiLCJkcm9wZG93blRyaWdnZXIiLCJzdWJzdHIiLCJsb2dPdXRCdXR0b24iLCJwYXJzZUZsb2F0IiwidXRpbHMiLCJmcm9tV2VpIiwidG9GaXhlZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSUEs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QUFBLEFBQ0E7QUFEQTtBQUFBLHVEQUNNLEtBQU4sQUFBVSxjQUFhLE1BQXZCLEFBQTRCOzhCQUE1QjtnQ0FGSixBQUNJLEFBQ0EsQUFFQTtBQUZBO2lDQUVDLGNBQUQsc0JBQUEsQUFBTTs7OEJBQU47Z0NBQUEsQUFDSTtBQURKO0FBQUEsK0JBQ0ksY0FBQSxPQUFHLE1BQUgsQUFBUTs4QkFBUjtnQ0FBQSxBQUFZO0FBQVo7K0JBQVksQUFBQyx3Q0FBTSxLQUFQLEFBQVcsNkNBQTRDLFFBQXZELEFBQStEOzhCQUEvRDtnQ0FMcEIsQUFJSSxBQUNJLEFBQVksQUFFZjtBQUZlO3VCQUVmLEFBQUssVUFBTCxBQUFlOzs4QkFBYztnQ0FQbEMsQUFPa0MsQUFDOUI7QUFEOEI7QUFBQSxhQUFBLG1CQUM3QixjQUFELHNCQUFBLEFBQU0sUUFBSyxVQUFYLEFBQW9COzhCQUFwQjtnQ0FBQSxBQUNJO0FBREo7K0JBQ0ssY0FBRCxzQkFBQSxBQUFNOzs4QkFBTjtnQ0FBQSxBQUNLO0FBREw7QUFBQSxlQVZaLEFBQ0ksQUFRSSxBQUNJLEFBTWY7Ozs7O0EsQUFuSW9CLEFBc0l6Qjs7a0JBQUEsQUFBZSIsImZpbGUiOiJIZWFkZXJNZW51LmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy90aGViZS9EZXNrdG9wL2Jsb2NrY2hhaW4tcHJvaiJ9