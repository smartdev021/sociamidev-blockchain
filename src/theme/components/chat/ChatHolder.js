require('~/src/css/ChatHolder.css');
import React,{Component} from 'react';

import ChatHeader from './ChatHeader';
import ChatLeftSideHolder from './ChatLeftSideHolder';
import ChatRightSideHolder from './ChatRightSideHolder';

class ChatHolder extends Component {
  render(){
    return(
      <div className={`chat-holder ${this.props.isChatHolder ? 'active-modal' : ''}`}>
        <div className="chat-container">
          <ChatHeader
            toggleChatHolder={this.props.toggleChatHolder}
            {...this.props}
          />
          <div className="chat-content-holder">
            <ChatLeftSideHolder {...this.props} />
            <ChatRightSideHolder {...this.props} />
          </div>
        </div>
      </div>
    )
  }
}
export default ChatHolder;
