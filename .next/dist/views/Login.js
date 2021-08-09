'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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