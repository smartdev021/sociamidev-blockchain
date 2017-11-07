import React from 'react';

import User from './User';

class Users extends React.Component {

  constructor(props) {
    super(props);
    this.state = {selectedItem: '-1', usersWindowOpen: 0};
    this.tabChanges = this.tabChanges.bind(this);
    this.toggleUsersWindow = this.toggleUsersWindow.bind(this);
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
    const users = this.props.users.map((user, i) => {
      return (
        <User
          key={i}
          tabKey={i}
          username={user.username}
          firstName = {user.firstName}
          lastName = {user.lastName}
          selectedTab = {this.state.selectedItem}
          onTab={this.tabChanges}
        />
      );
    });
    
    return (
      <div>
        <div className="messenger-popup" onClick={this.toggleUsersWindow}>
				  <span className="messenger-title">Sociami Messenger</span>
			</div>
        <div className="users-top">
          <div className="search-field">
					  <div className="search-img">
						  <img alt="search"  src="././assets/img/search.png"/>
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
