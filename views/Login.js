import {Component} from 'react';
import {
    Input,
    Message,
    Container,
    Button,
    Header,
    Icon
} from 'semantic-ui-react';
import Head from 'next/head';
import web3 from '../ethereum/web3';
import Constant from '../support/Constant';
import Config from '../support/Config';

class Login extends Component {
    constructor(props) {
        super(props);
        this.account = props.account;
        this.contractManager = props.contractManager;
        this.storageManager = props.storageManager;
        this.state = {privateKey: "", errorMessage:"", transitionMessage:"", walletAddress: ""};
        console.log(this.storageManager.reload);
        
    }

    componentDidMount() {
        // await this.sleep(2000);
        // console.log(this.state);
        // if(window.localStorage.getItem("reload")> 0){
        // }
        console.log(window.localStorage.getItem("reload"))
        

    }

    handleBack = () => {
        this.setState({walletAddress : "", errorMessage: "", transitionMessage: ""});
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    handleJoin = async () =>{
        await this.account.storePrivateKey(this.state.privateKey);
        await this.contractManager.getContract();
        var x = await this.contractManager.getJoinedAddress();
        if (x==0){
            console.log("Joining the network");
            this.setState({transitionMessage: "Joining..."})
            var publicKeyBuffer = this.account.getPublicKeyBuffer();
            // await this.contractManager.checkAcc('0x'+this.state.walletAddress);
            await this.contractManager.joinContract(publicKeyBuffer,   (resultEvent) => {
                if (resultEvent == Constant.EVENT.ON_REJECTED || resultEvent == Constant.EVENT.ON_ERROR) {
                    this.setState({transitionMessage: "", errorMessage: "Something went wrong, refreshing in 3 seconds..."})
                    
                } else if (resultEvent == Constant.EVENT.ON_RECEIPT) {
                    this.setState({transitionMessage: "Success!"})
                    // this.storageManager.reload = 1;
                    // console.log(this.storageManager.reload);
                    window.location.reload();
                    // this.setState({transitionMessage: "Success! Click here to enter if not directed automatically."});
                }
            });
        }else{
            // this.setState({transitionMessage: "Success! Click here to enter if not directed automatically."});
            console.log("existing");
            window.location.reload();
        }
        
        
    }


    nextClicked = async (e) => {
        e.preventDefault();
        // console.log(this.state.privateKey)
        var walletAddress = await this.account.checkPrivateKey(this.state.privateKey);
        if (walletAddress) {
            console.log("sucess", walletAddress);
            this.setState({errorMessage : ""});
            this.setState({walletAddress : walletAddress});

        } else {
            // console.log("GUUSL");
            this.setState({errorMessage : "Private Key is invalid"});
            // this.setState({errorMessage: "Invalid private key"});
        }
    }

    render() {
        return (
            <Container>
            <Head>
                <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"></link>
            </Head>
                <h1 className="title">
                Welcome to Block-Forever! 
                </h1>

                <p className="description">
                Send a private message to your friend that will never be lost
                </p>

                <div className='loginBox'>
                <div className='loginTitle'> Sign in to Block-Forever</div>
                <div className='loginForm' > 
                    <Message hidden={this.state.walletAddress != ""}>
                        <Header >Enter Private Key:</Header>
                        <Input fluid 
                            value={this.state.privateKey} 
                            onChange={(e) => this.setState({privateKey: e.target.value})} 
                            action={{ color: 'blue', labelPosition: 'right', icon: 'angle right', content: 'Next', onClick: (e)=>this.nextClicked(e)}}/>
                    </Message>
                    
                    <Message error header={this.state.errorMessage} hidden={this.state.errorMessage == ""}/>
                    
                    <Message text positive hidden={this.state.walletAddress == ""}>
                        <Message.Header>
                            Join Ethereum Messenger as <br/> 
                            <Container fluid textAlign='center' style={{ marginTop: "1vw"}}>
                                <b style={{fontSize: "2vw"}}>0x{this.state.walletAddress}</b><br/>
                                <Button onClick={this.handleBack} color = 'blue'  style={{ marginTop: "1vw"}} >Back</Button>
                                <Button onClick={this.handleJoin} color = 'orange' style={{ marginLeft: "0.5vw"}}>Join</Button>
                            </Container>
                        </Message.Header>
                    </Message>
                    <Container textAlign="center">
                    <Message  compact positive hidden={this.state.transitionMessage != "Joining..."}>
                            <Icon size='big' name='circle notched' loading />
                            <b style={{fontSize: "2.5vw"}}>{this.state.transitionMessage}</b>
                            <p style={{fontSize: "1vw"}}>Please manually refresh page if unable to logging in during first time</p>

                        </Message>
                        <Message  compact positive hidden={this.state.transitionMessage != "Success!"}>
                            <Icon size='big' name='check' />
                            <b style={{fontSize: "2.5vw"}}>{this.state.transitionMessage}</b>
                            <p style={{fontSize: "1vw"}}>Please manually refresh page if unable to logging in during first time</p>
                        </Message>
                        

                    </Container>

                    
                </div>
                </div>
            </Container>
        );
    }
}
export default Login;