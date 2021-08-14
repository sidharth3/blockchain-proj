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
 *  - contractManager: to interactive with ethmessenger smart contract
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
                        console.log("asdfasdfadsfa");
                        _this2.startEventHandler(accountAddress);
                        _this2.getProfileFromContract();
                    }
                }
            });
        }

        // Start to listen to ethmessenger's events

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvQXBwTWFuYWdlci5qcyJdLCJuYW1lcyI6WyJBY2NvdW50TWFuYWdlciIsIkxvY2FsU3RvcmFnZU1hbmFnZXIiLCJDb250cmFjdE1hbmFnZXIiLCJFdmVudEhhbmRsZXIiLCJhcHBEaXNwYXRjaGVyIiwiQ29uc3RhbnQiLCJBcHBNYW5hZ2VyIiwiZ2V0UHJvZmlsZUZyb21Db250cmFjdCIsImNvbnRyYWN0TWFuYWdlciIsImdldFByb2ZpbGUiLCJwcm9maWxlIiwiYWNjb3VudCIsInNldFByb2ZpbGUiLCJuYW1lIiwiYXZhdGFyVXJsIiwiaXNKb2luZWQiLCJzdGFydEV2ZW50SGFuZGxlciIsImFjY291bnRBZGRyZXNzIiwiZXZlbnRIYW5kbGVyIiwic3RvcmFnZU1hbmFnZXIiLCJzdGFydCIsImluaXRpYWxpemUiLCJyZWdpc3RlciIsInBheWxvYWQiLCJhY3Rpb24iLCJFVkVOVCIsIkNPTlRSQUNUX1JFQURZIiwiZ2V0QWRkcmVzcyIsImNvbnNvbGUiLCJsb2ciLCJ0cmFuc2FjdGlvbk1hbmFnZXIiLCJkaXNwYXRjaGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsQUFBTyxBQUFQLEFBQTJCLEFBQTNCOzs7O0FBQ0EsQUFBTyxBQUFQLEFBQWdDLEFBQWhDOzs7O0FBQ0EsQUFBTyxBQUFQLEFBQTRCLEFBQTVCOzs7O0FBQ0EsQUFBTyxBQUFQLEFBQXlCLEFBQXpCOzs7O0FBQ0EsQUFBTyxBQUFQLEFBQTBCLEFBQTFCOzs7O0FBQ0EsQUFBTyxBQUFQLEFBQXFCLEFBQXJCOzs7Ozs7QUFFQTs7Ozs7Ozs7O0lBU00sQTs7Ozs7O2FBc0JGLEEsa0dBQXlCLG1CQUFBO2dCQUFBOzBFQUFBOzBCQUFBO3FEQUFBOzZCQUFBOzRDQUFBO21DQUNELE1BQUssQUFBTCxnQkFBcUIsQUFBckIsQUFEQzs7NkJBQ2pCO0FBRGlCLCtDQUVyQjs7a0NBQUssQUFBTCxRQUFhLEFBQWIsV0FBd0IsUUFBUSxBQUFoQyxNQUFzQyxRQUFRLEFBQTlDLFdBQXlELFFBQVEsQUFBakUsQUFGcUI7OzZCQUFBOzZCQUFBOzRDQUFBOztBQUFBO3dCQUFBO0E7O2FBTXpCLEEsb0JBQW9CLFVBQUMsQUFBRCxnQkFBb0IsQUFDcEM7a0JBQUssQUFBTCxlQUFvQixBQUFJLEFBQUosMkJBQWlCLEFBQWpCLGdCQUFpQyxNQUFLLEFBQXRDLGlCQUF1RCxNQUFLLEFBQTVELEFBQXBCLEFBQ0E7a0JBQUssQUFBTCxhQUFrQixBQUFsQixBQUNIO0E7Ozs7O3FDQTlCWTt5QkFDVDs7aUJBQUssQUFBTCxpQkFBc0IsQUFBSSxBQUFKLEFBQXRCLEFBQ0E7aUJBQUssQUFBTCxlQUFvQixBQUFwQixBQUVBOztpQkFBSyxBQUFMLFVBQWUsQUFBSSxBQUFKLDZCQUFtQixLQUFLLEFBQXhCLEFBQWYsQUFDQTtpQkFBSyxBQUFMLGtCQUF1QixBQUFJLEFBQUosOEJBQW9CLEtBQUssQUFBekIsU0FBa0MsS0FBSyxBQUF2QyxBQUF2QixBQUVBOztBQUNBO0FBQ0E7b0NBQWMsQUFBZCxTQUF1QixVQUFDLEFBQUQsU0FBYSxBQUNoQztvQkFBSSxRQUFRLEFBQVIsVUFBa0IsbUJBQVMsQUFBVCxNQUFlLEFBQXJDLGdCQUFxRCxBQUNqRDt3QkFBSSxpQkFBaUIsT0FBSyxBQUFMLFFBQWEsQUFBYixBQUFyQixBQUNBO3dCQUFJLEFBQUosZ0JBQW9CLEFBQ2hCO2dDQUFRLEFBQVIsSUFBWSxBQUFaLEFBQ0E7K0JBQUssQUFBTCxrQkFBdUIsQUFBdkIsQUFDQTsrQkFBSyxBQUFMLEFBQ0g7QUFDSjtBQUNKO0FBVEQsQUFVSDtBQU9EOzs7Ozs7bURBTTJCLEFBQ3ZCO2dCQUFJLEtBQUssQUFBVCxpQkFBMEIsQUFDdEI7dUJBQU8sS0FBSyxBQUFMLGdCQUFxQixBQUFyQixtQkFBd0MsQUFBL0MsQUFDSDtBQUNKOzs7OztBQUdMOztrQkFBZSxBQUFmIiwiZmlsZSI6IkFwcE1hbmFnZXIuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3RoZWJlL0Rlc2t0b3AvYmxvY2tjaGFpbi1wcm9qIn0=