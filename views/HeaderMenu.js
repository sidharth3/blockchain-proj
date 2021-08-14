

=======
>>>>>>> Stashed changes

import {Component} from 'react';
import {
    Menu,
    Container,
    Button,
    Label,
    Loader,
    List,
    Image,
    Icon,
    Dropdown
} from 'semantic-ui-react';
import Head from 'next/head';
import web3 from '../ethereum/web3';
import Constant from '../support/Constant';
import Config from '../support/Config';
import appDispatcher from '../core/AppDispatcher';

class HeaderMenu extends Component {
    constructor(props) {
        super(props);
        this.account = props.account;
        this.contractManager = props.contractManager;
        this.transactionDispatcher = props.transactionDispatcher;
        this.state = {address: "", balance: "", name: "", 
            avatarUrl: "", isLoading: true, isJoinButtonLoading: false, 
            isJoined: false, numPendingTx: 0};
        this.reloadCount = 0;
    }

    clearAllData = () => {
        window.localStorage.clear();
    }

    componentDidMount() {
        if (this.account) {
            this.getAccountInfo();
            appDispatcher.register((payload) => {
                if (payload.action == Constant.EVENT.ACCOUNT_BALANCE_UPDATED) {
                    this.setState({balance: this.account.balance});
                } else if (payload.action == Constant.EVENT.ACCOUNT_INFO_UPDATED) {
                    this.setState({name: payload.profile.name, avatarUrl: payload.profile.avatarUrl, isJoined: payload.profile.isJoined});
                } 
            });
            this.transactionDispatcher.register((payload) => {
                if (payload.action == Constant.EVENT.PENDING_TRANSACTION_UPDATED) {
                    this.setState({numPendingTx: payload.numPendingTx});
                }
            });
        }
    }

    getAccountInfo = () => {
        var address = this.account.getAddress();
        if (address) {
            this.setState({address: address, balance: this.account.balance, isLoading: false, isJoined: this.account.isJoined});
        } else {
            if (this.reloadCount == 1) {
                this.setState({isLoading: false});
            } else {
                this.reloadCount++;
                setTimeout(this.getAccountInfo, 800);
            }
        }
    }

    handleLogout = (event, data) => {
        this.clearAllData();
        window.location.reload(); 
    }

    removeNetworkDependentData = () => {
        this.account.storageManager.removeNetworkDependentData();
    }


    render() {
        var accountInfo = (<div></div>);

        if (this.account) {
            if (this.state.isLoading == false) {
                if (this.state.address) {
                    var addressExplorerUrl = Config.ENV.ExplorerUrl + 'address/' + this.state.address;
                    var dropdownTrigger;

                    if (this.state.avatarUrl) { 
                        dropdownTrigger = (
                            <span><Image src={this.state.avatarUrl} avatar/>{ this.state.name ? this.state.name : this.state.address.substr(0,10)}</span>
                        );
                    } else {
                        dropdownTrigger = (
                            <span><Icon name='user' size='large'/>{ this.state.name ? this.state.name : this.state.address.substr(0,10)}</span>
                        );
                    }


                    var logOutButton;
                    if (this.account.isJoined) {
                        logOutButton = (
                            <Button color='red' onClick={this.handleLogout} >
                                <Icon name='log out'/>Log out</Button>
                        );
                    }

                    // var pendingTxItem;
                    // if (this.state.numPendingTx > 0) {
                    //     pendingTxItem = (
                    //         <Label as='a' color='yellow' href={addressExplorerUrl} target='_blank'>
                    //             <Icon name='spinner' loading/>
                    //             {this.state.numPendingTx} pending tx
                    //         </Label>
                    //     );
                    // }

                    accountInfo = (
                        <Menu.Item>
                            <List>
                            <List.Item>
                                Address: <Label as='a' href={addressExplorerUrl} target='_blank' color='green'>{this.state.address}</Label>
                            </List.Item>
                            <List.Item>
                                Balance: <Label as='a' href={addressExplorerUrl} target='_blank' color='green'>{parseFloat(web3.utils.fromWei("" +this.state.balance, 'ether')).toFixed(8) + ' ETH' }</Label>
                                {/* {pendingTxItem} */}
                            </List.Item>
                            </List>
                        </Menu.Item>
                    );
                } 
            } else {
                accountInfo = (<Loader inverted active />);
            }
        }

        return (
            <Menu fluid color='blue' inverted>
                <Head>
                <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"></link>
                </Head>
                <Menu.Item>
                    <a href='/'><Image src='static/images/ethereum-messenger-logo.png' height={50} /></a>
                </Menu.Item>
                {this.account ? accountInfo: (<div></div>)}
                <Menu.Menu position='right'>
                    <Menu.Item>
                        {logOutButton}
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        );
    }
}

export default HeaderMenu;