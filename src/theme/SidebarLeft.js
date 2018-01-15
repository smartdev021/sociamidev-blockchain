/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {Link} from 'react-router-dom'

import {Icon} from 'react-fa'

import ActionLink from '~/src/components/common/ActionLink'

import ActivityTypes from "~/src/common/ActivityTypes"

import "~/src/theme/css/sidebarLeft.css"

import {
  fetchUserFriends
} from '~/src/redux/actions/social'

import {
  activitiesFetch,
  markActivitySeen,
} from '~/src/redux/actions/activities'

class SidebarLeft extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      toggleFriendsUpdate: false,
      intervalId: undefined,
    }
  }

  componentWillMount() {
    if (this.props.isAuthorized && !this.props.userFriends.isFetching) {
      this.props.fetchUserFriends(this.props.userProfile._id);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isAuthorized != this.props.isAuthorized) {
      if (this.props.isAuthorized) {
        this.props.fetchUserFriends(this.props.userProfile._id);
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

  //Temporary solution to update user activities once per... time
  componentDidMount() {
    var intervalId = setInterval(()=>this.timer(), 5000);
    this.setState({intervalId: intervalId});
  }
 
  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }
 
  timer() {
    this.setState({ toggleFriendsUpdate: !this.state.toggleFriendsUpdate});
  }
  //---------------------------------------------------------------------

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

    let ListOfFriends = this.props.userFriends.friends;

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

    return newListOfFriends;
  }

  renderActivity(activity) {
    let result = <span className="friend-news-feed-text"></span>;

    switch(activity.activity.type) {
      case ActivityTypes.FRIEND_PROGRESSIONTREE_STARTED:
      {
        result = <span className="friend-news-feed-text">Has started: 
        <Link to={`/progressionTreeBrowser?id=${activity.activity.metadata.treeId}`} 
          onClick={()=>this.props.markActivitySeen(activity.activity._id, activity.userID, this.props.userProfile._id)}>
          {activity.activity.metadata.treeName}
        </Link></span>;
        
        break;
      }
      case ActivityTypes.FRIEND_NEW_PROJECT_CREATED:
      {
        result = <span className="friend-news-feed-text">Has created: 
        <Link to={`/projectBrowser?id=${activity.activity.metadata.projectID}`} 
          onClick={()=>this.props.markActivitySeen(activity.activity._id, activity.userID, this.props.userProfile._id)}>
          {activity.activity.metadata.projectName}
        </Link></span>;

        break;
      }
      case ActivityTypes.FRIEND_NEW_FRIEND_ADDED:
      {
        result = <span className="friend-news-feed-text">Has added: 
        <Link to={`/userProfile?id=${activity.activity.metadata.friend.id ? activity.activity.metadata.friend.id 
        : activity.activity.metadata.friend._id}`}
          onClick={()=>this.props.markActivitySeen(activity.activity._id, activity.userID, this.props.userProfile._id)}>
          {activity.activity.metadata.friend.firstName}
        </Link></span>;

        break;
      }
      default:
        break;
    }

    return result;
  }

  renderFriends() {
    const ListOfFriends = this.attachActivitiesToFriends(this.getListOfFriends());
    
    const that = this;

    if (this.props.userFriends.isFetching) {
      return (
        <div id="list-friends">
          <p>Fetching friends... <Icon spin name="spinner"/></p>
        </div>
      );
    } 
    else {
      if (ListOfFriends.length == 0) {
        return (
          <div id="list-friends">
            <p>You haven't added friends yet</p>
          </div>);
      }
      else {
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
                          ? that.renderActivity(friend.activities[Math.floor(Math.random() * (friend.activities.length - 0)) + 0])
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
    }
  }

  render() {
    const ProfileImage = this.props.userProfile.pictureURL ? this.props.userProfile.pictureURL
    : "http://sociamibucket.s3.amazonaws.com/assets/images/custom_ui/friends-list/Danicon.png";

    return (
      <aside>
        <div id="sidebar-left">
        <div id="user-status-widget">
          <div className="user-widget">
            <img src={ProfileImage}/>
            <div id="user-text">
              Good Morning {this.props.userProfile.firstName ? this.props.userProfile.firstName : "Dan"}, update your status here
            </div>
            <div id="user-rating">
              {this.props.userProfile.rating > 0 && this.props.userProfile.rating}
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
  markActivitySeen: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  fetchUserFriends: bindActionCreators(fetchUserFriends, dispatch),
  activitiesFetch: bindActionCreators(activitiesFetch, dispatch),
  markActivitySeen: bindActionCreators(markActivitySeen, dispatch),
})

const mapStateToProps = state => ({
  isAuthorized: state.userProfile.isAuthorized,
  userProfile: state.userProfile.profile,
  userFriends: state.userFriends,
  userFriendsActivities: state.userFriendsActivities,
})

export default connect(mapStateToProps, mapDispatchToProps)(SidebarLeft);