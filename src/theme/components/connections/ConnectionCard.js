import React from 'react';
import PubSub from 'pubsub-js';

let  fallbackProfilePic = 'https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/userProfile/default-profile.png';

class ConnectionCard extends React.Component{
  
  openChatWindow(connection){
    let data = {}
    data.user = {
      _id: connection.id,
      firstName: connection.firstName,
      lastName: connection.lastName
    }
    const chatWindow = document.getElementById('chat-popout');
    chatWindow.click();
    const chatBoxElement = document.getElementById(data.user._id);
    if (chatBoxElement) {
      chatBoxElement.click();
    } else {
      PubSub.publish('OpenChat', data);
    }
  }
  
  render(){
    return (
      <div className="connection-card">
        <div className="connection-profile-pic">
          <img
            onClick={this.props.onClickCheckUserProfile}
            src={this.props.connection.profilePic || fallbackProfilePic}
            onError={e => { e.target.src = fallbackProfilePic; }} />
        </div>
        <div className="connection-info">
          <h1 onClick={this.props.onClickCheckUserProfile} title={`${this.props.connection.firstName} ${this.props.connection.lastName}`}>
            {this.props.connection.firstName} {this.props.connection.lastName}
          </h1>
          <p>Innovation is widely known as a value which is worth pursuing</p>
        </div>
        <div className="connection-actions">
          <a href="#" className="btn-prim" onClick={this.props.onPrimaryAction}>{this.props.actionName || 'Add'}</a>
          {this.props.secondaryAction
            && <a href="#" className="btn-prim" onClick={this.props.onSecondaryAction}>{this.props.secondaryAction}</a> }
          <a href="#" className="btn-circ" onClick={()=>this.openChatWindow(this.props.connection)}>
            <img src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/userProfile/send-arrow.png" alt="" />
          </a>
        </div>
        <ul className="connection-details">
          <li>
            <span>Friends</span>
            <div className="sql-badge">
              <a href="#">{this.props.connection.connections.friendCount}</a>
            </div>
          </li>
          <li>
            <span>Progression Trees</span>
            <div className="sql-badge">
              <a href="#">{this.props.connection.connections.progressionCount}</a>
            </div>
          </li>
          <li>
            <span>Challenges</span>
            <div className="sql-badge">
              <a href="#">{this.props.connection.connections.projectCount}</a>
            </div>
          </li>
          <li>
            <span>Tasks</span>
            <div className="sql-badge">
              <a href="#">{this.props.connection.connections.taskCount}</a>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

export default ConnectionCard;