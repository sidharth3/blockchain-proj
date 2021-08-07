// Copyright (c) 2018 Nguyen Vu Nhat Minh
// Distributed under the MIT software license, see the accompanying file LICENSE

module.exports.NETWORK_LIST = [
    {
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
        contractAddress: '0xf9B5AF24685Ac6Baa88791e180AEBBF927c71335',
        explorerUrl: 'https://rinkeby.etherscan.io/',
        providerUrl: 'https://rinkeby.infura.io/v3/f021c9ca63cd413aa4ed5415cb9ebdd7'
    }
]

module.exports.ENV = {
    get ContractAddress() {
        if (typeof(Storage) !== 'undefined' && window.localStorage.ethNetwork != undefined) {
            var network = parseInt(window.localStorage.ethNetwork);
            for (var i=0;i<module.exports.NETWORK_LIST.length;i++) {
                if (network == module.exports.NETWORK_LIST[i].id) {
                    return module.exports.NETWORK_LIST[i].contractAddress;
                }
            }
        } else {
            return "";
        }
    },

    get NetworkName() {
        if (typeof(Storage) !== 'undefined' && window.localStorage.ethNetwork != undefined) {
            var network = parseInt(window.localStorage.ethNetwork);
            for (var i=0;i<module.exports.NETWORK_LIST.length;i++) {
                if (network == module.exports.NETWORK_LIST[i].id) {
                    return module.exports.NETWORK_LIST[i].name;
                }
            }
        } else {
            return "";
        }
    },

    get ProviderUrl() {
        if (typeof(Storage) !== 'undefined' && window.localStorage.ethNetwork != undefined) {
            var network = parseInt(window.localStorage.ethNetwork);
            for (var i=0;i<module.exports.NETWORK_LIST.length;i++) {
                if (network == module.exports.NETWORK_LIST[i].id) {
                    return module.exports.NETWORK_LIST[i].providerUrl;
                }
            }
        } else {
            return module.exports.NETWORK_LIST[0].providerUrl;
        }
    },

    get ExplorerUrl() {
        if (typeof(Storage) !== 'undefined' && window.localStorage.ethNetwork != undefined) {
            var network = parseInt(window.localStorage.ethNetwork);
            for (var i=0;i<module.exports.NETWORK_LIST.length;i++) {
                if (network == module.exports.NETWORK_LIST[i].id) {
                    return module.exports.NETWORK_LIST[i].explorerUrl;
                }
            }
        } else {
            return module.exports.NETWORK_LIST[0].explorerUrl;
        }
    },

    set EthNetworkId(networkId) {
        if (typeof(Storage) != 'undefined') {
            window.localStorage.setItem('ethNetwork', networkId);
        }
    },

    get EthNetworkId() {
        if (typeof(Storage) !== 'undefined' || window.localStorage.ethNetwork == undefined) {
            return parseInt(window.localStorage.ethNetwork);
        } else {
            return 0;
        }
    }
}