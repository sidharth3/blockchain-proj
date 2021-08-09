// Copyright (c) 2018 Nguyen Vu Nhat Minh
// Distributed under the MIT software license, see the accompanying file LICENSE

import {Component} from 'react';
import {
    Modal,
    Header,
    Button,
    Icon
} from 'semantic-ui-react';
import appDispatcher from '../../core/AppDispatcher';
import Constant from '../../support/Constant';

class LoadingModal extends Component {
    constructor(props){
        super(props);
        this.state = { modalOpen: false, key: "", errorMessage:""}
        this.account = props.account;
    }

    componentWillMount() {
        appDispatcher.register((payload) => {
            if (payload.action == Constant.ACTION.OPEN_LOADING_MODAL) {
                this.setState({modalOpen: true});
            }
        })
    }



    render() {
        return (
            <Modal
                open={this.state.modalOpen}
                size='small'
                >
                <Header icon="" content="LOADING" />
                    <Modal.Content style={{fontSize: '1.2em'}}>
                        LOADING
                    </Modal.Content>
            </Modal>
        );
    }
}

export default GuideModal;