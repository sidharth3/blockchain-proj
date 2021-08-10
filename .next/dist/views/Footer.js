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

var _Constant = require('../support/Constant');

var _Constant2 = _interopRequireDefault(_Constant);

var _semanticUiReact = require('semantic-ui-react');

var _AppDispatcher = require('../core/AppDispatcher');

var _AppDispatcher2 = _interopRequireDefault(_AppDispatcher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/thebe/Desktop/blockchain-proj/views/Footer.js';
// Copyright (c) 2018 Nguyen Vu Nhat Minh
// Distributed under the MIT software license, see the accompanying file LICENSE

var Footer = function (_Component) {
    (0, _inherits3.default)(Footer, _Component);

    function Footer() {
        (0, _classCallCheck3.default)(this, Footer);

        return (0, _possibleConstructorReturn3.default)(this, (Footer.__proto__ || (0, _getPrototypeOf2.default)(Footer)).apply(this, arguments));
    }

    (0, _createClass3.default)(Footer, [{
        key: 'openGuide',
        value: function openGuide(e) {
            e.preventDefault();
            _AppDispatcher2.default.dispatch({
                action: _Constant2.default.ACTION.OPEN_GUIDE
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement('div', { style: { textAlign: 'center', marginTop: 10, marginBottom: 10 }, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 19
                }
            }, _react2.default.createElement('a', { href: '/', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 20
                }
            }, 'Home'), _react2.default.createElement('a', { style: { marginLeft: 20 }, onClick: this.openGuide, href: '#', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 21
                }
            }, 'Guide'), _react2.default.createElement('a', { style: { marginLeft: 20 }, href: '/terms', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 22
                }
            }, 'Term of use'), _react2.default.createElement('a', { style: { marginLeft: 20 }, href: '/about', __source: {
                    fileName: _jsxFileName,
                    lineNumber: 23
                }
            }, 'About ', _Constant2.default.APP_NAME));
        }
    }]);

    return Footer;
}(_react.Component);

exports.default = Footer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZXdzL0Zvb3Rlci5qcyJdLCJuYW1lcyI6WyJDb21wb25lbnQiLCJDb25zdGFudCIsIkJ1dHRvbiIsImFwcERpc3BhdGNoZXIiLCJGb290ZXIiLCJlIiwicHJldmVudERlZmF1bHQiLCJkaXNwYXRjaCIsImFjdGlvbiIsIkFDVElPTiIsIk9QRU5fR1VJREUiLCJ0ZXh0QWxpZ24iLCJtYXJnaW5Ub3AiLCJtYXJnaW5Cb3R0b20iLCJtYXJnaW5MZWZ0Iiwib3Blbkd1aWRlIiwiQVBQX05BTUUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUlBLEFBQU8sQUFBYzs7OztBQUNyQixBQUFROztBQUNSLEFBQU8sQUFBbUI7Ozs7Ozs7QUFOMUI7QUFDQSxBQUVBLEFBQVE7O0ksQUFLRjs7Ozs7Ozs7Ozs7a0MsQUFDUSxHQUFHLEFBQ1Q7Y0FBQSxBQUFFLEFBQ0Y7b0NBQUEsQUFBYzt3QkFDRixtQkFBQSxBQUFTLE9BRHJCLEFBQXVCLEFBQ0ssQUFFL0I7QUFIMEIsQUFDbkI7Ozs7aUNBSUMsQUFDTDttQ0FDSSxjQUFBLFNBQUssT0FBTyxFQUFDLFdBQUQsQUFBWSxVQUFVLFdBQXRCLEFBQWlDLElBQUksY0FBakQsQUFBWSxBQUFtRDs4QkFBL0Q7Z0NBQUEsQUFDQTtBQURBO2FBQUEsa0JBQ0EsY0FBQSxPQUFHLE1BQUgsQUFBUTs4QkFBUjtnQ0FBQTtBQUFBO2VBREEsQUFDQSxBQUNBLHlCQUFBLGNBQUEsT0FBRyxPQUFPLEVBQUMsWUFBWCxBQUFVLEFBQWEsTUFBSyxTQUFTLEtBQXJDLEFBQTBDLFdBQVcsTUFBckQsQUFBMEQ7OEJBQTFEO2dDQUFBO0FBQUE7ZUFGQSxBQUVBLEFBQ0EsMEJBQUEsY0FBQSxPQUFHLE9BQU8sRUFBQyxZQUFYLEFBQVUsQUFBYSxNQUFLLE1BQTVCLEFBQWlDOzhCQUFqQztnQ0FBQTtBQUFBO2VBSEEsQUFHQSxBQUNBLGdDQUFBLGNBQUEsT0FBRyxPQUFPLEVBQUMsWUFBWCxBQUFVLEFBQWEsTUFBSyxNQUE1QixBQUFpQzs4QkFBakM7Z0NBQUE7QUFBQTtlQUFpRCw2QkFMckQsQUFDSSxBQUlBLEFBQTBELEFBR2pFOzs7OztBQUdMLEEsQUFwQnFCOztrQkFvQnJCLEFBQWUiLCJmaWxlIjoiRm9vdGVyLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy90aGViZS9EZXNrdG9wL2Jsb2NrY2hhaW4tcHJvaiJ9