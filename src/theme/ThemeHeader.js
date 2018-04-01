/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

import { Icon } from 'react-fa'

import ActionLink from '~/src/components/common/ActionLink'

import Notifications from '~/src/theme/components/Notifications'

import StatsDropdown from '~/src/theme/components/StatsDropdown'

import ConfigMain from '~/configs/main'

import { ToastContainer, toast } from 'react-toastify';

import { withCookies, Cookies } from 'react-cookie';
import UserMenuDropdown from './components/UserMenuDropdown';

class ThemeHeader extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            notificationsOpen: false,
        }
    }

    handleNotificationsOpen() {
        if (this.props.userActivities.length > 0) {
            this.setState({ notificationsOpen: true });
        }
    }

    handleNotificationsClose() {
        this.setState({ notificationsOpen: false });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.isAuthorized != this.props.isAuthorized) {
            if (this.props.isAuthorized) {
                this.props.fetchUserActivities(this.props.currentUserID);
            }
        }

        if (prevProps.accounting.data.numTokens < this.props.accounting.data.numTokens) {

            const { cookies } = this.props;
            const numTokensFromCookies = cookies.get("tokens_total");

            if (!numTokensFromCookies || this.props.accounting.data.numTokens > numTokensFromCookies) {
                const amountEarned = this.props.accounting.data.numTokens - prevProps.accounting.data.numTokens;
                this.showNotification(`Congratulations: You've earned ${amountEarned} ${amountEarned > 1 ? "tokens" : "token"}!!!`);

                this.storeNumTokensInCookies(this.props.accounting.data.numTokens);
            }
        }
    }

    storeNumTokensInCookies(numTokens) {
        const { cookies } = this.props;
        let dateExpire = new Date();
        dateExpire.setTime(dateExpire.getTime() + ConfigMain.getCookiesExpirationPeriod());
        cookies.set("tokens_total", numTokens, { path: '/', expires: dateExpire });
    }

    showNotification(message) {
        toast(message, { position: toast.POSITION.TOP_CENTER });
    }

    onSignOut() {
        this.props.logout();
    }

    render() {
        const CurrentUserID = this.props.currentUserID;

        const NumNotifications = this.props.userActivities ? this.props.userActivities.filter(function (activity) {
            return !activity.witnessIDs || !activity.witnessIDs.find(function (witnessID) { return witnessID == CurrentUserID; })
        }).length : 0;

        const NumNotificationsString = NumNotifications > 0 ? `${NumNotifications}` : '';

        const labelNotif = NumNotifications > 0 ? <span className="label-notif">{NumNotificationsString}</span>  : ''
        
        const OpenMenuClass = !this.props.isSidebarOpen ? "open-menu" : "open-menu";
        const CloseMenuClass = this.props.isSidebarOpen ? "close-menu" : "close-menu";

        return (
            <div className="session-header" id="popup-root">
                <ToastContainer />
                {this.state.notificationsOpen && <Notifications onClose={() => this.handleNotificationsClose()} userActivities={this.props.userActivities} />}
                <div className="container-fluid">
                    <div className="row">
                        <div id="nav-menu" className="nav-menu">
                            <div className="menu-hamburger">
                                <ActionLink href="#" className={OpenMenuClass} style={{ dispay: "none" }} onClick={() => this.props.openSidebar(true)} style={{ display: !this.props.isSidebarOpen ? "block" : "none" }}>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </ActionLink>

                                <ActionLink href="#" className={CloseMenuClass} onClick={() => this.props.openSidebar(false)} style={{ display: this.props.isSidebarOpen ? "block" : "none" }}>
                                    <Icon name="times" aria-hidden="true"></Icon>
                                </ActionLink>
                            </div>
                            <h1 className="logo">
                                <Link to='/'>
                                    <img src="https://sociamibucket.s3.amazonaws.com/assets/new_ui_color_scheme/img/logo.png" alt="" />
                                    {/* <span style={{ color: 'white', fontSize: '14px', position: 'relative', bottom: '-16px', left: '-30px' }}>alpha</span> */}
                                </Link>
                            </h1>
                        </div>

                        <div id="nav-links" className="nav-links">
                            <ul className="navbar-top-links">
                                <StatsDropdown userProfile={this.props.userProfile} accounting={this.props.accounting} />
                                <li className="notification">
                                    <ActionLink href="#" onClick={() => this.handleNotificationsOpen()}>
                                        <Icon name="bell" aria-hidden="true"></Icon>
                                        {/* {labelNotif} */}
                                    </ActionLink>
                                </li>
                                <li className="register">
                                    <Link href="#" to='/connectionsView'>
                                        <Icon name="user-plus" aria-hidden="true"></Icon>
                                    </Link>
                                </li>
                                <UserMenuDropdown userProfile={this.props.userProfile} 
                                onSignOut={()=>this.onSignOut()}/>
                            </ul>
                        </div>

                        <div id="nav-tasks" className="nav-tasks">
                            <div className="task-manager">
                                {!ConfigMain.ChallengesScannerDisabled ? <Link to='/projectManagement' className="btn-base btn-yellow">Challenges Scanner</Link>
                                    :
                                    <div className="btn-base btn-yellow disabled" style={{ cursor: "default", position: "relative" }}>
                                        <span>Challenges Scanner</span>
                                        <div style={{
                                            fontSize: "10px",
                                            position: "absolute",
                                            left: "0px",
                                            bottom: "-15px",
                                            color: "white",
                                            fontFamily: "'Berlin-Sans-FB-Regular', sans-serif"
                                        }}>coming soon</div>
                                    </div>
                                }

                                <Link to='/progressionTrees' className="btn-base btn-yellow">Tree Scanner</Link>
                                <Link to='/taskManagement' className="btn-base btn-yellow">Tasks Manager</Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default withCookies(ThemeHeader);