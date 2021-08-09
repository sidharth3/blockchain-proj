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

var _HeaderMenu = require('../views/HeaderMenu');

var _HeaderMenu2 = _interopRequireDefault(_HeaderMenu);

var _Login = require('../views/Login');

var _Login2 = _interopRequireDefault(_Login);

var _web = require('../ethereum/web3');

var _web2 = _interopRequireDefault(_web);

var _EnterPrivateKeyModal = require('../views/modals/EnterPrivateKeyModal');

var _EnterPrivateKeyModal2 = _interopRequireDefault(_EnterPrivateKeyModal);

var _UpdateProfileModal = require('../views/modals/UpdateProfileModal');

var _UpdateProfileModal2 = _interopRequireDefault(_UpdateProfileModal);

var _GuideModal = require('../views/modals/GuideModal');

var _GuideModal2 = _interopRequireDefault(_GuideModal);

var _head = require('next/dist/lib/head.js');

var _head2 = _interopRequireDefault(_head);

var _AppManager = require('../core/AppManager');

var _AppManager2 = _interopRequireDefault(_AppManager);

var _ContactList = require('../views/ContactList');

var _ContactList2 = _interopRequireDefault(_ContactList);

var _Chat = require('../views/Chat');

var _Chat2 = _interopRequireDefault(_Chat);

var _ErrorModal = require('../views/modals/ErrorModal');

var _ErrorModal2 = _interopRequireDefault(_ErrorModal);

var _SettingsModal = require('../views/modals/SettingsModal');

var _SettingsModal2 = _interopRequireDefault(_SettingsModal);

var _TransactionModal = require('../views/modals/TransactionModal');

var _TransactionModal2 = _interopRequireDefault(_TransactionModal);

var _Footer = require('../views/Footer');

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