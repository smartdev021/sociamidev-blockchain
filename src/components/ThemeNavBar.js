/*
    author: Alexander Zolotov
*/

import React, { Component } from 'react';

class ThemeNavBar extends React.Component {
  render() {
    const SignUpButton = (!this.props.isAuthorized) ? <li><button className="btn btn-lg btn-primary btn-block" type="button" 
    onClick = {() => this.props.onHandleSignUp()}>Sign Up</button></li> : null;

const SettingsButton = (this.props.isAuthorized) ? <li><button className="btn btn-lg btn-info btn-block" type="button" 
onClick = {() => this.props.onHandleOpenSettings()}>Settings</button></li> : null;

    return (
        <div className="navbar navbar-default navbar-fixed-top">
    <div className="container">
      <div className="navbar-header">
        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>
        <a className="navbar-brand" href="#"><b>Sociami</b></a>
      </div>
      <div className="navbar-collapse collapse">
        <ul className="nav navbar-nav navbar-right">
          <li><a href="#">Already a member?</a></li>
          {SignUpButton}
          {SettingsButton}
        </ul>
    </div>
  </div>
  </div>
    );
  }

}

export default ThemeNavBar;