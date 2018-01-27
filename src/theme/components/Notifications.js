/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {Link} from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import {ListGroupItem, ListGroup} from 'react-bootstrap';

import {
  markActivitySeen,
} from '~/src/redux/actions/activities'

import ActivityTypes from "~/src/common/ActivityTypes"

import ActionLink from '~/src/components/common/ActionLink'

import "~/src/theme/css/notifications.css"

class Notifications extends React.Component {

  constructor(props) {
    super(props);
  }

  handleClickOutside() {
    this.props.onClose();
  }

  handleNotificationClick(notification) {
    this.props.markActivitySeen(notification._id, this.props.currentUserID, this.props.currentUserID);
    this.props.onClose();
  }

  renderNotifications() {
    const that = this;
    const TaskStartedActivities = this.props.userActivities ? this.props.userActivities.filter(function(activity) {
      return activity.type == ActivityTypes.TASK_STATUS_CHANGED || activity.type == ActivityTypes.USER_TASK_ACTION;
    }) : [];

    const Notifications = TaskStartedActivities.length > 0 
    ? 
    TaskStartedActivities.map(function(activity, i) {
      if (activity.subType == "started") {
        return {
          title: `${activity.metadata.task.creator.firstName} has started a Hangout on skill "${activity.metadata.task.metaData.subject.skill.name}"`,
          isSeen: activity.witnessIDs && activity.witnessIDs.find(function(witnessID) { return witnessID == that.props.currentUserID; }),
          _id: activity._id,
        };
      }
      else if (activity.subType == "cancelled") {
        return {
          title: `${activity.metadata.userActor.firstName} has cancelled a Hangout on skill "${activity.metadata.task.metaData.subject.skill.name}"`,
          isSeen: activity.witnessIDs && activity.witnessIDs.find(function(witnessID) { return witnessID == that.props.currentUserID; }),
          _id: activity._id,
        };
      }
      else if (activity.subType == "leave") {
        return {
          title: `${activity.metadata.userActor.firstName} has left your Hangout on skill "${activity.metadata.task.metaData.subject.skill.name}"`,
          isSeen: activity.witnessIDs && activity.witnessIDs.find(function(witnessID) { return witnessID == that.props.currentUserID; }),
          _id: activity._id,
        };
      }
      else if (activity.subType == "cancelled_automatically") {
        return {
          title: `Hangout on skill "${activity.metadata.task.metaData.subject.skill.name} has been cancelled due to not enough participants!"`,
          isSeen: activity.witnessIDs && activity.witnessIDs.find(function(witnessID) { return witnessID == that.props.currentUserID; }),
          _id: activity._id,
        };
      }
      else {
        return {
          title: `Unsupported notification subType "${activity.subType}"`,
          isSeen: false,
          _id: activity._id,
        };
      }
    })
    : [];
    return (
      <ListGroup>
        <ListGroupItem   className="notifyTitle">
          <div>
            Notifications
          </div>
        </ListGroupItem>
        <div id="notificationSection">
        {
          Notifications.map(function(notification, i) {
          return (
            <ListGroupItem key={i} className={notification.isSeen ? "notification-seen" : "notification"}>
              <Link to = "/taskManagement" onClick={()=>that.handleNotificationClick(notification)} >
                <div className="notificationRow">
                  <div className="notifyIcon">
                    <img src="http://sociamibucket.s3.amazonaws.com/assets/images/custom_ui/friends-list/Danicon.png"/>
                  </div>
                  <div className="notifyDesc">
                    {notification.title}
                  </div>
                </div>
              </Link>
            </ListGroupItem>);
          })
        }
        </div>
      </ListGroup>  
    );
  }

  render() {
    return (
        <div id="notificationTile">
          {this.renderNotifications()}
        </div>
    );
  }
}


Notifications.PropTypes = {
    isAuthorized: PropTypes.bool.isRequired,
    userActivities: PropTypes.array.isRequired,
    markActivitySeen: PropTypes.func.isRequired,
}


const mapDispatchToProps = dispatch => ({
  markActivitySeen: bindActionCreators(markActivitySeen, dispatch),
});

const mapStateToProps = state => ({
  currentUserID: state.userProfile.profile._id,
  isAuthorized: state.userProfile.isAuthorized,
  userActivities: state.userProfile.activities.data,
});

//withRouter - is a workaround for problem of shouldComponentUpdate when using react-router-v4 with redux
export default connect(mapStateToProps, mapDispatchToProps)(require('react-click-outside')(Notifications));