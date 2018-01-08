/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {Link} from 'react-router-dom'
import { Redirect } from 'react-router-dom'

import ActivityTypes from "~/src/common/ActivityTypes"

import {
  fetchUserActivities,
} from '~/src/redux/actions/authorization'

import ActionLink from '~/src/components/common/ActionLink'

import "~/src/theme/css/notifications.css"

class Notifications extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if (this.props.isAuthorized) {
      this.props.fetchUserActivities(this.props.currentUserID);
    }
  }

  handleClickOutside() {
    this.props.onClose();
  }

  handleNotificationClick(notification) {
    console.log("Notification clicked");
    this.props.onClose();
  }

  renderNotifications() {
    const DummyNotifications = [
      { title: "Daniel has accepted your Hangout on roadmap 'Data Science'", isSeen: false },
      { title: "John has added his answers for your Hangout 'Big Data'", isSeen: true },
      { title: "Mery has cancelled her Hagout on roadmap 'Python",isSeen: false },
      { title: "Mike has started the Hangout", isSeen: true },
      { title: "Lydia has joined your Hangout 'Data Science'", isSeen: false },
    ];

    const TaskStartedActivities = this.props.userActivities ? this.props.userActivities.filter(function(activity) {
      return activity.type == ActivityTypes.TASK_STARTED;
    }) : [];

    const Notifications = TaskStartedActivities.length > 0 
    ? 
    TaskStartedActivities.map(function(activity, i) {
      return {
        title: `${activity.metadata.task.creator.firstName} has started a Hangout on skill "${activity.metadata.task.metaData.subject.skill.name}"`,
        isSeen: false,
      };
    })
    : DummyNotifications;

    const that = this;
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
    fetchUserActivities: PropTypes.func.isRequired,
    userActivities: PropTypes.array.isRequired,
}


const mapDispatchToProps = dispatch => ({
  fetchUserActivities: bindActionCreators(fetchUserActivities, dispatch),
});

const mapStateToProps = state => ({
  currentUserID: state.userProfile.profile._id,
  isAuthorized: state.userProfile.isAuthorized,
  userActivities: state.userProfile.activities.data,
});

//withRouter - is a workaround for problem of shouldComponentUpdate when using react-router-v4 with redux
export default connect(mapStateToProps, mapDispatchToProps)(require('react-click-outside')(Notifications));