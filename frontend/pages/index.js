import Head from 'next/head'
import { useState } from 'react'

export default function Home() {
  
  let [loginLoading, setLoginLoading] = useState(false)
  let [loginStatus, setLoginStatus] = useState(false)
  let [privateKey, setPrivateKey] = useState("0x650E694D1Fe9E333A0D4Ac51dB44e51Ec7F24617")
  let [publicKey, setPublicKey] = useState("0x650E694D1Fe9E333A0D4Ac51dB44e51Ec7F24617")
  let [balance, setBalance] = useState(18.7586493)
  let [selectedContact, setSelectedContact] = useState()
  let [selected, setSelected] = useState()
  let [color, setColor] = useState({backgroundColor: "#0070f3", textColor:"white", svgColor:'invert(100%) sepia(0%) saturate(0%) hue-rotate(250deg) brightness(100%) contrast(104%)'})
  let [contactList, setContactList] = useState([
    "0x650E694D1Fe9E333A0D4Ac51dB44e51Ec7F24616",
    "0x650E694D1Fe9E333A0D4Ac51dB44e51Ec7F24619",
    "0x650E694D1Fe9E333A0D4Ac51dB44e51Ec7F24618",
  ])


  function onLoginSubmit(e){
    e.preventDefault();
    setLoginLoading(true)
    //insert verification of Private key

    setLoginStatus(true)
  }

  function onAddContactSubmit(e){
    e.preventDefault();
    //insert verification of Public Key
    setContactList([...contactList,publicKey])
  }

  function onSelectContact(e){
    //insert verification of Public Key
    console.log(e.target.id)
    console.log(e.target.dataset.key)
    setSelectedContact(e.target.id)
    setSelected(e.target.dataset.key)
  }

  function onPrikeyChange(e){
    setPrivateKey(e.target.value)
  }

  function onPubkeyChange(e){
    setPublicKey(e.target.value)
  }

  return (
    <div className="container">
      <Head>
        <title>Block Love</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {!loginStatus && <div className='landingPage' >
        <h1 className="title">
          Welcome to Block-Forever! 
        </h1>

        <p className="description">
          Send a private message to your friend that will never be lost
        </p>

        <div className='loginBox'>
          <div className='loginTitle'> Sign in to Block-Forever</div>
          <form className='loginForm' onSubmit={onLoginSubmit}> 
            <label className='loginFields' htmlFor="priKey">Enter Private Key:</label>
            <input disabled={loginLoading} className='loginFields privateKey' id="priKey" type="text" onChange={onPrikeyChange} required />
            <button className='loginFields submitButton' type="submit">Login</button>
          </form>
        </div>
      </div>}


      {loginStatus && <div className='MainPage' >
        <div className='header'>
          <div className='headerItems'>{privateKey}</div>
          <div className='headerItems balance'>{balance}ETH</div>
        </div>

        <div className="body">
          <div className='contactList bodyCols'>
            <div className='contactListHeader'>Contact List</div>
            <form className='contactAdd' onSubmit={onAddContactSubmit}> 
              <label className='contactAddFields' htmlFor="pubKey">Add Contact<br></br> Public Key:</label>
              <input className='contactAddFields publicKey' id="pubKey" type="text" onChange={onPubkeyChange} required />
              <button className='contactAddFields addButton' type="submit">Add</button>
            </form>
            {contactList.map((contact, index) => (
              <div className="contactBox" id={contact} key={index} data-key={index.toString()} onClick={onSelectContact} style={{backgroundColor: selected === index.toString() ? color.backgroundColor : 'white'}}>
                <img className='contactImg' src="user.svg" style={{filter : selected === index.toString() ? color.svgColor : "invert(0%) sepia(6%) saturate(24%) hue-rotate(268deg) brightness(97%) contrast(107%)"}}/>
                <div className='contactName' style={{color : selected === index.toString() ? color.textColor : 'black'}} >{contact}</div>
              </div>
            ))}
          </div>
          
          <div className='messageBody'>
            <div className='conversation messageRows'></div>
            <form className='message messageRows' 
              // onSubmit={onSendMessage}
            >
              <textarea rows = "3" cols = "50" name = "messageText" className="messageText">
                Send a message..
              </textarea>
              <button className='sendButton' type="submit">Send</button>
            </form>
          </div>  
        </div>
        
      </div>}




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
          margin-top: 1rem;
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
          padding: 5rem 0;
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
          font-size: 4rem;
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
  )
}
