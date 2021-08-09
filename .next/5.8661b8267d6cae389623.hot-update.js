webpackHotUpdate(5,{

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

            return _react2.default.createElement(_semanticUiReact.Container, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 93
                }
            }, _react2.default.createElement(_head2.default, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 94
                }
            }, _react2.default.createElement('link', { rel: 'stylesheet', href: '//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 95
                }
            })), _react2.default.createElement('h1', { className: 'title', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 97
                }
            }, 'Welcome to Block-Forever!'), _react2.default.createElement('p', { className: 'description', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 101
                }
            }, 'Send a private message to your friend that will never be lost'), _react2.default.createElement('div', { className: 'loginBox', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 105
                }
            }, _react2.default.createElement('div', { className: 'loginTitle', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 106
                }
            }, ' Sign in to Block-Forever'), _react2.default.createElement('div', { className: 'loginForm', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 107
                }
            }, _react2.default.createElement(_semanticUiReact.Message, { hidden: this.state.walletAddress != "", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 108
                }
            }, _react2.default.createElement(_semanticUiReact.Header, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 109
                }
            }, 'Enter Private Key:'), _react2.default.createElement(_semanticUiReact.Input, { fluid: true,
                value: this.state.privateKey,
                onChange: function onChange(e) {
                    return _this3.setState({ privateKey: e.target.value });
                },
                action: { color: 'blue', labelPosition: 'right', icon: 'angle right', content: 'Next', onClick: function onClick(e) {
                        return _this3.nextClicked(e);
                    } }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 110
                }
            })), _react2.default.createElement(_semanticUiReact.Message, { error: true, header: this.state.errorMessage, hidden: this.state.errorMessage == "", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 116
                }
            }), _react2.default.createElement(_semanticUiReact.Message, { text: true, positive: true, hidden: this.state.walletAddress == "", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 118
                }
            }, _react2.default.createElement(_semanticUiReact.Message.Header, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 119
                }
            }, 'Join Ethereum Messenger as ', _react2.default.createElement('br', {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 120
                }
            }), _react2.default.createElement(_semanticUiReact.Container, { fluid: true, textAlign: 'center', style: { marginTop: "1vw" }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 121
                }
            }, _react2.default.createElement('b', { style: { fontSize: "2vw" }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 122
                }
            }, '0x', this.state.walletAddress), _react2.default.createElement('br', {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 122
                }
            }), _react2.default.createElement(_semanticUiReact.Button, { onClick: this.handleBack, color: 'blue', style: { marginTop: "1vw" }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 123
                }
            }, 'Back'), _react2.default.createElement(_semanticUiReact.Button, { onClick: this.handleJoin, color: 'orange', style: { marginLeft: "0.5vw" }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 124
                }
            }, 'Join')))), _react2.default.createElement(_semanticUiReact.Container, { textAlign: 'center', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 128
                }
            }, _react2.default.createElement(_semanticUiReact.Message, { compact: true, positive: true, hidden: this.state.transitionMessage != "Joining...", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 129
                }
            }, _react2.default.createElement(_semanticUiReact.Icon, { size: 'big', name: 'circle notched', loading: true, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 130
                }
            }), _react2.default.createElement('b', { style: { fontSize: "2.5vw" }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 131
                }
            }, this.state.transitionMessage), _react2.default.createElement('p', { style: { fontSize: "1vw" }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 132
                }
            }, 'Please manually refresh page if unable to logging in during first time')), _react2.default.createElement(_semanticUiReact.Message, { compact: true, positive: true, hidden: this.state.transitionMessage != "Success!", __source: {
                    fileName: _jsxFileName,
                    lineNumber: 135
                }
            }, _react2.default.createElement(_semanticUiReact.Icon, { size: 'big', name: 'check', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 136
                }
            }), _react2.default.createElement('b', { style: { fontSize: "2.5vw" }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 137
                }
            }, this.state.transitionMessage), _react2.default.createElement('p', { style: { fontSize: "1vw" }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 138
                }
            }, 'Please manually refresh page if unable to logging in during first time'))))));
        }
    }]);

    return Login;
}(_react.Component);

exports.default = Login;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZXdzL0xvZ2luLmpzIl0sIm5hbWVzIjpbIkNvbXBvbmVudCIsIklucHV0IiwiTWVzc2FnZSIsIkNvbnRhaW5lciIsIkJ1dHRvbiIsIkhlYWRlciIsIkljb24iLCJIZWFkIiwid2ViMyIsIkNvbnN0YW50IiwiQ29uZmlnIiwiTG9naW4iLCJwcm9wcyIsImhhbmRsZUJhY2siLCJzZXRTdGF0ZSIsIndhbGxldEFkZHJlc3MiLCJlcnJvck1lc3NhZ2UiLCJ0cmFuc2l0aW9uTWVzc2FnZSIsImhhbmRsZUpvaW4iLCJhY2NvdW50Iiwic3RvcmVQcml2YXRlS2V5Iiwic3RhdGUiLCJwcml2YXRlS2V5IiwiY29udHJhY3RNYW5hZ2VyIiwiZ2V0Q29udHJhY3QiLCJnZXRKb2luZWRBZGRyZXNzIiwieCIsImNvbnNvbGUiLCJsb2ciLCJwdWJsaWNLZXlCdWZmZXIiLCJnZXRQdWJsaWNLZXlCdWZmZXIiLCJqb2luQ29udHJhY3QiLCJyZXN1bHRFdmVudCIsIkVWRU5UIiwiT05fUkVKRUNURUQiLCJPTl9FUlJPUiIsIk9OX1JFQ0VJUFQiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsInJlbG9hZCIsIm5leHRDbGlja2VkIiwiZSIsInByZXZlbnREZWZhdWx0IiwiY2hlY2tQcml2YXRlS2V5Iiwic3RvcmFnZU1hbmFnZXIiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwibXMiLCJzZXRUaW1lb3V0IiwicmVzb2x2ZSIsInRhcmdldCIsInZhbHVlIiwiY29sb3IiLCJsYWJlbFBvc2l0aW9uIiwiaWNvbiIsImNvbnRlbnQiLCJvbkNsaWNrIiwibWFyZ2luVG9wIiwiZm9udFNpemUiLCJtYXJnaW5MZWZ0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLEFBQVE7Ozs7QUFDUixBQUNJLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQTs7QUFFSixBQUFPOzs7O0FBQ1AsQUFBTyxBQUFVOzs7O0FBQ2pCLEFBQU8sQUFBYzs7OztBQUNy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

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "/home/victorpham1997/Workplace/SUTD/50037_blockchain/blockchain-proj/views/Login.js"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/home/victorpham1997/Workplace/SUTD/50037_blockchain/blockchain-proj/views/Login.js"); } } })();

/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNS44NjYxYjgyNjdkNmNhZTM4OTYyMy5ob3QtdXBkYXRlLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vdmlld3MvTG9naW4uanM/OGI1YTkzYSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtcbiAgICBJbnB1dCxcbiAgICBNZXNzYWdlLFxuICAgIENvbnRhaW5lcixcbiAgICBCdXR0b24sXG4gICAgSGVhZGVyLFxuICAgIEljb25cbn0gZnJvbSAnc2VtYW50aWMtdWktcmVhY3QnO1xuaW1wb3J0IEhlYWQgZnJvbSAnbmV4dC9oZWFkJztcbmltcG9ydCB3ZWIzIGZyb20gJy4uL2V0aGVyZXVtL3dlYjMnO1xuaW1wb3J0IENvbnN0YW50IGZyb20gJy4uL3N1cHBvcnQvQ29uc3RhbnQnO1xuaW1wb3J0IENvbmZpZyBmcm9tICcuLi9zdXBwb3J0L0NvbmZpZyc7XG5cbmNsYXNzIExvZ2luIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMuYWNjb3VudCA9IHByb3BzLmFjY291bnQ7XG4gICAgICAgIHRoaXMuY29udHJhY3RNYW5hZ2VyID0gcHJvcHMuY29udHJhY3RNYW5hZ2VyO1xuICAgICAgICB0aGlzLnN0b3JhZ2VNYW5hZ2VyID0gcHJvcHMuc3RvcmFnZU1hbmFnZXI7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7cHJpdmF0ZUtleTogXCJcIiwgZXJyb3JNZXNzYWdlOlwiXCIsIHRyYW5zaXRpb25NZXNzYWdlOlwiXCIsIHdhbGxldEFkZHJlc3M6IFwiXCJ9O1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnN0b3JhZ2VNYW5hZ2VyLnJlbG9hZCk7XG4gICAgICAgIFxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICAvLyBhd2FpdCB0aGlzLnNsZWVwKDIwMDApO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnN0YXRlKTtcbiAgICAgICAgLy8gaWYod2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwicmVsb2FkXCIpPiAwKXtcbiAgICAgICAgLy8gfVxuICAgICAgICBjb25zb2xlLmxvZyh3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJyZWxvYWRcIikpXG4gICAgICAgIFxuXG4gICAgfVxuXG4gICAgaGFuZGxlQmFjayA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7d2FsbGV0QWRkcmVzcyA6IFwiXCIsIGVycm9yTWVzc2FnZTogXCJcIiwgdHJhbnNpdGlvbk1lc3NhZ2U6IFwiXCJ9KTtcbiAgICB9XG5cbiAgICBzbGVlcChtcykge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIG1zKSk7XG4gICAgfVxuXG4gICAgaGFuZGxlSm9pbiA9IGFzeW5jICgpID0+e1xuICAgICAgICBhd2FpdCB0aGlzLmFjY291bnQuc3RvcmVQcml2YXRlS2V5KHRoaXMuc3RhdGUucHJpdmF0ZUtleSk7XG4gICAgICAgIGF3YWl0IHRoaXMuY29udHJhY3RNYW5hZ2VyLmdldENvbnRyYWN0KCk7XG4gICAgICAgIHZhciB4ID0gYXdhaXQgdGhpcy5jb250cmFjdE1hbmFnZXIuZ2V0Sm9pbmVkQWRkcmVzcygpO1xuICAgICAgICBpZiAoeD09MCl7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkpvaW5pbmcgdGhlIG5ldHdvcmtcIik7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt0cmFuc2l0aW9uTWVzc2FnZTogXCJKb2luaW5nLi4uXCJ9KVxuICAgICAgICAgICAgdmFyIHB1YmxpY0tleUJ1ZmZlciA9IHRoaXMuYWNjb3VudC5nZXRQdWJsaWNLZXlCdWZmZXIoKTtcbiAgICAgICAgICAgIC8vIGF3YWl0IHRoaXMuY29udHJhY3RNYW5hZ2VyLmNoZWNrQWNjKCcweCcrdGhpcy5zdGF0ZS53YWxsZXRBZGRyZXNzKTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuY29udHJhY3RNYW5hZ2VyLmpvaW5Db250cmFjdChwdWJsaWNLZXlCdWZmZXIsICAgKHJlc3VsdEV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdEV2ZW50ID09IENvbnN0YW50LkVWRU5ULk9OX1JFSkVDVEVEIHx8IHJlc3VsdEV2ZW50ID09IENvbnN0YW50LkVWRU5ULk9OX0VSUk9SKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3RyYW5zaXRpb25NZXNzYWdlOiBcIlwiLCBlcnJvck1lc3NhZ2U6IFwiU29tZXRoaW5nIHdlbnQgd3JvbmcsIHJlZnJlc2hpbmcgaW4gMyBzZWNvbmRzLi4uXCJ9KVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlc3VsdEV2ZW50ID09IENvbnN0YW50LkVWRU5ULk9OX1JFQ0VJUFQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dHJhbnNpdGlvbk1lc3NhZ2U6IFwiU3VjY2VzcyFcIn0pXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuc3RvcmFnZU1hbmFnZXIucmVsb2FkID0gMTtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5zdG9yYWdlTWFuYWdlci5yZWxvYWQpO1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuc2V0U3RhdGUoe3RyYW5zaXRpb25NZXNzYWdlOiBcIlN1Y2Nlc3MhIENsaWNrIGhlcmUgdG8gZW50ZXIgaWYgbm90IGRpcmVjdGVkIGF1dG9tYXRpY2FsbHkuXCJ9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAvLyB0aGlzLnNldFN0YXRlKHt0cmFuc2l0aW9uTWVzc2FnZTogXCJTdWNjZXNzISBDbGljayBoZXJlIHRvIGVudGVyIGlmIG5vdCBkaXJlY3RlZCBhdXRvbWF0aWNhbGx5LlwifSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImV4aXN0aW5nXCIpO1xuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBcbiAgICB9XG5cblxuICAgIG5leHRDbGlja2VkID0gYXN5bmMgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnN0YXRlLnByaXZhdGVLZXkpXG4gICAgICAgIHZhciB3YWxsZXRBZGRyZXNzID0gYXdhaXQgdGhpcy5hY2NvdW50LmNoZWNrUHJpdmF0ZUtleSh0aGlzLnN0YXRlLnByaXZhdGVLZXkpO1xuICAgICAgICBpZiAod2FsbGV0QWRkcmVzcykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJzdWNlc3NcIiwgd2FsbGV0QWRkcmVzcyk7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtlcnJvck1lc3NhZ2UgOiBcIlwifSk7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt3YWxsZXRBZGRyZXNzIDogd2FsbGV0QWRkcmVzc30pO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkdVVVNMXCIpO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZXJyb3JNZXNzYWdlIDogXCJQcml2YXRlIEtleSBpcyBpbnZhbGlkXCJ9KTtcbiAgICAgICAgICAgIC8vIHRoaXMuc2V0U3RhdGUoe2Vycm9yTWVzc2FnZTogXCJJbnZhbGlkIHByaXZhdGUga2V5XCJ9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxDb250YWluZXI+XG4gICAgICAgICAgICA8SGVhZD5cbiAgICAgICAgICAgICAgICA8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgaHJlZj1cIi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL3NlbWFudGljLXVpLzIuMi4xMi9zZW1hbnRpYy5taW4uY3NzXCI+PC9saW5rPlxuICAgICAgICAgICAgPC9IZWFkPlxuICAgICAgICAgICAgICAgIDxoMSBjbGFzc05hbWU9XCJ0aXRsZVwiPlxuICAgICAgICAgICAgICAgIFdlbGNvbWUgdG8gQmxvY2stRm9yZXZlciEgXG4gICAgICAgICAgICAgICAgPC9oMT5cblxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImRlc2NyaXB0aW9uXCI+XG4gICAgICAgICAgICAgICAgU2VuZCBhIHByaXZhdGUgbWVzc2FnZSB0byB5b3VyIGZyaWVuZCB0aGF0IHdpbGwgbmV2ZXIgYmUgbG9zdFxuICAgICAgICAgICAgICAgIDwvcD5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdsb2dpbkJveCc+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2xvZ2luVGl0bGUnPiBTaWduIGluIHRvIEJsb2NrLUZvcmV2ZXI8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nbG9naW5Gb3JtJyA+IFxuICAgICAgICAgICAgICAgICAgICA8TWVzc2FnZSBoaWRkZW49e3RoaXMuc3RhdGUud2FsbGV0QWRkcmVzcyAhPSBcIlwifT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxIZWFkZXIgPkVudGVyIFByaXZhdGUgS2V5OjwvSGVhZGVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPElucHV0IGZsdWlkIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLnByaXZhdGVLZXl9IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gdGhpcy5zZXRTdGF0ZSh7cHJpdmF0ZUtleTogZS50YXJnZXQudmFsdWV9KX0gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uPXt7IGNvbG9yOiAnYmx1ZScsIGxhYmVsUG9zaXRpb246ICdyaWdodCcsIGljb246ICdhbmdsZSByaWdodCcsIGNvbnRlbnQ6ICdOZXh0Jywgb25DbGljazogKGUpPT50aGlzLm5leHRDbGlja2VkKGUpfX0vPlxuICAgICAgICAgICAgICAgICAgICA8L01lc3NhZ2U+XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICA8TWVzc2FnZSBlcnJvciBoZWFkZXI9e3RoaXMuc3RhdGUuZXJyb3JNZXNzYWdlfSBoaWRkZW49e3RoaXMuc3RhdGUuZXJyb3JNZXNzYWdlID09IFwiXCJ9Lz5cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIDxNZXNzYWdlIHRleHQgcG9zaXRpdmUgaGlkZGVuPXt0aGlzLnN0YXRlLndhbGxldEFkZHJlc3MgPT0gXCJcIn0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8TWVzc2FnZS5IZWFkZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pbiBFdGhlcmV1bSBNZXNzZW5nZXIgYXMgPGJyLz4gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPENvbnRhaW5lciBmbHVpZCB0ZXh0QWxpZ249J2NlbnRlcicgc3R5bGU9e3sgbWFyZ2luVG9wOiBcIjF2d1wifX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxiIHN0eWxlPXt7Zm9udFNpemU6IFwiMnZ3XCJ9fT4weHt0aGlzLnN0YXRlLndhbGxldEFkZHJlc3N9PC9iPjxici8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxCdXR0b24gb25DbGljaz17dGhpcy5oYW5kbGVCYWNrfSBjb2xvciA9ICdibHVlJyAgc3R5bGU9e3sgbWFyZ2luVG9wOiBcIjF2d1wifX0gPkJhY2s8L0J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEJ1dHRvbiBvbkNsaWNrPXt0aGlzLmhhbmRsZUpvaW59IGNvbG9yID0gJ29yYW5nZScgc3R5bGU9e3sgbWFyZ2luTGVmdDogXCIwLjV2d1wifX0+Sm9pbjwvQnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9NZXNzYWdlLkhlYWRlcj5cbiAgICAgICAgICAgICAgICAgICAgPC9NZXNzYWdlPlxuICAgICAgICAgICAgICAgICAgICA8Q29udGFpbmVyIHRleHRBbGlnbj1cImNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICA8TWVzc2FnZSAgY29tcGFjdCBwb3NpdGl2ZSBoaWRkZW49e3RoaXMuc3RhdGUudHJhbnNpdGlvbk1lc3NhZ2UgIT0gXCJKb2luaW5nLi4uXCJ9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxJY29uIHNpemU9J2JpZycgbmFtZT0nY2lyY2xlIG5vdGNoZWQnIGxvYWRpbmcgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YiBzdHlsZT17e2ZvbnRTaXplOiBcIjIuNXZ3XCJ9fT57dGhpcy5zdGF0ZS50cmFuc2l0aW9uTWVzc2FnZX08L2I+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgc3R5bGU9e3tmb250U2l6ZTogXCIxdndcIn19PlBsZWFzZSBtYW51YWxseSByZWZyZXNoIHBhZ2UgaWYgdW5hYmxlIHRvIGxvZ2dpbmcgaW4gZHVyaW5nIGZpcnN0IHRpbWU8L3A+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvTWVzc2FnZT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxNZXNzYWdlICBjb21wYWN0IHBvc2l0aXZlIGhpZGRlbj17dGhpcy5zdGF0ZS50cmFuc2l0aW9uTWVzc2FnZSAhPSBcIlN1Y2Nlc3MhXCJ9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxJY29uIHNpemU9J2JpZycgbmFtZT0nY2hlY2snIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGIgc3R5bGU9e3tmb250U2l6ZTogXCIyLjV2d1wifX0+e3RoaXMuc3RhdGUudHJhbnNpdGlvbk1lc3NhZ2V9PC9iPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIHN0eWxlPXt7Zm9udFNpemU6IFwiMXZ3XCJ9fT5QbGVhc2UgbWFudWFsbHkgcmVmcmVzaCBwYWdlIGlmIHVuYWJsZSB0byBsb2dnaW5nIGluIGR1cmluZyBmaXJzdCB0aW1lPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9NZXNzYWdlPlxuICAgICAgICAgICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICAgICAgPC9Db250YWluZXI+XG5cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L0NvbnRhaW5lcj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBMb2dpbjtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi92aWV3cy9Mb2dpbi5qcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBOzs7QUFNQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7Ozs7O0FBRUE7QUFDQTtBQURBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFBQTtBQUNBO0FBa0JBO0FBQ0E7QUFyQkE7QUFDQTtBQTJCQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFGQTtBQUFBO0FBRUE7QUFDQTtBQUhBO0FBQUE7QUFHQTtBQUNBO0FBREE7QUFIQTtBQUNBO0FBR0E7QUFKQTtBQUFBO0FBS0E7QUFDQTtBQURBO0FBQ0E7QUFOQTtBQUFBO0FBQ0E7QUFEQTtBQVNBO0FBQ0E7QUFDQTtBQURBO0FBSUE7QUFFQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBWEE7QUFDQTtBQVZBO0FBQUE7QUFBQTtBQUNBO0FBcUJBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUF6QkE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUE1QkE7QUFDQTtBQTBEQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBRkE7QUFBQTtBQUdBO0FBQ0E7QUFEQTtBQUhBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBT0E7QUFBQTtBQUVBO0FBYkE7QUFDQTtBQURBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBM0RBO0FBQ0E7QUFEQTtBQUFBO0FBQUE7QUFFQTtBQUNBO0FBREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBOzs7O0FBVUE7QUFBQTtBQUFBO0FBQ0E7Ozs7QUFpREE7QUFDQTtBQUNBO0FBQUE7O0FBQUE7QUFDQTtBQURBO0FBQUE7O0FBQ0E7QUFDQTtBQURBO0FBQUE7QUFDQTtBQUVBO0FBRkE7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUlBO0FBQUE7QUFBQTtBQUFBO0FBSUE7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFDQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBSEE7QUFNQTtBQU5BO0FBTUE7QUFBQTtBQUVBO0FBRkE7QUFFQTtBQUFBO0FBQ0E7QUFEQTtBQUNBOztBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUNBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7QUFDQTtBQURBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBSUE7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUdBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBV0E7Ozs7Ozs7QUFFQTs7Ozs7OztBIiwic291cmNlUm9vdCI6IiJ9