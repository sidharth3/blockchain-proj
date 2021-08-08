'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _AccountManager = require('./AccountManager');

var _AccountManager2 = _interopRequireDefault(_AccountManager);

var _LocalStorageManager = require('./LocalStorageManager');

var _LocalStorageManager2 = _interopRequireDefault(_LocalStorageManager);

var _ContractManager = require('./ContractManager');

var _ContractManager2 = _interopRequireDefault(_ContractManager);

var _EventHandler = require('./EventHandler');

var _EventHandler2 = _interopRequireDefault(_EventHandler);

var _AppDispatcher = require('./AppDispatcher');

var _AppDispatcher2 = _interopRequireDefault(_AppDispatcher);

var _Constant = require('../support/Constant');

var _Constant2 = _interopRequireDefault(_Constant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Manage all core components of this web app includes:
 *  - contractManager: to interactive with EtherChat smart contract
 *  - storageManager: store/retrive data from window.localStorage
 *  - account: manage the local ethereum account
 * 
 * Only one instance of the App manager will be created.
 */

var AppManager = function () {
    function AppManager() {
        var _this = this;

        (0, _classCallCheck3.default)(this, AppManager);

        this.getProfileFromContract = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
            var profile;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return _this.contractManager.getProfile();

                        case 2:
                            profile = _context.sent;

                            _this.account.setProfile(profile.name, profile.avatarUrl, profile.isJoined);

                        case 4:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this);
        }));

        this.startEventHandler = function (accountAddress) {
            _this.eventHandler = new _EventHandler2.default(accountAddress, _this.contractManager, _this.storageManager);
            _this.eventHandler.start();
        };
    }

    (0, _createClass3.default)(AppManager, [{
        key: 'initialize',
        value: function initialize() {
            var _this2 = this;

            this.storageManager = new _LocalStorageManager2.default();
            this.storageManager.initialize();

            this.account = new _AccountManager2.default(this.storageManager);
            this.contractManager = new _ContractManager2.default(this.account, this.storageManager);

            // Need to wait until the smart contract instance in this.contractManager is ready for using
            // because it will take sometime to create the web3 contract instance.
            _AppDispatcher2.default.register(function (payload) {
                if (payload.action == _Constant2.default.EVENT.CONTRACT_READY) {
                    var accountAddress = _this2.account.getAddress();
                    if (accountAddress) {
                        _this2.startEventHandler(accountAddress);
                        _this2.getProfileFromContract();
                    }
                }
            });
        }

        // Start to listen to EtherChat's events

    }, {
        key: 'getTransactionDispatcher',
        value: function getTransactionDispatcher() {
            if (this.contractManager) {
                return this.contractManager.transactionManager.dispatcher;
            }
        }
    }]);

    return AppManager;
}();

exports.default = AppManager;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvQXBwTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJBY2NvdW50TWFuYWdlciIsIkxvY2FsU3RvcmFnZU1hbmFnZXIiLCJDb250cmFjdE1hbmFnZXIiLCJFdmVudEhhbmRsZXIiLCJhcHBEaXNwYXRjaGVyIiwiQ29uc3RhbnQiLCJBcHBNYW5hZ2VyIiwiZ2V0UHJvZmlsZUZyb21Db250cmFjdCIsImNvbnRyYWN0TWFuYWdlciIsImdldFByb2ZpbGUiLCJwcm9maWxlIiwiYWNjb3VudCIsInNldFByb2ZpbGUiLCJuYW1lIiwiYXZhdGFyVXJsIiwiaXNKb2luZWQiLCJzdGFydEV2ZW50SGFuZGxlciIsImFjY291bnRBZGRyZXNzIiwiZXZlbnRIYW5kbGVyIiwic3RvcmFnZU1hbmFnZXIiLCJzdGFydCIsImluaXRpYWxpemUiLCJyZWdpc3RlciIsInBheWxvYWQiLCJhY3Rpb24iLCJFVkVOVCIsIkNPTlRSQUNUX1JFQURZIiwiZ2V0QWRkcmVzcyIsInRyYW5zYWN0aW9uTWFuYWdlciIsImRpc3BhdGNoZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxBQUFPLEFBQVAsQUFBMkIsQUFBM0I7Ozs7QUFDQSxBQUFPLEFBQVAsQUFBZ0MsQUFBaEM7Ozs7QUFDQSxBQUFPLEFBQVAsQUFBNEIsQUFBNUI7Ozs7QUFDQSxBQUFPLEFBQVAsQUFBeUIsQUFBekI7Ozs7QUFDQSxBQUFPLEFBQVAsQUFBMEIsQUFBMUI7Ozs7QUFDQSxBQUFPLEFBQVAsQUFBcUIsQUFBckI7Ozs7OztBQUVBOzs7Ozs7Ozs7SUFTTSxBOzs7Ozs7YUFxQkYsQSxrR0FBeUIsbUJBQUE7Z0JBQUE7MEVBQUE7MEJBQUE7cURBQUE7NkJBQUE7NENBQUE7bUNBQ0QsTUFBSyxBQUFMLGdCQUFxQixBQUFyQixBQURDOzs2QkFDakI7QUFEaUIsK0NBRXJCOztrQ0FBSyxBQUFMLFFBQWEsQUFBYixXQUF3QixRQUFRLEFBQWhDLE1BQXNDLFFBQVEsQUFBOUMsV0FBeUQsUUFBUSxBQUFqRSxBQUZxQjs7NkJBQUE7NkJBQUE7NENBQUE7O0FBQUE7d0JBQUE7QTs7YUFNekIsQSxvQkFBb0IsVUFBQyxBQUFELGdCQUFvQixBQUNwQztrQkFBSyxBQUFMLGVBQW9CLEFBQUksQUFBSiwyQkFBaUIsQUFBakIsZ0JBQWlDLE1BQUssQUFBdEMsaUJBQXVELE1BQUssQUFBNUQsQUFBcEIsQUFDQTtrQkFBSyxBQUFMLGFBQWtCLEFBQWxCLEFBQ0g7QTs7Ozs7cUNBN0JZO3lCQUNUOztpQkFBSyxBQUFMLGlCQUFzQixBQUFJLEFBQUosQUFBdEIsQUFDQTtpQkFBSyxBQUFMLGVBQW9CLEFBQXBCLEFBRUE7O2lCQUFLLEFBQUwsVUFBZSxBQUFJLEFBQUosNkJBQW1CLEtBQUssQUFBeEIsQUFBZixBQUNBO2lCQUFLLEFBQUwsa0JBQXVCLEFBQUksQUFBSiw4QkFBb0IsS0FBSyxBQUF6QixTQUFrQyxLQUFLLEFBQXZDLEFBQXZCLEFBRUE7O0FBQ0E7QUFDQTtvQ0FBYyxBQUFkLFNBQXVCLFVBQUMsQUFBRCxTQUFhLEFBQ2hDO29CQUFJLFFBQVEsQUFBUixVQUFrQixtQkFBUyxBQUFULE1BQWUsQUFBckMsZ0JBQXFELEFBQ2pEO3dCQUFJLGlCQUFpQixPQUFLLEFBQUwsUUFBYSxBQUFiLEFBQXJCLEFBQ0E7d0JBQUksQUFBSixnQkFBb0IsQUFDaEI7K0JBQUssQUFBTCxrQkFBdUIsQUFBdkIsQUFDQTsrQkFBSyxBQUFMLEFBQ0g7QUFDSjtBQUNKO0FBUkQsQUFTSDtBQU9EOzs7Ozs7bURBTTJCLEFBQ3ZCO2dCQUFJLEtBQUssQUFBVCxpQkFBMEIsQUFDdEI7dUJBQU8sS0FBSyxBQUFMLGdCQUFxQixBQUFyQixtQkFBd0MsQUFBL0MsQUFDSDtBQUNKOzs7OztBQUdMOztrQkFBZSxBQUFmIiwiZmlsZSI6IkFwcE1hbmFnZXIuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvdmljdG9ycGhhbTE5OTcvV29ya3BsYWNlL1NVVEQvNTAwMzdfYmxvY2tjaGFpbi9ibG9ja2NoYWluLXByb2oifQ==