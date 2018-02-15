/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'

import {Icon} from 'react-fa'

import ActionLink from '~/src/components/common/ActionLink'

class ThemeHeader extends React.Component {

  constructor(props) {
    super(props);
  }

  onSignOut() {
    window.location.reload();
  }

  render() {
    return (
      <div className="session-header">
        <div className="container">
            <div className="row">
                <div className="col-md-3">
                    <div className="menu-hamburger">
                        <a href="#" className="open-menu">
                            <span></span>
                            <span></span>
                            <span></span>
                        </a>

                        <a href="#" className="close-menu">
                            <Icon name="times" aria-hidden="true"></Icon>
                        </a>
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
                        <li className="mail"><a href="#"><Icon name="envelope" aria-hidden="true"></Icon></a></li>
                        <li className="notification"><a href="#"><Icon name="bell" aria-hidden="true"></Icon></a></li>
                        <li className="register"><a href="#"><Icon name="user-plus" aria-hidden="true"></Icon></a></li>
                        <li className="account">
                            <ActionLink href="#" className="text-logout" onClick={() => this.onSignOut()}>
                                <Icon name="user" aria-hidden="true"></Icon> <span>Logout</span></ActionLink></li>
                    </ul>
                </div>
            </div>

        </div>
    </div>
    );
  }
}

export default ThemeHeader;