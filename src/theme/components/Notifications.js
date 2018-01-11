/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {Link} from 'react-router-dom'
import { Redirect } from 'react-router-dom'

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
      return activity.type == ActivityTypes.TASK_STATUS_CHANGED;
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
    })
    : [];
    
    return (
      <div className="container-fluid">
        {
          Notifications.map(function(notification, i) {
            return (
            <div className="row" key={i}>
              <div className="col-lg-12">
                <Link to = "/taskManagement" onClick={()=>that.handleNotificationClick(notification)} className={notification.isSeen ? "notification-seen" : "notification"}>
                  {notification.title}
                </Link>
              </div>
            </div>);
          })
        }
      </div>
    );
  }

  render() {
    return (
        <div id="notifications-widget">
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