/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import ActionLink from '~/src/components/common/ActionLink'

import "~/src/theme/css/sidebarLeft.css"

import {
  fetchUserFriends
} from '~/src/redux/actions/social'

import {
  activitiesFetch
} from '~/src/redux/actions/activities'

class SidebarLeft extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isAuthorized != this.props.isAuthorized) {
      if (this.props.isAuthorized) {
        this.props.fetchUserFriends(this.props.userProfile._id);
        console.log("SidebarLeft AUTHORIZED this.props.userProfile._id: " + this.props.userProfile._id);
      }
    }

    if (prevProps.userFriends.friends.length != this.props.userFriends.friends.length) {
      if (this.props.userFriends.friends.length > 0) {
        const UserFriendIDs = this.props.userFriends.friends.map(function(friend, i){
          return friend._id;
        });
        this.props.activitiesFetch(UserFriendIDs);
      }
    }
  }

  getListOfFriends() {
    const DummyFriendImages = [
      "http://sociamibucket.s3.amazonaws.com/assets/images/custom_ui/friends-list/annalisaicon.png",
      "http://sociamibucket.s3.amazonaws.com/assets/images/custom_ui/friends-list/johnicon.png",
      "http://sociamibucket.s3.amazonaws.com/assets/images/custom_ui/friends-list/Joshicon.png", 
      "http://sociamibucket.s3.amazonaws.com/assets/images/custom_ui/friends-list/marciaicon.png",
      "http://sociamibucket.s3.amazonaws.com/assets/images/custom_ui/friends-list/Mathildaicon.png",
      "http://sociamibucket.s3.amazonaws.com/assets/images/custom_ui/friends-list/matthewicon.png", 
      "http://sociamibucket.s3.amazonaws.com/assets/images/custom_ui/friends-list/Thomasicon.png",
    ];

    const DummyFriendsList = [
      {
        firstName: "Annalisa", lastName: "",
        userText: "Mobile app testing 50 mutual friends", 
        profileImage: DummyFriendImages[Math.floor(Math.random() * (DummyFriendImages.length - 0)) + 0]
      },
      {
        firstName: "Annalisa", lastName: "",
        userText: "Mobile app testing 50 mutual friends", 
        profileImage: DummyFriendImages[Math.floor(Math.random() * (DummyFriendImages.length - 0)) + 0]
      },
      {
        firstName: "Annalisa", lastName: "", 
        userText: "Mobile app testing 50 mutual friends", 
        profileImage: DummyFriendImages[Math.floor(Math.random() * (DummyFriendImages.length - 0)) + 0]
      },
      {
        firstName: "Annalisa", lastName: "", 
        userText: "Mobile app testing 50 mutual friends", 
        profileImage: DummyFriendImages[Math.floor(Math.random() * (DummyFriendImages.length - 0)) + 0]
      },
      {
        firstName: "Annalisa", lastName: "", 
        userText: "Mobile app testing 50 mutual friends", 
        profileImage: DummyFriendImages[Math.floor(Math.random() * (DummyFriendImages.length - 0)) + 0]
      },
      {
        firstName: "Annalisa", lastName: "", 
        userText: "Mobile app testing 50 mutual friends", 
        profileImage: DummyFriendImages[Math.floor(Math.random() * (DummyFriendImages.length - 0)) + 0]
      },
      {
        firstName: "Annalisa", lastName: "", 
        userText: "Mobile app testing 50 mutual friends", 
        profileImage: DummyFriendImages[Math.floor(Math.random() * (DummyFriendImages.length - 0)) + 0]
      },
      {
        firstName: "Annalisa", lastName: "", 
        userText: "Mobile app testing 50 mutual friends", 
        profileImage: DummyFriendImages[Math.floor(Math.random() * (DummyFriendImages.length - 0)) + 0]
      },
      {
        firstName: "Annalisa", lastName: "", 
        userText: "Mobile app testing 50 mutual friends", 
        profileImage: DummyFriendImages[Math.floor(Math.random() * (DummyFriendImages.length - 0)) + 0]
      },
      {
        firstName: "Annalisa", lastName: "", 
        userText: "Mobile app testing 50 mutual friends", 
        profileImage: DummyFriendImages[Math.floor(Math.random() * (DummyFriendImages.length - 0)) + 0]
      },
    ];

    const ListOfFriends = (this.props.userFriends.friends && this.props.userFriends.friends.length > 0) 
    ? this.props.userFriends.friends: DummyFriendsList;

    console.log("this.props.userFriends: " + this.props.userFriends);
    console.dir(this.props.userFriends);

    return ListOfFriends;
  }

  renderFriends() {
    const ListOfFriends = this.getListOfFriends();

    return (
      <div id="list-friends">
        {
          ListOfFriends.map(function(friend, i) {
            return (
              <div key={i} className="friend-widget">
                <img src={friend.profileImage}/>
                <div id="user-text">
                  <div className="user-text-name">{friend.firstName}</div>
                  {friend.userText}
                </div>
              </div>
            )
          })
        }
    </div>
    );
  }

  render() {
    const DanImage = "http://sociamibucket.s3.amazonaws.com/assets/images/custom_ui/friends-list/Danicon.png";

    return (
      <aside>
        <div id="sidebar-left">
        <div id="user-status-widget">
          <div className="user-widget">
            <img src={DanImage}/>
            <div id="user-text">
              Good Morning Dan, update your status here
            </div>
          </div>
          <hr></hr>
          <div id="status-input-container">
            <input type="text" autoComplete="off" id="status-input" placeholder="Testing"/>
          </div>
        </div>
        {this.renderFriends()}
      </div>
     </aside>
    );
  }
}

SidebarLeft.propTypes = {
  isAuthorized: PropTypes.bool.isRequired,
  userProfile: PropTypes.object.isRequired,
  userFriends: PropTypes.object.isRequired,
  userFriendsActivities: PropTypes.object.isRequired,
  activitiesFetch: PropTypes.func.isRequired,
  fetchUserFriends: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  fetchUserFriends: bindActionCreators(fetchUserFriends, dispatch),
  activitiesFetch: bindActionCreators(activitiesFetch, dispatch)
})

const mapStateToProps = state => ({
  isAuthorized: state.isAuthorized,
  userProfile: state.userProfile,
  userFriends: state.userFriends,
  userFriendsActivities: state.userFriendsActivities,
})

export default connect(mapStateToProps, mapDispatchToProps)(SidebarLeft);