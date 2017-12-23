require('~/src/css/ChatApp.css');

import React from 'react';
import ReactDom from 'react-dom'
import io from 'socket.io-client';
//import config from '../config';
import { withRouter } from 'react-router-dom'

import Messages from './Messages';
import Users from './Users';
import ChatInput from './ChatInput';

import ConfigMain from '../../../configs/main';

const BackendURL = ConfigMain.getBackendURL();
var lastMessageRec = "";

class ChatApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messageStack: [],
                   users: [], 
                   chatWindowOpen: 2, 
                   tabClose: -2, 
                   activeUserName: "", 
                   activeUserFullName: "",
                   lastMessageStack: []
                };

                var isFirefox = typeof InstallTrigger !== 'undefined';
                var isChrome = !!window.chrome && !!window.chrome.webstore;
                var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));

                var username = "";
                var userID = "";
                var firstName = "";
                var lastName = "";
                var userType = "";

                if(isFirefox){
                  username = "198916860685116";
                  userID = "5a24f0bf85371d22ecdddd14";
                  firstName = "Jay";
                  lastName = "Shaw";
                  userType = "facebook";
                }

                if(isChrome){
                  username = "10155671566088672";
                  userID = "5a38af456cccd9316aafd827";
                  firstName = "Jigar";
                  lastName = "Shah";
                  userType = "facebook";
                }

                if(isSafari){
                  username = "19891686056851416";
                  userID = "5a3a14e154783b1be4a6c530";
                  firstName = "Ji";
                  lastName = "Sa";
                  userType = "linkedin";
                }
                //this.socket = io(BackendURL, { query: `username=${props.username}&userID=${props.userID}&firstName=${props.firstName}&lastName=${props.lastName}&userType=${props.userType}` }).connect();
                this.socket = io(BackendURL, { query: `username=${username}&userID=${userID}&firstName=${firstName}&lastName=${lastName}&userType=${userType}` }).connect();

    this.socket.on('server:user', tempUsers => {
      this.state.users = [];

      let copy = Object.assign({}, this.state, {users: tempUsers});
      this.setState(copy);
    });

    this.socket.on('newUser', user => {
      var tempUsers = this.state.users;
      for(var i=0; i<tempUsers.length; i++){
        if(tempUsers[i].userID == user.userID){
          tempUsers[i].loggedinStatus = user.loggedinStatus;
        }
      }

      let copy = Object.assign({}, this.state, {users: tempUsers});
      this.setState(copy);
    });

    // Listen for messages from the server
    this.socket.on('server:message', message => {
      lastMessageRec = message;
      this.addMessage(message);
      this.addLastMessage(message);
    });
  }

  tabChanges(activeUsername,activeUserFullname){
    let copy = Object.assign({}, this.state, {chatWindowOpen: 1, activeUserName: activeUsername, activeUserFullName:activeUserFullname});
    this.setState(copy);
  }

  sendHandler(message) {
    const messageObject = {
      sender: this.props.username,
      message,
      receiver: this.state.activeUserName,
      time: new Date()
    };
    // Emit the message to the server
    this.socket.emit('client:message', messageObject);

    messageObject.fromMe = true;
    this.addMessage(messageObject);
    this.addLastMessage(messageObject);
  }

  addMessage(message) {
    // Append the message to the component state
    var tempReceiver = "";
    var tempMessageStack = [];
    if(message.sender == this.props.username){
      tempReceiver = message.receiver;
    }
    else{
      tempReceiver = message.sender;
    }
    
    if(!(tempReceiver in this.state.messageStack)){
      var messages = [];
      messages.push(message);
      tempMessageStack = this.state.messageStack;
      tempMessageStack[tempReceiver] = messages;
    }
    else{
      var messages = this.state.messageStack[tempReceiver];
      messages.push(message);
      tempMessageStack = this.state.messageStack;
      tempMessageStack[tempReceiver] = messages;
    }

    let copy = Object.assign({}, this.state, {messageStack: tempMessageStack});
    this.setState(copy);
  }

  addLastMessage(message){
      var tempLastMessageStack = "";
      var tempReceiver = "";
      if(message.sender == this.props.username){
        tempReceiver = message.receiver;
      }
      else{
        tempReceiver = message.sender;
      }
      tempLastMessageStack = this.state.lastMessageStack;
      tempLastMessageStack[tempReceiver] = message;
      let copy = Object.assign({}, this.state, {lastMessageStack: tempLastMessageStack});
      this.setState(copy);
  }

  closeChatWindow() {
    let copy = Object.assign({}, this.state, {chatWindowOpen: 0});
    this.setState(copy);
  }

  toggleUserWindow(usersWindowOpen) {
    if(usersWindowOpen == 0){
      let copy = Object.assign({}, this.state, {chatWindowOpen: 2});
      this.setState(copy);
    }
    else if(usersWindowOpen == 1){
      let copy = Object.assign({}, this.state, {chatWindowOpen: 0});
      this.setState(copy);
    }
  }

  render() {
    const chatWindowClass = this.state.chatWindowOpen == 1 ? "chatWindowShow" : "chatWindowHide";
    const divChatClasses = `chatapp-chatContainer ${chatWindowClass}` ;
    const chatMainClass = this.state.chatWindowOpen == 0 ? "chatapp-main-container-2" : this.state.chatWindowOpen == 1? "chatapp-main-container-1" : "chatapp-main-container-3";
    const divMainClasses = `chatapp-main-container ${chatMainClass}` ;
    var componentMessages = "";
    var active = "";
    if(this.state.activeUserName != ""){
       if(this.state.messageStack[this.state.activeUserName]){
          componentMessages = <Messages messages={this.state.messageStack[this.state.activeUserName]} />;
       }
       active = this.state.activeUserFullName;
    }
    return (
      <div className={divMainClasses}>
        <div className="chatapp-container">
          <div className="chatapp-userContainer" id="userContainer">
            <Users users={this.state.users} selectedUser={this.state.activeUserName} lastMessageRec={lastMessageRec} lastMessages={this.state.lastMessageStack} onTab={(activeUsername,activeUserFullname)=>this.tabChanges(activeUsername,activeUserFullname)} checkUserWin={(usersWindowOpen)=>this.toggleUserWindow(usersWindowOpen)} tabClose={this.state.tabClose} />
          </div>
          <div className={divChatClasses} id="chatContainer">
            <div className="topName">
              <span>To: <span id="activeUserName">{active}</span></span>
              <span className="close-chat" id="close-chat" onClick={()=>this.closeChatWindow()}>x</span>
            </div>
            <div id="test" className="messages">
              {componentMessages}
            </div>
            <div id="msgBox" className="write-container">
              <ChatInput onSend={(message)=>this.sendHandler(message)} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
ChatApp.defaultProps = {
  username: 'Anonymous'
};

export default withRouter(ChatApp);


/* */
