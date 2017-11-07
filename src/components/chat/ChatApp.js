require('../../css/ChatApp.css');

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

class ChatApp extends React.Component {

  //socket = {};
  //activeUser = "";
  //mySocketId = "";
  constructor(props) {
    super(props);
    this.state = { messageStack: [],users: [], chatWindowOpen: 2, tabClose: -2 };
    this.sendHandler = this.sendHandler.bind(this);
    this.tabChanges = this.tabChanges.bind(this);
    this.closeChatWindow = this.closeChatWindow.bind(this);
    this.toggleUserWindow = this.toggleUserWindow.bind(this);

    // Connect to the server
    //this.socket = io(BackendURL, { query: `username=${props.username}` }).connect();
    this.socket = io(BackendURL, { query: `username=${props.username}&firstName=${props.firstName}&lastName=${props.lastName}` }).connect();

    this.socket.on('server:user', tempUsers => {
      this.state.users = [];

      tempUsers = tempUsers.filter(function(user) {
        return user.username !== props.username;
      });

      this.setState(function() {
        return{
          users: tempUsers
        }
      });
    });

    // Listen for messages from the server
    this.socket.on('server:message', message => {
      this.addMessage(message);
    });
  }

  tabChanges(value,value1){
    this.activeUser = value;

    if(this.state.chatWindowOpen == 0){
      this.setState(function() {
        return{
          chatWindowOpen: 1
        }
      });
    }

    ReactDom.render(
      <Messages messages={this.state.messageStack[this.activeUser]} />,
      document.getElementById('test')
    );

    ReactDom.render(
      <ChatInput onSend={this.sendHandler} />,
      document.getElementById('msgBox')
    );

    ReactDom.render(
      <span className="name">{value1}</span>,
      document.getElementById('activeUserName')
    );
  }

  sendHandler(message) {
    const messageObject = {
      sender: this.props.username,
      message,
      receiver: this.activeUser
    };
    // Emit the message to the server
    this.socket.emit('client:message', messageObject);

    messageObject.fromMe = true;
    this.addMessage(messageObject);
  }

  addMessage(message) {
    // Append the message to the component state
    var tempReceiver = "";
    if(message.sender == this.props.username){
      tempReceiver = message.receiver;
    }
    else{
      tempReceiver = message.sender;
    }
    
    if(!(tempReceiver in this.state.messageStack)){
      var messages = [];
      messages.push(message);
      this.state.messageStack[tempReceiver] = messages;
    }
    else{
      var messages = this.state.messageStack[tempReceiver];
      messages.push(message);
      this.state.messageStack[tempReceiver] = messages;
    }
    this.setState(function() {
      return{
        messageStack: this.state.messageStack
      }
    });

    ReactDom.render(
      <Messages messages={this.state.messageStack[this.activeUser]} />,
      document.getElementById('test')
    );
  }

  closeChatWindow() {
    this.setState(function() {
      return{
        chatWindowOpen: 0
      }
    });
  }

  toggleUserWindow(usersWindowOpen) {
    if(usersWindowOpen == 0){
      this.setState(function() {
        return{
          chatWindowOpen: 2
        }
      });
    }
    else if(usersWindowOpen == 1){
      this.setState(function() {
        return{
          chatWindowOpen: 0
        }
      });
    }
  }

  render() {
    const chatWindowClass = this.state.chatWindowOpen == 1 ? "chatWindowShow" : "chatWindowHide";
    const divChatClasses = `chatapp-chatContainer ${chatWindowClass}` ;
    const chatMainClass = this.state.chatWindowOpen == 0 ? "chatapp-main-container-2" : this.state.chatWindowOpen == 1? "chatapp-main-container-1" : "chatapp-main-container-3";
    const divMainClasses = `chatapp-main-container ${chatMainClass}` ;
    return (
      <div className={divMainClasses}>
        <div className="chatapp-container">
          <div className="chatapp-userContainer" id="userContainer">
            <Users users={this.state.users} onTab={this.tabChanges} checkUserWin={this.toggleUserWindow} tabClose={this.state.tabClose} />
          </div>
          <div className={divChatClasses} id="chatContainer">
            <div className="topName">
              <span>To: <span id="activeUserName"></span></span>
              <span className="close-chat" id="close-chat" onClick={this.closeChatWindow}>x</span>
            </div>
            <div id="test" className="messages"></div>
            <div id="msgBox" className="write-container"></div>
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
