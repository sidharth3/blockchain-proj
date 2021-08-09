'use strict';

// Copyright (c) 2018 Nguyen Vu Nhat Minh
// Distributed under the MIT software license, see the accompanying file LICENSE

module.exports.NETWORK_LIST = [{
    id: 4,
    name: 'Rinkeby Test Net',
    contractAddress: '0xc938559f04854bc457211F84855a40a7A5AF3045',
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN1cHBvcnQvQ29uZmlnLmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJORVRXT1JLX0xJU1QiLCJpZCIsIm5hbWUiLCJjb250cmFjdEFkZHJlc3MiLCJleHBsb3JlclVybCIsInByb3ZpZGVyVXJsIiwiRU5WIiwiQ29udHJhY3RBZGRyZXNzIiwiU3RvcmFnZSIsIndpbmRvdyIsImxvY2FsU3RvcmFnZSIsImV0aE5ldHdvcmsiLCJ1bmRlZmluZWQiLCJuZXR3b3JrIiwicGFyc2VJbnQiLCJpIiwibGVuZ3RoIiwiTmV0d29ya05hbWUiLCJQcm92aWRlclVybCIsIkV4cGxvcmVyVXJsIiwiRXRoTmV0d29ya0lkIiwibmV0d29ya0lkIiwic2V0SXRlbSJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBOztBQUVBLE9BQUEsQUFBTyxRQUFQLEFBQWU7UUFDWCxBQUNRLEFBQ0o7VUFGSixBQUVVLEFBQ047cUJBSEosQUFHcUIsQUFDakI7aUJBSkosQUFJaUIsQUFDYjtpQkFOUixBQUE4QixBQUMxQixBQUtpQjtBQUxqQixBQUNJLENBRnNCOztBQVU5QixPQUFBLEFBQU8sUUFBUCxBQUFlO1FBQ1gsQUFBSSxrQkFBa0IsQUFDbEI7WUFBSSxPQUFBLEFBQU8sWUFBUCxBQUFvQixlQUFlLE9BQUEsQUFBTyxhQUFQLEFBQW9CLGNBQTNELEFBQXlFLFdBQVcsQUFDaEY7Z0JBQUksVUFBVSxTQUFTLE9BQUEsQUFBTyxhQUE5QixBQUFjLEFBQTZCLEFBQzNDO2lCQUFLLElBQUksSUFBVCxBQUFXLEdBQUUsSUFBRSxPQUFBLEFBQU8sUUFBUCxBQUFlLGFBQTlCLEFBQTJDLFFBQTNDLEFBQWtELEtBQUssQUFDbkQ7b0JBQUksV0FBVyxPQUFBLEFBQU8sUUFBUCxBQUFlLGFBQWYsQUFBNEIsR0FBM0MsQUFBOEMsSUFBSSxBQUM5QzsyQkFBTyxPQUFBLEFBQU8sUUFBUCxBQUFlLGFBQWYsQUFBNEIsR0FBbkMsQUFBc0MsQUFDekM7QUFDSjtBQUNKO0FBUEQsZUFPTyxBQUNIO21CQUFBLEFBQU8sQUFDVjtBQUNKO0FBWmdCLEFBY2pCOztRQUFBLEFBQUksY0FBYyxBQUNkO1lBQUksT0FBQSxBQUFPLFlBQVAsQUFBb0IsZUFBZSxPQUFBLEFBQU8sYUFBUCxBQUFvQixjQUEzRCxBQUF5RSxXQUFXLEFBQ2hGO2dCQUFJLFVBQVUsU0FBUyxPQUFBLEFBQU8sYUFBOUIsQUFBYyxBQUE2QixBQUMzQztpQkFBSyxJQUFJLElBQVQsQUFBVyxHQUFFLElBQUUsT0FBQSxBQUFPLFFBQVAsQUFBZSxhQUE5QixBQUEyQyxRQUEzQyxBQUFrRCxLQUFLLEFBQ25EO29CQUFJLFdBQVcsT0FBQSxBQUFPLFFBQVAsQUFBZSxhQUFmLEFBQTRCLEdBQTNDLEFBQThDLElBQUksQUFDOUM7MkJBQU8sT0FBQSxBQUFPLFFBQVAsQUFBZSxhQUFmLEFBQTRCLEdBQW5DLEFBQXNDLEFBQ3pDO0FBQ0o7QUFDSjtBQVBELGVBT08sQUFDSDttQkFBQSxBQUFPLEFBQ1Y7QUFDSjtBQXpCZ0IsQUEyQmpCOztRQUFBLEFBQUksY0FBYyxBQUNkO1lBQUksT0FBQSxBQUFPLFlBQVAsQUFBb0IsZUFBZSxPQUFBLEFBQU8sYUFBUCxBQUFvQixjQUEzRCxBQUF5RSxXQUFXLEFBQ2hGO2dCQUFJLFVBQVUsU0FBUyxPQUFBLEFBQU8sYUFBOUIsQUFBYyxBQUE2QixBQUMzQztpQkFBSyxJQUFJLElBQVQsQUFBVyxHQUFFLElBQUUsT0FBQSxBQUFPLFFBQVAsQUFBZSxhQUE5QixBQUEyQyxRQUEzQyxBQUFrRCxLQUFLLEFBQ25EO29CQUFJLFdBQVcsT0FBQSxBQUFPLFFBQVAsQUFBZSxhQUFmLEFBQTRCLEdBQTNDLEFBQThDLElBQUksQUFDOUM7MkJBQU8sT0FBQSxBQUFPLFFBQVAsQUFBZSxhQUFmLEFBQTRCLEdBQW5DLEFBQXNDLEFBQ3pDO0FBQ0o7QUFDSjtBQVBELGVBT08sQUFDSDttQkFBTyxPQUFBLEFBQU8sUUFBUCxBQUFlLGFBQWYsQUFBNEIsR0FBbkMsQUFBc0MsQUFDekM7QUFDSjtBQXRDZ0IsQUF3Q2pCOztRQUFBLEFBQUksY0FBYyxBQUNkO1lBQUksT0FBQSxBQUFPLFlBQVAsQUFBb0IsZUFBZSxPQUFBLEFBQU8sYUFBUCxBQUFvQixjQUEzRCxBQUF5RSxXQUFXLEFBQ2hGO2dCQUFJLFVBQVUsU0FBUyxPQUFBLEFBQU8sYUFBOUIsQUFBYyxBQUE2QixBQUMzQztpQkFBSyxJQUFJLElBQVQsQUFBVyxHQUFFLElBQUUsT0FBQSxBQUFPLFFBQVAsQUFBZSxhQUE5QixBQUEyQyxRQUEzQyxBQUFrRCxLQUFLLEFBQ25EO29CQUFJLFdBQVcsT0FBQSxBQUFPLFFBQVAsQUFBZSxhQUFmLEFBQTRCLEdBQTNDLEFBQThDLElBQUksQUFDOUM7MkJBQU8sT0FBQSxBQUFPLFFBQVAsQUFBZSxhQUFmLEFBQTRCLEdBQW5DLEFBQXNDLEFBQ3pDO0FBQ0o7QUFDSjtBQVBELGVBT08sQUFDSDttQkFBTyxPQUFBLEFBQU8sUUFBUCxBQUFlLGFBQWYsQUFBNEIsR0FBbkMsQUFBc0MsQUFDekM7QUFDSjtBQW5EZ0IsQUFxRGpCOztRQUFBLEFBQUksYUFBSixBQUFpQixXQUFXLEFBQ3hCO1lBQUksT0FBQSxBQUFPLFdBQVgsQUFBdUIsYUFBYSxBQUNoQzttQkFBQSxBQUFPLGFBQVAsQUFBb0IsUUFBcEIsQUFBNEIsY0FBNUIsQUFBMEMsQUFDN0M7QUFDSjtBQXpEZ0IsQUEyRGpCOztRQUFBLEFBQUksZUFBZSxBQUNmO1lBQUksT0FBQSxBQUFPLFlBQVAsQUFBb0IsZUFBZSxPQUFBLEFBQU8sYUFBUCxBQUFvQixjQUEzRCxBQUF5RSxXQUFXLEFBQ2hGO21CQUFPLFNBQVMsT0FBQSxBQUFPLGFBQXZCLEFBQU8sQUFBNkIsQUFDdkM7QUFGRCxlQUVPLEFBQ0g7bUJBQUEsQUFBTyxBQUNWO0FBQ0o7QUFqRUwsQUFBcUI7QUFBQSxBQUNqQiIsImZpbGUiOiJDb25maWcuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3RoZWJlL0Rlc2t0b3AvYmxvY2tjaGFpbi1wcm9qIn0=