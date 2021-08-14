import {Component} from 'react';
import web3 from '../../ethereum/web3';
import {
    Modal,
    Input,
    Message,
    Button,
    Icon,
    Header
} from 'semantic-ui-react';
import appDispatcher from '../../core/AppDispatcher';
import Constant from '../../support/Constant';
import ContactList from '../ContactList'; 

class AddContactModal extends Component {
    constructor(props) {
        super(props);
        this.state = { modalOpen: false, errorMessage: "", address: ""}
        this.contractManager = props.contractManager;
        this.storageManager = props.storageManager;
    }
    
    componentWillMount() {
        appDispatcher.register((payload) => {
            if (payload.action == Constant.ACTION.ADD_CONTACT) {
                this.setState({modalOpen: true, errorMessage: "", isLoading: false, address: ""});
            }
        })
    }

    handleClose = (e) => {
        e.preventDefault();
        this.setState({errorMessage: ""});
        this.setState({ modalOpen: false })
    };

    handleAddContact = (e) => {
        if (web3.utils.isAddress(this.state.address)) {
            this.contractManager.addContact(this.state.address);
            // this.storageManager.addContact(this.state.address);
            // appDispatcher.dispatch({
            //     action: Constant.EVENT.CONTACT_LIST_UPDATED
            // });
            this.setState({errorMessage: "", modalOpen: false});
        } else {
            this.setState({errorMessage: "Invalid ethereum address"});
        }
    }

    render() {
        return (
            <div>
                <Header content="Enter Public Address of Friend" />
                    <div style={{display:'flex',justifyContent:"space-between"}}>
                        <Input style={{width:"80%"}} value={this.state.address} onChange={event => this.setState({address: event.target.value})}/>
                        <Button style={{marginLeft:8}} color='orange' onClick={this.handleAddContact}>
                            Add
                        </Button>
                    </div>
            </div>
        );
    }
}

export default AddContactModal;