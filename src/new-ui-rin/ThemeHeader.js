/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'

import {Icon} from 'react-fa'

import ActionLink from '~/src/components/common/ActionLink'

import Notifications from '~/src/theme/components/Notifications'

import StatsDropdown from '~/src/theme/components/StatsDropdown';

class ThemeHeader extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
        notificationsOpen: false,
      }
  }

  handleNotificationsOpen() {
    if (this.props.userActivities.length > 0) {
      this.setState({notificationsOpen: true});
    }
  }

  handleNotificationsClose() {
    this.setState({notificationsOpen: false});
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isAuthorized != this.props.isAuthorized) {
      if (this.props.isAuthorized) {
        this.props.fetchUserActivities(this.props.currentUserID);
      }
    }
  }

  onSignOut() {
    window.location.reload();
  }

  render() {
    const CurrentUserID = this.props.currentUserID;

    const NumNotifications = this.props.userActivities ? this.props.userActivities.filter(function(activity) {
      return !activity.witnessIDs || !activity.witnessIDs.find(function(witnessID) { return witnessID == CurrentUserID; })
    }).length : 0;

    const NumNotificationsString = NumNotifications > 0 ? `(${NumNotifications})` : "";

    const OpenMenuClass = !this.props.isSidebarOpen ? "open-menu" : "open-menu";
    const CloseMenuClass = this.props.isSidebarOpen ? "close-menu" : "close-menu";

    return (
      <div className="session-header" id="popup-root">
      {this.state.notificationsOpen && <Notifications onClose={()=>this.handleNotificationsClose()} userActivities={this.props.userActivities}/>}
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3">
                    <div className="menu-hamburger">
                        <ActionLink href="#" className={OpenMenuClass} style={{dispay: "none"}} onClick={() => this.props.openSidebar(true)} style={{display: !this.props.isSidebarOpen? "block" : "none"}}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </ActionLink>

                        <ActionLink href="#" className={CloseMenuClass} onClick={() => this.props.openSidebar(false)} style={{display: this.props.isSidebarOpen? "block" : "none"}}>
                            <Icon name="times" aria-hidden="true"></Icon>
                        </ActionLink>
                    </div>
                    <h1 className="logo">
                        <Link to='/'><img src="http://sociamibucket.s3.amazonaws.com/assets/new_ui_color_scheme/img/logo.png" alt=""/></Link>
                    </h1>
                </div>
                <div className="col-md-6">
                    <div className="task-manager">
                        <Link to='/projectManagement' className="btn-base btn-yellow">Challenges Scanner</Link>
                        <Link to='/progressionTrees' className="btn-base btn-yellow">Tree Scanner</Link>
                        <Link to='/taskManagement' className="btn-base btn-yellow">Tasks Manager</Link>
                    </div>
                </div>
                <div className="col-md-3">
                    <ul className="navbar-top-links">
                        <StatsDropdown />
                        <li className="mail">
                          <ActionLink href="#" onClick={() => this.handleNotificationsOpen()}>
                            <Icon name="envelope" aria-hidden="true"></Icon>
                          </ActionLink>{NumNotificationsString}
                        </li>
                        <li className="notification">
                            <a href="#">
                                <Icon name="bell" aria-hidden="true"></Icon>
                            </a>
                        </li>
                        <li className="register">
                            <Link href="#" to='/connectionsView'>
                                <Icon name="user-plus" aria-hidden="true"></Icon>
                            </Link>
                        </li>

                        <li className="account privacy">
                            <Link href="#" to='/privacy'>
                                <Icon name="gear" aria-hidden="true"></Icon>
                            </Link>
                        </li>
                        <li className="account profile">
                            <Link href="#" to='/userProfile'>
                                <Icon name="user-o" aria-hidden="true"></Icon>
                            </Link>
                        </li>
                        <li className="account-logout">
                            <ActionLink className="text-logout" href="#" onClick={() => this.onSignOut()}>
                                <span>Logout</span>
                                {/*<Icon name="user" aria-hidden="true">*/}
                                {/*</Icon>*/}
                            </ActionLink>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    </div>
    );
  }
}

export default ThemeHeader;