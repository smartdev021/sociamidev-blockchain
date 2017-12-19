/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {Link} from 'react-router-dom'

import ActionLink from '~/src/components/common/ActionLink'

import ActivityTypes from "~/src/common/ActivityTypes"

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
          return friend.id;
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

    let ListOfFriends = (this.props.userFriends.friends && this.props.userFriends.friends.length > 0) 
    ? this.props.userFriends.friends: DummyFriendsList;

    console.log("this.props.userFriends: " + this.props.userFriends);
    console.dir(this.props.userFriends);

    //TODO: Remove once profile image is fetched from back-end
    for (let i = 0; i < ListOfFriends.length; ++i) {
      if (!ListOfFriends[i].profileImage) {
        ListOfFriends[i].profileImage = DummyFriendImages[Math.floor(Math.random() * (DummyFriendImages.length - 0)) + 0];
      }

      if (!ListOfFriends[i].userText) {
        ListOfFriends[i].userText = "Mobile app testing 50 mutual friends";
      }
    }

    return ListOfFriends;
  }

  attachActivitiesToFriends(listOfFriends = []) {
    const UserFriendsActivities = this.props.userFriendsActivities.activities;
    if ((Object.keys(UserFriendsActivities).length === 0 && UserFriendsActivities.constructor === Object) 
      || listOfFriends.length == 0
        || !listOfFriends[0].id) {
      return listOfFriends;
    }

    let newListOfFriends = [];

    for (let i = 0; i < listOfFriends.length; ++i) {
      const currentFriend = listOfFriends[i];

      newListOfFriends.push(currentFriend);

      if (UserFriendsActivities[currentFriend.id]) {
        newListOfFriends[newListOfFriends.length - 1].activities = UserFriendsActivities[currentFriend.id].activities; 
      }
    }

    console.log("AFTER ATTACHING ACTIVITIES, LIST OF FRIENDS LOOKS LIKE THIS: ");
    console.dir(newListOfFriends);

    return newListOfFriends;
  }

  renderActivity(activity) {
    let result = <span className="friend-news-feed-text">Unhandled feed</span>;

    console.log("RENDER ACTIVITY: activity");
    console.dir(activity);

    switch(activity.type) {
      case ActivityTypes.FRIEND_PROGRESSIONTREE_STARTED:
      {
        result = <span className="friend-news-feed-text">Has started: 
        <Link to={`/progressionTreeBrowser?id=${activity.metadata.treeId}`}>{activity.metadata.treeName}</Link></span>;
        
        break;
      }
      case ActivityTypes.FRIEND_NEW_PROJECT_CREATED:
      {
        result = <span className="friend-news-feed-text">Has created: 
        <Link to={`/projectBrowser?id=${activity.metadata.projectID}`}>{activity.metadata.projectName}</Link></span>;

        break;
      }
      /*case ActivityTypes.FRIEND_NEW_FRIEND_ADDED:
      {
        result = <span className="friend-news-feed-text">Has added: 
        <Link to={`/userProfileBrowser?id=${activity.metadata.friend.id}`}>{activity.metadata.friend.firstname}</Link></span>;

        break;
      }*/
      default:
        break;
    }

    return result;
  }

  renderFriends() {
    const ListOfFriends = this.attachActivitiesToFriends(this.getListOfFriends());

    const that = this;

    return (
      <div id="list-friends">
        {
          ListOfFriends.map(function(friend, i) {
            return (
              <div key={i} className="friend-widget">
                <img src={friend.profileImage}/>
                <div id="user-text">
                  <div className="user-text-name">{friend.firstName}</div>
                    {(friend.activities && friend.activities.length > 0) 
                      ? that.renderActivity(friend.activities[0].activity)
                      : friend.userText
                    }
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