import React,{Component} from 'react';

class ChatRightSideHolder extends Component {
  render(){
    return(
      <div className="chat-ChatRightSideHolder">
        <div className="right-header">
          <div className="search-box">
            Search for peoples
          </div>
          <div className="icon-bar">
            <ul>
              <li>
                <div className="icon-holder">
                  <a className="fa fa-at"/>
                </div>
                <div>MENTION</div>
              </li>
              <li>
                <div className="icon-holder">
                  <a className="fa fa-users"/>
                </div>
                <div>COMMUNITY</div>
              </li>
              <li>
                <div className="icon-holder">
                  <a className="fa fa-envelope-o"/>
                </div>
                <div>INBOX</div>
              </li>
              <li>
                <div className="icon-holder">
                  <a className="fa fa-align-right"/>
                </div>
                <div>NEWS</div>
              </li>
              <li>
                <div className="icon-holder">
                  <a className="fa fa-cog"/>
                </div>
                <div>SETTINGS</div>
              </li>
            </ul>
          </div>
        </div>

        <div className="right-footer">

        </div>
      </div>
    )
  }
}
export default ChatRightSideHolder;
