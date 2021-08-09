webpackHotUpdate(5,{

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL2luZGV4LmpzIl0sIm5hbWVzIjpbIkNvbXBvbmVudCIsIkJ1dHRvbiIsIkNvbnRhaW5lciIsIkxpc3QiLCJJbWFnZSIsIkdyaWQiLCJNZXNzYWdlIiwiUmFpbCIsIlN0aWNreSIsIklucHV0IiwiU2VnbWVudCIsIkhlYWRlck1lbnUiLCJMb2dpbiIsIndlYjMiLCJQcml2YXRlS2V5TW9kYWwiLCJVcGRhdGVQcm9maWxlTW9kYWwiLCJHdWlkZU1vZGFsIiwiSGVhZCIsIkFwcE1hbmFnZXIiLCJDb250YWN0TGlzdCIsIkNoYXQiLCJFcnJvck1vZGFsIiwiU2V0dGluZ3NNb2RhbCIsIlRyYW5zYWN0aW9uTW9kYWwiLCJGb290ZXIiLCJJbmRleCIsInByb3BzIiwic3RhdGUiLCJ3aWR0aCIsImhlaWdodCIsImNvbnRhY3RMaXN0IiwibWVzc2FnZXMiLCJzZWxlY3RlZENvbnRhY3QiLCJ1cGRhdGVXaW5kb3dEaW1lbnNpb25zIiwiYmluZCIsImFwcCIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJpbml0aWFsaXplIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInNldFN0YXRlIiwiaW5uZXJXaWR0aCIsImlubmVySGVpZ2h0IiwiYWNjb3VudCIsImNvbnRyYWN0TWFuYWdlciIsInRyYW5zYWN0aW9uRGlzcGF0Y2hlciIsImdldFRyYW5zYWN0aW9uRGlzcGF0Y2hlciIsImxpc3RIZWlnaHQiLCJjb25zb2xlIiwibG9nIiwiaXNKb2luZWQiLCJzdG9yYWdlTWFuYWdlciIsInJlbG9hZCIsInBhZGRpbmdUb3AiLCJmbG9hdCIsIm92ZXJmbG93Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJQSxBQUNJLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBOztBQUVKLEFBQU8sQUFBZ0I7Ozs7QUFDdkIsQUFBTyxBQUFXOzs7O0FBQ2xCLEFBQU8sQUFBVTs7OztBQUNqQixBQUFPLEFBQXFC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QThCLEFBQW1DO2tDQUFqRTtvQ0FBQSxBQUNJO0FBREo7bUNBQ0ksQUFBQyx1Q0FBWSxRQUFiLEFBQXFCLFlBQVksU0FBakMsQUFBMEMsU0FBUyxpQkFBbkQsQUFBb0U7a0NBQXBFO29DQUZSLEFBQ0ksQUFDSSxBQUVKO0FBRkk7cUNBRUgsY0FBRCxzQkFBQSxBQUFNLFVBQU8sT0FBYixBQUFvQixJQUFJLE9BQU8sRUFBQyxRQUFRLGFBQVQsQUFBc0IsTUFBTSxVQUE1QixBQUFzQyxRQUFRLE9BQTdFLEFBQStCLEFBQXFEO2tDQUFwRjtvQ0FBQSxBQUNJO0FBREo7bUNBQ0ksQUFBQyxnQ0FBSyxRQUFOLEFBQWMsWUFBWSxTQUExQixBQUFtQyxTQUFTLGlCQUE1QyxBQUE2RDtrQ0FBN0Q7b0NBbEJoQixBQUNJLEFBV0EsQUFDSSxBQUlJLEFBQ0ksQUFPbkI7QUFQbUI7O0FBckJwQixtQkE0QkssQUFDRDt1Q0FFSSxBQUFDLGlDQUFNLFNBQVAsQUFBZ0IsU0FBUyxnQkFBZ0IsS0FBQSxBQUFLLElBQTlDLEFBQWtELGdCQUFnQixpQkFBbEUsQUFBbUY7a0NBQW5GO29DQUZKLEFBRUksQUFJUDtBQUpPO2lCQUFBO0FBTVg7Ozs7O0EsQUF2RWUsQUEwRXBCOztrQkFBQSxBQUFlIiwiZmlsZSI6ImluZGV4LmpzP2VudHJ5Iiwic291cmNlUm9vdCI6Ii9Vc2Vycy90aGViZS9EZXNrdG9wL2Jsb2NrY2hhaW4tcHJvaiJ9

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNS45OGNhMjFjNzJmY2EzMTI4YjM0Yi5ob3QtdXBkYXRlLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vcGFnZXM/ZjJhNjEwNSJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTggTmd1eWVuIFZ1IE5oYXQgTWluaFxuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIE1JVCBzb2Z0d2FyZSBsaWNlbnNlLCBzZWUgdGhlIGFjY29tcGFueWluZyBmaWxlIExJQ0VOU0VcblxuaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7XG4gICAgQnV0dG9uLFxuICAgIENvbnRhaW5lcixcbiAgICBMaXN0LFxuICAgIEltYWdlLFxuICAgIEdyaWQsXG4gICAgTWVzc2FnZSxcbiAgICBSYWlsLFxuICAgIFN0aWNreSxcbiAgICBJbnB1dCxcbiAgICBTZWdtZW50XG59IGZyb20gJ3NlbWFudGljLXVpLXJlYWN0JztcbmltcG9ydCBIZWFkZXJNZW51IGZyb20gJy4uL3ZpZXdzL0hlYWRlck1lbnUnO1xuaW1wb3J0IExvZ2luIGZyb20gJy4uL3ZpZXdzL0xvZ2luJztcbmltcG9ydCB3ZWIzIGZyb20gJy4uL2V0aGVyZXVtL3dlYjMnO1xuaW1wb3J0IFByaXZhdGVLZXlNb2RhbCBmcm9tICcuLi92aWV3cy9tb2RhbHMvRW50ZXJQcml2YXRlS2V5TW9kYWwnO1xuaW1wb3J0IFVwZGF0ZVByb2ZpbGVNb2RhbCBmcm9tICcuLi92aWV3cy9tb2RhbHMvVXBkYXRlUHJvZmlsZU1vZGFsJztcbmltcG9ydCBHdWlkZU1vZGFsIGZyb20gJy4uL3ZpZXdzL21vZGFscy9HdWlkZU1vZGFsJztcbmltcG9ydCBIZWFkIGZyb20gJ25leHQvaGVhZCc7XG5pbXBvcnQgQXBwTWFuYWdlciBmcm9tICcuLi9jb3JlL0FwcE1hbmFnZXInO1xuaW1wb3J0IENvbnRhY3RMaXN0IGZyb20gJy4uL3ZpZXdzL0NvbnRhY3RMaXN0JztcbmltcG9ydCBDaGF0IGZyb20gJy4uL3ZpZXdzL0NoYXQnO1xuaW1wb3J0IEVycm9yTW9kYWwgZnJvbSAnLi4vdmlld3MvbW9kYWxzL0Vycm9yTW9kYWwnO1xuaW1wb3J0IFNldHRpbmdzTW9kYWwgZnJvbSAnLi4vdmlld3MvbW9kYWxzL1NldHRpbmdzTW9kYWwnO1xuaW1wb3J0IFRyYW5zYWN0aW9uTW9kYWwgZnJvbSAnLi4vdmlld3MvbW9kYWxzL1RyYW5zYWN0aW9uTW9kYWwnO1xuaW1wb3J0IEZvb3RlciBmcm9tICcuLi92aWV3cy9Gb290ZXInO1xuXG5jbGFzcyBJbmRleCBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLnN0YXRlID0geyB3aWR0aDogMCwgaGVpZ2h0OiAwLCBjb250YWN0TGlzdDogW10sIG1lc3NhZ2VzOiBbXSwgc2VsZWN0ZWRDb250YWN0OiBcIlwiIH07XG4gICAgICAgIHRoaXMudXBkYXRlV2luZG93RGltZW5zaW9ucyA9IHRoaXMudXBkYXRlV2luZG93RGltZW5zaW9ucy5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmFwcCA9IG5ldyBBcHBNYW5hZ2VyKCk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMudXBkYXRlV2luZG93RGltZW5zaW9ucygpO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy51cGRhdGVXaW5kb3dEaW1lbnNpb25zKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgICAgIHRoaXMuYXBwLmluaXRpYWxpemUoKTtcbiAgICB9XG4gICAgICBcbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMudXBkYXRlV2luZG93RGltZW5zaW9ucyk7XG4gICAgfVxuICAgICAgXG4gICAgdXBkYXRlV2luZG93RGltZW5zaW9ucygpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHdpZHRoOiB3aW5kb3cuaW5uZXJXaWR0aCwgaGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICB2YXIgYWNjb3VudCA9IHRoaXMuYXBwLmFjY291bnQ7XG4gICAgICAgIHZhciBjb250cmFjdE1hbmFnZXIgPSB0aGlzLmFwcC5jb250cmFjdE1hbmFnZXI7XG4gICAgICAgIHZhciB0cmFuc2FjdGlvbkRpc3BhdGNoZXIgPSB0aGlzLmFwcC5nZXRUcmFuc2FjdGlvbkRpc3BhdGNoZXIoKTtcblxuICAgICAgICB2YXIgbGlzdEhlaWdodCA9IHRoaXMuc3RhdGUuaGVpZ2h0IC0gMTQwO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKGFjY291bnQpO1xuXG4gICAgICAgIGlmIChhY2NvdW50LmlzSm9pbmVkKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiV1RGIFdSRSBVIERPSU5HIEhFUkVcIilcbiAgICAgICAgICAgIHRoaXMuYXBwLnN0b3JhZ2VNYW5hZ2VyLnJlbG9hZCA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8Q29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICA8SGVhZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0aXRsZT5FdGhlckNoYXQgLSBEZWNlbnRyYWxpemVkIG1lc3NhZ2luZyBvbiBFdGhlcmV1bSBuZXR3b3JrPC90aXRsZT5cbiAgICAgICAgICAgICAgICAgICAgPC9IZWFkPlxuXG4gICAgICAgICAgICAgICAgICAgIDxVcGRhdGVQcm9maWxlTW9kYWwgYWNjb3VudD17YWNjb3VudH0gY29udHJhY3RNYW5hZ2VyPXtjb250cmFjdE1hbmFnZXJ9IC8+XG4gICAgICAgICAgICAgICAgICAgIDxQcml2YXRlS2V5TW9kYWwgYWNjb3VudD17YWNjb3VudH0gLz5cbiAgICAgICAgICAgICAgICAgICAgPEhlYWRlck1lbnUgYWNjb3VudD17YWNjb3VudH0gdHJhbnNhY3Rpb25EaXNwYXRjaGVyPXt0cmFuc2FjdGlvbkRpc3BhdGNoZXJ9Lz5cbiAgICAgICAgICAgICAgICAgICAgPEVycm9yTW9kYWwgLz5cbiAgICAgICAgICAgICAgICAgICAgPFNldHRpbmdzTW9kYWwgYWNjb3VudD17YWNjb3VudH0gLz5cbiAgICAgICAgICAgICAgICAgICAgPFRyYW5zYWN0aW9uTW9kYWwgZGlzcGF0Y2hlcj17dHJhbnNhY3Rpb25EaXNwYXRjaGVyfSAvPlxuICAgICAgICAgICAgICAgIDxHcmlkIGNvbHVtbj17Mn0gc3R5bGU9e3twYWRkaW5nVG9wOiA1MCwgd2lkdGg6XCIxMDAlXCJ9fT5cbiAgICAgICAgICAgICAgICAgICAgPEdyaWQuUm93IHN0cmV0Y2hlZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxHcmlkLkNvbHVtbiB3aWR0aD17Nn0gc3R5bGU9e3toZWlnaHQ6IGxpc3RIZWlnaHQgKyBcInB4XCIsIGZsb2F0OiAnbGVmdCd9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q29udGFjdExpc3QgaGVpZ2h0PXtsaXN0SGVpZ2h0fSBhY2NvdW50PXthY2NvdW50fSBjb250cmFjdE1hbmFnZXI9e2NvbnRyYWN0TWFuYWdlcn0vPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9HcmlkLkNvbHVtbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxHcmlkLkNvbHVtbiB3aWR0aD17MTB9IHN0eWxlPXt7aGVpZ2h0OiBsaXN0SGVpZ2h0ICsgXCJweFwiLCBvdmVyZmxvdzogJ2F1dG8nLCBmbG9hdDogJ2xlZnQnfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPENoYXQgaGVpZ2h0PXtsaXN0SGVpZ2h0fSBhY2NvdW50PXthY2NvdW50fSBjb250cmFjdE1hbmFnZXI9e2NvbnRyYWN0TWFuYWdlcn0vPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9HcmlkLkNvbHVtbj5cbiAgICAgICAgICAgICAgICAgICAgPC9HcmlkLlJvdz5cbiAgICAgICAgICAgICAgICA8L0dyaWQ+XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICA8L0NvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgPExvZ2luIGFjY291bnQ9e2FjY291bnR9IHN0b3JhZ2VNYW5hZ2VyPXt0aGlzLmFwcC5zdG9yYWdlTWFuYWdlcn0gY29udHJhY3RNYW5hZ2VyPXtjb250cmFjdE1hbmFnZXJ9Lz5cblxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIFxuICAgICAgICB9XG5cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEluZGV4O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3BhZ2VzP2VudHJ5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFjQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7O0FBOUJBO0FBR0E7QUFDQTs7QUE0QkE7QUFDQTtBQURBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUFHQTtBQUNBO0FBQUE7Ozs7QUFJQTtBQUFBOzs7O0FBSUE7QUFBQTs7OztBQUlBO0FBQUE7Ozs7QUFJQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7QUFBQTtBQUNBO0FBREE7QUFBQTs7QUFDQTtBQUNBO0FBREE7QUFBQTs7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUdBO0FBQ0E7QUFEQTtBQUNBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFDQTs7QUFBQTtBQUNBO0FBREE7QUFBQTtBQUNBO0FBQ0E7QUFEQTtBQUNBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFBQTtBQUVBO0FBRkE7QUFFQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBQUE7QUFPQTtBQVBBOztBQXJCQTtBQStCQTtBQUFBO0FBSUE7QUFKQTtBQUFBO0FBTUE7Ozs7Ozs7QUFHQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBIiwic291cmNlUm9vdCI6IiJ9