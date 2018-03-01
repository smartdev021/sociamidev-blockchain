import React from 'react';
import TimeAgo from 'react-timeago';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

class User extends React.Component {

  constructor(props) {
    super(props);
    this.state = {selectedItem: '-2', unreadCount: 0, userSelected:""};
  }

  componentWillReceiveProps(nextProps){
    if(this.props.lastMessageRec !== nextProps.lastMessageRec){
      var tempLastMessageRec = nextProps.lastMessageRec;
      if(nextProps.userID == tempLastMessageRec.sender){
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

    var showLastMessage = this.props.lastMessage;
    if(this.props.lastMessage.indexOf('<img') >= 0){
      showLastMessage = "image";
    }

    const statusImgSrc = this.props.loggedinStatus == true || this.props.userType == "chatbot" ? "http://s3.amazonaws.com/gs.apps.icons/B_Bpusg8EeKT7hIxPR901Q_%2Fgreen+dot.png" : "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Location_dot_grey.svg/2000px-Location_dot_grey.svg.png";
    if(this.props.userType == "facebook"){
      imgSrc = "http://graph.facebook.com/" + this.props.username + "/picture?type=square";
    }
    else if(this.props.userType == "linkedin"){
      imgSrc = "https://s3.amazonaws.com/FringeBucket/default-user.png";
    }
    else if(this.props.userType == "chatbot"){
      imgSrc = "http://blog.newrelic.com/wp-content/uploads/chatbot-300x300.jpg";
    }
    return (
          <div data-id={`${this.props.tabKey}`} className={classes} onClick={(event)=>this.onItemClick(event)}  id={`${this.props.userID}`} data-user={`${fullname}`}>
            <img src={imgSrc} alt="" className="profilePic"/>
            <span className="name">{ fullname } <img src={statusImgSrc} className="statusDot"/></span>
            <span className="time"><TimeAgo date={this.props.lastMessageTimeStamp} minPeriod={60}/></span>
            <span className="preview">{ReactHtmlParser(showLastMessage)}</span>
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
