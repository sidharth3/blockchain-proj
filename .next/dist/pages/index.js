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
            return _react2.default.createElement(_semanticUiReact.Container, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 63
                }
            }, _react2.default.createElement(_head2.default, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 64
                }
            }, _react2.default.createElement('title', {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 65
                }
            }, 'EtherChat - Decentralized messaging on Ethereum network')), _react2.default.createElement(_UpdateProfileModal2.default, { account: account, contractManager: contractManager, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 68
                }
            }), _react2.default.createElement(_EnterPrivateKeyModal2.default, { account: account, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 69
                }
            }), _react2.default.createElement(_HeaderMenu2.default, { account: account, transactionDispatcher: transactionDispatcher, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 70
                }
            }), _react2.default.createElement(_GuideModal2.default, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 71
                }
            }), _react2.default.createElement(_ErrorModal2.default, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 72
                }
            }), _react2.default.createElement(_SettingsModal2.default, { account: account, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 73
                }
            }), _react2.default.createElement(_TransactionModal2.default, { dispatcher: transactionDispatcher, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 74
                }
            }), _react2.default.createElement(_semanticUiReact.Grid, { column: 2, style: { paddingTop: 100 }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 75
                }
            }, _react2.default.createElement(_semanticUiReact.Grid.Row, { stretched: true, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 76
                }
            }, _react2.default.createElement(_semanticUiReact.Grid.Column, { width: 6, style: { height: listHeight + "px", float: 'left' }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 77
                }
            }, _react2.default.createElement(_ContactList2.default, { height: listHeight, account: account, contractManager: contractManager, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 78
                }
            })), _react2.default.createElement(_semanticUiReact.Grid.Column, { width: 10, style: { height: listHeight + "px", overflow: 'auto', float: 'left' }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 80
                }
            }, _react2.default.createElement(_Chat2.default, { height: listHeight, account: account, contractManager: contractManager, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 81
                }
            })))), _react2.default.createElement(_Footer2.default, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 85
                }
            }));
        }
    }]);

    return Index;
}(_react.Component);

exports.default = Index;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL2luZGV4LmpzIl0sIm5hbWVzIjpbIkNvbXBvbmVudCIsIkJ1dHRvbiIsIkNvbnRhaW5lciIsIkxpc3QiLCJJbWFnZSIsIkdyaWQiLCJNZXNzYWdlIiwiUmFpbCIsIlN0aWNreSIsIklucHV0IiwiU2VnbWVudCIsIkhlYWRlck1lbnUiLCJ3ZWIzIiwiUHJpdmF0ZUtleU1vZGFsIiwiVXBkYXRlUHJvZmlsZU1vZGFsIiwiR3VpZGVNb2RhbCIsIkhlYWQiLCJBcHBNYW5hZ2VyIiwiQ29udGFjdExpc3QiLCJDaGF0IiwiRXJyb3JNb2RhbCIsIlNldHRpbmdzTW9kYWwiLCJUcmFuc2FjdGlvbk1vZGFsIiwiRm9vdGVyIiwiSW5kZXgiLCJwcm9wcyIsInN0YXRlIiwid2lkdGgiLCJoZWlnaHQiLCJjb250YWN0TGlzdCIsIm1lc3NhZ2VzIiwic2VsZWN0ZWRDb250YWN0IiwidXBkYXRlV2luZG93RGltZW5zaW9ucyIsImJpbmQiLCJhcHAiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwiaW5pdGlhbGl6ZSIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJzZXRTdGF0ZSIsImlubmVyV2lkdGgiLCJpbm5lckhlaWdodCIsImFjY291bnQiLCJjb250cmFjdE1hbmFnZXIiLCJ0cmFuc2FjdGlvbkRpc3BhdGNoZXIiLCJnZXRUcmFuc2FjdGlvbkRpc3BhdGNoZXIiLCJsaXN0SGVpZ2h0IiwicGFkZGluZ1RvcCIsImZsb2F0Iiwib3ZlcmZsb3ciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUlBLEFBQ0ksQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0E7O0FBRUosQUFBTyxBQUFnQjs7OztBQUN2QixBQUFPLEFBQVU7Ozs7QUFDakIsQUFBTyxBQUFxQjs7OztBQUM1QixBQUFPLEFBQXdCOzs7O0FBQy9CLEFBQU8sQUFBZ0I7Ozs7QUFDdkIsQUFBTzs7OztBQUNQLEFBQU8sQUFBZ0I7Ozs7QUFDdkIsQUFBTyxBQUFpQjs7OztBQUN4QixBQUFPLEFBQVU7Ozs7QUFDakIsQUFBTyxBQUFnQjs7OztBQUN2QixBQUFPLEFBQW1COzs7O0FBQzFCLEFBQU8sQUFBc0I7Ozs7QUFDN0IsQUFBTyxBQUFZOzs7Ozs7O0FBNUJuQjtBQUNBLEFBRUEsQUFBUTs7SUEyQkYsQTttQ0FDRjs7bUJBQUEsQUFBWSxPQUFPOzRDQUFBOzt3SUFBQSxBQUNULEFBQ047O2NBQUEsQUFBSyxRQUFRLEVBQUUsT0FBRixBQUFTLEdBQUcsUUFBWixBQUFvQixHQUFHLGFBQXZCLEFBQW9DLElBQUksVUFBeEMsQUFBa0QsSUFBSSxpQkFBbkUsQUFBYSxBQUF1RSxBQUNwRjtjQUFBLEFBQUsseUJBQXlCLE1BQUEsQUFBSyx1QkFBTCxBQUE0QixLQUExRCxBQUNBO2NBQUEsQUFBSyxNQUpVLEFBSWYsQUFBVyxBQUFJO2VBQ2xCOzs7Ozs0Q0FFbUIsQUFDaEI7aUJBQUEsQUFBSyxBQUNMO21CQUFBLEFBQU8saUJBQVAsQUFBd0IsVUFBVSxLQUFsQyxBQUF1QyxBQUMxQzs7Ozs2Q0FFb0IsQUFDakI7aUJBQUEsQUFBSyxJQUFMLEFBQVMsQUFDWjs7OzsrQ0FFc0IsQUFDbkI7bUJBQUEsQUFBTyxvQkFBUCxBQUEyQixVQUFVLEtBQXJDLEFBQTBDLEFBQzdDOzs7O2lEQUV3QixBQUNyQjtpQkFBQSxBQUFLLFNBQVMsRUFBRSxPQUFPLE9BQVQsQUFBZ0IsWUFBWSxRQUFRLE9BQWxELEFBQWMsQUFBMkMsQUFDNUQ7Ozs7aUNBRVEsQUFDTDtnQkFBSSxVQUFVLEtBQUEsQUFBSyxJQUFuQixBQUF1QixBQUN2QjtnQkFBSSxrQkFBa0IsS0FBQSxBQUFLLElBQTNCLEFBQStCLEFBQy9CO2dCQUFJLHdCQUF3QixLQUFBLEFBQUssSUFBakMsQUFBNEIsQUFBUyxBQUVyQzs7Z0JBQUksYUFBYSxLQUFBLEFBQUssTUFBTCxBQUFXLFNBQTVCLEFBQXFDLEFBQ3JDO21DQUNJLEFBQUM7OzhCQUFEO2dDQUFBLEFBQ0k7QUFESjtBQUFBLGFBQUEsa0JBQ0ksQUFBQzs7OEJBQUQ7Z0NBQUEsQUFDSTtBQURKO0FBQUEsK0JBQ0ksY0FBQTs7OEJBQUE7Z0NBQUE7QUFBQTtBQUFBLGVBRlIsQUFDSSxBQUNJLEFBR0osNkVBQUEsQUFBQyw4Q0FBbUIsU0FBcEIsQUFBNkIsU0FBUyxpQkFBdEMsQUFBdUQ7OEJBQXZEO2dDQUxKLEFBS0ksQUFDQTtBQURBO2dDQUNBLEFBQUMsZ0RBQWdCLFNBQWpCLEFBQTBCOzhCQUExQjtnQ0FOSixBQU1JLEFBQ0E7QUFEQTtnQ0FDQSxBQUFDLHNDQUFXLFNBQVosQUFBcUIsU0FBUyx1QkFBOUIsQUFBcUQ7OEJBQXJEO2dDQVBKLEFBT0ksQUFDQTtBQURBO2dDQUNBLEFBQUM7OzhCQUFEO2dDQVJKLEFBUUksQUFDQTtBQURBO0FBQUEsZ0NBQ0EsQUFBQzs7OEJBQUQ7Z0NBVEosQUFTSSxBQUNBO0FBREE7QUFBQSxnQ0FDQSxBQUFDLHlDQUFjLFNBQWYsQUFBd0I7OEJBQXhCO2dDQVZKLEFBVUksQUFDQTtBQURBO2dDQUNBLEFBQUMsNENBQWlCLFlBQWxCLEFBQThCOzhCQUE5QjtnQ0FYSixBQVdJLEFBQ0o7QUFESTtnQ0FDSixBQUFDLHVDQUFLLFFBQU4sQUFBYyxHQUFHLE9BQU8sRUFBQyxZQUF6QixBQUF3QixBQUFhOzhCQUFyQztnQ0FBQSxBQUNJO0FBREo7K0JBQ0ssY0FBRCxzQkFBQSxBQUFNLE9BQUksV0FBVjs4QkFBQTtnQ0FBQSxBQUNJO0FBREo7K0JBQ0ssY0FBRCxzQkFBQSxBQUFNLFVBQU8sT0FBYixBQUFvQixHQUFHLE9BQU8sRUFBQyxRQUFRLGFBQVQsQUFBc0IsTUFBTSxPQUExRCxBQUE4QixBQUFtQzs4QkFBakU7Z0NBQUEsQUFDSTtBQURKOytCQUNJLEFBQUMsdUNBQVksUUFBYixBQUFxQixZQUFZLFNBQWpDLEFBQTBDLFNBQVMsaUJBQW5ELEFBQW9FOzhCQUFwRTtnQ0FGUixBQUNJLEFBQ0ksQUFFSjtBQUZJO2lDQUVILGNBQUQsc0JBQUEsQUFBTSxVQUFPLE9BQWIsQUFBb0IsSUFBSSxPQUFPLEVBQUMsUUFBUSxhQUFULEFBQXNCLE1BQU0sVUFBNUIsQUFBc0MsUUFBUSxPQUE3RSxBQUErQixBQUFxRDs4QkFBcEY7Z0NBQUEsQUFDSTtBQURKOytCQUNJLEFBQUMsZ0NBQUssUUFBTixBQUFjLFlBQVksU0FBMUIsQUFBbUMsU0FBUyxpQkFBNUMsQUFBNkQ7OEJBQTdEO2dDQWxCWixBQVlBLEFBQ0ksQUFJSSxBQUNJLEFBSVo7QUFKWTttQ0FJWixBQUFDOzs4QkFBRDtnQ0F2QkosQUFDSSxBQXNCQSxBQUdQO0FBSE87QUFBQTs7Ozs7QUF0RFEsQSxBQTREcEI7O2tCQUFBLEFBQWUiLCJmaWxlIjoiaW5kZXguanM/ZW50cnkiLCJzb3VyY2VSb290IjoiL2hvbWUvdmljdG9ycGhhbTE5OTcvV29ya3BsYWNlL1NVVEQvNTAwMzdfYmxvY2tjaGFpbi9ibG9ja2NoYWluLXByb2oifQ==