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

class SidebarLeft extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isAuthorized != this.props.isAuthorized) {
      if (this.props.isAuthorized) {
        //TODO: Deal with the issue of incorrect state update during mount/unmount
        //this.props.fetchUserFriends(this.props.userProfile._id);
        console.log("SidebarLeft AUTHORIZED this.props.userProfile._id: " + this.props.userProfile._id);
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

    const ListOfFriends = (this.props.userFriends && this.props.userFriends.length > 0) ? this.props.userFriends: DummyFriendsList;

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
                  <div className="user-text-name">{friend.firstName + " " + friend.lastName}</div>
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
  fetchUserFriends: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  fetchUserFriends: bindActionCreators(fetchUserFriends, dispatch)
})

const mapStateToProps = state => ({
  isAuthorized: state.isAuthorized,
  userProfile: state.userProfile,
  userFriends: state.userFriends,
})

export default connect(mapStateToProps, mapDispatchToProps)(SidebarLeft);