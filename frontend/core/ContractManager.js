import web3 from '../ethereum/web3';
import compiledContract from '../ethereum/build/ethmessenger.json';
import TransactionsManager from './TransactionManager';
import appDispatcher from './AppDispatcher';
import Config from '../support/Config';
import Constant from '../support/Constant';
import utils from '../support/Utils';
import crypto from 'crypto';

/**
 * Responsible for interacting with the Ethereum smart contract
 */

class ContractManager {
    constructor(accountManager, storageManager) {
        this.getContract();
        this.accountManager = accountManager;
        this.storageManager = storageManager;
        this.transactionManager = new TransactionsManager(accountManager);
        
         
    }

    // Create a web3 contract object that represent the ethereum smart contract
    getContract = async () => {
        this.contract = await new web3.eth.Contract(JSON.parse(compiledContract.interface), 
                Config.ENV.ContractAddress);
        appDispatcher.dispatch({
            action: Constant.EVENT.CONTRACT_READY
        })
    }

    getJoinedAddress = async () => {
        var currentDataBlock = this.storageManager.getCurrentDataBlock();
        var blockNumber = await web3.eth.getBlockNumber();

        var x = await this.getPastEvents('addressJoinEvent', {
            filter: {from: this.accountManager.getAddress()},
            fromBlock: currentDataBlock+1,
            toBlock: blockNumber
        });  
        return x; 
    }

    // Get current account profile from ethmessenger contract's storage
    getProfile = async (address) => {
        var result = await this.contract.methods.members(this.accountManager.getAddress()).call();
        var profile = {};
        if (result.isMember == 1) {
            profile.isJoined = true;
            profile.avatarUrl = utils.hexStringToAsciiString(result.avatarUrl);
            profile.name = utils.hexStringToAsciiString(result.name);

            this.storageManager.setJoinedStatus(true);
            this.storageManager.setName(this.name);
            this.storageManager.setAvatarUrl(this.avatarUrl);
            
            appDispatcher.dispatch({
                action: Constant.EVENT.ACCOUNT_INFO_UPDATED,
                profile: profile
            })
        }
        return profile;
    }

    getMemberInfo = async (address, relationship) => {
        var memberInfo = await this.contract.methods.members(address).call();
        if (memberInfo.isMember) {
            var publicKey = '04' + memberInfo.publicKeyLeft.substr(2) + memberInfo.publicKeyRight.substr(2);
            var name = utils.hexStringToAsciiString(memberInfo.name);
            var avatarUrl = utils.hexStringToAsciiString(memberInfo.avatarUrl);
            this.storageManager.updateContact(address, publicKey, name, avatarUrl, relationship);
        }
    }

    // checkAcc = async (address) =>{
    //     var memberInfo = await this.contract.methods.members(address).call();
    //     console.log(memberInfo.isMember);

    // }


    getPastEvents = async (eventName, filters) => {
        return await this.contract.getPastEvents(eventName, filters);
    }

    joinContract = async(publicKeyBuffer, callback) => {

        var publicKeyLeft = '0x' + publicKeyBuffer.toString('hex', 0, 32);
        var publicKeyRight = '0x' + publicKeyBuffer.toString('hex', 32, 64);
        
        // var profile = await this.getProfile(this.accountManager.getAddress())
        
        
        try{
            this.transactionManager.executeMethod(this.contract.methods.join(publicKeyLeft, publicKeyRight))
                .on(Constant.EVENT.ON_APPROVED, (txHash) => {
                    console.log(1);
                    window.localStorge.setItem("reload", 1);
                    if (callback) callback(Constant.EVENT.ON_APPROVED);
                })
                .on(Constant.EVENT.ON_REJECTED, (txHash) => {
                    console.log(2);
                    if (callback) callback(Constant.EVENT.ON_REJECTED);
                })
                .on(Constant.EVENT.ON_RECEIPT, (receipt) => {
                    console.log(3);
                    if (callback) callback(Constant.EVENT.ON_RECEIPT);
                })
                .on(Constant.EVENT.ON_ERROR, (error, txHash) => {
                    console.log(4);
                    appDispatcher.dispatch({
                        action: Constant.EVENT.ENCOUNTERED_ERROR,
                        message: error.message,
                        title: "Error"
                    });
                    if (callback) callback(Constant.EVENT.ON_ERROR);
                });
            }catch(error){
                appDispatcher.dispatch({
                    action: Constant.EVENT.ENCOUNTERED_ERROR,
                    message: error.message,
                    title: "Error"
                });
            }
    }

    addContact = async (address) => {
        console.log(address);
        var memberInfo = await this.contract.methods.members(address).call();
        // console.log(address, memberInfo.isMember);
        if (memberInfo.isMember){
            var publicKey = '04' + memberInfo.publicKeyLeft.substr(2) + memberInfo.publicKeyRight.substr(2);
            this.storageManager.addContact(address, publicKey);
        }else{
            console.log("EEROR");
            appDispatcher.dispatch({
                action: Constant.EVENT.ENCOUNTERED_ERROR,
                message: "This address is not a member of Ethereum Messenger :(",
                title: "Error"
            });
        }
        // var method = this.contract.methods.addContact(address);
        // this.transactionManager.executeMethod(method)
        //     .on(Constant.EVENT.ON_APPROVED, (txHash) => {
        //         if (callback) callback(Constant.EVENT.ON_APPROVED);
        //     })
        //     .on(Constant.EVENT.ON_RECEIPT, (receipt) => {
        //         if (callback) callback(Constant.EVENT.ON_RECEIPT);
        //     })
        //     .on(Constant.EVENT.ON_ERROR, (error, txHash) => {
        //         appDispatcher.dispatch({
        //             action: Constant.EVENT.ENCOUNTERED_ERROR,
        //             message: error.message,
        //             title: "Error"
        //         });
        //         if (callback) callback(Constant.EVENT.ON_ERROR);
        //     });
    }

    acceptContactRequest = async (address, callback) => {
        var method = this.contract.methods.acceptContactRequest(address);
        this.transactionManager.executeMethod(method)
            .on(Constant.EVENT.ON_APPROVED, (txHash) => {
                if (callback) callback(Constant.EVENT.ON_APPROVED);
            })
            .on(Constant.EVENT.ON_RECEIPT, (receipt) => {
                if (callback) callback(Constant.EVENT.ON_RECEIPT);
            })
            .on(Constant.EVENT.ON_ERROR, (error, txHash) => {
                appDispatcher.dispatch({
                    action: Constant.EVENT.ENCOUNTERED_ERROR,
                    message: error.message,
                    title: "Error"
                });
                if (callback) callback(Constant.EVENT.ON_ERROR);
            });
    }

    updateProfile = async (name, avatarUrl, callback) => {
        var nameHex = '0x' + Buffer.from(name, 'ascii').toString('hex');
        var avatarUrlHex = '0x' + Buffer.from(avatarUrl, 'ascii').toString('hex');
        var method = this.contract.methods.updateProfile(nameHex, avatarUrlHex);
        this.transactionManager.executeMethod(method)
            .on(Constant.EVENT.ON_APPROVED, (txHash) => {
                if (callback) callback(Constant.EVENT.ON_APPROVED);
            })
            .on(Constant.EVENT.ON_RECEIPT, (receipt) => {
                if (callback) callback(Constant.EVENT.ON_RECEIPT);
            })
            .on(Constant.EVENT.ON_ERROR, (error, txHash) => {
                appDispatcher.dispatch({
                    action: Constant.EVENT.ENCOUNTERED_ERROR,
                    message: error.message,
                    title: "Error"
                });
                if (callback) callback(Constant.EVENT.ON_ERROR);
            });
    }

    // A message will be encrypted locally before sending to the smart contract
    sendMessage = async (toAddress, publicKey, message) => {
        
        var publicKeyBuffer = Buffer.from(publicKey, 'hex');
        var encryptedRaw = utils.encrypt(message, this.accountManager.computeSecret(publicKeyBuffer));
        var encryptedMessage = '0x' + encryptedRaw.toString('hex');
        var method = this.contract.methods.sendMessage(toAddress, encryptedMessage, utils.getEncryptAlgorithmInHex());

        this.transactionManager.executeMethod(method)
            .on(Constant.EVENT.ON_APPROVED, (txHash) => {
                this.storageManager.addMyLocalMessage(encryptedMessage, toAddress, utils.getEncryptAlgorithm(), txHash);
                appDispatcher.dispatch({
                    action: Constant.EVENT.MESSAGES_UPDATED,
                    data: toAddress
                });
            })
            .on(Constant.EVENT.ON_REJECTED, (data) => {
                // do nothing
            })
            .on(Constant.EVENT.ON_RECEIPT, (receipt, ) => {
                this.storageManager.updateLocalMessage(toAddress, receipt.transactionHash, Constant.SENT_STATUS.SUCCESS);
                appDispatcher.dispatch({
                    action: Constant.EVENT.MESSAGES_UPDATED,
                    data: toAddress
                });
            })
            .on(Constant.EVENT.ON_ERROR, (error, txHash) => {
                this.storageManager.updateLocalMessage(toAddress, txHash, Constant.SENT_STATUS.FAILED);
                appDispatcher.dispatch({
                    action: Constant.EVENT.MESSAGES_UPDATED,
                    data: toAddress
                });
            });
    }
}

export default ContractManager;