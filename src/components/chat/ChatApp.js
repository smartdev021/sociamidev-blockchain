require('~/src/css/ChatApp.css');

import React from 'react';
import ReactDom from 'react-dom'
import io from 'socket.io-client';
import Axios from 'axios'
import { withRouter } from 'react-router-dom' 

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
    let copy = Object.assign({}, this.state, {users: tUsers,userID: this.props.userProfile._id});
    this.setState(copy);
  }

  constructor(props) {
    super(props);
    this.state = { messageStack: [],
                   users: [], 
                   chatWindowOpen: 2, 
                   tabClose: -2, 
                   activeUserID: "chatbot", 
                   activeUserFullName: "",
                   lastMessageStack: [],
                   anonymousUserId: "",
                   loggedin: false,
                   userID: "",
                   unreadCountStack: [],
                   openWindow: false,
                   justLoggedIn: true,
                   userChatHistoryLoaded: false
                };    
  }

  chatStartListener(event,data){
    if(data.eventType == "server:user"){
      this.loadConnectedUsers(data.data);
    }
    else if(data.eventType == "newUser"){
      this.loadNewUser(data.data);
    }
    else if(data.eventType == "server:message"){
      this.newServerMessage(data.data);
    }
    else if(data.eventType == "chatbotServer:message"){
      this.newServerMessage(data.data);
    }
  }

  loadConnectedUsers(userObj){
    var newUsers = userObj.connectedUsersList;
    var tempUsers = this.state.users;

    for(var i=0; i<newUsers.length; i++){
      var newUser = newUsers[i];
      tempUsers.push(newUser);
    }

    let copy = Object.assign({}, this.state, {userID: userObj.user.userID, users: tempUsers, loggedin: true});
    this.setState(copy);
  }

  loadNewUser(newUser){
    var tempUsers = this.state.users;
    for(var i=0; i<tempUsers.length; i++){
      if(tempUsers[i].userID == newUser.userID){
        tempUsers[i].loggedinStatus = newUser.loggedinStatus;
      }
    }

    let copy = Object.assign({}, this.state, {users: tempUsers});
    this.setState(copy);
  }

  newServerMessage(message){
    if(message.sender == "chatbot"){
      console.log(message.message);
      if(message.message.startsWith("ERROR:")){
        return;
      }

      let copy = Object.assign({}, this.state, {openWindow: true, activeUserID: "chatbot", activeUserFullName: "Chatbot"});
      this.setState(copy);
    }
    if(message.sender != "chatbot" && message.sender != this.state.userID){
      var tempUsers = this.state.users;
      var index = tempUsers.findIndex(userToCheck => userToCheck.userID==message.sender);
      var tempUser = tempUsers[index];
      tempUsers.splice(index, 1);
      tempUsers.splice(1, 0, tempUser);
      let copy = Object.assign({}, this.state, {users: tempUsers});
      this.setState(copy);
    }
    if(message.sender != this.state.activeUserID){
      var tempUnreadCountStack = this.state.unreadCountStack;
      if(message.sender in tempUnreadCountStack){
        tempUnreadCountStack[message.sender] = tempUnreadCountStack[message.sender] + 1;
      }
      else{
        tempUnreadCountStack[message.sender] = 1;
      }
      let copy = Object.assign({}, this.state, {unreadCountStack: tempUnreadCountStack});
      this.setState(copy);
    }
    lastMessageRec = message;
    this.addMessage(message);
    this.addLastMessage(message);
  }

  tabChanges(activeUserID,activeUserFullname){
    this.state.userChatHistoryLoaded = false;
    var tempUnreadCountStack = this.state.unreadCountStack;
    if(activeUserID in tempUnreadCountStack){
      tempUnreadCountStack[activeUserID] = 0;
    }
    let copy = Object.assign({}, this.state, {chatWindowOpen: 1, activeUserID: activeUserID, activeUserFullName:activeUserFullname, unreadCountStack:tempUnreadCountStack});
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
        sender: this.props.userProfile._id,
        message,
        receiver: this.state.activeUserID,
        time: new Date()
      };
    }
    else{
      messageObject = {
        sender: this.state.userID,
        message,
        receiver: this.state.activeUserID,
        time: new Date()
      };
    }
    // Emit the message to the server
    if(this.state.activeUserID == "chatbot"){
      var chatObj = {
        eventType: 'chatbotClient:message',
        data: messageObject
      }
      PubSub.publish('ChatEndPoint', chatObj);
    }
    else{
      var chatObj = {
        eventType: 'client:message',
        data: messageObject
      }
      PubSub.publish('ChatEndPoint', chatObj);   
    }

    messageObject.fromMe = true;
    this.addMessage(messageObject);
    this.addLastMessage(messageObject);
  }

  addMessage(message) {
    // Append the message to the component state
    var tempReceiver = "";
    var tempMessageStack = [];
    if(message.sender == this.state.userID || message.sender == this.state.anonymousUserId){
      tempReceiver = message.receiver;
    }
    else{
      tempReceiver = message.sender;
    }
    
    if(!(tempReceiver in this.state.messageStack)){
      var messages = [];
      if(message.unshift) {
        messages.unshift(message);
      } else {
        messages.push(message);
      }
      tempMessageStack = this.state.messageStack;
      tempMessageStack[tempReceiver] = messages;
    }
    else{
      var messages = this.state.messageStack[tempReceiver];
      if(message.unshift) {
        messages.unshift(message);
      } else {
        messages.push(message);
      }
      tempMessageStack = this.state.messageStack;
      tempMessageStack[tempReceiver] = messages;
    }

    let copy = Object.assign({}, this.state, {messageStack: tempMessageStack});
    this.setState(copy);
  }

  addLastMessage(message){
      var tempLastMessageStack = "";
      var tempReceiver = "";
      if(message.sender == this.state.userID){
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
      let copy = Object.assign({}, this.state, {chatWindowOpen: 0, openWindow: false});
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
    var self = this;
    if(this.state.activeUserID != ""){
       if(this.state.messageStack[this.state.activeUserID]){
          componentMessages = <Messages 
            messages={this.state.messageStack[this.state.activeUserID]}
            addMessage={(message)=>this.addMessage(message)} addLastMessage={(message)=>this.addLastMessage(message)}
            sender={this.props.userProfile._id} receiver={this.state.activeUserID}/>;
       }
       else if(!this.state.userChatHistoryLoaded) {
        this.state.userChatHistoryLoaded = true;
        const url = `${ConfigMain.getBackendURL()}/fetchConversationByParticipants?ids=${this.props.userProfile._id};${this.state.activeUserID}`;
         Axios.get(url)
          .then(function(response) {            
            for(var message of response.data.reverse()) {
              message.username = message.sender;
              message.receiver = self.state.activeUserID;
              message.fromMe = message.sender === self.props.userProfile._id
              self.addMessage(message);
              self.addLastMessage(message);
            }

            componentMessages = <Messages
              messages={self.state.messageStack[self.state.activeUserID]} 
              addMessage={(message)=>self.addMessage(message)} addLastMessage={(message)=>self.addLastMessage(message)}
              sender={self.props.userProfile._id} receiver={self.state.activeUserID}/>;

            if(self.state.justLoggedIn && self.props.loggedin){
              var chatObj = {
                eventType: 'chatbotClient:initiateWelcomeMessage',
                data: self.props.userProfile._id
              }
              PubSub.publish('ChatEndPoint', chatObj);
              self.state.justLoggedIn = false;
            }
          })
          .catch(function(error) {
            console.log(error);
          })
       }
       active = this.state.activeUserFullName;
    }
    return (
      <div className={divMainClasses}>
        <div className="chatapp-container">
          <div className="chatapp-userContainer" id="userContainer">
            <Users users={this.state.users} selectedUser={this.state.activeUserID} selectedUserFullName={this.state.activeUserFullName} lastMessageRec={lastMessageRec} lastMessages={this.state.lastMessageStack} unreadCount={this.state.unreadCountStack} onTab={(activeUserID,activeUserFullname)=>this.tabChanges(activeUserID,activeUserFullname)} checkUserWin={(usersWindowOpen)=>this.toggleUserWindow(usersWindowOpen)} tabClose={this.state.tabClose} openWindow={this.state.openWindow} />
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