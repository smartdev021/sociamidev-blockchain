require('~/src/css/ChatApp.css');

import React from 'react';
import ReactDom from 'react-dom'
import io from 'socket.io-client';
import { withRouter } from 'react-router-dom' 
import Axios from 'axios';

import Messages from './Messages';
import Users from './Users';
import ChatInput from './ChatInput';
import PubSub from 'pubsub-js';

import ConfigMain from '../../../configs/main';

const BackendURL = ConfigMain.getBackendURL();
var lastMessageRec = "";

class ChatApp extends React.Component {
  componentWillMount() {
    //this.props.cookies.getAll();
    this.token = PubSub.subscribe('ChatStartPoint', this.chatStartListener.bind(this));
    console.log("Token - " + this.token);
  }

  componentDidMount() {
    const botUser = {
      username: "chatbot",
      userID: "chatbot",
      firstName: "Chatbot",
      lastName: "",
      userType: "chatbot",
      socketIds: []
    }

    var tUsers = [];
    tUsers.push(botUser);

    let copy = Object.assign({}, this.state, {users: tUsers});
    this.setState(copy);

    //this.token = PubSub.subscribe('ChatStartPoint', this.chatStartListener);
  }
  
  componentWillUnmount(){
    //PubSub.unubscribe(this.token);
  }

  constructor(props) {
    super(props);
    this.state = { messageStack: [],
                   users: [], 
                   chatWindowOpen: 2, 
                   tabClose: -2, 
                   activeUserID: "", 
                   activeUserFullName: "",
                   lastMessageStack: [],
                   anonymousUserId: ""
                };    

    //this.chatStartListener = this.chatStartListener.bind(this)
    if(this.props.loggedin){
      //this.socket = io(BackendURL, { query: `username=${props.username}&userID=${props.userID}&firstName=${props.firstName}&lastName=${props.lastName}&userType=${props.userType}` }).connect();
                  
    /*  this.socket.on('server:user', newUsers => {
        var tempUsers = this.state.users;

        for(var i=0; i<newUsers.length; i++){
          var newUser = newUsers[i];
          tempUsers.push(newUser);
        }

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

      this.socket.on('chatbotServer:message', message => {
        lastMessageRec = message;
        this.addMessage(message);
        this.addLastMessage(message);
      });
    }

    else{
      var uuid = this.uuidv1();
      this.state.anonymousUserId = uuid;
      //this.socket = io(BackendURL, { query: `userID=${uuid}` }).connect();

      this.socket.on('chatbotServer:message', message => {
        lastMessageRec = message;
        this.addMessage(message);
        this.addLastMessage(message);
      });
    }*/
  }
  }

  chatStartListener(event,data){
    if(data.eventType == "server:user"){
      this.loadConnectedUsers(data);
    }
  }

  loadConnectedUsers(newUsers){
    var tempUsers = this.state.users;

    for(var i=0; i<newUsers.length; i++){
      var newUser = newUsers[i];
      tempUsers.push(newUser);
    }

    let copy = Object.assign({}, this.state, {users: tempUsers});
    this.setState(copy);
  }

  tabChanges(activeUserID,activeUserFullname){
    let copy = Object.assign({}, this.state, {chatWindowOpen: 1, activeUserID: activeUserID, activeUserFullName:activeUserFullname});
    this.setState(copy);
  }

  uuidv1() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
  }

  sendHandler(message) {
    var messageObject = [];
    if(this.props.loggedin){
      messageObject = {
        sender: this.props.userID,
        message,
        receiver: this.state.activeUserID,
        time: new Date()
      };
    }
    else{
      messageObject = {
        sender: this.state.anonymousUserId,
        message,
        receiver: this.state.activeUserID,
        time: new Date()
      };
    }
    // Emit the message to the server
    if(this.state.activeUserID == "chatbot"){
      //this.socket.emit('chatbotClient:message', messageObject);
    }
    else{
      //this.socket.emit('client:message', messageObject);      
    }

    messageObject.fromMe = true;
    console.log(messageObject);
    this.addMessage(messageObject);
    this.addLastMessage(messageObject);
  }

  addMessage(message) {
    // Append the message to the component state
    var tempReceiver = "";
    var tempMessageStack = [];
    if(message.sender == this.props.userID || message.sender == this.state.anonymousUserId){
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
      if(message.sender == this.props.userID){
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
    if(this.state.activeUserID != ""){
       if(this.state.messageStack[this.state.activeUserID]){
          componentMessages = <Messages messages={this.state.messageStack[this.state.activeUserID]} />;
       }
       active = this.state.activeUserFullName;
    }
    return (
      <div className={divMainClasses}>
        <div className="chatapp-container">
          <div className="chatapp-userContainer" id="userContainer">
            <Users users={this.state.users} selectedUser={this.state.activeUserID} lastMessageRec={lastMessageRec} lastMessages={this.state.lastMessageStack} onTab={(activeUserID,activeUserFullname)=>this.tabChanges(activeUserID,activeUserFullname)} checkUserWin={(usersWindowOpen)=>this.toggleUserWindow(usersWindowOpen)} tabClose={this.state.tabClose} />
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