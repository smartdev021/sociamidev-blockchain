/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { ListGroupItem, ListGroup } from 'react-bootstrap';

import ActivityTypes from '~/src/common/ActivityTypes';

import ActionLink from '~/src/components/common/ActionLink';

import '~/src/theme/css/notifications.css';

class Notifications extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClickOutside() {
    this.props.onClose();
  }

  handleNotificationClick(notification) {
    this.props.markActivitySeen(
      notification._id,
      this.props.currentUserID,
      this.props.currentUserID
    );
    this.props.onClose();
  }

  renderNotifications() {
    const that = this;
    const TaskStartedActivities = this.props.userActivities
      ? this.props.userActivities.filter(function(activity) {
          return (
            activity.type == ActivityTypes.TASK_STATUS_CHANGED ||
            activity.type == ActivityTypes.USER_TASK_ACTION
          );
        })
      : [];

    const Notifications =
      TaskStartedActivities.length > 0
        ? TaskStartedActivities.map(function(activity, i) {
            if (activity.subType == 'started') {
              return {
                title: `${
                  activity.metadata.task.creator.firstName
                } has started a Hangout on skill "${
                  activity.metadata.task.metaData.subject.skill.name
                }"`,
                isSeen:
                  activity.witnessIDs &&
                  activity.witnessIDs.find(function(witnessID) {
                    return witnessID == that.props.currentUserID;
                  }),
                _id: activity._id
              };
            } else if (activity.subType == 'cancelled') {
              return {
                title: `${
                  activity.metadata.userActor.firstName
                } has cancelled a Hangout on skill "${
                  activity.metadata.task.metaData.subject.skill.name
                }"`,
                isSeen:
                  activity.witnessIDs &&
                  activity.witnessIDs.find(function(witnessID) {
                    return witnessID == that.props.currentUserID;
                  }),
                _id: activity._id
              };
            } else if (activity.subType == 'leave') {
              return {
                title: `${
                  activity.metadata.userActor.firstName
                } has left your Hangout on skill "${
                  activity.metadata.task.metaData.subject.skill.name
                }"`,
                isSeen:
                  activity.witnessIDs &&
                  activity.witnessIDs.find(function(witnessID) {
                    return witnessID == that.props.currentUserID;
                  }),
                _id: activity._id
              };
            } else if (activity.subType == 'cancelled_automatically') {
              return {
                title: `Hangout on skill "${
                  activity.metadata.task.metaData.subject.skill.name
                } has been cancelled due to not enough participants!"`,
                isSeen:
                  activity.witnessIDs &&
                  activity.witnessIDs.find(function(witnessID) {
                    return witnessID == that.props.currentUserID;
                  }),
                _id: activity._id
              };
            } else {
              return {
                title: `Unsupported notification subType "${activity.subType}"`,
                isSeen: false,
                _id: activity._id
              };
            }
          })
        : [
            {
              isSeen: true,
              title:
                'has started a Hangout on a skill on a supervised learning',
              name: 'Alisa',
              date: '2 days ago'
            },
            {
              isSeen: true,
              title:
                'has started a Hangout on a skill on a supervised learning',
              name: 'Alisa',
              date: '2 days ago'
            },
            {
              isSeen: true,
              title:
                'has started a Hangout on a skill on a supervised learning',
              name: 'Alisa',
              date: '2 days ago'
            },
            {
              isSeen: false,
              title:
                'has started a Hangout on a skill on a supervised learning',
              name: 'Alisa',
              date: '2 days ago'
            },
            {
              isSeen: false,
              title:
                'has started a Hangout on a skill on a supervised learning',
              name: 'Alisa',
              date: '2 days ago'
            }
          ];
    return (
      <ListGroup>
        <div className="notification-arrow-up" />
        <ListGroupItem className="notifyTitle">
          <div>Your Notifications {Notifications.length}</div>
        </ListGroupItem>
        <div id="notificationSection">
          {Notifications.map(function(notification, i) {
            return (
              <ListGroupItem
                key={i}
                className={
                  notification.isSeen
                    ? 'notification-item-seen notification-item'
                    : 'notification-item'
                }
              >
                <Link
                  to="/taskManagement"
                  onClick={() => that.handleNotificationClick(notification)}
                >
                  <div className="notificationRow notify-grow">
                    <div className="notify-container">
                      <div className="notifyIcon">
                        <img src="http://sociamibucket.s3.amazonaws.com/assets/images/custom_ui/friends-list/Danicon.png" />
                      </div>
                      <div className="notify-text-detail">
                        <div className="notifyDesc">
                          <span className="notify-name">
                            {notification.name}&nbsp;&nbsp;
                          </span>
                          <span className="notify-title">
                            {notification.title}
                          </span>
                        </div>
                        <div className="notify-date">{notification.date}</div>
                      </div>
                      {notification.isSeen ? (
                        <div className="notify-checked">new</div>
                      ) : (
                        <div className="notify-checked-true">
                          <span aria-hidden="true" className="fa fa-check" />
                        </div>
                      )}
                    </div>
                    <div className="notify-hide">
                      <button className="notify-btn-notification-check">
                        <span aria-hidden="true" className="fa fa-check" />&nbsp;&nbsp;START
                      </button>
                      <button className="notify-btn-notification-reschedule">
                        <span aria-hidden="true" className="fa fa-times" />&nbsp;&nbsp;RESCHEDULE
                      </button>
                    </div>
                  </div>
                </Link>
              </ListGroupItem>
            );
          })}
        </div>
        <div className="more-notifications">
          <a href="#">See all notifications ></a>
        </div>
      </ListGroup>
    );
  }

  render() {
    return <div id="notificationTile">{this.renderNotifications()}</div>;
  }
}

Notifications.PropTypes = {
  isAuthorized: PropTypes.bool.isRequired,
  userActivities: PropTypes.array.isRequired,
  markActivitySeen: PropTypes.func.isRequired
};

//withRouter - is a workaround for problem of shouldComponentUpdate when using react-router-v4 with redux
export default require('react-click-outside')(Notifications);
