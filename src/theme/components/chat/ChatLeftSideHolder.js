import React,{Component} from 'react';

import ChatUsers from './ChatUsers'

class ChatLeftSideHolder extends Component {
  render(){
    return(
      <div className="chat-ChatLeftSideHolder">
        
        <ChatUsers {...this.props} />

        <div className="anonymous">
          ANONYMOUS
        </div>
        <div className="beautyTips">
          <div>
            Beauty tips
            <i className="fa fa-thumb-tack"></i>
          </div>
          <div className="gaming">Gaming</div>
        </div>
        <div className="worldChat">
          WORLD CHAT
        </div>
      </div>
    )
  }
}
export default ChatLeftSideHolder;
