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
        css: '.header.jsx-1019354034{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;background-color:#0070f3;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;}.contactListHeader.jsx-1019354034{font-weight:500;}.contactImg.jsx-1019354034{width:10%;height:auto;-webkit-transition:filter 0.15s ease;transition:filter 0.15s ease;}.contactName.jsx-1019354034{font-size:0.8rem;margin-left:0.2rem;-webkit-transition:color 0.15s ease;transition:color 0.15s ease;}.contactBox.jsx-1019354034{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;overflow:scroll;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;margin-top:0.5rem;border:2px transparent solid;border-radius:10px;padding:0.5rem;-webkit-transition:border-color 0.15s ease,background-color 0.15s ease;transition:border-color 0.15s ease,background-color 0.15s ease;}.contactBox.jsx-1019354034:hover,.contactBox.jsx-1019354034:focus,.contactBox.jsx-1019354034:active{border-color:#0070f3;}.contactAdd.jsx-1019354034{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;margin-top:1rem;margin-bottom:0.5rem;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;}.publicKey.jsx-1019354034{width:60%;}.body.jsx-1019354034{display:grid;margin-top:1rem;grid-template-columns:1fr 3fr;grid-template-areas:"contactList messageBody";gap:15px;padding:0 1rem;}.bodyCols.jsx-1019354034{border:1px solid #eaeaea;border-radius:10px;padding:0.5rem;}.messageRows.jsx-1019354034{border:1px solid #eaeaea;border-radius:10px;padding:0.5rem;}.contactList.jsx-1019354034{grid-area:contactList;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;}.messageBody.jsx-1019354034{grid-area:messageBody;display:grid;grid-template-rows:3fr 1fr;grid-template-areas:"conversation" "message";gap:15px;}.conversation.jsx-1019354034{grid-area:conversation;}.message.jsx-1019354034{max-height:10vh;grid-area:message;display:grid;grid-template-columns:7fr 1fr;gap:15px;}.headerItems.jsx-1019354034{margin:1rem;color:white;padding:0.5rem;}.balance.jsx-1019354034{background:orange;border-radius:10px;}.container.jsx-1019354034{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;}.loginBox.jsx-1019354034{width:60%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;padding:2.5rem 0.5rem;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;border:1px solid #eaeaea;border-radius:10px;-webkit-transition:color 0.15s ease,border-color 0.15s ease;transition:color 0.15s ease,border-color 0.15s ease;}.loginForm.jsx-1019354034{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;padding:0.5rem 1.8rem;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;width:100%;}.loginFields.jsx-1019354034{margin-top:0.5rem;}.privateKey.jsx-1019354034{padding:0.5rem 0.5rem;width:100%;}.submitButton.jsx-1019354034{background-color:transparent;width:40%;-webkit-align-self:center;-ms-flex-item-align:center;align-self:center;padding:0.5rem 0.5rem;border-radius:10px;font-weight:700;-webkit-transition:color 0.15s ease,border-color 0.15s ease;transition:color 0.15s ease,border-color 0.15s ease;}.submitButton.jsx-1019354034:hover,.submitButton.jsx-1019354034:focus,.submitButton.jsx-1019354034:active{border-color:transparent;color:#fff;background-color:#0070f3;}.addButton.jsx-1019354034{background-color:transparent;-webkit-align-self:center;-ms-flex-item-align:center;align-self:center;padding:0.5rem 0.5rem;border-radius:10px;font-weight:700;-webkit-transition:color 0.15s ease,border-color 0.15s ease;transition:color 0.15s ease,border-color 0.15s ease;}.addButton.jsx-1019354034:hover,.addButton.jsx-1019354034:focus,.addButton.jsx-1019354034:active{border-color:transparent;color:#fff;background-color:#0070f3;}.sendButton.jsx-1019354034{background-color:transparent;-webkit-align-self:center;-ms-flex-item-align:center;align-self:center;padding:0.5rem 0.5rem;border-radius:10px;font-weight:700;-webkit-transition:color 0.15s ease,border-color 0.15s ease;transition:color 0.15s ease,border-color 0.15s ease;}.sendButton.jsx-1019354034:hover,.sendButton.jsx-1019354034:focus,.sendButton.jsx-1019354034:active{border-color:transparent;color:#fff;background-color:#0070f3;}.landingPage.jsx-1019354034{padding:5rem 0;-webkit-flex:1;-ms-flex:1;flex:1;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;}footer.jsx-1019354034{width:100%;height:100px;border-top:1px solid #eaeaea;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;}footer.jsx-1019354034 img.jsx-1019354034{margin-left:0.5rem;}footer.jsx-1019354034 a.jsx-1019354034{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;}a.jsx-1019354034{color:inherit;text-decoration:none;}.title.jsx-1019354034 a.jsx-1019354034{color:#0070f3;text-decoration:none;}.title.jsx-1019354034 a.jsx-1019354034:hover,.title.jsx-1019354034 a.jsx-1019354034:focus,.title.jsx-1019354034 a.jsx-1019354034:active{text-decoration:underline;}.title.jsx-1019354034{margin:0;line-height:1.15;font-size:3rem;font-family:"Helvetica Neue";}.loginTitle.jsx-1019354034{margin:0;line-height:1.15;font-size:2rem;font-weight:700;color:#0070f3;}.title.jsx-1019354034,.description.jsx-1019354034{text-align:center;}.description.jsx-1019354034{line-height:1.5;font-size:1.5rem;}.loginBox.jsx-1019354034:hover,.loginBox.jsx-1019354034:focus,.loginBox.jsx-1019354034:active{border-color:#0070f3;}.card.jsx-1019354034 h3.jsx-1019354034{margin:0 0 1rem 0;font-size:1.5rem;}.card.jsx-1019354034 p.jsx-1019354034{margin:0;font-size:1.25rem;line-height:1.5;}.logo.jsx-1019354034{height:1em;}@media (max-width:600px){.grid.jsx-1019354034{width:100%;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;}}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZXdzL0xvZ2luLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXNKZ0IsQUFHd0IsQUFPRyxBQUlOLEFBTU8sQUFNSixBQWFRLEFBS1IsQUFRaEIsQUFHZ0IsQUFTWSxBQU1BLEFBTUgsQUFNQSxBQVFDLEFBSVAsQUFRSixBQU1NLEFBS0wsQUFPSCxBQVlHLEFBU2hCLEFBR3lCLEFBS08sQUFZSixBQU1JLEFBV0osQUFNSSxBQVdKLEFBTVYsQUFRSixBQVNRLEFBSU4sQUFNQyxBQUtBLEFBT1ksQUFJakIsQUFNQSxBQVNTLEFBSUYsQUFRSyxBQUlILEFBS1QsQUFNRSxBQUtFLFNBOUNJLEFBTUEsQUE4QkMsQ0ExUU4sQUFxQ2QsQUFxRWUsQ0F5RkEsQUE2RWYsQUFLMEIsQ0E3TFosQ0EvQ0ksQ0E2S0ssQUFLQSxDQWhDZCxDQS9MVCxBQW9Gb0IsQUF5S0QsQ0FuUEUsQ0F5RnRCLEFBK0JDLEFBdUhBLEFBZ0JtQixDQXpEbkIsRUFsTEEsQUF1T0EsQ0EvUEQsQUE0RGdCLEFBTUEsQUErRGhCLENBdkRDLENBYWlCLEFBMkdjLENBbEpWLEFBTUEsQUEyRlAsQUFpQkEsQUFpQkEsQ0E2Q2QsQUFLaUIsQUFNQSxDQThCQyxFQWpPYyxBQTZGcEIsQUFrQlEsQUFpQkEsSUF2Q3BCLEFBdUhBLENBektlLENBWmMsQUFrSjdCLEFBS0EsQUEwQ0EsQ0E5UEQsQUE0STRCLEFBaUJBLEFBaUJBLENBdkYzQixFQUxBLEFBOENvQixFQWlHckIsQUFLbUIsRUE4QmxCLENBek5pQixBQU1BLEdBeUJlLENBMEdqQixLQVNBLElBMENDLEVBcE1nQyxBQVNoRCxBQU1BLEVBMkZBLEFBaUJBLEFBaUJBLENBakgrQyxRQW1LL0MsQ0FPQSxHQTNQcUIsQUF1QkgsQUFrQkEsQUFxRU0sQUFtQkEsQUEwRkMsR0E3SGQsT0F3QmEsRUF2QnhCLEVBbEZBLENBb1JFLENBelFtQixBQWtCRSxNQWdDQyxJQXZEeEIsQUFrSndCLEFBaUJBLEtBL0hiLEVBMkJBLEdBa0VhLENBekdRLEdBYWYsRUEyQmpCLE1BbUZxQixBQWlCQSxBQWlCRyxLQVNDLEVBeEp6QixHQTRGcUIsU0FrQkgsQUFpQkEsRUF2TFMsUUFxSlQsQ0F2Q08sQUFtQkQsS0FzQytCLEFBaUJBLEtBbEUvQixLQWdDK0IsQ0FySjlCLEtBME5KLENBakpyQixBQXdEcUIsU0ExR0QsQ0ErRkssZ0JBaUZKLENBL0tVLHlCQWtCL0IsQUFzS3FCLElBdkxBLG1CQUNKLEVBcUZqQixhQXBGa0UsRUFnTWxFLENBMU5BLEFBa0lELEVBb0NDLEFBaUJBLFNBckRBLENBbUJBLElBL0JxQixVQWlGckIsMEJBU0EseURBekYyQixzQkE1RjNCLEdBNkZxQixtQkFDa0MsZ0hBQ3ZEIiwiZmlsZSI6InZpZXdzL0xvZ2luLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy90aGViZS9EZXNrdG9wL2Jsb2NrY2hhaW4tcHJvaiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQge1xuICAgIElucHV0LFxuICAgIE1lc3NhZ2UsXG4gICAgQ29udGFpbmVyLFxuICAgIEJ1dHRvbixcbiAgICBIZWFkZXIsXG4gICAgSWNvblxufSBmcm9tICdzZW1hbnRpYy11aS1yZWFjdCc7XG5pbXBvcnQgSGVhZCBmcm9tICduZXh0L2hlYWQnO1xuaW1wb3J0IHdlYjMgZnJvbSAnLi4vZXRoZXJldW0vd2ViMyc7XG5pbXBvcnQgQ29uc3RhbnQgZnJvbSAnLi4vc3VwcG9ydC9Db25zdGFudCc7XG5pbXBvcnQgQ29uZmlnIGZyb20gJy4uL3N1cHBvcnQvQ29uZmlnJztcblxuY2xhc3MgTG9naW4gZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgdGhpcy5hY2NvdW50ID0gcHJvcHMuYWNjb3VudDtcbiAgICAgICAgdGhpcy5jb250cmFjdE1hbmFnZXIgPSBwcm9wcy5jb250cmFjdE1hbmFnZXI7XG4gICAgICAgIHRoaXMuc3RvcmFnZU1hbmFnZXIgPSBwcm9wcy5zdG9yYWdlTWFuYWdlcjtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtwcml2YXRlS2V5OiBcIlwiLCBlcnJvck1lc3NhZ2U6XCJcIiwgdHJhbnNpdGlvbk1lc3NhZ2U6XCJcIiwgd2FsbGV0QWRkcmVzczogXCJcIn07XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuc3RvcmFnZU1hbmFnZXIucmVsb2FkKTtcbiAgICAgICAgXG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIC8vIGF3YWl0IHRoaXMuc2xlZXAoMjAwMCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuc3RhdGUpO1xuICAgICAgICAvLyBpZih3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJyZWxvYWRcIik+IDApe1xuICAgICAgICAvLyB9XG4gICAgICAgIGNvbnNvbGUubG9nKHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInJlbG9hZFwiKSlcbiAgICAgICAgXG5cbiAgICB9XG5cbiAgICBoYW5kbGVCYWNrID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHt3YWxsZXRBZGRyZXNzIDogXCJcIiwgZXJyb3JNZXNzYWdlOiBcIlwiLCB0cmFuc2l0aW9uTWVzc2FnZTogXCJcIn0pO1xuICAgIH1cblxuICAgIHNsZWVwKG1zKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgbXMpKTtcbiAgICB9XG5cbiAgICBoYW5kbGVKb2luID0gYXN5bmMgKCkgPT57XG4gICAgICAgIGF3YWl0IHRoaXMuYWNjb3VudC5zdG9yZVByaXZhdGVLZXkodGhpcy5zdGF0ZS5wcml2YXRlS2V5KTtcbiAgICAgICAgYXdhaXQgdGhpcy5jb250cmFjdE1hbmFnZXIuZ2V0Q29udHJhY3QoKTtcbiAgICAgICAgdmFyIHggPSBhd2FpdCB0aGlzLmNvbnRyYWN0TWFuYWdlci5nZXRKb2luZWRBZGRyZXNzKCk7XG4gICAgICAgIGlmICh4PT0wKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiSm9pbmluZyB0aGUgbmV0d29ya1wiKTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3RyYW5zaXRpb25NZXNzYWdlOiBcIkpvaW5pbmcuLi5cIn0pXG4gICAgICAgICAgICB2YXIgcHVibGljS2V5QnVmZmVyID0gdGhpcy5hY2NvdW50LmdldFB1YmxpY0tleUJ1ZmZlcigpO1xuICAgICAgICAgICAgLy8gYXdhaXQgdGhpcy5jb250cmFjdE1hbmFnZXIuY2hlY2tBY2MoJzB4Jyt0aGlzLnN0YXRlLndhbGxldEFkZHJlc3MpO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5jb250cmFjdE1hbmFnZXIuam9pbkNvbnRyYWN0KHB1YmxpY0tleUJ1ZmZlciwgICAocmVzdWx0RXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0RXZlbnQgPT0gQ29uc3RhbnQuRVZFTlQuT05fUkVKRUNURUQgfHwgcmVzdWx0RXZlbnQgPT0gQ29uc3RhbnQuRVZFTlQuT05fRVJST1IpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dHJhbnNpdGlvbk1lc3NhZ2U6IFwiXCIsIGVycm9yTWVzc2FnZTogXCJTb21ldGhpbmcgd2VudCB3cm9uZywgcmVmcmVzaGluZyBpbiAzIHNlY29uZHMuLi5cIn0pXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzdWx0RXZlbnQgPT0gQ29uc3RhbnQuRVZFTlQuT05fUkVDRUlQVCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt0cmFuc2l0aW9uTWVzc2FnZTogXCJTdWNjZXNzIVwifSlcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5zdG9yYWdlTWFuYWdlci5yZWxvYWQgPSAxO1xuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnN0b3JhZ2VNYW5hZ2VyLnJlbG9hZCk7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5zZXRTdGF0ZSh7dHJhbnNpdGlvbk1lc3NhZ2U6IFwiU3VjY2VzcyEgQ2xpY2sgaGVyZSB0byBlbnRlciBpZiBub3QgZGlyZWN0ZWQgYXV0b21hdGljYWxseS5cIn0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIC8vIHRoaXMuc2V0U3RhdGUoe3RyYW5zaXRpb25NZXNzYWdlOiBcIlN1Y2Nlc3MhIENsaWNrIGhlcmUgdG8gZW50ZXIgaWYgbm90IGRpcmVjdGVkIGF1dG9tYXRpY2FsbHkuXCJ9KTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZXhpc3RpbmdcIik7XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIFxuICAgIH1cblxuXG4gICAgbmV4dENsaWNrZWQgPSBhc3luYyAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuc3RhdGUucHJpdmF0ZUtleSlcbiAgICAgICAgdmFyIHdhbGxldEFkZHJlc3MgPSBhd2FpdCB0aGlzLmFjY291bnQuY2hlY2tQcml2YXRlS2V5KHRoaXMuc3RhdGUucHJpdmF0ZUtleSk7XG4gICAgICAgIGlmICh3YWxsZXRBZGRyZXNzKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInN1Y2Vzc1wiLCB3YWxsZXRBZGRyZXNzKTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2Vycm9yTWVzc2FnZSA6IFwiXCJ9KTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3dhbGxldEFkZHJlc3MgOiB3YWxsZXRBZGRyZXNzfSk7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiR1VVU0xcIik7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtlcnJvck1lc3NhZ2UgOiBcIlByaXZhdGUgS2V5IGlzIGludmFsaWRcIn0pO1xuICAgICAgICAgICAgLy8gdGhpcy5zZXRTdGF0ZSh7ZXJyb3JNZXNzYWdlOiBcIkludmFsaWQgcHJpdmF0ZSBrZXlcIn0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2xhbmRpbmdQYWdlJyA+XG4gICAgICAgICAgICA8SGVhZD5cbiAgICAgICAgICAgICAgICA8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgaHJlZj1cIi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL3NlbWFudGljLXVpLzIuMi4xMi9zZW1hbnRpYy5taW4uY3NzXCI+PC9saW5rPlxuICAgICAgICAgICAgPC9IZWFkPlxuICAgICAgICAgICAgICAgIDxoMSBjbGFzc05hbWU9XCJ0aXRsZVwiPlxuICAgICAgICAgICAgICAgIFdlbGNvbWUgdG8gQmxvY2stRm9yZXZlciEgXG4gICAgICAgICAgICAgICAgPC9oMT5cblxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImRlc2NyaXB0aW9uXCI+XG4gICAgICAgICAgICAgICAgU2VuZCBhIHByaXZhdGUgbWVzc2FnZSB0byB5b3VyIGZyaWVuZCB0aGF0IHdpbGwgbmV2ZXIgYmUgbG9zdFxuICAgICAgICAgICAgICAgIDwvcD5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdsb2dpbkJveCc+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2xvZ2luVGl0bGUnPiBTaWduIGluIHRvIEJsb2NrLUZvcmV2ZXI8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nbG9naW5Gb3JtJyA+IFxuICAgICAgICAgICAgICAgIDxmb3JtIGhpZGRlbj17dGhpcy5zdGF0ZS53YWxsZXRBZGRyZXNzICE9IFwiXCJ9IGNsYXNzTmFtZT0nbG9naW5Gb3JtJyBvblN1Ym1pdD17KGUpPT50aGlzLm5leHRDbGlja2VkKGUpfT4gXG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9J2xvZ2luRmllbGRzJyBodG1sRm9yPVwicHJpS2V5XCI+RW50ZXIgUHJpdmF0ZSBLZXk6PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHZhbHVlPXt0aGlzLnN0YXRlLnByaXZhdGVLZXl9IGNsYXNzTmFtZT0nbG9naW5GaWVsZHMgcHJpdmF0ZUtleScgdHlwZT1cInRleHRcIiBvbkNoYW5nZT17KGUpID0+IHRoaXMuc2V0U3RhdGUoe3ByaXZhdGVLZXk6IGUudGFyZ2V0LnZhbHVlfSl9ICByZXF1aXJlZCAvPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT0nbG9naW5GaWVsZHMgc3VibWl0QnV0dG9uJyB0eXBlPVwic3VibWl0XCI+TG9naW48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICAgICAgICAgICAgICAgICB7LyogPElucHV0IGZsdWlkIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLnByaXZhdGVLZXl9IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gdGhpcy5zZXRTdGF0ZSh7cHJpdmF0ZUtleTogZS50YXJnZXQudmFsdWV9KX0gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uPXt7IGNvbG9yOiAnYmx1ZScsIGxhYmVsUG9zaXRpb246ICdyaWdodCcsIGljb246ICdhbmdsZSByaWdodCcsIGNvbnRlbnQ6ICdOZXh0Jywgb25DbGljazogKGUpPT50aGlzLm5leHRDbGlja2VkKGUpfX0vPiAqL31cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIDxNZXNzYWdlIGVycm9yIGhlYWRlcj17dGhpcy5zdGF0ZS5lcnJvck1lc3NhZ2V9IGhpZGRlbj17dGhpcy5zdGF0ZS5lcnJvck1lc3NhZ2UgPT0gXCJcIn0vPlxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgPE1lc3NhZ2UgdGV4dCBwb3NpdGl2ZSBoaWRkZW49e3RoaXMuc3RhdGUud2FsbGV0QWRkcmVzcyA9PSBcIlwifT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxNZXNzYWdlLkhlYWRlcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBKb2luIEV0aGVyZXVtIE1lc3NlbmdlciBhcyA8YnIvPiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q29udGFpbmVyIGZsdWlkIHRleHRBbGlnbj0nY2VudGVyJyBzdHlsZT17eyBtYXJnaW5Ub3A6IFwiMXZ3XCJ9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGIgc3R5bGU9e3tmb250U2l6ZTogXCIydndcIn19PjB4e3RoaXMuc3RhdGUud2FsbGV0QWRkcmVzc308L2I+PGJyLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEJ1dHRvbiBvbkNsaWNrPXt0aGlzLmhhbmRsZUJhY2t9IGNvbG9yID0gJ2JsdWUnICBzdHlsZT17eyBtYXJnaW5Ub3A6IFwiMXZ3XCJ9fSA+QmFjazwvQnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9e3RoaXMuaGFuZGxlSm9pbn0gY29sb3IgPSAnb3JhbmdlJyBzdHlsZT17eyBtYXJnaW5MZWZ0OiBcIjAuNXZ3XCJ9fT5Kb2luPC9CdXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Db250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L01lc3NhZ2UuSGVhZGVyPlxuICAgICAgICAgICAgICAgICAgICA8L01lc3NhZ2U+XG4gICAgICAgICAgICAgICAgICAgIDxDb250YWluZXIgdGV4dEFsaWduPVwiY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxNZXNzYWdlICBjb21wYWN0IHBvc2l0aXZlIGhpZGRlbj17dGhpcy5zdGF0ZS50cmFuc2l0aW9uTWVzc2FnZSAhPSBcIkpvaW5pbmcuLi5cIn0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEljb24gc2l6ZT0nYmlnJyBuYW1lPSdjaXJjbGUgbm90Y2hlZCcgbG9hZGluZyAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxiIHN0eWxlPXt7Zm9udFNpemU6IFwiMi41dndcIn19Pnt0aGlzLnN0YXRlLnRyYW5zaXRpb25NZXNzYWdlfTwvYj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBzdHlsZT17e2ZvbnRTaXplOiBcIjF2d1wifX0+UGxlYXNlIG1hbnVhbGx5IHJlZnJlc2ggcGFnZSBpZiB1bmFibGUgdG8gbG9nZ2luZyBpbiBkdXJpbmcgZmlyc3QgdGltZTwvcD5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPC9NZXNzYWdlPlxuICAgICAgICAgICAgICAgICAgICAgICAgPE1lc3NhZ2UgIGNvbXBhY3QgcG9zaXRpdmUgaGlkZGVuPXt0aGlzLnN0YXRlLnRyYW5zaXRpb25NZXNzYWdlICE9IFwiU3VjY2VzcyFcIn0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEljb24gc2l6ZT0nYmlnJyBuYW1lPSdjaGVjaycgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YiBzdHlsZT17e2ZvbnRTaXplOiBcIjIuNXZ3XCJ9fT57dGhpcy5zdGF0ZS50cmFuc2l0aW9uTWVzc2FnZX08L2I+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgc3R5bGU9e3tmb250U2l6ZTogXCIxdndcIn19PlBsZWFzZSBtYW51YWxseSByZWZyZXNoIHBhZ2UgaWYgdW5hYmxlIHRvIGxvZ2dpbmcgaW4gZHVyaW5nIGZpcnN0IHRpbWU8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L01lc3NhZ2U+XG4gICAgICAgICAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgICAgICA8L0NvbnRhaW5lcj5cblxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBcbiAgICA8c3R5bGUganN4PntgXG4gICAgICAgIC5oZWFkZXJ7XG4gICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICMwMDcwZjM7XG4gICAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgIH1cblxuICAgICAgICAuY29udGFjdExpc3RIZWFkZXJ7XG4gICAgICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICAgICAgfVxuXG4gICAgICAgIC5jb250YWN0SW1ne1xuICAgICAgICAgIHdpZHRoOiAxMCU7XG4gICAgICAgICAgaGVpZ2h0OiBhdXRvO1xuICAgICAgICAgIHRyYW5zaXRpb246IGZpbHRlciAwLjE1cyBlYXNlXG4gICAgICAgIH1cblxuICAgICAgICAuY29udGFjdE5hbWV7XG4gICAgICAgICAgZm9udC1zaXplOiAwLjhyZW07XG4gICAgICAgICAgbWFyZ2luLWxlZnQ6IDAuMnJlbTtcbiAgICAgICAgICB0cmFuc2l0aW9uOiBjb2xvciAwLjE1cyBlYXNlXG4gICAgICAgIH1cblxuICAgICAgICAuY29udGFjdEJveHtcbiAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgIG92ZXJmbG93OiBzY3JvbGw7XG4gICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgICBtYXJnaW4tdG9wOiAwLjVyZW07XG4gICAgICAgICAgYm9yZGVyOiAycHggdHJhbnNwYXJlbnQgc29saWQ7XG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgICAgICAgICBwYWRkaW5nOiAwLjVyZW07XG4gICAgICAgICAgdHJhbnNpdGlvbjogYm9yZGVyLWNvbG9yIDAuMTVzIGVhc2UsIGJhY2tncm91bmQtY29sb3IgMC4xNXMgZWFzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC5jb250YWN0Qm94IDpob3ZlcixcbiAgICAgICAgLmNvbnRhY3RCb3ggOmZvY3VzLFxuICAgICAgICAuY29udGFjdEJveCA6YWN0aXZlIHtcbiAgICAgICAgICBib3JkZXItY29sb3I6ICMwMDcwZjM7XG4gICAgICAgICAgXG4gICAgICAgIH1cblxuICAgICAgICAuY29udGFjdEFkZHtcbiAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgIG1hcmdpbi10b3A6IDFyZW07XG4gICAgICAgICAgbWFyZ2luLWJvdHRvbTogMC41cmVtO1xuICAgICAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICAgICAgfVxuXG4gICAgICAgIC5wdWJsaWNLZXl7XG4gICAgICAgICAgd2lkdGg6IDYwJVxuICAgICAgICB9XG5cbiAgICAgICAgLmJvZHl7XG4gICAgICAgICAgZGlzcGxheTogZ3JpZDtcbiAgICAgICAgICBtYXJnaW4tdG9wOiAxcmVtO1xuICAgICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDNmcjtcbiAgICAgICAgICBncmlkLXRlbXBsYXRlLWFyZWFzOiBcImNvbnRhY3RMaXN0IG1lc3NhZ2VCb2R5XCI7XG4gICAgICAgICAgZ2FwOiAxNXB4O1xuICAgICAgICAgIHBhZGRpbmc6IDAgMXJlbTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLmJvZHlDb2xze1xuICAgICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNlYWVhZWE7XG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgICAgICAgICBwYWRkaW5nOiAwLjVyZW07XG4gICAgICAgIH1cblxuICAgICAgICAubWVzc2FnZVJvd3N7XG4gICAgICAgICAgYm9yZGVyOiAxcHggc29saWQgI2VhZWFlYTtcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICAgICAgICAgIHBhZGRpbmc6IDAuNXJlbTtcbiAgICAgICAgfVxuXG4gICAgICAgIC5jb250YWN0TGlzdHtcbiAgICAgICAgICBncmlkLWFyZWE6IGNvbnRhY3RMaXN0O1xuICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgfVxuXG4gICAgICAgIC5tZXNzYWdlQm9keXtcbiAgICAgICAgICBncmlkLWFyZWE6IG1lc3NhZ2VCb2R5O1xuICAgICAgICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgICAgICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiAzZnIgMWZyO1xuICAgICAgICAgIGdyaWQtdGVtcGxhdGUtYXJlYXM6IFwiY29udmVyc2F0aW9uXCIgXCJtZXNzYWdlXCI7XG4gICAgICAgICAgZ2FwOiAxNXB4O1xuICAgICAgICB9XG5cbiAgICAgICAgLmNvbnZlcnNhdGlvbntcbiAgICAgICAgICBncmlkLWFyZWE6IGNvbnZlcnNhdGlvbjtcbiAgICAgICAgfVxuXG4gICAgICAgIC5tZXNzYWdle1xuICAgICAgICAgIG1heC1oZWlnaHQ6IDEwdmg7XG4gICAgICAgICAgZ3JpZC1hcmVhOiBtZXNzYWdlO1xuICAgICAgICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiA3ZnIgMWZyO1xuICAgICAgICAgIGdhcDogMTVweDtcbiAgICAgICAgfVxuXG4gICAgICAgIC5oZWFkZXJJdGVtc3tcbiAgICAgICAgICBtYXJnaW46IDFyZW07XG4gICAgICAgICAgY29sb3I6IHdoaXRlO1xuICAgICAgICAgIHBhZGRpbmc6IDAuNXJlbTtcbiAgICAgICAgfVxuXG4gICAgICAgIC5iYWxhbmNle1xuICAgICAgICAgIGJhY2tncm91bmQ6IG9yYW5nZTtcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiAxMHB4XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC5jb250YWluZXIge1xuICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgICBcbiAgICAgICAgfVxuXG4gICAgICAgIC5sb2dpbkJveHtcbiAgICAgICAgICB3aWR0aDogNjAlO1xuICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgICBwYWRkaW5nOiAyLjVyZW0gMC41cmVtO1xuICAgICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgICAgYm9yZGVyOiAxcHggc29saWQgI2VhZWFlYTtcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICAgICAgICAgIHRyYW5zaXRpb246IGNvbG9yIDAuMTVzIGVhc2UsIGJvcmRlci1jb2xvciAwLjE1cyBlYXNlO1xuICAgICAgICB9XG5cbiAgICAgICAgLmxvZ2luRm9ybXtcbiAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICAgICAgcGFkZGluZzogMC41cmVtIDEuOHJlbTtcbiAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICAgIHdpZHRoOiAxMDAlXG4gICAgICAgIH1cblxuICAgICAgICAubG9naW5GaWVsZHN7XG4gICAgICAgICAgbWFyZ2luLXRvcDogMC41cmVtXG4gICAgICAgIH1cblxuICAgICAgICAucHJpdmF0ZUtleXtcbiAgICAgICAgICBwYWRkaW5nOiAwLjVyZW0gMC41cmVtO1xuICAgICAgICAgIHdpZHRoOiAxMDAlXG4gICAgICAgIH1cblxuICAgICAgICAuc3VibWl0QnV0dG9ue1xuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgICAgIHdpZHRoOiA0MCU7XG4gICAgICAgICAgYWxpZ24tc2VsZjogY2VudGVyO1xuICAgICAgICAgIHBhZGRpbmc6IDAuNXJlbSAwLjVyZW07XG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgICAgICAgICBmb250LXdlaWdodDogNzAwO1xuICAgICAgICAgIHRyYW5zaXRpb246IGNvbG9yIDAuMTVzIGVhc2UsIGJvcmRlci1jb2xvciAwLjE1cyBlYXNlO1xuICAgICAgICB9XG4gICAgICBcbiAgICAgICAgLnN1Ym1pdEJ1dHRvbiA6aG92ZXIsXG4gICAgICAgIC5zdWJtaXRCdXR0b24gOmZvY3VzLFxuICAgICAgICAuc3VibWl0QnV0dG9uIDphY3RpdmUge1xuICAgICAgICAgIGJvcmRlci1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICAgICAgY29sb3I6ICAjZmZmO1xuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IzAwNzBmMyA7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC5hZGRCdXR0b257XG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICAgICAgYWxpZ24tc2VsZjogY2VudGVyO1xuICAgICAgICAgIHBhZGRpbmc6IDAuNXJlbSAwLjVyZW07XG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgICAgICAgICBmb250LXdlaWdodDogNzAwO1xuICAgICAgICAgIHRyYW5zaXRpb246IGNvbG9yIDAuMTVzIGVhc2UsIGJvcmRlci1jb2xvciAwLjE1cyBlYXNlO1xuICAgICAgICB9XG4gICAgICBcbiAgICAgICAgLmFkZEJ1dHRvbiA6aG92ZXIsXG4gICAgICAgIC5hZGRCdXR0b24gOmZvY3VzLFxuICAgICAgICAuYWRkQnV0dG9uIDphY3RpdmUge1xuICAgICAgICAgIGJvcmRlci1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICAgICAgY29sb3I6ICAjZmZmO1xuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IzAwNzBmMyA7XG4gICAgICAgIH1cblxuICAgICAgICAuc2VuZEJ1dHRvbntcbiAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgICAgICBhbGlnbi1zZWxmOiBjZW50ZXI7XG4gICAgICAgICAgcGFkZGluZzogMC41cmVtIDAuNXJlbTtcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICAgICAgICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gICAgICAgICAgdHJhbnNpdGlvbjogY29sb3IgMC4xNXMgZWFzZSwgYm9yZGVyLWNvbG9yIDAuMTVzIGVhc2U7XG4gICAgICAgIH1cbiAgICAgIFxuICAgICAgICAuc2VuZEJ1dHRvbiA6aG92ZXIsXG4gICAgICAgIC5zZW5kQnV0dG9uIDpmb2N1cyxcbiAgICAgICAgLnNlbmRCdXR0b24gOmFjdGl2ZSB7XG4gICAgICAgICAgYm9yZGVyLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgICAgICBjb2xvcjogICNmZmY7XG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjojMDA3MGYzIDtcbiAgICAgICAgfVxuXG4gICAgICAgIC5sYW5kaW5nUGFnZSB7XG4gICAgICAgICAgcGFkZGluZzogNXJlbSAwO1xuICAgICAgICAgIGZsZXg6IDE7XG4gICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIH1cblxuICAgICAgICBmb290ZXIge1xuICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgIGhlaWdodDogMTAwcHg7XG4gICAgICAgICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNlYWVhZWE7XG4gICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9vdGVyIGltZyB7XG4gICAgICAgICAgbWFyZ2luLWxlZnQ6IDAuNXJlbTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvb3RlciBhIHtcbiAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIH1cblxuICAgICAgICBhIHtcbiAgICAgICAgICBjb2xvcjogaW5oZXJpdDtcbiAgICAgICAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gICAgICAgIH1cblxuICAgICAgICAudGl0bGUgYSB7XG4gICAgICAgICAgY29sb3I6ICMwMDcwZjM7XG4gICAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICAgICAgICB9XG5cbiAgICAgICAgLnRpdGxlIGE6aG92ZXIsXG4gICAgICAgIC50aXRsZSBhOmZvY3VzLFxuICAgICAgICAudGl0bGUgYTphY3RpdmUge1xuICAgICAgICAgIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xuICAgICAgICB9XG5cbiAgICAgICAgLnRpdGxlIHtcbiAgICAgICAgICBtYXJnaW46IDA7XG4gICAgICAgICAgbGluZS1oZWlnaHQ6IDEuMTU7XG4gICAgICAgICAgZm9udC1zaXplOiAzcmVtO1xuICAgICAgICAgIGZvbnQtZmFtaWx5OiBcIkhlbHZldGljYSBOZXVlXCJcbiAgICAgICAgfVxuICAgICAgICAubG9naW5UaXRsZSB7XG4gICAgICAgICAgbWFyZ2luOiAwO1xuICAgICAgICAgIGxpbmUtaGVpZ2h0OiAxLjE1O1xuICAgICAgICAgIGZvbnQtc2l6ZTogMnJlbTtcbiAgICAgICAgICBmb250LXdlaWdodDogNzAwO1xuICAgICAgICAgIGNvbG9yOiAjMDA3MGYzO1xuICAgICAgICB9XG5cbiAgICAgICAgLnRpdGxlLFxuICAgICAgICAuZGVzY3JpcHRpb24ge1xuICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIC5kZXNjcmlwdGlvbiB7XG4gICAgICAgICAgbGluZS1oZWlnaHQ6IDEuNTtcbiAgICAgICAgICBmb250LXNpemU6IDEuNXJlbTtcbiAgICAgICAgfVxuXG4gICAgICAgIC5sb2dpbkJveDpob3ZlcixcbiAgICAgICAgLmxvZ2luQm94OmZvY3VzLFxuICAgICAgICAubG9naW5Cb3g6YWN0aXZlIHtcbiAgICAgICAgICBcbiAgICAgICAgICBib3JkZXItY29sb3I6ICMwMDcwZjM7XG4gICAgICAgIH1cblxuICAgICAgICAuY2FyZCBoMyB7XG4gICAgICAgICAgbWFyZ2luOiAwIDAgMXJlbSAwO1xuICAgICAgICAgIGZvbnQtc2l6ZTogMS41cmVtO1xuICAgICAgICB9XG5cbiAgICAgICAgLmNhcmQgcCB7XG4gICAgICAgICAgbWFyZ2luOiAwO1xuICAgICAgICAgIGZvbnQtc2l6ZTogMS4yNXJlbTtcbiAgICAgICAgICBsaW5lLWhlaWdodDogMS41O1xuICAgICAgICB9XG5cbiAgICAgICAgLmxvZ28ge1xuICAgICAgICAgIGhlaWdodDogMWVtO1xuICAgICAgICB9XG5cbiAgICAgICAgQG1lZGlhIChtYXgtd2lkdGg6IDYwMHB4KSB7XG4gICAgICAgICAgLmdyaWQge1xuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgYH08L3N0eWxlPlxuXG4gICAgICA8c3R5bGUganN4IGdsb2JhbD57YFxuICAgICAgICBodG1sLFxuICAgICAgICBib2R5IHtcbiAgICAgICAgICBwYWRkaW5nOiAwO1xuICAgICAgICAgIG1hcmdpbjogMDtcbiAgICAgICAgICBmb250LWZhbWlseTogLWFwcGxlLXN5c3RlbSwgQmxpbmtNYWNTeXN0ZW1Gb250LCBTZWdvZSBVSSwgUm9ib3RvLFxuICAgICAgICAgICAgT3h5Z2VuLCBVYnVudHUsIENhbnRhcmVsbCwgRmlyYSBTYW5zLCBEcm9pZCBTYW5zLCBIZWx2ZXRpY2EgTmV1ZSxcbiAgICAgICAgICAgIHNhbnMtc2VyaWY7XG4gICAgICAgIH1cblxuICAgICAgICAqIHtcbiAgICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgICB9XG4gICAgICBgfTwvc3R5bGU+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBMb2dpbjsiXX0= */\n/*@ sourceURL=views/Login.js */'
      }), _react2.default.createElement(_style2.default, {
        styleId: '3379920139',
        css: 'html,body{padding:0;margin:0;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto, Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue, sans-serif;}*{box-sizing:border-box;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZXdzL0xvZ2luLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQThieUIsQUFJcUIsQUFRWSxVQVBiLFNBR0csR0FLZCxtSUFKQSIsImZpbGUiOiJ2aWV3cy9Mb2dpbi5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvdGhlYmUvRGVza3RvcC9ibG9ja2NoYWluLXByb2oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtcbiAgICBJbnB1dCxcbiAgICBNZXNzYWdlLFxuICAgIENvbnRhaW5lcixcbiAgICBCdXR0b24sXG4gICAgSGVhZGVyLFxuICAgIEljb25cbn0gZnJvbSAnc2VtYW50aWMtdWktcmVhY3QnO1xuaW1wb3J0IEhlYWQgZnJvbSAnbmV4dC9oZWFkJztcbmltcG9ydCB3ZWIzIGZyb20gJy4uL2V0aGVyZXVtL3dlYjMnO1xuaW1wb3J0IENvbnN0YW50IGZyb20gJy4uL3N1cHBvcnQvQ29uc3RhbnQnO1xuaW1wb3J0IENvbmZpZyBmcm9tICcuLi9zdXBwb3J0L0NvbmZpZyc7XG5cbmNsYXNzIExvZ2luIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMuYWNjb3VudCA9IHByb3BzLmFjY291bnQ7XG4gICAgICAgIHRoaXMuY29udHJhY3RNYW5hZ2VyID0gcHJvcHMuY29udHJhY3RNYW5hZ2VyO1xuICAgICAgICB0aGlzLnN0b3JhZ2VNYW5hZ2VyID0gcHJvcHMuc3RvcmFnZU1hbmFnZXI7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7cHJpdmF0ZUtleTogXCJcIiwgZXJyb3JNZXNzYWdlOlwiXCIsIHRyYW5zaXRpb25NZXNzYWdlOlwiXCIsIHdhbGxldEFkZHJlc3M6IFwiXCJ9O1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnN0b3JhZ2VNYW5hZ2VyLnJlbG9hZCk7XG4gICAgICAgIFxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICAvLyBhd2FpdCB0aGlzLnNsZWVwKDIwMDApO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnN0YXRlKTtcbiAgICAgICAgLy8gaWYod2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwicmVsb2FkXCIpPiAwKXtcbiAgICAgICAgLy8gfVxuICAgICAgICBjb25zb2xlLmxvZyh3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJyZWxvYWRcIikpXG4gICAgICAgIFxuXG4gICAgfVxuXG4gICAgaGFuZGxlQmFjayA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7d2FsbGV0QWRkcmVzcyA6IFwiXCIsIGVycm9yTWVzc2FnZTogXCJcIiwgdHJhbnNpdGlvbk1lc3NhZ2U6IFwiXCJ9KTtcbiAgICB9XG5cbiAgICBzbGVlcChtcykge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIG1zKSk7XG4gICAgfVxuXG4gICAgaGFuZGxlSm9pbiA9IGFzeW5jICgpID0+e1xuICAgICAgICBhd2FpdCB0aGlzLmFjY291bnQuc3RvcmVQcml2YXRlS2V5KHRoaXMuc3RhdGUucHJpdmF0ZUtleSk7XG4gICAgICAgIGF3YWl0IHRoaXMuY29udHJhY3RNYW5hZ2VyLmdldENvbnRyYWN0KCk7XG4gICAgICAgIHZhciB4ID0gYXdhaXQgdGhpcy5jb250cmFjdE1hbmFnZXIuZ2V0Sm9pbmVkQWRkcmVzcygpO1xuICAgICAgICBpZiAoeD09MCl7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkpvaW5pbmcgdGhlIG5ldHdvcmtcIik7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt0cmFuc2l0aW9uTWVzc2FnZTogXCJKb2luaW5nLi4uXCJ9KVxuICAgICAgICAgICAgdmFyIHB1YmxpY0tleUJ1ZmZlciA9IHRoaXMuYWNjb3VudC5nZXRQdWJsaWNLZXlCdWZmZXIoKTtcbiAgICAgICAgICAgIC8vIGF3YWl0IHRoaXMuY29udHJhY3RNYW5hZ2VyLmNoZWNrQWNjKCcweCcrdGhpcy5zdGF0ZS53YWxsZXRBZGRyZXNzKTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuY29udHJhY3RNYW5hZ2VyLmpvaW5Db250cmFjdChwdWJsaWNLZXlCdWZmZXIsICAgKHJlc3VsdEV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdEV2ZW50ID09IENvbnN0YW50LkVWRU5ULk9OX1JFSkVDVEVEIHx8IHJlc3VsdEV2ZW50ID09IENvbnN0YW50LkVWRU5ULk9OX0VSUk9SKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3RyYW5zaXRpb25NZXNzYWdlOiBcIlwiLCBlcnJvck1lc3NhZ2U6IFwiU29tZXRoaW5nIHdlbnQgd3JvbmcsIHJlZnJlc2hpbmcgaW4gMyBzZWNvbmRzLi4uXCJ9KVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlc3VsdEV2ZW50ID09IENvbnN0YW50LkVWRU5ULk9OX1JFQ0VJUFQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7dHJhbnNpdGlvbk1lc3NhZ2U6IFwiU3VjY2VzcyFcIn0pXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuc3RvcmFnZU1hbmFnZXIucmVsb2FkID0gMTtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5zdG9yYWdlTWFuYWdlci5yZWxvYWQpO1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuc2V0U3RhdGUoe3RyYW5zaXRpb25NZXNzYWdlOiBcIlN1Y2Nlc3MhIENsaWNrIGhlcmUgdG8gZW50ZXIgaWYgbm90IGRpcmVjdGVkIGF1dG9tYXRpY2FsbHkuXCJ9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAvLyB0aGlzLnNldFN0YXRlKHt0cmFuc2l0aW9uTWVzc2FnZTogXCJTdWNjZXNzISBDbGljayBoZXJlIHRvIGVudGVyIGlmIG5vdCBkaXJlY3RlZCBhdXRvbWF0aWNhbGx5LlwifSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImV4aXN0aW5nXCIpO1xuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBcbiAgICB9XG5cblxuICAgIG5leHRDbGlja2VkID0gYXN5bmMgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnN0YXRlLnByaXZhdGVLZXkpXG4gICAgICAgIHZhciB3YWxsZXRBZGRyZXNzID0gYXdhaXQgdGhpcy5hY2NvdW50LmNoZWNrUHJpdmF0ZUtleSh0aGlzLnN0YXRlLnByaXZhdGVLZXkpO1xuICAgICAgICBpZiAod2FsbGV0QWRkcmVzcykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJzdWNlc3NcIiwgd2FsbGV0QWRkcmVzcyk7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtlcnJvck1lc3NhZ2UgOiBcIlwifSk7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt3YWxsZXRBZGRyZXNzIDogd2FsbGV0QWRkcmVzc30pO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkdVVVNMXCIpO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZXJyb3JNZXNzYWdlIDogXCJQcml2YXRlIEtleSBpcyBpbnZhbGlkXCJ9KTtcbiAgICAgICAgICAgIC8vIHRoaXMuc2V0U3RhdGUoe2Vycm9yTWVzc2FnZTogXCJJbnZhbGlkIHByaXZhdGUga2V5XCJ9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdsYW5kaW5nUGFnZScgPlxuICAgICAgICAgICAgPEhlYWQ+XG4gICAgICAgICAgICAgICAgPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIGhyZWY9XCIvL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9zZW1hbnRpYy11aS8yLjIuMTIvc2VtYW50aWMubWluLmNzc1wiPjwvbGluaz5cbiAgICAgICAgICAgIDwvSGVhZD5cbiAgICAgICAgICAgICAgICA8aDEgY2xhc3NOYW1lPVwidGl0bGVcIj5cbiAgICAgICAgICAgICAgICBXZWxjb21lIHRvIEJsb2NrLUZvcmV2ZXIhIFxuICAgICAgICAgICAgICAgIDwvaDE+XG5cbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJkZXNjcmlwdGlvblwiPlxuICAgICAgICAgICAgICAgIFNlbmQgYSBwcml2YXRlIG1lc3NhZ2UgdG8geW91ciBmcmllbmQgdGhhdCB3aWxsIG5ldmVyIGJlIGxvc3RcbiAgICAgICAgICAgICAgICA8L3A+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nbG9naW5Cb3gnPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPSdsb2dpblRpdGxlJz4gU2lnbiBpbiB0byBCbG9jay1Gb3JldmVyPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2xvZ2luRm9ybScgPiBcbiAgICAgICAgICAgICAgICA8Zm9ybSBoaWRkZW49e3RoaXMuc3RhdGUud2FsbGV0QWRkcmVzcyAhPSBcIlwifSBjbGFzc05hbWU9J2xvZ2luRm9ybScgb25TdWJtaXQ9eyhlKT0+dGhpcy5uZXh0Q2xpY2tlZChlKX0+IFxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPSdsb2dpbkZpZWxkcycgaHRtbEZvcj1cInByaUtleVwiPkVudGVyIFByaXZhdGUgS2V5OjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB2YWx1ZT17dGhpcy5zdGF0ZS5wcml2YXRlS2V5fSBjbGFzc05hbWU9J2xvZ2luRmllbGRzIHByaXZhdGVLZXknIHR5cGU9XCJ0ZXh0XCIgb25DaGFuZ2U9eyhlKSA9PiB0aGlzLnNldFN0YXRlKHtwcml2YXRlS2V5OiBlLnRhcmdldC52YWx1ZX0pfSAgcmVxdWlyZWQgLz5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9J2xvZ2luRmllbGRzIHN1Ym1pdEJ1dHRvbicgdHlwZT1cInN1Ym1pdFwiPkxvZ2luPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICAgICAgICAgICAgICAgICAgey8qIDxJbnB1dCBmbHVpZCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS5wcml2YXRlS2V5fSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHRoaXMuc2V0U3RhdGUoe3ByaXZhdGVLZXk6IGUudGFyZ2V0LnZhbHVlfSl9IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbj17eyBjb2xvcjogJ2JsdWUnLCBsYWJlbFBvc2l0aW9uOiAncmlnaHQnLCBpY29uOiAnYW5nbGUgcmlnaHQnLCBjb250ZW50OiAnTmV4dCcsIG9uQ2xpY2s6IChlKT0+dGhpcy5uZXh0Q2xpY2tlZChlKX19Lz4gKi99XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICA8TWVzc2FnZSBlcnJvciBoZWFkZXI9e3RoaXMuc3RhdGUuZXJyb3JNZXNzYWdlfSBoaWRkZW49e3RoaXMuc3RhdGUuZXJyb3JNZXNzYWdlID09IFwiXCJ9Lz5cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIDxNZXNzYWdlIHRleHQgcG9zaXRpdmUgaGlkZGVuPXt0aGlzLnN0YXRlLndhbGxldEFkZHJlc3MgPT0gXCJcIn0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8TWVzc2FnZS5IZWFkZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSm9pbiBFdGhlcmV1bSBNZXNzZW5nZXIgYXMgPGJyLz4gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPENvbnRhaW5lciBmbHVpZCB0ZXh0QWxpZ249J2NlbnRlcicgc3R5bGU9e3sgbWFyZ2luVG9wOiBcIjF2d1wifX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxiIHN0eWxlPXt7Zm9udFNpemU6IFwiMnZ3XCJ9fT4weHt0aGlzLnN0YXRlLndhbGxldEFkZHJlc3N9PC9iPjxici8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxCdXR0b24gb25DbGljaz17dGhpcy5oYW5kbGVCYWNrfSBjb2xvciA9ICdibHVlJyAgc3R5bGU9e3sgbWFyZ2luVG9wOiBcIjF2d1wifX0gPkJhY2s8L0J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEJ1dHRvbiBvbkNsaWNrPXt0aGlzLmhhbmRsZUpvaW59IGNvbG9yID0gJ29yYW5nZScgc3R5bGU9e3sgbWFyZ2luTGVmdDogXCIwLjV2d1wifX0+Sm9pbjwvQnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9NZXNzYWdlLkhlYWRlcj5cbiAgICAgICAgICAgICAgICAgICAgPC9NZXNzYWdlPlxuICAgICAgICAgICAgICAgICAgICA8Q29udGFpbmVyIHRleHRBbGlnbj1cImNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICA8TWVzc2FnZSAgY29tcGFjdCBwb3NpdGl2ZSBoaWRkZW49e3RoaXMuc3RhdGUudHJhbnNpdGlvbk1lc3NhZ2UgIT0gXCJKb2luaW5nLi4uXCJ9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxJY29uIHNpemU9J2JpZycgbmFtZT0nY2lyY2xlIG5vdGNoZWQnIGxvYWRpbmcgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YiBzdHlsZT17e2ZvbnRTaXplOiBcIjIuNXZ3XCJ9fT57dGhpcy5zdGF0ZS50cmFuc2l0aW9uTWVzc2FnZX08L2I+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgc3R5bGU9e3tmb250U2l6ZTogXCIxdndcIn19PlBsZWFzZSBtYW51YWxseSByZWZyZXNoIHBhZ2UgaWYgdW5hYmxlIHRvIGxvZ2dpbmcgaW4gZHVyaW5nIGZpcnN0IHRpbWU8L3A+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvTWVzc2FnZT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxNZXNzYWdlICBjb21wYWN0IHBvc2l0aXZlIGhpZGRlbj17dGhpcy5zdGF0ZS50cmFuc2l0aW9uTWVzc2FnZSAhPSBcIlN1Y2Nlc3MhXCJ9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxJY29uIHNpemU9J2JpZycgbmFtZT0nY2hlY2snIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGIgc3R5bGU9e3tmb250U2l6ZTogXCIyLjV2d1wifX0+e3RoaXMuc3RhdGUudHJhbnNpdGlvbk1lc3NhZ2V9PC9iPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIHN0eWxlPXt7Zm9udFNpemU6IFwiMXZ3XCJ9fT5QbGVhc2UgbWFudWFsbHkgcmVmcmVzaCBwYWdlIGlmIHVuYWJsZSB0byBsb2dnaW5nIGluIGR1cmluZyBmaXJzdCB0aW1lPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9NZXNzYWdlPlxuICAgICAgICAgICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICAgICAgPC9Db250YWluZXI+XG5cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgXG4gICAgPHN0eWxlIGpzeD57YFxuICAgICAgICAuaGVhZGVye1xuICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDA3MGYzO1xuICAgICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICB9XG5cbiAgICAgICAgLmNvbnRhY3RMaXN0SGVhZGVye1xuICAgICAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgICAgIH1cblxuICAgICAgICAuY29udGFjdEltZ3tcbiAgICAgICAgICB3aWR0aDogMTAlO1xuICAgICAgICAgIGhlaWdodDogYXV0bztcbiAgICAgICAgICB0cmFuc2l0aW9uOiBmaWx0ZXIgMC4xNXMgZWFzZVxuICAgICAgICB9XG5cbiAgICAgICAgLmNvbnRhY3ROYW1le1xuICAgICAgICAgIGZvbnQtc2l6ZTogMC44cmVtO1xuICAgICAgICAgIG1hcmdpbi1sZWZ0OiAwLjJyZW07XG4gICAgICAgICAgdHJhbnNpdGlvbjogY29sb3IgMC4xNXMgZWFzZVxuICAgICAgICB9XG5cbiAgICAgICAgLmNvbnRhY3RCb3h7XG4gICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICBvdmVyZmxvdzogc2Nyb2xsO1xuICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgICAgbWFyZ2luLXRvcDogMC41cmVtO1xuICAgICAgICAgIGJvcmRlcjogMnB4IHRyYW5zcGFyZW50IHNvbGlkO1xuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gICAgICAgICAgcGFkZGluZzogMC41cmVtO1xuICAgICAgICAgIHRyYW5zaXRpb246IGJvcmRlci1jb2xvciAwLjE1cyBlYXNlLCBiYWNrZ3JvdW5kLWNvbG9yIDAuMTVzIGVhc2U7XG4gICAgICAgIH1cblxuICAgICAgICAuY29udGFjdEJveCA6aG92ZXIsXG4gICAgICAgIC5jb250YWN0Qm94IDpmb2N1cyxcbiAgICAgICAgLmNvbnRhY3RCb3ggOmFjdGl2ZSB7XG4gICAgICAgICAgYm9yZGVyLWNvbG9yOiAjMDA3MGYzO1xuICAgICAgICAgIFxuICAgICAgICB9XG5cbiAgICAgICAgLmNvbnRhY3RBZGR7XG4gICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICBtYXJnaW4tdG9wOiAxcmVtO1xuICAgICAgICAgIG1hcmdpbi1ib3R0b206IDAuNXJlbTtcbiAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgICAgIH1cblxuICAgICAgICAucHVibGljS2V5e1xuICAgICAgICAgIHdpZHRoOiA2MCVcbiAgICAgICAgfVxuXG4gICAgICAgIC5ib2R5e1xuICAgICAgICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgICAgICAgbWFyZ2luLXRvcDogMXJlbTtcbiAgICAgICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAzZnI7XG4gICAgICAgICAgZ3JpZC10ZW1wbGF0ZS1hcmVhczogXCJjb250YWN0TGlzdCBtZXNzYWdlQm9keVwiO1xuICAgICAgICAgIGdhcDogMTVweDtcbiAgICAgICAgICBwYWRkaW5nOiAwIDFyZW07XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC5ib2R5Q29sc3tcbiAgICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjZWFlYWVhO1xuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gICAgICAgICAgcGFkZGluZzogMC41cmVtO1xuICAgICAgICB9XG5cbiAgICAgICAgLm1lc3NhZ2VSb3dze1xuICAgICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNlYWVhZWE7XG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgICAgICAgICBwYWRkaW5nOiAwLjVyZW07XG4gICAgICAgIH1cblxuICAgICAgICAuY29udGFjdExpc3R7XG4gICAgICAgICAgZ3JpZC1hcmVhOiBjb250YWN0TGlzdDtcbiAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICAgIH1cblxuICAgICAgICAubWVzc2FnZUJvZHl7XG4gICAgICAgICAgZ3JpZC1hcmVhOiBtZXNzYWdlQm9keTtcbiAgICAgICAgICBkaXNwbGF5OiBncmlkO1xuICAgICAgICAgIGdyaWQtdGVtcGxhdGUtcm93czogM2ZyIDFmcjtcbiAgICAgICAgICBncmlkLXRlbXBsYXRlLWFyZWFzOiBcImNvbnZlcnNhdGlvblwiIFwibWVzc2FnZVwiO1xuICAgICAgICAgIGdhcDogMTVweDtcbiAgICAgICAgfVxuXG4gICAgICAgIC5jb252ZXJzYXRpb257XG4gICAgICAgICAgZ3JpZC1hcmVhOiBjb252ZXJzYXRpb247XG4gICAgICAgIH1cblxuICAgICAgICAubWVzc2FnZXtcbiAgICAgICAgICBtYXgtaGVpZ2h0OiAxMHZoO1xuICAgICAgICAgIGdyaWQtYXJlYTogbWVzc2FnZTtcbiAgICAgICAgICBkaXNwbGF5OiBncmlkO1xuICAgICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogN2ZyIDFmcjtcbiAgICAgICAgICBnYXA6IDE1cHg7XG4gICAgICAgIH1cblxuICAgICAgICAuaGVhZGVySXRlbXN7XG4gICAgICAgICAgbWFyZ2luOiAxcmVtO1xuICAgICAgICAgIGNvbG9yOiB3aGl0ZTtcbiAgICAgICAgICBwYWRkaW5nOiAwLjVyZW07XG4gICAgICAgIH1cblxuICAgICAgICAuYmFsYW5jZXtcbiAgICAgICAgICBiYWNrZ3JvdW5kOiBvcmFuZ2U7XG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogMTBweFxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAuY29udGFpbmVyIHtcbiAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgICAgXG4gICAgICAgIH1cblxuICAgICAgICAubG9naW5Cb3h7XG4gICAgICAgICAgd2lkdGg6IDYwJTtcbiAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICAgICAgcGFkZGluZzogMi41cmVtIDAuNXJlbTtcbiAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNlYWVhZWE7XG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgICAgICAgICB0cmFuc2l0aW9uOiBjb2xvciAwLjE1cyBlYXNlLCBib3JkZXItY29sb3IgMC4xNXMgZWFzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC5sb2dpbkZvcm17XG4gICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICAgIHBhZGRpbmc6IDAuNXJlbSAxLjhyZW07XG4gICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgICB3aWR0aDogMTAwJVxuICAgICAgICB9XG5cbiAgICAgICAgLmxvZ2luRmllbGRze1xuICAgICAgICAgIG1hcmdpbi10b3A6IDAuNXJlbVxuICAgICAgICB9XG5cbiAgICAgICAgLnByaXZhdGVLZXl7XG4gICAgICAgICAgcGFkZGluZzogMC41cmVtIDAuNXJlbTtcbiAgICAgICAgICB3aWR0aDogMTAwJVxuICAgICAgICB9XG5cbiAgICAgICAgLnN1Ym1pdEJ1dHRvbntcbiAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgICAgICB3aWR0aDogNDAlO1xuICAgICAgICAgIGFsaWduLXNlbGY6IGNlbnRlcjtcbiAgICAgICAgICBwYWRkaW5nOiAwLjVyZW0gMC41cmVtO1xuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gICAgICAgICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICAgICAgICB0cmFuc2l0aW9uOiBjb2xvciAwLjE1cyBlYXNlLCBib3JkZXItY29sb3IgMC4xNXMgZWFzZTtcbiAgICAgICAgfVxuICAgICAgXG4gICAgICAgIC5zdWJtaXRCdXR0b24gOmhvdmVyLFxuICAgICAgICAuc3VibWl0QnV0dG9uIDpmb2N1cyxcbiAgICAgICAgLnN1Ym1pdEJ1dHRvbiA6YWN0aXZlIHtcbiAgICAgICAgICBib3JkZXItY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgICAgIGNvbG9yOiAgI2ZmZjtcbiAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiMwMDcwZjMgO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAuYWRkQnV0dG9ue1xuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgICAgIGFsaWduLXNlbGY6IGNlbnRlcjtcbiAgICAgICAgICBwYWRkaW5nOiAwLjVyZW0gMC41cmVtO1xuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gICAgICAgICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICAgICAgICB0cmFuc2l0aW9uOiBjb2xvciAwLjE1cyBlYXNlLCBib3JkZXItY29sb3IgMC4xNXMgZWFzZTtcbiAgICAgICAgfVxuICAgICAgXG4gICAgICAgIC5hZGRCdXR0b24gOmhvdmVyLFxuICAgICAgICAuYWRkQnV0dG9uIDpmb2N1cyxcbiAgICAgICAgLmFkZEJ1dHRvbiA6YWN0aXZlIHtcbiAgICAgICAgICBib3JkZXItY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgICAgIGNvbG9yOiAgI2ZmZjtcbiAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiMwMDcwZjMgO1xuICAgICAgICB9XG5cbiAgICAgICAgLnNlbmRCdXR0b257XG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICAgICAgYWxpZ24tc2VsZjogY2VudGVyO1xuICAgICAgICAgIHBhZGRpbmc6IDAuNXJlbSAwLjVyZW07XG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgICAgICAgICBmb250LXdlaWdodDogNzAwO1xuICAgICAgICAgIHRyYW5zaXRpb246IGNvbG9yIDAuMTVzIGVhc2UsIGJvcmRlci1jb2xvciAwLjE1cyBlYXNlO1xuICAgICAgICB9XG4gICAgICBcbiAgICAgICAgLnNlbmRCdXR0b24gOmhvdmVyLFxuICAgICAgICAuc2VuZEJ1dHRvbiA6Zm9jdXMsXG4gICAgICAgIC5zZW5kQnV0dG9uIDphY3RpdmUge1xuICAgICAgICAgIGJvcmRlci1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICAgICAgY29sb3I6ICAjZmZmO1xuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IzAwNzBmMyA7XG4gICAgICAgIH1cblxuICAgICAgICAubGFuZGluZ1BhZ2Uge1xuICAgICAgICAgIHBhZGRpbmc6IDVyZW0gMDtcbiAgICAgICAgICBmbGV4OiAxO1xuICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9vdGVyIHtcbiAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICBoZWlnaHQ6IDEwMHB4O1xuICAgICAgICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCAjZWFlYWVhO1xuICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvb3RlciBpbWcge1xuICAgICAgICAgIG1hcmdpbi1sZWZ0OiAwLjVyZW07XG4gICAgICAgIH1cblxuICAgICAgICBmb290ZXIgYSB7XG4gICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICB9XG5cbiAgICAgICAgYSB7XG4gICAgICAgICAgY29sb3I6IGluaGVyaXQ7XG4gICAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICAgICAgICB9XG5cbiAgICAgICAgLnRpdGxlIGEge1xuICAgICAgICAgIGNvbG9yOiAjMDA3MGYzO1xuICAgICAgICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC50aXRsZSBhOmhvdmVyLFxuICAgICAgICAudGl0bGUgYTpmb2N1cyxcbiAgICAgICAgLnRpdGxlIGE6YWN0aXZlIHtcbiAgICAgICAgICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC50aXRsZSB7XG4gICAgICAgICAgbWFyZ2luOiAwO1xuICAgICAgICAgIGxpbmUtaGVpZ2h0OiAxLjE1O1xuICAgICAgICAgIGZvbnQtc2l6ZTogM3JlbTtcbiAgICAgICAgICBmb250LWZhbWlseTogXCJIZWx2ZXRpY2EgTmV1ZVwiXG4gICAgICAgIH1cbiAgICAgICAgLmxvZ2luVGl0bGUge1xuICAgICAgICAgIG1hcmdpbjogMDtcbiAgICAgICAgICBsaW5lLWhlaWdodDogMS4xNTtcbiAgICAgICAgICBmb250LXNpemU6IDJyZW07XG4gICAgICAgICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICAgICAgICBjb2xvcjogIzAwNzBmMztcbiAgICAgICAgfVxuXG4gICAgICAgIC50aXRsZSxcbiAgICAgICAgLmRlc2NyaXB0aW9uIHtcbiAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICAgIH1cblxuICAgICAgICAuZGVzY3JpcHRpb24ge1xuICAgICAgICAgIGxpbmUtaGVpZ2h0OiAxLjU7XG4gICAgICAgICAgZm9udC1zaXplOiAxLjVyZW07XG4gICAgICAgIH1cblxuICAgICAgICAubG9naW5Cb3g6aG92ZXIsXG4gICAgICAgIC5sb2dpbkJveDpmb2N1cyxcbiAgICAgICAgLmxvZ2luQm94OmFjdGl2ZSB7XG4gICAgICAgICAgXG4gICAgICAgICAgYm9yZGVyLWNvbG9yOiAjMDA3MGYzO1xuICAgICAgICB9XG5cbiAgICAgICAgLmNhcmQgaDMge1xuICAgICAgICAgIG1hcmdpbjogMCAwIDFyZW0gMDtcbiAgICAgICAgICBmb250LXNpemU6IDEuNXJlbTtcbiAgICAgICAgfVxuXG4gICAgICAgIC5jYXJkIHAge1xuICAgICAgICAgIG1hcmdpbjogMDtcbiAgICAgICAgICBmb250LXNpemU6IDEuMjVyZW07XG4gICAgICAgICAgbGluZS1oZWlnaHQ6IDEuNTtcbiAgICAgICAgfVxuXG4gICAgICAgIC5sb2dvIHtcbiAgICAgICAgICBoZWlnaHQ6IDFlbTtcbiAgICAgICAgfVxuXG4gICAgICAgIEBtZWRpYSAobWF4LXdpZHRoOiA2MDBweCkge1xuICAgICAgICAgIC5ncmlkIHtcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIGB9PC9zdHlsZT5cblxuICAgICAgPHN0eWxlIGpzeCBnbG9iYWw+e2BcbiAgICAgICAgaHRtbCxcbiAgICAgICAgYm9keSB7XG4gICAgICAgICAgcGFkZGluZzogMDtcbiAgICAgICAgICBtYXJnaW46IDA7XG4gICAgICAgICAgZm9udC1mYW1pbHk6IC1hcHBsZS1zeXN0ZW0sIEJsaW5rTWFjU3lzdGVtRm9udCwgU2Vnb2UgVUksIFJvYm90byxcbiAgICAgICAgICAgIE94eWdlbiwgVWJ1bnR1LCBDYW50YXJlbGwsIEZpcmEgU2FucywgRHJvaWQgU2FucywgSGVsdmV0aWNhIE5ldWUsXG4gICAgICAgICAgICBzYW5zLXNlcmlmO1xuICAgICAgICB9XG5cbiAgICAgICAgKiB7XG4gICAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgICAgfVxuICAgICAgYH08L3N0eWxlPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgTG9naW47Il19 */\n/*@ sourceURL=views/Login.js */'
      }));
    }
  }]);

  return Login;
}(_react.Component);

exports.default = Login;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZXdzL0xvZ2luLmpzIl0sIm5hbWVzIjpbIkNvbXBvbmVudCIsIklucHV0IiwiTWVzc2FnZSIsIkNvbnRhaW5lciIsIkJ1dHRvbiIsIkhlYWRlciIsIkljb24iLCJIZWFkIiwid2ViMyIsIkNvbnN0YW50IiwiQ29uZmlnIiwiTG9naW4iLCJwcm9wcyIsImhhbmRsZUJhY2siLCJzZXRTdGF0ZSIsIndhbGxldEFkZHJlc3MiLCJlcnJvck1lc3NhZ2UiLCJ0cmFuc2l0aW9uTWVzc2FnZSIsImhhbmRsZUpvaW4iLCJhY2NvdW50Iiwic3RvcmVQcml2YXRlS2V5Iiwic3RhdGUiLCJwcml2YXRlS2V5IiwiY29udHJhY3RNYW5hZ2VyIiwiZ2V0Q29udHJhY3QiLCJnZXRKb2luZWRBZGRyZXNzIiwieCIsImNvbnNvbGUiLCJsb2ciLCJwdWJsaWNLZXlCdWZmZXIiLCJnZXRQdWJsaWNLZXlCdWZmZXIiLCJqb2luQ29udHJhY3QiLCJyZXN1bHRFdmVudCIsIkVWRU5UIiwiT05fUkVKRUNURUQiLCJPTl9FUlJPUiIsIk9OX1JFQ0VJUFQiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsInJlbG9hZCIsIm5leHRDbGlja2VkIiwiZSIsInByZXZlbnREZWZhdWx0IiwiY2hlY2tQcml2YXRlS2V5Iiwic3RvcmFnZU1hbmFnZXIiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwibXMiLCJzZXRUaW1lb3V0IiwicmVzb2x2ZSIsInRhcmdldCIsInZhbHVlIiwibWFyZ2luVG9wIiwiZm9udFNpemUiLCJtYXJnaW5MZWZ0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxBQUFROzs7O0FBQ1IsQUFDSSxBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0E7O0FBRUosQUFBTzs7OztBQUNQLEFBQU8sQUFBVTs7OztBQUNqQixBQUFPLEFBQWM7Ozs7QUFDckIsQUFBTyxBQUFZOzs7Ozs7Ozs7SSxBQUViO2lDQUNGOztpQkFBQSxBQUFZLE9BQU87aUJBQUE7O3dDQUFBOztvSUFBQSxBQUNUOztVQURTLEFBb0JuQixhQUFhLFlBQU0sQUFDZjtZQUFBLEFBQUssU0FBUyxFQUFDLGVBQUQsQUFBaUIsSUFBSSxjQUFyQixBQUFtQyxJQUFJLG1CQUFyRCxBQUFjLEFBQTBELEFBQzNFO0FBdEJrQjs7VUFBQSxBQTRCbkIsc0ZBQWEsbUJBQUE7YUFBQTtvRUFBQTtrQkFBQTsyQ0FBQTtpQkFBQTs4QkFBQTtxQkFDSCxNQUFBLEFBQUssUUFBTCxBQUFhLGdCQUFnQixNQUFBLEFBQUssTUFEL0IsQUFDSCxBQUF3Qzs7aUJBRHJDOzhCQUFBO3FCQUVILE1BQUEsQUFBSyxnQkFGRixBQUVILEFBQXFCOztpQkFGbEI7OEJBQUE7cUJBR0ssTUFBQSxBQUFLLGdCQUhWLEFBR0ssQUFBcUI7O2lCQUEvQjtBQUhLLDJCQUFBOztvQkFJTCxLQUpLLEFBSUYsSUFKRTtnQ0FBQTtBQUFBO0FBS0w7O3NCQUFBLEFBQVEsSUFBUixBQUFZLEFBQ1o7b0JBQUEsQUFBSyxTQUFTLEVBQUMsbUJBQWYsQUFBYyxBQUFvQixBQUM5QjtBQVBDLGdDQU9pQixNQUFBLEFBQUssUUFQdEIsQUFPaUIsQUFBYSxBQUNuQztBQVJLOzs4QkFBQTsyQkFTQyxBQUFLLGdCQUFMLEFBQXFCLGFBQXJCLEFBQWtDLGlCQUFtQixVQUFBLEFBQUMsYUFBZ0IsQUFDeEU7b0JBQUksZUFBZSxtQkFBQSxBQUFTLE1BQXhCLEFBQThCLGVBQWUsZUFBZSxtQkFBQSxBQUFTLE1BQXpFLEFBQStFLFVBQVUsQUFDckY7d0JBQUEsQUFBSyxTQUFTLEVBQUMsbUJBQUQsQUFBb0IsSUFBSSxjQUF0QyxBQUFjLEFBQXNDLEFBRXZEO0FBSEQsdUJBR08sSUFBSSxlQUFlLG1CQUFBLEFBQVMsTUFBNUIsQUFBa0MsWUFBWSxBQUNqRDt3QkFBQSxBQUFLLFNBQVMsRUFBQyxtQkFBZixBQUFjLEFBQW9CLEFBQ2xDO0FBQ0E7QUFDQTt5QkFBQSxBQUFPLFNBQVAsQUFBZ0IsQUFDaEI7QUFDSDtBQUNKO0FBcEJJLEFBU0MsZUFBQTs7aUJBVEQ7OEJBQUE7QUFBQTs7aUJBc0JMO0FBQ0E7c0JBQUEsQUFBUSxJQUFSLEFBQVksQUFDWjtxQkFBQSxBQUFPLFNBeEJGLEFBd0JMLEFBQWdCOztpQkF4Qlg7aUJBQUE7OEJBQUE7O0FBQUE7a0JBQUE7QUE1Qk07O1VBQUEsQUEyRG5CLDBCQTNEbUI7MkZBMkRMLGtCQUFBLEFBQU8sR0FBUDtZQUFBO3dFQUFBO29CQUFBOytDQUFBO21CQUNWO2tCQUFBLEFBQUUsQUFDRjtBQUZVO2lDQUFBO3VCQUdnQixNQUFBLEFBQUssUUFBTCxBQUFhLGdCQUFnQixNQUFBLEFBQUssTUFIbEQsQUFHZ0IsQUFBd0M7O21CQUE5RDtBQUhNLDBDQUlWOztvQkFBQSxBQUFJLGVBQWUsQUFDZjswQkFBQSxBQUFRLElBQVIsQUFBWSxVQUFaLEFBQXNCLEFBQ3RCO3dCQUFBLEFBQUssU0FBUyxFQUFDLGNBQWYsQUFBYyxBQUFnQixBQUM5Qjt3QkFBQSxBQUFLLFNBQVMsRUFBQyxlQUFmLEFBQWMsQUFBaUIsQUFFbEM7QUFMRCx1QkFLTyxBQUNIO0FBQ0E7d0JBQUEsQUFBSyxTQUFTLEVBQUMsY0FBZixBQUFjLEFBQWdCLEFBQzlCO0FBQ0g7QUFiUzs7bUJBQUE7bUJBQUE7aUNBQUE7O0FBQUE7cUJBQUE7QUEzREs7OzJCQUFBO2lDQUFBO0FBQUE7QUFFZjs7VUFBQSxBQUFLLFVBQVUsTUFBZixBQUFxQixBQUNyQjtVQUFBLEFBQUssa0JBQWtCLE1BQXZCLEFBQTZCLEFBQzdCO1VBQUEsQUFBSyxpQkFBaUIsTUFBdEIsQUFBNEIsQUFDNUI7VUFBQSxBQUFLLFFBQVEsRUFBQyxZQUFELEFBQWEsSUFBSSxjQUFqQixBQUE4QixJQUFJLG1CQUFsQyxBQUFvRCxJQUFJLGVBQXJFLEFBQWEsQUFBdUUsQUFDcEY7WUFBQSxBQUFRLElBQUksTUFBQSxBQUFLLGVBTkYsQUFNZixBQUFnQzs7V0FFbkM7Ozs7O3dDQUVtQixBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO2NBQUEsQUFBUSxJQUFJLE9BQUEsQUFBTyxhQUFQLEFBQW9CLFFBQWhDLEFBQVksQUFBNEIsQUFHM0M7Ozs7MEIsQUFNSyxJQUFJLEFBQ047bUNBQW1CLG1CQUFBO2VBQVcsV0FBQSxBQUFXLFNBQXRCLEFBQVcsQUFBb0I7QUFBbEQsQUFBTyxBQUNWLE9BRFU7Ozs7NkJBa0RGO21CQUNMOzs2QkFDSSxjQUFBOzRDQUFBLEFBQWU7O29CQUFmO3NCQUFBLEFBQ0E7QUFEQTtBQUFBLE9BQUEsa0JBQ0EsQUFBQzs7b0JBQUQ7c0JBQUEsQUFDSTtBQURKO0FBQUEsaURBQ1UsS0FBTixBQUFVLGNBQWEsTUFBdkIsQUFBNEIsbUZBQTVCOztvQkFBQTtzQkFGSixBQUNBLEFBQ0ksQUFFQTtBQUZBOzJCQUVBLGNBQUE7NENBQUEsQUFBYzs7b0JBQWQ7c0JBQUE7QUFBQTtBQUFBLFNBSkosQUFJSSxBQUlBLDhDQUFBLGNBQUE7NENBQUEsQUFBYTs7b0JBQWI7c0JBQUE7QUFBQTtBQUFBLFNBUkosQUFRSSxBQUlBLGtGQUFBLGNBQUE7NENBQUEsQUFBZTs7b0JBQWY7c0JBQUEsQUFDQTtBQURBO0FBQUEseUJBQ0EsY0FBQTs0Q0FBQSxBQUFlOztvQkFBZjtzQkFBQTtBQUFBO0FBQUEsU0FEQSxBQUNBLEFBQ0EsOENBQUEsY0FBQTs0Q0FBQSxBQUFlOztvQkFBZjtzQkFBQSxBQUNBO0FBREE7QUFBQSx5QkFDQSxjQUFBLFVBQU0sUUFBUSxLQUFBLEFBQUssTUFBTCxBQUFXLGlCQUF6QixBQUEwQyxJQUEwQixVQUFVLGtCQUFBLEFBQUMsR0FBRDtpQkFBSyxPQUFBLEFBQUssWUFBVixBQUFLLEFBQWlCO0FBQXBHLCtDQUFBLEFBQXdEOztvQkFBeEQ7c0JBQUEsQUFDSTtBQURKO3lCQUNJLGNBQUEsV0FBK0IsU0FBL0IsQUFBdUMsOENBQXZDLEFBQWlCOztvQkFBakI7c0JBQUE7QUFBQTtTQURKLEFBQ0ksQUFDQSxnRUFBTyxPQUFPLEtBQUEsQUFBSyxNQUFuQixBQUF5QixZQUErQyxNQUF4RSxBQUE2RSxRQUFPLFVBQVUsa0JBQUEsQUFBQyxHQUFEO2lCQUFPLE9BQUEsQUFBSyxTQUFTLEVBQUMsWUFBWSxFQUFBLEFBQUUsT0FBcEMsQUFBTyxBQUFjLEFBQXNCO0FBQXpJLFdBQW1KLFVBQW5KLDBDQUFBLEFBQStDOztvQkFBL0M7c0JBRkosQUFFSSxBQUNBO0FBREE7MEJBQ0EsY0FBQSxZQUE2QyxNQUE3QyxBQUFrRCw4Q0FBbEQsQUFBa0I7O29CQUFsQjtzQkFBQTtBQUFBO1NBSkosQUFDQSxBQUdJLEFBT0EsMkJBQUEsQUFBQywwQ0FBUSxPQUFULE1BQWUsUUFBUSxLQUFBLEFBQUssTUFBNUIsQUFBa0MsY0FBYyxRQUFRLEtBQUEsQUFBSyxNQUFMLEFBQVcsZ0JBQW5FLEFBQW1GO29CQUFuRjtzQkFYSixBQVdJLEFBRUE7QUFGQTswQkFFQSxBQUFDLDBDQUFRLE1BQVQsTUFBYyxVQUFkLE1BQXVCLFFBQVEsS0FBQSxBQUFLLE1BQUwsQUFBVyxpQkFBMUMsQUFBMkQ7b0JBQTNEO3NCQUFBLEFBQ0k7QUFESjt5QkFDSyxjQUFELHlCQUFBLEFBQVM7O29CQUFUO3NCQUFBO0FBQUE7QUFBQSxTQUMrQjttQkFBQTs7b0JBQUE7c0JBRC9CLEFBQytCLEFBQzNCO0FBRDJCO0FBQUEsMEJBQzNCLEFBQUMsNENBQVUsT0FBWCxNQUFpQixXQUFqQixBQUEyQixVQUFTLE9BQU8sRUFBRSxXQUE3QyxBQUEyQyxBQUFhO29CQUF4RDtzQkFBQSxBQUNJO0FBREo7eUJBQ0ksY0FBQSxPQUFHLE9BQU8sRUFBQyxVQUFYLEFBQVUsQUFBVyxvQkFBckI7O29CQUFBO3NCQUFBO0FBQUE7U0FBZ0MsV0FBQSxBQUFLLE1BRHpDLEFBQ0ksQUFBMkMsQUFBa0I7bUJBQUE7O29CQUFBO3NCQURqRSxBQUNpRSxBQUM3RDtBQUQ2RDtBQUFBLDBCQUM3RCxBQUFDLHlDQUFPLFNBQVMsS0FBakIsQUFBc0IsWUFBWSxPQUFsQyxBQUEwQyxRQUFRLE9BQU8sRUFBRSxXQUEzRCxBQUF5RCxBQUFhO29CQUF0RTtzQkFBQTtBQUFBO1NBRkosQUFFSSxBQUNBLHlCQUFBLEFBQUMseUNBQU8sU0FBUyxLQUFqQixBQUFzQixZQUFZLE9BQWxDLEFBQTBDLFVBQVMsT0FBTyxFQUFFLFlBQTVELEFBQTBELEFBQWM7b0JBQXhFO3NCQUFBO0FBQUE7U0FuQmhCLEFBYUksQUFDSSxBQUVJLEFBR0ksQUFJWiw0QkFBQSxBQUFDLDRDQUFVLFdBQVgsQUFBcUI7b0JBQXJCO3NCQUFBLEFBQ0E7QUFEQTt5QkFDQSxBQUFDLDBDQUFTLFNBQVYsTUFBa0IsVUFBbEIsTUFBMkIsUUFBUSxLQUFBLEFBQUssTUFBTCxBQUFXLHFCQUE5QyxBQUFtRTtvQkFBbkU7c0JBQUEsQUFDUTtBQURSO3lCQUNRLEFBQUMsdUNBQUssTUFBTixBQUFXLE9BQU0sTUFBakIsQUFBc0Isa0JBQWlCLFNBQXZDO29CQUFBO3NCQURSLEFBQ1EsQUFDQTtBQURBOzBCQUNBLGNBQUEsT0FBRyxPQUFPLEVBQUMsVUFBWCxBQUFVLEFBQVcsc0JBQXJCOztvQkFBQTtzQkFBQSxBQUFnQztBQUFoQztjQUFnQyxBQUFLLE1BRjdDLEFBRVEsQUFBMkMsQUFDM0Msb0NBQUEsY0FBQSxPQUFHLE9BQU8sRUFBQyxVQUFYLEFBQVUsQUFBVyxvQkFBckI7O29CQUFBO3NCQUFBO0FBQUE7U0FKUixBQUNBLEFBR1EsQUFHSiw0RkFBQSxBQUFDLDBDQUFTLFNBQVYsTUFBa0IsVUFBbEIsTUFBMkIsUUFBUSxLQUFBLEFBQUssTUFBTCxBQUFXLHFCQUE5QyxBQUFtRTtvQkFBbkU7c0JBQUEsQUFDSTtBQURKO3lCQUNJLEFBQUMsdUNBQUssTUFBTixBQUFXLE9BQU0sTUFBakIsQUFBc0I7b0JBQXRCO3NCQURKLEFBQ0ksQUFDQTtBQURBOzBCQUNBLGNBQUEsT0FBRyxPQUFPLEVBQUMsVUFBWCxBQUFVLEFBQVcsc0JBQXJCOztvQkFBQTtzQkFBQSxBQUFnQztBQUFoQztjQUFnQyxBQUFLLE1BRnpDLEFBRUksQUFBMkMsQUFDM0Msb0NBQUEsY0FBQSxPQUFHLE9BQU8sRUFBQyxVQUFYLEFBQVUsQUFBVyxvQkFBckI7O29CQUFBO3NCQUFBO0FBQUE7U0EvQ2hCLEFBWUksQUFFQSxBQXVCSSxBQU9JLEFBR0k7aUJBL0NoQjthQUFBO0FBQUE7aUJBQUE7YUFESixBQUNJLEFBa1hQO0FBbFhPOzs7OztBLEFBOUVRLEFBa2NwQjs7a0JBQUEsQUFBZSIsImZpbGUiOiJMb2dpbi5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvdGhlYmUvRGVza3RvcC9ibG9ja2NoYWluLXByb2oifQ==