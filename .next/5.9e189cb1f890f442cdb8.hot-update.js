webpackHotUpdate(5,{

/***/ 1056:
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

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "/Users/thebe/Desktop/blockchain-proj/views/HeaderMenu.js"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/Users/thebe/Desktop/blockchain-proj/views/HeaderMenu.js"); } } })();

/***/ }),

/***/ 1327:
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

var _style = __webpack_require__(706);

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

var _jsxFileName = '/Users/thebe/Desktop/blockchain-proj/views/Login.js';


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
        className: 'jsx-776868261' + ' ' + 'landingPage',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 94
        }
      }, _react2.default.createElement(_head2.default, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 95
        }
      }, _react2.default.createElement('title', {
        className: 'jsx-776868261',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 96
        }
      }, 'Ethereum Messenger'), _react2.default.createElement('link', { rel: 'shortcut icon', href: '/static/images/favicon.ico', className: 'jsx-776868261',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 97
        }
      }), _react2.default.createElement('link', { rel: 'stylesheet', href: '//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css', className: 'jsx-776868261',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 98
        }
      })), _react2.default.createElement(_semanticUiReact.Image, { src: 'static/images/ethereum-messenger-logo.png', height: 150, style: { marginTop: "1.5vw" }, __source: {
          fileName: _jsxFileName,
          lineNumber: 100
        }
      }), _react2.default.createElement('br', {
        className: 'jsx-776868261',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 101
        }
      }), _react2.default.createElement('h1', { 'font-family': 'Tahoma', className: 'jsx-776868261' + ' ' + 'title',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 102
        }
      }, 'Welcome to Ethereum Messenger!'), _react2.default.createElement('p', {
        className: 'jsx-776868261' + ' ' + 'description',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 106
        }
      }, 'Send a private message to your friends that will never be lost!'), _react2.default.createElement('div', {
        className: 'jsx-776868261' + ' ' + 'loginBox',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 110
        }
      }, _react2.default.createElement('div', {
        className: 'jsx-776868261' + ' ' + 'loginTitle',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 111
        }
      }, ' Sign in to Block-Forever'), _react2.default.createElement('div', {
        className: 'jsx-776868261' + ' ' + 'loginForm',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 112
        }
      }, _react2.default.createElement('form', { hidden: this.state.walletAddress != "", onSubmit: function onSubmit(e) {
          return _this3.nextClicked(e);
        }, className: 'jsx-776868261' + ' ' + 'loginForm',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 113
        }
      }, _react2.default.createElement('label', { htmlFor: 'priKey', className: 'jsx-776868261' + ' ' + 'loginFields',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 114
        }
      }, 'Enter Private Key:'), _react2.default.createElement('input', { value: this.state.privateKey, type: 'text', onChange: function onChange(e) {
          return _this3.setState({ privateKey: e.target.value });
        }, required: true, className: 'jsx-776868261' + ' ' + 'loginFields privateKey',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 115
        }
      }), _react2.default.createElement('button', { type: 'submit', className: 'jsx-776868261' + ' ' + 'loginFields submitButton',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 116
        }
      }, 'Next')), _react2.default.createElement(_semanticUiReact.Message, { error: true, header: this.state.errorMessage, hidden: this.state.errorMessage == "", __source: {
          fileName: _jsxFileName,
          lineNumber: 123
        }
      }), _react2.default.createElement(_semanticUiReact.Message, { text: true, positive: true, hidden: this.state.walletAddress == "", __source: {
          fileName: _jsxFileName,
          lineNumber: 125
        }
      }, _react2.default.createElement(_semanticUiReact.Message.Header, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 126
        }
      }, 'Join Ethereum Messenger as ', _react2.default.createElement('br', {
        className: 'jsx-776868261',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 127
        }
      }), _react2.default.createElement(_semanticUiReact.Container, { fluid: true, textAlign: 'center', style: { marginTop: "1vw" }, __source: {
          fileName: _jsxFileName,
          lineNumber: 128
        }
      }, _react2.default.createElement('b', { style: { fontSize: "2vw" }, className: 'jsx-776868261',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 129
        }
      }, '0x', this.state.walletAddress), _react2.default.createElement('br', {
        className: 'jsx-776868261',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 129
        }
      }), _react2.default.createElement(_semanticUiReact.Button, { onClick: this.handleJoin, color: 'orange', style: { marginTop: "0.5vw" }, __source: {
          fileName: _jsxFileName,
          lineNumber: 131
        }
      }, 'Join')))), _react2.default.createElement(_semanticUiReact.Container, { textAlign: 'center', __source: {
          fileName: _jsxFileName,
          lineNumber: 135
        }
      }, _react2.default.createElement(_semanticUiReact.Message, { compact: true, positive: true, hidden: this.state.transitionMessage != "Joining...", __source: {
          fileName: _jsxFileName,
          lineNumber: 136
        }
      }, _react2.default.createElement(_semanticUiReact.Icon, { size: 'big', name: 'circle notched', loading: true, __source: {
          fileName: _jsxFileName,
          lineNumber: 137
        }
      }), _react2.default.createElement('b', { style: { fontSize: "2.5vw" }, className: 'jsx-776868261',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 138
        }
      }, this.state.transitionMessage), _react2.default.createElement('p', { style: { fontSize: "1vw" }, className: 'jsx-776868261',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 139
        }
      }, 'Please manually refresh page if unable to logging in during first time')), _react2.default.createElement(_semanticUiReact.Message, { compact: true, positive: true, hidden: this.state.transitionMessage != "Success!", __source: {
          fileName: _jsxFileName,
          lineNumber: 142
        }
      }, _react2.default.createElement(_semanticUiReact.Icon, { size: 'big', name: 'check', __source: {
          fileName: _jsxFileName,
          lineNumber: 143
        }
      }), _react2.default.createElement('b', { style: { fontSize: "2.5vw" }, className: 'jsx-776868261',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 144
        }
      }, this.state.transitionMessage), _react2.default.createElement('p', { style: { fontSize: "1vw" }, className: 'jsx-776868261',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 145
        }
      }, 'Please manually refresh page if unable to logging in during first time'))))), _react2.default.createElement(_style2.default, {
        styleId: '2648415975',
        css: '.header.jsx-776868261{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;background-color:#0070f3;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;}.contactListHeader.jsx-776868261{font-weight:500;}.contactImg.jsx-776868261{width:10%;height:auto;-webkit-transition:filter 0.15s ease;transition:filter 0.15s ease;}.contactName.jsx-776868261{font-size:0.8rem;margin-left:0.2rem;-webkit-transition:color 0.15s ease;transition:color 0.15s ease;}.contactBox.jsx-776868261{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;overflow:scroll;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;margin-top:0.5rem;border:2px transparent solid;border-radius:10px;padding:0.5rem;-webkit-transition:border-color 0.15s ease,background-color 0.15s ease;transition:border-color 0.15s ease,background-color 0.15s ease;}.contactBox.jsx-776868261:hover,.contactBox.jsx-776868261:focus,.contactBox.jsx-776868261:active{border-color:#0070f3;}.contactAdd.jsx-776868261{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;margin-top:1rem;margin-bottom:0.5rem;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;}.publicKey.jsx-776868261{width:60%;}.body.jsx-776868261{display:grid;grid-template-columns:1fr 3fr;grid-template-areas:"contactList messageBody";gap:15px;padding:0 1rem;}.bodyCols.jsx-776868261{border:1px solid #eaeaea;border-radius:10px;padding:0.5rem;}.messageRows.jsx-776868261{border:1px solid #eaeaea;border-radius:10px;padding:0.5rem;}.contactList.jsx-776868261{grid-area:contactList;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;}.messageBody.jsx-776868261{grid-area:messageBody;display:grid;grid-template-rows:3fr 1fr;grid-template-areas:"conversation" "message";gap:15px;}.conversation.jsx-776868261{grid-area:conversation;}.message.jsx-776868261{max-height:10vh;grid-area:message;display:grid;grid-template-columns:7fr 1fr;gap:15px;}.headerItems.jsx-776868261{margin:1rem;color:white;padding:0.5rem;}.balance.jsx-776868261{background:orange;border-radius:10px;}.container.jsx-776868261{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;}.loginBox.jsx-776868261{width:60%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;padding:2.5rem 0.5rem;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;border:1px solid #eaeaea;border-radius:10px;-webkit-transition:color 0.15s ease,border-color 0.15s ease;transition:color 0.15s ease,border-color 0.15s ease;}.loginForm.jsx-776868261{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;padding:0.5rem 1.8rem;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;width:100%;}.loginFields.jsx-776868261{margin-top:0.5rem;}.privateKey.jsx-776868261{padding:0.5rem 0.5rem;width:100%;}.submitButton.jsx-776868261{background-color:transparent;width:40%;-webkit-align-self:center;-ms-flex-item-align:center;align-self:center;padding:0.5rem 0.5rem;border-radius:10px;font-weight:700;-webkit-transition:color 0.15s ease,border-color 0.15s ease;transition:color 0.15s ease,border-color 0.15s ease;}.submitButton.jsx-776868261:hover,.submitButton.jsx-776868261:focus,.submitButton.jsx-776868261:active{border-color:transparent;color:#fff;background-color:#0070f3;}.addButton.jsx-776868261{background-color:transparent;-webkit-align-self:center;-ms-flex-item-align:center;align-self:center;padding:0.5rem 0.5rem;border-radius:10px;font-weight:700;-webkit-transition:color 0.15s ease,border-color 0.15s ease;transition:color 0.15s ease,border-color 0.15s ease;}.addButton.jsx-776868261:hover,.addButton.jsx-776868261:focus,.addButton.jsx-776868261:active{border-color:transparent;color:#fff;background-color:#0070f3;}.sendButton.jsx-776868261{background-color:transparent;-webkit-align-self:center;-ms-flex-item-align:center;align-self:center;padding:0.5rem 0.5rem;border-radius:10px;font-weight:700;-webkit-transition:color 0.15s ease,border-color 0.15s ease;transition:color 0.15s ease,border-color 0.15s ease;}.sendButton.jsx-776868261:hover,.sendButton.jsx-776868261:focus,.sendButton.jsx-776868261:active{border-color:transparent;color:#fff;background-color:#0070f3;}.landingPage.jsx-776868261{-webkit-flex:1;-ms-flex:1;flex:1;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;}footer.jsx-776868261{width:100%;height:100px;border-top:1px solid #eaeaea;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;}footer.jsx-776868261 img.jsx-776868261{margin-left:0.5rem;}footer.jsx-776868261 a.jsx-776868261{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;}a.jsx-776868261{color:inherit;text-decoration:none;}.title.jsx-776868261 a.jsx-776868261{color:#0070f3;text-decoration:none;}.title.jsx-776868261 a.jsx-776868261:hover,.title.jsx-776868261 a.jsx-776868261:focus,.title.jsx-776868261 a.jsx-776868261:active{text-decoration:underline;}.title.jsx-776868261{margin:0;line-height:1.15;font-size:3rem;}.loginTitle.jsx-776868261{margin:0;line-height:1.15;font-size:2rem;font-weight:700;color:#0070f3;}.title.jsx-776868261,.description.jsx-776868261{text-align:center;}.description.jsx-776868261{line-height:1.5;font-size:1.5rem;}.loginBox.jsx-776868261:hover,.loginBox.jsx-776868261:focus,.loginBox.jsx-776868261:active{border-color:#0070f3;}.card.jsx-776868261 h3.jsx-776868261{margin:0 0 1rem 0;font-size:1.5rem;}.card.jsx-776868261 p.jsx-776868261{margin:0;font-size:1.25rem;line-height:1.5;}.logo.jsx-776868261{height:1em;}@media (max-width:600px){.grid.jsx-776868261{width:100%;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;}}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZXdzL0xvZ2luLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTJKZ0IsQUFHd0IsQUFPRyxBQUlOLEFBTU8sQUFNSixBQWFRLEFBS1IsQUFRaEIsQUFHZ0IsQUFRWSxBQU1BLEFBTUgsQUFNQSxBQVFDLEFBSVAsQUFRSixBQU1NLEFBS0wsQUFPSCxBQVlHLEFBU2hCLEFBR3lCLEFBS08sQUFZSixBQU1JLEFBV0osQUFNSSxBQVdKLEFBTWxCLEFBT0ksQUFTUSxBQUlOLEFBTUMsQUFLQSxBQU9ZLEFBSWpCLEFBS0EsQUFTUyxBQUlGLEFBUUssQUFJSCxBQUtULEFBTUUsQUFLRSxTQTdDSSxBQUtBLEFBOEJDLENBdlFOLEFBcUNkLEFBb0VlLENBd0ZBLEFBNEVmLEFBSzBCLENBM0xaLENBOUNrQixDQTJLVCxBQUtBLEVBN052QixBQW1Gb0IsQUF1S0QsQ0FoUEUsQ0F3RnRCLEFBK0JDLEFBcUhBLEFBZ0JtQixDQXhEbkIsRUFoTEEsQUFvT0EsQ0E1UEQsQUEyRGdCLEFBTUEsQUErRGhCLENBdkRDLENBYWlCLEFBMEdjLENBakpWLEFBTUEsQUEyRlAsQUFpQkEsQUFpQkEsQ0E0Q2QsQUFLaUIsQUFLQSxDQThCQyxFQWxJTixBQWtCUSxBQWlCQSxJQXZDcEIsQUF3RGUsQUE2RGYsQ0F2S2UsQ0FaYyxBQWlKN0IsQUFLQSxBQXlDQSxDQTNQRCxBQTJJNEIsQUFpQkEsQUFpQkEsQ0F2RjNCLEVBTEEsQUE4Q29CLEVBK0ZwQixBQUtrQixFQWpNOEIsQUErTmhELENBdk5pQixBQU1BLEdBeUJlLE1Ba0hqQixJQXlDQyxFQXpMaEIsQUFNQSxFQTJGQSxBQWlCQSxBQWlCQSxDQWpIK0MsU0F3Sy9DLEdBeFBxQixBQXVCSCxBQWtCQSxBQW9FTSxBQW1CQSxBQXlGQyxHQTVIZCxPQXdCYSxFQXZCeEIsRUFqRkEsQ0F5Q1csQUF3T1QsQ0F0UW1CLEFBa0JFLE1BK0JDLEVBbEJQLEVBcENqQixBQWlKd0IsQUFpQkEsT0FwR2IsQUFxSGEsR0FuREEsQ0F4R1EsRUFhaEMsR0EwQkEsTUFtRnFCLEFBaUJBLEtBeUJJLEtBM0RKLFNBa0JILEFBaUJBLEVBdExTLFFBb0pULENBdkNPLEFBbUJELEtBc0MrQixBQWlCQSxLQWxFL0IsS0FnQytCLENBcEo5QixLQXdOSixDQWhKckIsQUF3RHFCLFNBekdELENBOEZLLENBZ0ZKLGdCQTdLVSx5QkFrQi9CLEFBb0txQixJQXJMQSxtQkFDSixFQW9GakIsYUFuRmtFLEVBOExsRSxDQXhOQSxBQWlJRCxFQW9DQyxBQWlCQSxTQXJEQSxBQW9FQSxDQWpEQSxJQS9CcUIsb0NBeUZyQix5REF4RjJCLHNCQTNGM0IsR0E0RnFCLG1CQUNrQyxnSEFDdkQiLCJmaWxlIjoidmlld3MvTG9naW4uanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3RoZWJlL0Rlc2t0b3AvYmxvY2tjaGFpbi1wcm9qIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7XG4gICAgSW5wdXQsXG4gICAgTWVzc2FnZSxcbiAgICBDb250YWluZXIsXG4gICAgQnV0dG9uLFxuICAgIEhlYWRlcixcbiAgICBJY29uLFxuICAgIEltYWdlXG59IGZyb20gJ3NlbWFudGljLXVpLXJlYWN0JztcbmltcG9ydCBIZWFkIGZyb20gJ25leHQvaGVhZCc7XG5pbXBvcnQgd2ViMyBmcm9tICcuLi9ldGhlcmV1bS93ZWIzJztcbmltcG9ydCBDb25zdGFudCBmcm9tICcuLi9zdXBwb3J0L0NvbnN0YW50JztcbmltcG9ydCBDb25maWcgZnJvbSAnLi4vc3VwcG9ydC9Db25maWcnO1xuXG5jbGFzcyBMb2dpbiBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLmFjY291bnQgPSBwcm9wcy5hY2NvdW50O1xuICAgICAgICB0aGlzLmNvbnRyYWN0TWFuYWdlciA9IHByb3BzLmNvbnRyYWN0TWFuYWdlcjtcbiAgICAgICAgdGhpcy5zdG9yYWdlTWFuYWdlciA9IHByb3BzLnN0b3JhZ2VNYW5hZ2VyO1xuICAgICAgICB0aGlzLnN0YXRlID0ge3ByaXZhdGVLZXk6IFwiXCIsIGVycm9yTWVzc2FnZTpcIlwiLCB0cmFuc2l0aW9uTWVzc2FnZTpcIlwiLCB3YWxsZXRBZGRyZXNzOiBcIlwifTtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5zdG9yYWdlTWFuYWdlci5yZWxvYWQpO1xuICAgICAgICBcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgLy8gYXdhaXQgdGhpcy5zbGVlcCgyMDAwKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5zdGF0ZSk7XG4gICAgICAgIC8vIGlmKHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInJlbG9hZFwiKT4gMCl7XG4gICAgICAgIC8vIH1cbiAgICAgICAgY29uc29sZS5sb2cod2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwicmVsb2FkXCIpKVxuICAgICAgICBcblxuICAgIH1cblxuICAgIGhhbmRsZUJhY2sgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3dhbGxldEFkZHJlc3MgOiBcIlwiLCBlcnJvck1lc3NhZ2U6IFwiXCIsIHRyYW5zaXRpb25NZXNzYWdlOiBcIlwifSk7XG4gICAgfVxuXG4gICAgc2xlZXAobXMpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4gc2V0VGltZW91dChyZXNvbHZlLCBtcykpO1xuICAgIH1cblxuICAgIGhhbmRsZUpvaW4gPSBhc3luYyAoKSA9PntcbiAgICAgICAgYXdhaXQgdGhpcy5hY2NvdW50LnN0b3JlUHJpdmF0ZUtleSh0aGlzLnN0YXRlLnByaXZhdGVLZXkpO1xuICAgICAgICBhd2FpdCB0aGlzLmNvbnRyYWN0TWFuYWdlci5nZXRDb250cmFjdCgpO1xuICAgICAgICB2YXIgeCA9IGF3YWl0IHRoaXMuY29udHJhY3RNYW5hZ2VyLmdldEpvaW5lZEFkZHJlc3MoKTtcbiAgICAgICAgaWYgKHg9PTApe1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJKb2luaW5nIHRoZSBuZXR3b3JrXCIpO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dHJhbnNpdGlvbk1lc3NhZ2U6IFwiSm9pbmluZy4uLlwifSlcbiAgICAgICAgICAgIHZhciBwdWJsaWNLZXlCdWZmZXIgPSB0aGlzLmFjY291bnQuZ2V0UHVibGljS2V5QnVmZmVyKCk7XG4gICAgICAgICAgICAvLyBhd2FpdCB0aGlzLmNvbnRyYWN0TWFuYWdlci5jaGVja0FjYygnMHgnK3RoaXMuc3RhdGUud2FsbGV0QWRkcmVzcyk7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmNvbnRyYWN0TWFuYWdlci5qb2luQ29udHJhY3QocHVibGljS2V5QnVmZmVyLCAgIChyZXN1bHRFdmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHRFdmVudCA9PSBDb25zdGFudC5FVkVOVC5PTl9SRUpFQ1RFRCB8fCByZXN1bHRFdmVudCA9PSBDb25zdGFudC5FVkVOVC5PTl9FUlJPUikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt0cmFuc2l0aW9uTWVzc2FnZTogXCJcIiwgZXJyb3JNZXNzYWdlOiBcIlNvbWV0aGluZyB3ZW50IHdyb25nLCByZWZyZXNoaW5nIGluIDMgc2Vjb25kcy4uLlwifSlcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXN1bHRFdmVudCA9PSBDb25zdGFudC5FVkVOVC5PTl9SRUNFSVBUKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3RyYW5zaXRpb25NZXNzYWdlOiBcIlN1Y2Nlc3MhXCJ9KVxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnN0b3JhZ2VNYW5hZ2VyLnJlbG9hZCA9IDE7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuc3RvcmFnZU1hbmFnZXIucmVsb2FkKTtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnNldFN0YXRlKHt0cmFuc2l0aW9uTWVzc2FnZTogXCJTdWNjZXNzISBDbGljayBoZXJlIHRvIGVudGVyIGlmIG5vdCBkaXJlY3RlZCBhdXRvbWF0aWNhbGx5LlwifSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgLy8gdGhpcy5zZXRTdGF0ZSh7dHJhbnNpdGlvbk1lc3NhZ2U6IFwiU3VjY2VzcyEgQ2xpY2sgaGVyZSB0byBlbnRlciBpZiBub3QgZGlyZWN0ZWQgYXV0b21hdGljYWxseS5cIn0pO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJleGlzdGluZ1wiKTtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgXG4gICAgfVxuXG5cbiAgICBuZXh0Q2xpY2tlZCA9IGFzeW5jIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5zdGF0ZS5wcml2YXRlS2V5KVxuICAgICAgICB2YXIgd2FsbGV0QWRkcmVzcyA9IGF3YWl0IHRoaXMuYWNjb3VudC5jaGVja1ByaXZhdGVLZXkodGhpcy5zdGF0ZS5wcml2YXRlS2V5KTtcbiAgICAgICAgaWYgKHdhbGxldEFkZHJlc3MpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic3VjZXNzXCIsIHdhbGxldEFkZHJlc3MpO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZXJyb3JNZXNzYWdlIDogXCJcIn0pO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7d2FsbGV0QWRkcmVzcyA6IHdhbGxldEFkZHJlc3N9KTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJHVVVTTFwiKTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2Vycm9yTWVzc2FnZSA6IFwiUHJpdmF0ZSBLZXkgaXMgaW52YWxpZFwifSk7XG4gICAgICAgICAgICAvLyB0aGlzLnNldFN0YXRlKHtlcnJvck1lc3NhZ2U6IFwiSW52YWxpZCBwcml2YXRlIGtleVwifSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nbGFuZGluZ1BhZ2UnID5cbiAgICAgICAgICAgIDxIZWFkPlxuICAgICAgICAgICAgICAgIDx0aXRsZT5FdGhlcmV1bSBNZXNzZW5nZXI8L3RpdGxlPlxuICAgICAgICAgICAgICAgIDxsaW5rIHJlbD1cInNob3J0Y3V0IGljb25cIiBocmVmPVwiL3N0YXRpYy9pbWFnZXMvZmF2aWNvbi5pY29cIiAvPlxuICAgICAgICAgICAgICAgIDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiBocmVmPVwiLy9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvc2VtYW50aWMtdWkvMi4yLjEyL3NlbWFudGljLm1pbi5jc3NcIj48L2xpbms+XG4gICAgICAgICAgICA8L0hlYWQ+XG4gICAgICAgICAgICAgICAgPEltYWdlIHNyYz0nc3RhdGljL2ltYWdlcy9ldGhlcmV1bS1tZXNzZW5nZXItbG9nby5wbmcnIGhlaWdodD17MTUwfSBzdHlsZT17eyBtYXJnaW5Ub3A6IFwiMS41dndcIn19IC8+XG4gICAgICAgICAgICAgICAgPGJyLz5cbiAgICAgICAgICAgICAgICA8aDEgY2xhc3NOYW1lPVwidGl0bGVcIiAgZm9udC1mYW1pbHk9XCJUYWhvbWFcIj5cbiAgICAgICAgICAgICAgICBXZWxjb21lIHRvIEV0aGVyZXVtIE1lc3NlbmdlciEgXG4gICAgICAgICAgICAgICAgPC9oMT5cblxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImRlc2NyaXB0aW9uXCI+XG4gICAgICAgICAgICAgICAgU2VuZCBhIHByaXZhdGUgbWVzc2FnZSB0byB5b3VyIGZyaWVuZHMgdGhhdCB3aWxsIG5ldmVyIGJlIGxvc3QhXG4gICAgICAgICAgICAgICAgPC9wPlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2xvZ2luQm94Jz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nbG9naW5UaXRsZSc+IFNpZ24gaW4gdG8gQmxvY2stRm9yZXZlcjwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdsb2dpbkZvcm0nID4gXG4gICAgICAgICAgICAgICAgPGZvcm0gaGlkZGVuPXt0aGlzLnN0YXRlLndhbGxldEFkZHJlc3MgIT0gXCJcIn0gY2xhc3NOYW1lPSdsb2dpbkZvcm0nIG9uU3VibWl0PXsoZSk9PnRoaXMubmV4dENsaWNrZWQoZSl9PiBcbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT0nbG9naW5GaWVsZHMnIGh0bWxGb3I9XCJwcmlLZXlcIj5FbnRlciBQcml2YXRlIEtleTo8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdmFsdWU9e3RoaXMuc3RhdGUucHJpdmF0ZUtleX0gY2xhc3NOYW1lPSdsb2dpbkZpZWxkcyBwcml2YXRlS2V5JyB0eXBlPVwidGV4dFwiIG9uQ2hhbmdlPXsoZSkgPT4gdGhpcy5zZXRTdGF0ZSh7cHJpdmF0ZUtleTogZS50YXJnZXQudmFsdWV9KX0gIHJlcXVpcmVkIC8+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPSdsb2dpbkZpZWxkcyBzdWJtaXRCdXR0b24nIHR5cGU9XCJzdWJtaXRcIj5OZXh0PC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICAgICAgICAgICAgICAgICAgey8qIDxJbnB1dCBmbHVpZCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS5wcml2YXRlS2V5fSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHRoaXMuc2V0U3RhdGUoe3ByaXZhdGVLZXk6IGUudGFyZ2V0LnZhbHVlfSl9IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbj17eyBjb2xvcjogJ2JsdWUnLCBsYWJlbFBvc2l0aW9uOiAncmlnaHQnLCBpY29uOiAnYW5nbGUgcmlnaHQnLCBjb250ZW50OiAnTmV4dCcsIG9uQ2xpY2s6IChlKT0+dGhpcy5uZXh0Q2xpY2tlZChlKX19Lz4gKi99XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICA8TWVzc2FnZSBlcnJvciBoZWFkZXI9e3RoaXMuc3RhdGUuZXJyb3JNZXNzYWdlfSBoaWRkZW49e3RoaXMuc3RhdGUuZXJyb3JNZXNzYWdlID09IFwiXCJ9Lz5cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIDxNZXNzYWdlIHRleHQgcG9zaXRpdmUgaGlkZGVuPXt0aGlzLnN0YXRlLndhbGxldEFkZHJlc3MgPT0gXCJcIn0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8TWVzc2FnZS5IZWFkZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pbiBFdGhlcmV1bSBNZXNzZW5nZXIgYXMgPGJyLz4gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPENvbnRhaW5lciBmbHVpZCB0ZXh0QWxpZ249J2NlbnRlcicgc3R5bGU9e3sgbWFyZ2luVG9wOiBcIjF2d1wifX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxiIHN0eWxlPXt7Zm9udFNpemU6IFwiMnZ3XCJ9fT4weHt0aGlzLnN0YXRlLndhbGxldEFkZHJlc3N9PC9iPjxici8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsvKiA8QnV0dG9uIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQmFja30gY29sb3IgPSAnYmx1ZScgIHN0eWxlPXt7IG1hcmdpblRvcDogXCIxdndcIn19ID5CYWNrPC9CdXR0b24+ICovfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9e3RoaXMuaGFuZGxlSm9pbn0gY29sb3IgPSAnb3JhbmdlJyBzdHlsZT17eyBtYXJnaW5Ub3A6IFwiMC41dndcIn19PkpvaW48L0J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvTWVzc2FnZS5IZWFkZXI+XG4gICAgICAgICAgICAgICAgICAgIDwvTWVzc2FnZT5cbiAgICAgICAgICAgICAgICAgICAgPENvbnRhaW5lciB0ZXh0QWxpZ249XCJjZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPE1lc3NhZ2UgIGNvbXBhY3QgcG9zaXRpdmUgaGlkZGVuPXt0aGlzLnN0YXRlLnRyYW5zaXRpb25NZXNzYWdlICE9IFwiSm9pbmluZy4uLlwifT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8SWNvbiBzaXplPSdiaWcnIG5hbWU9J2NpcmNsZSBub3RjaGVkJyBsb2FkaW5nIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGIgc3R5bGU9e3tmb250U2l6ZTogXCIyLjV2d1wifX0+e3RoaXMuc3RhdGUudHJhbnNpdGlvbk1lc3NhZ2V9PC9iPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIHN0eWxlPXt7Zm9udFNpemU6IFwiMXZ3XCJ9fT5QbGVhc2UgbWFudWFsbHkgcmVmcmVzaCBwYWdlIGlmIHVuYWJsZSB0byBsb2dnaW5nIGluIGR1cmluZyBmaXJzdCB0aW1lPC9wPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8L01lc3NhZ2U+XG4gICAgICAgICAgICAgICAgICAgICAgICA8TWVzc2FnZSAgY29tcGFjdCBwb3NpdGl2ZSBoaWRkZW49e3RoaXMuc3RhdGUudHJhbnNpdGlvbk1lc3NhZ2UgIT0gXCJTdWNjZXNzIVwifT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8SWNvbiBzaXplPSdiaWcnIG5hbWU9J2NoZWNrJyAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxiIHN0eWxlPXt7Zm9udFNpemU6IFwiMi41dndcIn19Pnt0aGlzLnN0YXRlLnRyYW5zaXRpb25NZXNzYWdlfTwvYj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBzdHlsZT17e2ZvbnRTaXplOiBcIjF2d1wifX0+UGxlYXNlIG1hbnVhbGx5IHJlZnJlc2ggcGFnZSBpZiB1bmFibGUgdG8gbG9nZ2luZyBpbiBkdXJpbmcgZmlyc3QgdGltZTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvTWVzc2FnZT5cbiAgICAgICAgICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgICAgIDwvQ29udGFpbmVyPlxuXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIFxuICAgIDxzdHlsZSBqc3g+e2BcbiAgICAgICAgLmhlYWRlcntcbiAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzAwNzBmMztcbiAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIC5jb250YWN0TGlzdEhlYWRlcntcbiAgICAgICAgICBmb250LXdlaWdodDogNTAwO1xuICAgICAgICB9XG5cbiAgICAgICAgLmNvbnRhY3RJbWd7XG4gICAgICAgICAgd2lkdGg6IDEwJTtcbiAgICAgICAgICBoZWlnaHQ6IGF1dG87XG4gICAgICAgICAgdHJhbnNpdGlvbjogZmlsdGVyIDAuMTVzIGVhc2VcbiAgICAgICAgfVxuXG4gICAgICAgIC5jb250YWN0TmFtZXtcbiAgICAgICAgICBmb250LXNpemU6IDAuOHJlbTtcbiAgICAgICAgICBtYXJnaW4tbGVmdDogMC4ycmVtO1xuICAgICAgICAgIHRyYW5zaXRpb246IGNvbG9yIDAuMTVzIGVhc2VcbiAgICAgICAgfVxuXG4gICAgICAgIC5jb250YWN0Qm94e1xuICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgb3ZlcmZsb3c6IHNjcm9sbDtcbiAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICAgIG1hcmdpbi10b3A6IDAuNXJlbTtcbiAgICAgICAgICBib3JkZXI6IDJweCB0cmFuc3BhcmVudCBzb2xpZDtcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICAgICAgICAgIHBhZGRpbmc6IDAuNXJlbTtcbiAgICAgICAgICB0cmFuc2l0aW9uOiBib3JkZXItY29sb3IgMC4xNXMgZWFzZSwgYmFja2dyb3VuZC1jb2xvciAwLjE1cyBlYXNlO1xuICAgICAgICB9XG5cbiAgICAgICAgLmNvbnRhY3RCb3ggOmhvdmVyLFxuICAgICAgICAuY29udGFjdEJveCA6Zm9jdXMsXG4gICAgICAgIC5jb250YWN0Qm94IDphY3RpdmUge1xuICAgICAgICAgIGJvcmRlci1jb2xvcjogIzAwNzBmMztcbiAgICAgICAgICBcbiAgICAgICAgfVxuXG4gICAgICAgIC5jb250YWN0QWRke1xuICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgbWFyZ2luLXRvcDogMXJlbTtcbiAgICAgICAgICBtYXJnaW4tYm90dG9tOiAwLjVyZW07XG4gICAgICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgICAgICB9XG5cbiAgICAgICAgLnB1YmxpY0tleXtcbiAgICAgICAgICB3aWR0aDogNjAlXG4gICAgICAgIH1cblxuICAgICAgICAuYm9keXtcbiAgICAgICAgICBkaXNwbGF5OiBncmlkO1xuICAgICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDNmcjtcbiAgICAgICAgICBncmlkLXRlbXBsYXRlLWFyZWFzOiBcImNvbnRhY3RMaXN0IG1lc3NhZ2VCb2R5XCI7XG4gICAgICAgICAgZ2FwOiAxNXB4O1xuICAgICAgICAgIHBhZGRpbmc6IDAgMXJlbTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLmJvZHlDb2xze1xuICAgICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNlYWVhZWE7XG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgICAgICAgICBwYWRkaW5nOiAwLjVyZW07XG4gICAgICAgIH1cblxuICAgICAgICAubWVzc2FnZVJvd3N7XG4gICAgICAgICAgYm9yZGVyOiAxcHggc29saWQgI2VhZWFlYTtcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICAgICAgICAgIHBhZGRpbmc6IDAuNXJlbTtcbiAgICAgICAgfVxuXG4gICAgICAgIC5jb250YWN0TGlzdHtcbiAgICAgICAgICBncmlkLWFyZWE6IGNvbnRhY3RMaXN0O1xuICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgfVxuXG4gICAgICAgIC5tZXNzYWdlQm9keXtcbiAgICAgICAgICBncmlkLWFyZWE6IG1lc3NhZ2VCb2R5O1xuICAgICAgICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgICAgICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiAzZnIgMWZyO1xuICAgICAgICAgIGdyaWQtdGVtcGxhdGUtYXJlYXM6IFwiY29udmVyc2F0aW9uXCIgXCJtZXNzYWdlXCI7XG4gICAgICAgICAgZ2FwOiAxNXB4O1xuICAgICAgICB9XG5cbiAgICAgICAgLmNvbnZlcnNhdGlvbntcbiAgICAgICAgICBncmlkLWFyZWE6IGNvbnZlcnNhdGlvbjtcbiAgICAgICAgfVxuXG4gICAgICAgIC5tZXNzYWdle1xuICAgICAgICAgIG1heC1oZWlnaHQ6IDEwdmg7XG4gICAgICAgICAgZ3JpZC1hcmVhOiBtZXNzYWdlO1xuICAgICAgICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiA3ZnIgMWZyO1xuICAgICAgICAgIGdhcDogMTVweDtcbiAgICAgICAgfVxuXG4gICAgICAgIC5oZWFkZXJJdGVtc3tcbiAgICAgICAgICBtYXJnaW46IDFyZW07XG4gICAgICAgICAgY29sb3I6IHdoaXRlO1xuICAgICAgICAgIHBhZGRpbmc6IDAuNXJlbTtcbiAgICAgICAgfVxuXG4gICAgICAgIC5iYWxhbmNle1xuICAgICAgICAgIGJhY2tncm91bmQ6IG9yYW5nZTtcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiAxMHB4XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC5jb250YWluZXIge1xuICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgICBcbiAgICAgICAgfVxuXG4gICAgICAgIC5sb2dpbkJveHtcbiAgICAgICAgICB3aWR0aDogNjAlO1xuICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgICBwYWRkaW5nOiAyLjVyZW0gMC41cmVtO1xuICAgICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgICAgYm9yZGVyOiAxcHggc29saWQgI2VhZWFlYTtcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICAgICAgICAgIHRyYW5zaXRpb246IGNvbG9yIDAuMTVzIGVhc2UsIGJvcmRlci1jb2xvciAwLjE1cyBlYXNlO1xuICAgICAgICB9XG5cbiAgICAgICAgLmxvZ2luRm9ybXtcbiAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICAgICAgcGFkZGluZzogMC41cmVtIDEuOHJlbTtcbiAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICAgIHdpZHRoOiAxMDAlXG4gICAgICAgIH1cblxuICAgICAgICAubG9naW5GaWVsZHN7XG4gICAgICAgICAgbWFyZ2luLXRvcDogMC41cmVtXG4gICAgICAgIH1cblxuICAgICAgICAucHJpdmF0ZUtleXtcbiAgICAgICAgICBwYWRkaW5nOiAwLjVyZW0gMC41cmVtO1xuICAgICAgICAgIHdpZHRoOiAxMDAlXG4gICAgICAgIH1cblxuICAgICAgICAuc3VibWl0QnV0dG9ue1xuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgICAgIHdpZHRoOiA0MCU7XG4gICAgICAgICAgYWxpZ24tc2VsZjogY2VudGVyO1xuICAgICAgICAgIHBhZGRpbmc6IDAuNXJlbSAwLjVyZW07XG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgICAgICAgICBmb250LXdlaWdodDogNzAwO1xuICAgICAgICAgIHRyYW5zaXRpb246IGNvbG9yIDAuMTVzIGVhc2UsIGJvcmRlci1jb2xvciAwLjE1cyBlYXNlO1xuICAgICAgICB9XG4gICAgICBcbiAgICAgICAgLnN1Ym1pdEJ1dHRvbiA6aG92ZXIsXG4gICAgICAgIC5zdWJtaXRCdXR0b24gOmZvY3VzLFxuICAgICAgICAuc3VibWl0QnV0dG9uIDphY3RpdmUge1xuICAgICAgICAgIGJvcmRlci1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICAgICAgY29sb3I6ICAjZmZmO1xuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IzAwNzBmMyA7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC5hZGRCdXR0b257XG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICAgICAgYWxpZ24tc2VsZjogY2VudGVyO1xuICAgICAgICAgIHBhZGRpbmc6IDAuNXJlbSAwLjVyZW07XG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgICAgICAgICBmb250LXdlaWdodDogNzAwO1xuICAgICAgICAgIHRyYW5zaXRpb246IGNvbG9yIDAuMTVzIGVhc2UsIGJvcmRlci1jb2xvciAwLjE1cyBlYXNlO1xuICAgICAgICB9XG4gICAgICBcbiAgICAgICAgLmFkZEJ1dHRvbiA6aG92ZXIsXG4gICAgICAgIC5hZGRCdXR0b24gOmZvY3VzLFxuICAgICAgICAuYWRkQnV0dG9uIDphY3RpdmUge1xuICAgICAgICAgIGJvcmRlci1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICAgICAgY29sb3I6ICAjZmZmO1xuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IzAwNzBmMyA7XG4gICAgICAgIH1cblxuICAgICAgICAuc2VuZEJ1dHRvbntcbiAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgICAgICBhbGlnbi1zZWxmOiBjZW50ZXI7XG4gICAgICAgICAgcGFkZGluZzogMC41cmVtIDAuNXJlbTtcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICAgICAgICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gICAgICAgICAgdHJhbnNpdGlvbjogY29sb3IgMC4xNXMgZWFzZSwgYm9yZGVyLWNvbG9yIDAuMTVzIGVhc2U7XG4gICAgICAgIH1cbiAgICAgIFxuICAgICAgICAuc2VuZEJ1dHRvbiA6aG92ZXIsXG4gICAgICAgIC5zZW5kQnV0dG9uIDpmb2N1cyxcbiAgICAgICAgLnNlbmRCdXR0b24gOmFjdGl2ZSB7XG4gICAgICAgICAgYm9yZGVyLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgICAgICBjb2xvcjogICNmZmY7XG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjojMDA3MGYzIDtcbiAgICAgICAgfVxuXG4gICAgICAgIC5sYW5kaW5nUGFnZSB7XG4gICAgICAgICAgZmxleDogMTtcbiAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvb3RlciB7XG4gICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgaGVpZ2h0OiAxMDBweDtcbiAgICAgICAgICBib3JkZXItdG9wOiAxcHggc29saWQgI2VhZWFlYTtcbiAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIH1cblxuICAgICAgICBmb290ZXIgaW1nIHtcbiAgICAgICAgICBtYXJnaW4tbGVmdDogMC41cmVtO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9vdGVyIGEge1xuICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGEge1xuICAgICAgICAgIGNvbG9yOiBpbmhlcml0O1xuICAgICAgICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC50aXRsZSBhIHtcbiAgICAgICAgICBjb2xvcjogIzAwNzBmMztcbiAgICAgICAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gICAgICAgIH1cblxuICAgICAgICAudGl0bGUgYTpob3ZlcixcbiAgICAgICAgLnRpdGxlIGE6Zm9jdXMsXG4gICAgICAgIC50aXRsZSBhOmFjdGl2ZSB7XG4gICAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XG4gICAgICAgIH1cblxuICAgICAgICAudGl0bGUge1xuICAgICAgICAgIG1hcmdpbjogMDtcbiAgICAgICAgICBsaW5lLWhlaWdodDogMS4xNTtcbiAgICAgICAgICBmb250LXNpemU6IDNyZW07XG4gICAgICAgIH1cbiAgICAgICAgLmxvZ2luVGl0bGUge1xuICAgICAgICAgIG1hcmdpbjogMDtcbiAgICAgICAgICBsaW5lLWhlaWdodDogMS4xNTtcbiAgICAgICAgICBmb250LXNpemU6IDJyZW07XG4gICAgICAgICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICAgICAgICBjb2xvcjogIzAwNzBmMztcbiAgICAgICAgfVxuXG4gICAgICAgIC50aXRsZSxcbiAgICAgICAgLmRlc2NyaXB0aW9uIHtcbiAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICAgIH1cblxuICAgICAgICAuZGVzY3JpcHRpb24ge1xuICAgICAgICAgIGxpbmUtaGVpZ2h0OiAxLjU7XG4gICAgICAgICAgZm9udC1zaXplOiAxLjVyZW07XG4gICAgICAgIH1cblxuICAgICAgICAubG9naW5Cb3g6aG92ZXIsXG4gICAgICAgIC5sb2dpbkJveDpmb2N1cyxcbiAgICAgICAgLmxvZ2luQm94OmFjdGl2ZSB7XG4gICAgICAgICAgXG4gICAgICAgICAgYm9yZGVyLWNvbG9yOiAjMDA3MGYzO1xuICAgICAgICB9XG5cbiAgICAgICAgLmNhcmQgaDMge1xuICAgICAgICAgIG1hcmdpbjogMCAwIDFyZW0gMDtcbiAgICAgICAgICBmb250LXNpemU6IDEuNXJlbTtcbiAgICAgICAgfVxuXG4gICAgICAgIC5jYXJkIHAge1xuICAgICAgICAgIG1hcmdpbjogMDtcbiAgICAgICAgICBmb250LXNpemU6IDEuMjVyZW07XG4gICAgICAgICAgbGluZS1oZWlnaHQ6IDEuNTtcbiAgICAgICAgfVxuXG4gICAgICAgIC5sb2dvIHtcbiAgICAgICAgICBoZWlnaHQ6IDFlbTtcbiAgICAgICAgfVxuXG4gICAgICAgIEBtZWRpYSAobWF4LXdpZHRoOiA2MDBweCkge1xuICAgICAgICAgIC5ncmlkIHtcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIGB9PC9zdHlsZT5cblxuICAgICAgPHN0eWxlIGpzeCBnbG9iYWw+e2BcbiAgICAgICAgaHRtbCxcbiAgICAgICAgYm9keSB7XG4gICAgICAgICAgcGFkZGluZzogMDtcbiAgICAgICAgICBtYXJnaW46IDA7XG4gICAgICAgICAgZm9udC1mYW1pbHk6IC1hcHBsZS1zeXN0ZW0sIEJsaW5rTWFjU3lzdGVtRm9udCwgU2Vnb2UgVUksIFJvYm90byxcbiAgICAgICAgICAgIE94eWdlbiwgVWJ1bnR1LCBDYW50YXJlbGwsIEZpcmEgU2FucywgRHJvaWQgU2FucywgSGVsdmV0aWNhIE5ldWUsXG4gICAgICAgICAgICBzYW5zLXNlcmlmO1xuICAgICAgICB9XG5cbiAgICAgICAgKiB7XG4gICAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgICAgfVxuICAgICAgYH08L3N0eWxlPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgTG9naW47Il19 */\n/*@ sourceURL=views/Login.js */'
      }), _react2.default.createElement(_style2.default, {
        styleId: '3379920139',
        css: 'html,body{padding:0;margin:0;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto, Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue, sans-serif;}*{box-sizing:border-box;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZXdzL0xvZ2luLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWdjeUIsQUFJcUIsQUFRWSxVQVBiLFNBR0csR0FLZCxtSUFKQSIsImZpbGUiOiJ2aWV3cy9Mb2dpbi5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvdGhlYmUvRGVza3RvcC9ibG9ja2NoYWluLXByb2oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtcbiAgICBJbnB1dCxcbiAgICBNZXNzYWdlLFxuICAgIENvbnRhaW5lcixcbiAgICBCdXR0b24sXG4gICAgSGVhZGVyLFxuICAgIEljb24sXG4gICAgSW1hZ2Vcbn0gZnJvbSAnc2VtYW50aWMtdWktcmVhY3QnO1xuaW1wb3J0IEhlYWQgZnJvbSAnbmV4dC9oZWFkJztcbmltcG9ydCB3ZWIzIGZyb20gJy4uL2V0aGVyZXVtL3dlYjMnO1xuaW1wb3J0IENvbnN0YW50IGZyb20gJy4uL3N1cHBvcnQvQ29uc3RhbnQnO1xuaW1wb3J0IENvbmZpZyBmcm9tICcuLi9zdXBwb3J0L0NvbmZpZyc7XG5cbmNsYXNzIExvZ2luIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMuYWNjb3VudCA9IHByb3BzLmFjY291bnQ7XG4gICAgICAgIHRoaXMuY29udHJhY3RNYW5hZ2VyID0gcHJvcHMuY29udHJhY3RNYW5hZ2VyO1xuICAgICAgICB0aGlzLnN0b3JhZ2VNYW5hZ2VyID0gcHJvcHMuc3RvcmFnZU1hbmFnZXI7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7cHJpdmF0ZUtleTogXCJcIiwgZXJyb3JNZXNzYWdlOlwiXCIsIHRyYW5zaXRpb25NZXNzYWdlOlwiXCIsIHdhbGxldEFkZHJlc3M6IFwiXCJ9O1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnN0b3JhZ2VNYW5hZ2VyLnJlbG9hZCk7XG4gICAgICAgIFxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICAvLyBhd2FpdCB0aGlzLnNsZWVwKDIwMDApO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnN0YXRlKTtcbiAgICAgICAgLy8gaWYod2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwicmVsb2FkXCIpPiAwKXtcbiAgICAgICAgLy8gfVxuICAgICAgICBjb25zb2xlLmxvZyh3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJyZWxvYWRcIikpXG4gICAgICAgIFxuXG4gICAgfVxuXG4gICAgaGFuZGxlQmFjayA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7d2FsbGV0QWRkcmVzcyA6IFwiXCIsIGVycm9yTWVzc2FnZTogXCJcIiwgdHJhbnNpdGlvbk1lc3NhZ2U6IFwiXCJ9KTtcbiAgICB9XG5cbiAgICBzbGVlcChtcykge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIG1zKSk7XG4gICAgfVxuXG4gICAgaGFuZGxlSm9pbiA9IGFzeW5jICgpID0+e1xuICAgICAgICBhd2FpdCB0aGlzLmFjY291bnQuc3RvcmVQcml2YXRlS2V5KHRoaXMuc3RhdGUucHJpdmF0ZUtleSk7XG4gICAgICAgIGF3YWl0IHRoaXMuY29udHJhY3RNYW5hZ2VyLmdldENvbnRyYWN0KCk7XG4gICAgICAgIHZhciB4ID0gYXdhaXQgdGhpcy5jb250cmFjdE1hbmFnZXIuZ2V0Sm9pbmVkQWRkcmVzcygpO1xuICAgICAgICBpZiAoeD09MCl7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkpvaW5pbmcgdGhlIG5ldHdvcmtcIik7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt0cmFuc2l0aW9uTWVzc2FnZTogXCJKb2luaW5nLi4uXCJ9KVxuICAgICAgICAgICAgdmFyIHB1YmxpY0tleUJ1ZmZlciA9IHRoaXMuYWNjb3VudC5nZXRQdWJsaWNLZXlCdWZmZXIoKTtcbiAgICAgICAgICAgIC8vIGF3YWl0IHRoaXMuY29udHJhY3RNYW5hZ2VyLmNoZWNrQWNjKCcweCcrdGhpcy5zdGF0ZS53YWxsZXRBZGRyZXNzKTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuY29udHJhY3RNYW5hZ2VyLmpvaW5Db250cmFjdChwdWJsaWNLZXlCdWZmZXIsICAgKHJlc3VsdEV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdEV2ZW50ID09IENvbnN0YW50LkVWRU5ULk9OX1JFSkVDVEVEIHx8IHJlc3VsdEV2ZW50ID09IENvbnN0YW50LkVWRU5ULk9OX0VSUk9SKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3RyYW5zaXRpb25NZXNzYWdlOiBcIlwiLCBlcnJvck1lc3NhZ2U6IFwiU29tZXRoaW5nIHdlbnQgd3JvbmcsIHJlZnJlc2hpbmcgaW4gMyBzZWNvbmRzLi4uXCJ9KVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlc3VsdEV2ZW50ID09IENvbnN0YW50LkVWRU5ULk9OX1JFQ0VJUFQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dHJhbnNpdGlvbk1lc3NhZ2U6IFwiU3VjY2VzcyFcIn0pXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuc3RvcmFnZU1hbmFnZXIucmVsb2FkID0gMTtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5zdG9yYWdlTWFuYWdlci5yZWxvYWQpO1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuc2V0U3RhdGUoe3RyYW5zaXRpb25NZXNzYWdlOiBcIlN1Y2Nlc3MhIENsaWNrIGhlcmUgdG8gZW50ZXIgaWYgbm90IGRpcmVjdGVkIGF1dG9tYXRpY2FsbHkuXCJ9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAvLyB0aGlzLnNldFN0YXRlKHt0cmFuc2l0aW9uTWVzc2FnZTogXCJTdWNjZXNzISBDbGljayBoZXJlIHRvIGVudGVyIGlmIG5vdCBkaXJlY3RlZCBhdXRvbWF0aWNhbGx5LlwifSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImV4aXN0aW5nXCIpO1xuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBcbiAgICB9XG5cblxuICAgIG5leHRDbGlja2VkID0gYXN5bmMgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnN0YXRlLnByaXZhdGVLZXkpXG4gICAgICAgIHZhciB3YWxsZXRBZGRyZXNzID0gYXdhaXQgdGhpcy5hY2NvdW50LmNoZWNrUHJpdmF0ZUtleSh0aGlzLnN0YXRlLnByaXZhdGVLZXkpO1xuICAgICAgICBpZiAod2FsbGV0QWRkcmVzcykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJzdWNlc3NcIiwgd2FsbGV0QWRkcmVzcyk7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtlcnJvck1lc3NhZ2UgOiBcIlwifSk7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt3YWxsZXRBZGRyZXNzIDogd2FsbGV0QWRkcmVzc30pO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkdVVVNMXCIpO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZXJyb3JNZXNzYWdlIDogXCJQcml2YXRlIEtleSBpcyBpbnZhbGlkXCJ9KTtcbiAgICAgICAgICAgIC8vIHRoaXMuc2V0U3RhdGUoe2Vycm9yTWVzc2FnZTogXCJJbnZhbGlkIHByaXZhdGUga2V5XCJ9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdsYW5kaW5nUGFnZScgPlxuICAgICAgICAgICAgPEhlYWQ+XG4gICAgICAgICAgICAgICAgPHRpdGxlPkV0aGVyZXVtIE1lc3NlbmdlcjwvdGl0bGU+XG4gICAgICAgICAgICAgICAgPGxpbmsgcmVsPVwic2hvcnRjdXQgaWNvblwiIGhyZWY9XCIvc3RhdGljL2ltYWdlcy9mYXZpY29uLmljb1wiIC8+XG4gICAgICAgICAgICAgICAgPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIGhyZWY9XCIvL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9zZW1hbnRpYy11aS8yLjIuMTIvc2VtYW50aWMubWluLmNzc1wiPjwvbGluaz5cbiAgICAgICAgICAgIDwvSGVhZD5cbiAgICAgICAgICAgICAgICA8SW1hZ2Ugc3JjPSdzdGF0aWMvaW1hZ2VzL2V0aGVyZXVtLW1lc3Nlbmdlci1sb2dvLnBuZycgaGVpZ2h0PXsxNTB9IHN0eWxlPXt7IG1hcmdpblRvcDogXCIxLjV2d1wifX0gLz5cbiAgICAgICAgICAgICAgICA8YnIvPlxuICAgICAgICAgICAgICAgIDxoMSBjbGFzc05hbWU9XCJ0aXRsZVwiICBmb250LWZhbWlseT1cIlRhaG9tYVwiPlxuICAgICAgICAgICAgICAgIFdlbGNvbWUgdG8gRXRoZXJldW0gTWVzc2VuZ2VyISBcbiAgICAgICAgICAgICAgICA8L2gxPlxuXG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZGVzY3JpcHRpb25cIj5cbiAgICAgICAgICAgICAgICBTZW5kIGEgcHJpdmF0ZSBtZXNzYWdlIHRvIHlvdXIgZnJpZW5kcyB0aGF0IHdpbGwgbmV2ZXIgYmUgbG9zdCFcbiAgICAgICAgICAgICAgICA8L3A+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nbG9naW5Cb3gnPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdsb2dpblRpdGxlJz4gU2lnbiBpbiB0byBCbG9jay1Gb3JldmVyPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2xvZ2luRm9ybScgPiBcbiAgICAgICAgICAgICAgICA8Zm9ybSBoaWRkZW49e3RoaXMuc3RhdGUud2FsbGV0QWRkcmVzcyAhPSBcIlwifSBjbGFzc05hbWU9J2xvZ2luRm9ybScgb25TdWJtaXQ9eyhlKT0+dGhpcy5uZXh0Q2xpY2tlZChlKX0+IFxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPSdsb2dpbkZpZWxkcycgaHRtbEZvcj1cInByaUtleVwiPkVudGVyIFByaXZhdGUgS2V5OjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB2YWx1ZT17dGhpcy5zdGF0ZS5wcml2YXRlS2V5fSBjbGFzc05hbWU9J2xvZ2luRmllbGRzIHByaXZhdGVLZXknIHR5cGU9XCJ0ZXh0XCIgb25DaGFuZ2U9eyhlKSA9PiB0aGlzLnNldFN0YXRlKHtwcml2YXRlS2V5OiBlLnRhcmdldC52YWx1ZX0pfSAgcmVxdWlyZWQgLz5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9J2xvZ2luRmllbGRzIHN1Ym1pdEJ1dHRvbicgdHlwZT1cInN1Ym1pdFwiPk5leHQ8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICAgICAgICAgICAgICAgICB7LyogPElucHV0IGZsdWlkIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLnByaXZhdGVLZXl9IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gdGhpcy5zZXRTdGF0ZSh7cHJpdmF0ZUtleTogZS50YXJnZXQudmFsdWV9KX0gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uPXt7IGNvbG9yOiAnYmx1ZScsIGxhYmVsUG9zaXRpb246ICdyaWdodCcsIGljb246ICdhbmdsZSByaWdodCcsIGNvbnRlbnQ6ICdOZXh0Jywgb25DbGljazogKGUpPT50aGlzLm5leHRDbGlja2VkKGUpfX0vPiAqL31cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIDxNZXNzYWdlIGVycm9yIGhlYWRlcj17dGhpcy5zdGF0ZS5lcnJvck1lc3NhZ2V9IGhpZGRlbj17dGhpcy5zdGF0ZS5lcnJvck1lc3NhZ2UgPT0gXCJcIn0vPlxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgPE1lc3NhZ2UgdGV4dCBwb3NpdGl2ZSBoaWRkZW49e3RoaXMuc3RhdGUud2FsbGV0QWRkcmVzcyA9PSBcIlwifT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxNZXNzYWdlLkhlYWRlcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2luIEV0aGVyZXVtIE1lc3NlbmdlciBhcyA8YnIvPiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q29udGFpbmVyIGZsdWlkIHRleHRBbGlnbj0nY2VudGVyJyBzdHlsZT17eyBtYXJnaW5Ub3A6IFwiMXZ3XCJ9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGIgc3R5bGU9e3tmb250U2l6ZTogXCIydndcIn19PjB4e3RoaXMuc3RhdGUud2FsbGV0QWRkcmVzc308L2I+PGJyLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgey8qIDxCdXR0b24gb25DbGljaz17dGhpcy5oYW5kbGVCYWNrfSBjb2xvciA9ICdibHVlJyAgc3R5bGU9e3sgbWFyZ2luVG9wOiBcIjF2d1wifX0gPkJhY2s8L0J1dHRvbj4gKi99XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxCdXR0b24gb25DbGljaz17dGhpcy5oYW5kbGVKb2lufSBjb2xvciA9ICdvcmFuZ2UnIHN0eWxlPXt7IG1hcmdpblRvcDogXCIwLjV2d1wifX0+Sm9pbjwvQnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9NZXNzYWdlLkhlYWRlcj5cbiAgICAgICAgICAgICAgICAgICAgPC9NZXNzYWdlPlxuICAgICAgICAgICAgICAgICAgICA8Q29udGFpbmVyIHRleHRBbGlnbj1cImNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICA8TWVzc2FnZSAgY29tcGFjdCBwb3NpdGl2ZSBoaWRkZW49e3RoaXMuc3RhdGUudHJhbnNpdGlvbk1lc3NhZ2UgIT0gXCJKb2luaW5nLi4uXCJ9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxJY29uIHNpemU9J2JpZycgbmFtZT0nY2lyY2xlIG5vdGNoZWQnIGxvYWRpbmcgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YiBzdHlsZT17e2ZvbnRTaXplOiBcIjIuNXZ3XCJ9fT57dGhpcy5zdGF0ZS50cmFuc2l0aW9uTWVzc2FnZX08L2I+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgc3R5bGU9e3tmb250U2l6ZTogXCIxdndcIn19PlBsZWFzZSBtYW51YWxseSByZWZyZXNoIHBhZ2UgaWYgdW5hYmxlIHRvIGxvZ2dpbmcgaW4gZHVyaW5nIGZpcnN0IHRpbWU8L3A+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvTWVzc2FnZT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxNZXNzYWdlICBjb21wYWN0IHBvc2l0aXZlIGhpZGRlbj17dGhpcy5zdGF0ZS50cmFuc2l0aW9uTWVzc2FnZSAhPSBcIlN1Y2Nlc3MhXCJ9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxJY29uIHNpemU9J2JpZycgbmFtZT0nY2hlY2snIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGIgc3R5bGU9e3tmb250U2l6ZTogXCIyLjV2d1wifX0+e3RoaXMuc3RhdGUudHJhbnNpdGlvbk1lc3NhZ2V9PC9iPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIHN0eWxlPXt7Zm9udFNpemU6IFwiMXZ3XCJ9fT5QbGVhc2UgbWFudWFsbHkgcmVmcmVzaCBwYWdlIGlmIHVuYWJsZSB0byBsb2dnaW5nIGluIGR1cmluZyBmaXJzdCB0aW1lPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9NZXNzYWdlPlxuICAgICAgICAgICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICAgICAgPC9Db250YWluZXI+XG5cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgXG4gICAgPHN0eWxlIGpzeD57YFxuICAgICAgICAuaGVhZGVye1xuICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDA3MGYzO1xuICAgICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICB9XG5cbiAgICAgICAgLmNvbnRhY3RMaXN0SGVhZGVye1xuICAgICAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgICAgIH1cblxuICAgICAgICAuY29udGFjdEltZ3tcbiAgICAgICAgICB3aWR0aDogMTAlO1xuICAgICAgICAgIGhlaWdodDogYXV0bztcbiAgICAgICAgICB0cmFuc2l0aW9uOiBmaWx0ZXIgMC4xNXMgZWFzZVxuICAgICAgICB9XG5cbiAgICAgICAgLmNvbnRhY3ROYW1le1xuICAgICAgICAgIGZvbnQtc2l6ZTogMC44cmVtO1xuICAgICAgICAgIG1hcmdpbi1sZWZ0OiAwLjJyZW07XG4gICAgICAgICAgdHJhbnNpdGlvbjogY29sb3IgMC4xNXMgZWFzZVxuICAgICAgICB9XG5cbiAgICAgICAgLmNvbnRhY3RCb3h7XG4gICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICBvdmVyZmxvdzogc2Nyb2xsO1xuICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgICAgbWFyZ2luLXRvcDogMC41cmVtO1xuICAgICAgICAgIGJvcmRlcjogMnB4IHRyYW5zcGFyZW50IHNvbGlkO1xuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gICAgICAgICAgcGFkZGluZzogMC41cmVtO1xuICAgICAgICAgIHRyYW5zaXRpb246IGJvcmRlci1jb2xvciAwLjE1cyBlYXNlLCBiYWNrZ3JvdW5kLWNvbG9yIDAuMTVzIGVhc2U7XG4gICAgICAgIH1cblxuICAgICAgICAuY29udGFjdEJveCA6aG92ZXIsXG4gICAgICAgIC5jb250YWN0Qm94IDpmb2N1cyxcbiAgICAgICAgLmNvbnRhY3RCb3ggOmFjdGl2ZSB7XG4gICAgICAgICAgYm9yZGVyLWNvbG9yOiAjMDA3MGYzO1xuICAgICAgICAgIFxuICAgICAgICB9XG5cbiAgICAgICAgLmNvbnRhY3RBZGR7XG4gICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICBtYXJnaW4tdG9wOiAxcmVtO1xuICAgICAgICAgIG1hcmdpbi1ib3R0b206IDAuNXJlbTtcbiAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgICAgIH1cblxuICAgICAgICAucHVibGljS2V5e1xuICAgICAgICAgIHdpZHRoOiA2MCVcbiAgICAgICAgfVxuXG4gICAgICAgIC5ib2R5e1xuICAgICAgICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgM2ZyO1xuICAgICAgICAgIGdyaWQtdGVtcGxhdGUtYXJlYXM6IFwiY29udGFjdExpc3QgbWVzc2FnZUJvZHlcIjtcbiAgICAgICAgICBnYXA6IDE1cHg7XG4gICAgICAgICAgcGFkZGluZzogMCAxcmVtO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAuYm9keUNvbHN7XG4gICAgICAgICAgYm9yZGVyOiAxcHggc29saWQgI2VhZWFlYTtcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICAgICAgICAgIHBhZGRpbmc6IDAuNXJlbTtcbiAgICAgICAgfVxuXG4gICAgICAgIC5tZXNzYWdlUm93c3tcbiAgICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjZWFlYWVhO1xuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gICAgICAgICAgcGFkZGluZzogMC41cmVtO1xuICAgICAgICB9XG5cbiAgICAgICAgLmNvbnRhY3RMaXN0e1xuICAgICAgICAgIGdyaWQtYXJlYTogY29udGFjdExpc3Q7XG4gICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICB9XG5cbiAgICAgICAgLm1lc3NhZ2VCb2R5e1xuICAgICAgICAgIGdyaWQtYXJlYTogbWVzc2FnZUJvZHk7XG4gICAgICAgICAgZGlzcGxheTogZ3JpZDtcbiAgICAgICAgICBncmlkLXRlbXBsYXRlLXJvd3M6IDNmciAxZnI7XG4gICAgICAgICAgZ3JpZC10ZW1wbGF0ZS1hcmVhczogXCJjb252ZXJzYXRpb25cIiBcIm1lc3NhZ2VcIjtcbiAgICAgICAgICBnYXA6IDE1cHg7XG4gICAgICAgIH1cblxuICAgICAgICAuY29udmVyc2F0aW9ue1xuICAgICAgICAgIGdyaWQtYXJlYTogY29udmVyc2F0aW9uO1xuICAgICAgICB9XG5cbiAgICAgICAgLm1lc3NhZ2V7XG4gICAgICAgICAgbWF4LWhlaWdodDogMTB2aDtcbiAgICAgICAgICBncmlkLWFyZWE6IG1lc3NhZ2U7XG4gICAgICAgICAgZGlzcGxheTogZ3JpZDtcbiAgICAgICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDdmciAxZnI7XG4gICAgICAgICAgZ2FwOiAxNXB4O1xuICAgICAgICB9XG5cbiAgICAgICAgLmhlYWRlckl0ZW1ze1xuICAgICAgICAgIG1hcmdpbjogMXJlbTtcbiAgICAgICAgICBjb2xvcjogd2hpdGU7XG4gICAgICAgICAgcGFkZGluZzogMC41cmVtO1xuICAgICAgICB9XG5cbiAgICAgICAgLmJhbGFuY2V7XG4gICAgICAgICAgYmFja2dyb3VuZDogb3JhbmdlO1xuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDEwcHhcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLmNvbnRhaW5lciB7XG4gICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICAgIFxuICAgICAgICB9XG5cbiAgICAgICAgLmxvZ2luQm94e1xuICAgICAgICAgIHdpZHRoOiA2MCU7XG4gICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICAgIHBhZGRpbmc6IDIuNXJlbSAwLjVyZW07XG4gICAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjZWFlYWVhO1xuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gICAgICAgICAgdHJhbnNpdGlvbjogY29sb3IgMC4xNXMgZWFzZSwgYm9yZGVyLWNvbG9yIDAuMTVzIGVhc2U7XG4gICAgICAgIH1cblxuICAgICAgICAubG9naW5Gb3Jte1xuICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgICBwYWRkaW5nOiAwLjVyZW0gMS44cmVtO1xuICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgICAgd2lkdGg6IDEwMCVcbiAgICAgICAgfVxuXG4gICAgICAgIC5sb2dpbkZpZWxkc3tcbiAgICAgICAgICBtYXJnaW4tdG9wOiAwLjVyZW1cbiAgICAgICAgfVxuXG4gICAgICAgIC5wcml2YXRlS2V5e1xuICAgICAgICAgIHBhZGRpbmc6IDAuNXJlbSAwLjVyZW07XG4gICAgICAgICAgd2lkdGg6IDEwMCVcbiAgICAgICAgfVxuXG4gICAgICAgIC5zdWJtaXRCdXR0b257XG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICAgICAgd2lkdGg6IDQwJTtcbiAgICAgICAgICBhbGlnbi1zZWxmOiBjZW50ZXI7XG4gICAgICAgICAgcGFkZGluZzogMC41cmVtIDAuNXJlbTtcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICAgICAgICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gICAgICAgICAgdHJhbnNpdGlvbjogY29sb3IgMC4xNXMgZWFzZSwgYm9yZGVyLWNvbG9yIDAuMTVzIGVhc2U7XG4gICAgICAgIH1cbiAgICAgIFxuICAgICAgICAuc3VibWl0QnV0dG9uIDpob3ZlcixcbiAgICAgICAgLnN1Ym1pdEJ1dHRvbiA6Zm9jdXMsXG4gICAgICAgIC5zdWJtaXRCdXR0b24gOmFjdGl2ZSB7XG4gICAgICAgICAgYm9yZGVyLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgICAgICBjb2xvcjogICNmZmY7XG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjojMDA3MGYzIDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLmFkZEJ1dHRvbntcbiAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgICAgICBhbGlnbi1zZWxmOiBjZW50ZXI7XG4gICAgICAgICAgcGFkZGluZzogMC41cmVtIDAuNXJlbTtcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICAgICAgICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gICAgICAgICAgdHJhbnNpdGlvbjogY29sb3IgMC4xNXMgZWFzZSwgYm9yZGVyLWNvbG9yIDAuMTVzIGVhc2U7XG4gICAgICAgIH1cbiAgICAgIFxuICAgICAgICAuYWRkQnV0dG9uIDpob3ZlcixcbiAgICAgICAgLmFkZEJ1dHRvbiA6Zm9jdXMsXG4gICAgICAgIC5hZGRCdXR0b24gOmFjdGl2ZSB7XG4gICAgICAgICAgYm9yZGVyLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgICAgICBjb2xvcjogICNmZmY7XG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjojMDA3MGYzIDtcbiAgICAgICAgfVxuXG4gICAgICAgIC5zZW5kQnV0dG9ue1xuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgICAgIGFsaWduLXNlbGY6IGNlbnRlcjtcbiAgICAgICAgICBwYWRkaW5nOiAwLjVyZW0gMC41cmVtO1xuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gICAgICAgICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICAgICAgICB0cmFuc2l0aW9uOiBjb2xvciAwLjE1cyBlYXNlLCBib3JkZXItY29sb3IgMC4xNXMgZWFzZTtcbiAgICAgICAgfVxuICAgICAgXG4gICAgICAgIC5zZW5kQnV0dG9uIDpob3ZlcixcbiAgICAgICAgLnNlbmRCdXR0b24gOmZvY3VzLFxuICAgICAgICAuc2VuZEJ1dHRvbiA6YWN0aXZlIHtcbiAgICAgICAgICBib3JkZXItY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgICAgIGNvbG9yOiAgI2ZmZjtcbiAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiMwMDcwZjMgO1xuICAgICAgICB9XG5cbiAgICAgICAgLmxhbmRpbmdQYWdlIHtcbiAgICAgICAgICBmbGV4OiAxO1xuICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9vdGVyIHtcbiAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICBoZWlnaHQ6IDEwMHB4O1xuICAgICAgICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCAjZWFlYWVhO1xuICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvb3RlciBpbWcge1xuICAgICAgICAgIG1hcmdpbi1sZWZ0OiAwLjVyZW07XG4gICAgICAgIH1cblxuICAgICAgICBmb290ZXIgYSB7XG4gICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICB9XG5cbiAgICAgICAgYSB7XG4gICAgICAgICAgY29sb3I6IGluaGVyaXQ7XG4gICAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICAgICAgICB9XG5cbiAgICAgICAgLnRpdGxlIGEge1xuICAgICAgICAgIGNvbG9yOiAjMDA3MGYzO1xuICAgICAgICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC50aXRsZSBhOmhvdmVyLFxuICAgICAgICAudGl0bGUgYTpmb2N1cyxcbiAgICAgICAgLnRpdGxlIGE6YWN0aXZlIHtcbiAgICAgICAgICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC50aXRsZSB7XG4gICAgICAgICAgbWFyZ2luOiAwO1xuICAgICAgICAgIGxpbmUtaGVpZ2h0OiAxLjE1O1xuICAgICAgICAgIGZvbnQtc2l6ZTogM3JlbTtcbiAgICAgICAgfVxuICAgICAgICAubG9naW5UaXRsZSB7XG4gICAgICAgICAgbWFyZ2luOiAwO1xuICAgICAgICAgIGxpbmUtaGVpZ2h0OiAxLjE1O1xuICAgICAgICAgIGZvbnQtc2l6ZTogMnJlbTtcbiAgICAgICAgICBmb250LXdlaWdodDogNzAwO1xuICAgICAgICAgIGNvbG9yOiAjMDA3MGYzO1xuICAgICAgICB9XG5cbiAgICAgICAgLnRpdGxlLFxuICAgICAgICAuZGVzY3JpcHRpb24ge1xuICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIC5kZXNjcmlwdGlvbiB7XG4gICAgICAgICAgbGluZS1oZWlnaHQ6IDEuNTtcbiAgICAgICAgICBmb250LXNpemU6IDEuNXJlbTtcbiAgICAgICAgfVxuXG4gICAgICAgIC5sb2dpbkJveDpob3ZlcixcbiAgICAgICAgLmxvZ2luQm94OmZvY3VzLFxuICAgICAgICAubG9naW5Cb3g6YWN0aXZlIHtcbiAgICAgICAgICBcbiAgICAgICAgICBib3JkZXItY29sb3I6ICMwMDcwZjM7XG4gICAgICAgIH1cblxuICAgICAgICAuY2FyZCBoMyB7XG4gICAgICAgICAgbWFyZ2luOiAwIDAgMXJlbSAwO1xuICAgICAgICAgIGZvbnQtc2l6ZTogMS41cmVtO1xuICAgICAgICB9XG5cbiAgICAgICAgLmNhcmQgcCB7XG4gICAgICAgICAgbWFyZ2luOiAwO1xuICAgICAgICAgIGZvbnQtc2l6ZTogMS4yNXJlbTtcbiAgICAgICAgICBsaW5lLWhlaWdodDogMS41O1xuICAgICAgICB9XG5cbiAgICAgICAgLmxvZ28ge1xuICAgICAgICAgIGhlaWdodDogMWVtO1xuICAgICAgICB9XG5cbiAgICAgICAgQG1lZGlhIChtYXgtd2lkdGg6IDYwMHB4KSB7XG4gICAgICAgICAgLmdyaWQge1xuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgYH08L3N0eWxlPlxuXG4gICAgICA8c3R5bGUganN4IGdsb2JhbD57YFxuICAgICAgICBodG1sLFxuICAgICAgICBib2R5IHtcbiAgICAgICAgICBwYWRkaW5nOiAwO1xuICAgICAgICAgIG1hcmdpbjogMDtcbiAgICAgICAgICBmb250LWZhbWlseTogLWFwcGxlLXN5c3RlbSwgQmxpbmtNYWNTeXN0ZW1Gb250LCBTZWdvZSBVSSwgUm9ib3RvLFxuICAgICAgICAgICAgT3h5Z2VuLCBVYnVudHUsIENhbnRhcmVsbCwgRmlyYSBTYW5zLCBEcm9pZCBTYW5zLCBIZWx2ZXRpY2EgTmV1ZSxcbiAgICAgICAgICAgIHNhbnMtc2VyaWY7XG4gICAgICAgIH1cblxuICAgICAgICAqIHtcbiAgICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgICB9XG4gICAgICBgfTwvc3R5bGU+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBMb2dpbjsiXX0= */\n/*@ sourceURL=views/Login.js */'
      }));
    }
  }]);

  return Login;
}(_react.Component);

exports.default = Login;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZXdzL0xvZ2luLmpzIl0sIm5hbWVzIjpbIkNvbXBvbmVudCIsIklucHV0IiwiTWVzc2FnZSIsIkNvbnRhaW5lciIsIkJ1dHRvbiIsIkhlYWRlciIsIkljb24iLCJJbWFnZSIsIkhlYWQiLCJ3ZWIzIiwiQ29uc3RhbnQiLCJDb25maWciLCJMb2dpbiIsInByb3BzIiwiaGFuZGxlQmFjayIsInNldFN0YXRlIiwid2FsbGV0QWRkcmVzcyIsImVycm9yTWVzc2FnZSIsInRyYW5zaXRpb25NZXNzYWdlIiwiaGFuZGxlSm9pbiIsImFjY291bnQiLCJzdG9yZVByaXZhdGVLZXkiLCJzdGF0ZSIsInByaXZhdGVLZXkiLCJjb250cmFjdE1hbmFnZXIiLCJnZXRDb250cmFjdCIsImdldEpvaW5lZEFkZHJlc3MiLCJ4IiwiY29uc29sZSIsImxvZyIsInB1YmxpY0tleUJ1ZmZlciIsImdldFB1YmxpY0tleUJ1ZmZlciIsImpvaW5Db250cmFjdCIsInJlc3VsdEV2ZW50IiwiRVZFTlQiLCJPTl9SRUpFQ1RFRCIsIk9OX0VSUk9SIiwiT05fUkVDRUlQVCIsIndpbmRvdyIsImxvY2F0aW9uIiwicmVsb2FkIiwibmV4dENsaWNrZWQiLCJlIiwicHJldmVudERlZmF1bHQiLCJjaGVja1ByaXZhdGVLZXkiLCJzdG9yYWdlTWFuYWdlciIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJtcyIsInNldFRpbWVvdXQiLCJyZXNvbHZlIiwibWFyZ2luVG9wIiwidGFyZ2V0IiwidmFsdWUiLCJmb250U2l6ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsQUFBUTs7OztBQUNSLEFBQ0ksQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0E7O0FBRUosQUFBTzs7OztBQUNQLEFBQU8sQUFBVTs7OztBQUNqQixBQUFPLEFBQWM7Ozs7QUFDckIsQUFBTyxBQUFZOzs7Ozs7Ozs7SSxBQUViO2lDQUNGOztpQkFBQSxBQUFZLE9BQU87aUJBQUE7O3dDQUFBOztvSUFBQSxBQUNUOztVQURTLEFBb0JuQixhQUFhLFlBQU0sQUFDZjtZQUFBLEFBQUssU0FBUyxFQUFDLGVBQUQsQUFBaUIsSUFBSSxjQUFyQixBQUFtQyxJQUFJLG1CQUFyRCxBQUFjLEFBQTBELEFBQzNFO0FBdEJrQjs7VUFBQSxBQTRCbkIsc0ZBQWEsbUJBQUE7YUFBQTtvRUFBQTtrQkFBQTsyQ0FBQTtpQkFBQTs4QkFBQTtxQkFDSCxNQUFBLEFBQUssUUFBTCxBQUFhLGdCQUFnQixNQUFBLEFBQUssTUFEL0IsQUFDSCxBQUF3Qzs7aUJBRHJDOzhCQUFBO3FCQUVILE1BQUEsQUFBSyxnQkFGRixBQUVILEFBQXFCOztpQkFGbEI7OEJBQUE7cUJBR0ssTUFBQSxBQUFLLGdCQUhWLEFBR0ssQUFBcUI7O2lCQUEvQjtBQUhLLDJCQUFBOztvQkFJTCxLQUpLLEFBSUYsSUFKRTtnQ0FBQTtBQUFBO0FBS0w7O3NCQUFBLEFBQVEsSUFBUixBQUFZLEFBQ1o7b0JBQUEsQUFBSyxTQUFTLEVBQUMsbUJBQWYsQUFBYyxBQUFvQixBQUM5QjtBQVBDLGdDQU9pQixNQUFBLEFBQUssUUFQdEIsQUFPaUIsQUFBYSxBQUNuQztBQVJLOzs4QkFBQTsyQkFTQyxBQUFLLGdCQUFMLEFBQXFCLGFBQXJCLEFBQWtDLGlCQUFtQixVQUFBLEFBQUMsYUFBZ0IsQUFDeEU7b0JBQUksZUFBZSxtQkFBQSxBQUFTLE1BQXhCLEFBQThCLGVBQWUsZUFBZSxtQkFBQSxBQUFTLE1BQXpFLEFBQStFLFVBQVUsQUFDckY7d0JBQUEsQUFBSyxTQUFTLEVBQUMsbUJBQUQsQUFBb0IsSUFBSSxjQUF0QyxBQUFjLEFBQXNDLEFBRXZEO0FBSEQsdUJBR08sSUFBSSxlQUFlLG1CQUFBLEFBQVMsTUFBNUIsQUFBa0MsWUFBWSxBQUNqRDt3QkFBQSxBQUFLLFNBQVMsRUFBQyxtQkFBZixBQUFjLEFBQW9CLEFBQ2xDO0FBQ0E7QUFDQTt5QkFBQSxBQUFPLFNBQVAsQUFBZ0IsQUFDaEI7QUFDSDtBQUNKO0FBcEJJLEFBU0MsZUFBQTs7aUJBVEQ7OEJBQUE7QUFBQTs7aUJBc0JMO0FBQ0E7c0JBQUEsQUFBUSxJQUFSLEFBQVksQUFDWjtxQkFBQSxBQUFPLFNBeEJGLEFBd0JMLEFBQWdCOztpQkF4Qlg7aUJBQUE7OEJBQUE7O0FBQUE7a0JBQUE7QUE1Qk07O1VBQUEsQUEyRG5CLDBCQTNEbUI7MkZBMkRMLGtCQUFBLEFBQU8sR0FBUDtZQUFBO3dFQUFBO29CQUFBOytDQUFBO21CQUNWO2tCQUFBLEFBQUUsQUFDRjtBQUZVO2lDQUFBO3VCQUdnQixNQUFBLEFBQUssUUFBTCxBQUFhLGdCQUFnQixNQUFBLEFBQUssTUFIbEQsQUFHZ0IsQUFBd0M7O21CQUE5RDtBQUhNLDBDQUlWOztvQkFBQSxBQUFJLGVBQWUsQUFDZjswQkFBQSxBQUFRLElBQVIsQUFBWSxVQUFaLEFBQXNCLEFBQ3RCO3dCQUFBLEFBQUssU0FBUyxFQUFDLGNBQWYsQUFBYyxBQUFnQixBQUM5Qjt3QkFBQSxBQUFLLFNBQVMsRUFBQyxlQUFmLEFBQWMsQUFBaUIsQUFFbEM7QUFMRCx1QkFLTyxBQUNIO0FBQ0E7d0JBQUEsQUFBSyxTQUFTLEVBQUMsY0FBZixBQUFjLEFBQWdCLEFBQzlCO0FBQ0g7QUFiUzs7bUJBQUE7bUJBQUE7aUNBQUE7O0FBQUE7cUJBQUE7QUEzREs7OzJCQUFBO2lDQUFBO0FBQUE7QUFFZjs7VUFBQSxBQUFLLFVBQVUsTUFBZixBQUFxQixBQUNyQjtVQUFBLEFBQUssa0JBQWtCLE1BQXZCLEFBQTZCLEFBQzdCO1VBQUEsQUFBSyxpQkFBaUIsTUFBdEIsQUFBNEIsQUFDNUI7VUFBQSxBQUFLLFFBQVEsRUFBQyxZQUFELEFBQWEsSUFBSSxjQUFqQixBQUE4QixJQUFJLG1CQUFsQyxBQUFvRCxJQUFJLGVBQXJFLEFBQWEsQUFBdUUsQUFDcEY7WUFBQSxBQUFRLElBQUksTUFBQSxBQUFLLGVBTkYsQUFNZixBQUFnQzs7V0FFbkM7Ozs7O3dDQUVtQixBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO2NBQUEsQUFBUSxJQUFJLE9BQUEsQUFBTyxhQUFQLEFBQW9CLFFBQWhDLEFBQVksQUFBNEIsQUFHM0M7Ozs7MEIsQUFNSyxJQUFJLEFBQ047bUNBQW1CLG1CQUFBO2VBQVcsV0FBQSxBQUFXLFNBQXRCLEFBQVcsQUFBb0I7QUFBbEQsQUFBTyxBQUNWLE9BRFU7Ozs7NkJBa0RGO21CQUNMOzs2QkFDSSxjQUFBOzJDQUFBLEFBQWU7O29CQUFmO3NCQUFBLEFBQ0E7QUFEQTtBQUFBLE9BQUEsa0JBQ0EsQUFBQzs7b0JBQUQ7c0JBQUEsQUFDSTtBQURKO0FBQUEseUJBQ0ksY0FBQTttQkFBQTs7b0JBQUE7c0JBQUE7QUFBQTtBQUFBLFNBREosQUFDSSxBQUNBLCtEQUFNLEtBQU4sQUFBVSxpQkFBZ0IsTUFBMUIsQUFBK0IseUNBQS9COztvQkFBQTtzQkFGSixBQUVJLEFBQ0E7QUFEQTtrREFDTSxLQUFOLEFBQVUsY0FBYSxNQUF2QixBQUE0QixtRkFBNUI7O29CQUFBO3NCQUpKLEFBQ0EsQUFHSSxBQUVBO0FBRkE7MkJBRUEsQUFBQyx3Q0FBTSxLQUFQLEFBQVcsNkNBQTRDLFFBQXZELEFBQStELEtBQUssT0FBTyxFQUFFLFdBQTdFLEFBQTJFLEFBQWE7b0JBQXhGO3NCQU5KLEFBTUksQUFDQTtBQURBOzttQkFDQTs7b0JBQUE7c0JBUEosQUFPSSxBQUNBO0FBREE7QUFBQSwwQkFDQSxjQUFBLFFBQXVCLGVBQXZCLEFBQW1DLDZDQUFuQyxBQUFjOztvQkFBZDtzQkFBQTtBQUFBO1NBUkosQUFRSSxBQUlBLG1EQUFBLGNBQUE7MkNBQUEsQUFBYTs7b0JBQWI7c0JBQUE7QUFBQTtBQUFBLFNBWkosQUFZSSxBQUlBLG9GQUFBLGNBQUE7MkNBQUEsQUFBZTs7b0JBQWY7c0JBQUEsQUFDQTtBQURBO0FBQUEseUJBQ0EsY0FBQTsyQ0FBQSxBQUFlOztvQkFBZjtzQkFBQTtBQUFBO0FBQUEsU0FEQSxBQUNBLEFBQ0EsOENBQUEsY0FBQTsyQ0FBQSxBQUFlOztvQkFBZjtzQkFBQSxBQUNBO0FBREE7QUFBQSx5QkFDQSxjQUFBLFVBQU0sUUFBUSxLQUFBLEFBQUssTUFBTCxBQUFXLGlCQUF6QixBQUEwQyxJQUEwQixVQUFVLGtCQUFBLEFBQUMsR0FBRDtpQkFBSyxPQUFBLEFBQUssWUFBVixBQUFLLEFBQWlCO0FBQXBHLDhDQUFBLEFBQXdEOztvQkFBeEQ7c0JBQUEsQUFDSTtBQURKO3lCQUNJLGNBQUEsV0FBK0IsU0FBL0IsQUFBdUMsNkNBQXZDLEFBQWlCOztvQkFBakI7c0JBQUE7QUFBQTtTQURKLEFBQ0ksQUFDQSxnRUFBTyxPQUFPLEtBQUEsQUFBSyxNQUFuQixBQUF5QixZQUErQyxNQUF4RSxBQUE2RSxRQUFPLFVBQVUsa0JBQUEsQUFBQyxHQUFEO2lCQUFPLE9BQUEsQUFBSyxTQUFTLEVBQUMsWUFBWSxFQUFBLEFBQUUsT0FBcEMsQUFBTyxBQUFjLEFBQXNCO0FBQXpJLFdBQW1KLFVBQW5KLHlDQUFBLEFBQStDOztvQkFBL0M7c0JBRkosQUFFSSxBQUNBO0FBREE7MEJBQ0EsY0FBQSxZQUE2QyxNQUE3QyxBQUFrRCw2Q0FBbEQsQUFBa0I7O29CQUFsQjtzQkFBQTtBQUFBO1NBSkosQUFDQSxBQUdJLEFBT0EsMEJBQUEsQUFBQywwQ0FBUSxPQUFULE1BQWUsUUFBUSxLQUFBLEFBQUssTUFBNUIsQUFBa0MsY0FBYyxRQUFRLEtBQUEsQUFBSyxNQUFMLEFBQVcsZ0JBQW5FLEFBQW1GO29CQUFuRjtzQkFYSixBQVdJLEFBRUE7QUFGQTswQkFFQSxBQUFDLDBDQUFRLE1BQVQsTUFBYyxVQUFkLE1BQXVCLFFBQVEsS0FBQSxBQUFLLE1BQUwsQUFBVyxpQkFBMUMsQUFBMkQ7b0JBQTNEO3NCQUFBLEFBQ0k7QUFESjt5QkFDSyxjQUFELHlCQUFBLEFBQVM7O29CQUFUO3NCQUFBO0FBQUE7QUFBQSxTQUMrQjttQkFBQTs7b0JBQUE7c0JBRC9CLEFBQytCLEFBQzNCO0FBRDJCO0FBQUEsMEJBQzNCLEFBQUMsNENBQVUsT0FBWCxNQUFpQixXQUFqQixBQUEyQixVQUFTLE9BQU8sRUFBRSxXQUE3QyxBQUEyQyxBQUFhO29CQUF4RDtzQkFBQSxBQUNJO0FBREo7eUJBQ0ksY0FBQSxPQUFHLE9BQU8sRUFBQyxVQUFYLEFBQVUsQUFBVyxvQkFBckI7O29CQUFBO3NCQUFBO0FBQUE7U0FBZ0MsV0FBQSxBQUFLLE1BRHpDLEFBQ0ksQUFBMkMsQUFBa0I7bUJBQUE7O29CQUFBO3NCQURqRSxBQUNpRSxBQUU3RDtBQUY2RDtBQUFBLDBCQUU3RCxBQUFDLHlDQUFPLFNBQVMsS0FBakIsQUFBc0IsWUFBWSxPQUFsQyxBQUEwQyxVQUFTLE9BQU8sRUFBRSxXQUE1RCxBQUEwRCxBQUFhO29CQUF2RTtzQkFBQTtBQUFBO1NBbkJoQixBQWFJLEFBQ0ksQUFFSSxBQUdJLEFBSVosNEJBQUEsQUFBQyw0Q0FBVSxXQUFYLEFBQXFCO29CQUFyQjtzQkFBQSxBQUNBO0FBREE7eUJBQ0EsQUFBQywwQ0FBUyxTQUFWLE1BQWtCLFVBQWxCLE1BQTJCLFFBQVEsS0FBQSxBQUFLLE1BQUwsQUFBVyxxQkFBOUMsQUFBbUU7b0JBQW5FO3NCQUFBLEFBQ1E7QUFEUjt5QkFDUSxBQUFDLHVDQUFLLE1BQU4sQUFBVyxPQUFNLE1BQWpCLEFBQXNCLGtCQUFpQixTQUF2QztvQkFBQTtzQkFEUixBQUNRLEFBQ0E7QUFEQTswQkFDQSxjQUFBLE9BQUcsT0FBTyxFQUFDLFVBQVgsQUFBVSxBQUFXLHNCQUFyQjs7b0JBQUE7c0JBQUEsQUFBZ0M7QUFBaEM7Y0FBZ0MsQUFBSyxNQUY3QyxBQUVRLEFBQTJDLEFBQzNDLG9DQUFBLGNBQUEsT0FBRyxPQUFPLEVBQUMsVUFBWCxBQUFVLEFBQVcsb0JBQXJCOztvQkFBQTtzQkFBQTtBQUFBO1NBSlIsQUFDQSxBQUdRLEFBR0osNEZBQUEsQUFBQywwQ0FBUyxTQUFWLE1BQWtCLFVBQWxCLE1BQTJCLFFBQVEsS0FBQSxBQUFLLE1BQUwsQUFBVyxxQkFBOUMsQUFBbUU7b0JBQW5FO3NCQUFBLEFBQ0k7QUFESjt5QkFDSSxBQUFDLHVDQUFLLE1BQU4sQUFBVyxPQUFNLE1BQWpCLEFBQXNCO29CQUF0QjtzQkFESixBQUNJLEFBQ0E7QUFEQTswQkFDQSxjQUFBLE9BQUcsT0FBTyxFQUFDLFVBQVgsQUFBVSxBQUFXLHNCQUFyQjs7b0JBQUE7c0JBQUEsQUFBZ0M7QUFBaEM7Y0FBZ0MsQUFBSyxNQUZ6QyxBQUVJLEFBQTJDLEFBQzNDLG9DQUFBLGNBQUEsT0FBRyxPQUFPLEVBQUMsVUFBWCxBQUFVLEFBQVcsb0JBQXJCOztvQkFBQTtzQkFBQTtBQUFBO1NBbkRoQixBQWdCSSxBQUVBLEFBdUJJLEFBT0ksQUFHSTtpQkFuRGhCO2FBQUE7QUFBQTtpQkFBQTthQURKLEFBQ0ksQUFtWFA7QUFuWE87Ozs7O0EsQUE5RVEsQUFtY3BCOztrQkFBQSxBQUFlIiwiZmlsZSI6IkxvZ2luLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy90aGViZS9EZXNrdG9wL2Jsb2NrY2hhaW4tcHJvaiJ9

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "/Users/thebe/Desktop/blockchain-proj/views/Login.js"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/Users/thebe/Desktop/blockchain-proj/views/Login.js"); } } })();

/***/ }),

/***/ 1355:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

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

var _Utils = __webpack_require__(460);

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

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "/Users/thebe/Desktop/blockchain-proj/views/Chat.js"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/Users/thebe/Desktop/blockchain-proj/views/Chat.js"); } } })();
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(392).Buffer))

/***/ }),

/***/ 802:
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

var _AddContactModal = __webpack_require__(1354);

var _AddContactModal2 = _interopRequireDefault(_AddContactModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/thebe/Desktop/blockchain-proj/views/ContactList.js';
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
                        lineNumber: 115
                    }
                });
            } else if (contactAddresses.length == 0) {
                contactItems.push(_react2.default.createElement(_semanticUiReact.List.Item, { key: 'contact_' + i, __source: {
                        fileName: _jsxFileName,
                        lineNumber: 119
                    }
                }, _react2.default.createElement(_semanticUiReact.List.Content, {
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 120
                    }
                }, _react2.default.createElement(_semanticUiReact.List.Header, {
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 121
                    }
                }, 'Empty'))));
                htmlContent = _react2.default.createElement(_semanticUiReact.List, { selection: true, verticalAlign: 'middle', __source: {
                        fileName: _jsxFileName,
                        lineNumber: 125
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
                                lineNumber: 133
                            }
                        }, _react2.default.createElement(_semanticUiReact.Button, { color: 'orange', loading: user.isAccepting, disabled: user.isAccepting,
                            onClick: this.acceptContactRequest, value: contactAddresses[i], __source: {
                                fileName: _jsxFileName,
                                lineNumber: 134
                            }
                        }, 'Accept'), _react2.default.createElement(_semanticUiReact.Popup, { key: 'info_button_popup_' + i,
                            trigger: _react2.default.createElement(_semanticUiReact.Button, { color: 'green', as: 'a', href: addressExplorerUrl, target: '_blank', circular: true, icon: 'info circle', __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 137
                                }
                            }),
                            content: 'View on Etherscan',
                            __source: {
                                fileName: _jsxFileName,
                                lineNumber: 136
                            }
                        }));
                    } else if (user.relationship == _Constant2.default.Relationship.Requested) {
                        rightAlignedContent = _react2.default.createElement(_semanticUiReact.List.Content, { floated: 'right', __source: {
                                fileName: _jsxFileName,
                                lineNumber: 144
                            }
                        }, _react2.default.createElement(_semanticUiReact.Popup, { key: 'wait_popup_' + i,
                            trigger: _react2.default.createElement(_semanticUiReact.Button, { color: 'yellow', circular: true, icon: 'wait', __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 146
                                }
                            }),
                            content: 'Pending acceptance',
                            __source: {
                                fileName: _jsxFileName,
                                lineNumber: 145
                            }
                        }), _react2.default.createElement(_semanticUiReact.Popup, { key: 'info_button_popup_' + i,
                            trigger: _react2.default.createElement(_semanticUiReact.Button, { color: 'green', as: 'a', href: addressExplorerUrl, target: '_blank', circular: true, icon: 'info circle', __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 150
                                }
                            }),
                            content: 'View on Etherscan',
                            __source: {
                                fileName: _jsxFileName,
                                lineNumber: 149
                            }
                        }));
                    } else {
                        rightAlignedContent = _react2.default.createElement(_semanticUiReact.List.Content, { floated: 'right', __source: {
                                fileName: _jsxFileName,
                                lineNumber: 157
                            }
                        }, _react2.default.createElement(_semanticUiReact.Popup, { key: 'info_button_popup_' + i,
                            trigger: _react2.default.createElement(_semanticUiReact.Button, { color: 'green', as: 'a', href: addressExplorerUrl, target: '_blank', circular: true, icon: 'info circle', __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 159
                                }
                            }),
                            content: 'View on Etherscan',
                            __source: {
                                fileName: _jsxFileName,
                                lineNumber: 158
                            }
                        }));
                    }

                    var address = contactAddresses[i];
                    contactItems.push(_react2.default.createElement(_semanticUiReact.List.Item, { active: address == this.state.selectedAddress, key: 'contact_' + i, value: address, onClick: this.listItemClicked.bind(this, address), __source: {
                            fileName: _jsxFileName,
                            lineNumber: 168
                        }
                    }, _react2.default.createElement(_semanticUiReact.Image, { avatar: true, src: user.avatarUrl ? user.avatarUrl : 'static/images/user.png', __source: {
                            fileName: _jsxFileName,
                            lineNumber: 169
                        }
                    }), _react2.default.createElement(_semanticUiReact.List.Content, {
                        __source: {
                            fileName: _jsxFileName,
                            lineNumber: 170
                        }
                    }, _react2.default.createElement(_semanticUiReact.List.Header, {
                        __source: {
                            fileName: _jsxFileName,
                            lineNumber: 171
                        }
                    }, user.name ? user.name : address.substr(0, 10)), address.substr(0, 14) + '...'), rightAlignedContent));
                }
                htmlContent = _react2.default.createElement(_semanticUiReact.List, { selection: true, verticalAlign: 'middle', __source: {
                        fileName: _jsxFileName,
                        lineNumber: 180
                    }
                }, contactItems);
            }

            return _react2.default.createElement(_semanticUiReact.Container, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 184
                }
            }, _react2.default.createElement(_AddContactModal2.default, { contractManager: this.contractManager, storageManager: this.account.storageManager, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 185
                }
            }), _react2.default.createElement(_semanticUiReact.Header, { as: 'h2', style: { float: 'left' }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 186
                }
            }, 'Contact list'), _react2.default.createElement('div', { style: { height: height - 40, overflow: 'auto', float: 'left', width: '100%' }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 187
                }
            }, htmlContent));
        }
    }]);

    return ContactList;
}(_react.Component);

exports.default = ContactList;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZXdzL0NvbnRhY3RMaXN0LmpzIl0sIm5hbWVzIjpbIkNvbXBvbmVudCIsIkxpc3QiLCJJbWFnZSIsIkxvYWRlciIsIkRpbW1lciIsIkJ1dHRvbiIsIkljb24iLCJIZWFkZXIiLCJQb3B1cCIsIklucHV0IiwiTWVzc2FnZSIsImFwcERpc3BhdGNoZXIiLCJDb25zdGFudCIsIkNvbmZpZyIsIkFkZENvbnRhY3RNb2RhbCIsIkNvbnRhaW5lciIsIkNvbnRhY3RMaXN0IiwicHJvcHMiLCJhZGRDb250YWN0Q2xpY2tlZCIsImFjY291bnQiLCJpc0pvaW5lZCIsImRpc3BhdGNoIiwiYWN0aW9uIiwiQUNUSU9OIiwiQUREX0NPTlRBQ1QiLCJFVkVOVCIsIkVOQ09VTlRFUkVEX0VSUk9SIiwibWVzc2FnZSIsIkFQUF9OQU1FIiwiYWNjZXB0Q29udGFjdFJlcXVlc3QiLCJldmVudCIsImFkZHJlc3MiLCJ0YXJnZXQiLCJ2YWx1ZSIsInN0b3JhZ2VNYW5hZ2VyIiwiY29udGFjdHMiLCJpc0FjY2VwdGluZyIsImZvcmNlVXBkYXRlIiwiY29udHJhY3RNYW5hZ2VyIiwicmVzdWx0RXZlbnQiLCJPTl9SRUpFQ1RFRCIsIk9OX0VSUk9SIiwiT05fUkVDRUlQVCIsInJlbGF0aW9uc2hpcCIsIlJlbGF0aW9uc2hpcCIsIkNvbm5lY3RlZCIsInNldFN0YXRlIiwiY29udGFjdEFkZHJlc3NlcyIsImxpc3RJdGVtQ2xpY2tlZCIsIlNFTEVDVF9DT05UQUNUIiwiZGF0YSIsInNlbGVjdGVkQWRkcmVzcyIsInN0YXRlIiwicmF3Q29udGFjdEFycmF5IiwiY29udGFjdEFycmF5IiwiaSIsImxlbmd0aCIsInRvTG93ZXJDYXNlIiwid2luZG93IiwibG9jYWxTdG9yYWdlIiwiRU5WIiwiQ29udHJhY3RBZGRyZXNzIiwicHVzaCIsInVwZGF0ZUNvbnRhY3QiLCJyZWdpc3RlciIsInBheWxvYWQiLCJDT05UQUNUX0xJU1RfVVBEQVRFRCIsImhlaWdodCIsImh0bWxDb250ZW50IiwiY29udGFjdEl0ZW1zIiwidW5kZWZpbmVkIiwidXNlciIsImFkZHJlc3NFeHBsb3JlclVybCIsIkV4cGxvcmVyVXJsIiwicmlnaHRBbGlnbmVkQ29udGVudCIsIk5vUmVsYXRpb24iLCJSZXF1ZXN0ZWQiLCJiaW5kIiwiYXZhdGFyVXJsIiwibmFtZSIsInN1YnN0ciIsImZsb2F0Iiwib3ZlcmZsb3ciLCJ3aWR0aCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSUEsQUFDSSxBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQTs7QUFFSixBQUFPLEFBQW1COzs7O0FBQzFCLEFBQU8sQUFBYzs7OztBQUNyQixBQUFPLEFBQVk7Ozs7QUFDbkIsQUFBTyxBQUFxQixBQUM1QixBQUFTOzs7Ozs7O0FBcEJUO0FBQ0EsQUFFQSxBQUFROztJLEFBbUJGO3lDQUNGOzt5QkFBQSxBQUFZLE9BQU87NENBQUE7O29KQUFBLEFBQ1Q7O2NBRFMsQUFpQ25CLG9CQUFvQixZQUFNLEFBQ3RCO2dCQUFJLE1BQUEsQUFBSyxRQUFULEFBQWlCLFVBQVUsQUFDdkI7d0NBQUEsQUFBYzs0QkFDRixtQkFBQSxBQUFTLE9BRHJCLEFBQXVCLEFBQ0ssQUFFL0I7QUFIMEIsQUFDbkI7QUFGUixtQkFJTyxBQUNIO3dDQUFBLEFBQWM7NEJBQ0YsbUJBQUEsQUFBUyxNQURFLEFBQ0ksQUFDdkI7NkJBQVMsaUJBQWUsbUJBQWYsQUFBd0IsV0FGckMsQUFBdUIsQUFFdUIsQUFFakQ7QUFKMEIsQUFDbkI7QUFJWDtBQTVDa0I7O2NBQUEsQUE4Q25CLHVCQUF1QixVQUFBLEFBQUMsT0FBVSxBQUM5QjtnQkFBSSxNQUFBLEFBQUssUUFBVCxBQUFpQixVQUFVLEFBQ3ZCO29CQUFJLFVBQVUsTUFBQSxBQUFNLE9BQXBCLEFBQTJCLEFBRTNCOztzQkFBQSxBQUFLLFFBQUwsQUFBYSxlQUFiLEFBQTRCLFNBQTVCLEFBQXFDLFNBQXJDLEFBQThDLGNBQTlDLEFBQTRELEFBQzVEO3NCQUFBLEFB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aUJBQUEsRUFBZixBQUFlLEFBQ2xCO0FBRUQ7O21DQUNJLEFBQUM7OzhCQUFEO2dDQUFBLEFBQ0k7QUFESjtBQUFBLGFBQUEsa0JBQ0ksQUFBQywyQ0FBZ0IsaUJBQWlCLEtBQWxDLEFBQXVDLGlCQUFpQixnQkFBZ0IsS0FBQSxBQUFLLFFBQTdFLEFBQXFGOzhCQUFyRjtnQ0FESixBQUNJLEFBQ0E7QUFEQTtnQ0FDQSxBQUFDLHlDQUFPLElBQVIsQUFBVyxNQUFLLE9BQU8sRUFBQyxPQUF4QixBQUF1QixBQUFROzhCQUEvQjtnQ0FBQTtBQUFBO2VBRkosQUFFSSxBQUNBLGlDQUFBLGNBQUEsU0FBSyxPQUFPLEVBQUMsUUFBUSxTQUFULEFBQWtCLElBQUksVUFBdEIsQUFBZ0MsUUFBUSxPQUF4QyxBQUErQyxRQUFRLE9BQW5FLEFBQVksQUFBNkQ7OEJBQXpFO2dDQUFBLEFBQ0s7QUFETDtlQUpSLEFBQ0ksQUFHSSxBQUtYOzs7OztBQUdMLEEsQUE1SzBCOztrQkE0SzFCLEFBQWUiLCJmaWxlIjoiQ29udGFjdExpc3QuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3RoZWJlL0Rlc2t0b3AvYmxvY2tjaGFpbi1wcm9qIn0=

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "/Users/thebe/Desktop/blockchain-proj/views/ContactList.js"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/Users/thebe/Desktop/blockchain-proj/views/ContactList.js"); } } })();

/***/ }),

/***/ 804:
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

var _HeaderMenu = __webpack_require__(1056);

var _HeaderMenu2 = _interopRequireDefault(_HeaderMenu);

var _Login = __webpack_require__(1327);

var _Login2 = _interopRequireDefault(_Login);

var _web = __webpack_require__(420);

var _web2 = _interopRequireDefault(_web);

var _EnterPrivateKeyModal = __webpack_require__(1328);

var _EnterPrivateKeyModal2 = _interopRequireDefault(_EnterPrivateKeyModal);

var _UpdateProfileModal = __webpack_require__(1329);

var _UpdateProfileModal2 = _interopRequireDefault(_UpdateProfileModal);

var _GuideModal = __webpack_require__(1330);

var _GuideModal2 = _interopRequireDefault(_GuideModal);

var _head = __webpack_require__(192);

var _head2 = _interopRequireDefault(_head);

var _AppManager = __webpack_require__(1331);

var _AppManager2 = _interopRequireDefault(_AppManager);

var _ContactList = __webpack_require__(802);

var _ContactList2 = _interopRequireDefault(_ContactList);

var _Chat = __webpack_require__(1355);

var _Chat2 = _interopRequireDefault(_Chat);

var _ErrorModal = __webpack_require__(1356);

var _ErrorModal2 = _interopRequireDefault(_ErrorModal);

var _SettingsModal = __webpack_require__(1357);

var _SettingsModal2 = _interopRequireDefault(_SettingsModal);

var _TransactionModal = __webpack_require__(1358);

var _TransactionModal2 = _interopRequireDefault(_TransactionModal);

var _Footer = __webpack_require__(1359);

var _Footer2 = _interopRequireDefault(_Footer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/thebe/Desktop/blockchain-proj/pages/index.js?entry';
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

            var listHeight = this.state.height - 250;

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
                }, 'Ethereum Messenger'), _react2.default.createElement('link', { rel: 'shortcut icon', href: '/static/images/favicon.ico', __source: {
                        fileName: _jsxFileName,
                        lineNumber: 73
                    }
                })), _react2.default.createElement(_HeaderMenu2.default, { account: account, transactionDispatcher: transactionDispatcher, __source: {
                        fileName: _jsxFileName,
                        lineNumber: 76
                    }
                }), _react2.default.createElement(_ErrorModal2.default, {
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 77
                    }
                }), _react2.default.createElement(_TransactionModal2.default, { dispatcher: transactionDispatcher, __source: {
                        fileName: _jsxFileName,
                        lineNumber: 78
                    }
                }), _react2.default.createElement(_semanticUiReact.Grid, { column: 2, style: { paddingTop: 10 }, __source: {
                        fileName: _jsxFileName,
                        lineNumber: 79
                    }
                }, _react2.default.createElement(_semanticUiReact.Grid.Row, { stretched: true, __source: {
                        fileName: _jsxFileName,
                        lineNumber: 80
                    }
                }, _react2.default.createElement(_semanticUiReact.Grid.Column, { width: 6, style: { height: listHeight + "px", float: 'left' }, __source: {
                        fileName: _jsxFileName,
                        lineNumber: 81
                    }
                }, _react2.default.createElement(_ContactList2.default, { height: listHeight, account: account, contractManager: contractManager, __source: {
                        fileName: _jsxFileName,
                        lineNumber: 82
                    }
                })), _react2.default.createElement(_semanticUiReact.Grid.Column, { width: 10, style: { height: listHeight + "px", overflow: 'auto', float: 'left' }, __source: {
                        fileName: _jsxFileName,
                        lineNumber: 84
                    }
                }, _react2.default.createElement(_Chat2.default, { height: listHeight, account: account, contractManager: contractManager, __source: {
                        fileName: _jsxFileName,
                        lineNumber: 85
                    }
                })))));
            } else {
                return _react2.default.createElement(_Login2.default, { account: account, storageManager: this.app.storageManager, contractManager: contractManager, __source: {
                        fileName: _jsxFileName,
                        lineNumber: 94
                    }
                });
            }
        }
    }]);

    return Index;
}(_react.Component);

exports.default = Index;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL2luZGV4LmpzIl0sIm5hbWVzIjpbIkNvbXBvbmVudCIsIkJ1dHRvbiIsIkNvbnRhaW5lciIsIkxpc3QiLCJJbWFnZSIsIkdyaWQiLCJNZXNzYWdlIiwiUmFpbCIsIlN0aWNreSIsIklucHV0IiwiU2VnbWVudCIsIkhlYWRlck1lbnUiLCJMb2dpbiIsIndlYjMiLCJQcml2YXRlS2V5TW9kYWwiLCJVcGRhdGVQcm9maWxlTW9kYWwiLCJHdWlkZU1vZGFsIiwiSGVhZCIsIkFwcE1hbmFnZXIiLCJDb250YWN0TGlzdCIsIkNoYXQiLCJFcnJvck1vZGFsIiwiU2V0dGluZ3NNb2RhbCIsIlRyYW5zYWN0aW9uTW9kYWwiLCJGb290ZXIiLCJJbmRleCIsInByb3BzIiwic3RhdGUiLCJ3aWR0aCIsImhlaWdodCIsImNvbnRhY3RMaXN0IiwibWVzc2FnZXMiLCJzZWxlY3RlZENvbnRhY3QiLCJ1cGRhdGVXaW5kb3dEaW1lbnNpb25zIiwiYmluZCIsImFwcCIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJpbml0aWFsaXplIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInNldFN0YXRlIiwiaW5uZXJXaWR0aCIsImlubmVySGVpZ2h0IiwiYWNjb3VudCIsImNvbnRyYWN0TWFuYWdlciIsInRyYW5zYWN0aW9uRGlzcGF0Y2hlciIsImdldFRyYW5zYWN0aW9uRGlzcGF0Y2hlciIsImxpc3RIZWlnaHQiLCJjb25zb2xlIiwibG9nIiwiaXNKb2luZWQiLCJzdG9yYWdlTWFuYWdlciIsInJlbG9hZCIsInBhZGRpbmdUb3AiLCJmbG9hdCIsIm92ZXJmbG93Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJQSxBQUNJLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBOztBQUVKLEFBQU8sQUFBZ0I7Ozs7QUFDdkIsQUFBTyxBQUFXOzs7O0FBQ2xCLEFBQU8sQUFBVTs7OztBQUNqQixBQUFPLEFBQXFC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QUEsQUFBTSxVQUFPLE9BQWIsQUFBb0IsSUFBSSxPQUFPLEVBQUMsUUFBUSxhQUFULEFBQXNCLE1BQU0sVUFBNUIsQUFBc0MsUUFBUSxPQUE3RSxBQUErQixBQUFxRDtrQ0FBcEY7b0NBQUEsQUFDSTtBQURKO21DQUNJLEFBQUMsZ0NBQUssUUFBTixBQUFjLFlBQVksU0FBMUIsQUFBbUMsU0FBUyxpQkFBNUMsQUFBNkQ7a0NBQTdEO29DQWhCcEIsQUFDSSxBQVNJLEFBQ0ksQUFJSSxBQUNJLEFBTXZCO0FBTnVCOztBQW5CeEIsbUJBeUJLLEFBQ0Q7dUNBRUksQUFBQyxpQ0FBTSxTQUFQLEFBQWdCLFNBQVMsZ0JBQWdCLEtBQUEsQUFBSyxJQUE5QyxBQUFrRCxnQkFBZ0IsaUJBQWxFLEFBQW1GO2tDQUFuRjtvQ0FGSixBQUVJLEFBSVA7QUFKTztpQkFBQTtBQU1YOzs7OztBLEFBcEVlLEFBdUVwQjs7a0JBQUEsQUFBZSIsImZpbGUiOiJpbmRleC5qcz9lbnRyeSIsInNvdXJjZVJvb3QiOiIvVXNlcnMvdGhlYmUvRGVza3RvcC9ibG9ja2NoYWluLXByb2oifQ==

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "/Users/thebe/Desktop/blockchain-proj/pages/index.js"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/Users/thebe/Desktop/blockchain-proj/pages/index.js"); } } })();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNS45ZTE4OWNiMWY4OTBmNDQyY2RiOC5ob3QtdXBkYXRlLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vdmlld3MvSGVhZGVyTWVudS5qcz9kYjYyZGRkIiwid2VicGFjazovLy8uL3ZpZXdzL0xvZ2luLmpzPzA5NDNhOWYiLCJ3ZWJwYWNrOi8vLy4vdmlld3MvQ2hhdC5qcz8wOTQzYTlmIiwid2VicGFjazovLy8uL3ZpZXdzL0NvbnRhY3RMaXN0LmpzPzIyNmY2ZGUiLCJ3ZWJwYWNrOi8vLy4vcGFnZXM/MjI2ZjZkZSJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTggTmd1eWVuIFZ1IE5oYXQgTWluaFxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIE1JVCBzb2Z0d2FyZSBsaWNlbnNlLCBzZWUgdGhlIGFjY29tcGFueWluZyBmaWxlIExJQ0VOU0VcblxuaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7XG4gICAgTWVudSxcbiAgICBDb250YWluZXIsXG4gICAgQnV0dG9uLFxuICAgIExhYmVsLFxuICAgIExvYWRlcixcbiAgICBMaXN0LFxuICAgIEltYWdlLFxuICAgIEljb24sXG4gICAgRHJvcGRvd25cbn0gZnJvbSAnc2VtYW50aWMtdWktcmVhY3QnO1xuaW1wb3J0IEhlYWQgZnJvbSAnbmV4dC9oZWFkJztcbmltcG9ydCB3ZWIzIGZyb20gJy4uL2V0aGVyZXVtL3dlYjMnO1xuaW1wb3J0IENvbnN0YW50IGZyb20gJy4uL3N1cHBvcnQvQ29uc3RhbnQnO1xuaW1wb3J0IENvbmZpZyBmcm9tICcuLi9zdXBwb3J0L0NvbmZpZyc7XG5pbXBvcnQgYXBwRGlzcGF0Y2hlciBmcm9tICcuLi9jb3JlL0FwcERpc3BhdGNoZXInO1xuXG5jbGFzcyBIZWFkZXJNZW51IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMuYWNjb3VudCA9IHByb3BzLmFjY291bnQ7XG4gICAgICAgIHRoaXMuY29udHJhY3RNYW5hZ2VyID0gcHJvcHMuY29udHJhY3RNYW5hZ2VyO1xuICAgICAgICB0aGlzLnRyYW5zYWN0aW9uRGlzcGF0Y2hlciA9IHByb3BzLnRyYW5zYWN0aW9uRGlzcGF0Y2hlcjtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHthZGRyZXNzOiBcIlwiLCBiYWxhbmNlOiBcIlwiLCBuYW1lOiBcIlwiLCBcbiAgICAgICAgICAgIGF2YXRhclVybDogXCJcIiwgaXNMb2FkaW5nOiB0cnVlLCBpc0pvaW5CdXR0b25Mb2FkaW5nOiBmYWxzZSwgXG4gICAgICAgICAgICBpc0pvaW5lZDogZmFsc2UsIG51bVBlbmRpbmdUeDogMH07XG4gICAgICAgIHRoaXMucmVsb2FkQ291bnQgPSAwO1xuICAgIH1cblxuICAgIGNsZWFyQWxsRGF0YSA9ICgpID0+IHtcbiAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5jbGVhcigpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICBpZiAodGhpcy5hY2NvdW50KSB7XG4gICAgICAgICAgICB0aGlzLmdldEFjY291bnRJbmZvKCk7XG4gICAgICAgICAgICBhcHBEaXNwYXRjaGVyLnJlZ2lzdGVyKChwYXlsb2FkKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHBheWxvYWQuYWN0aW9uID09IENvbnN0YW50LkVWRU5ULkFDQ09VTlRfQkFMQU5DRV9VUERBVEVEKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2JhbGFuY2U6IHRoaXMuYWNjb3VudC5iYWxhbmNlfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwYXlsb2FkLmFjdGlvbiA9PSBDb25zdGFudC5FVkVOVC5BQ0NPVU5UX0lORk9fVVBEQVRFRCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtuYW1lOiBwYXlsb2FkLnByb2ZpbGUubmFtZSwgYXZhdGFyVXJsOiBwYXlsb2FkLnByb2ZpbGUuYXZhdGFyVXJsLCBpc0pvaW5lZDogcGF5bG9hZC5wcm9maWxlLmlzSm9pbmVkfSk7XG4gICAgICAgICAgICAgICAgfSBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy50cmFuc2FjdGlvbkRpc3BhdGNoZXIucmVnaXN0ZXIoKHBheWxvYWQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocGF5bG9hZC5hY3Rpb24gPT0gQ29uc3RhbnQuRVZFTlQuUEVORElOR19UUkFOU0FDVElPTl9VUERBVEVEKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe251bVBlbmRpbmdUeDogcGF5bG9hZC5udW1QZW5kaW5nVHh9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldEFjY291bnRJbmZvID0gKCkgPT4ge1xuICAgICAgICB2YXIgYWRkcmVzcyA9IHRoaXMuYWNjb3VudC5nZXRBZGRyZXNzKCk7XG4gICAgICAgIGlmIChhZGRyZXNzKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHthZGRyZXNzOiBhZGRyZXNzLCBiYWxhbmNlOiB0aGlzLmFjY291bnQuYmFsYW5jZSwgaXNMb2FkaW5nOiBmYWxzZSwgaXNKb2luZWQ6IHRoaXMuYWNjb3VudC5pc0pvaW5lZH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMucmVsb2FkQ291bnQgPT0gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2lzTG9hZGluZzogZmFsc2V9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWxvYWRDb3VudCsrO1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQodGhpcy5nZXRBY2NvdW50SW5mbywgODAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUxvZ291dCA9IChldmVudCwgZGF0YSkgPT4ge1xuICAgICAgICB0aGlzLmNsZWFyQWxsRGF0YSgpO1xuICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7IFxuICAgIH1cblxuICAgIHJlbW92ZU5ldHdvcmtEZXBlbmRlbnREYXRhID0gKCkgPT4ge1xuICAgICAgICB0aGlzLmFjY291bnQuc3RvcmFnZU1hbmFnZXIucmVtb3ZlTmV0d29ya0RlcGVuZGVudERhdGEoKTtcbiAgICB9XG5cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgdmFyIGFjY291bnRJbmZvID0gKDxkaXY+PC9kaXY+KTtcblxuICAgICAgICBpZiAodGhpcy5hY2NvdW50KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZS5pc0xvYWRpbmcgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZS5hZGRyZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBhZGRyZXNzRXhwbG9yZXJVcmwgPSBDb25maWcuRU5WLkV4cGxvcmVyVXJsICsgJ2FkZHJlc3MvJyArIHRoaXMuc3RhdGUuYWRkcmVzcztcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRyb3Bkb3duVHJpZ2dlcjtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZS5hdmF0YXJVcmwpIHsgXG4gICAgICAgICAgICAgICAgICAgICAgICBkcm9wZG93blRyaWdnZXIgPSAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+PEltYWdlIHNyYz17dGhpcy5zdGF0ZS5hdmF0YXJVcmx9IGF2YXRhci8+eyB0aGlzLnN0YXRlLm5hbWUgPyB0aGlzLnN0YXRlLm5hbWUgOiB0aGlzLnN0YXRlLmFkZHJlc3Muc3Vic3RyKDAsMTApfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkcm9wZG93blRyaWdnZXIgPSAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+PEljb24gbmFtZT0ndXNlcicgc2l6ZT0nbGFyZ2UnLz57IHRoaXMuc3RhdGUubmFtZSA/IHRoaXMuc3RhdGUubmFtZSA6IHRoaXMuc3RhdGUuYWRkcmVzcy5zdWJzdHIoMCwxMCl9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGxvZ091dEJ1dHRvbjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYWNjb3VudC5pc0pvaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9nT3V0QnV0dG9uID0gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxCdXR0b24gY29sb3I9J3JlZCcgb25DbGljaz17dGhpcy5oYW5kbGVMb2dvdXR9ID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEljb24gbmFtZT0nbG9nIG91dCcvPkxvZyBvdXQ8L0J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyB2YXIgcGVuZGluZ1R4SXRlbTtcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgKHRoaXMuc3RhdGUubnVtUGVuZGluZ1R4ID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgcGVuZGluZ1R4SXRlbSA9IChcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICA8TGFiZWwgYXM9J2EnIGNvbG9yPSd5ZWxsb3cnIGhyZWY9e2FkZHJlc3NFeHBsb3JlclVybH0gdGFyZ2V0PSdfYmxhbmsnPlxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICA8SWNvbiBuYW1lPSdzcGlubmVyJyBsb2FkaW5nLz5cbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAge3RoaXMuc3RhdGUubnVtUGVuZGluZ1R4fSBwZW5kaW5nIHR4XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgPC9MYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICk7XG4gICAgICAgICAgICAgICAgICAgIC8vIH1cblxuICAgICAgICAgICAgICAgICAgICBhY2NvdW50SW5mbyA9IChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxNZW51Lkl0ZW0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPExpc3Q+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPExpc3QuSXRlbT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQWRkcmVzczogPExhYmVsIGFzPSdhJyBocmVmPXthZGRyZXNzRXhwbG9yZXJVcmx9IHRhcmdldD0nX2JsYW5rJyBjb2xvcj0nZ3JlZW4nPnt0aGlzLnN0YXRlLmFkZHJlc3N9PC9MYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0xpc3QuSXRlbT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TGlzdC5JdGVtPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBCYWxhbmNlOiA8TGFiZWwgYXM9J2EnIGhyZWY9e2FkZHJlc3NFeHBsb3JlclVybH0gdGFyZ2V0PSdfYmxhbmsnIGNvbG9yPSdncmVlbic+e3BhcnNlRmxvYXQod2ViMy51dGlscy5mcm9tV2VpKFwiXCIgK3RoaXMuc3RhdGUuYmFsYW5jZSwgJ2V0aGVyJykpLnRvRml4ZWQoOCkgKyAnIEVUSCcgfTwvTGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsvKiB7cGVuZGluZ1R4SXRlbX0gKi99XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9MaXN0Lkl0ZW0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9MaXN0PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9NZW51Lkl0ZW0+XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSBcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYWNjb3VudEluZm8gPSAoPExvYWRlciBpbnZlcnRlZCBhY3RpdmUgLz4pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxNZW51IGZsdWlkIGNvbG9yPSdibHVlJyBpbnZlcnRlZD5cbiAgICAgICAgICAgICAgICA8SGVhZD5cbiAgICAgICAgICAgICAgICA8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgaHJlZj1cIi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL3NlbWFudGljLXVpLzIuMi4xMi9zZW1hbnRpYy5taW4uY3NzXCI+PC9saW5rPlxuICAgICAgICAgICAgICAgIDwvSGVhZD5cbiAgICAgICAgICAgICAgICA8TWVudS5JdGVtPlxuICAgICAgICAgICAgICAgICAgICA8YSBocmVmPScvJz48SW1hZ2Ugc3JjPSdzdGF0aWMvaW1hZ2VzL2V0aGVyZXVtLW1lc3Nlbmdlci1sb2dvLnBuZycgaGVpZ2h0PXs1MH0gLz48L2E+XG4gICAgICAgICAgICAgICAgPC9NZW51Lkl0ZW0+XG4gICAgICAgICAgICAgICAge3RoaXMuYWNjb3VudCA/IGFjY291bnRJbmZvOiAoPGRpdj48L2Rpdj4pfVxuICAgICAgICAgICAgICAgIDxNZW51Lk1lbnUgcG9zaXRpb249J3JpZ2h0Jz5cbiAgICAgICAgICAgICAgICAgICAgPE1lbnUuSXRlbT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtsb2dPdXRCdXR0b259XG4gICAgICAgICAgICAgICAgICAgIDwvTWVudS5JdGVtPlxuICAgICAgICAgICAgICAgIDwvTWVudS5NZW51PlxuICAgICAgICAgICAgPC9NZW51PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgSGVhZGVyTWVudTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi92aWV3cy9IZWFkZXJNZW51LmpzIiwiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7XG4gICAgSW5wdXQsXG4gICAgTWVzc2FnZSxcbiAgICBDb250YWluZXIsXG4gICAgQnV0dG9uLFxuICAgIEhlYWRlcixcbiAgICBJY29uLFxuICAgIEltYWdlXG59IGZyb20gJ3NlbWFudGljLXVpLXJlYWN0JztcbmltcG9ydCBIZWFkIGZyb20gJ25leHQvaGVhZCc7XG5pbXBvcnQgd2ViMyBmcm9tICcuLi9ldGhlcmV1bS93ZWIzJztcbmltcG9ydCBDb25zdGFudCBmcm9tICcuLi9zdXBwb3J0L0NvbnN0YW50JztcbmltcG9ydCBDb25maWcgZnJvbSAnLi4vc3VwcG9ydC9Db25maWcnO1xuXG5jbGFzcyBMb2dpbiBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLmFjY291bnQgPSBwcm9wcy5hY2NvdW50O1xuICAgICAgICB0aGlzLmNvbnRyYWN0TWFuYWdlciA9IHByb3BzLmNvbnRyYWN0TWFuYWdlcjtcbiAgICAgICAgdGhpcy5zdG9yYWdlTWFuYWdlciA9IHByb3BzLnN0b3JhZ2VNYW5hZ2VyO1xuICAgICAgICB0aGlzLnN0YXRlID0ge3ByaXZhdGVLZXk6IFwiXCIsIGVycm9yTWVzc2FnZTpcIlwiLCB0cmFuc2l0aW9uTWVzc2FnZTpcIlwiLCB3YWxsZXRBZGRyZXNzOiBcIlwifTtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5zdG9yYWdlTWFuYWdlci5yZWxvYWQpO1xuICAgICAgICBcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgLy8gYXdhaXQgdGhpcy5zbGVlcCgyMDAwKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5zdGF0ZSk7XG4gICAgICAgIC8vIGlmKHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInJlbG9hZFwiKT4gMCl7XG4gICAgICAgIC8vIH1cbiAgICAgICAgY29uc29sZS5sb2cod2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwicmVsb2FkXCIpKVxuICAgICAgICBcblxuICAgIH1cblxuICAgIGhhbmRsZUJhY2sgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3dhbGxldEFkZHJlc3MgOiBcIlwiLCBlcnJvck1lc3NhZ2U6IFwiXCIsIHRyYW5zaXRpb25NZXNzYWdlOiBcIlwifSk7XG4gICAgfVxuXG4gICAgc2xlZXAobXMpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4gc2V0VGltZW91dChyZXNvbHZlLCBtcykpO1xuICAgIH1cblxuICAgIGhhbmRsZUpvaW4gPSBhc3luYyAoKSA9PntcbiAgICAgICAgYXdhaXQgdGhpcy5hY2NvdW50LnN0b3JlUHJpdmF0ZUtleSh0aGlzLnN0YXRlLnByaXZhdGVLZXkpO1xuICAgICAgICBhd2FpdCB0aGlzLmNvbnRyYWN0TWFuYWdlci5nZXRDb250cmFjdCgpO1xuICAgICAgICB2YXIgeCA9IGF3YWl0IHRoaXMuY29udHJhY3RNYW5hZ2VyLmdldEpvaW5lZEFkZHJlc3MoKTtcbiAgICAgICAgaWYgKHg9PTApe1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJKb2luaW5nIHRoZSBuZXR3b3JrXCIpO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dHJhbnNpdGlvbk1lc3NhZ2U6IFwiSm9pbmluZy4uLlwifSlcbiAgICAgICAgICAgIHZhciBwdWJsaWNLZXlCdWZmZXIgPSB0aGlzLmFjY291bnQuZ2V0UHVibGljS2V5QnVmZmVyKCk7XG4gICAgICAgICAgICAvLyBhd2FpdCB0aGlzLmNvbnRyYWN0TWFuYWdlci5jaGVja0FjYygnMHgnK3RoaXMuc3RhdGUud2FsbGV0QWRkcmVzcyk7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmNvbnRyYWN0TWFuYWdlci5qb2luQ29udHJhY3QocHVibGljS2V5QnVmZmVyLCAgIChyZXN1bHRFdmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHRFdmVudCA9PSBDb25zdGFudC5FVkVOVC5PTl9SRUpFQ1RFRCB8fCByZXN1bHRFdmVudCA9PSBDb25zdGFudC5FVkVOVC5PTl9FUlJPUikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt0cmFuc2l0aW9uTWVzc2FnZTogXCJcIiwgZXJyb3JNZXNzYWdlOiBcIlNvbWV0aGluZyB3ZW50IHdyb25nLCByZWZyZXNoaW5nIGluIDMgc2Vjb25kcy4uLlwifSlcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXN1bHRFdmVudCA9PSBDb25zdGFudC5FVkVOVC5PTl9SRUNFSVBUKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3RyYW5zaXRpb25NZXNzYWdlOiBcIlN1Y2Nlc3MhXCJ9KVxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnN0b3JhZ2VNYW5hZ2VyLnJlbG9hZCA9IDE7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuc3RvcmFnZU1hbmFnZXIucmVsb2FkKTtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnNldFN0YXRlKHt0cmFuc2l0aW9uTWVzc2FnZTogXCJTdWNjZXNzISBDbGljayBoZXJlIHRvIGVudGVyIGlmIG5vdCBkaXJlY3RlZCBhdXRvbWF0aWNhbGx5LlwifSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgLy8gdGhpcy5zZXRTdGF0ZSh7dHJhbnNpdGlvbk1lc3NhZ2U6IFwiU3VjY2VzcyEgQ2xpY2sgaGVyZSB0byBlbnRlciBpZiBub3QgZGlyZWN0ZWQgYXV0b21hdGljYWxseS5cIn0pO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJleGlzdGluZ1wiKTtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgXG4gICAgfVxuXG5cbiAgICBuZXh0Q2xpY2tlZCA9IGFzeW5jIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5zdGF0ZS5wcml2YXRlS2V5KVxuICAgICAgICB2YXIgd2FsbGV0QWRkcmVzcyA9IGF3YWl0IHRoaXMuYWNjb3VudC5jaGVja1ByaXZhdGVLZXkodGhpcy5zdGF0ZS5wcml2YXRlS2V5KTtcbiAgICAgICAgaWYgKHdhbGxldEFkZHJlc3MpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic3VjZXNzXCIsIHdhbGxldEFkZHJlc3MpO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZXJyb3JNZXNzYWdlIDogXCJcIn0pO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7d2FsbGV0QWRkcmVzcyA6IHdhbGxldEFkZHJlc3N9KTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJHVVVTTFwiKTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2Vycm9yTWVzc2FnZSA6IFwiUHJpdmF0ZSBLZXkgaXMgaW52YWxpZFwifSk7XG4gICAgICAgICAgICAvLyB0aGlzLnNldFN0YXRlKHtlcnJvck1lc3NhZ2U6IFwiSW52YWxpZCBwcml2YXRlIGtleVwifSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nbGFuZGluZ1BhZ2UnID5cbiAgICAgICAgICAgIDxIZWFkPlxuICAgICAgICAgICAgICAgIDx0aXRsZT5FdGhlcmV1bSBNZXNzZW5nZXI8L3RpdGxlPlxuICAgICAgICAgICAgICAgIDxsaW5rIHJlbD1cInNob3J0Y3V0IGljb25cIiBocmVmPVwiL3N0YXRpYy9pbWFnZXMvZmF2aWNvbi5pY29cIiAvPlxuICAgICAgICAgICAgICAgIDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiBocmVmPVwiLy9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvc2VtYW50aWMtdWkvMi4yLjEyL3NlbWFudGljLm1pbi5jc3NcIj48L2xpbms+XG4gICAgICAgICAgICA8L0hlYWQ+XG4gICAgICAgICAgICAgICAgPEltYWdlIHNyYz0nc3RhdGljL2ltYWdlcy9ldGhlcmV1bS1tZXNzZW5nZXItbG9nby5wbmcnIGhlaWdodD17MTUwfSBzdHlsZT17eyBtYXJnaW5Ub3A6IFwiMS41dndcIn19IC8+XG4gICAgICAgICAgICAgICAgPGJyLz5cbiAgICAgICAgICAgICAgICA8aDEgY2xhc3NOYW1lPVwidGl0bGVcIiAgZm9udC1mYW1pbHk9XCJUYWhvbWFcIj5cbiAgICAgICAgICAgICAgICBXZWxjb21lIHRvIEV0aGVyZXVtIE1lc3NlbmdlciEgXG4gICAgICAgICAgICAgICAgPC9oMT5cblxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImRlc2NyaXB0aW9uXCI+XG4gICAgICAgICAgICAgICAgU2VuZCBhIHByaXZhdGUgbWVzc2FnZSB0byB5b3VyIGZyaWVuZHMgdGhhdCB3aWxsIG5ldmVyIGJlIGxvc3QhXG4gICAgICAgICAgICAgICAgPC9wPlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2xvZ2luQm94Jz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nbG9naW5UaXRsZSc+IFNpZ24gaW4gdG8gQmxvY2stRm9yZXZlcjwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdsb2dpbkZvcm0nID4gXG4gICAgICAgICAgICAgICAgPGZvcm0gaGlkZGVuPXt0aGlzLnN0YXRlLndhbGxldEFkZHJlc3MgIT0gXCJcIn0gY2xhc3NOYW1lPSdsb2dpbkZvcm0nIG9uU3VibWl0PXsoZSk9PnRoaXMubmV4dENsaWNrZWQoZSl9PiBcbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT0nbG9naW5GaWVsZHMnIGh0bWxGb3I9XCJwcmlLZXlcIj5FbnRlciBQcml2YXRlIEtleTo8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdmFsdWU9e3RoaXMuc3RhdGUucHJpdmF0ZUtleX0gY2xhc3NOYW1lPSdsb2dpbkZpZWxkcyBwcml2YXRlS2V5JyB0eXBlPVwidGV4dFwiIG9uQ2hhbmdlPXsoZSkgPT4gdGhpcy5zZXRTdGF0ZSh7cHJpdmF0ZUtleTogZS50YXJnZXQudmFsdWV9KX0gIHJlcXVpcmVkIC8+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPSdsb2dpbkZpZWxkcyBzdWJtaXRCdXR0b24nIHR5cGU9XCJzdWJtaXRcIj5OZXh0PC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICAgICAgICAgICAgICAgICAgey8qIDxJbnB1dCBmbHVpZCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS5wcml2YXRlS2V5fSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHRoaXMuc2V0U3RhdGUoe3ByaXZhdGVLZXk6IGUudGFyZ2V0LnZhbHVlfSl9IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbj17eyBjb2xvcjogJ2JsdWUnLCBsYWJlbFBvc2l0aW9uOiAncmlnaHQnLCBpY29uOiAnYW5nbGUgcmlnaHQnLCBjb250ZW50OiAnTmV4dCcsIG9uQ2xpY2s6IChlKT0+dGhpcy5uZXh0Q2xpY2tlZChlKX19Lz4gKi99XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICA8TWVzc2FnZSBlcnJvciBoZWFkZXI9e3RoaXMuc3RhdGUuZXJyb3JNZXNzYWdlfSBoaWRkZW49e3RoaXMuc3RhdGUuZXJyb3JNZXNzYWdlID09IFwiXCJ9Lz5cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIDxNZXNzYWdlIHRleHQgcG9zaXRpdmUgaGlkZGVuPXt0aGlzLnN0YXRlLndhbGxldEFkZHJlc3MgPT0gXCJcIn0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8TWVzc2FnZS5IZWFkZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pbiBFdGhlcmV1bSBNZXNzZW5nZXIgYXMgPGJyLz4gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPENvbnRhaW5lciBmbHVpZCB0ZXh0QWxpZ249J2NlbnRlcicgc3R5bGU9e3sgbWFyZ2luVG9wOiBcIjF2d1wifX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxiIHN0eWxlPXt7Zm9udFNpemU6IFwiMnZ3XCJ9fT4weHt0aGlzLnN0YXRlLndhbGxldEFkZHJlc3N9PC9iPjxici8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsvKiA8QnV0dG9uIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQmFja30gY29sb3IgPSAnYmx1ZScgIHN0eWxlPXt7IG1hcmdpblRvcDogXCIxdndcIn19ID5CYWNrPC9CdXR0b24+ICovfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9e3RoaXMuaGFuZGxlSm9pbn0gY29sb3IgPSAnb3JhbmdlJyBzdHlsZT17eyBtYXJnaW5Ub3A6IFwiMC41dndcIn19PkpvaW48L0J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvTWVzc2FnZS5IZWFkZXI+XG4gICAgICAgICAgICAgICAgICAgIDwvTWVzc2FnZT5cbiAgICAgICAgICAgICAgICAgICAgPENvbnRhaW5lciB0ZXh0QWxpZ249XCJjZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPE1lc3NhZ2UgIGNvbXBhY3QgcG9zaXRpdmUgaGlkZGVuPXt0aGlzLnN0YXRlLnRyYW5zaXRpb25NZXNzYWdlICE9IFwiSm9pbmluZy4uLlwifT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8SWNvbiBzaXplPSdiaWcnIG5hbWU9J2NpcmNsZSBub3RjaGVkJyBsb2FkaW5nIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGIgc3R5bGU9e3tmb250U2l6ZTogXCIyLjV2d1wifX0+e3RoaXMuc3RhdGUudHJhbnNpdGlvbk1lc3NhZ2V9PC9iPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIHN0eWxlPXt7Zm9udFNpemU6IFwiMXZ3XCJ9fT5QbGVhc2UgbWFudWFsbHkgcmVmcmVzaCBwYWdlIGlmIHVuYWJsZSB0byBsb2dnaW5nIGluIGR1cmluZyBmaXJzdCB0aW1lPC9wPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8L01lc3NhZ2U+XG4gICAgICAgICAgICAgICAgICAgICAgICA8TWVzc2FnZSAgY29tcGFjdCBwb3NpdGl2ZSBoaWRkZW49e3RoaXMuc3RhdGUudHJhbnNpdGlvbk1lc3NhZ2UgIT0gXCJTdWNjZXNzIVwifT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8SWNvbiBzaXplPSdiaWcnIG5hbWU9J2NoZWNrJyAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxiIHN0eWxlPXt7Zm9udFNpemU6IFwiMi41dndcIn19Pnt0aGlzLnN0YXRlLnRyYW5zaXRpb25NZXNzYWdlfTwvYj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBzdHlsZT17e2ZvbnRTaXplOiBcIjF2d1wifX0+UGxlYXNlIG1hbnVhbGx5IHJlZnJlc2ggcGFnZSBpZiB1bmFibGUgdG8gbG9nZ2luZyBpbiBkdXJpbmcgZmlyc3QgdGltZTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvTWVzc2FnZT5cbiAgICAgICAgICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgICAgIDwvQ29udGFpbmVyPlxuXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIFxuICAgIDxzdHlsZSBqc3g+e2BcbiAgICAgICAgLmhlYWRlcntcbiAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzAwNzBmMztcbiAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIC5jb250YWN0TGlzdEhlYWRlcntcbiAgICAgICAgICBmb250LXdlaWdodDogNTAwO1xuICAgICAgICB9XG5cbiAgICAgICAgLmNvbnRhY3RJbWd7XG4gICAgICAgICAgd2lkdGg6IDEwJTtcbiAgICAgICAgICBoZWlnaHQ6IGF1dG87XG4gICAgICAgICAgdHJhbnNpdGlvbjogZmlsdGVyIDAuMTVzIGVhc2VcbiAgICAgICAgfVxuXG4gICAgICAgIC5jb250YWN0TmFtZXtcbiAgICAgICAgICBmb250LXNpemU6IDAuOHJlbTtcbiAgICAgICAgICBtYXJnaW4tbGVmdDogMC4ycmVtO1xuICAgICAgICAgIHRyYW5zaXRpb246IGNvbG9yIDAuMTVzIGVhc2VcbiAgICAgICAgfVxuXG4gICAgICAgIC5jb250YWN0Qm94e1xuICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgb3ZlcmZsb3c6IHNjcm9sbDtcbiAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICAgIG1hcmdpbi10b3A6IDAuNXJlbTtcbiAgICAgICAgICBib3JkZXI6IDJweCB0cmFuc3BhcmVudCBzb2xpZDtcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICAgICAgICAgIHBhZGRpbmc6IDAuNXJlbTtcbiAgICAgICAgICB0cmFuc2l0aW9uOiBib3JkZXItY29sb3IgMC4xNXMgZWFzZSwgYmFja2dyb3VuZC1jb2xvciAwLjE1cyBlYXNlO1xuICAgICAgICB9XG5cbiAgICAgICAgLmNvbnRhY3RCb3ggOmhvdmVyLFxuICAgICAgICAuY29udGFjdEJveCA6Zm9jdXMsXG4gICAgICAgIC5jb250YWN0Qm94IDphY3RpdmUge1xuICAgICAgICAgIGJvcmRlci1jb2xvcjogIzAwNzBmMztcbiAgICAgICAgICBcbiAgICAgICAgfVxuXG4gICAgICAgIC5jb250YWN0QWRke1xuICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgbWFyZ2luLXRvcDogMXJlbTtcbiAgICAgICAgICBtYXJnaW4tYm90dG9tOiAwLjVyZW07XG4gICAgICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgICAgICB9XG5cbiAgICAgICAgLnB1YmxpY0tleXtcbiAgICAgICAgICB3aWR0aDogNjAlXG4gICAgICAgIH1cblxuICAgICAgICAuYm9keXtcbiAgICAgICAgICBkaXNwbGF5OiBncmlkO1xuICAgICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDNmcjtcbiAgICAgICAgICBncmlkLXRlbXBsYXRlLWFyZWFzOiBcImNvbnRhY3RMaXN0IG1lc3NhZ2VCb2R5XCI7XG4gICAgICAgICAgZ2FwOiAxNXB4O1xuICAgICAgICAgIHBhZGRpbmc6IDAgMXJlbTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLmJvZHlDb2xze1xuICAgICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNlYWVhZWE7XG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgICAgICAgICBwYWRkaW5nOiAwLjVyZW07XG4gICAgICAgIH1cblxuICAgICAgICAubWVzc2FnZVJvd3N7XG4gICAgICAgICAgYm9yZGVyOiAxcHggc29saWQgI2VhZWFlYTtcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICAgICAgICAgIHBhZGRpbmc6IDAuNXJlbTtcbiAgICAgICAgfVxuXG4gICAgICAgIC5jb250YWN0TGlzdHtcbiAgICAgICAgICBncmlkLWFyZWE6IGNvbnRhY3RMaXN0O1xuICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgfVxuXG4gICAgICAgIC5tZXNzYWdlQm9keXtcbiAgICAgICAgICBncmlkLWFyZWE6IG1lc3NhZ2VCb2R5O1xuICAgICAgICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgICAgICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiAzZnIgMWZyO1xuICAgICAgICAgIGdyaWQtdGVtcGxhdGUtYXJlYXM6IFwiY29udmVyc2F0aW9uXCIgXCJtZXNzYWdlXCI7XG4gICAgICAgICAgZ2FwOiAxNXB4O1xuICAgICAgICB9XG5cbiAgICAgICAgLmNvbnZlcnNhdGlvbntcbiAgICAgICAgICBncmlkLWFyZWE6IGNvbnZlcnNhdGlvbjtcbiAgICAgICAgfVxuXG4gICAgICAgIC5tZXNzYWdle1xuICAgICAgICAgIG1heC1oZWlnaHQ6IDEwdmg7XG4gICAgICAgICAgZ3JpZC1hcmVhOiBtZXNzYWdlO1xuICAgICAgICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiA3ZnIgMWZyO1xuICAgICAgICAgIGdhcDogMTVweDtcbiAgICAgICAgfVxuXG4gICAgICAgIC5oZWFkZXJJdGVtc3tcbiAgICAgICAgICBtYXJnaW46IDFyZW07XG4gICAgICAgICAgY29sb3I6IHdoaXRlO1xuICAgICAgICAgIHBhZGRpbmc6IDAuNXJlbTtcbiAgICAgICAgfVxuXG4gICAgICAgIC5iYWxhbmNle1xuICAgICAgICAgIGJhY2tncm91bmQ6IG9yYW5nZTtcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiAxMHB4XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC5jb250YWluZXIge1xuICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgICBcbiAgICAgICAgfVxuXG4gICAgICAgIC5sb2dpbkJveHtcbiAgICAgICAgICB3aWR0aDogNjAlO1xuICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgICBwYWRkaW5nOiAyLjVyZW0gMC41cmVtO1xuICAgICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgICAgYm9yZGVyOiAxcHggc29saWQgI2VhZWFlYTtcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICAgICAgICAgIHRyYW5zaXRpb246IGNvbG9yIDAuMTVzIGVhc2UsIGJvcmRlci1jb2xvciAwLjE1cyBlYXNlO1xuICAgICAgICB9XG5cbiAgICAgICAgLmxvZ2luRm9ybXtcbiAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICAgICAgcGFkZGluZzogMC41cmVtIDEuOHJlbTtcbiAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICAgIHdpZHRoOiAxMDAlXG4gICAgICAgIH1cblxuICAgICAgICAubG9naW5GaWVsZHN7XG4gICAgICAgICAgbWFyZ2luLXRvcDogMC41cmVtXG4gICAgICAgIH1cblxuICAgICAgICAucHJpdmF0ZUtleXtcbiAgICAgICAgICBwYWRkaW5nOiAwLjVyZW0gMC41cmVtO1xuICAgICAgICAgIHdpZHRoOiAxMDAlXG4gICAgICAgIH1cblxuICAgICAgICAuc3VibWl0QnV0dG9ue1xuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgICAgIHdpZHRoOiA0MCU7XG4gICAgICAgICAgYWxpZ24tc2VsZjogY2VudGVyO1xuICAgICAgICAgIHBhZGRpbmc6IDAuNXJlbSAwLjVyZW07XG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgICAgICAgICBmb250LXdlaWdodDogNzAwO1xuICAgICAgICAgIHRyYW5zaXRpb246IGNvbG9yIDAuMTVzIGVhc2UsIGJvcmRlci1jb2xvciAwLjE1cyBlYXNlO1xuICAgICAgICB9XG4gICAgICBcbiAgICAgICAgLnN1Ym1pdEJ1dHRvbiA6aG92ZXIsXG4gICAgICAgIC5zdWJtaXRCdXR0b24gOmZvY3VzLFxuICAgICAgICAuc3VibWl0QnV0dG9uIDphY3RpdmUge1xuICAgICAgICAgIGJvcmRlci1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICAgICAgY29sb3I6ICAjZmZmO1xuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IzAwNzBmMyA7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC5hZGRCdXR0b257XG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICAgICAgYWxpZ24tc2VsZjogY2VudGVyO1xuICAgICAgICAgIHBhZGRpbmc6IDAuNXJlbSAwLjVyZW07XG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgICAgICAgICBmb250LXdlaWdodDogNzAwO1xuICAgICAgICAgIHRyYW5zaXRpb246IGNvbG9yIDAuMTVzIGVhc2UsIGJvcmRlci1jb2xvciAwLjE1cyBlYXNlO1xuICAgICAgICB9XG4gICAgICBcbiAgICAgICAgLmFkZEJ1dHRvbiA6aG92ZXIsXG4gICAgICAgIC5hZGRCdXR0b24gOmZvY3VzLFxuICAgICAgICAuYWRkQnV0dG9uIDphY3RpdmUge1xuICAgICAgICAgIGJvcmRlci1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICAgICAgY29sb3I6ICAjZmZmO1xuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IzAwNzBmMyA7XG4gICAgICAgIH1cblxuICAgICAgICAuc2VuZEJ1dHRvbntcbiAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgICAgICBhbGlnbi1zZWxmOiBjZW50ZXI7XG4gICAgICAgICAgcGFkZGluZzogMC41cmVtIDAuNXJlbTtcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICAgICAgICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gICAgICAgICAgdHJhbnNpdGlvbjogY29sb3IgMC4xNXMgZWFzZSwgYm9yZGVyLWNvbG9yIDAuMTVzIGVhc2U7XG4gICAgICAgIH1cbiAgICAgIFxuICAgICAgICAuc2VuZEJ1dHRvbiA6aG92ZXIsXG4gICAgICAgIC5zZW5kQnV0dG9uIDpmb2N1cyxcbiAgICAgICAgLnNlbmRCdXR0b24gOmFjdGl2ZSB7XG4gICAgICAgICAgYm9yZGVyLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgICAgICBjb2xvcjogICNmZmY7XG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjojMDA3MGYzIDtcbiAgICAgICAgfVxuXG4gICAgICAgIC5sYW5kaW5nUGFnZSB7XG4gICAgICAgICAgZmxleDogMTtcbiAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvb3RlciB7XG4gICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgaGVpZ2h0OiAxMDBweDtcbiAgICAgICAgICBib3JkZXItdG9wOiAxcHggc29saWQgI2VhZWFlYTtcbiAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIH1cblxuICAgICAgICBmb290ZXIgaW1nIHtcbiAgICAgICAgICBtYXJnaW4tbGVmdDogMC41cmVtO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9vdGVyIGEge1xuICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGEge1xuICAgICAgICAgIGNvbG9yOiBpbmhlcml0O1xuICAgICAgICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC50aXRsZSBhIHtcbiAgICAgICAgICBjb2xvcjogIzAwNzBmMztcbiAgICAgICAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gICAgICAgIH1cblxuICAgICAgICAudGl0bGUgYTpob3ZlcixcbiAgICAgICAgLnRpdGxlIGE6Zm9jdXMsXG4gICAgICAgIC50aXRsZSBhOmFjdGl2ZSB7XG4gICAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XG4gICAgICAgIH1cblxuICAgICAgICAudGl0bGUge1xuICAgICAgICAgIG1hcmdpbjogMDtcbiAgICAgICAgICBsaW5lLWhlaWdodDogMS4xNTtcbiAgICAgICAgICBmb250LXNpemU6IDNyZW07XG4gICAgICAgIH1cbiAgICAgICAgLmxvZ2luVGl0bGUge1xuICAgICAgICAgIG1hcmdpbjogMDtcbiAgICAgICAgICBsaW5lLWhlaWdodDogMS4xNTtcbiAgICAgICAgICBmb250LXNpemU6IDJyZW07XG4gICAgICAgICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICAgICAgICBjb2xvcjogIzAwNzBmMztcbiAgICAgICAgfVxuXG4gICAgICAgIC50aXRsZSxcbiAgICAgICAgLmRlc2NyaXB0aW9uIHtcbiAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICAgIH1cblxuICAgICAgICAuZGVzY3JpcHRpb24ge1xuICAgICAgICAgIGxpbmUtaGVpZ2h0OiAxLjU7XG4gICAgICAgICAgZm9udC1zaXplOiAxLjVyZW07XG4gICAgICAgIH1cblxuICAgICAgICAubG9naW5Cb3g6aG92ZXIsXG4gICAgICAgIC5sb2dpbkJveDpmb2N1cyxcbiAgICAgICAgLmxvZ2luQm94OmFjdGl2ZSB7XG4gICAgICAgICAgXG4gICAgICAgICAgYm9yZGVyLWNvbG9yOiAjMDA3MGYzO1xuICAgICAgICB9XG5cbiAgICAgICAgLmNhcmQgaDMge1xuICAgICAgICAgIG1hcmdpbjogMCAwIDFyZW0gMDtcbiAgICAgICAgICBmb250LXNpemU6IDEuNXJlbTtcbiAgICAgICAgfVxuXG4gICAgICAgIC5jYXJkIHAge1xuICAgICAgICAgIG1hcmdpbjogMDtcbiAgICAgICAgICBmb250LXNpemU6IDEuMjVyZW07XG4gICAgICAgICAgbGluZS1oZWlnaHQ6IDEuNTtcbiAgICAgICAgfVxuXG4gICAgICAgIC5sb2dvIHtcbiAgICAgICAgICBoZWlnaHQ6IDFlbTtcbiAgICAgICAgfVxuXG4gICAgICAgIEBtZWRpYSAobWF4LXdpZHRoOiA2MDBweCkge1xuICAgICAgICAgIC5ncmlkIHtcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIGB9PC9zdHlsZT5cblxuICAgICAgPHN0eWxlIGpzeCBnbG9iYWw+e2BcbiAgICAgICAgaHRtbCxcbiAgICAgICAgYm9keSB7XG4gICAgICAgICAgcGFkZGluZzogMDtcbiAgICAgICAgICBtYXJnaW46IDA7XG4gICAgICAgICAgZm9udC1mYW1pbHk6IC1hcHBsZS1zeXN0ZW0sIEJsaW5rTWFjU3lzdGVtRm9udCwgU2Vnb2UgVUksIFJvYm90byxcbiAgICAgICAgICAgIE94eWdlbiwgVWJ1bnR1LCBDYW50YXJlbGwsIEZpcmEgU2FucywgRHJvaWQgU2FucywgSGVsdmV0aWNhIE5ldWUsXG4gICAgICAgICAgICBzYW5zLXNlcmlmO1xuICAgICAgICB9XG5cbiAgICAgICAgKiB7XG4gICAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgICAgfVxuICAgICAgYH08L3N0eWxlPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgTG9naW47XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdmlld3MvTG9naW4uanMiLCIvLyBDb3B5cmlnaHQgKGMpIDIwMTggTmd1eWVuIFZ1IE5oYXQgTWluaFxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIE1JVCBzb2Z0d2FyZSBsaWNlbnNlLCBzZWUgdGhlIGFjY29tcGFueWluZyBmaWxlIExJQ0VOU0VcblxuaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7XG4gICAgU2VnbWVudCxcbiAgICBJbnB1dCxcbiAgICBCdXR0b24sXG4gICAgTWVzc2FnZSxcbiAgICBJY29uLFxuICAgIEhlYWRlcixcbiAgICBMYWJlbFxufSBmcm9tICdzZW1hbnRpYy11aS1yZWFjdCc7XG5pbXBvcnQgYXBwRGlzcGF0Y2hlciBmcm9tICcuLi9jb3JlL0FwcERpc3BhdGNoZXInO1xuaW1wb3J0IENvbnN0YW50IGZyb20gJy4uL3N1cHBvcnQvQ29uc3RhbnQnO1xuaW1wb3J0IENvbmZpZyBmcm9tICcuLi9zdXBwb3J0L0NvbmZpZyc7XG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vc3VwcG9ydC9VdGlscyc7XG5cbmNsYXNzIENoYXQgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgdGhpcy5hY2NvdW50ID0gcHJvcHMuYWNjb3VudDtcbiAgICAgICAgdGhpcy5jb250cmFjdE1hbmFnZXIgPSBwcm9wcy5jb250cmFjdE1hbmFnZXI7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7YWRkcmVzczogXCJcIiwgbWVzc2FnZXM6IFtdLCBwdWJsaWNLZXk6IFwiXCJ9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMuc2Nyb2xsVG9Cb3R0b20oKTtcbiAgICAgIH1cbiAgICBcbiAgICAgIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICAgICAgdGhpcy5zY3JvbGxUb0JvdHRvbSgpO1xuICAgICAgfVxuICAgIFxuICAgICAgc2Nyb2xsVG9Cb3R0b20oKSB7XG4gICAgICAgICAgaWYgKHRoaXMubGFzdE9iamVjdEFuY2hvciAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxhc3RPYmplY3RBbmNob3Iuc2Nyb2xsSW50b1ZpZXcoeyBiZWhhdmlvcjogJ3Ntb290aCcgfSk7XG4gICAgICAgICAgfVxuICAgICAgfSAgICBcblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICBhcHBEaXNwYXRjaGVyLnJlZ2lzdGVyKChwYXlsb2FkKSA9PiB7XG4gICAgICAgICAgICBpZiAocGF5bG9hZC5hY3Rpb24gPT0gQ29uc3RhbnQuQUNUSU9OLlNFTEVDVF9DT05UQUNUKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7YWRkcmVzczogcGF5bG9hZC5kYXRhLCBcbiAgICAgICAgICAgICAgICAgICAgcHVibGljS2V5OiB0aGlzLmFjY291bnQuc3RvcmFnZU1hbmFnZXIuY29udGFjdHNbcGF5bG9hZC5kYXRhXS5wdWJsaWNLZXksXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2VzOiB0aGlzLmFjY291bnQuc3RvcmFnZU1hbmFnZXIuY29udGFjdHNbcGF5bG9hZC5kYXRhXS5tZXNzYWdlc30pO1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuYWNjb3VudC5zdG9yYWdlTWFuYWdlci5jb250YWN0c1twYXlsb2FkLmRhdGFdLnB1YmxpY0tleSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc3RhdGUuYWRkcmVzcyAhPSBcIlwiICYmIHBheWxvYWQuYWN0aW9uID09IENvbnN0YW50LkVWRU5ULk1FU1NBR0VTX1VQREFURUQpIHtcbiAgICAgICAgICAgICAgICBpZiAocGF5bG9hZC5kYXRhID09IHVuZGVmaW5lZCB8fCBwYXlsb2FkLmRhdGEgPT0gdGhpcy5zdGF0ZS5hZGRyZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe21lc3NhZ2VzOiB0aGlzLmFjY291bnQuc3RvcmFnZU1hbmFnZXIuY29udGFjdHNbdGhpcy5zdGF0ZS5hZGRyZXNzXS5tZXNzYWdlc30pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG5cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBzZW5kTWVzc2FnZSA9IChtZXNzYWdlKSA9PiB7XG4gICAgICAgIHRoaXMuY29udHJhY3RNYW5hZ2VyLnNlbmRNZXNzYWdlKHRoaXMuc3RhdGUuYWRkcmVzcywgXG4gICAgICAgICAgICB0aGlzLmFjY291bnQuc3RvcmFnZU1hbmFnZXIuY29udGFjdHNbdGhpcy5zdGF0ZS5hZGRyZXNzXS5wdWJsaWNLZXksIFxuICAgICAgICAgICAgbWVzc2FnZSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7aGVpZ2h0fSA9IHRoaXMucHJvcHM7XG5cbiAgICAgICAgY29uc3QgeyBwdWJsaWNLZXksIG1lc3NhZ2VzIH0gPSB0aGlzLnN0YXRlO1xuXG4gICAgICAgIHZhciBtZXNzYWdlSXRlbXMgPSBbXTtcbiAgICAgICAgXG4gICAgICAgIGlmIChwdWJsaWNLZXkpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuc3RhdGUpO1xuICAgICAgICAgICAgaWYgKG1lc3NhZ2VzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpPTA7aTxtZXNzYWdlcy5sZW5ndGg7aSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBkZWNyeXB0ZWRNZXNzYWdlO1xuICAgICAgICAgICAgICAgICAgICBpZiAobWVzc2FnZXNbaV0uZW5jcnlwdGlvbiA9PSAnYWVzMjU2Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVjcnlwdGVkTWVzc2FnZSA9IHV0aWxzLmRlY3J5cHQobWVzc2FnZXNbaV0ubWVzc2FnZS5zdWJzdHIoMiksIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWNjb3VudC5jb21wdXRlU2VjcmV0KEJ1ZmZlci5mcm9tKHB1YmxpY0tleSwgJ2hleCcpKSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWNyeXB0ZWRNZXNzYWdlID0gbWVzc2FnZXNbaV0ubWVzc2FnZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHZhciBsYXN0T2JqZWN0QW5jaG9yID0gKDxzcGFuIC8+KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgPT0gbWVzc2FnZXMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdE9iamVjdEFuY2hvciA9ICg8c3BhbiByZWY9e2xhc3RPYmplY3RBbmNob3IgPT4geyB0aGlzLmxhc3RPYmplY3RBbmNob3IgPSBsYXN0T2JqZWN0QW5jaG9yOyB9fSAvPik7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB2YXIgZXhwbG9yZXJVcmwgPSBDb25maWcuRU5WLkV4cGxvcmVyVXJsICsgJ3R4LycgKyBtZXNzYWdlc1tpXS50eEhhc2g7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlc1tpXS5pc01pbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlc1tpXS5zdGF0dXMgPT0gQ29uc3RhbnQuU0VOVF9TVEFUVVMuUEVORElORykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2VJdGVtcy5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBhbGlnbj0ncmlnaHQnIGtleT17J21zZ18nICsgaX0+PExhYmVsIHBvaW50aW5nPSdyaWdodCcgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcz0nc3Bhbicgc2l6ZT0nbGFyZ2UnIGNvbG9yPSd0ZWFsJyBzdHlsZT17e2ZvbnRXZWlnaHQ6ICcxMDAnLCBsaW5lSGVpZ2h0OiAnMS41J319PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEljb24gbmFtZT0nY2lyY2xlIG5vdGNoZWQnIGxvYWRpbmcgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtkZWNyeXB0ZWRNZXNzYWdlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2xhc3RPYmplY3RBbmNob3J9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvTGFiZWw+PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG1lc3NhZ2VzW2ldLnN0YXR1cyA9PSBDb25zdGFudC5TRU5UX1NUQVRVUy5GQUlMRUQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlSXRlbXMucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgYWxpZ249J3JpZ2h0JyBrZXk9eydtc2dfJyArIGl9PjxMYWJlbCBwb2ludGluZz0ncmlnaHQnIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXM9J3NwYW4nIGtleT17J21zZ18nICsgaX0gc2l6ZT0nbGFyZ2UnIGNvbG9yPSdibHVlJyBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7Zm9udFdlaWdodDogJzEwMCcsIGxpbmVIZWlnaHQ6ICcxLjUnfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8SWNvbiBuYW1lPSd3YXJuaW5nIHNpZ24nLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtkZWNyeXB0ZWRNZXNzYWdlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2xhc3RPYmplY3RBbmNob3J9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvTGFiZWw+PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2VJdGVtcy5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBhbGlnbj0ncmlnaHQnIGtleT17J21zZ18nICsgaX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPXtleHBsb3JlclVybH0gdGFyZ2V0PSdfYmxhbmsnPjxMYWJlbCBwb2ludGluZz0ncmlnaHQnIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzPSdzcGFuJyBrZXk9eydtc2dfJyArIGl9IHNpemU9J2xhcmdlJyBjb2xvcj0ndGVhbCcgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tmb250OiAnMTAnLCBsaW5lSGVpZ2h0OiAnMS41JyB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7ZGVjcnlwdGVkTWVzc2FnZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7bGFzdE9iamVjdEFuY2hvcn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9MYWJlbD48L2E+PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlSXRlbXMucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBrZXk9eydtc2dfJyArIGl9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPXtleHBsb3JlclVybH0gdGFyZ2V0PSdfYmxhbmsnPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPExhYmVsIHBvaW50aW5nPSdsZWZ0JyBhcz0nc3BhbicgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9eydtc2dfJyArIGl9IHNpemU9J2xhcmdlJyBzdHlsZT17e2ZvbnQ6ICcxMDAnLCBsaW5lSGVpZ2h0OiAnMS41J319PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2RlY3J5cHRlZE1lc3NhZ2V9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7bGFzdE9iamVjdEFuY2hvcn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0xhYmVsPjwvYT48L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlSXRlbXMucHVzaChcbiAgICAgICAgICAgICAgICAgICAgPEhlYWRlciBhcz0naDInIHRleHRBbGlnbj0nY2VudGVyJyBrZXk9J25vX21lc3NhZ2VzJz5ObyBtZXNzYWdlczwvSGVhZGVyPlxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7d2lkdGg6ICcxMDAlJ319PlxuICAgICAgICAgICAgICAgIDxTZWdtZW50IHN0eWxlPXt7aGVpZ2h0OiAoaGVpZ2h0LTkwKSArIFwicHhcIiwgd2lkdGg6ICcxMDAlJywgb3ZlcmZsb3c6ICdhdXRvJ319PlxuICAgICAgICAgICAgICAgICAgICB7bWVzc2FnZUl0ZW1zfVxuICAgICAgICAgICAgICAgIDwvU2VnbWVudD5cbiAgICAgICAgICAgICAgICA8U2VnbWVudD5cbiAgICAgICAgICAgICAgICAgICAgPFRleHRJbnB1dCBkaXNhYmxlZD17dGhpcy5zdGF0ZS5hZGRyZXNzID8gZmFsc2UgOiB0cnVlfSBvblNlbmQ9e3RoaXMuc2VuZE1lc3NhZ2V9Lz5cbiAgICAgICAgICAgICAgICA8L1NlZ21lbnQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNsYXNzIFRleHRJbnB1dCBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLnN0YXRlID0ge2Rpc2FibGVkOiBwcm9wcy5kaXNhYmxlZCwgY29udGVudDogXCJcIn07XG4gICAgICAgIHRoaXMub25TZW5kID0gcHJvcHMub25TZW5kO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMocHJvcHMpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZGlzYWJsZWQ6IHByb3BzLmRpc2FibGVkfSk7XG4gICAgfVxuXG4gICAgc2VuZE1lc3NhZ2VDbGlja2VkKCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5jb250ZW50KSB7XG4gICAgICAgICAgICB0aGlzLm9uU2VuZCh0aGlzLnN0YXRlLmNvbnRlbnQpO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Y29udGVudDogXCJcIn0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPElucHV0IGZsdWlkIGRpc2FibGVkPXt0aGlzLnN0YXRlLmRpc2FibGVkfVxuICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLmNvbnRlbnR9IFxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gdGhpcy5zZXRTdGF0ZSh7Y29udGVudDogZS50YXJnZXQudmFsdWV9KX0gXG4gICAgICAgICAgICAgICAgYWN0aW9uPXt7IGNvbG9yOiAnYmx1ZScsIGxhYmVsUG9zaXRpb246ICdyaWdodCcsIGljb246ICdzZW5kJywgY29udGVudDogJ1NlbmQnLCBvbkNsaWNrOiAoZSk9PnRoaXMuc2VuZE1lc3NhZ2VDbGlja2VkKCl9fS8+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDaGF0O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3ZpZXdzL0NoYXQuanMiLCIvLyBDb3B5cmlnaHQgKGMpIDIwMTggTmd1eWVuIFZ1IE5oYXQgTWluaFxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIE1JVCBzb2Z0d2FyZSBsaWNlbnNlLCBzZWUgdGhlIGFjY29tcGFueWluZyBmaWxlIExJQ0VOU0VcblxuaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7XG4gICAgTGlzdCxcbiAgICBJbWFnZSxcbiAgICBMb2FkZXIsXG4gICAgRGltbWVyLFxuICAgIEJ1dHRvbixcbiAgICBJY29uLFxuICAgIEhlYWRlcixcbiAgICBQb3B1cCxcbiAgICBJbnB1dCxcbiAgICBNZXNzYWdlLFxufSBmcm9tICdzZW1hbnRpYy11aS1yZWFjdCc7XG5pbXBvcnQgYXBwRGlzcGF0Y2hlciBmcm9tICcuLi9jb3JlL0FwcERpc3BhdGNoZXInO1xuaW1wb3J0IENvbnN0YW50IGZyb20gJy4uL3N1cHBvcnQvQ29uc3RhbnQnO1xuaW1wb3J0IENvbmZpZyBmcm9tICcuLi9zdXBwb3J0L0NvbmZpZyc7XG5pbXBvcnQgQWRkQ29udGFjdE1vZGFsIGZyb20gJy4vbW9kYWxzL0FkZENvbnRhY3RNb2RhbCc7XG5pbXBvcnQgeyBDb250YWluZXIgfSBmcm9tICdzZW1hbnRpYy11aS1yZWFjdCc7XG5cbmNsYXNzIENvbnRhY3RMaXN0IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMuYWNjb3VudCA9IHByb3BzLmFjY291bnQ7XG4gICAgICAgIHRoaXMuY29udHJhY3RNYW5hZ2VyID0gcHJvcHMuY29udHJhY3RNYW5hZ2VyO1xuICAgICAgICB0aGlzLnN0YXRlID0ge2NvbnRhY3RBZGRyZXNzZXM6IFtdLCBpc0FjY2VwdGluZzogW10sIHNlbGVjdGVkQWRkcmVzczogXCJcIn07XG4gICAgfVxuXG4gICAgXG5cbiAgICB1cGRhdGVDb250YWN0KCl7XG4gICAgICAgIHZhciByYXdDb250YWN0QXJyYXkgPSB0aGlzLmFjY291bnQuc3RvcmFnZU1hbmFnZXIuY29udGFjdEFkZHJlc3NlcztcbiAgICAgICAgdmFyIGNvbnRhY3RBcnJheSA9IFtdO1xuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgcmF3Q29udGFjdEFycmF5Lmxlbmd0aDsgaSsrICl7XG4gICAgICAgICAgICBpZihyYXdDb250YWN0QXJyYXlbaV0udG9Mb3dlckNhc2UoKSAhPSB3aW5kb3cubG9jYWxTdG9yYWdlLmFkZHJlc3MgJiYgcmF3Q29udGFjdEFycmF5W2ldICE9IENvbmZpZy5FTlYuQ29udHJhY3RBZGRyZXNzKXtcbiAgICAgICAgICAgICAgICBjb250YWN0QXJyYXkucHVzaChyYXdDb250YWN0QXJyYXlbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuYWNjb3VudC5zdG9yYWdlTWFuYWdlci5jb250YWN0QWRkcmVzc2VzKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Y29udGFjdEFkZHJlc3NlczogY29udGFjdEFycmF5fSk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIC8vIHRoaXMuc2V0U3RhdGUoe2NvbnRhY3RBZGRyZXNzZXM6IHRoaXMuYWNjb3VudC5zdG9yYWdlTWFuYWdlci5jb250YWN0QWRkcmVzc2VzfSk7XG4gICAgICAgIHRoaXMudXBkYXRlQ29udGFjdCgpO1xuICAgICAgICBcbiAgICAgICAgYXBwRGlzcGF0Y2hlci5yZWdpc3RlcigocGF5bG9hZCkgPT4ge1xuICAgICAgICAgICAgaWYgKHBheWxvYWQuYWN0aW9uID09IENvbnN0YW50LkVWRU5ULkNPTlRBQ1RfTElTVF9VUERBVEVEKSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUNvbnRhY3QoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBhZGRDb250YWN0Q2xpY2tlZCA9ICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuYWNjb3VudC5pc0pvaW5lZCkge1xuICAgICAgICAgICAgYXBwRGlzcGF0Y2hlci5kaXNwYXRjaCh7XG4gICAgICAgICAgICAgICAgYWN0aW9uOiBDb25zdGFudC5BQ1RJT04uQUREX0NPTlRBQ1RcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYXBwRGlzcGF0Y2hlci5kaXNwYXRjaCh7XG4gICAgICAgICAgICAgICAgYWN0aW9uOiBDb25zdGFudC5FVkVOVC5FTkNPVU5URVJFRF9FUlJPUixcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiAnUGxlYXNlIGpvaW4gJytDb25zdGFudC5BUFBfTkFNRSsnIGZpcnN0IGJ5IGNsaWNrIG9uIHRoZSBcXCdKb2luXFwnIGJ1dHRvbiBvbiB0aGUgdG9wLXJpZ2h0IGNvcm5lcidcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWNjZXB0Q29udGFjdFJlcXVlc3QgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuYWNjb3VudC5pc0pvaW5lZCkge1xuICAgICAgICAgICAgdmFyIGFkZHJlc3MgPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuYWNjb3VudC5zdG9yYWdlTWFuYWdlci5jb250YWN0c1thZGRyZXNzXS5pc0FjY2VwdGluZyA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmZvcmNlVXBkYXRlKCk7XG5cbiAgICAgICAgICAgIHRoaXMuY29udHJhY3RNYW5hZ2VyLmFjY2VwdENvbnRhY3RSZXF1ZXN0KGFkZHJlc3MsIChyZXN1bHRFdmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHRFdmVudCA9PSBDb25zdGFudC5FVkVOVC5PTl9SRUpFQ1RFRCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjY291bnQuc3RvcmFnZU1hbmFnZXIuY29udGFjdHNbYWRkcmVzc10uaXNBY2NlcHRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mb3JjZVVwZGF0ZSgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzdWx0RXZlbnQgPT0gQ29uc3RhbnQuRVZFTlQuT05fRVJST1IpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY2NvdW50LnN0b3JhZ2VNYW5hZ2VyLmNvbnRhY3RzW2FkZHJlc3NdLmlzQWNjZXB0aW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZm9yY2VVcGRhdGUoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlc3VsdEV2ZW50ID09IENvbnN0YW50LkVWRU5ULk9OX1JFQ0VJUFQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY2NvdW50LnN0b3JhZ2VNYW5hZ2VyLmNvbnRhY3RzW2FkZHJlc3NdLmlzQWNjZXB0aW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWNjb3VudC5zdG9yYWdlTWFuYWdlci5jb250YWN0c1thZGRyZXNzXS5yZWxhdGlvbnNoaXAgPSBDb25zdGFudC5SZWxhdGlvbnNoaXAuQ29ubmVjdGVkO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtjb250YWN0QWRkcmVzc2VzOiB0aGlzLmFjY291bnQuc3RvcmFnZU1hbmFnZXIuY29udGFjdEFkZHJlc3Nlc30pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYXBwRGlzcGF0Y2hlci5kaXNwYXRjaCh7XG4gICAgICAgICAgICAgICAgYWN0aW9uOiBDb25zdGFudC5FVkVOVC5FTkNPVU5URVJFRF9FUlJPUixcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiAnUGxlYXNlIGpvaW4gJytDb25zdGFudC5BUFBfTkFNRSsnIGZpcnN0IGJ5IGNsaWNrIG9uIHRoZSBcXCdKb2luXFwnIGJ1dHRvbiBvbiB0aGUgdG9wLXJpZ2h0IGNvcm5lcidcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbGlzdEl0ZW1DbGlja2VkID0gKGFkZHJlc3MsIGV2ZW50KSA9PiB7XG4gICAgICAgIGFwcERpc3BhdGNoZXIuZGlzcGF0Y2goe1xuICAgICAgICAgICAgYWN0aW9uOiBDb25zdGFudC5BQ1RJT04uU0VMRUNUX0NPTlRBQ1QsXG4gICAgICAgICAgICBkYXRhOiBhZGRyZXNzXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtzZWxlY3RlZEFkZHJlc3M6IGFkZHJlc3N9KTtcblxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgeyBjb250YWN0QWRkcmVzc2VzIH0gPSB0aGlzLnN0YXRlO1xuICAgICAgICBjb25zdCB7aGVpZ2h0fSA9IHRoaXMucHJvcHM7XG4gICAgICAgIHZhciBodG1sQ29udGVudDtcblxuICAgICAgICB2YXIgY29udGFjdEl0ZW1zID0gW107XG5cbiAgICAgICAgaWYgKGNvbnRhY3RBZGRyZXNzZXMgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBodG1sQ29udGVudCA9ICg8ZGl2PjwvZGl2Pik7XG4gICAgICAgIH0gZWxzZSBcbiAgICAgICAgaWYgKGNvbnRhY3RBZGRyZXNzZXMubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgIGNvbnRhY3RJdGVtcy5wdXNoKFxuICAgICAgICAgICAgICAgIDxMaXN0Lkl0ZW0ga2V5PXsnY29udGFjdF8nICsgaX0+XG4gICAgICAgICAgICAgICAgICAgIDxMaXN0LkNvbnRlbnQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8TGlzdC5IZWFkZXI+RW1wdHk8L0xpc3QuSGVhZGVyPlxuICAgICAgICAgICAgICAgICAgICA8L0xpc3QuQ29udGVudD5cbiAgICAgICAgICAgICAgICA8L0xpc3QuSXRlbT5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgaHRtbENvbnRlbnQgPSAoPExpc3Qgc2VsZWN0aW9uIHZlcnRpY2FsQWxpZ249J21pZGRsZSc+e2NvbnRhY3RJdGVtc308L0xpc3Q+KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZvciAodmFyIGk9MDtpPGNvbnRhY3RBZGRyZXNzZXMubGVuZ3RoO2krKykge1xuICAgICAgICAgICAgICAgIHZhciB1c2VyID0gdGhpcy5hY2NvdW50LnN0b3JhZ2VNYW5hZ2VyLmNvbnRhY3RzW2NvbnRhY3RBZGRyZXNzZXNbaV1dO1xuICAgICAgICAgICAgICAgIHZhciBhZGRyZXNzRXhwbG9yZXJVcmwgPSBDb25maWcuRU5WLkV4cGxvcmVyVXJsICsgJ2FkZHJlc3MvJyArIGNvbnRhY3RBZGRyZXNzZXNbaV07XG4gICAgICAgICAgICAgICAgdmFyIHJpZ2h0QWxpZ25lZENvbnRlbnQ7XG4gICAgICAgICAgICAgICAgaWYgKHVzZXIucmVsYXRpb25zaGlwID09IENvbnN0YW50LlJlbGF0aW9uc2hpcC5Ob1JlbGF0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0QWxpZ25lZENvbnRlbnQgPSAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8TGlzdC5Db250ZW50IGZsb2F0ZWQ9J3JpZ2h0Jz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIGNvbG9yPSdvcmFuZ2UnIGxvYWRpbmc9e3VzZXIuaXNBY2NlcHRpbmd9IGRpc2FibGVkPXt1c2VyLmlzQWNjZXB0aW5nfSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5hY2NlcHRDb250YWN0UmVxdWVzdH0gdmFsdWU9e2NvbnRhY3RBZGRyZXNzZXNbaV19PkFjY2VwdDwvQnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxQb3B1cCAga2V5PXsnaW5mb19idXR0b25fcG9wdXBfJyArIGl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyPXs8QnV0dG9uIGNvbG9yPSdncmVlbicgYXM9J2EnIGhyZWY9e2FkZHJlc3NFeHBsb3JlclVybH0gdGFyZ2V0PSdfYmxhbmsnIGNpcmN1bGFyIGljb249J2luZm8gY2lyY2xlJz48L0J1dHRvbj59XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50PSdWaWV3IG9uIEV0aGVyc2NhbidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9MaXN0LkNvbnRlbnQ+XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh1c2VyLnJlbGF0aW9uc2hpcCA9PSBDb25zdGFudC5SZWxhdGlvbnNoaXAuUmVxdWVzdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0QWxpZ25lZENvbnRlbnQgPSAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8TGlzdC5Db250ZW50IGZsb2F0ZWQ9J3JpZ2h0Jz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8UG9wdXAgIGtleT17J3dhaXRfcG9wdXBfJyArIGl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyPXs8QnV0dG9uIGNvbG9yPSd5ZWxsb3cnIGNpcmN1bGFyIGljb249J3dhaXQnPjwvQnV0dG9uPn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ9J1BlbmRpbmcgYWNjZXB0YW5jZSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxQb3B1cCAga2V5PXsnaW5mb19idXR0b25fcG9wdXBfJyArIGl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyPXs8QnV0dG9uIGNvbG9yPSdncmVlbicgYXM9J2EnIGhyZWY9e2FkZHJlc3NFeHBsb3JlclVybH0gdGFyZ2V0PSdfYmxhbmsnIGNpcmN1bGFyIGljb249J2luZm8gY2lyY2xlJz48L0J1dHRvbj59XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50PSdWaWV3IG9uIEV0aGVyc2NhbidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9MaXN0LkNvbnRlbnQ+XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmlnaHRBbGlnbmVkQ29udGVudCA9IChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxMaXN0LkNvbnRlbnQgZmxvYXRlZD0ncmlnaHQnPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxQb3B1cCAga2V5PXsnaW5mb19idXR0b25fcG9wdXBfJyArIGl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyPXs8QnV0dG9uIGNvbG9yPSdncmVlbicgYXM9J2EnIGhyZWY9e2FkZHJlc3NFeHBsb3JlclVybH0gdGFyZ2V0PSdfYmxhbmsnIGNpcmN1bGFyIGljb249J2luZm8gY2lyY2xlJz48L0J1dHRvbj59XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50PSdWaWV3IG9uIEV0aGVyc2NhbidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9MaXN0LkNvbnRlbnQ+XG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgYWRkcmVzcyA9IGNvbnRhY3RBZGRyZXNzZXNbaV07XG4gICAgICAgICAgICAgICAgY29udGFjdEl0ZW1zLnB1c2goXG4gICAgICAgICAgICAgICAgICAgIDxMaXN0Lkl0ZW0gYWN0aXZlPXthZGRyZXNzID09IHRoaXMuc3RhdGUuc2VsZWN0ZWRBZGRyZXNzfSBrZXk9eydjb250YWN0XycgKyBpfSB2YWx1ZT17YWRkcmVzc30gb25DbGljaz17dGhpcy5saXN0SXRlbUNsaWNrZWQuYmluZCh0aGlzLGFkZHJlc3MpfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxJbWFnZSBhdmF0YXIgc3JjPXt1c2VyLmF2YXRhclVybCA/IHVzZXIuYXZhdGFyVXJsIDogJ3N0YXRpYy9pbWFnZXMvdXNlci5wbmcnfS8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8TGlzdC5Db250ZW50PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxMaXN0LkhlYWRlcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3VzZXIubmFtZSA/IHVzZXIubmFtZSA6IGFkZHJlc3Muc3Vic3RyKDAsIDEwKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0xpc3QuSGVhZGVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHthZGRyZXNzLnN1YnN0cigwLDE0KSArICcuLi4nfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9MaXN0LkNvbnRlbnQ+XG4gICAgICAgICAgICAgICAgICAgICAgICB7cmlnaHRBbGlnbmVkQ29udGVudH1cbiAgICAgICAgICAgICAgICAgICAgPC9MaXN0Lkl0ZW0+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGh0bWxDb250ZW50ID0gKDxMaXN0IHNlbGVjdGlvbiB2ZXJ0aWNhbEFsaWduPSdtaWRkbGUnPntjb250YWN0SXRlbXN9PC9MaXN0Pik7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8Q29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDxBZGRDb250YWN0TW9kYWwgY29udHJhY3RNYW5hZ2VyPXt0aGlzLmNvbnRyYWN0TWFuYWdlcn0gc3RvcmFnZU1hbmFnZXI9e3RoaXMuYWNjb3VudC5zdG9yYWdlTWFuYWdlcn0gLz5cbiAgICAgICAgICAgICAgICA8SGVhZGVyIGFzPSdoMicgc3R5bGU9e3tmbG9hdDogJ2xlZnQnfX0+Q29udGFjdCBsaXN0PC9IZWFkZXI+XG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17e2hlaWdodDogaGVpZ2h0IC0gNDAsIG92ZXJmbG93OiAnYXV0bycsIGZsb2F0OiAnbGVmdCcsIHdpZHRoOicxMDAlJ319PlxuICAgICAgICAgICAgICAgICAgICB7aHRtbENvbnRlbnR9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L0NvbnRhaW5lcj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENvbnRhY3RMaXN0O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3ZpZXdzL0NvbnRhY3RMaXN0LmpzIiwiLy8gQ29weXJpZ2h0IChjKSAyMDE4IE5ndXllbiBWdSBOaGF0IE1pbmhcbi8vIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSBNSVQgc29mdHdhcmUgbGljZW5zZSwgc2VlIHRoZSBhY2NvbXBhbnlpbmcgZmlsZSBMSUNFTlNFXG5cbmltcG9ydCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQge1xuICAgIEJ1dHRvbixcbiAgICBDb250YWluZXIsXG4gICAgTGlzdCxcbiAgICBJbWFnZSxcbiAgICBHcmlkLFxuICAgIE1lc3NhZ2UsXG4gICAgUmFpbCxcbiAgICBTdGlja3ksXG4gICAgSW5wdXQsXG4gICAgU2VnbWVudFxufSBmcm9tICdzZW1hbnRpYy11aS1yZWFjdCc7XG5pbXBvcnQgSGVhZGVyTWVudSBmcm9tICcuLi92aWV3cy9IZWFkZXJNZW51JztcbmltcG9ydCBMb2dpbiBmcm9tICcuLi92aWV3cy9Mb2dpbic7XG5pbXBvcnQgd2ViMyBmcm9tICcuLi9ldGhlcmV1bS93ZWIzJztcbmltcG9ydCBQcml2YXRlS2V5TW9kYWwgZnJvbSAnLi4vdmlld3MvbW9kYWxzL0VudGVyUHJpdmF0ZUtleU1vZGFsJztcbmltcG9ydCBVcGRhdGVQcm9maWxlTW9kYWwgZnJvbSAnLi4vdmlld3MvbW9kYWxzL1VwZGF0ZVByb2ZpbGVNb2RhbCc7XG5pbXBvcnQgR3VpZGVNb2RhbCBmcm9tICcuLi92aWV3cy9tb2RhbHMvR3VpZGVNb2RhbCc7XG5pbXBvcnQgSGVhZCBmcm9tICduZXh0L2hlYWQnO1xuaW1wb3J0IEFwcE1hbmFnZXIgZnJvbSAnLi4vY29yZS9BcHBNYW5hZ2VyJztcbmltcG9ydCBDb250YWN0TGlzdCBmcm9tICcuLi92aWV3cy9Db250YWN0TGlzdCc7XG5pbXBvcnQgQ2hhdCBmcm9tICcuLi92aWV3cy9DaGF0JztcbmltcG9ydCBFcnJvck1vZGFsIGZyb20gJy4uL3ZpZXdzL21vZGFscy9FcnJvck1vZGFsJztcbmltcG9ydCBTZXR0aW5nc01vZGFsIGZyb20gJy4uL3ZpZXdzL21vZGFscy9TZXR0aW5nc01vZGFsJztcbmltcG9ydCBUcmFuc2FjdGlvbk1vZGFsIGZyb20gJy4uL3ZpZXdzL21vZGFscy9UcmFuc2FjdGlvbk1vZGFsJztcbmltcG9ydCBGb290ZXIgZnJvbSAnLi4vdmlld3MvRm9vdGVyJztcblxuY2xhc3MgSW5kZXggZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHsgd2lkdGg6IDAsIGhlaWdodDogMCwgY29udGFjdExpc3Q6IFtdLCBtZXNzYWdlczogW10sIHNlbGVjdGVkQ29udGFjdDogXCJcIiB9O1xuICAgICAgICB0aGlzLnVwZGF0ZVdpbmRvd0RpbWVuc2lvbnMgPSB0aGlzLnVwZGF0ZVdpbmRvd0RpbWVuc2lvbnMuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5hcHAgPSBuZXcgQXBwTWFuYWdlcigpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLnVwZGF0ZVdpbmRvd0RpbWVuc2lvbnMoKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMudXBkYXRlV2luZG93RGltZW5zaW9ucyk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgICAgICB0aGlzLmFwcC5pbml0aWFsaXplKCk7XG4gICAgfVxuICAgICAgXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLnVwZGF0ZVdpbmRvd0RpbWVuc2lvbnMpO1xuICAgIH1cbiAgICAgIFxuICAgIHVwZGF0ZVdpbmRvd0RpbWVuc2lvbnMoKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyB3aWR0aDogd2luZG93LmlubmVyV2lkdGgsIGhlaWdodDogd2luZG93LmlubmVySGVpZ2h0IH0pO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgdmFyIGFjY291bnQgPSB0aGlzLmFwcC5hY2NvdW50O1xuICAgICAgICB2YXIgY29udHJhY3RNYW5hZ2VyID0gdGhpcy5hcHAuY29udHJhY3RNYW5hZ2VyO1xuICAgICAgICB2YXIgdHJhbnNhY3Rpb25EaXNwYXRjaGVyID0gdGhpcy5hcHAuZ2V0VHJhbnNhY3Rpb25EaXNwYXRjaGVyKCk7XG5cbiAgICAgICAgdmFyIGxpc3RIZWlnaHQgPSB0aGlzLnN0YXRlLmhlaWdodCAtIDI1MDtcblxuICAgICAgICBjb25zb2xlLmxvZyhhY2NvdW50KTtcblxuICAgICAgICBpZiAoYWNjb3VudC5pc0pvaW5lZCl7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIldURiBXUkUgVSBET0lORyBIRVJFXCIpXG4gICAgICAgICAgICB0aGlzLmFwcC5zdG9yYWdlTWFuYWdlci5yZWxvYWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPENvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgPEhlYWQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGl0bGU+RXRoZXJldW0gTWVzc2VuZ2VyPC90aXRsZT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaW5rIHJlbD1cInNob3J0Y3V0IGljb25cIiBocmVmPVwiL3N0YXRpYy9pbWFnZXMvZmF2aWNvbi5pY29cIiAvPlxuICAgICAgICAgICAgICAgICAgICA8L0hlYWQ+XG5cbiAgICAgICAgICAgICAgICAgICAgPEhlYWRlck1lbnUgYWNjb3VudD17YWNjb3VudH0gdHJhbnNhY3Rpb25EaXNwYXRjaGVyPXt0cmFuc2FjdGlvbkRpc3BhdGNoZXJ9Lz5cbiAgICAgICAgICAgICAgICAgICAgPEVycm9yTW9kYWwgLz5cbiAgICAgICAgICAgICAgICAgICAgPFRyYW5zYWN0aW9uTW9kYWwgZGlzcGF0Y2hlcj17dHJhbnNhY3Rpb25EaXNwYXRjaGVyfSAvPlxuICAgICAgICAgICAgICAgICAgICA8R3JpZCBjb2x1bW49ezJ9IHN0eWxlPXt7cGFkZGluZ1RvcDogMTB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxHcmlkLlJvdyBzdHJldGNoZWQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEdyaWQuQ29sdW1uIHdpZHRoPXs2fSBzdHlsZT17e2hlaWdodDogbGlzdEhlaWdodCArIFwicHhcIiwgZmxvYXQ6ICdsZWZ0J319PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q29udGFjdExpc3QgaGVpZ2h0PXtsaXN0SGVpZ2h0fSBhY2NvdW50PXthY2NvdW50fSBjb250cmFjdE1hbmFnZXI9e2NvbnRyYWN0TWFuYWdlcn0vPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvR3JpZC5Db2x1bW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEdyaWQuQ29sdW1uIHdpZHRoPXsxMH0gc3R5bGU9e3toZWlnaHQ6IGxpc3RIZWlnaHQgKyBcInB4XCIsIG92ZXJmbG93OiAnYXV0bycsIGZsb2F0OiAnbGVmdCd9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPENoYXQgaGVpZ2h0PXtsaXN0SGVpZ2h0fSBhY2NvdW50PXthY2NvdW50fSBjb250cmFjdE1hbmFnZXI9e2NvbnRyYWN0TWFuYWdlcn0vPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvR3JpZC5Db2x1bW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L0dyaWQuUm93PlxuICAgICAgICAgICAgICAgICAgICA8L0dyaWQ+XG4gICAgICAgICAgICAgICAgPC9Db250YWluZXI+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIDxMb2dpbiBhY2NvdW50PXthY2NvdW50fSBzdG9yYWdlTWFuYWdlcj17dGhpcy5hcHAuc3RvcmFnZU1hbmFnZXJ9IGNvbnRyYWN0TWFuYWdlcj17Y29udHJhY3RNYW5hZ2VyfS8+XG5cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBJbmRleDtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9wYWdlcz9lbnRyeSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBYUE7QUFDQTtBQUNBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7OztBQXBCQTtBQUdBO0FBQ0E7O0FBa0JBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBU0E7QUFDQTtBQVpBO0FBQ0E7QUFnQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFEQTtBQUlBO0FBQUE7QUFFQTtBQUNBO0FBN0NBO0FBQ0E7QUE4Q0E7QUFFQTtBQUFBO0FBakRBO0FBQ0E7QUFtREE7QUFDQTtBQW5EQTtBQUNBO0FBREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUFNQTtBQUNBO0FBQ0E7QUFEQTtBQUVBO0FBQUE7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7Ozs7QUEyQkE7QUFBQTs7QUFBQTtBQUVBO0FBRkE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBREE7QUFFQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRkE7QUFNQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBS0E7QUFDQTtBQUFBO0FBQUE7QUFFQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBRUE7QUFFQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFBQTs7QUFBQTtBQUNBO0FBREE7QUFBQTs7QUFDQTtBQUNBO0FBREE7QUFBQTs7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBOztBQUVBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFPQTtBQWhEQTtBQWlEQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBRUE7QUFFQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFBQTs7QUFDQTtBQUNBO0FBREE7QUFBQTtBQUNBO0FBRUE7QUFGQTtBQUVBOztBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBRkE7QUFFQTs7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUNBO0FBQ0E7QUFEQTtBQUNBOztBQUFBO0FBQ0E7QUFEQTtBQUFBOzs7Ozs7O0FBU0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDM0pBO0FBQ0E7OztBQU9BO0FBQ0E7QUFDQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7Ozs7Ozs7QUFFQTtBQUNBO0FBREE7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUFBO0FBQ0E7QUFrQkE7QUFDQTtBQXJCQTtBQUNBO0FBMkJBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUZBO0FBQUE7QUFFQTtBQUNBO0FBSEE7QUFBQTtBQUdBO0FBQ0E7QUFEQTtBQUhBO0FBQ0E7QUFHQTtBQUpBO0FBQUE7QUFLQTtBQUNBO0FBREE7QUFDQTtBQU5BO0FBQUE7QUFDQTtBQURBO0FBU0E7QUFDQTtBQUNBO0FBREE7QUFJQTtBQUVBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFYQTtBQUNBO0FBVkE7QUFBQTtBQUFBO0FBQ0E7QUFxQkE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQXpCQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQTVCQTtBQUNBO0FBMERBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFGQTtBQUFBO0FBR0E7QUFDQTtBQURBO0FBSEE7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFPQTtBQUFBO0FBRUE7QUFiQTtBQUNBO0FBREE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUEzREE7QUFDQTtBQURBO0FBQUE7QUFBQTtBQUVBO0FBQ0E7QUFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7Ozs7QUFVQTtBQUFBO0FBQUE7QUFDQTs7OztBQWlEQTtBQUNBO0FBQ0E7QUFBQTtBQUFBOztBQUFBO0FBQ0E7QUFEQTtBQUFBOztBQUNBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7O0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQ0E7QUFDQTtBQURBO0FBQ0E7O0FBQUE7QUFFQTtBQUZBO0FBRUE7QUFBQTtBQUNBO0FBREE7O0FBQ0E7O0FBQUE7QUFDQTtBQURBO0FBQUE7O0FBQ0E7QUFBQTtBQUFBO0FBSUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBOztBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTs7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUNBO0FBQUE7O0FBQUE7QUFDQTtBQURBO0FBQ0E7O0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBOztBQUFBO0FBQ0E7QUFEQTtBQUNBOztBQUFBO0FBQUE7QUFBQTtBQU9BO0FBQUE7QUFFQTtBQUZBO0FBRUE7QUFBQTtBQUNBO0FBREE7QUFDQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBOztBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7QUFDQTtBQURBO0FBQ0E7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUVBO0FBRkE7QUFBQTtBQUVBO0FBQUE7QUFBQTtBQUlBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUNBOztBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUNBO0FBQUE7QUFBQTtBQUdBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFDQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQW5EQTtBQUFBO0FBQUE7QUFBQTtBQW1YQTtBQW5YQTs7Ozs7OztBQXFYQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2Y0E7QUFDQTtBQUNBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7OztBQWpCQTtBQUdBO0FBQ0E7O0FBZUE7QUFDQTtBQURBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFxQ0E7QUFDQTtBQXRDQTtBQUNBO0FBREE7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FBR0E7QUFDQTs7OztBQUdBO0FBQ0E7Ozs7QUFHQTtBQUFBO0FBQ0E7QUFFQTs7OztBQUVBO0FBQ0E7QUFDQTtBQURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQU5BO0FBT0E7QUFDQTtBQUVBO0FBR0E7QUFDQTs7OztBQVFBO0FBQUE7QUFDQTtBQUFBO0FBRUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUFBO0FBQ0E7QUFFQTtBQUFBO0FBQ0E7QUFEQTtBQUlBO0FBR0E7QUFDQTtBQURBOztBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUdBO0FBQ0E7QUFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUVBO0FBRkE7QUFFQTtBQUFBO0FBQ0E7QUFEQTtBQUVBO0FBTkE7QUFVQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUZBO0FBR0E7QUFIQTtBQUdBO0FBQUE7QUFDQTtBQURBO0FBRUE7QUFQQTtBQVdBO0FBQ0E7QUFDQTtBQURBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFGQTtBQUdBO0FBSEE7QUFJQTtBQUlBO0FBL0JBO0FBZ0NBO0FBQ0E7QUFDQTtBQURBO0FBQUE7QUFDQTtBQUNBO0FBREE7QUFDQTtBQUNBO0FBREE7QUFFQTtBQUZBO0FBR0E7QUFJQTtBQUNBO0FBM0RBO0FBNERBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFHQTtBQUVBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7QUFDQTtBQURBO0FBR0E7O0FBQUE7QUFDQTtBQURBO0FBQUE7QUFDQTtBQUlBO0FBSkE7Ozs7Ozs7OztBQVFBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFDQTtBQUNBOzs7OztBQUdBO0FBQUE7Ozs7QUFJQTtBQUFBO0FBQ0E7QUFDQTtBQUVBOzs7O0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUhBO0FBS0E7QUFMQTtBQUFBOzs7Ozs7O0FBUUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3RLQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQ0E7QUFDQTs7Ozs7O0FBckJBO0FBR0E7QUFDQTs7QUFtQkE7QUFDQTtBQURBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUErQkE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUZBO0FBS0E7QUFDQTtBQUNBO0FBREE7QUFJQTtBQTVDQTtBQUNBO0FBNkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBREE7QUFDQTtBQUNBO0FBRUE7QUFIQTtBQUlBO0FBRUE7QUFIQTtBQUlBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFuQkE7QUFvQkE7QUFDQTtBQUNBO0FBREE7QUFJQTtBQXhFQTtBQUNBO0FBeUVBO0FBQ0E7QUFDQTtBQUdBO0FBSEE7QUFHQTtBQTdFQTtBQUNBO0FBREE7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FBS0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQUE7Ozs7QUFHQTtBQUNBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFEQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7Ozs7QUFvREE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBREE7QUFDQTtBQUNBOzs7QUFDQTtBQUNBO0FBREE7QUFBQTtBQURBO0FBSUE7QUFDQTtBQUNBO0FBREE7QUFBQTs7QUFDQTtBQUNBO0FBREE7QUFBQTs7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUlBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFSQTtBQVVBO0FBQ0E7QUFDQTtBQUVBO0FBQUE7QUFFQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBRUE7QUFEQTtBQUFBO0FBQUE7QUFFQTtBQUNBO0FBQUE7QUFDQTtBQURBO0FBQUE7QUFDQTs7QUFGQTtBQU1BO0FBTkE7O0FBTEE7QUFhQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBRUE7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUNBOztBQUZBO0FBSUE7QUFKQTtBQUlBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUNBOztBQUZBO0FBTUE7QUFOQTs7QUFQQTtBQWVBO0FBQUE7QUFDQTtBQURBO0FBQUE7QUFFQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7O0FBRkE7QUFNQTtBQU5BOztBQVFBO0FBQ0E7QUFEQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBQUE7QUFDQTtBQUNBO0FBREE7QUFDQTs7QUFBQTtBQUNBO0FBREE7QUFBQTs7QUFDQTtBQUNBO0FBREE7QUFBQTtBQVNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBO0FBQ0E7QUFBQTs7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUNBO0FBQ0E7QUFEQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFLQTs7Ozs7OztBQUdBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3BMQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7O0FBOUJBO0FBR0E7QUFDQTs7QUE0QkE7QUFDQTtBQURBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUFHQTtBQUNBO0FBQUE7Ozs7QUFJQTtBQUFBOzs7O0FBSUE7QUFBQTs7OztBQUlBO0FBQUE7Ozs7QUFJQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7QUFBQTtBQUNBO0FBREE7QUFBQTs7QUFDQTtBQUNBO0FBREE7QUFBQTs7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBR0E7QUFIQTtBQUdBO0FBQUE7QUFDQTtBQURBO0FBQ0E7O0FBQUE7QUFDQTtBQURBO0FBQUE7QUFDQTtBQUNBO0FBREE7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUFBO0FBRUE7QUFGQTtBQUVBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFBQTtBQU1BO0FBTkE7O0FBbkJBO0FBNEJBO0FBQUE7QUFJQTtBQUpBO0FBQUE7QUFNQTs7Ozs7OztBQUdBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0EiLCJzb3VyY2VSb290IjoiIn0=