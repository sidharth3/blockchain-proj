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
                                css: '.logOut.jsx-1282957925:hover{cursor:pointer;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZXdzL0hlYWRlck1lbnUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBaUlnRCxBQUl3QyxlQUFDIiwiZmlsZSI6InZpZXdzL0hlYWRlck1lbnUuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3RoZWJlL0Rlc2t0b3AvYmxvY2tjaGFpbi1wcm9qIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE4IE5ndXllbiBWdSBOaGF0IE1pbmhcbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSBNSVQgc29mdHdhcmUgbGljZW5zZSwgc2VlIHRoZSBhY2NvbXBhbnlpbmcgZmlsZSBMSUNFTlNFXG5cbmltcG9ydCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQge1xuICAgIE1lbnUsXG4gICAgQ29udGFpbmVyLFxuICAgIEJ1dHRvbixcbiAgICBMYWJlbCxcbiAgICBMb2FkZXIsXG4gICAgTGlzdCxcbiAgICBJbWFnZSxcbiAgICBJY29uLFxuICAgIERyb3Bkb3duXG59IGZyb20gJ3NlbWFudGljLXVpLXJlYWN0JztcbmltcG9ydCBIZWFkIGZyb20gJ25leHQvaGVhZCc7XG5pbXBvcnQgd2ViMyBmcm9tICcuLi9ldGhlcmV1bS93ZWIzJztcbmltcG9ydCBDb25zdGFudCBmcm9tICcuLi9zdXBwb3J0L0NvbnN0YW50JztcbmltcG9ydCBDb25maWcgZnJvbSAnLi4vc3VwcG9ydC9Db25maWcnO1xuaW1wb3J0IGFwcERpc3BhdGNoZXIgZnJvbSAnLi4vY29yZS9BcHBEaXNwYXRjaGVyJztcblxuY2xhc3MgSGVhZGVyTWVudSBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLmFjY291bnQgPSBwcm9wcy5hY2NvdW50O1xuICAgICAgICB0aGlzLmNvbnRyYWN0TWFuYWdlciA9IHByb3BzLmNvbnRyYWN0TWFuYWdlcjtcbiAgICAgICAgdGhpcy50cmFuc2FjdGlvbkRpc3BhdGNoZXIgPSBwcm9wcy50cmFuc2FjdGlvbkRpc3BhdGNoZXI7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7YWRkcmVzczogXCJcIiwgYmFsYW5jZTogXCJcIiwgbmFtZTogXCJcIiwgXG4gICAgICAgICAgICBhdmF0YXJVcmw6IFwiXCIsIGlzTG9hZGluZzogdHJ1ZSwgaXNKb2luQnV0dG9uTG9hZGluZzogZmFsc2UsIFxuICAgICAgICAgICAgaXNKb2luZWQ6IGZhbHNlLCBudW1QZW5kaW5nVHg6IDB9O1xuICAgICAgICB0aGlzLnJlbG9hZENvdW50ID0gMDtcbiAgICB9XG5cbiAgICBjbGVhckFsbERhdGEgPSAoKSA9PiB7XG4gICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2UuY2xlYXIoKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgaWYgKHRoaXMuYWNjb3VudCkge1xuICAgICAgICAgICAgdGhpcy5nZXRBY2NvdW50SW5mbygpO1xuICAgICAgICAgICAgYXBwRGlzcGF0Y2hlci5yZWdpc3RlcigocGF5bG9hZCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChwYXlsb2FkLmFjdGlvbiA9PSBDb25zdGFudC5FVkVOVC5BQ0NPVU5UX0JBTEFOQ0VfVVBEQVRFRCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtiYWxhbmNlOiB0aGlzLmFjY291bnQuYmFsYW5jZX0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocGF5bG9hZC5hY3Rpb24gPT0gQ29uc3RhbnQuRVZFTlQuQUNDT1VOVF9JTkZPX1VQREFURUQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7bmFtZTogcGF5bG9hZC5wcm9maWxlLm5hbWUsIGF2YXRhclVybDogcGF5bG9hZC5wcm9maWxlLmF2YXRhclVybCwgaXNKb2luZWQ6IHBheWxvYWQucHJvZmlsZS5pc0pvaW5lZH0pO1xuICAgICAgICAgICAgICAgIH0gXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMudHJhbnNhY3Rpb25EaXNwYXRjaGVyLnJlZ2lzdGVyKChwYXlsb2FkKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHBheWxvYWQuYWN0aW9uID09IENvbnN0YW50LkVWRU5ULlBFTkRJTkdfVFJBTlNBQ1RJT05fVVBEQVRFRCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtudW1QZW5kaW5nVHg6IHBheWxvYWQubnVtUGVuZGluZ1R4fSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRBY2NvdW50SW5mbyA9ICgpID0+IHtcbiAgICAgICAgdmFyIGFkZHJlc3MgPSB0aGlzLmFjY291bnQuZ2V0QWRkcmVzcygpO1xuICAgICAgICBpZiAoYWRkcmVzcykge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7YWRkcmVzczogYWRkcmVzcywgYmFsYW5jZTogdGhpcy5hY2NvdW50LmJhbGFuY2UsIGlzTG9hZGluZzogZmFsc2UsIGlzSm9pbmVkOiB0aGlzLmFjY291bnQuaXNKb2luZWR9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnJlbG9hZENvdW50ID09IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtpc0xvYWRpbmc6IGZhbHNlfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMucmVsb2FkQ291bnQrKztcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KHRoaXMuZ2V0QWNjb3VudEluZm8sIDgwMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVEcm9wZG93bkNsaWNrZWQgPSAoZXZlbnQsIGRhdGEpID0+IHtcbiAgICAgICAgdGhpcy5jbGVhckFsbERhdGEoKTtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpOyBcbiAgICB9XG5cbiAgICByZW1vdmVOZXR3b3JrRGVwZW5kZW50RGF0YSA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5hY2NvdW50LnN0b3JhZ2VNYW5hZ2VyLnJlbW92ZU5ldHdvcmtEZXBlbmRlbnREYXRhKCk7XG4gICAgfVxuXG4gICAgaGFuZGxlSm9pbkNsaWNrZWQgPSAoKSA9PiB7XG4gICAgICAgIHZhciBwdWJsaWNLZXlCdWZmZXIgPSB0aGlzLmFjY291bnQuZ2V0UHVibGljS2V5QnVmZmVyKCk7XG4gICAgICAgIHRoaXMuY29udHJhY3RNYW5hZ2VyLmpvaW5Db250cmFjdChwdWJsaWNLZXlCdWZmZXIsIChyZXN1bHRFdmVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKHJlc3VsdEV2ZW50ID09IENvbnN0YW50LkVWRU5ULk9OX1JFSkVDVEVEIHx8IHJlc3VsdEV2ZW50ID09IENvbnN0YW50LkVWRU5ULk9OX0VSUk9SKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aXNKb2luQnV0dG9uTG9hZGluZzogZmFsc2V9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzdWx0RXZlbnQgPT0gQ29uc3RhbnQuRVZFTlQuT05fUkVDRUlQVCkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2lzSm9pbkJ1dHRvbkxvYWRpbmc6IHRydWV9KTtcbiAgICB9XG5cbiAgICBoYW5kbGVJbXBvcnRQcml2YXRlS2V5Q2xpY2tlZCA9ICgpID0+IHtcbiAgICAgICAgYXBwRGlzcGF0Y2hlci5kaXNwYXRjaCh7XG4gICAgICAgICAgICBhY3Rpb246IENvbnN0YW50LkFDVElPTi5PUEVOX1BSSVZBVEVfS0VZX01PREFMXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgdmFyIGFjY291bnRJbmZvID0gKDxkaXY+PC9kaXY+KTtcblxuICAgICAgICBpZiAodGhpcy5hY2NvdW50KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZS5pc0xvYWRpbmcgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZS5hZGRyZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBhZGRyZXNzRXhwbG9yZXJVcmwgPSBDb25maWcuRU5WLkV4cGxvcmVyVXJsICsgJ2FkZHJlc3MvJyArIHRoaXMuc3RhdGUuYWRkcmVzcztcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRyb3Bkb3duVHJpZ2dlcjtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZS5hdmF0YXJVcmwpIHsgXG4gICAgICAgICAgICAgICAgICAgICAgICBkcm9wZG93blRyaWdnZXIgPSAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+PEltYWdlIHNyYz17dGhpcy5zdGF0ZS5hdmF0YXJVcmx9IGF2YXRhci8+eyB0aGlzLnN0YXRlLm5hbWUgPyB0aGlzLnN0YXRlLm5hbWUgOiB0aGlzLnN0YXRlLmFkZHJlc3Muc3Vic3RyKDAsMTApfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkcm9wZG93blRyaWdnZXIgPSAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+PEljb24gbmFtZT0ndXNlcicgc2l6ZT0nbGFyZ2UnLz57IHRoaXMuc3RhdGUubmFtZSA/IHRoaXMuc3RhdGUubmFtZSA6IHRoaXMuc3RhdGUuYWRkcmVzcy5zdWJzdHIoMCwxMCl9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXR3b3JrSXRlbXMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaT0wO2k8Q29uZmlnLk5FVFdPUktfTElTVC5sZW5ndGg7aSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXR3b3JrSXRlbXMucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RHJvcGRvd24uSXRlbSBrZXk9eyduZXR3b3JrSXRlbScgKyBpfSBuZXR3b3JraWQ9e0NvbmZpZy5ORVRXT1JLX0xJU1RbaV0uaWR9IG5hbWU9J2NoYW5nZUV0aE5ldHdvcmsnIG9uQ2xpY2s9e3RoaXMuaGFuZGxlRHJvcGRvd25DbGlja2VkfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge0NvbmZpZy5ORVRXT1JLX0xJU1RbaV0ubmFtZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0Ryb3Bkb3duLkl0ZW0+XG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIG1lbWJlckluZm87XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmFjY291bnQuaXNKb2luZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lbWJlckluZm8gPSAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2xvZ091dCcgbmFtZT0nbG9nT3V0SXRlbScgb25DbGljaz17dGhpcy5oYW5kbGVEcm9wZG93bkNsaWNrZWR9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8SWNvbiBuYW1lPSdsb2cgb3V0Jy8+TG9nIG91dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHN0eWxlIGpzeD57YFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5sb2dPdXQ6aG92ZXJ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnNvcjpwb2ludGVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYH08L3N0eWxlPiAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtZW1iZXJJbmZvID0gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxCdXR0b24gY29sb3I9J29yYW5nZScgb25DbGljaz17dGhpcy5oYW5kbGVKb2luQ2xpY2tlZH0gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRpbmc9e3RoaXMuc3RhdGUuaXNKb2luQnV0dG9uTG9hZGluZ30gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXt0aGlzLnN0YXRlLmlzSm9pbkJ1dHRvbkxvYWRpbmd9PkpvaW4ge0NvbnN0YW50LkFQUF9OQU1FfTwvQnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHZhciBwZW5kaW5nVHhJdGVtO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZS5udW1QZW5kaW5nVHggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwZW5kaW5nVHhJdGVtID0gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxMYWJlbCBhcz0nYScgY29sb3I9J3llbGxvdycgaHJlZj17YWRkcmVzc0V4cGxvcmVyVXJsfSB0YXJnZXQ9J19ibGFuayc+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxJY29uIG5hbWU9J3NwaW5uZXInIGxvYWRpbmcvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5zdGF0ZS5udW1QZW5kaW5nVHh9IHBlbmRpbmcgdHhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGFjY291bnRJbmZvID0gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPE1lbnUuTWVudSBwb3NpdGlvbj0ncmlnaHQgJz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TWVudS5JdGVtPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TGlzdD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPExpc3QuSXRlbT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9e2FkZHJlc3NFeHBsb3JlclVybH0gdGFyZ2V0PSdfYmxhbmsnPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLnN0YXRlLmFkZHJlc3N9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvTGlzdC5JdGVtPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TGlzdC5JdGVtPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQmFsYW5jZTogPExhYmVsIGFzPSdhJyBocmVmPXthZGRyZXNzRXhwbG9yZXJVcmx9IHRhcmdldD0nX2JsYW5rJyBjb2xvcj0nb3JhbmdlJz57cGFyc2VGbG9hdCh3ZWIzLnV0aWxzLmZyb21XZWkoXCJcIiArdGhpcy5zdGF0ZS5iYWxhbmNlLCAnZXRoZXInKSkudG9GaXhlZCg4KSArICcgRVRIJyB9PC9MYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtwZW5kaW5nVHhJdGVtfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0xpc3QuSXRlbT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9MaXN0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvTWVudS5JdGVtPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxNZW51Lkl0ZW0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHttZW1iZXJJbmZvfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvTWVudS5JdGVtPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9NZW51Lk1lbnU+XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYWNjb3VudEluZm8gPSAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8TWVudS5NZW51IHBvc2l0aW9uPSdyaWdodCc+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPE1lbnUuSXRlbT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEJ1dHRvbiBvbkNsaWNrPXt0aGlzLmhhbmRsZUltcG9ydFByaXZhdGVLZXlDbGlja2VkfSBjb2xvcj0nYmx1ZSc+SW1wb3J0IHByaXZhdGUga2V5PC9CdXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9NZW51Lkl0ZW0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L01lbnUuTWVudT5cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGFjY291bnRJbmZvID0gKDxMb2FkZXIgaW52ZXJ0ZWQgYWN0aXZlIC8+KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8TWVudSBmaXhlZD0ndG9wJyBjb2xvcj0nYmx1ZScgaW52ZXJ0ZWQ+XG4gICAgICAgICAgICAgICAgPEhlYWQ+XG4gICAgICAgICAgICAgICAgPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIGhyZWY9XCIvL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9zZW1hbnRpYy11aS8yLjIuMTIvc2VtYW50aWMubWluLmNzc1wiPjwvbGluaz5cbiAgICAgICAgICAgICAgICA8L0hlYWQ+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMuYWNjb3VudCA/IGFjY291bnRJbmZvOiAoPGRpdj48L2Rpdj4pfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9NZW51PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgSGVhZGVyTWVudTsiXX0= */\n/*@ sourceURL=views/HeaderMenu.js */'
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZXdzL0hlYWRlck1lbnUuanMiXSwibmFtZXMiOlsiQ29tcG9uZW50IiwiTWVudSIsIkNvbnRhaW5lciIsIkJ1dHRvbiIsIkxhYmVsIiwiTG9hZGVyIiwiTGlzdCIsIkltYWdlIiwiSWNvbiIsIkRyb3Bkb3duIiwiSGVhZCIsIndlYjMiLCJDb25zdGFudCIsIkNvbmZpZyIsImFwcERpc3BhdGNoZXIiLCJIZWFkZXJNZW51IiwicHJvcHMiLCJjbGVhckFsbERhdGEiLCJ3aW5kb3ciLCJsb2NhbFN0b3JhZ2UiLCJjbGVhciIsImdldEFjY291bnRJbmZvIiwiYWRkcmVzcyIsImFjY291bnQiLCJnZXRBZGRyZXNzIiwic2V0U3RhdGUiLCJiYWxhbmNlIiwiaXNMb2FkaW5nIiwiaXNKb2luZWQiLCJyZWxvYWRDb3VudCIsInNldFRpbWVvdXQiLCJoYW5kbGVEcm9wZG93bkNsaWNrZWQiLCJldmVudCIsImRhdGEiLCJsb2NhdGlvbiIsInJlbG9hZCIsInJlbW92ZU5ldHdvcmtEZXBlbmRlbnREYXRhIiwic3RvcmFnZU1hbmFnZXIiLCJoYW5kbGVKb2luQ2xpY2tlZCIsInB1YmxpY0tleUJ1ZmZlciIsImdldFB1YmxpY0tleUJ1ZmZlciIsImNvbnRyYWN0TWFuYWdlciIsImpvaW5Db250cmFjdCIsInJlc3VsdEV2ZW50IiwiRVZFTlQiLCJPTl9SRUpFQ1RFRCIsIk9OX0VSUk9SIiwiaXNKb2luQnV0dG9uTG9hZGluZyIsIk9OX1JFQ0VJUFQiLCJoYW5kbGVJbXBvcnRQcml2YXRlS2V5Q2xpY2tlZCIsImRpc3BhdGNoIiwiYWN0aW9uIiwiQUNUSU9OIiwiT1BFTl9QUklWQVRFX0tFWV9NT0RBTCIsInRyYW5zYWN0aW9uRGlzcGF0Y2hlciIsInN0YXRlIiwibmFtZSIsImF2YXRhclVybCIsIm51bVBlbmRpbmdUeCIsInJlZ2lzdGVyIiwicGF5bG9hZCIsIkFDQ09VTlRfQkFMQU5DRV9VUERBVEVEIiwiQUNDT1VOVF9JTkZPX1VQREFURUQiLCJwcm9maWxlIiwiUEVORElOR19UUkFOU0FDVElPTl9VUERBVEVEIiwiYWNjb3VudEluZm8iLCJhZGRyZXNzRXhwbG9yZXJVcmwiLCJFTlYiLCJFeHBsb3JlclVybCIsImRyb3Bkb3duVHJpZ2dlciIsInN1YnN0ciIsIm5ldHdvcmtJdGVtcyIsImkiLCJORVRXT1JLX0xJU1QiLCJsZW5ndGgiLCJwdXNoIiwiaWQiLCJtZW1iZXJJbmZvIiwiQVBQX05BTUUiLCJwZW5kaW5nVHhJdGVtIiwicGFyc2VGbG9hdCIsInV0aWxzIiwiZnJvbVdlaSIsInRvRml4ZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJQSxBQUNJLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQTs7QUFFSixBQUFPOzs7O0FBQ1AsQUFBTyxBQUFVOzs7O0FBQ2pCLEFBQU8sQUFBYzs7OztBQUNyQixBQUFPLEFBQVk7Ozs7QUFDbkIsQUFBTyxBQUFtQjs7Ozs7OztBQW5CMUI7QUFDQSxBQUVBLEFBQVE7O0ksQUFrQkY7d0NBQ0Y7O3dCQUFBLEFBQVksT0FBTzs0Q0FBQTs7a0pBQUEsQUFDVDs7Y0FEUyxBQVduQixlQUFlLFlBQU0sQUFDakI7bUJBQUEsQUFBTyxhQUFQLEFBQW9CLEFBQ3ZCO0FBYmtCOztjQUFBLEFBaUNuQixpQkFBaUIsWUFBTSxBQUNuQjtnQkFBSSxVQUFVLE1BQUEsQUFBSyxRQUFuQixBQUFjLEFBQWEsQUFDM0I7Z0JBQUEsQUFBSSxTQUFTLEFBQ1Q7c0JBQUEsQUFBSyxTQUFTLEVBQUMsU0FBRCxBQUFVLFNBQVMsU0FBUyxNQUFBLEFBQUssUUFBakMsQUFBeUMsU0FBUyxXQUFsRCxBQUE2RCxPQUFPLFVBQVUsTUFBQSxBQUFLLFFBQWpHLEFBQWMsQUFBMkYsQUFDNUc7QUFGRCxtQkFFTyxBQUNIO29CQUFJLE1BQUEsQUFBSyxlQUFULEFBQXdCLEdBQUcsQUFDdkI7MEJBQUEsQUFBSyxTQUFTLEVBQUMsV0FBZixBQUFjLEFBQVksQUFDN0I7QUFGRCx1QkFFTyxBQUNIOzBC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QUEsQUFDSTtBQURKO0FBQUEsMkNBQ0ksQUFBQzs7MENBQUQ7NENBQUEsQUFDQTtBQURBO0FBQUEsMkNBQ0MsY0FBRCxzQkFBQSxBQUFNOzswQ0FBTjs0Q0FBQSxBQUNJO0FBREo7QUFBQSwyQ0FDSSxjQUFBLE9BQUcsTUFBSCxBQUFTLG9CQUFvQixRQUE3QixBQUFvQzswQ0FBcEM7NENBQUEsQUFDSztBQURMO2dDQUNLLEFBQUssTUFIZCxBQUNBLEFBQ0ksQUFDZ0IsQUFHcEIsMkJBQUMsY0FBRCxzQkFBQSxBQUFNOzswQ0FBTjs0Q0FBQTtBQUFBO0FBQUEsMkJBQ2EsNkJBQUEsQUFBQyx3Q0FBTSxJQUFQLEFBQVUsS0FBSSxNQUFkLEFBQW9CLG9CQUFvQixRQUF4QyxBQUErQyxVQUFTLE9BQXhELEFBQThEOzBDQUE5RDs0Q0FBQSxBQUF3RTtBQUF4RTtzQ0FBbUYsY0FBQSxBQUFLLE1BQUwsQUFBVyxRQUFRLEtBQUksS0FBQSxBQUFLLE1BQTVCLEFBQWtDLFNBQTdDLEFBQVcsQUFBMkMsVUFBdEQsQUFBZ0UsUUFBaEUsQUFBd0UsS0FEN0osQUFDYSxBQUFxSixBQUM3SixTQVZiLEFBQ0ksQUFDSSxBQU1BLEFBTUosa0NBQUMsY0FBRCxzQkFBQSxBQUFNOzswQ0FBTjs0Q0FBQSxBQUNLO0FBREw7QUFBQSwyQkFmUixBQUNJLEFBY0ksQUFLWDtBQXpFRCwyQkF5RU8sQUFDSDtzREFDSyxjQUFELHNCQUFBLEFBQU0sUUFBSyxVQUFYLEFBQW9COzBDQUFwQjs0Q0FBQSxBQUNJO0FBREo7eUJBQUEsa0JBQ0ssY0FBRCxzQkFBQSxBQUFNOzswQ0FBTjs0Q0FBQSxBQUNJO0FBREo7QUFBQSwyQ0FDSSxBQUFDLHlDQUFPLFNBQVMsS0FBakIsQUFBc0IsK0JBQStCLE9BQXJELEFBQTJEOzBDQUEzRDs0Q0FBQTtBQUFBOzJCQUhaLEFBQ0ksQUFDSSxBQUNJLEFBSWY7QUFDSjtBQW5GRCx1QkFtRk8sQUFDSDtrREFBZSxBQUFDLHlDQUFPLFVBQVIsTUFBaUIsUUFBakI7c0NBQUE7d0NBQWYsQUFBZSxBQUNsQjtBQURrQjtxQkFBQTtBQUV0QjtBQUVEOzttQ0FDSSxBQUFDLHVDQUFLLE9BQU4sQUFBWSxPQUFNLE9BQWxCLEFBQXdCLFFBQU8sVUFBL0I7OEJBQUE7Z0NBQUEsQUFDSTtBQURKO2FBQUEsa0JBQ0ksQUFBQzs7OEJBQUQ7Z0NBQUEsQUFDQTtBQURBO0FBQUEsdURBQ00sS0FBTixBQUFVLGNBQWEsTUFBdkIsQUFBNEI7OEJBQTVCO2dDQUZKLEFBQ0ksQUFDQSxBQUVBO0FBRkE7aUNBRUEsY0FBQTs7OEJBQUE7Z0NBQUEsQUFDSztBQURMO0FBQUEsb0JBQ0ssQUFBSyxVQUFMLEFBQWU7OzhCQUFjO2dDQU4xQyxBQUNJLEFBSUksQUFDa0MsQUFJN0M7QUFKNkM7QUFBQSxhQUFBOzs7OztBLEFBN0t6QixBQW9MekI7O2tCQUFBLEFBQWUiLCJmaWxlIjoiSGVhZGVyTWVudS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvdGhlYmUvRGVza3RvcC9ibG9ja2NoYWluLXByb2oifQ==