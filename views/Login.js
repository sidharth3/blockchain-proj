import {Component} from 'react';
import {
    Input,
    Message,
    Container,
    Button,
    Header,
    Icon,
    Image
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
            <div className='landingPage' >
            <Head>
                <title>Ethereum Messenger</title>
                <link rel="shortcut icon" href="/static/images/favicon.ico" />
                <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"></link>
            </Head>
                <Image src='static/images/ethereum-messenger-logo.png' height={150} style={{ marginTop: "1.5vw"}} />
                <br/>
                <h1 className="title"  font-family="Tahoma">
                Welcome to Ethereum Messenger! 
                </h1>

                <p className="description">
                Send a private message to your friends that will never be lost!
                </p>

                <div className='loginBox'>
                <div className='loginTitle'> Sign in to Block-Forever</div>
                <div className='loginForm' > 
                <form hidden={this.state.walletAddress != ""} className='loginForm' onSubmit={(e)=>this.nextClicked(e)}> 
                    <label className='loginFields' htmlFor="priKey">Enter Private Key:</label>
                    <input value={this.state.privateKey} className='loginFields privateKey' type="text" onChange={(e) => this.setState({privateKey: e.target.value})}  required />
                    <button className='loginFields submitButton' type="submit">Next</button>
                </form>
                        {/* <Input fluid 
                            value={this.state.privateKey} 
                            onChange={(e) => this.setState({privateKey: e.target.value})} 
                            action={{ color: 'blue', labelPosition: 'right', icon: 'angle right', content: 'Next', onClick: (e)=>this.nextClicked(e)}}/> */}
                    
                    <Message error header={this.state.errorMessage} hidden={this.state.errorMessage == ""}/>
                    
                    <Message text positive hidden={this.state.walletAddress == ""}>
                        <Message.Header>
                            Join Ethereum Messenger as <br/> 
                            <Container fluid textAlign='center' style={{ marginTop: "1vw"}}>
                                <b style={{fontSize: "2vw"}}>0x{this.state.walletAddress}</b><br/>
                                {/* <Button onClick={this.handleBack} color = 'blue'  style={{ marginTop: "1vw"}} >Back</Button> */}
                                <Button onClick={this.handleJoin} color = 'orange' style={{ marginTop: "0.5vw"}}>Join</Button>
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
                
                
    <style jsx>{`
        .header{
          display: flex;
          flex-direction: row;
          background-color: #0070f3;
          justify-content: center;
        }

        .contactListHeader{
          font-weight: 500;
        }

        .contactImg{
          width: 10%;
          height: auto;
          transition: filter 0.15s ease
        }

        .contactName{
          font-size: 0.8rem;
          margin-left: 0.2rem;
          transition: color 0.15s ease
        }

        .contactBox{
          display: flex;
          overflow: scroll;
          align-items: center;
          margin-top: 0.5rem;
          border: 2px transparent solid;
          border-radius: 10px;
          padding: 0.5rem;
          transition: border-color 0.15s ease, background-color 0.15s ease;
        }

        .contactBox :hover,
        .contactBox :focus,
        .contactBox :active {
          border-color: #0070f3;
          
        }

        .contactAdd{
          display: flex;
          margin-top: 1rem;
          margin-bottom: 0.5rem;
          justify-content: space-between;
        }

        .publicKey{
          width: 60%
        }

        .body{
          display: grid;
          grid-template-columns: 1fr 3fr;
          grid-template-areas: "contactList messageBody";
          gap: 15px;
          padding: 0 1rem;
        }
        
        .bodyCols{
          border: 1px solid #eaeaea;
          border-radius: 10px;
          padding: 0.5rem;
        }

        .messageRows{
          border: 1px solid #eaeaea;
          border-radius: 10px;
          padding: 0.5rem;
        }

        .contactList{
          grid-area: contactList;
          display: flex;
          flex-direction: column;
        }

        .messageBody{
          grid-area: messageBody;
          display: grid;
          grid-template-rows: 3fr 1fr;
          grid-template-areas: "conversation" "message";
          gap: 15px;
        }

        .conversation{
          grid-area: conversation;
        }

        .message{
          max-height: 10vh;
          grid-area: message;
          display: grid;
          grid-template-columns: 7fr 1fr;
          gap: 15px;
        }

        .headerItems{
          margin: 1rem;
          color: white;
          padding: 0.5rem;
        }

        .balance{
          background: orange;
          border-radius: 10px
        }
        
        .container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          
        }

        .loginBox{
          width: 60%;
          display: flex;
          flex-direction: column;
          padding: 2.5rem 0.5rem;
          justify-content: center;
          align-items: center;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .loginForm{
          display: flex;
          flex-direction: column;
          padding: 0.5rem 1.8rem;
          align-items: center;
          width: 100%
        }

        .loginFields{
          margin-top: 0.5rem
        }

        .privateKey{
          padding: 0.5rem 0.5rem;
          width: 100%
        }

        .submitButton{
          background-color: transparent;
          width: 40%;
          align-self: center;
          padding: 0.5rem 0.5rem;
          border-radius: 10px;
          font-weight: 700;
          transition: color 0.15s ease, border-color 0.15s ease;
        }
      
        .submitButton :hover,
        .submitButton :focus,
        .submitButton :active {
          border-color: transparent;
          color:  #fff;
          background-color:#0070f3 ;
        }
        
        .addButton{
          background-color: transparent;
          align-self: center;
          padding: 0.5rem 0.5rem;
          border-radius: 10px;
          font-weight: 700;
          transition: color 0.15s ease, border-color 0.15s ease;
        }
      
        .addButton :hover,
        .addButton :focus,
        .addButton :active {
          border-color: transparent;
          color:  #fff;
          background-color:#0070f3 ;
        }

        .sendButton{
          background-color: transparent;
          align-self: center;
          padding: 0.5rem 0.5rem;
          border-radius: 10px;
          font-weight: 700;
          transition: color 0.15s ease, border-color 0.15s ease;
        }
      
        .sendButton :hover,
        .sendButton :focus,
        .sendButton :active {
          border-color: transparent;
          color:  #fff;
          background-color:#0070f3 ;
        }

        .landingPage {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 3rem;
        }
        .loginTitle {
          margin: 0;
          line-height: 1.15;
          font-size: 2rem;
          font-weight: 700;
          color: #0070f3;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        .loginBox:hover,
        .loginBox:focus,
        .loginBox:active {
          
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
            </div>
        );
    }
}
export default Login;