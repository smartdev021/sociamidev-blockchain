import React from 'react';

import User from './User';

class Users extends React.Component {

  constructor(props) {
    super(props);
    this.state = {selectedItem: '-1', usersWindowOpen: 0, messageIndicatorClass : "newMessageIndicatorHide"};
  }

  componentWillReceiveProps(nextProps){
    if(this.props.lastMessageRec !== nextProps.lastMessageRec){
      if(this.state.usersWindowOpen == 0){
        this.state.messageIndicatorClass = "newMessageIndicatorShow";
      }
      else{
        this.state.messageIndicatorClass = "newMessageIndicatorHide";
      }
    }

    if(this.state.usersWindowOpen == 1){
      this.state.messageIndicatorClass = "newMessageIndicatorHide";
    }
  }

  componentDidUpdate() {
    // There is a new message in the state, scroll to bottom of list
    const objDiv = document.getElementById('userList');
    objDiv.scrollTop = objDiv.scrollHeight;
  }

  tabChanges(value,value1,value2){
    this.props.onTab(value,value1);
    this.setState({ selectedItem: value2 });
  }

  toggleUsersWindow(){
    if(this.state.usersWindowOpen == 1){
      this.state.usersWindowOpen = 0;
      this.props.checkUserWin(this.state.usersWindowOpen)
    }
    else if(this.state.usersWindowOpen == 0){
      this.state.usersWindowOpen = 1;
      this.props.checkUserWin(this.state.usersWindowOpen)
    }
  }

  render() {
    // Loop through all the messages in the state and create a Message component
    var className = "newMessageIndicator " + this.state.messageIndicatorClass;
    const classes = `${className}`;
    const users = this.props.users.map((user, i) => {
      const tempLastMessages = this.props.lastMessages;
      var tempLastMessage = "";
      var tempLastMessageTimeStamp = "";
      if(user.username in tempLastMessages){
        var message = tempLastMessages[user.username];
        var tempLastMessage = message.message;
        var tempLastMessageTimeStamp = message.time;
      }
      return (
        <User
          key={i}
          tabKey={i}
          username={user.username}
          firstName = {user.firstName}
          lastName = {user.lastName}
          userType = {user.userType}
          lastMessage = {tempLastMessage}
          lastMessageTimeStamp = {tempLastMessageTimeStamp}
          lastMessageRec = {this.props.lastMessageRec}
          selectedUser = {this.props.selectedUser}
          selectedTab = {this.state.selectedItem}
          onTab={(value,value1,value2)=>this.tabChanges(value,value1,value2)}
        />
      );
    });
    
    return (
      <div>
        <div className="messenger-popup" onClick={()=>this.toggleUsersWindow()}>
				  <span className="messenger-title">Chat</span>
          <div className={classes}></div>
			</div>
        <div className="users-top">
          <div className="search-field">
					  <div className="search-img">
						  <img alt="search"  src="../../assets/img/search.png"/>
					  </div>
            <input className="inputStyle" type="text" placeholder="Search.." />
          </div>
          <a className="search"></a>
        </div>
        <div className="users" id='userList'>
              { users }
        </div>
      </div>
    );
  }
}

Users.defaultProps = {
  users: []
};

export default Users;
