'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _web = require('web3');

var _web2 = _interopRequireDefault(_web);

var _Config = require('../support/Config');

var _Config2 = _interopRequireDefault(_Config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright (c) 2018 Nguyen Vu Nhat Minh
// Distributed under the MIT software license, see the accompanying file LICENSE

var web3 = void 0;

var provider = new _web2.default.providers.HttpProvider(_Config2.default.ENV.ProviderUrl);
web3 = new _web2.default(provider);

exports.default = web3;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV0aGVyZXVtL3dlYjMuanMiXSwibmFtZXMiOlsiV2ViMyIsIkNvbmZpZyIsIndlYjMiLCJwcm92aWRlciIsInByb3ZpZGVycyIsIkh0dHBQcm92aWRlciIsIkVOViIsIlByb3ZpZGVyVXJsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFHQSxBQUFPOzs7O0FBQ1AsQUFBTyxBQUFZOzs7Ozs7QUFKbkI7QUFDQTs7QUFLQSxJQUFJLFlBQUo7O0FBRUEsSUFBTSxXQUFXLElBQUksY0FBQSxBQUFLLFVBQVQsQUFBbUIsYUFBYSxpQkFBQSxBQUFPLElBQXhELEFBQWlCLEFBQTJDO0FBQzVELE9BQU8sQUFBSSxrQkFBWCxBQUFPLEFBQVMsQUFFaEI7O2tCQUFBLEFBQWUiLCJmaWxlIjoid2ViMy5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvdGhlYmUvRGVza3RvcC9ibG9ja2NoYWluLXByb2oifQ==