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

var _style = require('styled-jsx/style.js');

var _style2 = _interopRequireDefault(_style);

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
            _this.clearAllData();
            window.location.reload();
        };

        _this.removeNetworkDependentData = function () {
            _this.account.storageManager.removeNetworkDependentData();
        };

        _this.handleJoinClicked = function () {
            var publicKeyBuffer = _this.account.getPublicKeyBuffer();
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
                    lineNumber: 98
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
                                    lineNumber: 108
                                }
                            }, _react2.default.createElement(_semanticUiReact.Image, { src: this.state.avatarUrl, avatar: true, __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 108
                                }
                            }), this.state.name ? this.state.name : this.state.address.substr(0, 10));
                        } else {
                            dropdownTrigger = _react2.default.createElement('span', {
                                __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 112
                                }
                            }, _react2.default.createElement(_semanticUiReact.Icon, { name: 'user', size: 'large', __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 112
                                }
                            }), this.state.name ? this.state.name : this.state.address.substr(0, 10));
                        }

                        var networkItems = [];
                        for (var i = 0; i < _Config2.default.NETWORK_LIST.length; i++) {
                            networkItems.push(_react2.default.createElement(_semanticUiReact.Dropdown.Item, { key: 'networkItem' + i, networkid: _Config2.default.NETWORK_LIST[i].id, name: 'changeEthNetwork', onClick: this.handleDropdownClicked, __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 119
                                }
                            }, _Config2.default.NETWORK_LIST[i].name));
                        }

                        var memberInfo;
                        if (this.account.isJoined) {
                            memberInfo = _react2.default.createElement('div', { name: 'logOutItem', onClick: this.handleDropdownClicked, className: 'jsx-1282957925' + ' ' + 'logOut',
                                __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 128
                                }
                            }, _react2.default.createElement(_semanticUiReact.Icon, { name: 'log out', __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 129
                                }
                            }), 'Log out', _react2.default.createElement(_style2.default, {
                                styleId: '1282957925',
                                css: '.logOut.jsx-1282957925:hover{cursor:pointer;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZXdzL0hlYWRlck1lbnUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBaUlnRCxBQUl3QyxlQUFDIiwiZmlsZSI6InZpZXdzL0hlYWRlck1lbnUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdmljdG9ycGhhbTE5OTcvV29ya3BsYWNlL1NVVEQvNTAwMzdfYmxvY2tjaGFpbi9ibG9ja2NoYWluLXByb2oiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTggTmd1eWVuIFZ1IE5oYXQgTWluaFxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIE1JVCBzb2Z0d2FyZSBsaWNlbnNlLCBzZWUgdGhlIGFjY29tcGFueWluZyBmaWxlIExJQ0VOU0VcblxuaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7XG4gICAgTWVudSxcbiAgICBDb250YWluZXIsXG4gICAgQnV0dG9uLFxuICAgIExhYmVsLFxuICAgIExvYWRlcixcbiAgICBMaXN0LFxuICAgIEltYWdlLFxuICAgIEljb24sXG4gICAgRHJvcGRvd25cbn0gZnJvbSAnc2VtYW50aWMtdWktcmVhY3QnO1xuaW1wb3J0IEhlYWQgZnJvbSAnbmV4dC9oZWFkJztcbmltcG9ydCB3ZWIzIGZyb20gJy4uL2V0aGVyZXVtL3dlYjMnO1xuaW1wb3J0IENvbnN0YW50IGZyb20gJy4uL3N1cHBvcnQvQ29uc3RhbnQnO1xuaW1wb3J0IENvbmZpZyBmcm9tICcuLi9zdXBwb3J0L0NvbmZpZyc7XG5pbXBvcnQgYXBwRGlzcGF0Y2hlciBmcm9tICcuLi9jb3JlL0FwcERpc3BhdGNoZXInO1xuXG5jbGFzcyBIZWFkZXJNZW51IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMuYWNjb3VudCA9IHByb3BzLmFjY291bnQ7XG4gICAgICAgIHRoaXMuY29udHJhY3RNYW5hZ2VyID0gcHJvcHMuY29udHJhY3RNYW5hZ2VyO1xuICAgICAgICB0aGlzLnRyYW5zYWN0aW9uRGlzcGF0Y2hlciA9IHByb3BzLnRyYW5zYWN0aW9uRGlzcGF0Y2hlcjtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHthZGRyZXNzOiBcIlwiLCBiYWxhbmNlOiBcIlwiLCBuYW1lOiBcIlwiLCBcbiAgICAgICAgICAgIGF2YXRhclVybDogXCJcIiwgaXNMb2FkaW5nOiB0cnVlLCBpc0pvaW5CdXR0b25Mb2FkaW5nOiBmYWxzZSwgXG4gICAgICAgICAgICBpc0pvaW5lZDogZmFsc2UsIG51bVBlbmRpbmdUeDogMH07XG4gICAgICAgIHRoaXMucmVsb2FkQ291bnQgPSAwO1xuICAgIH1cblxuICAgIGNsZWFyQWxsRGF0YSA9ICgpID0+IHtcbiAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5jbGVhcigpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICBpZiAodGhpcy5hY2NvdW50KSB7XG4gICAgICAgICAgICB0aGlzLmdldEFjY291bnRJbmZvKCk7XG4gICAgICAgICAgICBhcHBEaXNwYXRjaGVyLnJlZ2lzdGVyKChwYXlsb2FkKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHBheWxvYWQuYWN0aW9uID09IENvbnN0YW50LkVWRU5ULkFDQ09VTlRfQkFMQU5DRV9VUERBVEVEKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2JhbGFuY2U6IHRoaXMuYWNjb3VudC5iYWxhbmNlfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwYXlsb2FkLmFjdGlvbiA9PSBDb25zdGFudC5FVkVOVC5BQ0NPVU5UX0lORk9fVVBEQVRFRCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtuYW1lOiBwYXlsb2FkLnByb2ZpbGUubmFtZSwgYXZhdGFyVXJsOiBwYXlsb2FkLnByb2ZpbGUuYXZhdGFyVXJsLCBpc0pvaW5lZDogcGF5bG9hZC5wcm9maWxlLmlzSm9pbmVkfSk7XG4gICAgICAgICAgICAgICAgfSBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy50cmFuc2FjdGlvbkRpc3BhdGNoZXIucmVnaXN0ZXIoKHBheWxvYWQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocGF5bG9hZC5hY3Rpb24gPT0gQ29uc3RhbnQuRVZFTlQuUEVORElOR19UUkFOU0FDVElPTl9VUERBVEVEKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe251bVBlbmRpbmdUeDogcGF5bG9hZC5udW1QZW5kaW5nVHh9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldEFjY291bnRJbmZvID0gKCkgPT4ge1xuICAgICAgICB2YXIgYWRkcmVzcyA9IHRoaXMuYWNjb3VudC5nZXRBZGRyZXNzKCk7XG4gICAgICAgIGlmIChhZGRyZXNzKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHthZGRyZXNzOiBhZGRyZXNzLCBiYWxhbmNlOiB0aGlzLmFjY291bnQuYmFsYW5jZSwgaXNMb2FkaW5nOiBmYWxzZSwgaXNKb2luZWQ6IHRoaXMuYWNjb3VudC5pc0pvaW5lZH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMucmVsb2FkQ291bnQgPT0gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2lzTG9hZGluZzogZmFsc2V9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWxvYWRDb3VudCsrO1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQodGhpcy5nZXRBY2NvdW50SW5mbywgODAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZURyb3Bkb3duQ2xpY2tlZCA9IChldmVudCwgZGF0YSkgPT4ge1xuICAgICAgICB0aGlzLmNsZWFyQWxsRGF0YSgpO1xuICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7IFxuICAgIH1cblxuICAgIHJlbW92ZU5ldHdvcmtEZXBlbmRlbnREYXRhID0gKCkgPT4ge1xuICAgICAgICB0aGlzLmFjY291bnQuc3RvcmFnZU1hbmFnZXIucmVtb3ZlTmV0d29ya0RlcGVuZGVudERhdGEoKTtcbiAgICB9XG5cbiAgICBoYW5kbGVKb2luQ2xpY2tlZCA9ICgpID0+IHtcbiAgICAgICAgdmFyIHB1YmxpY0tleUJ1ZmZlciA9IHRoaXMuYWNjb3VudC5nZXRQdWJsaWNLZXlCdWZmZXIoKTtcbiAgICAgICAgdGhpcy5jb250cmFjdE1hbmFnZXIuam9pbkNvbnRyYWN0KHB1YmxpY0tleUJ1ZmZlciwgKHJlc3VsdEV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzdWx0RXZlbnQgPT0gQ29uc3RhbnQuRVZFTlQuT05fUkVKRUNURUQgfHwgcmVzdWx0RXZlbnQgPT0gQ29uc3RhbnQuRVZFTlQuT05fRVJST1IpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtpc0pvaW5CdXR0b25Mb2FkaW5nOiBmYWxzZX0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChyZXN1bHRFdmVudCA9PSBDb25zdGFudC5FVkVOVC5PTl9SRUNFSVBUKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aXNKb2luQnV0dG9uTG9hZGluZzogdHJ1ZX0pO1xuICAgIH1cblxuICAgIGhhbmRsZUltcG9ydFByaXZhdGVLZXlDbGlja2VkID0gKCkgPT4ge1xuICAgICAgICBhcHBEaXNwYXRjaGVyLmRpc3BhdGNoKHtcbiAgICAgICAgICAgIGFjdGlvbjogQ29uc3RhbnQuQUNUSU9OLk9QRU5fUFJJVkFURV9LRVlfTU9EQUxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICB2YXIgYWNjb3VudEluZm8gPSAoPGRpdj48L2Rpdj4pO1xuXG4gICAgICAgIGlmICh0aGlzLmFjY291bnQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlLmlzTG9hZGluZyA9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlLmFkZHJlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFkZHJlc3NFeHBsb3JlclVybCA9IENvbmZpZy5FTlYuRXhwbG9yZXJVcmwgKyAnYWRkcmVzcy8nICsgdGhpcy5zdGF0ZS5hZGRyZXNzO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZHJvcGRvd25UcmlnZ2VyO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlLmF2YXRhclVybCkgeyBcbiAgICAgICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duVHJpZ2dlciA9IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj48SW1hZ2Ugc3JjPXt0aGlzLnN0YXRlLmF2YXRhclVybH0gYXZhdGFyLz57IHRoaXMuc3RhdGUubmFtZSA/IHRoaXMuc3RhdGUubmFtZSA6IHRoaXMuc3RhdGUuYWRkcmVzcy5zdWJzdHIoMCwxMCl9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duVHJpZ2dlciA9IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj48SWNvbiBuYW1lPSd1c2VyJyBzaXplPSdsYXJnZScvPnsgdGhpcy5zdGF0ZS5uYW1lID8gdGhpcy5zdGF0ZS5uYW1lIDogdGhpcy5zdGF0ZS5hZGRyZXNzLnN1YnN0cigwLDEwKX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIG5ldHdvcmtJdGVtcyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpPTA7aTxDb25maWcuTkVUV09SS19MSVNULmxlbmd0aDtpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldHdvcmtJdGVtcy5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxEcm9wZG93bi5JdGVtIGtleT17J25ldHdvcmtJdGVtJyArIGl9IG5ldHdvcmtpZD17Q29uZmlnLk5FVFdPUktfTElTVFtpXS5pZH0gbmFtZT0nY2hhbmdlRXRoTmV0d29yaycgb25DbGljaz17dGhpcy5oYW5kbGVEcm9wZG93bkNsaWNrZWR9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Q29uZmlnLk5FVFdPUktfTElTVFtpXS5uYW1lfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRHJvcGRvd24uSXRlbT5cbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB2YXIgbWVtYmVySW5mbztcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYWNjb3VudC5pc0pvaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWVtYmVySW5mbyA9IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nbG9nT3V0JyBuYW1lPSdsb2dPdXRJdGVtJyBvbkNsaWNrPXt0aGlzLmhhbmRsZURyb3Bkb3duQ2xpY2tlZH0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxJY29uIG5hbWU9J2xvZyBvdXQnLz5Mb2cgb3V0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3R5bGUganN4PntgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmxvZ091dDpob3ZlcntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3Vyc29yOnBvaW50ZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgfTwvc3R5bGU+ICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lbWJlckluZm8gPSAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEJ1dHRvbiBjb2xvcj0nb3JhbmdlJyBvbkNsaWNrPXt0aGlzLmhhbmRsZUpvaW5DbGlja2VkfSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9hZGluZz17dGhpcy5zdGF0ZS5pc0pvaW5CdXR0b25Mb2FkaW5nfSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3RoaXMuc3RhdGUuaXNKb2luQnV0dG9uTG9hZGluZ30+Sm9pbiB7Q29uc3RhbnQuQVBQX05BTUV9PC9CdXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHBlbmRpbmdUeEl0ZW07XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlLm51bVBlbmRpbmdUeCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBlbmRpbmdUeEl0ZW0gPSAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPExhYmVsIGFzPSdhJyBjb2xvcj0neWVsbG93JyBocmVmPXthZGRyZXNzRXhwbG9yZXJVcmx9IHRhcmdldD0nX2JsYW5rJz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEljb24gbmFtZT0nc3Bpbm5lcicgbG9hZGluZy8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLnN0YXRlLm51bVBlbmRpbmdUeH0gcGVuZGluZyB0eFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvTGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgYWNjb3VudEluZm8gPSAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8TWVudS5NZW51IHBvc2l0aW9uPSdyaWdodCAnPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxNZW51Lkl0ZW0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxMaXN0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TGlzdC5JdGVtPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj17YWRkcmVzc0V4cGxvcmVyVXJsfSB0YXJnZXQ9J19ibGFuayc+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMuc3RhdGUuYWRkcmVzc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9MaXN0Lkl0ZW0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxMaXN0Lkl0ZW0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBCYWxhbmNlOiA8TGFiZWwgYXM9J2EnIGhyZWY9e2FkZHJlc3NFeHBsb3JlclVybH0gdGFyZ2V0PSdfYmxhbmsnIGNvbG9yPSdvcmFuZ2UnPntwYXJzZUZsb2F0KHdlYjMudXRpbHMuZnJvbVdlaShcIlwiICt0aGlzLnN0YXRlLmJhbGFuY2UsICdldGhlcicpKS50b0ZpeGVkKDgpICsgJyBFVEgnIH08L0xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3BlbmRpbmdUeEl0ZW19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvTGlzdC5JdGVtPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0xpc3Q+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9NZW51Lkl0ZW0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPE1lbnUuSXRlbT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge21lbWJlckluZm99XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9NZW51Lkl0ZW0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L01lbnUuTWVudT5cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBhY2NvdW50SW5mbyA9IChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxNZW51Lk1lbnUgcG9zaXRpb249J3JpZ2h0Jz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TWVudS5JdGVtPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9e3RoaXMuaGFuZGxlSW1wb3J0UHJpdmF0ZUtleUNsaWNrZWR9IGNvbG9yPSdibHVlJz5JbXBvcnQgcHJpdmF0ZSBrZXk8L0J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L01lbnUuSXRlbT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvTWVudS5NZW51PlxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYWNjb3VudEluZm8gPSAoPExvYWRlciBpbnZlcnRlZCBhY3RpdmUgLz4pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxNZW51IGZpeGVkPSd0b3AnIGNvbG9yPSdibHVlJyBpbnZlcnRlZD5cbiAgICAgICAgICAgICAgICA8SGVhZD5cbiAgICAgICAgICAgICAgICA8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgaHJlZj1cIi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL3NlbWFudGljLXVpLzIuMi4xMi9zZW1hbnRpYy5taW4uY3NzXCI+PC9saW5rPlxuICAgICAgICAgICAgICAgIDwvSGVhZD5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5hY2NvdW50ID8gYWNjb3VudEluZm86ICg8ZGl2PjwvZGl2Pil9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L01lbnU+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBIZWFkZXJNZW51OyJdfQ== */\n/*@ sourceURL=views/HeaderMenu.js */'
                            }));
                        } else {
                            memberInfo = _react2.default.createElement(_semanticUiReact.Button, { color: 'orange', onClick: this.handleJoinClicked,
                                loading: this.state.isJoinButtonLoading,
                                disabled: this.state.isJoinButtonLoading, __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 139
                                }
                            }, 'Join ', _Constant2.default.APP_NAME);
                        }

                        var pendingTxItem;
                        if (this.state.numPendingTx > 0) {
                            pendingTxItem = _react2.default.createElement(_semanticUiReact.Label, { as: 'a', color: 'yellow', href: addressExplorerUrl, target: '_blank', __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 148
                                }
                            }, _react2.default.createElement(_semanticUiReact.Icon, { name: 'spinner', loading: true, __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 149
                                }
                            }), this.state.numPendingTx, ' pending tx');
                        }

                        accountInfo = _react2.default.createElement(_semanticUiReact.Menu.Menu, { position: 'right ', __source: {
                                fileName: _jsxFileName,
                                lineNumber: 156
                            }
                        }, _react2.default.createElement(_semanticUiReact.Menu.Item, {
                            __source: {
                                fileName: _jsxFileName,
                                lineNumber: 157
                            }
                        }, _react2.default.createElement(_semanticUiReact.List, {
                            __source: {
                                fileName: _jsxFileName,
                                lineNumber: 158
                            }
                        }, _react2.default.createElement(_semanticUiReact.List.Item, {
                            __source: {
                                fileName: _jsxFileName,
                                lineNumber: 159
                            }
                        }, _react2.default.createElement('a', { href: addressExplorerUrl, target: '_blank', __source: {
                                fileName: _jsxFileName,
                                lineNumber: 160
                            }
                        }, this.state.address)), _react2.default.createElement(_semanticUiReact.List.Item, {
                            __source: {
                                fileName: _jsxFileName,
                                lineNumber: 164
                            }
                        }, 'Balance: ', _react2.default.createElement(_semanticUiReact.Label, { as: 'a', href: addressExplorerUrl, target: '_blank', color: 'orange', __source: {
                                fileName: _jsxFileName,
                                lineNumber: 165
                            }
                        }, parseFloat(_web2.default.utils.fromWei("" + this.state.balance, 'ether')).toFixed(8) + ' ETH'), pendingTxItem))), _react2.default.createElement(_semanticUiReact.Menu.Item, {
                            __source: {
                                fileName: _jsxFileName,
                                lineNumber: 170
                            }
                        }, memberInfo));
                    } else {
                        accountInfo = _react2.default.createElement(_semanticUiReact.Menu.Menu, { position: 'right', __source: {
                                fileName: _jsxFileName,
                                lineNumber: 177
                            }
                        }, _react2.default.createElement(_semanticUiReact.Menu.Item, {
                            __source: {
                                fileName: _jsxFileName,
                                lineNumber: 178
                            }
                        }, _react2.default.createElement(_semanticUiReact.Button, { onClick: this.handleImportPrivateKeyClicked, color: 'blue', __source: {
                                fileName: _jsxFileName,
                                lineNumber: 179
                            }
                        }, 'Import private key')));
                    }
                } else {
                    accountInfo = _react2.default.createElement(_semanticUiReact.Loader, { inverted: true, active: true, __source: {
                            fileName: _jsxFileName,
                            lineNumber: 185
                        }
                    });
                }
            }

            return _react2.default.createElement(_semanticUiReact.Menu, { fixed: 'top', color: 'blue', inverted: true, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 190
                }
            }, _react2.default.createElement(_head2.default, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 191
                }
            }, _react2.default.createElement('link', { rel: 'stylesheet', href: '//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 192
                }
            })), _react2.default.createElement('div', {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 194
                }
            }, this.account ? accountInfo : _react2.default.createElement('div', {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 195
                }
            })));
        }
    }]);

    return HeaderMenu;
}(_react.Component);

exports.default = HeaderMenu;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZXdzL0hlYWRlck1lbnUuanMiXSwibmFtZXMiOlsiQ29tcG9uZW50IiwiTWVudSIsIkNvbnRhaW5lciIsIkJ1dHRvbiIsIkxhYmVsIiwiTG9hZGVyIiwiTGlzdCIsIkltYWdlIiwiSWNvbiIsIkRyb3Bkb3duIiwiSGVhZCIsIndlYjMiLCJDb25zdGFudCIsIkNvbmZpZyIsImFwcERpc3BhdGNoZXIiLCJIZWFkZXJNZW51IiwicHJvcHMiLCJjbGVhckFsbERhdGEiLCJ3aW5kb3ciLCJsb2NhbFN0b3JhZ2UiLCJjbGVhciIsImdldEFjY291bnRJbmZvIiwiYWRkcmVzcyIsImFjY291bnQiLCJnZXRBZGRyZXNzIiwic2V0U3RhdGUiLCJiYWxhbmNlIiwiaXNMb2FkaW5nIiwiaXNKb2luZWQiLCJyZWxvYWRDb3VudCIsInNldFRpbWVvdXQiLCJoYW5kbGVEcm9wZG93bkNsaWNrZWQiLCJldmVudCIsImRhdGEiLCJsb2NhdGlvbiIsInJlbG9hZCIsInJlbW92ZU5ldHdvcmtEZXBlbmRlbnREYXRhIiwic3RvcmFnZU1hbmFnZXIiLCJoYW5kbGVKb2luQ2xpY2tlZCIsInB1YmxpY0tleUJ1ZmZlciIsImdldFB1YmxpY0tleUJ1ZmZlciIsImNvbnRyYWN0TWFuYWdlciIsImpvaW5Db250cmFjdCIsInJlc3VsdEV2ZW50IiwiRVZFTlQiLCJPTl9SRUpFQ1RFRCIsIk9OX0VSUk9SIiwiaXNKb2luQnV0dG9uTG9hZGluZyIsIk9OX1JFQ0VJUFQiLCJoYW5kbGVJbXBvcnRQcml2YXRlS2V5Q2xpY2tlZCIsImRpc3BhdGNoIiwiYWN0aW9uIiwiQUNUSU9OIiwiT1BFTl9QUklWQVRFX0tFWV9NT0RBTCIsInRyYW5zYWN0aW9uRGlzcGF0Y2hlciIsInN0YXRlIiwibmFtZSIsImF2YXRhclVybCIsIm51bVBlbmRpbmdUeCIsInJlZ2lzdGVyIiwicGF5bG9hZCIsIkFDQ09VTlRfQkFMQU5DRV9VUERBVEVEIiwiQUNDT1VOVF9JTkZPX1VQREFURUQiLCJwcm9maWxlIiwiUEVORElOR19UUkFOU0FDVElPTl9VUERBVEVEIiwiYWNjb3VudEluZm8iLCJhZGRyZXNzRXhwbG9yZXJVcmwiLCJFTlYiLCJFeHBsb3JlclVybCIsImRyb3Bkb3duVHJpZ2dlciIsInN1YnN0ciIsIm5ldHdvcmtJdGVtcyIsImkiLCJORVRXT1JLX0xJU1QiLCJsZW5ndGgiLCJwdXNoIiwiaWQiLCJtZW1iZXJJbmZvIiwiQVBQX05BTUUiLCJwZW5kaW5nVHhJdGVtIiwicGFyc2VGbG9hdCIsInV0aWxzIiwiZnJvbVdlaSIsInRvRml4ZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJQSxBQUNJLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQTs7QUFFSixBQUFPOzs7O0FBQ1AsQUFBTyxBQUFVOzs7O0FBQ2pCLEFBQU8sQUFBYzs7OztBQUNyQixBQUFPLEFBQVk7Ozs7QUFDbkIsQUFBTyxBQUFtQjs7Ozs7OztBQW5CMUI7QUFDQSxBQUVBLEFBQVE7O0lBa0JGLEE7d0NBQ0Y7O3dCQUFBLEFBQVksT0FBTzs0Q0FBQTs7a0pBQUEsQUFDVDs7Y0FEUyxBQVduQixlQUFlLFlBQU0sQUFDakI7bUJBQUEsQUFBTyxhQUFQLEFBQW9CLEFBQ3ZCO0FBYmtCOztjQUFBLEFBaUNuQixpQkFBaUIsWUFBTSxBQUNuQjtnQkFBSSxVQUFVLE1BQUEsQUFBSyxRQUFuQixBQUFjLEFBQWEsQUFDM0I7Z0JBQUEsQUFBSSxTQUFTLEFBQ1Q7c0JBQUEsQUFBSyxTQUFTLEVBQUMsU0FBRCxBQUFVLFNBQVMsU0FBUyxNQUFBLEFBQUssUUFBakMsQUFBeUMsU0FBUyxXQUFsRCxBQUE2RCxPQUFPLFVBQVUsTUFBQSxBQUFLLFFBQWpHLEFBQWMsQUFBMkYsQUFDNUc7QUFGRCxtQkFFTyxBQUNIO29CQUFJLE1BQUEsQUFBSyxlQUFULEFBQXdCLEdBQUcsQUFDdkI7MEJBQUEsQUFBSyxTQUFTLEVBQUMsV0FBZixBQUFjLEFBQVksQUFDN0I7QUFGRCx1QkFFTyxBQUNIOzBC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QURrQjtxQkFBQTtBQUV0QjtBQUVEOzttQ0FDSSxBQUFDLHVDQUFLLE9BQU4sQUFBWSxPQUFNLE9BQWxCLEFBQXdCLFFBQU8sVUFBL0I7OEJBQUE7Z0NBQUEsQUFDSTtBQURKO2FBQUEsa0JBQ0ksQUFBQzs7OEJBQUQ7Z0NBQUEsQUFDQTtBQURBO0FBQUEsdURBQ00sS0FBTixBQUFVLGNBQWEsTUFBdkIsQUFBNEI7OEJBQTVCO2dDQUZKLEFBQ0ksQUFDQSxBQUVBO0FBRkE7aUNBRUEsY0FBQTs7OEJBQUE7Z0NBQUEsQUFDSztBQURMO0FBQUEsb0JBQ0ssQUFBSyxVQUFMLEFBQWU7OzhCQUFjO2dDQU4xQyxBQUNJLEFBSUksQUFDa0MsQUFJN0M7QUFKNkM7QUFBQSxhQUFBOzs7OztBQTdLekIsQSxBQW9MekI7O2tCQUFBLEFBQWUiLCJmaWxlIjoiSGVhZGVyTWVudS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS92aWN0b3JwaGFtMTk5Ny9Xb3JrcGxhY2UvU1VURC81MDAzN19ibG9ja2NoYWluL2Jsb2NrY2hhaW4tcHJvaiJ9