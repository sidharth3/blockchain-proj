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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZXdzL0xvZ2luLmpzIl0sIm5hbWVzIjpbIkNvbXBvbmVudCIsIklucHV0IiwiTWVzc2FnZSIsIkNvbnRhaW5lciIsIkJ1dHRvbiIsIkhlYWRlciIsIkljb24iLCJJbWFnZSIsIkhlYWQiLCJ3ZWIzIiwiQ29uc3RhbnQiLCJDb25maWciLCJMb2dpbiIsInByb3BzIiwiaGFuZGxlQmFjayIsInNldFN0YXRlIiwid2FsbGV0QWRkcmVzcyIsImVycm9yTWVzc2FnZSIsInRyYW5zaXRpb25NZXNzYWdlIiwiaGFuZGxlSm9pbiIsImFjY291bnQiLCJzdG9yZVByaXZhdGVLZXkiLCJzdGF0ZSIsInByaXZhdGVLZXkiLCJjb250cmFjdE1hbmFnZXIiLCJnZXRDb250cmFjdCIsImdldEpvaW5lZEFkZHJlc3MiLCJ4IiwiY29uc29sZSIsImxvZyIsInB1YmxpY0tleUJ1ZmZlciIsImdldFB1YmxpY0tleUJ1ZmZlciIsImpvaW5Db250cmFjdCIsInJlc3VsdEV2ZW50IiwiRVZFTlQiLCJPTl9SRUpFQ1RFRCIsIk9OX0VSUk9SIiwiT05fUkVDRUlQVCIsIndpbmRvdyIsImxvY2F0aW9uIiwicmVsb2FkIiwibmV4dENsaWNrZWQiLCJlIiwicHJldmVudERlZmF1bHQiLCJjaGVja1ByaXZhdGVLZXkiLCJzdG9yYWdlTWFuYWdlciIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJtcyIsInNldFRpbWVvdXQiLCJyZXNvbHZlIiwibWFyZ2luVG9wIiwidGFyZ2V0IiwidmFsdWUiLCJmb250U2l6ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsQUFBUTs7OztBQUNSLEFBQ0ksQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0E7O0FBRUosQUFBTzs7OztBQUNQLEFBQU8sQUFBVTs7OztBQUNqQixBQUFPLEFBQWM7Ozs7QUFDckIsQUFBTyxBQUFZOzs7Ozs7Ozs7SSxBQUViO2lDQUNGOztpQkFBQSxBQUFZLE9B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QSxPQUFHLE9BQU8sRUFBQyxVQUFYLEFBQVUsQUFBVyxvQkFBckI7O29CQUFBO3NCQUFBO0FBQUE7U0FBZ0MsV0FBQSxBQUFLLE1BRHpDLEFBQ0ksQUFBMkMsQUFBa0I7bUJBQUE7O29CQUFBO3NCQURqRSxBQUNpRSxBQUU3RDtBQUY2RDtBQUFBLDBCQUU3RCxBQUFDLHlDQUFPLFNBQVMsS0FBakIsQUFBc0IsWUFBWSxPQUFsQyxBQUEwQyxVQUFTLE9BQU8sRUFBRSxXQUE1RCxBQUEwRCxBQUFhO29CQUF2RTtzQkFBQTtBQUFBO1NBbkJoQixBQWFJLEFBQ0ksQUFFSSxBQUdJLEFBSVosNEJBQUEsQUFBQyw0Q0FBVSxXQUFYLEFBQXFCO29CQUFyQjtzQkFBQSxBQUNBO0FBREE7eUJBQ0EsQUFBQywwQ0FBUyxTQUFWLE1BQWtCLFVBQWxCLE1BQTJCLFFBQVEsS0FBQSxBQUFLLE1BQUwsQUFBVyxxQkFBOUMsQUFBbUU7b0JBQW5FO3NCQUFBLEFBQ1E7QUFEUjt5QkFDUSxBQUFDLHVDQUFLLE1BQU4sQUFBVyxPQUFNLE1BQWpCLEFBQXNCLGtCQUFpQixTQUF2QztvQkFBQTtzQkFEUixBQUNRLEFBQ0E7QUFEQTswQkFDQSxjQUFBLE9BQUcsT0FBTyxFQUFDLFVBQVgsQUFBVSxBQUFXLHNCQUFyQjs7b0JBQUE7c0JBQUEsQUFBZ0M7QUFBaEM7Y0FBZ0MsQUFBSyxNQUY3QyxBQUVRLEFBQTJDLEFBQzNDLG9DQUFBLGNBQUEsT0FBRyxPQUFPLEVBQUMsVUFBWCxBQUFVLEFBQVcsb0JBQXJCOztvQkFBQTtzQkFBQTtBQUFBO1NBSlIsQUFDQSxBQUdRLEFBR0osNEZBQUEsQUFBQywwQ0FBUyxTQUFWLE1BQWtCLFVBQWxCLE1BQTJCLFFBQVEsS0FBQSxBQUFLLE1BQUwsQUFBVyxxQkFBOUMsQUFBbUU7b0JBQW5FO3NCQUFBLEFBQ0k7QUFESjt5QkFDSSxBQUFDLHVDQUFLLE1BQU4sQUFBVyxPQUFNLE1BQWpCLEFBQXNCO29CQUF0QjtzQkFESixBQUNJLEFBQ0E7QUFEQTswQkFDQSxjQUFBLE9BQUcsT0FBTyxFQUFDLFVBQVgsQUFBVSxBQUFXLHNCQUFyQjs7b0JBQUE7c0JBQUEsQUFBZ0M7QUFBaEM7Y0FBZ0MsQUFBSyxNQUZ6QyxBQUVJLEFBQTJDLEFBQzNDLG9DQUFBLGNBQUEsT0FBRyxPQUFPLEVBQUMsVUFBWCxBQUFVLEFBQVcsb0JBQXJCOztvQkFBQTtzQkFBQTtBQUFBO1NBbkRoQixBQWdCSSxBQUVBLEFBdUJJLEFBT0ksQUFHSTtpQkFuRGhCO2FBQUE7QUFBQTtpQkFBQTthQURKLEFBQ0ksQUFtWFA7QUFuWE87Ozs7O0EsQUE5RVEsQUFtY3BCOztrQkFBQSxBQUFlIiwiZmlsZSI6IkxvZ2luLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy90aGViZS9EZXNrdG9wL2Jsb2NrY2hhaW4tcHJvaiJ9