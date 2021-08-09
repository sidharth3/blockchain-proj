// Copyright (c) 2018 Nguyen Vu Nhat Minh
// Distributed under the MIT software license, see the accompanying file LICENSE

import appDispatcher from '../core/AppDispatcher';
import Constant from '../support/Constant';
import utils from '../support/Utils';
import Config from '../support/Config';

class LocalStorageManager {
    initialize() {

        this.contacts = {}; // Map Ethereum addresses with all messages and information belong to an address
        this.reload = 0;
        // this.contactAddresses = [];
        this.loadLocalContactAddresses();
        this.loadContactMessages();
        appDispatcher.dispatch({
            action: Constant.EVENT.CONTACT_LIST_UPDATED
        });
    }

    loadLocalContactAddresses = () => {
        this.contactAddresses = []; // A list of Ethereum addresses in the contact list of the current user.
        if (typeof(Storage) != 'undefined') {
            var rawContactAddresses = window.localStorage.contactAddresses;
            // var contactArray = [];
            // var userAddress = window.localStorage.address;
            // console.log(Config.ENV.ContractAddress);
            if (rawContactAddresses != undefined) {
                // var rawContactArray = JSON.parse(rawContactAddresses);
                // for(var i = 0; i < rawContactArray.length; i++ ){
                //     if(rawContactArray[i].toLowerCase() != userAddress && rawContactArray[i] != Config.ENV.ContractAddress){
                //         this.contactAddresses.push(rawContactArray[i]);
                //     }
                // }
                this.contactAddresses = JSON.parse(rawContactAddresses);
            }
        }
    }

    loadContactMessages = () => {
        if (typeof(Storage) != 'undefined') {
            for (var i=0;i<this.contactAddresses.length;i++) {
                var address = this.contactAddresses[i];
                var localContact = window.localStorage[address];
                this.contacts[address] = JSON.parse(localContact);
            }
        }
    }

    addContact = (address,  publicKey) => {
        if(!this.contactAddresses.includes(address)){
            var user = {};
            user.messages = [];
            user.relationship = 2;
            user.publicKey = publicKey;
            window.localStorage.setItem(address, JSON.stringify(user));
            this.contacts[address] = user;
            this.contactAddresses.push(address);
            window.localStorage.setItem('contactAddresses', JSON.stringify(this.contactAddresses));

        }
        appDispatcher.dispatch({
            action: Constant.EVENT.CONTACT_LIST_UPDATED
        });
    }
 


    updateContact = (address, publicKey, name, avatarUrl, relationship) => {
        var data = this.contacts[address];
        if (data != undefined) {
            if (relationship) {
                data.relationship = relationship;
            }
            if (publicKey) {
                data.publicKey = publicKey;
            }
            if (name) {
                data.name = name;
            }
            if (avatarUrl) {
                data.avatarUrl = avatarUrl;
            }
            window.localStorage.setItem(address, JSON.stringify(data));
            appDispatcher.dispatch({
                action: Constant.EVENT.CONTACT_LIST_UPDATED
            });
        }
    }

    addInvitationEvents = (events) => {
        for (var i=0;i<events.length;i++) {
            this.addContact(events[i].returnValues["from"], Constant.Relationship.NoRelation);
        }
    }

    addRequestEvents = (events) => {
        for (var i=0;i<events.length;i++) {
            this.addContact(events[i].returnValues["to"], Constant.Relationship.Requested);
        }
    }

    addMyAcceptContactEvents = (events) => {
        for (var i=0;i<events.length;i++) {
            this.updateContact(events[i].returnValues["to"], "", "", "", Constant.Relationship.Connected);
        }
    }

    addAcceptContactEvents = (events) => {
        for (var i=0;i<events.length;i++) {
            this.updateContact(events[i].returnValues["from"], "", "", "", Constant.Relationship.Connected);
        }
    }
    addContactFromMessage = (event) =>{
        var data = event.returnValues;
        var senderAddress = data.from;

    }

    addMessageFromFriendEvent = (event) => {
        var data = event.returnValues;
        var fromAddress = data.from;
        var message = {};
        message.isMine = false;
        message.message = data.message;
        message.encryption = utils.hexStringToAsciiString(data.encryption);
        message.txHash = event.transactionHash;
        //TODO: push from address to contactAddress

        this.contacts[fromAddress].messages.push(message);

        window.localStorage.setItem(fromAddress, JSON.stringify(this.contacts[fromAddress]));
    }

    addMyMessageEvent = (event) => {
        var data = event.returnValues;
        var localMessages = this.contacts[data.to];
        //TODO: push to address to contactAddress

        var noMatchingItem = true;
        for (var i=localMessages.messages.length-1; i>=0;i--) {
            if (event.transactionHash == localMessages.messages[i].txHash) {
                localMessages.messages[i].status = Constant.SENT_STATUS.SUCCESS;
                window.localStorage.setItem(data.to, JSON.stringify(this.contacts[data.to]));
                noMatchingItem = false;
            }
        }
        if (noMatchingItem) {
            var message = {};
            message.isMine = true;
            message.message = data.message;
            message.encryption = utils.hexStringToAsciiString(data.encryption);
            message.txHash = event.transactionHash;
            localMessages.messages.push(message);
            window.localStorage.setItem(data.to, JSON.stringify(this.contacts[data.to]));
        }
    }

    addMyLocalMessage = (message, to, encryption, txHash) => {
        // console.log(this.contacts[to]);
        var message = {message, encryption, txHash};
        message.status = Constant.SENT_STATUS.PENDING;
        message.isMine = true;
        this.contacts[to].messages.push(message);
        window.localStorage.setItem(to, JSON.stringify(this.contacts[to]));
    }

    updateLocalMessage = (toAddress, txHash, status) => {
        var localMessages = this.contacts[toAddress];
        for (var i=localMessages.messages.length-1; i>=0;i--) {
            if (txHash == localMessages.messages[i].txHash) {
                localMessages.messages[i].status = status;
                window.localStorage.setItem(toAddress, JSON.stringify(this.contacts[toAddress]));
            }
        }
    }

    storePrivateKeyAndAddress(privateKey, address) {
        if (typeof(Storage) !== 'undefined') {
            window.localStorage.setItem("privateKey", privateKey);
            window.localStorage.setItem("address", address);
            window.localStorage.setItem("currentDataBlock", "0");
            window.localStorage.setItem("ethNetwork", "4");
        }
        // window.location.reload();
        
    }

    getPrivateKey() {
        if (typeof(Storage) !== 'undefined') {
            return window.localStorage.privateKey;
        }
    }

    getAddress() {
        if (typeof(Storage) !== 'undefined') {
            return window.localStorage.address;
        }
    }

    setBalance(balance) {
        if (typeof(Storage) !== 'undefined') {
            window.localStorage.setItem('balance', balance);
        }
    }

    getBalance() {
        if (typeof(Storage) !== 'undefined' && window.localStorage.balance != undefined) {
            return window.localStorage.balance;
        } else {
            return "0";
        }
    }

    setName(name) {
        if (typeof(Storage) !== 'undefined' && name != "") {
            window.localStorage.setItem('name', name);
        }
    }

    getName() {
        if (typeof(Storage) !== 'undefined' && window.localStorage.name != undefined) {
            return window.localStorage.name;
        } else {
            return "";
        }
    }

    setAvatarUrl(avatarUrl) {
        if (typeof(Storage) !== 'undefined' && avatarUrl) {
            window.localStorage.setItem('avatarUrl', avatarUrl);
        }
    }

    getAvatarUrl() {
        if (typeof(Storage) !== 'undefined' && window.localStorage.avatarUrl != undefined) {
            return window.localStorage.avatarUrl;
        } else {
            return "";
        }
    }

    setJoinedStatus(isJoined) {
        if (typeof(Storage) !== 'undefined') {
            window.localStorage.setItem('isJoined', isJoined);
        }
    }

    getJoinedStatus() {
        if (typeof(Storage) !== 'undefined' && window.localStorage.isJoined != undefined) {
            return window.localStorage.isJoined;
        } else {
            return false;
        }
    }

    // Get current block number of contract events' data (message events, invitation events...)
    getCurrentDataBlock() {
        return parseInt(window.localStorage.currentDataBlock);
    }

    setCurrentDataBlock(blockNumber) {
        window.localStorage.setItem('currentDataBlock', blockNumber);
    }

    setAskForTransactionApproval(boolValue) {
        if (typeof(Storage) !== 'undefined') {
            window.localStorage.setItem('askForTransactionApproval', boolValue);
        }
    }
    
    getAskForTransactionApproval() {
        if (typeof(Storage) !== 'undefined' && window.localStorage.askForTransactionApproval) {
            return (window.localStorage.askForTransactionApproval == "true");
        } else {
            return false;
        }
    }

    removeNetworkDependentData() {
        if (typeof(Storage) !== 'undefined') {
            var rawAddresses = window.localStorage.contactAddresses;
            if (rawAddresses != undefined) {
                var addresses = JSON.parse(rawAddresses);
                for (var i=0;i<addresses.length;i++) {
                    window.localStorage.removeItem(addresses[i]);
                }
                window.localStorage.removeItem('contactAddresses');
            }
            window.localStorage.removeItem('balance');
            window.localStorage.removeItem('isJoined');
            window.localStorage.removeItem('name');
            window.localStorage.removeItem('avatarUrl');
            window.localStorage.setItem('currentDataBlock', '0');
        }
    }

    clearMessages = (contacts) => {
        window.localStorage.setItem('currentDataBlock', "0");
        window.localStorage.removeItem('contactAddresses');
        for (var i=0;i<contacts.length;i++) {
            window.localStorage.removeItem(contacts[i]);
        }
    }
}

export default LocalStorageManager;