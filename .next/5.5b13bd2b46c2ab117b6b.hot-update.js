webpackHotUpdate(5,{

/***/ 1055:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = __webpack_require__(41);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(15);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(16);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(42);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(46);

var _inherits3 = _interopRequireDefault(_inherits2);

var _style = __webpack_require__(1359);

var _style2 = _interopRequireDefault(_style);

var _react = __webpack_require__(17);

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = __webpack_require__(409);

var _head = __webpack_require__(192);

var _head2 = _interopRequireDefault(_head);

var _web = __webpack_require__(420);

var _web2 = _interopRequireDefault(_web);

var _Constant = __webpack_require__(403);

var _Constant2 = _interopRequireDefault(_Constant);

var _Config = __webpack_require__(423);

var _Config2 = _interopRequireDefault(_Config);

var _AppDispatcher = __webpack_require__(408);

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

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "/home/victorpham1997/Workplace/SUTD/50037_blockchain/blockchain-proj/views/HeaderMenu.js"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/home/victorpham1997/Workplace/SUTD/50037_blockchain/blockchain-proj/views/HeaderMenu.js"); } } })();

/***/ }),

/***/ 1326:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = __webpack_require__(69);

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = __webpack_require__(85);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(86);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = __webpack_require__(41);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(15);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(16);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(42);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(46);

var _inherits3 = _interopRequireDefault(_inherits2);

var _style = __webpack_require__(1359);

var _style2 = _interopRequireDefault(_style);

var _react = __webpack_require__(17);

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = __webpack_require__(409);

var _head = __webpack_require__(192);

var _head2 = _interopRequireDefault(_head);

var _web = __webpack_require__(420);

var _web2 = _interopRequireDefault(_web);

var _Constant = __webpack_require__(403);

var _Constant2 = _interopRequireDefault(_Constant);

var _Config = __webpack_require__(423);

var _Config2 = _interopRequireDefault(_Config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/home/victorpham1997/Workplace/SUTD/50037_blockchain/blockchain-proj/views/Login.js';


var Login = function (_Component) {
  (0, _inherits3.default)(Login, _Component);

  function Login(props) {
    var _this2 = this;

    (0, _classCallCheck3.default)(this, Login);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Login.__proto__ || (0, _getPrototypeOf2.default)(Login)).call(this, props));

    _this.handleBack = function () {
      _this.setState({ walletAddress: "", errorMessage: "", transitionMessage: "" });
    };

    _this.handleJoin = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var x, publicKeyBuffer;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _this.account.storePrivateKey(_this.state.privateKey);

            case 2:
              _context.next = 4;
              return _this.contractManager.getContract();

            case 4:
              _context.next = 6;
              return _this.contractManager.getJoinedAddress();

            case 6:
              x = _context.sent;

              if (!(x == 0)) {
                _context.next = 15;
                break;
              }

              console.log("Joining the network");
              _this.setState({ transitionMessage: "Joining..." });
              publicKeyBuffer = _this.account.getPublicKeyBuffer();
              // await this.contractManager.checkAcc('0x'+this.state.walletAddress);

              _context.next = 13;
              return _this.contractManager.joinContract(publicKeyBuffer, function (resultEvent) {
                if (resultEvent == _Constant2.default.EVENT.ON_REJECTED || resultEvent == _Constant2.default.EVENT.ON_ERROR) {
                  _this.setState({ transitionMessage: "", errorMessage: "Something went wrong, refreshing in 3 seconds..." });
                } else if (resultEvent == _Constant2.default.EVENT.ON_RECEIPT) {
                  _this.setState({ transitionMessage: "Success!" });
                  // this.storageManager.reload = 1;
                  // console.log(this.storageManager.reload);
                  window.location.reload();
                  // this.setState({transitionMessage: "Success! Click here to enter if not directed automatically."});
                }
              });

            case 13:
              _context.next = 17;
              break;

            case 15:
              // this.setState({transitionMessage: "Success! Click here to enter if not directed automatically."});
              console.log("existing");
              window.location.reload();

            case 17:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this2);
    }));

    _this.nextClicked = function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(e) {
        var walletAddress;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                e.preventDefault();
                // console.log(this.state.privateKey)
                _context2.next = 3;
                return _this.account.checkPrivateKey(_this.state.privateKey);

              case 3:
                walletAddress = _context2.sent;

                if (walletAddress) {
                  console.log("sucess", walletAddress);
                  _this.setState({ errorMessage: "" });
                  _this.setState({ walletAddress: walletAddress });
                } else {
                  // console.log("GUUSL");
                  _this.setState({ errorMessage: "Private Key is invalid" });
                  // this.setState({errorMessage: "Invalid private key"});
                }

              case 5:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this2);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }();

    _this.account = props.account;
    _this.contractManager = props.contractManager;
    _this.storageManager = props.storageManager;
    _this.state = { privateKey: "", errorMessage: "", transitionMessage: "", walletAddress: "" };
    console.log(_this.storageManager.reload);

    return _this;
  }

  (0, _createClass3.default)(Login, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // await this.sleep(2000);
      // console.log(this.state);
      // if(window.localStorage.getItem("reload")> 0){
      // }
      console.log(window.localStorage.getItem("reload"));
    }
  }, {
    key: 'sleep',
    value: function sleep(ms) {
      return new _promise2.default(function (resolve) {
        return setTimeout(resolve, ms);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement('div', {
        className: 'jsx-1019354034' + ' ' + 'landingPage',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 93
        }
      }, _react2.default.createElement(_head2.default, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 94
        }
      }, _react2.default.createElement('link', { rel: 'stylesheet', href: '//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css', className: 'jsx-1019354034',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 95
        }
      })), _react2.default.createElement('h1', {
        className: 'jsx-1019354034' + ' ' + 'title',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 97
        }
      }, 'Welcome to Block-Forever!'), _react2.default.createElement('p', {
        className: 'jsx-1019354034' + ' ' + 'description',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 101
        }
      }, 'Send a private message to your friend that will never be lost'), _react2.default.createElement('div', {
        className: 'jsx-1019354034' + ' ' + 'loginBox',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 105
        }
      }, _react2.default.createElement('div', {
        className: 'jsx-1019354034' + ' ' + 'loginTitle',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 106
        }
      }, ' Sign in to Block-Forever'), _react2.default.createElement('div', {
        className: 'jsx-1019354034' + ' ' + 'loginForm',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 107
        }
      }, _react2.default.createElement('form', { hidden: this.state.walletAddress != "", onSubmit: function onSubmit(e) {
          return _this3.nextClicked(e);
        }, className: 'jsx-1019354034' + ' ' + 'loginForm',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 108
        }
      }, _react2.default.createElement('label', { htmlFor: 'priKey', className: 'jsx-1019354034' + ' ' + 'loginFields',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 109
        }
      }, 'Enter Private Key:'), _react2.default.createElement('input', { value: this.state.privateKey, type: 'text', onChange: function onChange(e) {
          return _this3.setState({ privateKey: e.target.value });
        }, required: true, className: 'jsx-1019354034' + ' ' + 'loginFields privateKey',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 110
        }
      }), _react2.default.createElement('button', { type: 'submit', className: 'jsx-1019354034' + ' ' + 'loginFields submitButton',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 111
        }
      }, 'Login')), _react2.default.createElement(_semanticUiReact.Message, { error: true, header: this.state.errorMessage, hidden: this.state.errorMessage == "", __source: {
          fileName: _jsxFileName,
          lineNumber: 118
        }
      }), _react2.default.createElement(_semanticUiReact.Message, { text: true, positive: true, hidden: this.state.walletAddress == "", __source: {
          fileName: _jsxFileName,
          lineNumber: 120
        }
      }, _react2.default.createElement(_semanticUiReact.Message.Header, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 121
        }
      }, 'Join Ethereum Messenger as ', _react2.default.createElement('br', {
        className: 'jsx-1019354034',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 122
        }
      }), _react2.default.createElement(_semanticUiReact.Container, { fluid: true, textAlign: 'center', style: { marginTop: "1vw" }, __source: {
          fileName: _jsxFileName,
          lineNumber: 123
        }
      }, _react2.default.createElement('b', { style: { fontSize: "2vw" }, className: 'jsx-1019354034',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 124
        }
      }, '0x', this.state.walletAddress), _react2.default.createElement('br', {
        className: 'jsx-1019354034',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 124
        }
      }), _react2.default.createElement(_semanticUiReact.Button, { onClick: this.handleBack, color: 'blue', style: { marginTop: "1vw" }, __source: {
          fileName: _jsxFileName,
          lineNumber: 125
        }
      }, 'Back'), _react2.default.createElement(_semanticUiReact.Button, { onClick: this.handleJoin, color: 'orange', style: { marginLeft: "0.5vw" }, __source: {
          fileName: _jsxFileName,
          lineNumber: 126
        }
      }, 'Join')))), _react2.default.createElement(_semanticUiReact.Container, { textAlign: 'center', __source: {
          fileName: _jsxFileName,
          lineNumber: 130
        }
      }, _react2.default.createElement(_semanticUiReact.Message, { compact: true, positive: true, hidden: this.state.transitionMessage != "Joining...", __source: {
          fileName: _jsxFileName,
          lineNumber: 131
        }
      }, _react2.default.createElement(_semanticUiReact.Icon, { size: 'big', name: 'circle notched', loading: true, __source: {
          fileName: _jsxFileName,
          lineNumber: 132
        }
      }), _react2.default.createElement('b', { style: { fontSize: "2.5vw" }, className: 'jsx-1019354034',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 133
        }
      }, this.state.transitionMessage), _react2.default.createElement('p', { style: { fontSize: "1vw" }, className: 'jsx-1019354034',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 134
        }
      }, 'Please manually refresh page if unable to logging in during first time')), _react2.default.createElement(_semanticUiReact.Message, { compact: true, positive: true, hidden: this.state.transitionMessage != "Success!", __source: {
          fileName: _jsxFileName,
          lineNumber: 137
        }
      }, _react2.default.createElement(_semanticUiReact.Icon, { size: 'big', name: 'check', __source: {
          fileName: _jsxFileName,
          lineNumber: 138
        }
      }), _react2.default.createElement('b', { style: { fontSize: "2.5vw" }, className: 'jsx-1019354034',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 139
        }
      }, this.state.transitionMessage), _react2.default.createElement('p', { style: { fontSize: "1vw" }, className: 'jsx-1019354034',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 140
        }
      }, 'Please manually refresh page if unable to logging in during first time'))))), _react2.default.createElement(_style2.default, {
        styleId: '3777595568',
        css: '.header.jsx-1019354034{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;background-color:#0070f3;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;}.contactListHeader.jsx-1019354034{font-weight:500;}.contactImg.jsx-1019354034{width:10%;height:auto;-webkit-transition:filter 0.15s ease;transition:filter 0.15s ease;}.contactName.jsx-1019354034{font-size:0.8rem;margin-left:0.2rem;-webkit-transition:color 0.15s ease;transition:color 0.15s ease;}.contactBox.jsx-1019354034{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;overflow:scroll;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;margin-top:0.5rem;border:2px transparent solid;border-radius:10px;padding:0.5rem;-webkit-transition:border-color 0.15s ease,background-color 0.15s ease;transition:border-color 0.15s ease,background-color 0.15s ease;}.contactBox.jsx-1019354034:hover,.contactBox.jsx-1019354034:focus,.contactBox.jsx-1019354034:active{border-color:#0070f3;}.contactAdd.jsx-1019354034{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;margin-top:1rem;margin-bottom:0.5rem;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;}.publicKey.jsx-1019354034{width:60%;}.body.jsx-1019354034{display:grid;margin-top:1rem;grid-template-columns:1fr 3fr;grid-template-areas:"contactList messageBody";gap:15px;padding:0 1rem;}.bodyCols.jsx-1019354034{border:1px solid #eaeaea;border-radius:10px;padding:0.5rem;}.messageRows.jsx-1019354034{border:1px solid #eaeaea;border-radius:10px;padding:0.5rem;}.contactList.jsx-1019354034{grid-area:contactList;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;}.messageBody.jsx-1019354034{grid-area:messageBody;display:grid;grid-template-rows:3fr 1fr;grid-template-areas:"conversation" "message";gap:15px;}.conversation.jsx-1019354034{grid-area:conversation;}.message.jsx-1019354034{max-height:10vh;grid-area:message;display:grid;grid-template-columns:7fr 1fr;gap:15px;}.headerItems.jsx-1019354034{margin:1rem;color:white;padding:0.5rem;}.balance.jsx-1019354034{background:orange;border-radius:10px;}.container.jsx-1019354034{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;}.loginBox.jsx-1019354034{width:60%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;padding:2.5rem 0.5rem;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;border:1px solid #eaeaea;border-radius:10px;-webkit-transition:color 0.15s ease,border-color 0.15s ease;transition:color 0.15s ease,border-color 0.15s ease;}.loginForm.jsx-1019354034{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;padding:0.5rem 1.8rem;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;width:100%;}.loginFields.jsx-1019354034{margin-top:0.5rem;}.privateKey.jsx-1019354034{padding:0.5rem 0.5rem;width:100%;}.submitButton.jsx-1019354034{background-color:transparent;width:40%;-webkit-align-self:center;-ms-flex-item-align:center;align-self:center;padding:0.5rem 0.5rem;border-radius:10px;font-weight:700;-webkit-transition:color 0.15s ease,border-color 0.15s ease;transition:color 0.15s ease,border-color 0.15s ease;}.submitButton.jsx-1019354034:hover,.submitButton.jsx-1019354034:focus,.submitButton.jsx-1019354034:active{border-color:transparent;color:#fff;background-color:#0070f3;}.addButton.jsx-1019354034{background-color:transparent;-webkit-align-self:center;-ms-flex-item-align:center;align-self:center;padding:0.5rem 0.5rem;border-radius:10px;font-weight:700;-webkit-transition:color 0.15s ease,border-color 0.15s ease;transition:color 0.15s ease,border-color 0.15s ease;}.addButton.jsx-1019354034:hover,.addButton.jsx-1019354034:focus,.addButton.jsx-1019354034:active{border-color:transparent;color:#fff;background-color:#0070f3;}.sendButton.jsx-1019354034{background-color:transparent;-webkit-align-self:center;-ms-flex-item-align:center;align-self:center;padding:0.5rem 0.5rem;border-radius:10px;font-weight:700;-webkit-transition:color 0.15s ease,border-color 0.15s ease;transition:color 0.15s ease,border-color 0.15s ease;}.sendButton.jsx-1019354034:hover,.sendButton.jsx-1019354034:focus,.sendButton.jsx-1019354034:active{border-color:transparent;color:#fff;background-color:#0070f3;}.landingPage.jsx-1019354034{padding:5rem 0;-webkit-flex:1;-ms-flex:1;flex:1;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;}footer.jsx-1019354034{width:100%;height:100px;border-top:1px solid #eaeaea;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;}footer.jsx-1019354034 img.jsx-1019354034{margin-left:0.5rem;}footer.jsx-1019354034 a.jsx-1019354034{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;}a.jsx-1019354034{color:inherit;text-decoration:none;}.title.jsx-1019354034 a.jsx-1019354034{color:#0070f3;text-decoration:none;}.title.jsx-1019354034 a.jsx-1019354034:hover,.title.jsx-1019354034 a.jsx-1019354034:focus,.title.jsx-1019354034 a.jsx-1019354034:active{text-decoration:underline;}.title.jsx-1019354034{margin:0;line-height:1.15;font-size:3rem;font-family:"Helvetica Neue";}.loginTitle.jsx-1019354034{margin:0;line-height:1.15;font-size:2rem;font-weight:700;color:#0070f3;}.title.jsx-1019354034,.description.jsx-1019354034{text-align:center;}.description.jsx-1019354034{line-height:1.5;font-size:1.5rem;}.loginBox.jsx-1019354034:hover,.loginBox.jsx-1019354034:focus,.loginBox.jsx-1019354034:active{border-color:#0070f3;}.card.jsx-1019354034 h3.jsx-1019354034{margin:0 0 1rem 0;font-size:1.5rem;}.card.jsx-1019354034 p.jsx-1019354034{margin:0;font-size:1.25rem;line-height:1.5;}.logo.jsx-1019354034{height:1em;}@media (max-width:600px){.grid.jsx-1019354034{width:100%;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;}}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZXdzL0xvZ2luLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXNKZ0IsQUFHd0IsQUFPRyxBQUlOLEFBTU8sQUFNSixBQWFRLEFBS1IsQUFRaEIsQUFHZ0IsQUFTWSxBQU1BLEFBTUgsQUFNQSxBQVFDLEFBSVAsQUFRSixBQU1NLEFBS0wsQUFPSCxBQVlHLEFBU2hCLEFBR3lCLEFBS08sQUFZSixBQU1JLEFBV0osQUFNSSxBQVdKLEFBTVYsQUFRSixBQVNRLEFBSU4sQUFNQyxBQUtBLEFBT1ksQUFJakIsQUFNQSxBQVNTLEFBSUYsQUFRSyxBQUlILEFBS1QsQUFNRSxBQUtFLFNBOUNJLEFBTUEsQUE4QkMsQ0ExUU4sQUFxQ2QsQUFxRWUsQ0F5RkEsQUE2RWYsQUFLMEIsQ0E3TFosQ0EvQ0ksQ0E2S0ssQUFLQSxDQWhDZCxDQS9MVCxBQW9Gb0IsQUF5S0QsQ0FuUEUsQ0F5RnRCLEFBK0JDLEFBdUhBLEFBZ0JtQixDQXpEbkIsRUFsTEEsQUF1T0EsQ0EvUEQsQUE0RGdCLEFBTUEsQUErRGhCLENBdkRDLENBYWlCLEFBMkdjLENBbEpWLEFBTUEsQUEyRlAsQUFpQkEsQUFpQkEsQ0E2Q2QsQUFLaUIsQUFNQSxDQThCQyxFQWpPYyxBQTZGcEIsQUFrQlEsQUFpQkEsSUF2Q3BCLEFBdUhBLENBektlLENBWmMsQUFrSjdCLEFBS0EsQUEwQ0EsQ0E5UEQsQUE0STRCLEFBaUJBLEFBaUJBLENBdkYzQixFQUxBLEFBOENvQixFQWlHckIsQUFLbUIsRUE4QmxCLENBek5pQixBQU1BLEdBeUJlLENBMEdqQixLQVNBLElBMENDLEVBcE1nQyxBQVNoRCxBQU1BLEVBMkZBLEFBaUJBLEFBaUJBLENBakgrQyxRQW1LL0MsQ0FPQSxHQTNQcUIsQUF1QkgsQUFrQkEsQUFxRU0sQUFtQkEsQUEwRkMsR0E3SGQsT0F3QmEsRUF2QnhCLEVBbEZBLENBb1JFLENBelFtQixBQWtCRSxNQWdDQyxJQXZEeEIsQUFrSndCLEFBaUJBLEtBL0hiLEVBMkJBLEdBa0VhLENBekdRLEdBYWYsRUEyQmpCLE1BbUZxQixBQWlCQSxBQWlCRyxLQVNDLEVBeEp6QixHQTRGcUIsU0FrQkgsQUFpQkEsRUF2TFMsUUFxSlQsQ0F2Q08sQUFtQkQsS0FzQytCLEFBaUJBLEtBbEUvQixLQWdDK0IsQ0FySjlCLEtBME5KLENBakpyQixBQXdEcUIsU0ExR0QsQ0ErRkssZ0JBaUZKLENBL0tVLHlCQWtCL0IsQUFzS3FCLElBdkxBLG1CQUNKLEVBcUZqQixhQXBGa0UsRUFnTWxFLENBMU5BLEFBa0lELEVBb0NDLEFBaUJBLFNBckRBLENBbUJBLElBL0JxQixVQWlGckIsMEJBU0EseURBekYyQixzQkE1RjNCLEdBNkZxQixtQkFDa0MsZ0hBQ3ZEIiwiZmlsZSI6InZpZXdzL0xvZ2luLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL3ZpY3RvcnBoYW0xOTk3L1dvcmtwbGFjZS9TVVRELzUwMDM3X2Jsb2NrY2hhaW4vYmxvY2tjaGFpbi1wcm9qIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7XG4gICAgSW5wdXQsXG4gICAgTWVzc2FnZSxcbiAgICBDb250YWluZXIsXG4gICAgQnV0dG9uLFxuICAgIEhlYWRlcixcbiAgICBJY29uXG59IGZyb20gJ3NlbWFudGljLXVpLXJlYWN0JztcbmltcG9ydCBIZWFkIGZyb20gJ25leHQvaGVhZCc7XG5pbXBvcnQgd2ViMyBmcm9tICcuLi9ldGhlcmV1bS93ZWIzJztcbmltcG9ydCBDb25zdGFudCBmcm9tICcuLi9zdXBwb3J0L0NvbnN0YW50JztcbmltcG9ydCBDb25maWcgZnJvbSAnLi4vc3VwcG9ydC9Db25maWcnO1xuXG5jbGFzcyBMb2dpbiBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLmFjY291bnQgPSBwcm9wcy5hY2NvdW50O1xuICAgICAgICB0aGlzLmNvbnRyYWN0TWFuYWdlciA9IHByb3BzLmNvbnRyYWN0TWFuYWdlcjtcbiAgICAgICAgdGhpcy5zdG9yYWdlTWFuYWdlciA9IHByb3BzLnN0b3JhZ2VNYW5hZ2VyO1xuICAgICAgICB0aGlzLnN0YXRlID0ge3ByaXZhdGVLZXk6IFwiXCIsIGVycm9yTWVzc2FnZTpcIlwiLCB0cmFuc2l0aW9uTWVzc2FnZTpcIlwiLCB3YWxsZXRBZGRyZXNzOiBcIlwifTtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5zdG9yYWdlTWFuYWdlci5yZWxvYWQpO1xuICAgICAgICBcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgLy8gYXdhaXQgdGhpcy5zbGVlcCgyMDAwKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5zdGF0ZSk7XG4gICAgICAgIC8vIGlmKHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInJlbG9hZFwiKT4gMCl7XG4gICAgICAgIC8vIH1cbiAgICAgICAgY29uc29sZS5sb2cod2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwicmVsb2FkXCIpKVxuICAgICAgICBcblxuICAgIH1cblxuICAgIGhhbmRsZUJhY2sgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3dhbGxldEFkZHJlc3MgOiBcIlwiLCBlcnJvck1lc3NhZ2U6IFwiXCIsIHRyYW5zaXRpb25NZXNzYWdlOiBcIlwifSk7XG4gICAgfVxuXG4gICAgc2xlZXAobXMpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4gc2V0VGltZW91dChyZXNvbHZlLCBtcykpO1xuICAgIH1cblxuICAgIGhhbmRsZUpvaW4gPSBhc3luYyAoKSA9PntcbiAgICAgICAgYXdhaXQgdGhpcy5hY2NvdW50LnN0b3JlUHJpdmF0ZUtleSh0aGlzLnN0YXRlLnByaXZhdGVLZXkpO1xuICAgICAgICBhd2FpdCB0aGlzLmNvbnRyYWN0TWFuYWdlci5nZXRDb250cmFjdCgpO1xuICAgICAgICB2YXIgeCA9IGF3YWl0IHRoaXMuY29udHJhY3RNYW5hZ2VyLmdldEpvaW5lZEFkZHJlc3MoKTtcbiAgICAgICAgaWYgKHg9PTApe1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJKb2luaW5nIHRoZSBuZXR3b3JrXCIpO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dHJhbnNpdGlvbk1lc3NhZ2U6IFwiSm9pbmluZy4uLlwifSlcbiAgICAgICAgICAgIHZhciBwdWJsaWNLZXlCdWZmZXIgPSB0aGlzLmFjY291bnQuZ2V0UHVibGljS2V5QnVmZmVyKCk7XG4gICAgICAgICAgICAvLyBhd2FpdCB0aGlzLmNvbnRyYWN0TWFuYWdlci5jaGVja0FjYygnMHgnK3RoaXMuc3RhdGUud2FsbGV0QWRkcmVzcyk7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmNvbnRyYWN0TWFuYWdlci5qb2luQ29udHJhY3QocHVibGljS2V5QnVmZmVyLCAgIChyZXN1bHRFdmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHRFdmVudCA9PSBDb25zdGFudC5FVkVOVC5PTl9SRUpFQ1RFRCB8fCByZXN1bHRFdmVudCA9PSBDb25zdGFudC5FVkVOVC5PTl9FUlJPUikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt0cmFuc2l0aW9uTWVzc2FnZTogXCJcIiwgZXJyb3JNZXNzYWdlOiBcIlNvbWV0aGluZyB3ZW50IHdyb25nLCByZWZyZXNoaW5nIGluIDMgc2Vjb25kcy4uLlwifSlcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXN1bHRFdmVudCA9PSBDb25zdGFudC5FVkVOVC5PTl9SRUNFSVBUKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3RyYW5zaXRpb25NZXNzYWdlOiBcIlN1Y2Nlc3MhXCJ9KVxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnN0b3JhZ2VNYW5hZ2VyLnJlbG9hZCA9IDE7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuc3RvcmFnZU1hbmFnZXIucmVsb2FkKTtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnNldFN0YXRlKHt0cmFuc2l0aW9uTWVzc2FnZTogXCJTdWNjZXNzISBDbGljayBoZXJlIHRvIGVudGVyIGlmIG5vdCBkaXJlY3RlZCBhdXRvbWF0aWNhbGx5LlwifSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgLy8gdGhpcy5zZXRTdGF0ZSh7dHJhbnNpdGlvbk1lc3NhZ2U6IFwiU3VjY2VzcyEgQ2xpY2sgaGVyZSB0byBlbnRlciBpZiBub3QgZGlyZWN0ZWQgYXV0b21hdGljYWxseS5cIn0pO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJleGlzdGluZ1wiKTtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgXG4gICAgfVxuXG5cbiAgICBuZXh0Q2xpY2tlZCA9IGFzeW5jIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5zdGF0ZS5wcml2YXRlS2V5KVxuICAgICAgICB2YXIgd2FsbGV0QWRkcmVzcyA9IGF3YWl0IHRoaXMuYWNjb3VudC5jaGVja1ByaXZhdGVLZXkodGhpcy5zdGF0ZS5wcml2YXRlS2V5KTtcbiAgICAgICAgaWYgKHdhbGxldEFkZHJlc3MpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic3VjZXNzXCIsIHdhbGxldEFkZHJlc3MpO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZXJyb3JNZXNzYWdlIDogXCJcIn0pO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7d2FsbGV0QWRkcmVzcyA6IHdhbGxldEFkZHJlc3N9KTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJHVVVTTFwiKTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2Vycm9yTWVzc2FnZSA6IFwiUHJpdmF0ZSBLZXkgaXMgaW52YWxpZFwifSk7XG4gICAgICAgICAgICAvLyB0aGlzLnNldFN0YXRlKHtlcnJvck1lc3NhZ2U6IFwiSW52YWxpZCBwcml2YXRlIGtleVwifSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nbGFuZGluZ1BhZ2UnID5cbiAgICAgICAgICAgIDxIZWFkPlxuICAgICAgICAgICAgICAgIDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiBocmVmPVwiLy9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvc2VtYW50aWMtdWkvMi4yLjEyL3NlbWFudGljLm1pbi5jc3NcIj48L2xpbms+XG4gICAgICAgICAgICA8L0hlYWQ+XG4gICAgICAgICAgICAgICAgPGgxIGNsYXNzTmFtZT1cInRpdGxlXCI+XG4gICAgICAgICAgICAgICAgV2VsY29tZSB0byBCbG9jay1Gb3JldmVyISBcbiAgICAgICAgICAgICAgICA8L2gxPlxuXG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZGVzY3JpcHRpb25cIj5cbiAgICAgICAgICAgICAgICBTZW5kIGEgcHJpdmF0ZSBtZXNzYWdlIHRvIHlvdXIgZnJpZW5kIHRoYXQgd2lsbCBuZXZlciBiZSBsb3N0XG4gICAgICAgICAgICAgICAgPC9wPlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2xvZ2luQm94Jz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nbG9naW5UaXRsZSc+IFNpZ24gaW4gdG8gQmxvY2stRm9yZXZlcjwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdsb2dpbkZvcm0nID4gXG4gICAgICAgICAgICAgICAgPGZvcm0gaGlkZGVuPXt0aGlzLnN0YXRlLndhbGxldEFkZHJlc3MgIT0gXCJcIn0gY2xhc3NOYW1lPSdsb2dpbkZvcm0nIG9uU3VibWl0PXsoZSk9PnRoaXMubmV4dENsaWNrZWQoZSl9PiBcbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT0nbG9naW5GaWVsZHMnIGh0bWxGb3I9XCJwcmlLZXlcIj5FbnRlciBQcml2YXRlIEtleTo8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdmFsdWU9e3RoaXMuc3RhdGUucHJpdmF0ZUtleX0gY2xhc3NOYW1lPSdsb2dpbkZpZWxkcyBwcml2YXRlS2V5JyB0eXBlPVwidGV4dFwiIG9uQ2hhbmdlPXsoZSkgPT4gdGhpcy5zZXRTdGF0ZSh7cHJpdmF0ZUtleTogZS50YXJnZXQudmFsdWV9KX0gIHJlcXVpcmVkIC8+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPSdsb2dpbkZpZWxkcyBzdWJtaXRCdXR0b24nIHR5cGU9XCJzdWJtaXRcIj5Mb2dpbjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsvKiA8SW5wdXQgZmx1aWQgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUucHJpdmF0ZUtleX0gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB0aGlzLnNldFN0YXRlKHtwcml2YXRlS2V5OiBlLnRhcmdldC52YWx1ZX0pfSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb249e3sgY29sb3I6ICdibHVlJywgbGFiZWxQb3NpdGlvbjogJ3JpZ2h0JywgaWNvbjogJ2FuZ2xlIHJpZ2h0JywgY29udGVudDogJ05leHQnLCBvbkNsaWNrOiAoZSk9PnRoaXMubmV4dENsaWNrZWQoZSl9fS8+ICovfVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgPE1lc3NhZ2UgZXJyb3IgaGVhZGVyPXt0aGlzLnN0YXRlLmVycm9yTWVzc2FnZX0gaGlkZGVuPXt0aGlzLnN0YXRlLmVycm9yTWVzc2FnZSA9PSBcIlwifS8+XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICA8TWVzc2FnZSB0ZXh0IHBvc2l0aXZlIGhpZGRlbj17dGhpcy5zdGF0ZS53YWxsZXRBZGRyZXNzID09IFwiXCJ9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPE1lc3NhZ2UuSGVhZGVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpvaW4gRXRoZXJldW0gTWVzc2VuZ2VyIGFzIDxici8+IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxDb250YWluZXIgZmx1aWQgdGV4dEFsaWduPSdjZW50ZXInIHN0eWxlPXt7IG1hcmdpblRvcDogXCIxdndcIn19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YiBzdHlsZT17e2ZvbnRTaXplOiBcIjJ2d1wifX0+MHh7dGhpcy5zdGF0ZS53YWxsZXRBZGRyZXNzfTwvYj48YnIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQmFja30gY29sb3IgPSAnYmx1ZScgIHN0eWxlPXt7IG1hcmdpblRvcDogXCIxdndcIn19ID5CYWNrPC9CdXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxCdXR0b24gb25DbGljaz17dGhpcy5oYW5kbGVKb2lufSBjb2xvciA9ICdvcmFuZ2UnIHN0eWxlPXt7IG1hcmdpbkxlZnQ6IFwiMC41dndcIn19PkpvaW48L0J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvTWVzc2FnZS5IZWFkZXI+XG4gICAgICAgICAgICAgICAgICAgIDwvTWVzc2FnZT5cbiAgICAgICAgICAgICAgICAgICAgPENvbnRhaW5lciB0ZXh0QWxpZ249XCJjZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPE1lc3NhZ2UgIGNvbXBhY3QgcG9zaXRpdmUgaGlkZGVuPXt0aGlzLnN0YXRlLnRyYW5zaXRpb25NZXNzYWdlICE9IFwiSm9pbmluZy4uLlwifT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8SWNvbiBzaXplPSdiaWcnIG5hbWU9J2NpcmNsZSBub3RjaGVkJyBsb2FkaW5nIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGIgc3R5bGU9e3tmb250U2l6ZTogXCIyLjV2d1wifX0+e3RoaXMuc3RhdGUudHJhbnNpdGlvbk1lc3NhZ2V9PC9iPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIHN0eWxlPXt7Zm9udFNpemU6IFwiMXZ3XCJ9fT5QbGVhc2UgbWFudWFsbHkgcmVmcmVzaCBwYWdlIGlmIHVuYWJsZSB0byBsb2dnaW5nIGluIGR1cmluZyBmaXJzdCB0aW1lPC9wPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8L01lc3NhZ2U+XG4gICAgICAgICAgICAgICAgICAgICAgICA8TWVzc2FnZSAgY29tcGFjdCBwb3NpdGl2ZSBoaWRkZW49e3RoaXMuc3RhdGUudHJhbnNpdGlvbk1lc3NhZ2UgIT0gXCJTdWNjZXNzIVwifT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8SWNvbiBzaXplPSdiaWcnIG5hbWU9J2NoZWNrJyAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxiIHN0eWxlPXt7Zm9udFNpemU6IFwiMi41dndcIn19Pnt0aGlzLnN0YXRlLnRyYW5zaXRpb25NZXNzYWdlfTwvYj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBzdHlsZT17e2ZvbnRTaXplOiBcIjF2d1wifX0+UGxlYXNlIG1hbnVhbGx5IHJlZnJlc2ggcGFnZSBpZiB1bmFibGUgdG8gbG9nZ2luZyBpbiBkdXJpbmcgZmlyc3QgdGltZTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvTWVzc2FnZT5cbiAgICAgICAgICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgICAgIDwvQ29udGFpbmVyPlxuXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIFxuICAgIDxzdHlsZSBqc3g+e2BcbiAgICAgICAgLmhlYWRlcntcbiAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzAwNzBmMztcbiAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIC5jb250YWN0TGlzdEhlYWRlcntcbiAgICAgICAgICBmb250LXdlaWdodDogNTAwO1xuICAgICAgICB9XG5cbiAgICAgICAgLmNvbnRhY3RJbWd7XG4gICAgICAgICAgd2lkdGg6IDEwJTtcbiAgICAgICAgICBoZWlnaHQ6IGF1dG87XG4gICAgICAgICAgdHJhbnNpdGlvbjogZmlsdGVyIDAuMTVzIGVhc2VcbiAgICAgICAgfVxuXG4gICAgICAgIC5jb250YWN0TmFtZXtcbiAgICAgICAgICBmb250LXNpemU6IDAuOHJlbTtcbiAgICAgICAgICBtYXJnaW4tbGVmdDogMC4ycmVtO1xuICAgICAgICAgIHRyYW5zaXRpb246IGNvbG9yIDAuMTVzIGVhc2VcbiAgICAgICAgfVxuXG4gICAgICAgIC5jb250YWN0Qm94e1xuICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgb3ZlcmZsb3c6IHNjcm9sbDtcbiAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICAgIG1hcmdpbi10b3A6IDAuNXJlbTtcbiAgICAgICAgICBib3JkZXI6IDJweCB0cmFuc3BhcmVudCBzb2xpZDtcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICAgICAgICAgIHBhZGRpbmc6IDAuNXJlbTtcbiAgICAgICAgICB0cmFuc2l0aW9uOiBib3JkZXItY29sb3IgMC4xNXMgZWFzZSwgYmFja2dyb3VuZC1jb2xvciAwLjE1cyBlYXNlO1xuICAgICAgICB9XG5cbiAgICAgICAgLmNvbnRhY3RCb3ggOmhvdmVyLFxuICAgICAgICAuY29udGFjdEJveCA6Zm9jdXMsXG4gICAgICAgIC5jb250YWN0Qm94IDphY3RpdmUge1xuICAgICAgICAgIGJvcmRlci1jb2xvcjogIzAwNzBmMztcbiAgICAgICAgICBcbiAgICAgICAgfVxuXG4gICAgICAgIC5jb250YWN0QWRke1xuICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgbWFyZ2luLXRvcDogMXJlbTtcbiAgICAgICAgICBtYXJnaW4tYm90dG9tOiAwLjVyZW07XG4gICAgICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgICAgICB9XG5cbiAgICAgICAgLnB1YmxpY0tleXtcbiAgICAgICAgICB3aWR0aDogNjAlXG4gICAgICAgIH1cblxuICAgICAgICAuYm9keXtcbiAgICAgICAgICBkaXNwbGF5OiBncmlkO1xuICAgICAgICAgIG1hcmdpbi10b3A6IDFyZW07XG4gICAgICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgM2ZyO1xuICAgICAgICAgIGdyaWQtdGVtcGxhdGUtYXJlYXM6IFwiY29udGFjdExpc3QgbWVzc2FnZUJvZHlcIjtcbiAgICAgICAgICBnYXA6IDE1cHg7XG4gICAgICAgICAgcGFkZGluZzogMCAxcmVtO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAuYm9keUNvbHN7XG4gICAgICAgICAgYm9yZGVyOiAxcHggc29saWQgI2VhZWFlYTtcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICAgICAgICAgIHBhZGRpbmc6IDAuNXJlbTtcbiAgICAgICAgfVxuXG4gICAgICAgIC5tZXNzYWdlUm93c3tcbiAgICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjZWFlYWVhO1xuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gICAgICAgICAgcGFkZGluZzogMC41cmVtO1xuICAgICAgICB9XG5cbiAgICAgICAgLmNvbnRhY3RMaXN0e1xuICAgICAgICAgIGdyaWQtYXJlYTogY29udGFjdExpc3Q7XG4gICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICB9XG5cbiAgICAgICAgLm1lc3NhZ2VCb2R5e1xuICAgICAgICAgIGdyaWQtYXJlYTogbWVzc2FnZUJvZHk7XG4gICAgICAgICAgZGlzcGxheTogZ3JpZDtcbiAgICAgICAgICBncmlkLXRlbXBsYXRlLXJvd3M6IDNmciAxZnI7XG4gICAgICAgICAgZ3JpZC10ZW1wbGF0ZS1hcmVhczogXCJjb252ZXJzYXRpb25cIiBcIm1lc3NhZ2VcIjtcbiAgICAgICAgICBnYXA6IDE1cHg7XG4gICAgICAgIH1cblxuICAgICAgICAuY29udmVyc2F0aW9ue1xuICAgICAgICAgIGdyaWQtYXJlYTogY29udmVyc2F0aW9uO1xuICAgICAgICB9XG5cbiAgICAgICAgLm1lc3NhZ2V7XG4gICAgICAgICAgbWF4LWhlaWdodDogMTB2aDtcbiAgICAgICAgICBncmlkLWFyZWE6IG1lc3NhZ2U7XG4gICAgICAgICAgZGlzcGxheTogZ3JpZDtcbiAgICAgICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDdmciAxZnI7XG4gICAgICAgICAgZ2FwOiAxNXB4O1xuICAgICAgICB9XG5cbiAgICAgICAgLmhlYWRlckl0ZW1ze1xuICAgICAgICAgIG1hcmdpbjogMXJlbTtcbiAgICAgICAgICBjb2xvcjogd2hpdGU7XG4gICAgICAgICAgcGFkZGluZzogMC41cmVtO1xuICAgICAgICB9XG5cbiAgICAgICAgLmJhbGFuY2V7XG4gICAgICAgICAgYmFja2dyb3VuZDogb3JhbmdlO1xuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDEwcHhcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLmNvbnRhaW5lciB7XG4gICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICAgIFxuICAgICAgICB9XG5cbiAgICAgICAgLmxvZ2luQm94e1xuICAgICAgICAgIHdpZHRoOiA2MCU7XG4gICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICAgIHBhZGRpbmc6IDIuNXJlbSAwLjVyZW07XG4gICAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjZWFlYWVhO1xuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gICAgICAgICAgdHJhbnNpdGlvbjogY29sb3IgMC4xNXMgZWFzZSwgYm9yZGVyLWNvbG9yIDAuMTVzIGVhc2U7XG4gICAgICAgIH1cblxuICAgICAgICAubG9naW5Gb3Jte1xuICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgICBwYWRkaW5nOiAwLjVyZW0gMS44cmVtO1xuICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgICAgd2lkdGg6IDEwMCVcbiAgICAgICAgfVxuXG4gICAgICAgIC5sb2dpbkZpZWxkc3tcbiAgICAgICAgICBtYXJnaW4tdG9wOiAwLjVyZW1cbiAgICAgICAgfVxuXG4gICAgICAgIC5wcml2YXRlS2V5e1xuICAgICAgICAgIHBhZGRpbmc6IDAuNXJlbSAwLjVyZW07XG4gICAgICAgICAgd2lkdGg6IDEwMCVcbiAgICAgICAgfVxuXG4gICAgICAgIC5zdWJtaXRCdXR0b257XG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICAgICAgd2lkdGg6IDQwJTtcbiAgICAgICAgICBhbGlnbi1zZWxmOiBjZW50ZXI7XG4gICAgICAgICAgcGFkZGluZzogMC41cmVtIDAuNXJlbTtcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICAgICAgICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gICAgICAgICAgdHJhbnNpdGlvbjogY29sb3IgMC4xNXMgZWFzZSwgYm9yZGVyLWNvbG9yIDAuMTVzIGVhc2U7XG4gICAgICAgIH1cbiAgICAgIFxuICAgICAgICAuc3VibWl0QnV0dG9uIDpob3ZlcixcbiAgICAgICAgLnN1Ym1pdEJ1dHRvbiA6Zm9jdXMsXG4gICAgICAgIC5zdWJtaXRCdXR0b24gOmFjdGl2ZSB7XG4gICAgICAgICAgYm9yZGVyLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgICAgICBjb2xvcjogICNmZmY7XG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjojMDA3MGYzIDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLmFkZEJ1dHRvbntcbiAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgICAgICBhbGlnbi1zZWxmOiBjZW50ZXI7XG4gICAgICAgICAgcGFkZGluZzogMC41cmVtIDAuNXJlbTtcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICAgICAgICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gICAgICAgICAgdHJhbnNpdGlvbjogY29sb3IgMC4xNXMgZWFzZSwgYm9yZGVyLWNvbG9yIDAuMTVzIGVhc2U7XG4gICAgICAgIH1cbiAgICAgIFxuICAgICAgICAuYWRkQnV0dG9uIDpob3ZlcixcbiAgICAgICAgLmFkZEJ1dHRvbiA6Zm9jdXMsXG4gICAgICAgIC5hZGRCdXR0b24gOmFjdGl2ZSB7XG4gICAgICAgICAgYm9yZGVyLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgICAgICBjb2xvcjogICNmZmY7XG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjojMDA3MGYzIDtcbiAgICAgICAgfVxuXG4gICAgICAgIC5zZW5kQnV0dG9ue1xuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgICAgIGFsaWduLXNlbGY6IGNlbnRlcjtcbiAgICAgICAgICBwYWRkaW5nOiAwLjVyZW0gMC41cmVtO1xuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gICAgICAgICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICAgICAgICB0cmFuc2l0aW9uOiBjb2xvciAwLjE1cyBlYXNlLCBib3JkZXItY29sb3IgMC4xNXMgZWFzZTtcbiAgICAgICAgfVxuICAgICAgXG4gICAgICAgIC5zZW5kQnV0dG9uIDpob3ZlcixcbiAgICAgICAgLnNlbmRCdXR0b24gOmZvY3VzLFxuICAgICAgICAuc2VuZEJ1dHRvbiA6YWN0aXZlIHtcbiAgICAgICAgICBib3JkZXItY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgICAgIGNvbG9yOiAgI2ZmZjtcbiAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiMwMDcwZjMgO1xuICAgICAgICB9XG5cbiAgICAgICAgLmxhbmRpbmdQYWdlIHtcbiAgICAgICAgICBwYWRkaW5nOiA1cmVtIDA7XG4gICAgICAgICAgZmxleDogMTtcbiAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvb3RlciB7XG4gICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgaGVpZ2h0OiAxMDBweDtcbiAgICAgICAgICBib3JkZXItdG9wOiAxcHggc29saWQgI2VhZWFlYTtcbiAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIH1cblxuICAgICAgICBmb290ZXIgaW1nIHtcbiAgICAgICAgICBtYXJnaW4tbGVmdDogMC41cmVtO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9vdGVyIGEge1xuICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGEge1xuICAgICAgICAgIGNvbG9yOiBpbmhlcml0O1xuICAgICAgICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC50aXRsZSBhIHtcbiAgICAgICAgICBjb2xvcjogIzAwNzBmMztcbiAgICAgICAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gICAgICAgIH1cblxuICAgICAgICAudGl0bGUgYTpob3ZlcixcbiAgICAgICAgLnRpdGxlIGE6Zm9jdXMsXG4gICAgICAgIC50aXRsZSBhOmFjdGl2ZSB7XG4gICAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XG4gICAgICAgIH1cblxuICAgICAgICAudGl0bGUge1xuICAgICAgICAgIG1hcmdpbjogMDtcbiAgICAgICAgICBsaW5lLWhlaWdodDogMS4xNTtcbiAgICAgICAgICBmb250LXNpemU6IDNyZW07XG4gICAgICAgICAgZm9udC1mYW1pbHk6IFwiSGVsdmV0aWNhIE5ldWVcIlxuICAgICAgICB9XG4gICAgICAgIC5sb2dpblRpdGxlIHtcbiAgICAgICAgICBtYXJnaW46IDA7XG4gICAgICAgICAgbGluZS1oZWlnaHQ6IDEuMTU7XG4gICAgICAgICAgZm9udC1zaXplOiAycmVtO1xuICAgICAgICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gICAgICAgICAgY29sb3I6ICMwMDcwZjM7XG4gICAgICAgIH1cblxuICAgICAgICAudGl0bGUsXG4gICAgICAgIC5kZXNjcmlwdGlvbiB7XG4gICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICB9XG5cbiAgICAgICAgLmRlc2NyaXB0aW9uIHtcbiAgICAgICAgICBsaW5lLWhlaWdodDogMS41O1xuICAgICAgICAgIGZvbnQtc2l6ZTogMS41cmVtO1xuICAgICAgICB9XG5cbiAgICAgICAgLmxvZ2luQm94OmhvdmVyLFxuICAgICAgICAubG9naW5Cb3g6Zm9jdXMsXG4gICAgICAgIC5sb2dpbkJveDphY3RpdmUge1xuICAgICAgICAgIFxuICAgICAgICAgIGJvcmRlci1jb2xvcjogIzAwNzBmMztcbiAgICAgICAgfVxuXG4gICAgICAgIC5jYXJkIGgzIHtcbiAgICAgICAgICBtYXJnaW46IDAgMCAxcmVtIDA7XG4gICAgICAgICAgZm9udC1zaXplOiAxLjVyZW07XG4gICAgICAgIH1cblxuICAgICAgICAuY2FyZCBwIHtcbiAgICAgICAgICBtYXJnaW46IDA7XG4gICAgICAgICAgZm9udC1zaXplOiAxLjI1cmVtO1xuICAgICAgICAgIGxpbmUtaGVpZ2h0OiAxLjU7XG4gICAgICAgIH1cblxuICAgICAgICAubG9nbyB7XG4gICAgICAgICAgaGVpZ2h0OiAxZW07XG4gICAgICAgIH1cblxuICAgICAgICBAbWVkaWEgKG1heC13aWR0aDogNjAwcHgpIHtcbiAgICAgICAgICAuZ3JpZCB7XG4gICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICBgfTwvc3R5bGU+XG5cbiAgICAgIDxzdHlsZSBqc3ggZ2xvYmFsPntgXG4gICAgICAgIGh0bWwsXG4gICAgICAgIGJvZHkge1xuICAgICAgICAgIHBhZGRpbmc6IDA7XG4gICAgICAgICAgbWFyZ2luOiAwO1xuICAgICAgICAgIGZvbnQtZmFtaWx5OiAtYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsIFNlZ29lIFVJLCBSb2JvdG8sXG4gICAgICAgICAgICBPeHlnZW4sIFVidW50dSwgQ2FudGFyZWxsLCBGaXJhIFNhbnMsIERyb2lkIFNhbnMsIEhlbHZldGljYSBOZXVlLFxuICAgICAgICAgICAgc2Fucy1zZXJpZjtcbiAgICAgICAgfVxuXG4gICAgICAgICoge1xuICAgICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgICAgIH1cbiAgICAgIGB9PC9zdHlsZT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IExvZ2luOyJdfQ== */\n/*@ sourceURL=views/Login.js */'
      }), _react2.default.createElement(_style2.default, {
        styleId: '3379920139',
        css: 'html,body{padding:0;margin:0;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto, Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue, sans-serif;}*{box-sizing:border-box;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZXdzL0xvZ2luLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQThieUIsQUFJcUIsQUFRWSxVQVBiLFNBR0csR0FLZCxtSUFKQSIsImZpbGUiOiJ2aWV3cy9Mb2dpbi5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS92aWN0b3JwaGFtMTk5Ny9Xb3JrcGxhY2UvU1VURC81MDAzN19ibG9ja2NoYWluL2Jsb2NrY2hhaW4tcHJvaiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQge1xuICAgIElucHV0LFxuICAgIE1lc3NhZ2UsXG4gICAgQ29udGFpbmVyLFxuICAgIEJ1dHRvbixcbiAgICBIZWFkZXIsXG4gICAgSWNvblxufSBmcm9tICdzZW1hbnRpYy11aS1yZWFjdCc7XG5pbXBvcnQgSGVhZCBmcm9tICduZXh0L2hlYWQnO1xuaW1wb3J0IHdlYjMgZnJvbSAnLi4vZXRoZXJldW0vd2ViMyc7XG5pbXBvcnQgQ29uc3RhbnQgZnJvbSAnLi4vc3VwcG9ydC9Db25zdGFudCc7XG5pbXBvcnQgQ29uZmlnIGZyb20gJy4uL3N1cHBvcnQvQ29uZmlnJztcblxuY2xhc3MgTG9naW4gZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgdGhpcy5hY2NvdW50ID0gcHJvcHMuYWNjb3VudDtcbiAgICAgICAgdGhpcy5jb250cmFjdE1hbmFnZXIgPSBwcm9wcy5jb250cmFjdE1hbmFnZXI7XG4gICAgICAgIHRoaXMuc3RvcmFnZU1hbmFnZXIgPSBwcm9wcy5zdG9yYWdlTWFuYWdlcjtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtwcml2YXRlS2V5OiBcIlwiLCBlcnJvck1lc3NhZ2U6XCJcIiwgdHJhbnNpdGlvbk1lc3NhZ2U6XCJcIiwgd2FsbGV0QWRkcmVzczogXCJcIn07XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuc3RvcmFnZU1hbmFnZXIucmVsb2FkKTtcbiAgICAgICAgXG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIC8vIGF3YWl0IHRoaXMuc2xlZXAoMjAwMCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuc3RhdGUpO1xuICAgICAgICAvLyBpZih3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJyZWxvYWRcIik+IDApe1xuICAgICAgICAvLyB9XG4gICAgICAgIGNvbnNvbGUubG9nKHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInJlbG9hZFwiKSlcbiAgICAgICAgXG5cbiAgICB9XG5cbiAgICBoYW5kbGVCYWNrID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHt3YWxsZXRBZGRyZXNzIDogXCJcIiwgZXJyb3JNZXNzYWdlOiBcIlwiLCB0cmFuc2l0aW9uTWVzc2FnZTogXCJcIn0pO1xuICAgIH1cblxuICAgIHNsZWVwKG1zKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgbXMpKTtcbiAgICB9XG5cbiAgICBoYW5kbGVKb2luID0gYXN5bmMgKCkgPT57XG4gICAgICAgIGF3YWl0IHRoaXMuYWNjb3VudC5zdG9yZVByaXZhdGVLZXkodGhpcy5zdGF0ZS5wcml2YXRlS2V5KTtcbiAgICAgICAgYXdhaXQgdGhpcy5jb250cmFjdE1hbmFnZXIuZ2V0Q29udHJhY3QoKTtcbiAgICAgICAgdmFyIHggPSBhd2FpdCB0aGlzLmNvbnRyYWN0TWFuYWdlci5nZXRKb2luZWRBZGRyZXNzKCk7XG4gICAgICAgIGlmICh4PT0wKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiSm9pbmluZyB0aGUgbmV0d29ya1wiKTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3RyYW5zaXRpb25NZXNzYWdlOiBcIkpvaW5pbmcuLi5cIn0pXG4gICAgICAgICAgICB2YXIgcHVibGljS2V5QnVmZmVyID0gdGhpcy5hY2NvdW50LmdldFB1YmxpY0tleUJ1ZmZlcigpO1xuICAgICAgICAgICAgLy8gYXdhaXQgdGhpcy5jb250cmFjdE1hbmFnZXIuY2hlY2tBY2MoJzB4Jyt0aGlzLnN0YXRlLndhbGxldEFkZHJlc3MpO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5jb250cmFjdE1hbmFnZXIuam9pbkNvbnRyYWN0KHB1YmxpY0tleUJ1ZmZlciwgICAocmVzdWx0RXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0RXZlbnQgPT0gQ29uc3RhbnQuRVZFTlQuT05fUkVKRUNURUQgfHwgcmVzdWx0RXZlbnQgPT0gQ29uc3RhbnQuRVZFTlQuT05fRVJST1IpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dHJhbnNpdGlvbk1lc3NhZ2U6IFwiXCIsIGVycm9yTWVzc2FnZTogXCJTb21ldGhpbmcgd2VudCB3cm9uZywgcmVmcmVzaGluZyBpbiAzIHNlY29uZHMuLi5cIn0pXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzdWx0RXZlbnQgPT0gQ29uc3RhbnQuRVZFTlQuT05fUkVDRUlQVCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt0cmFuc2l0aW9uTWVzc2FnZTogXCJTdWNjZXNzIVwifSlcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5zdG9yYWdlTWFuYWdlci5yZWxvYWQgPSAxO1xuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnN0b3JhZ2VNYW5hZ2VyLnJlbG9hZCk7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5zZXRTdGF0ZSh7dHJhbnNpdGlvbk1lc3NhZ2U6IFwiU3VjY2VzcyEgQ2xpY2sgaGVyZSB0byBlbnRlciBpZiBub3QgZGlyZWN0ZWQgYXV0b21hdGljYWxseS5cIn0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIC8vIHRoaXMuc2V0U3RhdGUoe3RyYW5zaXRpb25NZXNzYWdlOiBcIlN1Y2Nlc3MhIENsaWNrIGhlcmUgdG8gZW50ZXIgaWYgbm90IGRpcmVjdGVkIGF1dG9tYXRpY2FsbHkuXCJ9KTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZXhpc3RpbmdcIik7XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIFxuICAgIH1cblxuXG4gICAgbmV4dENsaWNrZWQgPSBhc3luYyAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuc3RhdGUucHJpdmF0ZUtleSlcbiAgICAgICAgdmFyIHdhbGxldEFkZHJlc3MgPSBhd2FpdCB0aGlzLmFjY291bnQuY2hlY2tQcml2YXRlS2V5KHRoaXMuc3RhdGUucHJpdmF0ZUtleSk7XG4gICAgICAgIGlmICh3YWxsZXRBZGRyZXNzKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInN1Y2Vzc1wiLCB3YWxsZXRBZGRyZXNzKTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2Vycm9yTWVzc2FnZSA6IFwiXCJ9KTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3dhbGxldEFkZHJlc3MgOiB3YWxsZXRBZGRyZXNzfSk7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiR1VVU0xcIik7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtlcnJvck1lc3NhZ2UgOiBcIlByaXZhdGUgS2V5IGlzIGludmFsaWRcIn0pO1xuICAgICAgICAgICAgLy8gdGhpcy5zZXRTdGF0ZSh7ZXJyb3JNZXNzYWdlOiBcIkludmFsaWQgcHJpdmF0ZSBrZXlcIn0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2xhbmRpbmdQYWdlJyA+XG4gICAgICAgICAgICA8SGVhZD5cbiAgICAgICAgICAgICAgICA8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgaHJlZj1cIi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL3NlbWFudGljLXVpLzIuMi4xMi9zZW1hbnRpYy5taW4uY3NzXCI+PC9saW5rPlxuICAgICAgICAgICAgPC9IZWFkPlxuICAgICAgICAgICAgICAgIDxoMSBjbGFzc05hbWU9XCJ0aXRsZVwiPlxuICAgICAgICAgICAgICAgIFdlbGNvbWUgdG8gQmxvY2stRm9yZXZlciEgXG4gICAgICAgICAgICAgICAgPC9oMT5cblxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImRlc2NyaXB0aW9uXCI+XG4gICAgICAgICAgICAgICAgU2VuZCBhIHByaXZhdGUgbWVzc2FnZSB0byB5b3VyIGZyaWVuZCB0aGF0IHdpbGwgbmV2ZXIgYmUgbG9zdFxuICAgICAgICAgICAgICAgIDwvcD5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdsb2dpbkJveCc+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2xvZ2luVGl0bGUnPiBTaWduIGluIHRvIEJsb2NrLUZvcmV2ZXI8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nbG9naW5Gb3JtJyA+IFxuICAgICAgICAgICAgICAgIDxmb3JtIGhpZGRlbj17dGhpcy5zdGF0ZS53YWxsZXRBZGRyZXNzICE9IFwiXCJ9IGNsYXNzTmFtZT0nbG9naW5Gb3JtJyBvblN1Ym1pdD17KGUpPT50aGlzLm5leHRDbGlja2VkKGUpfT4gXG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9J2xvZ2luRmllbGRzJyBodG1sRm9yPVwicHJpS2V5XCI+RW50ZXIgUHJpdmF0ZSBLZXk6PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHZhbHVlPXt0aGlzLnN0YXRlLnByaXZhdGVLZXl9IGNsYXNzTmFtZT0nbG9naW5GaWVsZHMgcHJpdmF0ZUtleScgdHlwZT1cInRleHRcIiBvbkNoYW5nZT17KGUpID0+IHRoaXMuc2V0U3RhdGUoe3ByaXZhdGVLZXk6IGUudGFyZ2V0LnZhbHVlfSl9ICByZXF1aXJlZCAvPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT0nbG9naW5GaWVsZHMgc3VibWl0QnV0dG9uJyB0eXBlPVwic3VibWl0XCI+TG9naW48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICAgICAgICAgICAgICAgICB7LyogPElucHV0IGZsdWlkIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLnByaXZhdGVLZXl9IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gdGhpcy5zZXRTdGF0ZSh7cHJpdmF0ZUtleTogZS50YXJnZXQudmFsdWV9KX0gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uPXt7IGNvbG9yOiAnYmx1ZScsIGxhYmVsUG9zaXRpb246ICdyaWdodCcsIGljb246ICdhbmdsZSByaWdodCcsIGNvbnRlbnQ6ICdOZXh0Jywgb25DbGljazogKGUpPT50aGlzLm5leHRDbGlja2VkKGUpfX0vPiAqL31cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIDxNZXNzYWdlIGVycm9yIGhlYWRlcj17dGhpcy5zdGF0ZS5lcnJvck1lc3NhZ2V9IGhpZGRlbj17dGhpcy5zdGF0ZS5lcnJvck1lc3NhZ2UgPT0gXCJcIn0vPlxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgPE1lc3NhZ2UgdGV4dCBwb3NpdGl2ZSBoaWRkZW49e3RoaXMuc3RhdGUud2FsbGV0QWRkcmVzcyA9PSBcIlwifT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxNZXNzYWdlLkhlYWRlcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2luIEV0aGVyZXVtIE1lc3NlbmdlciBhcyA8YnIvPiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q29udGFpbmVyIGZsdWlkIHRleHRBbGlnbj0nY2VudGVyJyBzdHlsZT17eyBtYXJnaW5Ub3A6IFwiMXZ3XCJ9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGIgc3R5bGU9e3tmb250U2l6ZTogXCIydndcIn19PjB4e3RoaXMuc3RhdGUud2FsbGV0QWRkcmVzc308L2I+PGJyLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEJ1dHRvbiBvbkNsaWNrPXt0aGlzLmhhbmRsZUJhY2t9IGNvbG9yID0gJ2JsdWUnICBzdHlsZT17eyBtYXJnaW5Ub3A6IFwiMXZ3XCJ9fSA+QmFjazwvQnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9e3RoaXMuaGFuZGxlSm9pbn0gY29sb3IgPSAnb3JhbmdlJyBzdHlsZT17eyBtYXJnaW5MZWZ0OiBcIjAuNXZ3XCJ9fT5Kb2luPC9CdXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Db250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L01lc3NhZ2UuSGVhZGVyPlxuICAgICAgICAgICAgICAgICAgICA8L01lc3NhZ2U+XG4gICAgICAgICAgICAgICAgICAgIDxDb250YWluZXIgdGV4dEFsaWduPVwiY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxNZXNzYWdlICBjb21wYWN0IHBvc2l0aXZlIGhpZGRlbj17dGhpcy5zdGF0ZS50cmFuc2l0aW9uTWVzc2FnZSAhPSBcIkpvaW5pbmcuLi5cIn0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEljb24gc2l6ZT0nYmlnJyBuYW1lPSdjaXJjbGUgbm90Y2hlZCcgbG9hZGluZyAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxiIHN0eWxlPXt7Zm9udFNpemU6IFwiMi41dndcIn19Pnt0aGlzLnN0YXRlLnRyYW5zaXRpb25NZXNzYWdlfTwvYj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBzdHlsZT17e2ZvbnRTaXplOiBcIjF2d1wifX0+UGxlYXNlIG1hbnVhbGx5IHJlZnJlc2ggcGFnZSBpZiB1bmFibGUgdG8gbG9nZ2luZyBpbiBkdXJpbmcgZmlyc3QgdGltZTwvcD5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPC9NZXNzYWdlPlxuICAgICAgICAgICAgICAgICAgICAgICAgPE1lc3NhZ2UgIGNvbXBhY3QgcG9zaXRpdmUgaGlkZGVuPXt0aGlzLnN0YXRlLnRyYW5zaXRpb25NZXNzYWdlICE9IFwiU3VjY2VzcyFcIn0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEljb24gc2l6ZT0nYmlnJyBuYW1lPSdjaGVjaycgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YiBzdHlsZT17e2ZvbnRTaXplOiBcIjIuNXZ3XCJ9fT57dGhpcy5zdGF0ZS50cmFuc2l0aW9uTWVzc2FnZX08L2I+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgc3R5bGU9e3tmb250U2l6ZTogXCIxdndcIn19PlBsZWFzZSBtYW51YWxseSByZWZyZXNoIHBhZ2UgaWYgdW5hYmxlIHRvIGxvZ2dpbmcgaW4gZHVyaW5nIGZpcnN0IHRpbWU8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L01lc3NhZ2U+XG4gICAgICAgICAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgICAgICA8L0NvbnRhaW5lcj5cblxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBcbiAgICA8c3R5bGUganN4PntgXG4gICAgICAgIC5oZWFkZXJ7XG4gICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICMwMDcwZjM7XG4gICAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgIH1cblxuICAgICAgICAuY29udGFjdExpc3RIZWFkZXJ7XG4gICAgICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICAgICAgfVxuXG4gICAgICAgIC5jb250YWN0SW1ne1xuICAgICAgICAgIHdpZHRoOiAxMCU7XG4gICAgICAgICAgaGVpZ2h0OiBhdXRvO1xuICAgICAgICAgIHRyYW5zaXRpb246IGZpbHRlciAwLjE1cyBlYXNlXG4gICAgICAgIH1cblxuICAgICAgICAuY29udGFjdE5hbWV7XG4gICAgICAgICAgZm9udC1zaXplOiAwLjhyZW07XG4gICAgICAgICAgbWFyZ2luLWxlZnQ6IDAuMnJlbTtcbiAgICAgICAgICB0cmFuc2l0aW9uOiBjb2xvciAwLjE1cyBlYXNlXG4gICAgICAgIH1cblxuICAgICAgICAuY29udGFjdEJveHtcbiAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgIG92ZXJmbG93OiBzY3JvbGw7XG4gICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgICBtYXJnaW4tdG9wOiAwLjVyZW07XG4gICAgICAgICAgYm9yZGVyOiAycHggdHJhbnNwYXJlbnQgc29saWQ7XG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgICAgICAgICBwYWRkaW5nOiAwLjVyZW07XG4gICAgICAgICAgdHJhbnNpdGlvbjogYm9yZGVyLWNvbG9yIDAuMTVzIGVhc2UsIGJhY2tncm91bmQtY29sb3IgMC4xNXMgZWFzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC5jb250YWN0Qm94IDpob3ZlcixcbiAgICAgICAgLmNvbnRhY3RCb3ggOmZvY3VzLFxuICAgICAgICAuY29udGFjdEJveCA6YWN0aXZlIHtcbiAgICAgICAgICBib3JkZXItY29sb3I6ICMwMDcwZjM7XG4gICAgICAgICAgXG4gICAgICAgIH1cblxuICAgICAgICAuY29udGFjdEFkZHtcbiAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgIG1hcmdpbi10b3A6IDFyZW07XG4gICAgICAgICAgbWFyZ2luLWJvdHRvbTogMC41cmVtO1xuICAgICAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICAgICAgfVxuXG4gICAgICAgIC5wdWJsaWNLZXl7XG4gICAgICAgICAgd2lkdGg6IDYwJVxuICAgICAgICB9XG5cbiAgICAgICAgLmJvZHl7XG4gICAgICAgICAgZGlzcGxheTogZ3JpZDtcbiAgICAgICAgICBtYXJnaW4tdG9wOiAxcmVtO1xuICAgICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDNmcjtcbiAgICAgICAgICBncmlkLXRlbXBsYXRlLWFyZWFzOiBcImNvbnRhY3RMaXN0IG1lc3NhZ2VCb2R5XCI7XG4gICAgICAgICAgZ2FwOiAxNXB4O1xuICAgICAgICAgIHBhZGRpbmc6IDAgMXJlbTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLmJvZHlDb2xze1xuICAgICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNlYWVhZWE7XG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgICAgICAgICBwYWRkaW5nOiAwLjVyZW07XG4gICAgICAgIH1cblxuICAgICAgICAubWVzc2FnZVJvd3N7XG4gICAgICAgICAgYm9yZGVyOiAxcHggc29saWQgI2VhZWFlYTtcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICAgICAgICAgIHBhZGRpbmc6IDAuNXJlbTtcbiAgICAgICAgfVxuXG4gICAgICAgIC5jb250YWN0TGlzdHtcbiAgICAgICAgICBncmlkLWFyZWE6IGNvbnRhY3RMaXN0O1xuICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgfVxuXG4gICAgICAgIC5tZXNzYWdlQm9keXtcbiAgICAgICAgICBncmlkLWFyZWE6IG1lc3NhZ2VCb2R5O1xuICAgICAgICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgICAgICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiAzZnIgMWZyO1xuICAgICAgICAgIGdyaWQtdGVtcGxhdGUtYXJlYXM6IFwiY29udmVyc2F0aW9uXCIgXCJtZXNzYWdlXCI7XG4gICAgICAgICAgZ2FwOiAxNXB4O1xuICAgICAgICB9XG5cbiAgICAgICAgLmNvbnZlcnNhdGlvbntcbiAgICAgICAgICBncmlkLWFyZWE6IGNvbnZlcnNhdGlvbjtcbiAgICAgICAgfVxuXG4gICAgICAgIC5tZXNzYWdle1xuICAgICAgICAgIG1heC1oZWlnaHQ6IDEwdmg7XG4gICAgICAgICAgZ3JpZC1hcmVhOiBtZXNzYWdlO1xuICAgICAgICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiA3ZnIgMWZyO1xuICAgICAgICAgIGdhcDogMTVweDtcbiAgICAgICAgfVxuXG4gICAgICAgIC5oZWFkZXJJdGVtc3tcbiAgICAgICAgICBtYXJnaW46IDFyZW07XG4gICAgICAgICAgY29sb3I6IHdoaXRlO1xuICAgICAgICAgIHBhZGRpbmc6IDAuNXJlbTtcbiAgICAgICAgfVxuXG4gICAgICAgIC5iYWxhbmNle1xuICAgICAgICAgIGJhY2tncm91bmQ6IG9yYW5nZTtcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiAxMHB4XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC5jb250YWluZXIge1xuICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgICBcbiAgICAgICAgfVxuXG4gICAgICAgIC5sb2dpbkJveHtcbiAgICAgICAgICB3aWR0aDogNjAlO1xuICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgICBwYWRkaW5nOiAyLjVyZW0gMC41cmVtO1xuICAgICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgICAgYm9yZGVyOiAxcHggc29saWQgI2VhZWFlYTtcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICAgICAgICAgIHRyYW5zaXRpb246IGNvbG9yIDAuMTVzIGVhc2UsIGJvcmRlci1jb2xvciAwLjE1cyBlYXNlO1xuICAgICAgICB9XG5cbiAgICAgICAgLmxvZ2luRm9ybXtcbiAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICAgICAgcGFkZGluZzogMC41cmVtIDEuOHJlbTtcbiAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICAgIHdpZHRoOiAxMDAlXG4gICAgICAgIH1cblxuICAgICAgICAubG9naW5GaWVsZHN7XG4gICAgICAgICAgbWFyZ2luLXRvcDogMC41cmVtXG4gICAgICAgIH1cblxuICAgICAgICAucHJpdmF0ZUtleXtcbiAgICAgICAgICBwYWRkaW5nOiAwLjVyZW0gMC41cmVtO1xuICAgICAgICAgIHdpZHRoOiAxMDAlXG4gICAgICAgIH1cblxuICAgICAgICAuc3VibWl0QnV0dG9ue1xuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgICAgIHdpZHRoOiA0MCU7XG4gICAgICAgICAgYWxpZ24tc2VsZjogY2VudGVyO1xuICAgICAgICAgIHBhZGRpbmc6IDAuNXJlbSAwLjVyZW07XG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgICAgICAgICBmb250LXdlaWdodDogNzAwO1xuICAgICAgICAgIHRyYW5zaXRpb246IGNvbG9yIDAuMTVzIGVhc2UsIGJvcmRlci1jb2xvciAwLjE1cyBlYXNlO1xuICAgICAgICB9XG4gICAgICBcbiAgICAgICAgLnN1Ym1pdEJ1dHRvbiA6aG92ZXIsXG4gICAgICAgIC5zdWJtaXRCdXR0b24gOmZvY3VzLFxuICAgICAgICAuc3VibWl0QnV0dG9uIDphY3RpdmUge1xuICAgICAgICAgIGJvcmRlci1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICAgICAgY29sb3I6ICAjZmZmO1xuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IzAwNzBmMyA7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC5hZGRCdXR0b257XG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICAgICAgYWxpZ24tc2VsZjogY2VudGVyO1xuICAgICAgICAgIHBhZGRpbmc6IDAuNXJlbSAwLjVyZW07XG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgICAgICAgICBmb250LXdlaWdodDogNzAwO1xuICAgICAgICAgIHRyYW5zaXRpb246IGNvbG9yIDAuMTVzIGVhc2UsIGJvcmRlci1jb2xvciAwLjE1cyBlYXNlO1xuICAgICAgICB9XG4gICAgICBcbiAgICAgICAgLmFkZEJ1dHRvbiA6aG92ZXIsXG4gICAgICAgIC5hZGRCdXR0b24gOmZvY3VzLFxuICAgICAgICAuYWRkQnV0dG9uIDphY3RpdmUge1xuICAgICAgICAgIGJvcmRlci1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICAgICAgY29sb3I6ICAjZmZmO1xuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IzAwNzBmMyA7XG4gICAgICAgIH1cblxuICAgICAgICAuc2VuZEJ1dHRvbntcbiAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgICAgICBhbGlnbi1zZWxmOiBjZW50ZXI7XG4gICAgICAgICAgcGFkZGluZzogMC41cmVtIDAuNXJlbTtcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICAgICAgICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gICAgICAgICAgdHJhbnNpdGlvbjogY29sb3IgMC4xNXMgZWFzZSwgYm9yZGVyLWNvbG9yIDAuMTVzIGVhc2U7XG4gICAgICAgIH1cbiAgICAgIFxuICAgICAgICAuc2VuZEJ1dHRvbiA6aG92ZXIsXG4gICAgICAgIC5zZW5kQnV0dG9uIDpmb2N1cyxcbiAgICAgICAgLnNlbmRCdXR0b24gOmFjdGl2ZSB7XG4gICAgICAgICAgYm9yZGVyLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgICAgICBjb2xvcjogICNmZmY7XG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjojMDA3MGYzIDtcbiAgICAgICAgfVxuXG4gICAgICAgIC5sYW5kaW5nUGFnZSB7XG4gICAgICAgICAgcGFkZGluZzogNXJlbSAwO1xuICAgICAgICAgIGZsZXg6IDE7XG4gICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIH1cblxuICAgICAgICBmb290ZXIge1xuICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgIGhlaWdodDogMTAwcHg7XG4gICAgICAgICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNlYWVhZWE7XG4gICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9vdGVyIGltZyB7XG4gICAgICAgICAgbWFyZ2luLWxlZnQ6IDAuNXJlbTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvb3RlciBhIHtcbiAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIH1cblxuICAgICAgICBhIHtcbiAgICAgICAgICBjb2xvcjogaW5oZXJpdDtcbiAgICAgICAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gICAgICAgIH1cblxuICAgICAgICAudGl0bGUgYSB7XG4gICAgICAgICAgY29sb3I6ICMwMDcwZjM7XG4gICAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICAgICAgICB9XG5cbiAgICAgICAgLnRpdGxlIGE6aG92ZXIsXG4gICAgICAgIC50aXRsZSBhOmZvY3VzLFxuICAgICAgICAudGl0bGUgYTphY3RpdmUge1xuICAgICAgICAgIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xuICAgICAgICB9XG5cbiAgICAgICAgLnRpdGxlIHtcbiAgICAgICAgICBtYXJnaW46IDA7XG4gICAgICAgICAgbGluZS1oZWlnaHQ6IDEuMTU7XG4gICAgICAgICAgZm9udC1zaXplOiAzcmVtO1xuICAgICAgICAgIGZvbnQtZmFtaWx5OiBcIkhlbHZldGljYSBOZXVlXCJcbiAgICAgICAgfVxuICAgICAgICAubG9naW5UaXRsZSB7XG4gICAgICAgICAgbWFyZ2luOiAwO1xuICAgICAgICAgIGxpbmUtaGVpZ2h0OiAxLjE1O1xuICAgICAgICAgIGZvbnQtc2l6ZTogMnJlbTtcbiAgICAgICAgICBmb250LXdlaWdodDogNzAwO1xuICAgICAgICAgIGNvbG9yOiAjMDA3MGYzO1xuICAgICAgICB9XG5cbiAgICAgICAgLnRpdGxlLFxuICAgICAgICAuZGVzY3JpcHRpb24ge1xuICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIC5kZXNjcmlwdGlvbiB7XG4gICAgICAgICAgbGluZS1oZWlnaHQ6IDEuNTtcbiAgICAgICAgICBmb250LXNpemU6IDEuNXJlbTtcbiAgICAgICAgfVxuXG4gICAgICAgIC5sb2dpbkJveDpob3ZlcixcbiAgICAgICAgLmxvZ2luQm94OmZvY3VzLFxuICAgICAgICAubG9naW5Cb3g6YWN0aXZlIHtcbiAgICAgICAgICBcbiAgICAgICAgICBib3JkZXItY29sb3I6ICMwMDcwZjM7XG4gICAgICAgIH1cblxuICAgICAgICAuY2FyZCBoMyB7XG4gICAgICAgICAgbWFyZ2luOiAwIDAgMXJlbSAwO1xuICAgICAgICAgIGZvbnQtc2l6ZTogMS41cmVtO1xuICAgICAgICB9XG5cbiAgICAgICAgLmNhcmQgcCB7XG4gICAgICAgICAgbWFyZ2luOiAwO1xuICAgICAgICAgIGZvbnQtc2l6ZTogMS4yNXJlbTtcbiAgICAgICAgICBsaW5lLWhlaWdodDogMS41O1xuICAgICAgICB9XG5cbiAgICAgICAgLmxvZ28ge1xuICAgICAgICAgIGhlaWdodDogMWVtO1xuICAgICAgICB9XG5cbiAgICAgICAgQG1lZGlhIChtYXgtd2lkdGg6IDYwMHB4KSB7XG4gICAgICAgICAgLmdyaWQge1xuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgYH08L3N0eWxlPlxuXG4gICAgICA8c3R5bGUganN4IGdsb2JhbD57YFxuICAgICAgICBodG1sLFxuICAgICAgICBib2R5IHtcbiAgICAgICAgICBwYWRkaW5nOiAwO1xuICAgICAgICAgIG1hcmdpbjogMDtcbiAgICAgICAgICBmb250LWZhbWlseTogLWFwcGxlLXN5c3RlbSwgQmxpbmtNYWNTeXN0ZW1Gb250LCBTZWdvZSBVSSwgUm9ib3RvLFxuICAgICAgICAgICAgT3h5Z2VuLCBVYnVudHUsIENhbnRhcmVsbCwgRmlyYSBTYW5zLCBEcm9pZCBTYW5zLCBIZWx2ZXRpY2EgTmV1ZSxcbiAgICAgICAgICAgIHNhbnMtc2VyaWY7XG4gICAgICAgIH1cblxuICAgICAgICAqIHtcbiAgICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgICB9XG4gICAgICBgfTwvc3R5bGU+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBMb2dpbjsiXX0= */\n/*@ sourceURL=views/Login.js */'
      }));
    }
  }]);

  return Login;
}(_react.Component);

exports.default = Login;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZXdzL0xvZ2luLmpzIl0sIm5hbWVzIjpbIkNvbXBvbmVudCIsIklucHV0IiwiTWVzc2FnZSIsIkNvbnRhaW5lciIsIkJ1dHRvbiIsIkhlYWRlciIsIkljb24iLCJIZWFkIiwid2ViMyIsIkNvbnN0YW50IiwiQ29uZmlnIiwiTG9naW4iLCJwcm9wcyIsImhhbmRsZUJhY2siLCJzZXRTdGF0ZSIsIndhbGxldEFkZHJlc3MiLCJlcnJvck1lc3NhZ2UiLCJ0cmFuc2l0aW9uTWVzc2FnZSIsImhhbmRsZUpvaW4iLCJhY2NvdW50Iiwic3RvcmVQcml2YXRlS2V5Iiwic3RhdGUiLCJwcml2YXRlS2V5IiwiY29udHJhY3RNYW5hZ2VyIiwiZ2V0Q29udHJhY3QiLCJnZXRKb2luZWRBZGRyZXNzIiwieCIsImNvbnNvbGUiLCJsb2ciLCJwdWJsaWNLZXlCdWZmZXIiLCJnZXRQdWJsaWNLZXlCdWZmZXIiLCJqb2luQ29udHJhY3QiLCJyZXN1bHRFdmVudCIsIkVWRU5UIiwiT05fUkVKRUNURUQiLCJPTl9FUlJPUiIsIk9OX1JFQ0VJUFQiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsInJlbG9hZCIsIm5leHRDbGlja2VkIiwiZSIsInByZXZlbnREZWZhdWx0IiwiY2hlY2tQcml2YXRlS2V5Iiwic3RvcmFnZU1hbmFnZXIiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwibXMiLCJzZXRUaW1lb3V0IiwicmVzb2x2ZSIsInRhcmdldCIsInZhbHVlIiwibWFyZ2luVG9wIiwiZm9udFNpemUiLCJtYXJnaW5MZWZ0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxBQUFROzs7O0FBQ1IsQUFDSSxBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0E7O0FBRUosQUFBTzs7OztBQUNQLEFBQU8sQUFBVTs7OztBQUNqQixBQUFPLEFBQWM7Ozs7QUFDckIsQUFBTyxBQUFZOzs7Ozs7Ozs7SSxBQUViO2lDQUNGOztpQkFBQSxBQUFZLE9B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QUFzQixZQUFZLE9BQWxDLEFBQTBDLFVBQVMsT0FBTyxFQUFFLFlBQTVELEFBQTBELEFBQWM7b0JBQXhFO3NCQUFBO0FBQUE7U0FuQmhCLEFBYUksQUFDSSxBQUVJLEFBR0ksQUFJWiw0QkFBQSxBQUFDLDRDQUFVLFdBQVgsQUFBcUI7b0JBQXJCO3NCQUFBLEFBQ0E7QUFEQTt5QkFDQSxBQUFDLDBDQUFTLFNBQVYsTUFBa0IsVUFBbEIsTUFBMkIsUUFBUSxLQUFBLEFBQUssTUFBTCxBQUFXLHFCQUE5QyxBQUFtRTtvQkFBbkU7c0JBQUEsQUFDUTtBQURSO3lCQUNRLEFBQUMsdUNBQUssTUFBTixBQUFXLE9BQU0sTUFBakIsQUFBc0Isa0JBQWlCLFNBQXZDO29CQUFBO3NCQURSLEFBQ1EsQUFDQTtBQURBOzBCQUNBLGNBQUEsT0FBRyxPQUFPLEVBQUMsVUFBWCxBQUFVLEFBQVcsc0JBQXJCOztvQkFBQTtzQkFBQSxBQUFnQztBQUFoQztjQUFnQyxBQUFLLE1BRjdDLEFBRVEsQUFBMkMsQUFDM0Msb0NBQUEsY0FBQSxPQUFHLE9BQU8sRUFBQyxVQUFYLEFBQVUsQUFBVyxvQkFBckI7O29CQUFBO3NCQUFBO0FBQUE7U0FKUixBQUNBLEFBR1EsQUFHSiw0RkFBQSxBQUFDLDBDQUFTLFNBQVYsTUFBa0IsVUFBbEIsTUFBMkIsUUFBUSxLQUFBLEFBQUssTUFBTCxBQUFXLHFCQUE5QyxBQUFtRTtvQkFBbkU7c0JBQUEsQUFDSTtBQURKO3lCQUNJLEFBQUMsdUNBQUssTUFBTixBQUFXLE9BQU0sTUFBakIsQUFBc0I7b0JBQXRCO3NCQURKLEFBQ0ksQUFDQTtBQURBOzBCQUNBLGNBQUEsT0FBRyxPQUFPLEVBQUMsVUFBWCxBQUFVLEFBQVcsc0JBQXJCOztvQkFBQTtzQkFBQSxBQUFnQztBQUFoQztjQUFnQyxBQUFLLE1BRnpDLEFBRUksQUFBMkMsQUFDM0Msb0NBQUEsY0FBQSxPQUFHLE9BQU8sRUFBQyxVQUFYLEFBQVUsQUFBVyxvQkFBckI7O29CQUFBO3NCQUFBO0FBQUE7U0EvQ2hCLEFBWUksQUFFQSxBQXVCSSxBQU9JLEFBR0k7aUJBL0NoQjthQUFBO0FBQUE7aUJBQUE7YUFESixBQUNJLEFBa1hQO0FBbFhPOzs7OztBQTlFUSxBLEFBa2NwQjs7a0JBQUEsQUFBZSIsImZpbGUiOiJMb2dpbi5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS92aWN0b3JwaGFtMTk5Ny9Xb3JrcGxhY2UvU1VURC81MDAzN19ibG9ja2NoYWluL2Jsb2NrY2hhaW4tcHJvaiJ9

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "/home/victorpham1997/Workplace/SUTD/50037_blockchain/blockchain-proj/views/Login.js"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/home/victorpham1997/Workplace/SUTD/50037_blockchain/blockchain-proj/views/Login.js"); } } })();

/***/ }),

/***/ 1353:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = __webpack_require__(41);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(15);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(16);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(42);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(46);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(17);

var _react2 = _interopRequireDefault(_react);

var _web = __webpack_require__(420);

var _web2 = _interopRequireDefault(_web);

var _semanticUiReact = __webpack_require__(409);

var _AppDispatcher = __webpack_require__(408);

var _AppDispatcher2 = _interopRequireDefault(_AppDispatcher);

var _Constant = __webpack_require__(403);

var _Constant2 = _interopRequireDefault(_Constant);

var _ContactList = __webpack_require__(801);

var _ContactList2 = _interopRequireDefault(_ContactList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/home/victorpham1997/Workplace/SUTD/50037_blockchain/blockchain-proj/views/modals/AddContactModal.js';
// Copyright (c) 2018 Nguyen Vu Nhat Minh
// Distributed under the MIT software license, see the accompanying file LICENSE

var AddContactModal = function (_Component) {
    (0, _inherits3.default)(AddContactModal, _Component);

    function AddContactModal(props) {
        (0, _classCallCheck3.default)(this, AddContactModal);

        var _this = (0, _possibleConstructorReturn3.default)(this, (AddContactModal.__proto__ || (0, _getPrototypeOf2.default)(AddContactModal)).call(this, props));

        _this.handleClose = function (e) {
            e.preventDefault();
            _this.setState({ errorMessage: "" });
            _this.setState({ modalOpen: false });
        };

        _this.handleAddContact = function (e) {
            if (_web2.default.utils.isAddress(_this.state.address)) {
                _this.contractManager.addContact(_this.state.address);
                // this.storageManager.addContact(this.state.address);
                // appDispatcher.dispatch({
                //     action: Constant.EVENT.CONTACT_LIST_UPDATED
                // });
                _this.setState({ errorMessage: "", modalOpen: false });
            } else {
                _this.setState({ errorMessage: "Invalid ethereum address" });
            }
        };

        _this.state = { modalOpen: false, errorMessage: "", address: "" };
        _this.contractManager = props.contractManager;
        _this.storageManager = props.storageManager;
        return _this;
    }

    (0, _createClass3.default)(AddContactModal, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _this2 = this;

            _AppDispatcher2.default.register(function (payload) {
                if (payload.action == _Constant2.default.ACTION.ADD_CONTACT) {
                    _this2.setState({ modalOpen: true, errorMessage: "", isLoading: false, address: "" });
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            return _react2.default.createElement('div', {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 55
                }
            }, _react2.default.createElement(_semanticUiReact.Header, { content: 'Enter Public Address of Friend', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 56
                }
            }), _react2.default.createElement('div', { style: { display: 'flex', justifyContent: "space-between" }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 57
                }
            }, _react2.default.createElement(_semanticUiReact.Input, { style: { width: "80%" }, value: this.state.address, onChange: function onChange(event) {
                    return _this3.setState({ address: event.target.value });
                }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 58
                }
            }), _react2.default.createElement(_semanticUiReact.Button, { style: { marginLeft: 8 }, color: 'orange', onClick: this.handleAddContact, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 59
                }
            }, 'Add')));
        }
    }]);

    return AddContactModal;
}(_react.Component);

exports.default = AddContactModal;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZXdzL21vZGFscy9BZGRDb250YWN0TW9kYWwuanMiXSwibmFtZXMiOlsiQ29tcG9uZW50Iiwid2ViMyIsIk1vZGFsIiwiSW5wdXQiLCJNZXNzYWdlIiwiQnV0dG9uIiwiSWNvbiIsIkhlYWRlciIsImFwcERpc3BhdGNoZXIiLCJDb25zdGFudCIsIkNvbnRhY3RMaXN0IiwiQWRkQ29udGFjdE1vZGFsIiwicHJvcHMiLCJoYW5kbGVDbG9zZSIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInNldFN0YXRlIiwiZXJyb3JNZXNzYWdlIiwibW9kYWxPcGVuIiwiaGFuZGxlQWRkQ29udGFjdCIsInV0aWxzIiwiaXNBZGRyZXNzIiwic3RhdGUiLCJhZGRyZXNzIiwiY29udHJhY3RNYW5hZ2VyIiwiYWRkQ29udGFjdCIsInN0b3JhZ2VNYW5hZ2VyIiwicmVnaXN0ZXIiLCJwYXlsb2FkIiwiYWN0aW9uIiwiQUNUSU9OIiwiQUREX0NPTlRBQ1QiLCJpc0xvYWRpbmciLCJkaXNwbGF5IiwianVzdGlmeUNvbnRlbnQiLCJ3aWR0aCIsImV2ZW50IiwidGFyZ2V0IiwidmFsdWUiLCJtYXJnaW5MZWZ0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJQSxBQUFPLEFBQVU7Ozs7QUFDakIsQUFDSSxBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0E7O0FBRUosQUFBTyxBQUFtQjs7OztBQUMxQixBQUFPLEFBQWM7Ozs7QUFDckIsQUFBTyxBQUFpQjs7Ozs7OztBQWZ4QjtBQUNBLEFBRUEsQUFBUTs7SUFjRixBOzZDQUNGOzs2QkFBQSxBQUFZLE9BQU87NENBQUE7OzRKQUFBLEFBQ1Q7O2NBRFMsQUFlbkIsY0FBYyxVQUFBLEFBQUMsR0FBTSxBQUNqQjtjQUFBLEFBQUUsQUFDRjtrQkFBQSxBQUFLLFNBQVMsRUFBQyxjQUFmLEFBQWMsQUFBZSxBQUM3QjtrQkFBQSxBQUFLLFNBQVMsRUFBRSxXQUFoQixBQUFjLEFBQWEsQUFDOUI7QUFuQmtCOztjQUFBLEFBcUJuQixtQkFBbUIsVUFBQSxBQUFDLEdBQU0sQUFDdEI7Z0JBQUksY0FBQSxBQUFLLE1BQUwsQUFBVyxVQUFVLE1BQUEsQUFBSyxNQUE5QixBQUFJLEFBQWdDLFVBQVUsQUFDMUM7c0JBQUEsQUFBSyxnQkFBTCxBQUFxQixXQUFXLE1BQUEsQUFBSyxNQUFyQyxBQUEyQyxBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO3NCQUFBLEFBQUssU0FBUyxFQUFDLGNBQUQsQUFBZSxJQUFJLFdBQWpDLEFBQWMsQUFBOEIsQUFDL0M7QUFQRCxtQkFPTyxBQUNIO3NCQUFBLEFBQUssU0FBUyxFQUFDLGNBQWYsQUFBYyxBQUFlLEFBQ2hDO0FBQ0o7QUFoQ2tCLEFBRWY7O2NBQUEsQUFBSyxRQUFRLEVBQUUsV0FBRixBQUFhLE9BQU8sY0FBcEIsQUFBa0MsSUFBSSxTQUFuRCxBQUFhLEFBQStDLEFBQzVEO2NBQUEsQUFBSyxrQkFBa0IsTUFBdkIsQUFBNkIsQUFDN0I7Y0FBQSxBQUFLLGlCQUFpQixNQUpQLEFBSWYsQUFBNEI7ZUFDL0I7Ozs7OzZDQUVvQjt5QkFDakI7O29DQUFBLEFBQWMsU0FBUyxVQUFBLEFBQUMsU0FBWSxBQUNoQztvQkFBSSxRQUFBLEFBQVEsVUFBVSxtQkFBQSxBQUFTLE9BQS9CLEFBQXNDLGFBQWEsQUFDL0M7MkJBQUEsQUFBSyxTQUFTLEVBQUMsV0FBRCxBQUFZLE1BQU0sY0FBbEIsQUFBZ0MsSUFBSSxXQUFwQyxBQUErQyxPQUFPLFNBQXBFLEFBQWMsQUFBK0QsQUFDaEY7QUFDSjtBQUpELEFBS0g7Ozs7aUNBcUJRO3lCQUNMOzttQ0FDSSxjQUFBOzs4QkFBQTtnQ0FBQSxBQUNJO0FBREo7QUFBQSxhQUFBLGtCQUNJLEFBQUMseUNBQU8sU0FBUixBQUFnQjs4QkFBaEI7Z0NBREosQUFDSSxBQUNJO0FBREo7Z0NBQ0ksY0FBQSxTQUFLLE9BQU8sRUFBQyxTQUFELEFBQVMsUUFBTyxnQkFBNUIsQUFBWSxBQUErQjs4QkFBM0M7Z0NBQUEsQUFDSTtBQURKOytCQUNJLEFBQUMsd0NBQU0sT0FBTyxFQUFDLE9BQWYsQUFBYyxBQUFPLFNBQVEsT0FBTyxLQUFBLEFBQUssTUFBekMsQUFBK0MsU0FBUyxVQUFVLHlCQUFBOzJCQUFTLE9BQUEsQUFBSyxTQUFTLEVBQUMsU0FBUyxNQUFBLEFBQU0sT0FBdkMsQUFBUyxBQUFjLEFBQXVCO0FBQWhIOzhCQUFBO2dDQURKLEFBQ0ksQUFDQTtBQURBO2dDQUNBLEFBQUMseUNBQU8sT0FBTyxFQUFDLFlBQWhCLEFBQWUsQUFBWSxLQUFJLE9BQS9CLEFBQXFDLFVBQVMsU0FBUyxLQUF2RCxBQUE0RDs4QkFBNUQ7Z0NBQUE7QUFBQTtlQUxoQixBQUNJLEFBRVEsQUFFSSxBQU1uQjs7Ozs7QUEvQ3lCLEEsQUFrRDlCOztrQkFBQSxBQUFlIiwiZmlsZSI6IkFkZENvbnRhY3RNb2RhbC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS92aWN0b3JwaGFtMTk5Ny9Xb3JrcGxhY2UvU1VURC81MDAzN19ibG9ja2NoYWluL2Jsb2NrY2hhaW4tcHJvaiJ9

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "/home/victorpham1997/Workplace/SUTD/50037_blockchain/blockchain-proj/views/modals/AddContactModal.js"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/home/victorpham1997/Workplace/SUTD/50037_blockchain/blockchain-proj/views/modals/AddContactModal.js"); } } })();

/***/ }),

/***/ 1359:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(380)


/***/ }),

/***/ 801:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = __webpack_require__(41);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(15);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(16);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(42);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(46);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(17);

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = __webpack_require__(409);

var _AppDispatcher = __webpack_require__(408);

var _AppDispatcher2 = _interopRequireDefault(_AppDispatcher);

var _Constant = __webpack_require__(403);

var _Constant2 = _interopRequireDefault(_Constant);

var _Config = __webpack_require__(423);

var _Config2 = _interopRequireDefault(_Config);

var _AddContactModal = __webpack_require__(1353);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZXdzL0NvbnRhY3RMaXN0LmpzIl0sIm5hbWVzIjpbIkNvbXBvbmVudCIsIkxpc3QiLCJJbWFnZSIsIkxvYWRlciIsIkRpbW1lciIsIkJ1dHRvbiIsIkljb24iLCJIZWFkZXIiLCJQb3B1cCIsIklucHV0IiwiTWVzc2FnZSIsImFwcERpc3BhdGNoZXIiLCJDb25zdGFudCIsIkNvbmZpZyIsIkFkZENvbnRhY3RNb2RhbCIsIkNvbnRhY3RMaXN0IiwicHJvcHMiLCJhZGRDb250YWN0Q2xpY2tlZCIsImFjY291bnQiLCJpc0pvaW5lZCIsImRpc3BhdGNoIiwiYWN0aW9uIiwiQUNUSU9OIiwiQUREX0NPTlRBQ1QiLCJFVkVOVCIsIkVOQ09VTlRFUkVEX0VSUk9SIiwibWVzc2FnZSIsIkFQUF9OQU1FIiwiYWNjZXB0Q29udGFjdFJlcXVlc3QiLCJldmVudCIsImFkZHJlc3MiLCJ0YXJnZXQiLCJ2YWx1ZSIsInN0b3JhZ2VNYW5hZ2VyIiwiY29udGFjdHMiLCJpc0FjY2VwdGluZyIsImZvcmNlVXBkYXRlIiwiY29udHJhY3RNYW5hZ2VyIiwicmVzdWx0RXZlbnQiLCJPTl9SRUpFQ1RFRCIsIk9OX0VSUk9SIiwiT05fUkVDRUlQVCIsInJlbGF0aW9uc2hpcCIsIlJlbGF0aW9uc2hpcCIsIkNvbm5lY3RlZCIsInNldFN0YXRlIiwiY29udGFjdEFkZHJlc3NlcyIsImxpc3RJdGVtQ2xpY2tlZCIsIlNFTEVDVF9DT05UQUNUIiwiZGF0YSIsInNlbGVjdGVkQWRkcmVzcyIsInN0YXRlIiwicmF3Q29udGFjdEFycmF5IiwiY29udGFjdEFycmF5IiwiaSIsImxlbmd0aCIsInRvTG93ZXJDYXNlIiwid2luZG93IiwibG9jYWxTdG9yYWdlIiwiRU5WIiwiQ29udHJhY3RBZGRyZXNzIiwicHVzaCIsInVwZGF0ZUNvbnRhY3QiLCJyZWdpc3RlciIsInBheWxvYWQiLCJDT05UQUNUX0xJU1RfVVBEQVRFRCIsImhlaWdodCIsImh0bWxDb250ZW50IiwiY29udGFjdEl0ZW1zIiwidW5kZWZpbmVkIiwidXNlciIsImFkZHJlc3NFeHBsb3JlclVybCIsIkV4cGxvcmVyVXJsIiwicmlnaHRBbGlnbmVkQ29udGVudCIsIk5vUmVsYXRpb24iLCJSZXF1ZXN0ZWQiLCJiaW5kIiwiYXZhdGFyVXJsIiwibmFtZSIsInN1YnN0ciIsIndpZHRoIiwiZmxvYXQiLCJvdmVyZmxvdyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSUEsQUFDSSxBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQTs7QUFFSixBQUFPLEFBQW1COzs7O0FBQzFCLEFBQU8sQUFBYzs7OztBQUNyQixBQUFPLEFBQVk7Ozs7QUFDbkIsQUFBTyxBQUFxQjs7Ozs7OztBQW5CNUI7QUFDQSxBQUVBLEFBQVE7O0lBa0JGLEE7eUNBQ0Y7O3lCQUFBLEFBQVksT0FBTzs0Q0FBQTs7b0pBQUEsQUFDVDs7Y0FEUyxBQWlDbkIsb0JBQW9CLFlBQU0sQUFDdEI7Z0JBQUksTUFBQSxBQUFLLFFBQVQsQUFBaUIsVUFBVSxBQUN2Qjt3Q0FBQSxBQUFjOzRCQUNGLG1CQUFBLEFBQVMsT0FEckIsQUFBdUIsQUFDSyxBQUUvQjtBQUgwQixBQUNuQjtBQUZSLG1CQUlPLEFBQ0g7d0NBQUEsQUFBYzs0QkFDRixtQkFBQSxBQUFTLE1BREUsQUFDSSxBQUN2Qjs2QkFBUyxpQkFBZSxtQkFBZixBQUF3QixXQUZyQyxBQUF1QixBQUV1QixBQUVqRDtBQUowQixBQUNuQjtBQUlYO0FBNUNrQjs7Y0FBQSxBQThDbkIsdUJBQXVCLFVBQUEsQUFBQyxPQUFVLEFBQzlCO2dCQUFJLE1BQUEsQUFBSyxRQUFULEFBQWlCLFVBQVUsQUFDdkI7b0JBQUksVUFBVSxNQUFBLEFBQU0sT0FBcEIsQUFBMkIsQUFFM0I7O3NCQUFBLEFBQUssUUFBTCxBQUFhLGVBQWIsQUFBNEIsU0FBNUIsQUFBcUMsU0FBckMsQUFBOEMsY0FBOUMsQUFBNEQsQUFDNUQ7c0JBQUEsQUFBSyxBQUVMOztzQkFBQSxBQUFLLGdCQUFMLEFBQXFCLHFCQUFyQixBQUEwQyxTQUFTLFVBQUEsQUFBQyxhQUFnQixBQUNoRTt3QkFBSSxlQUFlLG1CQUFBLEFBQVMsTUFBNUIsQUFBa0MsYUFBYSxBQUMzQzs4QkFBQSxBQUFLLFFBQUwsQUFBYSxlQUFiLEFBQTRCLFNBQTVCLEFBQXFDLFNBQXJDLEFBQThDLGNBQTlDLEFBQTRELEFBQzVEOzhCQUFBLEFBQUssQUFDUjtBQUhELCtCQUdXLGVBQWUsbUJBQUEsQUFBUyxNQUE1QixBQUFrQyxVQUFVLEFBQy9DOzhCQUFBLEFBQUssUUFBTCxBQUFhLGVBQWIsQUFBNEIsU0FBNUIsQUFBcUMsU0FBckMsQUFBOEMsY0FBOUMsQUFBNEQsQUFDNUQ7OEJBQUEsQUFBSyxBQUNSO0FBSE0scUJBQUEsTUFHQSxJQUFJLGVBQWUsbUJBQUEsQUFBUyxNQUE1QixBQUFrQyxZQUFZLEFBQ2pEOzhCQUFBLEFBQUssUUFBTCxBQUFhLGVBQWIsQUFBNEIsU0FBNUIsQUFBcUMsU0FBckMsQUFBOEMsY0FBOUMsQUFBNEQsQUFDNUQ7OEJBQUEsQUFBSyxRQUFMLEFBQWEsZUFBYixBQUE0QixTQUE1QixBQUFxQyxTQUFyQyxBQUE4QyxlQUFlLG1CQUFBLEFBQVMsYUFBdEUsQUFBbUYsQUFDbkY7OEJBQUEsQUFBSyxTQUFTLEVBQUMsa0JBQWtCLE1BQUEsQUFBSyxRQUFMLEFBQWEsZUFBOUMsQUFBYyxBQUErQyxBQUNoRTtBQUNKO0FBWkQsQUFhSDtBQW5CRCxtQkFtQk8sQUFDSDt3Q0FBQSxBQUFjOzRCQUNGLG1CQUFBLEFBQVMsTUFERSxBQUNJLEFBQ3ZCOzZCQUFTLGlCQUFlLG1CQUFmLEFBQXdCLFdBRnJDLEFBQXVCLEFBRXVCLEFBRWpEO0FBSjBCLEFBQ25CO0FBSVg7QUF4RWtCOztjQUFBLEFBMEVuQixrQkFBa0IsVUFBQSxBQUFDLFNBQUQsQUFBVSxPQUFVLEFBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtvQ0FBQSxBQUFjO3dCQUNGLG1CQUFBLEFBQVMsT0FERSxBQUNLLEFBQ3hCO3NCQUZKLEFBQXVCLEFBRWIsQUFFVjtBQUp1QixBQUNuQjtrQkFHSixBQUFLLFNBQVMsRUFBQyxpQkFBZixBQUFjLEFBQWtCLEFBRW5DO0FBekZrQixBQUVmOztjQUFBLEFBQUssVUFBVSxNQUFmLEFBQXFCLEFBQ3JCO2NBQUEsQUFBSyxrQkFBa0IsTUFBdkIsQUFBNkIsQUFDN0I7Y0FBQSxBQUFLLFFBQVEsRUFBQyxrQkFBRCxBQUFtQixJQUFJLGFBQXZCLEFBQW9DLElBQUksaUJBSnRDLEFBSWYsQUFBYSxBQUF5RDtlQUN6RTs7Ozs7d0NBSWMsQUFDWDtnQkFBSSxrQkFBa0IsS0FBQSxBQUFLLFFBQUwsQUFBYSxlQUFuQyxBQUFrRCxBQUNsRDtnQkFBSSxlQUFKLEFBQW1CLEFBQ25CO2lCQUFJLElBQUksSUFBUixBQUFZLEdBQUcsSUFBSSxnQkFBbkIsQUFBbUMsUUFBbkMsQUFBMkMsS0FBSyxBQUM1QztvQkFBRyxnQkFBQSxBQUFnQixHQUFoQixBQUFtQixpQkFBaUIsT0FBQSxBQUFPLGFBQTNDLEFBQXdELFdBQVcsZ0JBQUEsQUFBZ0IsTUFBTSxpQkFBQSxBQUFPLElBQW5HLEFBQXVHLGlCQUFnQixBQUNuSDtpQ0FBQSxBQUFhLEtBQUssZ0JBQWxCLEFBQWtCLEFBQWdCLEFBQ3JDO0FBQ0o7QUFDRDtBQUNBO2lCQUFBLEFBQUssU0FBUyxFQUFDLGtCQUFmLEFBQWMsQUFBbUIsQUFDcEM7Ozs7NENBRW1CO3lCQUNoQjs7QUFDQTtpQkFBQSxBQUFLLEFBRUw7O29DQUFBLEFBQWMsU0FBUyxVQUFBLEFBQUMsU0FBWSxBQUNoQztvQkFBSSxRQUFBLEFBQVEsVUFBVSxtQkFBQSxBQUFTLE1BQS9CLEFBQXFDLHNCQUFzQixBQUV2RDs7MkJBQUEsQUFBSyxBQUNSO0FBQ0o7QUFMRCxBQU1IOzs7O2lDQTREUTtnQkFBQSxBQUNHLG1CQUFxQixLQUR4QixBQUM2QixNQUQ3QixBQUNHO2dCQURILEFBRUUsU0FBVSxLQUZaLEFBRWlCLE1BRmpCLEFBRUUsQUFDUDs7Z0JBQUEsQUFBSSxBQUVKOztnQkFBSSxlQUFKLEFBQW1CLEFBRW5COztnQkFBSSxvQkFBSixBQUF3QixXQUFXLEFBQy9COzs7a0NBQWU7b0NBQWYsQUFBZSxBQUNsQjtBQURrQjtBQUFBLGlCQUFBO0FBRG5CLHVCQUdJLGlCQUFBLEFBQWlCLFVBQXJCLEFBQStCLEdBQUcsQUFDOUI7NkJBQUEsQUFBYSxxQkFDUixjQUFELHNCQUFBLEFBQU0sUUFBSyxLQUFLLGFBQWhCLEFBQTZCO2tDQUE3QjtvQ0FBQSxBQUNJO0FBREo7aUJBQUEsa0JBQ0ssY0FBRCxzQkFBQSxBQUFNOztrQ0FBTjtvQ0FBQSxBQUNJO0FBREo7QUFBQSxtQ0FDSyxjQUFELHNCQUFBLEFBQU07O2tDQUFOO29DQUFBO0FBQUE7QUFBQSxtQkFIWixBQUNJLEFBQ0ksQUFDSSxBQUlaOzhDQUFlLEFBQUMsdUNBQUssV0FBTixNQUFnQixlQUFoQixBQUE4QjtrQ0FBOUI7b0NBQUEsQUFBd0M7QUFBeEM7aUJBQUEsRUFBZixBQUFlLEFBQ2xCO0FBVEQsYUFBQSxNQVNPLEFBQ0g7cUJBQUssSUFBSSxJQUFULEFBQVcsR0FBRSxJQUFFLGlCQUFmLEFBQWdDLFFBQWhDLEFBQXVDLEtBQUssQUFDeEM7d0JBQUksT0FBTyxLQUFBLEFBQUssUUFBTCxBQUFhLGVBQWIsQUFBNEIsU0FBUyxpQkFBaEQsQUFBVyxBQUFxQyxBQUFpQixBQUNqRTt3QkFBSSxxQkFBcUIsaUJBQUEsQUFBTyxJQUFQLEFBQVcsY0FBWCxBQUF5QixhQUFhLGlCQUEvRCxBQUErRCxBQUFpQixBQUNoRjt3QkFBQSxBQUFJLEFBQ0o7d0JBQUksS0FBQSxBQUFLLGdCQUFnQixtQkFBQSxBQUFTLGFBQWxDLEFBQStDLFlBQVksQUFDdkQ7OERBQ0ssY0FBRCxzQkFBQSxBQUFNLFdBQVEsU0FBZCxBQUFzQjswQ0FBdEI7NENBQUEsQUFDSTtBQURKO3lCQUFBLGtCQUNJLEFBQUMseUNBQU8sT0FBUixBQUFjLFVBQVMsU0FBUyxLQUFoQyxBQUFxQyxhQUFhLFVBQVUsS0FBNUQsQUFBaUUsQUFDN0Q7cUNBQVMsS0FEYixBQUNrQixzQkFBc0IsT0FBTyxpQkFEL0MsQUFDK0MsQUFBaUI7MENBRGhFOzRDQUFBO0FBQUE7MkJBREosQUFDSSxBQUVBLDJCQUFBLEFBQUMsd0NBQU8sS0FBSyx1QkFBYixBQUFvQyxBQUM1QjtxREFBUyxBQUFDLHlDQUFPLE9BQVIsQUFBYyxTQUFRLElBQXRCLEFBQXlCLEtBQUksTUFBN0IsQUFBbUMsb0JBQW9CLFFBQXZELEFBQThELFVBQVMsVUFBdkUsTUFBZ0YsTUFBaEYsQUFBcUY7OENBQXJGO2dEQURqQixBQUNpQixBQUNUO0FBRFM7NkJBQUE7cUNBRGpCLEFBRWdCOzswQ0FGaEI7NENBSlIsQUFDSSxBQUdJLEFBTVg7QUFOVzs7QUFMWiwrQkFXVyxLQUFBLEFBQUssZ0JBQWdCLG1CQUFBLEFBQVMsYUFBbEMsQUFBK0MsV0FBVyxBQUM3RDs4REFDSyxjQUFELHNCQUFBLEFBQU0sV0FBUSxTQUFkLEFBQXNCOzBDQUF0Qjs0Q0FBQSxBQUNJO0FBREo7eUJBQUEsa0JBQ0ksQUFBQyx3Q0FBTyxLQUFLLGdCQUFiLEFBQTZCLEFBQ3JCO3FEQUFTLEFBQUMseUNBQU8sT0FBUixBQUFjLFVBQVMsVUFBdkIsTUFBZ0MsTUFBaEMsQUFBcUM7OENBQXJDO2dEQURqQixBQUNpQixBQUNUO0FBRFM7NkJBQUE7cUNBRGpCLEFBRWdCOzswQ0FGaEI7NENBREosQUFDSSxBQUlBO0FBSkE7NENBSUEsQUFBQyx3Q0FBTyxLQUFLLHVCQUFiLEFBQW9DLEFBQzVCO3FEQUFTLEFBQUMseUNBQU8sT0FBUixBQUFjLFNBQVEsSUFBdEIsQUFBeUIsS0FBSSxNQUE3QixBQUFtQyxvQkFBb0IsUUFBdkQsQUFBOEQsVUFBUyxVQUF2RSxNQUFnRixNQUFoRixBQUFxRjs4Q0FBckY7Z0RBRGpCLEFBQ2lCLEFBQ1Q7QUFEUzs2QkFBQTtxQ0FEakIsQUFFZ0I7OzBDQUZoQjs0Q0FOUixBQUNJLEFBS0ksQUFNWDtBQU5XOztBQVBMLHFCQUFBLE1BYUEsQUFDSDs4REFDSyxjQUFELHNCQUFBLEFBQU0sV0FBUSxTQUFkLEFBQXNCOzBDQUF0Qjs0Q0FBQSxBQUNJO0FBREo7eUJBQUEsa0JBQ0ksQUFBQyx3Q0FBTyxLQUFLLHVCQUFiLEFBQW9DLEFBQzVCO3FEQUFTLEFBQUMseUNBQU8sT0FBUixBQUFjLFNBQVEsSUFBdEIsQUFBeUIsS0FBSSxNQUE3QixBQUFtQyxvQkFBb0IsUUFBdkQsQUFBOEQsVUFBUyxVQUF2RSxNQUFnRixNQUFoRixBQUFxRjs4Q0FBckY7Z0RBRGpCLEFBQ2lCLEFBQ1Q7QUFEUzs2QkFBQTtxQ0FEakIsQUFFZ0I7OzBDQUZoQjs0Q0FGUixBQUNJLEFBQ0ksQUFNWDtBQU5XOztBQVFaOzt3QkFBSSxVQUFVLGlCQUFkLEFBQWMsQUFBaUIsQUFDL0I7aUNBQUEsQUFBYSxxQkFDUixjQUFELHNCQUFBLEFBQU0sUUFBSyxRQUFRLFdBQVcsS0FBQSxBQUFLLE1BQW5DLEFBQXlDLGlCQUFpQixLQUFLLGFBQS9ELEFBQTRFLEdBQUcsT0FBL0UsQUFBc0YsU0FBUyxTQUFTLEtBQUEsQUFBSyxnQkFBTCxBQUFxQixLQUFyQixBQUEwQixNQUFsSSxBQUF3RyxBQUErQjtzQ0FBdkk7d0NBQUEsQUFDSTtBQURKO3FCQUFBLGtCQUNJLEFBQUMsd0NBQU0sUUFBUCxNQUFjLEtBQUssS0FBQSxBQUFLLFlBQVksS0FBakIsQUFBc0IsWUFBekMsQUFBcUQ7c0NBQXJEO3dDQURKLEFBQ0ksQUFDQTtBQURBO3dDQUNDLGNBQUQsc0JBQUEsQUFBTTs7c0NBQU47d0NBQUEsQUFDSTtBQURKO0FBQUEsdUNBQ0ssY0FBRCxzQkFBQSxBQUFNOztzQ0FBTjt3Q0FBQSxBQUNLO0FBREw7QUFBQSw0QkFDSyxBQUFLLE9BQU8sS0FBWixBQUFpQixPQUFPLFFBQUEsQUFBUSxPQUFSLEFBQWUsR0FGaEQsQUFDSSxBQUM2QixBQUFrQixBQUU5QyxjQUFBLEFBQVEsT0FBUixBQUFlLEdBQWYsQUFBaUIsTUFOMUIsQUFFSSxBQUk0QixBQUUzQixRQVRULEFBQ0ksQUFXUDtBQUNEOzhDQUFlLEFBQUMsdUNBQUssV0FBTixNQUFnQixlQUFoQixBQUE4QjtrQ0FBOUI7b0NBQUEsQUFBd0M7QUFBeEM7aUJBQUEsRUFBZixBQUFlLEFBQ2xCO0FBRUQ7O21DQUNJLGNBQUEsU0FBSyxPQUFPLEVBQUMsT0FBYixBQUFZLEFBQVE7OEJBQXBCO2dDQUFBLEFBQ0k7QUFESjthQUFBLGtCQUNJLGNBQUEsU0FBSyxPQUFPLEVBQUMsUUFBRCxBQUFTLElBQUksT0FBekIsQUFBWSxBQUFvQjs4QkFBaEM7Z0NBQUEsQUFDQTtBQURBOytCQUNBLEFBQUMsMkNBQWdCLGlCQUFpQixLQUFsQyxBQUF1QyxpQkFBaUIsZ0JBQWdCLEtBQUEsQUFBSyxRQUE3RSxBQUFxRjs4QkFBckY7Z0NBREEsQUFDQSxBQUNBO0FBREE7Z0NBQ0EsQUFBQyx5Q0FBTyxJQUFSLEFBQVcsTUFBSyxPQUFPLEVBQUMsT0FBeEIsQUFBdUIsQUFBUTs4QkFBL0I7Z0NBQUE7QUFBQTtlQUhKLEFBQ0ksQUFFQSxBQUVBLGtDQUFBLGNBQUEsU0FBSyxPQUFPLEVBQUMsUUFBUSxTQUFULEFBQWtCLElBQUksVUFBdEIsQUFBZ0MsUUFBUSxPQUF4QyxBQUErQyxRQUFRLE9BQW5FLEFBQVksQUFBNkQ7OEJBQXpFO2dDQUFBLEFBQ0s7QUFETDtlQU5SLEFBQ0ksQUFLSSxBQUtYOzs7OztBQW5McUIsQSxBQXNMMUI7O2tCQUFBLEFBQWUiLCJmaWxlIjoiQ29udGFjdExpc3QuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdmljdG9ycGhhbTE5OTcvV29ya3BsYWNlL1NVVEQvNTAwMzdfYmxvY2tjaGFpbi9ibG9ja2NoYWluLXByb2oifQ==

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "/home/victorpham1997/Workplace/SUTD/50037_blockchain/blockchain-proj/views/ContactList.js"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/home/victorpham1997/Workplace/SUTD/50037_blockchain/blockchain-proj/views/ContactList.js"); } } })();

/***/ }),

/***/ 803:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__resourceQuery) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = __webpack_require__(41);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(15);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(16);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(42);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(46);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(17);

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = __webpack_require__(409);

var _HeaderMenu = __webpack_require__(1055);

var _HeaderMenu2 = _interopRequireDefault(_HeaderMenu);

var _Login = __webpack_require__(1326);

var _Login2 = _interopRequireDefault(_Login);

var _web = __webpack_require__(420);

var _web2 = _interopRequireDefault(_web);

var _EnterPrivateKeyModal = __webpack_require__(1327);

var _EnterPrivateKeyModal2 = _interopRequireDefault(_EnterPrivateKeyModal);

var _UpdateProfileModal = __webpack_require__(1328);

var _UpdateProfileModal2 = _interopRequireDefault(_UpdateProfileModal);

var _GuideModal = __webpack_require__(1329);

var _GuideModal2 = _interopRequireDefault(_GuideModal);

var _head = __webpack_require__(192);

var _head2 = _interopRequireDefault(_head);

var _AppManager = __webpack_require__(1330);

var _AppManager2 = _interopRequireDefault(_AppManager);

var _ContactList = __webpack_require__(801);

var _ContactList2 = _interopRequireDefault(_ContactList);

var _Chat = __webpack_require__(1354);

var _Chat2 = _interopRequireDefault(_Chat);

var _ErrorModal = __webpack_require__(1355);

var _ErrorModal2 = _interopRequireDefault(_ErrorModal);

var _SettingsModal = __webpack_require__(1356);

var _SettingsModal2 = _interopRequireDefault(_SettingsModal);

var _TransactionModal = __webpack_require__(1357);

var _TransactionModal2 = _interopRequireDefault(_TransactionModal);

var _Footer = __webpack_require__(1358);

var _Footer2 = _interopRequireDefault(_Footer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/home/victorpham1997/Workplace/SUTD/50037_blockchain/blockchain-proj/pages/index.js?entry';
// Copyright (c) 2018 Nguyen Vu Nhat Minh
// Distributed under the MIT software license, see the accompanying file LICENSE

var Index = function (_Component) {
    (0, _inherits3.default)(Index, _Component);

    function Index(props) {
        (0, _classCallCheck3.default)(this, Index);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Index.__proto__ || (0, _getPrototypeOf2.default)(Index)).call(this, props));

        _this.state = { width: 0, height: 0, contactList: [], messages: [], selectedContact: "" };
        _this.updateWindowDimensions = _this.updateWindowDimensions.bind(_this);
        _this.app = new _AppManager2.default();
        return _this;
    }

    (0, _createClass3.default)(Index, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.updateWindowDimensions();
            window.addEventListener('resize', this.updateWindowDimensions);
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.app.initialize();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            window.removeEventListener('resize', this.updateWindowDimensions);
        }
    }, {
        key: 'updateWindowDimensions',
        value: function updateWindowDimensions() {
            this.setState({ width: window.innerWidth, height: window.innerHeight });
        }
    }, {
        key: 'render',
        value: function render() {
            var account = this.app.account;
            var contractManager = this.app.contractManager;
            var transactionDispatcher = this.app.getTransactionDispatcher();

            var listHeight = this.state.height - 140;

            console.log(account);

            if (account.isJoined) {
                console.log("WTF WRE U DOING HERE");
                this.app.storageManager.reload = false;
                return _react2.default.createElement(_semanticUiReact.Container, {
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 70
                    }
                }, _react2.default.createElement(_head2.default, {
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 71
                    }
                }, _react2.default.createElement('title', {
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 72
                    }
                }, 'EtherChat - Decentralized messaging on Ethereum network')), _react2.default.createElement(_UpdateProfileModal2.default, { account: account, contractManager: contractManager, __source: {
                        fileName: _jsxFileName,
                        lineNumber: 75
                    }
                }), _react2.default.createElement(_EnterPrivateKeyModal2.default, { account: account, __source: {
                        fileName: _jsxFileName,
                        lineNumber: 76
                    }
                }), _react2.default.createElement(_HeaderMenu2.default, { account: account, transactionDispatcher: transactionDispatcher, __source: {
                        fileName: _jsxFileName,
                        lineNumber: 77
                    }
                }), _react2.default.createElement(_ErrorModal2.default, {
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 78
                    }
                }), _react2.default.createElement(_SettingsModal2.default, { account: account, __source: {
                        fileName: _jsxFileName,
                        lineNumber: 79
                    }
                }), _react2.default.createElement(_TransactionModal2.default, { dispatcher: transactionDispatcher, __source: {
                        fileName: _jsxFileName,
                        lineNumber: 80
                    }
                }), _react2.default.createElement(_semanticUiReact.Grid, { column: 2, style: { paddingTop: 50, width: "100%" }, __source: {
                        fileName: _jsxFileName,
                        lineNumber: 81
                    }
                }, _react2.default.createElement(_semanticUiReact.Grid.Row, { stretched: true, __source: {
                        fileName: _jsxFileName,
                        lineNumber: 82
                    }
                }, _react2.default.createElement(_semanticUiReact.Grid.Column, { width: 6, style: { height: listHeight + "px", float: 'left' }, __source: {
                        fileName: _jsxFileName,
                        lineNumber: 83
                    }
                }, _react2.default.createElement(_ContactList2.default, { height: listHeight, account: account, contractManager: contractManager, __source: {
                        fileName: _jsxFileName,
                        lineNumber: 84
                    }
                })), _react2.default.createElement(_semanticUiReact.Grid.Column, { width: 10, style: { height: listHeight + "px", overflow: 'auto', float: 'left' }, __source: {
                        fileName: _jsxFileName,
                        lineNumber: 86
                    }
                }, _react2.default.createElement(_Chat2.default, { height: listHeight, account: account, contractManager: contractManager, __source: {
                        fileName: _jsxFileName,
                        lineNumber: 87
                    }
                })))));
            } else {
                return _react2.default.createElement(_Login2.default, { account: account, storageManager: this.app.storageManager, contractManager: contractManager, __source: {
                        fileName: _jsxFileName,
                        lineNumber: 97
                    }
                });
            }
        }
    }]);

    return Index;
}(_react.Component);

exports.default = Index;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL2luZGV4LmpzIl0sIm5hbWVzIjpbIkNvbXBvbmVudCIsIkJ1dHRvbiIsIkNvbnRhaW5lciIsIkxpc3QiLCJJbWFnZSIsIkdyaWQiLCJNZXNzYWdlIiwiUmFpbCIsIlN0aWNreSIsIklucHV0IiwiU2VnbWVudCIsIkhlYWRlck1lbnUiLCJMb2dpbiIsIndlYjMiLCJQcml2YXRlS2V5TW9kYWwiLCJVcGRhdGVQcm9maWxlTW9kYWwiLCJHdWlkZU1vZGFsIiwiSGVhZCIsIkFwcE1hbmFnZXIiLCJDb250YWN0TGlzdCIsIkNoYXQiLCJFcnJvck1vZGFsIiwiU2V0dGluZ3NNb2RhbCIsIlRyYW5zYWN0aW9uTW9kYWwiLCJGb290ZXIiLCJJbmRleCIsInByb3BzIiwic3RhdGUiLCJ3aWR0aCIsImhlaWdodCIsImNvbnRhY3RMaXN0IiwibWVzc2FnZXMiLCJzZWxlY3RlZENvbnRhY3QiLCJ1cGRhdGVXaW5kb3dEaW1lbnNpb25zIiwiYmluZCIsImFwcCIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJpbml0aWFsaXplIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInNldFN0YXRlIiwiaW5uZXJXaWR0aCIsImlubmVySGVpZ2h0IiwiYWNjb3VudCIsImNvbnRyYWN0TWFuYWdlciIsInRyYW5zYWN0aW9uRGlzcGF0Y2hlciIsImdldFRyYW5zYWN0aW9uRGlzcGF0Y2hlciIsImxpc3RIZWlnaHQiLCJjb25zb2xlIiwibG9nIiwiaXNKb2luZWQiLCJzdG9yYWdlTWFuYWdlciIsInJlbG9hZCIsInBhZGRpbmdUb3AiLCJmbG9hdCIsIm92ZXJmbG93Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJQSxBQUNJLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBOztBQUVKLEFBQU8sQUFBZ0I7Ozs7QUFDdkIsQUFBTyxBQUFXOzs7O0FBQ2xCLEFBQU8sQUFBVTs7OztBQUNqQixBQUFPLEFBQXFC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QThCLEFBQW1DO2tDQUFqRTtvQ0FBQSxBQUNJO0FBREo7bUNBQ0ksQUFBQyx1Q0FBWSxRQUFiLEFBQXFCLFlBQVksU0FBakMsQUFBMEMsU0FBUyxpQkFBbkQsQUFBb0U7a0NBQXBFO29DQUZSLEFBQ0ksQUFDSSxBQUVKO0FBRkk7cUNBRUgsY0FBRCxzQkFBQSxBQUFNLFVBQU8sT0FBYixBQUFvQixJQUFJLE9BQU8sRUFBQyxRQUFRLGFBQVQsQUFBc0IsTUFBTSxVQUE1QixBQUFzQyxRQUFRLE9BQTdFLEFBQStCLEFBQXFEO2tDQUFwRjtvQ0FBQSxBQUNJO0FBREo7bUNBQ0ksQUFBQyxnQ0FBSyxRQUFOLEFBQWMsWUFBWSxTQUExQixBQUFtQyxTQUFTLGlCQUE1QyxBQUE2RDtrQ0FBN0Q7b0NBbEJoQixBQUNJLEFBV0EsQUFDSSxBQUlJLEFBQ0ksQUFPbkI7QUFQbUI7O0FBckJwQixtQkE0QkssQUFDRDt1Q0FFSSxBQUFDLGlDQUFNLFNBQVAsQUFBZ0IsU0FBUyxnQkFBZ0IsS0FBQSxBQUFLLElBQTlDLEFBQWtELGdCQUFnQixpQkFBbEUsQUFBbUY7a0NBQW5GO29DQUZKLEFBRUksQUFJUDtBQUpPO2lCQUFBO0FBTVg7Ozs7O0FBdkVlLEEsQUEwRXBCOztrQkFBQSxBQUFlIiwiZmlsZSI6ImluZGV4LmpzP2VudHJ5Iiwic291cmNlUm9vdCI6Ii9ob21lL3ZpY3RvcnBoYW0xOTk3L1dvcmtwbGFjZS9TVVRELzUwMDM3X2Jsb2NrY2hhaW4vYmxvY2tjaGFpbi1wcm9qIn0=

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "/home/victorpham1997/Workplace/SUTD/50037_blockchain/blockchain-proj/pages/index.js"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/home/victorpham1997/Workplace/SUTD/50037_blockchain/blockchain-proj/pages/index.js"); } } })();
    (function (Component, route) {
      if (false) return
      if (false) return

      var qs = __webpack_require__(83)
      var params = qs.parse(__resourceQuery.slice(1))
      if (params.entry == null) return

      module.hot.accept()
      Component.__route = route

      if (module.hot.status() === 'idle') return

      var components = next.router.components
      for (var r in components) {
        if (!components.hasOwnProperty(r)) continue

        if (components[r].Component.__route === route) {
          next.router.update(r, Component)
        }
      }
    })(typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__.default : (module.exports.default || module.exports), "/")
  
/* WEBPACK VAR INJECTION */}.call(exports, "?entry"))

/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNS41YjEzYmQyYjQ2YzJhYjExN2I2Yi5ob3QtdXBkYXRlLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vdmlld3MvSGVhZGVyTWVudS5qcz9mYjljMWY1Iiwid2VicGFjazovLy8uL3ZpZXdzL0xvZ2luLmpzP2U5OWY1NGIiLCJ3ZWJwYWNrOi8vLy4vdmlld3MvbW9kYWxzL0FkZENvbnRhY3RNb2RhbC5qcz9lOTlmNTRiIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZWQtanN4L3N0eWxlLmpzP2U5OWY1NGIiLCJ3ZWJwYWNrOi8vLy4vdmlld3MvQ29udGFjdExpc3QuanM/MmE5NjE3NiIsIndlYnBhY2s6Ly8vLi9wYWdlcz8yYTk2MTc2Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOCBOZ3V5ZW4gVnUgTmhhdCBNaW5oXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgTUlUIHNvZnR3YXJlIGxpY2Vuc2UsIHNlZSB0aGUgYWNjb21wYW55aW5nIGZpbGUgTElDRU5TRVxuXG5pbXBvcnQge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtcbiAgICBNZW51LFxuICAgIENvbnRhaW5lcixcbiAgICBCdXR0b24sXG4gICAgTGFiZWwsXG4gICAgTG9hZGVyLFxuICAgIExpc3QsXG4gICAgSW1hZ2UsXG4gICAgSWNvbixcbiAgICBEcm9wZG93blxufSBmcm9tICdzZW1hbnRpYy11aS1yZWFjdCc7XG5pbXBvcnQgSGVhZCBmcm9tICduZXh0L2hlYWQnO1xuaW1wb3J0IHdlYjMgZnJvbSAnLi4vZXRoZXJldW0vd2ViMyc7XG5pbXBvcnQgQ29uc3RhbnQgZnJvbSAnLi4vc3VwcG9ydC9Db25zdGFudCc7XG5pbXBvcnQgQ29uZmlnIGZyb20gJy4uL3N1cHBvcnQvQ29uZmlnJztcbmltcG9ydCBhcHBEaXNwYXRjaGVyIGZyb20gJy4uL2NvcmUvQXBwRGlzcGF0Y2hlcic7XG5cbmNsYXNzIEhlYWRlck1lbnUgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgdGhpcy5hY2NvdW50ID0gcHJvcHMuYWNjb3VudDtcbiAgICAgICAgdGhpcy5jb250cmFjdE1hbmFnZXIgPSBwcm9wcy5jb250cmFjdE1hbmFnZXI7XG4gICAgICAgIHRoaXMudHJhbnNhY3Rpb25EaXNwYXRjaGVyID0gcHJvcHMudHJhbnNhY3Rpb25EaXNwYXRjaGVyO1xuICAgICAgICB0aGlzLnN0YXRlID0ge2FkZHJlc3M6IFwiXCIsIGJhbGFuY2U6IFwiXCIsIG5hbWU6IFwiXCIsIFxuICAgICAgICAgICAgYXZhdGFyVXJsOiBcIlwiLCBpc0xvYWRpbmc6IHRydWUsIGlzSm9pbkJ1dHRvbkxvYWRpbmc6IGZhbHNlLCBcbiAgICAgICAgICAgIGlzSm9pbmVkOiBmYWxzZSwgbnVtUGVuZGluZ1R4OiAwfTtcbiAgICAgICAgdGhpcy5yZWxvYWRDb3VudCA9IDA7XG4gICAgfVxuXG4gICAgY2xlYXJBbGxEYXRhID0gKCkgPT4ge1xuICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLmNsZWFyKCk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIGlmICh0aGlzLmFjY291bnQpIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0QWNjb3VudEluZm8oKTtcbiAgICAgICAgICAgIGFwcERpc3BhdGNoZXIucmVnaXN0ZXIoKHBheWxvYWQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocGF5bG9hZC5hY3Rpb24gPT0gQ29uc3RhbnQuRVZFTlQuQUNDT1VOVF9CQUxBTkNFX1VQREFURUQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7YmFsYW5jZTogdGhpcy5hY2NvdW50LmJhbGFuY2V9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBheWxvYWQuYWN0aW9uID09IENvbnN0YW50LkVWRU5ULkFDQ09VTlRfSU5GT19VUERBVEVEKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe25hbWU6IHBheWxvYWQucHJvZmlsZS5uYW1lLCBhdmF0YXJVcmw6IHBheWxvYWQucHJvZmlsZS5hdmF0YXJVcmwsIGlzSm9pbmVkOiBwYXlsb2FkLnByb2ZpbGUuaXNKb2luZWR9KTtcbiAgICAgICAgICAgICAgICB9IFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnRyYW5zYWN0aW9uRGlzcGF0Y2hlci5yZWdpc3RlcigocGF5bG9hZCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChwYXlsb2FkLmFjdGlvbiA9PSBDb25zdGFudC5FVkVOVC5QRU5ESU5HX1RSQU5TQUNUSU9OX1VQREFURUQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7bnVtUGVuZGluZ1R4OiBwYXlsb2FkLm51bVBlbmRpbmdUeH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0QWNjb3VudEluZm8gPSAoKSA9PiB7XG4gICAgICAgIHZhciBhZGRyZXNzID0gdGhpcy5hY2NvdW50LmdldEFkZHJlc3MoKTtcbiAgICAgICAgaWYgKGFkZHJlc3MpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2FkZHJlc3M6IGFkZHJlc3MsIGJhbGFuY2U6IHRoaXMuYWNjb3VudC5iYWxhbmNlLCBpc0xvYWRpbmc6IGZhbHNlLCBpc0pvaW5lZDogdGhpcy5hY2NvdW50LmlzSm9pbmVkfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5yZWxvYWRDb3VudCA9PSAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aXNMb2FkaW5nOiBmYWxzZX0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbG9hZENvdW50Kys7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCh0aGlzLmdldEFjY291bnRJbmZvLCA4MDApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlRHJvcGRvd25DbGlja2VkID0gKGV2ZW50LCBkYXRhKSA9PiB7XG4gICAgICAgIHRoaXMuY2xlYXJBbGxEYXRhKCk7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTsgXG4gICAgfVxuXG4gICAgcmVtb3ZlTmV0d29ya0RlcGVuZGVudERhdGEgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuYWNjb3VudC5zdG9yYWdlTWFuYWdlci5yZW1vdmVOZXR3b3JrRGVwZW5kZW50RGF0YSgpO1xuICAgIH1cblxuICAgIGhhbmRsZUpvaW5DbGlja2VkID0gKCkgPT4ge1xuICAgICAgICB2YXIgcHVibGljS2V5QnVmZmVyID0gdGhpcy5hY2NvdW50LmdldFB1YmxpY0tleUJ1ZmZlcigpO1xuICAgICAgICB0aGlzLmNvbnRyYWN0TWFuYWdlci5qb2luQ29udHJhY3QocHVibGljS2V5QnVmZmVyLCAocmVzdWx0RXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlmIChyZXN1bHRFdmVudCA9PSBDb25zdGFudC5FVkVOVC5PTl9SRUpFQ1RFRCB8fCByZXN1bHRFdmVudCA9PSBDb25zdGFudC5FVkVOVC5PTl9FUlJPUikge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2lzSm9pbkJ1dHRvbkxvYWRpbmc6IGZhbHNlfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJlc3VsdEV2ZW50ID09IENvbnN0YW50LkVWRU5ULk9OX1JFQ0VJUFQpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtpc0pvaW5CdXR0b25Mb2FkaW5nOiB0cnVlfSk7XG4gICAgfVxuXG4gICAgaGFuZGxlSW1wb3J0UHJpdmF0ZUtleUNsaWNrZWQgPSAoKSA9PiB7XG4gICAgICAgIGFwcERpc3BhdGNoZXIuZGlzcGF0Y2goe1xuICAgICAgICAgICAgYWN0aW9uOiBDb25zdGFudC5BQ1RJT04uT1BFTl9QUklWQVRFX0tFWV9NT0RBTFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHZhciBhY2NvdW50SW5mbyA9ICg8ZGl2PjwvZGl2Pik7XG5cbiAgICAgICAgaWYgKHRoaXMuYWNjb3VudCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUuaXNMb2FkaW5nID09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUuYWRkcmVzcykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgYWRkcmVzc0V4cGxvcmVyVXJsID0gQ29uZmlnLkVOVi5FeHBsb3JlclVybCArICdhZGRyZXNzLycgKyB0aGlzLnN0YXRlLmFkZHJlc3M7XG4gICAgICAgICAgICAgICAgICAgIHZhciBkcm9wZG93blRyaWdnZXI7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUuYXZhdGFyVXJsKSB7IFxuICAgICAgICAgICAgICAgICAgICAgICAgZHJvcGRvd25UcmlnZ2VyID0gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPjxJbWFnZSBzcmM9e3RoaXMuc3RhdGUuYXZhdGFyVXJsfSBhdmF0YXIvPnsgdGhpcy5zdGF0ZS5uYW1lID8gdGhpcy5zdGF0ZS5uYW1lIDogdGhpcy5zdGF0ZS5hZGRyZXNzLnN1YnN0cigwLDEwKX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZHJvcGRvd25UcmlnZ2VyID0gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPjxJY29uIG5hbWU9J3VzZXInIHNpemU9J2xhcmdlJy8+eyB0aGlzLnN0YXRlLm5hbWUgPyB0aGlzLnN0YXRlLm5hbWUgOiB0aGlzLnN0YXRlLmFkZHJlc3Muc3Vic3RyKDAsMTApfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB2YXIgbmV0d29ya0l0ZW1zID0gW107XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGk9MDtpPENvbmZpZy5ORVRXT1JLX0xJU1QubGVuZ3RoO2krKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV0d29ya0l0ZW1zLnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPERyb3Bkb3duLkl0ZW0ga2V5PXsnbmV0d29ya0l0ZW0nICsgaX0gbmV0d29ya2lkPXtDb25maWcuTkVUV09SS19MSVNUW2ldLmlkfSBuYW1lPSdjaGFuZ2VFdGhOZXR3b3JrJyBvbkNsaWNrPXt0aGlzLmhhbmRsZURyb3Bkb3duQ2xpY2tlZH0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtDb25maWcuTkVUV09SS19MSVNUW2ldLm5hbWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Ecm9wZG93bi5JdGVtPlxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHZhciBtZW1iZXJJbmZvO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5hY2NvdW50LmlzSm9pbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtZW1iZXJJbmZvID0gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdsb2dPdXQnIG5hbWU9J2xvZ091dEl0ZW0nIG9uQ2xpY2s9e3RoaXMuaGFuZGxlRHJvcGRvd25DbGlja2VkfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEljb24gbmFtZT0nbG9nIG91dCcvPkxvZyBvdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzdHlsZSBqc3g+e2BcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubG9nT3V0OmhvdmVye1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJzb3I6cG9pbnRlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGB9PC9zdHlsZT4gICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWVtYmVySW5mbyA9IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIGNvbG9yPSdvcmFuZ2UnIG9uQ2xpY2s9e3RoaXMuaGFuZGxlSm9pbkNsaWNrZWR9IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2FkaW5nPXt0aGlzLnN0YXRlLmlzSm9pbkJ1dHRvbkxvYWRpbmd9IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17dGhpcy5zdGF0ZS5pc0pvaW5CdXR0b25Mb2FkaW5nfT5Kb2luIHtDb25zdGFudC5BUFBfTkFNRX08L0J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB2YXIgcGVuZGluZ1R4SXRlbTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUubnVtUGVuZGluZ1R4ID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGVuZGluZ1R4SXRlbSA9IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TGFiZWwgYXM9J2EnIGNvbG9yPSd5ZWxsb3cnIGhyZWY9e2FkZHJlc3NFeHBsb3JlclVybH0gdGFyZ2V0PSdfYmxhbmsnPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8SWNvbiBuYW1lPSdzcGlubmVyJyBsb2FkaW5nLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMuc3RhdGUubnVtUGVuZGluZ1R4fSBwZW5kaW5nIHR4XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9MYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBhY2NvdW50SW5mbyA9IChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxNZW51Lk1lbnUgcG9zaXRpb249J3JpZ2h0ICc+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPE1lbnUuSXRlbT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPExpc3Q+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxMaXN0Lkl0ZW0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPXthZGRyZXNzRXhwbG9yZXJVcmx9IHRhcmdldD0nX2JsYW5rJz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS5hZGRyZXNzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0xpc3QuSXRlbT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPExpc3QuSXRlbT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEJhbGFuY2U6IDxMYWJlbCBhcz0nYScgaHJlZj17YWRkcmVzc0V4cGxvcmVyVXJsfSB0YXJnZXQ9J19ibGFuaycgY29sb3I9J29yYW5nZSc+e3BhcnNlRmxvYXQod2ViMy51dGlscy5mcm9tV2VpKFwiXCIgK3RoaXMuc3RhdGUuYmFsYW5jZSwgJ2V0aGVyJykpLnRvRml4ZWQoOCkgKyAnIEVUSCcgfTwvTGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cGVuZGluZ1R4SXRlbX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9MaXN0Lkl0ZW0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvTGlzdD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L01lbnUuSXRlbT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TWVudS5JdGVtPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7bWVtYmVySW5mb31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L01lbnUuSXRlbT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvTWVudS5NZW51PlxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGFjY291bnRJbmZvID0gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPE1lbnUuTWVudSBwb3NpdGlvbj0ncmlnaHQnPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxNZW51Lkl0ZW0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxCdXR0b24gb25DbGljaz17dGhpcy5oYW5kbGVJbXBvcnRQcml2YXRlS2V5Q2xpY2tlZH0gY29sb3I9J2JsdWUnPkltcG9ydCBwcml2YXRlIGtleTwvQnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvTWVudS5JdGVtPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9NZW51Lk1lbnU+XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhY2NvdW50SW5mbyA9ICg8TG9hZGVyIGludmVydGVkIGFjdGl2ZSAvPik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPE1lbnUgZml4ZWQ9J3RvcCcgY29sb3I9J2JsdWUnIGludmVydGVkPlxuICAgICAgICAgICAgICAgIDxIZWFkPlxuICAgICAgICAgICAgICAgIDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiBocmVmPVwiLy9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvc2VtYW50aWMtdWkvMi4yLjEyL3NlbWFudGljLm1pbi5jc3NcIj48L2xpbms+XG4gICAgICAgICAgICAgICAgPC9IZWFkPlxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLmFjY291bnQgPyBhY2NvdW50SW5mbzogKDxkaXY+PC9kaXY+KX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvTWVudT5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEhlYWRlck1lbnU7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdmlld3MvSGVhZGVyTWVudS5qcyIsImltcG9ydCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQge1xuICAgIElucHV0LFxuICAgIE1lc3NhZ2UsXG4gICAgQ29udGFpbmVyLFxuICAgIEJ1dHRvbixcbiAgICBIZWFkZXIsXG4gICAgSWNvblxufSBmcm9tICdzZW1hbnRpYy11aS1yZWFjdCc7XG5pbXBvcnQgSGVhZCBmcm9tICduZXh0L2hlYWQnO1xuaW1wb3J0IHdlYjMgZnJvbSAnLi4vZXRoZXJldW0vd2ViMyc7XG5pbXBvcnQgQ29uc3RhbnQgZnJvbSAnLi4vc3VwcG9ydC9Db25zdGFudCc7XG5pbXBvcnQgQ29uZmlnIGZyb20gJy4uL3N1cHBvcnQvQ29uZmlnJztcblxuY2xhc3MgTG9naW4gZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgdGhpcy5hY2NvdW50ID0gcHJvcHMuYWNjb3VudDtcbiAgICAgICAgdGhpcy5jb250cmFjdE1hbmFnZXIgPSBwcm9wcy5jb250cmFjdE1hbmFnZXI7XG4gICAgICAgIHRoaXMuc3RvcmFnZU1hbmFnZXIgPSBwcm9wcy5zdG9yYWdlTWFuYWdlcjtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtwcml2YXRlS2V5OiBcIlwiLCBlcnJvck1lc3NhZ2U6XCJcIiwgdHJhbnNpdGlvbk1lc3NhZ2U6XCJcIiwgd2FsbGV0QWRkcmVzczogXCJcIn07XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuc3RvcmFnZU1hbmFnZXIucmVsb2FkKTtcbiAgICAgICAgXG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIC8vIGF3YWl0IHRoaXMuc2xlZXAoMjAwMCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuc3RhdGUpO1xuICAgICAgICAvLyBpZih3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJyZWxvYWRcIik+IDApe1xuICAgICAgICAvLyB9XG4gICAgICAgIGNvbnNvbGUubG9nKHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInJlbG9hZFwiKSlcbiAgICAgICAgXG5cbiAgICB9XG5cbiAgICBoYW5kbGVCYWNrID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHt3YWxsZXRBZGRyZXNzIDogXCJcIiwgZXJyb3JNZXNzYWdlOiBcIlwiLCB0cmFuc2l0aW9uTWVzc2FnZTogXCJcIn0pO1xuICAgIH1cblxuICAgIHNsZWVwKG1zKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgbXMpKTtcbiAgICB9XG5cbiAgICBoYW5kbGVKb2luID0gYXN5bmMgKCkgPT57XG4gICAgICAgIGF3YWl0IHRoaXMuYWNjb3VudC5zdG9yZVByaXZhdGVLZXkodGhpcy5zdGF0ZS5wcml2YXRlS2V5KTtcbiAgICAgICAgYXdhaXQgdGhpcy5jb250cmFjdE1hbmFnZXIuZ2V0Q29udHJhY3QoKTtcbiAgICAgICAgdmFyIHggPSBhd2FpdCB0aGlzLmNvbnRyYWN0TWFuYWdlci5nZXRKb2luZWRBZGRyZXNzKCk7XG4gICAgICAgIGlmICh4PT0wKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiSm9pbmluZyB0aGUgbmV0d29ya1wiKTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3RyYW5zaXRpb25NZXNzYWdlOiBcIkpvaW5pbmcuLi5cIn0pXG4gICAgICAgICAgICB2YXIgcHVibGljS2V5QnVmZmVyID0gdGhpcy5hY2NvdW50LmdldFB1YmxpY0tleUJ1ZmZlcigpO1xuICAgICAgICAgICAgLy8gYXdhaXQgdGhpcy5jb250cmFjdE1hbmFnZXIuY2hlY2tBY2MoJzB4Jyt0aGlzLnN0YXRlLndhbGxldEFkZHJlc3MpO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5jb250cmFjdE1hbmFnZXIuam9pbkNvbnRyYWN0KHB1YmxpY0tleUJ1ZmZlciwgICAocmVzdWx0RXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0RXZlbnQgPT0gQ29uc3RhbnQuRVZFTlQuT05fUkVKRUNURUQgfHwgcmVzdWx0RXZlbnQgPT0gQ29uc3RhbnQuRVZFTlQuT05fRVJST1IpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dHJhbnNpdGlvbk1lc3NhZ2U6IFwiXCIsIGVycm9yTWVzc2FnZTogXCJTb21ldGhpbmcgd2VudCB3cm9uZywgcmVmcmVzaGluZyBpbiAzIHNlY29uZHMuLi5cIn0pXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzdWx0RXZlbnQgPT0gQ29uc3RhbnQuRVZFTlQuT05fUkVDRUlQVCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt0cmFuc2l0aW9uTWVzc2FnZTogXCJTdWNjZXNzIVwifSlcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5zdG9yYWdlTWFuYWdlci5yZWxvYWQgPSAxO1xuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnN0b3JhZ2VNYW5hZ2VyLnJlbG9hZCk7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5zZXRTdGF0ZSh7dHJhbnNpdGlvbk1lc3NhZ2U6IFwiU3VjY2VzcyEgQ2xpY2sgaGVyZSB0byBlbnRlciBpZiBub3QgZGlyZWN0ZWQgYXV0b21hdGljYWxseS5cIn0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIC8vIHRoaXMuc2V0U3RhdGUoe3RyYW5zaXRpb25NZXNzYWdlOiBcIlN1Y2Nlc3MhIENsaWNrIGhlcmUgdG8gZW50ZXIgaWYgbm90IGRpcmVjdGVkIGF1dG9tYXRpY2FsbHkuXCJ9KTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZXhpc3RpbmdcIik7XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIFxuICAgIH1cblxuXG4gICAgbmV4dENsaWNrZWQgPSBhc3luYyAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuc3RhdGUucHJpdmF0ZUtleSlcbiAgICAgICAgdmFyIHdhbGxldEFkZHJlc3MgPSBhd2FpdCB0aGlzLmFjY291bnQuY2hlY2tQcml2YXRlS2V5KHRoaXMuc3RhdGUucHJpdmF0ZUtleSk7XG4gICAgICAgIGlmICh3YWxsZXRBZGRyZXNzKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInN1Y2Vzc1wiLCB3YWxsZXRBZGRyZXNzKTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2Vycm9yTWVzc2FnZSA6IFwiXCJ9KTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3dhbGxldEFkZHJlc3MgOiB3YWxsZXRBZGRyZXNzfSk7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiR1VVU0xcIik7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtlcnJvck1lc3NhZ2UgOiBcIlByaXZhdGUgS2V5IGlzIGludmFsaWRcIn0pO1xuICAgICAgICAgICAgLy8gdGhpcy5zZXRTdGF0ZSh7ZXJyb3JNZXNzYWdlOiBcIkludmFsaWQgcHJpdmF0ZSBrZXlcIn0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2xhbmRpbmdQYWdlJyA+XG4gICAgICAgICAgICA8SGVhZD5cbiAgICAgICAgICAgICAgICA8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgaHJlZj1cIi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL3NlbWFudGljLXVpLzIuMi4xMi9zZW1hbnRpYy5taW4uY3NzXCI+PC9saW5rPlxuICAgICAgICAgICAgPC9IZWFkPlxuICAgICAgICAgICAgICAgIDxoMSBjbGFzc05hbWU9XCJ0aXRsZVwiPlxuICAgICAgICAgICAgICAgIFdlbGNvbWUgdG8gQmxvY2stRm9yZXZlciEgXG4gICAgICAgICAgICAgICAgPC9oMT5cblxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImRlc2NyaXB0aW9uXCI+XG4gICAgICAgICAgICAgICAgU2VuZCBhIHByaXZhdGUgbWVzc2FnZSB0byB5b3VyIGZyaWVuZCB0aGF0IHdpbGwgbmV2ZXIgYmUgbG9zdFxuICAgICAgICAgICAgICAgIDwvcD5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdsb2dpbkJveCc+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2xvZ2luVGl0bGUnPiBTaWduIGluIHRvIEJsb2NrLUZvcmV2ZXI8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nbG9naW5Gb3JtJyA+IFxuICAgICAgICAgICAgICAgIDxmb3JtIGhpZGRlbj17dGhpcy5zdGF0ZS53YWxsZXRBZGRyZXNzICE9IFwiXCJ9IGNsYXNzTmFtZT0nbG9naW5Gb3JtJyBvblN1Ym1pdD17KGUpPT50aGlzLm5leHRDbGlja2VkKGUpfT4gXG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9J2xvZ2luRmllbGRzJyBodG1sRm9yPVwicHJpS2V5XCI+RW50ZXIgUHJpdmF0ZSBLZXk6PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHZhbHVlPXt0aGlzLnN0YXRlLnByaXZhdGVLZXl9IGNsYXNzTmFtZT0nbG9naW5GaWVsZHMgcHJpdmF0ZUtleScgdHlwZT1cInRleHRcIiBvbkNoYW5nZT17KGUpID0+IHRoaXMuc2V0U3RhdGUoe3ByaXZhdGVLZXk6IGUudGFyZ2V0LnZhbHVlfSl9ICByZXF1aXJlZCAvPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT0nbG9naW5GaWVsZHMgc3VibWl0QnV0dG9uJyB0eXBlPVwic3VibWl0XCI+TG9naW48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICAgICAgICAgICAgICAgICB7LyogPElucHV0IGZsdWlkIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLnByaXZhdGVLZXl9IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gdGhpcy5zZXRTdGF0ZSh7cHJpdmF0ZUtleTogZS50YXJnZXQudmFsdWV9KX0gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uPXt7IGNvbG9yOiAnYmx1ZScsIGxhYmVsUG9zaXRpb246ICdyaWdodCcsIGljb246ICdhbmdsZSByaWdodCcsIGNvbnRlbnQ6ICdOZXh0Jywgb25DbGljazogKGUpPT50aGlzLm5leHRDbGlja2VkKGUpfX0vPiAqL31cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIDxNZXNzYWdlIGVycm9yIGhlYWRlcj17dGhpcy5zdGF0ZS5lcnJvck1lc3NhZ2V9IGhpZGRlbj17dGhpcy5zdGF0ZS5lcnJvck1lc3NhZ2UgPT0gXCJcIn0vPlxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgPE1lc3NhZ2UgdGV4dCBwb3NpdGl2ZSBoaWRkZW49e3RoaXMuc3RhdGUud2FsbGV0QWRkcmVzcyA9PSBcIlwifT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxNZXNzYWdlLkhlYWRlcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2luIEV0aGVyZXVtIE1lc3NlbmdlciBhcyA8YnIvPiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q29udGFpbmVyIGZsdWlkIHRleHRBbGlnbj0nY2VudGVyJyBzdHlsZT17eyBtYXJnaW5Ub3A6IFwiMXZ3XCJ9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGIgc3R5bGU9e3tmb250U2l6ZTogXCIydndcIn19PjB4e3RoaXMuc3RhdGUud2FsbGV0QWRkcmVzc308L2I+PGJyLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEJ1dHRvbiBvbkNsaWNrPXt0aGlzLmhhbmRsZUJhY2t9IGNvbG9yID0gJ2JsdWUnICBzdHlsZT17eyBtYXJnaW5Ub3A6IFwiMXZ3XCJ9fSA+QmFjazwvQnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9e3RoaXMuaGFuZGxlSm9pbn0gY29sb3IgPSAnb3JhbmdlJyBzdHlsZT17eyBtYXJnaW5MZWZ0OiBcIjAuNXZ3XCJ9fT5Kb2luPC9CdXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Db250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L01lc3NhZ2UuSGVhZGVyPlxuICAgICAgICAgICAgICAgICAgICA8L01lc3NhZ2U+XG4gICAgICAgICAgICAgICAgICAgIDxDb250YWluZXIgdGV4dEFsaWduPVwiY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxNZXNzYWdlICBjb21wYWN0IHBvc2l0aXZlIGhpZGRlbj17dGhpcy5zdGF0ZS50cmFuc2l0aW9uTWVzc2FnZSAhPSBcIkpvaW5pbmcuLi5cIn0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEljb24gc2l6ZT0nYmlnJyBuYW1lPSdjaXJjbGUgbm90Y2hlZCcgbG9hZGluZyAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxiIHN0eWxlPXt7Zm9udFNpemU6IFwiMi41dndcIn19Pnt0aGlzLnN0YXRlLnRyYW5zaXRpb25NZXNzYWdlfTwvYj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBzdHlsZT17e2ZvbnRTaXplOiBcIjF2d1wifX0+UGxlYXNlIG1hbnVhbGx5IHJlZnJlc2ggcGFnZSBpZiB1bmFibGUgdG8gbG9nZ2luZyBpbiBkdXJpbmcgZmlyc3QgdGltZTwvcD5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPC9NZXNzYWdlPlxuICAgICAgICAgICAgICAgICAgICAgICAgPE1lc3NhZ2UgIGNvbXBhY3QgcG9zaXRpdmUgaGlkZGVuPXt0aGlzLnN0YXRlLnRyYW5zaXRpb25NZXNzYWdlICE9IFwiU3VjY2VzcyFcIn0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEljb24gc2l6ZT0nYmlnJyBuYW1lPSdjaGVjaycgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YiBzdHlsZT17e2ZvbnRTaXplOiBcIjIuNXZ3XCJ9fT57dGhpcy5zdGF0ZS50cmFuc2l0aW9uTWVzc2FnZX08L2I+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgc3R5bGU9e3tmb250U2l6ZTogXCIxdndcIn19PlBsZWFzZSBtYW51YWxseSByZWZyZXNoIHBhZ2UgaWYgdW5hYmxlIHRvIGxvZ2dpbmcgaW4gZHVyaW5nIGZpcnN0IHRpbWU8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L01lc3NhZ2U+XG4gICAgICAgICAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgICAgICA8L0NvbnRhaW5lcj5cblxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBcbiAgICA8c3R5bGUganN4PntgXG4gICAgICAgIC5oZWFkZXJ7XG4gICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICMwMDcwZjM7XG4gICAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgIH1cblxuICAgICAgICAuY29udGFjdExpc3RIZWFkZXJ7XG4gICAgICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICAgICAgfVxuXG4gICAgICAgIC5jb250YWN0SW1ne1xuICAgICAgICAgIHdpZHRoOiAxMCU7XG4gICAgICAgICAgaGVpZ2h0OiBhdXRvO1xuICAgICAgICAgIHRyYW5zaXRpb246IGZpbHRlciAwLjE1cyBlYXNlXG4gICAgICAgIH1cblxuICAgICAgICAuY29udGFjdE5hbWV7XG4gICAgICAgICAgZm9udC1zaXplOiAwLjhyZW07XG4gICAgICAgICAgbWFyZ2luLWxlZnQ6IDAuMnJlbTtcbiAgICAgICAgICB0cmFuc2l0aW9uOiBjb2xvciAwLjE1cyBlYXNlXG4gICAgICAgIH1cblxuICAgICAgICAuY29udGFjdEJveHtcbiAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgIG92ZXJmbG93OiBzY3JvbGw7XG4gICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgICBtYXJnaW4tdG9wOiAwLjVyZW07XG4gICAgICAgICAgYm9yZGVyOiAycHggdHJhbnNwYXJlbnQgc29saWQ7XG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgICAgICAgICBwYWRkaW5nOiAwLjVyZW07XG4gICAgICAgICAgdHJhbnNpdGlvbjogYm9yZGVyLWNvbG9yIDAuMTVzIGVhc2UsIGJhY2tncm91bmQtY29sb3IgMC4xNXMgZWFzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC5jb250YWN0Qm94IDpob3ZlcixcbiAgICAgICAgLmNvbnRhY3RCb3ggOmZvY3VzLFxuICAgICAgICAuY29udGFjdEJveCA6YWN0aXZlIHtcbiAgICAgICAgICBib3JkZXItY29sb3I6ICMwMDcwZjM7XG4gICAgICAgICAgXG4gICAgICAgIH1cblxuICAgICAgICAuY29udGFjdEFkZHtcbiAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgIG1hcmdpbi10b3A6IDFyZW07XG4gICAgICAgICAgbWFyZ2luLWJvdHRvbTogMC41cmVtO1xuICAgICAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICAgICAgfVxuXG4gICAgICAgIC5wdWJsaWNLZXl7XG4gICAgICAgICAgd2lkdGg6IDYwJVxuICAgICAgICB9XG5cbiAgICAgICAgLmJvZHl7XG4gICAgICAgICAgZGlzcGxheTogZ3JpZDtcbiAgICAgICAgICBtYXJnaW4tdG9wOiAxcmVtO1xuICAgICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDNmcjtcbiAgICAgICAgICBncmlkLXRlbXBsYXRlLWFyZWFzOiBcImNvbnRhY3RMaXN0IG1lc3NhZ2VCb2R5XCI7XG4gICAgICAgICAgZ2FwOiAxNXB4O1xuICAgICAgICAgIHBhZGRpbmc6IDAgMXJlbTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLmJvZHlDb2xze1xuICAgICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNlYWVhZWE7XG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgICAgICAgICBwYWRkaW5nOiAwLjVyZW07XG4gICAgICAgIH1cblxuICAgICAgICAubWVzc2FnZVJvd3N7XG4gICAgICAgICAgYm9yZGVyOiAxcHggc29saWQgI2VhZWFlYTtcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICAgICAgICAgIHBhZGRpbmc6IDAuNXJlbTtcbiAgICAgICAgfVxuXG4gICAgICAgIC5jb250YWN0TGlzdHtcbiAgICAgICAgICBncmlkLWFyZWE6IGNvbnRhY3RMaXN0O1xuICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgfVxuXG4gICAgICAgIC5tZXNzYWdlQm9keXtcbiAgICAgICAgICBncmlkLWFyZWE6IG1lc3NhZ2VCb2R5O1xuICAgICAgICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgICAgICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiAzZnIgMWZyO1xuICAgICAgICAgIGdyaWQtdGVtcGxhdGUtYXJlYXM6IFwiY29udmVyc2F0aW9uXCIgXCJtZXNzYWdlXCI7XG4gICAgICAgICAgZ2FwOiAxNXB4O1xuICAgICAgICB9XG5cbiAgICAgICAgLmNvbnZlcnNhdGlvbntcbiAgICAgICAgICBncmlkLWFyZWE6IGNvbnZlcnNhdGlvbjtcbiAgICAgICAgfVxuXG4gICAgICAgIC5tZXNzYWdle1xuICAgICAgICAgIG1heC1oZWlnaHQ6IDEwdmg7XG4gICAgICAgICAgZ3JpZC1hcmVhOiBtZXNzYWdlO1xuICAgICAgICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiA3ZnIgMWZyO1xuICAgICAgICAgIGdhcDogMTVweDtcbiAgICAgICAgfVxuXG4gICAgICAgIC5oZWFkZXJJdGVtc3tcbiAgICAgICAgICBtYXJnaW46IDFyZW07XG4gICAgICAgICAgY29sb3I6IHdoaXRlO1xuICAgICAgICAgIHBhZGRpbmc6IDAuNXJlbTtcbiAgICAgICAgfVxuXG4gICAgICAgIC5iYWxhbmNle1xuICAgICAgICAgIGJhY2tncm91bmQ6IG9yYW5nZTtcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiAxMHB4XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC5jb250YWluZXIge1xuICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgICBcbiAgICAgICAgfVxuXG4gICAgICAgIC5sb2dpbkJveHtcbiAgICAgICAgICB3aWR0aDogNjAlO1xuICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgICBwYWRkaW5nOiAyLjVyZW0gMC41cmVtO1xuICAgICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgICAgYm9yZGVyOiAxcHggc29saWQgI2VhZWFlYTtcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICAgICAgICAgIHRyYW5zaXRpb246IGNvbG9yIDAuMTVzIGVhc2UsIGJvcmRlci1jb2xvciAwLjE1cyBlYXNlO1xuICAgICAgICB9XG5cbiAgICAgICAgLmxvZ2luRm9ybXtcbiAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICAgICAgcGFkZGluZzogMC41cmVtIDEuOHJlbTtcbiAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICAgIHdpZHRoOiAxMDAlXG4gICAgICAgIH1cblxuICAgICAgICAubG9naW5GaWVsZHN7XG4gICAgICAgICAgbWFyZ2luLXRvcDogMC41cmVtXG4gICAgICAgIH1cblxuICAgICAgICAucHJpdmF0ZUtleXtcbiAgICAgICAgICBwYWRkaW5nOiAwLjVyZW0gMC41cmVtO1xuICAgICAgICAgIHdpZHRoOiAxMDAlXG4gICAgICAgIH1cblxuICAgICAgICAuc3VibWl0QnV0dG9ue1xuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgICAgIHdpZHRoOiA0MCU7XG4gICAgICAgICAgYWxpZ24tc2VsZjogY2VudGVyO1xuICAgICAgICAgIHBhZGRpbmc6IDAuNXJlbSAwLjVyZW07XG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgICAgICAgICBmb250LXdlaWdodDogNzAwO1xuICAgICAgICAgIHRyYW5zaXRpb246IGNvbG9yIDAuMTVzIGVhc2UsIGJvcmRlci1jb2xvciAwLjE1cyBlYXNlO1xuICAgICAgICB9XG4gICAgICBcbiAgICAgICAgLnN1Ym1pdEJ1dHRvbiA6aG92ZXIsXG4gICAgICAgIC5zdWJtaXRCdXR0b24gOmZvY3VzLFxuICAgICAgICAuc3VibWl0QnV0dG9uIDphY3RpdmUge1xuICAgICAgICAgIGJvcmRlci1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICAgICAgY29sb3I6ICAjZmZmO1xuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IzAwNzBmMyA7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC5hZGRCdXR0b257XG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICAgICAgYWxpZ24tc2VsZjogY2VudGVyO1xuICAgICAgICAgIHBhZGRpbmc6IDAuNXJlbSAwLjVyZW07XG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgICAgICAgICBmb250LXdlaWdodDogNzAwO1xuICAgICAgICAgIHRyYW5zaXRpb246IGNvbG9yIDAuMTVzIGVhc2UsIGJvcmRlci1jb2xvciAwLjE1cyBlYXNlO1xuICAgICAgICB9XG4gICAgICBcbiAgICAgICAgLmFkZEJ1dHRvbiA6aG92ZXIsXG4gICAgICAgIC5hZGRCdXR0b24gOmZvY3VzLFxuICAgICAgICAuYWRkQnV0dG9uIDphY3RpdmUge1xuICAgICAgICAgIGJvcmRlci1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICAgICAgY29sb3I6ICAjZmZmO1xuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IzAwNzBmMyA7XG4gICAgICAgIH1cblxuICAgICAgICAuc2VuZEJ1dHRvbntcbiAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgICAgICBhbGlnbi1zZWxmOiBjZW50ZXI7XG4gICAgICAgICAgcGFkZGluZzogMC41cmVtIDAuNXJlbTtcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICAgICAgICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gICAgICAgICAgdHJhbnNpdGlvbjogY29sb3IgMC4xNXMgZWFzZSwgYm9yZGVyLWNvbG9yIDAuMTVzIGVhc2U7XG4gICAgICAgIH1cbiAgICAgIFxuICAgICAgICAuc2VuZEJ1dHRvbiA6aG92ZXIsXG4gICAgICAgIC5zZW5kQnV0dG9uIDpmb2N1cyxcbiAgICAgICAgLnNlbmRCdXR0b24gOmFjdGl2ZSB7XG4gICAgICAgICAgYm9yZGVyLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgICAgICBjb2xvcjogICNmZmY7XG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjojMDA3MGYzIDtcbiAgICAgICAgfVxuXG4gICAgICAgIC5sYW5kaW5nUGFnZSB7XG4gICAgICAgICAgcGFkZGluZzogNXJlbSAwO1xuICAgICAgICAgIGZsZXg6IDE7XG4gICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIH1cblxuICAgICAgICBmb290ZXIge1xuICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgIGhlaWdodDogMTAwcHg7XG4gICAgICAgICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNlYWVhZWE7XG4gICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9vdGVyIGltZyB7XG4gICAgICAgICAgbWFyZ2luLWxlZnQ6IDAuNXJlbTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvb3RlciBhIHtcbiAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIH1cblxuICAgICAgICBhIHtcbiAgICAgICAgICBjb2xvcjogaW5oZXJpdDtcbiAgICAgICAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gICAgICAgIH1cblxuICAgICAgICAudGl0bGUgYSB7XG4gICAgICAgICAgY29sb3I6ICMwMDcwZjM7XG4gICAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICAgICAgICB9XG5cbiAgICAgICAgLnRpdGxlIGE6aG92ZXIsXG4gICAgICAgIC50aXRsZSBhOmZvY3VzLFxuICAgICAgICAudGl0bGUgYTphY3RpdmUge1xuICAgICAgICAgIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xuICAgICAgICB9XG5cbiAgICAgICAgLnRpdGxlIHtcbiAgICAgICAgICBtYXJnaW46IDA7XG4gICAgICAgICAgbGluZS1oZWlnaHQ6IDEuMTU7XG4gICAgICAgICAgZm9udC1zaXplOiAzcmVtO1xuICAgICAgICAgIGZvbnQtZmFtaWx5OiBcIkhlbHZldGljYSBOZXVlXCJcbiAgICAgICAgfVxuICAgICAgICAubG9naW5UaXRsZSB7XG4gICAgICAgICAgbWFyZ2luOiAwO1xuICAgICAgICAgIGxpbmUtaGVpZ2h0OiAxLjE1O1xuICAgICAgICAgIGZvbnQtc2l6ZTogMnJlbTtcbiAgICAgICAgICBmb250LXdlaWdodDogNzAwO1xuICAgICAgICAgIGNvbG9yOiAjMDA3MGYzO1xuICAgICAgICB9XG5cbiAgICAgICAgLnRpdGxlLFxuICAgICAgICAuZGVzY3JpcHRpb24ge1xuICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIC5kZXNjcmlwdGlvbiB7XG4gICAgICAgICAgbGluZS1oZWlnaHQ6IDEuNTtcbiAgICAgICAgICBmb250LXNpemU6IDEuNXJlbTtcbiAgICAgICAgfVxuXG4gICAgICAgIC5sb2dpbkJveDpob3ZlcixcbiAgICAgICAgLmxvZ2luQm94OmZvY3VzLFxuICAgICAgICAubG9naW5Cb3g6YWN0aXZlIHtcbiAgICAgICAgICBcbiAgICAgICAgICBib3JkZXItY29sb3I6ICMwMDcwZjM7XG4gICAgICAgIH1cblxuICAgICAgICAuY2FyZCBoMyB7XG4gICAgICAgICAgbWFyZ2luOiAwIDAgMXJlbSAwO1xuICAgICAgICAgIGZvbnQtc2l6ZTogMS41cmVtO1xuICAgICAgICB9XG5cbiAgICAgICAgLmNhcmQgcCB7XG4gICAgICAgICAgbWFyZ2luOiAwO1xuICAgICAgICAgIGZvbnQtc2l6ZTogMS4yNXJlbTtcbiAgICAgICAgICBsaW5lLWhlaWdodDogMS41O1xuICAgICAgICB9XG5cbiAgICAgICAgLmxvZ28ge1xuICAgICAgICAgIGhlaWdodDogMWVtO1xuICAgICAgICB9XG5cbiAgICAgICAgQG1lZGlhIChtYXgtd2lkdGg6IDYwMHB4KSB7XG4gICAgICAgICAgLmdyaWQge1xuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgYH08L3N0eWxlPlxuXG4gICAgICA8c3R5bGUganN4IGdsb2JhbD57YFxuICAgICAgICBodG1sLFxuICAgICAgICBib2R5IHtcbiAgICAgICAgICBwYWRkaW5nOiAwO1xuICAgICAgICAgIG1hcmdpbjogMDtcbiAgICAgICAgICBmb250LWZhbWlseTogLWFwcGxlLXN5c3RlbSwgQmxpbmtNYWNTeXN0ZW1Gb250LCBTZWdvZSBVSSwgUm9ib3RvLFxuICAgICAgICAgICAgT3h5Z2VuLCBVYnVudHUsIENhbnRhcmVsbCwgRmlyYSBTYW5zLCBEcm9pZCBTYW5zLCBIZWx2ZXRpY2EgTmV1ZSxcbiAgICAgICAgICAgIHNhbnMtc2VyaWY7XG4gICAgICAgIH1cblxuICAgICAgICAqIHtcbiAgICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgICB9XG4gICAgICBgfTwvc3R5bGU+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBMb2dpbjtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi92aWV3cy9Mb2dpbi5qcyIsIi8vIENvcHlyaWdodCAoYykgMjAxOCBOZ3V5ZW4gVnUgTmhhdCBNaW5oXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgTUlUIHNvZnR3YXJlIGxpY2Vuc2UsIHNlZSB0aGUgYWNjb21wYW55aW5nIGZpbGUgTElDRU5TRVxuXG5pbXBvcnQge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHdlYjMgZnJvbSAnLi4vLi4vZXRoZXJldW0vd2ViMyc7XG5pbXBvcnQge1xuICAgIE1vZGFsLFxuICAgIElucHV0LFxuICAgIE1lc3NhZ2UsXG4gICAgQnV0dG9uLFxuICAgIEljb24sXG4gICAgSGVhZGVyXG59IGZyb20gJ3NlbWFudGljLXVpLXJlYWN0JztcbmltcG9ydCBhcHBEaXNwYXRjaGVyIGZyb20gJy4uLy4uL2NvcmUvQXBwRGlzcGF0Y2hlcic7XG5pbXBvcnQgQ29uc3RhbnQgZnJvbSAnLi4vLi4vc3VwcG9ydC9Db25zdGFudCc7XG5pbXBvcnQgQ29udGFjdExpc3QgZnJvbSAnLi4vQ29udGFjdExpc3QnOyBcblxuY2xhc3MgQWRkQ29udGFjdE1vZGFsIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7IG1vZGFsT3BlbjogZmFsc2UsIGVycm9yTWVzc2FnZTogXCJcIiwgYWRkcmVzczogXCJcIn1cbiAgICAgICAgdGhpcy5jb250cmFjdE1hbmFnZXIgPSBwcm9wcy5jb250cmFjdE1hbmFnZXI7XG4gICAgICAgIHRoaXMuc3RvcmFnZU1hbmFnZXIgPSBwcm9wcy5zdG9yYWdlTWFuYWdlcjtcbiAgICB9XG4gICAgXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgICAgICBhcHBEaXNwYXRjaGVyLnJlZ2lzdGVyKChwYXlsb2FkKSA9PiB7XG4gICAgICAgICAgICBpZiAocGF5bG9hZC5hY3Rpb24gPT0gQ29uc3RhbnQuQUNUSU9OLkFERF9DT05UQUNUKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7bW9kYWxPcGVuOiB0cnVlLCBlcnJvck1lc3NhZ2U6IFwiXCIsIGlzTG9hZGluZzogZmFsc2UsIGFkZHJlc3M6IFwiXCJ9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBoYW5kbGVDbG9zZSA9IChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZXJyb3JNZXNzYWdlOiBcIlwifSk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBtb2RhbE9wZW46IGZhbHNlIH0pXG4gICAgfTtcblxuICAgIGhhbmRsZUFkZENvbnRhY3QgPSAoZSkgPT4ge1xuICAgICAgICBpZiAod2ViMy51dGlscy5pc0FkZHJlc3ModGhpcy5zdGF0ZS5hZGRyZXNzKSkge1xuICAgICAgICAgICAgdGhpcy5jb250cmFjdE1hbmFnZXIuYWRkQ29udGFjdCh0aGlzLnN0YXRlLmFkZHJlc3MpO1xuICAgICAgICAgICAgLy8gdGhpcy5zdG9yYWdlTWFuYWdlci5hZGRDb250YWN0KHRoaXMuc3RhdGUuYWRkcmVzcyk7XG4gICAgICAgICAgICAvLyBhcHBEaXNwYXRjaGVyLmRpc3BhdGNoKHtcbiAgICAgICAgICAgIC8vICAgICBhY3Rpb246IENvbnN0YW50LkVWRU5ULkNPTlRBQ1RfTElTVF9VUERBVEVEXG4gICAgICAgICAgICAvLyB9KTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2Vycm9yTWVzc2FnZTogXCJcIiwgbW9kYWxPcGVuOiBmYWxzZX0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZXJyb3JNZXNzYWdlOiBcIkludmFsaWQgZXRoZXJldW0gYWRkcmVzc1wifSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxIZWFkZXIgY29udGVudD1cIkVudGVyIFB1YmxpYyBBZGRyZXNzIG9mIEZyaWVuZFwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3tkaXNwbGF5OidmbGV4JyxqdXN0aWZ5Q29udGVudDpcInNwYWNlLWJldHdlZW5cIn19PlxuICAgICAgICAgICAgICAgICAgICAgICAgPElucHV0IHN0eWxlPXt7d2lkdGg6XCI4MCVcIn19IHZhbHVlPXt0aGlzLnN0YXRlLmFkZHJlc3N9IG9uQ2hhbmdlPXtldmVudCA9PiB0aGlzLnNldFN0YXRlKHthZGRyZXNzOiBldmVudC50YXJnZXQudmFsdWV9KX0vPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEJ1dHRvbiBzdHlsZT17e21hcmdpbkxlZnQ6OH19IGNvbG9yPSdvcmFuZ2UnIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQWRkQ29udGFjdH0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQWRkXG4gICAgICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFkZENvbnRhY3RNb2RhbDtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi92aWV3cy9tb2RhbHMvQWRkQ29udGFjdE1vZGFsLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2Rpc3Qvc3R5bGUnKVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc3R5bGVkLWpzeC9zdHlsZS5qc1xuLy8gbW9kdWxlIGlkID0gMTM1OVxuLy8gbW9kdWxlIGNodW5rcyA9IDUiLCIvLyBDb3B5cmlnaHQgKGMpIDIwMTggTmd1eWVuIFZ1IE5oYXQgTWluaFxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIE1JVCBzb2Z0d2FyZSBsaWNlbnNlLCBzZWUgdGhlIGFjY29tcGFueWluZyBmaWxlIExJQ0VOU0VcblxuaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7XG4gICAgTGlzdCxcbiAgICBJbWFnZSxcbiAgICBMb2FkZXIsXG4gICAgRGltbWVyLFxuICAgIEJ1dHRvbixcbiAgICBJY29uLFxuICAgIEhlYWRlcixcbiAgICBQb3B1cCxcbiAgICBJbnB1dCxcbiAgICBNZXNzYWdlLFxufSBmcm9tICdzZW1hbnRpYy11aS1yZWFjdCc7XG5pbXBvcnQgYXBwRGlzcGF0Y2hlciBmcm9tICcuLi9jb3JlL0FwcERpc3BhdGNoZXInO1xuaW1wb3J0IENvbnN0YW50IGZyb20gJy4uL3N1cHBvcnQvQ29uc3RhbnQnO1xuaW1wb3J0IENvbmZpZyBmcm9tICcuLi9zdXBwb3J0L0NvbmZpZyc7XG5pbXBvcnQgQWRkQ29udGFjdE1vZGFsIGZyb20gJy4vbW9kYWxzL0FkZENvbnRhY3RNb2RhbCc7XG5cbmNsYXNzIENvbnRhY3RMaXN0IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMuYWNjb3VudCA9IHByb3BzLmFjY291bnQ7XG4gICAgICAgIHRoaXMuY29udHJhY3RNYW5hZ2VyID0gcHJvcHMuY29udHJhY3RNYW5hZ2VyO1xuICAgICAgICB0aGlzLnN0YXRlID0ge2NvbnRhY3RBZGRyZXNzZXM6IFtdLCBpc0FjY2VwdGluZzogW10sIHNlbGVjdGVkQWRkcmVzczogXCJcIn07XG4gICAgfVxuXG4gICAgXG5cbiAgICB1cGRhdGVDb250YWN0KCl7XG4gICAgICAgIHZhciByYXdDb250YWN0QXJyYXkgPSB0aGlzLmFjY291bnQuc3RvcmFnZU1hbmFnZXIuY29udGFjdEFkZHJlc3NlcztcbiAgICAgICAgdmFyIGNvbnRhY3RBcnJheSA9IFtdO1xuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgcmF3Q29udGFjdEFycmF5Lmxlbmd0aDsgaSsrICl7XG4gICAgICAgICAgICBpZihyYXdDb250YWN0QXJyYXlbaV0udG9Mb3dlckNhc2UoKSAhPSB3aW5kb3cubG9jYWxTdG9yYWdlLmFkZHJlc3MgJiYgcmF3Q29udGFjdEFycmF5W2ldICE9IENvbmZpZy5FTlYuQ29udHJhY3RBZGRyZXNzKXtcbiAgICAgICAgICAgICAgICBjb250YWN0QXJyYXkucHVzaChyYXdDb250YWN0QXJyYXlbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuYWNjb3VudC5zdG9yYWdlTWFuYWdlci5jb250YWN0QWRkcmVzc2VzKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Y29udGFjdEFkZHJlc3NlczogY29udGFjdEFycmF5fSk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIC8vIHRoaXMuc2V0U3RhdGUoe2NvbnRhY3RBZGRyZXNzZXM6IHRoaXMuYWNjb3VudC5zdG9yYWdlTWFuYWdlci5jb250YWN0QWRkcmVzc2VzfSk7XG4gICAgICAgIHRoaXMudXBkYXRlQ29udGFjdCgpO1xuICAgICAgICBcbiAgICAgICAgYXBwRGlzcGF0Y2hlci5yZWdpc3RlcigocGF5bG9hZCkgPT4ge1xuICAgICAgICAgICAgaWYgKHBheWxvYWQuYWN0aW9uID09IENvbnN0YW50LkVWRU5ULkNPTlRBQ1RfTElTVF9VUERBVEVEKSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUNvbnRhY3QoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBhZGRDb250YWN0Q2xpY2tlZCA9ICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuYWNjb3VudC5pc0pvaW5lZCkge1xuICAgICAgICAgICAgYXBwRGlzcGF0Y2hlci5kaXNwYXRjaCh7XG4gICAgICAgICAgICAgICAgYWN0aW9uOiBDb25zdGFudC5BQ1RJT04uQUREX0NPTlRBQ1RcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYXBwRGlzcGF0Y2hlci5kaXNwYXRjaCh7XG4gICAgICAgICAgICAgICAgYWN0aW9uOiBDb25zdGFudC5FVkVOVC5FTkNPVU5URVJFRF9FUlJPUixcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiAnUGxlYXNlIGpvaW4gJytDb25zdGFudC5BUFBfTkFNRSsnIGZpcnN0IGJ5IGNsaWNrIG9uIHRoZSBcXCdKb2luXFwnIGJ1dHRvbiBvbiB0aGUgdG9wLXJpZ2h0IGNvcm5lcidcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWNjZXB0Q29udGFjdFJlcXVlc3QgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuYWNjb3VudC5pc0pvaW5lZCkge1xuICAgICAgICAgICAgdmFyIGFkZHJlc3MgPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuYWNjb3VudC5zdG9yYWdlTWFuYWdlci5jb250YWN0c1thZGRyZXNzXS5pc0FjY2VwdGluZyA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmZvcmNlVXBkYXRlKCk7XG5cbiAgICAgICAgICAgIHRoaXMuY29udHJhY3RNYW5hZ2VyLmFjY2VwdENvbnRhY3RSZXF1ZXN0KGFkZHJlc3MsIChyZXN1bHRFdmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHRFdmVudCA9PSBDb25zdGFudC5FVkVOVC5PTl9SRUpFQ1RFRCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjY291bnQuc3RvcmFnZU1hbmFnZXIuY29udGFjdHNbYWRkcmVzc10uaXNBY2NlcHRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mb3JjZVVwZGF0ZSgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzdWx0RXZlbnQgPT0gQ29uc3RhbnQuRVZFTlQuT05fRVJST1IpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY2NvdW50LnN0b3JhZ2VNYW5hZ2VyLmNvbnRhY3RzW2FkZHJlc3NdLmlzQWNjZXB0aW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZm9yY2VVcGRhdGUoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlc3VsdEV2ZW50ID09IENvbnN0YW50LkVWRU5ULk9OX1JFQ0VJUFQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY2NvdW50LnN0b3JhZ2VNYW5hZ2VyLmNvbnRhY3RzW2FkZHJlc3NdLmlzQWNjZXB0aW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWNjb3VudC5zdG9yYWdlTWFuYWdlci5jb250YWN0c1thZGRyZXNzXS5yZWxhdGlvbnNoaXAgPSBDb25zdGFudC5SZWxhdGlvbnNoaXAuQ29ubmVjdGVkO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtjb250YWN0QWRkcmVzc2VzOiB0aGlzLmFjY291bnQuc3RvcmFnZU1hbmFnZXIuY29udGFjdEFkZHJlc3Nlc30pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYXBwRGlzcGF0Y2hlci5kaXNwYXRjaCh7XG4gICAgICAgICAgICAgICAgYWN0aW9uOiBDb25zdGFudC5FVkVOVC5FTkNPVU5URVJFRF9FUlJPUixcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiAnUGxlYXNlIGpvaW4gJytDb25zdGFudC5BUFBfTkFNRSsnIGZpcnN0IGJ5IGNsaWNrIG9uIHRoZSBcXCdKb2luXFwnIGJ1dHRvbiBvbiB0aGUgdG9wLXJpZ2h0IGNvcm5lcidcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbGlzdEl0ZW1DbGlja2VkID0gKGFkZHJlc3MsIGV2ZW50KSA9PiB7XG4gICAgICAgIC8vIGlmICh0aGlzLmFjY291bnQuc3RvcmFnZU1hbmFnZXIuY29udGFjdHNbYWRkcmVzc10ucmVsYXRpb25zaGlwID09IENvbnN0YW50LlJlbGF0aW9uc2hpcC5Db25uZWN0ZWQgJiZcbiAgICAgICAgLy8gICAgIHRoaXMuYWNjb3VudC5zdG9yYWdlTWFuYWdlci5jb250YWN0c1thZGRyZXNzXS5wdWJsaWNLZXkpIHtcbiAgICAgICAgLy8gICAgIGFwcERpc3BhdGNoZXIuZGlzcGF0Y2goe1xuICAgICAgICAvLyAgICAgICAgIGFjdGlvbjogQ29uc3RhbnQuQUNUSU9OLlNFTEVDVF9DT05UQUNULFxuICAgICAgICAvLyAgICAgICAgIGRhdGE6IGFkZHJlc3NcbiAgICAgICAgLy8gICAgIH0pO1xuICAgICAgICAvLyAgICAgdGhpcy5zZXRTdGF0ZSh7c2VsZWN0ZWRBZGRyZXNzOiBhZGRyZXNzfSk7XG4gICAgICAgIC8vIH1cbiAgICAgICAgYXBwRGlzcGF0Y2hlci5kaXNwYXRjaCh7XG4gICAgICAgICAgICBhY3Rpb246IENvbnN0YW50LkFDVElPTi5TRUxFQ1RfQ09OVEFDVCxcbiAgICAgICAgICAgIGRhdGE6IGFkZHJlc3NcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3NlbGVjdGVkQWRkcmVzczogYWRkcmVzc30pO1xuXG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7IGNvbnRhY3RBZGRyZXNzZXMgfSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIGNvbnN0IHtoZWlnaHR9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgdmFyIGh0bWxDb250ZW50O1xuXG4gICAgICAgIHZhciBjb250YWN0SXRlbXMgPSBbXTtcblxuICAgICAgICBpZiAoY29udGFjdEFkZHJlc3NlcyA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGh0bWxDb250ZW50ID0gKDxkaXY+PC9kaXY+KTtcbiAgICAgICAgfSBlbHNlIFxuICAgICAgICBpZiAoY29udGFjdEFkZHJlc3Nlcy5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgY29udGFjdEl0ZW1zLnB1c2goXG4gICAgICAgICAgICAgICAgPExpc3QuSXRlbSBrZXk9eydjb250YWN0XycgKyBpfT5cbiAgICAgICAgICAgICAgICAgICAgPExpc3QuQ29udGVudD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxMaXN0LkhlYWRlcj5FbXB0eTwvTGlzdC5IZWFkZXI+XG4gICAgICAgICAgICAgICAgICAgIDwvTGlzdC5Db250ZW50PlxuICAgICAgICAgICAgICAgIDwvTGlzdC5JdGVtPlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICBodG1sQ29udGVudCA9ICg8TGlzdCBzZWxlY3Rpb24gdmVydGljYWxBbGlnbj0nbWlkZGxlJz57Y29udGFjdEl0ZW1zfTwvTGlzdD4pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9yICh2YXIgaT0wO2k8Y29udGFjdEFkZHJlc3Nlcy5sZW5ndGg7aSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIHVzZXIgPSB0aGlzLmFjY291bnQuc3RvcmFnZU1hbmFnZXIuY29udGFjdHNbY29udGFjdEFkZHJlc3Nlc1tpXV07XG4gICAgICAgICAgICAgICAgdmFyIGFkZHJlc3NFeHBsb3JlclVybCA9IENvbmZpZy5FTlYuRXhwbG9yZXJVcmwgKyAnYWRkcmVzcy8nICsgY29udGFjdEFkZHJlc3Nlc1tpXTtcbiAgICAgICAgICAgICAgICB2YXIgcmlnaHRBbGlnbmVkQ29udGVudDtcbiAgICAgICAgICAgICAgICBpZiAodXNlci5yZWxhdGlvbnNoaXAgPT0gQ29uc3RhbnQuUmVsYXRpb25zaGlwLk5vUmVsYXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgcmlnaHRBbGlnbmVkQ29udGVudCA9IChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxMaXN0LkNvbnRlbnQgZmxvYXRlZD0ncmlnaHQnPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxCdXR0b24gY29sb3I9J29yYW5nZScgbG9hZGluZz17dXNlci5pc0FjY2VwdGluZ30gZGlzYWJsZWQ9e3VzZXIuaXNBY2NlcHRpbmd9IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmFjY2VwdENvbnRhY3RSZXF1ZXN0fSB2YWx1ZT17Y29udGFjdEFkZHJlc3Nlc1tpXX0+QWNjZXB0PC9CdXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFBvcHVwICBrZXk9eydpbmZvX2J1dHRvbl9wb3B1cF8nICsgaX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyaWdnZXI9ezxCdXR0b24gY29sb3I9J2dyZWVuJyBhcz0nYScgaHJlZj17YWRkcmVzc0V4cGxvcmVyVXJsfSB0YXJnZXQ9J19ibGFuaycgY2lyY3VsYXIgaWNvbj0naW5mbyBjaXJjbGUnPjwvQnV0dG9uPn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ9J1ZpZXcgb24gRXRoZXJzY2FuJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L0xpc3QuQ29udGVudD5cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHVzZXIucmVsYXRpb25zaGlwID09IENvbnN0YW50LlJlbGF0aW9uc2hpcC5SZXF1ZXN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmlnaHRBbGlnbmVkQ29udGVudCA9IChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxMaXN0LkNvbnRlbnQgZmxvYXRlZD0ncmlnaHQnPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxQb3B1cCAga2V5PXsnd2FpdF9wb3B1cF8nICsgaX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyaWdnZXI9ezxCdXR0b24gY29sb3I9J3llbGxvdycgY2lyY3VsYXIgaWNvbj0nd2FpdCc+PC9CdXR0b24+fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudD0nUGVuZGluZyBhY2NlcHRhbmNlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFBvcHVwICBrZXk9eydpbmZvX2J1dHRvbl9wb3B1cF8nICsgaX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyaWdnZXI9ezxCdXR0b24gY29sb3I9J2dyZWVuJyBhcz0nYScgaHJlZj17YWRkcmVzc0V4cGxvcmVyVXJsfSB0YXJnZXQ9J19ibGFuaycgY2lyY3VsYXIgaWNvbj0naW5mbyBjaXJjbGUnPjwvQnV0dG9uPn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ9J1ZpZXcgb24gRXRoZXJzY2FuJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L0xpc3QuQ29udGVudD5cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByaWdodEFsaWduZWRDb250ZW50ID0gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPExpc3QuQ29udGVudCBmbG9hdGVkPSdyaWdodCc+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFBvcHVwICBrZXk9eydpbmZvX2J1dHRvbl9wb3B1cF8nICsgaX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyaWdnZXI9ezxCdXR0b24gY29sb3I9J2dyZWVuJyBhcz0nYScgaHJlZj17YWRkcmVzc0V4cGxvcmVyVXJsfSB0YXJnZXQ9J19ibGFuaycgY2lyY3VsYXIgaWNvbj0naW5mbyBjaXJjbGUnPjwvQnV0dG9uPn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ9J1ZpZXcgb24gRXRoZXJzY2FuJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L0xpc3QuQ29udGVudD5cbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciBhZGRyZXNzID0gY29udGFjdEFkZHJlc3Nlc1tpXTtcbiAgICAgICAgICAgICAgICBjb250YWN0SXRlbXMucHVzaChcbiAgICAgICAgICAgICAgICAgICAgPExpc3QuSXRlbSBhY3RpdmU9e2FkZHJlc3MgPT0gdGhpcy5zdGF0ZS5zZWxlY3RlZEFkZHJlc3N9IGtleT17J2NvbnRhY3RfJyArIGl9IHZhbHVlPXthZGRyZXNzfSBvbkNsaWNrPXt0aGlzLmxpc3RJdGVtQ2xpY2tlZC5iaW5kKHRoaXMsYWRkcmVzcyl9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPEltYWdlIGF2YXRhciBzcmM9e3VzZXIuYXZhdGFyVXJsID8gdXNlci5hdmF0YXJVcmwgOiAnc3RhdGljL2ltYWdlcy91c2VyLnBuZyd9Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxMaXN0LkNvbnRlbnQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPExpc3QuSGVhZGVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dXNlci5uYW1lID8gdXNlci5uYW1lIDogYWRkcmVzcy5zdWJzdHIoMCwgMTApfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvTGlzdC5IZWFkZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2FkZHJlc3Muc3Vic3RyKDAsMTQpICsgJy4uLid9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L0xpc3QuQ29udGVudD5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtyaWdodEFsaWduZWRDb250ZW50fVxuICAgICAgICAgICAgICAgICAgICA8L0xpc3QuSXRlbT5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaHRtbENvbnRlbnQgPSAoPExpc3Qgc2VsZWN0aW9uIHZlcnRpY2FsQWxpZ249J21pZGRsZSc+e2NvbnRhY3RJdGVtc308L0xpc3Q+KTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3t3aWR0aDogJzEwMCUnfX0+XG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17e2hlaWdodDogNDAsIHdpZHRoOiAnMTAwJSd9fT5cbiAgICAgICAgICAgICAgICA8QWRkQ29udGFjdE1vZGFsIGNvbnRyYWN0TWFuYWdlcj17dGhpcy5jb250cmFjdE1hbmFnZXJ9IHN0b3JhZ2VNYW5hZ2VyPXt0aGlzLmFjY291bnQuc3RvcmFnZU1hbmFnZXJ9IC8+XG4gICAgICAgICAgICAgICAgPEhlYWRlciBhcz0naDInIHN0eWxlPXt7ZmxvYXQ6ICdsZWZ0J319PkNvbnRhY3QgbGlzdDwvSGVhZGVyPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3toZWlnaHQ6IGhlaWdodCAtIDQwLCBvdmVyZmxvdzogJ2F1dG8nLCBmbG9hdDogJ2xlZnQnLCB3aWR0aDonMTAwJSd9fT5cbiAgICAgICAgICAgICAgICAgICAge2h0bWxDb250ZW50fVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDb250YWN0TGlzdDtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi92aWV3cy9Db250YWN0TGlzdC5qcyIsIi8vIENvcHlyaWdodCAoYykgMjAxOCBOZ3V5ZW4gVnUgTmhhdCBNaW5oXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgTUlUIHNvZnR3YXJlIGxpY2Vuc2UsIHNlZSB0aGUgYWNjb21wYW55aW5nIGZpbGUgTElDRU5TRVxuXG5pbXBvcnQge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtcbiAgICBCdXR0b24sXG4gICAgQ29udGFpbmVyLFxuICAgIExpc3QsXG4gICAgSW1hZ2UsXG4gICAgR3JpZCxcbiAgICBNZXNzYWdlLFxuICAgIFJhaWwsXG4gICAgU3RpY2t5LFxuICAgIElucHV0LFxuICAgIFNlZ21lbnRcbn0gZnJvbSAnc2VtYW50aWMtdWktcmVhY3QnO1xuaW1wb3J0IEhlYWRlck1lbnUgZnJvbSAnLi4vdmlld3MvSGVhZGVyTWVudSc7XG5pbXBvcnQgTG9naW4gZnJvbSAnLi4vdmlld3MvTG9naW4nO1xuaW1wb3J0IHdlYjMgZnJvbSAnLi4vZXRoZXJldW0vd2ViMyc7XG5pbXBvcnQgUHJpdmF0ZUtleU1vZGFsIGZyb20gJy4uL3ZpZXdzL21vZGFscy9FbnRlclByaXZhdGVLZXlNb2RhbCc7XG5pbXBvcnQgVXBkYXRlUHJvZmlsZU1vZGFsIGZyb20gJy4uL3ZpZXdzL21vZGFscy9VcGRhdGVQcm9maWxlTW9kYWwnO1xuaW1wb3J0IEd1aWRlTW9kYWwgZnJvbSAnLi4vdmlld3MvbW9kYWxzL0d1aWRlTW9kYWwnO1xuaW1wb3J0IEhlYWQgZnJvbSAnbmV4dC9oZWFkJztcbmltcG9ydCBBcHBNYW5hZ2VyIGZyb20gJy4uL2NvcmUvQXBwTWFuYWdlcic7XG5pbXBvcnQgQ29udGFjdExpc3QgZnJvbSAnLi4vdmlld3MvQ29udGFjdExpc3QnO1xuaW1wb3J0IENoYXQgZnJvbSAnLi4vdmlld3MvQ2hhdCc7XG5pbXBvcnQgRXJyb3JNb2RhbCBmcm9tICcuLi92aWV3cy9tb2RhbHMvRXJyb3JNb2RhbCc7XG5pbXBvcnQgU2V0dGluZ3NNb2RhbCBmcm9tICcuLi92aWV3cy9tb2RhbHMvU2V0dGluZ3NNb2RhbCc7XG5pbXBvcnQgVHJhbnNhY3Rpb25Nb2RhbCBmcm9tICcuLi92aWV3cy9tb2RhbHMvVHJhbnNhY3Rpb25Nb2RhbCc7XG5pbXBvcnQgRm9vdGVyIGZyb20gJy4uL3ZpZXdzL0Zvb3Rlcic7XG5cbmNsYXNzIEluZGV4IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7IHdpZHRoOiAwLCBoZWlnaHQ6IDAsIGNvbnRhY3RMaXN0OiBbXSwgbWVzc2FnZXM6IFtdLCBzZWxlY3RlZENvbnRhY3Q6IFwiXCIgfTtcbiAgICAgICAgdGhpcy51cGRhdGVXaW5kb3dEaW1lbnNpb25zID0gdGhpcy51cGRhdGVXaW5kb3dEaW1lbnNpb25zLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuYXBwID0gbmV3IEFwcE1hbmFnZXIoKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy51cGRhdGVXaW5kb3dEaW1lbnNpb25zKCk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLnVwZGF0ZVdpbmRvd0RpbWVuc2lvbnMpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICAgICAgdGhpcy5hcHAuaW5pdGlhbGl6ZSgpO1xuICAgIH1cbiAgICAgIFxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy51cGRhdGVXaW5kb3dEaW1lbnNpb25zKTtcbiAgICB9XG4gICAgICBcbiAgICB1cGRhdGVXaW5kb3dEaW1lbnNpb25zKCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgd2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoLCBoZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCB9KTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHZhciBhY2NvdW50ID0gdGhpcy5hcHAuYWNjb3VudDtcbiAgICAgICAgdmFyIGNvbnRyYWN0TWFuYWdlciA9IHRoaXMuYXBwLmNvbnRyYWN0TWFuYWdlcjtcbiAgICAgICAgdmFyIHRyYW5zYWN0aW9uRGlzcGF0Y2hlciA9IHRoaXMuYXBwLmdldFRyYW5zYWN0aW9uRGlzcGF0Y2hlcigpO1xuXG4gICAgICAgIHZhciBsaXN0SGVpZ2h0ID0gdGhpcy5zdGF0ZS5oZWlnaHQgLSAxNDA7XG5cbiAgICAgICAgY29uc29sZS5sb2coYWNjb3VudCk7XG5cbiAgICAgICAgaWYgKGFjY291bnQuaXNKb2luZWQpe1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJXVEYgV1JFIFUgRE9JTkcgSEVSRVwiKVxuICAgICAgICAgICAgdGhpcy5hcHAuc3RvcmFnZU1hbmFnZXIucmVsb2FkID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxDb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgIDxIZWFkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRpdGxlPkV0aGVyQ2hhdCAtIERlY2VudHJhbGl6ZWQgbWVzc2FnaW5nIG9uIEV0aGVyZXVtIG5ldHdvcms8L3RpdGxlPlxuICAgICAgICAgICAgICAgICAgICA8L0hlYWQ+XG5cbiAgICAgICAgICAgICAgICAgICAgPFVwZGF0ZVByb2ZpbGVNb2RhbCBhY2NvdW50PXthY2NvdW50fSBjb250cmFjdE1hbmFnZXI9e2NvbnRyYWN0TWFuYWdlcn0gLz5cbiAgICAgICAgICAgICAgICAgICAgPFByaXZhdGVLZXlNb2RhbCBhY2NvdW50PXthY2NvdW50fSAvPlxuICAgICAgICAgICAgICAgICAgICA8SGVhZGVyTWVudSBhY2NvdW50PXthY2NvdW50fSB0cmFuc2FjdGlvbkRpc3BhdGNoZXI9e3RyYW5zYWN0aW9uRGlzcGF0Y2hlcn0vPlxuICAgICAgICAgICAgICAgICAgICA8RXJyb3JNb2RhbCAvPlxuICAgICAgICAgICAgICAgICAgICA8U2V0dGluZ3NNb2RhbCBhY2NvdW50PXthY2NvdW50fSAvPlxuICAgICAgICAgICAgICAgICAgICA8VHJhbnNhY3Rpb25Nb2RhbCBkaXNwYXRjaGVyPXt0cmFuc2FjdGlvbkRpc3BhdGNoZXJ9IC8+XG4gICAgICAgICAgICAgICAgPEdyaWQgY29sdW1uPXsyfSBzdHlsZT17e3BhZGRpbmdUb3A6IDUwLCB3aWR0aDpcIjEwMCVcIn19PlxuICAgICAgICAgICAgICAgICAgICA8R3JpZC5Sb3cgc3RyZXRjaGVkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEdyaWQuQ29sdW1uIHdpZHRoPXs2fSBzdHlsZT17e2hlaWdodDogbGlzdEhlaWdodCArIFwicHhcIiwgZmxvYXQ6ICdsZWZ0J319PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxDb250YWN0TGlzdCBoZWlnaHQ9e2xpc3RIZWlnaHR9IGFjY291bnQ9e2FjY291bnR9IGNvbnRyYWN0TWFuYWdlcj17Y29udHJhY3RNYW5hZ2VyfS8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L0dyaWQuQ29sdW1uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEdyaWQuQ29sdW1uIHdpZHRoPXsxMH0gc3R5bGU9e3toZWlnaHQ6IGxpc3RIZWlnaHQgKyBcInB4XCIsIG92ZXJmbG93OiAnYXV0bycsIGZsb2F0OiAnbGVmdCd9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q2hhdCBoZWlnaHQ9e2xpc3RIZWlnaHR9IGFjY291bnQ9e2FjY291bnR9IGNvbnRyYWN0TWFuYWdlcj17Y29udHJhY3RNYW5hZ2VyfS8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L0dyaWQuQ29sdW1uPlxuICAgICAgICAgICAgICAgICAgICA8L0dyaWQuUm93PlxuICAgICAgICAgICAgICAgIDwvR3JpZD5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIDwvQ29udGFpbmVyPlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICA8TG9naW4gYWNjb3VudD17YWNjb3VudH0gc3RvcmFnZU1hbmFnZXI9e3RoaXMuYXBwLnN0b3JhZ2VNYW5hZ2VyfSBjb250cmFjdE1hbmFnZXI9e2NvbnRyYWN0TWFuYWdlcn0vPlxuXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgXG4gICAgICAgIH1cblxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgSW5kZXg7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcGFnZXM/ZW50cnkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFhQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7O0FBcEJBO0FBR0E7QUFDQTs7QUFrQkE7QUFDQTtBQURBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFTQTtBQUNBO0FBWkE7QUFDQTtBQWdDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQURBO0FBSUE7QUFBQTtBQUVBO0FBQ0E7QUE3Q0E7QUFDQTtBQThDQTtBQUVBO0FBQUE7QUFqREE7QUFDQTtBQW1EQTtBQUNBO0FBckRBO0FBQ0E7QUF1REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFFQTtBQUNBO0FBQUE7QUFqRUE7QUFDQTtBQW1FQTtBQUNBO0FBQ0E7QUFBQTtBQXBFQTtBQUNBO0FBREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUFNQTtBQUNBO0FBQ0E7QUFEQTtBQUVBO0FBQUE7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7Ozs7QUE0Q0E7QUFBQTs7QUFBQTtBQUVBO0FBRkE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBREE7QUFFQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRkE7QUFNQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSUE7QUFDQTtBQURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUFBO0FBTUE7QUFDQTtBQUFBO0FBQUE7QUFFQTs7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQURBO0FBQUE7QUFTQTtBQVRBO0FBRkE7QUFhQTtBQUNBO0FBQ0E7QUFGQTtBQUFBO0FBQUE7QUFBQTtBQU1BO0FBQ0E7QUFBQTtBQUFBO0FBRUE7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUNBO0FBQ0E7QUFEQTtBQUNBO0FBS0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBQUE7O0FBQ0E7QUFDQTtBQURBO0FBQUE7O0FBQ0E7QUFDQTtBQURBO0FBQUE7O0FBQ0E7QUFDQTtBQURBO0FBQUE7QUFDQTtBQUNBO0FBREE7QUFDQTs7QUFHQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBOztBQUtBO0FBQ0E7QUFEQTtBQUFBO0FBcEVBO0FBMkVBO0FBQUE7QUFDQTtBQURBO0FBQUE7O0FBQ0E7QUFDQTtBQURBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFJQTtBQUNBO0FBbkZBO0FBb0ZBO0FBQUE7QUFDQTtBQURBO0FBQUE7QUFFQTtBQUVBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUFBOztBQUNBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7QUFFQTtBQUZBO0FBRUE7O0FBQUE7QUFDQTtBQURBO0FBQUE7O0FBQ0E7QUFJQTtBQUpBO0FBQUE7Ozs7Ozs7QUFPQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6TUE7QUFDQTs7O0FBTUE7QUFDQTtBQUNBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7Ozs7OztBQUVBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBQUE7QUFDQTtBQWtCQTtBQUNBO0FBckJBO0FBQ0E7QUEyQkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBRkE7QUFBQTtBQUVBO0FBQ0E7QUFIQTtBQUFBO0FBR0E7QUFDQTtBQURBO0FBSEE7QUFDQTtBQUdBO0FBSkE7QUFBQTtBQUtBO0FBQ0E7QUFEQTtBQUNBO0FBTkE7QUFBQTtBQUNBO0FBREE7QUFTQTtBQUNBO0FBQ0E7QUFEQTtBQUlBO0FBRUE7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQVhBO0FBQ0E7QUFWQTtBQUFBO0FBQUE7QUFDQTtBQXFCQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBekJBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBNUJBO0FBQ0E7QUEwREE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUZBO0FBQUE7QUFHQTtBQUNBO0FBREE7QUFIQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQU9BO0FBQUE7QUFFQTtBQWJBO0FBQ0E7QUFEQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQTNEQTtBQUNBO0FBREE7QUFBQTtBQUFBO0FBRUE7QUFDQTtBQURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTs7OztBQVVBO0FBQUE7QUFBQTtBQUNBOzs7O0FBaURBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7O0FBQUE7QUFDQTtBQURBO0FBQUE7O0FBQ0E7QUFDQTtBQURBO0FBQUE7O0FBQ0E7QUFFQTtBQUZBO0FBRUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSUE7O0FBQUE7QUFDQTtBQURBO0FBQUE7QUFDQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBOztBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7QUFBQTs7QUFBQTtBQUNBO0FBREE7QUFDQTs7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7O0FBQUE7QUFDQTtBQURBO0FBQ0E7O0FBQUE7QUFBQTtBQUFBO0FBT0E7QUFBQTtBQUVBO0FBRkE7QUFFQTtBQUFBO0FBQ0E7QUFEQTtBQUNBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7O0FBQUE7QUFDQTtBQURBO0FBQUE7QUFDQTtBQUNBO0FBREE7QUFDQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFJQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFDQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFDQTtBQUFBO0FBQUE7QUFHQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBQUE7QUFDQTtBQURBO0FBQ0E7O0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUEvQ0E7QUFBQTtBQUFBO0FBQUE7QUFrWEE7QUFsWEE7Ozs7Ozs7QUFvWEE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNWNBO0FBQ0E7OztBQU1BO0FBQ0E7QUFDQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7Ozs7QUFoQkE7QUFHQTtBQUNBOztBQWNBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBYUE7QUFFQTtBQUFBO0FBQ0E7QUFsQkE7QUFDQTtBQW9CQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBTkE7QUFRQTtBQUVBO0FBOUJBO0FBQ0E7QUFEQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUFFQTtBQUNBO0FBQ0E7QUFEQTtBQUNBO0FBQ0E7QUFFQTtBQUNBOzs7O0FBcUJBO0FBQ0E7QUFDQTtBQUFBOztBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7QUFDQTtBQURBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQU1BOzs7Ozs7O0FBR0E7Ozs7Ozs7Ozs7QUNuRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2NBO0FBQ0E7QUFDQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7Ozs7QUFwQkE7QUFHQTtBQUNBOztBQWtCQTtBQUNBO0FBREE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQStCQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBRkE7QUFLQTtBQUNBO0FBQ0E7QUFEQTtBQUlBO0FBNUNBO0FBQ0E7QUE2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFEQTtBQUNBO0FBQ0E7QUFFQTtBQUhBO0FBSUE7QUFFQTtBQUhBO0FBSUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQW5CQTtBQW9CQTtBQUNBO0FBQ0E7QUFEQTtBQUlBO0FBeEVBO0FBQ0E7QUF5RUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUdBO0FBSEE7QUFHQTtBQXJGQTtBQUNBO0FBREE7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FBS0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQUE7Ozs7QUFHQTtBQUNBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFEQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7Ozs7QUE0REE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBREE7QUFDQTtBQUNBOzs7QUFDQTtBQUNBO0FBREE7QUFBQTtBQURBO0FBSUE7QUFDQTtBQUNBO0FBREE7QUFBQTs7QUFDQTtBQUNBO0FBREE7QUFBQTs7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUlBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFSQTtBQVVBO0FBQ0E7QUFDQTtBQUVBO0FBQUE7QUFFQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBRUE7QUFEQTtBQUFBO0FBQUE7QUFFQTtBQUNBO0FBQUE7QUFDQTtBQURBO0FBQUE7QUFDQTs7QUFGQTtBQU1BO0FBTkE7O0FBTEE7QUFhQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBRUE7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUNBOztBQUZBO0FBSUE7QUFKQTtBQUlBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUNBOztBQUZBO0FBTUE7QUFOQTs7QUFQQTtBQWVBO0FBQUE7QUFDQTtBQURBO0FBQUE7QUFFQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7O0FBRkE7QUFNQTtBQU5BOztBQVFBO0FBQ0E7QUFEQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBQUE7QUFDQTtBQUNBO0FBREE7QUFDQTs7QUFBQTtBQUNBO0FBREE7QUFBQTs7QUFDQTtBQUNBO0FBREE7QUFBQTtBQVNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7QUFDQTtBQURBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQUE7QUFDQTtBQURBO0FBS0E7Ozs7Ozs7QUFHQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3TEE7QUFDQTtBQUNBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7OztBQTlCQTtBQUdBO0FBQ0E7O0FBNEJBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FBR0E7QUFDQTtBQUFBOzs7O0FBSUE7QUFBQTs7OztBQUlBO0FBQUE7Ozs7QUFJQTtBQUFBOzs7O0FBSUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7O0FBQUE7QUFDQTtBQURBO0FBQUE7O0FBQ0E7QUFDQTtBQURBO0FBQUE7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFHQTtBQUNBO0FBREE7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBQUE7QUFDQTtBQURBO0FBQ0E7O0FBQUE7QUFDQTtBQURBO0FBQUE7QUFDQTtBQUNBO0FBREE7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBQUE7QUFFQTtBQUZBO0FBRUE7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUFBO0FBT0E7QUFQQTs7QUFyQkE7QUErQkE7QUFBQTtBQUlBO0FBSkE7QUFBQTtBQU1BOzs7Ozs7O0FBR0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QSIsInNvdXJjZVJvb3QiOiIifQ==