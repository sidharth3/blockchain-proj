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

var _jsxFileName = '/home/victorpham1997/Workplace/SUTD/50037_blockchain/blockchain-proj/views/HeaderMenu.js';
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

        _this.handleDropdownClicked = function (event, data) {
            if (data.name == 'updateProfile') {
                _AppDispatcher2.default.dispatch({
                    action: _Constant2.default.ACTION.OPEN_UPDATE_PROFILE
                });
            } else if (data.name == 'logOutItem') {
                _this.clearAllData();
                window.location.reload();
            } else if (data.name == 'settingsItem') {
                _AppDispatcher2.default.dispatch({
                    action: _Constant2.default.ACTION.OPEN_SETTINGS_MODAL
                });
            } else if (data.name == 'changeEthNetwork') {
                if (data.networkid != _Config2.default.ENV.EthNetworkId) {
                    _Config2.default.ENV.EthNetworkId = data.networkid;
                    _this.removeNetworkDependentData();
                    window.location.reload();
                }
            }
        };

        _this.removeNetworkDependentData = function () {
            _this.account.storageManager.removeNetworkDependentData();
        };

        _this.handleJoinClicked = function () {
            var publicKeyBuffer = _this.account.getPublicKeyBuffer();
            // console.log(this.contractManager);

            _this.contractManager.joinContract(publicKeyBuffer, function (resultEvent) {
                if (resultEvent == _Constant2.default.EVENT.ON_REJECTED || resultEvent == _Constant2.default.EVENT.ON_ERROR) {
                    _this.setState({ isJoinButtonLoading: false });
                } else if (resultEvent == _Constant2.default.EVENT.ON_RECEIPT) {
                    window.location.reload();
                }
            });
            _this.setState({ isJoinButtonLoading: true });
        };

        _this.handleImportPrivateKeyClicked = function () {
            _AppDispatcher2.default.dispatch({
                action: _Constant2.default.ACTION.OPEN_PRIVATE_KEY_MODAL
            });
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
                    lineNumber: 117
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
                                    lineNumber: 127
                                }
                            }, _react2.default.createElement(_semanticUiReact.Image, { src: this.state.avatarUrl, avatar: true, __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 127
                                }
                            }), this.state.name ? this.state.name : this.state.address.substr(0, 10));
                        } else {
                            dropdownTrigger = _react2.default.createElement('span', {
                                __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 131
                                }
                            }, _react2.default.createElement(_semanticUiReact.Icon, { name: 'user', size: 'large', __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 131
                                }
                            }), this.state.name ? this.state.name : this.state.address.substr(0, 10));
                        }

                        var networkItems = [];
                        for (var i = 0; i < _Config2.default.NETWORK_LIST.length; i++) {
                            networkItems.push(_react2.default.createElement(_semanticUiReact.Dropdown.Item, { key: 'networkItem' + i, networkid: _Config2.default.NETWORK_LIST[i].id, name: 'changeEthNetwork', onClick: this.handleDropdownClicked, __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 138
                                }
                            }, _Config2.default.NETWORK_LIST[i].name));
                        }

                        var memberInfo;
                        if (this.account.isJoined) {
                            memberInfo = _react2.default.createElement(_semanticUiReact.Dropdown, { item: true, trigger: dropdownTrigger, __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 147
                                }
                            }, _react2.default.createElement(_semanticUiReact.Dropdown.Menu, {
                                __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 148
                                }
                            }, _react2.default.createElement(_semanticUiReact.Dropdown.Item, { name: 'updateProfile', onClick: this.handleDropdownClicked, __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 149
                                }
                            }, _react2.default.createElement(_semanticUiReact.Icon, { name: 'write', __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 150
                                }
                            }), 'Update profile'), _react2.default.createElement(_semanticUiReact.Dropdown.Item, { name: 'settingsItem', onClick: this.handleDropdownClicked, __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 152
                                }
                            }, _react2.default.createElement(_semanticUiReact.Icon, { name: 'settings', __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 153
                                }
                            }), 'Settings'), _react2.default.createElement(_semanticUiReact.Dropdown.Item, { name: 'logOutItem', onClick: this.handleDropdownClicked, __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 155
                                }
                            }, _react2.default.createElement(_semanticUiReact.Icon, { name: 'log out', __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 156
                                }
                            }), 'Log out')));
                        } else {
                            memberInfo = _react2.default.createElement(_semanticUiReact.Button, { color: 'orange', onClick: this.handleJoinClicked,
                                loading: this.state.isJoinButtonLoading,
                                disabled: this.state.isJoinButtonLoading, __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 163
                                }
                            }, 'Join ', _Constant2.default.APP_NAME);
                        }

                        var pendingTxItem;
                        if (this.state.numPendingTx > 0) {
                            pendingTxItem = _react2.default.createElement(_semanticUiReact.Label, { as: 'a', color: 'yellow', href: addressExplorerUrl, target: '_blank', __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 172
                                }
                            }, _react2.default.createElement(_semanticUiReact.Icon, { name: 'spinner', loading: true, __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 173
                                }
                            }), this.state.numPendingTx, ' pending tx');
                        }

                        accountInfo = _react2.default.createElement(_semanticUiReact.Menu.Menu, { position: 'right', __source: {
                                fileName: _jsxFileName,
                                lineNumber: 180
                            }
                        }, _react2.default.createElement(_semanticUiReact.Menu.Item, {
                            __source: {
                                fileName: _jsxFileName,
                                lineNumber: 181
                            }
                        }, _react2.default.createElement(_semanticUiReact.Dropdown, { item: true, text: _Config2.default.ENV.NetworkName, __source: {
                                fileName: _jsxFileName,
                                lineNumber: 182
                            }
                        }, _react2.default.createElement(_semanticUiReact.Dropdown.Menu, {
                            __source: {
                                fileName: _jsxFileName,
                                lineNumber: 183
                            }
                        }, networkItems))), _react2.default.createElement(_semanticUiReact.Menu.Item, {
                            __source: {
                                fileName: _jsxFileName,
                                lineNumber: 188
                            }
                        }, _react2.default.createElement(_semanticUiReact.List, {
                            __source: {
                                fileName: _jsxFileName,
                                lineNumber: 189
                            }
                        }, _react2.default.createElement(_semanticUiReact.List.Item, {
                            __source: {
                                fileName: _jsxFileName,
                                lineNumber: 190
                            }
                        }, _react2.default.createElement('a', { href: addressExplorerUrl, target: '_blank', __source: {
                                fileName: _jsxFileName,
                                lineNumber: 191
                            }
                        }, this.state.address)), _react2.default.createElement(_semanticUiReact.List.Item, {
                            __source: {
                                fileName: _jsxFileName,
                                lineNumber: 195
                            }
                        }, 'Balance: ', _react2.default.createElement(_semanticUiReact.Label, { as: 'a', href: addressExplorerUrl, target: '_blank', color: 'orange', __source: {
                                fileName: _jsxFileName,
                                lineNumber: 196
                            }
                        }, parseFloat(_web2.default.utils.fromWei("" + this.state.balance, 'ether')).toFixed(8) + ' ETH'), pendingTxItem))), _react2.default.createElement(_semanticUiReact.Menu.Item, {
                            __source: {
                                fileName: _jsxFileName,
                                lineNumber: 201
                            }
                        }, memberInfo));
                    } else {
                        accountInfo = _react2.default.createElement(_semanticUiReact.Menu.Menu, { position: 'right', __source: {
                                fileName: _jsxFileName,
                                lineNumber: 208
                            }
                        }, _react2.default.createElement(_semanticUiReact.Menu.Item, {
                            __source: {
                                fileName: _jsxFileName,
                                lineNumber: 209
                            }
                        }, _react2.default.createElement(_semanticUiReact.Button, { onClick: this.handleImportPrivateKeyClicked, color: 'blue', __source: {
                                fileName: _jsxFileName,
                                lineNumber: 210
                            }
                        }, 'Import private key')));
                    }
                } else {
                    accountInfo = _react2.default.createElement(_semanticUiReact.Loader, { inverted: true, active: true, __source: {
                            fileName: _jsxFileName,
                            lineNumber: 216
                        }
                    });
                }
            }

            return _react2.default.createElement(_semanticUiReact.Menu, { fixed: 'top', color: 'teal', inverted: true, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 221
                }
            }, _react2.default.createElement(_head2.default, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 222
                }
            }, _react2.default.createElement('link', { rel: 'stylesheet', href: '//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 223
                }
            })), _react2.default.createElement(_semanticUiReact.Container, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 225
                }
            }, _react2.default.createElement(_semanticUiReact.Menu.Item, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 226
                }
            }, _react2.default.createElement('a', { href: '/', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 227
                }
            }, _react2.default.createElement(_semanticUiReact.Image, { src: 'static/images/logo_small.png', height: 44, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 227
                }
            }))), this.account ? accountInfo : _react2.default.createElement('div', {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 229
                }
            })));
        }
    }]);

    return HeaderMenu;
}(_react.Component);

exports.default = HeaderMenu;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZXdzL0hlYWRlck1lbnUuanMiXSwibmFtZXMiOlsiQ29tcG9uZW50IiwiTWVudSIsIkNvbnRhaW5lciIsIkJ1dHRvbiIsIkxhYmVsIiwiTG9hZGVyIiwiTGlzdCIsIkltYWdlIiwiSWNvbiIsIkRyb3Bkb3duIiwiSGVhZCIsIndlYjMiLCJDb25zdGFudCIsIkNvbmZpZyIsImFwcERpc3BhdGNoZXIiLCJIZWFkZXJNZW51IiwicHJvcHMiLCJjbGVhckFsbERhdGEiLCJ3aW5kb3ciLCJsb2NhbFN0b3JhZ2UiLCJjbGVhciIsImdldEFjY291bnRJbmZvIiwiYWRkcmVzcyIsImFjY291bnQiLCJnZXRBZGRyZXNzIiwic2V0U3RhdGUiLCJiYWxhbmNlIiwiaXNMb2FkaW5nIiwiaXNKb2luZWQiLCJyZWxvYWRDb3VudCIsInNldFRpbWVvdXQiLCJoYW5kbGVEcm9wZG93bkNsaWNrZWQiLCJldmVudCIsImRhdGEiLCJuYW1lIiwiZGlzcGF0Y2giLCJhY3Rpb24iLCJBQ1RJT04iLCJPUEVOX1VQREFURV9QUk9GSUxFIiwibG9jYXRpb24iLCJyZWxvYWQiLCJPUEVOX1NFVFRJTkdTX01PREFMIiwibmV0d29ya2lkIiwiRU5WIiwiRXRoTmV0d29ya0lkIiwicmVtb3ZlTmV0d29ya0RlcGVuZGVudERhdGEiLCJzdG9yYWdlTWFuYWdlciIsImhhbmRsZUpvaW5DbGlja2VkIiwicHVibGljS2V5QnVmZmVyIiwiZ2V0UHVibGljS2V5QnVmZmVyIiwiY29udHJhY3RNYW5hZ2VyIiwiam9pbkNvbnRyYWN0IiwicmVzdWx0RXZlbnQiLCJFVkVOVCIsIk9OX1JFSkVDVEVEIiwiT05fRVJST1IiLCJpc0pvaW5CdXR0b25Mb2FkaW5nIiwiT05fUkVDRUlQVCIsImhhbmRsZUltcG9ydFByaXZhdGVLZXlDbGlja2VkIiwiT1BFTl9QUklWQVRFX0tFWV9NT0RBTCIsInRyYW5zYWN0aW9uRGlzcGF0Y2hlciIsInN0YXRlIiwiYXZhdGFyVXJsIiwibnVtUGVuZGluZ1R4IiwicmVnaXN0ZXIiLCJwYXlsb2FkIiwiQUNDT1VOVF9CQUxBTkNFX1VQREFURUQiLCJBQ0NPVU5UX0lORk9fVVBEQVRFRCIsInByb2ZpbGUiLCJQRU5ESU5HX1RSQU5TQUNUSU9OX1VQREFURUQiLCJhY2NvdW50SW5mbyIsImFkZHJlc3NFeHBsb3JlclVybCIsIkV4cGxvcmVyVXJsIiwiZHJvcGRvd25UcmlnZ2VyIiwic3Vic3RyIiwibmV0d29ya0l0ZW1zIiwiaSIsIk5FVFdPUktfTElTVCIsImxlbmd0aCIsInB1c2giLCJpZCIsIm1lbWJlckluZm8iLCJBUFBfTkFNRSIsInBlbmRpbmdUeEl0ZW0iLCJOZXR3b3JrTmFtZSIsInBhcnNlRmxvYXQiLCJ1dGlscyIsImZyb21XZWkiLCJ0b0ZpeGVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJQSxBQUNJLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQTs7QUFFSixBQUFPOzs7O0FBQ1AsQUFBTyxBQUFVOzs7O0FBQ2pCLEFBQU8sQUFBYzs7OztBQUNyQixBQUFPLEFBQVk7Ozs7QUFDbkIsQUFBTyxBQUFtQjs7Ozs7OztBQW5CMUI7QUFDQSxBQUVBLEFBQVE7O0ksQUFrQkY7d0NBQ0Y7O3dCQUFBLEFBQVksT0FBTzs0Q0FBQTs7a0pBQUEsQUFDVDs7Y0FEUyxBQVduQixlQUFlLFlBQU0sQUFDakI7bUJBQUEsQUFBTyxhQUFQLEFBQW9CLEFBQ3ZCO0FBYmtCOztjQUFBLEFBaUNuQixpQkFBaUIsWUFBTSxBQUNuQjtnQkFBSSxVQUFVLE1BQUEsQUFBSyxRQUFuQixBQUFjLEFBQWEsQUFDM0I7Z0JBQUEsQUFBSSxTQUFTLEFBQ1Q7c0JBQUEsQUFBSyxTQUFTLEVBQUMsU0FBRCxBQUFVLFNBQVMsU0FBUyxNQUFBLEFBQUssUUFBakMsQUFBeUMsU0FBUyxXQUFsRCxBQUE2RCxPQUFPLFVBQVUsTUFBQSxBQUFLLFFBQWpHLEFBQWMsQUFBMkYsQUFDNUc7QUFGRCxtQkFFTyxBQUNIO29CQUFJLE1BQUEsQUFBSyxl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QUFvQjswQ0FBcEI7NENBQUEsQUFDSTtBQURKO3lCQUFBLGtCQUNLLGNBQUQsc0JBQUEsQUFBTTs7MENBQU47NENBQUEsQUFDSTtBQURKO0FBQUEsMkNBQ0ksQUFBQyx5Q0FBTyxTQUFTLEtBQWpCLEFBQXNCLCtCQUErQixPQUFyRCxBQUEyRDswQ0FBM0Q7NENBQUE7QUFBQTsyQkFIWixBQUNJLEFBQ0ksQUFDSSxBQUlmO0FBQ0o7QUEvRkQsdUJBK0ZPLEFBQ0g7a0RBQWUsQUFBQyx5Q0FBTyxVQUFSLE1BQWlCLFFBQWpCO3NDQUFBO3dDQUFmLEFBQWUsQUFDbEI7QUFEa0I7cUJBQUE7QUFFdEI7QUFFRDs7bUNBQ0ksQUFBQyx1Q0FBSyxPQUFOLEFBQVksT0FBTSxPQUFsQixBQUF3QixRQUFPLFVBQS9COzhCQUFBO2dDQUFBLEFBQ0k7QUFESjthQUFBLGtCQUNJLEFBQUM7OzhCQUFEO2dDQUFBLEFBQ0E7QUFEQTtBQUFBLHVEQUNNLEtBQU4sQUFBVSxjQUFhLE1BQXZCLEFBQTRCOzhCQUE1QjtnQ0FGSixBQUNJLEFBQ0EsQUFFQTtBQUZBO2lDQUVBLEFBQUM7OzhCQUFEO2dDQUFBLEFBQ0E7QUFEQTtBQUFBLCtCQUNDLGNBQUQsc0JBQUEsQUFBTTs7OEJBQU47Z0NBQUEsQUFDSTtBQURKO0FBQUEsK0JBQ0ksY0FBQSxPQUFHLE1BQUgsQUFBUTs4QkFBUjtnQ0FBQSxBQUFZO0FBQVo7K0JBQVksQUFBQyx3Q0FBTSxLQUFQLEFBQVcsZ0NBQStCLFFBQTFDLEFBQWtEOzhCQUFsRDtnQ0FGaEIsQUFDQSxBQUNJLEFBQVksQUFFWDtBQUZXO3VCQUVYLEFBQUssVUFBTCxBQUFlOzs4QkFBYztnQ0FUMUMsQUFDSSxBQUlJLEFBSWtDLEFBSTdDO0FBSjZDO0FBQUEsYUFBQTs7Ozs7QUEvTXpCLEEsQUFzTnpCOztrQkFBQSxBQUFlIiwiZmlsZSI6IkhlYWRlck1lbnUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdmljdG9ycGhhbTE5OTcvV29ya3BsYWNlL1NVVEQvNTAwMzdfYmxvY2tjaGFpbi9ibG9ja2NoYWluLXByb2oifQ==