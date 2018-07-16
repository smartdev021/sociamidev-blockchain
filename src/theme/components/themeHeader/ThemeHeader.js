/*
    author: Akshay Menon
*/

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Icon } from 'react-fa';

import ActionLink from '~/src/components/common/ActionLink';

import Notifications from '~/src/theme/components/themeHeader/Notifications';
import StatsDropdown from '~/src/theme/components/themeHeader/StatsDropdown';
import UserMenuDropdown from '~/src/theme/components/themeHeader/UserMenuDropdown';

import ConfigMain from '~/configs/main';

import { ToastContainer, toast } from 'react-toastify';

import PubSub from 'pubsub-js';

import '~/src/theme/css/ThemeHeader.css';

const Logo = () => {
  return (
    <div className="logo">
      <Link to="/">
        <img
          src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/landingPage/logo.png"
          alt="logo"
        />
      </Link>
    </div>
  );
};

const MobileMenu = ({ isOpen, closeMenu, onSignOut }) => {
  const mobileClass = isOpen ? 'mobile-menu open' : 'mobile-menu close';

  return (
    <div className={mobileClass}>
      <button type="button" className="close-menu" onClick={closeMenu}>
        <span>x</span>
      </button>
      <img src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/landingPage/logo.png"
      style={{paddingBottom: '20px'}}
      />
      <footer>
        <div className="navbar-btn-row">
          <Link to="/progressionTrees" className="navbar-button" onClick={closeMenu}>
            <div className="navbar-btn-img">
              <img
              src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/themeHeader/Story.png"
              style={{ marginTop: '-4px', width: '16px' }}
              />
            </div>
            <div className="navbar-btn-name">
              Story
            </div>
          </Link>


          <Link to="/heroes" className="navbar-button" onClick={closeMenu}>
            <div className="navbar-btn-img">
              <img
              src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/themeHeader/Heroes.png"
              style={{ marginTop: '-5px', width: '18px' }}
              />
            </div>
            <div className="navbar-btn-name">
              Heroes
            </div>
          </Link>
        </div>
        <div className="navbar-btn-row">
          <Link to="/taskManagement" className="navbar-button" onClick={closeMenu}>
            <div className="navbar-btn-img">
              <img
              src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/themeHeader/Tasks.png"
              style={{ width: '18px' }}
              />
            </div>
            <div className="navbar-btn-name">
              Tasks
            </div>
          </Link>
        </div>
        <div className="navbar-mobile-options">
          <Link to="" className="navbar-option" onClick={closeMenu}>
            <div className="navbar-option-name">
            <img className="navbar-option-icon"
            src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/themeHeader/States.png"
            />
            States</div>
            <i className="glyphicon glyphicon-chevron-right pull-right"></i>
          </Link>
          <Link to="" className="navbar-option" onClick={closeMenu}>
            <div className="navbar-option-name">
            <img className="navbar-option-icon"
            src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/themeHeader/Notification.png"
            />
            Notification</div>
            <i className="glyphicon glyphicon-chevron-right pull-right"></i>
          </Link>
          <Link to="/connectionsView" className="navbar-option" onClick={closeMenu}>
            <div className="navbar-option-name">
            <img className="navbar-option-icon"
            src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/themeHeader/Add.png"
            />
            Add Soqqler</div>
            <i className="glyphicon glyphicon-chevron-right pull-right"></i>
          </Link>
          <Link to="/userProfile" className="navbar-option" onClick={closeMenu}>
            <div className="navbar-option-name">Your Profile</div>
            <i className="glyphicon glyphicon-chevron-right pull-right"></i>
          </Link>
          <Link to="" className="navbar-option" onClick={closeMenu}>
            <div className="navbar-option-name">Settings</div>
            <i className="glyphicon glyphicon-chevron-right pull-right"></i>
          </Link>
          <Link to="/teams" className="navbar-option" onClick={closeMenu}>
            <div className="navbar-option-name">Team Setup</div>
            <i className="glyphicon glyphicon-chevron-right pull-right"></i>
          </Link>
          <ActionLink className="navbar-option" href="#" onClick={onSignOut}>
            <div className="navbar-option-name">Logout</div>
            <i className="glyphicon glyphicon-chevron-right pull-right"></i>
          </ActionLink>
        </div>
      </footer>
    </div>
  );
};

class ThemeHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notificationsOpen: false,
      isOpen: false
    };

    this.toggle = this.toggle.bind(this);
    this.onSignOut = this.onSignOut.bind(this);
  }

  componentDidMount() {
    // $(window).scroll(function() {
    //   var distanceY = window.pageYOffset;
    //   var breakpoint = 100;
    //   var soqqleLogo = $('.logo');
    //   var navLinks = $('#nav-links');
    //   var navTasks = $('#nav-tasks');
    //   var sessionHeader = $('.session-header');
    //   if (distanceY > breakpoint) {
    //     soqqleLogo.addClass('logo-scroll');
    //     navLinks.addClass('nav-links-scroll');
    //     navTasks.addClass('nav-tasks-scroll');
    //     sessionHeader.addClass('session-header-scroll');
    //   } else {
    //     soqqleLogo.removeClass('logo-scroll');
    //     navLinks.removeClass('nav-links-scroll');
    //     navTasks.removeClass('nav-tasks-scroll');
    //     sessionHeader.removeClass('session-header-scroll');
    //   }
    // });
  }

  handleNotificationsOpen() {
    if (this.props.userTasks.created.length > 0) {
      this.setState({ notificationsOpen: true });
    }
  }

  handleNotificationsClose() {
    this.setState({ notificationsOpen: false });
  }

  componentWillMount() {
    this.PubsubEventsSubscribe();
  }

  componentWillUnmount() {
    this.PubsubEventsUnSubscribe();
  }

  PubsubEventsSubscribe() {
    if (!this.token_server_event_accounting_update) {
      this.token_server_event_accounting_update = PubSub.subscribe(
        'accounting_updated',
        this.serverEventAccountingUpdated.bind(this),
      );
    }
  }

  PubsubEventsUnSubscribe() {
    if (this.token_server_event_accounting_update) {
      PubSub.unsubscribe(this.token_server_event_accounting_update);
      this.token_server_event_accounting_update = undefined;
    }
  }

  serverEventAccountingUpdated(msg, data) {
    if (data && data.numTokens) {
      let source = '';

      if (data.source) {
        if (data.source.illuminate) {
          source = `for ${data.source.illuminate.name}`;
        } else if (data.source.deepdive) {
          source = `for ${data.source.deepdive.name}`;
        }
      }

      this.showNotification(
        `Congratulations: You've earned ${data.numTokens} ${
          data.numTokens > 1 ? 'tokens' : 'token'
        } ${source}!!!`,
      );
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isAuthorized != this.props.isAuthorized) {
      if (this.props.isAuthorized) {
        this.props.fetchUserActivities(this.props.currentUserID);
        this.PubsubEventsUnSubscribe();
        this.PubsubEventsSubscribe();
      } else {
        this.PubsubEventsUnSubscribe();
      }
    }
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  showNotification(message) {
    toast(message, { position: toast.POSITION.TOP_CENTER });
  }

  onSignOut() {
    this.props.logout();
  }

  render() {
    const CurrentUserID = this.props.currentUserID;

    const NumNotifications = this.props.userActivities
      ? this.props.userActivities.filter(function(activity) {
          return (
            !activity.witnessIDs ||
            !activity.witnessIDs.find(function(witnessID) {
              return witnessID == CurrentUserID;
            })
          );
        }).length
      : 0;

    const NumNotificationsString = NumNotifications > 0 ? `${NumNotifications}` : '';

    const labelNotif =
      NumNotifications > 0 ? <span className="label-notif">{NumNotificationsString}</span> : '';

    const OpenMenuClass = !this.props.isSidebarOpen ? 'open-menu' : 'open-menu';
    const CloseMenuClass = this.props.isSidebarOpen ? 'close-menu' : 'close-menu';

    return (
      <div className="soqqle-header" id="popup-root">
        <ToastContainer />
        {this.state.notificationsOpen && (
          <Notifications
            onClose={() => this.handleNotificationsClose()}
            userActivities={this.props.userActivities}
            markActivitySeen={() => this.props.markActivitySeen()}
          />
        )}


        <div className="navbar-wrapper">
            <header>
                <Logo/>
                <div className="header">
                  <button className="burger" onClick={this.toggle}>
                    <span> </span>
                    <span> </span>
                    <span> </span>
                  </button>

                  <Link to="/progressionTrees" className="navbar-button">
                    <div className="navbar-btn-img">
                      <img
                      src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/themeHeader/Story.png"
                      style={{ marginTop: '-4px', width: '16px' }}
                      />
                    </div>
                    <div className="navbar-btn-name">
                      Story
                    </div>
                  </Link>

                  <Link to="/heroes" className="navbar-button">
                    <div className="navbar-btn-img">
                      <img
                      src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/themeHeader/Heroes.png"
                      style={{ marginTop: '-5px', width: '18px' }}
                      />
                    </div>
                    <div className="navbar-btn-name">
                      Heroes
                    </div>
                  </Link>

                  <Link to="/taskManagement" className="navbar-button">
                    <div className="navbar-btn-img">
                      <img
                      src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/themeHeader/Tasks.png"
                      style={{ width: '18px' }}
                      />
                    </div>
                    <div className="navbar-btn-name">
                      Tasks
                    </div>
                  </Link>

                  <div className="navbar-options">
                    <li><a href="#"><span className="new-img-icon-head"><img src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/themeHeader/header-menu-new-icon-1.png" alt="" /></span></a></li>
                    <li><a href="#"><span className="new-img-icon-head"><img src="https://s3.us-east-2.amazonaws.com/sociamibucket/assets/images/themeHeader/header-menu-new-icon-2.png" alt="" /></span></a></li>
                    <StatsDropdown userProfile={this.props.userProfile} accounting={this.props.accounting} />
                    <li className="notification">
                      <ActionLink href="#" onClick={() => this.handleNotificationsOpen()}>
                        <Icon name="bell" aria-hidden="true" />
                        {/* {labelNotif} */}
                      </ActionLink>
                    </li>
                    <li className="register">
                      <Link href="#" to="/connectionsView">
                        <Icon name="user-plus" aria-hidden="true" />
                      </Link>
                    </li>
                    <UserMenuDropdown
                      isAdmin={this.props.isAdmin}
                      userProfile={this.props.userProfile}
                      onSignOut={() => this.onSignOut()}
                    />
                  </div>
                </div>
            </header>
            <MobileMenu isOpen={this.state.isOpen} closeMenu={this.toggle} onSignOut={this.onSignOut}/>
        </div>
      </div>
    );
  }
}

export default ThemeHeader;
