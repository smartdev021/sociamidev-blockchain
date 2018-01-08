/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {Link} from 'react-router-dom'
import { Redirect } from 'react-router-dom'

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
    console.log("Notification clicked");
    this.props.onClose();
  }

  renderNotifications() {
    const DummyNotifications = [
      { title: "Daniel has accepted your Hangout on roadmap 'Data Science'", metaData: {task: {_id: "44h34gh43y34h34"}}, isSeen: false },
      { title: "John has added his answers for your Hangout 'Big Data'", isSeen: true },
      { title: "Mery has cancelled her Hagout on roadmap 'Python", metaData: {task: {_id: "44h34gh43y34h34"}}, isSeen: false },
      { title: "Mike has started the Hangout", metaData: {task: {_id: "44h34gh43y34h34"}}, isSeen: true },
      { title: "Lydia has joined your Hangout 'Data Science'", metaData: {task: {_id: "44h34gh43y34h34"}}, isSeen: false },
    ];
    const that = this;
    return (
      <div className="container-fluid">
        {
          DummyNotifications.map(function(notification, i) {
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
}


const mapDispatchToProps = dispatch => ({
});

const mapStateToProps = state => ({
  isAuthorized: state.userProfile.isAuthorized
});

//withRouter - is a workaround for problem of shouldComponentUpdate when using react-router-v4 with redux
export default connect(mapStateToProps, mapDispatchToProps)(require('react-click-outside')(Notifications));