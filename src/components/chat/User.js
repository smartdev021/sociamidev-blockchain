import React from 'react';

class User extends React.Component {

  constructor(props) {
    super(props);
    this.state = {selectedItem: '-2', unreadCount: 0, userSelected:""};
  }

  componentWillReceiveProps(nextProps){
    if(this.props.lastMessageRec !== nextProps.lastMessageRec){
      var tempLastMessageRec = nextProps.lastMessageRec;
      if(nextProps.username == tempLastMessageRec.sender){
        var tempUnreadCount = this.state.unreadCount;
        tempUnreadCount = tempUnreadCount + 1;
        this.state.unreadCount = tempUnreadCount;
      }
    }
    if(this.state.userSelected == nextProps.selectedUser && this.state.userSelected !== ""){
      this.state.unreadCount = 0;
    }
  }

  onItemClick(event) {
    event.preventDefault(); 
    this.state.userSelected = event.currentTarget.id;
    this.state.selectedItem = event.currentTarget.dataset.id;
    this.props.onTab(event.currentTarget.id,event.currentTarget.dataset.user,event.currentTarget.dataset.id);
  }

  render() {
    const tempClasses = this.state.unreadCount == 0 ? "messageCountContainerHide" : "messageCountContainerShow";
    const messageCountContainerClasses = `messageCountContainer ${tempClasses}`;
    const tabClass = String(this.state.selectedItem) === String(this.props.selectedTab) ? "personSelected" : "person";
    const classes = `${tabClass}` ;
    var fullname = this.props.firstName + " " + this.props.lastName;
    var imgSrc = "";
    if(this.props.userType == "facebook"){
      imgSrc = "http://graph.facebook.com/" + this.props.username + "/picture?type=square";
    }
    else{
      imgSrc = "https://s3.amazonaws.com/FringeBucket/default-user.png";
    }
    return (
          <div data-id={`${this.props.tabKey}`} className={classes} onClick={(event)=>this.onItemClick(event)}  id={`${this.props.username}`} data-user={`${fullname}`}>
            <img src={imgSrc} alt="" />
            <span className="name">{ fullname }</span>
            <span className="time">{this.props.lastMessageTimeStamp}</span>
            <span className="preview">{this.props.lastMessage}</span>
            <div className={messageCountContainerClasses}><span className="messageCount">{this.state.unreadCount}</span></div>
          </div>
    );
  }
}

User.defaultProps = {
  tabKey:'',
  username: ''
};

export default User;
