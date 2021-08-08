'use strict';

// Copyright (c) 2018 Nguyen Vu Nhat Minh
// Distributed under the MIT software license, see the accompanying file LICENSE

module.exports.NETWORK_LIST = [{
    id: 1,
    name: 'Main Network',
    contractAddress: '0x163485b3cddc7b3202e56ad31fb1921a00759f21',
    explorerUrl: 'https://etherscan.io/',
    providerUrl: 'https://mainnet.infura.io/Q2aBIgYNhIB60VsqyrN1'
},
// {
//     id: 4,
//     name: 'Rinkeby Test Net',
//     contractAddress: '0xa8d27Eda6518Ac6CcF3eb7Ec100B1fc8ef850e80',
//     explorerUrl: 'https://rinkeby.etherscan.io/',
//     providerUrl: 'https://rinkeby.infura.io/Q2aBIgYNhIB60VsqyrN1'
// }
{
    id: 4,
    name: 'Rinkeby Test Net',
    contractAddress: '0x6f8EAEB65247b9e286f6a93246354Ab7D334c634',
    explorerUrl: 'https://rinkeby.etherscan.io/',
    providerUrl: 'https://rinkeby.infura.io/v3/f021c9ca63cd413aa4ed5415cb9ebdd7'
}];

module.exports.ENV = {
    get ContractAddress() {
        if (typeof Storage !== 'undefined' && window.localStorage.ethNetwork != undefined) {
            var network = parseInt(window.localStorage.ethNetwork);
            for (var i = 0; i < module.exports.NETWORK_LIST.length; i++) {
                if (network == module.exports.NETWORK_LIST[i].id) {
                    return module.exports.NETWORK_LIST[i].contractAddress;
                }
            }
        } else {
            return "";
        }
    },

    get NetworkName() {
        if (typeof Storage !== 'undefined' && window.localStorage.ethNetwork != undefined) {
            var network = parseInt(window.localStorage.ethNetwork);
            for (var i = 0; i < module.exports.NETWORK_LIST.length; i++) {
                if (network == module.exports.NETWORK_LIST[i].id) {
                    return module.exports.NETWORK_LIST[i].name;
                }
            }
        } else {
            return "";
        }
    },

    get ProviderUrl() {
        if (typeof Storage !== 'undefined' && window.localStorage.ethNetwork != undefined) {
            var network = parseInt(window.localStorage.ethNetwork);
            for (var i = 0; i < module.exports.NETWORK_LIST.length; i++) {
                if (network == module.exports.NETWORK_LIST[i].id) {
                    return module.exports.NETWORK_LIST[i].providerUrl;
                }
            }
        } else {
            return module.exports.NETWORK_LIST[0].providerUrl;
        }
    },

    get ExplorerUrl() {
        if (typeof Storage !== 'undefined' && window.localStorage.ethNetwork != undefined) {
            var network = parseInt(window.localStorage.ethNetwork);
            for (var i = 0; i < module.exports.NETWORK_LIST.length; i++) {
                if (network == module.exports.NETWORK_LIST[i].id) {
                    return module.exports.NETWORK_LIST[i].explorerUrl;
                }
            }
        } else {
            return module.exports.NETWORK_LIST[0].explorerUrl;
        }
    },

    set EthNetworkId(networkId) {
        if (typeof Storage != 'undefined') {
            window.localStorage.setItem('ethNetwork', networkId);
        }
    },

    get EthNetworkId() {
        if (typeof Storage !== 'undefined' || window.localStorage.ethNetwork == undefined) {
            return parseInt(window.localStorage.ethNetwork);
        } else {
            return 0;
        }
    }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN1cHBvcnQvQ29uZmlnLmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJORVRXT1JLX0xJU1QiLCJpZCIsIm5hbWUiLCJjb250cmFjdEFkZHJlc3MiLCJleHBsb3JlclVybCIsInByb3ZpZGVyVXJsIiwiRU5WIiwiQ29udHJhY3RBZGRyZXNzIiwiU3RvcmFnZSIsIndpbmRvdyIsImxvY2FsU3RvcmFnZSIsImV0aE5ldHdvcmsiLCJ1bmRlZmluZWQiLCJuZXR3b3JrIiwicGFyc2VJbnQiLCJpIiwibGVuZ3RoIiwiTmV0d29ya05hbWUiLCJQcm92aWRlclVybCIsIkV4cGxvcmVyVXJsIiwiRXRoTmV0d29ya0lkIiwibmV0d29ya0lkIiwic2V0SXRlbSJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBOztBQUVBLE9BQUEsQUFBTyxRQUFQLEFBQWU7UUFDWCxBQUNRLEFBQ0o7VUFGSixBQUVVLEFBQ047cUJBSEosQUFHcUIsQUFDakI7aUJBSkosQUFJaUIsQUFDYjtpQkFOc0IsQUFDMUIsQUFLaUI7QUFMakIsQUFDSSxDQUZzQjtBQVExQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEFBQ0k7UUFESixBQUNRLEFBQ0o7VUFGSixBQUVVLEFBQ047cUJBSEosQUFHcUIsQUFDakI7aUJBSkosQUFJaUIsQUFDYjtpQkFwQlIsQUFBOEIsQUFlMUIsQUFLaUI7OztBQUlyQixPQUFBLEFBQU8sUUFBUCxBQUFlO1FBQ1gsQUFBSSxrQkFBa0IsQUFDbEI7WUFBSSxPQUFBLEFBQU8sWUFBUCxBQUFvQixlQUFlLE9BQUEsQUFBTyxhQUFQLEFBQW9CLGNBQTNELEFBQXlFLFdBQVcsQUFDaEY7Z0JBQUksVUFBVSxTQUFTLE9BQUEsQUFBTyxhQUE5QixBQUFjLEFBQTZCLEFBQzNDO2lCQUFLLElBQUksSUFBVCxBQUFXLEdBQUUsSUFBRSxPQUFBLEFBQU8sUUFBUCxBQUFlLGFBQTlCLEFBQTJDLFFBQTNDLEFBQWtELEtBQUssQUFDbkQ7b0JBQUksV0FB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